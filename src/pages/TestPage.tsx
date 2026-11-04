import React, { useEffect, useState, useMemo, useCallback, Suspense, lazy } from 'react';
import {
  Crown,
  Scroll,
  MapPin,
  BookOpen,
  Users,
  ShieldCheck,
  ArrowRight,
  Compass,
  Landmark,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  Award,
  Search,
  Globe2,
  ChevronRight,
  ChevronLeft,
  Download,
  Scale,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import {
  SiteStatistics,
  Article,
  HistoricalEvent,
  GalleryItem,
  HistoricalFigure,
  LanguageCode
} from '../types';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { TimelineViewer } from '../components/TimelineViewer';
import { ArchivalImage } from '../components/ArchivalImage';
import type { ContentDetailItem } from '../components/ContentDetailModal';
import { PublisherCreditCard } from '../components/PublisherCreditCard';
import { useLanguage } from '../context/LanguageContext';
import { getAllArticles } from '../data/articlesRepository';
import { getAllDocumentedFigures } from '../data/documentedFiguresRepository';
import {
  getCanonicalTimelineEvents,
  getCanonicalGallery,
  CANONICAL_STATISTICS
} from '../data/archivalSeedData';

// Lazy-load interactive modals so their JS payload is only parsed when opened
const LightboxModal = lazy(() =>
  import('../components/LightboxModal').then(m => ({ default: m.LightboxModal }))
);
const ArticleBriefModal = lazy(() =>
  import('../components/ArticleBriefModal').then(m => ({ default: m.ArticleBriefModal }))
);
const ContentDetailModal = lazy(() =>
  import('../components/ContentDetailModal').then(m => ({ default: m.ContentDetailModal }))
);

export interface TestPageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const ARCHIVE_IMG = (file: string) =>
  `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/${file}`;

export const ROYAL_HERO_BANNER_IMG = `${(import.meta as any).env?.BASE_URL || '/'}assets/royal-hero-banner.png`;
export const ROYAL_HERO_BANNER_AISTUDIO_IMG = `${(import.meta as any).env?.BASE_URL || '/'}assets/aistudio/royal-hero-banner_5f3b132e.png`;

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
    resourcesBadge: string;
    resourcesTitle: string;
    resourcesSub: string;
    articlesBadge: string;
    articlesTitle: string;
    articlesSub: string;
    readArticleBtn: string;
    quickAbstractBtn: string;
    viewAllArticlesBtn: string;
    showAllArticlesBtn: (count: number) => string;
    showCompactArticlesBtn: string;
    timelineBadge: string;
    timelineTitle: string;
    timelineSub: string;
    galleryBadge: string;
    galleryTitle: string;
    gallerySub: string;
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
    heroMainTitle: 'Suryavamsha Odiyaraju Kshatriya',
    heroMainSubtitle: 'Historical Documentary & Royal Heritage Portal',
    heroTagline:
      'Preserving 2,500+ years of verified epigraphy, sovereign Suryavamsha Gajapathi chronicles, Odra-Kalinga martial history, and pan-Indian royal lineage heritage.',
    exploreHeritageBtn: 'Explore Our Heritage',
    watchDocumentaryBtn: 'Historical Documentary',
    quickAccessBadge: 'Royal Heritage Directory',
    quickAccessTitle: 'Quick Access Heritage Portals',
    quickAccessSub:
      'Direct access to verified historical personages, royal dynasties, copper-plate inscriptions, monographs, and community heritage records.',
    journeyBadge: 'Epochal Civilizational Continuity',
    journeyTitle: 'Chronological Heritage Journey Across Realms',
    journeySub:
      'Trace the unbroken geopolitical and martial evolution from ancient Odra Desha and Kalinga to the imperial Suryavamsha Gajapathi Empire and Trikalinga.',
    exploreRealmBtn: 'Read More',
    personagesBadge: 'Sovereign Rulers & Progenitors',
    personagesTitle: 'Featured Historical Personages',
    personagesSub:
      'Chronologically arranged biographies of Solar Dynasty progenitors, Kalinga emperors, and Suryavamsha Gajapathi monarchs.',
    viewBiographyBtn: 'Read More',
    viewAllPersonagesBtn: 'View All Personages',
    showMorePersonagesBtn: total => `Load All ${total} Historical Personages`,
    showLessPersonagesBtn: 'Show Featured Personages',
    resourcesBadge: 'Primary Archival Evidence Vault',
    resourcesTitle: 'Historical Resources & Primary Evidence',
    resourcesSub:
      'Examine high-resolution historical maps, bilingual copper-plate charters, peer-reviewed research sources, and downloadable archival PDFs.',
    articlesBadge: 'Chronological & Categorized Monographs',
    articlesTitle: 'Historical Articles & Documentary Monographs',
    articlesSub:
      'Complete collection of peer-reviewed historical articles arranged chronologically from Solar Dynasty antiquity and ancient Odra-Kalinga to the Imperial Gajapathi era and pan-Indian community heritage.',
    readArticleBtn: 'Read More',
    quickAbstractBtn: 'Quick Abstract',
    viewAllArticlesBtn: 'View All Monographs',
    showAllArticlesBtn: count => `View All ${count} Categorized Articles on Page`,
    showCompactArticlesBtn: 'Show Grouped Overview',
    timelineBadge: 'Chronological Progression',
    timelineTitle: 'Interactive Historical Timeline',
    timelineSub:
      'Key dynastic milestones, battles, temple endowments, and epigraphic charters from the 3rd Century BCE to the 19th Century CE.',
    galleryBadge: 'Visual Epigraphy & Architecture',
    galleryTitle: 'Archival Visual Gallery Showcase',
    gallerySub:
      'Authenticated photographs of rock edicts, copper-plate charters, temples, and hill-fortresses.',
    statsBadge: 'Verified Repository Metrics',
    statsTitle: 'Archival Documentation Overview',
    catAll: 'All Chronological Categories (12)',
    catSolarAntiquity: 'I. Solar Lineage & Ancient Kalinga-Odra (Epic Era – 1st Century BCE)',
    catSolarAntiquitySub:
      'Primordial Ikshvaku Suryavamsha progenitors, the Great Kalinga War (261 BCE), and Emperor Kharavela’s Hathigumpha Prakrit edicts.',
    catOdraGajapathi: 'II. Odra Desha & Imperial Gajapathi Zenith (7th – 16th Century CE)',
    catOdraGajapathiSub:
      'Territorial evolution of Odra Desha, Emperor Kapilendra Deva’s trans-regional empire from the Ganga to the Kaveri, and southern Jala-Durga fortresses.',
    catCommunityGenealogy: 'III. Community Heritage, Synonyms & Royal Genealogy (12th Century CE – Present)',
    catCommunityGenealogySub:
      'Pan-Indian Oad-Rajput, Odra-Kshatriya, and Odiyaraju/VaddeRajulu historical migrations, regional synonyms, and epigraphic vs. Vamsavali methodology.',
    catEpigraphyArch: 'IV. Primary Epigraphy, Manuscripts & Imperial Architecture (1st Century BCE – 1815 CE)',
    catEpigraphyArchSub:
      'Bilingual copper-plate charters, palm-leaf chronicles (Madala Panji, Sarasvati Vilasa), Mackenzie Kaifiyats, and Kalinga-Odra temples and forts.',
    viewCategoryBtn: 'View All',
    citationsLabel: count => `${count} Verified Citations`
  },
  hi: {
    heroMainTitle: 'सूर्यवंश ओडियाराजु क्षत्रिय',
    heroMainSubtitle: 'ऐतिहासिक डॉक्यूमेंट्री एवं शाही विरासत पोर्टल',
    heroTagline:
      '2,500+ वर्षों के प्रमाणित शिलालेखों, सूर्यवंशी गजपति साम्राज्य, ओड्र-कलिंग शौर्य इतिहास और अखिल भारतीय क्षत्रिय वंश विरासत का प्रामाणिक अभिलेखागार।',
    exploreHeritageBtn: 'हमारी विरासत देखें',
    watchDocumentaryBtn: 'ऐतिहासिक डॉक्यूमेंट्री',
    quickAccessBadge: 'शाही विरासत निर्देशिका',
    quickAccessTitle: 'प्रमुख ऐतिहासिक अनुभाग (त्वरित प्रवेश)',
    quickAccessSub:
      'ऐतिहासिक विभूतियों, राजवंशों, ताम्रपत्र शिलालेखों, शोध मोनोग्राफ और सामुदायिक विरासत तक सीधा प्रवेश।',
    journeyBadge: 'युगीन सभ्यतागत निरंतरता',
    journeyTitle: 'ऐतिहासिक साम्राज्यों की कालानुक्रमिक यात्रा',
    journeySub:
      'प्राचीन ओड्र देश और कलिंग साम्राज्य से सूर्यवंशी गजपति साम्राज्य और त्रिकलिंग तक का गौरवशाली इतिहास।',
    exploreRealmBtn: 'अधिक पढ़ें',
    personagesBadge: 'सम्राट एवं कुल-प्रवर्तक',
    personagesTitle: 'प्रमुख ऐतिहासिक विभूतियाँ एवं सम्राट',
    personagesSub:
      'सूर्यवंशी आदि-पुरुषों, कलिंग सम्राटों और गजपति शासकों की कालानुक्रमिक जीवनियाँ।',
    viewBiographyBtn: 'अधिक पढ़ें',
    viewAllPersonagesBtn: 'सभी जीवनियाँ देखें',
    showMorePersonagesBtn: total => `सभी ${total} ऐतिहासिक विभूतियाँ देखें`,
    showLessPersonagesBtn: 'संक्षिप्त सूची दिखाएँ',
    resourcesBadge: 'प्राथमिक अभिलेखीय साक्ष्य कोष',
    resourcesTitle: 'ऐतिहासिक संसाधन एवं प्राथमिक साक्ष्य',
    resourcesSub:
      'ऐतिहासिक मानचित्र, ताम्रपत्र शिलालेख, प्राथमिक शोध स्रोत और पीडीएफ डाउनलोड।',
    articlesBadge: 'कालानुक्रमिक एवं वर्गीकृत शोध लेख',
    articlesTitle: 'ऐतिहासिक लेख एवं डॉक्यूमेंट्री मोनोग्राफ',
    articlesSub:
      'सूर्यवंश की प्राचीनता और ओड्र-कलिंग से लेकर गजपति साम्राज्य और सामुदायिक विरासत तक कालानुक्रमिक रूप से व्यवस्थित संपूर्ण शोध लेख।',
    readArticleBtn: 'अधिक पढ़ें',
    quickAbstractBtn: 'संक्षिप्त सारांश',
    viewAllArticlesBtn: 'सभी मोनोग्राफ देखें',
    showAllArticlesBtn: count => `सभी ${count} वर्गीकृत लेख देखें`,
    showCompactArticlesBtn: 'संक्षिप्त दृश्य',
    timelineBadge: 'कालानुक्रमिक विकास',
    timelineTitle: 'इंटरएक्टिव ऐतिहासिक कालक्रम',
    timelineSub: 'तीसरी शताब्दी ई.पू. से 19वीं शताब्दी ई. तक की प्रमुख ऐतिहासिक घटनाएँ।',
    galleryBadge: 'दृश्य पुरालेख एवं स्थापत्य',
    galleryTitle: 'अभिलेखीय दृश्य गैलरी',
    gallerySub: 'शिलालेखों, ताम्रपत्रों, मंदिरों और दुर्गों के प्रामाणिक चित्र।',
    statsBadge: 'प्रमाणित अभिलेखीय आँकड़े',
    statsTitle: 'अभिलेखागार सारांश',
    catAll: 'सभी कालानुक्रमिक श्रेणियाँ (12)',
    catSolarAntiquity: 'I. सूर्यवंश प्राचीनता एवं कलिंग-ओड्र युग (महाकाव्य काल – प्रथम शताब्दी ई.पू.)',
    catSolarAntiquitySub:
      'इक्ष्वाकु सूर्यवंशी आदि-पुरुष, महान कलिंग युद्ध (261 ई.पू.) और सम्राट खारवेल का हाथीगुम्फा शिलालेख।',
    catOdraGajapathi: 'II. ओड्र देश भू-राजनीति एवं सूर्यवंशी गजपति साम्राज्य (7वीं – 16वीं शताब्दी ई.)',
    catOdraGajapathiSub:
      'ओड्र देश का क्षेत्रीय विकास, सम्राट कपिलेंद्र देव का गंगा से कावेरी तक साम्राज्य और कोल्लेटीकोटा जल-दुर्ग।',
    catCommunityGenealogy: 'III. सामुदायिक विरासत, उपनाम एवं शाही वंशावली (12वीं शताब्दी ई. – वर्तमान)',
    catCommunityGenealogySub:
      'अखिल भारतीय ओड-राजपूत, ओड्र-क्षत्रिय एवं ओडियाराजु/वड्डेराजुलु इतिहास और शिलालेखीय वंशावली पद्धति।',
    catEpigraphyArch: 'IV. प्राथमिक शिलालेख, पांडुलिपियाँ एवं मंदिर स्थापत्य (प्रथम शताब्दी ई.पू. – 1815 ई.)',
    catEpigraphyArchSub:
      'द्विभाषी ताम्रपत्र, ताड़पत्र पांडुलिपियाँ (मादला पंजी, सरस्वती विलास) और कलिंग-ओड्र मंदिर व दुर्ग।',
    viewCategoryBtn: 'सभी देखें',
    citationsLabel: count => `${count} प्रमाणित संदर्भ`
  },
  te: {
    heroMainTitle: 'సూర్యవంశ ఒడియరాజు క్షత్రియ',
    heroMainSubtitle: 'చారిత్రక డాక్యుమెంటరీ & రాజ వారసత్వ పోర్టల్',
    heroTagline:
      '2,500+ సంవత్సరాల ధృవీకరించబడిన శాసనాలు, సూర్యవంశ గజపతి సామ్రాజ్య చరిత్ర, ఓడ్ర-కళింగ క్షత్రియ శౌర్యం మరియు రాజ వంశావళి వారసత్వ వేదిక.',
    exploreHeritageBtn: 'మా వారసత్వాన్ని అన్వేషించండి',
    watchDocumentaryBtn: 'చారిత్రక డాక్యుమెంటరీ',
    quickAccessBadge: 'రాజ వారసత్వ డైరెక్టరీ',
    quickAccessTitle: 'ప్రధాన వారసత్వ విభాగాలు (క్విక్ యాక్సెస్)',
    quickAccessSub:
      'చారిత్రక ప్రముఖులు, రాజవంశాలు, తామ్రపత్ర శాసనాలు, పరిశోధనా మోనోగ్రాఫ్‌లు మరియు సామాజిక వారసత్వ రికార్డులకు నేరుగా ప్రవేశం.',
    journeyBadge: 'చారిత్రక నాగరికత ప్రస్థానం',
    journeyTitle: 'చారిత్రక రాజ్యాల కాలక్రమానుసార ప్రస్థానం',
    journeySub:
      'ప్రాచీన ఓడ్ర దేశం మరియు కళింగ సామ్రాజ్యం నుండి సూర్యవంశ గజపతి సామ్రాజ్యం మరియు త్రికళింగ వరకు అవిచ్ఛిన్న చరిత్ర.',
    exploreRealmBtn: 'మరింత చదవండి',
    personagesBadge: 'చక్రవర్తులు & ఆది-పురుషులు',
    personagesTitle: 'ప్రముఖ చారిత్రక వ్యక్తులు & చక్రవర్తులు',
    personagesSub:
      'సూర్యవంశ మూలపురుషులు, కళింగ చక్రవర్తులు మరియు గజపతి మహారాజుల కాలక్రమానుసార జీవిత చరిత్రలు.',
    viewBiographyBtn: 'మరింత చదవండి',
    viewAllPersonagesBtn: 'అన్ని జీవిత చరిత్రలు చూడండి',
    showMorePersonagesBtn: total => `మొత్తం ${total} చారిత్రక ప్రముఖులను చూడండి`,
    showLessPersonagesBtn: 'ముఖ్య ప్రముఖులను చూపించు',
    resourcesBadge: 'ప్రాథమిక శాసన ఆధారాల భాండాగారం',
    resourcesTitle: 'చారిత్రక వనరులు & ప్రాథమిక ఆధారాలు',
    resourcesSub:
      'చారిత్రక పటాలు, తామ్రపత్ర శాసనాలు, పరిశోధనా ఆధారాలు మరియు పీడీఎఫ్ డౌన్‌లోడ్లు.',
    articlesBadge: 'కాలక్రమానుసార & వర్గీకరించబడిన వ్యాసాలు',
    articlesTitle: 'చారిత్రక వ్యాసాలు & డాక్యుమెంటరీ మోనోగ్రాఫ్‌లు',
    articlesSub:
      'సూర్యవంశ ప్రాచీనత మరియు ఓడ్ర-కళింగ నుండి గజపతి సామ్రాజ్యం మరియు సామాజిక వారసత్వం వరకు కాలక్రమానుసారంగా అమర్చబడిన పూర్తి పరిశోధనా వ్యాసాలు.',
    readArticleBtn: 'మరింత చదవండి',
    quickAbstractBtn: 'సంక్షిప్త సారాంశం',
    viewAllArticlesBtn: 'అన్ని మోనోగ్రాఫ్‌లు చూడండి',
    showAllArticlesBtn: count => `మొత్తం ${count} వ్యాసాలను చూడండి`,
    showCompactArticlesBtn: 'సంక్షిప్త వీక్షణ',
    timelineBadge: 'కాలక్రమానుసార పురోగతి',
    timelineTitle: 'చారిత్రక కాలక్రమం (టైమ్‌లైన్)',
    timelineSub: 'క్రీ.పూ. 3వ శతాబ్దం నుండి క్రీ.శ. 19వ శతాబ్దం వరకు జరిగిన కీలక చారిత్రక ఘట్టాలు.',
    galleryBadge: 'శాసన & శిల్పకళా చిత్రాలు',
    galleryTitle: 'చారిత్రక చిత్ర గ్యాలరీ',
    gallerySub: 'శిలాశాసనాలు, తామ్రపత్రాలు, దేవాలయాలు మరియు కోటల ధృవీకరించబడిన చిత్రాలు.',
    statsBadge: 'ధృవీకరించబడిన గణాంకాలు',
    statsTitle: 'పురావస్తు పరిశోధనా గణాంకాలు',
    catAll: 'అన్ని కాలక్రమానుసార విభాగాలు (12)',
    catSolarAntiquity: 'I. సూర్యవంశ ప్రాచీనత & ప్రాచీన కళింగ-ఓడ్ర యుగం (ఇతిహాస కాలం – క్రీ.పూ. 1వ శతాబ్దం)',
    catSolarAntiquitySub:
      'ఇక్ష్వాకు సూర్యవంశ మూలపురుషులు, మహా కళింగ యుద్ధం (క్రీ.పూ. 261) మరియు ఖారవేలుని హాథీగుంఫా శాసనం.',
    catOdraGajapathi: 'II. ఓడ్ర దేశం & సూర్యవంశ గజపతి సామ్రాజ్య వైభవం (7వ – 16వ శతాబ్దం)',
    catOdraGajapathiSub:
      'ఓడ్ర దేశ భౌగోళిక పరిణామం, కపిలేంద్ర దేవ గజపతి సామ్రాజ్య విస్తరణ మరియు కొల్లేటికోట జలదుర్గం.',
    catCommunityGenealogy: 'III. సామాజిక వారసత్వం, పర్యాయపదాలు & రాజ వంశావళి (12వ శతాబ్దం – నేటి వరకు)',
    catCommunityGenealogySub:
      'ఓడ్-రాజ్‌పుత్, ఓడ్ర-క్షత్రియ, ఒడియరాజు/వడ్డెరాజుల చరిత్ర మరియు శాసన ఆధారిత వంశావళి ప్రమాణాలు.',
    catEpigraphyArch: 'IV. ప్రాథమిక శాసనాలు, తాళపత్ర గ్రంథాలు & ఆలయ వాస్తుశిల్పం (క్రీ.పూ. 1వ శతాబ్దం – 1815 CE)',
    catEpigraphyArchSub:
      'తామ్రపత్ర శాసనాలు, మాదలా పంజీ, సరస్వతీ విలాస గ్రంథాలు, మెకంజీ కైఫియత్‌లు మరియు కళింగ దేవాలయాలు.',
    viewCategoryBtn: 'అన్నీ చూడండి',
    citationsLabel: count => `${count} మూల ఆధారాలు`
  },
  kn: {
    heroMainTitle: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ',
    heroMainSubtitle: 'ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ ಮತ್ತು ರಾಜ ಪರಂಪರೆಯ ಪೋರ್ಟಲ್',
    heroTagline:
      '2,500+ ವರ್ಷಗಳ ದೃಢೀಕೃತ ಶಾಸನಗಳು, ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ಇತಿಹಾಸ, ಓಡ್ರ-ಕಳಿಂಗ ಶೌರ್ಯ ಮತ್ತು ರಾಜ ವಂಶಾವಳಿಯ ಅಧಿಕೃತ ವೇದಿಕೆ.',
    exploreHeritageBtn: 'ನಮ್ಮ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
    watchDocumentaryBtn: 'ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ',
    quickAccessBadge: 'ರಾಜ ಪರಂಪರೆಯ ನಿರ್ದೇಶಿಕೆ',
    quickAccessTitle: 'ಪ್ರಮುಖ ಪರಂಪರೆಯ ವಿಭಾಗಗಳು (ತ್ವರಿತ ಪ್ರವೇಶ)',
    quickAccessSub:
      'ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು, ರಾಜವಂಶಗಳು, ತಾಮ್ರಶಾಸನಗಳು, ಸಂಶೋಧನಾ ಮೊನೊಗ್ರಾಫ್‌ಗಳು ಮತ್ತು ಸಮುದಾಯದ ಪರಂಪರೆಗೆ ನೇರ ಪ್ರವೇಶ.',
    journeyBadge: 'ಯುಗಯುಗಗಳ ನಾಗರಿಕತೆಯ ಪರಂಪರೆ',
    journeyTitle: 'ಐತಿಹಾಸಿಕ ಸಾಮ್ರಾಜ್ಯಗಳ ಕಾಲಾನುಕ್ರಮಣಿಕೆಯ ಪಯಣ',
    journeySub:
      'ಪ್ರಾಚೀನ ಓಡ್ರ ದೇಶ ಮತ್ತು ಕಳಿಂಗದಿಂದ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ತ್ರಿಕಳಿಂಗದವರೆಗಿನ ಅವಿಚ್ಛಿನ್ನ ಇತಿಹಾಸ.',
    exploreRealmBtn: 'ಮುಂದೆ ಓದಿ',
    personagesBadge: 'ಚಕ್ರವರ್ತಿಗಳು ಮತ್ತು ಆದಿಪುರುಷರು',
    personagesTitle: 'ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಸಾಮ್ರಾಟರು',
    personagesSub:
      'ಸೂರ್ಯವಂಶದ ಮೂಲಪುರುಷರು, ಕಳಿಂಗ ಚಕ್ರವರ್ತಿಗಳು ಮತ್ತು ಗಜಪತಿ ಮಹಾರಾಜರ ಜೀವನ ಚರಿತ್ರೆ.',
    viewBiographyBtn: 'ಮುಂದೆ ಓದಿ',
    viewAllPersonagesBtn: 'ಎಲ್ಲಾ ಜೀವನ ಚರಿತ್ರೆಗಳನ್ನು ನೋಡಿ',
    showMorePersonagesBtn: total => `ಎಲ್ಲಾ ${total} ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳನ್ನು ನೋಡಿ`,
    showLessPersonagesBtn: 'ಪ್ರಮುಖ ವ್ಯಕ್ತಿಗಳನ್ನು ತೋರಿಸಿ',
    resourcesBadge: 'ಪ್ರಾಥಮಿಕ ದಾಖಲೆಗಳ ಭಂಡಾರ',
    resourcesTitle: 'ಐತಿಹಾಸಿಕ ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಪ್ರಾಥಮಿಕ ಆಧಾರಗಳು',
    resourcesSub:
      'ಐತಿಹಾಸಿಕ ಭೂಪಟಗಳು, ತಾಮ್ರಶಾಸನಗಳು, ಸಂಶೋಧನಾ ಆಕರಗಳು ಮತ್ತು ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್‌ಗಳು.',
    articlesBadge: 'ಕಾಲಾನುಕ್ರಮಣಿಕೆ ಮತ್ತು ವರ್ಗೀಕೃತ ಲೇಖನಗಳು',
    articlesTitle: 'ಐತಿಹಾಸಿಕ ಲೇಖನಗಳು ಮತ್ತು ಸಾಕ್ಷ್ಯಚಿತ್ರ ಮೊನೊಗ್ರಾಫ್‌ಗಳು',
    articlesSub:
      'ಸೂರ್ಯವಂಶದ ಪ್ರಾಚೀನತೆ ಮತ್ತು ಓಡ್ರ-ಕಳಿಂಗದಿಂದ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ ಹಾಗೂ ಸಮುದಾಯ ಪರಂಪರೆಯವರೆಗೆ ಕಾಲಾನುಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಲಾದ ಸಂಶೋಧನಾ ಲೇಖನಗಳು.',
    readArticleBtn: 'ಮುಂದೆ ಓದಿ',
    quickAbstractBtn: 'ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ',
    viewAllArticlesBtn: 'ಎಲ್ಲಾ ಮೊನೊಗ್ರಾಫ್‌ಗಳನ್ನು ನೋಡಿ',
    showAllArticlesBtn: count => `ಎಲ್ಲಾ ${count} ಲೇಖನಗಳನ್ನು ನೋಡಿ`,
    showCompactArticlesBtn: 'ಸಂಕ್ಷಿಪ್ತ ನೋಟ',
    timelineBadge: 'ಕಾಲಾನುಕ್ರಮಣಿಕೆ',
    timelineTitle: 'ಐತಿಹಾಸಿಕ ಕಾಲರೇಖೆ (ಟೈಮ್‌ಲೈನ್)',
    timelineSub: 'ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನದಿಂದ ಕ್ರಿ.ಶ. 19ನೇ ಶತಮಾನದವರೆಗಿನ ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಘಟನೆಗಳು.',
    galleryBadge: 'ಶಾಸನ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ ಗ್ಯಾಲರಿ',
    galleryTitle: 'ಐತಿಹಾಸಿಕ ಚಿತ್ರ ಗ್ಯಾಲರಿ',
    gallerySub: 'ಶಿಲಾಶಾಸನಗಳು, ತಾಮ್ರಪತ್ರಗಳು, ದೇವಾಲಯಗಳು ಮತ್ತು ಕೋಟೆಗಳ ದೃಢೀಕೃತ ಚಿತ್ರಗಳು.',
    statsBadge: 'ದೃಢೀಕೃತ ಅಂಕಿಅಂಶಗಳು',
    statsTitle: 'ಪತ್ರಾಗಾರ ದಾಖಲಾತಿ ವಿವರ',
    catAll: 'ಎಲ್ಲಾ ಕಾಲಾನುಕ್ರಮ ವಿಭಾಗಗಳು (12)',
    catSolarAntiquity: 'I. ಸೂರ್ಯವಂಶ ಪ್ರಾಚೀನತೆ ಮತ್ತು ಕಳಿಂಗ-ಓಡ್ರ ಯುಗ (ಪುರಾಣ ಕಾಲ – ಕ್ರಿ.ಪೂ. 1ನೇ ಶತಮಾನ)',
    catSolarAntiquitySub:
      'ಇಕ್ಷ್ವಾಕು ಸೂರ್ಯವಂಶದ ಆದಿಪುರುಷರು, ಕಳಿಂಗ ಯುದ್ಧ (ಕ್ರಿ.ಪೂ. 261) ಮತ್ತು ಖಾರವೇಲನ ಹಾಥಿಗುಂಫಾ ಶಾಸನ.',
    catOdraGajapathi: 'II. ಓಡ್ರ ದೇಶ ಮತ್ತು ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ (7ನೇ – 16ನೇ ಶತಮಾನ)',
    catOdraGajapathiSub:
      'ಓಡ್ರ ದೇಶದ ಭೌಗೋಳಿಕ ವಿಕಾಸ, ಕಪಿಲೇಂದ್ರ ದೇವ ಗಜಪತಿಯ ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ಕೊಲ್ಲೇಟಿಕೋಟ ಜಲದುರ್ಗ.',
    catCommunityGenealogy: 'III. ಸಮುದಾಯ ಪರಂಪರೆ, ಪರ್ಯಾಯ ನಾಮಗಳು ಮತ್ತು ರಾಜ ವಂಶಾವಳಿ (12ನೇ ಶತಮಾನ – ಪ್ರಸ್ತುತ)',
    catCommunityGenealogySub:
      'ಓಡ್-ರಜಪೂತ್, ಓಡ್ರ-ಕ್ಷತ್ರಿಯ, ಒಡಿಯರಾಜು/ವಡ್ಡೇರಾಜುಲು ಇತಿಹಾಸ ಮತ್ತು ವಂಶಾವಳಿ ಸಂಶೋಧನಾ ವಿಧಾನ.',
    catEpigraphyArch: 'IV. ಪ್ರಾಥಮಿಕ ಶಾಸನಗಳು, ಹಸ್ತಪ್ರತಿಗಳು ಮತ್ತು ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ (ಕ್ರಿ.ಪೂ. 1ನೇ ಶತಮಾನ – 1815 CE)',
    catEpigraphyArchSub:
      'ತಾಮ್ರಪತ್ರ ಶಾಸನಗಳು, ತಾಳೆಗರಿ ಗ್ರಂಥಗಳು ಮತ್ತು ಕಳಿಂಗ-ಓಡ್ರ ದೇವಾಲಯಗಳು ಹಾಗೂ ಕೋಟೆಗಳು.',
    viewCategoryBtn: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
    citationsLabel: count => `${count} ಉಲ್ಲೇಖಗಳು`
  },
  ta: {
    heroMainTitle: 'சூரியவம்ச ஒடியராஜு சத்திரிய',
    heroMainSubtitle: 'வரலாற்று ஆவணப்படம் & அரச பாரம்பரிய இணையதளம்',
    heroTagline:
      '2,500+ ஆண்டுகால கல்வெட்டுகள், சூரியவம்ச கஜபதி பேரரசின் வரலாறு, ஒட்ர-கலிங்க வீரம் மற்றும் அரச வம்சாவளி ஆவணக் காப்பகம்.',
    exploreHeritageBtn: 'எங்கள் பாரம்பரியத்தை ஆராயுங்கள்',
    watchDocumentaryBtn: 'வரலாற்று ஆவணப்படம்',
    quickAccessBadge: 'அரச பாரம்பரிய வழிகாட்டி',
    quickAccessTitle: 'முக்கிய வரலாற்றுப் பிரிவுகள் (விரைவு அணுகல்)',
    quickAccessSub:
      'வரலாற்று ஆளுமைகள், அரச வம்சங்கள், செப்பேடுகள், ஆய்வுக் கட்டுரைகள் மற்றும் சமூகப் பாரம்பரியப் பதிவுகளுக்கான நேரடி அணுகல்.',
    journeyBadge: 'நாகரிகத் தொடர்ச்சி',
    journeyTitle: 'வரலாற்றுப் பேரரசுகளின் காலவரிசைப் பயணம்',
    journeySub:
      'பண்டைய ஒட்ர தேசம் மற்றும் கலிங்கப் பேரரசிலிருந்து சூரியவம்ச கஜபதி பேரரசு மற்றும் திரிகலிங்கம் வரையிலான வரலாறு.',
    exploreRealmBtn: 'மேலும் படிக்க',
    personagesBadge: 'பேரரசர்கள் & முன்னோடிகள்',
    personagesTitle: 'முக்கிய வரலாற்று ஆளுமைகள் & மன்னர்கள்',
    personagesSub:
      'சூரியவம்ச முன்னோடிகள், கலிங்கப் பேரரசர்கள் மற்றும் கஜபதி மன்னர்களின் வாழ்க்கை வரலாறு.',
    viewBiographyBtn: 'மேலும் படிக்க',
    viewAllPersonagesBtn: 'அனைத்து வரலாறுகளையும் காண்க',
    showMorePersonagesBtn: total => `அனைத்து ${total} வரலாற்று ஆளுமைகளையும் காண்க`,
    showLessPersonagesBtn: 'சுருக்கமாகக் காண்க',
    resourcesBadge: 'முதன்மை ஆவணக் கருவூலம்',
    resourcesTitle: 'வரலாற்று ஆதாரங்கள் & முதன்மைச் சான்றுகள்',
    resourcesSub:
      'வரலாற்று வரைபடங்கள், செப்பேட்டுச் சாசனங்கள், ஆராய்ச்சி ஆதாரங்கள் மற்றும் பிடிஎஃப் பதிவிறக்கங்கள்.',
    articlesBadge: 'காலவரிசை & வகைப்படுத்தப்பட்ட கட்டுரைகள்',
    articlesTitle: 'வரலாற்றுக் கட்டுரைகள் & ஆவண மோனோகிராஃப்கள்',
    articlesSub:
      'சூரியவம்சப் பழமை மற்றும் ஒட்ர-கலிங்கம் முதல் கஜபதி பேரரசு மற்றும் சமூகப் பாரம்பரியம் வரை காலவரிசையில் அமைக்கப்பட்ட முழு ஆய்வுக் கட்டுரைகள்.',
    readArticleBtn: 'மேலும் படிக்க',
    quickAbstractBtn: 'சுருக்கத்தைக் காண்க',
    viewAllArticlesBtn: 'அனைத்து கட்டுரைகளையும் காண்க',
    showAllArticlesBtn: count => `அனைத்து ${count} கட்டுரைகளையும் காண்க`,
    showCompactArticlesBtn: 'சுருக்கக் காட்சி',
    timelineBadge: 'காலவரிசை வளர்ச்சி',
    timelineTitle: 'வரலாற்றுக் காலவரிசை',
    timelineSub: 'கி.மு. 3-ஆம் நூற்றாண்டு முதல் கி.பி. 19-ஆம் நூற்றாண்டு வரையிலான முக்கிய நிகழ்வுகள்.',
    galleryBadge: 'கல்வெட்டு & கட்டடக்கலைக் காட்சியகம்',
    galleryTitle: 'ஆவணப் புகைப்படக் காட்சியகம்',
    gallerySub: 'கல்வெட்டுகள், செப்பேடுகள், கோயில்கள் மற்றும் கோட்டைகளின் புகைப்படங்கள்.',
    statsBadge: 'ஆவணக் காப்பகப் புள்ளிவிவரம்',
    statsTitle: 'ஆவணப் பதிவுகளின் சுருக்கம்',
    catAll: 'அனைத்து காலவரிசைப் பிரிவுகள் (12)',
    catSolarAntiquity: 'I. சூரியவம்சப் பழமை & பண்டைய கலிங்க-ஒட்ர காலம் (இதிகாச காலம் – கி.மு. 1-ஆம் நூற்றாண்டு)',
    catSolarAntiquitySub:
      'இக்ஷ்வாகு சூரியவம்ச முன்னோடிகள், கலிங்கப் போர் (கி.மு. 261) மற்றும் காரவேலரின் ஹாத்திகும்பா கல்வெட்டு.',
    catOdraGajapathi: 'II. ஒட்ர தேசம் & சூரியவம்ச கஜபதி பேரரசு (7-ஆம் – 16-ஆம் நூற்றாண்டு)',
    catOdraGajapathiSub:
      'ஒட்ர தேசத்தின் புவியியல் வளர்ச்சி, கபிலேந்திர தேவ கஜபதியின் பேரரசு மற்றும் கொல்லேட்டிகோட்டா நீர்க்கோட்டை.',
    catCommunityGenealogy: 'III. சமூகப் பாரம்பரியம், பெயர்கள் & அரச வம்சாவளி (12-ஆம் நூற்றாண்டு – நிகழ்காலம்)',
    catCommunityGenealogySub:
      'ஓட்-ராஜ்புத், ஒட்ர-சத்திரிய, ஒடியராஜு/வட்டெராஜுலு வரலாறு மற்றும் கல்வெட்டு வம்சாவளி ஆய்வு முறை.',
    catEpigraphyArch: 'IV. முதன்மைக் கல்வெட்டுகள், ஓலைச்சுவடிகள் & கோயில் கட்டடக்கலை (கி.மு. 1-ஆம் நூற்றாண்டு – 1815 CE)',
    catEpigraphyArchSub:
      'செப்பேடுகள், மதலா பஞ்சி, சரஸ்வதி விலாசம் மற்றும் கலிங்க-ஒட்ர கோயில்கள் & கோட்டைகள்.',
    viewCategoryBtn: 'அனைத்தும் காண்க',
    citationsLabel: count => `${count} ஆதாரங்கள்`
  },
  mr: {
    heroMainTitle: 'सूर्यवंश ओडियाराजु क्षत्रिय',
    heroMainSubtitle: 'ऐतिहासिक डॉक्युमेंटरी आणि शाही वारसा पोर्टल',
    heroTagline:
      '२,५००+ वर्षांचे प्रमाणित शिलालेख, सूर्यवंशी गजपती साम्राज्याचा इतिहास, ओड्र-कलिंग शौर्य आणि अखिल भारतीय क्षत्रिय राजवंश वारसा.',
    exploreHeritageBtn: 'आमचा वारसा जाणून घ्या',
    watchDocumentaryBtn: 'ऐतिहासिक डॉक्युमेंटरी',
    quickAccessBadge: 'शाही वारसा निर्देशिका',
    quickAccessTitle: 'प्रमुख ऐतिहासिक विभाग (जलद प्रवेश)',
    quickAccessSub:
      'ऐतिहासिक व्यक्ती, राजवंश, ताम्रपट शिलालेख, संशोधन मोनोग्राफ आणि सामाजिक वारसा नोंदींमध्ये थेट प्रवेश.',
    journeyBadge: 'युगीन संस्कृतीची अखंड परंपरा',
    journeyTitle: 'ऐतिहासिक साम्राज्यांचा कालक्रमानुसार प्रवास',
    journeySub:
      'प्राचीन ओड्र देश आणि कलिंग साम्राज्यापासून सूर्यवंशी गजपती साम्राज्य आणि त्रिकलिंगपर्यंतचा गौरवशाली इतिहास.',
    exploreRealmBtn: 'अधिक वाचा',
    personagesBadge: 'सम्राट आणि आदि-पुरुष',
    personagesTitle: 'प्रमुख ऐतिहासिक विभूती आणि सम्राट',
    personagesSub:
      'सूर्यवंशी आदि-पुरुष, कलिंग सम्राट आणि गजपती महाराजांचे चरित्र.',
    viewBiographyBtn: 'अधिक वाचा',
    viewAllPersonagesBtn: 'सर्व चरित्रे पहा',
    showMorePersonagesBtn: total => `सर्व ${total} ऐतिहासिक विभूती पहा`,
    showLessPersonagesBtn: 'प्रमुख विभूती पहा',
    resourcesBadge: 'प्राथमिक ऐतिहासिक पुरावे',
    resourcesTitle: 'ऐतिहासिक संसाधने आणि प्राथमिक पुरावे',
    resourcesSub:
      'ऐतिहासिक नकाशे, ताम्रपट शिलालेख, संशोधन संदर्भ आणि पीडीएफ डाउनलोड.',
    articlesBadge: 'कालक्रमानुसार व वर्गीकृत संशोधन लेख',
    articlesTitle: 'ऐतिहासिक लेख आणि डॉक्युमेंटरी मोनोग्राफ',
    articlesSub:
      'सूर्यवंश प्राचीनता आणि ओड्र-कलिंगपासून गजपती साम्राज्य व सामाजिक वारशापर्यंत कालक्रमानुसार मांडलेले संपूर्ण संशोधन लेख.',
    readArticleBtn: 'अधिक वाचा',
    quickAbstractBtn: 'संक्षिप्त सारांश',
    viewAllArticlesBtn: 'सर्व मोनोग्राफ पहा',
    showAllArticlesBtn: count => `सर्व ${count} लेख पहा`,
    showCompactArticlesBtn: 'संक्षिप्त दृश्य',
    timelineBadge: 'कालक्रमानुसार विकास',
    timelineTitle: 'ऐतिहासिक कालक्रम (टाईमलाईन)',
    timelineSub: 'इ.स.पू. ३ रे शतक ते इ.स. १९ व्या शतकापर्यंतच्या प्रमुख ऐतिहासिक घडामोडी.',
    galleryBadge: 'शिलालेख आणि स्थापत्य गॅलरी',
    galleryTitle: 'अभिलेखीय चित्र गॅलरी',
    gallerySub: 'शिलालेख, ताम्रपट, मंदिरे आणि किल्ल्यांची प्रमाणित छायाचित्रे.',
    statsBadge: 'प्रमाणित आकडेवारी',
    statsTitle: 'अभिलेखागार दस्तऐवज आढावा',
    catAll: 'सर्व कालक्रमानुसार विभाग (12)',
    catSolarAntiquity: 'I. सूर्यवंश प्राचीनता व कलिंग-ओड्र युग (महाकाव्य काळ – इ.स.पू. १ ले शतक)',
    catSolarAntiquitySub:
      'इक्ष्वाकू सूर्यवंशी आदि-पुरुष, कलिंग युद्ध (इ.स.पू. २६१) आणि सम्राट खारवेल याचा हाथीगुम्फा शिलालेख.',
    catOdraGajapathi: 'II. ओड्र देश व सूर्यवंशी गजपती साम्राज्य (७ वे – १६ वे शतक)',
    catOdraGajapathiSub:
      'ओड्र देशाचा भौगोलिक विकास, सम्राट कपिलेंद्र देव गजपतींचे साम्राज्य आणि कोल्लेटीकोटा जलदुर्ग.',
    catCommunityGenealogy: 'III. सामाजिक वारसा, आडनावे व राजवंशावळ (१२ वे शतक – वर्तमान)',
    catCommunityGenealogySub:
      'ओड-राजपूत, ओड्र-क्षत्रिय, ओडियाराजु/वड्डेराजुलू इतिहास आणि शिलालेखीय वंशावळ पद्धती.',
    catEpigraphyArch: 'IV. प्राथमिक शिलालेख, हस्तलिखिते व मंदिर स्थापत्य (इ.स.पू. १ ले शतक – १८१५ इ.स.)',
    catEpigraphyArchSub:
      'ताम्रपट शिलालेख, मादला पंजी, सरस्वती विलास आणि कलिंग-ओड्र मंदिरे व किल्ले.',
    viewCategoryBtn: 'सर्व पहा',
    citationsLabel: count => `${count} संदर्भ`
  },
  or: {
    heroMainTitle: 'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ',
    heroMainSubtitle: 'ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ ଓ ରାଜକୀୟ ଐତିହ୍ୟ ପୋର୍ଟାଲ୍',
    heroTagline:
      '୨,୫୦୦+ ବର୍ଷର ପ୍ରମାଣିତ ଶିଳାଲେଖ, ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ ଇତିହାସ, ଓଡ଼୍ର-କଳିଙ୍ଗ ଶୌର୍ଯ୍ୟ ଏବଂ ରାଜବଂଶ ଐତିହ୍ୟର ପ୍ରାମାଣିକ ଅଭିଲେଖାଗାର।',
    exploreHeritageBtn: 'ଆମ ଐତିହ୍ୟ ଅନ୍ୱେଷଣ କରନ୍ତୁ',
    watchDocumentaryBtn: 'ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ',
    quickAccessBadge: 'ରାଜକୀୟ ଐତିହ୍ୟ ନିର୍ଦ୍ଦେଶିକା',
    quickAccessTitle: 'ପ୍ରମୁଖ ଐତିହ୍ୟ ବିଭାଗ (ତ୍ୱରିତ ପ୍ରବେଶ)',
    quickAccessSub:
      'ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ, ରାଜବଂଶ, ତାମ୍ରଶାସନ, ଗବେଷଣା ମୋନୋଗ୍ରାଫ୍ ଏବଂ ସାମୁଦାୟିକ ଐତିହ୍ୟ ରେକର୍ଡକୁ ସିଧାସଳଖ ପ୍ରବେଶ।',
    journeyBadge: 'ଯୁଗଯୁଗର ସଭ୍ୟତାଗତ ଧାରା',
    journeyTitle: 'ଐତିହାସିକ ସାମ୍ରାଜ୍ୟର କାଳାନୁକ୍ରମିକ ଯାତ୍ରା',
    journeySub:
      'ପ୍ରାଚୀନ ଓଡ଼୍ର ଦେଶ ଓ କଳିଙ୍ଗ ସାମ୍ରାଜ୍ୟରୁ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ ଏବଂ ତ୍ରିକଳିଙ୍ଗ ପର୍ଯ୍ୟନ୍ତ ଅବିଚ୍ଛିନ୍ନ ଇତିହାସ।',
    exploreRealmBtn: 'ଅଧିକ ପଢ଼ନ୍ତୁ',
    personagesBadge: 'ସମ୍ରାଟ ଓ ଆଦି-ପୁରୁଷ',
    personagesTitle: 'ପ୍ରମୁଖ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ ଓ ସମ୍ରାଟ',
    personagesSub:
      'ସୂର୍ଯ୍ୟବଂଶୀ ଆଦି-ପୁରୁଷ, କଳିଙ୍ଗ ସମ୍ରାଟ ଏବଂ ଗଜପତି ମହାରାଜାମାନଙ୍କ ଜୀବନୀ।',
    viewBiographyBtn: 'ଅଧିକ ପଢ଼ନ୍ତୁ',
    viewAllPersonagesBtn: 'ସମସ୍ତ ଜୀବନୀ ଦେଖନ୍ତୁ',
    showMorePersonagesBtn: total => `ସମସ୍ତ ${total} ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ ଦେଖନ୍ତୁ`,
    showLessPersonagesBtn: 'ସଂକ୍ଷିପ୍ତ ତାଲିକା ଦେଖନ୍ତୁ',
    resourcesBadge: 'ପ୍ରାଥମିକ ଅଭିଲେଖୀୟ ପ୍ରମାଣ',
    resourcesTitle: 'ଐତିହାସିକ ସମ୍ବଳ ଓ ପ୍ରାଥମିକ ପ୍ରମାଣ',
    resourcesSub:
      'ଐତିହାସିକ ମାନଚିତ୍ର, ତାମ୍ରଶାସନ, ଗବେଷଣା ଉତ୍ସ ଏବଂ ପିଡିଏଫ୍ ଡାଉନଲୋଡ୍।',
    articlesBadge: 'କାଳାନୁକ୍ରମିକ ଓ ବର୍ଗୀକୃତ ପ୍ରବନ୍ଧ',
    articlesTitle: 'ଐତିହାସିକ ପ୍ରବନ୍ଧ ଓ ଡକ୍ୟୁମେଣ୍ଟାରୀ ମୋନୋଗ୍ରାଫ୍',
    articlesSub:
      'ସୂର୍ଯ୍ୟବଂଶ ପ୍ରାଚୀନତା ଓ ଓଡ଼୍ର-କଳିଙ୍ଗଠାରୁ ଗଜପତି ସାମ୍ରାଜ୍ୟ ଓ ସାମୁଦାୟିକ ଐତିହ୍ୟ ପର୍ଯ୍ୟନ୍ତ କାଳାନୁକ୍ରମିକ ଭାବେ ସଜ୍ଜିତ ସମ୍ପୂର୍ଣ୍ଣ ଗବେଷଣା ପ୍ରବନ୍ଧ।',
    readArticleBtn: 'ଅଧିକ ପଢ଼ନ୍ତୁ',
    quickAbstractBtn: 'ସଂକ୍ଷିପ୍ତ ସାରାଂଶ',
    viewAllArticlesBtn: 'ସମସ୍ତ ମୋନୋଗ୍ରାଫ୍ ଦେଖନ୍ତୁ',
    showAllArticlesBtn: count => `ସମସ୍ତ ${count} ପ୍ରବନ୍ଧ ଦେଖନ୍ତୁ`,
    showCompactArticlesBtn: 'ସଂକ୍ଷିପ୍ତ ଦୃଶ୍ୟ',
    timelineBadge: 'କାଳାନୁକ୍ରମିକ ବିକାଶ',
    timelineTitle: 'ଐତିହାସିକ ସମୟରେଖା (ଟାଇମଲାଇନ୍)',
    timelineSub: 'ଖ୍ରୀ.ପୂ. ୩ୟ ଶତାବ୍ଦୀରୁ ଖ୍ରୀ.ଅ. ୧୯ଶ ଶତାବ୍ଦୀ ପର୍ଯ୍ୟନ୍ତ ପ୍ରମୁଖ ଐତିହାସିକ ଘଟଣାବଳୀ।',
    galleryBadge: 'ଶିଳାଲେଖ ଓ ସ୍ଥାପତ୍ୟ ଗ୍ୟାଲେରୀ',
    galleryTitle: 'ଅଭିଲେଖୀୟ ଚିତ୍ର ଗ୍ୟାଲେରୀ',
    gallerySub: 'ଶିଳାଲେଖ, ତାମ୍ରଶାସନ, ମନ୍ଦିର ଓ ଦୁର୍ଗଗୁଡ଼ିକର ପ୍ରମାଣିତ ଫଟୋଚିତ୍ର।',
    statsBadge: 'ପ୍ରମାଣିତ ପରିସଂଖ୍ୟାନ',
    statsTitle: 'ଅଭିଲେଖାଗାର ଦସ୍ତାବିଜ ସାରାଂଶ',
    catAll: 'ସମସ୍ତ କାଳାନୁକ୍ରମିକ ବିଭାଗ (12)',
    catSolarAntiquity: 'I. ସୂର୍ଯ୍ୟବଂଶ ପ୍ରାଚୀନତା ଓ କଳିଙ୍ଗ-ଓଡ଼୍ର ଯୁଗ (ମହାକାବ୍ୟ କାଳ – ଖ୍ରୀ.ପୂ. ୧ମ ଶତାବ୍ଦୀ)',
    catSolarAntiquitySub:
      'ଇକ୍ଷ୍ୱାକୁ ସୂର୍ଯ୍ୟବଂଶୀ ଆଦି-ପୁରୁଷ, ମହାନ କଳିଙ୍ଗ ଯୁଦ୍ଧ (ଖ୍ରୀ.ପୂ. ୨୬୧) ଓ ସମ୍ରାଟ ଖାରବେଳଙ୍କ ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖ।',
    catOdraGajapathi: 'II. ଓଡ଼୍ର ଦେଶ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ (୭ମ – ୧୬ଶ ଶତାବ୍ଦୀ)',
    catOdraGajapathiSub:
      'ଓଡ଼୍ର ଦେଶର ଭୌଗୋଳିକ ବିକାଶ, ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ଗଜପତିଙ୍କ ସାମ୍ରାଜ୍ୟ ଓ କୋଲ୍ଲେଟିକୋଟା ଜଳଦୁର୍ଗ।',
    catCommunityGenealogy: 'III. ସାମୁଦାୟିକ ଐତିହ୍ୟ, ଉପନାମ ଓ ରାଜବଂଶାବଳୀ (୧୨ଶ ଶତାବ୍ଦୀ – ବର୍ତ୍ତମାନ)',
    catCommunityGenealogySub:
      'ଓଡ଼-ରାଜପୁତ, ଓଡ଼୍ର-କ୍ଷତ୍ରିୟ, ଓଡ଼ିଆରାଜୁ/ଭଡ଼େରାଜୁଲୁ ଇତିହାସ ଓ ଶିଳାଲେଖ ଆଧାରିତ ବଂଶାବଳୀ ପଦ୍ଧତି।',
    catEpigraphyArch: 'IV. ପ୍ରାଥମିକ ଶିଳାଲେଖ, ତାଳପତ୍ର ପୋଥି ଓ ମନ୍ଦିର ସ୍ଥାପତ୍ୟ (ଖ୍ରୀ.ପୂ. ୧ମ ଶତାବ୍ଦୀ – ୧୮୧୫ ଖ୍ରୀ.ଅ.)',
    catEpigraphyArchSub:
      'ତାମ୍ରଶାସନ, ମାଦଳା ପାଞ୍ଜି, ସରସ୍ୱତୀ ବିଳାସ ଓ କଳିଙ୍ଗ-ଓଡ଼୍ର ମନ୍ଦିର ଏବଂ ଦୁର୍ଗ।',
    viewCategoryBtn: 'ସମସ୍ତ ଦେଖନ୍ତୁ',
    citationsLabel: count => `${count} ପ୍ରମାଣ`
  },
  bn: {
    heroMainTitle: 'সূর্যবংশ ওড়িয়ারাজু ক্ষত্রিয়',
    heroMainSubtitle: 'ঐতিহাসিক ডকুমেন্টারি ও রাজকীয় ঐতিহ্য পোর্টাল',
    heroTagline:
      '২,৫০০+ বছরের প্রত্যয়িত শিলালিপি, সূর্যবংশীয় গজপতি সাম্রাজ্যের ইতিহাস, ওড্র-কলিঙ্গ শৌর্য এবং রাজবংশীয় ঐতিহ্যের প্রামাণ্য আর্কাইভ।',
    exploreHeritageBtn: 'আমাদের ঐতিহ্য অন্বেষণ করুন',
    watchDocumentaryBtn: 'ঐতিহাসিক ডকুমেন্টারি',
    quickAccessBadge: 'রাজকীয় ঐতিহ্য নির্দেশিকা',
    quickAccessTitle: 'প্রধান ঐতিহ্য বিভাগসমূহ (দ্রুত প্রবেশ)',
    quickAccessSub:
      'ঐতিহাসিক ব্যক্তিত্ব, রাজবংশ, তাম্রশাসন, গবেষণা মনোগ্রাফ এবং সম্প্রদায়ের ঐতিহ্য নথিতে সরাসরি প্রবেশ।',
    journeyBadge: 'যুগান্তকারী সভ্যতার ধারাবাহিকতা',
    journeyTitle: 'ঐতিহাসিক সাম্রাজ্যের কালানুক্রমিক যাত্রা',
    journeySub:
      'প্রাচীন ওড্র দেশ ও কলিঙ্গ সাম্রাজ্য থেকে সূর্যবংশীয় গজপতি সাম্রাজ্য এবং ত্রিকলিঙ্গ পর্যন্ত অবিচ্ছিন্ন ইতিহাস।',
    exploreRealmBtn: 'আরও পড়ুন',
    personagesBadge: 'সম্রাট ও আদি-পুরুষ',
    personagesTitle: 'বিশিষ্ট ঐতিহাসিক ব্যক্তিত্ব ও সম্রাটগণ',
    personagesSub:
      'সূর্যবংশীয় আদি-পুরুষ, কলিঙ্গ সম্রাট এবং গজপতি মহারাজাদের জীবনী।',
    viewBiographyBtn: 'আরও পড়ুন',
    viewAllPersonagesBtn: 'সব জীবনী দেখুন',
    showMorePersonagesBtn: total => `সকল ${total} ঐতিহাসিক ব্যক্তিত্ব দেখুন`,
    showLessPersonagesBtn: 'সংক্ষিপ্ত তালিকা দেখুন',
    resourcesBadge: 'প্রাথমিক আর্কাইভাল প্রমাণ',
    resourcesTitle: 'ঐতিহাসিক সম্পদ ও প্রাথমিক প্রমাণ',
    resourcesSub:
      'ঐতিহাসিক মানচিত্র, তাম্রশাসন, গবেষণা সূত্র এবং পিডিএফ ডাউনলোড।',
    articlesBadge: 'কালানুক্রমিক ও বিভাগীয় গবেষণা প্রবন্ধ',
    articlesTitle: 'ঐতিহাসিক প্রবন্ধ ও ডকুমেন্টারি মনোগ্রাফ',
    articlesSub:
      'সূর্যবংশের প্রাচীনত্ব ও ওড্র-কলিঙ্গ থেকে গজপতি সাম্রাজ্য এবং সম্প্রদায়গত ঐতিহ্য পর্যন্ত কালানুক্রমিকভাবে সাজানো সম্পূর্ণ গবেষণা প্রবন্ধ।',
    readArticleBtn: 'আরও পড়ুন',
    quickAbstractBtn: 'সংক্ষিপ্ত সারাংশ',
    viewAllArticlesBtn: 'সব মনোগ্রাফ দেখুন',
    showAllArticlesBtn: count => `সকল ${count}টি প্রবন্ধ দেখুন`,
    showCompactArticlesBtn: 'সংক্ষিপ্ত দৃশ্য',
    timelineBadge: 'কালানুক্রমিক বিকাশ',
    timelineTitle: 'ঐতিহাসিক কালরেখা (টাইমলাইন)',
    timelineSub: 'খ্রিস্টপূর্ব ৩য় শতাব্দী থেকে ১৯শ শতাব্দী পর্যন্ত প্রধান ঐতিহাসিক ঘটনাবলী।',
    galleryBadge: 'শিলালিপি ও স্থাপত্য গ্যালারি',
    galleryTitle: 'আর্কাইভাল চিত্র গ্যালারি',
    gallerySub: 'শিলালিপি, তাম্রশাসন, মন্দির ও দুর্গের প্রত্যয়িত আলোকচিত্র।',
    statsBadge: 'প্রত্যয়িত পরিসংখ্যান',
    statsTitle: 'আর্কাইভাল নথিপত্রের সংক্ষিপ্তসার',
    catAll: 'সকল কালানুক্রমিক বিভাগ (12)',
    catSolarAntiquity: 'I. সূর্যবংশ প্রাচীনত্ব ও কলিঙ্গ-ওড্র যুগ (মহাকাব্য কাল – খ্রি.পূ. ১ম শতাব্দী)',
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

export interface HeroBannerSectionProps {
  ui: (typeof HOME_UI)['en'];
  heroSlides: HeroSlideData[];
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  searchBarLabel: string;
  suryavamshaBadgeLabel: string;
}

export const HeroBannerSection: React.FC<HeroBannerSectionProps> = React.memo(
  ({ ui, heroSlides, onNavigate, onOpenSearch, searchBarLabel, suryavamshaBadgeLabel }) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const currentSlide = heroSlides[activeSlideIndex] || heroSlides[0];
    const isPrimaryRoyalHero = activeSlideIndex === 0;

    return (
      <section className="relative overflow-hidden bg-[#07132B] text-[#FFFCF5] border-b-2 border-[#D4AF37]">
        {/* Main Royal Hero Background Image with Responsive Positioning & Subtle Dark Readability Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={ROYAL_HERO_BANNER_IMG}
            onError={e => {
              const target = e.currentTarget;
              if (target.src !== ROYAL_HERO_BANNER_AISTUDIO_IMG) {
                target.src = ROYAL_HERO_BANNER_AISTUDIO_IMG;
              }
            }}
            alt=""
            aria-hidden="true"
            width={1024}
            height={1536}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-[center_18%] lg:object-[78%_20%] opacity-35 sm:opacity-40 lg:opacity-45 scale-[1.01]"
          />
          {/* Subtle Dark Royal Navy & Antique Gold Overlay for Crisp Title Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07132B]/88 via-[#0B1B3D]/82 to-[#07132B]/94 lg:bg-gradient-to-r lg:from-[#07132B]/94 lg:via-[#0B1B3D]/84 lg:to-[#07132B]/68" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(212,175,55,0.16),transparent_55%),radial-gradient(circle_at_80%_75%,rgba(118,45,53,0.24),transparent_55%)]" />
        </div>

        {/* Ornamental Top Gold Arch Frame */}
        <div
          className="h-1.5 w-full relative z-10"
          style={{
            background:
              'linear-gradient(90deg, #0B1B3D 0%, #D4AF37 20%, #FFF3C4 50%, #D4AF37 80%, #0B1B3D 100%)'
          }}
        />

        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 pb-8 sm:py-10 lg:py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 items-center">
            {/* Left Column on Desktop / Second on Mobile: Royal Sun Crest, Main Identity, CTAs */}
            <div className="order-2 lg:order-1 lg:col-span-6 space-y-3.5 sm:space-y-5 text-center lg:text-left min-w-0">
              {/* Royal Suryavamsha Badge */}
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 py-1.5 rounded-2xl bg-[#132C5E]/90 border border-[#D4AF37]/70 text-[#F5E1A4] text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.16em] leading-[1.4] shadow-md max-w-full break-words">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="break-words">{suryavamshaBadgeLabel}</span>
              </div>

              {/* Main Portal Title & Subtitle */}
              <div className="space-y-2 min-w-0">
                <h1 className="text-xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-[1.35] sm:leading-[1.2] py-0.5 text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7DF] via-[#F5E1A4] to-[#D4AF37] drop-shadow-sm break-words">
                  {ui.heroMainTitle}
                </h1>
                <p className="text-sm sm:text-xl lg:text-2xl font-serif font-semibold text-[#F5E1A4] tracking-wide leading-[1.4] break-words">
                  {ui.heroMainSubtitle}
                </p>
              </div>

              {/* Subtitle Description */}
              <p className="text-xs sm:text-sm lg:text-base text-[#E5DEC9]/95 leading-relaxed max-w-2xl mx-auto lg:mx-0 break-words">
                {ui.heroTagline}
              </p>

              {/* Prominent CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
                <button
                  onClick={() => onNavigate('/community-heritage')}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E6C65A] to-[#C4962C] text-[#0B1B3D] font-serif font-bold text-xs sm:text-base tracking-wide leading-[1.4] shadow-[0_6px_25px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all cursor-pointer border border-[#FFF3C4] max-w-full"
                >
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B1B3D] shrink-0" />
                  <span className="break-words">{ui.exploreHeritageBtn}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  onClick={() => onNavigate('/documentary')}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-[#762D35] hover:bg-[#8E3740] text-[#FFF8E7] font-serif font-bold text-xs sm:text-base tracking-wide leading-[1.4] border border-[#D4AF37]/80 shadow-md transition-all cursor-pointer max-w-full"
                >
                  <BookOpen className="w-4 h-4 text-[#F5E1A4] shrink-0" />
                  <span className="break-words">{ui.watchDocumentaryBtn}</span>
                </button>
              </div>

              {/* Search Bar Shortcut */}
              <div className="pt-1 max-w-xl mx-auto lg:mx-0 w-full min-w-0">
                <button
                  onClick={onOpenSearch}
                  className="w-full min-w-0 flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#07132B]/85 hover:bg-[#07132B] border border-[#D4AF37]/50 text-left text-xs sm:text-sm leading-[1.4] text-[#E5DEC9] transition-all cursor-pointer group shadow-inner"
                >
                  <span className="flex items-center gap-2 min-w-0 flex-1">
                    <Search className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="truncate leading-[1.4]">{searchBarLabel}</span>
                  </span>
                  <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-[#132C5E] text-[#F5E1A4] rounded border border-[#D4AF37]/40 shrink-0">
                    ⌘K
                  </kbd>
                </button>
              </div>
            </div>

            {/* Right Column on Desktop / Top Showcase on Mobile: Uncropped Royal Hero Banner */}
            <div className="order-1 lg:order-2 lg:col-span-6">
              <div className="relative rounded-2xl p-1.5 bg-gradient-to-br from-[#D4AF37] via-[#8C6516] to-[#D4AF37] shadow-[0_18px_50px_rgba(0,0,0,0.65)] max-w-lg mx-auto lg:max-w-none">
                <div className="relative rounded-xl overflow-hidden bg-[#07132B] flex flex-col">
                  {/* Uncropped Artwork Viewport: preserves the raised sword, king, white horse, royal fort, and Kalinga temple on both mobile and desktop */}
                  <div
                    className={
                      isPrimaryRoyalHero
                        ? 'relative w-full aspect-[2/3] max-h-[520px] sm:max-h-[580px] lg:max-h-[620px] bg-[#07132B] overflow-hidden flex items-center justify-center'
                        : 'relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#07132B] overflow-hidden'
                    }
                  >
                    {isPrimaryRoyalHero ? (
                      <>
                        {/* Ambient side-fill for wider desktop containers so the full 2:3 artwork is never cropped */}
                        <img
                          src={ROYAL_HERO_BANNER_IMG}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover object-center blur-md opacity-40 scale-105 pointer-events-none"
                        />
                        {/* Exact Uploaded Royal Hero Banner Image — 100% Uncropped (King, White Horse, Raised Sword, Fort & Temple fully visible) */}
                        <img
                          key="royal-hero-banner-main"
                          src={ROYAL_HERO_BANNER_IMG}
                          onError={e => {
                            const target = e.currentTarget;
                            if (target.src !== ROYAL_HERO_BANNER_AISTUDIO_IMG) {
                              target.src = ROYAL_HERO_BANNER_AISTUDIO_IMG;
                            }
                          }}
                          alt={currentSlide.title}
                          width={1024}
                          height={1536}
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                          className="relative z-10 w-full h-full object-contain object-top transition-all duration-500"
                        />
                        {/* Subtle bottom vignette that never obscures the horse, sword, king, fort, or temple */}
                        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#07132B] via-[#07132B]/40 to-transparent z-20 pointer-events-none" />
                      </>
                    ) : (
                      <>
                        <ArchivalImage
                          key={currentSlide.id}
                          src={currentSlide.image}
                          alt={currentSlide.title}
                          variant="hero"
                          width={960}
                          height={540}
                          priority={false}
                          className="w-full h-full object-cover object-center transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07132B] via-[#07132B]/25 to-transparent pointer-events-none" />
                      </>
                    )}
                  </div>

                  {/* Dedicated Royal Navy & Antique Gold Caption Footer (Placed below the artwork so no badges or text ever crop or cover the sword, king, horse, fort, or temple) */}
                  <div className="relative z-20 bg-gradient-to-b from-[#07132B] to-[#0B1B3D] border-t border-[#D4AF37]/45 px-3 py-3 sm:px-5 sm:py-4 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2 flex-wrap mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#132C5E] border border-[#D4AF37]/80 text-[#F5E1A4] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider leading-[1.4] max-w-full break-words">
                        {currentSlide.badge}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#07132B] border border-[#D4AF37]/45 text-[#E5DEC9] text-[10px] font-medium leading-[1.35]">
                          {currentSlide.sourceTypeBadge}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#762D35] border border-[#D4AF37]/65 text-[#FFF8E7] text-[10px] sm:text-[11px] font-semibold leading-[1.35]">
                          {currentSlide.era}
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] leading-[1.4] break-words">
                      {currentSlide.subtitle}
                    </p>
                    <h2 className="text-sm sm:text-lg font-serif font-bold text-[#FFFCF5] leading-[1.4] mt-0.5 break-words">
                      {currentSlide.title}
                    </h2>
                    <p className="text-xs text-[#E5DEC9]/90 leading-[1.45] line-clamp-2 mt-1 break-words">
                      {currentSlide.caption}
                    </p>

                    <div className="flex items-center justify-between gap-2 flex-wrap mt-3 pt-2.5 border-t border-[#D4AF37]/30">
                      {/* Slide Indicators */}
                      <div className="flex items-center gap-1.5">
                        {heroSlides.map((s, idx) => (
                          <button
                            key={s.id}
                            onClick={() => setActiveSlideIndex(idx)}
                            aria-label={`Slide ${idx + 1}`}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              idx === activeSlideIndex
                                ? 'w-6 sm:w-7 bg-[#D4AF37]'
                                : 'w-2 bg-white/40 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
                        <button
                          onClick={() =>
                            setActiveSlideIndex(
                              prev => (prev - 1 + heroSlides.length) % heroSlides.length
                            )
                          }
                          aria-label="Previous slide"
                          className="p-1.5 rounded-lg bg-[#0B1B3D]/90 hover:bg-[#D4AF37] text-[#F5E1A4] hover:text-[#0B1B3D] border border-[#D4AF37]/50 transition-colors cursor-pointer shrink-0"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setActiveSlideIndex(prev => (prev + 1) % heroSlides.length)
                          }
                          aria-label="Next slide"
                          className="p-1.5 rounded-lg bg-[#0B1B3D]/90 hover:bg-[#D4AF37] text-[#F5E1A4] hover:text-[#0B1B3D] border border-[#D4AF37]/50 transition-colors cursor-pointer shrink-0"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onNavigate(currentSlide.link)}
                          className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#0B1B3D] font-bold text-[11px] sm:text-xs leading-[1.4] hover:bg-[#F5E1A4] transition-colors cursor-pointer"
                        >
                          <span className="break-words">{ui.readArticleBtn}</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

HeroBannerSection.displayName = 'HeroBannerSection';

export interface ChronologicalArticleCardProps {
  item: HomepageCuratedArticleItem;
  readMoreLabel: string;
  citationsLabel: string;
  onNavigate: (path: string) => void;
}

export const ChronologicalArticleCard: React.FC<ChronologicalArticleCardProps> = React.memo(
  ({ item, readMoreLabel, citationsLabel, onNavigate }) => {
    return (
      <article
        onClick={() => onNavigate(item.targetPath)}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onNavigate(item.targetPath);
          }
        }}
        className="group rounded-2xl p-[1.5px] bg-gradient-to-b from-[#D4AF37] via-[#C89D32]/75 to-[#0B1B3D]/55 shadow-md hover:shadow-[0_12px_32px_rgba(11,27,61,0.24)] transition-all duration-300 cursor-pointer flex flex-col h-full"
      >
        <div className="bg-[#FFFCF5] hover:bg-[#FFF9EB] rounded-[15px] overflow-hidden flex flex-col justify-between h-full transition-colors">
          <div>
            {/* Rich Historical Thumbnail Banner */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0B1B3D] border-b border-[#D4AF37]/50">
              <ArchivalImage
                src={item.thumbnail}
                alt={item.title}
                variant="card"
                width={560}
                height={315}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/90 via-[#0B1B3D]/20 to-transparent" />
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-[#0B1B3D]/95 border border-[#D4AF37] text-[#F5E1A4] text-[10px] font-serif font-bold leading-[1.35] shrink-0">
                  #{String(item.chronologicalOrder).padStart(2, '0')}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#0B1B3D]/90 border border-[#D4AF37]/75 text-[#FFF8E7] text-[10px] font-bold uppercase tracking-wider leading-[1.35] max-w-full break-words">
                  {item.categoryLabel}
                </span>
              </div>
              <span className="absolute bottom-2 right-2.5 px-2.5 py-0.5 rounded-full bg-[#762D35]/95 border border-[#D4AF37]/60 text-[#FFF8E7] text-[10px] font-semibold leading-[1.35]">
                {item.eraBadge}
              </span>
            </div>

            {/* Card Content: Complete Title + Summary */}
            <div className="p-4 sm:p-5 space-y-2 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <EvidenceBadge category={item.evidenceCategory} size="sm" />
                <span className="text-[10px] font-semibold text-[#6B5948] leading-[1.4]">
                  {item.authorName}
                </span>
              </div>

              {/* Complete Article Title - Never Truncated */}
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#0B1B3D] group-hover:text-[#762D35] transition-colors leading-[1.4] break-words">
                {item.title}
              </h3>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#3D3222] leading-relaxed line-clamp-2 break-words">
                {item.summary}
              </p>
            </div>
          </div>

          {/* Card Footer with Read More CTA */}
          <div className="px-4 sm:px-5 py-3 border-t border-[#D4AF37]/25 bg-[#FBF5E8]/70 flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[11px] font-medium text-[#6B5948] leading-[1.4]">
              {citationsLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B1B3D] group-hover:bg-[#762D35] text-[#F5E1A4] border border-[#D4AF37]/80 text-[11px] font-serif font-bold uppercase tracking-wider leading-[1.4] transition-colors ml-auto">
              <span>{readMoreLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    );
  }
);

ChronologicalArticleCard.displayName = 'ChronologicalArticleCard';

// ============================================================================
// TEST PAGE (/test-page) — COMPLETE MIGRATED ARCHIVE OF ALL HOMEPAGE SECTIONS
// ============================================================================
export const TestPage: React.FC<TestPageProps> = ({ onNavigate, onOpenSearch }) => {
  const { t, language, translateText, getArticleContent, getMetadataLabel } = useLanguage();
  const ui = HOME_UI[language] || HOME_UI.en;

  const [stats, setStats] = useState<SiteStatistics>(
    () => HOMEPAGE_API_CACHE[language]?.stats || CANONICAL_STATISTICS
  );
  const [allRepoArticles, setAllRepoArticles] = useState<Article[]>(
    () => HOMEPAGE_API_CACHE[language]?.articles || getAllArticles(language)
  );
  const [timelineEvents, setTimelineEvents] = useState<HistoricalEvent[]>(
    () => HOMEPAGE_API_CACHE[language]?.timeline || getCanonicalTimelineEvents(language)
  );
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(
    () => HOMEPAGE_API_CACHE[language]?.gallery || getCanonicalGallery(language).slice(0, 6)
  );

  // Category & batching state for Homepage Articles & Personages
  const [selectedArticleCategory, setSelectedArticleCategory] =
    useState<ArticleChronologicalCategoryKey>('all');
  const [showAllPersonages, setShowAllPersonages] = useState(false);

  // Lazy Modal States
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [briefModalArticle, setBriefModalArticle] = useState<Article | null>(null);
  const [detailModalItem, setDetailModalItem] = useState<ContentDetailItem | null>(null);

  const documentedFigures = useMemo(() => getAllDocumentedFigures(language), [language]);

  // Synchronize with language changes and cache API responses to prevent duplicate fetches
  useEffect(() => {
    const cached = HOMEPAGE_API_CACHE[language];
    if (cached?.articles && cached?.timeline && cached?.gallery) {
      setAllRepoArticles(cached.articles);
      setTimelineEvents(cached.timeline);
      setGalleryItems(cached.gallery);
      if (cached.stats) setStats(cached.stats);
      return;
    }

    const fallbackArticles = getAllArticles(language);
    const fallbackTimeline = getCanonicalTimelineEvents(language);
    const fallbackGallery = getCanonicalGallery(language).slice(0, 6);

    setAllRepoArticles(fallbackArticles);
    setTimelineEvents(fallbackTimeline);
    setGalleryItems(fallbackGallery);

    let isMounted = true;

    Promise.allSettled([
      fetch('/api/content/statistics').then(r => (r.ok ? r.json() : null)),
      fetch(`/api/content/articles?status=Published&lang=${language}`).then(r =>
        r.ok ? r.json() : null
      ),
      fetch(`/api/content/timeline?lang=${language}`).then(r => (r.ok ? r.json() : null)),
      fetch(`/api/content/gallery?lang=${language}`).then(r => (r.ok ? r.json() : null))
    ]).then(([statsRes, artRes, timeRes, galRes]) => {
      if (!isMounted) return;

      const nextStats =
        statsRes.status === 'fulfilled' && statsRes.value?.statistics
          ? statsRes.value.statistics
          : CANONICAL_STATISTICS;

      let nextArticles = fallbackArticles;
      if (
        artRes.status === 'fulfilled' &&
        Array.isArray(artRes.value?.articles) &&
        artRes.value.articles.length > 0
      ) {
        const byId = new Map<string, Article>();
        for (const a of fallbackArticles) byId.set(a.id, a);
        for (const dbArt of artRes.value.articles as Article[]) {
          if (!byId.has(dbArt.id)) {
            byId.set(dbArt.id, dbArt);
          }
        }
        nextArticles = Array.from(byId.values());
      }

      const nextTimeline =
        timeRes.status === 'fulfilled' &&
        Array.isArray(timeRes.value?.events) &&
        timeRes.value.events.length > 0
          ? timeRes.value.events
          : fallbackTimeline;

      const nextGallery =
        galRes.status === 'fulfilled' &&
        Array.isArray(galRes.value?.gallery) &&
        galRes.value.gallery.length > 0
          ? galRes.value.gallery.slice(0, 6)
          : fallbackGallery;

      HOMEPAGE_API_CACHE[language] = {
        stats: nextStats,
        articles: nextArticles,
        timeline: nextTimeline,
        gallery: nextGallery
      };

      setStats(nextStats);
      setAllRepoArticles(nextArticles);
      setTimelineEvents(nextTimeline);
      setGalleryItems(nextGallery);
    });

    return () => {
      isMounted = false;
    };
  }, [language]);

  // Hero Banner Slides (Model 4 Warrior, White Horse, Temple & Fort Imagery)
  const heroSlides = useMemo<HeroSlideData[]>(
    () => [
      {
        id: 'slide-royal-hero-banner',
        image: ROYAL_HERO_BANNER_IMG,
        secondaryImage: ARCHIVE_IMG('konark_sun_temple_structure.jpg'),
        badge: translateText('Imperial Suryavamsha Gajapathi'),
        era: '1434 – 1541 CE',
        sourceTypeBadge: translateText('Royal Suryavamsha Heritage Banner'),
        title: translateText('Emperor Kapilendra Deva & The Solar Empire of Odra Desha'),
        subtitle: translateText('Gajapathi Gaudesvara Navakoti Karnata Kalavargesvara'),
        caption: translateText(
          'Suryavamsha Odiyaraju Kshatriya sovereign riding the royal white steed with raised sword beneath the solar banners, royal hill fort, and Kalinga temple.'
        ),
        link: '/gajapathi-kings'
      },
      {
        id: 'slide-kanchi-white-horse',
        image: ARCHIVE_IMG('purushottama_deva_kanchi_expedition.jpg'),
        secondaryImage: ARCHIVE_IMG('puri_jagannatha_temple.jpg'),
        badge: translateText('Royal Cavalry & Sacred Chivalry'),
        era: '1466 – 1497 CE',
        sourceTypeBadge: translateText('Traditional Pattachitra & Temple Epigraphy'),
        title: translateText('Emperor Purushottama Deva & The Historic Kanchi-Kaveri Expedition'),
        subtitle: translateText('Royal White Steeds & Sacred Temple Traditions'),
        caption: translateText(
          'Documented in Draksharama and Potavaram epigraphs and immortalized in the Kanchi-Kaveri royal chronicle.'
        ),
        link: '/kings-queens?figure=fig_purushottama_deva'
      },
      {
        id: 'slide-konark-puri-temples',
        image: ARCHIVE_IMG('konark_sun_temple_structure.jpg'),
        secondaryImage: ARCHIVE_IMG('surya_konark_sculpture.jpg'),
        badge: translateText('Sacred Solar Architecture'),
        era: '12th – 16th Century CE',
        sourceTypeBadge: translateText('Verified Archaeological Photograph'),
        title: translateText('Konark Sun Chariot & Sri Jagannatha Temple of Puri'),
        subtitle: translateText('Monumental Stone Engineering & Imperial Patronage'),
        caption: translateText(
          'Colossal stone temples, chariot wheels, and royal inscriptions testifying to centuries of Suryavamsha devotion.'
        ),
        link: '/temples-monuments'
      },
      {
        id: 'slide-barabati-fortress',
        image: ARCHIVE_IMG('barabati_fort_gateway.jpg'),
        secondaryImage: ARCHIVE_IMG('kondavidu_hill_fortress.jpg'),
        badge: translateText('Impregnable Citadels & Jala-Durgas'),
        era: '1st Century BCE – 1568 CE',
        sourceTypeBadge: translateText('Verified Site Photography & Fort Archive'),
        title: translateText('Barabati Fort, Kondavidu & Kolletikota Island Fortress'),
        subtitle: translateText('Kshatriya Garrison Architecture & Defense'),
        caption: translateText(
          'From Varanasi Kataka (Barabati) to Kondavidu, Udayagiri, and Kolletikota amidst Kolleti Sarasu.'
        ),
        link: '/odra-desha'
      }
    ],
    [translateText]
  );

  // 8 Quick Access Heritage Cards (Model 4 Visual + Icon Grid)
  const quickAccessCards = useMemo(
    () => [
      {
        id: 'qa-community-heritage',
        title: t.nav.communityHeritage,
        subtitle: translateText('18 Designations • 9 Ancestral Vocations'),
        icon: Users,
        image: ARCHIVE_IMG('jasma_devi_sahasralinga.jpg'),
        path: '/community-heritage',
        accent: 'from-[#D4AF37] to-[#9E7318]'
      },
      {
        id: 'qa-personages',
        title: t.nav.documentedFigures,
        subtitle: translateText('13 Documented Monarchs & Progenitors'),
        icon: Crown,
        image: ARCHIVE_IMG('kapilendra_deva_portrait.jpg'),
        path: '/kings-queens',
        accent: 'from-[#D4AF37] to-[#9E7318]'
      },
      {
        id: 'qa-dynasties',
        title: t.nav.gajapathiKings,
        subtitle: translateText('Suryavamsha, Ganga & Chedi Lineages'),
        icon: ShieldCheck,
        image: ARCHIVE_IMG('royal_dynasties_heritage.jpg'),
        path: '/gajapathi-kings',
        accent: 'from-[#D4AF37] to-[#9E7318]'
      },
      {
        id: 'qa-monographs',
        title: t.nav.documentary,
        subtitle: translateText('Comprehensive Historical Monographs'),
        icon: BookOpen,
        image: ARCHIVE_IMG('kapilendra_deva_coronation.jpg'),
        path: '/documentary',
        accent: 'from-[#D4AF37] to-[#9E7318]'
      },
      {
        id: 'qa-records',
        title: t.nav.inscriptions,
        subtitle: translateText('Copper Plates, Stone Edicts & Grants'),
        icon: Scroll,
        image: ARCHIVE_IMG('copper_plate_charter.jpg'),
        path: '/inscriptions',
        accent: 'from-[#D4AF37] to-[#9E7318]'
      },
      {
        id: 'qa-genealogy',
        title: t.nav.genealogy,
        subtitle: translateText('Epigraphic vs. Vamsavali Lineage Tree'),
        icon: Scale,
        image: ARCHIVE_IMG('samrat_sagara_surya.jpg'),
        path: '/genealogy',
        accent: 'from-[#D4AF37] to-[#9E7318]'
      },
      {
        id: 'qa-timeline',
        title: t.nav.timeline,
        subtitle: translateText('3rd Century BCE to 19th Century CE'),
        icon: Clock,
        image: ARCHIVE_IMG('kalinga_dhauli_elephant_edict.jpg'),
        path: '/timeline',
        accent: 'from-[#D4AF37] to-[#9E7318]'
      },
      {
        id: 'qa-maps-monuments',
        title: t.nav.maps,
        subtitle: translateText('Forts, Capitals & Sacred Temples'),
        icon: Compass,
        image: ARCHIVE_IMG('gajapathi_empire_map_1465.jpg'),
        path: '/maps',
        accent: 'from-[#D4AF37] to-[#9E7318]'
      }
    ],
    [t, translateText]
  );

  // 4 Heritage Journey Cards (Distinct Visuals for Odra Desha, Kalinga, Utkala & Trikalinga)
  const heritageJourneyCards = useMemo(
    () => [
      {
        id: 'journey-odra',
        step: '01',
        title: translateText('Odra Desha (Odra Kingdom)'),
        era: translateText('Ancient Era – 16th Century CE'),
        provenanceBadge: translateText('Archival Forts & Copper Charters'),
        subtitle: translateText('Heartland of the Mahanadi-Brahmani Delta & Barabati Citadel'),
        description: translateText(
          'Recorded in classical Sanskrit texts, Xuanzang’s 7th-century chronicle (Wu-T’u), and Bhauma-Kara & Somavamshi copper-plate charters as the foundational homeland of the Odra people.'
        ),
        image: ARCHIVE_IMG('heritage_odra_desha.jpg'),
        path: '/odra-desha',
        highlights: [
          translateText('Mahanadi & Baitarani Riverine Heartland'),
          translateText('Varanasi Kataka (Barabati Fort) Capital'),
          translateText('Bhauma-Kara & Somavamshi Copper Grants')
        ]
      },
      {
        id: 'journey-kalinga',
        step: '02',
        title: translateText('Kalinga (Imperial Kalinga)'),
        era: translateText('261 BCE – 1st Century BCE'),
        provenanceBadge: translateText('Verified Rock Edicts & Cave Reliefs'),
        subtitle: translateText('Unbroken Martial Resistance & Emperor Kharavela’s Hathigumpha Edict'),
        description: translateText(
          'From the heroic defense at Dhauli in the Kalinga War (261 BCE) to Mahameghavahana Emperor Kharavela’s pan-Indian campaigns and royal canal engineering at Kalinganagari.'
        ),
        image: ARCHIVE_IMG('heritage_kalinga_empire.jpg'),
        path: '/kalinga-war',
        highlights: [
          translateText('261 BCE Kalinga War & Dhauli Elephant Edict'),
          translateText('Emperor Kharavela’s 17-Line Hathigumpha Edict'),
          translateText('Udayagiri-Khandagiri Royal Rock Complexes')
        ]
      },
      {
        id: 'journey-utkala',
        step: '03',
        title: translateText('Utkala & Suryavamsha Gajapathi'),
        era: translateText('12th – 16th Century CE'),
        provenanceBadge: translateText('Verified Temple Architecture & Sculpture'),
        subtitle: translateText('Sacred Solar Architecture & Imperial Zenith at Puri and Konark'),
        description: translateText(
          'Sacred cultural heartland encompassing Sri Jagannatha Temple at Puri and the Konark Sun Chariot, elevated by Emperor Kapilendra Deva into the sovereign center of the Suryavamsha Gajapathi Empire.'
        ),
        image: ARCHIVE_IMG('heritage_utkala_kingdom.jpg'),
        path: '/gajapathi-kings',
        highlights: [
          translateText('Sri Jagannatha Temple & Konark Sun Chariot'),
          translateText('Kapilendra, Purushottama & Prataparudra Deva'),
          translateText('Veligalani (1458) & Lingaraja (1452) Edicts')
        ]
      },
      {
        id: 'journey-trikalinga',
        step: '04',
        title: translateText('Trikalinga & Southern Citadels'),
        era: translateText('11th – 16th Century CE'),
        provenanceBadge: translateText('Verified Hill Forts & Temple Epigraphy'),
        subtitle: translateText('Unification of Utkala, Kalinga, Kongoda & Deccan Fortresses'),
        description: translateText(
          'Under Trikalingadhipati Chodaganga Deva and Gajapathi viceroys Kumara Hamvira Deva and Virabhadra Deva, royal garrisons anchored Simhachalam, Rajahmundry, Kondavidu, Udayagiri, and Kolletikota.'
        ),
        image: ARCHIVE_IMG('heritage_trikalinga_region.jpg'),
        path: '/community-heritage',
        highlights: [
          translateText('Trikalingadhipati Imperial Consolidation'),
          translateText('Simhachalam, Kondavidu & Kolletikota Garrisons'),
          translateText('Pan-Indian Odiyaraju & Odra-Kshatriya Diaspora')
        ]
      }
    ],
    [translateText]
  );

  // 4 Royal Dynasties Visual Showcase Cards
  const royalDynastiesShowcase = useMemo(
    () => [
      {
        id: 'dyn-ikshvaku-suryavamsha',
        title: translateText('Ikshvaku Suryavamsha Solar Lineage'),
        era: translateText('Vedic Antiquity & Epic Tradition'),
        monarchs: translateText('Manu • Ikshvaku • Samrat Sagara • Bhagiratha • Sri Rama'),
        description: translateText(
          'Progenitors of the Solar Kshatriya race celebrated for cosmic hydraulic engineering (Sagara-khanana) and righteous sovereignty (Dharma-rajya).'
        ),
        image: ARCHIVE_IMG('samrat_sagara_surya.jpg'),
        badge: translateText('Classical Sculpture & Tradition'),
        path: '/genealogy'
      },
      {
        id: 'dyn-mahameghavahana',
        title: translateText('Mahameghavahana Chedi-Kalinga Dynasty'),
        era: translateText('1st Century BCE'),
        monarchs: translateText('Maharaja Mahameghavahana • Kalingadhipati Emperor Kharavela'),
        description: translateText(
          'Restorers of Kalinga’s imperial sovereignty after the Mauryan war, documented in the 17-line Hathigumpha Prakrit inscription at Udayagiri.'
        ),
        image: ARCHIVE_IMG('emperor_kharavela_udayagiri.jpg'),
        badge: translateText('Verified Rock Relief'),
        path: '/kings-queens?figure=fig_kharavela'
      },
      {
        id: 'dyn-eastern-ganga',
        title: translateText('Imperial Eastern Ganga (Trikalingadhipati)'),
        era: translateText('1078 – 1434 CE'),
        monarchs: translateText('Anantavarman Chodaganga Deva • Langula Narasimha Deva I'),
        description: translateText(
          'Unifiers of Odra, Utkala, and Kalinga under the Trikalingadhipati crown and builders of the Puri Jagannatha and Konark Sun Temples.'
        ),
        image: ARCHIVE_IMG('narasimha_deva_konark_sculpture.jpg'),
        badge: translateText('British Museum Archival Sculpture'),
        path: '/kings-queens?figure=fig_narasimha_deva_i'
      },
      {
        id: 'dyn-suryavamsha-gajapathi',
        title: translateText('Suryavamsha Gajapathi Imperial Dynasty'),
        era: translateText('1434 – 1541 CE'),
        monarchs: translateText('Kapilendra Deva • Purushottama Deva • Prataparudra Deva'),
        description: translateText(
          'Supreme Solar monarchs of Odra Desha who ruled from the Hooghly River to Srirangam on the Kaveri, commanding the ninety-million realm.'
        ),
        image: ARCHIVE_IMG('royal_dynasties_heritage.jpg'),
        badge: translateText('Royal Court & Epigraphic Archive'),
        path: '/gajapathi-kings'
      }
    ],
    [translateText]
  );

  // ============================================================================
  // COMPLETE, CATEGORIZED & CHRONOLOGICALLY ORDERED ARTICLES COLLECTION
  // ============================================================================
  const curatedChronologicalArticles = useMemo<HomepageCuratedArticleItem[]>(() => {
    const byId = new Map<string, Article>();
    for (const art of allRepoArticles) {
      byId.set(art.id, art);
    }

    const getArt = (id: string) => byId.get(id);
    const getArtTitle = (a?: Article, fallback = '') =>
      (a ? getArticleContent(a).title : '') || fallback;
    const getArtSummary = (a?: Article, fallback = '') =>
      (a ? getArticleContent(a).summary : '') || fallback;

    const artSagaraRama = getArt('art_surya_vamsa_sagara_rama');
    const artEpigraphy = getArt('art_epigraphic_evolution_odra');
    const artOdraDesha = getArt('art_odra_desha_history');
    const artKapilendra = getArt('art_gajapathi_kapilendra');
    const artKolletikota = getArt('art_kolletikota_peddintlamma_lake');
    const artOadHistory = getArt('art_oad_rajputh_od_history');
    const artGenealogy = getArt('art_genealogy_methodology');

    const baseList: HomepageCuratedArticleItem[] = [
      // CATEGORY I: SOLAR LINEAGE & ANCIENT KALINGA-ODRA (EPIC ERA – 1ST CENTURY BCE)
      {
        id: 'art_surya_vamsa_sagara_rama',
        chronologicalOrder: 1,
        categoryKey: 'solar_antiquity',
        categoryLabel: translateText('Solar Lineage & Antiquity'),
        eraBadge: translateText('Vedic Epic Era – 1st Century BCE'),
        title: getArtTitle(
          artSagaraRama,
          translateText(
            'Suryavamsha Antiquity: From Samrat Sagara and Bhagiratha to Emperor Kharavela and Sri Rama'
          )
        ),
        summary: getArtSummary(
          artSagaraRama,
          translateText(
            'An exploration of the civilizational memory connecting the Solar Dynastic monarchs of the Epics with the historical epigraphy of ancient Odra Desha and living community veneration.'
          )
        ),
        thumbnail: artSagaraRama?.featured_image || ARCHIVE_IMG('surya_konark_sculpture.jpg'),
        evidenceCategory: artSagaraRama?.evidence_category || 'traditional_account',
        authorName: artSagaraRama?.author_name || 'Dr.G Sathyanarayana Raju',
        citationsCount: artSagaraRama?.sources?.length || 2,
        targetPath: '/documentary?article=art_surya_vamsa_sagara_rama',
        rawArticle: artSagaraRama
      },
      {
        id: 'curated_kalinga_war_261bce',
        chronologicalOrder: 2,
        categoryKey: 'solar_antiquity',
        categoryLabel: translateText('Ancient Kalinga & Sovereign Defense'),
        eraBadge: translateText('261 BCE • Classical Kalinga Epoch'),
        title: translateText(
          'The Great Kalinga War (261 BCE): Sovereign Resistance at Dhauli & Ashoka’s Rock Edict XIII'
        ),
        summary: translateText(
          'Documentary analysis of Kalinga-Odra’s indomitable defense along the Daya River in 261 BCE, examining Mauryan Rock Edict XIII, military organization, and civilizational resurgence.'
        ),
        thumbnail: ARCHIVE_IMG('kalinga_dhauli_shanti_stupa.jpg'),
        evidenceCategory: 'verified_archaeological',
        authorName: 'Council of Odra Historical Research',
        citationsCount: 4,
        targetPath: '/kalinga-war'
      },
      {
        id: 'art_epigraphic_evolution_odra',
        chronologicalOrder: 3,
        categoryKey: 'solar_antiquity',
        categoryLabel: translateText('Inscriptions & Paleography'),
        eraBadge: translateText('1st Century BCE – 16th Century CE'),
        title: getArtTitle(
          artEpigraphy,
          translateText(
            'Epigraphic Evolution of the Odra Identity: From Ancient Prakrit Edicts to Medieval Gajapathi Copper Plates'
          )
        ),
        summary: getArtSummary(
          artEpigraphy,
          translateText(
            'A comprehensive epigraphical treatise tracing the evolution of the Odra identity across two millennia—from Emperor Kharavela’s Hathigumpha Prakrit edict to Suryavamsha Gajapathi charters.'
          )
        ),
        thumbnail: artEpigraphy?.featured_image || ARCHIVE_IMG('hathigumpha_inscription.jpg'),
        evidenceCategory: artEpigraphy?.evidence_category || 'verified_archaeological',
        authorName:
          artEpigraphy?.author_name || 'Dr. Vikramaditya Gajapathi Raju & Council of Epigraphists',
        citationsCount: artEpigraphy?.sources?.length || 3,
        targetPath: '/documentary?article=art_epigraphic_evolution_odra',
        rawArticle: artEpigraphy
      },

      // CATEGORY II: ODRA DESHA & IMPERIAL SURYAVAMSHA GAJAPATHI ZENITH (7TH – 16TH CENTURY CE)
      {
        id: 'art_odra_desha_history',
        chronologicalOrder: 4,
        categoryKey: 'odra_gajapathi',
        categoryLabel: translateText('Odra Desha & Regional History'),
        eraBadge: translateText('639 CE – 1568 CE • Classical to Medieval Odra'),
        title: getArtTitle(
          artOdraDesha,
          translateText('The Historical Geography and Territorial Evolution of Ancient Odra Desha')
        ),
        summary: getArtSummary(
          artOdraDesha,
          translateText(
            'An empirical examination of the ancient nomenclature, territorial limits, and geopolitical transformation of Odra Desha from classical references to the medieval period.'
          )
        ),
        thumbnail: artOdraDesha?.featured_image || ARCHIVE_IMG('odra_kalinga_map.jpg'),
        evidenceCategory: artOdraDesha?.evidence_category || 'verified_archaeological',
        authorName: artOdraDesha?.author_name || 'Dr. Vikramaditya Gajapathi Raju',
        citationsCount: artOdraDesha?.sources?.length || 2,
        targetPath: '/documentary?article=art_odra_desha_history',
        rawArticle: artOdraDesha
      },
      {
        id: 'art_gajapathi_kapilendra',
        chronologicalOrder: 5,
        categoryKey: 'odra_gajapathi',
        categoryLabel: translateText('Gajapathi Kingdom & Empire'),
        eraBadge: translateText('1434 – 1466 CE • Imperial Suryavamsha Era'),
        title: getArtTitle(
          artKapilendra,
          translateText(
            'Kapilendra Deva and the Zenith of the Suryavamshi Gajapathi Empire (1434–1466 CE)'
          )
        ),
        summary: getArtSummary(
          artKapilendra,
          translateText(
            'A critical archival investigation into the accession, military reorganization, and trans-regional expansion of the founder of the Suryavamshi Gajapathi dynasty.'
          )
        ),
        thumbnail: artKapilendra?.featured_image || ARCHIVE_IMG('kapilendra_deva_lingaraja.jpg'),
        evidenceCategory: artKapilendra?.evidence_category || 'verified_archaeological',
        authorName: artKapilendra?.author_name || 'Dr. Anasuya Mohapatra-Raju',
        citationsCount: artKapilendra?.sources?.length || 2,
        targetPath: '/documentary?article=art_gajapathi_kapilendra',
        rawArticle: artKapilendra
      },
      {
        id: 'art_kolletikota_peddintlamma_lake',
        chronologicalOrder: 6,
        categoryKey: 'odra_gajapathi',
        categoryLabel: translateText('Fortress Defense & Sacred Heritage'),
        eraBadge: translateText('11th – 16th Century CE • Jala-Durga Garrison'),
        title: getArtTitle(
          artKolletikota,
          translateText(
            'Sri Kolletikota Peddintlamma Thalli & Kolleti Sarasu: The Aquatic Fortress (Jala Durga) and Sacred Royal Guardian of Coastal Andhra'
          )
        ),
        summary: getArtSummary(
          artKolletikota,
          translateText(
            'A comprehensive historical and cultural documentary on Kolleti Sarasu (Kolleru Lake), the island citadel of Kolletikota, the presiding warrior-mother deity Sri Peddintlamma Thalli, and Gajapathi-Odiyaraju military garrison defenses.'
          )
        ),
        thumbnail:
          artKolletikota?.featured_image || ARCHIVE_IMG('kolleru_wetland_sanctuary.jpg'),
        evidenceCategory: artKolletikota?.evidence_category || 'scholarly_interpretation',
        authorName:
          artKolletikota?.author_name ||
          'Historical Research Council & Coastal Andhra Epigraphy Project',
        citationsCount: artKolletikota?.sources?.length || 3,
        targetPath: '/documentary?article=art_kolletikota_peddintlamma_lake',
        rawArticle: artKolletikota
      },

      // CATEGORY III: COMMUNITY HERITAGE, SYNONYMS & ROYAL GENEALOGY (12TH CENTURY CE – PRESENT)
      {
        id: 'art_oad_rajputh_od_history',
        chronologicalOrder: 7,
        categoryKey: 'community_genealogy',
        categoryLabel: translateText('Culture & Community Heritage'),
        eraBadge: translateText('2nd Century BCE – Present • Pan-Indian Diaspora'),
        title: getArtTitle(
          artOadHistory,
          translateText(
            'History of Oad-Rajput, Od-Kshatriya & Allied Lineages: Epigraphy, Synonyms, and Geographical Spreading'
          )
        ),
        summary: getArtSummary(
          artOadHistory,
          translateText(
            'A historiographical treatise examining the roots of Oad-Rajput, Od-Kshatriya, and allied communities, documenting regional synonyms (Od, Odra, Odde, Oddar, Waddar, OddeRajulu, VaddeRajulu, Vadiyarajulu) and their pan-Indian diaspora.'
          )
        ),
        thumbnail: artOadHistory?.featured_image || ARCHIVE_IMG('oad_hydraulic_stepwell.jpg'),
        evidenceCategory: artOadHistory?.evidence_category || 'scholarly_interpretation',
        authorName:
          artOadHistory?.author_name || 'Council for Odra Historiography & Community Archives',
        citationsCount: artOadHistory?.sources?.length || 3,
        targetPath: '/documentary?article=art_oad_rajputh_od_history',
        rawArticle: artOadHistory
      },
      {
        id: 'art_genealogy_methodology',
        chronologicalOrder: 8,
        categoryKey: 'community_genealogy',
        categoryLabel: translateText('Dynasties & Royal Genealogy'),
        eraBadge: translateText('1458 CE – Present • Historiographical Methodology'),
        title: getArtTitle(
          artGenealogy,
          translateText(
            'Methodological Standards: Distinguishing Epigraphic Lineages from Traditional Vamsavalis'
          )
        ),
        summary: getArtSummary(
          artGenealogy,
          translateText(
            'Why rigorous historiography requires explicit demarcation between primary contemporary epigraphic records and post-medieval oral or traditional family Vamsavali claims.'
          )
        ),
        thumbnail: artGenealogy?.featured_image || ARCHIVE_IMG('copper_plate_charter.jpg'),
        evidenceCategory: artGenealogy?.evidence_category || 'scholarly_interpretation',
        authorName: artGenealogy?.author_name || 'Dr.G Sathyanarayana Raju',
        citationsCount: artGenealogy?.sources?.length || 2,
        targetPath: '/documentary?article=art_genealogy_methodology',
        rawArticle: artGenealogy
      },
      {
        id: 'curated_community_18_designations',
        chronologicalOrder: 9,
        categoryKey: 'community_genealogy',
        categoryLabel: translateText('Community Heritage Encyclopedia'),
        eraBadge: translateText('Classical Era – Modern Era • 70 Reference Terms'),
        title: translateText(
          'Pan-Indian Community Heritage Directory: 18 Core Designations, 9 Ancestral Vocations & Regional Surnames'
        ),
        summary: translateText(
          'Comprehensive 23-section historical encyclopedia documenting Od, Od-Rajputh, Odra-Kshatriya, Odiyaraju, VaddeRajulu, Oddar, and Waddar martial, hydraulic, and architectural legacies across India.'
        ),
        thumbnail: ARCHIVE_IMG('jasma_devi_sahasralinga.jpg'),
        evidenceCategory: 'scholarly_interpretation',
        authorName: 'Dr.G Sathyanarayana Raju & Community Archives',
        citationsCount: 18,
        targetPath: '/community-heritage'
      },

      // CATEGORY IV: PRIMARY EPIGRAPHY, MANUSCRIPTS & IMPERIAL ARCHITECTURE
      {
        id: 'curated_inscriptions_copper_plates',
        chronologicalOrder: 10,
        categoryKey: 'epigraphy_architecture',
        categoryLabel: translateText('Inscriptions & Copper Plates'),
        eraBadge: translateText('1st Century BCE – 1515 CE • Primary Epigraphy'),
        title: translateText(
          'Royal Inscriptions & Copper-Plate Charters: Hathigumpha, Korni, Lingaraja, Veligalani & Srirangam Edicts'
        ),
        summary: translateText(
          'Line-by-line archival documentation of stone inscriptions and bilingual Sanskrit-Odia-Telugu copper-plate grants issued by Emperor Kharavela, Chodaganga Deva, Kapilendra Deva, and Prataparudra Deva.'
        ),
        thumbnail: ARCHIVE_IMG('korni_copper_plate_ring.jpg'),
        evidenceCategory: 'verified_archaeological',
        authorName: 'Epigraphical Survey & Archival Council',
        citationsCount: 9,
        targetPath: '/inscriptions'
      },
      {
        id: 'curated_palm_leaf_manuscripts',
        chronologicalOrder: 11,
        categoryKey: 'epigraphy_architecture',
        categoryLabel: translateText('Historical Records & Manuscripts'),
        eraBadge: translateText('1500 – 1815 CE • Digitized Manuscripts'),
        title: translateText(
          'Digitized Palm-Leaf Chronicles & Kaifiyat Records: Madala Panji, Sarasvati Vilasa & Mackenzie Kaifiyats'
        ),
        summary: translateText(
          'Examine primary manuscript sources including the Jagannatha Temple chronicle (Madala Panji), Emperor Prataparudra Deva’s legal treatise Sarasvati Vilasa, and Colonel Colin Mackenzie’s coastal Kaifiyats.'
        ),
        thumbnail: ARCHIVE_IMG('odia_palm_leaf_manuscript.jpg'),
        evidenceCategory: 'verified_archaeological',
        authorName: 'Oriental Manuscripts & Archival Repository',
        citationsCount: 6,
        targetPath: '/documents'
      },
      {
        id: 'curated_temples_fortresses',
        chronologicalOrder: 12,
        categoryKey: 'epigraphy_architecture',
        categoryLabel: translateText('Temples, Forts & Architecture'),
        eraBadge: translateText('11th – 16th Century CE • Kalinga-Odra Monuments'),
        title: translateText(
          'Sacred Imperial Architecture & Hill Fortresses: Puri Jagannatha, Konark Sun Temple, Barabati & Kondavidu'
        ),
        summary: translateText(
          'Architectural and archaeological survey of sovereign temples and military citadels patronized and garrisoned by the Eastern Ganga and Suryavamsha Gajapathi dynasties across Odisha and Andhra.'
        ),
        thumbnail: ARCHIVE_IMG('konark_sun_temple_structure.jpg'),
        evidenceCategory: 'verified_archaeological',
        authorName: 'Dr. Anasuya Mohapatra-Raju',
        citationsCount: 8,
        targetPath: '/temples-monuments'
      }
    ];

    const coreIds = new Set(baseList.map(b => b.id));
    let extraOrder = baseList.length + 1;
    for (const extraArt of allRepoArticles) {
      if (!coreIds.has(extraArt.id)) {
        baseList.push({
          id: extraArt.id,
          chronologicalOrder: extraOrder++,
          categoryKey: 'odra_gajapathi',
          categoryLabel: extraArt.category || translateText('Historical Monograph'),
          eraBadge: extraArt.publication_date || translateText('Archival Monograph'),
          title: getArtTitle(extraArt, extraArt.original_title),
          summary: getArtSummary(extraArt, extraArt.summary),
          thumbnail: extraArt.featured_image || ARCHIVE_IMG('kapilendra_deva_lingaraja.jpg'),
          evidenceCategory: extraArt.evidence_category || 'scholarly_interpretation',
          authorName: extraArt.author_name || 'Suryavamsha Research Council',
          citationsCount: extraArt.sources?.length || 1,
          targetPath: `/documentary?article=${encodeURIComponent(extraArt.id)}`,
          rawArticle: extraArt
        });
      }
    }

    return baseList;
  }, [allRepoArticles, translateText, getArticleContent]);

  const categoryDefinitions = useMemo(
    () => [
      {
        key: 'solar_antiquity' as const,
        title: ui.catSolarAntiquity,
        subtitle: ui.catSolarAntiquitySub,
        viewAllPath: '/documentary',
        badge: translateText('Epoch I')
      },
      {
        key: 'odra_gajapathi' as const,
        title: ui.catOdraGajapathi,
        subtitle: ui.catOdraGajapathiSub,
        viewAllPath: '/gajapathi-kings',
        badge: translateText('Epoch II')
      },
      {
        key: 'community_genealogy' as const,
        title: ui.catCommunityGenealogy,
        subtitle: ui.catCommunityGenealogySub,
        viewAllPath: '/community-heritage',
        badge: translateText('Epoch III')
      },
      {
        key: 'epigraphy_architecture' as const,
        title: ui.catEpigraphyArch,
        subtitle: ui.catEpigraphyArchSub,
        viewAllPath: '/inscriptions',
        badge: translateText('Epoch IV')
      }
    ],
    [ui, translateText]
  );

  const chronologicalPersonages = useMemo<HistoricalFigure[]>(() => {
    const chronologicalIdOrder = [
      'fig_samrat_sagara',
      'fig_maharshi_bhagiratha',
      'fig_king_kharavela',
      'fig_anantavarman_chodaganga',
      'fig_goddess_jasma',
      'fig_shivayogi_siddharama',
      'fig_langula_narasimha_deva',
      'fig_kapilendra_deva',
      'fig_hamvira_deva',
      'fig_purushottama_deva',
      'fig_prataparudra_deva',
      'fig_mukunda_deva',
      'fig_baxi_jagabandhu'
    ];
    const orderMap = new Map<string, number>();
    chronologicalIdOrder.forEach((id, index) => orderMap.set(id, index));

    return [...documentedFigures].sort((a, b) => {
      const idxA = orderMap.has(a.id) ? orderMap.get(a.id)! : 999;
      const idxB = orderMap.has(b.id) ? orderMap.get(b.id)! : 999;
      return idxA - idxB;
    });
  }, [documentedFigures]);

  const displayedPersonages = useMemo(
    () => (showAllPersonages ? chronologicalPersonages : chronologicalPersonages.slice(0, 8)),
    [chronologicalPersonages, showAllPersonages]
  );

  // 4 Historical Resources Cards (Maps, Inscriptions, Research Sources, PDF Downloads)
  const resourceCards = useMemo(
    () => [
      {
        id: 'res-maps',
        title: translateText('Historical Maps & Imperial Borders'),
        badge: translateText('Cartographic Archive'),
        description: translateText(
          'Interactive territorial maps of Odra Desha, Kalinga, Trikalinga, and the 1465 CE Suryavamsha Gajapathi Empire from the Ganga to the Kaveri.'
        ),
        image: ARCHIVE_IMG('gajapathi_empire_map_1465.jpg'),
        icon: MapPin,
        path: '/maps',
        cta: translateText('Explore Historical Maps')
      },
      {
        id: 'res-inscriptions',
        title: translateText('Inscriptions & Copper-Plate Charters'),
        badge: translateText('Primary Epigraphy'),
        description: translateText(
          'Hathigumpha Prakrit rock edict, Veligalani bilingual copper plates (1458 CE), Lingaraja temple proclamation (1452 CE), and Simhachalam grants.'
        ),
        image: ARCHIVE_IMG('hathigumpha_inscription.jpg'),
        icon: Scroll,
        path: '/inscriptions',
        cta: translateText('Examine Epigraphs')
      },
      {
        id: 'res-sources',
        title: translateText('Research Sources & Palm-Leaf Chronicles'),
        badge: translateText('Bibliographic Vault'),
        description: translateText(
          'Digitized palm-leaf manuscripts (Madala Panji, Sarasvati Vilasa), Mackenzie Collection Kaifiyats, and 70+ peer-reviewed historical citations.'
        ),
        image: ARCHIVE_IMG('odia_palm_leaf_manuscript.jpg'),
        icon: FileText,
        path: '/documents',
        cta: translateText('Browse Archival Sources')
      },
      {
        id: 'res-pdfs',
        title: translateText('Direct PDF Monographs & Downloads'),
        badge: translateText('Multilingual Export'),
        description: translateText(
          'Download complete historical documentaries, royal genealogies, and community surname compendiums as formatted PDFs in all 8 languages.'
        ),
        image: ARCHIVE_IMG('copper_plate_charter.jpg'),
        icon: Download,
        path: '/documentary',
        cta: translateText('Open PDF Documentary Hub')
      }
    ],
    [translateText]
  );

  const openPersonageDetail = useCallback((fig: HistoricalFigure) => {
    setDetailModalItem({
      id: fig.id,
      title: fig.name,
      subtitle: fig.dynasty_name,
      badge: fig.reign_period,
      period: fig.reign_period,
      verificationStatus: fig.evidence_status,
      imageUrl: fig.image_url,
      summary: fig.biography,
      sections: [
        {
          heading: 'Titles & Sovereign Honours',
          items: fig.known_titles
        },
        {
          heading: 'Major Historical Milestones',
          items: fig.major_events
        },
        {
          heading: 'Historical Significance',
          content: fig.historical_significance
        }
      ],
      tags: fig.associated_places,
      sources: fig.citations.map(c => ({ title: c, verified: true })),
      actionButton: {
        label: translateText('Open Full Historical Personage Page'),
        onClick: () => {
          setDetailModalItem(null);
          onNavigate(`/kings-queens?figure=${encodeURIComponent(fig.id)}`);
        }
      }
    });
  }, [onNavigate, translateText]);

  const handleOpenBrief = useCallback((article: Article) => {
    setBriefModalArticle(article);
  }, []);

  void openPersonageDetail;
  void handleOpenBrief;

  return (
    <div className="min-h-screen bg-[#F5EBD9] text-[#1E1B18]">
      {/* Archival Migration Reference Banner for /test-page */}
      <div className="bg-[#071229] text-[#FFFCF5] border-b border-[#D4AF37]/60 px-3.5 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2.5 py-0.5 rounded-full bg-[#762D35] border border-[#D4AF37] text-[#F5E1A4] font-bold uppercase tracking-wider text-[10px] shrink-0">
              /test-page
            </span>
            <span className="text-[#E5DEC9] font-medium leading-[1.4] break-words">
              {translateText(
                'Complete Original Homepage Archive — All 9 Sections, 12+ Articles, 13 Personages, Realms, Dynasties, Timeline & Gallery Preserved'
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#D4AF37] text-[#0B1B3D] font-bold text-[11px] leading-[1.4] hover:bg-[#F5E1A4] transition-colors cursor-pointer shrink-0"
          >
            <span>{t.nav.home}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* =====================================================================
          1. HERO SECTION – ROYAL HERITAGE BANNER & SLIDER (Memoized)
      ===================================================================== */}
      <HeroBannerSection
        ui={ui}
        heroSlides={heroSlides}
        onNavigate={onNavigate}
        onOpenSearch={onOpenSearch}
        searchBarLabel={t.common.searchPlaceholder}
        suryavamshaBadgeLabel={translateText('Suryavamsha Ikshvaku • Odra-Kalinga • Gajapathi')}
      />

      {/* =====================================================================
          2. QUICK ACCESS HERITAGE PORTALS – 8 ROYAL ICON CARDS
      ===================================================================== */}
      <section className="py-10 sm:py-12 bg-[#0B1B3D] text-[#FFFCF5] border-b-2 border-[#D4AF37] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#132C5E] border border-[#D4AF37]/60 text-[#F5E1A4] text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              {ui.quickAccessBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FFF7DF] mt-2">
              {ui.quickAccessTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#E5DEC9]/85 mt-1.5">{ui.quickAccessSub}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {quickAccessCards.map(card => {
              const IconComp = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => onNavigate(card.path)}
                  className="group relative rounded-2xl p-[1.5px] bg-gradient-to-b from-[#D4AF37] via-[#9E7318] to-[#D4AF37]/50 shadow-lg hover:shadow-[0_10px_28px_rgba(212,175,55,0.28)] transition-all duration-300 text-left cursor-pointer min-w-0"
                >
                  <div className="h-full rounded-[15px] overflow-hidden bg-gradient-to-b from-[#112654] to-[#081530] flex flex-col justify-between group-hover:from-[#16316B] group-hover:to-[#0B1B3D] transition-colors min-w-0">
                    {/* Visual Archival Thumbnail Header */}
                    <div className="relative h-22 sm:h-28 w-full overflow-hidden bg-[#07132B]">
                      <ArchivalImage
                        src={card.image}
                        alt={card.title}
                        variant="thumbnail"
                        width={320}
                        height={140}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#112654] via-[#0B1B3D]/35 to-transparent" />
                      <div
                        className={`absolute bottom-2 left-2.5 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${card.accent} flex items-center justify-center text-[#0B1B3D] shadow-md border border-[#FFF3C4]/80 group-hover:scale-105 transition-transform`}
                      >
                        <IconComp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                      </div>
                      <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#07132B]/85 border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B1B3D] transition-colors">
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                    <div className="p-2.5 sm:p-4 pt-2 min-w-0">
                      <h3 className="font-serif font-bold text-xs sm:text-base text-[#FFF7DF] group-hover:text-[#F5E1A4] leading-[1.4] break-words">
                        {card.title}
                      </h3>
                      <p className="text-[10.5px] sm:text-xs text-[#C7D2E8] mt-1 leading-[1.4] line-clamp-2 break-words">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Secondary Quick Ribbons: Surnames & Prominent Persons (Unclipped Kannada/Indic text) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 mt-4 pt-4 border-t border-[#D4AF37]/25">
            <button
              onClick={() => onNavigate('/community-surnames')}
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#112654]/90 hover:bg-[#16316B] border border-[#D4AF37]/50 text-left transition-all cursor-pointer group min-w-0"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <Award className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-serif font-bold text-[#FFF7DF] leading-[1.4] break-words">
                    {t.nav.communitySurnames}
                  </div>
                  <div className="text-[11px] text-[#C7D2E8] leading-[1.4] break-words">
                    {translateText('South Indian & Deccan Royal Surnames')}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('/community-surnames-north-indian-oad-community')}
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#112654]/90 hover:bg-[#16316B] border border-[#D4AF37]/50 text-left transition-all cursor-pointer group min-w-0"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <Globe2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-serif font-bold text-[#FFF7DF] leading-[1.4] break-words">
                    {t.nav.communitySurnamesNorth}
                  </div>
                  <div className="text-[11px] text-[#C7D2E8] leading-[1.4] break-words">
                    {translateText('North & West Indian Oad-Rajput Clans')}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('/community-prominent-persons')}
              className="flex items-center justify-between gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#762D35] hover:bg-[#8E3740] border border-[#D4AF37]/70 text-left transition-all cursor-pointer group min-w-0"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <Crown className="w-5 h-5 text-[#F5E1A4] shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-serif font-bold text-[#FFF7DF] leading-[1.4] break-words">
                    {t.nav.communityProminentPersons}
                  </div>
                  <div className="text-[11px] text-[#F5E1A4] leading-[1.4] break-words">
                    {translateText('20+ Sovereign & Historical Luminaries')}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#F5E1A4] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. HERITAGE JOURNEY CARDS – ODRA DESHA, KALINGA, UTKALA, TRIKALINGA
      ===================================================================== */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#F5EBD9] to-[#EFE1C6] border-b-2 border-[#C89D32]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1B3D] text-[#F5E1A4] border border-[#D4AF37] text-[11px] font-bold uppercase tracking-widest">
                <Landmark className="w-3.5 h-3.5 text-[#D4AF37]" />
                {ui.journeyBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0B1B3D] mt-2">
                {ui.journeyTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#4A3B28] max-w-2xl mt-1">{ui.journeySub}</p>
            </div>
            <button
              onClick={() => onNavigate('/odra-desha')}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B3D] hover:bg-[#142D63] text-[#F5E1A4] border border-[#D4AF37] text-xs sm:text-sm font-serif font-bold transition-colors cursor-pointer shrink-0"
            >
              <span>{t.nav.odraDesha}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {heritageJourneyCards.map(realm => (
              <article
                key={realm.id}
                onClick={() => onNavigate(realm.path)}
                className="group rounded-2xl p-[1.5px] bg-gradient-to-b from-[#D4AF37] via-[#B38728] to-[#0B1B3D] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <div className="bg-[#FFFCF5] rounded-[15px] overflow-hidden flex flex-col flex-1 h-full justify-between">
                  <div>
                    {/* Card Image Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1B3D]">
                      <ArchivalImage
                        src={realm.image}
                        alt={realm.title}
                        variant="card"
                        width={560}
                        height={350}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/25 to-transparent" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#0B1B3D]/90 border border-[#D4AF37] text-[#F5E1A4] font-serif font-bold text-xs">
                        {realm.step}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#762D35]/95 border border-[#D4AF37]/60 text-[#FFF8E7] text-[10px] font-bold">
                        {realm.era}
                      </div>
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <span className="inline-block px-2 py-0.5 mb-1 rounded bg-[#07132B]/85 border border-[#D4AF37]/50 text-[#F5E1A4] text-[9px] font-bold uppercase tracking-wider">
                          {realm.provenanceBadge}
                        </span>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#FFF7DF] leading-snug drop-shadow">
                          {realm.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#762D35]">
                        {realm.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-[#3D3222] leading-relaxed">
                        {realm.description}
                      </p>

                      <ul className="space-y-1.5 pt-2 border-t border-[#D4AF37]/30">
                        {realm.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-[11px] font-medium text-[#0B1B3D]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#A87924] shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#D4AF37]/20 bg-[#FBF5E8]/50">
                    <span className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#0B1B3D] group-hover:text-[#762D35] transition-colors">
                      <span>{ui.exploreRealmBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3B. ROYAL DYNASTIES & SOVEREIGN HERITAGE SHOWCASE
      ===================================================================== */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#081530] via-[#0B1B3D] to-[#102552] text-[#FFFCF5] border-b-2 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#762D35] text-[#FFF8E7] border border-[#D4AF37] text-[11px] font-bold uppercase tracking-widest">
                <Crown className="w-3.5 h-3.5 text-[#F5E1A4]" />
                <span>{translateText('Sovereign Houses & Imperial Crowns')}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#FFF7DF] mt-2">
                {t.nav.gajapathiKings} & {translateText('Royal Dynasties of Odra-Kalinga')}
              </h2>
              <p className="text-xs sm:text-sm text-[#C7D2E8] max-w-3xl mt-1">
                {translateText(
                  'From the Vedic Ikshvaku Suryavamsha progenitors and Emperor Kharavela’s Chedi-Kalinga house to the Trikalingadhipati Eastern Gangas and the Suryavamsha Gajapathi Emperors.'
                )}
              </p>
            </div>
            <button
              onClick={() => onNavigate('/gajapathi-kings')}
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#0B1B3D] font-serif font-bold text-xs sm:text-sm shadow-md hover:brightness-110 transition-all cursor-pointer shrink-0"
            >
              <span>{translateText('Explore Royal Dynasties')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {royalDynastiesShowcase.map(dyn => (
              <article
                key={dyn.id}
                onClick={() => onNavigate(dyn.path)}
                className="group rounded-2xl p-[1.5px] bg-gradient-to-b from-[#D4AF37] via-[#9E7318] to-[#D4AF37]/40 shadow-xl cursor-pointer flex flex-col h-full"
              >
                <div className="bg-[#0F234C] rounded-[15px] overflow-hidden flex flex-col flex-1 justify-between h-full">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#07132B]">
                      <ArchivalImage
                        src={dyn.image}
                        alt={dyn.title}
                        variant="card"
                        width={520}
                        height={325}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F234C] via-[#0F234C]/25 to-transparent" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#07132B]/90 border border-[#D4AF37]/70 text-[#F5E1A4] text-[10px] font-bold uppercase">
                        {dyn.badge}
                      </span>
                      <span className="absolute bottom-2 right-2.5 px-2.5 py-0.5 rounded-full bg-[#762D35]/95 border border-[#D4AF37]/60 text-[#FFF8E7] text-[10px] font-semibold">
                        {dyn.era}
                      </span>
                    </div>

                    <div className="p-4 sm:p-5 space-y-2">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#FFF7DF] group-hover:text-[#F5E1A4] leading-snug">
                        {dyn.title}
                      </h3>
                      <p className="text-[11px] font-bold text-[#D4AF37]">{dyn.monarchs}</p>
                      <p className="text-xs text-[#C7D2E8] leading-relaxed">{dyn.description}</p>
                    </div>
                  </div>

                  <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#D4AF37]/25 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#F5E1A4] group-hover:text-[#D4AF37]">
                      <span>{ui.exploreRealmBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. CATEGORIZED & CHRONOLOGICAL HISTORICAL ARTICLES & MONOGRAPHS
      ===================================================================== */}
      <section className="py-12 sm:py-16 bg-[#F5EBD9] border-b-2 border-[#C89D32]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1B3D] text-[#F5E1A4] border border-[#D4AF37] text-[11px] font-bold uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                {ui.articlesBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0B1B3D] mt-2">
                {ui.articlesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#4A3B28] max-w-3xl mt-1">{ui.articlesSub}</p>
            </div>
            <button
              onClick={() => onNavigate('/documentary')}
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1B3D] hover:bg-[#142D63] text-[#F5E1A4] border border-[#D4AF37] text-xs sm:text-sm font-serif font-bold transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <span>{ui.viewAllArticlesBtn}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          {/* Interactive Chronological Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6">
            <button
              type="button"
              onClick={() => setSelectedArticleCategory('all')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-serif font-bold leading-[1.4] transition-all cursor-pointer border max-w-full text-left ${
                selectedArticleCategory === 'all'
                  ? 'bg-[#0B1B3D] text-[#F5E1A4] border-[#D4AF37] shadow-md'
                  : 'bg-[#FFFCF5] text-[#0B1B3D] border-[#D4AF37]/50 hover:bg-[#0B1B3D]/10'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="break-words">{ui.catAll}</span>
              </span>
            </button>

            {categoryDefinitions.map(cat => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedArticleCategory(cat.key)}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-serif font-bold leading-[1.4] transition-all cursor-pointer border max-w-full text-left break-words ${
                  selectedArticleCategory === cat.key
                    ? 'bg-[#762D35] text-[#FFF8E7] border-[#D4AF37] shadow-md'
                    : 'bg-[#FFFCF5] text-[#0B1B3D] border-[#D4AF37]/50 hover:bg-[#0B1B3D]/10'
                }`}
              >
                {cat.badge}
              </button>
            ))}
          </div>

          {/* Categorized & Chronological Article Groups */}
          <div className="space-y-8 sm:space-y-12">
            {categoryDefinitions
              .filter(
                cat => selectedArticleCategory === 'all' || selectedArticleCategory === cat.key
              )
              .map(cat => {
                const categoryArticles = curatedChronologicalArticles.filter(
                  item => item.categoryKey === cat.key
                );
                if (categoryArticles.length === 0) return null;

                return (
                  <div
                    key={cat.key}
                    className="rounded-2xl bg-[#FFFCF5]/80 border-2 border-[#D4AF37]/45 p-3.5 sm:p-6 lg:p-7 shadow-sm min-w-0"
                  >
                    {/* Category Header Banner with Clear Visual Separation & View All Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 sm:mb-6 border-b-2 border-[#D4AF37]/35 min-w-0">
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded bg-[#762D35] text-[#FFF8E7] text-[10px] font-bold uppercase tracking-widest leading-[1.4] border border-[#D4AF37]/60 max-w-full break-words">
                            {cat.badge}
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#A87924] leading-[1.4]">
                            {categoryArticles.length}{' '}
                            {translateText('Verified Historical Articles')}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-xl lg:text-2xl font-serif font-bold text-[#0B1B3D] leading-[1.4] break-words">
                          {cat.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#4A3B28] leading-relaxed break-words">{cat.subtitle}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onNavigate(cat.viewAllPath)}
                        className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B1B3D] hover:bg-[#762D35] text-[#F5E1A4] border border-[#D4AF37] text-xs font-serif font-bold leading-[1.4] transition-colors cursor-pointer shrink-0 max-w-full"
                      >
                        <span className="break-words">{ui.viewCategoryBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      </button>
                    </div>

                    {/* Responsive 2-Column Desktop / 1-Column Mobile Compact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
                      {categoryArticles.map(item => (
                        <ChronologicalArticleCard
                          key={item.id}
                          item={item}
                          readMoreLabel={ui.readArticleBtn}
                          citationsLabel={ui.citationsLabel(item.citationsCount)}
                          onNavigate={onNavigate}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. FEATURED HISTORICAL PERSONAGES – SOVEREIGN BIOGRAPHIES
      ===================================================================== */}
      <section className="py-12 sm:py-16 bg-[#FFFCF5] border-b-2 border-[#C89D32]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#762D35] text-[#FFF8E7] border border-[#D4AF37] text-[11px] font-bold uppercase tracking-widest">
                <Crown className="w-3.5 h-3.5 text-[#F5E1A4]" />
                {ui.personagesBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0B1B3D] mt-2">
                {ui.personagesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#4A3B28] max-w-2xl mt-1">
                {ui.personagesSub}
              </p>
            </div>
            <button
              onClick={() => onNavigate('/kings-queens')}
              className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1B3D] hover:bg-[#142D63] text-[#F5E1A4] border border-[#D4AF37] text-xs sm:text-sm font-serif font-bold transition-colors cursor-pointer shrink-0 shadow-md"
            >
              <span>{ui.viewAllPersonagesBtn}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {displayedPersonages.map(person => (
              <article
                key={person.id}
                onClick={() => onNavigate(`/kings-queens?figure=${encodeURIComponent(person.id)}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(`/kings-queens?figure=${encodeURIComponent(person.id)}`);
                  }
                }}
                className="group rounded-2xl p-[1.5px] bg-gradient-to-b from-[#D4AF37] via-[#B38728] to-[#0B1B3D] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <div className="bg-[#FBF5E8] hover:bg-[#FFF9EB] rounded-[15px] overflow-hidden flex flex-col justify-between h-full transition-colors">
                  <div>
                    {/* Portrait-Style Historical Visual Header */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#0B1B3D] border-b border-[#D4AF37]/60">
                      <ArchivalImage
                        src={person.image_url}
                        alt={person.name}
                        variant="card"
                        width={420}
                        height={315}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/90 via-[#0B1B3D]/20 to-transparent" />
                      <span className="absolute top-2.5 left-2.5 right-2.5 w-fit max-w-[90%] px-2.5 py-0.5 rounded bg-[#0B1B3D]/90 text-[#F5E1A4] border border-[#D4AF37]/75 text-[10px] font-bold uppercase tracking-wider leading-[1.35] break-words">
                        {person.dynasty_name}
                      </span>
                      <span className="absolute bottom-2 left-2.5 px-2.5 py-0.5 rounded-full bg-[#762D35]/95 border border-[#D4AF37]/60 text-[#FFF8E7] text-[10px] font-semibold leading-[1.35]">
                        {person.reign_period}
                      </span>
                    </div>

                    {/* Personage Name, Sovereign Title & Excerpt */}
                    <div className="p-4 space-y-1.5 min-w-0">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#0B1B3D] group-hover:text-[#762D35] leading-[1.4] break-words">
                        {person.name}
                      </h3>
                      {person.known_titles?.[0] && (
                        <p className="text-[11px] font-bold text-[#762D35] leading-[1.4] break-words">
                          {person.known_titles[0]}
                        </p>
                      )}
                      <p className="text-xs text-[#3D3222] leading-relaxed line-clamp-2 break-words">
                        {person.biography}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-2.5 border-t border-[#D4AF37]/25 bg-[#F5EBD9]/60 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold text-[#6B5948] leading-[1.35] break-words">
                      {getMetadataLabel('status', person.evidence_status) || person.evidence_status}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-serif font-bold leading-[1.4] text-[#762D35] group-hover:text-[#0B1B3D] shrink-0 ml-auto">
                      <span>{ui.viewBiographyBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Controlled Batch Toggle for Personages */}
          {chronologicalPersonages.length > 8 && (
            <div className="mt-7 text-center">
              <button
                type="button"
                onClick={() => setShowAllPersonages(prev => !prev)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B1B3D] hover:bg-[#762D35] text-[#F5E1A4] border border-[#D4AF37] font-serif font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
              >
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {showAllPersonages
                    ? ui.showLessPersonagesBtn
                    : ui.showMorePersonagesBtn(chronologicalPersonages.length)}
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          6. INTERACTIVE CHRONOLOGICAL TIMELINE
      ===================================================================== */}
      <section className="py-12 sm:py-14 bg-[#F5EBD9] border-b-2 border-[#C89D32]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1B3D] text-[#F5E1A4] border border-[#D4AF37] text-[11px] font-bold uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                {ui.timelineBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B3D] mt-2">
                {ui.timelineTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#4A3B28] mt-1">{ui.timelineSub}</p>
            </div>
            <button
              onClick={() => onNavigate('/timeline')}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1B3D] text-[#F5E1A4] border border-[#D4AF37] text-xs font-serif font-bold cursor-pointer"
            >
              <span>{t.home.viewFullTimeline}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
          <TimelineViewer events={timelineEvents} />
        </div>
      </section>

      {/* =====================================================================
          7. HISTORICAL RESOURCES SECTION – DEEP ROYAL NAVY & ANTIQUE GOLD
      ===================================================================== */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#081530] via-[#0B1B3D] to-[#0E224A] text-[#FFFCF5] border-b-2 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#132C5E] border border-[#D4AF37]/70 text-[#F5E1A4] text-[11px] font-bold uppercase tracking-widest">
              <Scroll className="w-3.5 h-3.5 text-[#D4AF37]" />
              {ui.resourcesBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#FFF7DF] mt-2">
              {ui.resourcesTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#C7D2E8] mt-1.5">{ui.resourcesSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {resourceCards.map(res => {
              const ResIcon = res.icon;
              return (
                <div
                  key={res.id}
                  onClick={() => onNavigate(res.path)}
                  className="group rounded-2xl p-[1.5px] bg-gradient-to-b from-[#D4AF37] via-[#9E7318] to-[#D4AF37]/40 shadow-xl cursor-pointer flex flex-col h-full"
                >
                  <div className="bg-[#0F234C] rounded-[15px] overflow-hidden flex flex-col flex-1 justify-between h-full">
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#07132B]">
                        <ArchivalImage
                          src={res.image}
                          alt={res.title}
                          variant="card"
                          width={520}
                          height={325}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F234C] via-[#0F234C]/30 to-transparent" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#07132B]/90 border border-[#D4AF37]/70 text-[#F5E1A4] text-[10px] font-bold uppercase tracking-wider">
                          {res.badge}
                        </span>
                        <div className="absolute bottom-2.5 right-3 w-9 h-9 rounded-xl bg-[#D4AF37] text-[#0B1B3D] flex items-center justify-center shadow-md">
                          <ResIcon className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 space-y-2">
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#FFF7DF] group-hover:text-[#F5E1A4] leading-snug">
                          {res.title}
                        </h3>
                        <p className="text-xs text-[#C7D2E8] leading-relaxed">{res.description}</p>
                      </div>
                    </div>

                    <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#D4AF37]/25">
                      <span className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#F5E1A4] group-hover:text-[#D4AF37]">
                        <span>{res.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. ARCHIVAL VISUAL GALLERY SHOWCASE & VERIFICATION METRICS
      ===================================================================== */}
      <section className="py-12 sm:py-16 bg-[#FFFCF5] border-b-2 border-[#C89D32]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#762D35] text-[#FFF8E7] border border-[#D4AF37] text-[11px] font-bold uppercase tracking-widest">
                  <ImageIcon className="w-3.5 h-3.5 text-[#F5E1A4]" />
                  {ui.galleryBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B3D] mt-2">
                  {ui.galleryTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#4A3B28] mt-1">{ui.gallerySub}</p>
              </div>
              <button
                onClick={() => onNavigate('/gallery')}
                className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1B3D] text-[#F5E1A4] border border-[#D4AF37] text-xs font-serif font-bold cursor-pointer"
              >
                <span>{t.home.viewFullGallery}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {galleryItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedGalleryItem(item)}
                  className="group rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 bg-[#FBF5E8] shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1B3D]">
                      <ArchivalImage
                        src={item.image_url}
                        alt={item.alt_text || item.title}
                        variant="card"
                        width={560}
                        height={350}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/90 via-transparent to-transparent" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#0B1B3D]/90 text-[#F5E1A4] border border-[#D4AF37]/60 text-[10px] font-bold uppercase">
                        {getMetadataLabel('category', item.category) || translateText(item.category)}
                      </span>
                      <span className="absolute bottom-2.5 left-3 right-3 text-xs font-serif font-bold text-white leading-snug">
                        {item.title}
                      </span>
                    </div>
                    <div className="p-3.5">
                      <p className="text-xs text-[#3D3222] line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="px-3.5 pb-3.5 pt-2 border-t border-[#D4AF37]/25 flex items-center justify-between text-[11px] font-bold text-[#0B1B3D] group-hover:text-[#762D35]">
                    <span>{item.period}</span>
                    <span className="inline-flex items-center gap-1">
                      <span>{ui.exploreRealmBtn}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Archival Verification Metrics */}
          <div className="rounded-2xl bg-gradient-to-r from-[#081530] via-[#0B1B3D] to-[#132C5E] p-6 sm:p-8 border-2 border-[#D4AF37] text-[#FFFCF5] shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                {ui.statsBadge}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF7DF] mt-1">
                {ui.statsTitle}
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { label: t.stats.articles, value: stats.published_articles },
                { label: t.stats.documents, value: stats.digitized_documents },
                { label: t.stats.photos, value: stats.historical_photographs },
                { label: t.stats.inscriptions, value: stats.reviewed_inscriptions },
                { label: t.stats.translations, value: stats.published_translations },
                { label: t.stats.members, value: stats.registered_members },
                { label: t.stats.events, value: stats.community_events }
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-[#07132B]/80 border border-[#D4AF37]/50 p-3 text-center"
                >
                  <div className="text-xl sm:text-2xl font-serif font-bold text-[#F5E1A4]">
                    {m.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#C7D2E8] mt-0.5 leading-tight">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publisher & Research Attribution Card */}
          <PublisherCreditCard variant="footer" />
        </div>
      </section>

      {/* Lazy-Loaded Modals */}
      {selectedGalleryItem && (
        <Suspense fallback={null}>
          <LightboxModal
            item={selectedGalleryItem}
            onClose={() => setSelectedGalleryItem(null)}
          />
        </Suspense>
      )}

      {briefModalArticle && (
        <Suspense fallback={null}>
          <ArticleBriefModal
            article={briefModalArticle}
            isOpen={!!briefModalArticle}
            onClose={() => setBriefModalArticle(null)}
            onReadFull={art => {
              setBriefModalArticle(null);
              onNavigate(`/documentary?article=${encodeURIComponent(art.id)}`);
            }}
          />
        </Suspense>
      )}

      {detailModalItem && (
        <Suspense fallback={null}>
          <ContentDetailModal
            item={detailModalItem}
            isOpen={!!detailModalItem}
            onClose={() => setDetailModalItem(null)}
          />
        </Suspense>
      )}
    </div>
  );
};
