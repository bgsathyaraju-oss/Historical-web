import type {
  SiteStatistics,
  Article,
  HistoricalEvent,
  GalleryItem,
  LanguageCode
} from '../types';

export const ARCHIVE_IMG = (file: string) =>
  `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/${file}`;

export const ROYAL_HERO_BANNER_IMG = `${(import.meta as any).env?.BASE_URL || '/'}assets/royal-hero-banner.png`;
export const ROYAL_HERO_BANNER_AISTUDIO_IMG = `${(import.meta as any).env?.BASE_URL || '/'}assets/royal-hero-banner.png`;

// Shared in-memory cache to avoid duplicate API requests across HomePage and TestPage
export const HOMEPAGE_API_CACHE: Partial<
  Record<
    LanguageCode,
    {
      stats?: SiteStatistics;
      articles?: Article[];
      timeline?: HistoricalEvent[];
      gallery?: GalleryItem[];
    }
  >
> = {};

export interface HeroSlideData {
  id: string;
  image: string;
  secondaryImage: string;
  badge: string;
  era: string;
  sourceTypeBadge: string;
  title: string;
  subtitle: string;
  caption: string;
  link: string;
}

export type ArticleChronologicalCategoryKey =
  | 'all'
  | 'solar_antiquity'
  | 'odra_gajapathi'
  | 'community_genealogy'
  | 'epigraphy_architecture';

export interface HomepageCuratedArticleItem {
  id: string;
  chronologicalOrder: number;
  categoryKey: Exclude<ArticleChronologicalCategoryKey, 'all'>;
  categoryLabel: string;
  eraBadge: string;
  title: string;
  summary: string;
  thumbnail: string;
  evidenceCategory: Article['evidence_category'];
  authorName: string;
  citationsCount: number;
  targetPath: string;
  rawArticle?: Article;
}

export const HOME_UI: Record<
  LanguageCode,
  {
    heroMainTitle: string;
    heroMainSubtitle: string;
    heroTagline: string;
    exploreHeritageBtn: string;
    watchDocumentaryBtn: string;
    quickAccessBadge: string;
    quickAccessTitle: string;
    quickAccessSub: string;
    journeyBadge: string;
    journeyTitle: string;
    journeySub: string;
    exploreRealmBtn: string;
    personagesBadge: string;
    personagesTitle: string;
    personagesSub: string;
    viewBiographyBtn: string;
    viewAllPersonagesBtn: string;
    showMorePersonagesBtn: (total: number) => string;
    showLessPersonagesBtn: string;
    articlesBadge: string;
    articlesTitle: string;
    articlesSub: string;
    readArticleBtn: string;
    viewAllArticlesBtn: string;
    timelineBadge: string;
    timelineTitle: string;
    timelineSub: string;
    exploreTimelineBtn: string;
    resourcesBadge: string;
    resourcesTitle: string;
    resourcesSub: string;
    openResourceBtn: string;
    galleryBadge: string;
    galleryTitle: string;
    gallerySub: string;
    viewGalleryBtn: string;
    statsBadge: string;
    statsTitle: string;
    catAll: string;
    catSolarAntiquity: string;
    catSolarAntiquitySub: string;
    catOdraGajapathi: string;
    catOdraGajapathiSub: string;
    catCommunityGenealogy: string;
    catCommunityGenealogySub: string;
    catEpigraphyArch: string;
    catEpigraphyArchSub: string;
    viewCategoryBtn: string;
    citationsLabel: (count: number) => string;
  }
