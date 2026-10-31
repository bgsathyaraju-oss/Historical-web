import { jsPDF } from 'jspdf';
import { domToCanvas } from 'modern-screenshot';
import { LanguageCode } from '../types';

export interface PdfExportUiLabels {
  downloadPdfBtn: string;
  generatingPdfBtn: string;
  printBtn: string;
  pdfSavedNotice: (filename: string) => string;
  directDownloadLinkLabel: string;
}

export const PDF_EXPORT_UI_LABELS: Record<LanguageCode, PdfExportUiLabels> = {
  en: {
    downloadPdfBtn: 'Download PDF',
    generatingPdfBtn: 'Generating PDF…',
    printBtn: 'Print',
    pdfSavedNotice: (filename: string) => `PDF ready & saved: ${filename}`,
    directDownloadLinkLabel: 'Tap here if download did not start automatically'
  },
  hi: {
    downloadPdfBtn: 'PDF डाउनलोड करें (Download PDF)',
    generatingPdfBtn: 'PDF तैयार हो रहा है…',
    printBtn: 'प्रिंट (Print)',
    pdfSavedNotice: (filename: string) => `PDF डाउनलोड तैयार: ${filename}`,
    directDownloadLinkLabel: 'यदि डाउनलोड स्वतः शुरू नहीं हुआ तो यहाँ टैप करें'
  },
  te: {
    downloadPdfBtn: 'PDF డౌన్‌లోడ్ (Download PDF)',
    generatingPdfBtn: 'PDF సిద్ధమవుతోంది…',
    printBtn: 'ప్రింట్ (Print)',
    pdfSavedNotice: (filename: string) => `PDF ఫైల్ సిద్ధంగా ఉంది: ${filename}`,
    directDownloadLinkLabel: 'డౌన్‌లోడ్ ప్రారంభం కాకపోతే ఇక్కడ నొక్కండి'
  },
  kn: {
    downloadPdfBtn: 'PDF ಡೌನ್‌ಲೋಡ್ (Download PDF)',
    generatingPdfBtn: 'PDF ಸಿದ್ಧವಾಗುತ್ತಿದೆ…',
    printBtn: 'ಮುದ್ರಿಸಿ (Print)',
    pdfSavedNotice: (filename: string) => `PDF ಫೈಲ್ ಸಿದ್ಧವಾಗಿದೆ: ${filename}`,
    directDownloadLinkLabel: 'ಡೌನ್‌ಲೋಡ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪ್ರಾರಂಭವಾಗದಿದ್ದರೆ ಇಲ್ಲಿ ಒತ್ತಿರಿ'
  },
  ta: {
    downloadPdfBtn: 'PDF பதிவிறக்கம் (Download PDF)',
    generatingPdfBtn: 'PDF தயாராகிறது…',
    printBtn: 'அச்சிடு (Print)',
    pdfSavedNotice: (filename: string) => `PDF கோப்பு தயார்: ${filename}`,
    directDownloadLinkLabel: 'பதிவிறக்கம் தொடங்கவில்லை என்றால் இங்கே தட்டவும்'
  },
  mr: {
    downloadPdfBtn: 'PDF डाउनलोड करा (Download PDF)',
    generatingPdfBtn: 'PDF तयार होत आहे…',
    printBtn: 'प्रिंट (Print)',
    pdfSavedNotice: (filename: string) => `PDF फाइल तयार: ${filename}`,
    directDownloadLinkLabel: 'डाउनलोड आपोआप सुरू न झाल्यास येथे टॅप करा'
  },
  or: {
    downloadPdfBtn: 'PDF ଡାଉନଲୋଡ୍ (Download PDF)',
    generatingPdfBtn: 'PDF ପ୍ରସ୍ତୁତ ହେଉଛି…',
    printBtn: 'ପ୍ରିଣ୍ଟ (Print)',
    pdfSavedNotice: (filename: string) => `PDF ଫାଇଲ୍ ପ୍ରସ୍ତୁତ: ${filename}`,
    directDownloadLinkLabel: 'ଡାଉନଲୋଡ୍ ଆରମ୍ଭ ନହେଲେ ଏଠାରେ କ୍ଲିକ୍ କରନ୍ତୁ'
  },
  bn: {
    downloadPdfBtn: 'PDF ডাউনলোড (Download PDF)',
    generatingPdfBtn: 'PDF তৈরি হচ্ছে…',
    printBtn: 'প্রিন্ট (Print)',
    pdfSavedNotice: (filename: string) => `PDF ফাইল প্রস্তুত: ${filename}`,
    directDownloadLinkLabel: 'ডাউনলোড স্বয়ংক্রিয়ভাবে শুরু না হলে এখানে ট্যাপ করুন'
  }
};

