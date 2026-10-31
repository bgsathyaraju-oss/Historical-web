import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Scroll,
  BookOpen,
  Landmark,
  Calendar,
  MapPin,
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Home,
  Printer,
  Download,
  Share2,
  Copy,
  Check,
  Link2,
  ExternalLink,
  X,
  Quote,
  Sparkles,
  FileText,
  Tag,
  Crown,
  Users
} from 'lucide-react';
import {
  InscriptionRecord,
  HistoricalDocument,
  HistoricalEvent,
  HistoricalLocation,
  TempleMonument,
  HistoricalClaim,
  LanguageCode
} from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import { WhatsAppIcon, PublisherCreditCard } from './PublisherCreditCard';
import {
  downloadArticleAsPdf,
  triggerArticlePrintWithTitle,
  generateArticlePdfFilename,
  PDF_EXPORT_UI_LABELS
} from '../utils/pdfExport';
import {
  getCanonicalInscriptions,
  getCanonicalDocuments,
  getCanonicalTimelineEvents,
  getCanonicalLocations,
  getCanonicalMonuments,
  getCanonicalClaims
} from '../data/archivalSeedData';
import { getAllArticles } from '../data/articlesRepository';
import { getAllDocumentedFigures } from '../data/documentedFiguresRepository';
import {
  MASTER_70_REFERENCE_REGISTRY,
  REFERENCE_70_UI_LABELS,
  Reference70Entry,
  matchReference70Terms
} from '../data/communityReference70Registry';

export type HistoricalRecordCategory =
  | 'all'
  | 'inscriptions'
  | 'documents'
  | 'timeline'
  | 'archaeology'
  | 'references';

export type EpistemicTier =
  | 'verified_epigraphic'
  | 'traditional_account'
  | 'scholarly_interpretation';

export interface UnifiedHistoricalRecord {
  id: string;
  category: Exclude<HistoricalRecordCategory, 'all'>;
  categoryLabel: string;
  sortYear: number;
  chronologicalDate: string;
  eraLabel: string;
  title: string;
  subtitle: string;
  locationOrRepository: string;
  rulerOrAuthority: string;
  imageUrl: string;
  imageCaption: string;
  sourceAttribution: string;
  epistemicTier: EpistemicTier;
  epistemicBadge: string;
  verificationStatus: string;
  summary: string;
  fullDescription: string;
  transcriptionExcerpt?: string;
  transcriptionLanguage?: string;
  translationExcerpt?: string;
  metadata: Array<{ label: string; value: string }>;
  detailedAnalysis: {
    verifiedEvidence: string;
    traditionalAccounts: string;
    scholarlyInterpretations: string;
  };
  chronologicalEvents: Array<{
    id: string;
    yearText: string;
    period: string;
    title: string;
    rulersInvolved: string;
    description: string;
    monumentsInscriptions: string;
    epistemicTier: EpistemicTier;
  }>;
  inscriptionsAndArchaeology: Array<{
    title: string;
    typeBadge: string;
    locationOrDate: string;
    details: string;
  }>;
  sourceReferences: Array<{
    citation: string;
    typeBadge: string;
  }>;
  relatedRecordIds: string[];
  keywords: string[];
  hashtags: string[];
  related74References: Reference70Entry[];
}

interface HistoricalRecordsExplorerProps {
  defaultCategory?: HistoricalRecordCategory;
  initialRecordId?: string | null;
  pageBadge: string;
  pageTitle: string;
  pageSubtitle: string;
  basePath: string;
  onNavigate?: (path: string) => void;
  externalInscriptions?: InscriptionRecord[];
  externalDocuments?: HistoricalDocument[];
  externalEvents?: HistoricalEvent[];
  externalMonuments?: TempleMonument[];
  headerIcon?: React.ReactNode;
}

interface HistoricalRecordsUiLabels {
  allRecordsTab: string;
  inscriptionsTab: string;
  documentsTab: string;
  timelineTab: string;
  archaeologyTab: string;
  referencesTab: string;
  searchPlaceholder: string;
  showingCountLabel: string;
  chronologicalOrderBadge: string;
  allEpistemicFilter: string;
  verifiedEvidenceBadge: string;
  traditionalAccountBadge: string;
  scholarlyInterpretationBadge: string;
  epistemicBannerTitle: string;
  epistemicBannerDesc: string;
  readFullArticleBtn: string;
  sourcesCountSuffix: string;
  eventsCountSuffix: string;
  clearFiltersBtn: string;
  emptyStateTitle: string;
  emptyStateDesc: string;
  // Full Article Detail View Labels
  backButton: string;
  homeButton: string;
  printButton: string;
  shareButton: string;
  closeButton: string;
  copyLinkButton: string;
  copyTitleAndLinkButton: string;
  whatsappShareButton: string;
  copiedFeedback: string;
  printFallbackTitle: string;
  printFallbackDesc: string;
  openExternalPrintButton: string;
  copyPrintUrlButton: string;
  executiveSummaryHeading: string;
  completeDescriptionHeading: string;
  transcriptionHeading: string;
  translationHeading: string;
  detailedAnalysisHeading: string;
  verifiedEvidenceTitle: string;
  traditionalAccountsTitle: string;
  scholarlyInterpretationsTitle: string;
  chronologicalTimelineHeading: string;
  chronologicalTimelineSub: string;
  inscriptionsArchaeologyHeading: string;
  inscriptionsArchaeologySub: string;
  sourceReferencesHeading: string;
  sourceReferencesSub: string;
  relatedRecordsHeading: string;
  relatedKeywordsHeading: string;
  relevantHashtagsHeading: string;
  previousRecordLabel: string;
  nextRecordLabel: string;
  rulerAuthorityLabel: string;
  locationRepoLabel: string;
  dateEraLabel: string;
}

const HISTORICAL_RECORDS_UI: Record<LanguageCode, HistoricalRecordsUiLabels> = {
  en: {
    allRecordsTab: 'All Historical Records (Chronological)',
    inscriptionsTab: 'Inscriptions & Copper Plates',
    documentsTab: 'Manuscripts & Royal Chronicles',
    timelineTab: 'Chronological Events',
    archaeologyTab: 'Archaeological Records & Citadels',
    referencesTab: 'Bibliographic Corpus & Claims',
    searchPlaceholder: 'Search inscriptions, copper plates, manuscripts, rulers, dates, citations...',
    showingCountLabel: 'historical records arranged chronologically',
    chronologicalOrderBadge: 'Chronological Sequence (261 BCE – 1568 CE)',
    allEpistemicFilter: 'All Evidence Classes',
    verifiedEvidenceBadge: 'Verified Epigraphic & Archaeological Evidence',
    traditionalAccountBadge: 'Traditional Chronicle & Vamsavali Account',
    scholarlyInterpretationBadge: 'Scholarly Historiographical Interpretation',
    epistemicBannerTitle: 'Epistemic Classification & Historical Verification Protocol',
    epistemicBannerDesc:
      'Every historical record on this page clearly distinguishes between (1) Verified Epigraphic, Copper-Plate & Archaeological Evidence, (2) Traditional Temple Chronicles & Oral Vamsavali Accounts, and (3) Peer-Reviewed Scholarly Interpretations.',
    readFullArticleBtn: 'Read Full Historical Record',
    sourcesCountSuffix: 'Citations',
    eventsCountSuffix: 'Chronological Events',
    clearFiltersBtn: 'Reset Filters',
    emptyStateTitle: 'No Matching Historical Records Found',
    emptyStateDesc: 'Try clearing your search query or switching the record category filter.',
    backButton: 'Back to Records',
    homeButton: 'Home',
    printButton: 'Print / PDF',
    shareButton: 'Share',
    closeButton: 'Close',
    copyLinkButton: 'Copy Direct Link',
    copyTitleAndLinkButton: 'Copy Title & Link',
    whatsappShareButton: 'Share on WhatsApp',
    copiedFeedback: 'Copied to clipboard!',
    printFallbackTitle: 'Android App / WebViewer Print Mode',
    printFallbackDesc: 'Direct printing is restricted inside embedded WebViewers. Open this record in Chrome/Browser to print or save as PDF:',
    openExternalPrintButton: 'Open in External Browser & Print',
    copyPrintUrlButton: 'Copy Print Link',
    executiveSummaryHeading: 'Executive Summary & Archival Provenance',
    completeDescriptionHeading: 'Complete Historical Description & Documentary Record',
    transcriptionHeading: 'Original Incised Epigraphic / Manuscript Transcription',
    translationHeading: 'Verified Scholarly Translation',
    detailedAnalysisHeading: 'Detailed Historiographical & Epistemic Analysis',
    verifiedEvidenceTitle: '1. Verified Epigraphic, Copper-Plate & Archaeological Evidence',
    traditionalAccountsTitle: '2. Traditional Chronicles, Temple Registers & Vamsavali Accounts',
    scholarlyInterpretationsTitle: '3. Scholarly Historiographical Interpretations & Scope',
    chronologicalTimelineHeading: 'Chronological Sequence of Related Historical Events',
    chronologicalTimelineSub: 'Historical developments arranged in strict chronological order with source verification badges.',
    inscriptionsArchaeologyHeading: 'Corroborating Inscriptions, Copper Plates, Archaeological & Documentary Records',
    inscriptionsArchaeologySub: 'Primary physical artifacts, stone stelae, copper-plate charters, and fortified citadels.',
    sourceReferencesHeading: 'Primary Source References & Scholarly Citations',
    sourceReferencesSub: 'Published epigraphic volumes, archival catalogues, and peer-reviewed monographs.',
    relatedRecordsHeading: 'Related Historical Records & Archival Dossiers',
    relatedKeywordsHeading: 'Related Historical Keywords & Topics',
    relevantHashtagsHeading: 'Relevant Archival Hashtags',
    previousRecordLabel: 'Previous Historical Record',
    nextRecordLabel: 'Next Historical Record',
    rulerAuthorityLabel: 'Ruler / Compiling Authority',
    locationRepoLabel: 'Findspot / Custodial Repository',
    dateEraLabel: 'Chronological Date / Era'
  },
  hi: {
    allRecordsTab: 'सभी ऐतिहासिक अभिलेख (कालानुक्रमिक)',
    inscriptionsTab: 'शिलालेख एवं ताम्रपत्र',
    documentsTab: 'पांडुलिपियाँ एवं राजवंशीय इतिवृत्त',
    timelineTab: 'कालानुक्रमिक ऐतिहासिक घटनाएँ',
    archaeologyTab: 'पुरातात्विक अभिलेख एवं दुर्ग',
    referencesTab: 'संदर्भ ग्रंथसूची एवं साक्ष्य समीक्षा',
    searchPlaceholder: 'शिलालेख, ताम्रपत्र, पांडुलिपि, शासक, तिथि या संदर्भ खोजें...',
    showingCountLabel: 'कालानुक्रमिक रूप से व्यवस्थित ऐतिहासिक अभिलेख',
    chronologicalOrderBadge: 'कालानुक्रमिक क्रम (261 ई.पू. – 1568 ई.)',
    allEpistemicFilter: 'सभी साक्ष्य श्रेणियाँ',
    verifiedEvidenceBadge: 'सत्यापित शिलालेखीय एवं पुरातात्विक साक्ष्य',
    traditionalAccountBadge: 'पारंपरिक इतिवृत्त एवं वंशावली विवरण',
    scholarlyInterpretationBadge: 'विद्वत्तापूर्ण इतिहासलेखन व्याख्या',
    epistemicBannerTitle: 'साक्ष्य वर्गीकरण एवं ऐतिहासिक सत्यापन मानक',
    epistemicBannerDesc:
      'यह पृष्ठ (1) सत्यापित शिलालेखीय, ताम्रपत्र एवं पुरातात्विक साक्ष्य, (2) पारंपरिक मंदिर इतिवृत्त एवं वंशावली विवरण, तथा (3) विद्वानों की समीक्षा एवं व्याख्या के बीच स्पष्ट अंतर रखता है।',
    readFullArticleBtn: 'संपूर्ण ऐतिहासिक अभिलेख पढ़ें',
    sourcesCountSuffix: 'संदर्भ',
    eventsCountSuffix: 'कालानुक्रमिक घटनाएँ',
    clearFiltersBtn: 'फ़िल्टर रीसेट करें',
    emptyStateTitle: 'कोई संबंधित ऐतिहासिक अभिलेख नहीं मिला',
    emptyStateDesc: 'कृपया अपनी खोज बदलें या श्रेणी फ़िल्टर रीसेट करें।',
    backButton: 'वापस अभिलेख सूची पर',
    homeButton: 'मुख्य पृष्ठ',
    printButton: 'प्रिंट / PDF',
    shareButton: 'साझा करें',
    closeButton: 'बंद करें',
    copyLinkButton: 'सीधा लिंक कॉपी करें',
    copyTitleAndLinkButton: 'शीर्षक और लिंक कॉपी करें',
    whatsappShareButton: 'WhatsApp पर साझा करें',
    copiedFeedback: 'क्लिपबोर्ड पर कॉपी हो गया!',
    printFallbackTitle: 'एंड्रॉइड ऐप / वेबव्यूअर प्रिंट मोड',
    printFallbackDesc: 'प्रिंट या PDF सहेजने के लिए इस अभिलेख को बाहरी ब्राउज़र में खोलें:',
    openExternalPrintButton: 'बाहरी ब्राउज़र में खोलें और प्रिंट करें',
    copyPrintUrlButton: 'प्रिंट लिंक कॉपी करें',
    executiveSummaryHeading: 'कार्यकारी सारांश एवं अभिलेखीय उत्पत्ति',
    completeDescriptionHeading: 'संपूर्ण ऐतिहासिक विवरण एवं दस्तावेज़ी अभिलेख',
    transcriptionHeading: 'मूल उत्कीर्ण शिलालेख / पांडुलिपि पाठ',
    translationHeading: 'सत्यापित विद्वत्तापूर्ण अनुवाद',
    detailedAnalysisHeading: 'विस्तृत ऐतिहासिक एवं ज्ञानमीमांसीय विश्लेषण',
    verifiedEvidenceTitle: '1. सत्यापित शिलालेख, ताम्रपत्र एवं पुरातात्विक साक्ष्य',
    traditionalAccountsTitle: '2. पारंपरिक इतिवृत्त, मादला पांजी एवं वंशावली विवरण',
    scholarlyInterpretationsTitle: '3. विद्वत्तापूर्ण इतिहासलेखन व्याख्या एवं अनुसंधान सीमा',
    chronologicalTimelineHeading: 'संबंधित ऐतिहासिक घटनाओं का कालानुक्रमिक क्रम',
    chronologicalTimelineSub: 'स्रोत सत्यापन बैज के साथ कालानुक्रमिक रूप से व्यवस्थित ऐतिहासिक विकास।',
    inscriptionsArchaeologyHeading: 'पुष्टिकारक शिलालेख, ताम्रपत्र, पुरातात्विक एवं दस्तावेज़ी साक्ष्य',
    inscriptionsArchaeologySub: 'प्राथमिक भौतिक साक्ष्य, शिलालेख, ताम्रपत्र अनुदान और ऐतिहासिक दुर्ग।',
    sourceReferencesHeading: 'प्राथमिक स्रोत संदर्भ एवं विद्वत्तापूर्ण उद्धरण',
    sourceReferencesSub: 'प्रकाशित पुरालेखीय खंड, अभिलेखीय सूचियाँ और शोध ग्रंथ।',
    relatedRecordsHeading: 'संबंधित ऐतिहासिक अभिलेख एवं लेख',
    relatedKeywordsHeading: 'संबंधित ऐतिहासिक कीवर्ड और विषय',
    relevantHashtagsHeading: 'प्रासंगिक हैशटैग',
    previousRecordLabel: 'पिछला ऐतिहासिक अभिलेख',
    nextRecordLabel: 'अगला ऐतिहासिक अभिलेख',
    rulerAuthorityLabel: 'शासक / संकलनकर्ता प्राधिकरण',
    locationRepoLabel: 'प्राप्ति-स्थल / अभिलेखागार',
    dateEraLabel: 'कालानुक्रमिक तिथि / युग'
  },
  te: {
    allRecordsTab: 'అన్ని చారిత్రక రికార్డులు (కాలక్రమం)',
    inscriptionsTab: 'శిలాశాసనాలు & తామ్రపత్రాలు',
    documentsTab: 'తాళపత్ర గ్రంథాలు & రాజ వృత్తాంతాలు',
    timelineTab: 'కాలక్రమ చారిత్రక సంఘటనలు',
    archaeologyTab: 'పురావస్తు ఆధారాలు & కోటలు',
    referencesTab: 'చారిత్రక ఆధార గ్రంథసూచి & సమీక్ష',
    searchPlaceholder: 'శాసనాలు, తామ్రపత్రాలు, తాళపత్ర గ్రంథాలు, రాజులు, తేదీలను శోధించండి...',
    showingCountLabel: 'కాలక్రమంలో అమర్చబడిన చారిత్రక రికార్డులు',
    chronologicalOrderBadge: 'కాలక్రమ వరుస (క్రీ.పూ. 261 – క్రీ.శ. 1568)',
    allEpistemicFilter: 'అన్ని ఆధార తరగతులు',
    verifiedEvidenceBadge: 'ధృవీకరించబడిన శాసన & పురావస్తు ఆధారం',
    traditionalAccountBadge: 'సాంప్రదాయ వృత్తాంతం & వంశావళి కథనం',
    scholarlyInterpretationBadge: 'చరిత్రకారుల పరిశోధనాత్మక విశ్లేషణ',
    epistemicBannerTitle: 'ఆధార వర్గీకరణ & చారిత్రక ధృవీకరణ ప్రమాణం',
    epistemicBannerDesc:
      'ఈ పుటలోని ప్రతి చారిత్రక రికార్డు (1) ధృవీకరించబడిన శిలాశాసన, తామ్రపత్ర & పురావస్తు ఆధారాలు, (2) సాంప్రదాయ ఆలయ వృత్తాంతాలు & వంశావళి కథనాలు, మరియు (3) చరిత్రకారుల పరిశోధనా విశ్లేషణలను స్పష్టంగా వేరు చేసి చూపుతుంది.',
    readFullArticleBtn: 'పూర్తి చారిత్రక రికార్డును చదవండి',
    sourcesCountSuffix: 'ఆధారాలు',
    eventsCountSuffix: 'చారిత్రక ఘట్టాలు',
    clearFiltersBtn: 'ఫిల్టర్లు తొలగించు',
    emptyStateTitle: 'సరిపోలే చారిత్రక రికార్డులు కనుగొనబడలేదు',
    emptyStateDesc: 'దయచేసి శోధన పదాన్ని మార్చండి లేదా ఫిల్టర్‌ను రీసెట్ చేయండి.',
    backButton: 'రికార్డుల జాబితాకు తిరిగి వెళ్ళు',
    homeButton: 'హోమ్',
    printButton: 'ప్రింట్ / PDF',
    shareButton: 'షేర్ చేయండి',
    closeButton: 'మూసివేయి',
    copyLinkButton: 'డైరెక్ట్ లింక్ కాపీ చేయి',
    copyTitleAndLinkButton: 'శీర్షిక & లింక్ కాపీ చేయి',
    whatsappShareButton: 'WhatsApp లో షేర్ చేయండి',
    copiedFeedback: 'లింక్ కాపీ చేయబడింది!',
    printFallbackTitle: 'ఆండ్రాయిడ్ యాప్ / వెబ్‌వ్యూయర్ ప్రింట్ మోడ్',
    printFallbackDesc: 'ప్రింట్ చేయడానికి లేదా PDF గా సేవ్ చేయడానికి బాహ్య బ్రౌజర్‌లో తెరవండి:',
    openExternalPrintButton: 'బ్రౌజర్‌లో తెరిచి ప్రింట్ చేయండి',
    copyPrintUrlButton: 'ప్రింట్ లింక్ కాపీ చేయి',
    executiveSummaryHeading: 'కార్యనిర్వాహక సారాంశం & పురావస్తు మూల వివరాలు',
    completeDescriptionHeading: 'పూర్తి చారిత్రక వివరణ & డాక్యుమెంటరీ రికార్డు',
    transcriptionHeading: 'మూల శాసన / తాళపత్ర పాఠ్య భాగం',
    translationHeading: 'ధృవీకరించబడిన పరిశోధనా అనువాదం',
    detailedAnalysisHeading: 'వివరణాత్మక చారిత్రక & ఆధార విశ్లేషణ',
    verifiedEvidenceTitle: '1. ధృవీకరించబడిన శిలాశాసన, తామ్రపత్ర & పురావస్తు ఆధారాలు',
    traditionalAccountsTitle: '2. సాంప్రదాయ ఆలయ వృత్తాంతాలు (మాదళ పంజి) & వంశావళి కథనాలు',
    scholarlyInterpretationsTitle: '3. చరిత్రకారుల పరిశోధనా విశ్లేషణ & పరిధి',
    chronologicalTimelineHeading: 'సంబంధిత చారిత్రక సంఘటనల కాలక్రమం',
    chronologicalTimelineSub: 'ఆధార ధృవీకరణ బ్యాడ్జీలతో కాలక్రమంలో అమర్చబడిన చారిత్రక పరిణామాలు.',
    inscriptionsArchaeologyHeading: 'బలపరిచే శాసనాలు, తామ్రపత్రాలు, పురావస్తు & పత్ర ఆధారాలు',
    inscriptionsArchaeologySub: 'ప్రాథమిక భౌతిక ఆధారాలు, శిలాశాసనాలు, తామ్రశాసనాలు మరియు చారిత్రక కోటలు.',
    sourceReferencesHeading: 'ప్రాథమిక ఆధార గ్రంథాలు & పరిశోధన ఉల్లేఖనలు',
    sourceReferencesSub: 'ప్రచురిత శాసన సంపుటాలు, పురావస్తు జాబితాలు మరియు చారిత్రక గ్రంథాలు.',
    relatedRecordsHeading: 'సంబంధిత చారిత్రక రికార్డులు & వ్యాసాలు',
    relatedKeywordsHeading: 'సంబంధిత చారిత్రక కీవర్డ్లు & అంశాలు',
    relevantHashtagsHeading: 'సంబంధిత హ్యాష్‌ట్యాగ్‌లు',
    previousRecordLabel: 'మునుపటి చారిత్రక రికార్డు',
    nextRecordLabel: 'తదుపరి చారిత్రక రికార్డు',
    rulerAuthorityLabel: 'పాలకుడు / సంకలనకర్త',
    locationRepoLabel: 'లభించిన ప్రదేశం / భాండాగారం',
    dateEraLabel: 'చారిత్రక తేదీ / కాలం'
  },
  kn: {
    allRecordsTab: 'ಎಲ್ಲಾ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು (ಕಾಲಾನುಕ್ರಮ)',
    inscriptionsTab: 'ಶಿಲಾಶಾಸನಗಳು ಮತ್ತು ತಾಮ್ರಪಟಗಳು',
    documentsTab: 'ಹಸ್ತಪ್ರತಿಗಳು ಮತ್ತು ರಾಜ ವೃತ್ತಾಂತಗಳು',
    timelineTab: 'ಕಾಲಾನುಕ್ರಮ ಐತಿಹಾಸಿಕ ಘಟನೆಗಳು',
    archaeologyTab: 'ಪುರಾತತ್ತ್ವ ದಾಖಲೆಗಳು ಮತ್ತು ಕೋಟೆಗಳು',
    referencesTab: 'ಆಕರ ಗ್ರಂಥಸೂಚಿ ಮತ್ತು ಪುರಾವೆ ವಿಶ್ಲೇಷಣೆ',
    searchPlaceholder: 'ಶಾಸನಗಳು, ತಾಮ್ರಪಟಗಳು, ಹಸ್ತಪ್ರತಿಗಳು, ಅರಸರು, ದಿನಾಂಕಗಳನ್ನು ಹುಡುಕಿ...',
    showingCountLabel: 'ಕಾಲಾನುಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಲಾದ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು',
    chronologicalOrderBadge: 'ಕಾಲಾನುಕ್ರಮ ಶ್ರೇಣಿ (ಕ್ರಿ.ಪೂ. 261 – ಕ್ರಿ.ಶ. 1568)',
    allEpistemicFilter: 'ಎಲ್ಲಾ ಪುರಾವೆ ವರ್ಗಗಳು',
    verifiedEvidenceBadge: 'ದೃಢೀಕೃತ ಶಾಸನ ಮತ್ತು ಪುರಾತತ್ತ್ವ ಪುರಾವೆ',
    traditionalAccountBadge: 'ಸಾಂಪ್ರದಾಯಿಕ ವೃತ್ತಾಂತ ಮತ್ತು ವಂಶಾವಳಿ ದಾಖಲೆ',
    scholarlyInterpretationBadge: 'ವಿದ್ವತ್ಪೂರ್ಣ ಇತಿಹಾಸ ವಿಶ್ಲೇಷಣೆ',
    epistemicBannerTitle: 'ಪುರಾವೆ ವರ್ಗೀಕರಣ ಮತ್ತು ಐತಿಹಾಸಿಕ ಪರಿಶೀಲನಾ ಮಾನದಂಡ',
    epistemicBannerDesc:
      'ಈ ಪುಟದ ಪ್ರತಿಯೊಂದು ದಾಖಲೆಯು (1) ದೃಢೀಕೃತ ಶಾಸನ, ತಾಮ್ರಪಟ ಮತ್ತು ಪುರಾತತ್ತ್ವ ಪುರಾವೆ, (2) ಸಾಂಪ್ರದಾಯಿಕ ದೇವಾಲಯ ವೃತ್ತಾಂತ ಮತ್ತು ವಂಶಾವಳಿಗಳು, ಹಾಗೂ (3) ವಿದ್ವಾಂಸರ ಐತಿಹಾಸಿಕ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ 구분ಿಸುತ್ತದೆ.',
    readFullArticleBtn: 'ಸಂಪೂರ್ಣ ಐತಿಹಾಸಿಕ ದಾಖಲೆ ಓದಿ',
    sourcesCountSuffix: 'ಆಕರಗಳು',
    eventsCountSuffix: 'ಕಾಲಾನುಕ್ರಮ ಘಟನೆಗಳು',
    clearFiltersBtn: 'ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ',
    emptyStateTitle: 'ಯಾವುದೇ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
    emptyStateDesc: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹುಡುಕಾಟ ಪದವನ್ನು ಬದಲಾಯಿಸಿ ಅಥವಾ ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ.',
    backButton: 'ದಾಖಲೆಗಳ ಪಟ್ಟಿಗೆ ಹಿಂತಿರುಗಿ',
    homeButton: 'ಮುಖಪುಟ',
    printButton: 'ಮುದ್ರಿಸಿ / PDF',
    shareButton: 'ಹಂಚಿಕೊಳ್ಳಿ',
    closeButton: 'ಮುಚ್ಚಿ',
    copyLinkButton: 'ನೇರ ಲಿಂಕ್ ನಕಲಿಸಿ',
    copyTitleAndLinkButton: 'ಶೀರ್ಷಿಕೆ ಮತ್ತು ಲಿಂಕ್ ನಕಲಿಸಿ',
    whatsappShareButton: 'WhatsApp ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ',
    copiedFeedback: 'ಕ್ಲಿಪ್‌ಬೋರ್ಡ್‌ಗೆ ನಕಲಿಸಲಾಗಿದೆ!',
    printFallbackTitle: 'ಆಂಡ್ರಾಯ್ಡ್ ಆಪ್ / ವೆಬ್‌ವ್ಯೂವರ್ ಪ್ರಿಂಟ್ ಮೋಡ್',
    printFallbackDesc: 'ಮುದ್ರಿಸಲು ಅಥವಾ PDF ಆಗಿ ಉಳಿಸಲು ಬಾಹ್ಯ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ:',
    openExternalPrintButton: 'ಬಾಹ್ಯ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ತೆರೆದು ಮುದ್ರಿಸಿ',
    copyPrintUrlButton: 'ಪ್ರಿಂಟ್ ಲಿಂಕ್ ನಕಲಿಸಿ',
    executiveSummaryHeading: 'ಕಾರ್ಯಕಾರಿ ಸಾರಾಂಶ ಮತ್ತು ದಾಖಲೆಯ ಮೂಲ',
    completeDescriptionHeading: 'ಸಂಪೂರ್ಣ ಐತಿಹಾಸಿಕ ವಿವರಣೆ ಮತ್ತು ದಾಖಲಾತಿ',
    transcriptionHeading: 'ಮೂಲ ಶಾಸನ / ಹಸ್ತಪ್ರತಿ ಪಠ್ಯ ಭಾಗ',
    translationHeading: 'ದೃಢೀಕೃತ ವಿದ್ವತ್ಪೂರ್ಣ ಅನುವಾದ',
    detailedAnalysisHeading: 'ವಿವರವಾದ ಐತಿಹಾಸಿಕ ಮತ್ತು ಪುರಾವೆ ವಿಶ್ಲೇಷಣೆ',
    verifiedEvidenceTitle: '1. ದೃಢೀಕೃತ ಶಿಲಾಶಾಸನ, ತಾಮ್ರಪಟ ಮತ್ತು ಪುರಾತತ್ತ್ವ ಪುರಾವೆಗಳು',
    traditionalAccountsTitle: '2. ಸಾಂಪ್ರದಾಯಿಕ ವೃತ್ತಾಂತಗಳು (ಮಾದಲಾ ಪಂಜಿ) ಮತ್ತು ವಂಶಾವಳಿ ದಾಖಲೆಗಳು',
    scholarlyInterpretationsTitle: '3. ವಿದ್ವಾಂಸರ ಐತಿಹಾಸಿಕ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ವ್ಯಾಪ್ತಿ',
    chronologicalTimelineHeading: 'ಸಂಬಂಧಿತ ಐತಿಹಾಸಿಕ ಘಟನೆಗಳ ಕಾಲಾನುಕ್ರಮ',
    chronologicalTimelineSub: 'ಪುರಾವೆ ಪರಿಶೀಲನಾ ಬ್ಯಾಡ್ಜ್‌ಗಳೊಂದಿಗೆ ಕಾಲಾನುಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಲಾದ ಐತಿಹಾಸಿಕ ಘಟನೆಗಳು.',
    inscriptionsArchaeologyHeading: 'ಪೂರಕ ಶಾಸನಗಳು, ತಾಮ್ರಪಟಗಳು, ಪುರಾತತ್ತ್ವ ಮತ್ತು ಹಸ್ತಪ್ರತಿ ದಾಖಲೆಗಳು',
    inscriptionsArchaeologySub: 'ಪ್ರಾಥಮಿಕ ಭೌತಿಕ ಕುರುಹುಗಳು, ಶಿಲಾಶಾಸನಗಳು, ತಾಮ್ರಪಟಗಳು ಮತ್ತು ಕೋಟೆಗಳು.',
    sourceReferencesHeading: 'ಪ್ರಾಥಮಿಕ ಆಕರ ಗ್ರಂಥಗಳು ಮತ್ತು ವಿದ್ವತ್ಪೂರ್ಣ ಉಲ್ಲೇಖಗಳು',
    sourceReferencesSub: 'ಪ್ರಕಟಿತ ಶಾಸನ ಸಂಪುಟಗಳು, ಪತ್ರಾಗಾರ ಸೂಚಿಗಳು ಮತ್ತು ಸಂಶೋಧನಾ ಗ್ರಂಥಗಳು.',
    relatedRecordsHeading: 'ಸಂಬಂಧಿತ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ಲೇಖನಗಳು',
    relatedKeywordsHeading: 'ಸಂಬಂಧಿತ ಐತಿಹಾಸಿಕ ಕೀವರ್ಡ್‌ಗಳು',
    relevantHashtagsHeading: 'ಸಂಬಂಧಿತ ಹ್ಯಾಶ್‌ಟ್ಯಾಗ್‌ಗಳು',
    previousRecordLabel: 'ಹಿಂದಿನ ಐತಿಹಾಸಿಕ ದಾಖಲೆ',
    nextRecordLabel: 'ಮುಂದಿನ ಐತಿಹಾಸಿಕ ದಾಖಲೆ',
    rulerAuthorityLabel: 'ಅರಸರು / ಸಂಕಲನ ಪ್ರಾಧಿಕಾರ',
    locationRepoLabel: 'ದೊರೆತ ಸ್ಥಳ / ಸಂಗ್ರಹಾಲಯ',
    dateEraLabel: 'ಕಾಲಾನುಕ್ರಮ ದಿನಾಂಕ / ಯುಗ'
  },
  ta: {
    allRecordsTab: 'அனைத்து வரலாற்று ஆவணங்கள் (காலவரிசை)',
    inscriptionsTab: 'கல்வெட்டுகள் & செப்பேடுகள்',
    documentsTab: 'ஓலைச்சுவடிகள் & அரச வரலாற்று ஏடுகள்',
    timelineTab: 'காலவரிசை வரலாற்று நிகழ்வுகள்',
    archaeologyTab: 'தொல்லியல் ஆவணங்கள் & கோட்டைகள்',
    referencesTab: 'ஆதார நூற்பட்டியல் & சான்று ஆய்வு',
    searchPlaceholder: 'கல்வெட்டுகள், செப்பேடுகள், ஓலைச்சுவடிகள், மன்னர்கள், ஆண்டுகளைத் தேடுங்கள்...',
    showingCountLabel: 'காலவரிசைப்படி அமைக்கப்பட்ட வரலாற்று ஆவணங்கள்',
    chronologicalOrderBadge: 'காலவரிசைத் தொடர் (கி.மு. 261 – கி.பி. 1568)',
    allEpistemicFilter: 'அனைத்து சான்று வகைகள்',
    verifiedEvidenceBadge: 'உறுதிப்படுத்தப்பட்ட கல்வெட்டு & தொல்லியல் சான்று',
    traditionalAccountBadge: 'மரபுவழி வரலாற்று ஏடு & வம்சாவளி',
    scholarlyInterpretationBadge: 'வரலாற்று ஆய்வாளர்களின் விளக்கம்',
    epistemicBannerTitle: 'சான்று வகைப்பாடு & வரலாற்றுச் சரிபார்ப்பு நெறிமுறை',
    epistemicBannerDesc:
      'இப்பக்கத்தில் உள்ள ஒவ்வொரு வரலாற்று ஆவணமும் (1) உறுதிப்படுத்தப்பட்ட கல்வெட்டு, செப்பேடு மற்றும் தொல்லியல் சான்றுகள், (2) மரபுவழி கோயில் ஏடுகள் மற்றும் வம்சாவளிகள், மற்றும் (3) வரலாற்று ஆய்வாளர்களின் விளக்கங்களைத் தெளிவாக வேறுபடுத்துகிறது.',
    readFullArticleBtn: 'முழு வரலாற்று ஆவணத்தைப் படிக்க',
    sourcesCountSuffix: 'மேற்கோள்கள்',
    eventsCountSuffix: 'காலவரிசை நிகழ்வுகள்',
    clearFiltersBtn: 'வடிகட்டிகளை மீட்டமை',
    emptyStateTitle: 'பொருந்தும் வரலாற்று ஆவணங்கள் எதுவும் இல்லை',
    emptyStateDesc: 'தேடல் சொல்லை மாற்றவும் அல்லது வடிகட்டியை மீட்டமைக்கவும்.',
    backButton: 'ஆவணப் பட்டியலுக்குத் திரும்பு',
    homeButton: 'முகப்பு',
    printButton: 'அச்சிடு / PDF',
    shareButton: 'பகிர்',
    closeButton: 'மூடு',
    copyLinkButton: 'நேரடி இணைப்பை நகலெடு',
    copyTitleAndLinkButton: 'தலைப்பு & இணைப்பை நகலெடு',
    whatsappShareButton: 'WhatsApp இல் பகிர்',
    copiedFeedback: 'இணைப்பு நகலெடுக்கப்பட்டது!',
    printFallbackTitle: 'ஆண்ட்ராய்டு செயலி / வெப்வியூவர் அச்சு முறை',
    printFallbackDesc: 'அச்சிட அல்லது PDF ஆக சேமிக்க வெளிப்புற உலாவியில் திறக்கவும்:',
    openExternalPrintButton: 'வெளிப்புற உலாவியில் திறந்து அச்சிடுக',
    copyPrintUrlButton: 'அச்சு இணைப்பை நகலெடு',
    executiveSummaryHeading: 'நிறைவேற்றுச் சுருக்கம் & ஆவண மூலம்',
    completeDescriptionHeading: 'முழுமையான வரலாற்று விவரம் & ஆவணப் பதிவு',
    transcriptionHeading: 'மூலக் கல்வெட்டு / ஓலைச்சுவடிப் பாடப் பகுதி',
    translationHeading: 'உறுதிப்படுத்தப்பட்ட ஆய்வு மொழிபெயர்ப்பு',
    detailedAnalysisHeading: 'விரிவான வரலாற்று மற்றும் சான்றுப் பகுப்பாய்வு',
    verifiedEvidenceTitle: '1. உறுதிப்படுத்தப்பட்ட கல்வெட்டு, செப்பேடு & தொல்லியல் சான்றுகள்',
    traditionalAccountsTitle: '2. மரபுவழி வரலாற்று ஏடுகள் (மாதளா பஞ்சி) & வம்சாவளிகள்',
    scholarlyInterpretationsTitle: '3. வரலாற்று ஆய்வாளர்களின் விளக்கம் & ஆய்வு வரம்பு',
    chronologicalTimelineHeading: 'தொடர்புடைய வரலாற்று நிகழ்வுகளின் காலவரிசை',
    chronologicalTimelineSub: 'சான்று சரிபார்ப்பு முத்திரைகளுடன் காலவரிசைப்படி அமைக்கப்பட்ட வரலாற்று நிகழ்வுகள்.',
    inscriptionsArchaeologyHeading: 'ஆதாரக் கல்வெட்டுகள், செப்பேடுகள், தொல்லியல் மற்றும் ஆவணச் சான்றுகள்',
    inscriptionsArchaeologySub: 'முதன்மைக் கல்வெட்டுகள், செப்பேட்டுச் சாசனங்கள் மற்றும் வரலாற்றுக் கோட்டைகள்.',
    sourceReferencesHeading: 'முதன்மை ஆதார நூல்கள் & ஆராய்ச்சி மேற்கோள்கள்',
    sourceReferencesSub: 'பதிப்பிக்கப்பட்ட கல்வெட்டுத் தொகுதிகள், ஆவணக் காப்பகப் பட்டியல்கள் மற்றும் ஆய்வு நூல்கள்.',
    relatedRecordsHeading: 'தொடர்புடைய வரலாற்று ஆவணங்கள் & கட்டுரைகள்',
    relatedKeywordsHeading: 'தொடர்புடைய வரலாற்றுக் குறிச்சொற்கள்',
    relevantHashtagsHeading: 'தொடர்புடைய ஹேஷ்டேக்குகள்',
    previousRecordLabel: 'முந்தைய வரலாற்று ஆவணம்',
    nextRecordLabel: 'அடுத்த வரலாற்று ஆவணம்',
    rulerAuthorityLabel: 'மன்னர் / தொகுப்பு அதிகாரம்',
    locationRepoLabel: 'கிடைத்த இடம் / ஆவணக் காப்பகம்',
    dateEraLabel: 'காலவரிசைத் தேதி / சகாப்தம்'
  },
  mr: {
    allRecordsTab: 'सर्व ऐतिहासिक अभिलेख (कालानुक्रमिक)',
    inscriptionsTab: 'शिलालेख आणि ताम्रपट',
    documentsTab: 'हस्तलिखिते आणि राजकीय बखरी',
    timelineTab: 'कालानुक्रमिक ऐतिहासिक घडामोडी',
    archaeologyTab: 'पुरातत्त्वीय नोंदी आणि किल्ले',
    referencesTab: 'संदर्भ ग्रंथसूची आणि पुरावा परीक्षण',
    searchPlaceholder: 'शिलालेख, ताम्रपट, हस्तलिखिते, राजे, तारखा किंवा संदर्भ शोधा...',
    showingCountLabel: 'कालानुक्रमानुसार मांडलेले ऐतिहासिक अभिलेख',
    chronologicalOrderBadge: 'कालानुक्रमिक क्रम (इ.स.पू. २६१ – इ.स. १५६८)',
    allEpistemicFilter: 'सर्व पुरावा वर्ग',
    verifiedEvidenceBadge: 'सत्यापित शिलालेखीय व पुरातत्त्वीय पुरावा',
    traditionalAccountBadge: 'पारंपरिक बखर व वंशावळ वृत्तांत',
    scholarlyInterpretationBadge: 'विद्वत्तापूर्ण इतिहासलेखन विश्लेषण',
    epistemicBannerTitle: 'पुरावा वर्गीकरण आणि ऐतिहासिक पडताळणी मानक',
    epistemicBannerDesc:
      'या पृष्ठावरील प्रत्येक ऐतिहासिक नोंद (१) सत्यापित शिलालेख, ताम्रपट आणि पुरातत्त्वीय पुरावे, (२) पारंपरिक मंदिर इतिवृत्त आणि वंशावळी, आणि (३) इतिहासकारांचे संशोधन विश्लेषण यामध्ये स्पष्ट फरक दर्शवते.',
    readFullArticleBtn: 'संपूर्ण ऐतिहासिक अभिलेख वाचा',
    sourcesCountSuffix: 'संदर्भ',
    eventsCountSuffix: 'कालानुक्रमिक घटना',
    clearFiltersBtn: 'फिल्टर रीसेट करा',
    emptyStateTitle: 'कोणतेही जुळणारे ऐतिहासिक अभिलेख सापडले नाहीत',
    emptyStateDesc: 'कृपया तुमचा शोध शब्द बदला किंवा श्रेणी फिल्टर रीसेट करा.',
    backButton: 'अभिलेख यादीकडे परत जा',
    homeButton: 'मुख्य पृष्ठ',
    printButton: 'प्रिंट / PDF',
    shareButton: 'शेअर करा',
    closeButton: 'बंद करा',
    copyLinkButton: 'थेट लिंक कॉपी करा',
    copyTitleAndLinkButton: 'शीर्षक आणि लिंक कॉपी करा',
    whatsappShareButton: 'WhatsApp वर शेअर करा',
    copiedFeedback: 'क्लिपबोर्डवर कॉपी केले!',
    printFallbackTitle: 'अँड्रॉइड ॲप / वेबव्ह्यूअर प्रिंट मोड',
    printFallbackDesc: 'प्रिंट करण्यासाठी किंवा PDF म्हणून सेव्ह करण्यासाठी बाह्य ब्राउझरमध्ये उघडा:',
    openExternalPrintButton: 'बाह्य ब्राउझरमध्ये उघडा आणि प्रिंट करा',
    copyPrintUrlButton: 'प्रिंट लिंक कॉपी करा',
    executiveSummaryHeading: 'कार्यकारी सारांश आणि अभिलेखीय मूळ',
    completeDescriptionHeading: 'संपूर्ण ऐतिहासिक वर्णन आणि दस्तऐवजीकरण नोंद',
    transcriptionHeading: 'मूळ कोरलेला शिलालेख / हस्तलिखित मजकूर',
    translationHeading: 'सत्यापित विद्वत्तापूर्ण भाषांतर',
    detailedAnalysisHeading: 'सविस्तर ऐतिहासिक आणि पुरावा विश्लेषण',
    verifiedEvidenceTitle: '१. सत्यापित शिलालेख, ताम्रपट आणि पुरातत्त्वीय पुरावे',
    traditionalAccountsTitle: '२. पारंपरिक इतिवृत्त (मादला पांजी) आणि वंशावळ नोंदी',
    scholarlyInterpretationsTitle: '३. विद्वत्तापूर्ण इतिहासलेखन विश्लेषण आणि व्याप्ती',
    chronologicalTimelineHeading: 'संबंधित ऐतिहासिक घडामोडींचा कालानुक्रम',
    chronologicalTimelineSub: 'स्रोत पडताळणी बॅजसह कालानुक्रमानुसार मांडलेल्या ऐतिहासिक घडामोडी.',
    inscriptionsArchaeologyHeading: 'पुष्टी देणारे शिलालेख, ताम्रपट, पुरातत्त्वीय व दस्तऐवजी पुरावे',
    inscriptionsArchaeologySub: 'प्राथमिक भौतिक पुरावे, शिलालेख, ताम्रपट आणि ऐतिहासिक दुर्ग.',
    sourceReferencesHeading: 'प्राथमिक स्रोत संदर्भ आणि विद्वत्तापूर्ण उद्धरणे',
    sourceReferencesSub: 'प्रकाशित शिलालेख खंड, अभिलेखीय तालिका आणि संशोधन ग्रंथ.',
    relatedRecordsHeading: 'संबंधित ऐतिहासिक अभिलेख आणि लेख',
    relatedKeywordsHeading: 'संबंधित ऐतिहासिक कीवर्ड आणि विषय',
    relevantHashtagsHeading: 'संबंधित हॅशटॅग',
    previousRecordLabel: 'मागील ऐतिहासिक अभिलेख',
    nextRecordLabel: 'पुढील ऐतिहासिक अभिलेख',
    rulerAuthorityLabel: 'शासक / संकलन प्राधिकरण',
    locationRepoLabel: 'प्राप्ती स्थळ / संग्रहालय',
    dateEraLabel: 'कालानुक्रमिक तारीख / काळ'
  },
  or: {
    allRecordsTab: 'ସମସ୍ତ ଐତିହାସିକ ଅଭିଲେଖ (କାଳକ୍ରମିକ)',
    inscriptionsTab: 'ଶିଳାଲେଖ ଓ ତାମ୍ରଶାସନ',
    documentsTab: 'ତାଳପତ୍ର ପୋଥି ଓ ରାଜକୀୟ ଇତିବୃତ୍ତ',
    timelineTab: 'କାଳକ୍ରମିକ ଐତିହାସିକ ଘଟଣାବଳୀ',
    archaeologyTab: 'ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ପ୍ରମାଣ ଓ ଦୁର୍ଗ',
    referencesTab: 'ସନ୍ଦର୍ଭ ଗ୍ରନ୍ଥସୂଚୀ ଓ ପ୍ରମାଣ ସମୀକ୍ଷା',
    searchPlaceholder: 'ଶିଳାଲେଖ, ତାମ୍ରଶାସନ, ପୋଥି, ରାଜା, ସମୟ କିମ୍ବା ସନ୍ଦର୍ଭ ଖୋଜନ୍ତୁ...',
    showingCountLabel: 'କାଳକ୍ରମିକ ଭାବେ ସଜ୍ଜିତ ଐତିହାସିକ ଅଭିଲେଖ',
    chronologicalOrderBadge: 'କାଳକ୍ରମିକ କ୍ରମ (ଖ୍ରୀ.ପୂ. ୨୬୧ – ଖ୍ରୀ.ଅ. ୧୫୬୮)',
    allEpistemicFilter: 'ସମସ୍ତ ପ୍ରମାଣ ଶ୍ରେଣୀ',
    verifiedEvidenceBadge: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସାକ୍ଷ୍ୟ',
    traditionalAccountBadge: 'ପାରମ୍ପରିକ ଇତିବୃତ୍ତ ଓ ବଂଶାବଳୀ ବିବରଣୀ',
    scholarlyInterpretationBadge: 'ଐତିହାସିକ ଗବେଷଣା ଓ ବିশ্ଳେଷଣ',
    epistemicBannerTitle: 'ପ୍ରମାଣ ବର୍ଗୀକରଣ ଓ ଐତିହାସିକ ସତ୍ୟାପନ ମାନଦଣ୍ଡ',
    epistemicBannerDesc:
      'ଏହି ପୃଷ୍ଠାର ପ୍ରତ୍ୟେକ ଐତିହାସିକ ଅଭିଲେଖ (୧) ପ୍ରମାଣିତ ଶିଳାଲେଖ, ତାମ୍ରଶାସନ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସାକ୍ଷ୍ୟ, (୨) ପାରମ୍ପରିକ ମନ୍ଦିର ଇତିବୃତ୍ତ (ମାଦଳା ପାଞ୍ଜି) ଓ ବଂଶାବଳୀ, ଏବଂ (୩) ଗବେଷକମାନଙ୍କର ଐତିହାସିକ ବିଶ୍ଳେଷଣ ମଧ୍ୟରେ ସ୍ପଷ୍ଟ ପାର୍ଥକ୍ୟ ଦର୍ଶାଏ।',
    readFullArticleBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ଐତିହାସିକ ଅଭିଲେଖ ପଢ଼ନ୍ତୁ',
    sourcesCountSuffix: 'ସନ୍ଦର୍ଭ',
    eventsCountSuffix: 'କାଳକ୍ରମିକ ଘଟଣା',
    clearFiltersBtn: 'ଫିଲ୍ଟର୍ ରିସେଟ୍ କରନ୍ତୁ',
    emptyStateTitle: 'କୌଣସି ମେଳ ଖାଉଥିବା ଐତିହାସିକ ଅଭିଲେଖ ମିଳିଲା ନାହିଁ',
    emptyStateDesc: 'ଦୟାକରି ଆପଣଙ୍କ ସନ୍ଧାନ ଶବ୍ଦ ବଦଳାନ୍ତୁ କିମ୍ବା ଫିଲ୍ଟର୍ ରିସେଟ୍ କରନ୍ତୁ।',
    backButton: 'ଅଭିଲେଖ ତାଲିକାକୁ ଫେରନ୍ତୁ',
    homeButton: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
    printButton: 'ପ୍ରିଣ୍ଟ / PDF',
    shareButton: 'ସେୟାର୍ କରନ୍ତୁ',
    closeButton: 'ବନ୍ଦ କରନ୍ତୁ',
    copyLinkButton: 'ସିଧା ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
    copyTitleAndLinkButton: 'ଶୀର୍ଷକ ଓ ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
    whatsappShareButton: 'WhatsApp ରେ ସେୟାର୍ କରନ୍ତୁ',
    copiedFeedback: 'କ୍ଲିପବୋର୍ଡରେ କପି ହେଲା!',
    printFallbackTitle: 'ଆଣ୍ଡ୍ରଏଡ୍ ଆପ୍ / ୱେବ୍-ভিଉଅର୍ ପ୍ରିଣ୍ଟ ମୋଡ୍',
    printFallbackDesc: 'ପ୍ରିଣ୍ଟ କିମ୍ବା PDF ଭାବେ ସେଭ୍ କରିବାକୁ ବାହ୍ୟ ବ୍ରାଉଜରରେ ଖୋଲନ୍ତୁ:',
    openExternalPrintButton: 'ବାହ୍ୟ ବ୍ରାଉଜରରେ ଖୋଲି ପ୍ରିଣ୍ଟ କରନ୍ତୁ',
    copyPrintUrlButton: 'ପ୍ରିଣ୍ଟ ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
    executiveSummaryHeading: 'କାର୍ଯ୍ୟନିର୍ବାହୀ ସାରାଂଶ ଓ ଅଭିଲେଖୀୟ ଉତ୍ସ',
    completeDescriptionHeading: 'ସମ୍ପୂର୍ଣ୍ଣ ଐତିହାସିକ ବିବରଣୀ ଓ ଦଲିଲ ରେକର୍ଡ',
    transcriptionHeading: 'ମୂଳ ଉତ୍କୀର୍ଣ୍ଣ ଶିଳାଲେଖ / ତାଳପତ୍ର ପୋଥି ପାଠ',
    translationHeading: 'ପ୍ରମାଣିତ ଗବେଷଣା ଅନୁବାଦ',
    detailedAnalysisHeading: 'ବିସ୍ତୃତ ଐତିହାସିକ ଓ ପ୍ରମାଣ ବିଶ୍ଳେଷଣ',
    verifiedEvidenceTitle: '୧. ପ୍ରମାଣିତ ଶିଳାଲେଖ, ତାମ୍ରଶାସନ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସାକ୍ଷ୍ୟ',
    traditionalAccountsTitle: '୨. ପାରମ୍ପରିକ ଇତିବୃତ୍ତ (ମାଦଳା ପାଞ୍ଜି) ଓ ବଂଶାବଳୀ ବିବରଣୀ',
    scholarlyInterpretationsTitle: '୩. ଗବେଷକମାନଙ୍କର ଐତିହାସିକ ବିଶ୍ଳେଷଣ ଓ ପରିସର',
    chronologicalTimelineHeading: 'ସମ୍ପର୍କିତ ଐତିହାସିକ ଘଟଣାବଳୀର କାଳକ୍ରମ',
    chronologicalTimelineSub: 'ଉତ୍ସ ପ୍ରମାଣ ବ୍ୟାଜ୍ ସହିତ କାଳକ୍ରମିକ ଭାବେ ସଜ୍ଜିତ ଐତିହାସିକ ଘଟଣାକ୍ରମ।',
    inscriptionsArchaeologyHeading: 'ସহାୟକ ଶିଳାଲେଖ, ତାମ୍ରଶାସନ, ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଓ ଦଲିଲ ପ୍ରମାଣ',
    inscriptionsArchaeologySub: 'ମୌଳିକ ଭୌତିକ ପ୍ରମାଣ, ଶିଳାଲେଖ, ତାମ୍ରଫଳକ ଓ ଐତିହାସିକ ଦୁର୍ଗ।',
    sourceReferencesHeading: 'ପ୍ରାଥମିକ ଉତ୍ସ ସନ୍ଦର୍ଭ ଓ ଗବେଷଣା ଉଦ୍ଧୃତି',
    sourceReferencesSub: 'ପ୍ରକାଶିତ ଶିଳାଲେଖ ଖଣ୍ଡ, ଅଭିଲେଖାଗାର ତାଲିକା ଓ ଗବେଷଣା ଗ୍ରନ୍ଥ।',
    relatedRecordsHeading: 'ସମ୍ପର୍କିତ ଐତିହାସିକ ଅଭିଲେଖ ଓ ପ୍ରବନ୍ଧ',
    relatedKeywordsHeading: 'ସମ୍ପର୍କିତ ଐତିହାସିକ କିୱାର୍ଡ ଓ ବିଷୟ',
    relevantHashtagsHeading: 'ପ୍ରାସଙ୍ଗିକ ହ୍ୟାଶଟ୍ୟାଗ୍',
    previousRecordLabel: 'ପୂର୍ବବର୍ତ୍ତୀ ଐତିହାସିକ ଅଭିଲେଖ',
    nextRecordLabel: 'ପରବର୍ତ୍ତୀ ଐତିହାସିକ ଅଭିଲେଖ',
    rulerAuthorityLabel: 'ଶାସକ / ସଂକଳନ କର୍ତ୍ତୃପକ୍ଷ',
    locationRepoLabel: 'ପ୍ରାପ୍ତି ସ୍ଥାନ / ସଂଗ୍ରହାଳୟ',
    dateEraLabel: 'କାଳକ୍ରମିକ ସମୟ / ଯୁଗ'
  },
  bn: {
    allRecordsTab: 'সকল ঐতিহাসিক अभिलेख (কালানুক্রমিক)',
    inscriptionsTab: 'শিলালিপি ও তাম্রশাসন',
    documentsTab: 'পাণ্ডুলিপি ও রাজকীয় ইতিবৃত্ত',
    timelineTab: 'কালানুক্রমিক ঐতিহাসিক ঘটনা',
    archaeologyTab: 'প্রত্নতাত্ত্বিক নিদর্শন ও দুর্গ',
    referencesTab: 'তথ্যসূত্র গ্রন্থপঞ্জি ও প্রমাণ পর্যালোচনা',
    searchPlaceholder: 'শিলালিপি, তাম্রশাসন, পাণ্ডুলিপি, শাসক, তারিখ বা তথ্যসূত্র খুঁজুন...',
    showingCountLabel: 'কালানুক্রমিকভাবে সাজানো ঐতিহাসিক নথি',
    chronologicalOrderBadge: 'কালানুক্রমিক ক্রম (খ্রিস্টপূর্ব ২৬১ – ১৫৬৮ খ্রিস্টাব্দ)',
    allEpistemicFilter: 'সকল প্রমাণ বিভাগ',
    verifiedEvidenceBadge: 'যাচাইকৃত শিলালিপি ও প্রত্নতাত্ত্বিক প্রমাণ',
    traditionalAccountBadge: 'ঐতিহ্যবাহী ইতিবৃত্ত ও বংশলতিকা বিবরণ',
    scholarlyInterpretationBadge: 'গবেষণামূলক ইতিহাসতাত্ত্বিক বিশ্লেষণ',
    epistemicBannerTitle: 'প্রমাণ শ্রেণীবিভাগ ও ঐতিহাসিক যাচাইকরণ নীতি',
    epistemicBannerDesc:
      'এই পৃষ্ঠার প্রতিটি ঐতিহাসিক নথি (১) যাচাইকৃত শিলালিপি, তাম্রশাসন ও প্রত্নতাত্ত্বিক প্রমাণ, (২) ঐতিহ্যবাহী মন্দির ইতিবৃত্ত (মাদলা পাঞ্জি) ও বংশলতিকা, এবং (৩) গবেষকদের ইতিহাসতাত্ত্বিক বিশ্লেষণের মধ্যে স্পষ্ট পার্থক্য বজায় রাখে।',
    readFullArticleBtn: 'সম্পূর্ণ ঐতিহাসিক নথি পড়ুন',
    sourcesCountSuffix: 'তথ্যসূত্র',
    eventsCountSuffix: 'কালানুক্রমিক ঘটনা',
    clearFiltersBtn: 'ফিল্টার রিসেট করুন',
    emptyStateTitle: 'কোনো মিলে যাওয়া ঐতিহাসিক নথি পাওয়া যায়নি',
    emptyStateDesc: 'অনুগ্রহ করে আপনার অনুসন্ধান শব্দ পরিবর্তন করুন বা ফিল্টার রিসেট করুন।',
    backButton: 'নথি তালিকায় ফিরে যান',
    homeButton: 'হোম',
    printButton: 'প্রিন্ট / PDF',
    shareButton: 'শেয়ার করুন',
    closeButton: 'বন্ধ করুন',
    copyLinkButton: 'সরাসরি লিঙ্ক কপি করুন',
    copyTitleAndLinkButton: 'শিরোনাম ও লিঙ্ক কপি করুন',
    whatsappShareButton: 'WhatsApp-এ শেয়ার করুন',
    copiedFeedback: 'ক্লিপবোর্ডে কপি হয়েছে!',
    printFallbackTitle: 'অ্যান্ড্রয়েড অ্যাপ / ওয়েবভিউয়ার প্রিন্ট মোড',
    printFallbackDesc: 'প্রিন্ট বা PDF হিসেবে সংরক্ষণ করতে বাহ্যিক ব্রাউজারে খুলুন:',
    openExternalPrintButton: 'বাহ্যিক ব্রাউজারে খুলে প্রিন্ট করুন',
    copyPrintUrlButton: 'প্রিন্ট লিঙ্ক কপি করুন',
    executiveSummaryHeading: 'কার্যনির্বাহী সারাংশ ও আর্কাইভাল উৎস',
    completeDescriptionHeading: 'সম্পূর্ণ ঐতিহাসিক বিবরণ ও প্রামাণ্য নথি',
    transcriptionHeading: 'মূল খোদাইকৃত শিলালিপি / পাণ্ডুলিপি পাঠ',
    translationHeading: 'যাচাইকৃত গবেষণামূলক অনুবাদ',
    detailedAnalysisHeading: 'বিস্তারিত ঐতিহাসিক ও প্রমাণ বিশ্লেষণ',
    verifiedEvidenceTitle: '১. যাচাইকৃত শিলালিপি, তাম্রশাসন ও প্রত্নতাত্ত্বিক প্রমাণ',
    traditionalAccountsTitle: '২. ঐতিহ্যবাহী ইতিবৃত্ত (মাদলা পাঞ্জি) ও বংশলতিকা বিবরণ',
    scholarlyInterpretationsTitle: '৩. গবেষকদের ইতিহাসতাত্ত্বিক বিশ্লেষণ ও পরিধি',
    chronologicalTimelineHeading: 'সম্পর্কিত ঐতিহাসিক ঘটনাবলীর কালানুক্রম',
    chronologicalTimelineSub: 'উৎস যাচাইকরণ ব্যাজসহ কালানুক্রমিকভাবে সাজানো ঐতিহাসিক বিকাশ।',
    inscriptionsArchaeologyHeading: 'সহায়ক শিলালিপি, তাম্রশাসন, প্রত্নতাত্ত্বিক ও দলিল প্রমাণ',
    inscriptionsArchaeologySub: 'প্রাথমিক ভৌত নিদর্শন, শিলালিপি, তাম্রশাসন এবং ঐতিহাসিক দুর্গ।',
    sourceReferencesHeading: 'প্রাথমিক উৎস তথ্যসূত্র ও গবেষণামূলক উদ্ধৃতি',
    sourceReferencesSub: 'প্রকাশিত প্রত্নলিপি খণ্ড, আর্কাইভাল ক্যাটালগ এবং গবেষণা মনোগ্রাফ।',
    relatedRecordsHeading: 'সম্পর্কিত ঐতিহাসিক নথি ও নিবন্ধ',
    relatedKeywordsHeading: 'সম্পর্কিত ঐতিহাসিক কীওয়ার্ড ও বিষয়',
    relevantHashtagsHeading: 'প্রাসঙ্গিক হ্যাশট্যাগ',
    previousRecordLabel: 'পূর্ববর্তী ঐতিহাসিক নথি',
    nextRecordLabel: 'পরবর্তী ঐতিহাসিক নথি',
    rulerAuthorityLabel: 'শাসক / সংকলন কর্তৃপক্ষ',
    locationRepoLabel: 'প্রাপ্তিস্থান / সংরক্ষণাগার',
    dateEraLabel: 'কালানুক্রমিক তারিখ / যুগ'
  }
};

