import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Crown,
  MapPin,
  Scroll,
  Search,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Printer,
  Download,
  Share2,
  Home,
  X,
  BookOpen,
  Calendar,
  Award,
  ShieldCheck,
  Sparkles,
  FileText,
  Landmark,
  Users,
  Hash,
  Tag,
  ExternalLink,
  CheckCircle2,
  Clock,
  Compass,
  Filter
} from 'lucide-react';
import { LanguageCode, HistoricalFigure } from '../types';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { PublisherCreditCard } from '../components/PublisherCreditCard';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import {
  downloadArticleAsPdf,
  triggerArticlePrintWithTitle,
  generateArticlePdfFilename,
  PDF_EXPORT_UI_LABELS
} from '../utils/pdfExport';
import { getAllDocumentedFigures, DOCUMENTED_FIGURES_REPO } from '../data/documentedFiguresRepository';
import { HISTORICAL_FIGURES } from '../data/historyContent';
import {
  getCanonicalGenealogy,
  getCanonicalInscriptions,
  getCanonicalDocuments,
  getCanonicalLocations,
  getCanonicalMonuments,
  getCanonicalTimelineEvents
} from '../data/archivalSeedData';
import { getAllArticles } from '../data/articlesRepository';

interface KingsQueensUI {
  badge: string;
  pageTitle: string;
  pageSubtitle: string;
  catAll: string;
  catGajapathi: string;
  catProgenitors: string;
  catSacred: string;
  filterAllEvidence: string;
  filterPrimary: string;
  filterTraditional: string;
  searchPlaceholder: string;
  returnHome: string;
  backToList: string;
  printBtn: string;
  shareBtn: string;
  copyLink: string;
  linkCopied: string;
  closeProfile: string;
  readFullBio: string;
  epistemicBannerTitle: string;
  epistemicVerifiedTitle: string;
  epistemicVerifiedDesc: string;
  epistemicTradTitle: string;
  epistemicTradDesc: string;
  epistemicScholarTitle: string;
  epistemicScholarDesc: string;
  secFamilyPeriod: string;
  secBiographyLegacy: string;
  secEngineeringCivic: string;
  secEpistemicAnalysis: string;
  secChronology: string;
  secInscriptionsEvidence: string;
  secSourcesCitations: string;
  secRelatedPersonalities: string;
  secRelatedKingdomsArticles: string;
  secKeywordsHashtags: string;
  lblReignPeriod: string;
  lblLifeDates: string;
  lblDynastyLineage: string;
  lblCategoryRole: string;
  lblKnownTitles: string;
  lblAlternateNames: string;
  lblFamilyBackground: string;
  lblAssociatedPlaces: string;
  lblHistoricalSignificance: string;
  lblPrevPerson: string;
  lblNextPerson: string;
  noResults: string;
  resetFilters: string;
}

