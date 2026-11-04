import React from 'react';
import { Crown, Sparkles, ExternalLink, Phone, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../types';
import { handleWhatsAppLinkClick } from '../utils/androidBridge';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.03C8.94 7.03 8.66 7.1 8.42 7.35C8.19 7.61 7.52 8.23 7.52 9.5C7.52 10.77 8.45 11.99 8.57 12.16C8.71 12.33 10.4 14.94 12.97 16.05C13.59 16.31 14.07 16.47 14.44 16.59C15.06 16.78 15.62 16.76 16.07 16.69C16.57 16.62 17.6 16.07 17.82 15.45C18.04 14.84 18.04 14.31 17.97 14.2C17.9 14.09 17.73 14.02 17.47 13.9C17.22 13.77 15.98 13.16 15.75 13.08C15.52 13 15.36 12.95 15.2 13.2C15.03 13.45 14.56 14.02 14.41 14.18C14.27 14.35 14.12 14.37 13.87 14.25C13.62 14.12 12.82 13.86 11.87 13.01C11.13 12.35 10.63 11.53 10.48 11.28C10.34 11.03 10.47 10.9 10.6 10.77C10.71 10.66 10.85 10.48 10.98 10.33C11.1 10.18 11.15 10.07 11.23 9.91C11.31 9.74 11.27 9.6 11.21 9.48C11.15 9.35 10.65 8.13 10.45 7.63C10.25 7.15 10.05 7.21 9.9 7.21C9.75 7.2 9.58 7.2 9.41 7.2C9.25 7.2 8.98 7.26 8.75 7.51" />
  </svg>
);

export const CANONICAL_AUTHOR_NAME = 'Dr.G Sathyanarayana Raju';
export const CANONICAL_AUTHOR_CREDIT =
  'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju';
export const CANONICAL_ORGANIZATION =
  'Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal';
export const CANONICAL_PROFESSIONAL_TITLES: readonly string[] = [
  'Founder',
  'Web Developer / Designer',
  'Digital Creator',
  'Historical Documentation Contributor'
];

interface LocalizedAuthorProfile {
  localizedName?: string;
  titles: [string, string, string, string];
  authorCredit: string;
  organization: string;
  bio: string;
  contactWhatsApp: string;
}

