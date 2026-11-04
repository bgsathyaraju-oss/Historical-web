import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  User,
  Shield,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Landmark,
  Compass,
  Crown,
  Users,
  Scroll,
  LogOut,
  Sparkles,
  Calendar,
  Image as ImageIcon,
  Home,
  FileText,
  Layers,
  Award
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

const ASSET_WEBP = (name: string) =>
  `${(import.meta as any).env?.BASE_URL || '/'}assets/${name}`;

export const RoyalSunCrest: React.FC<{ className?: string }> = ({ className = 'w-11 h-11' }) => (
  <div
    className={`${className} rounded-full bg-gradient-to-br from-[#3E0A12] via-[#5C121D] to-[#2B050A] border-2 border-[#D4AF37] p-1 flex items-center justify-center shadow-[0_0_14px_rgba(212,175,55,0.45)] shrink-0`}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="suryaGoldGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="55%" stopColor="#F0C85A" />
          <stop offset="100%" stopColor="#B8861B" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 2" />
      <g fill="url(#suryaGoldGrad)">
        <polygon points="50,3 54,24 46,24" />
        <polygon points="50,97 54,76 46,76" />
        <polygon points="3,50 24,54 24,46" />
        <polygon points="97,50 76,54 76,46" />
        <polygon points="16,16 33,28 28,33" />
        <polygon points="84,84 67,72 72,67" />
        <polygon points="84,16 72,33 67,28" />
        <polygon points="16,84 28,67 33,72" />
        <polygon points="32,7 41,25 35,27" />
        <polygon points="68,93 59,75 65,73" />
        <polygon points="93,32 75,41 73,35" />
        <polygon points="7,68 25,59 27,65" />
      </g>
      <circle cx="50" cy="50" r="23" fill="url(#suryaGoldGrad)" stroke="#762D35" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="14" fill="#762D35" stroke="#F5E1A4" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="6" fill="#F5E1A4" />
    </svg>
  </div>
);

/**
 * Respectful Traditional Royal Gold & Vermilion Lord Ganesha Illustration
 * Displayed in the header above "OM SRI GANESHAYA NAMAHA"
 */
export const RoyalGaneshaBlessingIcon: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10'
}) => (
  <div
    className={`${className} rounded-full bg-gradient-to-b from-[#6B111E] via-[#460811] to-[#280409] border-[1.5px] border-[#F5E1A4] p-0.5 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.55)] shrink-0`}
    aria-hidden="true"
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="ganeshaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="48%" stopColor="#F5D77F" />
          <stop offset="100%" stopColor="#C89322" />
        </linearGradient>
        <linearGradient id="ganeshaCrownGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DF" />
          <stop offset="55%" stopColor="#E6B84A" />
          <stop offset="100%" stopColor="#9E6E12" />
        </linearGradient>
      </defs>

      {/* Sacred Prabhavali Halo Ring */}
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="url(#ganeshaGoldGrad)"
        strokeWidth="1.6"
        strokeDasharray="2.5 1.8"
      />
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="#D4AF37"
        strokeOpacity="0.45"
        strokeWidth="0.9"
      />

      {/* Lotus Base Petals */}
      <path
        d="M24,84 C32,78 40,80 50,80 C60,80 68,78 76,84 C66,90 34,90 24,84 Z"
        fill="url(#ganeshaGoldGrad)"
        opacity="0.9"
      />
      <path
        d="M32,86 C40,81 60,81 68,86 C58,91 42,91 32,86 Z"
        fill="#B91C1C"
        stroke="#F5E1A4"
        strokeWidth="0.8"
      />

      {/* Auspicious Royal Ears (Karna) */}
      <path
        d="M34,42 C16,35 12,48 16,60 C19,68 28,67 35,60 Z"
        fill="url(#ganeshaGoldGrad)"
        stroke="#6B111E"
        strokeWidth="1.2"
      />
      <path
        d="M66,42 C84,35 88,48 84,60 C81,68 72,67 65,60 Z"
        fill="url(#ganeshaGoldGrad)"
        stroke="#6B111E"
        strokeWidth="1.2"
      />

      {/* Ornate Multi-Tiered Royal Mukuta (Crown) */}
      <polygon
        points="50,9 55,18 62,28 38,28 45,18"
        fill="url(#ganeshaCrownGrad)"
        stroke="#5A0E18"
        strokeWidth="1"
      />
      <path
        d="M33,34 L67,34 L63,25 L37,25 Z"
        fill="url(#ganeshaCrownGrad)"
        stroke="#5A0E18"
        strokeWidth="1"
      />
      <rect x="31" y="33" width="38" height="4.5" rx="2.2" fill="#FFF3C4" stroke="#761824" strokeWidth="0.9" />
      {/* Crown Ruby Jewel */}
      <circle cx="50" cy="26" r="3.2" fill="#DC2626" stroke="#FFF7D6" strokeWidth="1" />
      <circle cx="50" cy="11" r="2.2" fill="#FFF7D6" />

      {/* Lord Ganesha Head & Graceful Curving Trunk */}
      <path
        d="M34,37 C33,50 37,59 43,64 C45,68 45,74 49,77 C54,80 63,79 65,73 C66,69 62,67 59,69 C58,70 59,72 57,73 C54,74 52,71 53,65 C55,60 64,53 66,37 Z"
        fill="url(#ganeshaGoldGrad)"
        stroke="#5A0E18"
        strokeWidth="1.2"
      />

      {/* Sacred Tilak / Tripundra & Suryavamsha Bindu on Forehead */}
      <path d="M43,42 Q50,44 57,42" fill="none" stroke="#991B1B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M44,45.5 Q50,47.5 56,45.5" fill="none" stroke="#991B1B" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="50" cy="43.5" r="2.1" fill="#DC2626" stroke="#FFF7D6" strokeWidth="0.6" />

      {/* Serene Eyes */}
      <path d="M38,49 Q42,47 45,49" fill="none" stroke="#3E0810" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M55,49 Q58,47 62,49" fill="none" stroke="#3E0810" strokeWidth="1.4" strokeLinecap="round" />

      {/* Ekadanta Tusk & Auspicious Modaka */}
      <path d="M42,60 L38,65 L44,63 Z" fill="#FFFDF7" />
      <circle cx="62" cy="71" r="3" fill="#FDE047" stroke="#761824" strokeWidth="0.8" />
    </svg>
  </div>
);

