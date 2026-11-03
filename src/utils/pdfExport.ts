import { jsPDF } from 'jspdf';
import { LanguageCode } from '../types';
import {
  hasAppInventorBridge,
  isAndroidWebViewEnvironment,
  sendUrlToAppInventorBridge,
  copyTextCrossPlatform,
  triggerCrossPlatformShare,
  handleWhatsAppLinkClick,
  handleExternalBrowserUrlClick,
  isWhatsAppUrl,
  normalizeWhatsAppUrlToHttps,
  installGlobalAndroidWebViewInterceptors,
  type CrossPlatformSharePayload,
} from './androidBridge';

export {
  hasAppInventorBridge,
  isAndroidWebViewEnvironment,
  sendUrlToAppInventorBridge,
  copyTextCrossPlatform,
  triggerCrossPlatformShare,
  handleWhatsAppLinkClick,
  handleExternalBrowserUrlClick,
  isWhatsAppUrl,
  normalizeWhatsAppUrlToHttps,
  installGlobalAndroidWebViewInterceptors,
  type CrossPlatformSharePayload,
};

export interface PdfAuthorFooterLabels {
  pageWord?: string;
  ofWord?: string;
  authorLabel?: string;
  publishedByLabel?: string;
}

export interface PdfExportUiLabels {
  downloadPdfBtn: string;
  generatingPdfBtn: string;
  printBtn: string;
  openInChromePdfBtn: string;
  directDownloadLinkLabel: string;
  pdfSavedNotice: (filename: string) => string;
}

export interface DownloadArticlePdfOptions {
  articleTitle: string;
  language?: LanguageCode;
  containerElement?: HTMLElement | null;
  articleUrl?: string;
}

export interface PdfExportResult {
  filename: string;
  downloadUrl?: string;
  externalArticleUrl?: string;
  isAndroidWebView: boolean;
}

const AUTHOR_PHOTO_PATH = `${(import.meta as any).env?.BASE_URL || '/'}assets/dr_g_sathyanarayana_raju.png`;
const CANONICAL_AUTHOR_NAME = 'Dr.G Sathyanarayana Raju';
const CANONICAL_AUTHOR_ROLES =
  'Founder • Web Developer / Designer • Digital Creator • Historical Documentation Contributor';
const CANONICAL_AUTHOR_CREDIT =
  'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju';
const CANONICAL_ORGANIZATION =
  'Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal';

export const PDF_EXPORT_UI_LABELS: Record<LanguageCode, PdfExportUiLabels> = {
  en: {
    downloadPdfBtn: 'Download PDF',
    generatingPdfBtn: 'Generating PDF…',
    printBtn: 'Print / Save PDF',
    openInChromePdfBtn: 'Open in Chrome for PDF',
    directDownloadLinkLabel: 'Tap if download did not start',
    pdfSavedNotice: (filename) => `PDF ready: ${filename}`,
  },
  hi: {
    downloadPdfBtn: 'PDF डाउनलोड करें',
    generatingPdfBtn: 'PDF तैयार हो रहा है…',
    printBtn: 'प्रिंट / PDF सहेजें',
    openInChromePdfBtn: 'PDF हेतु Chrome में खोलें',
    directDownloadLinkLabel: 'सीधा PDF डाउनलोड लिंक',
    pdfSavedNotice: (filename) => `PDF तैयार है: ${filename}`,
  },
  te: {
    downloadPdfBtn: 'PDF డౌన్‌లోడ్',
    generatingPdfBtn: 'PDF సిద్ధమవుతోంది…',
    printBtn: 'ప్రింట్ / PDF సేవ్',
    openInChromePdfBtn: 'PDF కోసం Chromeలో తెరవండి',
    directDownloadLinkLabel: 'నేరుగా PDF డౌన్‌లోడ్ లింక్',
    pdfSavedNotice: (filename) => `PDF సిద్ధంగా ఉంది: ${filename}`,
  },
  kn: {
    downloadPdfBtn: 'PDF ಡೌನ್‌ಲೋಡ್',
    generatingPdfBtn: 'PDF ಸಿದ್ಧವಾಗುತ್ತಿದೆ…',
    printBtn: 'ಮುದ್ರಿಸಿ / PDF ಉಳಿಸಿ',
    openInChromePdfBtn: 'PDF ಗಾಗಿ Chrome ನಲ್ಲಿ ತೆರೆಯಿರಿ',
    directDownloadLinkLabel: 'ನೇರ PDF ಡೌನ್‌ಲೋಡ್ ಲಿಂಕ್',
    pdfSavedNotice: (filename) => `PDF ಸಿದ್ಧವಾಗಿದೆ: ${filename}`,
  },
  ta: {
    downloadPdfBtn: 'PDF பதிவிறக்கம்',
    generatingPdfBtn: 'PDF தயாராகிறது…',
    printBtn: 'அச்சிடு / PDF சேமி',
    openInChromePdfBtn: 'PDF-க்கு Chrome-இல் திறக்கவும்',
    directDownloadLinkLabel: 'நேரடி PDF பதிவிறக்க இணைப்பு',
    pdfSavedNotice: (filename) => `PDF தயார்: ${filename}`,
  },
  mr: {
    downloadPdfBtn: 'PDF डाउनलोड करा',
    generatingPdfBtn: 'PDF तयार होत आहे…',
    printBtn: 'प्रिंट / PDF जतन करा',
    openInChromePdfBtn: 'PDF साठी Chrome मध्ये उघडा',
    directDownloadLinkLabel: 'थेट PDF डाउनलोड लिंक',
    pdfSavedNotice: (filename) => `PDF तयार आहे: ${filename}`,
  },
  or: {
    downloadPdfBtn: 'PDF ଡାଉନଲୋଡ୍',
    generatingPdfBtn: 'PDF ପ୍ରସ୍ତୁତ ହେଉଛି…',
    printBtn: 'ପ୍ରିଣ୍ଟ / PDF ସେଭ୍',
    openInChromePdfBtn: 'PDF ପାଇଁ Chrome ରେ ଖୋଲନ୍ତୁ',
    directDownloadLinkLabel: 'ସିଧାସଳଖ PDF ଡାଉନଲୋଡ୍ ଲିଙ୍କ୍',
    pdfSavedNotice: (filename) => `PDF ପ୍ରସ୍ତୁତ: ${filename}`,
  },
  bn: {
    downloadPdfBtn: 'PDF ডাউনলোড করুন',
    generatingPdfBtn: 'PDF তৈরি হচ্ছে…',
    printBtn: 'প্রিন্ট / PDF সংরক্ষণ',
    openInChromePdfBtn: 'PDF-এর জন্য Chrome-এ খুলুন',
    directDownloadLinkLabel: 'সরাসরি PDF ডাউনলোড লিঙ্ক',
    pdfSavedNotice: (filename) => `PDF প্রস্তুত: ${filename}`,
  },
};

const FOOTER_PAGE_WORDS: Record<LanguageCode, { pageWord: string; ofWord: string }> = {
  en: { pageWord: 'Page', ofWord: 'of' },
  hi: { pageWord: 'पृष्ठ / Page', ofWord: 'of' },
  te: { pageWord: 'పేజీ / Page', ofWord: 'of' },
  kn: { pageWord: 'ಪುಟ / Page', ofWord: 'of' },
  ta: { pageWord: 'பக்கம் / Page', ofWord: 'of' },
  mr: { pageWord: 'पृष्ठ / Page', ofWord: 'of' },
  or: { pageWord: 'ପୃଷ୍ଠା / Page', ofWord: 'of' },
  bn: { pageWord: 'পৃষ্ঠা / Page', ofWord: 'of' },
};

/**
 * Checks whether a candidate title string is empty, purely numeric (such as "3" or "#3"),
 * or only punctuation/underscores so it is never used as a PDF filename.
 */
