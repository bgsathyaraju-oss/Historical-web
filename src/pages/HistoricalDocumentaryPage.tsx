import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Search,
  ChevronRight,
  ArrowLeft,
  Clock,
  User,
  FileText,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';
import { Article, LanguageCode } from '../types';
import { EvidenceBadge } from '../components/EvidenceBadge';
import {
  ArticleDetailView,
  getMonographPeriod,
  getMonographCategories
} from '../components/ArticleDetailView';
import { useLanguage } from '../context/LanguageContext';
import { getAllArticles } from '../data/articlesRepository';

const DOC_PAGE_UI: Record<
  LanguageCode,
  {
    catAll: string;
    catOdra: string;
    catGajapathi: string;
    catDynasties: string;
    catKings: string;
    catInscriptions: string;
    catCulture: string;
    readMoreBtn: string;
    returnHome: string;
    periodLabel: string;
    sourcesCount: (count: number) => string;
    epistemicVerifiedTitle: string;
    epistemicVerifiedDesc: string;
    epistemicTradTitle: string;
    epistemicTradDesc: string;
    epistemicScholarTitle: string;
    epistemicScholarDesc: string;
    noResults: string;
    resetFilters: string;
  }
> = {
  en: {
    catAll: 'All Monographs',
    catOdra: 'Odra Desha & Geography',
    catGajapathi: 'Gajapathi Kings & Empire',
    catDynasties: 'Dynasties & Lineage',
    catKings: 'Kings & Progenitors',
    catInscriptions: 'Inscriptions & Epigraphy',
    catCulture: 'Culture & Community',
    readMoreBtn: 'Read More — Complete Monograph & Chapters',
    returnHome: 'Return to Home',
    periodLabel: 'Historical Period:',
    sourcesCount: count => `${count} Primary Citations`,
    epistemicVerifiedTitle: 'Verified Epigraphic Evidence',
    epistemicVerifiedDesc: 'Corroborated by copper-plate grants, temple inscriptions, and archaeological surveys.',
    epistemicTradTitle: 'Traditional Chronicles & Vamsavalis',
    epistemicTradDesc: 'Preserved in Puranic genealogies, Madala Panji annals, and community heritage.',
    epistemicScholarTitle: 'Scholarly Historiography',
    epistemicScholarDesc: 'Peer-reviewed historical analysis distinguishing primary edicts from devotional tradition.',
    noResults: 'No historical monographs match your search or category filter.',
    resetFilters: 'Reset All Filters'
  },
  hi: {
    catAll: 'सभी मोनोग्राफ',
    catOdra: 'ओड्र देश और भूगोल',
    catGajapathi: 'गजपति राजा और साम्राज्य',
    catDynasties: 'राजवंश और वंशावली',
    catKings: 'राजा और आदि-पुरुष',
    catInscriptions: 'शिलालेख और पुरालेख',
    catCulture: 'संस्कृति और समुदाय',
    readMoreBtn: 'अधिक पढ़ें — संपूर्ण मोनोग्राफ एवं अध्याय',
    returnHome: 'मुख्य पृष्ठ पर लौटें',
    periodLabel: 'ऐतिहासिक काल:',
    sourcesCount: count => `${count} प्राथमिक संदर्भ`,
    epistemicVerifiedTitle: 'प्रमाणित शिलालेख साक्ष्य',
    epistemicVerifiedDesc: 'ताम्रपत्रों, मंदिर शिलालेखों और पुरातात्विक सर्वेक्षणों द्वारा पुष्ट।',
    epistemicTradTitle: 'पारंपरिक वृत्तांत एवं वंशावली',
    epistemicTradDesc: 'पौराणिक वंशावलियों, मादला पंजी और सामुदायिक विरासत में संरक्षित।',
    epistemicScholarTitle: 'विद्वत इतिहास-लेखन',
    epistemicScholarDesc: 'प्राथमिक शिलालेखों और पारंपरिक आख्यानों का समीक्षात्मक विश्लेषण।',
    noResults: 'आपकी खोज से मेल खाता कोई ऐतिहासिक मोनोग्राफ नहीं मिला।',
    resetFilters: 'फ़िल्टर रीसेट करें'
  },
  te: {
    catAll: 'అన్ని మోనోగ్రాఫ్‌లు',
    catOdra: 'ఓడ్ర దేశం & భౌగోళికత',
    catGajapathi: 'గజపతి రాజులు & సామ్రాజ్యం',
    catDynasties: 'రాజవంశాలు & వంశావళి',
    catKings: 'రాజులు & ఆది పురుషులు',
    catInscriptions: 'శాసనాలు & ఎపిగ్రఫీ',
    catCulture: 'సంస్కృతి & సమాజం',
    readMoreBtn: 'మరింత చదవండి — పూర్తి మోనోగ్రాఫ్ & అధ్యాయాలు',
    returnHome: 'హోమ్ పేజీకి తిరిగి వెళ్ళండి',
    periodLabel: 'చారిత్రక కాలం:',
    sourcesCount: count => `${count} మూల ఆధారాలు`,
    epistemicVerifiedTitle: 'ధృవీకరించబడిన శాసన ఆధారాలు',
    epistemicVerifiedDesc: 'తామ్రపత్రాలు, ఆలయ శిలాశాసనాలు మరియు పురావస్తు ఆధారాలతో నిర్ధారించబడినవి.',
    epistemicTradTitle: 'సాంప్రదాయ వంశావళులు',
    epistemicTradDesc: 'పురాణ వంశావళులు, మాదలా పంజీ మరియు తరతరాల వారసత్వంలో భద్రపరచబడినవి.',
    epistemicScholarTitle: 'చారిత్రక పరిశోధనా విశ్లేషణ',
    epistemicScholarDesc: 'శాసన ఆధారాలు మరియు సాంప్రదాయ కథనాల సమగ్ర విశ్లేషణ.',
    noResults: 'మీ శోధనకు సరిపోయే చారిత్రక మోనోగ్రాఫ్‌లు కనుగొనబడలేదు.',
    resetFilters: 'ఫిల్టర్లను రీసెట్ చేయండి'
  },
  kn: {
    catAll: 'ಎಲ್ಲಾ ಮೊನೊಗ್ರಾಫ್‌ಗಳು',
    catOdra: 'ಓಡ್ರ ದೇಶ ಮತ್ತು ಭೂಗೋಳ',
    catGajapathi: 'ಗಜಪತಿ ರಾಜರು ಮತ್ತು ಸಾಮ್ರಾಜ್ಯ',
    catDynasties: 'ರಾಜವಂಶಗಳು ಮತ್ತು ವಂಶಾವಳಿ',
    catKings: 'ರಾಜರು ಮತ್ತು ಆದಿಪುರುಷರು',
    catInscriptions: 'ಶಾಸನಗಳು ಮತ್ತು ಎಪಿಗ್ರಫಿ',
    catCulture: 'ಸಂಸ್ಕೃತಿ ಮತ್ತು ಸಮುದಾಯ',
    readMoreBtn: 'ಮುಂದೆ ಓದಿ — ಸಂಪೂರ್ಣ ಮೊನೊಗ್ರಾಫ್ ಮತ್ತು ಅಧ್ಯಾಯಗಳು',
    returnHome: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    periodLabel: 'ಐತಿಹಾಸಿಕ ಕಾಲ:',
    sourcesCount: count => `${count} ಮೂಲ ಉಲ್ಲೇಖಗಳು`,
    epistemicVerifiedTitle: 'ದೃಢೀಕೃತ ಶಾಸನ ಸಾಕ್ಷ್ಯ',
    epistemicVerifiedDesc: 'ತಾಮ್ರಪತ್ರಗಳು, ದೇವಾಲಯದ ಶಾಸನಗಳು ಮತ್ತು ಪುರಾತತ್ವ ದಾಖಲೆಗಳಿಂದ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ.',
    epistemicTradTitle: 'ಸಾಂಪ್ರದಾಯಿಕ ವಂಶಾವಳಿಗಳು',
    epistemicTradDesc: 'ಪುರಾಣ ವಂಶಾವಳಿಗಳು, ಮಾದಲಾ ಪಂಜಿ ಮತ್ತು ಸಮುದಾಯ ಪರಂಪರೆಯಲ್ಲಿ ಸಂರಕ್ಷಿಸಲಾಗಿದೆ.',
    epistemicScholarTitle: 'ವಿದ್ವತ್ ಇತಿಹಾಸ ಸಂಶೋಧನೆ',
    epistemicScholarDesc: 'ಶಾಸನ ಆಧಾರಗಳು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಖಾತೆಗಳ ವಿಮರ್ಶಾತ್ಮಕ ವಿಶ್ಲೇಷಣೆ.',
    noResults: 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಮೊನೊಗ್ರಾಫ್ ಕಂಡುಬಂದಿಲ್ಲ.',
    resetFilters: 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ'
  },
  ta: {
    catAll: 'அனைத்து ஆய்வுக் கட்டுரைகள்',
    catOdra: 'ஒட்டர தேசம் & புவியியல்',
    catGajapathi: 'கஜபதி மன்னர்கள் & பேரரசு',
    catDynasties: 'வம்சங்கள் & வம்சாவளி',
    catKings: 'மன்னர்கள் & முன்னோடிகள்',
    catInscriptions: 'கல்வெட்டுகள் & சாசனங்கள்',
    catCulture: 'கலாச்சாரம் & சமூகம்',
    readMoreBtn: 'மேலும் படிக்க — முழு ஆய்வுக் கட்டுரை & அத்தியாயங்கள்',
    returnHome: 'முகப்புப் பக்கத்திற்குத் திரும்பு',
    periodLabel: 'வரலாற்றுக் காலம்:',
    sourcesCount: count => `${count} முதன்மை ஆதாரங்கள்`,
    epistemicVerifiedTitle: 'உறுதிப்படுத்தப்பட்ட கல்வெட்டுச் சான்று',
    epistemicVerifiedDesc: 'செப்பேடுகள், கோயில் கல்வெட்டுகள் மற்றும் தொல்லியல் ஆய்வுகளால் உறுதிப்படுத்தப்பட்டவை.',
    epistemicTradTitle: 'பாரம்பரிய வம்சாவளிகள்',
    epistemicTradDesc: 'புராண வம்சாவளிகள், மாதளா பஞ்சி மற்றும் சமூக மரபில் பாதுகாக்கப்பட்டவை.',
    epistemicScholarTitle: 'வரலாற்று அறிஞர் ஆய்வு',
    epistemicScholarDesc: 'கல்வெட்டுச் சான்றுகள் மற்றும் மரபு வரலாறுகளின் பகுப்பாய்வு.',
    noResults: 'உங்கள் தேடலுக்குப் பொருந்தும் ஆய்வுக் கட்டுரைகள் எதுவும் கிடைக்கவில்லை.',
    resetFilters: 'வடிகட்டிகளை மீட்டமை'
  },
  mr: {
    catAll: 'सर्व मोनोग्राफ',
    catOdra: 'ओड्र देश आणि भूगोल',
    catGajapathi: 'गजपती राजे आणि साम्राज्य',
    catDynasties: 'राजवंश आणि वंशावळ',
    catKings: 'राजे आणि पूर्वज',
    catInscriptions: 'शिलालेख आणि कोरीव लेख',
    catCulture: 'संस्कृती आणि समुदाय',
    readMoreBtn: 'अधिक वाचा — संपूर्ण मोनोग्राफ आणि प्रकरणे',
    returnHome: 'मुख्य पृष्ठावर परत जा',
    periodLabel: 'ऐतिहासिक काळ:',
    sourcesCount: count => `${count} प्राथमिक संदर्भ`,
    epistemicVerifiedTitle: 'प्रमाणित शिलालेख पुरावा',
    epistemicVerifiedDesc: 'ताम्रपट, मंदिर शिलालेख आणि पुरातत्त्वीय पुराव्यांद्वारे पुष्टी केलेले.',
    epistemicTradTitle: 'पारंपारिक वंशावळी',
    epistemicTradDesc: 'पौराणिक वंशावळी, मादला पंजी आणि सामुदायिक वारशात जतन केलेले.',
    epistemicScholarTitle: 'ऐतिहासिक संशोधन विश्लेषण',
    epistemicScholarDesc: 'प्राथमिक शिलालेख आणि पारंपारिक आख्यायिकांचे चिकित्सक विश्लेषण.',
    noResults: 'तुमच्या शोधाशी जुळणारा कोणताही मोनोग्राफ आढळला नाही.',
    resetFilters: 'फिल्टर रीसेट करा'
  },
  or: {
    catAll: 'ସମସ୍ତ ମୋନୋଗ୍ରାଫ୍',
    catOdra: 'ଓଡ଼୍ର ଦେଶ ଓ ଭୂଗୋଳ',
    catGajapathi: 'ଗଜପତି ରାଜା ଓ ସାମ୍ରାଜ୍ୟ',
    catDynasties: 'ରାଜବଂଶ ଓ ବଂଶାବଳୀ',
    catKings: 'ରାଜା ଓ ଆଦିପୁରୁଷ',
    catInscriptions: 'ଶିଳାଲେଖ ଓ ଅଭିଲେଖ',
    catCulture: 'ସଂସ୍କୃତି ଓ ସମାଜ',
    readMoreBtn: 'ଅଧିକ ପଢ଼ନ୍ତୁ — ସମ୍ପୂର୍ଣ୍ଣ ମୋନୋଗ୍ରାଫ୍ ଓ ଅଧ୍ୟାୟ',
    returnHome: 'ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ',
    periodLabel: 'ଐତିହାସିକ କାଳ:',
    sourcesCount: count => `${count} ମୌଳିକ ପ୍ରମାଣ`,
    epistemicVerifiedTitle: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ ସାକ୍ଷ୍ୟ',
    epistemicVerifiedDesc: 'ତାମ୍ରପଟା, ମନ୍ଦିର ଶିଳାଲେଖ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସର୍ବେକ୍ଷଣ ଦ୍ୱାରା ପ୍ରମାଣିତ।',
    epistemicTradTitle: 'ପାରମ୍ପରିକ ବଂଶାବଳୀ',
    epistemicTradDesc: 'ପୌରାଣିକ ବଂଶାବଳୀ, ମାଦଳା ପାଞ୍ଜି ଓ ସାମୁଦାୟିକ ଐତିହ୍ୟରେ ସଂରକ୍ଷିତ।',
    epistemicScholarTitle: 'ଐତିହାସିକ ଗବେଷଣା ବିଶ୍ଳେଷଣ',
    epistemicScholarDesc: 'ମୌଳିକ ଶିଳାଲେଖ ଓ ପାରମ୍ପରିକ ବିବରଣୀର ସମୀକ୍ଷାତ୍ମକ ବିଶ୍ଳେଷଣ।',
    noResults: 'ଆପଣଙ୍କ ସନ୍ଧାନ ସହିତ ମେଳ ଖାଉଥିବା କୌଣସି ମୋନୋଗ୍ରାଫ୍ ମିଳିଲା ନାହିଁ।',
    resetFilters: 'ଫିଲ୍ଟର ରିସେଟ୍ କରନ୍ତୁ'
  },
  bn: {
    catAll: 'সকল মনোগ্রাফ',
    catOdra: 'ওড্র দেশ ও ভূগোল',
    catGajapathi: 'গজপতি রাজা ও সাম্রাজ্য',
    catDynasties: 'রাজবংশ ও বংশলতিকা',
    catKings: 'রাজা ও আদিপুরুষ',
    catInscriptions: 'শিলালিপি ও অভিলেখ',
    catCulture: 'সংস্কৃতি ও সমাজ',
    readMoreBtn: 'আরও পড়ুন — সম্পূর্ণ মনোগ্রাফ ও অধ্যায়সমূহ',
    returnHome: 'হোম পেজে ফিরে যান',
    periodLabel: 'ঐতিহাসিক কাল:',
    sourcesCount: count => `${count}টি প্রাথমিক সূত্র`,
    epistemicVerifiedTitle: 'প্রমাণিত শিলালিপি সাক্ষ্য',
    epistemicVerifiedDesc: 'তাম্রশাসন, মন্দির শিলালিপি ও প্রত্নতাত্ত্বিক জরিপ দ্বারা প্রমাণিত।',
    epistemicTradTitle: 'ঐতিহ্যবাহী বংশাবলী',
    epistemicTradDesc: 'পৌরাণিক বংশাবলী, মাদলা পাঁজি ও সম্প্রদায়গত ঐতিহ্যে সংরক্ষিত।',
    epistemicScholarTitle: 'ঐতিহাসিক গবেষণা বিশ্লেষণ',
    epistemicScholarDesc: 'প্রাথমিক শিলালিপি ও ঐতিহ্যবাহী বিবরণীর সমালোচনামূলক বিশ্লেষণ।',
    noResults: 'আপনার অনুসন্ধানের সাথে মেলে এমন কোনো মনোগ্রাফ পাওয়া যায়নি।',
    resetFilters: 'ফিল্টার রিসেট করুন'
  }
};