interface HeaderLocalizedStrings {
  portalMainTitle: string;
  portalSubtitle: string;
  ganeshaMantra: string;
  menuLabel: string;
  closeMenuLabel: string;
  memberLoginLabel: string;
  registerAccountLabel: string;
  searchBtn: string;
  royalDynasties: string;
  documentedPersonages: string;
  inscriptionsEpigraphic: string;
  surnamesArchives: string;
  surnamesShort: string;
  documents: string;
  drawerHeading: string;
  drawerSubheading: string;
  viewTestPageLabel: string;
}

const NAVBAR_I18N: Record<string, HeaderLocalizedStrings> = {
  en: {
    portalMainTitle: 'Suryavamsha Odiyaraju Kshatriya',
    portalSubtitle: 'Historical and Royal Heritage Portal',
    ganeshaMantra: 'OM SRI GANESHAYA NAMAHA',
    menuLabel: 'Menu',
    closeMenuLabel: 'Close Menu',
    memberLoginLabel: 'Member Login',
    registerAccountLabel: 'Register Account',
    searchBtn: 'Search',
    royalDynasties: 'Royal Dynasties',
    documentedPersonages: 'Documented Historical Personages',
    inscriptionsEpigraphic: 'Inscriptions & Epigraphic Records',
    surnamesArchives: 'Surnames & Archives',
    surnamesShort: 'Community Surnames',
    documents: 'Historical Documents & Charters',
    drawerHeading: 'Royal Archival Directory',
    drawerSubheading: 'Main Categories & Subcategories',
    viewTestPageLabel: 'View Original Layout – Test Page'
  },
  hi: {
    portalMainTitle: 'सूर्यवंश ओडियाराजु क्षत्रिय',
    portalSubtitle: 'ऐतिहासिक एवं शाही विरासत पोर्टल',
    ganeshaMantra: 'ॐ श्री गणेशाय नमः',
    menuLabel: 'मेनू',
    closeMenuLabel: 'मेनू बंद करें',
    memberLoginLabel: 'सदस्य लॉगिन',
    registerAccountLabel: 'खाता पंजीकरण',
    searchBtn: 'खोजें',
    royalDynasties: 'शाही राजवंश',
    documentedPersonages: 'प्रलेखित ऐतिहासिक विभूतियाँ (राजा एवं रानियाँ)',
    inscriptionsEpigraphic: 'शिलालेख एवं पुरालेखीय अभिलेख',
    surnamesArchives: 'उपनाम एवं अभिलेखागार',
    surnamesShort: 'सामुदायिक उपनाम',
    documents: 'ऐतिहासिक दस्तावेज एवं ताम्रपत्र',
    drawerHeading: 'शाही अभिलेखीय निर्देशिका',
    drawerSubheading: 'मुख्य श्रेणियाँ एवं उप-श्रेणियाँ',
    viewTestPageLabel: 'मूल लेआउट देखें – टेस्ट पेज'
  },
  te: {
    portalMainTitle: 'సూర్యవంశ ఒడియరాజు క్షత్రియ',
    portalSubtitle: 'చారిత్రక మరియు రాజ వారసత్వ పోర్టల్',
    ganeshaMantra: 'ఓం శ్రీ గణేశాయ నమః',
    menuLabel: 'మెనూ',
    closeMenuLabel: 'మెనూ మూసివేయి',
    memberLoginLabel: 'సభ్యుల లాగిన్',
    registerAccountLabel: 'ఖాతా నమోదు',
    searchBtn: 'వెతకండి',
    royalDynasties: 'రాజవంశాలు',
    documentedPersonages: 'ధృవీకరించబడిన చారిత్రక వ్యక్తులు (రాజులు & రాణులు)',
    inscriptionsEpigraphic: 'శిలాశాసనాలు & తామ్రపత్ర రికార్డులు',
    surnamesArchives: 'ఇంటిపేర్లు & పురావస్తు భాండాగారం',
    surnamesShort: 'వంశ ఇంటిపేర్లు',
    documents: 'చారిత్రక పత్రాలు & తాళపత్రాలు',
    drawerHeading: 'రాజ చారిత్రక డైరెక్టరీ',
    drawerSubheading: 'ప్రధాన విభాగాలు & ఉప విభాగాలు',
    viewTestPageLabel: 'పాత లేఅవుట్ చూడండి – టెస్ట్ పేజీ'
  },
  kn: {
    portalMainTitle: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ',
    portalSubtitle: 'ಐತಿಹಾಸಿಕ ಮತ್ತು ರಾಜ ಪರಂಪರೆಯ ಪೋರ್ಟಲ್',
    ganeshaMantra: 'ಓಂ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ',
    menuLabel: 'ಮೆನು',
    closeMenuLabel: 'ಮೆನು ಮುಚ್ಚಿ',
    memberLoginLabel: 'ಸದಸ್ಯರ ಲಾಗಿನ್',
    registerAccountLabel: 'ಖಾತೆ ನೋಂದಣಿ',
    searchBtn: 'ಹುಡುಕಿ',
    royalDynasties: 'ರಾಜವಂಶಗಳು',
    documentedPersonages: 'ದಾಖಲಿತ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು (ಅರಸರು ಮತ್ತು ರಾಣಿಯರು)',
    inscriptionsEpigraphic: 'ಶಾಸನಗಳು ಮತ್ತು ಪುರಾತತ್ವ ದಾಖಲೆಗಳು',
    surnamesArchives: 'ಉಪನಾಮಗಳು ಮತ್ತು ಪತ್ರಾಗಾರ',
    surnamesShort: 'ಸಮುದಾಯ ಉಪನಾಮಗಳು',
    documents: 'ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ತಾಮ್ರಪತ್ರಗಳು',
    drawerHeading: 'ರಾಜ ಪರಂಪರೆಯ ನಿರ್ದೇಶಿಕೆ',
    drawerSubheading: 'ಮುಖ್ಯ ವಿಭಾಗಗಳು ಮತ್ತು ಉಪ-ವಿಭಾಗಗಳು',
    viewTestPageLabel: 'ಮೂಲ ವಿನ್ಯಾಸ ನೋಡಿ – ಟೆಸ್ಟ್ ಪೇಜ್'
  },
  ta: {
    portalMainTitle: 'சூரியவம்ச ஒடியராஜு சத்திரிய',
    portalSubtitle: 'வரலாற்று மற்றும் அரச பாரம்பரிய வலைத்தளம்',
    ganeshaMantra: 'ஓம் ஸ்ரீ கணேசாய நமஹ',
    menuLabel: 'பட்டியல்',
    closeMenuLabel: 'பட்டியலை மூடு',
    memberLoginLabel: 'உறுப்பினர் உள்நுழைவு',
    registerAccountLabel: 'கணக்கு பதிவு',
    searchBtn: 'தேடுக',
    royalDynasties: 'அரச வம்சங்கள்',
    documentedPersonages: 'ஆவணப்படுத்தப்பட்ட வரலாற்று ஆளுமைகள்',
    inscriptionsEpigraphic: 'கல்வெட்டுகள் & செப்பேட்டு ஆவணங்கள்',
    surnamesArchives: 'குலப்பெயர்கள் & ஆவணக் காப்பகம்',
    surnamesShort: 'சமூக குலப்பெயர்கள்',
    documents: 'வரலாற்று ஆவணங்கள் & பட்டயங்கள்',
    drawerHeading: 'அரச ஆவணக் காப்பகப் பட்டியல்',
    drawerSubheading: 'முதன்மை மற்றும் துணைப் பிரிவுகள்',
    viewTestPageLabel: 'அசல் வடிவமைப்பு – சோதனைப் பக்கம்'
  },
  mr: {
    portalMainTitle: 'सूर्यवंश ओडियाराजु क्षत्रिय',
    portalSubtitle: 'ऐतिहासिक आणि शाही वारसा पोर्टल',
    ganeshaMantra: 'ॐ श्री गणेशाय नमः',
    menuLabel: 'मेनू',
    closeMenuLabel: 'मेनू बंद करा',
    memberLoginLabel: 'सदस्य लॉगिन',
    registerAccountLabel: 'खाते नोंदणी',
    searchBtn: 'शोधा',
    royalDynasties: 'राजवंश',
    documentedPersonages: 'प्रलेखित ऐतिहासिक विभूती (राजे आणि राण्या)',
    inscriptionsEpigraphic: 'शिलालेख आणि पुराभिलेख नोंदी',
    surnamesArchives: 'आडनावे आणि अभिलेखागार',
    surnamesShort: 'सामुदायिक आडनावे',
    documents: 'ऐतिहासिक दस्तऐवज आणि ताम्रपट',
    drawerHeading: 'शाही अभिलेख निर्देशिका',
    drawerSubheading: 'मुख्य विभाग आणि उपविभाग',
    viewTestPageLabel: 'मूळ लेआउट पहा – टेस्ट पेज'
  },
  or: {
    portalMainTitle: 'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ',
    portalSubtitle: 'ଐତିହାସିକ ଓ ରାଜକୀୟ ଐତିହ୍ୟ ପୋର୍ଟାଲ୍',
    ganeshaMantra: 'ଓଁ ଶ୍ରୀ ଗଣେଶାୟ ନମଃ',
    menuLabel: 'ମେନୁ',
    closeMenuLabel: 'ମେନୁ ବନ୍ଦ କରନ୍ତୁ',
    memberLoginLabel: 'ସଦସ୍ୟ ଲଗଇନ୍',
    registerAccountLabel: 'ଆକାଉଣ୍ଟ ପଞ୍ଜୀକରଣ',
    searchBtn: 'ଖୋଜନ୍ତୁ',
    royalDynasties: 'ରାଜବଂଶ',
    documentedPersonages: 'ପ୍ରମାଣିତ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ (ରାଜା ଓ ରାଣୀ)',
    inscriptionsEpigraphic: 'ଶିଳାଲେଖ ଓ ତାମ୍ରଶାସନ ଅଭିଲେଖ',
    surnamesArchives: 'ସାଙ୍ଗିଆ ଓ ଅଭିଲେଖାଗାର',
    surnamesShort: 'ସମ୍ପ୍ରଦାୟ ସାଙ୍ଗିଆ',
    documents: 'ଐତିହାସିକ ଦଲିଲ ଓ ତାମ୍ରଶାସନ',
    drawerHeading: 'ରାଜକୀୟ ଅଭିଲେଖ ନିର୍ଦ୍ଦେଶିକା',
    drawerSubheading: 'ମୁଖ୍ୟ ବିଭାଗ ଓ ଉପ-ବିଭାଗ',
    viewTestPageLabel: 'ମୂଳ ଲେଆଉଟ୍ ଦେଖନ୍ତୁ – ଟେଷ୍ଟ ପେଜ୍'
  },
  bn: {
    portalMainTitle: 'সূর্যবংশ ওড়িয়ারাজু ক্ষত্রিয়',
    portalSubtitle: 'ঐতিহাসিক ও রাজকীয় ঐতিহ্য পোর্টাল',
    ganeshaMantra: 'ওঁ শ্রী গণেশায় নমঃ',
    menuLabel: 'মেনু',
    closeMenuLabel: 'মেনু বন্ধ করুন',
    memberLoginLabel: 'সদস্য লগইন',
    registerAccountLabel: 'অ্যাকাউন্ট নিবন্ধন',
    searchBtn: 'খুঁজুন',
    royalDynasties: 'রাজবংশ',
    documentedPersonages: 'নথিবদ্ধ ঐতিহাসিক ব্যক্তিত্ব (রাজা ও রানী)',
    inscriptionsEpigraphic: 'শিলালিপি ও লিপিতাত্ত্বিক নথি',
    surnamesArchives: 'পদবি ও আর্কাইভ',
    surnamesShort: 'সম্প্রদায়ের পদবি',
    documents: 'ঐতিহাসিক দলিল ও তাম্রশাসন',
    drawerHeading: 'রাজকীয় আর্কাইভ নির্দেশিকা',
    drawerSubheading: 'প্রধান বিভাগ ও উপ-বিভাগ',
    viewTestPageLabel: 'মূল লেআউট দেখুন – টেস্ট পেজ'
  }
};

