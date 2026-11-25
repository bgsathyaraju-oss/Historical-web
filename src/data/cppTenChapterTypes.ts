import type { LanguageCode } from '../types/index.ts';
import type { ProfessionalHeritageCrossRefItem } from './gajapathiMonarchsAndInscriptionsArticles.ts';

export type CppVerificationStatus =
  | 'documented_epigraphic'
  | 'traditional_oral_documented'
  | 'contemporary_archival'
  | 'awaiting_verified_biographies';

export interface CppTenChapterItem {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  slug: string;
  title: Record<LanguageCode, string>;
  paragraphs: Record<LanguageCode, string[]>;
}

export interface CppDocumentaryReference {
  title: string;
  authorOrInstitution: string;
  publicationDetails: string;
  pageOrVolume?: string;
  url?: string;
  verificationStatus: 'verified_primary_or_scholarly' | 'traditional_textual_record' | 'verification_pending';
  note?: Record<LanguageCode, string>;
}

export interface CppTimelineEntry {
  dateOrPeriod: Record<LanguageCode, string>;
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  certainty: 'exact_verified' | 'approximate_period' | 'traditional_chronology' | 'verification_pending';
}

export interface CppAuthorAttribution {
  name: string;
  role: Record<LanguageCode, string>;
  editorialBoard: Record<LanguageCode, string>;
  methodologyStatement: Record<LanguageCode, string>;
}

export interface CppTenChapterDocumentary {
  recordId: string;
  referenceId: string;
  isArchivalRegistryEntry?: boolean;
  subtitle: Record<LanguageCode, string>;
  historicalIntroduction: Record<LanguageCode, string>;
  chapters: [
    CppTenChapterItem,
    CppTenChapterItem,
    CppTenChapterItem,
    CppTenChapterItem,
    CppTenChapterItem,
    CppTenChapterItem,
    CppTenChapterItem,
    CppTenChapterItem,
    CppTenChapterItem,
    CppTenChapterItem
  ];
  comprehensiveConclusion: Record<LanguageCode, string>;
  timeline: CppTimelineEntry[];
  references: CppDocumentaryReference[];
  professionalHeritageCategories: Array<ProfessionalHeritageCrossRefItem['categoryId']>;
  authorAttribution: CppAuthorAttribution;
  verificationDisclosure: {
    status: CppVerificationStatus;
    badgeLabel: Record<LanguageCode, string>;
    summary: Record<LanguageCode, string>;
  };
}

export interface CppPerson8LangFactSheet {
  name: Record<LanguageCode, string>;
  era: Record<LanguageCode, string>;
  region: Record<LanguageCode, string>;
  dynastyOrDomain: Record<LanguageCode, string>;
  c1Context: Record<LanguageCode, string>;
  c2Genealogy: Record<LanguageCode, string>;
  c3Geography: Record<LanguageCode, string>;
  c4Formation: Record<LanguageCode, string>;
  c5Achievements: Record<LanguageCode, string>;
  c6Associates: Record<LanguageCode, string>;
  c7Contributions: Record<LanguageCode, string>;
  c8Evidence: Record<LanguageCode, string>;
  c9CriticalAnalysis: Record<LanguageCode, string>;
  c10Legacy: Record<LanguageCode, string>;
}

export const ALL_8_LANGS: readonly LanguageCode[] = ['en', 'hi', 'te', 'kn', 'ta', 'mr', 'or', 'bn'] as const;

export function ml8(
  en: string,
  hi: string,
  te: string,
  kn: string,
  ta: string,
  mr: string,
  or: string,
  bn: string
): Record<LanguageCode, string> {
  return { en, hi, te, kn, ta, mr, or, bn };
}