const KINGS_QUEENS_UI: Record<LanguageCode, KingsQueensUI> = {
  en: {
    badge: 'Historical Personages & Sovereign Chronicles',
    pageTitle: 'Monarchs, Emperors & Sacred Guardians',
    pageSubtitle: 'Comprehensive biographical dossiers, epigraphic records, dynastic lineages, and chronological reigns of historical personages across Odra Desha, Kalinga, and the Deccan.',
    catAll: 'All Historical Personages',
    catGajapathi: 'Suryavamsha & Ganga Monarchs',
    catProgenitors: 'Ancient Emperors & Progenitors',
    catSacred: 'Spiritual, Martial & Civic Guardians',
    filterAllEvidence: 'All Evidence Classifications',
    filterPrimary: 'Verified Epigraphic Evidence',
    filterTraditional: 'Traditional & Sacred Lineage',
    searchPlaceholder: 'Search monarchs, titles, dynasties, reigns, or inscriptions...',
    returnHome: 'Home',
    backToList: 'Back to Personalities',
    printBtn: 'Print Biography',
    shareBtn: 'Share',
    copyLink: 'Copy Link',
    linkCopied: 'Link Copied!',
    closeProfile: 'Close',
    readFullBio: 'Read Complete Biography & Epigraphic Dossier',
    epistemicBannerTitle: 'Historiographical & Epistemic Methodology',
    epistemicVerifiedTitle: 'Verified Historical Facts',
    epistemicVerifiedDesc: 'Corroborated by dated copper-plate charters, temple lithic inscriptions, numismatics, and contemporary court chronicles.',
    epistemicTradTitle: 'Traditional & Sacred Accounts',
    epistemicTradDesc: 'Preserved in Puranic genealogies, royal Vamsavalis, Madala Panji temple annals, and venerable community heritage.',
    epistemicScholarTitle: 'Scholarly Interpretations',
    epistemicScholarDesc: 'Analyzed through modern epigraphical editions (Epigraphia Indica, ASI) distinguishing political history from devotional allegory.',
    secFamilyPeriod: 'Birth, Dynastic Lineage, Family Background & Historical Period',
    secBiographyLegacy: 'Complete Historical Biography, Achievements & Sovereign Legacy',
    secEngineeringCivic: 'Architectural, Hydraulic & Cultural Contributions',
    secEpistemicAnalysis: 'Epistemic Classification: Verified Facts, Tradition & Scholarly Analysis',
    secChronology: 'Chronological Biographical & Regnal Timeline',
    secInscriptionsEvidence: 'Corroborating Inscriptions, Charters & Archaeological Monuments',
    secSourcesCitations: 'Primary Source References & Scholarly Citations',
    secRelatedPersonalities: 'Related Historical Personalities & Contemporaries',
    secRelatedKingdomsArticles: 'Related Dynasties, Kingdoms & Historical Articles',
    secKeywordsHashtags: 'Archival Keywords & Research Hashtags',
    lblReignPeriod: 'Reign / Historical Era',
    lblLifeDates: 'Birth / Approximate Life Dates',
    lblDynastyLineage: 'Dynastic House & Lineage',
    lblCategoryRole: 'Historical Classification',
    lblKnownTitles: 'Royal, Imperial & Spiritual Titles (Birudas)',
    lblAlternateNames: 'Alternate Epigraphic & Regional Names',
    lblFamilyBackground: 'Documented Family Background & Genealogical Ties',
    lblAssociatedPlaces: 'Capitals, Fortresses & Associated Historical Centres',
    lblHistoricalSignificance: 'Core Historical Significance & Legacy',
    lblPrevPerson: 'Previous Historical Personality',
    lblNextPerson: 'Next Historical Personality',
    noResults: 'No historical personalities match your current search or filter criteria.',
    resetFilters: 'Reset All Filters'
  },
  hi: {
    badge: 'ऐतिहासिक विभूतियाँ एवं राजवंशीय वृत्तांत',
    pageTitle: 'सम्राट, शासक एवं पवित्र रक्षक',
    pageSubtitle: 'ओड्र देश, कलिंग और दक्कन की ऐतिहासिक विभूतियों के संपूर्ण जीवन-वृत्तांत, शिलालेख प्रमाण, वंशावली और कालानुक्रमिक शासन अभिलेख।',
    catAll: 'सभी ऐतिहासिक विभूतियाँ',
    catGajapathi: 'सूर्यवंश एवं गंग सम्राट',
    catProgenitors: 'प्राचीन सम्राट एवं आदि-पुरुष',
    catSacred: 'आध्यात्मिक, सैन्य एवं नागरिक रक्षक',
    filterAllEvidence: 'सभी साक्ष्य श्रेणियाँ',
    filterPrimary: 'प्रमाणित शिलालेख साक्ष्य',
    filterTraditional: 'पारंपरिक एवं पौराणिक वंशावली',
    searchPlaceholder: 'सम्राट, उपाधियाँ, राजवंश, शासनकाल या शिलालेख खोजें...',
    returnHome: 'मुख्य पृष्ठ',
    backToList: 'सूची पर वापस जाएँ',
    printBtn: 'प्रिंट करें',
    shareBtn: 'साझा करें',
    copyLink: 'लिंक कॉपी करें',
    linkCopied: 'लिंक कॉपी हो गया!',
    closeProfile: 'बंद करें',
    readFullBio: 'संपूर्ण जीवन-वृत्तांत एवं शिलालेख विवरण पढ़ें',
    epistemicBannerTitle: 'ऐतिहासिक एवं साक्ष्य पद्धति',
    epistemicVerifiedTitle: 'प्रमाणित ऐतिहासिक तथ्य',
    epistemicVerifiedDesc: 'तिथियुक्त ताम्रपत्रों, मंदिर शिलालेखों, सिक्कों और समकालीन दरबारी अभिलेखों द्वारा पुष्ट।',
    epistemicTradTitle: 'पारंपरिक एवं पवित्र आख्यान',
    epistemicTradDesc: 'पौराणिक वंशावलियों, राजवंशीय वंशावली, मादला पंजी और सामुदायिक विरासत में संरक्षित।',
    epistemicScholarTitle: 'विद्वानों की व्याख्याएँ',
    epistemicScholarDesc: 'आधुनिक पुरालेख संस्करणों (एपिग्राफिया इंडिका, एएसआई) के माध्यम से विश्लेषित।',
    secFamilyPeriod: 'जन्म, राजवंश, पारिवारिक पृष्ठभूमि एवं ऐतिहासिक काल',
    secBiographyLegacy: 'संपूर्ण ऐतिहासिक जीवनी, उपलब्धियाँ एवं विरासत',
    secEngineeringCivic: 'वास्तुकला, जल-अभियांत्रिकी एवं सांस्कृतिक योगदान',
    secEpistemicAnalysis: 'साक्ष्य वर्गीकरण: प्रमाणित तथ्य, परंपरा एवं विद्वत विश्लेषण',
    secChronology: 'कालानुक्रमिक जीवन एवं शासन घटनाक्रम',
    secInscriptionsEvidence: 'पुष्टिकारक शिलालेख, ताम्रपत्र एवं पुरातात्विक स्मारक',
    secSourcesCitations: 'प्राथमिक स्रोत संदर्भ एवं विद्वत उद्धरण',
    secRelatedPersonalities: 'संबंधित ऐतिहासिक विभूतियाँ',
    secRelatedKingdomsArticles: 'संबंधित राजवंश, साम्राज्य एवं ऐतिहासिक लेख',
    secKeywordsHashtags: 'संबंधित कीवर्ड एवं हैशटैग',
    lblReignPeriod: 'शासनकाल / ऐतिहासिक युग',
    lblLifeDates: 'जन्म / अनुमानित जीवनकाल',
    lblDynastyLineage: 'राजवंश एवं वंश-परंपरा',
    lblCategoryRole: 'ऐतिहासिक श्रेणी',
    lblKnownTitles: 'राजकीय, साम्राज्यिक एवं आध्यात्मिक उपाधियाँ',
    lblAlternateNames: 'वैकल्पिक एवं क्षेत्रीय नाम',
    lblFamilyBackground: 'पारिवारिक पृष्ठभूमि एवं वंशावली संबंध',
    lblAssociatedPlaces: 'राजधानियाँ, दुर्ग एवं संबद्ध ऐतिहासिक केंद्र',
    lblHistoricalSignificance: 'प्रमुख ऐतिहासिक महत्व एवं विरासत',
    lblPrevPerson: 'पिछली ऐतिहासिक विभूति',
    lblNextPerson: 'अगली ऐतिहासिक विभूति',
    noResults: 'आपकी खोज से मेल खाती कोई ऐतिहासिक विभूति नहीं मिली।',
    resetFilters: 'फ़िल्टर रीसेट करें'
  },
  te: {
    badge: 'చారిత్రక వ్యక్తులు & రాజవంశ చరిత్రలు',
    pageTitle: 'చక్రవర్తులు, రాజులు & పవిత్ర రక్షకులు',
    pageSubtitle: 'ఓడ్ర దేశం, కళింగ మరియు దక్కన్ ప్రాంతాల చారిత్రక వ్యక్తుల పూర్తి జీవిత చరిత్రలు, శాసన ఆధారాలు, వంశావళి మరియు కాలక్రమ పాలనా వివరాలు.',
    catAll: 'అన్ని చారిత్రక వ్యక్తులు',
    catGajapathi: 'సూర్యవంశ & గంగ చక్రవర్తులు',
    catProgenitors: 'ప్రాచీన చక్రవర్తులు & ఆది పురుషులు',
    catSacred: 'ఆధ్యాత్మిక, సైనిక & పౌర రక్షకులు',
    filterAllEvidence: 'అన్ని ఆధార వర్గాలు',
    filterPrimary: 'ధృవీకరించబడిన శాసన ఆధారాలు',
    filterTraditional: 'సాంప్రదాయ & పురాణ వంశావళి',
    searchPlaceholder: 'చక్రవర్తులు, బిరుదులు, రాజవంశాలు, పాలనా కాలం వెతకండి...',
    returnHome: 'హోమ్',
    backToList: 'జాబితాకు తిరిగి వెళ్ళండి',
    printBtn: 'ప్రింట్',
    shareBtn: 'షేర్',
    copyLink: 'లింక్ కాపీ చేయండి',
    linkCopied: 'లింక్ కాపీ చేయబడింది!',
    closeProfile: 'మూసివేయండి',
    readFullBio: 'పూర్తి జీవిత చరిత్ర & శాసన వివరాలు చదవండి',
    epistemicBannerTitle: 'చారిత్రక ఆధారాల వర్గీకరణ విధానం',
    epistemicVerifiedTitle: 'ధృవీకరించబడిన చారిత్రక వాస్తవాలు',
    epistemicVerifiedDesc: 'తామ్రపత్ర శాసనాలు, దేవాలయ శిలాశాసనాలు మరియు సమకాలీన ఆధారాలతో నిర్ధారించబడినవి.',
    epistemicTradTitle: 'సాంప్రదాయ & పవిత్ర కథనాలు',
    epistemicTradDesc: 'పురాణ వంశావళులు, మాదలా పంజీ మరియు తరతరాల సామాజిక వారసత్వంలో భద్రపరచబడినవి.',
    epistemicScholarTitle: 'చరిత్రకారుల విశ్లేషణలు',
    epistemicScholarDesc: 'ఆధునిక పురావస్తు పరిశోధనలు (Epigraphia Indica, ASI) ఆధారంగా విశ్లేషించబడినవి.',
    secFamilyPeriod: 'జననం, రాజవంశం, కుటుంబ నేపథ్యం & చారిత్రక కాలం',
    secBiographyLegacy: 'పూర్తి చారిత్రక జీవిత చరిత్ర, విజయాలు & వారసత్వం',
    secEngineeringCivic: 'నిర్మాణ, జలవనరుల & సాంస్కృతిక సేవలు',
    secEpistemicAnalysis: 'ఆధారాల విశ్లేషణ: చారిత్రక వాస్తవాలు, సంప్రదాయం & పరిశోధన',
    secChronology: 'కాలక్రమ జీవిత & పాలనా సంఘటనలు',
    secInscriptionsEvidence: 'శాసనాలు, తామ్రపత్రాలు & పురావస్తు ఆధారాలు',
    secSourcesCitations: 'మూల ఆధారాలు & పరిశోధనా సూచనలు',
    secRelatedPersonalities: 'సంబంధిత చారిత్రక వ్యక్తులు',
    secRelatedKingdomsArticles: 'సంబంధిత రాజవంశాలు, రాజ్యాలు & చారిత్రక వ్యాసాలు',
    secKeywordsHashtags: 'సంబంధిత కీవర్డ్‌లు & హ్యాష్‌ట్యాగ్‌లు',
    lblReignPeriod: 'పాలనా కాలం / చారిత్రక యుగం',
    lblLifeDates: 'జననం / సుమారు జీవిత కాలం',
    lblDynastyLineage: 'రాజవంశం & వంశ పరంపర',
    lblCategoryRole: 'చారిత్రక వర్గీకరణ',
    lblKnownTitles: 'రాజ, సామ్రాజ్య & ఆధ్యాత్మిక బిరుదులు',
    lblAlternateNames: 'ఇతర శాసన & ప్రాంతీయ పేర్లు',
    lblFamilyBackground: 'కుటుంబ నేపథ్యం & వంశావళి సంబంధాలు',
    lblAssociatedPlaces: 'రాజధానులు, కోటలు & సంబంధిత చారిత్రక కేంద్రాలు',
    lblHistoricalSignificance: 'ప్రధాన చారిత్రక ప్రాముఖ్యత & వారసత్వం',
    lblPrevPerson: 'మునుపటి చారిత్రక వ్యక్తి',
    lblNextPerson: 'తదుపరి చారిత్రక వ్యక్తి',
    noResults: 'మీ శోధనకు సరిపోయే చారిత్రక వ్యక్తులు కనుగొనబడలేదు.',
    resetFilters: 'ఫిల్టర్లను రీసెట్ చేయండి'
  },
  kn: {
    badge: 'ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ರಾಜವಂಶದ ವೃತ್ತಾಂತಗಳು',
    pageTitle: 'ಸಾಮ್ರಾಟರು, ಅರಸರು ಮತ್ತು ಪವಿತ್ರ ರಕ್ಷಕರು',
    pageSubtitle: 'ಓಡ್ರ ದೇಶ, ಕಳಿಂಗ ಮತ್ತು ದಕ್ಕನ್‌ನ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳ ಸಂಪೂರ್ಣ ಜೀವನ ಚರಿತ್ರೆ, ಶಾಸನ ದಾಖಲೆಗಳು, ವಂಶಾವಳಿ ಮತ್ತು ಕಾಲಾನುಕ್ರಮದ ಆಳ್ವಿಕೆಯ ವಿವರಗಳು.',
    catAll: 'ಎಲ್ಲಾ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು',
    catGajapathi: 'ಸೂರ್ಯವಂಶ ಮತ್ತು ಗಂಗ ಸಾಮ್ರಾಟರು',
    catProgenitors: 'ಪ್ರಾಚೀನ ಸಾಮ್ರಾಟರು ಮತ್ತು ಆದಿಪುರುಷರು',
    catSacred: 'ಆಧ್ಯಾತ್ಮಿಕ, ಸೈನಿಕ ಮತ್ತು ನಾಗರಿಕ ರಕ್ಷಕರು',
    filterAllEvidence: 'ಎಲ್ಲಾ ಸಾಕ್ಷ್ಯ ವರ್ಗಗಳು',
    filterPrimary: 'ದೃಢೀಕೃತ ಶಾಸನ ಸಾಕ್ಷ್ಯ',
    filterTraditional: 'ಸಾಂಪ್ರದಾಯಿಕ ಮತ್ತು ಪೌರಾಣಿಕ ವಂಶಾವಳಿ',
    searchPlaceholder: 'ಸಾಮ್ರಾಟರು, ಬಿರುದುಗಳು, ರಾಜವಂಶ, ಆಳ್ವಿಕೆ ಹುಡುಕಿ...',
    returnHome: 'ಮುಖಪುಟ',
    backToList: 'ಪಟ್ಟಿಗೆ ಹಿಂತಿರುಗಿ',
    printBtn: 'ಮುದ್ರಿಸಿ',
    shareBtn: 'ಹಂಚಿಕೊಳ್ಳಿ',
    copyLink: 'ಲಿಂಕ್ ನಕಲಿಸಿ',
    linkCopied: 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!',
    closeProfile: 'ಮುಚ್ಚಿ',
    readFullBio: 'ಸಂಪೂರ್ಣ ಜೀವನ ಚರಿತ್ರೆ ಮತ್ತು ಶಾಸನ ವಿವರಗಳನ್ನು ಓದಿ',
    epistemicBannerTitle: 'ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯ ವರ್ಗೀಕರಣ ವಿಧಾನ',
    epistemicVerifiedTitle: 'ದೃಢೀಕೃತ ಐತಿಹಾಸಿಕ ಸತ್ಯಗಳು',
    epistemicVerifiedDesc: 'ತಾಮ್ರಪತ್ರಗಳು, ದೇವಾಲಯದ ಶಾಸನಗಳು ಮತ್ತು ಸಮಕಾಲೀನ ದಾಖಲೆಗಳಿಂದ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ.',
    epistemicTradTitle: 'ಸಾಂಪ್ರದಾಯಿಕ ಮತ್ತು ಪವಿತ್ರ ಖಾತೆಗಳು',
    epistemicTradDesc: 'ಪುರಾಣ ವಂಶಾವಳಿಗಳು, ಮಾದಲಾ ಪಂಜಿ ಮತ್ತು ಸಮುದಾಯ ಪರಂಪರೆಯಲ್ಲಿ ಸಂರಕ್ಷಿಸಲಾಗಿದೆ.',
    epistemicScholarTitle: 'ವಿದ್ವಾಂಸರ ವಿಶ್ಲೇಷಣೆಗಳು',
    epistemicScholarDesc: 'ಆಧುನಿಕ ಶಾಸನ ಸಂಶೋಧನೆಗಳ (Epigraphia Indica, ASI) ಮೂಲಕ ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ.',
    secFamilyPeriod: 'ಜನನ, ರಾಜವಂಶ, ಕುಟುಂಬದ ಹಿನ್ನೆಲೆ ಮತ್ತು ಐತಿಹಾಸಿಕ ಕಾಲ',
    secBiographyLegacy: 'ಸಂಪೂರ್ಣ ಐತಿಹಾಸಿಕ ಜೀವನ ಚರಿತ್ರೆ, ಸಾಧನೆಗಳು ಮತ್ತು ಪರಂಪರೆ',
    secEngineeringCivic: 'ವಾಸ್ತುಶಿಲ್ಪ, ಜಲ-ಎಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಕೊಡುಗೆಗಳು',
    secEpistemicAnalysis: 'ಸಾಕ್ಷ್ಯ ವಿಶ್ಲೇಷಣೆ: ಐತಿಹಾಸಿಕ ಸತ್ಯಗಳು, ಸಂಪ್ರದಾಯ ಮತ್ತು ಸಂಶೋಧನೆ',
    secChronology: 'ಕಾಲಾನುಕ್ರಮದ ಜೀವನ ಮತ್ತು ಆಳ್ವಿಕೆಯ ಘಟನೆಗಳು',
    secInscriptionsEvidence: 'ಶಾಸನಗಳು, ತಾಮ್ರಪತ್ರಗಳು ಮತ್ತು ಪುರಾತತ್ವ ಸ್ಮಾರಕಗಳು',
    secSourcesCitations: 'ಮೂಲ ಆಧಾರಗಳು ಮತ್ತು ಉಲ್ಲೇಖಗಳು',
    secRelatedPersonalities: 'ಸಂಬಂಧಿತ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು',
    secRelatedKingdomsArticles: 'ಸಂಬಂಧಿತ ರಾಜವಂಶಗಳು, ಸಾಮ್ರಾಜ್ಯಗಳು ಮತ್ತು ಲೇಖನಗಳು',
    secKeywordsHashtags: 'ಸಂಬಂಧಿತ ಕೀವರ್ಡ್‌ಗಳು ಮತ್ತು ಹ್ಯಾಶ್‌ಟ್ಯಾಗ್‌ಗಳು',
    lblReignPeriod: 'ಆಳ್ವಿಕೆಯ ಕಾಲ / ಐತಿಹಾಸಿಕ ಯುಗ',
    lblLifeDates: 'ಜನನ / ಅಂದಾಜು ಜೀವಿತಾವಧಿ',
    lblDynastyLineage: 'ರಾಜವಂಶ ಮತ್ತು ಪರಂಪರೆ',
    lblCategoryRole: 'ಐತಿಹಾಸಿಕ ವರ್ಗೀಕರಣ',
    lblKnownTitles: 'ರಾಜಕೀಯ, ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ಆध्यात्मिक ಬಿರುದುಗಳು',
    lblAlternateNames: 'ಪರ್ಯಾಯ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಹೆಸರುಗಳು',
    lblFamilyBackground: 'ಕುಟುಂಬದ ಹಿನ್ನೆಲೆ ಮತ್ತು ವಂಶಾವಳಿ ಸಂಬಂಧಗಳು',
    lblAssociatedPlaces: 'ರಾಜಧಾನಿಗಳು, ಕೋಟೆಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಕೇಂದ್ರಗಳು',
    lblHistoricalSignificance: 'ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಮಹತ್ವ ಮತ್ತು ಪರಂಪರೆ',
    lblPrevPerson: 'ಹಿಂದಿನ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿ',
    lblNextPerson: 'ಮುಂದಿನ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿ',
    noResults: 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    resetFilters: 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ'
  },
  ta: {
    badge: 'வரலாற்று ஆளுமைகள் & அரச வம்ச வரலாறுகள்',
    pageTitle: 'பேரரசர்கள், மன்னர்கள் & புனிதப் பாதுகாவலர்கள்',
    pageSubtitle: 'ஒட்ர தேசம், கலிங்கம் மற்றும் தக்காணத்தின் வரலாற்று ஆளுமைகளின் முழு வாழ்க்கை வரலாறு, கல்வெட்டுச் சான்றுகள், வம்சாவளி மற்றும் காலவரிசை ஆட்சிப் பதிவுகள்.',
    catAll: 'அனைத்து வரலாற்று ஆளுமைகள்',
    catGajapathi: 'சூர்யவம்ச & கங்க பேரரசர்கள்',
    catProgenitors: 'பண்டைய பேரரசர்கள் & முன்னோடிகள்',
    catSacred: 'ஆன்மீக, ராணுவ & குடிமைப் பாதுகாவலர்கள்',
    filterAllEvidence: 'அனைத்து சான்று வகைகள்',
    filterPrimary: 'உறுதிப்படுத்தப்பட்ட கல்வெட்டுச் சான்று',
    filterTraditional: 'பாரம்பரிய & புராண வம்சாவளி',
    searchPlaceholder: 'மன்னர்கள், பட்டங்கள், வம்சங்கள், ஆட்சிக்காலம் தேடுக...',
    returnHome: 'முகப்பு',
    backToList: 'பட்டியலுக்குத் திரும்பு',
    printBtn: 'அச்சிடு',
    shareBtn: 'பகிர்',
    copyLink: 'இணைப்பை நகலெடு',
    linkCopied: 'இணைப்பு நகலெடுக்கப்பட்டது!',
    closeProfile: 'மூடு',
    readFullBio: 'முழு வாழ்க்கை வரலாறு & கல்வெட்டு ஆவணங்களைப் படிக்கவும்',
    epistemicBannerTitle: 'வரலாற்றுச் சான்று வகைப்பாடு முறை',
    epistemicVerifiedTitle: 'உறுதிப்படுத்தப்பட்ட வரலாற்று உண்மைகள்',
    epistemicVerifiedDesc: 'செப்பேடுகள், கோயில் கல்வெட்டுகள் மற்றும் சமகால ஆவணங்களால் உறுதிப்படுத்தப்பட்டவை.',
    epistemicTradTitle: 'பாரம்பரிய & புனித வரலாறுகள்',
    epistemicTradDesc: 'புராண வம்சாவளிகள், மாதளா பஞ்சி மற்றும் சமூக மரபில் பாதுகாக்கப்பட்டவை.',
    epistemicScholarTitle: 'அறிஞர்களின் ஆய்வுகள்',
    epistemicScholarDesc: 'நவீன கல்வெட்டு ஆய்வுகள் (Epigraphia Indica, ASI) மூலம் பகுப்பாய்வு செய்யப்பட்டவை.',
    secFamilyPeriod: 'பிறப்பு, அரச வம்சம், குடும்பப் பின்னணி & வரலாற்றுக் காலம்',
    secBiographyLegacy: 'முழு வாழ்க்கை வரலாறு, சாதனைகள் & மரபு',
    secEngineeringCivic: 'கட்டிடக்கலை, நீர்ப்பாசன & கலாச்சாரப் பங்களிப்புகள்',
    secEpistemicAnalysis: 'சான்று பகுப்பாய்வு: வரலாற்று உண்மைகள், மரபு & ஆய்வு',
    secChronology: 'காலவரிசை வாழ்க்கை & ஆட்சி நிகழ்வுகள்',
    secInscriptionsEvidence: 'கல்வெட்டுகள், செப்பேடுகள் & தொல்லியல் சான்றுகள்',
    secSourcesCitations: 'முதன்மை ஆதாரங்கள் & மேற்கோள்கள்',
    secRelatedPersonalities: 'தொடர்புடைய வரலாற்று ஆளுமைகள்',
    secRelatedKingdomsArticles: 'தொடர்புடைய அரச வம்சங்கள், பேரரசுகள் & கட்டுரைகள்',
    secKeywordsHashtags: 'தொடர்புடைய முக்கிய வார்த்தைகள் & ஹேஷ்டேக்குகள்',
    lblReignPeriod: 'ஆட்சிக்காலம் / வரலாற்று யுகம்',
    lblLifeDates: 'பிறப்பு / தோராயமான வாழ்நாள்',
    lblDynastyLineage: 'அரச வம்சம் & மரபு',
    lblCategoryRole: 'வரலாற்று வகைப்பாடு',
    lblKnownTitles: 'அரச, பேரரச & ஆன்மீகப் பட்டங்கள் (பிருதுகள்)',
    lblAlternateNames: 'மாற்று கல்வெட்டு & பிராந்தியப் பெயர்கள்',
    lblFamilyBackground: 'குடும்பப் பின்னணி & வம்சாவளி உறவுகள்',
    lblAssociatedPlaces: 'தலைநகரங்கள், கோட்டைகள் & தொடர்புடைய வரலாற்று மையங்கள்',
    lblHistoricalSignificance: 'முக்கிய வரலாற்றுச் சிறப்பு & மரபு',
    lblPrevPerson: 'முந்தைய வரலாற்று ஆளுமை',
    lblNextPerson: 'அடுத்த வரலாற்று ஆளுமை',
    noResults: 'உங்கள் தேடலுக்குப் பொருந்தும் வரலாற்று ஆளுமைகள் எதுவும் கிடைக்கவில்லை.',
    resetFilters: 'வடிகட்டிகளை மீட்டமை'
  },
  mr: {
    badge: 'ऐतिहासिक विभूती आणि राजवंश वृत्तांत',
    pageTitle: 'सम्राट, राजे आणि पवित्र रक्षक',
    pageSubtitle: 'ओड्र देश, कलिंग आणि दख्खनमधील ऐतिहासिक विभूतींचे संपूर्ण चरित्र, शिलालेख पुरावे, वंशावळ आणि कालानुक्रमिक शासन नोंदी.',
    catAll: 'सर्व ऐतिहासिक विभूती',
    catGajapathi: 'सूर्यवंश आणि गंग सम्राट',
    catProgenitors: 'प्राचीन सम्राट आणि पूर्वज',
    catSacred: 'आध्यात्मिक, लष्करी आणि नागरी रक्षक',
    filterAllEvidence: 'सर्व पुरावा प्रकार',
    filterPrimary: 'प्रमाणित शिलालेख पुरावा',
    filterTraditional: 'पारंपारिक आणि पौराणिक वंशावळ',
    searchPlaceholder: 'सम्राट, पदव्या, राजवंश, शासनकाळ शोधा...',
    returnHome: 'मुख्य पृष्ठ',
    backToList: 'यादीकडे परत जा',
    printBtn: 'प्रिंट करा',
    shareBtn: 'शेअर करा',
    copyLink: 'लिंक कॉपी करा',
    linkCopied: 'लिंक कॉपी झाली!',
    closeProfile: 'बंद करा',
    readFullBio: 'संपूर्ण चरित्र आणि शिलालेख माहिती वाचा',
    epistemicBannerTitle: 'ऐतिहासिक पुरावा वर्गीकरण पद्धती',
    epistemicVerifiedTitle: 'प्रमाणित ऐतिहासिक तथ्ये',
    epistemicVerifiedDesc: 'ताम्रपट, मंदिर शिलालेख आणि समकालीन नोंदींद्वारे पुष्टी केलेले.',
    epistemicTradTitle: 'पारंपारिक आणि पवित्र आख्यायिका',
    epistemicTradDesc: 'पौराणिक वंशावळी, मादला पंजी आणि सामुदायिक वारशात जतन केलेले.',
    epistemicScholarTitle: 'विद्वानांचे विश्लेषण',
    epistemicScholarDesc: 'आधुनिक शिलालेख संशोधनाद्वारे (Epigraphia Indica, ASI) विश्लेषित.',
    secFamilyPeriod: 'जन्म, राजवंश, कौटुंबिक पार्श्वभूमी आणि ऐतिहासिक काळ',
    secBiographyLegacy: 'संपूर्ण ऐतिहासिक चरित्र, कार्ये आणि वारसा',
    secEngineeringCivic: 'स्थापत्य, जल-अभियांत्रिकी आणि सांस्कृतिक योगदान',
    secEpistemicAnalysis: 'पुरावा वर्गीकरण: प्रमाणित तथ्ये, परंपरा आणि संशोधन',
    secChronology: 'कालानुक्रमिक जीवन आणि शासन घटनाक्रम',
    secInscriptionsEvidence: 'शिलालेख, ताम्रपट आणि पुरातत्त्वीय स्मारके',
    secSourcesCitations: 'प्राथमिक स्रोत संदर्भ आणि उद्धरणे',
    secRelatedPersonalities: 'संबंधित ऐतिहासिक विभूती',
    secRelatedKingdomsArticles: 'संबंधित राजवंश, साम्राज्ये आणि ऐतिहासिक लेख',
    secKeywordsHashtags: 'संबंधित कीवर्ड आणि हॅशटॅग',
    lblReignPeriod: 'शासनकाळ / ऐतिहासिक युग',
    lblLifeDates: 'जन्म / अंदाजे जीवनकाळ',
    lblDynastyLineage: 'राजवंश आणि वंशपरंपरा',
    lblCategoryRole: 'ऐतिहासिक वर्गीकरण',
    lblKnownTitles: 'राजकीय, साम्राज्यिक आणि आध्यात्मिक पदव्या',
    lblAlternateNames: 'पर्यायी आणि प्रादेशिक नावे',
    lblFamilyBackground: 'कौटुंबिक पार्श्वभूमी आणि वंशावळ संबंध',
    lblAssociatedPlaces: 'राजधान्या, किल्ले आणि संबंधित ऐतिहासिक केंद्रे',
    lblHistoricalSignificance: 'प्रमुख ऐतिहासिक महत्त्व आणि वारसा',
    lblPrevPerson: 'मागील ऐतिहासिक विभूती',
    lblNextPerson: 'पुढील ऐतिहासिक विभूती',
    noResults: 'तुमच्या शोधाशी जुळणारी कोणतीही ऐतिहासिक विभूती आढळली नाही.',
    resetFilters: 'फिल्टर रीसेट करा'
  },
  or: {
    badge: 'ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ ଓ ରାଜବଂଶ ଇତିହାସ',
    pageTitle: 'ସମ୍ରାଟ, ରାଜା ଓ ପବିତ୍ର ରକ୍ଷକ',
    pageSubtitle: 'ଓଡ଼୍ର ଦେଶ, କଳିଙ୍ଗ ଏବଂ ଦାକ୍ଷିଣାତ୍ୟର ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱମାନଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ ଜୀବନୀ, ଶିଳାଲେଖ ପ୍ରମାଣ, ବଂଶାବଳୀ ଓ କାଳାନୁକ୍ରମିକ ଶାସନ ବିବରଣୀ।',
    catAll: 'ସମସ୍ତ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ',
    catGajapathi: 'ସୂର୍ଯ୍ୟବଂଶୀ ଓ ଗଙ୍ଗ ସମ୍ରାଟ',
    catProgenitors: 'ପ୍ରାଚୀନ ସମ୍ରାଟ ଓ ଆଦିପୁରୁଷ',
    catSacred: 'ଆଧ୍ୟାତ୍ମିକ, ସାମରିକ ଓ ନାଗରିକ ରକ୍ଷକ',
    filterAllEvidence: 'ସମସ୍ତ ପ୍ରମାଣ ଶ୍ରେଣୀ',
    filterPrimary: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ ସାକ୍ଷ୍ୟ',
    filterTraditional: 'ପାରମ୍ପରିକ ଓ ପୌରାଣିକ ବଂଶାବଳୀ',
    searchPlaceholder: 'ସମ୍ରାଟ, ଉପାଧି, ରାଜବଂଶ, ଶାସନକାଳ ଖୋଜନ୍ତୁ...',
    returnHome: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
    backToList: 'ତାଲିକାକୁ ଫେରନ୍ତୁ',
    printBtn: 'ପ୍ରିଣ୍ଟ କରନ୍ତୁ',
    shareBtn: 'ସେୟାର କରନ୍ତୁ',
    copyLink: 'ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
    linkCopied: 'ଲିଙ୍କ୍ କପି ହେଲା!',
    closeProfile: 'ବନ୍ଦ କରନ୍ତୁ',
    readFullBio: 'ସମ୍ପୂର୍ଣ୍ଣ ଜୀବନୀ ଓ ଶିଳାଲେଖ ବିବରଣୀ ପଢ଼ନ୍ତୁ',
    epistemicBannerTitle: 'ଐତିହାସିକ ପ୍ରମାଣ ବର୍ଗୀକରଣ ପଦ୍ଧତି',
    epistemicVerifiedTitle: 'ପ୍ରମାଣିତ ଐତିହାସିକ ତଥ୍ୟ',
    epistemicVerifiedDesc: 'ତାମ୍ରପଟା, ମନ୍ଦିର ଶିଳାଲେଖ ଓ ସମসামୟିକ ଅଭିଲେଖ ଦ୍ୱାରା ପ୍ରମାଣିତ।',
    epistemicTradTitle: 'ପାରମ୍ପରିକ ଓ ପବିତ୍ର ବିବରଣୀ',
    epistemicTradDesc: 'ପୌରାଣିକ ବଂଶାବଳୀ, ମାଦଳା ପାଞ୍ଜି ଓ ସାମୁଦାୟିକ ଐତିହ୍ୟରେ ସଂରକ୍ଷିତ।',
    epistemicScholarTitle: 'ଐତିହାସିକ ଗବେଷଣା ଓ ବିଶ୍ଳେଷଣ',
    epistemicScholarDesc: 'ଆଧୁନିକ ଶିଳାଲେଖ ଗବେଷଣା (Epigraphia Indica, ASI) ମାଧ୍ୟମରେ ବିଶ୍ଳେଷିତ।',
    secFamilyPeriod: 'ଜନ୍ମ, ରାଜବଂଶ, ପାରିବାରିକ ପୃଷ୍ଠଭୂମି ଓ ଐତିହାସିକ କାଳ',
    secBiographyLegacy: 'ସମ୍ପୂର୍ଣ୍ଣ ଐତିହାସିକ ଜୀବନୀ, କୃତିତ୍ୱ ଓ ଐତିହ୍ୟ',
    secEngineeringCivic: 'ସ୍ଥାପତ୍ୟ, ଜଳସେଚନ ଓ ସାଂସ୍କୃତିକ ଅବଦାନ',
    secEpistemicAnalysis: 'ପ୍ରମାଣ ବିଶ୍ଳେଷଣ: ଐତିହାସିକ ତଥ୍ୟ, ପରମ୍ପରା ଓ ଗବେଷଣା',
    secChronology: 'କାଳାନୁକ୍ରମିକ ଜୀବନ ଓ ଶାସନ ଘଟଣାବଳୀ',
    secInscriptionsEvidence: 'ଶିଳାଲେଖ, ତାମ୍ରପଟା ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସ୍ମାରକୀ',
    secSourcesCitations: 'ମୌଳିକ ଆଧାର ଗ୍ରନ୍ଥ ଓ ସନ୍ଦର୍ଭ',
    secRelatedPersonalities: 'ସମ୍ପୃକ୍ତ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ',
    secRelatedKingdomsArticles: 'ସମ୍ପୃକ୍ତ ରାଜବଂଶ, ସାମ୍ରାଜ୍ୟ ଓ ଐତିହାସିକ ପ୍ରବନ୍ଧ',
    secKeywordsHashtags: 'ସମ୍ପୃକ୍ତ କିୱାର୍ଡ ଓ ହ୍ୟାଶଟ୍ୟାଗ୍',
    lblReignPeriod: 'ଶାସନକାଳ / ଐତିହାସିକ ଯୁଗ',
    lblLifeDates: 'ଜନ୍ମ / ଆନୁମାନିକ ଜୀବନକାଳ',
    lblDynastyLineage: 'ରାଜବଂଶ ଓ ବଂଶ ପରମ୍ପରା',
    lblCategoryRole: 'ଐତିହାସିକ ବର୍ଗୀକରଣ',
    lblKnownTitles: 'ରାଜକୀୟ, ସାମ୍ରାଜ୍ୟ ଓ ଆଧ୍ୟାତ୍ମିକ ଉପାଧି',
    lblAlternateNames: 'ବିକଳ୍ପ ଓ ଆଞ୍ଚଳିକ ନାମ',
    lblFamilyBackground: 'ପାରିବାରିକ ପୃଷ୍ଠଭୂମି ଓ ବଂଶାବଳୀ ସମ୍ପର୍କ',
    lblAssociatedPlaces: 'ରାଜଧାନୀ, ଦୁର୍ଗ ଓ ସମ୍ପୃକ୍ତ ଐତିହାସିକ କେନ୍ଦ୍ର',
    lblHistoricalSignificance: 'ମୁଖ୍ୟ ଐତିହାସିକ ଗୁରୁତ୍ୱ ଓ ଐତିହ୍ୟ',
    lblPrevPerson: 'ପୂର୍ବବର୍ତ୍ତୀ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ',
    lblNextPerson: 'ପରବର୍ତ୍ତୀ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ',
    noResults: 'ଆପଣଙ୍କ ସନ୍ଧାନ ସହିତ ମେଳ ଖାଉଥିବା କୌଣସି ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ ମିଳିଲା ନାହିଁ।',
    resetFilters: 'ଫିଲ୍ଟର ରିସେଟ୍ କରନ୍ତୁ'
  },
  bn: {
    badge: 'ঐতিহাসিক ব্যক্তিত্ব ও রাজবংশীয় বৃত্তান্ত',
    pageTitle: 'সম্রাট, রাজা ও পবিত্র রক্ষক',
    pageSubtitle: 'ওড্র দেশ, কলিঙ্গ ও দাক্ষিণাত্যের ঐতিহাসিক ব্যক্তিত্বদের সম্পূর্ণ জীবনী, শিলালিপি প্রমাণ, বংশাবলী ও কালানুক্রমিক শাসন বিবরণী।',
    catAll: 'সকল ঐতিহাসিক ব্যক্তিত্ব',
    catGajapathi: 'সূর্যবংশী ও গঙ্গ সম্রাটগণ',
    catProgenitors: 'প্রাচীন সম্রাট ও আদিপুরুষ',
    catSacred: 'আধ্যাত্মিক, সামরিক ও নাগরিক রক্ষক',
    filterAllEvidence: 'সকল প্রমাণ বিভাগ',
    filterPrimary: 'প্রমাণিত শিলালিপি সাক্ষ্য',
    filterTraditional: 'ঐতিহ্যবাহী ও পৌরাণিক বংশাবলী',
    searchPlaceholder: 'সম্রাট, উপাধি, রাজবংশ, শাসনকাল খুঁজুন...',
    returnHome: 'হোম পেজ',
    backToList: 'তালিকায় ফিরে যান',
    printBtn: 'প্রিন্ট করুন',
    shareBtn: 'শেয়ার করুন',
    copyLink: 'লিঙ্ক কপি করুন',
    linkCopied: 'লিঙ্ক কপি হয়েছে!',
    closeProfile: 'বন্ধ করুন',
    readFullBio: 'সম্পূর্ণ জীবনী ও শিলালিপি বিবরণ পড়ুন',
    epistemicBannerTitle: 'ঐতিহাসিক প্রমাণ শ্রেণীবিন্যাস পদ্ধতি',
    epistemicVerifiedTitle: 'প্রমাণিত ঐতিহাসিক তথ্য',
    epistemicVerifiedDesc: 'তাম্রশাসন, মন্দিরের শিলালিপি ও সমসাময়িক নথিপত্র দ্বারা প্রমাণিত।',
    epistemicTradTitle: 'ঐতিহ্যবাহী ও পবিত্র বিবরণী',
    epistemicTradDesc: 'পৌরাণিক বংশাবলী, মাদলা পাঁজি ও সম্প্রদায়গত ঐতিহ্যে সংরক্ষিত।',
    epistemicScholarTitle: 'ঐতিহাসিক গবেষণা ও বিশ্লেষণ',
    epistemicScholarDesc: 'আধুনিক লিপিতত্ত্ব গবেষণা (Epigraphia Indica, ASI) দ্বারা বিশ্লেষিত।',
    secFamilyPeriod: 'জন্ম, রাজবংশ, পারিবারিক পটভূমি ও ঐতিহাসিক কাল',
    secBiographyLegacy: 'সম্পূর্ণ ঐতিহাসিক জীবনী, কৃতিত্ব ও উত্তরাধিকার',
    secEngineeringCivic: 'স্থাপত্য, জল-প্রকৌশল ও সাংস্কৃতিক অবদান',
    secEpistemicAnalysis: 'প্রমাণ বিশ্লেষণ: ঐতিহাসিক তথ্য, ঐতিহ্য ও গবেষণা',
    secChronology: 'কালানুক্রমিক জীবন ও শাসন ঘটনাক্রম',
    secInscriptionsEvidence: 'শিলালিপি, তাম্রশাসন ও প্রত্নতাত্ত্বিক স্মৃতিস্তম্ভ',
    secSourcesCitations: 'প্রাথমিক সূত্র ও গবেষণামূলক উদ্ধৃতি',
    secRelatedPersonalities: 'সম্পর্কিত ঐতিহাসিক ব্যক্তিত্ব',
    secRelatedKingdomsArticles: 'সম্পর্কিত রাজবংশ, সাম্রাজ্য ও ঐতিহাসিক নিবন্ধ',
    secKeywordsHashtags: 'সম্পর্কিত কিওয়ার্ড ও হ্যাশট্যাগ',
    lblReignPeriod: 'শাসনকাল / ঐতিহাসিক যুগ',
    lblLifeDates: 'জন্ম / আনুমানিক জীবনকাল',
    lblDynastyLineage: 'রাজবংশ ও বংশপরম্পরা',
    lblCategoryRole: 'ঐতিহাসিক শ্রেণীবিন্যাস',
    lblKnownTitles: 'রাজকীয়, সাম্রাজ্যিক ও আধ্যাত্মিক উপাধি',
    lblAlternateNames: 'বিকল্প ও আঞ্চলিক নাম',
    lblFamilyBackground: 'পারিবারিক পটভূমি ও বংশাবলী সম্পর্ক',
    lblAssociatedPlaces: 'রাজধানী, দুর্গ ও সম্পর্কিত ঐতিহাসিক কেন্দ্র',
    lblHistoricalSignificance: 'মূল ঐতিহাসিক গুরুত্ব ও উত্তরাধিকার',
    lblPrevPerson: 'পূর্ববর্তী ঐতিহাসিক ব্যক্তিত্ব',
    lblNextPerson: 'পরবর্তী ঐতিহাসিক ব্যক্তিত্ব',
    noResults: 'আপনার অনুসন্ধানের সাথে মেলে এমন কোনো ঐতিহাসিক ব্যক্তিত্ব পাওয়া যায়নি।',
    resetFilters: 'ফিল্টার রিসেট করুন'
  }
};