function isInvalidOrNumericOnlyTitle(candidate: string | null | undefined): boolean {
  if (!candidate || typeof candidate !== 'string') return true;
  const trimmed = candidate
    .replace(/\.pdf$/i, '')
    .replace(/^[#\s\-_.,:;()[\]]+|[\s\-_.,:;()[\]]+$/g, '')
    .trim();
  if (!trimmed) return true;
  if (/^(undefined|null|nan)$/i.test(trimmed)) return true;
  // Reject purely numeric or index-only strings like "3", "03", "#3", "3-1"
  if (/^#?\d+([.\-_]\d+)*$/.test(trimmed)) return true;
  // Must contain at least one letter in any script (Latin or Indic/Kannada/Telugu/Devanagari/Tamil/Odia/Bengali)
  return !/[A-Za-z\u0900-\u0DFF]/.test(trimmed);
}

/**
 * Resolves the true article title from the provided string, or falls back to the active
 * article heading (`<h1>`) in the DOM so a numeric ID or empty string is never used.
 */
export function resolveEffectiveArticleTitle(
  rawTitle?: string | null,
  containerEl?: HTMLElement | null
): string {
  const candidate = (rawTitle || '').trim();
  if (!isInvalidOrNumericOnlyTitle(candidate)) {
    return candidate;
  }

  if (typeof document !== 'undefined') {
    const scope =
      containerEl ||
      document.querySelector<HTMLElement>('article.print-article-container') ||
      document.querySelector<HTMLElement>('.print-article-container') ||
      document.querySelector<HTMLElement>('article') ||
      document.querySelector<HTMLElement>('main');

    const h1Text = scope?.querySelector('h1')?.textContent?.trim();
    if (h1Text && !isInvalidOrNumericOnlyTitle(h1Text)) {
      return h1Text;
    }

    const activeWinTitle =
      typeof window !== 'undefined'
        ? (window as unknown as { __ACTIVE_ARTICLE_TITLE__?: string }).__ACTIVE_ARTICLE_TITLE__
        : undefined;
    if (activeWinTitle && !isInvalidOrNumericOnlyTitle(activeWinTitle)) {
      return activeWinTitle;
    }

    if (document.title && !isInvalidOrNumericOnlyTitle(document.title)) {
      return document.title.trim();
    }
  }

  return 'Suryavamsha-Historical-Article';
}

/**
 * Sanitizes an article title into a clean hyphenated base name (without `.pdf`),
 * preserving English and Indic/Kannada script characters while removing punctuation
 * (such as dots `.`, slashes `/`, colons `:`, bullets `•`, and dashes `–`/`—`)
 * that cause Android PrintSpooler or DownloadManager to split or truncate filenames.
 */
export function sanitizeArticleTitleForFilename(
  articleTitle?: string | null,
  containerEl?: HTMLElement | null
): string {
  const effective = resolveEffectiveArticleTitle(articleTitle, containerEl);

  const cleaned = effective
    .normalize('NFC')
    .replace(/\.pdf$/i, '')
    // Strip leading numeric index badge prefixes like "#3 " or "[#03] " or "3. " when followed by actual title letters
    .replace(/^\s*(?:\[?\s*#\s*\d+\s*\]?|\d+\s*[.)])\s*(?=[A-Za-z\u0900-\u0DFF])/u, '')
    // Replace filesystem-unsafe characters and filename-splitting punctuation with spaces
    .replace(/[<>:"/\\|?*\x00-\x1F.•–—―()[\]{},;!'’“”`~@#$%^&+=]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120)
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!cleaned || isInvalidOrNumericOnlyTitle(cleaned)) {
    return 'Suryavamsha-Historical-Article';
  }

  return cleaned;
}

/**
 * Shared filename-generation utility across the website.
 * Converts any article title into `<Sanitized-Article-Title>.pdf`
 * (e.g., `Odra-Kshatriya.pdf`, `Odra-Desha-History.pdf`, or Kannada title `.pdf`).
 */
export function generateArticlePdfFilename(
  articleTitle: string,
  containerEl?: HTMLElement | null
): string {
  const baseName = sanitizeArticleTitleForFilename(articleTitle, containerEl);
  return `${baseName}.pdf`;
}

export const buildSafePdfFilename = generateArticlePdfFilename;

/**
 * Synchronizes the browser's `document.title` with the currently open article's title
 * so that Android Chrome's Print / Save as PDF dialog always uses the article's title
 * as the suggested PDF filename. Pass `null` when closing an article to restore the portal title.
 */
export function setActiveArticleDocumentTitle(
  articleTitle: string | null | undefined,
  containerEl?: HTMLElement | null
): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const win = window as unknown as {
    __ACTIVE_ARTICLE_TITLE__?: string | null;
    __PORTAL_DEFAULT_TITLE__?: string;
  };

  if (!win.__PORTAL_DEFAULT_TITLE__ && document.title && !win.__ACTIVE_ARTICLE_TITLE__) {
    win.__PORTAL_DEFAULT_TITLE__ = document.title;
  }

  if (!articleTitle || !articleTitle.trim()) {
    win.__ACTIVE_ARTICLE_TITLE__ = null;
    if (win.__PORTAL_DEFAULT_TITLE__) {
      document.title = win.__PORTAL_DEFAULT_TITLE__;
    }
    return;
  }

  const sanitizedTitle = sanitizeArticleTitleForFilename(articleTitle, containerEl);
  win.__ACTIVE_ARTICLE_TITLE__ = sanitizedTitle;
  document.title = sanitizedTitle;
  const titleEl = document.querySelector('title');
  if (titleEl) {
    titleEl.textContent = sanitizedTitle;
  }
}

/**
 * Sets `document.title` dynamically to the sanitized article title before opening the print dialog.
 * Preserves the title throughout Android Chrome's asynchronous Print / Save as PDF flow instead of
 * prematurely reverting it after 1200ms while the print preview is still active.
 */
export function triggerArticlePrintWithTitle(
  articleTitle: string,
  onBeforePrint?: () => void
): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const sanitizedPrintTitle = sanitizeArticleTitleForFilename(articleTitle);

  try {
    if (typeof onBeforePrint === 'function') {
      onBeforePrint();
    }
    const updatePagination = (window as unknown as { __UPDATE_PRINT_PAGINATION__?: () => void })
      .__UPDATE_PRINT_PAGINATION__;
    if (typeof updatePagination === 'function') {
      updatePagination();
    }

    setActiveArticleDocumentTitle(sanitizedPrintTitle);
    document.title = sanitizedPrintTitle;
    const titleEl = document.querySelector('title');
    if (titleEl) {
      titleEl.textContent = sanitizedPrintTitle;
    }

    window.print();
  } catch (err) {
    console.warn('Print trigger error:', err);
  }
}

const ROYAL_THEME = {
  pageBg: '#F5EBD9',
  sectionBg: '#EFE3D0',
  cardBg: '#FFFCF5',
  surfaceBg: '#FFF9EF',
  primaryText: '#292521',
  headingText: '#54351F',
  secondaryText: '#6B5948',
  linkColor: '#76501F',
  accentGold: '#A87924',
  borderColor: '#D8C3A2',
  maroonAccent: '#762D35',
  relatedCardBg: '#F8DDE3',
  relatedCardBorder: '#E8BFC9',
  relatedCardText: '#54351F',
  profileTitleBg: '#F4C78A',
  profileTitleBorder: '#E4B879',
  profileTitleText: '#54351F',
  archivalIndexBg: '#D4EEFC',
  archivalIndexBorder: '#7CC4EA',
  archivalIndexText: '#000000',
} as const;

async function waitForImages(root: HTMLElement): Promise<void> {
  const images = Array.from(root.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      try {
        if (img.loading === 'lazy') {
          img.loading = 'eager';
        }
      } catch {
        // Ignore read-only attribute errors
      }
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }
      return new Promise<void>((resolve) => {
        const done = () => resolve();
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
        setTimeout(done, 4000);
      });
    })
  );
}

function loadImageElement(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const timer = setTimeout(() => resolve(null), 4500);
    img.onload = () => {
      clearTimeout(timer);
      resolve(img);
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function getPdfFontStack(isSerif = false, language?: LanguageCode): string {
  const indicPrimaryMap: Partial<Record<LanguageCode, { serif: string; sans: string }>> = {
    kn: {
      serif: '"Noto Sans Kannada", "Noto Serif Kannada"',
      sans: '"Noto Sans Kannada", "Plus Jakarta Sans"',
    },
    te: {
      serif: '"Noto Sans Telugu"',
      sans: '"Noto Sans Telugu", "Plus Jakarta Sans"',
    },
    hi: {
      serif: '"Noto Sans Devanagari"',
      sans: '"Noto Sans Devanagari", "Plus Jakarta Sans"',
    },
    mr: {
      serif: '"Noto Sans Devanagari"',
      sans: '"Noto Sans Devanagari", "Plus Jakarta Sans"',
    },
    ta: {
      serif: '"Noto Sans Tamil"',
      sans: '"Noto Sans Tamil", "Plus Jakarta Sans"',
    },
    or: {
      serif: '"Noto Sans Oriya"',
      sans: '"Noto Sans Oriya", "Plus Jakarta Sans"',
    },
    bn: {
      serif: '"Noto Sans Bengali"',
      sans: '"Noto Sans Bengali", "Plus Jakarta Sans"',
    },
  };

  const primary = language && indicPrimaryMap[language]
    ? isSerif
      ? indicPrimaryMap[language]!.serif
      : indicPrimaryMap[language]!.sans
    : '';

  const allIndicFonts =
    '"Noto Sans Kannada", "Noto Serif Kannada", "Noto Sans Telugu", "Noto Sans Devanagari", "Noto Sans Tamil", "Noto Sans Oriya", "Noto Sans Bengali"';

  if (isSerif) {
    return [
      primary,
      '"Cinzel"',
      '"Cormorant Garamond"',
      allIndicFonts,
      'Georgia',
      '"Times New Roman"',
      'serif',
    ]
      .filter(Boolean)
      .join(', ');
  }

  return [
    primary,
    '"Plus Jakarta Sans"',
    allIndicFonts,
    'system-ui',
    '-apple-system',
    'sans-serif',
  ]
    .filter(Boolean)
    .join(', ');
}

const PDF_SERIF_FONT = getPdfFontStack(true);
const PDF_SANS_FONT = getPdfFontStack(false);

/**
 * Wraps a paragraph string into lines that fit within `maxWidth` on the given 2D canvas context.
 * Applies a small safety margin so Indic/Kannada ligatures and vowel signs never clip at the right edge.
 */
function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const normalized = (text || '').replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];

  const safeMaxWidth = Math.max(40, maxWidth - 8);
  const paragraphs = normalized.split('\n');
  const lines: string[] = [];

  for (const rawPara of paragraphs) {
    const para = rawPara.replace(/\s+/g, ' ').trim();
    if (!para) {
      lines.push('');
      continue;
    }

    const words = para.split(' ');
    let currentLine = '';

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(candidate).width <= safeMaxWidth) {
        currentLine = candidate;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        if (ctx.measureText(word).width > safeMaxWidth) {
          // If word itself is wider than safeMaxWidth (e.g. extremely long compound or unspaced text)
          // Split safely preserving grapheme clusters (never break combining vowel marks)
          const graphemes = Array.from(word);
          let chunk = '';
          for (const g of graphemes) {
            if (ctx.measureText(chunk + g).width <= safeMaxWidth) {
              chunk += g;
            } else {
              if (chunk) lines.push(chunk);
              chunk = g;
            }
          }
          currentLine = chunk;
        } else {
          currentLine = word;
        }
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}

interface ExtractedMetaItem {
  label: string;
  value: string;
}

interface ExtractedTableData {
  headers: string[];
  rows: string[][];
}

interface ExtractedRelatedCard {
  imgSrc: string;
  indexLabel?: string;
  badge?: string;
  title: string;
  summary?: string;
}

type PdfBlock =
  | { type: 'profileTitleBox'; text: string }
  | { type: 'archivalReferenceIndexBox'; title: string; items: string[] }
  | { type: 'sectionHeading'; text: string }
  | { type: 'subHeading'; text: string }
  | { type: 'summaryBox'; title?: string; paragraphs: string[] }
  | {
      type: 'contentCard';
      title?: string;
      subtitle?: string;
      badge?: string;
      index?: string;
      paragraphs: string[];
      bulletItems?: string[];
      borderColor?: string;
      bgColor?: string;
      accentColor?: string;
    }
  | { type: 'paragraph'; text: string }
  | { type: 'bullet'; marker: string; title?: string; text: string }
  | { type: 'metaGrid'; items: ExtractedMetaItem[] }
  | { type: 'table'; table: ExtractedTableData }
  | { type: 'figure'; src: string; alt: string; caption: string }
  | { type: 'pillGroup'; pills: string[]; isRelatedLink: boolean }
  | { type: 'relatedArticlesGrid'; cards: ExtractedRelatedCard[] }
  | {
      type: 'authorProfileCard';
      title: string;
      name: string;
      roles: string[];
      credit: string;
      organization: string;
      photoSrc?: string;
    };

function cleanText(raw: string | null | undefined): string {
  return (raw || '')
    .replace(/https?:\/\/[^\s)]+/gi, '')
    .replace(/\bwww\.[^\s)]+/gi, '')
    .replace(/\(\s*\)/g, '')
    .replace(/^(canonical\s+url|direct\s+article\s+url|archive\s+url|source\s+url)\s*:\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const ACTION_CTA_PATTERNS = [
  /^read full article$/i,
  /^read complete monograph$/i,
  /^read more$/i,
  /^inspect chronology record$/i,
  /^inspect full epigraphic record$/i,
  /^view archival manuscript$/i,
  /^open archival chronology record$/i,
  /^view details$/i,
  /^download pdf$/i,
  /^generating pdf/i,
  /^print \/ save pdf$/i,
  /^open in chrome/i,
  /^share$/i,
  /^copy link$/i,
  /^copied$/i,
  /^back to /i,
];

function isActionCtaText(txt: string): boolean {
  const cleaned = cleanText(txt);
  if (!cleaned) return true;
  if (/^(canonical\s+url|direct\s+article\s+url)\s*:/i.test(cleaned)) return true;
  return ACTION_CTA_PATTERNS.some((re) => re.test(cleaned));
}

function isVisualRelatedArticleCard(el: Element): boolean {
  if (el.classList.contains('royal-related-link-btn')) {
    return Boolean(
      el.querySelector(
        'img, h3, h4, p, .royal-profile-title-box, .royal-card-title-box, .article-profile-title, .profile-title-box, .font-royal-heading, .font-serif.font-bold'
      )
    );
  }
  // Also match thumbnail cards inside grids that have a small thumbnail image alongside a title
  const parent = el.parentElement;
  if (parent && parent.classList.contains('grid')) {
    const img = el.querySelector('img');
    const heading = el.querySelector(
      'h3, h4, .royal-profile-title-box, .royal-card-title-box, .article-profile-title, .profile-title-box, .font-royal-heading, .font-serif.font-bold'
    );
    if (img && heading && !el.querySelector('table, dl, ul, ol')) {
      return true;
    }
  }
  return false;
}

const INDEX_TOKEN_REGEX = /^(#\s*\d+(?:\s*\/\s*\d+)?|\[\s*\d+\s*\]|\d+\s*\/\s*\d+)$/;

function extractSingleRelatedCard(
  cardEl: Element,
  fallbackIndex?: number
): ExtractedRelatedCard | null {
  const img = cardEl.querySelector('img');
  const imgSrc = img?.getAttribute('src') || img?.src || '';

  const explicitIndexEl = cardEl.querySelector('.royal-index-box');
  let indexLabel = cleanText(explicitIndexEl?.textContent);

  const headingEl =
    cardEl.querySelector('.royal-card-title-box, .royal-profile-title-box, .article-profile-title, .profile-title-box') ||
    cardEl.querySelector('h3, h4') ||
    cardEl.querySelector('.font-royal-heading, .font-serif.font-bold');
  const titleText = cleanText(headingEl?.textContent);

  const pEls = Array.from(cardEl.querySelectorAll('p'));
  const summaryParts = pEls
    .filter((p) => !headingEl || !headingEl.contains(p))
    .map((p) => cleanText(p.textContent))
    .filter((t) => t && t !== titleText && !isActionCtaText(t));
  const summaryText = summaryParts.join(' ');

  const badgeCandidates = Array.from(cardEl.querySelectorAll('span, div'))
    .filter(
      (node) =>
        node.children.length === 0 &&
        node !== explicitIndexEl &&
        (!headingEl || !headingEl.contains(node)) &&
        !node.closest('p') &&
        !node.classList.contains('no-print')
    )
    .map((node) => cleanText(node.textContent))
    .filter(
      (t) =>
        t &&
        t !== titleText &&
        t !== summaryText &&
        !isActionCtaText(t)
    );

  const uniqueBadges: string[] = [];
  for (const b of badgeCandidates) {
    if (!indexLabel && INDEX_TOKEN_REGEX.test(b)) {
      indexLabel = b.replace(/\s+/g, '');
      continue;
    }
    if (b !== indexLabel && !uniqueBadges.includes(b)) {
      uniqueBadges.push(b);
    }
  }

  const finalTitle = titleText || uniqueBadges.shift() || '';
  if (!finalTitle && !imgSrc) return null;

  if (!indexLabel && typeof fallbackIndex === 'number') {
    indexLabel = `#${fallbackIndex + 1}`;
  }

  return {
    imgSrc,
    indexLabel: indexLabel || undefined,
    badge: uniqueBadges.join(' • ') || undefined,
    title: finalTitle,
    summary: summaryText || undefined,
  };
}

function isInsideSkippedElement(el: Element, root: HTMLElement): boolean {
  let curr: Element | null = el;
  while (curr && curr !== root) {
    if (
      curr.classList.contains('no-print') ||
      curr.classList.contains('print-only') ||
      curr.classList.contains('print-repeating-author-footer')
    ) {
      return true;
    }
    if (curr.tagName === 'NAV') {
      const isToc =
        curr.getAttribute('aria-label') === 'Table of Contents' ||
        curr.classList.contains('toc-nav');
      if (!isToc) {
        return true;
      }
    }
    if (curr.tagName === 'BUTTON') {
      // Keep Related Article cards, Related Link pills, Hashtag pills, and non-CTA content category pills
      if (
        curr.classList.contains('royal-related-link-btn') ||
        curr.classList.contains('theme-hashtag')
      ) {
        curr = curr.parentElement;
        continue;
      }
      const btnTxt = cleanText(curr.textContent);
      if (!btnTxt || isActionCtaText(btnTxt)) {
        return true;
      }
      curr = curr.parentElement;
      continue;
    }
    curr = curr.parentElement;
  }
  return false;
}

function isIndividualContentCard(el: Element, sourceEl: HTMLElement): boolean {
  if (isInsideSkippedElement(el, sourceEl)) return false;
  if (el.tagName === 'HEADER' || el.tagName === 'NAV') return false;
  if (el.tagName === 'TABLE' || el.tagName === 'FIGURE' || el.tagName === 'IMG' || el.tagName === 'DL') return false;
  if (el.classList.contains('royal-related-link-btn') || isVisualRelatedArticleCard(el)) return false;
  if (el.classList.contains('archival-reference-index-section')) return false;

  const isBoxStyled =
    el.classList.contains('border-l-4') ||
    el.classList.contains('scroll-mt-24') ||
    el.classList.contains('bg-emerald-950/20') ||
    el.classList.contains('bg-amber-950/20') ||
    el.classList.contains('bg-[#141a29]') ||
    el.classList.contains('bg-[#121725]') ||
    el.classList.contains('bg-[#121826]') ||
    el.classList.contains('bg-[#111623]') ||
    el.classList.contains('bg-[#121724]') ||
    el.classList.contains('bg-[#17121e]') ||
    el.classList.contains('bg-[#161f33]') ||
    ((el.classList.contains('rounded-xl') || el.classList.contains('rounded-2xl')) &&
      (el.classList.contains('p-3.5') ||
        el.classList.contains('p-4') ||
        el.classList.contains('p-5') ||
        el.classList.contains('p-6') ||
        el.classList.contains('p-7') ||
        el.classList.contains('border') ||
        el.classList.contains('border-2')));

  if (!isBoxStyled) return false;

  // Crucial check: does this element contain nested descendant elements that are THEMSELVES cards?
  // If so, el is a wrapper container (e.g. section or grid), not the individual card.
  const allDescendants = Array.from(el.querySelectorAll('div, section'));
  for (const child of allDescendants) {
    if (child === el) continue;
    if (
      child.classList.contains('border-l-4') ||
      child.classList.contains('scroll-mt-24') ||
      child.classList.contains('bg-emerald-950/20') ||
      child.classList.contains('bg-amber-950/20') ||
      child.classList.contains('bg-[#141a29]') ||
      child.classList.contains('bg-[#121725]') ||
      child.classList.contains('bg-[#121826]') ||
      child.classList.contains('bg-[#111623]') ||
      child.classList.contains('bg-[#121724]') ||
      ((child.classList.contains('rounded-xl') || child.classList.contains('rounded-2xl')) &&
        (child.classList.contains('p-3.5') ||
          child.classList.contains('p-4') ||
          child.classList.contains('p-5') ||
          child.classList.contains('p-6') ||
          child.classList.contains('border')))
    ) {
      return false; // Wrapper container! Let TreeWalker visit children.
    }
  }

  // Must have some body text
  const rawText = cleanText(el.textContent);
  return rawText.length > 5;
}

function extractContentCardFromElement(
  el: Element,
  sourceEl: HTMLElement,
  mainTitle: string,
  handledElements: Set<Element>
): PdfBlock | null {
  const headingEl = el.querySelector('h2, h3, h4, .royal-card-title-box, .font-royal-heading, strong');
  let cardTitle = headingEl ? cleanText(headingEl.textContent) : undefined;
  if (cardTitle === mainTitle) cardTitle = undefined;

  const paragraphs: string[] = [];
  const pEls = Array.from(el.querySelectorAll('p, .whitespace-pre-line, blockquote'));
  for (const p of pEls) {
    if (headingEl && headingEl.contains(p)) continue;
    const lines = (p.textContent || '')
      .split('\n')
      .map((l) => cleanText(l))
      .filter((l) => l.length > 0 && !isActionCtaText(l));
    for (const l of lines) {
      if (!paragraphs.includes(l) && l !== cardTitle) {
        paragraphs.push(l);
      }
    }
  }

  const bulletItems: string[] = [];
  const liEls = Array.from(el.querySelectorAll('li'));
  for (const li of liEls) {
    const l = cleanText(li.textContent).replace(/^[•·\-]\s*/, '');
    if (l && !bulletItems.includes(l) && !isActionCtaText(l)) {
      bulletItems.push(l);
    }
  }

  // Check bullet-style rows if no li tags
  if (bulletItems.length === 0) {
    const directDivs = Array.from(el.querySelectorAll(':scope > div > div, :scope > div'));
    for (const d of directDivs) {
      const spans = Array.from(d.querySelectorAll(':scope > span'));
      if (spans.length === 2 && cleanText(spans[0].textContent) === '') {
        const bTxt = cleanText(spans[1].textContent);
        if (bTxt && !isActionCtaText(bTxt) && !bulletItems.includes(bTxt)) {
          bulletItems.push(bTxt);
        }
      }
    }
  }

  if (paragraphs.length === 0 && bulletItems.length === 0) {
    const raw = cleanText(el.textContent);
    const bodyOnly = cardTitle ? raw.replace(cardTitle, '').trim() : raw;
    if (bodyOnly.length > 5 && !isActionCtaText(bodyOnly)) {
      paragraphs.push(bodyOnly);
    }
  }

  if (paragraphs.length === 0 && bulletItems.length === 0 && !cardTitle) {
    return null;
  }

  // Collect badges and index
  let indexLabel: string | undefined;
  const badgeList: string[] = [];
  const spanEls = Array.from(el.querySelectorAll('span')).filter((s) => {
    if (headingEl && headingEl.contains(s)) return false;
    for (const p of pEls) {
      if (p.contains(s)) return false;
    }
    return s.children.length === 0 && cleanText(s.textContent).length > 0;
  });

  for (const s of spanEls) {
    const sTxt = cleanText(s.textContent);
    if (!sTxt || sTxt === cardTitle || isActionCtaText(sTxt)) continue;
    if (
      !indexLabel &&
      (/^#?\d+(\/\d+)?$/.test(sTxt) ||
        /^\[#?\d+\]$/.test(sTxt) ||
        sTxt.startsWith('Chapter '))
    ) {
      indexLabel = sTxt;
    } else if (!badgeList.includes(sTxt)) {
      badgeList.push(sTxt);
    }
  }

  // If cardTitle is missing, see if badge contains a title-like structure
  if (!cardTitle && badgeList.length > 0) {
    const candidateIdx = badgeList.findIndex(
      (b) => b.startsWith('#') || b.length > 15 || !b.toLowerCase().includes('verified')
    );
    if (candidateIdx >= 0) {
      cardTitle = badgeList[candidateIdx];
      badgeList.splice(candidateIdx, 1);
    }
  }

  // If cardTitle is still missing, fallback to dignified title
  if (!cardTitle) {
    cardTitle = 'Historical Documentation & Analysis';
  }

  let bgColor: string = ROYAL_THEME.surfaceBg;
  let borderColor: string = ROYAL_THEME.borderColor;
  let accentColor: string = ROYAL_THEME.maroonAccent;

  if (el.classList.contains('bg-emerald-950/20')) {
    bgColor = '#F2F9F4';
    borderColor = '#2E7D32';
  } else if (el.classList.contains('bg-amber-950/20')) {
    bgColor = '#FFFBF0';
    borderColor = '#D97706';
  } else if (el.classList.contains('border-l-4')) {
    bgColor = ROYAL_THEME.surfaceBg;
    borderColor = ROYAL_THEME.accentGold;
  } else if (el.classList.contains('scroll-mt-24')) {
    bgColor = ROYAL_THEME.cardBg;
    borderColor = ROYAL_THEME.accentGold;
  }

  return {
    type: 'contentCard',
    title: cardTitle,
    index: indexLabel,
    badge: badgeList.join(' • ') || undefined,
    paragraphs,
    bulletItems: bulletItems.length > 0 ? bulletItems : undefined,
    bgColor,
    borderColor,
    accentColor,
  };
}

/**
 * Extracts structured content from the article DOM element so every heading, metadata field,
 * profile title box, image, executive summary, paragraph, bullet list, table, reference,
 * keyword/hashtag pill, and Related Articles card can be rendered directly via HTML5 2D Canvas.
 */
export function extractStructuredArticleContent(
  sourceEl: HTMLElement,
  fallbackTitle: string
): {
  badges: string[];
  title: string;
  profileTitleBoxes: string[];
  subtitle: string;
  headerMeta: ExtractedMetaItem[];
  leadFigures: { src: string; alt: string; caption: string }[];
  blocks: PdfBlock[];
} {
  const badges: string[] = [];
  let title = cleanText(fallbackTitle);
  const profileTitleBoxes: string[] = [];
  let subtitle = '';
  const headerMeta: ExtractedMetaItem[] = [];
  const leadFigures: { src: string; alt: string; caption: string }[] = [];
  const blocks: PdfBlock[] = [];
  const seenImageSrcs = new Set<string>();
  const handledElements = new Set<Element>();

  // Pre-mark all related article thumbnail images so they are rendered inside their
  // dedicated Light Pink Related Article cards rather than as standalone full-width figures.
  const allRelatedCardsInDoc = Array.from(
    sourceEl.querySelectorAll('.royal-related-link-btn, .grid > div, .grid > a')
  ).filter(isVisualRelatedArticleCard);
  const relatedCardImgs = new Set<Element>();
  for (const rc of allRelatedCardsInDoc) {
    for (const img of Array.from(rc.querySelectorAll('img'))) {
      relatedCardImgs.add(img);
    }
  }

  // Handle PublisherCreditCard: extract its .royal-profile-title-box so the Light Orange
  // Profile Title Box is always preserved, and extract closing author credentials.
  const publisherCards = Array.from(
    sourceEl.querySelectorAll(
      '[aria-label="Article Publisher and Author Details"], [aria-label^="Author Profile"]'
    )
  );
  let closingAuthorCard: {
    title: string;
    name: string;
    roles: string[];
    credit: string;
    organization: string;
    photoSrc?: string;
  } | null = null;

  for (const pubCard of publisherCards) {
    const titleBoxes = Array.from(
      pubCard.querySelectorAll('.royal-profile-title-box, .article-profile-title, .profile-title-box')
    );
    for (const tb of titleBoxes) {
      const tText = cleanText(tb.textContent);
      if (tText && !profileTitleBoxes.includes(tText)) {
        profileTitleBoxes.push(tText);
      }
    }
    const cardImg = pubCard.querySelector('img');
    const photoSrc = cardImg?.getAttribute('src') || cardImg?.src || AUTHOR_PHOTO_PATH;
    closingAuthorCard = {
      title: 'HISTORICAL DOCUMENTATION & RESEARCH AUTHORITY',
      name: CANONICAL_AUTHOR_NAME,
      roles: [
        'Founder',
        'Web Developer / Designer',
        'Digital Creator',
        'Historical Documentation Contributor',
      ],
      credit: CANONICAL_AUTHOR_CREDIT,
      organization: CANONICAL_ORGANIZATION,
      photoSrc,
    };
    handledElements.add(pubCard);
  }

  const headerEl = sourceEl.querySelector('header');
  if (headerEl) {
    const h1 = headerEl.querySelector('h1');
    if (h1 && cleanText(h1.textContent)) {
      title = cleanText(h1.textContent);
      handledElements.add(h1);
    }

    // Extract any .royal-profile-title-box / .article-profile-title / .profile-title-box inside header
    const headerProfileBoxes = Array.from(
      headerEl.querySelectorAll('.royal-profile-title-box, .article-profile-title, .profile-title-box')
    );
    for (const box of headerProfileBoxes) {
      const boxTxt = cleanText(box.textContent);
      if (boxTxt && !profileTitleBoxes.includes(boxTxt)) {
        profileTitleBoxes.push(boxTxt);
      }
      handledElements.add(box);
    }

    const firstH2InHeader = headerEl.querySelector('h2, h3, h4, dl');
    const badgeSpans = Array.from(headerEl.querySelectorAll('span, div')).filter(
      (el) =>
        !isInsideSkippedElement(el, sourceEl) &&
        !handledElements.has(el) &&
        !el.classList.contains('royal-profile-title-box') &&
        !el.classList.contains('article-profile-title') &&
        !el.classList.contains('profile-title-box') &&
        !el.closest('.royal-profile-title-box, .article-profile-title, .profile-title-box') &&
        !el.closest('dl') &&
        !el.closest('figure') &&
        !el.closest('p') &&
        !el.closest('[aria-label="Article Publisher and Author Details"], [aria-label^="Author Profile"]') &&
        el.children.length === 0 &&
        cleanText(el.textContent).length >= 1 &&
        cleanText(el.textContent).length <= 120 &&
        (!h1 || Boolean(el.compareDocumentPosition(h1) & Node.DOCUMENT_POSITION_FOLLOWING)) &&
        (!firstH2InHeader ||
          Boolean(el.compareDocumentPosition(firstH2InHeader) & Node.DOCUMENT_POSITION_FOLLOWING))
    );
    for (const b of badgeSpans.slice(0, 6)) {
      const txt = cleanText(b.textContent);
      if (txt && txt !== title && !badges.includes(txt) && !profileTitleBoxes.includes(txt)) {
        badges.push(txt);
        handledElements.add(b);
      }
    }

    // Extract header metadata (<dl><div><dt/><dd/></div></dl>)
    const dlEls = Array.from(headerEl.querySelectorAll('dl'));
    for (const dl of dlEls) {
      const dlItems = Array.from(dl.querySelectorAll(':scope > div'));
      for (const item of dlItems) {
        const dt = cleanText(item.querySelector('dt')?.textContent);
        const dd = cleanText(item.querySelector('dd')?.textContent);
        if (dt && dd) {
          headerMeta.push({ label: dt, value: dd });
        }
      }
      handledElements.add(dl);
    }

    // Also extract card-based metadata inside header (e.g., ArticleDetailView / KingsQueensPage 3-col metadata grid)
    if (headerMeta.length === 0) {
      const metaGrids = Array.from(headerEl.querySelectorAll('.grid'));
      for (const grid of metaGrids) {
        // Never treat a layout grid containing H1, H2, figures, or images as a compact metadata grid
        if (grid.querySelector('h1, h2, h3, h4, img, figure, dl')) continue;
        const metaBoxes = Array.from(grid.querySelectorAll(':scope > div'));
        let matchedAny = false;
        for (const box of metaBoxes) {
          if (handledElements.has(box)) continue;
          const childDivs = Array.from(box.querySelectorAll(':scope > div'));
          if (childDivs.length >= 2) {
            const lbl = cleanText(childDivs[0].textContent);
            const val = cleanText(childDivs[1].textContent);
            if (lbl && val && lbl.length < 60) {
              headerMeta.push({ label: lbl, value: val });
              handledElements.add(box);
              matchedAny = true;
            }
          }
        }
        if (matchedAny) {
          handledElements.add(grid);
        }
      }
    }

    // Check for a direct subtitle paragraph right below H1 (only if not inside an H2 or border-l-4 summary box)
    const headerParas = Array.from(headerEl.querySelectorAll('p')).filter(
      (p) =>
        !isInsideSkippedElement(p, sourceEl) &&
        !handledElements.has(p) &&
        !p.classList.contains('royal-profile-title-box') &&
        !p.classList.contains('article-profile-title') &&
        !p.classList.contains('profile-title-box') &&
        !p.closest('.royal-profile-title-box, .article-profile-title, .profile-title-box') &&
        !p.closest('figcaption') &&
        !p.closest('.border-l-4') &&
        !p.closest('[aria-label="Article Publisher and Author Details"], [aria-label^="Author Profile"]')
    );
    if (headerParas.length > 0) {
      const firstPara = headerParas[0];
      const precedingH2 = headerEl.querySelector('h2, h3, h4');
      const isAfterH2 =
        precedingH2 &&
        Boolean(
          precedingH2.compareDocumentPosition(firstPara) &
            Node.DOCUMENT_POSITION_FOLLOWING
        );
      if (!isAfterH2) {
        subtitle = cleanText(firstPara.textContent);
        handledElements.add(firstPara);
      }
    }

    const headerFigures = Array.from(headerEl.querySelectorAll('figure'));
    for (const fig of headerFigures) {
      if (isInsideSkippedElement(fig, sourceEl)) continue;
      const img = fig.querySelector('img');
      const src = img?.getAttribute('src') || img?.src || '';
      if (
        src &&
        !src.includes('dr_g_sathyanarayana_raju') &&
        !relatedCardImgs.has(img!) &&
        !seenImageSrcs.has(src)
      ) {
        seenImageSrcs.add(src);
        leadFigures.push({
          src,
          alt: cleanText(img?.getAttribute('alt')) || title,
          caption: cleanText(fig.querySelector('figcaption')?.textContent),
        });
      }
      handledElements.add(fig);
    }

    const standaloneHeaderImgs = Array.from(headerEl.querySelectorAll('img'));
    for (const img of standaloneHeaderImgs) {
      if (isInsideSkippedElement(img, sourceEl) || handledElements.has(img)) continue;
      if (
        img.closest('figure') ||
        img.closest('[aria-label="Article Publisher and Author Details"], [aria-label^="Author Profile"]')
      ) {
        continue;
      }
      const src = img.getAttribute('src') || img.src || '';
      if (
        src &&
        !src.includes('dr_g_sathyanarayana_raju') &&
        !relatedCardImgs.has(img) &&
        !seenImageSrcs.has(src)
      ) {
        seenImageSrcs.add(src);
        leadFigures.push({
          src,
          alt: cleanText(img.getAttribute('alt')) || title,
          caption: '',
        });
      }
      handledElements.add(img);
    }
  } else {
    const firstH1 = sourceEl.querySelector('h1');
    if (firstH1 && cleanText(firstH1.textContent)) {
      title = cleanText(firstH1.textContent);
      handledElements.add(firstH1);
    }
  }

  // Also check for direct lead figure right after header
  const directLeadFigures = Array.from(sourceEl.querySelectorAll('figure.print-lead-figure'));
  for (const fig of directLeadFigures) {
    if (isInsideSkippedElement(fig, sourceEl)) continue;
    const img = fig.querySelector('img');
    const src = img?.getAttribute('src') || img?.src || '';
    if (
      src &&
      !src.includes('dr_g_sathyanarayana_raju') &&
      !seenImageSrcs.has(src)
    ) {
      seenImageSrcs.add(src);
      leadFigures.push({
        src,
        alt: cleanText(img?.getAttribute('alt')) || title,
        caption: cleanText(fig.querySelector('figcaption')?.textContent),
      });
    }
    handledElements.add(fig);
  }

  const processContainer = (containerEl: Element) => {
    if (isInsideSkippedElement(containerEl, sourceEl)) return;

    const walker = document.createTreeWalker(containerEl, NodeFilter.SHOW_ELEMENT);
    let node = walker.nextNode() as Element | null;

    while (node) {
      const el = node;
      node = walker.nextNode() as Element | null;

      if (handledElements.has(el) || isInsideSkippedElement(el, sourceEl)) {
        continue;
      }

      let ancestorHandled = false;
      let parent = el.parentElement;
      while (parent && parent !== containerEl && parent !== sourceEl) {
        if (handledElements.has(parent)) {
          ancestorHandled = true;
          break;
        }
        parent = parent.parentElement;
      }
      if (ancestorHandled) continue;

      const tag = el.tagName.toUpperCase();

      // 0. Handle Archival Reference Summary & Catalogue Index section (.archival-reference-index-section)
      if (el.classList.contains('archival-reference-index-section')) {
        const headingEl = el.querySelector('h3, h4, .archival-reference-index-title');
        const idxTitle = cleanText(headingEl?.textContent) || 'Archival Reference Summary & Catalogue Index';
        const liItems = Array.from(el.querySelectorAll('li'))
          .map((li) => cleanText(li.textContent).replace(/^[•·\-]\s*/, ''))
          .filter(Boolean);
        blocks.push({ type: 'archivalReferenceIndexBox', title: idxTitle, items: liItems });
        handledElements.add(el);
        continue;
      }

      // 0B. Handle Table of Contents (<nav aria-label="Table of Contents"> or .toc-nav)
      if (
        tag === 'NAV' &&
        (el.getAttribute('aria-label') === 'Table of Contents' || el.classList.contains('toc-nav'))
      ) {
        const headingEl = el.querySelector('h2, h3, h4, div.font-bold, .font-bold');
        const tocTitle = cleanText(headingEl?.textContent) || 'Table of Contents & Monograph Chapters';
        const items: string[] = [];
        const buttonsOrLinks = Array.from(el.querySelectorAll('button, a, li, .grid > div'));
        for (const itemEl of buttonsOrLinks) {
          const itemTxt = cleanText(itemEl.textContent);
          if (itemTxt && itemTxt !== tocTitle && !items.includes(itemTxt) && !isActionCtaText(itemTxt)) {
            items.push(itemTxt);
          }
        }
        if (items.length > 0) {
          blocks.push({
            type: 'archivalReferenceIndexBox',
            title: tocTitle,
            items,
          });
        }
        handledElements.add(el);
        continue;
      }

      // 1. Handle Profile Title Box (.royal-profile-title-box, .article-profile-title, .profile-title-box) anywhere in body (outside related article cards)
      if (
        (el.classList.contains('royal-profile-title-box') ||
          el.classList.contains('article-profile-title') ||
          el.classList.contains('profile-title-box')) &&
        !el.closest('.royal-related-link-btn')
      ) {
        const boxTxt = cleanText(el.textContent);
        if (boxTxt && !profileTitleBoxes.includes(boxTxt)) {
          blocks.push({ type: 'profileTitleBox', text: boxTxt });
        }
        handledElements.add(el);
        continue;
      }

      // 2. Handle Visual Related Article Card containers (grids of .royal-related-link-btn or thumbnail cards)
      if (tag === 'DIV' || tag === 'SECTION') {
        const directRelatedCards = Array.from(el.children).filter(
          isVisualRelatedArticleCard
        );

        if (directRelatedCards.length > 0) {
          const nonSkippedChildren = Array.from(el.children).filter(
            (c) => !isInsideSkippedElement(c, sourceEl)
          );
          const allChildrenAreCards = nonSkippedChildren.every((c) =>
            isVisualRelatedArticleCard(c)
          );

          const extractedCards: ExtractedRelatedCard[] = [];
          directRelatedCards.forEach((cardEl, idx) => {
            const c = extractSingleRelatedCard(cardEl, idx);
            if (c) extractedCards.push(c);
            handledElements.add(cardEl);
          });
          if (extractedCards.length > 0) {
            blocks.push({ type: 'relatedArticlesGrid', cards: extractedCards });
          }

          // Only mark parent container as handled if ALL children were related cards.
          // If non-card sibling elements exist (e.g. documents, manuscripts, notes),
          // allow TreeWalker to continue into them so no content is dropped.
          if (allChildrenAreCards) {
            handledElements.add(el);
            continue;
          }
        }
      }

      // Handle standalone visual .royal-related-link-btn card if not in a direct grid
      if (isVisualRelatedArticleCard(el)) {
        const prevBlock = blocks[blocks.length - 1];
        const nextIdx =
          prevBlock && prevBlock.type === 'relatedArticlesGrid'
            ? prevBlock.cards.length
            : 0;
        const c = extractSingleRelatedCard(el, nextIdx);
        if (c) {
          if (prevBlock && prevBlock.type === 'relatedArticlesGrid') {
            prevBlock.cards.push(c);
          } else {
            blocks.push({ type: 'relatedArticlesGrid', cards: [c] });
          }
        }
        handledElements.add(el);
        continue;
      }

      // 2B. Handle Content Cards / Nested Descriptive Article Boxes
      // (Executive Summary, Verification Panels, Chapter Cards, Timeline Cards, Inscription Cards, Citation Cards, Reference Mapping Cards, Historical Narrative Containers)
      if (isIndividualContentCard(el, sourceEl)) {
        const card = extractContentCardFromElement(el, sourceEl, title, handledElements);
        if (card) {
          blocks.push(card);
          handledElements.add(el);
          for (const child of Array.from(el.querySelectorAll('*'))) {
            handledElements.add(child);
          }
          continue;
        }
      }

      // 3. Handle dedicated pill-row containers (.royal-related-link-btn text pills, .theme-hashtag pills, or flex-wrap tag/badge rows)
      // CRITICAL: Only match leaf pill-row containers that do NOT contain headings, paragraphs, grids, lists, or child div sections,
      // so parent sections and sibling headings/paragraphs are never swallowed.
      if (
        tag === 'DIV' &&
        !el.classList.contains('justify-between') &&
        !el.nextElementSibling?.matches('h3, h4') &&
        !el.querySelector('h1, h2, h3, h4, p, dl, ul, ol, li, table, figure, img, blockquote, section, div')
      ) {
        const directChildren = Array.from(el.children).filter(
          (c) => !isInsideSkippedElement(c, sourceEl)
        );
        const relatedPillsEls = directChildren.filter(
          (c) => c.classList.contains('royal-related-link-btn') && !isVisualRelatedArticleCard(c)
        );
        const hashtagPillsEls = directChildren.filter((c) =>
          c.classList.contains('theme-hashtag')
        );

        if (relatedPillsEls.length > 0 && relatedPillsEls.length === directChildren.length) {
          const pills = relatedPillsEls
            .map((pill) => cleanText(pill.textContent))
            .filter((t) => t && !isActionCtaText(t));
          if (pills.length > 0) {
            blocks.push({ type: 'pillGroup', pills, isRelatedLink: true });
          }
          handledElements.add(el);
          continue;
        }

        if (hashtagPillsEls.length > 0 && hashtagPillsEls.length === directChildren.length) {
          const pills = hashtagPillsEls
            .map((pill) => cleanText(pill.textContent))
            .filter((t) => t && !isActionCtaText(t));
          if (pills.length > 0) {
            blocks.push({ type: 'pillGroup', pills, isRelatedLink: false });
          }
          handledElements.add(el);
          continue;
        }

        // Also handle flex-wrap pill rows of <span> or <button> items (e.g., Alternative Names, Profession Categories, Associated Places)
        if (
          el.classList.contains('flex-wrap') &&
          directChildren.length > 0 &&
          directChildren.every(
            (c) => c.tagName.toUpperCase() === 'SPAN' || c.tagName.toUpperCase() === 'BUTTON'
          )
        ) {
          const pills = directChildren
            .map((pill) => cleanText(pill.textContent))
            .filter((t) => t && !isActionCtaText(t));
          if (pills.length > 0) {
            blocks.push({ type: 'pillGroup', pills, isRelatedLink: false });
          }
          handledElements.add(el);
          continue;
        }
      }

      // Skip pre-consuming compact badge columns/bars that immediately precede an H3/H4 heading so H3/H4 can attach them cleanly
      if (
        tag === 'DIV' &&
        !el.querySelector('h1, h2, h3, h4, p, dl, ul, ol, li, table, figure, img') &&
        ((el.nextElementSibling &&
          (el.nextElementSibling.matches('h3, h4') ||
            Boolean(el.nextElementSibling.querySelector(':scope > h3, :scope > h4')))) ||
          (el.parentElement &&
            el.parentElement.nextElementSibling?.matches('h3, h4')))
      ) {
        const candSpans = Array.from(el.querySelectorAll('span')).filter(
          (s) => s.children.length === 0
        );
        if (
          candSpans.length > 0 &&
          candSpans.every((s) => cleanText(s.textContent).length <= 100)
        ) {
          continue;
        }
      }

      if (tag === 'H2') {
        const txt = cleanText(el.textContent);
        if (txt && txt !== title) {
          blocks.push({ type: 'sectionHeading', text: txt });
        }
        handledElements.add(el);
      } else if (tag === 'H3' || tag === 'H4') {
        if (el.closest('li')) continue;
        let txt = cleanText(el.textContent);
        // Only collect badge spans that PRECEDE this H3/H4 inside the same header bar or preceding sibling badge column.
        // NEVER collect spans from sibling content containers that follow the H3/H4.
        const parentEl = el.parentElement;
        if (parentEl) {
          const candidateSpans: Element[] = [];
          const prevBadgeCol = parentEl.previousElementSibling;
          if (
            prevBadgeCol &&
            !handledElements.has(prevBadgeCol) &&
            !prevBadgeCol.querySelector('h1, h2, h3, h4, p, dl, ul, ol, table, figure, img')
          ) {
            for (const s of Array.from(prevBadgeCol.querySelectorAll('span'))) {
              if (s.children.length === 0 && !handledElements.has(s)) {
                candidateSpans.push(s);
              }
            }
            handledElements.add(prevBadgeCol);
          }

          const precedingInParent = Array.from(
            parentEl.querySelectorAll(':scope > span, :scope > div > span')
          ).filter(
            (s) =>
              s.children.length === 0 &&
              !handledElements.has(s) &&
              !el.contains(s) &&
              Boolean(s.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)
          );
          candidateSpans.push(...precedingInParent);

          const badgeParts: string[] = [];
          for (const s of candidateSpans) {
            const sTxt = cleanText(s.textContent);
            if (
              sTxt &&
              sTxt.length <= 90 &&
              !txt.includes(sTxt) &&
              !badgeParts.includes(sTxt) &&
              !isActionCtaText(sTxt)
            ) {
              badgeParts.push(sTxt);
            }
            handledElements.add(s);
          }
          if (badgeParts.length > 0) {
            txt = `${badgeParts.join(' • ')} — ${txt}`;
          }
        }
        if (txt) {
          blocks.push({ type: 'subHeading', text: txt });
        }
        handledElements.add(el);
      } else if (tag === 'FIGURE') {
        const img = el.querySelector('img');
        const src = img?.getAttribute('src') || img?.src || '';
        if (
          src &&
          !src.includes('dr_g_sathyanarayana_raju') &&
          (!img || !relatedCardImgs.has(img)) &&
          !seenImageSrcs.has(src)
        ) {
          seenImageSrcs.add(src);
          blocks.push({
            type: 'figure',
            src,
            alt: cleanText(img?.getAttribute('alt')) || title,
            caption: cleanText(el.querySelector('figcaption')?.textContent),
          });
        }
        handledElements.add(el);
      } else if (tag === 'IMG') {
        if (relatedCardImgs.has(el)) {
          handledElements.add(el);
          continue;
        }
        const src = el.getAttribute('src') || (el as HTMLImageElement).src || '';
        if (src && !src.includes('dr_g_sathyanarayana_raju') && !seenImageSrcs.has(src)) {
          seenImageSrcs.add(src);
          blocks.push({
            type: 'figure',
            src,
            alt: cleanText(el.getAttribute('alt')) || title,
            caption: '',
          });
        }
        handledElements.add(el);
      } else if (tag === 'TABLE') {
        const headers: string[] = [];
        const rows: string[][] = [];
        const ths = Array.from(el.querySelectorAll('thead th, tr:first-child th'));
        for (const th of ths) {
          headers.push(cleanText(th.textContent));
        }
        const trs = Array.from(el.querySelectorAll('tbody tr, tr'));
        for (const tr of trs) {
          if (tr.querySelector('th') && headers.length > 0) continue;
          const tds = Array.from(tr.querySelectorAll('td, th')).map((cell) =>
            cleanText(cell.textContent)
          );
          if (tds.some(Boolean)) {
            rows.push(tds);
          }
        }
        if (headers.length > 0 || rows.length > 0) {
          blocks.push({ type: 'table', table: { headers, rows } });
        }
        handledElements.add(el);
      } else if (tag === 'DL') {
        const items: ExtractedMetaItem[] = [];
        const divs = Array.from(el.querySelectorAll(':scope > div'));
        if (divs.length > 0) {
          for (const d of divs) {
            const dt = cleanText(d.querySelector('dt')?.textContent);
            const dd = cleanText(d.querySelector('dd')?.textContent);
            if (dt && dd) items.push({ label: dt, value: dd });
          }
        } else {
          const dts = Array.from(el.querySelectorAll('dt'));
          const dds = Array.from(el.querySelectorAll('dd'));
          for (let i = 0; i < Math.min(dts.length, dds.length); i++) {
            const dt = cleanText(dts[i].textContent);
            const dd = cleanText(dds[i].textContent);
            if (dt && dd) items.push({ label: dt, value: dd });
          }
        }
        if (items.length > 0) {
          blocks.push({ type: 'metaGrid', items });
        }
        handledElements.add(el);
      } else if (tag === 'LI') {
        const parentList = el.parentElement;
        const isOrdered = parentList?.tagName.toUpperCase() === 'OL';
        const siblings = parentList
          ? Array.from(parentList.children).filter((c) => c.tagName.toUpperCase() === 'LI')
          : [el];
        const idx = siblings.indexOf(el) + 1;

        const headingEl = el.querySelector('h3, h4, strong');
        const pEls = Array.from(el.querySelectorAll('p'));
        if (headingEl && pEls.length > 0) {
          const itemTitle = cleanText(headingEl.textContent);
          const itemBody = pEls.map((p) => cleanText(p.textContent)).filter(Boolean).join(' — ');
          const spans = Array.from(el.querySelectorAll('span'))
            .map((s) => cleanText(s.textContent))
            .filter((s) => s && s !== itemTitle && !itemBody.includes(s));
          const prefix = spans.length > 0 ? `[${spans.join(' • ')}] ${itemTitle}` : itemTitle;
          blocks.push({
            type: 'bullet',
            marker: isOrdered ? `${idx}.` : '•',
            title: prefix,
            text: itemBody,
          });
        } else {
          const fullText = cleanText(el.textContent);
          const cleanedBullet = fullText.replace(/^\d+\s+/, '').replace(/^[•·\-]\s*/, '');
          if (cleanedBullet) {
            blocks.push({
              type: 'bullet',
              marker: isOrdered ? `${idx}.` : '•',
              text: cleanedBullet,
            });
          }
        }
        handledElements.add(el);
      } else if (tag === 'P' || tag === 'BLOCKQUOTE' || tag === 'PRE') {
        if (el.closest('li') || el.closest('figcaption') || el.closest('td') || el.closest('dd')) {
          continue;
        }
        const rawLines = (el.textContent || '')
          .split('\n')
          .map((line) => cleanText(line))
          .filter((line) => Boolean(line) && !isActionCtaText(line));
        for (const line of rawLines) {
          blocks.push({ type: 'paragraph', text: line });
        }
        handledElements.add(el);
      } else if (tag === 'DIV' || tag === 'SPAN') {
        if (
          el.closest('li') ||
          el.closest('figcaption') ||
          el.closest('td') ||
          el.closest('th') ||
          el.closest('dd') ||
          el.closest('dt') ||
          el.closest('p') ||
          el.closest('h1') ||
          el.closest('h2') ||
          el.closest('h3') ||
          el.closest('h4')
        ) {
          continue;
        }

        // Skip standalone badge/chapter spans that immediately precede an H2/H3/H4 heading so headings can attach them cleanly
        if (
          tag === 'SPAN' &&
          (el.parentElement?.querySelector('h2, h3, h4') ||
            el.nextElementSibling?.matches('h2, h3, h4') ||
            el.parentElement?.nextElementSibling?.matches('h2, h3, h4'))
        ) {
          continue;
        }
        // Check if this is a standalone pill button/span inside a non-handled container
        if (
          el.classList.contains('royal-related-link-btn') ||
          el.classList.contains('theme-hashtag')
        ) {
          const pTxt = cleanText(el.textContent);
          if (pTxt && !isActionCtaText(pTxt)) {
            const isRel = el.classList.contains('royal-related-link-btn');
            const prev = blocks[blocks.length - 1];
            if (prev && prev.type === 'pillGroup' && prev.isRelatedLink === isRel) {
              if (!prev.pills.includes(pTxt)) prev.pills.push(pTxt);
            } else {
              blocks.push({ type: 'pillGroup', pills: [pTxt], isRelatedLink: isRel });
            }
          }
          handledElements.add(el);
          continue;
        }

        const hasBlockChildren = Boolean(
          el.querySelector('div, p, h1, h2, h3, h4, ul, ol, li, table, dl, figure, section, blockquote, pre')
        );
        if (!hasBlockChildren) {
          const isInsideHeader = Boolean(headerEl && headerEl.contains(el));
          // Check if this div is a bullet-style row (e.g., dot span + text span in majorContributions or keyFortressesAndSites)
          const childSpans = Array.from(el.querySelectorAll(':scope > span'));
          if (
            tag === 'DIV' &&
            childSpans.length === 2 &&
            cleanText(childSpans[0].textContent) === '' &&
            cleanText(childSpans[1].textContent).length > 0
          ) {
            const bulletTxt = cleanText(childSpans[1].textContent);
            if (!isActionCtaText(bulletTxt)) {
              blocks.push({ type: 'bullet', marker: '•', text: bulletTxt });
              handledElements.add(el);
              continue;
            }
          }

          // Check if this div is a bold uppercase subheading label preceding content (e.g., Executive Intro, Epistemic Pillar Title, Keywords/Hashtags Heading)
          if (
            tag === 'DIV' &&
            el.classList.contains('font-bold') &&
            (el.classList.contains('uppercase') || Boolean(el.nextElementSibling?.matches('p'))) &&
            el.nextElementSibling
          ) {
            const subTxt = cleanText(el.textContent);
            if (subTxt && subTxt.length <= 160 && !isActionCtaText(subTxt)) {
              if (el.parentElement?.classList.contains('border-l-4')) {
                blocks.push({ type: 'sectionHeading', text: subTxt });
              } else {
                blocks.push({ type: 'subHeading', text: subTxt });
              }
              handledElements.add(el);
              continue;
            }
          }

          // Build clean text preserving spaces between adjacent inline child elements (<span>, <strong>, <button>)
          let combinedText = '';
          if (el.children.length > 0 && !el.classList.contains('whitespace-pre-line')) {
            const parts: string[] = [];
            el.childNodes.forEach((cn) => {
              if (cn.nodeType === Node.TEXT_NODE) {
                const t = cleanText(cn.textContent);
                if (t) parts.push(t);
              } else if (cn.nodeType === Node.ELEMENT_NODE) {
                const childEl = cn as Element;
                if (!isInsideSkippedElement(childEl, sourceEl) && !handledElements.has(childEl)) {
                  const t = cleanText(childEl.textContent);
                  if (t && !isActionCtaText(t)) parts.push(t);
                }
              }
            });
            combinedText = parts.join(' ');
          } else {
            combinedText = el.textContent || '';
          }

          const rawLines = combinedText
            .split('\n')
            .map((line) => cleanText(line))
            .filter(
              (line) =>
                line.length > 1 &&
                line !== title &&
                (!isInsideHeader || !badges.includes(line)) &&
                !profileTitleBoxes.includes(line) &&
                !isActionCtaText(line)
            );
          for (const line of rawLines) {
            blocks.push({ type: 'paragraph', text: line });
          }
          if (rawLines.length > 0) {
            handledElements.add(el);
          }
        }
      }
    }
  };

  processContainer(sourceEl);

  if (closingAuthorCard) {
    blocks.push({
      type: 'authorProfileCard',
      title: closingAuthorCard.title,
      name: closingAuthorCard.name,
      roles: closingAuthorCard.roles,
      credit: closingAuthorCard.credit,
      organization: closingAuthorCard.organization,
      photoSrc: closingAuthorCard.photoSrc,
    });
  }

  if (blocks.length === 0) {
    const rawLines = (sourceEl.innerText || '')
      .split('\n')
      .map((l) => cleanText(l))
      .filter((l) => l && l !== title && !isActionCtaText(l));
    for (const line of rawLines) {
      blocks.push({ type: 'paragraph', text: line });
    }
  }

  return {
    badges,
    title,
    profileTitleBoxes,
    subtitle,
    headerMeta,
    leadFigures,
    blocks,
  };
}

/**
 * Renders the repeating circular-photo Author Footer (`Dr.G Sathyanarayana Raju`)
 * and `Page X of Y` badge onto a high-resolution HTML5 Canvas data URL.
 * Uses the Royal Light Almond theme (`#FFFCF5` / `#FFF9EF` / `#54351F` / `#A87924`).
 */
function renderRepeatingAuthorFooterDataUrl(
  pageNumber: number,
  totalPages: number,
  avatarImg: HTMLImageElement | null,
  labels?: PdfAuthorFooterLabels
): string {
  const width = 1520;
  const height = 148;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Royal Card Background (#FFFCF5)
  ctx.fillStyle = ROYAL_THEME.cardBg;
  ctx.fillRect(0, 0, width, height);

  // Top gold accent border (#A87924)
  ctx.fillStyle = ROYAL_THEME.accentGold;
  ctx.fillRect(0, 0, width, 4);

  // Bottom primary maroon accent bar (#762D35)
  ctx.fillStyle = ROYAL_THEME.maroonAccent;
  ctx.fillRect(0, height - 6, width, 6);

  // Circular author photo frame on left
  const centerX = 72;
  const centerY = height / 2;
  const radius = 46;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
  ctx.fillStyle = ROYAL_THEME.maroonAccent;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 3, 0, Math.PI * 2);
  ctx.fillStyle = ROYAL_THEME.accentGold;
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  ctx.fillStyle = ROYAL_THEME.surfaceBg;
  ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

  if (avatarImg && avatarImg.naturalWidth > 0) {
    const imgW = avatarImg.naturalWidth;
    const imgH = avatarImg.naturalHeight;
    const scale = Math.max((radius * 2) / imgW, (radius * 2) / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = centerX - drawW / 2;
    const drawY = centerY - radius;
    ctx.drawImage(avatarImg, drawX, drawY, drawW, drawH);
  } else {
    ctx.fillStyle = ROYAL_THEME.headingText;
    ctx.font = 'bold 28px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GSR', centerX, centerY);
  }
  ctx.restore();

  const textX = 140;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // Primary Line: Author Name (#54351F) + Roles (#292521)
  ctx.font = 'bold 24px Georgia, "Times New Roman", serif';
  ctx.fillStyle = ROYAL_THEME.headingText;
  ctx.fillText(CANONICAL_AUTHOR_NAME, textX, 54);

  const nameWidth = ctx.measureText(CANONICAL_AUTHOR_NAME).width;

  ctx.font = 'bold 19px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = ROYAL_THEME.accentGold;
  ctx.fillText('•', textX + nameWidth + 12, 53);

  ctx.font = 'bold 17px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = ROYAL_THEME.primaryText;
  ctx.fillText(CANONICAL_AUTHOR_ROLES, textX + nameWidth + 28, 53);

  // Secondary Line: Research, Documentation & Compilation by Dr.G Sathyanarayana Raju
  ctx.font = 'bold 17px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = ROYAL_THEME.linkColor;
  ctx.fillText(CANONICAL_AUTHOR_CREDIT, textX, 88);

  // Tertiary Line: Organization
  ctx.font = '600 16px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = ROYAL_THEME.secondaryText;
  ctx.fillText(CANONICAL_ORGANIZATION, textX, 118);

  // Right Block: Vertical Gold Divider + Page X of Y Badge
  const dividerX = width - 275;
  ctx.fillStyle = ROYAL_THEME.accentGold;
  ctx.fillRect(dividerX, 24, 2, height - 48);

  const badgeX = dividerX + 22;
  const badgeY = 40;
  const badgeW = width - badgeX - 24;
  const badgeH = 68;

  drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 12);
  ctx.fillStyle = ROYAL_THEME.surfaceBg;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = ROYAL_THEME.accentGold;
  ctx.stroke();

  const pageWord = labels?.pageWord || 'Page';
  const ofWord = labels?.ofWord || 'of';
  const safePageNum = Math.max(1, pageNumber);
  const safeTotalPages = Math.max(1, totalPages);
  const pageText = `${pageWord} ${safePageNum} ${ofWord} ${safeTotalPages}`;

  ctx.font = 'bold 21px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = ROYAL_THEME.headingText;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(pageText, badgeX + badgeW / 2, badgeY + badgeH / 2);

  return canvas.toDataURL('image/png');
}

/**
 * Renders the entire article into an array of crisp A4 Page Canvases (`1654 × 2339 px`)
 * using the Royal UI Component System and Royal Light Almond theme tokens.
 */
async function renderArticlePagesToCanvases(
  sourceEl: HTMLElement,
  fallbackTitle: string,
  language: LanguageCode = 'en'
): Promise<HTMLCanvasElement[]> {
  const PAGE_W = 1654; // A4 width at ~200 DPI
  const PAGE_H = 2339; // A4 height at ~200 DPI
  const MARGIN_X = 96;
  const MARGIN_TOP = 92;
  const FOOTER_RESERVED_H = 205;
  const CONTENT_W = PAGE_W - MARGIN_X * 2;
  const MAX_Y = PAGE_H - FOOTER_RESERVED_H;

  const serifFont = getPdfFontStack(true, language);
  const sansFont = getPdfFontStack(false, language);

  const data = extractStructuredArticleContent(sourceEl, fallbackTitle);

  const allSrcs = new Set<string>();
  allSrcs.add(AUTHOR_PHOTO_PATH);
  for (const fig of data.leadFigures) {
    if (fig.src) allSrcs.add(fig.src);
  }
  for (const b of data.blocks) {
    if (b.type === 'figure' && b.src) {
      allSrcs.add(b.src);
    } else if (b.type === 'relatedArticlesGrid') {
      for (const card of b.cards) {
        if (card.imgSrc) allSrcs.add(card.imgSrc);
      }
    } else if (b.type === 'authorProfileCard' && b.photoSrc) {
      allSrcs.add(b.photoSrc);
    }
  }

  const imageMap = new Map<string, HTMLImageElement>();
  await Promise.all(
    Array.from(allSrcs).map(async (src) => {
      const loaded = await loadImageElement(src);
      if (loaded && loaded.naturalWidth > 0) {
        imageMap.set(src, loaded);
      }
    })
  );

  const pages: HTMLCanvasElement[] = [];
  let currentCanvas!: HTMLCanvasElement;
  let ctx!: CanvasRenderingContext2D;
  let cursorY = MARGIN_TOP;

  const startNewPage = () => {
    currentCanvas = document.createElement('canvas');
    currentCanvas.width = PAGE_W;
    currentCanvas.height = PAGE_H;
    const context = currentCanvas.getContext('2d')!;
    ctx = context;

    // Outer Royal Light Almond Page Background (#F5EBD9)
    ctx.fillStyle = ROYAL_THEME.pageBg;
    ctx.fillRect(0, 0, PAGE_W, PAGE_H);

    // Inner Royal Card Sheet (#FFFCF5) with Archival Gold Frame (#A87924)
    ctx.fillStyle = ROYAL_THEME.cardBg;
    ctx.fillRect(56, 52, PAGE_W - 112, PAGE_H - FOOTER_RESERVED_H - 36);

    ctx.strokeStyle = ROYAL_THEME.accentGold;
    ctx.lineWidth = 2;
    ctx.strokeRect(56, 52, PAGE_W - 112, PAGE_H - FOOTER_RESERVED_H - 36);

    if (pages.length > 0) {
      ctx.font = `bold 17px ${sansFont}`;
      ctx.fillStyle = ROYAL_THEME.linkColor;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      const headerTitleLines = wrapCanvasText(ctx, data.title, CONTENT_W);
      let hY = 64;
      for (const hLine of headerTitleLines) {
        ctx.fillText(hLine, MARGIN_X, hY);
        hY += 22;
      }

      ctx.fillStyle = ROYAL_THEME.borderColor;
      ctx.fillRect(MARGIN_X, hY + 4, CONTENT_W, 1.5);
      cursorY = hY + 22;
    } else {
      cursorY = MARGIN_TOP;
    }

    pages.push(currentCanvas);
  };

  const ensureSpace = (neededHeight: number) => {
    if (cursorY + neededHeight > MAX_Y) {
      startNewPage();
    }
  };

  const drawProfileTitleBox = (boxText: string) => {
    ctx.font = `600 22px ${sansFont}`;
    const lines = wrapCanvasText(ctx, boxText, CONTENT_W - 48);
    if (lines.length === 0) return;

    const boxH = lines.length * 32 + 24;
    ensureSpace(boxH + 18);

    // Light Orange Profile Title Box (#F4C78A bg, #E4B879 border, 14px radius)
    drawRoundedRect(ctx, MARGIN_X, cursorY, CONTENT_W, boxH, 14);
    ctx.fillStyle = ROYAL_THEME.profileTitleBg;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = ROYAL_THEME.profileTitleBorder;
    ctx.stroke();

    ctx.font = `600 22px ${sansFont}`;
    ctx.fillStyle = ROYAL_THEME.profileTitleText;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    let textY = cursorY + 12;
    for (const line of lines) {
      ctx.fillText(line, MARGIN_X + 20, textY);
      textY += 32;
    }
    cursorY += boxH + 18;
  };

  startNewPage();

  // 1. RENDER ARTICLE HEADER CARD (Royal Surface #FFF9EF / #FFFCF5 + Royal Typography)
  ctx.font = `bold 42px ${serifFont}`;
  const titleLines = wrapCanvasText(ctx, data.title, CONTENT_W - 72);

  ctx.font = `italic 24px ${serifFont}`;
  const subtitleLines = data.subtitle
    ? wrapCanvasText(ctx, data.subtitle, CONTENT_W - 72)
    : [];

  // Pre-calculate multi-line wrapped layout for header badges & index boxes so none are truncated
  const maxBadgeRowW = CONTENT_W - 72;
  ctx.font = `bold 17px ${sansFont}`;
  interface PreparedHeaderBadge {
    lines: string[];
    w: number;
    h: number;
    isIndexOrPrimary: boolean;
  }
  const preparedHeaderBadges: PreparedHeaderBadge[] = data.badges.map((bText, idx) => {
    const bLines = wrapCanvasText(ctx, bText, maxBadgeRowW - 28);
    const maxLineW = Math.max(...bLines.map((l) => ctx.measureText(l).width), 40);
    const w = Math.min(maxLineW + 28, maxBadgeRowW);
    const h = Math.max(36, bLines.length * 22 + 14);
    const isIndexOrPrimary = idx === 0 || INDEX_TOKEN_REGEX.test(bText);
    return { lines: bLines, w, h, isIndexOrPrimary };
  });

  let badgesTotalH = 0;
  if (preparedHeaderBadges.length > 0) {
    let curX = 0;
    let rowMaxH = 0;
    for (const pb of preparedHeaderBadges) {
      if (curX > 0 && curX + pb.w > maxBadgeRowW) {
        badgesTotalH += rowMaxH + 10;
        curX = 0;
        rowMaxH = 0;
      }
      curX += pb.w + 12;
      rowMaxH = Math.max(rowMaxH, pb.h);
    }
    badgesTotalH += rowMaxH + 14;
  }

  // Calculate dynamic multi-line heights for headerMeta rows (wrapping both labels and values)
  const colW = (CONTENT_W - 92) / 2;
  const metaRowHeights: number[] = [];
  for (let i = 0; i < data.headerMeta.length; i += 2) {
    const rowItems = data.headerMeta.slice(i, i + 2);
    let maxCellContentH = 60;
    for (const item of rowItems) {
      ctx.font = `bold 15px ${sansFont}`;
      const lLines = wrapCanvasText(ctx, item.label.toUpperCase(), colW - 24);
      ctx.font = `bold 19px ${sansFont}`;
      const vLines = wrapCanvasText(ctx, item.value, colW - 24);
      const cellContentH = 16 + lLines.length * 21 + 6 + vLines.length * 26 + 10;
      maxCellContentH = Math.max(maxCellContentH, cellContentH);
    }
    metaRowHeights.push(maxCellContentH);
  }
  const totalMetaHeight =
    metaRowHeights.length > 0
      ? metaRowHeights.reduce((acc, h) => acc + h + 12, 0) + 24
      : 16;

  const headerBoxH =
    68 +
    badgesTotalH +
    titleLines.length * 52 +
    (subtitleLines.length > 0 ? subtitleLines.length * 35 + 16 : 0) +
    totalMetaHeight;

  drawRoundedRect(ctx, MARGIN_X, cursorY, CONTENT_W, headerBoxH, 16);
  ctx.fillStyle = ROYAL_THEME.surfaceBg;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = ROYAL_THEME.accentGold;
  ctx.stroke();

  ctx.fillStyle = ROYAL_THEME.maroonAccent;
  ctx.fillRect(MARGIN_X + 2, cursorY + 2, CONTENT_W - 4, 10);

  let innerY = cursorY + 28;
  const innerX = MARGIN_X + 36;

  ctx.font = `bold 17px ${sansFont}`;
  ctx.fillStyle = ROYAL_THEME.linkColor;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(
    'SURYAVAMSHA ODIYARAJU KSHATRIYA • HISTORICAL DOCUMENTARY & ROYAL HERITAGE ARCHIVE',
    innerX,
    innerY
  );
  innerY += 32;

  if (preparedHeaderBadges.length > 0) {
    let badgeX = innerX;
    let rowMaxH = 0;
    ctx.font = `bold 17px ${sansFont}`;
    for (const pb of preparedHeaderBadges) {
      if (badgeX > innerX && badgeX + pb.w > innerX + maxBadgeRowW) {
        innerY += rowMaxH + 10;
        badgeX = innerX;
        rowMaxH = 0;
      }
      drawRoundedRect(ctx, badgeX, innerY, pb.w, pb.h, 8);
      ctx.fillStyle = pb.isIndexOrPrimary
        ? ROYAL_THEME.maroonAccent
        : ROYAL_THEME.sectionBg;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = ROYAL_THEME.accentGold;
      ctx.stroke();

      ctx.fillStyle = pb.isIndexOrPrimary ? '#FFFFFF' : ROYAL_THEME.headingText;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      for (let bl = 0; bl < pb.lines.length; bl++) {
        ctx.fillText(pb.lines[bl], badgeX + 14, innerY + 7 + bl * 22);
      }

      badgeX += pb.w + 12;
      rowMaxH = Math.max(rowMaxH, pb.h);
    }
    innerY += rowMaxH + 14;
  }

  ctx.font = `bold 42px ${serifFont}`;
  ctx.fillStyle = ROYAL_THEME.headingText;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  for (const line of titleLines) {
    ctx.fillText(line, innerX, innerY);
    innerY += 52;
  }

  if (subtitleLines.length > 0) {
    innerY += 8;
    ctx.font = `italic 24px ${serifFont}`;
    ctx.fillStyle = ROYAL_THEME.secondaryText;
    for (const line of subtitleLines) {
      ctx.fillText(line, innerX, innerY);
      innerY += 35;
    }
  }

  if (data.headerMeta.length > 0) {
    innerY += 14;
    ctx.fillStyle = ROYAL_THEME.borderColor;
    ctx.fillRect(innerX, innerY, CONTENT_W - 72, 1.5);
    innerY += 14;

    let rowIdx = 0;
    for (let i = 0; i < data.headerMeta.length; i += 2) {
      const rowItems = data.headerMeta.slice(i, i + 2);
      const cellH = metaRowHeights[rowIdx++] || 60;
      for (let c = 0; c < rowItems.length; c++) {
        const cellX = innerX + c * (colW + 20);
        drawRoundedRect(ctx, cellX, innerY, colW, cellH, 8);
        ctx.fillStyle = ROYAL_THEME.cardBg;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = ROYAL_THEME.borderColor;
        ctx.stroke();

        ctx.font = `bold 15px ${sansFont}`;
        ctx.fillStyle = ROYAL_THEME.linkColor;
        ctx.textBaseline = 'top';
        const lLines = wrapCanvasText(ctx, rowItems[c].label.toUpperCase(), colW - 24);
        let cellTextY = innerY + 8;
        for (let ll = 0; ll < lLines.length; ll++) {
          ctx.fillText(lLines[ll], cellX + 12, cellTextY);
          cellTextY += 21;
        }
        cellTextY += 4;

        ctx.font = `bold 19px ${sansFont}`;
        ctx.fillStyle = ROYAL_THEME.primaryText;
        const valLines = wrapCanvasText(ctx, rowItems[c].value, colW - 24);
        for (let vl = 0; vl < valLines.length; vl++) {
          ctx.fillText(valLines[vl], cellX + 12, cellTextY + vl * 26);
        }
      }
      innerY += cellH + 12;
    }
  }

  cursorY += headerBoxH + 22;

  // 2. RENDER PROFILE TITLE BOXES (#F4C78A Light Orange) IMMEDIATELY BELOW HEADER / PROFILE
  for (const boxText of data.profileTitleBoxes) {
    drawProfileTitleBox(boxText);
  }

  const drawFigureBlock = (fig: { src: string; alt: string; caption: string }) => {
    const img = imageMap.get(fig.src);
    if (!img) return;

    ctx.font = `italic 20px ${serifFont}`;
    const capLines = fig.caption
      ? wrapCanvasText(ctx, fig.caption, CONTENT_W - 48)
      : [];

    const maxDrawW = CONTENT_W - 48;
    const maxDrawH = 460;
    const scale = Math.min(maxDrawW / img.naturalWidth, maxDrawH / img.naturalHeight, 1.5);
    const drawW = Math.round(img.naturalWidth * scale);
    const drawH = Math.round(img.naturalHeight * scale);
    const boxH = drawH + 36 + (capLines.length > 0 ? capLines.length * 28 + 20 : 0);

    ensureSpace(boxH + 20);

    drawRoundedRect(ctx, MARGIN_X, cursorY, CONTENT_W, boxH, 12);
    ctx.fillStyle = ROYAL_THEME.surfaceBg;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = ROYAL_THEME.borderColor;
    ctx.stroke();

    const imgX = MARGIN_X + (CONTENT_W - drawW) / 2;
    const imgY = cursorY + 18;
    ctx.drawImage(img, imgX, imgY, drawW, drawH);

    if (capLines.length > 0) {
      let capY = imgY + drawH + 14;
      ctx.font = `italic 20px ${serifFont}`;
      ctx.fillStyle = ROYAL_THEME.headingText;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      for (const line of capLines) {
        ctx.fillText(line, MARGIN_X + CONTENT_W / 2, capY);
        capY += 28;
      }
      ctx.textAlign = 'left';
    }

    cursorY += boxH + 24;
  };

  for (const fig of data.leadFigures) {
    drawFigureBlock(fig);
  }

  // 3. RENDER ALL ARTICLE SECTIONS, PARAGRAPHS, LISTS, TABLES, PILLS & RELATED ARTICLE CARDS
  for (const block of data.blocks) {
    if (block.type === 'profileTitleBox') {
      drawProfileTitleBox(block.text);
    } else if (block.type === 'archivalReferenceIndexBox') {
      // Render Title Box ("Archival Reference Summary & Catalogue Index") in Light Sky Blue (#D4EEFC) with Deep Black (#000000) text
      ctx.font = `bold 23px ${serifFont}`;
      const titleLinesIdx = wrapCanvasText(ctx, block.title, CONTENT_W - 48);
      const titleBoxH = Math.max(48, titleLinesIdx.length * 32 + 20);
      ensureSpace(titleBoxH + 80);

      drawRoundedRect(ctx, MARGIN_X, cursorY, CONTENT_W, titleBoxH, 12);
      ctx.fillStyle = ROYAL_THEME.archivalIndexBg;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = ROYAL_THEME.archivalIndexBorder;
      ctx.stroke();

      ctx.font = `bold 23px ${serifFont}`;
      ctx.fillStyle = ROYAL_THEME.archivalIndexText;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      for (let tl = 0; tl < titleLinesIdx.length; tl++) {
        ctx.fillText(titleLinesIdx[tl], MARGIN_X + 20, cursorY + 10 + tl * 32);
      }
      cursorY += titleBoxH + 10;

      // Render Catalogue Index Items inside Light Sky Blue (#D4EEFC) box with Deep Black (#000000) text,
      // allowing long lists to split cleanly across page breaks without clipping
      if (block.items.length > 0) {
        ctx.font = `500 21px ${sansFont}`;
        const wrappedItems = block.items.map((itemTxt) =>
          wrapCanvasText(ctx, itemTxt, CONTENT_W - 76)
        );

        let itemIdx = 0;
        while (itemIdx < wrappedItems.length) {
          if (MAX_Y - cursorY < 90) {
            startNewPage();
          }
          const availH = MAX_Y - cursorY - 20;
          const chunkItems: string[][] = [];
          let chunkLinesCount = 0;

          while (itemIdx < wrappedItems.length) {
            const candidate = wrappedItems[itemIdx];
            const nextLines = chunkLinesCount + candidate.length;
            const nextCount = chunkItems.length + 1;
            const neededH = nextLines * 31 + Math.max(0, nextCount - 1) * 10 + 36;
            if (chunkItems.length > 0 && neededH > availH) {
              break;
            }
            chunkItems.push(candidate);
            chunkLinesCount = nextLines;
            itemIdx++;
          }

          const listBoxH =
            chunkLinesCount * 31 + Math.max(0, chunkItems.length - 1) * 10 + 36;
          ensureSpace(listBoxH + 14);

          drawRoundedRect(ctx, MARGIN_X, cursorY, CONTENT_W, listBoxH, 12);
          ctx.fillStyle = ROYAL_THEME.archivalIndexBg;
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = ROYAL_THEME.archivalIndexBorder;
          ctx.stroke();

          let itemY = cursorY + 18;
          for (const itemLines of chunkItems) {
            ctx.font = `bold 21px ${sansFont}`;
            ctx.fillStyle = ROYAL_THEME.archivalIndexText;
            ctx.fillText('•', MARGIN_X + 22, itemY);

            ctx.font = `500 21px ${sansFont}`;
            ctx.fillStyle = ROYAL_THEME.archivalIndexText;
            for (const iLine of itemLines) {
              ctx.fillText(iLine, MARGIN_X + 46, itemY);
              itemY += 31;
            }
            itemY += 10;
          }
          cursorY += listBoxH + 16;
        }
        cursorY += 6;
      }
    } else if (block.type === 'sectionHeading') {
      // Section Heading with Vertical Royal Maroon Accent Bar (#762D35)
      // - Dedicated 28px clearance from the 8px maroon bar so Indic/Kannada glyphs never clip or squeeze
      // - Generous 46px line height for Indic ligatures and complex vowel markings
      // - Complete layout flow so following paragraphs and details appear completely below the heading
      const headingLineH = 46;
      const barW = 8;
      const textOffsetX = 28;
      const maxHeadingTextW = CONTENT_W - textOffsetX - 16;
      ctx.font = `bold 29px ${serifFont}`;
      const lines = wrapCanvasText(ctx, block.text, maxHeadingTextW);
      if (lines.length === 0) continue;

      const headingBlockH = lines.length * headingLineH;
      // Ensure heading and at least the first block/lines of following content stay together without being cut off at bottom edge
      ensureSpace(headingBlockH + 72);

      cursorY += 14;
      const barTopY = cursorY + 4;
      const barHeight = Math.max(34, headingBlockH - 8);

      // Vertical Royal Maroon Accent Bar (#762D35) — fixed 8px width, never shrinks or overlaps heading text
      drawRoundedRect(ctx, MARGIN_X, barTopY, barW, barHeight, 3);
      ctx.fillStyle = ROYAL_THEME.maroonAccent;
      ctx.fill();

      ctx.font = `bold 29px ${serifFont}`;
      ctx.fillStyle = ROYAL_THEME.headingText;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      for (const line of lines) {
        ctx.fillText(line, MARGIN_X + textOffsetX, cursorY);
        cursorY += headingLineH;
      }

      ctx.fillStyle = ROYAL_THEME.accentGold;
      ctx.fillRect(MARGIN_X, cursorY + 6, CONTENT_W, 2);
      cursorY += 26;
    } else if (block.type === 'subHeading') {
      const subLineH = 38;
      const subBarW = 6;
      const subTextOffsetX = 22;
      const maxSubTextW = CONTENT_W - subTextOffsetX - 12;
      ctx.font = `bold 24px ${serifFont}`;
      const lines = wrapCanvasText(ctx, block.text, maxSubTextW);
      if (lines.length === 0) continue;
      const subBlockH = lines.length * subLineH;
      ensureSpace(subBlockH + 48);

      cursorY += 10;
      const subBarTopY = cursorY + 3;
      const subBarHeight = Math.max(26, subBlockH - 6);

      // Vertical Royal Maroon accent bar for sub-heading
      drawRoundedRect(ctx, MARGIN_X, subBarTopY, subBarW, subBarHeight, 2.5);
      ctx.fillStyle = ROYAL_THEME.maroonAccent;
      ctx.fill();

      ctx.font = `bold 24px ${serifFont}`;
      ctx.fillStyle = ROYAL_THEME.headingText;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      for (const line of lines) {
        ctx.fillText(line, MARGIN_X + subTextOffsetX, cursorY);
        cursorY += subLineH;
      }
      cursorY += 16;
    } else if (block.type === 'contentCard') {
      // Complete Structured Article Content Box / Card Rendering:
      // Preserves all text, paragraphs, lists, badges, and titles inside an authentic Royal Content Box
      // with vertical Royal Maroon accent bar, archival gold border, and zero clipping or truncation.
      const innerPadTop = 20;
      const innerPadBottom = 20;
      const innerPadLeft = 32;
      const innerPadRight = 24;
      const barW = 6;
      const barClearance = 16;
      const textX = MARGIN_X + innerPadLeft + barW + barClearance;
      const textAvailW = CONTENT_W - (innerPadLeft + barW + barClearance) - innerPadRight;

      // 1. Prepare Header Items: Index, Badges, Title, Subtitle
      interface PreparedCardBadge {
        lines: string[];
        w: number;
        h: number;
        isIndex: boolean;
      }

      const cardBadges: PreparedCardBadge[] = [];
      ctx.font = `bold 15px ${sansFont}`;

      if (block.index) {
        const idxLines = wrapCanvasText(ctx, block.index, textAvailW - 20);
        const maxW = Math.max(...idxLines.map((l) => ctx.measureText(l).width), 30);
        cardBadges.push({
          lines: idxLines,
          w: Math.min(maxW + 24, textAvailW),
          h: Math.max(30, idxLines.length * 20 + 10),
          isIndex: true,
        });
      }

      if (block.badge) {
        const rawBadges = block.badge.split(' • ').map((b) => b.trim()).filter(Boolean);
        for (const rb of rawBadges) {
          const bLines = wrapCanvasText(ctx, rb, textAvailW - 20);
          const maxW = Math.max(...bLines.map((l) => ctx.measureText(l).width), 30);
          cardBadges.push({
            lines: bLines,
            w: Math.min(maxW + 22, textAvailW),
            h: Math.max(28, bLines.length * 19 + 9),
            isIndex: false,
          });
        }
      }

      let badgeRowH = 0;
      if (cardBadges.length > 0) {
        let bCurX = 0;
        let bRowMax = 0;
        for (const cb of cardBadges) {
          if (bCurX > 0 && bCurX + cb.w > textAvailW) {
            badgeRowH += bRowMax + 8;
            bCurX = 0;
            bRowMax = 0;
          }
          bCurX += cb.w + 10;
          bRowMax = Math.max(bRowMax, cb.h);
        }
        badgeRowH += bRowMax + 12;
      }

      // Title lines
      ctx.font = `bold 23px ${serifFont}`;
      const titleLines = block.title
        ? wrapCanvasText(ctx, block.title, textAvailW)
        : [];
      const titleH = titleLines.length > 0 ? titleLines.length * 34 + 8 : 0;

      // Subtitle lines
      ctx.font = `italic 19px ${serifFont}`;
      const subLines = block.subtitle
        ? wrapCanvasText(ctx, block.subtitle, textAvailW)
        : [];
      const subH = subLines.length > 0 ? subLines.length * 28 + 6 : 0;

      const hasHeader = badgeRowH > 0 || titleH > 0 || subH > 0;
      const headerH = badgeRowH + titleH + subH + (hasHeader ? 12 : 0);

      // 2. Prepare Body Items (Paragraphs and Bullets)
      interface PreparedCardLine {
        type: 'text' | 'bullet' | 'gap';
        text?: string;
        bulletLines?: string[];
        h: number;
      }

      const bodyLines: PreparedCardLine[] = [];

      ctx.font = `400 21px ${sansFont}`;
      const paras = block.paragraphs || [];
      for (let pIdx = 0; pIdx < paras.length; pIdx++) {
        const pLines = wrapCanvasText(ctx, paras[pIdx], textAvailW);
        for (const pl of pLines) {
          bodyLines.push({ type: 'text', text: pl, h: 32 });
        }
        if (pIdx < paras.length - 1 || (block.bulletItems && block.bulletItems.length > 0)) {
          bodyLines.push({ type: 'gap', h: 10 });
        }
      }

      if (block.bulletItems && block.bulletItems.length > 0) {
        for (let bIdx = 0; bIdx < block.bulletItems.length; bIdx++) {
          const bRaw = block.bulletItems[bIdx];
          const bLines = wrapCanvasText(ctx, bRaw, textAvailW - 28);
          bodyLines.push({
            type: 'bullet',
            bulletLines: bLines,
            h: bLines.length * 32 + 6,
          });
          if (bIdx < block.bulletItems.length - 1) {
            bodyLines.push({ type: 'gap', h: 6 });
          }
        }
      }

      const bodyTotalH = bodyLines.reduce((acc, it) => acc + it.h, 0);
      const totalCardH = innerPadTop + headerH + bodyTotalH + innerPadBottom;

      const cardBg = block.bgColor || ROYAL_THEME.surfaceBg;
      const cardBorder = block.borderColor || ROYAL_THEME.accentGold;
      const cardAccent = block.accentColor || ROYAL_THEME.maroonAccent;

      // Draw helper function for card background and vertical maroon bar
      const drawCardContainerBox = (y: number, h: number) => {
        drawRoundedRect(ctx, MARGIN_X, y, CONTENT_W, h, 14);
        ctx.fillStyle = cardBg;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = cardBorder;
        ctx.stroke();

        // Vertical Royal Maroon Accent Bar (#762D35)
        const barTop = y + 14;
        const barH = Math.max(28, h - 28);
        drawRoundedRect(ctx, MARGIN_X + 16, barTop, barW, barH, 3);
        ctx.fillStyle = cardAccent;
        ctx.fill();
      };

      // Check available space on current page
      let availSpace = MAX_Y - cursorY;

      // If available space is too small to even fit header and 2 body lines, start a fresh page
      if (availSpace < 160 && pages.length > 0) {
        startNewPage();
        availSpace = MAX_Y - cursorY;
      }

      if (totalCardH <= availSpace) {
        // ENTIRE CARD FITS ON ONE PAGE
        ensureSpace(totalCardH + 18);
        drawCardContainerBox(cursorY, totalCardH);

        let drawY = cursorY + innerPadTop;

        // Draw Badges
        if (cardBadges.length > 0) {
          let bX = textX;
          let rowMax = 0;
          for (const cb of cardBadges) {
            if (bX > textX && bX + cb.w > textX + textAvailW) {
              drawY += rowMax + 8;
              bX = textX;
              rowMax = 0;
            }
            drawRoundedRect(ctx, bX, drawY, cb.w, cb.h, 8);
            ctx.fillStyle = cb.isIndex ? ROYAL_THEME.maroonAccent : ROYAL_THEME.sectionBg;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = cb.isIndex ? ROYAL_THEME.accentGold : ROYAL_THEME.borderColor;
            ctx.stroke();

            ctx.font = `bold 15px ${sansFont}`;
            ctx.fillStyle = cb.isIndex ? '#FFFFFF' : ROYAL_THEME.headingText;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            for (let bl = 0; bl < cb.lines.length; bl++) {
              ctx.fillText(cb.lines[bl], bX + 10, drawY + 6 + bl * 19);
            }

            bX += cb.w + 10;
            rowMax = Math.max(rowMax, cb.h);
          }
          drawY += rowMax + 12;
        }

        // Draw Title
        if (titleLines.length > 0) {
          ctx.font = `bold 23px ${serifFont}`;
          ctx.fillStyle = ROYAL_THEME.headingText;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          for (const tl of titleLines) {
            ctx.fillText(tl, textX, drawY);
            drawY += 34;
          }
          drawY += 8;
        }

        // Draw Subtitle
        if (subLines.length > 0) {
          ctx.font = `italic 19px ${serifFont}`;
          ctx.fillStyle = ROYAL_THEME.secondaryText;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          for (const sl of subLines) {
            ctx.fillText(sl, textX, drawY);
            drawY += 28;
          }
          drawY += 6;
        }

        // Draw Divider
        if (hasHeader && bodyLines.length > 0) {
          ctx.fillStyle = ROYAL_THEME.borderColor;
          ctx.fillRect(textX, drawY, textAvailW, 1);
          drawY += 12;
        }

        // Draw Body Lines
        for (const item of bodyLines) {
          if (item.type === 'text' && item.text) {
            ctx.font = `400 21px ${sansFont}`;
            ctx.fillStyle = ROYAL_THEME.primaryText;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(item.text, textX, drawY);
            drawY += item.h;
          } else if (item.type === 'bullet' && item.bulletLines) {
            ctx.font = `bold 21px ${sansFont}`;
            ctx.fillStyle = ROYAL_THEME.maroonAccent;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText('•', textX, drawY);

            ctx.font = `400 21px ${sansFont}`;
            ctx.fillStyle = ROYAL_THEME.primaryText;
            let bLineY = drawY;
            for (const bl of item.bulletLines) {
              ctx.fillText(bl, textX + 24, bLineY);
              bLineY += 32;
            }
            drawY += item.h;
          } else if (item.type === 'gap') {
            drawY += item.h;
          }
        }

        cursorY += totalCardH + 20;
      } else {
        // MULTI-PAGE SPLITTING: Card exceeds remaining page height!
        // Split cleanly across pages so ZERO lines are lost, truncated or clipped!
        let bodyIdx = 0;
        let isFirstPage = true;

        while (bodyIdx < bodyLines.length || isFirstPage) {
          if (!isFirstPage) {
            startNewPage();
          }
          availSpace = MAX_Y - cursorY;

          if (isFirstPage) {
            const availForBody = Math.max(64, availSpace - innerPadTop - innerPadBottom - headerH);
            const chunk: PreparedCardLine[] = [];
            let chunkH = 0;

            while (bodyIdx < bodyLines.length) {
              const it = bodyLines[bodyIdx];
              if (chunk.length > 0 && chunkH + it.h > availForBody) {
                break;
              }
              chunk.push(it);
              chunkH += it.h;
              bodyIdx++;
            }

            const pageBoxH = innerPadTop + headerH + chunkH + innerPadBottom;
            ensureSpace(pageBoxH + 18);
            drawCardContainerBox(cursorY, pageBoxH);

            let drawY = cursorY + innerPadTop;

            if (cardBadges.length > 0) {
              let bX = textX;
              let rowMax = 0;
              for (const cb of cardBadges) {
                if (bX > textX && bX + cb.w > textX + textAvailW) {
                  drawY += rowMax + 8;
                  bX = textX;
                  rowMax = 0;
                }
                drawRoundedRect(ctx, bX, drawY, cb.w, cb.h, 8);
                ctx.fillStyle = cb.isIndex ? ROYAL_THEME.maroonAccent : ROYAL_THEME.sectionBg;
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.strokeStyle = cb.isIndex ? ROYAL_THEME.accentGold : ROYAL_THEME.borderColor;
                ctx.stroke();

                ctx.font = `bold 15px ${sansFont}`;
                ctx.fillStyle = cb.isIndex ? '#FFFFFF' : ROYAL_THEME.headingText;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                for (let bl = 0; bl < cb.lines.length; bl++) {
                  ctx.fillText(cb.lines[bl], bX + 10, drawY + 6 + bl * 19);
                }

                bX += cb.w + 10;
                rowMax = Math.max(rowMax, cb.h);
              }
              drawY += rowMax + 12;
            }

            if (titleLines.length > 0) {
              ctx.font = `bold 23px ${serifFont}`;
              ctx.fillStyle = ROYAL_THEME.headingText;
              ctx.textAlign = 'left';
              ctx.textBaseline = 'top';
              for (const tl of titleLines) {
                ctx.fillText(tl, textX, drawY);
                drawY += 34;
              }
              drawY += 8;
            }

            if (subLines.length > 0) {
              ctx.font = `italic 19px ${serifFont}`;
              ctx.fillStyle = ROYAL_THEME.secondaryText;
              ctx.textAlign = 'left';
              ctx.textBaseline = 'top';
              for (const sl of subLines) {
                ctx.fillText(sl, textX, drawY);
                drawY += 28;
              }
              drawY += 6;
            }

            if (hasHeader && chunk.length > 0) {
              ctx.fillStyle = ROYAL_THEME.borderColor;
              ctx.fillRect(textX, drawY, textAvailW, 1);
              drawY += 12;
            }

            for (const item of chunk) {
              if (item.type === 'text' && item.text) {
                ctx.font = `400 21px ${sansFont}`;
                ctx.fillStyle = ROYAL_THEME.primaryText;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText(item.text, textX, drawY);
                drawY += item.h;
              } else if (item.type === 'bullet' && item.bulletLines) {
                ctx.font = `bold 21px ${sansFont}`;
                ctx.fillStyle = ROYAL_THEME.maroonAccent;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText('•', textX, drawY);

                ctx.font = `400 21px ${sansFont}`;
                ctx.fillStyle = ROYAL_THEME.primaryText;
                let bLineY = drawY;
                for (const bl of item.bulletLines) {
                  ctx.fillText(bl, textX + 24, bLineY);
                  bLineY += 32;
                }
                drawY += item.h;
              } else if (item.type === 'gap') {
                drawY += item.h;
              }
            }

            cursorY += pageBoxH + 20;
            isFirstPage = false;
          } else {
            const contTitle = block.title
              ? `${block.title} (Continued)`
              : 'Historical Monograph Analysis (Continued)';
            ctx.font = `bold 20px ${serifFont}`;
            const contTitleLines = wrapCanvasText(ctx, contTitle, textAvailW);
            const contHeaderH = contTitleLines.length * 30 + 14;

            const availForBody = Math.max(64, availSpace - innerPadTop - innerPadBottom - contHeaderH);
            const chunk: PreparedCardLine[] = [];
            let chunkH = 0;

            while (bodyIdx < bodyLines.length) {
              const it = bodyLines[bodyIdx];
              if (chunk.length > 0 && chunkH + it.h > availForBody) {
                break;
              }
              chunk.push(it);
              chunkH += it.h;
              bodyIdx++;
            }

            const pageBoxH = innerPadTop + contHeaderH + chunkH + innerPadBottom;
            ensureSpace(pageBoxH + 18);
            drawCardContainerBox(cursorY, pageBoxH);

            let drawY = cursorY + innerPadTop;

            ctx.font = `bold 20px ${serifFont}`;
            ctx.fillStyle = ROYAL_THEME.headingText;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            for (const ctl of contTitleLines) {
              ctx.fillText(ctl, textX, drawY);
              drawY += 30;
            }
            drawY += 4;

            ctx.fillStyle = ROYAL_THEME.borderColor;
            ctx.fillRect(textX, drawY, textAvailW, 1);
            drawY += 10;

            for (const item of chunk) {
              if (item.type === 'text' && item.text) {
                ctx.font = `400 21px ${sansFont}`;
                ctx.fillStyle = ROYAL_THEME.primaryText;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText(item.text, textX, drawY);
                drawY += item.h;
              } else if (item.type === 'bullet' && item.bulletLines) {
                ctx.font = `bold 21px ${sansFont}`;
                ctx.fillStyle = ROYAL_THEME.maroonAccent;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText('•', textX, drawY);

                ctx.font = `400 21px ${sansFont}`;
                ctx.fillStyle = ROYAL_THEME.primaryText;
                let bLineY = drawY;
                for (const bl of item.bulletLines) {
                  ctx.fillText(bl, textX + 24, bLineY);
                  bLineY += 32;
                }
                drawY += item.h;
              } else if (item.type === 'gap') {
                drawY += item.h;
              }
            }

            cursorY += pageBoxH + 20;
          }
        }
      }
    } else if (block.type === 'summaryBox') {
      ctx.font = `italic 23px ${serifFont}`;
      const allLines: string[] = [];
      for (const p of block.paragraphs) {
        const wrapped = wrapCanvasText(ctx, p, CONTENT_W - 68);
        allLines.push(...wrapped, '');
      }
      if (allLines[allLines.length - 1] === '') allLines.pop();
      if (allLines.length === 0) continue;

      // Allow very long summary/blockquote boxes to split cleanly across pages if needed
      let lineCursor = 0;
      while (lineCursor < allLines.length) {
        if (MAX_Y - cursorY < 110) {
          startNewPage();
        }
        const availLines = Math.max(
          2,
          Math.floor((MAX_Y - cursorY - 64) / 36)
        );
        const chunkLines = allLines.slice(lineCursor, lineCursor + availLines);
        lineCursor += chunkLines.length;

        const boxH = chunkLines.length * 36 + 44;
        ensureSpace(boxH + 20);

        drawRoundedRect(ctx, MARGIN_X, cursorY, CONTENT_W, boxH, 12);
        ctx.fillStyle = ROYAL_THEME.surfaceBg;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = ROYAL_THEME.accentGold;
        ctx.stroke();

        // Vertical Royal Maroon Accent Bar (#762D35) inside summary/callout box
        ctx.fillStyle = ROYAL_THEME.maroonAccent;
        ctx.fillRect(MARGIN_X, cursorY + 8, 8, boxH - 16);

        let textY = cursorY + 22;
        ctx.font = `italic 23px ${serifFont}`;
        ctx.fillStyle = ROYAL_THEME.primaryText;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        for (const line of chunkLines) {
          if (line) {
            ctx.fillText(line, MARGIN_X + 32, textY);
          }
          textY += 36;
        }
        cursorY += boxH + 20;
      }
    } else if (block.type === 'paragraph') {
      ctx.font = `400 22px ${sansFont}`;
      const lines = wrapCanvasText(ctx, block.text, CONTENT_W - 8);
      ctx.fillStyle = ROYAL_THEME.primaryText;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      for (const line of lines) {
        ensureSpace(38);
        ctx.font = `400 22px ${sansFont}`;
        ctx.fillStyle = ROYAL_THEME.primaryText;
        ctx.fillText(line, MARGIN_X, cursorY);
        cursorY += 36;
      }
      cursorY += 16;
    } else if (block.type === 'bullet') {
      const indentX = MARGIN_X + 44;
      const bulletW = CONTENT_W - 52;

      let titleLines: string[] = [];
      if (block.title) {
        ctx.font = `bold 22px ${sansFont}`;
        titleLines = wrapCanvasText(ctx, block.title, bulletW);
      }

      ctx.font = `400 22px ${sansFont}`;
      const bodyLines = wrapCanvasText(ctx, block.text, bulletW);

      // Ensure at least the bullet marker and first line fit together on the current page
      ensureSpace(58);

      const markerY = cursorY;
      ctx.font = `bold 22px ${sansFont}`;
      ctx.fillStyle = ROYAL_THEME.maroonAccent;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(block.marker, MARGIN_X + 6, markerY);

      let isFirstLine = true;
      if (titleLines.length > 0) {
        for (const tLine of titleLines) {
          if (!isFirstLine) ensureSpace(38);
          ctx.font = `bold 22px ${sansFont}`;
          ctx.fillStyle = ROYAL_THEME.headingText;
          ctx.fillText(tLine, indentX, cursorY);
          cursorY += 36;
          isFirstLine = false;
        }
      }

      for (const bLine of bodyLines) {
        if (!isFirstLine) ensureSpace(38);
        ctx.font = `400 22px ${sansFont}`;
        ctx.fillStyle = ROYAL_THEME.primaryText;
        ctx.fillText(bLine, indentX, cursorY);
        cursorY += 36;
        isFirstLine = false;
      }
      cursorY += 14;
    } else if (block.type === 'metaGrid') {
      const gridColW = (CONTENT_W - 24) / 2;
      for (let i = 0; i < block.items.length; i += 2) {
        const pair = block.items.slice(i, i + 2);
        let maxCellH = 72;
        for (const item of pair) {
          ctx.font = `bold 16px ${sansFont}`;
          const lLines = wrapCanvasText(ctx, item.label.toUpperCase(), gridColW - 28);
          ctx.font = `bold 20px ${sansFont}`;
          const vLines = wrapCanvasText(ctx, item.value, gridColW - 28);
          const neededCellH = 18 + lLines.length * 22 + 6 + vLines.length * 27 + 12;
          maxCellH = Math.max(maxCellH, neededCellH);
        }
        const cellH = maxCellH;
        ensureSpace(cellH + 14);

        for (let c = 0; c < pair.length; c++) {
          const cellX = MARGIN_X + c * (gridColW + 24);
          drawRoundedRect(ctx, cellX, cursorY, gridColW, cellH, 8);
          ctx.fillStyle = ROYAL_THEME.surfaceBg;
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = ROYAL_THEME.borderColor;
          ctx.stroke();

          ctx.font = `bold 16px ${sansFont}`;
          ctx.fillStyle = ROYAL_THEME.linkColor;
          ctx.textBaseline = 'top';
          const lLines = wrapCanvasText(ctx, pair[c].label.toUpperCase(), gridColW - 28);
          let textY = cursorY + 10;
          for (let ll = 0; ll < lLines.length; ll++) {
            ctx.fillText(lLines[ll], cellX + 14, textY);
            textY += 22;
          }
          textY += 4;

          ctx.font = `bold 20px ${sansFont}`;
          ctx.fillStyle = ROYAL_THEME.primaryText;
          const vLines = wrapCanvasText(ctx, pair[c].value, gridColW - 28);
          for (let vl = 0; vl < vLines.length; vl++) {
            ctx.fillText(vLines[vl], cellX + 14, textY + vl * 27);
          }
        }
        cursorY += cellH + 14;
      }
      cursorY += 8;
    } else if (block.type === 'table') {
      const colCount = Math.max(
        block.table.headers.length,
        ...block.table.rows.map((r) => r.length),
        1
      );
      const tableColW = CONTENT_W / colCount;

      if (block.table.headers.length > 0) {
        ctx.font = `bold 19px ${sansFont}`;
        const wrappedHeaders = block.table.headers.map((h) =>
          wrapCanvasText(ctx, h, tableColW - 20)
        );
        const maxHeaderLines = Math.max(...wrappedHeaders.map((w) => w.length), 1);
        const headerRowH = maxHeaderLines * 26 + 20;
        ensureSpace(headerRowH + 50);

        ctx.fillStyle = ROYAL_THEME.sectionBg;
        ctx.fillRect(MARGIN_X, cursorY, CONTENT_W, headerRowH);
        ctx.strokeStyle = ROYAL_THEME.accentGold;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(MARGIN_X, cursorY, CONTENT_W, headerRowH);

        for (let c = 0; c < colCount; c++) {
          const cellX = MARGIN_X + c * tableColW;
          if (c > 0) {
            ctx.beginPath();
            ctx.moveTo(cellX, cursorY);
            ctx.lineTo(cellX, cursorY + headerRowH);
            ctx.stroke();
          }
          ctx.font = `bold 19px ${sansFont}`;
          ctx.fillStyle = ROYAL_THEME.headingText;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          const lines = wrappedHeaders[c] || [];
          for (let l = 0; l < lines.length; l++) {
            ctx.fillText(lines[l], cellX + 10, cursorY + 10 + l * 26);
          }
        }
        cursorY += headerRowH;
      }

      for (let r = 0; r < block.table.rows.length; r++) {
        const row = block.table.rows[r];
        ctx.font = `400 18px ${sansFont}`;
        const wrappedCells = row.map((cell) => wrapCanvasText(ctx, cell, tableColW - 20));
        const maxCellLines = Math.max(...wrappedCells.map((w) => w.length), 1);
        const rowH = maxCellLines * 25 + 18;

        ensureSpace(rowH);

        ctx.fillStyle = r % 2 === 0 ? ROYAL_THEME.cardBg : ROYAL_THEME.surfaceBg;
        ctx.fillRect(MARGIN_X, cursorY, CONTENT_W, rowH);
        ctx.strokeStyle = ROYAL_THEME.borderColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(MARGIN_X, cursorY, CONTENT_W, rowH);

        for (let c = 0; c < colCount; c++) {
          const cellX = MARGIN_X + c * tableColW;
          if (c > 0) {
            ctx.beginPath();
            ctx.moveTo(cellX, cursorY);
            ctx.lineTo(cellX, cursorY + rowH);
            ctx.stroke();
          }
          ctx.font =
            c === 0
              ? `bold 18px ${sansFont}`
              : `400 18px ${sansFont}`;
          ctx.fillStyle = c === 0 ? ROYAL_THEME.headingText : ROYAL_THEME.primaryText;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          const lines = wrappedCells[c] || [];
          for (let l = 0; l < lines.length; l++) {
            ctx.fillText(lines[l], cellX + 10, cursorY + 9 + l * 25);
          }
        }
        cursorY += rowH;
      }
      cursorY += 20;
    } else if (block.type === 'figure') {
      drawFigureBlock(block);
    } else if (block.type === 'pillGroup') {
      ctx.font = `600 18px ${sansFont}`;
      let pillX = MARGIN_X;
      let currentRowMaxH = 38;

      for (const pillTxt of block.pills) {
        ctx.font = `600 18px ${sansFont}`;
        const pillLines = wrapCanvasText(ctx, pillTxt, CONTENT_W - 32);
        const maxLineW = Math.max(...pillLines.map((l) => ctx.measureText(l).width), 36);
        const pillW = Math.min(maxLineW + 32, CONTENT_W);
        const pillH = Math.max(38, pillLines.length * 24 + 14);

        if (pillX > MARGIN_X && pillX + pillW > MARGIN_X + CONTENT_W) {
          pillX = MARGIN_X;
          cursorY += currentRowMaxH + 10;
          currentRowMaxH = pillH;
        } else {
          currentRowMaxH = Math.max(currentRowMaxH, pillH);
        }

        ensureSpace(pillH + 16);

        drawRoundedRect(ctx, pillX, cursorY, pillW, pillH, block.isRelatedLink ? 18 : 10);
        ctx.fillStyle = block.isRelatedLink
          ? ROYAL_THEME.relatedCardBg
          : ROYAL_THEME.surfaceBg;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = block.isRelatedLink
          ? ROYAL_THEME.relatedCardBorder
          : ROYAL_THEME.borderColor;
        ctx.stroke();

        ctx.font = `600 18px ${sansFont}`;
        ctx.fillStyle = ROYAL_THEME.headingText;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        for (let pl = 0; pl < pillLines.length; pl++) {
          ctx.fillText(pillLines[pl], pillX + 16, cursorY + 7 + pl * 24);
        }

        pillX += pillW + 12;
      }
      cursorY += currentRowMaxH + 22;
    } else if (block.type === 'relatedArticlesGrid') {
      // Render Related Article Visual Thumbnail Cards in a clean 2-column grid across PDF pages.
      // Royal Light Almond Theme Design:
      // - Card Container: Light Pink (#F8DDE3) background, #E8BFC9 border, 16px radius.
      // - Thumbnail: Properly sized 112x112 rounded frame (#FFF9EF surface, #A87924/#E8BFC9 border).
      // - Index Box: Royal Maroon (#762D35) badge with #FFFFFF text and #A87924 gold border, never truncated.
      // - Category/Era Badge Box: Warm Ivory (#FFF9EF) badge with #E8BFC9 border and #54351F text, full multi-line wrap.
      // - Title Box: Light Orange (#F4C78A) background, #E4B879 border, #54351F bold serif text, never truncated.
      // - URLs are strictly excluded.
      const GAP = 24;
      const cardW = (CONTENT_W - GAP) / 2;
      const thumbSize = 112;
      const innerPad = 18;

      for (let i = 0; i < block.cards.length; i += 2) {
        const rowCards = block.cards.slice(i, i + 2);

        const prepared = rowCards.map((card, colIdx) => {
          const textXOffset = thumbSize + innerPad * 2;
          const availTextW = cardW - textXOffset - innerPad;

          const indexLabel = card.indexLabel || `#${i + colIdx + 1}`;
          ctx.font = `bold 14px ${sansFont}`;
          const indexBoxW = Math.min(ctx.measureText(indexLabel).width + 20, availTextW);
          const indexBoxH = 28;

          ctx.font = `bold 14px ${sansFont}`;
          const badgeAvailW = Math.max(120, availTextW - indexBoxW - 10);
          const badgeLines = card.badge
            ? wrapCanvasText(ctx, card.badge.toUpperCase(), badgeAvailW - 16)
            : [];
          const badgeBoxH =
            badgeLines.length > 0 ? Math.max(28, badgeLines.length * 19 + 10) : 0;
          const topBadgeRowH = Math.max(indexBoxH, badgeBoxH);

          // Title inside Light Orange Title Box (#F4C78A bg, #E4B879 border)
          ctx.font = `bold 19px ${serifFont}`;
          const titleLinesCard = wrapCanvasText(ctx, card.title, availTextW - 24);
          const titleBoxH = Math.max(42, titleLinesCard.length * 25 + 16);

          ctx.font = `400 17px ${sansFont}`;
          const summaryLines = card.summary
            ? wrapCanvasText(ctx, card.summary, availTextW)
            : [];

          const textH =
            topBadgeRowH +
            10 +
            titleBoxH +
            (summaryLines.length > 0 ? 10 + summaryLines.length * 23 : 0);

          const neededH = Math.max(thumbSize + innerPad * 2, textH + innerPad * 2);
          return {
            card,
            indexLabel,
            indexBoxW,
            indexBoxH,
            badgeLines,
            badgeBoxH,
            topBadgeRowH,
            titleLinesCard,
            titleBoxH,
            summaryLines,
            neededH,
            textXOffset,
            availTextW,
          };
        });

        const rowH = Math.max(...prepared.map((p) => p.neededH), 156);
        ensureSpace(rowH + 20);

        for (let c = 0; c < prepared.length; c++) {
          const item = prepared[c];
          const cardX = MARGIN_X + c * (cardW + GAP);

          // 1. Card Container: #F8DDE3 Light Pink background, #E8BFC9 border, 16px rounded corners
          drawRoundedRect(ctx, cardX, cursorY, cardW, rowH, 16);
          ctx.fillStyle = ROYAL_THEME.relatedCardBg;
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = ROYAL_THEME.relatedCardBorder;
          ctx.stroke();

          // 2. Properly Sized Thumbnail Frame (112x112 rounded 12px)
          const thumbX = cardX + innerPad;
          const thumbY = cursorY + innerPad;
          ctx.save();
          drawRoundedRect(ctx, thumbX, thumbY, thumbSize, thumbSize, 12);
          ctx.fillStyle = ROYAL_THEME.surfaceBg;
          ctx.fill();
          ctx.clip();

          const thumbImg = item.card.imgSrc ? imageMap.get(item.card.imgSrc) : undefined;
          if (thumbImg && thumbImg.naturalWidth > 0) {
            const scale = Math.max(
              thumbSize / thumbImg.naturalWidth,
              thumbSize / thumbImg.naturalHeight
            );
            const dW = thumbImg.naturalWidth * scale;
            const dH = thumbImg.naturalHeight * scale;
            const dX = thumbX + (thumbSize - dW) / 2;
            const dY = thumbY + (thumbSize - dH) / 2;
            ctx.drawImage(thumbImg, dX, dY, dW, dH);
          } else {
            ctx.fillStyle = '#F1C8D2';
            ctx.fillRect(thumbX, thumbY, thumbSize, thumbSize);
            ctx.fillStyle = ROYAL_THEME.relatedCardText;
            ctx.font = `bold 18px ${serifFont}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('ARCHIVE', thumbX + thumbSize / 2, thumbY + thumbSize / 2);
          }
          ctx.restore();

          drawRoundedRect(ctx, thumbX, thumbY, thumbSize, thumbSize, 12);
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = ROYAL_THEME.accentGold;
          ctx.stroke();

          // 3. Card Content Column: Index Box + Category Badge + Light Orange Title Box + Full Summary
          const textStartX = cardX + item.textXOffset;
          let textCursorY = cursorY + innerPad;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';

          // 3A. Index Box (#762D35 Royal Maroon bg, #FFFFFF text, #A87924 gold border)
          drawRoundedRect(
            ctx,
            textStartX,
            textCursorY,
            item.indexBoxW,
            item.indexBoxH,
            7
          );
          ctx.fillStyle = ROYAL_THEME.maroonAccent;
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = ROYAL_THEME.accentGold;
          ctx.stroke();

          ctx.font = `bold 14px ${sansFont}`;
          ctx.fillStyle = '#FFFFFF';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            item.indexLabel,
            textStartX + 10,
            textCursorY + item.indexBoxH / 2
          );

          // 3B. Category / Era Badge Box (#FFF9EF surface bg, #E8BFC9 border, #54351F text)
          if (item.badgeLines.length > 0) {
            const badgeX = textStartX + item.indexBoxW + 8;
            const badgeW = item.availTextW - item.indexBoxW - 8;
            drawRoundedRect(ctx, badgeX, textCursorY, badgeW, item.badgeBoxH, 7);
            ctx.fillStyle = ROYAL_THEME.surfaceBg;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = ROYAL_THEME.relatedCardBorder;
            ctx.stroke();

            ctx.font = `bold 14px ${sansFont}`;
            ctx.fillStyle = ROYAL_THEME.relatedCardText;
            ctx.textBaseline = 'top';
            for (let bl = 0; bl < item.badgeLines.length; bl++) {
              ctx.fillText(
                item.badgeLines[bl],
                badgeX + 8,
                textCursorY + 5 + bl * 19
              );
            }
          }

          textCursorY += item.topBadgeRowH + 10;

          // 3C. Title Box (#F4C78A Light Orange bg, #E4B879 border, #54351F bold text, zero truncation)
          drawRoundedRect(
            ctx,
            textStartX,
            textCursorY,
            item.availTextW,
            item.titleBoxH,
            10
          );
          ctx.fillStyle = ROYAL_THEME.profileTitleBg;
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = ROYAL_THEME.profileTitleBorder;
          ctx.stroke();

          ctx.font = `bold 19px ${serifFont}`;
          ctx.fillStyle = ROYAL_THEME.profileTitleText;
          ctx.textBaseline = 'top';
          for (let tl = 0; tl < item.titleLinesCard.length; tl++) {
            ctx.fillText(
              item.titleLinesCard[tl],
              textStartX + 12,
              textCursorY + 8 + tl * 25
            );
          }

          textCursorY += item.titleBoxH;

          // 3D. Complete Untruncated Summary
          if (item.summaryLines.length > 0) {
            textCursorY += 10;
            ctx.font = `400 17px ${sansFont}`;
            ctx.fillStyle = ROYAL_THEME.relatedCardText;
            ctx.textBaseline = 'top';
            for (const sLine of item.summaryLines) {
              ctx.fillText(sLine, textStartX, textCursorY);
              textCursorY += 23;
            }
          }
        }

        cursorY += rowH + 20;
      }
      cursorY += 8;
    } else if (block.type === 'authorProfileCard') {
      // Complete Publisher & Author Credentials Card at Monograph End
      const cardH = 210;
      ensureSpace(cardH + 24);

      // Outer Card Box: Royal Light Almond surface (#FFF9EF), border #A87924, 16px radius
      drawRoundedRect(ctx, MARGIN_X, cursorY, CONTENT_W, cardH, 16);
      ctx.fillStyle = ROYAL_THEME.surfaceBg;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = ROYAL_THEME.accentGold;
      ctx.stroke();

      // Author Photo Frame (140x140 circular / rounded frame)
      const photoSize = 140;
      const photoX = MARGIN_X + 24;
      const photoY = cursorY + (cardH - photoSize) / 2;

      ctx.save();
      drawRoundedRect(ctx, photoX, photoY, photoSize, photoSize, 16);
      ctx.fillStyle = ROYAL_THEME.cardBg;
      ctx.fill();
      ctx.clip();

      const authorImg =
        (block.photoSrc ? imageMap.get(block.photoSrc) : undefined) ||
        imageMap.get(AUTHOR_PHOTO_PATH);
      if (authorImg && authorImg.naturalWidth > 0) {
        ctx.drawImage(authorImg, photoX, photoY, photoSize, photoSize);
      } else {
        ctx.fillStyle = ROYAL_THEME.maroonAccent;
        ctx.fillRect(photoX, photoY, photoSize, photoSize);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold 22px ${serifFont}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('AUTHOR', photoX + photoSize / 2, photoY + photoSize / 2);
      }
      ctx.restore();

      drawRoundedRect(ctx, photoX, photoY, photoSize, photoSize, 16);
      ctx.lineWidth = 2;
      ctx.strokeStyle = ROYAL_THEME.accentGold;
      ctx.stroke();

      // Content Column
      const authContentX = photoX + photoSize + 28;
      const authContentW = CONTENT_W - (authContentX - MARGIN_X) - 24;
      let authY = cursorY + 20;

      // Author Badge / Title
      ctx.font = `bold 15px ${sansFont}`;
      ctx.fillStyle = ROYAL_THEME.linkColor;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(
        (block.title || 'RESEARCH, DOCUMENTATION & DIGITAL CREATOR').toUpperCase(),
        authContentX,
        authY
      );
      authY += 24;

      // Author Name: Dr.G Sathyanarayana Raju
      ctx.font = `bold 26px ${serifFont}`;
      ctx.fillStyle = ROYAL_THEME.headingText;
      ctx.fillText(block.name, authContentX, authY);
      authY += 34;

      // Roles / Titles
      ctx.font = `600 16px ${sansFont}`;
      ctx.fillStyle = ROYAL_THEME.maroonAccent;
      const roleLines = wrapCanvasText(ctx, block.roles.join(' • '), authContentW);
      for (const rLine of roleLines.slice(0, 2)) {
        ctx.fillText(rLine, authContentX, authY);
        authY += 22;
      }
      authY += 8;

      // Organization Box (#F4C78A Light Orange Title Box)
      const orgBoxH = 38;
      drawRoundedRect(ctx, authContentX, authY, authContentW, orgBoxH, 8);
      ctx.fillStyle = ROYAL_THEME.profileTitleBg;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = ROYAL_THEME.profileTitleBorder;
      ctx.stroke();

      ctx.font = `600 14px ${sansFont}`;
      ctx.fillStyle = ROYAL_THEME.profileTitleText;
      ctx.fillText(block.organization, authContentX + 12, authY + 10);

      cursorY += cardH + 24;
    }
  }

  return pages;
}

/**
 * Primary article/biography PDF generation and download function used across the portal.
 * - Uses Native HTML5 2D Canvas Multi-Page Rendering so 100% of text is sharp and dark (`#292521` / `#54351F`)
 *   on white (`#FFFFFF`) and very light almond (`#FFFCF5`) backgrounds.
 * - In normal Chrome: saves `<Article-Title>.pdf` directly.
 * - In Android WebView: uploads PDF to `/api/export/prepare-pdf` to obtain a real HTTPS attachment URL
 *   and sends it via `window.AppInventor.setWebViewString(url)` so Android opens/downloads it externally.
 */
export async function downloadArticleAsPdf(
  options: DownloadArticlePdfOptions
): Promise<PdfExportResult> {
  const sourceEl =
    options.containerElement ||
    document.querySelector<HTMLElement>('article.print-article-container') ||
    document.querySelector<HTMLElement>('.print-article-container') ||
    document.querySelector<HTMLElement>('article') ||
    document.querySelector<HTMLElement>('main') ||
    document.body;

  const effectiveTitle = resolveEffectiveArticleTitle(options.articleTitle, sourceEl);
  const cleanDocTitle = sanitizeArticleTitleForFilename(effectiveTitle, sourceEl);
  const filename = `${cleanDocTitle}.pdf`;
  const inAndroidWebView = isAndroidWebViewEnvironment();
  const lang = options.language || 'en';
  const pageWords = FOOTER_PAGE_WORDS[lang] || FOOTER_PAGE_WORDS.en;

  // Dynamically set the document title to the sanitized article title before PDF generation or printing
  setActiveArticleDocumentTitle(effectiveTitle, sourceEl);

  let externalArticleUrl: string | undefined;
  try {
    const baseArticleUrl = options.articleUrl || window.location.href;
    const parsedUrl = new URL(baseArticleUrl, window.location.origin);
    parsedUrl.searchParams.set('lang', lang);
    parsedUrl.searchParams.set('autodownloadpdf', '1');
    parsedUrl.searchParams.delete('autoprint');
    externalArticleUrl = parsedUrl.toString();
  } catch {
    externalArticleUrl = window.location.href;
  }

  try {
    await waitForImages(sourceEl);
    if (
      typeof document !== 'undefined' &&
      'fonts' in document &&
      document.fonts &&
      typeof document.fonts.ready?.then === 'function'
    ) {
      try {
        await document.fonts.ready;
      } catch {
        // Continue if fonts.ready rejects or times out
      }
    }
    const avatarImgPromise = loadImageElement(AUTHOR_PHOTO_PATH);

    const pageCanvases = await renderArticlePagesToCanvases(sourceEl, effectiveTitle, lang);
    const totalPages = Math.max(1, pageCanvases.length);
    const avatarImg = await avatarImgPromise;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Embed the article's title directly in the PDF document metadata dictionary
    pdf.setProperties({
      title: cleanDocTitle,
      subject: effectiveTitle,
      author: CANONICAL_AUTHOR_NAME,
      creator: CANONICAL_ORGANIZATION,
    });

    const pageWidthMm = 210;
    const pageHeightMm = 297;
    const marginLeftMm = 8;
    const footerHeightMm = 18.5;
    const footerY = pageHeightMm - 6 - footerHeightMm;
    const printableWidthMm = pageWidthMm - marginLeftMm * 2;

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      if (pageIndex > 0) {
        pdf.addPage('a4', 'portrait');
      }

      const pageCanvas = pageCanvases[pageIndex];
      const pageDataUrl = pageCanvas.toDataURL('image/jpeg', 0.94);
      pdf.addImage(
        pageDataUrl,
        'JPEG',
        0,
        0,
        pageWidthMm,
        pageHeightMm,
        undefined,
        'FAST'
      );

      const footerDataUrl = renderRepeatingAuthorFooterDataUrl(
        pageIndex + 1,
        totalPages,
        avatarImg,
        {
          pageWord: pageWords.pageWord,
          ofWord: pageWords.ofWord,
        }
      );
      if (footerDataUrl) {
        pdf.addImage(
          footerDataUrl,
          'PNG',
          marginLeftMm,
          footerY,
          printableWidthMm,
          footerHeightMm,
          undefined,
          'FAST'
        );
      }
    }

    // 1. Standard Chrome / Desktop / Mobile Browser path:
    // Create a PDF Blob and trigger download via an explicit `<a download="<Sanitized-Title>.pdf">` link
    // so the browser uses the exact article title as the suggested filename.
    if (!inAndroidWebView) {
      let clientBlobUrl: string | undefined;
      try {
        const pdfBlob = pdf.output('blob');
        clientBlobUrl = URL.createObjectURL(pdfBlob);
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = clientBlobUrl;
        downloadAnchor.download = filename;
        downloadAnchor.setAttribute('download', filename);
        downloadAnchor.rel = 'noopener';
        downloadAnchor.style.display = 'none';
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        window.setTimeout(() => {
          if (downloadAnchor.parentNode) {
            downloadAnchor.parentNode.removeChild(downloadAnchor);
          }
        }, 1500);
      } catch {
        pdf.save(filename);
      }

      let serverDownloadUrl: string | undefined;
      try {
        const pdfDataUri = pdf.output('datauristring');
        const response = await fetch('/api/export/prepare-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename, pdfBase64: pdfDataUri }),
        });
        if (response.ok) {
          const data = (await response.json()) as { downloadUrl?: string };
          if (data?.downloadUrl) {
            serverDownloadUrl = `${window.location.origin}${data.downloadUrl}`;
          }
        }
      } catch {
        // Ignore server cache error in static/offline mode
      }

      return {
        filename,
        downloadUrl: clientBlobUrl || serverDownloadUrl,
        externalArticleUrl,
        isAndroidWebView: false,
      };
    }

    // 2. Android App / WebView path:
    // Prepare server-hosted downloadable PDF URL (Content-Disposition: attachment) and send via AppInventor bridge
    // so Android opens/downloads the PDF in Chrome / Android Download Manager.
    let serverDownloadUrl: string | undefined;
    try {
      const pdfDataUri = pdf.output('datauristring');
      const response = await fetch('/api/export/prepare-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, pdfBase64: pdfDataUri }),
      });
      if (response.ok) {
        const data = (await response.json()) as { downloadUrl?: string };
        if (data?.downloadUrl) {
          serverDownloadUrl = `${window.location.origin}${data.downloadUrl}`;
        }
      }
    } catch {
      // Ignore server cache error in static/offline mode
    }

    if (serverDownloadUrl) {
      if (sendUrlToAppInventorBridge(serverDownloadUrl)) {
        return {
          filename,
          downloadUrl: serverDownloadUrl,
          externalArticleUrl,
          isAndroidWebView: true,
        };
      }
      window.location.assign(serverDownloadUrl);
      return {
        filename,
        downloadUrl: serverDownloadUrl,
        externalArticleUrl,
        isAndroidWebView: true,
      };
    }

    if (externalArticleUrl && sendUrlToAppInventorBridge(externalArticleUrl)) {
      return {
        filename,
        downloadUrl: serverDownloadUrl,
        externalArticleUrl,
        isAndroidWebView: true,
      };
    }

    if (externalArticleUrl) {
      window.open(externalArticleUrl, '_blank', 'noopener,noreferrer');
    }

    return {
      filename,
      downloadUrl: serverDownloadUrl,
      externalArticleUrl,
      isAndroidWebView: true,
    };
  } catch (err) {
    console.warn('PDF export fallback triggered:', err);
    if (inAndroidWebView && externalArticleUrl) {
      sendUrlToAppInventorBridge(externalArticleUrl);
    } else {
      triggerArticlePrintWithTitle(effectiveTitle);
    }
    return {
      filename,
      externalArticleUrl,
      isAndroidWebView: inAndroidWebView,
    };
  }
}

export async function exportElementToPdf(
  sourceEl: HTMLElement,
  title: string,
  _footerLabels?: PdfAuthorFooterLabels
): Promise<boolean> {
  const res = await downloadArticleAsPdf({
    articleTitle: title,
    containerElement: sourceEl,
  });
  return Boolean(res.filename);
}