interface DrawerSubItem {
  path: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

interface DrawerCategoryItem {
  id: string;
  path: string;
  label: string;
  iconWebp: string;
  icon: React.FC<{ className?: string }>;
  subItems?: DrawerSubItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const { t, language } = useLanguage();
  const navUi = NAVBAR_I18N[language] || NAVBAR_I18N.en;
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>('dynasties');
  const [logoError, setLogoError] = useState(false);

  const isAdminOrEditor =
    user &&
    ['super_admin', 'admin', 'historical_editor', 'research_reviewer', 'translator', 'community_moderator'].includes(
      user.role
    );

  // Close drawer on Escape key
  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  const navigateTo = (path: string) => {
    setDrawerOpen(false);
    onNavigate(path);
  };

  const toggleCategoryGroup = (id: string) => {
    setExpandedGroup(prev => (prev === id ? null : id));
  };

  const drawerCategories: DrawerCategoryItem[] = [
    {
      id: 'home',
      path: '/',
      label: t.nav.home || 'Home',
      iconWebp: ASSET_WEBP('logo-sun-emblem.webp'),
      icon: Home
    },
    {
      id: 'community-heritage',
      path: '/community-heritage',
      label: t.nav.communityHeritage || 'Community Heritage',
      iconWebp: ASSET_WEBP('icon-community.webp'),
      icon: Crown,
      subItems: [
        {
          path: '/community-heritage',
          label: t.nav.communityHeritage || 'Community Heritage',
          icon: Crown
        },
        {
          path: '/culture-traditions',
          label: t.nav.culture || 'Culture & Traditions',
          icon: Sparkles
        },
        {
          path: '/directory',
          label: t.nav.directory || 'Community Directory',
          icon: Users
        },
        {
          path: '/community-activities',
          label: t.nav.activities || 'Community Activities',
          icon: Users
        },
        {
          path: '/events',
          label: t.nav.events || 'Events & Notices',
          icon: Calendar
        }
      ]
    },
    {
      id: 'personages',
      path: '/kings-queens',
      label: t.nav.documentedFigures || 'Historical Personages',
      iconWebp: ASSET_WEBP('icon-personages.webp'),
      icon: Users,
      subItems: [
        {
          path: '/kings-queens',
          label: navUi.documentedPersonages,
          icon: Crown
        },
        {
          path: '/community-prominent-persons',
          label: t.nav.communityProminentPersons || 'Community Prominent Persons',
          icon: Users
        },
        {
          path: '/historical-persons',
          label: t.nav.historicalPersons || 'Historical Persons Archive',
          icon: User
        }
      ]
    },
    {
      id: 'dynasties',
      path: '/gajapathi-kings',
      label: navUi.royalDynasties,
      iconWebp: ASSET_WEBP('icon-dynasties.webp'),
      icon: Shield,
      subItems: [
        {
          path: '/gajapathi-kings',
          label: t.nav.gajapathiKings || 'Suryavamsha Gajapathi Dynasty',
          icon: Shield
        },
        {
          path: '/odra-desha',
          label: t.nav.odraDesha || 'Odra Kingdom & Geography',
          icon: Compass
        },
        {
          path: '/kalinga-war',
          label: t.nav.kalingaWar || 'Kalinga Empire & War (261 BCE)',
          icon: Scroll
        },
        {
          path: '/dynasties',
          label: t.nav.dynasties || 'Kingdoms & Dynasties',
          icon: Crown
        },
        {
          path: '/genealogy',
          label: t.nav.genealogy || 'Royal Genealogy Tree',
          icon: Crown
        },
        {
          path: '/timeline',
          label: t.nav.timeline || 'Historical Timeline',
          icon: Scroll
        },
        {
          path: '/maps',
          label: t.nav.maps || 'Trikalinga & Historical Maps',
          icon: Compass
        }
      ]
    },
    {
      id: 'monographs',
      path: '/documentary',
      label: t.nav.documentary || 'Historical Monographs',
      iconWebp: ASSET_WEBP('icon-monographs.webp'),
      icon: BookOpen
    },
    {
      id: 'epigraphy',
      path: '/inscriptions',
      label: t.nav.inscriptions || 'Inscriptions & Records',
      iconWebp: ASSET_WEBP('icon-inscriptions.webp'),
      icon: Scroll,
      subItems: [
        {
          path: '/inscriptions',
          label: navUi.inscriptionsEpigraphic,
          icon: Scroll
        },
        {
          path: '/temples-monuments',
          label: t.nav.temples || 'Temples & Monuments',
          icon: Landmark
        },
        {
          path: '/documents',
          label: navUi.documents,
          icon: FileText
        },
        {
          path: '/literature',
          label: t.nav.literature || 'Books & Publications',
          icon: BookOpen
        },
        {
          path: '/research',
          label: t.nav.research || 'Research Articles',
          icon: BookOpen
        },
        {
          path: '/references',
          label: t.nav.references || 'Historical References',
          icon: Scroll
        }
      ]
    },
    {
      id: 'surnames',
      path: '/community-surnames',
      label: navUi.surnamesShort,
      iconWebp: ASSET_WEBP('icon-surnames.webp'),
      icon: Award,
      subItems: [
        {
          path: '/community-surnames',
          label: t.nav.communitySurnames || 'Community Surnames [South-Indian]',
          icon: Shield
        },
        {
          path: '/community-surnames-north-indian-oad-community',
          label: t.nav.communitySurnamesNorth || 'Community Surnames [North-Indian]',
          icon: Shield
        },
        {
          path: '/surnames',
          label: navUi.surnamesArchives,
          icon: Award
        }
      ]
    },
    {
      id: 'gallery-archives',
      path: '/gallery',
      label: t.nav.gallery || 'Gallery & Archives',
      iconWebp: ASSET_WEBP('icon-gallery.webp'),
      icon: ImageIcon,
      subItems: [
        {
          path: '/gallery',
          label: t.nav.gallery || 'Gallery & Archives',
          icon: ImageIcon
        },
        {
          path: '/submit-research',
          label: t.nav.submitResearch || 'Submit Research',
          icon: Scroll
        },
        {
          path: '/about',
          label: t.nav.about || 'About Portal',
          icon: FileText
        },
        {
          path: '/contact',
          label: t.nav.contact || 'Contact',
          icon: Users
        },
        {
          path: '/test-page',
          label: navUi.viewTestPageLabel,
          icon: Layers
        }
      ]
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full royal-header-scope shadow-[0_6px_24px_rgba(32,4,9,0.65)]">
        {/* ===================================================================
            HEADER ROW 1: DEEP ROYAL MAROON BRAND BAR
            - Left: Circular Suryavamsha Emblem + Portal Title & Subtitle
            - Header Blessing Area: Lord Ganesha Icon + "OM SRI GANESHAYA NAMAHA"
              below it in small elegant gold letters (exact English letters in all 8 languages)
            - Right: 8-Language Selector
        =================================================================== */}
        <div
          className="royal-maroon-banner w-full border-b border-[#D4AF37]/75 px-2 sm:px-6 lg:px-8 py-2 sm:py-3"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(62, 10, 18, 0.98) 0%, rgba(92, 16, 26, 0.96) 55%, rgba(48, 7, 13, 0.99) 100%), url("${ASSET_WEBP('bg-maroon-texture.webp')}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4 min-w-0">
            {/* Left: Circular Suryavamsha Emblem + Prominent High-Contrast Title & Subtitle */}
            <div
              onClick={() => navigateTo('/')}
              className="flex items-center gap-2 sm:gap-3.5 cursor-pointer group min-w-0 flex-1"
            >
              {!logoError ? (
                <div className="relative w-9 h-9 xs:w-10 xs:h-10 sm:w-14 sm:h-14 rounded-full p-0.5 bg-gradient-to-br from-[#FFF3C4] via-[#D4AF37] to-[#8C6214] shadow-[0_0_16px_rgba(212,175,55,0.6)] shrink-0">
                  <img
                    src={ASSET_WEBP('logo-sun-emblem.webp')}
                    alt={navUi.portalMainTitle}
                    className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
                    loading="eager"
                    decoding="async"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <RoyalSunCrest className="w-9 h-9 xs:w-10 xs:h-10 sm:w-14 sm:h-14 shrink-0 group-hover:scale-105 transition-transform" />
              )}

              <div className="min-w-0 flex-1">
                <h1 className="royal-text-gold font-serif font-extrabold text-[12px] xs:text-[13.5px] sm:text-xl lg:text-2xl tracking-wide leading-[1.25] break-words drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                  {navUi.portalMainTitle}
                </h1>
                <p className="royal-text-ivory font-serif font-semibold text-[10px] xs:text-[11px] sm:text-sm tracking-wide leading-[1.3] break-words drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] mt-0.5">
                  {navUi.portalSubtitle}
                </p>
              </div>
            </div>

            {/* Right of Row 1: Sacred Lord Ganesha Icon + Multilingual "OM SRI GANESHAYA NAMAHA" & Language Selector */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Lord Ganesha Icon with "OM SRI GANESHAYA NAMAHA" in all 8 languages & extra-small gold letters */}
              <div
                className="flex flex-col items-center justify-center text-center px-1.5 sm:px-2.5 py-1 rounded-xl bg-[#2B0409]/75 border border-[#D4AF37]/65 shadow-inner shrink-0"
                aria-label={navUi.ganeshaMantra}
              >
                <RoyalGaneshaBlessingIcon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />
                <span
                  className="royal-text-gold font-serif font-extrabold text-[6px] xs:text-[6.5px] sm:text-[8px] tracking-[0.02em] leading-[1.2] uppercase mt-0.5 max-w-[74px] xs:max-w-[84px] sm:max-w-none block drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                >
                  {navUi.ganeshaMantra}
                </span>
              </div>

              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* ===================================================================
            HEADER ROW 2: FULL-WIDTH HORIZONTAL ANTIQUE YELLOW / GOLD BAR
            - Left: Menu button
            - Right: Member Login, Register Account, and Small Search Icon
            - Compact responsive spacing so all 3 fit cleanly on mobile screens
        =================================================================== */}
        <div className="royal-gold-bar w-full px-2 sm:px-6 lg:px-8 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2 min-w-0">
            {/* LEFT: Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(prev => !prev)}
              className="royal-btn-maroon min-h-[34px] px-2 sm:px-3.5 py-1 rounded-lg shadow-sm flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-serif font-extrabold leading-[1.25] transition-all cursor-pointer shrink-0"
              aria-label={drawerOpen ? navUi.closeMenuLabel : navUi.menuLabel}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? (
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              ) : (
                <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              )}
              <span className="whitespace-nowrap">{navUi.menuLabel}</span>
            </button>

            {/* RIGHT TOP CORNER OF YELLOW BAR: 1. Member Login, 2. Register Account, 3. Small Search Icon */}
            <div className="flex items-center justify-end gap-1 sm:gap-2 ml-auto min-w-0 shrink-0">
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => navigateTo('/dashboard')}
                    className="royal-btn-maroon min-h-[32px] sm:min-h-[34px] px-2 sm:px-3 py-1 rounded-lg text-[10.5px] sm:text-xs font-serif font-bold leading-[1.25] flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                    title={t.nav.dashboard}
                  >
                    <User className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate max-w-[78px] sm:max-w-[120px]">
                      {user.profile?.full_name || t.nav.dashboard}
                    </span>
                  </button>