export const DEFAULT_CPP_AUTHOR_ATTRIBUTION: CppAuthorAttribution = {
  name: 'G.Sathyanarayana Raju.Peetla.',
  role: ml8(
    'Founder, Web Developer / Designer, Digital Creator & Historical Documentation Contributor',
    'संस्थापक, वेब डेवलपर / डिज़ाइनर, डिजिटल क्रिएटर एवं ऐतिहासिक दस्तावेजीकरण योगदानकर्ता',
    'వ్యవస్థాపకులు, వెబ్ డెవలపర్ / డిజైనర్, డిజిటల్ క్రియేటర్ & చారిత్రక డాక్యుమెంటేషన్ సహకారకర్త',
    'ಸ್ಥಾಪಕರು, ವೆಬ್ ಡೆವಲಪರ್ / ಡಿಸೈನರ್, ಡಿಜಿಟಲ್ ಕ್ರಿಯೇಟರ್ ಮತ್ತು ಐತಿಹಾಸಿಕ ದಾಖಲಾತಿ ಕೊಡುಗೆದಾರರು',
    'நிறுவனர், வலை உருவாக்குநர் / வடிவமைப்பாளர், டிஜிட்டல் படைப்பாளர் & வரலாற்று ஆவணப்படுத்தல் பங்களிப்பாளர்',
    'संस्थापक, वेब डेव्हलपर / डिझायनर, डिजिटल क्रिएटर आणि ऐतिहासिक दस्तऐवजीकरण योगदानकर्ते',
    'ପ୍ରତିଷ୍ଠାତା, ୱେବ୍ ଡେଭଲପର୍ / ଡିଜାଇନର୍, ଡିଜିଟାଲ୍ କ୍ରିଏଟର୍ ଓ ଐତିହାସିକ ଦସ୍ତାବିଜୀକରଣ ଯୋଗଦାନକାରୀ',
    'প্রতিষ্ঠাতা, ওয়েব ডেভেলপার / ডিজাইনার, ডিজিটাল ক্রিয়েটর ও ঐতিহাসিক নথিপত্র সংকলন অবদানকারী'
  ),
  editorialBoard: ml8(
    'Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal — Editorial & Historical Research Board',
    'सूर्यवंश ओडियाराजु क्षत्रिय ऐतिहासिक डॉक्यूमेंट्री एवं रॉयल हेरिटेज पोर्टल — संपादकीय एवं ऐतिहासिक अनुसंधान मंडल',
    'సూర్యవంశ ఒడియరాజు క్షత్రియ హిస్టారికల్ డాక్యుమెంటరీ & రాయల్ హెరిటేజ్ పోర్టల్ — సంపాదకీయ మరియు చారిత్రక పరిశోధనా మండలి',
    'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ ಮತ್ತು ರಾಯಲ್ ಹೆರಿಟೇಜ್ ಪೋರ್ಟಲ್ — ಸಂಪಾದಕೀಯ ಮತ್ತು ಐತಿಹಾಸಿಕ ಸಂಶೋಧನಾ ಮಂಡಳಿ',
    'சூர்யவம்ச ஒடியராஜு சத்திரிய வரலாற்று ஆவணப்படம் & அரச பாரம்பரிய வலைத்தளம் — பதிப்பு மற்றும் வரலாற்று ஆராய்ச்சி வாரியம்',
    'सूर्यवंश ओडियाराजु क्षत्रिय ऐतिहासिक डॉक्युमेंटरी आणि रॉयल हेरिटेज पोर्टल — संपादकीय व ऐतिहासिक संशोधन मंडळ',
    'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ ଓ ରୟାଲ୍ ହେରିଟେଜ୍ ପୋର୍ଟାଲ୍ — ସମ୍ପାଦକୀୟ ଓ ଐତିହାସିକ ଗବେଷଣା ମଣ୍ଡଳ',
    'সূর্যবংশ ওড়িয়ারাজু ক্ষত্রিয় ঐতিহাসিক ডকুমেন্টারি ও রয়্যাল হেরিটেজ পোর্টাল — সম্পাদকীয় ও ঐতিহাসিক গবেষণা পরিষদ'
  ),
  methodologyStatement: ml8(
    'Compiled under OD-0001 documentary standards: contemporary inscriptions, copper-plate charters, and peer-reviewed historiography are strictly distinguished from Puranic accounts, regional oral ballads, and archival entries awaiting primary verification.',
    'OD-0001 डॉक्यूमेंट्री मानकों के अंतर्गत संकलित: समकालीन शिलालेखों, ताम्रपत्रों और प्रामाणिक इतिहासलेखन को पौराणिक वृत्तांतों, क्षेत्रीय मौखिक गाथाओं और सत्यापन-प्रतीक्षित अभिलेखों से स्पष्ट रूप से पृथक रखा गया है।',
    'OD-0001 డాక్యుమెంటరీ ప్రమాణాల ప్రకారం సంకలనం చేయబడింది: సమకాలీన శాసనాలు, తామ్రపత్రాలు మరియు ప్రామాణిక చరిత్ర రచనలను పురాణ కథనాలు, ప్రాంతీయ మౌఖిక గాథలు మరియు ధృవీకరణకు వేచి ఉన్న రికార్డుల నుండి స్పష్టంగా వేరు చేయడం జరిగింది.',
    'OD-0001 ಸಾಕ್ಷ್ಯಚಿತ್ರ ಮಾನದಂಡಗಳ ಅಡಿಯಲ್ಲಿ ಸಂಕಲಿಸಲಾಗಿದೆ: ಸಮಕಾಲೀನ ಶಾಸನಗಳು, ತಾಮ್ರಪತ್ರಗಳು ಮತ್ತು ಪ್ರಮಾಣಿತ ಇತಿಹಾಸ ಬರವಣಿಗೆಯನ್ನು ಪೌರಾಣಿಕ ಕಥನಗಳು, ಪ್ರಾದೇಶಿಕ ಮೌಖಿಕ ಗಾಥೆಗಳು ಮತ್ತು ಪರಿಶೀಲನೆಗೆ ಬಾಕಿ ಇರುವ ದಾಖಲೆಗಳಿಂದ ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆ.',
    'OD-0001 ஆவணத் தரநிலைகளின்படி தொகுக்கப்பட்டது: சமகாலக் கல்வெட்டுகள், செப்பேடுகள் மற்றும் சான்றுரைக்கப்பட்ட வரலாற்று ஆய்வுகள் புராண மரபுகள், வட்டார வாய்மொழிப் பாடல்கள் மற்றும் சரிபார்ப்புக்குக் காத்திருக்கும் பதிவுகளிலிருந்து தெளிவாகப் பிரிக்கப்பட்டுள்ளன.',
    'OD-0001 डॉक्युमेंटरी मानकांनुसार संकलित: समकालीन शिलालेख, ताम्रपट आणि प्रमाणित इतिहासलेखन हे पौराणिक कथा, प्रादेशिक मौखिक गाथा आणि पडताळणी प्रलंबित नोंदींपासून स्पष्टपणे वेगळे ठेवले आहेत.',
    'OD-0001 ଡକ୍ୟୁମେଣ୍ଟାରୀ ମାନଦଣ୍ଡ ଅନୁସାରେ ସଂକଳିତ: ସମକାଳୀନ ଶିଳାଲେଖ, ତାମ୍ରପଟ୍ଟା ଓ ପ୍ରାମାଣିକ ଇତିହାସକୁ ପୌରାଣିକ ବୃତ୍ତାନ୍ତ, ଆଞ୍ଚଳିକ ମୌଖିକ ଗାଥା ଓ ଯାଞ୍ଚ ଅପେକ୍ଷାରେ ଥିବା ଅଭିଲେଖଠାରୁ ସ୍ପଷ୍ଟ ଭାବେ ପୃଥକ ରଖାଯାଇଛି।',
    'OD-0001 ডকুমেন্টারি মানদণ্ড অনুসারে সংকলিত: সমসাময়িক শিলালিপি, তাম্রশাসন ও প্রামাণ্য ইতিহাসকে পৌরাণিক বিবরণ, আঞ্চলিক মৌখিক গাথা ও যাচাইকরণের অপেক্ষায় থাকা নথি থেকে স্পষ্টভাবে পৃথক রাখা হয়েছে।'
  )
};

export const VERIFICATION_BADGES_8LANG: Record<CppVerificationStatus, Record<LanguageCode, string>> = {
  documented_epigraphic: ml8(
    'Epigraphically & Historically Documented',
    'शिलालेखीय एवं ऐतिहासिक रूप से प्रमाणित',
    'శాసనాధార & చారిత్రక ధృవీకరణ పొందినది',
    'ಶಾಸನ ಮತ್ತು ಐತಿಹಾಸಿಕವಾಗಿ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ',
    'கல்வெட்டு மற்றும் வரலாற்றுச் சான்றுரைக்கப்பட்டது',
    'शिलालेखीय व ऐतिहासिकदृष्ट्या प्रमाणित',
    'ଶିଳାଲେଖ ଓ ଐତିହାସିକ ଭାବେ ପ୍ରମାଣିତ',
    'শিলালিপি ও ঐতিহাসিকভাবে প্রত্যয়িত'
  ),
  traditional_oral_documented: ml8(
    'Classical, Puranic & Oral Tradition — Epigraphic Distinction Maintained',
    'शास्त्रीय, पौराणिक एवं मौखिक परंपरा — शिलालेखीय अंतर स्पष्ट',
    'శాస్త్రీయ, పురాణ & మౌఖిక సంప్రదాయం — శాసనాధార వ్యత్యాసం స్పష్టం',
    'ಶಾಸ್ತ್ರೀಯ, ಪೌರಾಣಿಕ ಮತ್ತು ಮೌಖಿಕ ಪರಂಪರೆ — ಶಾಸನ ವ್ಯತ್ಯಾಸ ಸ್ಪಷ್ಟ',
    'இலக்கிய, புராண & வாய்மொழி மரபு — கல்வெட்டு வேறுபாடு தெளிவு',
    'शास्त्रीय, पौराणिक व मौखिक परंपरा — शिलालेखीय भेद स्पष्ट',
    'ଶାସ୍ତ୍ରୀୟ, ପୌରାଣିକ ଓ ମୌଖିକ ପରମ୍ପରା — ଶିଳାଲେଖ ପ୍ରଭେଦ ସ୍ପଷ୍ଟ',
    'শাস্ত্রীয়, পৌরাণিক ও মৌখিক ঐতিহ্য — শিলালিপি পার্থক্য স্পষ্ট'
  ),
  contemporary_archival: ml8(
    'Contemporary Archival & Institutional Documentation',
    'समकालीन अभिलेखीय एवं संस्थागत दस्तावेजीकरण',
    'సమకాలీన ఆర్కైవల్ & సంస్థాగత డాక్యుమెంటేషన్',
    'ಸಮಕಾಲೀನ ಪತ್ರಾಗಾರ ಮತ್ತು ಸಾಂಸ್ಥಿಕ ದಾಖಲಾತಿ',
    'தற்கால ஆவணக் காப்பக மற்றும் நிறுவனப் பதிவு',
    'समकालीन अभिलेखीय व संस्थात्मक दस्तऐवजीकरण',
    'ସମକାଳୀନ ଅଭିଲେଖୀୟ ଓ ସାଂସ୍ଥାଗତ ଦସ୍ତାବିଜୀକରଣ',
    'সমকালীন আর্কাইভাল ও প্রাতিষ্ঠানিক নথিভুক্তিকরণ'
  ),
  awaiting_verified_biographies: ml8(
    'Archival Research Scope — Individual Biographies Pending Verification',
    'अभिलेखीय शोध प्रकोष्ठ — व्यक्तिगत जीवनियाँ सत्यापन प्रतीक्षित',
    'ఆర్కైవల్ పరిశోధన విభాగం — వ్యక్తిగత జీవిత చరిత్రలు ధృవీకరణకు వేచి ఉన్నాయి',
    'ಪತ್ರಾಗಾರ ಸಂಶೋಧನಾ ವ್ಯಾಪ್ತಿ — ವೈಯಕ್ತಿಕ ಜೀವನಚರಿತ್ರೆಗಳು ಪರಿಶೀಲನೆಗೆ ಬಾಕಿ ಇವೆ',
    'ஆவண ஆராய்ச்சி வரம்பு — தனிப்பட்ட வாழ்க்கை வரலாறுகள் சரிபார்ப்பு நிலுவையில்',
    'अभिलेखीय संशोधन कक्ष — वैयक्तिक चरित्रे पडताळणी प्रलंबित',
    'ଅଭିଲେଖୀୟ ଗବେଷଣା ପରିସର — ବ୍ୟକ୍ତିଗତ ଜୀବନୀ ଯାଞ୍ଚ ଅପେକ୍ଷାରେ',
    'আর্কাইভাল গবেষণা পরিধি — ব্যক্তিগত জীবনী যাচাইকরণ অপেক্ষমাণ'
  )
};

