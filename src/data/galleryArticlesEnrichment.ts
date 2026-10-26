import {
  GalleryItem,
  LanguageCode
} from '../types';
import {
  getCanonicalGallery,
  getCanonicalLocations,
  getCanonicalMonuments,
  getCanonicalDocuments,
  getCanonicalInscriptions,
  getCanonicalTimelineEvents
} from './archivalSeedData';
import { getAllArticles } from './articlesRepository';

export interface GalleryKeywordTag {
  id: string;
  label: string;
  allLabels: Record<LanguageCode, string>;
}

export interface GalleryImageSlide {
  url: string;
  caption: string;
  alt: string;
  source: string;
}

export interface GalleryImportantDate {
  dateText: string;
  eventTitle: string;
  significance: string;
}

export interface GalleryReferenceItem {
  title: string;
  type: string;
  authorityOrLocation: string;
  details: string;
  verified: boolean;
}

export interface EnrichedGalleryArticle {
  item: GalleryItem;
  categoryLabel: string;
  galleryImages: GalleryImageSlide[];
  fullDescription: string;
  historicalBackground: string[];
  archaeologicalAndEpigraphicFindings: string[];
  transcriptionExcerpt?: string;
  translationExcerpt?: string;
  importantDates: GalleryImportantDate[];
  historicalPeople: string[];
  historicalPlaces: string[];
  dynasties: string[];
  references: GalleryReferenceItem[];
  keywords: GalleryKeywordTag[];
  linkedArticleTitle?: string;
  linkedArticleAuthor?: string;
  linkedArticleDate?: string;
  translationComplete: boolean;
}

export interface RelatedGalleryArticleMatch {
  article: EnrichedGalleryArticle;
  sharedKeywords: GalleryKeywordTag[];
  sharedCategory: boolean;
  relevanceScore: number;
}

export interface GalleryUITranslations {
  viewDetails: string;
  readMore: string;
  backButton: string;
  backToPreviousArticle: string;
  backToKeywordResults: string;
  backToGallery: string;
  closeButton: string;
  keywordsHeading: string;
  relatedArticlesHeading: string;
  relatedArticlesSubtitle: string;
  noRelatedArticlesFound: string;
  noKeywordArticlesFoundDesc: string;
  clearKeywordFilter: string;
  showAllArticles: string;
  keywordFilterActiveBanner: string;
  keywordModalHeader: string;
  articlesMatchingKeyword: string;
  fullDescriptionHeading: string;
  historicalBackgroundHeading: string;
  archaeologicalFindingsHeading: string;
  importantDatesHeading: string;
  historicalPeopleHeading: string;
  historicalPlacesHeading: string;
  referencesHeading: string;
  archivalMetadataHeading: string;
  epigraphicExcerptHeading: string;
  creatorPhotographerLabel: string;
  archivalSourceLabel: string;
  copyrightLicenseLabel: string;
  verificationStatusLabel: string;
  periodLabel: string;
  locationLabel: string;
  categoryLabel: string;
  dynastyLabel: string;
  verifiedPrimaryBadge: string;
  imageGalleryHeading: string;
  filterByKeywordPlaceholder: string;
  popularKeywordsLabel: string;
  translationNoticeFallback: string;
  sharedTopicsLabel: string;
  exploreKeywordTooltip: string;
}

export const GALLERY_UI_TRANSLATIONS: Record<LanguageCode, GalleryUITranslations> = {
  en: {
    viewDetails: 'View Details',
    readMore: 'Read Full Article →',
    backButton: 'Back',
    backToPreviousArticle: 'Back to Previous Article',
    backToKeywordResults: 'Back to Keyword Results',
    backToGallery: 'Back to Gallery',
    closeButton: 'Close',
    keywordsHeading: 'Keywords & Archival Topics',
    relatedArticlesHeading: 'Related Historical Articles',
    relatedArticlesSubtitle: 'Connected gallery records sharing dynasties, historical figures, locations, or archival themes.',
    noRelatedArticlesFound: 'No Related Articles Found',
    noKeywordArticlesFoundDesc: 'No gallery articles matched the selected keyword or topic filter. Try selecting another keyword below or reset the filter to view all archival records.',
    clearKeywordFilter: 'Clear Keyword Filter',
    showAllArticles: 'Show All Gallery Articles',
    keywordFilterActiveBanner: 'Filtered by Keyword',
    keywordModalHeader: 'Related Content by Keyword',
    articlesMatchingKeyword: 'Archival Articles Matching Topic',
    fullDescriptionHeading: 'Complete Archival Description',
    historicalBackgroundHeading: 'Historical Background & Documentary Context',
    archaeologicalFindingsHeading: 'Archaeological & Epigraphic Evidence',
    importantDatesHeading: 'Important Dates & Chronological Milestones',
    historicalPeopleHeading: 'Associated Rulers & Historical Figures',
    historicalPlacesHeading: 'Historical Places & Geographical Corridor',
    referencesHeading: 'Primary Sources & Scholarly References',
    archivalMetadataHeading: 'Archival Provenance & Licensing',
    epigraphicExcerptHeading: 'Primary Epigraphic / Manuscript Excerpt',
    creatorPhotographerLabel: 'Creator / Archival Authority',
    archivalSourceLabel: 'Primary Repository / Source',
    copyrightLicenseLabel: 'Copyright & Usage License',
    verificationStatusLabel: 'Verification Status',
    periodLabel: 'Historical Period',
    locationLabel: 'Location',
    categoryLabel: 'Archive Category',
    dynastyLabel: 'Associated Dynasty',
    verifiedPrimaryBadge: 'Reviewed Archival Record',
    imageGalleryHeading: 'Archival Visual Plates',
    filterByKeywordPlaceholder: 'Search or filter by keyword...',
    popularKeywordsLabel: 'Explore by Historical Keyword:',
    translationNoticeFallback: 'Note: Primary epigraphic citations and bibliographic catalog identifiers are preserved in standard archival format alongside the localized narrative.',
    sharedTopicsLabel: 'Shared Topics:',
    exploreKeywordTooltip: 'Click to view all articles tagged with this keyword'
  },
  hi: {
    viewDetails: 'विवरण देखें',
    readMore: 'संपूर्ण लेख पढ़ें →',
    backButton: 'वापस',
    backToPreviousArticle: 'पिछले लेख पर वापस जाएं',
    backToKeywordResults: 'कीवर्ड परिणामों पर वापस जाएं',
    backToGallery: 'दीर्घा पर वापस जाएं',
    closeButton: 'बंद करें',
    keywordsHeading: 'मुख्य शब्द एवं ऐतिहासिक विषय (Keywords)',
    relatedArticlesHeading: 'संबंधित ऐतिहासिक लेख',
    relatedArticlesSubtitle: 'समान राजवंश, ऐतिहासिक व्यक्तित्व, स्थान और पुरातात्विक विषयों से जुड़े अन्य अभिलेख।',
    noRelatedArticlesFound: 'कोई संबंधित लेख नहीं मिला',
    noKeywordArticlesFoundDesc: 'चयनित कीवर्ड या विषय से मेल खाने वाला कोई दीर्घा लेख नहीं मिला। कृपया नीचे अन्य कीवर्ड चुनें या सभी अभिलेख देखने के लिए फ़िल्टर हटाएं।',
    clearKeywordFilter: 'कीवर्ड फ़िल्टर हटाएं',
    showAllArticles: 'सभी दीर्घा लेख दिखाएं',
    keywordFilterActiveBanner: 'चयनित कीवर्ड फ़िल्टर',
    keywordModalHeader: 'कीवर्ड से संबंधित ऐतिहासिक सामग्री',
    articlesMatchingKeyword: 'इस विषय से जुड़े अभिलेखीय लेख',
    fullDescriptionHeading: 'संपूर्ण अभिलेखीय विवरण',
    historicalBackgroundHeading: 'ऐतिहासिक पृष्ठभूमि एवं प्रामाणिक संदर्भ',
    archaeologicalFindingsHeading: 'पुरातात्विक एवं शिलालेखीय साक्ष्य',
    importantDatesHeading: 'महत्वपूर्ण तिथियां एवं कालक्रम',
    historicalPeopleHeading: 'संबंधित सम्राट एवं ऐतिहासिक व्यक्तित्व',
    historicalPlacesHeading: 'ऐतिहासिक स्थान एवं भौगोलिक क्षेत्र',
    referencesHeading: 'प्राथमिक स्रोत एवं विद्वत संदर्भ',
    archivalMetadataHeading: 'अभिलेखीय स्रोत एवं लाइसेंस विवरण',
    epigraphicExcerptHeading: 'प्राथमिक शिलालेख / पांडुलिपि अंश',
    creatorPhotographerLabel: 'निर्माता / अभिलेखीय प्राधिकरण',
    archivalSourceLabel: 'प्राथमिक संग्रहालय / स्रोत',
    copyrightLicenseLabel: 'कॉपीराइट एवं उपयोग लाइसेंस',
    verificationStatusLabel: 'सत्यापन स्थिति',
    periodLabel: 'ऐतिहासिक कालखंड',
    locationLabel: 'स्थान',
    categoryLabel: 'अभिलेख श्रेणी',
    dynastyLabel: 'संबंधित राजवंश',
    verifiedPrimaryBadge: 'सत्यापित अभिलेखीय रिकॉर्ड',
    imageGalleryHeading: 'अभिलेखीय चित्र संग्रह',
    filterByKeywordPlaceholder: 'कीवर्ड द्वारा खोजें या फ़िल्टर करें...',
    popularKeywordsLabel: 'ऐतिहासिक कीवर्ड द्वारा खोजें:',
    translationNoticeFallback: 'नोट: मूल शिलालेखीय उद्धरण और ग्रंथसूची संदर्भ मानक अभिलेखीय प्रारूप में सुरक्षित रखे गए हैं।',
    sharedTopicsLabel: 'साझा विषय:',
    exploreKeywordTooltip: 'इस कीवर्ड से जुड़े सभी लेख देखने के लिए क्लिक करें'
  },
  te: {
    viewDetails: 'వివరాలు చూడండి',
    readMore: 'పూర్తి వ్యాసం చదవండి →',
    backButton: 'వెనుకకు',
    backToPreviousArticle: 'మునుపటి వ్యాసానికి వెనుకకు',
    backToKeywordResults: 'కీవర్డ్ ఫలితాలకు వెనుకకు',
    backToGallery: 'గ్యాలరీకి తిరిగి వెళ్ళండి',
    closeButton: 'మూసివేయి',
    keywordsHeading: 'కీలక పదాలు & చారిత్రక అంశాలు (Keywords)',
    relatedArticlesHeading: 'సంబంధిత చారిత్రక వ్యాసాలు',
    relatedArticlesSubtitle: 'ఉమ్మడి రాజవంశాలు, చారిత్రక వ్యక్తులు, ప్రదేశాలు మరియు పురావస్తు అంశాలతో ముడిపడిన ఇతర గ్యాలరీ వ్యాసాలు.',
    noRelatedArticlesFound: 'సంబంధిత వ్యాసాలు కనుగొనబడలేదు',
    noKeywordArticlesFoundDesc: 'ఎంచుకున్న కీవర్డ్ లేదా అంశానికి సరిపోయే గ్యాలరీ వ్యాసాలు ఏవీ లేవు. దయచేసి వేరొక కీవర్డ్‌ని ఎంచుకోండి లేదా అన్ని వ్యాసాలను చూడటానికి ఫిల్టర్‌ను తొలగించండి.',
    clearKeywordFilter: 'కీవర్డ్ ఫిల్టర్ తొలగించండి',
    showAllArticles: 'అన్ని గ్యాలరీ వ్యాసాలను చూపించు',
    keywordFilterActiveBanner: 'కీవర్డ్ ఫిల్టర్ ద్వారా ఎంచుకోబడింది',
    keywordModalHeader: 'కీవర్డ్ ఆధారిత సంబంధిత వ్యాసాలు',
    articlesMatchingKeyword: 'ఈ అంశానికి సంబంధించిన చారిత్రక వ్యాసాలు',
    fullDescriptionHeading: 'పూర్తి పురాతత్వ వివరణ',
    historicalBackgroundHeading: 'చారిత్రక నేపథ్యం & డాక్యుమెంటరీ విశ్లేషణ',
    archaeologicalFindingsHeading: 'పురావస్తు & శాసన ఆధారాలు',
    importantDatesHeading: 'ముఖ్యమైన తేదీలు & కాలక్రమ ఘట్టాలు',
    historicalPeopleHeading: 'సంబంధిత చక్రవర్తులు & చారిత్రక వ్యక్తులు',
    historicalPlacesHeading: 'చారిత్రక ప్రదేశాలు & భౌగోళిక ప్రాంతం',
    referencesHeading: 'ప్రాథమిక ఆధారాలు & పరిశోధనా గ్రంథాలు',
    archivalMetadataHeading: 'పురాతత్వ మూలం & లైసెన్స్ వివరాలు',
    epigraphicExcerptHeading: 'ప్రాథమిక శాసన / తాళపత్ర మూల పాఠం',
    creatorPhotographerLabel: 'సేకరణకర్త / పురావస్తు సంస్థ',
    archivalSourceLabel: 'ప్రాథమిక భాండాగారం / మూలం',
    copyrightLicenseLabel: 'కాపీరైట్ & వినియోగ లైసెన్స్',
    verificationStatusLabel: 'ధృవీకరణ స్థితి',
    periodLabel: 'చారిత్రక కాలం',
    locationLabel: 'ప్రదేశం',
    categoryLabel: 'విభాగం',
    dynastyLabel: 'సంబంధిత రాజవంశం',
    verifiedPrimaryBadge: 'ధృవీకరించబడిన పురాతత్వ రికార్డు',
    imageGalleryHeading: 'పురాతత్వ ఛాయాచిత్రాలు',
    filterByKeywordPlaceholder: 'కీవర్డ్ ద్వారా వెతకండి లేదా ఫిల్టర్ చేయండి...',
    popularKeywordsLabel: 'చారిత్రక కీవర్డ్ ద్వారా అన్వేషించండి:',
    translationNoticeFallback: 'గమనిక: ప్రాథమిక శాసన ఉల్లేఖనాలు మరియు గ్రంథసూచిక వివరాలు ప్రామాణిక పురాతత్వ రూపంలో ఉంచబడ్డాయి.',
    sharedTopicsLabel: 'ఉమ్మడి అంశాలు:',
    exploreKeywordTooltip: 'ఈ కీవర్డ్‌తో ఉన్న అన్ని వ్యాసాలను చూడటానికి క్లిక్ చేయండి'
  },
  kn: {
    viewDetails: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    readMore: 'ಪೂರ್ಣ ಲೇಖನ ಓದಿ →',
    backButton: 'ಹಿಂದಕ್ಕೆ',
    backToPreviousArticle: 'ಹಿಂದಿನ ಲೇಖನಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    backToKeywordResults: 'ಕೀವರ್ಡ್ ಫಲಿತಾಂಶಗಳಿಗೆ ಹಿಂತಿರುಗಿ',
    backToGallery: 'ಗ್ಯಾಲರಿಗೆ ಹಿಂತಿರುಗಿ',
    closeButton: 'ಮುಚ್ಚಿ',
    keywordsHeading: 'ಮುಖ್ಯ ಪದಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ವಿಷಯಗಳು (Keywords)',
    relatedArticlesHeading: 'ಸಂಬಂಧಿತ ಐತಿಹಾಸಿಕ ಲೇಖನಗಳು',
    relatedArticlesSubtitle: 'ಸಮಾನ ರಾಜವಂಶ, ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು, ಸ್ಥಳಗಳು ಮತ್ತು ಪುರಾತತ್ವ ವಿಷಯಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಲೇಖನಗಳು.',
    noRelatedArticlesFound: 'ಸಂಬಂಧಿತ ಲೇಖನಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
    noKeywordArticlesFoundDesc: 'ಆಯ್ಕೆಮಾಡಿದ ಕೀವರ್ಡ್ ಅಥವಾ ವಿಷಯಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಗ್ಯಾಲರಿ ಲೇಖನಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಮತ್ತೊಂದು ಕೀವರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ.',
    clearKeywordFilter: 'ಕೀವರ್ಡ್ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ',
    showAllArticles: 'ಎಲ್ಲಾ ಗ್ಯಾಲರಿ ಲೇಖನಗಳನ್ನು ತೋರಿಸಿ',
    keywordFilterActiveBanner: 'ಕೀವರ್ಡ್ ಮೂಲಕ ಫಿಲ್ಟರ್ ಮಾಡಲಾಗಿದೆ',
    keywordModalHeader: 'ಕೀವರ್ಡ್ ಆಧಾರಿತ ಸಂಬಂಧಿತ ಲೇಖನಗಳು',
    articlesMatchingKeyword: 'ಈ ವಿಷಯಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಐತಿಹಾಸಿಕ ಲೇಖನಗಳು',
    fullDescriptionHeading: 'ಸಂಪೂರ್ಣ ಪತ್ರಾಗಾರ ವಿವರಣೆ',
    historicalBackgroundHeading: 'ಐತಿಹಾಸಿಕ ಹಿನ್ನೆಲೆ ಮತ್ತು ದಾಖಲಾತಿ ಸಂದರ್ಭ',
    archaeologicalFindingsHeading: 'ಪುರಾತತ್ವ ಮತ್ತು ಶಾಸನ ಪುರಾವೆಗಳು',
    importantDatesHeading: 'ಪ್ರಮುಖ ದಿನಾಂಕಗಳು ಮತ್ತು ಕಾಲಾನುಕ್ರಮ',
    historicalPeopleHeading: 'ಸಂಬಂಧಿತ ಅರಸರು ಮತ್ತು ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು',
    historicalPlacesHeading: 'ಐತಿಹಾಸಿಕ ಸ್ಥಳಗಳು ಮತ್ತು ಭೌಗೋಳಿಕ ವ್ಯಾಪ್ತಿ',
    referencesHeading: 'ಪ್ರಾಥಮಿಕ ಆಧಾರಗಳು ಮತ್ತು ವಿದ್ವತ್ ಉಲ್ಲೇಖಗಳು',
    archivalMetadataHeading: 'ಪತ್ರಾಗಾರ ಮೂಲ ಮತ್ತು ಪರವಾನಗಿ ವಿವರಗಳು',
    epigraphicExcerptHeading: 'ಪ್ರಾಥಮಿಕ ಶಾಸನ / ಹಸ್ತಪ್ರತಿ ಉಲ್ಲೇಖ',
    creatorPhotographerLabel: 'ರಚನೆಕಾರರು / ಪತ್ರಾಗಾರ ಪ್ರಾಧಿಕಾರ',
    archivalSourceLabel: 'ಪ್ರಾಥಮಿಕ ಸಂಗ್ರಹಾಲಯ / ಮೂಲ',
    copyrightSourceLabel: 'ಪರವಾನಗಿ',
    copyrightLicenseLabel: 'ಕೃತಿಸ್ವಾಮ್ಯ ಮತ್ತು ಬಳಕೆ ಪರವಾನಗಿ',
    verificationStatusLabel: 'ಪರಿಶೀಲನಾ ಸ್ಥಿತಿ',
    periodLabel: 'ಐತಿಹಾಸಿಕ ಕಾಲಘಟ್ಟ',
    locationLabel: 'ಸ್ಥಳ',
    categoryLabel: 'ವರ್ಗ',
    dynastyLabel: 'ಸಂಬಂಧಿತ ರಾಜವಂಶ',
    verifiedPrimaryBadge: 'ಪರಿಶೀಲಿಸಿದ ಪತ್ರಾಗಾರ ದಾಖಲೆ',
    imageGalleryHeading: 'ಪತ್ರಾಗಾರ ಛಾಯಾಚಿತ್ರಗಳು',
    filterByKeywordPlaceholder: 'ಕೀವರ್ಡ್ ಮೂಲಕ ಹುಡುಕಿ ಅಥವಾ ಫಿಲ್ಟರ್ ಮಾಡಿ...',
    popularKeywordsLabel: 'ಐತಿಹಾಸಿಕ ಕೀವರ್ಡ್ ಮೂಲಕ ಹುಡುಕಿ:',
    translationNoticeFallback: 'ಗಮನಿಸಿ: ಮೂಲ ಶಾಸನ ಉಲ್ಲೇಖಗಳು ಮತ್ತು ಗ್ರಂಥಸೂಚಿ ವಿವರಗಳನ್ನು ಪ್ರಮಾಣಿತ ಪತ್ರಾಗಾರ ರೂಪದಲ್ಲಿ ಉಳಿಸಿಕೊಳ್ಳಲಾಗಿದೆ.',
    sharedTopicsLabel: 'ಸಮಾನ ವಿಷಯಗಳು:',
    exploreKeywordTooltip: 'ಈ ಕೀವರ್ಡ್ ಹೊಂದಿರುವ ಎಲ್ಲಾ ಲೇಖನಗಳನ್ನು ನೋಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ'
  } as GalleryUITranslations,
  ta: {
    viewDetails: 'விவரங்களைக் காண்க',
    readMore: 'முழு கட்டுரையைப் படிக்க →',
    backButton: 'பின்செல்',
    backToPreviousArticle: 'முந்தைய கட்டுரைக்குத் திரும்பு',
    backToKeywordResults: 'முக்கியச் சொல் முடிவுகளுக்குத் திரும்பு',
    backToGallery: 'தொகுப்பிற்குத் திரும்பு',
    closeButton: 'மூடு',
    keywordsHeading: 'முக்கியச் சொற்கள் & வரலாற்றுத் தலைப்புகள் (Keywords)',
    relatedArticlesHeading: 'தொடர்புடைய வரலாற்றுக் கட்டுரைகள்',
    relatedArticlesSubtitle: 'ஒரே வம்சம், வரலாற்று ஆளுமைகள், இடங்கள் மற்றும் தொல்லியல் கருப்பொருட்களைப் பகிரும் கட்டுரைகள்.',
    noRelatedArticlesFound: 'தொடர்புடைய கட்டுரைகள் எதுவும் கிடைக்கவில்லை',
    noKeywordArticlesFoundDesc: 'தேர்ந்தெடுக்கப்பட்ட முக்கியச் சொல்லுக்குப் பொருந்தும் கட்டுரைகள் எதுவும் இல்லை. வேறொரு முக்கியச் சொல்லைத் தேர்ந்தெடுக்கவும் அல்லது வடிகட்டியை நீக்கவும்.',
    clearKeywordFilter: 'முக்கியச் சொல் வடிகட்டியை நீக்கு',
    showAllArticles: 'அனைத்து கட்டுரைகளையும் காட்டு',
    keywordFilterActiveBanner: 'முக்கியச் சொல் மூலம் வடிகட்டப்பட்டது',
    keywordModalHeader: 'முக்கியச் சொல் தொடர்புடைய கட்டுரைகள்',
    articlesMatchingKeyword: 'இந்தத் தலைப்புடன் பொருந்தும் ஆவணக் கட்டுரைகள்',
    fullDescriptionHeading: 'முழுமையான ஆவண விளக்கம்',
    historicalBackgroundHeading: 'வரலாற்றுப் பின்னணி மற்றும் ஆவணச் சூழல்',
    archaeologicalFindingsHeading: 'தொல்லியல் மற்றும் கல்வெட்டுச் சான்றுகள்',
    importantDatesHeading: 'முக்கியத் தேதிகள் மற்றும் காலவரிசை நிகழ்வுகள்',
    historicalPeopleHeading: 'தொடர்புடைய மன்னர்கள் மற்றும் வரலாற்று ஆளுமைகள்',
    historicalPlacesHeading: 'வரலாற்று இடங்கள் மற்றும் புவியியல் பகுதி',
    referencesHeading: 'முதன்மைச் சான்றுகள் மற்றும் ஆய்வுக் குறிப்புகள்',
    archivalMetadataHeading: 'ஆவண மூலம் மற்றும் உரிம விவரங்கள்',
    epigraphicExcerptHeading: 'முதன்மைக் கல்வெட்டு / ஓலைச்சுவடி பகுதி',
    creatorPhotographerLabel: 'உருவாக்கியவர் / ஆவண ஆணையம்',
    archivalSourceLabel: 'முதன்மைக் காப்பகம் / ஆதாரம்',
    copyrightLicenseLabel: 'பதிப்புரிமை மற்றும் பயன்பாட்டு உரிமம்',
    verificationStatusLabel: 'சரிபார்ப்பு நிலை',
    periodLabel: 'வரலாற்றுக் காலம்',
    locationLabel: 'இடம்',
    categoryLabel: 'வகை',
    dynastyLabel: 'தொடர்புடைய வம்சம்',
    verifiedPrimaryBadge: 'சரிபார்க்கப்பட்ட ஆவணப் பதிவு',
    imageGalleryHeading: 'ஆவணப் புகைப்படத் தொகுப்பு',
    filterByKeywordPlaceholder: 'முக்கியச் சொல் மூலம் தேடுக...',
    popularKeywordsLabel: 'வரலாற்று முக்கியச் சொல் மூலம் ஆராய்க:',
    translationNoticeFallback: 'குறிப்பு: முதன்மைக் கல்வெட்டு மேற்கோள்கள் மற்றும் நூற்பட்டியல் குறிப்புகள் நிலையான ஆவண வடிவத்தில் பாதுகாக்கப்பட்டுள்ளன.',
    sharedTopicsLabel: 'பகிரப்பட்ட தலைப்புகள்:',
    exploreKeywordTooltip: 'இந்த முக்கியச் சொல்லுடன் தொடர்புடைய அனைத்து கட்டுரைகளையும் காண சொடுக்கவும்'
  },
  mr: {
    viewDetails: 'तपशील पहा',
    readMore: 'संपूर्ण लेख वाचा →',
    backButton: 'मागे',
    backToPreviousArticle: 'मागील लेखावर परत जा',
    backToKeywordResults: 'कीवर्ड निकालांवर परत जा',
    backToGallery: 'दालनाकडे परत जा',
    closeButton: 'बंद करा',
    keywordsHeading: 'मुख्य शब्द आणि ऐतिहासिक विषय (Keywords)',
    relatedArticlesHeading: 'संबंधित ऐतिहासिक लेख',
    relatedArticlesSubtitle: 'समान राजवंश, ऐतिहासिक व्यक्ती, ठिकाणे आणि पुरातत्वीय विषयांशी संबंधित इतर अभिलेख.',
    noRelatedArticlesFound: 'कोणतेही संबंधित लेख आढळले नाहीत',
    noKeywordArticlesFoundDesc: 'निवडलेल्या कीवर्ड किंवा विषयाशी जुळणारे कोणतेही लेख आढळले नाहीत. कृपया खालील दुसरा कीवर्ड निवडा किंवा फिल्टर हटवा.',
    clearKeywordFilter: 'कीवर्ड फिल्टर हटवा',
    showAllArticles: 'सर्व दालन लेख दर्शवा',
    keywordFilterActiveBanner: 'कीवर्डनुसार फिल्टर केलेले',
    keywordModalHeader: 'कीवर्ड संबंधित ऐतिहासिक माहिती',
    articlesMatchingKeyword: 'या विषयाशी जुळणारे अभिलेखीय लेख',
    fullDescriptionHeading: 'संपूर्ण अभिलेखीय वर्णन',
    historicalBackgroundHeading: 'ऐतिहासिक पार्श्वभूमी आणि दस्तऐवजी संदर्भ',
    archaeologicalFindingsHeading: 'पुरातत्वीय आणि शिलालेखीय पुरावे',
    importantDatesHeading: 'महत्त्वाच्या तारखा आणि कालक्रम',
    historicalPeopleHeading: 'संबंधित सम्राट आणि ऐतिहासिक व्यक्ती',
    historicalPlacesHeading: 'ऐतिहासिक ठिकाणे आणि भौगोलिक परिसर',
    referencesHeading: 'प्राथमिक स्रोत आणि संशोधकीय संदर्भ',
    archivalMetadataHeading: 'अभिलेखीय उद्गम आणि परवाना तपशील',
    epigraphicExcerptHeading: 'प्राथमिक शिलालेख / हस्तलिखित उतारा',
    creatorPhotographerLabel: 'निर्माता / अभिलेखीय प्राधिकरण',
    archivalSourceLabel: 'प्राथमिक संग्रहालय / स्रोत',
    copyrightLicenseLabel: 'कॉपीराइट आणि वापर परवाना',
    verificationStatusLabel: 'पडताळणी स्थिती',
    periodLabel: 'ऐतिहासिक कालखंड',
    locationLabel: 'ठिकाण',
    categoryLabel: 'श्रेणी',
    dynastyLabel: 'संबंधित राजवंश',
    verifiedPrimaryBadge: 'पडताळलेला अभिलेखीय दस्तऐवज',
    imageGalleryHeading: 'अभिलेखीय छायाचित्रे',
    filterByKeywordPlaceholder: 'कीवर्डद्वारे शोधा किंवा फिल्टर करा...',
    popularKeywordsLabel: 'ऐतिहासिक कीवर्डद्वारे शोधा:',
    translationNoticeFallback: 'टीप: मूळ शिलालेखीय संदर्भ आणि ग्रंथसूची नोंदी प्रमाणित अभिलेखीय स्वरूपात जतन केल्या आहेत.',
    sharedTopicsLabel: 'सामायिक विषय:',
    exploreKeywordTooltip: 'या कीवर्डशी संबंधित सर्व लेख पाहण्यासाठी क्लिक करा'
  },
  or: {
    viewDetails: 'ବିବରଣୀ ଦେଖନ୍ତୁ',
    readMore: 'ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରବନ୍ଧ ପଢ଼ନ୍ତୁ →',
    backButton: 'ପଛକୁ',
    backToPreviousArticle: 'ପୂର୍ବ ପ୍ରବନ୍ଧକୁ ଫେରନ୍ତୁ',
    backToKeywordResults: 'କୀୱାର୍ଡ ଫଳାଫଳକୁ ଫେରନ୍ତୁ',
    backToGallery: 'ଗ୍ୟାଲେରୀକୁ ଫେରନ୍ତୁ',
    closeButton: 'ବନ୍ଦ କରନ୍ତୁ',
    keywordsHeading: 'ମୁଖ୍ୟ ଶବ୍ଦ ଓ ଐତିହାସିକ ବିଷୟ (Keywords)',
    relatedArticlesHeading: 'ସମ୍পର୍କିତ ଐତିହାସିକ ପ୍ରବନ୍ଧ',
    relatedArticlesSubtitle: 'ସମାନ ରାଜବଂଶ, ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ, ସ୍ଥାନ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ବିଷୟ ସହ ଜଡ଼ିତ ଅନ୍ୟାନ୍ୟ ଅଭିଲେଖ।',
    noRelatedArticlesFound: 'କୌଣସି ସମ୍ପର୍କିତ ପ୍ରବନ୍ଧ ମିଳିଲା ନାହିଁ',
    noKeywordArticlesFoundDesc: 'ବାଛିଥିବା କୀୱାର୍ଡ କିମ୍ବା ବିଷୟ ସହିତ ମେଳ ଖାଉଥିବା କୌଣସି ପ୍ରବନ୍ଧ ମିଳିଲା ନାହିଁ। ଦୟାକରି ଅନ୍ୟ ଏକ କୀୱାର୍ଡ ବାଛନ୍ତୁ କିମ୍ବା ଫିଲ୍ଟର ହଟାନ୍ତୁ।',
    clearKeywordFilter: 'କୀୱାର୍ଡ ଫିଲ୍ଟର ହଟାନ୍ତୁ',
    showAllArticles: 'ସମସ୍ତ ଗ୍ୟାଲେରୀ ପ୍ରବନ୍ଧ ଦେଖାନ୍ତୁ',
    keywordFilterActiveBanner: 'କୀୱାର୍ଡ ଦ୍ୱାରା ଫିଲ୍ଟର କରାଯାଇଛି',
    keywordModalHeader: 'କୀୱାର୍ଡ ସମ୍ପର୍କିତ ଐତିହାସିକ ବିଷୟବସ୍ତୁ',
    articlesMatchingKeyword: 'ଏହି ବିଷୟ ସହ ଜଡ଼ିତ ପ୍ରାମାଣିକ ପ୍ରବନ୍ଧ',
    fullDescriptionHeading: 'ସମ୍ପୂର୍ଣ୍ଣ ଅଭିଲେଖ ବିବରଣୀ',
    historicalBackgroundHeading: 'ଐତିହାସିକ ପୃଷ୍ଠଭୂମି ଓ ପ୍ରାମାଣିକ ବିଶ୍ଳେଷଣ',
    archaeologicalFindingsHeading: 'ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଓ ଶିଳାଲେଖ ପ୍ରମାଣ',
    importantDatesHeading: 'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ତାରିଖ ଓ କାଳକ୍ରମ',
    historicalPeopleHeading: 'ସମ୍ପର୍କିତ ସମ୍ରାଟ ଓ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ',
    historicalPlacesHeading: 'ଐତିହାସିକ ସ୍ଥାନ ଓ ଭୌଗୋଳିକ କ୍ଷେତ୍ର',
    referencesHeading: 'ମୌଳିକ ଉତ୍ସ ଓ ଗବେଷଣା ସନ୍ଦର୍ଭ',
    archivalMetadataHeading: 'ଅଭିଲେଖାଗାର ଉତ୍ସ ଓ ଲାଇସେନ୍ସ ବିବରଣୀ',
    epigraphicExcerptHeading: 'ମୌଳିକ ଶିଳାଲେଖ / ତାଳପତ୍ର ପୋଥି ଉଦ୍ଧୃତି',
    creatorPhotographerLabel: 'ନିର୍ମାତା / ଅଭିଲେଖ କର୍ତ୍ତୃପକ୍ଷ',
    archivalSourceLabel: 'ମୌଳିକ ସଂଗ୍ରହାଳୟ / ଉତ୍ସ',
    copyrightLicenseLabel: 'କପିରାଇଟ୍ ଓ ବ୍ୟବହାର ଲାଇସେନ୍ସ',
    verificationStatusLabel: 'ସତ୍ୟାପନ ସ୍ଥିତି',
    periodLabel: 'ଐତିହାସିକ କାଳଖଣ୍ଡ',
    locationLabel: 'ସ୍ଥାନ',
    categoryLabel: 'ବିଭାଗ',
    dynastyLabel: 'ସମ୍ପର୍କିତ ରାଜବଂଶ',
    verifiedPrimaryBadge: 'ସତ୍ୟାପିତ ଅଭିଲେଖ ରେକର୍ଡ',
    imageGalleryHeading: 'ଅଭିଲେଖାଗାର ଚିତ୍ର ସଂଗ୍ରହ',
    filterByKeywordPlaceholder: 'କୀୱାର୍ଡ ଦ୍ୱାରା ଖୋଜନ୍ତୁ କିମ୍ବା ଫିଲ୍ଟର କରନ୍ତୁ...',
    popularKeywordsLabel: 'ଐତିହାସିକ କୀୱାର୍ଡ ଦ୍ୱାରା ଅନ୍ୱେଷଣ କରନ୍ତୁ:',
    translationNoticeFallback: 'ସୂଚନା: ମୌଳିକ ଶିଳାଲେଖ ଉଦ୍ଧୃତି ଓ ଗ୍ରନ୍ଥସୂଚୀ ବିବରଣୀ ମାନକ ଅଭିଲେଖାଗାର ରୂପରେ ସଂରକ୍ଷିତ ହୋଇଛି।',
    sharedTopicsLabel: 'ସମାନ ବିଷୟ:',
    exploreKeywordTooltip: 'ଏହି କୀୱାର୍ଡ ଥିବା ସମସ୍ତ ପ୍ରବନ୍ଧ ଦେଖିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ'
  },
  bn: {
    viewDetails: 'বিস্তারিত দেখুন',
    readMore: 'সম্পূর্ণ নিবন্ধ পড়ুন →',
    backButton: 'পিছনে',
    backToPreviousArticle: 'পূর্ববর্তী নিবন্ধে ফিরে যান',
    backToKeywordResults: 'কীওয়ার্ড ফলাফলে ফিরে যান',
    backToGallery: 'গ্যালারিতে ফিরে যান',
    closeButton: 'বন্ধ করুন',
    keywordsHeading: 'মূল শব্দ ও ঐতিহাসিক বিষয়বস্তু (Keywords)',
    relatedArticlesHeading: 'সম্পর্কিত ঐতিহাসিক নিবন্ধসমূহ',
    relatedArticlesSubtitle: 'একই রাজবংশ, ঐতিহাসিক ব্যক্তিত্ব, স্থান এবং প্রত্নতাত্ত্বিক বিষয়ের সাথে যুক্ত অন্যান্য নিবন্ধ।',
    noRelatedArticlesFound: 'কোনো সম্পর্কিত নিবন্ধ পাওয়া যায়নি',
    noKeywordArticlesFoundDesc: 'নির্বাচিত কীওয়ার্ড বা বিষয়ের সাথে মেলে এমন কোনো গ্যালারি নিবন্ধ পাওয়া যায়নি। অনুগ্রহ করে অন্য একটি কীওয়ার্ড নির্বাচন করুন অথবা ফিল্টার সরান।',
    clearKeywordFilter: 'কীওয়ার্ড ফিল্টার সরান',
    showAllArticles: 'সকল গ্যালারি নিবন্ধ দেখান',
    keywordFilterActiveBanner: 'কীওয়ার্ড দ্বারা ফিল্টারকৃত',
    keywordModalHeader: 'কীওয়ার্ড সম্পর্কিত ঐতিহাসিক নিবন্ধ',
    articlesMatchingKeyword: 'এই বিষয়ের সাথে সম্পর্কিত মহাফেজখানা নিবন্ধ',
    fullDescriptionHeading: 'সম্পূর্ণ মহাফেজখানা বিবরণ',
    historicalBackgroundHeading: 'ঐতিহাসিক পটভূমি ও প্রামাণ্য প্রেক্ষাপট',
    archaeologicalFindingsHeading: 'প্রত্নতাত্ত্বিক ও শিলালিপি প্রমাণ',
    importantDatesHeading: 'গুরুত্বপূর্ণ তারিখ ও কালানুক্রম',
    historicalPeopleHeading: 'সংশ্লিষ্ট সম্রাট ও ঐতিহাসিক ব্যক্তিত্ব',
    historicalPlacesHeading: 'ঐতিহাসিক স্থান ও ভৌগোলিক অঞ্চল',
    referencesHeading: 'প্রাথমিক উৎস ও গবেষণামূলক তথ্যসূত্র',
    archivalMetadataHeading: 'মহাফেজখানা উৎস ও লাইসেন্স বিবরণ',
    epigraphicExcerptHeading: 'প্রাথমিক শিলালিপি / পাণ্ডুলিপি উদ্ধৃতি',
    creatorPhotographerLabel: 'নির্মাতা / মহাফেজখানা কর্তৃপক্ষ',
    archivalSourceLabel: 'প্রাথমিক সংগ্রহশালা / উৎস',
    copyrightLicenseLabel: 'কপিরাইট ও ব্যবহারের লাইসেন্স',
    verificationStatusLabel: 'যাচাইকরণ স্থিতি',
    periodLabel: 'ঐতিহাসিক সময়কাল',
    locationLabel: 'স্থান',
    categoryLabel: 'বিভাগ',
    dynastyLabel: 'সংশ্লিষ্ট রাজবংশ',
    verifiedPrimaryBadge: 'পর্যালোচিত মহাফেজখানা দলিল',
    imageGalleryHeading: 'মহাফেজখানা আলোকচিত্র সংগ্রহ',
    filterByKeywordPlaceholder: 'কীওয়ার্ড দিয়ে খুঁজুন বা ফিল্টার করুন...',
    popularKeywordsLabel: 'ঐতিহাসিক কীওয়ার্ড দ্বারা অন্বেষণ করুন:',
    translationNoticeFallback: 'দ্রষ্টব্য: মূল শিলালিপি উদ্ধৃতি এবং গ্রন্থপঞ্জি তথ্যসূত্র মানক মহাফেজখানা বিন্যাসে সংরক্ষিত রয়েছে।',
    sharedTopicsLabel: 'অভিন্ন বিষয়:',
    exploreKeywordTooltip: 'এই কীওয়ার্ডযুক্ত সকল নিবন্ধ দেখতে ক্লিক করুন'
  }
};

