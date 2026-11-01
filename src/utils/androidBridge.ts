import React from 'react';

export interface AppInventorBridgeInterface {
  setWebViewString?: (value: string) => void;
  getWebViewString?: () => string;
}

declare global {
  interface Window {
    AppInventor?: AppInventorBridgeInterface;
    __ANDROID_WEBVIEW_INTERCEPTOR_INSTALLED__?: boolean;
  }
}

/**
 * Checks whether the MIT App Inventor JavaScript bridge (`window.AppInventor.setWebViewString`)
 * is available in the current window context.
 */
export function hasAppInventorBridge(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(
    window.AppInventor && typeof window.AppInventor.setWebViewString === 'function'
  );
}

/**
 * Detects whether the website is running inside an Android WebView (including MIT App Inventor WebViewer)
 * separately from normal Chrome browser on Android or desktop.
 *
 * Normal Android Chrome UA:
 *   Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36
 * Android WebView UA:
 *   Mozilla/5.0 (Linux; Android 13; ...; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/... Mobile Safari/537.36
 */
export function isAndroidWebViewEnvironment(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  if (hasAppInventorBridge()) return true;

  const ua = navigator.userAgent || '';
  const isAndroid = /Android/i.test(ua);
  const hasWebViewMarker =
    /;\s*wv\)|\bwv\b|Version\/\d+\.\d+.*Chrome\/\d+|AppInventor|WebView/i.test(ua);

  return (isAndroid && hasWebViewMarker) || /AppInventor/i.test(ua);
}

/**
 * Sends a complete URL string to the Android app via `window.AppInventor.setWebViewString(url)`.
 * If `WebViewString` already holds the exact same URL, briefly clears it first so that
 * MIT App Inventor's `when WebViewer1.WebViewStringChange` event is guaranteed to fire on repeated taps.
 */