interface FooterLocalizedStrings {
  titles: string;
  credit: string;
  pageWord: string;
  ofWord: string;
}

const PDF_FOOTER_I18N: Record<LanguageCode, FooterLocalizedStrings> = {
  en: {
    titles:
      'Founder • Web Developer / Designer • Digital Creator • Historical Documentation Contributor',
    credit: 'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju',
    pageWord: 'Page',
    ofWord: 'of'
  },
  hi: {
    titles:
      'संस्थापक • वेब डेवलपर / डिज़ाइनर • डिजिटल क्रिएटर • ऐतिहासिक दस्तावेजीकरण योगदानकर्ता',
    credit: 'शोध, दस्तावेजीकरण एवं संकलन: Dr.G Sathyanarayana Raju',
    pageWord: 'पृष्ठ / Page',
    ofWord: 'of'
  },
  te: {
    titles:
      'వ్యవస్థాపకులు • వెబ్ డెవలపర్ / డిజైనర్ • డిజిటల్ క్రియేటర్ • చారిత్రక డాక్యుమెంటేషన్ సహకారకర్త',
    credit: 'పరిశోధన, డాక్యుమెంటేషన్ & సంకలనం: Dr.G Sathyanarayana Raju',
    pageWord: 'పేజీ / Page',
    ofWord: 'of'
  },
  kn: {
    titles:
      'ಸ್ಥಾಪಕರು • ವೆಬ್ ಡೆವಲಪರ್ / ಡಿಸೈನರ್ • ಡಿಜಿಟಲ್ ಕ್ರಿಯೇಟರ್ • ಐತಿಹಾಸಿಕ ದಾಖಲಾತಿ ಕೊಡುಗೆದಾರರು',
    credit: 'ಸಂಶೋಧನೆ, ದಾಖಲಾತಿ ಮತ್ತು ಸಂಕಲನ: Dr.G Sathyanarayana Raju',
    pageWord: 'ಪುಟ / Page',
    ofWord: 'of'
  },
  ta: {
    titles:
      'நிறுவனர் • வலை உருவாக்குநர் / வடிவமைப்பாளர் • டிஜிட்டல் படைப்பாளர் • வரலாற்று ஆவணப்படுத்தல் பங்களிப்பாளர்',
    credit: 'ஆராய்ச்சி, ஆவணப்படுத்தல் மற்றும் தொகுப்பு: Dr.G Sathyanarayana Raju',
    pageWord: 'பக்கம் / Page',
    ofWord: 'of'
  },
  mr: {
    titles:
      'संस्थापक • वेब डेव्हलपर / डिझायनर • डिजिटल क्रिएटर • ऐतिहासिक दस्तऐवजीकरण योगदानकर्ते',
    credit: 'संशोधन, दस्तऐवजीकरण आणि संकलन: Dr.G Sathyanarayana Raju',
    pageWord: 'पृष्ठ / Page',
    ofWord: 'of'
  },
  or: {
    titles:
      'ପ୍ରତିଷ୍ଠାତା • ୱେବ୍ ଡେଭଲପର୍ / ଡିଜାଇନର୍ • ଡିଜିଟାଲ୍ କ୍ରିଏଟର୍ • ଐତିହାସିକ ଦସ୍ତାବିଜୀକରଣ ଯୋଗଦାନକାରୀ',
    credit: 'ଗବେଷଣା, ଦସ୍ତାବିଜୀକରଣ ଓ ସଂକଳନ: Dr.G Sathyanarayana Raju',
    pageWord: 'ପୃଷ୍ଠା / Page',
    ofWord: 'of'
  },
  bn: {
    titles:
      'প্রতিষ্ঠাতা • ওয়েব ডেভেলপার / ডিজাইনার • ডিজিটাল ক্রিয়েটর • ঐতিহাসিক নথিপত্র সংকলন অবদানকারী',
    credit: 'গবেষণা, নথিবদ্ধকরণ ও সংকলন: Dr.G Sathyanarayana Raju',
    pageWord: 'পৃষ্ঠা / Page',
    ofWord: 'of'
  }
};