const AUTHOR_PROFILE_I18N: Record<LanguageCode, LocalizedAuthorProfile> = {
  en: {
    titles: [
      'Founder',
      'Web Developer / Designer',
      'Digital Creator',
      'Historical Documentation Contributor'
    ],
    authorCredit: 'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju',
    organization:
      'Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal',
    bio: 'Leading the digital architecture, epigraphic preservation, historical research, and pan-Indian cultural documentation of the Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal.',
    contactWhatsApp: 'Contact on WhatsApp (+91 9480112897)'
  },
  hi: {
    localizedName: 'डॉ. जी. सत्यनारायण राजू',
    titles: [
      'संस्थापक (Founder)',
      'वेब डेवलपर / डिज़ाइनर (Web Developer / Designer)',
      'डिजिटल क्रिएटर (Digital Creator)',
      'ऐतिहासिक दस्तावेजीकरण योगदानकर्ता (Historical Documentation Contributor)'
    ],
    authorCredit:
      'शोध, दस्तावेजीकरण एवं संकलन: Dr.G Sathyanarayana Raju (Research, Documentation & Compilation by Dr.G Sathyanarayana Raju)',
    organization:
      'सूर्यवंश ओडियाराजु क्षत्रिय ऐतिहासिक डॉक्यूमेंट्री एवं रॉयल हेरिटेज पोर्टल (Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal)',
    bio: 'सूर्यवंश ओडियाराजु क्षत्रिय ऐतिहासिक डॉक्यूमेंट्री एवं रॉयल हेरिटेज पोर्टल के डिजिटल निर्माण, अभिलेखीय संरक्षण और अखिल भारतीय ऐतिहासिक अनुसंधान का नेतृत्व।',
    contactWhatsApp: 'व्हाट्सएप पर संपर्क करें (+91 9480112897)'
  },
  te: {
    localizedName: 'డా. జి. సత్యనారాయణ రాజు',
    titles: [
      'వ్యవస్థాపకులు (Founder)',
      'వెబ్ డెవలపర్ / డిజైనర్ (Web Developer / Designer)',
      'డిజిటల్ క్రియేటర్ (Digital Creator)',
      'చారిత్రక డాక్యుమెంటేషన్ సహకారకర్త (Historical Documentation Contributor)'
    ],
    authorCredit:
      'పరిశోధన, డాక్యుమెంటేషన్ & సంకలనం: Dr.G Sathyanarayana Raju (Research, Documentation & Compilation by Dr.G Sathyanarayana Raju)',
    organization:
      'సూర్యవంశ ఒడియరాజు క్షత్రియ హిస్టారికల్ డాక్యుమెంటరీ & రాయల్ హెరిటేజ్ పోర్టల్ (Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal)',
    bio: 'సూర్యవంశ ఒడియరాజు క్షత్రియ చారిత్రక డాక్యుమెంటరీ మరియు రాయల్ హెరిటేజ్ పోర్టల్ యొక్క డిజిటల్ రూపకల్పన, శాసన ఆధారాల పరిరక్షణ మరియు చారిత్రక పరిశోధనకు మార్గదర్శకత్వం.',
    contactWhatsApp: 'వాట్సాప్‌లో సంప్రదించండి (+91 9480112897)'
  },
  kn: {
    localizedName: 'ಡಾ. ಜಿ. ಸತ್ಯನಾರಾಯಣ ರಾಜು',
    titles: [
      'ಸ್ಥಾಪಕರು (Founder)',
      'ವೆಬ್ ಡೆವಲಪರ್ / ಡಿಸೈನರ್ (Web Developer / Designer)',
      'ಡಿಜಿಟಲ್ ಕ್ರಿಯೇಟರ್ (Digital Creator)',
      'ಐತಿಹಾಸಿಕ ದಾಖಲಾತಿ ಕೊಡುಗೆದಾರರು (Historical Documentation Contributor)'
    ],
    authorCredit:
      'ಸಂಶೋಧನೆ, ದಾಖಲಾತಿ ಮತ್ತು ಸಂಕಲನ: Dr.G Sathyanarayana Raju (Research, Documentation & Compilation by Dr.G Sathyanarayana Raju)',
    organization:
      'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ ಮತ್ತು ರಾಯಲ್ ಹೆರಿಟೇಜ್ ಪೋರ್ಟಲ್ (Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal)',
    bio: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ ಮತ್ತು ರಾಯಲ್ ಹೆರಿಟೇಜ್ ಪೋರ್ಟಲ್‌ನ ಡಿಜಿಟಲ್ ವಿನ್ಯಾಸ, ಶಾಸನ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಐತಿಹಾಸಿಕ ಸಂಶೋಧನೆಯ ನೇತೃತ್ವ.',
    contactWhatsApp: 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ (+91 9480112897)'
  },
  ta: {
    localizedName: 'டாக்டர் ஜி. சத்யநாராயண ராஜு',
    titles: [
      'நிறுவனர் (Founder)',
      'வலை உருவாக்குநர் / வடிவமைப்பாளர் (Web Developer / Designer)',
      'டிஜிட்டல் படைப்பாளர் (Digital Creator)',
      'வரலாற்று ஆவணப்படுத்தல் பங்களிப்பாளர் (Historical Documentation Contributor)'
    ],
    authorCredit:
      'ஆராய்ச்சி, ஆவணப்படுத்தல் மற்றும் தொகுப்பு: Dr.G Sathyanarayana Raju (Research, Documentation & Compilation by Dr.G Sathyanarayana Raju)',
    organization:
      'சூர்யவம்ச ஒடியராஜு சத்திரிய வரலாற்று ஆவணப்படம் மற்றும் அரச பாரம்பரிய வலைத்தளம் (Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal)',
    bio: 'சூர்யவம்ச ஒடியராஜு சத்திரிய வரலாற்று ஆவணப்படம் மற்றும் அரச பாரம்பரிய வலைத்தளத்தின் டிஜிட்டல் வடிவமைப்பு, கல்வெட்டு பாதுகாப்பு மற்றும் வரலாற்று ஆராய்ச்சியை வழிநடத்துதல்.',
    contactWhatsApp: 'வாட்ஸ்அப்பில் தொடர்பு கொள்ள (+91 9480112897)'
  },
  mr: {
    localizedName: 'डॉ. जी. सत्यनारायण राजू',
    titles: [
      'संस्थापक (Founder)',
      'वेब डेव्हलपर / डिझायनर (Web Developer / Designer)',
      'डिजिटल क्रिएटर (Digital Creator)',
      'ऐतिहासिक दस्तऐवजीकरण योगदानकर्ते (Historical Documentation Contributor)'
    ],
    authorCredit:
      'संशोधन, दस्तऐवजीकरण आणि संकलन: Dr.G Sathyanarayana Raju (Research, Documentation & Compilation by Dr.G Sathyanarayana Raju)',
    organization:
      'सूर्यवंश ओडियाराजु क्षत्रिय ऐतिहासिक डॉक्युमेंटरी आणि रॉयल हेरिटेज पोर्टल (Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal)',
    bio: 'सूर्यवंश ओडियाराजु क्षत्रिय ऐतिहासिक डॉक्युमेंटरी आणि रॉयल हेरिटेज पोर्टलच्या डिजिटल निर्मिती, शिलालेख जतन आणि ऐतिहासिक संशोधनाचे नेतृत्व.',
    contactWhatsApp: 'व्हॉट्सअॅपवर संपर्क साधा (+91 9480112897)'
  },
  or: {
    localizedName: 'ଡ. ଜି. ସତ୍ୟନାରାୟଣ ରାଜୁ',
    titles: [
      'ପ୍ରତିଷ୍ଠାତା (Founder)',
      'ୱେବ୍ ଡେଭଲପର୍ / ଡିଜାଇନର୍ (Web Developer / Designer)',
      'ଡିଜିଟାଲ୍ କ୍ରିଏଟର୍ (Digital Creator)',
      'ଐତିହାସିକ ଦସ୍ତାବିଜୀକରଣ ଯୋଗଦାନକାରୀ (Historical Documentation Contributor)'
    ],
    authorCredit:
      'ଗବେଷଣା, ଦସ୍ତାବିଜୀକରଣ ଓ ସଂକଳନ: Dr.G Sathyanarayana Raju (Research, Documentation & Compilation by Dr.G Sathyanarayana Raju)',
    organization:
      'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ ଓ ରୟାଲ୍ ହେରିଟେଜ୍ ପୋର୍ଟାଲ୍ (Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal)',
    bio: 'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ ଓ ରୟାଲ୍ ହେରିଟେଜ୍ ପୋର୍ଟାଲର ଡିଜିଟାଲ୍ ନିର୍ମାଣ, ଶିଳାଲେଖ ସଂରକ୍ଷଣ ଏବଂ ଐତିହାସିକ ଗବେଷଣାର ନେତୃତ୍ୱ।',
    contactWhatsApp: 'ହ୍ୱାଟ୍ସଆପ୍ ଯୋଗେ ଯୋଗାଯୋଗ କରନ୍ତୁ (+91 9480112897)'
  },
  bn: {
    localizedName: 'ড. জি. সত্যনারায়ণ রাজু',
    titles: [
      'প্রতিষ্ঠাতা (Founder)',
      'ওয়েব ডেভেলপার / ডিজাইনার (Web Developer / Designer)',
      'ডিজিটাল ক্রিয়েটর (Digital Creator)',
      'ঐতিহাসিক নথিপত্র সংকলন অবদানকারী (Historical Documentation Contributor)'
    ],
    authorCredit:
      'গবেষণা, নথিবদ্ধকরণ ও সংকলন: Dr.G Sathyanarayana Raju (Research, Documentation & Compilation by Dr.G Sathyanarayana Raju)',
    organization:
      'সূর্যবংশ ওড়িয়ারাজু ক্ষত্রিয় ঐতিহাসিক ডকুমেন্টারি ও রয়্যাল হেরিটেজ পোর্টাল (Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal)',
    bio: 'সূর্যবংশ ওড়িয়ারাজু ক্ষত্রিয় ঐতিহাসিক ডকুমেন্টারি ও রয়্যাল হেরিটেজ পোর্টালের ডিজিটাল নির্মাণ, শিলালিপি সংরক্ষণ এবং ঐতিহাসিক গবেষণার নেতৃত্ব।',
    contactWhatsApp: 'হোয়াটসঅ্যাপে যোগাযোগ করুন (+91 9480112897)'
  }
};