export function sendUrlToAppInventorBridge(url: string): boolean {
  if (typeof window === 'undefined') return false;
  const trimmed = (url || '').trim();
  if (!trimmed) return false;

  if (!hasAppInventorBridge() || !window.AppInventor?.setWebViewString) {
    return false;
  }

  try {
    const currentVal =
      typeof window.AppInventor.getWebViewString === 'function'
        ? window.AppInventor.getWebViewString()
        : undefined;

    if (currentVal === trimmed) {
      window.AppInventor.setWebViewString('');
      window.setTimeout(() => {
        try {
          window.AppInventor?.setWebViewString?.(trimmed);
        } catch {
          // Ignore bridge error
        }
      }, 15);
    } else {
      window.AppInventor.setWebViewString(trimmed);
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Detects all WhatsApp links, including:
 * - whatsapp://send/...
 * - https://wa.me/... (and http://wa.me/...)
 * - https://api.whatsapp.com/send/... (and https://web.whatsapp.com/send/...)
 */
export function isWhatsAppUrl(rawUrl: string | null | undefined): boolean {
  if (!rawUrl || typeof rawUrl !== 'string') return false;
  const trimmed = rawUrl.trim();
  return (
    /^whatsapp:\/\//i.test(trimmed) ||
    /^https?:\/\/(www\.)?wa\.me(\/|\?|$)/i.test(trimmed) ||
    /^https?:\/\/(api|web)\.whatsapp\.com\/send(\/|\?|$)/i.test(trimmed)
  );
}

/**
 * Converts any WhatsApp link (`whatsapp://send/...`, `https://api.whatsapp.com/send/...`, `https://wa.me/...`)
 * into a clean HTTPS `https://wa.me/...` URL while preserving the original phone number, message text,
 * and exact URL encoding.
 *
 * Why HTTPS `https://wa.me/...` is preferred:
 * - Android's ACTION_VIEW intent resolves `https://wa.me/...` directly to the installed WhatsApp app.
 * - If WhatsApp is not installed on the device, Android automatically opens `https://wa.me/...` in a compatible browser.
 * - Prevents `net::ERR_UNKNOWN_URL_SCHEME` inside Android WebView.
 */
export function normalizeWhatsAppUrlToHttps(rawUrl: string): string {
  const trimmed = (rawUrl || '').trim();
  if (!trimmed) return 'https://wa.me/';

  // Already a wa.me link: enforce https:// and preserve exact path + encoded query string
  if (/^https?:\/\/(www\.)?wa\.me(\/|\?|$)/i.test(trimmed)) {
    return trimmed.replace(/^http:\/\//i, 'https://').replace(/^https:\/\/www\.wa\.me/i, 'https://wa.me');
  }

  // Convert whatsapp://send/... or https://api.whatsapp.com/send/... to https://wa.me/<phone>?text=<encodedText>
  if (
    /^whatsapp:\/\//i.test(trimmed) ||
    /^https?:\/\/(api|web)\.whatsapp\.com\/send(\/|\?|$)/i.test(trimmed)
  ) {
    const qIndex = trimmed.indexOf('?');
    if (qIndex === -1) {
      return 'https://wa.me/';
    }

    const rawQuery = trimmed.slice(qIndex + 1);
    const pairs = rawQuery.split('&');
    let phoneDigits = '';
    const preservedParams: string[] = [];

    for (const pair of pairs) {
      if (!pair) continue;
      const eqIdx = pair.indexOf('=');
      const rawKey = eqIdx === -1 ? pair : pair.slice(0, eqIdx);
      const rawVal = eqIdx === -1 ? '' : pair.slice(eqIdx + 1);
      const keyLower = rawKey.toLowerCase();

      if (keyLower === 'phone') {
        try {
          phoneDigits = decodeURIComponent(rawVal).replace(/[^\d]/g, '');
        } catch {
          phoneDigits = rawVal.replace(/[^\d]/g, '');
        }
      } else {
        // Preserve exact original URL encoding for `text` and any other parameters
        preservedParams.push(pair);
      }
    }

    const querySuffix = preservedParams.length > 0 ? `?${preservedParams.join('&')}` : '';
    return `https://wa.me/${phoneDigits}${querySuffix}`;
  }

  return trimmed;
}

/**
 * React onClick handler for WhatsApp `<a>` links.
 * - In normal Chrome browser: allows standard `<a target="_blank">` behavior.
 * - In Android WebView / AppInventor WebViewer: prevents the link from loading inside WebViewer
 *   (preventing `ERR_UNKNOWN_URL_SCHEME`) and sends the normalized HTTPS `https://wa.me/...` URL
 *   to Android via `window.AppInventor.setWebViewString(url)`.
 */
export function handleWhatsAppLinkClick(
  event: React.MouseEvent<HTMLAnchorElement> | MouseEvent,
  rawUrl?: string
): boolean {
  const targetAnchor =
    (event.currentTarget as HTMLAnchorElement | null) ||
    ((event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null);

  const candidateUrl =
    rawUrl || targetAnchor?.getAttribute('href') || targetAnchor?.href || '';

  if (!isWhatsAppUrl(candidateUrl)) {
    return false;
  }

  const httpsWaUrl = normalizeWhatsAppUrlToHttps(candidateUrl);

  if (hasAppInventorBridge() || isAndroidWebViewEnvironment()) {
    event.preventDefault();
    event.stopPropagation();

    const sent = sendUrlToAppInventorBridge(httpsWaUrl);
    if (!sent) {
      // Fallback for generic Android WebView without AppInventor bridge:
      // still keep preventDefault() on the main WebView frame so whatsapp:// scheme never loads in-frame
      try {
        window.open(httpsWaUrl, '_blank', 'noopener,noreferrer');
      } catch {
        // Ignore popup block in restricted WebView
      }
    }
    return true;
  }

  return false;
}

/**
 * Click handler for external HTTPS links (such as "Open in Chrome for PDF Download / Print").
 * When inside AppInventor WebViewer, intercepts the click and sends the complete HTTPS URL
 * via `window.AppInventor.setWebViewString(url)` so Android launches Chrome via ACTION_VIEW.
 */
export function handleExternalBrowserUrlClick(
  event: React.MouseEvent<HTMLAnchorElement> | MouseEvent,
  targetUrl: string
): boolean {
  const trimmed = (targetUrl || '').trim();
  if (!trimmed) return false;

  if (hasAppInventorBridge()) {
    event.preventDefault();
    event.stopPropagation();
    sendUrlToAppInventorBridge(trimmed);
    return true;
  }

  return false;
}

/**
 * Installs a global document-level capture-phase click listener and `window.open` guard
 * so that ANY WhatsApp link (`whatsapp://send/`, `https://wa.me/`, `https://api.whatsapp.com/send/`)
 * clicked anywhere in the portal is automatically intercepted inside Android WebView before
 * WebViewer can navigate to it.
 */
export function installGlobalAndroidWebViewInterceptors(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.__ANDROID_WEBVIEW_INTERCEPTOR_INSTALLED__) return;
  window.__ANDROID_WEBVIEW_INTERCEPTOR_INSTALLED__ = true;

  const onDocumentClickCapture = (event: MouseEvent) => {
    const target = event.target as Element | null;
    if (!target || typeof target.closest !== 'function') return;

    const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;

    const rawHref = anchor.getAttribute('href') || anchor.href || '';
    if (!rawHref) return;

    // 1. Intercept all WhatsApp links inside Android WebView
    if (isWhatsAppUrl(rawHref)) {
      const httpsWaUrl = normalizeWhatsAppUrlToHttps(rawHref);
      // Normalize href attribute in DOM to https://wa.me/ for compatibility
      if (rawHref !== httpsWaUrl) {
        anchor.setAttribute('href', httpsWaUrl);
      }

      if (hasAppInventorBridge() || isAndroidWebViewEnvironment()) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        const sent = sendUrlToAppInventorBridge(httpsWaUrl);
        if (!sent) {
          try {
            window.open(httpsWaUrl, '_blank', 'noopener,noreferrer');
          } catch {
            // Ignore
          }
        }
      }
      return;
    }

    // 2. Intercept explicit external print/PDF links marked with data-external-chrome="true"
    // or PDF download attachment links inside AppInventor WebViewer
    if (
      hasAppInventorBridge() &&
      (anchor.dataset.externalChrome === 'true' ||
        rawHref.includes('/api/export/download-pdf/') ||
        rawHref.includes('autoprint=1') ||
        rawHref.includes('autodownloadpdf=1'))
    ) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      try {
        const fullHttpsUrl = new URL(rawHref, window.location.origin).toString();
        sendUrlToAppInventorBridge(fullHttpsUrl);
      } catch {
        sendUrlToAppInventorBridge(rawHref);
      }
    }
  };

  document.addEventListener('click', onDocumentClickCapture, true);
  document.addEventListener('auxclick', onDocumentClickCapture, true);

  // Also guard window.open for WhatsApp URLs or _system external print URLs in Android WebView
  const originalWindowOpen = window.open;
  if (typeof originalWindowOpen === 'function') {
    window.open = function (
      url?: string | URL,
      target?: string,
      features?: string
    ): WindowProxy | null {
      const urlStr = url ? String(url) : '';
      if (urlStr && isWhatsAppUrl(urlStr)) {
        const httpsWaUrl = normalizeWhatsAppUrlToHttps(urlStr);
        if (hasAppInventorBridge() || isAndroidWebViewEnvironment()) {
          sendUrlToAppInventorBridge(httpsWaUrl);
          return null;
        }
      }
      if (urlStr && hasAppInventorBridge() && (target === '_system' || urlStr.includes('autoprint=1') || urlStr.includes('autodownloadpdf=1'))) {
        try {
          const fullUrl = new URL(urlStr, window.location.origin).toString();
          sendUrlToAppInventorBridge(fullUrl);
          return null;
        } catch {
          sendUrlToAppInventorBridge(urlStr);
          return null;
        }
      }
      return originalWindowOpen.call(window, url, target, features);
    };
  }
}
