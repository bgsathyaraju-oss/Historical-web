import React, { useEffect, useState, useMemo, Suspense, lazy } from 'react';
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
  Award,
  Globe2,
  ChevronRight,
  Layers,
  Search,
  Menu,
  X,
  User,
  Shield,
  LogOut,
  Phone,
  Home,
  CheckCircle2,
  Download,
  Image as ImageIcon
} from 'lucide-react';
import {
  SiteStatistics,
  Article,
  HistoricalEvent,
  HistoricalFigure,
  GalleryItem,
  LanguageCode
} from '../types';
import { ArchivalImage } from '../components/ArchivalImage';
import { PublisherCreditCard, WhatsAppIcon } from '../components/PublisherCreditCard';
import { LanguageSelector } from '../components/LanguageSelector';
import { Navbar, RoyalSunCrest } from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { handleWhatsAppLinkClick } from '../utils/androidBridge';
import { getAllArticles } from '../data/articlesRepository';
import { getAllDocumentedFigures } from '../data/documentedFiguresRepository';
import {
  getCanonicalTimelineEvents,
  getCanonicalGallery,
  CANONICAL_STATISTICS
} from '../data/archivalSeedData';
import {
  ARCHIVE_IMG,
  HOMEPAGE_API_CACHE,
  HOME_UI,
  ArticleChronologicalCategoryKey,
  HomepageCuratedArticleItem
} from './TestPage.backup';

const LightboxModal = lazy(() =>
  import('../components/LightboxModal').then(m => ({ default: m.LightboxModal }))
);

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

const ASSET_WEBP = (name: string) =>
  `${(import.meta as any).env?.BASE_URL || '/'}assets/${name}`;

/**
 * Verified 25-Asset Registry mapping the exact filenames in public/assets/
 */
export const ROYAL_HOMEPAGE_ASSETS = {
  // 1. Main Hero, Emblem, Textures, Divider & Footer Silhouette (6 files)
  heroBannerKingHorse: ASSET_WEBP('hero-banner-king-horse.webp'),
  logoSunEmblem: ASSET_WEBP('logo-sun-emblem.webp'),
  bgMaroonTexture: ASSET_WEBP('bg-maroon-texture.webp'),
  bgParchment: ASSET_WEBP('bg-parchment.webp'),
  dividerRoyal: ASSET_WEBP('divider-royal.webp'),
  footerTempleSilhouette: ASSET_WEBP('footer-temple-silhouette.webp'),

  // 2. Historical Thumbnails (4 files)
  thumbKapilendraDeva: ASSET_WEBP('thumb-kapilendra-deva.webp'),
  thumbOdraKingdom: ASSET_WEBP('thumb-odra-kingdom.webp'),
  thumbTrikalinga: ASSET_WEBP('thumb-trikalinga.webp'),
  thumbKalingaArchitecture: ASSET_WEBP('thumb-kalinga-architecture.webp'),

  // 3. Panoramic Historical Banners (5 files)
  bannerFortHeritage: ASSET_WEBP('banner-fort-heritage.webp'),
  bannerMapOdraDesha: ASSET_WEBP('banner-map-odra-desha.webp'),
  bannerRoyalBattle: ASSET_WEBP('banner-royal-battle.webp'),
  bannerInscriptionStone: ASSET_WEBP('banner-inscription-stone.webp'),
  bannerSculptureHeritage: ASSET_WEBP('banner-sculpture-heritage.webp'),

  // 4. Royal Archival Category & Section Icons (10 files)
  iconCommunity: ASSET_WEBP('icon-community.webp'),
  iconPersonages: ASSET_WEBP('icon-personages.webp'),
  iconDynasties: ASSET_WEBP('icon-dynasties.webp'),
  iconMonographs: ASSET_WEBP('icon-monographs.webp'),
  iconGallery: ASSET_WEBP('icon-gallery.webp'),
  iconInscriptions: ASSET_WEBP('icon-inscriptions.webp'),
  iconGeography: ASSET_WEBP('icon-geography.webp'),
  iconSurnames: ASSET_WEBP('icon-surnames.webp'),
  iconArticles: ASSET_WEBP('icon-articles.webp'),
  iconMedia: ASSET_WEBP('icon-media.webp')
} as const;

interface RoyalHeritageI18n {
  headerBadge: string;
  viewTestPageBtn: string;
  searchLabel: string;
  heroSuperBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  exploreHistoryBtn: string;
  communityHeritageBtn: string;
  whyVisitKicker: string;
  whyVisitTitle: string;
  whyVisitSubtitle: string;
  whyPillars: Array<{
    id: string;
    iconWebp: string;
    title: string;
    description: string;
    path: string;
    cta: string;
  }>;
  fiveCategoriesKicker: string;
  fiveCategoriesTitle: string;
  fiveCategoriesSubtitle: string;
  fiveCategories: Array<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
    iconWebp: string;
    bannerWebp: string;
    path: string;
    cta: string;
  }>;
  featuredArticlesKicker: string;
  featuredArticlesTitle: string;
  featuredArticlesSubtitle: string;
  readArticleCta: string;
  showAllArticlesBtn: (count: number) => string;
  showFeaturedSixBtn: string;
  timelineKicker: string;
  timelineTitle: string;
  timelineSubtitle: string;
  openFullTimelineBtn: string;
  communityHighlightsKicker: string;
  communityHighlightsTitle: string;
  communityHighlightsSubtitle: string;
  communityHighlightsCards: Array<{
    id: string;
    era: string;
    title: string;
    subtitle: string;
    description: string;
    bannerWebp: string;
    iconWebp: string;
    path: string;
    cta: string;
  }>;
  footerQuickLinksTitle: string;
  footerEpigraphyTitle: string;
  footerCommunityTitle: string;
  footerContactTitle: string;
  footerBrandSummary: string;
  footerRights: string;
}