export const KEYWORD_DICTIONARY: Record<string, Record<LanguageCode, string>> = {
  kw_suryavamsha: {
    en: 'Suryavamsha',
    hi: 'सूर्यवंश',
    te: 'సూర్యవంశం',
    kn: 'ಸೂರ್ಯವಂಶ',
    ta: 'சூரியவம்சம்',
    mr: 'सूर्यवंश',
    or: 'ସୂର୍ଯ୍ୟବଂଶ',
    bn: 'সূর্যবংশ'
  },
  kw_gajapathi_empire: {
    en: 'Gajapathi Empire',
    hi: 'गजपति साम्राज्य',
    te: 'గజపతి సామ్రాజ్యం',
    kn: 'ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ',
    ta: 'கஜபதி பேரரசு',
    mr: 'गजपती साम्राज्य',
    or: 'ଗଜପତି ସାମ୍ରାଜ୍ୟ',
    bn: 'গজপতি সাম্রাজ্য'
  },
  kw_kapilendra_deva: {
    en: 'Kapilendra Deva',
    hi: 'कपिलेंद्र देव',
    te: 'కపిలేంద్ర దేవుడు',
    kn: 'ಕಪಿಲೇಂದ್ರ ದೇವ',
    ta: 'கபிலேந்திர தேவர்',
    mr: 'कपिलेंद्र देव',
    or: 'କପିଳେନ୍ଦ୍ର ଦେବ',
    bn: 'কপিলেন্দ্র দেব'
  },
  kw_hamvira_deva: {
    en: 'Kumara Hamvira Deva',
    hi: 'कुमार हम्मीर देव',
    te: 'కుమార హంవీర దేవుడు',
    kn: 'ಕುಮಾರ ಹಂವೀರ ದೇವ',
    ta: 'குமார ஹம்வீர தேவர்',
    mr: 'कुमार हम्मीर देव',
    or: 'କୁମାର ହମ୍ବୀର ଦେବ',
    bn: 'কুমার হম্বীর দেব'
  },
  kw_prataparudra_deva: {
    en: 'Prataparudra Deva',
    hi: 'प्रतापरुद्र देव',
    te: 'ప్రతాపరుద్ర దేవుడు',
    kn: 'ಪ್ರತಾಪರುದ್ರ ದೇವ',
    ta: 'பிரதாபருத்ர தேவர்',
    mr: 'प्रतापरुद्र देव',
    or: 'ପ୍ରତାପରୁଦ୍ର ଦେବ',
    bn: 'প্রতাপরুদ্র দেব'
  },
  kw_forts_citadels: {
    en: 'Forts & Citadels',
    hi: 'दुर्ग एवं किले',
    te: 'కోటలు & దుర్గాలు',
    kn: 'ಕೋಟೆಗಳು ಮತ್ತು ದುರ್ಗಗಳು',
    ta: 'கோட்டைகள் & அரண்கள்',
    mr: 'किल्ले आणि गड',
    or: 'ଦୁର୍ଗ ଓ ଗଡ଼',
    bn: 'দুর্গ ও গড়'
  },
  kw_temples_monuments: {
    en: 'Temples & Monuments',
    hi: 'मंदिर एवं स्मारक',
    te: 'ఆలయాలు & స్మారకాలు',
    kn: 'ದೇವಾಲಯಗಳು ಮತ್ತು ಸ್ಮಾರಕಗಳು',
    ta: 'கோயில்கள் & நினைவுச்சின்னங்கள்',
    mr: 'मंदिरे आणि स्मारके',
    or: 'ମନ୍ଦିର ଓ ସ୍ମାରକୀ',
    bn: 'মন্দির ও স্মৃতিস্তম্ভ'
  },
  kw_kalinga_architecture: {
    en: 'Kalinga Architecture',
    hi: 'कलिंग स्थापत्य कला',
    te: 'కళింగ వాస్తుశిల్పం',
    kn: 'ಕಳಿಂಗ ವಾಸ್ತುಶಿಲ್ಪ',
    ta: 'கலிங்கக் கட்டிடக்கலை',
    mr: 'कलिंग स्थापत्यकला',
    or: 'କଳିଙ୍ଗ ସ୍ଥାପତ୍ୟ କଳା',
    bn: 'কলিঙ্গ স্থাপত্যশিল্প'
  },
  kw_odra_desha: {
    en: 'Odra Desha',
    hi: 'ओड्र देश',
    te: 'ఓడ్ర దేశం',
    kn: 'ಓಡ್ರ ದೇಶ',
    ta: 'ஒட்ர தேசம்',
    mr: 'ओड्र देश',
    or: 'ଓଡ଼୍ର ଦେଶ',
    bn: 'ওড্র দেশ'
  },
  kw_odisha: {
    en: 'Odisha',
    hi: 'ओडिशा',
    te: 'ఒడిశా',
    kn: 'ಒಡಿಶಾ',
    ta: 'ஒடிசா',
    mr: 'ओडिशा',
    or: 'ଓଡ଼ିଶା',
    bn: 'ওড়িশা'
  },
  kw_andhra_pradesh: {
    en: 'Andhra Pradesh',
    hi: 'आंध्र प्रदेश',
    te: 'ఆంధ్రప్రదేశ్',
    kn: 'ಆಂಧ್ರಪ್ರದೇಶ',
    ta: 'ஆந்திரப் பிரதேசம்',
    mr: 'आंध्र प्रदेश',
    or: 'ଆନ୍ଧ୍ର ପ୍ରଦେଶ',
    bn: 'অন্ধ্রপ্রদেশ'
  },
  kw_cuttack_barabati: {
    en: 'Barabati & Kataka',
    hi: 'बाराबती एवं कटक',
    te: 'బారాబతి & కటక్',
    kn: 'ಬಾರಾಬತಿ ಮತ್ತು ಕಟಕ್',
    ta: 'பாராபதி & கட்டக்',
    mr: 'बाराबती आणि कटक',
    or: 'ବାରବାଟୀ ଓ କଟକ',
    bn: 'বারবাটী ও কটক'
  },
  kw_puri_jagannatha: {
    en: 'Puri Jagannatha',
    hi: 'पुरी जगन्नाथ',
    te: 'పూరి జగన్నాథ్',
    kn: 'ಪುರಿ ಜಗನ್ನಾಥ',
    ta: 'புரி ஜெகந்நாதர்',
    mr: 'पुरी जगन्नाथ',
    or: 'ପୁରୀ ଶ୍ରୀଜଗନ୍ନାଥ',
    bn: 'পুরী জগন্নাথ'
  },
  kw_konark_surya: {
    en: 'Konark Sun Temple',
    hi: 'कोणार्क सूर्य मंदिर',
    te: 'కోణార్క్ సూర్య దేవాలయం',
    kn: 'ಕೊಣಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯ',
    ta: 'கொனார்க் சூரியக் கோயில்',
    mr: 'कोणार्क सूर्य मंदिर',
    or: 'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର',
    bn: 'কোণার্ক সূর্য মন্দির'
  },
  kw_kondavidu: {
    en: 'Kondavidu Fortress',
    hi: 'कोंडावीडु दुर्ग',
    te: 'కొండవీడు దుర్గం',
    kn: 'ಕೊಂಡವೀಡು ಕೋಟೆ',
    ta: 'கொண்டவீடு கோட்டை',
    mr: 'कोंडावीडु किल्ला',
    or: 'କୋଣ୍ଡାଭିଡୁ ଦୁର୍ଗ',
    bn: 'কোন্ডাভিডু দুর্গ'
  },
  kw_epigraphy_manuscripts: {
    en: 'Epigraphy & Manuscripts',
    hi: 'शिलालेख एवं पांडुलिपियां',
    te: 'శాసనాలు & తాళపత్రాలు',
    kn: 'ಶಾಸನಗಳು ಮತ್ತು ಹಸ್ತಪ್ರತಿಗಳು',
    ta: 'கல்வெட்டுகள் & ஓலைச்சுவடிகள்',
    mr: 'शिलालेख आणि हस्तलिखिते',
    or: 'ଶିଳାଲେଖ ଓ ତାଳପତ୍ର ପୋଥି',
    bn: 'শিলালিপি ও পাণ্ডুলিপি'
  },
  kw_madala_panji: {
    en: 'Madala Panji',
    hi: 'मादला पांजी',
    te: 'మాదళా పాంజీ',
    kn: 'ಮಾದಲಾ ಪಾಂಜಿ',
    ta: 'மாதளா பாஞ்சி',
    mr: 'मादला पांजी',
    or: 'ମାଦଳା ପାଞ୍ଜି',
    bn: 'মাদলা পাঞ্জি'
  },
  kw_historical_geography: {
    en: 'Historical Geography & Maps',
    hi: 'ऐतिहासिक भूगोल एवं मानचित्र',
    te: 'చారిత్రక భౌగోళికం & పటాలు',
    kn: 'ಐತಿಹಾಸಿಕ ಭೂಗೋಳ ಮತ್ತು ನಕ್ಷೆಗಳು',
    ta: 'வரலாற்று புவியியல் & வரைபடங்கள்',
    mr: 'ऐतिहासिक भूगोल आणि नकाशे',
    or: 'ଐତିହାସିକ ଭୂଗୋଳ ଓ ମାନଚିତ୍ର',
    bn: 'ঐতিহাসিক ভূগোল ও মানচিত্র'
  },
  kw_kolletikota_peddintlamma: {
    en: 'Kolletikota & Peddintlamma Thalli',
    hi: 'कोल्लेतिकोटा एवं माता पेद्दिंटलम्मा',
    te: 'కొల్లేటికోట & పెద్దింట్లమ్మ తల్లి',
    kn: 'ಕೊಲ್ಲೇಟಿಕೋಟೆ ಮತ್ತು ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ತಾಯಿ',
    ta: 'கொல்லேட்டிகோட்டை & பெத்திண்ட்லம்மா',
    mr: 'कोल्लेतिकोटा आणि पेद्दिंटलम्मा माता',
    or: 'କୋଲ୍ଲେତିକୋଟା ଓ ପେଦ୍ଦିଣ୍ଟଲମ୍ମା',
    bn: 'কোল্লেতিকোটা ও পেদ্দিন্টলাম্মা'
  },
  kw_odiyaraju_kshatriya: {
    en: 'Odiyaraju Kshatriya Garrisons',
    hi: 'ओडियाराजू क्षत्रिय सैन्य दल',
    te: 'ఒడియరాజు క్షత్రియ సేనానులు',
    kn: 'ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಸೇನಾ ನೆಲೆ',
    ta: 'ஒடியாராஜு சத்திரியப் படைகள்',
    mr: 'ओडियाराजू क्षत्रिय लष्करी ठाणे',
    or: 'ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ବାହିନୀ',
    bn: 'ওড়িয়ারাজু ক্ষত্রিয় বাহিনী'
  }
};