/**
 * Sanitizes any article title (including English, Kannada, Telugu, Hindi, Tamil, Marathi, Odia, Bengali)
 * into a safe, clean base filename with spaces/separators replaced by underscores.
 *
 * Example:
 *   "Kapilendra Deva Maharaja – Historical Biography"
 *   -> "Kapilendra_Deva_Maharaja_Historical_Biography"
 */
export function sanitizeArticleTitleToBaseFilename(rawTitle: string): string {
  if (!rawTitle || typeof rawTitle !== 'string') {
    return 'Suryavamsha_Historical_Article';
  }

  const normalized = rawTitle
    .normalize('NFC')
    .replace(/\.pdf$/i, '')
    // Replace filesystem-reserved characters and common punctuation/dashes with spaces
    .replace(/[<>:"/\\|?*\u0000-\u001F–—―•·,;!?()[\]{}'"`~@#$%^&+=]+/g, ' ')
    // Preserve Unicode letters (\p{L}), Indic vowel/combining marks (\p{M}), numbers (\p{N}), spaces, underscores, and hyphens
    .replace(/[^\p{L}\p{M}\p{N}\s_-]/gu, ' ')
    // Replace any whitespace or dash/underscore sequence with a single underscore
    .replace(/[\s_-]+/g, '_')
    .replace(/^_+|_+$/g, '');

  if (!normalized) {
    return 'Suryavamsha_Historical_Article';
  }

  // Ensure UTF-8 byte length stays safely within Android ext4/f2fs 255-byte limit (cap around 180 UTF-8 bytes)
  const encoder = new TextEncoder();
  if (encoder.encode(normalized).length <= 180) {
    return normalized;
  }

  const parts = normalized.split('_');
  let acc = '';
  for (const part of parts) {
    const candidate = acc ? `${acc}_${part}` : part;
    if (encoder.encode(candidate).length > 175) {
      break;
    }
    acc = candidate;
  }

  return acc || normalized.slice(0, 55).replace(/^_+|_+$/g, '');
}

/**
 * Generates the complete `.pdf` filename from the article's actual title.
 * Example:
 *   "Kapilendra Deva Maharaja – Historical Biography"
 *   -> "Kapilendra_Deva_Maharaja_Historical_Biography.pdf"
 */
export function generateArticlePdfFilename(rawTitle: string): string {
  const base = sanitizeArticleTitleToBaseFilename(rawTitle);
  return `${base}.pdf`;
}

/**
 * Temporarily sets `document.title` to the sanitized article title (without .pdf) before invoking `window.print()`,
 * so browser "Save as PDF" inside the native print dialog also uses the exact article title.
 */
export function triggerArticlePrintWithTitle(
  articleTitle: string,
  prePrintCallback?: () => void
): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const previousTitle = document.title;
  const cleanBaseName = sanitizeArticleTitleToBaseFilename(articleTitle);
  document.title = cleanBaseName;

  const restoreTitle = () => {
    document.title = previousTitle;
    window.removeEventListener('afterprint', restoreTitle);
  };
  window.addEventListener('afterprint', restoreTitle);

  try {
    if (prePrintCallback) prePrintCallback();
    (window as unknown as { __UPDATE_PRINT_PAGINATION__?: () => void }).__UPDATE_PRINT_PAGINATION__?.();
    window.print();
  } finally {
    window.setTimeout(restoreTitle, 3500);
  }
}

/**
 * Loads an image URL into an HTMLImageElement or converts it to a Data URL so canvas rendering never fails.
 */
async function loadImageAsDataUrl(src: string): Promise<string | null> {
  if (!src) return null;
  if (src.startsWith('data:')) return src;

  try {
    const response = await fetch(src, { mode: 'cors', credentials: 'same-origin' });
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function loadHtmlImage(src: string): Promise<HTMLImageElement | null> {
  const dataUrl = (await loadImageAsDataUrl(src)) || src;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

/**
 * Renders the repeating circular-photo Author Footer for page `pageNum` of `totalPages` onto a high-DPI canvas
 * and returns a PNG data URL to embed at the bottom of the PDF page.
 */
async function renderRepeatingAuthorFooterDataUrl(
  pageNum: number,
  totalPages: number,
  language: LanguageCode,
  authorPhotoImg: HTMLImageElement | null
): Promise<string> {
  // 186mm width × 15mm height at ~10px/mm = 1860px × 150px
  const width = 1860;
  const height = 150;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const labels = PDF_FOOTER_I18N[language] || PDF_FOOTER_I18N.en;

  // Crisp white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Royal heritage top border line (#b48222 gold + #580014 maroon accent)
  ctx.fillStyle = '#580014';
  ctx.fillRect(0, 0, width, 3);
  ctx.fillStyle = '#b48222';
  ctx.fillRect(0, 3, width, 3);

  // Circular Author Photo on the left (center at x = 62, y = 80, radius = 48px -> 96px diameter ≈ 30px at 72dpi)
  const cx = 60;
  const cy = 80;
  const radius = 46;

  if (authorPhotoImg) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Crop into a circle using object-fit: cover, top-aligned so the face is never altered or cut
    const imgW = authorPhotoImg.naturalWidth || authorPhotoImg.width || 100;
    const imgH = authorPhotoImg.naturalHeight || authorPhotoImg.height || 100;
    const scale = Math.max((radius * 2) / imgW, (radius * 2) / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = cx - drawW / 2;
    const drawY = cy - radius; // top-aligned for portrait
    ctx.drawImage(authorPhotoImg, drawX, drawY, drawW, drawH);
    ctx.restore();
  } else {
    ctx.fillStyle = '#580014';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Circular Gold Border ring
  ctx.strokeStyle = '#b48222';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Author Details beside the circular photo
  const textX = 124;
  const maxTextWidth = width - textX - 240;

  // Line 1: Name + All 4 Professional Titles
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 23px Georgia, "Noto Serif", serif';
  const nameText = 'Dr.G Sathyanarayana Raju';
  ctx.fillText(nameText, textX, 46);
  const nameWidth = ctx.measureText(nameText).width;

  ctx.fillStyle = '#580014';
  ctx.font = '600 18px system-ui, -apple-system, sans-serif';
  const roleLineEn =
    ' — Founder • Web Developer / Designer • Digital Creator • Historical Documentation Contributor';
  ctx.fillText(roleLineEn, textX + nameWidth, 46, maxTextWidth - nameWidth);

  // Line 2: Author Credit & Organization
  ctx.fillStyle = '#1f2937';
  ctx.font = '600 17px system-ui, -apple-system, sans-serif';
  const creditAndOrg =
    'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju • Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal';
  ctx.fillText(creditAndOrg, textX, 78, maxTextWidth);

  // Line 3: Localized 8-Language Titles & Credit (or Royal Portal Tagline in English)
  ctx.fillStyle = '#4b5563';
  ctx.font = '500 16px system-ui, -apple-system, "Noto Sans", sans-serif';
  const thirdLine =
    language !== 'en'
      ? `${labels.titles} • ${labels.credit}`
      : 'Verified Epigraphic, Archaeological & Historical Documentation Archive • +91 9480112897';
  ctx.fillText(thirdLine, textX, 110, maxTextWidth);

  // Right-aligned Page Number badge
  const pageLabel = `${labels.pageWord} ${pageNum} ${labels.ofWord} ${totalPages}`;
  ctx.font = 'bold 20px Georgia, serif';
  const badgePaddingX = 22;
  const textMetrics = ctx.measureText(pageLabel);
  const badgeW = Math.max(165, textMetrics.width + badgePaddingX * 2);
  const badgeH = 48;
  const badgeX = width - badgeW - 6;
  const badgeY = cy - badgeH / 2;

  ctx.fillStyle = '#faf6eb';
  ctx.strokeStyle = '#b48222';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#111827';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(pageLabel, badgeX + badgeW / 2, badgeY + badgeH / 2 + 1);

  return canvas.toDataURL('image/png');
}

/**
 * Prepares an off-screen, print-styled clone of the article DOM container so that
 * dark backgrounds become crisp white archival pages, hidden print headers appear,
 * interactive toolbars are removed, and all images are inlined as Data URLs.
 */
async function createArchivalPrintClone(sourceEl: HTMLElement): Promise<{
  wrapper: HTMLDivElement;
  clone: HTMLElement;
}> {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('aria-hidden', 'true');
  wrapper.style.position = 'fixed';
  wrapper.style.left = '-99999px';
  wrapper.style.top = '0';
  wrapper.style.width = '794px'; // Standard A4 width at 96 DPI
  wrapper.style.backgroundColor = '#ffffff';
  wrapper.style.color = '#111827';
  wrapper.style.zIndex = '-9999';
  wrapper.style.overflow = 'visible';

  const clone = sourceEl.cloneNode(true) as HTMLElement;

  // Remove interactive/non-print elements
  const removeSelectors = [
    '.no-print',
    '.print\\:hidden',
    'button:not(.keep-in-pdf)',
    'select',
    'input',
    '.print-repeating-author-footer'
  ];
  removeSelectors.forEach(sel => {
    clone.querySelectorAll(sel).forEach(el => el.remove());
  });

  // Make print-only mastheads visible
  clone.querySelectorAll('.print-only, .hidden.print\\:block').forEach(el => {
    const htmlEl = el as HTMLElement;
    htmlEl.classList.remove('hidden');
    htmlEl.style.display = 'block';
    htmlEl.style.color = '#111827';
    htmlEl.style.borderColor = '#374151';
  });

  // Inject high-contrast archival print styling inside the clone wrapper
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .pdf-archival-root,
    .pdf-archival-root * {
      box-sizing: border-box !important;
      max-height: none !important;
      overflow: visible !important;
      text-shadow: none !important;
      box-shadow: none !important;
      animation: none !important;
      transition: none !important;
    }
    .pdf-archival-root {
      width: 794px !important;
      padding: 20px 24px !important;
      background: #ffffff !important;
      color: #111827 !important;
      font-family: Georgia, "Noto Serif", system-ui, sans-serif !important;
    }
    .pdf-archival-root section,
    .pdf-archival-root header,
    .pdf-archival-root article,
    .pdf-archival-root div,
    .pdf-archival-root figure,
    .pdf-archival-root figcaption,
    .pdf-archival-root dl,
    .pdf-archival-root ul,
    .pdf-archival-root li {
      background-color: #ffffff !important;
      background-image: none !important;
      color: #111827 !important;
      border-color: #d1d5db !important;
    }
    .pdf-archival-root h1 {
      color: #111827 !important;
      font-size: 26px !important;
      line-height: 1.3 !important;
      font-weight: 800 !important;
      margin-bottom: 8px !important;
      -webkit-text-fill-color: #111827 !important;
    }
    .pdf-archival-root h2 {
      color: #580014 !important;
      font-size: 19px !important;
      line-height: 1.35 !important;
      font-weight: 700 !important;
      -webkit-text-fill-color: #580014 !important;
    }
    .pdf-archival-root h3,
    .pdf-archival-root h4 {
      color: #1f2937 !important;
      font-weight: 700 !important;
      -webkit-text-fill-color: #1f2937 !important;
    }
    .pdf-archival-root p,
    .pdf-archival-root span,
    .pdf-archival-root dd,
    .pdf-archival-root dt,
    .pdf-archival-root li,
    .pdf-archival-root blockquote {
      color: #1f2937 !important;
      -webkit-text-fill-color: #1f2937 !important;
    }
    .pdf-archival-root .line-clamp-1,
    .pdf-archival-root .line-clamp-2,
    .pdf-archival-root .line-clamp-3 {
      display: block !important;
      -webkit-line-clamp: unset !important;
    }
    .pdf-archival-root img {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      max-width: 100% !important;
    }
    .pdf-archival-root .print-lead-figure img,
    .pdf-archival-root .print-lead-image {
      width: 100% !important;
      max-height: 340px !important;
      height: auto !important;
      object-fit: contain !important;
      background-color: #f9fafb !important;
      margin: 0 auto !important;
    }
  `;

  clone.classList.add('pdf-archival-root');
  wrapper.appendChild(styleEl);
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // Inline all images inside the clone as Data URLs so nothing is missing or tainted
  const origImages = Array.from(sourceEl.querySelectorAll('img'));
  const cloneImages = Array.from(clone.querySelectorAll('img'));

  await Promise.all(
    cloneImages.map(async (imgEl, idx) => {
      const candidateSrc =
        imgEl.currentSrc ||
        imgEl.getAttribute('src') ||
        origImages[idx]?.currentSrc ||
        origImages[idx]?.src ||
        '';
      if (!candidateSrc) return;
      const dataUrl = await loadImageAsDataUrl(candidateSrc);
      if (dataUrl) {
        imgEl.src = dataUrl;
      }
      imgEl.loading = 'eager';
      imgEl.decoding = 'sync';
    })
  );

  return { wrapper, clone };
}

/**
 * Finds a clean horizontal whitespace row near `targetY` on `sourceCanvas` so page slices
 * do not cut through the middle of a line of text.
 */
function findCleanSliceY(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  startY: number,
  idealSliceHeight: number
): number {
  const targetY = startY + idealSliceHeight;
  if (targetY >= canvasHeight) {
    return canvasHeight;
  }

  // Search upwards up to 90px from targetY for a mostly-white horizontal row
  const searchRange = Math.min(90, Math.floor(idealSliceHeight * 0.15));
  const minSearchY = Math.max(startY + 120, targetY - searchRange);

  try {
    const bandHeight = targetY - minSearchY;
    if (bandHeight <= 2) return targetY;
    const imgData = ctx.getImageData(0, minSearchY, canvasWidth, bandHeight).data;

    let bestRowOffset = bandHeight - 1;
    let lowestInkScore = Number.POSITIVE_INFINITY;

    for (let row = bandHeight - 1; row >= 0; row--) {
      let rowInk = 0;
      const rowStart = row * canvasWidth * 4;
      // Sample every 4th pixel horizontally for speed
      for (let x = 0; x < canvasWidth; x += 4) {
        const idx = rowStart + x * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];
        // Distance from pure white (255,255,255)
        const darkness = (255 - r) + (255 - g) + (255 - b);
        if (darkness > 45) {
          rowInk += darkness;
        }
      }
      if (rowInk === 0) {
        return minSearchY + row;
      }
      if (rowInk < lowestInkScore) {
        lowestInkScore = rowInk;
        bestRowOffset = row;
      }
    }

    return minSearchY + bestRowOffset;
  } catch {
    return targetY;
  }
}

export interface DownloadArticlePdfOptions {
  articleTitle: string;
  language: LanguageCode;
  containerElement?: HTMLElement | null;
}

export interface DownloadArticlePdfResult {
  success: boolean;
  filename: string;
  downloadUrl?: string;
}

/**
 * Generates a real multi-page `.pdf` file containing the complete article:
 * - Article title and main image
 * - Full article content
 * - References and sources
 * - Author profile
 * - Circular author photo and compact author details at the bottom of EVERY PDF page
 * - Page numbers on EVERY PDF page
 * And triggers an actual file download on Desktop and Android devices using the article's title.
 */
export async function downloadArticleAsPdf(
  options: DownloadArticlePdfOptions
): Promise<DownloadArticlePdfResult> {
  const { articleTitle, language, containerElement } = options;
  const filename = generateArticlePdfFilename(articleTitle);

  const sourceEl =
    containerElement ||
    document.querySelector<HTMLElement>('.print-article-container') ||
    document.querySelector<HTMLElement>('article') ||
    document.querySelector<HTMLElement>('main');

  if (!sourceEl) {
    throw new Error('Article container not found for PDF generation.');
  }

  const baseUrl = (import.meta as unknown as { env?: { BASE_URL?: string } })?.env?.BASE_URL || '/';
  const authorPhotoUrl = `${baseUrl}assets/dr_g_sathyanarayana_raju.png`;
  const authorPhotoImg = await loadHtmlImage(authorPhotoUrl);

  const { wrapper, clone } = await createArchivalPrintClone(sourceEl);

  let fullCanvas: HTMLCanvasElement;
  try {
    // Allow layout and web fonts to settle
    await new Promise(resolve => window.setTimeout(resolve, 120));
    fullCanvas = await domToCanvas(clone, {
      scale: 1.75,
      backgroundColor: '#ffffff',
      width: 794
    });
  } finally {
    wrapper.remove();
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  pdf.setProperties({
    title: articleTitle,
    subject:
      'Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal',
    author: 'Dr.G Sathyanarayana Raju',
    creator:
      'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju'
  });

  // A4 dimensions in mm: 210mm × 297mm
  const marginX = 12; // 12mm left/right margin -> 186mm content width
  const marginTop = 10; // 10mm top margin
  const contentWidthMm = 210 - marginX * 2; // 186mm
  const usableContentHeightMm = 258; // Leaves 29mm at bottom for repeating circular-photo author footer
  const footerYmm = 272;
  const footerHeightMm = 15.5;

  const canvasWidth = fullCanvas.width;
  const canvasHeight = fullCanvas.height;
  const pxPerMm = canvasWidth / contentWidthMm;
  const idealSliceHeightPx = Math.floor(usableContentHeightMm * pxPerMm);

  const fullCtx = fullCanvas.getContext('2d');

  // Compute page slice ranges first so we know exact `totalPages`
  const slices: Array<{ startY: number; endY: number }> = [];
  let currentY = 0;
  while (currentY < canvasHeight - 8) {
    const nextY = fullCtx
      ? findCleanSliceY(fullCtx, canvasWidth, canvasHeight, currentY, idealSliceHeightPx)
      : Math.min(canvasHeight, currentY + idealSliceHeightPx);
    const safeNextY = nextY > currentY ? nextY : Math.min(canvasHeight, currentY + idealSliceHeightPx);
    slices.push({ startY: currentY, endY: safeNextY });
    currentY = safeNextY;
  }

  if (slices.length === 0) {
    slices.push({ startY: 0, endY: canvasHeight });
  }

  const totalPages = slices.length;

  for (let i = 0; i < totalPages; i++) {
    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    const { startY, endY } = slices[i];
    const sliceHeightPx = Math.max(1, endY - startY);
    const sliceHeightMm = sliceHeightPx / pxPerMm;

    // Create slice canvas for page i + 1
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvasWidth;
    pageCanvas.height = sliceHeightPx;
    const pageCtx = pageCanvas.getContext('2d');
    if (pageCtx) {
      pageCtx.fillStyle = '#ffffff';
      pageCtx.fillRect(0, 0, canvasWidth, sliceHeightPx);
      pageCtx.drawImage(
        fullCanvas,
        0,
        startY,
        canvasWidth,
        sliceHeightPx,
        0,
        0,
        canvasWidth,
        sliceHeightPx
      );
    }

    const sliceDataUrl = pageCanvas.toDataURL('image/jpeg', 0.92);
    pdf.addImage(
      sliceDataUrl,
      'JPEG',
      marginX,
      marginTop,
      contentWidthMm,
      sliceHeightMm,
      undefined,
      'FAST'
    );

    // Draw Repeating Circular-Photo Author Footer + Page Number at the bottom of EVERY page
    const footerDataUrl = await renderRepeatingAuthorFooterDataUrl(
      i + 1,
      totalPages,
      language,
      authorPhotoImg
    );
    if (footerDataUrl) {
      pdf.addImage(
        footerDataUrl,
        'PNG',
        marginX,
        footerYmm,
        contentWidthMm,
        footerHeightMm,
        undefined,
        'FAST'
      );
    }
  }

  // Trigger external download on Android & Desktop browsers
  const pdfBlob = pdf.output('blob');
  let serverDownloadUrl: string | undefined;

  try {
    const pdfDataUri = pdf.output('datauristring');
    const resp = await fetch('/api/export/prepare-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename,
        pdfBase64: pdfDataUri
      })
    });
    if (resp.ok) {
      const data = await resp.json();
      if (data && typeof data.downloadUrl === 'string') {
        serverDownloadUrl = data.downloadUrl;
      }
    }
  } catch {
    // Fallback to client-side Blob download if offline
  }

  if (serverDownloadUrl) {
    // Trigger native browser / Android Download Manager via Content-Disposition attachment URL
    const link = document.createElement('a');
    link.href = serverDownloadUrl;
    link.download = filename;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
  } else {
    const blobUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
  }

  return {
    success: true,
    filename,
    downloadUrl: serverDownloadUrl
  };
}