                  {isAdminOrEditor && (
                    <button
                      type="button"
                      onClick={() => navigateTo('/admin')}
                      className="royal-btn-maroon min-h-[32px] min-w-[32px] sm:min-h-[34px] sm:min-w-[34px] p-1.5 rounded-lg flex items-center justify-center shadow-sm cursor-pointer"
                      title={t.nav.admin}
                    >
                      <Shield className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => logout()}
                    className="royal-btn-maroon min-h-[32px] min-w-[32px] sm:min-h-[34px] sm:min-w-[34px] p-1.5 rounded-lg flex items-center justify-center shadow-sm cursor-pointer"
                    title={t.nav.logout}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <>
                  {/* 1. Member Login */}
                  <button
                    type="button"
                    onClick={() => navigateTo('/login')}
                    className="royal-btn-ivory min-h-[32px] sm:min-h-[34px] px-2 sm:px-3 py-1 rounded-lg text-[10px] xs:text-[10.5px] sm:text-xs font-serif font-extrabold leading-[1.2] shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    {navUi.memberLoginLabel}
                  </button>

                  {/* 2. Register Account */}
                  <button
                    type="button"
                    onClick={() => navigateTo('/register')}
                    className="royal-btn-maroon min-h-[32px] sm:min-h-[34px] px-2 sm:px-3 py-1 rounded-lg text-[10px] xs:text-[10.5px] sm:text-xs font-serif font-extrabold leading-[1.2] shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    {navUi.registerAccountLabel}
                  </button>
                </>
              )}

