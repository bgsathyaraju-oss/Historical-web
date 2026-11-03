import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../types';

interface LocalizedFooterLabels {
  titlesLocalized: string;
  creditLocalized: string;
}

const FOOTER_I18N: Record<LanguageCode, LocalizedFooterLabels> = {
  en: {
    titlesLocalized:
      'Founder • Web Developer / Designer • Digital Creator • Historical Documentation Contributor',
    creditLocalized: 'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju'
  },
  hi: {
    titlesLocalized:
      'संस्थापक • वेब डेवलपर / डिज़ाइनर • डिजिटल क्रिएटर • ऐतिहासिक दस्तावेजीकरण योगदानकर्ता',
    creditLocalized: 'शोध, दस्तावेजीकरण एवं संकलन: Dr.G Sathyanarayana Raju'
  },
  te: {
    titlesLocalized:
      'వ్యవస్థాపకులు • వెబ్ డెవలపర్ / డిజైనర్ • డిజిటల్ క్రియేటర్ • చారిత్రక డాక్యుమెంటేషన్ సహకారకర్త',
    creditLocalized: 'పరిశోధన, డాక్యుమెంటేషన్ & సంకలనం: Dr.G Sathyanarayana Raju'
  },
  kn: {
    titlesLocalized:
      'ಸ್ಥಾಪಕರು • ವೆಬ್ ಡೆವಲಪರ್ / ಡಿಸೈನರ್ • ಡಿಜಿಟಲ್ ಕ್ರಿಯೇಟರ್ • ಐತಿಹಾಸಿಕ ದಾಖಲಾತಿ ಕೊಡುಗೆದಾರರು',
    creditLocalized: 'ಸಂಶೋಧನೆ, ದಾಖಲಾತಿ ಮತ್ತು ಸಂಕಲನ: Dr.G Sathyanarayana Raju'
  },
  ta: {
    titlesLocalized:
      'நிறுவனர் • வலை உருவாக்குநர் / வடிவமைப்பாளர் • டிஜிட்டல் படைப்பாளர் • வரலாற்று ஆவணப்படுத்தல் பங்களிப்பாளர்',
    creditLocalized: 'ஆராய்ச்சி, ஆவணப்படுத்தல் மற்றும் தொகுப்பு: Dr.G Sathyanarayana Raju'
  },
  mr: {
    titlesLocalized:
      'संस्थापक • वेब डेव्हलपर / डिझायनर • डिजिटल क्रिएटर • ऐतिहासिक दस्तऐवजीकरण योगदानकर्ते',
    creditLocalized: 'संशोधन, दस्तऐवजीकरण आणि संकलन: Dr.G Sathyanarayana Raju'
  },
  or: {
    titlesLocalized:
      'ପ୍ରତିଷ୍ଠାତା • ୱେବ୍ ଡେଭଲପର୍ / ଡିଜାଇନର୍ • ଡିଜିଟାଲ୍ କ୍ରିଏଟର୍ • ଐତିହାସିକ ଦସ୍ତାବିଜୀକରଣ ଯୋଗଦାନକାରୀ',
    creditLocalized: 'ଗବେଷଣା, ଦସ୍ତାବିଜୀକରଣ ଓ ସଂକଳନ: Dr.G Sathyanarayana Raju'
  },
  bn: {
    titlesLocalized:
      'প্রতিষ্ঠাতা • ওয়েব ডেভেলপার / ডিজাইনার • ডিজিটাল ক্রিয়েটর • ঐতিহাসিক নথিপত্র সংকলন অবদানকারী',
    creditLocalized: 'গবেষণা, নথিবদ্ধকরণ ও সংকলন: Dr.G Sathyanarayana Raju'
  }
};

/**
 * Shared repeating print/PDF page footer rendered at the bottom of EVERY printed/exported PDF page.
 * Features the 30px circular profile photo of Dr.G Sathyanarayana Raju, all 4 professional titles,
 * author credit, organization, royal heritage styling, and 8-language support.
 */
export const PrintRepeatingAuthorFooter: React.FC = () => {
  const { language } = useLanguage();
  const labels = FOOTER_I18N[language] || FOOTER_I18N.en;
  const profileImgSrc = `${import.meta.env.BASE_URL}assets/dr_g_sathyanarayana_raju.png`;

  return (
    <div
      className="print-repeating-author-footer print-only"
      role="contentinfo"
      aria-label="Repeating PDF Page Author Footer — Dr.G Sathyanarayana Raju"
    >
      <div className="print-repeating-author-footer-inner">
        {/* 30px Circular Profile Photo of Dr.G Sathyanarayana Raju + Compact Author Details */}
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
      </div>
    </div>
  );
};