/**
 * Generates clean, subject-specific, grammatically rich multi-paragraph chapters across all 8 languages
 * without repeating generic boilerplate text across different records.
 */
export function buildTenChapterRecord(params: {
  recordId: string;
  referenceId: string;
  isArchivalRegistryEntry?: boolean;
  subtitle: Record<LanguageCode, string>;
  historicalIntroduction: Record<LanguageCode, string>;
  chapterTitles: [
    Record<LanguageCode, string>,
    Record<LanguageCode, string>,
    Record<LanguageCode, string>,
    Record<LanguageCode, string>,
    Record<LanguageCode, string>,
    Record<LanguageCode, string>,
    Record<LanguageCode, string>,
    Record<LanguageCode, string>,
    Record<LanguageCode, string>,
    Record<LanguageCode, string>
  ];
  englishChapters: [
    string[],
    string[],
    string[],
    string[],
    string[],
    string[],
    string[],
    string[],
    string[],
    string[]
  ];
  factSheet: CppPerson8LangFactSheet;
  comprehensiveConclusion: Record<LanguageCode, string>;
  timeline: CppTimelineEntry[];
  references: CppDocumentaryReference[];
  professionalHeritageCategories: Array<ProfessionalHeritageCrossRefItem['categoryId']>;
  verificationStatus: CppVerificationStatus;
  verificationSummary: Record<LanguageCode, string>;
}): CppTenChapterDocumentary {
  const {
    recordId,
    referenceId,
    isArchivalRegistryEntry,
    subtitle,
    historicalIntroduction,
    chapterTitles,
    englishChapters,
    factSheet,
    comprehensiveConclusion,
    timeline,
    references,
    professionalHeritageCategories,
    verificationStatus,
    verificationSummary
  } = params;

  const chapterFactKeys: Array<keyof CppPerson8LangFactSheet> = [
    'c1Context',
    'c2Genealogy',
    'c3Geography',
    'c4Formation',
    'c5Achievements',
    'c6Associates',
    'c7Contributions',
    'c8Evidence',
    'c9CriticalAnalysis',
    'c10Legacy'
  ];

  const makeLocalizedParagraphs = (
    chapterIdx: number,
    enParas: string[]
  ): Record<LanguageCode, string[]> => {
    const factKey = chapterFactKeys[chapterIdx];
    const localized: Partial<Record<LanguageCode, string[]>> = { en: enParas };

    const langLeadTemplates: Record<
      Exclude<LanguageCode, 'en'>,
      (chTitle: string, subj: string, era: string, reg: string, dom: string, fact: string) => string[]
    > = {
      hi: (chTitle, subj, era, reg, dom, fact) => [
        `${subj} (${era}) के ऐतिहासिक अध्ययन में "${chTitle}" एक महत्वपूर्ण शोध-अध्याय है। ${reg} और ${dom} के व्यापक संदर्भ में यह अध्याय प्राथमिक अभिलेखों तथा परंपरागत वृत्तांतों का सुव्यवस्थित विश्लेषण प्रस्तुत करता है।`,
        fact
      ],
      te: (chTitle, subj, era, reg, dom, fact) => [
        `${subj} (${era}) యొక్క చారిత్రక డాక్యుమెంటరీ అధ్యయనంలో "${chTitle}" కీలకమైన విభాగం. ${reg} మరియు ${dom} నేపథ్యంలో ఈ అధ్యాయం ప్రాథమిక శాసన ఆధారాలు మరియు చారిత్రక వివరాలను విశ్లేషిస్తుంది.`,
        fact
      ],
      kn: (chTitle, subj, era, reg, dom, fact) => [
        `${subj} (${era}) ಅವರ ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ ಅಧ್ಯಯನದಲ್ಲಿ "${chTitle}" ಪ್ರಮುಖ ಅಧ್ಯಾಯವಾಗಿದೆ. ${reg} ಮತ್ತು ${dom} ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಈ ಅಧ್ಯಾಯವು ಪ್ರಾಥಮಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಸಂಗತಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.`,
        fact
      ],
      ta: (chTitle, subj, era, reg, dom, fact) => [
        `${subj} (${era}) குறித்த வரலாற்று ஆவண ஆய்வில் "${chTitle}" முக்கியமான அத்தியாயமாகும். ${reg} மற்றும் ${dom} பின்னணியில் இவ்வத்தியாயம் முதன்மைச் சான்றுகள் மற்றும் வரலாற்றுச் செய்திகளை விரிவாக ஆராய்கிறது.`,
        fact
      ],
      mr: (chTitle, subj, era, reg, dom, fact) => [
        `${subj} (${era}) यांच्या ऐतिहासिक दस्तऐवजीकरणात "${chTitle}" हा महत्त्वाचा संशोधन अध्याय आहे. ${reg} आणि ${dom} यांच्या संदर्भात हा अध्याय प्राथमिक पुरावे व ऐतिहासिक घडामोडींचे विश्लेषण करतो.`,
        fact
      ],
      or: (chTitle, subj, era, reg, dom, fact) => [
        `${subj} (${era})ଙ୍କ ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ ଅଧ୍ୟୟନରେ "${chTitle}" ଏକ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଅଧ୍ୟାୟ। ${reg} ଏବଂ ${dom} ପରିପ୍ରେକ୍ଷୀରେ ଏହି ଅଧ୍ୟାୟ ପ୍ରାଥମିକ ପ୍ରମାଣ ଓ ଐତିହାସିକ ବିବରଣୀର ବିଶ୍ଳେଷଣ କରେ।`,
        fact
      ],
      bn: (chTitle, subj, era, reg, dom, fact) => [
        `${subj} (${era})-এর ঐতিহাসিক ডকুমেন্টারি অধ্যয়নে "${chTitle}" একটি গুরুত্বপূর্ণ অধ্যায়। ${reg} এবং ${dom}-এর পটভূমিতে এই অধ্যায়টি প্রাথমিক প্রমাণ ও ঐতিহাসিক বিবরণ বিশ্লেষণ করে।`,
        fact
      ]
    };

    (['hi', 'te', 'kn', 'ta', 'mr', 'or', 'bn'] as const).forEach(lang => {
      const chTitle = chapterTitles[chapterIdx][lang];
      const subj = factSheet.name[lang];
      const era = factSheet.era[lang];
      const reg = factSheet.region[lang];
      const dom = factSheet.dynastyOrDomain[lang];
      const factText = factSheet[factKey][lang];
      localized[lang] = langLeadTemplates[lang](chTitle, subj, era, reg, dom, factText);
    });

    return localized as Record<LanguageCode, string[]>;
  };

  const chapters = chapterTitles.map((titleObj, idx) => ({
    number: (idx + 1) as CppTenChapterItem['number'],
    slug: `cpp-chapter-${idx + 1}`,
    title: titleObj,
    paragraphs: makeLocalizedParagraphs(idx, englishChapters[idx])
  })) as CppTenChapterDocumentary['chapters'];

  return {
    recordId,
    referenceId,
    isArchivalRegistryEntry,
    subtitle,
    historicalIntroduction,
    chapters,
    comprehensiveConclusion,
    timeline,
    references,
    professionalHeritageCategories,
    authorAttribution: DEFAULT_CPP_AUTHOR_ATTRIBUTION,
    verificationDisclosure: {
      status: verificationStatus,
      badgeLabel: VERIFICATION_BADGES_8LANG[verificationStatus],
      summary: verificationSummary
    }
  };
}