              {/* 3. Small Search Icon */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="royal-btn-maroon min-h-[32px] min-w-[32px] sm:min-h-[34px] sm:min-w-[34px] p-1.5 rounded-lg flex items-center justify-center shadow-sm transition-all cursor-pointer shrink-0"
                title={navUi.searchBtn}
                aria-label={navUi.searchBtn}
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          SLIDE-OUT HAMBURGER SIDE MENU DRAWER
          - Reduced width: w-[74vw] max-w-[295px]
          - All main navigation categories and their dropdown subcategories
          - No contact number or ZIP button in the drawer footer
      ===================================================================== */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-Out Drawer Panel (Compact Width: w-[74vw] max-w-[295px]) */}
          <aside
            aria-label={navUi.drawerHeading}
            className="relative z-10 w-[74vw] max-w-[295px] h-full bg-[#FDF6E4] text-[#2A1810] border-r-2 border-[#D4AF37] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Drawer Header (Deep Royal Maroon) */}
            <div
              className="royal-maroon-banner p-3.5 border-b-2 border-[#D4AF37] flex items-center justify-between gap-2 shrink-0"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(64, 9, 17, 0.98) 0%, rgba(44, 6, 12, 0.99) 100%), url("${ASSET_WEBP('bg-maroon-texture.webp')}")`,
                backgroundSize: 'cover'
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={ASSET_WEBP('logo-sun-emblem.webp')}
                  alt=""
                  className="w-9 h-9 rounded-full border border-[#D4AF37] object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="royal-text-gold font-serif font-extrabold text-xs sm:text-sm leading-[1.3] break-words">
                    {navUi.drawerHeading}
                  </div>
                  <div className="royal-text-ivory text-[10.5px] leading-[1.32] break-words opacity-95">
                    {navUi.drawerSubheading}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="royal-btn-maroon min-h-[32px] min-w-[32px] p-1.5 rounded-lg flex items-center justify-center cursor-pointer shrink-0"
                aria-label={navUi.closeMenuLabel}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Categories & Dropdown Subcategories List */}
            <div className="flex-1 overflow-y-auto px-2.5 py-2.5 space-y-2">
              {drawerCategories.map(category => {
                const hasSubItems = Array.isArray(category.subItems) && category.subItems.length > 0;
                const isExpanded = expandedGroup === category.id;
                const isActive =
                  currentPath === category.path ||
                  (category.subItems && category.subItems.some(sub => sub.path === currentPath));

                return (
                  <div
                    key={category.id}
                    className={`rounded-xl border transition-all overflow-hidden ${
                      isActive
                        ? 'border-[#5C121D] bg-[#FFF9EB] shadow-sm'
                        : 'border-[#D4AF37]/60 bg-[#FFFDF8]'
                    }`}
                  >
                    <div className="flex items-stretch justify-between">
                      {/* Main Category Action */}
                      <button
                        type="button"
                        onClick={() => {
                          if (hasSubItems) {
                            toggleCategoryGroup(category.id);
                          } else {
                            navigateTo(category.path);
                          }
                        }}
                        className="flex-1 flex items-center gap-2 px-2.5 py-2 text-left cursor-pointer min-w-0 hover:bg-[#F5E6C8]/60 transition-colors"
                      >
                        <img
                          src={category.iconWebp}
                          alt=""
                          aria-hidden="true"
                          className="w-6 h-6 rounded-md object-cover border border-[#D4AF37] shrink-0"
                          loading="lazy"
                        />
                        <span className="font-serif font-bold text-xs text-[#3B0A11] leading-[1.35] break-words">
                          {category.label}
                        </span>
                      </button>

                      {/* Dropdown Toggle or Direct Arrow */}
                      {hasSubItems ? (
                        <button
                          type="button"
                          onClick={() => toggleCategoryGroup(category.id)}
                          className="px-2.5 flex items-center justify-center border-l border-[#D4AF37]/40 text-[#5C121D] hover:bg-[#F5E6C8] cursor-pointer shrink-0"
                          aria-label={category.label}
                          aria-expanded={isExpanded}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => navigateTo(category.path)}
                          className="px-2.5 flex items-center justify-center text-[#8C6214] hover:bg-[#F5E6C8] cursor-pointer shrink-0"
                          aria-label={category.label}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Dropdown Subcategories */}
                    {hasSubItems && isExpanded && (
                      <div className="bg-[#F6E9CE]/75 border-t border-[#D4AF37]/45 px-2 py-1.5 space-y-1">
                        {category.subItems!.map(sub => {
                          const SubIcon = sub.icon;
                          const isSubActive = currentPath === sub.path;
                          return (
                            <button
                              key={sub.path}
                              type="button"
                              onClick={() => navigateTo(sub.path)}
                              className={`w-full flex items-center justify-between gap-1.5 px-2 py-1.5 rounded-lg text-left text-[11.5px] font-serif transition-colors cursor-pointer ${
                                isSubActive
                                  ? 'royal-maroon-banner royal-text-ivory font-bold'
                                  : 'text-[#3B0A11] hover:bg-[#EBD7B2] font-semibold'
                              }`}
                            >
                              <span className="flex items-center gap-1.5 min-w-0">
                                <SubIcon
                                  className={`w-3.5 h-3.5 shrink-0 ${
                                    isSubActive ? 'royal-text-gold' : 'text-[#761824]'
                                  }`}
                                />
                                <span className="leading-[1.32] break-words">{sub.label}</span>
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 opacity-75 shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

