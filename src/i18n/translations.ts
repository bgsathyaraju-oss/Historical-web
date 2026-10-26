import { LanguageCode, LanguageOption } from '../types';
import { PageTranslations, PAGE_TRANSLATIONS } from './pageTranslations';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', script: 'Latin' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी', script: 'Devanagari' },
  { code: 'or', label: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা', script: 'Bengali' },
];

export interface BaseTranslationDictionary {
  siteTitle: string;
  siteSubtitle: string;
  nav: {
    home: string;
    about: string;
    documentary: string;
    odraDesha: string;
    dynasties: string;
    gajapathiKings: string;
    maps: string;
    genealogy: string;
    timeline: string;
    inscriptions: string;
    temples: string;
    culture: string;
    literature: string;
    gallery: string;
    research: string;
    directory: string;
    activities: string;
    events: string;
    references: string;
    contact: string;
    login: string;
    register: string;
    dashboard: string;
    admin: string;
    submitResearch: string;
    documentedFigures: string;
    historicalPersons: string;
    communityProminentPersons: string;
    communityHeritage: string;
    communitySurnames: string;
    kalingaWar: string;
    logout: string;
    exportZip: string;
  };
  publisher: {
    designedAndPublishedBy: string;
    publisherName: string;
    leaderTitle: string;
    leaderBio: string;
    contactWhatsApp: string;
    callMobile: string;
    whatsappGreeting: string;
  };
  hero: {
    badge: string;
    headline: string;
    subtitle: string;
    exploreBtn: string;
    dynastiesBtn: string;
    galleryBtn: string;
    joinBtn: string;
    exportBtn: string;
  };
  evidenceNotice: {
    title: string;
    description: string;
  };
  common: {
    searchPlaceholder: string;
    readMore: string;
    verified: string;
    scholarly: string;
    traditional: string;
    oral: string;
    belief: string;
    filterBy: string;
    all: string;
    viewDetails: string;
    source: string;
    citation: string;
    period: string;
    location: string;
    status: string;
    close: string;
    submit: string;
    cancel: string;
    save: string;
    loading: string;
    noResults: string;
    language: string;
    exportZip: string;
    suggestTranslation: string;
    offlineReady: string;
    coverage: string;
    copyCommands: string;
    copied: string;
    share: string;
    bookmark: string;
    bookmarked: string;
    clearFilter: string;
    keywords: string;
    citations: string;
    backToHome: string;
  };
  stats: {
    title: string;
    subtitle: string;
    articles: string;
    documents: string;
    photos: string;
    inscriptions: string;
    translations: string;
    members: string;
    events: string;
  };
  documentary: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    monographsList: string;
    citationsTitle: string;
    keywordsLabel: string;
    emptySelection: string;
    authorLabel: string;
    dateLabel: string;
    translationNotice: string;
    languageSwitchLabel: string;
    allCategories: string;
    categoryOdraDesha: string;
    categoryGajapathiKings: string;
    categoryRoyalGenealogy: string;
    categoryResearchArticles: string;
    sourceTypes: {
      primarySource: string;
      scholarlyBook: string;
      inscription: string;
      archaeologicalRecord: string;
      peerReviewed: string;
      oralHistory: string;
      communityTradition: string;
    };
  };
  exportModal: {
    title: string;
    subtitle: string;
    downloadTab: string;
    androidTab: string;
    githubTab: string;
    downloadBtn: string;
    readyNotice: string;
    packageIncludes: string;
    frontendDesc: string;
    backendDesc: string;
    databaseDesc: string;
    translationDesc: string;
    androidNotice: string;
    copyCmds: string;
    githubNotice: string;
    closeBtn: string;
  };
  translationModal: {
    title: string;
    subtitle: string;
    sourceDoc: string;
    targetLangLabel: string;
    titleLabel: string;
    summaryLabel: string;
    contentLabel: string;
    authorLabel: string;
    disclaimer: string;
    cancelBtn: string;
    submitBtn: string;
    savingBtn: string;
    successNotice: string;
  };
}

export type TranslationDictionary = BaseTranslationDictionary & PageTranslations;