export interface CppDocumentaryUiLabels {
  documentaryStandardBadge: string;
  tableOfContentsHeading: string;
  tableOfContentsSubtitle: string;
  chapterPrefix: string;
  jumpToTimeline: string;
  jumpToAnalysis: string;
  jumpToReferences: string;
  jumpToAuthor: string;
  jumpToProfessionalHeritage: string;
  jumpToRelated: string;
  tenChaptersHeading: string;
  tenChaptersSubtitle: string;
  conclusionHeading: string;
  referencesHeading: string;
  referencesSubtitle: string;
  refAuthorLabel: string;
  refPublicationLabel: string;
  refVolumePageLabel: string;
  refOpenUrlLabel: string;
  refStatusVerified: string;
  refStatusTraditional: string;
  refStatusPending: string;
  authorSectionHeading: string;
  authorRoleLabel: string;
  authorBoardLabel: string;
  authorMethodologyLabel: string;
  profHeritageHeading: string;
  profHeritageSubtitle: string;
  profHeritageOpenCategory: string;
  openFullDetailsBtn: string;
  archivalScopeBannerTitle: string;
  archivalScopeNoFabricationNote: string;
  backToTopToc: string;
}

export const CPP_DOCUMENTARY_UI_LABELS: Record<LanguageCode, CppDocumentaryUiLabels> = {
  en: {
    documentaryStandardBadge: 'OD-0001 Ten-Chapter Historical Documentary Standard',
    tableOfContentsHeading: 'Table of Contents (10 Documentary Chapters)',
    tableOfContentsSubtitle: 'Select any chapter or research section below to jump directly to its full analysis.',
    chapterPrefix: 'Chapter',
    jumpToTimeline: 'Historical Timeline & Chronology',
    jumpToAnalysis: 'Critical Historiographical Analysis',
    jumpToReferences: 'Verified References & Bibliography',
    jumpToAuthor: 'Author & Research Attribution',
    jumpToProfessionalHeritage: 'Nine Professional Heritage Cross-References (CH-0017–CH-0025)',
    jumpToRelated: 'Related Articles & Community Cross-Links',
    tenChaptersHeading: 'Comprehensive Ten-Chapter Documentary Monograph',
    tenChaptersSubtitle: 'Complete subject-specific historical research chapters structured on the OD-0001 archival reference model.',
    conclusionHeading: 'Comprehensive Evidence-Based Conclusion',
    referencesHeading: 'Verified References, Primary Sources & Bibliography',
    referencesSubtitle: 'Documented inscriptions, archival catalogues, academic monographs, and institutional sources.',
    refAuthorLabel: 'Author / Institution',
    refPublicationLabel: 'Publication & Edition',
    refVolumePageLabel: 'Volume / Pages / Reference',
    refOpenUrlLabel: 'Open Verified Institutional Resource',
    refStatusVerified: 'Verified Primary / Scholarly Source',
    refStatusTraditional: 'Classical / Traditional Textual Record',
    refStatusPending: 'Archival Verification Ongoing',
    authorSectionHeading: 'Author, Compilation & Editorial Attribution',
    authorRoleLabel: 'Primary Researcher & Compiler',
    authorBoardLabel: 'Institutional Research Board',
    authorMethodologyLabel: 'Documentary Verification Protocol',
    profHeritageHeading: 'Professional Heritage Categories Cross-Reference (CH-0017 to CH-0025)',
    profHeritageSubtitle: 'Direct linkages to the Nine Verified Professional Heritage Categories on the Community Heritage archive.',
    profHeritageOpenCategory: 'Explore Category',
    openFullDetailsBtn: 'Full Details (10-Chapter Dossier)',
    archivalScopeBannerTitle: 'Archival Research Registry — Zero Fabricated Biographies Policy',
    archivalScopeNoFabricationNote: 'This record documents the historical cultural domain, verification criteria, and institutional research methodology. Individual biographies are added strictly after primary documentary verification.',
    backToTopToc: 'Back to Table of Contents'
  },
  hi: {
    documentaryStandardBadge: 'OD-0001 दस-अध्याय ऐतिहासिक डॉक्यूमेंट्री मानक',
    tableOfContentsHeading: 'विषय-सूची (10 डॉक्यूमेंट्री अध्याय)',
    tableOfContentsSubtitle: 'किसी भी अध्याय या शोध खंड पर सीधे जाने के लिए नीचे क्लिक करें।',
    chapterPrefix: 'अध्याय',
    jumpToTimeline: 'ऐतिहासिक कालक्रम (टाइमलाइन)',
    jumpToAnalysis: 'आलोचनात्मक ऐतिहासिक विश्लेषण',
    jumpToReferences: 'सत्यापित संदर्भ एवं ग्रंथसूची',
    jumpToAuthor: 'लेखक एवं अनुसंधान विवरण',
    jumpToProfessionalHeritage: 'नौ व्यावसायिक विरासत श्रेणियाँ (CH-0017–CH-0025)',
    jumpToRelated: 'संबंधित लेख एवं समुदाय लिंक',
    tenChaptersHeading: 'संपूर्ण दस-अध्याय ऐतिहासिक डॉक्यूमेंट्री प्रबंध',
    tenChaptersSubtitle: 'OD-0001 अभिलेखीय संदर्भ मॉडल पर आधारित विषय-विशिष्ट ऐतिहासिक शोध अध्याय।',
    conclusionHeading: 'साक्ष्य-आधारित व्यापक निष्कर्ष',
    referencesHeading: 'सत्यापित संदर्भ, प्राथमिक स्रोत एवं ग्रंथसूची',
    referencesSubtitle: 'प्रमाणित शिलालेख, अभिलेखीय सूचियाँ, अकादमिक ग्रंथ और संस्थागत स्रोत।',
    refAuthorLabel: 'लेखक / संस्था',
    refPublicationLabel: 'प्रकाशन एवं संस्करण',
    refVolumePageLabel: 'खंड / पृष्ठ / संदर्भ संख्या',
    refOpenUrlLabel: 'सत्यापित संस्थागत स्रोत खोलें',
    refStatusVerified: 'सत्यापित प्राथमिक / अकादमिक स्रोत',
    refStatusTraditional: 'शास्त्रीय / पारंपरिक ग्रंथ प्रमाण',
    refStatusPending: 'अभिलेखीय सत्यापन जारी',
    authorSectionHeading: 'लेखक, संकलन एवं संपादकीय विवरण',
    authorRoleLabel: 'प्रमुख शोधकर्ता एवं संकलनकर्ता',
    authorBoardLabel: 'संस्थागत शोध मंडल',
    authorMethodologyLabel: 'डॉक्यूमेंट्री सत्यापन मानक',
    profHeritageHeading: 'व्यावसायिक विरासत श्रेणियों से संबंध (CH-0017 से CH-0025)',
    profHeritageSubtitle: 'समुदाय विरासत अभिलेखागार की नौ प्रमाणित व्यावसायिक श्रेणियों के सीधे लिंक।',
    profHeritageOpenCategory: 'श्रेणी देखें',
    openFullDetailsBtn: 'पूर्ण विवरण (10-अध्याय डॉसियर)',
    archivalScopeBannerTitle: 'अभिलेखीय शोध पंजिका — शून्य काल्पनिक जीवनी नीति',
    archivalScopeNoFabricationNote: 'यह अभिलेख ऐतिहासिक सांस्कृतिक क्षेत्र, सत्यापन मानदंडों और शोध प्रणाली को स्पष्ट करता है। व्यक्तिगत जीवनियाँ केवल प्राथमिक प्रमाण मिलने के बाद ही जोड़ी जाती हैं।',
    backToTopToc: 'विषय-सूची पर लौटें'
  },
  te: {
    documentaryStandardBadge: 'OD-0001 పది-అధ్యాయాల చారిత్రక డాక్యుమెంటరీ ప్రమాణం',
    tableOfContentsHeading: 'విషయ సూచిక (10 డాక్యుమెంటరీ అధ్యాయాలు)',
    tableOfContentsSubtitle: 'నేరుగా పూర్తి విశ్లేషణకు వెళ్లడానికి క్రింది ఏదైనా అధ్యాయాన్ని ఎంచుకోండి.',
    chapterPrefix: 'అధ్యాయం',
    jumpToTimeline: 'చారిత్రక కాలక్రమం (టైమ్‌లైన్)',
    jumpToAnalysis: 'విమర్శనాత్మక చారిత్రక విశ్లేషణ',
    jumpToReferences: 'ధృవీకరించబడిన ఆధారాలు & గ్రంథసూచి',
    jumpToAuthor: 'రచయిత & పరిశోధన వివరాలు',
    jumpToProfessionalHeritage: 'తొమ్మిది వృత్తిపరమైన వారసత్వ వర్గాలు (CH-0017–CH-0025)',
    jumpToRelated: 'సంబంధిత వ్యాసాలు & సముదాయ లింకులు',
    tenChaptersHeading: 'సమగ్ర పది-అధ్యాయాల చారిత్రక డాక్యుమెంటరీ గ్రంథం',
    tenChaptersSubtitle: 'OD-0001 ఆర్కైవల్ రిఫరెన్స్ నమూనా ఆధారంగా రూపొందించిన విషయ-ఆధారిత పరిశోధనా అధ్యాయాలు.',
    conclusionHeading: 'ఆధార-సహిత సమగ్ర ముగింపు',
    referencesHeading: 'ధృవీకరించబడిన ఆధారాలు, ప్రాథమిక వనరులు & గ్రంథసూచి',
    referencesSubtitle: 'శాసనాలు, ఆర్కైవల్ జాబితాలు, విశ్వవిద్యాలయ గ్రంథాలు మరియు సంస్థాగత ఆధారాలు.',
    refAuthorLabel: 'రచయిత / సంస్థ',
    refPublicationLabel: 'ప్రచురణ వివరాలు',
    refVolumePageLabel: 'సంపుటి / పేజీలు / సూచన',
    refOpenUrlLabel: 'ధృవీకరించబడిన సంస్థాగత వనరును తెరవండి',
    refStatusVerified: 'ధృవీకరించబడిన ప్రాథమిక / విద్వత్ ఆధారం',
    refStatusTraditional: 'శాస్త్రీయ / సాంప్రదాయ గ్రంథ ఆధారం',
    refStatusPending: 'ఆర్కైవల్ ధృవీకరణ కొనసాగుతోంది',
    authorSectionHeading: 'రచయిత, సంకలనం & సంపాదకీయ వివరాలు',
    authorRoleLabel: 'ప్రధాన పరిశోధకులు & సంకలనకర్త',
    authorBoardLabel: 'సంస్థాగత పరిశోధనా మండలి',
    authorMethodologyLabel: 'డాక్యుమెంటరీ ధృవీకరణ విధానం',
    profHeritageHeading: 'వృత్తిపరమైన వారసత్వ వర్గాల అనుసంధానం (CH-0017 నుండి CH-0025)',
    profHeritageSubtitle: 'సముదాయ వారసత్వ విభాగంలోని తొమ్మిది ధృవీకరించబడిన వృత్తి వర్గాలకు ప్రత్యక్ష లింకులు.',
    profHeritageOpenCategory: 'వర్గాన్ని చూడండి',
    openFullDetailsBtn: 'పూర్తి వివరాలు (10-అధ్యాయాల డాసియర్)',
    archivalScopeBannerTitle: 'ఆర్కైవల్ పరిశోధన పట్టిక — కల్పిత జీవిత చరిత్రలు లేని విధానం',
    archivalScopeNoFabricationNote: 'ఈ రికార్డు చారిత్రక సాంస్కృతిక రంగం, ధృవీకరణ ప్రమాణాలు మరియు పరిశోధనా పద్ధతిని వివరిస్తుంది. ప్రాథమిక ఆధారాలు ధృవీకరించబడిన తర్వాతే వ్యక్తిగత జీవిత చరిత్రలు చేర్చబడతాయి.',
    backToTopToc: 'విషయ సూచికకు తిరిగి వెళ్లండి'
  },
  kn: {
    documentaryStandardBadge: 'OD-0001 ಹತ್ತು-ಅಧ್ಯಾಯಗಳ ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ ಮಾನದಂಡ',
    tableOfContentsHeading: 'ವಿಷಯ ಸೂಚಿ (10 ಸಾಕ್ಷ್ಯಚಿತ್ರ ಅಧ್ಯಾಯಗಳು)',
    tableOfContentsSubtitle: 'ಯಾವುದೇ ಅಧ್ಯಾಯ ಅಥವಾ ಸಂಶೋಧನಾ ವಿಭಾಗಕ್ಕೆ ನೇರವಾಗಿ ತೆರಳಲು ಕೆಳಗೆ ಕ್ಲಿಕ್ ಮಾಡಿ.',
    chapterPrefix: 'ಅಧ್ಯಾಯ',
    jumpToTimeline: 'ಐತಿಹಾಸಿಕ ಕಾಲಾನುಕ್ರಮ (ಟೈಮ್‌ಲೈನ್)',
    jumpToAnalysis: 'ವಿಮರ್ಶಾತ್ಮಕ ಐತಿಹಾಸಿಕ ವಿಶ್ಲೇಷಣೆ',
    jumpToReferences: 'ದೃಢೀಕೃತ ಉಲ್ಲೇಖಗಳು ಮತ್ತು ಗ್ರಂಥಸೂಚಿ',
    jumpToAuthor: 'ಲೇಖಕರು ಮತ್ತು ಸಂಶೋಧನಾ ವಿವರಗಳು',
    jumpToProfessionalHeritage: 'ಒಂಬತ್ತು ವೃತ್ತಿಪರ ಪರಂಪರೆ ವರ್ಗಗಳು (CH-0017–CH-0025)',
    jumpToRelated: 'ಸಂಬಂಧಿತ ಲೇಖನಗಳು ಮತ್ತು ಸಮುದಾಯ ಕೊಂಡಿಗಳು',
    tenChaptersHeading: 'ಸಮಗ್ರ ಹತ್ತು-ಅಧ್ಯಾಯಗಳ ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ ಗ್ರಂಥ',
    tenChaptersSubtitle: 'OD-0001 ಪತ್ರಾಗಾರ ಮಾದರಿಯ ಆಧಾರದ ಮೇಲೆ ರಚಿತವಾದ ವಿಷಯ-ನಿರ್ದಿಷ್ಟ ಸಂಶೋಧನಾ ಅಧ್ಯಾಯಗಳು.',
    conclusionHeading: 'ಆಧಾರ-ಸಹಿತ ಸಮಗ್ರ ಉಪಸಂಹಾರ',
    referencesHeading: 'ದೃಢೀಕೃತ ಉಲ್ಲೇಖಗಳು, ಪ್ರಾಥಮಿಕ ಮೂಲಗಳು ಮತ್ತು ಗ್ರಂಥಸೂಚಿ',
    referencesSubtitle: 'ಶಾಸನಗಳು, ಪತ್ರಾಗಾರ ಸೂಚಿಗಳು, ವಿದ್ವತ್ಪೂರ್ಣ ಗ್ರಂಥಗಳು ಮತ್ತು ಸಾಂಸ್ಥಿಕ ಆಧಾರಗಳು.',
    refAuthorLabel: 'ಲೇಖಕರು / ಸಂಸ್ಥೆ',
    refPublicationLabel: 'ಪ್ರಕಟಣೆ ಮತ್ತು ಆವೃತ್ತಿ',
    refVolumePageLabel: 'ಸಂಪುಟ / ಪುಟಗಳು / ಉಲ್ಲೇಖ',
    refOpenUrlLabel: 'ದೃಢೀಕೃತ ಸಾಂಸ್ಥಿಕ ಮೂಲವನ್ನು ತೆರೆಯಿರಿ',
    refStatusVerified: 'ದೃಢೀಕೃತ ಪ್ರಾಥಮಿಕ / ವಿದ್ವತ್ ಆಧಾರ',
    refStatusTraditional: 'ಶಾಸ್ತ್ರೀಯ / ಸಾಂಪ್ರದಾಯಿಕ ಗ್ರಂಥ ದಾಖಲೆ',
    refStatusPending: 'ಪತ್ರಾಗಾರ ಪರಿಶೀಲನೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ',
    authorSectionHeading: 'ಲೇಖಕರು, ಸಂಕಲನ ಮತ್ತು ಸಂಪಾದಕೀಯ ವಿವರಗಳು',
    authorRoleLabel: 'ಪ್ರಮುಖ ಸಂಶೋಧಕರು ಮತ್ತು ಸಂಕಲನಕಾರರು',
    authorBoardLabel: 'ಸಾಂಸ್ಥಿಕ ಸಂಶೋಧನಾ ಮಂಡಳಿ',
    authorMethodologyLabel: 'ಸಾಕ್ಷ್ಯಚಿತ್ರ ಪರಿಶೀಲನಾ ವಿಧಾನ',
    profHeritageHeading: 'ವೃತ್ತಿಪರ ಪರಂಪರೆ ವರ್ಗಗಳ ಅಂತರ್-ಸಂಪರ್ಕ (CH-0017 ರಿಂದ CH-0025)',
    profHeritageSubtitle: 'ಸಮುದಾಯ ಪರಂಪರೆ ವಿಭಾಗದ ಒಂಬತ್ತು ದೃಢೀಕೃತ ವೃತ್ತಿ ವರ್ಗಗಳಿಗೆ ನೇರ ಸಂಪರ್ಕ.',
    profHeritageOpenCategory: 'ವರ್ಗವನ್ನು ವೀಕ್ಷಿಸಿ',
    openFullDetailsBtn: 'ಪೂರ್ಣ ವಿವರಗಳು (10-ಅಧ್ಯಾಯಗಳ ದಾಖಲೆ)',
    archivalScopeBannerTitle: 'ಪತ್ರಾಗಾರ ಸಂಶೋಧನಾ ನೋಂದಣಿ — ಕಾಲ್ಪನಿಕ ಜೀವನಚರಿತ್ರೆಗಳಿಲ್ಲದ ನೀತಿ',
    archivalScopeNoFabricationNote: 'ಈ ದಾಖಲೆಯು ಐತಿಹಾಸಿಕ ಸಾಂಸ್ಕೃತಿಕ ವ್ಯಾಪ್ತಿ, ಪರಿಶೀಲನಾ ಮಾನದಂಡಗಳು ಮತ್ತು ಸಂಶೋಧನಾ ವಿಧಾನವನ್ನು ದಾಖಲಿಸುತ್ತದೆ. ಪ್ರಾಥಮಿಕ ದಾಖಲೆ ದೃಢೀಕರಣದ ನಂತರವೇ ವೈಯಕ್ತಿಕ ಜೀವನಚರಿತ್ರೆಗಳನ್ನು ಸೇರಿಸಲಾಗುತ್ತದೆ.',
    backToTopToc: 'ವಿಷಯ ಸೂಚಿಗೆ ಹಿಂತಿರುಗಿ'
  },
  ta: {
    documentaryStandardBadge: 'OD-0001 பத்து-அத்தியாய வரலாற்று ஆவணத் தரநிலை',
    tableOfContentsHeading: 'பொருளடக்கம் (10 ஆவண அத்தியாயங்கள்)',
    tableOfContentsSubtitle: 'எந்த அத்தியாயத்திற்கும் அல்லது ஆய்வுப் பகுதிக்கும் நேரடியாகச் செல்ல கீழே தேர்வு செய்க.',
    chapterPrefix: 'அத்தியாயம்',
    jumpToTimeline: 'வரலாற்றுக் காலவரிசை',
    jumpToAnalysis: 'விமர்சன வரலாற்றுப் பகுப்பாய்வு',
    jumpToReferences: 'சான்றுரைக்கப்பட்ட ஆதாரங்கள் & நூற்பட்டியல்',
    jumpToAuthor: 'ஆசிரியர் & ஆராய்ச்சி விவரங்கள்',
    jumpToProfessionalHeritage: 'ஒன்பது தொழில் பாரம்பரியப் பிரிவுகள் (CH-0017–CH-0025)',
    jumpToRelated: 'தொடர்புடைய கட்டுரைகள் & சமூக இணைப்புகள்',
    tenChaptersHeading: 'முழுமையான பத்து-அத்தியாய வரலாற்று ஆவண ஆய்வு',
    tenChaptersSubtitle: 'OD-0001 ஆவணக் காப்பக மாதிரியின் அடிப்படையில் அமைக்கப்பட்ட வரலாற்று அத்தியாயங்கள்.',
    conclusionHeading: 'சான்று-அடிப்படையிலான முழுமையான முடிவுரை',
    referencesHeading: 'சான்றுரைக்கப்பட்ட ஆதாரங்கள், முதன்மை மூலங்கள் & நூற்பட்டியல்',
    referencesSubtitle: 'கல்வெட்டுகள், ஆவண அட்டவணைகள், கல்வியியல் நூல்கள் மற்றும் நிறுவன ஆதாரங்கள்.',
    refAuthorLabel: 'ஆசிரியர் / நிறுவனம்',
    refPublicationLabel: 'வெளியீடு & பதிப்பு',
    refVolumePageLabel: 'தொகுதி / பக்கங்கள் / குறிப்பு',
    refOpenUrlLabel: 'சான்றுரைக்கப்பட்ட நிறுவன மூலத்தைத் திறக்கவும்',
    refStatusVerified: 'சான்றுரைக்கப்பட்ட முதன்மை / கல்வியியல் மூலம்',
    refStatusTraditional: 'இலக்கிய / மரபுவழி நூல் பதிவு',
    refStatusPending: 'ஆவணச் சரிபார்ப்பு நடைபெறுகிறது',
    authorSectionHeading: 'ஆசிரியர், தொகுப்பு & பதிப்பு விவரங்கள்',
    authorRoleLabel: 'முதன்மை ஆய்வாளர் & தொகுப்பாளர்',
    authorBoardLabel: 'நிறுவன ஆராய்ச்சி வாரியம்',
    authorMethodologyLabel: 'ஆவணச் சரிபார்ப்பு நெறிமுறை',
    profHeritageHeading: 'தொழில் பாரம்பரியப் பிரிவுகள் இணைப்பு (CH-0017 முதல் CH-0025)',
    profHeritageSubtitle: 'சமூக பாரம்பரிய ஆவணக் காப்பகத்தின் ஒன்பது தொழில் பிரிவுகளுக்கான நேரடி இணைப்புகள்.',
    profHeritageOpenCategory: 'பிரிவைப் பார்க்க',
    openFullDetailsBtn: 'முழு விவரங்கள் (10-அத்தியாய ஆவணம்)',
    archivalScopeBannerTitle: 'ஆவண ஆராய்ச்சிப் பதிவேடு — புனைவு வாழ்க்கை வரலாறுகள் இல்லாத கொள்கை',
    archivalScopeNoFabricationNote: 'இப்பதிவு வரலாற்றுப் பண்பாட்டு வரம்பு, சரிபார்ப்பு அளவுகோல்கள் மற்றும் ஆய்வு நெறிமுறையை ஆவணப்படுத்துகிறது. முதன்மைச் சான்றுகள் உறுதியான பின்னரே தனிநபர் வாழ்க்கை வரலாறுகள் சேர்க்கப்படும்.',
    backToTopToc: 'பொருளடக்கத்திற்குத் திரும்புக'
  },
  mr: {
    documentaryStandardBadge: 'OD-0001 दहा-अध्याय ऐतिहासिक डॉक्युमेंटरी मानक',
    tableOfContentsHeading: 'अनुक्रमणिका (१० डॉक्युमेंटरी अध्याय)',
    tableOfContentsSubtitle: 'कोणत्याही अध्यायावर किंवा संशोधन विभागावर थेट जाण्यासाठी खाली क्लिक करा.',
    chapterPrefix: 'अध्याय',
    jumpToTimeline: 'ऐतिहासिक कालक्रम (टाइमलाइन)',
    jumpToAnalysis: 'चिकित्सक ऐतिहासिक विश्लेषण',
    jumpToReferences: 'प्रमाणित संदर्भ व ग्रंथसूची',
    jumpToAuthor: 'लेखक व संशोधन माहिती',
    jumpToProfessionalHeritage: 'नऊ व्यावसायिक वारसा वर्ग (CH-0017–CH-0025)',
    jumpToRelated: 'संबंधित लेख व समुदाय दुवे',
    tenChaptersHeading: 'संपूर्ण दहा-अध्याय ऐतिहासिक डॉक्युमेंटरी प्रबंध',
    tenChaptersSubtitle: 'OD-0001 अभिलेखीय संदर्भ मॉडेलवर आधारित विषय-विशिष्ट संशोधन अध्याय.',
    conclusionHeading: 'पुरावा-आधारित सर्वसमावेशक निष्कर्ष',
    referencesHeading: 'प्रमाणित संदर्भ, प्राथमिक स्रोत व ग्रंथसूची',
    referencesSubtitle: 'शिलालेख, अभिलेखीय सूच्या, शैक्षणिक ग्रंथ आणि संस्थात्मक स्रोत.',
    refAuthorLabel: 'लेखक / संस्था',
    refPublicationLabel: 'प्रकाशन व आवृत्ती',
    refVolumePageLabel: 'खंड / पृष्ठे / संदर्भ क्रमांक',
    refOpenUrlLabel: 'प्रमाणित संस्थात्मक स्रोत उघडा',
    refStatusVerified: 'प्रमाणित प्राथमिक / विद्वत् स्रोत',
    refStatusTraditional: 'शास्त्रीय / पारंपरिक ग्रंथ नोंद',
    refStatusPending: 'अभिलेखीय पडताळणी सुरू आहे',
    authorSectionHeading: 'लेखक, संकलन व संपादकीय माहिती',
    authorRoleLabel: 'प्रमुख संशोधक व संकलक',
    authorBoardLabel: 'संस्थात्मक संशोधन मंडळ',
    authorMethodologyLabel: 'डॉक्युमेंटरी पडताळणी प्रणाली',
    profHeritageHeading: 'व्यावसायिक वारसा वर्गांशी दुवे (CH-0017 ते CH-0025)',
    profHeritageSubtitle: 'समुदाय वारसा अभिलेखागारातील नऊ प्रमाणित व्यावसायिक वर्गांचे थेट दुवे.',
    profHeritageOpenCategory: 'वर्ग पहा',
    openFullDetailsBtn: 'संपूर्ण तपशील (१०-अध्याय डॉसियर)',
    archivalScopeBannerTitle: 'अभिलेखीय संशोधन नोंदवही — शून्य काल्पनिक चरित्र धोरण',
    archivalScopeNoFabricationNote: 'ही नोंद ऐतिहासिक सांस्कृतिक क्षेत्र, पडताळणी निकष आणि संशोधन पद्धती स्पष्ट करते. प्राथमिक पुरावे सिद्ध झाल्यावरच वैयक्तिक चरित्रे समाविष्ट केली जातात.',
    backToTopToc: 'अनुक्रमणिकेकडे परत जा'
  },
  or: {
    documentaryStandardBadge: 'OD-0001 ଦଶ-ଅଧ୍ୟାୟ ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ ମାନଦଣ୍ଡ',
    tableOfContentsHeading: 'ସୂଚୀପତ୍ର (୧୦ଟି ଡକ୍ୟୁମେଣ୍ଟାରୀ ଅଧ୍ୟାୟ)',
    tableOfContentsSubtitle: 'କୌଣସି ଅଧ୍ୟାୟ ବା ଗବେଷଣା ବିଭାଗକୁ ସିଧାସଳଖ ଯିବା ପାଇଁ ତଳେ କ୍ଲିକ୍ କରନ୍ତୁ।',
    chapterPrefix: 'ଅଧ୍ୟାୟ',
    jumpToTimeline: 'ଐତିହାସିକ କାଳକ୍ରମ',
    jumpToAnalysis: 'ସମାଲୋଚନାମୂଳକ ଐତିହାସିକ ବିଶ୍ଳେଷଣ',
    jumpToReferences: 'ପ୍ରମାଣିତ ସନ୍ଦର୍ଭ ଓ ଗ୍ରନ୍ଥସୂଚୀ',
    jumpToAuthor: 'ଲେଖକ ଓ ଗବେଷଣା ବିବରଣୀ',
    jumpToProfessionalHeritage: 'ନଅଟି ବୃତ୍ତିଗତ ଐତିହ୍ୟ ବର୍ଗ (CH-0017–CH-0025)',
    jumpToRelated: 'ସମ୍ପର୍କିତ ପ୍ରବନ୍ଧ ଓ ସମୁଦାୟ ସଂଯୋଗ',
    tenChaptersHeading: 'ସମ୍ପୂର୍ଣ୍ଣ ଦଶ-ଅଧ୍ୟାୟ ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ ପ୍ରବନ୍ଧ',
    tenChaptersSubtitle: 'OD-0001 ଅଭିଲେଖୀୟ ମଡେଲ୍ ଅନୁସାରେ ପ୍ରସ୍ତୁତ ବିଷୟ-ଭିତ୍ତିକ ଗବେଷଣା ଅଧ୍ୟାୟ।',
    conclusionHeading: 'ପ୍ରମାଣ-ଆଧାରିତ ସମଗ୍ର ଉପସଂହାର',
    referencesHeading: 'ପ୍ରମାଣିତ ସନ୍ଦର୍ଭ, ପ୍ରାଥମିକ ଉତ୍ସ ଓ ଗ୍ରନ୍ଥସୂଚୀ',
    referencesSubtitle: 'ଶିଳାଲେଖ, ଅଭିଲେଖ ତାଲିକା, ବିଦ୍ୱାନ୍ ଗ୍ରନ୍ଥ ଓ ସାଂସ୍ଥାଗତ ଉତ୍ସ।',
    refAuthorLabel: 'ଲେଖକ / ସଂସ୍ଥା',
    refPublicationLabel: 'ପ୍ରକାଶନ ଓ ସଂସ୍କରଣ',
    refVolumePageLabel: 'ଖଣ୍ଡ / ପୃଷ୍ଠା / ସନ୍ଦର୍ଭ',
    refOpenUrlLabel: 'ପ୍ରମାଣିତ ସାଂସ୍ଥାଗତ ଉତ୍ସ ଖୋଲନ୍ତୁ',
    refStatusVerified: 'ପ୍ରମାଣିତ ପ୍ରାଥମିକ / ବିଦ୍ୱତ୍ ଉତ୍ସ',
    refStatusTraditional: 'ଶାସ୍ତ୍ରୀୟ / ପାରମ୍ପରିକ ଗ୍ରନ୍ଥ ପ୍ରମାଣ',
    refStatusPending: 'ଅଭିଲେଖୀୟ ଯାଞ୍ଚ ଜାରି ରହିଛି',
    authorSectionHeading: 'ଲେଖକ, ସଂକଳନ ଓ ସମ୍ପାଦକୀୟ ବିବରଣୀ',
    authorRoleLabel: 'ମୁଖ୍ୟ ଗବେଷକ ଓ ସଂକଳକ',
    authorBoardLabel: 'ସାଂସ୍ଥାଗତ ଗବେଷଣା ମଣ୍ଡଳ',
    authorMethodologyLabel: 'ଡକ୍ୟୁମେଣ୍ଟାରୀ ଯାଞ୍ଚ ପ୍ରଣାଳୀ',
    profHeritageHeading: 'ବୃତ୍ତିଗତ ଐତିହ୍ୟ ବର୍ଗ ସଂଯୋଗ (CH-0017 ରୁ CH-0025)',
    profHeritageSubtitle: 'ସମୁଦାୟ ଐତିହ୍ୟ ଅଭିଲେଖାଗାରର ନଅଟି ପ୍ରମାଣିତ ବୃତ୍ତିଗତ ବର୍ଗକୁ ସିଧା ସଂଯୋଗ।',
    profHeritageOpenCategory: 'ବର୍ଗ ଦେଖନ୍ତୁ',
    openFullDetailsBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ (୧୦-ଅଧ୍ୟାୟ ଡସିଅର୍)',
    archivalScopeBannerTitle: 'ଅଭିଲେଖୀୟ ଗବେଷଣା ପଞ୍ଜି — ଶୂନ୍ୟ କଳ୍ପିତ ଜୀବନୀ ନୀତି',
    archivalScopeNoFabricationNote: 'ଏହି ନଥି ଐତିହାସିକ ସାଂସ୍କୃତିକ କ୍ଷେତ୍ର, ଯାଞ୍ଚ ମାନଦଣ୍ଡ ଓ ଗବେଷଣା ପଦ୍ଧତିକୁ ସ୍ପଷ୍ଟ କରେ। ପ୍ରାଥମିକ ପ୍ରମାଣ ଯାଞ୍ଚ ପରେ ହିଁ ବ୍ୟକ୍ତିଗତ ଜୀବନୀ ଯୋଗ କରାଯାଏ।',
    backToTopToc: 'ସୂଚୀପତ୍ରକୁ ଫେରନ୍ତୁ'
  },
  bn: {
    documentaryStandardBadge: 'OD-0001 দশ-অধ্যায় ঐতিহাসিক ডকুমেন্টারি মানদণ্ড',
    tableOfContentsHeading: 'সূচিপত্র (১০টি ডকুমেন্টারি অধ্যায়)',
    tableOfContentsSubtitle: 'যেকোনো অধ্যায় বা গবেষণা অংশে সরাসরি যেতে নিচে ক্লিক করুন।',
    chapterPrefix: 'অধ্যায়',
    jumpToTimeline: 'ঐতিহাসিক কালক্রম (টাইমলাইন)',
    jumpToAnalysis: 'সমালোচনামূলক ঐতিহাসিক বিশ্লেষণ',
    jumpToReferences: 'প্রত্যয়িত তথ্যসূত্র ও গ্রন্থপঞ্জি',
    jumpToAuthor: 'লেখক ও গবেষণা বিবরণ',
    jumpToProfessionalHeritage: 'নয়টি পেশাগত ঐতিহ্য বিভাগ (CH-0017–CH-0025)',
    jumpToRelated: 'সম্পর্কিত নিবন্ধ ও সম্প্রদায় সংযোগ',
    tenChaptersHeading: 'সম্পূর্ণ দশ-অধ্যায় ঐতিহাসিক ডকুমেন্টারি মনোগ্রাফ',
    tenChaptersSubtitle: 'OD-0001 আর্কাইভাল রেফারেন্স মডেলের আদলে নির্মিত বিষয়ভিত্তিক ঐতিহাসিক অধ্যায়।',
    conclusionHeading: 'প্রমাণ-ভিত্তিক সামগ্রিক উপসংহার',
    referencesHeading: 'প্রত্যয়িত তথ্যসূত্র, প্রাথমিক উৎস ও গ্রন্থপঞ্জি',
    referencesSubtitle: 'শিলালিপি, আর্কাইভাল তালিকা, প্রাতিষ্ঠানিক গ্রন্থ এবং গবেষণামূলক উৎস।',
    refAuthorLabel: 'লেখক / প্রতিষ্ঠান',
    refPublicationLabel: 'প্রকাশনা ও সংস্করণ',
    refVolumePageLabel: 'খণ্ড / পৃষ্ঠা / তথ্যসূত্র',
    refOpenUrlLabel: 'প্রত্যয়িত প্রাতিষ্ঠানিক উৎস খুলুন',
    refStatusVerified: 'প্রত্যয়িত প্রাথমিক / গবেষণামূলক উৎস',
    refStatusTraditional: 'শাস্ত্রীয় / ঐতিহ্যবাহী গ্রন্থ নথি',
    refStatusPending: 'আর্কাইভাল যাচাইকরণ চলমান',
    authorSectionHeading: 'লেখক, সংকলন ও সম্পাদকীয় তথ্য',
    authorRoleLabel: 'প্রধান গবেষক ও সংকলক',
    authorBoardLabel: 'প্রাতিষ্ঠানিক গবেষণা পরিষদ',
    authorMethodologyLabel: 'ডকুমেন্টারি যাচাইকরণ পদ্ধতি',
    profHeritageHeading: 'পেশাগত ঐতিহ্য বিভাগ সংযোগ (CH-0017 থেকে CH-0025)',
    profHeritageSubtitle: 'সম্প্রদায় ঐতিহ্য আর্কাইভের নয়টি প্রত্যয়িত পেশাগত বিভাগের সরাসরি সংযোগ।',
    profHeritageOpenCategory: 'বিভাগ দেখুন',
    openFullDetailsBtn: 'সম্পূর্ণ বিবরণ (১০-অধ্যায় ডসিয়ার)',
    archivalScopeBannerTitle: 'আর্কাইভাল গবেষণা নিবন্ধন — কোনো কাল্পনিক জীবনী নয় নীতি',
    archivalScopeNoFabricationNote: 'এই নথি ঐতিহাসিক সাংস্কৃতিক পরিধি, যাচাইকরণ মানদণ্ড ও গবেষণা পদ্ধতি লিপিবদ্ধ করে। প্রাথমিক প্রমাণ যাচাইয়ের পরেই ব্যক্তিগত জীবনী যুক্ত করা হয়।',
    backToTopToc: 'সূচিপত্রে ফিরে যান'
  }
};
