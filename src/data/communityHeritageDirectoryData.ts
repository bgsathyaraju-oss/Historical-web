import type { LanguageCode } from '../types/index.ts';
import type { MultilingualText, EpistemicClassification } from './historyContent.ts';

const ARCHIVE_IMG = (file: string) => `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/${file}`;

export interface VisualAssetMetadata {
  id: string;
  imageUrl: string;
  visualType: 'Archaeological Photograph' | 'Historical Map (Reconstruction)' | 'Epigraphic Plate' | 'Educational Illustration' | 'Architectural Monument';
  historicalPeriod: string;
  title: Record<LanguageCode, string>;
  caption: Record<LanguageCode, string>;
  altText: Record<LanguageCode, string>;
  sourceAttribution: string;
  licenseInfo: string;
  mapDisclaimer?: Record<LanguageCode, string>;
}

export interface RelatedLinkItem {
  id: string;
  targetType: 'internal_article' | 'internal_route' | 'external_source';
  targetIdOrPath: string;
  label: Record<LanguageCode, string>;
  categoryBadge: Record<LanguageCode, string>;
}

export interface KeywordTagItem {
  key: string;
  label: Record<LanguageCode, string>;
}

export interface SourceReferenceItem {
  citation: string;
  type: 'Epigraphic Record' | 'Colonial Gazetteer / Census' | 'Academic Monograph' | 'Traditional Chronicle / Vamsavali';
  url?: string;
  verificationNote?: string;
}

/**
 * Complete 23-Section Community Article Structure (A through W)
 */
export interface CommunityHeritageArticle {
  id: string;
  slug: string;
  order: number;
  canonicalName: string;
  localizedTitle: Record<LanguageCode, string>;
  categoryBadge: Record<LanguageCode, string>;
  designationGroup:
    | 'Primary 18 Community Categories'
    | 'Dynastic and Lineage Designations'
    | 'Regional Community Designations'
    | 'Historical, Martial, and Traditional Titles';
  epistemicClassification: EpistemicClassification;
  epistemicSummaryBadge: Record<LanguageCode, string>;
  primaryRegions: string[];
  prominentStates: string[];
  associatedProfessionIds: string[];
  translationReviewNote?: Record<LanguageCode, string>;

  // A. Community Name and Alternative Names
  sectionA_AlternativeNames: string[];
  sectionA_NativeScripts: Record<string, string>;
  sectionA_LinguisticNote: Record<LanguageCode, string>;

  // B. Introduction and Overview
  sectionB_Introduction: Record<LanguageCode, string>;

  // C. Historical Origins and Background
  sectionC_OriginsAndBackground: Record<LanguageCode, string>;

  // D. Historical Development and Timeline
  sectionD_Timeline: Array<{
    era: string;
    event: Record<LanguageCode, string>;
    evidenceType: 'Verified Epigraphy' | 'Historical Chronicle' | 'Gazetteer Record' | 'Oral / Lineage Tradition';
  }>;

  // E. Regional Distribution and Historical Settlements
  sectionE_RegionalDistribution: Record<LanguageCode, string>;

  // F. Cultural Heritage, Traditions, and Customs
  sectionF_CulturalHeritage: Record<LanguageCode, string>;

  // G. Traditional and Contemporary Professions
  sectionG_Professions: Record<LanguageCode, string>;

  // H. Historical Warriors and Military Traditions
  sectionH_WarriorTraditions: Record<LanguageCode, string>;

  // I. Agricultural Heritage
  sectionI_AgriculturalHeritage: Record<LanguageCode, string>;

  // J. Construction and Engineering Contributions
  sectionJ_ConstructionEngineering: Record<LanguageCode, string>;

  // K. Sculpture, Crafts, and Traditional Art
  sectionK_SculptureAndCrafts: Record<LanguageCode, string>;

  // L. Architecture and Building Traditions
  sectionL_ArchitectureTraditions: Record<LanguageCode, string>;

  // M. Royal and Dynastic Traditions, Where Documented
  sectionM_RoyalDynasticTraditions: Record<LanguageCode, string>;

  // N. Important Historical Personalities, Where Verified
  sectionN_HistoricalPersonalities: Record<LanguageCode, string>;

  // O. Historical Inscriptions, Records, and Documentary Evidence
  sectionO_InscriptionsAndRecords: Record<LanguageCode, string>;

  // P. Contributions to Society
  sectionP_ContributionsToSociety: Record<LanguageCode, string>;

  // Q. Related Communities and Historical Connections
  sectionQ_RelatedCommunities: Record<LanguageCode, string>;

  // R. Historical Interpretations and Research Gaps
  sectionR_InterpretationsAndGaps: Record<LanguageCode, string>;

  // S. References and Sources
  sectionS_References: SourceReferenceItem[];

  // T. Related Articles and Internal Links
  sectionT_RelatedArticles: RelatedLinkItem[];

  // U. Related Keywords with Functional Links
  sectionU_RelatedKeywords: string[];

  // V. Relevant Images, Maps, and Captions
  sectionV_VisualAssets: VisualAssetMetadata[];

  // W. Detailed Conclusion and Historical Summary
  sectionW_Conclusion: Record<LanguageCode, string>;
}

/**
 * 9-Category Professional Heritage Classification Structure
 */
export interface ProfessionalHeritageCategoryArticle {
  id: string;
  slug: string;
  categoryNumber: number;
  codeLabel: string;
  title: Record<LanguageCode, string>;
  shortSummary: Record<LanguageCode, string>;
  includedSubClassifications: Array<{
    id: string;
    name: Record<LanguageCode, string>;
    description: Record<LanguageCode, string>;
  }>;
  definitionAndExplanation: Record<LanguageCode, string>;
  historicalBackground: Record<LanguageCode, string>;
  toolsMaterialsAndTechniques: Record<LanguageCode, string>;
  culturalAndRegionalSignificance: Record<LanguageCode, string>;
  documentedHistoricalExamples: Record<LanguageCode, string>;
  contributionsToSociety: Record<LanguageCode, string>;
  communitySpecificConnectionsAndDistinctions: Record<LanguageCode, string>;
  epistemicAndMethodologicalNote: Record<LanguageCode, string>;
  visualAssets: VisualAssetMetadata[];
  relatedArticles: RelatedLinkItem[];
  relatedKeywords: string[];
  references: SourceReferenceItem[];
}

/**
 * Helper to create 8-language text records cleanly
 */
export const m8 = (
  en: string,
  hi: string,
  te: string,
  kn: string,
  ta: string,
  mr: string,
  or: string,
  bn: string
): Record<LanguageCode, string> => ({
  en,
  hi,
  te,
  kn,
  ta,
  mr,
  or,
  bn
});

/**
 * Complete 8-Language Section Headings for A–W Community Articles & Professional Heritage
 */
export const ARTICLE_SECTION_HEADINGS: Record<
  string,
  Record<LanguageCode, string>
> = {
  secA: m8(
    'A. Community Name and Alternative Names',
    'A. समुदाय का नाम एवं वैकल्पिक नाम',
    'A. సమాజం పేరు మరియు ప్రత్యామ్నాయ నామాలు',
    'A. ಸಮುದಾಯದ ಹೆಸರು ಮತ್ತು ಪರ್ಯಾಯ ನಾಮಗಳು',
    'A. சமூகத்தின் பெயர் மற்றும் மாற்றுப் பெயர்கள்',
    'A. समाजाचे नाव आणि पर्यायी नावे',
    'A. ସମୁଦାୟର ନାମ ଓ ବିକଳ୍ପ ନାମ',
    'A. সম্প্রদায়ের নাম ও বিকল্প নামসমূহ'
  ),
  secB: m8(
    'B. Introduction and Overview',
    'B. परिचय एवं समग्र अवलोकन',
    'B. పరిచయం మరియు సమగ్ర అవలోకనం',
    'B. ಪರಿಚಯ ಮತ್ತು ಸಮಗ್ರ ಅವಲೋಕನ',
    'B. அறிமுகம் மற்றும் முழுமையான பார்வை',
    'B. परिचय आणि समग्र आढावा',
    'B. ପରିଚୟ ଓ ସମଗ୍ର ଅବଲୋକନ',
    'B. ভূমিকা ও সামগ্রিক পর্যালোচনা'
  ),
  secC: m8(
    'C. Historical Origins and Background',
    'C. ऐतिहासिक उत्पत्ति एवं पृष्ठभूमि',
    'C. చారిత్రక మూలాలు మరియు నేపథ్యం',
    'C. ಐತಿಹಾಸಿಕ ಮೂಲಗಳು ಮತ್ತು ಹಿನ್ನೆಲೆ',
    'C. வரலாற்றுத் தோற்றம் மற்றும் பின்னணி',
    'C. ऐतिहासिक उगम आणि पार्श्वभूमी',
    'C. ଐତିହାସିକ ଉତ୍ପତ୍ତି ଓ ପୃଷ୍ଠଭୂମି',
    'C. ঐতিহাসিক উৎপত্তি ও পটভূমি'
  ),
  secD: m8(
    'D. Historical Development and Timeline',
    'D. ऐतिहासिक विकास एवं कालक्रम',
    'D. చారిత్రక పరిణామ క్రమం మరియు కాలరేఖ',
    'D. ಐತಿಹಾಸಿಕ ಬೆಳವಣಿಗೆ ಮತ್ತು ಕಾಲಾನುಕ್ರಮ',
    'D. வரலாற்று வளர்ச்சி மற்றும் காலவரிசை',
    'D. ऐतिहासिक विकास आणि कालक्रम',
    'D. ଐତିହାସିକ ବିକାଶ ଓ କାଳକ୍ରମ',
    'D. ঐতিহাসিক বিকাশ ও কালানুক্রম'
  ),
  secE: m8(
    'E. Regional Distribution and Historical Settlements',
    'E. क्षेत्रीय वितरण एवं ऐतिहासिक बस्तियाँ',
    'E. ప్రాంతీయ విస్తరణ మరియు చారిత్రక నివాసాలు',
    'E. ಪ್ರಾದೇಶಿಕ ಹಂಚಿಕೆ ಮತ್ತು ಐತಿಹಾಸಿಕ ನೆಲೆಗಳು',
    'E. பிராந்தியப் பரவல் மற்றும் வரலாற்றுக் குடியேற்றங்கள்',
    'E. प्रादेशिक विस्तार आणि ऐतिहासिक वसाहती',
    'E. ଆଞ୍ଚଳିକ ବିସ୍ତାର ଓ ଐତିହାସିକ ବସତି',
    'E. আঞ্চলিক বিস্তার ও ঐতিহাসিক বসতি'
  ),
  secF: m8(
    'F. Cultural Heritage, Traditions, and Customs',
    'F. सांस्कृतिक विरासत, परंपराएँ एवं रीति-रिवाज',
    'F. సాంస్కృతిక వారసత్వం, సంప్రదాయాలు మరియు ఆచారాలు',
    'F. ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ, ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ಆಚರಣೆಗಳು',
    'F. கலாச்சாரப் பாரம்பரியம், மரபுகள் மற்றும் பழக்கவழக்கங்கள்',
    'F. सांस्कृतिक वारसा, परंपरा आणि चालीरीती',
    'F. ସାଂସ୍କୃତିକ ଐତିହ୍ୟ, ପରମ୍ପରା ଓ ରୀତିନୀତି',
    'F. সাংস্কৃতিক ঐতিহ্য, পরম্পরা ও রীতিনীতি'
  ),
  secG: m8(
    'G. Traditional and Contemporary Professions',
    'G. पारंपरिक एवं समकालीन व्यवसाय',
    'G. సాంప్రదాయ మరియు సమకాలీన వృత్తులు',
    'G. ಸಾಂಪ್ರದಾಯಿಕ ಮತ್ತು ಸಮಕಾಲೀನ ವೃತ್ತಿಗಳು',
    'G. பாரம்பரிய மற்றும் தற்காலத் தொழில்கள்',
    'G. पारंपरिक आणि समकालीन व्यवसाय',
    'G. ପାରମ୍ପରିକ ଓ ସମକାଳୀନ ବୃତ୍ତି',
    'G. ঐতিহ্যবাহী ও সমসাময়িক পেশা'
  ),
  secH: m8(
    'H. Historical Warriors and Military Traditions',
    'H. ऐतिहासिक योद्धा एवं सैन्य परंपराएँ',
    'H. చారిత్రక యోధులు మరియు సైనిక సంప్రదాయాలు',
    'H. ಐತಿಹಾಸಿಕ ಯೋಧರು ಮತ್ತು ಸೇನಾ ಸಂಪ್ರದಾಯಗಳು',
    'H. வரலாற்று வீரர்கள் மற்றும் படை மரபுகள்',
    'H. ऐतिहासिक योद्धे आणि लष्करी परंपरा',
    'H. ଐତିହାସିକ ଯୋଦ୍ଧା ଓ ସାମରିକ ପରମ୍ପରା',
    'H. ঐতিহাসিক যোদ্ধা ও সামরিক ঐতিহ্য'
  ),
  secI: m8(
    'I. Agricultural Heritage',
    'I. कृषि विरासत एवं ग्रामीण योगदान',
    'I. వ్యవసాయ వారసత్వం మరియు గ్రామీణ సహకారం',
    'I. ಕೃಷಿ ಪರಂಪರೆ ಮತ್ತು ಗ್ರಾಮೀಣ ಕೊಡುಗೆ',
    'I. வேளாண்மைப் பாரம்பரியம்',
    'I. कृषी वारसा आणि ग्रामीण योगदान',
    'I. କୃଷି ଐତିହ୍ୟ ଓ ଗ୍ରାମୀଣ ଅବଦାନ',
    'I. কৃষি ঐতিহ্য ও গ্রামীণ অবদান'
  ),
  secJ: m8(
    'J. Construction and Engineering Contributions',
    'J. निर्माण एवं अभियांत्रिकी योगदान',
    'J. నిర్మాణ మరియు ఇంజనీరింగ్ సేవలు',
    'J. ನಿರ್ಮಾಣ ಮತ್ತು ಎಂಜಿನಿಯರಿಂಗ್ ಕೊಡುಗೆಗಳು',
    'J. கட்டுமானம் மற்றும் பொறியியல் பங்களிப்புகள்',
    'J. बांधकाम आणि अभियांत्रिकी योगदान',
    'J. ନିର୍ମାଣ ଓ ଯାନ୍ତ୍ରିକ ଅବଦାନ',
    'J. নির্মাণ ও প্রকৌশলগত অবদান'
  ),
  secK: m8(
    'K. Sculpture, Crafts, and Traditional Art',
    'K. मूर्तिकला, शिल्प एवं पारंपरिक कला',
    'K. శిల్పకళ, హస్తకళలు మరియు సాంప్రదాయ కళలు',
    'K. ಶಿಲ್ಪಕಲೆ, ಕരಕುಶಲ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಕಲೆ',
    'K. சிற்பக்கலை, கைவினை மற்றும் பாரம்பரியக் கலை',
    'K. शिल्पकला, हस्तकला आणि पारंपरिक कला',
    'K. ମୂର୍ତ୍ତିକଳା, ଶିଳ୍ପ ଓ ପାରମ୍ପରିକ କଳା',
    'K. ভাস্কর্য, কারুশিল্প ও ঐতিহ্যবাহী শিল্পকলা'
  ),
  secL: m8(
    'L. Architecture and Building Traditions',
    'L. वास्तुकला एवं भवन निर्माण परंपराएँ',
    'L. వాస్తుశిల్పం మరియు భవన నిర్మాణ సంప్రదాయాలు',
    'L. ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಕಟ್ಟಡ ನಿರ್ಮಾಣ ಸಂಪ್ರದಾಯಗಳು',
    'L. கட்டிடக்கலை மற்றும் கட்டுமான மரபுகள்',
    'L. वास्तुकला आणि बांधकाम परंपरा',
    'L. ସ୍ଥାପତ୍ୟ ଓ ଭବନ ନିର୍ମାଣ ପରମ୍ପରା',
    'L. স্থাপত্য ও ভবন নির্মাণ ঐতিহ্য'
  ),
  secM: m8(
    'M. Royal and Dynastic Traditions, Where Documented',
    'M. राजवंशीय एवं शासकीय परंपराएँ (प्रमाणित संदर्भ)',
    'M. రాజవంశ మరియు పాలనా సంప్రదాయాలు (ఆధార సహిత విశ్లేషణ)',
    'M. ರಾಜವಂಶ ಮತ್ತು ಆಡಳಿತ ಸಂಪ್ರದಾಯಗಳು (ದಾಖಲಿತ ಉಲ್ಲೇಖಗಳು)',
    'M. அரச மற்றும் வம்சாவளி மரபுகள் (ஆவணப்படுத்தப்பட்டவை)',
    'M. राजवंशीय आणि शासकीय परंपरा (नोंदवलेले संदर्भ)',
    'M. ରାଜବଂଶୀୟ ଓ ଶାସକୀୟ ପରମ୍ପରା (ପ୍ରମାଣିତ ତଥ୍ୟ)',
    'M. রাজবংশীয় ও শাসকীয় ঐতিহ্য (নথিবদ্ধ তথ্য)'
  ),
  secN: m8(
    'N. Important Historical Personalities, Where Verified',
    'N. प्रमुख ऐतिहासिक व्यक्तित्व (प्रमाणित संदर्भ)',
    'N. ముఖ్యమైన చారిత్రక వ్యక్తులు (ధృవీకరించబడిన వారు)',
    'N. ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು (ದೃಢೀಕೃತ ಉಲ್ಲೇಖಗಳು)',
    'N. முக்கிய வரலாற்று ஆளுமைகள் (சரிபார்க்கப்பட்டவை)',
    'N. महत्त्वाच्या ऐतिहासिक व्यक्ती (प्रमाणित संदर्भ)',
    'N. ପ୍ରମୁଖ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ (ପ୍ରମାଣିତ)',
    'N. গুরুত্বপূর্ণ ঐতিহাসিক ব্যক্তিত্ব (প্রত্যয়িত)'
  ),
  secO: m8(
    'O. Historical Inscriptions, Records, and Documentary Evidence',
    'O. ऐतिहासिक शिलालेख, अभिलेख एवं दस्तावेजी साक्ष्य',
    'O. చారిత్రక శాసనాలు, రికార్డులు మరియు డాక్యుమెంటరీ ఆధారాలు',
    'O. ಐತಿಹಾಸಿಕ ಶಾಸನಗಳು, ದಾಖಲೆಗಳು ಮತ್ತು ಪುರಾವೆಗಳು',
    'O. வரலாற்றுக் கல்வெட்டுகள், ஆவணங்கள் மற்றும் சான்றுகள்',
    'O. ऐतिहासिक शिलालेख, दस्तऐवज आणि पुरावे',
    'O. ଐତିହାସିକ ଶିଳାଲେଖ, ଦସ୍ତାବିଜ ଓ ପ୍ରମାଣ',
    'O. ঐতিহাসিক শিলালিপি, নথি ও প্রামাণ্য দলিল'
  ),
  secP: m8(
    'P. Contributions to Society',
    'P. समाज एवं सभ्यता के प्रति योगदान',
    'P. సమాజానికి మరియు నాగరికతకు చేసిన సేవలు',
    'P. ಸಮಾಜಕ್ಕೆ ಮತ್ತು ನಾಗರಿಕತೆಗೆ ನೀಡಿದ ಕೊಡುಗೆಗಳು',
    'P. சமூகத்திற்கான பங்களிப்புகள்',
    'P. समाजासाठी दिलेले योगदान',
    'P. ସମାଜ ପ୍ରତି ଅବଦାନ',
    'P. সমাজের প্রতি অবদান'
  ),
  secQ: m8(
    'Q. Related Communities and Historical Connections',
    'Q. संबंधित समुदाय एवं ऐतिहासिक अंतर्संबंध',
    'Q. సంబంధిత సమాజాలు మరియు చారిత్రక సంబంధాలు',
    'Q. ಸಂಬಂಧಿತ ಸಮುದಾಯಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಸಂಪರ್ಕಗಳು',
    'Q. தொடர்புடைய சமூகங்கள் மற்றும் வரலாற்றுத் தொடர்புகள்',
    'Q. संबंधित समाज आणि ऐतिहासिक संबंध',
    'Q. ସମ୍ପୃକ୍ତ ସମୁଦାୟ ଓ ଐତିହାସିକ ସମ୍ପର୍କ',
    'Q. সম্পর্কিত সম্প্রদায় ও ঐতিহাসিক সংযোগ'
  ),
  secR: m8(
    'R. Historical Interpretations and Research Gaps',
    'R. ऐतिहासिक व्याख्याएँ एवं अनुसंधान अंतराल',
    'R. చారిత్రక వ్యాఖ్యానాలు మరియు పరిశోధనా అంతరాలు',
    'R. ಐತಿಹಾಸಿಕ ವ್ಯಾಖ್ಯಾನಗಳು ಮತ್ತು ಸಂಶೋಧನಾ ಅಂತರಗಳು',
    'R. வரலாற்று விளக்கங்கள் மற்றும் ஆய்வு இடைவெளிகள்',
    'R. ऐतिहासिक अन्वयार्थ आणि संशोधनातील त्रुटी',
    'R. ଐତିହାସିକ ବ୍ୟାଖ୍ୟା ଓ ଗବେଷଣା ଅଭାବ',
    'R. ঐতিহাসিক ব্যাখ্যা ও গবেষণার অবকাশ'
  ),
  secS: m8(
    'S. References and Sources',
    'S. संदर्भ एवं प्रामाणिक स्रोत',
    'S. మూలాలు మరియు ప్రామాణిక ఆధారాలు',
    'S. ಉಲ್ಲೇಖಗಳು ಮತ್ತು ಪ್ರಮಾಣಿತ ಆಕರಗಳು',
    'S. மேற்கோள்கள் மற்றும் ஆதாரங்கள்',
    'S. संदर्भ आणि प्रमाणित स्रोत',
    'S. ସନ୍ଦର୍ଭ ଓ ପ୍ରାମାଣିକ ଉତ୍ସ',
    'S. তথ্যসূত্র ও প্রামাণ্য উৎস'
  ),
  secT: m8(
    'T. Related Articles and Internal Links',
    'T. संबंधित लेख एवं आंतरिक लिंक',
    'T. సంబంధిత వ్యాసాలు మరియు అంతర్గత లింకులు',
    'T. ಸಂಬಂಧಿತ ಲೇಖನಗಳು ಮತ್ತು ಆಂತರಿಕ ಕೊಂಡಿಗಳು',
    'T. தொடர்புடைய கட்டுரைகள் மற்றும் உள் இணைப்புகள்',
    'T. संबंधित लेख आणि अंतर्गत दुवे',
    'T. ସମ୍ପୃକ୍ତ ଲେଖା ଓ ଆନ୍ତଃ-ଲିଙ୍କ୍',
    'T. সম্পর্কিত নিবন্ধ ও অভ্যন্তরীণ লিঙ্ক'
  ),
  secU: m8(
    'U. Related Keywords with Functional Links',
    'U. संबंधित कीवर्ड (खोज एवं फ़िल्टर टैग)',
    'U. సంబంధిత కీవర్డ్లు (సెర్చ్ & ఫిల్టర్ ట్యాగ్‌లు)',
    'U. ಸಂಬಂಧಿತ ಕೀವರ್ಡ್‌ಗಳು (ಹುಡುಕಾಟ ಟ್ಯಾಗ್‌ಗಳು)',
    'U. தொடர்புடைய முக்கிய வார்த்தைகள் (தேடல் இணைப்புகள்)',
    'U. संबंधित कीवर्ड (शोध आणि फिल्टर टॅग)',
    'U. ସମ୍ପୃକ୍ତ କିୱାର୍ଡ (ସର୍ଚ୍ଚ ଓ ଫିଲ୍ଟର ଟ୍ୟାଗ୍)',
    'U. সম্পর্কিত কীওয়ার্ড (অনুসন্ধান লিঙ্ক)'
  ),
  secV: m8(
    'V. Relevant Images, Maps, and Captions',
    'V. संबंधित चित्र, ऐतिहासिक मानचित्र एवं विवरण',
    'V. సంబంధిత చిత్రాలు, చారిత్రక పటాలు మరియు వివరణలు',
    'V. ಸಂಬಂಧಿತ ಚಿತ್ರಗಳು, ಐತಿಹಾಸಿಕ ನಕ್ಷೆಗಳು ಮತ್ತು ಶೀರ್ಷಿಕೆಗಳು',
    'V. தொடர்புடைய படங்கள், வரலாற்று வரைபடங்கள் மற்றும் விளக்கங்கள்',
    'V. संबंधित चित्रे, ऐतिहासिक नकाशे आणि माहिती',
    'V. ସମ୍ପୃକ୍ତ ଚିତ୍ର, ଐତିହାସିକ ମାନଚିତ୍ର ଓ ବିବରଣୀ',
    'V. প্রাসঙ্গিক চিত্র, ঐতিহাসিক মানচিত্র ও বিবরণ'
  ),
  secW: m8(
    'W. Detailed Conclusion and Historical Summary',
    'W. विस्तृत निष्कर्ष एवं ऐतिहासिक सारांश',
    'W. సమగ్ర ముగింపు మరియు చారిత్రక సారాంశం',
    'W. ವಿವರವಾದ ತೀರ್ಮಾನ ಮತ್ತು ಐತಿಹಾಸಿಕ ಸಾರಾಂଶ',
    'W. விரிவான முடிவுரை மற்றும் வரலாற்றுச் சுருக்கம்',
    'W. सविस्तर निष्कर्ष आणि ऐतिहासिक सारांश',
    'W. ବିସ୍ତୃତ ନିଷ୍କର୍ଷ ଓ ଐତିହାସିକ ସାରାଂଶ',
    'W. বিস্তারিত উপসংহার ও ঐতিহাসিক সারসংক্ষেপ'
  )
};

/**
 * Multilingual Keyword Dictionary with Translated Labels
 */
export const KEYWORD_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  'Od': m8('Od', 'ओड', 'ఓడ్', 'ಓಡ್', 'ஓட்', 'ओड', 'ଓଡ଼', 'ওড'),
  'Od-Rajputh': m8('Od-Rajputh', 'ओड-राजपूत', 'ఓడ్-రాజ్‌పుత్', 'ಓಡ್-ರಜಪೂತ್', 'ஓட்-ராஜ்புத்', 'ओड-राजपूत', 'ଓଡ଼-ରାଜପୁତ', 'ওড-রাজপুত'),
  'Odra-Kshatriya': m8('Odra-Kshatriya', 'ओड्र-क्षत्रिय', 'ఓడ్ర-క్షత్రియ', 'ಓಡ್ರ-ಕ್ಷತ್ರಿಯ', 'ஒட்ர-க்ஷத்திரிய', 'ओड्र-क्षत्रिय', 'ଓଡ଼୍ର-କ୍ଷତ୍ରିୟ', 'ওড্র-ক্ষত্রিয়'),
  'KalingaRajulu': m8('KalingaRajulu', 'कलिंगराजुलु', 'కళింగరాజులు', 'ಕಳಿಂಗರಾಜುಲು', 'கலிங்கராஜுலு', 'कलिंगराजुलु', 'କଳିଙ୍ଗରାଜୁଲୁ', 'কলিঙ্গরাজুলু'),
  'OD-Khandayath': m8('OD-Khandayath', 'ओड-खंडायत', 'ఓడ్-ఖండాయత్', 'ಓಡ್-ಖಂಡಾಯತ್', 'ஓட்-கண்டாயத்', 'ओड-खंडायत', 'ଓଡ଼-ଖଣ୍ଡାୟତ', 'ওড-খণ্ডায়ত'),
  'Oda-Chassa': m8('Oda-Chassa', 'ओड-चासा', 'ఓడ-చాసా', 'ಓಡ-ಚಾಸಾ', 'ஓட-சாஸா', 'ओड-चासा', 'ଓଡ଼-ଚାଷା', 'ওড-চাষা'),
  'OD-Paika': m8('OD-Paika', 'ओड-पाइक', 'ఓడ్-పైకా', 'ಓಡ್-ಪೈಕಾ', 'ஓட்-பைக்கா', 'ओड-पाइक', 'ଓଡ଼-ପାଇକ', 'ওড-পাইক'),
  'Odan': m8('Odan', 'ओडन', 'ఓడన్', 'ಓಡನ್', 'ஓடன்', 'ओडण', 'ଓଡ଼ନ୍', 'ওডন'),
  'Vaddi': m8('Vaddi', 'वड्डी', 'వడ్డి', 'ವಡ್ಡಿ', 'வட்டி', 'वड्डी', 'ଭଡ୍ଡି', 'ভড্ডি'),
  'Vaddera': m8('Vaddera', 'वड्डेरा', 'వడ్డెర', 'ವಡ್ಡೇರ', 'வட்டேரா', 'वड्डेरा', 'ଭଡ୍ଡେରା', 'ভড্ডেরা'),
  'Vaddeelu': m8('Vaddeelu', 'वड्डीलु', 'వడ్డీలు', 'ವಡ್ಡೀಲು', 'வட்டீலு', 'वड्डीलु', 'ଭଡ୍ଡୀଲୁ', 'ভড্ডীলু'),
  'VaddiRajulu': m8('VaddiRajulu', 'वड्डीराजुलु', 'వడ్డిరాజులు', 'ವಡ್ಡಿರಾಜುಲು', 'வட்டிராஜுலு', 'वड्डीराजुलु', 'ଭଡ୍ଡିରାଜୁଲୁ', 'ভড্ডিরাজুলু'),
  'VadderaRajulu': m8('VadderaRajulu', 'वड्डेराराजुलु', 'వడ్డెరరాజులు', 'ವಡ್ಡೇರರಾಜುಲು', 'வட்டேரராஜுலு', 'वड्डेराराजुलु', 'ଭଡ୍ଡେରାରାଜୁଲୁ', 'ভড্ডেরারাজুলু'),
  'Gajapathulu': m8('Gajapathulu (Gajaoathulu)', 'गजपतुलु', 'గజపతులు', 'ಗಜಪತುಲು', 'கஜபதுலு', 'गजपतुलु', 'ଗଜପତୁଲୁ', 'গজপতুলু'),
  'Voddar': m8('Voddar', 'वोड्डार', 'వొడ్డార్', 'ವೊಡ್ಡರ್', 'வொட்டர்', 'वोड्डार', 'ଭୋଡ୍ଡାର', 'ভোড্ডার'),
  'Oddaru': m8('Oddaru', 'ओड्डारु', 'ఒడ్డారు', 'ಒಡ್ಡಾರು', 'ஒட்டாரு', 'ओड्डारु', 'ଓଡ୍ଡାରୁ', 'ওড্ডারু'),
  'LokaShilpi': m8('LokaShilpi', 'लोकशिल्पी', 'లోకశిల్పి', 'ಲೋಕಶಿಲ್ಪಿ', 'லோகசில்பி', 'लोकशिल्पी', 'ଲୋକଶିଳ୍ପୀ', 'লোকশিল্পী'),
  'Bulders of Universe': m8('Bulders of Universe (Builders of Universe)', 'विश्व-निर्माता (Builders of Universe)', 'విశ్వ నిర్మాతలు (Builders of Universe)', 'ವಿಶ್ವ ನಿರ್ಮಾತೃಗಳು (Builders of Universe)', 'உலகக் கட்டுமானர்கள் (Builders of Universe)', 'विश्व-निर्माते (Builders of Universe)', 'ବିଶ୍ୱ ନିର୍ମାତା (Builders of Universe)', 'বিশ্ব-নির্মাতা (Builders of Universe)'),
  'Odra Desha': m8('Odra Desha', 'ओड्र देश', 'ఓడ్ర దేశం', 'ಓಡ್ರ ದೇಶ', 'ஒட்ர தேசம்', 'ओड्र देश', 'ଓଡ଼୍ର ଦେଶ', 'ওড্র দেশ'),
  'Kalinga History': m8('Kalinga History', 'कलिंग इतिहास', 'కళింగ చరిత్ర', 'ಕಳಿಂಗ ಇತಿಹಾಸ', 'கலிங்க வரலாறு', 'कलिंग इतिहास', 'କଳିଙ୍ଗ ଇତିହାସ', 'কলিঙ্গ ইতিহাস'),
  'Historical Warriors': m8('Historical Warriors', 'ऐतिहासिक योद्धा', 'చారిత్రక యోధులు', 'ಐತಿಹಾಸಿಕ ಯೋಧರು', 'வரலாற்று வீரர்கள்', 'ऐतिहासिक योद्धे', 'ଐତିହାସିକ ଯୋଦ୍ଧା', 'ঐতিহাসিক যোদ্ধা'),
  'Agriculture': m8('Agriculture', 'कृषि विरासत', 'వ్యవసాయం', 'ಕೃಷಿ ಪರಂಪರೆ', 'வேளாண்மை', 'कृषी वारसा', 'କୃଷି ଐତିହ୍ୟ', 'কৃষি ঐতিহ্য'),
  'Construction': m8('Construction', 'निर्माण कला', 'నిర్మాణ రంగం', 'ನಿರ್ಮಾಣ ಕಲೆ', 'கட்டுமானம்', 'बांधकाम कला', 'ନିର୍ମାଣ କଳା', 'নির্মাণ শিল্প'),
  'Engineering': m8('Engineering', 'अभियांत्रिकी', 'ఇంజనీరింగ్', 'ಎಂಜಿನಿಯರಿಂಗ್', 'பொறியியல்', 'अभियांत्रिकी', 'ଯାନ୍ତ୍ରିକ ବିଜ୍ଞାନ', 'প্রকৌশল ঐতিহ্য'),
  'Shilpi': m8('Shilpi', 'शिल्पी', 'శిల్పి', 'ಶಿಲ್ಪಿ', 'சில்பி (சிற்பி)', 'शिल्पी', 'ଶିଳ୍ପୀ', 'শিল্পী (ভাস্কর)'),
  'Vasthushilpi': m8('Vasthushilpi', 'वास्तुशिल्पी', 'వాస్తుశిల్పి', 'ವಾಸ್ತುಶಿಲ್ಪಿ', 'வாஸ்துசில்பி', 'वास्तुशिल्पी', 'ବାସ୍ତୁଶିଳ୍ପୀ', 'বাস্তুশিল্পী'),
  'Vishwashilpi': m8('Vishwashilpi', 'विश्वशिल्पी', 'విశ్వశిల్పి', 'ವಿಶ್ವಶಿಲ್ಪಿ', 'விஷ்வசில்பி', 'विश्वशिल्पी', 'ବିଶ୍ୱଶିଳ୍ପୀ', 'বিশ্বশিল্পী'),
  'Royal Heritage': m8('Royal Heritage', 'राजवंशीय विरासत', 'రాజవంశ వారసత్వం', 'ರಾಜವಂಶ ಪರಂಪರೆ', 'அரச பாரம்பரியம்', 'राजवंशीय वारसा', 'ରାଜବଂଶୀୟ ଐତିହ୍ୟ', 'রাজবংশীয় ঐতিহ্য'),
  'Traditional Architecture': m8('Traditional Architecture', 'पारंपरिक वास्तुकला', 'సాంప్రదాయ వాస్తుశిల్పం', 'ಸಾಂಪ್ರದಾಯಿಕ ವಾಸ್ತುಶಿಲ್ಪ', 'பாரம்பரியக் கட்டிடக்கலை', 'पारंपरिक वास्तुकला', 'ପାରମ୍ପରିକ ସ୍ଥାପତ୍ୟ', 'ঐতিহ্যবাহী স্থাপত্য'),
  'Sculpture': m8('Sculpture', 'मूर्तिकला', 'శిల్పకళ', 'ಶಿಲ್ಪಕಲೆ', 'சிற்பக்கலை', 'शिल्पकला', 'ମୂର୍ତ୍ତିକଳା', 'ভাস্কর্য শিল্প'),
  'Royal History': m8('Royal History', 'राजकीय इतिहास', 'రాజ చరిత్ర', 'ರಾಜಕೀಯ ಇತಿಹಾಸ', 'அரச வரலாறு', 'राजकीय इतिहास', 'ରାଜକୀୟ ଇତିହାସ', 'রাজকীয় ইতিহাস'),
  'Inventor of the Floor Mill': m8('Inventor of the Floor Mill', 'चक्की (आटा चक्की) के आविष्कारक', 'తిరగలి (పిండి మిల్లు) ఆవిష్కర్త', 'ಬೀಸುವ ಕಲ್ಲಿನ ಆವಿಷ್ಕಾರಕರು', 'மாவு அரைக்கும் இயந்திரக் கண்டுபிடிப்பாளர்', 'जात्याचे (चक्की) शोधकर्ते', 'ଚକି (ପେଷଣ ଯନ୍ତ୍ର) ଉଦ୍ଭାବକ', 'যাঁতার (চাক্কি) উদ্ভাবক'),
  'Inventor of the Floor mill': m8('Inventor of the Floor Mill', 'चक्की (आटा चक्की) के आविष्कारक', 'తిరగలి (పిండి మిల్లు) ఆవిష్కర్త', 'ಬೀಸುವ ಕಲ್ಲಿನ ಆವಿಷ್ಕಾರಕರು', 'மாவு அரைக்கும் இயந்திரக் கண்டுபிடிப்பாளர்', 'जात्याचे (चक्की) शोधकर्ते', 'ଚକି (ପେଷଣ ଯନ୍ତ୍ର) ଉଦ୍ଭାବକ', 'যাঁতার (চাক্কি) উদ্ভাবক'),
  'Inventor of the floor mill': m8('Inventor of the Floor Mill', 'चक्की (आटा चक्की) के आविष्कारक', 'తిరగలి (పిండి మిల్లు) ఆవిష్కర్త', 'ಬೀಸುವ ಕಲ್ಲಿನ ಆವಿಷ್ಕಾರಕರು', 'மாவு அரைக்கும் இயந்திரக் கண்டுபிடிப்பாளர்', 'जात्याचे (चक्की) शोधकर्ते', 'ଚକି (ପେଷଣ ଯନ୍ତ୍ର) ଉଦ୍ଭାବକ', 'যাঁতার (চাক্কি) উদ্ভাবক'),
  'Inventor of the Running Wheel': m8('Inventor of the Running Wheel', 'गतिशील चक्र के आविष्कारक', 'తిరిగే చక్రం (రన్నింగ్ వీల్) ఆవిష్కర్త', 'ಚಲಿಸುವ ಚಕ್ರದ ಆವಿಷ್ಕಾರಕರು', 'சுழலும் சக்கரக் கண்டுபிடிப்பாளர்', 'फिरत्या चाकाचे शोधकर्ते', 'ଘୂର୍ଣ୍ଣନ ଚକ୍ର ଉଦ୍ଭାବକ', 'ঘূর্ণায়মান চাকার উদ্ভাবক'),
  'Suryavamsha': m8('Suryavamsha', 'सूर्यवंश', 'సూర్యవంశం', 'ಸೂರ್ಯವಂಶ', 'சூரியவம்சம்', 'सूर्यवंश', 'ସୂର୍ଯ୍ୟବଂଶ', 'সূর্যবংশ'),
  'Lokashilpi': m8('Lokashilpi', 'लोकशिल्पी', 'లోకశిల్పి', 'ಲೋಕಶಿಲ್ಪಿ', 'லோகசில்பி', 'लोकशिल्पी', 'ଲୋକଶିଳ୍ପୀ', 'লোকশিল্পী'),
  'Builders of Universe': m8('Builders of Universe', 'विश्व-निर्माता (Builders of Universe)', 'విశ్వ నిర్మాతలు (Builders of Universe)', 'ವಿಶ್ವ ನಿರ್ಮಾತೃಗಳು (Builders of Universe)', 'உலகக் கட்டுமானர்கள் (Builders of Universe)', 'विश्व-निर्माते (Builders of Universe)', 'ବିଶ୍ୱ ନିର୍ମାତା (Builders of Universe)', 'বিশ্ব-নির্মাতা (Builders of Universe)'),
  'Odde': m8('Odde', 'ओड्डे', 'ఒడ్డే', 'ಒಡ್ಡೇ', 'ஒட்டே', 'ओड्डे', 'ଓଡ୍ଡେ', 'ওড্ডে'),
  'Vadde': m8('Vadde', 'वड्डे', 'వడ్డే', 'ವಡ್ಡೇ', 'வட்டே', 'वड्डे', 'ଭଡ୍ଡେ', 'ভড্ডে'),
  'OddeRajulu': m8('OddeRajulu', 'ओड्डेराजुलु', 'ఒడ్డేరాజులు', 'ಒಡ್ಡೇರಾಜುಲು', 'ஒட்டெராஜுலு', 'ओड्डेराजुलु', 'ଓଡ୍ଡେରାଜୁଲୁ', 'ওড্ডেরাজুলু'),
  'Odderajulu': m8('Odderajulu', 'ओड्डेराजुलु', 'ఒడ్డేరాజులు', 'ಒಡ್ಡೇರಾಜುಲು', 'ஒட்டெராஜுலு', 'ओड्डेराजुलु', 'ଓଡ୍ଡେରାଜୁଲୁ', 'ওড্ডেরাজুলু'),
  'VaddeRajulu': m8('VaddeRajulu', 'वड्डेराजुलु', 'వడ్డేరాజులు', 'ವಡ್ಡೇರಾಜುಲು', 'வட்டெராஜுலு', 'वड्डेराजुलु', 'ଭଡ୍ଡେରାଜୁଲୁ', 'ভড্ডেরাজুলু'),
  'Vadiyarajulu': m8('Vadiyarajulu', 'वडियाराजुलु', 'వడియరాజులు', 'ವಡಿಯರಾಜುಲು', 'வடியராஜுலு', 'वडियाराजुलु', 'ଓଡ଼ିଆରାଜୁଲୁ', 'ওড়িয়ারাজুলু'),
  'Hydraulic Engineering': m8('Hydraulic Engineering', 'जल-अभियांत्रिकी', 'జల-ఇంజనీరింగ్', 'ಜಲ-ಎಂಜಿನಿಯರಿಂಗ್', 'நீர்ப்பாசனப் பொறியியல்', 'जल-अभियांत्रिकी', 'ଜଳ-ଅଭିଯାନ୍ତ୍ରିକୀ', 'জল-প্রকৌশল'),
  'Tank Irrigation': m8('Tank Irrigation', 'तालाब सिंचाई (चेरुवु/केरे)', 'చెరువు సాగునీటి వ్యవస్థ', 'ಕೆರೆ ನೀರಾವರಿ ವ್ಯವಸ್ಥೆ', 'ஏரிப் பாசனம்', 'तलाव सिंचन व्यवस्था', 'ଜଳାଶୟ ଜଳସେଚନ', 'জলাশয় সেচ ব্যবস্থা'),
  'Fort Garrisons': m8('Fort Garrisons', 'दुर्ग रक्षा टुकड़ियाँ', 'దుర్గ రక్షక దళాలు', 'ಕೋಟೆ ಕಾವಲು ಪಡೆಗಳು', 'கோட்டைப் பாதுகாப்புப் படைகள்', 'दुर्ग रक्षक तुकड्या', 'ଦୁର୍ଗ ରକ୍ଷକ ବାହିନୀ', 'দুর্গ রক্ষক বাহিনী'),
  'Epigraphy': m8('Epigraphy', 'शिलालेख साक्ष्य', 'శాసన ఆధారాలు', 'ಶಾಸನ ಆಧಾರಗಳು', 'கல்வெட்டுச் சான்றுகள்', 'शिलालेख पुरावे', 'ଶିଳାଲେଖ ପ୍ରମାଣ', 'শিলালিপি প্রমাণ')
};

// ============================================================================
// 1. NINE PROFESSIONAL HERITAGE CATEGORIES (Section 3 Complete Reclassification)
// ============================================================================
export const PROFESSIONAL_HERITAGE_CATEGORIES: ProfessionalHeritageCategoryArticle[] = [
  {
    id: 'prof_cat_1_warriors',
    slug: 'historical-warriors-and-martial-heritage',
    categoryNumber: 1,
    codeLabel: 'Category 1',
    title: m8(
      'Category 1: Historical Warriors and Martial Heritage',
      'श्रेणी 1: ऐतिहासिक योद्धा एवं सामरिक विरासत',
      'వర్గం 1: చారిత్రక యోధులు మరియు సైనిక వారసత్వం',
      'ವರ್ಗ 1: ಐತಿಹಾಸಿಕ ಯೋಧರು ಮತ್ತು ಸಮರ ಪರಂಪರೆ',
      'வகை 1: வரலாற்று வீரர்கள் மற்றும் மறவர் பாரம்பரியம்',
      'वर्ग १: ऐतिहासिक योद्धे आणि लष्करी वारसा',
      'ବର୍ଗ ୧: ଐତିହାସିକ ଯୋଦ୍ଧା ଓ ସାମରିକ ଐତିହ୍ୟ',
      'বিভাগ ১: ঐতিহাসিক যোদ্ধা ও সামরিক ঐতিহ্য'
    ),
    shortSummary: m8(
      'Documented martial traditions, regional warrior communities, Kshatriya and Rajput frontier lineages, fort defenders, weapon specialists, and Paika military organization across Kalinga, Odra Desha, Deccan, and North-Western India.',
      'कलिंग, ओड्र देश, दक्कन और उत्तर-पश्चिम भारत में प्रमाणित सामरिक परंपराएँ, क्षेत्रीय योद्धा समुदाय, क्षत्रिय व राजपूत सीमांत वंश, दुर्ग रक्षक, शस्त्र विशेषज्ञ एवं पाइक सैन्य संगठन।',
      'కళింగ, ఓడ్ర దేశం, దక్కన్ మరియు వాయువ్య భారతదేశంలో నమోదైన సైనిక సంప్రదాయాలు, ప్రాంతీయ యోధ సమాజాలు, క్షత్రియ మరియు రాజపుత్ర సరిహద్దు వంశాలు, దుర్గ రక్షకులు మరియు పైకా సైనిక వ్యవస్థ.',
      'ಕಳಿಂಗ, ಓಡ್ರ ದೇಶ, ದಖನ್ ಮತ್ತು ವಾಯುವ್ಯ ಭಾರತದಲ್ಲಿ ದಾಖಲಾದ ಸೇನಾ ಸಂಪ್ರದಾಯಗಳು, ಪ್ರಾದೇಶಿಕ ಯೋಧ ಸಮುದಾಯಗಳು, ಕ್ಷತ್ರಿಯ ಹಾಗೂ ರಜಪೂತ ಪರಂಪರೆ, ಕೋಟೆ ರಕ್ಷಕರು ಮತ್ತು ಪೈಕಾ ಸೇನಾ ವ್ಯವಸ್ಥೆ.',
      'கலிங்கம், ஒட்ர தேசம், தக்காணம் மற்றும் வடமேற்கு இந்தியாவில் ஆவணப்படுத்தப்பட்ட படை மரபுகள், சத்திரிய மற்றும் ராஜபுத்திர மரபுகள், கோட்டைக் காவலர்கள் மற்றும் பைக்கா படை அமைப்பு.',
      'कलिंग, ओड्र देश, दख्खन आणि वायव्य भारतातील नोंदवलेली लष्करी परंपरा, क्षत्रिय व राजपूत घराणी, दुर्ग रक्षक, शस्त्र तज्ज्ञ आणि पाइक सैन्य संघटना.',
      'କଳିଙ୍ଗ, ଓଡ଼୍ର ଦେଶ, ଦାକ୍ଷିଣାତ୍ୟ ଓ ଉତ୍ତର-ପଶ୍ଚିମ ଭାରତରେ ପ୍ରମାଣିତ ସାମରିକ ପରମ୍ପରା, କ୍ଷତ୍ରିୟ ଓ ରାଜପୁତ ବଂଶ, ଦୁର୍ଗ ରକ୍ଷକ ଏବଂ ପାଇକ ସୈନ୍ୟ ସଂଗଠନ।',
      'কলিঙ্গ, ওড্র দেশ, দাক্ষিণাত্য ও উত্তর-পশ্চিম ভারতে নথিবদ্ধ সামরিক ঐতিহ্য, ক্ষত্রিয় ও রাজপুত বংশ, দুর্গ রক্ষক এবং পাইক সামরিক সংগঠন।'
    ),
    includedSubClassifications: [
      {
        id: 'sub_1_1',
        name: m8('Historical Warriors', 'ऐतिहासिक योद्धा', 'చారిత్రక యోధులు', 'ಐತಿಹಾಸಿಕ ಯೋಧರು', 'வரலாற்று வீரர்கள்', 'ऐतिहासिक योद्धे', 'ଐତିହାସିକ ଯୋଦ୍ଧା', 'ঐতিহাসিক যোদ্ধা'),
        description: m8(
          'Combatants and frontier levies attested in Kalinga, Eastern Ganga, Gajapathi, Vijayanagara, and Deccan epigraphy.',
          'कलिंग, पूर्वी गंग, गजपति, विजयनगर और दक्कन के शिलालेखों में प्रमाणित योद्धा।',
          'కళింగ, తూర్పు గంగ, గజపతి, విజయనగర శాసనాలలో పేర్కొనబడిన యోధులు.',
          'ಕಳಿಂಗ, ಪೂರ್ವ ಗಂಗ, ಗಜಪತಿ ಮತ್ತು ವಿಜಯನಗರ ಶಾಸನಗಳಲ್ಲಿ ಉಲ್ಲೇಖಿತ ಯೋಧರು.',
          'கலிங்க, கங்க, கஜபதி மற்றும் விஜயநகர கல்வெட்டுகளில் குறிப்பிடப்படும் போர்வீரர்கள்.',
          'कलिंग, गंग, गजपती आणि विजयनगर शिलालेखांत नोंदवलेले योद्धे.',
          'କଳିଙ୍ଗ, ଗଙ୍ଗ, ଗଜପତି ଓ ବିଜୟନଗର ଶିଳାଲେଖରେ ବର୍ଣ୍ଣିତ ଯୋଦ୍ଧା।',
          'কলিঙ্গ, গঙ্গ, গজপতি ও বিজয়নগর শিলালিপিতে প্রত্যয়িত যোদ্ধা।'
        )
      },
      {
        id: 'sub_1_2',
        name: m8('Historical Military Traditions', 'ऐतिहासिक सैन्य परंपराएँ', 'చారిత్రక సైనిక సంప్రదాయాలు', 'ಐತಿಹಾಸಿಕ ಸೇನಾ ಸಂಪ್ರದಾಯಗಳು', 'வரலாற்றுப் படை மரபுகள்', 'ऐतिहासिक लष्करी परंपरा', 'ଐତିହାସିକ ସାମରିକ ପରମ୍ପରା', 'ঐতিহাসিক সামরিক ঐতিহ্য'),
        description: m8(
          'Garrison administration (Kataka, Garhjat, Durgam), elephant-corps logistics, and siege engineering.',
          'कटक, गढ़जात और गिरि-दुर्गों का सैन्य प्रशासन, गज-सेना संचालन और घेराबंदी अभियांत्रिकी।',
          'కటక్, గఢ్‌జాత్ మరియు గిరి దుర్గాల సైనిక పాలన, గజదళ నిర్వహణ.',
          'ಕಟಕ್ ಮತ್ತು ಗಿರಿ ದುರ್ಗಗಳ ಸೇನಾ ಆಡಳಿತ ಹಾಗೂ ಗಜಪಡೆ ನಿರ್ವಹಣೆ.',
          'கட்டக் மற்றும் மலைக்கோட்டைகளின் படை நிர்வாகம் மற்றும் யானைப்படை மரபு.',
          'कटक आणि गिरीदुर्गांचे लष्करी प्रशासन व गजदल व्यवस्था.',
          'କଟକ ଓ ଗଡ଼ଜାତ ଦୁର୍ଗର ସାମରିକ ପ୍ରଶାସନ ଓ ଗଜ-ସେନା ପରିଚାଳନା।',
          'কটক ও গড়জাত দুর্গের সামরিক প্রশাসন এবং গজবাহিনী পরিচালনা।'
        )
      },
      {
        id: 'sub_1_3',
        name: m8('Regional Warrior Communities', 'क्षेत्रीय योद्धा समुदाय', 'ప్రాంతీయ యోధ సమాజాలు', 'ಪ್ರಾದೇಶಿಕ ಯೋಧ ಸಮುದಾಯಗಳು', 'பிராந்திய மறவர் சமூகங்கள்', 'प्रादेशिक लढाऊ समाज', 'ଆଞ୍ଚଳିକ ଯୋଦ୍ଧା ସମୁଦାୟ', 'আঞ্চলিক যোদ্ধা সম্প্রদায়'),
        description: m8(
          'Distinct regional martial groups including Khandayats and Paikas in Odisha, OddeRajulu/VaddiRajulu in Andhra-Telangana, and Oad-Rajputs in North-Western India.',
          'ओडिशा में खंडायत व पाइक, आंध्र-तेलंगाना में ओड्डेराजुलु/वड्डीराजुलु, और उत्तर-पश्चिम भारत में ओड-राजपूत।',
          'ఒడిశాలో ఖండాయత్, పైకా, ఆంధ్ర-తెలంగాణలో ఒడ్డేరాజులు/వడ్డిరాజులు, ఉత్తర భారత్‌లో ఓడ్-రాజ్‌పుత్.',
          'ಒಡಿಶಾದ ಖಂಡಾಯತ್-ಪೈಕಾ, ಆಂಧ್ರದ ವಡ್ಡೇರಾಜುಲು ಮತ್ತು ಉತ್ತರ ಭಾರತದ ಓಡ್-ರಜಪೂತ್.',
          'ஒடிசாவின் கண்டாயத்-பைக்கா, ஆந்திராவின் வட்டிராஜுலு மற்றும் வட இந்திய ஓட்-ராஜ்புத்.',
          'ओडिशातील खंडायत-पाइक, आंध्रातील वड्डेराजुलु आणि उत्तर भारतातील ओड-राजपूत.',
          'ଓଡ଼ିଶାର ଖଣ୍ଡାୟତ ଓ ପାଇକ, ଆନ୍ଧ୍ରର ଭଡ୍ଡିରାଜୁଲୁ ଓ ଉତ୍ତର ଭାରତର ଓଡ଼-ରାଜପୁତ।',
          'ওড়িশার খণ্ডায়ত ও পাইক, অন্ধ্রের ভড্ডিরাজুলু এবং উত্তর ভারতের ওড-রাজপুত।'
        )
      },
      {
        id: 'sub_1_4',
        name: m8('Documented Kshatriya Traditions', 'प्रमाणित क्षत्रिय परंपराएँ', 'ఆధార సహిత క్షత్రియ సంప్రదాయాలు', 'ದಾಖಲಿತ ಕ್ಷತ್ರಿಯ ಸಂಪ್ರದಾಯಗಳು', 'ஆவணப்படுத்தப்பட்ட சத்திரிய மரபுகள்', 'नोंदवलेल्या क्षत्रिय परंपरा', 'ପ୍ରମାଣିତ କ୍ଷତ୍ରିୟ ପରମ୍ପରା', 'নথিবদ্ধ ক্ষত্রিয় ঐতিহ্য'),
        description: m8(
          'Classical textual references (Manusmriti 10.44 on Odras, Mahabharata Bhishma Parva) and medieval Suryavamsha Gajapathi charters.',
          'मनुस्मृति (10.44), महाभारत और मध्यकालीन सूर्यवंशी गजपति ताम्रपत्रों में वर्णित क्षत्रिय संदर्भ।',
          'మనుస్మృతి (10.44), మహాభారతం మరియు సూర్యవంశ గజపతి తామ్రపత్రాలలోని క్షత్రియ ఆధారాలు.',
          'ಮನುಸ್ಮೃತಿ (10.44), ಮಹಾಭಾರತ ಮತ್ತು ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಶಾಸನಗಳಲ್ಲಿನ ಕ್ಷತ್ರಿಯ ಉಲ್ಲೇಖಗಳು.',
          'மனுஸ்மிருதி (10.44), மகாபாரதம் மற்றும் சூர்யவம்ச கஜபதி செப்பேடுகளில் உள்ள சத்திரியக் குறிப்புகள்.',
          'मनुस्मृती (१०.४४), महाभारत आणि सूर्यवंशी गजपती ताम्रपटांतील क्षत्रिय संदर्भ.',
          'ମନୁସ୍ମୃତି (୧୦.୪୪), ମହାଭାରତ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ତାମ୍ରଫଳକରେ ବର୍ଣ୍ଣିତ କ୍ଷତ୍ରିୟ ପରମ୍ପରା।',
          'মনুস্মৃতি (১০.৪৪), মহাভারত ও সূর্যবংশী গজপতি তাম্রশাসনে উল্লেখিত ক্ষত্রিয় ঐতিহ্য।'
        )
      },
      {
        id: 'sub_1_5',
        name: m8('Rajput and Regional Martial Traditions', 'राजपूत एवं क्षेत्रीय सामरिक परंपराएँ', 'రాజపుత్ర మరియు ప్రాంతీయ సైనిక సంప్రదాయాలు', 'ರಜಪೂತ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಸಮರ ಸಂಪ್ರದಾಯಗಳು', 'ராஜபுத்திர மற்றும் பிராந்திய மறவர் மரபுகள்', 'राजपूत आणि प्रादेशिक लढाऊ परंपरा', 'ରାଜପୁତ ଓ ଆଞ୍ଚଳିକ ସାମରିକ ପରମ୍ପରା', 'রাজপুত ও আঞ্চলিক সামরিক ঐতিহ্য'),
        description: m8(
          'North-Western Oad-Rajput martial customs, clan exogamy (Gotra/Nukh), and fortress defense across Rajasthan, Sindh, and Punjab.',
          'राजस्थान, सिंध और पंजाब में ओड-राजपूत कुल परंपराएँ, गोत्र/नुख व्यवस्था और दुर्ग रक्षा।',
          'రాజస్థాన్, సింధ్, పంజాబ్ ప్రాంతాలలో ఓడ్-రాజ్‌పుత్ గోత్ర/నుఖ్ సంప్రదాయాలు మరియు దుర్గ రక్షణ.',
          'ರಾಜಸ್ಥಾನ, ಸಿಂಧ್ ಮತ್ತು ಪಂಜಾಬ್‌ನಲ್ಲಿ ಓಡ್-ರಜಪೂತ್ ಗೋತ್ರ/ನುಖ್ ಪದ್ಧತಿ ಮತ್ತು ಕೋಟೆ ರಕ್ಷಣೆ.',
          'ராஜஸ்தான், சிந்து மற்றும் பஞ்சாபில் ஓட்-ராஜ்புத் குல மரபுகள் மற்றும் கோட்டைப் பாதுகாப்பு.',
          'राजस्थान, सिंध आणि पंजाबमधील ओड-राजपूत गोत्र/नुख पद्धती आणि दुर्ग संरक्षण.',
          'ରାଜସ୍ଥାନ, ସିନ୍ଧ ଓ ପଞ୍ଜାବରେ ଓଡ଼-ରାଜପୁତ ଗୋତ୍ର/ନୁଖ୍ ପ୍ରଥା ଓ ଦୁର୍ଗ ରକ୍ଷା।',
          'রাজস্থান, সিন্ধু ও পাঞ্জাবে ওড-রাজপুত গোত্র/নুখ প্রথা ও দুর্গ প্রতিরক্ষা।'
        )
      },
      {
        id: 'sub_1_6',
        name: m8('Soldiers and Military Leaders', 'सैनिक एवं सैन्य नायक', 'సైనికులు మరియు సేనాపతులు', 'ಸೈನಿಕರು ಮತ್ತು ಸೇನಾ ನಾಯಕರು', 'படைவீரர்கள் மற்றும் தளபதிகள்', 'सैनिक आणि सेनापती', 'ସୈନିକ ଓ ସେନାପତି', 'সৈনিক ও সেনানায়ক'),
        description: m8(
          'Command ranks such as Senapati, Mahapatra, Dalabehera, Bisoyi, Dandanayaka, and Nayakkar.',
          'सेनापति, महापात्र, दलबेहेरा, बिसोयी, दंडनायक और नायक्कर जैसे सैन्य पद।',
          'సేనాపతి, మహాపాత్ర, దళబెహెరా, బిసోయి, దండనాయక మరియు నాయక్కర్ వంటి సైనిక హోదాలు.',
          'ಸೇನಾಪತಿ, ಮಹಾಪಾತ್ರ, ದಳಬೆಹೆರಾ, ದಂಡನಾಯಕ ಮತ್ತು ನಾಯ್ಕರ್ ಸೇನಾ ಪದವಿಗಳು.',
          'சேனாபதி, மகாபாத்ரா, தளபெஹெரா, தண்டநாயகர் மற்றும் நாயக்கர் போன்ற படைப் பதவிகள்.',
          'सेनापती, महापात्र, दलबेहेरा, दंडनायक आणि नायक्कर यांसारखी लष्करी पदे.',
          'ସେନାପତି, ମହାପାତ୍ର, ଦଳବେହେରା, ବିଷୋୟୀ ଓ ଦଣ୍ଡନାୟକ ଆଦି ସାମରିକ ପଦବୀ।',
          'সেনাপতি, মহাপাত্র, দলবেহেরা, দণ্ডনায়ক ও নায়ক্কর প্রভৃতি সামরিক পদ।'
        )
      },
      {
        id: 'sub_1_7',
        name: m8('Fort Defenders', 'दुर्ग रक्षक (किला रक्षक)', 'దుర్గ రక్షకులు (కోట కాపలాదారులు)', 'ಕೋಟೆ ರಕ್ಷಕರು (ದುರ್ಗಪಾಲಕರು)', 'கோட்டைக் காவலர்கள்', 'दुर्ग रक्षक (किल्लेदार)', 'ଦୁର୍ଗ ରକ୍ଷକ (ଗଡ଼ ରକ୍ଷକ)', 'দুর্গ রক্ষক'),
        description: m8(
          'Defenders of hill forts (Giri-durga), water forts (Jala-durga like Kolletikota), and stone bastions (Barabati, Kondavidu, Udayagiri).',
          'गिरि-दुर्ग (कोंडावीडु, उदयगिरि), जल-दुर्ग (कोल्लेतिकोटा) और पाषाण दुर्गों (बाराबती) के रक्षक।',
          'గిరి దుర్గాలు (కొండవీడు, ఉదయగిరి), జల దుర్గాలు (కొల్లేటికోట) మరియు రాతి కోటల (బారాబతి) రక్షకులు.',
          'ಗಿರಿ ದುರ್ಗ (ಕೊಂಡವೀಡು), ಜಲ ದುರ್ಗ (ಕೊಲ್ಲೇಟಿಕೋಟ) ಮತ್ತು ಬಾರಾಬತಿ ಕೋಟೆಗಳ ರಕ್ಷಕರು.',
          'மலைக்கோட்டைகள் (கொண்டவீடு), நீர்க்கோட்டைகள் (கொல்லேட்டிகோட்டா) மற்றும் பாராபதி கோட்டைக் காவலர்கள்.',
          'गिरीदुर्ग (कोंडावीडू), जलदुर्ग (कोल्लेतिकोटा) आणि बाराबती किल्ल्याचे रक्षक.',
          'గిରି-ଦୁର୍ଗ (କୋଣ୍ଡାଭିଡୁ), ଜଳ-ଦୁର୍ଗ (କୋଲ୍ଲେତିକୋଟା) ଓ ବାରବାଟୀ ଦୁର୍ଗର ରକ୍ଷକ।',
          'গিরিদুর্গ (কোন্ডাভিডু), জলদুর্গ (কোল্লেতিকোটা) ও বারবাটি দুর্গের রক্ষক।'
        )
      },
      {
        id: 'sub_1_8',
        name: m8('Traditional Weapon Specialists', 'पारंपरिक शस्त्र विशेषज्ञ', 'సాంప్రదాయ ఆయుధ నిపుణులు', 'ಸಾಂಪ್ರದಾಯಿಕ ಶಸ್ತ್ರಾಸ್ತ್ರ ತಜ್ಞರು', 'பாரம்பரிய ஆயுத வல்லுநர்கள்', 'पारंपरिक शस्त्र तज्ज्ञ', 'ପାରମ୍ପରିକ ଅସ୍ତ୍ର ବିଶେଷଜ୍ଞ', 'ঐতিহ্যবাহী অস্ত্র বিশেষজ্ঞ'),
        description: m8(
          'Practitioners of the straight double-edged Khanda sword, Banka-churi, ढाल (shield), spear (Barcha/Kunta), and siege mining tools.',
          'दोधारी खंडा तलवार, बांका-छुरी, ढाल, भाला (बरछा/कुंता) और दुर्ग-भेदन उपकरणों के विशेषज्ञ।',
          'ఖండ (రెండు వైపులా పదునున్న కత్తి), డాలు, బల్లెం (కుంత) మరియు దుర్గ భేదన పరికరాల నిపుణులు.',
          'ಖಂಡ ಕತ್ತಿ, ಗುರಾಣಿ, ಭರ್ಜಿ ಮತ್ತು ಕೋಟೆ ಭೇದಿಸುವ ಸಾಧನಗಳ ಪರಿಣತರು.',
          'கண்டா வாள், கேடயம், வேல் மற்றும் முற்றுகைக் கருவிகளின் வல்லுநர்கள்.',
          'खंडा तलवार, ढाल, भाला आणि तटबंदी फोडणाऱ्या साधनांचे तज्ज्ञ.',
          'ଖଣ୍ଡା ତରବାରୀ, ଢାଲ, ବର୍ଚ୍ଛା ଓ ଦୁର୍ଗ-ଭେଦନ ଉପକରଣର ବିଶେଷଜ୍ଞ।',
          'খণ্ডা তরবারি, ঢাল, বর্শা ও দুর্গ-ভেদন সরঞ্জামের বিশেষজ্ঞ।'
        )
      },
      {
        id: 'sub_1_9',
        name: m8('Paika and Other Documented Regional Military Traditions', 'पाइक एवं अन्य प्रमाणित क्षेत्रीय सैन्य परंपराएँ', 'పైకా మరియు ఇతర నమోదిత ప్రాంతీయ సైనిక సంప్రదాయాలు', 'ಪೈಕಾ ಮತ್ತು ಇತರ ದಾಖಲಿತ ಪ್ರಾದೇಶಿಕ ಸೇನಾ ಸಂಪ್ರದಾಯಗಳು', 'பைக்கா மற்றும் ஆவணப்படுத்தப்பட்ட பிராந்தியப் படை மரபுகள்', 'पाइक आणि इतर नोंदवलेल्या प्रादेशिक लष्करी परंपरा', 'ପାଇକ ଓ ଅନ୍ୟାନ୍ୟ ପ୍ରମାଣିତ ଆଞ୍ଚଳିକ ସାମରିକ ପରମ୍ପରା', 'পাইক ও অন্যান্য নথিবদ্ধ আঞ্চলিক সামরিক ঐতিহ্য'),
        description: m8(
          'Peasant-militia and hereditary infantry institutions (Paika Akhada, Chasa-Paika, Khandayat-Paika) culminating in the 1804 and 1817 Khurda uprisings.',
          'पैदल सेना व कृषक-सैनिक संस्थाएँ (पाइक अखड़ा, चासा-पाइक, खंडायत-पाइक) और 1804 व 1817 के खुर्दा विद्रोह।',
          'రైతు-సైనిక వ్యవస్థలు (పైకా అఖాడా, చాసా-పైకా, ఖండాయత్-పైకా) మరియు 1804, 1817 ఖుర్దా తిరుగుబాట్లు.',
          'ರೈತ-ಸೈನಿಕ ಸಂಸ್ಥೆಗಳು (ಪೈಕಾ ಅಖಾಡ, ಚಾಸಾ-ಪೈಕಾ) ಮತ್ತು 1804, 1817ರ ಖುರ್ದಾ ಬಂಡಾಯ.',
          'விவசாய-படை அமைப்புகள் (பைக்கா அகாடா) மற்றும் 1804, 1817 குர்தா எழுச்சிகள்.',
          'शेतकरी-सैनिक संस्था (पाइक आखाडा) आणि १८०४ व १८१७ चे खुर्दा उठाव.',
          'ପାଇକ ଆଖଡ଼ା, ଚାଷା-ପାଇକ, ଖଣ୍ଡାୟତ-ପାଇକ ସଂଗଠନ ଏବଂ ୧୮୦୪ ଓ ୧୮୧୭ ଖୋର୍ଦ୍ଧା ବିଦ୍ରୋହ।',
          'পাইক আখড়া, চাষা-পাইক ও খণ্ডায়ত-পাইক সংগঠন এবং ১৮০৪ ও ১৮১৭ সালের খোর্ধা বিদ্রোহ।'
        )
      }
    ],
    definitionAndExplanation: m8(
      'This classification encompasses documented historical warriors, garrison commanders, military engineers, and regional martial lineages across ancient Kalinga-Odra, medieval Deccan, and North-Western India. Historical scholarship clearly distinguishes between epigraphically attested state armies (such as the Mahameghavahana, Eastern Ganga, and Suryavamsha Gajapathi forces), peasant-militia institutions (such as the Paika and Khandayat systems of Odisha), and pioneer-sapper construction corps who accompanied medieval armies to build roads, cut mountain passes, and fortify citadels.',
      'यह श्रेणी प्राचीन कलिंग-ओड्र, मध्यकालीन दक्कन और उत्तर-पश्चिम भारत के प्रमाणित ऐतिहासिक योद्धाओं, दुर्ग कमांडरों, सैन्य इंजीनियरों और क्षेत्रीय सामरिक वंशों को समाहित करती है। ऐतिहासिक शोध अभिलेखीय रूप से प्रमाणित राजकीय सेनाओं (महामेघवाहन, पूर्वी गंग, सूर्यवंशी गजपति), कृषक-सैनिक संस्थाओं (पाइक और खंडायत) और सैन्य अभियानों के साथ मार्ग व दुर्ग बनाने वाले सैन्य-अभियांत्रिकी दलों के बीच स्पष्ट अंतर करता है।',
      'ఈ వర్గీకరణ ప్రాచీన కళింగ-ఓడ్ర, మధ్యయుగ దక్కన్ మరియు వాయువ్య భారతదేశంలోని చారిత్రక యోధులు, దుర్గ రక్షకులు మరియు సైనిక ఇంజనీర్లను వివరిస్తుంది. శాసన ఆధారిత రాజ సైన్యాలు (మహామేఘవాహన, తూర్పు గంగ, సూర్యవంశ గజపతి), ఒడిశాలోని పైకా-ఖండాయత్ వ్యవస్థలు మరియు దండయాత్రలలో కోటలు, రహదారులు నిర్మించిన సైనిక-నిర్మాణ దళాల మధ్య చరిత్రకారులు స్పష్టమైన విభజన చేస్తారు.',
      'ಈ ವರ್ಗವು ಪ್ರಾಚೀನ ಕಳಿಂಗ-ಓಡ್ರ, ಮಧ್ಯಕಾಲೀನ ದಖನ್ ಮತ್ತು ವಾಯುವ್ಯ ಭಾರತದ ಐತಿಹಾಸಿಕ ಯೋಧರು, ಕೋಟೆ ದಂಡನಾಯಕರು ಮತ್ತು ಸೇನಾ ಎಂಜಿನಿಯರ್‌ಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಶಾಸನಬದ್ಧ ರಾಜಸೈನ್ಯಗಳು, ಪೈಕಾ-ಖಂಡಾಯತ್ ಪಡೆಗಳು ಮತ್ತು ಸೇನಾ ನಿರ್ಮಾಣ ದಳಗಳ ನಡುವೆ ಇತಿಹಾಸಕಾರರು ಸ್ಪಷ್ಟ ವ್ಯತ್ಯಾಸವನ್ನು ಗುರುತಿಸುತ್ತಾರೆ.',
      'இந்த வகைப்பாடு பண்டைய கலிங்க-ஒட்ர, இடைக்கால தக்காணம் மற்றும் வடமேற்கு இந்தியாவின் வரலாற்று வீரர்கள், கோட்டைத் தளபதிகள் மற்றும் படைப் பொறியாளர்களை உள்ளடக்கியது. கல்வெட்டுகளில் பதிவான அரச படைகள், பைக்கா-கண்டாயத் படைகள் மற்றும் கோட்டைக் கட்டுமானப் பிரிவுகள் ஆகியவற்றுக்கு இடையிலான வேறுபாடுகள் இதில் தெளிவுபடுத்தப்படுகின்றன.',
      'या वर्गात प्राचीन कलिंग-ओड्र, मध्ययुगीन दख्खन आणि वायव्य भारतातील ऐतिहासिक योद्धे, किल्लेदार आणि लष्करी अभियंते यांचा समावेश होतो. शिलालेखांत नोंदवलेल्या राज्य सेना, ओडिशातील पाइक-खंडायत पद्धती आणि लष्करी मोहिमांमध्ये किल्ले व मार्ग बांधणारे अभियांत्रिकी पथक यांत स्पष्ट फरक केला जातो.',
      'ଏହି ବର୍ଗରେ ପ୍ରାଚୀନ କଳିଙ୍ଗ-ଓଡ଼୍ର, ମଧ୍ୟଯୁଗୀୟ ଦାକ୍ଷିଣାତ୍ୟ ଓ ଉତ୍ତର-ପଶ୍ଚିମ ଭାରତର ପ୍ରମାଣିତ ଯୋଦ୍ଧା, ଦୁର୍ଗପତି ଓ ସାମରିକ କାରିଗର ଅନ୍ତର୍ଭୁକ୍ତ। ଶିଳାଲେଖ-ପ୍ରମାଣିତ ରାଜସେନା, ପାଇକ-ଖଣ୍ଡାୟତ ବାହିନୀ ଓ ଦୁର୍ଗ-ନିର୍ମାଣକାରୀ ସୈନ୍ୟ ଦଳ ମଧ୍ୟରେ ସ୍ପଷ୍ଟ ପାର୍ଥକ୍ୟ ରଖାଯାଇଛି।',
      'এই বিভাগে প্রাচীন কলিঙ্গ-ওড্র, মধ্যযুগীয় দাক্ষিণাত্য ও উত্তর-পশ্চিম ভারতের নথিবদ্ধ ঐতিহাসিক যোদ্ধা, দুর্গাপতি ও সামরিক প্রকৌশলীদের অন্তর্ভুক্ত করা হয়েছে। শিলালিপি-প্রত্যয়িত রাজকীয় সেনাবাহিনী, পাইক-খণ্ডায়ত বাহিনী এবং দুর্গ-নির্মাণকারী অগ্রগামী দলের মধ্যে স্পষ্ট পার্থক্য বজায় রাখা হয়েছে।'
    ),
    historicalBackground: m8(
      'From the Kalinga War (261 BCE) recorded in Ashoka’s Rock Edict XIII and Emperor Kharavela’s Hathigumpha inscription (c. 1st century BCE) to the Suryavamsha Gajapathi zenith under Kapilendra Deva (1434–1466 CE), the eastern seaboard maintained massive standing and auxiliary armies. During the 15th-century southern campaigns reaching Kondavidu, Udayagiri, and Srirangam (1464 CE), Odra military detachments and siege-engineering corps settled around strategic hill and water forts. Concurrently, in Odisha, landed militia lineages crystallized into Khandayat and Paika formations held on rent-free military tenure (Jagir/Paik-jagiri), while in Rajasthan, Sindh, and Punjab, Oad-Rajput clans preserved frontier martial traditions alongside hydraulic excavation.',
      'अशोक के तेरहवें शिलालेख (261 ई.पू. कलिंग युद्ध) और सम्राट खारवेल के हाथीगुंफा अभिलेख से लेकर सम्राट कपिलेन्द्र देव गजपति (1434–1466 ई.) के शासनकाल तक, पूर्वी भारत में विशाल सैन्य संगठन रहा। 15वीं शताब्दी के दक्षिणी अभियानों (कोंडावीडु, उदयगिरि, श्रीरंगम 1464 ई.) के दौरान सैन्य और दुर्ग-अभियांत्रिकी टुकड़ियाँ दक्षिण के सामरिक किलों के पास बस गईं। ओडिशा में कर-मुक्त सैन्य भूमि (पाइक-जागीर) पर आधारित खंडायत और पाइक परंपरा विकसित हुई, जबकि राजस्थान व पंजाब में ओड-राजपूत कुलों ने क्षत्रिय रीति-रिवाजों को संरक्षित रखा।',
      'అశోకుని 13వ శిలాశాసనం (కళింగ యుద్ధం 261 BCE) మరియు ఖారవేలుని హాథీగుంఫా శాసనం నుండి కపిలేంద్ర దేవ గజపతి (1434–1466 CE) వరకు తూర్పు తీరంలో బలమైన సైనిక వ్యవస్థ ఉండేది. 15వ శతాబ్దపు దక్షిణ దండయాత్రలలో కొండవీడు, ఉదయగిరి, శ్రీరంగం (1464 CE) వరకు సాగిన యాత్రలలో సైనిక మరియు దుర్గ నిర్మాణ దళాలు దక్కన్ కోటల వద్ద స్థిరపడ్డాయి.',
      'ಅಶೋಕನ 13ನೇ ಶಾಸನ (ಕಳಿಂಗ ಯುದ್ಧ 261 BCE) ಮತ್ತು ಖಾರವೇಲನ ಹಾಥೀಗುಂಫಾ ಶಾಸನದಿಂದ ಹಿಡಿದು ಕಪಿಲೇಂದ್ರ ದೇವ ಗಜಪತಿಯ (1434–1466 CE) ಕಾಲದವರೆಗೆ ಬಲಿಷ್ಠ ಸೇನಾ ಪರಂಪರೆ ಇತ್ತು. 15ನೇ ಶತಮಾನದ ದಕ್ಷಿಣ ದಂಡಯಾತ್ರೆಗಳಲ್ಲಿ ಕೊಂಡವೀಡು, ಉದಯಗಿರಿ ಮತ್ತು ಶ್ರೀರಂಗಂವರೆಗೆ ಸೇನಾ ತುಕಡಿಗಳು ನೆಲೆಗೊಂಡವು.',
      'அசோகரின் 13-வது பாறைக் கல்வெட்டு (கலிங்கப் போர் கி.மு. 261) மற்றும் காரவேலனின் ஹாத்திகும்பா கல்வெட்டு முதல் கபிலேந்திர தேவ கஜபதி (கி.பி. 1434–1466) காலம் வரை வலிமையான படை அமைப்பு இருந்தது. கொண்டவீடு, உதயகிரி மற்றும் ஸ்ரீரங்கம் (கி.பி. 1464) படையெடுப்புகளின் போது படைப்பிரிவுகள் தென்னிந்தியக் கோட்டைகளில் தங்கின.',
      'अशोकाच्या १३ व्या शिलालेखापासून (कलिंग युद्ध इ.स.पू. २६१) ते कपिलेन्द्र देव गजपती (१४३४–१४६६) यांच्या काळापर्यंत पूर्व भारतात प्रबळ लष्करी व्यवस्था होती. १५ व्या शतकातील दक्षिणेकडील मोहिमांमध्ये कोंडावीडू, उदयगिरी आणि श्रीरंगम येथे लष्करी व दुर्ग-बांधणी पथके स्थायिक झाली.',
      'ଅଶୋକଙ୍କ ୧୩ତମ ଶିଳାଲେଖ (କଳିଙ୍ଗ ଯୁଦ୍ଧ ୨୬୧ ଖ୍ରୀ.ପୂ.) ଓ ଖାରବେଳଙ୍କ ହାତୀଗୁମ୍ଫା ଅଭିଲେଖଠାରୁ କପିଳେନ୍ଦ୍ର ଦେବ ଗଜପତିଙ୍କ (୧୪୩୪–୧୪୬୬) ଶାସନ ପର୍ଯ୍ୟନ୍ତ ବିଶାଳ ସୈନ୍ୟ ବାହିନୀ ରହିଥିଲା।',
      'অশোকের ১৩তম শিলালিপি (কলিঙ্গ যুদ্ধ ২৬১ খ্রিস্টপূর্বাব্দ) ও খারবেলের হাতিগুম্ফা লিপি থেকে কপিলেন্দ্র দেব গজপতির (১৪৩৪–১৪৬৬ খ্রি.) আমল পর্যন্ত এক বিশাল সামরিক সংগঠন বিদ্যমান ছিল।'
    ),
    toolsMaterialsAndTechniques: m8(
      'Weapons and military equipment documented in Odisha, Andhra, and Deccan records include the straight double-edged Khanda sword, curved Talwar, Banka-churi dagger, rhinoceros-hide or iron shields (Dhal), iron-tipped bamboo lances (Barcha/Kunta), composite bows, war elephants carrying armored howdahs, and specialized siege-mining iron crowbars (Gaddapara) and stone-splitting wedges used to breach enemy ramparts or construct counter-fortifications.',
      'ओडिशा, आंध्र और दक्कन के अभिलेखों में वर्णित शस्त्रों में दोधारी खंडा तलवार, बांका-छुरी, ढाल, भाला (बरछा/कुंता), धनुष-बाण, कवचयुक्त गज-सेना तथा शत्रु की प्राचीर भेदने या किलेबंदी करने वाले लौह सब्बल (गड्डपारा) और पाषाण-छेनी शामिल हैं।',
      'రెండు వైపులా పదునున్న ఖండ కత్తి, బాంకా-చురి బాకు, డాలు, బల్లెం (కుంత), ధనుస్సు, గజదళం మరియు కోట గోడలను ఛేదించడానికి లేదా నిర్మించడానికి ఉపయోగించే ఇనుప గడ్డపారలు, ఉలి పరికరాలు ప్రధానమైనవి.',
      'ಎರಡು ಅಲುಗಿನ ಖಂಡ ಕತ್ತಿ, ಗುರಾಣಿ, ಭರ್ಜಿ, ಬಿಲ್ಲು-ಬಾಣ, ಗಜಪಡೆ ಮತ್ತು ಕೋಟೆ ಗೋಡೆಗಳನ್ನು ನಿರ್ಮಿಸಲು ಅಥವಾ ಭೇದಿಸಲು ಬಳಸುತ್ತಿದ್ದ ಕಬ್ಬಿಣದ ಹಾರೆಗಳು ಪ್ರಮುಖ ಸಾಧನಗಳಾಗಿದ್ದವು.',
      'இருபுறமும் கூர்மையான கண்டா வாள், கேடயம், ஈட்டி, வில்-அம்பு, யானைப்படை மற்றும் கோட்டை அரண்களை அமைக்கப் பயன்படும் இரும்பு கடப்பாறைகள் ஆகியவை முக்கிய ஆயுதங்களாகும்.',
      'दुधारी खंडा तलवार, ढाल, भाला, धनुष्यबाण, हत्तीदळ आणि तटबंदी उभारण्यासाठी किंवा भेदण्यासाठी वापरण्यात येणाऱ्या लोखंडी पहारी यांचा समावेश होतो.',
      'ଦୁଇଧାରୀ ଖଣ୍ଡା, ଢାଲ, ବର୍ଚ୍ଛା, ଧନୁଶର, ହସ୍ତୀବାହିନୀ ଓ ଦୁର୍ଗ ନିର୍ମାଣ/ଭେଦନ ପାଇଁ ବ୍ୟବହୃତ ଲৌହ ଶାବଳ ପ୍ରମୁଖ ଅସ୍ତ୍ର ଥିଲା।',
      'দুইধারী খণ্ডা তরবারি, ঢাল, বর্শা, ধনুর্বান, হস্তীবাহিনী এবং দুর্গ প্রাচীর নির্মাণের লৌহ শাবল ছিল প্রধান সামরিক সরঞ্জাম।'
    ),
    culturalAndRegionalSignificance: m8(
      'Martial traditions are celebrated during Vijayadashami (Ayudha Puja / Khanda Puja), Paika Akhada martial gymnastics in Odisha, hero-stone (Viragal) veneration in Karnataka and Andhra Pradesh, and the preservation of royal/martial titles such as Rajulu, Khandayat, Paika, Nayakkar, and Rajput.',
      'विजयादशमी पर आयुध पूजा (खंडा पूजा), ओडिशा में पाइक अखड़ा के सामरिक करतब, कर्नाटक व आंध्र में वीरगल (वीर-स्तंभ) पूजन, और राजुलु, खंडायत, पाइक, नायक्कर व राजपूत जैसी उपाधियों में यह सामरिक संस्कृति जीवित है।',
      'విజయదశమి నాడు ఆయుధ పూజ (ఖండ పూజ), ఒడిశాలో పైకా అఖాడా విన్యాసాలు, కర్ణాటక-ఆంధ్రలలో వీరగల్లుల ఆరాధన మరియు రాజులు, ఖండాయత్, పైకా, నాయక్కర్, రాజ్‌పుత్ బిరుదులలో ఈ సైనిక సంస్కృతి కనిపిస్తుంది.',
      'ವಿಜಯದಶಮಿಯ ಆಯುಧ ಪೂಜೆ, ಒಡಿಶಾದ ಪೈಕಾ ಅಖಾಡ, ಕರ್ನಾಟಕ-ಆಂಧ್ರದ ವೀರಗಲ್ಲು ಆರಾಧನೆ ಮತ್ತು ರಾಜುಲು, ಖಂಡಾಯತ್, ಪೈಕಾ, ನಾಯ್ಕರ್ ಬಿರುದುಗಳಲ್ಲಿ ಈ ಪರಂಪರೆ ಉಳಿದಿದೆ.',
      'விஜயதசமி ஆயுத பூஜை, ஒடிசாவின் பைக்கா அகாடா, வீரக்கல் வழிபாடு மற்றும் ராஜுலு, கண்டாயத், நாயக்கர், ராஜ்புத் பட்டங்களில் இம்மரபு போற்றப்படுகிறது.',
      'विजयादशमीला शस्त्रपूजा (खंडा पूजा), ओडिशातील पाइक आखाडा, वीरगळ पूजन आणि राजुलु, खंडायत, पाइक, नायक्कर व राजपूत या पदव्यांमध्ये हा वारसा जपला जातो.',
      'ବିଜୟାଦଶମୀରେ ଅସ୍ତ୍ରପୂଜା (ଖଣ୍ଡା ପୂଜା), ପାଇକ ଆଖଡ଼ା, ବୀରଗଲ୍ ପୂଜା ଏବଂ ରାଜୁଲୁ, ଖଣ୍ଡାୟତ, ପାଇକ ଓ ରାଜପୁତ ଉପାଧିରେ ଏହି ପରମ୍ପରା ଜୀବିତ।',
      'বিজয়াদশমীতে অস্ত্রপূজা (খণ্ডা পূজা), পাইক আখড়া, বীরগল স্তম্ভ পূজা এবং রাজুলু, খণ্ডায়ত, পাইক ও রাজপুত উপাধিতে এই ঐতিহ্য সংরক্ষিত।'
    ),
    documentedHistoricalExamples: m8(
      '1. Hathigumpha Inscription of Kharavela (Udayagiri, c. 1st century BCE) recording pan-Indian campaigns.\n2. Veligalani Copper Plates (1458 CE) and Srirangam Inscription of Kumara Hamvira Deva (1464 CE).\n3. Hero stone (Viragal) of Balavaddiraju in the Deccan plateau.\n4. Khurda Paika Rebellion (1817 CE) led by Bakshi Jagabandhu Bidyadhar Mahapatra Bhramarabara Rai.',
      '1. सम्राट खारवेल का हाथीगुंफा अभिलेख (प्रथम शताब्दी ई.पू.)।\n2. कपिलेन्द्र देव का वेलिगलानी ताम्रपत्र (1458 ई.) और कुमार हम्मीर देव का श्रीरंगम शिलालेख (1464 ई.)।\n3. दक्कन में बालवड्डीराजू का ऐतिहासिक वीरगल (वीर-पाषाण)।\n4. बख्शी जगबंधु के नेतृत्व में 1817 ई. का खुर्दा पाइक विद्रोह।',
      '1. ఖారవేలుని హాథీగుంఫా శాసనం (క్రీ.పూ. 1వ శతాబ్దం).\n2. కపిలేంద్ర దేవుని వెలిగలని తామ్రపత్రం (1458 CE) మరియు కుమార హంవీర దేవుని శ్రీరంగం శాసనం (1464 CE).\n3. బాలవడ్డిరాజు వీరగల్లు శాసనం.\n4. బక్షి జగబంధు నేతృత్వంలోని 1817 ఖుర్దా పైకా తిరుగుబాటు.',
      '1. ಖಾರವೇಲನ ಹಾಥೀಗುಂಫಾ ಶಾಸನ.\n2. ಕಪಿಲೇಂದ್ರ ದೇವನ ವೆಲಿಗಲನಿ ತಾಮ್ರಶಾಸನ (1458 CE) ಮತ್ತು ಶ್ರೀರಂಗಂ ಶಾಸನ (1464 CE).\n3. ಬಾಲವಡ್ಡಿರಾಜು ವೀರಗಲ್ಲು ಸ್ಮಾರಕ.\n4. ಬಕ್ಷಿ ಜಗಬಂಧು ನೇತೃತ್ವದ 1817ರ ಖುರ್ದಾ ಪೈಕಾ ಬಂಡಾಯ.',
      '1. காரவேலனின் ஹாத்திகும்பா கல்வெட்டு.\n2. வெலிகலனி செப்பேடு (கி.பி. 1458) மற்றும் ஸ்ரீரங்கம் கல்வெட்டு (கி.பி. 1464).\n3. பாலவட்டிராஜு வீரக்கல்.\n4. பக்ஷி ஜகபந்து தலைமையிலான 1817 குர்தா பைக்கா புரட்சி.',
      '१. खारवेल यांचा हाथीगुंफा शिलालेख.\n२. वेलिगलानी ताम्रपट (१४५८) आणि श्रीरंगम शिलालेख (१४६४).\n३. बालवड्डीराजू वीरगळ शिलालेख.\n४. बख्शी जगबंधू यांच्या नेतृत्वाखालील १८१७ चा खुर्दा पाइक उठाव.',
      '୧. ଖାରବେଳଙ୍କ ହାତୀଗୁମ୍ଫା ଅଭିଲେଖ।\n୨. ୧୪୫୮ର ଭେലിଗଲାନି ତାମ୍ରଫଳକ ଓ ୧୪୬୪ର ଶ୍ରୀରଙ୍ଗମ ଶିଳାଲେଖ।\n୩. ବାଳଭଡ୍ଡିରାଜୁଙ୍କ ବୀରଗଲ୍ ସ୍ତମ୍ଭ।\n୪. ବକ୍ସି ଜଗବନ୍ଧୁଙ୍କ ନେତୃତ୍ୱରେ ୧୮୧୭ ପାଇକ ବିଦ୍ରୋହ।',
      '১. খারবেলের হাতিগুম্ফা শিলালিপি।\n২. ভেলিগলানি তাম্রশাসন (১৪৫৮ খ্রি.) ও শ্রীরঙ্গম শিলালিপি (১৪৬৪ খ্রি.)।\n৩. বালভড্ডিরাজুর বীরগল শিলাস্তম্ভ।\n৪. বক্সী জগবন্ধুর নেতৃত্বে ১৮১৭ সালের পাইক বিদ্রোহ।'
    ),
    contributionsToSociety: m8(
      'Defense of regional sovereignty, safeguarding of trade routes and temple towns, establishment of fortified water reservoirs (Jala-durgas and fort tanks), and resistance against early colonial revenue dispossession.',
      'क्षेत्रीय संप्रभुता की रक्षा, व्यापारिक मार्गों व मंदिर नगरों की सुरक्षा, दुर्ग जलाशयों (जल-दुर्ग) का निर्माण और औपनिवेशिक शोषण के विरुद्ध सशस्त्र प्रतिरोध।',
      'ప్రాంతీయ సార్వభౌమత్వ రక్షణ, వర్తక మార్గాలు మరియు దేవాలయ నగరాల భద్రత, జలదుర్గాల నిర్మాణం మరియు వలస పాలనపై పోరాటం.',
      'ಪ್ರಾದೇಶಿಕ ಸಾರ್ವಭೌಮತ್ವದ ರಕ್ಷಣೆ, ವ್ಯಾಪಾರ ಮಾರ್ಗಗಳ ಭದ್ರತೆ, ಜಲದುರ್ಗಗಳ ನಿರ್ಮಾಣ ಮತ್ತು ವಸಾಹತುಶಾହି ವಿರುದ್ಧ ಹೋರಾಟ.',
      'பிராந்திய இறையாண்மைப் பாதுகாப்பு, வணிகப் பாதைகள் மற்றும் கோயில் நகரங்களின் காவல், நீர்க்கோட்டைகள் அமைத்தல்.',
      'प्रादेशिक सार्वभौमत्वाचे रक्षण, व्यापारी मार्ग व मंदिरांची सुरक्षा, जलदुर्ग उभारणी आणि वसाहतवादी शोषणाविरुद्ध लढा.',
      'ଆଞ୍ଚଳିକ ସାର୍ବଭୌମତ୍ୱ ରକ୍ଷା, ମନ୍ଦିର ଓ ବାଣିଜ୍ୟ ପଥର ସୁରକ୍ଷା, ଜଳ-ଦୁର୍ଗ ନିର୍ମାଣ ଏବଂ ଉପନିବେଶବାଦୀ ଶାସନ ବିରୁଦ୍ଧରେ ସଂଗ୍ରାମ।',
      'আঞ্চলিক সার্বভৌমত্ব রক্ষা, বাণিজ্য পথ ও মন্দির নগরীর নিরাপত্তা, জলদুর্গ নির্মাণ এবং ঔপনিবেশিক শাসনের বিরুদ্ধে প্রতিরোধ।'
    ),
    communitySpecificConnectionsAndDistinctions: m8(
      'Historical evidence does not assign the exact same military role to every community listed in this directory. Specifically:\n• OD-Khandayath and OD-Paika are directly documented in Odisha’s medieval Madala Panji and British revenue records (Stirling 1822; Hunter 1872) as landed feudal militia and infantry corps.\n• KalingaRajulu, VaddiRajulu, VadderaRajulu, and Odda-Nayakkar preserve South Indian martial and chieftaincy traditions tied to Kalinga-Gajapathi and Vijayanagara-Nayaka campaigns.\n• Od-Rajputh reflects North-Western Rajput-aligned clan structures.\n• By contrast, communities recorded primarily as stone-quarry or earthwork specialists in colonial censuses had distinct occupational trajectories, even where oral traditions preserve memories of ancestor service in fort garrisons.',
      'ऐतिहासिक साक्ष्य इस निर्देशिका के प्रत्येक समुदाय को एक ही सैन्य इतिहास आवंटित नहीं करते:\n• ओड-खंडायत और ओड-पाइक ओडिशा के मादला पंजी और ब्रिटिश राजस्व अभिलेखों में सैन्य-जागीरदार व पैदल सेना के रूप में दर्ज हैं।\n• कलिंगराजुलु, वड्डीराजुलु, वड्डेराराजुलु और ओड्डा-नायक्कर दक्षिण भारतीय गजपति व विजयनगर-नायक सैन्य अभियानों से जुड़ी परंपराएँ रखते हैं।\n• ओड-राजपूत उत्तर-पश्चिमी राजपूत कुल संरचनाओं से संबद्ध हैं।',
      'ఈ డైరెక్టరీలోని ప్రతి సమాజానికి ఒకే సైనిక చరిత్రను యాంత్రికంగా ఆపాదించరాదు:\n• ఓడ్-ఖండాయత్ మరియు ఓడ్-పైకా ఒడిశా మదలా పంజీ మరియు బ్రిటిష్ రెవెన్యూ రికార్డులలో సైనిక విభాగాలుగా నమోదయ్యాయి.\n• కళింగరాజులు, వడ్డిరాజులు, వడ్డెరరాజులు మరియు ఒడ్డ-నాయక్కర్ దక్షిణ భారత గజపతి, విజయనగర-నాయక సైనిక సేవలతో ముడిపడి ఉన్నాయి.\n• ఓడ్-రాజ్‌పుత్ వాయువ్య భారత రాజపుత్ర సంప్రదాయాలను కలిగి ఉంది.',
      'ಈ ನಿರ್ದೇಶಿಕೆಯಲ್ಲಿರುವ ಪ್ರತಿಯೊಂದು ಸಮುದಾಯಕ್ಕೂ ಒಂದೇ ಸೇನಾ ಇತಿಹಾಸವನ್ನು ಅನ್ವಯಿಸಲಾಗುವುದಿಲ್ಲ:\n• ಓಡ್-ಖಂಡಾಯತ್ ಮತ್ತು ಓಡ್-ಪೈಕಾ ಒಡಿಶಾದ ದಾಖಲೆಗಳಲ್ಲಿ ಸೇನಾ ಪಡೆಯಾಗಿ ದಾಖಲಾಗಿವೆ.\n• ಕಳಿಂಗರಾಜುಲು, ವಡ್ಡಿರಾಜುಲು ಮತ್ತು ಒಡ್ಡ-ನಾಯ್ಕರ್ ದಕ್ಷಿಣ ಭಾರತದ ಗಜಪತಿ ಮತ್ತು ವಿಜಯನಗರ ಸೇನಾ ಪರಂಪರೆಗೆ ಸಂಬಂಧಿಸಿವೆ.\n• ಓಡ್-ರಜಪೂತ್ ವಾಯುವ್ಯ ಭಾರತದ ರಜಪೂತ ಪರಂಪರೆಯನ್ನು ಹೊಂದಿದೆ.',
      'இப்பட்டியலில் உள்ள அனைத்து சமூகங்களுக்கும் ஒரே படை வரலாற்றைப் பொருத்த முடியாது:\n• ஓட்-கண்டாயத் மற்றும் ஓட்-பைக்கா ஒடிசாவின் ஆவணங்களில் படைப்பிரிவுகளாகப் பதிவாகியுள்ளன.\n• கலிங்கராஜுலு, வட்டிராஜுலு மற்றும் ஒட்ட-நாயக்கர் தென்னிந்திய கஜபதி மற்றும் நாயக்கர் காலப் படை மரபுகளுடன் தொடர்புடையவை.',
      'या निर्देशिकेतील प्रत्येक समाजाला एकच लष्करी इतिहास लागू होत नाही:\n• ओड-खंडायत आणि ओड-पाइक हे ओडिशाच्या नोंदींत लष्करी घराणी म्हणून प्रमाणित आहेत.\n• कलिंगराजुलु, वड्डीराजुलु आणि ओड्डा-नायक्कर हे दक्षिणेतील गजपती व विजयनगर-नायक मोहिमांशी संबंधित आहेत.',
      'ସମସ୍ତ ସମୁଦାୟଙ୍କୁ ଗୋଟିଏ ସାମରିକ ଇତିହାସ ଦିଆଯାଇପାରିବ ନାହିଁ:\n• ଓଡ଼-ଖଣ୍ଡାୟତ ଓ ଓଡ଼-ପାଇକ ଓଡ଼ିଶାର ଐତିହାସିକ ଦସ୍ତାବିଜରେ ସାମରିକ ବର୍ଗ ଭାବେ ପ୍ରମାଣିତ।\n• କଳିଙ୍ଗରାଜୁଲୁ ଓ ଭଡ୍ଡିରାଜୁଲୁ ଦକ୍ଷିଣ ଭାରତୀୟ ଦୁର୍ଗ ପରମ୍ପରା ସହ ସମ୍ପୃକ୍ତ।',
      'তালিকাভুক্ত প্রতিটি সম্প্রদায়কে একই সামরিক ইতিহাস আরোপ করা যায় না:\n• ওড-খণ্ডায়ত ও ওড-পাইক ওড়িশার নথিতে সামরিক বাহিনী হিসেবে প্রত্যয়িত।\n• কলিঙ্গরাজুলু ও ভড্ডিরাজুলু দক্ষিণ ভারতীয় দুর্গ ঐতিহ্যের সাথে যুক্ত।'
    ),
    epistemicAndMethodologicalNote: m8(
      'Methodological Note: Epigraphic records of royal armies and hero stones are distinguished from oral community ballads and colonial-era martial-race classifications. Professional martial heritage is an analytical historical category, not a mandatory hereditary occupation.',
      'कार्यप्रणाली टिप्पणी: राजकीय सेनाओं के शिलालेखों और वीर-स्तंभों को मौखिक लोकगाथाओं से अलग रखा गया है। यह एक ऐतिहासिक वर्गीकरण है, न कि किसी समुदाय के प्रत्येक सदस्य के लिए अनिवार्य व्यवसाय।',
      'పరిశోధనా గమనిక: శాసన ఆధారాలను మౌఖిక గాథల నుండి వేరుగా చూపడం జరిగింది. ఇది చారిత్రక వర్గీకరణ మాత్రమే.',
      'ಸಂಶೋಧನಾ ಸೂಚನೆ: ಶಾಸನ ಆಧಾರಗಳನ್ನು ಮೌಖಿಕ ಪರಂಪರೆಯಿಂದ ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆ. ಇದು ಐತಿಹಾಸಿಕ ವರ್ಗೀಕರಣವೇ ಹೊರತು ಕಡ್ಡಾಯ ವೃತ್ತಿಯಲ್ಲ.',
      'ஆய்வுக் குறிப்பு: கல்வெட்டுச் சான்றுகள் வாய்மொழி மரபுகளிலிருந்து வேறுபடுத்தப்பட்டுள்ளன. இது ஒரு வரலாற்று வகைப்பாடு மட்டுமே.',
      'संशोधन टीप: शिलालेखीय पुरावे आणि मौखिक परंपरा यांत स्पष्ट फरक ठेवला आहे. हे केवळ ऐतिहासिक वर्गीकरण आहे.',
      'ଗବେଷଣା ଟିପ୍ପଣୀ: ଶିଳାଲେଖ ପ୍ରମାଣକୁ ମୌଖିକ ପରମ୍ପରାଠାରୁ ପୃଥକ କରାଯାଇଛି।',
      'পদ্ধতিগত নোট: শিলালিপি প্রমাণকে মৌখিক ঐতিহ্য থেকে পৃথক রাখা হয়েছে।'
    ),
    visualAssets: [
      {
        id: 'vis_prof_1_hero_stone',
        imageUrl: ARCHIVE_IMG('balavaddiraju_hero_stone.jpg'),
        visualType: 'Archaeological Photograph',
        historicalPeriod: 'Medieval Deccan / Gajapathi-Vijayanagara Era (14th–16th Century CE)',
        title: m8(
          'Hero Stone (Viragal) of Balavaddiraju & Deccan Martial Memorials',
          'बालवड्डीराजू का वीरगल (वीर-स्तंभ) एवं दक्कन के सामरिक स्मारक',
          'బాలవడ్డిరాజు వీరగల్లు మరియు దక్కన్ సైనిక స్మారక శిలలు',
          'ಬಾಲವಡ್ಡಿರಾಜು ವೀರಗಲ್ಲು ಮತ್ತು ದಖನ್ ಸೇನಾ ಸ್ಮಾರಕಗಳು',
          'பாலவட்டிராஜு வீரக்கல் மற்றும் தக்காணப் போர் நினைவுச்சின்னங்கள்',
          'बालवड्डीराजू वीरगळ आणि दख्खनमधील लष्करी स्मारके',
          'ବାଳଭଡ୍ଡିରାଜୁଙ୍କ ବୀରଗଲ୍ ସ୍ତମ୍ଭ ଓ ଦାକ୍ଷିଣାତ୍ୟ ସାମରିକ ସ୍ମାରକୀ',
          'বালভড্ডিরাজুর বীরগল প্রস্তর ও দাক্ষিণাত্যের সামরিক স্মারক'
        ),
        caption: m8(
          'Commemorative stone relief (Viragal) honoring martial valor in fortress defense across the Deccan plateau.',
          'दक्कन के पठार में दुर्ग रक्षा के दौरान प्रदर्शित शौर्य की स्मृति में स्थापित वीरगल पाषाण फलक।',
          'దక్కన్ పీఠభూమిలో కోటల రక్షణలో వీరమరణం పొందిన యోధుల జ్ఞాపకార్థం నిలిపిన వీరగల్లు శాసన శిల్పం.',
          'ದಖನ್ ಪ್ರಸ್ಥಭೂಮಿಯಲ್ಲಿ ಕೋಟೆ ರಕ್ಷಣೆಯ ಶೌರ್ಯವನ್ನು ಸ್ಮರಿಸುವ ವೀರಗಲ್ಲು ಶಿಲ್ಪ.',
          'தக்காண பீடபூமியில் கோட்டைப் பாதுகாப்பில் வீரமரணம் அடைந்தவர்களைப் போற்றும் வீரக்கல் சிற்பம்.',
          'दख्खनच्या पठारावर दुर्ग रक्षणातील शौर्याची साक्ष देणारी वीरगळ शिळा.',
          'ଦାକ୍ଷିଣାତ୍ୟରେ ଦୁର୍ଗ ରକ୍ଷା ଶୌର୍ଯ୍ୟର ସ୍ମାରକୀ ବୀରଗଲ୍ ଶିଳ୍ପ।',
          'দাক্ষিণাত্যে দুর্গ রক্ষায় বীরত্বের স্মারক বীরগল প্রস্তর ফলক।'
        ),
        altText: m8(
          'Carved stone Viragal memorial depicting a warrior with sword and shield',
          'तलवार और ढाल लिए योद्धा को दर्शाता उत्कीर्ण वीरगल पाषाण स्मारक',
          'కత్తి, డాలు ధరించిన యోధుని వీరగల్లు రాతి శిల్పం',
          'ಕತ್ತಿ ಮತ್ತು ಗುರಾಣಿ ಹಿಡಿದ ಯೋಧನ ವೀರಗಲ್ಲು ಶಿಲ್ಪ',
          'வாள் மற்றும் கேடயம் ஏந்திய வீரனின் வீரக்கல் சிற்பம்',
          'तलवार आणि ढाल घेतलेल्या योद्ध्याची वीरगळ शिळा',
          'ଖଣ୍ଡା ଓ ଢାଲ ଧରିଥିବା ଯୋଦ୍ଧାଙ୍କ ବୀରଗଲ୍ ଶିଳ୍ପ',
          'তরবারি ও ঢাল হাতে যোদ্ধার খোদাই করা বীরগল প্রস্তর'
        ),
        sourceAttribution: 'Suryavamsha Digital Archive / South Indian Epigraphic & Hero-Stone Documentation',
        licenseInfo: 'Archival Educational & Documentary Use (Public Domain / Heritage Archive)'
      },
      {
        id: 'vis_prof_1_paika',
        imageUrl: ARCHIVE_IMG('baxi_jagabandhu_statue.jpg'),
        visualType: 'Architectural Monument',
        historicalPeriod: 'Early Modern / 1817 CE Khurda Paika Uprising Commemoration',
        title: m8(
          'Memorial Statue of Bakshi Jagabandhu Bidyadhar (Leader of the 1817 Paika Rebellion)',
          'बख्शी जगबंधु विद्याधर (1817 पाइक विद्रोह के नायक) की स्मारक प्रतिमा',
          'బక్షి జగబంధు విద్యాధర్ (1817 పైకా తిరుగుబాటు సేనాని) స్మారక విగ్రహం',
          'ಬಕ್ಷಿ ಜಗಬಂಧು ವಿದ್ಯಾಧರ್ (1817ರ ಪೈಕಾ ಬಂಡಾಯದ ನಾಯಕ) ಸ್ಮಾರಕ ಪ್ರತಿಮೆ',
          'பக்ஷி ஜகபந்து வித்யாதர் (1817 பைக்கா புரட்சித் தலைவர்) நினைவுச் சிலை',
          'बख्शी जगबंधू विद्याधर (१८१७ पाइक उठावाचे नेते) यांचा स्मारक पुतळा',
          'ବକ୍ସି ଜଗବନ୍ଧୁ ବିଦ୍ୟାଧର (୧୮୧୭ ପାଇକ ବିଦ୍ରୋହର ମହାନାୟକ)ଙ୍କ ପ୍ରତିମୂର୍ତ୍ତି',
          'বক্সী জগবন্ধু বিদ্যাধর (১৮১৭ পাইক বিদ্রোহের নায়ক)-এর স্মারক মূর্তি'
        ),
        caption: m8(
          'Monument honoring Bakshi Jagabandhu, hereditary commander (Buxi) of the Khurda Paika and Khandayat militia forces in Odisha.',
          'ओडिशा के खुर्दा पाइक और खंडायत सैन्य बलों के वंशानुगत सेनापति (बख्शी) जगबंधु के सम्मान में स्मारक।',
          'ఒడిశాలోని ఖుర్దా పైకా మరియు ఖండాయత్ సైనిక దళాల సర్వసైన్యాధ్యక్షుడు బక్షి జగబంధు స్మారక చిహ్నం.',
          'ಒಡಿಶಾದ ಖುರ್ದಾ ಪೈಕಾ ಮತ್ತು ಖಂಡಾಯತ್ ಪಡೆಗಳ ದಂಡನಾಯಕ ಬಕ್ಷಿ ಜಗಬಂಧು ಅವರ ಸ್ಮಾರಕ.',
          'ஒடிசாவின் குர்தா பைக்கா மற்றும் கண்டாயத் படைகளின் தளபதி பக்ஷி ஜகபந்துவின் நினைவுச் சின்னம்.',
          'ओडिशातील खुर्दा पाइक व खंडायत सैन्याचे सेनापती बख्शी जगबंधू यांचे स्मारक.',
          'ଖୋର୍ଦ୍ଧା ପାଇକ ଓ ଖଣ୍ଡାୟତ ବାହିନୀର ସେନାପତି ବକ୍ସି ଜଗବନ୍ଧୁଙ୍କ ସ୍ମାରକୀ।',
          'খোর্ধা পাইক ও খণ্ডায়ত বাহিনীর সেনাপতি বক্সী জগবন্ধুর স্মারক।'
        ),
        altText: m8(
          'Bronze memorial statue of warrior commander Bakshi Jagabandhu brandishing a sword',
          'तलवार लिए सेनापति बख्शी जगबंधु की कांस्य स्मारक प्रतिमा',
          'కత్తి చేతబట్టిన సేనాని బక్షి జగబంధు కాంస్య విగ్రహం',
          'ಕತ್ತಿ ಹಿಡಿದ ಸೇنانಾಯಕ ಬಕ್ಷಿ ಜಗಬಂಧು ಕಂಚಿನ ಪ್ರತಿಮೆ',
          'வாள் ஏந்திய தளபதி பக்ஷி ஜகபந்துவின் வெண்கலச் சிலை',
          'तलवार उंचावलेला बख्शी जगबंधू यांचा कांस्य पुतळा',
          'ଖଣ୍ଡା ଧରିଥିବା ବକ୍ସି ଜଗବନ୍ଧୁଙ୍କ ପ୍ରତିମୂର୍ତ୍ତି',
          'তরবারি হাতে সেনাপতি বক্সী জগবন্ধুর ব্রোঞ্জ মূর্তি'
        ),
        sourceAttribution: 'Odisha State Museum / Bhubaneswar Heritage Archive',
        licenseInfo: 'Educational & Historical Documentation Use'
      }
    ],
    relatedArticles: [
      {
        id: 'rel_w_1',
        targetType: 'internal_route',
        targetIdOrPath: '/kalinga-war',
        label: m8('Kalinga War (261 BCE) & Military Resistance', 'कलिंग युद्ध (261 ई.पू.) एवं सैन्य प्रतिरोध', 'కళింగ యుద్ధం (261 BCE) & సైనిక ప్రతిఘటన', 'ಕಳಿಂಗ ಯುದ್ಧ (261 BCE) ಮತ್ತು ಸೇನಾ ಪ್ರತಿರೋಧ', 'கலிங்கப் போர் (கி.மு. 261) மற்றும் படை எதிர்ப்பு', 'कलिंग युद्ध (इ.स.पू. २६१) आणि लष्करी प्रतिकार', 'କଳିଙ୍ଗ ଯୁଦ୍ଧ (୨୬୧ ଖ୍ରୀ.ପୂ.) ଓ ସାମରିକ ପ୍ରତିରୋଧ', 'কলিঙ্গ যুদ্ধ (২৬১ খ্রিস্টপূর্বাব্দ) ও সামরিক প্রতিরোধ'),
        categoryBadge: m8('Military History', 'सैन्य इतिहास', 'సైనిక చరిత్ర', 'ಸೇನಾ ಇತಿಹಾಸ', 'படை வரலாறு', 'लष्करी इतिहास', 'ସାମରିକ ଇତିହାସ', 'সামরিক ইতিহাস')
      },
      {
        id: 'rel_w_2',
        targetType: 'internal_route',
        targetIdOrPath: '/gajapathi-kings',
        label: m8('Suryavamsha Gajapathi Kingdom & Imperial Campaigns', 'सूर्यवंशी गजपति साम्राज्य एवं सैन्य अभियान', 'సూర్యవంశ గజపతి సామ్రాజ్యం & దండయాత్రలు', 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ದಂಡಯಾತ್ರೆಗಳು', 'சூர்யவம்ச கஜபதி பேரரசு மற்றும் படையெடுப்புகள்', 'सूर्यवंशी गजपती साम्राज्य आणि लष्करी मोहिमा', 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ ଓ ସାମରିକ ଅଭିଯାନ', 'সূর্যবংশী গজপতি সাম্রাজ্য ও সামরিক অভিযান'),
        categoryBadge: m8('Dynastic Polity', 'राजवंश', 'రాజవంశం', 'ರಾಜವಂಶ', 'அரச வம்சம்', 'राजवंश', 'ରାଜବଂଶ', 'রাজবংশ')
      },
      {
        id: 'rel_w_3',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_05_od_khandayath',
        label: m8('OD-Khandayath Community Article', 'ओड-खंडायत समुदाय लेख', 'ఓడ్-ఖండాయత్ సమాజ వ్యాసం', 'ಓಡ್-ಖಂಡಾಯತ್ ಸಮುದಾಯ ಲೇಖನ', 'ஓட்-கண்டாயத் சமூகக் கட்டுரை', 'ओड-खंडायत समाज लेख', 'ଓଡ଼-ଖଣ୍ଡାୟତ ସମୁଦାୟ ଲେଖା', 'ওড-খণ্ডায়ত সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_w_4',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_07_od_paika',
        label: m8('OD-Paika Community Article', 'ओड-पाइक समुदाय लेख', 'ఓడ్-పైకా సమాజ వ్యాసం', 'ಓಡ್-ಪೈಕಾ ಸಮುದಾಯ ಲೇಖನ', 'ஓட்-பைக்கா சமூகக் கட்டுரை', 'ओड-पाइक समाज लेख', 'ଓଡ଼-ପାଇକ ସମୁଦାୟ ଲେଖା', 'ওড-পাইক সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      }
    ],
    relatedKeywords: ['Historical Warriors', 'OD-Khandayath', 'OD-Paika', 'Od-Rajputh', 'KalingaRajulu', 'VaddiRajulu', 'Gajapathulu', 'Kalinga History'],
    references: [
      {
        citation: 'Subrahmanyam, R. (1957). The Suryavamsi Gajapatis of Orissa. Andhra University, Waltair.',
        type: 'Academic Monograph'
      },
      {
        citation: 'Stirling, A. (1822). An Account, Geographical, Statistical and Historical of Orissa Proper, or Cuttack. Asiatic Researches, Vol. XV.',
        type: 'Colonial Gazetteer / Census'
      },
      {
        citation: 'Epigraphia Indica, Vol. XXVIII (Veligalani Plates of Kapilendra Deva, Saka 1380 / 1458 CE).',
        type: 'Epigraphic Record'
      }
    ]
  },
  {
    id: 'prof_cat_2_agriculture',
    slug: 'agriculture-and-agricultural-heritage',
    categoryNumber: 2,
    codeLabel: 'Category 2',
    title: m8(
      'Category 2: Agriculture and Agricultural Heritage',
      'श्रेणी 2: कृषि एवं कृषक विरासत',
      'వర్గం 2: వ్యవసాయం మరియు వ్యవసాయ వారసత్వం',
      'ವರ್ಗ 2: ಕೃಷಿ ಮತ್ತು ಕೃಷಿ ಪರಂಪರೆ',
      'வகை 2: வேளாண்மை மற்றும் விவசாயப் பாரம்பரியம்',
      'वर्ग २: कृषी आणि शेतकरी वारसा',
      'ବର୍ଗ ୨: କୃଷି ଓ କୃଷକ ଐତିହ୍ୟ',
      'বিভাগ ২: কৃষি ও কৃষিভিত্তিক ঐতিহ্য'
    ),
    shortSummary: m8(
      'Traditional farmers, wet-rice and dryland cultivation, tank-fed irrigation management, village agrarian economy, and indigenous agricultural knowledge across the Mahanadi, Godavari, Krishna, and Kaveri deltas.',
      'महानदी, गोदावरी, कृष्णा और कावेरी डेल्टाओं में पारंपरिक कृषक, धान व शुष्क-भूमि खेती, तालाब-आधारित सिंचाई प्रबंधन, ग्रामीण अर्थव्यवस्था और स्वदेशी कृषि ज्ञान।',
      'మహానది, గోదావరి, కృష్ణా మరియు కావేరి డెల్టాలలో సాంప్రదాయ రైతులు, వరి మరియు మెట్ట సాగు, చెరువు ఆధారిత సాగునీటి యాజమాన్యం మరియు గ్రామీణ వ్యవసాయ విజ్ఞానం.',
      'ಮಹಾನದಿ, ಗೋದಾವರಿ, ಕೃಷ್ಣಾ ಮತ್ತು ಕಾವೇರಿ ಮುಖಜ ಭೂಮಿಗಳಲ್ಲಿ ಸಾಂಪ್ರದಾಯಿಕ ರೈತರು, ಭತ್ತ ಮತ್ತು ಒಣಭೂಮಿ ಬೇಸಾಯ, ಕೆರೆ ನೀರಾವರಿ ನಿರ್ವಹಣೆ ಮತ್ತು ಗ್ರಾಮೀಣ ಕೃಷಿ ಜ್ଞಾನ.',
      'மகாநதி, கோதாவரி, கிருஷ்ணா மற்றும் காவிரி டெல்டாக்களில் பாரம்பரிய விவசாயிகள், நெல் சாகுபடி, ஏரிப் பாசன மேலாண்மை மற்றும் கிராமப்புற வேளாண் அறிவு.',
      'महानदी, गोदावरी, कृष्णा आणि कावेरी खोऱ्यातील पारंपरिक शेतकरी, शेती लागवड, तलाव सिंचन व्यवस्थापन आणि ग्रामीण कृषी ज्ञान.',
      'ମହାନଦୀ, ଗୋଦାବରୀ, କ୍ରିଷ୍ଣା ଓ କାବେରୀ ଉପତ୍ୟକାରେ ପାରମ୍ପରିକ କୃଷକ, ଧାନ ଚାଷ, ଜଳସେଚନ ପରିଚାଳନା ଓ ଗ୍ରାମୀଣ କୃଷି ଜ୍ଞାନ।',
      'মহানদী, গোদাবরী, কৃষ্ণা ও কাবেরী উপত্যকায় ঐতিহ্যবাহী কৃষক, ধান ও শুষ্ক ভূমির চাষাবাদ, জলসেচ ব্যবস্থাপনা এবং গ্রামীণ কৃষি জ্ঞান।'
    ),
    includedSubClassifications: [
      {
        id: 'sub_2_1',
        name: m8('Agriculture', 'कृषि', 'వ్యవసాయం', 'ಕೃಷಿ', 'வேளாண்மை', 'शेती (कृषी)', 'କୃଷି', 'কৃষিকাজ'),
        description: m8('Settled riverine and plateau farming systems.', 'नदी घाटी और पठारी कृषि प्रणालियाँ।', 'నదీ లోయ మరియు పీఠభూమి వ్యవసాయ విధానాలు.', 'ನದಿ ಕಣಿವೆ ಮತ್ತು ಪ್ರಸ್ಥಭೂಮಿ ಕೃಷಿ ಪದ್ಧತಿಗಳು.', 'ஆற்றுப்படுகை மற்றும் பீடபூமி வேளாண்மை முறைகள்.', 'नदीखोरे आणि पठारी शेती पद्धती.', 'ନଦୀ ଉପତ୍ୟକା ଓ ମାଳଭୂମି କୃଷି ପ୍ରଣାଳୀ।', 'নদী উপত্যকা ও মালভূমি কৃষি ব্যবস্থা।')
      },
      {
        id: 'sub_2_2',
        name: m8('Traditional Farmers', 'पारंपरिक कृषक', 'సాంప్రదాయ రైతులు', 'ಸಾಂಪ್ರದಾಯಿಕ ರೈತರು', 'பாரம்பரிய விவசாயிகள்', 'पारंपरिक शेतकरी', 'ପାରମ୍ପରିକ କୃଷକ', 'ঐতিহ্যবাহী কৃষক'),
        description: m8('Landholding cultivators (such as Oda-Chassa in Odisha and Vaddi/Kalingaryots in Andhra).', 'भूमिधर कृषक (जैसे ओडिशा में ओड-चासा और आंध्र में वड्डी/कलिंग रैयत)।', 'భూమి కలిగిన సాగుదారులు (ఒడిశాలో ఓడ-చాసా, ఆంధ్రలో వడ్డి రైతులు).', 'ಭೂಹಿಡುವಳಿದಾರ ರೈತರು (ಒಡಿಶಾದ ಓಡ-ಚಾಸಾ ಮತ್ತು ಆಂಧ್ರದ ವಡ್ಡಿ ರೈತರು).', 'நிலவுடைமை விவசாயிகள் (ஒடிசாவில் ஓட-சாஸா மற்றும் ஆந்திராவில் வட்டி விவசாயிகள்).', 'शेतजमीन धारक शेतकरी (ओडिशातील ओड-चासा व आंध्रातील वड्डी शेतकरी).', 'ଜମିଦାର ଓ କୃଷକ ବର୍ଗ (ଓଡ଼ିଶାରେ ଓଡ଼-ଚାଷା ଓ ଆନ୍ଧ୍ରରେ ଭଡ୍ଡି କୃଷକ)।', 'ভূমিধিকারী কৃষক (ওড়িশায় ওড-চাষা এবং অন্ধ্রে ভড্ডি কৃষক)।')
      },
      {
        id: 'sub_2_3',
        name: m8('Agricultural Cultivation', 'कृषि जुताई एवं फसल उत्पादन', 'పంట సాగు విధానాలు', 'ಬೆಳೆ ಸಾಗುವಳಿ ಪದ್ಧತಿಗಳು', 'பயிர் சாகுபடி முறைகள்', 'पीक लागवड पद्धती', 'ଫସଲ ଚାଷ ପ୍ରଣାଳୀ', 'ফসল চাষাবাদ পদ্ধতি'),
        description: m8('Paddy (Sarada/Dalua), millets (Ragi/Jowar), pulses, and sugarcane cultivation.', 'धान (शरद/दलुआ), मोटे अनाज (रागी/ज्वार), दलहन और गन्ना उत्पादन।', 'వరి, చిరుధాన్యాలు (రాగులు, జొన్నలు), పప్పుధాన్యాలు మరియు చెరకు సాగు.', 'ಭತ್ತ, ರಾಗಿ, ಜೋಳ, ದ್ವಿದಳ ಧಾನ್ಯಗಳು ಮತ್ತು ಕಬ್ಬು ಬೇಸಾಯ.', 'நெல், கேழ்வரகு, சோளம், பருப்பு வகைகள் மற்றும் கரும்பு சாகுபடி.', 'भात, नाचणी, ज्वारी, कडधान्ये आणि ऊस लागवड.', 'ଧାନ (ଶାରଦ/ଦଳୁଆ), ମାଣ୍ଡିଆ, ডାଲି ଓ ଆଖୁ ଚାଷ।', 'ধান, মিলেট (রাগি/জোয়ার), ডাল ও আখ চাষ।')
      },
      {
        id: 'sub_2_4',
        name: m8('Irrigation and Water Management', 'सिंचाई एवं जल प्रबंधन', 'సాగునీటి పారుదల మరియు జల యాజమాన్యం', 'ನೀರಾವರಿ ಮತ್ತು ಜಲ ನಿರ್ವಹಣೆ', 'நீர்ப்பாசனம் மற்றும் நீர் மேலாண்மை', 'सिंचन आणि जलव्यवस्थापन', 'ଜଳସେଚନ ଓ ଜଳ ପରିଚାଳନା', 'জলসেচ ও জল ব্যবস্থাপনা'),
        description: m8('Embankment maintenance (Beri/Bund), sluice regulation (madugu/kalingula), and seasonal canal desilting.', 'तटबंध (बंध/बेरी) रखरखाव, जल-द्वार (मदुगु/कलिंगुल) नियंत्रण और नहरों की गाद सफाई।', 'చెరువు కట్టల రక్షణ, మదుగులు/కలింగుల నిర్వహణ మరియు కాలువల పూడికతీత.', 'ಕೆರೆ ಏರಿಗಳ ನಿರ್ವಹಣೆ, ತೂಬು (ಮದುಗು/ಕಳಿಂಗುಲ) ನಿಯಂತ್ರಣ ಮತ್ತು ಕಾಲುವೆ ಹೂಳೆತ್ತುವಿಕೆ.', 'ஏரிக்கரை பராமரிப்பு, மதகு (கலிங்குல) கட்டுப்பாடு மற்றும் கால்வாய் தூர்வாருதல்.', 'बंधारे देखभाल, पाटबंधारे दरवाजे नियंत्रण आणि कालव्यातील गाळ काढणे.', 'ବନ୍ଧ ରକ୍ଷଣାବେକ୍ଷଣ, ଜଳ-ଦ୍ୱାର ନିୟନ୍ତ୍ରଣ ଓ କେନାଲ୍ ପଙ୍କোଦ୍ଧାର।', 'বাঁধ রক্ষণাবেক্ষণ, জলকপাট নিয়ন্ত্রণ ও খালের পলি পরিষ্কার।')
      },
      {
        id: 'sub_2_5',
        name: m8('Village Agriculture', 'ग्रामीण कृषि व्यवस्था', 'గ్రామీణ వ్యవసాయ వ్యవస్థ', 'ಗ್ರಾಮೀಣ ಕೃಷಿ ವ್ಯವಸ್ಥೆ', 'கிராமப்புற வேளாண்மை அமைப்பு', 'ग्रामीण कृषी व्यवस्था', 'ଗ୍ରାମୀଣ କୃଷି ବ୍ୟବସ୍ଥା', 'গ্রামীণ কৃষি ব্যবস্থা'),
        description: m8('Cooperative village harvesting, seed preservation, and pastoral-agrarian integration.', 'सहकारी ग्राम कटाई, बीज संरक्षण और पशुपालन-कृषि समन्वय।', 'సమిష్టి గ్రామ కోతలు, విత్తన సంరక్షణ మరియు పశుపోషణ.', 'ಸಹಕಾರಿ ಗ್ರಾಮ ಕೊಯ್ಲು, ಬೀಜ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಪಶುಪಾಲನೆ.', 'கூட்டு அறுவடை, விதைப் பாதுகாப்பு மற்றும் கால்நடை வளர்ப்பு.', 'सामुदायिक कापणी, बियाणे जतन आणि पशुपालन-शेती समन्वय.', 'ସାମୂହିକ ଅମଳ, ବିହନ ସଂରକ୍ଷଣ ଓ ଗୋ-ପାଳନ।', 'যৌথ ফসল কাটা, বীজ সংরক্ষণ ও পশুপালন-কৃষি সমন্বয়।')
      },
      {
        id: 'sub_2_6',
        name: m8('Agricultural Tools and Techniques', 'कृषि उपकरण एवं तकनीकें', 'వ్యవసాయ పనిముట్లు మరియు సాంకేతికతలు', 'ಕೃಷಿ ಉಪಕರಣಗಳು ಮತ್ತು ತಂತ್ರಗಳು', 'வேளாண் கருவிகள் மற்றும் நுட்பங்கள்', 'शेतीची अवजारे आणि तंत्रे', 'କୃଷି ଉପକରଣ ଓ କୌଶଳ', 'কৃষি যন্ত্রপাতি ও কৌশল'),
        description: m8('Iron-shod wooden plough (Langala/Nagali), leveling plank (Mai), water-lifting lever (Tenda/Yetham), and stone grain mills.', 'लौह-युक्त हल (लांगल/नागली), पाटा (मई), जल-उत्थापक ढेंकली (तेंडा/एतम) और पत्थर की चक्की।', 'ఇనుప కర్ర నాగలి, చదును చేసే పలక, ఏతం (నీటి తోడు పరికరం) మరియు రాతి తిరగలి.', 'ಕಬ್ಬಿಣದ ನೇಗಿಲು, ಭೂమి ಸಮತಟ್ಟು ಸಾಧನ, ಏತ ನೀರಾವರಿ ಮತ್ತು ಬೀಸುವ ಕಲ್ಲು.', 'இரும்புக் கலப்பை, நிலம் சமன்படுத்தும் பலகை, ஏற்றம் மற்றும் கல் இயந்திரம்.', 'लोखंडी फाळाचा नांगर, वखर, रहाट आणि दगडी जाते.', 'ଲଙ୍ଗଳ, ମଇ, ତେଣ୍ଡା (ଜଳ ଉত্তୋଳন ଯନ୍ତ୍ର) ଓ ପଥର ଚକି।', 'লাঙল, মই, ঢেঁকিকল (জল তোলার যন্ত্র) ও পাথরের যাঁতা।')
      },
      {
        id: 'sub_2_7',
        name: m8('Rural Economic Contributions', 'ग्रामीण आर्थिक योगदान', 'గ్రామీణ ఆర్థిక సహకారం', 'ಗ್ರಾಮೀಣ ಆರ್ಥಿಕ ಕೊಡುಗೆಗಳು', 'கிராமப்புறப் பொருளாதாரப் பங்களிப்புகள்', 'ग्रामीण आर्थिक योगदान', 'ଗ୍ରାମୀଣ ଆର୍ଥିକ ଅବଦାନ', 'গ্রামীণ অর্থনৈতিক অবদান'),
        description: m8('Land reclamation, agrarian revenue generation, and temple-endowment (Agrahara/Devadaya) land cultivation.', 'भूमि सुधार, कृषि राजस्व सृजन और मंदिर-अनुदान (देवदाय) भूमि की खेती।', 'భూమి సాగులోకి తేవడం, వ్యవసాయ శిస్తు మరియు దేవదాయ భూముల సాగు.', 'ಭೂ ಸುಧಾರಣೆ, ಕೃಷಿ ಕಂದಾಯ ಮತ್ತು ದೇವದಾಯ ಭೂಮಿ ಸಾಗುವಳಿ.', 'நில மேம்பாடு, வேளாண் வருவாய் மற்றும் தேவதான நில சாகுபடி.', 'जमीन सुधारणा, कृषी महसूल आणि देवस्थान जमिनीची लागवड.', 'ଜମି ଉଦ୍ଧାର, କୃଷି ରାଜସ୍ୱ ଓ ଦେବୋତ୍ତର ଜମି ଚାଷ।', 'ভূমি সংস্কার, কৃষি রাজস্ব ও দেবোত্তর ভূমি চাষাবাদ।')
      },
      {
        id: 'sub_2_8',
        name: m8('Traditional Agricultural Knowledge', 'पारंपरिक कृषि ज्ञान', 'సాంప్రదాయ వ్యవసాయ విజ్ఞానం', 'ಸಾಂಪ್ರದಾಯಿಕ ಕೃಷಿ ಜ್ಞಾನ', 'பாரம்பரிய வேளாண் அறிவு', 'पारंपरिक कृषी ज्ञान', 'ପାରମ୍ପରିକ କୃଷି ଜ୍ଞାନ', 'ঐতিহ্যবাহী কৃষি জ্ঞান'),
        description: m8('Monsoon astronomy, soil grading (black regur, alluvial, lateritic), and drought-resilient crop rotation.', 'मानसून ज्योतिष, मिट्टी का वर्गीकरण (काली, जलोढ़, लैटेराइट) और सूखा-रोधी फसल चक्र।', 'రుతుపవన అంచనా, నేలల వర్గీకరణ (రేగడి, ఒండ్రు) మరియు పంట మార్పిడి విజ్ఞానం.', 'ಮಳೆಗಾಲದ ಲೆಕ್ಕಾಚಾರ, ಮಣ್ಣಿನ ವರ್ಗೀಕರಣ ಮತ್ತು ಬೆಳೆ ಆವರ್ತನ ಜ್ಞಾನ.', 'பருவமழைக் கணிப்பு, மண் வகைப்பாடு மற்றும் பயிர் சுழற்சி அறிவு.', 'पर्जन्यमान अंदाज, मातीची प्रतवारी आणि पीक फेरपालट ज्ञान.', 'ମୌସୁମୀ ଗଣନା, ମାଟିର ଶ୍ରେଣୀবিଭାଗ ଓ ଫସଲ ଚକ୍ର ଜ୍ଞାନ।', 'মৌসুমী বায়ু গণনা, মাটির শ্রেণীবিন্যাস ও শস্য আবর্তন জ্ঞান।')
      }
    ],
    definitionAndExplanation: m8(
      'Agriculture and rural land stewardship form one of the oldest documented pillars of the Odra/Oda civilizational spectrum. In classical Sanskrit and Prakrit lexicons, the root "Odra / Oda" is closely linked with wet-rice cultivators of the fertile eastern deltas, while in medieval Odisha the "Oda-Chassa" (Odia Chasa) and peasant-militia "Chasa-Paika" formed the demographic and economic backbone of the kingdom. Similarly, in Andhra Pradesh and Telangana, Vaddi and Kalinga agrarian households integrated tank building with wet-paddy cultivation.',
      'कृषि और ग्रामीण भूमि प्रबंधन ओड्र/ओड सभ्यता के सबसे पुराने प्रमाणित स्तंभों में से एक है। मध्यकालीन ओडिशा में "ओड-चासा" और कृषक-सैनिक "चासा-पाइक" राज्य की जनसांख्यिकीय व आर्थिक रीढ़ थे। इसी प्रकार आंध्र प्रदेश और तेलंगाना में वड्डी व कलिंग कृषक परिवारों ने तालाब निर्माण के साथ-साथ धान की खेती को समृद्ध किया।',
      'వ్యవసాయం మరియు గ్రామీణ భూ యాజమాన్యం ఓడ్ర/ఓడ నాగరికతలో అత్యంత ప్రాచీనమైన స్తంభాలలో ఒకటి. మధ్యయుగ ఒడిశాలో "ఓడ-చాసా" మరియు "చాసా-పైకా" సమూహాలు రాజ్యానికి ఆర్థిక వెన్నెముకగా నిలిచాయి. ఆంధ్రప్రదేశ్, తెలంగాణాలో వడ్డి మరియు కళింగ రైతు కుటుంబాలు చెరువుల నిర్మాణంతో పాటు వరి సాగును అభివృద్ధి చేశాయి.',
      'ಕೃಷಿ ಮತ್ತು ಗ್ರಾಮೀಣ ಭೂ ನಿರ್ವಹಣೆಯು ಓಡ್ರ/ಓಡ ಪರಂಪರೆಯ ಪ್ರಮುಖ ಆಧಾರಸ್ತಂಭವಾಗಿದೆ. ಮಧ್ಯಕಾಲೀನ ಒಡಿಶಾದಲ್ಲಿ "ಓಡ-ಚಾಸಾ" ಮತ್ತು "ಚಾಸಾ-ಪೈಕಾ" ಸಮುದಾಯಗಳು ರಾಜ್ಯದ ಆರ್ಥಿಕ ಬೆನ್ನೆಲುಬಾಗಿದ್ದವು. ಆಂಧ್ರ ಮತ್ತು ತೆಲಂಗಾಣದಲ್ಲಿ ವಡ್ಡಿ ಮತ್ತು ಕಳಿಂಗ ಕೃಷಿಕರು ಕೆರೆ ನೀರಾವರಿ ಹಾಗೂ ಭತ್ತದ ಬೇಸಾಯವನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಿದರು.',
      'வேளாண்மை மற்றும் நில மேலாண்மை ஒட்ர நாகரிகத்தின் பழமையான தூண்களில் ஒன்றாகும். இடைக்கால ஒடிசாவில் "ஓட-சாஸா" மற்றும் "சாஸா-பைக்கா" சமூகத்தினர் நாட்டின் பொருளாதார முதுகெலும்பாக விளங்கினர். ஆந்திரா மற்றும் தெலுங்கானாவில் வட்டி மற்றும் கலிங்க விவசாயிகள் ஏரிப் பாசனத்துடன் நெல் சாகுபடியை வளர்த்தனர்.',
      'शेती आणि ग्रामीण भू-व्यवस्थापन हे ओड्र/ओड संस्कृतीच्या सर्वात जुन्या आधारस्तंभांपैकी एक आहे. मध्ययुगीन ओडिशात "ओड-चासा" आणि "चासा-पाइक" हे राज्याच्या अर्थव्यवस्थेचा कणा होते, तर आंध्र व तेलंगणात वड्डी शेतकरी कुटुंबांनी तलाव सिंचनासह भातशेती समृद्ध केली.',
      'କୃଷି ଓ ଗ୍ରାମୀଣ ଭୂ-ପରିଚାଳନା ଓଡ଼୍ର/ଓଡ଼ ସଭ୍ୟତାର ଅନ୍ୟତମ ପ୍ରାଚୀନ ସ୍ତମ୍ଭ। ମଧ୍ୟଯୁଗୀୟ ଓଡ଼ିଶାରେ "ଓଡ଼-ଚାଷା" ଓ "ଚାଷା-ପାଇକ" ରାଜ୍ୟର ଅର୍ଥନୈତିକ ମେରୁଦଣ୍ଡ ଥିଲେ।',
      'কৃষি ও গ্রামীণ ভূমি ব্যবস্থাপনা ওড্র/ওড সভ্যতার অন্যতম প্রাচীন স্তম্ভ। মধ্যযুগীয় ওড়িশায় "ওড-চাষা" ও "চাষা-পাইক" ছিল রাজ্যের অর্থনৈতিক মেরুদণ্ড।'
    ),
    historicalBackground: m8(
      'Copper-plate land grants (Tamra-shasanas) from the Bhauma-Kara, Somavamshi, Eastern Ganga, and Suryavamsha Gajapathi dynasties document extensive village settlements (Gramas), irrigated rice fields (Kshetra), and embankments (Setu/Bandha). During peacetime, the hereditary Paika militia of Odisha worked their rent-free military lands as cultivators, creating a historic synthesis between agrarian production and territorial defense.',
      'भौम-कर, सोमवंशी, पूर्वी गंग और सूर्यवंशी गजपति राजवंशों के ताम्रपत्रों में ग्राम बस्तियों, सिंचित धान के खेतों (क्षेत्र) और तटबंधों (सेतु/बंध) का विस्तृत उल्लेख मिलता है। शांति काल में ओडिशा के वंशानुगत पाइक सैनिक अपनी कर-मुक्त भूमि पर कृषि कार्य करते थे, जिससे कृषि और सैन्य रक्षा का ऐतिहासिक समन्वय स्थापित हुआ।',
      'భౌమ-కర, సోమవంశీ, తూర్పు గంగ మరియు సూర్యవంశ గజపతి రాజుల తామ్రపత్ర శాసనాలలో గ్రామ నివాసాలు, సాగునీటి వరి పొలాలు మరియు చెరువు కట్టల ప్రస్తావన ఉంది. శాంతి కాలంలో పైకా యోధులు తమ భూములలో వ్యవసాయం చేస్తూ ఆహార భద్రతకు తోడ్పడ్డారు.',
      'ಭೌಮ-ಕರ, ಸೋಮವಂಶಿ, ಪೂರ್ವ ಗಂಗ ಮತ್ತು ಸೂರ್ಯವಂಶ ಗಜಪತಿ ರಾಜರ ತಾಮ್ರಶಾಸನಗಳಲ್ಲಿ ಗ್ರಾಮ ನೆಲೆಗಳು, ನೀರಾವರಿ ಗದ್ದೆಗಳು ಮತ್ತು ಕೆರೆ ಏರಿಗಳ ಉಲ್ಲೇಖವಿದೆ. ಶಾಂತಿ ಕಾಲದಲ್ಲಿ ಪೈಕಾ ಯೋಧರು ಕೃಷಿ ಕಾಯಕದಲ್ಲಿ ತೊಡಗುತ್ತಿದ್ದರು.',
      'பௌம-கர, சோமவம்சி, கீழைக் கங்கர் மற்றும் சூர்யவம்ச கஜபதி செப்பேடுகளில் கிராமக் குடியேற்றங்கள், நன்செய் வயல்கள் மற்றும் அணைகள் குறித்த குறிப்புகள் உள்ளன.',
      'भौम-कर, सोमवंशी, पूर्व गंग आणि सूर्यवंशी गजपती ताम्रपटांमध्ये गावे, बागायती भातशेती आणि बंधाऱ्यांचा सविस्तर उल्लेख आढळतो.',
      'ଭୌମ-କର, ସୋମବଂଶୀ, ଗଙ୍ଗ ଓ ଗଜପତି ତାମ୍ରଫଳକରେ ଗ୍ରାମ, ଚାଷଜମି ଓ ଜଳବନ୍ଧର ବିସ୍ତୃତ ଉଲ୍ଲେଖ ମିଳେ।',
      'ভৌম-কর, সোমবংশী, পূর্ব গঙ্গ ও গজপতি তাম্রশাসনে গ্রাম বসতি, সেচযুক্ত ধানক্ষেত ও বাঁধের বিস্তারিত উল্লেখ রয়েছে।'
    ),
    toolsMaterialsAndTechniques: m8(
      'Traditional agrarian engineering relied on contour bunding, earthen and stone-revetted tanks (Cheruvu / Kata / Munda / Bandha), wooden sluice gates, counterpoise water lifts (Tenda / Picottah), iron-tipped ploughshares, and stone-cut threshing rollers and domestic rotary querns.',
      'पारंपरिक कृषि अभियांत्रिकी में समोच्च मेड़बंदी, मिट्टी व पत्थर से बंधे तालाब (चेरुवु / काटा / मुंडा / बंध), लकड़ी के जल-द्वार, ढेंकली (तेंडा), लोहे के फाल वाले हल और पत्थर के थ्रेशिंग रोलर व चक्कियों का उपयोग होता था।',
      'కాంటూరు గట్లు, రాతి కట్టలతో నిర్మించిన చెరువులు, కర్ర మదుగులు, ఏతం, ఇనుప కర్ర నాగలి మరియు రాతి నూర్పిడి రోలర్లు సాంప్రదాయ వ్యవసాయంలో కీలక పరికరాలు.',
      'ಸಮೋಚ್ಚ ಬದುಗಳು, ಕಲ್ಲಿನ ಏರಿಗಳ ಕೆರೆಗಳು, ಮರದ ತೂಬುಗಳು, ಏತ ನೀರಾವರಿ, ನೇಗಿಲು ಮತ್ತು ಕಲ್ಲಿನ ರೋಲರ್‌ಗಳು ಪ್ರಮುಖ ಸಾಧನಗಳಾಗಿದ್ದವು.',
      'சம உயர வரப்புகள், கற்கரை ஏரிகள், மதகுகள், ஏற்றம், கலப்பை மற்றும் கல் உருளைகள் முக்கிய வேளாண் கருவிகளாகப் பயன்பட்டன.',
      'दगडी बांधांचे तलाव, लाकडी जलद्वारे, रहाट, लोखंडी नांगर आणि दगडी मळणी रोलर्स यांचा वापर केला जात असे.',
      'ପଥର ବନ୍ଧ ଜଳାଶୟ (କାటా / ମୁଣ୍ଡା / ବନ୍ଧ), ତେଣ୍ଡା, ଲଙ୍ଗଳ ଓ ପଥର ଚକି ପାରମ୍ପରିକ କୃଷିର ମୁଖ୍ୟ ସାଧନ ଥିଲା।',
      'পাথর বাঁধানো জলাশয়, জলকপাট, ঢেঁকিকল, লাঙল ও পাথরের রোলার ছিল ঐতিহ্যবাহী কৃষির প্রধান উপকরণ।'
    ),
    culturalAndRegionalSignificance: m8(
      'Agrarian festivals such as Akshaya Tritiya (Muthi Anukula ceremonial seed-sowing in Odisha), Sankranti / Pongal harvest celebrations, Nuakhai in Western Odisha, and Eruvaka Purnima in Andhra Pradesh honor the sacred bond between the cultivator, Mother Earth (Bhumi Devi), and water goddesses (Gangamma / Peddintlamma).',
      'अक्षय तृतीया (ओडिशा में मुट्ठी अनुकूल बीज-बोवनी), मकर संक्रांति / पोंगल, पश्चिमी ओडिशा में नुआखाई और आंध्र प्रदेश में एरुवाका पूर्णिमा जैसे पर्व कृषक, भूदेवी और जल-देवियों (गंगम्मा / पेद्दिंट्लम्मा) के पवित्र संबंध का उत्सव मनाते हैं।',
      'అక్షయ తృతీయ, సంక్రాంతి, నువాఖై మరియు ఏరువాక పూర్ణిమ వంటి పండుగలు రైతుకు, భూదేవికి మరియు గంగమ్మ/పెద్దింట్లమ్మ దేవతలకు ఉన్న పవిత్ర బంధాన్ని చాటుతాయి.',
      'ಅಕ್ಷಯ ತೃತೀಯ, ಸಂಕ್ರಾಂತಿ ಮತ್ತು ಏರುವಾಕ ಹುಣ್ಣಿಮೆಯಂತಹ ಹಬ್ಬಗಳು ರೈತ, ಭೂದೇವಿ ಮತ್ತು ಗಂಗಮ್ಮ ದೇವತೆಯ ನಡುವಿನ ಪವಿತ್ರ ಬಂಧವನ್ನು ಸಾರುತ್ತವೆ.',
      'அட்சய திருதியை, பொங்கல் / சங்கராந்தி போன்ற பண்டிகைகள் உழவர், பூமித் தாய் மற்றும் கங்கையம்மன் இடையிலான புனித உறவைப் போற்றுகின்றன.',
      'अक्षय तृतीया, मकर संक्रांत आणि एरुवाका पौर्णिमा हे सण शेतकरी, भूदेवी आणि जलदेवता यांच्यातील पवित्र नाते दर्शवतात.',
      'ଅକ୍ଷୟ ତୃତୀୟା (ମୁଠି ଅନୁକୂଳ), ମକର ସଂକ୍ରାନ୍ତି ଓ ନୂଆଖାଇ ପର୍ବ କୃଷକ ଓ ଧରିତ୍ରୀ ମାତାଙ୍କ ପବିତ୍ର ସମ୍ପର୍କର ପ୍ରତୀକ।',
      'অক্ষয় তৃতীয়া, মকর সংক্রান্তি ও নুয়াখাই উৎসব কৃষক, ধরিত্রী মাতা ও জলদেবীর পবিত্র সম্পর্কের প্রতীক।'
    ),
    documentedHistoricalExamples: m8(
      '1. Hathigumpha Inscription (Year 5): Extension of the Nanda-era canal into Kalinganagari to irrigate surrounding agrarian tracts.\n2. Western Odisha "Kata-Munda-Bandha"three-tier cascade irrigation systems documented in Sambalpur and Bolangir district gazetteers.\n3. Cumbum Tank and Kondavidu agrarian tank networks in Andhra Pradesh.',
      '1. हाथीगुंफा अभिलेख (वर्ष 5): कृषि भूमि की सिंचाई हेतु नंद-कालीन नहर का कलिंगनगरी तक विस्तार।\n2. पश्चिमी ओडिशा की "काटा-मुंडा-बंध" त्रि-स्तरीय सिंचाई प्रणाली (संबलपुर व बलांगीर गजेटियर)।\n3. आंध्र प्रदेश में कम्बम झील और कोंडावीडु क्षेत्र के कृषि तालाब।',
      '1. హాథీగుంఫా శాసనం (5వ ఏట): వ్యవసాయ భూముల సాగునీటి కోసం నందరాజు కాలువ విస్తరణ.\n2. పశ్చిమ ఒడిశాలోని "కాటా-ముండా-బంధ" త్రిস্তర సాగునీటి వ్యవస్థ.\n3. ఆంధ్రప్రదేశ్‌లోని కంభం చెరువు మరియు కొండవీడు తటాకాలు.',
      '1. ಹಾಥೀಗುಂಫಾ ಶಾಸನ: ಕೃಷಿ ನೀರಾವರಿಗಾಗಿ ನಂದರಾಜನ ಕಾಲುವೆ ವಿಸ್ತರಣೆ.\n2. ಪಶ್ಚಿಮ ಒಡಿಶಾದ "ಕಾಟಾ-ಮುಂಡಾ-ಬಂಧ" ನೀರಾವರಿ ಪದ್ಧತಿ.\n3. ಆಂಧ್ರಪ್ರದೇಶದ ಕಂಭಂ ಕೆರೆ ಮತ್ತು ಕೊಂಡವೀಡು ಜಲಾಶಯಗಳು.',
      '1. ஹாத்திகும்பா கல்வெட்டு: வேளாண் பாசனத்திற்காக நந்தர் காலக் கால்வாய் விரிவாக்கம்.\n2. மேற்கு ஒடிசாவின் அடுக்குமுறை பாசனக் குளங்கள்.\n3. ஆந்திராவின் கம்பம் ஏரி மற்றும் கொண்டவீடு பாசனக் குளங்கள்.',
      '१. हाथीगुंफा शिलालेख: शेती सिंचनासाठी नंदकालीन कालव्याचा विस्तार.\n२. पश्चिम ओडिशातील "काटा-मुंडा-बंध" सिंचन पद्धती.\n३. आंध्र प्रदेशातील कम्बम तलाव.',
      '୧. ହାତୀଗୁମ୍ଫା ଅଭିଲେଖ: କୃଷି ଜଳସେଚନ ପାଇଁ ନନ୍ଦରାଜ କେନାଲ୍ ବିସ୍ତାର।\n୨. ପଶ୍ଚିମ ଓଡ଼ିଶାର "କାଟା-ମୁଣ୍ଡା-ବନ୍ଧ" ଜଳସେଚନ ପ୍ରଣାଳୀ।\n୩. ଆନ୍ଧ୍ରର କମ୍ଭମ ହ୍ରଦ।',
      '১. হাতিগুম্ফা শিলালিপি: কৃষি জলসেচের জন্য নন্দরাজ খালের সম্প্রসারণ।\n২. পশ্চিম ওড়িশার "কাটা-মুন্ডা-বন্ধ" সেচ ব্যবস্থা।\n৩. অন্ধ্রপ্রদেশের কম্বম হ্রদ।'
    ),
    contributionsToSociety: m8(
      'Sustained regional food security, transformed semi-arid uplands into multi-crop rice bowls through tank-and-canal networks, and supported village artisans and temple institutions.',
      'क्षेत्रीय खाद्य सुरक्षा सुनिश्चित की, तालाब और नहर नेटवर्क के माध्यम से अर्ध-शुष्क पठारों को उपजाऊ धान के कटोरे में बदला और ग्रामीण अर्थव्यवस्था को आधार दिया।',
      'ప్రాంతీయ ఆహార భద్రతను నిలబెట్టడం, చెరువులు మరియు కాలువల ద్వారా మెట్ట ప్రాంతాలను సస్యశ్యామలం చేయడం మరియు గ్రామీణ ఆర్థిక వ్యవస్థకు ఊతమివ్వడం.',
      'ಪ್ರಾದೇಶಿಕ ಆಹಾರ ಭದ್ರತೆ, ಕೆರೆ-ಕಾಲುವೆಗಳ ಮೂಲಕ ಒಣಭೂಮಿಯನ್ನು ಸಮೃದ್ಧ ಭತ್ತದ ಕಣಜವಾಗಿ ಪರಿವರ್ತಿಸುವಿಕೆ ಮತ್ತು ಗ್ರಾಮೀಣ ಆರ್ಥಿಕತೆಗೆ ಕೊಡುಗೆ.',
      'பிராந்திய உணவுப் பாதுகாப்பு, ஏரி மற்றும் கால்வாய்கள் மூலம் வறண்ட நிலங்களை வளமான நெற்களஞ்சியமாக மாற்றியமைத்தல்.',
      'प्रादेशिक अन्नसुरक्षा, तलाव व कालव्यांद्वारे कोरडवाहू जमिनीचे सुपीक शेतीत रूपांतर आणि ग्रामीण अर्थव्यवस्थेला बळकटी.',
      'ଆଞ୍ଚଳିକ ଖାଦ୍ୟ ସୁରକ୍ଷା, ଜଳାଶୟ ଓ କେନାଲ୍ ଦ୍ୱାରା ଶୁষ্କ ଭୂମିକୁ ଶସ୍ୟଶ୍ୟାମଳା କରିବା ଏବଂ ଗ୍ରାମୀଣ ଅର୍ଥନୀତିକୁ ସୁଦୃଢ଼ କରିବା।',
      'আঞ্চলিক খাদ্য নিরাপত্তা নিশ্চিতকরণ, জলাশয় ও খালের মাধ্যমে শুষ্ক ভূমিকে শস্যশ্যামল ক্ষেত্রে রূপান্তর এবং গ্রামীণ অর্থনীতিকে শক্তিশালী করা।'
    ),
    communitySpecificConnectionsAndDistinctions: m8(
      'In Odisha, "Oda-Chassa" specifically denotes settled agriculturalists, closely interrelated with "OD-Khandayath" and "OD-Paika" landholders. In Andhra Pradesh and Odisha borderlands, "Vaddi" and "KalingaRajulu" include large agrarian populations, whereas "Vaddera", "Voddar", and "Odan" historically specialized more heavily in the hydraulic earthwork and stone-bund construction that made such agriculture possible, later transitioning into settled farming in many districts.',
      'ओडिशा में "ओड-चासा" विशेष रूप से स्थायी कृषकों को दर्शाता है, जिनका "ओड-खंडायत" और "ओड-पाइक" भूमिधरों से गहरा ऐतिहासिक संबंध है। आंध्र-ओडिशा सीमा पर "वड्डी" और "कलिंगराजुलु" में बड़ी कृषक आबादी शामिल है, जबकि "वड्डेरा", "वोड्डार" और "ओडन" ने मुख्यतः उन सिंचाई तालाबों व बांधों का निर्माण किया जिनसे यह कृषि संभव हुई।',
      'ఒడిశాలో "ఓడ-చాసా" ప్రధానంగా స్థిరపడిన రైతులను సూచిస్తుంది. ఆంధ్ర-ఒడిశా సరిహద్దుల్లో "వడ్డి" మరియు "కళింగరాజులు" వ్యవసాయంలో ప్రముఖంగా ఉండగా, "వడ్డెర", "వొడ్డార్", "ఓడన్" సమూహాలు ఆ వ్యవసాయానికి అవసరమైన చెరువులు, కాలువల నిర్మాణంలో కీలక పాత్ర పోషించి, అనేక జిల్లాలలో వ్యవసాయదారులుగా కూడా స్థిరపడ్డారు.',
      'ಒಡಿಶಾದಲ್ಲಿ "ಓಡ-ಚಾಸಾ" ಕೃಷಿಕರನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಆಂಧ್ರ-ಒಡಿಶಾ ಗಡಿಯಲ್ಲಿ "ವಡ್ಡಿ" ಮತ್ತು "ಕಳಿಂಗರಾಜುಲು" ಕೃಷಿಯಲ್ಲಿ ತೊಡಗಿದ್ದರೆ, "ವಡ್ಡೇರ", "ವೊಡ್ಡರ್" ಸಮುದಾಯಗಳು ಕೃಷಿಗೆ ಆಧಾರವಾದ ಕೆರೆ-ಕಾಲುವೆಗಳನ್ನು ನಿರ್ಮಿಸಿ ನಂತರ ಅನೇಕ ಕಡೆ ಕೃಷಿಕರಾಗಿಯೂ ನೆಲೆಸಿದರು.',
      'ஒடிசாவில் "ஓட-சாஸா" விவசாயிகளைக் குறிக்கிறது. ஆந்திர-ஒடிசா எல்லையில் "வட்டி" மற்றும் "கலிங்கராஜுலு" வேளாண்மையில் ஈடுபட்டுள்ளனர்; "வட்டேரா", "வொட்டர்" சமூகத்தினர் பாசன ஏரிகளை உருவாக்கி வேளாண்மைக்கு அடித்தளமிட்டனர்.',
      'ओडिशात "ओड-चासा" हे मुख्यतः शेतकरी आहेत, तर "वड्डेरा" व "वोड्डार" यांनी शेतीसाठी आवश्यक तलाव व कालवे बांधून अनेक जिल्ह्यांत स्वतःही शेती स्वीकारली.',
      'ଓଡ଼ିଶାରେ "ଓଡ଼-ଚାଷା" ମୁଖ୍ୟତଃ କୃଷିଜୀବୀ ଅଟନ୍ତି ଏବଂ "ଭଡ୍ଡି", "ଭଡ୍ଡେରା" ଓ "ଓଡ଼ନ୍" ଜଳସେଚନ ବନ୍ଧ ନିର୍ମାଣ ସହ କୃଷି ବିକାଶରେ ଯୋଗଦାନ ଦେଇଛନ୍ତି।',
      'ওড়িশায় "ওড-চাষা" মূলত কৃষিজীবী এবং "ভড্ডি", "ভড্ডেরা" ও "ওডন" সেচ বাঁধ নির্মাণের পাশাপাশি কৃষি বিকাশে অবদান রেখেছে।'
    ),
    epistemicAndMethodologicalNote: m8(
      'Methodological Note: Revenue and census categories ("Chasa", "Kapu/Ryot", "Earthworker") often overlapped in pre-modern India; individuals frequently combined seasonal farming with masonry, transport, or military service.',
      'कार्यप्रणाली टिप्पणी: पूर्व-आधुनिक भारत में राजस्व और जनगणना श्रेणियाँ ("चासा", "रैयत", "शिल्पी") अक्सर एक-दूसरे से जुड़ी होती थीं; लोग मौसमी खेती के साथ निर्माण या सैन्य सेवा भी करते थे।',
      'పరిశోధనా గమనిక: పూర్వ కాలంలో వ్యవసాయం, జల నిర్మాణం మరియు సైనిక సేవ తరచుగా పరస్పరం అనుసంధానించబడి ఉండేవి.',
      'ಸಂಶೋಧನಾ ಸೂಚನೆ: ಪೂರ್ವ-ಆಧುನಿಕ ಭಾರತದಲ್ಲಿ ಕೃಷಿ, ಕೆರೆ ನಿರ್ಮಾಣ ಮತ್ತು ಸೇನಾ ಸೇವೆಗಳು ಪರಸ್ಪರ ಪೂರಕವಾಗಿದ್ದವು.',
      'ஆய்வுக் குறிப்பு: பண்டைய இந்தியாவில் வேளாண்மை, ஏரிக் கட்டுமானம் மற்றும் படைச் சேவை ஆகியவை ஒன்றோடொன்று இணைந்திருந்தன.',
      'संशोधन टीप: पूर्व-आधुनिक काळात शेती, तलाव बांधणी आणि लष्करी सेवा या बाबी परस्परपूरक होत्या.',
      'ଗବେଷଣା ଟିପ୍ପଣୀ: ପ୍ରାକ୍-ଆଧୁନିକ କାଳରେ କୃଷି, ଜଳବନ୍ଧ ନିର୍ମାଣ ଓ ସାମରିକ ସେବା ପରସ୍ପର ସହ ଜଡ଼ିତ ଥିଲା।',
      'পদ্ধতিগত নোট: প্রাক-আধুনিক ভারতে কৃষি, বাঁধ নির্মাণ ও সামরিক সেবা প্রায়শই পরস্পর সংযুক্ত ছিল।'
    ),
    visualAssets: [
      {
        id: 'vis_prof_2_kolleru',
        imageUrl: ARCHIVE_IMG('kolleru_wetland_sanctuary.jpg'),
        visualType: 'Archaeological Photograph',
        historicalPeriod: 'Ancient to Contemporary Deltaic Agro-Ecology',
        title: m8(
          'Deltaic Irrigation & Wetland Agrarian Basin (Kolleru–Krishna–Godavari Corridor)',
          'डेल्टा सिंचाई एवं आर्द्रभूमि कृषि बेसिन (कोल्लेरू–कृष्णा–गोदावरी गलियारा)',
          'డెల్టా సాగునీటి మరియు చిత్తడి నేలల వ్యవసాయ పరీవాహక ప్రాంతం (కొల్లేరు-కృష్ణా-గోదావరి)',
          'ಮುಖಜ ಭೂಮಿ ನೀರಾವರಿ ಮತ್ತು ಕೃಷಿ ಜಲಾನಯನ ಪ್ರದೇಶ (ಕೊಲ್ಲೇರು-ಕೃಷ್ಣಾ-ಗೋದಾವರಿ)',
          'டெல்டா பாசனம் மற்றும் ஈரநில வேளாண் படுகை (கொல்லேறு-கிருஷ்ணா-கோதாவரி)',
          'त्रिभुज प्रदेश सिंचन आणि कृषी खोरे (कोल्लेरू-कृष्णा-गोदावरी)',
          'ଡେଲ୍ଟା ଜଳସେଚନ ଓ କୃଷି ଅବବାହିକା (କୋଲ୍ଲେରୁ-କ୍ରିଷ୍ଣା-ଗୋଦାବରୀ)',
          'বদ্বীপ জলসেচ ও কৃষি অববাহিকা (কোল্লেরু-কৃষ্ণা-গোদাবরী)'
        ),
        caption: m8(
          'Fertile wetland and canal-irrigated agrarian landscape sustained by traditional earthen bunds and tank systems.',
          'पारंपरिक मिट्टी के बांधों और तालाब प्रणालियों द्वारा पोषित उपजाऊ आर्द्रभूमि एवं नहर-सिंचित कृषि परिदृश्य।',
          'సాంప్రదాయ చెరువు కట్టలు మరియు కాలువల వ్యవస్థతో సస్యశ్యామలమైన డెల్టా వ్యవసాయ భూములు.',
          'ಸಾಂಪ್ರದಾಯಿಕ ಕೆರೆ ಏರಿಗಳು ಮತ್ತು ಕಾಲುವೆಗಳಿಂದ ಸಮೃದ್ಧವಾದ ಕೃಷಿ ಭೂಮಿ.',
          'பாரம்பரிய ஏரிக்கரைகள் மற்றும் கால்வாய்களால் செழிக்கும் டெல்டா வேளாண் நிலப்பரப்பு.',
          'पारंपरिक बंधारे आणि कालव्यांमुळे सुपीक झालेला कृषी प्रदेश.',
          'ପାରମ୍ପରିକ ବନ୍ଧ ଓ କେନାଲ୍ ଦ୍ୱାରା ସମୃଦ୍ଧ କୃଷି କ୍ଷେତ୍ର।',
          'ঐতিহ্যবাহী বাঁধ ও খাল ব্যবস্থার দ্বারা পুষ্ট উর্বর কৃষি ভূমি।'
        ),
        altText: m8(
          'Panoramic view of irrigated deltaic waterways and green agricultural fields',
          'सिंचित डेल्टा जलमार्गों और हरे-भरे कृषि खेतों का दृश्य',
          'సాగునీటి కాలువలు మరియు పచ్చని పంట పొలాల దృశ్యం',
          'ನೀರಾವರಿ ಕಾಲುವೆಗಳು ಮತ್ತು ಹಸಿರು ಗದ್ದೆಗಳ ನೋಟ',
          'பாசனக் கால்வாய்கள் மற்றும் பசுமையான வயல்களின் தோற்றம்',
          'सिंचन कालवे आणि हिरव्यागार शेतजमिनींचे दृश्य',
          'ଜଳସେଚନ କେନାଲ୍ ଓ ସବୁଜ ଶସ୍ୟ କ୍ଷେତ୍ରର ଦୃଶ୍ୟ',
          'সেচ খাল ও সবুজ কৃষি ক্ষেতের দৃশ্য'
        ),
        sourceAttribution: 'Suryavamsha Archive / Coastal Andhra & Odra Delta Documentation',
        licenseInfo: 'Archival Educational & Documentary Use'
      }
    ],
    relatedArticles: [
      {
        id: 'rel_ag_1',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_06_oda_chassa',
        label: m8('Oda-Chassa Community Article', 'ओड-चासा समुदाय लेख', 'ఓడ-చాసా సమాజ వ్యాసం', 'ಓಡ-ಚಾಸಾ ಸಮುದಾಯ ಲೇಖನ', 'ஓட-சாஸா சமூகக் கட்டுரை', 'ओड-चासा समाज लेख', 'ଓଡ଼-ଚାଷା ସମୁଦାୟ ଲେଖା', 'ওড-চাষা সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_ag_2',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_09_vaddi',
        label: m8('Vaddi Community Article', 'वड्डी समुदाय लेख', 'వడ్డి సమాజ వ్యాసం', 'ವಡ್ಡಿ ಸಮುದಾಯ ಲೇಖನ', 'வட்டி சமூகக் கட்டுரை', 'वड्डी समाज लेख', 'ଭଡ୍ଡି ସମୁଦାୟ ଲେଖା', 'ভড্ডি সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_ag_3',
        targetType: 'internal_route',
        targetIdOrPath: '/odra-desha',
        label: m8('Odra Desha: Geography, River Basins & Agrarian Heartland', 'ओड्र देश: भूगोल, नदी बेसिन एवं कृषि केंद्र', 'ఓడ్ర దేశం: భౌగోళికం, నదీ లోయలు & వ్యవసాయ కేంద్రం', 'ಓಡ್ರ ದೇಶ: ಭೂಗೋಳ ಮತ್ತು ನದಿ ಕಣಿವೆಗಳು', 'ஒட்ர தேசம்: புவியியல் மற்றும் ஆற்றுப் படுகைகள்', 'ओड्र देश: भूगोल आणि नदी खोरे', 'ଓଡ଼୍ର ଦେଶ: ଭୂଗୋଳ ଓ ନଦୀ ଉପତ୍ୟକା', 'ওড্র দেশ: ভূগোল ও নদী অববাহিকা'),
        categoryBadge: m8('Historical Geography', 'ऐतिहासिक भूगोल', 'చారిత్రక భౌగోళికం', 'ಐತಿಹಾಸಿಕ ಭೂಗೋಳ', 'வரலாற்றுப் புவியியல்', 'ऐतिहासिक भूगोल', 'ଐତିହାସିକ ଭୂଗୋଳ', 'ঐতিহাসিক ভূগোল')
      }
    ],
    relatedKeywords: ['Agriculture', 'Oda-Chassa', 'Vaddi', 'Odra Desha', 'Engineering', 'Construction'],
    references: [
      {
        citation: 'Hunter, W. W. (1872). Orissa: Or the Vicissitudes of an Indian Province under Native and British Rule (Vols. I–II). Smith, Elder & Co., London.',
        type: 'Colonial Gazetteer / Census'
      },
      {
        citation: 'Ludden, D. (1999). An Agrarian History of South Asia. Cambridge University Press.',
        type: 'Academic Monograph'
      }
    ]
  },
  {
    id: 'prof_cat_3_construction_engineering',
    slug: 'construction-and-engineering-heritage',
    categoryNumber: 3,
    codeLabel: 'Category 3',
    title: m8(
      'Category 3: Construction and Engineering Heritage',
      'श्रेणी 3: निर्माण एवं अभियांत्रिकी विरासत',
      'వర్గం 3: నిర్మాణ మరియు ఇంజనీరింగ్ వారసత్వం',
      'ವರ್ಗ 3: ನಿರ್ಮಾಣ ಮತ್ತು ಎಂಜಿನಿಯರಿಂಗ್ ಪರಂಪರೆ',
      'வகை 3: கட்டுமானம் மற்றும் பொறியியல் பாரம்பரியம்',
      'वर्ग ३: बांधकाम आणि अभियांत्रिकी वारसा',
      'ବର୍ଗ ୩: ନିର୍ମାଣ ଓ ଯାନ୍ତ୍ରିକ ଐତିହ୍ୟ',
      'বিভাগ ৩: নির্মাণ ও প্রকৌশল ঐতিহ্য'
    ),
    shortSummary: m8(
      'Traditional construction, civil and hydraulic engineering, stone and fort construction, tanks, canals, roads, traditional building materials, and community traditions celebrating the Inventor of the Floor Mill, Inventor of the Running Wheel, and Builders of Universe.',
      'पारंपरिक निर्माण, सिविल व जल-अभियांत्रिकी, पाषाण व दुर्ग निर्माण, तालाब, नहरें, सड़कें, तथा आटा चक्की के आविष्कारक (Inventor of the floor mill), गतिशील चक्र के आविष्कारक (Inventor of the Running Wheel) और विश्व-निर्माता (Builders of Universe) की सामुदायिक परंपराएँ।',
      'సాంప్రదాయ నిర్మాణం, సివిల్ మరియు జల ఇంజనీరింగ్, రాతి కోటలు, చెరువులు, కాలువలు, రహదారులు మరియు తిరగలి ఆవిష్కర్త (Inventor of the floor mill), తిరిగే చక్రం ఆవిష్కర్త (Inventor of the Running Wheel), విశ్వ నిర్మాతలు (Builders of Universe) అనే సాంప్రదాయ గుర్తింపులు.',
      'ಸಾಂಪ್ರದಾಯಿಕ ನಿರ್ಮಾಣ, ಸಿವಿಲ್ ಮತ್ತು ಜಲ ಎಂಜಿನಿಯರಿಂಗ್, ಕಲ್ಲಿನ ಕೋಟೆಗಳು, ಕೆರೆ-ಕಾಲುವೆಗಳು ಹಾಗೂ ಬೀಸುವ ಕಲ್ಲಿನ ಆವಿಷ್ಕಾರಕರು (Inventor of the floor mill), ಚಲಿಸುವ ಚಕ್ರದ ಆವಿಷ್ಕಾರಕರು (Inventor of the Running Wheel) ಮತ್ತು ವಿಶ್ವ ನಿರ್ಮಾತೃಗಳು (Builders of Universe) ಪರಂಪರೆ.',
      'பாரம்பரியக் கட்டுமானம், சிவில் மற்றும் நீரியல் பொறியியல், கற்கோட்டைகள், ஏரிகள், கால்வாய்கள் மற்றும் மாவு அரைக்கும் இயந்திரக் கண்டுபிடிப்பாளர் (Inventor of the floor mill), சுழலும் சக்கரக் கண்டுபிடிப்பாளர் (Inventor of the Running Wheel), உலகக் கட்டுமானர்கள் (Builders of Universe) மரபு.',
      'पारंपरिक बांधकाम, स्थापत्य व जल-अभियांत्रिकी, दगडी किल्ले, तलाव, कालवे आणि जात्याचे शोधकर्ते (Inventor of the floor mill), फिरत्या चाकाचे शोधकर्ते (Inventor of the Running Wheel) व विश्व-निर्माते (Builders of Universe) ही परंपरा.',
      'ପାରମ୍ପରିକ ନିର୍ମାଣ, ଜଳ-ଯାନ୍ତ୍ରିକ କୌଶଳ, ପଥର ଦୁର୍ଗ, ଜଳାଶୟ, କେନାଲ୍ ଏବଂ ପେଷଣ ଚକି ଉଦ୍ଭାବକ (Inventor of the floor mill), ଘୂର୍ଣ୍ଣନ ଚକ୍ର ଉଦ୍ଭାବକ (Inventor of the Running Wheel) ଓ ବିଶ୍ୱ ନିର୍ମାତା (Builders of Universe) ପରମ୍ପରା।',
      'ঐতিহ্যবাহী নির্মাণ, পুরকৌশল ও জল-প্রকৌশল, প্রস্তর দুর্গ, জলাশয়, খাল এবং যাঁতার উদ্ভাবক (Inventor of the floor mill), ঘূর্ণায়মান চাকার উদ্ভাবক (Inventor of the Running Wheel) ও বিশ্ব-নির্মাতা (Builders of Universe) ঐতিহ্য।'
    ),
    includedSubClassifications: [
      {
        id: 'sub_3_1',
        name: m8('Traditional Construction', 'पारंपरिक निर्माण', 'సాంప్రదాయ నిర్మాణం', 'ಸಾಂಪ್ರದಾಯಿಕ ನಿರ್ಮಾಣ', 'பாரம்பரியக் கட்டுமானம்', 'पारंपरिक बांधकाम', 'ପାରମ୍ପରିକ ନିର୍ମାଣ', 'ঐতিহ্যবাহী নির্মাণ'),
        description: m8('Load-bearing stone, laterite, and rammed-earth structural systems.', 'भार-वाहक पाषाण, लैटेराइट और कुटी हुई मिट्टी की संरचनाएँ।', 'రాతి, లేటరైట్ మరియు మట్టి కట్టడాలు.', 'ಕಲ್ಲು, ಜಂಬಿಟ್ಟಿಗೆ ಮತ್ತು ಮಣ್ಣಿನ ರಚನೆಗಳು.', 'கல், செம்புராங்கல் மற்றும் மண் கட்டுமானங்கள்.', 'दगड, जांभा दगड आणि मातीची बांधकामे.', 'ପଥର, ମାଙ୍କଡ଼ା ପଥର ଓ ମାଟି ନିର୍ମାଣ।', 'পাথর, ল্যাটেরাইট ও মাটির স্থাপত্য কাঠামো।')
      },
      {
        id: 'sub_3_2',
        name: m8('Construction Workers and Builders', 'निर्माण कर्मी एवं निर्माता', 'నిర్మాణ కార్మికులు మరియు బిల్డర్లు', 'ನಿರ್ಮಾಣ ಕಾರ್ಮಿಕರು ಮತ್ತು ನಿರ್ಮಾತೃಗಳು', 'கட்டுமானத் தொழிலாளர்கள் மற்றும் கட்டுநர்கள்', 'बांधकाम कारागीर आणि निर्माते', 'ନିର୍ମାଣ କାରିଗର ଓ ନିର୍ମାତା', 'নির্মাণ কর্মী ও নির্মাতা'),
        description: m8('Guilds and mobile bands of master earth-movers, masons, and quarrymen.', 'मास्टर भू-खनकों, राजमिस्त्रियों और पाषाण कारीगरों के दल।', 'భూ తవ్వకం, రాతి కట్టడాల నిపుణుల బృందాలు.', 'ಮಣ್ಣು ಮತ್ತು ಕಲ್ಲಿನ ನಿರ್ಮಾಣ ಪರಿಣತರ ತಂಡಗಳು.', 'மண் மற்றும் கல் கட்டுமானக் கலைஞர் குழுக்கள்.', 'माती व दगडी बांधकाम करणाऱ्या कारागिरांचे संघ.', 'ମାଟି ଓ ପଥର ନିର୍ମାଣ କାରିଗର ଦଳ।', 'মাটি ও পাথর নির্মাণ কারিগরদের সংঘ।')
      },
      {
        id: 'sub_3_3',
        name: m8('Civil Engineering Contributions', 'सिविल अभियांत्रिकी योगदान', 'సివిల్ ఇంజనీరింగ్ సేవలు', 'ಸಿವಿಲ್ ಎಂಜಿನಿಯರಿಂಗ್ ಕೊಡುಗೆಗಳು', 'சிவில் பொறியியல் பங்களிப்புகள்', 'स्थापत्य अभियांत्रिकी योगदान', 'ସିଭିଲ୍ ଇଞ୍ଜିନିୟରିଂ ଅବଦାନ', 'পুরকৌশলগত অবদান'),
        description: m8('Pre-modern hydrological grading, gradient surveying, and embankment stabilization.', 'पूर्व-आधुनिक जल-ढलान सर्वेक्षण और तटबंध स्थिरीकरण।', 'నీటి ప్రవాహ వాలు అంచనా మరియు ఆనకట్టల పటిష్టత.', 'ನೀರಿನ ಹರಿವಿನ ಇಳಿಜಾರು ಮಾಪನ ಮತ್ತು ಏರಿ ಭದ್ರಪಡಿಸುವಿಕೆ.', 'நீர் ஓட்டச் சரிவு அளவீடு மற்றும் கரை பலப்படுத்துதல்.', 'पाण्याच्या प्रवाहाचा उतार मोजणे आणि बंधारे मजबूत करणे.', 'ଜଳ ପ୍ରବାହ ଢାଲୁ ମାପ ଓ ବନ୍ଧ ସୁଦୃଢ଼ୀକରଣ।', 'জলপ্রবাহের ঢাল পরিমাপ ও বাঁধ সুদৃঢ়করণ।')
      },
      {
        id: 'sub_3_4',
        name: m8('Stone Construction', 'पाषाण निर्माण', 'రాతి నిర్మాణం', 'ಕಲ್ಲಿನ ನಿರ್ಮಾಣ', 'கல் கட்டுமானம்', 'दगडी बांधकाम', 'ପଥର ନିର୍ମାଣ', 'প্রস্তর নির্মাণ'),
        description: m8('Dry-stone cyclopean masonry and ashlar dressed blocks.', 'शुष्क-पाषाण चिनाई और तराशे गए पत्थर के ब्लॉक।', 'కంగు రాతి కట్టడాలు మరియు చెక్కిన రాతి దిమ్మెలు.', 'ಒಣ ಕಲ್ಲಿನ ಜೋಡಣೆ ಮತ್ತು ಕೆತ್ತಿದ ಕಲ್ಲಿನ ಬ್ಲಾಕ್‌ಗಳು.', 'உலர் கல் கட்டுமானம் மற்றும் செதுக்கப்பட்ட கற்கள்.', 'कोरड्या दगडांची रचना आणि घडवलेले दगड.', 'ଶୁষ্କ ପଥର ଯୋଡ଼େଇ ଓ କଟା ପଥର ନିର୍ମାଣ।', 'শুষ্ক পাথর গাঁথনি ও কাটা পাথরের ব্লক।')
      },
      {
        id: 'sub_3_5',
        name: m8('Fort Construction', 'दुर्ग निर्माण', 'కోటల నిర్మాణం', 'ಕೋಟೆ ನಿರ್ಮಾಣ', 'கோட்டைக் கட்டுமானம்', 'किल्ले बांधणी', 'ଦୁର୍ଗ ନିର୍ମାଣ', 'দুর্গ নির্মাণ'),
        description: m8('Concentric ramparts, deep wet moats (Parikha), and bastion foundations.', 'संकेंद्रित प्राचीर, गहरी जल-खाइयाँ (परिखा) और बुर्ज की नींव।', 'కోట ప్రాకారాలు, లోతైన కందకాలు (పరిఖ) మరియు బురుజుల పునాదులు.', 'ಕೋಟೆ ಗೋಡೆಗಳು, ಆಳವಾದ ಕಂದಕಗಳು ಮತ್ತು ಕೊತ್ತಲಗಳ ಅಡಿಪಾಯ.', 'கோட்டை மதில்கள், ஆழமான அகழிகள் மற்றும் கொத்தளங்கள்.', 'किल्ल्याची तटबंदी, खोल खंदक आणि बुरुजांचा पाया.', 'ଦୁର୍ଗ ପ୍ରାଚୀର, ଗଭୀର ପରିଖା ଓ ବୁରୁଜ ମୂଳଦୁଆ।', 'দুর্গ প্রাচীর, গভীর পরিখা ও বুরুজের ভিত্তি।')
      },
      {
        id: 'sub_3_6',
        name: m8('Temple Construction', 'मंदिर निर्माण', 'దేవాలయ నిర్మాణం', 'ದೇವಾಲಯ ನಿರ್ಮಾಣ', 'கோயில் கட்டுமானம்', 'मंदिर बांधणी', 'ମନ୍ଦିର ନିର୍ମାଣ', 'মନ୍ଦির নির্মাণ'),
        description: m8('Quarry extraction, heavy stone hauling on wooden rollers, and foundation plinths.', 'खदान से पत्थर निकालना, लकड़ी के रोलरों पर भारी पत्थर ढोना और मंदिर का अधिष्ठान बनाना।', 'రాతి గనుల తవ్వకం, భారీ రాళ్లను తరలించడం మరియు ఆలయ పునాది నిర్మాణం.', 'ಕಲ್ಲು ಗಣಿಗಾರಿಕೆ, ಬೃಹತ್ ಕಲ್ಲುಗಳ ಸಾಗಾಟ ಮತ್ತು ದೇವಾಲಯದ ಅಡಿಪಾಯ ನಿರ್ಮಾಣ.', 'கல் வெட்டுதல், பெருங்கற்களை நகர்த்துதல் மற்றும் கோயில் அதிஷ்டானம் அமைத்தல்.', 'दगड खाणीतून काढणे, लाकडी रोलर्सवरून वाहून नेणे आणि मंदिराचा पाया बांधणे.', 'ପଥର ଖଣି ଖନନ, ଭାରୀ ପଥର ପରିବହନ ଓ ମନ୍ଦିର ପୀଠ ନିର୍ମାଣ।', 'পাথর খনন, কাঠের রোলারে ভারী পাথর পরিবহন ও মন্দিরের ভিত্তি নির্মাণ।')
      },
      {
        id: 'sub_3_7',
        name: m8('Traditional Roads and Infrastructure', 'पारंपरिक सड़कें एवं बुनियादी ढाँचा', 'సాంప్రదాయ రహదారులు మరియు మౌలిక వసతులు', 'ಸಾಂಪ್ರದಾಯಿಕ ರಸ್ತೆಗಳು ಮತ್ತು ಮೂಲಸೌಕರ್ಯ', 'பாரம்பரியச் சாலைகள் மற்றும் உள்கட்டமைப்பு', 'पारंपरिक रस्ते आणि पायाभूत सुविधा', 'ପାରମ୍ପରିକ ସଡ଼କ ଓ ଭିତ୍ତିଭୂମି', 'ঐতিহ্যবাহী সড়ক ও পরিকাঠামো'),
        description: m8('Mountain ghat passes, stone causeways, rest-house stepwells, and colonial-era railway/canal embankments.', 'पहाड़ी घाट मार्ग, पत्थर के सेतु, बावड़ियाँ और रेल/नहर तटबंध।', 'కొండ ఘాట్ రోడ్లు, రాతి వంతెనలు, దిగుడు బావులు మరియు రైల్వే/కాలువ కట్టలు.', 'ಘಾಟ್ ರಸ್ತೆಗಳು, ಕಲ್ಲಿನ ಸೇತುವೆಗಳು, ಮೆಟ್ಟಿಲು ಬಾವಿಗಳು ಮತ್ತು ರೈಲ್ವೆ/ಕಾಲುವೆ ಏರಿಗಳು.', 'மலைப்பாதைகள், கற்பாலங்கள், படிக்கிணறுகள் மற்றும் ரயில்வே/கால்வாய் கரைகள்.', 'घाटरस्ते, दगडी पूल, बारवा आणि रेल्वे/कालव्यांचे भराव.', 'ଘାଟି ରାସ୍ତା, ପଥର ସେତୁ, ପାହାଚ କୂଅ ଓ ରେଳ/କେନାଲ୍ ବନ୍ଧ।', 'পাহাড়ি ঘাট পথ, পাথরের সেতু, বাওলি এবং রেল/খাল বাঁধ।')
      },
      {
        id: 'sub_3_8',
        name: m8('Tanks, Canals, and Irrigation Structures', 'तालाब, नहरें एवं सिंचाई संरचनाएँ', 'చెరువులు, కాలువలు మరియు సాగునీటి కట్టడాలు', 'ಕೆರೆಗಳು, ಕಾಲುವೆಗಳು ಮತ್ತು ನೀರಾವರಿ ರಚನೆಗಳು', 'ஏரிகள், கால்வாய்கள் மற்றும் பாசனக் கட்டுமானங்கள்', 'तलाव, कालवे आणि सिंचन संरचना', 'ଜଳାଶୟ, କେନାଲ୍ ଓ ଜଳସେଚନ ନିର୍ମାଣ', 'জলাশয়, খাল ও জলসেচ কাঠামো'),
        description: m8('Stepwells (Vav/Baoli), anicuts, cascading tanks, and stone spillways.', 'बावड़ियाँ (वाव), एनीकट, श्रृंखलाबद्ध तालाब और पत्थर के जल-निकास।', 'దిగుడు బావులు, ఆనకట్టలు, గొలుసుకట్టు చెరువులు మరియు రాతి మత్తళ్లు.', 'ಮೆಟ್ಟಿಲು ಬಾವಿಗಳು, ಅಣೆಕಟ್ಟುಗಳು, ಸರಣಿ ಕೆರೆಗಳು ಮತ್ತು ಕಲ್ಲಿನ ಕೋಡಿಗಳು.', 'படிக்கிணறுகள், அணைக்கட்டுகள், தொடர் ஏரிகள் மற்றும் கற்கலிங்குகள்.', 'बारवा, बंधारे, साखळी तलाव आणि दगडी सांडवे.', 'ପାହାଚ କୂଅ, ଆନିକଟ, ଶୃଙ୍ଖଳିତ ଜଳାଶୟ ଓ ପଥର ଜଳ-ନିର୍ଗମ ପଥ।', 'বাওলি, অ্যানিকট, ধারাবাহিক জলাশয় ও পাথরের জলনিকাশি পথ।')
      },
      {
        id: 'sub_3_9',
        name: m8('Traditional Building Materials', 'पारंपरिक निर्माण सामग्री', 'సాంప్రదాయ నిర్మాణ సామగ్రి', 'ಸಾಂಪ್ರದಾಯಿಕ ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳು', 'பாரம்பரியக் கட்டுமானப் பொருட்கள்', 'पारंपरिक बांधकाम साहित्य', 'ପାରମ୍ପରିକ ନିର୍ମାଣ ସାମଗ୍ରୀ', 'ঐতিহ্যবাহী নির্মাণ সামগ্রী'),
        description: m8('Granite, charnockite, khondalite, laterite (Mankada Pathera), lime-surkhi mortar, and puddle clay.', 'ग्रेनाइट, खोंडालाइट, लैटेराइट (मांकड़ा पत्थर), चूना-सुर्खी गारा और चिकनी मिट्टी।', 'గ్రానైట్, ఖోండలైట్, లేటరైట్ రాయి, సున్నం-సుర్ఖీ డంగు మరియు బంకమట్టి.', 'ಗ್ರಾನೈಟ್, ಖೊಂಡಲೈಟ್, ಜಂಬಿಟ್ಟಿಗೆ ಕಲ್ಲು, ಸುಣ್ಣದ ಗಾರೆ ಮತ್ತು ಜೇಡಿಮಣ್ಣು.', 'கருங்கல், செம்புராங்கல், சுண்ணாம்பு-சுர்க்கி சாந்து மற்றும் களிமண்.', 'ग्रॅनाइट, जांभा दगड, चुना-सुरखी मिश्रण आणि चिकणमाती.', 'ଗ୍ରାନାଇଟ୍, ଖୋଣ୍ଡାଲାଇଟ୍, ମାଙ୍କଡ଼ା ପଥର, ଚୂନ-ସୁରଖି ଓ ଚିକିଟା ମାଟି।', 'গ্রানাইট, খন্ডালাইট, ল্যাটেরাইট পাথর, চুন-সুরকি ও এঁটেল মাটি।')
      },
      {
        id: 'sub_3_10',
        name: m8('Engineering Techniques and Tools', 'अभियांत्रिकी तकनीकें एवं उपकरण', 'ఇంజనీరింగ్ పద్ధతులు మరియు పనిముట్లు', 'ಎಂಜಿನಿಯರಿಂಗ್ ತಂತ್ರಗಳು ಮತ್ತು ಉಪಕರಣಗಳು', 'பொறியியல் நுட்பங்கள் மற்றும் கருவிகள்', 'अभियांत्रिकी तंत्रे आणि साधने', 'ଯାନ୍ତ୍ରିକ କୌଶଳ ଓ ଉପକରଣ', 'প্রকৌশল কৌশল ও সরঞ্জাম'),
        description: m8('Thermal rock-splitting (fire-setting and water quenching), iron wedges (uli), heavy sledgehammers (sutte), and plumb-lines.', 'तापीय चट्टान-विभाजन (अग्नि व जल तकनीक), लोहे की छेनी (उली), घन (सुत्ते) और साहुल-सूत्र।', 'నిప్పు-నీటితో బండలను పగలగొట్టే సాంకేతికత, ఇనుప ఉలి, సమ్మెట మరియు లంబసూత్రం.', 'ಬೆಂಕಿ-ನೀರಿನಿಂದ ಬಂಡೆ ಸೀಳುವ ತಂತ್ರ, ಕಬ್ಬಿಣದ ಉಳಿ, ಸುತ್ತಿಗೆ ಮತ್ತು ಲಂಬಸೂತ್ರ.', 'நெருப்பு-நீர் கொண்டு பாறை பிளக்கும் நுட்பம், உளி, சம்மட்டி மற்றும் தூக்குநூல்.', 'विस्तव व पाण्याने खडक फोडण्याचे तंत्र, लोखंडी छिन्नी, घण आणि ओळंबा.', 'ଅଗ୍ନି ଓ ଜଳ ଦ୍ୱାରା ପଥର ଫଟାଇବା କୌଶଳ, ଲୌହ ନିହଣ, ହାତୁଡ଼ି ଓ ସୂତା।', 'আগুন ও জল দিয়ে পাথর ফাটানোর কৌশল, লোহার ছেনি, হাতুড়ি ও ওলনদড়ি।')
      },
      {
        id: 'sub_3_11',
        name: m8('Inventor of the floor mill', 'आटा चक्की (जाता / घरट्ट) के आविष्कारक (Inventor of the floor mill)', 'తిరగలి (పిండి మిల్లు) ఆవిష్కర్త (Inventor of the floor mill)', 'ಬೀಸುವ ಕಲ್ಲಿನ ಆವಿಷ್ಕಾರಕರು (Inventor of the floor mill)', 'மாவு அரைக்கும் இயந்திரக் கண்டுபிடிப்பாளர் (Inventor of the floor mill)', 'जात्याचे (चक्की) शोधकर्ते (Inventor of the floor mill)', 'ପେଷଣ ଚକିର ଉଦ୍ଭାବକ (Inventor of the floor mill)', 'যাঁতার (আটা চাক্কি) উদ্ভাবক (Inventor of the floor mill)'),
        description: m8(
          'Traditional stone-carving credit for fashioning rotary stone grain-mills (Chakki / Tiragali / Ragal-kallu / Jata) used in every Indian household.',
          'प्रत्येक भारतीय घर में प्रयुक्त होने वाली घूर्णन पाषाण आटा चक्की (चक्की / तिरगली / रगल-कल्लु / जाता) के निर्माण व आविष्कार की सामुदायिक परंपरा।',
          'ప్రతి భారతీయ ఇంటిలో ధాన్యాన్ని పిండి చేసే రాతి తిరగలి (Chakki / Tiragali)ని రూపొందించి, చెక్కిన ఆవిష్కర్తలుగా సాంప్రదాయ గుర్తింపు.',
          'ಪ್ರತಿಯೊಂದು ಭಾರತೀಯ ಮನೆಯಲ್ಲಿ ಬಳಸುವ ಕಲ್ಲಿನ ಬೀಸುವ ಕಲ್ಲು (ರಗಲ್-ಕಲ್ಲು / ತಿರಗಲಿ / ಚಕ್ಕಿ) ರೂಪಿಸಿದ ಸಾಂಪ್ರದಾಯಿಕ ಹಿರಿಮೆ.',
          'இந்திய இல்லங்களில் மாவு அரைக்கப் பயன்படும் சுழலும் கல் இயந்திரத்தை (திரிகை / சக்கி) உருவாக்கிய பாரம்பரியப் பெருமை.',
          'प्रत्येक घरातील दगडी जाते (चक्की / तिरगली) घडवण्याचे आणि शोधण्याचे पारंपरिक श्रेय.',
          'ପ୍ରତ୍ୟେକ ଗୃହରେ ବ୍ୟବହୃତ ପଥର ଚକି (ପେଷଣ ଯନ୍ତ୍ର) ନିର୍ମାଣ ଓ ଉଦ୍ଭାବନର ପାରମ୍ପରିକ ଗୌରବ।',
          'প্রতিটি ভারতীয় গৃহে ব্যবহৃত পাথরের যাঁতা (চাক্কি) তৈরি ও উদ্ভাবনের ঐতিহ্যবাহী স্বীকৃতি।'
        )
      },
      {
        id: 'sub_3_12',
        name: m8('Inventor of the Running Wheel', 'गतिशील चक्र (रनिंग व्हील) के आविष्कारक (Inventor of the Running Wheel)', 'తిరిగే చక్రం (రన్నింగ్ వీల్) ఆవిష్కర్త (Inventor of the Running Wheel)', 'ಚಲಿಸುವ ಚಕ್ರದ ಆವಿಷ್ಕಾರಕರು (Inventor of the Running Wheel)', 'சுழலும் சக்கரக் கண்டுபிடிப்பாளர் (Inventor of the Running Wheel)', 'फिरत्या चाकाचे शोधकर्ते (Inventor of the Running Wheel)', 'ଘୂର୍ଣ୍ଣନ ଚକ୍ର (ରନିଂ ହ୍ୱିଲ୍)ର ଉଦ୍ଭାବକ', 'ঘূর্ণায়মান চাকার (রানিং হুইল) উদ্ভাবক'),
        description: m8(
          'Heritage of solid stone-and-timber transport wheels (Bandi-Vaddar / Bandi-Oddar) and monolithic stone temple-chariot wheels.',
          'भारी पत्थर ढोने वाली गाड़ियों के ठोस पहियों (बंदी-वड्डार) और मंदिर रथ-चक्रों के निर्माण की तकनीकी परंपरा।',
          'భారీ రాళ్లను తరలించే బండ్ల చక్రాలు (బండి-వడ్డెర) మరియు రాతి రథ చక్రాలను రూపొందించిన సాంకేతిక వారసత్వం.',
          'ಬೃಹತ್ ಕಲ್ಲುಗಳನ್ನು ಸಾಗಿಸುವ ಬಂಡಿ ಚಕ್ರಗಳು (ಬಂಡಿ-ವಡ್ಡರ್) ಮತ್ತು ಕಲ್ಲಿನ ರಥಚಕ್ರಗಳನ್ನು ನಿರ್ಮಿಸಿದ ತಾಂತ್ರಿಕ ಪರಂಪರೆ.',
          'பெருங்கற்களைச் சுமக்கும் வண்டிச் சக்கரங்கள் (பண்டி-ஒட்டர்) மற்றும் கல் தேர்ச் சக்கரங்களை உருவாக்கிய தொழில்நுட்ப மரபு.',
          'अवजड दगड वाहून नेणाऱ्या गाड्यांची चाके (गाडी-वडार) आणि दगडी रथचक्रे घडवण्याची तांत्रिक परंपरा.',
          'ଭାରୀ ପଥର ବୁହା ଶଗଡ଼ ଚକ ଓ ମନ୍ଦିର ରଥ-ଚକ୍ର ନିର୍ମାଣର ଯାନ୍ତ୍ରିକ ପରମ୍ପରା।',
          'ভারী পাথর পরিবহনের গাড়ির চাকা এবং প্রস্তর রথচক্র নির্মাণের কারিগরি ঐতিহ্য।'
        )
      },
      {
        id: 'sub_3_13',
        name: m8('Builders of Universe', 'विश्व-निर्माता (Builders of Universe)', 'విశ్వ నిర్మాతలు (Builders of Universe)', 'ವಿಶ್ವ ನಿರ್ಮಾತೃಗಳು (Builders of Universe)', 'உலகக் கட்டுமானர்கள் (Builders of Universe)', 'विश्व-निर्माते (Builders of Universe)', 'ବିଶ୍ୱ ନିର୍ମାତା (Builders of Universe)', 'বিশ্ব-নির্মাতা (Builders of Universe)'),
        description: m8(
          'Honorific cultural epithet celebrating the foundational earth-shaping, quarry-carving, and water-harvesting labor that built human settlements.',
          'मानव बस्तियों, जलाशयों और दुर्गों को आकार देने वाले आधारभूत निर्माण श्रम का सम्मान करने वाली सांस्कृतिक उपाधि।',
          'మానవ నివాసాలు, జలాశయాలు మరియు కోటలను నిర్మించిన శిల్ప-నిర్మాణ శ్రమను గౌరవించే సాంస్కృతిక బిరుదు.',
          'ಮಾನವ ನೆಲೆಗಳು, ಜಲಾಶಯಗಳು ಮತ್ತು ಕೋಟೆಗಳನ್ನು ನಿರ್ಮಿಸಿದ ಮೂಲಭೂತ ಶ್ರಮವನ್ನು ಗೌರವಿಸುವ ಸಾಂಸ್ಕೃತಿಕ ಬಿರುದು.',
          'மனிதக் குடியிருப்புகள், நீர்நிலைகள் மற்றும் கோட்டைகளை உருவாக்கிய உழைப்பைப் போற்றும் கலாச்சாரப் பட்டம்.',
          'मानवी वसाहती, जलाशय आणि किल्ले उभारणाऱ्या मूलभूत श्रमाला दिलेली सांस्कृतिक उपाधी.',
          'ମାନବ ବସତି, ଜଳାଶୟ ଓ ଦୁର୍ଗ ଗଢ଼ିଥିବା ମୂଳ ଶ୍ରମକୁ ସମ୍ମାନ ଜଣାଇ ବ୍ୟବହୃତ ସାଂସ୍କୃତିକ ଉପାଧି।',
          'মানব বসতি, জলাশয় ও দুর্গ নির্মাণকারী মৌলিক শ্রমকে সম্মান জানিয়ে ব্যবহৃত সাংস্কৃতিক উপাধি।'
        )
      }
    ],
    definitionAndExplanation: m8(
      'Construction and Engineering Heritage represents the most widely documented occupational domain of the Od / Oad, Waddar / Vaddar, Vaddera, and Odde communities across the Indian subcontinent. From ancient canal excavation to medieval hill-fort ramparts, stepwells, and temple foundations, these communities functioned as pre-modern civil, geotechnical, and hydraulic engineers. In community cultural memory, their mastery over stone-dressing, rotary querns (floor mills), heavy stone-cart wheels (running wheels), and macro-scale landscape shaping earned them the poetic epithet "LokaShilpi / Builders of Universe".',
      'निर्माण और अभियांत्रिकी विरासत भारतीय उपमहाद्वीप में ओड, वडार / वड्डार, वड्डेरा और ओड्डे समुदायों का सबसे व्यापक रूप से प्रमाणित व्यावसायिक क्षेत्र है। प्राचीन नहर खनन से लेकर मध्यकालीन गिरि-दुर्गों की प्राचीर, बावड़ियों और मंदिरों की नींव तक, इन समुदायों ने पूर्व-आधुनिक सिविल, भू-तकनीकी और जल-अभियंताओं के रूप में कार्य किया। पत्थर की आटा चक्की (Floor Mill), भारी पाषाण-गाड़ियों के पहियों (Running Wheel) और विशाल भू-निर्माण में दक्षता के कारण सामुदायिक परंपरा में इन्हें "लोकशिल्पी / विश्व-निर्माता (Builders of Universe)" कहा गया है।',
      'నిర్మాణ మరియు ఇంజనీరింగ్ వారసత్వం భారత ఉపఖండంలో ఓడ్, వడ్డార్, వడ్డెర మరియు ఒడ్డే సమాజాల యొక్క అత్యంత విస్తృతంగా నమోదైన వృత్తి రంగం. ప్రాచీన కాలువల తవ్వకం నుండి మధ్యయుగ కొండ కోటల ప్రాకారాలు, దిగుడు బావులు మరియు ఆలయ పునాదుల వరకు వీరు పూర్వ-ఆధునిక సివిల్ మరియు జల ఇంజనీర్లుగా పనిచేశారు. రాతి తిరగలి (Floor Mill), రాతి బండి చక్రాలు (Running Wheel) మరియు బృహత్ నిర్మాణాల కారణంగా వీరిని "లోకశిల్పి / విశ్వ నిర్మాతలు (Builders of Universe)"గా వ్యవహరిస్తారు.',
      'ನಿರ್ಮಾಣ ಮತ್ತು ಎಂಜಿನಿಯರಿಂಗ್ ಪರಂಪರೆಯು ಭಾರತೀಯ ಉಪಖಂಡದಲ್ಲಿ ಓಡ್, ವಡ್ಡರ್, ವಡ್ಡೇರ ಮತ್ತು ಒಡ್ಡೇ ಸಮುದಾಯಗಳ ಅತ್ಯಂತ ವ್ಯಾಪಕವಾಗಿ ದಾಖಲಾದ ಕ್ಷೇತ್ರವಾಗಿದೆ. ಪ್ರಾಚೀನ ಕಾಲುವೆಗಳಿಂದ ಹಿಡಿದು ಕೋಟೆ ಗೋಡೆಗಳು, ಮೆಟ್ಟಿಲು ಬಾವಿಗಳು, ಬೀಸುವ ಕಲ್ಲು (Floor Mill) ಮತ್ತು ಬಂಡಿ ಚಕ್ರಗಳ (Running Wheel) ನಿರ್ಮಾಣದವರೆಗೆ ಇವರ ಕೊಡುಗೆ ಅಪಾರವಾಗಿದ್ದು, ಇವರನ್ನು "ಲೋಕಶಿಲ್ಪಿ / ವಿಶ್ವ ನಿರ್ಮಾತೃಗಳು (Builders of Universe)" ಎಂದು ಗೌರವಿಸಲಾಗುತ್ತದೆ.',
      'கட்டுமானம் மற்றும் பொறியியல் பாரம்பரியம் இந்திய துணைக்கண்டத்தில் ஓட், வட்டார், வட்டேரா மற்றும் ஒட்டர் சமூகங்களின் விரிவாக ஆவணப்படுத்தப்பட்ட துறையாகும். கால்வாய்கள், கோட்டை மதில்கள், படிக்கிணறுகள், மாவு அரைக்கும் இயந்திரம் (Floor Mill) மற்றும் சக்கரங்கள் (Running Wheel) ஆகியவற்றை உருவாக்கியதால் இவர்கள் "லோகசில்பி / உலகக் கட்டுமானர்கள் (Builders of Universe)" எனப் போற்றப்படுகின்றனர்.',
      'बांधकाम आणि अभियांत्रिकी वारसा हा भारतीय उपखंडातील ओड, वडार, वड्डेरा आणि ओड्डे समाजाचा सर्वाधिक नोंदवलेला व्यवसाय आहे. प्राचीन कालवे, किल्ल्यांची तटबंदी, बारवा, दगडी जाते (Floor Mill) आणि अवजड गाड्यांची चाके (Running Wheel) घडवल्यामुळे त्यांना "लोकशिल्पी / विश्व-निर्माते (Builders of Universe)" म्हटले जाते.',
      'ନିର୍ମାଣ ଓ ଯାନ୍ତ୍ରିକ ଐତିହ୍ୟ ଭାରତୀୟ ଉପମହାଦେଶରେ ଓଡ଼, ୱଡ୍ଡାର, ଭଡ୍ଡେରା ଓ ଓଡ୍ଡେ ସମୁଦାୟଙ୍କର ସର୍ବାଧିକ ପ୍ରମାଣିତ କ୍ଷେତ୍ର। ପ୍ରାଚୀନ କେନାଲ୍, ଦୁର୍ଗ ପ୍ରାଚୀର, ପାହାଚ କୂଅ, ପଥର ଚକି (Floor Mill) ଓ ଶଗଡ଼ ଚକ (Running Wheel) ନିର୍ମାଣ ଯୋଗୁଁ ସେମାନଙ୍କୁ "ଲୋକଶିଳ୍ପୀ / ବିଶ୍ୱ ନିର୍ମାତା" କୁହାଯାଏ।',
      'নির্মাণ ও প্রকৌশল ঐতিহ্য ভারতীয় উপমহাদেশে ওড, বড্ডার, ভড্ডেরা ও ওড্ডে সম্প্রদায়ের সর্বাধিক নথিবদ্ধ পেশাগত ক্ষেত্র। প্রাচীন খাল, দুর্গ প্রাচীর, বাওলি, পাথরের যাঁতা (Floor Mill) ও চাকা (Running Wheel) নির্মাণের জন্য তাঁদের "লোকশিল্পী / বিশ্ব-নির্মাতা" বলা হয়।'
    ),
    historicalBackground: m8(
      'Epigraphic records from the Vijayanagara Empire, Telugu Choda principalities, Solanki Gujarat, and Kalyana Chalukya / Sharana Maharashtra-Karnataka attest to specialized guilds of stone-cutters (Kallu-Vaddar / Pathar-Od) and earth-excavators (Mannu-Vaddar / Bail-Od). In the 19th and 20th centuries, British Public Works Department (PWD) engineers documented that the vast network of South Asian canals (Upper Bari Doab, Indira Gandhi/Gang Canal precursors, Godavari-Krishna anicut canals) and railway cuttings across the Western and Eastern Ghats relied fundamentally on the traditional expertise of Od and Waddar contractors and labor bands.',
      'विजयनगर साम्राज्य, तेलुगु चोड, सोलंकी गुजरात और कल्याण चालुक्य / शरण काल के अभिलेख पाषाण-शिल्पियों (कल्लु-वड्डार / पत्थर-ओड) और भू-खनकों (मन्नु-वड्डार) के विशिष्ट संघों को प्रमाणित करते हैं। 19वीं और 20वीं शताब्दी में ब्रिटिश लोक निर्माण विभाग (PWD) के इंजीनियरों ने दर्ज किया कि दक्षिण एशिया की प्रमुख नहरों और पश्चिमी व पूर्वी घाट के रेल मार्गों का निर्माण ओड और वडार समाज के पारंपरिक कौशल पर आधारित था।',
      'విజయనగర సామ్రాజ్యం, తెలుగు చోళులు, సోలంకి గుజరాత్ మరియు కళ్యాణ చాళుక్యుల కాలం నాటి శాసనాలు రాతి పనివారు (కల్లు-వడ్డెర) మరియు మట్టి తవ్వకం నిపుణుల (మన్ను-వడ్డెర) సంఘాలను ధృవీకరిస్తున్నాయి. 19-20 శతాబ్దాలలో బ్రిటిష్ పబ్లిక్ వర్క్స్ డిపార్ట్‌మెంట్ (PWD) నివేదికలు దక్షిణ ఆసియాలోని ప్రధాన కాలువలు, రైల్వే లైన్లు మరియు ఘాట్ రోడ్ల నిర్మాణంలో వీరి పాత్రను ప్రత్యేకంగా నమోదు చేశాయి.',
      'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ, ಸೋಲಂಕಿ ಗುಜರಾತ್ ಮತ್ತು ಕಲ್ಯಾಣ ಚಾಲುಕ್ಯರ ಶಾಸನಗಳು ಕಲ್ಲು-ವಡ್ಡರ್ ಮತ್ತು ಮಣ್ಣು-ವಡ್ಡರ್ ಸಂಘಗಳನ್ನು ಉಲ್ಲೇಖಿಸುತ್ತವೆ. 19 ಮತ್ತು 20ನೇ ಶತಮಾನದಲ್ಲಿ ಬ್ರಿಟಿಷ್ ಪಿಡಬ್ಲ್ಯೂಡಿ (PWD) ವರದಿಗಳು ಭಾರತದ ಪ್ರಮುಖ ಕಾಲುವೆಗಳು ಮತ್ತು ಘಾಟ್ ರೈಲು ಮಾರ್ಗಗಳ ನಿರ್ಮಾಣದಲ್ಲಿ ಈ ಸಮುದಾಯದ ಪಾತ್ರವನ್ನು ದಾಖಲಿಸಿವೆ.',
      'விஜயநகரப் பேரரசு, சோலங்கி குஜராத் மற்றும் சாளுக்கியக் கல்வெட்டுகள் கல்லு-வட்டர் மற்றும் மண்ணு-வட்டர் குழுக்களைக் குறிப்பிடுகின்றன. 19 மற்றும் 20-ஆம் நூற்றாண்டுகளில் பொதுப்பணித்துறை (PWD) ஆவணங்கள் தென்னிந்தியக் கால்வாய்கள் மற்றும் ரயில் பாதைகள் அமைப்பதில் இவர்களின் பங்களிப்பைப் பதிவு செய்துள்ளன.',
      'विजयनगर साम्राज्य, सोलंकी गुजरात आणि चालुक्य शिलालेखांत दगड-वडार (कल्लु-वड्डार) आणि माती-वडार (मन्नु-वड्डार) यांचा उल्लेख आहे. १९ व्या व २० व्या शतकात ब्रिटिश पब्लिक वर्क्स डिपार्टमेंटच्या (PWD) अहवालांत भारतातील प्रमुख कालवे व रेल्वे घाटमाथे उभारण्यात या समाजाचे योगदान नोंदवले आहे.',
      'ବିଜୟନଗର ସାମ୍ରାଜ୍ୟ, ସୋలంକି ଗୁଜରାଟ ଓ ଚାଲୁକ୍ୟ ଶିଳାଲେଖରେ ପଥର-ଶିଳ୍ପୀ (కଲ୍ଲୁ-ୱଡ୍ଡାର) ଓ ମାଟି-ଖନକ (ମନ୍ନୁ-ୱଡ୍ଡାର)ଙ୍କ ଉଲ୍ଲେଖ ଅଛି। ୧୯ ଓ ୨୦ ଶତାବ୍ଦୀରେ ବ୍ରିଟିଶ PWD ରିପୋର୍ଟରେ ଭାରତର ପ୍ରମୁଖ କେନାଲ୍ ଓ ରେଳପଥ ନିର୍ମାଣରେ ସେମାନଙ୍କ ଭୂମିକା ଲିପିବଦ୍ଧ ହୋଇଛି।',
      'বিজয়নগর সাম্রাজ্য, সোলাঙ্কি গুজরাত ও চালুক্য শিলালিপিতে পাথর-শিল্পী (কাল্লু-বড্ডার) ও মাটি-খনকদের (মান্নু-বড্ডার) উল্লেখ রয়েছে। ১৯ ও ২০ শতকে ব্রিটিশ পিডব্লিউডি (PWD) প্রতিবেদনে ভারতের প্রধান খাল ও রেলপথ নির্মাণে তাঁদের অবদান নথিবদ্ধ হয়েছে।'
    ),
    toolsMaterialsAndTechniques: m8(
      '1. Thermal Rock Splitting: Heating granite seams along natural cleavage lines with wood fire and rapidly dousing with cold water, followed by driving tempered iron wedges (Uli/Chisel) with heavy hammers.\n2. Rotary Millstone Fabrication: Dressing paired circular basalt or granite stones with a central pivot pin and spiral grinding grooves (Inventor of the floor mill tradition).\n3. Solid Stone & Timber Wheels: Crafting heavy-load solid timber and stone-rimmed wheels capable of carrying multi-ton monoliths over unpaved terrain (Inventor of the Running Wheel tradition).',
      '1. तापीय चट्टान विभाजन: ग्रेनाइट की प्राकृतिक दरारों पर लकड़ी की आग जलाकर और ठंडा पानी डालकर चट्टान चटकाना, फिर लोहे की छेनी व घन से सटीक ब्लॉक काटना।\n2. घूर्णन चक्की निर्माण: बेसाल्ट या ग्रेनाइट के दो गोल पत्थरों को केंद्रीय धुरी और सर्पिल खांचों के साथ तराशना (आटा चक्की के आविष्कारक परंपरा)।\n3. ठोस पाषाण व काष्ठ चक्र: कई टन भारी पत्थरों को ढोने के लिए ठोस पहियों का निर्माण (गतिशील चक्र परंपरा)।',
      '1. తాపీయ రాతి విభజన: గ్రానైట్ బండలపై మంట పెట్టి చల్లని నీరు చల్లి పగుళ్లు ఏర్పరచి, ఇనుప ఉలి, సమ్మెటతో ఖచ్చితమైన రాతి దిమ్మెలను కోయడం.\n2. రాతి తిరగలి తయారీ: ధాన్యం విసిరేందుకు మధ్యలో ఇరుసు, గరుకు గీతలతో గుండ్రని రాతి తిరగళ్లను చెక్కడం (Inventor of the floor mill).\n3. భారీ రాతి-చెక్క చక్రాలు: టన్నుల కొద్దీ బరువున్న శిలలను తరలించే బండి చక్రాల తయారీ (Inventor of the Running Wheel).',
      '1. ಬಂಡೆ ಸೀಳುವ ತಂತ್ರ: ಗ್ರಾನೈಟ್ ಬಂಡೆಗಳ ಮೇಲೆ ಬೆಂಕಿ ಹಾಕಿ ನೀರು ಸುರಿದು ಕಬ್ಬಿಣದ ಉಳಿಗಳಿಂದ ನಿಖರವಾಗಿ ಕಲ್ಲುಗಳನ್ನು ಬೇರ್ಪಡಿಸುವುದು.\n2. ಬೀಸುವ ಕಲ್ಲು ತಯಾರಿಕೆ: ಧಾನ್ಯ ಬೀಸಲು ವೃತ್ತಾಕಾರದ ಕಲ್ಲುಗಳನ್ನು ಕೆತ್ತುವುದು (Inventor of the floor mill).\n3. ಬೃಹತ್ ಬಂಡಿ ಚಕ್ರಗಳು: ಭಾರೀ ಕಲ್ಲುಗಳನ್ನು ಸಾಗಿಸುವ ಚಕ್ರಗಳ ನಿರ್ಮಾಣ (Inventor of the Running Wheel).',
      '1. பாறை பிளக்கும் நுட்பம்: கருங்கல் பாறைகளில் நெருப்பிட்டு நீர் ஊற்றி உளிகளால் கற்களைப் பிரித்தெடுத்தல்.\n2. மாவு அரைக்கும் இயந்திரம்: தானியங்களை அரைக்க வட்ட வடிவக் கற்களைச் செதுக்குதல் (Inventor of the floor mill).\n3. வண்டிச் சக்கரங்கள்: பெருங்கற்களைக் கொண்டு செல்லும் உறுதியான சக்கரங்களை உருவாக்குதல் (Inventor of the Running Wheel).',
      '१. खडक फोडण्याचे तंत्र: ग्रॅनाइट खडकावर विस्तव पेटवून पाणी ओतून आणि लोखंडी छिन्नीने अचूक दगड काढणे.\n२. दगडी जाते निर्मिती: धान्य दळण्यासाठी गोल दगडी जाते घडवणे (Inventor of the floor mill).\n३. अवजड गाड्यांची चाके: मोठे दगड वाहून नेणारी मजबूत चाके बनवणे (Inventor of the Running Wheel).',
      '୧. ପଥର ଫଟାଇବା କୌଶଳ: ଅଗ୍ନି ଓ ଜଳ ପ୍ରୟୋଗ କରି ଗ୍ରାନାଇଟ୍ ପଥର କାଟିବା।\n୨. ପଥର ଚକି ନିର୍ମାଣ: ଶସ୍ୟ ପେଷିବା ପାଇଁ ଗୋଲାକାର ପଥର ଚକି ତିଆରି କରିବା (Inventor of the floor mill)।\n୩. ଭାରୀ ଚକ ନିର୍ମାଣ: ବୃହତ୍ ପଥର ବୋହିବା ପାଇଁ ଶଗଡ଼ ଚକ ତିଆରି କରିବା (Inventor of the Running Wheel)।',
      '১. পাথর ফাটানোর কৌশল: আগুন ও জল ব্যবহার করে গ্রানাইট পাথর কাটা।\n২. পাথরের যাঁতা নির্মাণ: শস্য পেষাইয়ের জন্য গোলাকার পাথরের যাঁতা তৈরি (Inventor of the floor mill)।\n৩. ভারী চাকা নির্মাণ: বিশাল পাথর পরিবহনের জন্য মজবুত চাকা তৈরি (Inventor of the Running Wheel)।'
    ),
    culturalAndRegionalSignificance: m8(
      'Before breaking ground for any reservoir, well, or fort bastion, traditional builders perform Bhumi Puja and invoke Maharshi Bhagiratha, Samrat Sagara, Goddess Jasma Devi, or Shivayogi Siddharameshwara. Note on Monument Attribution: While community oral traditions preserve proud memories of ancestral labor on major South Asian forts and temples, scholarly historiography attributes monument patronage to ruling dynasties and credits stone-cutter and earthworker guilds collectively where specific artisan names are unrecorded.',
      'किसी भी जलाशय, कुएँ या दुर्ग की नींव रखने से पूर्व पारंपरिक निर्माता भूमि पूजा करते हैं और महर्षि भगीरथ, सम्राट सगर, माता जस्मा देवी या संत सिद्धरामेश्वर का आह्वान करते हैं। स्मारक श्रेय संबंधी टिप्पणी: जहाँ मौखिक परंपराएँ प्रमुख किलों व मंदिरों के निर्माण में पूर्वजों के श्रम का स्मरण करती हैं, वहीं अकादमिक इतिहास विशिष्ट शिलालेखीय साक्ष्य के अनुसार ही किसी स्मारक के निर्माण का श्रेय निर्धारित करता है।',
      'ఏదైనా జలాశయం, బావి లేదా కోట నిర్మాణానికి ముందు భూమి పూజ చేసి మహర్షి భగీరథుడు, సగర చక్రవర్తి, జస్మా దేవి లేదా సిద్ధరామేశ్వరుని ప్రార్థిస్తారు. స్మారక కట్టడాల ఆపాదనపై గమనిక: చారిత్రక ఆధారాలు లేదా శాసనాలు ఉన్నచోట మాత్రమే నిర్దిష్ట కట్టడాల నిర్మాణాన్ని నమోదు చేస్తూ, సాధారణ శిల్ప సంఘాల సేవలను విడిగా గుర్తించడం జరిగింది.',
      'ಯಾವುದೇ ಕೆರೆ, ಬಾವಿ ಅಥವಾ ಕೋಟೆ ನಿರ್ಮಾಣಕ್ಕೂ ಮುನ್ನ ಭೂಮಿ ಪೂಜೆ ನೆರವೇರಿಸಿ ಮಹರ್ಷಿ ಭಗೀರಥ, ಸಗರ ಚಕ್ರವರ್ತಿ, ಜಸ್ಮಾ ದೇವಿ ಅಥವಾ ಸಿದ್ಧರಾಮೇಶ್ವರರನ್ನು ಸ್ಮರಿಸಲಾಗುತ್ತದೆ.',
      'எந்தவொரு ஏரி, கிணறு அல்லது கோட்டைக் கட்டுமானத்திற்கும் முன்பாக பூமி பூஜை செய்து பகீரதர், சகரர், ஜஸ்மா தேவி அல்லது சித்தராமேஸ்வரரை வழிபடுகின்றனர்.',
      'कोणताही तलाव, विहीर किंवा किल्ला बांधण्यापूर्वी भूमीपूजन करून महर्षी भगीरथ, सम्राट सगर, माता जस्मा देवी किंवा संत सिद्धरामेश्वर यांचे स्मरण केले जाते.',
      'ଯେକୌଣସି ଜଳାଶୟ ବା ଦୁର୍ଗ ନିର୍ମାଣ ପୂର୍ବରୁ ଭୂମି ପୂଜା କରାଯାଇ ମହର୍ଷି ଭଗୀରଥ, ସମ୍ରାଟ ସଗର, ମାତା ଜସ୍ମା ଦେବୀ ବା ସିଦ୍ଧରାମେଶ୍ୱରଙ୍କୁ ସ୍ମରଣ କରାଯାଏ।',
      'যেকোনো জলাশয়, কুয়ো বা দুর্গ নির্মাণের পূর্বে ভূমি পূজা করে মহর্ষি ভগীরথ, সম্রাট সগর, মাতা জসমা দেবী বা সন্ত সিদ্ধরামেশ্বরকে স্মরণ করা হয়।'
    ),
    documentedHistoricalExamples: m8(
      '1. Sahastralinga Talav at Patan, Gujarat (11th–12th century CE Solanki era, associated with the Jasma Odan chronicle).\n2. Solapur Siddharameshwara Lake Embankment, Maharashtra (12th century CE Sharana movement).\n3. Vijayanagara and Nayaka irrigation tank inscriptions mentioning Odda/Vodda tank-digging contracts (Dasavanda grants).',
      '1. पाटन (गुजरात) का सहस्रलिंग तालाब (11वीं-12वीं सदी, माता जस्मा ओडन आख्यान से संबद्ध)।\n2. सोलापुर (महाराष्ट्र) का सिद्धरामेश्वर तालाब तटबंध (12वीं सदी)।\n3. विजयनगर और नायक कालीन सिंचाई तालाब शिलालेख जिनमें ओड्डा/वोड्डा तालाब-खनन अनुबंधों (दसबंध अनुदान) का उल्लेख है।',
      '1. పటాన్ (గుజరాత్) లోని సహస్రలింగ తలావ్ (11-12వ శతాబ్దం, జస్మా ఓడన్ చరిత్ర).\n2. సోలాపూర్ (మహారాష్ట్ర) సిద్ధరామేశ్వర తటాక నిర్మాణం (12వ శతాబ్దం).\n3. విజయనగర మరియు నాయక రాజుల కాలపు చెరువు తవ్వకం శాసనాలు (దశబంధ మాన్యాలు).',
      '1. ಗುಜರಾತ್‌ನ ಪಾಠಣದ ಸಹಸ್ರಲಿಂಗ ಕೆರೆ (11-12ನೇ ಶತಮಾನ, ಜಸ್ಮಾ ಓಡನ್ ಚರಿತ್ರೆ).\n2. ಸೊಲ್ಲಾಪುರದ ಸಿದ್ಧರಾಮೇಶ್ವರ ಕೆರೆ ನಿರ್ಮಾಣ (12ನೇ ಶತಮಾನ).\n3. ವಿಜಯನಗರ ಕಾಲದ ಕೆರೆ ನಿರ್ಮಾಣದ ದಶಬಂಧ ಶಾಸನಗಳು.',
      '1. குஜராத் பாடனில் உள்ள சஹஸ்ரலிங்க தலாவ் (11-12 ஆம் நூற்றாண்டு, ஜஸ்மா ஓடன் வரலாறு).\n2. சோலாப்பூர் சித்தராமேஸ்வரர் ஏரி (12-ஆம் நூற்றாண்டு).\n3. விஜயநகர கால ஏரி வெட்டும் தசபந்த கல்வெட்டுகள்.',
      '१. पाटण (गुजरात) येथील सहस्रलिंग तलाव (११-१२ वे शतक, जस्मा ओडण आख्यान).\n२. सोलापूरचा सिद्धरामेश्वर तलाव (१२ वे शतक).\n३. विजयनगर काळातील तलाव खोदकामाचे दशबंध शिलालेख.',
      '୧. ଗୁଜରାଟର ପାଟଣ ସ୍ଥିତ ସହସ୍ରଲିଙ୍ଗ ତଲାବ (୧୧-୧୨ ଶତାବ୍ଦୀ, ଜସ୍ମା ଓଡ଼ନ୍ ଗାଥା)।\n୨. ସୋଲାପୁରର ସିଦ୍ଧରାମେଶ୍ୱର ହ୍ରଦ (୧୨ଶ ଶତାବ୍ଦୀ)।\n୩. ବିଜୟନଗର କାଳୀନ ଜଳାଶୟ ଖନନ ଶିଳାଲେଖ।',
      '১. গুজরাতের পাটনে সহস্রলিঙ্গ তালাও (১১-১২ শতক, জসমা ওডন আখ্যান)।\n২. সোলাপুরের সিদ্ধরামেশ্বর হ্রদ (১২ শতক)।\n৩. বিজয়নগর আমলের জলাশয় খনন সংক্রান্ত শিলালিপি।'
    ),
    contributionsToSociety: m8(
      'Created the physical water-harvesting and road/fort infrastructure that enabled urban civilization across arid and rocky plateaus of India, and supplied domestic grinding stones (floor mills) essential for daily food preparation.',
      'भारत के शुष्क और पथरीले पठारों में नगरीय सभ्यता को संभव बनाने वाला जल-संरक्षण, सड़क व दुर्ग ढाँचा निर्मित किया, तथा दैनिक भोजन निर्माण के लिए आवश्यक घरेलू आटा चक्कियाँ उपलब्ध कराईं।',
      'భారతదేశంలోని మెట్ట మరియు రాతి పీఠభూములలో పట్టణ నాగరికతకు ఆధారమైన జల సంరక్షణ, రహదారులు మరియు కోటల మౌలిక సదుపాయాలను నిర్మించారు; ప్రతి ఇంటికీ అవసరమైన రాతి తిరగళ్లను అందించారు.',
      'ಭಾರತದ ಬಯಲು ಮತ್ತು ಪ್ರಸ್ಥಭೂಮಿಗಳಲ್ಲಿ ನಗರ ನಾಗರಿಕತೆಗೆ ಆಧಾರವಾದ ಜಲಸಂಗ್ರಹ, ರಸ್ತೆ ಮತ್ತು ಕೋಟೆಗಳನ್ನು ನಿರ್ಮಿಸಿದರು ಹಾಗೂ ಮನೆಮನೆಗೆ ಬೀಸುವ ಕಲ್ಲುಗಳನ್ನು ಒದಗಿಸಿದರು.',
      'வறண்ட மற்றும் பாறைப் பகுதிகளில் நீர்நிலைகள், சாலைகள் மற்றும் கோட்டைகளை உருவாக்கி, அன்றாட வாழ்விற்குத் தேவையான மாவு அரைக்கும் கற்களையும் வழங்கினர்.',
      'भारतातील दुष्काळी व खडकाळ पठारांवर जलसंधारण, रस्ते व किल्ले उभारून नागरी संस्कृतीला आधार दिला आणि घरोघरी लागणारी दगडी जाती उपलब्ध करून दिली.',
      'ଭାରତର ପଥୁରିଆ ମାଳଭୂମିରେ ଜଳ-ସଂରକ୍ଷଣ, ସଡ଼କ ଓ ଦୁର୍ଗ ନିର୍ମାଣ କରିବା ସହ ଦୈନନ୍ଦିନ ଜୀବନ ପାଇଁ ପଥର ଚକି ଯୋଗାଇ ଦେଲେ।',
      'ভারতের শুষ্ক ও পাথুরে মালভূমিতে জলসংরক্ষণ, সড়ক ও দুর্গ পরিকাঠামো গড়ে তোলার পাশাপাশি দৈনন্দিন জীবনের অপরিহার্য পাথরের যাঁতা সরবরাহ করেছেন।'
    ),
    communitySpecificConnectionsAndDistinctions: m8(
      'Traditional sub-groups historically reflected technical specialization: stone-quarry and masonry specialists (Kallu-Vaddar / Pathar-Od / Girani-Oddar), earthwork and canal excavators (Mannu-Vaddar / Bail-Od), and stone-cart wheelwrights and transporters (Bandi-Vaddar). These functional distinctions evolved over centuries and should not be conflated into a single uniform caste status across all states.',
      'पारंपरिक उप-समूह तकनीकी विशेषज्ञता को दर्शाते थे: पाषाण-खदान व चिनाई विशेषज्ञ (कल्लु-वड्डार / पत्थर-ओड), मिट्टी व नहर खनक (मन्नु-वड्डार / बैल-ओड), और पाषाण-गाड़ी चक्र निर्माता व वाहक (बंदी-वड्डार)।',
      'సాంప్రదాయ ఉప-విభాగాలు సాంకేతిక నైపుణ్యాన్ని ప్రతిబింబించాయి: రాతి గనులు మరియు కట్టడాల నిపుణులు (కల్లు-వడ్డెర), మట్టి మరియు కాలువల తవ్వకం నిపుణులు (మన్ను-వడ్డెర), మరియు రాతి బండ్ల చక్రాల తయారీదారులు (బండి-వడ్డెర).',
      'ಸಾಂಪ್ರದಾಯಿಕ ಉಪ-ಗುಂಪುಗಳು ತಾಂತ್ರಿಕ ಪರಿಣತಿಯನ್ನು ತೋರಿಸುತ್ತವೆ: ಕಲ್ಲು-ವಡ್ಡರ್ (ಶಿಲಾ ನಿರ್ಮಾಣ), ಮಣ್ಣು-ವಡ್ಡರ್ (ಕಾಲುವೆ-ಕೆರೆ ನಿರ್ಮಾಣ) ಮತ್ತು ಬಂಡಿ-ವಡ್ಡರ್ (ಚಕ್ರ ಮತ್ತು ಸಾಗಾಟ).',
      'பாரம்பரிய உட்பிரிவுகள் தொழில்நுட்பச் சிறப்பைக் காட்டுகின்றன: கல்லு-வட்டர் (கல் கட்டுமானம்), மண்ணு-வட்டர் (மண் மற்றும் கால்வாய் பணி), பண்டி-ஒட்டர் (சக்கரம் மற்றும் போக்குவரத்து).',
      'पारंपरिक पोटभेद तांत्रिक कौशल्य दर्शवतात: दगड-वडार (पाषाण काम), माती-वडार (तलाव व कालवे खोदकाम) आणि गाडी-वडार (चाके व दगड वाहतूक).',
      'ପାରମ୍ପରିକ ଉପ-ବିଭାଗ ଯାନ୍ତ୍ରିକ ଦକ୍ଷତା ଦର୍ଶାଏ: ପଥର-ଶିଳ୍ପୀ, ମାଟି ଓ କେନାଲ୍ ଖନକ ଏବଂ ଶଗଡ଼-ଚକ ନିର୍ମାତା।',
      'ঐতিহ্যবাহী উপ-বিভাগগুলো কারিগরি দক্ষতা নির্দেশ করে: পাথর-শিল্পী, মাটি ও খাল খননকারী এবং গাড়ির চাকা নির্মাতা।'
    ),
    epistemicAndMethodologicalNote: m8(
      'Methodological Note: "Inventor of the floor mill", "Inventor of the Running Wheel", and "Builders of Universe" are preserved as cultural-heritage titles celebrating the communities’ historic mastery of rotary querns, stone cart wheels, and infrastructure creation.',
      'कार्यप्रणाली टिप्पणी: "आटा चक्की के आविष्कारक", "गतिशील चक्र के आविष्कारक" और "विश्व-निर्माता" सामुदायिक सांस्कृतिक उपाधियों के रूप में संरक्षित हैं जो उनके ऐतिहासिक तकनीकी कौशल का सम्मान करती हैं।',
      'పరిశోధనా గమనిక: "తిరగలి ఆవిష్కర్త", "తిరిగే చక్రం ఆవిష్కర్త" మరియు "విశ్వ నిర్మాతలు" అనేవి ఈ సమాజాల సాంకేతిక వారసత్వాన్ని గౌరవించే సాంస్కృతిక బిరుదులు.',
      'ಸಂಶೋಧನಾ ಸೂಚನೆ: "ಬೀಸುವ ಕಲ್ಲಿನ ಆವಿಷ್ಕಾರಕರು", "ಚಲಿಸುವ ಚಕ್ರದ ಆವಿಷ್ಕಾರಕರು" ಮತ್ತು "ವಿಶ್ವ ನಿರ್ಮಾತೃಗಳು" ಎಂಬುದು ಸಮುದಾಯದ ತಾಂತ್ರಿಕ ಪರಂಪರೆಯನ್ನು ಗೌರವಿಸುವ ಸಾಂಸ್ಕೃತಿಕ ಬಿರುದುಗಳಾಗಿವೆ.',
      'ஆய்வுக் குறிப்பு: "மாவு அரைக்கும் இயந்திரக் கண்டுபிடிப்பாளர்", "சுழலும் சக்கரக் கண்டுபிடிப்பாளர்" மற்றும் "உலகக் கட்டுமானர்கள்" என்பவை இச்சமூகங்களின் தொழில்நுட்ப மரபைப் போற்றும் கலாச்சாரப் பட்டங்களாகும்.',
      'संशोधन टीप: "जात्याचे शोधकर्ते", "फिरत्या चाकाचे शोधकर्ते" आणि "विश्व-निर्माते" या समाजाच्या ऐतिहासिक कौशल्याचा गौरव करणाऱ्या सांस्कृतिक पदव्या आहेत.',
      'ଗବେଷଣା ଟିପ୍ପଣୀ: "ପେଷଣ ଚକି ଉଦ୍ଭାବକ", "ଘୂର୍ଣ୍ଣନ ଚକ୍ର ଉଦ୍ଭାବକ" ଓ "ବିଶ୍ୱ ନିର୍ମାତା" ହେଉଛି ସମୁଦାୟର ଯାନ୍ତ୍ରିକ କୌଶଳକୁ ସମ୍ମାନ ଜଣାଉଥିବା ସାଂସ୍କୃତିକ ଉପାଧି।',
      'পদ্ধতিগত নোট: "যাঁতার উদ্ভাবক", "ঘূর্ণায়মান চাকার উদ্ভাবক" ও "বিশ্ব-নির্মাতা" হলো সম্প্রদায়ের কারিগরি ঐতিহ্যকে সম্মান জানানো সাংস্কৃতিক উপাধি।'
    ),
    visualAssets: [
      {
        id: 'vis_prof_3_stepwell',
        imageUrl: ARCHIVE_IMG('oad_hydraulic_stepwell.jpg'),
        visualType: 'Architectural Monument',
        historicalPeriod: 'Medieval Western & Deccan Hydraulic Architecture (11th–16th Century CE)',
        title: m8(
          'Subterranean Stone Stepwell (Vav / Baoli) & Hydraulic Masonry',
          'भूमिगत पाषाण बावड़ी (वाव) एवं जल-स्थापत्य कला',
          'భూగర్భ రాతి దిగుడు బావి (వావ్ / బావోలి) & జల నిర్మాణ శిల్పం',
          'ಭೂಗತ ಕಲ್ಲಿನ ಮೆಟ್ಟಿಲು ಬಾವಿ (ವಾವ್ / ಬಾವಡಿ) ಮತ್ತು ಜಲ ವಾಸ್ತುಶಿಲ್ಪ',
          'நிலத்தடி கற்படிக்கிணறு (வாவ் / பாவோலி) மற்றும் நீரியல் கட்டுமானம்',
          'भूमिगत दगडी बारव (वाव / बावडी) आणि जल-स्थापत्य',
          'ଭୂগର୍ଭ ପଥର ପାହାଚ କୂଅ (ବାওଲି) ଓ ଜଳ-ସ୍ଥାପତ୍ୟ',
          'ভূগর্ভস্থ পাথরের বাওলি (ধাপযুক্ত কূপ) ও জল-স্থাপত্য'
        ),
        caption: m8(
          'Multi-tiered dressed-stone stepwell illustrating precision excavation, retaining-wall engineering, and aquifer harvesting.',
          'सटीक खनन, प्रतिधारक दीवार अभियांत्रिकी और भू-जल संचयन को दर्शाती बहु-स्तरीय पाषाण बावड़ी।',
          'ఖచ్చితమైన తవ్వకం, రాతి గోడల ఇంజనీరింగ్ మరియు భూగర్భ జల సంరక్షణను చాటే బహుళ అంతస్తుల దిగుడు బావి.',
          'ನಿಖರವಾದ ಅಗೆಯುವಿಕೆ, ತಡೆಗೋಡೆ ಎಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಅಂತರ್ಜಲ ಸಂಗ್ರಹವನ್ನು ತೋರಿಸುವ ಮೆಟ್ಟಿಲು ಬಾವಿ.',
          'துல்லியமான அகழ்வு, தடுப்புச் சுவர் பொறியியல் மற்றும் நிலத்தடி நீர் சேகரிப்பைக் காட்டும் படிக்கிணறு.',
          'अचूक खोदकाम, संरक्षक भिंत अभियांत्रिकी आणि भूजल संवर्धन दर्शवणारी बहुमजली दगडी बारव.',
          'ସଠିକ୍ ଖନନ ଓ ଭୂତଳ ଜଳ ସଂରକ୍ଷଣ ଦର୍ଶାଉଥିବା ବହୁ-ସ୍ତରୀୟ ପାହାଚ କୂଅ।',
          'নিখুঁত খনন ও ভূগর্ভস্থ জল সংরক্ষণ প্রদর্শনকারী বহুস্তরীয় পাথরের বাওলি।'
        ),
        altText: m8(
          'Ancient stone stepwell with symmetrical flights of steps descending to water level',
          'जल स्तर तक उतरती सममित सीढ़ियों वाली प्राचीन पाषाण बावड़ी',
          'నీటి మట్టం వరకు దిగే రాతి మెట్లతో ఉన్న ప్రాచీన దిగుడు బావి',
          'ನೀರಿನ ಮಟ್ಟದವರೆಗೆ ಇಳಿಯುವ ಕಲ್ಲಿನ ಮೆಟ್ಟಿಲುಗಳ ಪ್ರಾಚೀನ ಬಾವಿ',
          'நீர் மட்டம் வரை செல்லும் படிக்கட்டுகளைக் கொண்ட பழமையான கற்கிணறு',
          'पाण्याच्या पातळीपर्यंत जाणाऱ्या सममित पायऱ्यांची प्राचीन दगडी बारव',
          'ଜଳ ସ୍ତର ପର୍ଯ୍ୟନ୍ତ ଲମ୍ବିଥିବା ପ୍ରାଚୀନ ପଥର ପାହାଚ କୂଅ',
          'জলস্তর পর্যন্ত নেমে যাওয়া প্রাচীন পাথরের ধাপযুক্ত কূপ'
        ),
        sourceAttribution: 'Suryavamsha Digital Archive / Western & Deccan Hydraulic Monument Series',
        licenseInfo: 'Archival Educational & Documentary Use'
      },
      {
        id: 'vis_prof_3_wheel',
        imageUrl: ARCHIVE_IMG('konark_chariot_wheel.jpg'),
        visualType: 'Archaeological Photograph',
        historicalPeriod: '13th Century CE Eastern Ganga / Kalinga Stone Engineering',
        title: m8(
          'Monolithic Carved Stone Chariot Wheel (Symbol of the Running Wheel & Stone Engineering)',
          'एकाश्म उत्कीर्ण पाषाण रथ-चक्र (गतिशील चक्र एवं पाषाण अभियांत्रिकी का प्रतीक)',
          'ఏకశిలా రథ చక్రం (తిరిగే చక్రం మరియు రాతి ఇంజనీరింగ్ ప్రతీక)',
          'ಏಕಶಿಲಾ ರಥ ಚಕ್ರ (ಚಲಿಸುವ ಚಕ್ರ ಮತ್ತು ಕಲ್ಲಿನ ಎಂಜಿನಿಯರಿಂಗ್ ಸಂಕೇತ)',
          'ஒற்றைக்கல் தேர்ச் சக்கரம் (சுழலும் சக்கரம் மற்றும் கல் பொறியியலின் சின்னம்)',
          'एकाश्म कोरलेले दगडी रथचक्र (फिरते चाक आणि पाषाण अभियांत्रिकीचे प्रतीक)',
          'ଏକାଶ୍ମ ପଥର ରଥ-ଚକ୍ର (ଘୂର୍ଣ୍ଣନ ଚକ୍ର ଓ ପଥର ଶିଳ୍ପର ପ୍ରତୀକ)',
          'একশিলার খোদাই করা রথচক্র (ঘূর্ণায়মান চাকা ও প্রস্তর প্রকৌশলের প্রতীক)'
        ),
        caption: m8(
          'Masterpiece of Kalinga-Odra stone wheel geometry, axle-hub balance, and rotational engineering.',
          'कलिंग-ओड्र पाषाण चक्र ज्यामिति, धुरी संतुलन और घूर्णन अभियांत्रिकी की उत्कृष्ट कृति।',
          'కళింగ-ఓడ్ర రాతి చక్ర జ్యామితి, ఇరుసు సమతుల్యత మరియు నిర్మాణ నైపుణ్యానికి నిదర్శనం.',
          'ಕಳಿಂಗ-ಓಡ್ರ ಕಲ್ಲಿನ ಚಕ್ರದ ಜ್ಯಾಮಿತಿ ಮತ್ತು ಶಿಲ್ಪಕಲೆಯ ಶ್ರೇಷ್ಠ ಮಾದರಿ.',
          'கலிங்க-ஒட்ர கல் சக்கர வடிவியல் மற்றும் பொறியியல் சிறப்பிற்குச் சான்று.',
          'कलिंग-ओड्र पाषाण चाकाची भूमिती आणि अभियांत्रिकी कौशल्याचा उत्कृष्ट नमुना.',
          'କଳିଙ୍ଗ-ଓଡ଼୍ର ପଥର ଚକ୍ର ଜ୍ୟାମିତି ଓ ଯାନ୍ତ୍ରିକ କୌଶଳର ଉତ୍କୃଷ୍ଟ ନିଦର୍ଶନ।',
          'কলিঙ্গ-ওড্র প্রস্তর চাকার জ্যামিতি ও প্রকৌশল দক্ষতার অনন্য নিদর্শন।'
        ),
        altText: m8(
          'Intricately carved stone chariot wheel at Konark Sun Temple',
          'कोणार्क सूर्य मंदिर का सूक्ष्म नक्काशीदार पाषाण रथ चक्र',
          'కోణార్క్ సూర్య దేవాలయపు రాతి రథ చక్రం',
          'ಕೋನಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯದ ಕೆತ್ತನೆಯ ಕಲ್ಲಿನ ರಥ ಚಕ್ರ',
          'கொனார்க் சூரியக் கோயிலின் நுட்பமான கல் தேர்ச் சக்கரம்',
          'कोणार्क सूर्यमंदिरातील कोरीव दगडी रथचक्र',
          'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିରର କାରୁକାର୍ଯ୍ୟପୂର୍ଣ୍ଣ ପଥର ରଥଚକ୍ର',
          'কোণার্ক সূর্য মন্দিরের সূক্ষ্ম কারুকার্যময় পাথরের রথচক্র'
        ),
        sourceAttribution: 'Archaeological Survey of India (ASI) Monument Documentation / Konark Archive',
        licenseInfo: 'Public Domain / Heritage Monument Documentation'
      }
    ],
    relatedArticles: [
      {
        id: 'rel_ce_1',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_01_od',
        label: m8('Od Community Article', 'ओड समुदाय लेख', 'ఓడ్ సమాజ వ్యాసం', 'ಓಡ್ ಸಮುದಾಯ ಲೇಖನ', 'ஓட் சமூகக் கட்டுரை', 'ओड समाज लेख', 'ଓଡ଼ ସମୁଦାୟ ଲେଖା', 'ওড সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_ce_2',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_10_vaddera',
        label: m8('Vaddera Community Article', 'वड्डेरा समुदाय लेख', 'వడ్డెర సమాజ వ్యాసం', 'ವಡ್ಡೇರ ಸಮುದಾಯ ಲೇಖನ', 'வட்டேரா சமூகக் கட்டுரை', 'वड्डेरा समाज लेख', 'ଭଡ୍ଡେରା ସମୁଦାୟ ଲେଖା', 'ভড্ডেরা সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_ce_3',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_15_voddar',
        label: m8('Voddar / Waddar Community Article', 'वोड्डार / वडार समुदाय लेख', 'వొడ్డార్ / వడ్డార్ సమాజ వ్యాసం', 'ವೊಡ್ಡರ್ / ವಡ್ಡರ್ ಸಮುದಾಯ ಲೇಖನ', 'வொட்டர் / வட்டார் சமூகக் கட்டுரை', 'वोड्डार / वडार समाज लेख', 'ଭୋଡ୍ଡାର / ୱଡ୍ଡାର ସମୁଦାୟ ଲେଖା', 'ভোড্ডার / বড্ডার সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      }
    ],
    relatedKeywords: [
      'Construction',
      'Engineering',
      'Inventor of the Floor Mill',
      'Inventor of the Running Wheel',
      'Bulders of Universe',
      'LokaShilpi',
      'Vaddera',
      'Voddar',
      'Od'
    ],
    references: [
      {
        citation: 'Thurston, E., & Rangachari, K. (1909). Castes and Tribes of Southern India (Vol. V, "Odde"). Government Press, Madras.',
        type: 'Colonial Gazetteer / Census'
      },
      {
        citation: 'Enthoven, R. E. (1922). The Tribes and Castes of Bombay (Vol. III, "Od / Vaddar"). Government Central Press, Bombay.',
        type: 'Colonial Gazetteer / Census'
      }
    ]
  }
];

// ============================================================================
// PROFESSIONAL HERITAGE CATEGORIES 4 TO 9
// ============================================================================
export const PROFESSIONAL_HERITAGE_CATEGORIES_4_TO_9: ProfessionalHeritageCategoryArticle[] = [
  {
    id: 'prof_cat_4_shilpi',
    slug: 'shilpi-sculpture-and-craft-heritage',
    categoryNumber: 4,
    codeLabel: 'Category 4',
    title: m8(
      'Category 4: Shilpi — Sculpture and Craft Heritage',
      'श्रेणी 4: शिल्पी — मूर्तिकला एवं शिल्प विरासत',
      'వర్గం 4: శిల్పి — శిల్పకళ మరియు హస్తకళా వారసత్వం',
      'ವರ್ಗ 4: ಶಿಲ್ಪಿ — ಶಿಲ್ಪಕಲೆ ಮತ್ತು ಕರಕುಶಲ ಪರಂಪರೆ',
      'வகை 4: சில்பி (சிற்பி) — சிற்பம் மற்றும் கைவினைப் பாரம்பரியம்',
      'वर्ग ४: शिल्पी — मूर्तिकला आणि हस्तकला वारसा',
      'ବର୍ଗ ୪: ଶିଳ୍ପୀ — ମୂର୍ତ୍ତିକଳା ଓ ଶିଳ୍ପ ଐତିହ୍ୟ',
      'বিভাগ ৪: শিল্পী (ভাস্কর) — ভাস্কর্য ও কারুশিল্প ঐতিহ্য'
    ),
    shortSummary: m8(
      'Traditional sculptors (Shilpi), stone carvers, temple relief artisans, lithic utility carvers (including the Inventor of the Floor mill tradition), and specialized stone-working tools and techniques.',
      'पारंपरिक मूर्तिकार (शिल्पी), पाषाण तक्षक, मंदिर उत्कीर्णन कलाकार, घरेलू पाषाण उपकरण निर्माता (आटा चक्की के आविष्कारक परंपरा सहित) और विशिष्ट शिल्प उपकरण।',
      'సాంప్రదాయ శిల్పులు (శిల్పి), రాతి చెక్కడం నిపుణులు, ఆలయ శిల్ప కళాకారులు, గృహోపకరణ రాతి శిల్పులు (తిరగలి ఆవిష్కర్త సంప్రదాయంతో సహా) మరియు పనిముట్లు.',
      'ಸಾಂಪ್ರದಾಯಿಕ ಶಿಲ್ಪಿಗಳು, ಕಲ್ಲು ಕೆತ್ತನೆಗಾರರು, ದೇವಾಲಯ ಶಿಲ್ಪ ಕಲಾವಿದರು, ಬೀಸುವ ಕಲ್ಲಿನ ಆವಿಷ್ಕಾರಕ ಪರಂಪರೆ ಮತ್ತು ವಿಶೇಷ ಶಿಲ್ಪ ಉಪಕರಣಗಳು.',
      'பாரம்பரியச் சிற்பிகள் (சில்பி), கல் செதுக்குபவர்கள், கோயில் சிற்பக் கலைஞர்கள், மாவு அரைக்கும் கல் இயந்திரக் கண்டுபிடிப்பாளர் மரபு மற்றும் சிற்பக் கருவிகள்.',
      'पारंपरिक शिल्पकार (शिल्पी), पाषाण कारागीर, मंदिर मूर्तिकार, दगडी जाते शोधकर्ते परंपरा आणि विशिष्ट शिल्प साधने.',
      'ପାରମ୍ପରିକ ମୂର୍ତ୍ତିକାର (ଶିଳ୍ପୀ), ପଥର খোদাই କାରିଗର, ମନ୍ଦିର ଶିଳ୍ପୀ, ପେଷଣ ଚକି ଉଦ୍ଭାବକ ପରମ୍ପରା ଓ ଶିଳ୍ପ ଉପକରଣ।',
      'ঐতিহ্যবাহী ভাস্কর (শিল্পী), প্রস্তর খোদাইকারী, মন্দির ভাস্কর্য শিল্পী, যাঁতার উদ্ভাবক ঐতিহ্য এবং বিশেষায়িত কারুশিল্প সরঞ্জাম।'
    ),
    includedSubClassifications: [
      {
        id: 'sub_4_1',
        name: m8('Shilpi', 'शिल्पी', 'శిల్పి', 'ಶಿಲ್ಪಿ', 'சில்பி (சிற்பி)', 'शिल्पी', 'ଶିଳ୍ପୀ', 'শিল্পী (ভাস্কর)'),
        description: m8('Practitioners of lithic and plastic arts in sacred and civic spaces.', 'धार्मिक और नागरिक स्थलों में पाषाण व रूपंकर कला के साधक।', 'పవిత్ర మరియు పౌర కట్టడాలలో రాతి శిల్పకళా నిపుణులు.', 'ಪವಿತ್ರ ಮತ್ತು ನಾಗರಿಕ ತಾಣಗಳಲ್ಲಿ ಕಲ್ಲಿನ ಶಿಲ್ಪಕಲಾ ಪರಿಣತರು.', 'புனித மற்றும் பொது இடங்களில் கற்சிற்பக் கலைஞர்கள்.', 'धार्मिक व सार्वजनिक वास्तूंमधील पाषाण शिल्पकार.', 'ମନ୍ଦିର ଓ ସାଧାରଣ ସ୍ଥାନରେ ପଥର ଶିଳ୍ପ କାରିଗର।', 'পবিত্র ও নাগরিক স্থাপত্যে প্রস্তর ভাস্কর্য শিল্পী।')
      },
      {
        id: 'sub_4_2',
        name: m8('Traditional Sculptors', 'पारंपरिक मूर्तिकार', 'సాంప్రదాయ శిల్పులు', 'ಸಾಂಪ್ರದಾಯಿಕ ಶಿಲ್ಪಿಗಳು', 'பாரம்பரியச் சிற்பிகள்', 'पारंपरिक मूर्तिकार', 'ପାରମ୍ପରିକ ମୂର୍ତ୍ତିକାର', 'ঐতিহ্যবাহী ভাস্কর'),
        description: m8('Carvers of hero-stones (Viragals), Nandi bulls, Dvarapalas, and deity icons.', 'वीरगल, नंदी, द्वारपाल और देव-प्रतिमाओं के निर्माता।', 'వీరగల్లులు, నంది విగ్రహాలు, ద్వారపాలకులు మరియు దేవతా మూర్తుల శిల్పులు.', 'ವೀರಗಲ್ಲು, ನಂದಿ, ದ್ವಾರಪಾಲಕರು ಮತ್ತು ದೇವతా ಮೂರ್ತಿಗಳ ಕೆತ್ತನೆಗಾರರು.', 'வீரக்கல், நந்தி, துவாரபாலகர் மற்றும் தெய்வத் திருமேனிகளைச் செதுக்குபவர்கள்.', 'वीरगळ, नंदी, द्वारपाल आणि देवमूर्ती घडवणारे मूर्तिकार.', 'ବୀରଗଲ୍, ନନ୍ଦୀ, ଦ୍ୱାରପାଳ ଓ ଦେବ-പ്രତିମା ନିର୍ମାତା।', 'বীরগল, নন্দী, দ্বারপাল ও দেবমূর্তি নির্মাতা।')
      },
      {
        id: 'sub_4_3',
        name: m8('Stone Carvers', 'पाषाण तक्षक (पत्थर नक्काशीकार)', 'రాతి చెక్కడం నిపుణులు', 'ಕಲ್ಲು ಕೆತ್ತನೆಗಾರರು', 'கல் செதுக்கும் கலைஞர்கள்', 'दगड कोरणारे कारागीर', 'ପଥର ଖୋଦେଇ କାରିଗର', 'প্রস্তর খোদাইকারী'),
        description: m8('Specialists in dressing granite, sandstone, khondalite, and chlorite blocks.', 'ग्रेनाइट, बलुआ पत्थर, खोंडालाइट और क्लोराइट पत्थरों को तराशने वाले विशेषज्ञ।', 'గ్రానైట్, ఇసుకరాయి మరియు ఖోండలైట్ శిలలను చెక్కే నిపుణులు.', 'ಗ್ರಾನೈಟ್, ಮರಳುಗಲ್ಲು ಮತ್ತು ಖೊಂಡಲೈಟ್ ಕಲ್ಲುಗಳನ್ನು ಕೆತ್ತುವ ಪರಿಣತರು.', 'கருங்கல் மற்றும் மணற்கல் பாறைகளைச் செதுக்கும் வல்லுநர்கள்.', 'ग्रॅनाइट आणि वालुकाश्म दगड घडवणारे तज्ज्ञ.', 'ଗ୍ରାନାଇଟ୍, ବାଲିପଥର ଓ ଖୋଣ୍ଡାଲାଇଟ୍ ପଥର କାରିଗର।', 'গ্রানাইট, বেলেপাথর ও খন্ডালাইট পাথর খোদাইকারী।')
      },
      {
        id: 'sub_4_4',
        name: m8('Inventor of the Floor mill', 'आटा चक्की के आविष्कारक (Inventor of the Floor mill)', 'తిరగలి (పిండి మిల్లు) ఆవిష్కర్త', 'ಬೀಸುವ ಕಲ್ಲಿನ ಆವಿಷ್ಕಾರಕರು', 'மாவு அரைக்கும் இயந்திரக் கண்டுபிடிப்பாளர்', 'जात्याचे (चक्की) शोधकर्ते', 'ପେଷଣ ଚକିର ଉଦ୍ଭାବକ', 'যাঁতার (আটা চাক্কি) উদ্ভাবক'),
        description: m8('Carving and grooving rotary stone querns, mortars (ural/rolu), and pestles.', 'घूर्णन आटा चक्की, उखल (रोलु) और सिल-बट्टे तराशने की शिल्प परंपरा।', 'రాతి తిరగలి, రోలు-రోకలి మరియు సన్నికల్లు చెక్కే శిల్ప సంప్రదాయం.', 'ಬೀಸುವ ಕಲ್ಲು, ಒരಳು ಕಲ್ಲು ಮತ್ತು ಕುಟ್ಟುವ ಕಲ್ಲು ಕೆತ್ತುವ ಪರಂಪರೆ.', 'திரிகை, உரல் மற்றும் அம்மிக்கல் செதுக்கும் மரபு.', 'दगडी जाते, उखळ आणि पाटा-वरवंटा घडवण्याची परंपरा.', 'ପଥର ଚକି, ଉଖୁଡ଼ା ଓ ଶିଳ-ପୁଆ ନିର୍ମାଣ ପରମ୍ପରା।', 'পাথরের যাঁতা, হামানদিস্তা ও শিল-নোড়া তৈরির ঐতিহ্য।')
      },
      {
        id: 'sub_4_5',
        name: m8('Traditional Artisans & Craft Specialists', 'पारंपरिक कारीगर एवं शिल्प विशेषज्ञ', 'సాంప్రదాయ కళాకారులు & హస్తకళా నిపుణులు', 'ಸಾಂಪ್ರದಾಯಿಕ ಕುಶಲಕರ್ಮಿಗಳು ಮತ್ತು ಕಲಾ ತಜ್ಞರು', 'பாரம்பரியக் கைவினைஞர்கள் மற்றும் கலை வல்லுநர்கள்', 'पारंपरिक कारागीर आणि कला तज्ज्ञ', 'ପାରମ୍ପରିକ କାରିଗର ଓ ଶିଳ୍ପ ବିଶେଷଜ୍ଞ', 'ঐতিহ্যবাহী কারিগর ও শিল্প বিশেষজ্ঞ'),
        description: m8('Carvers of temple pillars, stepwell niches, inscriptions, and ornamental friezes.', 'मंदिर स्तंभों, बावड़ी के झरोखों, शिलालेखों और अलंकृत पट्टियों के कारीगर।', 'ఆలయ స్తంభాలు, దిగుడు బావుల గూళ్లు, శాసన శిలలు మరియు తోరణాల శిల్పులు.', 'ದೇವಾಲಯದ ಕಂಬಗಳು, ಬಾವಿಯ ಕಮಾನುಗಳು ಮತ್ತು ಶಾಸನ ಕಲ್ಲುಗಳ ಕೆತ್ತನೆಗಾರರು.', 'கோயில் தூண்கள், படிக்கிணறு மாடங்கள் மற்றும் கல்வெட்டுச் சிற்பிகள்.', 'मंदिराचे खांब, बारवांमधील देवळ्या आणि शिलालेख कोरणारे कारागीर.', 'ମନ୍ଦିର ସ୍ତମ୍ଭ, ପାହାଚ କୂଅର କାରୁକାର୍ଯ୍ୟ ଓ ଶିଳାଲେଖ ଖୋଦେଇକାରୀ।', 'মন্দির স্তম্ভ, বাওলির কুলুঙ্গি ও শিলালিপি খোদাইকারী।')
      },
      {
        id: 'sub_4_6',
        name: m8('Temple Sculpture & Traditional Tools', 'मंदिर मूर्तिकला एवं पारंपरिक उपकरण', 'ఆలయ శిల్పకళ & సాంప్రదాయ పనిముట్లు', 'ದೇವಾಲಯ ಶಿಲ್ಪಕಲೆ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಉಪಕರಣಗಳು', 'கோயில் சிற்பக்கலை மற்றும் பாரம்பரியக் கருவிகள்', 'मंदिर शिल्पकला आणि पारंपरिक अवजारे', 'ମନ୍ଦିର ମୂର୍ତ୍ତିକଳା ଓ ପାରମ୍ପରିକ ଉପକରଣ', 'মন্দির ভাস্কর্য ও ঐতিহ্যবাহী সরঞ্জাম'),
        description: m8('Point chisels (mona-uli), flat chisels (patta-uli), bush hammers, and callipers.', 'नुकीली छेनी (मोना-उली), चपटी छेनी (पट्टा-उली), हथौड़ी और मापन प्रकार।', 'మొన ఉలి, పట్టా ఉలి, సుత్తి మరియు కొలత పరికరాలు.', 'ಚೂಪಾದ ಉಳಿ, ಚಪ್ಪಟೆ ಉಳಿ, ಸುತ್ತಿಗೆ ಮತ್ತು ಅಳತೆ ಸಾಧನಗಳು.', 'கூர் உளி, தட்டை உளி, சுத்தி மற்றும் அளவுகோல்கள்.', 'टोकदार छिन्नी, सपाट छिन्नी, हातोडा आणि मोजमाप साधने.', 'ମୁന ନିହଣ, ଚपटा ନିହଣ, ହାତୁଡ଼ି ଓ ମାପ ଯନ୍ତ୍ର।', 'সূঁচালো ছেনি, চ্যাপ্টা ছেনি, হাতুড়ি ও পরিমাপক যন্ত্র।')
      }
    ],
    definitionAndExplanation: m8(
      'The Shilpi classification covers stone carvers, architectural sculptors, and lithic utility artisans who transformed raw quarry rock into temple pillars, stepwell reliefs, commemorative hero-stones (Viragals), and indispensable domestic stone implements.',
      'शिल्पी श्रेणी में वे पाषाण तक्षक, वास्तु मूर्तिकार और पत्थर के कारीगर शामिल हैं जिन्होंने खदान के कच्चे पत्थर को मंदिर के स्तंभों, बावड़ियों की नक्काशी, वीरगल स्मारकों और घरेलू पाषाण उपकरणों में ढाला।',
      'శిల్పి వర్గీకరణలో గనుల నుండి తీసిన ముడి రాయిని ఆలయ స్తంభాలు, దిగుడు బావుల శిల్పాలు, వీరగల్లు స్మారకాలు మరియు గృహోపకరణ రాతి వస్తువులుగా మలిచిన రాతి శిల్పులు ఉన్నారు.',
      'ಶಿಲ್ಪಿ ವರ್ಗವು ಕಚ್ಚಾ ಬಂಡೆಗಳನ್ನು ದೇವಾಲಯದ ಕಂಬಗಳು, ಮೆಟ್ಟಿಲು ಬಾವಿಯ ಶಿಲ್ಪಗಳು, ವೀರಗಲ್ಲುಗಳು ಮತ್ತು ಗೃಹೋಪಯೋಗಿ ಕಲ್ಲಿನ ಸಾಧನಗಳಾಗಿ ರೂಪಿಸಿದ ಶಿಲ್ಪಿಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.',
      'சில்பி வகைப்பாடு பாறைகளைக் கோயில் தூண்கள், படிக்கிணறு சிற்பங்கள், வீரக்கற்கள் மற்றும் வீட்டு உபயோகக் கருவிகளாக மாற்றிய சிற்பிகளை உள்ளடக்கியது.',
      'शिल्पी वर्गात कच्च्या खडकांचे रूपांतर मंदिराचे खांब, बारवांवरील नक्षीकाम, वीरगळ आणि घरगुती दगडी साधनांमध्ये करणाऱ्या पाषाण कारागिरांचा समावेश होतो.',
      'ଶିଳ୍ପୀ ବର୍ଗରେ କଞ୍ଚା ପଥରକୁ ମନ୍ଦିର ସ୍ତମ୍ଭ, ପାହାଚ କୂଅର ମୂର୍ତ୍ତି, ବୀରଗଲ୍ ଓ ଘରୋଇ ପଥର ଉପକରଣରେ ପରିଣତ କରୁଥିବା କାରିଗରମାନେ ଅନ୍ତର୍ଭୁକ୍ତ।',
      'শিল্পী বিভাগে কাঁচা পাথরকে মন্দির স্তম্ভ, বাওলির ভাস্কর্য, বীরগল এবং গৃহস্থালি পাথরের সরঞ্জামে রূপান্তরকারী কারিগররা অন্তর্ভুক্ত।'
    ),
    historicalBackground: m8(
      'In both Kalinga temple architecture (Rekha, Pidha, and Khakhara orders) and Deccan Chalukya-Hoysala-Vijayanagara traditions, stone-working began with quarry specialists (Kallu-Vaddar / Pathar-Od) who selected flaw-free stone blocks by acoustic resonance (testing whether a stone was "male/nadavano", "female", or "neuter") before rough-dressing and relief carving.',
      'कलिंग मंदिर स्थापत्य और दक्कन की चालुक्य-होयसल-विजयनगर परंपराओं में पाषाण कार्य खदान विशेषज्ञों से शुरू होता था, जो ध्वनि-अनुनाद (पत्थर की खनक) से दोषरहित शिलाखंडों का चयन कर उन्हें तराशते थे।',
      'కళింగ ఆలయ నిర్మాణంలో మరియు దక్కన్ చాళుక్య-విజయనగర సంప్రదాయాలలో రాతి పని గనుల నిపుణులతో మొదలయ్యేది; వీరు రాయిని కొట్టి వచ్చే ధ్వని ఆధారంగా నాణ్యమైన శిలలను ఎంచుకుని మలిచేవారు.',
      'ಕಳಿಂಗ ಮತ್ತು ದಖನ್ ಶಿಲ್ಪಕಲಾ ಸಂಪ್ರದಾಯಗಳಲ್ಲಿ ಕಲ್ಲಿನ ನಾದವನ್ನು ಪರೀಕ್ಷಿಸಿ ಉತ್ತಮ ಶಿಲೆಗಳನ್ನು ಆರಿಸಿ ಕೆತ್ತನೆ ಮಾಡುವ ಪರಿಣತಿ ಕಲ್ಲು-ವಡ್ಡರ್ ಮತ್ತು ಶಿಲ್ಪಿಗಳಲ್ಲಿ ಇತ್ತು.',
      'கலிங்க மற்றும் தக்காணக் கட்டிடக்கலையில் கல்லின் ஒலியைப் பரிசோதித்துத் தரமான கற்களைத் தேர்ந்தெடுத்துச் செதுக்கும் முறை நடைமுறையில் இருந்தது.',
      'कलिंग आणि दख्खनच्या स्थापत्य परंपरेत दगडाचा नाद तपासून निर्दोष शिळा निवडण्याचे आणि घडवण्याचे काम पाषाण तज्ज्ञ करत असत.',
      'କଳିଙ୍ଗ ଓ ଦାକ୍ଷିଣାତ୍ୟ ପରମ୍ପରାରେ ପଥରର ଧ୍ୱନି ପରୀକ୍ଷା କରି ଉତ୍ତମ ଶିଳା ଚୟନ ଓ ଖୋଦେଇ କରାଯାଉଥିଲା।',
      'কলিঙ্গ ও দাক্ষিণাত্যের স্থাপত্যে পাথরের ধ্বনি পরীক্ষা করে নিখুঁত শিলা নির্বাচন ও খোদাই করার প্রথা প্রচলিত ছিল।'
    ),
    toolsMaterialsAndTechniques: m8(
      'Tempered high-carbon iron chisels (Uli / Tanki), iron mallets, wooden plumb-bobs, red-ochre chalk lines (Sutra), and abrasive sand-polishing stones.',
      'उच्च-कार्बन लौह छेनी (उली / टंकी), लोहे के हथौड़े, साहुल, गेरू सूत्र और रेत-पॉलिशिंग पत्थर।',
      'ఉక్కు ఉలి (టంకం), ఇనుప సుత్తులు, లంబసూత్రం, గెరువు నూలు మరియు నునుపు చేసే రాళ్లు.',
      'ಉಕ್ಕಿನ ಉಳಿಗಳು, ಸುತ್ತಿಗೆಗಳು, ಲಂಬಸೂತ್ರ, ಕೆಮ್ಮಣ್ಣಿನ ದಾರ ಮತ್ತು ನುಣುಪು ಮಾಡುವ ಕಲ್ಲುಗಳು.',
      'உருக்கு உளிகள், சுத்திகள், தூக்குநூல், செம்மண் நூல் மற்றும் மெருகூட்டும் கற்கள்.',
      'पोलादी छिन्नी, हातोडे, ओळंबा, गेरूचा दोरा आणि घासण्याचे दगड.',
      'ଲୌହ ନିହଣ (ଟଙ୍କି), ହାତୁଡ଼ି, ସୂତା ଓ ପଲିସ୍ ପଥର।',
      'উন্নত লোহার ছেনি, হাতুড়ি, ওলনদড়ি, গেরুয়া সুতো ও পালিশ করার পাথর।'
    ),
    culturalAndRegionalSignificance: m8(
      'Sculptural work was regarded as an act of sacred devotion (Shilpa-Yoga), governed by canonical proportions (Tala-mana) for temple icons and practical ergonomics for household grinding mills.',
      'शिल्प कार्य को पवित्र साधना (शिल्प-योग) माना जाता था, जिसमें मंदिर प्रतिमाओं के लिए शास्त्रीय अनुपात (ताल-मान) और घरेलू चक्कियों के लिए व्यावहारिक संतुलन का पालन होता था।',
      'శిల్పకళను పవిత్ర సాధనగా (శిల్ప-యోగం) భావించేవారు; ఆలయ విగ్రహాలకు తాల-మాన ప్రమాణాలు, గృహ తిరగళ్లకు వాడుక సౌలభ్యం పాటించేవారు.',
      'ಶಿಲ್ಪಕಲೆಯನ್ನು ಪವಿತ್ರ ಕಾಯಕವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತಿತ್ತು; ವಿಗ್ರಹಗಳಿಗೆ ಶಾಸ್ತ್ರೀಯ ಅಳತೆ ಮತ್ತು ಬೀಸುವ ಕಲ್ಲುಗಳಿಗೆ ಪ್ರಾಯೋಗಿಕ ವಿನ್ಯಾಸ ಬಳಸಲಾಗುತ್ತಿತ್ತು.',
      'சிற்பக்கலை புனிதத் தொண்டாகக் கருதப்பட்டது; கோயில் சிலைகளுக்கு தாள-மான அளவுகளும் வீட்டு உபயோகக் கற்களுக்கு நடைமுறை வடிவமைப்பும் பின்பற்றப்பட்டன.',
      'शिल्पकलेला पवित्र साधना मानले जात असे; मूर्तींसाठी शास्त्रीय प्रमाण आणि घरगुती जात्यांसाठी व्यावहारिक समतोल राखला जाई.',
      'ଶିଳ୍ପକାର୍ଯ୍ୟକୁ ପବିତ୍ର ସାଧନା (ଶିଳ୍ପ-ଯୋଗ) ମନାଯାଉଥିଲା।',
      'ভাস্কর্য কর্মকে পবিত্র সাধনা (শিল্প-যোগ) হিসেবে গণ্য করা হতো।'
    ),
    documentedHistoricalExamples: m8(
      '1. Udayagiri and Khandagiri rock-cut reliefs (1st century BCE, Bhubaneswar).\n2. Konark Sun Temple and Puri Jagannatha sculptural friezes (12th–13th century CE).\n3. Deccan Viragal hero-stones and stepwell sculptural panels.',
      '1. उदयगिरि और खंडगिरि की शैल-उत्कीर्ण कलाकृतियाँ (भुवनेश्वर)।\n2. कोणार्क सूर्य मंदिर और पुरी जगन्नाथ मंदिर की पाषाण कला (12वीं–13वीं सदी)।\n3. दक्कन के वीरगल और बावड़ियों के उत्कीर्ण फलक।',
      '1. ఉదయగిరి-ఖండగిరి రాతి గుహల శిల్పాలు.\n2. కోణార్క్ సూర్య దేవాలయం మరియు పూరీ జగన్నాథ ఆలయ శిల్ప తోరణాలు.\n3. దక్కన్ వీరగల్లులు మరియు దిగుడు బావుల శిల్పాలు.',
      '1. ಉದಯಗಿರಿ-ಖಂಡಗಿರಿ ಗುಹಾ ಶಿಲ್ಪಗಳು.\n2. ಕೋನಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯ ಮತ್ತು ಪುರಿ ಜಗನ್ನಾಥ ಶಿಲ್ಪಗಳು.\n3. ದಖನ್ ವೀರಗಲ್ಲು ಮತ್ತು ಮೆಟ್ಟಿಲು ಬಾವಿಗಳ ಶಿಲ್ಪಗಳು.',
      '1. உதயகிரி-கண்டகிரி குடைவரைச் சிற்பங்கள்.\n2. கொனார்க் சூரியக் கோயில் மற்றும் புரி ஜகந்நாதர் கோயில் சிற்பங்கள்.\n3. தக்காண வீரக்கற்கள் மற்றும் படிக்கிணறு சிற்பங்கள்.',
      '१. उदयगिरी-खंडगिरी लेणी शिल्पे.\n२. कोणार्क सूर्यमंदिर व पुरी जगन्नाथ मंदिरातील शिल्पपट्ट.\n३. दख्खनमधील वीरगळ आणि बारवांवरील शिल्पे.',
      '୧. ଉଦୟଗିରି-ଖଣ୍ଡଗିରି ଗୁମ୍ଫା ଶିଳ୍ପ।\n୨. କୋଣାର୍କ ଓ ପୁରୀ ମନ୍ଦିରର ପଥର କାରୁକାର୍ଯ୍ୟ।\n୩. ଦାକ୍ଷିଣାତ୍ୟର ବୀରଗଲ୍ ଶିଳ୍ପ।',
      '১. উদয়গিরি-খণ্ডগিরি গুহা ভাস্কর্য।\n২. কোণার্ক ও পুরী মন্দিরের প্রস্তর কারুকার্য।\n৩. দাক্ষিণাত্যের বীরগল ও বাওলির ভাস্কর্য।'
    ),
    contributionsToSociety: m8(
      'Preserved historical memory on durable stone inscriptions and hero-stones, beautified sacred architecture, and provided every village with durable stone grain-processing tools.',
      'स्थायी पाषाण शिलालेखों व वीरगलों पर ऐतिहासिक स्मृति को सुरक्षित किया, पवित्र स्थापत्य को अलंकृत किया और प्रत्येक गाँव को अनाज पीसने के टिकाऊ पाषाण उपकरण प्रदान किए।',
      'శాసనాలు మరియు వీరగల్లుల ద్వారా చరిత్రను శిలలపై నిక్షిప్తం చేయడం, ఆలయాలను అలంకరించడం మరియు గ్రామాలకు రాతి గృహోపకరణాలను అందించడం.',
      'ಶಾಸನ ಮತ್ತು ವೀರಗಲ್ಲುಗಳ ಮೂಲಕ ಇತಿಹಾಸವನ್ನು ಕಲ್ಲಿನಲ್ಲಿ ಶಾಶ್ವತಗೊಳಿಸುವುದು ಹಾಗೂ ಗ್ರಾಮಗಳಿಗೆ ಗೃಹೋಪಯೋಗಿ ಕಲ್ಲಿನ ಸಾಧನಗಳನ್ನು ಒದಗಿಸುವುದು.',
      'கல்வெட்டுகள் மற்றும் வீரக்கற்கள் மூலம் வரலாற்றைப் பாதுகாத்தல் மற்றும் கிராமங்களுக்குக் கல் உபகரணங்களை வழங்குதல்.',
      'शिलालेख व वीरगळांवर इतिहास कोरून ठेवणे आणि गावांना टिकाऊ दगडी गृहोपयोगी साधने पुरवणे.',
      'ଶିଳାଲେଖ ଓ ବୀରଗଲ୍ ମାଧ୍ୟମରେ ଇତିହାସ ସଂରକ୍ଷଣ ଏବଂ ଗ୍ରାମାଞ୍ଚଳକୁ ପଥର ଉପକରଣ ଯୋଗାଣ।',
      'শিলালিপি ও বীরগলের মাধ্যমে ইতিহাস সংরক্ষণ এবং গ্রামে গ্রামে পাথরের গৃহস্থালি সরঞ্জাম সরবরাহ।'
    ),
    communitySpecificConnectionsAndDistinctions: m8(
      'Stone carving in India involved multiple distinct groups: canonical temple silpins (Pathuria / Maharana in Odisha, Panchala / Vishwakarma in South India) alongside quarry-carver and rough-dressing stone specialists from the Kallu-Vaddar, Vaddera, Oddar, and Od lineages who extracted monoliths, dressed structural ashlar blocks, and carved utilitarian stone implements.',
      'भारत में पाषाण शिल्प में कई विशिष्ट समूह शामिल रहे: शास्त्रीय मंदिर शिल्पियों (ओडिशा में पथुरिया/महाराणा, दक्षिण में पंचाल/विश्वकर्मा) के साथ-साथ कल्लु-वड्डार, वड्डेरा, ओड्डार और ओड समाज के पाषाण विशेषज्ञ जिन्होंने एकाश्म शिलाखंड निकाले, स्तंभ तराशे और घरेलू पाषाण उपकरण बनाए।',
      'భారతదేశపు రాతి శిల్పకళలో ఆలయ శిల్పులతో పాటు కల్లు-వడ్డెర, వొడ్డార్, ఒడ్డార్ మరియు ఓడ్ సమాజాలకు చెందిన రాతి గనుల నిపుణులు భారీ శిలలను వెలికితీసి, స్తంభాలను మలిచి, రాతి తిరగళ్ల వంటి గృహోపకరణాలను తయారు చేశారు.',
      'ಭಾರತದ ಶಿಲ್ಪಕಲೆಯಲ್ಲಿ ದೇವಾಲಯ ಶಿಲ್ಪಿಗಳ ಜೊತೆಗೆ ಕಲ್ಲು-ವಡ್ಡರ್, ವಡ್ಡೇರ ಮತ್ತು ಓಡ್ ಸಮುದಾಯದ ಕಲ್ಲು ಕುಟಿಗರು ಬೃಹತ್ ಶಿಲೆಗಳನ್ನು ತೆಗೆದು ಕಂಬಗಳನ್ನು ಮತ್ತು ಗೃಹೋಪಯೋಗಿ ಕಲ್ಲಿನ ಸಾಧನಗಳನ್ನು ರೂಪಿಸಿದರು.',
      'கோயில் சிற்பிகளுடன் கல்லு-வட்டர், வட்டேரா, ஒட்டர் மற்றும் ஓட் சமூகக் கல் கலைஞர்கள் பெருங்கற்களை வெட்டியெடுத்துத் தூண்களையும் வீட்டு உபயோகக் கற்களையும் செதுக்கினர்.',
      'मंदिर शिल्पकारांसोबतच दगड-वडार, वड्डेरा आणि ओड समाजातील पाषाण कारागिरांनी महाकाय शिळा खाणीतून काढून खांब व घरगुती दगडी साधने घडवली.',
      'ମନ୍ଦିର ଶିଳ୍ପୀଙ୍କ ସହ କଲ୍ଲୁ-ୱଡ୍ଡାର, ଭଡ୍ଡେରା ଓ ଓଡ଼ ସମାଜର ପଥର କାରିଗରମାନେ ବୃହତ୍ ଶିଳା ଖନନ ଓ ପଥର ଉପକରଣ ନିର୍ମାଣ କରୁଥିଲେ।',
      'মন্দির ভাস্করদের পাশাপাশি কাল্লু-বড্ডার, ভড্ডেরা ও ওড সমাজের প্রস্তর কারিগররা বিশাল শিলা খনন, স্তম্ভ গঠন ও গৃহস্থালি পাথরের সরঞ্জাম তৈরি করতেন।'
    ),
    epistemicAndMethodologicalNote: m8(
      'Methodological Note: Historical scholarship distinguishes between Sanskritic Silpa-shastra guilds and regional stone-quarrying/dressing guilds, while recognizing their close collaboration on monumental sites.',
      'कार्यप्रणाली टिप्पणी: ऐतिहासिक शोध शास्त्रीय शिल्प-शास्त्र संघों और क्षेत्रीय पाषाण-खदान व तक्षण संघों के बीच अंतर स्पष्ट करते हुए स्मारक स्थलों पर उनके आपसी सहयोग को रेखांकित करता है।',
      'పరిశోధనా గమనిక: ఆగమ శిల్ప సంఘాలు మరియు రాతి గనుల తవ్వకం-నిర్మాణ సంఘాల మధ్య గల ప్రత్యేకతను, పరస్పర సహకారాన్ని చరిత్రకారులు గుర్తిస్తారు.',
      'ಸಂಶೋಧನಾ ಸೂಚನೆ: ಶಾಸ್ತ್ರೀಯ ಶಿಲ್ಪ ಸಂಘಗಳು ಮತ್ತು ಕಲ್ಲು ಗಣಿಗಾರಿಕೆ-ಕೆತ್ತನೆ ಸಂಘಗಳ ನಡುವಿನ ವಿಶಿಷ್ಟ ಪಾತ್ರ ಹಾಗೂ ಸಹಕಾರವನ್ನು ಇಲ್ಲಿ ಸ್ಪಷ್ಟಪಡಿಸಲಾಗಿದೆ.',
      'ஆய்வுக் குறிப்பு: ஆகமச் சிற்பக் குழுக்களுக்கும் கல் அகழ்வு மற்றும் செதுக்கும் குழுக்களுக்கும் இடையிலான தனித்துவமும் கூட்டுப் பணியும் இங்கு வேறுபடுத்திக் காட்டப்படுகின்றன.',
      'संशोधन टीप: शास्त्रीय शिल्प संघ आणि दगड खाणकाम व घडण करणारे संघ यांच्यातील स्वतंत्र ओळख व परस्पर सहकार्य येथे स्पष्ट केले आहे.',
      'ଗବେଷଣା ଟିପ୍ପଣୀ: ଶାସ୍ତ୍ରୀୟ ଶିଳ୍ପୀ ସଂଘ ଓ ପଥର ଖଣି-ଖୋଦେଇ କାରିଗର ସଂଘ ମଧ୍ୟରେ ଥିବା ପାରସ୍ପରିକ ସହଯୋଗକୁ ଏଠାରେ ସ୍ପଷ୍ଟ କରାଯାଇଛି।',
      'পদ্ধতিগত নোট: শাস্ত্রীয় শিল্পী সংঘ এবং পাথর খনন ও খোদাইকারী সংঘের স্বতন্ত্র পরিচয় ও পারস্পরিক সহযোগিতা এখানে স্পষ্ট করা হয়েছে।'
    ),
    visualAssets: [
      {
        id: 'vis_prof_4_surya_sculpture',
        imageUrl: ARCHIVE_IMG('surya_konark_sculpture.jpg'),
        visualType: 'Archaeological Photograph',
        historicalPeriod: '13th Century CE Kalinga Stone Sculpture Tradition',
        title: m8(
          'Carved Chlorite Stone Sculpture & Temple Relief Artistry at Konark',
          'कोणार्क का उत्कीर्ण क्लोराइट पाषाण शिल्प एवं मंदिर तक्षण कला',
          'కోణార్క్ క్లోరైట్ రాతి శిల్పకళ మరియు ఆలయ చెక్కడం నైపుణ్యం',
          'ಕೋಣಾರ್ಕ್ ಕ್ಲೋರೈಟ್ ಕಲ್ಲಿನ ಶಿಲ್ಪಕಲೆ ಮತ್ತು ದೇವಾಲಯ ಕೆತ್ತನೆ',
          'கோனார்க் குளோரைட் கற்சிற்பக் கலை மற்றும் கோயில் செதுக்குதல்',
          'कोणार्क येथील कोरीव पाषाण शिल्पकला आणि मंदिर तक्षण कला',
          'କୋଣାର୍କର ଖୋଦିତ କ୍ଲୋରାଇଟ୍ ପ୍ରସ୍ତର ଶିଳ୍ପ ଓ ମନ୍ଦିର ତକ୍ଷଣ କଳା',
          'কোনার্কের খোদাইকৃত ক্লোরাইট প্রস্তর ভাস্কর্য ও মন্দির তক্ষণ শিল্প'
        ),
        caption: m8(
          'High-precision stone carving illustrating the Shilpi heritage of sacred relief sculpture, hero-stones (Viragals), and lithic utility implements.',
          'पवित्र मंदिर उत्कीर्णन, वीरगल स्मारकों और घरेलू पाषाण उपकरणों (आटा चक्की) की शिल्पी परंपरा को दर्शाता पाषाण शिल्प।',
          'ఆలయ శిల్పాలు, వీరగల్లు స్మారకాలు మరియు గృహోపకరణ రాతి పనిముట్ల (తిరగలి) శిల్పి వారసత్వాన్ని ప్రతిబింబించే రాతి శిల్పం.',
          'ದೇವಾಲಯದ ಶಿಲ್ಪಗಳು, ವೀರಗಲ್ಲುಗಳು ಮತ್ತು ಬೀಸುವ ಕಲ್ಲಿನಂತಹ ಸಾಧನಗಳ ಶಿಲ್ಪಿ ಪರಂಪರೆಯನ್ನು ತೋರಿಸುವ ಕಲ್ಲಿನ ಕೆತ್ತನೆ.',
          'கோயில் சிற்பங்கள், வீரக்கற்கள் மற்றும் திரிகை போன்ற கற்கருவிகளின் சிற்பி மரபைக் காட்டும் கற்சிற்பம்.',
          'मंदिर शिल्पे, वीरगळ आणि दगडी जाते यांसारख्या साधनांची शिल्पी परंपरा दर्शवणारे पाषाण शिल्प.',
          'ମନ୍ଦିର ମୂର୍ତ୍ତି, ବୀରଗଲ୍ ଓ ପଥର ଚକି ଭଳି ଉପକରଣର ଶିଳ୍ପୀ ପରମ୍ପରାକୁ ଦର୍ଶାଉଥିବା ପ୍ରସ୍ତର କଳା।',
          'মন্দির ভাস্কর্য, বীরগল ও পাথরের যাঁতার মতো সরঞ্জামের শিল্পী ঐতিহ্য প্রদর্শনকারী প্রস্তর শিল্প।'
        ),
        altText: m8(
          'Carved stone sculpture at Konark Sun Temple representing Shilpi stone-carving heritage',
          'शिल्पी पाषाण तक्षण विरासत को दर्शाती कोणार्क सूर्य मंदिर की उत्कीर्ण प्रतिमा',
          'శిల్పి రాతి చెక్కడం వారసత్వాన్ని చూపే కోణార్క్ సూర్య దేవాలయ శిల్పం',
          'ಶಿಲ್ಪಿ ಕಲ್ಲು ಕೆತ್ತನೆ ಪರಂಪರೆಯನ್ನು ತೋರಿಸುವ ಕೋಣಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯದ ಶಿಲ್ಪ',
          'சிற்பி கல் செதுக்கும் மரபைக் காட்டும் கோனார்க் சூரியக் கோயில் சிற்பம்',
          'शिल्पी पाषाण वारसा दर्शवणारी कोणार्क सूर्यमंदिरातील कोरीव मूर्ती',
          'ଶିଳ୍ପୀ ପ୍ରସ୍ତର କଳା ଐତିହ୍ୟ ଦର୍ଶାଉଥିବା କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିରର ମୂର୍ତ୍ତି',
          'শিল্পী প্রস্তর খোদাই ঐতিহ্য প্রদর্শনকারী কোনার্ক সূর্য মন্দিরের ভাস্কর্য'
        ),
        sourceAttribution: 'Archaeological Survey of India (ASI) Monument Documentation — Konark, Odisha',
        licenseInfo: 'Public Domain / Heritage Monument Documentation'
      }
    ],
    relatedArticles: [
      {
        id: 'rel_sh_1',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_10_vaddera',
        label: m8('Vaddera Community Article', 'वड्डेरा समुदाय लेख', 'వడ్డెర సమాజ వ్యాసం', 'ವಡ್ಡೇರ ಸಮುದಾಯ ಲೇಖನ', 'வட்டேரா சமூகக் கட்டுரை', 'वड्डेरा समाज लेख', 'ଭଡ୍ଡେରା ସମୁଦାୟ ଲେଖା', 'ভড্ডেরা সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_sh_2',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_15_voddar',
        label: m8('Voddar Community Article', 'वोड्डार समुदाय लेख', 'వొడ్డార్ సమాజ వ్యాసం', 'ವೊಡ್ಡರ್ ಸಮುದಾಯ ಲೇಖನ', 'வொட்டர் சமூகக் கட்டுரை', 'वोड्डार समाज लेख', 'ଭୋଡ୍ଡାର ସମୁଦାୟ ଲେଖା', 'ভোড্ডার সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_sh_3',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_08_odan',
        label: m8('Odan Community Article', 'ओडन समुदाय लेख', 'ఓడన్ సమాజ వ్యాసం', 'ಓಡನ್ ಸಮುದಾಯ ಲೇಖನ', 'ஓடன் சமூகக் கட்டுரை', 'ओडण समाज लेख', 'ଓଡ଼ନ୍ ସମୁଦାୟ ଲେଖା', 'ওডন সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      }
    ],
    relatedKeywords: ['Shilpi', 'Sculpture', 'Inventor of the Floor Mill', 'Voddar', 'Vaddera', 'LokaShilpi'],
    references: [
      {
        citation: 'Boner, A., Sarma, S. R., & Das, R. P. (1972). New Light on the Sun Temple of Konarka. Chowkhamba Sanskrit Series Office, Varanasi.',
        type: 'Academic Monograph'
      }
    ]
  },
  {
    id: 'prof_cat_5_vasthushilpi',
    slug: 'vasthushilpi-architecture-and-design-heritage',
    categoryNumber: 5,
    codeLabel: 'Category 5',
    title: m8(
      'Category 5: Vasthushilpi — Architecture and Design Heritage',
      'श्रेणी 5: वास्तुशिल्पी — वास्तुकला एवं संरचना डिज़ाइन विरासत',
      'వర్గం 5: వాస్తుశిల్పి — వాస్తుశిల్పం మరియు భవన నిర్మాణ వారసత్వం',
      'ವರ್ಗ 5: ವಾಸ್ತುಶಿಲ್ಪಿ — ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ವಿನ್ಯಾಸ ಪರಂಪರೆ',
      'வகை 5: வாஸ்துசில்பி — கட்டிடக்கலை மற்றும் வடிவமைப்புப் பாரம்பரியம்',
      'वर्ग ५: वास्तुशिल्पी — वास्तुकला आणि रचना वारसा',
      'ବର୍ଗ ୫: ବାସ୍ତୁଶିଳ୍ପୀ — ସ୍ଥାପତ୍ୟ ଓ ନିର୍ମାଣ ଡିଜାଇନ୍ ଐତିହ୍ୟ',
      'বিভাগ ৫: বাস্তুশিল্পী — স্থাপত্য ও নকশা ঐতিহ্য'
    ),
    shortSummary: m8(
      'Traditional architectural designers (Vasthushilpi), temple and fort architecture, residential planning, site-geometry (Vastu-mandala), and structural stability knowledge.',
      'पारंपरिक वास्तुकार (वास्तुशिल्पी), मंदिर एवं दुर्ग स्थापत्य, आवासीय योजना, भूमि-ज्यामिति (वास्तु-मंडल) और संरचनात्मक स्थिरता का पारंपरिक ज्ञान।',
      'సాంప్రదాయ వాస్తుశిల్పులు, ఆలయ మరియు కోటల వాస్తుశిల్పం, గృహ నిర్మాణ ప్రణాళిక, భూమి జ్యామితి మరియు కట్టడాల పటిష్టత విజ్ఞానం.',
      'ಸಾಂಪ್ರದಾಯಿಕ ವಾಸ್ತುಶಿಲ್ಪಿಗಳು, ದೇವಾಲಯ ಮತ್ತು ಕೋಟೆ ವಾಸ್ತುಶಿಲ್ಪ, ವಸತಿ ಯೋಜನೆ ಮತ್ತು ಕಟ್ಟಡ ವಿನ್ಯಾಸ ಜ್ಞಾನ.',
      'பாரம்பரிய கட்டிடக்கலை வடிவமைப்பாளர்கள் (வாஸ்துசில்பி), கோயில் மற்றும் கோட்டை கட்டிடக்கலை, குடியிருப்பு மற்றும் கட்டமைப்புத் திட்டமிடல்.',
      'पारंपरिक वास्तुविशारद (वास्तुशिल्पी), मंदिर आणि दुर्ग वास्तुकला, निवासी बांधकाम नियोजन आणि पारंपरिक स्थापत्य ज्ञान.',
      'ପାରମ୍ପରିକ ସ୍ଥାପତ୍ୟ ଡିଜାଇନର (ବାସ୍ତୁଶିଳ୍ପୀ), ମନ୍ଦିର ଓ ଦୁର୍ଗ ସ୍ଥାପତ୍ୟ, ଗୃହ ନିର୍ମାଣ ଯୋଜନା ଓ ପାରମ୍ପରିକ ବାସ୍ତୁ ଜ୍ଞାନ।',
      'ঐতিহ্যবাহী স্থাপত্য নকশাকার (বাস্তুশিল্পী), মন্দির ও দুর্গ স্থাপত্য, আবাসিক পরিকল্পনা এবং ঐতিহ্যবাহী স্থাপত্য জ্ঞান।'
    ),
    includedSubClassifications: [
      {
        id: 'sub_5_1',
        name: m8('Vasthushilpi & Traditional Architectural Designers', 'वास्तुशिल्पी एवं पारंपरिक वास्तु डिज़ाइनर', 'వాస్తుశిల్పి & సాంప్రదాయ వాస్తు రూపకర్తలు', 'ವಾಸ್ತುಶಿಲ್ಪಿ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ವಾಸ್ತು ವಿನ್ಯಾಸಕರು', 'வாஸ்துசில்பி மற்றும் பாரம்பரிய கட்டிட வடிவமைப்பாளர்கள்', 'वास्तुशिल्पी आणि पारंपरिक वास्तु रचनाकार', 'ବାସ୍ତୁଶିଳ୍ପୀ ଓ ପାରମ୍ପରିକ ସ୍ଥାପତ୍ୟ ଡିଜାଇନର', 'বাস্তুশিল্পী ও ঐতিহ্যবাহী স্থাপত্য নকশাকার'),
        description: m8('Planners of site orientation, soil testing (Bhu-pariksha), and proportional layout.', 'स्थल दिशा-निर्धारण, भूमि-परीक्षण और आनुपातिक विन्यास के योजनाकार।', 'స్థల దిశానిర్దేశం, భూ-పరీక్ష మరియు నిర్మాణ కొలతల ప్రణాళికా నిపుణులు.', 'ಸ್ಥಳ ನಿರ್ದೇಶನ, ಭೂ-ಪರೀಕ್ಷೆ ಮತ್ತು ವಿನ್ಯಾಸ ಯೋಜಕರು.', 'இடத் தேர்வு, மண் பரிசோதனை மற்றும் கட்டிட விகிதாச்சார வடிவமைப்பாளர்கள்.', 'जागेची दिशा, भू-परीक्षण आणि प्रमाणबद्ध आराखडा तयार करणारे तज्ज्ञ.', 'ସ୍ଥଳ ଦିଗ-ନିର୍ଣ୍ଣୟ, ଭୂ-ପରୀକ୍ଷା ଓ ଅନୁପାତିକ ନକ୍ସା ପ୍ରস্তୁତକାରୀ।', 'স্থান নির্বাচন, ভূমি পরীক্ষা ও আনুপাতিক নকশা পরিকল্পনাকারী।')
      },
      {
        id: 'sub_5_2',
        name: m8('Temple Architecture & Fort Architecture', 'मंदिर स्थापत्य एवं दुर्ग स्थापत्य', 'ఆలయ వాస్తుశిల్పం & కోటల వాస్తుశిల్పం', 'ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಕೋಟೆ ವಾಸ್ತುಶಿಲ್ಪ', 'கோயில் கட்டிடக்கலை மற்றும் கோட்டை கட்டிடக்கலை', 'मंदिर स्थापत्य आणि दुर्ग स्थापत्य', 'ମନ୍ଦିର ସ୍ଥାପତ୍ୟ ଓ ଦୁର୍ଗ ସ୍ଥାପତ୍ୟ', 'মন্দির স্থাপত্য ও দুর্গ স্থাপত্য'),
        description: m8('Kalinga Deula orders (Rekha, Pidha, Khakhara) and defensive fort geometry (Giri-durga, Jala-durga, Sthala-durga).', 'कलिंग देउल शैली (रेखा, पीढ़ा, खाखरा) और रक्षात्मक दुर्ग ज्यामिति (गिरि-दुर्ग, जल-दुर्ग, स्थल-दुर्ग)।', 'కళింగ దేవుల శైలి మరియు గిరి-దుర్గ, జల-దుర్గ, స్థల-దుర్గ నిర్మాణ ప్రణాళిక.', 'ಕಳಿಂಗ ದೇউಲ ಶೈಲಿ ಮತ್ತು ಗಿರಿ-ದುರ್ಗ, ಜಲ-ದುರ್ಗಗಳ ವಿನ್ಯಾಸ.', 'கலிங்கக் கோயில் பாணி மற்றும் மலை, நீர், நிலக் கோட்டைகளின் வடிவமைப்பு.', 'कलिंग मंदिर शैली आणि गिरीदुर्ग, जलदुर्ग व भुईकोट किल्ल्यांची रचना.', 'କଳିଙ୍ଗ ଦେଉଳ ଶୈଳୀ (ରେଖା, ପୀଢ଼, ଖାଖରା) ଓ ଦୁର୍ଗ ନିର୍ମାଣ କୌଶଳ।', 'কলিঙ্গ দেউল শৈলী এবং গিরিদুর্গ, জলদুর্গ ও স্থলদুর্গের নকশা।')
      },
      {
        id: 'sub_5_3',
        name: m8('Residential Architecture & Structural Planning', 'आवासीय वास्तुकला एवं संरचनात्मक नियोजन', 'గృహ వాస్తుశిల్పం & నిర్మాణ ప్రణాళిక', 'ವಸತಿ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ರಚನಾತ್ಮಕ ಯೋಜನೆ', 'குடியிருப்பு கட்டிடக்கலை மற்றும் கட்டமைப்புத் திட்டமிடல்', 'निवासी वास्तुकला आणि संरचनात्मक नियोजन', 'ଆବାସିକ ସ୍ଥାପତ୍ୟ ଓ ସଂରଚନାତ୍ମକ ଯୋଜନା', 'আবাসিক স্থাপত্য ও কাঠামোগত পরিকল্পনা'),
        description: m8('Courtyard homes, granaries, village chowks, and load-bearing foundation engineering.', 'आंगनयुक्त आवास, अन्नागार, ग्राम चौपाल और भार-वाहक नींव नियोजन।', 'లోగిలి ఇళ్లు, ధాన్యపు గాదెలు మరియు పునాది ప్రణాళిక.', 'ಅಂಗಳದ ಮನೆಗಳು, ಕಣಜಗಳು ಮತ್ತು ಅಡಿಪಾಯ ಯೋಜನೆ.', 'முற்றம் கொண்ட வீடுகள், தானியக் களஞ்சியங்கள் மற்றும் அடித்தளத் திட்டமிடல்.', 'चौसोपी घरे, धान्य कोठारे आणि मजबूत पाया नियोजन.', 'ଅଗଣା ଘର, ଶସ୍ୟ ଭଣ୍ଡାର ଓ ମୂଳଦୁଆ ଯୋଜନା।', 'উঠানযুক্ত বাড়ি, শস্যভাণ্ডার ও ভিত্তি পরিকল্পনা।')
      }
    ],
    definitionAndExplanation: m8(
      'Vasthushilpi refers to traditional architectural planning, site geometry, and structural layout across sacred, military, hydraulic, and residential buildings. Important Distinction: Traditional architectural knowledge (Vastu-vidya / Silpa-shastra and empirical guild geometry) is a historical heritage system and is clearly distinguished from modern licensed civil engineering or contemporary academic architecture degrees.',
      'वास्तुशिल्पी से तात्पर्य धार्मिक, सैन्य, जल और आवासीय भवनों के पारंपरिक वास्तु नियोजन और संरचनात्मक विन्यास से है। महत्वपूर्ण अंतर: पारंपरिक वास्तु ज्ञान (वास्तु-विद्या / शिल्प-शास्त्र) एक ऐतिहासिक विरासत प्रणाली है और इसे आधुनिक लाइसेंस प्राप्त सिविल इंजीनियरिंग या समकालीन वास्तुकला डिग्री से स्पष्ट रूप से अलग समझा जाना चाहिए।',
      'వాస్తుశిల్పి అనేది ఆలయాలు, కోటలు, జలాశయాలు మరియు గృహాల సాంప్రదాయ నిర్మాణ ప్రణాళికను సూచిస్తుంది. ముఖ్య గమనిక: సాంప్రదాయ వాస్తు విజ్ఞానం అనేది చారిత్రక వారసత్వ విధానం; దీనిని ఆధునిక సివిల్ ఇంజనీరింగ్ లేదా ఆర్కిటెక్చర్ డిగ్రీల నుండి వేరుగా చూడాలి.',
      'ವಾಸ್ತುಶಿಲ್ಪಿ ಎಂಬುದು ದೇವಾಲಯ, ಕೋಟೆ, ಜಲಾಶಯ ಮತ್ತು ಮನೆಗಳ ಸಾಂಪ್ರದಾಯಿಕ ವಿನ್ಯಾಸ ಜ್ಞಾನವಾಗಿದೆ. ಪ್ರಮುಖ ವ್ಯತ್ಯಾಸ: ಸಾಂಪ್ರದಾಯಿಕ ವಾಸ್ತು ವಿದ್ಯೆಯು ಐತಿಹಾಸಿಕ ಪರಂಪರೆಯಾಗಿದ್ದು, ಆಧುನಿಕ ಸಿವಿಲ್ ಎಂಜಿನಿಯರಿಂಗ್ ಪದವಿಯಿಂದ ಭಿನ್ನವಾಗಿದೆ.',
      'வாஸ்துசில்பி என்பது கோயில், கோட்டை, நீர்நிலை மற்றும் குடியிருப்புகளின் பாரம்பரியக் கட்டிடக்கலைத் திட்டமிடலைக் குறிக்கிறது. பாரம்பரிய வாஸ்து அறிவு என்பது நவீன சிவில் பொறியியல் பட்டத்திலிருந்து வேறுபட்ட வரலாற்று மரபாகும்.',
      'वास्तुशिल्पी म्हणजे मंदिरे, किल्ले, जलाशय आणि निवासस्थानांचे पारंपरिक स्थापत्य नियोजन होय. पारंपरिक वास्तुज्ञान आणि आधुनिक अभियांत्रिकी पदवी यांत स्पष्ट फरक आहे.',
      'ବାସ୍ତୁଶିଳ୍ପୀ ଅର୍ଥ ମନ୍ଦିର, ଦୁର୍ଗ, ଜଳାଶୟ ଓ ଗୃହର ପାରମ୍ପରିକ ସ୍ଥାପତ୍ୟ ଯୋଜନା। ଏହା ଆଧୁନିକ ସିଭିଲ୍ ଇଞ୍ଜିନିୟରିଂ ଡିଗ୍ରୀଠାରୁ ଭିନ୍ନ ଏକ ଐତିହାସିକ ଜ୍ଞାନ ପ୍ରଣାଳୀ।',
      'বাস্তুশিল্পী বলতে মন্দির, দুর্গ, জলাশয় ও গৃহের ঐতিহ্যবাহী স্থাপত্য পরিকল্পনাকে বোঝায়। এই ঐতিহ্যবাহী বাস্তুবিদ্যা আধুনিক সিভিল ইঞ্জিনিয়ারিং ডিগ্রি থেকে স্বতন্ত্র।'
    ),
    historicalBackground: m8(
      'Treatises such as the Bhubanapradipa and Silpa Prakasa in Odisha, alongside southern Mayamata and Manasara traditions, codified temple and fort elevations, while practical field-masons applied empirical hydro-geological testing when siting stepwells, tanks, and hilltop bastions.',
      'ओडिशा के "भुवनप्रदीप" और "शिल्प प्रकाश" तथा दक्षिण के "मयमतम" और "मानसार" जैसे ग्रंथों ने मंदिर व दुर्ग निर्माण के सिद्धांतों को सूत्रबद्ध किया, जबकि मैदानी निर्माताओं ने बावड़ियों, तालाबों और दुर्गों के स्थान चयन में व्यावहारिक भू-जल परीक्षण का प्रयोग किया।',
      'ఒడిశాలోని "భువనప్రదీప", "శిల్ప ప్రకాశ" మరియు దక్షిణాది "మయమతం", "మానసారం" గ్రంథాలు ఆలయ, కోట నిర్మాణ సూత్రాలను వివరించగా, క్షేత్రస్థాయి శిల్పులు భూగర్భ జల మరియు నేల పటిష్టత పరీక్షలను ఆచరణలో పెట్టారు.',
      'ಒಡಿಶಾದ "ಭುವನಪ್ರದೀಪ" ಮತ್ತು ದಕ್ಷಿಣದ "ಮಯಮತ", "ಮಾನಸಾರ" ಗ್ರಂಥಗಳು ವಾಸ್ತು ಸೂತ್ರಗಳನ್ನು ದಾಖಲಿಸಿದ್ದು, ಕ್ಷೇತ್ರ ಶಿಲ್ಪಿಗಳು ಕೆರೆ ಮತ್ತು ಕೋಟೆಗಳ ನಿರ್ಮಾಣದಲ್ಲಿ ಪ್ರಾಯೋಗಿಕ ಭೂ-ಪರೀಕ್ಷೆಯನ್ನು ಬಳಸಿದರು.',
      'ஒடிசாவின் "புவனபிரதீபா" மற்றும் தென்னகத்தின் "மயமதம்", "மானசாரம்" ஆகிய நூல்கள் கட்டிடக்கலை விதிகளை வகுத்தன.',
      'ओडिशातील "भुवनप्रदीप" आणि दक्षिणेतील "मयमतम" व "मानसार" या ग्रंथांत स्थापत्य तत्त्वे मांडली गेली, तर प्रत्यक्ष कारागिरांनी भू-परीक्षणाचा वापर केला.',
      'ଓଡ଼ିଶାର "ଭୁବନପ୍ରଦୀପ" ଓ "ଶିଳ୍ପ ପ୍ରକାଶ" ଗ୍ରନ୍ଥରେ ମନ୍ଦିର ଓ ଦୁର୍ଗ ସ୍ଥାପତ୍ୟର ନିୟମାବଳୀ লিପିବଦ୍ଧ ହୋଇଛି।',
      'ওড়িশার "ভুবনপ্রদীপ" ও "শিল্প প্রকাশ" এবং দক্ষিণ ভারতের "ময়মত" গ্রন্থে স্থাপত্য রীতির সূত্রায়ন হয়েছে।'
    ),
    toolsMaterialsAndTechniques: m8(
      'Gnomon shadow-stick (Shanku) for cardinal alignment, measuring rod (Danda / Hasta), plumb-line (Avalamba-sutra), and interlocking iron-dowel (Loha-bandha) corbelled stone arches.',
      'दिशा निर्धारण हेतु शंकु (छाया-दंड), मापन दंड (हस्त), साहुल-सूत्र (अवलंब-सूत्र) और लौह-क्लैंप (लोह-बंध) युक्त पत्थर की मेहराबें।',
      'దిశలను గుర్తించే శంకువు, కొలబద్ద (దండ/హస్త), లంబసూత్రం మరియు ఇనుప కీలలతో (లోహ-బంధ) రాళ్లను బంధించే పద్ధతి.',
      'ದಿಕ್ಕು ಗುರುತಿಸುವ ಶಂಕು, ಅಳತೆ ಕೋಲು, ಲಂಬಸೂತ್ರ ಮತ್ತು ಕಬ್ಬಿಣದ ಕೊಂಡಿಗಳಿಂದ ಕಲ್ಲುಗಳನ್ನು ಬೆಸೆಯುವ ತಂತ್ರ.',
      'திசை அறியும் சங்கு, அளவுகோல், தூக்குநூல் மற்றும் இரும்புக் கொக்கிகளால் கற்களை இணைக்கும் முறை.',
      'दिशा ठरवणारा शंकू, मोजपट्टी, ओळंबा आणि लोखंडी क्लॅम्पने दगड जोडण्याचे तंत्र.',
      'ଦିଗ ନିର୍ଣ୍ଣୟ ପାଇଁ ଶଙ୍କୁ, ମାପ ଦଣ୍ଡ, ସୂତା ଓ ଲୌହ-ବନ୍ଧ କୌଶଳ।',
      'দিক নির্ণয়ের শঙ্কু, পরিমাপক দণ্ড, ওলনদড়ি ও লৌহ-বন্ধনী কৌশল।'
    ),
    culturalAndRegionalSignificance: m8(
      'Sacred geometry harmonized built structures with local topography, monsoon drainage lines, and solar alignments (such as the east-facing rising-sun axis of Konark and Suryavamsha shrines).',
      'पवित्र ज्यामिति ने निर्मित संरचनाओं को स्थानीय भू-आकृति, मानसून जल-निकासी और सूर्य की किरणों (जैसे कोणार्क और सूर्यवंशी मंदिरों का पूर्व-मुखी अक्ष) के साथ समन्वित किया।',
      'పవిత్ర జ్యామితి కట్టడాలను స్థానిక భౌగోళిక స్వరూపం, వర్షపు నీటి ప్రవాహం మరియు సూర్య కిరణాల దిశతో (కోణార్క్ సూర్య దేవాలయం వలె) అనుసంధానించింది.',
      'ಪವಿತ್ರ ಜ್ಯಾಮಿತಿಯು ಕಟ್ಟಡಗಳನ್ನು ಸ್ಥಳೀಯ ಭೂಸ್ವರೂಪ, ಮಳೆನೀರು ಹರಿವು ಮತ್ತು ಸೂರ್ಯನ ಕಿರಣಗಳ ದಿಕ್ಕಿನೊಂದಿಗೆ ಸಮನ್ವಯಗೊಳಿಸಿತು.',
      'புனித வடிவியல் கட்டிடங்களை நில அமைப்பு, மழைநீர் வடிகால் மற்றும் சூரிய ஒளியின் திசையுடன் இணைத்தது.',
      'पवित्र भूमितीने वास्तूंना स्थानिक भूरचना, पर्जन्य जलप्रवाह आणि सूर्यकिरणांच्या दिशेशी जोडले.',
      'ପବିତ୍ର ଜ୍ୟାମିତି ସ୍ଥାପତ୍ୟକୁ ସ୍ଥାନୀୟ ଭୂ-প্রକୃତି ଓ ସୂର୍ଯ୍ୟ କିରଣ ସହ ସମନ୍ୱିତ କରିଥିଲା।',
      'পবিত্র জ্যামিতি স্থাপত্যকে স্থানীয় ভূ-প্রকৃতি ও সূর্যরশ্মির কৌণিক অবস্থানের সাথে সমন্বিত করেছিল।'
    ),
    documentedHistoricalExamples: m8(
      '1. Barabati Fort (Varanasi Kataka, Cuttack) double-walled moat and bastion layout.\n2. Kondavidu and Udayagiri hill-fortress water-harvesting architecture.\n3. Meghanada Pacheri fortification wall encircling Puri Jagannatha Temple.',
      '1. बाराबती किला (कटक) की दोहरी खाई और प्राचीर योजना।\n2. कोंडावीडु और उदयगिरि गिरि-दुर्गों की जल-संचयन वास्तुकला।\n3. पुरी जगन्नाथ मंदिर की मेघनाद पचेरी सुरक्षा प्राचीर।',
      '1. బారాబతి కోట (కటక్) కందకం మరియు బురుజుల ప్రణాళిక.\n2. కొండవీడు మరియు ఉదయగిరి కొండ కోటల జల సంరక్షణ వాస్తుశిల్పం.\n3. పూరీ జగన్నాథ ఆలయ మేఘనాద పచేరి ప్రాకారం.',
      '1. ಬಾರಾಬತಿ ಕೋಟೆಯ (ಕಟಕ್) ಕಂದಕ ಮತ್ತು ಪ್ರಾಕಾರ ವಿನ್ಯಾಸ.\n2. ಕೊಂಡವೀಡು ಮತ್ತು ಉದಯಗಿರಿ ಕೋಟೆಗಳ ಜಲಸಂಗ್ರಹ ವಾಸ್ತುಶಿಲ್ಪ.\n3. ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ಮೇಘನಾದ ಪಚೇರಿ ಗೋಡೆ.',
      '1. பாராபதி கோட்டையின் (கட்டக்) அகழி மற்றும் மதில் அமைப்பு.\n2. கொண்டவீடு மற்றும் உதயகிரி மலைக்கோட்டைகளின் நீர் சேகரிப்புக் கட்டிடக்கலை.\n3. புரி ஜகந்நாதர் கோயிலின் மேகநாத பச்சேரி மதில்.',
      '१. बाराबती किल्ल्याची (कटक) दुहेरी खंदक व तटबंदी रचना.\n२. कोंडावीडू व उदयगिरी किल्ल्यांचे जलसंधारण स्थापत्य.\n३. पुरी जगन्नाथ मंदिराची मेघनाद पचेरी भिंत.',
      '୧. ବାରବାଟୀ ଦୁର୍ଗର ପରିଖା ଓ ପ୍ରାଚୀର ଯୋଜନା।\n୨. କୋଣ୍ଡାଭିଡୁ ଓ ଉଦୟଗିରି ଦୁର୍ଗର ଜଳ-ସଂରକ୍ଷଣ ସ୍ଥାପତ୍ୟ।\n୩. ପୁରୀ ଶ୍ରୀମନ୍ଦିରର ମେଘନାଦ ପାଚେରୀ।',
      '১. বারবাটি দুর্গের পরিখা ও প্রাচীর নকশা।\n২. কোন্ডাভিডু ও উদয়গিরি দুর্গের জল-সংরক্ষণ স্থাপত্য।\n৩. পুরী জগন্নাথ মন্দিরের মেঘনাদ প্রাচীর।'
    ),
    contributionsToSociety: m8(
      'Engineered cyclone-resilient coastal temples, drought-proof hilltop citadel reservoirs, and thermally balanced vernacular courtyard dwellings.',
      'चक्रवात-रोधी तटीय मंदिरों, सूखा-मुक्त गिरि-दुर्ग जलाशयों और जलवायु-अनुकूल आंगनयुक्त आवासों का निर्माण किया।',
      'తుఫానులను తట్టుకునే తీరప్రాంత ఆలయాలు, కొండ కోటలపై ఎండిపోని జలాశయాలు మరియు వాతావరణానికి అనుకూలమైన గృహాలను నిర్మించారు.',
      'ಚಂಡಮಾರುತ ತಡೆಯುವ ದೇವಾಲಯಗಳು, ಬೆಟ್ಟದ ಕೋಟೆಗಳ ಜಲಾಶಯಗಳು ಮತ್ತು ಹವಾಮಾನಕ್ಕೆ ಹೊಂದಿಕೊಳ್ಳುವ ಮನೆಗಳನ್ನು ನಿರ್ಮಿಸಿದರು.',
      'புயலைத் தாங்கும் கடற்கரைக் கோயில்கள், மலைக்கோட்டை நீர்நிலைகள் மற்றும் காலநிலைக்கு ஏற்ற வீடுகளை உருவாக்கினர்.',
      'चक्रीवादळाला तोंड देणारी मंदिरे, गडावरील पाण्याचे टाके आणि हवामानास अनुकूल घरे बांधली.',
      'ବାତ୍ୟା-ସହନଶୀଳ ମନ୍ଦିର, ଗିରି-ଦୁର୍ଗ ଜଳାଶୟ ଓ ଜଳବାୟୁ ଅନୁକୂଳ ଗୃହ ନିର୍ମାଣ କଲେ।',
      'ঘূর্ণিঝড়-প্রতিরোধী উপকূলীয় মন্দির, পাহাড়চূড়ার জলাশয় এবং জলবায়ু-বান্ধব আবাসিক গৃহ নির্মাণ।'
    ),
    communitySpecificConnectionsAndDistinctions: m8(
      'While court-appointed Sthapatis drafted canonical temple mandalas, field execution of fortress bastions, stepped tanks, and stone foundations relied heavily on master masons from Od, Waddar, Vaddera, and regional builder communities.',
      'जहाँ राज-नियुक्त स्थपतियों ने शास्त्रीय मंदिर मंडलों का प्रारूप तैयार किया, वहीं दुर्ग प्राचीरों, बावड़ियों और पाषाण नींवों का धरातलीय क्रियान्वयन ओड, वडार, वड्डेरा और क्षेत्रीय निर्माता समुदायों के अनुभवी राजमिस्त्रियों द्वारा किया गया।',
      'రాజాస్థాన స్థపతులు ఆలయ నమూనాలను రూపొందించగా, కోట బురుజులు, దిగుడు బావులు మరియు రాతి పునాదుల క్షేత్రస్థాయి నిర్మాణంలో ఓడ్, వడ్డార్, వడ్డెర మరియు ప్రాంతీయ నిర్మాణ నిపుణులు కీలక పాత్ర పోషించారు.',
      'ಆಸ್ಥಾನದ ಸ್ಥಪತಿಗಳು ದೇವಾಲಯದ ನಕ್ಷೆ ರೂಪಿಸಿದರೆ, ಕೋಟೆ ಕೊತ್ತಲಗಳು, ಮೆಟ್ಟಿಲು ಬಾವಿಗಳು ಮತ್ತು ಕಲ್ಲಿನ ಅಡಿಪಾಯಗಳ ನಿರ್ಮಾಣದಲ್ಲಿ ಓಡ್, ವಡ್ಡರ್ ಮತ್ತು ವಡ್ಡೇರ ಕುಶಲಕರ್ಮಿಗಳು ಪ್ರಮುಖ ಪಾತ್ರ ವಹಿಸಿದರು.',
      'அரசவை ஸ்தபதிகள் கோயில் வரைபடங்களை உருவாக்க, கோட்டை கொத்தளங்கள் மற்றும் படிக்கிணறுகளின் களக் கட்டுமானத்தில் ஓட், வட்டார், வட்டேரா கலைஞர்கள் முக்கியப் பங்காற்றினர்.',
      'राजदरबारातील स्थपतींनी मंदिरांचे आराखडे तयार केले, तर किल्ल्यांचे बुरुज, बारवा आणि दगडी पाया उभारण्यात ओड, वडार व वड्डेरा समाजातील गवंडी व कारागिरांचा मोठा वाटा होता.',
      'ରାଜ-ସ୍ଥପତିଙ୍କ ନକ୍ସା ଅନୁଯାୟୀ ଦୁର୍ଗ ପ୍ରାଚୀର, ପାହାଚ କୂଅ ଓ ପଥର ମୂଳଦୁଆ ନିର୍ମାଣରେ ଓଡ଼, ୱଡ୍ଡାର ଓ ଭଡ୍ଡେରା କାରିଗରମାନେ ମୁଖ୍ୟ ଭୂମିକା ନେଇଥିଲେ।',
      'রাজ-স্থপতিদের নকশা অনুযায়ী দুর্গ প্রাচীর, বাওলি ও পাথরের ভিত্তি নির্মাণে ওড, বড্ডার ও ভড্ডেরা কারিগররা মুখ্য ভূমিকা পালন করেছিলেন।'
    ),
    epistemicAndMethodologicalNote: m8(
      'Methodological Note: Clearly separates traditional Vastu-shilpa architectural heritage from modern statutory architectural or engineering qualifications.',
      'कार्यप्रणाली टिप्पणी: पारंपरिक वास्तु-शिल्प विरासत को आधुनिक वैधानिक वास्तुकला या इंजीनियरिंग योग्यता से स्पष्ट रूप से अलग रखा गया है।',
      'పరిశోధనా గమనిక: సాంప్రదాయ వాస్తుశిల్ప వారసత్వాన్ని ఆధునిక ఇంజనీరింగ్/ఆర్కిటెక్చర్ డిగ్రీల నుండి స్పష్టంగా వేరుగా చూపడం జరిగింది.',
      'ಸಂಶೋಧನಾ ಸೂಚನೆ: ಸಾಂಪ್ರದಾಯಿಕ ವಾಸ್ತುಶಿಲ್ಪ ಪರಂಪರೆಯನ್ನು ಆಧುನಿಕ ಎಂಜಿನಿಯರಿಂಗ್ ಅರ್ಹತೆಗಳಿಂದ ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆ.',
      'ஆய்வுக் குறிப்பு: பாரம்பரிய வாஸ்து-சில்ப மரபு நவீன பொறியியல் பட்டங்களிலிருந்து தெளிவாக வேறுபடுத்தப்பட்டுள்ளது.',
      'संशोधन टीप: पारंपरिक वास्तुशिल्प वारसा आधुनिक अभियांत्रिकी पदवीपासून स्पष्टपणे वेगळा ठेवला आहे.',
      'ଗବେଷଣା ଟିପ୍ପଣୀ: ପାରମ୍ପରିକ ବାସ୍ତୁ-ଶିଳ୍ପ ଐତିହ୍ୟକୁ ଆଧୁନିକ ଡିଗ୍ରୀଠାରୁ ପୃଥକ ରଖାଯାଇଛି।',
      'পদ্ধতিগত নোট: ঐতিহ্যবাহী বাস্তু-শিল্প ঐতিহ্যকে আধুনিক প্রকৌশল ডিগ্রি থেকে স্পষ্টভাবে পৃথক রাখা হয়েছে।'
    ),
    visualAssets: [
      {
        id: 'vis_prof_5_puri_architecture',
        imageUrl: ARCHIVE_IMG('puri_jagannatha_temple.jpg'),
        visualType: 'Architectural Monument',
        historicalPeriod: '12th–15th Century CE Kalinga Deula & Meghanada Pacheri Architecture',
        title: m8(
          'Kalinga Rekha-Pidha Deula Elevation & Fortified Meghanada Pacheri Wall at Puri',
          'पुरी श्री जगन्नाथ मंदिर का कलिंग रेखा-पीढ़ा देउल स्थापत्य एवं मेघनाद पचेरी प्राचीर',
          'పూరీ శ్రీ జగన్నాథ ఆలయ కళింగ రేఖా-పీఢా దేవుల వాస్తుశిల్పం & మేఘనాథ పచేరి ప్రాకారం',
          'ಪುರಿ ಶ್ರೀ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ಕಳಿಂಗ ದೇउल ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಮೇಘನಾದ ಪಚೇರಿ ಪ್ರಾಕಾರ',
          'பூரி ஸ்ரீ ஜெகந்நாதர் கோயிலின் கலிங்கக் கட்டிடக்கலை மற்றும் மேகநாத பச்சேரி மதில்',
          'पुरी श्री जगन्नाथ मंदिराचे कलिंग देउल स्थापत्य आणि मेघनाद पचेरी तटबंदी',
          'ପୁରୀ ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିରର କଳିଙ୍ଗ ରେଖା-ପୀଢ଼ ଦେଉଳ ସ୍ଥାପତ୍ୟ ଓ ମେଘନାଦ ପାଚେରୀ',
          'পুরী শ্রীজগন্নাথ মন্দিরের কলিঙ্গ রেখা-পীঢ় দেউল স্থাপত্য ও মেঘনাদ প্রাচীর'
        ),
        caption: m8(
          'Monumental sacred and defensive stone architecture illustrating traditional Vasthushilpi site geometry, axial alignment, and structural planning.',
          'पारंपरिक वास्तुशिल्पी स्थल-ज्यामिति, अक्षीय संरेखण और संरचनात्मक नियोजन को दर्शाता भव्य मंदिर एवं दुर्ग स्थापत्य।',
          'సాంప్రదాయ వాస్తుశిల్పి స్థల జ్యామితి, దిశానిర్దేశం మరియు నిర్మాణ ప్రణాళికను చాటే ఆలయ మరియు కోట వాస్తుశిల్పం.',
          'ಸಾಂಪ್ರದಾಯಿಕ ವಾಸ್ತುಶಿಲ್ಪಿ ವಿನ್ಯಾಸ, ದಿಕ್ಕಿನ ಜೋಡಣೆ ಮತ್ತು ರಚನಾತ್ಮಕ ಯೋಜನೆಯನ್ನು ತೋರಿಸುವ ಭವ್ಯ ವಾಸ್ತುಶಿಲ್ಪ.',
          'பாரம்பரிய வாஸ்துசில்பி இட வடிவியல் மற்றும் கட்டமைப்புத் திட்டமிடலைக் காட்டும் கோயில் மற்றும் மதில் கட்டிடக்கலை.',
          'पारंपरिक वास्तुशिल्पी भूमिती आणि संरचनात्मक नियोजन दर्शवणारे भव्य मंदिर व तटबंदी स्थापत्य.',
          'ପାରମ୍ପରିକ ବାସ୍ତୁଶିଳ୍ପୀ ଜ୍ୟାମିତି ଓ ସଂରଚନାତ୍ମକ ଯୋଜନା ଦର୍ଶାଉଥିବା ଭବ୍ୟ ମନ୍ଦିର ଓ ପ୍ରାଚୀର ସ୍ଥାପତ୍ୟ।',
          'ঐতিহ্যবাহী বাস্তুশিল্পী জ্যামিতি ও কাঠামোগত পরিকল্পনা প্রদর্শনকারী সুদৃশ্য মন্দির ও প্রাচীর স্থাপত্য।'
        ),
        altText: m8(
          'Puri Jagannatha Temple spires and fortified outer stone wall',
          'पुरी जगन्नाथ मंदिर के शिखर एवं बाहरी पाषाण प्राचीर',
          'పూరీ జగన్నాథ ఆలయ శిఖరాలు మరియు బాహ్య రాతి ప్రాకారం',
          'ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ಶಿಖರಗಳು ಮತ್ತು ಕೋಟೆ ಗೋಡೆ',
          'பூரி ஜெகந்நாதர் கோயில் விமானங்கள் மற்றும் வெளிப்புற கற்கோட்டை மதில்',
          'पुरी जगन्नाथ मंदिराचे शिखर आणि बाह्य दगडी तटबंदी',
          'ପୁରୀ ଶ୍ରୀମନ୍ଦିର ଚୂଡ଼ା ଓ ମେଘନାଦ ପାଚେରୀ',
          'পুরী জগন্নাথ মন্দিরের চূড়া ও মেঘনাদ প্রাচীর'
        ),
        sourceAttribution: 'Archaeological Survey of India (ASI) Monument Documentation — Puri, Odisha',
        licenseInfo: 'Public Domain / Heritage Monument Documentation'
      }
    ],
    relatedArticles: [
      {
        id: 'rel_vs_1',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_03_odra_kshatriya',
        label: m8('Odra-Kshatriya Community Article', 'ओड्र-क्षत्रिय समुदाय लेख', 'ఓడ్ర-క్షత్రియ సమాజ వ్యాసం', 'ಓಡ್ರ-ಕ್ಷತ್ರಿಯ ಸಮುದಾಯ ಲೇಖನ', 'ஒட்ர-க்ஷத்திரிய சமூகக் கட்டுரை', 'ओड्र-क्षत्रिय समाज लेख', 'ଓଡ଼୍ର-କ୍ଷତ୍ରିୟ ସମୁଦାୟ ଲେଖା', 'ওড্র-ক্ষত্রিয় সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_vs_2',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_11_vaddeelu',
        label: m8('Vaddeelu Community Article', 'वड्डीलु समुदाय लेख', 'వడ్డీలు సమాజ వ్యాసం', 'ವಡ್ಡೀಲು ಸಮುದಾಯ ಲೇಖನ', 'வட்டீலு சமூகக் கட்டுரை', 'वड्डीलु समाज लेख', 'ଭଡ୍ଡୀଲୁ ସମୁଦାୟ ଲେଖା', 'ভড্ডীলু সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      }
    ],
    relatedKeywords: ['Vasthushilpi', 'Traditional Architecture', 'Construction', 'Engineering', 'Odra Desha'],
    references: [
      {
        citation: 'Bose, N. K. (1932). Canons of Orissan Architecture (Bhubanapradipa). R. Chatterjee, Calcutta.',
        type: 'Academic Monograph'
      }
    ]
  },
  {
    id: 'prof_cat_6_lokashilpi',
    slug: 'lokashilpi-folk-art-and-community-craft-heritage',
    categoryNumber: 6,
    codeLabel: 'Category 6',
    title: m8(
      'Category 6: Lokashilpi (World builders) — Folk Art and Community Craft Heritage',
      'श्रेणी 6: लोकशिल्पी (विश्व-निर्माता) — लोक कला एवं सामुदायिक शिल्प विरासत',
      'వర్గం 6: లోకశిల్పి (ప్రపంచ నిర్మాతలు) — జానపద కళలు మరియు సామాజిక హస్తకళా వారసత్వం',
      'ವರ್ಗ 6: ಲೋಕಶಿಲ್ಪಿ (ವಿಶ್ವ ನಿರ್ಮಾತೃಗಳು) — ಜಾನಪದ ಕಲೆ ಮತ್ತು ಸಮುದಾಯ ಕರಕುಶಲ ಪರಂಪರೆ',
      'வகை 6: லோகசில்பி (உலகக் கட்டுமானர்கள்) — நாட்டுப்புறக் கலை மற்றும் சமூகக் கைவினைப் பாரம்பரியம்',
      'वर्ग ६: लोकशिल्पी (विश्व-निर्माते) — लोककला आणि सामुदायिक हस्तकला वारसा',
      'ବର୍ଗ ୬: ଲୋକଶିଳ୍ପୀ (ବିଶ୍ୱ ନିର୍ମାତା) — ଲୋକକଳା ଓ ସାମୁଦାୟିକ ଶିଳ୍ପ ଐତିହ୍ୟ',
      'বিভাগ ৬: লোকশিল্পী (বিশ্ব-নির্মাতা) — লোকশিল্প ও সামাজিক কারুশিল্প ঐতিহ্য'
    ),
    shortSummary: m8(
      'Lokashilpi (World builders / Builders of Universe), folk artisans, community crafts, traditional decorative arts, folk architecture, rural industries, and indigenous craft knowledge.',
      'लोकशिल्पी (विश्व-निर्माता / Builders of Universe), लोक कारीगर, सामुदायिक शिल्प, पारंपरिक अलंकरण कला, लोक वास्तुकला, ग्रामीण उद्योग और स्वदेशी शिल्प ज्ञान।',
      'లోకశిల్పి (విశ్వ నిర్మాతలు / Builders of Universe), జానపద కళాకారులు, సామాజిక హస్తకళలు, సాంప్రదాయ అలంకరణ కళలు, గ్రామీణ పరిశ్రమలు మరియు దేశీయ శిల్ప విజ్ఞానం.',
      'ಲೋಕಶಿಲ್ಪಿ (ವಿಶ್ವ ನಿರ್ಮಾತೃಗಳು / Builders of Universe), ಜಾನಪದ ಕುಶಲಕರ್ಮಿಗಳು, ಸಮುದಾಯ ಕಲೆಗಳು, ಗ್ರಾಮೀಣ ಕೈಗಾರಿಕೆಗಳು ಮತ್ತು ದೇಸಿ ಕಲಾ ಜ್ಞಾನ.',
      'லோகசில்பி (உலகக் கட்டுமானர்கள் / Builders of Universe), நாட்டுப்புறக் கலைஞர்கள், சமூகக் கைவினைகள், கிராமப்புறத் தொழில்கள் மற்றும் உள்நாட்டுக் கலை அறிவு.',
      'लोकशिल्पी (विश्व-निर्माते / Builders of Universe), लोक कारागीर, सामुदायिक हस्तकला, पारंपरिक सजावट कला, ग्रामीण उद्योग आणि स्वदेशी कौशल्य.',
      'ଲୋକଶିଳ୍ପୀ (ବିଶ୍ୱ ନିର୍ମାତା / Builders of Universe), ଲୋକ କାରିଗର, ସାମୁଦାୟିକ ଶିଳ୍ପ, ଗ୍ରାମୀଣ ଶିଳ୍ପ ଓ ସ୍ୱଦେଶୀ କଳା ଜ୍ଞାନ।',
      'লোকশিল্পী (বিশ্ব-নির্মাতা / Builders of Universe), লোক কারিগর, সামাজিক কারুশিল্প, গ্রামীণ শিল্প ও দেশীয় কারিগরি জ্ঞান।'
    ),
    includedSubClassifications: [
      {
        id: 'sub_6_1',
        name: m8('Lokashilpi & Builders of Universe', 'लोकशिल्पी एवं विश्व-निर्माता (Builders of Universe)', 'లోకశిల్పి & విశ్వ నిర్మాతలు (Builders of Universe)', 'ಲೋಕಶಿಲ್ಪಿ ಮತ್ತು ವಿಶ್ವ ನಿರ್ಮಾತೃಗಳು (Builders of Universe)', 'லோகசில்பி மற்றும் உலகக் கட்டுமானர்கள் (Builders of Universe)', 'लोकशिल्पी आणि विश्व-निर्माते (Builders of Universe)', 'ଲୋକଶିଳ୍ପୀ ଓ ବିଶ୍ୱ ନିର୍ମାତା (Builders of Universe)', 'লোকশিল্পী ও বিশ্ব-নির্মাতা (Builders of Universe)'),
        description: m8('Creators of the foundational public works—wells, tanks, village चौपालs, and pathways—that sustain everyday human life.', 'कुओं, तालाबों, चौपालों और मार्गों जैसे लोक-कल्याणकारी निर्माणों के सृजनकर्ता।', 'బావులు, చెరువులు, రచ్చబండలు మరియు బాటల వంటి ప్రజాపయోగ నిర్మాణాల సృష్టికర్తలు.', 'ಬಾವಿ, ಕೆರೆ, ಗ್ರಾಮ ಕಟ್ಟೆ ಮತ್ತು ದಾರಿಗಳನ್ನು ನಿರ್ಮಿಸಿದ ಲೋಕಕಲ್ಯಾಣ ಶಿಲ್ಪಿಗಳು.', 'கிணறுகள், ஏரிகள், ஊர் மேடைகள் மற்றும் பாதைகளை உருவாக்கிய மக்கள் கலைஞர்கள்.', 'विहिरी, तलाव, पार आणि रस्ते यांसारखी लोकोपयोगी कामे करणारे शिल्पकार.', 'କୂଅ, ପୋଖରୀ, ଗ୍ରାମ ପିଣ୍ଢା ଓ ରାସ୍ତା ନିର୍ମାଣକାରୀ ଲୋକ-ଶିଳ୍ପୀ।', 'কুয়ো, দিঘি, গ্রামীণ চত্বর ও পথ নির্মাণকারী লোক-স্থপতি।')
      },
      {
        id: 'sub_6_2',
        name: m8('Folk Artisans, Community Crafts & Decorative Arts', 'लोक कारीगर, सामुदायिक शिल्प एवं अलंकरण कला', 'జానపద కళాకారులు, సామాజిక హస్తకళలు & అలంకరణ కళలు', 'ಜಾನಪದ ಕುಶಲಕರ್ಮಿಗಳು, ಸಮುದಾಯ ಕರಕುಶಲ ಮತ್ತು ಅಲಂಕಾರಿಕ ಕಲೆ', 'நாட்டுப்புறக் கலைஞர்கள், சமூகக் கைவினை மற்றும் அலங்காரக் கலைகள்', 'लोक कारागीर, सामुदायिक हस्तकला आणि सजावट कला', 'ଲୋକ କାରିଗର, ସାମୁଦାୟିକ ଶିଳ୍ପ ଓ ଅଳଙ୍କରଣ କଳା', 'লোক কারিগর, সামাজিক কারুশিল্প ও অলঙ্করণ কলা'),
        description: m8('Jhoti/Chita/Muggulu ritual floor designs, terracotta shrines, carved stone Tulsi-vrindavans, and folk theatre (Jasma Odan Bhavai).', 'झोटी/चिता/मुग्गुलु अल्पना, टेराकोटा देव-स्थान, पाषाण तुलसी-वृंदावन और जस्मा ओडन भवई लोकनाट्य।', 'ముగ్గులు/ఝోటి అలంకరణలు, రాతి తులసి కోటలు మరియు జస్మా ఓడన్ జానపద కళారూపాలు.', 'ರಂಗೋಲಿ/ಚಿತಾ ಕಲೆ, ಕಲ್ಲಿನ ತುಳಸಿ ಕಟ್ಟೆಗಳು ಮತ್ತು ಜಸ್ಮಾ ಓಡನ್ ಜಾನಪದ ನಾಟಕ ಪರಂಪರೆ.', 'கோலம்/முக்குலு கலை, கல் துளசி மாடங்கள் மற்றும் ஜஸ்மா ஓடன் நாட்டுப்புறக் கலை.', 'रांगोळी कला, दगडी तुळशी वृंदावन आणि जस्मा ओडण लोकनाट्य परंपरा.', 'ଝୋଟି/ଚିତା କଳା, ପଥର ତୁଳସୀ ଚଉରା ଓ ଲୋକନାଟ୍ୟ ପରମ୍ପରା।', 'ঝোটি/আল্পনা কলা, পাথরের তুলসীমঞ্চ ও জসমা ওডন লোকনাট্য ঐতিহ্য।')
      },
      {
        id: 'sub_6_3',
        name: m8('Folk Architecture, Rural Industries & Indigenous Knowledge', 'लोक वास्तुकला, ग्रामीण उद्योग एवं स्वदेशी ज्ञान', 'జానపద వాస్తుశిల్పం, గ్రామీణ పరిశ్రమలు & దేశీయ విజ్ఞానం', 'ಜಾನಪದ ವಾಸ್ತುಶಿಲ್ಪ, ಗ್ರಾಮೀಣ ಕೈಗಾರಿಕೆ ಮತ್ತು ದೇಸಿ ಜ್ಞಾನ', 'நாட்டுப்புறக் கட்டிடக்கலை, கிராமப்புறத் தொழில்கள் மற்றும் உள்நாட்டு அறிவு', 'लोक वास्तुकला, ग्रामीण उद्योग आणि स्वदेशी ज्ञान', 'ଲୋକ ସ୍ଥାପତ୍ୟ, ଗ୍ରାମୀଣ ଶିଳ୍ପ ଓ ସ୍ୱଦେଶୀ ଜ୍ଞାନ', 'লোক স্থাপত্য, গ্রামীণ শিল্প ও দেশীয় জ্ঞান'),
        description: m8('Lime-kiln burning (Chuna-bhatti), brick/laterite shaping, bamboo-and-stone check dams, and vernacular earth-ramming.', 'चूना-भट्टी निर्माण, लैटेराइट/ईंट तराशना, बांस व पत्थर के चेक-डैम और मिट्टी की कुटाई।', 'సున్నపు బట్టీలు, లేటరైట్ ఇటుకలు, రాతి చెక్-డ్యామ్‌లు మరియు గ్రామీణ గృహ నిర్మాణం.', 'ಸುಣ್ಣದ ಭಟ್ಟಿ, ಜಂಬಿಟ್ಟಿಗೆ ತಯಾರಿಕೆ, ಕಲ್ಲಿನ ಚೆಕ್-ಡ್ಯಾಮ್ ಮತ್ತು ಗ್ರಾಮೀಣ ನಿರ್ಮಾಣ.', 'சுண்ணாம்புக் காளவாய், செம்புராங்கல் செங்கல் மற்றும் தடுப்பணை கட்டுமானம்.', 'चुन्याची भट्टी, जांभा दगड घडण आणि गावठी बंधारे.', 'ଚୂନ ଭାଟି, ମାଙ୍କଡ଼ା ପଥର କटाई ଓ ଗ୍ରାମୀଣ ବନ୍ଧ ନିର୍ମାଣ।', 'চুনের ভাটি, ল্যাটেরাইট ইট কাটা ও গ্রামীণ বাঁধ নির্মাণ।')
      }
    ],
    definitionAndExplanation: m8(
      'Lokashilpi ("Artisans of the People / World Builders") celebrates the vernacular, community-serving engineering and craft traditions that built village commons—stepped drinking-water ponds, boundary stones, roadside resting platforms (Chabutaras/Kattes), stone cattle troughs, and domestic utensils.',
      'लोकशिल्पी ("जन-समाज के शिल्पी / विश्व-निर्माता") उन लोक-कल्याणकारी निर्माण और शिल्प परंपराओं को रेखांकित करता है जिन्होंने गाँव के सार्वजनिक पेयजल तालाबों, सीमा-पत्थरों, विश्राम चबूतरों, पशुओं की पत्थर की नांदों और घरेलू उपकरणों का निर्माण किया।',
      'లోకశిల్పి ("ప్రజా శిల్పులు / విశ్వ నిర్మాతలు") అనేది గ్రామ ప్రజల నిత్య అవసరాలైన మంచినీటి చెరువులు, సరిహద్దు రాళ్లు, రచ్చబండలు, పశువుల రాతి తొట్టెలు మరియు గృహోపకరణాలను నిర్మించిన సామాజిక శిల్ప వారసత్వాన్ని సూచిస్తుంది.',
      'ಲೋಕಶಿಲ್ಪಿ ("ಜನಸಾಮಾನ್ಯರ ಶಿಲ್ಪಿ / ವಿಶ್ವ ನಿರ್ಮಾತೃ") ಎಂಬುದು ಗ್ರಾಮದ ಕುಡಿಯುವ ನೀರಿನ ಕೆರೆಗಳು, ಗಡಿ ಕಲ್ಲುಗಳು, ಅರಳಿ ಕಟ್ಟೆಗಳು ಮತ್ತು ದನಕರುಗಳ ನೀರಿನ ತೊಟ್ಟಿಗಳನ್ನು ನಿರ್ಮಿಸಿದ ಪರಂಪರೆಯನ್ನು ವಿವರಿಸುತ್ತದೆ.',
      'லோகசில்பி ("மக்கள் சிற்பிகள் / உலகக் கட்டுமானர்கள்") என்பது கிராமக் குடிநீர் ஊருணிகள், எல்லைக் கற்கள், ஊர் மேடைகள் மற்றும் கால்நடைத் தொட்டிகளை உருவாக்கிய மக்கள் சார்ந்த கட்டுமான மரபைக் குறிக்கிறது.',
      'लोकशिल्पी ("लोकांचे शिल्पकार / विश्व-निर्माते") ही संकल्पना गावातील पिण्याच्या पाण्याचे तलाव, सीमा दगड, पारावरचे कट्टे आणि गुरांचे दगडी हौद घडवणाऱ्या लोकपरंपरेचा गौरव करते.',
      'ଲୋକଶିଳ୍ପୀ ("ଜନ-ଶିଳ୍ପୀ / ବିଶ୍ୱ ନିର୍ମାତା") ଗ୍ରାମର ପାନୀୟ ଜଳ ପୋଖରୀ, ସୀମା ପଥର, ଗ୍ରାମ ପିଣ୍ଢା ଓ ପଥର କୁଣ୍ଡ ନିର୍ମାଣ କରିଥିବା ଲୋକ-କାରିଗରୀକୁ ବୁଝାଏ।',
      'লোকশিল্পী ("জনগণের শিল্পী / বিশ্ব-নির্মাতা") বলতে গ্রামের পানীয় জলের পুকুর, সীমানা পাথর, বিশ্রাম চত্বর ও গবাদি পশুর পাথরের পাত্র নির্মাণকারী লোক-ঐতিহ্যকে বোঝায়।'
    ),
    historicalBackground: m8(
      'Across Gujarat, Rajasthan, Maharashtra, Karnataka, Andhra Pradesh, and Odisha, itinerant and settled Lokashilpi groups moved from village to village during the dry season, excavating silt from tanks, repairing stone bunds, and carving fresh grinding stones for rural households.',
      'गुजरात, राजस्थान, महाराष्ट्र, कर्नाटक, आंध्र प्रदेश और ओडिशा में लोकशिल्पी समूह ग्रीष्म ऋतु में गाँव-गाँव जाकर तालाबों की गाद निकालते, पत्थर के बांधों की मरम्मत करते और ग्रामीण परिवारों के लिए नई चक्कियाँ व सिल-बट्टे तराशते थे।',
      'గుజరాత్, రాజస్థాన్, మహారాష్ట్ర, కర్ణాటక, ఆంధ్రప్రదేశ్ మరియు ఒడిశాలో లోకశిల్పి బృందాలు వేసవిలో గ్రామాల్లో తిరుగుతూ చెరువుల పూడికతీత, రాతి కట్టల మరమ్మతులు మరియు ఇళ్లకు తిరగళ్లు, రోళ్లు చెక్కే పనులు చేసేవారు.',
      'ಗುಜರಾತ್, ರಾಜಸ್ಥಾನ, ಮಹಾರಾಷ್ಟ್ರ, ಕರ್ನಾಟಕ, ಆಂಧ್ರ ಮತ್ತು ಒಡಿಶಾಗಳಲ್ಲಿ ಲೋಕಶಿಲ್ಪಿ ತಂಡಗಳು ಗ್ರಾಮದಿಂದ ಗ್ರಾಮಕ್ಕೆ ಸಂಚರಿಸಿ ಕೆರೆ ಹೂಳೆತ್ತುವುದು, ಏರಿ ದುರಸ್ತಿ ಮತ್ತು ಬೀಸುವ ಕಲ್ಲುಗಳನ್ನು ಕೆತ್ತಿಕೊಡುವ ಕಾಯಕ ಮಾಡುತ್ತಿದ್ದರು.',
      'குஜராத், ராஜஸ்தான், மகாராஷ்டிரா, கர்நாடகா, ஆந்திரா மற்றும் ஒடிசாவில் லோகசில்பி குழுக்கள் கோடைக் காலங்களில் கிராமந்தோறும் சென்று ஏரிகளைத் தூர்வாரி, கரைகளைப் பழுதுபார்த்து, திரிகை மற்றும் உரல்களைச் செதுக்கிக் கொடுத்தனர்.',
      'गुजरात, राजस्थान, महाराष्ट्र, कर्नाटक, आंध्र आणि ओडिशात लोकशिल्पी समूह उन्हाळ्यात गावोगावी जाऊन तलावातील गाळ काढणे, बंधारे दुरुस्त करणे आणि दगडी जाती व पाटे घडवण्याचे काम करत असत.',
      'ଗୁଜରାଟ, ରାଜସ୍ଥାନ, ମହାରାଷ୍ଟ୍ର, କର୍ଣ୍ଣାଟକ, ଆନ୍ଧ୍ର ଓ ଓଡ଼ିଶାରେ ଲୋକଶିଳ୍ପୀ ଦଳ ଗ୍ରାମে ଗ୍ରାମে ବୁଲି ପୋଖରୀ ଖନନ, ବନ୍ଧ ମରାମତି ଓ ପଥର ଚକି ତିଆରି କରୁଥିଲେ।',
      'গুজরাত, রাজস্থান, মহারাষ্ট্র, কর্ণাটক, অন্ধ্র ও ওড়িশায় লোকশিল্পী দল গ্রামে গ্রামে ঘুরে পুকুর সংস্কার, বাঁধ মেরামত ও পাথরের যাঁতা তৈরি করতেন।'
    ),
    toolsMaterialsAndTechniques: m8(
      'Locally quarried basalt, sandstone, and granite, lime-surkhi mortar, woven bamboo earth-baskets (Gampa / Tokri), and hand-forged iron picks and chisels.',
      'स्थानीय बेसाल्ट, बलुआ पत्थर और ग्रेनाइट, चूना-सुर्खी गारा, बांस की टोकरियाँ (गम्पा / टोकरी) और हाथ से गढ़ी लोहे की कुदाल व छेनी।',
      'స్థానిక గ్రానైట్ మరియు నల్లరాయి, సున్నపు డంగు, వెదురు గంపలు మరియు చేతితో తయారు చేసిన ఇనుప గునపాలు, ఉలులు.',
      'ಸ್ಥಳೀಯ ಗ್ರಾನೈಟ್ ಮತ್ತು ಕಪ್ಪು ಕಲ್ಲು, ಸುಣ್ಣದ ಗಾರೆ, ಬಿದಿರಿನ బుಟ್ಟಿಗಳು (ಗಂಪ) ಮತ್ತು ಕಬ್ಬಿಣದ ಗುದ್ದಲಿ, ಉಳಿಗಳು.',
      'உள்ளூர் கருங்கல், சுண்ணாம்புச் சாந்து, மூங்கில் கூடைகள் மற்றும் இரும்பு கடப்பாறை, உளிகள்.',
      'स्थानिक बेसाल्ट व ग्रॅनाइट दगड, चुना-सुरखी, बांबूच्या टोपल्या आणि लोखंडी टिकाव व छिन्नी.',
      'ସ୍ଥାନୀୟ ପଥର, ଚୂନ-ସୁରଖି, ବାଉଁଶ ଟୋକେଇ ଓ ଲୌହ କୋଡ଼ି-ନିହଣ।',
      'স্থানীয় পাথর, চুন-সুরকি, বাঁশের ঝুড়ি এবং লোহার কোদাল ও ছেনি।'
    ),
    culturalAndRegionalSignificance: m8(
      'Immortalized in Gujarati Bhavai folk theatre (the ballad of Jasma Odan), Telugu and Kannada work-songs (Suvvi / Jajara songs sung while ramming earth or hauling stone), and Solapur Nandi-dhwaja festivals.',
      'गुजराती भवई लोकनाट्य (जस्मा ओडन की गाथा), तेलुगु व कन्नड़ श्रम-गीतों (पत्थर खींचते या मिट्टी कूटते समय गाए जाने वाले सुव्वी/जाजरा गीत) और सोलापुर के नंदी-ध्वज उत्सवों में यह परंपरा अमर है।',
      'గుజరాతీ భవాయి జానపద నాటకాలు (జస్మా ఓడన్ గాథ), తెలుగు-కన్నడ శ్రమ గీతాలు (రాళ్లు లాగేటప్పుడు, మట్టి గట్లు వేసేటప్పుడు పాడే సువ్వి/జాజర పాటలు) మరియు సోలాపూర్ నంది-ధ్వజ ఉత్సవాలలో ఈ సంస్కృతి సజీవంగా ఉంది.',
      'ಗುಜರಾತಿ ಭವಾಯಿ ಜನಪದ ನಾಟಕ (ಜಸ್ಮಾ ಓಡನ್ ಕಥೆ), ಕನ್ನಡ-ತೆಲುಗು ಶ್ರಮಗೀತೆಗಳು (ಸುವ್ವಿ ಪದಗಳು) ಮತ್ತು ಸೊಲ್ಲಾಪುರದ ನಂದಿಧ್ವಜ ಉತ್ಸವಗಳಲ್ಲಿ ಈ ಪರಂಪರೆ ಜೀವಂತವಾಗಿದೆ.',
      'குஜராத்தி பவாய் நாட்டுப்புற நாடகம் (ஜஸ்மா ஓடன் கதை), தெலுங்கு-கன்னட உழைப்புப் பாடல்கள் மற்றும் சோலாப்பூர் நந்தி கொடி விழாக்களில் இம்மரபு போற்றப்படுகிறது.',
      'गुजराती भवई लोकनाट्य (जस्मा ओडण आख्यान), श्रमगीते आणि सोलापूरच्या नंदीध्वज यात्रेत ही लोकसंस्कृती जिवंत आहे.',
      'ଗୁଜରାଟୀ ଭବାଇ ଲୋକନାଟ୍ୟ (ଜସ୍ମା ଓଡ଼ନ୍ ଗାଥା), ଶ୍ରମ-ଗୀତ ଓ ସୋଲାପୁର ନନ୍ଦୀ-ଧ୍ୱଜ ଯାତ୍ରାରେ ଏହି ପରମ୍ପରା ଅମର।',
      'গুজরাটি ভবাই লোকনাট্য (জসমা ওডন গাথা), শ্রম-সংগীত এবং সোলাপুরের নন্দী-ধ্বজ উৎসবে এই ঐতিহ্য অমর হয়ে আছে।'
    ),
    documentedHistoricalExamples: m8(
      '1. Jasma Odan Bhavai Vesha (documented in 19th-century Gujarati folk literature collections).\n2. Traditional village stepwells, cattle troughs, and Hero/Sati memorial stones across Deccan villages.',
      '1. जस्मा ओडन भवई वेश (19वीं सदी के गुजराती लोक-साहित्य संग्रहों में दर्ज)।\n2. दक्कन के गाँवों में पारंपरिक बावड़ियाँ, पशु-जल कुंड और स्मारक शिलाएँ।',
      '1. జస్మా ఓడన్ భవాయి జానపద నాటక సాహిత్యం.\n2. దక్కన్ గ్రామాలలో సాంప్రదాయ మంచినీటి బావులు, పశువుల రాతి తొట్టెలు మరియు స్మారక శిలలు.',
      '1. ಜಸ್ಮಾ ಓಡನ್ ಭವಾಯಿ ಜಾನಪದ ಸಾಹಿತ್ಯ.\n2. ದಖನ್ ಗ್ರಾಮಗಳಲ್ಲಿನ ಸಾಂಪ್ರದಾಯಿಕ ಬಾವಿಗಳು, ಕಲ್ಲಿನ ನೀರಿನ ತೊಟ್ಟಿಗಳು ಮತ್ತು ಸ್ಮಾರಕ ಕಲ್ಲುಗಳು.',
      '1. ஜஸ்மா ஓடன் பவாய் நாட்டுப்புற இலக்கியம்.\n2. தக்காணக் கிராமங்களில் உள்ள படிக்கிணறுகள் மற்றும் கால்நடை கற்தொட்டிகள்.',
      '१. जस्मा ओडण भवई लोकसाहित्य.\n२. दख्खनच्या गावांमधील पारंपरिक बारवा, दगडी हौद आणि स्मारक शिळा.',
      '୧. ଜସ୍ମା ଓଡ଼ନ୍ ଭବାଇ ଲୋକ-ସାହିତ୍ୟ।\n୨. ଗ୍ରାମାଞ୍ଚଳର ପାରମ୍ପରିକ ପାହାଚ କୂଅ ଓ ପଥର କୁଣ୍ଡ।',
      '১. জসমা ওডন ভবাই লোকসাহিত্য।\n২. দাক্ষিণাত্যের গ্রামাঞ্চলের ঐতিহ্যবাহী বাওলি ও পাথরের জলাধার।'
    ),
    contributionsToSociety: m8(
      'Built and maintained the grass-roots rural infrastructure that allowed Indian villages to survive seasonal droughts.',
      'उस जमीनी ग्रामीण बुनियादी ढाँचे का निर्माण और रखरखाव किया जिसने भारतीय गाँवों को मौसमी सूखे में जीवित रखा।',
      'భారతీయ గ్రామాలు కరువు కాటకాలను తట్టుకుని నిలబడేందుకు అవసరమైన గ్రామీణ జల, రహదారి మౌలిక వసతులను నిర్మించారు.',
      'ಭಾರತೀಯ ಗ್ರಾಮಗಳು ಬರಗಾಲವನ್ನು ಎದುರಿಸಿ ನಿಲ್ಲಲು ಬೇಕಾದ ಮೂಲಭೂತ ಕೆರೆ-ಬಾವಿಗಳನ್ನು ನಿರ್ಮಿಸಿ ರಕ್ಷಿಸಿದರು.',
      'இந்தியக் கிராமங்கள் வறட்சியைத் தாங்கி நிற்கத் தேவையான அடிப்படை நீர்நிலை கட்டமைப்புகளை உருவாக்கினர்.',
      'भारतीय गावांना दुष्काळात तग धरून राहण्यासाठी आवश्यक असणारे गावपातळीवरील जलसंधारण उभारले.',
      'ଭାରତୀୟ ଗ୍ରାମଗୁଡ଼ିକୁ ମରୁଡ଼ିରୁ ରକ୍ଷା କରିବା ପାଇଁ ମୂଳ ଜଳ-ସଂରକ୍ଷଣ ଭିତ୍ତିଭୂମି ନିର୍ମାଣ କଲେ।',
      'ভারতীয় গ্রামগুলোকে খরা থেকে রক্ষা করার জন্য তৃণমূল স্তরের জল-সংরক্ষণ পরিকাঠামো গড়ে তুলেছিলেন।'
    ),
    communitySpecificConnectionsAndDistinctions: m8(
      'Both "LokaShilpi" and "Bulders of Universe (Builders of Universe)" are included as dedicated community/heritage categories in this portal, honoring the folk-engineering identity shared across Od, Odan, Vaddera, Voddar, and Oddaru traditions.',
      '"लोकशिल्पी" और "विश्व-निर्माता (Builders of Universe)" दोनों को इस पोर्टल में समर्पित श्रेणियों के रूप में शामिल किया गया है, जो ओड, ओडन, वड्डेरा, वोड्डार और ओड्डारु परंपराओं की साझा लोक-अभियांत्रिकी पहचान का सम्मान करते हैं।',
      '"లోకశిల్పి" మరియు "విశ్వ నిర్మాతలు (Builders of Universe)" అనే రెండు వర్గాలు ఓడ్, ఓడన్, వడ్డెర, వొడ్డార్ మరియు ఒడ్డారు సమాజాల ఉమ్మడి నిర్మాణ వారసత్వానికి ప్రతీకగా ఈ పోర్టల్‌లో చేర్చబడ్డాయి.',
      '"ಲೋಕಶಿಲ್ಪಿ" ಮತ್ತು "ವಿಶ್ವ ನಿರ್ಮಾತೃಗಳು (Builders of Universe)" ಎಂಬ ಎರಡೂ ವರ್ಗಗಳನ್ನು ಓಡ್, ಓಡನ್, ವಡ್ಡೇರ, ವೊಡ್ಡರ್ ಮತ್ತು ಒಡ್ಡಾರು ಪರಂಪರೆಯ ಗೌರವಾರ್ಥವಾಗಿ ಸೇರಿಸಲಾಗಿದೆ.',
      '"லோகசில்பி" மற்றும் "உலகக் கட்டுமானர்கள் (Builders of Universe)" ஆகிய இரு பிரிவுகளும் ஓட், ஓடன், வட்டேரா, வொட்டர் மற்றும் ஒட்டாரு மரபுகளின் அடையாளமாகச் சேர்க்கப்பட்டுள்ளன.',
      '"लोकशिल्पी" आणि "विश्व-निर्माते (Builders of Universe)" या दोन्ही श्रेणी ओड, ओडण, वड्डेरा, वोड्डार आणि ओड्डारु समाजाच्या लोक-अभियांत्रिकी वारशाचा सन्मान करतात.',
      '"ଲୋକଶିଳ୍ପୀ" ଓ "ବିଶ୍ୱ ନିର୍ମାତା (Builders of Universe)" ଉଭୟ ବର୍ଗ ଓଡ଼, ଓଡ଼ନ୍, ଭଡ୍ଡେରା, ଭୋଡ୍ଡାର ଓ ଓଡ୍ଡାରୁ ପରମ୍ପରାର ସମ୍ମାନାର୍ଥେ ଅନ୍ତର୍ଭୁକ୍ତ।',
      '"লোকশিল্পী" ও "বিশ্ব-নির্মাতা (Builders of Universe)" উভয় বিভাগই ওড, ওডন, ভড্ডেরা, ভোড্ডার ও ওড্ডারু ঐতিহ্যের সম্মানে অন্তর্ভুক্ত করা হয়েছে।'
    ),
    epistemicAndMethodologicalNote: m8(
      'Methodological Note: Folk-art and oral ballad traditions are documented as cultural heritage sources alongside colonial ethnographic accounts.',
      'कार्यप्रणाली टिप्पणी: लोक-कला और मौखिक गाथा परंपराओं को नृवंशविज्ञान विवरणों के साथ सांस्कृतिक विरासत स्रोतों के रूप में दर्ज किया गया है।',
      'పరిశోధనా గమనిక: జానపద కళలు మరియు మౌఖిక గాథలను సాంస్కృతిక వారసత్వ ఆధారాలుగా నమోదు చేయడం జరిగింది.',
      'ಸಂಶೋಧನಾ ಸೂಚನೆ: ಜಾನಪದ ಕಲೆ ಮತ್ತು ಮೌಖಿಕ ಲಾವಣಿಗಳನ್ನು ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯ ಆಕರಗಳಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ.',
      'ஆய்வுக் குறிப்பு: நாட்டுப்புறக் கலை மற்றும் வாய்மொழிப் பாடல்கள் கலாச்சாரப் பாரம்பரிய ஆதாரங்களாகப் பதிவு செய்யப்பட்டுள்ளன.',
      'संशोधन टीप: लोककला आणि मौखिक गाथा यांची सांस्कृतिक वारसा स्रोत म्हणून नोंद केली आहे.',
      'ଗବେଷଣା ଟିପ୍ପଣୀ: ଲୋକକଳା ଓ ମୌଖିକ ଗାଥାକୁ ସାଂସ୍କୃତିକ ଐତିହ୍ୟ ଉତ୍ସ ଭାବେ ଦର୍ଶାଯାଇଛି।',
      'পদ্ধতিগত নোট: লোকশিল্প ও মৌখিক গাথাকে সাংস্কৃতিক ঐতিহ্যের উৎস হিসেবে নথিবদ্ধ করা হয়েছে।'
    ),
    visualAssets: [
      {
        id: 'vis_prof_6_jasma_lokashilpi',
        imageUrl: ARCHIVE_IMG('jasma_devi_sahasralinga.jpg'),
        visualType: 'Educational Illustration',
        historicalPeriod: '11th–12th Century CE Solanki Era & Lokashilpi Folk Tradition',
        title: m8(
          'Labeled Illustration: Sahasralinga Talav Reservoir & Virangana Jasma Devi Lokashilpi Heritage',
          'चिह्नित चित्रण: सहस्रलिंग सरोवर निर्माण एवं वीरांगना जसमा देवी लोकशिल्पी परंपरा',
          'విద్యాపరమైన చిత్రణ: సహస్రలింగ తలావ్ జలాశయ నిర్మాణం & వీరాంగన జస్మా దేవి లోకశిల్పి వారసత్వం',
          'ಶೈಕ್ಷಣಿಕ ಚಿತ್ರಣ: ಸಹಸ್ರಲಿಂಗ ತಲಾವ್ ಜಲಾಶಯ ಮತ್ತು ವೀರangana ಜಸ್ಮಾ ದೇವಿ ಲೋಕಶಿಲ್ಪಿ ಪರಂಪರೆ',
          'கல்வி ஓவியம்: சஹஸ்ரலிங்க தலாவ் நீர்த்தேக்கம் மற்றும் ஜஸ்மா தேவி லோகசில்பி மரபு',
          'शैक्षणिक चित्रण: सहस्रलिंग तलाव बांधणी व वीरांगना जसमा देवी लोकशिल्पी वारसा',
          'ଶିକ୍ଷଣୀୟ ଚିତ୍ରଣ: ସହସ୍ରଲିଙ୍ଗ ସରୋବର ନିର୍ମାଣ ଓ ବୀରାଙ୍ଗନା ଜସମା ଦେବୀ ଲୋକଶିଳ୍ପୀ ପରମ୍ପରା',
          'শিক্ষামূলক চিত্রণ: সহস্রলিঙ্গ সরোবর নির্মাণ ও বীরাঙ্গনা জসমা দেবী লোকশিল্পী ঐতিহ্য'
        ),
        caption: m8(
          'Educational historical illustration depicting community water-harvesting works and folk ballads honoring Lokashilpi ("Builders of Universe") traditions.',
          'सामुदायिक जल-संरक्षण कार्यों और लोकशिल्पी ("विश्व-निर्माता") लोक-गाथा परंपराओं को दर्शाने वाला शैक्षणिक ऐतिहासिक चित्रण।',
          'సామాజిక జల-సంరక్షణ నిర్మాణాలను మరియు లోకశిల్పి ("విశ్వ నిర్మాతలు") జానపద గాథలను చూపే విద్యాపరమైన చారిత్రక చిత్రణ.',
          'ಸಮುದಾಯದ ಜಲಸಂಗ್ರಹ ಕಾರ್ಯಗಳು ಮತ್ತು ಲೋಕಶಿಲ್ಪಿ ("ವಿಶ್ವ ನಿರ್ಮಾತೃ") ಜನಪದ ಪರಂಪರೆಯನ್ನು ತೋರಿಸುವ ಶೈಕ್ಷಣಿಕ ಚಿತ್ರಣ.',
          'சமூக நீர்நிலை கட்டுமானப் பணிகள் மற்றும் லோகசில்பி ("உலகக் கட்டுமானர்கள்") நாட்டுப்புற மரபைக் காட்டும் கல்வி ஓவியம்.',
          'सामुदायिक जलसंधारण कार्य आणि लोकशिल्पी ("विश्व-निर्माते") लोकपरंपरा दर्शवणारे शैक्षणिक ऐतिहासिक चित्रण.',
          'ସାମୁଦାୟିକ ଜଳ-ସଂରକ୍ଷଣ ଓ ଲୋକଶିଳ୍ପୀ ("ବିଶ୍ୱ ନିର୍ମାତା") ଲୋକ-ଗାଥା ପରମ୍ପରାର ଶିକ୍ଷଣୀୟ ଚିତ୍ରଣ।',
          'সামাজিক জল-সংরক্ষণ কাজ এবং লোকশিল্পী ("বিশ্ব-নির্মাতা") লোকগাথা ঐতিহ্য প্রদর্শনকারী শিক্ষামূলক চিত্রণ।'
        ),
        altText: m8(
          'Educational historical illustration of Sahasralinga Talav reservoir construction at Patan',
          'पाटन के सहस्रलिंग तालाब निर्माण का शैक्षणिक ऐतिहासिक चित्रण',
          'పటాన్ సహస్రలింగ తలావ్ జలాశయ నిర్మాణ విద్యాపరమైన చిత్రణ',
          'ಪಟಾನ್ ಸಹಸ್ರಲಿಂಗ ತಲಾವ್ ಜಲಾಶಯ ನಿರ್ಮಾಣದ ಶೈಕ್ಷಣಿಕ ಚಿತ್ರಣ',
          'பதான் சஹஸ்ரலிங்க தலாவ் நீர்த்தேக்கக் கட்டுமானக் கல்வி ஓவியம்',
          'पाटणच्या सहस्रलिंग तलाव बांधणीचे शैक्षणिक ऐतिहासिक चित्रण',
          'ପାଟଣର ସହସ୍ରଲିଙ୍ଗ ତଲାବ ନିର୍ମାଣର ଶିକ୍ଷଣୀୟ ଚିତ୍ରଣ',
          'পাটনের সহস্রলিঙ্গ তলাব নির্মাণের শিক্ষামূলক চিত্রণ'
        ),
        sourceAttribution: 'Suryavamsha Archive — Educational Artistic Illustration (Labeled Illustration)',
        licenseInfo: 'Educational & Documentary Illustration'
      }
    ],
    relatedArticles: [
      {
        id: 'rel_lk_1',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_08_odan',
        label: m8('Odan Community Article', 'ओडन समुदाय लेख', 'ఓడన్ సమాజ వ్యాసం', 'ಓಡನ್ ಸಮುದಾಯ ಲೇಖನ', 'ஓடன் சமூகக் கட்டுரை', 'ओडण समाज लेख', 'ଓଡ଼ନ୍ ସମୁଦାୟ ଲେଖା', 'ওডন সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_lk_2',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_16_oddaru',
        label: m8('Oddaru Community Article', 'ओड्डारु समुदाय लेख', 'ఒడ్డారు సమాజ వ్యాసం', 'ಒಡ್ಡಾರು ಸಮುದಾಯ ಲೇಖನ', 'ஒட்டாரு சமூகக் கட்டுரை', 'ओड्डारु समाज लेख', 'ଓଡ୍ଡାରୁ ସମୁଦାୟ ଲେଖା', 'ওড্ডারু সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      }
    ],
    relatedKeywords: ['LokaShilpi', 'Bulders of Universe', 'Odan', 'Vaddera', 'Voddar', 'Construction'],
    references: [
      {
        citation: 'Panchal, G. (1983). Bhavai and Its Typical Arya-Dravidian Dance-Drama Form (Jasma Odan). Sangeet Natak Akademi, New Delhi.',
        type: 'Academic Monograph'
      }
    ]
  },
  {
    id: 'prof_cat_7_vishwashilpi',
    slug: 'vishwashilpi-master-craftsmanship-and-technical-heritage',
    categoryNumber: 7,
    codeLabel: 'Category 7',
    title: m8(
      'Category 7: Vishwashilpi — Master Craftsmanship and Technical Heritage',
      'श्रेणी 7: विश्वशिल्पी — मास्टर शिल्प कौशल एवं तकनीकी विरासत',
      'వర్గం 7: విశ్వశిల్పి — విశిష్ట శిల్ప నైపుణ్యం మరియు సాంకేతిక వారసత్వం',
      'ವರ್ಗ 7: ವಿಶ್ವಶಿಲ್ಪಿ — ಶ್ರೇಷ್ಠ ಶಿಲ್ಪ ಕೌಶಲ್ಯ ಮತ್ತು ತಾಂತ್ರಿಕ ಪರಂಪರೆ',
      'வகை 7: விஷ்வசில்பி — தலைசிறந்த கைவினைத்திறன் மற்றும் தொழில்நுட்பப் பாரம்பரியம்',
      'वर्ग ७: विश्वशिल्पी — उत्कृष्ट शिल्पकौशल्य आणि तांत्रिक वारसा',
      'ବର୍ଗ ୭: ବିଶ୍ୱଶିଳ୍ପୀ — ଉତ୍କୃଷ୍ଟ ଶିଳ୍ପ କୌଶଳ ଓ ଯାନ୍ତ୍ରିକ ଐତିହ୍ୟ',
      'বিভাগ ৭: বিশ্বশিল্পী — মাস্টার কারুশিল্প ও কারিগরি ঐতিহ্য'
    ),
    shortSummary: m8(
      'Vishwashilpi master craftspeople, traditional technical specialists, stone and metal tool tempering, specialized construction techniques, and guild apprenticeship transmission.',
      'विश्वशिल्पी मास्टर शिल्पकार, पारंपरिक तकनीकी विशेषज्ञ, पाषाण व धातु उपकरण निर्माण, विशिष्ट निर्माण तकनीकें और गुरु-शिष्य शिल्प प्रशिक्षण परंपरा।',
      'విశ్వశిల్పి ప్రధాన శిల్పులు, సాంప్రదాయ సాంకేతిక నిపుణులు, రాయి మరియు లోహ పనిముట్ల తయారీ, ప్రత్యేక నిర్మాణ పద్ధతులు మరియు గురు-శిష్య శిక్షణా సంప్రదాయం.',
      'ವಿಶ್ವಶಿಲ್ಪಿ ಮುಖ್ಯ ಕುಶಲಕರ್ಮಿಗಳು, ಸಾಂಪ್ರದಾಯಿಕ ತಾಂತ್ರಿಕ ತಜ್ಞರು, ಕಲ್ಲು ಮತ್ತು ಲೋಹದ ಉಪಕರಣ ತಯಾರಿಕೆ ಹಾಗೂ ಗುರು-ಶಿಷ್ಯ ಕೌಶಲ್ಯ ಪರಂಪರೆ.',
      'விஷ்வசில்பி தலைமைக் கலைஞர்கள், பாரம்பரியத் தொழில்நுட்ப வல்லுநர்கள், கல் மற்றும் உலோகக் கருவி உருவாக்கம் மற்றும் குரு-சிஷ்யப் பயிற்சி மரபு.',
      'विश्वशिल्पी मुख्य कारागीर, पारंपरिक तांत्रिक तज्ज्ञ, दगड व धातूची अवजारे बनवणे आणि गुरु-शिष्य कौशल्य हस्तांतरण परंपरा.',
      'ବିଶ୍ୱଶିଳ୍ପୀ ମୁଖ୍ୟ କାରିଗର, ପାରମ୍ପରିକ ଯାନ୍ତ୍ରିକ ବିଶେଷଜ୍ଞ, ପଥର ଓ ଧାତୁ ଉପକରଣ ନିର୍ମାଣ ଏବଂ ଗୁରୁ-ଶିଷ୍ୟ ପ୍ରଶିକ୍ଷଣ ପରମ୍ପରା।',
      'বিশ্বশিল্পী প্রধান কারিগর, ঐতিহ্যবাহী কারিগরি বিশেষজ্ঞ, পাথর ও ধাতুর সরঞ্জাম তৈরি এবং গুরু-শিষ্য প্রশিক্ষণ পরম্পরা।'
    ),
    includedSubClassifications: [
      {
        id: 'sub_7_1',
        name: m8('Vishwashilpi & Master Craftspeople', 'विश्वशिल्पी एवं मास्टर शिल्पकार', 'విశ్వశిల్పి & ప్రధాన శిల్పకారులు', 'ವಿಶ್ವಶಿಲ್ಪಿ ಮತ್ತು ಮುಖ್ಯ ಕುಶಲಕರ್ಮಿಗಳು', 'விஷ்வசில்பி மற்றும் தலைமைக் கலைஞர்கள்', 'विश्वशिल्पी आणि मुख्य शिल्पकार', 'ବିଶ୍ୱଶିଳ୍ପୀ ଓ ମୁଖ୍ୟ ଶିଳ୍ପୀ', 'বিশ্বশিল্পী ও প্রধান কারিগর'),
        description: m8('Master overseers (Sutradhara / Mestri) directing large-scale stone, dam, and fortress works.', 'बड़े पैमाने के पाषाण, बांध और दुर्ग कार्यों का निर्देशन करने वाले सूत्रधार / मिस्त्री।', 'భారీ రాతి కట్టడాలు, ఆనకట్టలు మరియు కోటల నిర్మాణాన్ని పర్యవేక్షించే సూత్రధారులు / మేస్త్రీలు.', 'ಬೃಹತ್ ಕಲ್ಲಿನ ಕಟ್ಟಡ, ಅಣೆಕಟ್ಟು ಮತ್ತು ಕೋಟೆ ನಿರ್ಮಾಣವನ್ನು ಮುನ್ನಡೆಸುವ ಸೂತ್ರಧಾರರು / ಮೇಸ್ತ್ರಿಗಳು.', 'பெரிய அளவிலான கல், அணை மற்றும் கோட்டைப் பணிகளை வழிநடத்தும் சூத்ரதாரர்கள் / மேஸ்திரிகள்.', 'मोठ्या दगडी वास्तू, धरणे आणि किल्ल्यांच्या कामाचे नेतृत्व करणारे सूत्रधार / मेस्त्री.', 'ବୃହତ୍ ପଥର, ବନ୍ଧ ଓ ଦୁର୍ଗ ନିର୍ମାଣର ମୁଖ୍ୟ ସୂତ୍ରଧର / ମିସ୍ତ୍ରୀ।', 'বৃহৎ পাথর, বাঁধ ও দুর্গ নির্মাণের প্রধান সূত্রধর / মিস্ত্রি।')
      },
      {
        id: 'sub_7_2',
        name: m8('Traditional Technical Specialists & Advanced Craftsmanship', 'पारंपरिक तकनीकी विशेषज्ञ एवं उन्नत शिल्प कौशल', 'సాంప్రదాయ సాంకేతిక నిపుణులు & ఉన్నత శిల్ప నైపుణ్యం', 'ಸಾಂಪ್ರದಾಯಿಕ ತಾಂತ್ರಿಕ ತಜ್ಞರು ಮತ್ತು ಉನ್ನತ ಕೌಶಲ್ಯ', 'பாரம்பரியத் தொழில்நுட்ப வல்லுநர்கள் மற்றும் உயர் கைவினைத்திறன்', 'पारंपरिक तांत्रिक तज्ज्ञ आणि प्रगत शिल्पकौशल्य', 'ପାରମ୍ପରିକ ଯାନ୍ତ୍ରିକ ବିଶେଷଜ୍ଞ ଓ ଉନ୍ନତ ଶିଳ୍ପ କୌଶଳ', 'ঐতিহ্যবাহী কারিগরি বিশেষজ্ঞ ও উন্নত কারুশিল্প'),
        description: m8('Precision stone interlocking, hydraulic sluice engineering, and monolithic pillar erection.', 'सटीक पाषाण इंटरलॉकिंग, जल-द्वार अभियांत्रिकी और एकाश्म स्तंभ स्थापना।', 'రాతి దిమ్మెల అనుసంధానం, సాగునీటి మదుగుల ఇంజనీరింగ్ మరియు ఏకశిలా స్తంభాల స్థాపన.', 'ನಿಖರವಾದ ಕಲ್ಲು ಜೋಡಣೆ, ತೂಬು ಎಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಏಕಶಿಲಾ ಸ್ತಂಭ ಸ್ಥಾಪನೆ.', 'துல்லியமான கல் இணைப்பு, மதகு பொறியியல் மற்றும் ஒற்றைக்கல் தூண் நிறுவுதல்.', 'अचूक दगडी जोडणी, जलद्वार अभियांत्रिकी आणि एकाश्म स्तंभ उभारणी.', 'ସଠିକ୍ ପଥର ଯୋଡ଼େଇ, ଜଳ-ଦ୍ୱାର ଯାନ୍ତ୍ରିକ କୌଶଳ ଓ ଏକାଶ୍ମ ସ୍ତମ୍ଭ ସ୍ଥାପନ।', 'নিখুঁত পাথর সংযোগ, জলকপাট প্রকৌশল ও একশিলা স্তম্ভ স্থাপন।')
      },
      {
        id: 'sub_7_3',
        name: m8('Stone and Metal Craft, Toolmaking & Apprenticeship', 'पाषाण व धातु शिल्प, उपकरण निर्माण एवं प्रशिक्षण परंपरा', 'రాయి-లోహ శిల్పం, పనిముట్ల తయారీ & శిక్షణా సంప్రదాయం', 'ಕಲ್ಲು-ಲೋಹದ ಕಲೆ, ಉಪಕರಣ ತಯಾರಿಕೆ ಮತ್ತು ತರಬೇತಿ ಪರಂಪರೆ', 'கல்-உலோகக் கலை, கருவி உருவாக்கம் மற்றும் பயிற்சி மரபு', 'दगड व धातू कला, अवजारे निर्मिती आणि शिकाऊ परंपरा', 'ପଥର ଓ ଧାତୁ ଶିଳ୍ପ, ଉପକରଣ ନିର୍ମାଣ ଓ ପ୍ରଶିକ୍ଷଣ ପରମ୍ପରା', 'পাথর ও ধাতু শিল্প, সরঞ্জাম তৈরি ও শিক্ষানবিশ পরম্পরা'),
        description: m8('Field-forging and quenching iron wedges and transmitting empirical engineering knowledge across generations.', 'कार्यस्थल पर लोहे की छेनी व सब्बल को तपाना और पीढ़ियों तक व्यावहारिक अभियांत्रिकी ज्ञान का हस्तांतरण।', 'పని ప్రదేశంలోనే ఇనుప ఉలులను కాల్చి పదును పెట్టడం మరియు తరతరాలుగా సాంకేతిక జ్ಞానాన్ని అందించడం.', 'ಕೆಲಸದ ಸ್ಥಳದಲ್ಲೇ ಕಬ್ಬಿಣದ ಉಳಿಗಳನ್ನು ಹದಗೊಳಿಸುವುದು ಮತ್ತು ತಲೆಮಾರುಗಳಿಗೆ ತಾಂತ್ರಿಕ ಜ್ಞಾನ ವರ್ಗಾಯಿಸುವುದು.', 'பணித்தளத்திலேயே இரும்பு உளிகளைப் பதம் பார்த்தல் மற்றும் தலைமுறைதோறும் தொழில்நுட்ப அறிவைக் கடத்துதல்.', 'कामाच्या ठिकाणीच लोखंडी छिन्नी व पहारींना धार लावणे आणि पिढ्यानपिढ्या तांत्रिक ज्ञान देणे.', 'କାର୍ଯ୍ୟସ୍ଥଳରେ ଲୌହ ନିହଣ ପଜାଇବା ଓ ପିଢ଼ି ପରେ ପିଢ଼ି ଯାନ୍ତ୍ରିକ ଜ୍ଞାନ ହସ୍ତାନ୍ତର।', 'কর্মস্থলেই লোহার ছেনি ও শাবল শাণিত করা এবং প্রজন্ম থেকে প্রজন্মে কারিগরি জ্ঞান সঞ্চারণ।')
      }
    ],
    definitionAndExplanation: m8(
      'Vishwashilpi denotes the highest tier of master technical craftsmanship—the chief builders, quarry masters, and hydraulic overseers who coordinated complex structural projects. Historical & Cultural Distinction: This classification describes technical mastery and does not imply that all stone-working, building, or artisan communities across India belonged to a single uniform guild or shared identical caste origins.',
      'विश्वशिल्पी सर्वोच्च स्तर के मास्टर तकनीकी शिल्प कौशल—मुख्य निर्माताओं, खदान प्रमुखों और जल-अभियांत्रिकी निरीक्षकों—को दर्शाता है। ऐतिहासिक एवं सांस्कृतिक स्पष्टीकरण: यह वर्गीकरण तकनीकी दक्षता को दर्शाता है; इसका यह अर्थ नहीं है कि भारत के सभी पाषाण-शिल्पी या निर्माता समुदाय किसी एक ही ऐतिहासिक गिल्ड या एक ही जातिगत मूल के थे।',
      'విశ్వశిల్పి అనేది అత్యున్నత సాంకేతిక శిల్ప నైపుణ్యాన్ని—ప్రధాన నిర్మాణ పర్యవేక్షకులు, రాతి గనుల మాస్టర్లు మరియు జల ఇంజనీరింగ్ సూత్రధారులను—సూచిస్తుంది. చారిత్రక వివరణ: ఇది సాంకేతిక నైపుణ్య వర్గీకరణ మాత్రమే; భారతదేశంలోని అన్ని శిల్ప లేదా నిర్మాణ సమాజాలు ఒకే కులానికి లేదా ఒకే మూలానికి చెందినవని దీని అర్థం కాదు.',
      'ವಿಶ್ವಶಿಲ್ಪಿ ಎಂಬುದು ಉನ್ನತ ಮಟ್ಟದ ತಾಂತ್ರಿಕ ಶಿಲ್ಪ ಕೌಶಲ್ಯ ಮತ್ತು ಮುಖ್ಯ ನಿರ್ಮಾಣ ಮೇಲ್ವಿಚಾರಕರನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಐತಿಹಾಸಿಕ ಸ್ಪಷ್ಟೀಕರಣ: ಇದು ತಾಂತ್ರಿಕ ಪರಿಣತಿಯ ವರ್ಗೀಕರಣವಾಗಿದ್ದು, ಎಲ್ಲಾ ಸಮುದಾಯಗಳು ಒಂದೇ ಸಂಘ ಅಥವಾ ಒಂದೇ ಮೂಲಕ್ಕೆ ಸೇರಿದವು ಎಂದು ಅರ್ಥೈಸಬಾರದು.',
      'விஷ்வசில்பி என்பது உயர்மட்டத் தொழில்நுட்பக் கைவினைத்திறன் மற்றும் தலைமைக் கட்டுமான மேற்பார்வையாளர்களைக் குறிக்கிறது. இது தொழில்நுட்பத் திறனின் வகைப்பாடே தவிர, அனைத்துக் கலைஞர் சமூகங்களும் ஒரே குலம் அல்லது ஒரே தோற்றம் கொண்டவை என்று பொருள்படாது.',
      'विश्वशिल्पी हे सर्वोच्च स्तरावरील तांत्रिक कौशल्य आणि मुख्य बांधकाम सूत्रधारांचे वर्णन करते. हे तांत्रिक कौशल्याचे वर्गीकरण असून सर्व कारागीर समाज एकाच संघाचे किंवा एकाच उगमाचे होते असा याचा अर्थ नाही.',
      'ବିଶ୍ୱଶିଳ୍ପୀ ଉଚ୍ଚତମ ଯାନ୍ତ୍ରିକ ଶିଳ୍ପ କୌଶଳ ଓ ମୁଖ୍ୟ ସୂତ୍ରଧରମାନଙ୍କୁ ବୁଝାଏ। ଏହା ଏକ ଯାନ୍ତ୍ରିକ ବର୍ଗୀକରଣ ମାତ୍ର; ସମସ୍ତ ଶିଳ୍ପୀ ସମୁଦାୟ ଗୋଟିଏ ମାତ୍ର ଉତ୍ପତ୍ତିର ବୋଲି ଏହା ଦାବି କରେ ନାହିଁ।',
      'বিশ্বশিল্পী বলতে সর্বোচ্চ স্তরের কারিগরি দক্ষতা ও প্রধান নির্মাণ সূত্রধরদের বোঝায়। এটি কারিগরি দক্ষতার শ্রেণীবিন্যাস মাত্র; ভারতের সকল কারিগর সম্প্রদায় একই সংঘ বা একই বংশোদ্ভূত—এমনটি বোঝায় না।'
    ),
    historicalBackground: m8(
      'In medieval inscriptions, master builders and quarry overseers received honorific titles and tax-free land assignments (Sarvamanya / Dasavanda) for successfully completing major temple vimanas, stepwells, and irrigation embankments.',
      'मध्यकालीन शिलालेखों में, प्रमुख मंदिर विमानों, बावड़ियों और सिंचाई तटबंधों को सफलतापूर्वक पूरा करने वाले मुख्य निर्माताओं और निरीक्षकों को सम्मानजनक उपाधियाँ और कर-मुक्त भूमि अनुदान (सर्वमान्य / दसबंध) प्रदान किए गए।',
      'మధ్యయుగ శాసనాలలో భారీ ఆలయ విమానాలు, దిగుడు బావులు మరియు చెరువు కట్టలను నిర్మించిన ప్రధాన శిల్పులకు, సూత్రధారులకు గౌరవ బిరుదులు మరియు దశబంధ మాన్యాలు లభించాయి.',
      'ಮಧ್ಯಕಾಲೀನ ಶಾಸನಗಳಲ್ಲಿ ಬೃಹತ್ ದೇವಾಲಯ, ಬಾವಿ ಮತ್ತು ಕೆರೆ ಏರಿಗಳನ್ನು ನಿರ್ಮಿಸಿದ ಮುಖ್ಯ ಶಿಲ್ಪಿಗಳಿಗೆ ಗೌರವ ಬಿರುದುಗಳು ಮತ್ತು ದಶಬಂಧ ಭೂದಾನಗಳನ್ನು ನೀಡಲಾಗಿತ್ತು.',
      'இடைக்காலக் கல்வெட்டுகளில் கோயில் விமானங்கள், படிக்கிணறுகள் மற்றும் ஏரிக்கரைகளைக் கட்டி முடித்த தலைமைக் கலைஞர்களுக்கு மானிய நிலங்கள் (தசபந்தம்) வழங்கப்பட்டன.',
      'मध्ययुगीन शिलालेखांत मोठी मंदिरे, बारवा आणि धरणे पूर्ण करणाऱ्या मुख्य सूत्रधारांना सन्माननीय पदव्या व करमुक्त इनाम जमिनी दिल्याची नोंद आहे.',
      'ମଧ୍ୟଯୁଗୀୟ ଶିଳାଲେଖରେ ବୃହତ୍ ମନ୍ଦିର ଓ ଜଳବନ୍ଧ ନିର୍ମାଣ କରିଥିବା ମୁଖ୍ୟ କାରିଗରମାନଙ୍କୁ କର-ମୁକ୍ତ ଭୂମି ଦାନ ଦିଆଯାଉଥିବାର ପ୍ରମାଣ ମିଳେ।',
      'মধ্যযুগীয় শিলালিপিতে বৃহৎ মন্দির ও জলাশয় নির্মাণকারী প্রধান সূত্রধরদের সম্মানসূচক উপাধি ও নিষ্কর ভূমি দানের উল্লেখ পাওয়া যায়।'
    ),
    toolsMaterialsAndTechniques: m8(
      'Inclined earthen ramps (Charagada) for raising heavy stone capstones, timber rollers, pulley-and-rope tackle, and field metallurgy for tempering rock chisels.',
      'भारी पाषाण शिखर-कलशों को ऊपर चढ़ाने के लिए ढलानदार मिट्टी के रैंप (चरागड़ा), लकड़ी के रोलर, घिरनी-रस्सी तंत्र और छेनी तपाने की धातुकर्म तकनीक।',
      'భారీ శిఖర రాళ్లను పైకి చేర్చే మట్టి ర్యాంపులు (చరగడ), చెక్క రోలర్లు, కప్పీ-తాళ్ల వ్యవస్థ మరియు ఉలులను పదును పెట్టే లోహ సాంకేతికత.',
      'ಬೃಹತ್ ಶಿಖರ ಕಲ್ಲುಗಳನ್ನು ಮೇಲೇರಿಸಲು ಮಣ್ಣಿನ ಇಳಿಜಾರುಗಳು, ಮರದ ರೋಲರ್‌ಗಳು, ರಾಟೆ-ಹಗ್ಗದ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಉಳಿಗಳನ್ನು ಹದಗೊಳಿಸುವ ಲೋಹವಿದ್ಯೆ.',
      'பெருங்கற்களை மேலேற்ற சாய்தள மண் மேடைகள், மர உருளைகள், கப்பி-கயிறு அமைப்பு மற்றும் உளிகளைப் பதம் பார்க்கும் உலோக நுட்பம்.',
      'अवजड शिखर दगड वर चढवण्यासाठी मातीचे उतार, लाकडी रोलर्स, कप्पी-दोरखंड आणि छिन्नी ताव देण्याचे तंत्र.',
      'ଭାରୀ ପଥର ଉଠାଇବା ପାଇଁ ମାଟି ରାମ୍ପ (ଚାରଗଡ଼ା), କାଠ ରୋଲର ଓ ଲୌହ ନିହଣ ପଜାଇବା କୌଶଳ।',
      'ভারী পাথর তোলার জন্য মাটির ঢালু র‍্যাম্প (চারগড়া), কাঠের রোলার, কপিকল এবং ছেনি শাণিত করার ধাতুবিদ্যা।'
    ),
    culturalAndRegionalSignificance: m8(
      'Veneration of Lord Vishwakarma and primordial solar architects alongside ancestral guild masters during annual tool-consecration ceremonies.',
      'वार्षिक उपकरण-पूजन समारोहों के दौरान भगवान विश्वकर्मा और पूर्वज शिल्प-गुरुओं की आराधना।',
      'వార్షిక ఆయుధ/పనిముట్ల పూజ సందర్భంగా విశ్వకర్మ మరియు పూర్వీక శిల్ప గురువుల ఆరాధన.',
      'ವಾರ್ಷಿಕ ಆಯುಧ ಪೂಜೆಯಂದು ವಿಶ್ವಕರ್ಮ ಮತ್ತು ಪೂರ್ವಜ ಶಿಲ್ಪ ಗುರುಗಳ ಸ್ಮರಣೆ.',
      'ஆயுத பூஜையின் போது விஸ்வகர்மா மற்றும் முன்னோடிச் சிற்ப குருக்களை வழிபடுதல்.',
      'वार्षिक अवजार पूजनाच्या वेळी भगवान विश्वकर्मा आणि पूर्वज शिल्पगुरूंचे पूजन.',
      'ବାର୍ଷିକ ଉପକରଣ ପୂଜା ସମୟରେ ବିଶ୍ୱକର୍ମା ଓ ପୂର୍ବପୁରୁଷ ଶିଳ୍ପ-ଗୁରୁଙ୍କ ଆରାଧନା।',
      'বার্ষিক যন্ত্রপূজার সময় বিশ্বকর্মা ও পূর্বপুরুষ শিল্পগুরুদের আরাধনা।'
    ),
    documentedHistoricalExamples: m8(
      '1. Raising of the monolithic crowning stone (Amalaka and Kalasha) of Konark and Puri temples using earthen inclined planes.\n2. Master stone-masonry supervision on Vijayanagara and Deccan fortifications.',
      '1. मिट्टी के ढलानदार रैंपों की सहायता से कोणार्क और पुरी मंदिरों के विशाल एकाश्म आमलक व कलश की स्थापना।\n2. विजयनगर और दक्कन के किलों पर मास्टर पाषाण-चिनाई का पर्यवेक्षण।',
      '1. మట్టి ర్యాంపుల సహాయంతో కోణార్క్ మరియు పూరీ ఆలయాలపై భారీ ఏకశిలా ఆమలక, కలశాల స్థాపన.\n2. విజయనగర మరియు దక్కన్ కోటల నిర్మాణంలో ప్రధాన రాతి కట్టడాల పర్యవేక్షణ.',
      '1. ಮಣ್ಣಿನ ಇಳಿಜಾರುಗಳ ಮೂಲಕ ಕೋನಾರ್ಕ್ ಮತ್ತು ಪುರಿ ದೇವಾಲಯಗಳ ಬೃಹತ್ ಶಿಖರ ಕಲ್ಲುಗಳ ಸ್ಥಾಪನೆ.\n2. ವಿಜಯನಗರ ಮತ್ತು ದಖನ್ ಕೋಟೆಗಳ ಕಲ್ಲಿನ ಕಟ್ಟಡಗಳ ಮೇಲ್ವಿಚಾರಣೆ.',
      '1. மண் சாய்தளங்கள் மூலம் கொனார்க் மற்றும் புரி கோயில்களின் உச்சிக் கற்களை நிலைநிறுத்தியமை.\n2. விஜயநகர மற்றும் தக்காணக் கோட்டைக் கட்டுமான மேற்பார்வை.',
      '१. मातीच्या उतारांच्या साहाय्याने कोणार्क व पुरी मंदिरांवरील महाकाय शिखर कलशांची स्थापना.\n२. विजयनगर आणि दख्खनमधील किल्ल्यांच्या दगडी बांधकामाचे नेतृत्व.',
      '୧. ମାଟି ରାମ୍ପ ସାହାଯ୍ୟରେ କୋଣାର୍କ ଓ ପୁରୀ ମନ୍ଦିରର ବିଶାଳ ଅଁଳାଶ୍ରୀ ଓ କଳସ ସ୍ଥାପନ।\n୨. ବିଜୟନଗର ଓ ଦାକ୍ଷିଣାତ୍ୟ ଦୁର୍ଗ ନିର୍ମାଣର ତତ୍ତ୍ୱାବଧାନ।',
      '১. মাটির ঢালু র‍্যাম্পের সাহায্যে কোণার্ক ও পুরী মন্দিরের বিশাল আমলক ও কলস স্থাপন।\n২. বিজয়নগর ও দাক্ষিণাত্য দুর্গ নির্মাণের প্রধান তত্ত্বাবধান।'
    ),
    contributionsToSociety: m8(
      'Sustained pre-industrial heavy engineering, enabling the transport and elevation of multi-ton stone blocks without modern cranes.',
      'आधुनिक क्रेनों के बिना कई टन भारी पत्थर के ब्लॉकों के परिवहन और उत्थापन को संभव बनाकर पूर्व-औद्योगिक भारी अभियांत्रिकी को कायम रखा।',
      'ఆధునిక క్రేన్లు లేని కాలంలోనే టన్నుల కొద్దీ బరువున్న రాతి దిమ్మెలను తరలించి, ఎత్తైన కట్టడాలపై అమర్చిన పూర్వ-పారిశ్రామిక ఇంజనీరింగ్ ఘనత.',
      'ಆಧುನಿಕ ಕ್ರೇನ್‌ಗಳಿಲ್ಲದ ಕಾಲದಲ್ಲಿಯೇ ಟನ್‌ಗಟ್ಟಲೆ ತೂಕದ ಕಲ್ಲುಗಳನ್ನು ಸಾಗಿಸಿ ಎತ್ತರದ ಕಟ್ಟಡಗಳ ಮೇಲೆ ಸ್ಥಾಪಿಸಿದ ತಾಂತ್ರಿಕ ಸಾಧನೆ.',
      'நவீன இயந்திரங்கள் இல்லாத காலத்திலேயே பல டன் எடையுள்ள கற்களை நகர்த்தி உயரமான கட்டிடங்களில் பொருத்திய பொறியியல் சாதனை.',
      'आधुनिक क्रेन नसतानाही अनेक टन वजनाच्या शिळा वाहून नेऊन उंच वास्तूंवर बसवण्याचे पूर्व-औद्योगिक अभियांत्रिकी कौशल्य.',
      'ଆଧୁନିକ ଯନ୍ତ୍ରପାତି ବିନା ବହୁ ଟନ୍ ଓଜନର ପଥର পরিବହନ ଓ ସ୍ଥାପନ କରିବାର ଯାନ୍ତ୍ରିକ କୌଶଳ।',
      'আধুনিক ক্রেন ছাড়াই বহু টন ওজনের পাথর পরিবহন ও স্থাপনের প্রাক-শিল্প প্রকৌশল কৃতিত্ব।'
    ),
    communitySpecificConnectionsAndDistinctions: m8(
      'Explains the technical heritage of master stone-cutters and project overseers (Mestris) among Od, Waddar, Vaddera, and allied builder communities while distinguishing them from separate endogamous Vishwakarma/Panchala artisan castes.',
      'यह श्रेणी ओड, वडार, वड्डेरा और संबद्ध निर्माता समुदायों के मास्टर पाषाण-तक्षकों व कार्य-निरीक्षकों (मिस्त्रियों) की तकनीकी विरासत को स्पष्ट करती है, साथ ही उन्हें पृथक अंतर्विवाही विश्वकर्मा/पंचाल शिल्पी जातियों से अलग पहचानती है।',
      'ఈ వర్గం ఓడ్, వడ్డార్, వడ్డెర సమాజాలలోని ప్రధాన రాతి శిల్పులు మరియు మేస్త్రీల సాంకేతిక వారసత్వాన్ని వివరిస్తూనే, వారిని ప్రత్యేక విశ్వబ్రాహ్మణ/పంచాల కులాల నుండి స్పష్టంగా వేరు చేసి చూపుతుంది.',
      'ಈ ವರ್ಗವು ಓಡ್, ವಡ್ಡರ್ ಮತ್ತು ವಡ್ಡೇರ ಸಮುದಾಯದ ಮುಖ್ಯ ಕಲ್ಲು ಕುಟಿಗರು ಹಾಗೂ ಮೇಸ್ತ್ರಿಗಳ ತಾಂತ್ರಿಕ ಪರಂಪರೆಯನ್ನು ವಿವರಿಸುತ್ತಾ, ಅವರನ್ನು ಪ್ರತ್ಯೇಕ ವಿಶ್ವಕರ್ಮ/ಪಂಚಾಲ ಜಾತಿಗಳಿಂದ ಭಿನ್ನವಾಗಿ ಗುರುತಿಸುತ್ತದೆ.',
      'இப்பிரிவு ஓட், வட்டார் மற்றும் வட்டேரா சமூகங்களின் தலைமைக் கல் கலைஞர்கள் மற்றும் மேஸ்திரிகளின் தொழில்நுட்ப மரபை விளக்குவதுடன், அவர்களைத் தனிப்பட்ட விஸ்வகர்மா/பஞ்சால சாதிகளிலிருந்து வேறுபடுத்திக் காட்டுகிறது.',
      'हा वर्ग ओड, वडार आणि वड्डेरा समाजातील मुख्य पाषाण कारागीर व मेस्त्रींचा तांत्रिक वारसा स्पष्ट करतो आणि त्यांना स्वतंत्र विश्वकर्मा/पांचाळ जातींपासून वेगळे ओळखतो.',
      'ଏହି ବର୍ଗ ଓଡ଼, ୱଡ୍ଡାର ଓ ଭଡ୍ଡେରା ସମାଜର ମୁଖ୍ୟ ପଥର କାରିଗର ଓ ମିସ୍ତ୍ରୀଙ୍କ ଯାନ୍ତ୍ରିକ ଐତିହ୍ୟକୁ ବର୍ଣ୍ଣନା କରିବା ସହ ସ୍ୱତନ୍ତ୍ର ବିଶ୍ୱକର୍ମା/ପଞ୍ଚାଳ ଜାତିଠାରୁ ପୃଥକ ଭାବେ ଚିହ୍ନଟ କରେ।',
      'এই বিভাগটি ওড, বড্ডার ও ভড্ডেরা সমাজের প্রধান প্রস্তর কারিগর ও মিস্ত্রিদের কারিগরি ঐতিহ্য ব্যাখ্যা করার পাশাপাশি তাঁদের স্বতন্ত্র বিশ্বকর্মা/পঞ্চাল জাতি থেকে পৃথকভাবে চিহ্নিত করে।'
    ),
    epistemicAndMethodologicalNote: m8(
      'Methodological Note: Does not conflate distinct occupational groups into a single historical guild or lineage.',
      'कार्यप्रणाली टिप्पणी: विभिन्न व्यावसायिक समूहों को किसी एक ही ऐतिहासिक गिल्ड या वंश में मिलाया नहीं गया है।',
      'పరిశోధనా గమనిక: విభిన్న వృత్తి సమూహాలను ఒకే చారిత్రక సంఘంగా లేదా ఒకే వంశంగా కలపకుండా స్పష్టత పాటించబడింది.',
      'ಸಂಶೋಧನಾ ಸೂಚನೆ: ವಿಭಿನ್ನ ವೃತ್ತಿ ಸಮುದಾಯಗಳನ್ನು ಒಂದೇ ಐತಿಹಾಸಿಕ ಸಂಘ ಅಥವಾ ವಂಶವೆಂದು ಬೆರೆಸಲಾಗಿಲ್ಲ.',
      'ஆய்வுக் குறிப்பு: வெவ்வேறு தொழில் சமூகங்களை ஒரே வரலாற்றுக் குழுவாகவோ வம்சமாகவோ குழப்பாமல் தெளிவுபடுத்தப்பட்டுள்ளது.',
      'संशोधन टीप: विविध व्यावसायिक गटांना एकाच ऐतिहासिक संघात किंवा वंशात मिसळलेले नाही.',
      'ଗବେଷଣା ଟିପ୍ପଣୀ: ବିଭିନ୍ନ ବୃତ୍ତିଗତ ସମୂହଙ୍କୁ ଗୋଟିଏ ମାତ୍ର ଐତିହାସିକ ସଂଘ ବା ବଂଶରେ ମିଶାଯାଇ ନାହିଁ।',
      'পদ্ধতিগত নোট: বিভিন্ন পেশাগত গোষ্ঠীকে একটি একক ঐতিহাসিক সংঘ বা বংশে একীভূত করা হয়নি।'
    ),
    visualAssets: [
      {
        id: 'vis_prof_7_srirangam_vishwashilpi',
        imageUrl: ARCHIVE_IMG('srirangam_temple.jpg'),
        visualType: 'Architectural Monument',
        historicalPeriod: 'Medieval Chola, Vijayanagara & Nayaka Monolithic Stone Engineering',
        title: m8(
          'Monumental Granite Prakaram Walls & Monolithic Stone Engineering at Srirangam',
          'श्रीरंगम के विशाल ग्रेनाइट प्राचीर एवं एकाश्म पाषाण अभियांत्रिकी — विश्वशिल्पी कौशल',
          'శ్రీరంగం భారీ గ్రానైట్ ప్రాకారాలు & ఏకశిలా రాతి ఇంజనీరింగ్ — విశ్వశిల్పి నైపుణ్యం',
          'ಶ್ರೀರಂಗಂ ಬೃಹತ್ ಗ್ರಾನೈಟ್ ಪ್ರಾಕಾರ ಗೋಡೆಗಳು ಮತ್ತು ಏಕಶಿಲಾ ಎಂಜಿನಿಯರಿಂಗ್ — ವಿಶ್ವಶಿಲ್ಪಿ ಕೌಶಲ್ಯ',
          'ஸ்ரீரங்கம் பிரம்மாண்ட கருங்கல் மதில்கள் மற்றும் ஒற்றைக்கல் பொறியியல் — விஷ்வசில்பி திறன்',
          'श्रीरंगम येथील भव्य ग्रॅनाइट प्राकार आणि एकाश्म पाषाण अभियांत्रिकी — विश्वशिल्पी कौशल्य',
          'ଶ୍ରୀରଙ୍ଗମର ବିଶାଳ ଗ୍ରାନାଇଟ୍ ପ୍ରାଚୀର ଓ ଏକାଶ୍ମ ପ୍ରସ୍ତର ଯାନ୍ତ୍ରିକ କୌଶଳ — ବିଶ୍ୱଶିଳ୍ପୀ ଦକ୍ଷତା',
          'শ্রীরঙ্গমের বিশাল গ্রানাইট প্রাচীর ও একশিলা প্রস্তর প্রকৌশল — বিশ্বশিল্পী দক্ষতা'
        ),
        caption: m8(
          'Exemplifies Vishwashilpi master craftsmanship in heavy stone quarrying, earthen ramp elevation, and interlocking cyclopean masonry.',
          'भारी पाषाण उत्खनन, मिट्टी के रैंप द्वारा उत्थापन और सटीक इंटरलॉकिंग चिनाई में विश्वशिल्पी सूत्रधारों के कौशल का उदाहरण।',
          'భారీ రాతి గనుల తవ్వకం, మట్టి ర్యాంపుల ద్వారా శిలలను అమర్చడం మరియు రాతి కట్టడాలలో విశ్వశిల్పి ప్రధాన శిల్పుల నైపుణ్యానికి ప్రతీక.',
          'ಬೃಹತ್ ಕಲ್ಲು ಗಣಿಗಾರಿಕೆ ಮತ್ತು ಕೋಟೆ-ದೇವಾಲಯ ನಿರ್ಮಾಣದಲ್ಲಿ ವಿಶ್ವಶಿಲ್ಪಿ ಮುಖ್ಯ ಕುಶಲಕರ್ಮಿಗಳ ತಾಂತ್ರಿಕ ಹಿರಿಮೆಗೆ ಸಾಕ್ಷಿ.',
          'பெருங்கல் அகழ்வு மற்றும் கோயில்-கோட்டைக் கட்டுமானத்தில் விஷ்வசில்பி தலைமைக் கலைஞர்களின் தொழில்நுட்பச் சான்று.',
          'अवजड दगड उत्खनन आणि भव्य मंदिर-किल्ले बांधणीतील विश्वशिल्पी मुख्य कारागिरांच्या कौशल्याचा नमुना.',
          'ଭାରୀ ପଥର ଖନନ ଓ ବିଶାଳ ମନ୍ଦିର-ଦୁର୍ଗ ନିର୍ମାଣରେ ବିଶ୍ୱଶିଳ୍ପୀ ମୁଖ୍ୟ କାରିଗରଙ୍କ ଯାନ୍ତ୍ରିକ କୌଶଳର ନିଦର୍ଶନ।',
          'ভারী পাথর উত্তোলন এবং বিশাল মন্দির-দুর্গ নির্মাণে বিশ্বশিল্পী প্রধান কারিগরদের কারিগরি দক্ষতার নিদর্শন।'
        ),
        altText: m8(
          'Monumental granite walls and gopuram towers of Srirangam Temple',
          'श्रीरंगम मंदिर के विशाल ग्रेनाइट प्राचीर और गोपुरम',
          'శ్రీరంగం ఆలయ భారీ గ్రానైట్ గోడలు మరియు గోపురాలు',
          'ಶ್ರೀರಂಗಂ ದೇವಾಲಯದ ಬೃಹತ್ ಗ್ರಾನೈಟ್ ಗೋಡೆಗಳು ಮತ್ತು ಗೋಪುರಗಳು',
          'ஸ்ரீரங்கம் கோயிலின் பிரம்மாண்ட கருங்கல் மதில்கள் மற்றும் கோபுரங்கள்',
          'श्रीरंगम मंदिराची भव्य ग्रॅनाइट तटबंदी आणि गोपुरे',
          'ଶ୍ରୀରଙ୍ଗମ ମନ୍ଦିରର ବିଶାଳ ଗ୍ରାନାଇଟ୍ ପ୍ରାଚୀର ଓ ଗୋପୁରମ୍',
          'শ্রীরঙ্গম মন্দিরের বিশাল গ্রানাইট প্রাচীর ও গোপুরম'
        ),
        sourceAttribution: 'Archival Monument Photograph — Srirangam Temple Complex, Tamil Nadu',
        licenseInfo: 'Public Domain / Heritage Monument Documentation'
      }
    ],
    relatedArticles: [
      {
        id: 'rel_vsh_1',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_10_vaddera',
        label: m8('Vaddera Community Article', 'वड्डेरा समुदाय लेख', 'వడ్డెర సమాజ వ్యాసం', 'ವಡ್ಡೇರ ಸಮುದಾಯ ಲೇಖನ', 'வட்டேரா சமூகக் கட்டுரை', 'वड्डेरा समाज लेख', 'ଭଡ୍ଡେରା ସମୁଦାୟ ଲେଖା', 'ভড্ডেরা সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_vsh_2',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_15_voddar',
        label: m8('Voddar Community Article', 'वोड्डार समुदाय लेख', 'వొడ్డార్ సమాజ వ్యాసం', 'ವೊಡ್ಡರ್ ಸಮುದಾಯ ಲೇಖನ', 'வொட்டர் சமூகக் கட்டுரை', 'वोड्डार समाज लेख', 'ଭୋଡ୍ଡାର ସମୁଦାୟ ଲେଖା', 'ভোড্ডার সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      }
    ],
    relatedKeywords: ['Vishwashilpi', 'Shilpi', 'Engineering', 'Construction', 'Bulders of Universe'],
    references: [
      {
        citation: 'Behera, K. S. (1993). Konarak: The Heritage of Mankind (Vols. I–II). Aryan Books International, New Delhi.',
        type: 'Academic Monograph'
      }
    ]
  },
  {
    id: 'prof_cat_8_royal_heritage',
    slug: 'royal-heritage-royal-and-dynastic-traditions',
    categoryNumber: 8,
    codeLabel: 'Category 8',
    title: m8(
      'Category 8: Royal Heritage — Royal and Dynastic Traditions',
      'श्रेणी 8: राजवंशीय विरासत — राजकीय एवं वंशानुगत परंपराएँ',
      'వర్గం 8: రాజవంశ వారసత్వం — రాజ మరియు వంశపారంపర్య సంప్రదాయాలు',
      'ವರ್ಗ 8: ರಾಜವಂಶ ಪರಂಪರೆ — ರಾಜಕೀಯ ಮತ್ತು ವಂಶಪಾರಂಪರ್ಯ ಸಂಪ್ರದಾಯಗಳು',
      'வகை 8: அரச பாரம்பரியம் — அரச மற்றும் வம்சாவளி மரபுகள்',
      'वर्ग ८: राजवंशीय वारसा — राजकीय आणि घराण्यांच्या परंपरा',
      'ବର୍ଗ ୮: ରାଜବଂଶୀୟ ଐତିହ୍ୟ — ରାଜକୀୟ ଓ ବଂଶାନୁକ୍ରମିକ ପରମ୍ପରା',
      'বিভাগ ৮: রাজবংশীয় ঐতিহ্য — রাজকীয় ও বংশানুক্রমিক পরম্পরা'
    ),
    shortSummary: m8(
      'Documented dynastic lineages (Suryavamsha Gajapathis, Mahameghavahanas, Eastern Gangas), regional rulers, military commanders, court officials, coronation traditions, and methodological distinctions between epigraphic royal lineages and community genealogies.',
      'प्रमाणित राजवंश (सूर्यवंशी गजपति, महामेघवाहन, पूर्वी गंग), क्षेत्रीय शासक, सैन्य कमांडर, राजदरबार अधिकारी, राज्याभिषेक परंपराएँ तथा अभिलेखीय राजवंशों व सामुदायिक वंशावलियों के बीच स्पष्ट ऐतिहासिक अंतर।',
      'శాసన ఆధారిత రాజవంశాలు (సూర్యవంశ గజపతులు, మహామేఘవాహనులు, తూర్పు గంగులు), ప్రాంతీయ పాలకులు, సేనాపతులు, రాజ్య పాలనాధికారులు, పట్టాభిషేక సంప్రదాయాలు మరియు చారిత్రక ఆధారాల విశ్లేషణ.',
      'ದಾಖಲಿತ ರಾಜವಂಶಗಳು (ಸೂರ್ಯವಂಶ ಗಜಪತಿಗಳು, ಮಹಾಮೇಘವಾಹನರು, ಪೂರ್ವ ಗಂಗರು), ಪ್ರಾದೇಶಿಕ ಅರಸರು, ಸೇನಾ ನಾಯಕರು, ರಾಜ್ಯಾಭಿಷೇಕ ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ಶಾಸನಬದ್ಧ ರಾಜವಂಶ ಹಾಗೂ ಸಮುದಾಯ ವಂಶಾವಳಿಗಳ ನಡುವಿನ ಸ್ಪಷ್ಟ ವ್ಯತ್ಯಾಸ.',
      'ஆவணப்படுத்தப்பட்ட அரச வம்சங்கள் (சூர்யவம்ச கஜபதிகள், மகாமேகவாகனர்கள், கீழைக் கங்கர்கள்), பிராந்திய ஆட்சியாளர்கள், படைத்தளபதிகள் மற்றும் கல்வெட்டு அரச வம்சங்களுக்கும் சமூக வம்சாவளிகளுக்கும் இடையிலான வரலாற்று வேறுபாடு.',
      'नोंदवलेली राजघराणी (सूर्यवंशी गजपती, महामेघवाहन, पूर्व गंग), प्रादेशिक शासक, सेनापती, राज्याभिषेक परंपरा आणि शिलालेखीय राजवंश व पारंपरिक वंशावळी यांतील स्पष्ट फरक.',
      'ପ୍ରମାଣିତ ରାଜବଂଶ (ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି, ମହାମେଘବାହନ, ପୂର୍ବ ଗଙ୍ଗ), ଆଞ୍ଚଳିକ ଶାସକ, ସେନାପତି, ରାଜ୍ୟାଭିଷେକ ପରମ୍ପରା ଏବଂ ଶିଳାଲେଖ-ପ୍ରମାଣିତ ରାଜବଂଶ ଓ ସାମୁଦାୟିକ ବଂଶାବଳୀ ମଧ୍ୟରେ ସ୍ପଷ୍ଟ ପାର୍ଥକ୍ୟ।',
      'নথিবদ্ধ রাজবংশ (সূর্যবংশী গজপতি, মহামেঘবাহন, পূর্ব গঙ্গ), আঞ্চলিক শাসক, সেনাপতি, রাজ্যাভিষেক প্রথা এবং শিলালিপি-প্রত্যয়িত রাজবংশ ও সামাজিক বংশলতিকার মধ্যে স্পষ্ট পার্থক্য।'
    ),
    includedSubClassifications: [
      {
        id: 'sub_8_1',
        name: m8('Royal and Dynastic Traditions, Kings & Queens', 'राजवंशीय परंपराएँ, राजा एवं रानियाँ', 'రాజవంశ సంప్రదాయాలు, రాజులు & రాణులు', 'ರಾಜವಂಶ ಸಂಪ್ರದಾಯಗಳು, ರಾಜರು ಮತ್ತು ರಾಣಿಯರು', 'அரச வம்ச மரபுகள், மன்னர்கள் மற்றும் அரசிகள்', 'राजवंशीय परंपरा, राजे आणि राण्या', 'ରାଜବଂଶୀୟ ପରମ୍ପରା, ରାଜା ଓ ରାଣୀ', 'রাজবংশীয় ঐতিহ্য, রাজা ও রানী'),
        description: m8('Monarchs of Kalinga-Odra (Kharavela, Kapilendra Deva, Purushottama Deva, Prataparudra Deva, Queen Padmavati).', 'कलिंग-ओड्र के सम्राट व महारानियाँ (खारवेल, कपिलेन्द्र देव, पुरुषोत्तम देव, प्रतापरुद्र देव, महारानी पद्मावती)।', 'కళింగ-ఓడ్ర చక్రవర్తులు (ఖారవేలుడు, కపిలేంద్ర దేవ, పురుషోత్తమ దేవ, ప్రతాపరుద్ర దేవ, రాణి పద్మావతి).', 'ಕಳಿಂಗ-ಓಡ್ರ ಚಕ್ರವರ್ತಿಗಳು (ಖಾರವೇಲ, ಕಪಿಲೇಂದ್ರ ದೇವ, புರುಷೋತ್ತಮ ದೇವ, ಪ್ರತಾಪರುದ್ರ ದೇವ).', 'கலிங்க-ஒட்ர பேரரசர்கள் (காரவேலன், கபிலேந்திர தேவர், புருஷோத்தம தேவர், பிரதாபருத்ர தேவர்).', 'कलिंग-ओड्रचे सम्राट (खारवेल, कपिलेन्द्र देव, पुरुषोत्तम देव, प्रतापरुद्र देव).', 'କଳିଙ୍ଗ-ଓଡ଼୍ରର ସମ୍ରାଟ (ଖାରବେଳ, କପିଳେନ୍ଦ୍ର ଦେବ, ପୁରୁଷୋତ୍ତମ ଦେବ, ପ୍ରତାପରୁଦ୍ର ଦେବ)।', 'কলিঙ্গ-ওড্রের সম্রাটগণ (খারবেল, কপিলেন্দ্র দেব, পুরুষোত্তম দেব, প্রতাপরুদ্র দেব)।')
      },
      {
        id: 'sub_8_2',
        name: m8('Regional Rulers, Royal Administration & Court Officials', 'क्षेत्रीय शासक, राजकीय प्रशासन एवं दरबारी अधिकारी', 'ప్రాంతీయ పాలకులు, రాజ పాలన & ఆస్థాన అధికారులు', 'ಪ್ರಾದೇಶಿಕ ಆಡಳಿತಗಾರರು, ರಾಜಾಡಳಿತ ಮತ್ತು ಆಸ್ಥಾನಿಕರು', 'பிராந்திய ஆட்சியாளர்கள், அரச நிர்வாகம் மற்றும் அவை அதிகாரிகள்', 'प्रादेशिक शासक, राज्य कारभार आणि दरबारी अधिकारी', 'ଆଞ୍ଚଳିକ ଶାସକ, ରାଜ-ପ୍ରଶାସନ ଓ ଦରବାରୀ ଅଧିକାରୀ', 'আঞ্চলিক শাসক, রাজ-প্রশাসন ও সভাসদ'),
        description: m8('Parikshas (provincial governors), Mahapatras, Patras, Sandhivigrahikas, and Garhjat feudatory chiefs.', 'परीक्षा (प्रांतीय गवर्नर), महापात्र, पात्र, संधिविग्रहिक और गढ़जात सामंत शासक।', 'పరీక్షలు (ప్రాంతీయ గవర్నర్లు), మహాపాత్రులు, సంధివిగ్రహికులు మరియు సామంత రాజులు.', 'ಪರೀಕ್ಷಾ (ಪ್ರಾಂತ್ಯಾಧಿಕಾರಿಗಳು), ಮಹಾಪಾತ್ರರು ಮತ್ತು ಸಾಮಂತ ಅರಸರು.', 'மாகாண ஆளுநர்கள் (பரீக்ஷா), மகாபாத்ரர்கள் மற்றும் சிற்றரசர்கள்.', 'प्रांतीय राज्यपाल (परीक्षा), महापात्र आणि सामंत प्रमुख.', 'ପରୀକ୍ଷା (ପ୍ରାନ୍ତୀୟ ଶାସକ), ମହାପାତ୍ର, ସନ୍ଧିବିଗ୍ରହିକ ଓ ଗଡ଼ଜାତ ସାମନ୍ତ।', 'প্রাদেশিক শাসক (পরীক্ষা), মহাপাত্র, সন্ধিবিগ্রহিক ও গড়জাত সামন্ত।')
      },
      {
        id: 'sub_8_3',
        name: m8('Coronation Traditions & Royal Patronage of Architecture and Art', 'राज्याभिषेक परंपराएँ एवं स्थापत्य-कला का राजकीय संरक्षण', 'పట్టాభిషేక సంప్రదాయాలు & వాస్తు-కళల రాజ పోషణ', 'ರಾಜ್ಯಾಭಿಷೇಕ ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ವಾಸ್ತು-ಕಲಾ ಪೋಷಣೆ', 'முடிசூட்டு மரபுகள் மற்றும் கட்டிடக்கலை-கலைப் புரவலர்கள்', 'राज्याभिषेक परंपरा आणि स्थापत्य-कलेचे राजाश्रय', 'ରାଜ୍ୟାଭିଷେକ ପରମ୍ପରା ଓ ସ୍ଥାପତ୍ୟ-କଳାର ରାଜ-ପୃଷ୍ଠପୋଷକତା', 'রাজ্যাভিষেক প্রথা ও স্থাপত্য-শিল্পের রাজকীয় পৃষ্ঠপোষকতা'),
        description: m8('Abhisheka rituals, Chhera Pahanra service before Lord Jagannatha, and royal endowments to temples and scholars.', 'अभिषेक अनुष्ठान, भगवान जगन्नाथ के समक्ष छेरा पहँरा सेवा, और मंदिरों व विद्वानों को राजकीय अनुदान।', 'పట్టాభిషేక విధులు, జగన్నాథుని రథయాత్రలో ఛేరా పహన్గా సేవ మరియు ఆలయాలకు రాజ దానాలు.', 'ಪಟ್ಟಾಭಿಷೇಕ ವಿಧಿಗಳು, ಜಗನ್ನಾಥನ ಮುಂದೆ ಛೇರಾ ಪಹನ್ರಾ ಸೇವೆ ಮತ್ತು ದೇವಾಲಯಗಳಿಗೆ ರಾಜ ದಾನಗಳು.', 'முடிசூட்டு விழாக்கள், ஜகந்நாதர் முன் சேரா பஹன்ரா சேவை மற்றும் கோயில் திருப்பணிகள்.', 'राज्याभिषेक विधी, जगन्नाथ रथयात्रेतील छेरा पहंरा सेवा आणि मंदिरांना दिलेल्या देणग्या.', 'ରାଜ୍ୟାଭିଷେକ ବିଧି, ଛେରା ପହଁରା ସେବା ଓ ମନ୍ଦିର ନିର୍ମାଣରେ ରାଜ-ଅନୁଦାନ।', 'রাজ্যাভিষেক আচার, রথযাত্রায় ছেরা পহঁরা সেবা এবং মন্দির ও পণ্ডিতদের রাজকীয় অনুদান।')
      }
    ],
    definitionAndExplanation: m8(
      'This category examines the documented royal dynasties of ancient Kalinga and Odra Desha—most notably the Suryavamsha Gajapathi dynasty (1434–1541 CE)—alongside regional chieftaincies and administrative elites. Crucial Methodological Distinction: Documented royal lineages (attested in contemporary copper plates and stone inscriptions) are strictly distinguished from traditional community genealogies (Vamsavalis), oral folk memories of ancestral service under those kings, and later social-mobility claims. Royal ancestry is never inferred merely from a shared community name, surname, or title (such as Raju, Rajulu, Rajput, or Gajapathulu).',
      'यह श्रेणी प्राचीन कलिंग और ओड्र देश के प्रमाणित राजवंशों—विशेष रूप से सूर्यवंशी गजपति राजवंश (1434–1541 ई.)—तथा क्षेत्रीय सामंतों व प्रशासनिक अधिकारियों का अध्ययन करती है। महत्वपूर्ण कार्यप्रणाली अंतर: समकालीन ताम्रपत्रों व शिलालेखों में प्रमाणित राजवंशों को पारंपरिक सामुदायिक वंशावलियों (वंशावली), मौखिक लोक-स्मृतियों और बाद के सामाजिक दावों से स्पष्ट रूप से अलग रखा गया है। केवल समुदाय के नाम, उपनाम या उपाधि (जैसे राजू, राजुलु, राजपूत या गजपतुलु) से स्वतः राजवंशीय वंशानुक्रम का निष्कर्ष नहीं निकाला जाता।',
      'ఈ వర్గం ప్రాచీన కళింగ మరియు ఓడ్ర దేశపు చారిత్రక రాజవంశాలను—ముఖ్యంగా సూర్యవంశ గజపతి సామ్రాజ్యాన్ని (1434–1541 CE)—మరియు ప్రాంతీయ పాలకులను విశ్లేషిస్తుంది. ముఖ్యమైన చారిత్రక విభజన: సమకాలీన తామ్రపత్రాలు మరియు శిలాశాసనాలలో ధృవీకరించబడిన రాజవంశాలను సామాజిక వంశావళులు, మౌఖిక సంప్రదాయాలు మరియు తరువాతి కాలపు వాదనల నుండి స్పష్టంగా వేరుగా చూపడం జరిగింది. కేవలం కులం పేరు, ఇంటిపేరు లేదా బిరుదు (రాజు, రాజులు, రాజ్‌పుత్, గజపతులు) ఆధారంగా రాజవంశ మూలాలను యాంత్రికంగా నిర్ధారించరాదు.',
      'ಈ ವರ್ಗವು ಪ್ರಾಚೀನ ಕಳಿಂಗ ಮತ್ತು ಓಡ್ರ ದೇಶದ ದಾಖಲಿತ ರಾಜವಂಶಗಳನ್ನು (ವಿಶೇಷವಾಗಿ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ 1434–1541 CE) ಪರಿಶೀಲಿಸುತ್ತದೆ. ಪ್ರಮುಖ ವಿಧಾನಿಕ ವ್ಯತ್ಯಾಸ: ಶಾಸನಬದ್ಧ ರಾಜವಂಶಗಳನ್ನು ಸಾಂಪ್ರದಾಯಿಕ ವಂಶಾವಳಿಗಳು ಮತ್ತು ಮೌಖಿಕ ನಂಬಿಕೆಗಳಿಂದ ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆ. ಕೇವಲ ಸಮುದಾಯದ ಹೆಸರು, ಉಪನಾಮ ಅಥವಾ ಬಿರುದಿನಿಂದ (ರಾಜು, ರಾಜುಲು, ರಜಪೂತ್, ಗಜಪತುಲು) ನೇರ ರಾಜವಂಶದ ಮೂಲವನ್ನು ತೀರ್ಮಾನಿಸಲಾಗುವುದಿಲ್ಲ.',
      'இந்த வகைப்பாடு பண்டைய கலிங்க மற்றும் ஒட்ர தேசத்தின் ஆவணப்படுத்தப்பட்ட அரச வம்சங்களை (குறிப்பாக சூர்யவம்ச கஜபதி வம்சம் கி.பி. 1434–1541) ஆராய்கிறது. முக்கிய ஆய்வு வேறுபாடு: கல்வெட்டுகளில் உறுதியான அரச வம்சங்கள், சமூக வம்சாவளிகள் மற்றும் வாய்மொழி மரபுகளிலிருந்து தெளிவாக வேறுபடுத்தப்பட்டுள்ளன. வெறும் பெயர் அல்லது பட்டத்தைக் (ராஜு, ராஜுலு, ராஜ்புத், கஜபதுலு) கொண்டு அரச வம்சத் தோற்றத்தை ஊகிக்கக் கூடாது.',
      'हा वर्ग प्राचीन कलिंग आणि ओड्र देशातील नोंदवलेल्या राजवंशांचा (विशेषतः सूर्यवंशी गजपती साम्राज्य १४३४–१५४१) अभ्यास करतो. महत्त्वाचा फरक: शिलालेख व ताम्रपटांत प्रमाणित असलेली राजघराणी आणि समाजाच्या पारंपरिक वंशावळी व मौखिक आख्यायिका यांत स्पष्ट भेद केला आहे. केवळ समाज नाव, आडनाव किंवा पदवीवरून (राजू, राजुलु, राजपूत, गजपतुलु) थेट राजवंशीय उगम गृहीत धरला जात नाही.',
      'ଏହି ବର୍ଗ ପ୍ରାଚୀନ କଳିଙ୍ଗ ଓ ଓଡ଼୍ର ଦେଶର ପ୍ରମାଣିତ ରାଜବଂଶ (ବିଶେଷକରି ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ବଂଶ ୧୪୩୪–୧୫୪୧) ବିଷୟରେ ଆଲୋଚନା କରେ। ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ପାର୍ଥକ୍ୟ: ଶିଳାଲେଖ-ପ୍ରମାଣିତ ରାଜବଂଶକୁ ପାରମ୍ପରିକ ବଂଶାବଳୀ ଓ ମୌଖିକ ପରମ୍ପରାଠାରୁ ସ୍ପଷ୍ଟ ଭାବେ ପୃଥକ କରାଯାଇଛି। କେବଳ ନାମ ବା ଉପାଧିରୁ ରାଜବଂଶୀୟ ଉତ୍ପତ୍ତି ଅନୁମାନ କରାଯାଏ ନାହିଁ।',
      'এই বিভাগটি প্রাচীন কলিঙ্গ ও ওড্র দেশের নথিবদ্ধ রাজবংশগুলো (বিশেষত সূর্যবংশী গজপতি বংশ ১৪৩৪–১৫৪১ খ্রি.) পর্যালোচনা করে। গুরুত্বপূর্ণ পদ্ধতিগত পার্থক্য: শিলালিপি-প্রত্যয়িত রাজবংশকে ঐতিহ্যবাহী বংশলতিকা ও মৌখিক দাবি থেকে স্পষ্টভাবে পৃথক রাখা হয়েছে। কেবল সম্প্রদায়ের নাম, পদবি বা উপাধি (রাজু, রাজুলু, রাজপুত, গজপতুলু) থেকে রাজকীয় বংশোদ্ভূত হওয়া অনুমান করা হয় না।'
    ),
    historicalBackground: m8(
      'Emperor Kapilendra Deva established the Suryavamsha Gajapathi dynasty at Varanasi Kataka (Cuttack) in 1434 CE, assuming the imperial title "Gajapati Gaudesvara Navakoti Karnata Kalabargesvara". His successors Purushottama Deva and Prataparudra Deva ruled from the Hooghly to the Krishna-Kaveri corridors until 1541 CE, after which collateral branches continued at Paralakhemundi, Vizianagaram, and Khurda-Puri.',
      'सम्राट कपिलेन्द्र देव ने 1434 ई. में वाराणसी कटक (कटक) में सूर्यवंशी गजपति राजवंश की स्थापना की और "गजपति गौड़ेश्वर नवकोटि कर्णाट कलबर्गेश्वर" की उपाधि धारण की। उनके उत्तराधिकारियों पुरुषोत्तम देव और प्रतापरुद्र देव ने 1541 ई. तक शासन किया, जिसके बाद परलाखेमुंडी और खुर्दा-पुरी में संबंधित शाखाएँ जारी रहीं।',
      'కపిలేంద్ర దేవ చక్రవర్తి 1434 CEలో కటక్ రాజధానిగా సూర్యవంశ గజపతి సామ్రాజ్యాన్ని స్థాపించి "గజపతి గౌడేశ్వర నవకోటి కర్ణాట కలబర్గేశ్వర" అనే బిరుదును ధరించారు. పురుషోత్తమ దేవ, ప్రతాపరుద్ర దేవ చక్రవర్తులు 1541 CE వరకు పాలించారు.',
      'ಕಪಿಲೇಂದ್ರ ದೇವ ಚಕ್ರವರ್ತಿಯು 1434 CE ರಲ್ಲಿ ಕಟಕ್ ರಾಜಧಾನಿಯಾಗಿ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಸ್ಥಾಪಿಸಿ "ಗಜಪತಿ ಗೌಡೇಶ್ವರ ನವಕೋಟಿ ಕರ್ಣಾಟ ಕಲಬರ್ಗೇಶ್ವರ" ಎಂಬ ಬಿರುದನ್ನು ಧರಿಸಿದನು.',
      'பேரரசர் கபிலேந்திர தேவர் கி.பி. 1434-ல் கட்டக்கில் சூர்யவம்ச கஜபதி வம்சத்தை நிறுவி "கஜபதி கௌடேஸ்வர நவகோடி கர்நாட கலபர்கேஸ்வர" என்ற பட்டத்தைச் சூட்டிக்கொண்டார்.',
      'सम्राट कपिलेन्द्र देव यांनी १४३४ मध्ये कटक येथे सूर्यवंशी गजपती साम्राज्याची स्थापना केली आणि "गजपती गौडेश्वर नवकोटी कर्णाट कलबर्गेश्वर" ही पदवी धारण केली.',
      'ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ୧୪୩୪ খ୍ରୀଷ୍ଟାବ୍ଦରେ ବାରାଣସୀ କଟକରେ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ବଂଶ ସ୍ଥାପନ କରି "ଗଜପତି ଗୌଡ଼େଶ୍ୱର ନବକୋଟି କର୍ଣ୍ଣାଟ କଲବର୍ଗେଶ୍ୱର" ଉପାଧି ଧାରଣ କରିଥିଲେ।',
      'সম্রাট কপিলেন্দ্র দেব ১৪৩৪ খ্রিস্টাব্দে কটকে সূর্যবংশী গজপতি রাজবংশ প্রতিষ্ঠা করেন এবং "গজপতি গৌড়েশ্বর নবকোটি কর্ণাট কলবর্গেশ্বর" উপাধি গ্রহণ করেন।'
    ),
    toolsMaterialsAndTechniques: m8(
      'Copper-plate royal charters (Tamra-shasana) bearing the royal seal, temple stone edicts (Shila-lipi), palm-leaf court chronicles (Madala Panji), and royal gold coins (Gajapati Pagoda).',
      'राजकीय मुहर युक्त ताम्रपत्र (ताम्र-शासन), मंदिर शिलालेख (शिला-लिपि), ताड़पत्र राज-इतिहास (मादला पंजी) और स्वर्ण मुद्राएँ (गजपति पगोडा)।',
      'రాజ ముద్ర గల తామ్రపత్ర శాసనాలు, ఆలయ శిలాశాసనాలు, తాళపత్ర గ్రంథాలు (మదలా పంజీ) మరియు గజపతి బంగారు నాణేలు.',
      'ರಾಜಮುದ್ರೆಯ ತಾಮ್ರಶಾಸನಗಳು, ದೇವಾಲಯದ ಶಿಲಾಶಾಸನಗಳು, ತಾಳೆಗರಿಯ ಮದಲಾ ಪಂಜಿ ಮತ್ತು ಗಜಪತಿ ಚಿನ್ನದ ನಾಣ್ಯಗಳು.',
      'அரச முத்திரை பொறித்த செப்பேடுகள், கோயில் கல்வெட்டுகள், ஓலைச்சுவடிகள் (மதலா பஞ்சி) மற்றும் கஜபதி தங்க நாணயங்கள்.',
      'राजमुद्रा असलेले ताम्रपट, मंदिर शिलालेख, ताडपत्र ग्रंथ (मादला पंजी) आणि गजपती सुवर्ण नाणी.',
      'ରାଜମୁଦ୍ରା ଯୁକ୍ତ ତାମ୍ରଫଳକ, ଶିଳାଲେଖ, ତାଳପତ୍ର ପୋଥି (ମାଦଳା ପାଞ୍ଜି) ଓ ଗଜପତି ସ୍ୱର୍ଣ୍ଣ ମୁଦ୍ରା।',
      'রাজমুদ্রাযুক্ত তাম্রশাসন, মন্দির শিলালিপি, তালপাতার পুঁথি (মাদলা পঞ্জি) এবং গজপতি স্বর্ণমুদ্রা।'
    ),
    culturalAndRegionalSignificance: m8(
      'Patronage of Sanskrit and regional Odia/Telugu literature (Sarala Dasa’s Mahabharata), temple endowments at Puri, Simhachalam, Srikurmam, and Srirangam, and preservation of Suryavamsha solar emblems.',
      'संस्कृत तथा उड़िया/तेलुगु साहित्य (सारला दास का महाभारत) का संरक्षण, पुरी, सिंहाचलम, श्रीकूर्मम और श्रीरंगम के मंदिरों को अनुदान, और सूर्यवंशी प्रतीकों का संरक्षण।',
      'సంస్కృత, ఒడియా, తెలుగు సాహిత్య పోషణ, పూరీ, సింహాచలం, శ్రీకూర్మం, శ్రీరంగం ఆలయాలకు దానాలు మరియు సూర్యవంశ చిహ్నాల పరిరక్షణ.',
      'ಸಂಸ್ಕೃತ, ಒಡಿಯಾ ಮತ್ತು ತೆಲುಗು ಸಾಹಿತ್ಯ ಪೋಷಣೆ ಹಾಗೂ ಪುರಿ, ಸಿಂಹಾಚಲಂ, ಶ್ರೀರಂಗಂ ದೇವಾಲಯಗಳಿಗೆ ದತ್ತಿ.',
      'சமஸ்கிருத, ஒடிய, தெலுங்கு இலக்கியப் புரவலர் பணி மற்றும் புரி, சிம்மாச்சலம், ஸ்ரீரங்கம் கோயில்களுக்கு மானியங்கள்.',
      'संस्कृत, ओडिया व तेलुगू साहित्याला राजाश्रय आणि पुरी, सिंहाचलम व श्रीरंगम मंदिरांना देणग्या.',
      'ସଂସ୍କୃତ ଓ ଓଡ଼ିଆ ସାହିତ୍ୟର ପୃଷ୍ଠପୋଷକତା (ସାରଳା ଦାସଙ୍କ ମହାଭାରତ) ଏବଂ ପୁରୀ, ସିଂହାଚଳମ ଓ ଶ୍ରୀରଙ୍ଗମ ମନ୍ଦିରକୁ ଦାନ।',
      'সংস্কৃত ও ওড়িয়া সাহিত্যের পৃষ্ঠপোষকতা এবং পুরী, সিংহাচলম ও শ্রীরঙ্গম মন্দিরে রাজকীয় অনুদান।'
    ),
    documentedHistoricalExamples: m8(
      '1. Veligalani Copper Plates of Kapilendra Deva (1458 CE).\n2. Lingaraja and Jagannatha Temple proclamations of Kapilendra and Purushottama Deva.\n3. Srirangam Stone Inscription of Kumara Hamvira Deva (1464 CE).',
      '1. कपिलेन्द्र देव का वेलिगलानी ताम्रपत्र (1458 ई.)।\n2. लिंगराज और जगन्नाथ मंदिर के राजकीय शिलालेख।\n3. कुमार हम्मीर देव का श्रीरंगम शिलालेख (1464 ई.)।',
      '1. కపిలేంద్ర దేవుని వెలిగలని తామ్రపత్ర శాసనం (1458 CE).\n2. లింగరాజ మరియు పూరీ జగన్నాథ ఆలయ శాసనాలు.\n3. కుమార హంవీర దేవుని శ్రీరంగం శాసనం (1464 CE).',
      '1. ಕಪಿಲೇಂದ್ರ ದೇವನ ವೆಲಿಗಲನಿ ತಾಮ್ರಶಾಸನ (1458 CE).\n2. ಲಿಂಗರಾಜ ಮತ್ತು ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ಶಾಸನಗಳು.\n3. ಕುಮಾರ ಹಂವೀರ ದೇವನ ಶ್ರೀರಂಗಂ ಶಾಸನ (1464 CE).',
      '1. கபிலேந்திர தேவரின் வெலிகலனி செப்பேடு (கி.பி. 1458).\n2. லிங்கராஜா மற்றும் புரி ஜகந்நாதர் கோயில் கல்வெட்டுகள்.\n3. குமார ஹம்வீர தேவரின் ஸ்ரீரங்கம் கல்வெட்டு (கி.பி. 1464).',
      '१. कपिलेन्द्र देवांचा वेलिगलानी ताम्रपट (१४५८).\n२. लिंगराज आणि जगन्नाथ मंदिरातील शिलालेख.\n३. कुमार हम्मीर देवांचा श्रीरंगम शिलालेख (१४६४).',
      '୧. କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଭେലിଗଲାନି ତାମ୍ରଫଳକ (୧୪୫୮ খ୍ରୀ.)।\n୨. ଲିଙ୍ଗରାଜ ଓ ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର ଶିଳାଲେଖ।\n୩. କୁମାର ହମ୍ବୀର ଦେବଙ୍କ ଶ୍ରୀରଙ୍ଗମ ଶିଳାଲେଖ (୧୪୬୪ খ୍ରୀ.)।',
      '১. কপিলেন্দ্র দেবের ভেলিগলানি তাম্রশাসন (১৪৫৮ খ্রি.)।\n২. লিঙ্গরাজ ও জগন্নাথ মন্দিরের শিলালিপি।\n৩. কুমার হাম্বীর দেবের শ্রীরঙ্গম শিলালিপি (১৪৬৪ খ্রি.)।'
    ),
    contributionsToSociety: m8(
      'Unified the eastern seaboard politically and culturally, patronized monumental sacred architecture, and codified legal and administrative treatises (such as the Sarasvativilasam attributed to Prataparudra Deva).',
      'पूर्वी तट को राजनीतिक और सांस्कृतिक रूप से एकीकृत किया, भव्य मंदिर स्थापत्य को संरक्षण दिया और प्रतापरुद्र देव के काल में "सरस्वतीविलासम" जैसे विधि व प्रशासन ग्रंथों की रचना करवाई।',
      'తూర్పు తీర ప్రాంతాన్ని రాజకీయంగా, సాంస్కృతికంగా ఏకం చేయడం, ఆలయ నిర్మాణాలను పోషించడం మరియు "సరస్వతీవిలాసం" వంటి న్యాయ గ్రంథాలను రూపొందించడం.',
      'ಪೂರ್ವ ಕರಾವಳಿಯನ್ನು ರಾಜಕೀಯ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕವಾಗಿ ಬೆಸೆದದ್ದು ಹಾಗೂ "ಸರಸ್ವತೀವೀಲಾಸಂ"ನಂತಹ ನ್ಯಾಯ ಗ್ರಂଥಗಳ ರಚನೆ.',
      'கிழக்குக் கடற்கரைப் பகுதிகளை அரசியல் மற்றும் கலாச்சார ரீதியாக ஒன்றிணைத்தமை மற்றும் "சரஸ்வதி விலாசம்" போன்ற நீதி நூல்களை உருவாக்கியமை.',
      'पूर्व किनारपट्टीचे राजकीय व सांस्कृतिक एकत्रीकरण आणि "सरस्वतीविलासम" सारख्या विधी ग्रंथांची निर्मिती.',
      'ପୂର୍ବ ଉପକୂଳର ରାଜନୈତିକ ଓ ସାଂସ୍କୃତିକ ଏକীকରଣ ଏବଂ "ସରସ୍ୱତୀବିଳାସମ୍" ଭଳି ସ୍ମୃତି ଗ୍ରନ୍ଥର ପ୍ରଣୟନ।',
      'পূর্ব উপকূলের রাজনৈতিক ও সাংস্কৃতিক একীকরণ এবং "সরস্বতীবিলাসম"-এর মতো আইন ও প্রশাসন গ্রন্থ প্রণয়ন।'
    ),
    communitySpecificConnectionsAndDistinctions: m8(
      'Communities such as Gajapathulu, KalingaRajulu, Odra-Kshatriya, VaddiRajulu, and VadderaRajulu preserve strong cultural and genealogical traditions connecting their ancestors to military, fort-command, or administrative roles under the Gajapathi and Kalinga polities. Historians distinguish between the documented imperial house of Kapilendra Deva and the broader regional warrior/builder populations who served in its armies and garrisons.',
      'गजपतुलु, कलिंगराजुलु, ओड्र-क्षत्रिय, वड्डीराजुलु और वड्डेराराजुलु जैसे समुदाय मजबूत सांस्कृतिक और वंशावली परंपराएँ रखते हैं जो उनके पूर्वजों को गजपति और कलिंग राज्यों के अधीन सैन्य, दुर्ग-कमान या प्रशासनिक भूमिकाओं से जोड़ती हैं। इतिहासकार कपिलेन्द्र देव के प्रमाणित राजघराने और उनके सैन्य अभियानों व दुर्गों में सेवा देने वाले व्यापक क्षेत्रीय समुदायों के बीच स्पष्ट अंतर रखते हैं।',
      'గజపతులు, కళింగరాజులు, ఓడ్ర-క్షత్రియ, వడ్డిరాజులు మరియు వడ్డెరరాజులు వంటి సమాజాలు తమ పూర్వీకులను గజపతి మరియు కళింగ రాజ్యాల సైనిక, దుర్గ రక్షణ సేవలతో అనుసంధానించే బలమైన సంప్రదాయాలను కలిగి ఉన్నాయి. కపిలేంద్ర దేవుని రాజవంశానికి మరియు ఆ సామ్రాజ్య సైన్యాలలో సేవలందించిన ప్రాంతీయ సమూహాలకు మధ్య చరిత్రకారులు స్పష్టమైన విభజన పాటిస్తారు.',
      'ಗಜಪತುಲು, ಕಳಿಂಗರಾಜುಲು, ಓಡ್ರ-ಕ್ಷತ್ರಿಯ, ವಡ್ಡಿರಾಜುಲು ಮತ್ತು ವಡ್ಡೇರರಾಜುಲು ಸಮುದಾಯಗಳು ಗಜಪತಿ ಮತ್ತು ಕಳಿಂಗ ರಾಜ್ಯಗಳ ಸೇನಾ ಹಾಗೂ ಕೋಟೆ ಸೇವೆಯ ಪರಂಪರೆಯನ್ನು ಸ್ಮರಿಸುತ್ತವೆ. ಶಾಸನಬದ್ಧ ರಾಜಮನೆತನ ಮತ್ತು ಸೈನ್ಯದಲ್ಲಿ ಸೇವೆ ಸಲ್ಲಿಸಿದ ಪ್ರಾದೇಶಿಕ ಸಮುದಾಯಗಳ ನಡುವೆ ಇತಿಹಾಸಕಾರರು ಸ್ಪಷ್ಟ ವ್ಯತ್ಯಾಸವನ್ನು ಗುರುತಿಸುತ್ತಾರೆ.',
      'கஜபதுலு, கலிங்கராஜுலு, ஒட்ர-க்ஷத்திரிய, வட்டிராஜுலு மற்றும் வட்டேரராஜுலு சமூகங்கள் கஜபதி மற்றும் கலிங்க அரசுகளின் படை மற்றும் கோட்டைப் பணிகளுடன் தங்களை இணைக்கும் மரபுகளைக் கொண்டுள்ளன.',
      'गजपतुलु, कलिंगराजुलु, ओड्र-क्षत्रिय, वड्डीराजुलु आणि वड्डेराराजुलु हे समाज आपल्या पूर्वजांचा संबंध गजपती व कलिंग राज्यांतील लष्करी व दुर्ग सेवेशी जोडतात.',
      'ଗଜପତୁଲୁ, କଳିଙ୍ଗରାଜୁଲୁ, ଓଡ଼୍ର-କ୍ଷତ୍ରିୟ, ଭଡ୍ଡିରାଜୁଲୁ ଓ ଭଡ୍ଡେରାରାଜୁଲୁ ସମୁଦାୟ ଗଜପତି ଓ କଳିଙ୍ଗ ସାମ୍ରାଜ୍ୟର ସାମରିକ ଓ ଦୁର୍ଗ ସେବା ସହ ଜଡ଼ିତ ପରମ୍ପରା ବହନ କରନ୍ତି।',
      'গজপতুলু, কলিঙ্গরাজুলু, ওড্র-ক্ষত্রিয়, ভড্ডিরাজুলু ও ভড্ডেরারাজুলু সম্প্রদায় গজপতি ও কলিঙ্গ সাম্রাজ্যের সামরিক ও দুর্গ সেবার ঐতিহ্য বহন করে।'
    ),
    epistemicAndMethodologicalNote: m8(
      'Methodological Note: Explicitly distinguishes documented royal epigraphy from traditional genealogies, oral histories, and later identity claims.',
      'कार्यप्रणाली टिप्पणी: प्रमाणित राजकीय शिलालेखों को पारंपरिक वंशावलियों, मौखिक इतिहास और बाद के पहचान दावों से स्पष्ट रूप से अलग रखा गया है।',
      'పరిశోధనా గమనిక: శాసన ఆధారిత రాజ చరిత్రను సాంప్రదాయ వంశావళులు మరియు మౌఖిక చరిత్రల నుండి స్పష్టంగా వేరుగా చూపడం జరిగింది.',
      'ಸಂಶೋಧನಾ ಸೂಚನೆ: ಶಾಸನಬದ್ಧ ರಾಜ ಇತಿಹಾಸವನ್ನು ಸಾಂಪ್ರದಾಯಿಕ ವಂಶಾವಳಿಗಳು ಮತ್ತು ಮೌಖಿಕ ಇತಿಹಾಸದಿಂದ ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆ.',
      'ஆய்வுக் குறிப்பு: கல்வெட்டு அரச வரலாறு பாரம்பரிய வம்சாவளிகள் மற்றும் வாய்மொழி வரலாற்றிலிருந்து தெளிவாக வேறுபடுத்தப்பட்டுள்ளது.',
      'संशोधन टीप: शिलालेखीय राज-इतिहास आणि पारंपरिक वंशावळी व मौखिक इतिहास यांत स्पष्ट फरक ठेवला आहे.',
      'ଗବେଷଣା ଟିପ୍ପଣୀ: ଶିଳାଲେଖ-ପ୍ରମାଣିତ ରାଜ-ଇତିହାସକୁ ପାରମ୍ପରିକ ବଂଶାବଳୀ ଓ ମୌଖିକ ଇତିହାସଠାରୁ ପୃଥକ ରଖାଯାଇଛି।',
      'পদ্ধতিগত নোট: শিলালিপি-প্রত্যয়িত রাজ-ইতিহাসকে ঐতিহ্যবাহী বংশলতিকা ও মৌখিক ইতিহাস থেকে স্পষ্টভাবে পৃথক রাখা হয়েছে।'
    ),
    visualAssets: [
      {
        id: 'vis_prof_8_gajapathi_map',
        imageUrl: ARCHIVE_IMG('gajapathi_empire_map_1465.jpg'),
        visualType: 'Historical Map (Reconstruction)',
        historicalPeriod: 'Suryavamsha Gajapathi Imperial Zenith (c. 1434–1541 CE)',
        title: m8(
          'Reconstructed Historical Map: Suryavamsha Gajapathi Empire & Epigraphic Corridors (c. 1465 CE)',
          'पुनर्निर्मित ऐतिहासिक मानचित्र: सूर्यवंशी गजपति साम्राज्य एवं अभिलेखीय गलियारे (लगभग 1465 ई.)',
          'పునర్నిర్మించిన చారిత్రక పటం: సూర్యవంశ గజపతి సామ్రాజ్యం & శాసన కారిడార్లు (క్రీ.శ. 1465)',
          'ಪುನರ್ನಿರ್ಮಿತ ಐತಿಹಾಸಿಕ ಭೂಪಟ: ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ಶಾಸನ ಕಾರಿಡಾರ್‌ಗಳು (ಕ್ರಿ.ಶ. 1465)',
          'மீளுருவாக்கப்பட்ட வரலாற்று நிலப்படம்: சூரியவம்ச கஜபதிப் பேரரசு மற்றும் கல்வெட்டு மண்டலங்கள் (கி.பி. 1465)',
          'पुनर्निर्मित ऐतिहासिक नकाशा: सूर्यवंशी गजपती साम्राज्य व शिलालेखीय कॉरिडॉर (इ.स. १४६५)',
          'ପୁନର୍ନିର୍ମିତ ଐତିହାସିକ ମାନଚିତ୍ର: ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ ଓ ଶିଳାଲେଖ କରିଡର (୧୪୬୫ ଖ୍ରୀ.)',
          'পুনর্নির্মিত ঐতিহাসিক মানচিত্র: সূর্যবংশীয় গজপতি সাম্রাজ্য ও শিলালিপি করিডোর (১৪৬৫ খ্রি.)'
        ),
        caption: m8(
          'Reconstructed reference map illustrating the documented territorial extent from the Hooghly river to the Kaveri delta under Emperor Kapilendra Deva (approximate historical zones).',
          'सम्राट कपिलेन्द्र देव के अधीन हुगली नदी से कावेरी डेल्टा तक प्रमाणित विस्तार को दर्शाने वाला पुनर्निर्मित ऐतिहासिक मानचित्र (अनुमानित क्षेत्र)।',
          'కపిలేంద్ర దేవ చక్రవర్తి పాలనలో హుగ్లీ నది నుండి కావేరి డెల్టా వరకు శాసనాలలో నమోదైన విస్తరణను చూపే పునర్నిర్మిత చారిత్రక పటం (అంచనా మండలాలు).',
          'ಕಪಿಲೇಂದ್ರ ದೇವ ಚಕ್ರವರ್ತಿಯ ಕಾಲದಲ್ಲಿ ಹೂಗ್ಲಿಯಿಂದ ಕಾವೇರಿಯವರೆಗಿನ ಶಾಸನಬದ್ಧ ವಿಸ್ತರಣೆಯನ್ನು ತೋರಿಸುವ ಪುನರ್ನಿರ್ಮಿತ ಭೂಪಟ (ಅಂದಾಜು ವಲಯಗಳು).',
          'கபிலேந்திர தேவர் காலத்தில் ஹூக்ளி முதல் காவிரி வரையிலான கல்வெட்டு விரிவாக்கத்தைக் காட்டும் மீளுருவாக்கப்பட்ட நிலப்படம் (தோராயமான மண்டலங்கள்).',
          'सम्राट कपिलेन्द्र देव यांच्या काळात हुगळीपासून कावेरीपर्यंतचा शिलालेखीय विस्तार दर्शवणारा पुनर्निर्मित नकाशा (अंदाजे क्षेत्र).',
          'ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ କାଳରେ ହୁଗୁଳିରୁ କାବେରୀ ପର୍ଯ୍ୟନ୍ତ ଶିଳାଲେଖ-ପ୍ରମାଣିତ ବିସ୍ତାରର ପୁନର୍ନିର୍ମିତ ମାନଚିତ୍ର (ଆନୁମାନିକ ଅଞ୍ଚଳ)।',
          'সম্রাট কপিলেন্দ্র দেবের আমলে হুগলি থেকে কাবেরী পর্যন্ত শিলালিপি-প্রত্যয়িত বিস্তারের পুনর্নির্মিত মানচিত্র (আনুমানিক অঞ্চল)।'
        ),
        altText: m8(
          'Reconstructed historical map of the Suryavamsha Gajapathi Empire c. 1465 CE',
          'सूर्यवंशी गजपति साम्राज्य (लगभग 1465 ई.) का पुनर्निर्मित ऐतिहासिक मानचित्र',
          'సూర్యవంశ గజపతి సామ్రాజ్య (క్రీ.శ. 1465) పునర్నిర్మించిన చారిత్రక పటం',
          'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ (ಕ್ರಿ.ಶ. 1465) ಪುನರ್ನಿರ್ಮಿತ ಐತಿಹಾಸಿಕ ಭೂಪಟ',
          'சூரியவம்ச கஜபதிப் பேரரசின் (கி.பி. 1465) மீளுருவாக்கப்பட்ட வரலாற்று நிலப்படம்',
          'सूर्यवंशी गजपती साम्राज्याचा (इ.स. १४६५) पुनर्निर्मित ऐतिहासिक नकाशा',
          'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ (୧୪୬୫ ଖ୍ରୀ.)ର ପୁନର୍ନିର୍ମିତ ମାନଚିତ୍ର',
          'সূর্যবংশীয় গজপতি সাম্রাজ্যের (১৪৬৫ খ্রি.) পুনর্নির্মিত ঐতিহাসিক মানচিত্র'
        ),
        sourceAttribution: 'Suryavamsha Cartographic Reconstruction based on Subrahmanyam (1957) & ASI Epigraphic Records',
        licenseInfo: 'Educational Historical Cartography (Reconstructed Reference Map)'
      }
    ],
    relatedArticles: [
      {
        id: 'rel_rh_1',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_14_gajapathulu',
        label: m8('Gajapathulu Community Article', 'गजपतुलु समुदाय लेख', 'గజపతులు సమాజ వ్యాసం', 'ಗಜಪತುಲು ಸಮುದಾಯ ಲೇಖನ', 'கஜபதுலு சமூகக் கட்டுரை', 'गजपतुलु समाज लेख', 'ଗଜପତୁଲୁ ସମୁଦାୟ ଲେଖା', 'গজপতুলু সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_rh_2',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_04_kalingarajulu',
        label: m8('KalingaRajulu Community Article', 'कलिंगराजुलु समुदाय लेख', 'కళింగరాజులు సమాజ వ్యాసం', 'ಕಳಿಂಗರಾಜುಲು ಸಮುದಾಯ ಲೇಖನ', 'கலிங்கராஜுலு சமூகக் கட்டுரை', 'कलिंगराजुलु समाज लेख', 'କଳିଙ୍ଗରାଜୁଲୁ ସମୁଦାୟ ଲେଖା', 'কলিঙ্গরাজুলু সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_rh_3',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_12_vaddirajulu',
        label: m8('VaddiRajulu Community Article', 'वड्डीराजुलु समुदाय लेख', 'వడ్డిరాజులు సమాజ వ్యాసం', 'ವಡ್ಡಿರಾಜುಲು ಸಮುದಾಯ ಲೇಖನ', 'வட்டிராஜுலு சமூகக் கட்டுரை', 'वड्डीराजुलु समाज लेख', 'ଭଡ୍ଡିରାଜୁଲୁ ସମୁଦାୟ ଲେଖା', 'ভড্ডিরাজুলু সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      }
    ],
    relatedKeywords: ['Royal Heritage', 'Royal History', 'Gajapathulu', 'KalingaRajulu', 'Odra-Kshatriya', 'VaddiRajulu', 'VadderaRajulu'],
    references: [
      {
        citation: 'Mukherjee, P. (1981). The History of the Gajapati Kings of Orissa and Their Successors. Kitab Mahal, Cuttack.',
        type: 'Academic Monograph'
      }
    ]
  },
  {
    id: 'prof_cat_9_other_professions',
    slug: 'other-traditional-and-contemporary-professions',
    categoryNumber: 9,
    codeLabel: 'Category 9',
    title: m8(
      'Category 9: Other Traditional and Contemporary Professions',
      'श्रेणी 9: अन्य पारंपरिक एवं समकालीन व्यवसाय',
      'వర్గం 9: ఇతర సాంప్రదాయ మరియు సమకాలీన వృత్తులు',
      'ವರ್ಗ 9: ಇತರ ಸಾಂಪ್ರದಾಯಿಕ ಮತ್ತು ಸಮಕಾಲೀನ ವೃತ್ತಿಗಳು',
      'வகை 9: பிற பாரம்பரிய மற்றும் தற்காலத் தொழில்கள்',
      'वर्ग ९: इतर पारंपरिक आणि समकालीन व्यवसाय',
      'ବର୍ଗ ୯: ଅନ୍ୟାନ୍ୟ ପାରମ୍ପରିକ ଓ ସମକାଳୀନ ବୃତ୍ତି',
      'বিভাগ ৯: অন্যান্য ঐতিহ্যবাহী ও সমসাময়িক পেশা'
    ),
    shortSummary: m8(
      'Mining and stone quarrying, transport and material handling, traditional toolmaking, skilled labour, modern civil construction, contemporary engineering, education and research, business, entrepreneurship, and public service.',
      'खनन एवं पाषाण उत्खनन, परिवहन व सामग्री प्रबंधन, पारंपरिक उपकरण निर्माण, कुशल श्रम, आधुनिक निर्माण, समकालीन इंजीनियरिंग, शिक्षा एवं अनुसंधान, व्यवसाय, उद्यमिता और लोक सेवा।',
      'మైనింగ్ మరియు రాతి గనుల తవ్వకం, రవాణా, పనిముట్ల తయారీ, నైపుణ్య శ్రమ, ఆధునిక నిర్మాణ రంగం, సమకాలీన ఇంజనీరింగ్, విద్య మరియు పరిశోధన, వ్యాపారం మరియు ప్రజా సేవ.',
      'ಗಣಿಗಾರಿಕೆ ಮತ್ತು ಕಲ್ಲು ക്വாரி, ಸಾಗಾಟ, ಉಪಕರಣ ತಯಾರಿಕೆ, ಕೌಶಲ್ಯಯುತ ಶ್ರಮ, ಆಧುನಿಕ ನಿರ್ಮಾಣ, ಸಮಕಾಲೀನ ಎಂಜಿನಿಯರಿಂಗ್, ಶಿಕ್ಷಣ ಮತ್ತು ಸಂಶೋಧನೆ, ಉದ್ಯಮ ಹಾಗೂ ಸಾರ್ವಜನಿಕ ಸೇವೆ.',
      'சுரங்கம் மற்றும் கல் குவாரி, போக்குவரத்து, கருவி உருவாக்கம், திறன்மிகு உழைப்பு, நவீனக் கட்டுமானம், சமகாலப் பொறியியல், கல்வி மற்றும் ஆராய்ச்சி, வணிகம் மற்றும் பொதுச் சேவை.',
      'खाणकाम व दगड उत्खनन, वाहतूक, अवजारे निर्मिती, कुशल कामगार, आधुनिक बांधकाम, समकालीन अभियांत्रिकी, शिक्षण व संशोधन, व्यवसाय आणि लोकसेवा.',
      'ଖଣି ଓ ପଥର ଖନନ, ପରିବହନ, ଉପକରଣ ନିର୍ମାଣ, କୁଶଳୀ ଶ୍ରମ, ଆଧୁନିକ ନିର୍ମାଣ, ସମକାଳୀନ ଇଞ୍ଜିନିୟରିଂ, ଶିକ୍ଷା ଓ ଗବେଷଣା, ବ୍ୟବସାୟ ଏବଂ ଜନସେବା।',
      'খনি ও পাথর উত্তোলন, পরিবহন, সরঞ্জাম তৈরি, দক্ষ শ্রম, আধুনিক নির্মাণ, সমসাময়িক প্রকৌশল, শিক্ষা ও গবেষণা, ব্যবসা, উদ্যোক্তা এবং জনসেবা।'
    ),
    includedSubClassifications: [
      {
        id: 'sub_9_1',
        name: m8('Mining, Stone Quarrying, Transport & Material Handling', 'खनन, पाषाण उत्खनन, परिवहन एवं सामग्री प्रबंधन', 'మైనింగ్, రాతి గనులు, రవాణా & మెటీరియల్ హ్యాండ్లింగ్', 'ಗಣಿಗಾರಿಕೆ, ಕಲ್ಲು ಗಣಿ, ಸಾಗಾಟ ಮತ್ತು ಸಾಮಗ್ರಿ ನಿರ್ವಹಣೆ', 'சுரங்கம், கல் குவாரி, போக்குவரத்து மற்றும் பொருள் கையாளுதல்', 'खाणकाम, दगड खाणी, वाहतूक आणि साहित्य व्यवस्थापन', 'ଖଣି, ପଥର ଖନନ, ପରିବହନ ଓ ସାମଗ୍ରୀ ପରିଚାଳନା', 'খনি, পাথর উত্তোলন, পরিবহন ও উপকরণ ব্যবস্থাপনা'),
        description: m8('Granite, slate, and mineral extraction and heavy bullock-cart/pack-bullock logistics.', 'ग्रेनाइट, स्लेट व खनिज उत्खनन तथा बैलगाड़ियों द्वारा भारी सामग्री परिवहन।', 'గ్రానైట్, పలకల గనుల తవ్వకం మరియు రాతి బండ్ల ద్వారా రవాణా.', 'ಗ್ರಾನೈಟ್ ಮತ್ತು ಖನಿಜ ಗಣಿಗಾರಿಕೆ ಹಾಗೂ ಬಂಡಿಗಳ ಮೂಲಕ ಸಾಗಾಟ.', 'கருங்கல் மற்றும் கனிம அகழ்வு மற்றும் வண்டிப் போக்குவரத்து.', 'ग्रॅनाइट व खनिज उत्खनन आणि बैलगाड्यांद्वारे अवजड वाहतूक.', 'ଗ୍ରାନାଇଟ୍ ଓ ଖଣିଜ ଉତ୍ତୋଳନ ଏବଂ ଶଗଡ଼ ଦ୍ୱାରା ପରିବହନ।', 'গ্রানাইট ও খনিজ উত্তোলন এবং গরুর গাড়িতে পরিবহন।')
      },
      {
        id: 'sub_9_2',
        name: m8('Traditional Toolmaking, Skilled Labour & Modern Construction', 'पारंपरिक उपकरण निर्माण, कुशल श्रम एवं आधुनिक निर्माण', 'సాంప్రదాయ పనిముట్ల తయారీ, నైపుణ్య శ్రమ & ఆధునిక నిర్మాణం', 'ಸಾಂಪ್ರದಾಯಿಕ ಉಪಕರಣ ತಯಾರಿಕೆ, ಕೌಶಲ್ಯಯುತ ಶ್ರಮ ಮತ್ತು ಆಧುನಿಕ ನಿರ್ಮಾಣ', 'பாரம்பரியக் கருவி உருவாக்கம், திறன்மிகு உழைப்பு மற்றும் நவீனக் கட்டுமானம்', 'पारंपरिक अवजारे निर्मिती, कुशल श्रम आणि आधुनिक बांधकाम', 'ପାରମ୍ପରିକ ଉପକରଣ ନିର୍ମାଣ, କୁଶଳୀ ଶ୍ରମ ଓ ଆଧୁନିକ ନିର୍ମାଣ', 'ঐতিহ্যবাহী সরঞ্জাম তৈরি, দক্ষ শ্রম ও আধুনিক নির্মাণ'),
        description: m8('Transition from traditional stone-and-earth work to modern highway, dam, metro, and civil infrastructure contracting.', 'पारंपरिक पाषाण व मिट्टी कार्य से आधुनिक राजमार्ग, बांध, मेट्रो और सिविल इंफ्रास्ट्रक्चर ठेकेदारी में संक्रमण।', 'సాంప్రదాయ రాతి పనుల నుండి ఆధునిక జాతీయ రహదారులు, ప్రాజెక్టులు, భవన నిర్మాణ కాంట్రాక్టుల వైపు పురోగతి.', 'ಸಾಂಪ್ರದಾಯಿಕ ಕಲ್ಲಿನ ಕೆಲಸದಿಂದ ಆಧುನಿಕ ಹೆದ್ದಾರಿ, ಅಣೆಕಟ್ಟು ಮತ್ತು ಸಿವಿಲ್ ಗುತ್ತಿಗೆ ಕ್ಷೇತ್ರಕ್ಕೆ ಪ್ರಗತಿ.', 'பாரம்பரியக் கட்டுமானத்திலிருந்து நவீன நெடுஞ்சாலை, அணை மற்றும் கட்டுமான ஒப்பந்தத் துறைக்கு முன்னேற்றம்.', 'पारंपरिक कामातून आधुनिक महामार्ग, धरणे आणि बांधकाम कंत्राटदारीकडे वाटचाल.', 'ପାରମ୍ପରିକ ନିର୍ମାଣରୁ ଆଧୁନିକ ରାଜପଥ, ନଦୀବନ୍ଧ ଓ ସିଭିଲ୍ କଣ୍ଟ୍ରାକ୍ଟିଂ କ୍ଷେତ୍ରକୁ ପ୍ରଗତି।', 'ঐতিহ্যবাহী নির্মাণ থেকে আধুনিক মহাসড়ক, বাঁধ ও সিভিল কন্ট্রাক্টিং ক্ষেত্রে উত্তরণ।')
      },
      {
        id: 'sub_9_3',
        name: m8('Contemporary Engineering, Education, Research, Business & Public Service', 'समकालीन इंजीनियरिंग, शिक्षा, अनुसंधान, व्यवसाय एवं लोक सेवा', 'సమకాలీన ఇంజనీరింగ్, విద్య, పరిశోధన, వ్యాపారం & ప్రజా సేవ', 'ಸಮಕಾಲೀನ ಎಂಜಿನಿಯರಿಂಗ್, ಶಿಕ್ಷಣ, ಸಂಶೋಧನೆ, ಉದ್ಯಮ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಸೇವೆ', 'சமகாலப் பொறியியல், கல்வி, ஆராய்ச்சி, வணிகம் மற்றும் பொதுச் சேவை', 'समकालीन अभियांत्रिकी, शिक्षण, संशोधन, व्यवसाय आणि लोकसेवा', 'ସମକାଳୀନ ଇଞ୍ଜିନିୟରିଂ, ଶିକ୍ଷା, ଗବେଷଣା, ବ୍ୟବସାୟ ଓ ଜନସେବା', 'সমসাময়িক প্রকৌশল, শিক্ষা, গবেষণা, ব্যবসা ও জনসেবা'),
        description: m8('Modern civil/software engineers, university scholars, doctors, civil servants, legislators, and industrial entrepreneurs.', 'आधुनिक सिविल/सॉफ्टवेयर इंजीनियर, विश्वविद्यालय के विद्वान, चिकित्सक, प्रशासनिक अधिकारी, जनप्रतिनिधि और उद्यमी।', 'ఆధునిక సివిల్/సాఫ్ట్‌వేర్ ఇంజనీర్లు, ఆచార్యులు, వైద్యులు, ప్రభుత్వ అధికారులు, ప్రజాప్రతినిధులు మరియు పారిశ్రామికవేత్తలు.', 'ಆಧುನಿಕ ಎಂಜಿನಿಯರ್‌ಗಳು, ಪ್ರಾಧ್ಯಾಪಕರು, ವೈದ್ಯರು, ಆಡಳಿತಾಧಿಕಾರಿಗಳು ಮತ್ತು ಉದ್ಯಮಿಗಳು.', 'நவீனப் பொறியாளர்கள், பேராசிரியர்கள், மருத்துவர்கள், அரசு அதிகாரிகள் மற்றும் தொழில்முனைவோர்.', 'आधुनिक अभियंते, प्राध्यापक, डॉक्टर, प्रशासकीय अधिकारी आणि उद्योजक.', 'ଆଧୁନିକ ଇଞ୍ଜିନିୟର, ପ୍ରାଧ୍ୟାପକ, ଡାକ୍ତର, ପ୍ରଶାସନିକ ଅଧିକାରୀ ଓ ଉଦ୍ୟୋଗୀ।', 'আধুনিক প্রকৌশলী, অধ্যাপক, চিকিৎসক, প্রশাসনিক কর্মকর্তা ও উদ্যোক্তা।')
      }
    ],
    definitionAndExplanation: m8(
      'This category documents both specialized ancillary traditional occupations (mining, quarrying, material transport, salt/lime trade) and the contemporary professional diversification of community members into modern engineering, academia, medicine, entrepreneurship, and public administration.',
      'यह श्रेणी विशिष्ट सहायक पारंपरिक व्यवसायों (खनन, उत्खनन, सामग्री परिवहन) और आधुनिक इंजीनियरिंग, शिक्षा, चिकित्सा, उद्यमिता व लोक प्रशासन में समुदाय के सदस्यों के समकालीन व्यावसायिक विविधीकरण को दर्ज करती है।',
      'ఈ వర్గం సాంప్రదాయ అనుబంధ వృత్తులను (మైనింగ్, రవాణా, సున్నం/ఉప్పు వ్యాపారం) మరియు ఆధునిక యుగంలో ఇంజనీరింగ్, విద్య, వైద్యం, వ్యాపారం, ప్రభుత్వ సేవలలో సమాజ సభ్యులు సాధించిన ప్రగతిని వివరిస్తుంది.',
      'ಈ ವರ್ಗವು ಸಾಂಪ್ರದಾಯಿಕ ಪೂರಕ ವೃತ್ತಿಗಳು (ಗಣಿಗಾರಿಕೆ, ಸಾಗಾಟ) ಮತ್ತು ಆಧುನಿಕ ಯುಗದಲ್ಲಿ ಎಂಜಿನಿಯರಿಂಗ್, ಶಿಕ್ಷಣ, ವೈದ್ಯಕೀಯ, ಉದ್ಯಮ ಹಾಗೂ ಸಾರ್ವಜನಿಕ ಸೇವೆಯಲ್ಲಿ ಸಮುದಾಯದ ಪ್ರಗತಿಯನ್ನು ದಾಖಲಿಸುತ್ತದೆ.',
      'இந்த வகைப்பாடு பாரம்பரியத் துணைத் தொழில்களையும் (குவாரி, போக்குவரத்து), நவீன காலத்தில் பொறியியல், கல்வி, மருத்துவம், வணிகம் மற்றும் அரசுப் பணிகளில் சமூகத்தினர் அடைந்துள்ள முன்னேற்றத்தையும் பதிவு செய்கிறது.',
      'हा वर्ग पारंपरिक पूरक व्यवसाय (खाणकाम, वाहतूक) आणि आधुनिक काळातील अभियांत्रिकी, शिक्षण, वैद्यकीय, उद्योग व प्रशासकीय सेवेतील प्रगतीची नोंद करतो.',
      'ଏହି ବର୍ଗ ପାରମ୍ପରିକ ଆନୁଷଙ୍ଗିକ ବୃତ୍ତି (ଖଣି, ପରିବହନ) ଏବଂ ଆଧୁନିକ ଇଞ୍ଜିନିୟରିଂ, ଶିକ୍ଷା, ଚିକିତ୍ସା, ବ୍ୟବସାୟ ଓ ପ୍ରଶାସନିକ ସେବାରେ ସମାଜର ପ୍ରଗତିକୁ ଦର୍ଶାଏ।',
      'এই বিভাগটি ঐতিহ্যবাহী আনুষঙ্গিক পেশা (খনি, পরিবহন) এবং আধুনিক প্রকৌশল, শিক্ষা, চিকিৎসা, ব্যবসা ও জন প্রশাসনে সম্প্রদায়ের সদস্যদের অগ্রগতি নথিবদ্ধ করে।'
    ),
    historicalBackground: m8(
      'From the late 19th century through post-independence Five-Year Plans, members of these communities played a major role in building modern dams (Hirakud, Nagarjuna Sagar, Tungabhadra, Bhakra), national highways, and railways, while succeeding generations entered higher education, civil services, and global technology sectors.',
      '19वीं सदी के उत्तरार्ध से लेकर स्वतंत्रता के बाद की पंचवर्षीय योजनाओं तक, इन समुदायों ने आधुनिक बांधों (हीराकुद, नागार्जुन सागर, तुंगभद्रा, भाखड़ा), राष्ट्रीय राजमार्गों और रेलवे के निर्माण में बड़ी भूमिका निभाई, जबकि नई पीढ़ियों ने उच्च शिक्षा, प्रशासनिक सेवा और वैश्विक प्रौद्योगिकी क्षेत्रों में कदम रखा।',
      '19వ శతాబ్దం చివరి నుండి స్వాతంత్ర్యానంతర పంచవర్ష ప్రణాళికల వరకు హీరాకుడ్, నాగార్జున సాగర్, తుంగభద్ర, భాక్రా వంటి ఆధునిక ఆనకట్టలు, రహదారుల నిర్మాణంలో ఈ సమాజాలు కీలక పాత్ర పోషించగా, నేటి తరం ఉన్నత విద్య, సివిల్ సర్వీసెస్ మరియు ఐటీ రంగాలలో రాణిస్తోంది.',
      'ಸ್ವಾತಂತ್ರ್ಯೋತ್ತರ ಭಾರತದಲ್ಲಿ ಹಿರಾಕುಡ್, ನಾಗಾರ್ಜುನ ಸಾಗರ, ತುಂಗಭದ್ರಾ ಜಲಾಶಯಗಳು ಮತ್ತು ಹೆದ್ದಾರಿಗಳ ನಿರ್ಮಾಣದಲ್ಲಿ ಪ್ರಮುಖ ಪಾತ್ರ ವಹಿಸಿದ ಈ ಸಮುದಾಯದ ಹೊಸ ಪೀಳಿಗೆಯು ಇಂದು ಉನ್ನತ ಶಿಕ್ಷಣ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ ಕ್ಷೇತ್ರಗಳಲ್ಲಿ ಮುನ್ನಡೆಯುತ್ತಿದೆ.',
      'சுதந்திரத்திற்குப் பிந்தைய இந்தியாவில் ஹிராகுட், நாகார்ஜுன சாகர், துங்கபத்ரா அணைகள் மற்றும் நெடுஞ்சாலைகள் அமைப்பதில் முக்கியப் பங்காற்றிய இச்சமூகங்களின் இளைய தலைமுறையினர் இன்று உயர்கல்வி மற்றும் தொழில்நுட்பத் துறைகளில் சிறந்து விளங்குகின்றனர்.',
      'स्वातंत्र्योत्तर काळात हिराकुड, नागार्जुन सागर, तुंगभद्रा यांसारखी धरणे व महामार्ग उभारण्यात मोलाचा वाटा उचलणाऱ्या या समाजाची नवीन पिढी आज उच्च शिक्षण व तंत्रज्ञान क्षेत्रात अग्रेसर आहे.',
      'ସ୍ୱାଧୀନତା ପରବର୍ତ୍ତୀ କାଳରେ ହୀରାକୁଦ, ନାଗାର୍ଜୁନ ସାଗର, ତୁଙ୍ଗଭଦ୍ରା ନଦୀବନ୍ଧ ନିର୍ମାଣରେ ପ୍ରಮುଖ ଭୂମିକା ନେବା ସହ ଆଜିର ପିଢ଼ି ଉଚ୍ଚଶିକ୍ଷା ଓ ପ୍ରଶାସନିକ କ୍ଷେତ୍ରରେ ଅଗ୍ରসর ହେଉଛନ୍ତି।',
      'স্বাধীনতা-পরবর্তী ভারতে হীরাকুঁদ, নাগার্জুন সাগর, তুঙ্গভদ্রা বাঁধ নির্মাণে গুরুত্বপূর্ণ ভূমিকার পাশাপাশি বর্তমান প্রজন্ম উচ্চশিক্ষা, প্রশাসন ও প্রযুক্তি ক্ষেত্রে অগ্রসর হয়েছে।'
    ),
    toolsMaterialsAndTechniques: m8(
      'Transition from manual iron crowbars, wedges, and bullock carts to modern mechanized earthmovers, geotechnical surveying, CAD structural modeling, and academic research methodologies.',
      'पारंपरिक लोहे के सब्बल, छेनी और बैलगाड़ियों से आधुनिक यांत्रिक अर्थमूवर्स, भू-तकनीकी सर्वेक्षण, सीएडी (CAD) मॉडलिंग और अकादमिक अनुसंधान पद्धतियों तक का विकास।',
      'సాంప్రదాయ గడ్డపారలు, ఉలుల నుండి ఆధునిక యంత్రాలు, జియో-టెక్నికల్ సర్వేయింగ్, క్యాడ్ (CAD) డిజైనింగ్ మరియు పరిశోధనా పద్ధతుల వరకు సాగిన పురోగతి.',
      'ಸಾಂಪ್ರದಾಯಿಕ ಹಾರೆ-ಉಳಿಗಳಿಂದ ಆಧುನಿಕ ಯಂತ್ರೋಪಕರಣಗಳು, ಜಿಯೋ-ಟೆಕ್ನಿಕಲ್ ಸರ್ವೇ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಸಂಶೋಧನಾ ವಿಧಾನಗಳವರೆಗಿನ ಬೆಳವಣಿಗೆ.',
      'பாரம்பரியக் கடப்பாறை மற்றும் உளிகளிலிருந்து நவீன இயந்திரங்கள், புவிசார் ஆய்வு மற்றும் கணினி வடிவமைப்பு வரையிலான வளர்ச்சி.',
      'पारंपरिक पहारी व छिन्नीपासून आधुनिक यंत्रसामग्री, भू-सर्वेक्षण आणि अभियांत्रिकी संशोधनापर्यंतचा प्रवास.',
      'ପାରମ୍ପରିକ ଶାବଳ ଓ ନିହଣରୁ ଆଧୁନିକ ଯନ୍ତ୍ରପାତି, ଭୂ-ସର୍ବେକ୍ଷଣ ଓ ଗବେଷଣା ପଦ୍ଧତି ପର୍ଯ୍ୟନ୍ତ ବିକାଶ।',
      'ঐতিহ্যবাহী শাবল ও ছেনি থেকে আধুনিক যন্ত্রপাতি, ভূ-জরিপ ও গবেষণা পদ্ধতিতে উত্তরণ।'
    ),
    culturalAndRegionalSignificance: m8(
      'Community welfare associations, educational hostels, scholarship trusts, and historical heritage portals actively promote literacy, archival preservation, and social empowerment.',
      'सामुदायिक कल्याण संघ, शैक्षिक छात्रावास, छात्रवृत्ति ट्रस्ट और ऐतिहासिक विरासत पोर्टल सक्रिय रूप से साक्षरता, अभिलेखीय संरक्षण और सामाजिक सशक्तिकरण को बढ़ावा दे रहे हैं।',
      'సామాజిక సేవా సంఘాలు, విద్యా వసతి గృహాలు, స్కాలర్‌షిప్ ట్రస్టులు మరియు చారిత్రక పరిశోధనా వేదికలు విద్యా వ్యాప్తికి, వారసత్వ పరిరక్షణకు కృషి చేస్తున్నాయి.',
      'ಸಮುದಾಯದ ಸಂಘ-ಸಂಸ್ಥೆಗಳು, ವಿದ್ಯಾರ್ಥಿ ನಿಲಯಗಳು ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಟ್ರಸ್ಟ್‌ಗಳು ಶಿಕ್ಷಣ ಹಾಗೂ ಪರಂಪರೆಯ ಉಳಿವಿಗೆ ಶ್ರಮಿಸುತ್ತಿವೆ.',
      'சமூக நலச் சங்கங்கள், கல்வி விடுதிகள் மற்றும் அறக்கட்டளைகள் கல்வி வளர்ச்சிக்கும் வரலாற்றுப் பாதுகாப்புக்கும் துணைபுரிகின்றன.',
      'सामाजिक संस्था, विद्यार्थी वसतिगृहे आणि शैक्षणिक ट्रस्ट शिक्षणाचा प्रसार व इतिहास संवर्धनाचे कार्य करत आहेत.',
      'ସାମୁଦାୟିକ ସଂଗଠନ, ଶିକ୍ଷା ଟ୍ରଷ୍ଟ ଓ ଐତିହ୍ୟ ଗବେଷଣା ମଞ୍ଚ ଶିକ୍ଷା ଓ ସାମାଜିକ ସଶକ୍ତିକରଣକୁ ଆଗେଇ ନେଉଛନ୍ତି।',
      'সামাজিক কল্যাণ সমিতি, শিক্ষা ট্রাস্ট ও ঐতিহ্য পোর্টালগুলো শিক্ষা বিস্তার ও সামাজিক ক্ষমতায়নে কাজ করছে।'
    ),
    documentedHistoricalExamples: m8(
      '1. Post-independence infrastructure records of Hirakud, Nagarjuna Sagar, and Tungabhadra dam construction.\n2. Establishment of regional educational societies and historical research councils across Odisha, Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Maharashtra, and Rajasthan.',
      '1. हीराकुद, नागार्जुन सागर और तुंगभद्रा बांध निर्माण के स्वतंत्रता-पश्चात के अभिलेख।\n2. ओडिशा, आंध्र प्रदेश, तेलंगाना, कर्नाटक, तमिलनाडु, महाराष्ट्र और राजस्थान में क्षेत्रीय शिक्षा समितियों और ऐतिहासिक अनुसंधान परिषदों की स्थापना।',
      '1. హీరాకుడ్, నాగార్జున సాగర్, తుంగభద్ర ప్రాజెక్టుల నిర్మాణ చరిత్ర.\n2. వివిధ రాష్ట్రాలలో ఏర్పాటైన విద్యా సంస్థలు మరియు చారిత్రక పరిశోధనా మండళ్లు.',
      '1. ಹಿರಾಕುಡ್, ನಾಗಾರ್ಜುನ ಸಾಗರ ಮತ್ತು ತುಂಗಭದ್ರಾ ಅಣೆಕಟ್ಟುಗಳ ನಿರ್ಮಾಣ ದಾಖಲೆಗಳು.\n2. ವಿವಿಧ ರಾಜ್ಯಗಳಲ್ಲಿ ಸ್ಥಾಪಿತವಾದ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಐತಿಹಾಸಿಕ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆಗಳು.',
      '1. ஹிராகுட், நாகார்ஜுன சாகர் மற்றும் துங்கபத்ரா அணைக் கட்டுமானப் பதிவுகள்.\n2. பல்வேறு மாநிலங்களில் நிறுவப்பட்டுள்ள கல்வி மற்றும் வரலாற்று ஆய்வு அமைப்புகள்.',
      '१. हिराकुड, नागार्जुन सागर आणि तुंगभद्रा धरण बांधणीच्या नोंदी.\n२. विविध राज्यांत स्थापन झालेल्या शैक्षणिक संस्था व इतिहास संशोधन मंडळे.',
      '୧. ହୀରାକୁଦ, ନାଗାର୍ଜୁନ ସାଗର ଓ ତୁଙ୍ଗଭଦ୍ରା ନଦୀବନ୍ଧ ନିର୍ମାଣ ଇତିହାସ।\n୨. ବିଭିନ୍ନ ରାଜ୍ୟରେ ପ୍ରତିଷ୍ଠିତ ଶିକ୍ଷା ଓ ଗବେଷଣା ଅନୁଷ୍ଠାନ।',
      '১. হীরাকুঁদ, নাগার্জুন সাগর ও তুঙ্গভদ্রা বাঁধ নির্মাণের নথি।\n২. বিভিন্ন রাজ্যে প্রতিষ্ঠিত শিক্ষা ও ঐতিহাসিক গবেষণা সংস্থা।'
    ),
    contributionsToSociety: m8(
      'Contributed both the foundational physical labor and modern technical/administrative leadership for nation-building across India.',
      'संपूर्ण भारत में राष्ट्र-निर्माण के लिए आधारभूत भौतिक श्रम और आधुनिक तकनीकी व प्रशासनिक नेतृत्व दोनों का योगदान दिया।',
      'దేశ నిర్మాణానికి అవసరమైన పునాది శ్రమను మరియు ఆధునిక సాంకేతిక, పరిపాలనా నాయకత్వాన్ని అందించారు.',
      'ರಾಷ್ಟ್ರ ನಿರ್ಮಾಣಕ್ಕೆ ಮೂಲಭೂತ ಶ್ರಮ ಮತ್ತು ಆಧುನିକ ತಾಂತ್ರಿಕ ಹಾಗೂ ಆಡಳಿತಾತ್ಮಕ ನಾಯಕತ್ವವನ್ನು ನೀಡಿದ್ದಾರೆ.',
      'தேசக் கட்டுமானத்திற்கு அடிப்படை உழைப்பையும் நவீன தொழில்நுட்ப மற்றும் நிர்வாகத் தலைமையையும் வழங்கியுள்ளனர்.',
      'राष्ट्रउभारणीसाठी मूलभूत श्रम आणि आधुनिक तांत्रिक व प्रशासकीय नेतृत्व दिले आहे.',
      'ରାଷ୍ଟ୍ର ନିର୍ମାଣ ପାଇଁ ମୂଳ ଶ୍ରମ ଓ ଆଧୁନିକ ଯାନ୍ତ୍ରିକ ତଥା ପ୍ରଶାସନିକ ନେତୃତ୍ୱ ପ୍ରଦାନ କରିଛନ୍ତି।',
      'রাষ্ট্র নির্মাণে মৌলিক শ্রম এবং আধুনিক কারিগরি ও প্রশাসনিক নেতৃত্ব উভয়ই প্রদান করেছেন।'
    ),
    communitySpecificConnectionsAndDistinctions: m8(
      'Important Reminder: Professional heritage categories are historical and occupational classifications for educational documentation; they must never be treated as mandatory or restrictive occupations for any individual or community.',
      'महत्वपूर्ण स्मरण: व्यावसायिक विरासत श्रेणियाँ शैक्षिक दस्तावेज़ीकरण के लिए ऐतिहासिक और व्यावसायिक वर्गीकरण हैं; इन्हें किसी भी व्यक्ति या समुदाय के लिए अनिवार्य या सीमित व्यवसाय के रूप में नहीं देखा जाना चाहिए।',
      'ముఖ్య గమనిక: ఈ వృత్తిపరమైన వారసత్వ వర్గాలు చారిత్రక మరియు విద్యాపరమైన విశ్లేషణ కోసం మాత్రమే; వీటిని ఏ వ్యక్తీ లేదా సమాజానికీ నిర్బంధ వృత్తులుగా భావించరాదు.',
      'ಮುಖ್ಯ ಸೂಚನೆ: ಈ ವೃತ್ತಿಪರ ಪರಂಪರೆಯ ವರ್ಗಗಳು ಐತಿಹಾಸಿಕ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ದಾಖಲಾತಿಗಾಗಿ ಮಾತ್ರ; ಇವುಗಳನ್ನು ಯಾವುದೇ ವ್ಯಕ್ತಿ ಅಥವಾ ಸಮುದಾಯಕ್ಕೆ ಕಡ್ಡಾಯ ವೃತ್ತಿಯೆಂದು ಪರಿಗಣಿಸಬಾರದು.',
      'முக்கியக் குறிப்பு: இந்தத் தொழில் பாரம்பரிய வகைப்பாடுகள் வரலாற்று மற்றும் கல்வி ஆவணப்படுத்தலுக்கானவை மட்டுமே; இவை எந்தவொரு தனிநபருக்கும் அல்லது சமூகத்திற்கும் கட்டாயத் தொழில்கள் அல்ல.',
      'महत्त्वाची टीप: या व्यावसायिक वारसा श्रेणी केवळ ऐतिहासिक व शैक्षणिक अभ्यासासाठी आहेत; त्या कोणत्याही व्यक्ती किंवा समाजासाठी बंधनकारक व्यवसाय मानल्या जाऊ नयेत.',
      'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସୂଚନା: ଏହି ବୃତ୍ତିଗତ ବର୍ଗୀକରଣ କେବଳ ଐତିହାସିକ ଓ ଶୈକ୍ଷିକ ଅଧ୍ୟୟନ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ; ଏହା କୌଣସି ବ୍ୟକ୍ତି ବା ସମାଜ ପାଇଁ ବାଧ୍ୟତାମୂଳକ ବୃତ୍ତି ନୁହେଁ।',
      'গুরুত্বপূর্ণ নোট: এই পেশাগত ঐতিহ্য বিভাগগুলো কেবল ঐতিহাসিক ও শিক্ষামূলক নথিবদ্ধকরণের জন্য; এগুলোকে কোনো ব্যক্তি বা সম্প্রদায়ের জন্য বাধ্যতামূলক পেশা হিসেবে গণ্য করা উচিত নয়।'
    ),
    epistemicAndMethodologicalNote: m8(
      'Methodological Note: Accommodates all documented traditional and contemporary occupations not covered in Categories 1–8.',
      'कार्यप्रणाली टिप्पणी: श्रेणी 1 से 8 में शामिल न किए गए सभी प्रमाणित पारंपरिक और समकालीन व्यवसायों को इसमें समाहित किया गया है।',
      'పరిశోధనా గమనిక: 1 నుండి 8 వర్గాలలో లేని ఇతర సాంప్రదాయ మరియు సమకాలీన వృత్తులన్నీ ఈ వర్గంలో పొందుపరచబడ్డాయి.',
      'ಸಂಶೋಧನಾ ಸೂಚನೆ: ವರ್ಗ 1 ರಿಂದ 8 ರಲ್ಲಿ ಒಳಗೊಳ್ಳದ ಇತರ ಎಲ್ಲಾ ಸಾಂಪ್ರದಾಯಿಕ ಮತ್ತು ಸಮಕಾಲೀನ ವೃತ್ತಿಗಳನ್ನು ಇಲ್ಲಿ ಸೇರಿಸಲಾಗಿದೆ.',
      'ஆய்வுக் குறிப்பு: வகை 1 முதல் 8 வரை இடம்பெறாத பிற பாரம்பரிய மற்றும் தற்காலத் தொழில்கள் அனைத்தும் இதில் அடங்கும்.',
      'संशोधन टीप: वर्ग १ ते ८ मध्ये समाविष्ट नसलेले इतर सर्व पारंपरिक व समकालीन व्यवसाय यात समाविष्ट आहेत.',
      'ଗବେଷଣା ଟିପ୍ପଣୀ: ବର୍ଗ ୧ ରୁ ୮ ମଧ୍ୟରେ ନଥିବା ଅନ୍ୟ ସମସ୍ତ ପାରମ୍ପରିକ ଓ ସମକାଳୀନ ବୃତ୍ତି ଏଥିରେ ଅନ୍ତର୍ଭୁକ୍ତ।',
      'পদ্ধতিগত নোট: বিভাগ ১ থেকে ৮-এর বাইরে থাকা অন্যান্য সকল নথিবদ্ধ ঐতিহ্যবাহী ও সমসাময়িক পেশা এতে অন্তর্ভুক্ত।'
    ),
    visualAssets: [
      {
        id: 'vis_prof_9_udayagiri_infra',
        imageUrl: ARCHIVE_IMG('udayagiri_fort_nellore.jpg'),
        visualType: 'Architectural Monument',
        historicalPeriod: 'Historical Quarrying, Transport & Contemporary Infrastructure Heritage',
        title: m8(
          'Dressed Stone Infrastructure, Quarry Extraction & Modern Civil Engineering Continuity',
          'पाषाण उत्खनन, परिवहन एवं आधुनिक सिविल अभियांत्रिकी निरंतरता',
          'రాతి గనుల తవ్వకం, రవాణా & ఆధునిక సివిల్ ఇంజనీరింగ్ వారసత్వ కొనసాగింపు',
          'ಕಲ್ಲು ಗಣಿಗಾರಿಕೆ, ಸಾಗಾಟ ಮತ್ತು ಆಧುನಿಕ ಸಿವಿಲ್ ಎಂಜಿನಿಯರಿಂಗ್ ಪರಂಪರೆ',
          'கல் குவாரி, போக்குவரத்து மற்றும் நவீன சிவில் பொறியியல் தொடர்ச்சி',
          'दगड खाणकाम, वाहतूक आणि आधुनिक स्थापत्य अभियांत्रिकी सातत्य',
          'ପଥର ଖନନ, ପରିବହନ ଓ ଆଧୁନିକ ସିଭିଲ୍ ଇଞ୍ଜିନିୟରିଂ ପରମ୍ପରା',
          'পাথর উত্তোলন, পরিবহন ও আধুনিক সিভিল ইঞ্জিনিয়ারিং ধারাবাহিকতা'
        ),
        caption: m8(
          'Illustrates the transition from traditional stone quarrying and material logistics to modern civil engineering, academia, business, and public service.',
          'पारंपरिक पाषाण उत्खनन एवं सामग्री परिवहन से आधुनिक सिविल इंजीनियरिंग, उच्च शिक्षा, व्यवसाय और लोक सेवा तक की यात्रा का प्रतीक।',
          'సాంప్రదాయ రాతి గనులు మరియు రవాణా నుండి ఆధునిక సివిల్ ఇంజనీరింగ్, ఉన్నత విద్య, వ్యాపారం మరియు ప్రజా సేవ వరకు సాగిన పురోగతికి ప్రతీక.',
          'ಸಾಂಪ್ರದಾಯಿಕ ಕಲ್ಲು ಗಣಿಗಾರಿಕೆಯಿಂದ ಆಧುನಿಕ ಎಂಜಿನಿಯರಿಂಗ್, ಶಿಕ್ಷಣ, ಉದ್ಯಮ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಸೇವೆಯವರೆಗಿನ ಪ್ರಗತಿಯ ಸಂಕೇತ.',
          'பாரம்பரியக் கல் குவாரி மற்றும் போக்குவரத்திலிருந்து நவீன பொறியியல், கல்வி, வணிகம் மற்றும் பொதுச் சேவை வரையிலான வளர்ச்சி.',
          'पारंपरिक खाणकाम व वाहतुकीपासून आधुनिक अभियांत्रिकी, शिक्षण, व्यवसाय व लोकसेवेपर्यंतच्या प्रगतीचे प्रतीक.',
          'ପାରମ୍ପରିକ ପଥର ଖନନ ଓ ପରିବହନରୁ ଆଧୁନିକ ଇଞ୍ଜିନିୟରିଂ, ଶିକ୍ଷା, ବ୍ୟବସାୟ ଓ ଜନସେବା ପର୍ଯ୍ୟନ୍ତ ପ୍ରଗତିର ପ୍ରତୀକ।',
          'ঐতিহ্যবাহী পাথর উত্তোলন ও পরিবহন থেকে আধুনিক প্রকৌশল, শিক্ষা, ব্যবসা ও জনসেবায় উত্তরণের প্রতীক।'
        ),
        altText: m8(
          'Stone steps and engineered ramparts representing infrastructure and contemporary professions',
          'बुनियादी ढाँचे और समकालीन व्यवसायों को दर्शाती पाषाण सीढ़ियाँ व प्राचीर',
          'మౌలిక వసతులు మరియు సమకాలీన వృత్తులను సూచించే రాతి మెట్లు, కట్టడాలు',
          'ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ಸಮಕಾಲೀನ ವೃತ್ತಿಗಳನ್ನು ಪ್ರತಿನಿಧಿಸುವ ಕಲ್ಲಿನ ಮೆಟ್ಟಿಲುಗಳು',
          'உள்கட்டமைப்பு மற்றும் சமகாலத் தொழில்களைக் குறிக்கும் கற்படிகள்',
          'पायाभूत सुविधा व समकालीन व्यवसाय दर्शवणाऱ्या दगडी पायऱ्या',
          'ଭିତ୍ତିଭୂମି ଓ ସମକାଳୀନ ବୃତ୍ତିକୁ ଦର୍ଶାଉଥିବା ପ୍ରସ୍ତର ପାହାଚ',
          'পরিকাঠামো ও সমসাময়িক পেশা প্রদর্শনকারী প্রস্তর সিঁড়ি'
        ),
        sourceAttribution: 'Archival Monument Photograph — Udayagiri Hill Fort, Andhra Pradesh',
        licenseInfo: 'Public Domain / Heritage Monument Documentation'
      }
    ],
    relatedArticles: [
      {
        id: 'rel_op_1',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_01_od',
        label: m8('Od Community Article', 'ओड समुदाय लेख', 'ఓడ్ సమాజ వ్యాసం', 'ಓಡ್ ಸಮುದಾಯ ಲೇಖನ', 'ஓட் சமூகக் கட்டுரை', 'ओड समाज लेख', 'ଓଡ଼ ସମୁଦାୟ ଲେଖା', 'ওড সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      },
      {
        id: 'rel_op_2',
        targetType: 'internal_article',
        targetIdOrPath: 'comm_dir_10_vaddera',
        label: m8('Vaddera Community Article', 'वड्डेरा समुदाय लेख', 'వడ్డెర సమాజ వ్యాసం', 'ವಡ್ಡೇರ ಸಮುದಾಯ ಲೇಖನ', 'வட்டேரா சமூகக் கட்டுரை', 'वड्डेरा समाज लेख', 'ଭଡ୍ଡେରା ସମୁଦାୟ ଲେଖା', 'ভড্ডেরা সম্প্রদায় নিবন্ধ'),
        categoryBadge: m8('Community Profile', 'समुदाय विवरण', 'సమాజ వివరణ', 'ಸಮುದಾಯ ವಿವರ', 'சமூக விவரம்', 'समाज माहिती', 'ସମୁଦାୟ ବିବରଣୀ', 'সম্প্রদায় বিবরণ')
      }
    ],
    relatedKeywords: ['Engineering', 'Construction', 'Od', 'Vaddera', 'Voddar', 'Oddaru'],
    references: [
      {
        citation: 'Singh, K. S. (1998). People of India: National Series (Anthropological Survey of India). Oxford University Press.',
        type: 'Academic Monograph'
      }
    ]
  }
];

export const COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES: ProfessionalHeritageCategoryArticle[] = [
  ...PROFESSIONAL_HERITAGE_CATEGORIES,
  ...PROFESSIONAL_HERITAGE_CATEGORIES_4_TO_9
];

// ============================================================================
// STEP 2: 16-COMMUNITY DIRECTORY & MULTILINGUAL UI LABELS (ALL 8 LANGUAGES)
// ============================================================================

export interface CommunityDirectoryEntry {
  id: string;
  orderNumber: number;
  canonicalName: string;
  localizedName: MultilingualText;
  nativeScripts: Record<string, string>;
  categoryGroup: 'Odra-Kalinga Core' | 'Rajput & Martial Lineages' | 'Deccan & Southern Designations' | 'Dynastic & Royal Lineages';
  localizedCategoryGroup: MultilingualText;
  geographicalSpread: MultilingualText;
  prominentStates: string[];
  epistemicClassification: MultilingualText;
  professionalCategoryNumbers: number[];
  overview: MultilingualText;
  linkedSynonymId?: string;
}

export const COMMUNITY_DIRECTORY_ITEMS: CommunityDirectoryEntry[] = [
  {
    id: 'comm_dir_01_od',
    orderNumber: 1,
    canonicalName: 'Od',
    localizedName: m8('Od', 'ओड', 'ఓడ్', 'ಓಡ್', 'ஓட்', 'ओड', 'ଓଡ଼', 'ওড'),
    nativeScripts: { Odia: 'ଓଡ଼', Devanagari: 'ओड', Telugu: 'ఓడ్', Kannada: 'ಓಡ್', Tamil: 'ஓட்' },
    categoryGroup: 'Odra-Kalinga Core',
    localizedCategoryGroup: m8(
      'Odra-Kalinga Core Lineage',
      'ओड्र-कलिंग मूल वंश',
      'ఓడ్ర-కళింగ మూల వంశం',
      'ಓಡ್ರ-ಕಳಿಂಗ ಮೂಲ ವಂಶ',
      'ஒட்ர-கலிங்க மூல வம்சம்',
      'ओड्र-कलिंग मूळ वंश',
      'ଓଡ଼୍ର-କଳିଙ୍ଗ ମୂଳ ବଂଶ',
      'ওড্র-কলিঙ্গ মূল বংশ'
    ),
    geographicalSpread: m8(
      'Odisha, Rajasthan, Punjab, Haryana, Delhi, Western & Northern India',
      'ओडिशा, राजस्थान, पंजाब, हरियाणा, दिल्ली, पश्चिमी एवं उत्तर भारत',
      'ఒడిశా, రాజస్థాన్, పంజాబ్, హర్యానా, ఢిల్లీ, పశ్చిమ & ఉత్తర భారత్',
      'ಒಡಿಶಾ, ರಾಜಸ್ಥಾನ, ಪಂಜಾಬ್, ಹರಿಯಾಣ, ದೆಹಲಿ ಮತ್ತು ಉತ್ತರ ಭಾರತ',
      'ஒடிசா, ராஜஸ்தான், பஞ்சாப், ஹரியானா, டெல்லி மற்றும் வட இந்தியா',
      'ओडिशा, राजस्थान, पंजाब, हरियाणा, दिल्ली आणि उत्तर भारत',
      'ଓଡ଼ିଶା, ରାଜସ୍ଥାନ, ପଞ୍ଜାବ, ହରିୟାଣା, ଦିଲ୍ଲୀ ଓ ଉତ୍ତର ଭାରତ',
      'ওড়িশা, রাজস্থান, পাঞ্জাব, হরিয়ানা, দিল্লি ও উত্তর ভারত'
    ),
    prominentStates: ['Odisha', 'Rajasthan', 'Punjab', 'Haryana', 'Delhi', 'Gujarat', 'Maharashtra'],
    epistemicClassification: m8(
      'Epigraphically & Ethnographically Documented (Odra / Oḍa)',
      'अभिलेखीय एवं नृवंशविज्ञान द्वारा प्रमाणित (ओड्र / ओड)',
      'శాసన మరియు మానవశాస్త్ర ఆధారాలతో నమోదైనది (ఓడ్ర / ఓడ్)',
      'ಶಾಸನ ಮತ್ತು ಮಾನವಶಾಸ್ತ್ರೀಯವಾಗಿ ದಾಖಲಾದ (ಓಡ್ರ / ಓಡ್)',
      'கல்வெட்டு மற்றும் இனவரைவியல் சான்று பெற்றது (ஒட்ர / ஓட்)',
      'शिलालेखीय आणि मानववंशशास्त्रीय नोंदी असलेले (ओड्र / ओड)',
      'ଶିଳାଲେଖ ଓ ନୃବଂଶ ବିଜ୍ଞାନ ଦ୍ୱାରା ପ୍ରମାଣିତ (ଓଡ଼୍ର / ଓଡ଼)',
      'শিলালিপি ও নৃতাত্ত্বিকভাবে নথিবদ্ধ (ওড্র / ওড)'
    ),
    professionalCategoryNumbers: [1, 2, 3, 7, 9],
    overview: m8(
      'Foundational classical designation rooted in Sanskrit Udra/Odra (Natyashastra, Mahabharata, and early copper-plate charters), Historically associated with ancient Odra-desha, hydraulic works, fort construction, and agrarian settlement.',
      'संस्कृत उद्र/ओड्र (नाट्यशास्त्र, महाभारत एवं ताम्रपत्रों) से व्युत्पन्न मूल ऐतिहासिक नाम; प्राचीन ओड्र-देश, जल-अभियांत्रिकी, दुर्ग निर्माण और कृषि से संबद्ध।',
      'సంస్కృత ఉద్ర/ఓడ్ర (నాట్యశాస్త్రం, మహాభారతం మరియు తామ్రపత్రాలు) నుండి ఉద్భవించిన మూల నామం; ప్రాచీన ఓడ్ర-దేశం, జల-నిర్మాణ మరియు దుర్గ నిర్మాణ రంగాలతో ముడిపడి ఉంది.',
      'ಸಂಸ್ಕೃತ ಉದ್ರ/ಓಡ್ರದಿಂದ ಬಂದ ಮೂಲ ಐತಿಹಾಸಿಕ ಹೆಸರು; ಪ್ರಾಚೀನ ಓಡ್ರ-ದೇಶ, ಜಲ-ಎಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಕೋಟೆ ನಿರ್ಮಾಣದೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದೆ.',
      'சமஸ்கிருத உத்ர/ஒட்ர என்பதிலிருந்து தோன்றிய மூலப் பெயர்; பண்டைய ஒட்ர-தேசம், நீர்ப்பாசனப் பொறியியல் மற்றும் கோட்டைக் கட்டுமானத்துடன் தொடர்புடையது.',
      'संस्कृत उद्र/ओड्र पासून आलेले मूळ ऐतिहासिक नाव; प्राचीन ओड्र-देश, जल-अभियांत्रिकी आणि किल्ले बांधणीशी संबंधित.',
      'ସଂସ୍କୃତ ଉଦ୍ର/ଓଡ଼୍ରରୁ ଉତ୍ପନ୍ନ ମୂଳ ଐତିହାସିକ ନାମ; ପ୍ରାଚୀନ ଓଡ଼୍ର-ଦେଶ, ଜଳ-ଇଞ୍ଜିନିୟରିଂ ଓ ଦୁର୍ଗ ନିର୍ମାଣ ସହ ସମ୍ପୃକ୍ତ।',
      'সংস্কৃত উদ্র/ওড্র থেকে উদ্ভূত মূল ঐতিহাসিক নাম; প্রাচীন ওড্র-দেশ, জল-প্রকৌশল ও দুর্গ নির্মাণের সাথে যুক্ত।'
    ),
    linkedSynonymId: 'syn_od_oad_odra'
  },
  {
    id: 'comm_dir_02_od_rajputh',
    orderNumber: 2,
    canonicalName: 'Od-Rajputh',
    localizedName: m8('Od-Rajputh', 'ओड-राजपूत', 'ఓడ్-రాజ్‌పుత్', 'ಓಡ್-ರಜಪೂತ್', 'ஓட்-ராஜ்புத்', 'ओड-राजपूत', 'ଓଡ଼-ରାଜପୁତ', 'ওড-রাজপুত'),
    nativeScripts: { Devanagari: 'ओड-राजपूत', Gurmukhi: 'ਓਡ ਰਾਜਪੂਤ', Telugu: 'ఓడ్-రాజ్‌పుత్', Odia: 'ଓଡ଼-ରାଜପୁତ' },
    categoryGroup: 'Rajput & Martial Lineages',
    localizedCategoryGroup: m8(
      'Rajput & Martial Lineages',
      'राजपूत एवं सामरिक वंश',
      'రాజపుత్ర మరియు సైనిక వంశాలు',
      'ರಜಪೂತ ಮತ್ತು ಕ್ಷತ್ರಿಯ ಸೇನಾ ವಂಶಗಳು',
      'ராஜ்புத் மற்றும் படை வம்சங்கள்',
      'राजपूत आणि लष्करी घराणी',
      'ରାଜପୁତ ଓ ସାମରିକ ବଂଶ',
      'রাজপুত ও সামরিক বংশ'
    ),
    geographicalSpread: m8(
      'Rajasthan, Punjab, Haryana, Himachal Pradesh, Delhi NCR, Uttar Pradesh, Uttarakhand, Gujarat, Sindh Corridor',
      'राजस्थान, पंजाब, हरियाणा, हिमाचल प्रदेश, दिल्ली एनसीआर, उत्तर प्रदेश, उत्तराखंड, गुजरात, सिंध क्षेत्र',
      'రాజస్థాన్, పంజాబ్, హర్యానా, హిమాచల్ ప్రదేశ్, ఢిల్లీ, ఉత్తర ప్రదేశ్, ఉత్తరాఖండ్, గుజరాత్',
      'ರಾಜಸ್ಥಾನ, ಪಂಜಾಬ್, ಹರಿಯಾಣ, ಹಿಮಾಚಲ ಪ್ರದೇಶ, ದೆಹಲಿ, ಉತ್ತರ ಪ್ರದೇಶ, ಉತ್ತರಾಖಂಡ ಮತ್ತು ಗುಜರಾತ್',
      'ராஜஸ்தான், பஞ்சாப், ஹரியானா, இமாச்சலப் பிரதேசம், டெல்லி, உத்தரப் பிரதேசம், குஜராத்',
      'राजस्थान, पंजाब, हरियाणा, हिमाचल प्रदेश, दिल्ली, उत्तर प्रदेश, उत्तराखंड आणि गुजरात',
      'ରାଜସ୍ଥାନ, ପଞ୍ଜାବ, ହରିୟାଣା, ହିମାଚଳ ପ୍ରଦେଶ, ଦିଲ୍ଲୀ, ଉତ୍ତର ପ୍ରଦେଶ, ଉତ୍ତରାଖଣ୍ଡ ଓ ଗୁଜରାଟ',
      'রাজস্থান, পাঞ্জাব, হরিয়ানা, হিমাচল প্রদেশ, দিল্লি, উত্তর প্রদেশ, উত্তরাখণ্ড ও গুজরাট'
    ),
    prominentStates: ['Rajasthan', 'Punjab', 'Haryana', 'Delhi', 'Uttar Pradesh', 'Uttarakhand', 'Himachal Pradesh', 'Gujarat'],
    epistemicClassification: m8(
      'Documented North-Western Rajput-Aligned Lineage & Gazetteer Record',
      'उत्तर-पश्चिमी राजपूत कुल परंपरा एवं गजेटियर प्रमाणित',
      'వాయువ్య భారత రాజపుత్ర వంశ సంప్రదాయం & గెజిటియర్ నమోదు',
      'ವಾಯುವ್ಯ ಭಾರತದ ರಜಪೂತ ಪರಂಪರೆ ಮತ್ತು ಗೆಜೆಟಿಯರ್ ದಾಖಲೆ',
      'வடமேற்கு இந்திய ராஜ்புத் வம்ச மரபு மற்றும் அரசிதழ் பதிவு',
      'वायव्य भारतातील राजपूत कुल परंपरा आणि गॅझेटियर नोंद',
      'ଉତ୍ତର-ପଶ୍ଚିମ ରାଜପୁତ କୁଳ ପରମ୍ପରା ଓ ଗେଜେଟିୟର ପ୍ରମାଣିତ',
      'উত্তর-পশ্চিম রাজপুত কুল ঐতিহ্য ও গেজেটিয়ার নথিবদ্ধ'
    ),
    professionalCategoryNumbers: [1, 3, 5, 8, 9],
    overview: m8(
      'Northern and North-Western branch preserving Rajput clan exogamy (Chauhan, Parmar, Solanki, Bhati, Rathore), Suryavamsha Bhagiratha genealogy, and historical stepwell, fort-bastion, and canal engineering.',
      'उत्तरी और उत्तर-पश्चिमी शाखा जो राजपूत गोत्र व्यवस्था (चौहान, परमार, सोलंकी, भाटी, राठौड़), सूर्यवंशी भगीरथ वंशावली तथा ऐतिहासिक बावड़ी, दुर्ग और नहर अभियांत्रिकी को संरक्षित रखती है।',
      'చౌహాన్, పర్మార్, సోలంకి, భాటి, రాథోడ్ వంటి రాజపుత్ర గోత్రాలను, సూర్యవంశ భగీరథ వంశావళిని మరియు దుర్గ, జలాశయ నిర్మాణ వారసత్వాన్ని కలిగిన ఉత్తర భారత శాఖ.',
      'ಚೌಹಾಣ್, ಪರ್ಮಾರ್, ಸೋಲಂಕಿ, ಭಾಟಿ, ರಾಥೋಡ್ ಗೋತ್ರಗಳನ್ನು ಮತ್ತು ಸೂರ್ಯವಂಶ ಭಗೀರಥ ಪರಂಪರೆಯನ್ನು ಹೊಂದಿರುವ ಉತ್ತರ ಭಾರತದ ರಜಪೂತ ಶಾಖೆ.',
      'சௌஹான், பர்மார், சோலங்கி, பாட்டி, ரத்தோர் கோத்திரங்களையும் சூர்யவம்ச பகீரத மரபையும் கொண்ட வட இந்தியப் பிரிவு.',
      'चौहान, परमार, सोलंकी, भाटी, राठोड या राजपूत गोत्रांचे आणि सूर्यवंशी भगीरथ परंपरेचे जतन करणारी उत्तर भारतीय शाखा.',
      'ଚୌହାନ, ପରମାର, ସୋଲଙ୍କି, ଭାଟି ଓ ରାଠୋର ଗୋତ୍ର ତଥା ସୂର୍ଯ୍ୟବଂଶୀ ଭଗୀରଥ ପରମ୍ପରା ରକ୍ଷା କରୁଥିବା ଉତ୍ତର ଭାରତୀୟ ଶାଖା।',
      'চৌহান, পরমার, সোলাঙ্কি, ভাটি ও রাঠোর গোত্র এবং সূর্যবংশী ভগীরথ ঐতিহ্য বহনকারী উত্তর ভারতীয় শাখা।'
    ),
    linkedSynonymId: 'syn_oad_rajputh'
  },
  {
    id: 'comm_dir_03_odra_kshatriya',
    orderNumber: 3,
    canonicalName: 'Odra-Kshatriya',
    localizedName: m8('Odra-Kshatriya', 'ओड्र-क्षत्रिय', 'ఓడ్ర-క్షత్రియ', 'ಓಡ್ರ-ಕ್ಷತ್ರಿಯ', 'ஒட்ர-க்ஷத்ரிய', 'ओड्र-क्षत्रिय', 'ଓଡ଼୍ର-କ୍ଷତ୍ରିୟ', 'ওড্র-ক্ষত্রিয়'),
    nativeScripts: { Odia: 'ଓଡ଼୍ର କ୍ଷତ୍ରିୟ', Devanagari: 'ओड्र क्षत्रिय', Telugu: 'ఓడ్ర క్షత్రియ', Kannada: 'ಓಡ್ರ ಕ್ಷತ್ರಿಯ' },
    categoryGroup: 'Odra-Kalinga Core',
    localizedCategoryGroup: m8(
      'Odra-Kalinga Core Lineage',
      'ओड्र-कलिंग मूल वंश',
      'ఓడ్ర-కళింగ మూల వంశం',
      'ಓಡ್ರ-ಕಳಿಂಗ ಮೂಲ ವಂಶ',
      'ஒட்ர-கலிங்க மூல வம்சம்',
      'ओड्र-कलिंग मूळ वंश',
      'ଓଡ଼୍ର-କଳିଙ୍ଗ ମୂଳ ବଂଶ',
      'ওড্র-কলিঙ্গ মূল বংশ'
    ),
    geographicalSpread: m8(
      'Odisha, Coastal Andhra Pradesh, Southern Chhattisgarh, Jharkhand, West Bengal borderlands',
      'ओडिशा, तटीय आंध्र प्रदेश, दक्षिणी छत्तीसगढ़, झारखंड, पश्चिम बंगाल सीमांत',
      'ఒడిశా, కోస్తా ఆంధ్రప్రదేశ్, దక్షిణ ఛత్తీస్‌గఢ్, జార్ఖండ్, పశ్చిమ బెంగాల్ సరిహద్దులు',
      'ಒಡಿಶಾ, ಕರಾವಳಿ ಆಂಧ್ರಪ್ರದೇಶ, ದಕ್ಷಿಣ ಛತ್ತೀಸ್‌ಗಢ ಮತ್ತು ಜಾರ್ಖಂಡ್',
      'ஒடிசா, கடலோர ஆந்திரப் பிரதேசம், தெற்கு சத்தீஸ்கர் மற்றும் ஜார்க்கண்ட்',
      'ओडिशा, किनारी आंध्र प्रदेश, दक्षिण छत्तीसगड आणि झारखंड',
      'ଓଡ଼ିଶା, ଉପକୂଳ ଆନ୍ଧ୍ର ପ୍ରଦେଶ, ଦକ୍ଷିଣ ଛତିଶଗଡ଼, ଝାଡ଼ଖଣ୍ଡ ଓ ପଶ୍ଚିମବଙ୍ଗ ସୀମାନ୍ତ',
      'ওড়িশা, উপকূলীয় অন্ধ্র প্রদেশ, দক্ষিণ ছত্তিশগড়, ঝাড়খণ্ড ও পশ্চিমবঙ্গ সীমান্ত'
    ),
    prominentStates: ['Odisha', 'Andhra Pradesh', 'Chhattisgarh', 'Jharkhand', 'West Bengal'],
    epistemicClassification: m8(
      'Classical Sanskrit & Epigraphic Kshatriya Lineage Designation',
      'शास्त्रीय संस्कृत एवं अभिलेखीय क्षत्रिय वंश नाम',
      'శాస్త్రీయ సంస్కృత మరియు శాసన ఆధారిత క్షత్రియ వంశ నామం',
      'ಶಾಸ್ತ್ರೀಯ ಸಂಸ್ಕೃತ ಮತ್ತು ಶಾಸನಬದ್ಧ ಕ್ಷತ್ರಿಯ ವಂಶ ನಾಮ',
      'செவ்வியல் சமஸ்கிருத மற்றும் கல்வெட்டு க்ஷத்ரிய வம்சப் பெயர்',
      'शास्त्रीय संस्कृत आणि शिलालेखीय क्षत्रिय वंश नाव',
      'ଶାସ୍ତ୍ରୀୟ ସଂସ୍କୃତ ଓ ଶିଳାଲେଖ ଆଧାରିତ କ୍ଷତ୍ରିୟ ବଂଶ ନାମ',
      'ধ্রুপদী সংস্কৃত ও শিলালিপি-ভিত্তিক ক্ষত্রিয় বংশ নাম'
    ),
    professionalCategoryNumbers: [1, 2, 5, 8],
    overview: m8(
      'Classical lineage identity attested in Manusmriti (10.44 as Paundraka-Choda-Dravida-Kamboja-Yavana-Shaka-Parada-Pahlava-China-Kirata-Darada-Khasha alongside Odra), Mahabharata, and medieval Kalinga-Utkala martial records.',
      'मनुस्मृति, महाभारत और मध्यकालीन कलिंग-उत्कल सैन्य अभिलेखों में उल्लिखित प्राचीन ओड्र-क्षत्रिय वंश पहचान।',
      'మనుస్మృతి, మహాభారతం మరియు మధ్యయుగ కళింగ-ఉత్కళ సైనిక రికార్డులలో పేర్కొన్న ప్రాచీన ఓడ్ర-క్షత్రియ వంశ గుర్తింపు.',
      'ಮನುಸ್ಮೃತಿ, ಮಹಾಭಾರತ ಮತ್ತು ಮಧ್ಯಕಾಲೀನ ಕಳಿಂಗ-ಉತ್ಕಲ ದಾಖಲೆಗಳಲ್ಲಿ ಉಲ್ಲೇಖಿತವಾದ ಪ್ರಾಚೀನ ಓಡ್ರ-ಕ್ಷತ್ರಿಯ ಪರಂಪರೆ.',
      'மனுஸ்மிருதி, மகாபாரதம் மற்றும் இடைக்கால கலிங்க-உத்கல ஆவணங்களில் குறிப்பிடப்படும் பண்டைய ஒட்ர-க்ஷத்ரிய அடையாளம்.',
      'मनुस्मृती, महाभारत आणि मध्ययुगीन कलिंग-उत्कल नोंदींमध्ये आढळणारी प्राचीन ओड्र-क्षत्रिय ओळख.',
      'ମନୁସ୍ମୃତି, ମହାଭାରତ ଓ ମଧ୍ୟଯୁଗୀୟ କଳିଙ୍ଗ-ଉତ୍କଳ ଅଭିଲେଖରେ ବର୍ଣ୍ଣିତ ପ୍ରାଚୀନ ଓଡ଼୍ର-କ୍ଷତ୍ରିୟ ପରିଚୟ।',
      'মনুস্মৃতি, মহাভারত ও মধ্যযুগীয় কলিঙ্গ-উৎকল নথিতে উল্লিখিত প্রাচীন ওড্র-ক্ষত্রিয় পরিচয়।'
    ),
    linkedSynonymId: 'syn_od_kshatriya'
  },
  {
    id: 'comm_dir_04_kalingarajulu',
    orderNumber: 4,
    canonicalName: 'KalingaRajulu',
    localizedName: m8('KalingaRajulu', 'कलिंगराजुलु', 'కళింగరాజులు', 'ಕಳಿಂಗರಾಜುಲು', 'கலிங்கராஜுலு', 'कलिंगराजुलु', 'କଳିଙ୍ଗରାଜୁଲୁ', 'কলিঙ্গরাজুলু'),
    nativeScripts: { Telugu: 'కళింగరాజులు', Odia: 'କଳିଙ୍ଗରାଜୁଲୁ', Kannada: 'ಕಳಿಂಗರಾಜುಲು', Tamil: 'கலிங்கராஜுலு' },
    categoryGroup: 'Dynastic & Royal Lineages',
    localizedCategoryGroup: m8(
      'Dynastic & Royal Lineages',
      'राजवंशीय एवं क्षत्रिय वंश',
      'రాజవంశ మరియు క్షత్రియ వంశాలు',
      'ರಾಜವಂಶೀಯ ಮತ್ತು ಕ್ಷತ್ರಿಯ ಪರಂಪರೆ',
      'அரச வம்ச மற்றும் க்ஷத்ரிய மரபுகள்',
      'राजवंशीय आणि क्षत्रिय घराणी',
      'ରାଜବଂଶୀୟ ଓ କ୍ଷତ୍ରିୟ ବଂଶ',
      'রাজবংশীয় ও ক্ষত্রিয় বংশ'
    ),
    geographicalSpread: m8(
      'North Coastal Andhra (Srikakulam, Vizianagaram, Visakhapatnam), Southern Odisha (Ganjam, Gajapati)',
      'उत्तरी तटीय आंध्र (श्रीकाकुलम, विजयनगरम, विशाखापत्तनम) एवं दक्षिणी ओडिशा (गंजाम, गजपति)',
      'ఉత్తరాంధ్ర (శ్రీకాకుళం, విజయనగరం, విశాఖపట్నం) మరియు దక్షిణ ఒడిశా (గంజాం, గజపతి)',
      'ಉತ್ತರ ಕರಾವಳಿ ಆಂಧ್ರ (ಶ್ರೀಕಾಕುಳಂ, ವಿಜಯನಗರಂ, ವಿಶಾಖಪಟ್ಟಣಂ) ಮತ್ತು ದಕ್ಷಿಣ ಒಡಿಶಾ',
      'வட கடலோர ஆந்திரா (ஸ்ரீகாகுளம், விஜயநகரம், விசாகப்பட்டினம்) மற்றும் தெற்கு ஒடிசா',
      'उत्तर किनारी आंध्र (श्रीकाकुलम, विजयनगरम, विशाखापट्टणम) आणि दक्षिण ओडिशा',
      'ଉତ୍ତର ଉପକୂଳ ଆନ୍ଧ୍ର (ଶ୍ରୀକାକୁଲମ, ବିଜୟନଗରମ, ବିଶାଖାପାଟଣା) ଓ ଦକ୍ଷିଣ ଓଡ଼ିଶା (ଗଞ୍ଜାମ, ଗଜପତି)',
      'উত্তর উপকূলীয় অন্ধ্র (শ্রীকাকুলাম, বিজয়নগরম, বিশাখাপত্তনম) ও দক্ষিণ ওড়িশা'
    ),
    prominentStates: ['Andhra Pradesh', 'Odisha', 'Telangana'],
    epistemicClassification: m8(
      'Regional Royal/Martial Honorific Lineage of Ancient Kalinga Corridor',
      'प्राचीन कलिंग क्षेत्र की क्षेत्रीय राजवंशीय एवं सामरिक उपाधि परंपरा',
      'ప్రాచీన కళింగ ప్రాంతపు క్షత్రియ మరియు సైనిక గౌరవ వంశ నామం',
      'ಪ್ರಾಚೀನ ಕಳಿಂಗ ಪ್ರದೇಶದ ಕ್ಷತ್ರಿಯ ಮತ್ತು ಸೇನಾ ಗೌರವ ವಂಶ ನಾಮ',
      'பண்டைய கலிங்கப் பகுதியின் அரச மற்றும் படை மரபுப் பெயர்',
      'प्राचीन कलिंग प्रदेशातील राजवंशीय व लष्करी सन्मानदर्शक वंश नाव',
      'ପ୍ରାଚୀନ କଳିଙ୍ଗ ଅଞ୍ଚଳର କ୍ଷତ୍ରିୟ ଓ ସାମରିକ ବଂଶ ଉପାଧି',
      'প্রাচীন কলিঙ্গ অঞ্চলের ক্ষত্রিয় ও সামরিক বংশ উপাধি'
    ),
    professionalCategoryNumbers: [1, 2, 8],
    overview: m8(
      'Honorific Telugu-Kalinga lineage designation preserving memories of administrative, fort-command, and martial service under the Eastern Ganga and Suryavamsha Gajapathi realms across Kalinga-Andhra.',
      'पूर्वी गंग और सूर्यवंशी गजपति साम्राज्यों के अंतर्गत कलिंग-आंध्र क्षेत्र में दुर्ग-कमान, प्रशासन और सैन्य सेवा की स्मृति रखने वाला प्रतिष्ठित वंश नाम।',
      'తూర్పు గంగ మరియు సూర్యవంశ గజపతి సామ్రాజ్యాల కాలంలో కళింగ-ఆంధ్ర ప్రాంతంలో దుర్గ రక్షణ, పరిపాలన మరియు సైనిక సేవలందించిన రాచరిక వంశ గుర్తింపు.',
      'ಪೂರ್ವ ಗಂಗ ಮತ್ತು ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯಗಳ ಕಾಲದಲ್ಲಿ ಕಳಿಂಗ-ಆಂಧ್ರ ಪ್ರದೇಶದಲ್ಲಿ ಕೋಟೆ ಆಡಳಿತ ಮತ್ತು ಸೇನಾ ಸೇವೆ ಸಲ್ಲಿಸಿದ ರಾಜವಂಶೀಯ ಗುರುತು.',
      'கீழைக் கங்கர் மற்றும் சூர்யவம்ச கஜபதி பேரரசுகளின் கீழ் கலிங்க-ஆந்திரப் பகுதியில் கோட்டை நிர்வாகம் மற்றும் படைச் சேவை புரிந்த வம்ச அடையாளம்.',
      'पूर्व गंग आणि सूर्यवंशी गजपती साम्राज्याच्या काळात कलिंग-आंध्र प्रदेशात दुर्ग प्रशासन व लष्करी सेवा देणाऱ्या घराण्याची ओळख.',
      'ପୂର୍ବ ଗଙ୍ଗ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ ଅଧୀନରେ କଳିଙ୍ଗ-ଆନ୍ଧ୍ର ଅଞ୍ଚଳରେ ଦୁର୍ଗ ପ୍ରଶାସନ ଓ ସାମରିକ ସେବା ସହ ଜଡ଼ିତ ବଂଶ ପରିଚୟ।',
      'পূর্ব গঙ্গ ও সূর্যবংশী গজপতি সাম্রাজ্যের অধীনে কলিঙ্গ-অন্ধ্র অঞ্চলে দুর্গ প্রশাসন ও সামরিক সেবার সাথে যুক্ত বংশ পরিচয়।'
    )
  },
  {
    id: 'comm_dir_05_od_khandayath',
    orderNumber: 5,
    canonicalName: 'OD-Khandayath',
    localizedName: m8('OD-Khandayath', 'ओड-खंडायत', 'ఓడ్-ఖండాయత్', 'ಓಡ್-ಖಂಡಾಯತ್', 'ஓட்-கண்டாயத்', 'ओड-खंडायत', 'ଓଡ଼-ଖଣ୍ଡାୟତ', 'ওড-খণ্ডায়ত'),
    nativeScripts: { Odia: 'ଓଡ଼ ଖଣ୍ଡାୟତ', Devanagari: 'ओड खंडायत', Telugu: 'ఓడ్ ఖండాయత్', Bengali: 'ওড খণ্ডায়ত' },
    categoryGroup: 'Rajput & Martial Lineages',
    localizedCategoryGroup: m8(
      'Rajput & Martial Lineages',
      'राजपूत एवं सामरिक वंश',
      'రాజపుత్ర మరియు సైనిక వంశాలు',
      'ರಜಪೂತ ಮತ್ತು ಕ್ಷತ್ರಿಯ ಸೇನಾ ವಂಶಗಳು',
      'ராஜ்புத் மற்றும் படை வம்சங்கள்',
      'राजपूत आणि लष्करी घराणी',
      'ରାଜପୁତ ଓ ସାମରିକ ବଂଶ',
      'রাজপুত ও সামরিক বংশ'
    ),
    geographicalSpread: m8(
      'Odisha (Cuttack, Puri, Khordha, Balasore, Bhadrak, Jajpur, Kendrapara, Ganjam, Dhenkanal)',
      'ओडिशा (कटक, पुरी, खुर्दा, बालासोर, भद्रक, जाजपुर, केन्द्रापड़ा, गंजाम, ढेंकानाल)',
      'ఒడిశా (కటక్, పూరీ, ఖుర్దా, బాలాసోర్, భద్రక్, జాజ్‌పూర్, కేంద్రపారా, గంజాం)',
      'ಒಡಿಶಾ (ಕಟಕ್, ಪುರಿ, ಖುರ್ದಾ, ಬಾಲಾಸೋರ್, ಭದ್ರಕ್, ಜಾಜ್‌ಪುರ, ಗಂಜಾಂ)',
      'ஒடிசா (கட்டாக், பூரி, குர்தா, பாலசோர், பத்ரக், ஜாஜ்பூர், கஞ்சாம்)',
      'ओडिशा (कटक, पुरी, खुर्दा, बालासोर, भद्रक, जाजपूर, गंजाम)',
      'ଓଡ଼ିଶା (କଟକ, ପୁରୀ, ଖୋର୍ଦ୍ଧା, ବାଲେଶ୍ୱର, ଭଦ୍ରକ, ଯାଜପୁର, କେନ୍ଦ୍ରାପଡ଼ା, ଗଞ୍ଜାମ, ଢେଙ୍କାନାଳ)',
      'ওড়িশা (কটক, পুরী, খোর্ধা, বালেশ্বর, ভদ্রক, জাজপুর, কেন্দ্রাপাড়া, গঞ্জাম)'
    ),
    prominentStates: ['Odisha', 'West Bengal', 'Jharkhand', 'Chhattisgarh'],
    epistemicClassification: m8(
      'Documented Medieval & Colonial Martial-Agrarian Estate Lineage (Madala Panji & Gazetteers)',
      'मादला पंजी एवं ब्रिटिश गजेटियर में प्रमाणित सामरिक-कृषक जमींदारी वंश',
      'మదలా పంజీ మరియు గెజిటియర్లలో నమోదైన సైనిక-భూస్వామ్య క్షత్రియ వర్గం',
      'ಮದಲಾ ಪಂಜೀ ಮತ್ತು ಗೆಜೆಟಿಯರ್‌ಗಳಲ್ಲಿ ದಾಖಲಾದ ಸೇನಾ-ಭೂಮಾಲೀಕ ಕ್ಷತ್ರಿಯ ವರ್ಗ',
      'மதலா பஞ்சி மற்றும் அரசிதழ்களில் பதிவான படை-நிலக்கிழார் பிரிவு',
      'मादला पंजी आणि गॅझेटियरमध्ये प्रमाणित लष्करी-जमीनदार वर्ग',
      'ମାଦଳା ପାଞ୍ଜି ଓ ଗେଜେଟିୟରରେ ପ୍ରମାଣିତ ସାମରିକ-ଭୂସ୍ୱାମୀ କ୍ଷତ୍ରିୟ ବର୍ଗ',
      'মাদলা পাঞ্জি ও গেজেটিয়ারে প্রত্যয়িত সামরিক-ভূস্বামী ক্ষত্রিয় বর্গ'
    ),
    professionalCategoryNumbers: [1, 2, 8],
    overview: m8(
      'Etymologically derived from Odia "Khanda-ayata" (master of the straight double-edged Khanda sword). Documented by Andrew Stirling (1822) and W. W. Hunter (1872) as the historical military landholding nobility and Odra-Chasa-Khandayat continuum of Odisha.',
      'ओड़िया "खंडा-आयत" (दोधारी खंडा तलवार के स्वामी) से व्युत्पन्न। एंड्रयू स्टर्लिंग (1822) और डब्ल्यू. डब्ल्यू. हंटर (1872) द्वारा ओडिशा के ऐतिहासिक सैन्य जमींदार और ओड्र-चासा-खंडायत सातत्य के रूप में प्रमाणित।',
      'ఒడియా "ఖండ-ఆయత" (ఖండ కత్తిపై ఆధిపత్యం కలవారు) నుండి ఉద్భవించింది. స్టిర్లింగ్ (1822) మరియు హంటర్ (1872) రికార్డులలో ఒడిశా యొక్క చారిత్రక సైనిక భూస్వామ్య వర్గంగా నమోదైంది.',
      'ಒಡಿಯಾ "ಖಂಡ-ಆಯತ" (ಖಂಡ ಕತ್ತಿಯ ಒಡೆಯರು) ಎಂಬುದರಿಂದ ಬಂದಿದೆ. ಸ್ಟಿರ್ಲಿಂಗ್ (1822) ಮತ್ತು ಹಂಟರ್ (1872) ದಾಖಲೆಗಳಲ್ಲಿ ಒಡಿಶಾದ ಐತಿಹಾಸಿಕ ಸೇನಾ ಭೂಮಾಲೀಕ ವರ್ಗವಾಗಿ ದಾಖಲಾಗಿದೆ.',
      'ஒடிய "கண்டா-ஆயத" (கண்டா வாளின் தலைவர்) என்பதிலிருந்து தோன்றியது. ஸ்டிர்லிங் (1822) மற்றும் ஹண்டர் (1872) குறிப்புகளில் ஒடிசாவின் படை-நிலக்கிழார் பிரிவாகப் பதிவாகியுள்ளது.',
      'ओडिया "खंडा-आयत" (खंडा तलवारीचे स्वामी) पासून व्युत्पन्न. स्टर्लिंग (१८२२) व हंटर (१८७२) यांच्या नोंदींत ओडिशातील ऐतिहासिक लष्करी जमीनदार म्हणून प्रमाणित.',
      'ଓଡ଼ିଆ "ଖଣ୍ଡା-ଆୟତ" (ଖଣ୍ଡା ତରବାରୀର ଅଧିକାରୀ) ରୁ ଉତ୍ପନ୍ନ। ଷ୍ଟିର୍ଲିଂ (୧୮୨୨) ଓ ହଣ୍ଟର (୧୮୭୨) ଙ୍କ ଦ୍ୱାରା ଓଡ଼ିଶାର ଐତିହାସିକ ସାମରିକ-ଭୂସ୍ୱାମୀ ବର୍ଗ ଭାବେ ପ୍ରମାଣିତ।',
      'ওড়িয়া "খণ্ডা-আয়ত" (খণ্ডা তরবারির অধিকারী) থেকে উদ্ভূত। স্টার্লিং (১৮২২) ও হান্টার (১৮৭২) কর্তৃক ওড়িশার ঐতিহাসিক সামরিক-ভূস্বামী বর্গ হিসেবে নথিবদ্ধ।'
    ),
    linkedSynonymId: 'syn_odisha_kshatriya'
  },
  {
    id: 'comm_dir_06_oda_chassa',
    orderNumber: 6,
    canonicalName: 'Oda-Chassa',
    localizedName: m8('Oda-Chassa', 'ओड-चासा', 'ఓడ-చాసా', 'ಓಡ-ಚಾಸಾ', 'ஓட-சாஸா', 'ओड-चासा', 'ଓଡ଼-ଚାଷା', 'ওড-চাষা'),
    nativeScripts: { Odia: 'ଓଡ଼ ଚାଷା', Devanagari: 'ओड चासा', Telugu: 'ఓడ చాసా', Bengali: 'ওড চাষা' },
    categoryGroup: 'Odra-Kalinga Core',
    localizedCategoryGroup: m8(
      'Odra-Kalinga Core Lineage',
      'ओड्र-कलिंग मूल वंश',
      'ఓడ్ర-కళింగ మూల వంశం',
      'ಓಡ್ರ-ಕಳಿಂಗ ಮೂಲ ವಂಶ',
      'ஒட்ர-கலிங்க மூல வம்சம்',
      'ओड्र-कलिंग मूळ वंश',
      'ଓଡ଼୍ର-କଳିଙ୍ଗ ମୂଳ ବଂଶ',
      'ওড্র-কলিঙ্গ মূল বংশ'
    ),
    geographicalSpread: m8(
      'Odisha (Mahanadi, Brahmani, Baitarani, and Rushikulya river deltas and garhjat highlands)',
      'ओडिशा (महानदी, ब्राह्मणी, वैतरणी और रुशिकुल्या नदी डेल्टा तथा गढ़जात क्षेत्र)',
      'ఒడిశా (మహానది, బ్రాహ్మణి, వైతరణి మరియు రుషికుల్య నదీ డెల్టా ప్రాంతాలు)',
      'ಒಡಿಶಾ (ಮಹಾನದಿ, ಬ್ರಾಹ್ಮಣಿ, ವೈತರಣಿ ಮತ್ತು ರುಷಿಕುಲ್ಯ ನದಿ ಬಯಲು ಪ್ರದೇಶಗಳು)',
      'ஒடிசா (மகாநதி, பிராம்மணி, வைதரணி மற்றும் நதிப் படுகைகள்)',
      'ओडिशा (महानदी, ब्राह्मणी, वैतरणी व रुशिकुल्या नदी खोरे)',
      'ଓଡ଼ିଶା (ମହାନଦୀ, ବ୍ରାହ୍ମଣୀ, ବୈତରଣୀ ଓ ଋଷିକୁଲ୍ୟା ନଦୀ ଉପତ୍ୟକା ଓ ଗଡ଼ଜାତ ଅଞ୍ଚଳ)',
      'ওড়িশা (মহানদী, ব্রাহ্মণী, বৈতরণী ও ঋষিকুল্যা নদী উপত্যকা)'
    ),
    prominentStates: ['Odisha', 'Chhattisgarh', 'Jharkhand'],
    epistemicClassification: m8(
      'Documented Agrarian-Military Peasant Proprietors of Odisha (Purnachandra Odia Bhashakosha)',
      'पूर्णचन्द्र ओड़िया भाषाकोश एवं राजस्व अभिलेखों में प्रमाणित कृषक-सैनिक भूमिधर वर्ग',
      'పూర్ణచంద్ర ఒడియా భాషాకోశం మరియు రెవెన్యూ రికార్డులలో నమోదైన వ్యవసాయ-సైనిక భూస్వామ్య వర్గం',
      'ಪೂರ್ಣಚಂದ್ರ ಒಡಿಯಾ ಭಾಷಾಕೋಶ ಮತ್ತು ಕಂದಾಯ ದಾಖಲೆಗಳಲ್ಲಿ ಪ್ರಮಾಣಿತವಾದ ಕೃಷಿ-ಸೇನಾ ಭೂಮಾಲೀಕ ವರ್ಗ',
      'பூர்ணசந்திர ஒடிய பாஷாகோஷம் மற்றும் வருவாய் ஆவணங்களில் பதிவான வேளாண்-படை நிலவுடைமையாளர் பிரிவு',
      'पूर्णचंद्र ओडिया भाषाकोश व महसूल नोंदींत प्रमाणित शेतकरी-सैनिक भूधारक वर्ग',
      'ପୂର୍ଣ୍ଣଚନ୍ଦ୍ର ଓଡ଼ିଆ ଭାଷାକୋଷ ଓ ରାଜସ୍ୱ ଦସ୍ତାବିଜରେ ପ୍ରମାଣିତ କୃଷି-ସାମରିକ ଭୂ-ମାଲିକ ବର୍ଗ',
      'পূর্ণচন্দ্র ওড়িয়া ভাষাকোষ ও রাজস্ব নথিতে প্রত্যয়িত কৃষি-সামরিক ভূমিমালিক বর্গ'
    ),
    professionalCategoryNumbers: [2, 1, 9],
    overview: m8(
      'Historically documented agrarian backbone of Odisha closely intertwined with the Od-Paika and Od-Khandayat systems: cultivators in peacetime and mobilized infantry militia during wartime, holding Pradhan and Padhan village headman offices.',
      'ओडिशा की ऐतिहासिक कृषि-रीढ़ जो ओड-पाइक और ओड-खंडायत व्यवस्था से गहराई से जुड़ी थी: शांतिकाल में भूमिपति कृषक और युद्धकाल में संगठित पैदल सेना, जो ग्राम प्रधान (पधान) पद धारण करते थे।',
      'ఒడిశాలోని ఓడ్-పైకా మరియు ఓడ్-ఖండాయత్ వ్యవస్థలతో పెనవేసుకున్న వ్యవసాయ-సైనిక సమాజం: శాంతి కాలంలో భూస్వామ్య రైతులుగా, యుద్ధ కాలంలో సైనికులుగా సేవలందించారు.',
      'ಒಡಿಶಾದ ಓಡ್-ಪೈಕಾ ಮತ್ತು ಓಡ್-ಖಂಡಾಯತ್ ವ್ಯವಸ್ಥೆಯೊಂದಿಗೆ ಬೆಸೆದುಕೊಂಡಿರುವ ಕೃಷಿ-ಸೇನಾ ಸಮುದಾಯ: ಶಾಂತিকಾಲದಲ್ಲಿ ಕೃಷಿಕರಾಗಿ ಮತ್ತು ಯುದ್ಧಕಾಲದಲ್ಲಿ ಸೈನಿಕರಾಗಿ ಸೇವೆ ಸಲ್ಲಿಸಿದರು.',
      'ஒடிசாவின் ஓட்-பைக்கா மற்றும் ஓட்-கண்டாயத் அமைப்புடன் இணைந்த வேளாண்-படைச் சமூகம்: அமைதிக்காலத்தில் விவசாயிகளாகவும் போர்க்காலத்தில் வீரர்களாகவும் செயல்பட்டனர்.',
      'ओडिशातील ओड-पाइक आणि ओड-खंडायत व्यवस्थेशी जोडलेला शेतकरी-सैनिक समाज: शांततेच्या काळात शेतकरी आणि युद्धकाळात पायदळ सैनिक म्हणून कार्यरत.',
      'ଓଡ଼ିଶାର ଓଡ଼-ପାଇକ ଓ ଓଡ଼-ଖଣ୍ଡାୟତ ବ୍ୟବସ୍ଥା ସହ ଅଙ୍ଗାଙ୍ଗୀ ଭାବେ ଜଡ଼ିତ କୃଷି-ସାମରିକ ସମାଜ: ଶାନ୍ତି ସମୟରେ କୃଷକ ଓ ଯୁଦ୍ଧ ସମୟରେ ସୈନିକ।',
      'ওড়িশার ওড-পাইক ও ওড-খণ্ডায়ত ব্যবস্থার সাথে অঙ্গাঙ্গীভাবে যুক্ত কৃষি-সামরিক সমাজ: শান্তির সময়ে কৃষক এবং যুদ্ধের সময়ে পদাতিক সৈনিক।'
    )
  },
  {
    id: 'comm_dir_07_od_paika',
    orderNumber: 7,
    canonicalName: 'OD-Paika',
    localizedName: m8('OD-Paika', 'ओड-पाइक', 'ఓడ్-పైకా', 'ಓಡ್-ಪೈಕಾ', 'ஓட்-பைக்கா', 'ओड-पाइक', 'ଓଡ଼-ପାଇକ', 'ওড-পাইক'),
    nativeScripts: { Odia: 'ଓଡ଼ ପାଇକ', Devanagari: 'ओड पाइक', Telugu: 'ఓడ్ పైకా', Bengali: 'ওড পাইক' },
    categoryGroup: 'Rajput & Martial Lineages',
    localizedCategoryGroup: m8(
      'Rajput & Martial Lineages',
      'राजपूत एवं सामरिक वंश',
      'రాజపుత్ర మరియు సైనిక వంశాలు',
      'ರಜಪೂತ ಮತ್ತು ಕ್ಷತ್ರಿಯ ಸೇನಾ ವಂಶಗಳು',
      'ராஜ்புத் மற்றும் படை வம்சங்கள்',
      'राजपूत आणि लष्करी घराणी',
      'ରାଜପୁତ ଓ ସାମରିକ ବଂଶ',
      'রাজপুত ও সামরিক বংশ'
    ),
    geographicalSpread: m8(
      'Odisha (Khordha, Puri, Cuttack, Nayagarh, Ganjam, Kalahandi, Koraput) & North Coastal Andhra',
      'ओडिशा (खुर्दा, पुरी, कटक, नयागढ़, गंजाम, कालाहांडी, कोरापुट) एवं उत्तरी तटीय आंध्र',
      'ఒడిశా (ఖుర్దా, పూరీ, కటక్, నయాగఢ్, గంజాం, కలహండి, కోరాపుట్) & ఉత్తరాంధ్ర',
      'ಒಡಿಶಾ (ಖುರ್ದಾ, ಪುರಿ, ಕಟಕ್, ನಯಾಗಢ, ಗಂಜಾಂ) ಮತ್ತು ಉತ್ತರ ಕರಾವಳಿ ಆಂಧ್ರ',
      'ஒடிசா (குர்தா, பூரி, கட்டாக், நயாகர், கஞ்சாம்) மற்றும் வட ஆந்திரா',
      'ओडिशा (खुर्दा, पुरी, कटक, नयागड, गंजाम) आणि उत्तर किनारी आंध्र',
      'ଓଡ଼ିଶା (ଖୋର୍ଦ୍ଧା, ପୁରୀ, କଟକ, ନୟାଗଡ଼, ଗଞ୍ଜାମ, କଳାହାଣ୍ଡି, କୋରାପୁଟ) ଓ ଉତ୍ତର ଆନ୍ଧ୍ର',
      'ওড়িশা (খোর্ধা, পুরী, কটক, নয়াগড়, গঞ্জাম) ও উত্তর অন্ধ্র'
    ),
    prominentStates: ['Odisha', 'Andhra Pradesh', 'Chhattisgarh'],
    epistemicClassification: m8(
      'Epigraphically & Archival Documented Martial Militia Institution (1817 Paika Rebellion)',
      'अभिलेखीय रूप से प्रमाणित सैन्य संस्था (1817 खुर्दा पाइक विद्रोह एवं पाइक अखड़ा)',
      'చారిత్రక ఆధారాలతో నమోదైన పదాతిదళ సైనిక వ్యవస్థ (1817 ఖుర్దా పైకా తిరుగుబాటు)',
      'ದಾಖಲಿತ ಪದಾತಿ ಸೇನಾ ಸಂಸ್ಥೆ (1817ರ ಖುರ್ದಾ ಪೈಕಾ ಬಂಡಾಯ ಮತ್ತು ಪೈಕಾ ಅಖಾಡ)',
      'ஆவணப்படுத்தப்பட்ட காலாட்படை அமைப்பு (1817 குர்தா பைக்கா புரட்சி)',
      'ऐतिहासिक कागदपत्रांत प्रमाणित पायदळ लष्करी संस्था (१८१७ चा खुर्दा पाइक उठाव)',
      'ଐତିହାସିକ ଦସ୍ତାବିଜରେ ପ୍ରମାଣିତ ପଦାତିକ ବାହିନୀ (୧୮୧୭ ଖୋର୍ଦ୍ଧା ପାଇକ ବିଦ୍ରୋହ ଓ ପାଇକ ଆଖଡ଼ା)',
      'ঐতিহাসিক নথিতে প্রত্যয়িত পদাতিক বাহিনী (১৮১৭ খোর্ধা পাইক বিদ্রোহ ও পাইক আখড়া)'
    ),
    professionalCategoryNumbers: [1, 2, 6, 8],
    overview: m8(
      'From Sanskrit "Padatika" (foot soldier). Hereditary landed militia of the Gajapathi and Khurda kingdoms holding rent-free Jagir lands, practicing Paika Akhada martial arts, and leading the historic 1804 and 1817 anti-colonial rebellions under Bakshi Jagabandhu.',
      'संस्कृत "पदातिक" (पैदल सैनिक) से व्युत्पन्न। गजपति और खुर्दा राज्यों की वंशानुगत सैन्य शक्ति जो कर-मुक्त जागीर भूमि धारण करती थी, पाइक अखड़ा युद्धकला का अभ्यास करती थी और बख्शी जगबंधु के नेतृत्व में 1817 के ऐतिहासिक विद्रोह की अग्रदूत बनी।',
      'సంస్కృత "పదాతిక" నుండి ఉద్భవించింది. గజపతి మరియు ఖుర్దా రాజ్యాలలో జాగీరు భూములు కలిగి, పైకా అఖాడా యుద్ధవిద్యలను అభ్యసించి, 1817లో బక్షి జగబంధు నేతృత్వంలో బ్రిటిష్ వారిపై తిరుగుబాటు చేసిన వీర సైనిక వర్గం.',
      'ಸಂಸ್ಕೃತ "ಪದಾತಿಕ" ಪದದಿಂದ ಬಂದಿದೆ. ಗಜಪತಿ ಮತ್ತು ಖುರ್ದಾ ರಾಜ್ಯಗಳ ಪದಾತಿ ಸೈನ್ಯವಾಗಿ, ಪೈಕಾ ಅಖಾಡ ಸಮರ ಕಲೆಯನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ 1817ರ ಬಂಡಾಯದಲ್ಲಿ ಹೋರಾಡಿದ ವೀರ ಪರಂಪರೆ.',
      'சமஸ்கிருத "பதாதிக" (காலாட்படை வீரர்) என்பதிலிருந்து தோன்றியது. கஜபதி மற்றும் குர்தா அரசுகளின் படைப்பிரிவாகவும், 1817 பைக்கா புரட்சியின் முன்னோடியாகவும் விளங்கிய மரபு.',
      'संस्कृत "पदातिक" पासून व्युत्पन्न. गजपती आणि खुर्दा राज्यांची वंशपरंपरागत पायदळ सेना, ज्यांनी पाइक आखाडा युद्धकलेची जोपासना केली आणि १८१७ च्या उठावाचे नेतृत्व केले.',
      'ସଂସ୍କୃତ "ପଦାତିକ" ରୁ ଉତ୍ପନ୍ନ। ଗଜପତି ଓ ଖୋର୍ଦ୍ଧା ରାଜ୍ୟର ବଂଶାନୁକ୍ରମିକ ସୈନ୍ୟ ବାହିନୀ, ଯେଉଁମାନେ ପାଇକ ଆଖଡ଼ା ସମରକଳା ଅଭ୍ୟାସ କରୁଥିଲେ ଓ ୧୮୧୭ ପାଇକ ବିଦ୍ରୋହର ନେତୃତ୍ୱ ନେଇଥିଲେ।',
      'সংস্কৃত "পদাতিক" থেকে উদ্ভূত। গজপতি ও খোর্ধা রাজ্যের বংশানুক্রমিক পদাতিক বাহিনী, যারা পাইক আখড়া সমরকলা চর্চা করত এবং ১৮১৭ সালের পাইক বিদ্রোহে নেতৃত্ব দিয়েছিল।'
    )
  },
  {
    id: 'comm_dir_08_odan',
    orderNumber: 8,
    canonicalName: 'Odan',
    localizedName: m8('Odan', 'ओडन', 'ఓడన్', 'ಓಡನ್', 'ஓடன் / ஒட்டன்', 'ओडन', 'ଓଡ଼ନ୍', 'ওডন'),
    nativeScripts: { Tamil: 'ஓடன் / ஒட்டன்', Malayalam: 'ഓടൻ', Telugu: 'ఓడన్', Kannada: 'ಓಡನ್' },
    categoryGroup: 'Deccan & Southern Designations',
    localizedCategoryGroup: m8(
      'Deccan & Southern Designations',
      'दक्कन एवं दक्षिण भारतीय नाम',
      'దక్కన్ & దక్షిణ భారత నామాలు',
      'ದಖನ್ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ಹೆಸರುಗಳು',
      'தக்காண மற்றும் தென்னிந்தியப் பெயர்கள்',
      'दख्खन आणि दक्षिण भारतीय नावे',
      'ଦାକ୍ଷିଣାତ୍ୟ ଓ ଦକ୍ଷିଣ ଭାରତୀୟ ନାମ',
      'দাক্ষিণাত্য ও দক্ষিণ ভারতীয় নাম'
    ),
    geographicalSpread: m8(
      'Tamil Nadu, Kerala (Palakkad, Thrissur, Malabar), Southern Karnatakaborderlands',
      'तमिलनाडु, केरल (पलक्कड़, त्रिशूर, मालाबार) एवं दक्षिणी कर्नाटक सीमांत',
      'తమిళనాడు, కేరళ (పాలక్కాడ్, త్రిసూర్, మలబార్) మరియు దక్షిణ కర్ణాటక సరిహద్దులు',
      'ತಮಿಳುನಾಡು, ಕೇರಳ (ಪಾಲಕ್ಕಾಡ್, ತ್ರಿಶೂರ್, ಮಲಬಾರ್) ಮತ್ತು ದಕ್ಷಿಣ ಕರ್ನಾಟಕ',
      'தமிழ்நாடு, கேரளா (பாலக்காடு, திருச்சூர், மலபார்) மற்றும் தெற்கு கர்நாடகா',
      'तामिळनाडू, केरळ (पलक्कड, त्रिशूर, मलबार) आणि दक्षिण कर्नाटक',
      'ତାମିଲନାଡୁ, କେରଳ (পাଲକ୍କାଡ, ତ୍ରିଶୂର, ମାଲାବାର) ଓ ଦକ୍ଷିଣ କର୍ଣ୍ଣାଟକ',
      'তামিলনাড়ু, কেরালা (পালাক্কাড়, ত্রিশূর, মালাবার) ও দক্ষিণ কর্ণাটক'
    ),
    prominentStates: ['Tamil Nadu', 'Kerala', 'Karnataka'],
    epistemicClassification: m8(
      'Documented Tamil-Malayalam Linguistic & Ethnographic Form of Odra/Oddar',
      'तमिल-मलयालम भाषाई एवं नृवंशविज्ञान अभिलेखों में प्रमाणित नाम',
      'తమిళ-మలయాళ భాషా మరియు మానవశాస్త్ర రికార్డులలో నమోదైన రూపం',
      'ತಮಿಳು-ಮಲಯಾಳಂ ಭಾಷಾ ಮತ್ತು ಮಾನವಶಾಸ್ತ್ರೀಯ ದಾಖಲೆಗಳಲ್ಲಿರುವ ರೂಪ',
      'தமிழ்-மலையாள மொழியியல் மற்றும் இனவரைவியல் ஆவணங்களில் பதிவான பெயர்',
      'तामिळ-मल्याळम भाषिक व मानववंशशास्त्रीय नोंदींतील रूप',
      'ତାମିଲ-ମାଲାୟାଲମ ଭାଷାତତ୍ତ୍ୱ ଓ ନୃବଂଶ ଦସ୍ତାବିଜରେ ପ୍ରମାଣିତ ନାମ',
      'তামিল-মালায়ালম ভাষাতাত্ত্বিক ও নৃতাত্ত্বিক নথিতে প্রত্যয়িত নাম'
    ),
    professionalCategoryNumbers: [3, 4, 5, 9],
    overview: m8(
      'Southern linguistic inflection documented in Tamil and Kerala ethnographic surveys (Thurston 1909; Iyer 1909), historically associated with structural granite masonry, temple tank excavation, road engineering, and architectural stonecraft.',
      'तमिल और केरल के नृवंशविज्ञान सर्वेक्षणों (थर्स्टन 1909; अय्यर 1909) में दर्ज दक्षिणी भाषाई रूप, जो ऐतिहासिक रूप से ग्रेनाइट पाषाण शिल्प, मंदिर पुष्करिणी निर्माण और मार्ग अभियांत्रिकी से जुड़ा है।',
      'తమిళనాడు మరియు కేరళ మానవశాస్త్ర సర్వేలలో (థర్స్టన్ 1909; అయ్యర్ 1909) నమోదైన దక్షిణ భారత నామ రూపం; ఆలయ పుష్కరిణులు, గ్రానైట్ రాతి నిర్మాణం మరియు రహదారి ఇంజనీరింగ్‌తో ప్రసిద్ధి చెందింది.',
      'ತಮಿಳುನಾಡು ಮತ್ತು ಕೇರಳದ ದಾಖಲೆಗಳಲ್ಲಿ (ಥರ್ಸ್ಟನ್ 1909) ಕಂಡುಬರುವ ದಕ್ಷಿಣ ಭಾರತದ ರೂಪ; ದೇವಾಲಯದ ಕಲ್ಯಾಣಿ ನಿರ್ಮಾಣ ಮತ್ತು ಗ್ರಾನೈಟ್ ಶಿಲ್ಪಕಲೆಗೆ ಹೆಸರಾಗಿದೆ.',
      'தமிழ்நாடு மற்றும் கேரள இனவரைவியல் ஆய்வுகளில் (தர்ஸ்டன் 1909; ஐயர் 1909) பதிவான பெயர்; கோயில் திருக்குளங்கள், கருங்கல் கட்டுமானம் மற்றும் சாலைப் பொறியியலுடன் தொடர்புடையது.',
      'तामिळनाडू आणि केरळमधील सर्वेक्षणांत (थर्स्टन १९०९) नोंदवलेले नाव; मंदिरांचे पुष्करिणी तलाव आणि ग्रॅनाइट दगडी बांधकामाशी संबंधित.',
      'ତାମିଲନାଡୁ ଓ କେରଳ ସର୍ବେକ୍ଷଣରେ (ଥର୍ଷ୍ଟନ ୧୯୦୯) ପ୍ରମାଣିତ ନାମ; ମନ୍ଦିର ପୁଷ୍କରିଣୀ ଓ ଗ୍ରାନାଇଟ୍ ପ୍ରସ୍ତର ନିର୍ମାଣ ସହ ସମ୍ପୃକ୍ତ।',
      'তামিলনাড়ু ও কেরালার জরিপে (থার্স্টন ১৯০৯) নথিবদ্ধ নাম; মন্দির পুষ্করিণী ও গ্রানাইট পাথর নির্মাণের সাথে যুক্ত।'
    ),
    linkedSynonymId: 'syn_ottar'
  },
  {
    id: 'comm_dir_09_vaddi',
    orderNumber: 9,
    canonicalName: 'Vaddi',
    localizedName: m8('Vaddi', 'वड्डी', 'వడ్డి', 'ವಡ್ಡಿ', 'வட்டி', 'वड्डी', 'ଭଡ୍ଡି', 'ভড্ডি'),
    nativeScripts: { Telugu: 'వడ్డి', Kannada: 'ವಡ್ಡಿ', Odia: 'ଭଡ୍ଡି', Devanagari: 'वड्डी' },
    categoryGroup: 'Deccan & Southern Designations',
    localizedCategoryGroup: m8(
      'Deccan & Southern Designations',
      'दक्कन एवं दक्षिण भारतीय नाम',
      'దక్కన్ & దక్షిణ భారత నామాలు',
      'ದಖನ್ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ಹೆಸರುಗಳು',
      'தக்காண மற்றும் தென்னிந்தியப் பெயர்கள்',
      'दख्खन आणि दक्षिण भारतीय नावे',
      'ଦାକ୍ଷିଣାତ୍ୟ ଓ ଦକ୍ଷିଣ ଭାରତୀୟ ନାମ',
      'দাক্ষিণাত্য ও দক্ষিণ ভারতীয় নাম'
    ),
    geographicalSpread: m8(
      'Andhra Pradesh (Srikakulam, Vizianagaram, Visakhapatnam, Godavari, Krishna, Guntur), Telangana, Southern Odisha',
      'आंध्र प्रदेश (श्रीकाकुलम, विजयनगरम, विशाखापत्तनम, गोदावरी, कृष्णा, गुंटूर), तेलंगाना एवं दक्षिणी ओडिशा',
      'ఆంధ్రప్రదేశ్ (శ్రీకాకుళం, విజయనగరం, విశాఖపట్నం, ఉభయ గోదావరి, కృష్ణా, గుంటూరు), తెలంగాణ, దక్షిణ ఒడిశా',
      'ಆಂಧ್ರಪ್ರದೇಶ (ಶ್ರೀಕಾಕುಳಂ, ವಿಜಯನಗರಂ, ವಿಶಾಖಪಟ್ಟಣಂ, ಗೋದಾವರಿ, ಕೃಷ್ಣಾ, ಗುಂಟೂರು), ತೆಲಂಗಾಣ ಮತ್ತು ದಕ್ಷಿಣ ಒಡಿಶಾ',
      'ஆந்திரப் பிரதேசம் (ஸ்ரீகாகுளம், விஜயநகரம், விசாகப்பட்டினம், கோதாவரி, கிருஷ்ணா, குண்டூர்), தெலுங்கானா',
      'आंध्र प्रदेश (श्रीकाकुलम, विजयनगरम, गोदावरी, कृष्णा, गुंटूर), तेलंगणा आणि दक्षिण ओडिशा',
      'ଆନ୍ଧ୍ର ପ୍ରଦେଶ (ଶ୍ରୀକାକୁଲମ, ବିଜୟନଗରମ, ଗୋଦାବରୀ, କୃଷ୍ଣା, ଗୁଣ୍ଟୁର), ତେଲେଙ୍ଗାନା ଓ ଦକ୍ଷିଣ ଓଡ଼ିଶା',
      'অন্ধ্র প্রদেশ (শ্রীকাকুলাম, বিজয়নগরম, গোদাবরী, কৃষ্ণা, গুন্টুর), তেলেঙ্গানা ও দক্ষিণ ওড়িশা'
    ),
    prominentStates: ['Andhra Pradesh', 'Telangana', 'Odisha'],
    epistemicClassification: m8(
      'Phonetic Telugu/Deccan Evolution of Odra -> Oddi -> Vaddi (Labial W/V Shift)',
      'ओड्र -> ओड्डी -> वड्डी का तेलुगु/दक्कनी ध्वन्यात्मक विकास (ओष्ठ्य व-कार परिवर्तन)',
      'ఓడ్ర -> ఒడ్డి -> వడ్డి అనే ద్రావిడ/తెలుగు ధ్వని పరిణామ రూపం',
      'ಓಡ್ರ -> ಒಡ್ಡಿ -> ವಡ್ಡಿ ಎಂಬ ದ್ರಾವಿಡ/ತೆಲುಗು ಧ್ವನಿ பரிಣಾಮ ರೂಪ',
      'ஒட்ர -> ஒட்டி -> வட்டி என்ற திராவிட மொழியியல் ஒலி மாற்ற வடிவம்',
      'ओड्र -> ओड्डी -> वड्डी हा तेलुगू/दख्खनी ध्वन्यात्मक बदल',
      'ଓଡ଼୍ର -> ଓడ్డి -> ଭଡ୍ଡି (ତେଲୁଗୁ/ଦାକ୍ଷିଣାତ୍ୟ ଧ୍ୱନିଗତ ପରିବର୍ତ୍ତନ)',
      'ওড্র -> ওড্ডি -> ভড্ডি (তেলুগু/দাক্ষিণাত্য ধ্বনিগত বিবর্তন)'
    ),
    professionalCategoryNumbers: [1, 2, 3, 8, 9],
    overview: m8(
      'Illustrates the classic South Indian phonological shift where initial "O" acquires a labial glide "V/W" (Odra -> Oddi -> Vaddi). Prominent across Coastal Andhra and Kolleru-Upputeru basins with traditions of Gajapathi fort service, agriculture, and hydraulic works.',
      'दक्षिण भारतीय ध्वन्यात्मक नियम (प्रारंभिक "ओ" का "व" में परिवर्तन: ओड्र -> ओड्डी -> वड्डी) का प्रमुख उदाहरण। तटीय आंध्र और कोल्लेरू क्षेत्र में गजपति दुर्ग सेवा, कृषि और जल-संरचना से जुड़ा समुदाय।',
      'దక్షిణ భారత భాషా సూత్రం ప్రకారం "ఓ" ధ్వని "వ"గా మారడం వల్ల (ఓడ్ర -> ఒడ్డి -> వడ్డి) ఏర్పడిన నామం. కోస్తా ఆంధ్ర మరియు కొల్లేరు ప్రాంతంలో గజపతి దుర్గ రక్షణ, వ్యవసాయం మరియు జల వనరుల నిర్మాణంతో ముడిపడి ఉంది.',
      'ದಕ್ಷಿಣ ಭಾರತದ ಭಾಷಾ ನಿಯಮದಂತೆ "ಓ" ಧ್ವನಿಯು "ವ" ಆಗಿ ಬದಲಾದ ರೂಪ (ಓಡ್ರ -> ಒಡ್ಡಿ -> ವಡ್ಡಿ). ಕರಾವಳಿ ಆಂಧ್ರ ಮತ್ತು ಕೊಲ್ಲೇರು ಪ್ರದೇಶದಲ್ಲಿ ಗಜಪತಿ ಕೋಟೆ ಸೇವೆ ಮತ್ತು ಕೃಷಿಯೊಂದಿಗೆ ಗುರುತಿಸಿಕೊಂಡಿದೆ.',
      'தென்னிந்திய மொழியியல் விதியின்படி "ஒ" என்பது "வ" என மாறிய வடிவம் (ஒட்ர -> ஒட்டி -> வட்டி). கடலோர ஆந்திரா மற்றும் கொல்லேரு பகுதியில் கஜபதி கோட்டைச் சேவை மற்றும் வேளாண்மையுடன் தொடர்புடையது.',
      'दक्षिण भारतीय भाषिक नियमानुसार "ओ" चे "व" मध्ये रूपांतर होऊन (ओड्र -> ओड्डी -> वड्डी) तयार झालेले नाव; किनारी आंध्र व कोल्लेरू भागात गजपती दुर्ग सेवा व शेतीशी संबंधित.',
      'ଦକ୍ଷିଣ ଭାରତୀୟ ଭାଷା ନିୟମ ଅନୁସାରେ "ଓ" ଧ୍ୱନି "ଭ/ୱ" ରେ ପରିବର୍ତ୍ତିତ ରୂପ (ଓଡ଼୍ର -> ଓడ్డి -> ଭଡ୍ଡି); ଉପକୂଳ ଆନ୍ଧ୍ର ଓ କୋଲ୍ଲେରୁ ଅଞ୍ଚଳରେ ଗଜପତି ଦୁର୍ଗ ସେବା ଓ କୃଷି ସହ ଜଡ଼ିତ।',
      'দক্ষিণ ভারতীয় ভাষাতাত্ত্বিক নিয়মে "ও" ধ্বনির "ভ/ওয়"-তে রূপান্তর (ওড্র -> ওড্ডি -> ভড্ডি); উপকূলীয় অন্ধ্র ও কোল্লেরু অঞ্চলে গজপতি দুর্গ সেবা ও কৃষির সাথে যুক্ত।'
    ),
    linkedSynonymId: 'syn_odde_vadde'
  },
  {
    id: 'comm_dir_10_vaddera',
    orderNumber: 10,
    canonicalName: 'Vaddera',
    localizedName: m8('Vaddera', 'वड्डेरा', 'వడ్డెర', 'ವಡ್ಡೇರ', 'வட்டேரா', 'वड्डेरा', 'ଭଡ୍ଡେରା', 'ভড্ডেরা'),
    nativeScripts: { Telugu: 'వడ్డెర', Kannada: 'ವಡ್ಡೇರ', Devanagari: 'वड्डेरा', Odia: 'ଭଡ୍ଡେରା' },
    categoryGroup: 'Deccan & Southern Designations',
    localizedCategoryGroup: m8(
      'Deccan & Southern Designations',
      'दक्कन एवं दक्षिण भारतीय नाम',
      'దక్కన్ & దక్షిణ భారత నామాలు',
      'ದಖನ್ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ಹೆಸರುಗಳು',
      'தக்காண மற்றும் தென்னிந்தியப் பெயர்கள்',
      'दख्खन आणि दक्षिण भारतीय नावे',
      'ଦାକ୍ଷିଣାତ୍ୟ ଓ ଦକ୍ଷିଣ ଭାରତୀୟ ନାମ',
      'দাক্ষিণাত্য ও দক্ষিণ ভারতীয় নাম'
    ),
    geographicalSpread: m8(
      'Telangana, Andhra Pradesh (Rayalaseema, Palnadu, Coastal Andhra), Border districts of Karnataka & Maharashtra',
      'तेलंगाना, आंध्र प्रदेश (रायलसीमा, पलनाडु, तटीय आंध्र) तथा कर्नाटक व महाराष्ट्र के सीमावर्ती जिले',
      'తెలంగాణ, ఆంధ్రప్రదేశ్ (రాయలసీమ, పల్నాడు, కోస్తా ఆంధ్ర), కర్ణాటక & మహారాష్ట్ర సరిహద్దు జిల్లాలు',
      'ತೆಲಂಗಾಣ, ಆಂಧ್ರಪ್ರದೇಶ (ರಾಯಲಸೀಮೆ, ಪಲ್ನಾಡು, ಕರಾವಳಿ ಆಂಧ್ರ) ಮತ್ತು ಕರ್ನಾಟಕ ಗಡಿ ಜಿಲ್ಲೆಗಳು',
      'தெலுங்கானா, ஆந்திரப் பிரதேசம் (ராயலசீமா, பல்நாடு, கடலோர ஆந்திரா) மற்றும் கர்நாடக எல்லை மாவட்டங்கள்',
      'तेलंगणा, आंध्र प्रदेश (रायलसीमा, पलनाडू) आणि कर्नाटक-महाराष्ट्र सीमाभाग',
      'ତେଲେଙ୍ଗାନା, ଆନ୍ଧ୍ର ପ୍ରଦେଶ (ରାୟଲସୀମା, ପଲନାଡୁ, ଉପକୂଳ ଆନ୍ଧ୍ର) ଓ କର୍ଣ୍ଣାଟକ ସୀମାନ୍ତ',
      'তেলেঙ্গানা, অন্ধ্র প্রদেশ (রায়লসীমা, পলনাড়ু, উপকূলীয় অন্ধ্র) ও কর্ণাটক সীমান্ত'
    ),
    prominentStates: ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Maharashtra'],
    epistemicClassification: m8(
      'Officially Gazetted & Historically Documented Deccan Community Designation',
      'आधिकारिक गजेटियर एवं ऐतिहासिक रूप से प्रमाणित दक्कन समुदाय नाम',
      'అధికారిక గెజిటియర్ మరియు చారిత్రక ఆధారాలతో నమోదైన దక్కన్ సమాజ నామం',
      'ಅಧಿಕೃತ ಗೆಜೆಟಿಯರ್ ಮತ್ತು ಐತಿಹಾಸಿಕವಾಗಿ ದಾಖಲಾದ ದಖನ್ ಸಮುದಾಯದ ಹೆಸರು',
      'அதிகாரப்பூர்வ அரசிதழ் மற்றும் வரலாற்று ரீதியாகப் பதிவான தக்காணச் சமூகப் பெயர்',
      'अधिकृत गॅझेटियर आणि ऐतिहासिकदृष्ट्या प्रमाणित दख्खन समाज नाव',
      'ସରକାରୀ ଗେଜେଟିୟର ଓ ଐତିହାସିକ ଭାବେ ପ୍ରମାଣିତ ଦାକ୍ଷିଣାତ୍ୟ ସମାଜ ନାମ',
      'সরকারি গেজেটিয়ার ও ঐতিহাসিকভাবে নথিবদ্ধ দাক্ষিণাত্য সম্প্রদায় নাম'
    ),
    professionalCategoryNumbers: [1, 2, 3, 4, 5, 7, 9],
    overview: m8(
      'Widespread Telugu designation across Telangana and Andhra Pradesh. Renowned in Kakatiya, Reddi, Gajapathi, Vijayanagara, and Qutb Shahi eras as master builders of hill forts (Kondavidu, Golconda, Gooty, Gandikota), Cheruvu irrigation tanks, temple stone masonry, and modern infrastructure.',
      'तेलंगाना और आंध्र प्रदेश में व्यापक रूप से प्रचलित नाम। काकतीय, रेड्डी, गजपति, विजयनगर और कुतुब शाही काल में गिरि-दुर्गों (कोंडावीडु, गोलकोंडा, गुत्ती, गंडीकोटा), चेरुवु जलाशयों, मंदिर पाषाण शिल्प और आधुनिक आधारभूत संरचना के प्रमुख निर्माता।',
      'తెలంగాణ మరియు ఆంధ్రప్రదేశ్‌లలో విస్తృతంగా ఉన్న సమాజ నామం. కాకతీయ, రెడ్డి, గజపతి, విజయనగర, కుతుబ్ షాహీ కాలాలలో కొండవీడు, గోల్కొండ, గుత్తి, గండికోట వంటి గిరి దుర్గాలు, చెరువులు, దేవాలయ రాతి కట్టడాలు మరియు ఆధునిక ప్రాజెక్టుల నిర్మాణంలో ప్రసిద్ధి చెందారు.',
      'ತೆಲಂಗಾಣ ಮತ್ತು ಆಂಧ್ರಪ್ರದೇಶದಲ್ಲಿ ವ್ಯಾಪಕವಾಗಿರುವ ಹೆಸರು. ಕಾಕತೀಯ, ಗಜಪತಿ, ವಿಜಯನಗರ ಕಾಲದಲ್ಲಿ ಕೊಂಡವೀಡು, ಗೋಲ್ಕೊಂಡ, ಗಂಡಿಕೋಟೆಗಳಂತಹ ಕೋಟೆಗಳು, ಕೆರೆಗಳು ಮತ್ತು ದೇವಾಲಯಗಳ ನಿರ್ಮಾಣದಲ್ಲಿ ಪ್ರಮುಖ ಪಾತ್ರ ವಹಿಸಿದ್ದಾರೆ.',
      'தெலுங்கானா மற்றும் ஆந்திராவில் பரவலாக உள்ள பெயர். காகதியர், கஜபதி, விஜயநகர காலங்களில் கொண்டவீடு, கோல்கொண்டா, கண்டிகோட்டை போன்ற மலைக்கோட்டைகள், ஏரிகள் மற்றும் கோயில் கற்கட்டுமானங்களை உருவாக்கியவர்கள்.',
      'तेलंगणा आणि आंध्र प्रदेशातील प्रमुख नाव. काकतीय, गजपती, विजयनगर काळात कोंडावीडू, गोलकोंडा, गंडीकोटा किल्ले, तलाव आणि मंदिरांच्या दगडी बांधकामाचे मुख्य शिल्पकार.',
      'ତେଲେଙ୍ଗାନା ଓ ଆନ୍ଧ୍ର ପ୍ରଦେଶରେ ସୁপরিଚିତ ନାମ। କାକତୀୟ, ଗଜପତି ଓ ବିଜୟନଗର କାଳରେ କୋଣ୍ଡାଭିଡୁ, ଗୋଲକୋଣ୍ଡା, ଗଣ୍ଡିକୋଟା ଦୁର୍ଗ, ଜଳାଶୟ ଓ ମନ୍ଦିର ନିର୍ମାଣରେ ପ୍ରମୁଖ ଭୂମିକା ନେଇଥିଲେ।',
      'তেলেঙ্গানা ও অন্ধ্র প্রদেশে সুপরিচিত নাম। কাকতীয়, গজপতি ও বিজয়নগর আমলে কোন্ডাভিডু, গোলকুন্ডা, গণ্ডিকোটা দুর্গ, জলাশয় ও মন্দির নির্মাণে প্রধান ভূমিকা পালন করেছিলেন।'
    ),
    linkedSynonymId: 'syn_odde_vadde'
  },
  {
    id: 'comm_dir_11_vaddeelu',
    orderNumber: 11,
    canonicalName: 'Vaddeelu',
    localizedName: m8('Vaddeelu', 'वड्डीलु', 'వడ్డీలు', 'ವಡ್ಡೀಲು', 'வட்டீலு', 'वड्डीलु', 'ଭଡ୍ଡୀଲୁ', 'ভড্ডীলু'),
    nativeScripts: { Telugu: 'వడ్డీలు', Kannada: 'ವಡ್ಡೀಲು', Devanagari: 'वड्डीलु', Odia: 'ଭଡ୍ଡୀଲୁ' },
    categoryGroup: 'Deccan & Southern Designations',
    localizedCategoryGroup: m8(
      'Deccan & Southern Designations',
      'दक्कन एवं दक्षिण भारतीय नाम',
      'దక్కన్ & దక్షిణ భారత నామాలు',
      'ದಖನ್ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ಹೆಸರುಗಳು',
      'தக்காண மற்றும் தென்னிந்தியப் பெயர்கள்',
      'दख्खन आणि दक्षिण भारतीय नावे',
      'ଦାକ୍ଷିଣାତ୍ୟ ଓ ଦକ୍ଷିଣ ଭାରତୀୟ ନାମ',
      'দাক্ষিণাত্য ও দক্ষিণ ভারতীয় নাম'
    ),
    geographicalSpread: m8(
      'Andhra Pradesh (Coastal Andhra, Rayalaseema) & Telangana',
      'आंध्र प्रदेश (तटीय आंध्र, रायलसीमा) एवं तेलंगाना',
      'ఆంధ్రప్రదేశ్ (కోస్తా ఆంధ్ర, రాయలసీమ) & తెలంగాణ',
      'ಆಂಧ್ರಪ್ರದೇಶ (ಕರಾವಳಿ ಆಂಧ್ರ, ರಾಯಲಸೀಮೆ) ಮತ್ತು ತೆಲಂಗಾಣ',
      'ஆந்திரப் பிரதேசம் (கடலோர ஆந்திரா, ராயலசீமா) மற்றும் தெலுங்கானா',
      'आंध्र प्रदेश (किनारी आंध्र, रायलसीमा) आणि तेलंगणा',
      'ଆନ୍ଧ୍ର ପ୍ରଦେଶ (ଉପକୂଳ ଆନ୍ଧ୍ର, ରାୟଲସୀମା) ଓ ତେଲେଙ୍ଗାନା',
      'অন্ধ্র প্রদেশ (উপকূলীয় অন্ধ্র, রায়লসীমা) ও তেলেঙ্গানা'
    ),
    prominentStates: ['Andhra Pradesh', 'Telangana'],
    epistemicClassification: m8(
      'Respectful Plural Telugu Designation (-lu Honorific Plural Suffix)',
      'आदरसूचक बहुवचन तेलुगु समुदाय नाम (-लु प्रत्यय)',
      'గౌరవ బహువచన తెలుగు సామాజిక నామం (-లు ప్రత్యయం)',
      'ಗೌರವ ಬಹುವಚನ ತೆಲುಗು ಸಮುದಾಯ ನಾಮ (-ಲು ಪ್ರತ್ಯಯ)',
      'மரியாதைப் பன்மை தெலுங்கு சமூகப் பெயர் (-லு விகுதி)',
      'आदरार्थी बहुवचनी तेलुगू समाज नाव (-लु प्रत्यय)',
      'ସମ୍ମାନସୂଚକ ବହୁବଚନ ତେଲୁଗୁ ସମାଜ ନାମ (-ଲୁ ପ୍ରତ୍ୟୟ)',
      'সম্মানসূচক বহুবচন তেলুগু সম্প্রদায় নাম (-লু প্রত্যয়)'
    ),
    professionalCategoryNumbers: [1, 2, 3, 8],
    overview: m8(
      'Traditional Telugu collective/honorific plural form (Vaddi + lu -> Vaddeelu) used in regional revenue records, village settlements, and oral histories across Andhra and Telangana.',
      'आंध्र और तेलंगाना के क्षेत्रीय राजस्व अभिलेखों, ग्रामीण बस्तियों और मौखिक इतिहास में प्रयुक्त पारंपरिक तेलुगु आदरसूचक बहुवचन रूप (वड्डी + लु -> वड्डीलु)।',
      'ఆంధ్ర మరియు తెలంగాణ ప్రాంతీయ రెవెన్యూ రికార్డులు, గ్రామ చరిత్రలు మరియు మౌఖిక సాహిత్యంలో ఉపయోగించే సాంప్రదాయ గౌరవ బహువచన రూపం (వడ్డి + లు -> వడ్డీలు).',
      'ಆಂಧ್ರ ಮತ್ತು ತೆಲಂಗಾಣದ ಪ್ರಾದೇಶಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ಜನಪದ ಇತಿಹಾಸದಲ್ಲಿ ಬಳಸಲಾಗುವ ಗೌರವ ಬಹುವಚನ ರೂಪ (ವಡ್ಡಿ + ಲು -> ವಡ್ಡೀಲು).',
      'ஆந்திரா மற்றும் தெலுங்கானாவின் வருவாய் ஆவணங்கள் மற்றும் வாய்மொழி வரலாற்றில் பயன்படுத்தப்படும் மரியாதைப் பன்மை வடிவம் (வட்டி + லு -> வட்டீலு).',
      'आंध्र आणि तेलंगणातील महसूल नोंदी व मौखिक इतिहासात वापरले जाणारे पारंपरिक आदरार्थी बहुवचनी रूप (वड्डी + लु -> वड्डीलु).',
      'ଆନ୍ଧ୍ର ଓ ତେଲେଙ୍ଗାନାର ରାଜସ୍ୱ ଦସ୍ତାବିଜ ଓ ମୌଖିକ ଇତିହାସରେ ବ୍ୟବହୃତ ସମ୍ମାନସୂଚକ ବହୁବଚନ ରୂପ (ଭଡ୍ଡି + ଲୁ -> ଭଡ୍ଡୀଲୁ)।',
      'অন্ধ্র ও তেলেঙ্গানার রাজস্ব নথি ও মৌখিক ইতিহাসে ব্যবহৃত সম্মানসূচক বহুবচন রূপ (ভড্ডি + লু -> ভড্ডীলু)।'
    ),
    linkedSynonymId: 'syn_odde_vadde'
  },
  {
    id: 'comm_dir_12_vaddirajulu',
    orderNumber: 12,
    canonicalName: 'VaddiRajulu',
    localizedName: m8('VaddiRajulu', 'वड्डीराजुलु', 'వడ్డిరాజులు', 'ವಡ್ಡಿರಾಜುಲು', 'வட்டிராஜுலு', 'वड्डीराजुलु', 'ଭଡ୍ଡିରାଜୁଲୁ', 'ভড্ডিরাজুলু'),
    nativeScripts: { Telugu: 'వడ్డిరాజులు', Kannada: 'ವಡ್ಡಿರಾಜುಲು', Devanagari: 'वड्डीराजुलु', Odia: 'ଭଡ୍ଡିରାଜୁଲୁ' },
    categoryGroup: 'Dynastic & Royal Lineages',
    localizedCategoryGroup: m8(
      'Dynastic & Royal Lineages',
      'राजवंशीय एवं क्षत्रिय वंश',
      'రాజవంశ మరియు క్షత్రియ వంశాలు',
      'ರಾಜವಂಶೀಯ ಮತ್ತು ಕ್ಷತ್ರಿಯ ಪರಂಪರೆ',
      'அரச வம்ச மற்றும் க்ஷத்ரிய மரபுகள்',
      'राजवंशीय आणि क्षत्रिय घराणी',
      'ରାଜବଂଶୀୟ ଓ କ୍ଷତ୍ରିୟ ବଂଶ',
      'রাজবংশীয় ও ক্ষত্রিয় বংশ'
    ),
    geographicalSpread: m8(
      'Andhra Pradesh (Kolleru Lake Basin, Eluru, West Godavari, Krishna, Guntur, Visakhapatnam, Vizianagaram)',
      'आंध्र प्रदेश (कोल्लेरू झील क्षेत्र, एलुरु, पश्चिम गोदावरी, कृष्णा, गुंटूर, विशाखापत्तनम, विजयनगरम)',
      'ఆంధ్రప్రదేశ్ (కొల్లేరు సరస్సు ప్రాంతం, ఏలూరు, పశ్చిమ గోదావరి, కృష్ణా, గుంటూరు, విశాఖపట్నం, విజయనగరం)',
      'ಆಂಧ್ರಪ್ರದೇಶ (ಕೊಲ್ಲೇರು ಸರೋವರ ಪ್ರದೇಶ, ಏಲೂರು, ಪಶ್ಚಿಮ ಗೋದಾವರಿ, ಕೃಷ್ಣಾ, ಗುಂಟೂರು, ವಿಶಾಖಪಟ್ಟಣಂ)',
      'ஆந்திரப் பிரதேசம் (கொல்லேரு ஏரிப் பகுதி, ஏலூரு, மேற்கு கோதாவரி, கிருஷ்ணா, குண்டூர், விசாகப்பட்டினம்)',
      'आंध्र प्रदेश (कोल्लेरू सरोवर परिसर, एलुरु, पश्चिम गोदावरी, कृष्णा, गुंटूर, विशाखापट्टणम)',
      'ଆନ୍ଧ୍ର ପ୍ରଦେଶ (କୋଲ୍ଲେରୁ ହ୍ରଦ ଅଞ୍ଚଳ, ଏଲୁରୁ, ପଶ୍ଚିମ ଗୋଦାବରୀ, କୃଷ୍ଣା, ଗୁଣ୍ଟୁର, ବିଶାଖାପାଟଣା)',
      'অন্ধ্র প্রদেশ (কোল্লেরু হ্রদ অঞ্চল, এলুরু, পশ্চিম গোদাবরী, কৃষ্ণা, গুন্টুর, বিশাখাপত্তনম)'
    ),
    prominentStates: ['Andhra Pradesh', 'Telangana', 'Karnataka'],
    epistemicClassification: m8(
      'Epigraphically & Regionally Attested Martial/Royal Lineage Title (Balavaddiraju Viragal & Kolletikota)',
      'अभिलेखीय एवं क्षेत्रीय रूप से प्रमाणित क्षत्रिय/सामरिक उपाधि (बालवड्डीराजू वीरगल एवं कोल्लेतिकोटा)',
      'శాసన మరియు చారిత్రక ఆధారాలతో నమోదైన క్షత్రియ నామం (బాలవడ్డిరాజు వీరగల్లు & కొల్లేటికోట)',
      'ಶಾಸನ ಮತ್ತು ಪ್ರಾದೇಶಿಕವಾಗಿ ದಾಖಲಾದ ಕ್ಷತ್ರಿಯ ನಾಮ (ಬಾಲವಡ್ಡಿರಾಜು ವೀರಗಲ್ಲು ಮತ್ತು ಕೊಲ್ಲೇಟಿಕೋಟ)',
      'கல்வெட்டு மற்றும் வரலாற்றுச் சான்று பெற்ற க்ஷத்ரியப் பெயர் (பாலவட்டிராஜு வீரக்கல் & கொல்லேட்டிகோட்டா)',
      'शिलालेखीय व प्रादेशिक पुराव्यांनी सिद्ध क्षत्रिय पदवी (बालवड्डीराजू वीरगळ व कोल्लेतिकोटा)',
      'ଶିଳାଲେଖ ଓ ଆଞ୍ଚଳିକ ଭାବେ ପ୍ରମାଣିତ କ୍ଷତ୍ରିୟ ଉପାଧି (ବାଳଭଡ୍ଡିରାଜୁ ବୀରଗଲ୍ ଓ କୋଲ୍ଲେତିକୋଟା)',
      'শিলালিপি ও আঞ্চলিকভাবে প্রত্যয়িত ক্ষত্রিয় উপাধি (বালভড্ডিরাজু বীরগল ও কোল্লেতিকোটা)'
    ),
    professionalCategoryNumbers: [1, 2, 8],
    overview: m8(
      'Combines Vaddi (from Odra/Oddi) with the Telugu Kshatriya suffix "-Rajulu". Strongly linked to the Suryavamsha Gajapathi water-fortress of Kolletikota, Sri Peddintlamma worship, and Deccan hero-stone (Balavaddiraju) martial traditions.',
      'वड्डी (ओड्र/ओड्डी से) और तेलुगु क्षत्रिय प्रत्यय "-राजुलु" का संयोजन। सूर्यवंशी गजपति जल-दुर्ग कोल्लेतिकोटा, श्री पेद्दिंट्लम्मा आराधना और दक्कन वीरगल (बालवड्डीराजू) की सामरिक परंपरा से गहराई से संबद्ध।',
      'వడ్డి (ఓడ్ర/ఒడ్డి) మరియు తెలుగు క్షత్రియ ప్రత్యయం "-రాజులు" కలయిక. సూర్యవంశ గజపతుల జలదుర్గం కొల్లేటికోట, శ్రీ పెద్దింట్లమ్మ ఆరాధన మరియు బాలవడ్డిరాజు వీరగల్లు సైనిక సంప్రదాయాలతో ముడిపడి ఉంది.',
      'ವಡ್ಡಿ (ಓಡ್ರ/ಒಡ್ಡಿ) ಮತ್ತು ತೆಲುಗು ಕ್ಷತ್ರಿಯ ಪ್ರತ್ಯಯ "-ರಾಜುಲು" ಸಂಯೋಜನೆ. ಸೂರ್ಯವಂಶ ಗಜಪತಿಗಳ ಜಲದುರ್ಗ ಕೊಲ್ಲೇಟಿಕೋಟ, ಶ್ರೀ ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ಆರಾಧನೆ ಮತ್ತು ಬಾಲವಡ್ಡಿರಾಜು ವೀರಗಲ್ಲು ಪರಂಪರೆಗೆ ಸಂಬಂಧಿಸಿದೆ.',
      'வட்டி (ஒட்ர/ஒட்டி) மற்றும் தெலுங்கு க்ஷத்ரிய விகுதி "-ராஜுலு" இணைந்த பெயர். சூர்யவம்ச கஜபதிகளின் நீர்க்கோட்டையான கொல்லேட்டிகோட்டா, பெத்திண்ட்லம்மா வழிபாடு மற்றும் பாலவட்டிராஜு வீரக்கல் மரபுடன் தொடர்புடையது.',
      'वड्डी (ओड्र/ओड्डी) आणि तेलुगू क्षत्रिय प्रत्यय "-राजुलु" यांचा संयोग. सूर्यवंशी गजपतींचा जलदुर्ग कोल्लेतिकोटा, श्री पेद्दिंट्लम्मा उपासना आणि बालवड्डीराजू वीरगळ परंपरेशी संबंधित.',
      'ଭଡ୍ଡି (ଓଡ଼୍ର/ଓడ్డి) ଓ ତେଲୁଗୁ କ୍ଷତ୍ରିୟ ପ୍ରତ୍ୟୟ "-ରାଜୁଲୁ" ର ମିଶ୍ରଣ। ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତିଙ୍କ ଜଳ-ଦୁର୍ଗ କୋଲ୍ଲେତିକୋଟା, ଶ୍ରୀ ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ପୂଜା ଓ ବାଳଭଡ୍ଡିରାଜୁ ବୀରଗଲ୍ ପରମ୍ପରା ସହ ସମ୍ପୃକ୍ତ।',
      'ভড্ডি (ওড্র/ওড্ডি) এবং তেলুগু ক্ষত্রিয় প্রত্যয় "-রাজুলু"-র সমন্বয়। সূর্যবংশী গজপতিদের জলদুর্গ কোল্লেতিকোটা, শ্রী পেদ্দিণ্টলম্মা পূজা ও বালভড্ডিরাজু বীরগল ঐতিহ্যের সাথে যুক্ত।'
    ),
    linkedSynonymId: 'syn_odderajulu'
  },
  {
    id: 'comm_dir_13_vadderarajulu',
    orderNumber: 13,
    canonicalName: 'VadderaRajulu',
    localizedName: m8('VadderaRajulu', 'वड्डेराराजुलु', 'వడ్డెరరాజులు', 'ವಡ್ಡೇರರಾಜುಲು', 'வட்டேராராஜுலு', 'वड्डेराराजुलु', 'ଭଡ୍ଡେରାରାଜୁଲୁ', 'ভড্ডেরারাজুলু'),
    nativeScripts: { Telugu: 'వడ్డెరరాజులు', Kannada: 'ವಡ್ಡೇರರಾಜುಲು', Devanagari: 'वड्डेराराजुलु', Odia: 'ଭଡ୍ଡେରାରାଜୁଲୁ' },
    categoryGroup: 'Dynastic & Royal Lineages',
    localizedCategoryGroup: m8(
      'Dynastic & Royal Lineages',
      'राजवंशीय एवं क्षत्रिय वंश',
      'రాజవంశ మరియు క్షత్రియ వంశాలు',
      'ರಾಜವಂಶೀಯ ಮತ್ತು ಕ್ಷತ್ರಿಯ ಪರಂಪರೆ',
      'அரச வம்ச மற்றும் க்ஷத்ரிய மரபுகள்',
      'राजवंशीय आणि क्षत्रिय घराणी',
      'ରାଜବଂଶୀୟ ଓ କ୍ଷତ୍ରିୟ ବଂଶ',
      'রাজবংশীয় ও ক্ষত্রিয় বংশ'
    ),
    geographicalSpread: m8(
      'Andhra Pradesh (Rayalaseema, Nellore, Prakasam, Guntur, Krishna) & Telangana',
      'आंध्र प्रदेश (रायलसीमा, नेल्लोर, प्रकाशम, गुंटूर, कृष्णा) एवं तेलंगाना',
      'ఆంధ్రప్రదేశ్ (రాయలసీమ, నెల్లూరు, ప్రకాశం, గుంటూరు, కృష్ణా) & తెలంగాణ',
      'ಆಂಧ್ರಪ್ರದೇಶ (ರಾಯಲಸೀಮೆ, ನೆಲ್ಲೂರು, ಪ್ರಕಾಶಂ, ಗುಂಟೂರು, ಕೃಷ್ಣಾ) ಮತ್ತು ತೆಲಂಗಾಣ',
      'ஆந்திரப் பிரதேசம் (ராயலசீமா, நெல்லூர், பிரகாசம், குண்டூர், கிருஷ்ணா) மற்றும் தெலுங்கானா',
      'आंध्र प्रदेश (रायलसीमा, नेल्लोर, प्रकाशम, गुंटूर, कृष्णा) आणि तेलंगणा',
      'ଆନ୍ଧ୍ର ପ୍ରଦେଶ (ରାୟଲସୀମା, ନେల్లୋର, ପ୍ରକାଶମ, ଗୁଣ୍ଟୁର, କୃଷ୍ଣା) ଓ ତେଲେଙ୍ଗାନା',
      'অন্ধ্র প্রদেশ (রায়লসীমা, নেলোর, প্রকাশম, গুন্টুর, কৃষ্ণা) ও তেলেঙ্গানা'
    ),
    prominentStates: ['Andhra Pradesh', 'Telangana', 'Karnataka'],
    epistemicClassification: m8(
      'Traditional Deccan Chieftaincy & Martial-Engineering Lineage Title',
      'पारंपरिक दक्कन सामंत एवं दुर्ग-अभियांत्रिकी क्षत्रिय उपाधि',
      'సాంప్రదాయ దక్కన్ దుర్గ-నిర్మాణ మరియు క్షత్రియ నాయకత్వ వంశ నామం',
      'ಸಾಂಪ್ರದಾಯಿಕ ದಖನ್ ಕೋಟೆ-ನಿರ್ಮಾಣ ಮತ್ತು ಕ್ಷತ್ರಿಯ ನಾಯಕತ್ವದ ವಂಶ ನಾಮ',
      'பாரம்பரிய தக்காண கோட்டைப் பொறியியல் மற்றும் க்ஷத்ரியத் தலைமைப் பெயர்',
      'पारंपरिक दख्खन दुर्ग-अभियांत्रिकी आणि क्षत्रिय सरदार घराण्याचे नाव',
      'ପାରମ୍ପରିକ ଦାକ୍ଷିଣାତ୍ୟ ଦୁର୍ଗ-ନିର୍ମାଣ ଓ କ୍ଷତ୍ରିୟ ନେତୃତ୍ୱ ବଂଶ ନାମ',
      'ঐতিহ্যবাহী দাক্ষিণাত্য দুর্গ-প্রকৌশল ও ক্ষত্রিয় নেতৃত্ব বংশ নাম'
    ),
    professionalCategoryNumbers: [1, 3, 5, 7, 8],
    overview: m8(
      'Honorific royal/martial lineage designation among Vaddera families descended from fortress commanders, royal quarry masters, and Vijayanagara-Gajapathi military contractors in the Deccan.',
      'दक्कन में दुर्ग कमांडरों, राजकीय पाषाण-शिल्प प्रमुखों और विजयनगर-गजपति सैन्य अभियंताओं के वंशज वड्डेरा परिवारों में प्रचलित राजवंशीय/क्षत्रिय उपाधि।',
      'దక్కన్ ప్రాంతంలో దుర్గ రక్షకులు, రాజ శిల్ప ప్రధానులు మరియు విజయనగర-గజపతి సైనిక ఇంజనీర్ల వారసులైన వడ్డెర కుటుంబాలలో వ్యవహరించబడే క్షత్రియ గౌరవ నామం.',
      'ದಖನ್ ಪ್ರದೇಶದಲ್ಲಿ ಕೋಟೆ ದಂಡನಾಯಕರು ಮತ್ತು ವಿಜಯನಗರ-ಗಜಪತಿ ಸೇನಾ ಎಂಜಿನಿಯರ್‌ಗಳ ವಂಶಸ್ಥರಾದ ವಡ್ಡೇರ ಕುಟುಂಬಗಳಲ್ಲಿ ಬಳಕೆಯಲ್ಲಿರುವ ಕ್ಷತ್ರಿಯ ಗೌರವ ನಾಮ.',
      'தக்காணத்தில் கோட்டைத் தளபதிகள் மற்றும் விஜயநகர-கஜபதி படைப் பொறியாளர்களின் வழித்தோன்றல்களான வட்டேரா குடும்பங்களின் க்ஷத்ரியப் பட்டப்பெயர்.',
      'दख्खनमधील किल्लेदार, राजशिल्पी आणि विजयनगर-गजपती लष्करी अभियंत्यांच्या वंशज असलेल्या वड्डेरा कुटुंबांतील क्षत्रिय सन्मानदर्शक नाव.',
      'ଦାକ୍ଷିଣାତ୍ୟରେ ଦୁର୍ଗପତି ଓ ବିଜୟନଗର-ଗଜପତି ସାମରିକ ଇଞ୍ଜିନିୟରଙ୍କ ବଂଶধର ଭଡ୍ଡେରା ପରିବାରଙ୍କ ମଧ୍ୟରେ ପ୍ରଚଳିତ କ୍ଷତ୍ରିୟ ଉପାଧି।',
      'দাক্ষিণাত্যে দুর্গাপতি ও বিজয়নগর-গজপতি সামরিক প্রকৌশলীদের বংশধর ভড্ডেরা পরিবারগুলোর মধ্যে প্রচলিত ক্ষত্রিয় উপাধি।'
    ),
    linkedSynonymId: 'syn_odderajulu'
  },
  {
    id: 'comm_dir_14_gajapathulu',
    orderNumber: 14,
    canonicalName: 'Gajapathulu',
    localizedName: m8('Gajapathulu', 'गजपतुलु', 'గజపతులు', 'ಗಜಪತುಲು', 'கஜபதுலு', 'गजपतुलु', 'ଗଜପତୁଲୁ', 'গজপতুলু'),
    nativeScripts: { Telugu: 'గజపతులు', Odia: 'ଗଜପତି / ଗଜପତୁଲୁ', Kannada: 'ಗಜಪತುಲು', Devanagari: 'गजपतुलु' },
    categoryGroup: 'Dynastic & Royal Lineages',
    localizedCategoryGroup: m8(
      'Dynastic & Royal Lineages',
      'राजवंशीय एवं क्षत्रिय वंश',
      'రాజవంశ మరియు క్షత్రియ వంశాలు',
      'ರಾಜವಂಶೀಯ ಮತ್ತು ಕ್ಷತ್ರಿಯ ಪರಂಪರೆ',
      'அரச வம்ச மற்றும் க்ஷத்ரிய மரபுகள்',
      'राजवंशीय आणि क्षत्रिय घराणी',
      'ରାଜବଂଶୀୟ ଓ କ୍ଷତ୍ରିୟ ବଂଶ',
      'রাজবংশীয় ও ক্ষত্রিয় বংশ'
    ),
    geographicalSpread: m8(
      'Odisha (Puri, Khordha, Cuttack, Gajapati, Ganjam) & Andhra Pradesh (Srikakulam, Vizianagaram, Visakhapatnam, Kolleru)',
      'ओडिशा (पुरी, खुर्दा, कटक, गजपति, गंजाम) एवं आंध्र प्रदेश (श्रीकाकुलम, विजयनगरम, विशाखापत्तनम, कोल्लेरू)',
      'ఒడిశా (పూరీ, ఖుర్దా, కటక్, గజపతి, గంజాం) & ఆంధ్రప్రదేశ్ (శ్రీకాకుళం, విజయనగరం, విశాఖపట్నం, కొల్లేరు)',
      'ಒಡಿಶಾ (ಪುರಿ, ಖುರ್ದಾ, ಕಟಕ್, ಗಜಪತಿ, ಗಂಜಾಂ) ಮತ್ತು ಆಂಧ್ರಪ್ರದೇಶ (ಶ್ರೀಕಾಕುಳಂ, ವಿಜಯನಗರಂ, ವಿಶಾಖಪಟ್ಟಣಂ)',
      'ஒடிசா (பூரி, குர்தா, கட்டாக், கஜபதி, கஞ்சாம்) மற்றும் ஆந்திரப் பிரதேசம் (ஸ்ரீகாகுளம், விஜயநகரம், விசாகப்பட்டினம்)',
      'ओडिशा (पुरी, खुर्दा, कटक, गजपती, गंजाम) आणि आंध्र प्रदेश (श्रीकाकुलम, विजयनगरम, विशाखापट्टणम)',
      'ଓଡ଼ିଶା (ପୁରୀ, ଖୋର୍ଦ୍ଧା, କଟକ, ଗଜପତି, ଗଞ୍ଜାମ) ଓ ଆନ୍ଧ୍ର ପ୍ରଦେଶ (ଶ୍ରୀକାକୁଲମ, ବିଜୟନଗରମ, ବିଶାଖାପାଟଣା, କୋଲ୍ଲେରୁ)',
      'ওড়িশা (পুরী, খোর্ধা, কটক, গজপতি, গঞ্জাম) ও অন্ধ্র প্রদেশ (শ্রীকাকুলাম, বিজয়নগরম, বিশাখাপত্তনম)'
    ),
    prominentStates: ['Odisha', 'Andhra Pradesh'],
    epistemicClassification: m8(
      'Epigraphically Verified Imperial Suryavamsha Gajapathi Dynastic & Affiliated Lineage Title',
      'अभिलेखीय रूप से प्रमाणित सम्राट कपिलेन्द्र देव का सूर्यवंशी गजपति राजवंश एवं संबद्ध उपाधि',
      'శాసన ఆధారాలతో ధృవీకరించబడిన సూర్యవంశ గజపతి సామ్రాజ్య మరియు అనుబంధ వంశ నామం',
      'ಶಾಸನಬದ್ಧ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ಸಂಬಂಧಿತ ವಂಶ ನಾಮ',
      'கல்வெட்டுச் சான்று பெற்ற சூர்யவம்ச கஜபதி பேரரசு மற்றும் தொடர்புடைய வம்சப் பெயர்',
      'शिलालेखीय पुराव्यांनी सिद्ध सूर्यवंशी गजपती राजवंश आणि संबंधित घराण्याचे नाव',
      'ଶିଳାଲେଖ ଦ୍ୱାରା ପ୍ରମାଣିତ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ରାଜବଂଶ ଓ ସମ୍পୃକ୍ତ ବଂଶ ଉପାଧି',
      'শিলালিপি দ্বারা প্রত্যয়িত সূর্যবংশী গজপতি রাজবংশ ও সংশ্লিষ্ট বংশ উপাধি'
    ),
    professionalCategoryNumbers: [8, 1, 5],
    overview: m8(
      'Telugu plural form of "Gajapathi" (Lord of Elephants), the imperial title of the Suryavamsha Gajapathi dynasty founded by Emperor Kapilendra Deva (1434 CE). Preserved as a dynastic and regional heritage identifier among descendants of royal garrisons and feudatory estates in Kalinga-Andhra.',
      '"गजपति" (गज-सेना के स्वामी) का तेलुगु बहुवचन रूप — सम्राट कपिलेन्द्र देव (1434 ई.) द्वारा स्थापित सूर्यवंशी गजपति राजवंश की साम्राज्यिक उपाधि, जो कलिंग-आंध्र में राजकीय दुर्ग-रक्षकों व सामंत घरानों की ऐतिहासिक पहचान के रूप में संरक्षित है।',
      'సమ్రాట్ కపిలేంద్ర దేవుడు (1434 CE) స్థాపించిన సూర్యవంశ గజపతి సామ్రాజ్య బిరుదుకు తెలుగు బహువచన రూపం ("గజపతులు" / వడ్డే గజపతిరాజులు). కళింగ-ఆంధ్ర మరియు కొల్లేటికోట ప్రాంతాలలో రాజవంశ, సైనిక వారసత్వ గుర్తింపుగా నిలిచి ఉంది.',
      'ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವ (1434 CE) ಸ್ಥಾಪಿಸಿದ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ಬಿರುದಿನ ತೆಲುಗು ಬಹುವಚನ ರೂಪ ("ಗಜಪತುಲು"). ಕಳಿಂಗ-ಆಂಧ್ರ ಪ್ರದೇಶದಲ್ಲಿ ರಾಜವಂಶೀಯ ಮತ್ತು ಸೇನಾ ಪರಂಪರೆಯ ಗುರುತಾಗಿ ಉಳಿದಿದೆ.',
      'பேரரசர் கபிலேந்திர தேவர் (கி.பி. 1434) நிறுவிய சூர்யவம்ச கஜபதி வம்சப் பட்டத்தின் தெலுங்கு பன்மை வடிவம் ("கஜபதுலு"). கலிங்க-ஆந்திரப் பகுதியில் அரச மற்றும் படை மரபின் அடையாளமாகப் போற்றப்படுகிறது.',
      'सम्राट कपिलेन्द्र देव (१४३४) यांनी स्थापन केलेल्या सूर्यवंशी गजपती राजवंशाच्या पदवीचे तेलुगू बहुवचनी रूप ("गजपतुलु"); कलिंग-आंध्र प्रदेशात राजवंशीय व लष्करी वारशाची ओळख.',
      'ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ (୧୪୩୪ ଖ୍ରୀ.) ଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ ଉପାଧିର ତେଲୁଗୁ ବହୁବଚନ ରୂପ ("ଗଜପତୁଲୁ"); କଳିଙ୍ଗ-ଆନ୍ଧ୍ର ଅଞ୍ଚଳରେ ରାଜବଂଶୀୟ ଓ ସାମରିକ ଐତିହ୍ୟର ପରିଚୟ।',
      'সম্রাট কপিলেন্দ্র দেব (১৪৩৪ খ্রি.) প্রতিষ্ঠিত সূর্যবংশী গজপতি সাম্রাজ্য উপাধির তেলুগু বহুবচন রূপ ("গজপতুলু"); কলিঙ্গ-অন্ধ্র অঞ্চলে রাজবংশীয় ও সামরিক ঐতিহ্যের পরিচয়।'
    ),
    linkedSynonymId: 'syn_vadde_gajapathirajulu'
  },
  {
    id: 'comm_dir_15_voddar',
    orderNumber: 15,
    canonicalName: 'Voddar',
    localizedName: m8('Voddar', 'वोड्डर / वड्डर', 'వొడ్డర్ / వడ్డర్', 'ವೊಡ್ಡರ್ / ವಡ್ಡರ್', 'வொட்டர்', 'वोड्डर / वड्डर', 'ଭୋଡ୍ଡର / ୱଡ୍ଡର', 'ভোড্ডর / ওয়ড্ডর'),
    nativeScripts: { Kannada: 'ವೊಡ್ಡರ್ / ವಡ್ಡರ್', Marathi: 'वड्डर / वोड्डर', Telugu: 'వొడ్డర్', Odia: 'ଭୋଡ୍ଡର' },
    categoryGroup: 'Deccan & Southern Designations',
    localizedCategoryGroup: m8(
      'Deccan & Southern Designations',
      'दक्कन एवं दक्षिण भारतीय नाम',
      'దక్కన్ & దక్షిణ భారత నామాలు',
      'ದಖನ್ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ಹೆಸರುಗಳು',
      'தக்காண மற்றும் தென்னிந்தியப் பெயர்கள்',
      'दख्खन आणि दक्षिण भारतीय नावे',
      'ଦାକ୍ଷିଣାତ୍ୟ ଓ ଦକ୍ଷିଣ ଭାରତୀୟ ନାମ',
      'দাক্ষিণাত্য ও দক্ষিণ ভারতীয় নাম'
    ),
    geographicalSpread: m8(
      'Karnataka (Chitradurga, Ballari, Vijayapura, Kalaburagi, Raichur, Bengaluru, Mysuru), Maharashtra (Solapur, Pune, Kolhapur), Goa',
      'कर्नाटक (चित्रदुर्ग, बल्लारी, विजयपुरा, कलबुर्गी, रायचूर, बेंगलुरु, मैसूरु), महाराष्ट्र (सोलापुर, पुणे, कोल्हापुर) एवं गोवा',
      'కర్ణాటక (చిత్రదుర్గ, బళ్లారి, విజయపుర, కలబురగి, రాయచూర్, బెంగళూరు, మైసూరు), మహారాష్ట్ర (సోలాపూర్, పూణే, కొల్హాపూర్), గోవా',
      'ಕರ್ನಾಟಕ (ಚಿತ್ರದುರ್ಗ, ಬಳ್ಳಾರಿ, ವಿಜಯಪುರ, ಕಲಬುರಗಿ, ರಾಯಚೂರು, ಬೆಂಗಳೂರು, ಮೈಸೂರು), ಮಹಾರಾಷ್ಟ್ರ (ಸೊಲ್ಲಾಪುರ, ಪುಣೆ, ಕೊಲ್ಹಾಪುರ) ಮತ್ತು ಗೋವಾ',
      'கர்நாடகா (சித்ரதுர்கா, பல்லாரி, விஜயபுரா, கலபுரகி, ராய்ச்சூர், பெங்களூரு, மைசூரு), மகாராஷ்டிரா (சோலாப்பூர், புனே)',
      'कर्नाटक (चित्रदुर्ग, बल्लारी, विजयपुरा, कलबुर्गी, रायचूर, बेंगळुरू, म्हैसूर), महाराष्ट्र (सोलापूर, पुणे, कोल्हापूर, सांगली) आणि गोवा',
      'କର୍ଣ୍ଣାଟକ (ଚିତ୍ରଦୁର୍ଗ, ବଲ୍ଲାରୀ, ବିଜୟପୁରା, କଲବୁର୍ଗୀ, ରାୟଚୁର, ବେଙ୍ଗାଲୁରୁ, ମୈସୁର), ମହାରାଷ୍ଟ୍ର (ସୋଲାପୁର, ପୁଣେ) ଓ ଗୋଆ',
      'কর্ণাটক (চিত্রদুর্গ, বল্লারী, বিজয়পুরা, কলবুর্গী, রায়চুর, বেঙ্গালুরু, মহীশূর), মহারাষ্ট্র (সোলাপুর, পুনে) ও গোয়া'
    ),
    prominentStates: ['Karnataka', 'Maharashtra', 'Goa', 'Andhra Pradesh', 'Telangana'],
    epistemicClassification: m8(
      'Documented Kannada-Marathi Deccan Designation (Bhovi / Waddar / Voddar Gazetteer Records)',
      'कन्नड़-मराठी दक्कन अभिलेखों में प्रमाणित नाम (भोवी / वड्डर / वोड्डर गजेटियर साक्ष्य)',
      'కన్నడ-మరాఠీ దక్కన్ రికార్డులలో నమోదైన నామం (భోవి / వడ్డర్ / వొడ్డర్ గెజిటియర్ ఆధారాలు)',
      'ಕನ್ನಡ-ಮರಾಠಿ ದಖನ್ ದಾಖಲೆಗಳಲ್ಲಿ ಪ್ರಮಾಣಿತವಾದ ಹೆಸರು (ಭೋವಿ / ವಡ್ಡರ್ / ವೊಡ್ಡರ್ ಗೆಜೆಟಿಯರ್ ದಾಖಲೆ)',
      'கன்னட-மராத்தி தக்காண ஆவணங்களில் பதிவான பெயர் (போவி / வட்டர் / வொட்டர் அரசிதழ் சான்று)',
      'कन्नड-मराठी दख्खन नोंदींत प्रमाणित नाव (भोवी / वड्डर / वोड्डर गॅझेटियर पुरावे)',
      'କନ୍ନଡ଼-ମରାଠୀ ଦାକ୍ଷିଣାତ୍ୟ ଦସ୍ତାବିଜରେ ପ୍ରମାଣିତ ନାମ (ଭୋଭି / ୱଡ୍ଡର / ଭୋଡ୍ଡର ଗେଜେଟିୟର ପ୍ରମାଣ)',
      'কন্নড়-মারাঠি দাক্ষিণাত্য নথিতে প্রত্যয়িত নাম (ভোভি / ওয়ড্ডর / ভোড্ডর গেজেটিয়ার প্রমাণ)'
    ),
    professionalCategoryNumbers: [1, 3, 4, 5, 7, 8, 9],
    overview: m8(
      'Prominent Kannada and Marathi phonetic form of Odra/Oddar across the Western Deccan. Associated with 12th-century Kalyani Chalukya and Shivayogi Siddharameshwara (Solapur) tank engineering, Hoysala/Vijayanagara stone temples, Chitradurga cyclopean forts, and recognized as Bhovi (Odiyaraju) in Karnataka.',
      'पश्चिमी दक्कन में ओड्र/ओड्डर का प्रमुख कन्नड़ और मराठी रूप। 12वीं शताब्दी के कल्याणी चालुक्य एवं शिवयोगी सिद्धरामेश्वर (सोलापुर) के सरोवर निर्माण, होयसल/विजयनगर पाषाण मंदिरों, चित्रदुर्ग के अभेद्य दुर्गों से संबद्ध तथा कर्नाटक में भोवी (ओडियाराजू) के रूप में मान्यता प्राप्त।',
      'పశ్చిమ దక్కన్‌లో ఓడ్ర/ఒడ్డర్ యొక్క ప్రముఖ కన్నడ మరియు మరాఠీ రూపం. 12వ శతాబ్దపు శివయోగి సిద్ధరామేశ్వరుని (సోలాపూర్) తటాక నిర్మాణం, హోయసల/విజయనగర రాతి దేవాలయాలు, చిత్రదుర్గ కోట నిర్మాణంతో ముడిపడి ఉంది మరియు కర్ణాటకలో భోవి (ఒడియరాజు)గా గుర్తింపు పొందింది.',
      'ಪಶ್ಚಿಮ ದಖನ್‌ನಲ್ಲಿ ಓಡ್ರ/ಒಡ್ಡರ್ ಪದದ ಪ್ರಮುಖ ಕನ್ನಡ ಮತ್ತು ಮರಾಠಿ ರೂಪ. 12ನೇ ಶತಮಾನದ ಶಿವಯೋಗಿ ಸಿದ್ಧರಾಮೇಶ್ವರರ (ಸೊಲ್ಲಾಪುರ) ಕೆರೆ ನಿರ್ಮಾಣ, ಹೊಯ್ಸಳ/ವಿಜಯನಗರ ಶಿಲ್ಪಕಲೆ, ಚಿತ್ರದುರ್ಗದ ಕಲ್ಲಿನ ಕೋಟೆಗಳೊಂದಿಗೆ ಬೆಸೆದುಕೊಂಡಿದೆ ಮತ್ತು ಕರ್ನಾಟಕದಲ್ಲಿ ಭೋವಿ (ಒಡಿಯರಾಜು) ಎಂದು ಗುರುತಿಸಲ್ಪಟ್ಟಿದೆ.',
      'மேற்கு தக்காணத்தில் ஒட்ர/ஒட்டர் என்பதன் கன்னட மற்றும் மராத்தி வடிவம். 12-ஆம் நூற்றாண்டு சிவயோகி சித்தராமேஸ்வரர் (சோலாப்பூர்) ஏரிப் பொறியியல், ஹொய்சாள/விஜயநகர கற்கோயில்கள் மற்றும் சித்ரதுர்கா கோட்டைக் கட்டுமானத்துடன் தொடர்புடையது.',
      'पश्चिम दख्खनमधील ओड्र/ओड्डरचे प्रमुख कन्नड व मराठी रूप. १२ व्या शतकातील शिवयोगी सिद्धरामेश्वर (सोलापूर) तलाव अभियांत्रिकी, होयसळ/विजयनगर दगडी मंदिरे आणि चित्रदुर्ग किल्ल्याच्या बांधकामाशी संबंधित.',
      'ପଶ୍ଚିମ ଦାକ୍ଷିଣାତ୍ୟରେ ଓଡ଼୍ର/ଓଡ୍ଡରର ପ୍ରମୁଖ କନ୍ନଡ଼ ଓ ମରାଠୀ ରୂପ। ୧୨ଶ ଶତାବ୍ଦୀର ଶିବଯୋଗୀ ସିଦ୍ଧରାମେଶ୍ୱର (ସୋଲାପୁର) ଜଳାଶୟ ନିର୍ମାଣ, ହୋୟସାଲା/ବିଜୟନଗର ପ୍ରସ୍ତର ମନ୍ଦିର ଓ ଚିତ୍ରଦୁର୍ଗ ଦୁର୍ଗ ସହ ସମ୍ପୃକ୍ତ।',
      'পশ্চিম দাক্ষিণাত্যে ওড্র/ওড্ডরের প্রধান কন্নড় ও মারাঠি রূপ। দ্বাদশ শতাব্দীর শিবযোগী সিদ্ধরামেশ্বর (সোলাপুর) জলাশয় নির্মাণ, হোয়সালা/বিজয়নগর প্রস্তর মন্দির ও চিত্রদুর্গ দুর্গের সাথে যুক্ত।'
    ),
    linkedSynonymId: 'syn_waddar_vaddar'
  },
  {
    id: 'comm_dir_16_oddaru',
    orderNumber: 16,
    canonicalName: 'Oddaru',
    localizedName: m8('Oddaru', 'ओड्डरु', 'ఒడ్డరు', 'ಒಡ್ಡರು', 'ஒட்டரு / ஒட்டர்', 'ओड्डरु', 'ଓଡ୍ଡରୁ', 'ওড্ডরু'),
    nativeScripts: { Kannada: 'ಒಡ್ಡರು', Telugu: 'ఒడ్డరు', Tamil: 'ஒட்டர் / ஒட்டரு', Odia: 'ଓଡ୍ଡରୁ' },
    categoryGroup: 'Deccan & Southern Designations',
    localizedCategoryGroup: m8(
      'Deccan & Southern Designations',
      'दक्कन एवं दक्षिण भारतीय नाम',
      'దక్కన్ & దక్షిణ భారత నామాలు',
      'ದಖನ್ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ಹೆಸರುಗಳು',
      'தக்காண மற்றும் தென்னிந்தியப் பெயர்கள்',
      'दख्खन आणि दक्षिण भारतीय नावे',
      'ଦାକ୍ଷିଣାତ୍ୟ ଓ ଦକ୍ଷିଣ ଭାରତୀୟ ନାମ',
      'দাক্ষিণাত্য ও দক্ষিণ ভারতীয় নাম'
    ),
    geographicalSpread: m8(
      'Karnataka, Tamil Nadu, Southern Andhra Pradesh (Chittoor, Anantapur, Kurnool)',
      'कर्नाटक, तमिलनाडु एवं दक्षिणी आंध्र प्रदेश (चित्तूर, अनंतपुर, कुरनूल)',
      'కర్ణాటక, తమిళనాడు మరియు దక్షిణ ఆంధ్రప్రదేశ్ (చిత్తూరు, అనంతపురం, కర్నూలు)',
      'ಕರ್ನಾಟಕ, ತಮಿಳುನಾಡು ಮತ್ತು ದಕ್ಷಿಣ ಆಂಧ್ರಪ್ರದೇಶ (ಚಿತ್ತೂರು, ಅನಂತಪುರ, ಕರ್ನೂಲು)',
      'கர்நாடகா, தமிழ்நாடு மற்றும் தெற்கு ஆந்திரப் பிரதேசம் (சித்தூர், அனந்தப்பூர், கர்னூல்)',
      'कर्नाटक, तामिळनाडू आणि दक्षिण आंध्र प्रदेश (चित्तूर, अनंतपूर, कर्नूल)',
      'କର୍ଣ୍ଣାଟକ, ତାମିଲନାଡୁ ଓ ଦକ୍ଷିଣ ଆନ୍ଧ୍ର ପ୍ରଦେଶ (ଚିତ୍ତୁର, ଅନନ୍ତପୁର, କୁର୍ଣ୍ଣୁଲ)',
      'কর্ণাটক, তামিলনাড়ু ও দক্ষিণ অন্ধ্র প্রদেশ (চিত্তুর, অনন্তপুর, কুর্নুল)'
    ),
    prominentStates: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh'],
    epistemicClassification: m8(
      'Classical Dravidian Honorific Plural (-aru / -ar) Preserving Unshifted Initial "O-" from Odra',
      'प्राचीन ओड्र के प्रारंभिक "ओ-" स्वर को सुरक्षित रखने वाला द्रविड़ आदरसूचक बहुवचन (-अरु / -अर) रूप',
      'ప్రాచీన ఓడ్రలోని మొదటి "ఒ/ఓ" అక్షరాన్ని యథాతథంగా నిలుపుకున్న ద్రావిడ బహువచన రూపం (-అరు)',
      'ಪ್ರಾಚೀನ ಓಡ್ರ ಪದದ ಮೂಲ "ಒ-" ಸ್ವರವನ್ನು ಉಳಿಸಿಕೊಂಡಿರುವ ದ್ರಾವಿಡ ಗೌರವ ಬಹುವಚನ ರೂಪ (ಒಡ್ಡರು)',
      'பண்டைய ஒட்ர என்பதன் முதல் "ஒ" உயிரெழுத்தைத் தக்கவைத்துள்ள திராவிட மரியாதைப் பன்மை வடிவம் (ஒட்டர் / ஒட்டரு)',
      'प्राचीन ओड्र मधील मूळ "ओ-" स्वर टिकवून ठेवणारे द्रविड आदरार्थी बहुवचनी रूप (ओड्डरु)',
      'ପ୍ରାଚୀନ ଓଡ଼୍ର ଶବ୍ଦର ମୂଳ "ଓ-" ସ୍ୱରକୁ ବଜାୟ ରଖିଥିବା ଦ୍ରାବିଡ଼ ସମ୍ମାନସୂଚକ ବହୁବଚନ ରୂପ (ଓଡ୍ଡରୁ)',
      'প্রাচীন ওড্র শব্দের মূল "ও-" স্বরবর্ণ অক্ষুণ্ণ রাখা দ্রাবিড় সম্মানসূচক বহুবচন রূপ (ওড্ডরু)'
    ),
    professionalCategoryNumbers: [1, 2, 3, 4, 5, 6, 7],
    overview: m8(
      'Retains the original unshifted vowel "O-" directly from Odra with the Kannada/Telugu/Tamil human plural suffix "-aru/-ar" (Odda + aru -> Oddaru). Attested in Vijayanagara, Mysore Wodeyar, and Nayaka-era inscriptions and Buchanan’s 1807 journey chronicles.',
      'कन्नड़/तेलुगु/तमिल के आदरसूचक बहुवचन प्रत्यय "-अरु/-अर" (ओड्डा + अरु -> ओड्डरु) के साथ ओड्र के मूल "ओ-" स्वर को सुरक्षित रखता है। विजयनगर, मैसूर वोडेयार व नायक कालीन अभिलेखों तथा बुकानन के 1807 के यात्रा विवरणों में प्रमाणित।',
      'కన్నడ/తెలుగు/తమిళ బహువచన ప్రత్యయం "-అరు/-అర్" (ఒడ్డ + అరు -> ఒడ్డరు)తో ఓడ్ర యొక్క అసలు "ఒ-" ధ్వనిని నిలుపుకున్న రూపం. విజయనగర, మైసూర్ ఒడయార్, నాయక రాజుల శాసనాలలో మరియు 1807 బుకానన్ రచనలలో నమోదైంది.',
      'ಕನ್ನಡ/ತೆಲುಗು/ತಮಿಳು ಬಹುವಚನ ಪ್ರತ್ಯಯ "-ಅರು/-ಅರ್" (ಒಡ್ಡ + ಅರು -> ಒಡ್ಡರು) ನೊಂದಿಗೆ ಓಡ್ರದ ಮೂಲ "ಒ-" ಸ್ವರವನ್ನು ಉಳಿಸಿಕೊಂಡಿದೆ. ವಿಜಯನಗರ, ಮೈಸೂರು ಒಡೆಯರ್ ಶಾಸನಗಳಲ್ಲಿ ಮತ್ತು 1807ರ ಬುಕಾನನ್ ದಾಖಲೆಗಳಲ್ಲಿ ಉಲ್ಲೇಖಿತವಾಗಿದೆ.',
      'கன்னட/தெலுங்கு/தமிழ் பன்மை விகுதி "-அரு/-அர்" (ஒட்ட + அரு -> ஒட்டரு) உடன் ஒட்ர என்பதன் மூல "ஒ-" ஒலியைத் தக்கவைத்துள்ளது. விஜயநகர, மைசூர் உடையார் மற்றும் நாயக்கர் காலக் கல்வெட்டுகளிலும் 1807 புக்கானன் குறிப்புகளிலும் பதிவாகியுள்ளது.',
      'कन्नड/तेलुगू/तामिळ बहुवचनी प्रत्यय "-अरु/-अर" (ओड्डा + अरु -> ओड्डरु) सह ओड्र चा मूळ "ओ-" स्वर जपणारे नाव; विजयनगर, म्हैसूर वोडेयार शिलालेखांत आणि १८०७ च्या बुकानन यांच्या नोंदींत प्रमाणित.',
      'କନ୍ନଡ଼/ତେଲୁଗୁ/ତାମିଲ ବହୁବଚନ ପ୍ରତ୍ୟୟ "-ଅରୁ/-ଅର" (ଓଡ୍ଡା + ଅରୁ -> ଓଡ୍ଡରୁ) ସହ ଓଡ଼୍ରର ମୂଳ "ଓ-" ଧ୍ୱନି ରକ୍ଷା କରିଛି; ବିଜୟନଗର ଓ ମୈସୁର ଶିଳାଲେଖ ତଥା ୧୮୦୭ ବୁକାନନଙ୍କ ବିବରଣୀରେ ପ୍ରମାଣିତ।',
      'কন্নড়/তেলুগু/তামিল বহুবচন প্রত্যয় "-অরু/-অর" (ওড্ডা + অরু -> ওড্ডরু) সহ ওড্র-এর মূল "ও-" ধ্বনি সংরক্ষণ করেছে; বিজয়নগর ও মহীশূর শিলালিপি এবং ১৮০৭ সালের বুকাননের বিবরণীতে প্রত্যয়িত।'
    ),
    linkedSynonymId: 'syn_oddar'
  }
];

export const STEP2_DIRECTORY_UI_LABELS: Record<
  LanguageCode,
  {
    directoryTabLabel: string;
    professionsTabLabel: string;
    directorySectionBadge: string;
    directoryHeading: string;
    directorySubheading: string;
    directoryMethodologicalNote: string;
    filterAllGroups: string;
    profCategoriesBadge: string;
    profCategoriesHeading: string;
    profCategoriesSubheading: string;
    profMethodologicalNote: string;
    subcategoriesLabel: string;
    associatedProfessionsLabel: string;
    exploreCategoryBtn: string;
    exploreCommunityBtn: string;
    allNineCategoriesLabel: string;
  }
> = {
  en: {
    directoryTabLabel: '16-Community Directory & Synonyms',
    professionsTabLabel: '9 Professional Heritage Categories',
    directorySectionBadge: 'Canonical 16-Community Pan-Indian Directory',
    directoryHeading: 'Complete 16-Community Historical Directory & Regional Designations',
    directorySubheading:
      'Unified archival directory of the 16 principal community designations across Odisha, North-Western India, Deccan, and South India, integrated with existing epigraphic and ethnographic records.',
    directoryMethodologicalNote:
      'Historical & Methodological Note: Each of the 16 communities below is documented with its specific regional, linguistic, and occupational history. Shared ancestral links to classical Odra/Suryavamsha traditions are presented alongside clear regional distinctions so that no single history is mechanically imposed on all groups.',
    filterAllGroups: 'All 16 Communities',
    profCategoriesBadge: '9 Historical & Contemporary Occupational Classifications',
    profCategoriesHeading: 'Nine Professional Heritage & Shilpa-Shastra Categories',
    profCategoriesSubheading:
      'Comprehensive classification covering Martial Heritage, Agriculture, Civil & Hydraulic Engineering, Shilpi, Vasthushilpi, Lokashilpi, Vishwashilpi, Royal Dynastic Traditions, and Contemporary Professions.',
    profMethodologicalNote:
      'Occupational Heritage Note: These nine professional heritage categories are historical and analytical classifications for educational documentation, not mandatory hereditary roles.',
    subcategoriesLabel: 'Documented Sub-Classifications',
    associatedProfessionsLabel: 'Associated Heritage Domains',
    exploreCategoryBtn: 'Read Full 8-Section Monograph',
    exploreCommunityBtn: 'Open Archival Profile',
    allNineCategoriesLabel: 'All 9 Categories'
  },
  hi: {
    directoryTabLabel: '16-समुदाय निर्देशिका एवं पर्याय',
    professionsTabLabel: '9 व्यावसायिक विरासत श्रेणियाँ',
    directorySectionBadge: 'प्रामाणिक 16-समुदाय अखिल भारतीय निर्देशिका',
    directoryHeading: 'संपूर्ण 16-समुदाय ऐतिहासिक निर्देशिका एवं क्षेत्रीय नाम',
    directorySubheading:
      'ओडिशा, उत्तर-पश्चिम भारत, दक्कन और दक्षिण भारत के 16 प्रमुख सामुदायिक नामों की एकीकृत अभिलेखीय निर्देशिका।',
    directoryMethodologicalNote:
      'ऐतिहासिक एवं कार्यप्रणाली टिप्पणी: नीचे सूचीबद्ध सभी 16 समुदायों का उनके विशिष्ट क्षेत्रीय, भाषाई और व्यावसायिक इतिहास के साथ दस्तावेज़ीकरण किया गया है।',
    filterAllGroups: 'सभी 16 समुदाय',
    profCategoriesBadge: '9 ऐतिहासिक एवं समकालीन व्यावसायिक वर्गीकरण',
    profCategoriesHeading: 'नौ व्यावसायिक विरासत एवं शिल्प-शास्त्र श्रेणियाँ',
    profCategoriesSubheading:
      'सामरिक विरासत, कृषि, निर्माण एवं जल-अभियांत्रिकी, शिल्पी, वास्तुशिल्पी, लोकशिल्पी, विश्वशिल्पी, राजवंशीय परंपरा और समकालीन व्यवसायों का व्यापक वर्गीकरण।',
    profMethodologicalNote:
      'व्यावसायिक विरासत टिप्पणी: ये नौ श्रेणियाँ शैक्षिक और ऐतिहासिक दस्तावेज़ीकरण के लिए हैं, न कि किसी समुदाय के लिए अनिवार्य व्यवसाय।',
    subcategoriesLabel: 'प्रमाणित उप-वर्गीकरण',
    associatedProfessionsLabel: 'संबद्ध विरासत क्षेत्र',
    exploreCategoryBtn: 'संपूर्ण 8-खंडीय आलेख पढ़ें',
    exploreCommunityBtn: 'अभिलेखीय प्रोफ़ाइल खोलें',
    allNineCategoriesLabel: 'सभी 9 श्रेणियाँ'
  },
  te: {
    directoryTabLabel: '16-సమాజాల డైరెక్టరీ & పర్యాయపదాలు',
    professionsTabLabel: '9 వృత్తిపరమైన వారసత్వ వర్గాలు',
    directorySectionBadge: 'ప్రామాణిక 16-సమాజాల అఖిల భారత డైరెక్టరీ',
    directoryHeading: 'సంపూర్ణ 16-సమాజాల చారిత్రక డైరెక్టరీ & ప్రాంతీయ నామాలు',
    directorySubheading:
      'ఒడిశా, వాయువ్య భారత్, దక్కన్ మరియు దక్షిణ భారతదేశంలోని 16 ప్రధాన సామాజిక నామాల సమగ్ర చారిత్రక డైరెక్టరీ.',
    directoryMethodologicalNote:
      'చారిత్రక & పరిశోధనా గమనిక: ఈ 16 సమాజాల ప్రత్యేక ప్రాంతీయ, భాషా మరియు చారిత్రక నేపథ్యాన్ని స్పష్టమైన ఆధారాలతో పొందుపరచడం జరిగింది.',
    filterAllGroups: 'మొత్తం 16 సమాజాలు',
    profCategoriesBadge: '9 చారిత్రక మరియు సమకాలీన వృత్తి వర్గీకరణలు',
    profCategoriesHeading: 'తొమ్మిది వృత్తిపరమైన వారసత్వ & శిల్పశాస్త్ర వర్గాలు',
    profCategoriesSubheading:
      'సైనిక వారసత్వం, వ్యవసాయం, నిర్మాణ & జల ఇంజనీరింగ్, శిల్పి, వాస్తుశిల్పి, లోకశిల్పి, విశ్వశిల్పి, రాజవంశ సంప్రదాయాలు మరియు సమకాలీన వృత్తుల సమగ్ర వివరణ.',
    profMethodologicalNote:
      'ముఖ్య గమనిక: ఈ తొమ్మిది వృత్తిపరమైన వర్గాలు చారిత్రక మరియు విద్యాపరమైన అధ్యయనం కోసం మాత్రమే; నిర్బంధ వృత్తులు కావు.',
    subcategoriesLabel: 'ఉప-వర్గీకరణలు',
    associatedProfessionsLabel: 'అనుబంధ వారసత్వ రంగాలు',
    exploreCategoryBtn: 'పూర్తి చారిత్రక వ్యాసం చదవండి',
    exploreCommunityBtn: 'పూర్తి వివరాలు చూడండి',
    allNineCategoriesLabel: 'మొత్తం 9 వర్గాలు'
  },
  kn: {
    directoryTabLabel: '16-ಸಮುದಾಯಗಳ ನಿರ್ದೇಶಿಕೆ ಮತ್ತು ಪರ್ಯಾಯ ನಾಮಗಳು',
    professionsTabLabel: '9 ವೃತ್ತಿಪರ ಪರಂಪರೆಯ ವರ್ಗಗಳು',
    directorySectionBadge: 'ಪ್ರಾಮಾಣಿಕ 16-ಸಮುದಾಯಗಳ ಅಖಿಲ ಭಾರತ ನಿರ್ದೇಶಿಕೆ',
    directoryHeading: 'ಸಂಪೂರ್ಣ 16-ಸಮುದಾಯಗಳ ಐತಿಹಾಸಿಕ ನಿರ್ದೇಶಿಕೆ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಹೆಸರುಗಳು',
    directorySubheading:
      'ಒಡಿಶಾ, ವಾಯುವ್ಯ ಭಾರತ, ದಖನ್ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ 16 ಪ್ರಮುಖ ಸಮುದಾಯ ನಾಮಗಳ ಸಮಗ್ರ ದಾಖಲಾತಿ.',
    directoryMethodologicalNote:
      'ಐತಿಹಾಸಿಕ ಮತ್ತು ಸಂಶೋಧನಾ ಸೂಚನೆ: ಈ 16 ಸಮುದಾಯಗಳ ಪ್ರಾದೇಶಿಕ, ಭಾಷಿಕ ಮತ್ತು ಐತಿಹಾಸಿಕ ಹಿನ್ನೆಲೆಯನ್ನು ಸ್ಪಷ್ಟ ದಾಖಲೆಗಳೊಂದಿಗೆ ನೀಡಲಾಗಿದೆ.',
    filterAllGroups: 'ಎಲ್ಲಾ 16 ಸಮುದಾಯಗಳು',
    profCategoriesBadge: '9 ಐತಿಹಾಸಿಕ ಮತ್ತು ಸಮಕಾಲೀನ ವೃತ್ತಿ ವರ್ಗೀಕರಣಗಳು',
    profCategoriesHeading: 'ಒಂಬತ್ತು ವೃತ್ತಿಪರ ಪರಂಪರೆ ಮತ್ತು ಶಿಲ್ಪಶಾಸ್ತ್ರ ವರ್ಗಗಳು',
    profCategoriesSubheading:
      'ಸೇನಾ ಪರಂಪರೆ, ಕೃಷಿ, ನಿರ್ಮಾಣ ಮತ್ತು ಜಲ ಎಂಜಿನಿಯರಿಂಗ್, ಶಿಲ್ಪಿ, ವಾಸ್ತುಶಿಲ್ಪಿ, ಲೋಕಶಿಲ್ಪಿ, ವಿಶ್ವಶಿಲ್ಪಿ, ರಾಜವಂಶೀಯ ಪರಂಪರೆ ಮತ್ತು ಸಮಕಾಲೀನ ವೃತ್ತಿಗಳ ವಿವರಣೆ.',
    profMethodologicalNote:
      'ವೃತ್ತಿಪರ ಪರಂಪರೆ ಸೂಚನೆ: ಈ ಒಂಬತ್ತು ವರ್ಗಗಳು ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಐತಿಹಾಸಿಕ ಅಧ್ಯಯನಕ್ಕಾಗಿ ಮಾತ್ರ.',
    subcategoriesLabel: 'ಉಪ-ವರ್ಗೀಕರಣಗಳು',
    associatedProfessionsLabel: 'ಸಂಬಂಧಿತ ಪರಂಪರೆ ಕ್ಷೇತ್ರಗಳು',
    exploreCategoryBtn: 'ಸಂಪೂರ್ಣ ಲೇಖನ ಓದಿ',
    exploreCommunityBtn: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    allNineCategoriesLabel: 'ಎಲ್ಲಾ 9 ವರ್ಗಗಳು'
  },
  ta: {
    directoryTabLabel: '16-சமூக அடைவு மற்றும் பெயர்கள்',
    professionsTabLabel: '9 தொழில் பாரம்பரிய வகைகள்',
    directorySectionBadge: '16-சமூக அகில இந்திய வரலாற்று அடைவு',
    directoryHeading: 'முழுமையான 16-சமூக வரலாற்று அடைவு மற்றும் பிராந்தியப் பெயர்கள்',
    directorySubheading:
      'ஒடிசா, வடமேற்கு இந்தியா, தக்காணம் மற்றும் தென்னிந்தியாவின் 16 முக்கிய சமூகப் பெயர்களின் ஒருங்கிணைந்த ஆவண அடைவு.',
    directoryMethodologicalNote:
      'வரலாற்று மற்றும் ஆய்வுக் குறிப்பு: கீழே உள்ள 16 சமூகங்களும் அவற்றின் தனித்துவமான பிராந்திய, மொழியியல் மற்றும் வரலாற்றுப் பின்னணியுடன் ஆவணப்படுத்தப்பட்டுள்ளன.',
    filterAllGroups: 'அனைத்து 16 சமூகங்கள்',
    profCategoriesBadge: '9 வரலாற்று மற்றும் தற்காலத் தொழில் வகைப்பாடுகள்',
    profCategoriesHeading: 'ஒன்பது தொழில் பாரம்பரிய மற்றும் சிற்ப சாஸ்திர வகைகள்',
    profCategoriesSubheading:
      'படை மரபு, வேளாண்மை, கட்டுமானம் மற்றும் நீர்ப்பாசனப் பொறியியல், சிற்பி, வாஸ்துசிற்பி, லோகசிற்பி, விஸ்வசிற்பி, அரச வம்ச மரபு மற்றும் தற்காலத் தொழில்கள்.',
    profMethodologicalNote:
      'தொழில் பாரம்பரியக் குறிப்பு: இந்த ஒன்பது வகைகளும் கல்வி மற்றும் வரலாற்று ஆவணப்படுத்தலுக்கானவை மட்டுமே.',
    subcategoriesLabel: 'உள் வகைப்பாடுகள்',
    associatedProfessionsLabel: 'தொடர்புடைய பாரம்பரியத் துறைகள்',
    exploreCategoryBtn: 'முழு கட்டுரையைப் படிக்கவும்',
    exploreCommunityBtn: 'விவரங்களைக் காண்க',
    allNineCategoriesLabel: 'அனைத்து 9 வகைகள்'
  },
  mr: {
    directoryTabLabel: '१६-समाज निर्देशिका व पर्यायी नावे',
    professionsTabLabel: '९ व्यावसायिक वारसा श्रेणी',
    directorySectionBadge: 'प्रामाणिक १६-समाज अखिल भारतीय निर्देशिका',
    directoryHeading: 'संपूर्ण १६-समाज ऐतिहासिक निर्देशिका आणि प्रादेशिक नावे',
    directorySubheading:
      'ओडिशा, वायव्य भारत, दख्खन आणि दक्षिण भारतातील १६ प्रमुख समाज नावांची एकत्रित ऐतिहासिक निर्देशिका.',
    directoryMethodologicalNote:
      'ऐतिहासिक व संशोधन टीप: खालील १६ समाजांची त्यांच्या विशिष्ट प्रादेशिक, भाषिक आणि ऐतिहासिक संदर्भासह नोंद करण्यात आली आहे.',
    filterAllGroups: 'सर्व १६ समाज',
    profCategoriesBadge: '९ ऐतिहासिक व समकालीन व्यावसायिक वर्गीकरणे',
    profCategoriesHeading: 'नऊ व्यावसायिक वारसा आणि शिल्पशास्त्र श्रेणी',
    profCategoriesSubheading:
      'लष्करी वारसा, शेती, बांधकाम व जल-अभियांत्रिकी, शिल्पी, वास्तुशिल्पी, लोकशिल्पी, विश्वशिल्पी, राजवंशीय परंपरा आणि समकालीन व्यवसायांचे वर्गीकरण.',
    profMethodologicalNote:
      'व्यावसायिक वारसा टीप: या नऊ श्रेणी केवळ शैक्षणिक आणि ऐतिहासिक दस्तऐवजीकरणासाठी आहेत.',
    subcategoriesLabel: 'उप-वर्गीकरणे',
    associatedProfessionsLabel: 'संबंधित वारसा क्षेत्रे',
    exploreCategoryBtn: 'संपूर्ण लेख वाचा',
    exploreCommunityBtn: 'तपशील पहा',
    allNineCategoriesLabel: 'सर्व ९ श्रेणी'
  },
  or: {
    directoryTabLabel: '୧୬-ସମୁଦାୟ ନିର୍ଦ୍ଦେଶିକା ଓ ପର୍ଯ୍ୟାୟ ନାମ',
    professionsTabLabel: '୯ ବୃତ୍ତିଗତ ଐତିହ୍ୟ ବର୍ଗ',
    directorySectionBadge: 'ପ୍ରାମାଣିକ ୧୬-ସମୁଦାୟ ସର୍ବଭାରତୀୟ ନିର୍ଦ୍ଦେଶିକା',
    directoryHeading: 'ସମ୍ପୂର୍ଣ୍ଣ ୧୬-ସମୁଦାୟ ଐତିହାସିକ ନିର୍ଦ୍ଦେଶିକା ଓ ଆଞ୍ଚଳିକ ନାମ',
    directorySubheading:
      'ଓଡ଼ିଶା, ଉତ୍ତର-ପଶ୍ଚିମ ଭାରତ, ଦାକ୍ଷିଣାତ୍ୟ ଓ ଦକ୍ଷିଣ ଭାରତର ୧୬ଟି ପ୍ରମୁଖ ସମୁଦାୟ ନାମର ସମନ୍ୱିତ ଅଭିଲେଖ ନିର୍ଦ୍ଦେଶିକା।',
    directoryMethodologicalNote:
      'ଐତିହାସିକ ଓ ଗବେଷଣା ଟିପ୍ପଣୀ: ନିମ୍ନলিখିତ ୧୬ଟି ସମୁଦାୟ ସେମାନଙ୍କର ନିର୍ଦ୍ଦିଷ୍ଟ ଆଞ୍ଚଳିକ, ଭାଷାଗତ ଓ ଐତିହାସିକ ପୃଷ୍ଠଭୂମି ସହ ପ୍ରମାଣିତ।',
    filterAllGroups: 'ସମସ୍ତ ୧୬ ସମୁଦାୟ',
    profCategoriesBadge: '୯ ଐତିହାସିକ ଓ ସମକାଳୀନ ବୃତ୍ତିଗତ ବର୍ଗୀକରଣ',
    profCategoriesHeading: 'ନଅଟି ବୃତ୍ତିଗତ ଐତିହ୍ୟ ଓ ଶିଳ୍ପ-ଶାସ୍ତ୍ର ବର୍ଗ',
    profCategoriesSubheading:
      'ସାମରିକ ଐତିହ୍ୟ, କୃଷି, ନିର୍ମାଣ ଓ ଜଳ-ଇଞ୍ଜିନିୟରିଂ, ଶିଳ୍ପୀ, ବାସ୍ତୁଶିଳ୍ପୀ, ଲୋକଶିଳ୍ପୀ, ବିଶ୍ୱଶିଳ୍ପୀ, ରାଜବଂଶୀୟ ପରମ୍ପରା ଓ ସମକାଳୀନ ବୃତ୍ତିର ବିବରଣୀ।',
    profMethodologicalNote:
      'ବୃତ୍ତିଗତ ଐତିହ୍ୟ ସୂଚନା: ଏହି ନଅଟି ବର୍ଗ କେବଳ ଶୈକ୍ଷିକ ଓ ଐତିହାସିକ ଅଧ୍ୟୟନ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ।',
    subcategoriesLabel: 'ଉପ-ବର୍ଗୀକରଣ',
    associatedProfessionsLabel: 'ସମ୍ପୃକ୍ତ ଐତିହ୍ୟ କ୍ଷେତ୍ର',
    exploreCategoryBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରବନ୍ଧ ପଢ଼ନ୍ତୁ',
    exploreCommunityBtn: 'ବିବରଣୀ ଦେଖନ୍ତୁ',
    allNineCategoriesLabel: 'ସମସ୍ତ ୯ ବର୍ଗ'
  },
  bn: {
    directoryTabLabel: '১৬-সম্প্রদায় ডিরেক্টরি ও সমার্থক নাম',
    professionsTabLabel: '৯ পেশাগত ঐতিহ্য বিভাগ',
    directorySectionBadge: 'প্রামাণিক ১৬-সম্প্রদায় সর্বভারতীয় ডিরেক্টরি',
    directoryHeading: 'সম্পূর্ণ ১৬-সম্প্রদায় ঐতিহাসিক ডিরেক্টরি ও আঞ্চলিক নাম',
    directorySubheading:
      'ওড়িশা, উত্তর-পশ্চিম ভারত, দাক্ষিণাত্য ও দক্ষিণ ভারতের ১৬টি প্রধান সম্প্রদায় নামের সমন্বিত আর্কাইভাল ডিরেক্টরি।',
    directoryMethodologicalNote:
      'ঐতিহাসিক ও পদ্ধতিগত নোট: নিচের ১৬টি সম্প্রদায়কে তাদের নিজস্ব আঞ্চলিক, ভাষাগত ও ঐতিহাসিক প্রেক্ষাপটসহ নথিবদ্ধ করা হয়েছে।',
    filterAllGroups: 'সকল ১৬ সম্প্রদায়',
    profCategoriesBadge: '৯ ঐতিহাসিক ও সমসাময়িক পেশাগত শ্রেণীবিভাগ',
    profCategoriesHeading: 'নয়টি পেশাগত ঐতিহ্য ও শিল্পশাস্ত্র বিভাগ',
    profCategoriesSubheading:
      'সামরিক ঐতিহ্য, কৃষি, নির্মাণ ও জল-প্রকৌশল, শিল্পী, বাস্তুশিল্পী, লোকশিল্পী, বিশ্বশিল্পী, রাজবংশীয় ঐতিহ্য এবং সমসাময়িক পেশার বিস্তৃত বিবরণ।',
    profMethodologicalNote:
      'পেশাগত ঐতিহ্য নোট: এই নয়টি বিভাগ কেবল শিক্ষামূলক ও ঐতিহাসিক নথিবদ্ধকরণের জন্য।',
    subcategoriesLabel: 'উপ-শ্রেণীবিভাগ',
    associatedProfessionsLabel: 'সংশ্লিষ্ট ঐতিহ্য ক্ষেত্র',
    exploreCategoryBtn: 'সম্পূর্ণ প্রবন্ধ পড়ুন',
    exploreCommunityBtn: 'বিস্তারিত দেখুন',
    allNineCategoriesLabel: 'সকল ৯ বিভাগ'
  }
};