// Mapping between figure IDs and genealogy node IDs for rich family background cross-referencing
const FIGURE_TO_GENEALOGY_MAP: Record<string, string> = {
  fig_kapilendra_deva: 'gen_kapilendra',
  fig_purushottama_deva: 'gen_purushottama',
  fig_prataparudra_deva: 'gen_prataparudra',
  fig_hamvira_deva: 'gen_hamvira',
  fig_samrat_sagara: 'gen_samrat_sagara',
  fig_maharshi_bhagiratha: 'gen_maharshi_bhagiratha',
  fig_sri_rama: 'gen_sri_rama'
};

// Mapping between figure IDs and related canonical article IDs
const FIGURE_TO_ARTICLES_MAP: Record<string, string[]> = {
  fig_kapilendra_deva: ['art_gajapathi_kapilendra', 'art_epigraphic_tradition_odra', 'art_odra_desha_history'],
  fig_purushottama_deva: ['art_gajapathi_kapilendra', 'art_genealogy_methodology', 'art_epigraphic_tradition_odra'],
  fig_prataparudra_deva: ['art_gajapathi_kapilendra', 'art_epigraphic_tradition_odra', 'art_genealogy_methodology'],
  fig_hamvira_deva: ['art_gajapathi_kapilendra', 'art_odra_migration_south', 'art_epigraphic_tradition_odra'],
  fig_mukunda_deva: ['art_odra_desha_history', 'art_odra_migration_south'],
  fig_anantavarman_chodaganga: ['art_odra_desha_history', 'art_epigraphic_tradition_odra'],
  fig_langula_narasimha_deva: ['art_epigraphic_tradition_odra', 'art_odra_desha_history'],
  fig_king_kharavela: ['art_epigraphic_tradition_odra', 'art_odra_desha_history'],
  fig_samrat_sagara: ['art_genealogy_methodology', 'art_odra_migration_south'],
  fig_maharshi_bhagiratha: ['art_genealogy_methodology', 'art_odra_migration_south'],
  fig_sri_rama: ['art_genealogy_methodology', 'art_gajapathi_kapilendra'],
  fig_goddess_jasma: ['art_odra_migration_south', 'art_genealogy_methodology'],
  fig_shivayogi_siddharama: ['art_odra_migration_south', 'art_epigraphic_tradition_odra'],
  fig_kolletikota_peddintlamma: ['art_odra_desha_history', 'art_odra_migration_south']
};

