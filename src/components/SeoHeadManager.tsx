import React, { useEffect, useState } from 'react';
import { Article, LanguageCode } from '../types';
import { resolveSeoMetadata } from '../utils/seoMetadata';

interface SeoHeadManagerProps {
  currentPath: string;
  language: LanguageCode;
  extraArticles?: Article[];
}

function upsertMetaTag(attrName: 'name' | 'property', attrValue: string, content: string): void {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonicalLink(href: string): void {
  if (typeof document === 'undefined') return;
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export const SeoHeadManager: React.FC<SeoHeadManagerProps> = ({
  currentPath,
  language,
  extraArticles
}) => {
  const [locationTick, setLocationTick] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const origPushState = window.history.pushState;
    const origReplaceState = window.history.replaceState;

    const notifyUrlChange = () => {
      setLocationTick(prev => prev + 1);
    };

    window.history.pushState = function (...args) {
      const result = origPushState.apply(this, args);
      notifyUrlChange();
      return result;
    };

    window.history.replaceState = function (...args) {
      const result = origReplaceState.apply(this, args);
      notifyUrlChange();
      return result;
    };

    window.addEventListener('popstate', notifyUrlChange);

    return () => {
      window.history.pushState = origPushState;
      window.history.replaceState = origReplaceState;
      window.removeEventListener('popstate', notifyUrlChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const origin =
      window.location.origin && /^https?:\/\//i.test(window.location.origin)
        ? window.location.origin
        : 'https://historical-web.web.app';
    const basePath = ((import.meta as any).env?.BASE_URL || '/').replace(/^\/+|\/+$/g, '');

    const pathname = window.location.pathname || currentPath || '/';
    const search = window.location.search || '';

    const meta = resolveSeoMetadata({
      pathname,
      search,
      origin,
      basePath,
      defaultLang: language,
      extraArticles
    });

    const win = window as unknown as {
      __ACTIVE_ARTICLE_TITLE__?: string | null;
      __PORTAL_DEFAULT_TITLE__?: string;
    };
    win.__PORTAL_DEFAULT_TITLE__ = meta.title;
    if (!win.__ACTIVE_ARTICLE_TITLE__) {
      document.title = meta.title;
    }

    document.documentElement.setAttribute('lang', meta.language);

    upsertMetaTag('name', 'description', meta.description);
    upsertMetaTag('name', 'keywords', meta.keywords.join(', '));
    upsertCanonicalLink(meta.canonicalUrl);

    // Open Graph metadata
    upsertMetaTag('property', 'og:type', meta.ogType);
    upsertMetaTag('property', 'og:site_name', meta.siteName);
    upsertMetaTag('property', 'og:locale', meta.locale);
    upsertMetaTag('property', 'og:url', meta.canonicalUrl);
    upsertMetaTag('property', 'og:title', meta.title);
    upsertMetaTag('property', 'og:description', meta.description);
    upsertMetaTag('property', 'og:image', meta.imageUrl);
    upsertMetaTag('property', 'og:image:secure_url', meta.imageUrl);
    upsertMetaTag('property', 'og:image:type', meta.imageType);
    upsertMetaTag('property', 'og:image:width', String(meta.imageWidth));
    upsertMetaTag('property', 'og:image:height', String(meta.imageHeight));
    upsertMetaTag('property', 'og:image:alt', meta.imageAlt);

    // Twitter / X Card metadata
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', meta.title);
    upsertMetaTag('name', 'twitter:description', meta.description);
    upsertMetaTag('name', 'twitter:image', meta.imageUrl);
    upsertMetaTag('name', 'twitter:image:alt', meta.imageAlt);
  }, [currentPath, language, extraArticles, locationTick]);

  return null;
};