interface PublisherCreditCardProps {
  variant?: 'hero-top' | 'footer' | 'compact' | 'article-profile';
  className?: string;
}

export const PublisherCreditCard: React.FC<PublisherCreditCardProps> = ({
  variant = 'hero-top',
  className = ''
}) => {
  const { language, t } = useLanguage();
  const profile = AUTHOR_PROFILE_I18N[language] || AUTHOR_PROFILE_I18N.en;

  const whatsappGreeting =
    t.publisher?.whatsappGreeting ||
    'Namaste Dr.G Sathyanarayana Raju ji, regarding Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal';
  const whatsappUrl = `https://wa.me/919480112897?text=${encodeURIComponent(whatsappGreeting)}`;
  const imageSrc = `${(import.meta as any).env?.BASE_URL || '/'}assets/dr_g_sathyanarayana_raju.png`;

  const publisherName = CANONICAL_AUTHOR_NAME;
  const localizedName = language !== 'en' ? profile.localizedName : undefined;
  const professionalTitles = profile.titles;
  const designedByText = profile.authorCredit;
  const organizationName = profile.organization;
  const leaderBio = profile.bio;
  const contactWhatsApp = profile.contactWhatsApp;

  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--accent-gold)] text-xs print:bg-white print:text-black print:border-stone-400 ${className}`}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => handleWhatsAppLinkClick(e, whatsappUrl)}
          className="relative shrink-0 group cursor-pointer"
          title={`${contactWhatsApp} (+91 9480112897)`}
          aria-label={contactWhatsApp}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md ring-2 ring-[#762D35]/40">
            <img
              src={imageSrc}
              alt="Dr.G Sathyanarayana Raju"
              loading="eager"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
            />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#25D366] text-white border border-[#D4AF37] flex items-center justify-center shadow print:hidden">
            <WhatsAppIcon className="w-3 h-3 fill-current" />
          </span>
        </a>
        <div className="text-left leading-snug">
          <div className="text-[10px] text-[var(--link-color)] print:text-stone-700 uppercase font-bold tracking-wider">
            {designedByText}
          </div>
          <div className="font-bold text-[var(--heading-text)] print:text-black">
            {publisherName}
            {localizedName ? ` (${localizedName})` : ''}
          </div>
          <div className="text-[10.5px] text-[var(--primary-text)] print:text-stone-800 font-medium">
            {professionalTitles.join(' • ')}
          </div>
          <div className="royal-profile-title-box bg-[var(--profile-title-box-bg)] text-[var(--profile-title-box-text)] border border-[var(--profile-title-box-border)] text-[10px] font-semibold mt-1 break-words">
            {organizationName}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'article-profile') {
    return (
      <section
        aria-label="Author Profile — Dr.G Sathyanarayana Raju"
        className={`rounded-2xl bg-[var(--card-bg)] border-2 border-[var(--accent-gold)] p-4 sm:p-6 shadow-md print:bg-white print:text-black print:border-stone-400 print:shadow-none print:break-inside-avoid ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => handleWhatsAppLinkClick(e, whatsappUrl)}
            className="relative shrink-0 group cursor-pointer"
            title={contactWhatsApp}
            aria-label={contactWhatsApp}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md ring-2 ring-[#762D35]/40 print:border-stone-500 print:ring-0">
              <img
                src={imageSrc}
                alt="Dr.G Sathyanarayana Raju — Founder, Web Developer / Designer, Digital Creator, Historical Documentation Contributor"
                loading="eager"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#25D366] text-white border-2 border-[#D4AF37] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform print:hidden"
              title={contactWhatsApp}
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            </span>
          </a>

          <div className="flex-1 space-y-2 min-w-0 max-w-full">
            <div className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1 rounded-2xl bg-[var(--surface-bg)] border border-[var(--accent-gold)] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider leading-[1.4] text-[var(--heading-text)] max-w-full break-words print:bg-stone-100 print:text-black print:border-stone-400">
              <Sparkles className="w-3 h-3 text-[var(--accent-gold)] print:hidden shrink-0" />
              <span className="break-words">{designedByText}</span>
            </div>

            <div>
              <h3 className="font-royal-heading font-black text-lg sm:text-xl text-[var(--heading-text)] print:text-black leading-[1.35] break-words">
                {publisherName}
              </h3>
              {localizedName && (
                <p className="text-xs font-semibold text-[var(--link-color)] print:text-stone-800 mt-0.5 leading-[1.4]">
                  {localizedName}
                </p>
              )}
            </div>

            {/* All 4 Professional Titles */}
            <div
              className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5"
              aria-label="Professional Titles"
            >
              {professionalTitles.map((titleItem, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[var(--surface-bg)] border border-[var(--border-color)] text-[11px] sm:text-xs font-semibold leading-[1.4] text-[var(--primary-text)] max-w-full break-words text-left print:bg-stone-100 print:text-stone-900 print:border-stone-400"
                >
                  <Award className="w-3 h-3 text-[#762D35] print:hidden shrink-0" />
                  <span className="break-words">{titleItem}</span>
                </span>
              ))}
            </div>

            <div className="royal-profile-title-box bg-[var(--profile-title-box-bg)] text-[var(--profile-title-box-text)] border border-[var(--profile-title-box-border)] text-xs sm:text-sm font-semibold leading-[1.45] mt-1 break-words">
              {organizationName}
            </div>

            <p className="text-[11px] sm:text-xs text-[var(--primary-text)] print:text-stone-700 leading-relaxed break-words">
              {leaderBio}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 no-print print:hidden">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => handleWhatsAppLinkClick(e, whatsappUrl)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold leading-[1.4] bg-[#762D35] hover:bg-[#5e2229] text-white transition-all cursor-pointer max-w-full"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current shrink-0" />
                <span className="break-words">{contactWhatsApp}</span>
                <ExternalLink className="w-3 h-3 opacity-80 shrink-0" />
              </a>

              <a
                href="tel:+919480112897"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold leading-[1.4] bg-[var(--surface-bg)] hover:bg-[var(--secondary-button)] text-[var(--heading-text)] border border-[var(--accent-gold)] transition-all"
              >
                <Phone className="w-3 h-3 text-[#762D35] shrink-0" />
                <span>+91 9480112897</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={`w-full max-w-5xl mx-auto px-2 sm:px-4 ${className}`}>
      <div className="relative overflow-hidden rounded-3xl bg-[var(--card-bg)] border-2 border-[var(--accent-gold)] shadow-md transition-all p-4 sm:p-7 print:bg-white print:text-black print:border-stone-400 print:shadow-none">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 text-center sm:text-left">
          {/* Dr.G Sathyanarayana Raju Circular Gold-Bordered Portrait with Clickable WhatsApp Badge */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => handleWhatsAppLinkClick(e, whatsappUrl)}
            className="relative shrink-0 group cursor-pointer"
            title={contactWhatsApp}
            aria-label={contactWhatsApp}
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-[3px] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.45)] ring-2 ring-[#762D35]/40 print:border-stone-500 print:ring-0">
              <img
                src={imageSrc}
                alt={`${publisherName} — ${CANONICAL_PROFESSIONAL_TITLES.join(', ')}`}
                loading="eager"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Attached WhatsApp Icon Badge */}
            <span
              className="absolute bottom-0.5 right-0.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#25D366] text-white border-2 border-[#D4AF37] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform print:hidden"
              title={contactWhatsApp}
            >
              <WhatsAppIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" />
            </span>
          </a>

          {/* Publishing & Leadership Information */}
          <div className="flex-1 space-y-2.5 min-w-0 max-w-full">
            <div className="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-1 rounded-2xl bg-[var(--surface-bg)] border border-[var(--accent-gold)] text-[10.5px] sm:text-xs font-bold uppercase tracking-wider leading-[1.4] text-[var(--heading-text)] shadow-sm max-w-full break-words print:bg-stone-100 print:text-black print:border-stone-400">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)] print:hidden shrink-0" />
              <span className="break-words">{designedByText}</span>
            </div>

            <div>
              <h2 className="font-royal-heading font-black text-xl sm:text-4xl text-[var(--heading-text)] tracking-tight leading-[1.35] break-words print:text-black">
                {publisherName}
              </h2>
              {localizedName && (
                <p className="text-sm sm:text-base font-bold text-[var(--link-color)] leading-[1.4] print:text-stone-800 mt-0.5">
                  {localizedName}
                </p>
              )}
            </div>

            {/* All 4 Professional Titles */}
            <div
              className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 pt-0.5"
              aria-label="Professional Titles"
            >
              {professionalTitles.map((titleItem, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-[var(--surface-bg)] border border-[var(--accent-gold)] text-[11px] sm:text-sm font-semibold leading-[1.4] text-[var(--primary-text)] shadow-sm max-w-full break-words text-left print:bg-stone-100 print:text-stone-900 print:border-stone-400"
                >
                  <Award className="w-3.5 h-3.5 text-[#762D35] print:hidden shrink-0" />
                  <span className="break-words">{titleItem}</span>
                </span>
              ))}
            </div>

            <div className="royal-profile-title-box bg-[var(--profile-title-box-bg)] text-[var(--profile-title-box-text)] border border-[var(--profile-title-box-border)] text-xs sm:text-sm font-semibold leading-[1.45] mt-1 break-words">
              {organizationName}
            </div>

            <p className="text-xs text-[var(--primary-text)] max-w-2xl leading-relaxed break-words print:text-stone-700">
              {leaderBio}
            </p>

            {/* Direct WhatsApp Contact Button & Direct Mobile Call */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3 print:hidden">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => handleWhatsAppLinkClick(e, whatsappUrl)}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold leading-[1.4] bg-[#762D35] hover:bg-[#5e2229] text-white shadow-sm transition-all cursor-pointer group max-w-full"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                <span className="break-words">{contactWhatsApp}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="tel:+919480112897"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold leading-[1.4] bg-[var(--surface-bg)] hover:bg-[var(--secondary-button)] text-[var(--heading-text)] border border-[var(--accent-gold)] transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#762D35] shrink-0" />
                <span>+91 9480112897</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


