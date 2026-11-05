import React from 'react';
import { ShieldCheck, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WhatsAppIcon } from './PublisherCreditCard';
import { RoyalSunCrest } from './Navbar';
import { handleWhatsAppLinkClick } from '../utils/androidBridge';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const FOOTER_EXTRA_UI: Record<
  string,
  {
    brandDesc: string;
    supportedLangsLabel: string;
    colDocumentary: string;
    colEpigraphy: string;
    colCommunityLegal: string;
    documents: string;
    privacy: string;
    terms: string;
    copyright: string;
    disclaimer: string;
    historicalSources: string;
    accessibility: string;
    rights: string;
    designSystem: string;
    exportZip: string;
    fullBadge: string;
  }
> = {
  en: {
    brandDesc:
      'Dedicated to empirical epigraphic research, historical geography of Odra Desha, Suryavamsha Gajapathi dynasty inscriptions, royal genealogies, and preserving living cultural traditions across eight supported languages.',
    supportedLangsLabel: 'Supported Languages:',
    colDocumentary: 'Historical Documentary',
    colEpigraphy: 'Epigraphy & Sources',
    colCommunityLegal: 'Community & Legal',
    documents: 'Historical Documents & Charters',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    copyright: 'Copyright',
    disclaimer: 'Disclaimer',
    historicalSources: 'Historical Sources',
    accessibility: 'Accessibility Statement',
    rights: 'All historical records & translations reserved.',
    designSystem: 'Royal UI Component System',
    exportZip: 'Export Project (ZIP)',
    fullBadge: 'Full'
  },
  hi: {
    brandDesc:
      'अनुभवजन्य शिलालेखीय अनुसंधान, ओड्र देश के ऐतिहासिक भूगोल, सूर्यवंश गजपति राजवंश के शिलालेखों, शाही वंशावलियों और आठ भाषाओं में जीवंत सांस्कृतिक परंपराओं के संरक्षण के लिए समर्पित।',
    supportedLangsLabel: 'उपलब्ध भाषाएँ:',
    colDocumentary: 'ऐतिहासिक डॉक्यूमेंट्री',
    colEpigraphy: 'शिलालेख एवं स्रोत',
    colCommunityLegal: 'समुदाय एवं विधिक नीतियाँ',
    documents: 'ऐतिहासिक दस्तावेज एवं ताम्रपत्र',
    privacy: 'गोपनीयता नीति',
    terms: 'उपयोग की शर्तें',
    copyright: 'कॉपीराइट',
    disclaimer: 'अस्वीकरण (Disclaimer)',
    historicalSources: 'ऐतिहासिक स्रोत',
    accessibility: 'सुलभता विवरण',
    rights: 'सभी ऐतिहासिक अभिलेख एवं अनुवाद सुरक्षित।',
    designSystem: 'राजकीय UI डिज़ाइन प्रणाली',
    exportZip: 'प्रोजेक्ट निर्यात (ZIP)',
    fullBadge: 'संपूर्ण'
  },
  te: {
    brandDesc:
      'శాసన పరిశోధన, ఓడ్ర దేశ చారిత్రక భూగోళం, సూర్యవంశ గజపతి సామ్రాజ్య శాసనాలు, రాజ వంశావళులు మరియు 8 భాషలలో సజీవ సాంస్కృతిక సంప్రదాయాల పరిరక్షణకు అంకితం చేయబడింది.',
    supportedLangsLabel: 'అందుబాటులో ఉన్న భాషలు:',
    colDocumentary: 'చారిత్రక డాక్యుమెంటరీ',
    colEpigraphy: 'శాసనాలు & ఆధారాలు',
    colCommunityLegal: 'సమాజం & చట్టపరమైన సమాచారం',
    documents: 'చారిత్రక పత్రాలు & తాళపత్రాలు',
    privacy: 'గోప్యతా విధానం',
    terms: 'వినియోగ నిబంధనలు',
    copyright: 'కాపీరైట్',
    disclaimer: 'నిరాకరణ ప్రకటన (Disclaimer)',
    historicalSources: 'చారిత్రక ఆధారాలు',
    accessibility: 'యాక్సెసిబిలిటీ ప్రకటన',
    rights: 'అన్ని చారిత్రక రికార్డులు & అనువాద హక్కులు ప్రత్యేకించబడినవి.',
    designSystem: 'రాయల్ UI డిజైన్ సిస్టమ్',
    exportZip: 'ప్రాజెక్ట్ ఎగుమతి (ZIP)',
    fullBadge: 'పూర్తి'
  },
  kn: {
    brandDesc:
      'ಶಾಸನ ಸಂಶೋಧನೆ, ಓಡ್ರ ದೇಶದ ಐತಿಹಾಸಿಕ ಭೂಗೋಳ, ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ಶಾಸನಗಳು, ರಾಜ ವಂಶಾವಳಿಗಳು ಮತ್ತು 8 ಭಾಷೆಗಳಲ್ಲಿ ಜೀವಂತ ಸಾಂಸ್ಕೃತಿಕ ಸಂಪ್ರದಾಯಗಳ ಸಂರಕ್ಷಣೆಗೆ ಸಮರ್ಪಿತವಾಗಿದೆ.',
    supportedLangsLabel: 'ಬೆಂಬಲಿತ ಭಾಷೆಗಳು:',
    colDocumentary: 'ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ',
    colEpigraphy: 'ಶಾಸನಗಳು ಮತ್ತು ಆಕರಗಳು',
    colCommunityLegal: 'ಸಮುದಾಯ ಮತ್ತು ಕಾನೂನು',
    documents: 'ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ತಾಮ್ರಪತ್ರಗಳು',
    privacy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
    terms: 'ಬಳಕೆಯ ನಿಯಮಗಳು',
    copyright: 'ಹಕ್ಕುಸ್ವಾಮ್ಯ',
    disclaimer: 'ಹಕ್ಕು ನಿರಾಕರಣೆ (Disclaimer)',
    historicalSources: 'ಐತಿಹಾಸಿಕ ಆಕರಗಳು',
    accessibility: 'ಪ್ರವೇಶಸಾಧ್ಯತೆಯ ಹೇಳಿಕೆ',
    rights: 'ಎಲ್ಲಾ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ಅನುವಾದಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    designSystem: 'ರಾಯಲ್ UI ವಿನ್ಯಾಸ ವ್ಯವಸ್ಥೆ',
    exportZip: 'ಪ್ರಾಜೆಕ್ಟ್ ರಫ್ತು (ZIP)',
    fullBadge: 'ಪೂರ್ಣ'
  },
  ta: {
    brandDesc:
      'கல்வெட்டு ஆராய்ச்சி, ஒட்ர தேசத்தின் வரலாற்றுப் புவியியல், சூர்யவம்ச கஜபதி பேரரசின் கல்வெட்டுகள், அரச வம்சாவளிகள் மற்றும் 8 மொழிகளில் வாழும் கலாச்சார மரபுகளைப் பாதுகாப்பதற்காக அர்ப்பணிக்கப்பட்டது.',
    supportedLangsLabel: 'ஆதரிக்கப்படும் மொழிகள்:',
    colDocumentary: 'வரலாற்று ஆவணப்படம்',
    colEpigraphy: 'கல்வெட்டுகள் & ஆதாரங்கள்',
    colCommunityLegal: 'சமூகம் & சட்ட விதிகள்',
    documents: 'வரலாற்று ஆவணங்கள் & பட்டயங்கள்',
    privacy: 'தனியுரிமைக் கொள்கை',
    terms: 'பயன்பாட்டு விதிமுறைகள்',
    copyright: 'பதிப்புரிமை',
    disclaimer: 'பொறுப்புத் துறப்பு (Disclaimer)',
    historicalSources: 'வரலாற்று ஆதாரங்கள்',
    accessibility: 'அணுகல்தன்மை அறிக்கை',
    rights: 'அனைத்து வரலாற்று ஆவணங்களும் மொழிபெயர்ப்புகளும் பாதுகாக்கப்பட்டவை.',
    designSystem: 'அரச UI வடிவமைப்பு அமைப்பு',
    exportZip: 'திட்ட ஏற்றுமதி (ZIP)',
    fullBadge: 'முழு'
  },
  mr: {
    brandDesc:
      'शिलालेख संशोधन, ओड्र देशाचा ऐतिहासिक भूगोल, सूर्यवंश गजपती राजवंशाचे शिलालेख, राजवंशावळी आणि आठ भाषांमध्ये जिवंत सांस्कृतिक परंपरांच्या जतनासाठी समर्पित.',
    supportedLangsLabel: 'उपलब्ध भाषा:',
    colDocumentary: 'ऐतिहासिक माहितीपट',
    colEpigraphy: 'शिलालेख आणि स्रोत',
    colCommunityLegal: 'समुदाय आणि कायदेशीर माहिती',
    documents: 'ऐतिहासिक दस्तऐवज आणि ताम्रपट',
    privacy: 'गोपनीयता धोरण',
    terms: 'वापराच्या अटी',
    copyright: 'कॉपीराइट',
    disclaimer: 'अस्वीकरण (Disclaimer)',
    historicalSources: 'ऐतिहासिक स्रोत',
    accessibility: 'सुलभता विधान',
    rights: 'सर्व ऐतिहासिक नोंदी आणि भाषांतरे राखीव.',
    designSystem: 'शाही UI डिझाइन प्रणाली',
    exportZip: 'प्रोजेक्ट निर्यात (ZIP)',
    fullBadge: 'पूर्ण'
  },
  or: {
    brandDesc:
      'ଶିଳାଲେଖ ଗବେଷଣା, ଓଡ଼୍ର ଦେଶର ଐତିହାସିକ ଭୂଗୋଳ, ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ରାଜବଂଶର ଶିଳାଲେଖ, ରାଜବଂଶାବଳୀ ଏବଂ ୮ଟି ଭାଷାରେ ଜୀବନ୍ତ ସାଂସ୍କୃତିକ ପରମ୍ପରାର ସଂରକ୍ଷଣ ପାଇଁ ସମର୍ପିତ।',
    supportedLangsLabel: 'ଉପଲବ୍ଧ ଭାଷା:',
    colDocumentary: 'ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ',
    colEpigraphy: 'ଶିଳାଲେଖ ଓ ଉତ୍ସ',
    colCommunityLegal: 'ସମ୍ପ୍ରଦାୟ ଓ ଆଇନଗତ',
    documents: 'ଐତିହାସିକ ଦଲିଲ ଓ ତାମ୍ରଶାସନ',
    privacy: 'ଗୋପନୀୟତା ନୀତି',
    terms: 'ବ୍ୟବହାର ସର୍ତ୍ତାବଳୀ',
    copyright: 'କପିରାଇଟ୍',
    disclaimer: 'ଅସ୍ୱୀକରଣ (Disclaimer)',
    historicalSources: 'ଐତିହାସିକ ଉତ୍ସ',
    accessibility: 'ସୁଗମ୍ୟତା ବିବରଣୀ',
    rights: 'ସମସ୍ତ ଐତିହାସିକ ଅଭିଲେଖ ଓ ଅନୁବାଦ ସଂରକ୍ଷିତ।',
    designSystem: 'ରାଜକୀୟ UI ଡିଜାଇନ୍ ସିଷ୍ଟମ୍',
    exportZip: 'ପ୍ରୋଜେକ୍ଟ ରପ୍ତାନି (ZIP)',
    fullBadge: 'ସମ୍ପୂର୍ଣ୍ଣ'
  },
  bn: {
    brandDesc:
      'শিলালিপি গবেষণা, ওড্র দেশের ঐতিহাসিক ভূগোল, সূর্যবংশী গজপতি রাজবংশের শিলালিপি, রাজবংশাবলী এবং আটটি ভাষায় জীবন্ত সাংস্কৃতিক ঐতিহ্য সংরক্ষণে নিবেদিত।',
    supportedLangsLabel: 'সমর্থিত ভাষা:',
    colDocumentary: 'ঐতিহাসিক প্রামাণ্যচিত্র',
    colEpigraphy: 'শিলালিপি ও উৎস',
    colCommunityLegal: 'সম্প্রদায় ও আইনি তথ্য',
    documents: 'ঐতিহাসিক দলিল ও তাম্রশাসন',
    privacy: 'গোপনীয়তা নীতি',
    terms: 'ব্যবহারের শর্তাবলী',
    copyright: 'কপিরাইট',
    disclaimer: 'দাবিত্যাগ (Disclaimer)',
    historicalSources: 'ঐতিহাসিক উৎস',
    accessibility: 'অ্যাক্সেসিবিলিটি বিবৃতি',
    rights: 'সকল ঐতিহাসিক নথি ও অনুবাদ সংরক্ষিত।',
    designSystem: 'রাজকীয় UI ডিজাইন সিস্টেম',
    exportZip: 'প্রজেক্ট এক্সপোর্ট (ZIP)',
    fullBadge: 'সম্পূর্ণ'
  }
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const fUi = FOOTER_EXTRA_UI[language] || FOOTER_EXTRA_UI.en;
  const whatsappGreeting =
    t.publisher?.whatsappGreeting ||
    'Namaste Dr.G Sathyanarayana Raju ji, regarding Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal';
  const whatsappUrl = `https://wa.me/919480112897?text=${encodeURIComponent(whatsappGreeting)}`;

  return (
    <footer className="model4-navy-scope w-full border-t-2 border-[#D4AF37]">
      {/* Research, Documentation & Compilation by Dr.G Sathyanarayana Raju */}
      <div className="model4-navy-bar border-b border-[#D4AF37]/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Clickable Circular Profile Photograph with Gold Border & Attached WhatsApp Badge */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleWhatsAppLinkClick(e, whatsappUrl)}
              className="relative shrink-0 group cursor-pointer"
              title={t.publisher?.contactWhatsApp || 'Contact on WhatsApp (+91 9480112897)'}
              aria-label={t.publisher?.contactWhatsApp || 'Contact on WhatsApp (+91 9480112897)'}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[3px] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.45)] ring-2 ring-[#762D35]">
                <img
                  src={`${import.meta.env.BASE_URL}assets/dr_g_sathyanarayana_raju.png`}
                  alt={t.publisher?.publisherName || 'Dr.G Sathyanarayana Raju'}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#25D366] text-white border-2 border-[#D4AF37] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              </span>
            </a>

            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-widest model4-text-gold">
                {t.publisher?.designedAndPublishedBy ||
                  'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju'}
              </div>
              <h3 className="font-royal-heading font-black text-xl model4-text-ivory">
                {t.publisher?.publisherName || 'Dr.G Sathyanarayana Raju'}
              </h3>
              <p className="text-xs sm:text-sm font-semibold model4-text-gold">
                {t.publisher?.leaderTitle || 'Founder & Historical Documentation Contributor'}
              </p>
              <p className="text-xs model4-text-muted font-medium">
                {t.publisher?.organization ||
                  'Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => handleWhatsAppLinkClick(e, whatsappUrl)}
              className="model4-btn-maroon inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>{t.publisher?.contactWhatsApp || 'Contact on WhatsApp (+91 9480112897)'}</span>
            </a>

            <a
              href="tel:+919480112897"
              className="model4-navy-pill inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#F5E1A4]" />
              <span>+91 9480112897</span>
            </a>
          </div>
        </div>
      </div>

      {/* Methodological Integrity Banner */}
      <div className="border-b border-[#D4AF37]/30 py-6 px-4 bg-[#081530]/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 text-xs sm:text-sm">
          <div className="p-2.5 rounded-xl model4-navy-subpanel shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#F5E1A4]" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <span className="font-bold model4-text-gold uppercase tracking-wider text-xs block">
              {t.evidenceNotice.title}
            </span>
            <p className="model4-text-muted text-xs leading-relaxed">
              {t.evidenceNotice.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Summary & Essential Legal/Action Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Brand & Project Summary */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <RoyalSunCrest className="w-11 h-11 shrink-0" />
              <div>
                <h3 className="font-royal-heading font-bold text-base model4-text-gold">
                  {t.siteTitle}
                </h3>
                <p className="text-[11px] model4-text-ivory font-semibold tracking-wider uppercase">
                  {t.siteSubtitle}
                </p>
              </div>
            </div>
            <p className="text-xs model4-text-muted leading-relaxed pr-2 sm:pr-6">
              {fUi.brandDesc}
            </p>
            <div className="pt-1 text-xs model4-text-muted">
              <span className="font-bold model4-text-gold">{fUi.supportedLangsLabel}</span> English, हिन्दी, తెలుగు, ಕನ್ನಡ, தமிழ், मराठी, ଓଡ଼ିଆ, বাংলা.
            </div>
          </div>

          {/* Consolidated Essential Legal, Standards & Archival Actions */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="rounded-xl model4-navy-subpanel border border-[#D4AF37]/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold model4-text-gold uppercase tracking-wider font-royal-heading">
                  {fUi.colCommunityLegal}
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5C121D] border border-[#D4AF37]/60 model4-text-gold font-semibold">
                  Verified Archival Records
                </span>
              </div>

              {/* Essential Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('/copyright')}
                  className="model4-btn-maroon px-3 py-1.5 rounded-lg text-xs font-semibold hover:brightness-110 cursor-pointer"
                >
                  {fUi.copyright}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/terms')}
                  className="model4-btn-maroon px-3 py-1.5 rounded-lg text-xs font-semibold hover:brightness-110 cursor-pointer"
                >
                  {fUi.disclaimer}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/references')}
                  className="model4-btn-maroon px-3 py-1.5 rounded-lg text-xs font-semibold hover:brightness-110 cursor-pointer"
                >
                  {fUi.historicalSources}
                </button>
              </div>

              {/* Secondary Legal & Standard Links */}
              <div className="pt-2 border-t border-[#D4AF37]/25 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('/privacy')}
                  className="model4-text-ivory hover:underline cursor-pointer"
                >
                  {fUi.privacy}
                </button>
                <span className="text-[#D4AF37]/50">•</span>
                <button
                  type="button"
                  onClick={() => onNavigate('/accessibility')}
                  className="model4-text-ivory hover:underline cursor-pointer"
                >
                  {fUi.accessibility}
                </button>
                <span className="text-[#D4AF37]/50">•</span>
                <button
                  type="button"
                  onClick={() => onNavigate('/design-system')}
                  className="model4-text-gold font-medium hover:underline cursor-pointer"
                >
                  {fUi.designSystem}
                </button>
              </div>

              {/* Full Archive Export ZIP */}
              <div className="pt-2 border-t border-[#D4AF37]/25 flex items-center justify-between">
                <a
                  href="/api/export/project-zip"
                  download="suryavamsha-odiyaraju-kshatriya-portal.zip"
                  className="model4-text-gold font-semibold hover:underline text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{fUi.exportZip}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#762D35] border border-[#D4AF37] model4-text-ivory">
                    {fUi.fullBadge}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright, Disclaimer & Historical Sources */}
        <div className="mt-12 pt-6 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs model4-text-muted">
          <div>
            © {new Date().getFullYear()} {t.siteTitle} • {fUi.rights}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 model4-text-muted">
            <button onClick={() => onNavigate('/copyright')} className="hover:underline model4-text-gold font-semibold cursor-pointer">
              {fUi.copyright}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/terms')} className="hover:underline model4-text-gold font-semibold cursor-pointer">
              {fUi.disclaimer}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/references')} className="hover:underline model4-text-gold font-semibold cursor-pointer">
              {fUi.historicalSources}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/about')} className="hover:underline model4-text-ivory cursor-pointer">
              {t.nav.about}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/contact')} className="hover:underline model4-text-ivory cursor-pointer">
              {t.nav.contact}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/privacy')} className="hover:underline model4-text-ivory cursor-pointer">
              {fUi.privacy}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