// Curated hashtags for each historical figure
function getFigureHashtags(fig: HistoricalFigure): string[] {
  const cleanName = fig.name.replace(/[^a-zA-Z0-9]/g, '');
  const cleanDynasty = fig.dynasty_name.split('(')[0].replace(/[^a-zA-Z0-9]/g, '');
  return [
    `#${cleanName}`,
    cleanDynasty ? `#${cleanDynasty}` : '#SuryavamshaGajapathi',
    '#OdraKshatriyaHeritage',
    '#HistoricalPersonages',
    '#EpigraphicHistory'
  ];
}

// Parse a chronological event string into year/era badge + description
function parseMajorEventString(rawEvent: string, fallbackEra: string, index: number) {
  const colonIdx = rawEvent.indexOf(':');
  if (colonIdx > 0 && colonIdx < 38) {
    return {
      eraLabel: rawEvent.slice(0, colonIdx).trim(),
      title: `Milestone #${index + 1}`,
      description: rawEvent.slice(colonIdx + 1).trim()
    };
  }
  const parenMatch = rawEvent.match(/\(([^)]*(?:CE|BCE|Century|Yuga|Epoch)[^)]*)\)/i);
  if (parenMatch) {
    return {
      eraLabel: parenMatch[1],
      title: rawEvent.slice(0, parenMatch.index).trim() || `Chronological Event #${index + 1}`,
      description: rawEvent
    };
  }
  return {
    eraLabel: fallbackEra,
    title: `Biographical & Regnal Event #${index + 1}`,
    description: rawEvent
  };
}