> = {
  en: {
    heroMainTitle: 'Suryavamsha Odiyaraju Kshatriya Heritage Portal',
    heroMainSubtitle:
      'Imperial Sovereignty, Inscriptional Epigraphy & Civilizational Genealogy',
    heroTagline:
      'Documenting 3,000+ years of solar kings, mighty Gajapathi emperors, hydraulic engineering feats, and living clan heritage across Odra Desha, Kalinga, and the Deccan.',
    exploreHeritageBtn: 'Explore Royal Heritage',
    watchDocumentaryBtn: 'Read Historical Monographs',
    quickAccessBadge: 'Archival Gateway',
    quickAccessTitle: 'Explore Archival Portals & Historical Records',
    quickAccessSub:
      'Direct navigation to verified epigraphy, dynastic timelines, community lineages, and rare iconography.',
    journeyBadge: 'Territorial Sovereignty',
    journeyTitle: 'Historical Realms & Imperial Geographies',
    journeySub:
      'From the sacred Mahanadi basin of Odra Desha to the Godavari-Krishna deltas of Trikalinga.',
    exploreRealmBtn: 'Explore Realm History',
    personagesBadge: 'Sovereign Biographies',
    personagesTitle: 'Illustrious Monarchs, Progenitors & Paika Heroes',
    personagesSub:
      'Documented biographical profiles grounded in stone edicts, copper plate charters, and court chronicles.',
    viewBiographyBtn: 'Read Sovereign Biography',
    viewAllPersonagesBtn: 'View All 13 Historical Personages',
    showMorePersonagesBtn: total => `Show All Personages (${total} Monarchs)`,
    showLessPersonagesBtn: 'Show Less Personages',
    articlesBadge: 'Scholarly Articles & Monographs',
    articlesTitle: 'Chronological Historical Compendium',
    articlesSub:
      'Peer-reviewed and source-verified research across four definitive epochs of royal Suryavamsha heritage.',
    readArticleBtn: 'Read Full Historical Monograph',
    viewAllArticlesBtn: 'View All Curated Research Articles',
    timelineBadge: 'Chronological Continuum',
    timelineTitle: 'Imperial Chronology Across Millennia',
    timelineSub:
      'Trace uninterrupted royal lineage from Vedic antiquity through medieval imperial zenith to living community heritage.',
    exploreTimelineBtn: 'Open Interactive Full Timeline',
    resourcesBadge: 'Epigraphic Vault',
    resourcesTitle: 'Archival Resources & Primary Evidence',
    resourcesSub:
      'Digitized copper plates, palm-leaf manuscripts, temple inscriptions, and gazetteers.',
    openResourceBtn: 'Access Archival Vault',
    galleryBadge: 'Iconographic Archives',
    galleryTitle: 'Archival Imagery & Sacred Iconography',
    gallerySub:
      'Verified sculptures, fort gateways, hero stones, and royal portraits preserved in museums and sacred shrines.',
    viewGalleryBtn: 'Open Complete Image Gallery',
    statsBadge: 'Verified Verification Index',
    statsTitle: 'Portal Archival Integrity & Research Metrics',
    catAll: 'All Historical Epochs',
    catSolarAntiquity: 'I. Solar Antiquity & Ancient Kalinga-Odra (Epic – 1st C. BCE)',
    catSolarAntiquitySub:
      'Ikshvaku Suryavamsha progenitors, the historic Kalinga War (261 BCE), and Emperor Kharavela’s Hathigumpha inscription.',
    catOdraGajapathi: 'II. Odra Desha & Suryavamsha Gajapathi Empire (7th – 16th C.)',
    catOdraGajapathiSub:
      'Territorial evolution of Odra Desha, Emperor Kapilendra Deva’s southern conquests, and Kolletikota water fort.',
    catCommunityGenealogy: 'III. Community Heritage, Surnames & Lineages (12th C. – Present)',
    catCommunityGenealogySub:
      'Oad-Rajput, Odra-Kshatriya, Odiyaraju/Vadderajulu identity, and inscriptional vs. traditional vamsavali lineage methodology.',
    catEpigraphyArch: 'IV. Primary Inscriptions, Manuscripts & Architecture (1st C. BCE – 1815 CE)',
    catEpigraphyArchSub:
      'Veligalani copper plates, Madala Panji chronicles, Sarasvati Vilasam, and Kalinga-Odra temple architecture.',
    viewCategoryBtn: 'View Category Compendium',
    citationsLabel: count => `${count} Primary Citations`
  },
  hi: {
    heroMainTitle: 'सूर्यवंश ओडियाराजु क्षत्रिय विरासत पोर्टल',
    heroMainSubtitle: 'शाही संप्रभुता, शिलालेखीय पुरालेख और सभ्यतागत वंशावली',
    heroTagline:
      'ओड्र देश, कलिंग और दक्कन में 3,000+ वर्षों के सूर्यवंशी राजाओं, पराक्रमी गजपति सम्राटों, जल अभियांत्रिकी और जीवंत वंश परंपरा का दस्तावेजीकरण।',
    exploreHeritageBtn: 'शाही विरासत देखें',
    watchDocumentaryBtn: 'ऐतिहासिक शोधग्रंथ पढ़ें',
    quickAccessBadge: 'अभिलेखागार प्रवेश',
    quickAccessTitle: 'अभिलेखागार पोर्टल और ऐतिहासिक अभिलेख',
    quickAccessSub:
      'सत्यापित शिलालेखों, राजवंश समयरेखा, सामाजिक वंशावली और दुर्लभ मूर्तिकला तक सीधी पहुंच।',
    journeyBadge: 'क्षेत्रीय संप्रभुता',
    journeyTitle: 'ऐतिहासिक साम्राज्य और शाही भूगोल',
    journeySub:
      'ओड्र देश के पावन महानदी बेसिन से त्रिकलिंग के गोदावरी-कृष्णा डेल्टा तक।',
    exploreRealmBtn: 'साम्राज्य इतिहास देखें',
    personagesBadge: 'शाही जीवनियां',
    personagesTitle: 'प्रतापी सम्राट, आदि-पुरुष और पाइका महानायक',
    personagesSub:
      'शिलालेखों, ताम्रपत्रों और दरबारी इतिहास पर आधारित प्रामाणिक जीवनी रूपरेखा।',
    viewBiographyBtn: 'शाही जीवनी पढ़ें',
    viewAllPersonagesBtn: 'सभी १३ ऐतिहासिक विभूतियां देखें',
    showMorePersonagesBtn: total => `सभी विभूतियां देखें (${total} शासक)`,
    showLessPersonagesBtn: 'कम विभूतियां दिखाएं',
    articlesBadge: 'विद्वत्तापूर्ण लेख और शोधग्रंथ',
    articlesTitle: 'कालक्रमानुसार ऐतिहासिक संग्रह',
    articlesSub:
      'सूर्यवंश शाही विरासत के चार प्रमुख युगों पर स्रोत-सत्यापित शोध लेख।',
    readArticleBtn: 'पूर्ण शोधग्रंथ पढ़ें',
    viewAllArticlesBtn: 'सभी शोध लेख देखें',
    timelineBadge: 'कालानुक्रमिक निरंतरता',
    timelineTitle: 'सहस्राब्दियों का शाही कालक्रम',
    timelineSub:
      'वैदिक काल से लेकर मध्यकालीन साम्राज्य और आज की जीवंत वंश परंपरा तक अखंड शाही इतिहास।',
    exploreTimelineBtn: 'इंटरएक्टिव समयरेखा खोलें',
    resourcesBadge: 'पुरालेखीय अभिलेखागार',
    resourcesTitle: 'पुरालेखीय स्रोत और प्राथमिक साक्ष्य',
    resourcesSub:
      'डिजिटल ताम्रपत्र, ताड़पत्र पांडुलिपियां, मंदिर शिलालेख और ऐतिहासिक गजेटियर।',
    openResourceBtn: 'पुरालेखीय कक्ष खोलें',
    galleryBadge: 'मूर्तिशिल्प अभिलेखागार',
    galleryTitle: 'ऐतिहासिक चित्र और पवित्र प्रतिमाएं',
    gallerySub:
      'संग्रहालयों और मंदिरों में सुरक्षित सत्यापित मूर्तियां, दुर्ग द्वार, वीर प्रस्तर और शाही चित्र।',
    viewGalleryBtn: 'संपूर्ण चित्र दीर्घा खोलें',
    statsBadge: 'सत्यापन सूचकांक',
    statsTitle: 'पोर्टल अभिलेखीय प्रामाणिकता और शोध आंकड़े',
    catAll: 'सभी ऐतिहासिक युग',
    catSolarAntiquity: 'I. सूर्यवंश प्राचीनता और प्राचीन कलिंग-ओड्र (महाकाव्य – ई.पू. प्रथम शताब्दी)',
    catSolarAntiquitySub:
      'इक्ष्वाकु सूर्यवंशी आदि-पुरुष, महान कलिंग युद्ध (ई.पू. २६१) और सम्राट खारवेल का हाथीगुम्फा शिलालेख।',
    catOdraGajapathi: 'II. ओड्र देश और सूर्यवंशी गजपति साम्राज्य (७वीं – १६वीं शताब्दी)',
    catOdraGajapathiSub:
      'ओड्र देश का क्षेत्रीय विकास, सम्राट कपिलेन्द्र देव गजपति की विजय यात्राएं और कोल्लेटीकोटा जलदुर्ग।',
    catCommunityGenealogy: 'III. सामाजिक विरासत, उपनाम और वंशावली (१२वीं शताब्दी – वर्तमान)',
    catCommunityGenealogySub:
      'ओड़-राजपूत, ओड्र-क्षत्रिय, ओडियाराजु/वड्डेराजुलु पहचान और शिलालेखीय बनाम मौखिक वंशावली पद्धति।',
    catEpigraphyArch: 'IV. प्राथमिक शिलालेख, पांडुलिपियां और वास्तुकला (ई.पू. प्रथम शताब्दी – १८१५ ई.)',
    catEpigraphyArchSub:
      'वेलिगलानि ताम्रपत्र, मादला पांजी, सरस्वती विलासम और कलिंग-ओड्र मंदिर वास्तुकला।',
    viewCategoryBtn: 'श्रेणी संग्रह देखें',
    citationsLabel: count => `${count} प्राथमिक स्रोत`
  },
  te: {
    heroMainTitle: 'సూర్యవంశ ఒడియారాజు క్షత్రియ వారసత్వ పోర్టల్',
    heroMainSubtitle: 'రాజ సార్వభౌమాధికారం, శాసన ఆధారాలు & నాగరికతా వంశావళి',
    heroTagline:
      'ఓడ్ర దేశం, కళింగ మరియు దక్కన్ వ్యాప్తంగా 3,000+ సంవత్సరాల సూర్యవంశ రాజులు, గజపతి చక్రవర్తులు, జల సాంకేతిక విజయాలు మరియు జీవన సమాజ వారసత్వ అధికారిక రికార్డు.',
    exploreHeritageBtn: 'రాజ వారసత్వాన్ని అన్వేషించండి',
    watchDocumentaryBtn: 'చారిత్రక పరిశోధన గ్రంథాలు చదవండి',
    quickAccessBadge: 'చారిత్రక ద్వారము',
    quickAccessTitle: 'చారిత్రక రికార్డులు & పరిశోధనా పోర్టల్స్',
    quickAccessSub:
      'ధృవీకరించబడిన శాసనాలు, రాజవంశ కాలక్రమం, సామాజిక వంశావళి మరియు అరుదైన చిత్రాల ప్రత్యక్ష పరిశీలన.',
    journeyBadge: 'ప్రాంతీయ సార్వభౌమాధికారం',
    journeyTitle: 'చారిత్రక రాజ్యాలు & సామ్రాజ్య భౌగోళికం',
    journeySub:
      'ఓడ్ర దేశ మహానది లోయ నుండి త్రికళింగలోని గోదావరి-కృష్ణా డెల్టాల వరకు.',
    exploreRealmBtn: 'రాజ్య చరిత్ర చూడండి',
    personagesBadge: 'రాజ జీవిత చరిత్రలు',
    personagesTitle: 'ప్రసిద్ధ చక్రవర్తులు, మూలపురుషులు & పైకా యోధులు',
    personagesSub:
      'శిలాశాసనాలు, తామ్రపత్రాలు మరియు చారిత్రక గ్రంథాల ఆధారంగా రూపొందించిన అధికారిక ప్రొఫైల్స్.',
    viewBiographyBtn: 'చరిత్ర చదవండి',
    viewAllPersonagesBtn: 'మొత్తం 13 మంది ప్రముఖులను చూడండి',
    showMorePersonagesBtn: total => `అందరినీ చూడండి (${total} మంది రాజులు)`,
    showLessPersonagesBtn: 'తక్కువ మందిని చూపించు',
    articlesBadge: 'పరిశోధనాత్మక వ్యాసాలు',
    articlesTitle: 'కాలక్రమానుసార చారిత్రక వ్యాసాల సంకలనం',
    articlesSub:
      'సూర్యవంశ చారిత్రక వారసత్వానికి సంబంధించిన నాలుగు ప్రముఖ యుగాలపై నిపుణుల పరిశోధన.',
    readArticleBtn: 'పూర్తి వ్యాసం చదవండి',
    viewAllArticlesBtn: 'అన్ని పరిశోధనా వ్యాసాలు చూడండి',
    timelineBadge: 'కాలక్రమ నిరంతరత',
    timelineTitle: 'యుగ యుగాల రాజ కాలక్రమం',
    timelineSub:
      'వైదిక ప్రాచీన కాలం నుండి మధ్యయుగ సామ్రాజ్యాలు మరియు నేటి జీవన వంశ పరంపర వరకు సమగ్ర చరిత్ర.',
    exploreTimelineBtn: 'పూర్తి టైమ్‌లైన్ చూడండి',
    resourcesBadge: 'శాసన నిధి',
    resourcesTitle: 'ప్రాథమిక ఆధారాలు & చారిత్రక రికార్డులు',
    resourcesSub:
      'డిజిటలైజ్ చేసిన తామ్రపత్రాలు, తాళపత్ర గ్రంథాలు, ఆలయ శాసనాలు మరియు గెజిటీర్లు.',
    openResourceBtn: 'రికార్డుల నిధి చూడండి',
    galleryBadge: 'చిత్రకళా భాండాగారం',
    galleryTitle: 'చారిత్రక చిత్రాలు & ఆలయ శిల్పాలు',
    gallerySub:
      'మ్యూజియంలు మరియు పురాతన ఆలయాల్లో భద్రపరచబడిన శిల్పాలు, కోట ద్వారాలు మరియు రాజ చిత్రాలు.',
    viewGalleryBtn: 'పూర్తి గ్యాలరీ చూడండి',
    statsBadge: 'ధృవీకరణ సూచిక',
    statsTitle: 'పోర్టల్ ప్రామాణికత & పరిశోధన వివరాలు',
    catAll: 'అన్ని చారిత్రక యుగాలు',
    catSolarAntiquity: 'I. సూర్యవంశ ప్రాచీనత & పురాతన కళింగ-ఓడ్ర (పురాణ కాలం – క్రీ.పూ. 1వ శతాబ్దం)',
    catSolarAntiquitySub:
      'ఇక్ష్వాకు సూర్యవంశ మూలపురుషులు, కళింగ యుద్ధం (క్రీ.పూ. 261) మరియు ఖారవేలుని హాథీగుంఫా శాసనం.',
    catOdraGajapathi: 'II. ఓడ్ర దేశం & సూర్యవంశ గజపతి సామ్రాజ్యం (7వ – 16వ శతాబ్దం)',
    catOdraGajapathiSub:
      'ఓడ్ర దేశ విస్తరణ, కపిలేంద్ర దేవ గజపతి దక్షిణ దిగ్విజయాలు మరియు కొల్లేటికోట జలదుర్గం.',
    catCommunityGenealogy: 'III. సామాజిక వారసత్వం, ఇంటిపేర్లు & వంశావళి (12వ శతాబ్దం – నేటి వరకు)',
    catCommunityGenealogySub:
      'ఓడ్-రాజపుత్, ఓడ్ర-క్షత్రియ, ఒడియారాజు/వడ్డెరరాజుల చరిత్ర మరియు శాసన ఆధారిత వంశావళి విధానం.',
    catEpigraphyArch: 'IV. ప్రాథమిక శాసనాలు, గ్రంథాలు & ఆలయ వాస్తుశిల్పం (క్రీ.పూ. 1వ శతాబ్దం – 1815)',
    catEpigraphyArchSub:
      'వెలిగలని తామ్ర శాసనం, మాదలా పంజి, సరస్వతీ విలాసం మరియు కళింగ-ఓడ్ర నిర్మాణ శైలి.',
    viewCategoryBtn: 'ఈ వర్గం వ్యాసాలు చూడండి',
    citationsLabel: count => `${count} ప్రాథమిక ఆధారాలు`
  },
  kn: {
    heroMainTitle: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಪರಂಪರೆ ತಾಣ',
    heroMainSubtitle: 'ರಾಜ ಸಾರ್ವಭೌಮತ್ವ, ಶಾಸನ ಪುರಾವೆಗಳು ಮತ್ತು ನಾಗರಿಕತಾ ವಂಶಾವಳಿ',
    heroTagline:
      'ಒಡ್ರ ದೇಶ, ಕಳಿಂಗ ಮತ್ತು ದಖ್ಖನ್ ಪ್ರದೇಶಗಳಲ್ಲಿ 3,000+ ವರ್ಷಗಳ ಸೂರ್ಯವಂಶಿ ರಾಜರು, ಗಜಪತಿ ಚಕ್ರವರ್ತಿಗಳು, ಜಲ ಎಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಸಮುದಾಯ ಪರಂಪರೆಯ ಅಧಿಕೃತ ದಾಖಲೆ.',
    exploreHeritageBtn: 'ರಾಜ ಪರಂಪರೆ ಅನ್ವೇಷಿಸಿ',
    watchDocumentaryBtn: 'ಐತಿಹಾಸಿಕ ಗ್ರಂಥಗಳನ್ನು ಓದಿ',
    quickAccessBadge: 'ದಾಖಲೆಗಳ ಪ್ರವೇಶ',
    quickAccessTitle: 'ದಾಖಲಾತಿ ಪೋರ್ಟಲ್ ಮತ್ತು ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು',
    quickAccessSub:
      'ದೃಢೀಕೃತ ಶಾಸನಗಳು, ರಾಜವಂಶ ಕಾಲಾವಧಿ, ವಂಶಾವಳಿ ಮತ್ತು ಅಪರೂಪದ ಶಿಲ್ಪಕಲೆಯ ನೇರ ಮಾಹಿತಿ.',
    journeyBadge: 'ಪ್ರಾದೇಶಿಕ ಸಾರ್ವಭೌಮತ್ವ',
    journeyTitle: 'ಐತಿಹಾಸಿಕ ಸಾಮ್ರಾಜ್ಯಗಳು ಮತ್ತು ರಾಜ ಭೂಗೋಳ',
    journeySub:
      'ಒಡ್ರ ದೇಶದ ಮಹಾನದಿ ಜಲಾನಯನ ಪ್ರದೇಶದಿಂದ ತ್ರಿಕಳಿಂಗದ ಗೋದಾವರಿ-ಕೃಷ್ಣಾ ನದೀಮುಖಜ ಭೂಮಿಯವರೆಗೆ.',
    exploreRealmBtn: 'ಸಾಮ್ರಾಜ್ಯ ಇತಿಹಾಸ ನೋಡಿ',
    personagesBadge: 'ರಾಜ ಜೀವನಚರಿತ್ರೆಗಳು',
    personagesTitle: 'ಪ್ರಸಿದ್ಧ ಚಕ್ರವರ್ತಿಗಳು, ಮೂಲಪುರುಷರು ಮತ್ತು ಪಾಕ ನಾಯಕರು',
    personagesSub:
      'ಶಿಲಾಶಾಸನಗಳು, ತಾಮ್ರಪಟಗಳು ಮತ್ತು ರಾಜ ಆಸ್ಥಾನ ದಾಖಲೆಗಳನ್ನು ಆಧರಿಸಿದ ದೃಢೀಕೃತ ವಿವರಗಳು.',
    viewBiographyBtn: 'ಜೀವನಚರಿತ್ರೆ ಓದಿ',
    viewAllPersonagesBtn: 'ಎಲ್ಲಾ 13 ಪ್ರಮುಖ ವ್ಯಕ್ತಿಗಳನ್ನು ನೋಡಿ',
    showMorePersonagesBtn: total => `ಎಲ್ಲಾ ವ್ಯಕ್ತಿಗಳನ್ನು ನೋಡಿ (${total} ರಾಜರು)`,
    showLessPersonagesBtn: 'ಕಡಿಮೆ ಜನರನ್ನು ತೋರಿಸಿ',
    articlesBadge: 'ವಿದ್ವತ್ಪೂರ್ಣ ಲೇಖನಗಳು',
    articlesTitle: 'ಕಾಲಾನುಕ್ರಮಣಿಕೆಯ ಐತಿಹಾಸಿಕ ಲೇಖನಗಳ ಸಂಗ್ರಹ',
    articlesSub:
      'ಸೂರ್ಯವಂಶ ರಾಜ ಪರಂಪರೆಯ ನಾಲ್ಕು ಪ್ರಮುಖ ಯುಗಗಳ ಮೇಲಿನ ಸಂಶೋಧನಾತ್ಮಕ ಲೇಖನಗಳು.',
    readArticleBtn: 'ಪೂರ್ಣ ಲೇಖನ ಓದಿ',
    viewAllArticlesBtn: 'ಎಲ್ಲಾ ಲೇಖನಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    timelineBadge: 'ಕಾಲಾನುಕ್ರಮ ನಿರಂತರತೆ',
    timelineTitle: 'ಸಹಸ್ರಮಾನಗಳ ರಾಜ ಕಾಲಾನುಕ್ರಮ',
    timelineSub:
      'ವೈದಿಕ ಪ್ರಾಚೀನ ಕಾಲದಿಂದ ಹಿಡಿದು ಮಧ್ಯಕಾಲೀನ ಸಾಮ್ರಾಜ್ಯಗಳು ಮತ್ತು ಇಂದಿನ ಸಮಾಜ ಪರಂಪರೆಯವರೆಗೆ ನಿರಂತರ ಇತಿಹಾಸ.',
    exploreTimelineBtn: 'ಸಂಪೂರ್ಣ ಟೈಮ್‌ಲೈನ್ ನೋಡಿ',
    resourcesBadge: 'ಶಾಸನ ಕಣಜ',
    resourcesTitle: 'ಪ್ರಾಥಮಿಕ ಪುರಾವೆಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಆಕರಗಳು',
    resourcesSub:
      'ಡಿಜಿಟಲೀಕೃತ ತಾಮ್ರಶಾಸನಗಳು, ತಾಳೆಗರಿ ಹಸ್ತಪ್ರತಿಗಳು, ದೇವಾಲಯ ಶಾಸನಗಳು ಮತ್ತು ಗೆಜೆಟಿಯರ್‌ಗಳು.',
    openResourceBtn: 'ದಾಖಲೆಗಳ ಕೋಣೆ ಪ್ರವೇಶಿಸಿ',
    galleryBadge: 'ಶಿಲ್ಪಕಲಾ ಗ್ಯಾಲರಿ',
    galleryTitle: 'ಐತಿಹಾಸಿಕ ಚಿತ್ರಗಳು ಮತ್ತು ಪವಿತ್ರ ಶಿಲ್ಪಗಳು',
    gallerySub:
      'ವಸ್ತುಸಂಗ್ರಹಾಲಯಗಳು ಮತ್ತು ಪುರಾತನ ದೇವಾಲಯಗಳಲ್ಲಿ ಸಂರಕ್ಷಿಸಲ್ಪಟ್ಟ ಶಿಲ್ಪಗಳು, ಕೋಟೆ ದ್ವಾರಗಳು ಮತ್ತು ರಾಜ ಭಾವಚಿತ್ರಗಳು.',
    viewGalleryBtn: 'ಸಂಪೂರ್ಣ ಚಿತ್ರ ಗ್ಯಾಲರಿ ನೋಡಿ',
    statsBadge: 'ದೃಢೀಕರಣ ಸೂಚ್ಯಂಕ',
    statsTitle: 'ಪೋರ್ಟಲ್ ಅಧಿಕೃತತೆ ಮತ್ತು ಸಂಶೋಧನಾ ಮಾಹಿತಿ',
    catAll: 'ಎಲ್ಲಾ ಐತಿಹಾಸಿಕ ಯುಗಗಳು',
    catSolarAntiquity: 'I. ಸೂರ್ಯವಂಶ ಪ್ರಾಚೀನತೆ ಮತ್ತು ಪುರಾತನ ಕಳಿಂಗ-ಒಡ್ರ (ಪುರಾಣ ಕಾಲ – ಕ್ರಿ.ಪೂ. 1ನೇ ಶತಮಾನ)',
    catSolarAntiquitySub:
      'ಇಕ್ಷ್ವಾಕು ಸೂರ್ಯವಂಶ ಮೂಲಪುರುಷರು, ಕಳಿಂಗ ಯುದ್ಧ (ಕ್ರಿ.ಪೂ. 261) ಮತ್ತು ಖಾರವೇಲನ ಹಾಥೀಗುಂಫಾ ಶಾಸನ.',
    catOdraGajapathi: 'II. ಒಡ್ರ ದೇಶ ಮತ್ತು ಸೂರ್ಯವಂಶಿ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ (7ನೇ – 16ನೇ ಶತಮಾನ)',
    catOdraGajapathiSub:
      'ಒಡ್ರ ದೇಶದ ವಿಸ್ತರಣೆ, ಕಪಿಲೇಂದ್ರ ದೇವ ಗಜಪತಿಯ ದಿಗ್ವಿಜಯಗಳು ಮತ್ತು ಕೊಲ್ಲೇಟಿಕೋಟ ಜಲದುರ್ಗ.',
    catCommunityGenealogy: 'III. ಸಮುದಾಯ ಪರಂಪರೆ, ಉಪನಾಮಗಳು ಮತ್ತು ವಂಶಾವಳಿ (12ನೇ ಶತಮಾನ – ಪ್ರಸ್ತುತ)',
    catCommunityGenealogySub:
      'ಓಡ್-ರಜಪೂತ್, ಒಡ್ರ-ಕ್ಷತ್ರಿಯ, ಒಡಿಯರಾಜು/ವಡ್ಡೇರಾಜುಲ ಇತಿಹಾಸ ಮತ್ತು ಶಾಸನ ಆಧಾರಿತ ವಂಶಾವಳಿ ಪದ್ಧತಿ.',
    catEpigraphyArch: 'IV. ಪ್ರಾಥಮಿಕ ಶಾಸನಗಳು, ಹಸ್ತಪ್ರತಿಗಳು ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ (ಕ್ರಿ.ಪೂ. 1ನೇ ಶತಮಾನ – 1815)',
    catEpigraphyArchSub:
      'ವೆಲಿಗಲಾನಿ ತಾಮ್ರಶಾಸನ, ಮಾದಲಾ ಪಾಂಜಿ, ಸರಸ್ವತೀ ವಿಲಾಸಂ ಮತ್ತು ಕಳಿಂಗ-ಒಡ್ರ ವಾಸ್ತುಶಿಲ್ಪ.',
    viewCategoryBtn: 'ಈ ವರ್ಗದ ಲೇಖನಗಳನ್ನು ನೋಡಿ',
    citationsLabel: count => `${count} ಪ್ರಾಥಮಿಕ ಪುರಾವೆಗಳು`
  },
  ta: {
    heroMainTitle: 'சூரியவம்ச ஒடியராஜு க்ஷத்ரிய மரபுரிமை தளம்',
    heroMainSubtitle: 'அரச இறையாண்மை, கல்வெட்டு ஆதாரங்கள் & நாகரிக மரபுவழி',
    heroTagline:
      'ஒட்ர தேசம், கலிங்கம் மற்றும் தக்காணத்தில் 3,000+ ஆண்டுகால சூரியவம்ச அரசர்கள், கஜபதி பேரரசர்கள், நீர்ப்பாசன பொறியியல் மற்றும் வாழும் சமுதாய மரபின் ஆவணம்.',
    exploreHeritageBtn: 'அரச மரபை அறிக',
    watchDocumentaryBtn: 'வரலாற்று ஆய்வுக் கட்டுரைகள் படிக்க',
    quickAccessBadge: 'வரலாற்று ஆவண வாயில்',
    quickAccessTitle: 'ஆவணக் களஞ்சியம் மற்றும் வரலாற்று பதிவுகள்',
    quickAccessSub:
      'சரிபார்க்கப்பட்ட கல்வெட்டுகள், அரச காலவரிசை, சமுதாய மரபுவழி மற்றும் அரிய சிற்பங்களின் நேரடி பார்வை.',
    journeyBadge: 'பிராந்திய இறையாண்மை',
    journeyTitle: 'வரலாற்றுப் பேரரசுகள் மற்றும் புவியியல்',
    journeySub:
      'ஒட்ர தேசத்தின் மகாநதிப் படுகையிலிருந்து திரிகலிங்கத்தின் கோதாவரி-கிருஷ்ணா டெல்டா வரை.',
    exploreRealmBtn: 'பேரரசு வரலாறு அறிக',
    personagesBadge: 'அரச வாழ்க்கை வரலாறுகள்',
    personagesTitle: 'புகழ்பெற்ற பேரரசர்கள், மூலபுருஷர்கள் & பைகா வீரர்கள்',
    personagesSub:
      'கல்வெட்டுகள், செப்புப் பட்டயங்கள் மற்றும் அரச வரலாறுகளின் அடிப்படையில் அமைந்த ஆவணப் பதிவுகள்.',
    viewBiographyBtn: 'வாழ்க்கை வரலாறு படிக்க',
    viewAllPersonagesBtn: 'அனைத்து 13 வரலாற்று மாந்தரையும் காண்க',
    showMorePersonagesBtn: total => `அனைவரையும் காண்க (${total} அரசர்கள்)`,
    showLessPersonagesBtn: 'குறைவான நபர்களைக் காட்டு',
    articlesBadge: 'ஆய்வுக் கட்டுரைகள்',
    articlesTitle: 'காலவரிசை வரலாற்றுத் தொகுப்பு',
    articlesSub:
      'சூரியவம்ச வரலாற்று மரபின் நான்கு முக்கிய சகாப்தங்கள் குறித்த வரலாற்று ஆய்வுகள்.',
    readArticleBtn: 'முழு ஆய்வுக் கட்டுரை படிக்க',
    viewAllArticlesBtn: 'அனைத்து ஆய்வுக் கட்டுரைகளையும் காண்க',
    timelineBadge: 'காலவரிசைத் தொடர்ச்சி',
    timelineTitle: 'ஆயிரமாண்டு அரச காலவரிசை',
    timelineSub:
      'வேதகாலம் முதல் இடைக்காலப் பேரரசுகள் மற்றும் இன்றைய சமூக மரபுவழி வரையிலான தொடர்ச்சியான வரலாறு.',
    exploreTimelineBtn: 'முழு காலவரிசையைத் திறக்க',
    resourcesBadge: 'கல்வெட்டுக் களஞ்சியம்',
    resourcesTitle: 'முதன்மை ஆதாரங்கள் மற்றும் வரலாற்றுச் சான்றுகள்',
    resourcesSub:
      'டிஜிட்டல் செப்புப் பட்டயங்கள், ஓலைச்சுவடிகள், கோயில் கல்வெட்டுகள் மற்றும் கெசட்டியர்கள்.',
    openResourceBtn: 'ஆவணக் களஞ்சியத்தை அணுகுக',
    galleryBadge: 'சிற்பக் கலைக்கூடம்',
    galleryTitle: 'வரலாற்றுப் படங்கள் மற்றும் புனிதச் சிற்பங்கள்',
    gallerySub:
      'அருங்காட்சியகங்கள் மற்றும் கோயில்களில் பாதுகாக்கப்படும் சிற்பங்கள், கோட்டை நுழைவாயில்கள் மற்றும் அரச ஓவியங்கள்.',
    viewGalleryBtn: 'முழு படத்தொகுப்பைக் காண்க',
    statsBadge: 'சரிபார்ப்புக் குறியீடு',
    statsTitle: 'தளத்தின் நம்பகத்தன்மை மற்றும் ஆய்வு விவரங்கள்',
    catAll: 'அனைத்து வரலாற்று சகாப்தங்கள்',
    catSolarAntiquity: 'I. சூரியவம்ச தொன்மை & பண்டைய கலிங்க-ஒட்ர (இதிகாச காலம் – கிமு 1ஆம் நூற்றாண்டு)',
    catSolarAntiquitySub:
      'இக்ஷ்வாகு சூரியவம்ச மூலபுருஷர்கள், கலிங்கப் போர் (கிமு 261) மற்றும் காரவேலனின் ஹாதிகும்பா கல்வெட்டு.',
    catOdraGajapathi: 'II. ஒட்ர தேசம் & சூரியவம்ச கஜபதி பேரரசு (7ஆம் – 16ஆம் நூற்றாண்டு)',
    catOdraGajapathiSub:
      'ஒட்ர தேச எல்லை விரிவாக்கம், கபிலேந்திர தேவ கஜபதியின் தென்னக வெற்றிகள் மற்றும் கொல்லேட்டிகோட்டை நீர்க்கோட்டை.',
    catCommunityGenealogy: 'III. சமுதாய மரபு, குடும்பப் பெயர்கள் & மரபுவழி (12ஆம் நூற்றாண்டு – தற்காலம்)',
    catCommunityGenealogySub:
      'ஓட்-ராஜபுத், ஒட்ர-க்ஷத்ரிய, ஒடியராஜு/வட்டேராஜுலு வரலாறு மற்றும் கல்வெட்டு வழி வம்சாவளி முறை.',
    catEpigraphyArch: 'IV. முதன்மைக் கல்வெட்டுகள், சுவடிகள் & கட்டிடக்கலை (கிமு 1ஆம் நூற்றாண்டு – 1815)',
    catEpigraphyArchSub:
      'வெலிகலானி செப்புப் பட்டயம், மாதலா பாஞ்சி, சரஸ்வதி விலாசம் மற்றும் கலிங்க-ஒட்ர கட்டடக் கலை.',
    viewCategoryBtn: 'இப்பிரிவின் கட்டுரைகளைக் காண்க',
    citationsLabel: count => `${count} முதன்மை ஆதாரங்கள்`
  },
  mr: {
    heroMainTitle: 'सूर्यवंश ओडियाराजू क्षत्रिय वारसा पोर्टल',
    heroMainSubtitle: 'शाही सार्वभौमत्व, शिलालेखाधारित पुराभिलेख आणि सभ्यता वंशावळ',
    heroTagline:
      'ओड्र देश, कलिंग आणि दख्खनमधील ३,०००+ वर्षांचा सूर्यवंशी राजे, पराक्रमी गजपती सम्राट, जल अभियांत्रिकी आणि जिवंत कुल परंपरेचा दस्तऐवजीकरण संग्रह.',
    exploreHeritageBtn: 'शाही वारसा पहा',
    watchDocumentaryBtn: 'ऐतिहासिक प्रबंध वाचा',
    quickAccessBadge: 'अभिलेखागार प्रवेश',
    quickAccessTitle: 'अभिलेखागार पोर्टल आणि ऐतिहासिक दस्तऐवज',
    quickAccessSub:
      'प्रमाणित शिलालेख, राजवंश कालरेषा, सामाजिक वंशावळ आणि दुर्मिळ शिल्पांपर्यंत थेट पोहोच.',
    journeyBadge: 'प्रादेशिक सार्वभौमत्व',
    journeyTitle: 'ऐतिहासिक साम्राज्ये आणि शाही भूगोल',
    journeySub:
      'ओड्र देशाच्या महानदी खोऱ्यापासून ते त्रिकलिंगच्या गोदावरी-कृष्णा त्रिभुज प्रदेशापर्यंत.',
    exploreRealmBtn: 'साम्राज्य इतिहास पहा',
    personagesBadge: 'शाही चरित्रे',
    personagesTitle: 'प्रतापी सम्राट, आदि-पुरुष आणि पायका महानायक',
    personagesSub:
      'शिलालेख, ताम्रपट आणि दरबारी इतिहासावर आधारित अधिकृत चरित्र रूपरेषा.',
    viewBiographyBtn: 'शाही चरित्र वाचा',
    viewAllPersonagesBtn: 'सर्व १३ ऐतिहासिक व्यक्ती पहा',
    showMorePersonagesBtn: total => `सर्व व्यक्ती पहा (${total} राजे)`,
    showLessPersonagesBtn: 'कमी व्यक्ती दाखवा',
    articlesBadge: 'विद्वत्तापूर्ण लेख व प्रबंध',
    articlesTitle: 'कालक्रमानुसार ऐतिहासिक संग्रह',
    articlesSub:
      'सूर्यवंश शाही वारशाच्या चार प्रमुख कालखंडांवरील संदर्भ-सत्यापित शोधनिबंध.',
    readArticleBtn: 'पूर्ण प्रबंध वाचा',
    viewAllArticlesBtn: 'सर्व संशोधन लेख पहा',
    timelineBadge: 'कालानुक्रम अखंडता',
    timelineTitle: 'सहस्रकांचा शाही कालक्रम',
    timelineSub:
      'वैदिक काळापासून मध्ययुगीन साम्राज्य आणि आजच्या जिवंत कुल परंपरेपर्यंतचा अखंड इतिहास.',
    exploreTimelineBtn: 'परस्परसंवादी कालरेषा उघडा',
    resourcesBadge: 'पुराभिलेख दालन',
    resourcesTitle: 'पुराभिलेखीय स्रोत आणि प्राथमिक पुरावे',
    resourcesSub:
      'डिजिटलाइझ केलेले ताम्रपट, ताडपत्र हस्तलिखिते, मंदिर शिलालेख आणि गॅझेटिअर्स.',
    openResourceBtn: 'अभिलेख दालन पहा',
    galleryBadge: 'शिल्पकला दालन',
    galleryTitle: 'ऐतिहासिक चित्रे आणि पवित्र प्रतिमा',
    gallerySub:
      'संग्रहालये आणि मंदिरांत जतन केलेली शिल्पे, किल्ले महाद्वार, वीरगळ आणि शाही चित्रे.',
    viewGalleryBtn: 'संपूर्ण चित्र दालन उघडा',
    statsBadge: 'सत्यापन निर्देशांक',
    statsTitle: 'पोर्टलची सत्यता आणि संशोधन आकडेवारी',
    catAll: 'सर्व ऐतिहासिक कालखंड',
    catSolarAntiquity: 'I. सूर्यवंश प्राचीनता आणि प्राचीन कलिंग-ओड्र (महाकाव्य काल – इ.स.पूर्व १ ले शतक)',
    catSolarAntiquitySub:
      'इक्ष्वाकु सूर्यवंशी आदि-पुरुष, कलिंग युद्ध (इ.स.पूर्व २६१) आणि सम्राट खारवेलाचा हाथीगुंफा शिलालेख.',
    catOdraGajapathi: 'II. ओड्र देश आणि सूर्यवंशी गजपती साम्राज्य (७ वे – १६ वे शतक)',
    catOdraGajapathiSub:
      'ओड्र देशाचा प्रादेशिक विस्तार, सम्राट कपिलेन्द्र देव गजपतींचे विजय आणि कोल्लेटीकोटा जलदुर्ग.',
    catCommunityGenealogy: 'III. सामाजिक वारसा, आडनावे आणि वंशावळ (१२ वे शतक – वर्तमान)',
    catCommunityGenealogySub:
      'ओड-राजपूत, ओड्र-क्षत्रिय, ओडियाराजू/वड्डेराजुलू इतिहास आणि शिलालेखाधारित वंशावळ पद्धती.',
    catEpigraphyArch: 'IV. प्राथमिक शिलालेख, हस्तलिखिते आणि स्थापत्य (इ.स.पूर्व १ ले शतक – १८१५)',
    catEpigraphyArchSub:
      'वेलिगलाणी ताम्रपट, मादला पांजी, सरस्वती विलासम आणि कलिंग-ओड्र स्थापत्य शैली.',
    viewCategoryBtn: 'या श्रेणीतील लेख पहा',
    citationsLabel: count => `${count} प्राथमिक पुरावे`
  },
  or: {
    heroMainTitle: 'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିୟାରାଜୁ କ୍ଷତ୍ରିୟ ଐତିହ୍ୟ ପୋର୍ଟାଲ୍',
    heroMainSubtitle: 'ରାଜକୀୟ ସାର୍ବଭୌମତ୍ୱ, ଶିଳାଲେଖ ପ୍ରମାଣ ଓ ସଭ୍ୟତା ବଂଶାବଳୀ',
    heroTagline:
      'ଓଡ୍ର ଦେଶ, କଳିଙ୍ଗ ଏବଂ ଦାକ୍ଷିଣାତ୍ୟରେ ୩,୦୦୦+ ବର୍ଷର ସୂର୍ଯ୍ୟବଂଶୀ ରାଜା, ମହାନ ଗଜପତି ସମ୍ରାଟ, ଜଳ ଇଞ୍ଜିନିୟରିଂ ଏବଂ ଜୀବନ୍ତ କୁଳ ପରମ୍ପରାର ପ୍ରାମାଣିକ ଅଭିଲେଖାଗାର।',
    exploreHeritageBtn: 'ରାଜକୀୟ ଐତିହ୍ୟ ଦେଖନ୍ତୁ',
    watchDocumentaryBtn: 'ଐତିହାସିକ ଗବେଷଣା ପଢ଼ନ୍ତୁ',
    quickAccessBadge: 'ଅଭିଲେଖାଗାର ପ୍ରବେଶ',
    quickAccessTitle: 'ଅଭିଲେଖାଗାର ପୋର୍ଟାଲ୍ ଓ ଐତିହାସିକ ତଥ୍ୟ',
    quickAccessSub:
      'ପ୍ରମାଣିତ ଶିଳାଲେଖ, ରାଜବଂଶ ସମୟରେଖା, କୂଳ ବଂଶାବଳୀ ଏବଂ ଦୁର୍ଲଭ ମୂର୍ତ୍ତିକଳାର ସିଧାସଳଖ ଅନୁସନ୍ଧାନ।',
    journeyBadge: 'ଆଞ୍ଚଳିକ ସାର୍ବଭୌମତ୍ୱ',
    journeyTitle: 'ଐତିହାସିକ ସାମ୍ରାଜ୍ୟ ଓ ଭୌଗୋଳିକ ସୀମା',
    journeySub:
      'ଓଡ୍ର ଦେଶର ମହାନଦୀ ଅବବାହିକାରୁ ତ୍ରିକଳିଙ୍ଗର ଗୋଦାବରୀ-କୃଷ୍ଣା ତ୍ରିକୋଣଭୂମି ପର୍ଯ୍ୟନ୍ତ।',
    exploreRealmBtn: 'ସାମ୍ରାଜ୍ୟ ଇତିହାସ ଦେଖନ୍ତୁ',
    personagesBadge: 'ରାଜ ଜୀବନୀ',
    personagesTitle: 'ଗୌରବମୟ ସମ୍ରାଟ, ଆଦିପୁରୁଷ ଓ ପାଇକ ବୀର',
    personagesSub:
      'ଶିଳାଲେଖ, ତାମ୍ରଫଳକ ଏବଂ ଦରବାରୀ ଇତିହାସ ଉପରେ ଆଧାରିତ ପ୍ରାମାଣିକ ଜୀବନୀ ଆଲେଖ୍ୟ।',
    viewBiographyBtn: 'ଜୀବନୀ ପଢ଼ନ୍ତୁ',
    viewAllPersonagesBtn: 'ସମସ୍ତ ୧୩ ଜଣ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ ଦେଖନ୍ତୁ',
    showMorePersonagesBtn: total => `ସମସ୍ତ ବ୍ୟକ୍ତିତ୍ୱ ଦେଖନ୍ତୁ (${total} ରାଜା)`,
    showLessPersonagesBtn: 'କମ୍ ଦେଖନ୍ତୁ',
    articlesBadge: 'ଗବେଷଣାତ୍ମକ ପ୍ରବନ୍ଧ',
    articlesTitle: 'କାଳାନୁକ୍ରମିକ ଐତିହାସିକ ସଂକଳନ',
    articlesSub:
      'ସୂର୍ଯ୍ୟବଂଶ ରାଜକୀୟ ଐତିହ୍ୟର ଚାରୋଟି ପ୍ରମୁଖ ଯୁଗ ଉପରେ ଉତ୍ସ-ଆଧାରିତ ଗବେଷଣା।',
    readArticleBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରବନ୍ଧ ପଢ଼ନ୍ତୁ',
    viewAllArticlesBtn: 'ସମସ୍ତ ଗବେଷଣା ପ୍ରବନ୍ଧ ଦେଖନ୍ତୁ',
    timelineBadge: 'କାଳାନୁକ୍ରମ ନିରନ୍ତରତା',
    timelineTitle: 'ସହସ୍ରାବ୍ଦୀର ରାଜକୀୟ ସମୟକ୍ରମ',
    timelineSub:
      'ବୈଦିକ ଯୁଗରୁ ମଧ୍ୟଯୁଗୀୟ ସାମ୍ରାଜ୍ୟ ଏବଂ ଆଜିର ଜୀବନ୍ତ କୁଳ ପରମ୍ପରା ପର୍ଯ୍ୟନ୍ତ ଅଖଣ୍ଡ ଇତିହାସ।',
    exploreTimelineBtn: 'ପୂର୍ଣ୍ଣ ଟାଇମଲାଇନ ଖୋଲନ୍ତୁ',
    resourcesBadge: 'ଅଭିଲେଖ ଭଣ୍ଡାର',
    resourcesTitle: 'ମୌଳିକ ପ୍ରମାଣ ଓ ଐତିହାସିକ ଉତ୍ସ',
    resourcesSub:
      'ଡିଜିଟାଲ୍ ତାମ୍ରଫଳକ, ତାଳପତ୍ର ପୋଥି, ମନ୍ଦିର ଶିଳାଲେଖ ଏବଂ ଐତିହାସିକ ଗେଜେଟିଅର୍।',
    openResourceBtn: 'ଅଭିଲେଖ ଭଣ୍ଡାର ଦେଖନ୍ତୁ',
    galleryBadge: 'ଶିଳ୍ପକଳା ଗ୍ୟାଲେରୀ',
    galleryTitle: 'ଐତିହାସିକ ଚିତ୍ର ଓ ପବିତ୍ର ପ୍ରତିମା',
    gallerySub:
      'ସଂଗ୍ରହାଳୟ ଓ ମନ୍ଦିରରେ ସଂରକ୍ଷିତ ମୂର୍ତ୍ତି, ଦୁର୍ଗ ତୋରଣ, ବୀରଗଳ ଏବଂ ରାଜଚିତ୍ର।',
    viewGalleryBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ଚିତ୍ରଶାଳା ଖୋଲନ୍ତୁ',
    statsBadge: 'ପ୍ରମାଣୀକରଣ ସୂଚକାଙ୍କ',
    statsTitle: 'ପୋର୍ଟାଲ ପ୍ରାମାଣିକତା ଓ ଗବେଷଣା ତଥ୍ୟ',
    catAll: 'ସମସ୍ତ ଐତିହାସିକ ଯୁଗ',
    catSolarAntiquity: 'I. ସୂର୍ଯ୍ୟବଂଶ ପ୍ରାଚୀନତା ଓ ପ୍ରାଚୀନ କଳିଙ୍ଗ-ଓଡ୍ର (ପୌରାଣିକ କାଳ – ଖ୍ରୀ.ପୂ. ପ୍ରଥମ ଶତାବ୍ଦୀ)',
    catSolarAntiquitySub:
      'ଇକ୍ଷ୍ୱାକୁ ସୂର୍ଯ୍ୟବଂଶୀ ଆଦିପୁରୁଷ, କଳିଙ୍ଗ ଯୁଦ୍ଧ (ଖ୍ରୀ.ପୂ. ୨୬୧) ଏବଂ ସମ୍ରାଟ ଖାରବେଳଙ୍କ ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖ।',
    catOdraGajapathi: 'II. ଓଡ୍ର ଦେଶ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ (୭ମ – ୧୬ଶ ଶତାବ୍ଦୀ)',
    catOdraGajapathiSub:
      'ଓଡ୍ର ଦେଶର ବିକାଶ, ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ଗଜପତିଙ୍କ ଦିଗ୍‌ବିଜୟ ଏବଂ କୋଲ୍ଲେଟି କୋଟା ଜଳଦୁର୍ଗ।',
    catCommunityGenealogy: 'III. ସାମାଜିକ ଐତିହ୍ୟ, ପଦବୀ ଓ ବଂଶାବଳୀ (୧୨ଶ ଶତାବ୍ଦୀ – ବର୍ତ୍ତମାନ)',
    catCommunityGenealogySub:
      'ଓଡ଼-ରାଜପୁତ, ଓଡ୍ର-କ୍ଷତ୍ରିୟ, ଓଡ଼ିୟାରାଜୁ/ଭଡ୍ଡେରାଜୁଲୁ ଇତିହାସ ଏବଂ ଶିଳାଲେଖ ଆଧାରିତ ବଂଶାବଳୀ।',
    catEpigraphyArch: 'IV. ମୌଳିକ ଶିଳାଲେଖ, ପୋଥି ଓ ମନ୍ଦିର ସ୍ଥାପତ୍ୟ (ଖ୍ରୀ.ପୂ. ପ୍ରଥମ ଶତାବ୍ଦୀ – ୧୮୧୫)',
    catEpigraphyArchSub:
      'ଭେଲିଗାଲାନି ତାମ୍ର ଶାସନ, ମାଦଳା ପାଞ୍ଜି, ସରସ୍ୱତୀ ବିଳାସମ୍ ଏବଂ କଳିଙ୍ଗ-ଓଡ୍ର ମନ୍ଦିର ନିର୍ମାଣ ଶୈଳୀ।',
    viewCategoryBtn: 'ଏହି ବିଭାଗର ପ୍ରବନ୍ଧ ଦେଖନ୍ତୁ',
    citationsLabel: count => `${count}ଟି ମୌଳିକ ପ୍ରମାଣ`
  },
  bn: {
    heroMainTitle: 'সূর্যবংশ ওড়িয়ারাজু ক্ষত্রিয় ঐতিহ্য পোর্টাল',
    heroMainSubtitle: 'রাজকীয় সার্বভৌমত্ব, শিলালিপি প্রমাণ ও সভ্যতাগত বংশাবলি',
    heroTagline:
      'ওড্র দেশ, কলিঙ্গ এবং দাক্ষিণাত্যে ৩,০০০+ বছরের সূর্যবংশীয় রাজা, পরাক্রমশালী গজপতি সম্রাট, জল প্রকৌশল ও জীবন্ত সমাজ ঐতিহ্যের প্রামাণ্য মহাফেজখানা।',
    exploreHeritageBtn: 'রাজকীয় ঐতিহ্য দেখুন',
    watchDocumentaryBtn: 'ঐতিহাসিক গবেষণা পড়ুন',
    quickAccessBadge: 'ঐতিহাসিক প্রবেশদ্বার',
    quickAccessTitle: 'নথিভুক্ত মহাফেজখানা ও ঐতিহাসিক রেকর্ড',
    quickAccessSub:
      'যাচাইকৃত শিলালিপি, রাজবংশের সময়রেখা, সামাজিক বংশাবলি এবং দুর্লভ মূর্তিশিল্পের সরাসরি অনুসন্ধান।',
    journeyBadge: 'আঞ্চলিক সার্বভৌমত্ব',
    journeyTitle: 'ঐতিহাসিক সাম্রাজ্য ও রাজকীয় ভূগোল',
    journeySub:
      'ওড্র দেশের পবিত্র মহানদী অববাহিকা থেকে ত্রিকলিঙ্গের গোদাবরী-কৃষ্ণা ব-দ্বীপ পর্যন্ত।',
    exploreRealmBtn: 'সাম্রাজ্যের ইতিহাস দেখুন',
    personagesBadge: 'রাজকীয় জীবনী',
    personagesTitle: 'প্রখ্যাত সম্রাট, আদি-পুরুষ ও পাইকা নায়কবৃন্দ',
    personagesSub:
      'শিলালিপি, তাম্রশাসন এবং ঐতিহাসিক নথির ওপর ভিত্তি করে রচিত প্রামাণ্য জীবনী রূপরেখা।',
    viewBiographyBtn: 'জীবনী পড়ুন',
    viewAllPersonagesBtn: 'সকল ১৩ জন ঐতিহাসিক ব্যক্তিত্ব দেখুন',
    showMorePersonagesBtn: total => `সকল ব্যক্তিত্ব দেখুন (${total} জন রাজা)`,
    showLessPersonagesBtn: 'কম ব্যক্তিত্ব দেখান',
    articlesBadge: 'গবেষণাধর্মী প্রবন্ধ ও গ্রন্থমালা',
    articlesTitle: 'কালানুক্রমিক ঐতিহাসিক সংকলন',
    articlesSub:
      'সূর্যবংশ রাজ ঐতিহ্যের চারটি সুনির্দিষ্ট ঐতিহাসিক যুগের ওপর তথ্যভিত্তিক গবেষণা।',
    readArticleBtn: 'সম্পূর্ণ প্রবন্ধ পড়ুন',
    viewAllArticlesBtn: 'সকল গবেষণা প্রবন্ধ দেখুন',
    timelineBadge: 'কালানুক্রমিক ধারাবাহিকতা',
    timelineTitle: 'সহস্রাব্দের রাজকীয় সময়রেখা',
    timelineSub:
      'বৈদিক যুগ থেকে মধ্যযুগীয় সাম্রাজ্য এবং আজকের জীবন্ত সমাজ ঐতিহ্য পর্যন্ত নিরবচ্ছিন্ন ইতিহাস।',
    exploreTimelineBtn: 'ইন্টারেক্টিভ সময়রেখা খুলুন',
    resourcesBadge: 'শিলালিপি ভাণ্ডার',
    resourcesTitle: 'মৌলিক প্রমাণ ও ঐতিহাসিক উৎস',
    resourcesSub:
      'ডিজিটালাইজড তাম্রশাসন, তালপাতার পুথি, মন্দির শিলালিপি এবং ঐতিহাসিক গেজেটিয়ার।',
    openResourceBtn: 'নথিপত্র ভাণ্ডার দেখুন',
    galleryBadge: 'মূর্তিশিল্প গ্যালারি',
    galleryTitle: 'ঐতিহাসিক চিত্র ও পবিত্র ভাস্কর্য',
    gallerySub:
      'জাদুঘর ও মন্দিরে সংরক্ষিত প্রাচীন ভাস্কর্য, দুর্গ তোরণ, বীরপ্রস্তর এবং রাজ প্রতিকৃতি।',
    viewGalleryBtn: 'সম্পূর্ণ চিত্রশালা খুলুন',
    statsBadge: 'যাচাইকরণ সূচক',
    statsTitle: 'পোর্টালের প্রামাণিকতা ও গবেষণার পরিসংখ্যান',
    catAll: 'সকল ঐতিহাসিক যুগ',
    catSolarAntiquity: 'I. সূর্যবংশ প্রাচীনতা ও প্রাচীন কলিঙ্গ-ওড্র (মহাকাব্য যুগ – খ্রি.পূ. ১ম শতাব্দী)',
    catSolarAntiquitySub:
      'ইক্ষ্বাকু সূর্যবংশীয় আদি-পুরুষ, মহান কলিঙ্গ যুদ্ধ (খ্রি.পূ. ২৬১) ও সম্রাট খারবেলের হাতিগুম্ফা শিলালিপি।',
    catOdraGajapathi: 'II. ওড্র দেশ ও সূর্যবংশীয় গজপতি সাম্রাজ্য (৭ম – ১৬শ শতাব্দী)',
    catOdraGajapathiSub:
      'ওড্র দেশের ভৌগোলিক বিকাশ, সম্রাট কপিলেন্দ্র দেব গজপতির সাম্রাজ্য এবং কোল্লেটিকোটা জলদুর্গ।',
    catCommunityGenealogy: 'III. সম্প্রদায়গত ঐতিহ্য, উপাধি ও রাজবংশাবলী (১২শ শতাব্দী – বর্তমান)',
    catCommunityGenealogySub:
      'ওড়-রাজপুত, ওড্র-ক্ষত্রিয়, ওড়িয়ারাজু/ভড্ডেরাজুলু ইতিহাস এবং শিলালিপি ভিত্তিক বংশাবলী পদ্ধতি।',
    catEpigraphyArch: 'IV. প্রাথমিক শিলালিপি, পুঁথি ও মন্দির স্থাপত্য (খ্রি.পূ. ১ম শতাব্দী – ১৮১৫ খ্রি.)',
    catEpigraphyArchSub:
      'তাম্রশাসন, মাদলা পাঞ্জি, সরস্বতী বিলাস এবং কলিঙ্গ-ওড্র মন্দির ও দুর্গ।',
    viewCategoryBtn: 'সব দেখুন',
    citationsLabel: count => `${count}টি সূত্র`
  }
};
