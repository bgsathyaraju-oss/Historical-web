import React from 'react';
import { Crown, Sparkles, ExternalLink, Phone, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../types';

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
  const imageSrc = `${import.meta.env.BASE_URL}assets/dr_g_sathyanarayana_raju.png`;

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
        className={`inline-flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#141824]/95 border border-[#c99738]/60 text-xs print:bg-white print:text-black print:border-stone-400 ${className}`}
      >
        <img
          src={imageSrc}
          alt="Dr.G Sathyanarayana Raju"
          loading="eager"
          className="w-11 h-11 rounded-full object-cover object-top border border-[#d4af37] shrink-0"
        />
        <div className="text-left leading-snug">
          <div className="text-[10px] text-[#d4af37] print:text-stone-700 uppercase font-bold tracking-wider">
            {designedByText}
          </div>
          <div className="font-bold text-[#fcedc7] print:text-black">
            {publisherName}
            {localizedName ? ` (${localizedName})` : ''}
          </div>
          <div className="text-[10.5px] text-stone-200 print:text-stone-800 font-medium">
            {professionalTitles.join(' • ')}
          </div>
          <div className="text-[10px] text-[#d4af37]/90 print:text-stone-700">
            {organizationName}
          </div>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 p-1.5 rounded-lg bg-[#25D366] text-black hover:bg-[#20ba5a] transition-all print:hidden shrink-0"
          title={`${contactWhatsApp} (+91 9480112897)`}
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  if (variant === 'article-profile') {
    return (
      <section
        aria-label="Author Profile — Dr.G Sathyanarayana Raju"
        className={`rounded-2xl bg-gradient-to-r from-[#21020b] via-[#121626] to-[#21020b] border border-[#d4af37]/75 p-4 sm:p-6 shadow-lg print:bg-white print:text-black print:border-stone-400 print:shadow-none print:break-inside-avoid ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#fae29c] shadow-md ring-2 ring-[#580014]/80 print:border-stone-500 print:ring-0">
              <img
                src={imageSrc}
                alt="Dr.G Sathyanarayana Raju — Founder, Web Developer / Designer, Digital Creator, Historical Documentation Contributor"
                loading="eager"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div
              className="absolute -bottom-1.5 -right-1.5 bg-[#580014] text-[#fcedc7] p-1.5 rounded-lg border border-[#d4af37] shadow print:hidden"
              title="Dr.G Sathyanarayana Raju — Author & Founder"
            >
              <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            </div>
          </div>

          <div className="flex-1 space-y-2 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#580014]/90 border border-[#d4af37]/60 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#fae29c] print:bg-stone-100 print:text-black print:border-stone-400">
              <Sparkles className="w-3 h-3 text-[#d4af37] print:hidden shrink-0" />
              <span>{designedByText}</span>
            </div>

            <div>
              <h3 className="font-royal-heading font-black text-lg sm:text-xl text-[#fcedc7] print:text-black leading-tight">
                {publisherName}
              </h3>
              {localizedName && (
                <p className="text-xs font-semibold text-[#fae29c]/90 print:text-stone-800 mt-0.5">
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
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#1a2236]/95 border border-[#d4af37]/50 text-[11px] sm:text-xs font-semibold text-[#f5ecd5] print:bg-stone-100 print:text-stone-900 print:border-stone-400"
                >
                  <Award className="w-3 h-3 text-[#d4af37] print:hidden shrink-0" />
                  <span>{titleItem}</span>
                </span>
              ))}
            </div>

            <p className="text-xs sm:text-sm font-bold text-[#d4af37] print:text-stone-900 pt-0.5">
              {organizationName}
            </p>

            <p className="text-[11px] sm:text-xs text-stone-300 print:text-stone-700 leading-relaxed">
              {leaderBio}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 no-print print:hidden">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba5a] text-[#052e16] transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                <span>{contactWhatsApp}</span>
                <ExternalLink className="w-3 h-3 opacity-75" />
              </a>

              <a
                href="tel:+919480112897"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#182032] hover:bg-[#212c44] text-stone-200 border border-stone-700/80 hover:border-[#c99738] transition-all"
              >
                <Phone className="w-3 h-3 text-[#d4af37]" />
                <span>+91 9480112897</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#21020b] via-[#121626] to-[#21020b] border-2 border-[#d4af37]/80 shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:shadow-[0_0_45px_rgba(212,175,55,0.35)] transition-all p-5 sm:p-7 print:bg-white print:text-black print:border-stone-400 print:shadow-none">
        {/* Subtle decorative radial glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 print:hidden"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#580014]/25 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20 print:hidden"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
          {/* Dr.G Sathyanarayana Raju Portrait */}
          <div className="relative shrink-0 group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-[#fae29c] shadow-[0_10px_30px_rgba(0,0,0,0.8)] ring-4 ring-[#580014]/90 print:border-stone-500 print:ring-0">
              <img
                src={imageSrc}
                alt={`${publisherName} — ${CANONICAL_PROFESSIONAL_TITLES.join(', ')}`}
                loading="eager"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Crown Embellishment Badge */}
            <div
              className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-[#580014] to-[#80001c] text-[#fcedc7] p-2 rounded-xl border border-[#d4af37] shadow-xl print:hidden"
              title="Founder • Web Developer / Designer • Digital Creator • Historical Documentation Contributor"
            >
              <Crown className="w-4 h-4 text-[#d4af37]" />
            </div>
          </div>

          {/* Publishing & Leadership Information */}
          <div className="flex-1 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#580014]/80 border border-[#d4af37]/60 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#fae29c] shadow-sm print:bg-stone-100 print:text-black print:border-stone-400">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] print:hidden shrink-0" />
              <span>{designedByText}</span>
            </div>

            <div>
              <h2 className="font-royal-heading font-black text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#fff7e6] via-[#fae29c] to-[#d4af37] tracking-tight leading-tight print:text-black">
                {publisherName}
              </h2>
              {localizedName && (
                <p className="text-sm sm:text-base font-bold text-[#fae29c]/90 print:text-stone-800 mt-0.5">
                  {localizedName}
                </p>
              )}
            </div>

            {/* All 4 Professional Titles */}
            <div
              className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5"
              aria-label="Professional Titles"
            >
              {professionalTitles.map((titleItem, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#161d2f]/95 border border-[#d4af37]/55 text-xs sm:text-sm font-semibold text-[#f5ecd5] shadow-sm print:bg-stone-100 print:text-stone-900 print:border-stone-400"
                >
                  <Award className="w-3.5 h-3.5 text-[#d4af37] print:hidden shrink-0" />
                  <span>{titleItem}</span>
                </span>
              ))}
            </div>

            <p className="text-xs sm:text-sm font-bold text-[#d4af37] print:text-stone-900 pt-0.5">
              {organizationName}
            </p>

            <p className="text-xs text-stone-300 max-w-2xl leading-relaxed print:text-stone-700">
              {leaderBio}
            </p>

            {/* Direct WhatsApp Contact Button & Direct Mobile Call */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 print:hidden">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20ba5a] text-[#052e16] hover:text-black shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_4px_25px_rgba(37,211,102,0.5)] transition-all cursor-pointer group"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>{contactWhatsApp}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="tel:+919480112897"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#182032] hover:bg-[#212c44] text-stone-200 border border-stone-700/80 hover:border-[#c99738] transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>+91 9480112897</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