interface KingsQueensPageProps {
  onNavigate: (path: string) => void;
  initialFigureId?: string | null;
}

export const KingsQueensPage: React.FC<KingsQueensPageProps> = ({ onNavigate, initialFigureId }) => {
  const { language, setLanguage } = useLanguage();
  const ui = KINGS_QUEENS_UI[language] || KINGS_QUEENS_UI.en;

  const initialFigures = getAllDocumentedFigures(language);
  const [figures, setFigures] = useState<HistoricalFigure[]>(initialFigures);
  const [activeFigureId, setActiveFigureId] = useState<string | null>(() => {
    if (initialFigureId && initialFigures.some(f => f.id === initialFigureId)) {
      return initialFigureId;
    }
    try {
      const params = new URLSearchParams(window.location.search);
      const figParam = params.get('figure') || params.get('id');
      if (figParam && initialFigures.some(f => f.id === figParam)) {
        return figParam;
      }
    } catch {
      // Ignore URL parsing errors
    }
    return null;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [evidenceFilter, setEvidenceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const savedScrollY = useRef<number>(0);

  // Synchronize figure translations whenever language changes
  useEffect(() => {
    const updated = getAllDocumentedFigures(language);
    setFigures(updated);

    fetch(`/api/content/figures?lang=${language}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data?.figures && data.figures.length > 0) {
          setFigures(data.figures);
        }
      })
      .catch(() => {
        // Offline or network restricted - repository data is already loaded
      });
  }, [language]);

  // Synchronize initialFigureId prop changes (e.g. from global search navigation)
  useEffect(() => {
    if (initialFigureId && figures.some(f => f.id === initialFigureId)) {
      setActiveFigureId(initialFigureId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialFigureId, figures]);

  // Support automatic print when opened in external browser with ?autoprint=1
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autoprint') === '1' && activeFigureId) {
        const timer = setTimeout(() => {
          window.print();
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore
    }
  }, [activeFigureId]);

  const activeFigure = useMemo(() => {
    if (!activeFigureId) return null;
    return figures.find(f => f.id === activeFigureId) || null;
  }, [activeFigureId, figures]);

  const openFigureDetail = (figureId: string) => {
    savedScrollY.current = window.scrollY;
    setActiveFigureId(figureId);
    setShareMenuOpen(false);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('figure', figureId);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignore in sandboxed iframe
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeFigureDetail = () => {
    setActiveFigureId(null);
    setShareMenuOpen(false);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('figure');
      url.searchParams.delete('id');
      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignore
    }
    setTimeout(() => {
      window.scrollTo({ top: savedScrollY.current, behavior: 'smooth' });
    }, 60);
  };

  const getDirectFigureUrl = (figureId: string, autoPrint = false): string => {
    try {
      const url = new URL(window.location.origin + '/kings-queens');
      url.searchParams.set('figure', figureId);
      if (autoPrint) url.searchParams.set('autoprint', '1');
      return url.toString();
    } catch {
      return `${window.location.origin}/kings-queens?figure=${figureId}`;
    }
  };

  const handleCopyLink = (figure: HistoricalFigure, includeTitle = false) => {
    const shareUrl = getDirectFigureUrl(figure.id);
    const textToCopy = includeTitle
      ? `${figure.name} (${figure.reign_period}) — ${shareUrl}`
      : shareUrl;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloadResult, setPdfDownloadResult] = useState<{
    filename: string;
    downloadUrl?: string;
  } | null>(null);
  const pdfUi = PDF_EXPORT_UI_LABELS[language] || PDF_EXPORT_UI_LABELS.en;

  const getFigureBiographyArticleTitle = (figure: HistoricalFigure): string => {
    const bioSuffixMap: Record<LanguageCode, string> = {
      en: 'Historical Biography',
      hi: 'ऐतिहासिक जीवनी',
      te: 'చారిత్రక జీవిత చరిత్ర',
      kn: 'ಐತಿಹಾಸಿಕ ಜೀವನ ಚರಿತ್ರೆ',
      ta: 'வரலாற்று வாழ்க்கை வரலாறு',
      mr: 'ऐतिहासिक चरित्र',
      or: 'ଐତିହାସିକ ଜୀବନୀ',
      bn: 'ঐতিহাসিক জীবনী'
    };
    const suffix = bioSuffixMap[language] || bioSuffixMap.en;
    return `${figure.name} – ${suffix}`;
  };

  const handleDownloadFigurePdf = async (figure: HistoricalFigure) => {
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    setPdfDownloadResult(null);
    try {
      const fullTitle = getFigureBiographyArticleTitle(figure);
      const result = await downloadArticleAsPdf({
        articleTitle: fullTitle,
        language
      });
      setPdfDownloadResult({
        filename: result.filename,
        downloadUrl: result.downloadUrl
      });
    } catch (err) {
      console.error('Biography PDF export failed:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePrint = (figure: HistoricalFigure) => {
    const ua = navigator.userAgent || '';
    const isEmbeddedWebView = /wv|WebView|Android.*Version\/[0-9]/i.test(ua);
    if (isEmbeddedWebView) {
      const printUrl = getDirectFigureUrl(figure.id, true);
      window.open(printUrl, '_system');
      return;
    }
    triggerArticlePrintWithTitle(getFigureBiographyArticleTitle(figure));
  };

  const handleNativeShare = async (figure: HistoricalFigure) => {
    const shareUrl = getDirectFigureUrl(figure.id);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${figure.name} — ${figure.reign_period}`,
          text: `${figure.name} (${figure.dynasty_name}): ${figure.historical_significance}`,
          url: shareUrl
        });
        return;
      } catch {
        // User cancelled or Web Share unsupported; open share menu fallback
      }
    }
    setShareMenuOpen(prev => !prev);
  };

  const categories = [
    { id: 'all', label: `${ui.catAll} (${figures.length})` },
    {
      id: 'gajapathi_monarchs',
      label: `${ui.catGajapathi} (${figures.filter(f => (DOCUMENTED_FIGURES_REPO.find(r => r.id === f.id)?.category || 'gajapathi_monarchs') === 'gajapathi_monarchs').length})`
    },
    {
      id: 'progenitors_emperors',
      label: `${ui.catProgenitors} (${figures.filter(f => DOCUMENTED_FIGURES_REPO.find(r => r.id === f.id)?.category === 'progenitors_emperors').length})`
    },
    {
      id: 'sacred_civic',
      label: `${ui.catSacred} (${figures.filter(f => DOCUMENTED_FIGURES_REPO.find(r => r.id === f.id)?.category === 'sacred_civic').length})`
    }
  ];

  const filteredFigures = useMemo(() => {
    return figures.filter(fig => {
      const repoEntry = DOCUMENTED_FIGURES_REPO.find(r => r.id === fig.id);
      const figCategory = repoEntry?.category || 'gajapathi_monarchs';
      if (selectedCategory !== 'all' && figCategory !== selectedCategory) return false;
      if (evidenceFilter !== 'all' && fig.evidence_status !== evidenceFilter) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        fig.name.toLowerCase().includes(q) ||
        fig.dynasty_name.toLowerCase().includes(q) ||
        fig.reign_period.toLowerCase().includes(q) ||
        fig.biography.toLowerCase().includes(q) ||
        fig.historical_significance.toLowerCase().includes(q) ||
        (fig.known_titles || []).some(t => t.toLowerCase().includes(q)) ||
        (fig.alternate_names || []).some(n => n.toLowerCase().includes(q)) ||
        (fig.associated_places || []).some(p => p.toLowerCase().includes(q))
      );
    });
  }, [figures, selectedCategory, evidenceFilter, searchQuery]);

  // Helper to get extended localized historyContent narrative if available
  const getExtendedNarrative = (figureId: string) => {
    const ext = HISTORICAL_FIGURES.find(h => h.id === figureId);
    if (!ext) return null;
    return {
      summary: ext.summary[language] || ext.summary.en,
      detailed_narrative: ext.detailed_narrative[language] || ext.detailed_narrative.en,
      engineering_and_civic_legacy: ext.engineering_and_civic_legacy[language] || ext.engineering_and_civic_legacy.en,
      titles: ext.titles[language] || ext.titles.en || []
    };
  };

  // ============================================================================
  // FULL INDIVIDUAL BIOGRAPHY DETAIL VIEW
  // ============================================================================
  if (activeFigure) {
    const repoEntry = DOCUMENTED_FIGURES_REPO.find(r => r.id === activeFigure.id);
    const figCategory = repoEntry?.category || 'gajapathi_monarchs';
    const categoryLabel =
      figCategory === 'gajapathi_monarchs'
        ? ui.catGajapathi
        : figCategory === 'progenitors_emperors'
        ? ui.catProgenitors
        : ui.catSacred;

    const extendedNarrative = getExtendedNarrative(activeFigure.id);

    // Cross-reference Genealogy Node, Parent, and Children
    const genealogyNodes = getCanonicalGenealogy(language);
    const mappedGenId = FIGURE_TO_GENEALOGY_MAP[activeFigure.id];
    const genealogyNode = mappedGenId ? genealogyNodes.find(g => g.id === mappedGenId) : null;
    const parentNode = genealogyNode?.parent_id
      ? genealogyNodes.find(g => g.id === genealogyNode.parent_id)
      : null;
    const childNodes = genealogyNode
      ? genealogyNodes.filter(g => g.parent_id === genealogyNode.id)
      : [];

    // Cross-reference Corroborating Inscriptions
    const allInscriptions = getCanonicalInscriptions(language);
    const matchedInscriptions = allInscriptions.filter(insc => {
      if ((activeFigure.inscriptions_ids || []).includes(insc.id)) return true;
      const firstToken = activeFigure.name.split(' ')[0].toLowerCase();
      return firstToken.length > 3 && insc.ruler.toLowerCase().includes(firstToken);
    });

    // Cross-reference Historical Documents
    const allDocuments = getCanonicalDocuments(language);
    const matchedDocuments = allDocuments.filter(doc => {
      const firstToken = activeFigure.name.split(' ')[0].toLowerCase();
      return (
        (firstToken.length > 3 &&
          (doc.title.toLowerCase().includes(firstToken) ||
            doc.author_authority.toLowerCase().includes(firstToken) ||
            doc.translation_excerpt.toLowerCase().includes(firstToken))) ||
        (figCategory === 'gajapathi_monarchs' && doc.id === 'doc_madala_panji')
      );
    });

    // Cross-reference Archaeological Monuments & Historical Locations
    const allMonuments = getCanonicalMonuments(language);
    const matchedMonuments = allMonuments.filter(mon => {
      const firstToken = activeFigure.name.split(' ')[0].toLowerCase();
      const byRuler = firstToken.length > 3 && mon.patron_ruler.toLowerCase().includes(firstToken);
      const byPlace = (activeFigure.associated_places || []).some(p => {
        const cleanP = p.split('(')[0].trim().toLowerCase();
        return cleanP.length > 3 && (mon.name.toLowerCase().includes(cleanP) || mon.location.toLowerCase().includes(cleanP));
      });
      return byRuler || byPlace;
    });

    const allLocations = getCanonicalLocations(language);
    const matchedLocations = allLocations.filter(loc => {
      return (activeFigure.associated_places || []).some(p => {
        const cleanP = p.split('(')[0].trim().toLowerCase();
        return (
          cleanP.length > 3 &&
          (loc.name.toLowerCase().includes(cleanP) ||
            loc.ancient_name.toLowerCase().includes(cleanP) ||
            cleanP.includes(loc.name.toLowerCase()))
        );
      });
    });

    // Cross-reference Canonical Timeline Events
    const allTimelineEvents = getCanonicalTimelineEvents(language);
    const matchedTimelineEvents = allTimelineEvents.filter(ev => {
      const firstToken = activeFigure.name.split(' ')[0].toLowerCase();
      return (
        firstToken.length > 3 &&
        (ev.rulers_involved.toLowerCase().includes(firstToken) ||
          ev.title.toLowerCase().includes(firstToken))
      );
    });

    // Related Personalities (same category first, then others)
    const relatedPersonalities = figures
      .filter(f => f.id !== activeFigure.id)
      .sort((a, b) => {
        const catA = DOCUMENTED_FIGURES_REPO.find(r => r.id === a.id)?.category;
        const catB = DOCUMENTED_FIGURES_REPO.find(r => r.id === b.id)?.category;
        if (catA === figCategory && catB !== figCategory) return -1;
        if (catA !== figCategory && catB === figCategory) return 1;
        return 0;
      })
      .slice(0, 4);

    // Related Historical Articles
    const allArticles = getAllArticles(language);
    const mappedArticleIds = FIGURE_TO_ARTICLES_MAP[activeFigure.id] || [
      'art_gajapathi_kapilendra',
      'art_odra_desha_history',
      'art_epigraphic_tradition_odra'
    ];
    const relatedArticles = mappedArticleIds
      .map(id => allArticles.find(a => a.id === id))
      .filter((a): a is NonNullable<typeof a> => Boolean(a));

    // Sequential Previous / Next Figure navigation
    const currentIndex = figures.findIndex(f => f.id === activeFigure.id);
    const prevFigure = currentIndex > 0 ? figures[currentIndex - 1] : null;
    const nextFigure = currentIndex >= 0 && currentIndex < figures.length - 1 ? figures[currentIndex + 1] : null;

    // Keywords & Hashtags
    const figureKeywords = Array.from(
      new Set([
        activeFigure.name,
        activeFigure.dynasty_name,
        activeFigure.reign_period,
        ...(activeFigure.alternate_names || []),
        ...(activeFigure.known_titles || []).slice(0, 3),
        ...(activeFigure.associated_places || []).slice(0, 4)
      ])
    );

    const figureHashtags = getFigureHashtags(activeFigure);

    return (
      <div className="min-h-screen bg-[#FAF7F2] text-stone-900 pb-20 print-article-wrapper">
        {/* STICKY TOP NAVIGATION & MULTILINGUAL ACTION BAR */}
        <div className="no-print sticky top-0 z-30 bg-[#1C1613]/95 backdrop-blur-md border-b border-amber-500/30 px-4 sm:px-8 py-3.5 shadow-lg print:hidden">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={closeFigureDetail}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{ui.backToList}</span>
              </button>

              <button
                onClick={() => onNavigate('/')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-stone-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                <Home className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">{ui.returnHome}</span>
              </button>
            </div>

            {/* Right Action Controls: Language Switcher, Print, Share, Copy, Close */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* 8-Language Selector */}
              <div className="hidden md:flex items-center bg-black/40 border border-white/15 rounded-xl p-1 gap-0.5">
                {SUPPORTED_LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      language === l.code
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                    title={l.label}
                  >
                    {l.nativeName}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleDownloadFigurePdf(activeFigure)}
                disabled={isDownloadingPdf}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all cursor-pointer disabled:opacity-60 shadow-sm"
                title={`${pdfUi.downloadPdfBtn} (${generateArticlePdfFilename(getFigureBiographyArticleTitle(activeFigure))})`}
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>{isDownloadingPdf ? pdfUi.generatingPdfBtn : pdfUi.downloadPdfBtn}</span>
              </button>

              <button
                onClick={() => handlePrint(activeFigure)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-stone-200 text-xs font-bold transition-all cursor-pointer"
                title={pdfUi.printBtn}
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">{pdfUi.printBtn}</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => handleNativeShare(activeFigure)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-stone-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">{ui.shareBtn}</span>
                </button>

                {shareMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#231C18] border border-amber-500/40 shadow-2xl p-2 z-50 text-xs text-stone-200">
                    <button
                      onClick={() => {
                        handleCopyLink(activeFigure, false);
                        setShareMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 flex items-center gap-2.5 font-semibold cursor-pointer"
                    >
                      <Copy className="w-4 h-4 text-amber-400" />
                      <span>Copy Direct Biography Link</span>
                    </button>
                    <button
                      onClick={() => {
                        handleCopyLink(activeFigure, true);
                        setShareMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 flex items-center gap-2.5 font-semibold cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-amber-400" />
                      <span>Copy Name, Reign & Link</span>
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `${activeFigure.name} (${activeFigure.reign_period}) — ${getDirectFigureUrl(activeFigure.id)}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShareMenuOpen(false)}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 flex items-center gap-2.5 font-semibold text-emerald-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Share via WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleCopyLink(activeFigure, false)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-bold transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? ui.linkCopied : ui.copyLink}</span>
              </button>

              <button
                onClick={closeFigureDetail}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/70 border border-rose-500/30 text-rose-200 text-xs font-bold transition-all cursor-pointer"
                title={ui.closeProfile}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {pdfDownloadResult && (
            <div className="max-w-6xl mx-auto mt-2.5 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200 flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold flex items-center gap-1.5 break-all">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{pdfUi.pdfSavedNotice(pdfDownloadResult.filename)}</span>
              </span>
              {pdfDownloadResult.downloadUrl && (
                <a
                  href={pdfDownloadResult.downloadUrl}
                  download={pdfDownloadResult.filename}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{pdfUi.directDownloadLinkLabel}</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* HERO BIOGRAPHICAL PORTRAIT & SOVEREIGN HEADER */}
        <div className="print-article-container">
          <div className="print-only hidden print:block border-b-2 border-stone-800 pb-3 mb-4 text-black">
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-800">
              Suryavamsha Odiyaraju Kshatriya Historical Documentary &amp; Royal Heritage Portal — {ui.pageTitle}
            </p>
            <p className="text-[11px] font-semibold text-stone-700 mt-0.5">
              Research, Documentation &amp; Compilation by Dr.G Sathyanarayana Raju • Founder &amp; Historical Documentation Contributor
            </p>
            <p className="text-[10px] text-stone-600 break-all mt-0.5">
              {getDirectFigureUrl(activeFigure.id, false)}
            </p>
          </div>
        <header className="print-article-header bg-gradient-to-b from-[#1F1814] via-[#281F1A] to-[#1A1411] text-white border-b-4 border-amber-600/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
            {/* Breadcrumb & Classification Row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5" />
                {categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-stone-200 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {activeFigure.reign_period}
              </span>
              <EvidenceBadge status={activeFigure.evidence_status} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
              {/* Portrait Frame */}
              <div className="lg:col-span-4">
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl bg-stone-900 aspect-[4/5] max-w-sm mx-auto lg:max-w-none">
                  <img
                    src={activeFigure.image_url}
                    alt={activeFigure.name}
                    className="w-full h-full object-cover object-top"
                    onError={e => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/kapilendra_deva_coronation.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4 text-left">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                      {activeFigure.dynasty_name}
                    </p>
                    <p className="text-xs text-stone-300 mt-0.5">{activeFigure.approx_dates}</p>
                  </div>
                </div>
              </div>

              {/* Sovereign Title, Epithets & Summary Dossier */}
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                    {activeFigure.name}
                  </h1>
                  {activeFigure.alternate_names && activeFigure.alternate_names.length > 0 && (
                    <p className="text-sm sm:text-base text-amber-200/90 mt-2 font-medium">
                      <span className="text-stone-400 uppercase text-xs font-bold tracking-wider mr-2">
                        {ui.lblAlternateNames}:
                      </span>
                      {activeFigure.alternate_names.join(' • ')}
                    </p>
                  )}
                </div>

                {/* Royal & Spiritual Titles (Birudas) */}
                {activeFigure.known_titles && activeFigure.known_titles.length > 0 && (
                  <div className="bg-white/5 border border-amber-500/25 rounded-2xl p-4">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4" />
                      <span>{ui.lblKnownTitles}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeFigure.known_titles.map((title, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-100 text-xs sm:text-sm font-serif italic"
                        >
                          “{title}”
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Core Historical Significance Box */}
                <div className="bg-amber-950/40 border-l-4 border-amber-400 rounded-r-2xl p-4 sm:p-5">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-amber-300 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{ui.lblHistoricalSignificance}</span>
                  </div>
                  <p className="text-stone-100 text-sm sm:text-base leading-relaxed font-medium">
                    {activeFigure.historical_significance}
                  </p>
                </div>

                {/* Key Metadata Quick Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {ui.lblReignPeriod}
                    </div>
                    <div className="text-sm font-bold text-amber-300 mt-1">{activeFigure.reign_period}</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {ui.lblLifeDates}
                    </div>
                    <div className="text-sm font-bold text-stone-100 mt-1">{activeFigure.approx_dates}</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {ui.lblDynastyLineage}
                    </div>
                    <div className="text-sm font-bold text-stone-100 mt-1">{activeFigure.dynasty_name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BIOGRAPHICAL ARTICLE BODY */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 space-y-10">
          {/* SECTION 1: BIRTH, FAMILY BACKGROUND, DYNASTIC LINEAGE & ASSOCIATED PLACES */}
          <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2.5 border-b border-stone-200 pb-4">
              <Users className="w-6 h-6 text-amber-700 shrink-0" />
              <span>{ui.secFamilyPeriod}</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Birth, Dynasty & Documented Family Lineage */}
              <div className="space-y-4">
                <div className="bg-[#FAF7F2] rounded-xl p-4 border border-stone-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-3">
                    {ui.lblFamilyBackground}
                  </h3>
                  <dl className="space-y-2.5 text-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-stone-200/70 pb-2">
                      <dt className="text-stone-500 font-medium">{ui.lblDynastyLineage}:</dt>
                      <dd className="font-bold text-stone-900 sm:text-right">{activeFigure.dynasty_name}</dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-stone-200/70 pb-2">
                      <dt className="text-stone-500 font-medium">{ui.lblLifeDates}:</dt>
                      <dd className="font-bold text-stone-900 sm:text-right">{activeFigure.approx_dates}</dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-stone-200/70 pb-2">
                      <dt className="text-stone-500 font-medium">{ui.lblReignPeriod}:</dt>
                      <dd className="font-bold text-amber-800 sm:text-right">{activeFigure.reign_period}</dd>
                    </div>
                    {parentNode && (
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b border-stone-200/70 pb-2">
                        <dt className="text-stone-500 font-medium">Predecessor / Royal Parent:</dt>
                        <dd className="font-bold text-stone-900 sm:text-right">{parentNode.name}</dd>
                      </div>
                    )}
                    {(genealogyNode?.spouse || activeFigure.spouse_name) && (
                      <div className="flex flex-col sm:flex-row sm:justify-between border-b border-stone-200/70 pb-2">
                        <dt className="text-stone-500 font-medium">Royal Consort / Spouse:</dt>
                        <dd className="font-bold text-stone-900 sm:text-right">
                          {genealogyNode?.spouse || activeFigure.spouse_name}
                        </dd>
                      </div>
                    )}
                    {childNodes.length > 0 && (
                      <div className="flex flex-col sm:flex-row sm:justify-between pb-1">
                        <dt className="text-stone-500 font-medium">Documented Successors / Descendants:</dt>
                        <dd className="font-bold text-stone-900 sm:text-right">
                          {childNodes.map(c => c.name).join(', ')}
                        </dd>
                      </div>
                    )}
                  </dl>
                  {genealogyNode?.notes && (
                    <p className="mt-3 pt-3 border-t border-stone-200 text-xs text-stone-700 leading-relaxed italic">
                      {genealogyNode.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Capitals, Fortresses & Associated Centres */}
              <div className="space-y-4">
                <div className="bg-[#FAF7F2] rounded-xl p-4 border border-stone-200 h-full">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-3 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    <span>{ui.lblAssociatedPlaces}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(activeFigure.associated_places || []).map((place, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold shadow-2xs"
                      >
                        <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        {place}
                      </span>
                    ))}
                  </div>

                  {matchedLocations.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-stone-200">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                        Corroborated Archaeological Centres:
                      </div>
                      {matchedLocations.map(loc => (
                        <div
                          key={loc.id}
                          onClick={() => onNavigate('/odra-desha')}
                          className="p-2.5 rounded-lg bg-white border border-stone-200 hover:border-amber-400 transition-all cursor-pointer"
                        >
                          <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                            <span>
                              {loc.name} ({loc.ancient_name})
                            </span>
                            <span className="text-[11px] text-amber-700 font-semibold">
                              {loc.modern_district}, {loc.modern_state}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-1 line-clamp-2">{loc.summary}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: COMPLETE HISTORICAL BIOGRAPHY, ACHIEVEMENTS & LEGACY */}
          <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 flex items-center gap-2.5 border-b border-stone-200 pb-4">
              <BookOpen className="w-6 h-6 text-amber-700 shrink-0" />
              <span>{ui.secBiographyLegacy}</span>
            </h2>

            {/* Primary Archival Biography */}
            <div className="prose prose-stone max-w-none space-y-4">
              {activeFigure.biography.split('\n\n').map((para, idx) => (
                <p key={idx} className="text-stone-800 text-base sm:text-[17px] leading-relaxed font-normal">
                  {para}
                </p>
              ))}
            </div>

            {/* Extended Detailed Narrative (if available in historyContent.ts) */}
            {extendedNarrative && extendedNarrative.detailed_narrative && (
              <div className="mt-6 pt-6 border-t border-stone-200 space-y-4">
                <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-700" />
                  <span>Extended Historiographical & Cultural Analysis</span>
                </h3>
                {extendedNarrative.detailed_narrative.split('\n\n').map((para, idx) => (
                  <p key={idx} className="text-stone-700 text-sm sm:text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Engineering, Architectural & Civic Legacy (if available in historyContent.ts) */}
            {extendedNarrative && extendedNarrative.engineering_and_civic_legacy && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 sm:p-6 mt-6">
                <h3 className="text-base sm:text-lg font-serif font-bold text-amber-950 mb-2.5 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>{ui.secEngineeringCivic}</span>
                </h3>
                <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
                  {extendedNarrative.engineering_and_civic_legacy}
                </p>
              </div>
            )}
          </section>

          {/* SECTION 3: THREE-PILLAR EPISTEMIC CLASSIFICATION (VERIFIED FACTS vs TRADITIONAL ACCOUNTS vs SCHOLARLY INTERPRETATION) */}
          <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2.5 border-b border-stone-200 pb-4">
              <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0" />
              <span>{ui.secEpistemicAnalysis}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Pillar 1: Verified Historical Facts */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>1. {ui.epistemicVerifiedTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {activeFigure.evidence_status === 'Documented Primary Evidence'
                    ? `Directly attested in primary epigraphic charters, temple lithic records, or archaeological monuments dated to ${activeFigure.reign_period}. Primary records confirm sovereign titulature, territorial administration across ${(activeFigure.associated_places || []).slice(0, 3).join(', ')}, and documented regnal events.`
                    : `While the persona belongs to ancient sacred or traditional lineage (${activeFigure.reign_period}), later medieval epigraphs—such as the Veligalani Copper Plates (1458 CE), Korni Grants, and temple architectures—formally invoke this lineage as the foundational heritage of Odra-Kalinga sovereigns and community guilds.`}
                </p>
              </div>

              {/* Pillar 2: Traditional & Sacred Lineage Accounts */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-sm mb-2.5">
                  <Sparkles className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>2. {ui.epistemicTradTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  Preserved across the <em>Madala Panji</em> temple chronicles of Puri, royal <em>Vamsavalis</em>, Puranic chapters, and regional ballads across Odisha, Andhra Pradesh, Karnataka, Maharashtra, and Gujarat. These accounts celebrate {activeFigure.name} within the sacred ethos of the {activeFigure.dynasty_name}.
                </p>
              </div>

              {/* Pillar 3: Scholarly Historiographical Interpretations */}
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5">
                <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm mb-2.5">
                  <BookOpen className="w-5 h-5 text-indigo-700 shrink-0" />
                  <span>3. {ui.epistemicScholarTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  Evaluated in critical academic monographs ({(activeFigure.citations || []).slice(0, 2).join('; ') || 'Epigraphia Indica & ASI Surveys'}). Historians carefully distinguish verifiable political, military, and hydraulic achievements from poetic royal panegyrics (<em>Prashasti</em>).
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4: CHRONOLOGICAL BIOGRAPHICAL & REGNAL TIMELINE */}
          <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2.5 border-b border-stone-200 pb-4">
              <Clock className="w-6 h-6 text-amber-700 shrink-0" />
              <span>{ui.secChronology}</span>
            </h2>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/50 space-y-6">
              {(activeFigure.major_events || []).map((rawEv, idx) => {
                const parsed = parseMajorEventString(rawEv, activeFigure.reign_period, idx);
                return (
                  <div key={idx} className="relative bg-[#FAF7F2] rounded-xl p-4 sm:p-5 border border-stone-200">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-5 w-4 h-4 rounded-full bg-amber-600 border-4 border-white shadow-sm" />
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-xs font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {parsed.eraLabel}
                      </span>
                      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                        {parsed.title}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-stone-800 mt-1 leading-relaxed font-medium">
                      {parsed.description}
                    </p>
                  </div>
                );
              })}

              {/* Corroborating Canonical Timeline Records */}
              {matchedTimelineEvents.map(tev => (
                <div
                  key={tev.id}
                  onClick={() => onNavigate(`/timeline?id=${tev.id}`)}
                  className="relative bg-amber-50/50 hover:bg-amber-50 rounded-xl p-4 sm:p-5 border border-amber-300/80 transition-all cursor-pointer"
                >
                  <div className="absolute -left-[31px] sm:-left-[39px] top-5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-sm" />
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold">
                      {tev.year_text} ({tev.period})
                    </span>
                    <span className="text-xs font-bold text-amber-800 inline-flex items-center gap-1">
                      Open Archival Chronology Record <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-stone-900">{tev.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-700 mt-1">{tev.political_development}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: AVAILABLE INSCRIPTIONS, HISTORICAL DOCUMENTS & ARCHAEOLOGICAL MONUMENTS */}
          <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 flex items-center gap-2.5 border-b border-stone-200 pb-4">
              <Scroll className="w-6 h-6 text-amber-700 shrink-0" />
              <span>{ui.secInscriptionsEvidence}</span>
            </h2>

            {/* 5A: Corroborating Epigraphic Inscriptions */}
            {matchedInscriptions.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-amber-700" />
                  <span>Corroborating Stone Inscriptions & Copper-Plate Grants ({matchedInscriptions.length})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchedInscriptions.map(insc => (
                    <div
                      key={insc.id}
                      onClick={() => onNavigate(`/inscriptions?id=${insc.id}`)}
                      className="group rounded-xl border border-stone-200 hover:border-amber-500 bg-[#FAF7F2] p-4 transition-all cursor-pointer flex gap-4 items-start"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-900/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                        <Scroll className="w-6 h-6 text-amber-800" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-amber-800">
                          <span>{insc.era_or_date}</span>
                          <span>•</span>
                          <span>{insc.language}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors mt-0.5">
                          {insc.name}
                        </h4>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-2">{insc.historical_context}</p>
                        <div className="text-[11px] font-bold text-amber-700 mt-2 inline-flex items-center gap-1">
                          <span>Inspect Full Epigraphic Record</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5B: Digitized Archival Documents & Royal Manuscripts */}
            {matchedDocuments.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>Associated Archival Manuscripts & Royal Charters ({matchedDocuments.length})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchedDocuments.map(doc => (
                    <div
                      key={doc.id}
                      onClick={() => onNavigate(`/documents?id=${doc.id}`)}
                      className="group rounded-xl border border-stone-200 hover:border-amber-500 bg-[#FAF7F2] p-4 transition-all cursor-pointer flex gap-4 items-start"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-900/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-amber-800" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-amber-800">{doc.approximate_date}</div>
                        <h4 className="text-sm sm:text-base font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors mt-0.5">
                          {doc.title}
                        </h4>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-2">{doc.translation_excerpt}</p>
                        <div className="text-[11px] font-bold text-amber-700 mt-2 inline-flex items-center gap-1">
                          <span>View Archival Manuscript</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5C: Fortresses, Temples & Archaeological Monuments */}
            {matchedMonuments.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-amber-700" />
                  <span>Associated Temples, Fortresses & Archaeological Monuments ({matchedMonuments.length})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchedMonuments.map(mon => (
                    <div
                      key={mon.id}
                      onClick={() => onNavigate('/temples-monuments')}
                      className="group rounded-xl border border-stone-200 hover:border-amber-500 bg-[#FAF7F2] p-4 transition-all cursor-pointer flex gap-4 items-start"
                    >
                      {mon.image_url && (
                        <img
                          src={mon.image_url}
                          alt={mon.name}
                          className="w-20 h-20 rounded-lg object-cover border border-stone-300 shrink-0"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-amber-800">
                          {mon.century} • {mon.location}
                        </div>
                        <h4 className="text-sm sm:text-base font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors mt-0.5">
                          {mon.name}
                        </h4>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-2">{mon.historical_significance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* SECTION 6: PRIMARY SOURCE REFERENCES & SCHOLARLY CITATIONS */}
          <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-5 flex items-center gap-2.5 border-b border-stone-200 pb-4">
              <FileText className="w-6 h-6 text-amber-700 shrink-0" />
              <span>{ui.secSourcesCitations}</span>
            </h2>

            <ol className="space-y-3 list-decimal list-inside text-sm text-stone-800">
              {(activeFigure.citations || []).map((citation, idx) => (
                <li
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200 leading-relaxed font-medium"
                >
                  {citation}
                </li>
              ))}
            </ol>
          </section>

          {/* SECTION 7: ARTICLE FOOTER — RELATED PERSONALITIES, DYNASTIES, KINGDOMS, ARTICLES, KEYWORDS & HASHTAGS */}
          <footer className="print-article-footer bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-8">
            {/* 7A: Related Historical Personalities with Small Thumbnails */}
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-700" />
                <span>{ui.secRelatedPersonalities}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedPersonalities.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => openFigureDetail(rel.id)}
                    className="group rounded-xl border border-stone-200 hover:border-amber-500 bg-[#FAF7F2] p-3 transition-all cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={rel.image_url}
                      alt={rel.name}
                      className="w-14 h-14 rounded-lg object-cover object-top border border-stone-300 shrink-0"
                      onError={e => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/kapilendra_deva_coronation.jpg`;
                      }}
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-amber-800 truncate">{rel.reign_period}</div>
                      <div className="text-xs sm:text-sm font-serif font-bold text-stone-900 group-hover:text-amber-800 truncate">
                        {rel.name}
                      </div>
                      <div className="text-[11px] text-stone-500 truncate">{rel.dynasty_name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7B: Related Dynasties, Kingdoms & Historical Articles with Small Thumbnails */}
            <div className="pt-6 border-t border-stone-200">
              <h3 className="text-lg font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-700" />
                <span>{ui.secRelatedKingdomsArticles}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedArticles.map(art => (
                  <div
                    key={art.id}
                    onClick={() => onNavigate(`/documentary?article=${art.id}`)}
                    className="group rounded-xl border border-stone-200 hover:border-amber-500 bg-[#FAF7F2] p-3.5 transition-all cursor-pointer flex items-start gap-3"
                  >
                    {art.featured_image && (
                      <img
                        src={art.featured_image}
                        alt={art.original_title}
                        className="w-16 h-16 rounded-lg object-cover border border-stone-300 shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        {art.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-stone-900 group-hover:text-amber-800 line-clamp-2 mt-0.5">
                        {art.original_title}
                      </h4>
                    </div>
                  </div>
                ))}

                {/* Direct Kingdom & Dynasty Portal Cards */}
                <div
                  onClick={() => onNavigate('/gajapathi-kings')}
                  className="group rounded-xl border border-stone-200 hover:border-amber-500 bg-[#FAF7F2] p-3.5 transition-all cursor-pointer flex items-start gap-3"
                >
                  <img
                    src={`${(import.meta as any).env?.BASE_URL || '/'}assets/archive/gajapathi_empire_map_1465.jpg`}
                    alt="Suryavamsha Gajapathi Empire"
                    className="w-16 h-16 rounded-lg object-cover border border-stone-300 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      Kingdoms & Dynasties
                    </span>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-stone-900 group-hover:text-amber-800 mt-0.5">
                      Suryavamsha Gajapathi Empire & Sovereign Chronicles
                    </h4>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('/genealogy')}
                  className="group rounded-xl border border-stone-200 hover:border-amber-500 bg-[#FAF7F2] p-3.5 transition-all cursor-pointer flex items-start gap-3"
                >
                  <img
                    src={`${(import.meta as any).env?.BASE_URL || '/'}assets/archive/odia_palm_leaf_manuscript.jpg`}
                    alt="Royal Genealogy & Dynastic Tree"
                    className="w-16 h-16 rounded-lg object-cover border border-stone-300 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      Dynastic Lineage
                    </span>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-stone-900 group-hover:text-amber-800 mt-0.5">
                      Interactive Suryavamsha & Odra Dynastic Genealogy
                    </h4>
                  </div>
                </div>

                <div
                  onClick={() => onNavigate('/odra-desha')}
                  className="group rounded-xl border border-stone-200 hover:border-amber-500 bg-[#FAF7F2] p-3.5 transition-all cursor-pointer flex items-start gap-3"
                >
                  <img
                    src={`${(import.meta as any).env?.BASE_URL || '/'}assets/archive/barabati_fort_ramparts.jpg`}
                    alt="Odra Desha Historical Geography"
                    className="w-16 h-16 rounded-lg object-cover border border-stone-300 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      Historical Geography
                    </span>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-stone-900 group-hover:text-amber-800 mt-0.5">
                      Odra Desha Capitals, Fortresses & Epigraphic Sites
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* 7C: Keywords & Hashtags */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-700" />
                  <span>Related Archival Keywords</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {figureKeywords.map((kw, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchQuery(kw);
                        closeFigureDetail();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-stone-200 text-xs font-medium transition-colors cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-amber-700" />
                  <span>Research Hashtags</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {figureHashtags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold"
                    >
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 7D: Previous / Next Personality Navigation */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
              {prevFigure ? (
                <button
                  onClick={() => openFigureDetail(prevFigure.id)}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 hover:border-amber-500 bg-[#FAF7F2] text-left transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 text-amber-700 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {ui.lblPrevPerson}
                    </div>
                    <div className="text-sm font-serif font-bold text-stone-900 truncate">
                      {prevFigure.name}
                    </div>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextFigure ? (
                <button
                  onClick={() => openFigureDetail(nextFigure.id)}
                  className="flex items-center justify-end gap-3 p-3.5 rounded-xl border border-stone-200 hover:border-amber-500 bg-[#FAF7F2] text-right transition-all cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {ui.lblNextPerson}
                    </div>
                    <div className="text-sm font-serif font-bold text-stone-900 truncate">
                      {nextFigure.name}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-amber-700 shrink-0" />
                </button>
              ) : (
                <div />
              )}
            </div>

            {/* 7E: Bottom Action Bar (Back, Home, Print, Share, Copy Link) */}
            <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={closeFigureDetail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{ui.backToList}</span>
                </button>
                <button
                  onClick={() => onNavigate('/')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  <Home className="w-4 h-4 text-amber-700" />
                  <span>{ui.returnHome}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => handlePrint(activeFigure)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-700" />
                  <span>{ui.printBtn}</span>
                </button>
                <button
                  onClick={() => handleNativeShare(activeFigure)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-amber-700" />
                  <span>{ui.shareBtn}</span>
                </button>
                <button
                  onClick={() => handleCopyLink(activeFigure, false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? ui.linkCopied : ui.copyLink}</span>
                </button>
              </div>
            </div>

            {/* 7F: Author Profile & Print/PDF Attribution */}
            <div className="pt-6 border-t border-stone-200">
              <PublisherCreditCard variant="article-profile" />
            </div>
          </footer>
        </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // ARTICLE LIST INTERFACE — PROFESSIONAL THUMBNAIL BIOGRAPHY CARDS
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 pb-20">
      {/* HERO HEADER */}
      <div className="bg-gradient-to-b from-[#1F1814] via-[#2A201B] to-[#1C1613] text-white border-b-4 border-amber-600/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-amber-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{ui.returnHome}</span>
            </button>

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Crown className="w-3.5 h-3.5" />
              <span>{ui.badge}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            {ui.pageTitle}
          </h1>
          <p className="mt-3 text-stone-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
            {ui.pageSubtitle}
          </p>

          {/* 3-Pillar Epistemic Methodology Banner */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/30 border border-amber-500/25 rounded-2xl p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  {ui.epistemicVerifiedTitle}
                </div>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">{ui.epistemicVerifiedDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {ui.epistemicTradTitle}
                </div>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">{ui.epistemicTradDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  {ui.epistemicScholarTitle}
                </div>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">{ui.epistemicScholarDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-4 sm:p-6 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#2A201B] text-amber-300 shadow-sm border border-amber-500/40'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                className="w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Epistemic Evidence Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-500 inline-flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-amber-700" />
              <span>Evidence Filter:</span>
            </span>
            {[
              { id: 'all', label: ui.filterAllEvidence },
              { id: 'Documented Primary Evidence', label: ui.filterPrimary },
              { id: 'Traditional Lineage Record', label: ui.filterTraditional }
            ].map(ef => (
              <button
                key={ef.id}
                onClick={() => setEvidenceFilter(ef.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  evidenceFilter === ef.id
                    ? 'bg-amber-100 text-amber-950 border border-amber-400'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200'
                }`}
              >
                {ef.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PERSONALITIES THUMBNAIL CARD GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        {filteredFigures.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
            <Crown className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-600 font-medium mb-4">{ui.noResults}</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setEvidenceFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all cursor-pointer"
            >
              {ui.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredFigures.map(fig => {
              const repoEntry = DOCUMENTED_FIGURES_REPO.find(r => r.id === fig.id);
              const figCategory = repoEntry?.category || 'gajapathi_monarchs';
              const categoryLabel =
                figCategory === 'gajapathi_monarchs'
                  ? ui.catGajapathi
                  : figCategory === 'progenitors_emperors'
                  ? ui.catProgenitors
                  : ui.catSacred;

              const primaryTitle =
                fig.known_titles && fig.known_titles.length > 0 ? fig.known_titles[0] : fig.dynasty_name;
              const cardHashtags = getFigureHashtags(fig);

              return (
                <article
                  key={fig.id}
                  onClick={() => openFigureDetail(fig.id)}
                  className="group bg-white rounded-2xl border border-stone-200/90 hover:border-amber-500 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                >
                  {/* Top Split: Portrait Thumbnail + Core Sovereign Metadata */}
                  <div className="flex flex-col sm:flex-row">
                    {/* Portrait Image Container */}
                    <div className="sm:w-48 md:w-52 shrink-0 relative bg-stone-900 aspect-[4/3] sm:aspect-auto sm:min-h-[230px] overflow-hidden">
                      <img
                        src={fig.image_url}
                        alt={fig.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        onError={e => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/kapilendra_deva_coronation.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent sm:hidden" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-amber-300 border border-amber-400/40 text-[11px] font-bold">
                          {fig.reign_period}
                        </span>
                      </div>
                    </div>

                    {/* Right Content Header */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                            {categoryLabel}
                          </span>
                          <EvidenceBadge status={fig.evidence_status} />
                        </div>

                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                          {fig.name}
                        </h2>

                        <p className="text-xs sm:text-sm font-serif italic text-amber-900/90 mt-1 line-clamp-1">
                          “{primaryTitle}”
                        </p>

                        <div className="text-xs text-stone-500 font-medium mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>{fig.dynasty_name}</span>
                          <span>•</span>
                          <span>{fig.approx_dates}</span>
                        </div>

                        {/* Short Biography Preview */}
                        <p className="text-xs sm:text-sm text-stone-700 mt-3 line-clamp-3 leading-relaxed">
                          {fig.historical_significance} {fig.biography}
                        </p>
                      </div>

                      {/* Associated Places & Hashtags Preview */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1 font-semibold text-stone-600">
                            <Calendar className="w-3.5 h-3.5 text-amber-700" />
                            {(fig.major_events || []).length} Chronological Events
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-stone-600">
                            <FileText className="w-3.5 h-3.5 text-amber-700" />
                            {(fig.citations || []).length} Citations
                          </span>
                        </div>
                        <span className="text-amber-800 font-bold truncate max-w-[180px]">
                          {cardHashtags[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action Bar */}
                  <div className="px-5 py-3 bg-[#FAF7F2] border-t border-stone-200/80 flex items-center justify-between text-xs font-bold text-amber-900 group-hover:bg-amber-50 transition-colors">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span>{ui.readFullBio}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