interface DocumentaryPageProps {
  initialArticleId?: string | null;
  onNavigate: (path: string) => void;
}

export const HistoricalDocumentaryPage: React.FC<DocumentaryPageProps> = ({
  initialArticleId,
  onNavigate
}) => {
  const { language, t, translationManager, getArticleContent, getMetadataLabel } = useLanguage();
  const ui = DOC_PAGE_UI[language] || DOC_PAGE_UI.en;

  const initialArticles = getAllArticles(language);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(() => {
    if (initialArticleId) {
      const match = initialArticles.find(a => a.id === initialArticleId || a.slug === initialArticleId);
      if (match) return match.id;
    }
    try {
      const params = new URLSearchParams(window.location.search);
      const artParam = params.get('article') || params.get('id');
      if (artParam) {
        const match = initialArticles.find(a => a.id === artParam || a.slug === artParam);
        if (match) return match.id;
      }
    } catch {
      // Ignore URL parsing errors
    }
    return null;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const savedScrollY = useRef<number>(0);

  // Synchronize articles on language change, with background server sync
  useEffect(() => {
    const updated = getAllArticles(language);
    setArticles(updated);

    translationManager
      .fetchArticles(language)
      .then(remote => {
        if (remote && remote.length > 0) {
          setArticles(remote);
        }
      })
      .catch(() => {
        // Offline or network restricted - repository already provided full content
      });
  }, [language, translationManager]);

  // Update active article if URL query param changes
  useEffect(() => {
    if (initialArticleId) {
      const found = articles.find(a => a.id === initialArticleId || a.slug === initialArticleId);
      if (found) {
        setActiveArticleId(found.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [initialArticleId, articles]);

  const openMonographDetail = (article: Article) => {
    savedScrollY.current = window.scrollY;
    setActiveArticleId(article.id);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('article', article.id);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignore in sandboxed iframe
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeMonographDetail = () => {
    setActiveArticleId(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('article');
      url.searchParams.delete('id');
      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignore
    }
    setTimeout(() => {
      window.scrollTo({ top: savedScrollY.current, behavior: 'smooth' });
    }, 60);
  };

  const activeArticle = activeArticleId
    ? articles.find(a => a.id === activeArticleId || a.slug === activeArticleId) || null
    : null;

  const categories = [
    { key: 'all', label: `${ui.catAll} (${articles.length})` },
    { key: 'Odra Desha & Regional History', label: ui.catOdra },
    { key: 'Gajapathi Kingdom & Empire', label: ui.catGajapathi },
    { key: 'Dynasties and Genealogy', label: ui.catDynasties },
    { key: 'Kings and Queens', label: ui.catKings },
    { key: 'Inscriptions and Archaeological Evidence', label: ui.catInscriptions },
    { key: 'Culture & Heritage', label: ui.catCulture }
  ];

  const normQuery = (searchQuery || '').normalize('NFC').toLowerCase().trim();

  const filteredArticles = articles.filter(a => {
    if (activeCategory !== 'all') {
      const catKey = a.category.toLowerCase();
      const targetCat = activeCategory.toLowerCase();
      if (!catKey.includes(targetCat.split(' ')[0])) return false;
    }

    if (!normQuery) return true;

    const { title, summary } = getArticleContent(a);
    const normTitle = (title || '').normalize('NFC').toLowerCase();
    const normSummary = (summary || '').normalize('NFC').toLowerCase();
    const normOrigTitle = (a.original_title || '').normalize('NFC').toLowerCase();
    const normOrigSummary = (a.summary || '').normalize('NFC').toLowerCase();
    const normCat = (a.category || '').normalize('NFC').toLowerCase();

    return (
      normTitle.includes(normQuery) ||
      normSummary.includes(normQuery) ||
      normOrigTitle.includes(normQuery) ||
      normOrigSummary.includes(normQuery) ||
      normCat.includes(normQuery) ||
      a.tags.some(tag => (tag || '').normalize('NFC').toLowerCase().includes(normQuery))
    );
  });

  // ============================================================================
  // COMPLETE MONOGRAPH DETAIL VIEW
  // ============================================================================
  if (activeArticle) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <ArticleDetailView
          article={activeArticle}
          onBack={closeMonographDetail}
          onNavigate={onNavigate}
          onSelectArticle={art => openMonographDetail(art)}
          onTagClick={tag => {
            setSearchQuery(tag);
            closeMonographDetail();
          }}
          allArticles={articles}
          showLanguageSwitcher={true}
          basePath="/documentary"
        />
      </div>
    );
  }

  // ============================================================================
  // MONOGRAPH ARTICLE CARDS LIST INTERFACE
  // ============================================================================
  const fallbackThumb = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/barabati_fort_gateway.jpg`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-800 pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{ui.returnHome}</span>
          </button>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading bg-[#1a1308] px-3.5 py-1.5 rounded-full border border-[#c99738]/40">
            <BookOpen className="w-4 h-4" />
            <span>{t.documentary?.badge || 'Historical Monographs & Knowledge Repository'}</span>
          </div>
        </div>

        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {t.documentary?.title || 'Historical Monographs: Odra Desha & Suryavamsha Gajapathis'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-4xl leading-relaxed">
          {t.documentary?.subtitle ||
            'Comprehensive historical monographs examining verified epigraphic evidence, royal administrative records, dynastic genealogies, and regional geopolitical developments across Odra Desha, Kalinga, and the Deccan.'}
        </p>

        {/* 3-Pillar Epistemic Methodology Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
          <div className="p-3.5 rounded-2xl bg-[#121622] border border-emerald-800/50 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-emerald-300">{ui.epistemicVerifiedTitle}</div>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">{ui.epistemicVerifiedDesc}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#121622] border border-amber-800/50 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-300">{ui.epistemicTradTitle}</div>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">{ui.epistemicTradDesc}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#121622] border border-indigo-800/50 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-indigo-300">{ui.epistemicScholarTitle}</div>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed">{ui.epistemicScholarDesc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#121622] border border-stone-800 shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#c99738] text-[#300207] font-bold shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full lg:w-80 relative">
          <Search className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.documentary?.searchPlaceholder || 'Search monographs, periods, categories...'}
            className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-200 border border-stone-700 focus:outline-none focus:border-[#c99738]"
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
      </div>

      {/* Monograph Article Cards Grid */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-3xl bg-[#121622] border border-stone-800 p-12 text-center space-y-4">
          <BookOpen className="w-10 h-10 text-stone-600 mx-auto" />
          <p className="text-sm text-stone-300">{ui.noResults}</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#c99738] text-[#290106] text-xs font-bold cursor-pointer"
          >
            {ui.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredArticles.map(art => {
            const { title: displayTitle, summary: displaySummary } = getArticleContent(art);
            const localizedCat = getMetadataLabel('category', art.category) || art.category;
            const periodText = getMonographPeriod(art, language);
            const subjectCats = getMonographCategories(art, localizedCat);

            return (
              <article
                key={art.id}
                onClick={() => openMonographDetail(art)}
                className="group rounded-3xl bg-[#121622] border border-stone-800 hover:border-[#c99738] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Thumbnail Image + Historical Period Badge */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-950 border-b border-stone-800">
                    <img
                      src={art.featured_image || fallbackThumb}
                      alt={displayTitle}
                      loading="lazy"
                      onError={e => {
                        const target = e.currentTarget;
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = '1';
                          target.src = fallbackThumb;
                        }
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-black/25 to-transparent" />

                    {/* Historical Period Pill */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-xs border border-[#d4af37]/50 text-[#fae29c] text-[11px] font-bold">
                        <Clock className="w-3 h-3 text-[#d4af37] shrink-0" />
                        <span className="truncate max-w-[260px]">{periodText}</span>
                      </span>
                      <EvidenceBadge category={art.evidence_category} size="sm" />
                    </div>
                  </div>

                  {/* Card Body: Subject Categories, Complete Title, Short Introduction */}
                  <div className="p-6 space-y-3.5">
                    {/* Relevant Subject Categories */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {subjectCats.map((sc, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] bg-[#1a1308] px-2.5 py-0.5 rounded-md border border-[#c99738]/30"
                        >
                          {sc}
                        </span>
                      ))}
                    </div>

                    {/* Complete Title */}
                    <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-stone-100 group-hover:text-[#fae29c] transition-colors leading-snug">
                      {displayTitle}
                    </h2>

                    {/* Short Introduction */}
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3">
                      {displaySummary}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Metadata & Read More Button */}
                <div className="px-6 pb-6 pt-4 border-t border-stone-800/80 space-y-3.5 bg-[#0f131d]">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
                    <span className="inline-flex items-center gap-1.5 font-medium text-stone-300">
                      <User className="w-3.5 h-3.5 text-[#d4af37]" />
                      {art.author_name}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-amber-200/90">
                      <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
                      {ui.sourcesCount((art.sources || []).length)}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between text-xs font-bold text-[#e8c872] group-hover:text-[#fae29c]">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#d4af37]" />
                      <span>{ui.readMoreBtn}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