export const baseTranslations: Record<LanguageCode, BaseTranslationDictionary> = {
  // 1. ENGLISH (en)
  en: {
    siteTitle: 'SURYAVAMSHA ODIYARAJU KSHATRIYA',
    siteSubtitle: 'Historical Documentary, Royal Heritage & Global Community Portal',
    nav: {
      home: 'Home',
      about: 'About Project',
      documentary: 'Historical Documentary',
      odraDesha: 'Odra Desha',
      dynasties: 'Royal Dynasties',
      gajapathiKings: 'Gajapathi Kings',
      maps: 'Kingdoms & Maps',
      genealogy: 'Royal Genealogy',
      timeline: 'Historical Timeline',
      inscriptions: 'Inscriptions & Archaeology',
      temples: 'Temples & Monuments',
      culture: 'Culture & Traditions',
      literature: 'Literature & Publications',
      gallery: 'Historical Gallery',
      research: 'Research Articles',
      directory: 'Community Directory',
      activities: 'Community Activities',
      events: 'Events & Notices',
      references: 'Historical References',
      contact: 'Contact Us',
      login: 'Member Login',
      register: 'Register Account',
      dashboard: 'Member Dashboard',
      admin: 'Admin Panel',
      submitResearch: 'Submit Research',
      documentedFigures: 'Documented Historical Figures',
      historicalPersons: 'Historical Persons',
      communityProminentPersons: 'Community Prominent Persons',
      communityHeritage: 'Community Heritage',
      communitySurnames: 'Community-Surnames',
      kalingaWar: 'The Kalinga War (261 BCE)',
      logout: 'Logout',
      exportZip: 'Export Project (ZIP)'
    },
    publisher: {
      designedAndPublishedBy: 'WebSite Design and Published by',
      publisherName: 'Dr G.Sathyanarayana Raju',
      leaderTitle: 'Leader of Suryavamsha Odiyaraju Kshatriya Community',
      leaderBio: 'Leading the digital historical documentation, epigraphic preservation, and pan-Indian cultural integration of the Suryavamsha Odiyaraju Kshatriya heritage.',
      contactWhatsApp: 'Contact on WhatsApp (+91 9480112897)',
      callMobile: '+91 9480112897',
      whatsappGreeting: 'Namaste Dr G. Sathyanarayana Raju ji, regarding Suryavamsha Odiyaraju Kshatriya Heritage Portal'
    },
    hero: {
      badge: 'Epigraphic Archival Rigor & Primary Evidence',
      headline: 'Explore the Verified History, Sovereign Heritage & Lineage of Suryavamsha Odiyaraju Kshatriya',
      subtitle: 'A digital archival documentary dedicated to historical research, epigraphic inscriptions, royal architectural monuments, and authentic living traditions.',
      exploreBtn: 'Explore Documentary',
      dynastiesBtn: 'Royal Dynasties',
      galleryBtn: 'Historical Gallery',
      joinBtn: 'Join Community Archive',
      exportBtn: 'Download Project ZIP'
    },
    evidenceNotice: {
      title: 'Historical Integrity & Epistemic Standard',
      description: 'In accordance with rigorous historiographical principles, unverified traditions, royal genealogies, or claims are never presented as established historical facts. We strictly demarcate verified primary inscriptions, scholarly analyses, traditional chronicles, and living community traditions.',
    },
    common: {
      searchPlaceholder: 'Search inscriptions, rulers, research articles or archives...',
      readMore: 'Read Full Study',
      verified: 'Verified Primary Epigraph',
      scholarly: 'Scholarly Academic Interpretation',
      traditional: 'Traditional Vamsavali Record',
      oral: 'Oral History / Regional Memory',
      belief: 'Living Community Tradition',
      filterBy: 'Filter Records',
      all: 'All Historical Records',
      viewDetails: 'View Archival Details',
      source: 'Source & Citation',
      citation: 'Citation',
      period: 'Historical Era',
      location: 'Location',
      status: 'Verification Status',
      close: 'Close',
      submit: 'Submit Contribution',
      cancel: 'Cancel',
      save: 'Save Changes',
      loading: 'Loading archival records...',
      noResults: 'No historical records matched your criteria.',
      language: 'Language',
      exportZip: 'Export ZIP',
      suggestTranslation: 'Suggest Translation',
      offlineReady: 'Offline Ready',
      coverage: '8-Language Coverage',
      copyCommands: 'Copy Commands',
      copied: 'Copied!',
      share: 'Share',
      bookmark: 'Bookmark',
      bookmarked: 'Bookmarked',
      clearFilter: 'Clear Filter',
      keywords: 'Keywords',
      citations: 'Verified Archival Citations & Primary Sources',
      backToHome: 'Back to Homepage'
    },
    stats: {
      title: 'Archival & Research Statistics',
      subtitle: 'Real-time metrics computed directly from authentic database records',
      articles: 'Historical Monographs',
      documents: 'Digitized Documents',
      photos: 'Archival Photographs',
      inscriptions: 'Verified Inscriptions',
      translations: 'Published Translations',
      members: 'Registered Members',
      events: 'Community Gatherings',
    },
    documentary: {
      badge: 'Verified Archival Monographs & Knowledge Repository',
      title: 'Suryavamsha Historical Documentary & Research Index',
      subtitle: 'Peer-reviewed studies, epigraphic transcripts, cartographic reconstructions, and dynastic monographs.',
      searchPlaceholder: 'Search documentary monographs by title, king, region or keyword...',
      monographsList: 'Historical Monographs',
      citationsTitle: 'Verified Archival Citations & Sources',
      keywordsLabel: 'Keywords:',
      emptySelection: 'Select an article from the index to begin reading.',
      authorLabel: 'Author / Historian',
      dateLabel: 'Publication Date',
      translationNotice: 'This article is displayed in its original verified language. Translation into your selected language is currently pending peer editorial review.',
      languageSwitchLabel: 'Available Translations (8 Languages):',
      allCategories: 'All Categories',
      categoryOdraDesha: 'Odra Desha',
      categoryGajapathiKings: 'Gajapathi Kings',
      categoryRoyalGenealogy: 'Royal Genealogy',
      categoryResearchArticles: 'Research Articles',
      sourceTypes: {
        primarySource: 'Primary Epigraphic Grant',
        scholarlyBook: 'Scholarly Academic Book',
        inscription: 'Stone Inscription',
        archaeologicalRecord: 'Archaeological Survey Record',
        peerReviewed: 'Peer-Reviewed Journal',
        oralHistory: 'Documented Oral Tradition',
        communityTradition: 'Living Heritage Record',
      },
    },
    exportModal: {
      title: 'Export & Download Portal Project',
      subtitle: 'Complete source code, database configuration, 8-language translations & Android setup',
      downloadTab: 'Download ZIP Package',
      androidTab: 'Android Phone Guide',
      githubTab: 'Free GitHub Export',
      downloadBtn: 'Download ZIP (Complete)',
      readyNotice: 'Includes all React 19 components, Express backend routes, database data, translations & tests.',
      packageIncludes: 'What is Included in Your Package:',
      frontendDesc: 'React 19, Tailwind v4, Royal Heritage UI tokens, 30+ pages, genealogy tree & documentary.',
      backendDesc: 'Express.js TypeScript API with authentication, RBAC, file upload handler, and search routes.',
      databaseDesc: 'Normalized atomic storage containing dynasties, epigraphic records, member accounts, and timeline.',
      translationDesc: 'TranslationManager service with offline persistence and translations across 8 major Indian languages.',
      androidNotice: 'You can run this entire portal locally on any modern Android smartphone using Termux.',
      copyCmds: 'Copy Commands',
      githubNotice: 'Push your project to GitHub for free version control and cloud backup.',
      closeBtn: 'Close'
    },
    translationModal: {
      title: 'Contribute Translation',
      subtitle: 'Help transcribe and translate verified royal records across all 8 Indian languages',
      sourceDoc: 'Source Document:',
      targetLangLabel: 'Select Target Translation Language',
      titleLabel: 'Translated Title',
      summaryLabel: 'Executive Summary',
      contentLabel: 'Full Translated Content',
      authorLabel: 'Translator / Contributor Attribution',
      disclaimer: 'All contributions are archived and reviewed for epigraphic accuracy.',
      cancelBtn: 'Cancel',
      submitBtn: 'Save Translation',
      savingBtn: 'Saving...',
      successNotice: 'Translation saved successfully!'
    }
  },

  // 2. HINDI (hi)
  hi: {
    siteTitle: 'सूर्यवंश ओडियाराजू क्षत्रिय',
    siteSubtitle: 'ऐतिहासिक वृत्तचित्र, शाही विरासत एवं वैश्विक समुदाय पोर्टल',
    nav: {
      home: 'मुखपृष्ठ',
      about: 'परियोजना परिचय',
      documentary: 'ऐतिहासिक वृत्तचित्र',
      odraDesha: 'ओड्र देश',
      dynasties: 'शाही राजवंश',
      gajapathiKings: 'गजपति नरेश',
      maps: 'साम्राज्य एवं मानचित्र',
      genealogy: 'राजकीय वंशावली',
      timeline: 'ऐतिहासिक कालक्रम',
      inscriptions: 'शिलालेख एवं पुरातत्व',
      temples: 'मंदिर एवं स्मारक',
      culture: 'संस्कृति एवं परंपराएं',
      literature: 'साहित्य एवं प्रकाशन',
      gallery: 'ऐतिहासिक दीर्घा',
      research: 'शोध आलेख',
      directory: 'समुदाय निर्देशिका',
      activities: 'सामुदायिक गतिविधियाँ',
      events: 'कार्यक्रम एवं सूचनाएं',
      references: 'ऐतिहासिक संदर्भ',
      contact: 'संपर्क करें',
      login: 'सदस्य प्रवेश',
      register: 'खाता बनाएं',
      dashboard: 'सदस्य डैशबोर्ड',
      admin: 'प्रशासन कक्ष',
      submitResearch: 'शोध प्रस्तुत करें',
      documentedFigures: 'अभिलेखित ऐतिहासिक व्यक्तित्व',
      historicalPersons: 'ऐतिहासिक महापुरुष एवं विभूतियाँ',
      communityProminentPersons: 'समुदाय के प्रमुख व्यक्तित्व',
      communityHeritage: 'सामुदायिक विरासत',
      communitySurnames: 'समुदाय के उपनाम (Community-Surnames)',
      kalingaWar: 'कलिंग युद्ध (261 ई.पू.)',
      logout: 'लॉग आउट',
      exportZip: 'प्रोजेक्ट ज़िप डाउनलोड'
    },
    publisher: {
      designedAndPublishedBy: 'वेबसाइट निर्माण एवं प्रकाशन',
      publisherName: 'डॉ. जी. सत्यनारायण राजू',
      leaderTitle: 'सूर्यवंश ओडियाराजू क्षत्रिय समाज के प्रमुख नेता',
      leaderBio: 'सूर्यवंश ओडियाराजू क्षत्रिय ऐतिहासिक धरोहर, पुरातात्विक अभिलेखों के संरक्षण एवं अखिल भारतीय सांस्कृतिक समन्वय के प्रेरक नेतृत्वकर्ता।',
      contactWhatsApp: 'व्हाट्सएप पर संपर्क करें (+91 9480112897)',
      callMobile: '+91 9480112897',
      whatsappGreeting: 'नमस्ते डॉ. जी. सत्यनारायण राजू जी, सूर्यवंश ओडियाराजू क्षत्रिय ऐतिहासिक पोर्टल के संदर्भ में'
    },
    hero: {
      badge: 'प्रामाणिक शिलालेखीय साक्ष्य एवं ऐतिहासिक अनुसंधान',
      headline: 'सूर्यवंश ओडियाराजू क्षत्रिय के इतिहास, गौरव और विरासत की खोज करें',
      subtitle: 'ऐतिहासिक शोध, सांस्कृतिक संरक्षण और गजपति नरेशों की परंपराओं के लिए एक प्रामाणिक डिजिटल अभिलेखागार।',
      exploreBtn: 'वृत्तचित्र देखें',
      dynastiesBtn: 'शाही राजवंश जानें',
      galleryBtn: 'ऐतिहासिक दीर्घा',
      joinBtn: 'समुदाय से जुड़ें',
      exportBtn: 'प्रोजेक्ट ज़िप डाउनलोड'
    },
    evidenceNotice: {
      title: 'साक्ष्य एवं शोध सत्यनिष्ठा',
      description: 'ऐतिहासिक सिद्धांतों के अनुसार, अपुष्ट परंपराओं या दावों को स्थापित तथ्य नहीं माना जाता। हम प्रमाणित शिलालेखों, विद्वानों के विश्लेषण और पारंपरिक खातों में स्पष्ट भेद रखते हैं।',
    },
    common: {
      searchPlaceholder: 'अभिलेख, शिलालेख, राजा या आलेख खोजें...',
      readMore: 'पूर्ण विवरण पढ़ें',
      verified: 'सत्यापित अभिलेखीय साक्ष्य',
      scholarly: 'विद्वान इतिहासकार व्याख्या',
      traditional: 'पारंपरिक वंशावली विवरण',
      oral: 'मौखिक इतिहास / स्मृति',
      belief: 'सामुदायिक परंपरा',
      filterBy: 'फ़िल्टर करें',
      all: 'सभी अभिलेख',
      viewDetails: 'विवरण देखें',
      source: 'स्रोत व संदर्भ',
      citation: 'उद्धरण',
      period: 'कालखंड',
      location: 'स्थान',
      status: 'सत्यापन स्थिति',
      close: 'बंद करें',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      loading: 'रिकॉर्ड लोड हो रहे हैं...',
      noResults: 'कोई परिणाम नहीं मिला।',
      language: 'भाषा',
      exportZip: 'ज़िप निर्यात',
      suggestTranslation: 'अनुवाद का सुझाव दें',
      offlineReady: 'ऑफ़लाइन तैयार',
      coverage: '8-भाषा कवरेज',
      copyCommands: 'कमांड कॉपी करें',
      copied: 'कॉपी हो गया!',
      share: 'साझा करें',
      bookmark: 'बुकमार्क',
      bookmarked: 'बुकमार्क किया गया',
      clearFilter: 'फ़िल्टर हटाएं',
      keywords: 'मुख्य शब्द',
      citations: 'सत्यापित अभिलेखीय उद्धरण एवं स्रोत',
      backToHome: 'मुखपृष्ठ पर लौटें'
    },
    stats: {
      title: 'संग्रह एवं शोध आंकड़े',
      subtitle: 'डेटाबेस रिकॉर्ड्स से सीधे परिकलित वास्तविक संख्या',
      articles: 'शोध आलेख',
      documents: 'डिजिटलीकृत प्रलेख',
      photos: 'ऐतिहासिक छायाचित्र',
      inscriptions: 'समीक्षित शिलालेख',
      translations: 'प्रकाशित अनुवाद',
      members: 'पंजीकृत सदस्य',
      events: 'आयोजित कार्यक्रम',
    },
    documentary: {
      badge: 'सत्यापित ऐतिहासिक शोध एवं ज्ञान भंडार',
      title: 'सूर्यवंश ऐतिहासिक वृत्तचित्र एवं संदर्भ अनुक्रमणिका',
      subtitle: 'सहकर्मी-समीक्षित शोध, शिलालेख प्रतिलिपियाँ, ऐतिहासिक मानचित्र एवं राजवंश अध्ययन।',
      searchPlaceholder: 'शीर्षक, नरेश, क्षेत्र या मुख्य शब्द से वृत्तचित्र खोजें...',
      monographsList: 'ऐतिहासिक शोध आलेख',
      citationsTitle: 'सत्यापित अभिलेखीय उद्धरण एवं स्रोत',
      keywordsLabel: 'कीवर्ड:',
      emptySelection: 'पढ़ना शुरू करने के लिए सूची से किसी आलेख का चयन करें।',
      authorLabel: 'लेखक / इतिहासकार',
      dateLabel: 'प्रकाशन तिथि',
      translationNotice: 'यह आलेख अपनी मूल सत्यापित भाषा में प्रदर्शित है। आपकी चयनित भाषा में अनुवाद संपादकीय समीक्षाधीन है।',
      languageSwitchLabel: 'उपलब्ध अनुवाद (8 भाषाएँ):',
      allCategories: 'सभी श्रेणियां',
      categoryOdraDesha: 'ओड्र देश',
      categoryGajapathiKings: 'गजपति नरेश',
      categoryRoyalGenealogy: 'राजकीय वंशावली',
      categoryResearchArticles: 'शोध आलेख',
      sourceTypes: {
        primarySource: 'प्राथमिक ताम्रपत्र दानपत्र',
        scholarlyBook: 'विद्वत्तापूर्ण ऐतिहासिक पुस्तक',
        inscription: 'शिलालेखीय प्रलेख',
        archaeologicalRecord: 'पुरातत्व सर्वेक्षण अभिलेख',
        peerReviewed: 'शोध पत्रिका',
        oralHistory: 'मौखिक परंपरा',
        communityTradition: 'जीवंत सामुदायिक विरासत',
      },
    },
    exportModal: {
      title: 'पोर्टल प्रोजेक्ट निर्यात एवं डाउनलोड',
      subtitle: 'संपूर्ण स्रोत कोड, डेटाबेस कॉन्फ़िगरेशन, 8 भाषाओं के अनुवाद एवं एंड्रॉइड सेटअप',
      downloadTab: 'ज़िप पैकेज डाउनलोड',
      androidTab: 'एंड्रॉइड फोन निर्देश',
      githubTab: 'निःशुल्क गिटहब निर्यात',
      downloadBtn: 'पूर्ण ज़िप डाउनलोड करें',
      readyNotice: 'इसमें सभी रिएक्ट 19 घटक, एक्सप्रेस बैकएंड, डेटाबेस और परीक्षण शामिल हैं।',
      packageIncludes: 'आपके पैकेज में क्या शामिल है:',
      frontendDesc: 'रिएक्ट 19, टेलविंड v4, रॉयल हेरिटेज यूआई, 30+ पृष्ठ एवं वंशावली वृक्ष।',
      backendDesc: 'एक्सप्रेस जेएस टाइपस्क्रिप्ट एपीआई, आरबीएसी, प्रमाणीकरण और खोज मार्ग।',
      databaseDesc: 'परमाणु डेटाबेस जिसमें राजवंश, शिलालेख और सदस्य खाते शामिल हैं।',
      translationDesc: '8 प्रमुख भारतीय भाषाओं में ट्रांसलेशन मैनेजर सेवा।',
      androidNotice: 'टर्मक्स का उपयोग करके आप इसे एंड्रॉइड फोन पर ऑफ़लाइन चला सकते हैं।',
      copyCmds: 'कमांड कॉपी करें',
      githubNotice: 'निःशुल्क क्लाउड बैकअप के लिए अपने प्रोजेक्ट को गिटहब पर भेजें।',
      closeBtn: 'बंद करें'
    },
    translationModal: {
      title: 'अनुवाद में योगदान दें',
      subtitle: 'सभी 8 भाषाओं में ऐतिहासिक अभिलेखों के अनुवाद में सहयोग करें',
      sourceDoc: 'मूल प्रलेख:',
      targetLangLabel: 'लक्षित अनुवाद भाषा चुनें',
      titleLabel: 'अनुवादित शीर्षक',
      summaryLabel: 'संक्षिप्त सारांश',
      contentLabel: 'पूर्ण अनुवादित सामग्री',
      authorLabel: 'अनुवादक / योगदानकर्ता का नाम',
      disclaimer: 'सभी योगदानों की पुरातात्विक सटीकता के लिए समीक्षा की जाती है।',
      cancelBtn: 'रद्द करें',
      submitBtn: 'अनुवाद सहेजें',
      savingBtn: 'सहेजा जा रहा है...',
      successNotice: 'अनुवाद सफलतापूर्वक सहेजा गया!'
    }
  },

  // 3. TELUGU (te)
  te: {
    siteTitle: 'సూర్యవంశ ఒడియారాజు క్షత్రియ',
    siteSubtitle: 'చారిత్రక పరిశోధన, రాజవంశ వారసత్వం & గ్లోబల్ కమ్యూనిటీ పోర్టల్',
    nav: {
      home: 'ముఖచిత్రం',
      about: 'మా గురించి',
      documentary: 'చారిత్రక డాక్యుమెంటరీ',
      odraDesha: 'ఓడ్ర దేశం',
      dynasties: 'రాజవంశాలు',
      gajapathiKings: 'గజపతి రాజులు',
      maps: 'సామ్రాజ్యాలు & పటములు',
      genealogy: 'రాజ వంశావళి',
      timeline: 'చారిత్రక కాలరేఖ',
      inscriptions: 'శాసనాలు & పురాతత్వ శాస్త్రం',
      temples: 'దేవాలయాలు & స్మారకాలు',
      culture: 'సంస్కృతి & సంప్రదాయాలు',
      literature: 'సాహిత్యం & ప్రచురణలు',
      gallery: 'చారిత్రక చిత్రశాల',
      research: 'పరిశోధనా వ్యాసాలు',
      directory: 'కమ్యూనిటీ డైరెక్టరీ',
      activities: 'సంఘ కార్యక్రమాలు',
      events: 'కార్యక్రమాలు & ప్రకటనలు',
      references: 'చారిత్రక ఆధారాలు',
      contact: 'సంప్రదించండి',
      login: 'సభ్యుల లాగిన్',
      register: 'ఖాతా సృష్టించండి',
      dashboard: 'సభ్యుల డాష్‌బోర్డ్',
      admin: 'అడ్మిన్ ప్యానెల్',
      submitResearch: 'పరిశోధన సమర్పించండి',
      documentedFigures: 'చారిత్రక ఆధారిత ప్రముఖులు',
      historicalPersons: 'చారిత్రక వ్యక్తులు & వీరులు',
      communityProminentPersons: 'సముదాయ ప్రముఖ వ్యక్తులు',
      communityHeritage: 'సముదాయ వారసత్వం',
      communitySurnames: 'సముదాయ ఇంటిపేర్లు (Community-Surnames)',
      kalingaWar: 'కళింగ యుద్ధం (క్రీ.పూ. 261)',
      logout: 'లాగౌట్',
      exportZip: 'ప్రాజెక్ట్ జిప్ డౌన్‌లోడ్'
    },
    publisher: {
      designedAndPublishedBy: 'వెబ్‌సైట్ రూపకల్పన మరియు ప్రచురణ',
      publisherName: 'డాక్టర్ జి. సత్యనారాయణ రాజు',
      leaderTitle: 'సూర్యవంశ ఒడియరాజు క్షత్రియ సమాజ నాయకుడు',
      leaderBio: 'సూర్యవంశ ఒడియరాజు క్షత్రియ సాంస్కృతిక వారసత్వం, ప్రాచీన శాసనాల పరిరక్షణ మరియు సమగ్ర చారిత్రక డిజిటలైజేషన్ నడిపిస్తున్న నాయకుడు.',
      contactWhatsApp: 'వాట్సాప్‌లో సంప్రదించండి (+91 9480112897)',
      callMobile: '+91 9480112897',
      whatsappGreeting: 'నమస్కారం డాక్టర్ జి. సత్యనారాయణ రాజు గారు, సూర్యవంశ ఒడియరాజు క్షత్రియ చారిత్రక పోర్టల్ గురించి'
    },
    hero: {
      badge: 'శాసన ఆధారిత చారిత్రక పరిశోధన & ప్రైమరీ ఆధారాలు',
      headline: 'సూర్యవంశ ఒడియారాజు క్షత్రియుల చరిత్ర, వారసత్వం మరియు వైభవాన్ని తెలుసుకోండి',
      subtitle: 'చారిత్రక పరిశోధన, శాసనాలు, ఆలయ నిర్మాణాలు మరియు సాంస్కృతిక పరిరక్షణకు అంకితమైన సమగ్ర డిజిటల్ ఆర్కైవ్.',
      exploreBtn: 'డాక్యుమెంటరీని చూడండి',
      dynastiesBtn: 'రాజవంశాలను అన్వేషించండి',
      galleryBtn: 'చిత్రశాల చూడండి',
      joinBtn: 'కమ్యూనిటీలో చేరండి',
      exportBtn: 'ప్రాజెక్ట్ జిప్ డౌన్‌లోడ్'
    },
    evidenceNotice: {
      title: 'చారిత్రక విశ్వసనీయతా ప్రమాణం',
      description: 'రుజువు చేయని సాంప్రదాయ కథనాలు లేదా వంశావళి వాదనలను నిర్ధారిత చారిత్రక సత్యాలుగా ప్రదర్శించము. నిర్ధారిత శాసనాలు, విద్వాంసుల పరిశోధనలు మరియు మౌఖిక సంప్రదాయాలను స్పష్టంగా వేరు చేస్తాము.',
    },
    common: {
      searchPlaceholder: 'శాసనాలు, రాజులు, వ్యాసాలు లేదా చారిత్రక ఆధారాలు శోధించండి...',
      readMore: 'పూర్తి వివరం చదవండి',
      verified: 'ధృవీకరించబడిన శాసన ఆధారాలు',
      scholarly: 'పండితుల చారిత్రక వ్యాఖ్యానం',
      traditional: 'సాంప్రదాయ వంశావళి వివరాలు',
      oral: 'మౌఖిక చరిత్ర / జ్ఞాపకాలు',
      belief: 'కమ్యూనిటీ సంప్రదాయ విశ్వాసం',
      filterBy: 'వడపోత',
      all: 'అన్ని రికార్డులు',
      viewDetails: 'వివరాలు చూడండి',
      source: 'మూలం & ఆధారం',
      citation: 'సూచన',
      period: 'కాలం',
      location: 'ప్రాంతం',
      status: 'ధృవీకరణ స్థితి',
      close: 'మూసివేయి',
      submit: 'సమర్పించు',
      cancel: 'రద్దు చేయి',
      save: 'భద్రపరచు',
      loading: 'రికార్డులు లోడ్ అవుతున్నాయి...',
      noResults: 'ఎటువంటి ఫలితాలు లభించలేదు.',
      language: 'భాష',
      exportZip: 'జిప్ డౌన్‌లోడ్',
      suggestTranslation: 'అనువాదం సూచించండి',
      offlineReady: 'ఆఫ్‌లైన్ సిద్ధం',
      coverage: '8 భాషల కవరేజ్',
      copyCommands: 'కమాండ్‌లు కాపీ చేయండి',
      copied: 'కాపీ అయ్యింది!',
      share: 'షేర్ చేయండి',
      bookmark: 'బుక్‌మార్క్',
      bookmarked: 'బుక్‌మార్క్ చేయబడింది',
      clearFilter: 'ఫిల్టర్ తొలగించు',
      keywords: 'కీలక పదాలు',
      citations: 'ధృవీకరించబడిన శాసన ఆధారాలు & సూచనలు',
      backToHome: 'హోమ్‌పేజీకి తిరిగి వెళ్లండి'
    },
    stats: {
      title: 'పరిశోధన గణాంకాలు',
      subtitle: 'డేటాబేస్ నుండి స్వయంచాలకంగా ధృవీకరించబడిన సంఖ్యలు',
      articles: 'చారిత్రక వ్యాసాలు',
      documents: 'డిజిటలైజ్డ్ పత్రాలు',
      photos: 'పురాతన ఛాయాచిత్రాలు',
      inscriptions: 'పరిశీలించిన శాసనాలు',
      translations: 'ప్రచురిత అనువాదాలు',
      members: 'నమోదైన సభ్యులు',
      events: 'సంఘ కార్యక్రమాలు',
    },
    documentary: {
      badge: 'ధృవీకరించబడిన చారిత్రక గ్రంథాలయం & విజ్ఞాన కేంద్రం',
      title: 'సూర్యవంశ చారిత్రక డాక్యుమెంటరీ & పరిశోధనా సూచిక',
      subtitle: 'శాసన ఆధారాలు, పురాతత్వ పునర్నిర్మాణాలు, సామ్రాజ్య పటములు మరియు విద్వాంసుల పరిశోధనలు.',
      searchPlaceholder: 'శీర్షిక, రాజు, ప్రాంతం లేదా కీలకపదం ద్వారా శోధించండి...',
      monographsList: 'చారిత్రక పరిశోధనా గ్రంథాలు',
      citationsTitle: 'ధృవీకరించబడిన చారిత్రక ఆధారాలు & మూలాలు',
      keywordsLabel: 'కీలక పదాలు:',
      emptySelection: 'చదవడం ప్రారంభించడానికి సూచిక నుండి ఒక వ్యాసాన్ని ఎంచుకోండి.',
      authorLabel: 'రచయిత / చరిత్రకారుడు',
      dateLabel: 'ప్రచురణ తేదీ',
      translationNotice: 'ఈ వ్యాసం దాని అసలైన ధృవీకరించబడిన భాషలో చూపబడుతోంది. మీ ఎంపిక చేసిన భాషలో అనువాదం సంపాదకీయ సమీక్షలో ఉంది.',
      languageSwitchLabel: 'అందుబాటులో ఉన్న అనువాదాలు (8 భాషలు):',
      allCategories: 'అన్ని విభాగాలు',
      categoryOdraDesha: 'ఓడ్ర దేశం',
      categoryGajapathiKings: 'గజపతి రాజులు',
      categoryRoyalGenealogy: 'రాజ వంశావళి',
      categoryResearchArticles: 'పరిశోధనా వ్యాసాలు',
      sourceTypes: {
        primarySource: 'ప్రాథమిక తామ్రశాసనం',
        scholarlyBook: 'విద్వాంసుల పరిశోధనా గ్రంథం',
        inscription: 'శిలాశాసనం',
        archaeologicalRecord: 'పురాతత్వ సర్వే రికార్డు',
        peerReviewed: 'పీర్-రివ్యూడ్ జర్నల్',
        oralHistory: 'మౌఖిక సంప్రదాయం',
        communityTradition: 'సజీవ వారసత్వ సంప్రదాయం',
      },
    },
    exportModal: {
      title: 'పోర్టల్ ప్రాజెక్ట్ ఎగుమతి & డౌన్‌లోడ్',
      subtitle: 'పూర్తి సోర్స్ కోడ్, డేటాబేస్, 8 భాషల అనువాదాలు మరియు ఆండ్రాయిడ్ సెటప్',
      downloadTab: 'జిప్ ప్యాకేజీ డౌన్‌లోడ్',
      androidTab: 'ఆండ్రాయిడ్ ఫోన్ గైడ్',
      githubTab: 'ఉచిత గిట్‌హబ్ ఎగుమతి',
      downloadBtn: 'పూర్తి జిప్ డౌన్‌లోడ్ చేయండి',
      readyNotice: 'రియాక్ట్ 19 ఫ్రంటెండ్, ఎక్స్‌ప్రెస్ బ్యాకెండ్, డేటాబేస్ మరియు టెస్టులు చేర్చబడ్డాయి.',
      packageIncludes: 'మీ ప్యాకేజీలో ఏమున్నాయి:',
      frontendDesc: 'రియాక్ట్ 19, టైల్‌విండ్ v4, రాజవంశ UI, 30+ పేజీలు మరియు వంశావళి చెట్టు.',
      backendDesc: 'ఎక్స్‌ప్రెస్ TypeScript API, ప్రమాణీకరణ, RBAC మరియు సెర్చ్ రౌట్స్.',
      databaseDesc: 'రాజవంశాలు, శాసనాలు మరియు సభ్యుల సమాచారంతో కూడిన డేటాబేస్.',
      translationDesc: '8 ప్రధాన భారతీయ భాషలలో ట్రాన్స్‌లేషన్ మేనేజర్ సర్వీస్.',
      androidNotice: 'టెర్ముక్స్ ద్వారా మీ ఆండ్రాయిడ్ ఫోన్‌లోనే ఈ పోర్టల్‌ను ఆఫ్‌లైన్‌లో రన్ చేయవచ్చు.',
      copyCmds: 'కమాండ్‌లు కాపీ చేయండి',
      githubNotice: 'ఉచిత క్లౌడ్ బ్యాకప్ కోసం ప్రాజెక్ట్‌ను గిట్‌హబ్‌కు పుష్ చేయండి.',
      closeBtn: 'మూసివేయి'
    },
    translationModal: {
      title: 'అనువాదం సమర్పించండి',
      subtitle: '8 భాషలలో రాజరిక ఆధారాల అనువాదంలో తోడ్పడండి',
      sourceDoc: 'మూల పత్రం:',
      targetLangLabel: 'లక్ష్య అనువాద భాషను ఎంచుకోండి',
      titleLabel: 'అనువాద శీర్షిక',
      summaryLabel: 'సారాంశం',
      contentLabel: 'పూర్తి అనువాద సమాచారం',
      authorLabel: 'అనువాదకుడి పేరు / గుర్తింపు',
      disclaimer: 'సమర్పించిన అన్ని అనువాదాలు శాసన ఖచ్చితత్వం కోసం సమీక్షించబడతాయి.',
      cancelBtn: 'రద్దు చేయి',
      submitBtn: 'అనువాదం భద్రపరచు',
      savingBtn: 'భద్రపరుస్తోంది...',
      successNotice: 'అనువాదం విజయవంతంగా భద్రపరచబడింది!'
    }
  },

  // 4. KANNADA (kn)
  kn: {
    siteTitle: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ',
    siteSubtitle: 'ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ, ರಾಜಮನೆತನದ ಪರಂಪರೆ ಮತ್ತು ಜಾಗತಿಕ ಸಮುದಾಯ ಪೋರ್ಟಲ್',
    nav: {
      home: 'ಮುಖಪುಟ',
      about: 'ಯೋಜನೆ ಕುರಿತು',
      documentary: 'ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ',
      odraDesha: 'ಓಡ್ರ ದೇಶ',
      dynasties: 'ರಾಜವಂಶಗಳು',
      gajapathiKings: 'ಗಜಪತಿ ರಾಜರು',
      maps: 'ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ನಕ್ಷೆಗಳು',
      genealogy: 'ರಾಜವಂಶಾವಳಿ',
      timeline: 'ಐತಿಹಾಸಿಕ ಕಾಲರೇಖೆ',
      inscriptions: 'ಶಾಸನಗಳು ಮತ್ತು ಪುರಾತತ್ವ',
      temples: 'ದೇವಾಲಯಗಳು ಮತ್ತು ಸ್ಮಾರಕಗಳು',
      culture: 'ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪರಂಪರೆ',
      literature: 'ಸಾಹಿತ್ಯ ಮತ್ತು ಪ್ರಕಟಣೆಗಳು',
      gallery: 'ಐತಿಹಾಸಿಕ ಗ್ಯಾಲರಿ',
      research: 'ಸಂಶೋಧನಾ ಲೇಖನಗಳು',
      directory: 'ಸಮುದಾಯ ಕೋಶ',
      activities: 'ಸಮುದಾಯ ಚಟುವಟಿಕೆಗಳು',
      events: 'ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಪ್ರಕಟಣೆಗಳು',
      references: 'ಐತಿಹಾಸಿಕ ಉಲ್ಲೇಖಗಳು',
      contact: 'ಸಂಪರ್ಕಿಸಿ',
      login: 'ಸದಸ್ಯರ ಲಾಗಿನ್',
      register: 'ಖಾತೆ ತೆರೆಯಿರಿ',
      dashboard: 'ಸದಸ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      admin: 'ಆಡಳಿತ ಮಂಡಳಿ',
      submitResearch: 'ಸಂಶೋಧನೆ ಸಲ್ಲಿಸಿ',
      documentedFigures: 'ದಾಖಲಿತ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು',
      historicalPersons: 'ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ನಾಯಕರು',
      communityProminentPersons: 'ಸಮುದಾಯದ ಪ್ರಮುಖ ವ್ಯಕ್ತಿಗಳು',
      communityHeritage: 'ಸಮುದಾಯ ಪರಂಪರೆ',
      communitySurnames: 'ಸಮುದಾಯದ ಉಪನಾಮಗಳು (Community-Surnames)',
      kalingaWar: 'ಕಳಿಂಗ ಯುದ್ಧ (ಕ್ರಿ.ಪೂ. 261)',
      logout: 'ಲಾಗೌಟ್',
      exportZip: 'ಪ್ರಾಜೆಕ್ಟ್ ಜಿಪ್ ಡೌನ್‌ಲೋಡ್'
    },
    publisher: {
      designedAndPublishedBy: 'ವೆಬ್‌ಸೈಟ್ ವಿನ್ಯಾಸ ಮತ್ತು ಪ್ರಕಾಶನ',
      publisherName: 'ಡಾ. ಜಿ. ಸತ್ಯನಾರಾಯಣ ರಾಜು',
      leaderTitle: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಸಮಾಜದ ನಾಯಕರು',
      leaderBio: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಪರಂಪರೆಯ ಐತಿಹಾಸಿಕ ದಾಖಲೀಕರಣ, ಶಾಸನ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಅಖಿಲ ಭಾರತ ಸಾಂಸ್ಕೃತಿಕ ಏಕತೆಯ ಮುಂಚೂಣಿ ಮಾರ್ಗದರ್ಶಕರು.',
      contactWhatsApp: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ (+91 9480112897)',
      callMobile: '+91 9480112897',
      whatsappGreeting: 'ನಮಸ್ಕಾರ ಡಾ. ಜಿ. ಸತ್ಯನಾರಾಯಣ ರಾಜು ಜೀ, ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಐತಿಹಾಸಿಕ ಪೋರ್ಟಲ್ ಕುರಿತು'
    },
    hero: {
      badge: 'ಶಾಸನ ಆಧಾರಿತ ಐತಿಹಾಸಿಕ ಸಂಶೋಧನೆ & ಮೂಲ ಪುರಾವೆ',
      headline: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯರ ಇತಿಹಾಸ, ಪರಂಪರೆ ಮತ್ತು ವೈಭವವನ್ನು ಅನ್ವೇಷಿಸಿ',
      subtitle: 'ಐತಿಹಾಸಿಕ ಸಂಶೋಧನೆ, ಸಾಂಸ್ಕೃತಿಕ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಗಜಪತಿ ರಾಜರ ಪರಂಪರೆಗೆ ಸಮರ್ಪಿತವಾದ ಡಿಜಿಟಲ್ ಆರ್ಕೈವ್.',
      exploreBtn: 'ಸಾಕ್ಷ್ಯಚಿತ್ರ ನೋಡಿ',
      dynastiesBtn: 'ರಾಜವಂಶಗಳನ್ನು ತಿಳಿಯಿರಿ',
      galleryBtn: 'ಚಿತ್ರ ಗ್ಯಾಲರಿ',
      joinBtn: 'ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ',
      exportBtn: 'ಪ್ರಾಜೆಕ್ಟ್ ಜಿಪ್ ಡೌನ್‌ಲೋಡ್'
    },
    evidenceNotice: {
      title: 'ಐತಿಹಾಸಿಕ ನಿಖರತೆಯ ಮಾನದಂಡ',
      description: 'ದೃಢೀಕರಿಸದ ಸಂಪ್ರದಾಯಗಳನ್ನು ಐತಿಹಾಸಿಕ ಸತ್ಯವೆಂದು ನಾವು ಬಿಂಬಿಸುವುದಿಲ್ಲ. ಶಾಸನಗಳು, ವಿದ್ವಾಂಸರ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ವಿವರಗಳನ್ನು ಪ್ರತ್ಯೇಕವಾಗಿ ದಾಖಲಿಸುತ್ತೇವೆ.',
    },
    common: {
      searchPlaceholder: 'ಶಾಸನಗಳು, ರಾಜರು ಅಥವಾ ಲೇಖನಗಳನ್ನು ಹುಡುಕಿ...',
      readMore: 'ಪೂರ್ಣ ಮಾಹಿತಿ ಓದಿ',
      verified: 'ದೃಢೀಕೃತ ಶಾಸನ ಪುರಾವೆ',
      scholarly: 'ವಿದ್ವತ್ಪೂರ್ಣ ಐತಿಹಾಸಿಕ ವಿವರಣೆ',
      traditional: 'ಸಾಂಪ್ರದಾಯಿಕ ವಂಶಾವಳಿ ವರದಿ',
      oral: 'ಮೌಖಿಕ ಇತಿಹಾಸ',
      belief: 'ಸಮುದಾಯ ನಂಬಿಕೆ',
      filterBy: 'ಫಿಲ್ಟರ್',
      all: 'ಎಲ್ಲಾ ದಾಖಲೆಗಳು',
      viewDetails: 'ವಿವರ ವೀಕ್ಷಿಸಿ',
      source: 'ಮೂಲ ಮತ್ತು ಉಲ್ಲೇಖ',
      citation: 'ಉಲ್ಲೇಖ',
      period: 'ಕಾಲಾವಧಿ',
      location: 'ಸ್ಥಳ',
      status: 'ದೃಢೀಕರಣ ಸ್ಥಿತಿ',
      close: 'ಮುಚ್ಚು',
      submit: 'ಸಲ್ಲಿಸು',
      cancel: 'ರದ್ದುಮಾಡು',
      save: 'ಉಳಿಸು',
      loading: 'ದಾಖಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
      noResults: 'ಯಾವುದೇ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
      language: 'ಭಾಷೆ',
      exportZip: 'ಜಿಪ್ ಡೌನ್‌ಲೋಡ್',
      suggestTranslation: 'ಅನುವಾದ ಸೂಚಿಸಿ',
      offlineReady: 'ಆಫ್‌ಲೈನ್ ಸಿದ್ಧ',
      coverage: '8 ಭಾಷೆಗಳ ಲಭ್ಯತೆ',
      copyCommands: 'ಕಮಾಂಡ್‌ಗಳನ್ನು ನಕಲಿಸಿ',
      copied: 'ನಕಲಿಸಲಾಗಿದೆ!',
      share: 'ಹಂಚಿಕೊಳ್ಳಿ',
      bookmark: 'ಬುಕ್‌ಮಾರ್ಕ್',
      bookmarked: 'ಬುಕ್‌ಮಾರ್ಕ್ ಮಾಡಲಾಗಿದೆ',
      clearFilter: 'ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ',
      keywords: 'ಪ್ರಮುಖ ಪದಗಳು',
      citations: 'ದೃಢೀಕೃತ ಶಾಸನ ಆಧಾರಗಳು ಮತ್ತು ಉಲ್ಲೇಖಗಳು',
      backToHome: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ'
    },
    stats: {
      title: 'ಸಂಶೋಧನಾ ಅಂಕಿಅಂಶಗಳು',
      subtitle: 'ಡೇಟಾಬೇಸ್ ದಾಖಲೆಗಳಿಂದ ನೇರವಾಗಿ ಲೆಕ್ಕಹಾಕಲಾದ ನೈಜ ವಿವರಗಳು',
      articles: 'ಐತಿಹಾಸಿಕ ಲೇಖನಗಳು',
      documents: 'ಡಿಜಿಟಲೀಕೃತ ದಾಖಲೆಗಳು',
      photos: 'ಐತಿಹಾಸಿಕ ಛಾಯಾಚಿತ್ರಗಳು',
      inscriptions: 'ಪರಿಶೀಲಿಸಿದ ಶಾಸನಗಳು',
      translations: 'ಪ್ರಕಟಿತ ಭಾಷಾಂತರಗಳು',
      members: 'ನೋಂದಾಯಿತ ಸದಸ್ಯರು',
      events: 'ಸಮುದಾಯ ಕಾರ್ಯಕ್ರಮಗಳು',
    },
    documentary: {
      badge: 'ಪರಿಶೀಲಿಸಿದ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ಜ್ಞಾನ ಭಂಡಾರ',
      title: 'ಸೂರ್ಯವಂಶ ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ ಮತ್ತು ಸಂಶೋಧನಾ ಸೂಚ್ಯಂಕ',
      subtitle: 'ಶಾಸನ ಪುರಾವೆಗಳು, ಪುರಾತತ್ವ ವಿವರಗಳು, ಸಾಮ್ರಾಜ್ಯದ ನಕ್ಷೆಗಳು ಮತ್ತು ವಿದ್ವಾಂಸರ ಅಧ್ಯಯನಗಳು.',
      searchPlaceholder: 'ಶೀರ್ಷಿಕೆ, ರಾಜ, ಪ್ರದೇಶ ಅಥವಾ ಪ್ರಮುಖ ಪದದಿಂದ ಹುಡುಕಿ...',
      monographsList: 'ಐತಿಹಾಸಿಕ ಲೇಖನಗಳು',
      citationsTitle: 'ದೃಢೀಕೃತ ಶಾಸನ ಆಧಾರಗಳು ಮತ್ತು ಮೂಲಗಳು',
      keywordsLabel: 'ಕೀವರ್ಡ್‌ಗಳು:',
      emptySelection: 'ಓದಲು ಪ್ರಾರಂಭಿಸಲು ಪಟ್ಟಿಯಿಂದ ಲೇಖನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      authorLabel: 'ಲೇಖಕರು / ಇತಿಹಾಸಕಾರರು',
      dateLabel: 'ಪ್ರಕಟಣೆಯ ದಿನಾಂಕ',
      translationNotice: 'ಈ ಲೇಖನವನ್ನು ಅದರ ಮೂಲ ಭಾಷೆಯಲ್ಲಿ ತೋರಿಸಲಾಗುತ್ತಿದೆ. ನಿಮ್ಮ ಆಯ್ಕೆಯ ಭಾಷೆಯಲ್ಲಿ ಅನುವಾದವು ಸಂಪಾದಕೀಯ ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ.',
      languageSwitchLabel: 'ಲಭ್ಯವಿರುವ ಭಾಷಾಂತರಗಳು (8 ಭಾಷೆಗಳು):',
      allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
      categoryOdraDesha: 'ಓಡ್ರ ದೇಶ',
      categoryGajapathiKings: 'ಗಜಪತಿ ರಾಜರು',
      categoryRoyalGenealogy: 'ರಾಜವಂಶಾವಳಿ',
      categoryResearchArticles: 'ಸಂಶೋಧನಾ ಲೇಖನಗಳು',
      sourceTypes: {
        primarySource: 'ಪ್ರಾಥಮಿಕ ತಾಮ್ರಶಾಸನ',
        scholarlyBook: 'ವಿದ್ವತ್ಪೂರ್ಣ ಐತಿಹಾಸಿಕ ಗ್ರಂಥ',
        inscription: 'ಶಿಲಾಶಾಸನ',
        archaeologicalRecord: 'ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ದಾಖಲೆ',
        peerReviewed: 'ಸಂಶೋಧನಾ ನಿಯತಕಾಲಿಕೆ',
        oralHistory: 'ಮೌಖಿಕ ಪರಂಪರೆ',
        communityTradition: 'ಸಮುದಾಯದ ಜೀವಂತ ಸಂಪ್ರದಾಯ',
      },
    },
    exportModal: {
      title: 'ಪೋರ್ಟಲ್ ಪ್ರಾಜೆಕ್ಟ್ ರಫ್ತು ಮತ್ತು ಡೌನ್‌ಲೋಡ್',
      subtitle: 'ಸಂಪೂರ್ಣ ಕೋಡ್, ಡೇಟಾಬೇಸ್, 8 ಭಾಷೆಗಳ ಅನುವಾದ ಮತ್ತು ಆಂಡ್ರಾಯ್ಡ್ ಮಾರ್ಗದರ್ಶಿ',
      downloadTab: 'ಜಿಪ್ ಪ್ಯಾಕೇಜ್ ಡೌನ್‌ಲೋಡ್',
      androidTab: 'ಆಂಡ್ರಾಯ್ಡ್ ಫೋನ್ ಗೈಡ್',
      githubTab: 'ಉಚಿತ ಗಿಟ್‌ಹಬ್ ರಫ್ತು',
      downloadBtn: 'ಸಂಪೂರ್ಣ ಜಿಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
      readyNotice: 'ರಿಯಾಕ್ಟ್ 19, ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಬ್ಯಾಕೆಂಡ್ ಮತ್ತು ಡೇಟಾಬೇಸ್ ವಿವರಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.',
      packageIncludes: 'ಪ್ಯಾಕೇಜ್‌ನಲ್ಲಿ ಏನಿದೆ:',
      frontendDesc: 'ರಿಯಾಕ್ಟ್ 19, ಟೈಲ್‌ವಿಂಡ್ v4, ರಾಜಮನೆತನದ UI, 30+ ಪುಟಗಳು ಮತ್ತು ವಂಶಾವಳಿ ವೃಕ್ಷ.',
      backendDesc: 'ಎಕ್ಸ್‌ಪ್ರೆಸ್ TypeScript API, ದೃಢೀಕರಣ ಮತ್ತು ಹುಡುಕಾಟ ಮಾರ್ಗಗಳು.',
      databaseDesc: 'ರಾಜವಂಶಗಳು ಮತ್ತು ಶಾಸನಗಳ ವಿವರಗಳಿರುವ ಡೇಟಾಬೇಸ್.',
      translationDesc: '8 ಪ್ರಮುಖ ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಅನುವಾದ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ.',
      androidNotice: 'ಟರ್ಮಕ್ಸ್ ಮೂಲಕ ಆಂಡ್ರಾಯ್ಡ್ ಫೋನ್‌ನಲ್ಲಿ ಈ ಪೋರ್ಟಲ್ ಅನ್ನು ರನ್ ಮಾಡಬಹುದು.',
      copyCmds: 'ಕಮಾಂಡ್‌ಗಳನ್ನು ನಕಲಿಸಿ',
      githubNotice: 'ಕ್ಲೌಡ್ ಬ್ಯಾಕಪ್‌ಗಾಗಿ ಪ್ರಾಜೆಕ್ಟ್ ಅನ್ನು ಗಿಟ್‌ಹಬ್‌ಗೆ ಸೇರಿಸಿ.',
      closeBtn: 'ಮುಚ್ಚು'
    },
    translationModal: {
      title: 'ಅನುವಾದ ಸಲ್ಲಿಸಿ',
      subtitle: '8 ಭಾಷೆಗಳಲ್ಲಿ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳ ಅನುವಾದಕ್ಕೆ ಕೊಡುಗೆ ನೀಡಿ',
      sourceDoc: 'ಮೂಲ ದಾಖಲೆ:',
      targetLangLabel: 'ಗುರಿ ಅನುವಾದ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      titleLabel: 'ಅನುವಾದಿತ ಶೀರ್ಷಿಕೆ',
      summaryLabel: 'ಸಾರಾಂಶ',
      contentLabel: 'ಪೂರ್ಣ ಅನುವಾದಿತ ವಿವರ',
      authorLabel: 'ಅನುವಾದಕರ ಹೆಸರು / ಕೃಪೆ',
      disclaimer: 'ಸಲ್ಲಿಸಿದ ಎಲ್ಲಾ ಅನುವಾದಗಳನ್ನು ನಿಖರತೆಗಾಗಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.',
      cancelBtn: 'ರದ್ದುಮಾಡು',
      submitBtn: 'ಅನುವಾದ ಉಳಿಸು',
      savingBtn: 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...',
      successNotice: 'ಅನುವಾದವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!'
    }
  },

  // 5. TAMIL (ta)
  ta: {
    siteTitle: 'சூரியவம்ச ஒடியராஜு சத்திரியர்',
    siteSubtitle: 'வரலாற்று ஆவணப்படம், அரச மரபு மற்றும் உலகளாவிய சமூக தளம்',
    nav: {
      home: 'முகப்பு',
      about: 'திட்டம் பற்றி',
      documentary: 'வரலாற்று ஆவணப்படம்',
      odraDesha: 'ஓட்ர தேசம்',
      dynasties: 'அரச வம்சங்கள்',
      gajapathiKings: 'கஜபதி மன்னர்கள்',
      maps: 'பேரரசுகள் மற்றும் வரைபடங்கள்',
      genealogy: 'அரச மரபுவழி',
      timeline: 'வரலாற்று காலவரிசை',
      inscriptions: 'கல்வெட்டுகள் மற்றும் தொல்பொருளியல்',
      temples: 'கோயில்கள் மற்றும் நினைவுச்சின்னங்கள்',
      culture: 'பண்பாடு மற்றும் பாரம்பரியம்',
      literature: 'இலக்கியம் மற்றும் வெளியீடுகள்',
      gallery: 'வரலாற்று காட்சிக்கூடம்',
      research: 'ஆராய்ச்சிக் கட்டுரைகள்',
      directory: 'சமூக அடைவு',
      activities: 'சமூக நடவடிக்கைகள்',
      events: 'நிகழ்வுகள் மற்றும் அறிவிப்புகள்',
      references: 'வரலாற்று சான்றுகள்',
      contact: 'தொடர்புகொள்ள',
      login: 'உறுப்பினர் உள்நுழைவு',
      register: 'கணக்கு உருவாக்க',
      dashboard: 'உறுப்பினர் பலகை',
      admin: 'நிர்வாக பலகை',
      submitResearch: 'ஆராய்ச்சியை சமர்ப்பிக்க',
      documentedFigures: 'ஆவணப்படுத்தப்பட்ட வரலாற்று ஆளுமைகள்',
      historicalPersons: 'வரலாற்று மாந்தர்கள் & நாயகர்கள்',
      communityProminentPersons: 'சமூகத்தின் முக்கிய பிரமுகர்கள்',
      communityHeritage: 'சமூக பாரம்பரியம்',
      communitySurnames: 'சமூக குடும்பப் பெயர்கள் (Community-Surnames)',
      kalingaWar: 'கலிங்கப் போர் (கி.மு. 261)',
      logout: 'வெளியேறு',
      exportZip: 'திட்ட ஜிப் பதிவிறக்கம்'
    },
    publisher: {
      designedAndPublishedBy: 'வலைத்தள வடிவமைப்பு மற்றும் வெளியீடு',
      publisherName: 'டாக்டர் ஜி. சத்யநாராயண ராஜு',
      leaderTitle: 'சூரியவம்ச ஒட்டியராஜு சத்திரிய சமூகத்தின் பெருந்தலைவர்',
      leaderBio: 'சூரியவம்ச ஒட்டியராஜு சத்திரிய வரலாற்று ஆவணப்படுத்துதல், கல்வெட்டு பாதுகாப்பு மற்றும் அகில பாரத கலாச்சார ஒருங்கிணைப்பின் முதன்மை வழிகாட்டி.',
      contactWhatsApp: 'வாட்ஸ்அப்பில் தொடர்புகொள்ள (+91 9480112897)',
      callMobile: '+91 9480112897',
      whatsappGreeting: 'வணக்கம் டாக்டர் ஜி. சத்யநாராயண ராஜு ஜி, சூரியவம்ச ஒட்டியராஜு சத்திரிய வரலாற்று தளம் குறித்து'
    },
    hero: {
      badge: 'கல்வெட்டு சான்றுகள் மற்றும் வரலாற்று ஆய்வு',
      headline: 'சூரியவம்ச ஒடியராஜு சத்திரியரின் வரலாறு, மரபு மற்றும் பெருமையை கண்டறியுங்கள்',
      subtitle: 'வரலாற்று ஆராய்ச்சி, கஜபதி மன்னர்களின் கொடை மற்றும் சமூக பாரம்பரியத்திற்கான முழுமையான டிஜிட்டல் களஞ்சியம்.',
      exploreBtn: 'ஆவணப்படத்தை காண்க',
      dynastiesBtn: 'அரச வம்சங்களை அறிக',
      galleryBtn: 'காட்சிக்கூடம்',
      joinBtn: 'சமூகத்தில் இணையுங்கள்',
      exportBtn: 'திட்ட ஜிப் பதிவிறக்கம்'
    },
    evidenceNotice: {
      title: 'வரலாற்று சான்றுகளின் நம்பகத்தன்மை',
      description: 'உறுதிப்படுத்தப்படாத மரபு கதைகள் வரலாற்று உண்மைகளாக காட்டப்படுவதில்லை. கல்வெட்டுகள், அறிஞர்களின் ஆய்வுகள் மற்றும் வாய்மொழி வரலாறுகள் தனித்தனியாக குறிப்பிடப்படுகின்றன.',
    },
    common: {
      searchPlaceholder: 'கல்வெட்டுகள், அரசர்கள் அல்லது கட்டுரைகளை தேடுங்கள்...',
      readMore: 'முழு விவரம் படிக்க',
      verified: 'சரிபார்க்கப்பட்ட கல்வெட்டு சான்று',
      scholarly: 'ஆய்வறிஞர்களின் விளக்கம்',
      traditional: 'பாரம்பரிய வம்சாவளி பதிவு',
      oral: 'வாய்மொழி வரலாறு',
      belief: 'சமூக நம்பிக்கை',
      filterBy: 'வடிகட்டுக',
      all: 'அனைத்து பதிவுகள்',
      viewDetails: 'விவரங்களை பார்க்க',
      source: 'மூலம் மற்றும் மேற்கோள்',
      citation: 'மேற்கோள்',
      period: 'காலம்',
      location: 'இடம்',
      status: 'சரிபார்ப்பு நிலை',
      close: 'மூடு',
      submit: 'சமர்ப்பி',
      cancel: 'ரத்து',
      save: 'சேமி',
      loading: 'பதிவுகள் ஏற்றப்படுகின்றன...',
      noResults: 'பதிவுகள் எதுவும் கிடைக்கவில்லை.',
      language: 'மொழி',
      exportZip: 'ஜிப் ஏற்றுமதி',
      suggestTranslation: 'மொழிபெயர்ப்பு பரிந்துரைக்கவும்',
      offlineReady: 'ஆஃப்லைன் தயார்',
      coverage: '8 மொழிகள் கவரேஜ்',
      copyCommands: 'கட்டளைகளை நகலெடு',
      copied: 'நகலெடுக்கப்பட்டது!',
      share: 'பகிர்',
      bookmark: 'புக்மார்க்',
      bookmarked: 'புக்மார்க் செய்யப்பட்டது',
      clearFilter: 'வடிப்பானை நீக்கு',
      keywords: 'முக்கிய சொற்கள்',
      citations: 'சரிபார்க்கப்பட்ட கல்வெட்டு மேற்கோள்கள்',
      backToHome: 'முகப்பிற்கு திரும்புக'
    },
    stats: {
      title: 'ஆராய்ச்சி புள்ளிவிவரங்கள்',
      subtitle: 'தரவுத்தளத்தில் இருந்து பெறப்பட்ட உண்மை தகவல்கள்',
      articles: 'வரலாற்றுக் கட்டுரைகள்',
      documents: 'மின்மயமாக்கப்பட்ட ஆவணங்கள்',
      photos: 'பழைய புகைப்படங்கள்',
      inscriptions: 'ஆய்வுசெய்த கல்வெட்டுகள்',
      translations: 'மொழிபெயர்ப்புகள்',
      members: 'பதிவுசெய்த உறுப்பினர்கள்',
      events: 'சமூக நிகழ்வுகள்',
    },
    documentary: {
      badge: 'சரிபார்க்கப்பட்ட வரலாற்று ஆவணங்கள் & அறிவு களஞ்சியம்',
      title: 'சூரியவம்ச வரலாற்று ஆவணப்படம் & ஆராய்ச்சி குறியீடு',
      subtitle: 'கல்வெட்டு ஆய்வுகள், தொல்பொருள் சான்றுகள் மற்றும் வரலாற்று வரைபடங்கள்.',
      searchPlaceholder: 'தலைப்பு, மன்னர் அல்லது முக்கிய சொல் மூலம் தேடுங்கள்...',
      monographsList: 'வரலாற்று ஆய்வுக் கட்டுரைகள்',
      citationsTitle: 'சரிபார்க்கப்பட்ட வரலாற்று சான்றுகள் & மூலங்கள்',
      keywordsLabel: 'முக்கிய சொற்கள்:',
      emptySelection: 'படிக்க தொடங்க ஒரு கட்டுரையை தேர்ந்தெடுக்கவும்.',
      authorLabel: 'ஆசிரியர் / வரலாற்றாசிரியர்',
      dateLabel: 'வெளியீட்டு தேதி',
      translationNotice: 'இந்தக் கட்டுரை அதன் மூல மொழியில் காட்டப்படுகிறது. நீங்கள் தேர்ந்தெடுத்த மொழியில் மொழிபெயர்ப்பு ஆய்வில் உள்ளது.',
      languageSwitchLabel: 'கிடைக்கும் மொழிபெயர்ப்புகள் (8 மொழிகள்):',
      allCategories: 'அனைத்து பிரிவுகள்',
      categoryOdraDesha: 'ஓட்ர தேசம்',
      categoryGajapathiKings: 'கஜபதி மன்னர்கள்',
      categoryRoyalGenealogy: 'அரச மரபுவழி',
      categoryResearchArticles: 'ஆராய்ச்சிக் கட்டுரைகள்',
      sourceTypes: {
        primarySource: 'முதன்மை செப்பேடு கொடை',
        scholarlyBook: 'ஆய்வு நூல்',
        inscription: 'கல்வெட்டு ஆவணம்',
        archaeologicalRecord: 'தொல்லியல் ஆய்வு பதிவு',
        peerReviewed: 'ஆய்விதழ் கட்டுரை',
        oralHistory: 'வாய்மொழி பாரம்பரியம்',
        communityTradition: 'சமூக மரபு பதிவு',
      },
    },
    exportModal: {
      title: 'திட்டத்தை ஏற்றுமதி செய்து பதிவிறக்கவும்',
      subtitle: 'முழு மூலக் குறியீடு, தரவுத்தளம், 8 மொழிகள் மற்றும் ஆண்ட்ராய்டு வழிகாட்டி',
      downloadTab: 'ஜிப் தொகுப்பு பதிவிறக்கம்',
      androidTab: 'ஆண்ட்ராய்டு போன் வழிகாட்டி',
      githubTab: 'இலவச கிட்ஹப் ஏற்றுமதி',
      downloadBtn: 'முழு ஜிப்பை பதிவிறக்குங்கள்',
      readyNotice: 'ரியாக்ட் 19, எக்ஸ்பிரஸ் பின்தளம் மற்றும் சோதனைகள் உள்ளடங்கியுள்ளன.',
      packageIncludes: 'தொகுப்பில் உள்ளவை:',
      frontendDesc: 'ரியாக்ட் 19, டெயில்விண்ட் v4, ராயல் UI, 30+ பக்கங்கள் மற்றும் மரபுவழி மரம்.',
      backendDesc: 'எக்ஸ்பிரஸ் TypeScript API, அங்கீகாரம் மற்றும் தேடல் வழிகள்.',
      databaseDesc: 'அரச வம்சங்கள் மற்றும் கல்வெட்டுகளின் தரவுத்தளம்.',
      translationDesc: '8 முக்கிய இந்திய மொழிகளில் மொழிபெயர்ப்பு மேலாண்மை.',
      androidNotice: 'டெர்மக்ஸ் மூலம் ஆண்ட்ராய்டு போனில் இந்த போர்ட்டலை இயக்கலாம்.',
      copyCmds: 'கட்டளைகளை நகலெடு',
      githubNotice: 'கிளவுட் காப்புப்பிரதிக்காக கிட்ஹப்பில் குறியீட்டை பதிவேற்றவும்.',
      closeBtn: 'மூடு'
    },
    translationModal: {
      title: 'மொழிபெயர்ப்பை பங்களிக்கவும்',
      subtitle: '8 மொழிகளில் அரச ஆவணங்களை மொழிபெயர்க்க உதவுங்கள்',
      sourceDoc: 'மூல ஆவணம்:',
      targetLangLabel: 'இலக்கு மொழிபெயர்ப்பு மொழியைத் தேர்ந்தெடுக்கவும்',
      titleLabel: 'மொழிபெயர்க்கப்பட்ட தலைப்பு',
      summaryLabel: 'சுருக்கம்',
      contentLabel: 'முழு மொழிபெயர்ப்பு உள்ளடக்கம்',
      authorLabel: 'மொழிபெயர்ப்பாளர் பெயர்',
      disclaimer: 'சமர்ப்பிக்கப்பட்ட அனைத்தும் வரலாற்று துல்லியத்திற்காக சரிபார்க்கப்படும்.',
      cancelBtn: 'ரத்து',
      submitBtn: 'மொழிபெயர்ப்பை சேமி',
      savingBtn: 'சேமிக்கிறது...',
      successNotice: 'மொழிபெயர்ப்பு வெற்றிகரமாக சேமிக்கப்பட்டது!'
    }
  },

  // 6. MARATHI (mr)
  mr: {
    siteTitle: 'सूर्यवंश ओडियाराजू क्षत्रिय',
    siteSubtitle: 'ऐतिहासिक माहितीपट, राजेशाही वारसा आणि जागतिक समुदाय पोर्टल',
    nav: {
      home: 'मुख्यपृष्ठ',
      about: 'प्रकल्पाबद्दल',
      documentary: 'ऐतिहासिक माहितीपट',
      odraDesha: 'ओड्र देश',
      dynasties: 'शाही राजवंश',
      gajapathiKings: 'गजपती राजे',
      maps: 'साम्राज्य आणि नकाशे',
      genealogy: 'राजेशाही वंशावळ',
      timeline: 'ऐतिहासिक कालपट',
      inscriptions: 'शिलालेख आणि पुरातत्व',
      temples: 'मंदिरे आणि स्मारके',
      culture: 'संस्कृती आणि परंपरा',
      literature: 'साहित्य आणि प्रकाशने',
      gallery: 'ऐतिहासिक दालन',
      research: 'संशोधन लेख',
      directory: 'समुदाय निर्देशिका',
      activities: 'समुदाय उपक्रम',
      events: 'कार्यक्रम आणि घोषणा',
      references: 'ऐतिहासिक संदर्भ',
      contact: 'संपर्क',
      login: 'सदस्य लॉगिन',
      register: 'खाते तयार करा',
      dashboard: 'सदस्य डॅशबोर्ड',
      admin: 'प्रशासन कक्ष',
      submitResearch: 'संशोधन सादर करा',
      documentedFigures: 'दस्तावेजीकृत ऐतिहासिक व्यक्ती',
      historicalPersons: 'ऐतिहासिक व्यक्ती आणि विभूती',
      communityProminentPersons: 'समाजातील प्रमुख व्यक्तिमत्त्वे',
      communityHeritage: 'समुदाय वारसा',
      communitySurnames: 'समुदाय आडनावे (Community-Surnames)',
      kalingaWar: 'कलिंग युद्ध (इ.स.पू. २६१)',
      logout: 'लॉगआउट',
      exportZip: 'प्रकल्प झिप डाउनलोड'
    },
    publisher: {
      designedAndPublishedBy: 'वेबसाइट रचना व प्रकाशन',
      publisherName: 'डॉ. जी. सत्यनारायण राजू',
      leaderTitle: 'सूर्यवंश ओडियाराजू क्षत्रिय समाजाचे नेते',
      leaderBio: 'सूर्यवंश ओडियाराजू क्षत्रिय वारशाचे ऐतिहासिक दस्तावेजीकरण, शिलालेख संवर्धन आणि अखिल भारतीय सांस्कृतिक ऐक्याचे मार्गदर्शक नेतृत्व.',
      contactWhatsApp: 'व्हॉट्सॲपवर संपर्क साधा (+91 9480112897)',
      callMobile: '+91 9480112897',
      whatsappGreeting: 'नमस्ते डॉ. जी. सत्यनारायण राजू जी, सूर्यवंश ओडियाराजू क्षत्रिय ऐतिहासिक पोर्टल संदर्भात'
    },
    hero: {
      badge: 'शिलालेखीय पुरावे आणि ऐतिहासिक संशोधन',
      headline: 'सूर्यवंश ओडियाराजू क्षत्रियांचा इतिहास, गौरव आणि वारसा शोधा',
      subtitle: 'ऐतिहासिक संशोधन, सांस्कृतिक जतन आणि गजपती राजवटीच्या वारशासाठी एक डिजिटल संग्रहालय.',
      exploreBtn: 'माहितीपट पाहा',
      dynastiesBtn: 'राजवंश जाणून घ्या',
      galleryBtn: 'चित्रदालन',
      joinBtn: 'समुदायात सामील व्हा',
      exportBtn: 'प्रकल्प झिप डाउनलोड'
    },
    evidenceNotice: {
      title: 'ऐतिहासिक पुराव्यांचे प्रमाण',
      description: 'अप्रामाणिक परंपरा ऐतिहासिक तथ्य म्हणून सादर केल्या जात नाहीत. आम्ही शिलालेख पुरावे, इतिहासकारांचे निष्कर्ष आणि लोकपरंपरा यांच्यात स्पष्ट भेद ठेवतो.',
    },
    common: {
      searchPlaceholder: 'शिलालेख, राजे किंवा लेख शोधा...',
      readMore: 'पूर्ण माहिती वाचा',
      verified: 'प्रमाणित शिलालेख पुरावा',
      scholarly: 'विद्वानांचे ऐतिहासिक विश्लेषण',
      traditional: 'पारंपरिक वंशावळ नोंद',
      oral: 'मौखिक इतिहास',
      belief: 'समुदाय श्रद्धा / परंपरा',
      filterBy: 'फिल्टर',
      all: 'सर्व नोंदी',
      viewDetails: 'तपशील पाहा',
      source: 'स्रोत आणि संदर्भ',
      citation: 'संदर्भ',
      period: 'कालखंड',
      location: 'स्थान',
      status: 'पडताळणी स्थिती',
      close: 'बंद करा',
      submit: 'सादर करा',
      cancel: 'रद्द करा',
      save: 'जतन करा',
      loading: 'माहिती लोड होत आहे...',
      noResults: 'कोणतेही निकाल आढळले नाहीत.',
      language: 'भाषा',
      exportZip: 'झिप डाउनलोड',
      suggestTranslation: 'भाषांतराची शिफारस करा',
      offlineReady: 'ऑफलाइन सज्ज',
      coverage: '8 भाषा व्याप्ती',
      copyCommands: 'कमांड कॉपी करा',
      copied: 'कॉपी झाले!',
      share: 'शेअर करा',
      bookmark: 'बुकमार्क',
      bookmarked: 'बुकमार्क केले',
      clearFilter: 'फिल्टर काढा',
      keywords: 'महत्त्वाचे शब्द',
      citations: 'प्रमाणित शिलालेख संदर्भ आणि पुरावे',
      backToHome: 'मुख्यपृष्ठावर परत या'
    },
    stats: {
      title: 'संशोधन आकडेवारी',
      subtitle: 'डेटाबेसमधून थेट संकलित केलेली खरी आकडेवारी',
      articles: 'संशोधन लेख',
      documents: 'डिजिटल दस्तऐवज',
      photos: 'ऐतिहासिक छायाचित्रे',
      inscriptions: 'तपासलेले शिलालेख',
      translations: 'प्रकाशित भाषांतरे',
      members: 'नोंदणीकृत सदस्य',
      events: 'समुदाय कार्यक्रम',
    },
    documentary: {
      badge: 'प्रमाणित ऐतिहासिक दस्तऐवज आणि संशोधन संग्रह',
      title: 'सूर्यवंश ऐतिहासिक माहितीपट आणि संदर्भ अनुक्रमणिका',
      subtitle: 'शिलालेखीय पुरावे, ऐतिहासिक नकाशे, उत्खनन नोंदी आणि विद्वानांचे संशोधन.',
      searchPlaceholder: 'शीर्षक, राजा किंवा महत्त्वाच्या शब्दाने शोधा...',
      monographsList: 'ऐतिहासिक संशोधन लेख',
      citationsTitle: 'प्रमाणित ऐतिहासिक पुरावे आणि संदर्भ',
      keywordsLabel: 'कीवर्ड्स:',
      emptySelection: 'वाचण्यासाठी सूचीमधून एका लेखाची निवड करा.',
      authorLabel: 'लेखक / इतिहासकार',
      dateLabel: 'प्रकाशन तारीख',
      translationNotice: 'हा लेख मूळ भाषेत दाखवला जात आहे. आपण निवडलेल्या भाषेत भाषांतर संपादकीय पुनरावलोकनाधीन आहे.',
      languageSwitchLabel: 'उपलब्ध भाषांतरे (8 भाषा):',
      allCategories: 'सर्व श्रेणी',
      categoryOdraDesha: 'ओड्र देश',
      categoryGajapathiKings: 'गजपती राजे',
      categoryRoyalGenealogy: 'राजेशाही वंशावळ',
      categoryResearchArticles: 'संशोधन लेख',
      sourceTypes: {
        primarySource: 'प्राथमिक ताम्रपट दानपत्र',
        scholarlyBook: 'विद्वानांचे ऐतिहासिक पुस्तक',
        inscription: 'शिलालेख दस्तऐवज',
        archaeologicalRecord: 'पुरातत्व सर्वेक्षण नोंद',
        peerReviewed: 'शोधपत्रिका',
        oralHistory: 'मौखिक परंपरा',
        communityTradition: 'जीवंत सांस्कृतिक वारसा',
      },
    },
    exportModal: {
      title: 'प्रकल्प निर्यात आणि डाउनलोड करा',
      subtitle: 'संपूर्ण कोड, डेटाबेस, 8 भाषांची भाषांतरे आणि अँड्रॉइड मार्गदर्शक',
      downloadTab: 'झिप पॅकेज डाउनलोड',
      androidTab: 'अँड्रॉइड फोन मार्गदर्शक',
      githubTab: 'विनामूल्य गिटहब निर्यात',
      downloadBtn: 'पूर्ण झिप डाउनलोड करा',
      readyNotice: 'रिएक्ट 19, एक्सप्रेस बॅकएंड, डेटाबेस आणि सर्व चाचण्या समाविष्ट आहेत.',
      packageIncludes: 'पॅकेजमध्ये काय समाविष्ट आहे:',
      frontendDesc: 'रिएक्ट 19, टेलविंड v4, रॉयल हेरिटेज UI, 30+ पृष्ठे आणि वंशावळ वृक्ष.',
      backendDesc: 'एक्सप्रेस TypeScript API, प्रमाणीकरण, RBAC आणि शोध मार्ग.',
      databaseDesc: 'राजवंश आणि शिलालेखांचा समावेश असलेला डेटाबेस.',
      translationDesc: '8 प्रमुख भारतीय भाषांमध्ये भाषांतर व्यवस्थापन.',
      androidNotice: 'टर्मक्सच्या साहाय्याने अँड्रॉइड फोनवर हा प्रकल्प चालवा.',
      copyCmds: 'कमांड कॉपी करा',
      githubNotice: 'क्लाउड बॅकअपसाठी प्रकल्प गिटहबवर अपलोड करा.',
      closeBtn: 'बंद करा'
    },
    translationModal: {
      title: 'भाषांतरात योगदान द्या',
      subtitle: '8 भाषांमध्ये ऐतिहासिक नोंदींच्या भाषांतरासाठी मदत करा',
      sourceDoc: 'मूळ दस्तऐवज:',
      targetLangLabel: 'लक्ष्य भाषा निवडा',
      titleLabel: 'भाषांतरित शीर्षक',
      summaryLabel: 'थोडक्यात सारांश',
      contentLabel: 'पूर्ण भाषांतरित मजकूर',
      authorLabel: 'भाषांतरकाराचे नाव',
      disclaimer: 'सादर केलेल्या सर्व भाषांतरांची ऐतिहासिक अचूकतेसाठी तपासणी केली जाते.',
      cancelBtn: 'रद्द करा',
      submitBtn: 'भाषांतर जतन करा',
      savingBtn: 'जतन करत आहे...',
      successNotice: 'भाषांतर यशस्वीरीत्या जतन केले गेले!'
    }
  },

  // 7. ODIA (or)
  or: {
    siteTitle: 'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ',
    siteSubtitle: 'ଐତିହାସିକ ପ୍ରମାଣ୍ୟ ଚିତ୍ର, ରାଜକୀୟ ଐତିହ୍ୟ ଓ ବିଶ୍ୱ ସମ୍ପ୍ରଦାୟ ପୋର୍ଟାଲ',
    nav: {
      home: 'ମୂଳପୃଠା',
      about: 'ପ୍ରକଳ୍ପ ସମ୍ପର୍କରେ',
      documentary: 'ଐତିହାସିକ ପ୍ରମାଣ୍ୟ ଚିତ୍ର',
      odraDesha: 'ଓଡ଼୍ର ଦେଶ',
      dynasties: 'ରାଜବଂଶ',
      gajapathiKings: 'ଗଜପତି ରାଜାମାନେ',
      maps: 'ସାମ୍ରାଜ୍ୟ ଓ ମାନଚିତ୍ର',
      genealogy: 'ରାଜକୀୟ ବଂଶାବଳୀ',
      timeline: 'ଐତିହାସିକ ସମୟରେଖା',
      inscriptions: 'ଶିଳାଲେଖ ଓ ପ୍ରତ୍ନତତ୍ତ୍ୱ',
      temples: 'ମନ୍ଦିର ଓ କୀର୍ତ୍ତିରାଜି',
      culture: 'ସଂସ୍କୃତି ଓ ପରମ୍ପରା',
      literature: 'ସାହିତ୍ୟ ଓ ପ୍ରକାଶନ',
      gallery: 'ଐତିହାସିକ ଗ୍ୟାଲେରୀ',
      research: 'ଗବେଷଣା ପ୍ରବନ୍ଧ',
      directory: 'ସମ୍ପ୍ରଦାୟ ନିର୍ଦ୍ଦେଶିକା',
      activities: 'ସାମାଜିକ କାର୍ଯ୍ୟକଳାପ',
      events: 'କାର୍ଯ୍ୟକ୍ରମ ଓ ଘୋଷଣା',
      references: 'ଐତିହାସିକ ପ୍ରମାଣ',
      contact: 'ଯୋଗାଯୋଗ',
      login: 'ସଦସ୍ୟ ଲଗ୍ଇନ୍',
      register: 'ଖାତା ଖୋଲନ୍ତୁ',
      dashboard: 'ସଦସ୍ୟ ଡ୍ୟାସବୋର୍ଡ',
      admin: 'ପ୍ରଶାସନ ପ୍ୟାନେଲ',
      submitResearch: 'ଗବେଷଣା ଦାଖଲ କରନ୍ତୁ',
      documentedFigures: 'ପ୍ରାମାଣିକ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ',
      historicalPersons: 'ଐତିହାସିକ ବ୍ୟକ୍ତି ଓ ନାୟକ',
      communityProminentPersons: 'ସମୁଦାୟର ପ୍ରମୁଖ ବ୍ୟକ୍ତିବିଶେଷ',
      communityHeritage: 'ସମ୍ପ୍ରଦାୟ ଐତିହ୍ୟ',
      communitySurnames: 'ସମ୍ପ୍ରଦାୟ ସାଙ୍ଗିଆ (Community-Surnames)',
      kalingaWar: 'କଳିଙ୍ଗ ଯୁଦ୍ଧ (ଖ୍ରୀ.ପୂ. ୨୬୧)',
      logout: 'ଲଗ୍ଆଉଟ୍',
      exportZip: 'ପ୍ରକଳ୍ପ ଜିପ୍ ଡାଉନଲୋଡ୍'
    },
    publisher: {
      designedAndPublishedBy: 'ୱେବସାଇଟ୍ ନିର୍ମାଣ ଓ ପ୍ରକାଶନ',
      publisherName: 'ଡକ୍ଟର ଜି. ସତ୍ୟନାରାୟଣ ରାଜୁ',
      leaderTitle: 'ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ସମାଜର ମହାନେତା',
      leaderBio: 'ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଐତିହ୍ୟର ଡିଜିଟାଲ୍ ଐତିହାସିକ ଦସ୍ତାବିଜୀକରଣ, ଶିଳାଲେଖ ସଂରକ୍ଷଣ ତଥା ସର୍ବଭାରତୀୟ ସାଂସ୍କୃତିକ ଏକତାର ମାର୍ଗଦର୍ଶକ।',
      contactWhatsApp: 'ହ୍ୱାଟ୍ସଆପ୍‌ରେ ଯୋଗାଯୋଗ କରନ୍ତୁ (+91 9480112897)',
      callMobile: '+91 9480112897',
      whatsappGreeting: 'ନମସ୍କାର ଡକ୍ଟର ଜି. ସତ୍ୟନାରାୟଣ ରାଜୁ ଜୀ, ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଐତିହ୍ୟ ପୋର୍ଟାଲ୍ ସମ୍ପର୍କରେ'
    },
    hero: {
      badge: 'ପ୍ରାମାଣିକ ଶିଳାଲେଖ ଓ ଐତିହାସିକ ଗବେଷଣା',
      headline: 'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟଙ୍କ ଇତିହାସ, ଗୌରବ ଓ ଐତିହ୍ୟ ଆବିଷ୍କାର କରନ୍ତୁ',
      subtitle: 'ଐତିହାସିକ ଗବେଷଣା, ସାଂସ୍କୃତିକ ସଂରକ୍ଷଣ ଓ ଗଜପତି ରାଜବଂଶର ଐତିହ୍ୟ ପାଇଁ ଏକ ପ୍ରାମାଣିକ ଡିଜିଟାଲ ଅଭିଲେଖାଗାର।',
      exploreBtn: 'ପ୍ରମାଣ୍ୟ ଚିତ୍ର ଦେଖନ୍ତୁ',
      dynastiesBtn: 'ରାଜବଂଶ ବିଷୟରେ ଜାଣନ୍ତୁ',
      galleryBtn: 'ଐତିହାସିକ ଗ୍ୟାଲେରୀ',
      joinBtn: 'ସମ୍ପ୍ରଦାୟରେ ଯୋଗ ଦିଅନ୍ତୁ',
      exportBtn: 'ପ୍ରକଳ୍ପ ଜିପ୍ ଡାଉନଲୋଡ୍'
    },
    evidenceNotice: {
      title: 'ଐତିହାସିକ ପ୍ରମାଣ ଓ ସତ୍ୟନିଷ୍ଠା',
      description: 'ଅପ୍ରମାଣିତ ପରମ୍ପରା କିମ୍ବା ଦାବିଗୁଡ଼ିକୁ ଐତିହାସିକ ତଥ୍ୟ ଭାବେ ଉପସ୍ଥାପନ କରାଯାଏ ନାହିଁ। ଆମେ ଶିଳାଲେଖ ପ୍ରମାଣ, ଐତିହାସିକଙ୍କ ମତାମତ ଓ ଲୋକପରମ୍ପରା ମଧ୍ୟରେ ସ୍ପଷ୍ଟ ପାର୍ଥକ୍ୟ ରଖିଥାଉ।',
    },
    common: {
      searchPlaceholder: 'ଶିଳାଲେଖ, ରାଜା କିମ୍ବା ଐତିହାସିକ ତଥ୍ୟ ଖୋଜନ୍ତୁ...',
      readMore: 'ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ ପଢ଼ନ୍ତୁ',
      verified: 'ଯାଞ୍ଚ ହୋଇଥିବା ଶିଳାଲେଖ ପ୍ରମାଣ',
      scholarly: 'ଐତିହାସିକ ଗବେଷକଙ୍କ ବ୍ୟାଖ୍ୟା',
      traditional: 'ପାରମ୍ପରିକ ବଂଶାବଳୀ ବିବରଣୀ',
      oral: 'ମୌଖିକ ଇତିହାସ / ସ୍ମୃତି',
      belief: 'ସାମାଜିକ ବିଶ୍ୱାସ / ପରମ୍ପରା',
      filterBy: 'ଫିଲ୍ଟର୍ କରନ୍ତୁ',
      all: 'ସମସ୍ତ ରେକର୍ଡ',
      viewDetails: 'ବିସ୍ତୃତ ଦେଖନ୍ତୁ',
      source: 'ଉତ୍ସ ଓ ଆଧାର',
      citation: 'ଉଦ୍ଧୃତି',
      period: 'କାଳଖଣ୍ଡ',
      location: 'ସ୍ଥାନ',
      status: 'ଯାଞ୍ଚ ସ୍ଥିତି',
      close: 'ବନ୍ଦ କରନ୍ତୁ',
      submit: 'ଦାଖଲ କରନ୍ତୁ',
      cancel: 'ବାତିଲ୍',
      save: 'ସାଇତନ୍ତୁ',
      loading: 'ତଥ୍ୟ ଲୋଡ୍ ହେଉଛି...',
      noResults: 'କୌଣସି ତଥ୍ୟ ମିଳିଲା ନାହିଁ।',
      language: 'ଭାଷା',
      exportZip: 'ଜିପ୍ ଡାଉନଲୋଡ୍',
      suggestTranslation: 'ଅନୁବାଦ ପ୍ରସ୍ତାବ ଦିଅନ୍ତୁ',
      offlineReady: 'ଅଫଲାଇନ୍ ପ୍ରସ୍ତୁତ',
      coverage: '୮ ଭାଷା କଭରେଜ୍',
      copyCommands: 'କମାଣ୍ଡ୍ କପି କରନ୍ତୁ',
      copied: 'କପି ହୋଇଗଲା!',
      share: 'ଶେୟାର କରନ୍ତୁ',
      bookmark: 'ବୁକମାର୍କ',
      bookmarked: 'ବୁକମାର୍କ କରାଗଲା',
      clearFilter: 'ଫିଲ୍ଟର ହଟାନ୍ତୁ',
      keywords: 'ମୁଖ୍ୟ ଶବ୍ଦ',
      citations: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ ଉଦ୍ଧୃତି ଓ ଉତ୍ସ',
      backToHome: 'ମୂଳପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ'
    },
    stats: {
      title: 'ଅଭିଲେଖାଗାର ପରିସଂଖ୍ୟାନ',
      subtitle: 'ଡାଟାବେସରୁ ସିଧାସଳଖ ସଂଗୃହୀତ ବାସ୍ତବ ତଥ୍ୟ',
      articles: 'ଗବେଷଣା ପ୍ରବନ୍ଧ',
      documents: 'ଡିଜିଟାଇଜ୍ଡ୍ ଦସ୍ତାବିଜ୍',
      photos: 'ଐତିହାସିକ ଫଟୋଚିତ୍ର',
      inscriptions: 'ସମୀକ୍ଷିତ ଶିଳାଲେଖ',
      translations: 'ପ୍ରକାଶିତ ଅନୁବାଦ',
      members: 'ପଞ୍ଜୀକୃତ ସଦସ୍ୟ',
      events: 'ସାମାଜିକ କାର୍ଯ୍ୟକ୍ରମ',
    },
    documentary: {
      badge: 'ପ୍ରମାଣିତ ଐତିହାସିକ ଗ୍ରନ୍ଥାଗାର ଓ ଜ୍ଞାନ ଭଣ୍ଡାର',
      title: 'ସୂର୍ଯ୍ୟବଂଶ ଐତିହାସିକ ପ୍ରମାଣ୍ୟ ଚିତ୍ର ଓ ଗବେଷଣା ସୂଚୀ',
      subtitle: 'ଶିଳାଲେଖ ପ୍ରମାଣ, ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ନବନିର୍ମାଣ, ଐତିହାସିକ ମାନଚିତ୍ର ଓ ବିଦ୍ୱାନଙ୍କ ଗବେଷଣା।',
      searchPlaceholder: 'ଶୀର୍ଷକ, ରାଜା, ଅଞ୍ଚଳ କିମ୍ବା ମୁଖ୍ୟ ଶବ୍ଦ ଦ୍ୱାରା ଖୋଜନ୍ତୁ...',
      monographsList: 'ଐତିହାସିକ ଗବେଷଣା ପ୍ରବନ୍ଧ',
      citationsTitle: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ ଉଦ୍ଧୃତି ଓ ଉତ୍ସ',
      keywordsLabel: 'କୀୱାର୍ଡ:',
      emptySelection: 'ପଢ଼ିବା ଆରମ୍ଭ କରିବା ପାଇଁ ତାଲିକାରୁ ଏକ ପ୍ରବନ୍ଧ ଚୟନ କରନ୍ତୁ।',
      authorLabel: 'ଲେଖକ / ଐତିହାସିକ',
      dateLabel: 'ପ୍ରକାଶନ ତାରିଖ',
      translationNotice: 'ଏହି ପ୍ରବନ୍ଧଟି ଏହାର ମୂଳ ପ୍ରମାଣିତ ଭାଷାରେ ପ୍ରଦର୍ଶିତ ହେଉଛି। ଆପଣଙ୍କ ମନୋନୀତ ଭାଷାରେ ଅନୁବାଦ ସମ୍ପାଦକୀୟ ସମୀକ୍ଷାଧୀନ ଅଛି।',
      languageSwitchLabel: 'ଉପଲବ୍ଧ ଅନୁବାଦ (୮ ଭାଷା):',
      allCategories: 'ସମସ୍ତ ବିଭାଗ',
      categoryOdraDesha: 'ଓଡ଼୍ର ଦେଶ',
      categoryGajapathiKings: 'ଗଜପତି ରାଜାମାନେ',
      categoryRoyalGenealogy: 'ରାଜକୀୟ ବଂଶାବଳୀ',
      categoryResearchArticles: 'ଗବେଷଣା ପ୍ରବନ୍ଧ',
      sourceTypes: {
        primarySource: 'ପ୍ରାଥମିକ ତାମ୍ରଫଳକ ଦାନପତ୍ର',
        scholarlyBook: 'ଐତିହାସିକ ଗବେଷଣା ପୁସ୍ତକ',
        inscription: 'ଶିଳାଲେଖ ଦଲିଲ',
        archaeologicalRecord: 'ପ୍ରତ୍ନତତ୍ତ୍ୱ ସର୍ବେକ୍ଷଣ ରେକର୍ଡ',
        peerReviewed: 'ଗବେଷଣା ପତ୍ରିକା',
        oralHistory: 'ମୌଖିକ ପରମ୍ପରା',
        communityTradition: 'ଜୀବନ୍ତ ସାଂସ୍କୃତିକ ଐତିହ୍ୟ',
      },
    },
    exportModal: {
      title: 'ପ୍ରକଳ୍ପ ରପ୍ତାନି ଓ ଡାଉନଲୋଡ୍',
      subtitle: 'ସମ୍ପୂର୍ଣ୍ଣ କୋଡ୍, ଡାଟାବେସ୍, ୮ଟି ଭାଷାର ଅନୁବାଦ ଏବଂ ଆଣ୍ଡ୍ରଏଡ୍ ନିର୍ଦ୍ଦେଶାବଳୀ',
      downloadTab: 'ଜିପ୍ ପ୍ୟାକେଜ୍ ଡାଉନଲୋଡ୍',
      androidTab: 'ଆଣ୍ଡ୍ରଏଡ୍ ଫୋନ୍ ଗାଇଡ୍',
      githubTab: 'ମାଗଣା ଗିଟହବ୍ ଏକ୍ସପୋର୍ଟ',
      downloadBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ଜିପ୍ ଡାଉନଲୋଡ୍ କରନ୍ତୁ',
      readyNotice: 'ଏଥିରେ ରିଆକ୍ଟ ୧୯, ଏକ୍ସପ୍ରେସ୍ ବ୍ୟାକଏଣ୍ଡ୍ ଏବଂ ସମସ୍ତ ତଥ୍ୟ ଅନ୍ତର୍ଭୁକ୍ତ ଅଛି।',
      packageIncludes: 'ଆପଣଙ୍କ ପ୍ୟାକେଜରେ କଣ ରହିଛି:',
      frontendDesc: 'ରିଆକ୍ଟ ୧୯, ଟେଲୱିଣ୍ଡ v4, ରାଜକୀୟ UI, ୩୦ରୁ ଅଧିକ ପୃଷ୍ଠା ଓ ବଂଶାବଳୀ।',
      backendDesc: 'ଏକ୍ସପ୍ରେସ୍ TypeScript API, ପ୍ରମାଣୀକରଣ ଏବଂ ସନ୍ଧାନ ପଥ।',
      databaseDesc: 'ରାଜବଂଶ ଓ ଶିଳାଲେଖ ସମ୍ବଳିତ ସୁରକ୍ଷିତ ଡାଟାବେସ୍।',
      translationDesc: '୮ଟି ପ୍ରମୁଖ ଭାରତୀୟ ଭାଷାରେ ଅନୁବାଦ ପରିଚାଳନା ସେବା।',
      androidNotice: 'ଟର୍ମକ୍ସ ବ୍ୟବହାର କରି ଆପଣ ଏହାକୁ ଆଣ୍ଡ୍ରଏଡ୍ ଫୋନରେ ଅଫଲାଇନ୍ ଚଲାଇପାରିବେ।',
      copyCmds: 'କମାଣ୍ଡ୍ କପି କରନ୍ତୁ',
      githubNotice: 'କ୍ଲାଉଡ୍ ବ୍ୟାକଅପ୍ ପାଇଁ ପ୍ରକଳ୍ପକୁ ଗିଟହବରେ ଅପଲୋଡ୍ କରନ୍ତୁ।',
      closeBtn: 'ବନ୍ଦ କରନ୍ତୁ'
    },
    translationModal: {
      title: 'ଅନୁବାଦରେ ସହଯୋଗ କରନ୍ତୁ',
      subtitle: '୮ଟି ଭାଷାରେ ଐତିହାସିକ ତଥ୍ୟର ଅନୁବାଦ କରିବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ',
      sourceDoc: 'ମୂଳ ଦସ୍ତାବିଜ୍:',
      targetLangLabel: 'ଅନୁବାଦ ପାଇଁ ଇଚ୍ଛିତ ଭାଷା ବାଛନ୍ତୁ',
      titleLabel: 'ଅନୁବାଦିତ ଶୀର୍ଷକ',
      summaryLabel: 'ସଂକ୍ଷିପ୍ତ ସାରାଂଶ',
      contentLabel: 'ସମ୍ପୂର୍ଣ୍ଣ ଅନୁବାଦିତ ବିଷୟବସ୍ତୁ',
      authorLabel: 'ଅନୁବାଦକଙ୍କ ନାମ',
      disclaimer: 'ପ୍ରଦାନ କରାଯାଇଥିବା ସମସ୍ତ ତଥ୍ୟର ଐତିହାସିକ ସଠିକତା ଯାଞ୍ଚ କରାଯିବ।',
      cancelBtn: 'ବାତିଲ୍',
      submitBtn: 'ଅନୁବାଦ ସାଇତନ୍ତୁ',
      savingBtn: 'ସାଇତା ହେଉଛି...',
      successNotice: 'ଅନୁବାଦ ସଫଳତାର ସହ ସାଇତା ଗଲା!'
    }
  },

  // 8. BENGALI (bn)
  bn: {
    siteTitle: 'সূর্যবংশ ওড়িয়ারাজু ক্ষত্রিয়',
    siteSubtitle: 'ঐতিহাসিক প্রামাণ্যচিত্র, রাজকীয় ঐতিহ্য ও বিশ্ব সম্প্রদায় পোর্টাল',
    nav: {
      home: 'মূলপাতা',
      about: 'প্রকল্প পরিচিতি',
      documentary: 'ঐতিহাসিক তথ্যচিত্র',
      odraDesha: 'ওড্র দেশ',
      dynasties: 'রাজবংশসমূহ',
      gajapathiKings: 'গজপতি রাজাগণ',
      maps: 'সাম্রাজ্য ও মানচিত্র',
      genealogy: 'রাজকীয় বংশতালিকা',
      timeline: 'ঐতিহাসিক সময়রেখা',
      inscriptions: 'শিলালিপি ও প্রত্নতত্ত্ব',
      temples: 'মন্দির ও স্থাপত্য',
      culture: 'সংস্কৃতি ও ঐতিহ্য',
      literature: 'সাহিত্য ও প্রকাশনা',
      gallery: 'ঐতিহাসিক গ্যালারি',
      research: 'গবেষণামূলক প্রবন্ধ',
      directory: 'সম্প্রদায় নির্দেশিকা',
      activities: 'সম্প্রদায়ের কার্যক্রম',
      events: 'অনুষ্ঠান ও ঘোষণা',
      references: 'ঐতিহাসিক তথ্যসূত্র',
      contact: 'যোগাযোগ',
      login: 'সদস্য লগইন',
      register: 'নিবন্ধন করুন',
      dashboard: 'সদস্য ড্যাশবোর্ড',
      admin: 'প্রশাসন প্যানেল',
      submitResearch: 'গবেষণা জমা দিন',
      documentedFigures: 'নথিভুক্ত ঐতিহাসিক ব্যক্তিত্ব',
      historicalPersons: 'ঐতিহাসিক ব্যক্তিবর্গ ও নায়ক',
      communityProminentPersons: 'সমাজের বিশিষ্ট ব্যক্তিত্ব',
      communityHeritage: 'সম্প্রদায় ঐতিহ্য',
      communitySurnames: 'সম্প্রদায়ের পদবি (Community-Surnames)',
      kalingaWar: 'কলিঙ্গ যুদ্ধ (২৬১ খ্রিস্টপূর্বাব্দ)',
      logout: 'লগআউট',
      exportZip: 'প্রকল্প জিপ ডাউনলোড'
    },
    publisher: {
      designedAndPublishedBy: 'ওয়েবসাইট ডিজাইন ও প্রকাশনা',
      publisherName: 'ডক্টর জি. সত্যনারায়ণ রাজু',
      leaderTitle: 'সূর্যবংশ ওডিয়ারাজু ক্ষত্রিয় সমাজের শীর্ষ নেতা',
      leaderBio: 'সূর্যবংশ ওডিয়ারাজু ক্ষত্রিয় ঐতিহ্যের ডিজিটাল ঐতিহাসিক নথিবদ্ধকরণ, শিলালিপি সংরক্ষণ এবং সর্বভারতীয় সাংস্কৃতিক সংহতির দিশারি।',
      contactWhatsApp: 'হোয়াটসঅ্যাপে যোগাযোগ করুন (+91 9480112897)',
      callMobile: '+91 9480112897',
      whatsappGreeting: 'নমস্কার ডক্টর জি. সত্যনারায়ণ রাজু জী, সূর্যবংশ ওডিয়ারাজু ক্ষত্রিয় ঐতিহাসিক পোর্টাল প্রসঙ্গে'
    },
    hero: {
      badge: 'শিলালিপিভিত্তিক ঐতিহাসিক গবেষণা ও সংরক্ষণ',
      headline: 'সূর্যবংশ ওড়িয়ারাজু ক্ষত্রিয়ের ইতিহাস, ঐতিহ্য ও গৌরব আবিষ্কার করুন',
      subtitle: 'ঐতিহাসিক গবেষণা, সাংস্কৃতিক সংরক্ষণ এবং গজপতি রাজন্যবর্গের ঐতিহ্যের জন্য একটি নির্ভরযোগ্য ডিজিটাল আর্কাইভ।',
      exploreBtn: 'তথ্যচিত্র দেখুন',
      dynastiesBtn: 'রাজবংশ জানুন',
      galleryBtn: 'ঐতিহাসিক গ্যালারি',
      joinBtn: 'সম্প্রদায়ে যোগ দিন',
      exportBtn: 'প্রকল্প জিপ ডাউনলোড'
    },
    evidenceNotice: {
      title: 'ঐতিহাসিক প্রমাণের মানদণ্ড',
      description: 'অযাচাইকৃত ঐতিহ্য বা দাবিকে ঐতিহাসিক সত্য হিসেবে উপস্থাপন করা হয় না। আমরা শিলালিপি প্রমাণ, গবেষকদের পর্যালোচনা ও লোকপরম্পরা স্পষ্টভাবে আলাদা রাখি।',
    },
    common: {
      searchPlaceholder: 'শিলালিপি, রাজা বা গবেষণা প্রবন্ধ খুঁজুন...',
      readMore: 'সম্পূর্ণ পড়ুন',
      verified: 'যাচাইকৃত শিলালিপির প্রমাণ',
      scholarly: 'ঐতিহাসিক পণ্ডিতদের ব্যাখ্যা',
      traditional: 'ঐতিহ্যবাহী বংশতালিকার বিবরণ',
      oral: 'মৌখিক ইতিহাস / স্মৃতি',
      belief: 'সম্প্রদায়ের বিশ্বাস',
      filterBy: 'ফিল্টার',
      all: 'সকল নথি',
      viewDetails: 'বিস্তারিত দেখুন',
      source: 'উৎস ও তথ্যসূত্র',
      citation: 'উদ্ধৃতি',
      period: 'সময়কাল',
      location: 'স্থান',
      status: 'যাচাইকরণ অবস্থা',
      close: 'বন্ধ করুন',
      submit: 'জমা দিন',
      cancel: 'বাতিল',
      save: 'সংরক্ষণ',
      loading: 'তথ্য লোড হচ্ছে...',
      noResults: 'কোনো তথ্য পাওয়া যায়নি।',
      language: 'ভাষা',
      exportZip: 'জিপ ডাউনলোড',
      suggestTranslation: 'অনুবাদ প্রস্তাব করুন',
      offlineReady: 'অফলাইন প্রস্তুত',
      coverage: '৮টি ভাষায় প্রাপ্তিসাধ্য',
      copyCommands: 'কমান্ড কপি করুন',
      copied: 'কপি হয়েছে!',
      share: 'শেয়ার করুন',
      bookmark: 'বুকমার্ক',
      bookmarked: 'বুকমার্ক করা হয়েছে',
      clearFilter: 'ফিল্টার মুছুন',
      keywords: 'কীওয়ার্ড',
      citations: 'যাচাইকৃত শিলালিপি উদ্ধৃতি ও ঐতিহাসিক উৎস',
      backToHome: 'মূলপাতায় ফিরে যান'
    },
    stats: {
      title: 'সংরক্ষণাগার পরিসংখ্যান',
      subtitle: 'ডাটাবেস থেকে প্রাপ্ত প্রত্যক্ষ বাস্তব সংখ্যা',
      articles: 'ঐতিহাসিক প্রবন্ধ',
      documents: 'ডিজিটালাইজড নথি',
      photos: 'ঐতিহাসিক আলোকচিত্র',
      inscriptions: 'পর্যালোচিত শিলালিপি',
      translations: 'প্রকাশিত অনুবাদ',
      members: 'নিবন্ধিত সদস্য',
      events: 'সম্প্রদায়ের অনুষ্ঠান',
    },
    documentary: {
      badge: 'যাচাইকৃত ঐতিহাসিক সংরক্ষণাগার ও তথ্যভাণ্ডার',
      title: 'সূর্যবংশ ঐতিহাসিক তথ্যচিত্র ও গবেষণা নির্ঘণ্ট',
      subtitle: 'শিলালিপির পাঠোদ্ধার, প্রত্নতাত্ত্বিক গবেষণা, ঐতিহাসিক মানচিত্র ও পণ্ডিতগণের বিশ্লেষণ।',
      searchPlaceholder: 'শিরোনাম, রাজা, অঞ্চল বা কীওয়ার্ড দিয়ে খুঁজুন...',
      monographsList: 'ঐতিহাসিক গবেষণাপত্র',
      citationsTitle: 'যাচাইকৃত ঐতিহাসিক উদ্ধৃতি ও উৎস',
      keywordsLabel: 'কীওয়ার্ড:',
      emptySelection: 'পড়া শুরু করতে তালিকা থেকে একটি প্রবন্ধ নির্বাচন করুন।',
      authorLabel: 'লেখক / ঐতিহাসিক',
      dateLabel: 'প্রকাশের তারিখ',
      translationNotice: 'এই প্রবন্ধটি তার মূল যাচাইকৃত ভাষায় প্রদর্শিত হচ্ছে। আপনার নির্বাচিত ভাষায় অনুবাদ সম্পাদনাধীন রয়েছে।',
      languageSwitchLabel: 'উপলব্ধ অনুবাদসমূহ (৮টি ভাষা):',
      allCategories: 'সকল বিভাগ',
      categoryOdraDesha: 'ওড্র দেশ',
      categoryGajapathiKings: 'গজপতি রাজাগণ',
      categoryRoyalGenealogy: 'রাজকীয় বংশতালিকা',
      categoryResearchArticles: 'গবেষণামূলক প্রবন্ধ',
      sourceTypes: {
        primarySource: 'তাম্রশাসন দানপত্র',
        scholarlyBook: 'গবেষণামূলক ঐতিহাসিক গ্রন্থ',
        inscription: 'প্রস্তর শিলালিপি',
        archaeologicalRecord: 'প্রত্নতাত্ত্বিক জরিপ নথি',
        peerReviewed: 'গবেষণা পত্রিকা',
        oralHistory: 'মৌখিক ঐতিহ্য',
        communityTradition: 'জীবন্ত সাংস্কৃতিক ঐতিহ্য',
      },
    },
    exportModal: {
      title: 'প্রকল্প রপ্তানি ও ডাউনলোড',
      subtitle: 'সম্পূর্ণ সোর্স কোড, ডাটাবেস, ৮ ভাষার অনুবাদ ও অ্যান্ড্রয়েড নির্দেশিকা',
      downloadTab: 'জিপ প্যাকেজ ডাউনলোড',
      androidTab: 'অ্যান্ড্রয়েড ফোন গাইড',
      githubTab: 'বিনামূল্যে গিটহাব এক্সপোর্ট',
      downloadBtn: 'সম্পূর্ণ জিপ ডাউনলোড করুন',
      readyNotice: 'এতে রিঅ্যাক্ট ১৯, এক্সপ্রেস ব্যাকএন্ড এবং ডাটাবেস অন্তর্ভুক্ত রয়েছে।',
      packageIncludes: 'প্যাকেজে কী অন্তর্ভুক্ত আছে:',
      frontendDesc: 'রিঅ্যাক্ট ১৯, টেলউইন্ড v4, রয়্যাল UI, ৩০টির বেশি পৃষ্ঠা ও বংশতালিকা।',
      backendDesc: 'এক্সপ্রেস TypeScript API, প্রমাণীকরণ এবং অনুসন্ধান পথ।',
      databaseDesc: 'রাজবংশ ও শিলালিপির বিবরণসমৃদ্ধ সম্পূর্ণ ডাটাবেস।',
      translationDesc: '৮টি প্রধান ভারতীয় ভাষায় অনুবাদ পরিচালনা ব্যবস্থা।',
      androidNotice: 'টারমাক্স ব্যবহার করে আপনি অ্যান্ড্রয়েড ফোনে এটি অফলাইনে চালাতে পারেন।',
      copyCmds: 'কমান্ড কপি করুন',
      githubNotice: 'ক্লাউড ব্যাকআপের জন্য গিটহাবে আপনার কোড আপলোড করুন।',
      closeBtn: 'বন্ধ করুন'
    },
    translationModal: {
      title: 'অনুবাদে অবদান রাখুন',
      subtitle: '৮টি ভাষায় রাজকীয় নথিপত্র অনুবাদে সহযোগিতা করুন',
      sourceDoc: 'মূল নথি:',
      targetLangLabel: 'অনুবাদ করার ভাষা নির্বাচন করুন',
      titleLabel: 'অনূদিত শিরোনাম',
      summaryLabel: 'সংক্ষিপ্ত সারসংক্ষেপ',
      contentLabel: 'সম্পূর্ণ অনূদিত বিবরণ',
      authorLabel: 'অনুবাদকের নাম',
      disclaimer: 'ঐতিহাসিক নির্ভুলতার জন্য সমস্ত অনুবাদ পর্যালোচনা করা হয়।',
      cancelBtn: 'বাতিল',
      submitBtn: 'অনুবাদ সংরক্ষণ করুন',
      savingBtn: 'সংরক্ষণ হচ্ছে...',
      successNotice: 'অনুবাদ সফলভাবে সংরক্ষণ করা হয়েছে!'
    }
  }
};

export const translations: Record<LanguageCode, TranslationDictionary> = (
  Object.keys(baseTranslations) as LanguageCode[]
).reduce((acc, lang) => {
  acc[lang] = {
    ...baseTranslations[lang],
    ...PAGE_TRANSLATIONS[lang]
  };
  return acc;
}, {} as Record<LanguageCode, TranslationDictionary>);

