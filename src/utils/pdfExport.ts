import { jsPDF } from 'jspdf';
import { LanguageCode } from '../types';
import {
  hasAppInventorBridge,
  isAndroidWebViewEnvironment,
  sendUrlToAppInventorBridge,
  handleWhatsAppLinkClick,
  handleExternalBrowserUrlClick,
  isWhatsAppUrl,
  normalizeWhatsAppUrlToHttps,
  installGlobalAndroidWebViewInterceptors,
} from './androidBridge';

export {
  hasAppInventorBridge,
  isAndroidWebViewEnvironment,
  sendUrlToAppInventorBridge,
  handleWhatsAppLinkClick,
  handleExternalBrowserUrlClick,
  isWhatsAppUrl,
  normalizeWhatsAppUrlToHttps,
  installGlobalAndroidWebViewInterceptors,
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
 * Sanitizes an article title into a clean, safe `<Article-Title>.pdf` filename
 * while preserving English and Indic script characters.
 */
export function generateArticlePdfFilename(articleTitle: string): string {
  const cleaned = (articleTitle || 'Suryavamsha-Historical-Article')
    .replace(/[<>:"/\\|?*\x00-\x1F]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 110)
    .replace(/\s+/g, '-');
  return `${cleaned || 'Suryavamsha-Historical-Article'}.pdf`;
}

export const buildSafePdfFilename = generateArticlePdfFilename;

/**
 * Sets `document.title` temporarily to the article title and triggers native print dialog.
 */
export function triggerArticlePrintWithTitle(
  articleTitle: string,
  onBeforePrint?: () => void
): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const previousTitle = document.title;
  const cleanTitle = (articleTitle || previousTitle).replace(/[<>:"/\\|?*]+/g, ' ').trim();
  try {
    if (typeof onBeforePrint === 'function') {
      onBeforePrint();
    }
    const updatePagination = (window as unknown as { __UPDATE_PRINT_PAGINATION__?: () => void })
      .__UPDATE_PRINT_PAGINATION__;
    if (typeof updatePagination === 'function') {
      updatePagination();
    }
    if (cleanTitle) {
      document.title = cleanTitle;
    }
    window.print();
  } finally {
    window.setTimeout(() => {
      document.title = previousTitle;
    }, 1200);
  }
}

async function waitForImages(root: HTMLElement): Promise<void> {
  const images = Array.from(root.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }
      return new Promise<void>((resolve) => {
        const done = () => resolve();
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
        setTimeout(done, 3500);
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
    const timer = setTimeout(() => resolve(null), 4000);
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

/**
 * Wraps a paragraph string into lines that fit within `maxWidth` on the given 2D canvas context.
 */
function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const normalized = (text || '').replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];

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
      if (ctx.measureText(candidate).width <= maxWidth) {
        currentLine = candidate;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        if (ctx.measureText(word).width > maxWidth) {
          let chunk = '';
          for (const ch of word) {
            if (ctx.measureText(chunk + ch).width <= maxWidth) {
              chunk += ch;
            } else {
              if (chunk) lines.push(chunk);
              chunk = ch;
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

type PdfBlock =
  | { type: 'sectionHeading'; text: string }
  | { type: 'subHeading'; text: string }
  | { type: 'summaryBox'; title?: string; paragraphs: string[] }
  | { type: 'paragraph'; text: string }
  | { type: 'bullet'; marker: string; title?: string; text: string }
  | { type: 'metaGrid'; items: ExtractedMetaItem[] }
  | { type: 'table'; table: ExtractedTableData }
  | { type: 'figure'; src: string; alt: string; caption: string };

function cleanText(raw: string | null | undefined): string {
  return (raw || '').replace(/\s+/g, ' ').trim();
}

function isInsideSkippedElement(el: Element, root: HTMLElement): boolean {
  let curr: Element | null = el;
  while (curr && curr !== root) {
    if (
      curr.classList.contains('no-print') ||
      curr.classList.contains('print-repeating-author-footer') ||
      curr.tagName === 'BUTTON' ||
      curr.tagName === 'NAV'
    ) {
      return true;
    }
    curr = curr.parentElement;
  }
  return false;
}

/**
 * Extracts structured content from the article DOM element so every heading, metadata field,
 * image, executive summary, paragraph, bullet list, table, and reference can be rendered
 * directly via HTML5 2D Canvas `ctx.fillText()` with 100% text reliability.
 */
function extractStructuredArticleContent(
  sourceEl: HTMLElement,
  fallbackTitle: string
): {
  badges: string[];
  title: string;
  subtitle: string;
  headerMeta: ExtractedMetaItem[];
  leadFigures: { src: string; alt: string; caption: string }[];
  blocks: PdfBlock[];
} {
  const badges: string[] = [];
  let title = cleanText(fallbackTitle);
  let subtitle = '';
  const headerMeta: ExtractedMetaItem[] = [];
  const leadFigures: { src: string; alt: string; caption: string }[] = [];
  const blocks: PdfBlock[] = [];
  const seenImageSrcs = new Set<string>();

  const headerEl = sourceEl.querySelector('header');
  if (headerEl) {
    const h1 = headerEl.querySelector('h1');
    if (h1 && cleanText(h1.textContent)) {
      title = cleanText(h1.textContent);
    }

    const badgeSpans = Array.from(headerEl.querySelectorAll('span, div')).filter(
      (el) =>
        !isInsideSkippedElement(el, sourceEl) &&
        el.children.length === 0 &&
        cleanText(el.textContent).length > 1 &&
        cleanText(el.textContent).length < 65 &&
        (!h1 || !h1.contains(el))
    );
    for (const b of badgeSpans.slice(0, 4)) {
      const txt = cleanText(b.textContent);
      if (txt && txt !== title && !badges.includes(txt)) {
        badges.push(txt);
      }
    }

    const headerParas = Array.from(headerEl.querySelectorAll('p')).filter(
      (p) => !isInsideSkippedElement(p, sourceEl) && !p.closest('figcaption')
    );
    if (headerParas.length > 0) {
      subtitle = cleanText(headerParas[0].textContent);
    }

    // Extract header metadata (<dl><div><dt/><dd/></div></dl>)
    const dlItems = Array.from(headerEl.querySelectorAll('dl > div'));
    for (const item of dlItems) {
      const dt = cleanText(item.querySelector('dt')?.textContent);
      const dd = cleanText(item.querySelector('dd')?.textContent);
      if (dt && dd) {
        headerMeta.push({ label: dt, value: dd });
      }
    }

    // Also extract card-based metadata inside header (e.g., ArticleDetailView 3-col metadata grid)
    if (headerMeta.length === 0) {
      const metaBoxes = Array.from(headerEl.querySelectorAll('.grid > div'));
      for (const box of metaBoxes) {
        const childDivs = Array.from(box.querySelectorAll(':scope > div'));
        if (childDivs.length >= 2) {
          const lbl = cleanText(childDivs[0].textContent);
          const val = cleanText(childDivs[1].textContent);
          if (lbl && val) {
            headerMeta.push({ label: lbl, value: val });
          }
        }
      }
    }

    const headerFigures = Array.from(headerEl.querySelectorAll('figure'));
    for (const fig of headerFigures) {
      if (isInsideSkippedElement(fig, sourceEl)) continue;
      const img = fig.querySelector('img');
      const src = img?.getAttribute('src') || img?.src || '';
      if (src && !src.includes('dr_g_sathyanarayana_raju') && !seenImageSrcs.has(src)) {
        seenImageSrcs.add(src);
        leadFigures.push({
          src,
          alt: cleanText(img?.getAttribute('alt')) || title,
          caption: cleanText(fig.querySelector('figcaption')?.textContent),
        });
      }
    }
    const standaloneHeaderImgs = Array.from(headerEl.querySelectorAll('img'));
    for (const img of standaloneHeaderImgs) {
      if (isInsideSkippedElement(img, sourceEl)) continue;
      const src = img.getAttribute('src') || img.src || '';
      if (src && !src.includes('dr_g_sathyanarayana_raju') && !seenImageSrcs.has(src)) {
        seenImageSrcs.add(src);
        leadFigures.push({
          src,
          alt: cleanText(img.getAttribute('alt')) || title,
          caption: '',
        });
      }
    }
  } else {
    const firstH1 = sourceEl.querySelector('h1');
    if (firstH1 && cleanText(firstH1.textContent)) {
      title = cleanText(firstH1.textContent);
    }
  }

  // Also check for direct lead figure right after header
  const directLeadFigures = Array.from(sourceEl.querySelectorAll('figure.print-lead-figure'));
  for (const fig of directLeadFigures) {
    if (isInsideSkippedElement(fig, sourceEl)) continue;
    const img = fig.querySelector('img');
    const src = img?.getAttribute('src') || img?.src || '';
    if (src && !src.includes('dr_g_sathyanarayana_raju') && !seenImageSrcs.has(src)) {
      seenImageSrcs.add(src);
      leadFigures.push({
        src,
        alt: cleanText(img?.getAttribute('alt')) || title,
        caption: cleanText(fig.querySelector('figcaption')?.textContent),
      });
    }
  }

  const processSectionContainer = (sectionEl: Element) => {
    if (isInsideSkippedElement(sectionEl, sourceEl)) return;

    const sectionH2 = sectionEl.querySelector(':scope > h2, :scope > div > h2');
    const sectionTitle = cleanText(sectionH2?.textContent);
    const isSummarySection =
      /summary|abstract|overview|introduction & historical scope/i.test(sectionTitle);

    if (sectionTitle) {
      blocks.push({ type: 'sectionHeading', text: sectionTitle });
    }

    if (isSummarySection) {
      const paras = Array.from(sectionEl.querySelectorAll('p'))
        .filter((p) => !isInsideSkippedElement(p, sourceEl))
        .map((p) => cleanText(p.textContent))
        .filter(Boolean);
      if (paras.length > 0) {
        blocks.push({
          type: 'summaryBox',
          paragraphs: paras,
        });
        return;
      }
    }

    const walker = document.createTreeWalker(sectionEl, NodeFilter.SHOW_ELEMENT);
    let node = walker.nextNode() as Element | null;
    const handledElements = new Set<Element>();
    if (sectionH2) handledElements.add(sectionH2);

    while (node) {
      const el = node;
      node = walker.nextNode() as Element | null;

      if (handledElements.has(el) || isInsideSkippedElement(el, sourceEl)) {
        continue;
      }

      let ancestorHandled = false;
      let parent = el.parentElement;
      while (parent && parent !== sectionEl) {
        if (handledElements.has(parent)) {
          ancestorHandled = true;
          break;
        }
        parent = parent.parentElement;
      }
      if (ancestorHandled) continue;

      const tag = el.tagName.toUpperCase();

      if (tag === 'H2') {
        const txt = cleanText(el.textContent);
        if (txt && txt !== sectionTitle) {
          blocks.push({ type: 'sectionHeading', text: txt });
        }
        handledElements.add(el);
      } else if (tag === 'H3' || tag === 'H4') {
        if (el.closest('li')) continue;
        const txt = cleanText(el.textContent);
        if (txt) {
          blocks.push({ type: 'subHeading', text: txt });
        }
        handledElements.add(el);
      } else if (tag === 'FIGURE') {
        const img = el.querySelector('img');
        const src = img?.getAttribute('src') || img?.src || '';
        if (src && !src.includes('dr_g_sathyanarayana_raju') && !seenImageSrcs.has(src)) {
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
          const prefix = spans.length > 0 ? `[${spans[0]}] ${itemTitle}` : itemTitle;
          blocks.push({
            type: 'bullet',
            marker: isOrdered ? `${idx}.` : '•',
            title: prefix,
            text: itemBody,
          });
        } else {
          const fullText = cleanText(el.textContent);
          const cleanedBullet = fullText.replace(/^\d+\s+/, '');
          if (cleanedBullet) {
            blocks.push({
              type: 'bullet',
              marker: isOrdered ? `${idx}.` : '•',
              text: cleanedBullet,
            });
          }
        }
        handledElements.add(el);
      } else if (tag === 'P' || tag === 'BLOCKQUOTE') {
        if (el.closest('li') || el.closest('figcaption') || el.closest('td') || el.closest('dd')) {
          continue;
        }
        const txt = cleanText(el.textContent);
        if (txt) {
          blocks.push({ type: 'paragraph', text: txt });
        }
        handledElements.add(el);
      }
    }
  };

  const sections = Array.from(
    sourceEl.querySelectorAll(':scope > div > section, :scope > section, section')
  );
  if (sections.length > 0) {
    const topSections = sections.filter(
      (sec) => !sections.some((other) => other !== sec && other.contains(sec))
    );
    for (const sec of topSections) {
      processSectionContainer(sec);
    }
  } else {
    processSectionContainer(sourceEl);
  }

  if (blocks.length === 0) {
    const rawLines = (sourceEl.innerText || '')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && l !== title);
    for (const line of rawLines) {
      blocks.push({ type: 'paragraph', text: line });
    }
  }

  return {
    badges,
    title,
    subtitle,
    headerMeta,
    leadFigures,
    blocks,
  };
}

/**
 * Renders the repeating circular-photo Author Footer (`Dr.G Sathyanarayana Raju`)
 * and `Page X of Y` badge onto a high-resolution HTML5 Canvas data URL.
 * Uses a clean Very Light Almond (`#FFFCF5`) surface and dark readable typography (`#54351F` / `#292521`).
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

  // Very Light Almond background (#FFFCF5) for print readability
  ctx.fillStyle = '#FFFCF5';
  ctx.fillRect(0, 0, width, height);

  // Top gold accent border (#A87924)
  ctx.fillStyle = '#A87924';
  ctx.fillRect(0, 0, width, 4);

  // Bottom primary maroon accent bar (#762D35)
  ctx.fillStyle = '#762D35';
  ctx.fillRect(0, height - 6, width, 6);

  // Circular author photo frame on left
  const centerX = 72;
  const centerY = height / 2;
  const radius = 46;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
  ctx.fillStyle = '#762D35';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 3, 0, Math.PI * 2);
  ctx.fillStyle = '#A87924';
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  ctx.fillStyle = '#FFF9EF';
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
    ctx.fillStyle = '#54351F';
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
  ctx.fillStyle = '#54351F';
  ctx.fillText(CANONICAL_AUTHOR_NAME, textX, 54);

  const nameWidth = ctx.measureText(CANONICAL_AUTHOR_NAME).width;

  ctx.font = 'bold 19px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#A87924';
  ctx.fillText('•', textX + nameWidth + 12, 53);

  ctx.font = 'bold 17px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#292521';
  ctx.fillText(CANONICAL_AUTHOR_ROLES, textX + nameWidth + 28, 53);

  // Secondary Line: Research, Documentation & Compilation by Dr.G Sathyanarayana Raju
  ctx.font = 'bold 17px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#76501F';
  ctx.fillText(CANONICAL_AUTHOR_CREDIT, textX, 88);

  // Tertiary Line: Organization
  ctx.font = '600 16px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#292521';
  ctx.fillText(CANONICAL_ORGANIZATION, textX, 118);

  // Right Block: Vertical Gold Divider + Page X of Y Badge
  const dividerX = width - 275;
  ctx.fillStyle = '#A87924';
  ctx.fillRect(dividerX, 24, 2, height - 48);

  const badgeX = dividerX + 22;
  const badgeY = 40;
  const badgeW = width - badgeX - 24;
  const badgeH = 68;

  drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 12);
  ctx.fillStyle = '#FFF9EF';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#A87924';
  ctx.stroke();

  const pageWord = labels?.pageWord || 'Page';
  const ofWord = labels?.ofWord || 'of';
  const pageText = `${pageWord} ${pageNumber} ${ofWord} ${totalPages}`;

  ctx.font = 'bold 21px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#54351F';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(pageText, badgeX + badgeW / 2, badgeY + badgeH / 2);

  return canvas.toDataURL('image/png');
}

/**
 * Renders the entire article into an array of crisp A4 Page Canvases (`1654 × 2339 px`)
 * using native HTML5 2D Canvas drawing calls (`ctx.fillText`, `ctx.drawImage`, `ctx.fillRect`).
 * Guarantees 100% readable dark text (`#292521` / `#54351F`) on white (`#FFFFFF`) and
 * very light almond (`#FFFCF5`) backgrounds with zero missing text in Chrome or Android WebView.
 */
async function renderArticlePagesToCanvases(
  sourceEl: HTMLElement,
  fallbackTitle: string
): Promise<HTMLCanvasElement[]> {
  const PAGE_W = 1654; // A4 width at ~200 DPI
  const PAGE_H = 2339; // A4 height at ~200 DPI
  const MARGIN_X = 96;
  const MARGIN_TOP = 92;
  const FOOTER_RESERVED_H = 205;
  const CONTENT_W = PAGE_W - MARGIN_X * 2;
  const MAX_Y = PAGE_H - FOOTER_RESERVED_H;

  const data = extractStructuredArticleContent(sourceEl, fallbackTitle);

  const allSrcs = new Set<string>();
  for (const fig of data.leadFigures) allSrcs.add(fig.src);
  for (const b of data.blocks) {
    if (b.type === 'figure') allSrcs.add(b.src);
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

    // Crisp White page background (#FFFFFF) for reliable printing
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, PAGE_W, PAGE_H);

    // Archival page border frame (#A87924) above footer
    ctx.strokeStyle = '#A87924';
    ctx.lineWidth = 2;
    ctx.strokeRect(56, 52, PAGE_W - 112, PAGE_H - FOOTER_RESERVED_H - 36);

    if (pages.length > 0) {
      ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#76501F';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      const shortHeader =
        data.title.length > 85 ? `${data.title.slice(0, 82)}...` : data.title;
      ctx.fillText(shortHeader, MARGIN_X, 66);

      ctx.fillStyle = '#A87924';
      ctx.fillRect(MARGIN_X, 94, CONTENT_W, 1.5);
      cursorY = 114;
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

  startNewPage();

  // 1. RENDER ARTICLE HEADER CARD (Very Light Almond #FFFCF5 + Dark Readable Text)
  ctx.font = 'bold 42px Georgia, "Times New Roman", serif';
  const titleLines = wrapCanvasText(ctx, data.title, CONTENT_W - 72);

  ctx.font = 'italic 25px Georgia, "Times New Roman", serif';
  const subtitleLines = data.subtitle
    ? wrapCanvasText(ctx, data.subtitle, CONTENT_W - 72)
    : [];

  const metaRowsCount = Math.ceil(data.headerMeta.length / 2);
  const headerBoxH =
    68 +
    (data.badges.length > 0 ? 46 : 0) +
    titleLines.length * 52 +
    (subtitleLines.length > 0 ? subtitleLines.length * 36 + 16 : 0) +
    (metaRowsCount > 0 ? metaRowsCount * 68 + 28 : 20);

  drawRoundedRect(ctx, MARGIN_X, cursorY, CONTENT_W, headerBoxH, 16);
  ctx.fillStyle = '#FFFCF5';
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#A87924';
  ctx.stroke();

  ctx.fillStyle = '#762D35';
  ctx.fillRect(MARGIN_X + 2, cursorY + 2, CONTENT_W - 4, 10);

  let innerY = cursorY + 28;
  const innerX = MARGIN_X + 36;

  ctx.font = 'bold 17px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#76501F';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(
    'SURYAVAMSHA ODIYARAJU KSHATRIYA • HISTORICAL DOCUMENTARY & ROYAL HERITAGE ARCHIVE',
    innerX,
    innerY
  );
  innerY += 32;

  if (data.badges.length > 0) {
    let badgeX = innerX;
    ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
    for (let i = 0; i < data.badges.length; i++) {
      const bText = data.badges[i];
      const bW = Math.min(ctx.measureText(bText).width + 28, CONTENT_W - 72);
      if (badgeX + bW > MARGIN_X + CONTENT_W - 36) break;
      drawRoundedRect(ctx, badgeX, innerY, bW, 34, 8);
      ctx.fillStyle = i === 0 ? '#762D35' : '#FFF9EF';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#A87924';
      ctx.stroke();

      ctx.fillStyle = i === 0 ? '#FFFFFF' : '#54351F';
      ctx.textBaseline = 'middle';
      ctx.fillText(bText, badgeX + 14, innerY + 17);
      badgeX += bW + 12;
    }
    innerY += 48;
  }

  ctx.font = 'bold 42px Georgia, "Times New Roman", serif';
  ctx.fillStyle = '#54351F';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  for (const line of titleLines) {
    ctx.fillText(line, innerX, innerY);
    innerY += 52;
  }

  if (subtitleLines.length > 0) {
    innerY += 8;
    ctx.font = 'italic 25px Georgia, "Times New Roman", serif';
    ctx.fillStyle = '#292521';
    for (const line of subtitleLines) {
      ctx.fillText(line, innerX, innerY);
      innerY += 36;
    }
  }

  if (data.headerMeta.length > 0) {
    innerY += 14;
    ctx.fillStyle = '#A87924';
    ctx.fillRect(innerX, innerY, CONTENT_W - 72, 1.5);
    innerY += 14;

    const colW = (CONTENT_W - 92) / 2;
    for (let i = 0; i < data.headerMeta.length; i += 2) {
      const rowItems = data.headerMeta.slice(i, i + 2);
      for (let c = 0; c < rowItems.length; c++) {
        const cellX = innerX + c * (colW + 20);
        drawRoundedRect(ctx, cellX, innerY, colW, 56, 8);
        ctx.fillStyle = '#FFF9EF';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#A87924';
        ctx.stroke();

        ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#76501F';
        ctx.textBaseline = 'top';
        ctx.fillText(rowItems[c].label.toUpperCase(), cellX + 12, innerY + 8);

        ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#292521';
        const valLines = wrapCanvasText(ctx, rowItems[c].value, colW - 24);
        ctx.fillText(valLines[0] || '', cellX + 12, innerY + 28);
      }
      innerY += 66;
    }
  }

  cursorY += headerBoxH + 28;

  const drawFigureBlock = (fig: { src: string; alt: string; caption: string }) => {
    const img = imageMap.get(fig.src);
    if (!img) return;

    ctx.font = 'italic 20px Georgia, "Times New Roman", serif';
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
    ctx.fillStyle = '#FFFCF5';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#A87924';
    ctx.stroke();

    const imgX = MARGIN_X + (CONTENT_W - drawW) / 2;
    const imgY = cursorY + 18;
    ctx.drawImage(img, imgX, imgY, drawW, drawH);

    if (capLines.length > 0) {
      let capY = imgY + drawH + 14;
      ctx.font = 'italic 20px Georgia, "Times New Roman", serif';
      ctx.fillStyle = '#54351F';
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

  // 3. RENDER ALL ARTICLE SECTIONS, PARAGRAPHS, LISTS, TABLES & REFERENCES
  for (const block of data.blocks) {
    if (block.type === 'sectionHeading') {
      ctx.font = 'bold 30px Georgia, "Times New Roman", serif';
      const lines = wrapCanvasText(ctx, block.text, CONTENT_W - 24);
      const needed = lines.length * 40 + 36;
      ensureSpace(needed + 60);

      cursorY += 10;
      ctx.fillStyle = '#762D35';
      ctx.fillRect(MARGIN_X, cursorY + 4, 8, lines.length * 38 - 4);

      ctx.fillStyle = '#54351F';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      for (const line of lines) {
        ctx.fillText(line, MARGIN_X + 20, cursorY);
        cursorY += 40;
      }

      ctx.fillStyle = '#A87924';
      ctx.fillRect(MARGIN_X, cursorY + 2, CONTENT_W, 2);
      cursorY += 20;
    } else if (block.type === 'subHeading') {
      ctx.font = 'bold 25px Georgia, "Times New Roman", serif';
      const lines = wrapCanvasText(ctx, block.text, CONTENT_W);
      ensureSpace(lines.length * 34 + 28);

      cursorY += 6;
      ctx.fillStyle = '#54351F';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      for (const line of lines) {
        ctx.fillText(line, MARGIN_X, cursorY);
        cursorY += 34;
      }
      cursorY += 8;
    } else if (block.type === 'summaryBox') {
      ctx.font = 'italic 24px Georgia, "Times New Roman", serif';
      const allLines: string[] = [];
      for (const p of block.paragraphs) {
        const wrapped = wrapCanvasText(ctx, p, CONTENT_W - 64);
        allLines.push(...wrapped, '');
      }
      if (allLines[allLines.length - 1] === '') allLines.pop();

      const boxH = allLines.length * 35 + 44;
      ensureSpace(boxH + 20);

      drawRoundedRect(ctx, MARGIN_X, cursorY, CONTENT_W, boxH, 12);
      ctx.fillStyle = '#FFF9EF';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#A87924';
      ctx.stroke();

      ctx.fillStyle = '#762D35';
      ctx.fillRect(MARGIN_X, cursorY + 8, 8, boxH - 16);

      let textY = cursorY + 22;
      ctx.fillStyle = '#292521';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      for (const line of allLines) {
        if (line) {
          ctx.fillText(line, MARGIN_X + 32, textY);
        }
        textY += 35;
      }
      cursorY += boxH + 22;
    } else if (block.type === 'paragraph') {
      ctx.font = '400 23px system-ui, -apple-system, sans-serif';
      const lines = wrapCanvasText(ctx, block.text, CONTENT_W);
      ctx.fillStyle = '#292521';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      for (const line of lines) {
        ensureSpace(36);
        ctx.font = '400 23px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#292521';
        ctx.fillText(line, MARGIN_X, cursorY);
        cursorY += 35;
      }
      cursorY += 16;
    } else if (block.type === 'bullet') {
      const indentX = MARGIN_X + 44;
      const bulletW = CONTENT_W - 44;

      let titleLines: string[] = [];
      if (block.title) {
        ctx.font = 'bold 23px system-ui, -apple-system, sans-serif';
        titleLines = wrapCanvasText(ctx, block.title, bulletW);
      }

      ctx.font = '400 22px system-ui, -apple-system, sans-serif';
      const bodyLines = wrapCanvasText(ctx, block.text, bulletW);

      const totalH = titleLines.length * 33 + bodyLines.length * 33 + 14;
      ensureSpace(Math.min(totalH, 140));

      ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#762D35';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(block.marker, MARGIN_X + 6, cursorY);

      if (titleLines.length > 0) {
        ctx.font = 'bold 23px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#54351F';
        for (const tLine of titleLines) {
          ensureSpace(34);
          ctx.font = 'bold 23px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = '#54351F';
          ctx.fillText(tLine, indentX, cursorY);
          cursorY += 33;
        }
      }

      ctx.font = '400 22px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#292521';
      for (const bLine of bodyLines) {
        ensureSpace(34);
        ctx.font = '400 22px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#292521';
        ctx.fillText(bLine, indentX, cursorY);
        cursorY += 33;
      }
      cursorY += 12;
    } else if (block.type === 'metaGrid') {
      const colW = (CONTENT_W - 24) / 2;
      for (let i = 0; i < block.items.length; i += 2) {
        const pair = block.items.slice(i, i + 2);
        ensureSpace(84);
        for (let c = 0; c < pair.length; c++) {
          const cellX = MARGIN_X + c * (colW + 24);
          drawRoundedRect(ctx, cellX, cursorY, colW, 72, 8);
          ctx.fillStyle = '#FFFCF5';
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#A87924';
          ctx.stroke();

          ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = '#76501F';
          ctx.textBaseline = 'top';
          ctx.fillText(pair[c].label.toUpperCase(), cellX + 14, cursorY + 10);

          ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = '#292521';
          const vLines = wrapCanvasText(ctx, pair[c].value, colW - 28);
          ctx.fillText(vLines[0] || '', cellX + 14, cursorY + 34);
        }
        cursorY += 84;
      }
      cursorY += 8;
    } else if (block.type === 'table') {
      const colCount = Math.max(
        block.table.headers.length,
        ...block.table.rows.map((r) => r.length),
        1
      );
      const colW = CONTENT_W / colCount;

      if (block.table.headers.length > 0) {
        ctx.font = 'bold 19px system-ui, -apple-system, sans-serif';
        const wrappedHeaders = block.table.headers.map((h) =>
          wrapCanvasText(ctx, h, colW - 20)
        );
        const maxHeaderLines = Math.max(...wrappedHeaders.map((w) => w.length), 1);
        const headerRowH = maxHeaderLines * 26 + 20;
        ensureSpace(headerRowH + 50);

        ctx.fillStyle = '#FFF9EF';
        ctx.fillRect(MARGIN_X, cursorY, CONTENT_W, headerRowH);
        ctx.strokeStyle = '#A87924';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(MARGIN_X, cursorY, CONTENT_W, headerRowH);

        for (let c = 0; c < colCount; c++) {
          const cellX = MARGIN_X + c * colW;
          if (c > 0) {
            ctx.beginPath();
            ctx.moveTo(cellX, cursorY);
            ctx.lineTo(cellX, cursorY + headerRowH);
            ctx.stroke();
          }
          ctx.font = 'bold 19px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = '#54351F';
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
        ctx.font = '400 18px system-ui, -apple-system, sans-serif';
        const wrappedCells = row.map((cell) => wrapCanvasText(ctx, cell, colW - 20));
        const maxCellLines = Math.max(...wrappedCells.map((w) => w.length), 1);
        const rowH = maxCellLines * 25 + 18;

        ensureSpace(rowH);

        ctx.fillStyle = r % 2 === 0 ? '#FFFFFF' : '#FFFCF5';
        ctx.fillRect(MARGIN_X, cursorY, CONTENT_W, rowH);
        ctx.strokeStyle = '#A87924';
        ctx.lineWidth = 1;
        ctx.strokeRect(MARGIN_X, cursorY, CONTENT_W, rowH);

        for (let c = 0; c < colCount; c++) {
          const cellX = MARGIN_X + c * colW;
          if (c > 0) {
            ctx.beginPath();
            ctx.moveTo(cellX, cursorY);
            ctx.lineTo(cellX, cursorY + rowH);
            ctx.stroke();
          }
          ctx.font =
            c === 0
              ? 'bold 18px system-ui, -apple-system, sans-serif'
              : '400 18px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = c === 0 ? '#54351F' : '#292521';
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
  const filename = generateArticlePdfFilename(options.articleTitle);
  const inAndroidWebView = isAndroidWebViewEnvironment();
  const lang = options.language || 'en';
  const pageWords = FOOTER_PAGE_WORDS[lang] || FOOTER_PAGE_WORDS.en;

  const sourceEl =
    options.containerElement ||
    document.querySelector<HTMLElement>('article.print-article-container') ||
    document.querySelector<HTMLElement>('.print-article-container') ||
    document.querySelector<HTMLElement>('article') ||
    document.querySelector<HTMLElement>('main') ||
    document.body;

  let externalArticleUrl: string | undefined;
  try {
    const baseArticleUrl = options.articleUrl || window.location.href;
    const parsedUrl = new URL(baseArticleUrl, window.location.origin);
    parsedUrl.searchParams.set('autodownloadpdf', '1');
    externalArticleUrl = parsedUrl.toString();
  } catch {
    externalArticleUrl = window.location.href;
  }

  try {
    await waitForImages(sourceEl);
    const avatarImgPromise = loadImageElement(AUTHOR_PHOTO_PATH);

    const pageCanvases = await renderArticlePagesToCanvases(sourceEl, options.articleTitle);
    const totalPages = Math.max(1, pageCanvases.length);
    const avatarImg = await avatarImgPromise;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
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

    // Prepare server-hosted downloadable PDF URL (works in both Chrome and Android WebView)
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
      // Ignore server cache error in offline mode
    }

    if (!inAndroidWebView) {
      pdf.save(filename);
      return {
        filename,
        downloadUrl: serverDownloadUrl,
        externalArticleUrl,
        isAndroidWebView: false,
      };
    }

    // Inside Android WebView: never silently attempt an unsupported blob: download
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
      triggerArticlePrintWithTitle(options.articleTitle);
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