const ROYAL_HOME_I18N: Record<LanguageCode, RoyalHeritageI18n> = {
  en: {
    headerBadge: 'Suryavamsha Ikshvaku • Odra Desha • Gajapathi Royal Heritage',
    viewTestPageBtn: 'View Original Layout – Test Page',
    searchLabel: 'Search Archive',
    heroSuperBadge: 'Suryavamsha Odiyaraju Kshatriya Historical Documentary',
    heroTitle: 'The Sovereign Legacy of Odra Desha, Kalinga & the Suryavamsha Gajapathis',
    heroSubtitle:
      'Documenting 2,500+ Years of Solar Dynasty Rulers, Stone Inscriptions, Copper-Plate Charters & Pan-Indian Kshatriya Heritage',
    heroDescription:
      'An authoritative multilingual historical portal preserving primary epigraphic records, royal genealogies, temple architecture, and the living cultural heritage of the Odiyaraju / Odra-Kshatriya / Oad-Rajput community.',
    exploreHistoryBtn: 'Explore History',
    communityHeritageBtn: 'Community Heritage',
    whyVisitKicker: 'Archival Mission & Scholarly Purpose',
    whyVisitTitle: 'Why Visit Our Website',
    whyVisitSubtitle:
      'Every historical claim on this portal is anchored in primary stone inscriptions, royal copper-plate grants, and peer-reviewed epigraphic scholarship across eight Indian languages.',
    whyPillars: [
      {
        id: 'why-epigraphy',
        iconWebp: ASSET_WEBP('icon-inscriptions.webp'),
        title: 'Verified Epigraphic & Copper-Plate Proof',
        description:
          'Direct transcriptions and citations from Dhauli (261 BCE), Hathigumpha (1st Century BCE), Lingaraja (1452 CE), and the Veligalani Grant (1458 CE).',
        path: '/inscriptions',
        cta: 'View Inscriptions'
      },
      {
        id: 'why-lineage',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        title: 'Unbroken Suryavamsha Solar Genealogy',
        description:
          'Traces the royal continuum from Vedic Ikshvaku progenitors and Kalinga sovereigns to Emperor Kapilendra Deva, Purushottama Deva, and Prataparudra Deva.',
        path: '/genealogy',
        cta: 'View Royal Genealogy'
      },
      {
        id: 'why-surnames',
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        title: 'Pan-Indian Community & Surname Registry',
        description:
          'Comprehensive documentation of 18 historical community designations, royal gotras, South Indian Odiyaraju titles, and North Indian Oad-Rajput clans.',
        path: '/community-surnames',
        cta: 'Browse Surnames'
      },
      {
        id: 'why-multilingual',
        iconWebp: ASSET_WEBP('icon-articles.webp'),
        title: '8-Language Scholarly Monographs & PDFs',
        description:
          'Read and export full-length historical documentaries in English, Hindi, Telugu, Kannada, Tamil, Marathi, Odia, and Bengali.',
        path: '/documentary',
        cta: 'Read Monographs'
      }
    ],
    fiveCategoriesKicker: 'Royal Archival Gateways',
    fiveCategoriesTitle: 'Explore the Five Pillars of Our Royal Heritage',
    fiveCategoriesSubtitle:
      'Navigate directly into our primary historical collections, sovereign biographies, dynastic chronicles, and visual archives.',
    fiveCategories: [
      {
        id: 'cat-community-heritage',
        title: 'Community Heritage',
        subtitle: '18 Designations • Gotras • Martial & Agrarian Traditions',
        description:
          'Explore the pan-Indian identity, sacred customs, hydraulic engineering legacy, and historical spread of the Odiyaraju / Odra-Kshatriya / Oad community.',
        iconWebp: ASSET_WEBP('icon-community.webp'),
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        path: '/community-heritage',
        cta: 'Explore Community Heritage'
      },
      {
        id: 'cat-historical-personages',
        title: 'Historical Personages',
        subtitle: 'Emperors • Queens • Commanders • Royal Preceptors',
        description:
          'Detailed 10-section biographies of Emperor Kharavela, Kapilendra Deva, Purushottama Deva, Prataparudra Deva, Baxi Jagabandhu, and 20+ documented figures.',
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        path: '/kings-queens',
        cta: 'View Historical Personages'
      },
      {
        id: 'cat-royal-dynasties',
        title: 'Royal Dynasties',
        subtitle: 'Ikshvaku • Chedi-Kalinga • Eastern Ganga • Gajapathi',
        description:
          'Chronicles of the sovereign houses of Odra Desha, Trikalinga, and the Suryavamsha Gajapathi Empire from the Ganga to the Kaveri.',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        bannerWebp: ASSET_WEBP('banner-royal-battle.webp'),
        path: '/gajapathi-kings',
        cta: 'Explore Royal Dynasties'
      },
      {
        id: 'cat-historical-monographs',
        title: 'Historical Monographs',
        subtitle: 'Peer-Reviewed Chapters • Citations • PDF Export',
        description:
          'In-depth documentary monographs covering the Kalinga War (261 BCE), Odra realm formation, temple architecture, and epigraphic translations.',
        iconWebp: ASSET_WEBP('icon-monographs.webp'),
        bannerWebp: ASSET_WEBP('banner-inscription-stone.webp'),
        path: '/documentary',
        cta: 'Read Historical Monographs'
      },
      {
        id: 'cat-gallery-archives',
        title: 'Gallery & Archives',
        subtitle: 'Inscriptions • Forts • Temples • Copper Plates',
        description:
          'Curated visual museum of Konark Sun Temple, Puri Jagannatha, Barabati Fort, Udayagiri caves, palm-leaf manuscripts, and royal charters.',
        iconWebp: ASSET_WEBP('icon-gallery.webp'),
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        path: '/gallery',
        cta: 'Open Gallery & Archives'
      }
    ],
    featuredArticlesKicker: 'Curated Archival Scholarship',
    featuredArticlesTitle: 'Featured Historical Articles',
    featuredArticlesSubtitle:
      'Verified research articles and documentary chapters with primary epigraphic citations and full eight-language translations.',
    readArticleCta: 'Read Article',
    showAllArticlesBtn: count => `View All ${count} Historical Articles`,
    showFeaturedSixBtn: 'Show Featured 6 Articles',
    timelineKicker: '2,500+ Years of Documented History',
    timelineTitle: 'Historical Timeline Preview',
    timelineSubtitle:
      'Key civilizational milestones from ancient Odra-Kalinga and the Kalinga War (261 BCE) to the zenith of the Suryavamsha Gajapathi Empire.',
    openFullTimelineBtn: 'Explore Complete Interactive Timeline',
    communityHighlightsKicker: 'Living Royal Lineage & Cultural Identity',
    communityHighlightsTitle: 'Community Heritage Highlights',
    communityHighlightsSubtitle:
      'Discover the geographical spread, royal clan surnames, martial traditions, and prominent personalities of the Suryavamsha Odiyaraju Kshatriya community.',
    communityHighlightsCards: [
      {
        id: 'hl-odra-desha',
        era: 'Ancient & Maritime Realm',
        title: 'Odra Desha, Kalinga & Trikalinga Geography',
        subtitle: 'Mahanadi • Godavari • Rishikulya • Bay of Bengal',
        description:
          'Explore the heartland of ancient Odra Desha, its fortified citadels, maritime trade routes across Southeast Asia, and sacred temple capitals.',
        bannerWebp: ASSET_WEBP('banner-map-odra-desha.webp'),
        iconWebp: ASSET_WEBP('icon-geography.webp'),
        path: '/odra-desha',
        cta: 'Explore Odra Desha'
      },
      {
        id: 'hl-south-surnames',
        era: 'Deccan & Coastal Andhra',
        title: 'South Indian Odiyaraju Royal Surnames & Gotras',
        subtitle: 'Raju • Varma • Gajapathi • Suryavamsha Clans',
        description:
          'Documented compendium of royal surnames, Vasishta and Kaundinya gotras, and historical zamindari lineages across Andhra, Telangana, Karnataka, and Tamil Nadu.',
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        path: '/community-surnames',
        cta: 'South Indian Surnames'
      },
      {
        id: 'hl-north-surnames',
        era: 'North & West India',
        title: 'North Indian Oad-Rajput Clans & Stepwell Builders',
        subtitle: 'Rajasthan • Gujarat • Madhya Pradesh • Delhi-NCR',
        description:
          'Historical records of the Bhagiratha Suryavamsha Oad-Rajput clans, royal fortifications, and monumental stepwell (vav) architecture.',
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-community.webp'),
        path: '/community-surnames-north-indian-oad-community',
        cta: 'North Indian Surnames'
      },
      {
        id: 'hl-prominent-persons',
        era: 'Sovereigns & Luminaries',
        title: '20+ Community Prominent Personalities',
        subtitle: 'Monarchs • Freedom Fighters • Saint-Scholars • Leaders',
        description:
          'Biographies of Maharshi Bhagiratha, Emperor Kapilendra Deva, Shivayogi Siddharameshwara, Baxi Jagabandhu, Jayee Rajguru, and modern pioneers.',
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        path: '/community-prominent-persons',
        cta: 'View Prominent Persons'
      }
    ],
    footerQuickLinksTitle: 'Historical Documentary',
    footerEpigraphyTitle: 'Epigraphy & Archives',
    footerCommunityTitle: 'Community & Surnames',
    footerContactTitle: 'Contact & Attribution',
    footerBrandSummary:
      'Dedicated to empirical epigraphic research, historical geography of Odra Desha, Suryavamsha Gajapathi dynasty inscriptions, royal genealogies, and preserving living cultural traditions across eight supported languages.',
    footerRights: 'All historical records & translations reserved.'
  },
  hi: {
    headerBadge: 'सूर्यवंश इक्ष्वाकु • ओड्र देश • गजपति शाही विरासत',
    viewTestPageBtn: 'View Original Layout – Test Page',
    searchLabel: 'अभिलेखागार खोजें',
    heroSuperBadge: 'सूर्यवंश ओडियाराजु क्षत्रिय ऐतिहासिक डॉक्यूमेंट्री',
    heroTitle: 'ओड्र देश, कलिंग और सूर्यवंशी गजपति साम्राज्य की गौरवशाली विरासत',
    heroSubtitle:
      '2,500+ वर्षों के सूर्यवंशी सम्राटों, शिलालेखों, ताम्रपत्रों और अखिल भारतीय क्षत्रिय विरासत का प्रामाणिक प्रलेखन',
    heroDescription:
      'प्राथमिक शिलालेखों, शाही वंशावलियों, मंदिर वास्तुकला और ओडियाराजु / ओड्र-क्षत्रिय / ओड-राजपूत समुदाय की जीवंत सांस्कृतिक विरासत को 8 भारतीय भाषाओं में संरक्षित करने वाला पोर्टल।',
    exploreHistoryBtn: 'इतिहास का अन्वेषण करें',
    communityHeritageBtn: 'सामुदायिक विरासत',
    whyVisitKicker: 'अभिलेखीय मिशन एवं शोध उद्देश्य',
    whyVisitTitle: 'हमारी वेबसाइट क्यों देखें',
    whyVisitSubtitle:
      'इस पोर्टल का प्रत्येक ऐतिहासिक तथ्य धौली, हाथीगुम्फा, लिंगराज और वेलिगालनी जैसे प्रामाणिक शिलालेखों तथा ताम्रपत्रों पर आधारित है।',
    whyPillars: [
      {
        id: 'why-epigraphy',
        iconWebp: ASSET_WEBP('icon-inscriptions.webp'),
        title: 'प्रमाणित शिलालेख एवं ताम्रपत्र साक्ष्य',
        description:
          'धौली (261 ई.पू.), हाथीगुम्फा (प्रथम शताब्दी ई.पू.), लिंगराज (1452 ई.) और वेलिगालनी (1458 ई.) ताम्रपत्रों के मूल संदर्भ।',
        path: '/inscriptions',
        cta: 'शिलालेख देखें'
      },
      {
        id: 'why-lineage',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        title: 'अखंड सूर्यवंश राजवंशीय वंशावली',
        description:
          'वैदिक इक्ष्वाकु वंश और कलिंग सम्राटों से लेकर सम्राट कपिलेंद्र देव, पुरुषोत्तम देव और प्रतापरुद्र देव तक की वंशावली।',
        path: '/genealogy',
        cta: 'शाही वंशावली देखें'
      },
      {
        id: 'why-surnames',
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        title: 'अखिल भारतीय उपनाम एवं गोत्र निर्देशिका',
        description:
          '18 ऐतिहासिक सामुदायिक नामों, शाही गोत्रों, दक्षिण भारतीय ओडियाराजु और उत्तर भारतीय ओड-राजपूत वंशों का संकलन।',
        path: '/community-surnames',
        cta: 'उपनाम देखें'
      },
      {
        id: 'why-multilingual',
        iconWebp: ASSET_WEBP('icon-articles.webp'),
        title: '8 भाषाओं में शोध मोनोग्राफ एवं PDF',
        description:
          'अंग्रेजी, हिंदी, तेलुगु, कन्नड़, तमिल, मराठी, ओडिया और बंगाली में संपूर्ण ऐतिहासिक डॉक्यूमेंट्री पढ़ें और डाउनलोड करें।',
        path: '/documentary',
        cta: 'मोनोग्राफ पढ़ें'
      }
    ],
    fiveCategoriesKicker: 'शाही अभिलेखीय प्रवेशद्वार',
    fiveCategoriesTitle: 'हमारी शाही विरासत के पाँच प्रमुख स्तंभ',
    fiveCategoriesSubtitle:
      'सामुदायिक विरासत, सम्राट जीवनियों, राजवंशों, शोध मोनोग्राफ और दृश्य अभिलेखागार में सीधे प्रवेश करें।',
    fiveCategories: [
      {
        id: 'cat-community-heritage',
        title: 'सामुदायिक विरासत',
        subtitle: '18 ऐतिहासिक नाम • गोत्र • क्षत्रिय परंपराएँ',
        description:
          'ओडियाराजु / ओड्र-क्षत्रिय / ओड-राजपूत समुदाय की अखिल भारतीय पहचान, सांस्कृतिक परंपराओं और ऐतिहासिक विस्तार का अन्वेषण करें।',
        iconWebp: ASSET_WEBP('icon-community.webp'),
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        path: '/community-heritage',
        cta: 'सामुदायिक विरासत देखें'
      },
      {
        id: 'cat-historical-personages',
        title: 'ऐतिहासिक विभूतियाँ',
        subtitle: 'सम्राट • महारानियाँ • सेनापति • राजगुरु',
        description:
          'सम्राट खारवेल, कपिलेंद्र देव, पुरुषोत्तम देव, प्रतापरुद्र देव, बक्सी जगबंधु और 20+ ऐतिहासिक व्यक्तित्वों की विस्तृत जीवनियाँ।',
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        path: '/kings-queens',
        cta: 'ऐतिहासिक विभूतियाँ देखें'
      },
      {
        id: 'cat-royal-dynasties',
        title: 'शाही राजवंश',
        subtitle: 'इक्ष्वाकु • चेदि-कलिंग • पूर्वी गंग • गजपति',
        description:
          'ओड्र देश, त्रिकलिंग और गंगा से कावेरी तक फैले सूर्यवंशी गजपति साम्राज्य के राजवंशों का इतिहास।',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        bannerWebp: ASSET_WEBP('banner-royal-battle.webp'),
        path: '/gajapathi-kings',
        cta: 'शाही राजवंश देखें'
      },
      {
        id: 'cat-historical-monographs',
        title: 'ऐतिहासिक मोनोग्राफ',
        subtitle: 'शोध अध्याय • प्रमाणित संदर्भ • PDF डाउनलोड',
        description:
          'कलिंग युद्ध (261 ई.पू.), ओड्र साम्राज्य, मंदिर स्थापत्य और ताम्रपत्र शिलालेखों पर विस्तृत शोध मोनोग्राफ।',
        iconWebp: ASSET_WEBP('icon-monographs.webp'),
        bannerWebp: ASSET_WEBP('banner-inscription-stone.webp'),
        path: '/documentary',
        cta: 'मोनोग्राफ पढ़ें'
      },
      {
        id: 'cat-gallery-archives',
        title: 'गैलरी और अभिलेखागार',
        subtitle: 'शिलालेख • किले • मंदिर • ताम्रपत्र',
        description:
          'कोणार्क सूर्य मंदिर, पुरी जगन्नाथ, बाराबती किला, उदयगिरि गुफाओं और ताड़पत्र पांडुलिपियों का दृश्य संग्रहालय।',
        iconWebp: ASSET_WEBP('icon-gallery.webp'),
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        path: '/gallery',
        cta: 'गैलरी और अभिलेखागार खोलें'
      }
    ],
    featuredArticlesKicker: 'चयनित ऐतिहासिक शोध',
    featuredArticlesTitle: 'प्रमुख ऐतिहासिक लेख',
    featuredArticlesSubtitle:
      'प्राथमिक शिलालेखीय संदर्भों और 8 भाषाओं के अनुवाद के साथ प्रमाणित ऐतिहासिक शोध लेख।',
    readArticleCta: 'लेख पढ़ें',
    showAllArticlesBtn: count => `सभी ${count} ऐतिहासिक लेख देखें`,
    showFeaturedSixBtn: 'प्रमुख 6 लेख दिखाएँ',
    timelineKicker: '2,500+ वर्षों का प्रमाणित इतिहास',
    timelineTitle: 'ऐतिहासिक समयरेखा झलक',
    timelineSubtitle:
      'प्राचीन ओड्र-कलिंग और कलिंग युद्ध (261 ई.पू.) से लेकर सूर्यवंशी गजपति साम्राज्य के उत्कर्ष तक की प्रमुख घटनाएँ।',
    openFullTimelineBtn: 'संपूर्ण इंटरैक्टिव समयरेखा देखें',
    communityHighlightsKicker: 'जीवंत शाही वंश एवं सांस्कृतिक पहचान',
    communityHighlightsTitle: 'सामुदायिक विरासत की प्रमुख झलकियाँ',
    communityHighlightsSubtitle:
      'सूर्यवंश ओडियाराजु क्षत्रिय समुदाय के भौगोलिक विस्तार, शाही उपनामों और प्रमुख व्यक्तित्वों का अन्वेषण करें।',
    communityHighlightsCards: [
      {
        id: 'hl-odra-desha',
        era: 'प्राचीन एवं समुद्री साम्राज्य',
        title: 'ओड्र देश, कलिंग एवं त्रिकलिंग भूगोल',
        subtitle: 'महानदी • गोदावरी • ऋषिकुल्या • बंगाल की खाड़ी',
        description:
          'प्राचीन ओड्र देश की मुख्य भूमि, किलों, समुद्री व्यापार मार्गों और पवित्र मंदिर राजधानियों का इतिहास।',
        bannerWebp: ASSET_WEBP('banner-map-odra-desha.webp'),
        iconWebp: ASSET_WEBP('icon-geography.webp'),
        path: '/odra-desha',
        cta: 'ओड्र देश देखें'
      },
      {
        id: 'hl-south-surnames',
        era: 'दक्कन एवं तटीय आंध्र',
        title: 'दक्षिण भारतीय ओडियाराजु शाही उपनाम एवं गोत्र',
        subtitle: 'राजु • वर्मा • गजपति • सूर्यवंशी कुल',
        description:
          'आंध्र प्रदेश, तेलंगाना, कर्नाटक और तमिलनाडु में प्रचलित शाही उपनामों, वशिष्ठ व कौंडिन्य गोत्रों का प्रमाणित संकलन।',
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        path: '/community-surnames',
        cta: 'दक्षिण भारतीय उपनाम'
      },
      {
        id: 'hl-north-surnames',
        era: 'उत्तर एवं पश्चिम भारत',
        title: 'उत्तर भारतीय ओड-राजपूत वंश एवं बावड़ी स्थापत्य',
        subtitle: 'राजस्थान • गुजरात • मध्य प्रदेश • दिल्ली-एनसीआर',
        description:
          'भागीरथ सूर्यवंशी ओड-राजपूत कुलों, शाही दुर्गों और ऐतिहासिक जल-स्थापत्य (बावड़ियों) का प्रलेखन।',
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-community.webp'),
        path: '/community-surnames-north-indian-oad-community',
        cta: 'उत्तर भारतीय उपनाम'
      },
      {
        id: 'hl-prominent-persons',
        era: 'सम्राट एवं महापुरुष',
        title: '20+ सामुदायिक प्रमुख व्यक्तित्व',
        subtitle: 'सम्राट • स्वतंत्रता सेनानी • संत-विद्वान • नायक',
        description:
          'महर्षि भगीरथ, सम्राट कपिलेंद्र देव, शिवयोगी सिद्धरामेश्वर, बक्सी जगबंधु और जय राजगुरु की जीवनियाँ।',
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        path: '/community-prominent-persons',
        cta: 'प्रमुख व्यक्तित्व देखें'
      }
    ],
    footerQuickLinksTitle: 'ऐतिहासिक डॉक्यूमेंट्री',
    footerEpigraphyTitle: 'शिलालेख एवं अभिलेखागार',
    footerCommunityTitle: 'समुदाय एवं उपनाम',
    footerContactTitle: 'संपर्क एवं श्रेय',
    footerBrandSummary:
      'अनुभवजन्य शिलालेखीय अनुसंधान, ओड्र देश के ऐतिहासिक भूगोल, सूर्यवंश गजपति राजवंश के शिलालेखों, शाही वंशावलियों और आठ भाषाओं में जीवंत सांस्कृतिक परंपराओं के संरक्षण के लिए समर्पित।',
    footerRights: 'सभी ऐतिहासिक अभिलेख एवं अनुवाद सुरक्षित।'
  },
  te: {
    headerBadge: 'సూర్యవంశ ఇక్ష్వాకు • ఓడ్ర దేశం • గజపతి రాజ వారసత్వం',
    viewTestPageBtn: 'View Original Layout – Test Page',
    searchLabel: 'ఆర్కైవ్ వెతకండి',
    heroSuperBadge: 'సూర్యవంశ ఒడియరాజు క్షత్రియ చారిత్రక డాక్యుమెంటరీ',
    heroTitle: 'ఓడ్ర దేశం, కళింగ & సూర్యవంశ గజపతి సామ్రాజ్య సార్వభౌమ వారసత్వం',
    heroSubtitle:
      '2,500+ సంవత్సరాల సూర్యవంశ చక్రవర్తులు, శిలాశాసనాలు, తామ్రపత్రాలు & అఖిల భారత క్షత్రియ చరిత్ర',
    heroDescription:
      'ప్రాథమిక శిలాశాసనాలు, రాజ వంశావళులు, ఆలయ వాస్తుশিল্পం మరియు ఒడియరాజు / ఓడ్ర-క్షత్రియ / ఓడ్-రాజ్‌పుత్ సమాజ వారసత్వాన్ని 8 భారతీయ భాషలలో భద్రపరిచే చారిత్రక పోర్టల్.',
    exploreHistoryBtn: 'చరిత్రను అన్వేషించండి',
    communityHeritageBtn: 'సామాజిక వారసత్వం',
    whyVisitKicker: 'చారిత్రక లక్ష్యం & పరిశోధనా ఉద్దేశ్యం',
    whyVisitTitle: 'మా వెబ్‌సైట్‌ను ఎందుకు సందర్శించాలి',
    whyVisitSubtitle:
      'ఈ పోర్టల్‌లోని ప్రతి చారిత్రక అంశం ధౌళి, హాథీగుంఫా, లింగరాజ మరియు వెలిగలని వంటి ప్రాథమిక శిలాశాసనాలు, తామ్రపత్రాల ఆధారంగా నిర్మించబడింది.',
    whyPillars: [
      {
        id: 'why-epigraphy',
        iconWebp: ASSET_WEBP('icon-inscriptions.webp'),
        title: 'ధృవీకరించబడిన శిలాశాసన & తామ్రపత్ర ఆధారాలు',
        description:
          'ధౌళి (క్రీ.పూ. 261), హాథీగుంఫా, లింగరాజ (1452 CE) మరియు వెలిగలని తామ్రపత్రం (1458 CE) నుండి ప్రత్యక్ష ఆధారాలు.',
        path: '/inscriptions',
        cta: 'శాసనాలు చూడండి'
      },
      {
        id: 'why-lineage',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        title: 'అవిచ్ఛిన్న సూర్యవంశ రాజ వంశావళి',
        description:
          'వైదిక ఇక్ష్వాకు మూలపురుషులు మరియు కళింగ రాజుల నుండి కపిలేంద్ర దేవ, పురుషోత్తమ దేవ, ప్రతాపరుద్ర దేవ గజపతుల వరకు వంశావళి.',
        path: '/genealogy',
        cta: 'రాజ వంశావళి చూడండి'
      },
      {
        id: 'why-surnames',
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        title: 'అఖిల భారత ఇంటిపేర్లు & గోత్రాల డైరెక్టరీ',
        description:
          '18 చారిత్రక నామాలు, రాజ గోత్రాలు, దక్షిణ భారత ఒడియరాజు గృహనామాలు మరియు ఉత్తర భారత ఓడ్-రాజ్‌పుత్ వంశాల సంకలనం.',
        path: '/community-surnames',
        cta: 'ఇంటిపేర్లు చూడండి'
      },
      {
        id: 'why-multilingual',
        iconWebp: ASSET_WEBP('icon-articles.webp'),
        title: '8 భాషలలో పరిశోధనా మోనోగ్రాఫ్‌లు & PDFలు',
        description:
          'ఇంగ్లీష్, హిందీ, తెలుగు, కన్నడ, తమిళం, మరాఠీ, ఒడియా మరియు బెంగాలీ భాషలలో పూర్తి చారిత్రక డాక్యుమెంటరీలను చదవండి.',
        path: '/documentary',
        cta: 'మోనోగ్రాఫ్‌లు చదవండి'
      }
    ],
    fiveCategoriesKicker: 'రాజ చారిత్రక విభాగాలు',
    fiveCategoriesTitle: 'మా రాజ వారసత్వం యొక్క ఐదు ప్రధాన విభాగాలు',
    fiveCategoriesSubtitle:
      'సామాజిక వారసత్వం, చారిత్రక వ్యక్తులు, రాజవంశాలు, చారిత్రక మోనోగ్రాఫ్‌లు మరియు గ్యాలరీ ఆర్కైవ్‌లను నేరుగా అన్వేషించండి.',
    fiveCategories: [
      {
        id: 'cat-community-heritage',
        title: 'సామాజిక వారసత్వం',
        subtitle: '18 చారిత్రక నామాలు • గోత్రాలు • క్షత్రియ సంప్రదాయాలు',
        description:
          'ఒడియరాజు / ఓడ్ర-క్షత్రియ / ఓడ్ సమాజం యొక్క అఖిల భారత గుర్తింపు, సంప్రదాయాలు మరియు చారిత్రక విస్తరణ.',
        iconWebp: ASSET_WEBP('icon-community.webp'),
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        path: '/community-heritage',
        cta: 'సామాజిక వారసత్వం చూడండి'
      },
      {
        id: 'cat-historical-personages',
        title: 'చారిత్రక వ్యక్తులు',
        subtitle: 'చక్రవర్తులు • మహారాణులు • సేనానులు • రాజగురువులు',
        description:
          'ఖారవేల చక్రవర్తి, కపిలేంద్ర దేవ, పురుషోత్తమ దేవ, ప్రతాపరుద్ర దేవ, బక్సీ జగబంధు మరియు 20+ చారిత్రక ప్రముఖుల జీవిత చరిత్రలు.',
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        path: '/kings-queens',
        cta: 'చారిత్రక వ్యక్తులను చూడండి'
      },
      {
        id: 'cat-royal-dynasties',
        title: 'రాజవంశాలు',
        subtitle: 'ఇక్ష్వాకు • చేది-కళింగ • తూర్పు గంగ • గజపతి',
        description:
          'ఓడ్ర దేశం, త్రికళింగ మరియు గంగా నుండి కావేరి వరకు విస్తరించిన సూర్యవంశ గజపతి సామ్రాజ్య రాజవంశాల చరిత్ర.',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        bannerWebp: ASSET_WEBP('banner-royal-battle.webp'),
        path: '/gajapathi-kings',
        cta: 'రాజవంశాలను అన్వేషించండి'
      },
      {
        id: 'cat-historical-monographs',
        title: 'చారిత్రక మోనోగ్రాఫ్‌లు',
        subtitle: 'పరిశోధనా అధ్యాయాలు • శాసన ఆధారాలు • PDF',
        description:
          'కళింగ యుద్ధం (క్రీ.పూ. 261), ఓడ్ర సామ్రాజ్య నిర్మాణం, ఆలయ వాస్తుశిల్పం మరియు తామ్రపత్ర శాసనాలపై సమగ్ర గ్రంథాలు.',
        iconWebp: ASSET_WEBP('icon-monographs.webp'),
        bannerWebp: ASSET_WEBP('banner-inscription-stone.webp'),
        path: '/documentary',
        cta: 'మోనోగ్రాఫ్‌లు చదవండి'
      },
      {
        id: 'cat-gallery-archives',
        title: 'గ్యాలరీ & ఆర్కైవ్స్',
        subtitle: 'శిలాశాసనాలు • కోటలు • దేవాలయాలు • తామ్రపత్రాలు',
        description:
          'కోణార్క్ సూర్య దేవాలయం, పూరీ జగన్నాథ, బారాబతి కోట, ఉదయగిరి గుహలు మరియు తాళపత్ర గ్రంథాల దృశ్య భాండాగారం.',
        iconWebp: ASSET_WEBP('icon-gallery.webp'),
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        path: '/gallery',
        cta: 'గ్యాలరీ & ఆర్కైవ్స్ తెరవండి'
      }
    ],
    featuredArticlesKicker: 'పరిశోధనా వ్యాసాలు',
    featuredArticlesTitle: 'ముఖ్యమైన చారిత్రక వ్యాసాలు',
    featuredArticlesSubtitle:
      'ప్రాథమిక శాసన ఆధారాలు మరియు 8 భాషల అనువాదాలతో కూడిన చారిత్రక పరిశోధనా వ్యాసాలు.',
    readArticleCta: 'వ్యాసం చదవండి',
    showAllArticlesBtn: count => `మొత్తం ${count} చారిత్రక వ్యాసాలను చూడండి`,
    showFeaturedSixBtn: 'ముఖ్యమైన 6 వ్యాసాలను చూపించు',
    timelineKicker: '2,500+ సంవత్సరాల చారిత్రక ప్రస్థానం',
    timelineTitle: 'చారిత్రక కాలరేఖ (Timeline) పరిచయం',
    timelineSubtitle:
      'ప్రాచీన ఓడ్ర-కళింగ మరియు కళింగ యుద్ధం (క్రీ.పూ. 261) నుండి సూర్యవంశ గజపతి సామ్రాజ్య వైభవం వరకు ముఖ్య ఘట్టాలు.',
    openFullTimelineBtn: 'పూర్తి ఇంటరాక్టివ్ కాలరేఖను చూడండి',
    communityHighlightsKicker: 'సజీవ రాజ వంశం & సాంస్కృతిక గుర్తింపు',
    communityHighlightsTitle: 'సామాజిక వారసత్వ విశేషాలు',
    communityHighlightsSubtitle:
      'సూర్యవంశ ఒడియరాజు క్షత్రియ సమాజం యొక్క భౌగోళిక విస్తరణ, రాజ గృహనామాలు (ఇంటిపేర్లు) మరియు ప్రముఖుల విశేషాలు.',
    communityHighlightsCards: [
      {
        id: 'hl-odra-desha',
        era: 'ప్రాచీన & సముద్ర సామ్రాజ్యం',
        title: 'ఓడ్ర దేశం, కళింగ & త్రికళింగ చారిత్రక భూగోళం',
        subtitle: 'మహానది • గోదావరి • ఋషికుల్య • బంగాళాఖాతం',
        description:
          'ప్రాచీన ఓడ్ర దేశం యొక్క కోటలు, సముద్ర వాణిజ్య మార్గాలు మరియు పవిత్ర ఆలయ రాజధానుల చరిత్ర.',
        bannerWebp: ASSET_WEBP('banner-map-odra-desha.webp'),
        iconWebp: ASSET_WEBP('icon-geography.webp'),
        path: '/odra-desha',
        cta: 'ఓడ్ర దేశం చూడండి'
      },
      {
        id: 'hl-south-surnames',
        era: 'దక్కన్ & కోస్తా ఆంధ్ర',
        title: 'దక్షిణ భారత ఒడియరాజు ఇంటిపేర్లు & గోత్రాలు',
        subtitle: 'రాజు • వర్మ • గజపతి • సూర్యవంశ గృహనామాలు',
        description:
          'ఆంధ్రప్రదేశ్, తెలంగాణ, కర్ణాటక మరియు తమిళనాడులోని రాజ గృహనామాలు, వశిష్ట, కౌండిన్య గోత్రాల ధృవీకరించబడిన జాబితా.',
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        path: '/community-surnames',
        cta: 'దక్షిణ భారత ఇంటిపేర్లు'
      },
      {
        id: 'hl-north-surnames',
        era: 'ఉత్తర & పశ్చిమ భారతం',
        title: 'ఉత్తర భారత ఓడ్-రాజ్‌పుత్ వంశాలు & మెట్లబావుల నిర్మాణం',
        subtitle: 'రాజస్థాన్ • గుజరాత్ • మధ్యప్రదేశ్ • ఢిల్లీ',
        description:
          'భగీరథ సూర్యవంశ ఓడ్-రాజ్‌పుత్ వంశాలు, రాజ కోటలు మరియు చారిత్రక జల-వాస్తుశిల్పం యొక్క రికార్డులు.',
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-community.webp'),
        path: '/community-surnames-north-indian-oad-community',
        cta: 'ఉత్తర భారత ఇంటిపేర్లు'
      },
      {
        id: 'hl-prominent-persons',
        era: 'చక్రవర్తులు & ప్రముఖులు',
        title: '20+ సమాజ చారిత్రక ప్రముఖులు',
        subtitle: 'మహారాజులు • స్వాతంత్ర్య సమరయోధులు • యోగులు • నాయకులు',
        description:
          'మహర్షి భగీరథ, కపిలేంద్ర దేవ, శివయోగి సిద్ధరామేశ్వర, బక్సీ జగబంధు మరియు జయీ రాజగురు జీవిత చరిత్రలు.',
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        path: '/community-prominent-persons',
        cta: 'ప్రముఖులను చూడండి'
      }
    ],
    footerQuickLinksTitle: 'చారిత్రక డాక్యుమెంటరీ',
    footerEpigraphyTitle: 'శాసనాలు & ఆర్కైవ్స్',
    footerCommunityTitle: 'సమాజం & ఇంటిపేర్లు',
    footerContactTitle: 'సంప్రదింపు & ఆధారాలు',
    footerBrandSummary:
      'శాసన పరిశోధన, ఓడ్ర దేశ చారిత్రక భూగోళం, సూర్యవంశ గజపతి సామ్రాజ్య శాసనాలు, రాజ వంశావళులు మరియు 8 భాషలలో సజీవ సాంస్ಕృతిక సంప్రదాయాల పరిరక్షణకు అంకితం చేయబడింది.',
    footerRights: 'అన్ని చారిత్రక రికార్డులు & అనువాద హక్కులు ప్రత్యేకించబడినవి.'
  },
  kn: {
    headerBadge: 'ಸೂರ್ಯವಂಶ ಇಕ್ಷ್ವಾಕು • ಓಡ್ರ ದೇಶ • ಗಜಪತಿ ರಾಜ ಪರಂಪರೆ',
    viewTestPageBtn: 'View Original Layout – Test Page',
    searchLabel: 'ಪತ್ರಾಗಾರ ಹುಡುಕಿ',
    heroSuperBadge: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ',
    heroTitle: 'ಓಡ್ರ ದೇಶ, ಕಳಿಂಗ ಮತ್ತು ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ಸಾರ್ವಭೌಮ ಪರಂಪರೆ',
    heroSubtitle:
      '2,500+ ವರ್ಷಗಳ ಸೂರ್ಯವಂಶದ ಸಾಮ್ರಾಟರು, ಶಿಲಾಶಾಸನಗಳು, ತಾಮ್ರಪತ್ರಗಳು ಮತ್ತು ಅಖಿಲ ಭಾರತ ಕ್ಷತ್ರಿಯ ಪರಂಪರೆ',
    heroDescription:
      'ಪ್ರಾಥಮಿಕ ಶಿಲಾಶಾಸನಗಳು, ರಾಜ ವಂಶಾವಳಿಗಳು, ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಒಡಿಯರಾಜು / ಓಡ್ರ-ಕ್ಷತ್ರಿಯ / ಓಡ್-ರಜಪೂತ್ ಸಮುದಾಯದ ಪರಂಪರೆಯನ್ನು 8 ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಸಂರಕ್ಷಿಸುವ ಅಧಿಕೃತ ಪೋರ್ಟಲ್.',
    exploreHistoryBtn: 'ಇತಿಹಾಸವನ್ನು ಅನ್ವೇಷಿಸಿ',
    communityHeritageBtn: 'ಸಮುದಾಯ ಪರಂಪರೆ',
    whyVisitKicker: 'ಪತ್ರಾಗಾರದ ಉದ್ದೇಶ ಮತ್ತು ಸಂಶೋಧನಾ ಗುರಿ',
    whyVisitTitle: 'ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಏಕೆ ಭೇಟಿ ನೀಡಬೇಕು',
    whyVisitSubtitle:
      'ಈ ಪೋರ್ಟಲ್‌ನಲ್ಲಿರುವ ಪ್ರತಿಯೊಂದು ಐತಿಹಾಸಿಕ ಮಾಹಿತಿಯು ಧೌಳಿ, ಹಾಥಿಗುಂಫಾ, ಲಿಂಗರಾಜ ಮತ್ತು ವೆಲಿಗಲನಿಯಂತಹ ಪ್ರಾಥಮಿಕ ಶಿಲಾಶಾಸನಗಳು ಹಾಗೂ ತಾಮ್ರಪತ್ರಗಳ ಆಧಾರಿತವಾಗಿದೆ.',
    whyPillars: [
      {
        id: 'why-epigraphy',
        iconWebp: ASSET_WEBP('icon-inscriptions.webp'),
        title: 'ದೃಢೀಕೃತ ಶಿಲಾಶಾಸನ ಮತ್ತು ತಾಮ್ರಪತ್ರ ಆಧಾರಗಳು',
        description:
          'ಧೌಳಿ (ಕ್ರಿ.ಪೂ. 261), ಹಾಥಿಗುಂಫಾ, ಲಿಂಗರಾಜ (1452 CE) ಮತ್ತು ವೆಲಿಗಲನಿ ತಾಮ್ರಶಾಸನಗಳ (1458 CE) ಮೂಲ ಉಲ್ಲೇಖಗಳು.',
        path: '/inscriptions',
        cta: 'ಶಾಸನಗಳನ್ನು ನೋಡಿ'
      },
      {
        id: 'why-lineage',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        title: 'ಅವಿಚ್ಛಿನ್ನ ಸೂರ್ಯವಂಶ ರಾಜ ವಂಶಾವಳಿ',
        description:
          'ವೈದಿಕ ಇಕ್ಷ್ವಾಕು ಮೂಲಪುರುಷರು ಮತ್ತು ಕಳಿಂಗ ಸಾಮ್ರಾಟರಿಂದ ಕಪಿಲೇಂದ್ರ ದೇವ, ಪುರುಷೋತ್ತಮ ದೇವ ಮತ್ತು ಪ್ರತಾಪರುದ್ರ ದೇವ ಗಜಪತಿಗಳವರೆಗಿನ ವಂಶಾವಳಿ.',
        path: '/genealogy',
        cta: 'ರಾಜ ವಂಶಾವಳಿ ನೋಡಿ'
      },
      {
        id: 'why-surnames',
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        title: 'ಅಖಿಲ ಭಾರತ ಉಪನಾಮಗಳು ಮತ್ತು ಗೋತ್ರಗಳ ನಿರ್ದೇಶಿಕೆ',
        description:
          '18 ಐತಿಹಾಸಿಕ ಪದನಾಮಗಳು, ರಾಜ ಗೋತ್ರಗಳು, ದಕ್ಷಿಣ ಭಾರತೀಯ ಒಡಿಯರಾಜು ಮತ್ತು ಉತ್ತರ ಭಾರತೀಯ ಓಡ್-ರಜಪೂತ್ ವಂಶಗಳ ಸಂಕಲನ.',
        path: '/community-surnames',
        cta: 'ಉಪನಾಮಗಳನ್ನು ನೋಡಿ'
      },
      {
        id: 'why-multilingual',
        iconWebp: ASSET_WEBP('icon-articles.webp'),
        title: '8 ಭಾಷೆಗಳಲ್ಲಿ ಸಂಶೋಧನಾ ಮೊನೊಗ್ರಾಫ್‌ಗಳು ಮತ್ತು PDF',
        description:
          'ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ತೆಲುಗು, ತಮಿಳು, ಮರಾಠಿ, ಒಡಿಯಾ ಮತ್ತು ಬೆಂಗಾಲಿ ಭಾಷೆಗಳಲ್ಲಿ ಸಂಪೂರ್ಣ ಐತಿಹಾಸಿಕ ಲೇಖನಗಳನ್ನು ಓದಿ.',
        path: '/documentary',
        cta: 'ಮೊನೊಗ್ರಾಫ್‌ಗಳನ್ನು ಓದಿ'
      }
    ],
    fiveCategoriesKicker: 'ರಾಜ ಪರಂಪರೆಯ ಪ್ರಮುಖ ವಿಭಾಗಗಳು',
    fiveCategoriesTitle: 'ನಮ್ಮ ರಾಜ ಪರಂಪರೆಯ ಐದು ಪ್ರಮುಖ ಆಧಾರಸ್ತಂಭಗಳು',
    fiveCategoriesSubtitle:
      'ಸಮುದಾಯ ಪರಂಪರೆ, ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು, ರಾಜವಂಶಗಳು, ಐತಿಹಾಸಿಕ ಮೊನೊಗ್ರಾಫ್‌ಗಳು ಮತ್ತು ಗ್ಯಾಲರಿ ಪತ್ರಾಗಾರವನ್ನು ಅನ್ವೇಷಿಸಿ.',
    fiveCategories: [
      {
        id: 'cat-community-heritage',
        title: 'ಸಮುದಾಯ ಪರಂಪರೆ',
        subtitle: '18 ಐತಿಹಾಸಿಕ ನಾಮಗಳು • ಗೋತ್ರಗಳು • ಕ್ಷತ್ರಿಯ ಸಂಪ್ರದಾಯಗಳು',
        description:
          'ಒಡಿಯರಾಜು / ಓಡ್ರ-ಕ್ಷತ್ರಿಯ / ಓಡ್ ಸಮುದಾಯದ ಅಖಿಲ ಭಾರತ ಗುರುತು, ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ವಿಸ್ತರಣೆ.',
        iconWebp: ASSET_WEBP('icon-community.webp'),
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        path: '/community-heritage',
        cta: 'ಸಮುದಾಯ ಪರಂಪರೆ ನೋಡಿ'
      },
      {
        id: 'cat-historical-personages',
        title: 'ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು',
        subtitle: 'ಸಾಮ್ರಾಟರು • ಮಹಾರಾಣಿಯರು • ಸೇనానిಗಳು • ರಾಜಗುರುಗಳು',
        description:
          'ಸಾಮ್ರಾಟ್ ಖಾರವೇಲ, ಕಪಿಲೇಂದ್ರ ದೇವ, ಪುರುಷೋತ್ತಮ ದೇವ, ಪ್ರತಾಪರುದ್ರ ದೇವ, ಬಕ್ಸಿ ಜಗಬಂಧು ಮತ್ತು 20+ ಗಣ್ಯರ ಜೀವನ ಚರಿತ್ರೆ.',
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        path: '/kings-queens',
        cta: 'ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳನ್ನು ನೋಡಿ'
      },
      {
        id: 'cat-royal-dynasties',
        title: 'ರಾಜವಂಶಗಳು',
        subtitle: 'ಇಕ್ಷ್ವಾಕು • ಚೇದಿ-ಕಳಿಂಗ • ಪೂರ್ವ ಗಂಗ • ಗಜಪತಿ',
        description:
          'ಓಡ್ರ ದೇಶ, ತ್ರಿಕಳಿಂಗ ಮತ್ತು ಗಂಗೆಯಿಂದ ಕಾವೇರಿಯವರೆಗೆ ವಿಸ್ತರಿಸಿದ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ರಾಜವಂಶಗಳ ಇತಿಹಾಸ.',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        bannerWebp: ASSET_WEBP('banner-royal-battle.webp'),
        path: '/gajapathi-kings',
        cta: 'ರಾಜವಂಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ'
      },
      {
        id: 'cat-historical-monographs',
        title: 'ಐತಿಹಾಸಿಕ ಮೊನೊಗ್ರಾಫ್‌ಗಳು',
        subtitle: 'ಸಂಶೋಧನಾ ಅಧ್ಯಾಯಗಳು • ಶಾಸನ ಉಲ್ಲೇಖಗಳು • PDF',
        description:
          'ಕಳಿಂಗ ಯುದ್ಧ (ಕ್ರಿ.ಪೂ. 261), ಓಡ್ರ ಸಾಮ್ರಾಜ್ಯ, ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ತಾಮ್ರಶಾಸನಗಳ ಕುರಿತಾದ ಸಮಗ್ರ ಸಂಶೋಧನಾ ಗ್ರಂಥಗಳು.',
        iconWebp: ASSET_WEBP('icon-monographs.webp'),
        bannerWebp: ASSET_WEBP('banner-inscription-stone.webp'),
        path: '/documentary',
        cta: 'ಮೊನೊಗ್ರಾಫ್‌ಗಳನ್ನು ಓದಿ'
      },
      {
        id: 'cat-gallery-archives',
        title: 'ಗ್ಯಾಲರಿ ಮತ್ತು ಪತ್ರಾಗಾರ',
        subtitle: 'ಶಾಸನಗಳು • ಕೋಟೆಗಳು • ದೇವಾಲಯಗಳು • ತಾಮ್ರಪತ್ರಗಳು',
        description:
          'ಕೋణಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯ, ಪುರಿ ಜಗನ್ನಾಥ, ಬಾರಾಬತಿ ಕೋಟೆ, ಉದಯಗಿರಿ ಗುಹೆಗಳು ಮತ್ತು ತಾಳೆಗರಿ ಹಸ್ತಪ್ರತಿಗಳ ದೃಶ್ಯ ಸಂಗ್ರಹಾಲಯ.',
        iconWebp: ASSET_WEBP('icon-gallery.webp'),
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        path: '/gallery',
        cta: 'ಗ್ಯಾಲರಿ ಮತ್ತು ಪತ್ರಾಗಾರ ತೆರೆಯಿರಿ'
      }
    ],
    featuredArticlesKicker: 'ಆಯ್ದ ಐತಿಹಾಸಿಕ ಸಂಶೋಧನೆ',
    featuredArticlesTitle: 'ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಲೇಖನಗಳು',
    featuredArticlesSubtitle:
      'ಪ್ರಾಥಮಿಕ ಶಾಸನ ಉಲ್ಲೇಖಗಳು ಮತ್ತು 8 ಭಾಷೆಗಳ ಅನುವಾದಗಳೊಂದಿಗೆ ದೃಢೀಕೃತ ಐತಿಹಾಸಿಕ ಲೇಖನಗಳು.',
    readArticleCta: 'ಲೇಖನ ಓದಿ',
    showAllArticlesBtn: count => `ಎಲ್ಲಾ ${count} ಐತಿಹಾಸಿಕ ಲೇಖನಗಳನ್ನು ನೋಡಿ`,
    showFeaturedSixBtn: 'ಪ್ರಮುಖ 6 ಲೇಖನಗಳನ್ನು ತೋರಿಸಿ',
    timelineKicker: '2,500+ ವರ್ಷಗಳ ದಾಖಲಿತ ಇತಿಹಾಸ',
    timelineTitle: 'ಐತಿಹಾಸಿಕ ಕಾಲರೇಖೆಯ ಮುನ್ನೋಟ',
    timelineSubtitle:
      'ಪ್ರಾಚೀನ ಓಡ್ರ-ಕಳಿಂಗ ಮತ್ತು ಕಳಿಂಗ ಯುದ್ಧದಿಂದ (ಕ್ರಿ.ಪೂ. 261) ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ವೈಭವದವರೆಗಿನ ಪ್ರಮುಖ ಮೈಲಿಗಲ್ಲುಗಳು.',
    openFullTimelineBtn: 'ಸಂಪೂರ್ಣ ಸಂವಾದಾತ್ಮಕ ಕಾಲರೇಖೆಯನ್ನು ನೋಡಿ',
    communityHighlightsKicker: 'ಜೀವಂತ ರಾಜ ವಂಶ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಗುರುತು',
    communityHighlightsTitle: 'ಸಮುದಾಯ ಪರಂಪರೆಯ ಪ್ರಮುಖ ಮುಖ್ಯಾಂಶಗಳು',
    communityHighlightsSubtitle:
      'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಸಮುದಾಯದ ಭೌಗೋಳಿಕ ವಿಸ್ತರಣೆ, ರಾಜ ಮನೆತನದ ಉಪನಾಮಗಳು ಮತ್ತು ಗಣ್ಯ ವ್ಯಕ್ತಿಗಳ ವಿವರಗಳು.',
    communityHighlightsCards: [
      {
        id: 'hl-odra-desha',
        era: 'ಪ್ರಾಚೀನ ಮತ್ತು ಕಡಲ ಸಾಮ್ರಾಜ್ಯ',
        title: 'ಓಡ್ರ ದೇಶ, ಕಳಿಂಗ ಮತ್ತು ತ್ರಿಕಳಿಂಗ ಭೂಗೋಳ',
        subtitle: 'ಮಹಾನದಿ • ಗೋದಾವರಿ • ಋಷಿಕುಲ್ಯ • ಬಂಗಾಳಕೊಲ್ಲಿ',
        description:
          'ಪ್ರಾಚೀನ ಓಡ್ರ ದೇಶದ ಕೋಟೆಗಳು, ಕಡಲ ವ್ಯಾಪಾರ ಮಾರ್ಗಗಳು ಮತ್ತು ಪವಿತ್ರ ದೇವಾಲಯ ರಾಜಧಾನಿಗಳ ಇತಿಹಾಸ.',
        bannerWebp: ASSET_WEBP('banner-map-odra-desha.webp'),
        iconWebp: ASSET_WEBP('icon-geography.webp'),
        path: '/odra-desha',
        cta: 'ಓಡ್ರ ದೇಶ ನೋಡಿ'
      },
      {
        id: 'hl-south-surnames',
        era: 'ದక్కನ್ ಮತ್ತು ಕರಾವಳಿ ಆಂಧ್ರ',
        title: 'ದಕ್ಷಿಣ ಭಾರತೀಯ ಒಡಿಯರಾಜು ಉಪನಾಮಗಳು ಮತ್ತು ಗೋತ್ರಗಳು',
        subtitle: 'ರಾಜು • ವರ್ಮ • ಗಜಪತಿ • ಸೂರ್ಯವಂಶ ಕುಲಗಳು',
        description:
          'ಕರ್ನಾಟಕ, ಆಂಧ್ರಪ್ರದೇಶ, ತೆಲಂಗಾಣ ಮತ್ತು ತಮಿಳುನಾಡಿನಲ್ಲಿರುವ ರಾಜ ಉಪನಾಮಗಳು, ವಸಿಷ್ಠ ಮತ್ತು ಕೌಂಡಿನ್ಯ ಗೋತ್ರಗಳ ಪಟ್ಟಿ.',
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        path: '/community-surnames',
        cta: 'ದಕ್ಷಿಣ ಭಾರತೀಯ ಉಪನಾಮಗಳು'
      },
      {
        id: 'hl-north-surnames',
        era: 'ಉತ್ತರ ಮತ್ತು ಪಶ್ಚಿಮ ಭಾರತ',
        title: 'ಉತ್ತರ ಭಾರತೀಯ ಓಡ್-ರಜಪೂತ್ ಕುಲಗಳು ಮತ್ತು ಮೆಟ್ಟಿಲುಬಾವಿ ವಾಸ್ತುಶಿಲ್ಪ',
        subtitle: 'ರಾಜಸ್ಥಾನ • ಗುಜರಾತ್ • ಮಧ್ಯಪ್ರದೇಶ • ದೆಹಲಿ',
        description:
          'ಭಗೀರಥ ಸೂರ್ಯವಂಶ ಓಡ್-ರಜಪೂತ್ ವಂಶಗಳು, ರಾಜ ಕೋಟೆಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಜಲ-ವಾಸ್ತುಶಿಲ್ಪದ ದಾಖಲೆಗಳು.',
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-community.webp'),
        path: '/community-surnames-north-indian-oad-community',
        cta: 'ಉತ್ತರ ಭಾರತೀಯ ಉಪನಾಮಗಳು'
      },
      {
        id: 'hl-prominent-persons',
        era: 'ಸಾಮ್ರಾಟರು ಮತ್ತು ಗಣ್ಯರು',
        title: '20+ ಸಮುದಾಯದ ಪ್ರಮುಖ ವ್ಯಕ್ತಿಗಳು',
        subtitle: 'ಮಹಾರಾಜರು • ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟಗಾರರು • ಶಿವಯೋಗಿಗಳು • ನಾಯಕರು',
        description:
          'ಮಹರ್ಷಿ ಭಗೀರಥ, ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವ, ಶಿವಯೋಗಿ ಸಿದ್ಧರಾಮೇಶ್ವರ, ಬಕ್ಸಿ ಜಗಬಂಧು ಮತ್ತು ಜಯೀ ರಾಜಗುರು ಜೀವನ ಚರಿತ್ರೆ.',
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        path: '/community-prominent-persons',
        cta: 'ಪ್ರಮುಖ ವ್ಯಕ್ತಿಗಳನ್ನು ನೋಡಿ'
      }
    ],
    footerQuickLinksTitle: 'ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ',
    footerEpigraphyTitle: 'ಶಾಸನಗಳು ಮತ್ತು ಪತ್ರಾಗಾರ',
    footerCommunityTitle: 'ಸಮುದಾಯ ಮತ್ತು ಉಪನಾಮಗಳು',
    footerContactTitle: 'ಸಂಪರ್ಕ ಮತ್ತು ಉಲ್ಲೇಖ',
    footerBrandSummary:
      'ಶಾಸನ ಸಂಶೋಧನೆ, ಓಡ್ರ ದೇಶದ ಐತಿಹಾಸಿಕ ಭೂಗೋಳ, ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ಶಾಸನಗಳು, ರಾಜ ವಂಶಾವಳಿಗಳು ಮತ್ತು 8 ಭಾಷೆಗಳಲ್ಲಿ ಜೀವಂತ ಸಾಂಸ್ಕೃತಿಕ ಸಂಪ್ರದಾಯಗಳ ಸಂರಕ್ಷಣೆಗೆ ಸಮರ್ಪಿತವಾಗಿದೆ.',
    footerRights: 'ಎಲ್ಲಾ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ಅನುವಾದಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.'
  },
  ta: {
    headerBadge: 'சூரியவம்ச இக்ஷ்வாகு • ஒட்ர தேசம் • கஜபதி அரச பாரம்பரியம்',
    viewTestPageBtn: 'View Original Layout – Test Page',
    searchLabel: 'ஆவணகம் தேடுக',
    heroSuperBadge: 'சூரியவம்ச ஒடியராஜு சத்திரிய வரலாற்று ஆவணப்படம்',
    heroTitle: 'ஒட்ர தேசம், கலிங்கம் & சூரியவம்ச கஜபதி பேரரசின் அரச பாரம்பரியம்',
    heroSubtitle:
      '2,500+ ஆண்டுகால சூரியवंशப் பேரரசர்கள், கல்வெட்டுகள், செப்பேடுகள் & அகில இந்திய சத்திரிய வரலாறு',
    heroDescription:
      'முதன்மைக் கல்வெட்டுகள், அரச வம்சாவளிகள், கோயில் கட்டிடக்கலை மற்றும் ஒடியராஜு / ஒட்ர-சத்திரிய / ஓட்-ராஜ்புத் சமூகத்தின் பாரம்பரியத்தை 8 இந்திய மொழிகளில் பாதுகாக்கும் வரலாற்றுத் தளம்.',
    exploreHistoryBtn: 'வரலாற்றை ஆராய்க',
    communityHeritageBtn: 'சமூக பாரம்பரியம்',
    whyVisitKicker: 'ஆவணக் காப்பக நோக்கம் & ஆராய்ச்சி',
    whyVisitTitle: 'எங்கள் இணையதளத்தை ஏன் பார்வையிட வேண்டும்',
    whyVisitSubtitle:
      'இந்த இணையதளத்தின் ஒவ்வொரு வரலாற்றுத் தகவலும் தௌலி, ஹாத்திகும்பா, லிங்கராஜா மற்றும் வெலிகலனி போன்ற முதன்மைக் கல்வெட்டுகள் மற்றும் செப்பேடுகளின் அடிப்படையில் அமைந்துள்ளது.',
    whyPillars: [
      {
        id: 'why-epigraphy',
        iconWebp: ASSET_WEBP('icon-inscriptions.webp'),
        title: 'உறுதிப்படுத்தப்பட்ட கல்வெட்டு & செப்பேட்டுச் சான்றுகள்',
        description:
          'தௌலி (கி.மு. 261), ஹாத்திகும்பா, லிங்கராஜா (1452 CE) மற்றும் வெலிகலனி செப்பேடுகளின் (1458 CE) நேரடி ஆதாரங்கள்.',
        path: '/inscriptions',
        cta: 'கல்வெட்டுகளைக் காண்க'
      },
      {
        id: 'why-lineage',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        title: 'தொடர்ச்சியான சூரியவம்ச அரச வம்சாவளி',
        description:
          'வேதகால இக்ஷ்வாகு முன்னோடிகள் மற்றும் கலிங்க மன்னர்கள் முதல் கபிலேந்திர தேவ, புருஷோத்தம தேவ மற்றும் பிரதாபருத்ர தேவ கஜபதி வரையிலான வம்சாவளி.',
        path: '/genealogy',
        cta: 'வம்சாவளியைக் காண்க'
      },
      {
        id: 'why-surnames',
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        title: 'அகில இந்திய குலப்பெயர்கள் & கோத்திரத் தொகுப்பு',
        description:
          '18 வரலாற்றுப் பெயர்கள், அரச கோத்திரங்கள், தென்னிந்திய ஒடியராஜு மற்றும் வட இந்திய ஓட்-ராஜ்புத் குலப்பெயர்கள்.',
        path: '/community-surnames',
        cta: 'குலப்பெயர்களைக் காண்க'
      },
      {
        id: 'why-multilingual',
        iconWebp: ASSET_WEBP('icon-articles.webp'),
        title: '8 மொழிகளில் ஆய்வுக் கட்டுரைகள் & PDF',
        description:
          'தமிழ், ஆங்கிலம், இந்தி, தெலுங்கு, கன்னடம், மராத்தி, ஒடியா மற்றும் வங்காள மொழிகளில் முழு வரலாற்று ஆவணங்களைப் படியுங்கள்.',
        path: '/documentary',
        cta: 'கட்டுரைகளைப் படிக்க'
      }
    ],
    fiveCategoriesKicker: 'அரச ஆவணப் பிரிவுகள்',
    fiveCategoriesTitle: 'எங்கள் அரச பாரம்பரியத்தின் ஐந்து முக்கியத் தூண்கள்',
    fiveCategoriesSubtitle:
      'சமூக பாரம்பரியம், வரலாற்று ஆளுமைகள், அரச வம்சங்கள், வரலாற்றுக் கட்டுரைகள் மற்றும் ஆவணக் காப்பகத்தை நேரடியாக ஆராயுங்கள்.',
    fiveCategories: [
      {
        id: 'cat-community-heritage',
        title: 'சமூக பாரம்பரியம்',
        subtitle: '18 வரலாற்றுப் பெயர்கள் • கோத்திரங்கள் • மரபுகள்',
        description:
          'ஒடியராஜு / ஒட்ர-சத்திரிய / ஓட் சமூகத்தின் அகில இந்திய அடையாளம், பண்பாட்டு மரபுகள் மற்றும் வரலாற்றுப் பரவல்.',
        iconWebp: ASSET_WEBP('icon-community.webp'),
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        path: '/community-heritage',
        cta: 'சமூக பாரம்பரியம் காண்க'
      },
      {
        id: 'cat-historical-personages',
        title: 'வரலாற்று ஆளுமைகள்',
        subtitle: 'பேரரசர்கள் • அரசிகள் • தளபதிகள் • ராஜகுருக்கள்',
        description:
          'பேரரசர் காரவேலன், கபிலேந்திர தேவர், புருஷோத்தம தேவர், பிரதாபருத்ர தேவர், பக்ஸி ஜகபந்து மற்றும் 20+ ஆளுமைகளின் வரலாறு.',
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        path: '/kings-queens',
        cta: 'வரலாற்று ஆளுமைகளைக் காண்க'
      },
      {
        id: 'cat-royal-dynasties',
        title: 'அரச வம்சங்கள்',
        subtitle: 'இக்ஷ்வாகு • சேதி-கலிங்கம் • கீழைக் கங்கர் • கஜபதி',
        description:
          'ஒட்ர தேசம், திரிகலிங்கம் மற்றும் கங்கை முதல் காவிரி வரை பரவிய சூரியவம்ச கஜபதி பேரரசின் வம்ச வரலாறு.',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        bannerWebp: ASSET_WEBP('banner-royal-battle.webp'),
        path: '/gajapathi-kings',
        cta: 'அரச வம்சங்களை ஆராய்க'
      },
      {
        id: 'cat-historical-monographs',
        title: 'வரலாற்று ஆய்வுக் கட்டுரைகள்',
        subtitle: 'ஆய்வு அத்தியாயங்கள் • கல்வெட்டுச் சான்றுகள் • PDF',
        description:
          'கலிங்கப் போர் (கி.மு. 261), ஒட்ர பேரரசு, கோயில் கட்டிடக்கலை மற்றும் செப்பேடுகள் குறித்த விரிவான ஆய்வுக் கட்டுரைகள்.',
        iconWebp: ASSET_WEBP('icon-monographs.webp'),
        bannerWebp: ASSET_WEBP('banner-inscription-stone.webp'),
        path: '/documentary',
        cta: 'கட்டுரைகளைப் படிக்க'
      },
      {
        id: 'cat-gallery-archives',
        title: 'காட்சியகம் & ஆவணக் காப்பகம்',
        subtitle: 'கல்வெட்டுகள் • கோட்டைகள் • கோயில்கள் • செப்பேடுகள்',
        description:
          'கொனார்க் சூரிய கோயில், பூரி ஜெகந்நாதர், பாராபதி கோட்டை, உதயகிரி குகைகள் மற்றும் ஓலைச்சுவடிகளின் காட்சியகம்.',
        iconWebp: ASSET_WEBP('icon-gallery.webp'),
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        path: '/gallery',
        cta: 'காட்சியகத்தைத் திறக்கவும்'
      }
    ],
    featuredArticlesKicker: 'தேர்ந்தெடுக்கப்பட்ட வரலாற்று ஆய்வுகள்',
    featuredArticlesTitle: 'முக்கிய வரலாற்றுக் கட்டுரைகள்',
    featuredArticlesSubtitle:
      'முதன்மைக் கல்வெட்டு ஆதாரங்கள் மற்றும் 8 மொழிபெயர்ப்புகளுடன் கூடிய வரலாற்று ஆய்வுக் கட்டுரைகள்.',
    readArticleCta: 'கட்டுரையைப் படிக்க',
    showAllArticlesBtn: count => `அனைத்து ${count} வரலாற்றுக் கட்டுரைகளையும் காண்க`,
    showFeaturedSixBtn: 'முக்கிய 6 கட்டுரைகளைக் காண்க',
    timelineKicker: '2,500+ ஆண்டுகால ஆவணப்படுத்தப்பட்ட வரலாறு',
    timelineTitle: 'வரலாற்றுக் காலவரிசை முன்னோட்டம்',
    timelineSubtitle:
      'பண்டைய ஒட்ர-கலிங்கம் மற்றும் கலிங்கப் போர் (கி.மு. 261) முதல் சூரியவம்ச கஜபதி பேரரசின் எழுச்சி வரையிலான முக்கிய நிகழ்வுகள்.',
    openFullTimelineBtn: 'முழு காலவரிசையை ஆராய்க',
    communityHighlightsKicker: 'வாழும் அரச வம்சம் & பண்பாட்டு அடையாளம்',
    communityHighlightsTitle: 'சமூக பாரம்பரியச் சிறப்பம்சங்கள்',
    communityHighlightsSubtitle:
      'சூரியவம்ச ஒடியராஜு சத்திரிய சமூகத்தின் புவியியல் பரவல், அரச குலப்பெயர்கள் மற்றும் முக்கிய ஆளுமைகள்.',
    communityHighlightsCards: [
      {
        id: 'hl-odra-desha',
        era: 'பண்டைய & கடல்சார் பேரரசு',
        title: 'ஒட்ர தேசம், கலிங்கம் & திரிகலிங்கப் புவியியல்',
        subtitle: 'மகாநதி • கோதாவரி • ரிஷிகுல்யா • வங்காள விரிகுடா',
        description:
          'பண்டைய ஒட்ர தேசத்தின் கோட்டைகள், கடல்சார் வணிகப் பாதைகள் மற்றும் புனிதக் கோயில் தலைநகரங்களின் வரலாறு.',
        bannerWebp: ASSET_WEBP('banner-map-odra-desha.webp'),
        iconWebp: ASSET_WEBP('icon-geography.webp'),
        path: '/odra-desha',
        cta: 'ஒட்ர தேசம் காண்க'
      },
      {
        id: 'hl-south-surnames',
        era: 'தக்காணம் & ஆந்திரா',
        title: 'தென்னிந்திய ஒடியராஜு குலப்பெயர்கள் & கோத்திரங்கள்',
        subtitle: 'ராஜு • வர்மா • கஜபதி • சூரியवंशக் குலங்கள்',
        description:
          'ஆந்திரா, தெலுங்கானா, கர்நாடகா மற்றும் தமிழ்நாட்டில் உள்ள அரச குலப்பெயர்கள் மற்றும் கோத்திரங்களின் தொகுப்பு.',
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        path: '/community-surnames',
        cta: 'தென்னிந்திய குலப்பெயர்கள்'
      },
      {
        id: 'hl-north-surnames',
        era: 'வட & மேற்கு இந்தியா',
        title: 'வட இந்திய ஓட்-ராஜ்புத் குலங்கள் & படிக்கிணறு கட்டிடக்கலை',
        subtitle: 'ராஜஸ்தான் • குஜராத் • மத்தியப் பிரதேசம் • டெல்லி',
        description:
          'பகீரத சூரியவம்ச ஓட்-ராஜ்புத் குலங்கள், அரச கோட்டைகள் மற்றும் நீர்நிலைக் கட்டிடக்கலை ஆவணங்கள்.',
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-community.webp'),
        path: '/community-surnames-north-indian-oad-community',
        cta: 'வட இந்திய குலப்பெயர்கள்'
      },
      {
        id: 'hl-prominent-persons',
        era: 'பேரரசர்கள் & ஆளுமைகள்',
        title: '20+ சமூகத்தின் முக்கிய ஆளுமைகள்',
        subtitle: 'மன்னர்கள் • விடுதலைப் போராட்ட வீரர்கள் • முனிவர்கள்',
        description:
          'மகரிஷி பகீரதன், பேரரசர் கபிலேந்திர தேவர், சிவயோகி சித்தராமேஸ்வரர், பக்ஸி ஜகபந்து மற்றும் ஜயி ராஜகுரு வரலாறு.',
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        path: '/community-prominent-persons',
        cta: 'முக்கிய ஆளுமைகளைக் காண்க'
      }
    ],
    footerQuickLinksTitle: 'வரலாற்று ஆவணப்படம்',
    footerEpigraphyTitle: 'கல்வெட்டுகள் & ஆவணகம்',
    footerCommunityTitle: 'சமூகம் & குலப்பெயர்கள்',
    footerContactTitle: 'தொடர்பு & ஆதாரம்',
    footerBrandSummary:
      'கல்வெட்டு ஆராய்ச்சி, ஒட்ர தேசத்தின் வரலாற்றுப் புவியியல், சூர்யவம்ச கஜபதி பேரரசின் கல்வெட்டுகள், அரச வம்சாவளிகள் மற்றும் 8 மொழிகளில் வாழும் கலாச்சார மரபுகளைப் பாதுகாப்பதற்காக அர்ப்பணிக்கப்பட்டது.',
    footerRights: 'அனைத்து வரலாற்று ஆவணங்களும் மொழிபெயர்ப்புகளும் பாதுகாக்கப்பட்டவை.'
  },
  mr: {
    headerBadge: 'सूर्यवंश इक्ष्वाकू • ओड्र देश • गजपती शाही वारसा',
    viewTestPageBtn: 'View Original Layout – Test Page',
    searchLabel: 'अभिलेखागार शोधा',
    heroSuperBadge: 'सूर्यवंश ओडियाराजु क्षत्रिय ऐतिहासिक माहितीपट',
    heroTitle: 'ओड्र देश, कलिंग आणि सूर्यवंशी गजपती साम्राज्याचा सार्वभौम वारसा',
    heroSubtitle:
      '२,५००+ वर्षांचे सूर्यवंशी सम्राट, शिलालेख, ताम्रपट आणि अखिल भारतीय क्षत्रिय वारसा',
    heroDescription:
      'प्राथमिक शिलालेख, राजवंशावळी, मंदिर स्थापत्य आणि ओडियाराजु / ओड्र-क्षत्रिय / ओड-राजपूत समाजाचा सांस्कृतिक वारसा ८ भारतीय भाषांमध्ये जतन करणारे अधिकृत पोर्टल.',
    exploreHistoryBtn: 'इतिहास जाणून घ्या',
    communityHeritageBtn: 'सामुदायिक वारसा',
    whyVisitKicker: 'अभिलेखीय उद्दिष्ट आणि संशोधन कार्य',
    whyVisitTitle: 'आमच्या वेबसाईटला का भेट द्यावी',
    whyVisitSubtitle:
      'या पोर्टलवरील प्रत्येक ऐतिहासिक माहिती धौली, हाथीगुम्फा, लिंगराज आणि वेलिगालनी यांसारख्या प्राथमिक शिलालेख व ताम्रपटांवर आधारित आहे.',
    whyPillars: [
      {
        id: 'why-epigraphy',
        iconWebp: ASSET_WEBP('icon-inscriptions.webp'),
        title: 'प्रमाणित शिलालेख व ताम्रपट पुरावे',
        description:
          'धौली (इ.स.पू. २६१), हाथीगुम्फा, लिंगराज (१४५२ इ.स.) आणि वेलिगालनी ताम्रपटांचे (१४५८ इ.स.) मूळ संदर्भ.',
        path: '/inscriptions',
        cta: 'शिलालेख पहा'
      },
      {
        id: 'why-lineage',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        title: 'अखंड सूर्यवंश राजवंशावळ',
        description:
          'वैदिक इक्ष्वाकू पूर्वज आणि कलिंग सम्राटांपासून कपिलेंद्र देव, पुरुषोत्तम देव आणि प्रतापरुद्र देव गजपतींपर्यंतची वंशावळ.',
        path: '/genealogy',
        cta: 'राजवंशावळ पहा'
      },
      {
        id: 'why-surnames',
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        title: 'अखिल भारतीय आडनावे व गोत्र निर्देशिका',
        description:
          '१८ ऐतिहासिक नावे, शाही गोत्रे, दक्षिण भारतीय ओडियाराजु आणि उत्तर भारतीय ओड-राजपूत कुळांचे संकलन.',
        path: '/community-surnames',
        cta: 'आडनावे पहा'
      },
      {
        id: 'why-multilingual',
        iconWebp: ASSET_WEBP('icon-articles.webp'),
        title: '८ भाषांमध्ये संशोधन मोनोग्राफ व PDF',
        description:
          'मराठी, इंग्रजी, हिंदी, तेलुगू, कन्नड, तमिळ, ओडिया आणि बंगाली भाषेत संपूर्ण ऐतिहासिक मोनोग्राफ वाचा.',
        path: '/documentary',
        cta: 'मोनोग्राफ वाचा'
      }
    ],
    fiveCategoriesKicker: 'शाही अभिलेखीय विभाग',
    fiveCategoriesTitle: 'आमच्या शाही वारशाचे पाच प्रमुख स्तंभ',
    fiveCategoriesSubtitle:
      'सामुदायिक वारसा, ऐतिहासिक विभूती, राजवंश, ऐतिहासिक मोनोग्राफ आणि गॅलरी अभिलेखागार थेट पहा.',
    fiveCategories: [
      {
        id: 'cat-community-heritage',
        title: 'सामुदायिक वारसा',
        subtitle: '१८ ऐतिहासिक नावे • गोत्रे • क्षत्रिय परंपरा',
        description:
          'ओडियाराजु / ओड्र-क्षत्रिय / ओड समाजाची अखिल भारतीय ओळख, परंपरा आणि ऐतिहासिक विस्तार.',
        iconWebp: ASSET_WEBP('icon-community.webp'),
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        path: '/community-heritage',
        cta: 'सामुदायिक वारसा पहा'
      },
      {
        id: 'cat-historical-personages',
        title: 'ऐतिहासिक विभूती',
        subtitle: 'सम्राट • महाराण्या • सेनापती • राजगुरू',
        description:
          'सम्राट खारवेल, कपिलेंद्र देव, पुरुषोत्तम देव, प्रतापरुद्र देव, बक्सी जगबंधू आणि २०+ ऐतिहासिक व्यक्तींची चरित्रे.',
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        path: '/kings-queens',
        cta: 'ऐतिहासिक विभूती पहा'
      },
      {
        id: 'cat-royal-dynasties',
        title: 'शाही राजवंश',
        subtitle: 'इक्ष्वाकू • चेदि-कलिंग • पूर्व गंग • गजपती',
        description:
          'ओड्र देश, त्रिकलिंग आणि गंगेपासून कावेरीपर्यंत पसरलेल्या सूर्यवंशी गजपती साम्राज्याच्या राजवंशांचा इतिहास.',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        bannerWebp: ASSET_WEBP('banner-royal-battle.webp'),
        path: '/gajapathi-kings',
        cta: 'राजवंश जाणून घ्या'
      },
      {
        id: 'cat-historical-monographs',
        title: 'ऐतिहासिक मोनोग्राफ',
        subtitle: 'संशोधन प्रकरणे • शिलालेख संदर्भ • PDF',
        description:
          'कलिंग युद्ध (इ.स.पू. २६१), ओड्र साम्राज्य, मंदिर स्थापत्य आणि ताम्रपट शिलालेखांवरील सखोल संशोधन लेख.',
        iconWebp: ASSET_WEBP('icon-monographs.webp'),
        bannerWebp: ASSET_WEBP('banner-inscription-stone.webp'),
        path: '/documentary',
        cta: 'मोनोग्राफ वाचा'
      },
      {
        id: 'cat-gallery-archives',
        title: 'गॅलरी आणि अभिलेखागार',
        subtitle: 'शिलालेख • किल्ले • मंदिरे • ताम्रपट',
        description:
          'कोणार्क सूर्य मंदिर, पुरी जगन्नाथ, बाराबती किल्ला, उदयगिरी लेणी आणि ताडपत्र हस्तलिखितांचे दृश्य संग्रहालय.',
        iconWebp: ASSET_WEBP('icon-gallery.webp'),
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        path: '/gallery',
        cta: 'गॅलरी आणि अभिलेखागार उघडा'
      }
    ],
    featuredArticlesKicker: 'निवडक ऐतिहासिक संशोधन',
    featuredArticlesTitle: 'प्रमुख ऐतिहासिक लेख',
    featuredArticlesSubtitle:
      'प्राथमिक शिलालेख संदर्भ आणि ८ भाषांमधील भाषांतरासह प्रमाणित ऐतिहासिक संशोधन लेख.',
    readArticleCta: 'लेख वाचा',
    showAllArticlesBtn: count => `सर्व ${count} ऐतिहासिक लेख पहा`,
    showFeaturedSixBtn: 'प्रमुख ६ लेख दर्शवा',
    timelineKicker: '२,५००+ वर्षांचा प्रमाणित इतिहास',
    timelineTitle: 'ऐतिहासिक कालपट (Timeline) झलक',
    timelineSubtitle:
      'प्राचीन ओड्र-कलिंग आणि कलिंग युद्धापासून (इ.स.पू. २६१) सूर्यवंशी गजपती साम्राज्याच्या उत्कर्षापर्यंतचे महत्त्वाचे टप्पे.',
    openFullTimelineBtn: 'संपूर्ण इंटरॅक्टिव्ह कालपट पहा',
    communityHighlightsKicker: 'जिवंत राजवंश आणि सांस्कृतिक ओळख',
    communityHighlightsTitle: 'सामुदायिक वारशाची प्रमुख वैशिष्ट्ये',
    communityHighlightsSubtitle:
      'सूर्यवंश ओडियाराजु क्षत्रिय समाजाचा भौगोलिक विस्तार, शाही आडनावे आणि प्रमुख व्यक्तींची माहिती.',
    communityHighlightsCards: [
      {
        id: 'hl-odra-desha',
        era: 'प्राचीन व सागरी साम्राज्य',
        title: 'ओड्र देश, कलिंग व त्रिकलिंग भूगोल',
        subtitle: 'महानदी • गोदावरी • ऋषिकुल्या • बंगालचा उपसागर',
        description:
          'प्राचीन ओड्र देशाचे किल्ले, सागरी व्यापारी मार्ग आणि पवित्र मंदिर राजधान्यांचा इतिहास.',
        bannerWebp: ASSET_WEBP('banner-map-odra-desha.webp'),
        iconWebp: ASSET_WEBP('icon-geography.webp'),
        path: '/odra-desha',
        cta: 'ओड्र देश पहा'
      },
      {
        id: 'hl-south-surnames',
        era: 'दख्खन व आंध्र प्रदेश',
        title: 'दक्षिण भारतीय ओडियाराजु आडनावे व गोत्रे',
        subtitle: 'राजु • वर्मा • गजपती • सूर्यवंशी कुळे',
        description:
          'महाराष्ट्र, कर्नाटक, आंध्र प्रदेश आणि तेलंगणातील शाही आडनावे, वशिष्ठ व कौंडिण्य गोत्रांची प्रमाणित यादी.',
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        path: '/community-surnames',
        cta: 'दक्षिण भारतीय आडनावे'
      },
      {
        id: 'hl-north-surnames',
        era: 'उत्तर व पश्चिम भारत',
        title: 'उत्तर भारतीय ओड-राजपूत कुळे व बारव स्थापत्य',
        subtitle: 'राजस्थान • गुजरात • मध्य प्रदेश • दिल्ली',
        description:
          'भगीरथ सूर्यवंशी ओड-राजपूत कुळे, शाही किल्ले आणि ऐतिहासिक जल-स्थापत्याचे (बारव) दस्तऐवजीकरण.',
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-community.webp'),
        path: '/community-surnames-north-indian-oad-community',
        cta: 'उत्तर भारतीय आडनावे'
      },
      {
        id: 'hl-prominent-persons',
        era: 'सम्राट व महापुरुष',
        title: '२०+ समाजातील प्रमुख व्यक्ती',
        subtitle: 'सम्राट • स्वातंत्र्यसेनानी • शिवयोगी • नेते',
        description:
          'महर्षी भगीरथ, सम्राट कपिलेंद्र देव, शिवयोगी सिद्धरामेश्वर, बक्सी जगबंधू आणि जयी राजगुरू यांची चरित्रे.',
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        path: '/community-prominent-persons',
        cta: 'प्रमुख व्यक्ती पहा'
      }
    ],
    footerQuickLinksTitle: 'ऐतिहासिक माहितीपट',
    footerEpigraphyTitle: 'शिलालेख आणि अभिलेखागार',
    footerCommunityTitle: 'समुदाय आणि आडनावे',
    footerContactTitle: 'संपर्क आणि श्रेय',
    footerBrandSummary:
      'शिलालेख संशोधन, ओड्र देशाचा ऐतिहासिक भूगोल, सूर्यवंश गजपती राजवंशाचे शिलालेख, राजवंशावळी आणि आठ भाषांमध्ये जिवंत सांस्कृतिक परंपरांच्या जतनासाठी समर्पित.',
    footerRights: 'सर्व ऐतिहासिक नोंदी आणि भाषांतरे राखीव.'
  },
  or: {
    headerBadge: 'ସୂର୍ଯ୍ୟବଂଶ ଇକ୍ଷ୍ୱାକୁ • ଓଡ଼୍ର ଦେଶ • ଗଜପତି ରାଜକୀୟ ଐତିହ୍ୟ',
    viewTestPageBtn: 'View Original Layout – Test Page',
    searchLabel: 'ଅଭିଲେଖାଗାର ଖୋଜନ୍ତୁ',
    heroSuperBadge: 'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ',
    heroTitle: 'ଓଡ଼୍ର ଦେଶ, କଳିଙ୍ଗ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟର ସାର୍ବଭୌମ ଐତିହ୍ୟ',
    heroSubtitle:
      '୨,୫୦୦+ ବର୍ଷର ସୂର୍ଯ୍ୟବଂଶୀ ସମ୍ରାଟ, ଶିଳାଲେଖ, ତାମ୍ରଶାସନ ଓ ଅଖିଳ ଭାରତୀୟ କ୍ଷତ୍ରିୟ ଐତିହ୍ୟ',
    heroDescription:
      'ପ୍ରାଥମିକ ଶିଳାଲେଖ, ରାଜବଂଶାବଳୀ, ମନ୍ଦିର ସ୍ଥାପତ୍ୟ ଏବଂ ଓଡ଼ିଆରାଜୁ / ଓଡ଼୍ର-କ୍ଷତ୍ରିୟ / ଓଡ଼-ରାଜପୁତ ସମ୍ପ୍ରଦାୟର ଐତିହ୍ୟକୁ ୮ଟି ଭାରତୀୟ ଭାଷାରେ ସଂରକ୍ଷଣ କରୁଥିବା ପୋର୍ଟାଲ୍।',
    exploreHistoryBtn: 'ଇତିହାସ ଅନ୍ୱେଷଣ କରନ୍ତୁ',
    communityHeritageBtn: 'ସାମୁଦାୟିକ ଐତିହ୍ୟ',
    whyVisitKicker: 'ଅଭିଲେଖାଗାର ଲକ୍ଷ୍ୟ ଓ ଗବେଷଣା ଉଦ୍ଦେଶ୍ୟ',
    whyVisitTitle: 'ଆମ ୱେବସାଇଟ୍ କାହିଁକି পরিଦର୍ଶନ କରିବେ',
    whyVisitSubtitle:
      'ଏହି ପୋର୍ଟାଲର ପ୍ରତ୍ୟେକ ଐତିହାସିକ ତଥ୍ୟ ଧଉଳି, ହାତୀଗୁମ୍ଫା, ଲିଙ୍ଗରାଜ ଏବଂ ବେଲିଗଲନି ଭଳି ପ୍ରାଥମିକ ଶିଳାଲେଖ ଓ ତାମ୍ରଶାସନ ଉପରେ ଆଧାରିତ।',
    whyPillars: [
      {
        id: 'why-epigraphy',
        iconWebp: ASSET_WEBP('icon-inscriptions.webp'),
        title: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ ଓ ତାମ୍ରଶାସନ ପ୍ରମାଣ',
        description:
          'ଧଉଳି (ଖ୍ରୀ.ପୂ. ୨୬୧), ହାତୀଗୁମ୍ଫା, ଲିଙ୍ଗରାଜ (୧୪୫୨ ଖ୍ରୀ.ଅ.) ଏବଂ ବେଲିଗଲନି ତାମ୍ରଶାସନର (୧୪୫୮ ଖ୍ରୀ.ଅ.) ମୂଳ ଉদ্ধୃତି।',
        path: '/inscriptions',
        cta: 'ଶିଳାଲେଖ ଦେଖନ୍ତୁ'
      },
      {
        id: 'why-lineage',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        title: 'ଅବିଚ୍ଛିନ୍ନ ସୂର୍ଯ୍ୟବଂଶ ରାଜବଂଶାବଳୀ',
        description:
          'ବୈଦିକ ଇକ୍ଷ୍ୱାକୁ ଆଦି-ପୁରୁଷ ଓ କଳିଙ୍ଗ ସମ୍ରାଟମାନଙ୍କଠାରୁ କପିଳେନ୍ଦ୍ର ଦେବ, ପୁରୁଷୋତ୍ତମ ଦେବ ଓ ପ୍ରତାପରୁଦ୍ର ଦେବ ଗଜପତିଙ୍କ ପର୍ଯ୍ୟନ୍ତ ବଂଶାବଳୀ।',
        path: '/genealogy',
        cta: 'ରାଜବଂଶାବଳୀ ଦେଖନ୍ତୁ'
      },
      {
        id: 'why-surnames',
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        title: 'ଅଖିଳ ଭାରତୀୟ ସାଙ୍ଗିଆ ଓ ଗୋତ୍ର ନିର୍ଦ୍ଦେଶିକା',
        description:
          '୧୮ଟି ଐତିହାସିକ ନାମ, ରାଜକୀୟ ଗୋତ୍ର, ଦକ୍ଷିଣ ଭାରତୀୟ ଓଡ଼ିଆରାଜୁ ଏବଂ ଉତ୍ତର ଭାରତୀୟ ଓଡ଼-ରାଜପୁତ ବଂଶର ସଂକଳନ।',
        path: '/community-surnames',
        cta: 'ସାଙ୍ଗିଆ ଦେଖନ୍ତୁ'
      },
      {
        id: 'why-multilingual',
        iconWebp: ASSET_WEBP('icon-articles.webp'),
        title: '୮ଟି ଭାଷାରେ ଗବେଷଣା ମୋନୋଗ୍ରାଫ୍ ଓ PDF',
        description:
          'ଓଡ଼ିଆ, ଇଂରାଜୀ, ହିନ୍ଦୀ, ତେଲୁଗୁ, କନ୍ନଡ଼, ତାମିଲ, ମରାଠୀ ଓ ବଙ୍ଗାଳୀ ଭାଷାରେ ସମ୍ପୂର୍ଣ୍ଣ ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ ପଢ଼ନ୍ତୁ।',
        path: '/documentary',
        cta: 'ମୋନୋଗ୍ରାଫ୍ ପଢ଼ନ୍ତୁ'
      }
    ],
    fiveCategoriesKicker: 'ରାଜକୀୟ ଅଭିଲେଖ ବିଭାଗ',
    fiveCategoriesTitle: 'ଆମ ରାଜକୀୟ ଐତିହ୍ୟର ପାଞ୍ଚটি ପ୍ରମୁଖ ସ୍ତମ୍ଭ',
    fiveCategoriesSubtitle:
      'ସାମୁଦାୟିକ ଐତିହ୍ୟ, ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ, ରାଜବଂଶ, ଐତିହାସିକ ମୋନୋଗ୍ରାଫ୍ ଏବଂ ଗ୍ୟାଲେରୀ ଅଭିଲେଖାଗାରକୁ ସିଧାସଳଖ ଦେଖନ୍ତୁ।',
    fiveCategories: [
      {
        id: 'cat-community-heritage',
        title: 'ସାମୁଦାୟିକ ଐତିହ୍ୟ',
        subtitle: '୧୮ଟି ଐତିହାସିକ ନାମ • ଗୋତ୍ର • କ୍ଷତ୍ରିୟ ପରମ୍ପରା',
        description:
          'ଓଡ଼ିଆରାଜୁ / ଓଡ଼୍ର-କ୍ଷତ୍ରିୟ / ଓଡ଼ ସମ୍ପ୍ରଦାୟର ଅଖିଳ ଭାରତୀୟ ପରିଚୟ, ପରମ୍ପରା ଏବଂ ଐତିହାସିକ ବିସ୍ତାର।',
        iconWebp: ASSET_WEBP('icon-community.webp'),
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        path: '/community-heritage',
        cta: 'ସାମୁଦାୟିକ ଐତିହ୍ୟ ଦେଖନ୍ତୁ'
      },
      {
        id: 'cat-historical-personages',
        title: 'ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ',
        subtitle: 'ସମ୍ରାଟ • ମହାରାଣୀ • ସେନାପତି • ରାଜଗୁରୁ',
        description:
          'ସମ୍ରାଟ ଖାରବେଳ, କପିଳେନ୍ଦ୍ର ଦେବ, ପୁରୁଷୋତ୍ତମ ଦେବ, ପ୍ରତାପରୁଦ୍ର ଦେବ, ବକ୍ସି ଜଗବନ୍ଧୁ ଏବଂ ୨୦+ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱଙ୍କ ଜୀବନୀ।',
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        path: '/kings-queens',
        cta: 'ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ ଦେଖନ୍ତୁ'
      },
      {
        id: 'cat-royal-dynasties',
        title: 'ରାଜବଂଶ',
        subtitle: 'ଇକ୍ଷ୍ୱାକୁ • ଚେଦି-କଳିଙ୍ଗ • ପୂର୍ବ ଗଙ୍ଗ • ଗଜପତି',
        description:
          'ଓଡ଼୍ର ଦେଶ, ତ୍ରିକଳିଙ୍ଗ ଏବଂ ଗଙ୍ଗାରୁ କାବେରୀ ପର୍ଯ୍ୟନ୍ତ ବିସ୍ତୃତ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟର ରାଜବଂଶ ଇତିହାସ।',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        bannerWebp: ASSET_WEBP('banner-royal-battle.webp'),
        path: '/gajapathi-kings',
        cta: 'ରାଜବଂଶ ଅନ୍ୱେଷଣ କରନ୍ତୁ'
      },
      {
        id: 'cat-historical-monographs',
        title: 'ଐତିହାସିକ ମୋନୋଗ୍ରାଫ୍',
        subtitle: 'ଗବେଷଣା ଅଧ୍ୟାୟ • ଶିଳାଲେଖ ପ୍ରମାଣ • PDF',
        description:
          'କଳିଙ୍ଗ ଯୁଦ୍ଧ (ଖ୍ରୀ.ପୂ. ୨୬୧), ଓଡ଼୍ର ସାମ୍ରାଜ୍ୟ, ମନ୍ଦିର ସ୍ଥାପତ୍ୟ ଏବଂ ତାମ୍ରଶାସନ ଉପରେ ବିସ୍ତୃତ ଗବେଷଣା ଗ୍ରନ୍ଥ।',
        iconWebp: ASSET_WEBP('icon-monographs.webp'),
        bannerWebp: ASSET_WEBP('banner-inscription-stone.webp'),
        path: '/documentary',
        cta: 'ମୋନୋଗ୍ରାଫ୍ ପଢ଼ନ୍ତୁ'
      },
      {
        id: 'cat-gallery-archives',
        title: 'ଗ୍ୟାଲେରୀ ଓ ଅଭିଲେଖାଗାର',
        subtitle: 'ଶିଳାଲେଖ • ଦୁର୍ଗ • ମନ୍ଦିର • ତାମ୍ରଶାସନ',
        description:
          'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର, ପୁରୀ ଜଗନ୍ନାଥ, ବାରବାଟୀ ଦୁର୍ଗ, ଉଦୟଗିରି ଗୁମ୍ଫା ଏବଂ ତାଳପତ୍ର ପୋଥିର ଦୃଶ୍ୟ ସଂଗ୍ରହାଳୟ।',
        iconWebp: ASSET_WEBP('icon-gallery.webp'),
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        path: '/gallery',
        cta: 'ଗ୍ୟାଲେରୀ ଓ ଅଭିଲେଖାଗାର ଖୋଲନ୍ତୁ'
      }
    ],
    featuredArticlesKicker: 'নির্বাচিত ଐତିହାସିକ ଗବେଷଣା',
    featuredArticlesTitle: 'ପ୍ରମୁଖ ଐତିହାସିକ ପ୍ରବନ୍ଧ',
    featuredArticlesSubtitle:
      'ପ୍ରାଥମିକ ଶିଳାଲେଖ ପ୍ରମାଣ ଏବଂ ୮ଟି ଭାଷାର ଅନୁବାଦ ସହିତ ପ୍ରମାଣିତ ଐତିହାସିକ ଗବେଷଣା ପ୍ରବନ୍ଧ।',
    readArticleCta: 'ପ୍ରବନ୍ଧ ପଢ଼ନ୍ତୁ',
    showAllArticlesBtn: count => `ସମସ୍ତ ${count} ଐତିହାସିକ ପ୍ରବନ୍ଧ ଦେଖନ୍ତୁ`,
    showFeaturedSixBtn: 'ପ୍ରମୁଖ ୬ଟି ପ୍ରବନ୍ଧ ଦେଖନ୍ତୁ',
    timelineKicker: '୨,୫୦୦+ ବର୍ଷର ପ୍ରମାଣିତ ଇତିହାସ',
    timelineTitle: 'ଐତିହାସିକ ସମୟরেଖା (Timeline) ଝଲକ',
    timelineSubtitle:
      'ପ୍ରାଚୀନ ଓଡ଼୍ର-କଳିଙ୍ଗ ଓ କଳିଙ୍ଗ ଯୁଦ୍ଧରୁ (ଖ୍ରୀ.ପୂ. ୨୬୧) ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟର ଉତ୍କର୍ଷ ପର୍ଯ୍ୟନ୍ତ ପ୍ରମୁଖ ଘଟଣାବଳୀ।',
    openFullTimelineBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ଇଣ୍ଟରାକ୍ଟିଭ୍ ସମୟରେଖା ଦେଖନ୍ତୁ',
    communityHighlightsKicker: 'ଜୀବନ୍ତ ରାଜବଂଶ ଓ ସାଂସ୍କୃତିକ ପରିଚୟ',
    communityHighlightsTitle: 'ସାମୁଦାୟିକ ଐତିହ୍ୟର ପ୍ରମୁଖ ବିଶେଷତ୍ୱ',
    communityHighlightsSubtitle:
      'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ସମ୍ପ୍ରଦାୟର ଭୌଗୋଳିକ ବିସ୍ତାର, ରାଜକୀୟ ସାଙ୍ଗିଆ ଏବଂ ପ୍ରମୁଖ ବ୍ୟକ୍ତିତ୍ୱଙ୍କ ବିବରଣୀ।',
    communityHighlightsCards: [
      {
        id: 'hl-odra-desha',
        era: 'ପ୍ରାଚୀନ ଓ ସାମୁଦ୍ରିକ ସାମ୍ରାଜ୍ୟ',
        title: 'ଓଡ଼୍ର ଦେଶ, କଳିଙ୍ଗ ଓ ତ୍ରିକଳିଙ୍ଗ ଭୂଗୋଳ',
        subtitle: 'ମହାନଦୀ • ଗୋଦାବରୀ • ଋଷିକୁଲ୍ୟା • ବଙ୍ଗୋପସାଗର',
        description:
          'ପ୍ରାଚୀନ ଓଡ଼୍ର ଦେଶର ଦୁର୍ଗ, ସାମୁଦ୍ରିକ ବାଣିଜ୍ୟ ପଥ ଏବଂ ପବିତ୍ର ମନ୍ଦିର ରାଜଧାନୀମାନଙ୍କର ଇତିହାସ।',
        bannerWebp: ASSET_WEBP('banner-map-odra-desha.webp'),
        iconWebp: ASSET_WEBP('icon-geography.webp'),
        path: '/odra-desha',
        cta: 'ଓଡ଼୍ର ଦେଶ ଦେଖନ୍ତୁ'
      },
      {
        id: 'hl-south-surnames',
        era: 'ଦাক্ষିଣାତ୍ୟ ଓ ଉପକୂଳ ଆନ୍ଧ୍ର',
        title: 'ଦକ୍ଷିଣ ଭାରତୀୟ ଓଡ଼ିଆରାଜୁ ସାଙ୍ଗିଆ ଓ ଗୋତ୍ର',
        subtitle: 'ରାଜୁ • ବର୍ମା • ଗଜପତି • ସୂର୍ଯ୍ୟବଂଶୀ କୁଳ',
        description:
          'ଓଡ଼ିଶା, ଆନ୍ଧ୍ରପ୍ରଦେଶ, ତେଲେଙ୍ଗାନା ଓ କର୍ଣ୍ଣାଟକରେ ପ୍ରଚଳିତ ରାଜକୀୟ ସାଙ୍ଗିଆ ଏବଂ ବଶିଷ୍ଠ ଓ କୌଣ୍ଡିନ୍ୟ ଗୋତ୍ର ତାଲିକା।',
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        path: '/community-surnames',
        cta: 'ଦକ୍ଷିଣ ଭାରତୀୟ ସାଙ୍ଗିଆ'
      },
      {
        id: 'hl-north-surnames',
        era: 'ଉତ୍ତର ଓ ପଶ୍ଚିମ ଭାରତ',
        title: 'ଉତ୍ତର ଭାରତୀୟ ଓଡ଼-ରାଜପୁତ ବଂଶ ଓ ପାହାଚ କୂଅ ସ୍ଥାପତ୍ୟ',
        subtitle: 'ରାଜସ୍ଥାନ • ଗୁଜରାଟ • ମଧ୍ୟପ୍ରଦେଶ • ଦିଲ୍ଲୀ',
        description:
          'ଭଗୀରଥ ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼-ରାଜପୁତ କୁଳ, ରାଜକୀୟ ଦୁର୍ଗ ଏବଂ ଐତିହାସିକ ଜଳ-ସ୍ଥାପତ୍ୟର ଅଭିଲେଖ।',
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-community.webp'),
        path: '/community-surnames-north-indian-oad-community',
        cta: 'ଉତ୍ତର ଭାରତୀୟ ସାଙ୍ଗିଆ'
      },
      {
        id: 'hl-prominent-persons',
        era: 'ସମ୍ରାଟ ଓ ମହାପୁରୁଷ',
        title: '୨୦+ ସମ୍ପ୍ରଦାୟର ପ୍ରମୁଖ ବ୍ୟକ୍ତିତ୍ୱ',
        subtitle: 'ସମ୍ରାଟ • ସ୍ୱାଧୀନତା ସଂଗ୍ରାମୀ • ଶିବଯୋଗୀ • ନେତୃবৃନ୍ଦ',
        description:
          'ମହର୍ଷି ଭଗୀରଥ, ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ, ଶିବଯୋଗୀ ସିଦ୍ଧରାମେଶ୍ୱର, ବକ୍ସି ଜଗବନ୍ଧୁ ଓ ଜୟୀ ରାଜଗୁରୁଙ୍କ ଜୀବନୀ।',
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        path: '/community-prominent-persons',
        cta: 'ପ୍ରମୁଖ ବ୍ୟକ୍ତିତ୍ୱ ଦେଖନ୍ତୁ'
      }
    ],
    footerQuickLinksTitle: 'ଐତିହାସିକ ଡକ୍ୟୁମେଣ୍ଟାରୀ',
    footerEpigraphyTitle: 'ଶିଳାଲେଖ ଓ ଅଭିଲେଖାଗାର',
    footerCommunityTitle: 'ସମ୍ପ୍ରଦାୟ ଓ ସାଙ୍ଗିଆ',
    footerContactTitle: 'ଯୋଗାଯୋଗ ଓ ଶ୍ରେୟ',
    footerBrandSummary:
      'ଶିଳାଲେଖ ଗବେଷଣା, ଓଡ଼୍ର ଦେଶର ଐତିହାସିକ ଭୂଗୋଳ, ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ରାଜବଂଶର ଶିଳାଲେଖ, ରାଜବଂଶାବଳୀ ଏବଂ ୮ଟି ଭାଷାରେ ଜୀବନ୍ତ ସାଂସ୍କୃତିକ ପରମ୍ପରାର ସଂରକ୍ଷଣ ପାଇଁ ସମର୍ପିତ।',
    footerRights: 'ସମସ୍ତ ଐତିହାସିକ ଅଭିଲେଖ ଓ ଅନୁବାଦ ସଂରକ୍ଷିତ।'
  },
  bn: {
    headerBadge: 'সূর্যবংশ ইক্ষ্বাকু • ওড্র দেশ • গজপতি রাজকীয় ঐতিহ্য',
    viewTestPageBtn: 'View Original Layout – Test Page',
    searchLabel: 'আর্কাইভ খুঁজুন',
    heroSuperBadge: 'সূর্যবংশ ওড়িয়ারাজু ক্ষত্রিয় ঐতিহাসিক প্রামাণ্যচিত্র',
    heroTitle: 'ওড্র দেশ, কলিঙ্গ ও সূর্যবংশীয় গজপতি সাম্রাজ্যের সার্বভৌম ঐতিহ্য',
    heroSubtitle:
      '২,৫০০+ বছরের সূর্যবংশীয় সম্রাট, শিলালিপি, তাম্রশাসন ও সর্বভারতীয় ক্ষত্রিয় ঐতিহ্য',
    heroDescription:
      'প্রাথমিক শিলালিপি, রাজবংশাবলী, মন্দির স্থাপত্য এবং ওড়িয়ারাজু / ওড্র-ক্ষত্রিয় / ওড়-রাজপুত সম্প্রদায়ের ঐতিহ্যকে ৮টি ভারতীয় ভাষায় সংরক্ষণকারী পোর্টাল।',
    exploreHistoryBtn: 'ইতিহাস অন্বেষণ করুন',
    communityHeritageBtn: 'সম্প্রদায়ের ঐতিহ্য',
    whyVisitKicker: 'আর্কাইভাল লক্ষ্য ও গবেষণা উদ্দেশ্য',
    whyVisitTitle: 'কেন আমাদের ওয়েবসাইট পরিদর্শন করবেন',
    whyVisitSubtitle:
      'এই পোর্টালের প্রতিটি ঐতিহাসিক তথ্য ধৌলি, হাতিগুম্ফা, লিঙ্গরাজ এবং বেলিগলনির মতো প্রাথমিক শিলালিপি ও তাম্রশাসনের ওপর ভিত্তি করে নির্মিত।',
    whyPillars: [
      {
        id: 'why-epigraphy',
        iconWebp: ASSET_WEBP('icon-inscriptions.webp'),
        title: 'প্রত্যয়িত শিলালিপি ও তাম্রশাসন প্রমাণ',
        description:
          'ধৌলি (খ্রি.পূ. ২৬১), হাতিগুম্ফা, লিঙ্গরাজ (১৪৫২ খ্রি.) এবং বেলিগলনি তাম্রশাসনের (১৪৫৮ খ্রি.) মূল সূত্র।',
        path: '/inscriptions',
        cta: 'শিলালিপি দেখুন'
      },
      {
        id: 'why-lineage',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        title: 'অবিচ্ছিন্ন সূর্যবংশ রাজবংশাবলী',
        description:
          'বৈদিক ইক্ষ্বাকু আদি-পুরুষ ও কলিঙ্গ সম্রাটদের থেকে কপিলেন্দ্র দেব, পুরুষোত্তম দেব ও প্রতাপরুদ্র দেব গজপতি পর্যন্ত বংশাবলী।',
        path: '/genealogy',
        cta: 'রাজবংশাবলী দেখুন'
      },
      {
        id: 'why-surnames',
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        title: 'সর্বভারতীয় পদবি ও গোত্র নির্দেশিকা',
        description:
          '১৮টি ঐতিহাসিক নাম, রাজকীয় গোত্র, দক্ষিণ ভারতীয় ওড়িয়ারাজু এবং উত্তর ভারতীয় ওড়-রাজপুত বংশের সংকলন।',
        path: '/community-surnames',
        cta: 'পদবি দেখুন'
      },
      {
        id: 'why-multilingual',
        iconWebp: ASSET_WEBP('icon-articles.webp'),
        title: '৮টি ভাষায় গবেষণা মনোগ্রাফ ও PDF',
        description:
          'বাংলা, ইংরেজি, হিন্দি, তেলুগু, কন্নড়, তামিল, মারাঠি ও ওড়িয়া ভাষায় সম্পূর্ণ ঐতিহাসিক প্রামাণ্যচিত্র পড়ুন।',
        path: '/documentary',
        cta: 'মনোগ্রাফ পড়ুন'
      }
    ],
    fiveCategoriesKicker: 'রাজকীয় আর্কাইভ বিভাগ',
    fiveCategoriesTitle: 'আমাদের রাজকীয় ঐতিহ্যের পাঁচটি প্রধান স্তম্ভ',
    fiveCategoriesSubtitle:
      'সম্প্রদায়ের ঐতিহ্য, ঐতিহাসিক ব্যক্তিত্ব, রাজবংশ, ঐতিহাসিক মনোগ্রাফ এবং গ্যালারি আর্কাইভে সরাসরি প্রবেশ করুন।',
    fiveCategories: [
      {
        id: 'cat-community-heritage',
        title: 'সম্প্রদায়ের ঐতিহ্য',
        subtitle: '১৮টি ঐতিহাসিক নাম • গোত্র • ক্ষত্রিয় পরম্পরা',
        description:
          'ওড়িয়ারাজু / ওড্র-ক্ষত্রিয় / ওড় সম্প্রদায়ের সর্বভারতীয় পরিচয়, ঐতিহ্য এবং ঐতিহাসিক বিস্তার।',
        iconWebp: ASSET_WEBP('icon-community.webp'),
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        path: '/community-heritage',
        cta: 'সম্প্রদায়ের ঐতিহ্য দেখুন'
      },
      {
        id: 'cat-historical-personages',
        title: 'ঐতিহাসিক ব্যক্তিত্ব',
        subtitle: 'সম্রাট • মহারানী • সেনাপতি • রাজগুরু',
        description:
          'সম্রাট খারবেল, কপিলেন্দ্র দেব, পুরুষোত্তম দেব, প্রতাপরুদ্র দেব, বক্সী জগবন্ধু এবং ২০+ ঐতিহাসিক ব্যক্তিত্বের জীবনী।',
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        path: '/kings-queens',
        cta: 'ঐতিহাসিক ব্যক্তিত্ব দেখুন'
      },
      {
        id: 'cat-royal-dynasties',
        title: 'রাজবংশ',
        subtitle: 'ইক্ষ্বাকু • চেদি-কলিঙ্গ • পূর্ব গঙ্গ • গজপতি',
        description:
          'ওড্র দেশ, ত্রিকলিঙ্গ এবং গঙ্গা থেকে কাবেরী পর্যন্ত বিস্তৃত সূর্যবংশীয় গজপতি সাম্রাজ্যের রাজবংশের ইতিহাস।',
        iconWebp: ASSET_WEBP('icon-dynasties.webp'),
        bannerWebp: ASSET_WEBP('banner-royal-battle.webp'),
        path: '/gajapathi-kings',
        cta: 'রাজবংশ অন্বেষণ করুন'
      },
      {
        id: 'cat-historical-monographs',
        title: 'ঐতিহাসিক মনোগ্রাফ',
        subtitle: 'গবেষণা অধ্যায় • শিলালিপি প্রমাণ • PDF',
        description:
          'কলিঙ্গ যুদ্ধ (খ্রি.পূ. ২৬১), ওড্র সাম্রাজ্য, মন্দির স্থাপত্য এবং তাম্রশাসনের ওপর বিস্তারিত গবেষণা গ্রন্থ।',
        iconWebp: ASSET_WEBP('icon-monographs.webp'),
        bannerWebp: ASSET_WEBP('banner-inscription-stone.webp'),
        path: '/documentary',
        cta: 'মনোগ্রাফ পড়ুন'
      },
      {
        id: 'cat-gallery-archives',
        title: 'গ্যালারি ও আর্কাইভ',
        subtitle: 'শিলালিপি • দুর্গ • মন্দির • তাম্রশাসন',
        description:
          'কোণার্ক সূর্য মন্দির, পুরী জগন্নাথ, বারাবাটি দুর্গ, উদয়গিরি গুহা এবং তালপাতার পুঁথির দৃশ্য সংগ্রহশালা।',
        iconWebp: ASSET_WEBP('icon-gallery.webp'),
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        path: '/gallery',
        cta: 'গ্যালারি ও আর্কাইভ খুলুন'
      }
    ],
    featuredArticlesKicker: 'নির্বাচিত ঐতিহাসিক গবেষণা',
    featuredArticlesTitle: 'বিশিষ্ট ঐতিহাসিক প্রবন্ধ',
    featuredArticlesSubtitle:
      'প্রাথমিক শিলালিপি সূত্র এবং ৮টি ভাষার অনুবাদসহ প্রত্যয়িত ঐতিহাসিক গবেষণা প্রবন্ধ।',
    readArticleCta: 'প্রবন্ধ পড়ুন',
    showAllArticlesBtn: count => `সকল ${count}টি ঐতিহাসিক প্রবন্ধ দেখুন`,
    showFeaturedSixBtn: 'নির্বাচিত ৬টি প্রবন্ধ দেখুন',
    timelineKicker: '২,৫০০+ বছরের নথিবদ্ধ ইতিহাস',
    timelineTitle: 'ঐতিহাসিক সময়রেখা (Timeline) প্রিভিউ',
    timelineSubtitle:
      'প্রাচীন ওড্র-কলিঙ্গ ও কলিঙ্গ যুদ্ধ (খ্রি.পূ. ২৬১) থেকে সূর্যবংশীয় গজপতি সাম্রাজ্যের উত্থান পর্যন্ত প্রধান মাইলফলক।',
    openFullTimelineBtn: 'সম্পূর্ণ ইন্টারেক্টিভ সময়রেখা দেখুন',
    communityHighlightsKicker: 'জীবন্ত রাজবংশ ও সাংস্কৃতিক পরিচয়',
    communityHighlightsTitle: 'সম্প্রদায়ের ঐতিহ্যের প্রধান বিশেষত্ব',
    communityHighlightsSubtitle:
      'সূর্যবংশ ওড়িয়ারাজু ক্ষত্রিয় সম্প্রদায়ের ভৌগোলিক বিস্তার, রাজকীয় পদবি এবং বিশিষ্ট ব্যক্তিত্বদের বিবরণ।',
    communityHighlightsCards: [
      {
        id: 'hl-odra-desha',
        era: 'প্রাচীন ও সামুদ্রিক সাম্রাজ্য',
        title: 'ওড্র দেশ, কলিঙ্গ ও ত্রিকলিঙ্গ ভূগোল',
        subtitle: 'মহানদী • গোদাবরী • ঋষিকুল্যা • বঙ্গোপসাগর',
        description:
          'প্রাচীন ওড্র দেশের দুর্গ, সামুদ্রিক বাণিজ্য পথ এবং পবিত্র মন্দির রাজধানীগুলোর ইতিহাস।',
        bannerWebp: ASSET_WEBP('banner-map-odra-desha.webp'),
        iconWebp: ASSET_WEBP('icon-geography.webp'),
        path: '/odra-desha',
        cta: 'ওড্র দেশ দেখুন'
      },
      {
        id: 'hl-south-surnames',
        era: 'দাক্ষিণাত্য ও উপকূলীয় অন্ধ্র',
        title: 'দক্ষিণ ভারতীয় ওড়িয়ারাজু পদবি ও গোত্র',
        subtitle: 'রাজু • বর্মা • গজপতি • সূর্যবংশীয় কুল',
        description:
          'অন্ধ্রপ্রদেশ, তেলেঙ্গানা, কর্ণাটক এবং তামিলনাড়ুতে প্রচলিত রাজকীয় পদবি এবং বশিষ্ঠ ও কৌণ্ডিন্য গোত্রের তালিকা।',
        bannerWebp: ASSET_WEBP('banner-fort-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-surnames.webp'),
        path: '/community-surnames',
        cta: 'দক্ষিণ ভারতীয় পদবি'
      },
      {
        id: 'hl-north-surnames',
        era: 'উত্তর ও পশ্চিম ভারত',
        title: 'উত্তর ভারতীয় ওড়-রাজপুত বংশ ও ধাপ-কূপ স্থাপত্য',
        subtitle: 'রাজস্থান • গুজরাট • মধ্যপ্রদেশ • দিল্লি',
        description:
          'ভগীরথ সূর্যবংশীয় ওড়-রাজপুত কুল, রাজকীয় দুর্গ এবং ঐতিহাসিক জল-স্থাপত্যের নথি।',
        bannerWebp: ASSET_WEBP('banner-sculpture-heritage.webp'),
        iconWebp: ASSET_WEBP('icon-community.webp'),
        path: '/community-surnames-north-indian-oad-community',
        cta: 'উত্তর ভারতীয় পদবি'
      },
      {
        id: 'hl-prominent-persons',
        era: 'সম্রাট ও মহাপুরুষ',
        title: '২০+ সম্প্রদায়ের বিশিষ্ট ব্যক্তিত্ব',
        subtitle: 'সম্রাট • স্বাধীনতা সংগ্রামী • শিবযোগী • নেতৃবৃন্দ',
        description:
          'মহর্ষি ভগীরথ, সম্রাট কপিলেন্দ্র দেব, শিবযোগী সিদ্ধরামেশ্বর, বক্সী জগবন্ধু ও জয়ী রাজগুরুর জীবনী।',
        bannerWebp: ASSET_WEBP('thumb-kapilendra-deva.webp'),
        iconWebp: ASSET_WEBP('icon-personages.webp'),
        path: '/community-prominent-persons',
        cta: 'বিশিষ্ট ব্যক্তিত্ব দেখুন'
      }
    ],
    footerQuickLinksTitle: 'ঐতিহাসিক প্রামাণ্যচিত্র',
    footerEpigraphyTitle: 'শিলালিপি ও আর্কাইভ',
    footerCommunityTitle: 'সম্প্রদায় ও পদবি',
    footerContactTitle: 'যোগাযোগ ও কৃতজ্ঞতা',
    footerBrandSummary:
      'শিলালিপি গবেষণা, ওড্র দেশের ঐতিহাসিক ভূগোল, সূর্যবংশী গজপতি রাজবংশের শিলালিপি, রাজবংশাবলী এবং আটটি ভাষায় জীবন্ত সাংস্কৃতিক ঐতিহ্য সংরক্ষণে নিবেদিত।',
    footerRights: 'সকল ঐতিহাসিক নথি ও অনুবাদ সংরক্ষিত।'
  }
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const { t, language, translateText, getArticleContent, getMetadataLabel } = useLanguage();
  const { user, logout } = useAuth();
  const ui = HOME_UI[language] || HOME_UI.en;
  const rh = ROYAL_HOME_I18N[language] || ROYAL_HOME_I18N.en;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState<SiteStatistics>(
    () => HOMEPAGE_API_CACHE[language]?.stats || CANONICAL_STATISTICS
  );
  const [allRepoArticles, setAllRepoArticles] = useState<Article[]>(
    () => HOMEPAGE_API_CACHE[language]?.articles || getAllArticles(language)
  );
  const [timelineEvents, setTimelineEvents] = useState<HistoricalEvent[]>(
    () => HOMEPAGE_API_CACHE[language]?.timeline || getCanonicalTimelineEvents(language)
  );
  const [selectedArticleCategory, setSelectedArticleCategory] =
    useState<ArticleChronologicalCategoryKey>('all');
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [showAllTimelineEvents, setShowAllTimelineEvents] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  const canonicalGalleryItems = useMemo<GalleryItem[]>(
    () => getCanonicalGallery(language),
    [language]
  );

  const isAdminOrEditor =
    user &&
    [
      'super_admin',
      'admin',
      'historical_editor',
      'research_reviewer',
      'translator',
      'community_moderator'
    ].includes(user.role);

  useEffect(() => {
    const cached = HOMEPAGE_API_CACHE[language];
    const seedArticles = getAllArticles(language);
    const seedTimeline = getCanonicalTimelineEvents(language);

    if (cached) {
      if (cached.stats) setStats(cached.stats);
      if (cached.articles) setAllRepoArticles(cached.articles);
      if (cached.timeline) setTimelineEvents(cached.timeline);
      return;
    }

    setAllRepoArticles(seedArticles);
    setTimelineEvents(seedTimeline);

    let isCancelled = false;
    const langParam = `?lang=${encodeURIComponent(language)}`;

    Promise.all([
      fetch(`/api/content/statistics${langParam}`).then(r => (r.ok ? r.json() : null)),
      fetch(`/api/content/articles${langParam}`).then(r => (r.ok ? r.json() : null)),
      fetch(`/api/content/timeline${langParam}`).then(r => (r.ok ? r.json() : null))
    ])
      .then(([st, art, tl]) => {
        if (isCancelled) return;
        const resolvedStats = st && st.published_articles ? st : CANONICAL_STATISTICS;
        const resolvedArticles = Array.isArray(art) && art.length > 0 ? art : seedArticles;
        const resolvedTimeline = Array.isArray(tl) && tl.length > 0 ? tl : seedTimeline;

        HOMEPAGE_API_CACHE[language] = {
          stats: resolvedStats,
          articles: resolvedArticles,
          timeline: resolvedTimeline
        };

        setStats(resolvedStats);
        setAllRepoArticles(resolvedArticles);
        setTimelineEvents(resolvedTimeline);
      })
      .catch(() => {
        // Fallback to canonical seed data silently
      });

    return () => {
      isCancelled = true;
    };
  }, [language]);

  const findRawArticle = useMemo(() => {
    return (id: string): Article | undefined => {
      return allRepoArticles.find(a => a.id === id);
    };
  }, [allRepoArticles]);

  const findRepoArticle = useMemo(() => {
    return (id: string) => {
      const found = findRawArticle(id);
      return found ? getArticleContent(found) : undefined;
    };
  }, [findRawArticle, getArticleContent]);

  const [showAllPersonages, setShowAllPersonages] = useState(false);

  const documentedFigures = useMemo<HistoricalFigure[]>(
    () => getAllDocumentedFigures(language),
    [language]
  );

  const chronologicalPersonages = useMemo<HistoricalFigure[]>(() => {
    const chronologicalIdOrder = [
      'fig_samrat_sagara',
      'fig_maharshi_bhagiratha',
      'fig_sri_rama',
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

  // 3 Secondary Hero Historical Showcase Cards (consolidated from /test-page heroSlides[1..3])
  const secondaryHeroShowcases = useMemo(
    () => [
      {
        id: 'slide-kanchi-white-horse',
        image: ARCHIVE_IMG('purushottama_deva_kanchi_expedition.jpg'),
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

  // 4 Chronological Heritage Journey Cards Across Realms (consolidated from /test-page)
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

  // 4 Historical Resources & Primary Evidence Vault Cards (consolidated from /test-page)
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

  // 4 Royal Dynasties Visual Showcase Cards (consolidated from /test-page)
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
        image: '/assets/01_samrat_sagara.webp',
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconDynasties,
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
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconInscriptions,
        badge: translateText('Verified Rock Relief'),
        path: '/kings-queens?figure=fig_king_kharavela'
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
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconGallery,
        badge: translateText('British Museum Archival Sculpture'),
        path: '/kings-queens?figure=fig_langula_narasimha_deva'
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
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconPersonages,
        badge: translateText('Royal Court & Epigraphic Archive'),
        path: '/gajapathi-kings'
      }
    ],
    [translateText]
  );

  // Curated Featured Historical Articles reusing exact canonical IDs & URLs (zero duplicate data)
  // Top 4 featured cards showcase thumb-kapilendra-deva.webp, thumb-odra-kingdom.webp, thumb-trikalinga.webp, and thumb-kalinga-architecture.webp
  const curatedChronologicalArticles = useMemo<
    Array<HomepageCuratedArticleItem & { iconWebp: string }>
  >(() => {
    const items: Array<Omit<HomepageCuratedArticleItem, 'rawArticle'> & { iconWebp: string }> = [
      {
        id: 'art_gajapathi_kapilendra',
        chronologicalOrder: 1,
        categoryKey: 'odra_gajapathi',
        categoryLabel: ui.catOdraGajapathi,
        eraBadge: translateText('1434 – 1466 CE • Imperial Gajapathi Zenith'),
        title:
          findRepoArticle('art_gajapathi_kapilendra')?.title ||
          translateText('Emperor Kapilendra Deva & the Suryavamsha Gajapathi Empire'),
        summary:
          findRepoArticle('art_gajapathi_kapilendra')?.summary ||
          translateText(
            'Chronicles the coronation at Cuttack (1434 CE), the title Gajapathi Gaudesvara Navakoti Karnata Kalavaragesvara, and campaigns to the Kaveri.'
          ),
        thumbnail: ROYAL_HOMEPAGE_ASSETS.thumbKapilendraDeva,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconPersonages,
        evidenceCategory: 'verified_archaeological',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 14,
        targetPath: '/documentary?article=art_gajapathi_kapilendra'
      },
      {
        id: 'art_surya_vamsa_sagara_rama',
        chronologicalOrder: 2,
        categoryKey: 'solar_antiquity',
        categoryLabel: ui.catSolarAntiquity,
        eraBadge: translateText('Vedic & Purana Era (c. 1500 BCE – 1st Century BCE)'),
        title:
          findRepoArticle('art_surya_vamsa_sagara_rama')?.title ||
          translateText('Odra Kingdom Origins & Suryavamsha Ikshvaku Royal Genealogy'),
        summary:
          findRepoArticle('art_surya_vamsa_sagara_rama')?.summary ||
          translateText(
            'Traces the solar lineage from Vivasvan, Manu, Ikshvaku, Samrat Sagara, and Maharaja Bhagiratha to Emperor Kharavela and the sovereign Odra Kingdom.'
          ),
        thumbnail: ROYAL_HOMEPAGE_ASSETS.thumbOdraKingdom,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconDynasties,
        evidenceCategory: 'verified_archaeological',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 8,
        targetPath: '/documentary?article=art_surya_vamsa_sagara_rama'
      },
      {
        id: 'art-trikalinga-maritime',
        chronologicalOrder: 3,
        categoryKey: 'odra_gajapathi',
        categoryLabel: ui.catOdraGajapathi,
        eraBadge: translateText('1st Century BCE – 15th Century CE • Three Kalingas'),
        title: translateText('Trikalingadhipati Sovereignty: Kalinga, Utkala & Kosala'),
        summary: translateText(
          'Documents the royal title Trikalingadhipati across Kalinga, Utkala, and Dakshina Kosala alongside the ancient ports of Palur and Tamralipti.'
        ),
        thumbnail: ROYAL_HOMEPAGE_ASSETS.thumbTrikalinga,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconGeography,
        evidenceCategory: 'verified_archaeological',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 8,
        targetPath: '/odra-desha'
      },
      {
        id: 'art-kalinga-architecture',
        chronologicalOrder: 4,
        categoryKey: 'epigraphy_architecture',
        categoryLabel: ui.catEpigraphyArch,
        eraBadge: translateText('7th – 16th Century CE • Temple & Fort Engineering'),
        title: translateText('Kalinga Temple Architecture, Konark Sun Chariot & Royal Forts'),
        summary: translateText(
          'Rekha, Pidha, and Khakhara temple styles at Puri, Konark, and Bhubaneswar alongside Barabati, Raichur, and Kondavidu citadels.'
        ),
        thumbnail: ROYAL_HOMEPAGE_ASSETS.thumbKalingaArchitecture,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconGallery,
        evidenceCategory: 'verified_archaeological',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 9,
        targetPath: '/temples-monuments'
      },
      {
        id: 'art-kalinga-war',
        chronologicalOrder: 5,
        categoryKey: 'solar_antiquity',
        categoryLabel: ui.catSolarAntiquity,
        eraBadge: translateText('261 BCE • Dhauli & Jaugada Rock Edicts'),
        title: translateText('The Kalinga War (261 BCE) & Martial Resistance of Odra-Kalinga'),
        summary: translateText(
          'Examines Ashoka’s Major Rock Edict XIII, Dhauli peace edicts, and the sovereign military organization of ancient Kalinga-Odra.'
        ),
        thumbnail: ROYAL_HOMEPAGE_ASSETS.bannerRoyalBattle,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconMonographs,
        evidenceCategory: 'verified_archaeological',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 11,
        targetPath: '/kalinga-war'
      },
      {
        id: 'art-veligalani-charter',
        chronologicalOrder: 6,
        categoryKey: 'epigraphy_architecture',
        categoryLabel: ui.catEpigraphyArch,
        eraBadge: translateText('1458 CE • Trilingual Copper-Plate Grant'),
        title: translateText('The Veligalani & Lingaraja Epigraphs of Kapilendra Deva'),
        summary: translateText(
          'Paleographic study of the 1458 CE Veligalani copper plates in Sanskrit, Odia, and Telugu alongside the 1452 CE Lingaraja temple proclamation.'
        ),
        thumbnail: ROYAL_HOMEPAGE_ASSETS.bannerInscriptionStone,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconInscriptions,
        evidenceCategory: 'verified_archaeological',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 10,
        targetPath: '/inscriptions'
      },
      {
        id: 'art_epigraphic_evolution_odra',
        chronologicalOrder: 7,
        categoryKey: 'solar_antiquity',
        categoryLabel: ui.catSolarAntiquity,
        eraBadge: translateText('1st Century BCE – 16th Century CE • Paleography'),
        title:
          findRepoArticle('art_epigraphic_evolution_odra')?.title ||
          translateText(
            'Epigraphic Evolution of the Odra Identity: From Ancient Prakrit Edicts to Medieval Gajapathi Copper Plates'
          ),
        summary:
          findRepoArticle('art_epigraphic_evolution_odra')?.summary ||
          translateText(
            'A comprehensive epigraphical treatise tracing the evolution of the Odra identity across two millennia—from Emperor Kharavela’s Hathigumpha Prakrit edict to Suryavamsha Gajapathi charters.'
          ),
        thumbnail: ARCHIVE_IMG('hathigumpha_inscription.jpg'),
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconInscriptions,
        evidenceCategory: 'verified_archaeological',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 9,
        targetPath: '/documentary?article=art_epigraphic_evolution_odra'
      },
      {
        id: 'art_odra_desha_history',
        chronologicalOrder: 8,
        categoryKey: 'odra_gajapathi',
        categoryLabel: ui.catOdraGajapathi,
        eraBadge: translateText('639 CE – 1568 CE • Classical to Medieval Odra'),
        title:
          findRepoArticle('art_odra_desha_history')?.title ||
          translateText('Historical Geography of Odra Desha & Maritime Boita Trade'),
        summary:
          findRepoArticle('art_odra_desha_history')?.summary ||
          translateText(
            'Maps the river valleys of the Mahanadi, Brahmani, Vamsadhara, and Godavari that formed the territorial cradle of Odra Desha.'
          ),
        thumbnail: ROYAL_HOMEPAGE_ASSETS.bannerMapOdraDesha,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconGeography,
        evidenceCategory: 'verified_archaeological',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 9,
        targetPath: '/documentary?article=art_odra_desha_history'
      },
      {
        id: 'art_kolletikota_peddintlamma_lake',
        chronologicalOrder: 9,
        categoryKey: 'odra_gajapathi',
        categoryLabel: ui.catOdraGajapathi,
        eraBadge: translateText('11th – 16th Century CE • Jala-Durga Garrison'),
        title:
          findRepoArticle('art_kolletikota_peddintlamma_lake')?.title ||
          translateText(
            'Sri Kolletikota Peddintlamma Thalli & Kolleti Sarasu: The Aquatic Fortress (Jala Durga) and Sacred Royal Guardian of Coastal Andhra'
          ),
        summary:
          findRepoArticle('art_kolletikota_peddintlamma_lake')?.summary ||
          translateText(
            'A comprehensive historical and cultural documentary on Kolleti Sarasu (Kolleru Lake), the island citadel of Kolletikota, the presiding warrior-mother deity Sri Peddintlamma Thalli, and Gajapathi-Odiyaraju military garrison defenses.'
          ),
        thumbnail: ARCHIVE_IMG('kolleru_wetland_sanctuary.jpg'),
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconDynasties,
        evidenceCategory: 'scholarly_interpretation',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 8,
        targetPath: '/documentary?article=art_kolletikota_peddintlamma_lake'
      },
      {
        id: 'art_oad_rajputh_od_history',
        chronologicalOrder: 10,
        categoryKey: 'community_genealogy',
        categoryLabel: ui.catCommunityGenealogy,
        eraBadge: translateText('2nd Century BCE – Present • Pan-Indian Diaspora'),
        title:
          findRepoArticle('art_oad_rajputh_od_history')?.title ||
          translateText('Odiyaraju, Odra-Kshatriya & Oad-Rajput Pan-Indian Identity'),
        summary:
          findRepoArticle('art_oad_rajputh_od_history')?.summary ||
          translateText(
            'Comparative ethno-historical analysis of the 18 regional designations, martial service, and hydraulic engineering heritage across India.'
          ),
        thumbnail: ROYAL_HOMEPAGE_ASSETS.bannerFortHeritage,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconCommunity,
        evidenceCategory: 'scholarly_interpretation',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 12,
        targetPath: '/documentary?article=art_oad_rajputh_od_history'
      },
      {
        id: 'art_genealogy_methodology',
        chronologicalOrder: 11,
        categoryKey: 'community_genealogy',
        categoryLabel: ui.catCommunityGenealogy,
        eraBadge: translateText('1458 CE – Present • Historiographical Methodology'),
        title:
          findRepoArticle('art_genealogy_methodology')?.title ||
          translateText(
            'Methodological Standards: Distinguishing Epigraphic Lineages from Traditional Vamsavalis'
          ),
        summary:
          findRepoArticle('art_genealogy_methodology')?.summary ||
          translateText(
            'Why rigorous historiography requires explicit demarcation between primary contemporary epigraphic records and post-medieval oral or traditional family Vamsavali claims.'
          ),
        thumbnail: ARCHIVE_IMG('copper_plate_charter.jpg'),
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconArticles,
        evidenceCategory: 'scholarly_interpretation',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 7,
        targetPath: '/documentary?article=art_genealogy_methodology'
      },
      {
        id: 'art-north-indian-oad-rajput',
        chronologicalOrder: 12,
        categoryKey: 'community_genealogy',
        categoryLabel: ui.catCommunityGenealogy,
        eraBadge: translateText('Medieval – Modern Era • North & West India'),
        title: translateText('North Indian Oad-Rajput Clans & Monumental Stepwell Architecture'),
        summary: translateText(
          'Chronicles the Bhagiratha Suryavamsha Oad-Rajput clans of Rajasthan, Gujarat, Madhya Pradesh, Punjab, and Delhi-NCR.'
        ),
        thumbnail: ROYAL_HOMEPAGE_ASSETS.bannerSculptureHeritage,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconSurnames,
        evidenceCategory: 'scholarly_interpretation',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 9,
        targetPath: '/community-surnames-north-indian-oad-community'
      },
      {
        id: 'art-purushottama-prataparudra',
        chronologicalOrder: 13,
        categoryKey: 'odra_gajapathi',
        categoryLabel: ui.catOdraGajapathi,
        eraBadge: translateText('1467 – 1540 CE • Cultural & Literary Golden Age'),
        title: translateText('Emperors Purushottama Deva & Prataparudra Deva'),
        summary: translateText(
          'Examines the Kanchi-Kaveri tradition, the legal treatise Sarasvati Vilasa, and the patronage of Sanskrit and Odia literature.'
        ),
        thumbnail: ARCHIVE_IMG('purushottama_deva_kanchi.jpg'),
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconArticles,
        evidenceCategory: 'scholarly_interpretation',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 9,
        targetPath: '/gajapathi-kings'
      },
      {
        id: 'art-south-indian-surnames',
        chronologicalOrder: 14,
        categoryKey: 'community_genealogy',
        categoryLabel: ui.catCommunityGenealogy,
        eraBadge: translateText('15th – 20th Century CE • Deccan & Coastal Andhra'),
        title: translateText('South Indian Odiyaraju Royal Surnames, Gotras & Zamindaris'),
        summary: translateText(
          'Documents royal titles (Raju, Varma, Gajapathi), gotra lineages, and historical fort settlements in Andhra Pradesh, Telangana, Karnataka, and Tamil Nadu.'
        ),
        thumbnail: ARCHIVE_IMG('barabati_fort_ramparts.jpg'),
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconSurnames,
        evidenceCategory: 'scholarly_interpretation',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 10,
        targetPath: '/community-surnames'
      },
      {
        id: 'art-paika-rebellion',
        chronologicalOrder: 15,
        categoryKey: 'community_genealogy',
        categoryLabel: ui.catCommunityGenealogy,
        eraBadge: translateText('1804 – 1817 CE • Anti-Colonial Martial Uprising'),
        title: translateText('Baxi Jagabandhu, Jayee Rajguru & the Paika Martial Resistance'),
        summary: translateText(
          'Documents the 1804 Khurda uprising and the 1817 Paika Rebellion led by Commander Baxi Jagabandhu Bidyadhar and Royal Preceptor Jayee Rajguru.'
        ),
        thumbnail: ARCHIVE_IMG('baxi_jagabandhu_statue.jpg'),
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconMedia,
        evidenceCategory: 'scholarly_interpretation',
        authorName: 'Dr.G Sathyanarayana Raju',
        citationsCount: 8,
        targetPath: '/community-prominent-persons'
      },
      {
        id: 'curated_palm_leaf_manuscripts',
        chronologicalOrder: 16,
        categoryKey: 'epigraphy_architecture',
        categoryLabel: ui.catEpigraphyArch,
        eraBadge: translateText('1500 – 1815 CE • Digitized Manuscripts'),
        title: translateText(
          'Digitized Palm-Leaf Chronicles & Kaifiyat Records: Madala Panji, Sarasvati Vilasa & Mackenzie Kaifiyats'
        ),
        summary: translateText(
          'Examine primary manuscript sources including the Jagannatha Temple chronicle (Madala Panji), Emperor Prataparudra Deva’s legal treatise Sarasvati Vilasa, and Colonel Colin Mackenzie’s coastal Kaifiyats.'
        ),
        thumbnail: ARCHIVE_IMG('odia_palm_leaf_manuscript.jpg'),
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconMonographs,
        evidenceCategory: 'verified_archaeological',
        authorName: 'Oriental Manuscripts & Archival Repository',
        citationsCount: 6,
        targetPath: '/documents'
      },
      {
        id: 'curated_community_18_designations',
        chronologicalOrder: 17,
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
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconCommunity,
        evidenceCategory: 'scholarly_interpretation',
        authorName: 'Dr.G Sathyanarayana Raju & Community Archives',
        citationsCount: 18,
        targetPath: '/community-heritage'
      }
    ];

    return items.map(item => ({
      ...item,
      rawArticle: findRawArticle(item.id)
    }));
  }, [findRawArticle, findRepoArticle, translateText, ui]);

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

  const categoryTabs = useMemo(
    () => [
      { key: 'all' as const, label: `${translateText('All Categories')} (${curatedChronologicalArticles.length})` },
      { key: 'solar_antiquity' as const, label: ui.catSolarAntiquity },
      { key: 'odra_gajapathi' as const, label: ui.catOdraGajapathi },
      { key: 'community_genealogy' as const, label: ui.catCommunityGenealogy },
      { key: 'epigraphy_architecture' as const, label: ui.catEpigraphyArch }
    ],
    [ui, translateText, curatedChronologicalArticles.length]
  );

  const displayedArticles = useMemo(() => {
    const list =
      selectedArticleCategory === 'all'
        ? curatedChronologicalArticles
        : curatedChronologicalArticles.filter(a => a.categoryKey === selectedArticleCategory);
    if (selectedArticleCategory === 'all' && !showAllArticles) {
      return list.slice(0, 6);
    }
    return list;
  }, [curatedChronologicalArticles, selectedArticleCategory, showAllArticles]);

  const previewTimelineEvents = useMemo(() => {
    return showAllTimelineEvents ? timelineEvents : timelineEvents.slice(0, 6);
  }, [timelineEvents, showAllTimelineEvents]);

  const primaryNavItems = useMemo(
    () => [
      { path: '/', label: t.nav.home || 'Home', icon: Home, iconWebp: ROYAL_HOMEPAGE_ASSETS.logoSunEmblem },
      { path: '/community-heritage', label: t.nav.communityHeritage || 'Community Heritage', icon: Crown, iconWebp: ROYAL_HOMEPAGE_ASSETS.iconCommunity },
      { path: '/kings-queens', label: t.nav.documentedFigures || 'Historical Personages', icon: Users, iconWebp: ROYAL_HOMEPAGE_ASSETS.iconPersonages },
      { path: '/gajapathi-kings', label: t.nav.gajapathiKings || 'Royal Dynasties', icon: Landmark, iconWebp: ROYAL_HOMEPAGE_ASSETS.iconDynasties },
      { path: '/documentary', label: t.nav.documentary || 'Historical Monographs', icon: BookOpen, iconWebp: ROYAL_HOMEPAGE_ASSETS.iconMonographs },
      { path: '/inscriptions', label: t.nav.inscriptions || 'Inscriptions', icon: Scroll, iconWebp: ROYAL_HOMEPAGE_ASSETS.iconInscriptions },
      { path: '/odra-desha', label: t.nav.odraDesha || 'Odra Desha', icon: Compass, iconWebp: ROYAL_HOMEPAGE_ASSETS.iconGeography },
      { path: '/community-surnames', label: t.nav.communitySurnames || 'Community Surnames', icon: Award, iconWebp: ROYAL_HOMEPAGE_ASSETS.iconSurnames },
      { path: '/research', label: t.nav.research || 'Research Articles', icon: FileText, iconWebp: ROYAL_HOMEPAGE_ASSETS.iconArticles },
      { path: '/gallery', label: t.nav.gallery || 'Gallery & Archives', icon: ImageIcon, iconWebp: ROYAL_HOMEPAGE_ASSETS.iconGallery }
    ],
    [t]
  );

  // Curated Visual Archival Plates Showcase with full 8-language support via translateText
  const visualArchivalPlates = useMemo(
    () => [
      {
        id: 'plate-kapilendra-deva',
        image: ROYAL_HOMEPAGE_ASSETS.thumbKapilendraDeva,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconPersonages,
        category: ui.catOdraGajapathi,
        title: translateText('Emperor Kapilendra Deva (1435–1467 CE)'),
        caption: translateText('Founder of the Suryavamsha Gajapathi Empire from the Ganga to the Kaveri'),
        path: '/gajapathi-kings'
      },
      {
        id: 'plate-odra-kingdom',
        image: ROYAL_HOMEPAGE_ASSETS.thumbOdraKingdom,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconDynasties,
        category: ui.catSolarAntiquity,
        title: translateText('Ancient Odra Kingdom & Royal Citadel'),
        caption: translateText('Sovereign heartland of the Odra-Kshatriya warrior-builder dynasties'),
        path: '/odra-desha'
      },
      {
        id: 'plate-trikalinga',
        image: ROYAL_HOMEPAGE_ASSETS.thumbTrikalinga,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconGeography,
        category: ui.catOdraGajapathi,
        title: translateText('Trikalingadhipati Imperial Realm'),
        caption: translateText('Unified sovereignty across Kalinga, Utkala, and Dakshina Kosala'),
        path: '/odra-desha'
      },
      {
        id: 'plate-kalinga-architecture',
        image: ROYAL_HOMEPAGE_ASSETS.thumbKalingaArchitecture,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconGallery,
        category: ui.catEpigraphyArch,
        title: translateText('Kalinga Temple Architecture'),
        caption: translateText('Sacred Rekha and Pidha Deula engineering at Puri, Konark & Bhubaneswar'),
        path: '/temples-monuments'
      },
      {
        id: 'plate-map-odra-desha',
        image: ROYAL_HOMEPAGE_ASSETS.bannerMapOdraDesha,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconGeography,
        category: ui.catOdraGajapathi,
        title: translateText('Historical Map of Odra Desha & Maritime Trade'),
        caption: translateText('Ancient ports of Palur, Kalingapatnam & Tamralipti on the Bay of Bengal'),
        path: '/maps'
      },
      {
        id: 'plate-royal-battle',
        image: ROYAL_HOMEPAGE_ASSETS.bannerRoyalBattle,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconMonographs,
        category: ui.catSolarAntiquity,
        title: translateText('The Kalinga War (261 BCE) & Gajapathi Cavalry'),
        caption: translateText('Documented in Ashoka’s Major Rock Edict XIII at Dhauli and Jaugada'),
        path: '/kalinga-war'
      },
      {
        id: 'plate-inscription-stone',
        image: ROYAL_HOMEPAGE_ASSETS.bannerInscriptionStone,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconInscriptions,
        category: ui.catEpigraphyArch,
        title: translateText('Stone Epigraphs & Copper-Plate Charters'),
        caption: translateText('Hathigumpha, Lingaraja (1452 CE) & Trilingual Veligalani Grant (1458 CE)'),
        path: '/inscriptions'
      },
      {
        id: 'plate-sculpture-heritage',
        image: ROYAL_HOMEPAGE_ASSETS.bannerSculptureHeritage,
        iconWebp: ROYAL_HOMEPAGE_ASSETS.iconMedia,
        category: ui.catEpigraphyArch,
        title: translateText('Konark Sun Wheel & Gaja-Simha Royal Emblem'),
        caption: translateText('Iconic solar chariot wheel and royal elephant-lion insignia of Kalinga-Odra'),
        path: '/gallery'
      }
    ],
    [translateText, ui]
  );

  const whatsappGreeting =
    t.publisher?.whatsappGreeting ||
    'Namaste Dr.G Sathyanarayana Raju ji, regarding Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal';
  const whatsappUrl = `https://wa.me/919480112897?text=${encodeURIComponent(whatsappGreeting)}`;

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FDF6E4] text-[#2A1810]">
      {/* =====================================================================
          1 & 2. ROYAL MAROON HEADER ROW 1, ANTIQUE GOLD BAR ROW 2 & SLIDE-OUT
                 HAMBURGER SIDE MENU DRAWER
      ===================================================================== */}
      <Navbar currentPath="/" onNavigate={onNavigate} onOpenSearch={onOpenSearch} />

      {/* =====================================================================
          3. LARGE CINEMATIC HERO BANNER FEATURING WARRIOR KING ON WHITE HORSE,
             ANCIENT TEMPLE & FORT + MULTILINGUAL HEADING & EXPLORE HISTORY CTA
      ===================================================================== */}
      <section
        className="royal-maroon-banner relative w-full border-b-4 border-[#D4AF37] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, #3A0810 0%, #58121D 50%, #2F060C 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
          {/* Ornate Gold Frame around the Uncropped King-on-White-Horse Hero Artwork */}
          <div className="rounded-2xl sm:rounded-3xl p-[2px] sm:p-[3px] bg-gradient-to-b from-[#F5E1A4] via-[#D4AF37] to-[#8C6214] shadow-[0_18px_50px_rgba(0,0,0,0.65)]">
            <div className="rounded-[14px] sm:rounded-[22px] overflow-hidden bg-[#26050A]">
              {/* Full Uncropped Hero Artwork */}
              <div className="relative w-full bg-[#1C0408]">
                <img
                  src={ROYAL_HOMEPAGE_ASSETS.heroBannerKingHorse}
                  alt={rh.heroTitle}
                  className="w-full h-auto max-h-[540px] object-contain mx-auto block"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={e => {
                    const target = e.currentTarget as HTMLImageElement;
                    const fallback = `${(import.meta as any).env?.BASE_URL || '/'}assets/royal-hero-banner.png`;
                    if (!target.src.endsWith('royal-hero-banner.png')) {
                      target.src = fallback;
                    }
                  }}
                />
              </div>

              {/* Multilingual Royal Hero Proclamation & Action Bar */}
              <div
                className="royal-maroon-banner p-4 sm:p-7 lg:p-9 border-t-2 border-[#D4AF37]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(58, 8, 16, 0.97) 0%, rgba(38, 5, 10, 0.99) 100%), url("${ASSET_WEBP('bg-maroon-texture.webp')}")`,
                  backgroundSize: 'cover'
                }}
              >
                <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
                  <div className="royal-text-gold text-[11px] sm:text-xs font-bold uppercase tracking-widest leading-[1.4] break-words drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    {rh.heroSuperBadge}
                  </div>

                  <h2 className="royal-text-ivory text-xl sm:text-3xl lg:text-4xl font-serif font-extrabold leading-[1.3] break-words drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                    {rh.heroTitle}
                  </h2>

                  <p className="royal-text-gold text-xs sm:text-base lg:text-lg font-serif font-semibold leading-[1.45] break-words drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    {rh.heroSubtitle}
                  </p>

                  <p className="royal-text-cream text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed break-words drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]">
                    {rh.heroDescription}
                  </p>

                  {/* Primary Touch-Friendly CTA Buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
                    <button
                      type="button"
                      onClick={() => handleNavClick('/documentary')}
                      className="royal-btn-gold min-h-[44px] inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-serif font-extrabold text-xs sm:text-sm leading-[1.35] shadow-[0_6px_20px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 shrink-0" />
                      <span>{rh.exploreHistoryBtn}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavClick('/community-heritage')}
                      className="royal-btn-maroon min-h-[44px] inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-serif font-bold text-xs sm:text-sm leading-[1.35] shadow-md transition-colors cursor-pointer"
                    >
                      <Crown className="w-4 h-4 shrink-0" />
                      <span>{rh.communityHeritageBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavClick('/test-page')}
                      className="royal-btn-maroon min-h-[44px] inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-serif font-bold text-xs leading-[1.35] transition-colors cursor-pointer"
                    >
                      <Layers className="w-4 h-4 shrink-0" />
                      <span>View Original Layout – Test Page</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3B. SECONDARY HERO HISTORICAL SHOWCASE CARDS (Consolidated from /test-page) */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {secondaryHeroShowcases.map(slide => (
              <article
                key={slide.id}
                onClick={() => handleNavClick(slide.link)}
                className="group rounded-2xl bg-[#FFFDF8] hover:bg-[#FFF9EB] border-2 border-[#D4AF37] shadow-lg hover:shadow-2xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer"
              >
                <div>
                  <div className="royal-maroon-banner relative aspect-[16/9] overflow-hidden bg-[#2D060C] border-b border-[#D4AF37]">
                    <ArchivalImage
                      src={slide.image}
                      alt={slide.title}
                      variant="card"
                      width={520}
                      height={292}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D060C]/90 via-transparent to-transparent" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#2D060C]/90 border border-[#D4AF37]/75 royal-text-gold text-[10px] font-bold uppercase tracking-wider">
                      {slide.badge}
                    </span>
                    <span className="absolute bottom-2 right-2.5 px-2.5 py-0.5 rounded-full bg-[#5C121D]/95 border border-[#D4AF37]/65 royal-text-ivory text-[10px] font-semibold">
                      {slide.era}
                    </span>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#761824]">
                      {slide.subtitle}
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#3B0A11] group-hover:text-[#761824] leading-[1.35] break-words">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-[#4A2E20] leading-relaxed break-words">
                      {slide.caption}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-2.5 bg-[#F7EBD4] border-t border-[#D4AF37]/45 flex items-center justify-between text-[11px] font-serif font-bold text-[#5C121D]">
                  <span className="truncate max-w-[75%]">{slide.sourceTypeBadge}</span>
                  <span className="inline-flex items-center gap-1 text-[#761824] shrink-0">
                    <span>{ui.readArticleBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B8861B] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Ornamental Royal Divider */}
          <div className="mt-5 sm:mt-6 flex justify-center">
            <img
              src={ASSET_WEBP('divider-royal.webp')}
              alt=""
              aria-hidden="true"
              className="h-6 sm:h-8 w-auto max-w-[260px] sm:max-w-[360px] object-contain opacity-95"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. "WHY VISIT OUR WEBSITE" SECTION (WARM IVORY PARCHMENT & GOLD)
      ===================================================================== */}
      <section
        id="why-visit"
        className="py-10 sm:py-14 border-b-2 border-[#C89D32]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255, 251, 242, 0.94) 0%, rgba(246, 234, 210, 0.95) 100%), url("${ASSET_WEBP('bg-parchment.webp')}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#761824] leading-[1.4]">
              {rh.whyVisitKicker}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-[#3B0A11] leading-[1.3] break-words">
              {rh.whyVisitTitle}
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-[#4A2E20] leading-relaxed break-words">
              {rh.whyVisitSubtitle}
            </p>
          </div>

          {/* Four Scholarly Pillars with Custom Royal WebP Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {rh.whyPillars.map(pillar => (
              <article
                key={pillar.id}
                onClick={() => handleNavClick(pillar.path)}
                className="group rounded-2xl bg-[#FFFDF8] hover:bg-[#FFF9EB] border-2 border-[#D4AF37] shadow-md hover:shadow-xl p-5 flex flex-col justify-between transition-all cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#D4AF37] bg-[#FDF3DC] shrink-0 shadow-sm">
                      <img
                        src={pillar.iconWebp}
                        alt={pillar.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#3B0A11] group-hover:text-[#761824] leading-[1.35] break-words">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A2E20] leading-relaxed break-words">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#D4AF37]/35 flex items-center justify-between text-xs font-serif font-bold text-[#761824]">
                  <span>{pillar.cta}</span>
                  <ArrowRight className="w-4 h-4 text-[#B8861B] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </article>
            ))}
          </div>

          {/* Verified Archival Statistics Strip */}
          <div className="royal-maroon-banner rounded-2xl bg-gradient-to-r from-[#3D0A11] via-[#5C121D] to-[#3D0A11] border-2 border-[#D4AF37] p-4 sm:p-5 shadow-lg">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center">
              {[
                { label: t.stats.articles, value: stats.published_articles },
                { label: t.stats.documents, value: stats.digitized_documents },
                { label: t.stats.photos, value: stats.historical_photographs },
                { label: t.stats.inscriptions, value: stats.reviewed_inscriptions },
                { label: t.stats.translations, value: stats.published_translations },
                { label: t.stats.members, value: stats.registered_members },
                { label: t.stats.events, value: stats.community_events }
              ].map((statItem, index) => (
                <div
                  key={index}
                  className="royal-maroon-banner rounded-xl bg-[#26050A]/85 border border-[#D4AF37]/45 px-2.5 py-2.5"
                >
                  <div className="royal-text-gold text-lg sm:text-xl font-serif font-extrabold tabular-nums">
                    {statItem.value}
                  </div>
                  <div className="royal-text-cream text-[10.5px] sm:text-xs leading-[1.35] break-words mt-0.5">
                    {statItem.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4B. CHRONOLOGICAL HERITAGE JOURNEY ACROSS REALMS (Consolidated from /test-page) */}
          <div className="pt-6 border-t border-[#D4AF37]/45 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="text-xs font-bold uppercase tracking-widest text-[#761824] leading-[1.4]">
                  {ui.journeyBadge}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold text-[#3B0A11] leading-[1.3] break-words">
                  {ui.journeyTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A2E20] max-w-3xl leading-relaxed break-words">
                  {ui.journeySub}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNavClick('/odra-desha')}
                className="royal-btn-maroon self-start md:self-auto min-h-[42px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-serif font-bold leading-[1.35] transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                <Landmark className="w-4 h-4 shrink-0" />
                <span>{t.nav.odraDesha}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
              {heritageJourneyCards.map(realm => (
                <article
                  key={realm.id}
                  onClick={() => handleNavClick(realm.path)}
                  className="group rounded-2xl bg-[#FFFDF8] hover:bg-[#FFF9EB] border-2 border-[#D4AF37] shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer"
                >
                  <div>
                    <div className="royal-maroon-banner relative aspect-[16/10] overflow-hidden bg-[#2D060C] border-b border-[#D4AF37]">
                      <ArchivalImage
                        src={realm.image}
                        alt={realm.title}
                        variant="card"
                        width={560}
                        height={350}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D060C]/90 via-[#2D060C]/25 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-[#2D060C]/90 border border-[#D4AF37] royal-text-gold font-serif font-bold text-xs">
                        {realm.step}
                      </div>
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#5C121D]/95 border border-[#D4AF37]/65 royal-text-ivory text-[10px] font-bold">
                        {realm.era}
                      </div>
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <span className="inline-block px-2 py-0.5 mb-1 rounded bg-[#2D060C]/90 border border-[#D4AF37]/60 royal-text-gold text-[9.5px] font-bold uppercase tracking-wider">
                          {realm.provenanceBadge}
                        </span>
                        <h4 className="royal-text-ivory font-serif font-bold text-base sm:text-lg leading-snug drop-shadow break-words">
                          {realm.title}
                        </h4>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#761824] leading-[1.35] break-words">
                        {realm.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-[#4A2E20] leading-relaxed break-words">
                        {realm.description}
                      </p>
                      <ul className="space-y-1.5 pt-2 border-t border-[#D4AF37]/35">
                        {realm.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[11px] font-semibold text-[#3B0A11] leading-[1.35]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8C6214] shrink-0 mt-0.5" />
                            <span className="break-words">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-4 sm:px-5 py-3 bg-[#F7EBD4] border-t border-[#D4AF37]/45 flex items-center justify-between text-xs font-serif font-bold text-[#5C121D]">
                    <span>{ui.exploreRealmBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B8861B] group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. FIVE VISUAL CATEGORY CARDS:
             Community Heritage, Historical Personages, Royal Dynasties,
             Historical Monographs, Gallery & Archives
      ===================================================================== */}
      <section
        id="five-categories"
        className="royal-maroon-banner py-12 sm:py-16 border-b-2 border-[#D4AF37]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(58, 8, 16, 0.96) 0%, rgba(84, 15, 25, 0.95) 50%, rgba(44, 6, 12, 0.98) 100%), url("${ASSET_WEBP('bg-maroon-texture.webp')}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="royal-text-gold text-xs font-bold uppercase tracking-widest leading-[1.4]">
              {rh.fiveCategoriesKicker}
            </div>
            <h2 className="royal-text-ivory text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold leading-[1.3] break-words">
              {rh.fiveCategoriesTitle}
            </h2>
            <p className="royal-text-cream text-xs sm:text-sm lg:text-base leading-relaxed break-words">
              {rh.fiveCategoriesSubtitle}
            </p>
          </div>

          {/* 5 Visual Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {rh.fiveCategories.map((cat, idx) => (
              <article
                key={cat.id}
                onClick={() => handleNavClick(cat.path)}
                className={`group rounded-2xl p-[2px] bg-gradient-to-b from-[#F5E1A4] via-[#D4AF37] to-[#8C6214] shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="bg-[#FFFDF8] text-[#2A1810] rounded-[14px] overflow-hidden flex flex-col justify-between h-full">
                  <div>
                    {/* Visual Banner Header with Category Emblem */}
                    <div className="royal-maroon-banner relative aspect-[16/9] overflow-hidden bg-[#2D060C] border-b-2 border-[#D4AF37]">
                      <img
                        src={cat.bannerWebp}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D060C]/90 via-[#2D060C]/25 to-transparent" />

                      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-[#FDF3DC] shadow-md shrink-0">
                          <img
                            src={cat.iconWebp}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="royal-text-ivory font-serif font-extrabold text-lg sm:text-xl leading-[1.3] break-words drop-shadow">
                            {cat.title}
                          </h3>
                          <p className="royal-text-gold text-[11px] font-semibold leading-[1.35] break-words">
                            {cat.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Warm Ivory Card Body */}
                    <div className="p-4 sm:p-5">
                      <p className="text-xs sm:text-sm text-[#4A2E20] leading-relaxed break-words">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 sm:px-5 py-3 bg-[#F7EBD4] border-t border-[#D4AF37]/45 flex items-center justify-between text-xs sm:text-sm font-serif font-bold text-[#5C121D] group-hover:text-[#3B0A11]">
                    <span>{cat.cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#B8861B] group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 5B. ROYAL DYNASTIES & SOVEREIGN HOUSES SHOWCASE (Consolidated from /test-page) */}
          <div className="pt-8 border-t border-[#D4AF37]/40 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="royal-text-gold text-xs font-bold uppercase tracking-widest leading-[1.4]">
                  {translateText('Sovereign Houses & Imperial Crowns')}
                </div>
                <h3 className="royal-text-ivory text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold leading-[1.3] break-words">
                  {t.nav.gajapathiKings} & {translateText('Royal Dynasties of Odra-Kalinga')}
                </h3>
                <p className="royal-text-cream text-xs sm:text-sm max-w-3xl leading-relaxed break-words">
                  {translateText(
                    'From the Vedic Ikshvaku Suryavamsha progenitors and Emperor Kharavela’s Chedi-Kalinga house to the Trikalingadhipati Eastern Gangas and the Suryavamsha Gajapathi Emperors.'
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNavClick('/gajapathi-kings')}
                className="royal-btn-gold self-start md:self-auto min-h-[42px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-extrabold text-xs sm:text-sm leading-[1.35] shadow-md hover:brightness-110 transition-all cursor-pointer shrink-0"
              >
                <Crown className="w-4 h-4 shrink-0" />
                <span>{translateText('Explore Royal Dynasties')}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {royalDynastiesShowcase.map(dyn => (
                <article
                  key={dyn.id}
                  onClick={() => handleNavClick(dyn.path)}
                  className="group rounded-2xl bg-[#FFFDF8] hover:bg-[#FFF9EB] border-2 border-[#D4AF37] shadow-lg hover:shadow-2xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer"
                >
                  <div>
                    <div className="royal-maroon-banner relative aspect-[16/10] overflow-hidden bg-[#2D060C] border-b border-[#D4AF37]">
                      <ArchivalImage
                        src={dyn.image}
                        alt={dyn.title}
                        variant="card"
                        width={520}
                        height={325}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D060C]/90 via-transparent to-transparent" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#2D060C]/90 border border-[#D4AF37]/75 royal-text-gold text-[10px] font-bold uppercase tracking-wider">
                        {dyn.badge}
                      </span>
                      <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center gap-2">
                        <img
                          src={dyn.iconWebp}
                          alt=""
                          aria-hidden="true"
                          className="w-6 h-6 rounded object-cover border border-[#D4AF37] shrink-0"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="royal-text-gold text-[10.5px] font-bold leading-[1.35] truncate">
                          {dyn.era}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-2">
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#3B0A11] group-hover:text-[#761824] leading-[1.35] break-words">
                        {dyn.title}
                      </h4>
                      <p className="text-[11px] font-bold text-[#761824] leading-[1.35] break-words">
                        {dyn.monarchs}
                      </p>
                      <p className="text-xs sm:text-sm text-[#4A2E20] leading-relaxed break-words">
                        {dyn.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 sm:px-5 py-3 bg-[#F7EBD4] border-t border-[#D4AF37]/45 flex items-center justify-between text-xs font-serif font-bold text-[#5C121D]">
                    <span>{ui.exploreRealmBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B8861B] group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 5C. FEATURED HISTORICAL PERSONAGES – SOVEREIGN BIOGRAPHIES (Consolidated from /test-page) */}
          <div className="pt-8 border-t border-[#D4AF37]/40 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="royal-text-gold text-xs font-bold uppercase tracking-widest leading-[1.4]">
                  {ui.personagesBadge}
                </div>
                <h3 className="royal-text-ivory text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold leading-[1.3] break-words">
                  {ui.personagesTitle}
                </h3>
                <p className="royal-text-cream text-xs sm:text-sm max-w-3xl leading-relaxed break-words">
                  {ui.personagesSub}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNavClick('/kings-queens')}
                className="royal-btn-gold self-start md:self-auto min-h-[42px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-extrabold text-xs sm:text-sm leading-[1.35] shadow-md hover:brightness-110 transition-all cursor-pointer shrink-0"
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>{ui.viewAllPersonagesBtn}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {displayedPersonages.map(person => (
                <article
                  key={person.id}
                  onClick={() => handleNavClick(`/kings-queens?figure=${encodeURIComponent(person.id)}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNavClick(`/kings-queens?figure=${encodeURIComponent(person.id)}`);
                    }
                  }}
                  className="group rounded-2xl bg-[#FFFDF8] hover:bg-[#FFF9EB] border-2 border-[#D4AF37] shadow-lg hover:shadow-2xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer"
                >
                  <div>
                    <div className="royal-maroon-banner relative aspect-[4/3] overflow-hidden bg-[#2D060C] border-b border-[#D4AF37]">
                      <ArchivalImage
                        src={person.image_url}
                        alt={person.name}
                        variant="card"
                        width={420}
                        height={315}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D060C]/90 via-transparent to-transparent" />
                      <span className="absolute top-2.5 left-2.5 right-2.5 w-fit max-w-[90%] px-2.5 py-0.5 rounded bg-[#2D060C]/90 royal-text-gold border border-[#D4AF37]/75 text-[10px] font-bold uppercase tracking-wider leading-[1.35] break-words">
                        {person.dynasty_name}
                      </span>
                      <span className="absolute bottom-2 left-2.5 px-2.5 py-0.5 rounded-full bg-[#5C121D]/95 border border-[#D4AF37]/65 royal-text-ivory text-[10px] font-semibold leading-[1.35]">
                        {person.reign_period}
                      </span>
                    </div>

                    <div className="p-4 space-y-1.5 min-w-0">
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#3B0A11] group-hover:text-[#761824] leading-[1.35] break-words">
                        {person.name}
                      </h4>
                      {person.known_titles?.[0] && (
                        <p className="text-[11px] font-bold text-[#761824] leading-[1.35] break-words">
                          {person.known_titles[0]}
                        </p>
                      )}
                      <p className="text-xs text-[#4A2E20] leading-relaxed line-clamp-2 break-words">
                        {person.biography}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-2.5 bg-[#F7EBD4] border-t border-[#D4AF37]/45 flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold text-[#5C121D] leading-[1.35] break-words">
                      {getMetadataLabel('status', person.evidence_status) || person.evidence_status}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-serif font-bold leading-[1.4] text-[#761824] group-hover:text-[#3B0A11] shrink-0 ml-auto">
                      <span>{ui.viewBiographyBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B8861B] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {chronologicalPersonages.length > 8 && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllPersonages(prev => !prev)}
                  className="royal-btn-gold min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-xl font-serif font-extrabold text-xs sm:text-sm leading-[1.35] transition-all cursor-pointer shadow-md"
                >
                  <Users className="w-4 h-4 shrink-0" />
                  <span>
                    {showAllPersonages
                      ? ui.showLessPersonagesBtn
                      : ui.showMorePersonagesBtn(chronologicalPersonages.length)}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FEATURED HISTORICAL ARTICLES WITH IMAGE THUMBNAILS & CONCISE TITLES
      ===================================================================== */}
      <section
        id="featured-articles"
        className="py-12 sm:py-16 border-b-2 border-[#C89D32]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(253, 246, 228, 0.95) 0%, rgba(245, 233, 206, 0.96) 100%), url("${ASSET_WEBP('bg-parchment.webp')}")`,
          backgroundSize: 'cover'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="text-xs font-bold uppercase tracking-widest text-[#761824] leading-[1.4]">
                {rh.featuredArticlesKicker}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-[#3B0A11] leading-[1.3] break-words">
                {rh.featuredArticlesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#4A2E20] max-w-3xl leading-relaxed break-words">
                {rh.featuredArticlesSubtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('/documentary')}
              className="royal-btn-maroon self-start md:self-auto min-h-[42px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-serif font-bold leading-[1.35] transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <span>{ui.viewAllArticlesBtn}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Interactive Epoch Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categoryTabs.map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedArticleCategory(tab.key)}
                className={`min-h-[38px] px-3 sm:px-4 py-2 rounded-xl text-xs font-serif font-bold leading-[1.35] transition-all cursor-pointer border text-left break-words ${
                  selectedArticleCategory === tab.key
                    ? 'royal-btn-maroon shadow-md'
                    : 'bg-[#FFFDF8] text-[#3B0A11] border-[#D4AF37]/60 hover:bg-[#F5E6C8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 4 Epoch Category Subtitles & Category CTAs (Consolidated from /test-page categoryDefinitions) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {categoryDefinitions
              .filter(
                cat => selectedArticleCategory === 'all' || selectedArticleCategory === cat.key
              )
              .map(cat => (
                <div
                  key={cat.key}
                  className="rounded-xl bg-[#FFFDF8] border border-[#D4AF37]/65 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#5C121D] royal-text-gold text-[10px] font-bold uppercase tracking-wider border border-[#D4AF37]/60">
                        {cat.badge}
                      </span>
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#3B0A11] leading-[1.35] break-words">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#4A2E20] leading-relaxed break-words">
                      {cat.subtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavClick(cat.viewAllPath)}
                    className="royal-btn-maroon self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-serif font-bold leading-[1.35] shrink-0 cursor-pointer"
                  >
                    <span>{ui.viewCategoryBtn}</span>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                  </button>
                </div>
              ))}
          </div>

          {/* Featured Historical Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {displayedArticles.map(article => (
              <article
                key={article.id}
                onClick={() => handleNavClick(article.targetPath)}
                className="group rounded-2xl bg-[#FFFDF8] hover:bg-[#FFF9EB] border-2 border-[#D4AF37] shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer"
              >
                <div>
                  <div className="royal-maroon-banner relative aspect-[16/10] overflow-hidden bg-[#2D060C] border-b border-[#D4AF37]">
                    <ArchivalImage
                      src={article.thumbnail}
                      alt={article.title}
                      variant="card"
                      width={520}
                      height={325}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D060C]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-2">
                      <img
                        src={article.iconWebp}
                        alt=""
                        aria-hidden="true"
                        className="w-7 h-7 rounded-md object-cover border border-[#D4AF37] shrink-0 shadow"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="royal-text-gold text-[11px] font-semibold leading-[1.35] break-words">
                        {article.eraBadge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="text-[11px] text-[#761824] font-semibold leading-[1.35] break-words">
                      {article.categoryLabel} · {ui.citationsLabel(article.citationsCount)}
                    </div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#3B0A11] group-hover:text-[#761824] leading-[1.35] break-words">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A2E20] leading-relaxed line-clamp-3 break-words">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="px-4 sm:px-5 py-3 bg-[#F7EBD4]/85 border-t border-[#D4AF37]/40 flex items-center justify-between text-xs font-serif font-bold text-[#5C121D]">
                  <span>
                    {getMetadataLabel('status', article.evidenceCategory) || article.evidenceCategory}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#761824] group-hover:text-[#3B0A11]">
                    <span>{rh.readArticleCta}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B8861B] group-hover:translate-x-1 transition-transform shrink-0" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {selectedArticleCategory === 'all' && curatedChronologicalArticles.length > 6 && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowAllArticles(prev => !prev)}
                className="royal-btn-maroon min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-xl font-serif font-bold text-xs sm:text-sm leading-[1.35] transition-colors cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>
                  {showAllArticles
                    ? rh.showFeaturedSixBtn
                    : rh.showAllArticlesBtn(curatedChronologicalArticles.length)}
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          7. HISTORICAL TIMELINE PREVIEW
      ===================================================================== */}
      <section
        id="timeline-preview"
        className="royal-maroon-banner py-12 sm:py-16 border-b-2 border-[#D4AF37]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(56, 9, 16, 0.97) 0%, rgba(82, 16, 26, 0.95) 55%, rgba(42, 6, 11, 0.98) 100%), url("${ASSET_WEBP('bg-maroon-texture.webp')}")`,
          backgroundSize: 'cover'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="royal-text-gold text-xs font-bold uppercase tracking-widest leading-[1.4]">
                {rh.timelineKicker}
              </div>
              <h2 className="royal-text-ivory text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold leading-[1.3] break-words">
                {rh.timelineTitle}
              </h2>
              <p className="royal-text-cream text-xs sm:text-sm max-w-3xl leading-relaxed break-words">
                {rh.timelineSubtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('/timeline')}
              className="royal-btn-gold self-start md:self-auto min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-extrabold text-xs sm:text-sm leading-[1.35] shadow-md hover:brightness-110 transition-all cursor-pointer shrink-0"
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>{rh.openFullTimelineBtn}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Unified 11 Chronological Milestone Cards (Preserving Complete Descriptions, Monuments, Primary Sources & Notes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {previewTimelineEvents.map((ev, index) => (
              <article
                key={ev.id}
                onClick={() => handleNavClick(`/timeline?id=${encodeURIComponent(ev.id)}`)}
                className="group rounded-2xl bg-[#FFFDF8] text-[#2A1810] border-2 border-[#D4AF37] p-4 sm:p-5 shadow-lg hover:shadow-2xl flex flex-col justify-between transition-all cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-bold text-[#761824] border-b border-[#D4AF37]/40 pb-2">
                    <span className="font-serif">
                      {String(index + 1).padStart(2, '0')}. {translateText(ev.year_text)}
                    </span>
                    <span className="text-[11px] text-[#8C6214]">{translateText(ev.period)}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#3B0A11] group-hover:text-[#761824] leading-[1.35] break-words">
                    {translateText(ev.title)}
                  </h3>

                  {ev.rulers_involved && (
                    <div className="text-[11px] font-bold text-[#761824] leading-[1.35] break-words">
                      {translateText(ev.rulers_involved)}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-[#4A2E20] leading-relaxed break-words">
                    {translateText(ev.political_development)}
                  </p>

                  <div className="pt-2 border-t border-[#D4AF37]/30 space-y-1.5 text-[11px] text-[#3B0A11]">
                    {ev.monuments_inscriptions && (
                      <div className="leading-[1.4] break-words">
                        <span className="font-bold text-[#761824]">
                          {translateText('Monuments & Inscriptions')}:{' '}
                        </span>
                        <span>{translateText(ev.monuments_inscriptions)}</span>
                      </div>
                    )}
                    {ev.primary_sources && (
                      <div className="leading-[1.4] break-words">
                        <span className="font-bold text-[#761824]">
                          {translateText('Primary Sources')}:{' '}
                        </span>
                        <span>{translateText(ev.primary_sources)}</span>
                      </div>
                    )}
                    {ev.uncertainty_notes && (
                      <div className="leading-[1.4] text-[#5C4033] italic break-words">
                        <span className="font-semibold not-italic text-[#8C6214]">
                          {translateText('Historical Note')}:{' '}
                        </span>
                        <span>{translateText(ev.uncertainty_notes)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#D4AF37]/30 flex items-center justify-between text-[11px] font-serif font-bold text-[#5C121D]">
                  <span className="truncate max-w-[70%]">
                    {translateText(ev.rulers_involved || ev.monuments_inscriptions)}
                  </span>
                  <span className="inline-flex items-center gap-1 shrink-0">
                    <span>{t.nav.timeline}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B8861B] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {timelineEvents.length > 6 && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowAllTimelineEvents(prev => !prev)}
                className="royal-btn-gold min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-xl font-serif font-extrabold text-xs sm:text-sm leading-[1.35] transition-all cursor-pointer shadow-md"
              >
                <Clock className="w-4 h-4 shrink-0" />
                <span>
                  {showAllTimelineEvents
                    ? translateText('Show Featured 6 Chronological Milestones')
                    : `${translateText('Show All')} ${timelineEvents.length} ${translateText('Chronological Milestones (1st Century BCE – 1568 CE)')}`}
                </span>
              </button>
            </div>
          )}

          {/* 7B. HISTORICAL RESOURCES & PRIMARY EVIDENCE VAULT (Consolidated from /test-page) */}
          <div className="pt-8 border-t border-[#D4AF37]/40 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="royal-text-gold text-xs font-bold uppercase tracking-widest leading-[1.4]">
                  {ui.resourcesBadge}
                </div>
                <h3 className="royal-text-ivory text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold leading-[1.3] break-words">
                  {ui.resourcesTitle}
                </h3>
                <p className="royal-text-cream text-xs sm:text-sm max-w-3xl leading-relaxed break-words">
                  {ui.resourcesSub}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNavClick('/references')}
                className="royal-btn-gold self-start md:self-auto min-h-[42px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-extrabold text-xs sm:text-sm leading-[1.35] shadow-md hover:brightness-110 transition-all cursor-pointer shrink-0"
              >
                <Scroll className="w-4 h-4 shrink-0" />
                <span>{t.nav.references || translateText('Historical Sources')}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {resourceCards.map(res => {
                const ResIcon = res.icon;
                return (
                  <article
                    key={res.id}
                    onClick={() => handleNavClick(res.path)}
                    className="group rounded-2xl bg-[#FFFDF8] hover:bg-[#FFF9EB] border-2 border-[#D4AF37] shadow-lg hover:shadow-2xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer"
                  >
                    <div>
                      <div className="royal-maroon-banner relative aspect-[16/10] overflow-hidden bg-[#2D060C] border-b border-[#D4AF37]">
                        <ArchivalImage
                          src={res.image}
                          alt={res.title}
                          variant="card"
                          width={520}
                          height={325}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2D060C]/90 via-transparent to-transparent" />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#2D060C]/90 border border-[#D4AF37]/75 royal-text-gold text-[10px] font-bold uppercase tracking-wider">
                          {res.badge}
                        </span>
                        <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-xl bg-[#D4AF37] text-[#2D060C] flex items-center justify-center shadow-md">
                          <ResIcon className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 space-y-2">
                        <h4 className="font-serif font-bold text-base sm:text-lg text-[#3B0A11] group-hover:text-[#761824] leading-[1.35] break-words">
                          {res.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#4A2E20] leading-relaxed break-words">
                          {res.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 sm:px-5 py-3 bg-[#F7EBD4] border-t border-[#D4AF37]/45 flex items-center justify-between text-xs font-serif font-bold text-[#5C121D]">
                      <span>{res.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B8861B] group-hover:translate-x-1 transition-transform shrink-0" />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. COMMUNITY HERITAGE HIGHLIGHTS
      ===================================================================== */}
      <section
        id="community-highlights"
        className="py-12 sm:py-16 border-b-2 border-[#C89D32]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(255, 251, 242, 0.95) 0%, rgba(245, 233, 206, 0.96) 100%), url("${ASSET_WEBP('bg-parchment.webp')}")`,
          backgroundSize: 'cover'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#761824] leading-[1.4]">
              {rh.communityHighlightsKicker}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-[#3B0A11] leading-[1.3] break-words">
              {rh.communityHighlightsTitle}
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-[#4A2E20] leading-relaxed break-words">
              {rh.communityHighlightsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {rh.communityHighlightsCards.map(card => (
              <article
                key={card.id}
                onClick={() => handleNavClick(card.path)}
                className="group rounded-2xl bg-[#FFFDF8] hover:bg-[#FFF9EB] border-2 border-[#D4AF37] shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer"
              >
                <div>
                  <div className="royal-maroon-banner relative aspect-[16/8] overflow-hidden bg-[#2D060C] border-b-2 border-[#D4AF37]">
                    <img
                      src={card.bannerWebp}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D060C]/90 via-[#2D060C]/25 to-transparent" />
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-[#FDF3DC] shrink-0 shadow">
                        <img
                          src={card.iconWebp}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="royal-text-gold text-[10.5px] font-bold uppercase tracking-wider leading-[1.35]">
                          {card.era}
                        </div>
                        <h3 className="royal-text-ivory font-serif font-extrabold text-base sm:text-xl leading-[1.3] break-words">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="text-xs font-bold text-[#761824] leading-[1.35] break-words">
                      {card.subtitle}
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A2E20] leading-relaxed break-words">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 sm:px-5 py-3 bg-[#F7EBD4] border-t border-[#D4AF37]/45 flex items-center justify-between text-xs sm:text-sm font-serif font-bold text-[#5C121D]">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-4 h-4 text-[#B8861B] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </article>
            ))}
          </div>

          {/* Ornamental Royal Divider */}
          <div className="flex justify-center">
            <img
              src={ROYAL_HOMEPAGE_ASSETS.dividerRoyal}
              alt=""
              aria-hidden="true"
              className="h-6 sm:h-8 w-auto max-w-[260px] sm:max-w-[340px] object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Royal Visual Heritage & Archival Plates Gallery (8-Language Captions & Lazy Loading) */}
          <div className="space-y-5 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-widest text-[#761824] leading-[1.4]">
                  {translateText('Royal Archival Plates & Visual Documentation')}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-[#3B0A11] leading-[1.3] break-words">
                  {translateText('Illustrated Heritage of Odra Desha, Trikalinga & the Gajapathi Empire')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleNavClick('/gallery')}
                className="royal-btn-maroon self-start sm:self-auto min-h-[40px] inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-serif font-bold leading-[1.35] cursor-pointer shrink-0"
              >
                <img
                  src={ROYAL_HOMEPAGE_ASSETS.iconGallery}
                  alt=""
                  aria-hidden="true"
                  className="w-4 h-4 rounded-sm object-cover shrink-0"
                  loading="lazy"
                  decoding="async"
                />
                <span>{t.nav.gallery}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visualArchivalPlates.map(plate => (
                <figure
                  key={plate.id}
                  onClick={() => handleNavClick(plate.path)}
                  className="group rounded-2xl bg-[#FFFDF8] border-2 border-[#D4AF37] shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer"
                >
                  <div className="royal-maroon-banner relative aspect-[16/10] bg-[#2D060C] overflow-hidden border-b border-[#D4AF37]">
                    <img
                      src={plate.image}
                      alt={plate.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D060C]/85 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center gap-2">
                      <img
                        src={plate.iconWebp}
                        alt=""
                        aria-hidden="true"
                        className="w-6 h-6 rounded object-cover border border-[#D4AF37] shrink-0"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="royal-text-gold text-[10.5px] font-bold leading-[1.35] truncate">
                        {plate.category}
                      </span>
                    </div>
                  </div>
                  <figcaption className="p-3.5 space-y-1">
                    <div className="font-serif font-bold text-sm text-[#3B0A11] group-hover:text-[#761824] leading-[1.35] break-words">
                      {plate.title}
                    </div>
                    <p className="text-xs text-[#4A2E20] leading-relaxed break-words">
                      {plate.caption}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* 8B. AUTHENTICATED ARCHIVAL VISUAL GALLERY SHOWCASE (All 7 Canonical Gallery Items with Provenance, Licenses & LightboxModal) */}
          <div className="space-y-5 pt-8 border-t border-[#D4AF37]/45">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-widest text-[#761824] leading-[1.4]">
                  {ui.galleryBadge}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-[#3B0A11] leading-[1.3] break-words">
                  {ui.galleryTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A2E20] leading-relaxed break-words">
                  {ui.gallerySub}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNavClick('/gallery')}
                className="royal-btn-maroon self-start sm:self-auto min-h-[40px] inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-serif font-bold leading-[1.35] cursor-pointer shrink-0"
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span>{t.home.viewFullGallery}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {canonicalGalleryItems.map(item => (
                <article
                  key={item.id}
                  onClick={() => setSelectedGalleryItem(item)}
                  className="group rounded-2xl bg-[#FFFDF8] hover:bg-[#FFF9EB] border-2 border-[#D4AF37] shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer"
                >
                  <div>
                    <div className="royal-maroon-banner relative aspect-[16/10] overflow-hidden bg-[#2D060C] border-b border-[#D4AF37]">
                      <ArchivalImage
                        src={item.image_url}
                        alt={item.alt_text || item.title}
                        variant="card"
                        width={560}
                        height={350}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D060C]/90 via-transparent to-transparent" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#2D060C]/90 border border-[#D4AF37]/75 royal-text-gold text-[10px] font-bold uppercase tracking-wider">
                        {getMetadataLabel('category', item.category) || translateText(item.category)}
                      </span>
                      <span className="absolute bottom-2.5 left-3 right-3 royal-text-ivory text-xs sm:text-sm font-serif font-bold leading-snug drop-shadow break-words">
                        {item.title}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <p className="text-xs text-[#4A2E20] leading-relaxed break-words">
                        {item.description}
                      </p>
                      <div className="pt-2 border-t border-[#D4AF37]/30 space-y-1 text-[10.5px] text-[#3B0A11]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-[#761824]">{item.location}</span>
                          <span className="font-semibold text-[#8C6214]">{item.period}</span>
                        </div>
                        <div className="text-[#4A2E20] truncate" title={item.source}>
                          {item.creator_photographer} · {item.source}
                        </div>
                        <div className="text-[10px] text-[#5C4033] font-medium">
                          {item.copyright_license}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-2.5 bg-[#F7EBD4] border-t border-[#D4AF37]/45 flex items-center justify-between text-[11px] font-serif font-bold text-[#5C121D]">
                    <span>{item.verification_status}</span>
                    <span className="inline-flex items-center gap-1 text-[#761824]">
                      <span>{ui.exploreRealmBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B8861B] group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. ROYAL MAROON FOOTER WITH TEMPLE SILHOUETTE, CIRCULAR PROFILE PHOTO
             WITH ATTACHED WHATSAPP BADGE, AND COPYRIGHT / DISCLAIMER / HISTORICAL SOURCES
      ===================================================================== */}
      <footer
        className="royal-maroon-banner w-full border-t-2 border-[#D4AF37] pb-20 sm:pb-14"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(56, 9, 16, 0.98) 0%, rgba(36, 5, 10, 0.99) 100%), url("${ROYAL_HOMEPAGE_ASSETS.bgMaroonTexture}")`,
          backgroundSize: 'cover'
        }}
      >
        {/* Golden Temple Silhouette Crown Banner */}
        <div className="w-full bg-[#2A050B] border-b border-[#D4AF37]/50 py-3 px-4 flex justify-center overflow-hidden">
          <img
            src={ROYAL_HOMEPAGE_ASSETS.footerTempleSilhouette}
            alt="Kalinga Royal Temple Silhouette"
            className="h-12 sm:h-16 md:h-20 w-auto max-w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Author & Publisher Profile Bar in Footer: Circular Gold-Bordered Photo with Attached Clickable WhatsApp Badge */}
        <div className="border-b border-[#D4AF37]/45 bg-[#31060D]/95 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              {/* Clickable Circular Profile Photograph with Gold Border & Attached WhatsApp Icon Badge */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => handleWhatsAppLinkClick(e, whatsappUrl)}
                className="relative shrink-0 group cursor-pointer"
                title={t.publisher?.contactWhatsApp || 'Contact on WhatsApp (+91 9480112897)'}
                aria-label={t.publisher?.contactWhatsApp || 'Contact on WhatsApp (+91 9480112897)'}
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-[3px] border-[#D4AF37] shadow-[0_0_22px_rgba(212,175,55,0.55)] ring-2 ring-[#762D35]">
                  <img
                    src={`${(import.meta as any).env?.BASE_URL || '/'}assets/dr_g_sathyanarayana_raju.png`}
                    alt={t.publisher?.publisherName || 'Dr.G Sathyanarayana Raju'}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* Small WhatsApp Icon Badge Attached to Circular Photo */}
                <span
                  className="absolute bottom-0.5 right-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#25D366] text-white border-2 border-[#D4AF37] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                  title={t.publisher?.contactWhatsApp || 'Contact on WhatsApp (+91 9480112897)'}
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </span>
              </a>

              <div className="space-y-1 min-w-0">
                <div className="royal-text-gold text-[11px] font-serif font-bold uppercase tracking-widest leading-[1.35] break-words">
                  {t.publisher?.designedAndPublishedBy ||
                    'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju'}
                </div>
                <h3 className="royal-text-ivory font-serif font-extrabold text-lg sm:text-2xl leading-[1.3] break-words">
                  {t.publisher?.publisherName || 'Dr.G Sathyanarayana Raju'}
                </h3>
                <p className="royal-text-gold text-xs sm:text-sm font-serif font-semibold leading-[1.35] break-words">
                  {t.publisher?.leaderTitle || 'Founder & Historical Documentation Contributor'}
                </p>
                <p className="royal-text-cream text-xs leading-relaxed max-w-2xl break-words">
                  {t.publisher?.leaderBio || rh.footerBrandSummary}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => handleWhatsAppLinkClick(e, whatsappUrl)}
                className="royal-btn-gold inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-serif font-extrabold leading-[1.35] shadow-md cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                <span>{t.publisher?.contactWhatsApp || 'WhatsApp: +91 9480112897'}</span>
              </a>
              <a
                href="tel:+919480112897"
                className="royal-btn-maroon inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-serif font-semibold leading-[1.35]"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>+91 9480112897</span>
              </a>
            </div>
          </div>
        </div>

        {/* Methodological Integrity Notice */}
        <div className="border-b border-[#D4AF37]/30 bg-[#26050A]/90 py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-3.5 text-center md:text-left">
            <div className="p-2.5 rounded-xl bg-[#470B14] border border-[#D4AF37]/70 shrink-0">
              <ShieldCheck className="royal-text-gold w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="royal-text-gold text-xs font-serif font-bold uppercase tracking-wider">
                {t.evidenceNotice.title}
              </div>
              <p className="royal-text-cream text-xs leading-relaxed">
                {t.evidenceNotice.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Contact Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Column 1: Royal Brand & Core Legal / Archival Links */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={ROYAL_HOMEPAGE_ASSETS.logoSunEmblem}
                  alt="Suryavamsha Sun Emblem"
                  className="w-11 h-11 rounded-full border border-[#D4AF37] object-cover shrink-0"
                  loading="lazy"
                  decoding="async"
                />
                <div className="min-w-0">
                  <h3 className="royal-text-gold font-serif font-bold text-base leading-[1.35] break-words">
                    {t.siteTitle}
                  </h3>
                  <p className="royal-text-ivory text-[11px] font-semibold uppercase tracking-wider leading-[1.35] break-words">
                    {t.siteSubtitle}
                  </p>
                </div>
              </div>

              <p className="royal-text-cream text-xs leading-relaxed break-words pr-2 sm:pr-6">
                {rh.footerBrandSummary}
              </p>

              {/* Prominent Footer Essential Links: 1. Copyright  2. Disclaimer  3. Historical Sources */}
              <div className="rounded-xl bg-[#470B14]/90 border border-[#D4AF37]/70 p-3.5 space-y-2.5">
                <div className="royal-text-gold text-[11px] font-serif font-bold uppercase tracking-wider">
                  {rh.footerContactTitle}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {/* 1. Copyright */}
                  <button
                    type="button"
                    onClick={() => handleNavClick('/copyright')}
                    className="royal-btn-maroon px-3 py-1.5 rounded-lg text-xs font-serif font-bold leading-[1.3] cursor-pointer"
                  >
                    {{
                      en: 'Copyright',
                      hi: 'कॉपीराइट',
                      te: 'కాపీరైట్',
                      kn: 'ಹಕ್ಕುಸ್ವಾಮ್ಯ',
                      ta: 'பதிப்புரிமை',
                      mr: 'कॉपीराइट',
                      or: 'କପିରାଇଟ୍',
                      bn: 'কপিরাইট'
                    }[language] || 'Copyright'}
                  </button>

                  {/* 2. Disclaimer */}
                  <button
                    type="button"
                    onClick={() => handleNavClick('/terms')}
                    className="royal-btn-maroon px-3 py-1.5 rounded-lg text-xs font-serif font-bold leading-[1.3] cursor-pointer"
                  >
                    {{
                      en: 'Disclaimer',
                      hi: 'अस्वीकरण (Disclaimer)',
                      te: 'నిరాకరణ ప్రకటన (Disclaimer)',
                      kn: 'ಹಕ್ಕು ನಿರಾಕರಣೆ (Disclaimer)',
                      ta: 'பொறுப்புத் துறப்பு (Disclaimer)',
                      mr: 'अस्वीकरण (Disclaimer)',
                      or: 'ଅସ୍ୱୀକରଣ (Disclaimer)',
                      bn: 'দাবিত্যাগ (Disclaimer)'
                    }[language] || 'Disclaimer'}
                  </button>

                  {/* 3. Historical Sources */}
                  <button
                    type="button"
                    onClick={() => handleNavClick('/references')}
                    className="royal-btn-maroon px-3 py-1.5 rounded-lg text-xs font-serif font-bold leading-[1.3] cursor-pointer"
                  >
                    {{
                      en: 'Historical Sources',
                      hi: 'ऐतिहासिक स्रोत',
                      te: 'చారిత్రక ఆధారాలు',
                      kn: 'ಐತಿಹಾಸಿಕ ಆಕರಗಳು',
                      ta: 'வரலாற்று ஆதாரங்கள்',
                      mr: 'ऐतिहासिक स्रोत',
                      or: 'ଐତିହାସିକ ଉତ୍ସ',
                      bn: 'ঐতিহাসিক উৎস'
                    }[language] || 'Historical Sources'}
                  </button>

                  {/* View Original Layout – Test Page */}
                  <button
                    type="button"
                    onClick={() => handleNavClick('/test-page')}
                    className="royal-btn-gold px-3 py-1.5 rounded-lg text-xs font-serif font-bold leading-[1.3] cursor-pointer flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 shrink-0" />
                    <span>View Original Layout – Test Page</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Column 2: Legal Policies, Standards & Navigation Guide */}
            <div className="lg:col-span-2 space-y-3.5">
              <div className="rounded-xl bg-[#3E0A12]/85 border border-[#D4AF37]/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="royal-text-gold text-xs font-serif font-bold uppercase tracking-wider">
                    {{
                      en: 'Legal, Policies & Standards',
                      hi: 'विधिक नीतियाँ एवं मानक',
                      te: 'చట్టపరమైన నిబంధనలు & ప్రమాణాలు',
                      kn: 'ಕಾನೂನು ನೀತಿಗಳು ಮತ್ತು ಮಾನದಂಡಗಳು',
                      ta: 'சட்டக் கொள்கைகள் & தரநிலைகள்',
                      mr: 'कायदेशीर धोरणे आणि मानके',
                      or: 'ଆଇନଗତ ନୀତି ଓ ମାନକ',
                      bn: 'আইনি নীতিমালা ও মানক'
                    }[language] || 'Legal, Policies & Standards'}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5C121D] border border-[#D4AF37]/60 royal-text-gold font-semibold">
                    Verified Archival Records
                  </span>
                </div>

                {/* Secondary Policy & Standard Links */}
                <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleNavClick('/privacy')}
                    className="royal-text-ivory hover:underline cursor-pointer"
                  >
                    {{
                      en: 'Privacy Policy',
                      hi: 'गोपनीयता नीति',
                      te: 'గోప్యతా విధానం',
                      kn: 'ಗೌಪ್ಯತಾ ನೀತಿ',
                      ta: 'தனியுரிமைக் கொள்கை',
                      mr: 'गोपनीयता धोरण',
                      or: 'ଗୋପନୀୟତା ନୀତି',
                      bn: 'গোপনীয়তা নীতি'
                    }[language] || 'Privacy Policy'}
                  </button>
                  <span className="text-[#D4AF37]/50">•</span>
                  <button
                    type="button"
                    onClick={() => handleNavClick('/accessibility')}
                    className="royal-text-ivory hover:underline cursor-pointer"
                  >
                    {{
                      en: 'Accessibility Statement',
                      hi: 'सुलभता विवरण',
                      te: 'యాక్సెసిబిలిటీ ప్రకటన',
                      kn: 'ಪ್ರವೇಶಸಾಧ್ಯತೆಯ ಹೇಳಿಕೆ',
                      ta: 'அணுகல்தன்மை அறிக்கை',
                      mr: 'सुलभता विधान',
                      or: 'ସୁଗମ୍ୟତା ବିବରଣୀ',
                      bn: 'অ্যাক্সেসিবিলিটি বিবৃতি'
                    }[language] || 'Accessibility Statement'}
                  </button>
                  <span className="text-[#D4AF37]/50">•</span>
                  <button
                    type="button"
                    onClick={() => handleNavClick('/design-system')}
                    className="royal-text-gold font-medium hover:underline cursor-pointer"
                  >
                    {{
                      en: 'Royal UI Component System',
                      hi: 'राजकीय UI डिज़ाइन प्रणाली',
                      te: 'రాయల్ UI డిజైన్ సిస్టమ్',
                      kn: 'ರಾಯಲ್ UI ವಿನ್ಯಾಸ ವ್ಯವಸ್ಥೆ',
                      ta: 'அரச UI வடிவமைப்பு அமைப்பு',
                      mr: 'शाही UI डिझाइन प्रणाली',
                      or: 'ରାଜକୀୟ UI ଡିଜାଇନ୍ ସିଷ୍ଟମ୍',
                      bn: 'রাজকীয় UI ডিজাইন সিস্টেম'
                    }[language] || 'Royal UI Component System'}
                  </button>
                </div>

                {/* Download Project Export ZIP */}
                <div className="pt-2 border-t border-[#D4AF37]/25 flex items-center justify-between">
                  <a
                    href="/api/export/project-zip"
                    download="suryavamsha-odiyaraju-kshatriya-portal.zip"
                    className="royal-text-gold font-semibold hover:underline text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>
                      {{
                        en: 'Export Project (ZIP)',
                        hi: 'प्रोजेक्ट निर्यात (ZIP)',
                        te: 'ప్రాజెక్ట్ ఎగుమతి (ZIP)',
                        kn: 'ಪ್ರಾಜೆಕ್ಟ್ ರಫ್ತು (ZIP)',
                        ta: 'திட்ட ஏற்றுமதி (ZIP)',
                        mr: 'प्रोजेक्ट निर्यात (ZIP)',
                        or: 'ପ୍ରୋଜେକ୍ଟ ରପ୍ତାନି (ZIP)',
                        bn: 'প্রকল্প রপ্তানি (ZIP)'
                      }[language] || 'Export Project (ZIP)'}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#762D35] border border-[#D4AF37] royal-text-ivory">
                      Full
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright, Disclaimer & Historical Sources Bar */}
          <div className="mt-10 pt-6 border-t border-[#D4AF37]/35 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs royal-text-cream">
            <div className="royal-text-cream text-center sm:text-left">
              © {new Date().getFullYear()} {t.siteTitle} · {rh.footerRights}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* 1. Copyright */}
              <button
                type="button"
                onClick={() => handleNavClick('/copyright')}
                className="royal-text-gold font-bold hover:underline cursor-pointer"
              >
                {{
                  en: 'Copyright',
                  hi: 'कॉपीराइट',
                  te: 'కాపీరైట్',
                  kn: 'ಹಕ್ಕುಸ್ವಾಮ್ಯ',
                  ta: 'பதிப்புரிமை',
                  mr: 'कॉपीराइट',
                  or: 'କପିରାଇଟ୍',
                  bn: 'কপিরাইট'
                }[language] || 'Copyright'}
              </button>
              <span className="royal-text-gold">·</span>
              {/* 2. Disclaimer */}
              <button
                type="button"
                onClick={() => handleNavClick('/terms')}
                className="royal-text-gold font-bold hover:underline cursor-pointer"
              >
                {{
                  en: 'Disclaimer',
                  hi: 'अस्वीकरण (Disclaimer)',
                  te: 'నిరాకరణ ప్రకటన (Disclaimer)',
                  kn: 'ಹಕ್ಕು ನಿರಾಕರಣೆ (Disclaimer)',
                  ta: 'பொறுப்புத் துறப்பு (Disclaimer)',
                  mr: 'अस्वीकरण (Disclaimer)',
                  or: 'ଅସ୍ୱୀକରଣ (Disclaimer)',
                  bn: 'দাবিত্যাগ (Disclaimer)'
                }[language] || 'Disclaimer'}
              </button>
              <span className="royal-text-gold">·</span>
              {/* 3. Historical Sources */}
              <button
                type="button"
                onClick={() => handleNavClick('/references')}
                className="royal-text-gold font-bold hover:underline cursor-pointer"
              >
                {{
                  en: 'Historical Sources',
                  hi: 'ऐतिहासिक स्रोत',
                  te: 'చారిత్రక ఆధారాలు',
                  kn: 'ಐತಿಹಾಸಿಕ ಆಕರಗಳು',
                  ta: 'வரலாற்று ஆதாரங்கள்',
                  mr: 'ऐतिहासिक स्रोत',
                  or: 'ଐତିହାସିକ ଉତ୍ସ',
                  bn: 'ঐতিহাসিক উৎস'
                }[language] || 'Historical Sources'}
              </button>
              <span className="royal-text-gold">·</span>
              <button
                type="button"
                onClick={() => handleNavClick('/about')}
                className="royal-text-ivory hover:underline cursor-pointer"
              >
                {t.nav.about}
              </button>
              <span className="royal-text-gold">·</span>
              <button
                type="button"
                onClick={() => handleNavClick('/privacy')}
                className="royal-text-ivory hover:underline cursor-pointer"
              >
                {translateText('Privacy Policy')}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Lazy-Loaded Lightbox Modal for Authenticated Archival Gallery Inspection */}
      {selectedGalleryItem && (
        <Suspense fallback={null}>
          <LightboxModal
            item={selectedGalleryItem}
            onClose={() => setSelectedGalleryItem(null)}
          />
        </Suspense>
      )}
    </div>
  );
};
