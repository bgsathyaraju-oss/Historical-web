import React, { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../types';

interface LocalizedFooterLabels {
  titlesLocalized: string;
  creditLocalized: string;
  pageWord: string;
  ofWord: string;
}

const FOOTER_I18N: Record<LanguageCode, LocalizedFooterLabels> = {
  en: {
    titlesLocalized:
      'Founder • Web Developer / Designer • Digital Creator • Historical Documentation Contributor',
    creditLocalized: 'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju',
    pageWord: 'Page',
    ofWord: 'of'
  },
  hi: {
    titlesLocalized:
      'संस्थापक • वेब डेवलपर / डिज़ाइनर • डिजिटल क्रिएटर • ऐतिहासिक दस्तावेजीकरण योगदानकर्ता',
    creditLocalized: 'शोध, दस्तावेजीकरण एवं संकलन: Dr.G Sathyanarayana Raju',
    pageWord: 'पृष्ठ / Page',
    ofWord: 'of'
  },
  te: {
    titlesLocalized:
      'వ్యవస్థాపకులు • వెబ్ డెవలపర్ / డిజైనర్ • డిజిటల్ క్రియేటర్ • చారిత్రక డాక్యుమెంటేషన్ సహకారకర్త',
    creditLocalized: 'పరిశోధన, డాక్యుమెంటేషన్ & సంకలనం: Dr.G Sathyanarayana Raju',
    pageWord: 'పేజీ / Page',
    ofWord: 'of'
  },
  kn: {
    titlesLocalized:
      'ಸ್ಥಾಪಕರು • ವೆಬ್ ಡೆವಲಪರ್ / ಡಿಸೈನರ್ • ಡಿಜಿಟಲ್ ಕ್ರಿಯೇಟರ್ • ಐತಿಹಾಸಿಕ ದಾಖಲಾತಿ ಕೊಡುಗೆದಾರರು',
    creditLocalized: 'ಸಂಶೋಧನೆ, ದಾಖಲಾತಿ ಮತ್ತು ಸಂಕಲನ: Dr.G Sathyanarayana Raju',
    pageWord: 'ಪುಟ / Page',
    ofWord: 'of'
  },
  ta: {
    titlesLocalized:
      'நிறுவனர் • வலை உருவாக்குநர் / வடிவமைப்பாளர் • டிஜிட்டல் படைப்பாளர் • வரலாற்று ஆவணப்படுத்தல் பங்களிப்பாளர்',
    creditLocalized: 'ஆராய்ச்சி, ஆவணப்படுத்தல் மற்றும் தொகுப்பு: Dr.G Sathyanarayana Raju',
    pageWord: 'பக்கம் / Page',
    ofWord: 'of'
  },
  mr: {
    titlesLocalized:
      'संस्थापक • वेब डेव्हलपर / डिझायनर • डिजिटल क्रिएटर • ऐतिहासिक दस्तऐवजीकरण योगदानकर्ते',
    creditLocalized: 'संशोधन, दस्तऐवजीकरण आणि संकलन: Dr.G Sathyanarayana Raju',
    pageWord: 'पृष्ठ / Page',
    ofWord: 'of'
  },
  or: {
    titlesLocalized:
      'ପ୍ରତିଷ୍ଠାତା • ୱେବ୍ ଡେଭଲପର୍ / ଡିଜାଇନର୍ • ଡିଜିଟାଲ୍ କ୍ରିଏଟର୍ • ଐତିହାସିକ ଦସ୍ତାବିଜୀକରଣ ଯୋଗଦାନକାରୀ',
    creditLocalized: 'ଗବେଷଣା, ଦସ୍ତାବିଜୀକରଣ ଓ ସଂକଳନ: Dr.G Sathyanarayana Raju',
    pageWord: 'ପୃଷ୍ଠା / Page',
    ofWord: 'of'
  },
  bn: {
    titlesLocalized:
      'প্রতিষ্ঠাতা • ওয়েব ডেভেলপার / ডিজাইনার • ডিজিটাল ক্রিয়েটর • ঐতিহাসিক নথিপত্র সংকলন অবদানকারী',
    creditLocalized: 'গবেষণা, নথিবদ্ধকরণ ও সংকলন: Dr.G Sathyanarayana Raju',
    pageWord: 'পৃষ্ঠা / Page',
    ofWord: 'of'
  }
};

/**
 * Shared repeating print/PDF page footer rendered at the bottom of EVERY printed/exported PDF page.
 * Features the 30px circular profile photo of Dr.G Sathyanarayana Raju, all 4 professional titles,
 * author credit, organization, royal heritage styling, 8-language support, and page numbering.
 */
export const PrintRepeatingAuthorFooter: React.FC = () => {
  const { language } = useLanguage();
  const [totalPages, setTotalPages] = useState<number>(1);
  const labels = FOOTER_I18N[language] || FOOTER_I18N.en;
  const profileImgSrc = `${import.meta.env.BASE_URL}assets/dr_g_sathyanarayana_raju.png`;

  const recalculatePrintPages = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    try {
      const articleEl =
        document.querySelector<HTMLElement>('.print-article-container') ||
        document.querySelector<HTMLElement>('main') ||
        document.body;
      if (!articleEl) return;

      // Usable A4 portrait content height per page (297mm - top/bottom @page margins - footer spacer ≈ 242mm ≈ 915px at 96dpi)
      const A4_USABLE_PAGE_HEIGHT_PX = 910;
      const rect = articleEl.getBoundingClientRect();
      const rawHeight = Math.max(articleEl.scrollHeight, rect.height, 1);
      const computedPages = Math.max(1, Math.ceil(rawHeight / A4_USABLE_PAGE_HEIGHT_PX));
      setTotalPages(computedPages);
      document.documentElement.style.setProperty('--print-total-pages', `"${computedPages}"`);
    } catch {
      // Ignore layout measurement errors in restricted WebViews
    }
  }, []);

  useEffect(() => {
    recalculatePrintPages();
    if (typeof window === 'undefined') return;

    (window as unknown as { __UPDATE_PRINT_PAGINATION__?: () => void }).__UPDATE_PRINT_PAGINATION__ =
      recalculatePrintPages;

    const handleBeforePrint = () => {
      recalculatePrintPages();
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('resize', recalculatePrintPages);
    window.addEventListener('popstate', recalculatePrintPages);

    let debounceTimer: number | null = null;
    const mainEl = document.querySelector('main') || document.body;
    let observer: MutationObserver | null = null;
    if (typeof MutationObserver !== 'undefined' && mainEl) {
      observer = new MutationObserver(() => {
        if (debounceTimer !== null) window.clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(recalculatePrintPages, 200);
      });
      observer.observe(mainEl, { childList: true, subtree: true });
    }

    const timer = window.setTimeout(recalculatePrintPages, 350);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('resize', recalculatePrintPages);
      window.removeEventListener('popstate', recalculatePrintPages);
      if (observer) observer.disconnect();
      if (debounceTimer !== null) window.clearTimeout(debounceTimer);
      window.clearTimeout(timer);
    };
  }, [recalculatePrintPages, language]);

  return (
    <div
      className="print-repeating-author-footer print-only"
      role="contentinfo"
      aria-label="Repeating PDF Page Author Footer — Dr.G Sathyanarayana Raju"
    >
      <div className="print-repeating-author-footer-inner">
        {/* Left: 30px Circular Profile Photo of Dr.G Sathyanarayana Raju + Compact Author Details */}
        <div className="print-author-footer-left">
          <div className="print-author-avatar-frame">
            <img
              src={profileImgSrc}
              alt="Dr.G Sathyanarayana Raju"
              loading="eager"
              decoding="sync"
              className="print-author-avatar"
            />
          </div>

          <div className="print-author-details-block">
            <div className="print-author-line-primary">
              <span className="print-author-name">Dr.G Sathyanarayana Raju</span>
              <span className="print-author-sep">—</span>
              <span className="print-author-role">
                Founder • Web Developer / Designer • Digital Creator • Historical Documentation Contributor
                {language !== 'en' ? ` (${labels.titlesLocalized})` : ''}
              </span>
            </div>

            <div className="print-author-line-secondary">
              <span className="print-author-credit">
                Research, Documentation &amp; Compilation by Dr.G Sathyanarayana Raju
                {language !== 'en' ? ` (${labels.creditLocalized})` : ''}
              </span>
              <span className="print-author-sep">•</span>
              <span className="print-author-org">
                Suryavamsha Odiyaraju Kshatriya Historical Documentary &amp; Royal Heritage Portal
              </span>
            </div>
          </div>
        </div>

        {/* Right: Consistent Page Numbering (e.g., Page 1 of 10) */}
        <div className="print-author-footer-right">
          <span
            className="print-footer-page-counter"
            data-page-word={labels.pageWord}
            data-of-word={labels.ofWord}
            data-total-pages={String(totalPages)}
          />
        </div>
      </div>
    </div>
  );
};