function hasAppInventorBridge(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window as unknown as { AppInventor?: { setWebViewString?: (val: string) => void } };
  return Boolean(w.AppInventor && typeof w.AppInventor.setWebViewString === 'function');
}

function isAndroidWebViewEnvironment(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  if (hasAppInventorBridge()) return true;
  const ua = navigator.userAgent || '';
  return /wv|Version\/\d+\.\d+.*Chrome\/\d+.*Mobile|AppInventor/i.test(ua);
}

function toHashtagToken(text: string): string {
  return text
    .replace(/[^\p{L}\p{N}_]+/gu, '')
    .trim();
}

export const HistoricalRecordsExplorer: React.FC<HistoricalRecordsExplorerProps> = ({
  defaultCategory = 'all',
  initialRecordId = null,
  pageBadge,
  pageTitle,
  pageSubtitle,
  basePath,
  onNavigate,
  externalInscriptions,
  externalDocuments,
  externalEvents,
  externalMonuments,
  headerIcon
}) => {
  const { language, setLanguage, t } = useLanguage();
  const ui = HISTORICAL_RECORDS_UI[language] || HISTORICAL_RECORDS_UI.en;
  const archiveBase = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
  const fallbackArchiveImg = `${archiveBase}copper_plate_charter.jpg`;

  const [activeCategory, setActiveCategory] = useState<HistoricalRecordCategory>(defaultCategory);
  const [epistemicFilter, setEpistemicFilter] = useState<'all' | EpistemicTier>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(initialRecordId || null);

  // Scroll & Navigation state
  const savedListingScrollYRef = useRef<number>(0);
  const shouldRestoreScrollRef = useRef<boolean>(false);
  const [hasInternalHistory, setHasInternalHistory] = useState(false);

  // Print, Share & Collapsible Article Actions menu state
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [isPrintFallbackOpen, setIsPrintFallbackOpen] = useState(false);
  const [printUrlCopied, setPrintUrlCopied] = useState(false);
  const articleContainerRef = useRef<HTMLElement | null>(null);
  const leadImageRef = useRef<HTMLImageElement | null>(null);

  // Load synchronous localized canonical datasets for all 8 languages (with any extra custom records appended)
  const inscriptions = useMemo(() => {
    const canonical = getCanonicalInscriptions(language);
    if (!externalInscriptions || externalInscriptions.length === 0) return canonical;
    const canonicalIds = new Set(canonical.map(c => c.id));
    return [...canonical, ...externalInscriptions.filter(e => !canonicalIds.has(e.id))];
  }, [externalInscriptions, language]);

  const documents = useMemo(() => {
    const canonical = getCanonicalDocuments(language);
    if (!externalDocuments || externalDocuments.length === 0) return canonical;
    const canonicalIds = new Set(canonical.map(c => c.id));
    return [...canonical, ...externalDocuments.filter(e => !canonicalIds.has(e.id))];
  }, [externalDocuments, language]);

  const timelineEvents = useMemo(() => {
    const canonical = getCanonicalTimelineEvents(language);
    if (!externalEvents || externalEvents.length === 0) return canonical;
    const canonicalIds = new Set(canonical.map(c => c.id));
    return [...canonical, ...externalEvents.filter(e => !canonicalIds.has(e.id))];
  }, [externalEvents, language]);

  const locations = useMemo(() => getCanonicalLocations(language), [language]);

  const monuments = useMemo(() => {
    const canonical = getCanonicalMonuments(language);
    if (!externalMonuments || externalMonuments.length === 0) return canonical;
    const canonicalIds = new Set(canonical.map(c => c.id));
    return [...canonical, ...externalMonuments.filter(e => !canonicalIds.has(e.id))];
  }, [externalMonuments, language]);

  const claims = useMemo(() => getCanonicalClaims(language), [language]);
  const ref74Ui = REFERENCE_70_UI_LABELS[language] || REFERENCE_70_UI_LABELS.en;

  // Localized helpers for region, claim status, copyright license, monograph categories & print masthead across all 8 languages
  const localizeRegion = useMemo(() => {
    const regionMap: Record<LanguageCode, Record<string, string>> = {
      en: {
        Odra: 'Odra',
        Kalinga: 'Kalinga',
        Utkala: 'Utkala',
        'Deccan & South': 'Deccan & South India'
      },
      hi: {
        Odra: 'ओड्र (Odra)',
        Kalinga: 'कलिंग (Kalinga)',
        Utkala: 'उत्कल (Utkala)',
        'Deccan & South': 'दक्कन एवं दक्षिण भारत'
      },
      te: {
        Odra: 'ఓడ్ర (Odra)',
        Kalinga: 'కళింగ (Kalinga)',
        Utkala: 'ఉత్కళ (Utkala)',
        'Deccan & South': 'దక్కన్ & దక్షిణ భారతదేశం'
      },
      kn: {
        Odra: 'ಓಡ್ರ (Odra)',
        Kalinga: 'ಕಳಿಂಗ (Kalinga)',
        Utkala: 'ಉತ್ಕಲ (Utkala)',
        'Deccan & South': 'ದಖನ್ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತ'
      },
      ta: {
        Odra: 'ஒட்ர (Odra)',
        Kalinga: 'கலிங்கம் (Kalinga)',
        Utkala: 'உத்கலம் (Utkala)',
        'Deccan & South': 'தக்காணம் & தென்னிந்தியா'
      },
      mr: {
        Odra: 'ओड्र (Odra)',
        Kalinga: 'कलिंग (Kalinga)',
        Utkala: 'उत्कल (Utkala)',
        'Deccan & South': 'दख्खन आणि दक्षिण भारत'
      },
      or: {
        Odra: 'ଓଡ୍ର (Odra)',
        Kalinga: 'କଳିଙ୍ଗ (Kalinga)',
        Utkala: 'ଉତ୍କଳ (Utkala)',
        'Deccan & South': 'ଦାକ୍ଷିଣାତ୍ୟ ଓ ଦକ୍ଷିଣ ଭାରତ'
      },
      bn: {
        Odra: 'ওড্র (Odra)',
        Kalinga: 'কলিঙ্গ (Kalinga)',
        Utkala: 'উৎকল (Utkala)',
        'Deccan & South': 'দাক্ষিণাত্য ও দক্ষিণ ভারত'
      }
    };
    const dict = regionMap[language] || regionMap.en;
    return (reg: string) => dict[reg] || reg;
  }, [language]);

  const localizeClaimStatus = useMemo(() => {
    const statusMap: Record<LanguageCode, Record<string, string>> = {
      en: {
        'Verified Supported': 'Verified Epigraphic & Archival Support',
        'Contested Interpretation': 'Scholarly & Chronological Interpretation Under Debate',
        'Requires Further Research': 'Requires Further Epigraphic & Archival Research'
      },
      hi: {
        'Verified Supported': 'सत्यापित शिलालेखीय एवं अभिलेखीय प्रमाण समर्थित',
        'Contested Interpretation': 'विद्वानों की कालानुक्रमिक व्याख्या एवं तुलनात्मक विमर्श',
        'Requires Further Research': 'अतिरिक्त पुरालेखीय एवं अभिलेखीय शोध आवश्यक'
      },
      te: {
        'Verified Supported': 'ధృవీకరించబడిన శాసన మరియు పురాతన పత్ర ఆధారాలు',
        'Contested Interpretation': 'పండితుల కాలక్రమానుసార విశ్లేషణ మరియు చర్చనీయాంశం',
        'Requires Further Research': 'మరింత శాసన మరియు చారిత్రక పరిశోధన అవసరం'
      },
      kn: {
        'Verified Supported': 'ದೃಢೀಕರಿಸಿದ ಶಾಸನ ಮತ್ತು ಪತ್ರಾಗಾರ ಆಧಾರಿತ ಬೆಂಬಲ',
        'Contested Interpretation': 'ವಿದ್ವಾಂಸರ ಕಾಲಾನುಕ್ರಮ ವ್ಯಾಖ್ಯಾನ ಮತ್ತು ಚರ್ಚೆ',
        'Requires Further Research': 'ಹೆಚ್ಚಿನ ಶಾಸನ ಮತ್ತು ಐತಿಹಾಸಿಕ ಸಂಶೋಧನೆ ಅಗತ್ಯವಿದೆ'
      },
      ta: {
        'Verified Supported': 'சரிபார்க்கப்பட்ட கல்வெட்டு மற்றும் ஆவண ஆதாரம்',
        'Contested Interpretation': 'அறிஞர்களின் காலவரிசை ஆய்வு மற்றும் விவாதம்',
        'Requires Further Research': 'மேலும் கல்வெட்டு மற்றும் வரலாற்று ஆய்வு தேவை'
      },
      mr: {
        'Verified Supported': 'सत्यापित शिलालेखीय आणि अभिलेखीय पुराव्यांद्वारे समर्थित',
        'Contested Interpretation': 'विद्वानांचे कालानुक्रमिक विश्लेषण आणि तुलनात्मक चर्चा',
        'Requires Further Research': 'अधिक शिलालेखीय आणि ऐतिहासिक संशोधनाची आवश्यकता'
      },
      or: {
        'Verified Supported': 'ଯାଞ୍ଚকৃত ଶିଳାଲେଖ ଓ ଅଭିଲେଖୀୟ ପ୍ରମାଣ ଦ୍ୱାରା ସମର୍ଥିତ',
        'Contested Interpretation': 'ଐତିହାସିକ ଓ କାଳାନୁକ୍ରମିକ ବ୍ୟାଖ୍ୟା ବିତର୍କିତ',
        'Requires Further Research': 'ଅଧିକ ଶିଳାଲେଖ ଓ ଐତିହାସିକ ଗବେଷଣା ଆବଶ୍ୟକ'
      },
      bn: {
        'Verified Supported': 'যাচাইকৃত প্রত্নলিপি ও আর্কাইভাল প্রমাণ দ্বারা সমর্থিত',
        'Contested Interpretation': 'পণ্ডিতদের কালানুক্রমিক ব্যাখ্যা ও তুলনামূলক আলোচনা',
        'Requires Further Research': 'অধিকতর প্রত্নলিপি ও ঐতিহাসিক গবেষণা প্রয়োজন'
      }
    };
    const dict = statusMap[language] || statusMap.en;
    return (st: string) => dict[st] || st;
  }, [language]);

  const localizeLicense = useMemo(() => {
    const licenseMap: Record<LanguageCode, Record<string, string>> = {
      en: {
        'Public Domain / Open Archival Commons': 'Public Domain / Open Archival Commons',
        'Public Domain': 'Public Domain (Open Heritage Archive)'
      },
      hi: {
        'Public Domain / Open Archival Commons': 'सार्वजनिक डोमेन / ओपन आर्काइवल कॉमन्स',
        'Public Domain': 'सार्वजनिक डोमेन (मुक्त विरासत अभिलेखागार)'
      },
      te: {
        'Public Domain / Open Archival Commons': 'పబ్లిక్ డొమైన్ / ఓపెన్ ఆర్కైవల్ కామన్స్',
        'Public Domain': 'పబ్లిక్ డొమైన్ (ఓపెన్ హెరిటేజ్ ఆర్కైవ్)'
      },
      kn: {
        'Public Domain / Open Archival Commons': 'ಸಾರ್ವಜನಿಕ ಡೊಮೇನ್ / ಮುಕ್ತ ಪತ್ರಾಗಾರ ಕಾಮನ್ಸ್',
        'Public Domain': 'ಸಾರ್ವಜನಿಕ ಡೊಮೇನ್ (ಮುಕ್ತ ಪರಂಪರೆ ಪತ್ರಾಗಾರ)'
      },
      ta: {
        'Public Domain / Open Archival Commons': 'பொது களம் / திறந்த ஆவணக் காப்பகம்',
        'Public Domain': 'பொது களம் (திறந்த பாரம்பரிய ஆவணகம்)'
      },
      mr: {
        'Public Domain / Open Archival Commons': 'सार्वजनिक डोमेन / मुक्त अभिलेखीय कॉमन्स',
        'Public Domain': 'सार्वजनिक डोमेन (मुक्त वारसा अभिलेखागार)'
      },
      or: {
        'Public Domain / Open Archival Commons': 'ସାର୍ବଜନୀନ ଡୋମେନ୍ / ମୁକ୍ତ ଅଭିଲେଖୀୟ କମନ୍ସ',
        'Public Domain': 'ସାର୍ବଜନୀନ ଡୋମେନ୍ (ମୁକ୍ତ ଐତିହ୍ୟ ଅଭିଲେଖାଗାର)'
      },
      bn: {
        'Public Domain / Open Archival Commons': 'পাবলিক ডোমেইন / ওপেন আর্কাইভাল কমন্স',
        'Public Domain': 'পাবলিক ডোমেইন (মুক্ত ঐতিহ্য আর্কাইভ)'
      }
    };
    const dict = licenseMap[language] || licenseMap.en;
    return (lic: string) => dict[lic] || lic;
  }, [language]);

  const localizeMonographCategory = useMemo(() => {
    const catMap: Record<LanguageCode, Record<string, string>> = {
      en: {
        'Imperial History & Military Campaigns': 'Imperial History & Military Campaigns',
        'Epigraphy & Copper Plate Charters': 'Epigraphy & Copper Plate Charters',
        'Temple Patronage & Dharmashastra': 'Temple Patronage & Dharmashastra'
      },
      hi: {
        'Imperial History & Military Campaigns': 'साम्राज्यिक इतिहास एवं सैन्य अभियान',
        'Epigraphy & Copper Plate Charters': 'पुरालेख एवं ताम्रपत्र राज्यादेश',
        'Temple Patronage & Dharmashastra': 'मंदिर संरक्षण एवं धर्मशास्त्र'
      },
      te: {
        'Imperial History & Military Campaigns': 'సామ్రాజ్య చరిత్ర & సైనిక దండయాత్రలు',
        'Epigraphy & Copper Plate Charters': 'శాసన ఆధారాలు & తామ్రశాసన రాజశాసనాలు',
        'Temple Patronage & Dharmashastra': 'ఆలయ పోషణ & ధర్మశాస్త్రం'
      },
      kn: {
        'Imperial History & Military Campaigns': 'ಸಾಮ್ರಾಜ್ಯದ ಇತಿಹಾಸ ಮತ್ತು ಸೈನಿಕ ದಂಡಯಾತ್ರೆಗಳು',
        'Epigraphy & Copper Plate Charters': 'ಶಾಸನಗಳು ಮತ್ತು ತಾಮ್ರಪಟ ರಾಜಶಾಸನಗಳು',
        'Temple Patronage & Dharmashastra': 'ದೇವಾಲಯ ಪೋಷಣೆ ಮತ್ತು ಧರ್ಮಶಾಸ್ತ್ರ'
      },
      ta: {
        'Imperial History & Military Campaigns': 'பேரரசு வரலாறு & இராணுவப் படையெடுப்புகள்',
        'Epigraphy & Copper Plate Charters': 'கல்வெட்டுகள் & செப்பேட்டுச் சாசனங்கள்',
        'Temple Patronage & Dharmashastra': 'கோயில் திருப்பணி & தர்மசாஸ்திரம்'
      },
      mr: {
        'Imperial History & Military Campaigns': 'साम्राज्य इतिहास आणि लष्करी मोहिमा',
        'Epigraphy & Copper Plate Charters': 'शिलालेख आणि ताम्रपट सनदा',
        'Temple Patronage & Dharmashastra': 'मंदिर आश्रय आणि धर्मशास्त्र'
      },
      or: {
        'Imperial History & Military Campaigns': 'ସାମ୍ରାଜ୍ୟିକ ଇତିହାସ ଓ ସାମରିକ ଅଭିଯାନ',
        'Epigraphy & Copper Plate Charters': 'ଶିଳାଲେଖ ଓ ତାମ୍ରଫଳକ ରାଜଶାସନ',
        'Temple Patronage & Dharmashastra': 'ମନ୍ଦିର ପୃଷ୍ଠପୋଷକତା ଓ ଧର୍ମଶାସ୍ତ୍ର'
      },
      bn: {
        'Imperial History & Military Campaigns': 'সাম্রাজ্যিক ইতিহাস ও সামরিক অভিযান',
        'Epigraphy & Copper Plate Charters': 'প্রত্নলিপি ও তাম্রশাসন সনদ',
        'Temple Patronage & Dharmashastra': 'মন্দির পৃষ্ঠপোষকতা ও ধর্মশাস্ত্র'
      }
    };
    const dict = catMap[language] || catMap.en;
    return (cat: string) => dict[cat] || '';
  }, [language]);

  // Curated + text-matched 74-Name Community Reference Dataset resolver for each Historical Record
  const resolveRecord74References = useMemo(() => {
    const byOrder = new Map<number, Reference70Entry>();
    MASTER_70_REFERENCE_REGISTRY.forEach(entry => byOrder.set(entry.order, entry));

    // Curated historical & regional cross-reference map for each canonical record ID
    // (1-74 orders from MASTER_70_REFERENCE_REGISTRY, where #56 is Bhoi and #70-#74 are Bhoyudu, Bhoyilu, Boyidu, Boyilu, Pedda-Bhoyudu)
    const curatedOrdersByRecordId: Record<string, number[]> = {
      // Inscriptions
      insc_veligalani_1458: [43, 66, 28, 44, 45, 1, 2, 12, 23, 53, 54, 70, 74],
      insc_lingaraja_1452: [43, 66, 28, 31, 44, 45, 47, 48, 53, 54, 55, 1],
      insc_simhachalam_prataparudra: [43, 66, 44, 4, 28, 45, 1, 12, 23, 53, 54, 70, 71],
      insc_hathigumpha: [44, 4, 28, 31, 45, 50, 66, 53],
      insc_srirangam_1464: [43, 66, 28, 44, 45, 1, 17, 23, 53, 54],
      // Documents
      doc_madala_panji: [43, 66, 28, 44, 45, 48, 53, 54, 55, 56, 1, 70, 74],
      doc_sarasvati_vilasa: [43, 66, 28, 44, 45, 1, 12, 42, 54],
      // Timeline events
      ev_kharavela_1st_bce: [44, 4, 28, 31, 45, 53, 66],
      ev_jasma_devi_1120: [28, 29, 26, 27, 35, 39, 40, 1, 66],
      ev_siddharameshwara_1150: [39, 40, 9, 12, 17, 23, 28, 1],
      ev_1434: [43, 66, 28, 44, 45, 42, 53, 54, 1],
      ev_1448: [43, 66, 44, 4, 28, 1, 2, 12, 23, 53, 70, 71, 74],
      ev_kolletikota_gajapathi_garrison: [43, 66, 28, 44, 1, 2, 3, 12, 23, 53, 70, 71, 72, 73, 74],
      ev_1458: [43, 66, 28, 44, 45, 1, 12, 23, 53, 54, 70],
      ev_1464: [43, 66, 28, 44, 1, 17, 23, 53, 54],
      ev_1489: [43, 66, 28, 44, 45, 48, 53, 54, 1],
      ev_1515: [43, 66, 44, 28, 45, 1, 12, 23, 53, 70, 72],
      ev_1568: [43, 66, 28, 44, 45, 53, 54, 55, 56, 1],
      // Archaeological locations
      loc_barabati_fort: [43, 66, 28, 31, 44, 45, 53, 54, 55, 56, 1],
      loc_kondapalli_fort: [43, 66, 44, 28, 1, 2, 12, 23, 53, 70, 71, 72, 73, 74],
      loc_udayagiri_fort: [43, 66, 28, 44, 1, 9, 12, 23, 39, 53, 70, 72, 74],
      loc_simhachalam_complex: [43, 66, 44, 4, 28, 45, 1, 12, 23, 53, 70],
      // Monuments
      mon_puri_jagannath: [43, 66, 28, 44, 45, 48, 53, 54, 56, 1],
      mon_konark_sun: [66, 28, 44, 45, 48, 53, 54, 1],
      mon_simhachalam: [43, 66, 44, 4, 28, 1, 12, 23, 53, 70],
      mon_lingaraja: [43, 66, 28, 31, 44, 45, 48, 53, 54, 1],
      // Epistemic claims & Bibliographic corpora
      clm_01: [43, 66, 28, 44, 45, 42, 1, 12, 53, 54],
      clm_02: [43, 66, 28, 44, 45, 56, 1, 26, 27, 35],
      clm_03: [43, 66, 28, 44, 1, 12, 23, 53, 70, 71, 72, 73, 74],
      'ref-epigraphic': [43, 66, 28, 44, 45, 4, 1, 12, 23, 53, 54],
      'ref-chronicles': [43, 66, 28, 44, 45, 56, 1, 12, 23, 70, 71, 72, 73, 74],
      'ref-modern-scholarship': [43, 66, 28, 31, 44, 45, 1, 12, 26, 27, 39, 53, 54, 56]
    };

    return (recId: string, textCorpus: string): Reference70Entry[] => {
      const selected = new Map<number, Reference70Entry>();
      const curatedOrders = curatedOrdersByRecordId[recId] || [43, 66, 28, 44, 45, 1, 12, 53, 54];
      curatedOrders.forEach(ord => {
        const entry = byOrder.get(ord);
        if (entry) selected.set(entry.order, entry);
      });
      const textMatched = matchReference70Terms(textCorpus);
      textMatched.forEach(entry => {
        if (!selected.has(entry.order)) {
          selected.set(entry.order, entry);
        }
      });
      return Array.from(selected.values()).slice(0, 12);
    };
  }, []);

  // 8-language localized labels & analytical templates for record construction and detail view sections
  const recLoc = useMemo(() => {
    const map: Record<
      LanguageCode,
      {
        scriptPaleographyLabel: string;
        inscribedLanguageLabel: string;
        dynastyLabel: string;
        epigraphiaIndicaKeyword: string;
        copperPlateEpigraphyKeyword: string;
        asiAttribution: string;
        inscVerifiedPrefix: (ctx: string, script: string, langName: string, era: string, loc: string) => string;
        inscTraditionalText: string;
        inscScholarlyText: (refs: string, dynasty: string) => string;
        origTranscriptionLabel: string;
        translationLabel: string;
        manuscriptSuffix: string;
        palmLeafKeyword: string;
        archivalRepoKeyword: string;
        authorBodyLabel: string;
        approxDateLabel: string;
        origLanguageLabel: string;
        custodialCollectionLabel: string;
        provenanceCustodyLabel: string;
        copyrightLicenseLabel: string;
        docVerifiedText: (loc: string, prov: string) => string;
        docTraditionalFallback: string;
        docScholarlyExcerptPrefix: string;
        corroboratingMonumentsLabel: string;
        primarySourcesLabel: string;
        evTraditionalFallback: string;
        medievalCitadelSuffix: string;
        regionSuffix: string;
        gajapathiAdminAuthority: string;
        asiStateEpigraphyAttr: string;
        ancientNameLabel: string;
        historicalRegionLabel: string;
        modernDistrictStateLabel: string;
        inscriptionsFoundLabel: string;
        locTraditionalText: (state: string) => string;
        locScholarlyPrefix: (summary: string, inscs: string) => string;
        onSiteEpigraphicBadge: string;
        asiConservationPrefix: string;
        architecturalStyleLabel: string;
        monVerifiedText: (loc: string, state: string, style: string, century: string, sig: string) => string;
        monTraditionalText: (state: string) => string;
        monScholarlyText: (sources: string) => string;
        epistemicReviewKeyword: string;
        historiographyKeyword: string;
        reviewedPrefix: string;
        reviewBoardLocation: string;
        comparativeAnalysisAuthority: string;
        evaluatedTopicLabel: string;
        verificationFindingLabel: string;
        reviewDateLabel: string;
        reliabilityNoteLabel: string;
        supportingEvidencePrefix: string;
        cataloguedVolumesSuffix: string;
        verifiedCitationsSuffix: string;
        bibLocationRepo: string;
        bibRulerAuthority: string;
        corpusClassificationLabel: string;
        cataloguedVolumesLabel: string;
        coreVolumesSuffix: string;
        custodialArchivesLabel: string;
        bibTraditionalText: string;
        citationPrefix: string;
        docLiterarySourcesHeading: string;
        docLiterarySourcesDesc: (repo: string, count: number) => string;
        claimsFurtherResearchHeading: string;
        claimsFurtherResearchDesc: (date: string) => string;
        relatedRulersDynastiesHeading: string;
        primarySovereignAuthorityLabel: string;
        geographicalJurisdictionLabel: string;
        epigraphicMonumentEvidenceLabel: string;
        relatedMonographsHeading: string;
        historicalMonographBadge: string;
        relatedKingdomsPersonalitiesHeading: string;
        kingdoms: Array<{ title: string; period: string; badge: string; imageUrl: string; route: string }>;
      }
    > = {
      en: {
        scriptPaleographyLabel: 'Script & Paleography',
        inscribedLanguageLabel: 'Inscribed Language',
        dynastyLabel: 'Dynasty',
        epigraphiaIndicaKeyword: 'Epigraphia Indica',
        copperPlateEpigraphyKeyword: 'Copper-Plate & Stone Epigraphy',
        asiAttribution: 'Archaeological Survey of India (ASI) Epigraphy Series',
        inscVerifiedPrefix: (ctx, script, langName, era, loc) =>
          `${ctx} Primary epigraphic text incised in ${script} (${langName}), dated ${era} at ${loc}.`,
        inscTraditionalText:
          'Corroborated alongside the Rajabhoga chronicle of the Madala Panji and regional Kaifiyat registers, which preserve the living memory of these royal endowments and administrative proclamations.',
        inscScholarlyText: (refs, dynasty) =>
          `Critically edited and published in ${refs}. Historians utilize this epigraph as a primary chronological anchor for the ${dynasty} sovereign administration.`,
        origTranscriptionLabel: 'Original Transcription',
        translationLabel: 'Translation',
        manuscriptSuffix: 'Manuscript',
        palmLeafKeyword: 'Palm-Leaf Manuscript',
        archivalRepoKeyword: 'Archival Repository',
        authorBodyLabel: 'Author / Compiling Body',
        approxDateLabel: 'Approximate Date',
        origLanguageLabel: 'Original Language',
        custodialCollectionLabel: 'Custodial Collection',
        provenanceCustodyLabel: 'Provenance & Custody',
        copyrightLicenseLabel: 'Copyright & Licensing',
        docVerifiedText: (loc, prov) => `Physical manuscript corpus preserved at ${loc}. ${prov}`,
        docTraditionalFallback:
          'Preserved across hereditary palm-leaf manuscript libraries in Odisha and South India alongside temple ritual chronicles.',
        docScholarlyExcerptPrefix: 'Excerpt Translation',
        corroboratingMonumentsLabel: 'Corroborating Monuments & Inscriptions',
        primarySourcesLabel: 'Primary Sources',
        evTraditionalFallback:
          'Preserved in regional temple chronicles (Madala Panji), local Kaifiyats, and community lineage memory across Odra and Deccan settlements.',
        medievalCitadelSuffix: 'Medieval Citadel',
        regionSuffix: 'Region',
        gajapathiAdminAuthority: 'Suryavamsha Gajapathi & Odra-Kalinga Administration',
        asiStateEpigraphyAttr: 'Archaeological Survey of India (ASI) & State Epigraphy Reports',
        ancientNameLabel: 'Ancient Historical Name',
        historicalRegionLabel: 'Historical Region',
        modernDistrictStateLabel: 'Modern District & State',
        inscriptionsFoundLabel: 'Inscriptions Found',
        locTraditionalText: state =>
          `Celebrated in regional Kaifiyats, temple chronicles, and living community heritage across ${state}.`,
        locScholarlyPrefix: (summary, inscs) => `${summary} Corroborated by on-site epigraphic finds: ${inscs}.`,
        onSiteEpigraphicBadge: 'On-Site Epigraphic & Archaeological Record',
        asiConservationPrefix: 'Archaeological Survey of India (ASI) Conservation & Excavation Reports',
        architecturalStyleLabel: 'Architectural Style',
        monVerifiedText: (loc, state, style, century, sig) =>
          `Standing architectural monument at ${loc}, ${state} (${style}, ${century}). ${sig}`,
        monTraditionalText: state => `Venerated in the sacred temple chronicles and living devotional traditions of ${state}.`,
        monScholarlyText: sources => `Documented in ${sources}.`,
        epistemicReviewKeyword: 'Epistemic Review',
        historiographyKeyword: 'Historiography',
        reviewedPrefix: 'Reviewed',
        reviewBoardLocation: 'Suryavamsha Epigraphic & Historiographical Review Board',
        comparativeAnalysisAuthority: 'Comparative Epigraphic & Literary Analysis',
        evaluatedTopicLabel: 'Evaluated Topic',
        verificationFindingLabel: 'Verification Finding',
        reviewDateLabel: 'Review Date',
        reliabilityNoteLabel: 'Primary Reliability Note',
        supportingEvidencePrefix: 'Supporting Evidence',
        cataloguedVolumesSuffix: 'Catalogued Volumes',
        verifiedCitationsSuffix: 'Verified Citations & Archival Volumes',
        bibLocationRepo: 'Archaeological Survey of India (ASI), Odisha State Museum & GOML Chennai',
        bibRulerAuthority: 'Epigraphic & Academic Editorial Boards',
        corpusClassificationLabel: 'Corpus Classification',
        cataloguedVolumesLabel: 'Catalogued Volumes',
        coreVolumesSuffix: 'Core Volumes & Series',
        custodialArchivesLabel: 'Custodial Archives',
        bibTraditionalText:
          'Cross-referenced with temple palm-leaf chronicles (Madala Panji) and regional village Kaifiyat registers.',
        citationPrefix: 'Citation',
        docLiterarySourcesHeading: 'Documentary & Literary Sources',
        docLiterarySourcesDesc: (repo, count) =>
          `Archival provenance (${repo}) and indexed corpus citations (${count} primary/secondary sources) preserve the textual and palm-leaf / gazetteer transmission of this record alongside its epigraphic context.`,
        claimsFurtherResearchHeading: 'Claims Requiring Further Research & Verification Scope',
        claimsFurtherResearchDesc: date =>
          `Regional oral lineages or broader dynastic extrapolations beyond the dated inscription/chronicle text (${date}) are maintained strictly as open comparative research hypotheses pending further epigraphic discovery.`,
        relatedRulersDynastiesHeading: 'Related Rulers, Dynasties & Kingdoms',
        primarySovereignAuthorityLabel: 'Primary sovereign authority',
        geographicalJurisdictionLabel: 'Geographical Jurisdiction',
        epigraphicMonumentEvidenceLabel: 'Epigraphic / Monument Evidence:',
        relatedMonographsHeading: 'Related Historical Monographs',
        historicalMonographBadge: 'Historical Monograph',
        relatedKingdomsPersonalitiesHeading: 'Related Kingdoms, Dynasties & Historical Personalities',
        kingdoms: [
          {
            title: 'Suryavamsi Gajapati Empire & Royal Lineage',
            period: '1434–1541 CE • Cuttack, Puri & Kalinga-Utkala',
            badge: 'Dynasty & Imperial Polity',
            imageUrl: '/assets/gallery/konark_wheel.svg',
            route: '/gajapathi-kings'
          },
          {
            title: 'Odra Desha, Kalinga & Utkala Historical Geography',
            period: 'Ancient to Early Modern • Mahanadi to Godavari',
            badge: 'Historical Kingdom & Territory',
            imageUrl: '/assets/gallery/udayagiri_caves.svg',
            route: '/odra-desha'
          },
          {
            title: 'Chauhan, Bhanja, Soma & Ganga Dynastic Chronology',
            period: '4th Century CE – 19th Century CE',
            badge: 'Dynastic Chronology',
            imageUrl: '/assets/gallery/jagannath_puri.svg',
            route: '/genealogy'
          }
        ]
      },
      hi: {
        scriptPaleographyLabel: 'लिपि और पुरालिपि शास्त्र',
        inscribedLanguageLabel: 'उत्कीर्ण भाषा',
        dynastyLabel: 'राजवंश',
        epigraphiaIndicaKeyword: 'एपिग्राफिया इंडिका',
        copperPlateEpigraphyKeyword: 'ताम्रपत्र एवं शिलालेख',
        asiAttribution: 'भारतीय पुरातत्व सर्वेक्षण (ASI) पुरालेख श्रृंखला',
        inscVerifiedPrefix: (ctx, script, langName, era, loc) =>
          `${ctx} प्राथमिक पुरालेखीय पाठ ${script} (${langName}) में उत्कीर्ण, तिथि ${era}, प्राप्ति-स्थल: ${loc}।`,
        inscTraditionalText:
          'मादला पांजी के राजभोग इतिवृत्त और क्षेत्रीय कैफियत रजिस्टरों के साथ संपुष्ट, जो इन शाही अनुदानों और प्रशासनिक घोषणाओं की जीवंत स्मृति को संरक्षित करते हैं।',
        inscScholarlyText: (refs, dynasty) =>
          `${refs} में आलोचनात्मक रूप से संपादित और प्रकाशित। इतिहासकार इस अभिलेख का उपयोग ${dynasty} संप्रभु प्रशासन के प्राथमिक कालानुक्रमिक आधार के रूप में करते हैं।`,
        origTranscriptionLabel: 'मूल प्रतिलेखन',
        translationLabel: 'अनुवाद',
        manuscriptSuffix: 'पांडुलिपि',
        palmLeafKeyword: 'ताड़पत्र पांडुलिपि',
        archivalRepoKeyword: 'अभिलेखीय भंडार',
        authorBodyLabel: 'लेखक / संकलनकर्ता निकाय',
        approxDateLabel: 'अनुमानित काल',
        origLanguageLabel: 'मूल भाषा',
        custodialCollectionLabel: 'संरक्षक संग्रहालय / संग्रह',
        provenanceCustodyLabel: 'उत्पत्ति एवं अभिरक्षा',
        copyrightLicenseLabel: 'कॉपीराइट एवं लाइसेंस',
        docVerifiedText: (loc, prov) => `भौतिक पांडुलिपि संग्रह ${loc} में संरक्षित। ${prov}`,
        docTraditionalFallback:
          'ओडिशा और दक्षिण भारत के वंशानुगत ताड़पत्र पांडुलिपि पुस्तकालयों में मंदिर अनुष्ठान इतिवृत्तों के साथ संरक्षित।',
        docScholarlyExcerptPrefix: 'अंश अनुवाद',
        corroboratingMonumentsLabel: 'संपुष्ट स्मारक एवं शिलालेख',
        primarySourcesLabel: 'प्राथमिक स्रोत',
        evTraditionalFallback:
          'क्षेत्रीय मंदिर इतिवृत्तों (मादला पांजी), स्थानीय कैफियतों और ओड्र व दक्कन की बस्तियों की सामुदायिक वंशावली स्मृति में संरक्षित।',
        medievalCitadelSuffix: 'मध्यकालीन दुर्ग',
        regionSuffix: 'क्षेत्र',
        gajapathiAdminAuthority: 'सूर्यवंश गजपति एवं ओड्र-कलिंग प्रशासन',
        asiStateEpigraphyAttr: 'भारतीय पुरातत्व सर्वेक्षण (ASI) एवं राज्य पुरालेख रिपोर्ट',
        ancientNameLabel: 'प्राचीन ऐतिहासिक नाम',
        historicalRegionLabel: 'ऐतिहासिक क्षेत्र',
        modernDistrictStateLabel: 'आधुनिक जिला एवं राज्य',
        inscriptionsFoundLabel: 'प्राप्त शिलालेख',
        locTraditionalText: state =>
          `${state} भर में क्षेत्रीय कैफियतों, मंदिर इतिवृत्तों और जीवंत सामुदायिक विरासत में प्रतिष्ठित।`,
        locScholarlyPrefix: (summary, inscs) => `${summary} स्थल पर प्राप्त पुरालेखीय साक्ष्यों द्वारा संपुष्ट: ${inscs}।`,
        onSiteEpigraphicBadge: 'स्थलगत पुरालेखीय एवं पुरातात्विक अभिलेख',
        asiConservationPrefix: 'भारतीय पुरातत्व सर्वेक्षण (ASI) संरक्षण एवं उत्खनन रिपोर्ट',
        architecturalStyleLabel: 'स्थापत्य शैली',
        monVerifiedText: (loc, state, style, century, sig) =>
          `${loc}, ${state} में स्थित स्थापत्य स्मारक (${style}, ${century})। ${sig}`,
        monTraditionalText: state => `${state} के पवित्र मंदिर इतिवृत्तों और जीवंत भक्ति परंपराओं में पूजित।`,
        monScholarlyText: sources => `${sources} में प्रलेखित।`,
        epistemicReviewKeyword: 'प्रमाण समीक्षा',
        historiographyKeyword: 'इतिहास-लेखन',
        reviewedPrefix: 'समीक्षित',
        reviewBoardLocation: 'सूर्यवंश पुरालेखीय एवं इतिहास-लेखन समीक्षा बोर्ड',
        comparativeAnalysisAuthority: 'तुलनात्मक पुरालेखीय एवं साहित्यिक विश्लेषण',
        evaluatedTopicLabel: 'मूल्यांकित विषय',
        verificationFindingLabel: 'सत्यापन निष्कर्ष',
        reviewDateLabel: 'समीक्षा तिथि',
        reliabilityNoteLabel: 'प्राथमिक विश्वसनीयता टिप्पणी',
        supportingEvidencePrefix: 'सहायक प्रमाण',
        cataloguedVolumesSuffix: 'सूचीबद्ध खंड',
        verifiedCitationsSuffix: 'सत्यापित उद्धरण एवं अभिलेखीय खंड',
        bibLocationRepo: 'भारतीय पुरातत्व सर्वेक्षण (ASI), ओडिशा राज्य संग्रहालय एवं GOML चेन्नई',
        bibRulerAuthority: 'पुरालेखीय एवं अकादमिक संपादकीय बोर्ड',
        corpusClassificationLabel: 'संग्रह वर्गीकरण',
        cataloguedVolumesLabel: 'सूचीबद्ध खंड',
        coreVolumesSuffix: 'प्रमुख खंड एवं श्रृंखला',
        custodialArchivesLabel: 'संरक्षक अभिलेखागार',
        bibTraditionalText:
          'मंदिर ताड़पत्र इतिवृत्तों (मादला पांजी) और क्षेत्रीय ग्राम कैफियत रजिस्टरों के साथ संदर्भित।',
        citationPrefix: 'उद्धरण',
        docLiterarySourcesHeading: 'दस्तावेज़ी और साहित्यिक स्रोत',
        docLiterarySourcesDesc: (repo, count) =>
          `अभिलेखीय उत्पत्ति (${repo}) और सूचीबद्ध संदर्भ (${count} प्राथमिक/द्वितीयक स्रोत) इस अभिलेख के पुरालेखीय संदर्भ के साथ इसके पाठ्य और ताड़पत्र/गजेटियर प्रसार को संरक्षित करते हैं।`,
        claimsFurtherResearchHeading: 'आगे के शोध और सत्यापन की आवश्यकता वाले दावे',
        claimsFurtherResearchDesc: date =>
          `तिथियुक्त शिलालेख/इतिवृत्त पाठ (${date}) से परे क्षेत्रीय मौखिक वंशावलियों को आगे की पुरालेखीय खोज तक खुले तुलनात्मक शोध परिकल्पनाओं के रूप में रखा गया है।`,
        relatedRulersDynastiesHeading: 'संबंधित शासक, राजवंश और साम्राज्य',
        primarySovereignAuthorityLabel: 'प्रमुख संप्रभु प्राधिकरण',
        geographicalJurisdictionLabel: 'भौगोलिक अधिकार-क्षेत्र',
        epigraphicMonumentEvidenceLabel: 'पुरालेखीय / स्मारक प्रमाण:',
        relatedMonographsHeading: 'संबंधित ऐतिहासिक मोनोग्राफ (शोध ग्रंथ)',
        historicalMonographBadge: 'ऐतिहासिक मोनोग्राफ',
        relatedKingdomsPersonalitiesHeading: 'संबंधित साम्राज्य, राजवंश और ऐतिहासिक व्यक्तित्व',
        kingdoms: [
          {
            title: 'सूर्यवंशी गजपति साम्राज्य और शाही वंशावली',
            period: '1434–1541 ईस्वी • कटक, पुरी और कलिंग-उत्कल',
            badge: 'राजवंश और साम्राज्यीय शासन',
            imageUrl: '/assets/gallery/konark_wheel.svg',
            route: '/gajapathi-kings'
          },
          {
            title: 'ओड्र देश, कलिंग और उत्कल का ऐतिहासिक भूगोल',
            period: 'प्राचीन से प्रारंभिक आधुनिक काल • महानदी से गोदावरी',
            badge: 'ऐतिहासिक राज्य और क्षेत्र',
            imageUrl: '/assets/gallery/udayagiri_caves.svg',
            route: '/odra-desha'
          },
          {
            title: 'चौहान, भंज, सोम और गंग राजवंशीय कालक्रम',
            period: 'चौथी शताब्दी ईस्वी – 19वीं शताब्दी ईस्वी',
            badge: 'राजवंशीय कालक्रम',
            imageUrl: '/assets/gallery/jagannath_puri.svg',
            route: '/genealogy'
          }
        ]
      },
      te: {
        scriptPaleographyLabel: 'లిపి & ప్రాచీన లిపి శాస్త్రం',
        inscribedLanguageLabel: 'శాసన భాష',
        dynastyLabel: 'రాజవంశం',
        epigraphiaIndicaKeyword: 'ఎపిగ్రాఫియా ఇండికా',
        copperPlateEpigraphyKeyword: 'తామ్రశాసనాలు & శిలాశాసనాలు',
        asiAttribution: 'ఆర్కియాలజికల్ సర్వే ఆఫ్ ఇండియా (ASI) శాసన శ్రేణి',
        inscVerifiedPrefix: (ctx, script, langName, era, loc) =>
          `${ctx} ఈ ప్రాథమిక శాసన పాఠం ${script} (${langName}) లో చెక్కబడింది, కాలం: ${era}, లభించిన ప్రదేశం: ${loc}.`,
        inscTraditionalText:
          'మాదళ పాంజి యొక్క రాజభోగ వృత్తాంతం మరియు ప్రాంతీయ కైఫియత్ రిజిస్టర్లతో సరిపోల్చబడింది; ఇవి ఈ రాజ దానాలు మరియు పరిపాలనా ప్రకటనల సజీవ జ్ఞాపకాలను భద్రపరుస్తాయి.',
        inscScholarlyText: (refs, dynasty) =>
          `${refs} లో విమర్శనాత్మకంగా పరిష్కరించబడి ప్రచురించబడింది. చరిత్రకారులు ఈ శాసనాన్ని ${dynasty} సార్వభౌమ పరిపాలనకు ప్రాథమిక కాలక్రమ ఆధారంగా ఉపయోగిస్తారు.`,
        origTranscriptionLabel: 'మూల లిప్యంతరీకరణ',
        translationLabel: 'అనువాదం',
        manuscriptSuffix: 'తాళపత్ర గ్రంథం',
        palmLeafKeyword: 'తాళపత్ర గ్రంథం',
        archivalRepoKeyword: 'పురాతన పత్ర భాండాగారం',
        authorBodyLabel: 'రచయిత / సంకలన సంస్థ',
        approxDateLabel: 'సుమారు కాలం',
        origLanguageLabel: 'మూల భాష',
        custodialCollectionLabel: 'সংరక్షణ సేకరణ / మ్యూజియం',
        provenanceCustodyLabel: 'మూల ఆధారం & సంరక్షణ',
        copyrightLicenseLabel: 'కాపీరైట్ & లైసెన్స్',
        docVerifiedText: (loc, prov) => `భౌతిక తాళపత్ర గ్రంథ సముదాయం ${loc} వద్ద భద్రపరచబడింది. ${prov}`,
        docTraditionalFallback:
          'ఒడిశా మరియు దక్షిణ భారతదేశంలోని వంశపారంపర్య తాళపత్ర గ్రంథాలయాలలో ఆలయ ఆచార వృత్తాంతాలతో పాటు భద్రపరచబడింది.',
        docScholarlyExcerptPrefix: 'సారాంశ అనువాదం',
        corroboratingMonumentsLabel: 'ధృవీకరించే స్మారకాలు & శాసనాలు',
        primarySourcesLabel: 'ప్రాథమిక ఆధారాలు',
        evTraditionalFallback:
          'ప్రాంతీయ ఆలయ వృత్తాంతాలు (మాదళ పాంజి), స్థానిక కైఫియత్‌లు మరియు ఓడ్ర-దక్కన్ ప్రాంతాల సామాజిక వంశావళి స్మృతులలో భద్రపరచబడింది.',
        medievalCitadelSuffix: 'మధ్యయుగ దుర్గం',
        regionSuffix: 'ప్రాంతం',
        gajapathiAdminAuthority: 'సూర్యవంశ గజపతి & ఓడ్ర-కళింగ పరిపాలన',
        asiStateEpigraphyAttr: 'ఆర్కియాలజికల్ సర్వే ఆఫ్ ఇండియా (ASI) & రాష్ట్ర శాసన నివేదికలు',
        ancientNameLabel: 'ప్రాచీన చారిత్రక నామం',
        historicalRegionLabel: 'చారిత్రక ప్రాంతం',
        modernDistrictStateLabel: 'ఆధునిక జిల్లా & రాష్ట్రం',
        inscriptionsFoundLabel: 'లభించిన శాసనాలు',
        locTraditionalText: state =>
          `${state} వ్యాప్తంగా ప్రాంతీయ కైఫియత్‌లు, ఆలయ వృత్తాంతాలు మరియు సజీవ సామాజిక వారసత్వంలో కీర్తించబడింది.`,
        locScholarlyPrefix: (summary, inscs) => `${summary} క్షేత్రస్థాయిలో లభించిన శాసన ఆధారాల ద్వారా ధృవీకరించబడింది: ${inscs}.`,
        onSiteEpigraphicBadge: 'క్షేత్రస్థాయి శాసన & పురావస్తు ఆధారం',
        asiConservationPrefix: 'ఆర్కియాలజికల్ సర్వే ఆఫ్ ఇండియా (ASI) సంరక్షణ & తవ్వకాల నివేదికలు',
        architecturalStyleLabel: 'వాస్తు శైలి',
        monVerifiedText: (loc, state, style, century, sig) =>
          `${loc}, ${state} వద్ద ఉన్న చారిత్రక వాస్తు స్మారకం (${style}, ${century}). ${sig}`,
        monTraditionalText: state => `${state} యొక్క పవిత్ర ఆలయ వృత్తాంతాలు మరియు సజీవ భక్తి సంప్రదాయాలలో పూజించబడుతోంది.`,
        monScholarlyText: sources => `${sources} లో నమోదు చేయబడింది.`,
        epistemicReviewKeyword: 'ప్రమాణ సమీక్ష',
        historiographyKeyword: 'చరిత్ర రచన',
        reviewedPrefix: 'సమీక్షించబడింది',
        reviewBoardLocation: 'సూర్యవంశ శాసన & చరిత్ర పరిశోధన సమీక్షా మండలి',
        comparativeAnalysisAuthority: 'తులనాత్మక శాసన & సాహిత్య విశ్లేషణ',
        evaluatedTopicLabel: 'మూల్యాంకన అంశం',
        verificationFindingLabel: 'నిర్ధారణ ఫలితం',
        reviewDateLabel: 'సమీక్ష తేదీ',
        reliabilityNoteLabel: 'ప్రాథమిక విశ్వసనీయత గమనిక',
        supportingEvidencePrefix: 'మద్దతు ఆధారం',
        cataloguedVolumesSuffix: 'జాబితా చేయబడిన సంపుటాలు',
        verifiedCitationsSuffix: 'ధృవీకరించబడిన ఆధారాలు & పురాతన సంపుటాలు',
        bibLocationRepo: 'ఆర్కియాలజికల్ సర్వే ఆఫ్ ఇండియా (ASI), ఒడిశా స్టేట్ మ్యూజియం & GOML చెన్నై',
        bibRulerAuthority: 'శాసన & విద్యా సంపాదకీయ మండళ్లు',
        corpusClassificationLabel: 'ఆధార వర్గీకరణ',
        cataloguedVolumesLabel: 'జాబితా చేయబడిన సంపుటాలు',
        coreVolumesSuffix: 'ప్రధాన సంపుటాలు & శ్రేణులు',
        custodialArchivesLabel: 'సంరక్షక పురాతన భాండాగారాలు',
        bibTraditionalText:
          'ఆలయ తాళపత్ర వృత్తాంతాలు (మాదళ పాంజి) మరియు ప్రాంతీయ గ్రామ కైఫియత్ రిజిస్టర్లతో సరిపోల్చబడింది.',
        citationPrefix: 'ఉల్లేఖన',
        docLiterarySourcesHeading: 'పత్ర & సాహిత్య ఆధారాలు',
        docLiterarySourcesDesc: (repo, count) =>
          `పురాతన భాండాగార మూలం (${repo}) మరియు సూచిక చేయబడిన ఆధార ఉల్లేఖనలు (${count} ప్రాథమిక/ద్వితీయ ఆధారాలు) ఈ రికార్డు యొక్క శాసన సందర్భంతో పాటు దాని తాళపత్ర మరియు గెజిటీర్ ప్రసారాన్ని భద్రపరుస్తాయి.`,
        claimsFurtherResearchHeading: 'తదుపరి పరిశోధన & నిర్ధారణ అవసరమైన అంశాలు',
        claimsFurtherResearchDesc: date =>
          `తేదీ గల శాసన/వృత్తాంత పాఠం (${date}) పరిధికి వెలుపల ఉన్న ప్రాంతీయ మౌఖిక వంశావళి అంశాలు తదుపరి శాసన ఆవిష్కరణల వరకు బహిరంగ తులనాత్మక పరిశోధన ప్రతిపాదనలుగా ఉంచబడ్డాయి.`,
        relatedRulersDynastiesHeading: 'సంబంధిత పాలకులు, రాజవంశాలు & రాజ్యాలు',
        primarySovereignAuthorityLabel: 'ప్రధాన సార్వభౌమ అధికారం',
        geographicalJurisdictionLabel: 'భౌగోళిక అధికార పరిధి',
        epigraphicMonumentEvidenceLabel: 'శాసన / స్మారక ఆధారం:',
        relatedMonographsHeading: 'సంబంధిత చారిత్రక పరిశోధన గ్రంథాలు (Monographs)',
        historicalMonographBadge: 'చారిత్రక పరిశోధన గ్రంథం',
        relatedKingdomsPersonalitiesHeading: 'సంబంధిత రాజ్యాలు, రాజవంశాలు & చారిత్రక వ్యక్తులు',
        kingdoms: [
          {
            title: 'సూర్యవంశ గజపతి సామ్రాజ్యం & రాజ వంశావళి',
            period: 'సా.శ. 1434–1541 • కటక్, పూరీ & కళింగ-ఉత్కళ',
            badge: 'రాజవంశం & సామ్రాజ్య పాలన',
            imageUrl: '/assets/gallery/konark_wheel.svg',
            route: '/gajapathi-kings'
          },
          {
            title: 'ఓడ్ర దేశం, కళింగ & ఉత్కళ చారిత్రక భూగోళం',
            period: 'ప్రాచీన నుండి తొలి ఆధునిక కాలం • మహానది నుండి గోదావరి',
            badge: 'చారిత్రక రాజ్యం & భూభాగం',
            imageUrl: '/assets/gallery/udayagiri_caves.svg',
            route: '/odra-desha'
          },
          {
            title: 'చౌహాన్, భంజ, సోమ & గంగ రాజవంశ కాలక్రమం',
            period: 'సా.శ. 4వ శతాబ్దం – 19వ శతాబ్దం',
            badge: 'రాజవంశ కాలక్రమం',
            imageUrl: '/assets/gallery/jagannath_puri.svg',
            route: '/genealogy'
          }
        ]
      },
      kn: {
        scriptPaleographyLabel: 'ಲಿಪಿ ಮತ್ತು ಪ್ರಾಚೀನ ಲಿಪಿಶಾಸ್ತ್ರ',
        inscribedLanguageLabel: 'ಶಾಸನ ಭಾಷೆ',
        dynastyLabel: 'ರಾಜವಂಶ',
        epigraphiaIndicaKeyword: 'ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ',
        copperPlateEpigraphyKeyword: 'ತಾಮ್ರಪಟ ಮತ್ತು ಶಿಲಾಶಾಸನಗಳು',
        asiAttribution: 'ಭಾರತೀಯ ಪುರಾತತ್ತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ (ASI) ಶಾಸನ ಸರಣಿ',
        inscVerifiedPrefix: (ctx, script, langName, era, loc) =>
          `${ctx} ಪ್ರಾಥಮಿಕ ಶಾಸನ ಪಠ್ಯವನ್ನು ${script} (${langName}) ಲಿಪಿಯಲ್ಲಿ ಕೆತ್ತಲಾಗಿದೆ, ಕಾಲ: ${era}, ದೊರೆತ ಸ್ಥಳ: ${loc}.`,
        inscTraditionalText:
          'ಮಾದಲ ಪಾಂಜಿಯ ರಾಜಭೋಗ ವೃತ್ತಾಂತ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಕೈಫಿಯತ್ ದಾಖಲೆಗಳೊಂದಿಗೆ ಸಮನ್ವಯಗೊಳಿಸಲಾಗಿದೆ; ಇವು ರಾಜ ದತ್ತಿಗಳು ಮತ್ತು ಆಡಳಿತಾತ್ಮಕ ಘೋಷಣೆಗಳ ಜೀವಂತ ಸ್ಮರಣೆಯನ್ನು ಉಳಿಸಿಕೊಂಡಿವೆ.',
        inscScholarlyText: (refs, dynasty) =>
          `${refs} ನಲ್ಲಿ ವಿಮರ್ಶಾತ್ಮಕವಾಗಿ ಸಂಪಾದಿಸಿ ಪ್ರಕಟಿಸಲಾಗಿದೆ. ಇತಿಹಾಸಕಾರರು ಈ ಶಾಸನವನ್ನು ${dynasty} ಸಾರ್ವಭೌಮ ಆಡಳಿತದ ಪ್ರಾಥಮಿಕ ಕಾಲಾನುಕ್ರಮ ಆಧಾರವಾಗಿ ಬಳಸುತ್ತಾರೆ.`,
        origTranscriptionLabel: 'ಮೂಲ ಲಿಪ್ಯಂತರಣ',
        translationLabel: 'ಅನುವಾದ',
        manuscriptSuffix: 'ಹಸ್ತಪ್ರತಿ',
        palmLeafKeyword: 'ತಾಳೆಗರಿ ಹಸ್ತಪ್ರತಿ',
        archivalRepoKeyword: 'ಪತ್ರಾಗಾರ ಸಂಗ್ರಹಾಲಯ',
        authorBodyLabel: 'ಲೇಖಕರು / ಸಂಕಲನ ಸಂಸ್ಥೆ',
        approxDateLabel: 'ಅಂದಾಜು ಕಾಲ',
        origLanguageLabel: 'ಮೂಲ ಭಾಷೆ',
        custodialCollectionLabel: 'ಸಂರಕ್ಷಣಾ ಸಂಗ್ರಹಾಲಯ',
        provenanceCustodyLabel: 'ಮೂಲ ಮತ್ತು ಅಭಿರಕ್ಷೆ',
        copyrightLicenseLabel: 'ಕೃತಿಸ್ವಾಮ್ಯ ಮತ್ತು ಪರವಾನಗಿ',
        docVerifiedText: (loc, prov) => `ಭೌತಿಕ ಹಸ್ತಪ್ರತಿ ಸಂಗ್ರಹವನ್ನು ${loc} ನಲ್ಲಿ ಸಂರಕ್ಷಿಸಲಾಗಿದೆ. ${prov}`,
        docTraditionalFallback:
          'ಒಡಿಶಾ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ವಂಶಪಾರಂಪರ್ಯ ತಾಳೆಗರಿ ಗ್ರಂಥಾಲಯಗಳಲ್ಲಿ ದೇವಾಲಯದ ವೃತ್ತಾಂತಗಳೊಂದಿಗೆ ಸಂರಕ್ಷಿಸಲಾಗಿದೆ.',
        docScholarlyExcerptPrefix: 'ಆಯ್ದ ಭಾಗದ ಅನುವಾದ',
        corroboratingMonumentsLabel: 'ದೃಢೀಕರಿಸುವ ಸ್ಮಾರಕಗಳು ಮತ್ತು ಶಾಸನಗಳು',
        primarySourcesLabel: 'ಪ್ರಾಥಮಿಕ ಆಕರಗಳು',
        evTraditionalFallback:
          'ಪ್ರಾದೇಶಿಕ ದೇವಾಲಯ ವೃತ್ತಾಂತಗಳು (ಮಾದಲ ಪಾಂಜಿ), ಸ್ಥಳೀಯ ಕೈಫಿಯತ್‌ಗಳು ಮತ್ತು ಓಡ್ರ ಹಾಗೂ ದಕ್ಕನ್ ನೆಲೆಗಳ ಸಮುದಾಯ ವಂಶಾವಳಿ ಸ್ಮರಣೆಯಲ್ಲಿ ಸಂರಕ್ಷಿಸಲಾಗಿದೆ.',
        medievalCitadelSuffix: 'ಮಧ್ಯಕಾಲೀನ ಕೋಟೆ',
        regionSuffix: 'ಪ್ರದೇಶ',
        gajapathiAdminAuthority: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಮತ್ತು ಓಡ್ರ-ಕಳಿಂಗ ಆಡಳಿತ',
        asiStateEpigraphyAttr: 'ಭಾರತೀಯ ಪುರಾತತ್ತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ (ASI) ಮತ್ತು ರಾಜ್ಯ ಶಾಸನ ವರದಿಗಳು',
        ancientNameLabel: 'ಪ್ರಾಚೀನ ಐತಿಹಾಸಿಕ ಹೆಸರು',
        historicalRegionLabel: 'ಐತಿಹಾಸಿಕ ಪ್ರದೇಶ',
        modernDistrictStateLabel: 'ಆಧುನಿಕ ಜಿಲ್ಲೆ ಮತ್ತು ರಾಜ್ಯ',
        inscriptionsFoundLabel: 'ದೊರೆತ ಶಾಸನಗಳು',
        locTraditionalText: state =>
          `${state} ದಾದ್ಯಂತ ಪ್ರಾದೇಶಿಕ ಕೈಫಿಯತ್‌ಗಳು, ದೇವಾಲಯ ವೃತ್ತಾಂತಗಳು ಮತ್ತು ಜೀವಂತ ಸಮುದಾಯ ಪರಂಪರೆಯಲ್ಲಿ ಗುರುತಿಸಲ್ಪಟ್ಟಿದೆ.`,
        locScholarlyPrefix: (summary, inscs) => `${summary} ಸ್ಥಳದಲ್ಲಿ ದೊರೆತ ಶಾಸನ ಆಧಾರಗಳಿಂದ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ: ${inscs}.`,
        onSiteEpigraphicBadge: 'ಸ್ಥಳೀಯ ಶಾಸನ ಮತ್ತು ಪುರಾತತ್ತ್ವ ದಾಖಲೆ',
        asiConservationPrefix: 'ಭಾರತೀಯ ಪುರಾತತ್ತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ (ASI) ಸಂರಕ್ಷಣೆ ಮತ್ತು ಉತ್ಖನನ ವರದಿಗಳು',
        architecturalStyleLabel: 'ವಾಸ್ತುಶಿಲ್ಪ ಶೈಲಿ',
        monVerifiedText: (loc, state, style, century, sig) =>
          `${loc}, ${state} ನಲ್ಲಿರುವ ಐತಿಹಾಸಿಕ ವಾಸ್ತುಶಿಲ್ಪ ಸ್ಮಾರಕ (${style}, ${century}). ${sig}`,
        monTraditionalText: state => `${state} ನ ಪವಿತ್ರ ದೇವಾಲಯ ವೃತ್ತಾಂತಗಳು ಮತ್ತು ಜೀವಂತ ಭಕ್ತಿ ಸಂಪ್ರದಾಯಗಳಲ್ಲಿ ಪೂಜಿಸಲ್ಪಡುತ್ತದೆ.`,
        monScholarlyText: sources => `${sources} ನಲ್ಲಿ ದಾಖಲಿಸಲಾಗಿದೆ.`,
        epistemicReviewKeyword: 'ಪ್ರಮಾಣ ಪರಿಶೀಲನೆ',
        historiographyKeyword: 'ಇತಿಹಾಸ ರಚನೆ',
        reviewedPrefix: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
        reviewBoardLocation: 'ಸೂರ್ಯವಂಶ ಶಾಸನ ಮತ್ತು ಇತಿಹಾಸ ಪರಿಶೀಲನಾ ಮಂಡಳಿ',
        comparativeAnalysisAuthority: 'ತುಲನಾತ್ಮಕ ಶಾಸನ ಮತ್ತು ಸಾಹಿತ್ಯಿಕ ವಿಶ್ಲೇಷಣೆ',
        evaluatedTopicLabel: 'ಮೌಲ್ಯಮಾಪನ ಮಾಡಿದ ವಿಷಯ',
        verificationFindingLabel: 'ಪರಿಶೀಲನಾ ಫಲಿತಾಂಶ',
        reviewDateLabel: 'ಪರಿಶೀಲನಾ ದಿನಾಂಕ',
        reliabilityNoteLabel: 'ಪ್ರಾಥಮಿಕ ವಿಶ್ವಾಸಾರ್ಹತೆಯ ಟಿಪ್ಪಣಿ',
        supportingEvidencePrefix: 'ಪೂರಕ ಆಧಾರ',
        cataloguedVolumesSuffix: 'ಪಟ್ಟಿಮಾಡಿದ ಸಂಪುಟಗಳು',
        verifiedCitationsSuffix: 'ದೃಢೀಕೃತ ಉಲ್ಲೇಖಗಳು ಮತ್ತು ಪತ್ರಾಗಾರ ಸಂಪುಟಗಳು',
        bibLocationRepo: 'ಭಾರತೀಯ ಪುರಾತತ್ತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ (ASI), ಒಡಿಶಾ ರಾಜ್ಯ ವಸ್ತುಸಂಗ್ರಹಾಲಯ ಮತ್ತು GOML ಚೆನ್ನೈ',
        bibRulerAuthority: 'ಶಾಸನ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಸಂಪಾದಕೀಯ ಮಂಡಳಿಗಳು',
        corpusClassificationLabel: 'ಆಕರ ವರ್ಗೀಕರಣ',
        cataloguedVolumesLabel: 'ಪಟ್ಟಿಮಾಡಿದ ಸಂಪುಟಗಳು',
        coreVolumesSuffix: 'ಪ್ರಮುಖ ಸಂಪುಟಗಳು ಮತ್ತು ಸರಣಿಗಳು',
        custodialArchivesLabel: 'ಸಂರಕ್ಷಕ ಪತ್ರಾಗಾರಗಳು',
        bibTraditionalText:
          'ದೇವಾಲಯದ ತಾಳೆಗರಿ ವೃತ್ತಾಂತಗಳು (ಮಾದಲ ಪಾಂಜಿ) ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಗ್ರಾಮ ಕೈಫಿಯತ್ ದಾಖಲೆಗಳೊಂದಿಗೆ ಸಮನ್ವಯಗೊಳಿಸಲಾಗಿದೆ.',
        citationPrefix: 'ಉಲ್ಲೇಖ',
        docLiterarySourcesHeading: 'ದಾಖಲೆ ಮತ್ತು ಸಾಹಿತ್ಯಿಕ ಆಕರಗಳು',
        docLiterarySourcesDesc: (repo, count) =>
          `ಪತ್ರಾಗಾರ ಮೂಲ (${repo}) ಮತ್ತು ಸೂಚಿಕೆಯ ಉಲ್ಲೇಖಗಳು (${count} ಪ್ರಾಥಮಿಕ/ದ್ವಿತೀಯ ಆಕರಗಳು) ಈ ದಾಖಲೆಯ ಶಾಸನ ಸಂದರ್ಭದೊಂದಿಗೆ ತಾಳೆಗರಿ ಮತ್ತು ಗೆಜೆಟಿಯರ್ ಪರಂಪರೆಯನ್ನು ಸಂರಕ್ಷಿಸುತ್ತವೆ.`,
        claimsFurtherResearchHeading: 'ಹೆಚ್ಚಿನ ಸಂಶೋಧನೆ ಮತ್ತು ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿರುವ ಪ್ರತಿಪಾದನೆಗಳು',
        claimsFurtherResearchDesc: date =>
          `ದಿನಾಂಕಿತ ಶಾಸನ/ವೃತ್ತಾಂತ ಪಠ್ಯದ (${date}) ಆಚೆಗಿನ ಪ್ರಾದೇಶಿಕ ಮೌಖಿಕ ವಂಶಾವಳಿಗಳನ್ನು ಮುಂದಿನ ಶಾಸನ ಶೋಧನೆಯವರೆಗೆ ಮುಕ್ತ ತುಲನಾತ್ಮಕ ಸಂಶೋಧನಾ ಪ್ರಸ್ತಾಪಗಳಾಗಿ ಇರಿಸಲಾಗಿದೆ.`,
        relatedRulersDynastiesHeading: 'ಸಂಬಂಧಿತ ಅರಸರು, ರಾಜವಂಶಗಳು ಮತ್ತು ಸಾಮ್ರಾಜ್ಯಗಳು',
        primarySovereignAuthorityLabel: 'ಪ್ರಮುಖ ಸಾರ್ವಭೌಮ ಅಧಿಕಾರ',
        geographicalJurisdictionLabel: 'ಭೌಗೋಳಿಕ ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿ',
        epigraphicMonumentEvidenceLabel: 'ಶಾಸನ / ಸ್ಮಾರಕ ಆಧಾರ:',
        relatedMonographsHeading: 'ಸಂಬಂಧಿತ ಐತಿಹಾಸಿಕ ಸಂಶೋಧನಾ ಗ್ರಂಥಗಳು (Monographs)',
        historicalMonographBadge: 'ಐತಿಹಾಸಿಕ ಸಂಶೋಧನಾ ಗ್ರಂಥ',
        relatedKingdomsPersonalitiesHeading: 'ಸಂಬಂಧಿತ ಸಾಮ್ರಾಜ್ಯಗಳು, ರಾಜವಂಶಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು',
        kingdoms: [
          {
            title: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ರಾಜ ವಂಶಾವಳಿ',
            period: 'ಕ್ರಿ.ಶ. 1434–1541 • ಕಟಕ್, ಪುರಿ ಮತ್ತು ಕಳಿಂಗ-ಉತ್ಕಲ',
            badge: 'ರಾಜವಂಶ ಮತ್ತು ಸಾಮ್ರಾಜ್ಯ ಆಡಳಿತ',
            imageUrl: '/assets/gallery/konark_wheel.svg',
            route: '/gajapathi-kings'
          },
          {
            title: 'ಓಡ್ರ ದೇಶ, ಕಳಿಂಗ ಮತ್ತು ಉತ್ಕಲ ಐತಿಹಾಸಿಕ ಭೂಗೋಳ',
            period: 'ಪ್ರಾಚೀನದಿಂದ ಆರಂಭಿಕ ಆಧುನಿಕ ಕಾಲ • ಮಹಾನದಿಯಿಂದ ಗೋದಾವರಿ',
            badge: 'ಐತಿಹಾಸಿಕ ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ಪ್ರದೇಶ',
            imageUrl: '/assets/gallery/udayagiri_caves.svg',
            route: '/odra-desha'
          },
          {
            title: 'ಚೌಹಾಣ್, ಭಂಜ, ಸೋಮ ಮತ್ತು ಗಂಗ ರಾಜವಂಶೀಯ ಕಾಲಾನುಕ್ರಮ',
            period: 'ಕ್ರಿ.ಶ. 4ನೇ ಶತಮಾನ – 19ನೇ ಶತಮಾನ',
            badge: 'ರಾಜವಂಶೀಯ ಕಾಲಾನುಕ್ರಮ',
            imageUrl: '/assets/gallery/jagannath_puri.svg',
            route: '/genealogy'
          }
        ]
      },
      ta: {
        scriptPaleographyLabel: 'எழுத்துமுறை & தொல்லெழுத்தியல்',
        inscribedLanguageLabel: 'பொறிக்கப்பட்ட மொழி',
        dynastyLabel: 'வம்சம்',
        epigraphiaIndicaKeyword: 'எபிகிராஃபியா இண்டிகா',
        copperPlateEpigraphyKeyword: 'செப்பேடுகள் & கல்வெட்டுகள்',
        asiAttribution: 'இந்தியத் தொல்லியல் துறை (ASI) கல்வெட்டுத் தொடர்',
        inscVerifiedPrefix: (ctx, script, langName, era, loc) =>
          `${ctx} முதன்மைக் கல்வெட்டுப் பாடல் ${script} (${langName}) எழுத்தில் பொறிக்கப்பட்டது, காலம்: ${era}, கண்டெடுக்கப்பட்ட இடம்: ${loc}.`,
        inscTraditionalText:
          'மாதல பாஞ்சியின் ராஜபோக வரலாற்று ஏடுகள் மற்றும் வட்டார கைபியத் பதிவேடுகளுடன் ஒப்பிட்டு உறுதிப்படுத்தப்பட்டது; இவை அரச மானியங்கள் மற்றும் நிர்வாக ஆணைகளின் நினைவைப் பாதுகாக்கின்றன.',
        inscScholarlyText: (refs, dynasty) =>
          `${refs} இல் ஆய்வு செய்து பதிப்பிக்கப்பட்டது. வரலாற்றாசிரியர்கள் இக்கல்வெட்டை ${dynasty} இறையாண்மை நிர்வாகத்தின் முதன்மைக் காலவரிசை ஆதாரமாகப் பயன்படுத்துகின்றனர்.`,
        origTranscriptionLabel: 'மூல எழுத்துப்பெயர்ப்பு',
        translationLabel: 'மொழிபெயர்ப்பு',
        manuscriptSuffix: 'ஓலைச்சுவடி',
        palmLeafKeyword: 'பனையோலைச் சுவடி',
        archivalRepoKeyword: 'ஆவணக் காப்பகம்',
        authorBodyLabel: 'ஆசிரியர் / தொகுப்பு அமைப்பு',
        approxDateLabel: 'தோராயமான காலம்',
        origLanguageLabel: 'மூல மொழி',
        custodialCollectionLabel: 'பாதுகாப்புத் தொகுப்பு / அருங்காட்சியகம்',
        provenanceCustodyLabel: 'மூல வரலாறு & பாதுகாப்பு',
        copyrightLicenseLabel: 'பதிப்புரிமை & உரிமம்',
        docVerifiedText: (loc, prov) => `இயற்பியல் சுவடித் தொகுப்பு ${loc} இல் பாதுகாக்கப்படுகிறது. ${prov}`,
        docTraditionalFallback:
          'ஒடிசா மற்றும் தென்னிந்தியாவின் பரம்பரை ஓலைச்சுவடி நூலகங்களில் கோயில் சடங்கு ஏடுகளுடன் பாதுகாக்கப்படுகிறது.',
        docScholarlyExcerptPrefix: 'பகுதி மொழிபெயர்ப்பு',
        corroboratingMonumentsLabel: 'உறுதிப்படுத்தும் நினைவுச்சின்னங்கள் & கல்வெட்டுகள்',
        primarySourcesLabel: 'முதன்மை ஆதாரங்கள்',
        evTraditionalFallback:
          'வட்டாரக் கோயில் ஏடுகள் (மாதல பாஞ்சி), உள்ளூர் கைபியத்துகள் மற்றும் ஒட்ர-தக்காணக் குடியிருப்புகளின் வம்சாவளி நினைவுகளில் பாதுகாக்கப்படுகிறது.',
        medievalCitadelSuffix: 'இடைக்காலக் கோட்டை',
        regionSuffix: 'பகுதி',
        gajapathiAdminAuthority: 'சூர்யவம்ச கஜபதி & ஒட்ர-கலிங்க நிர்வாகம்',
        asiStateEpigraphyAttr: 'இந்தியத் தொல்லியல் துறை (ASI) & மாநிலக் கல்வெட்டு அறிக்கைகள்',
        ancientNameLabel: 'பண்டைய வரலாற்றுப் பெயர்',
        historicalRegionLabel: 'வரலாற்றுப் பகுதி',
        modernDistrictStateLabel: 'நவீன மாவட்டம் & மாநிலம்',
        inscriptionsFoundLabel: 'கண்டெடுக்கப்பட்ட கல்வெட்டுகள்',
        locTraditionalText: state =>
          `${state} முழுவதும் உள்ள வட்டார கைபியத்துகள், கோயில் ஏடுகள் மற்றும் சமூக மரபில் போற்றப்படுகிறது.`,
        locScholarlyPrefix: (summary, inscs) => `${summary} களத்தில் கண்டெடுக்கப்பட்ட கல்வெட்டு ஆதாரங்களால் உறுதிப்படுத்தப்பட்டது: ${inscs}.`,
        onSiteEpigraphicBadge: 'களக் கல்வெட்டு & தொல்லியல் ஆவணம்',
        asiConservationPrefix: 'இந்தியத் தொல்லியல் துறை (ASI) பாதுகாப்பு & அகழாய்வு அறிக்கைகள்',
        architecturalStyleLabel: 'கட்டிடக்கலை பாணி',
        monVerifiedText: (loc, state, style, century, sig) =>
          `${loc}, ${state} இல் அமைந்துள்ள வரலாற்றுக் கட்டிடக்கலை நினைவுச்சின்னம் (${style}, ${century}). ${sig}`,
        monTraditionalText: state => `${state} இன் புனிதக் கோயில் ஏடுகள் மற்றும் பக்தி மரபுகளில் போற்றப்படுகிறது.`,
        monScholarlyText: sources => `${sources} இல் ஆவணப்படுத்தப்பட்டுள்ளது.`,
        epistemicReviewKeyword: 'ஆதார மதிப்பாய்வு',
        historiographyKeyword: 'வரலாற்றியல்',
        reviewedPrefix: 'மதிப்பாய்வு செய்யப்பட்டது',
        reviewBoardLocation: 'சூர்யவம்ச கல்வெட்டு & வரலாற்றியல் ஆய்வுக் குழு',
        comparativeAnalysisAuthority: 'ஒப்பீட்டுக் கல்வெட்டு & இலக்கிய ஆய்வு',
        evaluatedTopicLabel: 'ஆய்வு செய்யப்பட்ட தலைப்பு',
        verificationFindingLabel: 'சரிபார்ப்பு முடிவு',
        reviewDateLabel: 'ஆய்வுத் தேதி',
        reliabilityNoteLabel: 'முதன்மை நம்பகத்தன்மை குறிப்பு',
        supportingEvidencePrefix: 'ஆதரவுச் சான்று',
        cataloguedVolumesSuffix: 'பட்டியலிடப்பட்ட தொகுதிகள்',
        verifiedCitationsSuffix: 'சரிபார்க்கப்பட்ட மேற்கோள்கள் & ஆவணத் தொகுதிகள்',
        bibLocationRepo: 'இந்தியத் தொல்லியல் துறை (ASI), ஒடிசா மாநில அருங்காட்சியகம் & GOML சென்னை',
        bibRulerAuthority: 'கல்வெட்டு & கல்விப் பதிப்புக் குழுக்கள்',
        corpusClassificationLabel: 'ஆவணத் தொகுப்பு வகைப்பாடு',
        cataloguedVolumesLabel: 'பட்டியலிடப்பட்ட தொகுதிகள்',
        coreVolumesSuffix: 'முதன்மைத் தொகுதிகள் & தொடர்கள்',
        custodialArchivesLabel: 'பாதுகாப்பு ஆவணக் காப்பகங்கள்',
        bibTraditionalText:
          'கோயில் ஓலைச்சுவடி ஏடுகள் (மாதல பாஞ்சி) மற்றும் வட்டார கிராம கைபியத் பதிவேடுகளுடன் ஒப்பிடப்பட்டது.',
        citationPrefix: 'மேற்கோள்',
        docLiterarySourcesHeading: 'ஆவண மற்றும் இலக்கிய ஆதாரங்கள்',
        docLiterarySourcesDesc: (repo, count) =>
          `ஆவணக் காப்பக மூலம் (${repo}) மற்றும் பட்டியலிடப்பட்ட ஆதார மேற்கோள்கள் (${count} முதன்மை/இரண்டாம் நிலை ஆதாரங்கள்) இந்த ஆவணத்தின் கல்வெட்டுப் பின்னணியுடன் அதன் ஓலைச்சுவடி மற்றும் அரசிதழ் மரபைப் பாதுகாக்கின்றன.`,
        claimsFurtherResearchHeading: 'மேலும் ஆராய்ச்சி மற்றும் சரிபார்ப்பு தேவைப்படும் கூற்றுகள்',
        claimsFurtherResearchDesc: date =>
          `தேதியிடப்பட்ட கல்வெட்டு/வரலாற்று ஏட்டுப் பாடத்திற்கு (${date}) அப்பாற்பட்ட வட்டார வாய்மொழி வம்சாவளிகள், புதிய கல்வெட்டுக் கண்டுபிடிப்புகள் கிடைக்கும் வரை ஒப்பீட்டு ஆய்வுக் கருதுகோள்களாகவே பராமரிக்கப்படுகின்றன.`,
        relatedRulersDynastiesHeading: 'தொடர்புடைய மன்னர்கள், வம்சங்கள் & பேரரசுகள்',
        primarySovereignAuthorityLabel: 'முதன்மை இறையாண்மை அதிகாரம்',
        geographicalJurisdictionLabel: 'புவியியல் அதிகார வரம்பு',
        epigraphicMonumentEvidenceLabel: 'கல்வெட்டு / நினைவுச்சின்ன ஆதாரம்:',
        relatedMonographsHeading: 'தொடர்புடைய வரலாற்று ஆராய்ச்சி நூல்கள் (Monographs)',
        historicalMonographBadge: 'வரலாற்று ஆராய்ச்சி நூல்',
        relatedKingdomsPersonalitiesHeading: 'தொடர்புடைய பேரரசுகள், வம்சங்கள் & வரலாற்று ஆளுமைகள்',
        kingdoms: [
          {
            title: 'சூர்யவம்ச கஜபதி பேரரசு & அரச வம்சாவளி',
            period: 'பொ.ஊ. 1434–1541 • கட்டாக், புரி & கலிங்க-உத்கல',
            badge: 'வம்சம் & பேரரசு ஆட்சி',
            imageUrl: '/assets/gallery/konark_wheel.svg',
            route: '/gajapathi-kings'
          },
          {
            title: 'ஒட்ர தேசம், கலிங்கம் & உத்கல வரலாற்றுப் புவியியல்',
            period: 'பண்டைய முதல் தொடக்க நவீன காலம் • மகாநதி முதல் கோதாவரி',
            badge: 'வரலாற்று அரசு & நிலப்பரப்பு',
            imageUrl: '/assets/gallery/udayagiri_caves.svg',
            route: '/odra-desha'
          },
          {
            title: 'சௌஹான், பஞ்சா, சோம & கங்க வம்சக் காலவரிசை',
            period: 'பொ.ஊ. 4-ஆம் நூற்றாண்டு – 19-ஆம் நூற்றாண்டு',
            badge: 'வம்சக் காலவரிசை',
            imageUrl: '/assets/gallery/jagannath_puri.svg',
            route: '/genealogy'
          }
        ]
      },
      mr: {
        scriptPaleographyLabel: 'लिपी आणि प्राचीन लिपिशस्त्र',
        inscribedLanguageLabel: 'कोरलेली भाषा',
        dynastyLabel: 'राजवंश',
        epigraphiaIndicaKeyword: 'एपिग्राफिया इंडिका',
        copperPlateEpigraphyKeyword: 'ताम्रपट आणि शिलालेख',
        asiAttribution: 'भारतीय पुरातत्त्व सर्वेक्षण (ASI) शिलालेख मालिका',
        inscVerifiedPrefix: (ctx, script, langName, era, loc) =>
          `${ctx} प्राथमिक शिलालेखीय मजकूर ${script} (${langName}) मध्ये कोरलेला, कालखंड: ${era}, प्राप्तीस्थळ: ${loc}.`,
        inscTraditionalText:
          'मादला पांजीच्या राजभोग बखरीशी आणि प्रादेशिक कैफियत नोंदवह्यांशी जुळणारा; जे या शाही देणग्या आणि प्रशासकीय घोषणांची जिवंत आठवण जतन करतात.',
        inscScholarlyText: (refs, dynasty) =>
          `${refs} मध्ये चिकित्सकपणे संपादित आणि प्रकाशित. इतिहासकार या शिलालेखाचा वापर ${dynasty} सार्वभौम प्रशासनाचा प्राथमिक कालानुक्रमिक आधार म्हणून करतात.`,
        origTranscriptionLabel: 'मूळ लिप्यंतरण',
        translationLabel: 'भाषांतर',
        manuscriptSuffix: 'हस्तलिखित',
        palmLeafKeyword: 'ताडपत्र हस्तलिखित',
        archivalRepoKeyword: 'अभिलेखीय भांडार',
        authorBodyLabel: 'लेखक / संकलन संस्था',
        approxDateLabel: 'अंदाजे कालखंड',
        origLanguageLabel: 'मूळ भाषा',
        custodialCollectionLabel: 'संरक्षक संग्रहालय / संग्रह',
        provenanceCustodyLabel: 'उगम आणि अभिरक्षा',
        copyrightLicenseLabel: 'कॉपीराइट आणि परवाना',
        docVerifiedText: (loc, prov) => `भौतिक हस्तलिखित संग्रह ${loc} येथे जतन केलेला आहे. ${prov}`,
        docTraditionalFallback:
          'ओडिशा आणि दक्षिण भारतातील वंशपरंपरागत ताडपत्र ग्रंथालयांमध्ये मंदिर विधी बखरींसह जतन केलेले.',
        docScholarlyExcerptPrefix: 'उतारा भाषांतर',
        corroboratingMonumentsLabel: 'पुष्टी करणारी स्मारके आणि शिलालेख',
        primarySourcesLabel: 'प्राथमिक स्रोत',
        evTraditionalFallback:
          'प्रादेशिक मंदिर बखरी (मादला पांजी), स्थानिक कैफियती आणि ओड्र व दख्खन वसाहतींच्या सामुदायिक वंशावळी स्मृतीमध्ये जतन केलेले.',
        medievalCitadelSuffix: 'मध्ययुगीन किल्ला',
        regionSuffix: 'प्रदेश',
        gajapathiAdminAuthority: 'सूर्यवंश गजपती आणि ओड्र-कलिंग प्रशासन',
        asiStateEpigraphyAttr: 'भारतीय पुरातत्त्व सर्वेक्षण (ASI) आणि राज्य शिलालेख अहवाल',
        ancientNameLabel: 'प्राचीन ऐतिहासिक नाव',
        historicalRegionLabel: 'ऐतिहासिक प्रदेश',
        modernDistrictStateLabel: 'आधुनिक जिल्हा आणि राज्य',
        inscriptionsFoundLabel: 'सापडलेले शिलालेख',
        locTraditionalText: state =>
          `संपूर्ण ${state} मधील प्रादेशिक कैफियती, मंदिर बखरी आणि जिवंत सामुदायिक वारशात गौरवलेले.`,
        locScholarlyPrefix: (summary, inscs) => `${summary} प्रत्यक्ष स्थळावरील शिलालेखीय पुराव्यांद्वारे पुष्टी: ${inscs}.`,
        onSiteEpigraphicBadge: 'स्थळगत शिलालेखीय आणि पुरातत्त्वीय नोंद',
        asiConservationPrefix: 'भारतीय पुरातत्त्व सर्वेक्षण (ASI) संवर्धन आणि उत्खनन अहवाल',
        architecturalStyleLabel: 'स्थापत्य शैली',
        monVerifiedText: (loc, state, style, century, sig) =>
          `${loc}, ${state} येथील उभे स्थापत्य स्मारक (${style}, ${century}). ${sig}`,
        monTraditionalText: state => `${state} च्या पवित्र मंदिर बखरी आणि जिवंत भक्ती परंपरांमध्ये पूजनीय.`,
        monScholarlyText: sources => `${sources} मध्ये दस्तऐवजीकरण केलेले.`,
        epistemicReviewKeyword: 'पुरावा परीक्षण',
        historiographyKeyword: 'इतिहासलेखन',
        reviewedPrefix: 'परीक्षित',
        reviewBoardLocation: 'सूर्यवंश शिलालेखीय आणि इतिहासलेखन परीक्षण मंडळ',
        comparativeAnalysisAuthority: 'तुलनात्मक शिलालेखीय आणि साहित्यिक विश्लेषण',
        evaluatedTopicLabel: 'मूल्यमापन केलेला विषय',
        verificationFindingLabel: 'पडताळणी निष्कर्ष',
        reviewDateLabel: 'परीक्षण दिनांक',
        reliabilityNoteLabel: 'प्राथमिक विश्वासार्हता नोंद',
        supportingEvidencePrefix: 'समर्थक पुरावा',
        cataloguedVolumesSuffix: 'सूचीबद्ध खंड',
        verifiedCitationsSuffix: 'सत्यापित संदर्भ आणि अभिलेखीय खंड',
        bibLocationRepo: 'भारतीय पुरातत्त्व सर्वेक्षण (ASI), ओडिशा राज्य संग्रहालय आणि GOML चेन्नई',
        bibRulerAuthority: 'शिलालेखीय आणि शैक्षणिक संपादकीय मंडळे',
        corpusClassificationLabel: 'संग्रह वर्गीकरण',
        cataloguedVolumesLabel: 'सूचीबद्ध खंड',
        coreVolumesSuffix: 'प्रमुख खंड आणि मालिका',
        custodialArchivesLabel: 'संरक्षक अभिलेखागार',
        bibTraditionalText:
          'मंदिर ताडपत्र बखरी (मादला पांजी) आणि प्रादेशिक गाव कैफियत नोंदवह्यांशी तुलना केलेली.',
        citationPrefix: 'संदर्भ',
        docLiterarySourcesHeading: 'दस्तऐवजी आणि साहित्यिक स्रोत',
        docLiterarySourcesDesc: (repo, count) =>
          `अभिलेखीय उगम (${repo}) आणि सूचीबद्ध संदर्भ (${count} प्राथमिक/दुय्यम स्रोत) या नोंदीच्या शिलालेखीय संदर्भासह तिचे ताडपत्र आणि गॅझेटियर प्रसारण जतन करतात.`,
        claimsFurtherResearchHeading: 'पुढील संशोधन आणि पडताळणी आवश्यक असलेले दावे',
        claimsFurtherResearchDesc: date =>
          `दिनांकित शिलालेख/बखर मजकुराच्या (${date}) पलीकडील प्रादेशिक मौखिक वंशावळी पुढील शिलालेखीय शोधापर्यंत खुल्या तुलनात्मक संशोधन गृहीतके म्हणून ठेवल्या आहेत.`,
        relatedRulersDynastiesHeading: 'संबंधित शासक, राजवंश आणि साम्राज्ये',
        primarySovereignAuthorityLabel: 'प्रमुख सार्वभौम अधिकार',
        geographicalJurisdictionLabel: 'भौगोलिक अधिकारक्षेत्र',
        epigraphicMonumentEvidenceLabel: 'शिलालेखीय / स्मारक पुरावा:',
        relatedMonographsHeading: 'संबंधित ऐतिहासिक शोधप्रबंध (Monographs)',
        historicalMonographBadge: 'ऐतिहासिक शोधप्रबंध',
        relatedKingdomsPersonalitiesHeading: 'संबंधित साम्राज्ये, राजवंश आणि ऐतिहासिक व्यक्तिमत्त्वे',
        kingdoms: [
          {
            title: 'सूर्यवंशी गजपती साम्राज्य आणि शाही वंशावळ',
            period: 'इ.स. १४३४–१५४१ • कटक, पुरी आणि कलिंग-उत्कल',
            badge: 'राजवंश आणि साम्राज्यीय राज्यव्यवस्था',
            imageUrl: '/assets/gallery/konark_wheel.svg',
            route: '/gajapathi-kings'
          },
          {
            title: 'ओड्र देश, कलिंग आणि उत्कल ऐतिहासिक भूगोल',
            period: 'प्राचीन ते प्रारंभिक आधुनिक काळ • महानदी ते गोदावरी',
            badge: 'ऐतिहासिक राज्य आणि भूप्रदेश',
            imageUrl: '/assets/gallery/udayagiri_caves.svg',
            route: '/odra-desha'
          },
          {
            title: 'चौहान, भंज, सोम आणि गंग राजवंशीय कालक्रम',
            period: 'इ.स. ४ थे शतक – १९ वे शतक',
            badge: 'राजवंशीय कालक्रम',
            imageUrl: '/assets/gallery/jagannath_puri.svg',
            route: '/genealogy'
          }
        ]
      },
      or: {
        scriptPaleographyLabel: 'ଲିପି ଓ ପ୍ରାଚୀନ ଲିପିଶାସ୍ତ୍ର',
        inscribedLanguageLabel: 'ଖୋଦିତ ଭାଷା',
        dynastyLabel: 'ରାଜବଂଶ',
        epigraphiaIndicaKeyword: 'ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା',
        copperPlateEpigraphyKeyword: 'ତାମ୍ରଫଳକ ଓ ଶିଳାଲେଖ',
        asiAttribution: 'ଭାରତୀୟ ପ୍ରତ୍ନତତ୍ତ୍ୱ ସର୍ବେକ୍ଷଣ (ASI) ଶିଳାଲେଖ ଶୃଙ୍ଖଳା',
        inscVerifiedPrefix: (ctx, script, langName, era, loc) =>
          `${ctx} ପ୍ରାଥମିକ ଶିଳାଲେଖ ପାଠ୍ୟ ${script} (${langName}) ରେ ଖୋଦିତ, କାଳ: ${era}, ପ୍ରାପ୍ତିସ୍ଥାନ: ${loc}।`,
        inscTraditionalText:
          'ମାଦଳା ପାଞ୍ଜିର ରାଜଭୋଗ ଇତିବୃତ୍ତ ଏବଂ ଆଞ୍ଚଳିକ କୈଫିୟତ ରେଜିଷ୍ଟର ସହିତ ସମନ୍ୱିତ, ଯାହା ଏହି ରାଜକୀୟ ଦାନ ଏବଂ ପ୍ରଶାସନିକ ଘୋଷଣାର ଜୀବନ୍ତ ସ୍ମୃତିକୁ ସଂରକ୍ଷିତ କରେ।',
        inscScholarlyText: (refs, dynasty) =>
          `${refs} ରେ ସମାଲୋଚନାତ୍ମକ ଭାବେ ସମ୍ପାଦିତ ଓ ପ୍ରକାଶିତ। ଐତିହାସିକମାନେ ଏହି ଅଭିଲେଖକୁ ${dynasty} ସାର୍ବଭୌମ ପ୍ରଶାସନର ପ୍ରାଥମିକ କାଳକ୍ରମିକ ଆଧାର ଭାବେ ବ୍ୟବହାର କରନ୍ତି।`,
        origTranscriptionLabel: 'ମୂଳ ଲିପ୍ୟନ୍ତରଣ',
        translationLabel: 'ଅନୁବାଦ',
        manuscriptSuffix: 'ପୋଥି / ପାଣ୍ଡୁଲିପି',
        palmLeafKeyword: 'ତାଳପତ୍ର ପୋଥି',
        archivalRepoKeyword: 'ଅଭିଲେଖାଗାର ଭଣ୍ଡାର',
        authorBodyLabel: 'ଲେଖକ / ସଂକଳନକାରୀ ସଂସ୍ଥା',
        approxDateLabel: 'ଆନୁମାନିକ କାଳ',
        origLanguageLabel: 'ମୂଳ ଭାଷା',
        custodialCollectionLabel: 'ସଂରକ୍ଷକ ସଂଗ୍ରହାଳୟ / ସଂଗ୍ରହ',
        provenanceCustodyLabel: 'ଉତ୍পତ୍ତି ଓ ଅଭିରକ୍ଷା',
        copyrightLicenseLabel: 'କପିରାଇଟ୍ ଓ ଲାଇସେନ୍ସ',
        docVerifiedText: (loc, prov) => `ଭୌତିକ ପୋଥି ସଂଗ୍ରହ ${loc} ଠାରେ ସଂରକ୍ଷିତ। ${prov}`,
        docTraditionalFallback:
          'ଓଡ଼ିଶା ଏବଂ ଦକ୍ଷିଣ ଭାରତର ବଂଶାନୁକ୍ରମିକ ତାଳପତ୍ର ପୋଥି ଗ୍ରନ୍ଥାଗାରରେ ମନ୍ଦିର ରୀତିନୀତି ଇତିବୃତ୍ତ ସହିତ ସଂରକ୍ଷିତ।',
        docScholarlyExcerptPrefix: 'ଅଂଶ ଅନୁବାଦ',
        corroboratingMonumentsLabel: 'ସମର୍ଥନକାରୀ ସ୍ମାରକୀ ଓ ଶିଳାଲେଖ',
        primarySourcesLabel: 'ପ୍ରାଥମିକ ଉତ୍ସ',
        evTraditionalFallback:
          'ଆଞ୍ଚଳିକ ମନ୍ଦିର ଇତିବୃତ୍ତ (ମାଦଳା ପାଞ୍ଜି), ସ୍ଥାନୀୟ କୈଫିୟତ ଏବଂ ଓଡ୍ର ଓ ଦাক্ষିଣାତ୍ୟ ବସତିଗୁଡ଼ିକର ସାମୁଦାୟିକ ବଂଶାବଳୀ ସ୍ମୃତିରେ ସଂରକ୍ଷିତ।',
        medievalCitadelSuffix: 'ମଧ୍ୟযୁଗୀୟ ଦୁର୍ଗ',
        regionSuffix: 'ଅଞ୍ଚଳ',
        gajapathiAdminAuthority: 'ସୂର୍ଯ୍ୟବଂଶ ଗଜପତି ଓ ଓଡ୍ର-କଳିଙ୍ଗ ପ୍ରଶାସନ',
        asiStateEpigraphyAttr: 'ଭାରତୀୟ ପ୍ରତ୍ନତତ୍ତ୍ୱ ସର୍ବେକ୍ଷଣ (ASI) ଓ ରାଜ୍ୟ ଶିଳାଲେଖ ରିପୋର୍ଟ',
        ancientNameLabel: 'ପ୍ରାଚୀନ ଐତିହାସିକ ନାମ',
        historicalRegionLabel: 'ଐତିହାସିକ ଅଞ୍ଚଳ',
        modernDistrictStateLabel: 'ଆଧୁନିକ ଜିଲ୍ଲା ଓ ରାଜ୍ୟ',
        inscriptionsFoundLabel: 'ପ୍ରାପ୍ତ ଶିଳାଲେଖ',
        locTraditionalText: state =>
          `ସମଗ୍ର ${state} ର ଆଞ୍ଚଳିକ କୈଫିୟତ, ମନ୍ଦିର ଇତିବୃତ୍ତ ଏବଂ ଜୀବନ୍ତ ସାମୁଦାୟିକ ଐତିହ୍ୟରେ ବନ୍ଦିତ।`,
        locScholarlyPrefix: (summary, inscs) => `${summary} ସ୍ଥଳରୁ ମିଳିଥିବା ଶିଳାଲେଖ ପ୍ରମାଣ ଦ୍ୱାରା ସମର୍ଥିତ: ${inscs}।`,
        onSiteEpigraphicBadge: 'ସ୍ଥଳଗତ ଶିଳାଲେଖ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅଭିଲେଖ',
        asiConservationPrefix: 'ଭାରତୀୟ ପ୍ରତ୍ନତତ୍ତ୍ୱ ସର୍ବେକ୍ଷଣ (ASI) ସଂରକ୍ଷଣ ଓ ଖନନ ରିପୋର୍ଟ',
        architecturalStyleLabel: 'ସ୍ଥାପତ୍ୟ ଶୈଳୀ',
        monVerifiedText: (loc, state, style, century, sig) =>
          `${loc}, ${state} ଠାରେ ଅବସ୍ଥିତ ସ୍ଥାପତ୍ୟ ସ୍ମାରକୀ (${style}, ${century})। ${sig}`,
        monTraditionalText: state => `${state} ର ପବିତ୍ର ମନ୍ଦିର ଇତିବୃତ୍ତ ଏବଂ ଜୀବନ୍ତ ଭକ୍ତି ପରମ୍ପରାରେ ପୂଜିତ।`,
        monScholarlyText: sources => `${sources} ରେ ନଥିଭୁକ୍ତ।`,
        epistemicReviewKeyword: 'ପ୍ରମାଣ ସମୀକ୍ଷା',
        historiographyKeyword: 'ଇତିହାସ-ଲିଖନ',
        reviewedPrefix: 'ସମୀକ୍ଷିତ',
        reviewBoardLocation: 'ସୂର୍ଯ୍ୟବଂଶ ଶିଳାଲେଖ ଓ ଇତିହାସ ସମୀକ୍ଷା ବୋର୍ଡ',
        comparativeAnalysisAuthority: 'ତୁଳନାତ୍ମକ ଶିଳାଲେଖ ଓ ସାହିତ୍ୟିକ ବିଶ୍ଳେଷଣ',
        evaluatedTopicLabel: 'ମୂଲ୍ୟାଙ୍କିତ ବିଷୟ',
        verificationFindingLabel: 'ଯାଞ୍ଚ ନିଷ୍କର୍ଷ',
        reviewDateLabel: 'ସମୀକ୍ଷା ତାରିଖ',
        reliabilityNoteLabel: 'ପ୍ରାଥମିକ ବିଶ୍ୱସନୀୟତା ଟିପ୍ପଣୀ',
        supportingEvidencePrefix: 'ସହାୟକ ପ୍ରମାଣ',
        cataloguedVolumesSuffix: 'ତାଲିକାଭୁକ୍ତ ଖଣ୍ଡ',
        verifiedCitationsSuffix: 'ଯାଞ୍ଚ ହୋଇଥିବା ଉଦ୍ଧୃତି ଓ ଅଭିଲେଖୀୟ ଖଣ୍ଡ',
        bibLocationRepo: 'ଭାରତୀୟ ପ୍ରତ୍ନତତ୍ତ୍ୱ ସର୍ବେକ୍ଷଣ (ASI), ଓଡ଼ିଶା ରାଜ୍ୟ ସଂଗ୍ରହାଳୟ ଓ GOML ଚେନ୍ନାଇ',
        bibRulerAuthority: 'ଶିଳାଲେଖ ଓ ଶୈକ୍ଷଣିକ ସମ୍ପାଦକୀୟ ବୋର୍ଡ',
        corpusClassificationLabel: 'ସଂଗ୍ରହ ବର୍ଗୀକରଣ',
        cataloguedVolumesLabel: 'ତାଲିକାଭୁକ୍ତ ଖଣ୍ଡ',
        coreVolumesSuffix: 'ମୂଳ ଖଣ୍ଡ ଓ ଶୃଙ୍ଖଳା',
        custodialArchivesLabel: 'ସଂରକ୍ଷକ ଅଭିଲେଖାଗାର',
        bibTraditionalText:
          'ମନ୍ଦିର ତାଳପତ୍ର ଇତିବୃତ୍ତ (ମାଦଳା ପାଞ୍ଜି) ଏବଂ ଆଞ୍ଚଳିକ ଗ୍ରାମ କୈଫିୟତ ରେଜିଷ୍ଟର ସହିତ ତୁଳନା କରାଯାଇଛି।',
        citationPrefix: 'ଉଦ୍ଧୃତି',
        docLiterarySourcesHeading: 'ଦଲିଲ ଓ ସାହିତ୍ୟିକ ଉତ୍ସ',
        docLiterarySourcesDesc: (repo, count) =>
          `ଅଭିଲେଖାଗାର ଉତ୍ସ (${repo}) ଏବଂ ତାଲିକାଭୁକ୍ତ ଉଦ୍ଧୃତି (${count} ପ୍ରାଥମିକ/ଦ୍ୱିତୀୟକ ଉତ୍ସ) ଏହି ଅଭିଲେଖର ଶିଳାଲେଖ ପ୍ରସଙ୍ଗ ସହିତ ଏହାର ତାଳପତ୍ର ଓ ଗେଜେଟିୟର ପରମ୍ପରାକୁ ସଂରକ୍ଷିତ କରେ।`,
        claimsFurtherResearchHeading: 'ଅଧିକ ଗବେଷଣା ଓ ଯାଞ୍ଚ ଆବଶ୍ୟକ କରୁଥିବା ଦାବି',
        claimsFurtherResearchDesc: date =>
          `ତାରିଖଯୁକ୍ତ ଶିଳାଲେଖ/ଇତିବୃତ୍ତ ପାଠ୍ୟ (${date}) ବାହାରେ ଥିବା ଆଞ୍ଚଳିକ ମୌଖିକ ବଂଶାବଳୀଗୁଡ଼ିକୁ ପରବର୍ତ୍ତୀ ଶିଳାଲେଖ ଆବିଷ୍କାର ପର୍ଯ୍ୟନ୍ତ ଖୋଲା ତୁଳନାତ୍ମକ ଗବେଷଣା ପ୍ରସ୍ତାବ ଭାବେ ରଖାଯାଇଛି।`,
        relatedRulersDynastiesHeading: 'ସମ୍ପୃକ୍ତ ଶାସକ, ରାଜବଂଶ ଓ ସାମ୍ରାଜ୍ୟ',
        primarySovereignAuthorityLabel: 'ପ୍ରଧାନ ସାର୍ବଭୌମ କ୍ଷମତା',
        geographicalJurisdictionLabel: 'ଭୌଗୋଳିକ ଅଧିକାର କ୍ଷେତ୍ର',
        epigraphicMonumentEvidenceLabel: 'ଶିଳାଲେଖ / ସ୍ମାରକୀ ପ୍ରମାଣ:',
        relatedMonographsHeading: 'ସମ୍ପୃକ୍ତ ଐତିହାସିକ ଗବେଷଣା ଗ୍ରନ୍ଥ (Monographs)',
        historicalMonographBadge: 'ଐତିହାସିକ ଗବେଷଣା ଗ୍ରନ୍ଥ',
        relatedKingdomsPersonalitiesHeading: 'ସମ୍ପୃକ୍ତ ସାମ୍ରାଜ୍ୟ, ରାଜବଂଶ ଓ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ',
        kingdoms: [
          {
            title: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ ଓ ରାଜ ବଂଶାବଳୀ',
            period: '୧୪୩୪–୧୫୪୧ ଖ୍ରୀଷ୍ଟାବ୍ଦ • କଟକ, ପୁରୀ ଓ କଳିଙ୍ଗ-ଉତ୍କଳ',
            badge: 'ରାଜବଂଶ ଓ ସାମ୍ରାଜ୍ୟ ଶାସନ',
            imageUrl: '/assets/gallery/konark_wheel.svg',
            route: '/gajapathi-kings'
          },
          {
            title: 'ଓଡ୍ର ଦେଶ, କଳିଙ୍ଗ ଓ ଉତ୍କଳର ଐତିହାସିକ ଭୂଗୋଳ',
            period: 'ପ୍ରାଚୀନରୁ ପ୍ରାରମ୍ଭିକ ଆଧୁନିକ କାଳ • ମହାନଦୀରୁ ଗୋଦାବରୀ',
            badge: 'ଐତିହାସିକ ରାଜ୍ୟ ଓ ଭୂখଣ୍ଡ',
            imageUrl: '/assets/gallery/udayagiri_caves.svg',
            route: '/odra-desha'
          },
          {
            title: 'ଚୌହାନ, ଭଞ୍ଜ, ସୋମ ଓ ଗଙ୍ଗ ରାଜବଂଶୀୟ କାଳକ୍ରମ',
            period: 'ଖ୍ରୀଷ୍ଟୀୟ ୪ର୍ଥ ଶତାବ୍ଦୀ – ୧୯ଶ ଶତାବ୍ଦୀ',
            badge: 'ରାଜବଂଶୀୟ କାଳକ୍ରମ',
            imageUrl: '/assets/gallery/jagannath_puri.svg',
            route: '/genealogy'
          }
        ]
      },
      bn: {
        scriptPaleographyLabel: 'লিপি ও প্রাচীন লিপিতত্ত্ব',
        inscribedLanguageLabel: 'খোদাইকৃত ভাষা',
        dynastyLabel: 'রাজবংশ',
        epigraphiaIndicaKeyword: 'এপিগ্রাফিয়া ইন্ডিকা',
        copperPlateEpigraphyKeyword: 'তাম্রশাসন ও শিলালিপি',
        asiAttribution: 'ভারতের প্রত্নতাত্ত্বিক জরিপ (ASI) প্রত্নলিপি সিরিজ',
        inscVerifiedPrefix: (ctx, script, langName, era, loc) =>
          `${ctx} প্রাথমিক প্রত্নলিপি পাঠ্যটি ${script} (${langName}) লিপিতে খোদাইকৃত, কাল: ${era}, প্রাপ্তিস্থান: ${loc}।`,
        inscTraditionalText:
          'মাদলা পাঞ্জির রাজভোগ ইতিবৃত্ত এবং আঞ্চলিক কৈফিয়ত নিবন্ধের সাথে সমন্বিত, যা এই রাজকীয় অনুদান ও প্রশাসনিক ঘোষণার জীবন্ত স্মৃতি সংরক্ষণ করে।',
        inscScholarlyText: (refs, dynasty) =>
          `${refs}-এ সমালোচনামূলকভাবে সম্পাদিত ও প্রকাশিত। ইতিহাসবিদরা এই লেখটিকে ${dynasty} সার্বভৌম প্রশাসনের প্রাথমিক কালানুক্রমিক ভিত্তি হিসেবে ব্যবহার করেন।`,
        origTranscriptionLabel: 'মূল প্রতিলিপি',
        translationLabel: 'অনুবাদ',
        manuscriptSuffix: 'পাণ্ডুলিপি',
        palmLeafKeyword: 'তালপাতার পাণ্ডুলিপি',
        archivalRepoKeyword: 'আর্কাইভাল সংগ্রহশালা',
        authorBodyLabel: 'লেখক / সংকলক সংস্থা',
        approxDateLabel: 'আনুমানিক কাল',
        origLanguageLabel: 'মূল ভাষা',
        custodialCollectionLabel: 'সংরক্ষক সংগ্রহশালা / জাদুঘর',
        provenanceCustodyLabel: 'উৎপত্তি ও হেফাজত',
        copyrightLicenseLabel: 'কপিরাইট ও লাইসেন্স',
        docVerifiedText: (loc, prov) => `ভৌত পাণ্ডুলিপি সংগ্রহটি ${loc}-এ সংরক্ষিত। ${prov}`,
        docTraditionalFallback:
          'ওড়িশা ও দক্ষিণ ভারতের বংশানুক্রমিক তালপাতার পাণ্ডুলিপি গ্রন্থাগারে মন্দিরের আচার ইতিবৃত্তের সাথে সংরক্ষিত।',
        docScholarlyExcerptPrefix: 'উদ্ধৃতি অনুবাদ',
        corroboratingMonumentsLabel: 'সমর্থনকারী স্মৃতিস্তম্ভ ও শিলালিপি',
        primarySourcesLabel: 'প্রাথমিক উৎস',
        evTraditionalFallback:
          'আঞ্চলিক মন্দির ইতিবৃত্ত (মাদলা পাঞ্জি), স্থানীয় কৈফিয়ত এবং ওড্র ও দাক্ষিণাত্য বসতির সম্প্রদায়গত বংশাবলি স্মৃতিতে সংরক্ষিত।',
        medievalCitadelSuffix: 'মধ্যযুগীয় দুর্গ',
        regionSuffix: 'অঞ্চল',
        gajapathiAdminAuthority: 'সূর্যবংশ গজপতি ও ওড্র-কলিঙ্গ প্রশাসন',
        asiStateEpigraphyAttr: 'ভারতের প্রত্নতাত্ত্বিক জরিপ (ASI) ও রাজ্য প্রত্নলিপি প্রতিবেদন',
        ancientNameLabel: 'প্রাচীন ঐতিহাসিক নাম',
        historicalRegionLabel: 'ঐতিহাসিক অঞ্চল',
        modernDistrictStateLabel: 'আধুনিক জেলা ও রাজ্য',
        inscriptionsFoundLabel: 'প্রাপ্ত শিলালিপি',
        locTraditionalText: state =>
          `সমগ্র ${state}-এর আঞ্চলিক কৈফিয়ত, মন্দির ইতিবৃত্ত এবং জীবন্ত সম্প্রদায়গত ঐতিহ্যে সমাদৃত।`,
        locScholarlyPrefix: (summary, inscs) => `${summary} স্থান থেকে প্রাপ্ত প্রত্নলিপি প্রমাণের দ্বারা সমর্থিত: ${inscs}।`,
        onSiteEpigraphicBadge: 'স্থানীয় প্রত্নলিপি ও প্রত্নতাত্ত্বিক নথি',
        asiConservationPrefix: 'ভারতের প্রত্নতাত্ত্বিক জরিপ (ASI) সংরক্ষণ ও খনন প্রতিবেদন',
        architecturalStyleLabel: 'স্থাপত্য শৈলী',
        monVerifiedText: (loc, state, style, century, sig) =>
          `${loc}, ${state}-এ অবস্থিত স্থাপত্য স্মৃতিস্তম্ভ (${style}, ${century})। ${sig}`,
        monTraditionalText: state => `${state}-এর পবিত্র মন্দির ইতিবৃত্ত এবং জীবন্ত ভক্তি ঐতিহ্যে পূজিত।`,
        monScholarlyText: sources => `${sources}-এ নথিভুক্ত।`,
        epistemicReviewKeyword: 'প্রমাণ পর্যালোচনা',
        historiographyKeyword: 'ইতিহাসচর্চা',
        reviewedPrefix: 'পর্যালোচিত',
        reviewBoardLocation: 'সূর্যবংশ প্রত্নলিপি ও ইতিহাসচর্চা পর্যালোচনা বোর্ড',
        comparativeAnalysisAuthority: 'তুলনামূলক প্রত্নলিপি ও সাহিত্যিক বিশ্লেষণ',
        evaluatedTopicLabel: 'মূল্যায়িত বিষয়',
        verificationFindingLabel: 'যাচাইকরণ ফলাফল',
        reviewDateLabel: 'পর্যালোচনার তারিখ',
        reliabilityNoteLabel: 'প্রাথমিক নির্ভরযোগ্যতা নোট',
        supportingEvidencePrefix: 'সহায়ক প্রমাণ',
        cataloguedVolumesSuffix: 'তালিকাভুক্ত খণ্ড',
        verifiedCitationsSuffix: 'যাচাইকৃত উদ্ধৃতি ও আর্কাইভাল খণ্ড',
        bibLocationRepo: 'ভারতের প্রত্নতাত্ত্বিক জরিপ (ASI), ওড়িশা রাজ্য জাদুঘর ও GOML চেন্নাই',
        bibRulerAuthority: 'প্রত্নলিপি ও একাডেমিক সম্পাদনা বোর্ড',
        corpusClassificationLabel: 'সংগ্রহের শ্রেণিবিভাগ',
        cataloguedVolumesLabel: 'তালিকাভুক্ত খণ্ড',
        coreVolumesSuffix: 'মূল খণ্ড ও সিরিজ',
        custodialArchivesLabel: 'সংরক্ষক আর্কাইভস',
        bibTraditionalText:
          'মন্দিরের তালপাতার ইতিবৃত্ত (মাদলা পাঞ্জি) এবং আঞ্চলিক গ্রাম কৈফিয়ত নিবন্ধের সাথে মিলিয়ে দেখা হয়েছে।',
        citationPrefix: 'উদ্ধৃতি',
        docLiterarySourcesHeading: 'দলিল ও সাহিত্যিক উৎস',
        docLiterarySourcesDesc: (repo, count) =>
          `আর্কাইভাল উৎস (${repo}) এবং সূচিবদ্ধ উদ্ধৃতি (${count}টি প্রাথমিক/দ্বিতীয় পর্যায়ের উৎস) এই নথির প্রত্নলিপি প্রেক্ষাপটের পাশাপাশি এর তালপাতা ও গেজেটিয়ার পরম্পরা সংরক্ষণ করে।`,
        claimsFurtherResearchHeading: 'অধিকতর গবেষণা ও যাচাইকরণ প্রয়োজন এমন দাবি',
        claimsFurtherResearchDesc: date =>
          `তারিখযুক্ত শিলালিপি/ইতিবৃত্ত পাঠ্যের (${date}) বাইরের আঞ্চলিক মৌখিক বংশাবলি পরবর্তী প্রত্নলিপি আবিষ্কার না হওয়া পর্যন্ত উন্মুক্ত তুলনামূলক গবেষণা অনুমান হিসেবে রাখা হয়েছে।`,
        relatedRulersDynastiesHeading: 'সংশ্লিষ্ট শাসক, রাজবংশ ও সাম্রাজ্য',
        primarySovereignAuthorityLabel: 'প্রধান সার্বভৌম কর্তৃপক্ষ',
        geographicalJurisdictionLabel: 'ভৌগোলিক এখতিয়ার',
        epigraphicMonumentEvidenceLabel: 'প্রত্নলিপি / স্মৃতিস্তম্ভ প্রমাণ:',
        relatedMonographsHeading: 'সংশ্লিষ্ট ঐতিহাসিক গবেষণা মনোগ্রাফ (Monographs)',
        historicalMonographBadge: 'ঐতিহাসিক গবেষণা মনোগ্রাফ',
        relatedKingdomsPersonalitiesHeading: 'সংশ্লিষ্ট সাম্রাজ্য, রাজবংশ ও ঐতিহাসিক ব্যক্তিত্ব',
        kingdoms: [
          {
            title: 'সূর্যবংশী গজপতি সাম্রাজ্য ও রাজবংশাবলি',
            period: '১৪৩৪–১৫৪১ খ্রিস্টাব্দ • কটক, পুরী ও কলিঙ্গ-উৎকল',
            badge: 'রাজবংশ ও সাম্রাজ্যিক শাসন',
            imageUrl: '/assets/gallery/konark_wheel.svg',
            route: '/gajapathi-kings'
          },
          {
            title: 'ওড্র দেশ, কলিঙ্গ ও উৎকল ঐতিহাসিক ভূগোল',
            period: 'প্রাচীন থেকে প্রারম্ভিক আধুনিক কাল • মহানদী থেকে গোদাবরী',
            badge: 'ঐতিহাসিক রাজ্য ও ভূখণ্ড',
            imageUrl: '/assets/gallery/udayagiri_caves.svg',
            route: '/odra-desha'
          },
          {
            title: 'চৌহান, ভঞ্জ, সোম ও গঙ্গ রাজবংশীয় কালানুক্রম',
            period: 'খ্রিস্টীয় ৪র্থ শতাব্দী – ১৯শ শতাব্দী',
            badge: 'রাজবংশীয় কালানুক্রম',
            imageUrl: '/assets/gallery/jagannath_puri.svg',
            route: '/genealogy'
          }
        ]
      }
    };
    return map[language] || map.en;
  }, [language]);

  // Build unified, chronologically ordered Historical Records collection
  const allRecords = useMemo<UnifiedHistoricalRecord[]>(() => {
    const records: UnifiedHistoricalRecord[] = [];

    const inscImgMap: Record<string, string> = {
      insc_veligalani_1458: `${archiveBase}copper_plate_charter.jpg`,
      insc_lingaraja_1452: `${archiveBase}kapilendra_deva_lingaraja.jpg`,
      insc_simhachalam_prataparudra: `${archiveBase}simhachalam_temple.jpg`,
      insc_hathigumpha: `${archiveBase}hathigumpha_inscription.jpg`,
      insc_srirangam_1464: `${archiveBase}srirangam_temple.jpg`
    };

    const inscSortYearMap: Record<string, number> = {
      insc_hathigumpha: -100,
      insc_lingaraja_1452: 1438,
      insc_veligalani_1458: 1458,
      insc_srirangam_1464: 1464,
      insc_simhachalam_prataparudra: 1516
    };

    // 1. Inscriptions & Copper Plates
    inscriptions.forEach(insc => {
      const sortYear = inscSortYearMap[insc.id] ?? 1450;
      const relatedEvs = timelineEvents
        .filter(
          ev =>
            (insc.id === 'insc_veligalani_1458' && (ev.id === 'ev_1458' || ev.id === 'ev_1434' || ev.id === 'ev_1448')) ||
            (insc.id === 'insc_lingaraja_1452' && (ev.id === 'ev_1434' || ev.id === 'ev_1448' || ev.id === 'ev_1458')) ||
            (insc.id === 'insc_simhachalam_prataparudra' && (ev.id === 'ev_1515' || ev.id === 'ev_1489' || ev.id === 'ev_1568'))
        )
        .sort((a, b) => a.sort_year - b.sort_year);

      const activeEvs = (relatedEvs.length > 0 ? relatedEvs : timelineEvents.slice(0, 3)).map(ev => ({
        id: ev.id,
        yearText: ev.year_text,
        period: ev.period,
        title: ev.title,
        rulersInvolved: ev.rulers_involved,
        description: ev.political_development,
        monumentsInscriptions: ev.monuments_inscriptions,
        epistemicTier: 'verified_epigraphic' as EpistemicTier
      }));

      const keywords = [
        insc.dynasty,
        insc.ruler,
        insc.era_or_date,
        insc.language,
        insc.script.split(':')[0],
        recLoc.epigraphiaIndicaKeyword,
        recLoc.copperPlateEpigraphyKeyword
      ];

      records.push({
        id: insc.id,
        category: 'inscriptions',
        categoryLabel: ui.inscriptionsTab,
        sortYear,
        chronologicalDate: insc.era_or_date,
        eraLabel: insc.dynasty,
        title: insc.name,
        subtitle: `${insc.ruler} • ${insc.location_found}`,
        locationOrRepository: insc.location_found,
        rulerOrAuthority: insc.ruler,
        imageUrl: inscImgMap[insc.id] || `${archiveBase}copper_plate_charter.jpg`,
        imageCaption: `${insc.name} — ${insc.location_found} (${insc.era_or_date})`,
        sourceAttribution: insc.scholarly_references[0] || recLoc.asiAttribution,
        epistemicTier: 'verified_epigraphic',
        epistemicBadge: ui.verifiedEvidenceBadge,
        verificationStatus: insc.verification_status || recLoc.reviewedPrefix,
        summary: insc.historical_context,
        fullDescription: `${insc.historical_context}\n\n${insc.english_translation}`,
        transcriptionExcerpt: insc.transcription_excerpt,
        transcriptionLanguage: `${insc.language} (${insc.script})`,
        translationExcerpt: insc.english_translation,
        metadata: [
          { label: t.inscriptions?.rulerLabel || ui.rulerAuthorityLabel, value: insc.ruler },
          { label: t.inscriptions?.findspotLabel || ui.locationRepoLabel, value: insc.location_found },
          { label: t.inscriptions?.eraLabel || ui.dateEraLabel, value: insc.era_or_date },
          { label: recLoc.scriptPaleographyLabel, value: insc.script },
          { label: recLoc.inscribedLanguageLabel, value: insc.language },
          { label: recLoc.dynastyLabel, value: insc.dynasty }
        ],
        detailedAnalysis: {
          verifiedEvidence: recLoc.inscVerifiedPrefix(
            insc.historical_context,
            insc.script,
            insc.language,
            insc.era_or_date,
            insc.location_found
          ),
          traditionalAccounts: recLoc.inscTraditionalText,
          scholarlyInterpretations: recLoc.inscScholarlyText(insc.scholarly_references.join('; '), insc.dynasty)
        },
        chronologicalEvents: activeEvs,
        inscriptionsAndArchaeology: [
          {
            title: insc.name,
            typeBadge: `${insc.language} • ${insc.era_or_date}`,
            locationOrDate: insc.location_found,
            details: `${recLoc.origTranscriptionLabel}: ${insc.transcription_excerpt} — ${recLoc.translationLabel}: ${insc.english_translation}`
          },
          ...locations.slice(0, 2).map(loc => ({
            title: loc.name,
            typeBadge: `${localizeRegion(loc.region)} • ${loc.modern_state}`,
            locationOrDate: `${loc.modern_district}, ${loc.modern_state}`,
            details: `${loc.archaeological_findings} (${loc.inscriptions_found.join('; ')})`
          }))
        ],
        sourceReferences: insc.scholarly_references.map(ref => ({
          citation: ref,
          typeBadge: ui.verifiedEvidenceBadge
        })),
        relatedRecordIds: [
          ...inscriptions.filter(i => i.id !== insc.id).map(i => i.id),
          'doc_madala_panji',
          'doc_sarasvati_vilasa',
          'ev_1458',
          'loc_barabati_fort'
        ],
        keywords,
        hashtags: keywords.map(toHashtagToken).filter(s => s.length >= 3),
        related74References: resolveRecord74References(
          insc.id,
          `${insc.name} ${insc.ruler} ${insc.dynasty} ${insc.location_found} ${insc.historical_context}`
        )
      });
    });

    // 2. Digitized Historical Documents & Royal Chronicles
    const docImgMap: Record<string, string> = {
      doc_madala_panji: `${archiveBase}odia_palm_leaf_manuscript.jpg`,
      doc_sarasvati_vilasa: `${archiveBase}prataparudra_deva.jpg`,
      doc_veligalani_charter: `${archiveBase}copper_plate_charter.jpg`
    };
    const docSortYearMap: Record<string, number> = {
      doc_madala_panji: 1200,
      doc_sarasvati_vilasa: 1515
    };

    documents.forEach(doc => {
      const isTraditionalChronicle = doc.id === 'doc_madala_panji';
      const tier: EpistemicTier = isTraditionalChronicle ? 'traditional_account' : 'verified_epigraphic';
      const sortYear = docSortYearMap[doc.id] ?? 1500;
      const keywords = [
        doc.original_language,
        doc.author_authority,
        doc.approximate_date,
        doc.current_location,
        recLoc.palmLeafKeyword,
        recLoc.archivalRepoKeyword
      ];

      records.push({
        id: doc.id,
        category: 'documents',
        categoryLabel: ui.documentsTab,
        sortYear,
        chronologicalDate: doc.approximate_date,
        eraLabel: `${doc.original_language} • ${recLoc.manuscriptSuffix}`,
        title: doc.title,
        subtitle: `${doc.author_authority} • ${doc.approximate_date}`,
        locationOrRepository: doc.current_location,
        rulerOrAuthority: doc.author_authority,
        imageUrl: docImgMap[doc.id] || `${archiveBase}odia_palm_leaf_manuscript.jpg`,
        imageCaption: `${doc.title} — ${doc.current_location}`,
        sourceAttribution: doc.digitization_info || doc.source_provenance,
        epistemicTier: tier,
        epistemicBadge: isTraditionalChronicle ? ui.traditionalAccountBadge : ui.verifiedEvidenceBadge,
        verificationStatus: doc.verification_status || recLoc.reviewedPrefix,
        summary: doc.research_notes,
        fullDescription: `${doc.research_notes}\n\n${doc.source_provenance}${
          doc.digitization_info ? `\n\n${doc.digitization_info}` : ''
        }`,
        transcriptionExcerpt: doc.transcription_excerpt,
        transcriptionLanguage: doc.original_language,
        translationExcerpt: doc.translation_excerpt,
        metadata: [
          { label: recLoc.authorBodyLabel, value: doc.author_authority },
          { label: recLoc.approxDateLabel, value: doc.approximate_date },
          { label: recLoc.origLanguageLabel, value: doc.original_language },
          { label: recLoc.custodialCollectionLabel, value: doc.current_location },
          { label: recLoc.provenanceCustodyLabel, value: doc.source_provenance },
          { label: recLoc.copyrightLicenseLabel, value: localizeLicense(doc.copyright_license) }
        ],
        detailedAnalysis: {
          verifiedEvidence: recLoc.docVerifiedText(doc.current_location, doc.digitization_info || doc.source_provenance),
          traditionalAccounts: isTraditionalChronicle ? doc.research_notes : recLoc.docTraditionalFallback,
          scholarlyInterpretations: `${doc.research_notes} ${recLoc.docScholarlyExcerptPrefix}: "${doc.translation_excerpt}"`
        },
        chronologicalEvents: timelineEvents
          .filter(ev => ev.sort_year >= 1434)
          .slice(0, 4)
          .map(ev => ({
            id: ev.id,
            yearText: ev.year_text,
            period: ev.period,
            title: ev.title,
            rulersInvolved: ev.rulers_involved,
            description: ev.political_development,
            monumentsInscriptions: ev.monuments_inscriptions,
            epistemicTier: 'verified_epigraphic' as EpistemicTier
          })),
        inscriptionsAndArchaeology: [
          {
            title: doc.title,
            typeBadge: `${doc.original_language} • ${doc.approximate_date}`,
            locationOrDate: doc.current_location,
            details: `${doc.source_provenance} — "${doc.translation_excerpt}"`
          },
          ...inscriptions.slice(0, 2).map(insc => ({
            title: insc.name,
            typeBadge: `${insc.dynasty} • ${insc.era_or_date}`,
            locationOrDate: insc.location_found,
            details: insc.historical_context
          }))
        ],
        sourceReferences: [
          {
            citation: `${doc.title} — ${doc.current_location} (${doc.source_provenance})`,
            typeBadge: isTraditionalChronicle ? ui.traditionalAccountBadge : ui.verifiedEvidenceBadge
          },
          ...(doc.digitization_info
            ? [{ citation: doc.digitization_info, typeBadge: ui.scholarlyInterpretationBadge }]
            : [])
        ],
        relatedRecordIds: [
          ...documents.filter(d => d.id !== doc.id).map(d => d.id),
          'insc_veligalani_1458',
          'insc_lingaraja_1452',
          'insc_simhachalam_prataparudra',
          'ref-chronicles'
        ],
        keywords,
        hashtags: keywords.map(toHashtagToken).filter(s => s.length >= 3),
        related74References: resolveRecord74References(
          doc.id,
          `${doc.title} ${doc.author_authority} ${doc.current_location} ${doc.research_notes}`
        )
      });
    });

    // 3. Chronological Historical Events (arranged by sort_year)
    const eventImgMap: Record<string, string> = {
      ev_kharavela_1st_bce: `${archiveBase}hathigumpha_inscription.jpg`,
      ev_jasma_devi_1120: `${archiveBase}konark_sun_temple_structure.jpg`,
      ev_siddharameshwara_1150: `${archiveBase}barabati_fort_ramparts.jpg`,
      ev_1434: `${archiveBase}kapilendra_deva_lingaraja.jpg`,
      ev_1448: `${archiveBase}draksharama_temple.jpg`,
      ev_kolletikota_gajapathi_garrison: `${archiveBase}peddintlamma_temple_kolletikota.jpg`,
      ev_1458: `${archiveBase}copper_plate_charter.jpg`,
      ev_1464: `${archiveBase}srirangam_temple.jpg`,
      ev_1489: `${archiveBase}puri_jagannatha_temple.jpg`,
      ev_1515: `${archiveBase}simhachalam_temple.jpg`,
      ev_1568: `${archiveBase}barabati_fort_gateway.jpg`
    };

    timelineEvents
      .slice()
      .sort((a, b) => a.sort_year - b.sort_year)
      .forEach(ev => {
        const isTraditional = ev.id === 'ev_jasma_devi_1120';
        const tier: EpistemicTier = isTraditional ? 'traditional_account' : 'verified_epigraphic';
        const keywords = [
          ev.year_text,
          ev.period,
          ev.rulers_involved,
          ...ev.monuments_inscriptions.split(';').map(s => s.trim())
        ].filter(Boolean);

        records.push({
          id: ev.id,
          category: 'timeline',
          categoryLabel: ui.timelineTab,
          sortYear: ev.sort_year,
          chronologicalDate: ev.year_text,
          eraLabel: ev.period,
          title: ev.title,
          subtitle: `${ev.rulers_involved} • ${ev.year_text}`,
          locationOrRepository: ev.monuments_inscriptions,
          rulerOrAuthority: ev.rulers_involved,
          imageUrl: eventImgMap[ev.id] || `${archiveBase}barabati_fort_gateway.jpg`,
          imageCaption: `${ev.title} (${ev.year_text})`,
          sourceAttribution: ev.primary_sources,
          epistemicTier: tier,
          epistemicBadge: isTraditional ? ui.traditionalAccountBadge : ui.verifiedEvidenceBadge,
          verificationStatus: recLoc.reviewedPrefix,
          summary: ev.political_development,
          fullDescription: `${ev.political_development}\n\n${ev.uncertainty_notes}`,
          metadata: [
            { label: ui.dateEraLabel, value: `${ev.year_text} (${ev.period})` },
            { label: ui.rulerAuthorityLabel, value: ev.rulers_involved },
            { label: t.timeline?.evidenceLabel || recLoc.corroboratingMonumentsLabel, value: ev.monuments_inscriptions },
            { label: t.timeline?.citationsLabel || recLoc.primarySourcesLabel, value: ev.primary_sources }
          ],
          detailedAnalysis: {
            verifiedEvidence: `${ev.monuments_inscriptions}. ${recLoc.primarySourcesLabel}: ${ev.primary_sources}`,
            traditionalAccounts: isTraditional ? ev.uncertainty_notes : recLoc.evTraditionalFallback,
            scholarlyInterpretations: ev.uncertainty_notes
          },
          chronologicalEvents: timelineEvents
            .slice()
            .sort((a, b) => a.sort_year - b.sort_year)
            .map(item => ({
              id: item.id,
              yearText: item.year_text,
              period: item.period,
              title: item.title,
              rulersInvolved: item.rulers_involved,
              description: item.political_development,
              monumentsInscriptions: item.monuments_inscriptions,
              epistemicTier:
                item.id === 'ev_jasma_devi_1120'
                  ? ('traditional_account' as EpistemicTier)
                  : ('verified_epigraphic' as EpistemicTier)
            })),
          inscriptionsAndArchaeology: [
            {
              title: ev.monuments_inscriptions,
              typeBadge: ev.year_text,
              locationOrDate: ev.period,
              details: ev.political_development
            },
            ...inscriptions.slice(0, 2).map(insc => ({
              title: insc.name,
              typeBadge: insc.era_or_date,
              locationOrDate: insc.location_found,
              details: insc.historical_context
            }))
          ],
          sourceReferences: ev.primary_sources
            .split(';')
            .map(s => s.trim())
            .filter(Boolean)
            .map(src => ({
              citation: src,
              typeBadge: isTraditional ? ui.traditionalAccountBadge : ui.verifiedEvidenceBadge
            })),
          relatedRecordIds: [
            'insc_veligalani_1458',
            'insc_lingaraja_1452',
            'insc_simhachalam_prataparudra',
            'doc_madala_panji',
            ...timelineEvents.filter(x => x.id !== ev.id).slice(0, 3).map(x => x.id)
          ],
          keywords,
          hashtags: keywords.map(toHashtagToken).filter(s => s.length >= 3),
          related74References: resolveRecord74References(
            ev.id,
            `${ev.title} ${ev.rulers_involved} ${ev.political_development} ${ev.monuments_inscriptions}`
          )
        });
      });

    // 4. Archaeological Locations & Fortified Monuments
    locations.forEach((loc, idx) => {
      const sortYear = 1435 + idx * 10;
      const localizedRegion = localizeRegion(loc.region);
      const keywords = [
        loc.name,
        loc.ancient_name,
        localizedRegion,
        loc.modern_district,
        loc.modern_state,
        ...loc.inscriptions_found
      ];

      records.push({
        id: loc.id,
        category: 'archaeology',
        categoryLabel: ui.archaeologyTab,
        sortYear,
        chronologicalDate: `${localizedRegion} • ${recLoc.medievalCitadelSuffix}`,
        eraLabel: `${loc.modern_district}, ${loc.modern_state}`,
        title: `${loc.name} (${loc.ancient_name})`,
        subtitle: `${loc.modern_district}, ${loc.modern_state} • ${localizedRegion} ${recLoc.regionSuffix}`,
        locationOrRepository: `${loc.modern_district}, ${loc.modern_state}`,
        rulerOrAuthority: recLoc.gajapathiAdminAuthority,
        imageUrl: loc.image_url || `${archiveBase}barabati_fort_gateway.jpg`,
        imageCaption: `${loc.name} (${loc.ancient_name}) — ${loc.modern_district}, ${loc.modern_state}`,
        sourceAttribution: recLoc.asiStateEpigraphyAttr,
        epistemicTier: 'verified_epigraphic',
        epistemicBadge: ui.verifiedEvidenceBadge,
        verificationStatus: recLoc.reviewedPrefix,
        summary: loc.summary,
        fullDescription: `${loc.summary}\n\n${loc.archaeological_findings}`,
        metadata: [
          { label: recLoc.ancientNameLabel, value: loc.ancient_name },
          { label: recLoc.historicalRegionLabel, value: localizedRegion },
          { label: recLoc.modernDistrictStateLabel, value: `${loc.modern_district}, ${loc.modern_state}` },
          { label: recLoc.inscriptionsFoundLabel, value: loc.inscriptions_found.join(' • ') }
        ],
        detailedAnalysis: {
          verifiedEvidence: loc.archaeological_findings,
          traditionalAccounts: recLoc.locTraditionalText(loc.modern_state),
          scholarlyInterpretations: recLoc.locScholarlyPrefix(loc.summary, loc.inscriptions_found.join('; '))
        },
        chronologicalEvents: timelineEvents.slice(0, 4).map(ev => ({
          id: ev.id,
          yearText: ev.year_text,
          period: ev.period,
          title: ev.title,
          rulersInvolved: ev.rulers_involved,
          description: ev.political_development,
          monumentsInscriptions: ev.monuments_inscriptions,
          epistemicTier: 'verified_epigraphic' as EpistemicTier
        })),
        inscriptionsAndArchaeology: loc.inscriptions_found.map(inscName => ({
          title: inscName,
          typeBadge: recLoc.onSiteEpigraphicBadge,
          locationOrDate: `${loc.name} (${loc.modern_district}, ${loc.modern_state})`,
          details: loc.archaeological_findings
        })),
        sourceReferences: [
          ...loc.inscriptions_found.map(inscName => ({
            citation: `${inscName} — ${loc.name}, ${loc.modern_district}, ${loc.modern_state}`,
            typeBadge: ui.verifiedEvidenceBadge
          })),
          {
            citation: `${recLoc.asiConservationPrefix}: ${loc.name}`,
            typeBadge: ui.scholarlyInterpretationBadge
          }
        ],
        relatedRecordIds: [
          'insc_veligalani_1458',
          'insc_lingaraja_1452',
          'insc_simhachalam_prataparudra',
          ...locations.filter(l => l.id !== loc.id).slice(0, 3).map(l => l.id)
        ],
        keywords,
        hashtags: keywords.map(toHashtagToken).filter(s => s.length >= 3),
        related74References: resolveRecord74References(
          loc.id,
          `${loc.name} ${loc.ancient_name} ${loc.region} ${loc.modern_district} ${loc.modern_state} ${loc.summary}`
        )
      });
    });

    monuments.forEach((mon, idx) => {
      const sortYear = mon.id === 'mon_konark_sun' ? 1250 : 1448 + idx * 5;
      const keywords = [
        mon.name,
        mon.location,
        mon.state,
        mon.patron_ruler,
        mon.architectural_style
      ];

      records.push({
        id: mon.id,
        category: 'archaeology',
        categoryLabel: ui.archaeologyTab,
        sortYear,
        chronologicalDate: mon.century,
        eraLabel: mon.architectural_style,
        title: mon.name,
        subtitle: `${mon.patron_ruler} • ${mon.location}, ${mon.state}`,
        locationOrRepository: `${mon.location}, ${mon.state}`,
        rulerOrAuthority: mon.patron_ruler,
        imageUrl: mon.image_url || `${archiveBase}meghanada_pacheri_puri.jpg`,
        imageCaption: `${mon.name} — ${mon.location}, ${mon.state}`,
        sourceAttribution: mon.sources[0] || recLoc.asiAttribution,
        epistemicTier: 'verified_epigraphic',
        epistemicBadge: ui.verifiedEvidenceBadge,
        verificationStatus: recLoc.reviewedPrefix,
        summary: mon.historical_significance,
        fullDescription: mon.historical_significance,
        metadata: [
          { label: t.monuments?.patronLabel || ui.rulerAuthorityLabel, value: mon.patron_ruler },
          { label: ui.locationRepoLabel, value: `${mon.location}, ${mon.state}` },
          { label: t.monuments?.styleLabel || recLoc.architecturalStyleLabel, value: mon.architectural_style },
          { label: ui.dateEraLabel, value: mon.century }
        ],
        detailedAnalysis: {
          verifiedEvidence: recLoc.monVerifiedText(
            mon.location,
            mon.state,
            mon.architectural_style,
            mon.century,
            mon.historical_significance
          ),
          traditionalAccounts: recLoc.monTraditionalText(mon.state),
          scholarlyInterpretations: recLoc.monScholarlyText(mon.sources.join('; '))
        },
        chronologicalEvents: timelineEvents.slice(0, 4).map(ev => ({
          id: ev.id,
          yearText: ev.year_text,
          period: ev.period,
          title: ev.title,
          rulersInvolved: ev.rulers_involved,
          description: ev.political_development,
          monumentsInscriptions: ev.monuments_inscriptions,
          epistemicTier: 'verified_epigraphic' as EpistemicTier
        })),
        inscriptionsAndArchaeology: [
          {
            title: mon.name,
            typeBadge: mon.architectural_style,
            locationOrDate: `${mon.location}, ${mon.state} (${mon.century})`,
            details: mon.historical_significance
          }
        ],
        sourceReferences: mon.sources.map(src => ({
          citation: src,
          typeBadge: ui.verifiedEvidenceBadge
        })),
        relatedRecordIds: [
          'insc_lingaraja_1452',
          'insc_simhachalam_prataparudra',
          'doc_madala_panji',
          ...monuments.filter(m => m.id !== mon.id).map(m => m.id)
        ],
        keywords,
        hashtags: keywords.map(toHashtagToken).filter(s => s.length >= 3),
        related74References: resolveRecord74References(
          mon.id,
          `${mon.name} ${mon.location} ${mon.state} ${mon.patron_ruler} ${mon.historical_significance}`
        )
      });
    });

    // 5. Epistemic Claims & Bibliographic Reference Corpora
    claims.forEach((clm, idx) => {
      const isContested = clm.id === 'clm_02';
      const tier: EpistemicTier = isContested ? 'scholarly_interpretation' : 'verified_epigraphic';
      const localizedStatus = localizeClaimStatus(clm.status);
      const keywords = [
        clm.topic,
        localizedStatus,
        recLoc.epistemicReviewKeyword,
        recLoc.historiographyKeyword,
        recLoc.gajapathiAdminAuthority
      ];

      records.push({
        id: clm.id,
        category: 'references',
        categoryLabel: ui.referencesTab,
        sortYear: 1455 + idx * 15,
        chronologicalDate: `${recLoc.reviewedPrefix} • ${clm.review_date}`,
        eraLabel: localizedStatus,
        title: clm.topic,
        subtitle: clm.claim_statement,
        locationOrRepository: recLoc.reviewBoardLocation,
        rulerOrAuthority: recLoc.comparativeAnalysisAuthority,
        imageUrl:
          clm.id === 'clm_01'
            ? `${archiveBase}copper_plate_charter.jpg`
            : clm.id === 'clm_02'
            ? `${archiveBase}puri_jagannatha_temple.jpg`
            : `${archiveBase}srirangam_temple.jpg`,
        imageCaption: `${clm.topic} — ${localizedStatus}`,
        sourceAttribution: clm.supporting_evidence[0] || recLoc.asiAttribution,
        epistemicTier: tier,
        epistemicBadge: isContested ? ui.scholarlyInterpretationBadge : ui.verifiedEvidenceBadge,
        verificationStatus: localizedStatus,
        summary: clm.claim_statement,
        fullDescription: `${clm.claim_statement}\n\n${clm.source_reliability_notes}\n\n${clm.reviewer_comments}`,
        metadata: [
          { label: recLoc.evaluatedTopicLabel, value: clm.topic },
          { label: recLoc.verificationFindingLabel, value: localizedStatus },
          { label: recLoc.reviewDateLabel, value: clm.review_date },
          { label: recLoc.reliabilityNoteLabel, value: clm.source_reliability_notes }
        ],
        detailedAnalysis: {
          verifiedEvidence: clm.supporting_evidence.join(' '),
          traditionalAccounts: clm.contradictory_evidence.join(' '),
          scholarlyInterpretations: `${clm.source_reliability_notes} ${clm.reviewer_comments}`
        },
        chronologicalEvents: timelineEvents.slice(3, 8).map(ev => ({
          id: ev.id,
          yearText: ev.year_text,
          period: ev.period,
          title: ev.title,
          rulersInvolved: ev.rulers_involved,
          description: ev.political_development,
          monumentsInscriptions: ev.monuments_inscriptions,
          epistemicTier: 'verified_epigraphic' as EpistemicTier
        })),
        inscriptionsAndArchaeology: clm.supporting_evidence.map((evText, i) => ({
          title: `${clm.topic} — ${recLoc.supportingEvidencePrefix} #${i + 1}`,
          typeBadge: ui.verifiedEvidenceBadge,
          locationOrDate: localizedStatus,
          details: evText
        })),
        sourceReferences: [
          ...clm.supporting_evidence.map(s => ({
            citation: s,
            typeBadge: ui.verifiedEvidenceBadge
          })),
          ...clm.contradictory_evidence.map(s => ({
            citation: s,
            typeBadge: ui.scholarlyInterpretationBadge
          }))
        ],
        relatedRecordIds: ['insc_veligalani_1458', 'insc_lingaraja_1452', 'doc_madala_panji', 'doc_sarasvati_vilasa'],
        keywords,
        hashtags: keywords.map(toHashtagToken).filter(s => s.length >= 3),
        related74References: resolveRecord74References(
          clm.id,
          `${clm.topic} ${clm.claim_statement} ${clm.source_reliability_notes}`
        )
      });
    });

    // 3 Canonical Bibliographic Reference Corpora (localized across all 8 languages)
    const bibCorpora = [
      {
        id: 'ref-epigraphic',
        sortYear: 1458,
        tier: 'verified_epigraphic' as EpistemicTier,
        img: `${archiveBase}copper_plate_charter.jpg`,
        title: {
          en: 'Epigraphic Publications (Primary Corpus)',
          hi: 'पुरालेखीय प्रकाशन (प्राथमिक स्रोत)',
          te: 'శాసన ప్రచురణలు (ప్రాథమిక ఆధారాలు)',
          kn: 'ಶಾಸನ ಪ್ರಕಟಣೆಗಳು (ಪ್ರಾಥಮಿಕ ಆಕರಗಳು)',
          ta: 'கல்வெட்டு வெளியீடுகள் (முதன்மை ஆதாரங்கள்)',
          mr: 'शिलालेख प्रकाशने (प्राथमिक स्रोत)',
          or: 'ଶିଳାଲେଖ ପ୍ରକାଶନ (ପ୍ରାଥମିକ ଉତ୍ସ)',
          bn: 'প্রত্নলিপি প্রকাশনা (প্রাথমিক উৎস)'
        }[language],
        description: {
          en: 'Published volumes of the Archaeological Survey of India (ASI) and State Epigraphy Directorates containing facsimiles, Devanagari/Roman transliterations, and historical analyses of copper-plates and stone inscriptions of the Suryavamsha Gajapathi and Odra-Kalinga rulers.',
          hi: 'भारतीय पुरातत्व सर्वेक्षण (ASI) और राज्य पुरालेख निदेशालयों के प्रकाशित खंड जिनमें सूर्यवंश गजपति और ओड्र-कलिंग शासकों के ताम्रपत्रों और शिलालेखों की प्रतिकृतियां, लिप्यंतरण और ऐतिहासिक विश्लेषण शामिल हैं।',
          te: 'సూర్యవంశ గజపతి మరియు ఓడ్ర-కళింగ పాలకుల తామ్రశాసనాలు మరియు శిలాశాసనాల నకళ్లు, లిప్యంతరీకరణలు మరియు చారిత్రక విశ్లేషణలతో కూడిన ఆర్కియాలజికల్ సర్వే ఆఫ్ ఇండియా (ASI) ప్రచురిత సంపుటాలు.',
          kn: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಮತ್ತು ಓಡ್ರ-ಕಳಿಂಗ ಅರಸರ ತಾಮ್ರಪಟಗಳು ಮತ್ತು ಶಿಲಾಶಾಸನಗಳ ಪ್ರತಿಕೃತಿಗಳು, ಲಿಪ್ಯಂತರಣಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ವಿಶ್ಲೇಷಣೆಗಳನ್ನು ಒಳಗೊಂಡಿರುವ ಭಾರತೀಯ ಪುರಾತತ್ತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆಯ (ASI) ಪ್ರಕಟಿತ ಸಂಪುಟಗಳು.',
          ta: 'சூர்யவம்ச கஜபதி மற்றும் ஒட்ர-கலிங்க மன்னர்களின் செப்பேடுகள் மற்றும் கல்வெட்டுகளின் பிரதிகள், ஒலிபெயர்ப்புகள் மற்றும் வரலாற்று ஆய்வுகளைக் கொண்ட இந்தியத் தொல்லியல் துறையின் (ASI) வெளியீடுகள்.',
          mr: 'भारतीय पुरातत्त्व सर्वेक्षण (ASI) आणि राज्य पुरालेख संचालनालयाचे प्रकाशित खंड ज्यात सूर्यवंश गजपती आणि ओड्र-कलिंग शासकांच्या ताम्रपटांचे आणि शिलालेखांचे लिप्यंतरण व ऐतिहासिक विश्लेषण समाविष्ट आहे.',
          or: 'ଭାରତୀୟ ପ୍ରତ୍ନତତ୍ତ୍ୱ ସର୍ବେକ୍ଷଣ (ASI) ଏବଂ ରାଜ୍ୟ ଶିଳାଲେଖ ନିର୍ଦ୍ଦେଶାଳୟର ପ୍ରକାଶିତ ଖଣ୍ଡସମୂହ, ଯେଉଁଥିରେ ସୂର୍ଯ୍ୟବଂଶ ଗଜପତି ଏବଂ ଓଡ୍ର-କଳିଙ୍ଗ ଶାସକମାନଙ୍କର ତାମ୍ରଫଳକ ଓ ଶିଳାଲେଖର ଲିପ୍ୟନ୍ତରଣ ଏବଂ ଐତିହାସିକ ବିଶ୍ଳେଷଣ ରହିଛି।',
          bn: 'ভারতের প্রত্নতাত্ত্বিক জরিপ (ASI) এবং রাজ্য প্রত্নলিপি অধিদপ্তরের প্রকাশিত খণ্ডসমূহ, যাতে সূর্যবংশ গজপতি ও ওড্র-কলিঙ্গ শাসকদের তাম্রশাসন ও শিলালিপির প্রতিলিপি ও ঐতিহাসিক বিশ্লেষণ রয়েছে।'
        }[language],
        items: {
          en: [
            'Epigraphia Indica, Vol. XXXIII (1959–1960), pp. 275–292: "Veligalani Grant of Kapilendra Deva (Saka 1380)", edited by Dr. D.C. Sircar.',
            'South Indian Inscriptions (SII), Vol. IV, V, & VI: Epigraphs of Draksharama, Simhachalam, and Srikurmam.',
            'Epigraphia Carnatica, Vol. VII: Inscriptions relating to Prince Virabhadra Deva at Malebennur.',
            'Inscriptions of Orissa, Vol. V (Part I & II), edited by S.N. Rajaguru, Odisha State Museum, Bhubaneswar.'
          ],
          hi: [
            'एपिग्राफिया इंडिका, खंड XXXIII (1959–1960), पृ. 275–292: "कपिलेंद्र देव का वेलिगलनि ताम्रपत्र अनुदान (शक 1380)", संपादक: डॉ. डी.सी. सरकार।',
            'साउथ इंडियन इंस्क्रिप्शन्स (SII), खंड IV, V एवं VI: द्राक्षाराम, सिंहाचलम और श्रीकूर्मम के शिलालेख।',
            'एपिग्राफिया कर्नाटिका, खंड VII: मलेबेन्नूर में राजकुमार वीरभद्र देव से संबंधित शिलालेख।',
            'इंस्क्रिप्शन्स ऑफ उड़ीसा, खंड V (भाग I एवं II), संपादक: एस.एन. राजगुरु, ओडिशा राज्य संग्रहालय, भुवनेश्वर।'
          ],
          te: [
            'ఎపిగ్రాఫియా ఇండికా, సంపుటి XXXIII (1959–1960), పుటలు 275–292: "కపిలేంద్ర దేవుని వెలిగలని తామ్రశాసన దానం (శక 1380)", సంపాదకులు: డా. డి.సి. సర్కార్.',
            'సౌత్ ఇండియన్ ఇన్‌స్క్రిప్షన్స్ (SII), సంపుటి IV, V & VI: ద్రాక్షారామం, సింహాచలం మరియు శ్రీకూర్మం శాసనాలు.',
            'ఎపిగ్రాఫియా కర్ణాటికా, సంపుటి VII: మలేబెన్నూరు వద్ద యువరాజు వీరభద్ర దేవునికి సంబంధించిన శాసనాలు.',
            'ఇన్‌స్క్రిప్షన్స్ ఆఫ్ ఒరిస్సా, సంపుటి V (భాగం I & II), సంపాదకులు: ఎస్.ఎన్. రాజగురు, ఒడిశా స్టేట్ మ్యూజియం, భువనేశ్వర్.'
          ],
          kn: [
            'ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ, ಸಂಪುಟ XXXIII (1959–1960), ಪುಟ 275–292: "ಕಪಿಲೇಂದ್ರ ದೇವನ ವೆಲಿಗಲನಿ ತಾಮ್ರಪಟ ದಾನಶಾಸನ (ಶಕ 1380)", ಸಂಪಾದಕರು: ಡಾ. ಡಿ.ಸಿ. ಸರ್ಕಾರ್.',
            'ದಕ್ಷಿಣ ಭಾರತದ ಶಾಸನಗಳು (SII), ಸಂಪುಟ IV, V ಮತ್ತು VI: ದ್ರಾಕ್ಷಾರಾಮ, ಸಿಂಹಾಚಲಂ ಮತ್ತು ಶ್ರೀಕೂರ್ಮಂ ಶಾಸನಗಳು.',
            'ಎಪಿಗ್ರಾಫಿಯಾ ಕರ್ನಾಟಿಕಾ, ಸಂಪುಟ VII: ಮಲೆಬೆನ್ನೂರಿನಲ್ಲಿ ರಾಜಕುಮಾರ ವೀರಭದ್ರ ದೇವನಿಗೆ ಸಂಬಂಧಿಸಿದ ಶಾಸನಗಳು.',
            'ಇನ್‌ಸ್ಕ್ರಿಪ್ಷನ್ಸ್ ಆಫ್ ಒರಿಸ್ಸಾ, ಸಂಪುಟ V (ಭಾಗ I ಮತ್ತು II), ಸಂಪಾದಕರು: ಎಸ್.ಎನ್. ರಾಜಗುರು, ಒಡಿಶಾ ರಾಜ್ಯ ವಸ್ತುಸಂಗ್ರಹಾಲಯ, ಭುವನೇಶ್ವರ.'
          ],
          ta: [
            'எபிகிராஃபியா இண்டிகா, தொகுதி XXXIII (1959–1960), பக். 275–292: "கபிலேந்திர தேவரின் வெலிகலனி செப்பேடு (சக 1380)", பதிப்பாசிரியர்: டாக்டர் டி.சி. சர்க்கார்.',
            'தென்னிந்தியக் கல்வெட்டுகள் (SII), தொகுதி IV, V & VI: திராட்சாராமம், சிம்மாசலம் மற்றும் ஸ்ரீகூர்மம் கல்வெட்டுகள்.',
            'எபிகிராஃபியா கர்நாடிகா, தொகுதி VII: மாலேபென்னூரில் இளவரசர் வீரபத்திர தேவர் தொடர்பான கல்வெட்டுகள்.',
            'இன்ஸ்கிரிப்ஷன்ஸ் ஆஃப் ஒரிசா, தொகுதி V (பகுதி I & II), பதிப்பாசிரியர்: எஸ்.என். ராஜகுரு, ஒடிசா மாநில அருங்காட்சியகம், புவனேஸ்வர்.'
          ],
          mr: [
            'एपिग्राफिया इंडिका, खंड XXXIII (१९५९–१९६०), पृ. २७५–२९२: "कपिलेंद्र देवाचा वेलिगलनि ताम्रपट अनुदान (शक १३८०)", संपादक: डॉ. डी.सी. सरकार.',
            'साउथ इंडियन इन्स्क्रिप्शन्स (SII), खंड IV, V आणि VI: द्राक्षाराम, सिंहाचलम आणि श्रीकूर्मम येथील शिलालेख.',
            'एपिग्राफिया कर्नाटिका, खंड VII: मलेबेन्नूर येथील राजकुमार वीरभद्र देवाशी संबंधित शिलालेख.',
            'इन्स्क्रिप्शन्स ऑफ ओरिसा, खंड V (भाग I व II), संपादक: एस.एन. राजगुरू, ओडिशा राज्य संग्रहालय, भुवनेश्वर.'
          ],
          or: [
            'ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା, ଖଣ୍ଡ XXXIII (୧୯୫୯–୧୯୬୦), ପୃଷ୍ଠା ୨୭୫–୨୯୨: "କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ବେଲିଗଲନି ତାମ୍ରଫଳକ ଦାନ (ଶକ ୧୩୮୦)", ସମ୍ପାଦକ: ଡ. ଡି.ସି. ସରକାର।',
            'ସାଉଥ୍ ଇଣ୍ଡିଆନ୍ ଇନସ୍କ୍ରିପସନ୍ସ (SII), ଖଣ୍ଡ IV, V ଓ VI: ଦ୍ରାକ୍ଷାରାମ, ସିଂହାଚଳମ ଏବଂ ଶ୍ରୀକୂର୍ମମର ଶିଳାଲେଖ।',
            'ଏପିଗ୍ରାଫିଆ କର୍ଣ୍ଣାଟିକା, ଖଣ୍ଡ VII: ମାলেବେନ୍ନୁର ଠାରେ ରାଜକୁମାର ବୀରଭଦ୍ର ଦେବଙ୍କ ସମ୍ପର୍କିତ ଶିଳାଲେଖ।',
            'ଇନସ୍କ୍ରିପସନ୍ସ ଅଫ୍ ଓଡ଼ିଶା, ଖଣ୍ଡ V (ଭାଗ I ଓ II), ସମ୍ପାଦକ: ଏସ୍.ଏନ୍. ରାଜଗୁରୁ, ଓଡ଼ିଶା ରାଜ୍ୟ ସଂଗ୍ରହାଳୟ, ଭୁବନେଶ୍ୱର।'
          ],
          bn: [
            'এপিগ্রাফিয়া ইন্ডিকা, খণ্ড XXXIII (১৯৫৯–১৯৬০), পৃ. ২৭৫–২৯২: "কপিলেন্দ্র দেবের বেলিগলনি তাম্রশাসন অনুদান (শক ১৩৮০)", সম্পাদক: ড. ডি.সি. সরকার।',
            'সাউথ ইন্ডিয়ান ইনস্ক্রিপশনস (SII), খণ্ড IV, V ও VI: দ্রাক্ষারাম, সিংহাচলম এবং শ্রীকূর্মমের শিলালিপি।',
            'এপিগ্রাফিয়া কর্ণাটিকা, খণ্ড VII: মালেবেন্নুরে যুবরাজ বীরভদ্র দেব সম্পর্কিত শিলালিপি।',
            'ইনস্ক্রিপশনস অফ ওড়িশা, খণ্ড V (পর্ব I ও II), সম্পাদক: এস.এন. রাজগুরু, ওড়িশা রাজ্য জাদুঘর, ভুবনেশ্বর।'
          ]
        }[language]
      },
      {
        id: 'ref-monographs',
        sortYear: 1953,
        tier: 'scholarly_interpretation' as EpistemicTier,
        img: `${archiveBase}kapilendra_deva_lingaraja.jpg`,
        title: {
          en: 'Standard Scholarly Monographs (Secondary Corpus)',
          hi: 'मानक विद्वत्तापूर्ण मोनोग्राफ (द्वितीयक स्रोत)',
          te: 'ప్రామాణిక పరిశోధన గ్రంథాలు (ద్వితీయ ఆధారాలు)',
          kn: 'ಪ್ರಮಾಣಿತ ವಿದ್ವತ್ಪೂರ್ಣ ಗ್ರಂಥಗಳು (ದ್ವಿತೀಯ ಆಕರಗಳು)',
          ta: 'தரப்படுத்தப்பட்ட ஆராய்ச்சி நூல்கள் (இரண்டாம் நிலை ஆதாரங்கள்)',
          mr: 'प्रमाणित विद्वत्तापूर्ण शोधप्रबंध (दुय्यम स्रोत)',
          or: 'ପ୍ରାମାଣିକ ଗବେଷଣା ଗ୍ରନ୍ଥ (ଦ୍ୱିତୀୟକ ଉତ୍ସ)',
          bn: 'প্রামাণ্য গবেষণা মনোগ্রাফ (দ্বিতীয় পর্যায়ের উৎস)'
        }[language],
        description: {
          en: 'Peer-reviewed academic monographs and university press publications establishing the political chronology, administrative institutions, and military history of the Suryavamshi Gajapathi Empire.',
          hi: 'सूर्यवंशी गजपति साम्राज्य के राजनीतिक कालक्रम, प्रशासनिक संस्थाओं और सैन्य इतिहास को स्थापित करने वाले सहकर्मी-समीक्षित अकादमिक मोनोग्राफ और विश्वविद्यालय प्रेस प्रकाशन।',
          te: 'సూర్యవంశ గజపతి సామ్రాజ్య రాజకీయ కాలక్రమం, పరిపాలనా సంస్థలు మరియు సైనిక చరిత్రను నిర్ధారించే విశ్వవిద్యాలయ ప్రచురణలు మరియు పరిశోధన గ్రంథాలు.',
          kn: 'ಸೂರ್ಯವಂಶಿ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಕೀಯ ಕಾಲಾನುಕ್ರಮ, ಆಡಳಿತ ಸಂಸ್ಥೆಗಳು ಮತ್ತು ಸೈನಿಕ ಇತಿಹಾಸವನ್ನು ಸ್ಥಾಪಿಸುವ ವಿಶ್ವವಿದ್ಯಾಲಯದ ಪ್ರಕಟಣೆಗಳು ಮತ್ತು ಸಂಶೋಧನಾ ಗ್ರಂಥಗಳು.',
          ta: 'சூர்யவம்ச கஜபதி பேரரசின் அரசியல் காலவரிசை, நிர்வாக நிறுவனங்கள் மற்றும் இராணுவ வரலாற்றை நிறுவும் பல்கலைக்கழக ஆய்வு நூல்கள்.',
          mr: 'सूर्यवंशी गजपती साम्राज्याचा राजकीय कालक्रम, प्रशासकीय संस्था आणि लष्करी इतिहास प्रस्थापित करणारे विद्यापीठ प्रकाशन आणि संशोधन ग्रंथ.',
          or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟର ରାଜନୈତିକ କାଳକ୍ରମ, ପ୍ରଶାସନିକ ଅନୁଷ୍ଠାନ ଏବଂ ସାମରିକ ଇତିହାସକୁ ପ୍ରତିଷ୍ଠିତ କରୁଥିବା ବିଶ୍ୱବିଦ୍ୟାଳୟ ପ୍ରକାଶନ ଓ ଗବେଷଣା ଗ୍ରନ୍ଥ।',
          bn: 'সূর্যবংশী গজপতি সাম্রাজ্যের রাজনৈতিক কালানুক্রম, প্রশাসনিক প্রতিষ্ঠান এবং সামরিক ইতিহাস প্রতিষ্ঠাকারী বিশ্ববিদ্যালয় প্রেস প্রকাশনা ও একাডেমিক মনোগ্রাফ।'
        }[language],
        items: {
          en: [
            'Subrahmanyam, R., "The Suryavamsi Gajapatis of Orissa", Andhra University Press, Waltair, 1957.',
            'Mukherjee, Prabhat, "The History of the Gajapati Kings of Orissa and Their Successors", General Printers & Publishers, Calcutta, 1953.',
            'Sahu, N.K., "History of Orissa", Comprehensive Volumes I & II, Utkal University Press, 1981.',
            'Panigrahi, K.C., "History of Orissa (Hindu Period)", Kitab Mahal, Cuttack, 1981.',
            'Kulke, Hermann, "Kings and Cults: State Formation and Legitimation in India and Southeast Asia", Manohar, 1993.'
          ],
          hi: [
            'सुब्रह्मण्यम, आर., "द सूर्यवंशी गजपतिज़ ऑफ उड़ीसा (The Suryavamsi Gajapatis of Orissa)", आंध्र विश्वविद्यालय प्रेस, वाल्टेयर, 1957।',
            'मुखर्जी, प्रभात, "द हिस्ट्री ऑफ द गजपति किंग्स ऑफ उड़ीसा एंड देयर सक्सेसर्स", जनरल प्रिंटर्स एंड पब्लिशर्स, कलकत्ता, 1953।',
            'साहू, एन.के., "हिस्ट्री ऑफ उड़ीसा (History of Orissa)", समग्र खंड I एवं II, उत्कल विश्वविद्यालय प्रेस, 1981।',
            'पाणिग्रही, के.सी., "हिस्ट्री ऑफ उड़ीसा (हिंदू काल)", किताब महल, कटक, 1981।',
            'कुल्के, हरमन, "किंग्स एंड कल्ट्स: स्टेट फॉर्मेशन एंड लेजिटिमेशन इन इंडिया एंड साउथईस्ट एशिया", मनोहर प्रकाशन, 1993।'
          ],
          te: [
            'సుబ్రహ్మణ్యం, ఆర్., "ది సూర్యవంశీ గజపతీస్ ఆఫ్ ఒరిస్సా (The Suryavamsi Gajapatis of Orissa)", ఆంధ్ర విశ్వవిద్యాలయ ప్రెస్, వాల్తేరు, 1957.',
            'ముఖర్జీ, ప్రభాత్, "ది హిస్టరీ ఆఫ్ ది గజపతి కింగ్స్ ఆఫ్ ఒరిస్సా అండ్ దేర్ సక్సెసర్స్", కలకత్తా, 1953.',
            'సాహు, ఎన్.కె., "హిస్టరీ ఆఫ్ ఒరిస్సా (History of Orissa)", సంపుటాలు I & II, ఉత్కళ్ విశ్వవిద్యాలయ ప్రెస్, 1981.',
            'పాణిగ్రహి, కె.సి., "హిస్టరీ ఆఫ్ ఒరిస్సా (హిందూ కాలం)", కితాబ్ మహల్, కటక్, 1981.',
            'కుల్కే, హెర్మన్, "కింగ్స్ అండ్ కల్ట్స్: స్టేట్ ఫార్మేషన్ అండ్ లెజిటిమేషన్ ఇన్ ఇండియా అండ్ సౌత్ ఈస్ట్ ఆసియా", మనోహర్ ప్రచురణలు, 1993.'
          ],
          kn: [
            'ಸುಬ್ರಹ್ಮಣ್ಯಂ, ಆರ್., "ದಿ ಸೂರ್ಯವಂಶಿ ಗಜಪತಿಸ್ ಆಫ್ ಒರಿಸ್ಸಾ (The Suryavamsi Gajapatis of Orissa)", ಆಂಧ್ರ ವಿಶ್ವವಿದ್ಯಾಲಯ ಪ್ರೆಸ್, ವಾಲ್ಟೇರ್, 1957.',
            'ಮುಖರ್ಜಿ, ಪ್ರಭಾತ್, "ದಿ ಹಿಸ್ಟರಿ ಆಫ್ ದಿ ಗಜಪತಿ ಕಿಂಗ್ಸ್ ಆಫ್ ಒರಿಸ್ಸಾ ಅಂಡ್ ದೇರ್ ಸಕ್ಸೆಸರ್ಸ್", ಕಲ್ಕತ್ತಾ, 1953.',
            'ಸಾಹು, ಎನ್.ಕೆ., "ಹಿಸ್ಟರಿ ಆಫ್ ಒರಿಸ್ಸಾ (History of Orissa)", ಸಂಪುಟ I ಮತ್ತು II, ಉತ್ಕಲ್ ವಿಶ್ವವಿದ್ಯಾಲಯ ಪ್ರೆಸ್, 1981.',
            'ಪಾಣಿಗ್ರಾಹಿ, ಕೆ.ಸಿ., "ಹಿಸ್ಟರಿ ಆಫ್ ಒರಿಸ್ಸಾ (ಹಿಂದೂ ಕಾಲ)", ಕಿತಾಬ್ ಮಹಲ್, ಕಟಕ್, 1981.',
            'ಕುಲ್ಕೆ, ಹರ್ಮನ್, "ಕಿಂಗ್ಸ್ ಅಂಡ್ ಕಲ್ಟ್ಸ್: ಸ್ಟೇಟ್ ಫಾರ್ಮೇಷನ್ ಅಂಡ್ ಲೆಜಿಟಿಮೇಷನ್ ಇನ್ ಇಂಡಿಯಾ ಅಂಡ್ ಸೌತ್‌ಈಸ್ಟ್ ಏಷ್ಯಾ", ಮನೋಹರ್, 1993.'
          ],
          ta: [
            'சுப்பிரமணியம், ஆர்., "தி சூர்யவம்சி கஜபதீஸ் ஆஃப் ஒரிசா (The Suryavamsi Gajapatis of Orissa)", ஆந்திரப் பல்கலைக்கழகப் பதிப்பகம், வால்டேர், 1957.',
            'முகர்ஜி, பிரபாத், "தி ஹிஸ்டரி ஆஃப் தி கஜபதி கிங்ஸ் ஆஃப் ஒரிசா அண்ட் தேர் சக்சஸர்ஸ்", கல்கத்தா, 1953.',
            'சாஹு, என்.கே., "ஹிஸ்டரி ஆஃப் ஒரிசா (History of Orissa)", தொகுதிகள் I & II, உத்கல் பல்கலைக்கழகப் பதிப்பகம், 1981.',
            'பானிகிரஹி, கே.சி., "ஹிஸ்டரி ஆஃப் ஒரிசா (இந்துக் காலம்)", கிதாப் மஹால், கட்டாக், 1981.',
            'குல்கே, ஹெர்மன், "கிங்ஸ் அண்ட் கல்ட்ஸ்: ஸ்டேட் ஃபார்மேஷன் அண்ட் லெஜிடிமேஷன் இன் இந்தியா அண்ட் சவுத் ஈஸ்ட் ஏசியா", மனோகர், 1993.'
          ],
          mr: [
            'सुब्रह्मण्यम, आर., "द सूर्यवंशी गजपतीज ऑफ ओरिसा (The Suryavamsi Gajapatis of Orissa)", आंध्र विद्यापीठ प्रेस, वाल्टेअर, १९५७.',
            'मुखर्जी, प्रभात, "द हिस्ट्री ऑफ द गजपती किंग्ज ऑफ ओरिसा अँड देअर सक्सेसर्स", कलकत्ता, १९५३.',
            'साहू, एन.के., "हिस्ट्री ऑफ ओरिसा (History of Orissa)", खंड I व II, उत्कल विद्यापीठ प्रेस, १९८१.',
            'पाणिग्रही, के.सी., "हिस्ट्री ऑफ ओरिसा (हिंदू कालखंड)", किताब महल, कटक, १९८१.',
            'कुल्के, हरमन, "किंग्ज अँड कल्ट्स: स्टेट फॉर्मेशन अँड लेजिटिमेशन इन इंडिया अँड साउथईस्ट एशिया", मनोहर प्रकाशन, १९९३.'
          ],
          or: [
            'ସୁବ୍ରହ୍ମଣ୍ୟମ, ଆର୍., "ଦି ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତିଜ୍ ଅଫ୍ ଓଡ଼ିଶା (The Suryavamsi Gajapatis of Orissa)", ଆନ୍ଧ୍ର ବିଶ୍ୱବିଦ୍ୟାଳୟ ପ୍ରେସ୍, ୱାଲଟେୟାର, ୧୯୫୭।',
            'ମୁଖାର୍ଜୀ, ପ୍ରଭାତ, "ଦି ହିଷ୍ଟ୍ରି ଅଫ୍ ଦି ଗଜପତି କିଙ୍ଗସ୍ ଅଫ୍ ଓଡ଼ିଶା ଆଣ୍ଡ ଦେୟାର ସକସେସର୍ସ", କଲିକତା, ୧୯୫୩।',
            'ସାହୁ, ଏନ୍.କେ., "ହିଷ୍ଟ୍ରି ଅଫ୍ ଓଡ଼ିଶା (History of Orissa)", ଖଣ୍ଡ I ଓ II, ଉତ୍କଳ ବିଶ୍ୱବିଦ୍ୟାଳୟ ପ୍ରେସ୍, ୧୯୮୧।',
            'ପାଣିଗ୍ରାହୀ, କେ.ସି., "ହିଷ୍ଟ୍ରି ଅଫ୍ ଓଡ଼ିଶା (ହିନ୍ଦୁ କାଳ)", କିତାବ ମହଲ, କଟକ, ୧୯୮୧।',
            'କୁଲକେ, ହରମାନ, "କିଙ୍ଗସ୍ ଆଣ୍ଡ କଲ୍ଟସ୍: ଷ୍ଟେଟ୍ ଫର୍ମେସନ୍ ଆଣ୍ଡ ଲେଜିଟିମେସନ୍ ଇନ୍ ଇଣ୍ଡିଆ ଆଣ୍ଡ ସାଉଥଇଷ୍ଟ ଏସିଆ", ମନୋହର, ୧୯୯୩।'
          ],
          bn: [
            'সুব্রহ্মণ্যম, আর., "দ্য সূর্যবংশী গজপতিজ অফ ওড়িশা (The Suryavamsi Gajapatis of Orissa)", অন্ধ্র বিশ্ববিদ্যালয় প্রেস, ওয়াল্টেয়ার, ১৯৫৭।',
            'মুখার্জি, প্রভাত, "দ্য হিস্ট্রি অফ দ্য গজপতি কিংস অফ ওড়িশা অ্যান্ড দেয়ার সাকসেসরস", কলকাতা, ১৯৫৩।',
            'সাহু, এন.কে., "হিস্ট্রি অফ ওড়িশা (History of Orissa)", খণ্ড I ও II, উৎকল বিশ্ববিদ্যালয় প্রেস, ১৯৮১।',
            'পাণিগ্রাহী, কে.সি., "হিস্ট্রি অফ ওড়িশা (হিন্দু যুগ)", কিতাব মহল, কটক, ১৯৮১।',
            'কুলকে, হারমান, "কিংস অ্যান্ড কাল্টস: স্টেট ফরমেশন অ্যান্ড লেজিটিমেশন ইন ইন্ডিয়া অ্যান্ড সাউথইস্ট এশিয়া", মনোহর, ১৯৯৩।'
          ]
        }[language]
      },
      {
        id: 'ref-chronicles',
        sortYear: 1600,
        tier: 'traditional_account' as EpistemicTier,
        img: `${archiveBase}odia_palm_leaf_manuscript.jpg`,
        title: {
          en: 'Indigenous Chronicles & Archival Catalogues',
          hi: 'स्वदेशी इतिवृत्त और अभिलेखीय सूचियाँ',
          te: 'దేశీయ వృత్తాంతాలు & పురాతన పత్రాల జాబితాలు',
          kn: 'ದೇಶೀಯ ವೃತ್ತಾಂತಗಳು ಮತ್ತು ಪತ್ರಾಗಾರ ಸೂಚಿಗಳು',
          ta: 'உள்நாட்டு வரலாற்று ஏடுகள் & ஆவணப் பட்டியல்கள்',
          mr: 'स्थानिक बखरी आणि अभिलेखीय तालिका',
          or: 'ଦେଶୀୟ ଇତିବୃତ୍ତ ଏବଂ ଅଭିଲେଖୀୟ ତାଲିକା',
          bn: 'দেশীয় ইতিবৃত্ত ও আর্কাইভাল ক্যাটালগ'
        }[language],
        description: {
          en: 'Traditional temple chronicles (Madala Panji), village historical registers (Kaifiyats collected by Col. Colin Mackenzie), and state manuscript catalogues.',
          hi: 'पारंपरिक मंदिर इतिवृत्त (मादला पांजी), ग्राम ऐतिहासिक रजिस्टर (कर्नल कॉलिन मैकेंज़ी द्वारा संकलित कैफियत) और राज्य पांडुलिपि सूचियाँ।',
          te: 'సాంప్రదాయ ఆలయ వృత్తాంతాలు (మాదళ పాంజి), గ్రామ చారిత్రక రిజిస్టర్లు (కల్నల్ కాలిన్ మెకెంజీ సేకరించిన కైఫియత్‌లు) మరియు రాష్ట్ర తాళపత్ర జాబితాలు.',
          kn: 'ಸಾಂಪ್ರದಾಯಿಕ ದೇವಾಲಯದ ವೃತ್ತಾಂತಗಳು (ಮಾದಲ ಪಾಂಜಿ), ಗ್ರಾಮ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು (ಕರ್ನಲ್ ಕಾಲಿನ್ ಮೆಕೆಂಜಿ ಸಂಗ್ರಹಿಸಿದ ಕೈಫಿಯತ್‌ಗಳು) ಮತ್ತು ರಾಜ್ಯ ಹಸ್ತಪ್ರತಿ ಸೂಚಿಗಳು.',
          ta: 'பாரம்பரிய கோயில் வரலாற்று ஏடுகள் (மாதல பாஞ்சி), கிராம வரலாற்றுப் பதிவேடுகள் (மெக்கன்சி கைபியத்துகள்) மற்றும் மாநில ஓலைச்சுவடிப் பட்டியல்கள்.',
          mr: 'पारंपारिक मंदिर इतिवृत्त (मादला पांजी), गावचे ऐतिहासिक रजिस्टर (कर्नल कॉलिन मॅकेंझी यांनी संकलित केलेले कैफियत) आणि राज्य हस्तलिखित तालिका.',
          or: 'ପାରମ୍ପରିକ ମନ୍ଦିର ଇତିବୃତ୍ତ (ମାଦଳା ପାଞ୍ଜି), ଗ୍ରାମ ଐତିହାସିକ ରେଜିଷ୍ଟର (କର୍ଣ୍ଣେଲ କଲିନ୍ ମାକେଞ୍ଜିଙ୍କ ଦ୍ୱାରା ସଂଗୃହୀତ କୈଫିୟତ) ଏବଂ ରାଜ୍ୟ ପୋଥି ତାଲିକା।',
          bn: 'ঐতিহ্যবাহী মন্দির ইতিবৃত্ত (মাদলা পাঞ্জি), গ্রাম্য ঐতিহাসিক নিবন্ধ (কর্নেল কলিন ম্যাকেঞ্জি সংগৃহীত কৈফিয়ত) এবং রাজ্য পাণ্ডুলিপি ক্যাটালগ।'
        }[language],
        items: {
          en: [
            'Madala Panji (Prachi Edition), edited by Prof. A.B. Mohanty, Utkal University, Cuttack.',
            'Mackenzie Manuscripts (Local Kaifiyats of Coastal Andhra and Rayalaseema), Government Oriental Manuscripts Library, Chennai.',
            'Descriptive Catalogue of Sanskrit Manuscripts of Orissa, edited by K.N. Mahapatra, State Archives, Bhubaneswar.'
          ],
          hi: [
            'मादला पांजी (प्राची संस्करण), संपादक: प्रो. ए.बी. मोहंती, उत्कल विश्वविद्यालय, कटक।',
            'मैकेंज़ी पांडुलिपियाँ (तटीय आंध्र और रायलसीमा की स्थानीय कैफियतें), गवर्नमेंट ओरिएंटल मैनुस्क्रिप्ट्स लाइब्रेरी (GOML), चेन्नई।',
            'डिस्क्रिप्टिव कैटलॉग ऑफ संस्कृत मैनुस्क्रिप्ट्स ऑफ उड़ीसा, संपादक: के.एन. महापात्र, राज्य अभिलेखागार, भुवनेश्वर।'
          ],
          te: [
            'మాదళ పాంజి (ప్రాచీ సంచిక), సంపాదకులు: ప్రొ. ఎ.బి. మొహంతి, ఉత్కళ్ విశ్వవిద్యాలయం, కటక్.',
            'మెకెంజీ తాళపత్ర ప్రతులు (తీర ఆంధ్ర మరియు రాయలసీమ స్థానిక కైఫియత్‌లు), గవర్నమెంట్ ఓరియంటల్ మాన్యుస్క్రిప్ట్స్ లైব্রరీ (GOML), చెన్నై.',
            'డిస్క్రిప్టివ్ కేటలాగ్ ఆఫ్ సంస్కృత మాన్యుస్క్రిప్ట్స్ ఆఫ్ ఒరిస్సా, సంపాదకులు: కె.ఎన్. మహాపాత్ర, రాష్ట్ర పురాతన పత్ర భాండాగారం, భువనేశ్వర్.'
          ],
          kn: [
            'ಮಾದಲ ಪಾಂಜಿ (ಪ್ರಾಚಿ ಆವೃತ್ತಿ), ಸಂಪಾದಕರು: ಪ್ರೊ. ಎ.ಬಿ. ಮೊಹಂತಿ, ಉತ್ಕಲ್ ವಿಶ್ವವಿದ್ಯಾಲಯ, ಕಟಕ್.',
            'ಮೆಕೆಂಜಿ ಹಸ್ತಪ್ರತಿಗಳು (ಕರಾವಳಿ ಆಂಧ್ರ ಮತ್ತು ರಾಯಲಸೀಮೆಯ ಸ್ಥಳೀಯ ಕೈಫಿಯತ್‌ಗಳು), ಸರ್ಕಾರಿ ಪ್ರಾಚ್ಯ ಹಸ್ತಪ್ರತಿ ಗ್ರಂಥಾಲಯ (GOML), ಚೆನ್ನೈ.',
            'ಡಿಸ್ಕ್ರಿಪ್ಟಿವ್ ಕ್ಯಾಟಲಾಗ್ ಆಫ್ ಸಂಸ್ಕೃತ ಮ್ಯಾನುಸ್ಕ್ರಿಪ್ಟ್ಸ್ ಆಫ್ ಒರಿಸ್ಸಾ, ಸಂಪಾದಕರು: ಕೆ.ಎನ್. ಮಹಾಪಾತ್ರ, ರಾಜ್ಯ ಪತ್ರಾಗಾರ, ಭುವನೇಶ್ವರ.'
          ],
          ta: [
            'மாதல பாஞ்சி (பிராச்சி பதிப்பு), பதிப்பாசிரியர்: பேராசிரியர் ஏ.பி. மொஹந்தி, உத்கல் பல்கலைக்கழகம், கட்டாக்.',
            'மெக்கன்சி சுவடிகள் (கடலோர ஆந்திரா மற்றும் ராயலசீமாவின் உள்ளூர் கைபியத்துகள்), அரசினர் கீழ்த்திசைச் சுவடிகள் நூலகம் (GOML), சென்னை.',
            'ஒரிசாவின் சமஸ்கிருதச் சுவடிகளின் விளக்கப் பட்டியல், பதிப்பாசிரியர்: கே.என். மஹாபாத்ரா, மாநில ஆவணக் காப்பகம், புவனேஸ்வர்.'
          ],
          mr: [
            'मादला पांजी (प्राची आवृत्ती), संपादक: प्रा. ए.बी. मोहंती, उत्कल विद्यापीठ, कटक.',
            'मॅकेंझी हस्तलिखिते (किनारी आंध्र आणि रायलसीमा येथील स्थानिक कैफियती), शासकीय प्राच्य हस्तलिखित ग्रंथालय (GOML), चेन्नई.',
            'डिस्क्रिप्टिव्ह कॅटलॉग ऑफ संस्कृत मॅन्युस्क्रिप्ट्स ऑफ ओरिसा, संपादक: के.एन. महापात्र, राज्य अभिलेखागार, भुवनेश्वर.'
          ],
          or: [
            'ମାଦଳା ପାଞ୍ଜି (ପ୍ରାଚୀ ସଂସ୍କରଣ), ସମ୍ପାଦକ: ପ୍ରଫେସର ଏ.ବି. ମହାନ୍ତି, ଉତ୍କଳ ବିଶ୍ୱବିଦ୍ୟାଳୟ, କଟକ।',
            'ମାକେଞ୍ଜି ପୋଥିସମୂହ (ଉପକୂଳ ଆନ୍ଧ୍ର ଓ ରାୟలସୀମାର ସ୍ଥାନୀୟ କୈଫିୟତ), ସରକାରୀ ପ୍ରାଚ୍ୟ ପୋଥି ଗ୍ରନ୍ଥାଗାର (GOML), ଚେନ୍ନାଇ।',
            'ଓଡ଼ିଶାର ସଂସ୍କୃତ ପୋଥିସମୂହର ବର୍ଣ୍ଣନାତ୍ମକ ତାଲିକା, ସମ୍ପାଦକ: କେ.ଏନ୍. ମହାପାତ୍ର, ରାଜ୍ୟ ଅଭିଲେଖାଗାର, ଭୁବନେଶ୍ୱର।'
          ],
          bn: [
            'মাদলা পাঞ্জি (প্রাচী সংস্করণ), সম্পাদক: প্রফেসর এ.বি. মোহান্তি, উৎকল বিশ্ববিদ্যালয়, কটক।',
            'ম্যাকেঞ্জি পাণ্ডুলিপি (উপকূলীয় অন্ধ্র ও রায়লসীমার স্থানীয় কৈফিয়ত), গভর্নমেন্ট ওরিয়েন্টাল ম্যানুস্ক্রিপ্টস লাইব্রেরি (GOML), চেন্নাই।',
            'ডেসক্রিপটিভ ক্যাটালগ অফ সংস্কৃত ম্যানুস্ক্রিপ্টস অফ ওড়িশা, সম্পাদক: কে.এন. মহাপাত্র, রাজ্য আর্কাইভস, ভুবনেশ্বর।'
          ]
        }[language]
      }
    ];

    bibCorpora.forEach(bib => {
      const keywords = [
        recLoc.epigraphiaIndicaKeyword,
        recLoc.copperPlateEpigraphyKeyword,
        recLoc.palmLeafKeyword,
        recLoc.archivalRepoKeyword
      ];
      records.push({
        id: bib.id,
        category: 'references',
        categoryLabel: ui.referencesTab,
        sortYear: bib.sortYear,
        chronologicalDate: `${bib.items.length} ${recLoc.cataloguedVolumesSuffix}`,
        eraLabel: ui.referencesTab,
        title: bib.title,
        subtitle: `${bib.items.length} ${recLoc.verifiedCitationsSuffix}`,
        locationOrRepository: recLoc.bibLocationRepo,
        rulerOrAuthority: recLoc.bibRulerAuthority,
        imageUrl: bib.img,
        imageCaption: bib.title,
        sourceAttribution: bib.items[0],
        epistemicTier: bib.tier,
        epistemicBadge:
          bib.tier === 'verified_epigraphic'
            ? ui.verifiedEvidenceBadge
            : bib.tier === 'traditional_account'
            ? ui.traditionalAccountBadge
            : ui.scholarlyInterpretationBadge,
        verificationStatus: recLoc.reviewedPrefix,
        summary: bib.description,
        fullDescription: `${bib.description}\n\n${bib.items.map((it, idx) => `${idx + 1}. ${it}`).join('\n')}`,
        metadata: [
          { label: recLoc.corpusClassificationLabel, value: bib.title },
          { label: recLoc.cataloguedVolumesLabel, value: `${bib.items.length} ${recLoc.coreVolumesSuffix}` },
          { label: recLoc.custodialArchivesLabel, value: recLoc.bibLocationRepo }
        ],
        detailedAnalysis: {
          verifiedEvidence: bib.items[0] || bib.description,
          traditionalAccounts: recLoc.bibTraditionalText,
          scholarlyInterpretations: bib.description
        },
        chronologicalEvents: timelineEvents.slice(0, 4).map(ev => ({
          id: ev.id,
          yearText: ev.year_text,
          period: ev.period,
          title: ev.title,
          rulersInvolved: ev.rulers_involved,
          description: ev.political_development,
          monumentsInscriptions: ev.monuments_inscriptions,
          epistemicTier: 'verified_epigraphic' as EpistemicTier
        })),
        inscriptionsAndArchaeology: bib.items.map((it, i) => ({
          title: it.split(':')[0] || `${recLoc.citationPrefix} #${i + 1}`,
          typeBadge: bib.title,
          locationOrDate: `${recLoc.citationPrefix} #${i + 1}`,
          details: it
        })),
        sourceReferences: bib.items.map(it => ({
          citation: it,
          typeBadge:
            bib.tier === 'verified_epigraphic'
              ? ui.verifiedEvidenceBadge
              : bib.tier === 'traditional_account'
              ? ui.traditionalAccountBadge
              : ui.scholarlyInterpretationBadge
        })),
        relatedRecordIds: ['insc_veligalani_1458', 'insc_lingaraja_1452', 'doc_madala_panji', 'doc_sarasvati_vilasa'],
        keywords,
        hashtags: keywords.map(toHashtagToken).filter(s => s.length >= 3),
        related74References: resolveRecord74References(bib.id, `${bib.title} ${bib.description}`)
      });
    });

    return records.sort((a, b) => a.sortYear - b.sortYear);
  }, [
    inscriptions,
    documents,
    timelineEvents,
    locations,
    monuments,
    claims,
    language,
    archiveBase,
    ui,
    t,
    recLoc,
    localizeRegion,
    localizeClaimStatus,
    localizeLicense,
    resolveRecord74References
  ]);

  // Guard ref so URL ?lang= is only read once on initial mount and never reverts user language switches
  const hasReadInitialUrlLangRef = useRef(false);

  // Synchronize initialRecordId or URL query param (?id=... or ?article=...)
  useEffect(() => {
    if (initialRecordId) {
      const match = allRecords.find(r => r.id === initialRecordId);
      if (match) {
        setSelectedRecordId(match.id);
      }
    }
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const paramId = params.get('id') || params.get('article');
        const langParam = params.get('lang') as LanguageCode | null;
        if (
          !hasReadInitialUrlLangRef.current &&
          langParam &&
          SUPPORTED_LANGUAGES.some(l => l.code === langParam)
        ) {
          hasReadInitialUrlLangRef.current = true;
          if (langParam !== language) {
            setLanguage(langParam);
          }
        } else {
          hasReadInitialUrlLangRef.current = true;
        }
        if (paramId && allRecords.some(r => r.id === paramId)) {
          setSelectedRecordId(paramId);
        }
      } catch {
        // Ignore URL parse error
      }
    }
  }, [initialRecordId, allRecords]);

  // Keep URL ?lang= synchronized when user switches language while reading an article
  useEffect(() => {
    if (typeof window === 'undefined' || !hasReadInitialUrlLangRef.current) return;
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('lang') || selectedRecordId) {
        url.searchParams.set('lang', language);
        window.history.replaceState({}, '', `${url.pathname}${url.search}`);
      }
    } catch {
      // Ignore in restricted WebView
    }
  }, [language, selectedRecordId]);

  // Restore scroll when returning from full article detail view
  useEffect(() => {
    if (!selectedRecordId && shouldRestoreScrollRef.current && typeof window !== 'undefined') {
      const targetY = savedListingScrollYRef.current;
      shouldRestoreScrollRef.current = false;
      requestAnimationFrame(() => {
        window.scrollTo({ top: targetY, behavior: 'auto' });
      });
    }
  }, [selectedRecordId]);

  // Signal to FloatingPageDock to hide when reading a full-page Historical Record article on mobile/desktop
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.setAttribute('data-article-reading', selectedRecordId ? 'true' : 'false');
    return () => {
      document.body.setAttribute('data-article-reading', 'false');
    };
  }, [selectedRecordId]);

  const syncUrlRecordParam = (recordId: string | null) => {
    if (typeof window === 'undefined') return;
    try {
      const url = new URL(window.location.href);
      if (recordId) {
        url.searchParams.set('id', recordId);
        url.searchParams.set('lang', language);
      } else {
        url.searchParams.delete('id');
        url.searchParams.delete('article');
        url.searchParams.delete('autoprint');
      }
      window.history.replaceState({}, '', `${url.pathname}${url.search}`);
    } catch {
      // Ignore in restricted WebView
    }
  };

  const openRecordDetail = (recordId: string, fromInternal = false) => {
    if (typeof window !== 'undefined' && !selectedRecordId) {
      savedListingScrollYRef.current = window.scrollY || 0;
    }
    if (fromInternal) {
      setHasInternalHistory(true);
    }
    setIsActionsMenuOpen(false);
    setIsShareMenuOpen(false);
    setIsPrintFallbackOpen(false);
    setSelectedRecordId(recordId);
    syncUrlRecordParam(recordId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeRecordDetail = () => {
    setIsActionsMenuOpen(false);
    setIsShareMenuOpen(false);
    setIsPrintFallbackOpen(false);
    shouldRestoreScrollRef.current = true;
    setSelectedRecordId(null);
    syncUrlRecordParam(null);
  };

  const handleBackNavigation = () => {
    if (hasInternalHistory && typeof window !== 'undefined' && window.history.length > 1) {
      closeRecordDetail();
      return;
    }
    closeRecordDetail();
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (!target.dataset.fallback) {
      target.dataset.fallback = '1';
      target.src = fallbackArchiveImg;
    }
  };

  // Filtered & chronologically sorted records (including 74-Name Community Reference Dataset matching)
  const filteredRecords = useMemo(() => {
    const q = searchQuery.normalize('NFC').trim().toLowerCase();
    return allRecords.filter(rec => {
      if (activeCategory !== 'all' && rec.category !== activeCategory) return false;
      if (epistemicFilter !== 'all' && rec.epistemicTier !== epistemicFilter) return false;
      if (!q) return true;
      return (
        rec.title.toLowerCase().includes(q) ||
        rec.subtitle.toLowerCase().includes(q) ||
        rec.summary.toLowerCase().includes(q) ||
        rec.fullDescription.toLowerCase().includes(q) ||
        rec.rulerOrAuthority.toLowerCase().includes(q) ||
        rec.locationOrRepository.toLowerCase().includes(q) ||
        rec.chronologicalDate.toLowerCase().includes(q) ||
        rec.keywords.some(k => k.toLowerCase().includes(q)) ||
        rec.related74References.some(
          ref =>
            ref.canonicalTerm.toLowerCase().includes(q) ||
            (ref.localizedLabel[language] || '').toLowerCase().includes(q) ||
            ref.multilingualSearchAliases.some((alias: string) => alias.toLowerCase().includes(q))
        )
      );
    });
  }, [allRecords, activeCategory, epistemicFilter, searchQuery, language]);

  const activeRecord = useMemo(
    () => (selectedRecordId ? allRecords.find(r => r.id === selectedRecordId) || null : null),
    [selectedRecordId, allRecords]
  );

  // Ensure the main article image and all embedded figures are fully loaded & decoded before opening the print dialog
  const waitForArticleImagesBeforePrint = async (): Promise<void> => {
    if (typeof window === 'undefined') return;
    const container = articleContainerRef.current;
    const imgs: HTMLImageElement[] = [];
    if (leadImageRef.current) {
      imgs.push(leadImageRef.current);
    }
    if (container) {
      container.querySelectorAll('img').forEach(img => {
        if (!imgs.includes(img)) {
          imgs.push(img);
        }
      });
    }

    await Promise.all(
      imgs.map(
        img =>
          new Promise<void>(resolve => {
            const finalize = () => {
              if (typeof img.decode === 'function') {
                img
                  .decode()
                  .catch(() => {})
                  .finally(() => resolve());
              } else {
                resolve();
              }
            };

            if (img.complete) {
              if (img.naturalWidth === 0 && !img.dataset.fallback) {
                img.dataset.fallback = '1';
                img.src = fallbackArchiveImg;
                img.addEventListener('load', finalize, { once: true });
                img.addEventListener('error', () => resolve(), { once: true });
                setTimeout(resolve, 1200);
              } else {
                finalize();
              }
              return;
            }

            img.loading = 'eager';
            img.addEventListener('load', finalize, { once: true });
            img.addEventListener(
              'error',
              () => {
                if (!img.dataset.fallback) {
                  img.dataset.fallback = '1';
                  img.src = fallbackArchiveImg;
                }
                resolve();
              },
              { once: true }
            );
            setTimeout(resolve, 1500);
          })
      )
    );

    await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  };

  // Auto-print if opened with ?autoprint=1
  useEffect(() => {
    if (typeof window === 'undefined' || !activeRecord) return;
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autoprint') === '1') {
        let cancelled = false;
        const timer = setTimeout(() => {
          waitForArticleImagesBeforePrint().then(() => {
            if (cancelled) return;
            try {
              window.print();
            } catch {
              // Ignore
            }
          });
        }, 450);
        return () => {
          cancelled = true;
          clearTimeout(timer);
        };
      }
    } catch {
      // Ignore
    }
  }, [activeRecord]);

  const getCanonicalRecordUrl = (recId: string): string => {
    if (typeof window === 'undefined') return `${basePath}?id=${encodeURIComponent(recId)}`;
    return `${window.location.origin}${basePath}?id=${encodeURIComponent(recId)}&lang=${encodeURIComponent(language)}`;
  };

  const getExternalPrintRecordUrl = (recId: string): string => {
    if (typeof window === 'undefined') return `${basePath}?id=${encodeURIComponent(recId)}&autoprint=1`;
    return `${window.location.origin}${basePath}?id=${encodeURIComponent(recId)}&lang=${encodeURIComponent(language)}&autoprint=1`;
  };

  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloadResult, setPdfDownloadResult] = useState<{
    filename: string;
    downloadUrl?: string;
  } | null>(null);
  const pdfUi = PDF_EXPORT_UI_LABELS[language] || PDF_EXPORT_UI_LABELS.en;

  const handleDownloadPdfRecord = async (rec: UnifiedHistoricalRecord) => {
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    setPdfDownloadResult(null);
    try {
      await waitForArticleImagesBeforePrint();
      const result = await downloadArticleAsPdf({
        articleTitle: rec.title,
        language,
        containerElement: articleContainerRef.current
      });
      setPdfDownloadResult({
        filename: result.filename,
        downloadUrl: result.downloadUrl
      });
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePrintRecord = async (rec: UnifiedHistoricalRecord) => {
    if (typeof window === 'undefined') return;
    const printUrl = getExternalPrintRecordUrl(rec.id);

    if (hasAppInventorBridge()) {
      try {
        const w = window as unknown as { AppInventor?: { setWebViewString?: (val: string) => void } };
        w.AppInventor?.setWebViewString?.(
          JSON.stringify({
            action: 'PRINT_EXTERNAL',
            url: printUrl,
            recordId: rec.id,
            title: rec.title,
            filename: generateArticlePdfFilename(rec.title),
            lang: language
          })
        );
      } catch {
        // Ignore bridge error
      }
      setIsPrintFallbackOpen(true);
      return;
    }

    if (isAndroidWebViewEnvironment()) {
      setIsPrintFallbackOpen(true);
    }

    await waitForArticleImagesBeforePrint();

    try {
      triggerArticlePrintWithTitle(rec.title);
    } catch {
      setIsPrintFallbackOpen(true);
    }
  };

  const handleCopyLink = async (rec: UnifiedHistoricalRecord, includeTitle = false) => {
    const url = getCanonicalRecordUrl(rec.id);
    const payload = includeTitle ? `${rec.title} — ${rec.subtitle}\n${url}` : url;
    try {
      await navigator.clipboard.writeText(payload);
      setShareFeedback(ui.copiedFeedback);
      setTimeout(() => setShareFeedback(null), 2600);
    } catch {
      setShareFeedback(url);
    }
  };

  const handleShareRecord = async (rec: UnifiedHistoricalRecord) => {
    const shareUrl = getCanonicalRecordUrl(rec.id);
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: rec.title,
          text: `${rec.title} (${rec.chronologicalDate})`,
          url: shareUrl
        });
        return;
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    setIsShareMenuOpen(prev => !prev);
  };

  // ============================================================================
  // FULL ARTICLE DETAIL VIEW (WHEN A RECORD CARD IS CLICKED)
  // ============================================================================
  if (activeRecord) {
    const currentIndex = filteredRecords.findIndex(r => r.id === activeRecord.id);
    const prevRecord = currentIndex > 0 ? filteredRecords[currentIndex - 1] : null;
    const nextRecord =
      currentIndex >= 0 && currentIndex < filteredRecords.length - 1 ? filteredRecords[currentIndex + 1] : null;

    const relatedCards = activeRecord.relatedRecordIds
      .map(id => allRecords.find(r => r.id === id))
      .filter((r): r is UnifiedHistoricalRecord => Boolean(r && r.id !== activeRecord.id))
      .slice(0, 6);

    const allMonographArticles = getAllArticles(language);
    const relatedMonographs = allMonographArticles.slice(0, 3);

    const allFigures = getAllDocumentedFigures(language);
    const figurePriorityByRecord: Record<string, string[]> = {
      insc_veligalani_1458: ['fig_kapilendra_deva', 'fig_hamvira_deva', 'fig_purushottama_deva', 'fig_prataparudra_deva'],
      insc_lingaraja_1452: ['fig_kapilendra_deva', 'fig_purushottama_deva', 'fig_prataparudra_deva', 'fig_hamvira_deva'],
      insc_simhachalam_prataparudra: ['fig_prataparudra_deva', 'fig_kapilendra_deva', 'fig_purushottama_deva', 'fig_virabhadra_deva'],
      insc_hathigumpha: ['fig_kharavela', 'fig_kapilendra_deva', 'fig_purushottama_deva', 'fig_prataparudra_deva'],
      insc_srirangam_1464: ['fig_hamvira_deva', 'fig_kapilendra_deva', 'fig_purushottama_deva', 'fig_prataparudra_deva']
    };
    const priorityFigIds = figurePriorityByRecord[activeRecord.id];
    const relatedPersonalities = priorityFigIds
      ? [
          ...priorityFigIds
            .map(fid => allFigures.find(f => f.id === fid))
            .filter((f): f is NonNullable<typeof f> => Boolean(f)),
          ...allFigures.filter(f => !priorityFigIds.includes(f.id))
        ].slice(0, 4)
      : allFigures.slice(0, 4);

    const relatedKingdoms = recLoc.kingdoms;

    const isVerifiedTier = activeRecord.epistemicTier === 'verified_epigraphic';
    const isTraditionalTier = activeRecord.epistemicTier === 'traditional_account';

    return (
      <div className="print-article-wrapper w-full max-w-5xl mx-auto px-2.5 sm:px-6 lg:px-8 py-3 sm:py-8 overflow-x-hidden print:overflow-visible print:max-w-none print:p-0 animate-in fade-in duration-200">
        {/* ==================================================================== */}
        {/* MAIN ARTICLE CONTAINER (FULL-WIDTH MOBILE READING LAYOUT, NO STICKY OVERLAY) */}
        {/* ==================================================================== */}
        <article
          ref={articleContainerRef}
          className="print-article-container bg-[#111522] border border-[#c99738]/40 rounded-2xl sm:rounded-3xl overflow-hidden print:overflow-visible shadow-2xl print:shadow-none space-y-6 sm:space-y-8 p-4 sm:p-8 lg:p-10 break-words"
        >
          {/* PRINT-ONLY ARCHIVAL MASTHEAD */}
          <div className="print-only hidden print:block border-b-2 border-stone-800 pb-3 mb-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-800">
              Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal — {pageTitle}
            </p>
            <p className="text-[11px] font-semibold text-stone-700 mt-0.5">
              Research, Documentation & Compilation by Dr.G Sathyanarayana Raju • Founder & Historical Documentation Contributor
            </p>
            <p className="text-[10px] text-stone-600 break-all mt-0.5">
              {getCanonicalRecordUrl(activeRecord.id)}
            </p>
          </div>

          {/* SECTION 1: COMPACT NON-STICKY CONTROLS & FULL ARTICLE HEADER */}
          <header className="print-article-header space-y-4 sm:space-y-6 border-b border-stone-800 pb-6 sm:pb-8">
            {/* Compact Top Action Row (Back, Home, Compact Language Selector, Collapsible Article Actions) */}
            <div className="no-print flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800/80 print:hidden">
              {/* Left: Compact Back & Home */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={handleBackNavigation}
                  className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#580014] hover:bg-[#78001c] text-[#fae29c] border border-[#d4af37]/50 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{ui.backButton}</span>
                </button>

                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate('/')}
                    className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-[#c99738] transition-all cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>{ui.homeButton}</span>
                  </button>
                )}
              </div>

              {/* Right: Compact Language Selector + Collapsible Article Actions Menu Button */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <label htmlFor="record-detail-lang-select" className="sr-only">
                  Language
                </label>
                <select
                  id="record-detail-lang-select"
                  value={language}
                  onChange={e => setLanguage(e.target.value as LanguageCode)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-stone-900 text-[#fae29c] border border-[#c99738]/50 focus:outline-none focus:border-[#d4af37] cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map(l => (
                    <option key={l.code} value={l.code} className="bg-[#111522] text-stone-100">
                      {l.nativeName} ({l.code.toUpperCase()})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => handleDownloadPdfRecord(activeRecord)}
                  disabled={isDownloadingPdf}
                  title={`${pdfUi.downloadPdfBtn} (${generateArticlePdfFilename(activeRecord.title)})`}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold bg-[#c99738] hover:bg-[#dfb04c] text-[#290106] border border-[#f5d78e] transition-all cursor-pointer disabled:opacity-60"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>{isDownloadingPdf ? pdfUi.generatingPdfBtn : pdfUi.downloadPdfBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsActionsMenuOpen(prev => !prev)}
                  aria-expanded={isActionsMenuOpen}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    isActionsMenuOpen
                      ? 'bg-[#c99738] text-[#290106] border-[#d4af37]'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-700 hover:border-[#c99738]'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{isActionsMenuOpen ? ui.closeButton : `${pdfUi.printBtn} / ${ui.shareButton}`}</span>
                </button>
              </div>
            </div>

            {/* Collapsible Article Actions Drawer (Inline, Non-Floating, Only Shown When Opened) */}
            {(isActionsMenuOpen ||
              isShareMenuOpen ||
              isPrintFallbackOpen ||
              shareFeedback ||
              pdfDownloadResult) && (
              <div className="no-print p-3 sm:p-4 rounded-xl bg-[#161c2e] border border-[#c99738]/40 space-y-3 print:hidden">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadPdfRecord(activeRecord)}
                      disabled={isDownloadingPdf}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#c99738] hover:bg-[#dfb04c] text-[#290106] border border-[#f5d78e] cursor-pointer disabled:opacity-60"
                    >
                      <Download className="w-3.5 h-3.5 shrink-0" />
                      <span>{isDownloadingPdf ? pdfUi.generatingPdfBtn : pdfUi.downloadPdfBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePrintRecord(activeRecord)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-700 hover:border-[#c99738] cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{pdfUi.printBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShareRecord(activeRecord)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-700 hover:border-[#c99738] cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{ui.shareButton}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyLink(activeRecord, false)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 cursor-pointer"
                    >
                      <Link2 className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{ui.copyLinkButton}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyLink(activeRecord, true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{ui.copyTitleAndLinkButton}</span>
                    </button>

                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `${activeRecord.title} (${activeRecord.chronologicalDate})\n${getCanonicalRecordUrl(activeRecord.id)}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#25D366] hover:bg-[#20ba5a] text-[#052e16] transition-all"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                      <span>{ui.whatsappShareButton}</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsActionsMenuOpen(false);
                      setIsShareMenuOpen(false);
                      setPdfDownloadResult(null);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-stone-300 hover:text-white bg-stone-900 border border-stone-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{ui.closeButton}</span>
                  </button>
                </div>

                {pdfDownloadResult && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold flex items-center gap-1.5 break-all">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{pdfUi.pdfSavedNotice(pdfDownloadResult.filename)}</span>
                    </span>
                    {pdfDownloadResult.downloadUrl && (
                      <a
                        href={pdfDownloadResult.downloadUrl}
                        download={pdfDownloadResult.filename}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#c99738] text-[#290106] font-bold text-[11px]"
                      >
                        <Download className="w-3 h-3" />
                        <span>{pdfUi.directDownloadLinkLabel}</span>
                      </a>
                    )}
                  </div>
                )}

                {shareFeedback && (
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{shareFeedback}</span>
                  </div>
                )}

                {/* Android WebViewer Print Fallback Panel */}
                {isPrintFallbackOpen && (
                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs text-amber-100 space-y-2">
                    <div className="font-bold text-amber-300 flex items-center justify-between">
                      <span>{ui.printFallbackTitle}</span>
                      <button
                        type="button"
                        onClick={() => setIsPrintFallbackOpen(false)}
                        className="text-amber-300 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-amber-200/90 leading-relaxed">{ui.printFallbackDesc}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <a
                        href={getExternalPrintRecordUrl(activeRecord.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c99738] text-[#290106] font-bold text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{ui.openExternalPrintButton}</span>
                      </a>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(getExternalPrintRecordUrl(activeRecord.id));
                            setPrintUrlCopied(true);
                            setTimeout(() => setPrintUrlCopied(false), 2500);
                          } catch {
                            // Ignore
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-amber-200 border border-amber-500/40 font-semibold text-xs cursor-pointer"
                      >
                        {printUrlCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{printUrlCopied ? ui.copiedFeedback : ui.copyPrintUrlButton}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Category, Epistemic Classification & Chronological Date Badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#580014] text-[#fae29c] border border-[#d4af37]/50">
                {activeRecord.categoryLabel}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold border ${
                  isVerifiedTier
                    ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                    : isTraditionalTier
                    ? 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                    : 'bg-purple-950/70 text-purple-300 border-purple-500/40'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{activeRecord.epistemicBadge}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-stone-900 text-[#e8c872] border border-stone-700">
                <Calendar className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>{activeRecord.chronologicalDate}</span>
              </span>
            </div>

            {/* Article Title & Subtitle */}
            <div className="space-y-2">
              <h1 className="font-royal-heading font-extrabold text-xl sm:text-3xl lg:text-4xl text-[#fcedc7] leading-snug break-words">
                {activeRecord.title}
              </h1>
              <p className="text-xs sm:text-base text-[#d4af37] font-semibold leading-relaxed break-words">
                {activeRecord.subtitle}
              </p>
            </div>

            {/* Lead Visual Figure */}
            <figure className="print-lead-figure print-avoid-break rounded-xl sm:rounded-2xl overflow-hidden print:overflow-visible border border-[#c99738]/40 bg-stone-950 shadow-xl">
              <div className="print-lead-figure-box relative h-52 sm:h-80 lg:h-96 print:h-auto w-full overflow-hidden print:overflow-visible bg-stone-950">
                <img
                  ref={leadImageRef}
                  src={activeRecord.imageUrl}
                  alt={activeRecord.title}
                  loading="eager"
                  decoding="sync"
                  onError={handleImgError}
                  className="print-lead-image w-full h-full object-cover object-center"
                />
                <div className="no-print print:hidden absolute inset-0 bg-gradient-to-t from-[#111522] via-transparent to-black/25" />
                <span className="no-print print:hidden absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/80 text-[#fae29c] border border-[#d4af37]/40 text-[11px] font-semibold backdrop-blur-sm">
                  {activeRecord.eraLabel}
                </span>
              </div>
              <figcaption className="p-3 sm:p-4 bg-stone-950/95 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
                <span className="text-stone-200 font-medium break-words">{activeRecord.imageCaption}</span>
                <span className="text-[#d4af37] font-semibold break-words">{activeRecord.sourceAttribution}</span>
              </figcaption>
            </figure>
          </header>

          {/* SECTION 2: EXECUTIVE SUMMARY & ARCHIVAL PROVENANCE METADATA */}
          <section className="space-y-4 sm:space-y-5">
            <h2 className="font-royal-heading font-bold text-base sm:text-xl text-[#fae29c] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d4af37] shrink-0" />
              <span>{ui.executiveSummaryHeading}</span>
            </h2>

            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#210710] via-[#151a2a] to-[#1a0b13] border border-[#d4af37]/40 text-[15px] sm:text-base text-stone-100 font-royal-serif leading-relaxed break-words">
              {activeRecord.summary}
            </div>

            {activeRecord.metadata.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {activeRecord.metadata.map((meta, idx) => (
                  <div
                    key={idx}
                    className="print-avoid-break p-3 sm:p-3.5 rounded-xl bg-[#161c2c] border border-stone-800 space-y-1 break-words"
                  >
                    <span className="text-stone-400 font-semibold block">{meta.label}:</span>
                    <strong className="text-stone-100 text-xs sm:text-sm leading-snug block break-words">
                      {meta.value}
                    </strong>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SECTION 3: COMPLETE HISTORICAL DESCRIPTION & TRANSCRIPTION / TRANSLATION */}
          <section className="space-y-5 sm:space-y-6 border-t border-stone-800 pt-6 sm:pt-8">
            <h2 className="font-royal-heading font-bold text-base sm:text-xl text-[#fae29c] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#d4af37] shrink-0" />
              <span>{ui.completeDescriptionHeading}</span>
            </h2>

            <div className="text-[15px] sm:text-base text-stone-100 font-royal-serif leading-relaxed whitespace-pre-line bg-[#0d101b] p-4 sm:p-6 rounded-2xl border border-stone-800 break-words">
              {activeRecord.fullDescription}
            </div>

            {activeRecord.transcriptionExcerpt && (
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-2">
                  <Quote className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>
                    {ui.transcriptionHeading}
                    {activeRecord.transcriptionLanguage ? ` (${activeRecord.transcriptionLanguage})` : ''}
                  </span>
                </h3>
                <div className="p-3.5 sm:p-5 rounded-2xl bg-[#171113] border border-[#c99738]/40 text-xs sm:text-sm font-mono text-[#fce8bb] leading-relaxed break-words overflow-x-auto">
                  {activeRecord.transcriptionExcerpt}
                </div>
              </div>
            )}

            {activeRecord.translationExcerpt && (
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  {ui.translationHeading}
                </h3>
                <div className="p-4 sm:p-5 rounded-2xl bg-[#141b2b] border border-stone-800 text-[15px] sm:text-base font-royal-serif text-stone-100 leading-relaxed italic break-words">
                  "{activeRecord.translationExcerpt}"
                </div>
              </div>
            )}
          </section>

          {/* SECTION 4: 5-TIER EPISTEMIC DISTINCTION & DETAILED HISTORICAL ANALYSIS */}
          <section className="space-y-5 border-t border-stone-800 pt-8">
            <div className="space-y-1">
              <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                <span>{ui.detailedAnalysisHeading}</span>
              </h2>
              <p className="text-xs text-stone-400">{ui.epistemicBannerDesc}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Pillar 1: Verified Inscriptional & Archaeological Evidence */}
              <div className="print-avoid-break p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/35 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{ui.verifiedEvidenceTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {activeRecord.detailedAnalysis.verifiedEvidence}
                </p>
              </div>

              {/* Pillar 2: Traditional Accounts & Oral Histories */}
              <div className="print-avoid-break p-5 rounded-2xl bg-amber-950/20 border border-amber-500/35 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <Scroll className="w-4 h-4 shrink-0" />
                  <span>{ui.traditionalAccountsTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {activeRecord.detailedAnalysis.traditionalAccounts}
                </p>
              </div>

              {/* Pillar 3: Scholarly Interpretations */}
              <div className="print-avoid-break p-5 rounded-2xl bg-purple-950/20 border border-purple-500/35 space-y-2.5">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>{ui.scholarlyInterpretationsTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {activeRecord.detailedAnalysis.scholarlyInterpretations}
                </p>
              </div>
            </div>

            {/* Additional Epistemic Tiers: Documentary & Literary Sources + Claims Requiring Further Research */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="print-avoid-break p-4 sm:p-5 rounded-2xl bg-sky-950/20 border border-sky-500/35 space-y-2">
                <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>{recLoc.docLiterarySourcesHeading}</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {recLoc.docLiterarySourcesDesc(
                    activeRecord.locationOrRepository,
                    activeRecord.sourceReferences.length
                  )}
                </p>
              </div>

              <div className="print-avoid-break p-4 sm:p-5 rounded-2xl bg-rose-950/20 border border-rose-500/35 space-y-2">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{recLoc.claimsFurtherResearchHeading}</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {recLoc.claimsFurtherResearchDesc(activeRecord.chronologicalDate)}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4B: RELATED RULERS, DYNASTIES & KINGDOMS IN COMPLETE DETAIL VIEW */}
          <section className="space-y-5 border-t border-stone-800 pt-8">
            <div className="space-y-1">
              <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c] flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#d4af37]" />
                <span>{recLoc.relatedRulersDynastiesHeading}</span>
              </h2>
              <p className="text-xs text-stone-400">
                {recLoc.primarySovereignAuthorityLabel}: <strong className="text-[#fae29c]">{activeRecord.rulerOrAuthority}</strong> • {recLoc.geographicalJurisdictionLabel}: <strong className="text-stone-200">{activeRecord.locationOrRepository}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {relatedPersonalities.map(fig => (
                <div
                  key={fig.id}
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate(`/kings-queens?figure=${encodeURIComponent(fig.id)}`);
                    }
                  }}
                  className="print-avoid-break p-3 rounded-2xl bg-[#151a28] border border-stone-800 hover:border-[#d4af37] transition-all cursor-pointer flex items-center gap-3 group"
                >
                  <img
                    src={fig.image_url || '/assets/gallery/jagannath_puri.svg'}
                    alt={fig.name}
                    loading="lazy"
                    onError={handleImgError}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#c99738]/40 bg-stone-950"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider block truncate">
                      {fig.dynasty_name}
                    </span>
                    <h4 className="font-royal-heading font-bold text-xs text-[#fcedc7] group-hover:text-white truncate">
                      {fig.name}
                    </h4>
                    <span className="text-[10px] text-stone-400 block truncate">{fig.reign_period}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: CHRONOLOGICAL TIMELINE OF HISTORICAL EVENTS */}
          {activeRecord.chronologicalEvents.length > 0 && (
            <section className="space-y-5 border-t border-stone-800 pt-8">
              <div className="space-y-1">
                <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                  <span>{ui.chronologicalTimelineHeading}</span>
                </h2>
                <p className="text-xs text-stone-400">{ui.chronologicalTimelineSub}</p>
              </div>

              <div className="relative border-l-2 border-[#c99738]/45 ml-3 sm:ml-5 pl-5 sm:pl-7 space-y-5">
                {activeRecord.chronologicalEvents.map((ev, idx) => (
                  <div
                    key={`${ev.id}_${idx}`}
                    onClick={() => {
                      if (allRecords.some(r => r.id === ev.id)) {
                        openRecordDetail(ev.id, true);
                      }
                    }}
                    className="print-avoid-break relative p-4 sm:p-5 rounded-2xl bg-[#151a28] border border-stone-800 hover:border-[#c99738]/60 transition-all cursor-pointer group"
                  >
                    <div className="no-print print:hidden absolute -left-[29px] sm:-left-[37px] top-4 w-4 h-4 rounded-full bg-[#580014] border-2 border-[#d4af37]" />
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#580014] text-[#fae29c] border border-[#d4af37]/40">
                        {ev.yearText} • {ev.period}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                          ev.epistemicTier === 'verified_epigraphic'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {ev.epistemicTier === 'verified_epigraphic'
                          ? ui.verifiedEvidenceBadge
                          : ui.traditionalAccountBadge}
                      </span>
                    </div>

                    <h3 className="font-royal-heading font-bold text-base text-[#fcedc7] group-hover:text-white">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-[#d4af37] font-semibold mt-0.5">
                      {ev.rulersInvolved}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-2">
                      {ev.description}
                    </p>
                    <div className="mt-2 pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                      <strong className="text-stone-300">{recLoc.epigraphicMonumentEvidenceLabel}</strong> {ev.monumentsInscriptions}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 6: INSCRIPTIONS, COPPER PLATES, ARCHAEOLOGICAL RECORDS & DOCUMENTARY EVIDENCE */}
          {activeRecord.inscriptionsAndArchaeology.length > 0 && (
            <section className="space-y-5 border-t border-stone-800 pt-8">
              <div className="space-y-1">
                <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c] flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-[#d4af37]" />
                  <span>{ui.inscriptionsArchaeologyHeading}</span>
                </h2>
                <p className="text-xs text-stone-400">{ui.inscriptionsArchaeologySub}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeRecord.inscriptionsAndArchaeology.map((item, idx) => (
                  <div
                    key={idx}
                    className="print-avoid-break p-4 sm:p-5 rounded-2xl bg-[#151a28] border border-[#c99738]/35 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-[#580014] text-[#fae29c] text-[10px] font-bold border border-[#d4af37]/40">
                        {item.typeBadge}
                      </span>
                      <span className="text-[11px] text-stone-400 font-medium">{item.locationOrDate}</span>
                    </div>
                    <h3 className="font-royal-heading font-bold text-sm sm:text-base text-[#fcedc7]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed">{item.details}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 7: PRIMARY SOURCE REFERENCES & CITATIONS */}
          {activeRecord.sourceReferences.length > 0 && (
            <section className="space-y-4 border-t border-stone-800 pt-8">
              <div className="space-y-1">
                <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#d4af37]" />
                  <span>{ui.sourceReferencesHeading}</span>
                </h2>
                <p className="text-xs text-stone-400">{ui.sourceReferencesSub}</p>
              </div>

              <div className="space-y-2.5">
                {activeRecord.sourceReferences.map((ref, idx) => (
                  <div
                    key={idx}
                    className="print-avoid-break p-3.5 sm:p-4 rounded-xl bg-[#0d101b] border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-200">
                      <span className="px-2 py-0.5 rounded bg-[#580014] text-[#fae29c] font-bold text-xs shrink-0">
                        [{idx + 1}]
                      </span>
                      <span className="leading-relaxed">{ref.citation}</span>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-stone-900 text-[#d4af37] border border-stone-700 font-semibold self-start sm:self-center shrink-0">
                      {ref.typeBadge}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 8: RELATED RECORDS, RELATED MONOGRAPHS, RELATED KINGDOMS & PERSONALITIES, KEYWORDS, HASHTAGS & NAVIGATION */}
          <section className="space-y-8 border-t-2 border-[#c99738]/40 pt-8">
            {/* Related Historical Records with Small Thumbnails */}
            {relatedCards.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-royal-heading font-bold text-base sm:text-lg text-[#fae29c] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#d4af37]" />
                  <span>{ui.relatedRecordsHeading}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedCards.map(rel => (
                    <div
                      key={rel.id}
                      onClick={() => openRecordDetail(rel.id, true)}
                      className="print-avoid-break p-3.5 rounded-2xl bg-[#151a28] border border-stone-800 hover:border-[#d4af37] transition-all cursor-pointer flex items-start gap-3.5 group shadow-md"
                    >
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        loading="lazy"
                        onError={handleImgError}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#c99738]/40 bg-stone-950 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="inline-block text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                          {rel.chronologicalDate}
                        </span>
                        <h4 className="font-royal-heading font-bold text-xs sm:text-sm text-[#fcedc7] group-hover:text-white line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                        <p className="text-[11px] text-stone-400 line-clamp-2 leading-snug">
                          {rel.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Historical Monographs with Small Thumbnails */}
            {relatedMonographs.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-royal-heading font-bold text-base sm:text-lg text-[#fae29c] flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-[#d4af37]" />
                  <span>{recLoc.relatedMonographsHeading}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedMonographs.map(mono => (
                    <div
                      key={mono.id}
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate(`/documentary?article=${encodeURIComponent(mono.slug || mono.id)}`);
                        }
                      }}
                      className="print-avoid-break p-3.5 rounded-2xl bg-[#151a28] border border-stone-800 hover:border-[#d4af37] transition-all cursor-pointer flex items-start gap-3.5 group shadow-md"
                    >
                      <img
                        src={mono.featured_image || '/assets/gallery/konark_wheel.svg'}
                        alt={mono.original_title}
                        loading="lazy"
                        onError={handleImgError}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#c99738]/40 bg-stone-950 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="inline-block text-[10px] font-bold text-[#d4af37] uppercase tracking-wider line-clamp-1">
                          {localizeMonographCategory(mono.category || '') || recLoc.historicalMonographBadge}
                        </span>
                        <h4 className="font-royal-heading font-bold text-xs sm:text-sm text-[#fcedc7] group-hover:text-white line-clamp-2 leading-snug">
                          {mono.original_title}
                        </h4>
                        <p className="text-[11px] text-stone-400 line-clamp-2 leading-snug">
                          {mono.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 74-NAME COMMUNITY REFERENCE DATASET CROSS-REFERENCE SECTION */}
            {activeRecord.related74References.length > 0 && (
              <div className="print-avoid-break space-y-4 p-4 sm:p-6 rounded-2xl bg-[#141929] border border-[#c99738]/40">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-royal-heading font-bold text-base sm:text-lg text-[#fae29c] flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#d4af37] shrink-0" />
                      <span>{ref74Ui.sectionTitle}</span>
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#580014] text-[#fae29c] border border-[#d4af37]/40">
                      {activeRecord.related74References.length} / {MASTER_70_REFERENCE_REGISTRY.length}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">{ref74Ui.sectionSubtitle}</p>
                  <p className="text-[11px] text-amber-200/90 bg-amber-950/30 border border-amber-500/30 rounded-xl px-3 py-2 leading-relaxed">
                    {ref74Ui.nonConflationDisclaimer}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeRecord.related74References.map(refEntry => {
                    const localizedTerm = refEntry.localizedLabel[language] || refEntry.canonicalTerm;
                    const localizedContext =
                      refEntry.historicalContextNote[language] || refEntry.historicalContextNote.en;
                    const isVerifiedRef =
                      refEntry.verificationStatus === 'Verified Epigraphic / Historical Record';
                    const isGazetteerRef =
                      refEntry.verificationStatus === 'Documented Gazetteer / Ethnographic Record';
                    const isLineageRef =
                      refEntry.verificationStatus === 'Traditional / Regional Lineage Record';

                    const verBadgeText = isVerifiedRef
                      ? ref74Ui.verifiedRecordBadge
                      : isGazetteerRef
                      ? ref74Ui.gazetteerRecordBadge
                      : isLineageRef
                      ? ref74Ui.lineageRecordBadge
                      : ref74Ui.requiresVerificationBadge;

                    const classBadgeText =
                      ref74Ui.classifications[refEntry.classification] || refEntry.classification;

                    const groupBadgeText =
                      refEntry.datasetGroup === 'original_45'
                        ? ref74Ui.original45Badge
                        : ref74Ui.supplementary25Badge;

                    return (
                      <div
                        key={refEntry.id}
                        onClick={() => {
                          setSearchQuery(refEntry.canonicalTerm);
                          setActiveCategory('all');
                          closeRecordDetail();
                        }}
                        className="print-avoid-break p-3.5 rounded-xl bg-[#0e1320] border border-stone-800 hover:border-[#d4af37] transition-all cursor-pointer space-y-2 group"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-[#580014] text-[#fae29c] text-[10px] font-bold border border-[#d4af37]/40">
                            #{refEntry.order} / 74
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              isVerifiedRef
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                                : isGazetteerRef
                                ? 'bg-purple-950/60 text-purple-300 border-purple-500/40'
                                : isLineageRef
                                ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                                : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                            }`}
                          >
                            {verBadgeText}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-royal-heading font-bold text-xs sm:text-sm text-[#fcedc7] group-hover:text-white">
                            {localizedTerm}
                          </h4>
                          <span className="text-[10px] font-semibold text-[#d4af37] block mt-0.5">
                            {classBadgeText} • {groupBadgeText}
                          </span>
                        </div>

                        <p className="text-[11px] text-stone-300 leading-relaxed line-clamp-3">
                          {localizedContext}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Related Kingdoms & Dynasties with Small Thumbnails */}
            <div className="space-y-4">
              <h3 className="font-royal-heading font-bold text-base sm:text-lg text-[#fae29c] flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#d4af37]" />
                <span>{recLoc.relatedKingdomsPersonalitiesHeading}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedKingdoms.map((k, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate(k.route);
                      }
                    }}
                    className="print-avoid-break p-3.5 rounded-2xl bg-[#151a28] border border-stone-800 hover:border-[#d4af37] transition-all cursor-pointer flex items-start gap-3.5 group shadow-md"
                  >
                    <img
                      src={k.imageUrl}
                      alt={k.title}
                      loading="lazy"
                      onError={handleImgError}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#c99738]/40 bg-stone-950 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="inline-block text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                        {k.badge}
                      </span>
                      <h4 className="font-royal-heading font-bold text-xs sm:text-sm text-[#fcedc7] group-hover:text-white line-clamp-2 leading-snug">
                        {k.title}
                      </h4>
                      <p className="text-[11px] text-stone-400 line-clamp-1">
                        {k.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Keywords */}
            {activeRecord.keywords.length > 0 && (
              <div className="print-avoid-break space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{ui.relatedKeywordsHeading}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeRecord.keywords.map(kw => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => {
                        setSearchQuery(kw);
                        setActiveCategory('all');
                        closeRecordDetail();
                      }}
                      className="px-3 py-1 rounded-xl bg-stone-900 hover:bg-[#580014] text-xs text-stone-200 hover:text-[#fae29c] border border-stone-700 hover:border-[#d4af37]/50 transition-colors cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Relevant Hashtags */}
            {activeRecord.hashtags.length > 0 && (
              <div className="print-avoid-break space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                  {ui.relevantHashtagsHeading}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeRecord.hashtags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag);
                        setActiveCategory('all');
                        closeRecordDetail();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#0d101b] hover:bg-stone-800 text-[11px] font-mono text-amber-200/90 border border-stone-800 cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Previous / Next Sequential Record Navigation (Hidden in Print) */}
            {(prevRecord || nextRecord) && (
              <div className="no-print print:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-800">
                {prevRecord ? (
                  <button
                    type="button"
                    onClick={() => openRecordDetail(prevRecord.id, true)}
                    className="p-4 rounded-2xl bg-[#151a28] hover:bg-[#1c2235] border border-stone-800 hover:border-[#d4af37] text-left transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#d4af37] shrink-0 group-hover:-translate-x-1 transition-transform" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        {ui.previousRecordLabel}
                      </span>
                      <span className="font-royal-heading font-bold text-xs sm:text-sm text-[#fae29c] truncate block">
                        {prevRecord.title}
                      </span>
                    </div>
                  </button>
                ) : (
                  <div />
                )}

                {nextRecord ? (
                  <button
                    type="button"
                    onClick={() => openRecordDetail(nextRecord.id, true)}
                    className="p-4 rounded-2xl bg-[#151a28] hover:bg-[#1c2235] border border-stone-800 hover:border-[#d4af37] text-right transition-all cursor-pointer flex items-center justify-end gap-3 group"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        {ui.nextRecordLabel}
                      </span>
                      <span className="font-royal-heading font-bold text-xs sm:text-sm text-[#fae29c] truncate block">
                        {nextRecord.title}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#d4af37] shrink-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <div />
                )}
              </div>
            )}

            {/* Bottom Action Buttons (Back, Home, Print, Share, Copy Link, Close) — Hidden in Print */}
            <div className="no-print print:hidden pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleBackNavigation}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#580014] hover:bg-[#78001c] text-[#fae29c] border border-[#d4af37]/50 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
                  <span>{ui.backButton}</span>
                </button>

                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate('/')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-[#c99738] transition-all cursor-pointer"
                  >
                    <Home className="w-4 h-4 text-[#d4af37]" />
                    <span>{ui.homeButton}</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePrintRecord(activeRecord)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-[#c99738] transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#d4af37]" />
                  <span>{ui.printButton}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleShareRecord(activeRecord)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-[#c99738] transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-[#d4af37]" />
                  <span>{ui.shareButton}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyLink(activeRecord, false)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-[#c99738] transition-all cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-[#d4af37]" />
                  <span>{ui.copyLinkButton}</span>
                </button>

                <button
                  type="button"
                  onClick={closeRecordDetail}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#c99738] text-[#290106] hover:bg-[#dfab43] transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>{ui.closeButton}</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800/80 print:border-stone-300">
              <PublisherCreditCard variant="article-profile" />
            </div>
          </section>
        </article>
      </div>
    );
  }

  // ============================================================================
  // ARTICLE LISTING INTERFACE (CHRONOLOGICALLY ORDERED CARDS)
  // ============================================================================
  const categoryTabs: Array<{ id: HistoricalRecordCategory; label: string; count: number }> = [
    { id: 'all', label: ui.allRecordsTab, count: allRecords.length },
    {
      id: 'inscriptions',
      label: ui.inscriptionsTab,
      count: allRecords.filter(r => r.category === 'inscriptions').length
    },
    {
      id: 'documents',
      label: ui.documentsTab,
      count: allRecords.filter(r => r.category === 'documents').length
    },
    {
      id: 'timeline',
      label: ui.timelineTab,
      count: allRecords.filter(r => r.category === 'timeline').length
    },
    {
      id: 'archaeology',
      label: ui.archaeologyTab,
      count: allRecords.filter(r => r.category === 'archaeology').length
    },
    {
      id: 'references',
      label: ui.referencesTab,
      count: allRecords.filter(r => r.category === 'references').length
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-800 pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
            {headerIcon || <Scroll className="w-4 h-4" />}
            <span>{pageBadge}</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#580014] text-[#fae29c] border border-[#d4af37]/40 text-xs font-semibold">
            {ui.chronologicalOrderBadge}
          </span>
        </div>

        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
          {pageSubtitle}
        </p>
      </div>

      {/* Epistemic Classification Protocol Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#240610] via-[#141929] to-[#1a0912] border border-[#d4af37]/40 shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#fae29c]">
          <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
          <span>{ui.epistemicBannerTitle}</span>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed">{ui.epistemicBannerDesc}</p>
      </div>

      {/* Search, Category Tabs & Epistemic Tier Filter Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#121624] border border-[#c99738]/35 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl bg-[#182032] text-stone-100 placeholder-stone-400 border border-stone-700 focus:outline-none focus:border-[#d4af37]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-stone-300 font-medium">
            <strong className="text-[#fae29c]">{filteredRecords.length}</strong> {ui.showingCountLabel}
          </div>
        </div>

        {/* Record Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {categoryTabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === tab.id
                  ? 'bg-gradient-to-r from-[#997022] to-[#c99738] text-[#290106] shadow-md'
                  : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeCategory === tab.id ? 'bg-[#290106]/20 text-[#290106]' : 'bg-stone-800 text-[#d4af37]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Epistemic Classification Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800/80 text-xs">
          <button
            type="button"
            onClick={() => setEpistemicFilter('all')}
            className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
              epistemicFilter === 'all'
                ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37]'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            {ui.allEpistemicFilter}
          </button>

          <button
            type="button"
            onClick={() =>
              setEpistemicFilter(epistemicFilter === 'verified_epigraphic' ? 'all' : 'verified_epigraphic')
            }
            className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
              epistemicFilter === 'verified_epigraphic'
                ? 'bg-emerald-950 text-emerald-200 border border-emerald-400'
                : 'bg-stone-900 text-emerald-300/80 hover:text-emerald-200 border border-stone-800'
            }`}
          >
            ✓ {ui.verifiedEvidenceBadge}
          </button>

          <button
            type="button"
            onClick={() =>
              setEpistemicFilter(epistemicFilter === 'traditional_account' ? 'all' : 'traditional_account')
            }
            className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
              epistemicFilter === 'traditional_account'
                ? 'bg-amber-950 text-amber-200 border border-amber-400'
                : 'bg-stone-900 text-amber-300/80 hover:text-amber-200 border border-stone-800'
            }`}
          >
            📜 {ui.traditionalAccountBadge}
          </button>

          <button
            type="button"
            onClick={() =>
              setEpistemicFilter(
                epistemicFilter === 'scholarly_interpretation' ? 'all' : 'scholarly_interpretation'
              )
            }
            className={`px-3 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
              epistemicFilter === 'scholarly_interpretation'
                ? 'bg-purple-950 text-purple-200 border border-purple-400'
                : 'bg-stone-900 text-purple-300/80 hover:text-purple-200 border border-stone-800'
            }`}
          >
            🔍 {ui.scholarlyInterpretationBadge}
          </button>
        </div>
      </div>

      {/* Article Cards Grid */}
      {filteredRecords.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#121624] border border-stone-800 space-y-3">
          <Scroll className="w-10 h-10 text-[#d4af37] mx-auto" />
          <h3 className="font-royal-heading font-bold text-lg text-[#fae29c]">{ui.emptyStateTitle}</h3>
          <p className="text-xs text-stone-400">{ui.emptyStateDesc}</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setEpistemicFilter('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#c99738] text-[#290106] cursor-pointer"
          >
            {ui.clearFiltersBtn}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map(rec => {
            const isVerified = rec.epistemicTier === 'verified_epigraphic';
            const isTraditional = rec.epistemicTier === 'traditional_account';

            return (
              <div
                key={rec.id}
                onClick={() => openRecordDetail(rec.id, false)}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openRecordDetail(rec.id, false);
                  }
                }}
                className="bg-[#121624] border border-[#c99738]/35 hover:border-[#d4af37] rounded-3xl overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(201,151,56,0.2)] transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
              >
                <div>
                  {/* Card Thumbnail */}
                  <figure className="relative h-48 w-full overflow-hidden bg-stone-950 border-b border-stone-800/80">
                    <img
                      src={rec.imageUrl}
                      alt={rec.title}
                      loading="lazy"
                      onError={handleImgError}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-black/30" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#580014]/90 text-[#fae29c] border border-[#d4af37]/40 backdrop-blur-sm">
                        {rec.chronologicalDate}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/75 text-[#fae29c] border border-stone-700 backdrop-blur-sm">
                        {rec.sourceReferences.length} {ui.sourcesCountSuffix}
                      </span>
                    </div>
                    <figcaption className="absolute bottom-2 left-3.5 right-3.5 text-[10px] text-stone-200 font-medium line-clamp-1">
                      {rec.categoryLabel} • {rec.eraLabel}
                    </figcaption>
                  </figure>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-3">
                    {/* Epistemic Distinction Pill */}
                    <div>
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isVerified
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : isTraditional
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                            : 'bg-purple-950/60 text-purple-300 border-purple-500/40'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span>{rec.epistemicBadge}</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="font-royal-heading font-bold text-lg text-[#fae29c] group-hover:text-white transition-colors leading-snug">
                        {rec.title}
                      </h3>
                      <p className="text-xs text-[#d4af37] font-semibold mt-1 line-clamp-1">
                        {rec.rulerOrAuthority}
                      </p>
                    </div>

                    <div className="flex items-start gap-1.5 text-xs text-stone-300 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{rec.locationOrRepository}</span>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                      {rec.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-stone-800/80 space-y-2.5">
                  {rec.related74References.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1">
                      {rec.related74References.slice(0, 3).map(refEntry => (
                        <span
                          key={refEntry.id}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#580014]/70 text-[#fae29c] border border-[#d4af37]/30 font-medium"
                        >
                          #{refEntry.order} {refEntry.localizedLabel[language] || refEntry.canonicalTerm}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {rec.hashtags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[11px] text-stone-400">
                      ⏳ {rec.chronologicalEvents.length} {ui.eventsCountSuffix}
                    </span>
                    <span className="text-[#d4af37] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{ui.readFullArticleBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