function makeKeywordTags(ids: string[], lang: LanguageCode): GalleryKeywordTag[] {
  return ids
    .map(id => {
      const dict = KEYWORD_DICTIONARY[id];
      if (!dict) return null;
      return {
        id,
        label: dict[lang] || dict.en,
        allLabels: dict
      };
    })
    .filter((k): k is GalleryKeywordTag => k !== null);
}

interface GalleryLinkingConfig {
  locationIds: string[];
  monumentIds: string[];
  documentIds: string[];
  inscriptionIds: string[];
  timelineEventIds: string[];
  articleId: string;
  keywordIds: string[];
  people: Record<LanguageCode, string[]>;
  places: Record<LanguageCode, string[]>;
  dynasties: Record<LanguageCode, string[]>;
  extendedDescription: Record<LanguageCode, string>;
}

const GALLERY_ENRICHMENT_CONFIG: Record<string, GalleryLinkingConfig> = {
  gal_01: {
    locationIds: ['loc_barabati_fort'],
    monumentIds: ['mon_meghanada_pacheri'],
    documentIds: ['doc_madala_panji'],
    inscriptionIds: ['insc_lingaraja_1452'],
    timelineEventIds: ['ev_1434', 'ev_1568'],
    articleId: 'art_gajapathi_kapilendra',
    keywordIds: [
      'kw_cuttack_barabati',
      'kw_forts_citadels',
      'kw_kapilendra_deva',
      'kw_suryavamsha',
      'kw_gajapathi_empire',
      'kw_odisha',
      'kw_odra_desha'
    ],
    people: {
      en: ['Emperor Kapilendra Deva Gajapathi (1434–1466 CE)', 'Emperor Purushottama Deva (1466–1497 CE)', 'Emperor Prataparudra Deva (1497–1540 CE)', 'Maharaja Mukunda Deva (Last Independent Sovereign at Kataka, 1568 CE)'],
      hi: ['सम्राट कपिलेंद्र देव गजपति (1434–1466 ई.)', 'सम्राट पुरुषोत्तम देव (1466–1497 ई.)', 'सम्राट प्रतापरुद्र देव (1497–1540 ई.)', 'महाराजा मुकुंद देव (1568 ई.)'],
      te: ['చక్రవర్తి కపిలేంద్ర దేవ గజపతి (క్రీ.శ. 1434–1466)', 'చక్రవర్తి పురుషోత్తమ దేవుడు (క్రీ.శ. 1466–1497)', 'చక్రవర్తి ప్రతాపరుద్ర దేవుడు (క్రీ.శ. 1497–1540)', 'మహారాజ ముకుంద దేవుడు (క్రీ.శ. 1568)'],
      kn: ['ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವ ಗಜಪತಿ (1434–1466)', 'ಸಾಮ್ರಾಟ್ ಪುರುಷೋತ್ತಮ ದೇವ (1466–1497)', 'ಸಾಮ್ರಾಟ್ ಪ್ರತಾಪರುದ್ರ ದೇವ (1497–1540)', 'ಮಹಾರಾಜ ಮುಕುಂದ ದೇವ (1568)'],
      ta: ['பேரரசர் கபிலேந்திர தேவ கஜபதி (1434–1466)', 'பேரரசர் புருஷோத்தம தேவர் (1466–1497)', 'பேரரசர் பிரதாபருத்ர தேவர் (1497–1540)', 'மகாராஜா முகுந்த தேவர் (1568)'],
      mr: ['सम्राट कपिलेंद्र देव गजपती (१४३४–१४६६)', 'सम्राट पुरुषोत्तम देव (१४६६–१४९७)', 'सम्राट प्रतापरुद्र देव (१४९७–१५४०)', 'महाराजा मुकुंद देव (१५६८)'],
      or: ['ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ଗଜପତି (୧୪୩୪–୧୪୬୬ ଖ୍ରୀ.)', 'ସମ୍ରାଟ ପୁରୁଷୋତ୍ତମ ଦେବ (୧୪୬୬–୧୪୯୭ ଖ୍ରୀ.)', 'ସମ୍ରାଟ ପ୍ରତାପରୁଦ୍ର ଦେବ (୧୪୯୭–୧୫୪୦ ଖ୍ରୀ.)', 'ମହାରାଜା ମୁକୁନ୍ଦ ଦେବ (୧୫୬୮ ଖ୍ରୀ.)'],
      bn: ['সম্রাট কপিলেন্দ্র দেব গজপতি (১৪৩৪–১৪৬৬ খ্রি.)', 'সম্রাট পুরুষোত্তম দেব (১৪৬৬–১৪৯৭ খ্রি.)', 'সম্রাট প্রতাপরুদ্র দেব (১৪৯৭–১৫৪০ খ্রি.)', 'মহারাজা মুকুন্দ দেব (১৫৬৮ খ্রি.)']
    },
    places: {
      en: ['Barabati Fort (Varanasi Kataka / Cuttack, Odisha)', 'Mahanadi & Kathajodi River Delta', 'Bhubaneswar Lingaraja Precinct'],
      hi: ['बाराबती दुर्ग (वाराणसी कटक, ओडिशा)', 'महानदी एवं काठजोड़ी नदी संगम क्षेत्र', 'भुवनेश्वर लिंगराज मंदिर परिसर'],
      te: ['బారాబతి కోట (వారణాసి కటక్, ఒడిశా)', 'మహానది & కథాజోడి నదీ పరీవాహక ప్రాంతం', 'భువనేశ్వర్ లింగరాజ ఆలయ ప్రాంగణం'],
      kn: ['ಬಾರಾಬತಿ ಕೋಟೆ (ವಾರಣಾಸಿ ಕಟಕ್, ಒಡಿಶಾ)', 'ಮಹಾನದಿ ಮತ್ತು ಕಠಜೋಡಿ ನದಿ ಮುಖಜ ಭೂಮಿ', 'ಭುವನೇಶ್ವರ ಲಿಂಗರಾಜ ದೇವಾಲಯ ಆವರಣ'],
      ta: ['பாராபதி கோட்டை (வாரணாசி கட்டக், ஒடிசா)', 'மகாநதி மற்றும் காதஜோடி நதிப் படுகை', 'புவனேஸ்வர் லிங்கராஜர் கோயில் வளாகம்'],
      mr: ['बाराबती किल्ला (वाराणसी कटक, ओडिशा)', 'महानदी आणि काठजोडी नदी खोरे', 'भुवनेश्वर लिंगराज मंदिर परिसर'],
      or: ['ବାରବାଟୀ ଦୁର୍ଗ (ବାରଣାସୀ କଟକ, ଓଡ଼ିଶା)', 'ମହାନଦୀ ଓ କାଠଯୋଡ଼ି ନଦୀ ଉପତ୍ୟକା', 'ଭୁବନେଶ୍ୱର ଲିଙ୍ଗରାଜ ମନ୍ଦିର ପରିସର'],
      bn: ['বারবাটী দুর্গ (বারাণসী কটক, ওড়িশা)', 'মহানদী ও কাঠজোড়ি নদী অববাহিকা', 'ভুবনেশ্বর লিঙ্গরাজ মন্দির চত্বর']
    },
    dynasties: {
      en: ['Suryavamsha Gajapathi Dynasty', 'Later Eastern Ganga Dynasty'],
      hi: ['सूर्यवंशी गजपति राजवंश', 'पूर्वी गंग राजवंश'],
      te: ['సూర్యవంశ గజపతి రాజవంశం', 'తూర్పు గంగ రాజవంశం'],
      kn: ['ಸೂರ್ಯವಂಶ ಗಜಪತಿ ರಾಜವಂಶ', 'ಪೂರ್ವ ಗಂಗ ರಾಜವಂಶ'],
      ta: ['சூரியவம்ச கஜபதி வம்சம்', 'கீழைக் கங்க வம்சம்'],
      mr: ['सूर्यवंशी गजपती राजवंश', 'पूर्व गंग राजवंश'],
      or: ['ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ରାଜବଂଶ', 'ପୂର୍ବ ଗଙ୍ଗ ରାଜବଂଶ'],
      bn: ['সূর্যবংশীয় গজপতি রাজবংশ', 'পূর্ব গঙ্গ রাজবংশ']
    },
    extendedDescription: {
      en: 'High-resolution archival documentation of Barabati Fort at Varanasi Kataka (modern Cuttack, Odisha), the imperial seat of the Suryavamshi Gajapathi monarchs. Situated strategically between the Mahanadi and Kathajodi rivers, the fortress features dressed laterite and sandstone ramparts, an alligator-patrolled defensive moat (Gadakhai), an arched ceremonial gateway, and archaeological remains of a nine-storied royal palace complex refortified by Emperor Kapilendra Deva after his coronation in 1434 CE.',
      hi: 'वाराणसी कटक (आधुनिक कटक, ओडिशा) स्थित ऐतिहासिक बाराबती दुर्ग का उच्च-रिज़ॉल्यूशन पुरातात्विक प्रलेखन, जो सूर्यवंशी गजपति सम्राटों की साम्राज्यीय राजधानी था। महानदी और काठजोड़ी नदियों के सामरिक दोआब में निर्मित इस दुर्ग में तराशे गए बलुआ पत्थरों की प्राचीरें, गहरी रक्षा खाई (गड़खाई), भव्य सिंहद्वार और 1434 ई. में सम्राट कपिलेंद्र देव द्वारा सुदृढ़ किए गए नौ-मंजिला राजप्रासाद के पुरातात्विक अवशेष शामिल हैं।',
      te: 'సూర్యవంశ గజపతి చక్రవర్తుల సామ్రాజ్య రాజధానియైన వారణాసి కటక్ (నేటి కటక్, ఒడిశా) లోని చారిత్రక బారాబతి కోట యొక్క పురావస్తు ఛాయాచిత్ర డాక్యుమెంటేషన్. మహానది మరియు కథాజోడి నదుల మధ్య వ్యూహాత్మకంగా నిర్మించబడిన ఈ దుర్గంలో చెక్కబడిన రాతి ప్రాకారాలు, లోతైన రక్షణ కందకం (గడఖాయి), కోట ముఖద్వారం మరియు క్రీ.శ. 1434లో కపిలేంద్ర దేవుని పట్టాభిషేకం అనంతరం పటిష్టం చేయబడిన తొమ్మిది అంతస్తుల రాజభవన పురావస్తు ఆనవాళ్లు ఉన్నాయి.',
      kn: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರاطರ ರಾಜಧಾನಿಯಾಗಿದ್ದ ವಾರಣಾಸಿ ಕಟಕ್ (ಇಂದಿನ ಕಟಕ್, ಒಡಿಶಾ) ನಲ್ಲಿರುವ ಐತಿಹಾಸಿಕ ಬಾರಾಬತಿ ಕೋಟೆಯ ಪುರಾತತ್ವ ದಾಖಲಾತಿ. ಮಹಾನದಿ ಮತ್ತು ಕಠಜೋಡಿ ನದಿಗಳ ನಡುವೆ ನಿರ್ಮಿಸಲಾದ ಈ ಕೋಟೆಯು ಕೆತ್ತಿದ ಕಲ್ಲಿನ ಗೋಡೆಗಳು, ಆಳವಾದ ರಕ್ಷಣಾ ಕಂದಕ ಮತ್ತು ಕ್ರಿ.ಶ. 1434ರಲ್ಲಿ ಕಪಿಲೇಂದ್ರ ದೇವನಿಂದ ಬಲಪಡಿಸಲ್ಪಟ್ಟ ಒಂಬತ್ತು ಅಂತಸ್ತಿನ ರಾಜಮಹಲಿನ ಅವಶೇಷಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.',
      ta: 'சூரியவம்ச கஜபதி பேரரசர்களின் தலைநகரான வாரணாசி கட்டக்கில் (தற்போதைய கட்டக், ஒடிசா) அமைந்துள்ள பாராபதி கோட்டையின் தொல்லியல் ஆவணப் பதிவு. மகாநதி மற்றும் காதஜோடி நதிகளுக்கு இடையே அமைந்த இக்கோட்டை, செதுக்கப்பட்ட கற்கோட்டைச் சுவர்கள், ஆழமான அகழி மற்றும் கி.பி. 1434இல் கபிலேந்திர தேவரால் வலுப்படுத்தப்பட்ட ஒன்பது அடுக்கு அரண்மனை எச்சங்களைக் கொண்டுள்ளது.',
      mr: 'सूर्यवंशी गजपती सम्राटांची राजधानी असलेल्या वाराणसी कटक (आधुनिक कटक, ओडिशा) येथील ऐतिहासिक बाराबती किल्ल्याचे पुरातत्वीय दस्तऐवजीकरण. महानदी आणि काठजोडी नद्यांच्या दरम्यान वसलेल्या या किल्ल्यात घडीव दगडी तटबंदी, खोल खंदक आणि इ.स. १४३४ मध्ये सम्राट कपिलेंद्र देवाने मजबूत केलेल्या नऊ मजली राजवाड्याचे पुरातत्वीय अवशेष आहेत.',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସମ୍ରାଟମାନଙ୍କର ସାମ୍ରାଜ୍ୟিক ରାଜଧାନୀ ବାରଣାସୀ କଟକ (ଆധୁନିକ କଟକ, ଓଡ଼ିଶା) ସ୍ଥିତ ଐତିହାସିକ ବାରବାଟୀ ଦୁର୍ଗର ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅଭିଲେଖ। ମହାନଦୀ ଓ କାଠଯୋଡ଼ି ନଦୀ ମଧ୍ୟରେ ଅବସ୍ଥିତ ଏହି ଦୁର୍ଗରେ ମାଙ୍କଡ଼ା ଓ ବାଲିପଥର ପ୍ରାଚୀର, ଗଭୀର ପରିଖା (ଗଡ଼ଖାଇ), ସିଂହଦ୍ୱାର ଏବଂ ୧୪୩୪ ଖ୍ରୀଷ୍ଟାବ୍ଦରେ ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଦ୍ୱାରା ସୁଦୃଢ଼ କରାଯାଇଥିବା ନଅତଲା ପ୍ରାସାଦର ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅବଶେଷ ରହିଛି।',
      bn: 'সূর্যবংশীয় গজপতি সম্রাটদের সাম্রাজ্যিক রাজধানী বারাণসী কটকে (আধুনিক কটক, ওড়িশা) অবস্থিত ঐতিহাসিক বারবাটী দুর্গের প্রত্নতাত্ত্বিক আলোকচিত্র দলিল। মহানদী ও কাঠজোড়ি নদীর মধ্যবর্তী স্থানে নির্মিত এই দুর্গে পাথরের প্রাচীর, গভীর প্রতিরক্ষা পরিখা (গড়খাই), তোরণদ্বার এবং ১৪৩৪ খ্রিস্টাব্দে সম্রাট কপিলেন্দ্র দেব কর্তৃক সুদৃঢ়কৃত নয়তলা রাজপ্রাসাদের প্রত্নতাত্ত্বিক নিদর্শন রয়েছে।'
    }
  },
  gal_02: {
    locationIds: ['loc_puri_jagannatha'],
    monumentIds: ['mon_meghanada_pacheri'],
    documentIds: ['doc_madala_panji'],
    inscriptionIds: ['insc_lingaraja_1452'],
    timelineEventIds: ['ev_1434', 'ev_1489'],
    articleId: 'art_odra_desha_history',
    keywordIds: [
      'kw_puri_jagannatha',
      'kw_temples_monuments',
      'kw_kapilendra_deva',
      'kw_kalinga_architecture',
      'kw_suryavamsha',
      'kw_gajapathi_empire',
      'kw_odisha',
      'kw_madala_panji'
    ],
    people: {
      en: ['Emperor Kapilendra Deva Gajapathi (Builder of Meghanada Pacheri, c. 1448 CE)', 'Emperor Purushottama Deva (1466–1497 CE)', 'Emperor Prataparudra Deva (1497–1540 CE)', 'Anantavarman Chodaganga Deva (Eastern Ganga Builder of Main Sanctum)'],
      hi: ['सम्राट कपिलेंद्र देव गजपति (मेघनाद पाचेरी के निर्माता, लगभग 1448 ई.)', 'सम्राट पुरुषोत्तम देव (1466–1497 ई.)', 'सम्राट प्रतापरुद्र देव (1497–1540 ई.)', 'अनंतवर्मन चोडगंग देव'],
      te: ['చక్రవర్తి కపిలేంద్ర దేవ గజపతి (మేఘనాద పాచేరి నిర్మాత, క్రీ.శ. 1448)', 'చక్రవర్తి పురుషోత్తమ దేవుడు (క్రీ.శ. 1466–1497)', 'చక్రవర్తి ప్రతాపరుద్ర దేవుడు (క్రీ.శ. 1497–1540)', 'అనంతవర్మ చోడగంగ దేవుడు'],
      kn: ['ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವ ಗಜಪತಿ (ಮೇಘನಾದ ಪಾಚೇರಿ ನಿರ್ಮಾತೃ, ಕ್ರಿ.ಶ. 1448)', 'ಸಾಮ್ರಾಟ್ ಪುರುಷೋತ್ತಮ ದೇವ (1466–1497)', 'ಸಾಮ್ರಾಟ್ ಪ್ರತಾಪರುದ್ರ ದೇವ (1497–1540)', 'ಅನಂತವರ್ಮ ಚೋಡಗಂಗ ದೇವ'],
      ta: ['பேரரசர் கபிலேந்திர தேவ கஜபதி (மேகநாத பாசேரி கட்டியவர், கி.பி. 1448)', 'பேரரசர் புருஷோத்தம தேவர் (1466–1497)', 'பேரரசர் பிரதாபருத்ர தேவர் (1497–1540)', 'அனந்தவர்ம சோடகங்க தேவர்'],
      mr: ['सम्राट कपिलेंद्र देव गजपती (मेघनाद पाचेरीचे निर्माते, इ.स. १४४८)', 'सम्राट पुरुषोत्तम देव (१४६६–१४९७)', 'सम्राट प्रतापरुद्र देव (१४९७–१५४०)', 'अनंतवर्मन चोडगंग देव'],
      or: ['ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ଗଜପତି (ମେଘନାଦ ପାଚେରୀ ନିର୍ମାତା, ୧୪୪୮ ଖ୍ରୀ.)', 'ସମ୍ରାଟ ପୁରୁଷୋତ୍ତମ ଦେବ (୧୪୬୬–୧୪୯୭ ଖ୍ରୀ.)', 'ସମ୍ରାଟ ପ୍ରତାପରୁଦ୍ର ଦେବ (୧୪୯୭–୧୫୪୦ ଖ୍ରୀ.)', 'ଅନନ୍ତବର୍ମନ ଚୋଡ଼ଗଙ୍ଗ ଦେବ'],
      bn: ['সম্রাট কপিলেন্দ্র দেব গজপতি (মেঘনাদ প্রাচীর নির্মাতা, ১৪৪৮ খ্রি.)', 'সম্রাট পুরুষোত্তম দেব (১৪৬৬–১৪৯৭ খ্রি.)', 'সম্রাট প্রতাপরুদ্র দেব (১৪৯৭–১৫৪০ খ্রি.)', 'অনন্তবর্মন চোড়গঙ্গ দেব']
    },
    places: {
      en: ['Sri Jagannatha Temple Complex (Purushottama Kshetra / Srikshetra), Puri, Odisha', 'Utkala Coastal Sanctuaries'],
      hi: ['श्री जगन्नाथ मंदिर परिसर (पुरुषोत्तम क्षेत्र / श्रीक्षेत्र), पुरी, ओडिशा', 'उत्कल तटीय तीर्थ क्षेत्र'],
      te: ['శ్రీ జగన్నాథ దేవాలయ సముదాయం (పురుషోత్తమ క్షేత్రం / శ్రీక్షేత్రం), పూరి, ఒడిశా', 'ఉత్కళ తీరప్రాంత పుణ్యక్షేత్రాలు'],
      kn: ['ಶ್ರೀ ಜಗನ್ನಾಥ ದೇವಾಲಯ ಸಂಕೀರ್ಣ (ಪುರುಷೋತ್ತಮ ಕ್ಷೇತ್ರ), ಪುರಿ, ಒಡಿಶಾ', 'ಉತ್ಕಲ ಕರಾವಳಿ ಕ್ಷೇತ್ರ'],
      ta: ['ஸ்ரீ ஜெகந்நாதர் கோயில் வளாகம் (புருஷோத்தம க்ஷேத்திரம்), புரி, ஒடிசா', 'உத்கல கடற்கரைத் தலம்'],
      mr: ['श्री जगन्नाथ मंदिर परिसर (पुरुषोत्तम क्षेत्र), पुरी, ओडिशा', 'उत्कल किनारपट्टी तीर्थक्षेत्र'],
      or: ['ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର ପରିସର (ପୁରୁଷୋତ୍ତମ କ୍ଷେତ୍ର / ଶ୍ରୀକ୍ଷେତ୍ର), ପୁରୀ, ଓଡ଼ିଶା', 'ଉତ୍କଳ ଉପକୂଳ ତୀର୍ଥକ୍ଷେତ୍ର'],
      bn: ['শ্রীজগন্নাথ মন্দির চত্বর (পুরুষোত্তম ক্ষেত্র / শ্রীক্ষেত্র), পুরী, ওড়িশা', 'উৎকল উপকূলীয় তীর্থক্ষেত্র']
    },
    dynasties: {
      en: ['Suryavamsha Gajapathi Dynasty', 'Imperial Eastern Ganga Dynasty'],
      hi: ['सूर्यवंशी गजपति राजवंश', 'पूर्वी गंग राजवंश'],
      te: ['సూర్యవంశ గజపతి రాజవంశం', 'తూర్పు గంగ రాజవంశం'],
      kn: ['ಸೂರ್ಯವಂಶ ಗಜಪತಿ ರಾಜವಂಶ', 'ಪೂರ್ವ ಗಂಗ ರಾಜವಂಶ'],
      ta: ['சூரியவம்ச கஜபதி வம்சம்', 'கீழைக் கங்க வம்சம்'],
      mr: ['सूर्यवंशी गजपती राजवंश', 'पूर्व गंग राजवंश'],
      or: ['ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ରାଜବଂଶ', 'ପୂର୍ବ ଗଙ୍ଗ ରାଜବଂଶ'],
      bn: ['সূর্যবংশীয় গজপতি রাজবংশ', 'পূর্ব গঙ্গ রাজবংশ']
    },
    extendedDescription: {
      en: 'Architectural and archival record of the Meghanada Pacheri—the colossal fortified outer stone enclosure wall (665 feet by 640 feet, rising 20 feet high with defensive battlements) erected around the Sri Jagannatha Temple at Puri by Emperor Kapilendra Deva around 1448 CE. Serving as the spiritual epicenter of the Gajapathi Empire where the sovereigns performed the sacred Chera Panhara ritual as Adya Sevaka (First Servitor), the temple walls preserve hundreds of royal stone epigraphs on the Jaya-Vijaya doorway and Nata Mandapa pillars.',
      hi: 'पुरी स्थित श्री जगन्नाथ मंदिर के चारों ओर सम्राट कपिलेंद्र देव द्वारा लगभग 1448 ई. में निर्मित विशाल बाहरी सुरक्षा प्राचीर "मेघनाद पाचेरी" (665 फीट × 640 फीट, 20 फीट ऊंची दांतेदार पाषाण दीवार) का स्थापत्य एवं अभिलेखीय प्रलेखन। गजपति साम्राज्य के आध्यात्मिक केंद्र के रूप में यहां सम्राट "आद्य सेवक" के रूप में पवित्र छेरा पन्हरा सेवा करते थे, और जय-विजय द्वार तथा नाटमंडप स्तंभों पर सैकड़ों राजकीय शिलालेख उत्कीर्ण हैं।',
      te: 'పూరిలోని శ్రీ జగన్నాథ ఆలయం చుట్టూ క్రీ.శ. 1448 ప్రాంతంలో చక్రవర్తి కపిలేంద్ర దేవుడు నిర్మించిన "మేఘనాద పాచేరి" (665 అడుగుల × 640 అడుగుల విస్తీర్ణం, 20 అడుగుల ఎత్తైన రాతి రక్షణ ప్రాకారం) యొక్క పురాతత్వ డాక్యుమెంటేషన్. గజపతి సామ్రాజ్యానికి ఆధ్యాత్మిక కేంద్రమైన ఈ క్షేత్రంలో చక్రవర్తులు "ఆద్య సేవకులు"గా రథయాత్రలో పవిత్ర ఛేరా పన్హరా సేవ చేసేవారు. జయ-విజయ ద్వారం మరియు నాటమండప స్తంభాలపై వందలాది రాజ శాసనాలు చెక్కబడి ఉన్నాయి.',
      kn: 'ಪುರಿಯ ಶ್ರೀ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ಸುತ್ತಲೂ ಕ್ರಿ.ಶ. 1448ರ ಸುಮಾರಿಗೆ ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವನು ನಿರ್ಮಿಸಿದ ಬೃಹತ್ ಕಲ್ಲಿನ ರಕ್ಷಣಾ ಗೋಡೆ "ಮೇಘನಾದ ಪಾಚೇರಿ" (665 ಅಡಿ × 640 ಅಡಿ, 20 ಅಡಿ ಎತ್ತರ) ಕುರಿತ ಪತ್ರಾಗಾರ ದಾಖಲೆ. ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ಆಧ್ಯಾತ್ಮಿಕ ಕೇಂದ್ರವಾಗಿದ್ದ ಇಲ್ಲಿ ಸಾಮ್ರاطರು ಆದ್ಯ ಸೇವಕರಾಗಿ ಛೇರಾ ಪನ್ಹರಾ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿದ್ದರು ಹಾಗೂ ಜಯ-ವಿಜಯ ದ್ವಾರದಲ್ಲಿ ನೂರಾರು ಶಾಸನಗಳಿವೆ.',
      ta: 'புரி ஸ்ரீ ஜெகந்நாதர் கோயிலைச் சுற்றி கி.பி. 1448இல் பேரரசர் கபிலேந்திர தேவரால் கட்டப்பட்ட "மேகநாத பாசேரி" (665 அடி × 640 அடி, 20 அடி உயரம் கொண்ட கோட்டை மதில் சுவர்) பற்றிய ஆவணப் பதிவு. கஜபதி பேரரசின் ஆன்மீக மையமான இக்கோயிலில் மன்னர்கள் ஆத்ய சேவகர்களாக சேரா பன்ஹரா சேவை செய்தனர்; ஜெய-விஜய வாயிலில் நூற்றுக்கணக்கான கல்வெட்டுகள் உள்ளன.',
      mr: 'पुरी येथील श्री जगन्नाथ मंदिराभोवती इ.स. १४४८ च्या सुमारास सम्राट कपिलेंद्र देवाने उभारलेल्या "मेघनाद पाचेरी" (६६५ फूट × ६४० फूट, २० फूट उंच दगडी तटबंदी) या भव्य बाह्य संरक्षण भिंतीचे अभिलेखीय दस्तऐवजीकरण. गजपती साम्राज्याचे आध्यात्मिक केंद्र असलेल्या या मंदिरात सम्राट आद्य सेवक म्हणून छेरा पन्हरा सेवा करत असत.',
      or: 'ପୁରୀ ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର ଚାରିপাଖରେ ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଦ୍ୱାରା ପ୍ରାୟ ୧୪୪୮ ଖ୍ରୀଷ୍ଟାବ୍ଦରେ ନିର୍ମିତ ବିଶାଳ ବାହ୍ୟ ଦୁର୍ଗ ପ୍ରାଚୀର "ମେଘନାଦ ପାଚେରୀ" (୬୬୫ ଫୁଟ × ୬୪୦ ଫୁଟ, ୨୦ ଫୁଟ ଉଚ୍ଚ ପ୍ରସ୍ତର ପ୍ରାଚୀର) ର ସ୍ଥାପତ୍ୟ ଓ ଅଭିଲେଖ ବିବରଣୀ। ଗଜପତି ସାମ୍ରାଜ୍ୟର ଆଧ୍ୟାତ୍ମିକ କେନ୍ଦ୍ର ଭାବେ ଏଠାରେ ସମ୍ରାଟମାନେ ଆଦ୍ୟ ସେବକ ରୂପେ ଛେରାପହଁରା ସେବା କରୁଥିଲେ ଏବଂ ଜୟ-ବିଜୟ ଦ୍ୱାର ଓ ନାଟମଣ୍ଡପରେ ଶହ ଶହ ଶିଳାଲେଖ ରହିଛି।',
      bn: 'পুরীর শ্রীজগন্নাথ মন্দিরকে ঘিরে আনুমানিক ১৪৪৮ খ্রিস্টাব্দে সম্রাট কপিলেন্দ্র দেব কর্তৃক নির্মিত বিশাল প্রস্তর সুরক্ষা প্রাচীর "মেঘনাদ প্রাচীর" (৬৬৫ ফুট × ৬৪০ ফুট, ২০ ফুট উঁচু দুর্গ প্রাচীর)-এর স্থাপত্য ও মহাফেজখানা দলিল। গজপতি সাম্রাজ্যের আধ্যাত্মিক কেন্দ্র এই মন্দিরে সম্রাটগণ আদ্য সেবক হিসেবে ছেরাপহরা সেবা করতেন এবং জয়-বিজয় দ্বারে শত শত শিলালিপি খোদাই করা আছে।'
    }
  },
  gal_03: {
    locationIds: ['loc_puri_jagannatha'],
    monumentIds: ['mon_konark_sun'],
    documentIds: ['doc_madala_panji'],
    inscriptionIds: ['insc_veligalani_1458'],
    timelineEventIds: ['ev_kharavela_1st_bce', 'ev_1434'],
    articleId: 'art_surya_vamsa_sagara_rama',
    keywordIds: [
      'kw_konark_surya',
      'kw_kalinga_architecture',
      'kw_suryavamsha',
      'kw_temples_monuments',
      'kw_odisha',
      'kw_odra_desha',
      'kw_gajapathi_empire'
    ],
    people: {
      en: ['King Narasimhadeva I (Eastern Ganga Patron, c. 1250 CE)', 'Suryavamsha Progenitors (Samrat Sagara, Maharshi Bhagiratha, Maryada Purushottama Sri Rama)', 'Emperor Kapilendra Deva (Surya-kula-kamala-martanda)'],
      hi: ['सम्राट नरसिंहदेव प्रथम (पूर्वी गंग निर्माता, लगभग 1250 ई.)', 'सूर्यवंश पूर्वज (सम्राट सगर, महर्षि भगीरथ, मर्यादा पुरुषोत्तम श्री राम)', 'सम्राट कपिलेंद्र देव (सूर्य-कुल-कमल-मार्तंड)'],
      te: ['నరసింహదేవ I (తూర్పు గంగ నిర్మాత, క్రీ.శ. 1250)', 'సూర్యవంశ మూలపురుషులు (సమ్రాట్ సగరుడు, మహర్షి భగీరథుడు, శ్రీరాముడు)', 'చక్రవర్తి కపిలేంద్ర దేవుడు (సూర్య-కుల-కమల-మార్తాండ)'],
      kn: ['ನರಸಿಂಹದೇವ I (ಪೂರ್ವ ಗಂಗ ನಿರ್ಮಾತೃ, ಕ್ರಿ.ಶ. 1250)', 'ಸೂರ್ಯವಂಶ ಮೂಲಪುರುಷರು (ಸಾಮ್ರಾಟ್ ಸಗರ, ಮಹರ್ಷಿ ಭಗೀರಥ, ಶ್ರೀರಾಮ)', 'ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವ'],
      ta: ['முதலாம் நரசிம்மதேவன் (கீழைக் கங்க மன்னர், கி.பி. 1250)', 'சூரியவம்ச முன்னோர்கள் (சகர சக்கரவர்த்தி, பகீரதன், ஸ்ரீ ராமர்)', 'பேரரசர் கபிலேந்திர தேவர்'],
      mr: ['राजा नरसिंहदेव पहिला (पूर्व गंग निर्माते, इ.स. १२५०)', 'सूर्यवंश पूर्वज (सम्राट सगर, महर्षी भगीरथ, प्रभू श्रीराम)', 'सम्राट कपिलेंद्र देव'],
      or: ['ଲାଙ୍ଗୁଳା ନରସିଂହ ଦେବ ପ୍ରଥମ (ପୂର୍ବ ଗଙ୍ଗ ନିର୍ମାତା, ୧୨୫୦ ଖ୍ରୀ.)', 'ସୂର୍ଯ୍ୟବଂଶ ପୂର୍ବପୁରୁଷ (ସମ୍ରାଟ ସଗର, ମହର୍ଷି ଭଗୀରଥ, ଶ୍ରୀରାମ)', 'ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ (ସୂର୍ଯ୍ୟ-କୁଳ-କମଳ-ମାର୍ତ୍ତଣ୍ଡ)'],
      bn: ['প্রথম নরসিংহদেব (পূর্ব গঙ্গ নির্মাতা, ১২৫০ খ্রি.)', 'সূর্যবংশের পূর্বপুরুষ (সম্রাট সগর, মহর্ষি ভগীরথ, শ্রীরাম)', 'সম্রাট কপিলেন্দ্র দেব']
    },
    places: {
      en: ['Sun Temple of Konark (Arka Kshetra), Puri District, Odisha', 'Chandrabhaga Coastline, Odra-Utkala'],
      hi: ['कोणार्क सूर्य मंदिर (अर्क क्षेत्र), पुरी जिला, ओडिशा', 'चंद्रभागा तट, ओड्र-उत्कल'],
      te: ['కోణార్క్ సూర్య దేవాలయం (అర్క క్షేత్రం), పూరి జిల్లా, ఒడిశా', 'చంద్రభాగ తీరప్రాంతం, ఓడ్ర-ఉత్కళ'],
      kn: ['ಕೊಣಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯ (ಅರ್ಕ ಕ್ಷೇತ್ರ), ಪುರಿ ಜಿಲ್ಲೆ, ಒಡಿಶಾ', 'ಚಂದ್ರಭಾಗಾ ಕರಾವಳಿ, ಓಡ್ರ-ಉತ್ಕಲ'],
      ta: ['கொனார்க் சூரியக் கோயில் (அர்க்க க்ஷேத்திரம்), புரி மாவட்டம், ஒடிசா', 'சந்திரபாகா கடற்கரை'],
      mr: ['कोणार्क सूर्य मंदिर (अर्क क्षेत्र), पुरी जिल्हा, ओडिशा', 'चंद्रभागा किनारा, ओड्र-उत्कल'],
      or: ['କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର (ଅର୍କ କ୍ଷେତ୍ର), ପୁରୀ ଜିଲ୍ଲା, ଓଡ଼ିଶା', 'ଚନ୍ଦ୍ରଭାଗା ଉପକୂଳ, ଓଡ଼୍ର-ଉତ୍କଳ'],
      bn: ['কোণার্ক সূর্য মন্দির (অর্ক ক্ষেত্র), পুরী জেলা, ওড়িশা', 'চন্দ্রভাগা উপকূল, ওড্র-উৎকল']
    },
    dynasties: {
      en: ['Imperial Eastern Ganga Dynasty', 'Suryavamsha (Solar Dynasty)'],
      hi: ['पूर्वी गंग राजवंश', 'सूर्यवंश (इक्ष्वाकु-रघुवंश परंपरा)'],
      te: ['తూర్పు గంగ రాజవంశం', 'సూర్యవంశం (ఇక్ష్వాకు-రఘువంశ సంప్రదాయం)'],
      kn: ['ಪೂರ್ವ ಗಂಗ ರಾಜವಂಶ', 'ಸೂರ್ಯವಂಶ'],
      ta: ['கீழைக் கங்க வம்சம்', 'சூரியவம்சம்'],
      mr: ['पूर्व गंग राजवंश', 'सूर्यवंश'],
      or: ['ପୂର୍ବ ଗଙ୍ଗ ରାଜବଂଶ', 'ସୂର୍ଯ୍ୟବଂଶ (ଇକ୍ଷ୍ୱାକୁ-ରଘୁବଂଶ ପରମ୍ପରା)'],
      bn: ['পূর্ব গঙ্গ রাজবংশ', 'সূর্যবংশ']
    },
    extendedDescription: {
      en: 'Detailed photographic record of the carved stone chariot wheels (each 9 feet 9 inches in diameter with 8 wide and 8 thin spokes functioning as sundials) of the 13th-century Sun Temple at Konark (Arka Kshetra), Odisha. Constructed around 1250 CE by Narasimhadeva I in classic Kalinga Rekha and Bhadra Deula architecture, this monument embodies the celestial chariot of Surya (the Sun God), revered by the later Suryavamshi Gajapathis who officially styled themselves "Surya-kula-kamala-martanda" in royal copper-plate charters and court treatises.',
      hi: 'ओडिशा के कोणार्क (अर्क क्षेत्र) स्थित 13वीं शताब्दी के विश्वप्रसिद्ध सूर्य मंदिर के सूक्ष्म नक्काशीदार पाषाण रथ चक्रों (प्रत्येक 9 फीट 9 इंच व्यास और धूपघड़ी के रूप में कार्य करने वाली 8 चौड़ी व 8 पतली तीलियों से युक्त) का पुरातात्विक छायाचित्र। लगभग 1250 ई. में नरसिंहदेव प्रथम द्वारा शास्त्रीय कलिंग शैली में निर्मित यह स्मारक भगवान सूर्य के दिव्य रथ का प्रतीक है, जिन्हें परवर्ती सूर्यवंशी गजपति सम्राटों ने अपने कुलदेवता और वंश-मूल ("सूर्य-कुल-कमल-मार्तंड") के रूप में पूजित किया।',
      te: 'ఒడిశాలోని కోణార్క్ (అర్క క్షేత్రం) లోని 13వ శతాబ్దపు సూర్య దేవాలయపు సున్నితమైన రాతి రథ చక్రాల (ప్రతి చక్రం 9 అడుగుల 9 అంగుళాల వ్యాసం మరియు నీడ గడియారంగా పనిచేసే 16 ఆకులతో) పురావస్తు ఛాయాచిత్ర రికార్డు. క్రీ.శ. 1250 ప్రాంతంలో నరసింహదేవ I చే కళింగ శిల్పకళా రీతిలో నిర్మించబడిన ఈ ఆలయం సూర్య భగవానుని దివ్య రథానికి ప్రతీక. తదనంతర సూర్యవంశ గజపతి చక్రవర్తులు తమ తామ్రశాసనాలలో తమను "సూర్య-కుల-కమల-మార్తాండ"గా అభివర్ణించుకుంటూ ఈ సూర్య క్షేత్రాన్ని సంరక్షించారు.',
      kn: 'ಒಡಿಶಾದ ಕೊಣಾರ್ಕ್ (ಅರ್ಕ ಕ್ಷೇತ್ರ) ನಲ್ಲಿರುವ 13ನೇ ಶತಮಾನದ ಸೂರ್ಯ ದೇವಾಲಯದ ಕೆತ್ತನೆಯ ಕಲ್ಲಿನ ರಥ ಚಕ್ರಗಳ (ಸೂರ್ಯ ಗಡಿಯಾರವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಕಡ್ಡಿಗಳೊಂದಿಗೆ) ಪುರಾತತ್ವ ದಾಖಲೆ. ಕ್ರಿ.ಶ. 1250ರ ಸುಮಾರಿಗೆ ನರಸಿಂಹದೇವ I ರಿಂದ ಕಳಿಂಗ ವಾಸ್ತುಶಿಲ್ಪ ಶೈಲಿಯಲ್ಲಿ ನಿರ್ಮಿಸಲ್ಪಟ್ಟ ಈ ಸ್ಮಾರಕವು ಸೂರ್ಯದೇವನ ರಥವನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ ಹಾಗೂ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಅರಸರಿಂದ ಸಂರಕ್ಷಿಸಲ್ಪಟ್ಟಿತು.',
      ta: 'ஒடிசாவின் கொனார்க் (அர்க்க க்ஷேத்திரம்) 13ஆம் நூற்றாண்டு சூரியக் கோயிலின் நுணுக்கமாகச் செதுக்கப்பட்ட கல் தேர் சக்கரங்களின் ஆவணப் புகைப்படம். கி.பி. 1250இல் முதலாம் நரசிம்மதேவனால் கலிங்கக் கட்டிடக்கலை பாணியில் கட்டப்பட்ட இக்கோயில் சூரிய பகவானின் தெய்வீகத் தேரைக் குறிக்கிறது; பிற்கால சூரியவம்ச கஜபதி மன்னர்கள் இதைப் போற்றிப் பாதுகாத்தனர்.',
      mr: 'ओडिशातील कोणार्क (अर्क क्षेत्र) येथील १३ व्या शतकातील सूर्य मंदिराच्या कोरीव दगडी रथचक्रांचे पुरातत्वीय छायाचित्र. इ.स. १२५० च्या सुमारास नरसिंहदेव पहिल्या याने कलिंग स्थापत्यशैलीत बांधलेले हे मंदिर सूर्यदेवाच्या दिव्य रथाचे प्रतीक आहे आणि सूर्यवंशी गजपती सम्राटांनी त्याचे जतन केले.',
      or: 'ଓଡ଼ିଶାର କୋଣାର୍କ (ଅର୍କ କ୍ଷେତ୍ର) ସ୍ଥିତ ତ্রୟୋଦଶ ଶତାବ୍ଦୀର ବିଶ୍ୱപ്രସିଦ୍ଧ ସୂର୍ଯ୍ୟ ମନ୍ଦିରର ସୂକ୍ଷ୍ମ କାରୁକାର୍ଯ୍ୟପୂର୍ଣ୍ଣ ପ୍ରସ୍ତର ରଥଚକ୍ରର (ପ୍ରତ୍ୟେକ ୯ ଫୁଟ ୯ ଇଞ୍ଚ ବ୍ୟାସ ଓ ସୂର୍ଯ୍ୟଘଡ଼ି ରୂପେ କାର୍ଯ୍ୟ କରୁଥିବା ଅର ସହିତ) ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଫଟୋଚିତ୍ର। ପ୍ରାୟ ୧୨୫୦ ଖ୍ରୀଷ୍ଟାବ୍ଦରେ ପ୍ରଥମ ନରସିଂହ ଦେବଙ୍କ ଦ୍ୱାରା ଶାସ୍ତ୍ରୀୟ କଳିଙ୍ଗ ସ୍ଥାପତ୍ୟ ଶୈଳୀରେ ନିର୍ମିତ ଏହି ମନ୍ଦିର ସୂର୍ଯ୍ୟଦେବଙ୍କ ଦିବ୍ୟ ରଥର ପ୍ରତୀକ ଅଟେ, ଯାହାକୁ ପରବର୍ତ୍ତୀ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସମ୍ରାଟମାନେ ସଂରକ୍ଷଣ କରିଥିଲେ।',
      bn: 'ওড়িশার কোণার্কে (অর্ক ক্ষেত্র) অবস্থিত ত্রয়োদশ শতাব্দীর সূর্য মন্দিরের সূক্ষ্ম কারুকার্যময় প্রস্তর রথচক্রের প্রত্নতাত্ত্বিক আলোকচিত্র। আনুমানিক ১২৫০ খ্রিস্টাব্দে প্রথম নরসিংহদেব কর্তৃক ধ্রুপদী কলিঙ্গ স্থাপত্যশৈলীতে নির্মিত এই মন্দির সূর্যদেবের দিব্য রথের প্রতীক, যা পরবর্তী সূর্যবংশীয় গজপতি সম্রাটগণ সংরক্ষণ ও উপাসনা করেছিলেন।'
    }
  },
  gal_04: {
    locationIds: ['loc_kondavidu_fort', 'loc_udayagiri_fort'],
    monumentIds: ['mon_draksharama_mandapa'],
    documentIds: ['doc_sarasvati_vilasa'],
    inscriptionIds: ['insc_veligalani_1458'],
    timelineEventIds: ['ev_1448', 'ev_1458', 'ev_1515'],
    articleId: 'art_gajapathi_kapilendra',
    keywordIds: [
      'kw_kondavidu',
      'kw_forts_citadels',
      'kw_hamvira_deva',
      'kw_kapilendra_deva',
      'kw_andhra_pradesh',
      'kw_gajapathi_empire',
      'kw_odiyaraju_kshatriya',
      'kw_suryavamsha'
    ],
    people: {
      en: ['Kumara Hamvira Deva (Eldest Son of Kapilendra Deva & Southern Viceroy, c. 1454–1476 CE)', 'Emperor Kapilendra Deva Gajapathi', 'Emperor Prataparudra Deva', 'Prince Virabhadra Deva (Commander of Kondapalli & Malebennur)'],
      hi: ['कुमार हम्मीर देव (कपिलेंद्र देव के ज्येष्ठ पुत्र एवं दक्षिण प्रांतपति, लगभग 1454–1476 ई.)', 'सम्राट कपिलेंद्र देव गजपति', 'सम्राट प्रतापरुद्र देव', 'राजकुमार वीरभद्र देव'],
      te: ['కుమార హంవీర దేవుడు (కపిలేంద్ర దేవుని జ్యేష్ఠ కుమారుడు & దక్షిణ రాజప్రతినిధి, క్రీ.శ. 1454–1476)', 'చక్రవర్తి కపిలేంద్ర దేవ గజపతి', 'చక్రవర్తి ప్రతాపరుద్ర దేవుడు', 'యువరాజు వీరభద్ర దేవుడు'],
      kn: ['ಕುಮಾರ ಹಂವೀರ ದೇವ (ಕಪಿಲೇಂದ್ರ ದೇವನ ಹಿರಿಯ ಮಗ ಮತ್ತು ದಕ್ಷಿಣದ ಪ್ರತಿನಿಧಿ, ಕ್ರಿ.ಶ. 1454–1476)', 'ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವ ಗಜಪತಿ', 'ಸಾಮ್ರಾಟ್ ಪ್ರತಾಪರುದ್ರ ದೇವ', 'ರಾಜಕುಮಾರ ವೀರಭದ್ರ ದೇವ'],
      ta: ['குமார ஹம்வீர தேவர் (கபிலேந்திர தேவரின் மூத்த மகன் & தென்னக ஆளுநர், கி.பி. 1454–1476)', 'பேரரசர் கபிலேந்திர தேவ கஜபதி', 'பேரரசர் பிரதாபருத்ர தேவர்', 'இளவரசர் வீரபத்ர தேவர்'],
      mr: ['कुमार हम्मीर देव (कपिलेंद्र देवाचे ज्येष्ठ पुत्र आणि दक्षिण प्रांतपाल, इ.स. १४५४–१४७६)', 'सम्राट कपिलेंद्र देव गजपती', 'सम्राट प्रतापरुद्र देव', 'राजकुमार वीरभद्र देव'],
      or: ['କୁମାର ହମ୍ବୀର ଦେବ (କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଜ୍ୟେଷ୍ଠ ପୁତ୍ର ଓ ଦକ୍ଷିଣ ପ୍ରାନ୍ତପତି, ୧୪୫୪–୧୪୭୬ ଖ୍ରୀ.)', 'ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ଗଜପତି', 'ସମ୍ରାଟ ପ୍ରତାପରୁଦ୍ର ଦେବ', 'ରାଜକୁମାର ବୀରଭଦ୍ର ଦେବ'],
      bn: ['কুমার হম্বীর দেব (কপিলেন্দ্র দেবের জ্যেষ্ঠ পুত্র ও দক্ষিণ প্রান্তপাল, ১৪৫৪–১৪৭৬ খ্রি.)', 'সম্রাট কপিলেন্দ্র দেব গজপতি', 'সম্রাট প্রতাপরুদ্র দেব', 'রাজকুমার বীরভদ্র দেব']
    },
    places: {
      en: ['Kondavidu Hill Fortress (Kundinapura), Palnadu / Guntur District, Andhra Pradesh', 'Veligalani Village (Guntur District, Krishna River Bank)', 'Udayagiri & Kondapalli Fortresses'],
      hi: ['कोंडावीडु गिरिदुर्ग (कुंडिनपुर), पलनाडु / गुंटूर जिला, आंध्र प्रदेश', 'वेलिगलनी ग्राम (गुंटूर जिला, कृष्णा नदी तट)', 'उदयगिरि एवं कोंडापल्ली दुर्ग'],
      te: ['కొండవీడు గిరిదుర్గం (కుండినపురం), పల్నాడు / గుంటూరు జిల్లా, ఆంధ్రప్రదేశ్', 'వెలిగలని గ్రామం (గుంటూరు జిల్లా, కృష్ణా నదీ తీరం)', 'ఉదయగిరి & కొండపల్లి దుర్గాలు'],
      kn: ['ಕೊಂಡವೀಡು ಬೆಟ್ಟದ ಕೋಟೆ (ಕುಂಡಿನಪುರ), ಪಲ್ನಾಡು / ಗುಂಟೂರು ಜಿಲ್ಲೆ, ಆಂಧ್ರಪ್ರದೇಶ', 'ವೆಲಿಗಲನಿ ಗ್ರಾಮ (ಕೃಷ್ಣಾ ನದಿ ತೀರ)', 'ಉದಯಗಿರಿ ಮತ್ತು ಕೊಂಡಪಲ್ಲಿ ಕೋಟೆಗಳು'],
      ta: ['கொண்டவீடு மலைக்கோட்டை (குண்டினபுரம்), பல்நாடு / குண்டூர் மாவட்டம், ஆந்திரப் பிரதேசம்', 'வெலிகலனி கிராமம் (கிருஷ்ணா நதிக்கரை)', 'உதயகிரி & கொண்டபல்லி கோட்டைகள்'],
      mr: ['कोंडावीडु गिरीदुर्ग (कुंडिनपूर), पलनाडू / गुंटूर जिल्हा, आंध्र प्रदेश', 'वेलिगलनी गाव (कृष्णा नदी काठ)', 'उदयगिरी आणि कोंडापल्ली किल्ले'],
      or: ['କୋଣ୍ଡାଭିଡୁ ଗିରିଦୁର୍ଗ (କୁଣ୍ଡିନପୁର), ପଲనాଡୁ / ଗୁଣ୍ଟୁର ଜିଲ୍ଲା, ଆନ୍ଧ୍ର ପ୍ରଦେଶ', 'ଭେଲିଗାଲାନି ଗ୍ରାମ (କୃଷ୍ଣା ନଦୀ ତଟ)', 'ଉଦୟଗିରି ଓ କୋଣ୍ଡାପଲ୍ଲୀ ଦୁର୍ଗ'],
      bn: ['কোন্ডাভিডু গিরিদুর্গ (কুণ্ডিনপুর), পলনাড়ু / গুন্টুর জেলা, অন্ধ্রপ্রদেশ', 'ভেলিগালানি গ্রাম (কৃষ্ণা নদীর তীর)', 'উদয়গিরি ও কোন্ডাপল্লী দুর্গ']
    },
    dynasties: {
      en: ['Suryavamsha Gajapathi Dynasty (Southern Viceroyalty)', 'Odiyaraju / Vadde-Gajapathi Military Lineages'],
      hi: ['सूर्यवंशी गजपति राजवंश (दक्षिणी प्रांत)', 'ओडियाराजू / वड्डे-गजपति सैन्य वंश'],
      te: ['సూర్యవంశ గజపతి రాజవంశం (దక్షిణ రాజప్రతినిధిత్వం)', 'ఒడియరాజు / వడ్డె-గజపతి సైనిక వంశాలు'],
      kn: ['ಸೂರ್ಯವಂಶ ಗಜಪತಿ ರಾಜವಂಶ (ದಕ್ಷಿಣ ಪ್ರಾಂತ್ಯ)', 'ಒಡಿಯರಾಜು / ವಡ್ಡೆ-ಗಜಪತಿ ಸೈನಿಕ ವಂಶಗಳು'],
      ta: ['சூரியவம்ச கஜபதி வம்சம் (தென்னக மாகாணம்)', 'ஒடியாராஜு / வட்டே-கஜபதி படை வம்சங்கள்'],
      mr: ['सूर्यवंशी गजपती राजवंश (दक्षिण प्रांत)', 'ओडियाराजू / वड्डे-गजपती लष्करी घराणी'],
      or: ['ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ରାଜବଂଶ (ଦକ୍ଷିଣ ପ୍ରାନ୍ତ)', 'ଓଡ଼ିଆରାଜୁ / ଭଦ୍ଦେ-ଗଜପତି ସାମରିକ ବଂଶ'],
      bn: ['সূর্যবংশীয় গজপতি রাজবংশ (দক্ষিণ প্রদেশ)', 'ওড়িয়ারাজু / ভদ্দে-গজপতি সামরিক বংশ']
    },
    extendedDescription: {
      en: 'Photographic documentation of the granite watchtowers, cyclopean hill ramparts, and mountain bastions of Kondavidu Fortress in Palnadu (Guntur) District, Andhra Pradesh. Captured in 1454 CE by Kumara Hamvira Deva during Emperor Kapilendra Deva’s southern campaigns, Kondavidu served as the primary military command headquarters and administrative capital of the Gajapathi Empire’s southern viceroyalty, housing royal water reservoirs (Mutyala Cheruvu), granaries, and Gajapathi pillar inscriptions.',
      hi: 'आंध्र प्रदेश के पलनाडु (गुंटूर) जिले में स्थित ऐतिहासिक कोंडावीडु गिरिदुर्ग के ग्रेनाइट निरीक्षण बुर्जों और विशाल पर्वत प्राचीरों का पुरातात्विक छायाचित्रण। 1454 ई. में सम्राट कपिलेंद्र देव के दक्षिणी अभियानों के दौरान कुमार हम्मीर देव द्वारा विजित कोंडावीडु दुर्ग गजपति साम्राज्य के दक्षिणी प्रांत का प्रमुख सैन्य मुख्यालय और प्रशासनिक राजधानी रहा, जहां राजकीय जलाशय (मुत्याला चेरुवु), शस्त्रागार और गजपति स्तंभ शिलालेख सुरक्षित हैं।',
      te: 'ఆంధ్రప్రదేశ్‌లోని పల్నాడు (గుంటూరు) జిల్లాలో ఉన్న చారిత్రక కొండవీడు గిరిదుర్గపు గ్రానైట్ బురుజులు మరియు కొండ కోటగోడల పురావస్తు ఛాయాచిత్ర డాక్యుమెంటేషన్. క్రీ.శ. 1454లో కపిలేంద్ర దేవుని దక్షిణ దిగ్విజయ యాత్రలో కుమార హంవీర దేవునిచే జయించబడిన కొండవీడు కోట, గజపతి సామ్రాజ్య దక్షిణ రాజప్రతినిధిత్వానికి ప్రధాన సైనిక మరియు పరిపాలనా రాజధానిగా విలసిల్లింది. ఇక్కడ ముత్యాల చెరువు జలాశయాలు, ఆయుధాగారాలు మరియు గజపతి స్తంభ శాసనాలు ఉన్నాయి.',
      kn: 'ಆಂಧ್ರಪ್ರದೇಶದ ಪಲ್ನಾಡು (ಗುಂಟೂರು) ಜಿಲ್ಲೆಯಲ್ಲಿರುವ ಐತಿಹಾಸಿಕ ಕೊಂಡವೀಡು ಬೆಟ್ಟದ ಕೋಟೆಯ ಗ್ರಾನೈಟ್ ಕಾವಲು ಗೋಪುರಗಳು ಮತ್ತು ಕೋಟೆ ಗೋಡೆಗಳ ದಾಖಲಾತಿ. ಕ್ರಿ.ಶ. 1454ರಲ್ಲಿ ಕುಮಾರ ಹಂವೀರ ದೇವನು ವಶಪಡಿಸಿಕೊಂಡ ಕೊಂಡವೀಡು ಕೋಟೆಯು ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ದಕ್ಷಿಣ ಪ್ರಾಂತ್ಯದ ಪ್ರಮುಖ ಸೇನಾ ಮತ್ತು ಆಡಳಿತ ಕೇಂದ್ರವಾಗಿತ್ತು.',
      ta: 'ஆந்திரப் பிரதேசத்தின் பல்நாடு (குண்டூர்) மாவட்டத்தில் உள்ள கொண்டவீடு மலைக்கோட்டையின் கருங்கல் கண்காணிப்பு கோபுரங்கள் மற்றும் மதில் சுவர்களின் ஆவணப் புகைப்படம். கி.பி. 1454இல் குமார ஹம்வீர தேவரால் கைப்பற்றப்பட்ட இக்கோட்டை கஜபதி பேரரசின் தென்னக மாகாணத்தின் முதன்மை ராணுவத் தலைமையகமாகத் திகழ்ந்தது.',
      mr: 'आंध्र प्रदेशातील पलनाडू (गुंटूर) जिल्ह्यातील ऐतिहासिक कोंडावीडु डोंगरी किल्ल्याच्या ग्रॅनाइट टेहळणी बुरुजांचे आणि तटबंदीचे छायाचित्रण. इ.स. १४५४ मध्ये कुमार हम्मीर देवाने जिंकलेला कोंडावीडु किल्ला गजपती साम्राज्याच्या दक्षिण प्रांताचे मुख्य लष्करी आणि प्रशासकीय केंद्र होता.',
      or: 'ଆନ୍ଧ୍ର ପ୍ରଦେଶର ପଲనాଡୁ (ଗୁଣ୍ଟୁର) ଜିଲ୍ଲାସ୍ଥିତ ଐତିହାସିକ କୋଣ୍ଡାଭିଡୁ ଗିରିଦୁର୍ଗର ଗ୍ରାନାଇଟ୍ ପ୍ରହରୀ ବୁରୁଜ ଓ ପର୍ବତ ପ୍ରାଚୀରର ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଫଟୋଚିତ୍ର। ୧୪୫୪ ଖ୍ରୀଷ୍ଟାବ୍ଦରେ କୁମାର ହମ୍ବୀର ଦେବଙ୍କ ଦ୍ୱାରା ଅଧିକୃତ କୋଣ୍ଡାଭିଡୁ ଦୁର୍ଗ ଗଜପତି ସାମ୍ରାଜ୍ୟର ଦକ୍ଷିଣ ପ୍ରାନ୍ତର ମୁଖ୍ୟ ସାମରିକ ଓ ପ୍ରଶାସନିକ ରାଜଧାନୀ ଥିଲା, ଯେଉଁଠାରେ ରାଜକୀୟ ଜଳାଶୟ ଓ ଗଜପତି ସ୍ତମ୍ଭ ଶିଳାଲେଖ ରହିଛି।',
      bn: 'অন্ধ্রপ্রদেশের পলনাড়ু (গুন্টুর) জেলায় অবস্থিত ঐতিহাসিক কোন্ডাভিডু গিরিদুর্গের গ্রানাইট পর্যবেক্ষণ বুরুজ ও পর্বত প্রাচীরের প্রত্নতাত্ত্বিক আলোকচিত্র। ১৪৫৪ খ্রিস্টাব্দে কুমার হম্বীর দেব কর্তৃক বিজিত কোন্ডাভিডু দুর্গ গজপতি সাম্রাজ্যের দক্ষিণ প্রদেশের প্রধান সামরিক ও প্রশাসনিক সদর দপ্তর হিসেবে ব্যবহৃত হতো।'
    }
  },
  gal_05: {
    locationIds: ['loc_puri_jagannatha'],
    monumentIds: ['mon_meghanada_pacheri'],
    documentIds: ['doc_madala_panji', 'doc_sarasvati_vilasa'],
    inscriptionIds: ['insc_lingaraja_1452', 'insc_simhachalam_prataparudra'],
    timelineEventIds: ['ev_1434', 'ev_1515'],
    articleId: 'art_genealogy_methodology',
    keywordIds: [
      'kw_epigraphy_manuscripts',
      'kw_madala_panji',
      'kw_prataparudra_deva',
      'kw_kapilendra_deva',
      'kw_suryavamsha',
      'kw_odisha',
      'kw_odra_desha'
    ],
    people: {
      en: ['Emperor Prataparudra Deva Gajapathi (Author of Sarasvati Vilasa, 1497–1540 CE)', 'Emperor Kapilendra Deva', 'Puri Temple Deula Karanas & Tadau Karanas (Hereditary Archival Scribes)', 'Dr. R. Shama Sastri & K.N. Mahapatra (Modern Critical Editors)'],
      hi: ['सम्राट प्रतापरुद्र देव गजपति (सरस्वती विलास के प्रणेता, 1497–1540 ई.)', 'सम्राट कपिलेंद्र देव', 'पुरी मंदिर देउल करण एवं तड़उ करण (वंशानुगत अभिलेख लिपिक)', 'डॉ. आर. शामशास्त्री एवं के.एन. महापात्र'],
      te: ['చక్రవర్తి ప్రతాపరుద్ర దేవ గజపతి (సరస్వతీ విలాస రచయిత, క్రీ.శ. 1497–1540)', 'చక్రవర్తి కపిలేంద్ర దేవుడు', 'పూరి ఆలయ దేవుల కరణాలు (వంశపారంపర్య తాళపత్ర లేఖకులు)', 'డా. ఆర్. శ్యామశాస్త్రి & కె.ఎన్. మహాపాత్ర'],
      kn: ['ಸಾಮ್ರಾಟ್ ಪ್ರತಾಪರುದ್ರ ದೇವ ಗಜಪತಿ (ಸರಸ್ವತಿ ವಿಲಾಸ ಕರ್ತೃ, 1497–1540)', 'ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವ', 'ಪುರಿ ದೇವಾಲಯದ ಕರಣಿಕರು (ಪಾರಂಪರಿಕ ತಾಳೆಗರಿ ಬರಹಗಾರರು)', 'ಡಾ. ಆರ್. ಶಾಮಶಾಸ್ತ್ರಿ'],
      ta: ['பேரரசர் பிரதாபருத்ர தேவ கஜபதி (சரஸ்வதி விலாசம் ஆசிரியர், 1497–1540)', 'பேரரசர் கபிலேந்திர தேவர்', 'புரி கோயில் கரணங்கள் (பாரம்பரிய ஓலைச்சுவடி எழுத்தர்கள்)', 'டாக்டர் ஆர். சாமசாஸ்திரி'],
      mr: ['सम्राट प्रतापरुद्र देव गजपती (सरस्वती विलासचे कर्ते, १४९७–१५४०)', 'सम्राट कपिलेंद्र देव', 'पुरी मंदिर करण (वंशपरंपरागत ताडपत्र लेखक)', 'डॉ. आर. श्यामशास्त्री'],
      or: ['ସମ୍ରାଟ ପ୍ରତାପରୁଦ୍ର ଦେବ ଗଜପତି (ସରସ୍ୱତୀ ବିଳାସ ପ୍ରଣେତା, ୧୪୯୭–୧୫୪୦ ଖ୍ରୀ.)', 'ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ', 'ପୁରୀ ଶ୍ରୀମନ୍ଦିର ଦେଉଳ କରଣ ଓ ତଡ଼ଉ କରଣ', 'ଡ. ଆର୍. শାମଶାସ୍ତ୍ରୀ ଓ କେ.ଏନ୍. ମହାପାତ୍ର'],
      bn: ['সম্রাট প্রতাপরুদ্র দেব গজপতি (সরস্বতী বিলাস প্রণেতা, ১৪৯৭–১৫৪০ খ্রি.)', 'সম্রাট কপিলেন্দ্র দেব', 'পুরী মন্দিরের দেউল করণ (বংশানুক্রমিক পুঁথি লিপিকার)', 'ড. আর. শামশাস্ত্রী']
    },
    places: {
      en: ['Odisha State Museum & Odisha State Archives, Bhubaneswar', 'Puri Sri Jagannatha Temple Archives', 'Government Oriental Manuscripts Library, Chennai'],
      hi: ['ओडिशा राज्य संग्रहालय एवं राज्य अभिलेखागार, भुवनेश्वर', 'पुरी श्री जगन्नाथ मंदिर अभिलेखागार', 'राजकीय प्राच्य पांडुलिपि पुस्तकालय, चेन्नई'],
      te: ['ఒడిశా స్టేట్ మ్యూజియం & స్టేట్ ఆర్కైవ్స్, భువనేశ్వర్', 'పూరి శ్రీ జగన్నాథ ఆలయ భాండాగారం', 'ప్రభుత్వ ప్రాచ్య తాళపత్ర గ్రంథాలయం, చెన్నై'],
      kn: ['ಒಡಿಶಾ ರಾಜ್ಯ ವಸ್ತುಸಂಗ್ರಹಾಲಯ ಮತ್ತು ಪತ್ರಾಗಾರ, ಭುವನೇಶ್ವರ', 'ಪುರಿ ಶ್ರೀ ಜಗನ್ನಾಥ ದೇವಾಲಯ ಪತ್ರಾಗಾರ', 'ಸರ್ಕಾರಿ ಪ್ರಾಚ್ಯ ಹಸ್ತಪ್ರತಿ ಗ್ರಂಥಾಲಯ, ಚೆನ್ನೈ'],
      ta: ['ஒடிசா மாநில அருங்காட்சியகம் & ஆவணக் காப்பகம், புவனேஸ்வர்', 'புரி ஸ்ரீ ஜெகந்நாதர் கோயில் ஆவணக் காப்பகம்', 'அரசினர் கீழ்த்திசை ஓலைச்சுவடி நூலகம், சென்னை'],
      mr: ['ओडिशा राज्य संग्रहालय आणि अभिलेखागार, भुवनेश्वर', 'पुरी श्री जगन्नाथ मंदिर अभिलेखागार', 'शासकीय प्राच्य हस्तलिखित ग्रंथालय, चेन्नई'],
      or: ['ଓଡ଼ିଶା ରାଜ୍ୟ ସଂଗ୍ରହାଳୟ ଓ ରାଜ୍ୟ ଅଭିଲେଖାଗାର, ଭୁବନେଶ୍ୱର', 'ପୁରୀ ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର ଅଭିଲେଖାଗାର', 'ସରକାରୀ ପ୍ରାଚ୍ୟ ପାଣ୍ଡୁଲିପି ଗ୍ରନ୍ଥାଗାର, ଚେନ୍ନାଇ'],
      bn: ['ওড়িশা রাজ্য জাদুঘর ও মহাফেজখানা, ভুবনেশ্বর', 'পুরী শ্রীজগন্নাথ মন্দির মহাফেজখানা', 'সরকারি প্রাচ্য পাণ্ডুলিপি গ্রন্থাগার, চেন্নাই']
    },
    dynasties: {
      en: ['Suryavamsha Gajapathi Dynasty', 'Traditional Kshatriya Vamsavali Archives'],
      hi: ['सूर्यवंशी गजपति राजवंश', 'पारंपरिक क्षत्रिय वंशावली अभिलेख'],
      te: ['సూర్యవంశ గజపతి రాజవంశం', 'సాంప్రదాయ క్షత్రియ వంశావళి భాండాగారం'],
      kn: ['ಸೂರ್ಯವಂಶ ಗಜಪತಿ ರಾಜವಂಶ', 'ಸಾಂಪ್ರದಾಯಿಕ ಕ್ಷತ್ರಿಯ ವಂಶಾವಳಿ ದಾಖಲೆಗಳು'],
      ta: ['சூரியவம்ச கஜபதி வம்சம்', 'பாரம்பரிய சத்திரிய வம்சாவளி ஆவணங்கள்'],
      mr: ['सूर्यवंशी गजपती राजवंश', 'पारंपरिक क्षत्रिय वंशावळ अभिलेख'],
      or: ['ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ରାଜବଂଶ', 'ପାରମ୍ପରିକ କ୍ଷତ୍ରିୟ ବଂଶାବଳୀ ଅଭିଲେଖ'],
      bn: ['সূর্যবংশীয় গজপতি রাজবংশ', 'ঐতিহ্যবাহী ক্ষত্রিয় বংশাবলী দলিল']
    },
    extendedDescription: {
      en: 'High-resolution archival specimen of a 16th-century cured palm-leaf manuscript (Tala-patra Pothi) incised with an iron stylus (Loha Lekhani) in classical Odia and Sanskrit characters, preserved at the Odisha State Museum, Bhubaneswar. Such manuscripts form the primary documentary medium for the Madala Panji (Rajabhoga temple chronicles of Puri), Prataparudra Deva’s legal digest Sarasvati Vilasa, and hereditary family Vamsavalis studied alongside contemporary copper-plate epigraphy.',
      hi: 'ओडिशा राज्य संग्रहालय, भुवनेश्वर में संरक्षित 16वीं शताब्दी की उपचारित ताड़पत्र पांडुलिपि (ताड़पत्र पोथी) का उच्च-रिज़ॉल्यूशन अभिलेखीय नमूना, जिसे लोह-लेखनी द्वारा शास्त्रीय उड़िया और संस्कृत लिपि में उत्कीर्ण किया गया है। ऐसी पांडुलिपियां पुरी के "मादला पांजी" (राजभोग इतिहास), सम्राट प्रतापरुद्र देव की न्याय संहिता "सरस्वती विलास" और पारंपरिक क्षत्रिय वंशावलियों का मूल आधार हैं।',
      te: 'భువనేశ్వర్‌లోని ఒడిశా స్టేట్ మ్యూజియంలో భద్రపరచబడిన 16వ శతాబ్దపు తాళపత్ర గ్రంథం (తాళపత్ర పోథి) యొక్క పురాతత్వ ఛాయాచిత్రం. ఇనుప ఘంటంతో ప్రాచీన ఒడియా మరియు సంస్కృత లిపులలో చెక్కబడిన ఇటువంటి తాళపత్ర గ్రంథాలు పూరి ఆలయ "మాదళా పాంజీ" రాజచరిత్ర, ప్రతాపరుద్ర దేవుని న్యాయశాస్త్ర గ్రంథం "సరస్వతీ విలాసం" మరియు రాజవంశ వంశావళులకు ప్రధాన ఆధారాలుగా నిలిచాయి.',
      kn: 'ಭುವನೇಶ್ವರದ ಒಡಿಶಾ ರಾಜ್ಯ ವಸ್ತುಸಂಗ್ರಹಾಲಯದಲ್ಲಿ ಸಂರಕ್ಷಿಸಲಾಗಿರುವ 16ನೇ ಶತಮಾನದ ತಾಳೆಗರಿ ಹಸ್ತಪ್ರತಿಯ (ತಾಳಪತ್ರ ಪೋಥಿ) ಪತ್ರಾಗಾರ ದಾಖಲೆ. ಕಬ್ಬಿಣದ ಕಂಠದಿಂದ ಒಡಿಯಾ ಮತ್ತು ಸಂಸ್ಕೃತ ಲಿಪಿಗಳಲ್ಲಿ ಕೆತ್ತಲಾದ ಇಂತಹ ಹಸ್ತಪ್ರತಿಗಳು ಪುರಿಯ "ಮಾದಲಾ ಪಾಂಜಿ", ಪ್ರತಾಪರುದ್ರ ದೇವನ "ಸರಸ್ವತಿ ವಿಲಾಸ" ಮತ್ತು ರಾಜ ವಂಶಾವಳಿಗಳಿಗೆ ಪ್ರಮುಖ ಆಧಾರಗಳಾಗಿವೆ.',
      ta: 'புவனேஸ்வரில் உள்ள ஒடிசா மாநில அருங்காட்சியகத்தில் பாதுகாக்கப்படும் 16ஆம் நூற்றாண்டு ஓலைச்சுவடியின் ஆவணப் புகைப்படம். எழுத்தாணியால் ஒடியா மற்றும் சம்ஸ்கிருத எழுத்துக்களில் பொறிக்கப்பட்ட இத்தகைய சுவடிகள் புரி கோயிலின் "மாதளா பாஞ்சி", பிரதாபருத்ர தேவரின் "சரஸ்வதி விலாசம்" மற்றும் அரச வம்சாவளிகளுக்கு முதன்மை ஆதாரமாகும்.',
      mr: 'भुवनेश्वर येथील ओडिशा राज्य संग्रहालयात जतन केलेल्या १६ व्या शतकातील ताडपत्र हस्तलिखिताचा (ताडपत्र पोथी) अभिलेखीय नमुना. लोखंडी लेखणीने प्राचीन ओडिया आणि संस्कृत लिपीत कोरलेली अशी हस्तलिखिते पुरीच्या "मादला पांजी", प्रतापरुद्र देवाच्या "सरस्वती विलास" आणि राजवंश वंशावळींचे प्रमुख साधन आहेत.',
      or: 'ଭୁବନେଶ୍ୱରସ୍ଥିତ ଓଡ଼ିଶା ରାଜ୍ୟ ସଂଗ୍ରହାଳୟରେ ସଂରକ୍ଷିତ ଷୋଡ଼ଶ ଶତାବ୍ଦୀର ତାଳପତ୍ର ପୋଥିର ଉଚ୍ଚ-ମାନର ଅଭିଲେଖ ନମୁନା, ଯାହା ଲୌହ ଲେଖନୀ ଦ୍ୱାରା ପ୍ରାଚୀନ ଓଡ଼ିଆ ଓ ସଂସ୍କୃତ ଅକ୍ଷରରେ ଖୋଦିତ। ଏଭଳି ତାଳପତ୍ର ପୋଥି ପୁରୀ ଶ୍ରୀମନ୍ଦିରର "ମାଦଳା ପାଞ୍ଜି", ସମ୍ରାଟ ପ୍ରତାପରୁଦ୍ର ଦେବଙ୍କ "ସରସ୍ୱତୀ ବିଳାସ" ଏବଂ ପାରମ୍ପରିକ ରାଜବଂଶାବଳୀର ମୌଳିକ ଆଧାର ଅଟେ।',
      bn: 'ভুবনেশ্বরের ওড়িশা রাজ্য জাদুঘরে সংরক্ষিত ষোড়শ শতাব্দীর তালপাতার পাণ্ডুলিপির (তালপত্র পুঁথি) মহাফেজখানা আলোকচিত্র, যা লৌহ লেখনী দ্বারা প্রাচীন ওড়িয়া ও সংস্কৃত লিপিতে খোদাই করা। এই ধরনের পাণ্ডুলিপি পুরীর "মাদলা পাঞ্জি", সম্রাট প্রতাপরুদ্র দেবের "সরস্বতী বিলাস" এবং রাজবংশীয় বংশাবলীর প্রধান উৎস।'
    }
  },
  gal_06: {
    locationIds: ['loc_barabati_fort', 'loc_kondavidu_fort', 'loc_simhachalam', 'loc_udayagiri_fort'],
    monumentIds: ['mon_draksharama_mandapa'],
    documentIds: ['doc_madala_panji'],
    inscriptionIds: ['insc_veligalani_1458', 'insc_lingaraja_1452', 'insc_simhachalam_prataparudra'],
    timelineEventIds: ['ev_1434', 'ev_1448', 'ev_1458', 'ev_1464'],
    articleId: 'art_epigraphic_evolution_odra',
    keywordIds: [
      'kw_historical_geography',
      'kw_odra_desha',
      'kw_gajapathi_empire',
      'kw_kapilendra_deva',
      'kw_hamvira_deva',
      'kw_epigraphy_manuscripts',
      'kw_suryavamsha',
      'kw_odisha',
      'kw_andhra_pradesh'
    ],
    people: {
      en: ['Emperor Kapilendra Deva Gajapathi (Gajapathi Gaudesvara Navakoti Karnata Kalavargesvara)', 'Kumara Hamvira Deva (Commander of Southern Campaigns to Srirangam, 1464 CE)', 'Emperor Kharavela (Ancient Kalinga-Odra Sovereign)', 'Dr. D.C. Sircar & Dr. R. Subrahmanyam (Epigraphic Historians)'],
      hi: ['सम्राट कपिलेंद्र देव गजपति (गजपति गौड़ेश्वर नवकोटि कर्णाट कलबर्गेश्वर)', 'कुमार हम्मीर देव (श्रीरंगम तक दक्षिणी अभियान के सेनापति, 1464 ई.)', 'सम्राट खारवेल (प्राचीन कलिंग-ओड्र सम्राट)', 'डॉ. डी.सी. सरकार एवं डॉ. आर. सुब्रह्मण्यम'],
      te: ['చక్రవర్తి కపిలేంద్ర దేవ గజపతి (గజపతి గౌడేశ్వర నవకోటి కర్ణాట కలబర్గేశ్వర)', 'కుమార హంవీర దేవుడు (క్రీ.శ. 1464లో శ్రీరంగం వరకు దక్షిణ దండయాత్ర సేనాని)', 'చక్రవర్తి ఖారవేలుడు (ప్రాచీన కళింగ-ఓడ్ర చక్రవర్తి)', 'డా. డి.సి. సర్కార్ & డా. ఆర్. సుబ్రహ్మణ్యం'],
      kn: ['ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವ ಗಜಪತಿ (ಗಜಪತಿ ಗೌಡೇಶ್ವರ ನವಕೋಟಿ ಕರ್ಣಾಟ ಕಲಬರ್ಗೇಶ್ವರ)', 'ಕುಮಾರ ಹಂವೀರ ದೇವ (ಕ್ರಿ.ಶ. 1464ರ ಶ್ರೀರಂಗಂ ಅಭಿಯಾನದ ಸೇనాని)', 'ಸಾಮ್ರಾಟ್ ಖಾರವೇಲ', 'ಡಾ. ಡಿ.ಸಿ. ಸರ್ಕಾರ್ ಮತ್ತು ಡಾ. ಆರ್. ಸುಬ್ರಹ್ಮಣ್ಯಂ'],
      ta: ['பேரரசர் கபிலேந்திர தேவ கஜபதி (கஜபதி கௌடேஸ்வர நவகோடி கர்நாட கலபர்கேஸ்வர)', 'குமார ஹம்வீர தேவர் (கி.பி. 1464 ஸ்ரீரங்கம் படையெடுப்புத் தளபதி)', 'பேரரசர் காரவேலன்', 'டாக்டர் டி.சி. சர்க்கார் & டாக்டர் ஆர். சுப்பிரமணியம்'],
      mr: ['सम्राट कपिलेंद्र देव गजपती (गजपती गौडेश्वर नवकोटी कर्णाट कलबर्गेश्वर)', 'कुमार हम्मीर देव (इ.स. १४६४ च्या श्रीरंगम मोहिमेचे सेनापती)', 'सम्राट खारवेल', 'डॉ. डी.सी. सरकार आणि डॉ. आर. सुब्रह्मण्यम'],
      or: ['ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ଗଜପତି (ଗଜପତି ଗୌଡ଼େଶ୍ୱର ନବକୋଟି କର୍ଣ୍ଣାଟ କଲବର୍ଗେଶ୍ୱର)', 'କୁମାର ହମ୍ବୀର ଦେବ (୧୪୬୪ ଖ୍ରୀ. ଶ୍ରୀରଙ୍ଗମ ଅଭିଯାନର ସେନାପତି)', 'ସମ୍ରାଟ ଖାରବେଳ', 'ଡ. ଡି.ସି. ସରକାର ଓ ଡ. ଆର୍. ସୁବ୍ରହ୍ମଣ୍ୟମ'],
      bn: ['সম্রাট কপিলেন্দ্র দেব গজপতি (গজপতি গৌড়েশ্বর নবকোটি কর্ণাট কলবর্গেশ্বর)', 'কুমার হম্বীর দেব (১৪৬৪ খ্রিস্টাব্দে শ্রীরঙ্গম অভিযানের সেনাপতি)', 'সম্রাট খারবেল', 'ড. ডি.সি. সরকার ও ড. আর. সুব্রহ্মণ্যম']
    },
    places: {
      en: ['Odra Desha, Utkala, and Kalinga Heartland (Mahanadi to Rishikulya)', 'Varanasi Kataka (Imperial Capital, Cuttack)', 'Rajahmundry, Simhachalam, Draksharama, Kondavidu, and Udayagiri Corridors', 'Srirangam & Tiruvarur (Kaveri River Basin Southern Frontier)'],
      hi: ['ओड्र देश, उत्कल एवं कलिंग मूल क्षेत्र (महानदी से ऋषिकुल्या तक)', 'वाराणसी कटक (साम्राज्यीय राजधानी, कटक)', 'राजमुंदरी, सिंहाचलम, द्राक्षाराम, कोंडावीडु एवं उदयगिरि गलियारा', 'श्रीरंगम एवं तिरुवारूर (कावेरी नदी घाटी दक्षिणी सीमा)'],
      te: ['ఓడ్ర దేశం, ఉత్కళ మరియు కళింగ ప్రధాన భూభాగం (మహానది నుండి రుషికుల్య వరకు)', 'వారణాసి కటక్ (సామ్రాజ్య రాజధాని, కటక్)', 'రాజమహేంద్రవరం, సింహాచలం, ద్రాక్షారామం, కొండవీడు & ఉదయగిరి దుర్గాలు', 'శ్రీరంగం & తిరువారూరు (కావేరీ నదీ లోయ దక్షిణ సరిహద్దు)'],
      kn: ['ಓಡ್ರ ದೇಶ, ಉತ್ಕಲ ಮತ್ತು ಕಳಿಂಗ ಮೂಲ ಪ್ರದೇಶ', 'ವಾರಣಾಸಿ ಕಟಕ್ (ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿ, ಕಟಕ್)', 'ರಾಜಮಂಡ್ರಿ, ಸಿಂಹಾಚಲಂ, ದ್ರಾಕ್ಷಾರಾಮ, ಕೊಂಡವೀಡು ಮತ್ತು ಉದಯಗಿರಿ', 'ಶ್ರೀರಂಗಂ ಮತ್ತು ತಿರುವರೂರು (ಕಾವೇರಿ ನದಿ ಕಣಿವೆ)'],
      ta: ['ஒட்ர தேசம், உத்கலம் மற்றும் கலிங்க மையப் பகுதி', 'வாரணாசி கட்டக் (பேரரசின் தலைநகரம்)', 'ராஜமகேந்திரவரம், சிம்மாச்சலம், திராக்ஷாராமம், கொண்டவீடு & உதயகிரி', 'ஸ்ரீரங்கம் & திருவாரூர் (காவிரி நதிப் படுகை)'],
      mr: ['ओड्र देश, उत्कल आणि कलिंग मूळ प्रदेश', 'वाराणसी कटक (साम्राज्याची राजधानी)', 'राजमुंद्री, सिंहाचलम, द्राक्षाराम, कोंडावीडु आणि उदयगिरी', 'श्रीरंगम आणि तिरुवारूर (कावेरी नदी खोरे)'],
      or: ['ଓଡ଼୍ର ଦେଶ, ଉତ୍କଳ ଓ କଳିଙ୍ଗ କେନ୍ଦ୍ରଭୂମି (ମହାନଦୀରୁ ଋଷିକୁଲ୍ୟା)', 'ବାରଣାସୀ କଟକ (ସାମ୍ରାଜ୍ୟର ରାଜଧାନୀ)', 'ରାଜମହେନ୍ଦ୍ରବରମ, ସିଂହାଚଳମ, ଦ୍ରାକ୍ଷାରାମ, କୋଣ୍ଡାଭିଡୁ ଓ ଉଦୟଗିରି', 'ଶ୍ରୀରଙ୍ଗମ ଓ ତିରୁବାରୁର (କାବେରୀ ନଦୀ ଉପତ୍ୟକା)'],
      bn: ['ওড্র দেশ, উৎকল ও কলিঙ্গ মূল ভূখণ্ড (মহানদী থেকে ঋষিকুল্যা)', 'বারাণসী কটক (সাম্রাজ্যের রাজধানী)', 'রাজমহেন্দ্রবরম, সিংহাচলম, দ্রাক্ষারাম, কোন্ডাভিডু ও উদয়গিরি', 'শ্রীরঙ্গম ও তিরুভারুর (কাবেরী নদী অববাহিকা)']
    },
    dynasties: {
      en: ['Suryavamsha Gajapathi Empire', 'Ancient Odra-Kalinga Dynasties'],
      hi: ['सूर्यवंशी गजपति साम्राज्य', 'प्राचीन ओड्र-कलिंग राजवंश'],
      te: ['సూర్యవంశ గజపతి సామ్రాజ్యం', 'ప్రాచీన ఓడ్ర-కళింగ రాజవంశాలు'],
      kn: ['ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ', 'ಪ್ರಾಚೀನ ಓಡ್ರ-ಕಳಿಂಗ ರಾಜವಂಶಗಳು'],
      ta: ['சூரியவம்ச கஜபதி பேரரசு', 'பண்டைய ஒட்ர-கலிங்க வம்சங்கள்'],
      mr: ['सूर्यवंशी गजपती साम्राज्य', 'प्राचीन ओड्र-कलिंग राजवंश'],
      or: ['ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ', 'ପ୍ରାଚୀନ ଓଡ଼୍ର-କଳିଙ୍ଗ ରାଜବଂଶ'],
      bn: ['সূর্যবংশীয় গজপতি সাম্রাজ্য', 'প্রাচীন ওড্র-কলিঙ্গ রাজবংশ']
    },
    extendedDescription: {
      en: 'Historical cartographic reconstruction delineating the verified territorial extent of the Suryavamshi Gajapathi Empire around 1465 CE, based on epigraphic findspots published in Epigraphia Indica (Volumes XXIV to XXXV) and South Indian Inscriptions. Stretching from the Hooghly/Ganges basin in the north to the Kaveri River basin (Srirangam and Tiruvarur) in the south, the map plots key imperial centers including Varanasi Kataka, Puri, Simhachalam, Draksharama, Kondavidu, Veligalani, and Udayagiri.',
      hi: 'एपिग्राफिया इंडिका (खंड XXIV से XXXV) और दक्षिण भारतीय शिलालेखों में प्रकाशित प्रमाणित शिलालेख स्थलों के आधार पर लगभग 1465 ई. में सूर्यवंशी गजपति साम्राज्य के क्षेत्रीय विस्तार को दर्शाने वाला ऐतिहासिक मानचित्र। उत्तर में हुगली/गंगा घाटी से लेकर दक्षिण में कावेरी नदी घाटी (श्रीरंगम और तिरुवारूर) तक विस्तृत इस मानचित्र में वाराणसी कटक, पुरी, सिंहाचलम, द्राक्षाराम, कोंडावीडु, वेलिगलनी और उदयगिरि जैसे प्रमुख साम्राज्यीय केंद्रों को चिह्नित किया गया है।',
      te: 'ఎపిగ్రాఫియా ఇండికా (సంపుటాలు XXIV నుండి XXXV) మరియు దక్షిణ భారత శాసనాలలో ప్రచురించబడిన శాసన ఆధారాల ప్రకారం క్రీ.శ. 1465 ప్రాంతంలో సూర్యవంశ గజపతి సామ్రాజ్య విస్తరణను చూపే చారిత్రక పటం. ఉత్తరాన గంగా నదీ లోయ నుండి దక్షిణాన కావేరీ నదీ తీరం (శ్రీరంగం మరియు తిరువారూరు) వరకు విస్తరించిన ఈ సామ్రాజ్య పటంలో వారణాసి కటక్, పూరి, సింహాచలం, ద్రాక్షారామం, కొండవీడు, వెలిగలని మరియు ఉదయగిరి కేంద్రాలు గుర్తించబడ్డాయి.',
      kn: 'ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತೀಯ ಶಾಸನಗಳಲ್ಲಿ ಪ್ರಕಟವಾದ ಶಾಸನ ಸ್ಥಳಗಳ ಆಧಾರದ ಮೇಲೆ ಕ್ರಿ.ಶ. 1465ರ ಸುಮಾರಿಗೆ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ವ್ಯಾಪ್ತಿಯನ್ನು ತೋರಿಸುವ ಐತಿಹಾಸಿಕ ನಕ್ಷೆ. ಉತ್ತರದ ಗಂಗಾ ನದಿಯಿಂದ ದಕ್ಷಿಣದ ಕಾವೇರಿ ನದಿ ಕಣಿವೆಯ (ಶ್ರೀರಂಗಂ) ವರೆಗೆ ಹಬ್ಬಿದ್ದ ಸಾಮ್ರಾಜ್ಯದ ಪ್ರಮುಖ ಕೇಂದ್ರಗಳಾದ ಕಟಕ್, ಪುರಿ, ಸಿಂಹಾಚಲಂ, ಕೊಂಡವೀಡು ಮತ್ತು ಉದಯಗಿರಿಯನ್ನು ಇದು ಗುರುತಿಸುತ್ತದೆ.',
      ta: 'எபிகிராஃபியா இண்டிகா மற்றும் தென்னிந்தியக் கல்வெட்டுகளில் வெளியிடப்பட்ட கல்வெட்டு இடங்களின் அடிப்படையில் கி.பி. 1465இல் சூரியவம்ச கஜபதி பேரரசின் எல்லையைக் காட்டும் வரலாற்று வரைபடம். வடக்கே கங்கை நதி முதல் தெற்கே காவிரி நதிப் படுகை (ஸ்ரீரங்கம்) வரை பரவியிருந்த கட்டக், புரி, சிம்மாச்சலம், கொண்டவீடு, உதயகிரி ஆகிய மையங்களை இவ்வரைபடம் குறிக்கிறது.',
      mr: 'एपिग्राफिया इंडिका आणि दक्षिण भारतीय शिलालेखांमध्ये प्रकाशित शिलालेख स्थळांच्या आधारे इ.स. १४६५ च्या सुमारास सूर्यवंशी गजपती साम्राज्याचा विस्तार दर्शवणारा ऐतिहासिक नकाशा. उत्तरेस गंगा खोऱ्यापासून दक्षिणेस कावेरी नदीच्या खोऱ्यापर्यंत (श्रीरंगम) पसरलेल्या या साम्राज्यातील कटक, पुरी, सिंहाचलम, कोंडावीडु आणि उदयगिरी ही प्रमुख केंद्रे यात दर्शवली आहेत.',
      or: 'ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା (ଖଣ୍ଡ XXIV ରୁ XXXV) ଓ ଦକ୍ଷିଣ ଭାରତୀୟ ଶିଳାଲେଖରେ ପ୍ରକାଶିତ ପ୍ରମାଣିତ ଶିଳାଲେଖ ସ୍ଥାନଗୁଡ଼ିକ ଆଧାରରେ ପ୍ରାୟ ୧୪୬୫ ଖ୍ରୀଷ୍ଟାବ୍ଦରେ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟର ବିସ୍ତାର ଦର୍ଶାଉଥିବା ଐତିହାସିକ ମାନଚିତ୍ର। ଉତ୍ତରରେ ଗଙ୍ଗା ଉପତ୍ୟକାରୁ ଦକ୍ଷିଣରେ କାବେରୀ ନଦୀ (ଶ୍ରୀରଙ୍ଗମ) ପର୍ଯ୍ୟନ୍ତ ବିସ୍ତୃତ ଏହି ମାନଚିତ୍ରରେ ବାରଣାସୀ କଟକ, ପୁରୀ, ସିଂହାଚଳମ, ଦ୍ରାକ୍ଷାରାମ, କୋଣ୍ଡାଭିଡୁ, ଭେଲିଗାଲାନି ଓ ଉଦୟଗିରି ଚିହ୍ନିତ ହୋଇଛି।',
      bn: 'এপিগ্রাফিয়া ইন্ডিকা (খণ্ড XXIV থেকে XXXV) এবং দক্ষিণ ভারতীয় শিলালিপিতে প্রকাশিত প্রমাণিত শিলালিপি স্থানসমূহের ভিত্তিতে আনুমানিক ১৪৬৫ খ্রিস্টাব্দে সূর্যবংশীয় গজপতি সাম্রাজ্যের বিস্তার প্রদর্শনকারী ঐতিহাসিক মানচিত্র। উত্তরে গঙ্গা অববাহিকা থেকে দক্ষিণে কাবেরী নদী (শ্রীরঙ্গম) পর্যন্ত বিস্তৃত এই মানচিত্রে বারাণসী কটক, পুরী, সিংহাচলম, দ্রাক্ষারাম, কোন্ডাভিডু, ভেলিগালানি ও উদয়গিরি চিহ্নিত করা হয়েছে।'
    }
  },
  gal_kolletikota: {
    locationIds: ['loc_kolleti_sarasu_fort'],
    monumentIds: ['mon_kolletikota_peddintlamma'],
    documentIds: ['doc_sarasvati_vilasa'],
    inscriptionIds: ['insc_veligalani_1458'],
    timelineEventIds: ['ev_kolletikota_gajapathi_garrison', 'ev_1448'],
    articleId: 'art_kolletikota_peddintlamma_lake',
    keywordIds: [
      'kw_kolletikota_peddintlamma',
      'kw_odiyaraju_kshatriya',
      'kw_forts_citadels',
      'kw_temples_monuments',
      'kw_andhra_pradesh',
      'kw_gajapathi_empire',
      'kw_kapilendra_deva',
      'kw_hamvira_deva',
      'kw_suryavamsha'
    ],
    people: {
      en: ['Sri Kolletikota Peddintlamma Thalli (Presiding Warrior-Mother Deity & Kuladevatha)', 'Suryavamsha Odiyaraju Kshatriya Fortress Commanders & Lake Flotilla Warriors', 'Emperor Kapilendra Deva & Kumara Hamvira Deva (15th-Century Coastal Andhra Garrison Patrons)'],
      hi: ['श्री कोल्लेतिकोटा पेद्दिंटलम्मा तल्ली (अधिष्ठात्री वीर-माता एवं कुलदेवता)', 'सूर्यवंशी ओडियाराजू क्षत्रिय दुर्ग सेनापति एवं जल-बेड़ा योद्धा', 'सम्राट कपिलेंद्र देव एवं कुमार हम्मीर देव'],
      te: ['శ్రీ కొల్లేటికోట పెద్దింట్లమ్మ తల్లి (ఇలవేల్పు & జలదుర్గ ఆరాధ్య శక్తి స్వరూపిణి)', 'సూర్యవంశ ఒడియరాజు క్షత్రియ దుర్గ సేనానులు & కొల్లేటి జల యోధులు', 'చక్రవర్తి కపిలేంద్ర దేవుడు & కుమార హంవీర దేవుడు'],
      kn: ['ಶ್ರೀ ಕೊಲ್ಲೇಟಿಕೋಟೆ ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ತಾಯಿ (ಅಧಿಷ್ಠಾತ್ರಿ ವೀರ-ಮಾತೆ ಮತ್ತು ಕುಲದೇವತೆ)', 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಕೋಟೆ ಸೇನಾನಿಗಳು ಮತ್ತು ಜಲದುರ್ಗ ಯೋಧರು', 'ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವ ಮತ್ತು ಕುಮಾರ ಹಂವೀರ ದೇವ'],
      ta: ['ஸ்ரீ கொல்லேட்டிகோட்டை பெத்திண்ட்லம்மா தாய் (குலதெய்வம் மற்றும் நீர் அரண் காவல் தெய்வம்)', 'சூரியவம்ச ஒடியாராஜு சத்திரிய கோட்டைத் தளபதிகள் & படைவீரர்கள்', 'பேரரசர் கபிலேந்திர தேவர் & குமார ஹம்வீர தேவர்'],
      mr: ['श्री कोल्लेतिकोटा पेद्दिंटलम्मा माता (अधिष्ठात्री वीर-माता व कुलदेवता)', 'सूर्यवंशी ओडियाराजू क्षत्रिय दुर्ग सेनापती आणि जलदुर्ग योद्धे', 'सम्राट कपिलेंद्र देव आणि कुमार हम्मीर देव'],
      or: ['ଶ୍ରୀ କୋଲ୍ଲେତିକୋଟା ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ତଲ୍ଲୀ (ଅଧିଷ୍ଠାତ୍ରୀ ବୀର-ମାତା ଓ କୁଳଦେବୀ)', 'ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଜଳଦୁର୍ଗ ସେନାପତି ଓ ଯୋଦ୍ଧା ବାହିନୀ', 'ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ଓ କୁମାର ହମ୍ବୀର ଦେବ'],
      bn: ['শ্রী কোল্লেতিকোটা পেদ্দিন্টলাম্মা তল্লী (অধিষ্ঠাত্রী বীর-মাতা ও কুলদেবী)', 'সূর্যবংশীয় ওড়িয়ারাজু ক্ষত্রিয় জলদুর্গ সেনাপতি ও যোদ্ধা বাহিনী', 'সম্রাট কপিলেন্দ্র দেব ও কুমার হম্বীর দেব']
    },
    places: {
      en: ['Kolletikota Island Water Citadel (Jala Durga), Kolleti Sarasu (Kolleru Lake)', 'Kaikaluru / Eluru & Krishna Districts, Coastal Andhra Pradesh', 'Sri Peddintlamma Thalli & Sri Gokarneshwara Swamy Temple Precinct'],
      hi: ['कोल्लेतिकोटा द्वीप जलदुर्ग (जल दुर्ग), कोल्लेति सरसु (कोल्लेरु झील)', 'कैकलूरु / एलुरु एवं कृष्णा जिले, तटीय आंध्र प्रदेश', 'श्री पेद्दिंटलम्मा तल्ली एवं श्री गोकर्णेश्वर स्वामी मंदिर परिसर'],
      te: ['కొల్లేటికోట ద్వీప జలదుర్గం (జల దుర్గం), కొల్లేటి సరస్సు (కొల్లేరు సరస్సు)', 'కైకలూరు / ఏలూరు & కృష్ణా జిల్లాలు, కోస్తా ఆంధ్రప్రదేశ్', 'శ్రీ పెద్దింట్లమ్మ తల్లి & శ్రీ గోకర్ణేశ్వర స్వామి ఆలయ ప్రాంగణం'],
      kn: ['ಕೊಲ್ಲೇಟಿಕೋಟೆ ದ್ವೀಪ ಜಲದುರ್ಗ, ಕೊಲ್ಲೇಟಿ ಸರಸ್ಸು (ಕೊಲ್ಲೇರು ಸರೋವರ)', 'ಕೈಕಲೂರು / ಏಲೂರು ಮತ್ತು ಕೃಷ್ಣಾ ಜಿಲ್ಲೆಗಳು, ಆಂಧ್ರಪ್ರದೇಶ', 'ಶ್ರೀ ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ತಾಯಿ ಮತ್ತು ಶ್ರೀ ಗೋಕರ್ಣೇಶ್ವರ ಸ್ವಾಮಿ ದೇವಾಲಯ ಆವರಣ'],
      ta: ['கொல்லேட்டிகோட்டை தீவு நீர் அரண் (ஜல துர்க்கம்), கொல்லேறு ஏரி', 'கைகலூரு / ஏலூரு & கிருஷ்ணா மாவட்டங்கள், ஆந்திரப் பிரதேசம்', 'ஸ்ரீ பெத்திண்ட்லம்மா தாய் & ஸ்ரீ கோகர்ணேஸ்வர சுவாமி கோயில் வளாகம்'],
      mr: ['कोल्लेतिकोटा बेट जलदुर्ग, कोल्लेती सरसू (कोल्लेरू सरोवर)', 'कैकलूरू / एलुरू आणि कृष्णा जिल्हे, आंध्र प्रदेश', 'श्री पेद्दिंटलम्मा माता आणि श्री गोकर्णेश्वर स्वामी मंदिर परिसर'],
      or: ['କୋଲ୍ଲେତିକୋଟା ଦ୍ୱୀପ ଜଳଦୁର୍ଗ, କୋଲ୍ଲେତି ସରସୁ (କୋଲ୍ଲେରୁ ହ୍ରଦ)', 'କୈକଲୁରୁ / ଏଲୁରୁ ଓ କୃଷ୍ଣା ଜିଲ୍ଲା, ଉପକୂଳ ଆନ୍ଧ୍ର ପ୍ରଦେଶ', 'ଶ୍ରୀ ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ତଲ୍ଲୀ ଓ ଶ୍ରୀ ଗୋକର୍ଣ୍ଣେଶ୍ୱର ସ୍ୱାମୀ ମନ୍ଦିର ପରିସର'],
      bn: ['কোল্লেতিকোটা দ্বীপ জলদুর্গ, কোল্লেতি সরসু (কোল্লেরু হ্রদ)', 'কৈকলুরু / এলুরু ও কৃষ্ণা জেলা, উপকূলীয় অন্ধ্রপ্রদেশ', 'শ্রী পেদ্দিন্টলাম্মা তল্লী ও শ্রী গোকর্ণেশ্বর স্বামী মন্দির চত্বর']
    },
    dynasties: {
      en: ['Suryavamsha Gajapathi Imperial Garrisons', 'Suryavamsha Odiyaraju Kshatriya Lineage'],
      hi: ['सूर्यवंशी गजपति सैन्य दल', 'सूर्यवंशी ओडियाराजू क्षत्रिय वंश'],
      te: ['సూర్యవంశ గజపతి సామ్రాజ్య సైనిక దళాలు', 'సూర్యవంశ ఒడియరాజు క్షత్రియ వంశం'],
      kn: ['ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸೇನಾ ನೆಲೆ', 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ವಂಶ'],
      ta: ['சூரியவம்ச கஜபதி பேரரசின் படைத்தளம்', 'சூரியவம்ச ஒடியாராஜு சத்திரிய வம்சம்'],
      mr: ['सूर्यवंशी गजपती लष्करी ठाणे', 'सूर्यवंशी ओडियाराजू क्षत्रिय वंश'],
      or: ['ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମରିକ ବାହିନୀ', 'ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ବଂଶ'],
      bn: ['সূর্যবংশীয় গজপতি সামরিক ঘাঁটি', 'সূর্যবংশীয় ওড়িয়ারাজু ক্ষত্রিয় বংশ']
    },
    extendedDescription: {
      en: 'Archival documentation of the island water citadel (Jala Durga) of Kolletikota situated in the heart of Kolleti Sarasu (Kolleru Lake) between the Krishna and Godavari river deltas in Andhra Pradesh. Fortified by Gajapathi naval flotillas and Suryavamsha Odiyaraju Kshatriya garrisons during the 15th-century coastal campaigns to protect supply lines between Rajahmundry, Kondapalli, and Kondavidu, the island sanctuary is presided over by the revered warrior-mother deity Sri Kolletikota Peddintlamma Thalli and Sri Gokarneshwara Swamy.',
      hi: 'आंध्र प्रदेश में कृष्णा और गोदावरी नदी डेल्टा के मध्य विशाल कोल्लेति सरसु (कोल्लेरु झील) के केंद्र में स्थित कोल्लेतिकोटा द्वीप जलदुर्ग (जल दुर्ग) का पुरातात्विक प्रलेखन। 15वीं शताब्दी के तटीय अभियानों के दौरान राजमुंदरी, कोंडापल्ली और कोंडावीडु के बीच सैन्य आपूर्ति मार्गों की रक्षा हेतु गजपति नौसैनिक बेड़ों और सूर्यवंशी ओडियाराजू क्षत्रिय योद्धाओं द्वारा सुदृढ़ किए गए इस द्वीप दुर्ग में आराध्य कुलदेवी माता श्री कोल्लेतिकोटा पेद्दिंटलम्मा तल्ली और श्री गोकर्णेश्वर स्वामी का प्राचीन मंदिर स्थित है।',
      te: 'ఆంధ్రప్రదేశ్‌లోని కృష్ణా మరియు గోదావరి నదీ డెల్టాల మధ్య విస్తరించిన కొల్లేటి సరస్సు (కొల్లేరు) నడుమ వెలసిన చారిత్రక కొల్లేటికోట ద్వీప జలదుర్గం యొక్క పురావస్తు డాక్యుమెంటేషన్. 15వ శతాబ్దపు కోస్తా ఆంధ్ర దండయాత్రలలో రాజమహేంద్రవరం, కొండపల్లి మరియు కొండవీడు మధ్య సైనిక రక్షణ కోసం గజపతి నౌకా దళాలు మరియు సూర్యవంశ ఒడియరాజు క్షత్రియ సేనానులచే పటిష్టం చేయబడిన ఈ జలదుర్గంలో ఆరాధ్య కులదేవత శ్రీ కొల్లేటికోట పెద్దింట్లమ్మ తల్లి మరియు శ్రీ గోకర్ణేశ్వర స్వామి కొలువై ఉన్నారు.',
      kn: 'ಆಂಧ್ರಪ್ರದೇಶದ ಕೃಷ್ಣಾ ಮತ್ತು ಗೋದಾವರಿ ನದಿ ಮುಖಜ ಭೂಮಿಗಳ ನಡುವಿನ ಕೊಲ್ಲೇಟಿ ಸರಸ್ಸು (ಕೊಲ್ಲೇರು ಸರೋವರ) ಮಧ್ಯೆ ನೆಲೆಗೊಂಡಿರುವ ಐತಿಹಾಸಿಕ ಕೊಲ್ಲೇಟಿಕೋಟೆ ದ್ವೀಪ ಜಲದುರ್ಗದ ಪತ್ರಾಗಾರ ದಾಖಲೆ. 15ನೇ ಶತಮಾನದಲ್ಲಿ ಗಜಪತಿ ನೌಕಾಪಡೆ ಮತ್ತು ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಯೋಧರಿಂದ ಬಲಪಡಿಸಲ್ಪಟ್ಟ ಈ ದ್ವೀಪ ಕೋಟೆಯಲ್ಲಿ ಆರಾಧ್ಯ ಕುಲದೇವತೆ ಶ್ರೀ ಕೊಲ್ಲೇಟಿಕೋಟೆ ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ತಾಯಿ ಮತ್ತು ಶ್ರೀ ಗೋಕರ್ಣೇಶ್ವರ ಸ್ವಾಮಿ ನೆಲೆಸಿದ್ದಾರೆ.',
      ta: 'ஆந்திரப் பிரதேசத்தில் கிருஷ்ணா மற்றும் கோதாவரி டெல்டாக்களுக்கு இடையே உள்ள கொல்லேறு ஏரியின் (கொல்லேட்டி சரசு) நடுவே அமைந்துள்ள கொல்லேட்டிகோட்டை தீவு நீர் அரணின் (ஜல துர்க்கம்) ஆவணப் பதிவு. 15ஆம் நூற்றாண்டில் கஜபதி கடற்படை மற்றும் சூரியவம்ச ஒடியாராஜு சத்திரிய வீரர்களால் பாதுகாக்கப்பட்ட இத்தீவுக் கோட்டையில் குலதெய்வம் ஸ்ரீ பெத்திண்ட்லம்மா தாயும் ஸ்ரீ கோகர்ணேஸ்வர சுவாமியும் அருள்பாலிக்கின்றனர்.',
      mr: 'आंध्र प्रदेशातील कृष्णा आणि गोदावरी नद्यांच्या त्रिभुज प्रदेशात कोल्लेती सरसू (कोल्लेरू सरोवर) च्या मध्यभागी वसलेल्या कोल्लेतिकोटा बेट जलदुर्गाचे अभिलेखीय दस्तऐवजीकरण. १५ व्या शतकात गजपती नौदल आणि सूर्यवंशी ओडियाराजू क्षत्रिय योद्ध्यांनी संरक्षित केलेल्या या जलदुर्गात कुलदेवता श्री कोल्लेतिकोटा पेद्दिंटलम्मा माता आणि श्री गोकर्णेश्वर स्वामींचे प्राचीन मंदिर आहे.',
      or: 'ଆନ୍ଧ୍ର ପ୍ରଦେଶର କୃଷ୍ଣା ଓ ଗୋଦାବରୀ ନଦୀ ତ୍ରିକୋଣଭୂମି ମଧ୍ୟସ୍ଥ ବିଶାଳ କୋଲ୍ଲେତି ସରସୁ (କୋଲ୍ଲେରୁ ହ୍ରଦ) ମଧ୍ୟରେ ଅବସ୍ଥିତ ଐତିହାସିକ କୋଲ୍ଲେତିକୋଟା ଦ୍ୱୀପ ଜଳଦୁର୍ଗର ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅଭିଲେଖ। ପଞ୍ଚଦଶ ଶତାବ୍ଦୀରେ ରାଜମହେନ୍ଦ୍ରବରମ, କୋଣ୍ଡାପଲ୍ଲୀ ଓ କୋଣ୍ଡାଭିଡୁ ମଧ୍ୟରେ ସାମରିକ ସୁରକ୍ଷା ପାଇଁ ଗଜପତି ନୌବାହିନୀ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଯୋଦ୍ଧାମାନଙ୍କ ଦ୍ୱାରା ସୁଦୃଢ଼ କରାଯାଇଥିବା ଏହି ଜଳଦୁର୍ଗରେ ଆରାଧ୍ୟା କୁଳଦେବୀ ଶ୍ରୀ ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ତଲ୍ଲୀ ଓ ଶ୍ରୀ ଗୋକର୍ଣ୍ଣେଶ୍ୱର ସ୍ୱାମୀ ବିରାଜମାନ।',
      bn: 'অন্ধ্রপ্রদেশের কৃষ্ণা ও গোদাবরী নদীর বদ্বীপের মধ্যবর্তী বিশাল কোল্লেতি সরসু (কোল্লেরু হ্রদ)-এর কেন্দ্রে অবস্থিত ঐতিহাসিক কোল্লেতিকোটা দ্বীপ জলদুর্গের মহাফেজখানা দলিল। পঞ্চদশ শতাব্দীতে গজপতি নৌবাহিনী এবং সূর্যবংশীয় ওড়িয়ারাজু ক্ষত্রিয় যোদ্ধাদের দ্বারা সুরক্ষিত এই জলদুর্গে আরাধ্যা কুলদেবী শ্রী কোল্লেতিকোটা পেদ্দিন্টলাম্মা তল্লী ও শ্রী গোকর্ণেশ্বর স্বামীর প্রাচীন মন্দির অবস্থিত।'
    }
  }
};

const CATEGORY_LABELS: Record<LanguageCode, Record<string, string>> = {
  en: {
    forts: 'Forts & Citadels',
    temples: 'Temples & Monuments',
    sculptures: 'Sculptures & Iconography',
    manuscripts: 'Palm-Leaf Manuscripts',
    maps: 'Historical Maps',
    kings: 'Royal Portraits',
    archival: 'Archival Records'
  },
  hi: {
    forts: 'दुर्ग एवं किले',
    temples: 'मंदिर एवं स्मारक',
    sculptures: 'मूर्तियां एवं शिल्प',
    manuscripts: 'ताड़पत्र पांडुलिपियां',
    maps: 'ऐतिहासिक मानचित्र',
    kings: 'राजकीय चित्र',
    archival: 'अभिलेखीय रिकॉर्ड'
  },
  te: {
    forts: 'కోటలు & దుర్గాలు',
    temples: 'ఆలయాలు & స్మారకాలు',
    sculptures: 'శిల్పాలు & విగ్రహాలు',
    manuscripts: 'తాళపత్ర గ్రంథాలు',
    maps: 'చారిత్రక పటాలు',
    kings: 'రాజ చిత్రాలు',
    archival: 'పురాతత్వ రికార్డులు'
  },
  kn: {
    forts: 'ಕೋಟೆಗಳು ಮತ್ತು ದುರ್ಗಗಳು',
    temples: 'ದೇವಾಲಯಗಳು ಮತ್ತು ಸ್ಮಾರಕಗಳು',
    sculptures: 'ಶಿಲ್ಪಗಳು',
    manuscripts: 'ತಾಳೆಗರಿ ಹಸ್ತಪ್ರತಿಗಳು',
    maps: 'ಐತಿಹಾಸಿಕ ನಕ್ಷೆಗಳು',
    kings: 'ರಾಜ ಚಿತ್ರಗಳು',
    archival: 'ಪತ್ರಾಗಾರ ದಾಖಲೆಗಳು'
  },
  ta: {
    forts: 'கோட்டைகள் & அரண்கள்',
    temples: 'கோயில்கள் & நினைவுச்சின்னங்கள்',
    sculptures: 'சிற்பங்கள்',
    manuscripts: 'ஓலைச்சுவடிகள்',
    maps: 'வரலாற்று வரைபடங்கள்',
    kings: 'அரச ஓவியங்கள்',
    archival: 'ஆவணப் பதிவுகள்'
  },
  mr: {
    forts: 'किल्ले आणि गड',
    temples: 'मंदिरे आणि स्मारके',
    sculptures: 'शिल्पे',
    manuscripts: 'ताडपत्र हस्तलिखिते',
    maps: 'ऐतिहासिक नकाशे',
    kings: 'राजकीय चित्रे',
    archival: 'अभिलेखीय नोंदी'
  },
  or: {
    forts: 'ଦୁର୍ଗ ଓ ଗଡ଼',
    temples: 'ମନ୍ଦିର ଓ ସ୍ମାରକୀ',
    sculptures: 'ଭାସ୍କର୍ଯ୍ୟ ଓ ଶିଳ୍ପକଳା',
    manuscripts: 'ତାଳପତ୍ର ପୋଥି',
    maps: 'ଐତିହାସିକ ମାନଚିତ୍ର',
    kings: 'ରାଜକୀୟ ଚିତ୍ର',
    archival: 'ଅଭିଲେଖ ରେକର୍ଡ'
  },
  bn: {
    forts: 'দুর্গ ও গড়',
    temples: 'মন্দির ও স্মৃতিস্তম্ভ',
    sculptures: 'ভাস্কর্য ও শিল্পকলা',
    manuscripts: 'তালপাতার পাণ্ডুলিপি',
    maps: 'ঐতিহাসিক মানচিত্র',
    kings: 'রাজকীয় প্রতিকৃতি',
    archival: 'মহাফেজখানা দলিল'
  }
};

export function getEnrichedGalleryArticles(
  lang: LanguageCode = 'en',
  customItems?: GalleryItem[]
): EnrichedGalleryArticle[] {
  const baseItems = customItems && customItems.length > 0 ? customItems : getCanonicalGallery(lang);
  const canonicalLocalized = getCanonicalGallery(lang);
  const locations = getCanonicalLocations(lang);
  const monuments = getCanonicalMonuments(lang);
  const documents = getCanonicalDocuments(lang);
  const inscriptions = getCanonicalInscriptions(lang);
  const timelineEvents = getCanonicalTimelineEvents(lang);
  const articles = getAllArticles(lang);

  return baseItems.map(rawItem => {
    // Ensure localized fields from canonical gallery if rawItem came unlocalized
    const canonicalMatch = canonicalLocalized.find(c => c.id === rawItem.id);
    const item: GalleryItem = canonicalMatch
      ? {
          ...rawItem,
          title: canonicalMatch.title,
          period: canonicalMatch.period,
          location: canonicalMatch.location,
          description: canonicalMatch.description
        }
      : rawItem;

    const cfg = GALLERY_ENRICHMENT_CONFIG[item.id];
    const catLabels = CATEGORY_LABELS[lang] || CATEGORY_LABELS.en;
    const categoryLabel = catLabels[item.category] || item.category;

    if (!cfg) {
      // Fallback for any custom dynamic gallery item
      return {
        item,
        categoryLabel,
        galleryImages: [
          {
            url: item.image_url,
            caption: item.title,
            alt: item.alt_text,
            source: item.source
          }
        ],
        fullDescription: item.description,
        historicalBackground: [item.description],
        archaeologicalAndEpigraphicFindings: [],
        importantDates: [
          {
            dateText: item.period,
            eventTitle: item.title,
            significance: item.description
          }
        ],
        historicalPeople: [],
        historicalPlaces: [item.location],
        dynasties: [KEYWORD_DICTIONARY.kw_suryavamsha[lang]],
        references: [
          {
            title: item.source,
            type: 'Archival Record',
            authorityOrLocation: item.creator_photographer,
            details: item.copyright_license,
            verified: item.verification_status === 'Reviewed' || item.verification_status === 'Published'
          }
        ],
        keywords: makeKeywordTags(['kw_suryavamsha', 'kw_gajapathi_empire'], lang),
        translationComplete: true
      };
    }

    const linkedLocs = cfg.locationIds
      .map(id => locations.find(l => l.id === id))
      .filter((l): l is NonNullable<typeof l> => !!l);
    const linkedMons = cfg.monumentIds
      .map(id => monuments.find(m => m.id === id))
      .filter((m): m is NonNullable<typeof m> => !!m);
    const linkedDocs = cfg.documentIds
      .map(id => documents.find(d => d.id === id))
      .filter((d): d is NonNullable<typeof d> => !!d);
    const linkedInscs = cfg.inscriptionIds
      .map(id => inscriptions.find(i => i.id === id))
      .filter((i): i is NonNullable<typeof i> => !!i);
    const linkedEvents = cfg.timelineEventIds
      .map(id => timelineEvents.find(e => e.id === id))
      .filter((e): e is NonNullable<typeof e> => !!e);
    const linkedArticle = articles.find(a => a.id === cfg.articleId);

    // Build Gallery Images list (primary + unique supplementary images from linked monuments/locations/articles)
    const galleryImages: GalleryImageSlide[] = [
      {
        url: item.image_url,
        caption: `${item.title} (${item.location})`,
        alt: item.alt_text,
        source: item.source
      }
    ];
    const seenUrls = new Set<string>([item.image_url]);

    for (const mon of linkedMons) {
      if (mon.image_url && !seenUrls.has(mon.image_url)) {
        seenUrls.add(mon.image_url);
        galleryImages.push({
          url: mon.image_url,
          caption: `${mon.name} — ${mon.architectural_style}`,
          alt: mon.name,
          source: mon.sources[0] || item.source
        });
      }
    }
    for (const loc of linkedLocs) {
      if (loc.image_url && !seenUrls.has(loc.image_url)) {
        seenUrls.add(loc.image_url);
        galleryImages.push({
          url: loc.image_url,
          caption: `${loc.name} (${loc.modern_district}, ${loc.modern_state})`,
          alt: loc.name,
          source: item.source
        });
      }
    }
    if (linkedArticle?.featured_image && !seenUrls.has(linkedArticle.featured_image)) {
      seenUrls.add(linkedArticle.featured_image);
      galleryImages.push({
        url: linkedArticle.featured_image,
        caption: linkedArticle.original_title,
        alt: linkedArticle.original_title,
        source: linkedArticle.author_name
      });
    }

    // Build Historical Background paragraphs from linked Location, Monument, Document, and Article
    const historicalBackground: string[] = [];
    for (const loc of linkedLocs) {
      if (loc.summary) {
        historicalBackground.push(`${loc.name}: ${loc.summary}`);
      }
    }
    for (const mon of linkedMons) {
      if (mon.historical_significance) {
        historicalBackground.push(`${mon.name} (${mon.century}): ${mon.historical_significance}`);
      }
    }
    for (const doc of linkedDocs) {
      if (doc.research_notes) {
        historicalBackground.push(`${doc.title}: ${doc.research_notes}`);
      }
    }
    if (linkedArticle) {
      if (linkedArticle.summary) {
        historicalBackground.push(linkedArticle.summary);
      }
      if (linkedArticle.original_content) {
        const paragraphs = linkedArticle.original_content
          .split(/\n\s*\n/)
          .map(p => p.trim())
          .filter(Boolean);
        for (const p of paragraphs) {
          if (!historicalBackground.includes(p)) {
            historicalBackground.push(p);
          }
        }
      }
    }

    // Build Archaeological & Epigraphic Findings
    const archaeologicalAndEpigraphicFindings: string[] = [];
    for (const loc of linkedLocs) {
      if (loc.archaeological_findings) {
        archaeologicalAndEpigraphicFindings.push(loc.archaeological_findings);
      }
      if (loc.inscriptions_found && loc.inscriptions_found.length > 0) {
        archaeologicalAndEpigraphicFindings.push(loc.inscriptions_found.join(' • '));
      }
    }
    for (const insc of linkedInscs) {
      archaeologicalAndEpigraphicFindings.push(
        `${insc.name} (${insc.era_or_date}, ${insc.location_found}): ${insc.historical_context}`
      );
    }

    // Primary Transcription & Translation Excerpt
    let transcriptionExcerpt: string | undefined;
    let translationExcerpt: string | undefined;
    if (linkedDocs.length > 0) {
      transcriptionExcerpt = linkedDocs[0].transcription_excerpt;
      translationExcerpt = linkedDocs[0].translation_excerpt;
    } else if (linkedInscs.length > 0) {
      transcriptionExcerpt = linkedInscs[0].transcription_excerpt;
      translationExcerpt = linkedInscs[0].english_translation;
    }

    // Build Important Dates from linked Timeline Events
    const importantDates: GalleryImportantDate[] = linkedEvents.map(ev => ({
      dateText: ev.year_text || ev.period,
      eventTitle: ev.title,
      significance: ev.political_development
    }));

    // Build References from item source + linked monuments/inscriptions/articles
    const references: GalleryReferenceItem[] = [
      {
        title: item.source,
        type: 'Primary Archival Photograph',
        authorityOrLocation: item.creator_photographer,
        details: `${item.copyright_license} • ${item.location}`,
        verified: true
      }
    ];
    for (const insc of linkedInscs) {
      for (const ref of insc.scholarly_references) {
        references.push({
          title: insc.name,
          type: 'Epigraphic Record',
          authorityOrLocation: insc.location_found,
          details: ref,
          verified: true
        });
      }
    }
    for (const mon of linkedMons) {
      for (const src of mon.sources) {
        references.push({
          title: mon.name,
          type: 'Architectural / Monument Dossier',
          authorityOrLocation: `${mon.location}, ${mon.state}`,
          details: src,
          verified: true
        });
      }
    }
    if (linkedArticle?.sources) {
      for (const s of linkedArticle.sources) {
        references.push({
          title: s.title,
          type: s.source_type,
          authorityOrLocation: `${s.author_or_authority} (${s.publication_or_location}, ${s.year_or_era})`,
          details: s.citation_details,
          verified: s.verified
        });
      }
    }

    const fullDescription =
      cfg.extendedDescription[lang] ||
      cfg.extendedDescription.en ||
      item.description;

    return {
      item,
      categoryLabel,
      galleryImages,
      fullDescription,
      historicalBackground,
      archaeologicalAndEpigraphicFindings,
      transcriptionExcerpt,
      translationExcerpt,
      importantDates,
      historicalPeople: cfg.people[lang] || cfg.people.en,
      historicalPlaces: cfg.places[lang] || cfg.places.en,
      dynasties: cfg.dynasties[lang] || cfg.dynasties.en,
      references,
      keywords: makeKeywordTags(cfg.keywordIds, lang),
      linkedArticleTitle: linkedArticle?.original_title,
      linkedArticleAuthor: linkedArticle?.author_name,
      linkedArticleDate: linkedArticle?.publication_date,
      translationComplete: true
    };
  });
}

export function getRelatedGalleryArticles(
  currentItemId: string,
  lang: LanguageCode = 'en',
  allEnriched?: EnrichedGalleryArticle[]
): RelatedGalleryArticleMatch[] {
  const list = allEnriched || getEnrichedGalleryArticles(lang);
  const current = list.find(a => a.item.id === currentItemId);
  if (!current) return [];

  const currentKeywordIds = new Set(current.keywords.map(k => k.id));

  const matches: RelatedGalleryArticleMatch[] = [];
  for (const candidate of list) {
    if (candidate.item.id === currentItemId) continue; // Never include currently open article

    const sharedKeywords = candidate.keywords.filter(k => currentKeywordIds.has(k.id));
    const sharedCategory = candidate.item.category === current.item.category;

    // Score by shared keywords + category + shared places/people
    let relevanceScore = sharedKeywords.length * 3 + (sharedCategory ? 4 : 0);

    if (relevanceScore > 0) {
      matches.push({
        article: candidate,
        sharedKeywords,
        sharedCategory,
        relevanceScore
      });
    }
  }

  return matches.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export function filterGalleryArticlesByKeyword(
  keywordQuery: string,
  lang: LanguageCode = 'en',
  allEnriched?: EnrichedGalleryArticle[]
): EnrichedGalleryArticle[] {
  const list = allEnriched || getEnrichedGalleryArticles(lang);
  const normalized = keywordQuery.trim().toLowerCase();
  if (!normalized) return list;

  return list.filter(enriched => {
    // 1. Check keyword ID or any of the 8-language keyword labels
    const matchesKeywordTag = enriched.keywords.some(kw => {
      if (kw.id.toLowerCase() === normalized) return true;
      if (kw.label.toLowerCase().includes(normalized)) return true;
      return Object.values(kw.allLabels).some(lbl => lbl.toLowerCase().includes(normalized));
    });
    if (matchesKeywordTag) return true;

    // 2. Check category, title, location, people, places, dynasties (case-insensitive)
    if (enriched.item.category.toLowerCase().includes(normalized)) return true;
    if (enriched.categoryLabel.toLowerCase().includes(normalized)) return true;
    if (enriched.item.title.toLowerCase().includes(normalized)) return true;
    if (enriched.item.location.toLowerCase().includes(normalized)) return true;
    if (enriched.historicalPeople.some(p => p.toLowerCase().includes(normalized))) return true;
    if (enriched.historicalPlaces.some(p => p.toLowerCase().includes(normalized))) return true;
    if (enriched.dynasties.some(d => d.toLowerCase().includes(normalized))) return true;

    return false;
  });
}

export function getAllGalleryKeywords(lang: LanguageCode = 'en'): GalleryKeywordTag[] {
  return Object.keys(KEYWORD_DICTIONARY).map(id => ({
    id,
    label: KEYWORD_DICTIONARY[id][lang] || KEYWORD_DICTIONARY[id].en,
    allLabels: KEYWORD_DICTIONARY[id]
  }));
}
