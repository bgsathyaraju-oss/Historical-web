import type { Article, LanguageCode, SourceReference } from '../types/index.ts';
import { KAKATIYA_REFERENCE_ID_MAP } from './kakatiyaDynastyData.ts';

const ARCHIVE_IMG = (file: string) =>
  `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/${file}`;
const ASSET_IMG = (file: string) =>
  `${(import.meta as any).env?.BASE_URL || '/'}${file.replace(/^\//, '')}`;

export type CanonicalCategoryCode = 'HT' | 'IA' | 'RD' | 'KM' | 'HD' | 'HG' | 'HF';

export interface CanonicalHistoricalCategory {
  code: CanonicalCategoryCode;
  id: string;
  refPrefix: CanonicalCategoryCode;
  route: string;
  thumbnail: string;
  iconAsset: string;
  title: Record<LanguageCode, string>;
  subtitle: Record<LanguageCode, string>;
  introduction: Record<LanguageCode, string>;
  subcategories: Array<{
    id: string;
    label: Record<LanguageCode, string>;
  }>;
  keywords: string[];
  hashtags: string[];
  featuredArticleIds: string[];
}

export interface ArticleStructuredMetadata {
  refNumber: string;
  articleId: string;
  categoryCode: CanonicalCategoryCode;
  categoryName: Record<LanguageCode, string>;
  subcategoryName: Record<LanguageCode, string>;
  historicalPeriod: Record<LanguageCode, string>;
  approxDateRange: Record<LanguageCode, string>;
  geographicalLocation: Record<LanguageCode, string>;
  epistemicClassification:
    | 'Verified Epigraphic & Archaeological Evidence'
    | 'Scholarly Historiographical Synthesis'
    | 'Traditional & Sacred Lineage Tradition'
    | 'Requires Independent Epigraphic Verification';
  imageProvenance: {
    title: string;
    caption: string;
    period: string;
    sourceOrProvenance: string;
    credit: string;
    altText: string;
    visualType:
      | 'Archival Photograph / Epigraphic Facsimile'
      | 'Cartographic Reconstruction'
      | 'Artistic Reconstruction / Symbolic Illustration (Not an Authenticated Contemporary Portrait)';
  };
  communityCrossReferences: Array<{
    communityId: string;
    canonicalTerm: string;
    associationType:
      | 'Documented Epigraphic / Gazetteer Association'
      | 'Traditional Lineage Claim'
      | 'Unverified Hypothesis — Historical Association Not Independently Verified';
    historicalPeriod: string;
    relationshipSummary: Record<LanguageCode, string>;
    supportingRef: string;
    targetRoute: string;
  }>;
  unverifiedCommunityNotice?: boolean;
  relatedArticleIds: string[];
  relatedFigureIds: string[];
  relatedDynastyNames: string[];
}

export interface ParallelRegionalTrack {
  corridorId: string;
  corridorLabel: Record<LanguageCode, string>;
  dynastiesAndPolities: Record<LanguageCode, string>;
  dateSpan: string;
  dateType: 'Established Inscriptional' | 'Approximate Reign' | 'Disputed Interpretation' | 'Traditional Claim';
  epigraphicAnchor: string;
}

export interface ChronologicalEpochStage {
  stageOrder: number;
  id: string;
  refNumber: string;
  stageCode:
    | 'MYTHOLOGICAL_TRADITIONS'
    | 'ANCIENT_CIVILIZATIONS'
    | 'EARLY_HISTORICAL_PERIOD'
    | 'ANCIENT_KINGDOMS'
    | 'MEDIEVAL_KINGDOMS'
    | 'IMPERIAL_DYNASTIES'
    | 'LATE_MEDIEVAL_PERIOD'
    | 'MODERN_HISTORICAL_PERIOD';
  title: Record<LanguageCode, string>;
  approxDateLabel: Record<LanguageCode, string>;
  chronologicalUncertaintyNote: Record<LanguageCode, string>;
  epistemicLabel: Record<LanguageCode, string>;
  epistemicTier: 'mythological_sacred' | 'proto_historical' | 'early_epigraphic' | 'verified_historical';
  symbolicIllustration: string;
  illustrationCaption: Record<LanguageCode, string>;
  visualTypeBadge: Record<LanguageCode, string>;
  conciseOverview: Record<LanguageCode, string>;
  detailedAnalysis: Record<LanguageCode, string>;
  dateClassificationBreakdown?: {
    establishedInscriptional: Record<LanguageCode, string>;
    approximateDynastic: Record<LanguageCode, string>;
    disputedInterpretations: Record<LanguageCode, string>;
    traditionalClaims: Record<LanguageCode, string>;
  };
  parallelTracks?: ParallelRegionalTrack[];
  keyMonumentsAndInscriptions: string[];
  linkedArticleIds: string[];
  linkedEventIds: string[];
}

/**
 * 1. SEVEN CANONICAL HISTORICAL CATEGORIES
 */
export const SEVEN_HISTORICAL_CATEGORIES: CanonicalHistoricalCategory[] = [
  {
    code: 'HT',
    id: 'cat_historical_timeline',
    refPrefix: 'HT',
    route: '/timeline',
    thumbnail: ARCHIVE_IMG('kalinga_dhauli_rock_edicts.jpg'),
    iconAsset: ASSET_IMG('assets/icon-monographs.webp'),
    title: {
      en: '1. Historical Timeline',
      hi: '1. ऐतिहासिक कालक्रम (Historical Timeline)',
      te: '1. చారిత్రక కాలక్రమం (Historical Timeline)',
      kn: '1. ಐತಿಹಾಸಿಕ ಕಾಲಾನುಕ್ರಮ (Historical Timeline)',
      ta: '1. வரலாற்று காலவரிசை (Historical Timeline)',
      mr: '1. ऐतिहासिक कालक्रम (Historical Timeline)',
      or: '1. ଐତିହାସିକ କାଳକ୍ରମ (Historical Timeline)',
      bn: '1. ঐতিহাসিক কালক্রম (Historical Timeline)'
    },
    subtitle: {
      en: 'From Mythological Traditions & Early Civilizations to Imperial Dynasties & Modern History',
      hi: 'पौराणिक परंपराओं और प्राचीन सभ्यताओं से लेकर साम्राज्यवादी राजवंशों और आधुनिक इतिहास तक',
      te: 'పురాణ సంప్రదాయాలు & ప్రాచీన నాగరికతల నుండి సామ్రాజ్య రాజవంశాలు & ఆధునిక చరిత్ర వరకు',
      kn: 'ಪೌರಾಣಿಕ ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ಪ್ರಾಚೀನ ನಾಗರಿಕತೆಗಳಿಂದ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ರಾಜವಂಶಗಳು ಮತ್ತು ಆಧುನಿಕ ಇತಿಹಾಸದವರೆಗೆ',
      ta: 'புராண மரபுகள் மற்றும் பண்டைய நாகரிகங்கள் முதல் பேரரசு வம்சங்கள் மற்றும் நவீன வரலாறு வரை',
      mr: 'पौराणिक परंपरा आणि प्राचीन संस्कृतींपासून साम्राज्यवादी राजवंश आणि आधुनिक इतिहासापर्यंत',
      or: 'ପୌରାଣିକ ପରମ୍ପରା ଓ ପ୍ରାଚୀନ ସଭ୍ୟତାରୁ ସାମ୍ରାଜ୍ୟবাদୀ ରାଜବଂଶ ଓ ଆଧୁନିକ ଇତିହାସ ପର୍ଯ୍ୟନ୍ତ',
      bn: 'পৌরাণিক ঐতিহ্য ও প্রাচীন সভ্যতা থেকে সাম্রাজ্যবাদী রাজবংশ ও আধুনিক ইতিহাস পর্যন্ত'
    },
    introduction: {
      en: 'A rigorous eight-stage chronological framework tracing Indian and Odra-Deccan history from sacred epic traditions through proto-historical settlements, early rock edicts, ancient and medieval kingdoms, imperial dynasties, and the modern era—strictly separating mythological memory from epigraphically verified chronology.',
      hi: 'पौराणिक महाकाव्य परंपराओं से लेकर आद्य-ऐतिहासिक बस्तियों, प्रारंभिक शिलालेखों, प्राचीन और मध्यकालीन राज्यों, साम्राज्यवादी राजवंशों और आधुनिक युग तक का आठ-चरणीय कालानुक्रमिक ढांचा—जो पौराणिक स्मृति को शिलालेखीय रूप से सत्यापित तिथियों से स्पष्ट रूप से अलग करता है।',
      te: 'పురాణ ఇతిహాస సంప్రదాయాల నుండి పురావస్తు స్థావరాలు, ప్రాచీన శిలాశాసనాలు, ప్రాచీన-మధ్యయుగ రాజ్యాలు, సామ్రాజ్య రాజవంశాలు మరియు ఆధునిక యుగం వరకు ఎనిమిది దశల కాలక్రమ నిర్మాణం—పురాణ గాథలను శాసన ఆధారిత చరిత్ర నుండి స్పష్టంగా వేరు చేస్తుంది.',
      kn: 'ಪೌರಾಣಿಕ ಮಹಾಕಾವ್ಯ ಸಂಪ್ರದಾಯಗಳಿಂದ ಪ್ರಾರಂಭಿಸಿ ಪುರಾತತ್ವ ನೆಲೆಗಳು, ಆರಂಭಿಕ ಶಿಲಾಶಾಸನಗಳು, ಪ್ರಾಚೀನ ಮತ್ತು ಮಧ್ಯಕಾಲೀನ రాజ్యಗಳು, ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ರಾಜವಂಶಗಳು ಮತ್ತು ಆಧುನಿಕ ಯುಗದವರೆಗಿನ ಎಂಟು ಹಂತಗಳ ಕಾಲಾನುಕ್ರಮ ಚೌಕಟ್ಟು.',
      ta: 'புராண இதிகாச மரபுகள் முதல் தொல்லியல் குடியிருப்புகள், தொடக்கக் காலக் கல்வெட்டுகள், பண்டைய மற்றும் இடைக்கால அரசுகள், பேரரசு வம்சங்கள் மற்றும் நவீன காலம் வரையிலான எட்டு நிலை காலவரிசை கட்டமைப்பு.',
      mr: 'पौराणिक महाकाव्य परंपरेपासून आद्य-ऐतिहासिक वस्त्या, प्रारंभिक शिलालेख, प्राचीन व मध्ययुगीन राज्ये, साम्राज्यवादी राजवंश आणि आधुनिक काळापर्यंतची आठ-टप्प्यांची कालानुक्रमिक चौकट.',
      or: 'ପୌରାଣିକ ମହାକାବ୍ୟ ପରମ୍ପରାରୁ ଆରମ୍ଭ କରି ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ବସତି, ପ୍ରାରମ୍ଭିକ ଶିଳାଲେଖ, ପ୍ରାଚୀନ ଓ ମଧ୍ୟଯୁଗୀୟ ରାଜ୍ୟ, ସାମ୍ରାଜ୍ୟবাদୀ ରାଜବଂଶ ଏବଂ ଆଧୁନିକ ଯୁଗ ପର୍ଯ୍ୟନ୍ତ ଆଠ-ପର୍ଯ୍ୟାୟ କାଳକ୍ରମିକ ଢାଞ୍ଚା।',
      bn: 'পৌরাণিক মহাকাব্যিক ঐতিহ্য থেকে প্রত্নতাত্ত্বিক বসতি, প্রারମ୍ଭিক শিলালিপি, প্রাচীন ও মধ্যযুগীয় রাজ্য, সাম্রাজ্যবাদী রাজবংশ এবং আধুনিক যুগ পর্যন্ত আট-পর্যায়ের কালানুক্রমিক কাঠামো।'
    },
    subcategories: [
      { id: 'mythological_sacred', label: { en: 'Mythological & Sacred Traditions', hi: 'पौराणिक एवं पवित्र परंपराएं', te: 'పురాణ & పవిత్ర సంప్రదాయాలు', kn: 'ಪೌರಾಣಿಕ ಮತ್ತು ಪವಿತ್ರ ಸಂಪ್ರದಾಯಗಳು', ta: 'புராண & புனித மரபுகள்', mr: 'पौराणिक आणि पवित्र परंपरा', or: 'ପୌରାଣିକ ଓ ପବିତ୍ର ପରମ୍ପରା', bn: 'পৌরাণিক ও পবিত্র ঐতিহ্য' } },
      { id: 'ancient_early_history', label: { en: 'Ancient Civilizations & Early Historical Period', hi: 'प्राचीन सभ्यताएं एवं प्रारंभिक ऐतिहासिक काल', te: 'ప్రాచీన నాగరికతలు & ప్రారంభ చారిత్రక కాలం', kn: 'ಪ್ರಾಚೀನ ನಾಗರಿಕತೆಗಳು ಮತ್ತು ಆರಂಭಿಕ ಐತಿಹಾಸಿಕ ಕಾಲ', ta: 'பண்டைய நாகரிகங்கள் & தொடக்க வரலாற்றுக் காலம்', mr: 'प्राचीन संस्कृती आणि प्रारंभिक ऐतिहासिक काळ', or: 'ପ୍ରାଚୀନ ସଭ୍ୟତା ଓ ପ୍ରାରମ୍ଭିକ ଐତିହାସିକ କାଳ', bn: 'প্রাচীন সভ্যতা ও প্রারମ୍ଭিক ঐতিহাসিক কাল' } },
      { id: 'medieval_imperial', label: { en: 'Medieval Kingdoms & Imperial Dynasties', hi: 'मध्यकालीन राज्य एवं साम्राज्यवादी राजवंश', te: 'మధ్యయుగ రాజ్యాలు & సామ్రాజ్య రాజవంశాలు', kn: 'ಮಧ್ಯಕಾಲೀನ ರಾಜ್ಯಗಳು ಮತ್ತು ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ರಾಜವಂಶಗಳು', ta: 'இடைக்கால அரசுகள் & பேரரசு வம்சங்கள்', mr: 'मध्ययुगीन राज्ये आणि साम्राज्यवादी राजवंश', or: 'ମଧ୍ୟଯୁଗୀୟ ରାଜ୍ୟ ଓ ସାମ୍ରାଜ୍ୟবাদୀ ରାଜବଂଶ', bn: 'মধ্যযুগীয় রাজ্য ও সাম্রাজ্যবাদী রাজবংশ' } },
      { id: 'late_medieval_modern', label: { en: 'Late Medieval & Modern Historical Period', hi: 'उत्तर मध्यकालीन एवं आधुनिक ऐतिहासिक काल', te: 'మలి మధ్యయుగ & ఆధునిక చారిత్రక కాలం', kn: 'ಉತ್ತರ ಮಧ್ಯಕಾಲೀನ ಮತ್ತು ಆಧುನಿಕ ಐತಿಹಾಸಿಕ ಕಾಲ', ta: 'பிற்கால இடைக்காலம் & நவீன வரலாற்றுக் காலம்', mr: 'उत्तर मध्ययुगीन आणि आधुनिक ऐतिहासिक काळ', or: 'ଉତ୍ତର-ମଧ୍ୟଯୁଗୀୟ ଓ ଆଧୁନିକ ଐତିହାସିକ କାଳ', bn: 'উত্তর-মধ্যযুগীয় ও আধুনিক ঐতিহাসিক কাল' } }
    ],
    keywords: ['Historical Timeline', 'Chronology', 'Kalinga War 261 BCE', 'Hathigumpha', 'Gajapathi Coronation 1434 CE', 'Paika Rebellion 1817'],
    hashtags: ['#HistoricalTimeline', '#IndianChronology', '#EpigraphicDating', '#OdraKalingaHistory'],
    featuredArticleIds: ['art_ht_chronological_methodology', 'art_surya_vamsa_sagara_rama', 'art_epigraphic_evolution_odra', 'art_gajapathi_kapilendra']
  },
  {
    code: 'IA',
    id: 'cat_inscriptions_archaeology',
    refPrefix: 'IA',
    route: '/inscriptions',
    thumbnail: ARCHIVE_IMG('hathigumpha_inscription.jpg'),
    iconAsset: ASSET_IMG('assets/icon-inscriptions.webp'),
    title: {
      en: '2. Inscriptions & Archaeology',
      hi: '2. शिलालेख एवं पुरातत्व (Inscriptions & Archaeology)',
      te: '2. శాసనాలు & పురావస్తు ఆధారాలు (Inscriptions & Archaeology)',
      kn: '2. ಶಾಸನಗಳು ಮತ್ತು ಪುರಾತತ್ವ (Inscriptions & Archaeology)',
      ta: '2. கல்வெட்டுகள் & தொல்லியல் (Inscriptions & Archaeology)',
      mr: '2. शिलालेख आणि पुरातत्व (Inscriptions & Archaeology)',
      or: '2. ଶିଳାଲେଖ ଓ ପ୍ରତ୍ନତତ୍ତ୍ୱ (Inscriptions & Archaeology)',
      bn: '2. শিলালিপি ও প্রত্নতত্ত্ব (Inscriptions & Archaeology)'
    },
    subtitle: {
      en: 'Lithic Edicts, Royal Copper-Plate Charters, Fortifications & Temple Excavations',
      hi: 'शिलालेख, राजकीय ताम्रपत्र, दुर्ग प्राचीर एवं मंदिर उत्खनन',
      te: 'శిలాశాసనాలు, రాజ తామ్రపత్రాలు, కోట బురుజులు & ఆలయ పురావస్తు ఆధారాలు',
      kn: 'ಶಿಲಾಶಾಸನಗಳು, ರಾಜ ತಾಮ್ರಪತ್ರಗಳು, ಕೋಟೆಗಳು ಮತ್ತು ದೇವಾಲಯ ಉತ್ಖನನಗಳು',
      ta: 'கல்வெட்டுகள், அரச செப்பேடுகள், கோட்டைகள் & கோயில் அகழாய்வுகள்',
      mr: 'शिलालेख, राजकीय ताम्रपट, किल्ले आणि मंदिर उत्खनन',
      or: 'ଶିଳାଲେଖ, ରାଜകୀୟ ତାମ୍ରପଟା, ଦୁର୍ଗ ପ୍ରାଚୀର ଓ ମନ୍ଦିର ଖନନ',
      bn: 'শিলালিপি, রাজকীয় তাম্রশাসন, দুর্গ প্রাচীর ও মন্দির খনন'
    },
    introduction: {
      en: 'Primary epigraphical and archaeological documentation derived from Archaeological Survey of India (ASI) reports, Epigraphia Indica, and South Indian Inscriptions—covering Brahmi rock edicts, Sanskrit-Odia-Telugu-Kannada-Tamil copper plates, and fortified urban excavations.',
      hi: 'भारतीय पुरातत्व सर्वेक्षण (ASI), एपिग्राफिया इंडिका और साउथ इंडियन इंस्क्रिप्शंस पर आधारित प्राथमिक अभिलेखीय और पुरातात्विक प्रलेखन—जिसमें ब्राह्मी शिलालेख, संस्कृत-ओडिया-तेलुगु-कन्नड़-तमिल ताम्रपत्र और दुर्ग उत्खनन शामिल हैं।',
      te: 'భారత పురావస్తు సర్వే (ASI), ఎపిగ్రాఫియా ఇండికా మరియు సౌత్ ఇండియన్ ఇన్‌స్క్రిప్షన్స్ ఆధారంగా బ్రాహ్మీ శిలాశాసనాలు, సంస్కృత-ఒడియా-తెలుగు-కన్నడ-తమిళ తామ్రపత్రాలు మరియు పురావస్తు తవ్వకాల సమగ్ర సేకరణ.',
      kn: 'ಭಾರತೀಯ ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ (ASI), ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ ಮತ್ತು ಸೌತ್ ಇಂಡಿಯನ್ ಇನ್ಸ್‌ಕ್ರಿಪ್ಷನ್ಸ್ ಆಧಾರಿತ ಬ್ರಾಹ್ಮಿ ಶಿಲಾಶಾಸನಗಳು, ತಾಮ್ರಪತ್ರಗಳು ಮತ್ತು ಕೋಟೆ ಉತ್ಖನನಗಳ ದಾಖಲಾತಿ.',
      ta: 'இந்தியத் தொல்லியல் துறையின் (ASI) அறிக்கைகள், எபிகிராஃபியா இண்டிகா மற்றும் தென்னிந்தியக் கல்வெட்டுகள் அடிப்படையிலான பிராமி கல்வெட்டுகள், செப்பேடுகள் மற்றும் தொல்லியல் ஆய்வுத் தொகுப்பு.',
      mr: 'भारतीय पुरातत्व सर्वेक्षण (ASI), एपिग्राफिया इंडिका आणि साउथ इंडियन इन्स्क्रिप्शन्सवर आधारित ब्राह्मी शिलालेख, ताम्रपट आणि पुरातत्त्वीय उत्खननांचे दस्तऐवजीकरण.',
      or: 'ଭାରତୀୟ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସର୍ବେକ୍ଷଣ (ASI), ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା ଏବଂ ସାଉଥ୍ ଇଣ୍ଡିଆନ୍ ଇନସ୍କ୍ରିପସନ୍ସ ଆଧାରିତ ବ୍ରାହ୍ମୀ ଶିଳାଲେଖ, ତାମ୍ରପଟା ଓ ଦୁର୍ଗ ଖନନର ପ୍ରାମାଣିକ ଦଲିଲ।',
      bn: 'ভারতীয় প্রত্নতাত্ত্বিক জরিপ (ASI), এপিগ্রাফিয়া ইন্ডিকা এবং সাউথ ইন্ডিয়ান ইনস্ক্রিপশনস-এর ওপর ভিত্তি করে ব্রাহ্মী শিলালিপি, তাম্রশাসন ও দুর্গ খননের প্রামাণ্য দলিল।'
    },
    subcategories: [
      { id: 'prakrit_brahmi_edicts', label: { en: 'Prakrit & Brahmi Rock Edicts', hi: 'प्राकृत एवं ब्राह्मी शिलालेख', te: 'ప్రాకృత & బ్రాహ్మీ శిలాశాసనాలు', kn: 'ಪ್ರಾಕೃತ ಮತ್ತು ಬ್ರಾಹ್ಮಿ ಶಿಲಾಶಾಸನಗಳು', ta: 'பிராகிருத & பிராமி பாறைக் கல்வெட்டுகள்', mr: 'प्राकृत आणि ब्राह्मी शिलालेख', or: 'ପ୍ରାକୃତ ଓ ବ୍ରାହ୍ମୀ ଶିଳାଲେଖ', bn: 'প্রাকৃত ও ব্রাহ্মী শিলালিপি' } },
      { id: 'copper_plate_charters', label: { en: 'Royal Copper-Plate Charters (Tamrapatra)', hi: 'राजकीय ताम्रपत्र अनुदान', te: 'రాజ తామ్రపత్ర శాసనాలు', kn: 'ರಾಜ ತಾಮ್ರಪತ್ರ ಶಾಸನಗಳು', ta: 'அரச செப்பேடுகள்', mr: 'राजकीय ताम्रपट', or: 'ରାଜକୀୟ ତାମ୍ରପଟା ଶାସନ', bn: 'রাজকীয় তাম্রশাসন' } },
      { id: 'temple_pillar_epigraphs', label: { en: 'Temple Pillar & Wall Inscriptions', hi: 'मंदिर स्तंभ एवं भित्ति अभिलेख', te: 'ఆలయ స్తంభ & ప్రాకార శాసనాలు', kn: 'ದೇವಾಲಯ ಸ್ತಂಭ ಮತ್ತು ಗೋಡೆ ಶಾಸನಗಳು', ta: 'கோயில் தூண் & சுவர் கல்வெட்டுகள்', mr: 'मंदिर स्तंभ आणि भिंतीवरील शिलालेख', or: 'ମନ୍ଦିର ସ୍ତମ୍ଭ ଓ ପ୍ରାଚୀର ଶିଳାଲେଖ', bn: 'মন্দির স্তম্ভ ও প্রাচীর শিলালিপি' } },
      { id: 'fort_urban_archaeology', label: { en: 'Fortifications & Urban Archaeology', hi: 'दुर्ग स्थापत्य एवं नगरीय पुरातत्व', te: 'కోటలు & పట్టణ పురావస్తు ఆధారాలు', kn: 'ಕೋಟೆಗಳು ಮತ್ತು ನಗರ ಪುರಾತತ್ವ', ta: 'கோட்டைகள் & நகரத் தொல்லியல்', mr: 'किल्ले आणि नागरी पुरातत्व', or: 'ଦୁର୍ଗ ଓ ନଗର ପ୍ରତ୍ନତତ୍ତ୍ୱ', bn: 'দুর্গ ও নগর প্রত্নতত্ত্ব' } }
    ],
    keywords: ['Epigraphia Indica', 'South Indian Inscriptions', 'Hathigumpha', 'Veligalani Grant', 'Talagunda Pillar', 'Aihole Prasasti', 'Uttaramerur'],
    hashtags: ['#EpigraphiaIndica', '#CopperPlateGrants', '#IndianArchaeology', '#LithicEdicts'],
    featuredArticleIds: ['art_epigraphic_evolution_odra', 'art_ia_south_indian_epigraphy_corpus']
  },
  {
    code: 'RD',
    id: 'cat_royal_dynasties',
    refPrefix: 'RD',
    route: '/gajapathi-kings',
    thumbnail: ARCHIVE_IMG('royal_dynasties_heritage.jpg'),
    iconAsset: ASSET_IMG('assets/icon-dynasties.webp'),
    title: {
      en: '3. Royal Dynasties',
      hi: '3. राजवंश एवं क्षत्रिय परंपरा (Royal Dynasties)',
      te: '3. రాజవంశాలు & క్షత్రియ పరంపర (Royal Dynasties)',
      kn: '3. ರಾಜವಂಶಗಳು ಮತ್ತು ಕ್ಷತ್ರಿಯ ಪರಂಪರೆ (Royal Dynasties)',
      ta: '3. அரச வம்சங்கள் & க்ஷத்ரிய மரபு (Royal Dynasties)',
      mr: '3. राजवंश आणि क्षत्रिय परंपरा (Royal Dynasties)',
      or: '3. ରାଜବଂଶ ଓ କ୍ଷତ୍ରିୟ ପରମ୍ପରା (Royal Dynasties)',
      bn: '3. রাজবংশ ও ক্ষত্রিয় ঐতিহ্য (Royal Dynasties)'
    },
    subtitle: {
      en: 'Suryavamsha Gajapathis, Eastern & Western Gangas, Cholas, Chalukyas, Pallavas, Kadambas & Vamsa Traditions',
      hi: 'सूर्यवंशी गजपति, पूर्वी एवं पश्चिमी गंग, चोल, चालुक्य, पल्लव, कदंब तथा सूर्यवंश-चंद्रवंश परंपराएं',
      te: 'సూర్యవంశ గజపతులు, తూర్పు & పశ్చిమ గాంగులు, చోళులు, చాళుక్యులు, పల్లవులు, కదంబులు & వంశ సంప్రదాయాలు',
      kn: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿಗಳು, ಪೂರ್ವ ಮತ್ತು ಪಶ್ಚಿಮ ಗಂಗರು, ಚೋಳರು, ಚಾಳುಕ್ಯರು, ಪಲ್ಲವರು, ಕದಂಬರು ಮತ್ತು ವಂಶ ಸಂಪ್ರದಾಯಗಳು',
      ta: 'சூரியவம்ச கஜபதிகள், கீழை & மேலைக் கங்கர்கள், சோழர்கள், சாளுக்கியர்கள், பல்லவர்கள், கதம்பர்கள் & வம்ச மரபுகள்',
      mr: 'सूर्यवंशी गजपती, पूर्व व पश्चिम गंग, चोल, चालुक्य, पल्लव, कदंब आणि सूर्यवंश-चंद्रवंश परंपरा',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି, ପୂର୍ବ ଓ ପଶ୍ଚିମ ଗଙ୍ଗ, ଚୋଳ, ଚାଲୁକ୍ୟ, ପଲ୍ଲବ, କଦମ୍ବ ଓ ବଂଶ ପରମ୍ପରା',
      bn: 'সূর্যবংশী গজপতি, পূর্ব ও পশ্চিম গঙ্গ, চোল, চালুক্য, পল্লব, কদম্ব ও বংশ ঐতিহ্য'
    },
    introduction: {
      en: 'Comprehensive dynastic monographs covering the imperial houses of Eastern, Deccan, and Southern India—rigorously distinguishing Eastern Gangas from Western Gangas, Badami Chalukyas from Vengi Chalukyas, and epigraphically documented royal dynasties from traditional SuryaVamsha and ChandraVamsha Kshatriya classifications.',
      hi: 'पूर्वी, दक्कन और दक्षिण भारत के राजवंशों का व्यापक अध्ययन—जिसमें पूर्वी गंग और पश्चिमी गंग, बादामी चालुक्य और वेंगी चालुक्य के बीच स्पष्ट अंतर किया गया है, तथा शिलालेखीय रूप से प्रमाणित राजवंशों को पारंपरिक सूर्यवंश और चंद्रवंश क्षत्रिय वर्गीकरणों से अलग दिखाया गया है।',
      te: 'తూర్పు, దక్కన్ మరియు దక్షిణ భారత రాజవంశాల సమగ్ర చరిత్ర—తూర్పు గాంగులు మరియు పశ్చిమ గాంగులు, బాదామి చాళుక్యులు మరియు వేంగి చాళుక్యుల మధ్య స్పష్టమైన భేదాన్ని చూపుతూ, శాసన ఆధారిత రాజవంశాలను సాంప్రదాయ సూర్యవంశ మరియు చంద్రవంశ క్షత్రియ వర్గీకరణల నుండి వేరు చేస్తుంది.',
      kn: 'ಪೂರ್ವ, ದಕ್ಕನ್ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ರಾಜವಂಶಗಳ ಸಮಗ್ರ ಅಧ್ಯಯನ—ಪೂರ್ವ ಗಂಗರು ಮತ್ತು ಪಶ್ಚಿಮ ಗಂಗರು, ಬಾದಾಮಿ ಚಾಳುಕ್ಯರು ಮತ್ತು ವೆಂಗಿ ಚಾಳುಕ್ಯರ ನಡುವಿನ ವ್ಯತ್ಯಾಸವನ್ನು ಹಾಗೂ ಶಾಸನಬದ್ಧ ರಾಜವಂಶಗಳನ್ನು ಸಾಂಪ್ರದಾಯಿಕ ಸೂರ್ಯವಂಶ ಮತ್ತು ಚಂದ್ರವಂಶ ವರ್ಗೀಕರಣಗಳಿಂದ ಸ್ಪಷ್ಟವಾಗಿ ಬೇರ್ಪಡಿಸಲಾಗಿದೆ.',
      ta: 'கிழக்கு, தக்காண மற்றும் தென்னிந்திய அரச வம்சங்களின் விரிவான வரலாறு—கீழைக் கங்கர்கள் மற்றும் மேலைக் கங்கர்கள், பாதாமி சாளுக்கியர்கள் மற்றும் வேங்கிச் சாளுக்கியர்கள் ஆகியோரைத் தெளிவாக வேறுபடுத்தி, கல்வெட்டு ஆதாரமுள்ள வம்சங்களை மரபுவழி சூரியவம்ச மற்றும் சந்திரவம்ச வகைப்பாடுகளிலிருந்து பிரித்துக் காட்டுகிறது.',
      mr: 'पूर्व, दख्खन आणि दक्षिण भारतातील राजवंशांचा सखोल अभ्यास—पूर्व गंग आणि पश्चिम गंग, बदामी चालुक्य आणि वेंगी चालुक्य यांच्यातील फरक स्पष्ट करत शिलालेखीय राजवंशांना पारंपारिक सूर्यवंश आणि चंद्रवंश क्षत्रिय वर्गीकरणापासून वेगळे केले आहे.',
      or: 'ପୂର୍ବ, ଦাক্ষିଣାତ୍ୟ ଓ ଦକ୍ଷିଣ ଭାରତର ରାଜବଂଶମାନଙ୍କର ବିସ୍ତୃତ ଇତିହାସ—ପୂର୍ବ ଗଙ୍ଗ ଓ ପଶ୍ଚିମ ଗଙ୍ଗ, ବାଦାମୀ ଚାଲୁକ୍ୟ ଓ ବେଙ୍ଗୀ ଚାଲୁକ୍ୟଙ୍କ ମଧ୍ୟରେ ସ୍ପଷ୍ଟ ପାର୍ଥକ୍ୟ ସହ ଶିଳାଲେଖ ପ୍ରମାଣିତ ରାଜବଂଶ ଓ ପାରମ୍ପରିକ ସୂର୍ଯ୍ୟବଂଶ-ଚନ୍ଦ୍ରବଂଶ ବର୍ଗୀକରଣକୁ ପୃଥକ କରାଯାଇଛି।',
      bn: 'পূর্ব, দাক্ষিণাত্য ও দক্ষিণ ভারতের রাজবংশগুলোর বিস্তৃত ইতিহাস—পূর্ব গঙ্গ ও পশ্চিম গঙ্গ, বাদামী চালুক্য ও বেঙ্গী চালুক্যের মধ্যে সুস্পষ্ট পার্থক্য এবং শিলালিপি-প্রমাণিত রাজবংশ ও ঐতিহ্যবাহী সূর্যবংশ-চন্দ্রবংশ শ্রেণিবিন্যাসকে পৃথকভাবে উপস্থাপন করা হয়েছে।'
    },
    subcategories: [
      { id: 'kalinga_odra_dynasties', label: { en: 'Odra-Kalinga Imperial Dynasties (Gajapathis & Eastern Gangas)', hi: 'ओड्र-कलिंग साम्राज्यवादी राजवंश (गजपति एवं पूर्वी गंग)', te: 'ఓడ్ర-కళింగ సామ్రాజ్య రాజవంశాలు (గజపతులు & తూర్పు గాంగులు)', kn: 'ಓಡ್ರ-ಕಳಿಂಗ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ರಾಜವಂಶಗಳು (ಗಜಪತಿಗಳು ಮತ್ತು ಪೂರ್ವ ಗಂಗರು)', ta: 'ஒட்டர-கலிங்க பேரரசு வம்சங்கள் (கஜபதிகள் & கீழைக் கங்கர்கள்)', mr: 'ओड्र-कलिंग साम्राज्यवादी राजवंश (गजपती आणि पूर्व गंग)', or: 'ଓଡ଼୍ର-କଳିଙ୍ଗ ସାମ୍ରାଜ୍ୟবাদୀ ରାଜବଂଶ (ଗଜପତି ଓ ପୂର୍ବ ଗଙ୍ଗ)', bn: 'ওড্র-কলিঙ্গ সাম্রাজ্যবাদী রাজবংশ (গজপতি ও পূর্ব গঙ্গ)' } },
      { id: 'deccan_karnata_dynasties', label: { en: 'Deccan & Karnata Dynasties (Western Gangas, Kadambas, Badami & Vengi Chalukyas)', hi: 'दक्कन एवं कर्णाट राजवंश (पश्चिमी गंग, कदंब, बादामी एवं वेंगी चालुक्य)', te: 'దక్కన్ & కర్ణాట రాజవంశాలు (పశ్చిమ గాంగులు, కదంబులు, బాదామి & వేంగి చాళుక్యులు)', kn: 'ದಕ್ಕನ್ ಮತ್ತು ಕರ್ಣಾಟ ರಾಜವಂಶಗಳು (ಪಶ್ಚಿಮ ಗಂಗರು, ಕದಂಬರು, ಬಾದಾಮಿ ಮತ್ತು ವೆಂಗಿ ಚಾಳುಕ್ಯರು)', ta: 'தக்காண & கர்நாடக வம்சங்கள் (மேலைக் கங்கர்கள், கதம்பர்கள், பாதாமி & வேங்கிச் சாளுக்கியர்கள்)', mr: 'दख्खन आणि कर्णाट राजवंश (पश्चिम गंग, कदंब, बदामी व वेंगी चालुक्य)', or: 'ଦାକ୍ଷିଣାତ୍ୟ ଓ କର୍ଣ୍ଣାଟ ରାଜବଂଶ (ପଶ୍ଚିମ ଗଙ୍ଗ, କଦମ୍ବ, ବାଦାମୀ ଓ ବେଙ୍ଗୀ ଚାଲୁକ୍ୟ)', bn: 'দাক্ষিণাত্য ও কর্ণাট রাজবংশ (পশ্চিম গঙ্গ, কদম্ব, বাদামী ও বেঙ্গী চালুক্য)' } },
      { id: 'tamilakam_dynasties', label: { en: 'Tamilakam Imperial Houses (Cholas & Pallavas)', hi: 'तमिलकम साम्राज्यवादी राजवंश (चोल एवं पल्लव)', te: 'తమిళకం సామ్రాజ్య రాజవంశాలు (చోళులు & పల్లవులు)', kn: 'ತಮಿಳകം ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ರಾಜವಂಶಗಳು (ಚೋಳರು ಮತ್ತು ಪಲ್ಲವರು)', ta: 'தமிழகப் பேரரசு வம்சங்கள் (சோழர்கள் & பல்லவர்கள்)', mr: 'तमिळकम साम्राज्यवादी राजवंश (चोल आणि पल्लव)', or: 'ତାମିলକମ୍ ସାମ୍ରାଜ୍ୟবাদୀ ରାଜବଂଶ (ଚୋଳ ଓ ପଲ୍ଲବ)', bn: 'তামিলকম সাম্রাজ্যবাদী রাজবংশ (চোল ও পল্লব)' } },
      { id: 'vamsa_classifications', label: { en: 'SuryaVamsha & ChandraVamsha Kshatriya Traditions & Epigraphic Audits', hi: 'सूर्यवंश एवं चंद्रवंश क्षत्रिय परंपराएं तथा अभिलेखीय परीक्षण', te: 'సూర్యవంశ & చంద్రవంశ క్షత్రియ సంప్రదాయాలు & శాసన పరిశీలన', kn: 'ಸೂರ್ಯವಂಶ ಮತ್ತು ಚಂದ್ರವಂಶ ಕ್ಷತ್ರಿಯ ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ಶಾಸನ ಪರಿಶೀಲನೆ', ta: 'சூரியவம்ச & சந்திரவம்ச க்ஷத்ரிய மரபுகள் & கல்வெட்டு ஆய்வு', mr: 'सूर्यवंश आणि चंद्रवंश क्षत्रिय परंपरा व शिलालेख परीक्षण', or: 'ସୂର୍ଯ୍ୟବଂଶ ଓ ଚନ୍ଦ୍ରବଂଶ କ୍ଷତ୍ରିୟ ପରମ୍ପରା ଓ ଶିଳାଲେଖ ପରୀକ୍ଷଣ', bn: 'সূর্যবংশ ও চন্দ্রবংশ ক্ষত্রিয় ঐতিহ্য ও শিলালিপি নিরীক্ষা' } }
    ],
    keywords: ['Eastern Gangas', 'Western Gangas', 'Cholas', 'Chalukyas', 'Pallavas', 'Kadambas', 'Badami Chalukyas', 'Vengi Chalukyas', 'Siddhini Kings', 'SuryaVamshi Kshatriyas', 'ChandraVamshi Kshatriyas'],
    hashtags: ['#RoyalDynasties', '#EasternGangas', '#WesternGangas', '#Cholas', '#Chalukyas', '#Pallavas', '#Kadambas', '#SuryaVamsha', '#ChandraVamsha'],
    featuredArticleIds: [
      'art_gajapathi_kapilendra',
      'art_dyn_eastern_gangas',
      'art_dyn_western_gangas',
      'art_dyn_imperial_cholas',
      'art_dyn_chalukya_synthesis',
      'art_dyn_pallavas_kanchi',
      'art_dyn_kadambas_banavasi',
      'art_dyn_badami_chalukyas',
      'art_dyn_vengi_chalukyas',
      'art_dyn_kakatiya_orugallu',
      'art_dyn_siddhini_kings_verification',
      'art_lin_suryavamshi_kshatriyas',
      'art_lin_chandravamshi_kshatriyas',
      'art_genealogy_methodology'
    ]
  },
  {
    code: 'KM',
    id: 'cat_kingdoms_maps',
    refPrefix: 'KM',
    route: '/maps',
    thumbnail: ARCHIVE_IMG('gajapathi_empire_map_1465.jpg'),
    iconAsset: ASSET_IMG('assets/icon-geography.webp'),
    title: {
      en: '4. Kingdoms & Maps',
      hi: '4. ऐतिहासिक राज्य एवं मानचित्र (Kingdoms & Maps)',
      te: '4. చారిత్రక రాజ్యాలు & పటాలు (Kingdoms & Maps)',
      kn: '4. ಐತಿಹಾಸಿಕ ರಾಜ್ಯಗಳು ಮತ್ತು ನಕ್ಷೆಗಳು (Kingdoms & Maps)',
      ta: '4. வரலாற்று அரசுகள் & வரைபடங்கள் (Kingdoms & Maps)',
      mr: '4. ऐतिहासिक राज्ये आणि नकाशे (Kingdoms & Maps)',
      or: '4. ଐତିହାସିକ ରାଜ୍ୟ ଓ ମାନଚିତ୍ର (Kingdoms & Maps)',
      bn: '4. ঐতিহাসিক রাজ্য ও মানচিত্র (Kingdoms & Maps)'
    },
    subtitle: {
      en: 'Historical Geography of Odra Desha, Kalinga, Trikalinga, Vengi, Gangavadi, Vatapi & Cholamandalam',
      hi: 'ओड्र देश, कलिंग, त्रिकलिंग, वेंगी, गंगवाड़ी, वातापी और चोलमंडलम का ऐतिहासिक भूगोल',
      te: 'ఓడ్ర దేశం, కళింగ, త్రికళింగ, వేంగి, గంగవాడి, వాతాపి & చోళమండలం చారిత్రక భూగోళం',
      kn: 'ಓಡ್ರ ದೇಶ, ಕಳಿಂಗ, ತ್ರಿಕಳಿಂಗ, ವೆಂಗಿ, ಗಂಗವಾಡಿ, ವಾತಾಪಿ ಮತ್ತು ಚೋಳಮಂಡಲದ ಐತಿಹಾಸಿಕ ಭೂಗೋಳ',
      ta: 'ஒட்டர தேசம், கலிங்கம், திரிகலிங்கம், வேங்கி, கங்கவாடி, வாதாபி & சோழமண்டலத்தின் வரலாற்றுப் புவியியல்',
      mr: 'ओड्र देश, कलिंग, त्रिकलिंग, वेंगी, गंगवाडी, वातापी आणि चोलमंडलमचा ऐतिहासिक भूगोल',
      or: 'ଓଡ଼୍ର ଦେଶ, କଳିଙ୍ଗ, ତ୍ରିକଳିଙ୍ଗ, ବେଙ୍ଗୀ, ଗଙ୍ଗବାଡ଼ି, ବାତାପୀ ଓ ଚୋଳମଣ୍ଡଳମର ଐତିହାସିକ ଭୂଗୋଳ',
      bn: 'ওড্র দেশ, কলিঙ্গ, ত্রিকলিঙ্গ, বেঙ্গী, গঙ্গবাড়ি, বাতাপী ও চোলমণ্ডলমের ঐতিহাসিক ভূগোল'
    },
    introduction: {
      en: 'Cartographic reconstructions and geopolitical analyses of sovereign territories, riverine corridors, hill fortresses (Giri Durgas), and aquatic citadels (Jala Durgas) based on verified epigraphic findspots.',
      hi: 'सत्यापित शिलालेख प्राप्ति-स्थलों के आधार पर सार्वभौम क्षेत्रों, नदी घाटियों, गिरि दुर्गों और जल दुर्गों का मानचित्रीय पुनर्निर्माण और भू-राजनीतिक विश्लेषण।',
      te: 'ధృవీకరించబడిన శాసన ఆధార ప్రదేశాల ఆధారంగా సార్వభౌమ ప్రాంతాలు, నదీ లోయలు, గిరి దుర్గాలు మరియు జల దుర్గాల పట పునర్నిర్మాణం మరియు భౌగోళిక విశ్లేషణ.',
      kn: 'ದೃಢೀಕೃತ ಶಾಸನ ದೊರೆತ ಸ್ಥಳಗಳ ಆಧಾರದ ಮೇಲೆ ಸಾರ್ವಭೌಮ ಪ್ರದೇಶಗಳು, ನದಿ ಕಣಿವೆಗಳು, ಗಿರಿ ದುರ್ಗಗಳು ಮತ್ತು ಜಲ ದುರ್ಗಗಳ ನಕ್ಷೆ ಪುನರ್ನಿರ್ಮಾಣ ಮತ್ತು ಭೌಗೋಳಿಕ ವಿಶ್ಲೇಷಣೆ.',
      ta: 'உறுதிப்படுத்தப்பட்ட கல்வெட்டுக் கண்டுபிடிப்பு இடங்களின் அடிப்படையில் நிலப்பரப்புகள், ஆற்றுப் படுகைகள், மலைக்கோட்டைகள் மற்றும் நீர்க்கோட்டைகளின் வரைபட மீள்கட்டமைப்பு.',
      mr: 'सत्यापित शिलालेख ठिकाणांच्या आधारे सार्वभौम प्रदेश, नदी खोरी, गिरीदुर्ग आणि जलदुर्गांचे नकाशात्मक पुनर्निर्माण व भू-राजकीय विश्लेषण.',
      or: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ ପ୍ରାପ୍ତିସ୍ଥଳ ଆଧାରରେ ସାର୍ବଭୌମ ଅଞ୍ଚଳ, ନଦୀ ଉପତ୍ୟକା, ଗିରିଦୁର୍ଗ ଓ ଜଳଦୁର୍ଗର ମାନଚିତ୍ର ପୁନର୍നിର୍ମାଣ ଓ ଭୂ-ରାଜନୈତିକ ବିଶ୍ଳେଷଣ।',
      bn: 'প্রমাণিত শিলালিপি প্রাপ্তিস্থলের ভিত্তিতে সার্বভৌম অঞ্চল, নদী উপত্যকা, গিরিদুর্গ ও জলদুর্গের মানচিত্র পুনর্নির্মাণ ও ভূ-রাজনৈতিক বিশ্লেষণ।'
    },
    subcategories: [
      { id: 'odra_kalinga_trikalinga', label: { en: 'Odra, Utkala, Kalinga & Trikalinga Core', hi: 'ओड्र, उत्कल, कलिंग एवं त्रिकलिंग क्षेत्र', te: 'ఓడ్ర, ఉత్కళ, కళింగ & త్రికళింగ ప్రాంతాలు', kn: 'ಓಡ್ರ, ಉತ್ಕಲ, ಕಳಿಂಗ ಮತ್ತು ತ್ರಿಕಳಿಂಗ ಪ್ರದೇಶಗಳು', ta: 'ஒட்டர, உத்கல, கலிங்க & திரிகலிங்கப் பகுதிகள்', mr: 'ओड्र, उत्कल, कलिंग आणि त्रिकलिंग प्रदेश', or: 'ଓଡ଼୍ର, ଉତ୍କଳ, କଳିଙ୍ଗ ଓ ତ୍ରିକଳିଙ୍ଗ ଅଞ୍ଚଳ', bn: 'ওড্র, উৎকল, কলিঙ্গ ও ত্রিকলিঙ্গ অঞ্চল' } },
      { id: 'deccan_southern_corridors', label: { en: 'Vengi, Gangavadi, Banavasi & Kaveri Corridors', hi: 'वेंगी, गंगवाड़ी, बनवासी एवं कावेरी गलियारे', te: 'వేంగి, గంగవాడి, బనవాసి & కావేరీ మార్గాలు', kn: 'ವೆಂಗಿ, ಗಂಗವಾಡಿ, ಬನವಾಸಿ ಮತ್ತು ಕಾವೇರಿ ಮಾರ್ಗಗಳು', ta: 'வேங்கி, கங்கவாடி, பனவாசி & காவிரிப் பாதைகள்', mr: 'वेंगी, गंगवाडी, बनवासी आणि कावेरी मार्ग', or: 'ବେଙ୍ଗୀ, ଗଙ୍ଗବାଡ଼ି, ବନବାସୀ ଓ କାବେରୀ କରିଡର', bn: 'বেঙ্গী, গঙ্গবাড়ি, বনবাসী ও কাবেরী করিডোর' } },
      { id: 'fortresses_jala_giri_durga', label: { en: 'Strategic Citadels (Barabati, Kondavidu, Kolletikota, Udayagiri)', hi: 'सामरिक दुर्ग (बाराबती, कोंडावीडु, कोल्लेटिकोटा, उदयगिरि)', te: 'వ్యూహాత్మక కోటలు (బారాబతి, కొండవీడు, కొల్లేటికోట, ఉదయగిరి)', kn: 'ಆಯಕಟ್ಟಿನ ಕೋಟೆಗಳು (ಬಾರಾಬತಿ, ಕೊಂಡವೀಡು, ಕೊಲ್ಲೇಟಿಕೋಟ, ಉದಯಗಿರಿ)', ta: 'மூலோபாயக் கோட்டைகள் (பாராபதி, கொண்டவீடு, கொல்லேட்டிக்கோட்டை, உதயகிரி)', mr: 'सामरिक किल्ले (बाराबती, कोंडावीडु, कोल्लेटीकोटा, उदयगिरी)', or: 'ସାମରିକ ଦୁର୍ଗ (ବାରବାଟୀ, କୋଣ୍ଡାଭିଡୁ, କୋଲ୍ଲେଟିକୋଟା, ଉଦୟଗିରି)', bn: 'কৌশলগত দুর্গ (বারবাটী, কোন্ডাভিডু, কোল্লেটিকোটা, উদয়গিরি)' } }
    ],
    keywords: ['Odra Desha', 'Trikalinga', 'Ganges to Kaveri', 'Kolletikota Jala Durga', 'Kondavidu Fort', 'Vengi Mandala'],
    hashtags: ['#HistoricalMaps', '#OdraDesha', '#Trikalinga', '#HistoricalGeography', '#AncientCitadels'],
    featuredArticleIds: ['art_odra_desha_history', 'art_kolletikota_peddintlamma_lake', 'art_km_deccan_corridors_forts']
  },
  {
    code: 'HD',
    id: 'cat_historical_documentary',
    refPrefix: 'HD',
    route: '/documentary',
    thumbnail: ARCHIVE_IMG('oad_hydraulic_stepwell.jpg'),
    iconAsset: ASSET_IMG('assets/icon-articles.webp'),
    title: {
      en: '5. Historical Documentary',
      hi: '5. ऐतिहासिक वृत्तचित्र एवं शोध-ग्रंथ (Historical Documentary)',
      te: '5. చారిత్రక డాక్యుమెంటరీ & పరిశోధన గ్రంథాలు (Historical Documentary)',
      kn: '5. ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ ಮತ್ತು ಸಂಶೋಧನಾ ಗ್ರಂథಗಳು (Historical Documentary)',
      ta: '5. வரலாற்று ஆவணப்படம் & ஆய்வுக் கட்டுரைகள் (Historical Documentary)',
      mr: '5. ऐतिहासिक माहितीपट आणि संशोधन ग्रंथ (Historical Documentary)',
      or: '5. ଐତିହାସିକ ବୃତ୍ତଚିତ୍ର ଓ ଗବେଷଣା ଗ୍ରନ୍ଥ (Historical Documentary)',
      bn: '5. ঐতিহাসিক প্রামাণ্যচিত্র ও গবেষণা গ্রন্থ (Historical Documentary)'
    },
    subtitle: {
      en: 'In-Depth Archival Monographs on Civilizational Memory, Hydraulic Engineering & Pan-Indian Diaspora',
      hi: 'सभ्यतागत स्मृति, जल-अभियांत्रिकी और अखिल भारतीय विस्तार पर गहन शोध-ग्रंथ',
      te: 'నాగరికత జ్ఞాపకాలు, జల ఇంజనీరింగ్ & పాన్-ఇండియన్ విస్తరణపై సమగ్ర పరిశోధనా మోనోగ్రాఫ్‌లు',
      kn: 'ನಾಗರಿಕತೆಯ ಸ್ಮರಣೆ, ಜಲ ಇಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಪ್ಯಾನ್-ಇಂಡಿಯನ್ ವಿಸ್ತರಣೆಯ ಕುರಿತಾದ ಆಳವಾದ ಸಂಶೋಧನಾ ಗ್ರಂಥಗಳು',
      ta: 'நாகரிக நினைவுகள், நீரியல் பொறியியல் & இந்திய அளவிலான பரவல் குறித்த ஆழமான ஆய்வுக் கட்டுரைகள்',
      mr: 'संस्कृतीची स्मृती, जल-अभियांत्रिकी आणि अखिल भारतीय विस्तारावरील सखोल संशोधन ग्रंथ',
      or: 'ସଭ୍ୟତାଗତ ସ୍ମୃତି, ଜଳ-ଯାନ୍ତ୍ରିକ କୌଶଳ ଓ ସର୍ବଭାରତୀୟ ପ୍ରସାର ଉପରେ ଗଭୀର ଗବେଷଣା ଗ୍ରନ୍ଥ',
      bn: 'সভ্যতাগত স্মৃতি, জল-প্রকৌশল ও সর্বভারতীয় বিস্তার বিষয়ে গভীর গবেষণা গ্রন্থ'
    },
    introduction: {
      en: 'Long-form documentary treatises synthesizing epigraphy, colonial gazetteers, Mackenzie Collection Kaifiyats, palm-leaf manuscripts (Madala Panji), and architectural history.',
      hi: 'शिलालेखों, गजेटियरों, मैकेंज़ी संग्रह कैफियतों, ताड़पत्र पांडुलिपियों (मादला पंजी) और स्थापत्य इतिहास का संश्लेषण करने वाले विस्तृत शोध-ग्रंथ।',
      te: 'శాసనాలు, గెజిటీర్లు, మెకంజీ కైఫియత్‌లు, తాళపత్ర గ్రంథాలు (మాదలా పంజీ) మరియు వాస్తు శిల్ప చరిత్రను సమన్వయం చేసే సమగ్ర డాక్యుమెంటరీ గ్రంథాలు.',
      kn: 'ಶಾಸನಗಳು, ಗೆಜೆಟಿಯರ್‌ಗಳು, ಮೆಕೆಂಜಿ ಕೈಫಿಯತ್‌ಗಳು, ತಾಳೆগরি ಹಸ್ತಪ್ರತಿಗಳು (ಮಾದಲಾ ಪಂಜಿ) ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ ಇತಿಹಾಸವನ್ನು ಸಂಯೋಜಿಸುವ ಸುದೀರ್ಘ ಸಾಕ್ಷ್ಯಚಿತ್ರ ಗ್ರಂಥಗಳು.',
      ta: 'கல்வெட்டுகள், அரசிதழ்கள், மெக்கன்சி கைஃபியத்துகள், ஓலைச்சுவடிகள் (மாதளா பஞ்சி) மற்றும் கட்டிடக்கலை வரலாற்றை ஒருங்கிணைக்கும் விரிவான ஆவணக் கட்டுரைகள்.',
      mr: 'शिलालेख, गॅझेटियर्स, मॅकेन्झी कैफियत, ताडपत्र हस्तलिखिते (मादला पंजी) आणि स्थापत्य इतिहासाचे संश्लेषण करणारे दीर्घ संशोधन निबंध.',
      or: 'ଶିଳାଲେଖ, ଗେଜେଟିୟର୍, ମ୍ୟାକେଞ୍ଜି କୈଫିୟତ୍, ତାଳପତ୍ର ପୋଥି (ମାଦଳା ପାଞ୍ଜି) ଓ ସ୍ଥାପତ୍ୟ ଇତିହାସର ସମନ୍ୱିତ ଦୀର୍ଘ ଗବେଷଣା ନିବନ୍ଧ।',
      bn: 'শিলালিপি, গেজেটিয়ার, ম্যাকেঞ্জি কৈফিয়ত, তালপাতার পুঁথি (মাদলা পাঞ্জি) ও স্থাপত্য ইতিহাসের সমন্বিত দীর্ঘ প্রামাণ্য নিবন্ধ।'
    },
    subcategories: [
      { id: 'ethnographic_diaspora', label: { en: 'Pan-Indian Diaspora & Ethnographic History', hi: 'अखिल भारतीय विस्तार एवं नृवंशविज्ञान इतिहास', te: 'పాన్-ఇండియన్ విస్తరణ & ఎథ్నోగ్రాఫిక్ చరిత్ర', kn: 'ಪ್ಯಾನ್-ಇಂಡಿಯನ್ ವಿಸ್ತರಣೆ ಮತ್ತು ಜನಾಂಗೀಯ ಇತಿಹಾಸ', ta: 'இந்திய அளவிலான பரவல் & இனவரைவியல் வரலாறு', mr: 'अखिल भारतीय विस्तार आणि नृवंशशास्त्रीय इतिहास', or: 'ସର୍ବଭାରତୀୟ ପ୍ରସାର ଓ ନୃବଂଶ ଇତିହାସ', bn: 'সর্বভারতীয় বিস্তার ও নৃতাত্ত্বিক ইতিহাস' } },
      { id: 'hydraulic_fort_architecture', label: { en: 'Hydraulic Engineering & Fortress Craftsmanship', hi: 'जल-अभियांत्रिकी एवं दुर्ग निर्माण कला', te: 'జల ఇంజనీరింగ్ & దుర్గ నిర్మాణ నైపుణ్యం', kn: 'ಜಲ ಇಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಕೋಟೆ ನಿರ್ಮಾಣ ಕಲೆ', ta: 'நீரியல் பொறியியல் & கோட்டை கட்டுமானக் கலை', mr: 'जल-अभियांत्रिकी आणि दुर्ग बांधणी कला', or: 'ଜଳ-ଯାନ୍ତ୍ରିକ କୌଶଳ ଓ ଦୁର୍ଗ ନିର୍ମାଣ କଳା', bn: 'জল-প্রকৌশল ও দুর্গ নির্মাণ কৌশল' } }
    ],
    keywords: ['Oad-Rajput', 'Od-Kshatriya', 'Odiyaraju', 'VaddeRajulu', 'Hydraulic Engineering', 'Mackenzie Kaifiyats', 'Madala Panji'],
    hashtags: ['#HistoricalDocumentary', '#ArchivalMonographs', '#OdiyarajuHeritage', '#HydraulicEngineering'],
    featuredArticleIds: ['art_oad_rajputh_od_history', 'art_hd_archival_manuscripts_kaifiyats']
  },
  {
    code: 'HG',
    id: 'cat_historical_gallery',
    refPrefix: 'HG',
    route: '/gallery',
    thumbnail: ARCHIVE_IMG('konark_chariot_wheel.jpg'),
    iconAsset: ASSET_IMG('assets/icon-gallery.webp'),
    title: {
      en: '6. Historical Gallery',
      hi: '6. ऐतिहासिक दीर्घा एवं प्रतीक चित्र (Historical Gallery)',
      te: '6. చారిత్రక గ్యాలరీ & ప్రతీకాత్మక చిత్రాలు (Historical Gallery)',
      kn: '6. ಐತಿಹಾಸಿಕ ಗ್ಯಾಲರಿ ಮತ್ತು ಸಾಂಕೇತಿಕ ಚಿತ್ರಗಳು (Historical Gallery)',
      ta: '6. வரலாற்றுக் காட்சியகம் & குறியீட்டுப் படங்கள் (Historical Gallery)',
      mr: '6. ऐतिहासिक दालन आणि प्रतीकात्मक चित्रे (Historical Gallery)',
      or: '6. ଐତିହାସିକ ଗ୍ୟାଲେରୀ ଓ ପ୍ରତୀକାତ୍ମକ ଚିତ୍ର (Historical Gallery)',
      bn: '6. ঐতিহাসিক গ্যালারি ও প্রতীকী চিত্রাবলী (Historical Gallery)'
    },
    subtitle: {
      en: 'Verified Monumental Photography, Epigraphic Facsimiles, Maps & Clearly Labeled Artistic Reconstructions',
      hi: 'प्रमाणित स्मारक छायाचित्र, शिलालेख प्रतिलिपियां, मानचित्र एवं स्पष्ट रूप से चिह्नित कलात्मक पुनर्निर्माण',
      te: 'ధృవీకరించబడిన స్మారక ఛాయాచిత్రాలు, శాసన ప్రతులు, పటాలు & స్పష్టంగా గుర్తించబడిన కళాత్మక పునర్నిర్మాణాలు',
      kn: 'ದೃಢೀಕೃತ ಸ್ಮಾರಕ ಛಾಯಾಚಿತ್ರಗಳು, ಶಾಸನ ಪ್ರತಿಗಳು, ನಕ್ಷೆಗಳು ಮತ್ತು ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸಲಾದ ಕಲಾತ್ಮಕ ಪುನರ್ನಿರ್ಮಾಣಗಳು',
      ta: 'உறுதிப்படுத்தப்பட்ட நினைவுச்சின்னப் புகைப்படங்கள், கல்வெட்டுப் படிகள், வரைபடங்கள் & கலை மீள்கட்டமைப்புகள்',
      mr: 'प्रमाणित स्मारक छायाचित्रे, शिलालेख प्रती, नकाशे आणि स्पष्टपणे चिन्हांकित कलात्मक पुनर्निर्माण',
      or: 'ପ୍ରମାଣିତ ସ୍ମାରକୀ ଫଟୋଚିତ୍ର, ଶିଳାଲେଖ ପ୍ରତିলিপি, ମାନଚିତ୍ର ଓ ସ୍ପଷ୍ଟ ଚିହ୍ନିତ କଳାତ୍ମକ ପୁନର୍നിର୍ମାଣ',
      bn: 'প্রমাণিত স্মৃতিস্তম্ভ আলোকচিত্র, শিলালিপি প্রতিলিপি, মানচিত্র ও সুস্পষ্টভাবে চিহ্নিত শৈল্পিক পুনর্নির্মাণ'
    },
    introduction: {
      en: 'Curated visual repository of temple architecture, dressed-stone fortifications, copper-plate rings, palm-leaf manuscripts, and symbolic illustrations—each accompanied by provenance metadata, period attribution, image credits, and explicit distinction between archaeological photography and artistic reconstructions.',
      hi: 'मंदिर स्थापत्य, प्रस्तर दुर्गों, ताम्रपत्र वलयों, ताड़पत्र पांडुलिपियों और प्रतीकात्मक चित्रों का क्यूरेटेड दृश्य संग्रह—प्रत्येक चित्र के साथ स्रोत, कालखंड, श्रेय और पुरातात्विक छायाचित्र बनाम कलात्मक पुनर्निर्माण का स्पष्ट उल्लेख है।',
      te: 'ఆలయ వాస్తుశిల్పం, రాతి కోటలు, తామ్రపత్ర ముద్రలు, తాళపత్ర గ్రంథాలు మరియు ప్రతీకాత్మక చిత్రాల దృశ్య భాండాగారం—ప్రతి చిత్రానికి మూలం, కాలం, క్రెడిట్ మరియు పురావస్తు ఫోటోగ్రఫీకి, కళాత్మక పునర్నిర్మాణానికి మధ్య స్పష్టమైన తేడా చూపబడింది.',
      kn: 'ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ, ಕಲ್ಲಿನ ಕೋಟೆಗಳು, ತಾಮ್ರಪತ್ರ ಮುದ್ರೆಗಳು, ತಾಳೆಗರಿ ಹಸ್ತಪ್ರತಿಗಳು ಮತ್ತು ಸಾಂಕೇತಿಕ ಚಿತ್ರಗಳ ದೃಶ್ಯ ಸಂಗ್ರಹ—ಪ್ರತಿಯೊಂದಕ್ಕೂ ಮೂಲ, ಕಾಲಮಾನ ಮತ್ತು ಪುರಾತತ್ವ ಛಾಯಾಚಿತ್ರ ಹಾಗೂ ಕಲಾತ್ಮಕ ಪುನರ್ನಿರ್ಮಾಣದ ನಡುವೆ ಸ್ಪಷ್ಟ ವ್ಯತ್ಯಾಸವಿದೆ.',
      ta: 'கோயில் கட்டிடக்கலை, கற்கோட்டைகள், செப்பேட்டு முத்திரைகள், ஓலைச்சுவடிகள் மற்றும் குறியீட்டுப் படங்களின் காட்சித் தொகுப்பு—ஒவ்வொரு படத்திற்கும் மூலம், காலம் மற்றும் தொல்லியல் புகைப்படத்திற்கும் கலை மீள்கட்டமைப்பிற்கும் இடையிலான தெளிவான வேறுபாடு குறிப்பிடப்பட்டுள்ளது.',
      mr: 'मंदिर स्थापत्य, दगडी किल्ले, ताम्रपट मुद्रा, ताडपत्र हस्तलिखिते आणि प्रतीकात्मक चित्रांचे दृश्य संग्रहालय—प्रत्येक चित्रासह स्रोत, कालखंड आणि पुरातत्त्वीय छायाचित्र विरुद्ध कलात्मक पुनर्निर्माण असा स्पष्ट भेद दिला आहे.',
      or: 'ମନ୍ଦିର ସ୍ଥାପତ୍ୟ, ପଥର ଦୁର୍ଗ, ତାମ୍ରପଟା ମୁଦ୍ରା, ତାଳପତ୍ର ପୋଥି ଓ ପ୍ରତୀକାତ୍ମକ ଚିତ୍ରର ଦୃଶ୍ୟ ସଂଗ୍ରହାଳୟ—ପ୍ରତ୍ୟେକ ଚିତ୍ର ସହିତ ଉତ୍ସ, କାଳଖଣ୍ଡ ଏବଂ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଫଟୋ ବନାମ କଳାତ୍ମକ ପୁନର୍നിର୍ମାଣର ସ୍ପଷ୍ଟ ପାର୍ଥକ୍ୟ ରହିଛି।',
      bn: 'মন্দির স্থাপত্য, পাথরের দুর্গ, তাম্রশাসন মুদ্রা, তালপাতার পুঁথি ও প্রতীকী চিত্রের দৃশ্য সংগ্রহশালা—প্রতিটি ছবির সাথে উৎস, কালপর্ব এবং প্রত্নতাত্ত্বিক আলোকচিত্র বনাম শৈল্পিক পুনর্নির্মাণের সুস্পষ্ট পার্থক্য রয়েছে।'
    },
    subcategories: [
      { id: 'temples_sacred_architecture', label: { en: 'Temples & Sacred Architecture (Kalinga, Dravida & Vesara)', hi: 'मंदिर एवं पवित्र स्थापत्य (कलिंग, द्रविड़ एवं वेसर)', te: 'ఆలయాలు & పవిత్ర వాస్తుశిల్పం (కళింగ, ద్రావిడ & వేసర)', kn: 'ದೇವಾಲಯಗಳು ಮತ್ತು ಪವಿತ್ರ ವಾಸ್ತುಶಿಲ್ಪ (ಕಳಿಂಗ, ದ್ರಾವಿಡ ಮತ್ತು ವೇಸರ)', ta: 'கோயில்கள் & புனிதக் கட்டிடக்கலை (கலிங்கம், திராவிடம் & வேசரம்)', mr: 'मंदिरे आणि पवित्र स्थापत्य (कलिंग, द्रविड व वेसर)', or: 'ମନ୍ଦିର ଓ ପବିତ୍ର ସ୍ଥାପତ୍ୟ (କଳିଙ୍ଗ, ଦ୍ରାବିଡ଼ ଓ ବେସର)', bn: 'মন্দির ও পবিত্র স্থাপত্য (কলিঙ্গ, দ্রাবিড় ও বেসর)' } },
      { id: 'epigraphic_manuscript_plates', label: { en: 'Stone Inscriptions, Copper Plates & Manuscripts', hi: 'शिलालेख, ताम्रपत्र एवं पांडुलिपियां', te: 'శిలాశాసనాలు, తామ్రపత్రాలు & తాళపత్రాలు', kn: 'ಶಿಲಾಶಾಸನಗಳು, ತಾಮ್ರಪತ್ರಗಳು ಮತ್ತು ಹಸ್ತಪ್ರತಿಗಳು', ta: 'கல்வெட்டுகள், செப்பேடுகள் & ஓலைச்சுவடிகள்', mr: 'शिलालेख, ताम्रपट आणि हस्तलिखिते', or: 'ଶିଳାଲେଖ, ତାମ୍ରପଟା ଓ ତାଳପତ୍ର ପୋଥି', bn: 'শিলালিপি, তাম্রশাসন ও তালপাতার পুঁথি' } },
      { id: 'symbolic_reconstructions', label: { en: 'Dynasty Emblems & Artistic Reconstructions', hi: 'राजवंश प्रतीक एवं कलात्मक पुनर्निर्माण', te: 'రాజవంశ చిహ్నాలు & కళాత్మక పునర్నిర్మాణాలు', kn: 'ರಾಜವಂಶ ಲಾಂಛನಗಳು ಮತ್ತು ಕಲಾತ್ಮಕ ಪುನರ್ನಿರ್ಮಾಣಗಳು', ta: 'வம்ச சின்னங்கள் & கலை மீள்கட்டமைப்புகள்', mr: 'राजवंश चिन्हे आणि कलात्मक पुनर्निर्माण', or: 'ରାଜବଂଶ ପ୍ରତୀକ ଓ କଳାତ୍ମକ ପୁନର୍നിର୍ମାଣ', bn: 'রাজবংশ প্রতীক ও শৈল্পিক পুনর্নির্মাণ' } }
    ],
    keywords: ['Konark Sun Wheel', 'Puri Jagannatha', 'Barabati Ramparts', 'Korni Copper Plates', 'Artistic Reconstruction Provenance'],
    hashtags: ['#HistoricalGallery', '#KalingaArchitecture', '#TempleSculpture', '#ArchivalPhotography'],
    featuredArticleIds: ['art_hg_architectural_emblems_provenance']
  },
  {
    code: 'HF',
    id: 'cat_historical_figures',
    refPrefix: 'HF',
    route: '/kings-queens',
    thumbnail: ARCHIVE_IMG('kapilendra_deva_portrait.jpg'),
    iconAsset: ASSET_IMG('assets/icon-personages.webp'),
    title: {
      en: '7. Historical Figures',
      hi: '7. ऐतिहासिक व्यक्तित्व एवं सम्राट (Historical Figures)',
      te: '7. చారిత్రక వ్యక్తులు & చక్రవర్తులు (Historical Figures)',
      kn: '7. ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಸಾಮ್ರಾಟರು (Historical Figures)',
      ta: '7. வரலாற்று ஆளுமைகள் & பேரரசர்கள் (Historical Figures)',
      mr: '7. ऐतिहासिक व्यक्तिमत्त्वे आणि सम्राट (Historical Figures)',
      or: '7. ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ ଓ ସମ୍ରାଟ (Historical Figures)',
      bn: '7. ঐতিহাসিক ব্যক্তিত্ব ও সম্রাটগণ (Historical Figures)'
    },
    subtitle: {
      en: 'Sovereign Emperors, SuryaVamshi & ChandraVamshi Rulers, Spiritual Guardians & Freedom Fighters',
      hi: 'सार्वभौम सम्राट, सूर्यवंशी एवं चंद्रवंशी शासक, आध्यात्मिक संरक्षक एवं स्वतंत्रता सेनानी',
      te: 'సార్వభౌమ చక్రవర్తులు, సూర్యవంశ & చంద్రవంశ పాలకులు, ఆధ్యాత్మిక రక్షకులు & స్వాతంత్ర్య సమరయోధులు',
      kn: 'ಸಾರ್ವಭೌಮ ಸಾಮ್ರಾಟರು, ಸೂರ್ಯವಂಶ ಮತ್ತು ಚಂದ್ರವಂಶದ ಅರಸರು, ಆಧ್ಯಾತ್ಮಿಕ ರಕ್ಷಕರು ಮತ್ತು ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟಗಾರರು',
      ta: 'பேரரசர்கள், சூரியவம்ச & சந்திரவம்ச மன்னர்கள், ஆன்மீகக் காவலர்கள் & விடுதலைப் போராட்ட வீரர்கள்',
      mr: 'सार्वभौम सम्राट, सूर्यवंशी व चंद्रवंशी शासक, आध्यात्मिक संरक्षक आणि स्वातंत्र्यसेनानी',
      or: 'ସାର୍ବଭୌମ ସମ୍ରାଟ, ସୂର୍ଯ୍ୟବଂଶୀ ଓ ଚନ୍ଦ୍ରବଂଶୀ ଶାସକ, ଆଧ୍ୟାତ୍ମିକ ରକ୍ଷକ ଓ ସ୍ୱାଧୀନତା ସଂଗ୍ରାମୀ',
      bn: 'সার্বভৌম সম্রাট, সূর্যবংশী ও চন্দ্রবংশী শাসক, আধ্যাত্মিক অভিভাবক ও স্বাধীনতা সংগ্রামী'
    },
    introduction: {
      en: 'Complete biographical dossiers of epigraphically documented sovereigns (Kharavela, Anantavarman Chodaganga, Narasimha Deva I, Kapilendra Deva, Purushottama Deva, Prataparudra Deva, Kumara Hamvira Deva, Mukunda Deva), comparative studies of SuryaVamshi and ChandraVamshi kings, and sacred cultural guardians.',
      hi: 'शिलालेखीय रूप से प्रमाणित सम्राटों (खारवेल, अनंतवर्मन चोडगंग, नरसिंह देव प्रथम, कपिलेंद्र देव, पुरुषोत्तम देव, प्रतापरुद्र देव, कुमार हम्वीर देव, मुकुंद देव), सूर्यवंशी और चंद्रवंशी राजाओं के तुलनात्मक अध्ययन और सांस्कृतिक संरक्षकों की संपूर्ण जीवनियां।',
      te: 'శాసన ఆధారాలతో ధృవీకరించబడిన చక్రవర్తులు (ఖారవేలుడు, అనంతవర్మ చోడగంగ, నరసింహ దేవ I, కపిలేంద్ర దేవ, పురుషోత్తమ దేవ, ప్రతాపరుద్ర దేవ, కుమార హంవీర దేవ, ముకుంద దేవ), సూర్యవంశ మరియు చంద్రవంశ రాజుల తులనాత్మక అధ్యయనం మరియు ఆధ్యాత్మిక రక్షకుల పూర్తి జీవిత చరిత్రలు.',
      kn: 'ಶಾಸನಾಧಾರಿತ ಸಾಮ್ರಾಟರು (ಖಾರವೇಲ, ಅನಂತವರ್ಮನ್ ಚೋಡಗಂಗ, ನರಸಿಂಹ ದೇವ I, ಕಪಿಲೇಂದ್ರ ದೇವ, ಪುರುಷೋತ್ತಮ ದೇವ, ಪ್ರತಾಪರುದ್ರ ದೇವ, ಕುಮಾರ ಹಂವೀರ ದೇವ, ಮುಕುಂದ ದೇವ), ಸೂರ್ಯವಂಶ ಮತ್ತು ಚಂದ್ರವಂಶದ ರಾಜರ ತುಲನಾತ್ಮಕ ಅಧ್ಯಯನ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ರಕ್ಷಕರ ಸಮಗ್ರ ಜೀವನ ಚರಿತ್ರೆಗಳು.',
      ta: 'கல்வெட்டு ஆதாரமுள்ள பேரரசர்கள் (காரவேலர், அனந்தவர்மன் சோடகங்கன், முதலாம் நரசிம்ம தேவர், கபிலேந்திர தேவர், புருஷோத்தம தேவர், பிரதாபருத்ர தேவர், குமார ஹம்வீர தேவர், முகுந்த தேவர்), சூரியவம்ச மற்றும் சந்திரவம்ச மன்னர்களின் ஒப்பீட்டு ஆய்வு மற்றும் பண்பாட்டுக் காவலர்களின் முழுமையான வரலாறுகள்.',
      mr: 'शिलालेखीय पुराव्यांनी सिद्ध झालेले सम्राट (खारवेल, अनंतवर्मन चोडगंग, नरसिंह देव पहिला, कपिलेंद्र देव, पुरुषोत्तम देव, प्रतापरुद्र देव, कुमार हम्वीर देव, मुकुंद देव), सूर्यवंशी आणि चंद्रवंशी राजांचा तुलनात्मक अभ्यास आणि सांस्कृतिक संरक्षकांचे संपूर्ण चरित्र.',
      or: 'ଶିଳାଲେଖ ପ୍ରମାଣିତ ସମ୍ରାଟ (ଖାରବେଳ, ଅନନ୍ତବର୍ମନ ଚୋଡ଼ଗଙ୍ଗ, ପ୍ରଥମ ନରସିଂହ ଦେବ, କପିଳେନ୍ଦ୍ର ଦେବ, ପୁରୁଷୋତ୍ତମ ଦେବ, ପ୍ରତାପରୁଦ୍ର ଦେବ, କୁମାର ହମ୍ବୀର ଦେବ, ମୁକୁନ୍ଦ ଦେବ), ସୂର୍ଯ୍ୟବଂଶୀ ଓ ଚନ୍ଦ୍ରବଂଶୀ ରାଜାମାନଙ୍କର ତୁଳନାତ୍ମକ ଅଧ୍ୟୟନ ଓ ଆଧ୍ୟାତ୍ମିକ ରକ୍ଷକମାନଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ ଜୀବନୀ।',
      bn: 'শিলালিপি-প্রমাণিত সম্রাটগণ (খারবেল, অনন্তবর্মণ চোড়গঙ্গ, প্রথম নরসিংহ দেব, কপিলেন্দ্র দেব, পুরুষোତ୍ତম দেব, প্রতাপরুদ্র দেব, কুমার হম্বীর দেব, মুকুন্দ দেব), সূর্যবংশী ও চন্দ্রবংশী রাজাদের তুলনামূলক অধ্যয়ন এবং সাংস্কৃতিক অভিভাবকদের সম্পূর্ণ জীবনী।'
    },
    subcategories: [
      { id: 'imperial_sovereigns', label: { en: 'Epigraphically Documented Imperial Sovereigns', hi: 'शिलालेख-प्रमाणित सार्वभौम सम्राट', te: 'శాసన-ధృవీకృత సార్వభౌమ చక్రవర్తులు', kn: 'ಶಾಸನ-ದೃಢೀಕೃತ ಸಾರ್ವಭೌಮ ಸಾಮ್ರಾಟರು', ta: 'கல்வெட்டு-உறுதிப்படுத்தப்பட்ட பேரரசர்கள்', mr: 'शिलालेख-प्रमाणित सार्वभौम सम्राट', or: 'ଶିଳାଲେଖ-ପ୍ରମାଣିତ ସାର୍ବଭୌମ ସମ୍ରାଟ', bn: 'শিলালিপি-প্রমাণিত সার্বভৌম সম্রাটগণ' } },
      { id: 'suryavamshi_chandravamshi_kings', label: { en: 'SuryaVamshi & ChandraVamshi Kings Comparative Dossiers', hi: 'सूर्यवंशी एवं चंद्रवंशी राजाओं का तुलनात्मक अध्ययन', te: 'సూర్యవంశ & చంద్రవంశ రాజుల తులనాత్మక చరిత్ర', kn: 'ಸೂರ್ಯವಂಶ ಮತ್ತು ಚಂದ್ರವಂಶ ರಾಜರ ತುಲನಾತ್ಮಕ ಅಧ್ಯಯನ', ta: 'சூரியவம்ச & சந்திரவம்ச மன்னர்களின் ஒப்பீட்டு வரலாறு', mr: 'सूर्यवंशी आणि चंद्रवंशी राजांचा तुलनात्मक अभ्यास', or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଓ ଚନ୍ଦ୍ରବଂଶୀ ରାଜାଙ୍କ ତୁଳନାତ୍ମକ ଇତିହାସ', bn: 'সূর্যবংশী ও চন্দ্রবংশী রাজাদের তুলনামূলক ইতিহাস' } },
      { id: 'sacred_progenitors_guardians', label: { en: 'Sacred Progenitors & Cultural Guardians', hi: 'पौराणिक आदि-पुरुष एवं सांस्कृतिक संरक्षक', te: 'ఆది పురుషులు & ఆధ్యాత్మిక రక్షకులు', kn: 'ಆದಿಪುರುಷರು ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ರಕ್ಷಕರು', ta: 'முன்னோடிகள் & பண்பாட்டுக் காவலர்கள்', mr: 'पौराणिक पूर्वज आणि सांस्कृतिक संरक्षक', or: 'ଆଦିପୁରୁଷ ଓ ସାଂସ୍କୃତିକ ରକ୍ଷକ', bn: 'আদিপুরুষ ও সাংস্কৃতিক অভিভাবক' } }
    ],
    keywords: ['Kapilendra Deva', 'Emperor Kharavela', 'Anantavarman Chodaganga', 'Narasimha Deva I', 'SuryaVamshi Kings', 'ChandraVamshi Kings', 'Rajaraja Chola I', 'Pulakeshin II'],
    hashtags: ['#HistoricalFigures', '#SuryaVamshiKings', '#ChandraVamshiKings', '#GajapathiEmperors', '#KalingaSovereigns'],
    featuredArticleIds: ['art_surya_vamsa_sagara_rama', 'art_lin_suryavamshi_kings', 'art_lin_chandravamshi_kings']
  }
];

/**
 * 2. PERMANENT UNIQUE ARTICLE REFERENCE NUMBER SYSTEM
 *    HT-xxxx: Historical Timeline
 *    IA-xxxx: Inscriptions & Archaeology
 *    RD-xxxx: Royal Dynasties
 *    KM-xxxx: Kingdoms & Maps
 *    HD-xxxx: Historical Documentary
 *    HG-xxxx: Historical Gallery
 *    HF-xxxx: Historical Figures
 */
export const PERMANENT_ARTICLE_REFERENCE_NUMBERS: Record<string, string> = {
  // Existing 6 Canonical Articles + New Category Monographs
  art_odra_desha_history: 'KM-0001',
  art_kolletikota_peddintlamma_lake: 'KM-0002',
  art_km_deccan_corridors_forts: 'KM-0003',
  art_gajapathi_kapilendra: 'RD-0001',
  art_dyn_eastern_gangas: 'RD-0002',
  art_dyn_western_gangas: 'RD-0003',
  art_dyn_imperial_cholas: 'RD-0004',
  art_dyn_chalukya_synthesis: 'RD-0005',
  art_dyn_pallavas_kanchi: 'RD-0006',
  art_dyn_kadambas_banavasi: 'RD-0007',
  art_dyn_badami_chalukyas: 'RD-0008',
  art_dyn_vengi_chalukyas: 'RD-0009',
  art_dyn_siddhini_kings_verification: 'RD-0010',
  art_lin_suryavamshi_kshatriyas: 'RD-0011',
  art_lin_chandravamshi_kshatriyas: 'RD-0012',
  art_genealogy_methodology: 'RD-0013',
  art_oad_rajputh_od_history: 'HD-0001',
  art_hd_archival_manuscripts_kaifiyats: 'HD-0002',
  art_epigraphic_evolution_odra: 'IA-0001',
  art_ia_south_indian_epigraphy_corpus: 'IA-0002',
  art_ht_chronological_methodology: 'HT-0001',
  art_hg_architectural_emblems_provenance: 'HG-0001',
  art_surya_vamsa_sagara_rama: 'HF-0001',
  art_lin_suryavamshi_kings: 'HF-0015',
  art_lin_chandravamshi_kings: 'HF-0016',

  // 14 Documented Historical Figures in KingsQueensPage
  fig_samrat_sagara: 'HF-0002',
  fig_maharshi_bhagiratha: 'HF-0003',
  fig_sri_rama: 'HF-0004',
  fig_king_kharavela: 'HF-0005',
  fig_goddess_jasma: 'HF-0006',
  fig_shivayogi_siddharama: 'HF-0007',
  fig_kolletikota_peddintlamma: 'HF-0008',
  fig_anantavarman_chodaganga: 'HF-0009',
  fig_chodaganga_deva: 'HF-0009',
  fig_langula_narasimha_deva: 'HF-0010',
  fig_langula_narasimha: 'HF-0010',
  fig_kapilendra_deva: 'HF-0011',
  fig_hamvira_deva: 'HF-0012',
  fig_purushottama_deva: 'HF-0013',
  fig_prataparudra_deva: 'HF-0014',
  fig_mukunda_deva: 'HF-0017',

  // Canonical Inscriptions & Archaeological Records
  insc_hathigumpha_kharavela: 'IA-0003',
  insc_hathigumpha: 'IA-0003',
  insc_korni_copper_plates: 'IA-0004',
  insc_kendupatna_plates: 'IA-0005',
  insc_lingaraja_1452: 'IA-0006',
  insc_veligalani_1458: 'IA-0007',
  insc_simhachalam_1459: 'IA-0008',
  insc_srirangam_1464: 'IA-0009',
  insc_potavaram_1489: 'IA-0010',
  insc_simhachalam_prataparudra: 'IA-0011',
  insc_kondapalli_1519: 'IA-0012',

  // Canonical Timeline Stages & Events (HT-0002 to HT-0020)
  stage_01_mythological: 'HT-0002',
  stage_02_ancient_civilizations: 'HT-0003',
  stage_03_early_historical: 'HT-0004',
  stage_04_ancient_kingdoms: 'HT-0005',
  stage_05_medieval_kingdoms: 'HT-0006',
  stage_06_imperial_dynasties: 'HT-0007',
  stage_07_late_medieval: 'HT-0008',
  stage_08_modern_historical: 'HT-0009',
  ev_kharavela_1st_bce: 'HT-0010',
  ev_jasma_devi_1120: 'HT-0011',
  ev_siddharameshwara_1150: 'HT-0012',
  ev_1434: 'HT-0013',
  ev_1448: 'HT-0014',
  ev_kolletikota_gajapathi_garrison: 'HT-0015',
  ev_1458: 'HT-0016',
  ev_1464: 'HT-0017',
  ev_1489: 'HT-0018',
  ev_1515: 'HT-0019',
  ev_1568: 'HT-0020',

  // Temples & Monuments (TM-0001 to TM-0004)
  mon_meghanada_pacheri: 'TM-0001',
  mon_konark_sun: 'TM-0002',
  mon_draksharama_mandapa: 'TM-0003',
  mon_kolletikota_peddintlamma: 'TM-0004',

  // Historical Documents (DOC-0001 to DOC-0002)
  doc_madala_panji: 'DOC-0001',
  doc_sarasvati_vilasa: 'DOC-0002',

  // Kingdoms & Maps Locations (KM-0004 to KM-0010)
  loc_barabati_fort: 'KM-0004',
  loc_puri_jagannatha: 'KM-0005',
  loc_kondavidu_fort: 'KM-0006',
  loc_simhachalam: 'KM-0007',
  loc_udayagiri_fort: 'KM-0008',
  loc_kolleti_sarasu_fort: 'KM-0009',
  map_1465_zenith: 'KM-0010',

  // Historical Gallery Plates (HG-0002 to HG-0008)
  gal_01: 'HG-0002',
  gal_02: 'HG-0003',
  gal_03: 'HG-0004',
  gal_04: 'HG-0005',
  gal_05: 'HG-0006',
  gal_06: 'HG-0007',
  gal_kolletikota: 'HG-0008',

  // Documentary Monograph Chapters (HD-0003 to HD-0010)
  mono_part_1_primordial: 'HD-0003',
  mono_part_2_kharavela: 'HD-0004',
  mono_part_3_synonyms: 'HD-0005',
  mono_part_4_jasma_siddharama: 'HD-0006',
  mono_part_5_gajapathi_diaspora: 'HD-0007',
  mono_part_6_geographical_map: 'HD-0008',
  mono_part_7_kolletikota: 'HD-0009',
  mono_part_8_epigraphic_evolution: 'HD-0010',

  // Royal Dynasties & Governance Dossiers (RD-0014 to RD-0021)
  dyn_suryavamsha_gajapathi: 'RD-0014',
  dyn_eastern_ganga: 'RD-0015',
  dyn_bhoi_mukunda: 'RD-0016',
  dyn_traditional_suryavamsha_lineages: 'RD-0017',
  'admin-mahapatras': 'RD-0018',
  'admin-nayakas': 'RD-0019',
  'military-gajasena': 'RD-0020',
  'culture-renaissance': 'RD-0021',

  // Royal Genealogy & Claims (RG-0001 to RG-0012)
  gen_samrat_sagara: 'RG-0001',
  gen_maharshi_bhagiratha: 'RG-0002',
  gen_sri_rama: 'RG-0003',
  gen_kapilendra: 'RG-0004',
  gen_hamvira: 'RG-0005',
  gen_purushottama: 'RG-0006',
  gen_prataparudra: 'RG-0007',
  gen_virabhadra: 'RG-0008',
  gen_dakshina_branch: 'RG-0009',
  clm_01: 'RG-0010',
  clm_02: 'RG-0011',
  clm_03: 'RG-0012',

  // Odra Desha Regions (OD-0001 to OD-0005)
  'region-odra': 'OD-0001',
  'region-utkala': 'OD-0002',
  'region-kalinga': 'OD-0003',
  'region-trikalinga': 'OD-0004',
  'odra-epigraphic-evolution': 'OD-0005',

  // Kalinga War (KW-0001 to KW-0012)
  kw_section_background: 'KW-0001',
  kw_section_battle: 'KW-0002',
  kw_section_tragedy: 'KW-0003',
  kw_section_remorse: 'KW-0004',
  kw_section_legacy: 'KW-0005',
  scene_1_ancient_kalinga: 'KW-0006',
  scene_2_mauryan_campaign: 'KW-0007',
  scene_3_the_battle: 'KW-0008',
  scene_4_human_cost: 'KW-0009',
  scene_5_ashoka_remorse: 'KW-0010',
  scene_6_ashokan_rock_edicts: 'KW-0011',
  scene_7_message_of_peace: 'KW-0012',

  // Community Prominent Persons (CPP-0001 to CPP-0032)
  kapilendra_deva_gajapathi: 'CPP-0001',
  kumara_hamvira_deva: 'CPP-0002',
  baxi_jagabandhu_paika_general: 'CPP-0003',
  jayee_rajguru_preceptor: 'CPP-0004',
  anantavarman_chodaganga_trikalinga: 'CPP-0005',
  purushottama_deva_gajapathi: 'CPP-0006',
  prataparudra_deva_gajapathi: 'CPP-0007',
  maharshi_raja_bhagiratha: 'CPP-0008',
  samrat_sagara: 'CPP-0009',
  mata_jasma_devi: 'CPP-0010',
  shivayogi_siddharameshwara: 'CPP-0011',
  emperor_kharavela: 'CPP-0012',
  kolletikota_peddintlamma: 'CPP-0013',
  kolani_rudra_deva: 'CPP-0014',
  raja_mukunda_deva: 'CPP-0015',
  langula_narasimha_deva: 'CPP-0016',
  rani_balanagamma: 'CPP-0017',
  raja_bhoja_paramara: 'CPP-0018',
  balavaddiraju: 'CPP-0019',
  dr_g_sathyanarayana_raju: 'CPP-0020',
  virabhadra_deva_gajapathi: 'CPP-0021',
  mahakavi_sarala_dasa: 'CPP-0022',
  sri_rama_suryavamsha: 'CPP-0023',
  raja_od_odra_nareshudu: 'CPP-0024',
  research_placeholder_traditional_artists: 'CPP-0025',
  research_placeholder_cinema_actors: 'CPP-0026',
  research_placeholder_film_producers_directors: 'CPP-0027',
  research_placeholder_film_directors_only: 'CPP-0028',
  research_placeholder_music_singers_dancers: 'CPP-0029',
  research_placeholder_singers_dancers_scientists: 'CPP-0030',
  research_placeholder_singers_musicians_only: 'CPP-0031',
  research_placeholder_dancers_classical_folk_only: 'CPP-0032',

  // Community Heritage (CH-0001 to CH-0047; CH-0048..CH-0123 for 76 Master References)
  comm_dir_01_od: 'CH-0001',
  comm_dir_02_od_rajputh: 'CH-0002',
  comm_dir_03_odra_kshatriya: 'CH-0003',
  comm_dir_04_kalingarajulu: 'CH-0004',
  comm_dir_05_od_khandayath: 'CH-0005',
  comm_dir_06_oda_chassa: 'CH-0006',
  comm_dir_07_od_paika: 'CH-0007',
  comm_dir_08_odan: 'CH-0008',
  comm_dir_09_vaddi: 'CH-0009',
  comm_dir_10_vaddera: 'CH-0010',
  comm_dir_11_vaddeelu: 'CH-0011',
  comm_dir_12_vaddirajulu: 'CH-0012',
  comm_dir_13_vadderarajulu: 'CH-0013',
  comm_dir_14_gajapathulu: 'CH-0014',
  comm_dir_15_voddar: 'CH-0015',
  comm_dir_16_oddaru: 'CH-0016',
  prof_cat_1_warriors: 'CH-0017',
  prof_cat_2_agriculture: 'CH-0018',
  prof_cat_3_construction_engineering: 'CH-0019',
  prof_cat_4_shilpi: 'CH-0020',
  prof_cat_5_vasthushilpi: 'CH-0021',
  prof_cat_6_lokashilpi: 'CH-0022',
  prof_cat_7_vishwashilpi: 'CH-0023',
  prof_cat_8_royal_heritage: 'CH-0024',
  prof_cat_9_other_professions: 'CH-0025',
  syn_suryavamshi: 'CH-0026',
  syn_sagaravamshi: 'CH-0027',
  syn_raghuvamshi: 'CH-0028',
  syn_od_oad_odra: 'CH-0029',
  syn_odisha_kshatriya: 'CH-0030',
  syn_odiyaraju_karnataka: 'CH-0031',
  syn_ottar: 'CH-0032',
  syn_od_kshatriya: 'CH-0033',
  syn_odde_vadde: 'CH-0034',
  syn_waddar_vaddar: 'CH-0035',
  syn_oddar: 'CH-0036',
  syn_vadde_gajapathirajulu: 'CH-0037',
  syn_odda_nayakkar_tn: 'CH-0038',
  syn_oad_rajputh: 'CH-0039',
  syn_odderajulu: 'CH-0040',
  geo_rajasthan_sindh_punjab: 'CH-0041',
  geo_gujarat: 'CH-0042',
  geo_maharashtra: 'CH-0043',
  geo_karnataka: 'CH-0044',
  geo_andhra_telangana: 'CH-0045',
  geo_tamil_nadu: 'CH-0046',
  geo_odisha: 'CH-0047',
  // Explicit mappings for 76-Reference entries 53..66 whose internal IDs carry legacy numbers 55..70
  ref70_55_pawar: 'CH-0100',
  ref70_58_oddarasa: 'CH-0101',
  ref70_59_oddedora: 'CH-0102',
  ref70_60_vaddedoralu: 'CH-0103',
  ref70_61_odiyarajulu: 'CH-0104',
  ref70_62_kshatriya_kings: 'CH-0105',
  ref70_63_oddan_arasa: 'CH-0106',
  ref70_64_ottan_arasa: 'CH-0107',
  ref70_65_kallu_oddar: 'CH-0108',
  ref70_66_mannu_oddar: 'CH-0109',
  ref70_67_bandi_oddar: 'CH-0110',
  ref70_68_girini_oddar: 'CH-0111',
  ref70_69_uppu_oddar: 'CH-0112',
  ref70_70_shilpi_oddar: 'CH-0113',

  // Culture & Traditions (CT-0001 to CT-0003)
  'culture-solar-veneration': 'CT-0001',
  'culture-martial-akhadas': 'CT-0002',
  'culture-jagannatha-servitorship': 'CT-0003',

  // Literature & Publications (LP-0001 to LP-0003)
  'lit-sarasvati-vilasa': 'LP-0001',
  'lit-sarala-mahabharata': 'LP-0002',
  'lit-abhinava-gitagovinda': 'LP-0003',

  // Historical References (HR-0001 to HR-0003)
  'ref-epigraphic': 'HR-0001',
  'ref-monographs': 'HR-0002',
  'ref-chronicles': 'HR-0003',

  // Community Activities (CA-0001 to CA-0004)
  'act-manuscript-preservation': 'CA-0001',
  'act-research-fellowships': 'CA-0002',
  'act-heritage-tours': 'CA-0003',
  'act-fraternal-forums': 'CA-0004',

  // Events & Notices (EN-0001 to EN-0003)
  evt_001: 'EN-0001',
  evt_002: 'EN-0002',
  evt_003: 'EN-0003',

  // Website Pages & Category Hubs (WP-0001 to WP-0038)
  page_home: 'WP-0001',
  page_about: 'WP-0002',
  page_documentary: 'WP-0003',
  page_odra_desha: 'WP-0004',
  page_kalinga_war: 'WP-0005',
  page_gajapathi_kings: 'WP-0006',
  page_kings_queens: 'WP-0007',
  page_community_prominent_persons: 'WP-0008',
  page_genealogy: 'WP-0009',
  page_maps: 'WP-0010',
  page_timeline: 'WP-0011',
  page_inscriptions: 'WP-0012',
  page_temples_monuments: 'WP-0013',
  page_documents: 'WP-0014',
  page_research: 'WP-0015',
  page_gallery: 'WP-0016',
  page_culture_traditions: 'WP-0017',
  page_literature: 'WP-0018',
  page_references: 'WP-0019',
  page_community_heritage: 'WP-0020',
  page_community_surnames_south: 'WP-0021',
  page_community_surnames_north: 'WP-0022',
  page_community_activities: 'WP-0023',
  page_events: 'WP-0024',
  page_directory: 'WP-0025',
  page_register: 'WP-0026',
  page_login: 'WP-0027',
  page_password_recovery: 'WP-0028',
  page_dashboard: 'WP-0029',
  page_submit_research: 'WP-0030',
  page_admin: 'WP-0031',
  cat_historical_timeline: 'WP-0032',
  cat_inscriptions_archaeology: 'WP-0033',
  cat_royal_dynasties: 'WP-0034',
  cat_kingdoms_maps: 'WP-0035',
  cat_historical_documentary: 'WP-0036',
  cat_historical_gallery: 'WP-0037',
  cat_historical_figures: 'WP-0038',
  page_website_directory: 'WP-0039',

  // Kakatiya Dynasty (KD-0001 to KD-0033)
  ...KAKATIYA_REFERENCE_ID_MAP
};

export function getPermanentReferenceNumber(itemId: string, categoryFallback?: string): string {
  if (!itemId) return 'HD-0000';
  const trimmed = itemId.trim();
  if (PERMANENT_ARTICLE_REFERENCE_NUMBERS[trimmed]) {
    return PERMANENT_ARTICLE_REFERENCE_NUMBERS[trimmed];
  }
  if (/^[A-Z]+-\d{4}$/.test(trimmed)) {
    return trimmed;
  }
  // Deterministic sequential resolution for 76 Community References (ref70_01..ref76_76 -> CH-0048..CH-0123)
  const ref76Match = trimmed.match(/^ref7[06]_(\d{2})_/i);
  if (ref76Match) {
    const idx = parseInt(ref76Match[1], 10);
    if (idx >= 1 && idx <= 76) {
      return `CH-${String(47 + idx).padStart(4, '0')}`;
    }
  }
  // Deterministic sequential resolution for 260 South-Indian Surnames (surname_1_..surname_260_ -> CSS-0001..CSS-0260)
  const southSurnameMatch = trimmed.match(/^surname_(\d+)_/i);
  if (southSurnameMatch) {
    const idx = parseInt(southSurnameMatch[1], 10);
    return `CSS-${String(idx).padStart(4, '0')}`;
  }
  // Deterministic sequential resolution for 90 North-Indian Surnames (north_surname_1_..north_surname_90_ -> CSN-0001..CSN-0090)
  const northSurnameMatch = trimmed.match(/^north_surname_(\d+)_/i);
  if (northSurnameMatch) {
    const idx = parseInt(northSurnameMatch[1], 10);
    return `CSN-${String(idx).padStart(4, '0')}`;
  }
  const clean = trimmed.toLowerCase();
  let prefix = 'HD';
  if (clean.startsWith('ev_') || clean.startsWith('stage_') || categoryFallback === 'timeline') {
    prefix = 'HT';
  } else if (clean.startsWith('insc_') || categoryFallback === 'inscriptions' || categoryFallback === 'archaeology') {
    prefix = 'IA';
  } else if (clean.startsWith('mon_') || categoryFallback === 'monuments') {
    prefix = 'TM';
  } else if (clean.startsWith('doc_') || categoryFallback === 'documents') {
    prefix = 'DOC';
  } else if (clean.startsWith('gen_') || clean.startsWith('clm_') || categoryFallback === 'genealogy') {
    prefix = 'RG';
  } else if (clean.startsWith('art_dyn_') || clean.startsWith('art_lin_') || clean.startsWith('dyn_') || categoryFallback === 'dynasties') {
    prefix = 'RD';
  } else if (clean.startsWith('loc_') || clean.startsWith('map_') || clean.startsWith('art_km_') || categoryFallback === 'maps') {
    prefix = 'KM';
  } else if (clean.startsWith('gal_') || clean.startsWith('art_hg_') || categoryFallback === 'gallery') {
    prefix = 'HG';
  } else if (clean.startsWith('fig_') || categoryFallback === 'figures') {
    prefix = 'HF';
  }
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) % 8900;
  }
  const num = String(100 + Math.abs(hash)).padStart(4, '0');
  return `${prefix}-${num}`;
}

/**
 * 3. EIGHT-STAGE MYTHOLOGY TO HISTORICAL TIMELINE CHRONOLOGICAL FRAMEWORK
 */
export const MYTHOLOGY_TO_HISTORY_STAGES: ChronologicalEpochStage[] = [
  {
    stageOrder: 1,
    id: 'stage_01_mythological',
    refNumber: 'HT-0002',
    stageCode: 'MYTHOLOGICAL_TRADITIONS',
    title: {
      en: 'Stage 1: Mythological & Sacred Traditions (Puranic & Epic Antiquity — Non-Calendrical Cosmology vs. Medieval Epigraphic Invocation)',
      hi: 'चरण 1: पौराणिक एवं पवित्र परंपराएं (पुराण एवं महाकाव्य काल — अपंचांगीय परंपरा बनाम मध्यकालीन प्रशस्ति आह्वान)',
      te: 'దశ 1: పురాణ & పవిత్ర సంప్రదాయాలు (ఇతిహాస-పురాణ యుగం — పవిత్ర కాలం vs. మధ్యయుగ శాసన ప్రశస్తులు)',
      kn: 'ಹಂತ 1: ಪೌರಾಣಿಕ ಮತ್ತು ಪವಿತ್ರ ಸಂಪ್ರದಾಯಗಳು (ಪುರಾಣ ಮತ್ತು ಮಹಾಕಾವ್ಯ ಕಾಲ — ಪೌರಾಣಿಕ ಕಾಲ vs. ಮಧ್ಯಕಾಲೀನ ಶಾಸನ ಪ್ರಶಸ್ತಿಗಳು)',
      ta: 'நிலை 1: புராண & புனித மரபுகள் (இதிகாச-புராண காலம் — புனித மரபு vs. இடைக்காலச் செப்பேட்டுப் பிரசஸ்திகள்)',
      mr: 'टप्पा 1: पौराणिक आणि पवित्र परंपरा (पुराण व महाकाव्य काळ — पौराणिक कालगणना विरुद्ध मध्ययुगीन ताम्रपट प्रशस्ती)',
      or: 'ପର୍ଯ୍ୟାୟ ୧: ପୌରାଣିକ ଓ ପବିତ୍ର ପରମ୍ପରା (ପୁରାଣ ଓ ମହାକାବ୍ୟ କାଳ — ପବିତ୍ର କାଳ ବନାମ ମଧ୍ୟଯୁଗୀୟ ଶିଳାଲେଖ ପ୍ରଶସ୍ତି)',
      bn: 'পর্যায় ১: পৌরাণিক ও পবিত্র ঐতিহ্য (পুরাণ ও মহাকাব্যিক কাল — পৌরাণিক কাল বনাম মধ্যযুগীয় তাম্রশাসন প্রশস্তি)'
    },
    approxDateLabel: {
      en: 'Traditional Claim: Sacred Treta/Dvapara Yuga Antiquity | Epigraphic Invocation: 4th – 16th Century CE Sanskrit Prasastis',
      hi: 'पारंपरिक दावा: पवित्र त्रेता/द्वापर युग | अभिलेखीय आह्वान: चौथी – 16वीं शताब्दी ई. की संस्कृत प्रशस्तियां',
      te: 'సాంప్రదాయ వాదన: త్రేతా/ద్వాపర యుగ పురాణ కాలం | శాసన ప్రస్తావన: క్రీ.శ. 4వ – 16వ శతాబ్దపు సంస్కృత ప్రశస్తులు',
      kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಉಲ್ಲೇಖ: ತ್ರೇತಾ/ದ್ವಾಪರ ಯುಗದ ಪೌರಾಣಿಕ ಕಾಲ | ಶಾಸನ ಉಲ್ಲೇಖ: ಕ್ರಿ.ಶ. 4ನೇ – 16ನೇ ಶತಮಾನದ ಸಂಸ್ಕೃತ ಪ್ರಶಸ್ತಿಗಳು',
      ta: 'மரபுவழி உரிமைகோரல்: திரேதா/துவாபர யுக புராண காலம் | கல்வெட்டுப் பதிவு: பொ.ஊ. 4 – 16-ஆம் நூற்றாண்டு சமஸ்கிருதப் பிரசஸ்திகள்',
      mr: 'पारंपरिक दावा: त्रेता/द्वापर युग पौराणिक काळ | शिलालेख संदर्भ: इ.स. ४ थे – १६ वे शतक संस्कृत प्रशस्ती',
      or: 'ପାରମ୍ପରିକ ଦାବି: ତ୍ରେତା/ଦ୍ୱାପର ଯୁଗ ପୌରାଣିକ କାଳ | ଶିଳାଲେଖ ଉଲ୍ଲେଖ: ୪ର୍ଥ – ୧୬ଶ ଶତାବ୍ଦୀ ସଂସ୍କୃତ ପ୍ରଶସ୍ତି',
      bn: 'ঐতিহ্যগত দাবি: ত্রেতা/দ্বাপর যুগ পৌরাণিক কাল | শিলালিপি উল্লেখ: ৪র্থ – ১৬শ শতাব্দীর সংস্কৃত প্রশস্তি'
    },
    chronologicalUncertaintyNote: {
      en: 'Epistemic Distinction: (1) Traditional Chronological Claims preserve Ikshvaku, Samrat Sagara, Maharshi Bhagiratha, and Sri Rama in non-calendrical epic time (Valmiki Ramayana, Vishnu Purana); (2) Established Inscriptional Dates exist only for the historical charters (4th–16th century CE) that invoke these lineages in their royal preambles.',
      hi: 'इतिहास-लेखन भेद: (1) पारंपरिक कालक्रम में इक्ष्वाकु, सम्राट सगर, महर्षि भगीरथ और श्री राम को अपंचांगीय महाकाव्य काल (वाल्मीकि रामायण, विष्णु पुराण) में रखा गया है; (2) स्थापित शिलालेखीय तिथियां केवल उन ऐतिहासिक ताम्रपत्रों (चौथी–16वीं शताब्दी ई.) के लिए हैं जो अपनी प्रशस्तियों में इन वंशों का आह्वान करते हैं।',
      te: 'చారిత్రక విభజన: (1) సాంప్రదాయ కాలక్రమంలో ఇక్ష్వాకు, సగరుడు, భగీరథుడు మరియు శ్రీరాముడు పురాణ కాలంలో (వాల్మీకి రామాయణం, విష్ణు పురాణం) పేర్కొనబడ్డారు; (2) ధృవీకరించబడిన శాసన తేదీలు ఈ వంశాలను తమ ప్రశస్తులలో స్మరించుకున్న చారిత్రక రాజుల శాసనాలకు (క్రీ.శ. 4వ–16వ శతాబ్దం) మాత్రమే వర్తిస్తాయి.',
      kn: 'ಐತಿಹಾಸಿಕ ವಿಂಗಡಣೆ: (1) ಸಾಂಪ್ರದಾಯಿಕ ಕಾಲಗಣನೆಯು ಇಕ್ಷ್ವಾಕು, ಸಾಮ್ರಾಟ್ ಸಗರ, ಭಗೀರಥ ಮತ್ತು ಶ್ರೀರಾಮರನ್ನು ಪುರಾಣ ಕಾಲದಲ್ಲಿ ದಾಖಲಿಸುತ್ತದೆ; (2) ದೃಢೀಕೃತ ಶಾಸನ ದಿನಾಂಕಗಳು ಈ ವಂಶಗಳನ್ನು ತಮ್ಮ ಪ್ರಶಸ್ತಿಗಳಲ್ಲಿ ಸ್ಮರಿಸುವ ಚಾರಿತ್ರಿಕ ರಾಜರ ಶಾಸನಗಳಿಗೆ (ಕ್ರಿ.ಶ. 4–16ನೇ ಶತಮಾನ) ಅನ್ವಯಿಸುತ್ತವೆ.',
      ta: 'வரலாற்றுப் பகுப்பு: (1) மரபுவழி காலக்கணக்கு இக்ஷ்வாகு, சகரர், பகீரதர் மற்றும் ஸ்ரீ ராமரை இதிகாச காலத்தில் வைக்கிறது; (2) உறுதிப்படுத்தப்பட்ட கல்வெட்டுத் தேதிகள் இவ்வம்சங்களைத் தமது பிரசஸ்திகளில் போற்றும் வரலாற்றுச் செப்பேடுகளுக்கு (பொ.ஊ. 4–16-ஆம் நூற்றாண்டு) மட்டுமே பொருந்தும்.',
      mr: 'ऐतिहासिक वर्गीकरण: (१) पारंपरिक कालगणना इक्ष्वाकू, सम्राट सगर, भगीरथ आणि श्रीराम यांना पौराणिक काळात ठेवते; (२) स्थापित शिलालेखीय तारखा केवळ या वंशांचा गौरव करणाऱ्या ऐतिहासिक ताम्रपटांना (इ.स. ४ थे–१६ वे शतक) लागू होतात.',
      or: 'ଐତିହାସିକ ବିଭାଜନ: (୧) ପାରମ୍ପରିକ କାଳକ୍ରମ ଇକ୍ଷ୍ୱାକୁ, ସମ୍ରାଟ ସଗର, ଭଗୀରଥ ଓ ଶ୍ରୀରାମଙ୍କୁ ପୌରାଣିକ କାଳରେ ସ୍ଥାନ ଦିଏ; (୨) ପ୍ରମାଣିତ ଶିଳାଲେଖ ତାରିଖ କେବଳ ଏହି ବଂଶକୁ ପ୍ରଶସ୍ତିରେ ସ୍ମରଣ କରୁଥିବା ଐତିହାସିକ ତାମ୍ରପଟା (୪ର୍ଥ–୧୬ଶ ଶତାବ୍ଦୀ) ପାଇଁ ପ୍ରযୁଜ୍ୟ।',
      bn: 'ঐতিহাসিক বিভাজন: (১) ঐতিহ্যগত কালক্রম ইক্ষ্বাকু, সম্রাট সগর, ভগীরথ ও শ্রীরামকে পৌরাণিক কালে স্থান দেয়; (২) প্রতিষ্ঠিত শিলালিপি তারিখ কেবল এই বংশকে প্রশস্তিতে স্মরণকারী ঐতিহাসিক তাম্রশাসনের (৪র্থ–১৬শ শতাব্দী) ক্ষেত্রে প্রযোজ্য।'
    },
    epistemicLabel: {
      en: 'Traditional Chronological Claim & Literary Vamsavali',
      hi: 'पारंपरिक कालक्रम दावा एवं साहित्यिक वंशावली',
      te: 'సాంప్రదాయ కాలక్రమ వాదన & సాహిత్య వంశావళి',
      kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕಾಲಗಣನೆ ಮತ್ತು ಸಾಹಿತ್ಯಿಕ ವಂಶಾವಳಿ',
      ta: 'மரபுவழி காலக்கணக்கு & இலக்கிய வம்சாவளி',
      mr: 'पारंपरिक कालगणना दावा आणि साहित्यिक वंशावळी',
      or: 'ପାରମ୍ପରିକ କାଳକ୍ରମ ଦାବି ଓ ସାହିତ୍ୟିକ ବଂଶାବଳୀ',
      bn: 'ঐতিহ্যগত কালক্রম দাবি ও সাহিত্যিক বংশাবলী'
    },
    epistemicTier: 'mythological_sacred',
    symbolicIllustration: ASSET_IMG('assets/01_samrat_sagara.webp'),
    illustrationCaption: {
      en: 'Symbolic artistic illustration of Samrat Sagara, Maharshi Bhagiratha (Gangavatarana), and Sri Rama — Sacred Ikshvaku Solar Lineage progenitors.',
      hi: 'सम्राट सगर, महर्षि भगीरथ (गंगावतरण) और श्री राम का प्रतीकात्मक कलात्मक चित्रण।',
      te: 'సమ్రాట్ సగరుడు, మహర్షి భగీరథుడు (గంగావతరణం) మరియు శ్రీరాముని ప్రతీకాత్మక చిత్రణ.',
      kn: 'ಸಾಮ್ರಾಟ್ ಸಗರ, ಮಹರ್ಷಿ ಭಗೀರಥ ಮತ್ತು ಶ್ರೀರಾಮನ ಸಾಂಕೇತಿಕ ಕಲಾತ್ಮಕ ಚಿತ್ರಣ.',
      ta: 'சாம்ராட் சகரர், மகரிஷி பகீரதர் மற்றும் ஸ்ரீ ராமரின் குறியீட்டுக் கலைச் சித்திரம்.',
      mr: 'सम्राट सगर, महर्षी भगीरथ आणि श्री राम यांचे प्रतीकात्मक कलात्मक चित्रण.',
      or: 'ସମ୍ରାଟ ସଗର, ମହର୍ଷି ଭଗୀରଥ ଓ ଶ୍ରୀରାମଙ୍କ ପ୍ରତୀକାତ୍ମକ କଳାତ୍ମକ ଚିତ୍ର।',
      bn: 'সম্রাট সগর, মহর্ষি ভগীরথ ও শ্রীরামের প্রতীকী শৈল্পিক চিত্র।'
    },
    visualTypeBadge: {
      en: 'Symbolic Artistic Illustration (Sacred Tradition)',
      hi: 'प्रतीकात्मक कलात्मक चित्रण (पवित्र परंपरा)',
      te: 'ప్రతీకాత్మక కళాత్మక చిత్రణ (పవిత్ర సంప్రదాయం)',
      kn: 'ಸಾಂಕೇತಿಕ ಕಲಾತ್ಮಕ ಚಿತ್ರಣ (ಪವಿತ್ರ ಸಂಪ್ರದಾಯ)',
      ta: 'குறியீட்டுக் கலைச் சித்திரம் (புனித மரபு)',
      mr: 'प्रतीकात्मक कलात्मक चित्रण (पवित्र परंपरा)',
      or: 'ପ୍ରତୀକାତ୍ମକ କଳାତ୍ମକ ଚିତ୍ର (ପବିତ୍ର ପରମ୍ପରା)',
      bn: 'প্রতীকী শৈল্পিক চিত্র (পবিত্র ঐতিহ্য)'
    },
    conciseOverview: {
      en: 'Encompasses the Puranic and Itihasic accounts of the Suryavamsha (Solar Lineage of Ikshvaku, Samrat Sagara, Maharshi Bhagiratha, and Sri Rama) and Chandravamsha (Lunar Lineage of Pururavas, Yayati, and Bharata), strictly distinguished from dated archaeological chronology.',
      hi: 'सूर्यवंश (इक्ष्वाकु, सम्राट सगर, महर्षि भगीरथ और श्री राम) तथा चंद्रवंश (पुरुरवा, ययाति और भरत) के पौराणिक और महाकाव्यीय आख्यानों को समाहित करता है, जिन्हें पुरातात्विक तिथियों से स्पष्ट रूप से अलग रखा गया है।',
      te: 'సూర్యవంశం (ఇక్ష్వాకు, సగరుడు, భగీరథుడు, శ్రీరాముడు) మరియు చంద్రవంశం (పురూరవుడు, యయాతి, భరతుడు) యొక్క పురాణ-ఇతిహాస కథనాలను కలిగి ఉంటుంది; ఇవి పురావస్తు తేదీల నుండి స్పష్టంగా వేరు చేయబడ్డాయి.',
      kn: 'ಸೂರ್ಯವಂಶ (ಇಕ್ಷ್ವಾಕು, ಸಗರ, ಭಗೀರಥ, ಶ್ರೀರಾಮ) ಮತ್ತು ಚಂದ್ರವಂಶದ (ಪುರೂರವ, ಯಯಾತಿ, ಭರತ) ಪೌರಾಣಿಕ ಮತ್ತು ಮಹಾಕಾವ್ಯದ ವಿವರಗಳನ್ನು ಒಳಗೊಂಡಿದ್ದು, ಪುರಾತತ್ವ ದಿನಾಂಕಗಳಿಂದ ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆ.',
      ta: 'சூரியவம்சம் (இக்ஷ்வாகு, சகரர், பகீரதர், ஸ்ரீ ராமர்) மற்றும் சந்திரவம்சம் (புரூரவன், யயாதி, பரதன்) ஆகியவற்றின் புராண-இதிகாச மரபுகளை உள்ளடக்கியது; இது தொல்லியல் காலக்கணக்கிலிருந்து தெளிவாக வேறுபடுத்தப்பட்டுள்ளது.',
      mr: 'सूर्यवंश (इक्ष्वाकू, सगर, भगीरथ, श्रीराम) आणि चंद्रवंश (पुरुरवा, ययाती, भरत) यांच्या पौराणिक आख्यायिकांचा समावेश, ज्यांची पुरातत्त्वीय तारखांपासून स्पष्ट विभागणी केली आहे.',
      or: 'ସୂର୍ଯ୍ୟବଂଶ (ଇକ୍ଷ୍ୱାକୁ, ସଗର, ଭଗୀରଥ, ଶ୍ରୀରାମ) ଓ ଚନ୍ଦ୍ରବଂଶ (ପୁରୂରବା, ଯଯାତି, ଭରତ) ର ପୌରାଣିକ ବିବରଣୀ, ଯାହା ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ତାରିଖଠାରୁ ସ୍ପଷ୍ଟ ଭାବେ ପୃଥକ।',
      bn: 'সূর্যবংশ (ইক্ষ্বাকু, সগর, ভগীরথ, শ্রীরাম) ও চন্দ্রবংশের (পুরূরবা, যযাতি, ভরত) পৌরাণিক বিবরণ, যা প্রত্নতাত্ত্বিক তারিখ থেকে স্পষ্টভাবে পৃথক।'
    },
    detailedAnalysis: {
      en: 'While Puranic vamsavalis are not contemporary epigraphic documents, they served for over two millennia as the foundational charter of royal legitimacy and civic ethos across India. Medieval dynasties—including the Andhra Ikshvakus (3rd century CE), Imperial Cholas (Tiruvalangadu Plates), Eastern Gangas (Korni Plates), Somavamshis, and Suryavamsha Gajapathis (Veligalani Plates, 1458 CE)—formally invoked these lineages in their Sanskrit prasasti preambles.',
      hi: 'यद्यपि पौराणिक वंशावलियाँ समकालीन शिलालेख नहीं हैं, फिर भी उन्होंने दो सहस्राब्दियों से अधिक समय तक राजवंशीय वैधता और लोक-कल्याण के आदर्श के रूप में कार्य किया। आंध्र इक्ष्वाकु (तीसरी शताब्दी ई.), चोल (तिरुवालंगाडु ताम्रपत्र), पूर्वी गंग (कोर्गी ताम्रपत्र), सोमवंशी और सूर्यवंशी गजपतियों (वेलिगलानि ताम्रपत्र, 1458 ई.) ने अपनी संस्कृत प्रशस्तियों में इन वंशों का गौरवपूर्ण उल्लेख किया।',
      te: 'పురాణ వంశావళులు సమకాలీన శాసనాలు కాకపోయినా, అవి రెండు సహస్రాబ్దాలకు పైగా రాజ ధర్మానికి, ప్రజా సంక్షేమానికి ఆదర్శంగా నిలిచాయి. ఆంధ్ర ఇక్ష్వాకులు (క్రీ.శ. 3వ శతాబ్దం), చోళులు (తిరువాలంగాడు తామ్రపత్రాలు), తూర్పు గాంగులు, సోమవంశీయులు మరియు సూర్యవంశ గజపతులు (వెలిగలాని తామ్రశాసనం, 1458 క్రీ.శ.) తమ ప్రశస్తులలో ఈ వంశాలను స్మరించుకున్నారు.',
      kn: 'ಪುರಾಣ ವಂಶಾವಳಿಗಳು ಸಮಕಾಲೀನ ಶಾಸನಗಳಲ್ಲದಿದ್ದರೂ, ಎರಡು ಸಹಸ್ರಮಾನಗಳಿಗೂ ಹೆಚ್ಚು ಕಾಲ ರಾಜಧರ್ಮ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಕಲ್ಯಾಣದ ಆದರ್ಶವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸಿದವು. ಆಂಧ್ರ ಇಕ್ಷ್ವಾಕುಗಳು, ಚೋಳರು, ಗಂಗರು, ಸೋಮವಂಶಿಗಳು ಮತ್ತು ಸೂರ್ಯವಂಶ ಗಜಪತಿಗಳು (ವೆಲಿಗಲಾನಿ ಶಾಸನ, 1458) ತಮ್ಮ ತಾಮ್ರಶಾಸನಗಳ ಪ್ರಶಸ್ತಿಗಳಲ್ಲಿ ಈ ವಂಶಗಳನ್ನು ಉಲ್ಲೇಖಿಸಿದ್ದಾರೆ.',
      ta: 'புராண வம்சாவளிகள் சமகாலக் கல்வெட்டுகள் அல்ல என்றாலும், அவை இரண்டாயிரம் ஆண்டுகளுக்கும் மேலாக அரச தர்மத்திற்கும் பொதுநலத்திற்கும் அடிப்படை முன்மாதிரியாகத் திகழ்ந்தன. ஆந்திர இக்ஷ்வாகுகள், சோழர்கள் (திருவாலங்காடு செப்பேடுகள்), கங்கர்கள் மற்றும் சூரியவம்ச கஜபதிகள் (வெலிகலானி செப்பேடு, 1458) தமது பிரசஸ்திகளில் இவ்வம்சங்களைப் போற்றியுள்ளனர்.',
      mr: 'पौराणिक वंशावळी समकालीन शिलालेख नसल्या तरी त्यांनी दोन सहस्रकांहून अधिक काळ राजधर्म आणि लोककल्याणाचा आदर्श म्हणून कार्य केले. आंध्र इक्ष्वाकू, चोल, गंग, सोमवंशी आणि सूर्यवंशी गजपतींनी (वेलिगलानि ताम्रपट, १४५८) आपल्या प्रशस्तींमध्ये या वंशांचा गौरव केला आहे.',
      or: 'ପୌରାଣିକ ବଂଶାବଳୀ ସମକାଳୀନ ଶିଳାଲେଖ ନହେଲେ ମଧ୍ୟ ଦୁଇ ସହସ୍ରାବ୍ଦ ଧରି ରାଜଧର୍ମ ଓ ଲୋକକଲ୍ୟାଣର ଆଦର୍ଶ ଭାବେ କାର୍ଯ୍ୟ କରିଥିଲା। ଆନ୍ଧ୍ର ଇକ୍ଷ୍ୱାକୁ, ଚୋଳ, ଗଙ୍ଗ, ସୋମବଂଶୀ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତିମାନେ (ଭେଲିଗଲାନି ତାମ୍ରପଟା, ୧୪୫୮) ସେମାନଙ୍କ ପ୍ରଶସ୍ତିରେ ଏହି ବଂଶର ଉଲ୍ଲେଖ କରିଛନ୍ତି।',
      bn: 'পৌরাণিক বংশাবলী সমকালীন শিলালিপি না হলেও দুই সহস্রাব্দেরও বেশি সময় ধরে রাজধর্ম ও জনকল্যাণের আদর্শ হিসেবে কাজ করেছে। অন্ধ্র ইক্ষ্বাকু, চোল, গঙ্গ, সোমবংশী ও সূর্যবংশী গজপতিরা (ভেলিগলানি তাম্রশাসন, ১৪৫৮) তাঁদের প্রশস্তিতে এই বংশের উল্লেখ করেছেন।'
    },
    dateClassificationBreakdown: {
      establishedInscriptional: {
        en: 'None for epic figures themselves; epigraphic invocations begin in Nagarjunakonda Ikshvaku Prakrit inscriptions (c. 225–325 CE) and medieval Sanskrit copper plates (10th–16th century CE).',
        hi: 'महाकाव्य पात्रों के लिए कोई समकालीन शिलालेख नहीं; अभिलेखीय उल्लेख नागार्जुनकोंडा इक्ष्वाकु शिलालेखों (लगभग 225–325 ई.) और मध्यकालीन ताम्रपत्रों (10वीं–16वीं शताब्दी ई.) से प्रारंभ।',
        te: 'ఇతిహాస పురుషులకు సమకాలీన శాసనాలు లేవు; నాగార్జునకొండ ఇక్ష్వాకు శాసనాలు (క్రీ.శ. 225–325) మరియు మధ్యయుగ తామ్రపత్రాలలో (10వ–16వ శతాబ్దం) వంశ ప్రస్తావన ఉంది.',
        kn: 'ಮಹಾಕಾವ್ಯದ ಪಾತ್ರಗಳಿಗೆ ಸಮಕಾಲೀನ ಶಾಸನಗಳಿಲ್ಲ; ನಾಗಾರ್ಜುನಕೊಂಡ ಇಕ್ಷ್ವಾಕು ಶಾಸನಗಳು (ಕ್ರಿ.ಶ. 225–325) ಮತ್ತು ಮಧ್ಯಕಾಲೀನ ತಾಮ್ರಪತ್ರಗಳಲ್ಲಿ (10–16ನೇ ಶತಮಾನ) ವಂಶದ ಉಲ್ಲೇಖವಿದೆ.',
        ta: 'இதிகாச நாயகர்களுக்குச் சமகாலக் கல்வெட்டுகள் இல்லை; நாகார்ஜுனகொண்டா இக்ஷ்வாகு கல்வெட்டுகள் (பொ.ஊ. 225–325) மற்றும் இடைக்காலச் செப்பேடுகளில் (10–16-ஆம் நூற்றாண்டு) வம்சப் பிரசஸ்தி உள்ளது.',
        mr: 'महाकाव्यातील व्यक्तींसाठी समकालीन शिलालेख नाहीत; नागार्जुनकोंडा इक्ष्वाकू शिलालेख (इ.स. २२५–३२५) आणि मध्ययुगीन ताम्रपटांत (१० वे–१६ वे शतक) वंश उल्लेख आढळतो.',
        or: 'ମହାକାବ୍ୟ ଚରିତ୍ରଙ୍କ ପାଇଁ ସମକାଳୀନ ଶିଳାଲେଖ ନାହିଁ; ନାଗାର୍ଜୁନକୋଣ୍ଡା ଇକ୍ଷ୍ୱାକୁ ଶିଳାଲେଖ (୨୨୫–୩୨୫ ଖ୍ରୀ.ଅ.) ଓ ମଧ୍ୟଯୁଗୀୟ ତାମ୍ରପଟାରେ ବଂଶ ପ୍ରଶସ୍ତି ମିଳେ।',
        bn: 'মহাকাব্যিক চরিত্রদের সমকালীন শিলালিপি নেই; নাগার্জুনকোন্ডা ইক্ষ্বাকু শিলালিপি (২২৫–৩২৫ খ্রি.) ও মধ্যযুগীয় তাম্রশাসনে বংশ প্রশস্তি পাওয়া যায়।'
      },
      approximateDynastic: {
        en: 'Textual redaction of Valmiki Ramayana and Mahabharata placed by philologists (F.E. Pargiter, J. Brockington) between c. 7th century BCE and 3rd century CE.',
        hi: 'वाल्मीकि रामायण और महाभारत के साहित्यिक संकलन का काल भाषाविदों (एफ.ई. पार्जिटर, जे. ब्रॉकिंगटन) द्वारा लगभग 7वीं शताब्दी ई.पू. से तीसरी शताब्दी ई. के मध्य अनुमानित।',
        te: 'వాల్మీకి రామాయణం మరియు మహాభారత గ్రంథ సంకలన కాలం భాషా పరిశోధకుల ప్రకారం సుమారు క్రీ.పూ. 7వ శతాబ్దం నుండి క్రీ.శ. 3వ శతాబ్దం మధ్య అంచనా వేయబడింది.',
        kn: 'ವಾಲ್ಮೀಕಿ ರಾಮಾಯಣ ಮತ್ತು ಮಹಾಭಾರತದ ಪಠ್ಯ ಸಂಕಲನ ಕಾಲವನ್ನು ವಿದ್ವಾಂಸರು ಸು. ಕ್ರಿ.ಪೂ. 7ನೇ ಶತಮಾನದಿಂದ ಕ್ರಿ.ಶ. 3ನೇ ಶತಮಾನದ ನಡುವೆ ಅಂದಾಜಿಸಿದ್ದಾರೆ.',
        ta: 'வால்மீகி ராமாயணம் மற்றும் மகாபாரத இலக்கியத் தொகுப்புக் காலம் பொ.ஊ.மு. 7-ஆம் நூற்றாண்டு முதல் பொ.ஊ. 3-ஆம் நூற்றாண்டு வரை என அறிஞர்களால் கணிக்கப்படுகிறது.',
        mr: 'वाल्मीकी रामायण आणि महाभारताच्या संकलनाचा काळ अभ्यासकांनी अंदाजे इ.स.पू. ७ वे शतक ते इ.स. ३ रे शतक या दरम्यान मानला आहे.',
        or: 'ବାଲ୍ମୀକି ରାମାୟଣ ଓ ମହାଭାରତର সাহিত্যିକ ସଂକଳନ କାଳ ଗବେଷକମାନଙ୍କ ଦ୍ୱାରା ଖ୍ରୀ.ପୂ. ୭ମ ଶତାବ୍ଦୀରୁ ୩ୟ ଶତାବ୍ଦୀ ମଧ୍ୟରେ ଆନୁମାନିକ।',
        bn: 'বাল্মীকি রামায়ণ ও মহাভারতের সাহিত্যিক সংকলন কাল গবেষকদের দ্বারা খ্রি.পূ. ৭ম শতাব্দী থেকে ৩য় শতাব্দীর মধ্যে আনুমানিক।'
      },
      disputedInterpretations: {
        en: 'Archaeo-astronomical attempts to assign absolute BCE dates to the Treta or Dvapara Yugas vary by thousands of years and are not treated as verified epigraphic dates.',
        hi: 'त्रेता या द्वापर युग को खगोलीय गणनाओं द्वारा निश्चित ई.पू. तिथियां देने के प्रयासों में हजारों वर्षों का अंतर है और उन्हें सत्यापित शिलालेखीय तिथि नहीं माना जाता।',
        te: 'త్రేతా లేదా ద్వాపర యుగాలకు ఖగోళ గణనల ద్వారా ఖచ్చితమైన క్రీ.పూ. తేదీలను నిర్ణయించే ప్రయత్నాలలో వేల సంవత్సరాల వ్యత్యాసం ఉన్నందున వాటిని శాసన తేదీలుగా పరిగణించరు.',
        kn: 'ತ್ರೇತಾ ಅಥವಾ ದ್ವಾಪರ ಯುಗಗಳಿಗೆ ಖಗೋಳ ಲೆಕ್ಕಾಚಾರದ ಮೂಲಕ ನಿಖರ ಕ್ರಿ.ಪೂ. ದಿನಾಂಕಗಳನ್ನು ನೀಡುವ ಪ್ರಯತ್ನಗಳಲ್ಲಿ ಸಾವಿರಾರು ವರ್ಷಗಳ ವ್ಯತ್ಯಾಸವಿದ್ದು, ಅವುಗಳನ್ನು ಶಾಸನ ದಿನಾಂಕಗಳೆಂದು ಪರಿಗಣಿಸಲಾಗುವುದಿಲ್ಲ.',
        ta: 'திரேதா அல்லது துவாபர யுகங்களுக்கு வானியல் கணக்கீடுகள் மூலம் துல்லியமான பொ.ஊ.மு. தேதிகளைக் குறிப்பிடும் முயற்சிகள் கல்வெட்டுச் சான்றுகளாகக் கருதப்படுவதில்லை.',
        mr: 'त्रेता किंवा द्वापर युगाला खगोलीय गणिताने निश्चित इ.स.पू. तारखा देण्याच्या प्रयत्नांत हजारो वर्षांची तफावत असल्याने त्यांना शिलालेखीय पुरावा मानले जात नाही.',
        or: 'ତ୍ରେତା ବା ଦ୍ୱାପର ଯୁଗକୁ ଜ୍ୟୋତିଷ ଗଣନା ଦ୍ୱାରା ନିର୍ଦ୍ଦିଷ୍ଟ ଖ୍ରୀ.ପୂ. ତାରିଖ ଦେବା ପ୍ରୟାସରେ ସହସ্র ବର୍ଷର ପାର୍ଥକ୍ୟ ଥିବାରୁ ତାହାକୁ ଶିଳାଲେଖ ତାରିଖ ଭାବେ ଗ୍ରହଣ କରାଯାଏ ନାହିଁ।',
        bn: 'ত্রেতা বা দ্বাপর যুগকে জ্যোতির্বিদ্যা গণনা দ্বারা নির্দিষ্ট খ্রি.পূ. তারিখ দেওয়ার প্রচেষ্টায় হাজার বছরের পার্থক্য থাকায় তা শিলালিপি তারিখ হিসেবে গণ্য হয় না।'
      },
      traditionalClaims: {
        en: 'Sacred Ikshvaku Suryavamsha (Samrat Sagara, Maharshi Bhagiratha, Sri Rama) and Somavamsha/Chandravamsha (Pururavas, Yayati) revered in Puranic and community traditions.',
        hi: 'पौराणिक और सामुदायिक परंपराओं में पूजित पवित्र इक्ष्वाकु सूर्यवंश (सम्राट सगर, महर्षि भगीरथ, श्री राम) एवं चंद्रवंश (पुरुरवा, ययाति)।',
        te: 'పురాణ మరియు కుల సంప్రదాయాలలో ఆరాధించబడే పవిత్ర ఇక్ష్వాకు సూర్యవంశం (సమ్రాట్ సగరుడు, భగీరథుడు, శ్రీరాముడు) మరియు చంద్రవంశం (పురూరవుడు, యయాతి).',
        kn: 'ಪುರಾಣ ಮತ್ತು ಸಮುದಾಯ ಸಂಪ್ರದಾಯಗಳಲ್ಲಿ ಗೌರವಿಸಲ್ಪಡುವ ಪವಿತ್ರ ಇಕ್ಷ್ವಾಕು ಸూర్ಯವಂಶ (ಸಗರ, ಭಗೀರಥ, ಶ್ರೀರಾಮ) ಮತ್ತು ಚಂದ್ರವಂಶ (ಪುರೂರವ, ಯಯಾತಿ).',
        ta: 'புராண மற்றும் சமூக மரபுகளில் போற்றப்படும் புனித இக்ஷ்வாகு சூரியவம்சம் (சகரர், பகீரதர், ஸ்ரீ ராமர்) மற்றும் சந்திரவம்சம் (புரூரவன், யயாதி).',
        mr: 'पौराणिक आणि सामुदायिक परंपरेत पूजनीय मानले जाणारे इक्ष्वाकू सूर्यवंश (सगर, भगीरथ, श्रीराम) आणि चंद्रवंश (पुरुरवा, ययाती).',
        or: 'ପୌରାଣିକ ଓ ସାମୁଦାୟିକ ପରମ୍ପରାରେ ପୂଜିତ ପବିତ୍ର ଇକ୍ଷ୍ୱାକୁ ସୂର୍ଯ୍ୟବଂଶ (ସଗର, ଭଗୀରଥ, ଶ୍ରୀରାମ) ଓ ଚନ୍ଦ୍ରବଂଶ (ପୁରୂରବା, ଯଯାତି)।',
        bn: 'পৌরাণিক ও সম্প্রদায়গত ঐতিহ্যে পূজিত পবিত্র ইক্ষ্বাকু সূর্যবংশ (সগর, ভগীরথ, শ্রীরাম) ও চন্দ্রবংশ (পুরূরবা, যযাতি)।'
      }
    },
    parallelTracks: [
      {
        corridorId: 'track_suryavamsha_tradition',
        corridorLabel: {
          en: 'Solar Lineage Tradition (Suryavamsha / Ikshvaku)',
          hi: 'सूर्यवंश परंपरा (इक्ष्वाकु वंश)',
          te: 'సూర్యవంశ సంప్రదాయం (ఇక్ష్వాకు వంశం)',
          kn: 'ಸೂರ್ಯವಂಶ ಸಂಪ್ರದಾಯ (ಇಕ್ಷ್ವಾಕು ವಂಶ)',
          ta: 'சூரியவம்ச மரபு (இக்ஷ்வாகு வம்சம்)',
          mr: 'सूर्यवंश परंपरा (इक्ष्वाकू वंश)',
          or: 'ସୂର୍ଯ୍ୟବଂଶ ପରମ୍ପରା (ଇକ୍ଷ୍ୱାକୁ ବଂଶ)',
          bn: 'সূর্যবংশ ঐতিহ্য (ইক্ষ্বাকু বংশ)'
        },
        dynastiesAndPolities: {
          en: 'Vaivasvata Manu → Ikshvaku → Samrat Sagara → Maharshi Bhagiratha → Raghu → Sri Rama of Kosala (Ayodhya)',
          hi: 'वैवस्वत मनु → इक्ष्वाकु → सम्राट सगर → महर्षि भगीरथ → रघु → कोसल के श्री राम (अयोध्या)',
          te: 'వైవస్వత మనువు → ఇక్ష్వాకు → సమ్రాట్ సగరుడు → మహర్షి భగీరథుడు → రఘు → శ్రీరాముడు (అయోధ్య)',
          kn: 'ವೈವಸ್ವತ ಮನು → ಇಕ್ಷ್ವಾಕು → ಸಾಮ್ರಾಟ್ ಸಗರ → ಮಹರ್ಷಿ ಭಗೀರಥ → ರಘು → ಶ್ರೀರಾಮ (ಅಯೋಧ್ಯೆ)',
          ta: 'வைவஸ்வத மனு → இக்ஷ்வாகு → சாம்ராட் சகரர் → மகரிஷி பகீரதர் → ரகு → ஸ்ரீ ராமர் (அயோத்தி)',
          mr: 'वैवस्वत मनू → इक्ष्वाकू → सम्राट सगर → महर्षी भगीरथ → रघु → प्रभू श्रीराम (अयोध्या)',
          or: 'ବୈବସ୍ୱତ ମନୁ → ଇକ୍ଷ୍ୱାକୁ → ସମ୍ରାଟ ସଗର → ମହର୍ଷି ଭଗୀରଥ → ରଘୁ → ଶ୍ରୀରାମ (ଅଯୋଧ୍ୟା)',
          bn: 'বৈবস্বত মনু → ইক্ষ্বাকু → সম্রাট সগর → মহর্ষি ভগীরথ → রঘু → শ্রীরাম (অযোধ্যা)'
        },
        dateSpan: 'Sacred Non-Calendrical Epic Antiquity',
        dateType: 'Traditional Claim',
        epigraphicAnchor: 'Valmiki Ramayana (Balakanda Sargas 38–44); Vishnu Purana Book IV; Raghuvamsha'
      },
      {
        corridorId: 'track_chandravamsha_tradition',
        corridorLabel: {
          en: 'Lunar Lineage Tradition (Chandravamsha / Somavamsha)',
          hi: 'चंद्रवंश परंपरा (सोमवंश)',
          te: 'చంద్రవంశ సంప్రదాయం (సోమవంశం)',
          kn: 'ಚಂದ್ರವಂಶ ಸಂಪ್ರದಾಯ (ಸೋಮವಂಶ)',
          ta: 'சந்திரவம்ச மரபு (சோமவம்சம்)',
          mr: 'चंद्रवंश परंपरा (सोमवंश)',
          or: 'ଚନ୍ଦ୍ରବଂଶ ପରମ୍ପରା (ସୋମବଂଶ)',
          bn: 'চন্দ্রবংশ ঐতিহ্য (সোমবংশ)'
        },
        dynastiesAndPolities: {
          en: 'Soma / Atri → Budha → Pururavas → Nahusha → Yayati → Yadu, Turvasu, Druhyu, Anu & Puru (Bharata / Kuru)',
          hi: 'सोम / अत्रि → बुध → पुरुरवा → नहुष → ययाति → यदु, तुर्वसु, द्रुह्यु, अनु एवं पुरु (भरत / कुरु)',
          te: 'సోమ / అత్రి → బుధ → పురూరవుడు → నహుషుడు → యయాతి → యదు, తుర్వసు, ద్రుహ్యు, అను & పురు (భరత / కురు)',
          kn: 'ಸೋಮ / ಅತ್ರಿ → ಬುಧ → ಪುರೂರವ → ನಹುಷ → ಯಯಾತಿ → ಯದು, ತುರ್ವಸು, ದ್ರುಹ್ಯು, ಅನು ಮತ್ತು ಪುರು (ಭರತ / ಕುರು)',
          ta: 'சோமன் / அத்ரி → புதன் → புரூரவன் → நஹுஷன் → யயாதி → யது, துர்வசு, புரு (பரதன் / குரு)',
          mr: 'सोम / अत्री → बुध → पुरुरवा → नहुष → ययाती → यदु, तुर्वसू, द्रुह्यू, अनू आणि पुरू (भरत / कुरू)',
          or: 'ସୋମ / ଅତ୍ରି → ବୁଧ → ପୁରୂରବା → ନହୁଷ → ଯଯାତି → ଯଦୁ, ତୁର୍ବସୁ, ଦ୍ରୁହ୍ୟୁ, ଅନୁ ଓ ପୁରୁ (ଭରତ / କୁରୁ)',
          bn: 'সোম / অত্রি → বুধ → পুরূরবা → নহুষ → যযাতি → যদু, তুর্বসু, দ্রুহ্যু, অনু ও পুরু (ভরত / কুরু)'
        },
        dateSpan: 'Sacred Non-Calendrical Epic Antiquity',
        dateType: 'Traditional Claim',
        epigraphicAnchor: 'Mahabharata (Adi Parva); Matsya Purana; Bhagavata Purana Book IX'
      }
    ],
    keyMonumentsAndInscriptions: ['Valmiki Ramayana (Balakanda Sargas 38–44)', 'Mahabharata (Adi & Vana Parva)', 'Vishnu Purana (Book IV)', 'Raghuvamsha of Kalidasa'],
    linkedArticleIds: ['art_surya_vamsa_sagara_rama', 'art_lin_suryavamshi_kshatriyas', 'art_lin_chandravamshi_kshatriyas'],
    linkedEventIds: []
  },
  {
    stageOrder: 2,
    id: 'stage_02_ancient_civilizations',
    refNumber: 'HT-0003',
    stageCode: 'ANCIENT_CIVILIZATIONS',
    title: {
      en: 'Stage 2: Ancient Civilizations & Proto-Historical Settlements (c. 2500 – 400 BCE — Chalcolithic to Early Iron Age Urban Horizon)',
      hi: 'चरण 2: प्राचीन सभ्यताएं एवं आद्य-ऐतिहासिक बस्तियां (लगभग 2500 – 400 ई.पू. — ताम्रपाषाण से प्रारंभिक लौह युग)',
      te: 'దశ 2: ప్రాచీన నాగరికతలు & ఆదిమ చారిత్రక స్థావరాలు (సుమారు క్రీ.పూ. 2500 – 400 — తామ్ర-రాతి నుండి ప్రారంభ ఇనుప యుగం)',
      kn: 'ಹಂತ 2: ಪ್ರಾಚೀನ ನಾಗರಿಕತೆಗಳು ಮತ್ತು ಆದ್ಯ-ಐತಿಹಾಸಿಕ ನೆಲೆಗಳು (ಸು. ಕ್ರಿ.ಪೂ. 2500 – 400 — ತಾಮ್ರ-ಶಿಲಾಯುಗದಿಂದ ಆರಂಭಿಕ ಕಬ್ಬಿಣ ಯುಗ)',
      ta: 'நிலை 2: பண்டைய நாகரிகங்கள் & தொடக்கக் காலக் குடியிருப்புகள் (பொ.ஊ.மு. 2500 – 400 — செம்பு-கற்காலம் முதல் இரும்புக்காலம்)',
      mr: 'टप्पा 2: प्राचीन संस्कृती आणि आद्य-ऐतिहासिक वस्त्या (इ.स.पू. २५०० – ४०० — ताम्रपाषाण ते प्रारंभिक लोहयुग)',
      or: 'ପର୍ଯ୍ୟାୟ ୨: ପ୍ରାଚୀନ ସଭ୍ୟତା ଓ ଆଦ୍ୟ-ଐତିହାସିକ ବସତି (ଖ୍ରୀ.ପୂ. ୨୫୦୦ – ୪୦୦ — ତାମ୍ର-ପ୍ରସ୍ତରରୁ ପ୍ରାରମ୍ଭିକ ଲୌହ ଯୁଗ)',
      bn: 'পর্যায় ২: প্রাচীন সভ্যতা ও আদি-ঐতিহাসিক বসতি (খ্রি.পূ. ২৫০০ – ৪০০ — তাম্র-প্রস্তর থেকে প্রারମ୍ଭিক লৌহযুগ)'
    },
    approxDateLabel: {
      en: 'Approximate Stratigraphic Range: c. 2500 BCE – 400 BCE (Urban Ramparts of Sisupalgarh & Asurgarh Continue to c. 200 CE)',
      hi: 'अनुमानित पुरातात्विक काल: लगभग 2500 ई.पू. – 400 ई.पू. (शिशुपालगढ़ एवं असुरगढ़ के नगरीय दुर्ग लगभग 200 ई. तक सक्रिय)',
      te: 'సుమారు పురావస్తు కాలం: క్రీ.పూ. 2500 – 400 (శిశుపాల్‌గఢ్ మరియు అసుర్‌గఢ్ నగర ప్రాకారాలు క్రీ.శ. 200 వరకు కొనసాగాయి)',
      kn: 'ಅಂದಾಜು ಪುರಾತತ್ವ ಕಾಲ: ಕ್ರಿ.ಪೂ. 2500 – 400 (ಶಿಶುಪಾಲಗಢ ಮತ್ತು ಅಸುರಗಢದ ಕೋಟೆ ನಗರಗಳು ಕ್ರಿ.ಶ. 200ರವರೆಗೆ ಮುಂದುವರಿದವು)',
      ta: 'தோராயமான தொல்லியல் காலம்: பொ.ஊ.மு. 2500 – 400 (சிசுபால்கர் மற்றும் அசுர்கர் கோட்டை நகரங்கள் பொ.ஊ. 200 வரை தொடர்ந்தன)',
      mr: 'अंदाजे पुरातत्त्वीय कालखंड: इ.स.पू. २५०० – ४०० (शिशुपालगड आणि असुरगड येथील तटबंदीयुक्त शहरे इ.स. २०० पर्यंत कार्यरत)',
      or: 'ଆନୁମାନିକ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ କାଳ: ଖ୍ରୀ.ପୂ. ୨୫୦୦ – ୪୦୦ (ଶିଶୁପାଳଗଡ଼ ଓ ଅସୁରଗଡ଼ ଦୁର୍ଗ ନଗରୀ ୨୦୦ ଖ୍ରୀ.ଅ. ପର୍ଯ୍ୟନ୍ତ ସକ୍ରିୟ)',
      bn: 'আনুমানিক প্রত্নতাত্ত্বিক কাল: খ্রি.পূ. ২৫০০ – ৪০০ (শিশুপালগড় ও অসুরগড় দুর্গ নগরী ২০০ খ্রি. পর্যন্ত সক্রিয়)'
    },
    chronologicalUncertaintyNote: {
      en: 'Dates are approximate (+/- 100–150 years) based on radiocarbon (C-14) and ceramic stratigraphy (Black-and-Red Ware, Northern Black Polished Ware) at Golabai Sasan (c. 2300–1000 BCE) and early Sisupalgarh/Jaugada/Asurgarh (c. 700/500 BCE – 200 CE; B.B. Lal 1949; M.L. Smith & R.K. Mohanty 2009).',
      hi: 'तिथियां गोलाबाई शासन (लगभग 2300–1000 ई.पू.) और शिशुपालगढ़/जौगढ़/असुरगढ़ (लगभग 700/500 ई.पू. – 200 ई.; बी.बी. लाल 1949; स्मिथ एवं मोहंती 2009) में रेडियोकार्बन (C-14) और मृदभांड स्तरों के आधार पर अनुमानित (+/- 100–150 वर्ष) हैं।',
      te: 'గోలాబాయి శాసన్ (క్రీ.పూ. 2300–1000) మరియు శిశుపాల్‌గఢ్/జౌగఢ్/అసుర్‌గఢ్ (క్రీ.పూ. 700/500 – క్రీ.శ. 200; బి.బి. లాల్ 1949) వద్ద కార్బన్ డేటింగ్ (C-14) మరియు మৃణ్మయ పాత్రల ఆధారంగా ఈ తేదీలు సుమారుగా (+/- 100–150 ఏళ్లు) నిర్ణయించబడ్డాయి.',
      kn: 'ಗೋಲಾಬಾಯಿ ಶಾಸನ್ (ಕ್ರಿ.ಪೂ. 2300–1000) ಮತ್ತು ಶಿಶುಪಾಲಗಢ/ಜೌಗಢ/ಅಸುರಗಢದಲ್ಲಿನ (ಕ್ರಿ.ಪೂ. 700/500 – ಕ್ರಿ.ಶ. 200; ಬಿ.ಬಿ. ಲಾಲ್ 1949) ಕಾರ್ಬನ್ ಡೇಟಿಂಗ್ ಆಧಾರದ ಮೇಲೆ ಈ ದಿನಾಂಕಗಳನ್ನು ಅಂದಾಜಿಸಲಾಗಿದೆ (+/- 100–150 ವರ್ಷ).',
      ta: 'கோலாபாய் சாசன் (பொ.ஊ.மு. 2300–1000) மற்றும் சிசுபால்கர்/ஜௌகடா/அசுர்கர் (பொ.ஊ.மு. 700/500 – பொ.ஊ. 200; பி.பி. லால் 1949) ஆகிய இடங்களில் மேற்கொள்ளப்பட்ட கரிமக் காலக்கணிப்பு அடிப்படையில் கணிக்கப்பட்ட தோராயமான காலம்.',
      mr: 'गोलाबाई सासन (इ.स.पू. २३००–१०००) आणि शिशुपालगड/जौगड/असुरगड (इ.स.पू. ७००/५०० – इ.स. २००; बी.बी. लाल १९४९) येथील रेडिओकार्बन उत्खननावर आधारित अंदाजे कालखंड.',
      or: 'ଗୋଲାବାଈ ଶାସନ (ଖ୍ରୀ.ପୂ. ୨୩୦୦–୧୦୦୦) ଓ ଶିଶୁପାଳଗଡ଼/ଜଉଗଡ଼/ଅସୁରଗଡ଼ (ଖ୍ରୀ.ପୂ. ୭୦୦/୫୦୦ – ୨୦୦ ଖ୍ରୀ.ଅ.; ବି.ବି. ଲାଲ ୧୯୪୯) ରେ କାର୍ବନ ଡେଟିଂ ଆଧାରରେ ଆନୁମାନିକ ତାରିଖ।',
      bn: 'গোলাবাই শাসন (খ্রি.পূ. ২৩০০–১০০০) ও শিশুপালগড়/জৌগড়/অসুরগড়ে (খ্রি.পূ. ৭০০/৫০০ – ২০০ খ্রি.; বি.বি. লাল ১৯৪৯) কার্বন ডেটিং-এর ওপর ভিত্তি করে আনুমানিক তারিখ।'
    },
    epistemicLabel: {
      en: 'Archaeological & Proto-Historical Stratigraphy (Approximate C-14 Dates)',
      hi: 'पुरातात्विक एवं आद्य-ऐतिहासिक स्तर (अनुमानित रेडियोकार्बन तिथियां)',
      te: 'పురావస్తు & ఆదిమ చారిత్రక ఆధారాలు (సుమారు కార్బన్ డేటింగ్ తేదీలు)',
      kn: 'ಪುರಾತತ್ವ ಮತ್ತು ಆದ್ಯ-ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯ (ಅಂದಾಜು ಕಾರ್ಬನ್ ಡೇಟಿಂಗ್)',
      ta: 'தொல்லியல் & தொடக்க வரலாற்றுச் சான்று (தோராயமான கரிமக் காலக்கணிப்பு)',
      mr: 'पुरातत्त्वीय आणि आद्य-ऐतिहासिक पुरावा (अंदाजे रेडिओकार्बन तारखा)',
      or: 'ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଓ ଆଦ୍ୟ-ଐତିହାସିକ ପ୍ରମାଣ (ଆନୁମାନିକ କାର୍ବନ ତାରିଖ)',
      bn: 'প্রত্নতাত্ত্বিক ও আদি-ঐতিহাসিক প্রমাণ (আনুমানিক কার্বন তারিখ)'
    },
    epistemicTier: 'proto_historical',
    symbolicIllustration: ARCHIVE_IMG('kalinga_sisupalgarh_ramparts.jpg'),
    illustrationCaption: {
      en: 'Excavated monolithic laterite columns and defensive earthwork ramparts of ancient Sisupalgarh (Kalinganagari), Bhubaneswar (urban occupation c. 700/500 BCE – 200 CE).',
      hi: 'प्राचीन शिशुपालगढ़ (कलिंगनगरी), भुवनेश्वर के उत्खनित एकाश्म स्तंभ और रक्षात्मक प्राचीर (नगरीय काल लगभग 700/500 ई.पू. – 200 ई.)।',
      te: 'భువనేశ్వర్ సమీపంలోని ప్రాచీన శిశుపాల్‌గఢ్ (కళింగనగరి) రాతి స్తంభాలు మరియు రక్షణ ప్రాకారాలు (క్రీ.పూ. 700/500 – క్రీ.శ. 200).',
      kn: 'ಭುವನೇಶ್ವರದ ಪ್ರಾಚೀನ ಶಿಶುಪಾಲಗಢದ (ಕಳಿಂಗನಗರಿ) ಏಕಾಶ್ಮ ಸ್तಂಭಗಳು ಮತ್ತು ರಕ್ಷಣಾ ಪ್ರಾಕಾರಗಳು (ಕ್ರಿ.ಪೂ. 700/500 – ಕ್ರಿ.ಶ. 200).',
      ta: 'புவனேஸ்வரில் உள்ள பண்டைய சிசுபால்கர் (கலிங்கநகரி) கற்றூண்கள் மற்றும் கோட்டை அரண்கள் (பொ.ஊ.மு. 700/500 – பொ.ஊ. 200).',
      mr: 'भुवनेश्वर येथील प्राचीन शिशुपालगड (कलिंगनगरी) चे उत्खनित स्तंभ आणि तटबंदी (इ.स.पू. ७००/५०० – इ.स. २००).',
      or: 'ଭୁବନେଶ୍ୱର ନିକଟସ୍ଥ ପ୍ରାଚୀନ ଶିଶୁପାଳଗଡ଼ (କଳିଙ୍ଗନଗରୀ) ର ଖନନকৃত ସ୍ତମ୍ଭ ଓ ଦୁର୍ଗ ପ୍ରାଚୀର (ଖ୍ରୀ.ପୂ. ୭୦୦/୫୦୦ – ୨୦୦ ଖ୍ରୀ.ଅ.)।',
      bn: 'ভুবনেশ্বরের প্রাচীন শিশুপালগড় (কলিঙ্গনগরী)-এর খননকৃত স্তম্ভ ও দুর্গ প্রাচীর (খ্রি.পূ. ৭০০/৫০০ – ২০০ খ্রি.)।'
    },
    visualTypeBadge: {
      en: 'Verified Archaeological Site Photography',
      hi: 'सत्यापित पुरातात्विक स्थल छायाचित्र',
      te: 'ధృవీకరించబడిన పురావస్తు ప్రదేశ ఛాయాచిత్రం',
      kn: 'ದೃಢೀಕೃತ ಪುರಾತತ್ವ ತಾಣದ ಛಾಯಾಚಿತ್ರ',
      ta: 'உறுதிப்படுத்தப்பட்ட தொல்லியல் தளப் புகைப்படம்',
      mr: 'सत्यापित पुरातत्त्वीय स्थळ छायाचित्र',
      or: 'ପ୍ରମାଣିତ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସ୍ଥଳ ଫଟୋଚିତ୍ର',
      bn: 'প্রমাণিত প্রত্নতাত্ত্বিক স্থানের আলোকচিত্র'
    },
    conciseOverview: {
      en: 'Chalcolithic and Iron Age riverine settlements in the Mahanadi, Godavari, Krishna, and Kaveri basins, culminating in the early fortified urban centers of Sisupalgarh, Jaugada, Asurgarh, and Dhanyakataka.',
      hi: 'महानदी, गोदावरी, कृष्णा और कावेरी घाटियों में ताम्रपाषाण और लौह युगीन बस्तियां, जो शिशुपालगढ़, जौगढ़, असुरगढ़ और धान्यकटक जैसे प्रारंभिक किलेबंद नगरों में विकसित हुईं।',
      te: 'మహానది, గోదావరి, కృష్ణా మరియు కావేరీ లోయలలో తామ్ర-రాతి మరియు ఇనుప యుగ స్థావరాలు; శిశుపాల్‌గఢ్, జౌగఢ్, అసుర్‌గఢ్ మరియు ధాన్యకటకం వంటి ప్రాచీన కోట నగరాల ఆవిర్భావం.',
      kn: 'ಮಹಾನದಿ, ಗೋದಾವರಿ, ಕೃಷ್ಣಾ ಮತ್ತು ಕಾವೇರಿ ಕಣಿವೆಗಳಲ್ಲಿನ ತಾಮ್ರ-ಶಿಲಾಯುಗ ಮತ್ತು ಕಬ್ಬಿಣ ಯುಗದ ನೆಲೆಗಳು; ಶಿಶುಪಾಲಗಢ, ಜೌಗಢ, ಅಸುರಗಢ ಮತ್ತು ಧಾನ್ಯಕಟಕದಂತಹ ಆರಂಭಿಕ ಕೋಟೆ ನಗರಗಳ ಉದಯ.',
      ta: 'மகாநதி, கோதாவரி, கிருஷ்ணா மற்றும் காவிரிப் படுகைகளில் செம்பு-கற்கால மற்றும் இரும்புக்காலக் குடியிருப்புகள்; சிசுபால்கர், ஜௌகடா, அசுர்கர் மற்றும் தான்யகடகம் ஆகிய கோட்டை நகரங்களின் தோற்றம்.',
      mr: 'महानदी, गोदावरी, कृष्णा आणि कावेरी खोऱ्यातील ताम्रपाषाण व लोहयुगीन वस्त्या; शिशुपालगड, जौगड, असुरगड आणि धान्यकटक यांसारख्या प्राचीन तटबंदीयुक्त शहरांचा उदय.',
      or: 'ମହାନଦୀ, ଗୋଦାବରୀ, କୃଷ୍ଣା ଓ କାବେରୀ ଉପତ୍ୟକାରେ ତାମ୍ର-ପ୍ରସ୍ତର ଓ ଲୌହ ଯୁଗୀୟ ବସତି; ଶିଶୁପାଳଗଡ଼, ଜଉଗଡ଼, ଅସୁରଗଡ଼ ଓ ଧାନ୍ୟକଟକ ଭଳି ପ୍ରାଚୀନ ଦୁର୍ଗ ନଗରীর ଅଭ୍ୟୁଦୟ।',
      bn: 'মহানদী, গোদাবরী, কৃষ্ণা ও কাবেরী উপত্যকায় তাম্র-প্রস্তর ও লৌহযুগীয় বসতি; শিশুপালগড়, জৌগড়, অসুরগড় ও ধান্যকটকের মতো প্রাচীন দুর্গ নগরীর উত্থান।'
    },
    detailedAnalysis: {
      en: 'Excavations directed by B.B. Lal (1948–1949) and subsequent ASI/UCLA teams (M.L. Smith & R.K. Mohanty, 2001–2009) at Sisupalgarh revealed a planned square citadel with eight monumental laterite gateways and defensive moats fed by the Gangua stream, whose early earthen ramparts began in the mid-first millennium BCE and continued in parallel through the Mauryan and Mahameghavahana eras until c. 200 CE.',
      hi: 'बी.बी. लाल (1948–1949) तथा एएसआई/यूसीएलए (स्मिथ एवं मोहंती, 2001–2009) द्वारा शिशुपालगढ़ में किए गए उत्खनन से आठ भव्य द्वारों वाले एक सुनियोजित वर्गाकार दुर्ग और गंगुआ नाले से जुड़ी रक्षात्मक खाई के प्रमाण मिले हैं, जिसका नगरीय विकास प्रथम सहस्राब्दी ई.पू. के मध्य से प्रारंभ होकर मौर्य और खारवेल काल से होते हुए लगभग 200 ई. तक समानांतर रूप से जारी रहा।',
      te: 'బి.బి. లాల్ (1948–1949) మరియు తదుపరి పురావస్తు బృందాలు (స్మిత్ & మొహంతి, 2001–2009) శిశుపాల్‌గఢ్‌లో జరిపిన తవ్వకాలలో ఎనిమిది మహా ద్వారాలు గల చతురస్రాకార కోట మరియు రక్షణ కందకాలు బయటపడ్డాయి; ఈ నగర వికాసం క్రీ.పూ. 1వ సహస్రాబ్ది మధ్యలో ప్రారంభమై మౌర్య, ఖారవేల యుగాల గుండా క్రీ.శ. 200 వరకు సమాంతరంగా కొనసాగింది.',
      kn: 'ಬಿ.ಬಿ. ಲಾಲ್ (1948–1949) ಮತ್ತು ನಂತರದ ಪುರಾತತ್ವ ತಂಡಗಳು (ಸ್ಮಿತ್ ಮತ್ತು ಮೊಹಂತಿ, 2001–2009) ಶಿಶುಪಾಲಗಢದಲ್ಲಿ ನಡೆಸಿದ ಉತ್ಖನನದಲ್ಲಿ ಎಂಟು ಬೃಹತ್ ದ್ವಾರಗಳ ಚೌಕಾಕಾರದ ಕೋಟೆ ಮತ್ತು ಕಂದಕಗಳು ಪತ್ತೆಯಾಗಿದ್ದು, ಇವು ಮೌರ್ಯ ಮತ್ತು ಖಾರವೇಲ ಕಾಲದವರೆಗೆ (ಕ್ರಿ.ಶ. 200) ಮುಂದುವರಿದವು.',
      ta: 'பி.பி. லால் (1948–1949) மற்றும் ஸ்மித் & மொஹந்தி (2001–2009) குழுவினர் சிசுபால்கரில் நடத்திய அகழாய்வில் எட்டு நுழைவாயில்களைக் கொண்ட சதுரக் கோட்டை மற்றும் அகழிகள் கண்டறியப்பட்டன; இந்நகர நாகரிகம் மௌரியர் மற்றும் காரவேலர் காலம் வழியாக பொ.ஊ. 200 வரை தொடர்ந்தது.',
      mr: 'बी.बी. लाल (१९४८–१९४९) आणि स्मिथ व मोहंती (२००१–२००९) यांनी शिशुपालगड येथे केलेल्या उत्खननात आठ भव्य प्रवेशद्वारे असलेला चौरसाकृती किल्ला आणि खंदक आढळले असून हा नगरीय विकास इ.स. २०० पर्यंत समांतरपणे सुरू राहिला.',
      or: 'ବି.ବି. ଲାଲ (୧୯୪୮–୧୯୪୯) ଓ ପରବର୍ତ୍ତୀ ପ୍ରତ୍ନତତ୍ତ୍ୱ ଦଳ (ସ୍ମିଥ ଓ ମହାନ୍ତି, ୨୦୦୧–୨୦୦୯) ଦ୍ୱାରା ଶିଶୁପାଳଗଡ଼ ଖନନରୁ ଆଠଟି ଭବ୍ୟ ଦ୍ୱାର ଥିବା ଚତୁରସ୍ରାକାର ଦୁର୍ଗ ଓ ପରିখা ମିଳିଛି, ଯାହା ମୌର୍ଯ୍ୟ ଓ ଖାରବେଳ ଯୁଗ ଦେଇ ୨୦୦ ଖ୍ରୀ.ଅ. ପର୍ଯ୍ୟନ୍ତ ସକ୍ରିୟ ଥିଲା।',
      bn: 'বি.বি. লাল (১৯৪৮–১৯৪৯) ও পরবর্তী প্রত্নতাত্ত্বিক দল (স্মিথ ও মোহান্তি, ২০০১–২০০৯) কর্তৃক শিশুপালগড় খননে আটটি বিশাল তোরণবিশিষ্ট বর্গাকার দুর্গ ও পরিখা পাওয়া গেছে, যা মৌর্য ও খারবেল যুগ হয়ে ২০০ খ্রি. পর্যন্ত সক্রিয় ছিল।'
    },
    dateClassificationBreakdown: {
      establishedInscriptional: {
        en: 'Pre-epigraphic horizon; written Brahmi/Prakrit inscriptions appear at the close of this transition (3rd century BCE).',
        hi: 'पूर्व-अभिलेखीय स्तर; लिखित ब्राह्मी/प्राकृत शिलालेख इस काल के अंत (तीसरी शताब्दी ई.पू.) में प्रकट होते हैं।',
        te: 'శాసన పూర్వ యుగం; క్రీ.పూ. 3వ శతాబ్దం నుండి బ్రాహ్మీ/ప్రాకృత లిఖిత శాసనాలు ప్రారంభమవుతాయి.',
        kn: 'ಶಾಸನಪೂರ್ವ ಯುಗ; ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನದಿಂದ ಬ್ರಾಹ್ಮಿ/ಪ್ರಾಕೃತ ಶಾಸನಗಳು ಆರಂಭವಾಗುತ್ತವೆ.',
        ta: 'கல்வெட்டுக்கு முந்தைய காலம்; பொ.ஊ.மு. 3-ஆம் நூற்றாண்டில் பிராமி/பிராகிருதக் கல்வெட்டுகள் தொடங்குகின்றன.',
        mr: 'शिलालेखपूर्व कालखंड; इ.स.पू. ३ ऱ्या शतकापासून ब्राह्मी/प्राकृत शिलालेख सुरू होतात.',
        or: 'ଶିଳାଲେଖ-ପୂର୍ବ ଯୁଗ; ଖ୍ରୀ.ପୂ. ୩ୟ ଶତାବ୍ଦୀରୁ ବ୍ରାହ୍ମୀ/ପ୍ରାକୃତ ଲିଖିତ ଶିଳାଲେଖ ଆରମ୍ଭ ହୁଏ।',
        bn: 'শিলালিপি-পূর্ব যুগ; খ্রি.পূ. ৩য় শতাব্দী থেকে ব্রাহ্মী/প্রাকৃত লিখিত শিলালিপি শুরু হয়।'
      },
      approximateDynastic: {
        en: 'Golabai Sasan Chalcolithic/Ostho-Iron Age (c. 2300–1000 BCE); Early Sisupalgarh, Jaugada & Asurgarh ramparts (c. 700/500 BCE – 200 CE); Megalithic South India (c. 1200–300 BCE).',
        hi: 'गोलाबाई शासन ताम्रपाषाण/लौह युग (लगभग 2300–1000 ई.पू.); प्रारंभिक शिशुपालगढ़, जौगढ़ एवं असुरगढ़ प्राचीर (लगभग 700/500 ई.पू. – 200 ई.); दक्षिण भारतीय महापाषाण संस्कृति (लगभग 1200–300 ई.पू.)।',
        te: 'గోలాబాయి శాసన్ తామ్ర-రాతి యుగం (క్రీ.పూ. 2300–1000); శిశుపాల్‌గఢ్, జౌగఢ్ & అసుర్‌గఢ్ ప్రాకారాలు (క్రీ.పూ. 700/500 – క్రీ.శ. 200); దక్షిణ భారత మెగాలిథిక్ యుగం (క్రీ.పూ. 1200–300).',
        kn: 'ಗೋಲಾಬಾಯಿ ಶಾಸನ್ ತಾಮ್ರ-ಶಿಲಾಯುಗ (ಕ್ರಿ.ಪೂ. 2300–1000); ಶಿಶುಪಾಲಗಢ, ಜೌಗಢ ಮತ್ತು ಅಸುರಗಢ (ಕ್ರಿ.ಪೂ. 700/500 – ಕ್ರಿ.ಶ. 200); ದಕ್ಷಿಣ ಭಾರತದ ಬೃಹತ್ ಶಿಲಾಯುಗ (ಕ್ರಿ.ಪೂ. 1200–300).',
        ta: 'கோலாபாய் சாசன் செம்பு-கற்காலம் (பொ.ஊ.மு. 2300–1000); சிசுபால்கர், ஜௌகடா & அசுர்கர் (பொ.ஊ.மு. 700/500 – பொ.ஊ. 200); தென்னிந்தியப் பெருங்கற்காலம் (பொ.ஊ.மு. 1200–300).',
        mr: 'गोलाबाई सासन ताम्रपाषाण काळ (इ.स.पू. २३००–१०००); शिशुपालगड, जौगड व असुरगड (इ.स.पू. ७००/५०० – इ.स. २००); दक्षिण भारतीय महापाषाण संस्कृती (इ.स.पू. १२००–३००).',
        or: 'ଗୋଲାବାଈ ଶାସନ ତାମ୍ର-ପ୍ରସ୍ତର ଯୁଗ (ଖ୍ରୀ.ପୂ. ୨୩୦୦–୧୦୦୦); ଶିଶୁପାଳଗଡ଼, ଜଉଗଡ଼ ଓ ଅସୁରଗଡ଼ (ଖ୍ରୀ.ପୂ. ୭୦୦/୫୦୦ – ୨୦୦ ଖ୍ରୀ.ଅ.); ଦକ୍ଷିଣ ଭାରତୀୟ ମହାପାଷାଣ ଯୁଗ (ଖ୍ରୀ.ପୂ. ୧୨୦୦–୩୦୦)।',
        bn: 'গোলাবাই শাসন তাম্র-প্রস্তর যুগ (খ্রি.পূ. ২৩০০–১০০০); শিশুপালগড়, জৌগড় ও অসুরগড় (খ্রি.পূ. ৭০০/৫০০ – ২০০ খ্রি.); দক্ষিণ ভারতীয় মহাপাষাণ যুগ (খ্রি.পূ. ১২০০–৩০০)।'
      },
      disputedInterpretations: {
        en: 'Exact century of initial urbanization at Sisupalgarh debated between B.B. Lal’s original estimate (c. 300 BCE) and recent C-14/geophysical surveys by Smith & Mohanty (c. 700–500 BCE).',
        hi: 'शिशुपालगढ़ के प्रारंभिक नगरीकरण की सटीक शताब्दी पर बी.बी. लाल के मूल अनुमान (लगभग 300 ई.पू.) और स्मिथ एवं मोहंती के नवीन रेडियोकार्बन सर्वेक्षण (लगभग 700–500 ई.पू.) के बीच विमर्श।',
        te: 'శిశుపాల్‌గఢ్ ప్రారంభ నగరీకరణ కాలంపై బి.బి. లాల్ అంచనా (క్రీ.పూ. 300) మరియు స్మిత్ & మొహంతి నవీన కార్బన్ డేటింగ్ (క్రీ.పూ. 700–500) మధ్య విశ్లేషణలు ఉన్నాయి.',
        kn: 'ಶಿಶುಪಾಲಗಢದ ಆರಂಭಿಕ ನಗರೀಕರಣದ ಕಾಲದ ಕುರಿತು ಬಿ.ಬಿ. ಲಾಲ್ (ಕ್ರಿ.ಪೂ. 300) ಮತ್ತು ಸ್ಮಿತ್ ಹಾಗೂ ಮೊಹಂತಿ (ಕ್ರಿ.ಪೂ. 700–500) ಸಂಶೋಧನೆಗಳ ನಡುವೆ ಚರ್ಚೆಯಿದೆ.',
        ta: 'சிசுபால்கரின் தொடக்க நகரமயமாக்கல் காலம் குறித்து பி.பி. லால் (பொ.ஊ.மு. 300) மற்றும் ஸ்மித் & மொஹந்தி (பொ.ஊ.மு. 700–500) ஆய்வுகளுக்கு இடையே விவாதம் உள்ளது.',
        mr: 'शिशुपालगडच्या प्रारंभिक नागरीकरणाच्या काळाबाबत बी.बी. लाल (इ.स.पू. ३००) आणि स्मिथ व मोहंती (इ.स.पू. ७००–५००) यांच्या संशोधनात भिन्न मते आहेत.',
        or: 'ଶିଶୁପାଳଗଡ଼ର ପ୍ରାରମ୍ଭିକ ନଗରୀକରଣ କାଳ ନେଇ ବି.ବି. ଲାଲ (ଖ୍ରୀ.ପୂ. ୩୦୦) ଓ ସ୍ମିଥ-ମହାନ୍ତି (ଖ୍ରୀ.ପୂ. ୭୦୦–୫୦୦) ଗବେଷଣା ମଧ୍ୟରେ ଆଲୋଚନା ରହିଛି।',
        bn: 'শিশুপালগড়ের প্রারମ୍ଭিক নগরায়ণ কাল নিয়ে বি.বি. লাল (খ্রি.পূ. ৩০০) ও স্মিথ-মোহান্তি (খ্রি.পূ. ৭০০–৫০০) গবেষণার মধ্যে আলোচনা রয়েছে।'
      },
      traditionalClaims: {
        en: 'Vedic/Mahajanapada literary references to Kalinga, Odra, Anga, Vanga, and Assaka (Asmaka) in the Baudhayana Dharmasutra and Anguttara Nikaya.',
        hi: 'बौधायन धर्मसूत्र और अंगुत्तर निकाय में कलिंग, ओड्र, अंग, वंग और अस्सक (अश्मक) के महाजनपदकालीन साहित्यिक संदर्भ।',
        te: 'బౌధాయన ధర్మసూత్రం మరియు అంగుత్తర నికాయలో కళింగ, ఓడ్ర, అంగ, వంగ మరియు అస్సక (అశ్మక) మహాజనపద సాహిత్య ప్రస్తావనలు.',
        kn: 'ಬೌಧಾಯನ ಧರ್ಮಸೂತ್ರ ಮತ್ತು ಅಂಗುತ್ತರ ನಿಕಾಯದಲ್ಲಿ ಕಳಿಂಗ, ಓಡ್ರ, ಅಂಗ, ವಂಗ ಮತ್ತು ಅಸ್ಸಕ (ಅಶ್ಮಕ) ಮಹಾಜನಪದಗಳ ಸಾಹಿತ್ಯಿಕ ಉಲ್ಲೇಖಗಳು.',
        ta: 'பௌதாயன தர்மசூத்திரம் மற்றும் அங்குத்தர நிகாயாவில் கலிங்கம், ஒட்டரம், அங்கம், வங்கம் மற்றும் அஸ்ஸக மகாஜனபத இலக்கியக் குறிப்புகள்.',
        mr: 'बौधायन धर्मसूत्र आणि अंगुत्तर निकाय यांत कलिंग, ओड्र, अंग, वंग आणि अश्मक या महाजनपदांचे साहित्यिक संदर्भ.',
        or: 'ବୌଧାୟନ ଧର୍ମସୂତ୍ର ଓ ଅଙ୍ଗୁତ୍ତର ନିକାୟରେ କଳିଙ୍ଗ, ଓଡ଼୍ର, ଅଙ୍ଗ, ବଙ୍ଗ ଓ ଅଶ୍ମକ ମହାଜନପଦର ସାହିତ୍ୟିକ ଉଲ୍ଲେଖ।',
        bn: 'বৌধায়ন ধর্মসূত্র ও অঙ্গুত্তর নিকায়ে কলিঙ্গ, ওড্র, অঙ্গ, বঙ্গ ও অশ্মক মহাজনপদের সাহিত্যিক উল্লেখ।'
      }
    },
    parallelTracks: [
      {
        corridorId: 'track_s2_kalinga',
        corridorLabel: {
          en: 'Kalinga–Utkala–Kosala Corridor',
          hi: 'कलिंग–उत्कल–कोसल गलियारा',
          te: 'కళింగ–ఉత్కళ–కోసల ప్రాంతం',
          kn: 'ಕಳಿಂಗ–ಉತ್ಕಲ–ಕೋಸಲ ವಲಯ',
          ta: 'கலிங்க–உத்கல–கோசல மண்டலம்',
          mr: 'कलिंग–उत्कल–कोसल पट्टा',
          or: 'କଳିଙ୍ଗ–ଉତ୍କଳ–କୋଶଳ ଅଞ୍ଚଳ',
          bn: 'কলিঙ্গ–উৎকল–কোশল অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Golabai Sasan Chalcolithic (c. 2300–1000 BCE) → Early Fortified Cities of Sisupalgarh, Jaugada & Asurgarh (c. 700/500 BCE – 200 CE)',
          hi: 'गोलाबाई शासन ताम्रपाषाण (लगभग 2300–1000 ई.पू.) → शिशुपालगढ़, जौगढ़ एवं असुरगढ़ के प्रारंभिक दुर्ग नगर (लगभग 700/500 ई.पू. – 200 ई.)',
          te: 'గోలాబాయి శాసన్ తామ్ర-రాతి యుగం (క్రీ.పూ. 2300–1000) → శిశుపాల్‌గఢ్, జౌగఢ్ & అసుర్‌గఢ్ ప్రారంభ కోట నగరాలు (క్రీ.పూ. 700/500 – క్రీ.శ. 200)',
          kn: 'ಗೋಲಾಬಾಯಿ ಶಾಸನ್ (ಕ್ರಿ.ಪೂ. 2300–1000) → ಶಿಶುಪಾಲಗಢ, ಜೌಗಢ ಮತ್ತು ಅಸುರಗಢದ ಆರಂಭಿಕ ಕೋಟೆ ನಗರಗಳು (ಕ್ರಿ.ಪೂ. 700/500 – ಕ್ರಿ.ಶ. 200)',
          ta: 'கோலாபாய் சாசன் (பொ.ஊ.மு. 2300–1000) → சிசுபால்கர், ஜௌகடா & அசுர்கர் கோட்டை நகரங்கள் (பொ.ஊ.மு. 700/500 – பொ.ஊ. 200)',
          mr: 'गोलाबाई सासन (इ.स.पू. २३००–१०००) → शिशुपालगड, जौगड आणि असुरगड दुर्ग शहरे (इ.स.पू. ७००/५०० – इ.स. २००)',
          or: 'ଗୋଲାବାଈ ଶାସନ (ଖ୍ରୀ.ପୂ. ୨୩୦୦–୧୦୦୦) → ଶିଶୁପାଳଗଡ଼, ଜଉଗଡ଼ ଓ ଅସୁରଗଡ଼ ଦୁର୍ଗ ନଗରୀ (ଖ୍ରୀ.ପୂ. ୭୦୦/୫୦୦ – ୨୦୦ ଖ୍ରୀ.ଅ.)',
          bn: 'গোলাবাই শাসন (খ্রি.পূ. ২৩০০–১০০০) → শিশুপালগড়, জৌগড় ও অসুরগড় দুর্গ নগরী (খ্রি.পূ. ৭০০/৫০০ – ২০০ খ্রি.)'
        },
        dateSpan: 'c. 2300 – 400 BCE (Continuing to c. 200 CE)',
        dateType: 'Approximate Reign',
        epigraphicAnchor: 'ASI Excavations (B.B. Lal, Ancient India No. 5, 1949; B.K. Sinha 2000)'
      },
      {
        corridorId: 'track_s2_deccan_south',
        corridorLabel: {
          en: 'Deccan, Andhra & Tamilakam Corridor',
          hi: 'दक्कन, आंध्र एवं तमिलकम गलियारा',
          te: 'దక్కన్, ఆంధ్ర & తమిళకం ప్రాంతం',
          kn: 'ದಕ್ಕನ್, ಆಂಧ್ರ ಮತ್ತು ತಮಿಳகம் ವಲಯ',
          ta: 'தக்காணம், ஆந்திரா & தமிழகம் மண்டலம்',
          mr: 'दख्खन, आंध्र आणि तमिळकम पट्टा',
          or: 'ଦక్కନ, ଆନ୍ଧ୍ର ଓ ତାମିলକମ ଅଞ୍ଚଳ',
          bn: 'দাক্ষিণাত্য, অন্ধ্র ও তামিলকম অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Southern Neolithic-Chalcolithic & Iron Age Megalithic Builders; Early Urban Ports at Dhanyakataka (Amaravati), Korkai, Kodumanal & Keezhadi',
          hi: 'दक्षिणी नवपाषाण-ताम्रपाषाण एवं लौह युगीन महापाषाण निर्माता; धान्यकटक (अमरावती), कोरकाई, कोडुमनाल एवं कीझाडी के प्रारंभिक नगर',
          te: 'దక్షిణ భారత మెగాలిథిక్ నిర్మాతలు; ధాన్యకటకం (అమరావతి), కొర్కై, కొడుమనల్ & కీళడి ప్రారంభ నగర కేంద్రాలు',
          kn: 'ದಕ್ಷಿಣ ಭಾರತದ ಬೃಹತ್ ಶಿಲಾಯುಗದ ನಿರ್ಮಾಪಕರು; ಧಾನ್ಯಕಟಕ (ಅಮರಾವತಿ), ಕೊರ್ಕೈ, ಕೊಡುಮನಲ್ ಮತ್ತು ಕೀಳಡಿಯ ಆರಂಭಿಕ ನಗರ ಕೇಂದ್ರಗಳು',
          ta: 'தென்னிந்தியப் பெருங்கற்காலப் பண்பாடு; தான்யகடகம் (அமரಾವತಿ), கொற்கை, கொடுமணல் மற்றும் கீழடி தொடக்க நகர மையங்கள்',
          mr: 'दक्षिण भारतीय महापाषाण संस्कृती; धान्यकटक (अमरावती), कोरकाई, कोडुमनाल आणि कीझाडी येथील प्रारंभिक शहरे',
          or: 'ଦକ୍ଷିଣ ଭାରତୀୟ ମହାପାଷାଣ ସଂସ୍କୃତି; ଧାନ୍ୟକଟକ (ଅମରାବତୀ), କୋର୍କାଇ, କୋଡୁমନାଲ ଓ କୀഴାଡି ପ୍ରାରମ୍ଭିକ ନଗର',
          bn: 'দক্ষিণ ভারতীয় মহাপাষাণ সংস্কৃতি; ধান্যকটক (অমরাবতী), কোরকাই, কোডুমনাল ও কীঝাডি প্রারମ୍ଭিক নগর'
        },
        dateSpan: 'c. 1200 – 400 BCE',
        dateType: 'Approximate Reign',
        epigraphicAnchor: 'ASI & Tamil Nadu State Dept. of Archaeology Stratigraphic Reports'
      }
    ],
    keyMonumentsAndInscriptions: ['Sisupalgarh Excavations (ASI 1948–49)', 'Golabai Sasan Chalcolithic Site', 'Jaugada Earthen Ramparts', 'Asurgarh Fortified Settlement'],
    linkedArticleIds: ['art_odra_desha_history', 'art_ht_chronological_methodology'],
    linkedEventIds: []
  },
  {
    stageOrder: 3,
    id: 'stage_03_early_historical',
    refNumber: 'HT-0004',
    stageCode: 'EARLY_HISTORICAL_PERIOD',
    title: {
      en: 'Stage 3: Early Historical Period — Kalinga War (261 BCE), Emperor Kharavela, Sangam Cholas & Satavahanas (c. 400 BCE – 250 CE)',
      hi: 'चरण 3: प्रारंभिक ऐतिहासिक काल — कलिंग युद्ध (261 ई.पू.), सम्राट खारवेल, संगम चोल एवं सातवाहन (लगभग 400 ई.पू. – 250 ई.)',
      te: 'దశ 3: ప్రారంభ చారిత్రక కాలం — కళింగ యుద్ధం (క్రీ.పూ. 261), చక్రవర్తి ఖారవేలుడు, సంగమ చోళులు & శాతవాహనులు (క్రీ.పూ. 400 – క్రీ.శ. 250)',
      kn: 'ಹಂತ 3: ಆರಂಭಿಕ ಐತಿಹಾಸಿಕ ಕಾಲ — ಕಳಿಂಗ ಯುದ್ಧ (ಕ್ರಿ.ಪೂ. 261), ಸಾಮ್ರಾಟ್ ಖಾರವೇಲ, ಸಂಗಮ್ ಚೋಳರು ಮತ್ತು ಶಾತವಾಹನರು (ಕ್ರಿ.ಪೂ. 400 – ಕ್ರಿ.ಶ. 250)',
      ta: 'நிலை 3: தொடக்க வரலாற்றுக் காலம் — கலிங்கப் போர் (பொ.ஊ.மு. 261), பேரரசர் காரவேலர், சங்க காலச் சோழர்கள் & சாதவாகனர்கள் (பொ.ஊ.மு. 400 – பொ.ஊ. 250)',
      mr: 'टप्पा 3: प्रारंभिक ऐतिहासिक काळ — कलिंग युद्ध (इ.स.पू. २६१), सम्राट खारवेल, संगम चोल आणि सातवाहन (इ.स.पू. ४०० – इ.स. २५०)',
      or: 'ପର୍ଯ୍ୟାୟ ୩: ପ୍ରାରମ୍ଭିକ ଐତିହାସିକ କାଳ — କଳିଙ୍ଗ ଯୁଦ୍ଧ (ଖ୍ରୀ.ପୂ. ୨୬୧), ସମ୍ରାଟ ଖାରବେଳ, ସଙ୍ଗମ ଚୋଳ ଓ ଶାତବାହନ (ଖ୍ରୀ.ପୂ. ୪୦୦ – ୨୫୦ ଖ୍ରୀ.ଅ.)',
      bn: 'পর্যায় ৩: প্রারମ୍ଭিক ঐতিহাসিক কাল — কলিঙ্গ যুদ্ধ (খ্রি.পূ. ২৬১), সম্রাট খারবেল, সঙ্গম চোল ও সাতবাহন (খ্রি.পূ. ৪০০ – ২৫০ খ্রি.)'
    },
    approxDateLabel: {
      en: 'c. 400 BCE – 250 CE (Established Anchor: 261 BCE Kalinga War | Disputed: Kharavela c. 170–40 BCE | Approximate: Sangam Cholas c. 300 BCE–200 CE & Satavahanas c. 100 BCE–225 CE)',
      hi: 'लगभग 400 ई.पू. – 250 ई. (स्थापित तिथि: 261 ई.पू. कलिंग युद्ध | विवादित: खारवेल लगभग 170–40 ई.पू. | अनुमानित: संगम चोल 300 ई.पू.–200 ई. एवं सातवाहन)',
      te: 'క్రీ.పూ. 400 – క్రీ.శ. 250 (నిర్ధారిత తేదీ: క్రీ.పూ. 261 కళింగ యుద్ధం | చర్చనీయాంశం: ఖారవేలుడు క్రీ.పూ. 170–40 | సుమారు: సంగమ చోళులు క్రీ.పూ. 300–క్రీ.శ. 200 & శాతవాహనులు)',
      kn: 'ಕ್ರಿ.ಪೂ. 400 – ಕ್ರಿ.ಶ. 250 (ದೃಢೀಕೃತ: ಕ್ರಿ.ಪೂ. 261 ಕಳಿಂಗ ಯುದ್ಧ | ಚರ್ಚಿತ: ಖಾರವೇಲ ಕ್ರಿ.ಪೂ. 170–40 | ಅಂದಾಜು: ಸಂಗಮ್ ಚೋಳರು ಕ್ರಿ.ಪೂ. 300–ಕ್ರಿ.ಶ. 200 ಮತ್ತು ಶಾತವಾಹನರು)',
      ta: 'பொ.ஊ.மு. 400 – பொ.ஊ. 250 (உறுதிப்படுத்தப்பட்டது: பொ.ஊ.மு. 261 கலிங்கப் போர் | விவாதத்திற்குரியது: காரவேலர் பொ.ஊ.மு. 170–40 | தோராயமானது: சங்க காலச் சோழர்கள் பொ.ஊ.மு. 300–பொ.ஊ. 200 & சாதவாகனர்கள்)',
      mr: 'इ.स.पू. ४०० – इ.स. २५० (स्थापित: इ.स.पू. २६१ कलिंग युद्ध | मतभेद: खारवेल इ.स.पू. १७०–४० | अंदाजे: संगम चोल इ.स.पू. ३००–इ.स. २०० व सातवाहन)',
      or: 'ଖ୍ରୀ.ପୂ. ୪୦୦ – ୨୫୦ ଖ୍ରୀ.ଅ. (ପ୍ରମାଣିତ: ଖ୍ରୀ.ପୂ. ୨୬୧ କଳିଙ୍ଗ ଯୁଦ୍ଧ | ଆଲୋଚିତ: ଖାରବେଳ ଖ୍ରୀ.ପୂ. ୧୭୦–୪୦ | ଆନୁମାନିକ: ସଙ୍ଗମ ଚୋଳ ଖ୍ରୀ.ପୂ. ୩୦୦–୨୦୦ ଖ୍ରୀ.ଅ. ଓ ଶାତବାହନ)',
      bn: 'খ্রি.পূ. ৪০০ – ২৫০ খ্রি. (প্রতিষ্ঠিত: খ্রি.পূ. ২৬১ কলিঙ্গ যুদ্ধ | আলোচিত: খারবেল খ্রি.পূ. ১৭০–৪০ | আনুমানিক: সঙ্গম চোল খ্রি.পূ. ৩০০–২০০ খ্রি. ও সাতবাহন)'
    },
    chronologicalUncertaintyNote: {
      en: '261 BCE (8th regnal year of Ashoka) is firmly synchronized with Hellenistic kings in Major Rock Edict XIII. Kharavela’s Hathigumpha Inscription is universally accepted as a primary 1st/2nd century BCE Prakrit document, though his exact accession decade is debated by epigraphists between c. 170 BCE (K.P. Jayaswal & R.D. Banerji) and c. 40–25 BCE (D.C. Sircar). Simultaneously, the Early Cholas of the Sangam Age (attested in Ashokan Edicts II & XIII) and the Satavahanas ruled in parallel.',
      hi: '261 ई.पू. (अशोक का 8वां शासन वर्ष) शिलालेख XIII में यवन शासकों के साथ समकालिकता द्वारा सुनिश्चित है। सम्राट खारवेल के सटीक राज्याभिषेक दशक पर के.पी. जायसवाल (लगभग 170 ई.पू.) और डी.सी. सरकार (लगभग 40–25 ई.पू.) के बीच विमर्श है। इसी कालखंड में संगम कालीन प्रारंभिक चोल (अशोक के शिलालेख II व XIII में उल्लिखित) और सातवाहन समानांतर रूप से शासन कर रहे थे।',
      te: 'క్రీ.పూ. 261 (అశోకుని 8వ రాజ్య సంవత్సరం) 13వ శిలాశాసనంలో గ్రీకు రాజుల సమకాలీనతతో నిర్ధారించబడింది. ఖారవేలుని పట్టాభిషేక కాలంపై కె.పి. జయస్వాల్ (క్రీ.పూ. 170) మరియు డి.సి. సర్కార్ (క్రీ.పూ. 40–25) మధ్య భిన్నాభిప్రాయాలు ఉన్నాయి. ఇదే కాలంలో సంగమ యుగ చోళులు (అశోకుని 2, 13 శాసనాలలో పేర్కొన్న చోడులు) మరియు శాతవాహనులు సమాంతరంగా పాలించారు.',
      kn: 'ಕ್ರಿ.ಪೂ. 261 (ಅಶೋಕನ 8ನೇ ಆಳ್ವಿಕೆಯ ವರ್ಷ) 13ನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನದಿಂದ ದೃಢಪಟ್ಟಿದೆ. ಸಾಮ್ರಾಟ್ ಖಾರವೇಲನ ನಿಖರ ಆಳ್ವಿಕೆಯ ಕಾಲವನ್ನು ಕೆ.ಪಿ. ಜಯಸ್ವಾಲ್ (ಕ್ರಿ.ಪೂ. 170) ಮತ್ತು ಡಿ.ಸಿ. ಸರ್ಕಾರ್ (ಕ್ರಿ.ಪೂ. 40–25) ನಡುವೆ ಚರ್ಚಿಸಲಾಗುತ್ತದೆ. ಇದೇ ಕಾಲದಲ್ಲಿ ಸಂಗಮ್ ಯುಗದ ಚೋಳರು ಮತ್ತು ಶಾತವಾಹನರು ಸಮಾನಾಂತರವಾಗಿ ಆಳ್ವಿಕೆ ನಡೆಸಿದರು.',
      ta: 'பொ.ஊ.மு. 261 (அசோகரின் 8-ஆம் ஆட்சியாண்டு) 13-ஆம் பாறைக் கல்வெட்டின் மூலம் உறுதிப்படுத்தப்பட்டுள்ளது. காரவேலரின் ஆட்சிக் காலம் பொ.ஊ.மு. 170 (ஜெயஸ்வால்) முதல் பொ.ஊ.மு. 40–25 (டி.சி. சர்க்கார்) வரை விவாதிக்கப்படுகிறது. இதே காலத்தில் சங்க காலச் சோழர்களும் சாதவாகனர்களும் இணையாக ஆட்சி செய்தனர்.',
      mr: 'इ.स.पू. २६१ (अशोकाचे ८ वे राज्यवर्ष) शिलालेख १३ द्वारे निश्चित आहे. सम्राट खारवेल यांचा कार्यकाळ के.पी. जायसवाल (इ.स.पू. १७०) आणि डी.सी. सरकार (इ.स.पू. ४०–२५) यांच्यात चर्चिला जातो. याच काळात संगम चोल आणि सातवाहन समांतरपणे राज्य करत होते.',
      or: 'ଖ୍ରୀ.ପୂ. ୨୬୧ (ଅଶୋକଙ୍କ ୮ମ ଶାସନ ବର୍ଷ) ତ୍ରୟୋଦଶ ଶିଳାଲେଖ ଦ୍ୱାରା ସୁନିଶ୍ଚିତ। ସମ୍ରାଟ ଖାରବେଳଙ୍କ ଶାସନ କାଳ କେ.ପି. ଜୟସ୍ୱାଲ (ଖ୍ରୀ.ପୂ. ୧୭୦) ଓ ଡି.ସି. ସରକାର (ଖ୍ରୀ.ପୂ. ୪୦–୨୫) ଙ୍କ ମଧ୍ୟରେ ଆଲୋଚିତ। ଏହି ସମୟରେ ସଙ୍ଗମ ଚୋଳ ଓ ଶାତବାହନ ସମାନ୍ତରାଳ ଭାବେ ଶାସନ କରୁଥିଲେ।',
      bn: 'খ্রি.পূ. ২৬১ (অশোকের ৮ম রাজ্যবর্ষ) ত্রয়োদশ শিলালিপি দ্বারা সুনিশ্চিত। সম্রাট খারবেলের শাসনকাল কে.পি. জয়সওয়াল (খ্রি.পূ. ১৭০) ও ডি.সি. সরকার (খ্রি.পূ. ৪০–২৫)-এর মধ্যে আলোচিত। একই সময়ে সঙ্গম চোল ও সাতবাহনরা সমান্তরালভাবে শাসন করছিলেন।'
    },
    epistemicLabel: {
      en: 'Verified Primary Lithic Epigraphy (Brahmi / Prakrit) & Parallel Early Polities',
      hi: 'सत्यापित प्राथमिक शिलालेख साक्ष्य (ब्राह्मी / प्राकृत) एवं समानांतर प्रारंभिक राज्य',
      te: 'ధృవీకరించబడిన ప్రాథమిక శిలాశాసన ఆధారాలు (బ్రాహ్మీ / ప్రాకృతం) & సమాంతర రాజ్యాలు',
      kn: 'ದೃಢೀಕೃತ ಪ್ರಾಥಮಿಕ ಶಿಲಾಶಾಸನ ಸಾಕ್ಷ್ಯ (ಬ್ರಾಹ್ಮಿ / ಪ್ರಾಕೃತ) ಮತ್ತು ಸಮಾನಾಂತರ ರಾಜ್ಯಗಳು',
      ta: 'உறுதிப்படுத்தப்பட்ட முதன்மைக் கல்வெட்டுச் சான்று (பிராமி / பிராகிருதம்) & இணை அரசுகள்',
      mr: 'सत्यापित प्राथमिक शिलालेख पुरावा (ब्राह्मी / प्राकृत) आणि समांतर राज्ये',
      or: 'ପ୍ରମାଣିତ ମୌଳିକ ଶିଳାଲେଖ ସାକ୍ଷ୍ୟ (ବ୍ରାହ୍ମୀ / ପ୍ରାକୃତ) ଓ ସମାନ୍ତରାଳ ରାଜ୍ୟ',
      bn: 'প্রমাণিত প্রাথমিক শিলালিপি সাক্ষ্য (ব্রাহ্মী / প্রাকৃত) ও সমান্তরাল রাজ্যসমূহ'
    },
    epistemicTier: 'early_epigraphic',
    symbolicIllustration: ARCHIVE_IMG('emperor_kharavela_udayagiri.jpg'),
    illustrationCaption: {
      en: 'Udayagiri-Khandagiri twin hills and the Hathigumpha 17-line Prakrit inscription of Mahameghavahana Emperor Kharavela.',
      hi: 'उदयगिरि-खंडगिरि पहाड़ियां और महामेघवाहन सम्राट खारवेल का 17-पंक्तियों वाला हाथीगुम्फा प्राकृत शिलालेख।',
      te: 'ఉదయగిరి-ఖండగిరి కొండలు మరియు మహామేఘవాహన చక్రవర్తి ఖారవేలుని 17-వరుసల హాథీగుంఫా ప్రాకృత శాసనం.',
      kn: 'ಉದಯಗಿರಿ-ಖಂಡಗಿರಿ ಬೆಟ್ಟಗಳು ಮತ್ತು ಮಹಾಮೇಘವಾಹನ ಸಾಮ್ರಾಟ್ ಖಾರವೇಲನ 17 ಸಾಲುಗಳ ಹಾಥಿಗುಂಫಾ ಪ್ರಾಕೃತ ಶಾಸನ.',
      ta: 'உதயகிரி-கண்டகிரி மலைகள் மற்றும் மகாமேகவாகனப் பேரரசர் காரவேலரின் 17 வரி ஹாதிகும்பா பிராகிருதக் கல்வெட்டு.',
      mr: 'उदयगिरी-खंडगिरी टेकड्या आणि महामेघवाहन सम्राट खारवेल यांचा १७ ओळींचा हाथीगुम्फा प्राकृत शिलालेख.',
      or: 'ଉଦୟଗିରି-ଖଣ୍ଡଗିରି ପାହାଡ଼ ଓ ମହାମେଘବାହନ ସମ୍ରାଟ ଖାରବେଳଙ୍କ ୧୭-ଧାଡ଼ି ବିଶିଷ୍ଟ ହାତୀଗୁମ୍ଫା ପ୍ରାକୃତ ଶିଳାଲେଖ।',
      bn: 'উদয়গিরি-খণ্ডগিরি পাহাড় ও মহামেঘবাহন সম্রাট খারবেলের ১৭-পঙক্তির হাতীগুম্ফা প্রাকৃত শিলালিপি।'
    },
    visualTypeBadge: {
      en: 'Primary Rock-Cut Monument & Epigraphic Site',
      hi: 'प्राथमिक शैलकृत स्मारक एवं अभिलेख स्थल',
      te: 'ప్రాథమిక రాతి స్మారకం & శాసన ప్రదేశం',
      kn: 'ಪ್ರಾಥಮಿಕ ಬಂಡೆ-ಕೊರೆದ ಸ್ಮಾರಕ ಮತ್ತು ಶಾಸನ ತಾಣ',
      ta: 'முதன்மைக் குடைவரை நினைவுச்சின்னம் & கல்வெட்டுத் தளம்',
      mr: 'प्राथमिक लेणी स्मारक आणि शिलालेख स्थळ',
      or: 'ମୌଳିକ ଶୈଳକୃତ ସ୍ମାରକୀ ଓ ଶିଳାଲେଖ ସ୍ଥଳ',
      bn: 'প্রাথমিক শৈলকৃত স্মৃতিস্তম্ভ ও শিলালিপি স্থান'
    },
    conciseOverview: {
      en: 'Marks the transition into written lithic history across three simultaneous regional tracks: Ashoka’s Dhauli/Jaugada Edicts (261 BCE) and Emperor Kharavela’s Hathigumpha Inscription in Kalinga-Odra; the Satavahana Empire in the Deccan-Andhra corridor; and the Early Cholas of the Sangam Age in the Kaveri basin.',
      hi: 'तीन समानांतर क्षेत्रीय धाराओं में लिखित शिलालेखीय इतिहास का आरंभ: कलिंग-ओड्र में अशोक के धौली/जौगढ़ शिलालेख (261 ई.पू.) एवं सम्राट खारवेल का हाथीगुम्फा अभिलेख; दक्कन-आंध्र में सातवाहन साम्राज्य; तथा कावेरी घाटी में संगम कालीन प्रारंभिक चोल।',
      te: 'మూడు సమాంతర ప్రాంతీయ మార్గాలలో లిఖిత శాసన చరిత్ర ప్రారంభం: కళింగ-ఓడ్రలో అశోకుని ధౌలి/జౌగఢ్ శాసనాలు (క్రీ.పూ. 261) మరియు ఖారవేలుని హాథీగుంఫా శాసనం; దక్కన్-ఆంధ్రలో శాతవాహన సామ్రాజ్యం; కావేరీ లోయలో సంగమ యుగ చోళులు.',
      kn: 'ಮೂರು ಸಮಾನಾಂತರ ಪ್ರಾದೇಶಿಕ ವಲಯಗಳಲ್ಲಿ ಲಿಖಿತ ಶಾಸನ ಇತಿಹಾಸದ ಆರಂಭ: ಕಳಿಂಗ-ಓಡ್ರದಲ್ಲಿ ಅಶೋಕನ ಧೌಲಿ/ಜೌಗಢ ಶಾಸನಗಳು (ಕ್ರಿ.ಪೂ. 261) ಮತ್ತು ಖಾರವೇಲನ ಹಾಥಿಗುಂಫಾ ಶಾಸನ; ದಕ್ಕನ್-ಆಂಧ್ರದಲ್ಲಿ ಶಾತವಾಹನರು; ಕಾವೇರಿ ಕಣಿವೆಯಲ್ಲಿ ಸಂಗಮ್ ಚೋಳರು.',
      ta: 'மூன்று இணையான மண்டலங்களில் எழுதப்பட்ட கல்வெட்டு வரலாறு: கலிங்க-ஒட்டரத்தில் அசோகரின் தௌலி/ஜௌகடா கல்வெட்டுகள் (பொ.ஊ.மு. 261) & காரவேலரின் ஹாதிகும்பா கல்வெட்டு; தக்காண-ஆந்திராவில் சாதவாகனர்கள்; காவிரிப் படுகையில் சங்க காலச் சோழர்கள்.',
      mr: 'तीन समांतर प्रादेशिक पट्ट्यांत लिखित इतिहासाची सुरुवात: कलिंग-ओड्रमध्ये अशोकाचे धौली/जौगड शिलालेख (इ.स.पू. २६१) व खारवेलांचा हाथीगुम्फा शिलालेख; दख्खन-आंध्रात सातवाहन; आणि कावेरी खोऱ्यात संगम चोल.',
      or: 'ତିনୋଟି ସମାନ୍ତରାଳ ଆଞ୍ଚଳିକ ଧାରାରେ ଲିଖିତ ଇତିହାସର ଆରମ୍ଭ: କଳିଙ୍ଗ-ଓଡ଼୍ରରେ ଅଶୋକଙ୍କ ଧଉଳି/ଜଉଗଡ଼ ଶିଳାଲେଖ (ଖ୍ରୀ.ପୂ. ୨୬୧) ଓ ଖାରବେଳଙ୍କ ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖ; ଦక్కନ-ଆନ୍ଧ୍ରରେ ଶାତବାହନ; ଏବଂ କାବେରୀ ଉପତ୍ୟକାରେ ସଙ୍ଗମ ଚୋଳ।',
      bn: 'তিনটি সমান্তরাল আঞ্চলিক ধারায় লিখিত ইতিহাসের সূচনা: কলিঙ্গ-ওড্রে অশোকের ধৌলি/জৌগড় শিলালিপি (খ্রি.পূ. ২৬১) ও খারবেলের হাতীগুম্ফা শিলালিপি; দাক্ষিণাত্য-অন্ধ্রে সাতবাহন; এবং কাবেরী উপত্যকায় সঙ্গম চোল।'
    },
    detailedAnalysis: {
      en: 'The Hathigumpha inscription (Epigraphia Indica, Vol. XX) provides a 13-year regnal chronicle of Kharavela—documenting his repair of Kalinganagari’s ramparts, extension of the Nanda-era canal from Tanusuliya, and campaigns against Satakarni I in the west, the Rathikas and Bhojakas in the Deccan, Magadha in the north, and the Pandya confederacy in the south—confirming the simultaneous coexistence of the Mahameghavahanas, Satavahanas, and Tamil Sangam kingdoms.',
      hi: 'हाथीगुम्फा शिलालेख (Epigraphia Indica, खंड XX) सम्राट खारवेल के प्रथम 13 शासन वर्षों का क्रमिक विवरण देता है—जिसमें कलिंगनगरी की प्राचीरों की मरम्मत, नंद-कालीन नहर का विस्तार, पश्चिम में सातकर्णि प्रथम, दक्कन में रठिकों व भोजकों, उत्तर में मगध और दक्षिण में पांड्यों के विरुद्ध अभियानों का उल्लेख है, जो महामेघवाहन, सातवाहन और संगम राज्यों की समकालिकता सिद्ध करता है।',
      te: 'హాథీగుంఫా శాసనం (Epigraphia Indica, Vol. XX) ఖారవేలుని మొదటి 13 పాలనా సంవత్సరాల వివరాలను అందిస్తుంది—కళింగనగరి కోట మరమ్మతులు, నంద రాజుల కాలం నాటి కాలువ విస్తరణ, పశ్చిమాన శాతకర్ణి I, దక్కన్‌లో రఠికులు-భోజకులు, ఉత్తరాన మగధ మరియు దక్షిణాన పాండ్యులపై యాత్రలు ఇందులో నమోదై మహామేఘవాహనులు, శాతవాహనులు, సంగమ రాజ్యాల సమకాలీనతను నిర్ధారిస్తాయి.',
      kn: 'ಹಾಥಿಗುಂಫಾ ಶಾಸನವು (Epigraphia Indica, Vol. XX) ಖಾರವೇಲನ ಮೊದಲ 13 ಆಳ್ವಿಕೆಯ ವರ್ಷಗಳ ವಿವರಗಳನ್ನು ನೀಡುತ್ತದೆ—ಕಳಿಂಗನಗರಿಯ ಕೋಟೆ ದುರಸ್ತಿ, ನಂದರ ಕಾಲದ ಕಾಲುವೆ ವಿಸ್ತರಣೆ, ಪಶ್ಚಿಮದಲ್ಲಿ ಶಾತಕರ್ಣಿ, ಉತ್ತರದಲ್ಲಿ ಮಗಧ ಮತ್ತು ದಕ್ಷಿಣದಲ್ಲಿ ಪಾಂಡ್ಯರ ವಿರುದ್ಧದ ಅಭಿಯಾನಗಳು ಮಹಾಮೇಘವಾಹನ, ಶಾತವಾಹನ ಮತ್ತು ಸಂಗಮ್ ರಾಜ್ಯಗಳ ಸಮಕಾಲೀನತೆಯನ್ನು ದೃಢಪಡಿಸುತ್ತವೆ.',
      ta: 'ஹாதிகும்பா கல்வெட்டு (Epigraphia Indica, Vol. XX) காரவேலரின் முதல் 13 ஆட்சியாண்டுகளின் நிகழ்வுகளை விவரிக்கிறது—கலிங்கநகரிக் கோட்டை சீரமைப்பு, நந்தர் காலக் கால்வாய் விரிவாக்கம், மேற்கில் முதலாம் சதகர்ணி, வடக்கில் மகதம் மற்றும் தெற்கில் பாண்டியர்களுக்கு எதிரான படையெடுப்புகள் மூலம் மகாமேகவாகனர், சாதவாகனர் மற்றும் சங்க கால அரசுகளின் சமகாலத் தன்மையை உறுதிப்படுத்துகிறது.',
      mr: 'हाथीगुम्फा शिलालेख (Epigraphia Indica, Vol. XX) खारवेलांच्या पहिल्या १३ राज्यवर्षांचा तपशील देतो—कलिंगनगरीच्या तटबंदीची दुरुस्ती, नंदकालीन कालव्याचा विस्तार, पश्चिमेकडे सातकर्णी, उत्तरेकडे मगध आणि दक्षिणेकडे पांड्यांविरुद्धच्या मोहिमा महामेघवाहन, सातवाहन आणि संगम राज्यांची समकालीनता सिद्ध करतात.',
      or: 'ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖ (Epigraphia Indica, Vol. XX) ଖାରବେଳଙ୍କ ପ୍ରଥମ ୧୩ ଶାସନ ବର୍ଷର ବିବରଣୀ ପ୍ରଦାନ କରେ—କଳିଙ୍ଗନଗରୀ ଦୁର୍ଗ ମରାମତି, ନନ୍ଦ-କାଳୀନ କେନାଲ ସମ୍ପ୍ରସାରଣ, ପଶ୍ଚିମରେ ପ୍ରଥମ ଶାତକର୍ଣ୍ଣି, ଉତ୍ତରରେ ମଗଧ ଓ ଦକ୍ଷିଣରେ ପାଣ୍ଡ୍ୟଙ୍କ ବିରୁଦ୍ଧରେ ଅଭିଯାନ ମହାମେଘବାହନ, ଶାତବାହନ ଓ ସଙ୍ଗମ ରାଜ୍ୟମାନଙ୍କର ସମକାଳୀନତା ପ୍ରମାଣ କରେ।',
      bn: 'হাতীগুম্ফা শিলালিপি (Epigraphia Indica, Vol. XX) খারবেলের প্রথম ১৩টি রাজ্যবর্ষের বিবরণ দেয়—কলিঙ্গনগরী দুর্গের সংস্কার, নন্দ-যুগীয় খালের সম্প্রসারণ, পশ্চিমে প্রথম সাতকর্ণী, উত্তরে মগধ ও দক্ষিণে পাণ্ড্যদের বিরুদ্ধে অভিযান মহামেঘবাহন, সাতবাহন ও সঙ্গম রাজ্যগুলোর সমসাময়িকতা প্রমাণ করে।'
    },
    dateClassificationBreakdown: {
      establishedInscriptional: {
        en: '261 BCE: Kalinga War (Ashoka’s 8th regnal year, Major Rock Edict XIII; Separate Kalinga Edicts I & II at Dhauli and Jaugada).',
        hi: '261 ई.पू.: कलिंग युद्ध (अशोक का 8वां शासन वर्ष, शिलालेख XIII; धौली एवं जौगढ़ के पृथक कलिंग शिलालेख)।',
        te: 'క్రీ.పూ. 261: కళింగ యుద్ధం (అశోకుని 8వ రాజ్య సంవత్సరం, 13వ శిలాశాసనం; ధౌలి మరియు జౌగఢ్ ప్రత్యేక కళింగ శాసనాలు).',
        kn: 'ಕ್ರಿ.ಪೂ. 261: ಕಳಿಂಗ ಯುದ್ಧ (ಅಶೋಕನ 8ನೇ ಆಳ್ವಿಕೆಯ ವರ್ಷ, 13ನೇ ಶಿಲಾಶಾಸನ; ಧೌಲಿ ಮತ್ತು ಜೌಗಢದ ವಿಶೇಷ ಶಾಸನಗಳು).',
        ta: 'பொ.ஊ.மு. 261: கலிங்கப் போர் (அசோகரின் 8-ஆம் ஆட்சியாண்டு, 13-ஆம் பாறைக் கல்வெட்டு; தௌலி & ஜௌகடா கலிங்கக் கல்வெட்டுகள்).',
        mr: 'इ.स.पू. २६१: कलिंग युद्ध (अशोकाचे ८ वे राज्यवर्ष, शिलालेख १३; धौली व जौगड येथील विशेष कलिंग शिलालेख).',
        or: 'ଖ୍ରୀ.ପୂ. ୨୬୧: କଳିଙ୍ଗ ଯୁଦ୍ଧ (ଅଶୋକଙ୍କ ୮ମ ଶାସନ ବର୍ଷ, ତ୍ରୟୋଦଶ ଶିଳାଲେଖ; ଧଉଳି ଓ ଜଉଗଡ଼ ସ୍ୱତନ୍ତ୍ର କଳିଙ୍ଗ ଶିଳାଲେଖ)।',
        bn: 'খ্রি.পূ. ২৬১: কলিঙ্গ যুদ্ধ (অশোকের ৮ম রাজ্যবর্ষ, ত্রয়োদশ শিলালিপি; ধৌলি ও জৌগড় বিশেষ কলিঙ্গ শিলালিপি)।'
      },
      approximateDynastic: {
        en: 'Early Cholas of the Sangam Age (c. 300 BCE – 200 CE, Uraiyur & Kaveripattinam); Satavahana Dynasty (c. 1st century BCE – c. 225 CE; Gautamiputra Satakarni c. 106–130 CE).',
        hi: 'संगम युगीन प्रारंभिक चोल (लगभग 300 ई.पू. – 200 ई., उरैयूर एवं कावेरीपट्टिनम); सातवाहन राजवंश (लगभग प्रथम शताब्दी ई.पू. – 225 ई.; गौतमीपुत्र सातकर्णि लगभग 106–130 ई.)।',
        te: 'సంగమ యుగ ప్రారంభ చోళులు (క్రీ.పూ. 300 – క్రీ.శ. 200, ఉరైయూర్ & కావేరీపట్టిణం); శాతవాహన రాజవంశం (క్రీ.పూ. 1వ శతాబ్దం – క్రీ.శ. 225; గౌతమీపుత్ర శాతకర్ణి క్రీ.శ. 106–130).',
        kn: 'ಸಂಗಮ್ ಯುಗದ ಆರಂಭಿಕ ಚೋಳರು (ಕ್ರಿ.ಪೂ. 300 – ಕ್ರಿ.ಶ. 200, ಉறையೂರು ಮತ್ತು ಕಾವೇರಿಪಟ್ಟಣಂ); ಶಾತವಾಹನ ರಾಜವಂಶ (ಕ್ರಿ.ಪೂ. 1ನೇ ಶತಮಾನ – ಕ್ರಿ.ಶ. 225; ಗೌತಮೀಪುತ್ರ ಶಾತಕರ್ಣಿ ಕ್ರಿ.ಶ. 106–130).',
        ta: 'சங்க காலத் தொடக்கச் சோழர்கள் (பொ.ஊ.மு. 300 – பொ.ஊ. 200, உறையூர் & காவிரிப்பூம்பட்டினம்); சாதவாகன வம்சம் (பொ.ஊ.மு. 1-ஆம் நூற்றாண்டு – பொ.ஊ. 225; கௌதமிபுத்ர சதகர்ணி பொ.ஊ. 106–130).',
        mr: 'संगम काळातील प्रारंभिक चोल (इ.स.पू. ३०० – इ.स. २००, उरैयूर व कावेरीपट्टिनम); सातवाहन राजवंश (इ.स.पू. १ ले शतक – इ.स. २२५; गौतमीपुत्र सातकर्णी इ.स. १०६–१३०).',
        or: 'ସଙ୍ଗମ ଯୁଗୀୟ ପ୍ରାରମ୍ଭିକ ଚୋଳ (ଖ୍ରୀ.ପୂ. ୩୦୦ – ୨୦୦ ଖ୍ରୀ.ଅ., ଉରୈୟୁର ଓ କାବେରୀପट्टିନମ); ଶାତବାହନ ରାଜବଂଶ (ଖ୍ରୀ.ପୂ. ୧ମ ଶତାବ୍ଦୀ – ୨୨୫ ଖ୍ରୀ.ଅ.; ଗୌତମୀପୁତ୍ର ଶାତକର୍ଣ୍ଣି ୧୦୬–୧୩୦ ଖ୍ରୀ.ଅ.)।',
        bn: 'সঙ্গম যুগের প্রারମ୍ଭিক চোল (খ্রি.পূ. ৩০০ – ২০০ খ্রি., উরৈয়ুর ও কাবেরীপট্টিনম); সাতবাহন রাজবংশ (খ্রি.পূ. ১ম শতাব্দী – ২২৫ খ্রি.; গৌতমীপুত্র সাতকর্ণী ১০৬–১৩০ খ্রি.)।'
      },
      disputedInterpretations: {
        en: 'Emperor Kharavela’s Hathigumpha Inscription date: K.P. Jayaswal & R.D. Banerji read a "Mauriya-kala" reference placing him in c. 170–150 BCE, whereas D.C. Sircar & N.K. Sahu reject the Maurya-era reading and place him in the late 1st century BCE (c. 40–25 BCE) based on Brahmi paleography.',
        hi: 'सम्राट खारवेल के हाथीगुम्फा अभिलेख की तिथि: के.पी. जायसवाल और आर.डी. बनर्जी "मौरिय-काल" पाठ के आधार पर उन्हें लगभग 170–150 ई.पू. में रखते हैं, जबकि डी.सी. सरकार और एन.के. साहू ब्राह्मी लिपि-विज्ञान के आधार पर प्रथम शताब्दी ई.पू. के उत्तरार्ध (लगभग 40–25 ई.पू.) का समर्थन करते हैं।',
        te: 'చక్రవర్తి ఖారవేలుని హాథీగుంఫా శాసన కాలం: కె.పి. జయస్వాల్ మరియు ఆర్.డి. బెనర్జీ క్రీ.పూ. 170–150గా పేర్కొనగా, డి.సి. సర్కార్ మరియు ఎన్.కె. సాహు బ్రాహ్మీ లిపి పరిణామం ఆధారంగా క్రీ.పూ. 1వ శతాబ్ది చివరి భాగం (క్రీ.పూ. 40–25)గా నిర్ణయించారు.',
        kn: 'ಸಾಮ್ರಾಟ್ ಖಾರವೇಲನ ಹಾಥಿಗುಂಫಾ ಶಾಸನದ ಕಾಲ: ಕೆ.ಪಿ. ಜಯಸ್ವಾಲ್ ಮತ್ತು ಆರ್.ಡಿ. ಬ್ಯಾನರ್ಜಿ ಕ್ರಿ.ಪೂ. 170–150 ಎಂದು ಗುರುತಿಸಿದರೆ, ಡಿ.ಸಿ. ಸರ್ಕಾರ್ ಮತ್ತು ಎನ್.ಕೆ. ಸಾಹು ಬ್ರಾಹ್ಮಿ ಲಿಪಿಯ ಆಧಾರದ ಮೇಲೆ ಕ್ರಿ.ಪೂ. 40–25 ಎಂದು ಪ್ರತಿಪಾದಿಸಿದ್ದಾರೆ.',
        ta: 'பேரரசர் காரவேலரின் ஹாதிகும்பா கல்வெட்டுக் காலம்: கே.பி. ஜெயஸ்வால் பொ.ஊ.மு. 170–150 எனக் கணிக்க, டி.சி. சர்க்கார் மற்றும் என்.கே. சாஹு பிராமி எழுத்தமைதி அடிப்படையில் பொ.ஊ.மு. 40–25 எனக் குறிப்பிடுகின்றனர்.',
        mr: 'सम्राट खारवेलांच्या हाथीगुम्फा शिलालेखाचा काळ: के.पी. जायसवाल यांनी इ.स.पू. १७०–१५० मानला, तर डी.सी. सरकार व एन.के. साहू यांनी ब्राह्मी लिपीच्या आधारे इ.स.पू. ४०–२५ निश्चित केला.',
        or: 'ସମ୍ରାଟ ଖାରବେଳଙ୍କ ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖ ତାରିଖ: କେ.ପି. ଜୟସ୍ୱାଲ ଖ୍ରୀ.ପୂ. ୧୭୦–୧୫୦ ମତ ଦେଇଥିବା ବେଳେ ଡି.ସି. ସରକାର ଓ ଏନ.କେ. ସାହୁ ବ୍ରାହ୍ମୀ ଲିପି ଆଧାରରେ ଖ୍ରୀ.ପୂ. ୪୦–୨୫ ନିର୍ଦ୍ଧାରଣ କରିଛନ୍ତି।',
        bn: 'সম্রাট খারবেলের হাতীগুম্ফা শিলালিপির তারিখ: কে.পি. জয়সওয়াল খ্রি.পূ. ১৭০–১৫০ মত দিলেও ডি.সি. সরকার ও এন.কে. সাহু ব্রাহ্মী লিপির ভিত্তিতে খ্রি.পূ. ৪০–২৫ নির্ধারণ করেছেন।'
      },
      traditionalClaims: {
        en: 'Kharavela’s Hathigumpha preamble invokes Rajarshi Vasu / Aira-Chedi lineage; Sangam anthologies (Purananuru, Pattinappalai) celebrate Karikala Chola’s Grand Anicut (Kallanai) on the Kaveri.',
        hi: 'खारवेल की हाथीगुम्फा प्रशस्ति में राजर्षि वसु / ऐर-चेदि वंश का उल्लेख; संगम साहित्य (पुरनानूरु, पट्टिनप्पालै) में करिकाल चोल द्वारा कावेरी पर कल्लணை (ग्रैंड एनीकट) बांध निर्माण का वर्णन।',
        te: 'ఖారవేలుని హాథీగుంఫా శాసనంలో రాజర్షి వసు / ఐర-చేది వంశ ప్రస్తావన; సంగమ సాహిత్యంలో (పురనానూరు, పట్టినప్పాలై) కరికాల చోళుని కావేరీ కల్లణై ఆనకట్ట నిర్మాణ గాథ.',
        kn: 'ಖಾರವೇಲನ ಹಾಥಿಗುಂಫಾ ಶಾಸನದಲ್ಲಿ ರಾಜರ್ಷಿ ವಸು / ಐರ-ಚೇದಿ ವಂಶದ ಉಲ್ಲೇಖ; ಸಂಗಮ್ ಸಾಹಿತ್ಯದಲ್ಲಿ ಕರಿಕಾಲ ಚೋಳನ ಕಾವೇರಿ ಕಲ್ಲಣೈ ಅಣೆಕಟ್ಟಿನ ವರ್ಣನೆ.',
        ta: 'காரவேலரின் கல்வெட்டில் ராஜரிஷி வசு / ஐர-சேதி மரபு குறிப்பு; சங்க இலக்கியங்களில் (புறநானூறு, பட்டினப்பாலை) கரிகால் சோழனின் கல்லணை கட்டுமானப் புகழ்.',
        mr: 'खारवेलांच्या शिलालेखात राजर्षी वसू / ऐर-चेदी वंशाचा उल्लेख; संगम साहित्यात करिकाल चोलच्या कावेरीवरील कल्लणै धरणाचे वर्णन.',
        or: 'ଖାରବେଳଙ୍କ ଶିଳାଲେଖରେ ରାଜର୍ଷି ବସୁ / ଐର-ଚେଦି ବଂଶର ଉଲ୍ଲେଖ; ସଙ୍ଗମ ସାହିତ୍ୟରେ କରିକାଳ ଚୋଳଙ୍କ କାବେରୀ କଲ୍ଲଣୈ ଆନିକଟ ନିର୍ମାଣ ବର୍ଣ୍ଣନା।',
        bn: 'খারবেলের শিলালিপিতে রাজর্ষি বসু / ঐর-চেদি বংশের উল্লেখ; সঙ্গম সাহিত্যে করিকাল চোলের কাবেরী কল্লণৈ বাঁধ নির্মাণের বর্ণনা।'
      }
    },
    parallelTracks: [
      {
        corridorId: 'track_s3_kalinga',
        corridorLabel: {
          en: 'Kalinga–Odra Corridor',
          hi: 'कलिंग–ओड्र गलियारा',
          te: 'కళింగ–ఓడ్ర ప్రాంతం',
          kn: 'ಕಳಿಂಗ–ಓಡ್ರ ವಲಯ',
          ta: 'கலிங்க–ஒட்டர மண்டலம்',
          mr: 'कलिंग–ओड्र पट्टा',
          or: 'କଳିଙ୍ଗ–ଓଡ଼୍ର ଅଞ୍ଚଳ',
          bn: 'কলিঙ্গ–ওড্র অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Nanda Suzerainty (c. 350 BCE) → Mauryan Kalinga Province at Tosali & Samapa (261–185 BCE) → Mahameghavahana Dynasty under Emperor Kharavela & Kudepasiri (c. 1st Century BCE)',
          hi: 'नंद आधिपत्य (लगभग 350 ई.पू.) → तोसली एवं समापा में मौर्य प्रांत (261–185 ई.पू.) → सम्राट खारवेल एवं कुदेपसिरी का महामेघवाहन राजवंश (लगभग प्रथम शताब्दी ई.पू.)',
          te: 'నంద ఆధిపత్యం (క్రీ.పూ. 350) → తోసలి & సమాప కేంద్రంగా మౌర్య పాలన (క్రీ.పూ. 261–185) → చక్రవర్తి ఖారవేలుని మహామేఘవాహన రాజవంశం (క్రీ.పూ. 1వ శతాబ్దం)',
          kn: 'ನಂದರ ಆಳ್ವಿಕೆ (ಕ್ರಿ.ಪೂ. 350) → ತೋಸಲಿ ಮತ್ತು ಸಮಾಪದಲ್ಲಿ ಮೌರ್ಯರ ಆಡಳಿತ (ಕ್ರಿ.ಪೂ. 261–185) → ಸಾಮ್ರಾಟ್ ಖಾರವೇಲನ ಮಹಾಮೇಘವಾಹನ ರಾಜವಂಶ (ಕ್ರಿ.ಪೂ. 1ನೇ ಶತಮಾನ)',
          ta: 'நந்தர் ஆட்சி (பொ.ஊ.மு. 350) → தோசலி & சமாபாவில் மௌரியர் ஆட்சி (பொ.ஊ.மு. 261–185) → பேரரசர் காரவேலரின் மகாமேகவாகன வம்சம் (பொ.ஊ.மு. 1-ஆம் நூற்றாண்டு)',
          mr: 'नंद राजवट (इ.स.पू. ३५०) → तोसली व समापा येथे मौर्य प्रांत (इ.स.पू. २६१–१८५) → सम्राट खारवेलांचे महामेघवाहन घराणे (इ.स.पू. १ ले शतक)',
          or: 'ନନ୍ଦ ଶାସନ (ଖ୍ରୀ.ପୂ. ୩୫୦) → ତୋଷାଳୀ ଓ ସମାପାରେ ମୌର୍ଯ୍ୟ ଶାସନ (ଖ୍ରୀ.ପୂ. ୨୬୧–୧୮୫) → ସମ୍ରାଟ ଖାରବେଳଙ୍କ ମହାମେଘବାହନ ରାଜବଂଶ (ଖ୍ରୀ.ପୂ. ୧ମ ଶତାବ୍ଦୀ)',
          bn: 'নন্দ শাসন (খ্রি.পূ. ৩৫০) → তোষালী ও সমাপায় মৌর্য শাসন (খ্রি.পূ. ২৬১–১৮৫) → সম্রাট খারবেলের মহামেঘবাহন রাজবংশ (খ্রি.পূ. ১ম শতাব্দী)'
        },
        dateSpan: '261 BCE (Established) & c. 170–40 BCE (Disputed)',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Dhauli/Jaugada Edicts (261 BCE); Hathigumpha Inscription (EI Vol. XX)'
      },
      {
        corridorId: 'track_s3_deccan_andhra',
        corridorLabel: {
          en: 'Deccan & Andhradesha Corridor',
          hi: 'दक्कन एवं आंध्रदेश गलियारा',
          te: 'దక్కన్ & ఆంధ్రదేశ ప్రాంతం',
          kn: 'ದಕ್ಕನ್ ಮತ್ತು ಆಂಧ್ರದೇಶ ವಲಯ',
          ta: 'தக்காண & ஆந்திர மண்டலம்',
          mr: 'दख्खन आणि आंध्रदेश पट्टा',
          or: 'ଦక్కନ ଓ ଆନ୍ଧ୍ରଦେଶ ଅଞ୍ଚଳ',
          bn: 'দাক্ষিণাত্য ও অন্ধ্রদেশ অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Satavahana Empire at Pratishthana & Dhanyakataka (Simuka, Satakarni I, Gautamiputra Satakarni, Vasishthiputra Pulumavi, Yajna Sri Satakarni)',
          hi: 'प्रतिष्ठान एवं धान्यकटक का सातवाहन साम्राज्य (सिमुक, सातकर्णि प्रथम, गौतमीपुत्र सातकर्णि, वशिष्ठीपुत्र पुलुमावी, यज्ञश्री सातकर्णि)',
          te: 'ప్రతిష్ఠానపురం & ధాన్యకటకం కేంద్రంగా శాతవాహన సామ్రాజ్యం (శ్రీముఖుడు, శాతకర్ణి I, గౌతమీపుత్ర శాతకర్ణి, పులుమావి, యజ్ఞశ్రీ శాతకర్ణి)',
          kn: 'ಪ್ರತಿಷ್ಠಾನ ಮತ್ತು ಧಾನ್ಯಕಟಕದ ಶಾತವಾಹನ ಸಾಮ್ರಾಜ್ಯ (ಸಿಮುಖ, ಶಾತಕರ್ಣಿ I, ಗೌತಮೀಪುತ್ರ ಶಾತಕರ್ಣಿ, ಪುಲುಮಾವಿ, ಯಜ್ಞಶ್ರೀ ಶಾತಕರ್ಣಿ)',
          ta: 'பிரதிஷ்டானம் & தான்யகடகத்தின் சாதவாகனப் பேரரசு (சிமுகன், முதலாம் சதகர்ணி, கௌதமிபுத்ர சதகர்ணி, புலுமாவி)',
          mr: 'प्रतिष्ठान (पैठण) आणि धान्यकटक येथील सातवाहन साम्राज्य (सिमुक, सातकर्णी पहिला, गौतमीपुत्र सातकर्णी, पुलुमावी)',
          or: 'ପ୍ରତିଷ୍ଠାନ ଓ ଧାନ୍ୟକଟକର ଶାତବାହନ ସାମ୍ରାଜ୍ୟ (ସିମୁକ, ପ୍ରଥମ ଶାତକର୍ଣ୍ଣି, ଗୌତମୀପୁତ୍ର ଶାତକର୍ଣ୍ଣି, ପୁଲୁମାଭି)',
          bn: 'প্রতিষ্ঠান ও ধান্যকটকের সাতবাহন সাম্রাজ্য (সিমুক, প্রথম সাতকর্ণী, গৌতমীপুত্র সাতকর্ণী, পুলুমাভি)'
        },
        dateSpan: 'c. 1st Century BCE – c. 225 CE',
        dateType: 'Approximate Reign',
        epigraphicAnchor: 'Naneghat Inscription of Naganika; Nasik Cave III Inscription of Gautami Balasri (EI Vol. VIII)'
      },
      {
        corridorId: 'track_s3_kaveri_chola',
        corridorLabel: {
          en: 'Kaveri & Tamilakam Corridor (Sangam Age)',
          hi: 'कावेरी एवं तमिलकम गलियारा (संगम काल)',
          te: 'కావేరీ & తమిళకం ప్రాంతం (సంగమ యుగం)',
          kn: 'ಕಾವೇರಿ ಮತ್ತು ತಮಿಳகம் ವಲಯ (ಸಂಗಮ್ ಯುಗ)',
          ta: 'காவிரி & தமிழகம் மண்டலம் (சங்க காலம்)',
          mr: 'कावेरी आणि तमिळकम पट्टा (संगम काळ)',
          or: 'କାବେରୀ ଓ ତାମିଲକମ ଅଞ୍ଚଳ (ସଙ୍ଗମ ଯୁଗ)',
          bn: 'কাবেরী ও তামিলকম অঞ্চল (সঙ্গম যুগ)'
        },
        dynastiesAndPolities: {
          en: 'Early Cholas of Uraiyur & Kaveripattinam (Ilanchetchenni, Karikala Chola, Killivalavan) alongside Early Pandyas & Cheras',
          hi: 'उरैयूर एवं कावेरीपट्टिनम के प्रारंभिक संगम चोल (इलनचेतचेन्नी, करिकाल चोल, किल्लीवलवन) तथा प्रारंभिक पांड्य एवं चेर',
          te: 'ఉరైయూర్ & కావేరీపట్టిణం ప్రారంభ సంగమ చోళులు (ఇళంచెచ్చెన్ని, కరికాల చోళుడు, కిள்ளிవలవన్) మరియు ప్రారంభ పాండ్య, చేర రాజులు',
          kn: 'ಉறையೂರು ಮತ್ತು ಕಾವೇರಿಪಟ್ಟಣಂನ ಆರಂಭಿಕ ಸಂಗಮ್ ಚೋಳರು (ಕರிகಾಲ ಚೋಳ) ಹಾಗೂ ಆರಂಭಿಕ ಪಾಂಡ್ಯ ಮತ್ತು ಚೇರರು',
          ta: 'உறையூர் & காவிரிப்பூம்பட்டினம் சங்க காலச் சோழர்கள் (இளஞ்சேட்சென்னி, கரிகால் பெருவளத்தான், கிள்ளிவளவன்) மற்றும் பாண்டிய, சேரர்கள்',
          mr: 'उरैयूर आणि कावेरीपट्टिनमचे संगमकालीन प्रारंभिक चोल (करिकाल चोल) तसेच प्रारंभिक पांड्य व चेर',
          or: 'ଉରୈୟୁର ଓ କାବେରୀପट्टିନମର ସଙ୍ଗମ ଚୋଳ (କରିକାଳ ଚୋଳ) ଏବଂ ପ୍ରାରମ୍ଭିକ ପାଣ୍ଡ୍ୟ ଓ ଚେର',
          bn: 'উরৈয়ুর ও কাবেরীপট্টিনমের সঙ্গম চোল (করিকাল চোল) এবং প্রারମ୍ଭিক পাণ্ড্য ও চের'
        },
        dateSpan: 'c. 300 BCE – c. 200 CE',
        dateType: 'Approximate Reign',
        epigraphicAnchor: 'Ashoka Major Rock Edicts II & XIII ("Choda"); Early Tamil-Brahmi Epigraphs; Pattinappalai'
      }
    ],
    keyMonumentsAndInscriptions: ['Dhauli & Jaugada Separate Rock Edicts (261 BCE)', 'Hathigumpha Inscription of Kharavela (EI Vol. XX)', 'Naneghat & Nasik Cave Inscriptions of Satavahanas', 'Ashokan Rock Edicts II & XIII (Sangam Cholas)'],
    linkedArticleIds: ['art_epigraphic_evolution_odra', 'art_odra_desha_history', 'art_dyn_imperial_cholas'],
    linkedEventIds: ['ev_kharavela_1st_bce']
  },
  {
    stageOrder: 4,
    id: 'stage_04_ancient_kingdoms',
    refNumber: 'HT-0005',
    stageCode: 'ANCIENT_KINGDOMS',
    title: {
      en: 'Stage 4: Classical Ancient Kingdoms — Andhra Ikshvakus, Early Pallavas, Kadambas, Western Gangas & Early Eastern Gangas (c. 225 – 600 CE)',
      hi: 'चरण 4: शास्त्रीय प्राचीन राज्य — आंध्र इक्ष्वाकु, प्रारंभिक पल्लव, कदंब, पश्चिमी गंग एवं प्रारंभिक पूर्वी गंग (लगभग 225 – 600 ई.)',
      te: 'దశ 4: ప్రాచీన రాజ్యాలు — ఆంధ్ర ఇక్ష్వాకులు, ప్రారంభ పల్లవులు, కదంబులు, పశ్చిమ గాంగులు & ప్రారంభ తూర్పు గాంగులు (క్రీ.శ. 225 – 600)',
      kn: 'ಹಂತ 4: ಪ್ರಾಚೀನ ರಾಜ್ಯಗಳು — ಆಂಧ್ರ ಇಕ್ಷ್ವಾಕುಗಳು, ಆರಂಭಿಕ ಪಲ್ಲವರು, ಕದಂಬರು, ಪಶ್ಚಿಮ ಗಂಗರು ಮತ್ತು ಆರಂಭಿಕ ಪೂರ್ವ ಗಂಗರು (ಕ್ರಿ.ಶ. 225 – 600)',
      ta: 'நிலை 4: பண்டைய அரசுகள் — ஆந்திர இக்ஷ்வாகுகள், தொடக்கப் பல்லவர்கள், கதம்பர்கள், மேலைக் கங்கர்கள் & தொடக்க கீழைக் கங்கர்கள் (பொ.ஊ. 225 – 600)',
      mr: 'टप्पा 4: प्राचीन राज्ये — आंध्र इक्ष्वाकू, प्रारंभिक पल्लव, कदंब, पश्चिम गंग आणि प्रारंभिक पूर्व गंग (इ.स. २२५ – ६००)',
      or: 'ପର୍ଯ୍ୟାୟ ୪: ପ୍ରାଚୀନ ରାଜ୍ୟ — ଆନ୍ଧ୍ର ଇକ୍ଷ୍ୱାକୁ, ପ୍ରାରମ୍ଭିକ ପଲ୍ଲବ, କଦମ୍ବ, ପଶ୍ଚିମ ଗଙ୍ଗ ଓ ପ୍ରାରମ୍ଭିକ ପୂର୍ବ ଗଙ୍ଗ (୨୨୫ – ୬୦୦ ଖ୍ରୀ.ଅ.)',
      bn: 'পর্যায় ৪: প্রাচীন রাজ্যসমূহ — অন্ধ্র ইক্ষ্বাকু, প্রারମ୍ଭিক পল্লব, কদম্ব, পশ্চিম গঙ্গ ও প্রারମ୍ଭিক পূর্ব গঙ্গ (২২৫ – ৬০০ খ্রি.)'
    },
    approxDateLabel: {
      en: 'c. 225 CE – 600 CE (Parallel Rise of Sovereign Dynasties; Overlaps Stage 5 at 543 CE Badami Chalukya Foundation)',
      hi: 'लगभग 225 ई. – 600 ई. (सार्वभौम राजवंशों का समानांतर उदय; 543 ई. में बादामी चालुक्य स्थापना के साथ चरण 5 से अंतर्संबंध)',
      te: 'క్రీ.శ. 225 – 600 (స్వతంత్ర రాజవంశాల సమాంతర ఆవిర్భావం; క్రీ.శ. 543 బాదామి చాళుక్య స్థాపనతో దశ 5తో అనుసంధానం)',
      kn: 'ಕ್ರಿ.ಶ. 225 – 600 (ಸಾರ್ವಭೌಮ ರಾಜವಂಶಗಳ ಸಮಾನಾಂತರ ಉದಯ; ಕ್ರಿ.ಶ. 543 ಬಾದಾಮಿ ಚಾಳುಕ್ಯ ಸ್ಥಾಪನೆಯೊಂದಿಗೆ ಹಂತ 5ರ ಸಂಪರ್ಕ)',
      ta: 'பொ.ஊ. 225 – 600 (தன்னாட்சி வம்சங்களின் இணையான எழுச்சி; பொ.ஊ. 543 பாதாமி சாளுக்கிய தோற்றத்துடன் நிலை 5 இணைப்பு)',
      mr: 'इ.स. २२५ – ६०० (सार्वभौम राजवंशांचा समांतर उदय; इ.स. ५४३ बदामी चालुक्य स्थापनेद्वारे टप्पा ५ शी जोडणी)',
      or: '୨୨୫ – ୬୦୦ ଖ୍ରୀ.ଅ. (ସାର୍ବଭୌମ ରାଜବଂଶମାନଙ୍କର ସମାନ୍ତରାଳ ଅଭ୍ୟୁଦୟ; ୫୪୩ ଖ୍ରୀ.ଅ. ବାଦାମୀ ଚାଲୁକ୍ୟ ସ୍ଥାପନ ସହ ପର୍ଯ୍ୟାୟ ୫ ସଂଯୋଗ)',
      bn: '২২৫ – ৬০০ খ্রি. (সার্বভৌম রাজবংশসমূহের সমান্তরাল উত্থান; ৫৪৩ খ্রি. বাদামী চালুক্য প্রতিষ্ঠার সাথে পর্যায় ৫-এর সংযোগ)'
    },
    chronologicalUncertaintyNote: {
      en: 'Dynasties in this stage did NOT terminate artificially in 600 CE: while the Kadambas of Banavasi lost paramountcy to Pulakeshin I of Badami c. 540–543 CE, the Pallavas of Kanchipuram (c. 275–897 CE), Western Gangas of Talakad (c. 350–1000 CE), and Eastern Gangas of Kalinganagara (Ganga Era 496–498 CE to 1434 CE) continued ruling across subsequent stages.',
      hi: 'इस चरण के राजवंश 600 ई. में कृत्रिम रूप से समाप्त नहीं हुए: बनवासी के कदंब लगभग 540–543 ई. में बादामी के पुलकेशिन प्रथम के अधीन हुए, किंतु कांची के पल्लव (लगभग 275–897 ई.), तलकाड के पश्चिमी गंग (लगभग 350–1000 ई.) और कलिंगनगर के पूर्वी गंग (गंग संवत 496–498 ई. से 1434 ई.) आगामी चरणों में निरंतर शासन करते रहे।',
      te: 'ఈ దశలోని రాజవంశాలు క్రీ.శ. 600తో ముగియలేదు: బనవాసి కదంబులు క్రీ.శ. 540–543లో బాదామి పులకేశి I చేతిలో అధికారాన్ని కోల్పోయినప్పటికీ, కాంచీపురం పల్లవులు (క్రీ.శ. 275–897), తలకాడు పశ్చిమ గాంగులు (క్రీ.శ. 350–1000) మరియు కళింగనగర తూర్పు గాంగులు (క్రీ.శ. 496–498 నుండి 1434 వరకు) తదుపరి శతాబ్దాలలో నిరంతరాయంగా పాలించారు.',
      kn: 'ಈ ಹಂತದ ರಾಜವಂಶಗಳು ಕ್ರಿ.ಶ. 600ರಲ್ಲಿ ಕೊನೆಗೊಳ್ಳಲಿಲ್ಲ: ಬನವಾಸಿಯ ಕದಂಬರು ಕ್ರಿ.ಶ. 540–543ರಲ್ಲಿ ಬಾದಾಮಿಯ ಪುಲಿಕೇಶಿ I ಕ್ಕೆ ಮಣಿದರೂ, ಕಾಂಚಿಯ ಪಲ್ಲವರು (ಕ್ರಿ.ಶ. 275–897), ತಲಕಾಡಿನ ಪಶ್ಚಿಮ ಗಂಗರು (ಕ್ರಿ.ಶ. 350–1000) ಮತ್ತು ಕಳಿಂಗನಗರದ ಪೂರ್ವ ಗಂಗರು (ಕ್ರಿ.ಶ. 496–498 ರಿಂದ 1434) ಮುಂದಿನ ಶತಮಾನಗಳಲ್ಲೂ ಆಳ್ವಿಕೆ ಮುಂದುವರಿಸಿದರು.',
      ta: 'இந்நிலையின் வம்சங்கள் பொ.ஊ. 600-இல் முடிவடையவில்லை: பனவாசி கதம்பர்கள் பொ.ஊ. 540–543-இல் முதலாம் புலிகேசிக்குக் கீழ்ப்படிந்த போதிலும், காஞ்சிப் பல்லவர்கள் (பொ.ஊ. 275–897), தலக்காடு மேலைக் கங்கர்கள் (பொ.ஊ. 350–1000) மற்றும் கலிங்கநகர கீழைக் கங்கர்கள் (பொ.ஊ. 496–498 முதல் 1434 வரை) அடுத்தடுத்த நூற்றாண்டுகளிலும் தொடர்ந்து ஆட்சி செய்தனர்.',
      mr: 'या टप्प्यातील राजवंश इ.स. ६०० मध्ये संपुष्टात आले नाहीत: बनवासीचे कदंब इ.स. ५४०–५४३ मध्ये बदामीच्या पुलकेशी पहिल्याकडे गेले तरी कांचीचे पल्लव (इ.स. २७५–८९७), तलकाडचे पश्चिम गंग (इ.स. ३५०–१०००) आणि कलिंगनगरचे पूर्व गंग (इ.स. ४९६–४९८ ते १४३४) पुढील शतकांतही अखंड राज्य करत राहिले.',
      or: 'ଏହି ପର୍ଯ୍ୟାୟର ରାଜବଂଶମାନେ ୬୦୦ ଖ୍ରୀ.ଅ.ରେ ସମାପ୍ତ ହୋଇନଥିଲେ: ବନବାସୀର କଦମ୍ବମାନେ ୫୪୦–୫୪୩ ଖ୍ରୀ.ଅ.ରେ ବାଦାମୀର ପ୍ରଥମ ପୁଲକେଶୀଙ୍କ ଅଧୀନ ହୋଇଥିଲେ ହେଁ କାଞ୍ଚିର ପଲ୍ଲବ (୨୭୫–୮୯୭ ଖ୍ରୀ.ଅ.), ତଳକାଡ଼ର ପଶ୍ଚିମ ଗଙ୍ଗ (୩୫୦–୧୦୦୦ ଖ୍ରୀ.ଅ.) ଓ କଳିଙ୍ଗନଗରର ପୂର୍ବ ଗଙ୍ଗ (୪୯୬–୪୯୮ ରୁ ୧୪୩୪ ଖ୍ରୀ.ଅ.) ପରବର୍ତ୍ତୀ ଶତାବ୍ଦୀମାନଙ୍କରେ ନିରନ୍ତର ଶାସନ କରିଥିଲେ।',
      bn: 'এই পর্যায়ের রাজবংশগুলো ৬০০ খ্রিস্টাব্দে শেষ হয়নি: বনবাসীর কদম্বরা ৫৪০–৫৪৩ খ্রিস্টাব্দে বাদামীর প্রথম পুলকেশীর অধীন হলেও কাঞ্চীর পল্লব (২৭৫–৮৯৭ খ্রি.), তলকাড়ের পশ্চিম গঙ্গ (৩৫০–১০০০ খ্রি.) ও কলিঙ্গনগরের পূর্ব গঙ্গ (৪৯৬–৪৯৮ থেকে ১৪৩৪ খ্রি.) পরবর্তী শতাব্দীগুলোতেও নিরবচ্ছিন্নভাবে শাসন করেছিলেন।'
    },
    epistemicLabel: {
      en: 'Verified Copper-Plate & Pillar Inscriptions (Prakrit, Sanskrit & Early Kannada)',
      hi: 'सत्यापित ताम्रपत्र एवं स्तंभ शिलालेख (प्राकृत, संस्कृत एवं प्राचीन कन्नड़)',
      te: 'ధృవీకరించబడిన తామ్రపత్ర & స్తంభ శాసనాలు (ప్రాకృతం, సంస్కృతం & ప్రాచీన కన్నడ)',
      kn: 'ದೃಢೀಕೃತ ತಾಮ್ರಪತ್ರ ಮತ್ತು ಸ್ತಂಭ ಶಾಸನಗಳು (ಪ್ರಾಕೃತ, ಸಂಸ್ಕೃತ ಮತ್ತು ಪ್ರಾಚೀನ ಕನ್ನಡ)',
      ta: 'உறுதிப்படுத்தப்பட்ட செப்பேடுகள் & தூண் கல்வெட்டுகள் (பிராகிருதம், சமஸ்கிருதம் & பழங்கನ್ನಡம்)',
      mr: 'सत्यापित ताम्रपट आणि स्तंभ शिलालेख (प्राकृत, संस्कृत व प्राचीन कानडी)',
      or: 'ପ୍ରମାଣିତ ତାମ୍ରପଟା ଓ ସ୍ତମ୍ଭ ଶିଳାଲେଖ (ପ୍ରାକୃତ, ସଂସ୍କୃତ ଓ ପ୍ରାଚୀନ କନ୍ନଡ଼)',
      bn: 'প্রমাণিত তাম্রশাসন ও স্তম্ভ শিলালিপি (প্রাকৃত, সংস্কৃত ও প্রাচীন কন্নড়)'
    },
    epistemicTier: 'verified_historical',
    symbolicIllustration: ARCHIVE_IMG('copper_plate_charter.jpg'),
    illustrationCaption: {
      en: 'Royal copper-plate charter bound by a bronze signet ring bearing dynastic emblems (Varaha, Vrishabha, or Lotus).',
      hi: 'राजवंशीय मुद्रा (वराह, वृषभ या कमल) से युक्त कांस्य वलय में बंधा राजकीय ताम्रपत्र अनुदान।',
      te: 'రాజవంశ ముద్ర (వరాహ, వృషభ లేదా పద్మ చిహ్నం) కలిగిన రాగి ఉంగరంతో బంధించబడిన రాజ తామ్రశాసనం.',
      kn: 'ರಾಜವಂಶದ ಲಾಂಛನವುಳ್ಳ (ವರಾಹ, ವೃಷಭ ಅಥವಾ ಕಮಲ) ಕಂಚಿನ ಉಂಗುರದಿಂದ ಬಂಧಿಸಲ್ಪಟ್ಟ ರಾಜ ತಾಮ್ರಶಾಸನ.',
      ta: 'வம்ச முத்திரை (வராகம், ரிஷபம் அல்லது தாமரை) பொறிக்கப்பட்ட வளையத்துடன் கூடிய அரச செப்பேடு.',
      mr: 'राजवंश मुद्रा (वराह, वृषभ किंवा कमळ) असलेल्या कड्याने बांधलेला राजकीय ताम्रपट.',
      or: 'ରାଜବଂଶ ମୁଦ୍ରା (ବରାହ, ବୃଷଭ ବା ପଦ୍ମ) ଯୁକ୍ତ ମୁଦ୍ରିକାରେ ବନ୍ଧା ରାଜକୀୟ ତାମ୍ରପଟା ଶାସନ।',
      bn: 'রাজবংশীয় মুদ্রা (বরাহ, বৃষভ বা পদ্ম) যুক্ত বলয়ে বাঁধা রাজকীয় তাম্রশাসন।'
    },
    visualTypeBadge: {
      en: 'Verified Epigraphic Artifact Photography',
      hi: 'सत्यापित अभिलेखीय कलाकृति छायाचित्र',
      te: 'ధృవీకరించబడిన శాసన కళాఖండ ఛాయాచిత్రం',
      kn: 'ದೃಢೀಕೃತ ಶಾಸನ ಕಲಾಕೃತಿ ಛಾಯಾಚಿತ್ರ',
      ta: 'உறுதிப்படுத்தப்பட்ட கல்வெட்டுப் பொருள் புகைப்படம்',
      mr: 'सत्यापित शिलालेख कलाकृती छायाचित्र',
      or: 'ପ୍ରମାଣିତ ଅଭିଲେଖ କଳାକୃତି ଫଟୋଚିତ୍ର',
      bn: 'প্রমাণিত শিলালিপি নিদর্শন আলোকচিত্র'
    },
    conciseOverview: {
      en: 'Following the decline of the Satavahanas (c. 225 CE), sovereign dynasties rose in parallel across peninsular and eastern India: the Andhra Ikshvakus at Vijayapuri, Early Pallavas at Kanchipuram (from c. 275 CE), Kadambas at Banavasi (c. 345–540 CE), Western Gangas in Gangavadi (from c. 350 CE), and Matharas and Early Eastern Gangas at Kalinganagara (from 496–498 CE).',
      hi: 'सातवाहनों के पतन (लगभग 225 ई.) के पश्चात प्रायद्वीपीय और पूर्वी भारत में समानांतर रूप से सार्वभौम राजवंशों का उदय हुआ: विजयपुरी में आंध्र इक्ष्वाकु, कांचीपुरम में प्रारंभिक पल्लव (लगभग 275 ई. से), बनवासी में कदंब (लगभग 345–540 ई.), गंगवाड़ी में पश्चिमी गंग (लगभग 350 ई. से), तथा कलिंगनगर में माठर और प्रारंभिक पूर्वी गंग (496–498 ई. से)।',
      te: 'శాతవాహనుల పతనం (క్రీ.శ. 225) తర్వాత ద్వీపకల్ప మరియు తూర్పు భారతదేశంలో సమాంతరంగా స్వతంత్ర రాజవంశాలు వెలిశాయి: విజయపురిలో ఆంధ్ర ఇక్ష్వాకులు, కాంచీపురంలో ప్రారంభ పల్లవులు (క్రీ.శ. 275 నుండి), బనవాసిలో కదంబులు (క్రీ.శ. 345–540), గంగవాడిలో పశ్చిమ గాంగులు (క్రీ.శ. 350 నుండి) మరియు కళింగనగరంలో మాఠరులు, తూర్పు గాంగులు (క్రీ.శ. 496–498 నుండి).',
      kn: 'ಶಾತವಾಹನರ ಪತನದ (ಕ್ರಿ.ಶ. 225) ನಂತರ ಪರ್ಯಾಯ ದ್ವೀಪ ಮತ್ತು ಪೂರ್ವ ಭಾರತದಲ್ಲಿ ಸಮಾನಾಂತರವಾಗಿ ಸಾರ್ವಭೌಮ ರಾಜವಂಶಗಳು ಉದಯಿಸಿದವು: ವಿಜಯಪುರಿಯಲ್ಲಿ ಆಂಧ್ರ ಇಕ್ಷ್ವಾಕುಗಳು, ಕಾಂಚೀಪುರಂನಲ್ಲಿ ಆರಂಭಿಕ ಪಲ್ಲವರು (ಕ್ರಿ.ಶ. 275 ರಿಂದ), ಬನವಾಸಿಯಲ್ಲಿ ಕದಂಬರು (ಕ್ರಿ.ಶ. 345–540), ಗಂಗವಾಡಿಯಲ್ಲಿ ಪಶ್ಚಿಮ ಗಂಗರು (ಕ್ರಿ.ಶ. 350 ರಿಂದ) ಮತ್ತು ಕಳಿಂಗನಗರದಲ್ಲಿ ಪೂರ್ವ ಗಂಗರು (ಕ್ರಿ.ಶ. 496–498 ರಿಂದ).',
      ta: 'சாதவாகனர்களின் வீழ்ச்சிக்குப் பிறகு (பொ.ஊ. 225) தீபகற்ப மற்றும் கிழக்கு இந்தியாவில் இணையான தன்னாட்சி வம்சங்கள் எழுந்தன: விஜயபுரியில் ஆந்திர இக்ஷ்வாகுகள், காஞ்சிபுரத்தில் தொடக்கப் பல்லவர்கள் (பொ.ஊ. 275 முதல்), பனவாசியில் கதம்பர்கள் (பொ.ஊ. 345–540), கங்கவாடியில் மேலைக் கங்கர்கள் (பொ.ஊ. 350 முதல்) மற்றும் கலிங்கநகரத்தில் கீழைக் கங்கர்கள் (பொ.ஊ. 496–498 முதல்).',
      mr: 'सातवाहनांच्या ऱ्हासानंतर (इ.स. २२५) द्वीपकल्पीय आणि पूर्व भारतात समांतर सार्वभौम राजवंशांचा उदय झाला: विजयपुरी येथे आंध्र इक्ष्वाकू, कांचीपुरम येथे प्रारंभिक पल्लव (इ.स. २७५ पासून), बनवासी येथे कदंब (इ.स. ३४५–५४०), गंगवाडीत पश्चिम गंग (इ.स. ३५० पासून) आणि कलिंगनगर येथे पूर्व गंग (इ.स. ४९६–४९८ पासून).',
      or: 'ଶାତବାହନଙ୍କ ପତନ (୨୨୫ ଖ୍ରୀ.ଅ.) ପରେ ଉପଦ୍ୱୀପୀୟ ଓ ପୂର୍ବ ଭାରତରେ ସମାନ୍ତରାଳ ଭାବେ ସାର୍ବଭୌମ ରାଜବଂଶମାନଙ୍କର ଅଭ୍ୟୁଦୟ ହେଲା: ବିଜୟପୁରୀରେ ଆନ୍ଧ୍ର ଇକ୍ଷ୍ୱାକୁ, କାଞ୍ଚିପୁରମରେ ପ୍ରାରମ୍ଭିକ ପଲ୍ଲବ (୨୭୫ ଖ୍ରୀ.ଅ.ରୁ), ବନବାସୀରେ କଦମ୍ବ (୩୪୫–୫୪୦ ଖ୍ରୀ.ଅ.), ଗଙ୍ଗବାଡ଼ିରେ ପଶ୍ଚିମ ଗଙ୍ଗ (୩୫୦ ଖ୍ରୀ.ଅ.ରୁ) ଓ କଳିଙ୍ଗନଗରରେ ପୂର୍ବ ଗଙ୍ଗ (୪୯୬–୪୯୮ ଖ୍ରୀ.ଅ.ରୁ)।',
      bn: 'সাতবাহনদের পতনের (২২৫ খ্রি.) পর উপদ্বীপীয় ও পূর্ব ভারতে সমান্তরালভাবে সার্বভৌম রাজবংশসমূহের উত্থান ঘটে: বিজয়পুরীতে অন্ধ্র ইক্ষ্বাকু, কাঞ্চীপুরমে প্রারମ୍ଭিক পল্লব (২৭৫ খ্রি. থেকে), বনবাসীতে কদম্ব (৩৪৫–৫৪০ খ্রি.), গঙ্গবাড়িতে পশ্চিম গঙ্গ (৩৫০ খ্রি. থেকে) এবং কলিঙ্গনগরে পূর্ব গঙ্গ (৪৯৬–৪৯৮ খ্রি. থেকে)।'
    },
    detailedAnalysis: {
      en: 'This era established the administrative template of Brahmadeya and Agrahara copper-plate charters across India: the Prakrit Mayidavolu and Hirahadagalli plates of Early Pallava Sivaskandavarman, the Talagunda Pillar Inscription (EI Vol. VIII) and Halmidi Kannada Inscription (c. 450 CE) of the Kadambas, the Penukonda plates of the Western Gangas, and the Jirjingi plates of Eastern Ganga King Indravarman I (Ganga Year 39 = c. 535–537 CE).',
      hi: 'इस कालखंड ने अखिल भारतीय स्तर पर ब्रह्मदेय और अग्रहार ताम्रपत्र अनुदानों की प्रशासनिक नींव रखी: पल्लव शिवस्कंदवर्मन के मयिदवोलु एवं हीरहडगल्ली प्राकृत ताम्रपत्र, कदंबों का तालगुंडा स्तंभ शिलालेख (EI Vol. VIII) और हल्मिडी कन्नड़ अभिलेख (लगभग 450 ई.), पश्चिमी गंगों के पेनुकोंडा ताम्रपत्र, तथा पूर्वी गंग राजा इंद्रवर्मन प्रथम के जिरजिंगी ताम्रपत्र (गंग वर्ष 39 = लगभग 535–537 ई.)।',
      te: 'ఈ కాలంలో అగ్రహార తామ్రశాసన విధానం స్థిరపడింది: ప్రారంభ పల్లవ శివస్కందవర్మ మయిదవోలు, హీరహడగల్లి ప్రాకృత తామ్రపత్రాలు, కదంబుల తాలగుండ స్తంభ శాసనం (EI Vol. VIII) మరియు హల్మిడి కన్నడ శాసనం (క్రీ.శ. 450), పశ్చిమ గాంగుల పెనుకొండ తామ్రపత్రాలు, మరియు తూర్పు గాంగ రాజు ఇంద్రవర్మ I జిర్జింగి తామ్రపత్రాలు (గాంగేయ శకం 39 = క్రీ.శ. 535–537).',
      kn: 'ಈ ಯುಗವು ಅಗ್ರಹಾರ ತಾಮ್ರಶಾಸನಗಳ ಆಡಳಿತಾತ್ಮಕ ಮಾದರಿಗೆ ಅಡಿಪಾಯ ಹಾಕಿತು: ಆರಂಭಿಕ ಪಲ್ಲವ ಶಿವಸ್ಕಂದವರ್ಮನ ಮಯಿದವೋಲು ಮತ್ತು ಹೀರಹಡಗಲ್ಲಿ ತಾಮ್ರಪತ್ರಗಳು, ಕದಂಬರ ತಾಳಗುಂದ ಸ್ತಂಭ ಶಾಸನ (EI Vol. VIII) ಮತ್ತು ಹಲ್ಮಿಡಿ ಕನ್ನಡ ಶಾಸನ (ಕ್ರಿ.ಶ. 450), ಪಶ್ಚಿಮ ಗಂಗರ ಪೆನುಕೊಂಡ ತಾಮ್ರಪತ್ರಗಳು ಹಾಗೂ ಪೂರ್ವ ಗಂಗ ರಾಜ ಇಂದ್ರವರ್ಮನ್ I ರ ಜಿರ್ಜಿಂಗಿ ತಾಮ್ರಪತ್ರಗಳು (ಗಂಗ ವರ್ಷ 39 = ಕ್ರಿ.ಶ. 535–537).',
      ta: 'இக்காலகட்டம் பிரம்மதேய மற்றும் அக்ரஹார செப்பேட்டு முறையின் நிர்வாக அடித்தளத்தை அமைத்தது: பல்லவ சிவஸ்கந்தவர்மனின் மயிதவோலு மற்றும் ஹீரஹடகல்லி பிராகிருதச் செப்பேடுகள், கதம்பர்களின் தாளகுந்தா தூண் கல்வெட்டு (EI Vol. VIII) மற்றும் ஹல்மிடி கல்வெட்டு (பொ.ஊ. 450), மேலைக் கங்கர்களின் பெனுகொண்டா செப்பேடுகள் மற்றும் கீழைக் கங்க மன்னர் முதலாம் இந்திரவர்மனின் ஜிர்ஜிங்கி செப்பேடுகள் (கங்க ஆண்டு 39 = பொ.ஊ. 535–537).',
      mr: 'या कालखंडाने अग्रहार ताम्रपट पद्धतीचा पाया घातला: पल्लव शिवस्कंदवर्मनचे मयिदवोलू व हीरहडगल्ली ताम्रपट, कदंबांचा तालगुंडा स्तंभ शिलालेख (EI Vol. VIII) आणि हल्मिडी कानडी शिलालेख (इ.स. ४५०), पश्चिम गंगांचे पेनुकोंडा ताम्रपट आणि पूर्व गंग राजा इंद्रवर्मन पहिला याचे जिरजिंगी ताम्रपट (गंग वर्ष ३९ = इ.स. ५३५–५३७).',
      or: 'ଏହି ଯୁଗ ଅଗ୍ରହାର ତାମ୍ରପଟା ଶାସନ ପଦ୍ଧତିର ମୂଳଦୁଆ ପକାଇଥିଲା: ପଲ୍ଲବ ଶିବସ୍କନ୍ଦବର୍ମନଙ୍କ ମୟିଦଭୋଲୁ ଓ ହୀରହଡ଼ଗଲ୍ଲୀ ତାମ୍ରପଟା, କଦମ୍ବମାନଙ୍କର ତାଳଗୁଣ୍ଡା ସ୍ତମ୍ଭ ଶିଳାଲେଖ (EI Vol. VIII) ଓ ହଲ୍ମିଡ଼ି କନ୍ନଡ଼ ଶିଳାଲେଖ (୪୫୦ ଖ୍ରୀ.ଅ.), ପଶ୍ଚିମ ଗଙ୍ଗଙ୍କ ପେନୁକୋଣ୍ଡା ତାମ୍ରପଟା ଏବଂ ପୂର୍ବ ଗଙ୍ଗ ରାଜା ପ୍ରଥମ ଇନ୍ଦ୍ରବର୍ମନଙ୍କ ଜିରଜିଙ୍ଗି ତାମ୍ରପଟା (ଗଙ୍ଗ ବର୍ଷ ୩୯ = ୫୩୫–୫୩୭ ଖ୍ରୀ.ଅ.)।',
      bn: 'এই যুগ অগ্রহার তাম্রশাসন পদ্ধতির ভিত্তি স্থাপন করে: পল্লব শিবস্কন্দবর্মণের ময়িদভোলু ও হীরহড়গল্লী তাম্রশাসন, কদম্বদের তালগুন্ডা স্তম্ভ শিলালিপি (EI Vol. VIII) ও হলমিডি কন্নড় শিলালিপি (৪৫০ খ্রি.), পশ্চিম গঙ্গদের পেনুকোন্ডা তাম্রশাসন এবং পূর্ব গঙ্গ রাজা প্রথম ইন্দ্রবর্মণের জিরজিঙ্গি তাম্রশাসন (গঙ্গ বর্ষ ৩৯ = ৫৩৫–৫৩৭ খ্রি.)।'
    },
    dateClassificationBreakdown: {
      establishedInscriptional: {
        en: 'c. 350 CE: Allahabad Pillar Inscription of Samudragupta naming Mahendragiri of Pishtapura, Svamidatta of Kottura, Hastivarman of Vengi, and Vishnugopa of Kanchi; 496–498 CE: Epoch of the Eastern Ganga Era (Gangeya Samvatsara); 543 CE (Saka 465): Badami Cliff Inscription of Pulakeshin I.',
        hi: 'लगभग 350 ई.: समुद्रगुप्त का प्रयाग स्तंभ अभिलेख (पिष्टपुर के महेंद्रगिरि, वेंगी के हस्तिवर्मन और कांची के विष्णुगोप का उल्लेख); 496–498 ई.: पूर्वी गंग संवत (गांगेय संवत्सर) का प्रारंभ; 543 ई. (शक 465): पुलकेशिन प्रथम का बादामी शिलालेख।',
        te: 'క్రీ.శ. 350: సముద్రగుప్తుని అలహాబాద్ స్తంభ శాసనం (పిష్టపురం మహేంద్రగిరి, వేంగి హస్తివర్మ, కంచి విష్ణుగోపుని ప్రస్తావన); క్రీ.శ. 496–498: తూర్పు గాంగుల గాంగేయ శకం ప్రారంభం; క్రీ.శ. 543 (శక 465): పులకేశి I బాదామి శాసనం.',
        kn: 'ಕ್ರಿ.ಶ. 350: ಸಮುದ್ರಗುಪ್ತನ ಅಲಹಾಬಾದ್ ಸ್ತಂಭ ಶಾಸನ (ಕಾಂಚಿಯ ವಿಷ್ಣುಗೋಪ, ವೆಂಗಿಯ ಹಸ್ತಿವರ್ಮನ್ ಉಲ್ಲೇಖ); ಕ್ರಿ.ಶ. 496–498: ಪೂರ್ವ ಗಂಗರ ಗಾಂಗೇಯ ಶಕದ ಆರಂಭ; ಕ್ರಿ.ಶ. 543 (ಶಕ 465): ಪುಲಿಕೇಶಿ I ರ ಬಾದಾಮಿ ಶಾಸನ.',
        ta: 'பொ.ஊ. 350: சமுத்திரகுப்தரின் அலகாபாத் தூண் கல்வெட்டு (காஞ்சி விஷ்ணுகோபன், வேங்கி ஹஸ்திவர்மன் குறிப்பு); பொ.ஊ. 496–498: கீழைக் கங்க சகாப்தத் தொடக்கம்; பொ.ஊ. 543 (சக 465): முதலாம் புலிகேசியின் பாதாமி கல்வெட்டு.',
        mr: 'इ.स. ३५०: समुद्रगुप्ताचा प्रयाग स्तंभ शिलालेख (कांचीचा विष्णुगोप, वेंगीचा हस्तिवर्मन यांचा उल्लेख); इ.स. ४९६–४९८: पूर्व गंग संवताची सुरुवात; इ.स. ५४३ (शक ४६५): पुलकेशी पहिल्याचा बदामी शिलालेख.',
        or: '୩୫୦ ଖ୍ରୀ.ଅ.: ସମୁଦ୍ରଗୁପ୍ତଙ୍କ ପ୍ରୟାଗ ସ୍ତମ୍ଭ ଶିଳାଲେଖ (ପିଷ୍ଟପୁରର ମହେନ୍ଦ୍ରଗିରି, କାଞ୍ଚିର ବିଷ୍ଣୁଗୋପ ଉଲ୍ଲେଖ); ୪୯୬–୪୯୮ ଖ୍ରୀ.ଅ.: ପୂର୍ବ ଗଙ୍ଗ ସମ୍ବତ ଆରମ୍ଭ; ୫୪୩ ଖ୍ରୀ.ଅ. (ଶକ ୪୬୫): ପ୍ରଥମ ପୁଲକେଶୀଙ୍କ ବାଦାମୀ ଶିଳାଲେଖ।',
        bn: '৩৫০ খ্রি.: সমুদ্রগুপ্তের এলাহাবাদ স্তম্ভ শিলালিপি (পিষ্টপুরের মহেন্দ্রগিরি, কাঞ্চীর বিষ্ণুগোপের উল্লেখ); ৪৯৬–৪৯৮ খ্রি.: পূর্ব গঙ্গ সম্বতের সূচনা; ৫৪৩ খ্রি. (শক ৪৬৫): প্রথম পুলকেশীর বাদামী শিলালিপি।'
      },
      approximateDynastic: {
        en: 'Andhra Ikshvakus of Vijayapuri (c. 225–325 CE); Early Pallavas of Kanchipuram (from c. 275 CE); Kadambas of Banavasi (c. 345–540 CE); Early Western Gangas of Kolar/Talakad (from c. 350 CE); Matharas of Kalinga (c. 350–498 CE).',
        hi: 'विजयपुरी के आंध्र इक्ष्वाकु (लगभग 225–325 ई.); कांचीपुरम के प्रारंभिक पल्लव (लगभग 275 ई. से); बनवासी के कदंब (लगभग 345–540 ई.); कोलार/तलकाड के प्रारंभिक पश्चिमी गंग (लगभग 350 ई. से); कलिंग के माठर (लगभग 350–498 ई.)।',
        te: 'విజయపురి ఆంధ్ర ఇక్ష్వాకులు (క్రీ.శ. 225–325); కాంచీపురం ప్రారంభ పల్లవులు (క్రీ.శ. 275 నుండి); బనవాసి కదంబులు (క్రీ.శ. 345–540); కోలార్/తలకాడు ప్రారంభ పశ్చిమ గాంగులు (క్రీ.శ. 350 నుండి); కళింగ మాఠరులు (క్రీ.శ. 350–498).',
        kn: 'ವಿಜಯಪುರಿಯ ಆಂಧ್ರ ಇಕ್ಷ್ವಾಕುಗಳು (ಕ್ರಿ.ಶ. 225–325); ಕಾಂಚೀಪುರಂನ ಆರಂಭಿಕ ಪಲ್ಲವರು (ಕ್ರಿ.ಶ. 275 ರಿಂದ); ಬನವಾಸಿಯ ಕದಂಬರು (ಕ್ರಿ.ಶ. 345–540); ತಲಕಾಡಿನ ಆರಂಭಿಕ ಪಶ್ಚಿಮ ಗಂಗರು (ಕ್ರಿ.ಶ. 350 ರಿಂದ); ಕಳಿಂಗದ ಮಾಠರರು (ಕ್ರಿ.ಶ. 350–498).',
        ta: 'விஜயபுரி ஆந்திர இக்ஷ்வாகுகள் (பொ.ஊ. 225–325); காஞ்சிபுரத் தொடக்கப் பல்லவர்கள் (பொ.ஊ. 275 முதல்); பனவாசி கதம்பர்கள் (பொ.ஊ. 345–540); தலக்காடு தொடக்க மேலைக் கங்கர்கள் (பொ.ஊ. 350 முதல்); கலிங்க மாठரர்கள் (பொ.ஊ. 350–498).',
        mr: 'विजयपुरीचे आंध्र इक्ष्वाकू (इ.स. २२५–३२५); कांचीपुरमचे प्रारंभिक पल्लव (इ.स. २७५ पासून); बनवासीचे कदंब (इ.स. ३४५–५४०); तलकाडचे प्रारंभिक पश्चिम गंग (इ.स. ३५० पासून); कलिंगचे माठर (इ.स. ३५०–४९८).',
        or: 'ବିଜୟପୁରୀର ଆନ୍ଧ୍ର ଇକ୍ଷ୍ୱାକୁ (୨୨୫–୩୨୫ ଖ୍ରୀ.ଅ.); କାଞ୍ଚିପୁରମର ପ୍ରାରମ୍ଭିକ ପଲ୍ଲବ (୨୭୫ ଖ୍ରୀ.ଅ.ରୁ); ବନବାସୀର କଦମ୍ବ (୩୪୫–୫୪୦ ଖ୍ରୀ.ଅ.); ତଳକାଡ଼ର ପ୍ରାରମ୍ଭିକ ପଶ୍ଚିମ ଗଙ୍ଗ (୩୫୦ ଖ୍ରୀ.ଅ.ରୁ); କଳିଙ୍ଗର ମାଠର (୩୫୦–୪୯୮ ଖ୍ରୀ.ଅ.)।',
        bn: 'বিজয়পুরীর অন্ধ্র ইক্ষ্বাকু (২২৫–৩২৫ খ্রি.); কাঞ্চীপুরমের প্রারମ୍ଭিক পল্লব (২৭৫ খ্রি. থেকে); বনবাসীর কদম্ব (৩৪৫–৫৪০ খ্রি.); তলকাড়ের প্রারମ୍ଭিক পশ্চিম গঙ্গ (৩৫০ খ্রি. থেকে); কলিঙ্গের মাঠর (৩৫০–৪৯৮ খ্রি.)।'
      },
      disputedInterpretations: {
        en: 'Authenticity of certain Western Ganga copper plates claiming 2nd/3rd-century Saka dates (e.g., Mercara plates), demonstrated by J.F. Fleet and K.V. Ramesh to be 8th/9th-century copies of earlier grants; exact Kalabhra chronology in Tamilakam (c. 300–575 CE).',
        hi: 'द्वितीय/तृतीय शताब्दी शक तिथि का दावा करने वाले कुछ पश्चिमी गंग ताम्रपत्रों (जैसे मर्करा ताम्रपत्र) की प्रामाणिकता, जिन्हें जे.एफ. फ्लीट और के.वी. रमेश ने परवर्ती प्रतिलिपि सिद्ध किया; तमिलकम में कलभ्र काल का सटीक विस्तार (लगभग 300–575 ई.)।',
        te: '2వ/3వ శతాబ్ది శక తేదీలను పేర్కొనే కొన్ని పశ్చిమ గాంగ తామ్రపత్రాల (ఉదా. మెర్కారా పత్రాలు) ప్రామాణికతపై జె.ఎఫ్. ఫ్లీట్ మరియు కె.వి. రమేష్ విశ్లేషణ; తమిళకంలో కలభ్రుల కాలక్రమం (క్రీ.శ. 300–575).',
        kn: '2–3ನೇ ಶತಮಾನದ ಶಕ ದಿನಾಂಕಗಳನ್ನು ಉಲ್ಲೇಖಿಸುವ ಕೆಲವು ಪಶ್ಚಿಮ ಗಂಗ ತಾಮ್ರಪತ್ರಗಳ ಕುರಿತು ಜೆ.ಎಫ್. ಫ್ಲೀಟ್ ಮತ್ತು ಕೆ.ವಿ. ರಮೇಶ್ ಅವರ ಶಾಸನ ಪರಿಶೀಲನೆ; ತಮಿಳகಂನಲ್ಲಿ ಕಳಭ್ರರ ನಿಖರ ಕಾಲಗಣನೆ (ಕ್ರಿ.ಶ. 300–575).',
        ta: '2–3-ஆம் நூற்றாண்டு சக தேதிகளைக் குறிப்பிடும் சில மேலைக் கங்கச் செப்பேடுகள் குறித்த ஜே.எஃப். ஃப்ளீட் மற்றும் கே.வி. ரமேஷ் ஆய்வு; தமிழகத்தில் களப்பிரர் காலக்கணக்கு (பொ.ஊ. 300–575).',
        mr: '२ ऱ्या/३ ऱ्या शतकातील शक तारखा सांगणाऱ्या काही पश्चिम गंग ताम्रपटांबाबत जे.एफ. फ्लीट आणि के.व्ही. रमेश यांचे संशोधन; तमिळकममधील कलभ्र कालखंड (इ.स. ३००–५७५).',
        or: '୨ୟ/୩ୟ ଶତାବ୍ଦୀ ଶକ ତାରିଖ ଦାବି କରୁଥିବା କେତେକ ପଶ୍ଚିମ ଗଙ୍ଗ ତାମ୍ରପଟା ଉପରେ ଜେ.ଏଫ. ଫ୍ଲିଟ ଓ କେ.ଭି. ରମେଶଙ୍କ ସମୀକ୍ଷା; ତାମିଲକମରେ କଳଭ୍ର କାଳକ୍ରମ (୩୦୦–୫୭୫ ଖ୍ରୀ.ଅ.)।',
        bn: '২য়/৩য় শতাব্দীর শক তারিখ দাবি করা কিছু পশ্চিম গঙ্গ তাম্রশাসন সম্পর্কে জে.এফ. ফ্লিট ও কে.ভি. রমেশের পর্যালোচনা; তামিলকমে কলভ্র কালক্রম (৩০০–৫৭৫ খ্রি.)।'
      },
      traditionalClaims: {
        en: 'Mayurasharman’s Vedic-to-Kshatriya transition at Kanchipuram in the Talagunda Pillar Inscription; Konganivarman’s consecration by Jain Acharya Simhanandi in Western Ganga tradition.',
        hi: 'तालगुंडा स्तंभ शिलालेख में कांचीपुरम में मयूरशर्मा के ब्रह्म-क्षत्रिय रूपांतरण का विवरण; पश्चिमी गंग परंपरा में जैन आचार्य सिंहनंदी द्वारा कोंगणिवर्मन के अभिषेक की कथा।',
        te: 'తాలగుండ స్తంభ శాసనంలో కాంచీపురంలో మయూరశర్మ బ్రాహ్మణ-క్షత్రియ పరివర్తన గాథ; పశ్చిమ గాంగ సంప్రదాయంలో జైన ఆచార్య సింహనంది ఆశీస్సులతో కొంగణివర్మ రాజ్యస్థాపన.',
        kn: 'ತಾಳಗುಂದ ಸ್ತಂಭ ಶಾಸನದಲ್ಲಿ ಮಯೂರಶರ್ಮನ ಬ್ರಹ್ಮ-ಕ್ಷತ್ರಿಯ ಪರಿವರ್ತನೆಯ ವಿವರ; ಜೈನ ಆಚಾರ್ಯ ಸಿಂಹನಂದಿಯವರ ಆಶೀರ್ವಾದದಿಂದ ಕೊಂಗಣಿವರ್ಮನ ಗಂಗ ರಾಜ್ಯ ಸ್ಥಾಪನೆ.',
        ta: 'தாளகுந்தா தூண் கல்வெட்டில் மயூரசர்மனின் பிரம்ம-க்ஷத்ரிய மாற்றம்; சமண ஆச்சாரியர் சிம்மநந்தியின் ஆசியுடன் கொங்கணிவர்மன் மேலைக் கங்க அரசை நிறுவிய மரபு.',
        mr: 'तालगुंडा स्तंभ शिलालेखातील मयूरशर्माच्या ब्रह्म-क्षत्रिय रूपांतरणाची कथा; जैन आचार्य सिंहनंदी यांच्या आशीर्वादाने कोंगणिवर्मनची राज्यस्थापना.',
        or: 'ତାଳଗୁଣ୍ଡା ସ୍ତମ୍ଭ ଶିଳାଲେଖରେ ମୟୂରଶର୍ମାଙ୍କ ବ୍ରହ୍ମ-କ୍ଷତ୍ରିୟ ରୂପାନ୍ତର ବିବରଣୀ; ଜୈନ ଆଚାର୍ଯ୍ୟ ସିଂହନନ୍ଦୀଙ୍କ ଆଶୀର୍ବାଦରେ କୋଙ୍ଗଣିବର୍ମନଙ୍କ ରାଜ୍ୟ ସ୍ଥାପନ ପରମ୍ପରା।',
        bn: 'তালগুন্ডা স্তম্ভ শিলালিপিতে ময়ূরশর্মার ব্রহ্ম-ক্ষত্রিয় রূপান্তরের বিবরণ; জৈন আচার্য সিংহনন্দীর আশীর্বাদে কোঙ্গণিবর্মণের রাজ্য স্থাপনের ঐতিহ্য।'
      }
    },
    parallelTracks: [
      {
        corridorId: 'track_s4_kalinga_odra',
        corridorLabel: {
          en: 'Kalinga–Utkala–Kosala Corridor',
          hi: 'कलिंग–उत्कल–कोसल गलियारा',
          te: 'కళింగ–ఉత్కళ–కోసల ప్రాంతం',
          kn: 'ಕಳಿಂಗ–ಉತ್ಕಲ–ಕೋಸಲ ವಲಯ',
          ta: 'கலிங்க–உத்கல–கோசல மண்டலம்',
          mr: 'कलिंग–उत्कल–कोसल पट्टा',
          or: 'କଳିଙ୍ଗ–ଉତ୍କଳ–କୋଶଳ ଅଞ୍ଚଳ',
          bn: 'কলিঙ্গ–উৎকল–কোশল অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Matharas of Pishtapura & Simhapura (c. 350–498 CE) → Early Eastern Gangas of Kalinganagara/Mukhalingam under Indravarman I (from 496–498 CE; continues to 1434 CE)',
          hi: 'पिष्टपुर एवं सिंहपुर के माठर (लगभग 350–498 ई.) → इंद्रवर्मन प्रथम के अधीन कलिंगनगर/मुखलिंगम के प्रारंभिक पूर्वी गंग (496–498 ई. से प्रारंभ; 1434 ई. तक निरंतर)',
          te: 'పిష్టపురం & సింహపురం మాఠరులు (క్రీ.శ. 350–498) → ఇంద్రవర్మ I క్రింద కళింగనగరం/ముఖలింగం ప్రారంభ తూర్పు గాంగులు (క్రీ.శ. 496–498 నుండి 1434 వరకు నిరంతర పాలన)',
          kn: 'ಪಿಷ್ಟಪುರ ಮತ್ತು ಸಿಂಹಪುರದ ಮಾಠರರು (ಕ್ರಿ.ಶ. 350–498) → ಇಂದ್ರವರ್ಮನ್ I ರ ಅಡಿಯಲ್ಲಿ ಕಳಿಂಗನಗರದ ಆರಂಭಿಕ ಪೂರ್ವ ಗಂಗರು (ಕ್ರಿ.ಶ. 496–498 ರಿಂದ 1434 ರವರೆಗೆ ನಿರಂತರ)',
          ta: 'பிஷ்டபுரம் & சிம்மபுர மாठரர்கள் (பொ.ஊ. 350–498) → முதலாம் இந்திரவர்மன் கீழ் கலிங்கநகரத் தொடக்க கீழைக் கங்கர்கள் (பொ.ஊ. 496–498 முதல் 1434 வரை தொடர்ச்சி)',
          mr: 'पिष्टपूर व सिंहपूरचे माठर (इ.स. ३५०–४९८) → इंद्रवर्मन पहिल्याच्या अधिपत्याखाली कलिंगनगरचे प्रारंभिक पूर्व गंग (इ.स. ४९६–४९८ पासून १४३४ पर्यंत अखंड)',
          or: 'ପିଷ୍ଟପୁର ଓ ସିଂହପୁରର ମାଠର (୩୫୦–୪୯୮ ଖ୍ରୀ.ଅ.) → ପ୍ରଥମ ଇନ୍ଦ୍ରବର୍ମନଙ୍କ ଅଧୀନରେ କଳିଙ୍ଗନଗରର ପ୍ରାରମ୍ଭିକ ପୂର୍ବ ଗଙ୍ଗ (୪୯୬–୪୯୮ ରୁ ୧୪୩୪ ଖ୍ରୀ.ଅ. ପର୍ଯ୍ୟନ୍ତ ନିରନ୍ତର)',
          bn: 'পিষ্টপুর ও সিংহপুরের মাঠর (৩৫০–৪৯৮ খ্রি.) → প্রথম ইন্দ্রবর্মণের অধীনে কলিঙ্গনগরের প্রারମ୍ଭিক পূর্ব গঙ্গ (৪৯৬–৪৯৮ থেকে ১৪৩৪ খ্রি. পর্যন্ত নিরবচ্ছিন্ন)'
        },
        dateSpan: 'c. 350 – 600 CE (Eastern Gangas continue to 1434 CE)',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Jirjingi Copper Plates of Indravarman I (Ganga Year 39 = c. 535–537 CE, EI Vol. XXV)'
      },
      {
        corridorId: 'track_s4_vengi_andhra',
        corridorLabel: {
          en: 'Vengi–Andhradesha Corridor',
          hi: 'वेंगी–आंध्रदेश गलियारा',
          te: 'వేంగి–ఆంధ్రదేశ ప్రాంతం',
          kn: 'ವೆಂಗಿ–ಆಂಧ್ರದೇಶ ವಲಯ',
          ta: 'வேங்கி–ஆந்திர மண்டலம்',
          mr: 'वेंगी–आंध्रदेश पट्टा',
          or: 'ବେଙ୍ଗୀ–ଆନ୍ଧ୍ରଦେଶ ଅଞ୍ଚଳ',
          bn: 'বেঙ্গী–অন্ধ্রদেশ অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Andhra Ikshvakus of Vijayapuri (c. 225–325 CE) → Brihatphalayanas & Salankayanas of Vengi (c. 300–440 CE) → Vishnukundins of Indrapalanagara & Denduluru (c. 420–624 CE)',
          hi: 'विजयपुरी के आंध्र इक्ष्वाकु (लगभग 225–325 ई.) → वेंगी के शालंकायन (लगभग 300–440 ई.) → इंद्रपालनगर एवं देंदुलुरु के विष्णुकुंडिन (लगभग 420–624 ई.)',
          te: 'విజయపురి ఆంధ్ర ఇక్ష్వాకులు (క్రీ.శ. 225–325) → వేంగి శాలంకాయనులు (క్రీ.శ. 300–440) → ఇంద్రపాలనగరం & దెందులూరు విష్ణుకుండినులు (క్రీ.శ. 420–624)',
          kn: 'ವಿಜಯಪುರಿಯ ಆಂಧ್ರ ಇಕ್ಷ್ವಾಕುಗಳು (ಕ್ರಿ.ಶ. 225–325) → ವೆಂಗಿಯ ಶಾಲಂಕಾಯನರು (ಕ್ರಿ.ಶ. 300–440) → ವಿಷ್ಣುಕುಂಡಿನರು (ಕ್ರಿ.ಶ. 420–624)',
          ta: 'விஜயபுரி ஆந்திர இக்ஷ்வாகுகள் (பொ.ஊ. 225–325) → வேங்கி சாலங்காயனர்கள் (பொ.ஊ. 300–440) → விஷ்ணுகுண்டினர்கள் (பொ.ஊ. 420–624)',
          mr: 'विजयपुरीचे आंध्र इक्ष्वाकू (इ.स. २२५–३२५) → वेंगीचे शालंकायन (इ.स. ३००–४४०) → विष्णुकुंडिन (इ.स. ४२०–६२४)',
          or: 'ବିଜୟପୁରୀର ଆନ୍ଧ୍ର ଇକ୍ଷ୍ୱାକୁ (୨୨୫–୩୨୫ ଖ୍ରୀ.ଅ.) → ବେଙ୍ଗୀର ଶାଳଙ୍କାୟନ (୩୦୦–୪୪୦ ଖ୍ରୀ.ଅ.) → ବିଷ୍ଣୁକୁଣ୍ଡିନ (୪୨୦–୬୨୪ ଖ୍ରୀ.ଅ.)',
          bn: 'বিজয়পুরীর অন্ধ্র ইক্ষ্বাকু (২২৫–৩২৫ খ্রি.) → বেঙ্গীর শালঙ্কায়ন (৩০০–৪৪০ খ্রি.) → বিষ্ণুকুণ্ডিন (৪২০–৬২৪ খ্রি.)'
        },
        dateSpan: 'c. 225 – 624 CE',
        dateType: 'Approximate Reign',
        epigraphicAnchor: 'Nagarjunakonda Prakrit Epigraphs (EI Vol. XX); Tummalagudem Vishnukundin Plates'
      },
      {
        corridorId: 'track_s4_karnata_deccan',
        corridorLabel: {
          en: 'Karnata–Deccan Corridor',
          hi: 'कर्णाट–दक्कन गलियारा',
          te: 'కర్ణాట–దక్కన్ ప్రాంతం',
          kn: 'ಕರ್ಣಾಟ–ದಕ್ಕನ್ ವಲಯ',
          ta: 'கர்நாடக–தக்காண மண்டலம்',
          mr: 'कर्णाट–दख्खन पट्टा',
          or: 'କର୍ଣ୍ଣାଟ–ଦక్కନ ଅଞ୍ଚଳ',
          bn: 'কর্ণাট–দাক্ষিণাত্য অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Kadambas of Banavasi (c. 345–540 CE, Mayurasharman to Harivarman) & Western Gangas of Kolar/Talakad (from c. 350 CE, Konganivarman to Durvinita; continues to 1000 CE); Rise of Badami Chalukyas in 543 CE',
          hi: 'बनवासी के कदंब (लगभग 345–540 ई., मयूरशर्मा से हरिवर्मन) एवं तलकाड के पश्चिमी गंग (लगभग 350 ई. से 1000 ई. तक निरंतर); 543 ई. में बादामी चालुक्यों का उदय',
          te: 'బనవాసి కదంబులు (క్రీ.శ. 345–540, మయూరశర్మ నుండి హరివర్మ వరకు) & తలకాడు పశ్చిమ గాంగులు (క్రీ.శ. 350 నుండి 1000 వరకు నిరంతరం); క్రీ.శ. 543లో బాదామి చాళుక్యుల ఆవిర్భావం',
          kn: 'ಬನವಾಸಿಯ ಕದಂಬರು (ಕ್ರಿ.ಶ. 345–540, ಮಯೂರಶರ್ಮನಿಂದ ಹರಿವರ್ಮನವರೆಗೆ) ಮತ್ತು ತಲಕಾಡಿನ ಪಶ್ಚಿಮ ಗಂಗರು (ಕ್ರಿ.ಶ. 350 ರಿಂದ 1000 ರವರೆಗೆ ನಿರಂತರ); ಕ್ರಿ.ಶ. 543 ರಲ್ಲಿ ಬಾದಾಮಿ ಚಾಳುಕ್ಯರ ಉದಯ',
          ta: 'பனவாசி கதம்பர்கள் (பொ.ஊ. 345–540, மயூரசர்மன் முதல் ஹரிவர்மன் வரை) & தலக்காடு மேலைக் கங்கர்கள் (பொ.ஊ. 350 முதல் 1000 வரை தொடர்ச்சி); பொ.ஊ. 543-இல் பாதாமி சாளுக்கியர் எழுச்சி',
          mr: 'बनवासीचे कदंब (इ.स. ३४५–५४०, मयूरशर्मा ते हरिवर्मन) व तलकाडचे पश्चिम गंग (इ.स. ३५० ते १००० पर्यंत अखंड); इ.स. ५४३ मध्ये बदामी चालुक्यांचा उदय',
          or: 'ବନବାସୀର କଦମ୍ବ (୩୪୫–୫୪୦ ଖ୍ରୀ.ଅ.) ଓ ତଳକାଡ଼ର ପଶ୍ଚିମ ଗଙ୍ଗ (୩୫୦ ରୁ ୧୦୦୦ ଖ୍ରୀ.ଅ. ପର୍ଯ୍ୟନ୍ତ ନିରନ୍ତର); ୫୪୩ ଖ୍ରୀ.ଅ.ରେ ବାଦାମୀ ଚାଲୁକ୍ୟଙ୍କ ଉଦୟ',
          bn: 'বনবাসীর কদম্ব (৩৪৫–৫৪০ খ্রি.) ও তলকাড়ের পশ্চিম গঙ্গ (৩৫০ থেকে ১০০০ খ্রি. পর্যন্ত নিরবচ্ছিন্ন); ৫৪৩ খ্রিস্টাব্দে বাদামী চালুক্যদের উত্থান'
        },
        dateSpan: 'c. 345 – 540/600 CE (Western Gangas continue to 1000 CE)',
        dateType: 'Approximate Reign',
        epigraphicAnchor: 'Talagunda Pillar Inscription (EI Vol. VIII); Halmidi Inscription (c. 450 CE); Penukonda Plates (EI Vol. XIV)'
      },
      {
        corridorId: 'track_s4_tondaimandalam',
        corridorLabel: {
          en: 'Tondaimandalam–Kanchipuram Corridor',
          hi: 'तोंडैमंडलम–कांचीपुरम गलियारा',
          te: 'తొండైమండలం–కాంచీపురం ప్రాంతం',
          kn: 'ತೊಂಡೈಮಂಡಲಂ–ಕಾಂಚೀಪುರಂ ವಲಯ',
          ta: 'தொண்டைமண்டலம்–காஞ்சிபுரம் மண்டலம்',
          mr: 'तोंडैमंडलम–कांचीपुरम पट्टा',
          or: 'ତୋଣ୍ଡୈମଣ୍ଡଳମ–କାଞ୍ଚିପୁରମ ଅଞ୍ଚଳ',
          bn: 'তোণ্ডৈমণ্ডলম–কাঞ্চীপুরম অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Early Pallavas of Kanchipuram (Prakrit & Sanskrit Charter Lines: Simhavarman I, Sivaskandavarman, Vishnugopa; c. 275–575 CE → transitions to Imperial Simhavishnu Line c. 575–897 CE)',
          hi: 'कांचीपुरम के प्रारंभिक पल्लव (प्राकृत एवं संस्कृत ताम्रपत्र शाखा: सिंहवर्मन प्रथम, शिवस्कंदवर्मन, विष्णुगोप; लगभग 275–575 ई. → सिंहविष्णु की साम्राज्यिक शाखा में संक्रमण लगभग 575–897 ई.)',
          te: 'కాంచీపురం ప్రారంభ పల్లవులు (ప్రాకృత & సంస్కృత తామ్రశాసన శాఖ: సింహవర్మ I, శివస్కందవర్మ, విష్ణుగోపుడు; క్రీ.శ. 275–575 → సింహవిష్ణు సామ్రాజ్య శాఖగా క్రీ.శ. 897 వరకు కొనసాగింపు)',
          kn: 'ಕಾಂಚೀಪುರಂನ ಆರಂಭಿಕ ಪಲ್ಲವರು (ಪ್ರಾಕೃತ ಮತ್ತು ಸಂಸ್ಕೃತ ತಾಮ್ರಪತ್ರ ಶಾಖೆ: ಸಿಂಹವರ್ಮನ್ I, ಶಿವಸ್ಕಂದವರ್ಮನ್, ವಿಷ್ಣುಗೋಪ; ಕ್ರಿ.ಶ. 275–575 → ಸಿಂಹವಿಷ್ಣುವಿನ ಸಾಮ್ರಾಜ್ಯ ಶಾಖೆಯಾಗಿ ಕ್ರಿ.ಶ. 897 ರವರೆಗೆ ಮುಂದುವರಿಕೆ)',
          ta: 'காஞ்சிபுரத் தொடக்கப் பல்லவர்கள் (பிராகிருத & சமஸ்கிருதச் செப்பேட்டு மரபு: முதலாம் சிம்மவர்மன், சிவஸ்கந்தவர்மன், விஷ்ணுகோபன்; பொ.ஊ. 275–575 → சிம்மவிஷ்ணு மரபாக பொ.ஊ. 897 வரை தொடர்ச்சி)',
          mr: 'कांचीपुरमचे प्रारंभिक पल्लव (प्राकृत व संस्कृत ताम्रपट शाखा: सिंहवर्मन पहिला, शिवस्कंदवर्मन, विष्णुगोप; इ.स. २७५–५७५ → सिंहविष्णू शाखेतून इ.स. ८९७ पर्यंत अखंड)',
          or: 'କାଞ୍ଚିପୁରମର ପ୍ରାରମ୍ଭିକ ପଲ୍ଲବ (ସିଂହବର୍ମନ ପ୍ରଥମ, ଶିବସ୍କନ୍ଦବର୍ମନ, ବିଷ୍ଣୁଗୋପ; ୨୭୫–୫୭୫ ଖ୍ରୀ.ଅ. → ସିଂହବିଷ୍ଣୁ ଶାଖା ଭାବେ ୮୯୭ ଖ୍ରୀ.ଅ. ପର୍ଯ୍ୟନ୍ତ ନିରନ୍ତର)',
          bn: 'কাঞ্চীপুরমের প্রারମ୍ଭিক পল্লব (প্রথম সিংহবর্মণ, শিবস্কন্দবর্মণ, বিষ্ণুগোপ; ২৭৫–৫৭৫ খ্রি. → সিংহবিষ্ণু শাখা হিসেবে ৮৯৭ খ্রি. পর্যন্ত নিরবচ্ছিন্ন)'
        },
        dateSpan: 'c. 275 – 575 CE (Continues to 897 CE)',
        dateType: 'Approximate Reign',
        epigraphicAnchor: 'Mayidavolu & Hirahadagalli Prakrit Plates (EI Vol. I & VI); Allahabad Pillar Inscription (c. 350 CE)'
      }
    ],
    keyMonumentsAndInscriptions: ['Talagunda Pillar Inscription (EI Vol. VIII)', 'Halmidi Inscription (c. 450 CE)', 'Jirjingi Copper Plates of Indravarman I (Ganga Year 39)', 'Mayidavolu & Penukonda Copper Plates'],
    linkedArticleIds: ['art_dyn_kadambas_banavasi', 'art_dyn_western_gangas', 'art_dyn_pallavas_kanchi', 'art_dyn_eastern_gangas'],
    linkedEventIds: []
  },
  {
    stageOrder: 5,
    id: 'stage_05_medieval_kingdoms',
    refNumber: 'HT-0006',
    stageCode: 'MEDIEVAL_KINGDOMS',
    title: {
      en: 'Stage 5: Early & Classical Medieval Kingdoms — Badami Chalukyas, Vengi Chalukyas, Imperial Pallavas, Western Gangas & Somavamshis (543 – 1070 CE)',
      hi: 'चरण 5: प्रारंभिक एवं शास्त्रीय मध्यकालीन राज्य — बादामी चालुक्य, वेंगी चालुक्य, पल्लव, पश्चिमी गंग एवं सोमवंशी (543 – 1070 ई.)',
      te: 'దశ 5: ప్రారంభ & శాస్త్రీయ మధ్యయుగ రాజ్యాలు — బాదామి చాళుక్యులు, వేంగి చాళుక్యులు, పల్లవులు, పశ్చిమ గాంగులు & సోమవంశీయులు (క్రీ.శ. 543 – 1070)',
      kn: 'ಹಂತ 5: ಆರಂಭಿಕ ಮತ್ತು ಶಾಸ್ತ್ರೀಯ ಮಧ್ಯಕಾಲೀನ ರಾಜ್ಯಗಳು — ಬಾದಾಮಿ ಚಾಳುಕ್ಯರು, ವೆಂಗಿ ಚಾಳುಕ್ಯರು, ಪಲ್ಲವರು, ಪಶ್ಚಿಮ ಗಂಗರು ಮತ್ತು ಸೋಮವಂಶಿಗಳು (ಕ್ರಿ.ಶ. 543 – 1070)',
      ta: 'நிலை 5: தொடக்க & செவ்வியல் இடைக்கால அரசுகள் — பாதாமி சாளுக்கியர்கள், வேங்கிச் சாளுக்கியர்கள், பல்லவர்கள், மேலைக் கங்கர்கள் & சோமவம்சத்தினர் (பொ.ஊ. 543 – 1070)',
      mr: 'टप्पा 5: प्रारंभिक व अभिजात मध्ययुगीन राज्ये — बदामी चालुक्य, वेंगी चालुक्य, पल्लव, पश्चिम गंग आणि सोमवंशी (इ.स. ५४३ – १०७०)',
      or: 'ପର୍ଯ୍ୟାୟ ୫: ପ୍ରାରମ୍ଭିକ ଓ ଶାସ୍ତ୍ରୀୟ ମଧ୍ୟଯୁଗୀୟ ରାଜ୍ୟ — ବାଦାମୀ ଚାଲୁକ୍ୟ, ବେଙ୍ଗୀ ଚାଲୁକ୍ୟ, ପଲ୍ଲବ, ପଶ୍ଚିମ ଗଙ୍ଗ ଓ ସୋମବଂଶୀ (୫୪୩ – ୧୦୭୦ ଖ୍ରୀ.ଅ.)',
      bn: 'পর্যায় ৫: প্রারম্ভিক ও ধ্রুপদী মধ্যযুগীয় রাজ্যসমূহ — বাদামী চালুক্য, বেঙ্গী চালুক্য, পল্লব, পশ্চিম গঙ্গ ও সোমবংশী (৫৪৩ – ১০৭০ খ্রি.)'
    },
    approxDateLabel: {
      en: '543 CE (Badami Fortification Inscription of Pulakeshin I, Saka 465) – 1070 CE (Chola-Chalukya Union of Vengi)',
      hi: '543 ई. (पुलकेशिन प्रथम का बादामी दुर्ग शिलालेख, शक 465) – 1070 ई. (चोल-चालुक्य वेंगी संघ)',
      te: 'క్రీ.శ. 543 (పులకేశి I బాదామి కోట శాసనం, శక 465) – క్రీ.శ. 1070 (చోళ-చాళుక్య వేంగి విలీనం)',
      kn: 'ಕ್ರಿ.ಶ. 543 (ಮೊದಲ ಪುಲಿಕೇಶಿಯ ಬಾದಾಮಿ ಕೋಟೆ ಶಾಸನ, ಶಕ 465) – ಕ್ರಿ.ಶ. 1070 (ಚೋಳ-ಚಾಳುಕ್ಯ ವೆಂಗಿ ಒಕ್ಕೂಟ)',
      ta: 'பொ.ஊ. 543 (முதலாம் புலிகேசியின் பாதாமி கோட்டைக் கல்வெட்டு, சக 465) – பொ.ஊ. 1070 (சோழ-சாளுக்கிய வேங்கி இணைப்பு)',
      mr: 'इ.स. ५४३ (पुलकेशी पहिल्याचा बदामी किल्ला शिलालेख, शक ४६५) – इ.स. १०७० (चोल-चालुक्य वेंगी एकत्रीकरण)',
      or: '୫୪୩ ଖ୍ରୀ.ଅ. (ପ୍ରଥମ ପୁଲକେଶୀଙ୍କ ବାଦାମୀ ଦୁର୍ଗ ଶିଳାଲେଖ, ଶକ ୪୬୫) – ୧୦୭୦ ଖ୍ରୀ.ଅ. (ଚୋଳ-ଚାଲୁକ୍ୟ ବେଙ୍ଗୀ ମିଳନ)',
      bn: '৫৪৩ খ্রি. (প্রথম পুলকেশীর বাদামী দুর্গ শিলালিপি, শক ৪৬৫) – ১০৭০ খ্রি. (চোল-চালুক্য বেঙ্গী মিলন)'
    },
    chronologicalUncertaintyNote: {
      en: 'Anchored by Saka 465 (543 CE) Badami Cliff Inscription and Saka 556 (634 CE) Aihole Prasasti of Ravikirti. Vengi Chalukya inception under Kubja Vishnuvardhana is fixed at c. 624 CE; Western Gangas continue from Stage 4 until 1000 CE.',
      hi: 'शक संवत 465 (543 ई.) के बादामी शिलालेख और शक 556 (634 ई.) की ऐहोले प्रशस्ति द्वारा प्रमाणित। कुब्ज विष्णुवर्धन के अधीन वेंगी चालुक्य शाखा का प्रारंभ लगभग 624 ई. में निर्धारित है; पश्चिमी गंग 1000 ई. तक निरंतर रहे।',
      te: 'శక 465 (క్రీ.శ. 543) బాదామి శాసనం మరియు శక 556 (క్రీ.శ. 634) రవికీర్తి ఐహోole ప్రశస్తి ద్వారా నిర్ధారించబడింది. కుబ్జ విష్ణువర్ధనుని వేంగి చాళుక్య పాలన క్రీ.శ. 624లో ప్రారంభమైంది; పశ్చిమ గాంగులు క్రీ.శ. 1000 వరకు కొనసాగారు.',
      kn: 'ಶಕ 465 (ಕ್ರಿ.ಶ. 543) ಬಾದಾಮಿ ಬಂಡೆ ಶಾಸನ ಮತ್ತು ಶಕ 556 (ಕ್ರಿ.ಶ. 634) ರವಿಕೀರ್ತಿಯ ಐಹೊಳೆ ಪ್ರಶಸ್ತಿಯಿಂದ ದೃಢಪಟ್ಟಿದೆ. ಕುಬ್ಜ ವಿಷ್ಣುವರ್ಧನನ ವೆಂಗಿ ಚಾಳುಕ್ಯ ಆಳ್ವಿಕೆ ಕ್ರಿ.ಶ. 624ರಲ್ಲಿ ಆರಂಭವಾಯಿತು; ಪಶ್ಚಿಮ ಗಂಗರು ಕ್ರಿ.ಶ. 1000ರವರೆಗೆ ಮುಂದುವರಿದರು.',
      ta: 'சக ஆண்டு 465 (பொ.ஊ. 543) பாதாமி கல்வெட்டு மற்றும் சக 556 (பொ.ஊ. 634) ஐஹோole பிரசஸ்தி மூலம் உறுதிப்படுத்தப்பட்டது. குப்ஜ விஷ்ணுவர்தனனின் வேங்கிச் சாளுக்கிய ஆட்சி பொ.ஊ. 624-இல் தொடங்கியது; மேலைக் கங்கர்கள் பொ.ஊ. 1000 வரை தொடர்ந்தனர்.',
      mr: 'शक ४६५ (इ.स. ५४३) बदामी शिलालेख आणि शक ५५६ (इ.स. ६३४) ऐहोळे प्रशस्तीद्वारे निश्चित. कुब्ज विष्णुवर्धनच्या अधिपत्याखाली वेंगी चालुक्य राजवट इ.स. ६२४ मध्ये सुरू झाली; पश्चिम गंग इ.स. १००० पर्यंत राहिले.',
      or: 'ଶକ ୪୬୫ (୫୪୩ ଖ୍ରୀ.ଅ.) ବାଦାମୀ ଶିଳାଲେଖ ଓ ଶକ ୫୫୬ (୬୩୪ ଖ୍ରୀ.ଅ.) ଆଇହୋole ପ୍ରଶସ୍ତି ଦ୍ୱାରା ପ୍ରମାଣିତ। କୁବ୍ଜ ବିଷ୍ଣୁବର୍ଦ୍ଧନଙ୍କ ବେଙ୍ଗୀ ଚାଲୁକ୍ୟ ଶାସନ ୬୨୪ ଖ୍ରୀ.ଅ.ରେ ଆରମ୍ଭ ହେଲା; ପଶ୍ଚିମ ଗଙ୍ଗ ୧୦୦୦ ଖ୍ରୀ.ଅ. ପର୍ଯ୍ୟନ୍ତ ରହିଥିଲେ।',
      bn: 'শক ৪৬৫ (৫৪৩ খ্রি.) বাদামী শিলালিপি ও শক ৫৫৬ (৬৩৪ খ্রি.) আইহোল প্রশস্তি দ্বারা প্রমাণিত। কুব্জ বিষ্ণুবর্ধনের বেঙ্গী চালুক্য শাসন ৬২৪ খ্রি. শুরু হয়; পশ্চিম গঙ্গরা ১০০০ খ্রি. পর্যন্ত অব্যাহত ছিল।'
    },
    epistemicLabel: {
      en: 'Verified Saka-Dated Stone & Copper-Plate Epigraphy',
      hi: 'सत्यापित शक-तिथियुक्त शिलालेख एवं ताम्रपत्र',
      te: 'ధృవీకరించబడిన శక-తేదీ శిలా & తామ్ర శాసనాలు',
      kn: 'ದೃಢೀಕೃತ ಶಕ-ದಿನಾಂಕದ ಶಿಲಾ ಮತ್ತು ತಾಮ್ರ ಶಾಸನಗಳು',
      ta: 'உறுதிப்படுத்தப்பட்ட சக ஆண்டு கல்வெட்டுகள் & செப்பேடுகள்',
      mr: 'सत्यापित शक-दिनांकित शिलालेख आणि ताम्रपट',
      or: 'ପ୍ରମାଣିତ ଶକ-ତାରିଖ ଶିଳା ଓ ତାମ୍ର ଶାସନ',
      bn: 'প্রমাণিত শক-তারিখযুক্ত শিলা ও তাম্রশাসন'
    },
    epistemicTier: 'verified_historical',
    symbolicIllustration: ARCHIVE_IMG('draksharama_temple.jpg'),
    illustrationCaption: {
      en: 'Bhimesvara Temple at Draksharama (Pancharama Kshetra), built under Eastern (Vengi) Chalukya King Chalukya Bhima I and enriched by Imperial Ganga and Gajapathi inscriptions.',
      hi: 'द्राक्षाराम का भीमेश्वर मंदिर (पंचाराम क्षेत्र), जिसका निर्माण पूर्वी (वेंगी) चालुक्य राजा चालुक्य भीम प्रथम ने कराया और जहाँ गंग तथा गजपति शिलालेख अंकित हैं।',
      te: 'తూర్పు (వేంగి) చాళుక్య రాజు చాళుక్య భీమ I నిర్మించిన ద్రాక్షారామ భీమేశ్వర ఆలయం (పంచారామ క్షేత్రం)—ఇక్కడ తూర్పు గాంగ మరియు గజపతి శాసనాలు ఉన్నాయి.',
      kn: 'ಪೂರ್ವ (ವೆಂಗಿ) ಚಾಳುಕ್ಯ ರಾಜ ಚಾಳುಕ್ಯ ಭೀಮ I ನಿರ್ಮಿಸಿದ ದ್ರಾಕ್ಷಾರಾಮದ ಭೀಮೇಶ್ವರ ದೇವಾಲಯ—ಇಲ್ಲಿ ಗಂಗ ಮತ್ತು ಗಜಪತಿ ಶಾಸನಗಳಿವೆ.',
      ta: 'வேங்கிச் சாளுக்கிய மன்னர் முதலாம் சாளுக்கிய பீமனால் கட்டப்பட்டு, கங்க மற்றும் கஜபதி கல்வெட்டுகளைக் கொண்டுள்ள திராக்ஷாராம பீமேஸ்வரர் கோயில்.',
      mr: 'पूर्व (वेंगी) चालुक्य राजा चालुक्य भीम पहिला याने बांधलेले द्राक्षाराम येथील भीमेश्वर मंदिर—येथे गंग आणि गजपती शिलालेख आहेत.',
      or: 'ପୂର୍ବ (ବେଙ୍ଗୀ) ଚାଲୁକ୍ୟ ରାଜା ପ୍ରଥମ ଚାଲୁକ୍ୟ ଭୀମଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ଦ୍ରାକ୍ଷାରାମ ଭୀମେଶ୍ୱର ମନ୍ଦିର—ଯେଉଁଠାରେ ଗଙ୍ଗ ଓ ଗଜପତି ଶିଳାଲେଖ ରହିଛି।',
      bn: 'পূর্ব (বেঙ্গী) চালুক্য রাজা প্রথম চালুক্য ভীম নির্মিত দ্রাক্ষারাম ভীমেশ্বর মন্দির—যেখানে গঙ্গ ও গজপতি শিলালিপি রয়েছে।'
    },
    visualTypeBadge: {
      en: 'Verified Monumental Temple Photography',
      hi: 'सत्यापित मंदिर स्थापत्य छायाचित्र',
      te: 'ధృవీకరించబడిన ఆలయ వాస్తుశిల్ప ఛాయాచిత్రం',
      kn: 'ದೃಢೀಕೃತ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ ಛಾಯಾಚಿತ್ರ',
      ta: 'உறுதிப்படுத்தப்பட்ட கோயில் கட்டிடக்கலை புகைப்படம்',
      mr: 'सत्यापित मंदिर स्थापत्य छायाचित्र',
      or: 'ପ୍ରମାଣିତ ମନ୍ଦିର ସ୍ଥାପତ୍ୟ ଫଟୋଚିତ୍ର',
      bn: 'প্রমাণিত মন্দির স্থাপত্য আলোকচিত্র'
    },
    conciseOverview: {
      en: 'Characterized by parallel dynastic corridors: Badami Chalukyas (543–753 CE), Rashtrakutas (753–973 CE), and Western Gangas (until 1000 CE) in Karnata; Kanchi Pallavas (c. 575–897 CE) and Early Cholas (from c. 850 CE) in Tondaimandalam/Kaveri; Vengi Chalukyas (c. 624–1070 CE) in Andhra; and Bhauma-Karas, Somavamshis, and Middle Eastern Gangas in Odisha.',
      hi: 'समानांतर राजवंशीय गलियारों का काल: कर्णाट में बादामी चालुक्य (543–753 ई.), राष्ट्रकूट (753–973 ई.) व पश्चिमी गंग (1000 ई. तक); कांची पल्लव (575–897 ई.); आंध्र में वेंगी चालुक्य (624–1070 ई.); तथा ओडिशा में भौम-कर, सोमवंशी और पूर्वी गंग।',
      te: 'సమాంతర రాజవంశాల కాలం: కర్ణాటలో బాదామి చాళుక్యులు (543–753), రాష్ట్రకూటులు (753–973), పశ్చిమ గాంగులు (1000 వరకు); కాంచీ పల్లవులు (575–897); ఆంధ్రలో వేంగి చాళుక్యులు (624–1070); ఒడిశాలో భౌమ-కర, సోమవంశ మరియు తూర్పు గాంగులు.',
      kn: 'ಸಮಾನಾಂತರ ರಾಜವಂಶಗಳ ಕಾಲ: ಕರ್ಣಾಟದಲ್ಲಿ ಬಾದಾಮಿ ಚಾಳುಕ್ಯರು (543–753), ರಾಷ್ಟ್ರಕೂಟರು (753–973), ಪಶ್ಚಿಮ ಗಂಗರು (1000ರವರೆಗೆ); ಕಾಂಚಿ ಪಲ್ಲವರು (575–897); ಆಂಧ್ರದಲ್ಲಿ ವೆಂಗಿ ಚಾಳುಕ್ಯರು (624–1070); ಒಡಿಶಾದಲ್ಲಿ ಭೌಮ-ಕರ, ಸೋಮವಂಶಿ ಮತ್ತು ಪೂರ್ವ ಗಂಗರು.',
      ta: 'இணையான வம்சங்களின் காலம்: கர்நாடகத்தில் பாதாமி சாளுக்கியர்கள் (543–753), இராஷ்டிரகூடர்கள் (753–973), மேலைக் கங்கர்கள் (1000 வரை); காஞ்சிப் பல்லவர்கள் (575–897); ஆந்திரத்தில் வேங்கிச் சாளுக்கியர்கள் (624–1070); ஒடிசாவில் பௌம-கர, சோமவம்ச மற்றும் கீழைக் கங்கர்கள்.',
      mr: 'समांतर राजवंशांचा काळ: कर्णाटात बदामी चालुक्य (५४३–७५३), राष्ट्रकूट (७५३–९७३), पश्चिम गंग (१००० पर्यंत); कांची पल्लव (५७५–८९७); आंध्रात वेंगी चालुक्य (६२४–१०७०); ओडिशात भौम-कर, सोमवंशी व पूर्व गंग.',
      or: 'ସମାନ୍ତରାଳ ରାଜବଂଶର କାଳ: କର୍ଣ୍ଣାଟରେ ବାଦାମୀ ଚାଲୁକ୍ୟ (୫୪୩–୭୫୩), ରାଷ୍ଟ୍ରକୂଟ (୭୫୩–୯୭୩), ପଶ୍ଚିମ ଗଙ୍ଗ (୧୦୦୦ ପର୍ଯ୍ୟନ୍ତ); କାଞ୍ଚି ପଲ୍ଲବ (୫୭୫–୮୯୭); ଆନ୍ଧ୍ରରେ ବେଙ୍ଗୀ ଚାଲୁକ୍ୟ (୬୨୪–୧୦୭୦); ଓଡ଼ିଶାରେ ଭୌମ-କର, ସୋମବଂଶୀ ଓ ପୂର୍ବ ଗଙ୍ଗ।',
      bn: 'সমান্তরাল রাজবংশের কাল: কর্ণাটে বাদামী চালুক্য (৫৪৩–৭৫৩), রাষ্ট্রকূট (৭৫৩–৯৭৩), পশ্চিম গঙ্গ (১০০০ পর্যন্ত); কাঞ্চী পল্লব (৫৭৫–৮৯৭); অন্ধ্রে বেঙ্গী চালুক্য (৬২৪–১০৭০); উড়িষ্যায় ভৌম-কর, সোমবংশী ও পূর্ব গঙ্গ।'
    },
    detailedAnalysis: {
      en: 'Pulakeshin II’s Aihole inscription (634 CE) records his campaigns across Kalinga, Kosala, Pishtapura, and Kunala (Kolleru Lake), installing his younger brother Kubja Vishnuvardhana at Vengi (c. 624 CE). Simultaneously, in Odisha, the ChandraVamshi (Somavamshi) monarchs Janamejaya I, Yayati I, and Yayati II synthesized Kalinga temple architecture at Bhubaneswar (Muktesvara, Rajarani, and Lingaraja temples), while the Eastern Gangas ruled from Kalinganagara.',
      hi: 'पुलकेशिन द्वितीय का ऐहोले शिलालेख (634 ई.) कलिंग, कोसल, पिष्टपुर और कुणाल (कोल्लेरू झील) में उसके अभियानों तथा वेंगी में कुब्ज विष्णुवर्धन की नियुक्ति (624 ई.) का वर्णन करता है। इसी काल में ओडिशा में चंद्रवंशी (सोमवंशी) सम्राटों ने भुवनेश्वर के मुक्तेश्वर, राजरानी और लिंगराज मंदिरों का निर्माण कराया, जबकि पूर्वी गंग कलिंगनगर से शासन कर रहे थे।',
      te: 'పులకేశి II ఐహోole శాసనం (క్రీ.శ. 634) కళింగ, కోసల, పిష్టపురం మరియు కుణాల (కొల్లేరు సరస్సు) దండయాత్రలను, వేంగిలో కుబ్జ విష్ణువర్ధనుని నియామకాన్ని (క్రీ.శ. 624) వివరిస్తుంది. ఇదే కాలంలో ఒడిశాలో చంద్రవంశ (సోమవంశ) రాజులు భువనేశ్వర్‌లోని ముక్తేశ్వర, రాజరాణి మరియు లింగరాజ ఆలయాలను నిర్మించగా, తూర్పు గాంగులు కళింగనగరం నుండి పాలించారు.',
      kn: 'ಇಮ್ಮಡಿ ಪುಲಿಕೇಶಿಯ ಐಹೊಳೆ ಶಾಸನವು (ಕ್ರಿ.ಶ. 634) ಕಳಿಂಗ, ಕೋಸಲ, ಪಿಷ್ಟಪುರ ಮತ್ತು ಕುಣಾಲ (ಕೊಲ್ಲೇರು ಸರೋವರ) ದಂಡಯಾತ್ರೆಗಳನ್ನು ಹಾಗೂ ವೆಂಗಿಯಲ್ಲಿ ಕುಬ್ಜ ವಿಷ್ಣುವರ್ಧನನ ನೇಮಕವನ್ನು (ಕ್ರಿ.ಶ. 624) ದಾಖಲಿಸುತ್ತದೆ. ಇದೇ ಕಾಲದಲ್ಲಿ ಒಡಿಶಾದಲ್ಲಿ ಸೋಮವಂಶಿ ಅರಸರು ಭುವನೇಶ್ವರದ ಲಿಂಗರಾಜ ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಿದರು.',
      ta: 'இரண்டாம் புலிகேசியின் ஐஹோole கல்வெட்டு (பொ.ஊ. 634) கலிங்கம், கோசலம், பிஷ்டபுரம் மற்றும் குணாலா (கொல்லேறு ஏரி) படையெடுப்புகளையும் வேங்கியில் குப்ஜ விஷ்ணுவர்தனன் நியமனத்தையும் (பொ.ஊ. 624) பதிவு செய்கிறது. இதே காலத்தில் ஒடிசாவில் சோமவம்ச மன்னர்கள் புவனேஸ்வர் லிங்கராஜர் கோயிலை எழுப்பினர்.',
      mr: 'पुलकेशी दुसऱ्याचा ऐहोळे शिलालेख (इ.स. ६३४) कलिंग, कोसल, पिष्टपूर आणि कुणाल (कोल्लेरू सरोवर) मोहिमांचे तसेच वेंगी येथे कुब्ज विष्णुवर्धनच्या नियुक्तीचे (इ.स. ६२४) वर्णन करतो. याच काळात ओडिशात सोमवंशी राजांनी भुवनेश्वरचे लिंगराज मंदिर उभारले.',
      or: 'ଦ୍ୱିତୀୟ ପୁଲକେଶୀଙ୍କ ଆଇହୋole ଶିଳାଲେଖ (୬୩୪ ଖ୍ରୀ.ଅ.) କଳିଙ୍ଗ, କୋଶଳ, ପିଷ୍ଟପୁର ଓ କୁଣାଳ (କୋଲ୍ଲେରୁ ହ୍ରଦ) ଅଭିଯାନ ଏବଂ ବେଙ୍ଗୀରେ କୁବ୍ଜ ବିଷ୍ଣୁବର୍ଦ୍ଧନଙ୍କ ନିଯୁକ୍ତି (୬୨୪ ଖ୍ରୀ.ଅ.) ବର୍ଣ୍ଣନା କରେ। ଏହି ସମୟରେ ଓଡ଼ିଶାରେ ସୋମବଂଶୀ ରାଜାମାନେ ଭୁବନେଶ୍ୱରର ଲିଙ୍ଗରାଜ ମନ୍ଦିର ନିର୍ମାଣ କରିଥିଲେ।',
      bn: 'দ্বিতীয় পুলকেশীর আইহোল শিলালিপি (৬৩৪ খ্রি.) কলিঙ্গ, কোশল, পিষ্টপুর ও কুণাল (কোল্লেরু হ্রদ) অভিযান এবং বেঙ্গীতে কুব্জ বিষ্ণুবর্ধনের নিয়োগ (৬২৪ খ্রি.) বর্ণনা করে। একই সময়ে উড়িষ্যায় সোমবংশী রাজারা ভুবনেশ্বরের লিঙ্গরাজ মন্দির নির্মাণ করেন।'
    },
    dateClassificationBreakdown: {
      establishedInscriptional: {
        en: 'Established Inscriptional Dates: 543 CE (Saka 465 Badami Cliff Inscription of Pulakeshin I); 634 CE (Saka 556 Aihole Prasasti of Pulakeshin II, EI Vol. VI); 982 CE (Shravanabelagola Gommateshwara colossus by Chavundaraya under Western Ganga Rachamalla IV); 1022 CE (Rajaraja Narendra coronation at Rajamahendravaram).',
        hi: 'स्थापित शिलालेखीय तिथियाँ: 543 ई. (शक 465 पुलकेशिन प्रथम का बादामी शिलालेख); 634 ई. (शक 556 ऐहोले प्रशस्ति, EI Vol. VI); 982 ई. (श्रवणबेलगोला गोम्मटेश्वर प्रतिमा); 1022 ई. (राजमहेंद्रवरम में राजराज नरेंद्र का राज्याभिषेक)।',
        te: 'నిర్ధారిత శాసన తేదీలు: క్రీ.శ. 543 (శక 465 పులకేశి I బాదామి శాసనం); క్రీ.శ. 634 (శక 556 ఐహోole ప్రశస్తి, EI Vol. VI); క్రీ.శ. 982 (శ్రావణబెళగొళ గోమఠేశ్వర విగ్రహం); క్రీ.శ. 1022 (రాజమహేంద్రవరంలో రాజరాజ నరేంద్రుని పట్టాభిషేకం).',
        kn: 'ದೃಢೀಕೃತ ಶಾಸನ ದಿನಾಂಕಗಳು: ಕ್ರಿ.ಶ. 543 (ಶಕ 465 ಬಾದಾಮಿ ಶಾಸನ); ಕ್ರಿ.ಶ. 634 (ಶಕ 556 ಐಹೊಳೆ ಪ್ರಶಸ್ತಿ); ಕ್ರಿ.ಶ. 982 (ಶ್ರವಣಬೆಳಗೊಳ ಗೊಮ್ಮಟೇಶ್ವರ ಪ್ರತಿಷ್ಠಾಪನೆ); ಕ್ರಿ.ಶ. 1022 (ರಾಜರಾಜ ನರೇಂದ್ರನ ಪಟ್ಟಾಭಿಷೇಕ).',
        ta: 'உறுதிப்படுத்தப்பட்ட கல்வெட்டுத் தேதிகள்: பொ.ஊ. 543 (சக 465 பாதாமி கல்வெட்டு); பொ.ஊ. 634 (சக 556 ஐஹோole பிரசஸ்தி); பொ.ஊ. 982 (சிரவணபெலகொளா கோமதேஸ்வரர் சிலை); பொ.ஊ. 1022 (இராஜராஜ நரேந்திரன் முடிசூடல்).',
        mr: 'प्रस्थापित शिलालेखीय तारखा: इ.स. ५४३ (शक ४६५ बदामी शिलालेख); इ.स. ६३४ (शक ५५६ ऐहोळे प्रशस्ती); इ.स. ९८२ (श्रवणबेळगोळ गोमटेश्वर मूर्ती); इ.स. १०२२ (राजराज नरेंद्र राज्याभिषेक).',
        or: 'ପ୍ରତିଷ୍ଠିତ ଶିଳାଲେଖ ତାରିଖ: ୫୪୩ ଖ୍ରୀ.ଅ. (ଶକ ୪୬୫ ବାଦାମୀ ଶିଳାଲେଖ); ୬୩୪ ଖ୍ରୀ.ଅ. (ଶକ ୫୫୬ ଆଇହୋole ପ୍ରଶସ୍ତି); ୯୮୨ ଖ୍ରୀ.ଅ. (ଶ୍ରବଣବେଳଗୋଳା ଗୋମଟେଶ୍ୱର); ୧୦୨୨ ଖ୍ରୀ.ଅ. (ରାଜରାଜ ନରେନ୍ଦ୍ରଙ୍କ ଅଭିଷେକ)।',
        bn: 'প্রতিষ্ঠিত শিলালিপি তারিখ: ৫৪৩ খ্রি. (শক ৪৬৫ বাদামী শিলালিপি); ৬৩৪ খ্রি. (শক ৫৫৬ আইহোল প্রশস্তি); ৯৮২ খ্রি. (শ্রবণবেলগোলা গোমটেশ্বর মূর্তি); ১০২২ খ্রি. (রাজরাজ নরেন্দ্রের অভিষেক)।'
      },
      approximateDynastic: {
        en: 'Approximate Dynastic Reign Dates: Badami Chalukyas (543–753 CE); Imperial Pallavas of Kanchi (c. 575–897 CE); Eastern Chalukyas of Vengi (c. 624–1070 CE); Bhauma-Karas of Tosali (c. 736–940 CE); Somavamshis of Kosala & Utkala (c. 882–1110 CE); Middle Eastern Gangas (c. 550–1038 CE).',
        hi: 'अनुमानित राजवंशीय शासन तिथियाँ: बादामी चालुक्य (543–753 ई.); कांची के साम्राज्यिक पल्लव (लगभग 575–897 ई.); वेंगी के पूर्वी चालुक्य (लगभग 624–1070 ई.); तोसली के भौम-कर (लगभग 736–940 ई.); सोमवंशी (लगभग 882–1110 ई.); मध्य पूर्वी गंग (लगभग 550–1038 ई.)।',
        te: 'సుమారు రాజవంశ పాలనా తేదీలు: బాదామి చాళుక్యులు (543–753); కాంచీ సామ్రాజ్య పల్లవులు (సుమారు 575–897); వేంగి తూర్పు చాళుక్యులు (సుమారు 624–1070); భౌమ-కరులు (సుమారు 736–940); సోమవంశీయులు (సుమారు 882–1110); మధ్య తూర్పు గాంగులు (సుమారు 550–1038).',
        kn: 'ಅಂದಾಜು ರಾಜವಂಶದ ಆಳ್ವಿಕೆ ದಿನಾಂಕಗಳು: ಬಾದಾಮಿ ಚಾಳುಕ್ಯರು (543–753); ಕಾಂಚಿ ಪಲ್ಲವರು (ಸು. 575–897); ವೆಂಗಿ ಪೂರ್ವ ಚಾಳುಕ್ಯರು (ಸು. 624–1070); ಭೌಮ-ಕರರು (ಸು. 736–940); ಸೋಮವಂಶಿಗಳು (ಸು. 882–1110); ಮಧ್ಯ ಪೂರ್ವ ಗಂಗರು (ಸು. 550–1038).',
        ta: 'தோராயமான வம்ச ஆட்சிக் காலங்கள்: பாதாமி சாளுக்கியர்கள் (543–753); காஞ்சிப் பல்லவர்கள் (சுமார் 575–897); வேங்கி கீழைச் சாளுக்கியர்கள் (சுமார் 624–1070); பௌம-கரர்கள் (சுமார் 736–940); சோமவம்சத்தினர் (சுமார் 882–1110); இடைக்கால கீழைக் கங்கர்கள் (சுமார் 550–1038).',
        mr: 'अंदाजे राजवंश काळ: बदामी चालुक्य (५४३–७५३); कांचीचे पल्लव (सु. ५७५–८९७); वेंगीचे पूर्व चालुक्य (सु. ६२४–१०७०); भौम-कर (सु. ७३६–९४०); सोमवंशी (सु. ८८२–१११०); मध्य पूर्व गंग (सु. ५५०–१०३८).',
        or: 'ଆନୁମାନିକ ରାଜବଂଶ ଶାସନ କାଳ: ବାଦାମୀ ଚାଲୁକ୍ୟ (୫୪୩–୭୫୩); କାଞ୍ଚି ପଲ୍ଲବ (୫୭୫–୮୯୭); ବେଙ୍ଗୀ ପୂର୍ବ ଚାଲୁକ୍ୟ (୬୨୪–୧୦୭୦); ଭୌମ-କର (୭୩୬–୯୪୦); ସୋମବଂଶୀ (୮୮୨–୧୧୧୦); ମଧ୍ୟ ପୂର୍ବ ଗଙ୍ଗ (୫୫୦–୧୦୩୮)।',
        bn: 'আনুমানিক রাজবংশীয় শাসনকাল: বাদামী চালুক্য (৫৪৩–৭৫৩); কাঞ্চী পল্লব (৫৭৫–৮৯৭); বেঙ্গী পূর্ব চালুক্য (৬২৪–১০৭০); ভৌম-কর (৭৩৬–৯৪০); সোমবংশী (৮৮২–১১১০); মধ্য পূর্ব গঙ্গ (৫৫০–১০৩৮)।'
      },
      disputedInterpretations: {
        en: 'Disputed Historical Interpretations: Exact starting year of the Bhauma-Kara Era (debated between 736 CE per S.N. Rajaguru / K.C. Panigrahi and 831 CE per D.C. Sircar); exact regnal boundaries between Yayati I and Yayati II in the Somavamshi succession.',
        hi: 'विवादित ऐतिहासिक व्याख्याएँ: भौम-कर संवत का सटीक प्रारंभ वर्ष (एस.एन. राजगुरु / के.सी. पाणिग्रही के अनुसार 736 ई. बनाम डी.सी. सरकार के अनुसार 831 ई.); सोमवंशी उत्तराधिकार में ययाति प्रथम और ययाति द्वितीय की सटीक शासन सीमाएँ।',
        te: 'వివాదాస్పద చారిత్రక వ్యాఖ్యానాలు: భౌమ-కర శకం ప్రారంభ సంవత్సరం (ఎస్.ఎన్. రాజగురు / కె.సి. పాణిగ్రహి ప్రకారం క్రీ.శ. 736 vs డి.సి. సర్కార్ ప్రకారం క్రీ.శ. 831); సోమవంశ వారసత్వంలో యయాతి I మరియు యయాతి II ఖచ్చితమైన పాలనా సరిహద్దులు.',
        kn: 'ವಿವಾದಿತ ಐತಿಹಾಸಿಕ ವ್ಯಾಖ್ಯಾನಗಳು: ಭೌಮ-ಕರ ಶಕೆಯ ಆರಂಭದ ವರ್ಷ (ಎಸ್.ಎನ್. ರಾಜಗುರು / ಕೆ.ಸಿ. ಪಾಣಿಗ್ರಹಿ ಪ್ರಕಾರ ಕ್ರಿ.ಶ. 736 vs ಡಿ.ಸಿ. ಸರ್ಕಾರ್ ಪ್ರಕಾರ ಕ್ರಿ.ಶ. 831); ಸೋಮವಂಶಿ ಯಯಾತಿ I ಮತ್ತು ಯಯಾತಿ II ರ ನಿಖರ ಆಳ್ವಿಕೆ ಗಡಿಗಳು.',
        ta: 'விவாதத்திற்குரிய வரலாற்று விளக்கங்கள்: பௌம-கர சகாப்தத்தின் தொடக்க ஆண்டு (எஸ்.என். ராஜ்குரு / கே.சி. பாணிகிரஹி படி பொ.ஊ. 736 எதிர் டி.சி. சர்க்கார் படி பொ.ஊ. 831); சோமவம்ச முதலாம் யயாதி மற்றும் இரண்டாம் யயாதியின் ஆட்சி எல்லைகள்.',
        mr: 'विवादित ऐतिहासिक अर्थ: भौम-कर संवताचे प्रारंभ वर्ष (एस.एन. राजगुरू / के.सी. पाणिग्रही यांच्या मते इ.स. ७३६ विरुद्ध डी.सी. सरकार यांच्या मते इ.स. ८३१); सोमवंशी ययाती पहिला आणि दुसरा यांच्यातील अचूक कालखंड.',
        or: 'ବିବାଦୀୟ ଐତିହାସିକ ବ୍ୟାଖ୍ୟା: ଭୌମ-କର ସମ୍ବତର ଆରମ୍ଭ ବର୍ଷ (ଏସ.ଏନ. ରାଜଗୁରୁ / କେ.ସି. ପାଣିଗ୍ରାହୀଙ୍କ ମତରେ ୭୩୬ ଖ୍ରୀ.ଅ. ବନାମ ଡି.ସି. ସରକାରଙ୍କ ମତରେ ୮୩୧ ଖ୍ରୀ.ଅ.); ସୋମବଂଶୀ ପ୍ରଥମ ଯଯାତି ଓ ଦ୍ୱିତୀୟ ଯଯାତିଙ୍କ ସଠିକ୍ ଶାସନ ସୀମା।',
        bn: 'বিতর্কিত ঐতিহাসিক ব্যাখ্যা: ভৌম-কর সংবতের শুরুর বছর (এস.এন. রাজগুরু / কে.সি. পানিগ্রাহীর মতে ৭৩৬ খ্রি. বনাম ডি.সি. সরকারের মতে ৮৩১ খ্রি.); সোমবংশী প্রথম যযাতি ও দ্বিতীয় যযাতির সঠিক শাসনসীমা।'
      },
      traditionalClaims: {
        en: 'Traditional Chronological Claims: Madala Panji temple chronicles attribute a long unbroken "Kesari Dynasty" starting in the 5th century CE to Bhubaneswar; epigraphic research (K.C. Panigrahi 1961) shows the historical Somavamshis (Yayati Kesari, Uddyotakesari) ruled in the 9th–11th centuries CE.',
        hi: 'पारंपरिक कालानुक्रमिक दावे: मादला पंजी मंदिर वृत्तांत भुवनेश्वर में 5वीं शताब्दी ई. से एक लंबी "केसरी राजवंश" वंशावली का उल्लेख करते हैं; जबकि शिलालेखीय शोध (के.सी. पाणिग्रही 1961) सिद्ध करता है कि ऐतिहासिक सोमवंशी (ययाति केसरी, उद्योतकेसरी) ने 9वीं–11वीं शताब्दी ई. में शासन किया।',
        te: 'సాంప్రదాయ కాలక్రమ వాదనలు: మాదলা పంజీ ఆలయ గ్రంథాలు 5వ శతాబ్దం నుండి సుదీర్ఘ "కేసరి రాజవంశం" పాలించినట్లు పేర్కొంటాయి; కానీ శాసన పరిశోధన (కె.సి. పాణిగ్రహి 1961) చారిత్రక సోమవంశీయులు (యయాతి కేసరి, ఉద్యోతకేసరి) 9–11 శతాబ్దాలలో పాలించారని నిరూపిస్తుంది.',
        kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕಾಲಾನುಕ್ರಮ ಪ್ರತಿಪಾದನೆಗಳು: ಮಾದಲಾ ಪಂಜಿ ಗ್ರಂಥವು 5ನೇ ಶತಮಾನದಿಂದ "ಕೇಸರಿ ರಾಜವಂಶ"ದ ಉಲ್ಲೇಖ ಮಾಡುತ್ತದೆ; ಆದರೆ ಶಾಸನ ಸಂಶೋಧನೆಯು (ಕೆ.ಸಿ. ಪಾಣಿಗ್ರಹಿ 1961) ಐತಿಹಾಸಿಕ ಸೋಮವಂಶಿಗಳು 9–11ನೇ ಶತಮಾನದಲ್ಲಿ ಆಳಿದರು ಎಂದು ಸಾಬೀತುಪಡಿಸುತ್ತದೆ.',
        ta: 'மரபுவழி காலக்கணக்கு உரிமைகோரல்கள்: மாதளா பஞ்சி கோயில் வரலாறு 5-ஆம் நூற்றாண்டு முதல் நீண்ட "கேசரி வம்சம்" ஆண்டதாகக் கூறுகிறது; கல்வெட்டு ஆய்வு (கே.சி. பாணிகிரஹி 1961) வரலாற்றுச் சோமவம்சத்தினர் 9–11 நூற்றாண்டுகளில் ஆண்டதை உறுதிப்படுத்துகிறது.',
        mr: 'पारंपरिक कालानुक्रमिक दावे: मादला पंजी ग्रंथात ५ व्या शतकापासून "केसरी राजवंश" असल्याचा उल्लेख आहे; परंतु शिलालेखीय संशोधनानुसार (के.सी. पाणिग्रही १९६१) ऐतिहासिक सोमवंशी ९ व्या–११ व्या शतकात होऊन गेले.',
        or: 'ପାରମ୍ପରିକ କାଳାନୁକ୍ରମିକ ଦାବି: ମାଦଳା ପାଞ୍ଜିରେ ୫ମ ଶତାବ୍ଦୀରୁ ଦୀର୍ଘ "କେଶରୀ ବଂଶ"ର ଉଲ୍ଲେଖ ଅଛି; କିନ୍ତୁ ଶିଳାଲେଖ ଗବେଷଣା (କେ.ସି. ପାଣିଗ୍ରାହୀ ୧୯୬୧) ପ୍ରମାଣ କରେ ଯେ ଐତିହାସିକ ସୋମବଂଶୀ (ଯଯାତି କେଶରୀ, ଉଦ୍ୟୋତକେଶରୀ) ୯ମ–୧୧ଶ ଶତାବ୍ଦୀରେ ଶାସନ କରିଥିଲେ।',
        bn: 'ঐতিহ্যগত কালানুক্রমিক দাবি: মাদলা পাঞ্জিতে ৫ম শতাব্দী থেকে দীর্ঘ "কেশরী বংশ"-এর উল্লেখ রয়েছে; কিন্তু শিলালিপি গবেষণা (কে.সি. পানিগ্রাহী ১৯৬১) প্রমাণ করে যে ঐতিহাসিক সোমবংশীরা (যযাতি কেশরী, উদ্যোতকেশরী) ৯ম–১১শ শতাব্দীতে শাসন করেছিলেন।'
      }
    },
    parallelTracks: [
      {
        corridorId: 'track_s5_kalinga_utkala',
        corridorLabel: {
          en: 'Kalinga–Utkala–Kosala Corridor',
          hi: 'कलिंग–उत्कल–कोसल गलियारा',
          te: 'కళింగ–ఉత్కళ–కోసల ప్రాంతం',
          kn: 'ಕಳಿಂಗ–ಉತ್ಕಲ–ಕೋಸಲ ವಲಯ',
          ta: 'கலிங்கம்–உத்கலம்–கோசலம் மண்டலம்',
          mr: 'कलिंग–उत्कल–कोसल पट्टा',
          or: 'କଳିଙ୍ଗ–ଉତ୍କଳ–କୋଶଳ ଅଞ୍ଚଳ',
          bn: 'কলিঙ্গ–উৎকল–কোশল অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Sailodbhavas of Kongoda (c. 575–736 CE) → Bhauma-Karas of Tosali (c. 736–940 CE) → Somavamshis / Kesari Kings of Kosala & Utkala (c. 882–1110 CE, Janamejaya I, Yayati I, Yayati II, Uddyotakesari); in parallel with Middle Eastern Gangas of Kalinganagara (up to Vajrahasta V, 1038 CE)',
          hi: 'कोंगोद के शैलोद्भव (575–736 ई.) → तोसली के भौम-कर (736–940 ई.) → कोसल एवं उत्कल के सोमवंशी / केसरी राजा (882–1110 ई., जनमेजय प्रथम, ययाति प्रथम, ययाति द्वितीय, उद्योतकेसरी); समानांतर रूप से कलिंगनगर के पूर्वी गंग (वज्रहस्त पंचम, 1038 ई. तक)',
          te: 'కొంగోద శైలోద్భవులు (575–736) → తోసలి భౌమ-కరులు (736–940) → కోసల & ఉత్కళ సోమవంశ / కేసరి రాజులు (882–1110, జనమేజయ I, యయాతి I, యయాతి II, ఉద్యోతకేసరి); సమాంతరంగా కళింగనగర తూర్పు గాంగులు (వజ్రహస్త V, 1038 వరకు)',
          kn: 'ಕೊಂಗೋದ ಶೈಲೋದ್ಭವರು (575–736) → ಭೌಮ-ಕರರು (736–940) → ಕೋಸಲ ಮತ್ತು ಉತ್ಕಲದ ಸೋಮವಂಶಿ / ಕೇಸರಿ ಅರಸರು (882–1110, ಜನಮೇಜಯ I, ಯಯಾತಿ I, ಯಯಾತಿ II, ಉದ್ಯೋತಕೇಸರಿ); ಸಮಾನಾಂತರವಾಗಿ ಕಳಿಂಗನಗರದ ಪೂರ್ವ ಗಂಗರು (ವಜ್ರಹಸ್ತ V, 1038 ರವರೆಗೆ)',
          ta: 'கொங்கோத சைலோற்பவர்கள் (575–736) → பௌம-கரர்கள் (736–940) → கோசலம் & உத்கல சோமவம்ச / கேசரி மன்னர்கள் (882–1110, ஜனமேஜயன் I, யயாதி I, யயாதி II); இணையாக கலிங்கநகர கீழைக் கங்கர்கள் (வஜ்ரஹஸ்தன் V, 1038 வரை)',
          mr: 'कोंगोदचे शैलोद्भव (५७५–७३६) → भौम-कर (७३६–९४०) → कोसल व उत्कलचे सोमवंशी / केसरी राजे (८८२–१११०, जनमेजय पहिला, ययाती पहिला, ययाती दुसरा); समांतरपणे कलिंगनगरचे पूर्व गंग (वज्रहस्त पाचवा, १०३८ पर्यंत)',
          or: 'କୋଙ୍ଗୋଦର ଶୈଳୋଦ୍ଭବ (୫୭୫–୭୩୬) → ଭୌମ-କର (୭୩୬–୯୪୦) → କୋଶଳ ଓ ଉତ୍କଳର ସୋମବଂଶୀ / କେଶରୀ ରାଜା (୮୮୨–୧୧୧୦, ଜନମେଜୟ ପ୍ରଥମ, ଯଯାତି ପ୍ରଥମ, ଯଯାତି ଦ୍ୱିତୀୟ, ଉଦ୍ୟୋତକେଶରୀ); ସମାନ୍ତରାଳ ଭାବେ କଳିଙ୍ଗନଗରର ପୂର୍ବ ଗଙ୍ଗ (ବଜ୍ରହସ୍ତ ପଞ୍ଚମ, ୧୦୩୮ ପର୍ଯ୍ୟନ୍ତ)',
          bn: 'কোঙ্গোদের শৈলোদ্ভব (৫৭৫–৭৩৬) → ভৌম-কর (৭৩৬–৯৪০) → কোশল ও উৎকলের সোমবংশী / কেশরী রাজা (৮৮২–১১১০, প্রথম জনমেজয়, প্রথম যযাতি, দ্বিতীয় যযাতি); সমান্তরালভাবে কলিঙ্গনগরের পূর্ব গঙ্গ (পঞ্চম বজ্রহস্ত, ১০৩৮ পর্যন্ত)'
        },
        dateSpan: 'c. 550 – 1110 CE (Eastern Gangas transition to Imperial phase in 1038 CE)',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Brahmesvara Temple Inscription of Kolavatidevi (EI Vol. XIII); Jatesinga-Dungri Plates of Yayati II'
      },
      {
        corridorId: 'track_s5_vengi_andhra',
        corridorLabel: {
          en: 'Vengi–Andhradesha Corridor',
          hi: 'वेंगी–आंध्रदेश गलियारा',
          te: 'వేంగి–ఆంధ్రదేశ ప్రాంతం',
          kn: 'ವೆಂಗಿ–ಆಂಧ್ರದೇಶ ವಲಯ',
          ta: 'வேங்கி–ஆந்திரதேச மண்டலம்',
          mr: 'वेंगी–आंध्रदेश पट्टा',
          or: 'ବେଙ୍ଗୀ–ଆନ୍ଧ୍ରଦେଶ ଅଞ୍ଚଳ',
          bn: 'বেঙ্গী–অন্ধ্রদেশ অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Eastern Chalukyas of Vengi (c. 624–1070 CE: Kubja Vishnuvardhana, Gunaga Vijayaditya III, Chalukya Bhima I, Rajaraja Narendra [1022–1061 CE]) → merges into Chola-Chalukya Imperial Line under Kulottunga I in 1070 CE',
          hi: 'वेंगी के पूर्वी चालुक्य (लगभग 624–1070 ई.: कुब्ज विष्णुवर्धन, गुणग विजयादित्य तृतीय, चालुक्य भीम प्रथम, राजराज नरेंद्र [1022–1061 ई.]) → 1070 ई. में कुलोत्तुंग प्रथम के अधीन चोल-चालुक्य साम्राज्यिक वंश में विलय',
          te: 'వేంగి తూర్పు చాళుక్యులు (క్రీ.శ. 624–1070: కుబ్జ విష్ణువర్ధనుడు, గుణగ విజయాదిత్య III, చాళుక్య భీమ I, రాజరాజ నరేంద్రుడు [1022–1061]) → 1070లో కులోత్తుంగ I క్రింద చోళ-చాళుక్య సామ్రాజ్య శాఖగా విలీనం',
          kn: 'ವೆಂಗಿಯ ಪೂರ್ವ ಚಾಳುಕ್ಯರು (ಕ್ರಿ.ಶ. 624–1070: ಕುಬ್ಜ ವಿಷ್ಣುವರ್ಧನ, ಗುಣಗ ವಿಜಯಾದಿತ್ಯ III, ಚಾಳುಕ್ಯ ಭೀಮ I, ರಾಜರಾಜ ನರೇಂದ್ರ [1022–1061]) → ಕ್ರಿ.ಶ. 1070ರಲ್ಲಿ ಕುಲೋತ್ತುಂಗ I ರ ಅಡಿಯಲ್ಲಿ ಚೋಳ-ಚಾಳುಕ್ಯ ಒಕ್ಕೂಟ',
          ta: 'வேங்கி கீழைச் சாளுக்கியர்கள் (பொ.ஊ. 624–1070: குப்ஜ விஷ்ணுவர்தனன், குணக விஜயாதித்தன் III, சாளுக்கிய பீமன் I, இராஜராஜ நரேந்திரன் [1022–1061]) → பொ.ஊ. 1070-இல் முதலாம் குலோத்துங்கன் கீழ் சோழ-சாளுக்கிய இணைப்பு',
          mr: 'वेंगीचे पूर्व चालुक्य (इ.स. ६२४–१०७०: कुब्ज विष्णुवर्धन, गुणग विजयादित्य तिसरा, चालुक्य भीम पहिला, राजराज नरेंद्र [१०२२–१०६१]) → इ.स. १०७० मध्ये कुलोत्तुंग पहिल्याखाली चोल-चालुक्य एकत्रीकरण',
          or: 'ବେଙ୍ଗୀର ପୂର୍ବ ଚାଲୁକ୍ୟ (୬୨୪–୧୦୭୦ ଖ୍ରୀ.ଅ.: କୁବ୍ଜ ବିଷ୍ଣୁବର୍ଦ୍ଧନ, ଗୁଣଗ ବିଜୟାଦିତ୍ୟ ତୃତୀୟ, ଚାଲୁକ୍ୟ ଭୀମ ପ୍ରଥମ, ରାଜରାଜ ନରେନ୍ଦ୍ର [୧୦୨୨–୧୦୬୧]) → ୧୦୭୦ ଖ୍ରୀ.ଅ.ରେ ପ୍ରଥମ କୁଲୋତ୍ତୁଙ୍ଗଙ୍କ ଅଧୀନରେ ଚୋଳ-ଚାଲୁକ୍ୟ ମିଳନ',
          bn: 'বেঙ্গীর পূর্ব চালুক্য (৬২৪–১০৭০ খ্রি.: কুব্জ বিষ্ণুবর্ধন, গুণগ বিজয়াদিত্য তৃতীয়, চালুক্য ভীম প্রথম, রাজরাজ নরেন্দ্র [১০২২–১০৬১]) → ১০৭০ খ্রিস্টাব্দে প্রথম কুলোত্তুঙ্গের অধীনে চোল-চালুক্য মিলন'
        },
        dateSpan: 'c. 624 – 1070 CE',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Kopparam Plates of Pulakeshin II; Draksharama & Samalkot Bhimesvara Inscriptions; Korumelli Plates of Rajaraja Narendra'
      },
      {
        corridorId: 'track_s5_karnata_deccan',
        corridorLabel: {
          en: 'Karnata–Deccan Corridor',
          hi: 'कर्णाट–दक्कन गलियारा',
          te: 'కర్ణాట–దక్కన్ ప్రాంతం',
          kn: 'ಕರ್ಣಾಟ–ದಕ್ಕನ್ ವಲಯ',
          ta: 'கர்நாடக–தக்காண மண்டலம்',
          mr: 'कर्णाट–दख्खन पट्टा',
          or: 'କର୍ଣ୍ଣାଟ–ଦక్కନ ଅଞ୍ଚଳ',
          bn: 'কর্ণাট–দাক্ষিণাত্য অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Badami Chalukyas (543–753 CE: Pulakeshin I, Pulakeshin II, Vikramaditya II) → Rashtrakutas of Manyakheta (753–973 CE) → Western Chalukyas of Kalyani (from 973 CE); in parallel with Western Gangas of Talakad (continuing from c. 350 CE until 1000 CE)',
          hi: 'बादामी चालुक्य (543–753 ई.: पुलकेशिन प्रथम, पुलकेशिन द्वितीय, विक्रमादित्य द्वितीय) → मान्यखेत के राष्ट्रकूट (753–973 ई.) → कल्याणी के पश्चिमी चालुक्य (973 ई. से); समानांतर रूप से तलकाड के पश्चिमी गंग (350 ई. से 1000 ई. तक)',
          te: 'బాదామి చాళుక్యులు (543–753: పులకేశి I, పులకేశి II, విక్రమాదిత్య II) → మాన్యఖేట రాష్ట్రకూటులు (753–973) → కళ్యాణి పశ్చిమ చాళుక్యులు (973 నుండి); సమాంతరంగా తలకాడు పశ్చిమ గాంగులు (350 నుండి 1000 వరకు)',
          kn: 'ಬಾದಾಮಿ ಚಾಳುಕ್ಯರು (543–753: ಪುಲಿಕೇಶಿ I, ಇಮ್ಮಡಿ ಪುಲಿಕೇಶಿ, ವಿಕ್ರಮಾದಿತ್ಯ II) → ಮಾನ್ಯಖೇಟದ ರಾಷ್ಟ್ರಕೂಟರು (753–973) → ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯರು (973 ರಿಂದ); ಸಮಾನಾಂತರವಾಗಿ ತಲಕಾಡಿನ ಪಶ್ಚಿಮ ಗಂಗರು (350 ರಿಂದ 1000 ರವರೆಗೆ)',
          ta: 'பாதாமி சாளுக்கியர்கள் (543–753: புலிகேசி I, புலிகேசி II, விக்ரமாதித்தன் II) → மான்யகேட இராஷ்டிரகூடர்கள் (753–973) → கல்யாணி மேலைச் சாளுக்கியர்கள் (973 முதல்); இணையாக தலக்காடு மேலைக் கங்கர்கள் (350 முதல் 1000 வரை)',
          mr: 'बदामी चालुक्य (५४३–७५३: पुलकेशी पहिला, पुलकेशी दुसरा, विक्रमादित्य दुसरा) → मान्यखेटचे राष्ट्रकूट (७५३–९७३) → कल्याणीचे पश्चिम चालुक्य (९७३ पासून); समांतरपणे तलकाडचे पश्चिम गंग (३५० ते १००० पर्यंत)',
          or: 'ବାଦାମୀ ଚାଲୁକ୍ୟ (୫୪୩–୭୫୩) → ମାନ୍ୟଖେତର ରାଷ୍ଟ୍ରକୂଟ (୭୫୩–୯୭୩) → କଲ୍ୟାଣୀର ପଶ୍ଚିମ ଚାଲୁକ୍ୟ (୯୭୩ ରୁ); ସମାନ୍ତରାଳ ଭାବେ ତଳକାଡ଼ର ପଶ୍ଚିମ ଗଙ୍ଗ (୩୫୦ ରୁ ୧୦୦୦ ଖ୍ରୀ.ଅ. ପର୍ଯ୍ୟନ୍ତ)',
          bn: 'বাদামী চালুক্য (৫৪৩–৭৫৩) → মান্যখেতের রাষ্ট্রকূট (৭৫৩–৯৭৩) → কল্যাণীর পশ্চিম চালুক্য (৯৭৩ থেকে); সমান্তরালভাবে তলকাড়ের পশ্চিম গঙ্গ (৩৫০ থেকে ১০০০ খ্রি. পর্যন্ত)'
        },
        dateSpan: '543 – 1000/1070 CE (Kalyani Chalukyas continue to 1189 CE)',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Badami Cliff Inscription (Saka 465 / 543 CE); Aihole Prasasti (Saka 556 / 634 CE, EI Vol. VI); Shravanabelagola Inscriptions (982 CE)'
      },
      {
        corridorId: 'track_s5_tondaimandalam_kaveri',
        corridorLabel: {
          en: 'Tondaimandalam–Kaveri Corridor',
          hi: 'तोंडैमंडलम–कावेरी गलियारा',
          te: 'తొండైమండలం–కావేరీ ప్రాంతం',
          kn: 'ತೊಂಡೈಮಂಡಲಂ–ಕಾವೇರಿ ವಲಯ',
          ta: 'தொண்டைமண்டலம்–காவிரி மண்டலம்',
          mr: 'तोंडैमंडलम–कावेरी पट्टा',
          or: 'ତୋଣ୍ଡୈମଣ୍ଡଳମ–କାବେରୀ ଅଞ୍ଚଳ',
          bn: 'তোণ্ডৈমণ্ডলম–কাবেরী অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Imperial Pallavas of Kanchipuram (c. 575–897 CE: Simhavishnu, Mahendravarman I, Narasimhavarman I Mamalla, Nandivarman II, Aparajita) → Early Vijayalaya Line Cholas of Thanjavur (c. 850–985 CE: Vijayalaya, Aditya I, Parantaka I) → Imperial Chola Zenith from 985 CE',
          hi: 'कांचीपुरम के साम्राज्यिक पल्लव (लगभग 575–897 ई.: सिंहविष्णु, महेंद्रवर्मन प्रथम, नरसिंहवर्मन प्रथम मामल्ल, नंदिवर्मन द्वितीय, अपराजित) → तंजावुर के प्रारंभिक विजयालय चोल (लगभग 850–985 ई.: विजयालय, आदित्य प्रथम, परांतक प्रथम) → 985 ई. से साम्राज्यिक चोल उत्कर्ष',
          te: 'కాంచీపురం సామ్రాజ్య పల్లవులు (క్రీ.శ. 575–897: సింహవిష్ణు, మహేంద్రవర్మ I, నరసింహవర్మ I మామల్ల, నందివర్మ II, అపరాజిత) → తంజావూరు ప్రారంభ విజయాలయ చోళులు (క్రీ.శ. 850–985: విజయాలయ, ఆదిత్య I, పరాంతక I) → 985 నుండి చోళ సామ్రాజ్య ఉత్कर्ष',
          kn: 'ಕಾಂಚೀಪುರಂನ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಪಲ್ಲವರು (ಕ್ರಿ.ಶ. 575–897: ಸಿಂಹವಿಷ್ಣು, ಮಹೇಂದ್ರವರ್ಮನ್ I, ನರಸಿಂಹವರ್ಮನ್ I ಮಾಮಲ್ಲ, ನಂದಿವರ್ಮನ್ II) → ತಂಜಾವೂರಿನ ಆರಂಭಿಕ ವಿಜಯಾಲಯ ಚೋಳರು (ಕ್ರಿ.ಶ. 850–985: ವಿಜಯಾಲಯ, ಆದಿತ್ಯ I, ಪರಾಂತಕ I) → 985 ರಿಂದ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಚೋಳರು',
          ta: 'காஞ்சிபுரப் பேரரசுப் பல்லவர்கள் (பொ.ஊ. 575–897: சிம்மவிஷ்ணு, மகேந்திரவர்மன் I, நரசிம்மவர்மன் I மாமல்லன், நந்திவர்மன் II, அபராஜிதன்) → தஞ்சாவூர் விஜயாலயச் சோழர்கள் (பொ.ஊ. 850–985: விஜயாலயன், ஆதித்தன் I, பராந்தகன் I) → 985 முதல் பேரரசுச் சோழர்கள்',
          mr: 'कांचीपुरमचे साम्राज्यिक पल्लव (इ.स. ५७५–८९७: सिंहविष्णू, महेंद्रवर्मन पहिला, नरसिंहवर्मन पहिला मामल्ल, नंदिवर्मन दुसरा) → तंजावरचे प्रारंभिक विजयालय चोल (इ.स. ८५०–९८५: विजयालय, आदित्य पहिला, परांतक पहिला) → इ.स. ९८५ पासून साम्राज्यवादी चोल',
          or: 'କାଞ୍ଚିପୁରମର ସାମ୍ରାଜ୍ୟିକ ପଲ୍ଲବ (୫୭୫–୮୯୭ ଖ୍ରୀ.ଅ.: ସିଂହବିଷ୍ଣୁ, ପ୍ରଥମ ମହେନ୍ଦ୍ରବର୍ମନ, ପ୍ରଥମ ନରସିଂହବର୍ମନ ମାମଲ୍ଲ) → ତଞ୍ଜାବୁରର ପ୍ରାରମ୍ଭିକ ବିଜୟାଳୟ ଚୋଳ (୮୫୦–୯୮୫ ଖ୍ରୀ.ଅ.) → ୯୮୫ ଖ୍ରୀ.ଅ.ରୁ ସାମ୍ରାଜ୍ୟବାଦୀ ଚୋଳ',
          bn: 'কাঞ্চীপুরমের সাম্রাজ্যিক পল্লব (৫৭৫–৮৯৭ খ্রি.: সিংহবিষ্ণু, প্রথম মহেন্দ্রবর্মণ, প্রথম নরসিংহবর্মণ মামল্ল) → তাঞ্জাভুরের প্রারম্ভিক বিজয়ালয় চোল (৮৫০–৯৮৫ খ্রি.) → ৯৮৫ খ্রি. থেকে সাম্রাজ্যবাদী চোল'
        },
        dateSpan: 'c. 575 – 985 CE (Cholas continue to 1279 CE)',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Kuram & Kasakudi Pallava Copper Plates (SII Vol. I & II); Uttaramerur Sabha Inscriptions of Parantaka Chola I (919–921 CE)'
      }
    ],
    keyMonumentsAndInscriptions: ['Badami Cliff Inscription (543 CE) & Aihole Prasasti (634 CE)', 'Mamallapuram Rathas & Kailasanatha Temple', 'Lingaraja & Brahmesvara Temple Inscriptions', 'Draksharama Bhimesvara Temple Epigraphs'],
    linkedArticleIds: ['art_dyn_badami_chalukyas', 'art_dyn_vengi_chalukyas', 'art_dyn_pallavas_kanchi', 'art_dyn_western_gangas', 'art_lin_chandravamshi_kings'],
    linkedEventIds: []
  },
  {
    stageOrder: 6,
    id: 'stage_06_imperial_dynasties',
    refNumber: 'HT-0007',
    stageCode: 'IMPERIAL_DYNASTIES',
    title: {
      en: 'Stage 6: High Medieval Imperial Dynasties — Imperial Cholas, Western Chalukyas of Kalyani & Imperial Eastern Gangas (c. 850/985 – 1434 CE)',
      hi: 'चरण 6: उच्च मध्यकालीन साम्राज्यवादी राजवंश — चोल साम्राज्य, कल्याणी के पश्चिमी चालुक्य एवं साम्राज्यवादी पूर्वी गंग (लगभग 850/985 – 1434 ई.)',
      te: 'దశ 6: ఉన్నత మధ్యయుగ సామ్రాజ్య రాజవంశాలు — చోళ సామ్రాజ్యం, కళ్యాణి పశ్చిమ చాళుక్యులు & తూర్పు గాంగ సామ్రాజ్యం (క్రీ.శ. 850/985 – 1434)',
      kn: 'ಹಂತ 6: ಉನ್ನತ ಮಧ್ಯಕಾಲೀನ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ರಾಜವಂಶಗಳು — ಚೋಳರು, ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯರು ಮತ್ತು ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಪೂರ್ವ ಗಂಗರು (ಕ್ರಿ.ಶ. 850/985 – 1434)',
      ta: 'நிலை 6: உயர் இடைக்காலப் பேரரசு வம்சங்கள் — பேரரசுச் சோழர்கள், கல்யாணி மேலைச் சாளுக்கியர்கள் & கீழைக் கங்கப் பேரரசு (பொ.ஊ. 850/985 – 1434)',
      mr: 'टप्पा 6: उच्च मध्ययुगीन साम्राज्यवादी राजवंश — चोल साम्राज्य, कल्याणीचे पश्चिम चालुक्य आणि साम्राज्यवादी पूर्व गंग (इ.स. ८५०/९८५ – १४३४)',
      or: 'ପର୍ଯ୍ୟାୟ ୬: ଉଚ୍ଚ ମଧ୍ୟଯୁଗୀୟ ସାମ୍ରାଜ୍ୟବାଦୀ ରାଜବଂଶ — ଚୋଳ ସାମ୍ରାଜ୍ୟ, କଲ୍ୟାଣୀର ପଶ୍ଚିମ ଚାଲୁକ୍ୟ ଓ ସାମ୍ରାଜ୍ୟବାଦୀ ପୂର୍ବ ଗଙ୍ଗ (୮୫୦/୯୮୫ – ୧୪୩୪ ଖ୍ରୀ.ଅ.)',
      bn: 'পর্যায় ৬: উচ্চ মধ্যযুগীয় সাম্রাজ্যবাদী রাজবংশ — চোল সাম্রাজ্য, কল্যাণীর পশ্চিম চালুক্য ও সাম্রাজ্যবাদী পূর্ব গঙ্গ (৮৫০/৯৮৫ – ১৪৩৪ খ্রি.)'
    },
    approxDateLabel: {
      en: 'c. 850 / 985 CE (Chola Rise & Accession of Rajaraja I) – 1434 CE (End of Imperial Eastern Ganga Rule under Bhanudeva IV)',
      hi: 'लगभग 850 / 985 ई. (चोल उदय एवं राजराज प्रथम का राज्याभिषेक) – 1434 ई. (भानुदेव चतुर्थ के अधीन साम्राज्यवादी पूर्वी गंग शासन का अंत)',
      te: 'క్రీ.శ. 850 / 985 (చోళ ఆవిర్భావం & రాజరాజ I పట్టాభిషేకం) – క్రీ.శ. 1434 (భానుదేవ IV క్రింద తూర్పు గాంగ సామ్రాజ్య ముగింపు)',
      kn: 'ಕ್ರಿ.ಶ. 850 / 985 (ಚೋಳರ ಉದಯ ಮತ್ತು ರಾಜರಾಜ I ರ ಪಟ್ಟಾಭಿಷೇಕ) – ಕ್ರಿ.ಶ. 1434 (ಭಾನುದೇವ IV ರ ಅಡಿಯಲ್ಲಿ ಪೂರ್ವ ಗಂಗ ಸಾಮ್ರಾಜ್ಯದ ಅಂತ್ಯ)',
      ta: 'பொ.ஊ. 850 / 985 (சோழர் எழுச்சி & முதலாம் இராஜராஜன் முடிசூடல்) – பொ.ஊ. 1434 (நான்காம் பானுதேவன் கீழ் கீழைக் கங்கப் பேரரசின் முடிவு)',
      mr: 'इ.स. ८५० / ९८५ (चोल उदय व राजराज पहिल्याचा राज्याभिषेक) – इ.स. १४३४ (भानुदेव चौथ्याखाली पूर्व गंग साम्राज्याचा शेवट)',
      or: '୮୫୦ / ୯୮୫ ଖ୍ରୀ.ଅ. (ଚୋଳ ଉଦୟ ଓ ପ୍ରଥମ ରାଜରାଜଙ୍କ ଅଭିଷେକ) – ୧୪୩୪ ଖ୍ରୀ.ଅ. (ଚତୁର୍ଥ ଭାନୁଦେବଙ୍କ ଅଧୀନରେ ପୂର୍ବ ଗଙ୍ଗ ସାମ୍ରାଜ୍ୟର ସମାପ୍ତି)',
      bn: '৮৫০ / ৯৮৫ খ্রি. (চোল উত্থান ও প্রথম রাজরাজের অভিষেক) – ১৪৩৪ খ্রি. (চতুর্থ ভানুদেবের অধীনে পূর্ব গঙ্গ সাম্রাজ্যের সমাপ্তি)'
    },
    chronologicalUncertaintyNote: {
      en: 'Precisely dated via astronomical Saka and Anka inscriptions (Tiruvalangadu Plates 1017 CE, Korni Plates 1112 CE, Kendupatna Plates 1295 CE). Overlaps intentionally with late Stage 5 (850–1070 CE) to reflect simultaneous Chola, Kalyani Chalukya, Vengi, Somavamshi, and Imperial Ganga trajectories.',
      hi: 'खगोलीय शक एवं अंक शिलालेखों (तिरुवालंगाडु 1017 ई., कोर्गी 1112 ई., केंदुपटना 1295 ई.) द्वारा सटीक रूप से प्रमाणित। चोल, कल्याणी चालुक्य, वेंगी, सोमवंशी और पूर्वी गंग राजवंशों की समकालीनता दर्शाने के लिए चरण 5 के उत्तरार्ध (850–1070 ई.) के साथ समानांतर रखा गया है।',
      te: 'ఖగోళ శక మరియు అంక శాసనాల (తిరువాలంగాడు 1017, కోర్ని 1112, కేందుపాట్నా 1295) ద్వారా ఖచ్చితంగా నిర్ధారించబడింది. చోళ, కళ్యాణి చాళుక్య, వేంగి, సోమవంశ మరియు తూర్పు గాంగ సామ్రాజ్యాల సమకాలీనతను చూపడానికి దశ 5 చివరి భాగంతో (850–1070) సమాంతరంగా ఉంచబడింది.',
      kn: 'ಖಗೋಳ ಶಕ ಮತ್ತು ಅಂಕ ಶಾಸನಗಳ (ತಿರುವಾಲಂಗಾಡು 1017, ಕೊರ್ನಿ 1112, ಕೇಂದ್ರಪಾಟ್ನಾ 1295) ಮೂಲಕ ನಿಖರವಾಗಿ ದೃಢಪಟ್ಟಿದೆ. ಚೋಳ, ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯ, ವೆಂಗಿ, ಸೋಮವಂಶಿ ಮತ್ತು ಪೂರ್ವ ಗಂಗರ ಸಮಕಾಲೀನತೆಯನ್ನು ತೋರಿಸಲು ಹಂತ 5 ರೊಂದಿಗೆ ಸಮಾನಾಂತರವಾಗಿದೆ.',
      ta: 'வானியல் சக மற்றும் அங்கக் கல்வெட்டுகள் (திருவாலங்காடு 1017, கோர்னி 1112, கேந்துபாட்னா 1295) மூலம் துல்லியமாக உறுதிப்படுத்தப்பட்டுள்ளது. சோழ, கல்யாணி சாளுக்கிய, வேங்கி, சோமவம்ச மற்றும் கீழைக் கங்க வம்சங்களின் சமகாலத்தன்மையைக் காட்ட நிலை 5 உடன் இணையாக வைக்கப்பட்டுள்ளது.',
      mr: 'खगोलशास्त्रीय शक व अंक शिलालेखांद्वारे (तिरुवालंगाडू १०१७, कोर्नी १११२, केंदुपटना १२९५) अचूक सिद्ध. चोल, कल्याणी चालुक्य, वेंगी, सोमवंशी व पूर्व गंग यांची समकालीनता दर्शवण्यासाठी टप्पा ५ सोबत समांतर ठेवले आहे.',
      or: 'ଜ୍ୟୋତିଷୀୟ ଶକ ଓ ଅଙ୍କ ଶିଳାଲେଖ (ତିରୁବାଲଙ୍ଗାଡ଼ୁ ୧୦୧୭, କୋର୍ଣ୍ଣି ୧୧୧୨, କେନ୍ଦୁପାଟଣା ୧୨୯୫) ଦ୍ୱାରା ସଠିକ୍ ପ୍ରମାଣିତ। ଚୋଳ, କଲ୍ୟାଣୀ ଚାଲୁକ୍ୟ, ବେଙ୍ଗୀ, ସୋମବଂଶୀ ଓ ପୂର୍ବ ଗଙ୍ଗଙ୍କ ସମକାଳୀନତା ଦର୍ଶାଇବା ପାଇଁ ପର୍ଯ୍ୟାୟ ୫ ସହିତ ସମାନ୍ତରାଳ ରଖାଯାଇଛି।',
      bn: 'জ্যোতির্বিদ্যাগত শক ও অঙ্ক শিলালিপি (তিরুভালঙ্গাড়ু ১০১৭, কোর্নি ১১১২, কেন্দুপাটনা ১২৯৫) দ্বারা নিখুঁতভাবে প্রমাণিত। চোল, কল্যাণী চালুক্য, বেঙ্গী, সোমবংশী ও পূর্ব গঙ্গদের সমসাময়িকতা প্রদর্শনের জন্য পর্যায় ৫-এর সাথে সমান্তরাল রাখা হয়েছে।'
    },
    epistemicLabel: {
      en: 'Astronomically & Regnally Verified Imperial Epigraphy',
      hi: 'खगोलीय एवं शासन-वर्ष द्वारा सत्यापित साम्राज्यिक शिलालेख',
      te: 'ఖగోళ & రాజ్య-సంవత్సర ప్రమాణాలతో ధృవీకరించబడిన సామ్రాజ్య శాసనాలు',
      kn: 'ಖಗೋಳ ಮತ್ತು ಆಳ್ವಿಕೆಯ ವರ್ಷಗಳಿಂದ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಶಾಸನಗಳು',
      ta: 'வானியல் மற்றும் ஆட்சியாண்டுக் கணக்குகளால் உறுதிப்படுத்தப்பட்ட பேரரசுக் கல்வெட்டுகள்',
      mr: 'खगोलशास्त्रीय आणि राज्यवर्षांनी सत्यापित साम्राज्यिक शिलालेख',
      or: 'ଜ୍ୟୋତିଷୀୟ ଓ ଶାସନ-ବର୍ଷ ଦ୍ୱାରା ପ୍ରମାଣିତ ସାମ୍ରାଜ୍ୟିକ ଶିଳାଲେଖ',
      bn: 'জ্যোতির্বিদ্যা ও রাজ্যবর্ষ দ্বারা প্রমাণিত সাম্রাজ্যিক শিলালিপি'
    },
    epistemicTier: 'verified_historical',
    symbolicIllustration: ARCHIVE_IMG('konark_chariot_wheel.jpg'),
    illustrationCaption: {
      en: 'Monumental stone chariot wheel of the Konark Sun Temple (c. 1250 CE), commissioned by Imperial Eastern Ganga Emperor Langula Narasimha Deva I (r. 1238–1264 CE).',
      hi: 'कोणार्क सूर्य मंदिर (लगभग 1250 ई.) का भव्य प्रस्तर रथ चक्र, जिसका निर्माण साम्राज्यवादी पूर्वी गंग सम्राट लांगूल नरसिंह देव प्रथम (शासन 1238–1264 ई.) ने कराया।',
      te: 'సామ్రాజ్య తూర్పు గాంగ చక్రవర్తి లాంగూల నరసింహ దేవ I (పాలన క్రీ.శ. 1238–1264) నిర్మించిన కోణార్క్ సూర్య దేవాలయ (క్రీ.శ. 1250) రాతి రథ చక్రం.',
      kn: 'ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಪೂರ್ವ ಗಂಗ ಸಾಮ್ರಾಟ ಲಾಂಗೂಲ ನರಸಿಂಹ ದೇವ I (ಆಳ್ವಿಕೆ ಕ್ರಿ.ಶ. 1238–1264) ನಿರ್ಮಿಸಿದ ಕೋಣಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯದ (ಕ್ರಿ.ಶ. 1250) ಕಲ್ಲಿನ ರಥ ಚಕ್ರ.',
      ta: 'கீழைக் கங்கப் பேரரசர் முதலாம் நரசிம்ம தேவரால் (ஆட்சி பொ.ஊ. 1238–1264) கட்டப்பட்ட கொனார்க் சூரிய கோயிலின் (பொ.ஊ. 1250) கற்தேர்ச் சக்கரம்.',
      mr: 'साम्राज्यवादी पूर्व गंग सम्राट लांगूल नरसिंह देव पहिला (कारकीर्द इ.स. १२३८–१२६४) याने बांधलेल्या कोणार्क सूर्यमंदिराचे (इ.स. १२५०) भव्य दगडी रथचक्र.',
      or: 'ସାମ୍ରାଜ୍ୟବାଦୀ ପୂର୍ବ ଗଙ୍ଗ ସମ୍ରାଟ ଲାଙ୍ଗୁଳା ନରସିଂହ ଦେବ ପ୍ରଥମ (ଶାସନ ୧୨୩୮–୧୨୬୪ ଖ୍ରୀ.ଅ.) ଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିରର (୧୨୫୦ ଖ୍ରୀ.ଅ.) ପ୍ରସ୍ତର ରଥଚକ୍ର।',
      bn: 'সাম্রাজ্যবাদী পূর্ব গঙ্গ সম্রাট প্রথম লাঙ্গুলা নরসিংহ দেব (শাসন ১২৩৮–১২৬৪ খ্রি.) নির্মিত কোণার্ক সূর্য মন্দিরের (১২৫০ খ্রি.) প্রস্তর রথচক্র।'
    },
    visualTypeBadge: {
      en: 'Verified UNESCO World Heritage Monument Photography',
      hi: 'सत्यापित यूनेस्को विश्व धरोहर स्मारक छायाचित्र',
      te: 'ధృవీకరించబడిన యునెస్కో ప్రపంచ వారసత్వ స్మారక ఛాయాచిత్రం',
      kn: 'ದೃಢೀಕೃತ ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ಸ್ಮಾರಕ ಛಾಯಾಚಿತ್ರ',
      ta: 'உறுதிப்படுத்தப்பட்ட யுனெஸ்கோ உலக பாரம்பரிய நினைவுச்சின்னப் புகைப்படம்',
      mr: 'सत्यापित युनेस्को जागतिक वारसा स्मारक छायाचित्र',
      or: 'ପ୍ରମାଣିତ ୟୁନେସ୍କୋ ବିଶ୍ୱ ଐତିହ୍ୟ ସ୍ମାରକୀ ଫଟୋଚିତ୍ର',
      bn: 'প্রমাণিত ইউনেস্কো বিশ্ব ঐতিহ্য স্মৃতিস্তম্ভ আলোকচিত্র'
    },
    conciseOverview: {
      en: 'The high imperial era across Peninsular and Eastern India: the Imperial Cholas under Rajaraja I, Rajendra I, and Kulottunga I (c. 850/985–1279 CE); the Western Chalukyas of Kalyani under Vikramaditya VI (973–1189 CE); and the Imperial Eastern Gangas under Vajrahasta V, Anantavarman Chodaganga Deva, Anangabhima Deva III, and Narasimha Deva I (1038–1434 CE).',
      hi: 'प्रायद्वीपीय और पूर्वी भारत का उच्च साम्राज्यीय युग: राजराज प्रथम, राजेंद्र प्रथम और कुलोत्तुंग प्रथम के अधीन चोल साम्राज्य (850/985–1279 ई.); विक्रमादित्य षष्ठ के अधीन कल्याणी के पश्चिमी चालुक्य (973–1189 ई.); तथा वज्रहस्त पंचम, अनंतवर्मन चोडगंग देव, अनंगभीम देव तृतीय और नरसिंह देव प्रथम के अधीन साम्राज्यवादी पूर्वी गंग (1038–1434 ई.)।',
      te: 'ద్వీపకల్ప మరియు తూర్పు భారతదేశ సామ్రాజ్య యుగం: రాజరాజ I, రాజేంద్ర I మరియు కులోత్తుంగ I క్రింద చోళ సామ్రాజ్యం (850/985–1279); విక్రమాదిత్య VI క్రింద కళ్యాణి పశ్చిమ చాళుక్యులు (973–1189); మరియు వజ్రహస్త V, అనంతవర్మ చోడగంగ దేవ, అనంగభీమ దేవ III, నరసింహ దేవ I క్రింద తూర్పు గాంగ సామ్రాజ్యం (1038–1434).',
      kn: 'ಪರ್ಯಾಯ ದ್ವೀಪ ಮತ್ತು ಪೂರ್ವ ಭಾರತದ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಯುಗ: ರಾಜರಾಜ I, ರಾಜೇಂದ್ರ I ಮತ್ತು ಕುಲೋತ್ತುಂಗ I ರ ಚೋಳ ಸಾಮ್ರಾಜ್ಯ (850/985–1279); ವಿಕ್ರಮಾದಿತ್ಯ VI ರ ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯರು (973–1189); ಹಾಗೂ ವಜ್ರಹಸ್ತ V, ಅನಂತವರ್ಮನ್ ಚೋಡಗಂಗ ದೇವ ಮತ್ತು ನರಸಿಂಹ ದೇವ I ರ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಪೂರ್ವ ಗಂಗರು (1038–1434).',
      ta: 'தீபகற்ப மற்றும் கிழக்கு இந்தியாவின் பேரரசுக் காலம்: முதலாம் இராஜராஜன், முதலாம் இராஜேந்திரன் மற்றும் முதலாம் குலோத்துங்கன் கீழ் சோழப் பேரரசு (850/985–1279); ஆறாம் விக்ரமாதித்தன் கீழ் கல்யாணி மேலைச் சாளுக்கியர்கள் (973–1189); மற்றும் வஜ்ரஹஸ்தன் V, அனந்தவர்மன் சோடகங்கன், முதலாம் நரசிம்ம தேவர் கீழ் கீழைக் கங்கப் பேரரசு (1038–1434).',
      mr: 'द्वीपकल्पीय आणि पूर्व भारताचा उच्च साम्राज्यकाळ: राजराज पहिला, राजेंद्र पहिला आणि कुलोत्तुंग पहिला यांचे चोल साम्राज्य (८५०/९८५–१२७९); विक्रमादित्य सहाव्याचे कल्याणी चालुक्य साम्राज्य (९७३–११८९); आणि वज्रहस्त पाचवा, अनंतवर्मन चोडगंग देव व नरसिंह देव पहिला यांचे पूर्व गंग साम्राज्य (१०३८–१४३४).',
      or: 'ଦ୍ୱୀପକଳ୍ପ ଓ ପୂର୍ବ ଭାରତର ଉଚ୍ଚ ସାମ୍ରାଜ୍ୟ ଯୁଗ: ପ୍ରଥମ ରାଜରାଜ, ପ୍ରଥମ ରାଜେନ୍ଦ୍ର ଓ ପ୍ରଥମ କୁଲୋତ୍ତୁଙ୍ଗଙ୍କ ଚୋଳ ସାମ୍ରାଜ୍ୟ (୮୫୦/୯୮୫–୧୨୭୯); ଷଷ୍ଠ ବିକ୍ରମାଦିତ୍ୟଙ୍କ କଲ୍ୟାଣୀ ଚାଲୁକ୍ୟ (୯୭୩–୧୧୮୯); ଏବଂ ବଜ୍ରହସ୍ତ ପଞ୍ଚମ, ଅନନ୍ତବର୍ମନ ଚୋଡ଼ଗଙ୍ଗ ଦେବ ଓ ପ୍ରଥମ ନରସିଂହ ଦେବଙ୍କ ପୂର୍ବ ଗଙ୍ଗ ସାମ୍ରାଜ୍ୟ (୧୦୩୮–୧୪୩୪)।',
      bn: 'উপদ্বীপীয় ও পূর্ব ভারতের উচ্চ সাম্রাজ্যিক যুগ: প্রথম রাজরাজ, প্রথম রাজেন্দ্র ও প্রথম কুলোত্তুঙ্গের চোল সাম্রাজ্য (৮৫০/৯৮৫–১২৭৯); ষষ্ঠ বিক্রমাদিত্যের কল্যাণী চালুক্য (৯৭৩–১১৮৯); এবং পঞ্চম বজ্রহস্ত, অনন্তবর্মণ চোড়গঙ্গ দেব ও প্রথম নরসিংহ দেবের পূর্ব গঙ্গ সাম্রাজ্য (১০৩৮–১৪৩৪)।'
    },
    detailedAnalysis: {
      en: 'Anantavarman Chodaganga Deva (r. 1078–1147 CE), born of Eastern Ganga Emperor Rajaraja Devendravarman and Chola Princess Rajasundari (daughter of Virarajendra Chola), unified Kalinga and Utkala (c. 1110–1112 CE), shifting his imperial capital to Kataka (Cuttack) and constructing the monumental Shree Jagannatha Temple at Puri. His descendant Narasimha Deva I (r. 1238–1264 CE) repelled the Tughlaq/Mamluk governors of Bengal at Katasin and Lakhnauti and erected the Konark Sun Temple. When Bhanudeva IV’s rule ended in 1434 CE, the Suryavamsha Gajapathi Empire rose directly from the Eastern Ganga military command.',
      hi: 'पूर्वी गंग सम्राट राजराज देवेंद्रवर्मन और चोल राजकुमारी राजसुंदरी के पुत्र अनंतवर्मन चोडगंग देव (शासन 1078–1147 ई.) ने कलिंग और उत्कल को एकीकृत किया (1110–1112 ई.), अपनी राजधानी कटक स्थानांतरित की और पुरी के श्री जगन्नाथ मंदिर का निर्माण कराया। उनके वंशज नरसिंह देव प्रथम (1238–1264 ई.) ने बंगाल के सूबेदारों को पराजित कर कोणार्क सूर्य मंदिर का निर्माण कराया। 1434 ई. में भानुदेव चतुर्थ के शासन के अंत के साथ सूर्यवंशी गजपति साम्राज्य का उदय हुआ।',
      te: 'తూర్పు గాంగ చక్రవర్తి రాజరాజ దేవేంద్రవర్మ మరియు చోళ యువరాణి రాజసుందరి కుమారుడైన అనంతవర్మ చోడగంగ దేవ (పాలన 1078–1147) కళింగ మరియు ఉత్కళలను ఏకీకృతం చేసి (1110–1112), రాజధానిని కటక్‌కు మార్చి పూరీ జగన్నాథ ఆలయాన్ని నిర్మించాడు. ఆయన వంశీయుడు నరసింహ దేవ I (1238–1264) బెంగాల్ సుల్తానులను ఓడించి కోణార్క్ సూర్య దేవాలయాన్ని నిర్మించాడు. 1434లో భానుదేవ IV పాలన ముగియడంతో సూర్యవంశ గజపతి సామ్రాజ్యం ఆవిర్భవించింది.',
      kn: 'ಪೂರ್ವ ಗಂಗ ಸಾಮ್ರಾಟ ರಾಜರಾಜ ದೇವೇಂದ್ರವರ್ಮನ್ ಮತ್ತು ಚೋಳ ರಾಜಕುಮಾರಿ ರಾಜಸುಂದರಿಯ ಪುತ್ರ ಅನಂತವರ್ಮನ್ ಚೋಡಗಂಗ ದೇವ (1078–1147) ಕಳಿಂಗ ಮತ್ತು ಉತ್ಕಲವನ್ನು ಏಕೀಕರಿಸಿ (1110–1112), ಕಟಕ್ ಅನ್ನು ರಾಜಧಾನಿಯನ್ನಾಗಿ ಮಾಡಿ ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಿದನು. ನರಸಿಂಹ ದೇವ I (1238–1264) ಕೋಣಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಿದನು. 1434ರಲ್ಲಿ ಭಾನುದೇವ IV ರ ಆಳ್ವಿಕೆಯ ನಂತರ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ ಉದಯಿಸಿತು.',
      ta: 'கீழைக் கங்கப் பேரரசர் இராஜராஜ தேவேந்திரவர்மன் மற்றும் சோழ இளவரசி இராஜசுந்தரியின் புதல்வரான அனந்தவர்மன் சோடகங்க தேவர் (1078–1147) கலிங்கத்தையும் உத்கலத்தையும் ஒன்றிணைத்து (1110–1112), கட்டக்கைத் தலைநகராக்கி பூரி ஜெகந்நாதர் கோயிலை எழுப்பினார். முதலாம் நரசிம்ம தேவர் (1238–1264) கொனார்க் சூரிய கோயிலைக் கட்டினார். 1434-இல் நான்காம் பானுதேவருக்குப் பின் சூரியவம்ச கஜபதி பேரரசு எழுந்தது.',
      mr: 'पूर्व गंग सम्राट राजराज देवेंद्रवर्मन आणि चोल राजकन्या राजसुंदरी यांचा पुत्र अनंतवर्मन चोडगंग देव (१०७८–११४७) याने कलिंग व उत्कल एकत्र करून (१११०–१११२) कटक ही राजधानी केली आणि पुरीचे जगन्नाथ मंदिर बांधले. नरसिंह देव पहिला (१२३८–१२६४) याने कोणार्क सूर्यमंदिर उभारले. १४३४ मध्ये भानुदेव चौथ्यानंतर सूर्यवंशी गजपती साम्राज्याचा उदय झाला.',
      or: 'ପୂର୍ବ ଗଙ୍ଗ ସମ୍ରାଟ ରାଜରାଜ ଦେବେନ୍ଦ୍ରବର୍ମନ ଓ ଚୋଳ ରାଜକୁମାରୀ ରାଜସୁନ୍ଦରୀଙ୍କ ପୁତ୍ର ଅନନ୍ତବର୍ମନ ଚୋଡ଼ଗଙ୍ଗ ଦେବ (୧୦୭୮–୧୧୪୭) କଳିଙ୍ଗ ଓ ଉତ୍କଳକୁ ଏକୀভূত କରି (୧୧୧୦–୧୧୧୨) କଟକକୁ ରାଜଧାନୀ କଲେ ଓ ପୁରୀ ଶ୍ରୀ ଜଗନ୍ନାଥ ମନ୍ଦିର ନିର୍ମାଣ କଲେ। ପ୍ରଥମ ନରସିଂହ ଦେବ (୧୨୩୮–୧୨୬୪) କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ନିର୍ମାଣ କରିଥିଲେ। ୧୪୩୪ରେ ଚତୁର୍ଥ ଭାନୁଦେବଙ୍କ ପରେ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟର ଉଦୟ ହେଲା।',
      bn: 'পূর্ব গঙ্গ সম্রাট রাজরাজ দেবেন্দ্রবর্মণ ও চোল রাজকুমারী রাজসুন্দরীর পুত্র অনন্তবর্মণ চোড়গঙ্গ দেব (১০৭৮–১১৪৭) কলিঙ্গ ও উৎকলকে একীভূত করে (১১১০–১১১২) কটকে রাজধানী স্থাপন করেন এবং পুরীর জগন্নাথ মন্দির নির্মাণ করেন। প্রথম নরসিংহ দেব (১২৩৮–১২৬৪) কোণার্ক সূর্য মন্দির নির্মাণ করেন। ১৪৩৪ খ্রিস্টাব্দে চতুর্থ ভানুদেবের পর সূর্যবংশী গজপতি সাম্রাজ্যের উত্থান ঘটে।'
    },
    dateClassificationBreakdown: {
      establishedInscriptional: {
        en: 'Established Inscriptional Dates: 985 CE (Accession of Rajaraja Chola I); 1010 CE (Brihadisvara Temple dedication, SII Vol. II); 1038 CE (Saka 960 Coronation of Vajrahasta V, Narasapatam & Nadagam Plates); 1078 CE (Saka 999 Coronation of Anantavarman Chodaganga Deva, Korni Plates 1112 CE); 1230 CE (Nagari Plates of Anangabhima Deva III, EI Vol. XXVIII); 1295 CE (Saka 1217 Kendupatna Plates of Narasimha Deva II).',
        hi: 'स्थापित शिलालेखीय तिथियाँ: 985 ई. (राजराज चोल प्रथम का राज्याभिषेक); 1010 ई. (बृहदीश्वर मंदिर अभिलेख, SII Vol. II); 1038 ई. (शक 960 वज्रहस्त पंचम का अभिषेक); 1078 ई. (शक 999 अनंतवर्मन चोडगंग देव का अभिषेक, कोर्गी ताम्रपत्र 1112 ई.); 1230 ई. (अनंगभीम देव तृतीय का नागरी ताम्रपत्र, EI Vol. XXVIII); 1295 ई. (शक 1217 केंदुपटना ताम्रपत्र)।',
        te: 'నిర్ధారిత శాసన తేదీలు: క్రీ.శ. 985 (రాజరాజ చోళ I పట్టాభిషేకం); క్రీ.శ. 1010 (బృహదీశ్వర ఆలయ శాసనం); క్రీ.శ. 1038 (శక 960 వజ్రహస్త V పట్టాభిషేకం); క్రీ.శ. 1078 (శక 999 అనంతవర్మ చోడగంగ దేవ పట్టాభిషేకం, కోర్ని తామ్రశాసనం 1112); క్రీ.శ. 1230 (అనంగభీమ దేవ III నగరి తామ్రశాసనం); క్రీ.శ. 1295 (శక 1217 కేందుపాట్నా శాసనం).',
        kn: 'ದೃಢೀಕೃತ ಶಾಸನ ದಿನಾಂಕಗಳು: ಕ್ರಿ.ಶ. 985 (ಮೊದಲ ರಾಜರಾಜ ಚೋಳನ ಪಟ್ಟಾಭಿಷೇಕ); ಕ್ರಿ.ಶ. 1010 (ಬೃಹದೀಶ್ವರ ದೇವಾಲಯ ಶಾಸನ); ಕ್ರಿ.ಶ. 1038 (ಶಕ 960 ವಜ್ರಹಸ್ತ V ಪಟ್ಟಾಭಿಷೇಕ); ಕ್ರಿ.ಶ. 1078 (ಶಕ 999 ಅನಂತವರ್ಮನ್ ಚೋಡಗಂಗ ದೇವ ಪಟ್ಟಾಭಿಷೇಕ, ಕೊರ್ನಿ ತಾಮ್ರಪತ್ರ 1112); ಕ್ರಿ.ಶ. 1230 (ನಗರಿ ತಾಮ್ರಪತ್ರ); ಕ್ರಿ.ಶ. 1295 (ಕೇಂದ್ರಪಾಟ್ನಾ ತಾಮ್ರಪತ್ರ).',
        ta: 'உறுதிப்படுத்தப்பட்ட கல்வெட்டுத் தேதிகள்: பொ.ஊ. 985 (முதலாம் இராஜராஜ சோழன் முடிசூடல்); பொ.ஊ. 1010 (தஞ்சை பெரிய கோயில் கல்வெட்டு); பொ.ஊ. 1038 (சக 960 ஐந்தாம் வஜ்ரஹஸ்தன் முடிசூடல்); பொ.ஊ. 1078 (சக 999 அனந்தவர்மன் சோடகங்கன் முடிசூடல், கோர்னி செப்பேடு 1112); பொ.ஊ. 1230 (நகரி செப்பேடு); பொ.ஊ. 1295 (கேந்துபாட்னா செப்பேடு).',
        mr: 'प्रस्थापित शिलालेखीय तारखा: इ.स. ९८५ (राजराज चोल पहिला राज्याभिषेक); इ.स. १०१० (बृहदीश्वर मंदिर शिलालेख); इ.स. १०३८ (शक ९६० वज्रहस्त पाचवा राज्याभिषेक); इ.स. १०७८ (शक ९९९ अनंतवर्मन चोडगंग देव राज्याभिषेक, कोर्नी ताम्रपट १११२); इ.स. १२३० (नगरी ताम्रपट); इ.स. १२९५ (केंदुपटना ताम्रपट).',
        or: 'ପ୍ରତିଷ୍ଠିତ ଶିଳାଲେଖ ତାରିଖ: ୯୮୫ ଖ୍ରୀ.ଅ. (ପ୍ରଥମ ରାଜରାଜ ଚୋଳଙ୍କ ଅଭିଷେକ); ୧୦୧୦ ଖ୍ରୀ.ଅ. (ବୃହଦୀଶ୍ୱର ମନ୍ଦିର ଶିଳାଲେଖ); ୧୦୩୮ ଖ୍ରୀ.ଅ. (ଶକ ୯୬୦ ବଜ୍ରହସ୍ତ ପଞ୍ଚମଙ୍କ ଅଭିଷେକ); ୧୦୭୮ ଖ୍ରୀ.ଅ. (ଶକ ୯୯୯ ଅନନ୍ତବର୍ମନ ଚୋଡ଼ଗଙ୍ଗ ଦେବଙ୍କ ଅଭିଷେକ, କୋର୍ଣ୍ଣି ତାମ୍ରଶାସନ ୧୧୧୨); ୧୨୩୦ ଖ୍ରୀ.ଅ. (ନଗରୀ ତାମ୍ରଶାସନ); ୧୨୯୫ ଖ୍ରୀ.ଅ. (କେନ୍ଦୁପାଟଣା ତାମ୍ରଶାସନ)।',
        bn: 'প্রতিষ্ঠিত শিলালিপি তারিখ: ৯৮৫ খ্রি. (প্রথম রাজরাজ চোলের অভিষেক); ১০১০ খ্রি. (বৃহদীশ্বর মন্দির শিলালিপি); ১০৩৮ খ্রি. (শক ৯৬০ পঞ্চম বজ্রহস্তের অভিষেক); ১০৭৮ খ্রি. (শক ৯৯৯ অনন্তবর্মণ চোড়গঙ্গ দেবের অভিষেক, কোর্নি তাম্রশাসন ১১১২); ১২৩০ খ্রি. (নগরী তাম্রশাসন); ১২৯৫ খ্রি. (কেন্দুপাটনা তাম্রশাসন)।'
      },
      approximateDynastic: {
        en: 'Approximate Dynastic Reign Dates: Cholas of Thanjavur & Gangaikondacholapuram (c. 850–1279 CE; Imperial phase 985–1279 CE); Western Chalukyas of Kalyani (973–1189 CE); Imperial Eastern Gangas of Kalinganagara & Kataka (1038–1434 CE); Kakatiyas of Warangal (c. 1163–1323 CE) & Reddi Kingdoms (1325–1448 CE); Patan Siddhini / Solanki Tank-Engineering Tradition (c. 1094–1143 CE).',
        hi: 'अनुमानित राजवंशीय शासन तिथियाँ: तंजावुर एवं गंगैकोंडचोलपुरम के चोल (लगभग 850–1279 ई.; साम्राज्यीय काल 985–1279 ई.); कल्याणी के पश्चिमी चालुक्य (973–1189 ई.); कलिंगनगर व कटक के साम्राज्यवादी पूर्वी गंग (1038–1434 ई.); वारंगल के काकतीय (1163–1323 ई.) व रेड्डी राज्य (1325–1448 ई.); पाटन सिद्धराज सोलंकी जलाशय परंपरा (1094–1143 ई.)।',
        te: 'సుమారు రాజవంశ పాలనా తేదీలు: తంజావూరు & గంగైకొండచోళపురం చోళులు (సుమారు 850–1279; సామ్రాజ్య దశ 985–1279); కళ్యాణి పశ్చిమ చాళుక్యులు (973–1189); తూర్పు గాంగ సామ్రాజ్యం (1038–1434); ఓరుగల్లు కాకతీయులు (1163–1323) & రెడ్డి రాజ్యాలు (1325–1448); పాటన్ సిద్ధరాజ సోలంకి జలాశయ సంప్రదాయం (1094–1143).',
        kn: 'ಅಂದಾಜು ರಾಜವಂಶದ ಆಳ್ವಿಕೆ ದಿನಾಂಕಗಳು: ತಂಜಾವೂರು ಚೋಳರು (ಸು. 850–1279; ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಹಂತ 985–1279); ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯರು (973–1189); ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಪೂರ್ವ ಗಂಗರು (1038–1434); ವಾರಂಗಲ್ ಕಾಕತೀಯರು (1163–1323) ಮತ್ತು ರೆಡ್ಡಿ ರಾಜ್ಯಗಳು (1325–1448); ಪಾಟನ್ ಸಿದ್ಧರಾಜ ಸೋಲಂಕಿ ಪರಂಪರೆ (1094–1143).',
        ta: 'தோராயமான வம்ச ஆட்சிக் காலங்கள்: தஞ்சை மற்றும் கங்கைகொண்டசோழபுரச் சோழர்கள் (சுமார் 850–1279; பேரரசுக் காலம் 985–1279); கல்யாணி மேலைச் சாளுக்கியர்கள் (973–1189); கீழைக் கங்கப் பேரரசு (1038–1434); வாரங்கல் காகதியர்கள் (1163–1323) & ரெட்டி அரசுகள் (1325–1448); பதான் சித்தராஜ சோலங்கி மரபு (1094–1143).',
        mr: 'अंदाजे राजवंश काळ: तंजावर व गंगैकोंडचोलपुरमचे चोल (सु. ८५०–१२७९; साम्राज्यकाळ ९८५–१२७९); कल्याणीचे पश्चिम चालुक्य (९७३–११८९); साम्राज्यवादी पूर्व गंग (१०३८–१४३४); वारंगलचे काकतीय (११६३–१३२३) व रेड्डी राज्ये (१३२५–१४४८); पाटण सिद्धराज सोळंकी परंपरा (१०९४–११४३).',
        or: 'ଆନୁମାନିକ ରାଜବଂଶ ଶାସନ କାଳ: ତଞ୍ଜାବୁର ଚୋଳ (୮୫୦–୧୨୭୯; ସାମ୍ରାଜ୍ୟ କାଳ ୯୮୫–୧୨୭୯); କଲ୍ୟାଣୀ ପଶ୍ଚିମ ଚାଲୁକ୍ୟ (୯୭୩–୧୧୮୯); ସାମ୍ରାଜ୍ୟବାଦୀ ପୂର୍ବ ଗଙ୍ଗ (୧୦୩୮–୧୪୩୪); ୱାରଙ୍ଗଲ କାକତୀୟ (୧୧୬୩–୧୩୨୩) ଓ ରେଡ୍ଡୀ ରାଜ୍ୟ (୧୩୨୫–୧୪୪୮); ପାଟଣ ସିଦ୍ଧରାଜ ସୋಲଙ୍କୀ ପରମ୍ପରା (୧୦୯୪–୧୧୪୩)।',
        bn: 'আনুমানিক রাজবংশীয় শাসনকাল: তাঞ্জাভুর চোল (৮৫০–১২৭৯; সাম্রাজ্যিক কাল ৯৮৫–১২৭৯); কল্যাণী পশ্চিম চালুক্য (৯৭৩–১১৮৯); সাম্রাজ্যবাদী পূর্ব গঙ্গ (১০৩৮–১৪৩৪); ওয়ারঙ্গল কাকতীয় (১১৬৩–১৩২৩) ও রেড্ডি রাজ্য (১৩২৫–১৪৪৮); পাটন সিদ্ধরাজ সোলাঙ্কি পরম্পরা (১০৯৪–১১৪৩)।'
      },
      disputedInterpretations: {
        en: 'Disputed Historical Interpretations: Exact year of Chodaganga Deva’s final annexation of Somavamshi Utkala (debated between 1110 CE and 1112 CE based on Korni and Lingaraja inscriptions); exact geographic route of Rajendra Chola I’s 1022–1023 CE Odda-vishaya and Kosala-nadu march.',
        hi: 'विवादित ऐतिहासिक व्याख्याएँ: चोडगंग देव द्वारा सोमवंशी उत्कल के अंतिम विलय का सटीक वर्ष (कोर्गी और लिंगराज शिलालेखों के आधार पर 1110 ई. और 1112 ई. के बीच चर्चा); राजेंद्र चोल प्रथम के 1022–1023 ई. के ओड्ड-विषय एवं कोसल-नाडु अभियान का सटीक मार्ग।',
        te: 'వివాదాస్పద చారిత్రక వ్యాఖ్యానాలు: చోడగంగ దేవుడు సోమవంశ ఉత్కళను విలీనం చేసుకున్న ఖచ్చితమైన సంవత్సరం (కోర్ని మరియు లింగరాజ శాసనాల ఆధారంగా క్రీ.శ. 1110 మరియు 1112 మధ్య చర్చ); రాజేంద్ర చోళ I క్రీ.శ. 1022–1023 ఒడ్డ-విషయ మరియు కోసల-నాడు దండయాత్ర ఖచ్చితమైన మార్గం.',
        kn: 'ವಿವಾದಿತ ಐತಿಹಾಸಿಕ ವ್ಯಾಖ್ಯಾನಗಳು: ಚೋಡಗಂಗ ದೇವನಿಂದ ಸೋಮವಂಶಿ ಉತ್ಕಲದ ಅಂತಿಮ ವಿಲೀನದ ವರ್ಷ (ಕೊರ್ನಿ ಮತ್ತು ಲಿಂಗರಾಜ ಶಾಸನಗಳ ಆಧಾರದ ಮೇಲೆ ಕ್ರಿ.ಶ. 1110 ಮತ್ತು 1112 ರ ನಡುವೆ ಚರ್ಚೆ); ರಾಜೇಂದ್ರ ಚೋಳ I ರ ಕ್ರಿ.ಶ. 1022–1023 ರ ಒಡ್ಡ-ವಿಷಯ ದಂಡಯಾತ್ರೆಯ ಮಾರ್ಗ.',
        ta: 'விவாதத்திற்குரிய வரலாற்று விளக்கங்கள்: சோடகங்க தேவரால் சோமவம்ச உத்கலம் இணைக்கப்பட்ட துல்லியமான ஆண்டு (கோர்னி மற்றும் லிங்கராஜா கல்வெட்டுகளின்படி பொ.ஊ. 1110 மற்றும் 1112 இடையே விவாதம்); முதலாம் இராஜேந்திர சோழனின் பொ.ஊ. 1022–1023 ஒட்ட-விஷய படையெடுப்புப் பாதை.',
        mr: 'विवादित ऐतिहासिक अर्थ: चोडगंग देवाने सोमवंशी उत्कल खालसा केल्याचे अचूक वर्ष (कोर्नी व लिंगराज शिलालेखांनुसार इ.स. १११० आणि १११२ दरम्यान चर्चा); राजेंद्र चोल पहिल्याच्या इ.स. १०२२–१०२३ मधील ओड्ड-विषय मोहिमेचा अचूक मार्ग.',
        or: 'ବିବାଦୀୟ ଐତିହାସିକ ବ୍ୟାଖ୍ୟା: ଚୋଡ଼ଗଙ୍ଗ ଦେବଙ୍କ ଦ୍ୱାରା ସୋମବଂଶୀ ଉତ୍କଳ ଅଧିକାରର ସଠିକ୍ ବର୍ଷ (କୋର୍ଣ୍ଣି ଓ ଲିଙ୍ଗରାଜ ଶିଳାଲେଖ ଆଧାରରେ ୧୧୧୦ ଓ ୧୧୧୨ ଖ୍ରୀ.ଅ. ମଧ୍ୟରେ ବିତର୍କ); ପ୍ରଥମ ରାଜେନ୍ଦ୍ର ଚୋଳଙ୍କ ୧୦୨୨–୧୦୨୩ ଖ୍ରୀ.ଅ. ଓଡ଼-ବିଷୟ ଅଭିଯାନର ସଠିକ୍ ପଥ।',
        bn: 'বিতর্কিত ঐতিহাসিক ব্যাখ্যা: চোড়গঙ্গ দেব কর্তৃক সোমবংশী উৎকল অধিকারের সঠিক বছর (কোর্নি ও লিঙ্গরাজ শিলালিপির ভিত্তিতে ১১১০ ও ১১১২ খ্রিস্টাব্দের মধ্যে বিতর্ক); প্রথম রাজেন্দ্র চোলের ১০২২–১০২৩ খ্রি. ওড্ড-বিষয় অভিযানের সঠিক পথ।'
      },
      traditionalClaims: {
        en: 'Traditional Chronological Claims: Regional ballad traditions of Jasma Devi (c. 1120 CE at Siddhpur/Patan under Jayasimha Siddharaja) and Vachana hagiographies of Saint Siddharameshwara at Sonnalige/Solapur (c. 1150 CE) preserve community memories of monumental stepwell, tank, and temple construction.',
        hi: 'पारंपरिक कालानुक्रमिक दावे: पाटन के जयसिंह सिद्धराज के काल (लगभग 1120 ई.) की जसमा देवी लोकगाथाएँ और सोलापुर के संत सिद्धरामेश्वर (लगभग 1150 ई.) के वचन साहित्य में भव्य बावड़ी, जलाशय और मंदिर निर्माण की सामुदायिक स्मृतियाँ सुरक्षित हैं।',
        te: 'సాంప్రదాయ కాలక్రమ వాదనలు: పాటన్ జయసింహ సిద్ధరాజు కాలం (సుమారు క్రీ.శ. 1120) నాటి జస్మా దేవి గాథలు మరియు షోలాపూర్ సంత్ సిద్ధరామేశ్వరుని (సుమారు క్రీ.శ. 1150) వచన సాహిత్యం భారీ మెట్లబావులు, చెరువులు మరియు ఆలయ నిర్మాణాల జ్ఞాపకాలను భద్రపరిచాయి.',
        kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕಾಲಾನುಕ್ರಮ ಪ್ರತಿಪಾದನೆಗಳು: ಪಾಟನ್ ಜಯಸಿಂಹ ಸಿದ್ಧರಾಜನ ಕಾಲದ (ಸು. ಕ್ರಿ.ಶ. 1120) ಜಸ್ಮಾ ದೇವಿ ಲಾವಣಿಗಳು ಮತ್ತು ಸೊನ್ನಲಿಗೆ/ಸೊಲ್ಲಾಪುರದ ಶಿವಯೋಗಿ ಸಿದ್ಧರಾಮೇಶ್ವರರ (ಸು. ಕ್ರಿ.ಶ. 1150) ವಚನ ಸಾಹಿತ್ಯವು ಕೆರೆ-ಕಲ್ಯಾಣಿ ಮತ್ತು ದೇವಾಲಯ ನಿರ್ಮಾಣದ ಸ್ಮೃತಿಗಳನ್ನು ಉಳಿಸಿಕೊಂಡಿವೆ.',
        ta: 'மரபுவழி காலக்கணக்கு உரிமைகோரல்கள்: பதான் ஜெயசிம்ம சித்தராஜன் காலத்து (சுமார் பொ.ஊ. 1120) ஜஸ்மா தேவி கதைப்பாடல்களும் சோலாப்பூர் சித்தராமேஸ்வரர் (சுமார் பொ.ஊ. 1150) வசன இலக்கியங்களும் குளங்கள் மற்றும் கோயில் கட்டுமான நினைவுகளைப் பாதுகாத்துள்ளன.',
        mr: 'पारंपरिक कालानुक्रमिक दावे: पाटणच्या जयसिंह सिद्धराज काळातील (सु. इ.स. ११२०) जसमा देवी लोककथा आणि सोलापूरच्या संत सिद्धरामेश्वरांचे (सु. इ.स. ११५०) वचन साहित्य यात भव्य बारव, तलाव व मंदिर स्थापत्याच्या आठवणी जतन केल्या आहेत.',
        or: 'ପାରମ୍ପରିକ କାଳାନୁକ୍ରମିକ ଦାବି: ପାଟଣର ଜୟସିଂହ ସିଦ୍ଧରାଜଙ୍କ ସମୟର (ପ୍ରାୟ ୧୧୨୦ ଖ୍ରୀ.ଅ.) ଜସମା ଦେବୀ লোকଗାଥା ଓ ସୋଲାପୁରର ସନ୍ଥ ସିଦ୍ଧରାମେଶ୍ୱରଙ୍କ (ପ୍ରାୟ ୧୧୫୦ ଖ୍ରୀ.ଅ.) ବଚନ ସାହିତ୍ୟରେ ବିଶାଳ ପୁଷ୍କରିଣୀ ଓ ମନ୍ଦିର ନିର୍ମାଣର ସ୍ମୃତି ସଂରକ୍ଷିତ ଅଛି।',
        bn: 'ঐতিহ্যগত কালানুক্রমিক দাবি: পাটনের জয়সিংহ সিদ্ধরাজের সময়ের (প্রায় ১১২০ খ্রি.) জসমা দেবী লোকগাথা এবং সোলাপুরের সন্ত সিদ্ধরামেশ্বরের (প্রায় ১১৫০ খ্রি.) বচন সাহিত্যে বিশাল জলাশয় ও মন্দির নির্মাণের স্মৃতি সংরক্ষিত রয়েছে।'
      }
    },
    parallelTracks: [
      {
        corridorId: 'track_s6_kalinga_utkala',
        corridorLabel: {
          en: 'Kalinga–Utkala–Kataka Corridor',
          hi: 'कलिंग–उत्कल–कटक गलियारा',
          te: 'కళింగ–ఉత్కళ–కటక్ ప్రాంతం',
          kn: 'ಕಳಿಂಗ–ಉತ್ಕಲ–ಕಟಕ್ ವಲಯ',
          ta: 'கலிங்கம்–உத்கலம்–கட்டக் மண்டலம்',
          mr: 'कलिंग–उत्कल–कटक पट्टा',
          or: 'କଳିଙ୍ଗ–ଉତ୍କଳ–କଟକ ଅଞ୍ଚଳ',
          bn: 'কলিঙ্গ–উৎকল–কটক অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Later Somavamshis of Utkala (until c. 1110 CE) → Imperial Eastern Gangas of Kalinganagara & Kataka (1038–1434 CE: Vajrahasta V, Anantavarman Chodaganga Deva [1078–1147 CE], Anangabhima Deva III [1211–1238 CE], Langula Narasimha Deva I [1238–1264 CE], up to Bhanudeva IV [r. 1414–1434 CE])',
          hi: 'उत्कल के उत्तरवर्ती सोमवंशी (1110 ई. तक) → कलिंगनगर एवं कटक के साम्राज्यवादी पूर्वी गंग (1038–1434 ई.: वज्रहस्त पंचम, अनंतवर्मन चोडगंग देव [1078–1147 ई.], अनंगभीम देव तृतीय [1211–1238 ई.], लांगूल नरसिंह देव प्रथम [1238–1264 ई.], भानुदेव चतुर्थ [1414–1434 ई.] तक)',
          te: 'ఉత్కళ చివరి సోమవంశీయులు (1110 వరకు) → కళింగనగరం & కటక్ తూర్పు గాంగ సామ్రాజ్యం (1038–1434: వజ్రహస్త V, అనంతవర్మ చోడగంగ దేవ [1078–1147], అనంగభీమ దేవ III [1211–1238], లాంగూల నరసింహ దేవ I [1238–1264], భానుదేవ IV [1414–1434] వరకు)',
          kn: 'ಉತ್ಕಲದ ಕೊನೆಯ ಸೋಮವಂಶಿಗಳು (1110 ರವರೆಗೆ) → ಕಳಿಂಗನಗರ ಮತ್ತು ಕಟಕ್‌ನ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಪೂರ್ವ ಗಂಗರು (1038–1434: ವಜ್ರಹಸ್ತ V, ಅನಂತವರ್ಮನ್ ಚೋಡಗಂಗ ದೇವ [1078–1147], ಅನಂಗಭೀಮ ದೇವ III [1211–1238], ನರಸಿಂಹ ದೇವ I [1238–1264], ಭಾನುದೇವ IV [1414–1434] ರವರೆಗೆ)',
          ta: 'உத்கலத்தின் பிற்கால சோமவம்சத்தினர் (1110 வரை) → கலிங்கநகரம் & கட்டக் கீழைக் கங்கப் பேரரசு (1038–1434: வஜ்ரஹஸ்தன் V, அனந்தவர்மன் சோடகங்க தேவர் [1078–1147], மூன்றாம் அனங்கபீம தேவர் [1211–1238], முதலாம் நரசிம்ம தேவர் [1238–1264], நான்காம் பானுதேவன் [1414–1434] வரை)',
          mr: 'उत्कलचे उत्तरकालीन सोमवंशी (१११० पर्यंत) → कलिंगनगर व कटकचे साम्राज्यवादी पूर्व गंग (१०३८–१४३४: वज्रहस्त पाचवा, अनंतवर्मन चोडगंग देव [१०७८–११४७], अनंगभीम देव तिसरा [१२११–१२३८], नरसिंह देव पहिला [१२३८–१२६४], भानुदेव चौथा [१४१४–१४३४] पर्यंत)',
          or: 'ଉତ୍କଳର ପରବର୍ତ୍ତୀ ସୋମବଂଶୀ (୧୧୧୦ ପର୍ଯ୍ୟନ୍ତ) → କଳିଙ୍ଗନଗର ଓ କଟକର ସାମ୍ରାଜ୍ୟବାଦୀ ପୂର୍ବ ଗଙ୍ଗ (୧୦୩୮–୧୪୩୪ ଖ୍ରୀ.ଅ.: ବଜ୍ରହସ୍ତ ପଞ୍ଚମ, ଅନନ୍ତବର୍ମନ ଚୋଡ଼ଗଙ୍ଗ ଦେବ [୧୦୭୮–୧୧୪୭], ତୃତୀୟ ଅନଙ୍ଗଭୀମ ଦେବ [୧୨୧୧–୧୨୩୮], ପ୍ରଥମ ନରସିଂହ ଦେବ [୧୨୩୮–୧୨୬୪], ଚତୁର୍ଥ ଭାନୁଦେବ [୧୪୧୪–୧୪୩୪] ପର୍ଯ୍ୟନ୍ତ)',
          bn: 'উৎকলের পরবর্তী সোমবংশী (১১১০ পর্যন্ত) → কলিঙ্গনগর ও কটকের সাম্রাজ্যবাদী পূর্ব গঙ্গ (১০৩৮–১৪৩৪ খ্রি.: পঞ্চম বজ্রহস্ত, অনন্তবর্মণ চোড়গঙ্গ দেব [১০৭৮–১১৪৭], তৃতীয় অনঙ্গভীম দেব [১২১১–১২৩৮], প্রথম নরসিংহ দেব [১২৩৮–১২৬৪], চতুর্থ ভানুদেব [১৪১৪–১৪৩৪] পর্যন্ত)'
        },
        dateSpan: '1038 – 1434 CE',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Korni Copper Plates (Saka 1034 / 1112 CE); Nagari Plates (1230 CE, EI Vol. XXVIII); Kendupatna Plates (Saka 1217 / 1295 CE)'
      },
      {
        corridorId: 'track_s6_tondaimandalam_kaveri',
        corridorLabel: {
          en: 'Kaveri–Tondaimandalam Imperial Corridor',
          hi: 'कावेरी–तोंडैमंडलम साम्राज्यिक गलियारा',
          te: 'కావేరీ–తొండైమండలం సామ్రాజ్య ప్రాంతం',
          kn: 'ಕಾವೇರಿ–ತೊಂಡೈಮಂಡಲಂ ಸಾಮ್ರಾಜ್ಯ ವಲಯ',
          ta: 'காவிரி–தொண்டைமண்டலப் பேரரசு மண்டலம்',
          mr: 'कावेरी–तोंडैमंडलम साम्राज्य पट्टा',
          or: 'କାବେରୀ–ତୋଣ୍ଡୈମଣ୍ଡଳମ ସାମ୍ରାଜ୍ୟ ଅଞ୍ଚଳ',
          bn: 'কাবেরী–তোণ্ডৈমণ্ডলম সাম্রাজ্য অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Imperial Cholas of Thanjavur & Gangaikondacholapuram (Early rise c. 850 CE; Imperial zenith 985–1279 CE: Rajaraja I [985–1014 CE], Rajendra I [1014–1044 CE], Virarajendra, Kulottunga I [1070–1120 CE], Vikrama Chola, Kulottunga III, up to Rajendra III [1279 CE])',
          hi: 'तंजावुर एवं गंगैकोंडचोलपुरम के साम्राज्यवादी चोल (प्रारंभिक उदय लगभग 850 ई.; साम्राज्यीय उत्कर्ष 985–1279 ई.: राजराज प्रथम [985–1014 ई.], राजेंद्र प्रथम [1014–1044 ई.], वीरराजेंद्र, कुलोत्तुंग प्रथम [1070–1120 ई.], विक्रम चोल, राजेंद्र तृतीय [1279 ई.] तक)',
          te: 'తంజావూరు & గంగైకొండచోళపురం చోళ సామ్రాజ్యం (ప్రారంభ ఆవిర్భావం 850; సామ్రాజ్య ఉత్कर्ष 985–1279: రాజరాజ I [985–1014], రాజేంద్ర I [1014–1044], వీరరాజేంద్ర, కులోత్తుంగ I [1070–1120], రాజేంద్ర III [1279] వరకు)',
          kn: 'ತಂಜಾವೂರು ಮತ್ತು ಗಂಗೈಕೊಂಡಚೋಳಪುರಂನ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಚೋಳರು (ಆರಂಭಿಕ ಉದಯ 850; ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಉತ್ಕರ್ಷ 985–1279: ರಾಜರಾಜ I [985–1014], ರಾಜೇಂದ್ರ I [1014–1044], ಕುಲೋತ್ತುಂಗ I [1070–1120], ರಾಜೇಂದ್ರ III [1279] ರವರೆಗೆ)',
          ta: 'தஞ்சாவூர் & கங்கைகொண்டசோழபுரப் பேரரசுச் சோழர்கள் (தொடக்க எழுச்சி பொ.ஊ. 850; பேரரசு உச்சம் 985–1279: முதலாம் இராஜராஜன் [985–1014], முதலாம் இராஜேந்திரன் [1014–1044], முதலாம் குலோத்துங்கன் [1070–1120], மூன்றாம் இராஜேந்திரன் [1279] வரை)',
          mr: 'तंजावर व गंगैकोंडचोलपुरमचे साम्राज्यवादी चोल (प्रारंभिक उदय ८५०; साम्राज्य उत्कर्ष ९८५–१२७९: राजराज पहिला [९८५–१०१४], राजेंद्र पहिला [१०१४–१०४४], कुलोत्तुंग पहिला [१०७०–११२०], राजेंद्र तिसरा [१२७९] पर्यंत)',
          or: 'ତଞ୍ଜାବୁର ଓ ଗଙ୍ଗୈକୋଣ୍ଡଚୋଳପୁରମର ଚୋଳ ସାମ୍ରାଜ୍ୟ (ପ୍ରାରମ୍ଭିକ ଉଦୟ ୮୫୦; ସାମ୍ରାଜ୍ୟ ଉତ୍କର୍ଷ ୯୮୫–୧୨୭୯: ପ୍ରଥମ ରାଜରାଜ [୯୮୫–୧୦୧୪], ପ୍ରଥମ ରାଜେନ୍ଦ୍ର [୧୦୧୪–୧୦୪୪], ପ୍ରଥମ କୁଲୋତ୍ତୁଙ୍ଗ [୧୦୭୦–୧୧୨୦], ତୃତୀୟ ରାଜେନ୍ଦ୍ର [୧୨୭୯] ପର୍ଯ୍ୟନ୍ତ)',
          bn: 'তাঞ্জাভুর ও গঙ্গাইকোণ্ডচোলপুরমের চোল সাম্রাজ্য (প্রারম্ভিক উত্থান ৮৫০; সাম্রাজ্যিক উৎকর্ষ ৯৮৫–১২৭৯: প্রথম রাজরাজ [৯৮৫–১০১৪], প্রথম রাজেন্দ্র [১০১৪–১০৪৪], প্রথম কুলোত্তুঙ্গ [১০৭০–১১২০], তৃতীয় রাজেন্দ্র [১২৭৯] পর্যন্ত)'
        },
        dateSpan: 'c. 850 / 985 – 1279 CE',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Thanjavur Brihadisvara Inscriptions (SII Vol. II); Tiruvalangadu Copper Plates (SII Vol. III, 1017 CE)'
      },
      {
        corridorId: 'track_s6_karnata_deccan',
        corridorLabel: {
          en: 'Karnata–Kalyani–Deccan Corridor',
          hi: 'कर्णाट–कल्याणी–दक्कन गलियारा',
          te: 'కర్ణాట–కళ్యాణి–దక్కన్ ప్రాంతం',
          kn: 'ಕರ್ಣಾಟ–ಕಲ್ಯಾಣಿ–ದಕ್ಕನ್ ವಲಯ',
          ta: 'கர்நாடக–கல்யாணி–தக்காண மண்டலம்',
          mr: 'कर्णाट–कल्याणी–दख्खन पट्टा',
          or: 'କର୍ଣ୍ଣାଟ–କଲ୍ୟାଣୀ–ଦక్కନ ଅଞ୍ଚଳ',
          bn: 'কর্ণাট–কল্যাণী–দাক্ষিণাত্য অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Western Chalukyas of Kalyani (973–1189 CE: Tailapa II, Someshvara I, Vikramaditya VI [1076–1126 CE, Chalukya-Vikrama Era]) → Hoysalas of Dwarasamudra (c. 1026–1343 CE) & Seuna Yadavas of Devagiri (c. 1187–1317 CE); Early Vijayanagara Sangama Line from 1336 CE',
          hi: 'कल्याणी के पश्चिमी चालुक्य (973–1189 ई.: तैलप द्वितीय, सोमेश्वर प्रथम, विक्रमादित्य षष्ठ [1076–1126 ई., चालुक्य-विक्रम संवत]) → द्वारसमुद्र के होयसल (1026–1343 ई.) व देवगिरि के यादव (1187–1317 ई.); 1336 ई. से प्रारंभिक विजयनगर संगम वंश',
          te: 'కళ్యాణి పశ్చిమ చాళుక్యులు (973–1189: తైలప II, సోమేశ్వర I, విక్రమాదిత్య VI [1076–1126, చాళుక్య-విక్రమ శకం]) → ద్వారసముద్ర హోయసలులు (1026–1343) & దేవగిరి యాదవులు (1187–1317); 1336 నుండి ప్రారంభ విజయనగర సంగమ వంశం',
          kn: 'ಕಲ್ಯಾಣಿಯ ಪಶ್ಚಿಮ ಚಾಳುಕ್ಯರು (973–1189: ತೈಲಪ II, ಸೋಮೇಶ್ವರ I, ವಿಕ್ರಮಾದಿತ್ಯ VI [1076–1126, ಚಾಳುಕ್ಯ-ವಿಕ್ರಮ ಶಕೆ]) → ದ್ವಾರಸಮುದ್ರದ ಹೊಯ್ಸಳರು (1026–1343) ಮತ್ತು ದೇವಗಿರಿಯ ಸೇವುಣ ಯಾದವರು (1187–1317); 1336 ರಿಂದ ವಿಜಯನಗರ ಸಂಗಮ ವಂಶ',
          ta: 'கல்யாணி மேலைச் சாளுக்கியர்கள் (973–1189: தைலபன் II, சோமேஸ்வரன் I, ஆறாம் விக்ரமாதித்தன் [1076–1126, சாளுக்கிய-விக்ரம சகாப்தம்]) → துவாரசமுத்திர ಹೊಯ್ಸಳர்கள் (1026–1343) & தேவகிரி யாதவர்கள் (1187–1317); 1336 முதல் விஜயநகர சங்கம வம்சம்',
          mr: 'कल्याणीचे पश्चिम चालुक्य (९७३–११८९: तैलप दुसरा, सोमेश्वर पहिला, विक्रमादित्य सहावा [१०७६–११२६, चालुक्य-विक्रम संवत]) → द्वारसमुद्राचे होयसळ (१०२६–१३४३) व देवगिरीचे यादव (११८७–१३१७); १३३६ पासून विजयनगर संगम वंश',
          or: 'କଲ୍ୟାଣୀର ପଶ୍ଚିମ ଚାଲୁକ୍ୟ (୯୭୩–୧୧୮୯: ଦ୍ୱିତୀୟ ତୈଳପ, ଷଷ୍ଠ ବିକ୍ରମାଦିତ୍ୟ [୧୦୭୬–୧୧୨୬]) → ହୋୟସଳ (୧୦୨୬–୧୩୪୩) ଓ ଦେବଗିରି ଯାଦବ (୧୧୮୭–୧୩୧୭); ୧୩୩୬ ରୁ ବିଜୟନଗର ସଙ୍ଗମ ବଂଶ',
          bn: 'কল্যাণীর পশ্চিম চালুক্য (৯৭৩–১১৮৯: দ্বিতীয় তৈলপ, ষষ্ঠ বিক্রমাদিত্য [১০৭৬–১১২৬]) → হোয়সল (১০২৬–১৩৪৩) ও দেবগিরির যাদব (১১৮৭–১৩১৭); ১৩৩৬ থেকে বিজয়নগর সঙ্গম বংশ'
        },
        dateSpan: '973 – 1343/1434 CE',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Gadag & Ittagi Inscriptions of Vikramaditya VI (EI Vol. XIII & XV); Sonnalige / Solapur Vachana Epigraphs (c. 1150 CE)'
      },
      {
        corridorId: 'track_s6_vengi_andhra',
        corridorLabel: {
          en: 'Vengi–Warangal–Coastal Andhra Corridor',
          hi: 'वेंगी–वारंगल–तटीय आंध्र गलियारा',
          te: 'వేంగి–ఓరుగల్లు–తీర ఆంధ్ర ప్రాంతం',
          kn: 'ವೆಂಗಿ–ವಾರಂಗಲ್–ಕರಾವಳಿ ಆಂಧ್ರ ವಲಯ',
          ta: 'வேங்கி–வாரங்கல்–ஆந்திரக் கடற்கரை மண்டலம்',
          mr: 'वेंगी–वारंगल–किनारी आंध्र पट्टा',
          or: 'ବେଙ୍ଗୀ–ୱାରଙ୍ଗଲ–ତଟବର୍ତ୍ତୀ ଆନ୍ଧ୍ର ଅଞ୍ଚଳ',
          bn: 'বেঙ্গী–ওয়ারঙ্গল–উপকূলীয় অন্ধ্র অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Chola-Chalukya Viceroyalty of Vengi (1070–1189 CE) & Velanati Chodas → Kakatiyas of Orugallu / Warangal (c. 1163–1323 CE: Ganapatideva, Rudramadevi, Prataparudra) → Musunuri Nayakas, Reddi Kingdoms of Kondavidu & Rajamahendravaram (1325–1448 CE), and Padmanayakas of Rachakonda/Devarakonda',
          hi: 'वेंगी का चोल-चालुक्य प्रांत (1070–1189 ई.) व वेलनाटि चोड → वारंगल के काकतीय (1163–1323 ई.: गणपतिदेव, रुद्रमादेवी, प्रतापरुद्र) → मुसुनूरी नायक, कोंडवीडु एवं राजमहेंद्रवरम के रेड्डी राज्य (1325–1448 ई.) तथा राचकोंडा पद्मनायक',
          te: 'వేంగి చోళ-చాళుక్య పాలన (1070–1189) & వెలనాటి చోడులు → ఓరుగల్లు కాకతీయులు (1163–1323: గణపతిదేవుడు, రుద్రమదేవి, ప్రతాపరుద్రుడు) → ముసునూరి నాయకులు, కొండవీడు & రాజమహేంద్రవరం రెడ్డి రాజ్యాలు (1325–1448), రాచకొండ పద్మనాయకులు',
          kn: 'ವೆಂಗಿಯ ಚೋಳ-ಚಾಳುಕ್ಯ ಆಳ್ವಿಕೆ (1070–1189) → ವಾರಂಗಲ್ ಕಾಕತೀಯರು (1163–1323: ಗಣಪತಿದೇವ, ರುದ್ರಮದೇವಿ, ಪ್ರತಾಪರುದ್ರ) → ಮುసునూರಿ ನಾಯಕರು, ಕೊಂಡವೀಡು ಮತ್ತು ರಾಜಮಹೇಂದ್ರವರಂ ರೆಡ್ಡಿ ರಾಜ್ಯಗಳು (1325–1448)',
          ta: 'வேங்கி சோழ-சாளுக்கிய ஆட்சி (1070–1189) → வாரங்கல் காகதியர்கள் (1163–1323: கணபதிதேவன், உருத்திரமாதேவி, பிரதாபருத்ரன்) → முசுனூரி நாயக்கர்கள், கொண்டவீடு & இராஜமகேந்திரவரம் ரெட்டி அரசுகள் (1325–1448)',
          mr: 'वेंगीचे चोल-चालुक्य प्रांत (१०७०–११८९) → वारंगलचे काकतीय (११६३–१३२३: गणपतीदेव, रुद्रमादेवी, प्रतापरुद्र) → मुसुनूरी नायक, कोंडवीडू व राजमहेंद्रवरमची रेड्डी राज्ये (१३२५–१४४८)',
          or: 'ବେଙ୍ଗୀର ଚୋଳ-ଚାଲୁକ୍ୟ ଶାସନ (୧୦୭୦–୧୧୮୯) → ୱାରଙ୍ଗଲର କାକତୀୟ (୧୧୬୩–୧୩୨୩: ଗଣପତିଦେବ, ରୁଦ୍ରମାଦେବୀ) → କୋଣ୍ଡାଭିଡ଼ୁ ଓ ରାଜମହେନ୍ଦ୍ରବରମର ରେଡ୍ଡୀ ରାଜ୍ୟ (୧୩୨୫–୧୪୪୮)',
          bn: 'বেঙ্গীর চোল-চালুক্য শাসন (১০৭০–১১৮৯) → ওয়ারঙ্গলের কাকতীয় (১১৬৩–১৩২৩: গণপতিদেব, রুদ্রমাদেবী) → কোন্ডাভিডু ও রাজমহেন্দ্রবরমের রেড্ডি রাজ্য (১৩২৫–১৪৪৮)'
        },
        dateSpan: '1070 – 1434/1448 CE',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Draksharama & Simhachalam Trilingual Epigraphs (SII Vol. IV & VI); Hanamkonda Thousand-Pillar Inscription (1163 CE)'
      }
    ],
    keyMonumentsAndInscriptions: ['Brihadisvara Temple Thanjavur (1010 CE)', 'Shree Jagannatha Temple Puri & Korni Plates (1112 CE)', 'Konark Sun Temple (c. 1250 CE) & Kendupatna Plates (1295 CE)', 'Rani-ki-Vav & Sahasralinga Talav Patan (c. 1120 CE)', 'Thousand Pillar Temple Hanamkonda (1163 CE) & Ramappa Temple Palampet (1213 CE)'],
    linkedArticleIds: ['art_dyn_imperial_cholas', 'art_dyn_chalukya_synthesis', 'art_dyn_eastern_gangas', 'art_dyn_kakatiya_orugallu', 'art_dyn_siddhini_kings_verification', 'art_lin_suryavamshi_kings'],
    linkedEventIds: [
      'ev_jasma_devi_1120',
      'ev_siddharameshwara_1150',
      'ev_kakatiya_emergence_1000',
      'ev_kakatiya_independence_1163',
      'ev_kakatiya_orugallu_capital_1195',
      'ev_kakatiya_ganapati_reign_1199',
      'ev_kakatiya_rudrama_reign_1262',
      'ev_kakatiya_prataparudra_reign_1289',
      'ev_kakatiya_delhi_sieges_1309',
      'ev_kakatiya_fall_warangal_1323'
    ]
  },
  {
    stageOrder: 7,
    id: 'stage_07_late_medieval',
    refNumber: 'HT-0008',
    stageCode: 'LATE_MEDIEVAL_PERIOD',
    title: {
      en: 'Stage 7: Late Medieval Imperial & Fortress Era — Suryavamsha Gajapathis (Kapilendra, Purushottama & Prataparudra Deva), Chalukya Mukunda Deva, Vijayanagara & Regional Samasthanams (1434/1435 – 1757/1766 CE)',
      hi: 'चरण 7: उत्तर मध्यकालीन साम्राज्य एवं दुर्ग काल — सूर्यवंशी गजपति (कपिलेंद्र, पुरुषोत्तम एवं प्रतापरुद्र देव), मुकुंद देव, विजयनगर एवं क्षेत्रीय संस्थान (1434/1435 – 1757/1766 ई.)',
      te: 'దశ 7: మలి మధ్యయుగ సామ్రాజ్య & దుర్గ యుగం — సూర్యవంశ గజపతులు (కపిలేంద్ర, పురుషోత్తమ & ప్రతాపరుద్ర దేవ), ముకుంద దేవ, విజయనగరం & సంస్థానాలు (క్రీ.శ. 1434/1435 – 1757/1766)',
      kn: 'ಹಂತ 7: ಉತ್ತರ ಮಧ್ಯಕಾಲೀನ ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ಕೋಟೆ ಯುಗ — ಸೂರ್ಯವಂಶ ಗಜಪತಿಗಳು (ಕಪಿಲೇಂದ್ರ, ಪುರುಷೋತ್ತಮ ಮತ್ತು ಪ್ರತಾಪರುದ್ರ ದೇವ), ಮುಕುಂದ ದೇವ, ವಿಜಯನಗರ ಮತ್ತು ಸಂಸ್ಥಾನಗಳು (ಕ್ರಿ.ಶ. 1434/1435 – 1757/1766)',
      ta: 'நிலை 7: பிற்கால இடைக்காலப் பேரரசு & கோட்டைக் காலம் — சூரியவம்ச கஜபதிகள் (கபிலேந்திர, புருஷோத்தம & பிரதாபருத்ர தேவர்), முகுந்த தேவர், விஜயநகரம் & சமஸ்தானங்கள் (பொ.ஊ. 1434/1435 – 1757/1766)',
      mr: 'टप्पा 7: उत्तर मध्ययुगीन साम्राज्य व दुर्ग काळ — सूर्यवंशी गजपती (कपिलेंद्र, पुरुषोत्तम व प्रतापरुद्र देव), मुकुंद देव, विजयनगर आणि प्रादेशिक संस्थाने (इ.स. १४३४/१४३५ – १७५७/१७६६)',
      or: 'ପର୍ଯ୍ୟାୟ ୭: ଉତ୍ତର-ମଧ୍ୟଯୁଗୀୟ ସାମ୍ରାଜ୍ୟ ଓ ଦୁର୍ଗ ଯୁଗ — ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି (କପିଳେନ୍ଦ୍ର, ପୁରୁଷୋତ୍ତମ ଓ ପ୍ରତାପରୁଦ୍ର ଦେବ), ମୁକୁନ୍ଦ ଦେବ, ବିଜୟନଗର ଓ ସଂସ୍ଥାନ (୧୪୩୪/୧୪୩୫ – ୧୭୫୭/୧୭୬୬ ଖ୍ରୀ.ଅ.)',
      bn: 'পর্যায় ৭: উত্তর-মধ্যযুগীয় সাম্রাজ্য ও দুর্গ যুগ — সূর্যবংশী গজপতি (কপিলেন্দ্র, পুরুষোত্তম ও প্রতাপরুদ্র দেব), মুকুন্দ দেব, বিজয়নগর ও আঞ্চলিক সংস্থান (১৪৩৪/১৪৩৫ – ১৭৫৭/১৭৬৬ খ্রি.)'
    },
    approxDateLabel: {
      en: '1434/1435 CE (Coronation of Kapilendra Deva) – 1757/1766 CE (Veligalani Grant 1458 CE [Saka 1380], Srirangam 1464 CE, Barabati Citadel 1568 CE & Southern Samasthanams)',
      hi: '1434/1435 ई. (कपिलेंद्र देव का राज्याभिषेक) – 1757/1766 ई. (वेलिगलानि ताम्रपत्र 1458 ई. [शक 1380], श्रीरंगम 1464 ई., बाराबती दुर्ग 1568 ई. एवं दक्षिणी संस्थान)',
      te: 'క్రీ.శ. 1434/1435 (కపిలేంద్ర దేవుని పట్టాభిషేకం) – క్రీ.శ. 1757/1766 (వెలిగలాని తామ్రశాసనం 1458 [శక 1380], శ్రీరంగం 1464, బారాబతి కోట 1568 & దక్షిణ సంస్థానాలు)',
      kn: 'ಕ್ರಿ.ಶ. 1434/1435 (ಕಪಿಲೇಂದ್ರ ದೇವನ ಪಟ್ಟಾಭಿಷೇಕ) – ಕ್ರಿ.ಶ. 1757/1766 (ವೆಲಿಗಲಾನಿ ತಾಮ್ರಪತ್ರ 1458 [ಶಕ 1380], ಶ್ರೀರಂಗಂ 1464, ಬಾರಾಬತಿ ಕೋಟೆ 1568 ಮತ್ತು ಸಂಸ್ಥಾನಗಳು)',
      ta: 'பொ.ஊ. 1434/1435 (கபிலேந்திர தேவர் முடிசூடல்) – பொ.ஊ. 1757/1766 (வெலிகலானி செப்பேடு 1458 [சக 1380], ஸ்ரீரங்கம் 1464, பாராபதி கோட்டை 1568 & சமஸ்தானங்கள்)',
      mr: 'इ.स. १४३४/१४३५ (कपिलेंद्र देवाचा राज्याभिषेक) – इ.स. १७५७/१७६६ (वेलिगलानि ताम्रपट १४५८ [शक १३८०], श्रीरंगम १४६४, बाराबती किल्ला १५६८ व संस्थाने)',
      or: '୧୪୩୪/୧୪୩୫ ଖ୍ରୀ.ଅ. (କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଅଭିଷେକ) – ୧୭୫୭/୧୭୬୬ ଖ୍ରୀ.ଅ. (ଭେଲିଗଲାନି ତାମ୍ରଶାସନ ୧୪୫୮ [ଶକ ୧୩୮୦], ଶ୍ରୀରଙ୍ଗମ ୧୪୬୪, ବାରବାଟୀ ଦୁର୍ଗ ୧୫୬୮ ଓ ସଂସ୍ଥାନ)',
      bn: '১৪৩৪/১৪৩৫ খ্রি. (কপিলেন্দ্র দেবের অভিষেক) – ১৭৫৭/১৭৬৬ খ্রি. (ভেলিগলানি তাম্রশাসন ১৪৫৮ [শক ১৩৮০], শ্রীরঙ্গম ১৪৬৪, বারবাটী দুর্গ ১৫৬৮ ও সংস্থান)'
    },
    chronologicalUncertaintyNote: {
      en: 'Anchored by the Veligalani Copper-Plate Grant of 1458 CE (Saka 1380, Epigraphia Indica Vol. XXXIII, pp. 275–292, ed. D.C. Sircar) and Srirangam Edict of 1464 CE. Kapilendra Deva’s final year is preserved with scholarly divergence: 1466/1467 CE (R. Subrahmanyam 1957; K.C. Panigrahi 1981) vs. 1468–1470 CE (R.D. Banerji 1930; P. Mukherjee 1953) due to overlapping Anka reckonings.',
      hi: '1458 ई. (शक 1380, एपिग्राफिया इंडिका खंड XXXIII, पृ. 275–292, सं. डी.सी. सरकार) के वेलिगलानि ताम्रपत्र और 1464 ई. के श्रीरंगम अभिलेख द्वारा प्रमाणित। कपिलेंद्र देव के अंतिम शासन वर्ष पर विद्वानों के दोनों मत संरक्षित हैं: 1466/1467 ई. (आर. सुब्रह्मण्यम 1957; के.सी. पाणिग्रही 1981) बनाम 1468–1470 ई. (आर.डी. बनर्जी 1930; पी. मुखर्जी 1953)।',
      te: 'క్రీ.శ. 1458 (శక 1380, ఎపిగ్రాఫియా ఇండికా Vol. XXXIII, pp. 275–292, సం. డి.సి. సర్కార్) వెలిగలాని తామ్రశాసనం మరియు క్రీ.శ. 1464 శ్రీరంగం శాసనం ద్వారా నిర్ధారించబడింది. కపిలేంద్ర దేవుని చివరి పాలనా సంవత్సరంపై రెండు పండిత అభిప్రాయాలు పొందుపరచబడ్డాయి: క్రీ.శ. 1466/1467 (ఆర్. సుబ్రహ్మణ్యం 1957; కె.సి. పాణిగ్రహి 1981) vs క్రీ.శ. 1468–1470 (ఆర్.డి. బెనర్జీ 1930; పి. ముఖర్జీ 1953).',
      kn: 'ಕ್ರಿ.ಶ. 1458 (ಶಕ 1380, ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ Vol. XXXIII, ಪು. 275–292, ಡಿ.ಸಿ. ಸರ್ಕಾರ್) ವೆಲಿಗಲಾನಿ ತಾಮ್ರಪತ್ರ ಮತ್ತು ಕ್ರಿ.ಶ. 1464 ಶ್ರೀರಂಗಂ ಶಾಸನದಿಂದ ದೃಢಪಟ್ಟಿದೆ. ಕಪಿಲೇಂದ್ರ ದೇವನ ಕೊನೆಯ ವರ್ಷದ ಕುರಿತು ವಿದ್ವಾಂಸರ ಎರಡೂ ಮತಗಳನ್ನು ಉಳಿಸಲಾಗಿದೆ: ಕ್ರಿ.ಶ. 1466/1467 (ಆರ್. ಸುಬ್ರಹ್ಮಣ್ಯಂ 1957; ಕೆ.ಸಿ. ಪಾಣಿಗ್ರಹಿ 1981) vs ಕ್ರಿ.ಶ. 1468–1470 (ಆರ್.ಡಿ. ಬ್ಯಾನರ್ಜಿ 1930; ಪಿ. ಮುಖರ್ಜಿ 1953).',
      ta: 'பொ.ஊ. 1458 (சக 1380, எபிகிராபியா இண்டிகா Vol. XXXIII, பக். 275–292, டி.சி. சர்க்கார்) வெலிகலானி செப்பேடு மற்றும் 1464 ஸ்ரீரங்கம் கல்வெட்டால் உறுதிப்படுத்தப்பட்டது. கபிலேந்திர தேவரின் இறுதி ஆண்டு குறித்த இரு அறிஞர் கருத்துக்களும் பாதுகாக்கப்பட்டுள்ளன: பொ.ஊ. 1466/1467 (ஆர். சுப்பிரமணியம் 1957; கே.சி. பாணிகிரஹி 1981) எதிர் பொ.ஊ. 1468–1470 (ஆர்.டி. பானர்ஜி 1930; பி. முகர்ஜி 1953).',
      mr: 'इ.स. १४५८ (शक १३८०, एपिग्राफिया इंडिका खंड XXXIII, पृ. २७५–२९२, डी.सी. सरकार) वेलिगलानि ताम्रपट आणि १४६४ च्या श्रीरंगम शिलालेखाद्वारे सिद्ध. कपिलेंद्र देवाच्या शेवटच्या वर्षाबाबत दोन्ही विद्वत्तापूर्ण मते जतन केली आहेत: इ.स. १४६६/१४६७ (आर. सुब्रह्मण्यम १९५७; के.सी. पाणिग्रही १९८१) विरुद्ध इ.स. १४६८–१४७० (आर.डी. बॅनर्जी १९३०; पी. मुखर्जी १९५३).',
      or: '୧୪୫୮ ଖ୍ରୀ.ଅ. (ଶକ ୧୩୮୦, ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା ଖଣ୍ଡ XXXIII, ପୃ. ୨୭୫–୨୯୨, ଡି.ସି. ସରକାର) ଭେଲିଗଲାନି ତାମ୍ରଶାସନ ଓ ୧୪୬୪ ଶ୍ରୀରଙ୍ଗମ ଶିଳାଲେଖ ଦ୍ୱାରା ପ୍ରମାଣିତ। କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଶେଷ ଶାସନ ବର୍ଷ ବିଷୟରେ ଉଭୟ ଐତିହାସିକ ମତ ସଂରକ୍ଷିତ: ୧୪୬୬/୧୪୬୭ ଖ୍ରୀ.ଅ. (ଆର. ସୁବ୍ରହ୍ମଣ୍ୟମ ୧୯୫୭; କେ.ସି. ପାଣିଗ୍ରାହୀ ୧୯୮୧) ବନାମ ୧୪୬୮–୧୪୭୦ ଖ୍ରୀ.ଅ. (ଆର.ଡି. ବାନାର୍ଜୀ ୧୯୩୦; ପି. ମୁଖାର୍ଜୀ ୧୯୫୩)।',
      bn: '১৪৫৮ খ্রি. (শক ১৩৮০, এপিগ্রাফিয়া ইন্ডিকা খণ্ড XXXIII, পৃ. ২৭৫–২৯২, ডি.সি. সরকার) ভেলিগলানি তাম্রশাসন ও ১৪৬৪ শ্রীরঙ্গম শিলালিপি দ্বারা প্রমাণিত। কপিলেন্দ্র দেবের শেষ শাসনবর্ষ বিষয়ে উভয় ঐতিহাসিক মত সংরক্ষিত: ১৪৬৬/১৪৬৭ খ্রি. (আর. সুব্রহ্মণ্যম ১৯৫৭; কে.সি. পানিগ্রাহী ১৯৮১) বনাম ১৪৬৮–১৪৭০ খ্রি. (আর.ডি. ব্যানার্জী ১৯৩০; পি. মুখার্জী ১৯৫৩)।'
    },
    epistemicLabel: {
      en: 'Epigraphic (Saka & Anka), Mughal Chronicle & Mackenzie Kaifiyat Evidence',
      hi: 'शिलालेख (शक एवं अंक), मुगल वृत्तांत एवं मैकेंज़ी कैफियत साक्ष्य',
      te: 'శాసన (శక & అంక), మొఘల్ చరిత్ర & మెకంజీ కైఫియత్ ఆధారాలు',
      kn: 'ಶಾಸನ (ಶಕ ಮತ್ತು ಅಂಕ), ಮೊಘಲ್ ವೃತ್ತಾಂತ ಮತ್ತು ಮೆಕೆಂಜಿ ಕೈಫಿಯತ್ ಸಾಕ್ಷ್ಯ',
      ta: 'கல்வெட்டு (சக & அங்க), முகலாய ஆவணம் & மெக்கன்சி கைஃபியத் சான்று',
      mr: 'शिलालेख (शक व अंक), मुघल बखर आणि मॅकेन्झी कैफियत पुरावा',
      or: 'ଶିଳାଲେଖ (ଶକ ଓ ଅଙ୍କ), ମୋଗଲ ବିବରଣୀ ଓ ମ୍ୟାକେଞ୍ଜି କୈଫିୟତ୍ ପ୍ରମାଣ',
      bn: 'শিলালিপি (শক ও অঙ্ক), মুঘল বিবরণী ও ম্যাকেঞ্জি কৈফিয়ত প্রমাণ'
    },
    epistemicTier: 'verified_historical',
    symbolicIllustration: ARCHIVE_IMG('kapilendra_deva_coronation.jpg'),
    illustrationCaption: {
      en: 'Imperial Coronation and Gajasena (War-Elephant Corps) of the Suryavamsha Gajapathi Empire (1434/35–1540 CE) alongside Barabati Fort Kataka — Artistic Reconstruction informed by the Veligalani Grant (1458 CE / Saka 1380) and Lingaraja Temple edicts.',
      hi: 'सूर्यवंशी गजपति साम्राज्य (1434/35–1540 ई.) का राज्याभिषेक एवं गजसेना तथा कटक का बाराबती दुर्ग — वेलिगलानि ताम्रपत्र (1458 ई. / शक 1380) और लिंगराज शिलालेखों पर आधारित पुनर्निर्माण।',
      te: 'సూర్యవంశ గజపతి సామ్రాజ్య (క్రీ.శ. 1434/35–1540) పట్టాభిషేకం, గజసేన మరియు కటక్ బారాబతి కోట — వెలిగలాని తామ్రశాసనం (క్రీ.శ. 1458 / శక 1380) మరియు లింగరాజ శాసనాల ఆధారంగా పునర్నిర్మాణం.',
      kn: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ (ಕ್ರಿ.ಶ. 1434/35–1540) ಪಟ್ಟಾಭಿಷೇಕ, ಗಜಸೇನೆ ಮತ್ತು ಕಟಕ್ ಬಾರಾಬತಿ ಕೋಟೆ — ವೆಲಿಗಲಾನಿ ತಾಮ್ರಪತ್ರ (ಕ್ರಿ.ಶ. 1458 / ಶಕ 1380) ಮತ್ತು ಲಿಂಗರಾಜ ಶಾಸನಗಳ ಆಧಾರಿತ ಪುನರ್ನಿರ್ಮಾಣ.',
      ta: 'சூரியவம்ச கஜபதி பேரரசின் (பொ.ஊ. 1434/35–1540) முடிசூட்டு விழா, கஜசேனை மற்றும் கட்டக் பாராபதி கோட்டை — வெலிகலானி செப்பேடு (பொ.ஊ. 1458 / சக 1380) அடிப்படையிலான கலை மீள்கட்டமைப்பு.',
      mr: 'सूर्यवंशी गजपती साम्राज्याचा (इ.स. १४३४/३५–१५४०) राज्याभिषेक, गजसेना व बाराबती किल्ला — वेलिगलानि ताम्रपट (इ.स. १४५८ / शक १३८०) आणि लिंगराज शिलालेखांवर आधारित पुनर्निर्माण.',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ (୧୪୩୪/୩୫–୧୫୪୦ ଖ୍ରୀ.ଅ.) ର ଅଭିଷେକ, ଗଜସେନା ଓ କଟକ ବାରବାଟୀ ଦୁର୍ଗ — ଭେଲିଗଲାନି ତାମ୍ରଶାସନ (୧୪୫୮ ଖ୍ରୀ.ଅ. / ଶକ ୧୩୮୦) ଆଧାରିତ ପୁନର୍ନିର୍ମାଣ।',
      bn: 'সূর্যবংশী গজপতি সাম্রাজ্যের (১৪৩৪/৩৫–১৫৪০ খ্রি.) অভিষেক, গজসেনা ও কটক বারবাটী দুর্গ — ভেলিগলানি তাম্রশাসন (১৪৫৮ খ্রি. / শক ১৩৮০) ভিত্তিক পুনর্নির্মাণ।'
    },
    visualTypeBadge: {
      en: 'Epigraphically Informed Reconstruction & Fort Architecture',
      hi: 'शिलालेख-आधारित पुनर्निर्माण एवं दुर्ग स्थापत्य',
      te: 'శాసన ఆధారిత పునర్నిర్మాణం & కోట వాస్తుశిల్పం',
      kn: 'ಶಾಸನಾಧಾರಿತ ಪುನರ್ನಿರ್ಮಾಣ ಮತ್ತು ಕೋಟೆ ವಾಸ್ತುಶಿಲ್ಪ',
      ta: 'கல்வெட்டு அடிப்படையிலான மீள்கட்டமைப்பு & கோட்டைக் கட்டிடக்கலை',
      mr: 'शिलालेख-आधारित पुनर्निर्माण आणि किल्ला स्थापत्य',
      or: 'ଶିଳାଲେଖ ଆଧାରିତ ପୁନର୍ନିର୍ମାଣ ଓ ଦୁର୍ଗ ସ୍ଥାପତ୍ୟ',
      bn: 'শিলালিপি-ভিত্তিক পুনর্নির্মাণ ও দুর্গ স্থাপত্য'
    },
    conciseOverview: {
      en: 'Encompasses the Suryavamsha Gajapathi Empire under Kapilendra Deva (1434/35 – 1466/67 or 1468–1470 CE), Purushottama Deva (1466/67–1497 CE), and Prataparudra Deva (1497–1540 CE), followed by the Bhoi interregnum (1541–1559 CE), Chalukya Mukunda Deva (1559–1568 CE), the Khurda and Parlakhemundi Gajapathis, Vizianagaram/Bobbili Samasthanams, and southern Nayaka fortress corridors.',
      hi: 'कपिलेंद्र देव (1434/35 – 1466/67 या 1468–1470 ई.), पुरुषोत्तम देव (1466/67–1497 ई.) और प्रतापरुद्र देव (1497–1540 ई.) के अधीन सूर्यवंशी गजपति साम्राज्य; तत्पश्चात भोई अंतराल (1541–1559 ई.), चालुक्य मुकुंद देव (1559–1568 ई.), खुर्दा व परलाखेमुंडी गजपति, विजयनगरम/बोब्बिली संस्थान और दक्षिणी नायक दुर्ग गलियारे।',
      te: 'కపిలేంద్ర దేవ (క్రీ.శ. 1434/35 – 1466/67 లేదా 1468–1470), పురుషోత్తమ దేవ (1466/67–1497) మరియు ప్రతాపరుద్ర దేవ (1497–1540) క్రింద సూర్యవంశ గజపతి సామ్రాజ్యం; ఆపై భోయి పాలన (1541–1559), చాళుక్య ముకుంద దేవ (1559–1568), ఖుర్దా & పర్లాకిమిడి గజపతులు, విజయనగరం/బొబ్బిలి సంస్థానాలు మరియు దక్షిణ నాయక దుర్గాలు.',
      kn: 'ಕಪಿಲೇಂದ್ರ ದೇವ (ಕ್ರಿ.ಶ. 1434/35 – 1466/67 ಅಥವಾ 1468–1470), ಪುರುಷೋತ್ತಮ ದೇವ (1466/67–1497) ಮತ್ತು ಪ್ರತಾಪರುದ್ರ ದೇವರ (1497–1540) ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ; ನಂತರ ಚಾಳುಕ್ಯ ಮುಕುಂದ ದೇವ (1559–1568), ಖುರ್ದಾ ಮತ್ತು ಪರ್ಲಾಖೆಮುಂಡಿ ಗಜಪತಿಗಳು, ವಿಜಯನಗರಂ/ಬೊಬ್ಬಿಲಿ ಸಂಸ್ಥಾನಗಳು ಮತ್ತು ದಕ್ಷಿಣ ನಾಯಕ ಕೋಟೆಗಳು.',
      ta: 'கபிலேந்திர தேவர் (பொ.ஊ. 1434/35 – 1466/67 அல்லது 1468–1470), புருஷோத்தம தேவர் (1466/67–1497) மற்றும் பிரதாபருத்ர தேவர் (1497–1540) கீழ் சூரியவம்ச கஜபதி பேரரசு; தொடர்ந்து சாளுக்கிய முகுந்த தேவர் (1559–1568), குர்தா & பர்லாகேமுண்டி கஜபதிகள், விஜயநகரம்/பொப்பிலி சமஸ்தானங்கள் மற்றும் நாயக்கர் கோட்டைகள்.',
      mr: 'कपिलेंद्र देव (इ.स. १४३४/३५ – १४६६/६७ किंवा १४६८–१४७०), पुरुषोत्तम देव (१४६६/६७–१४९७) व प्रतापरुद्र देव (१४९७–१५४०) यांचे सूर्यवंशी गजपती साम्राज्य; त्यानंतर चालुक्य मुकुंद देव (१५५९–१५६८), खुर्दा व परलाखेमुंडी गजपती, विजयनगरम संस्थाने आणि दक्षिणेतील नायक किल्ले.',
      or: 'କପିଳେନ୍ଦ୍ର ଦେବ (୧୪୩୪/୩୫ – ୧୪୬୬/୬୭ ବା ୧୪୬୮–୧୪୭୦ ଖ୍ରୀ.ଅ.), ପୁରୁଷୋତ୍ତମ ଦେବ (୧୪୬୬/୬୭–୧୪୯୭) ଓ ପ୍ରତାପରୁଦ୍ର ଦେବ (୧୪୯୭–୧୫୪୦) ଙ୍କ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ; ତତ୍ପରେ ଚାଲୁକ୍ୟ ମୁକୁନ୍ଦ ଦେବ (୧୫୫୯–୧୫୬୮), ଖୋର୍ଦ୍ଧା ଓ ପାରଳାଖେମୁଣ୍ଡି ଗଜପତି, ବିଜୟନଗରମ ସଂସ୍ଥାନ ଓ ଦକ୍ଷିଣ ଦୁର୍ଗ।',
      bn: 'কপিলেন্দ্র দেব (১৪৩৪/৩৫ – ১৪৬৬/৬৭ বা ১৪৬৮–১৪৭০ খ্রি.), পুরুষোত্তম দেব (১৪৬৬/৬৭–১৪৯৭) ও প্রতাপরুদ্র দেবের (১৪৯৭–১৫৪০) সূর্যবংশী গজপতি সাম্রাজ্য; তৎপরবর্তী চালুক্য মুকুন্দ দেব (১৫৫৯–১৫৬৮), খোর্ধা ও পারলাখেমুন্ডি গজপতি, বিজয়নগরম সংস্থান ও দক্ষিণ দুর্গ।'
    },
    detailedAnalysis: {
      en: 'From his coronation in 1434/1435 CE, Emperor Kapilendra Deva and Prince Kumara Hamvira Deva expanded the Suryavamsha Gajapathi Empire from the Bhagirathi-Hooghly to Srirangam on the Kaveri (1464 CE), assuming the full imperial title "Gajapathi Gaudesvara Navakoti Karnata Kalavargesvara" in the Veligalani Copper-Plate Grant of 1458 CE (Saka 1380; Epigraphia Indica Vol. XXXIII, pp. 275–292). After Purushottama Deva (1466/67–1497 CE) and Prataparudra Deva (1497–1540 CE), and the heroic reign of Chalukya Mukunda Deva (1559–1568 CE) at nine-storeyed Barabati Fort, Odiyaraju/OddeRajulu military governors and fort engineers sustained autonomous garhs and southern Samasthanams until the British treaties of 1757–1766 CE.',
      hi: '1434/1435 ई. में राज्याभिषेक के बाद सम्राट कपिलेंद्र देव और राजकुमार हम्वीर देव ने भागीरथी-हुगली से लेकर कावेरी तट के श्रीरंगम (1464 ई.) तक साम्राज्य का विस्तार किया और 1458 ई. (शक 1380; एपिग्राफिया इंडिका खंड XXXIII, पृ. 275–292) के वेलिगलानि ताम्रपत्र में "गजपति गौडेश्वर नवकोटि कर्णाट कलवर्गेश्वर" की उपाधि धारण की। पुरुषोत्तम देव (1466/67–1497 ई.), प्रतापरुद्र देव (1497–1540 ई.) और बाराबती किले के सम्राट चालुक्य मुकुंद देव (1559–1568 ई.) के पश्चात ओडियाराजू/ओड्डेराजुलु सैन्य कमांडरों और दुर्ग निर्माताओं ने 1757–1766 ई. तक क्षेत्रीय गढ़ों और दक्षिणी संस्थानों की निरंतरता बनाए रखी।',
      te: 'క్రీ.శ. 1434/1435లో పట్టాభిషేకం నుండి చక్రవర్తి కపిలేంద్ర దేవుడు మరియు కుమార హంవీర దేవుడు భాగీరథీ-హుగ్లీ నుండి కావేరీ తీరంలోని శ్రీరంగం (1464) వరకు సామ్రాజ్యాన్ని విస్తరించి, క్రీ.శ. 1458 (శక 1380; ఎపిగ్రాఫియా ఇండికా Vol. XXXIII, pp. 275–292) వెలిగలాని తామ్రశాసనంలో "గజపతి గౌడేశ్వర నవకోటి కర్ణాట కలవర్గేశ్వర" అనే సామ్రాజ్య బిరుదును ధరించారు. పురుషోత్తమ దేవ (1466/67–1497), ప్రతాపరుద్ర దేవ (1497–1540) మరియు బారాబతి కోట చక్రవర్తి చాళుక్య ముకుంద దేవ (1559–1568) తదుపరి, ఒడియరాజు/ఒడ్డెరాజులు సేనానులు 1757–1766 వరకు దక్షిణ సంస్థానాలను నిలబెట్టారు.',
      kn: 'ಕ್ರಿ.ಶ. 1434/1435ರ ಪಟ್ಟಾಭಿಷೇಕದ ನಂತರ ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವ ಮತ್ತು ಕುಮಾರ ಹಂವೀರ ದೇವ ಹೂಗ್ಲಿಯಿಂದ ಕಾವೇರಿ ತೀರದ ಶ್ರೀರಂಗಂವರೆಗೆ (1464) ಸಾಮ್ರಾಜ್ಯವನ್ನು ವಿಸ್ತರಿಸಿ, ಕ್ರಿ.ಶ. 1458ರ (ಶಕ 1380; ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ Vol. XXXIII, ಪು. 275–292) ವೆಲಿಗಲಾನಿ ತಾಮ್ರಪತ್ರದಲ್ಲಿ "ಗಜಪತಿ ಗೌಡೇಶ್ವರ ನವಕೋಟಿ ಕರ್ಣಾಟ ಕಲವರ್ಗೇಶ್ವರ" ಬಿರುದನ್ನು ಧರಿಸಿದರು. ಪುರುಷೋತ್ತಮ ದೇವ (1466/67–1497), ಪ್ರತಾಪರುದ್ರ ದೇವ (1497–1540) ಮತ್ತು ಚಾಳುಕ್ಯ ಮುಕುಂದ ದೇವರ (1559–1568) ನಂತರ ಒಡಿಯರಾಜು ಸೇನಾನಿಗಳು ದಕ್ಷಿಣ ಸಂಸ್ಥಾನಗಳನ್ನು ಮುನ್ನಡೆಸಿದರು.',
      ta: 'பொ.ஊ. 1434/1435 முடிசூடலுக்குப் பின் பேரரசர் கபிலேந்திர தேவரும் குமார ஹம்வீர தேவரும் ஹூக்ளி முதல் காவிரிக்கரையின் ஸ்ரீரங்கம் (1464) வரை பேரரசை விரிவுபடுத்தி, பொ.ஊ. 1458 (சக 1380; எபிகிராபியா இண்டிகா Vol. XXXIII, பக். 275–292) வெலிகலானி செப்பேட்டில் "கஜபதி கௌடேஸ்வர நவகோடி கர்ணாட கலவர்க்கேஸ்வர" என்ற பட்டத்தைச் சூடினர். புருஷோத்தம தேவர் (1466/67–1497), பிரதாபருத்ர தேவர் (1497–1540) மற்றும் முகுந்த தேவர் (1559–1568) காலத்திற்குப் பின் ஒடியராஜு தளபதிகள் தென்னிந்திய சமஸ்தானங்களைப் பாதுகாத்தனர்.',
      mr: 'इ.स. १४३४/१४३५ मधील राज्याभिषेकानंतर सम्राट कपिलेंद्र देव आणि कुमार हम्वीर देव यांनी हुगलीपासून कावेरीकाठच्या श्रीरंगमपर्यंत (१४६४) साम्राज्य विस्तारून इ.स. १४५८ च्या (शक १३८०; एपिग्राफिया इंडिका खंड XXXIII, पृ. २७५–२९२) वेलिगलानि ताम्रपटात "गजपती गौडेश्वर नवकोटी कर्णाट कलवर्गेश्वर" ही पदवी धारण केली. पुरुषोत्तम देव (१४६६/६७–१४९७), प्रतापरुद्र देव (१४९७–१५४०) आणि मुकुंद देव (१५५९–१५६८) यांच्यानंतर ओडियाराजू सेनानींनी दक्षिणेतील संस्थाने टिकवून ठेवली.',
      or: '୧୪୩୪/୧୪୩୫ ଖ୍ରୀ.ଅ.ରେ ଅଭିଷେକ ପରେ ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ଓ କୁମାର ହମ୍ବୀର ଦେବ ହୁଗୁଳିଠାରୁ କାବେରୀ ତীরସ୍ଥ ଶ୍ରୀରଙ୍ଗମ (୧୪୬୪) ପର୍ଯ୍ୟନ୍ତ ସାମ୍ରାଜ୍ୟ ବିସ୍ତାର କରି ୧୪୫୮ ଖ୍ରୀ.ଅ. (ଶକ ୧୩୮୦; ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା ଖଣ୍ଡ XXXIII, ପୃ. ୨୭୫–୨୯୨) ଭେଲିଗଲାନି ତାମ୍ରଶାସନରେ "ଗଜପତି ଗୌଡ଼େଶ୍ୱର ନବକୋଟି କର୍ଣ୍ଣାଟ କଳବର୍ଗେଶ୍ୱର" ଉପାଧି ଧାରଣ କରିଥିଲେ। ପୁରୁଷୋତ୍ତମ ଦେବ (୧୪୬୬/୬୭–୧୪୯୭), ପ୍ରତାପରୁଦ୍ର ଦେବ (୧୪୯୭–୧୫୪୦) ଓ ମୁକୁନ୍ଦ ଦେବ (୧୫୫୯–୧୫୬୮) ଙ୍କ ପରେ ଓଡ଼ିଆରାଜୁ ସେନାପତିମାନେ ଆଞ୍ଚଳିକ ଦୁର୍ଗ ଓ ସଂସ୍ଥାନ ରକ୍ଷା କରିଥିଲେ।',
      bn: '১৪৩৪/১৪৩৫ খ্রিস্টাব্দে অভিষেকের পর সম্রাট কপিলেন্দ্র দেব ও কুমার হম্বীর দেব হুগলি থেকে কাবেরী তীরের শ্রীরঙ্গম (১৪৬৪) পর্যন্ত সাম্রাজ্য বিস্তার করে ১৪৫৮ খ্রিস্টাব্দের (শক ১৩৮০; এপিগ্রাফিয়া ইন্ডিকা খণ্ড XXXIII, পৃ. ২৭৫–২৯২) ভেলিগলানি তাম্রশাসনে "গজপতি গৌড়েশ্বর নবকোটি কর্ণাট কলবর্গেশ্বর" উপাধি ধারণ করেন। পুরুষোত্তম দেব (১৪৬৬/৬৭–১৪৯৭), প্রতাপরুদ্র দেব (১৪৯৭–১৫৪০) ও মুকুন্দ দেবের (১৫৫৯–১৫৬৮) পর ওড়িয়ারাজু সেনাপতিরা আঞ্চলিক দুর্গ ও সংস্থান রক্ষা করেন।'
    },
    dateClassificationBreakdown: {
      establishedInscriptional: {
        en: 'Established Inscriptional Dates: 1448 CE (Rajahmundry & Kondavidu Gajapathi annexation epigraphs); 1458 CE (Saka 1380 Veligalani Copper-Plate Grant of Kapilendra Deva, Epigraphia Indica Vol. XXXIII, pp. 275–292, ed. D.C. Sircar); 1464 CE (Saka 1386 Srirangam Ranganathaswamy Temple Inscription of Dakshina Kapilesvara Kumara Hamvira Deva); 1510–1512 CE (Prataparudra Deva & Chaitanya Mahaprabhu epigraphs at Puri); 1560–1565 CE (Triveni Ghat & Simhachalam inscriptions of Chalukya Mukunda Deva).',
        hi: 'स्थापित शिलालेखीय तिथियाँ: 1448 ई. (राजमहेंद्रवरम व कोंडवीडु गजपति अभिलेख); 1458 ई. (शक 1380 कपिलेंद्र देव का वेलिगलानि ताम्रपत्र, एपिग्राफिया इंडिका खंड XXXIII, पृ. 275–292, सं. डी.सी. सरकार); 1464 ई. (शक 1386 कुमार हम्वीर देव का श्रीरंगम रंगनाथस्वामी मंदिर शिलालेख); 1510–1512 ई. (प्रतापरुद्र देव के पुरी अभिलेख); 1560–1565 ई. (चालुक्य मुकुंद देव के त्रिवेणी घाट व सिंहाचलम शिलालेख)।',
        te: 'నిర్ధారిత శాసన తేదీలు: క్రీ.శ. 1448 (రాజమహేంద్రవరం & కొండవీడు గజపతి శాసనాలు); క్రీ.శ. 1458 (శక 1380 కపిలేంద్ర దేవుని వెలిగలాని తామ్రశాసనం, ఎపిగ్రాఫియా ఇండికా Vol. XXXIII, pp. 275–292, సం. డి.సి. సర్కార్); క్రీ.శ. 1464 (శక 1386 కుమార హంవీర దేవుని శ్రీరంగం రంగనాథస్వామి ఆలయ శాసనం); క్రీ.శ. 1510–1512 (ప్రతాపరుద్ర దేవుని పూరీ శాసనాలు); క్రీ.శ. 1560–1565 (చాళుక్య ముకుంద దేవుని త్రివేణి ఘాట్ శాసనాలు).',
        kn: 'ದೃಢೀಕೃತ ಶಾಸನ ದಿನಾಂಕಗಳು: ಕ್ರಿ.ಶ. 1448 (ರಾಜಮಹೇಂದ್ರವರಂ ಮತ್ತು ಕೊಂಡವೀಡು ಗಜಪತಿ ಶಾಸನಗಳು); ಕ್ರಿ.ಶ. 1458 (ಶಕ 1380 ಕಪಿಲೇಂದ್ರ ದೇವನ ವೆಲಿಗಲಾನಿ ತಾಮ್ರಪತ್ರ, ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ Vol. XXXIII, ಪು. 275–292, ಡಿ.ಸಿ. ಸರ್ಕಾರ್); ಕ್ರಿ.ಶ. 1464 (ಶಕ 1386 ಕುಮಾರ ಹಂವೀರ ದೇವನ ಶ್ರೀರಂಗಂ ಶಾಸನ); ಕ್ರಿ.ಶ. 1510–1512 (ಪ್ರತಾಪರುದ್ರ ದೇವನ ಪುರಿ ಶಾಸನಗಳು); ಕ್ರಿ.ಶ. 1560–1565 (ಚಾಳುಕ್ಯ ಮುಕುಂದ ದೇವನ ತ್ರಿವೇಣಿ ಘಾಟ್ ಶಾಸನಗಳು).',
        ta: 'உறுதிப்படுத்தப்பட்ட கல்வெட்டுத் தேதிகள்: பொ.ஊ. 1448 (இராஜமகேந்திரவரம் & கொண்டவீடு கஜபதி கல்வெட்டுகள்); பொ.ஊ. 1458 (சக 1380 கபிலேந்திர தேவரின் வெலிகலானி செப்பேடு, எபிகிராபியா இண்டிகா Vol. XXXIII, பக். 275–292, டி.சி. சர்க்கார்); பொ.ஊ. 1464 (சக 1386 குமார ஹம்வீர தேவரின் ஸ்ரீரங்கம் கல்வெட்டு); பொ.ஊ. 1510–1512 (பிரதாபருத்ர தேவரின் பூரி கல்வெட்டுகள்); பொ.ஊ. 1560–1565 (முகுந்த தேவரின் திரிவேணி காட் கல்வெட்டுகள்).',
        mr: 'प्रस्थापित शिलालेखीय तारखा: इ.स. १४४८ (राजमहेंद्रवरम व कोंडवीडू गजपती शिलालेख); इ.स. १४५८ (शक १३८० कपिलेंद्र देवाचा वेलिगलानि ताम्रपट, एपिग्राफिया इंडिका खंड XXXIII, पृ. २७५–२९२, डी.सी. सरकार); इ.स. १४६४ (शक १३८६ कुमार हम्वीर देवाचा श्रीरंगम शिलालेख); इ.स. १५१०–१५१२ (प्रतापरुद्र देवाचे पुरी शिलालेख); इ.स. १५६०–१५६५ (चालुक्य मुकुंद देवाचे त्रिवेणी घाट शिलालेख).',
        or: 'ପ୍ରତିଷ୍ଠିତ ଶିଳାଲେଖ ତାରିଖ: ୧୪୪୮ ଖ୍ରୀ.ଅ. (ରାଜମହେନ୍ଦ୍ରବରମ ଓ କୋଣ୍ଡାଭିଡ଼ୁ ଗଜପତି ଶିଳାଲେଖ); ୧୪୫୮ ଖ୍ରୀ.ଅ. (ଶକ ୧୩୮୦ କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଭେଲିଗଲାନି ତାମ୍ରଶାସନ, ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା ଖଣ୍ଡ XXXIII, ପୃ. ୨୭୫–୨୯୨, ଡି.ସି. ସରକାର); ୧୪୬୪ ଖ୍ରୀ.ଅ. (ଶକ ୧୩୮୬ କୁମାର ହମ୍ବୀର ଦେବଙ୍କ ଶ୍ରୀରଙ୍ଗମ ଶିଳାଲେଖ); ୧୫୧୦–୧୫୧୨ ଖ୍ରୀ.ଅ. (ପ୍ରତାପରୁଦ୍ର ଦେବଙ୍କ ପୁରୀ ଶିଳାଲେଖ); ୧୫୬୦–୧୫୬୫ ଖ୍ରୀ.ଅ. (ମୁକୁନ୍ଦ ଦେବଙ୍କ ତ୍ରିବେଣୀ ଘାଟ ଶିଳାଲେଖ)।',
        bn: 'প্রতিষ্ঠিত শিলালিপি তারিখ: ১৪৪৮ খ্রি. (রাজমহেন্দ্রবরম ও কোন্ডাভিডু গজপতি শিলালিপি); ১৪৫৮ খ্রি. (শক ১৩৮০ কপিলেন্দ্র দেবের ভেলিগলানি তাম্রশাসন, এপিগ্রাফিয়া ইন্ডিকা খণ্ড XXXIII, পৃ. ২৭৫–২৯২, ডি.সি. সরকার); ১৪৬৪ খ্রি. (শক ১৩৮৬ কুমার হম্বীর দেবের শ্রীরঙ্গম শিলালিপি); ১৫১০–১৫১২ খ্রি. (প্রতাপরুদ্র দেবের পুরী শিলালিপি); ১৫৬০–১৫৬৫ খ্রি. (মুকুন্দ দেবের ত্রিবেণী ঘাট শিলালিপি)।'
      },
      approximateDynastic: {
        en: 'Approximate Dynastic Reign Dates: Suryavamsha Gajapathi Dynasty (1434/1435 – 1540/1541 CE: Purushottama Deva r. 1466/67–1497 CE; Prataparudra Deva r. 1497–1540 CE); Bhoi Dynasty of Govinda Vidyadhara (1541–1559 CE); Chalukya Mukunda Deva Harichandana (1559–1568 CE); Khurda Bhoi-Gajapathi Line (from c. 1568/1572 CE under Ramachandra Deva I).',
        hi: 'अनुमानित राजवंशीय शासन तिथियाँ: सूर्यवंशी गजपति राजवंश (1434/1435 – 1540/1541 ई.: पुरुषोत्तम देव 1466/67–1497 ई.; प्रतापरुद्र देव 1497–1540 ई.); गोविंद विद्याधर का भोई वंश (1541–1559 ई.); चालुक्य मुकुंद देव हरिचंदन (1559–1568 ई.); खुर्दा राजवंश (लगभग 1568/1572 ई. से रामचंद्र देव प्रथम के अधीन)।',
        te: 'సుమారు రాజవంశ పాలనా తేదీలు: సూర్యవంశ గజపతి రాజవంశం (క్రీ.శ. 1434/1435 – 1540/1541: పురుషోత్తమ దేవ 1466/67–1497; ప్రతాపరుద్ర దేవ 1497–1540); గోవింద విద్యాధరుని భోయి వంశం (1541–1559); చాళుక్య ముకుంద దేవ హరిచందన (1559–1568); ఖుర్దా రాజవంశం (సుమారు 1568/1572 నుండి రామచంద్ర దేవ I క్రింద).',
        kn: 'ಅಂದಾಜು ರಾಜವಂಶದ ಆಳ್ವಿಕೆ ದಿನಾಂಕಗಳು: ಸೂರ್ಯವಂಶ ಗಜಪತಿ ರಾಜವಂಶ (ಕ್ರಿ.ಶ. 1434/1435 – 1540/1541: ಪುರುಷೋತ್ತಮ ದೇವ 1466/67–1497; ಪ್ರತಾಪರುದ್ರ ದೇವ 1497–1540); ಗೋವಿಂದ ವಿದ್ಯಾಧರನ ಭೋಯಿ ವಂಶ (1541–1559); ಚಾಳುಕ್ಯ ಮುಕುಂದ ದೇವ ಹರಿಚಂದನ (1559–1568); ಖುರ್ದಾ ರಾಜವಂಶ (ಸು. 1568/1572 ರಿಂದ ರಾಮಚಂದ್ರ ದೇವ I).',
        ta: 'தோராயமான வம்ச ஆட்சிக் காலங்கள்: சூரியவம்ச கஜபதி வம்சம் (பொ.ஊ. 1434/1435 – 1540/1541: புருஷோத்தம தேவர் 1466/67–1497; பிரதாபருத்ர தேவர் 1497–1540); கோவிந்த வித்யாதரரின் போயி வம்சம் (1541–1559); சாளுக்கிய முகுந்த தேவர் (1559–1568); குர்தா அரச மரபு (சுமார் 1568/1572 முதல் முதலாம் இராமச்சந்திர தேவர்).',
        mr: 'अंदाजे राजवंश काळ: सूर्यवंशी गजपती राजवंश (इ.स. १४३४/१४३५ – १५४०/१५४१: पुरुषोत्तम देव १४६६/६७–१४९७; प्रतापरुद्र देव १४९७–१५४०); गोविंद विद्याधरचा भोई वंश (१५४१–१५५९); चालुक्य मुकुंद देव हरिचंदन (१५५९–१५६८); खुर्दा राजघराणे (सु. १५६८/१५७२ पासून रामचंद्र देव पहिला).',
        or: 'ଆନୁମାନିକ ରାଜବଂଶ ଶାସନ କାଳ: ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ରାଜବଂଶ (୧୪୩୪/୧୪୩୫ – ୧୫୪୦/୧୫୪୧ ଖ୍ରୀ.ଅ.: ପୁରୁଷୋତ୍ତମ ଦେବ ୧୪୬୬/୬୭–୧୪୯୭; ପ୍ରତାପରୁଦ୍ର ଦେବ ୧୪୯୭–୧୫୪୦); ଗୋବିନ୍ଦ ବିଦ୍ୟାଧରଙ୍କ ଭୋଇ ବଂଶ (୧୫୪୧–୧୫୫୯); ଚାଲୁକ୍ୟ ମୁକୁନ୍ଦ ଦେବ ହରିଚନ୍ଦନ (୧୫୫୯–୧୫୬୮); ଖୋର୍ଦ୍ଧା ରାଜବଂଶ (୧୫୬୮/୧୫୭୨ ରୁ ପ୍ରଥମ ରାମଚନ୍ଦ୍ର ଦେବ)।',
        bn: 'আনুমানিক রাজবংশীয় শাসনকাল: সূর্যবংশী গজপতি রাজবংশ (১৪৩৪/১৪৩৫ – ১৫৪০/১৫৪১ খ্রি.: পুরুষোত্তম দেব ১৪৬৬/৬৭–১৪৯৭; প্রতাপরুদ্র দেব ১৪৯৭–১৫৪০); গোবিন্দ বিদ্যাধরের ভোই বংশ (১৫৪১–১৫৫৯); চালুক্য মুকুন্দ দেব হরিচন্দন (১৫৫৯–১৫৬৮); খোর্ধা রাজবংশ (১৫৬৮/১৫৭২ থেকে প্রথম রামচন্দ্র দেব)।'
      },
      disputedInterpretations: {
        en: 'Disputed Historical Interpretations (Kapilendra Deva’s Final Year): Because Purushottama Deva’s earliest Anka regnal years overlap with Kapilendra Deva’s final southern campaign on the Krishna River, historians differ on Kapilendra Deva’s exact end-date: R. Subrahmanyam (The Suryavamsi Gajapatis of Orissa, 1957) and K.C. Panigrahi (1981) place his passing in late 1466 or early 1467 CE (with co-regency from 1465/66 CE), whereas R.D. Banerji (History of Orissa, Vol. I, 1930) and Prabhat Mukherjee (The History of the Gajapati Kings of Orissa, 1953) extend his reign to 1468–1470 CE.',
        hi: 'विवादित ऐतिहासिक व्याख्याएँ (कपिलेंद्र देव का अंतिम शासन वर्ष): पुरुषोत्तम देव के प्रारंभिक अंक वर्षों और कृष्णा नदी तट पर कपिलेंद्र देव के अंतिम दक्षिणी अभियान के ओवरलैप के कारण विद्वानों में मतभेद है: डॉ. आर. सुब्रह्मण्यम (1957) और के.सी. पाणिग्रही (1981) उनका अंतिम वर्ष 1466 के अंत या 1467 ई. के प्रारंभ में रखते हैं, जबकि आर.डी. बनर्जी (1930) और प्रभात मुखर्जी (1953) उनके शासन को 1468–1470 ई. तक मानते हैं।',
        te: 'వివాదాస్పద చారిత్రక వ్యాఖ్యానాలు (కపిలేంద్ర దేవుని చివరి పాలనా సంవత్సరం): పురుషోత్తమ దేవుని ప్రారంభ అంక సంవత్సరాలు కృష్ణా నదీ తీరాన కపిలేంద్ర దేవుని చివరి దక్షిణ దండయాత్రతో కలవడం వల్ల పండితులలో భిన్నాభిప్రాయాలు ఉన్నాయి: డా. ఆర్. సుబ్రహ్మణ్యం (1957) మరియు కె.సి. పాణిగ్రహి (1981) క్రీ.శ. 1466 చివరిలో లేదా 1467 ప్రారంభంలో అని నిర్ధారించగా, ఆర్.డి. బెనర్జీ (1930) మరియు ప్రభాత్ ముఖర్జీ (1953) క్రీ.శ. 1468–1470 వరకు ఆయన పాలన కొనసాగిందని పేర్కొన్నారు.',
        kn: 'ವಿವಾದಿತ ಐತಿಹಾಸಿಕ ವ್ಯಾಖ್ಯಾನಗಳು (ಕಪಿಲೇಂದ್ರ ದೇವನ ಕೊನೆಯ ಆಳ್ವಿಕೆ ವರ್ಷ): ಪುರುಷೋತ್ತಮ ದೇವನ ಆರಂಭಿಕ ಅಂಕ ವರ್ಷಗಳು ಕೃಷ್ಣಾ നദി ತೀರದ ಕಪಿಲೇಂದ್ರ ದೇವನ ಕೊನೆಯ ದಂಡಯಾತ್ರೆಯೊಂದಿಗೆ ಬೆರೆಯುವುದರಿಂದ ವಿದ್ವಾಂಸರಲ್ಲಿ ಭಿನ್ನಾಭಿಪ್ರಾಯವಿದೆ: ಡಾ. ಆರ್. ಸುಬ್ರಹ್ಮಣ್ಯಂ (1957) ಮತ್ತು ಕೆ.ಸಿ. ಪಾಣಿಗ್ರಹಿ (1981) ಕ್ರಿ.ಶ. 1466/1467 ಎಂದು ಗುರುತಿಸಿದರೆ, ಆರ್.ಡಿ. ಬ್ಯಾನರ್ಜಿ (1930) ಮತ್ತು ಪ್ರಭಾತ್ ಮುಖರ್ಜಿ (1953) ಕ್ರಿ.ಶ. 1468–1470 ರವರೆಗೆ ಅವನ ಆಳ್ವಿಕೆಯನ್ನು ವಿಸ್ತರಿಸುತ್ತಾರೆ.',
        ta: 'விவாதத்திற்குரிய வரலாற்று விளக்கங்கள் (கபிலேந்திர தேவரின் இறுதி ஆட்சியாண்டு): புருஷோத்தம தேவரின் தொடக்க அங்க ஆண்டுகள் கிருஷ்ணா நதிக்கரையில் கபிலேந்திர தேவரின் இறுதிப் படையெடுப்புடன் இணைவதால் அறிஞர்களிடையே இரு கருத்துக்கள் உள்ளன: ஆர். சுப்பிரமணியம் (1957) மற்றும் கே.சி. பாணிகிரஹி (1981) பொ.ஊ. 1466/1467 எனக் குறிக்கின்றனர்; ஆர்.டி. பானர்ஜி (1930) மற்றும் பிரபாத் முகர்ஜி (1953) பொ.ஊ. 1468–1470 வரை அவரது ஆட்சியை நீட்டிக்கின்றனர்.',
        mr: 'विवादित ऐतिहासिक अर्थ (कपिलेंद्र देवाचे अंतिम वर्ष): पुरुषोत्तम देवाची प्रारंभिक अंक वर्षे आणि कृष्णा नदीकाठील कपिलेंद्र देवाची अंतिम मोहीम एकाच काळात आल्याने इतिहासकारांत दोन मतप्रवाह आहेत: डॉ. आर. सुब्रह्मण्यम (१९५७) आणि के.सी. पाणिग्रही (१९८१) इ.स. १४६६/१४६७ मानतात, तर आर.डी. बॅनर्जी (१९३०) आणि प्रभात मुखर्जी (१९५३) इ.स. १४६८–१४७० हा काळ मानतात.',
        or: 'ବିବାଦୀୟ ଐତିହାସିକ ବ୍ୟାଖ୍ୟା (କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଶେଷ ଶାସନ ବର୍ଷ): ପୁରୁଷୋତ୍ତମ ଦେବଙ୍କ ପ୍ରାରମ୍ଭିକ ଅଙ୍କ ବର୍ଷ ଓ କୃଷ୍ଣା ନଦୀ ତীরରେ କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଶେଷ ଅଭିଯାନ ମିଶିଯାଉଥିବାରୁ ଐତିହାସିକମାନଙ୍କ ମଧ୍ୟରେ ଦୁଇଟି ମତ ରହିଛି: ଡ. ଆର. ସୁବ୍ରହ୍ମଣ୍ୟମ (୧୯୫୭) ଓ କେ.ସି. ପାଣିଗ୍ରାହୀ (୧୯୮୧) ୧୪୬୬/୧୪୬୭ ଖ୍ରୀ.ଅ. ନିର୍ଦ୍ଧାରଣ କରିଥିବା ବେଳେ ଆର.ଡି. ବାନାର୍ଜୀ (୧୯୩୦) ଓ ପ୍ରଭାତ ମୁଖାର୍ଜୀ (୧୯୫୩) ୧୪୬୮–୧୪୭୦ ଖ୍ରୀ.ଅ. ମତ ଦିଅନ୍ତି।',
        bn: 'বিতর্কিত ঐতিহাসিক ব্যাখ্যা (কপিলেন্দ্র দেবের শেষ শাসনবর্ষ): পুরুষোত্তম দেবের প্রারম্ভিক অঙ্ক বর্ষ ও কৃষ্ণা নদীর তীরে কপিলেন্দ্র দেবের শেষ অভিযানের সমাপতনের কারণে ঐতিহাসিকদের মধ্যে দুটি মত রয়েছে: ড. আর. সুব্রহ্মণ্যম (১৯৫৭) ও কে.সি. পানিগ্রাহী (১৯৮১) ১৪৬৬/১৪৬৭ খ্রি. নির্ধারণ করেছেন, অন্যদিকে আর.ডি. ব্যানার্জী (১৯৩০) ও প্রভাত মুখার্জী (১৯৫৩) ১৪৬৮–১৪৭০ খ্রি. মত প্রকাশ করেছেন।'
      },
      traditionalClaims: {
        en: 'Traditional Chronological Claims: The Madala Panji Kanchi-Kaveri narrative (Manika Gauduni and the divine horsemen Jagannatha and Balabhadra assisting Purushottama Deva) and the Mackenzie Collection Kaifiyats (1800–1815) preserve rich regional traditions alongside dated stone epigraphs.',
        hi: 'पारंपरिक कालानुक्रमिक दावे: मादला पंजी की कांची-कावेरी कथा (मानिका गौदुनी और जगन्नाथ-बलभद्र के दिव्य अश्वारोही रूप) तथा मैकेंज़ी संग्रह की कैफियतें (1800–1815) तिथियुक्त शिलालेखों के साथ क्षेत्रीय परंपराओं को संजोए हुए हैं।',
        te: 'సాంప్రదాయ కాలక్రమ వాదనలు: మాదలా పంజీలోని కాంచీ-కావేరీ కథనం (మాణిక గౌడుని మరియు జగన్నాథ-బలభద్రుల అশ্বిని రూపం) మరియు మెకంజీ కైఫియత్‌లు (1800–1815) శాసన ఆధారాలతో పాటు ప్రాంతీయ సాంప్రదాయాలను భద్రపరిచాయి.',
        kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕಾಲಾನುಕ್ರಮ ಪ್ರತಿಪಾದನೆಗಳು: ಮಾದಲಾ ಪಂಜಿಯ ಕಾಂಚಿ-ಕಾವೇರಿ ವೃತ್ತಾಂತ ಮತ್ತು ಮೆಕೆಂಜಿ ಕೈಫಿಯತ್‌ಗಳು (1800–1815) ಶಾಸನಗಳ ಜೊತೆಗೆ ಪ್ರಾದೇಶಿಕ ಪರಂಪರೆಯನ್ನು ಉಳಿಸಿಕೊಂಡಿವೆ.',
        ta: 'மரபுவழி காலக்கணக்கு உரிமைகோரல்கள்: மாதளா பஞ்சியின் காஞ்சி-காவிரி மரபுக் கதையும் மெக்கன்சி கைஃபியத்துகளும் (1800–1815) கல்வெட்டுச் சான்றுகளுடன் வட்டார மரபுகளைப் பாதுகாத்துள்ளன.',
        mr: 'पारंपरिक कालानुक्रमिक दावे: मादला पंजीमधील कांची-कावेरी आख्यायिका आणि मॅकेन्झी कैफियत (१८००–१८१५) शिलालेखीय पुराव्यांसोबत प्रादेशिक परंपरा जतन करतात.',
        or: 'ପାରମ୍ପରିକ କାଳାନୁକ୍ରମିକ ଦାବି: ମାଦଳା ପାଞ୍ଜିର କାଞ୍ଚି-କାବେରୀ ଉପାଖ୍ୟାନ (ମାଣିକ ଗୌଡ଼ୁଣୀ) ଓ ମ୍ୟାକେଞ୍ଜି କୈଫିୟତ୍ (୧୮୦୦–୧୮୧୫) ଶିଳାଲେଖ ପ୍ରମାଣ ସହିତ ଆଞ୍ଚଳିକ ପରମ୍ପରାକୁ ସଂରକ୍ଷିତ କରିଛି।',
        bn: 'ঐতিহ্যগত কালানুক্রমিক দাবি: মাদলা পাঞ্জির কাঞ্চী-কাবেরী উপাখ্যান (মাণিক গৌড়ুনী) ও ম্যাকেঞ্জি কৈফিয়ত (১৮০০–১৮১৫) শিলালিপি প্রমাণের পাশাপাশি আঞ্চলিক ঐতিহ্য সংরক্ষণ করেছে।'
      }
    },
    parallelTracks: [
      {
        corridorId: 'track_s7_kalinga_utkala_khurda',
        corridorLabel: {
          en: 'Kalinga–Utkala–Kataka & Khurda Corridor',
          hi: 'कलिंग–उत्कल–कटक एवं खुर्दा गलियारा',
          te: 'కళింగ–ఉత్కళ–కటక్ & ఖుర్దా ప్రాంతం',
          kn: 'ಕಳಿಂಗ–ಉತ್ಕಲ–ಕಟಕ್ ಮತ್ತು ಖುರ್ದಾ ವಲಯ',
          ta: 'கலிங்கம்–உத்கலம்–கட்டக் & குர்தா மண்டலம்',
          mr: 'कलिंग–उत्कल–कटक व खुर्दा पट्टा',
          or: 'କଳିଙ୍ଗ–ଉତ୍କଳ–କଟକ ଓ ଖୋର୍ଦ୍ଧା ଅଞ୍ଚଳ',
          bn: 'কলিঙ্গ–উৎকল–কটক ও খোর্ধা অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Suryavamsha Gajapathi Empire at Kataka (1434/35–1540/41 CE: Kapilendra Deva [1434/35 – 1466/67 or 1468–1470 CE], Purushottama Deva [1466/67–1497 CE], Prataparudra Deva [1497–1540 CE]) → Bhoi Rule (1541–1559 CE) → Chalukya Mukunda Deva (1559–1568 CE) → Khurda Gajapathis & Parlakhemundi Samasthanam (1568–1757/1803 CE)',
          hi: 'कटक में सूर्यवंशी गजपति साम्राज्य (1434/35–1540/41 ई.: कपिलेंद्र देव [1434/35 – 1466/67 या 1468–1470 ई.], पुरुषोत्तम देव [1466/67–1497 ई.], प्रतापरुद्र देव [1497–1540 ई.]) → भोई शासन (1541–1559 ई.) → चालुक्य मुकुंद देव (1559–1568 ई.) → खुर्दा गजपति व परलाखेमुंडी संस्थान (1568–1757/1803 ई.)',
          te: 'కటక్‌లో సూర్యవంశ గజపతి సామ్రాజ్యం (1434/35–1540/41: కపిలేంద్ర దేవ [1434/35 – 1466/67 లేదా 1468–1470], పురుషోత్తమ దేవ [1466/67–1497], ప్రతాపరుద్ర దేవ [1497–1540]) → భోయి పాలన (1541–1559) → చాళుక్య ముకుంద దేవ (1559–1568) → ఖుర్దా గజపతులు & పర్లాకిమిడి సంస్థానం (1568–1757/1803)',
          kn: 'ಕಟಕ್‌ನಲ್ಲಿ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ (1434/35–1540/41: ಕಪಿಲೇಂದ್ರ ದೇವ [1434/35 – 1466/67 ಅಥವಾ 1468–1470], ಪುರುಷೋತ್ತಮ ದೇವ [1466/67–1497], ಪ್ರತಾಪರುದ್ರ ದೇವ [1497–1540]) → ಭೋಯಿ ಆಳ್ವಿಕೆ (1541–1559) → ಚಾಳುಕ್ಯ ಮುಕುಂದ ದೇವ (1559–1568) → ಖುರ್ದಾ ಮತ್ತು ಪರ್ಲಾಖೆಮುಂಡಿ ಸಂಸ್ಥಾನ (1568–1757/1803)',
          ta: 'கட்டக்கில் சூரியவம்ச கஜபதி பேரரசு (1434/35–1540/41: கபிலேந்திர தேவர் [1434/35 – 1466/67 அல்லது 1468–1470], புருஷோத்தம தேவர் [1466/67–1497], பிரதாபருத்ர தேவர் [1497–1540]) → போயி ஆட்சி (1541–1559) → சாளுக்கிய முகுந்த தேவர் (1559–1568) → குர்தா & பர்லாகேமுண்டி சமஸ்தானம் (1568–1757/1803)',
          mr: 'कटक येथील सूर्यवंशी गजपती साम्राज्य (१४३४/३५–१५४०/४१: कपिलेंद्र देव [१४३४/३५ – १४६६/६७ किंवा १४६८–१४७०], पुरुषोत्तम देव [१४६६/६७–१४९७], प्रतापरुद्र देव [१४९७–१५४०]) → भोई शासन (१५४१–१५५९) → चालुक्य मुकुंद देव (१५५९–१५६८) → खुर्दा व परलाखेमुंडी संस्थान (१५६८–१७५७/१८०३)',
          or: 'କଟକରେ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ (୧୪୩୪/୩୫–୧୫୪୦/୪୧: କପିଳେନ୍ଦ୍ର ଦେବ [୧୪୩୪/୩୫ – ୧୪୬୬/୬୭ ବା ୧୪୬୮–୧୪୭୦], ପୁରୁଷୋତ୍ତମ ଦେବ [୧୪୬୬/୬୭–୧୪୯୭], ପ୍ରତାପରୁଦ୍ର ଦେବ [୧୪୯୭–୧୫୪୦]) → ଭୋଇ ଶାସନ (୧୫୪୧–୧୫୫୯) → ଚାଲୁକ୍ୟ ମୁକୁନ୍ଦ ଦେବ (୧୫୫୯–୧୫୬୮) → ଖୋର୍ଦ୍ଧା ଓ ପାରଳାଖେମୁଣ୍ଡି ସଂସ୍ଥାନ (୧୫୬୮–୧୭୫୭/୧୮୦୩)',
          bn: 'কটকে সূর্যবংশী গজপতি সাম্রাজ্য (১৪৩৪/৩৫–১৫৪০/৪১: কপিলেন্দ্র দেব [১৪৩৪/৩৫ – ১৪৬৬/৬৭ বা ১৪৬৮–১৪৭০], পুরুষোত্তম দেব [১৪৬৬/৬৭–১৪৯৭], প্রতাপরুদ্র দেব [১৪৯৭–১৫৪০]) → ভোই শাসন (১৫৪১–১৫৫৯) → চালুক্য মুকুন্দ দেব (১৫৫৯–১৫৬৮) → খোর্ধা ও পারলাখেমুন্ডি সংস্থান (১৫৬৮–১৭৫৭/১৮০৩)'
        },
        dateSpan: '1434/1435 – 1757/1803 CE',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Veligalani Grant (1458 CE / Saka 1380, EI Vol. XXXIII); Lingaraja Temple Edicts (1452 CE); Triveni Ghat Inscription of Mukunda Deva (1560s)'
      },
      {
        corridorId: 'track_s7_vengi_kondavidu_vizianagaram',
        corridorLabel: {
          en: 'Vengi–Kondavidu–Vizianagaram Corridor',
          hi: 'वेंगी–कोंडवीडु–विजयनगरम गलियारा',
          te: 'వేంగి–కొండవీడు–విజయనగరం ప్రాంతం',
          kn: 'ವೆಂಗಿ–ಕೊಂಡವೀಡು–ವಿಜಯನಗರಂ ವಲಯ',
          ta: 'வேங்கி–கொண்டவீடு–விஜயநகரம் மண்டலம்',
          mr: 'वेंगी–कोंडवीडू–विजयनगरम पट्टा',
          or: 'ବେଙ୍ଗୀ–କୋଣ୍ଡାଭିଡ଼ୁ–ବିଜୟନଗରମ ଅଞ୍ଚଳ',
          bn: 'বেঙ্গী–কোন্ডাভিডু–বিজয়নগরম অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Gajapathi Dandapata Governorships at Rajamahendravaram, Kolletikota (Kolleru Lake Fort), Kondavidu & Kondapalli (1448–1515/1540 CE) → Qutb Shahi / Mughal Subah transitions → Rise of Vizianagaram Pusapati Gajapathi & Bobbili Samasthanams (1652–1757/1766 CE)',
          hi: 'राजमहेंद्रवरम, कोल्लेटिकोटा (कोल्लेरू झील दुर्ग), कोंडवीडु व कोंडापल्ली में गजपति दंडपाट प्रांत (1448–1515/1540 ई.) → विजयनगरम पूसपाटि गजपति एवं बोब्बिली संस्थानों का उत्कर्ष (1652–1757/1766 ई.)',
          te: 'రాజమహేంద్రవరం, కొల్లేటికోట, కొండవీడు & కొండపల్లిలలో గజపతి దండపాట పాలన (1448–1515/1540) → విజయనగరం పూసపాటి గజపతి & బొబ్బిలి సంస్థానాల ఆవిర్భావం (1652–1757/1766)',
          kn: 'ರಾಜಮಹೇಂದ್ರವರಂ, ಕೊಲ್ಲೇಟಿಕೋಟ, ಕೊಂಡವೀಡು ಮತ್ತು ಕೊಂಡಪಲ್ಲಿಯಲ್ಲಿ ಗಜಪತಿ ದಂಡಪಾಟ ಆಳ್ವಿಕೆ (1448–1515/1540) → ವಿಜಯನಗರಂ ಪೂಸಪಾಟಿ ಗಜಪತಿ ಮತ್ತು ಬೊಬ್ಬಿಲಿ ಸಂಸ್ಥಾನಗಳ ಉದಯ (1652–1757/1766)',
          ta: 'இராஜமகேந்திரவரம், கொல்லேட்டிகோட்டா, கொண்டவீடு & கொண்டப்பள்ளியில் கஜபதி தண்டபாட ஆட்சி (1448–1515/1540) → விஜயநகரம் பூசபாடி கஜபதி & பொப்பிலி சமஸ்தானங்களின் எழுச்சி (1652–1757/1766)',
          mr: 'राजमहेंद्रवरम, कोल्लेटिकोटा, कोंडवीडू व कोंडापल्ली येथे गजपती दंडपाट प्रांत (१४४८–१५१५/१५४०) → विजयनगरम पूसपाटी गजपती व बोब्बिली संस्थानांचा उदय (१६५२–१७५७/१७६६)',
          or: 'ରାଜମହେନ୍ଦ୍ରବରମ, କୋଲ୍ଲେଟିକୋଟା, କୋଣ୍ଡାଭିଡ଼ୁ ଓ କୋଣ୍ଡାପଲ୍ଲୀରେ ଗଜପତି ଦଣ୍ଡପାଟ ଶାସନ (୧୪୪୮–୧୫୧୫/୧୫୪୦) → ବିଜୟନଗରମ ପୁସପାଟି ଗଜପତି ଓ ବୋବ୍ବିଲି ସଂସ୍ଥାନର ଉଦୟ (୧୬୫୨–୧୭୫୭/୧୭୬୬)',
          bn: 'রাজমহেন্দ্রবরম, কোল্লেটিকোটা, কোন্ডাভিডু ও কোন্ডাপল্লীতে গজপতি দণ্ডপাট শাসন (১৪৪৮–১৫১৫/১৫৪০) → বিজয়নগরম পুষ্পাতি গজপতি ও বব্বিলি সংস্থানের উত্থান (১৬৫২–১৭৫৭/১৭৬৬)'
        },
        dateSpan: '1448 – 1757/1766 CE',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Veligalani Plates (1458 CE / Saka 1380); Kondavidu & Simhachalam Victory Pillars (1515 CE); Mackenzie Kaifiyats of Kolletikota'
      },
      {
        corridorId: 'track_s7_vijayanagara_karnata',
        corridorLabel: {
          en: 'Vijayanagara–Karnata–Deccan Corridor',
          hi: 'विजयनगर–कर्णाट–दक्कन गलियारा',
          te: 'విజయనగర–కర్ణాట–దక్కన్ ప్రాంతం',
          kn: 'ವಿಜಯನಗರ–ಕರ್ಣಾಟ–ದಕ್ಕನ್ ವಲಯ',
          ta: 'விஜயநகர–கர்நாடக–தக்காண மண்டலம்',
          mr: 'विजयनगर–कर्णाट–दख्खन पट्टा',
          or: 'ବିଜୟନଗର–କର୍ଣ୍ଣାଟ–ଦక్కନ ଅଞ୍ଚଳ',
          bn: 'বিজয়নগর–কর্ণাট–দাক্ষিণাত্য অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Vijayanagara Empire (Sangama, Saluva, Tuluva [Krishnadevaraya r. 1509–1529 CE] & Aravidu Dynasties, up to 1646 CE) & Bahmani / Deccan Sultanates; Keladi Nayakas, Chitradurga Paleyagars & Mysore Wodeyars employing Odde/Waddar stone-fortress and Kalyani-tank engineers',
          hi: 'विजयनगर साम्राज्य (संगम, सालुव, तुलुव [कृष्णदेवराय 1509–1529 ई.] एवं अरविडु वंश, 1646 ई. तक) तथा बहमनी/दक्कन सल्तनत; केलादी नायक, चित्रदुर्ग पालेगार एवं मैसूर वोडेयार राज्यों में ओड्डे/वड्डर दुर्ग व कल्याणी-जलाशय अभियंता',
          te: 'విజయనగర సామ్రాజ్యం (సంగమ, సాళువ, తుళువ [కృష్ణదేవరాయ 1509–1529] & ఆరవీడు వంశాలు, 1646 వరకు); కెళది నాయకులు, చిత్రదుర్గ పాలెగాళ్లు & మైసూర్ ఒಡೆಯర్ రాజ్యాలలో ఒడ్డె/వడ్డర్ రాతి-కోట మరియు కళ్యాణి-చెరువు నిర్మాతలు',
          kn: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ (ಸಂಗಮ, ಸಾಳುವ, ತುಳುವ [ಕೃಷ್ಣದೇವರಾಯ 1509–1529] ಮತ್ತು ಅರವೀಡು ವಂಶಗಳು, 1646 ರವರೆಗೆ); ಕೆಳದಿ ನಾಯಕರು, ಚಿತ್ರದುರ್ಗ ಪಾಳೆಯಗಾರರು ಮತ್ತು ಮೈಸೂರು ಒಡೆಯರ್ ರಾಜ್ಯಗಳಲ್ಲಿ ಒಡ್ಡೆ/ವಡ್ಡರ್ ಕಲ್ಲಿನ ಕೋಟೆ ಮತ್ತು ಕಲ್ಯಾಣಿ ನಿರ್ಮಾಪಕರು',
          ta: 'விஜயநகரப் பேரரசு (சங்கம, சாளுவ, துளுவ [கிருஷ்ணதேவராயர் 1509–1529] & ஆரவீடு வம்சங்கள், 1646 வரை); கேளди நாயக்கர்கள், சித்ரதுர்கா பாளையக்காரர்கள் & மைசூர் உடையார் அரசுகளில் ஒட்டெ/வட்டர் கற்கோட்டைப் பொறியாளர்கள்',
          mr: 'विजयनगर साम्राज्य (संगम, सालुव, तुलुव [कृष्णदेवराय १५०९–१५२९] व अरविडू वंश, १६४६ पर्यंत); केळदी नायक, चित्रदुर्ग पाळेगार आणि म्हैसूर राज्यात ओड्डे/वड्डर दगडी किल्ले व तलाव अभियंते',
          or: 'ବିଜୟନଗର ସାମ୍ରାଜ୍ୟ (ସଙ୍ଗମ, ସାଳୁବ, ତୁଳୁବ [କୃଷ୍ଣଦେବରାୟ ୧୫୦୯–୧୫୨୯] ଓ ଆରବିଡ଼ୁ ବଂଶ, ୧୬୪୬ ପର୍ଯ୍ୟନ୍ତ); କେളଦି ନାୟକ, ଚିତ୍ରଦୁର୍ଗ ଓ ମହୀଶୂର ରାଜ୍ୟରେ ଓଡ଼େ/ବଡ଼ର ପ୍ରସ୍ତର ଦୁର୍ଗ ନିର୍ମାତା',
          bn: 'বিজয়নগর সাম্রাজ্য (সঙ্গম, সালুব, তুলুব [কৃষ্ণদেবরায় ১৫০৯–১৫২৯] ও আরবিড়ু বংশ, ১৬৪৬ পর্যন্ত); কেলদি নায়ক, চিত্রদুর্গ ও মহীশূর রাজ্যে ওড্ডে/বড্ডর প্রস্তর দুর্গ নির্মাতা'
        },
        dateSpan: '1434 – 1757 CE',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Udayagiri & Simhachalam Epigraphs (1513–1515 CE); Hampi & Chitradurga Fort Inscriptions'
      },
      {
        corridorId: 'track_s7_kaveri_srirangam_nayaka',
        corridorLabel: {
          en: 'Kaveri–Srirangam–Madurai/Thanjavur Nayaka Corridor',
          hi: 'कावेरी–श्रीरंगम–मदुरै/तंजावुर नायक गलियारा',
          te: 'కావేరీ–శ్రీరంగం–మధురై/తంజావూరు నాయక ప్రాంతం',
          kn: 'ಕಾವೇರಿ–ಶ್ರೀರಂಗಂ–ಮಧುರೈ/ತಂಜಾವೂರು ನಾಯಕ ವಲಯ',
          ta: 'காவிரி–ஸ்ரீரங்கம்–மதுரை/தஞ்சாவூர் நாயக்கர் மண்டலம்',
          mr: 'कावेरी–श्रीरंगम–मदुराई/तंजावर नायक पट्टा',
          or: 'କାବେରୀ–ଶ୍ରୀରଙ୍ଗମ–ମଦୁରାଇ/ତଞ୍ଜାବୁର ନାୟକ ଅଞ୍ଚଳ',
          bn: 'কাবেরী–শ্রীরঙ্গম–মাদুরাই/তাঞ্জাভুর নায়ক অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Gajapathi Southern Expedition to Kanchi, Tiruchirappalli & Srirangam under Kumara Hamvira Deva (1464 CE) → Gingee, Thanjavur & Madurai Nayaka Kingdoms (1529–1736 CE) & Poligar / Palaiyakkarar Citadels with Odiyaraju / Oddar military and hydraulic engineering settlements',
          hi: 'कुमार हम्वीर देव के अधीन कांची, तिरुचिरापल्ली एवं श्रीरंगम तक गजपति दक्षिणी अभियान (1464 ई.) → जिंजी, तंजावुर एवं मदुरै नायक राज्य (1529–1736 ई.) तथा पालेगार दुर्गों में ओडियाराजू / ओड्डर सैन्य व जल-अभियांत्रिकी बस्तियाँ',
          te: 'కుమార హంవీర దేవుని క్రింద కాంచీ, తిరుచిరాపల్లి & శ్రీరంగం వరకు గజపతి దక్షిణ దండయాత్ర (1464) → జింజీ, తంజావూరు & మధురై నాయక రాజ్యాలు (1529–1736) మరియు పాలెగాళ్ల కోటలలో ఒడియరాజు / ఒడ్డర్ సైనిక-జలాశయ నిర్మాణ స్థావరాలు',
          kn: 'ಕುಮಾರ ಹಂವೀರ ದೇವನ ಅಡಿಯಲ್ಲಿ ಕಾಂಚಿ, ತಿರುಚಿರಾಪಳ್ಳಿ ಮತ್ತು ಶ್ರೀರಂಗಂವರೆಗೆ ಗಜಪತಿ ದಕ್ಷಿಣ ದಂಡಯಾತ್ರೆ (1464) → ಜಿಂಜಿ, ತಂಜಾವೂರು ಮತ್ತು ಮಧುರೈ ನಾಯಕ ರಾಜ್ಯಗಳು (1529–1736) ಹಾಗೂ ಪಾಳೆಯಗಾರರ ಕೋಟೆಗಳಲ್ಲಿ ಒಡಿಯರಾಜು / ಒಡ್ಡರ್ ನೆಲೆಗಳು',
          ta: 'குமார ஹம்வீர தேவர் கீழ் காஞ்சி, திருச்சி & ஸ்ரீரங்கம் வரை கஜபதி தென்னிந்தியப் படையெடுப்பு (1464) → செஞ்சி, தஞ்சாவூர் & மதுரை நாயக்கர் அரசுகள் (1529–1736) மற்றும் பாளையக்காரர் கோட்டைகளில் ஒடியராஜு / ஒட்டர் குடியிருப்புகள்',
          mr: 'कुमार हम्वीर देवाच्या नेतृत्वाखाली कांची, तिरुचिरापल्ली व श्रीरंगमपर्यंत गजपती दक्षिण मोहीम (१४६४) → जिंजी, तंजावर व मदुराई नायक राज्ये (१५२९–१७३६) आणि पाळेगार किल्ल्यांमध्ये ओडियाराजू / ओड्डर लष्करी वसाहती',
          or: 'କୁମାର ହମ୍ବୀର ଦେବଙ୍କ ଅଧୀନରେ କାଞ୍ଚି, ତିରୁଚିରାପଲ୍ଲୀ ଓ ଶ୍ରୀରଙ୍ଗମ ପର୍ଯ୍ୟନ୍ତ ଗଜପତି ଦକ୍ଷିଣ ଅଭିଯାନ (୧୪୬୪) → ଜିଞ୍ଜି, ତଞ୍ଜାବୁର ଓ ମଦୁରାଇ ନାୟକ ରାଜ୍ୟ (୧୫୨୯–୧୭୩୬) ଓ ପାളେଗାର ଦୁର୍ଗରେ ଓଡ଼ିଆରାଜୁ / ଓଡ଼ର ବସତି',
          bn: 'কুমার হম্বীর দেবের অধীনে কাঞ্চী, তিরুচিরাপল্লী ও শ্রীরঙ্গম পর্যন্ত গজপতি দক্ষিণ অভিযান (১৪৬৪) → জিঞ্জি, তাঞ্জাভুর ও মাদুরাই নায়ক রাজ্য (১৫২৯–১৭৩৬) এবং পালেগার দুর্গে ওড়িয়ারাজু / ওড্ডর বসতি'
        },
        dateSpan: '1464 – 1757 CE',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Srirangam Ranganathaswamy Temple Inscription (Saka 1386 / 1464 CE); Madurai & Thanjavur Nayaka Copper Plates'
      }
    ],
    keyMonumentsAndInscriptions: [
      'Veligalani Copper-Plate Grant of Kapilendra Deva (1458 CE / Saka 1380, EI Vol. XXXIII, pp. 275–292)',
      'Srirangam Gift Edict of Kumara Hamvira Deva (1464 CE / Saka 1386)',
      'Triveni Ghat Inscription of Mukunda Deva & Barabati Nine-Storeyed Palace (Ain-i-Akbari)',
      'Mackenzie Collection Local Kaifiyats (1800–1815)'
    ],
    linkedArticleIds: [
      'art_gajapathi_kapilendra',
      'art_lin_suryavamshi_kings',
      'art_kolletikota_peddintlamma_lake',
      'art_oad_rajputh_od_history',
      'art_hd_archival_manuscripts_kaifiyats'
    ],
    linkedEventIds: [
      'ev_1434',
      'ev_1448',
      'ev_kolletikota_gajapathi_garrison',
      'ev_1458',
      'ev_1464',
      'ev_1489',
      'ev_1515',
      'ev_1568'
    ]
  },
  {
    stageOrder: 8,
    id: 'stage_08_modern_historical',
    refNumber: 'HT-0009',
    stageCode: 'MODERN_HISTORICAL_PERIOD',
    title: {
      en: 'Stage 8: Modern Historical Period — Anti-Colonial Resistance (1804 & 1817 Paika Rebellion), Ethnographic Gazetteers & Digital Archival Preservation (1757/1766 CE – Present)',
      hi: 'चरण 8: आधुनिक ऐतिहासिक काल — उपनिवेश-विरोधी संग्राम (1804 एवं 1817 पाइक विद्रोह), गजेटियर एवं डिजिटल अभिलेखीय संरक्षण (1757/1766 ई. – वर्तमान)',
      te: 'దశ 8: ఆధునిక చారిత్రక కాలం — వలస వ్యతిరేక పోరాటం (1804 & 1817 పైకా తిరుగుబాటు), గెజిటీర్లు & డిజిటల్ ఆర్కైవల్ సంరక్షణ (క్రీ.శ. 1757/1766 – నేటి వరకు)',
      kn: 'ಹಂತ 8: ಆಧುನಿಕ ಐತಿಹಾಸಿಕ ಕಾಲ — ವಸಾಹತುಶಾಹಿ ವಿರೋಧಿ ಹೋರಾಟ (1804 ಮತ್ತು 1817 ಪೈಕಾ ಬಂಡಾಯ), ಗೆಜೆಟಿಯರ್‌ಗಳು ಮತ್ತು ಡಿಜಿಟಲ್ ಪರಂಪರೆ (ಕ್ರಿ.ಶ. 1757/1766 – ಪ್ರಸ್ತುತ)',
      ta: 'நிலை 8: நவீன வரலாற்றுக் காலம் — காலனிய எதிர்ப்புப் போராட்டம் (1804 & 1817 பைக்கா புரட்சி), அரசிதழ்கள் & டிஜிட்டல் ஆவணப் பாதுகாப்பு (பொ.ஊ. 1757/1766 – நிகழ்காலம்)',
      mr: 'टप्पा 8: आधुनिक ऐतिहासिक काळ — वसाहतविरोधी लढा (१८०४ व १८१७ पाइक उठाव), गॅझेटियर्स आणि डिजिटल जतन (इ.स. १७५७/१७६६ – वर्तमान)',
      or: 'ପର୍ଯ୍ୟାୟ ୮: ଆଧୁନିକ ଐତିହାସିକ କାଳ — ଉପନିବେଶ-ବିରୋଧୀ ସଂଗ୍ରାମ (୧୮୦୪ ଓ ୧୮୧୭ ପାଇକ ବିଦ୍ରୋହ), ଗେଜେଟିୟର୍ ଓ ଡିଜିଟାଲ୍ ସଂରକ୍ଷଣ (୧୭୫୭/୧୭୬୬ ଖ୍ରୀ.ଅ. – ବର୍ତ୍ତମାନ)',
      bn: 'পর্যায় ৮: আধুনিক ঐতিহাসিক কাল — উপনিবেশ-বিরোধী সংগ্রাম (১৮০৪ ও ১৮১৭ পাইক বিদ্রোহ), গেজেটিয়ার ও ডিজিটাল সংরক্ষণ (১৭৫৭/১৭৬৬ খ্রি. – বর্তমান)'
    },
    approxDateLabel: {
      en: '1757/1766 CE – Present (1804 Jayee Rajguru Uprising, 1817 Baxi Jagabandhu Paika Rebellion, 1871–1931 Census & Gazetteers, 76 Community Names Directory)',
      hi: '1757/1766 ई. – वर्तमान (1804 जयी राजगुरु संग्राम, 1817 बख्शी जगबंधु पाइक विद्रोह, 1871–1931 जनगणना एवं गजेटियर, 76 समुदाय नाम निर्देशिका)',
      te: 'క్రీ.శ. 1757/1766 – నేటి వరకు (1804 జయీ రాజగురు పోరాటం, 1817 బక్షి జగబంధు పైకా తిరుగుబాటు, 1871–1931 గెజిటీర్లు, 76 కమ్యూనిటీ పేర్ల డైరెక్టరీ)',
      kn: 'ಕ್ರಿ.ಶ. 1757/1766 – ಪ್ರಸ್ತುತ (1804 ಜಯೀ ರಾಜಗುರು ಹೋರಾಟ, 1817 ಬಕ್ಷಿ ಜಗಬಂಧು ಪೈಕಾ ಬಂಡಾಯ, 1871–1931 ಗೆಜೆಟಿಯರ್‌ಗಳು, 76 ಸಮುದಾಯ ಹೆಸರುಗಳ ಕೈಪಿಡಿ)',
      ta: 'பொ.ஊ. 1757/1766 – நிகழ்காலம் (1804 ஜயீ ராஜ்குரு எழுச்சி, 1817 பக்ஷி ஜகபந்து பைக்கா புரட்சி, 1871–1931 அரசிதழ்கள், 76 சமூகப் பெயர்கள்)',
      mr: 'इ.स. १७५७/१७६६ – वर्तमान (१८०४ जयी राजगुरू लढा, १८१७ बक्षी जगबंधू पाइक उठाव, १८७१–१९३१ गॅझेटियर्स, ७६ समुदाय नावे)',
      or: '୧୭୫୭/୧୭୬୬ ଖ୍ରୀ.ଅ. – ବର୍ତ୍ତମାନ (୧୮୦୪ ଜୟୀ ରାଜଗୁରୁ ସଂଗ୍ରାମ, ୧୮୧୭ ବକ୍ସି ଜଗବନ୍ଧୁ ପାଇକ ବିଦ୍ରୋହ, ୧୮୭୧–୧୯୩୧ ଗେଜେଟିୟର୍, ୭୬ ସମାଜ ନାମ)',
      bn: '১৭৫৭/১৭৬৬ খ্রি. – বর্তমান (১৮০৪ জয়ী রাজগুরু সংগ্রাম, ১৮১৭ বক্সী জগবন্ধু পাইক বিদ্রোহ, ১৮৭১–১৯৩১ গেজেটিয়ার, ৭৬ সম্প্রদায় নাম)'
    },
    chronologicalUncertaintyNote: {
      en: 'Fully documented in British East India Company Ewer Commission reports (1818), Madras and Bengal Presidency Gazetteers, Edgar Thurston’s Castes and Tribes of Southern India (1909), R.E. Enthoven (1922), and modern epigraphic publications (ASI / Epigraphia Indica).',
      hi: 'ब्रिटिश ईस्ट इंडिया कंपनी की एवर कमीशन रिपोर्ट (1818), मद्रास और बंगाल प्रेसीडेंसी गजेटियरों, एडगर थर्स्टन (1909), आर.ई. एंथोवेन (1922) और भारतीय पुरातत्व सर्वेक्षण (ASI / एपिग्राफिया इंडिका) में पूर्णतः प्रलेखित।',
      te: 'బ్రిటిష్ ఈస్ట్ ఇండియా కంపెనీ ఎవర్ కమిషన్ నివేదిక (1818), మద్రాస్ మరియు బెంగాల్ గెజిటీర్లు, ఎడ్గర్ థర్స్టన్ (1909), ఆర్.ఇ. ఎంథోవెన్ (1922) మరియు ఆధునిక శాసన సంపుటాలలో పూర్తిగా నమోదైంది.',
      kn: 'ಬ್ರಿಟಿಷ್ ಈಸ್ಟ್ ಇಂಡಿಯಾ ಕಂಪನಿಯ ಎವರ್ ಆಯೋಗದ ವರದಿ (1818), ಮದ್ರಾಸ್ ಮತ್ತು ಬಂಗಾಳ ಪ್ರೆಸಿಡೆನ್ಸಿ ಗೆಜೆಟಿಯರ್‌ಗಳು, ಎಡ್ಗರ್ ಥರ್ಸ್ಟನ್ (1909), ಎಂಥೋವೆನ್ (1922) ಮತ್ತು ಎಎಸ್ಐ ದಾಖಲೆಗಳಲ್ಲಿ ಸಂಪೂರ್ಣವಾಗಿ ದೃಢಪಟ್ಟಿದೆ.',
      ta: 'ஆங்கிலேயக் கிழக்கிந்திய கம்பெனியின் எவர் ஆணைய அறிக்கை (1818), சென்னை மற்றும் வங்காள மாகாண அரசிதழ்கள், எட்கர் தர்ஸ்டன் (1909), எந்தோவன் (1922) மற்றும் தொல்லியல் துறை ஆவணங்களில் முழுமையாகப் பதிவு செய்யப்பட்டுள்ளது.',
      mr: 'ब्रिटिश ईस्ट इंडिया कंपनीचा एव्हर कमिशन अहवाल (१८१८), मद्रास व बंगाल प्रेसिडेन्सी गॅझेटियर्स, एडगर थर्स्टन (१९०९), एंथोवेन (१९२२) आणि भारतीय पुरातत्त्व सर्वेक्षणाच्या नोंदींमध्ये पूर्णपणे दस्तऐवजीकरण केलेले.',
      or: 'ବ୍ରିଟିଶ ଇଷ୍ଟ ଇଣ୍ଡିଆ କମ୍ପାନୀର ଏୱାର କମିଶନ ରିପୋର୍ଟ (୧୮୧୮), ମାନ୍ଦ୍ରାଜ ଓ ବେଙ୍ଗଲ ପ୍ରେସିଡେନ୍ସି ଗେଜେଟିୟର୍, ଏଡଗାର ଥର୍ଷ୍ଟନ (୧୯୦୯), ଏନ୍ଥୋଭେନ (୧୯୨୨) ଓ ଏଏସଆଇ ଦଲିଲରେ ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରମାଣିତ।',
      bn: 'ব্রিটিশ ইস্ট ইন্ডিয়া কোম্পানির এওয়ার কমিশন রিপোর্ট (১৮১৮), মাদ্রাজ ও বেঙ্গল প্রেসিডেন্সি গেজেটিয়ার, এডগার থার্স্টন (১৯০৯), এনথোভেন (১৯২২) ও এএসআই দলিলে সম্পূর্ণভাবে নথিবদ্ধ।'
    },
    epistemicLabel: {
      en: 'Verified Archival, Gazetteer & Modern Historical Records',
      hi: 'सत्यापित अभिलेखागार, गजेटियर एवं आधुनिक ऐतिहासिक रिकॉर्ड',
      te: 'ధృవీకరించబడిన ఆర్కైవల్, గెజిటీర్ & ఆధునిక చారిత్రక రికార్డులు',
      kn: 'ದೃಢೀಕೃತ ಪತ್ರಾಗಾರ, ಗೆಜೆಟಿಯರ್ ಮತ್ತು ಆಧುನಿಕ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು',
      ta: 'உறுதிப்படுத்தப்பட்ட ஆவணக் காப்பகம், அரசிதழ் & நவீன வரலாற்றுப் பதிவுகள்',
      mr: 'सत्यापित अभिलेखागार, गॅझेटियर आणि आधुनिक ऐतिहासिक नोंदी',
      or: 'ପ୍ରମାଣିତ ଅଭିଲେଖାଗାର, ଗେଜେଟିୟର୍ ଓ ଆଧୁନିକ ଐତିହାସିକ ରେକର୍ଡ',
      bn: 'প্রমাণিত মহাফেজখানা, গেজেটিয়ার ও আধুনিক ঐতিহাসিক নথি'
    },
    epistemicTier: 'verified_historical',
    symbolicIllustration: ARCHIVE_IMG('baxi_jagabandhu_statue.jpg'),
    illustrationCaption: {
      en: 'Memorial statue of Baxi Jagabandhu Bidyadhar Mohapatra Bhramarabara Raya, Commander-in-Chief of the 1817 Paika Rebellion in Odisha.',
      hi: '1817 के ओडिशा पाइक विद्रोह के सर्वोच्च सेनापति बख्शी जगबंधु विद्याधर महापात्र भ्रमरबर राय की स्मारक प्रतिमा।',
      te: '1817 ఒడిశా పైకా తిరుగుబాటు సర్వసేనాని బక్షి జగబంధు విద్యాధర్ మహాపాత్ర భ్రమరవర రాయ స్మారక విగ్రహం.',
      kn: '1817ರ ಒಡಿಶಾ ಪೈಕಾ ಬಂಡಾಯದ ಮಹಾದಂಡನಾಯಕ ಬಕ್ಷಿ ಜಗಬಂಧು ವಿದ್ಯಾಧರ ಮಹಾಪಾತ್ರ ಭ್ರಮರಬರ ರಾಯರ ಸ್ಮಾರಕ ಪ್ರತಿಮೆ.',
      ta: '1817 ஒடிசா பைக்கா புரட்சியின் தலைமைத் தளபதி பக்ஷி ஜகபந்து வித்யாதர் மகாபாத்ர பிரமரபர ராயரின் நினைவுச் சிலை.',
      mr: '१८१७ च्या ओडिशा पाइक उठावाचे सरसेनापती बक्षी जगबंधू विद्याधर महापात्र भ्रमरबर राय यांचा स्मारक पुतळा.',
      or: '୧୮୧୭ ଓଡ଼ିଶା ପାଇକ ବିଦ୍ରୋହର ସର୍ବସେନାପତି ବକ୍ସି ଜଗବନ୍ଧୁ ବିଦ୍ୟାଧର ମହାପାତ୍ର ଭ୍ରମରବର ରାୟଙ୍କ ସ୍ମାରକୀ ପ୍ରତିମୂର୍ତ୍ତି।',
      bn: '১৮১৭ সালের উড়িষ্যা পাইক বিদ্রোহের সর্বাধিনায়ক বক্সী জগবন্ধু বিদ্যাধর মহাপাত্র ভ্রমরবর রায়ের স্মারক মূর্তি।'
    },
    visualTypeBadge: {
      en: 'Verified Historical Monument & Archival Record',
      hi: 'सत्यापित ऐतिहासिक स्मारक एवं अभिलेखीय रिकॉर्ड',
      te: 'ధృవీకరించబడిన చారిత్రక స్మారకం & ఆర్కైవల్ రికార్డు',
      kn: 'ದೃಢೀಕೃತ ಐತಿಹಾಸಿಕ ಸ್ಮಾರಕ ಮತ್ತು ಪತ್ರಾಗಾರ ದಾಖಲೆ',
      ta: 'உறுதிப்படுத்தப்பட்ட வரலாற்று நினைவுச்சின்னம் & ஆவணப் பதிவு',
      mr: 'सत्यापित ऐतिहासिक स्मारक आणि अभिलेखागार नोंद',
      or: 'ପ୍ରମାଣିତ ଐତିହାସିକ ସ୍ମାରକୀ ଓ ଅଭିଲେଖାଗାର ରେକର୍ଡ',
      bn: 'প্রমাণিত ঐতিহাসিক স্মৃতিস্তম্ভ ও মহাফেজখানা নথি'
    },
    conciseOverview: {
      en: 'Covers early anti-colonial resistance led by Jayee Rajguru (1804) and Baxi Jagabandhu (1817), colonial ethnographic surveys (1871–1931), modern infrastructure engineering across India, and the digital preservation of the 76 Community Names heritage.',
      hi: 'जयी राजगुरु (1804) और बख्शी जगबंधु (1817) के नेतृत्व में प्रारंभिक उपनिवेश-विरोधी प्रतिरोध, औपनिवेशिक नृवंशविज्ञान सर्वेक्षण (1871–1931), आधुनिक बुनियादी ढांचा अभियांत्रिकी और 76 समुदाय नामों की विरासत का डिजिटल संरक्षण।',
      te: 'జయీ రాజగురు (1804) మరియు బక్షి జగబంధు (1817) నేతృత్వంలోని వలస వ్యతిరేక పోరాటాలు, 1871–1931 ఎథ్నోగ్రాఫిక్ సర్వేలు, ఆధునిక మౌలిక సదుపాయాల నిర్మాణం మరియు 76 కమ్యూనిటీ పేర్ల వారసత్వ డిజిటల్ సంరక్షణ.',
      kn: 'ಜಯೀ ರಾಜಗುರು (1804) ಮತ್ತು ಬಕ್ಷಿ ಜಗಬಂಧು (1817) ನೇತೃತ್ವದ ವಸಾಹತುಶಾಹಿ ವಿರೋಧಿ ಹೋರಾಟ, 1871–1931ರ ಗೆಜೆಟಿಯರ್ ಸಮೀಕ್ಷೆಗಳು ಮತ್ತು 76 ಸಮುದಾಯ ಹೆಸರುಗಳ ಡಿಜಿಟಲ್ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆ.',
      ta: 'ஜயீ ராஜ்குரு (1804) மற்றும் பக்ஷி ஜகபந்து (1817) தலைமையிலான காலனிய எதிர்ப்புப் போராட்டங்கள், 1871–1931 இனவரைவியல் ஆய்வுகள் மற்றும் 76 சமூகப் பெயர்களின் டிஜிட்டல் ஆவணப் பாதுகாப்பு.',
      mr: 'जयी राजगुरू (१८०४) आणि बक्षी जगबंधू (१८१७) यांच्या नेतृत्वाखालील वसाहतविरोधी लढा, १८७१–१९३१ मधील गॅझेटियर सर्वेक्षणे आणि ७६ समुदाय नावांच्या वारशाचे डिजिटल जतन.',
      or: 'ଜୟୀ ରାଜଗୁରୁ (୧୮୦୪) ଓ ବକ୍ସି ଜଗବନ୍ଧୁ (୧୮୧୭) ଙ୍କ ନେତୃତ୍ୱରେ ଉପନିବେଶ-ବିରୋଧୀ ସଂଗ୍ରାମ, ୧୮୭୧–୧୯୩୧ ଗେଜେଟିୟର୍ ସର୍ବେକ୍ଷଣ ଏବଂ ୭୬ଟି ସମାଜ ନାମର ଡିଜିଟାଲ୍ ଐତିହ୍ୟ ସଂରକ୍ଷଣ।',
      bn: 'জয়ী রাজগুরু (১৮০৪) ও বক্সী জগবন্ধু (১৮১৭)-এর নেতৃত্বে উপনিবেশ-বিরোধী সংগ্রাম, ১৮৭১–১৯৩১ গেজেটিয়ার জরিপ এবং ৭৬টি সম্প্রদায় নামের ডিজিটাল ঐতিহ্য সংরক্ষণ।'
    },
    detailedAnalysis: {
      en: 'Colonial-era gazetteers (Hunter 1872, Risley 1891, Enthoven 1922, Thurston 1909) documented the pan-Indian distribution of Od, Oad-Rajput, Odde, VaddeRajulu, Oddar, and Waddar communities, recording both their traditional memories of royal Odra/Gajapathi origin and their mastery of monumental stone, fort, and reservoir engineering.',
      hi: 'औपनिवेशिक काल के गजेटियरों (हंटर 1872, रिस्ले 1891, एंथोवेन 1922, थर्स्टन 1909) ने ओड, ओड-राजपूत, ओड्डे, वड्डेराजुलु, ओड्डर और वड्डर समुदायों के अखिल भारतीय विस्तार को दर्ज किया, जिसमें उनके राजकीय ओड्र/गजपति मूल की स्मृति और भव्य दुर्ग व जलाशय निर्माण में उनकी निपुणता दोनों का उल्लेख है।',
      te: 'వలస కాలపు గెజిటీర్లు (హంటర్ 1872, రిస్లే 1891, ఎంథోవెన్ 1922, థర్స్టన్ 1909) ఓడ్, ఓడ్-రాజపుత్, ఒడ్డె, వడ్డెరాజులు, ఒడ్డర్ మరియు వడ్డర్ సమాజాల పాన్-ఇండియన్ విస్తరణను, వారి ప్రాచీన ఓడ్ర/గజపతి మూలాలను మరియు కోటలు, జలాశయాల నిర్మాణ నైపుణ్యాన్ని నమోదు చేశాయి.',
      kn: 'ವಸಾಹತುಶಾಹಿ ಕಾಲದ ಗೆಜೆಟಿಯರ್‌ಗಳು (ಹಂಟರ್ 1872, ರಿಸ್ಲೆ 1891, ಎಂಥೋವೆನ್ 1922, ಥರ್ಸ್ಟನ್ 1909) ಓಡ್, ಓಡ್-ರಜಪೂತ್, ಒಡ್ಡೆ, ವಡ್ಡೇರಾಜುಲು, ಒಡ್ಡರ್ ಮತ್ತು ವಡ್ಡರ್ ಸಮುದಾಯಗಳ ಪ್ಯಾನ್-ಇಂಡಿಯನ್ ವಿಸ್ತರಣೆಯನ್ನು ಹಾಗೂ ಅವರ ಓಡ್ರ/ಗಜಪತಿ ಮೂಲ ಮತ್ತು ಕೋಟೆ-ಜಲಾಶಯ ನಿರ್ಮಾಣ ಕೌಶಲ್ಯವನ್ನು ದಾಖಲಿಸಿವೆ.',
      ta: 'காலனிய கால அரசிதழ்கள் (ஹண்டர் 1872, ரிஸ்லி 1891, எந்தோவன் 1922, தர்ஸ்டன் 1909) ஓட், ஓட்-ராஜ்புத், ஒட்டெ, வட்டெராஜுலு, ஒட்டர் மற்றும் வட்டர் சமூகங்களின் இந்திய அளவிலான பரவலையும், அவர்களின் ஒட்டர/கஜபதி பூர்வீக நினைவுகள் மற்றும் கோட்டை-நீர்த்தேக்கக் கட்டுமானத் திறனையும் பதிவு செய்துள்ளன.',
      mr: 'वसाहतकालीन गॅझेटियर्सनी (हंटर १८७२, रिस्ले १८९१, एंथोवेन १९२२, थर्स्टन १९०९) ओड, ओड-राजपूत, ओड्डे, वड्डेराजुलू, ओड्डर आणि वड्डर समुदायांचा अखिल भारतीय विस्तार, त्यांच्या ओड्र/गजपती मुळांच्या आठवणी आणि किल्ले व जलाशय बांधणीतील त्यांचे कौशल्य नोंदवले आहे.',
      or: 'ଉପନିବେଶ କାଳୀନ ଗେଜେଟିୟର୍ (ହଣ୍ଟର ୧୮୭୨, ରିସଲେ ୧୮୯୧, ଏନ୍ଥୋଭେନ ୧୯୨୨, ଥର୍ଷ୍ଟନ ୧୯୦୯) ଓଡ଼, ଓଡ଼-ରାଜପୁତ, ଓଡ଼େ, ବଡ଼େରାଜୁଲୁ, ଓଡ଼ର ଓ ବଡ଼ର ସମାଜର ସର୍ବଭାରତୀୟ ବିସ୍ତାର, ସେମାନଙ୍କର ପ୍ରାଚୀନ ଓଡ଼୍ର/ଗଜପତି ମୂଳ ଏବଂ ଦୁର୍ଗ ଓ ଜଳାଶୟ ନିର୍ମାଣ ଦକ୍ଷତାକୁ ଲିପିବଦ୍ଧ କରିଛି।',
      bn: 'ঔপনিবেশিক যুগের গেজেটিয়ারসমূহ (হান্টার ১৮৭২, রিসলে ১৮৯১, এনথোভেন ১৯২২, থার্স্টন ১৯০৯) ওড়, ওড়-রাজপুত, ওড্ডে, বড্ডেরাজুলু, ওড্ডর ও বড্ডর সম্প্রদায়ের সর্বভারতীয় বিস্তার, তাঁদের প্রাচীন ওড্র/গজপতি উৎপত্তির স্মৃতি এবং দুর্গ ও জলাশয় নির্মাণের দক্ষতা লিপিবদ্ধ করেছে।'
    },
    dateClassificationBreakdown: {
      establishedInscriptional: {
        en: 'Established Archival & Epigraphic Publication Dates: 1757 CE (Battle of Bobbili & Vizianagaram Treaty); 1766 CE (Northern Circars Cession); 1803–1804 CE (Khurda Uprising of Jayee Rajguru); March 1817 CE (Paika Rebellion under Baxi Jagabandhu; Ewer Commission Report 1818); 1892–present (Publication of Epigraphia Indica & South Indian Inscriptions by ASI).',
        hi: 'स्थापित अभिलेखीय एवं प्रकाशन तिथियाँ: 1757 ई. (बोब्बिली युद्ध व विजयनगरम संधि); 1766 ई. (उत्तरी सरकार संधि); 1803–1804 ई. (जयी राजगुरु का खुर्दा विद्रोह); मार्च 1817 ई. (बख्शी जगबंधु के अधीन पाइक विद्रोह; एवर कमीशन रिपोर्ट 1818); 1892–वर्तमान (ASI द्वारा एपिग्राफिया इंडिका का प्रकाशन)।',
        te: 'నిర్ధారిత ఆర్కైవల్ & ప్రచురణ తేదీలు: క్రీ.శ. 1757 (బొబ్బిలి యుద్ధం); క్రీ.శ. 1766 (ఉత్తర సర్కారుల ఒప్పందం); క్రీ.శ. 1803–1804 (జయీ రాజగురు ఖుర్దా పోరాటం); మార్చి 1817 (బక్షి జగబంధు పైకా తిరుగుబాటు; ఎవర్ కమిషన్ నివేదిక 1818); 1892–ప్రస్తుతం (ASI ఎపిగ్రాఫియా ఇండికా ప్రచురణ).',
        kn: 'ದೃಢೀಕೃತ ಪತ್ರಾಗಾರ ದಿನಾಂಕಗಳು: ಕ್ರಿ.ಶ. 1757 (ಬೊಬ್ಬಿಲಿ ಕದನ); ಕ್ರಿ.ಶ. 1766 (ಉತ್ತರ ಸರ್ಕಾರ್ ಒಪ್ಪಂದ); ಕ್ರಿ.ಶ. 1803–1804 (ಜಯೀ ರಾಜಗುರು ಖುರ್ದಾ ಹೋರಾಟ); ಮಾರ್ಚ್ 1817 (ಬಕ್ಷಿ ಜಗಬಂಧು ಪೈಕಾ ಬಂಡಾಯ; ಎವರ್ ಆಯೋಗದ ವರದಿ 1818); 1892–ಪ್ರಸ್ತುತ (ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ ಪ್ರಕಟಣೆ).',
        ta: 'உறுதிப்படுத்தப்பட்ட ஆவணத் தேதிகள்: பொ.ஊ. 1757 (பொப்பிலிப் போர்); பொ.ஊ. 1766 (வட சர்க்கார் ஒப்பந்தம்); பொ.ஊ. 1803–1804 (ஜயீ ராஜ்குரு குர்தா எழுச்சி); மார்ச் 1817 (பக்ஷி ஜகபந்து பைக்கா புரட்சி; எவர் ஆணைய அறிக்கை 1818); 1892–நிகழ்காலம் (எபிகிராபியா இண்டிகா வெளியீடு).',
        mr: 'प्रस्थापित अभिलेखीय तारखा: इ.स. १७५७ (बोब्बिलीची लढाई); इ.स. १७६६ (उत्तरी सरकार तह); इ.स. १८०३–१८०४ (जयी राजगुरूंचा खुर्दा उठाव); मार्च १८१७ (बक्षी जगबंधूंचा पाइक उठाव; एव्हर कमिशन अहवाल १८१८); १८९२–वर्तमान (एपिग्राफिया इंडिका प्रकाशन).',
        or: 'ପ୍ରତିଷ୍ଠିତ ଅଭିଲେଖାଗାର ତାରିଖ: ୧୭୫୭ ଖ୍ରୀ.ଅ. (ବୋବ୍ବିଲି ଯୁଦ୍ଧ); ୧୭୬୬ ଖ୍ରୀ.ଅ. (ଉତ୍ତର ସରକାର ଚୁକ୍ତି); ୧୮୦୩–୧୮୦୪ ଖ୍ରୀ.ଅ. (ଜୟୀ ରାଜଗୁରୁଙ୍କ ଖୋର୍ଦ୍ଧା ବିଦ୍ରୋହ); ମାର୍ଚ୍ଚ ୧୮୧୭ (ବକ୍ସି ଜଗବନ୍ଧୁଙ୍କ ପାଇକ ବିଦ୍ରୋହ; ଏୱାର କମିଶନ ରିପୋର୍ଟ ୧୮୧୮); ୧୮୯୨–ବର୍ତ୍ତମାନ (ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା ପ୍ରକାଶନ)।',
        bn: 'প্রতিষ্ঠিত মহাফেজখানা তারিখ: ১৭৫৭ খ্রি. (বব্বিলির যুদ্ধ); ১৭৬৬ খ্রি. (উত্তর সরকার চুক্তি); ১৮০৩–১৮০৪ খ্রি. (জয়ী রাজগুরুর খোর্ধা বিদ্রোহ); মার্চ ১৮১৭ (বক্সী জগবন্ধুর পাইক বিদ্রোহ; এওয়ার কমিশন রিপোর্ট ১৮১৮); ১৮৯২–বর্তমান (এপিগ্রাফিয়া ইন্ডিকা প্রকাশ)।'
      },
      approximateDynastic: {
        en: 'Approximate Institutional & Survey Spans: Colonel Colin Mackenzie’s Peninsular Manuscript Survey (c. 1799–1815 CE); Imperial Gazetteer & Decennial Census Ethnographic Volumes (1871–1931 CE: Hunter 1872, Risley 1891, Thurston 1909, Russell & Hiralal 1916, Enthoven 1922).',
        hi: 'अनुमानित सर्वेक्षण कालखंड: कर्नल कॉलिन मैकेंज़ी का प्रायद्वीपीय पांडुलिपि सर्वेक्षण (लगभग 1799–1815 ई.); इम्पीरियल गजेटियर एवं दशकीय जनगणना खंड (1871–1931 ई.: हंटर 1872, रिस्ले 1891, थर्स्टन 1909, रसेल व हीरालाल 1916, एंथोवेन 1922)।',
        te: 'సుమారు సర్వే కాలావధులు: కల్నల్ కాలిన్ మెకంజీ తాళపత్ర సర్వే (సుమారు 1799–1815); ఇంపీరియల్ గెజిటీర్ & జనాభా లెక్కల సంపుటాలు (1871–1931: హంటర్ 1872, రిస్లే 1891, థర్స్టన్ 1909, రస్సెల్ & హీరాలాల్ 1916, ఎంథోవెన్ 1922).',
        kn: 'ಅಂದಾಜು ಸಮೀಕ್ಷಾ ಕಾಲಾವಧಿಗಳು: ಕರ್ನಲ್ ಕಾಲಿನ್ ಮೆಕೆಂಜಿಯ ಹಸ್ತಪ್ರತಿ ಸಮೀಕ್ಷೆ (ಸು. 1799–1815); ಇಂಪೀರಿಯಲ್ ಗೆಜೆಟಿಯರ್ ಮತ್ತು ಜನಗಣತಿ ಸಂಪುಟಗಳು (1871–1931: ಹಂಟರ್ 1872, ರಿಸ್ಲೆ 1891, ಥರ್ಸ್ಟನ್ 1909, ಎಂಥೋವೆನ್ 1922).',
        ta: 'தோராயமான ஆய்வுக் காலங்கள்: கர்னல் காலின் மெக்கன்சியின் சுவடி ஆய்வு (சுமார் 1799–1815); இம்பீரியல் அரசிதழ் & மக்கள் தொகைக் கணக்கெடுப்புத் தொகுதிகள் (1871–1931: ஹண்டர் 1872, ரிஸ்லி 1891, தர்ஸ்டன் 1909, எந்தோவன் 1922).',
        mr: 'अंदाजे सर्वेक्षण कालखंड: कर्नल कॉलिन मॅकेन्झीचे हस्तलिखित सर्वेक्षण (सु. १७९९–१८१५); इम्पीरियल गॅझेटियर व जनगणना खंड (१८७१–१९३१: हंटर १८७२, रिस्ले १८९१, थर्स्टन १९०९, एंथोवेन १९२२).',
        or: 'ଆନୁମାନିକ ସର୍ବେକ୍ଷଣ କାଳ: କର୍ଣ୍ଣେଲ କଲିନ ମ୍ୟାକେଞ୍ଜିଙ୍କ ପୋଥି ସର୍ବେକ୍ଷଣ (୧୭୯୯–୧୮୧୫); ଇମ୍ପିରିଆଲ ଗେଜେଟିୟର୍ ଓ ଜନଗଣନା ଖଣ୍ଡ (୧୮୭୧–୧୯୩୧: ହଣ୍ଟର ୧୮୭୨, ରିସଲେ ୧୮୯୧, ଥର୍ଷ୍ଟନ ୧୯୦୯, ଏନ୍ଥୋଭେନ ୧୯୨୨)।',
        bn: 'আনুমানিক জরিপ কাল: কর্নেল কলিন ম্যাকেঞ্জির পাণ্ডুলিপি জরিপ (১৭৯৯–১৮১৫); ইম্পিরিয়াল গেজেটিয়ার ও আদমশুমারি খণ্ড (১৮৭১–১৯৩১: হান্টার ১৮৭২, রিসলে ১৮৯১, থার্স্টন ১৯০৯, এনথোভেন ১৯২২)।'
      },
      disputedInterpretations: {
        en: 'Disputed Historical Interpretations: Colonial administrators occasionally conflated distinct regional occupational strata in census schedules; modern historical and epigraphic scholarship distinguishes between sovereign/military Odiyaraju-Gajapathi lineages, fortress commanders, and regional engineering guilds across the 76 documented community names.',
        hi: 'विवादित ऐतिहासिक व्याख्याएँ: औपनिवेशिक जनगणना अधिकारियों ने कभी-कभी विभिन्न क्षेत्रीय वर्गों को एक ही श्रेणी में रखा; आधुनिक ऐतिहासिक एवं शिलालेखीय शोध 76 प्रलेखित समुदाय नामों के अंतर्गत राजकीय/सैन्य ओडियाराजू-गजपति वंशों, दुर्ग सेनापतियों और क्षेत्रीय अभियांत्रिकी श्रेणियों के ऐतिहासिक संदर्भों को स्पष्ट करता है।',
        te: 'వివాదాస్పద చారిత్రక వ్యాఖ్యానాలు: వలస పాలనాధికారులు జనాభా లెక్కలలో వివిధ ప్రాంతీయ విభాగాలను కలిపివేసినప్పటికీ, ఆధునిక శాసన పరిశోధన 76 కమ్యూనిటీ పేర్లలోని రాజవంశ/సైనిక ఒడియరాజు-గజపతి శాఖలను మరియు దుర్గ-జలాశయ నిర్మాణ శ్రేణులను స్పష్టంగా వేరుచేసి చూపుతుంది.',
        kn: 'ವಿವಾದಿತ ಐತಿಹಾಸಿಕ ವ್ಯಾಖ್ಯಾನಗಳು: ವಸಾಹತುಶಾಹಿ ಜನಗಣತಿ ಅಧಿಕಾರಿಗಳು ವಿವಿಧ ಪ್ರಾದೇಶಿಕ ವರ್ಗಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸಿದ್ದರೂ, ಆಧುನಿಕ ಶಾಸನ ಸಂಶೋಧನೆಯು 76 ಸಮುದಾಯ ಹೆಸರುಗಳಲ್ಲಿನ ರಾಜಮನೆತನ/ಸೇನಾ ಒಡಿಯರಾಜು-ಗಜಪತಿ ವಂಶಗಳನ್ನು ಮತ್ತು ಕೋಟೆ ನಿರ್ಮಾಣ ಶ್ರೇಣಿಗಳನ್ನು ಸ್ಪಷ್ಟಪಡಿಸುತ್ತದೆ.',
        ta: 'விவாதத்திற்குரிய வரலாற்று விளக்கங்கள்: காலனிய மக்கள் தொகைக் கணக்கெடுப்புகள் பல்வேறு பிரிவுகளை இணைத்தபோதிலும், நவீன கல்வெட்டு ஆய்வு 76 சமூகப் பெயர்களில் உள்ள அரச/இராணுவ ஒடியராஜு-கஜபதி மரபுகளையும் கோட்டைப் பொறியாளர் பிரிவுகளையும் தெளிவுபடுத்துகிறது.',
        mr: 'विवादित ऐतिहासिक अर्थ: वसाहतकालीन जनगणना अधिकाऱ्यांनी विविध प्रादेशिक घटकांचे वर्गीकरण एकत्र केले असले, तरी आधुनिक शिलालेखीय संशोधन ७६ समुदाय नावांमधील राजकीय/लष्करी ओडियाराजू-गजपती घराणी आणि दुर्ग स्थापत्य श्रेणींचा ऐतिहासिक संदर्भ स्पष्ट करते.',
        or: 'ବିବାଦୀୟ ଐତିହାସିକ ବ୍ୟାଖ୍ୟା: ଉପନିବେଶ କାଳୀନ ଜନଗଣନାରେ ବିଭିନ୍ନ ଆଞ୍ଚଳିକ ବର୍ଗକୁ ଏକତ୍ର କରାଯାଇଥିଲେ ହେଁ ଆଧୁନିକ ଶିଳାଲେଖ ଗବେଷଣା ୭୬ଟି ସମାଜ ନାମ ମଧ୍ୟରେ ରାଜକୀୟ/ସାମରିକ ଓଡ଼ିଆରାଜୁ-ଗଜପତି ବଂଶ ଓ ଦୁର୍ଗ ନିର୍ମାତା ଶ୍ରେଣୀକୁ ସ୍ପଷ୍ଟ କରେ।',
        bn: 'বিতর্কিত ঐতিহাসিক ব্যাখ্যা: ঔপনিবেশিক আদমশুমারিতে বিভিন্ন আঞ্চলিক বর্গকে একত্রিত করা হলেও আধুনিক শিলালিপি গবেষণা ৭৬টি সম্প্রদায় নামের মধ্যে রাজকীয়/সামরিক ওড়িয়ারাজু-গজপতি বংশ ও দুর্গ নির্মাতা শ্রেণিকে স্পষ্টভাবে চিহ্নিত করে।'
      },
      traditionalClaims: {
        en: 'Traditional Chronological Claims: Living oral histories recorded across Odisha, Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Maharashtra, and Northern/Western India preserve memories of ancestral migration from Odra-Desha and Kataka alongside royal birudas (Raju, Raya, Baidu, Routhu, Behera, Nayak).',
        hi: 'पारंपरिक कालानुक्रमिक दावे: ओडिशा, आंध्र प्रदेश, तेलंगाना, कर्नाटक, तमिलनाडु, महाराष्ट्र और उत्तर/पश्चिम भारत में संरक्षित मौखिक परंपराएँ ओड्र-देश और कटक से पूर्वजों के प्रवास तथा राजकीय उपाधियों (राजू, राय, बैदु, राउत, बेहेरा, नायक) की स्मृतियाँ संजोए हुए हैं।',
        te: 'సాంప్రదాయ కాలక్రమ వాదనలు: ఒడిశా, ఆంధ్రప్రదేశ్, తెలంగాణ, కర్ణాటక, తమిళనాడు, మహారాష్ట్ర మరియు ఉత్తర/పశ్చిమ భారతదేశంలో సజీవంగా ఉన్న మౌఖిక చరిత్రలు ఓడ్ర-దేశం మరియు కటక్ నుండి పూర్వీకుల వలసలను, రాజ బిరుదులను (రాజు, రాయ, బైదు, రౌతు, బెహెరా, నాయక్) భద్రపరిచాయి.',
        kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕಾಲಾನುಕ್ರಮ ಪ್ರತಿಪಾದನೆಗಳು: ಒಡಿಶಾ, ಆಂಧ್ರಪ್ರದೇಶ, ತೆಲಂಗಾಣ, ಕರ್ನಾಟಕ, ತಮಿಳುನಾಡು ಮತ್ತು ಮಹಾರಾಷ್ಟ್ರದಲ್ಲಿರುವ ಮೌಖಿಕ ಇತಿಹಾಸಗಳು ಓಡ್ರ-ದೇಶ ಮತ್ತು ಕಟಕ್‌ನಿಂದ ಪೂರ್ವಜರ ವಲಸೆ ಹಾಗೂ ರಾಜ ಬಿರುದುಗಳ (ರಾಜು, ರಾಯ, ಬೈದು, ರಾವುತ್, ಬೆಹೆರಾ, ನಾಯಕ್) ಸ್ಮೃತಿಗಳನ್ನು ಉಳಿಸಿಕೊಂಡಿವೆ.',
        ta: 'மரபுவழி காலக்கணக்கு உரிமைகோரல்கள்: ஒடிசா, ஆந்திரம், தெலுங்கானா, கர்நாடகம், தமிழ்நாடு மற்றும் மகாராஷ்டிராவில் வாழும் வாய்மொழி வரலாறுகள் ஒட்டர-தேசம் மற்றும் கட்டக்கிலிருந்து நிகழ்ந்த இடப்பெயர்வுகளையும் அரசப் பட்டங்களையும் (ராஜு, ராய, பைது, ரௌத்து, பெஹெரா, நாயக்) பாதுகாத்துள்ளன.',
        mr: 'पारंपरिक कालानुक्रमिक दावे: ओडिशा, आंध्र प्रदेश, तेलंगणा, कर्नाटक, तामिळनाडू, महाराष्ट्र आणि उत्तर/पश्चिम भारतातील मौखिक इतिहास ओड्र-देश व कटक येथून झालेल्या स्थलांतराच्या आणि राजकीय पदव्यांच्या (राजू, राय, बैदू, राऊत, बेहेरा, नायक) आठवणी जतन करतात.',
        or: 'ପାରମ୍ପରିକ କାଳାନୁକ୍ରମିକ ଦାବି: ଓଡ଼ିଶା, ଆନ୍ଧ୍ର, ତେଲେଙ୍ଗାନା, କର୍ଣ୍ଣାଟକ, ତାମିଲନାଡୁ ଓ ମହାରାଷ୍ଟ୍ରରେ ପ୍ରଚଳିତ ମୌଖିକ ଇତିହାସ ଓଡ଼୍ର-ଦେଶ ଓ କଟକରୁ ପୂର୍ବପୁରୁଷଙ୍କ ପ୍ରବାସ ଏବଂ ରାଜକୀୟ ଉପାଧି (ରାଜୁ, ରାୟ, ବୈଦୁ, ରାଉତ, ବେହେରା, ନାୟକ) ର ସ୍ମୃତି ବହନ କରେ।',
        bn: 'ঐতিহ্যগত কালানুক্রমিক দাবি: উড়িষ্যা, অন্ধ্রপ্রদেশ, তেলেঙ্গানা, কর্ণাটক, তামিলনাড়ু ও মহারাষ্ট্রে প্রচলিত মৌখিক ইতিহাস ওড্র-দেশ ও কটক থেকে পূর্বপুরুষদের প্রবাস এবং রাজকীয় উপাধির (রাজু, রায়, বৈদু, রাউত, বেহেরা, নায়ক) স্মৃতি বহন করে।'
      }
    },
    parallelTracks: [
      {
        corridorId: 'track_s8_odisha_khurda_parlakhemundi',
        corridorLabel: {
          en: 'Odisha–Khurda–Parlakhemundi Corridor',
          hi: 'ओडिशा–खुर्दा–परलाखेमुंडी गलियारा',
          te: 'ఒడిశా–ఖుర్దా–పర్లాకిమిడి ప్రాంతం',
          kn: 'ಒಡಿಶಾ–ಖುರ್ದಾ–ಪರ್ಲಾಖೆಮುಂಡಿ ವಲಯ',
          ta: 'ஒடிசா–குர்தா–பர்லாகேமுண்டி மண்டலம்',
          mr: 'ओडिशा–खुर्दा–परलाखेमुंडी पट्टा',
          or: 'ଓଡ଼ିଶା–ଖୋର୍ଦ୍ଧା–ପାରଳାଖେମୁଣ୍ଡି ଅଞ୍ଚଳ',
          bn: 'উড়িষ্যা–খোর্ধা–পারলাখেমুন্ডি অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Khurda Anti-Colonial Resistance (1804 Jayee Rajguru Uprising; 1817 Paika Rebellion under Baxi Jagabandhu) → Puri Temple Superintendency under the Gajapathi Maharajas of Puri & Parlakhemundi Samasthanam (Krushna Chandra Gajapathi, Architect of Modern Odisha in 1936)',
          hi: 'खुर्दा का उपनिवेश-विरोधी संग्राम (1804 जयी राजगुरु विद्रोह; 1817 बख्शी जगबंधु के अधीन पाइक विद्रोह) → पुरी के गजपति महाराजाओं की जगन्नाथ मंदिर सेवा एवं परलाखेमुंडी संस्थान (आधुनिक ओडिशा के निर्माता महाराजा कृष्णचंद्र गजपति, 1936)',
          te: 'ఖుర్దా వలస వ్యతిరేక పోరాటం (1804 జయీ రాజగురు తిరుగుబాటు; 1817 బక్షి జగబంధు పైకా తిరుగుబాటు) → పూరీ గజపతి మహారాజుల ఆలయ పర్యవేక్షణ & పర్లాకిమిడి సంస్థానం (1936 ఆధునిక ఒడిశా నిర్మాత మహారాజా కృష్ణచంద్ర గజపతి)',
          kn: 'ಖುರ್ದಾ ವಸಾಹತುಶಾಹಿ ವಿರೋಧಿ ಹೋರಾಟ (1804 ಜಯೀ ರಾಜಗುರು ಬಂಡಾಯ; 1817 ಬಕ್ಷಿ ಜಗಬಂಧು ಪೈಕಾ ಬಂಡಾಯ) → ಪುರಿ ಗಜಪತಿ ಮಹಾರಾಜರು ಮತ್ತು ಪರ್ಲಾಖೆಮುಂಡಿ ಸಂಸ್ಥಾನ (1936 ಆಧುನಿಕ ಒಡಿಶಾದ ನಿರ್ಮಾತೃ ಮಹಾರಾಜ ಕೃಷ್ಣಚಂದ್ರ ಗಜಪತಿ)',
          ta: 'குர்தா காலனிய எதிர்ப்புப் போராட்டம் (1804 ஜயீ ராஜ்குரு எழுச்சி; 1817 பக்ஷி ஜகபந்து பைக்கா புரட்சி) → பூரி கஜபதி மகாராஜாக்கள் & பர்லாகேமுண்டி சமஸ்தானம் (1936 நவீன ஒடிசாவின் சிற்பி மகாராஜா கிருஷ்ண சந்திர கஜபதி)',
          mr: 'खुर्दाचा वसाहतविरोधी लढा (१८०४ जयी राजगुरू उठाव; १८१७ बक्षी जगबंधूंचा पाइक उठाव) → पुरीचे गजपती महाराजा व परलाखेमुंडी संस्थान (१९३६ आधुनिक ओडिशाचे शिल्पकार महाराजा कृष्णचंद्र गजपती)',
          or: 'ଖୋର୍ଦ୍ଧା ଉପନିବେଶ-ବିରୋଧୀ ସଂଗ୍ରାମ (୧୮୦୪ ଜୟୀ ରାଜଗୁରୁ ବିଦ୍ରୋହ; ୧୮୧୭ ବକ୍ସି ଜଗବନ୍ଧୁଙ୍କ ପାଇକ ବିଦ୍ରୋହ) → ପୁରୀ ଗଜପତି ମହାରାଜା ଓ ପାରଳାଖେମୁଣ୍ଡି ସଂସ୍ଥାନ (୧୯୩୬ ସ୍ୱତନ୍ତ୍ର ଓଡ଼ିଶା ପ୍ରଦେଶର ନିର୍ମାତା ମହାରାଜା କୃଷ୍ଣଚନ୍ଦ୍ର ଗଜପତି)',
          bn: 'খোর্ধা উপনিবেশ-বিরোধী সংগ্রাম (১৮০৪ জয়ী রাজগুরু বিদ্রোহ; ১৮১৭ বক্সী জগবন্ধুর পাইক বিদ্রোহ) → পুরী গজপতি মহারাজা ও পারলাখেমুন্ডি সংস্থান (১৯৩৬ আধুনিক উড়িষ্যার রূপকার মহারাজা কৃষ্ণচন্দ্র গজপতি)'
        },
        dateSpan: '1803 – Present',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Ewer Commission Report (1818); Bengal & Bihar-Orissa District Gazetteers (Puri & Ganjam)'
      },
      {
        corridorId: 'track_s8_andhra_vizianagaram_kolleru',
        corridorLabel: {
          en: 'Andhra–Vizianagaram–Kolleru & Rayalaseema Corridor',
          hi: 'आंध्र–विजयनगरम–कोल्लेरू एवं रायलसीमा गलियारा',
          te: 'ఆంధ్ర–విజయనగరం–కొల్లేరు & రాయలసీమ ప్రాంతం',
          kn: 'ಆಂಧ್ರ–ವಿಜಯನಗರಂ–ಕೊಲ್ಲೇರು ಮತ್ತು ರಾಯಲಸೀಮೆ ವಲಯ',
          ta: 'ஆந்திரம்–விஜயநகரம்–கொல்லேறு & இராயலசீமை மண்டலம்',
          mr: 'आंध्र–विजयनगरम–कोल्लेरू व रायलसीमा पट्टा',
          or: 'ଆନ୍ଧ୍ର–ବିଜୟନଗରମ–କୋଲ୍ଲେରୁ ଓ ରାୟଲସୀମା ଅଞ୍ଚଳ',
          bn: 'অন্ধ্র–বিজয়নগরম–কোল্লেরু ও রায়লসীমা অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Vizianagaram, Bobbili & Kalinga-Andhra Zamindaris (1757–1949 CE) alongside Odiyaraju, OddeRajulu, VaddeRajulu, OddaRaya, VoddaRaya & OddeBaidu heritage communities across Coastal Andhra, Kolletikota, Telangana, and Rayalaseema',
          hi: 'विजयनगरम, बोब्बिली एवं कलिंग-आंध्र जमींदारियाँ (1757–1949 ई.) तथा तटीय आंध्र, कोल्लेटिकोटा, तेलंगाना और रायलसीमा में ओडियाराजू, ओड्डेराजुलु, वड्डेराजुलु, ओड्डाराय, वोड्डाराय एवं ओड्डेबैदु विरासत समुदाय',
          te: 'విజయనగరం, బొబ్బిలి & కళింగాంధ్ర సంస్థానాలు (1757–1949) మరియు తీర ఆంధ్ర, కొల్లేటికోట, తెలంగాణ, రాయలసీమలలో ఒడియరాజు, ఒడ్డెరాజులు, వడ్డెరాజులు, ఒడ్డరాయ, వొడ్డరాయ & ఒడ్డెబైదు వారసత్వ సమాజాలు',
          kn: 'ವಿಜಯನಗರಂ ಮತ್ತು ಬೊಬ್ಬಿಲಿ ಸಂಸ್ಥಾನಗಳು (1757–1949) ಹಾಗೂ ಕರಾವಳಿ ಆಂಧ್ರ, ಕೊಲ್ಲೇಟಿಕೋಟ, ತೆಲಂಗಾಣ ಮತ್ತು ರಾಯಲಸೀಮೆಯಲ್ಲಿ ಒಡಿಯರಾಜು, ಒಡ್ಡೇರಾಜುಲು, ವಡ್ಡೇರಾಜುಲು, ಒಡ್ಡರಾಯ, ವೊಡ್ಡರಾಯ ಮತ್ತು ಒಡ್ಡೆಬೈದು ಸಮುದಾಯಗಳು',
          ta: 'விஜயநகரம் & பொப்பிலி சமஸ்தானங்கள் (1757–1949) மற்றும் ஆந்திரக் கடற்கரை, கொல்லேட்டிகோட்டா, தெலுங்கானா, இராயலசீமையில் ஒடியராஜு, ஒட்டெராஜுலு, வட்டெராஜுலு, ஒட்டராய, வொட்டராய & ஒட்டெபைது சமூகங்கள்',
          mr: 'विजयनगरम व बोब्बिली संस्थाने (१७५७–१९४९) तसेच किनारी आंध्र, कोल्लेटिकोटा, तेलंगणा आणि रायलसीमा येथील ओडियाराजू, ओड्डेराजुलू, वड्डेराजुलू, ओड्डाराय, वोड्डाराय व ओड्डेबैदू समुदाय',
          or: 'ବିଜୟନଗରମ ଓ ବୋବ୍ବିଲି ସଂସ୍ଥାନ (୧୭୫୭–୧୯୪୯) ଏବଂ ତଟବର୍ତ୍ତୀ ଆନ୍ଧ୍ର, କୋଲ୍ଲେଟିକୋଟା, ତେଲେଙ୍ଗାନା ଓ ରାୟଲସୀମାରେ ଓଡ଼ିଆରାଜୁ, ଓଡ଼େରାଜୁଲୁ, ବଡ଼େରାଜୁଲୁ, ଓଡ଼ରାୟ, ଭୋଡ଼ରାୟ ଓ ଓଡ଼େବୈଦୁ ସମାଜ',
          bn: 'বিজয়নগরম ও বব্বিলি সংস্থান (১৭৫৭–১৯৪৯) এবং উপকূলীয় অন্ধ্র, কোল্লেটিকোটা, তেলেঙ্গানা ও রায়লসীমায় ওড়িয়ারাজু, ওড্ডেরাজুলু, বড্ডেরাজুলু, ওড্ডরায়, ভোড্ডরায় ও ওড্ডেবৈদু সম্প্রদায়'
        },
        dateSpan: '1757 – Present',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Madras District Manuals (Vizagapatam, Godavari, Kistna, Nellore, Cuddapah); Thurston (1909, Vol. V)'
      },
      {
        corridorId: 'track_s8_pan_indian_archive',
        corridorLabel: {
          en: 'Pan-Indian Ethnographic & Digital Heritage Corridor',
          hi: 'अखिल भारतीय नृवंशविज्ञान एवं डिजिटल विरासत गलियारा',
          te: 'పాన్-ఇండియన్ ఎథ్నోగ్రాఫిక్ & డిజిటల్ వారసత్వ ప్రాంతం',
          kn: 'ಪ್ಯಾನ್-ಇಂಡಿಯನ್ ಎಥ್ನೋಗ್ರಾಫಿಕ್ ಮತ್ತು ಡಿಜಿಟಲ್ ಪರಂಪರೆ ವಲಯ',
          ta: 'இந்திய அளவிலான இனவரைவியல் & டிஜிட்டல் பாரம்பரிய மண்டலம்',
          mr: 'अखिल भारतीय नृवंशशास्त्र आणि डिजिटल वारसा पट्टा',
          or: 'ସର୍ବଭାରତୀୟ ନୃବଂଶ ଓ ଡିଜିଟାଲ୍ ଐତିହ୍ୟ ଅଞ୍ଚଳ',
          bn: 'সর্বভারতীয় নৃতাত্ত্বিক ও ডিজিটাল ঐতিহ্য অঞ্চল'
        },
        dynastiesAndPolities: {
          en: 'Documented across Karnataka, Tamil Nadu, Maharashtra, Gujarat, Rajasthan, Delhi, Haryana & Punjab (Od, Oad-Rajput, Waddar, Oddar, Beldar,Sagarvanshi) → Contemporary Suryavamsha Odiyaraju Kshatriya Historical Heritage Portal uniting all 76 Community Names across 8 languages',
          hi: 'कर्नाटक, तमिलनाडु, महाराष्ट्र, गुजरात, राजस्थान, दिल्ली, हरियाणा एवं पंजाब में प्रलेखित (ओड, ओड-राजपूत, वड्डर, ओड्डर, बेलदार) → 8 भाषाओं में 76 समुदाय नामों को जोड़ने वाला समकालीन सूर्यवंश ओडियाराजू क्षत्रिय ऐतिहासिक विरासत पोर्टल',
          te: 'కర్ణాటక, తమిళనాడు, మహారాష్ట్ర, గుజరాత్, రాజస్థాన్, ఢిల్లీ, హర్యానా & పంజాబ్‌లలో నమోదైన (ఓడ్, ఓడ్-రాజపుత్, వడ్డర్, ఒడ్డర్, బెల్దార్) → 8 భాషలలో 76 కమ్యూనిటీ పేర్లను ఏకం చేసే సూర్యవంశ ఒడియరాజు క్షత్రియ చారిత్రక వారసత్వ పోర్టల్',
          kn: 'ಕರ್ನಾಟಕ, ತಮಿಳುನಾಡು, ಮಹಾರಾಷ್ಟ್ರ, ಗುಜರಾತ್, ರಾಜಸ್ಥಾನ, ದೆಹಲಿ, ಹರಿಯಾಣ ಮತ್ತು ಪಂಜಾಬ್‌ಗಳಲ್ಲಿ ದಾಖಲಾದ (ಓಡ್, ಓಡ್-ರಜಪೂತ್, ವಡ್ಡರ್, ಒಡ್ಡರ್, ಬೆಲ್ದಾರ್) → 8 ಭಾಷೆಗಳಲ್ಲಿ 76 ಸಮುದಾಯ ಹೆಸರುಗಳನ್ನು ಬೆಸೆಯುವ ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಐತಿಹಾಸಿಕ ಪರಂಪರೆ ಪೋರ್ಟಲ್',
          ta: 'கர்நாடகம், தமிழ்நாடு, மகாராஷ்டிரம், குஜராத், இராஜஸ்தான், டெல்லி, ஹரியானா & பஞ்சாபில் ஆவணப்படுத்தப்பட்ட (ஓட், ஓட்-ராஜ்புத், வட்டர், ஒட்டர், பெல்தார்) → 8 மொழிகளில் 76 சமூகப் பெயர்களை இணைக்கும் சூரியவம்ச ஒடியராஜு க்ஷத்ரிய வரலாற்றுப் பாரம்பரிய தளம்',
          mr: 'कर्नाटक, तामिळनाडू, महाराष्ट्र, गुजरात, राजस्थान, दिल्ली, हरियाणा व पंजाबमध्ये नोंदवलेले (ओड, ओड-राजपूत, वड्डर, ओड्डर, बेलदार) → ८ भाषांमध्ये ७६ समुदाय नावांना जोडणारे सूर्यवंश ओडियाराजू क्षत्रिय ऐतिहासिक वारसा पोर्टल',
          or: 'କର୍ଣ୍ଣାଟକ, ତାମିଲନାଡୁ, ମହାରାଷ୍ଟ୍ର, ଗୁଜରାଟ, ରାଜସ୍ଥାନ, ଦିଲ୍ଲୀ, ହରିୟାଣା ଓ ପଞ୍ଜାବରେ ଦଲିଲଭୁକ୍ତ (ଓଡ଼, ଓଡ଼-ରାଜପୁତ, ବଡ଼ର, ଓଡ଼ର, ବେଲଦାର) → ୮ଟି ଭାଷାରେ ୭୬ଟି ସମାଜ ନାମକୁ ଯୋଡ଼ୁଥିବା ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଐତିହାସିକ ଐତିହ୍ୟ ପୋର୍ଟାଲ',
          bn: 'কর্ণাটক, তামিলনাড়ু, মহারাষ্ট্র, গুজরাট, রাজস্থান, দিল্লি, হরিয়ানা ও পাঞ্জাবে নথিবদ্ধ (ওড়, ওড়-রাজপুত, বড্ডর, ওড্ডর, বেলদার) → ৮টি ভাষায় ৭৬টি সম্প্রদায় নামকে সংযুক্তকারী সূর্যবংশ ওড়িয়ারাজু ক্ষত্রিয় ঐতিহাসিক ঐতিহ্য পোর্টাল'
        },
        dateSpan: '1871 – Present',
        dateType: 'Established Inscriptional',
        epigraphicAnchor: 'Hunter (1872); Risley (1891); Thurston (1909); Russell & Hiralal (1916); Enthoven (1922)'
      }
    ],
    keyMonumentsAndInscriptions: ['Ewer Commission Report on Paika Rebellion (1818)', 'Castes and Tribes of Southern India (Thurston 1909)', 'Tribes and Castes of Bombay (Enthoven 1922)'],
    linkedArticleIds: ['art_oad_rajputh_od_history', 'art_genealogy_methodology'],
    linkedEventIds: []
  }
];
