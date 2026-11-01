import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Search,
  User,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Clock,
  FileText,
  CheckCircle2,
  ShieldCheck,
  X
} from 'lucide-react';
import { Article, LanguageCode } from '../types';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ArticleBriefModal } from '../components/ArticleBriefModal';
import {
  ArticleDetailView,
  getMonographPeriod,
  getMonographCategories
} from '../components/ArticleDetailView';
import { useLanguage } from '../context/LanguageContext';
import { getAllArticles } from '../data/articlesRepository';

const RESEARCH_PAGE_UI: Record<
  LanguageCode,
  {
    clickHint: string;
    noArticlesTitle: string;
    noArticlesDesc: string;
    clearFilters: string;
    viewBrief: string;
    fullArticle: string;
    prevPage: string;
    nextPage: string;
    returnHome: string;
    sourcesCount: (count: number) => string;
  }
> = {
  en: {
    clickHint: 'Click any monograph card to open the Complete Monograph & Chapters',
    noArticlesTitle: 'No Monographs Found',
    noArticlesDesc: 'No historical monographs match your current search query',
    clearFilters: 'Clear Filters',
    viewBrief: 'Quick Abstract',
    fullArticle: 'Read More — Complete Monograph',
    prevPage: 'Previous',
    nextPage: 'Next',
    returnHome: 'Return to Home',
    sourcesCount: count => `${count} Citations`
  },
  hi: {
    clickHint: 'संपूर्ण मोनोग्राफ एवं अध्याय खोलने के लिए किसी भी कार्ड पर क्लिक करें',
    noArticlesTitle: 'कोई मोनोग्राफ नहीं मिला',
    noArticlesDesc: 'आपकी वर्तमान खोज से कोई ऐतिहासिक मोनोग्राफ मेल नहीं खाता',
    clearFilters: 'फ़िल्टर साफ़ करें',
    viewBrief: 'संक्षिप्त सारांश',
    fullArticle: 'अधिक पढ़ें — संपूर्ण मोनोग्राफ',
    prevPage: 'पिछला',
    nextPage: 'अगला',
    returnHome: 'मुख्य पृष्ठ पर लौटें',
    sourcesCount: count => `${count} संदर्भ`
  },
  te: {
    clickHint: 'పూర్తి మోనోగ్రాఫ్ & అధ్యాయాలను తెరవడానికి ఏదైనా కార్డుపై క్లిక్ చేయండి',
    noArticlesTitle: 'మోనోగ్రాఫ్‌లు కనుగొనబడలేదు',
    noArticlesDesc: 'మీ ప్రస్తుత శోధనకు సరిపోయే చారిత్రక మోనోగ్రాఫ్‌లు లేవు',
    clearFilters: 'ఫిల్టర్లు తొలగించండి',
    viewBrief: 'సంక్షిప్త సారాంశం',
    fullArticle: 'మరింత చదవండి — పూర్తి మోనోగ్రాఫ్',
    prevPage: 'మునుపటి',
    nextPage: 'తదుపరి',
    returnHome: 'హోమ్ పేజీకి తిరిగి వెళ్ళండి',
    sourcesCount: count => `${count} ఆధారాలు`
  },
  kn: {
    clickHint: 'ಸಂಪೂರ್ಣ ಮೊನೊಗ್ರಾಫ್ ಮತ್ತು ಅಧ್ಯಾಯಗಳನ್ನು ತೆರೆಯಲು ಯಾವುದೇ ಕಾರ್ಡ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ',
    noArticlesTitle: 'ಯಾವುದೇ ಮೊನೊಗ್ರಾಫ್ ಕಂಡುಬಂದಿಲ್ಲ',
    noArticlesDesc: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಹುಡುಕಾಟಕ್ಕೆ ಯಾವುದೇ ಸಂಶೋಧನಾ ಮೊನೊಗ್ರಾಫ್ ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ',
    clearFilters: 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ',
    viewBrief: 'ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ',
    fullArticle: 'ಮುಂದೆ ಓದಿ — ಪೂರ್ಣ ಮೊನೊಗ್ರಾಫ್',
    prevPage: 'ಹಿಂದಿನದು',
    nextPage: 'ಮುಂದಿನದು',
    returnHome: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    sourcesCount: count => `${count} ಉಲ್ಲೇಖಗಳು`
  },
  ta: {
    clickHint: 'முழு ஆய்வுக் கட்டுரை மற்றும் அத்தியாயங்களைத் திறக்க எந்த அட்டையையும் சொடுக்கவும்',
    noArticlesTitle: 'ஆய்வுக் கட்டுரைகள் எதுவும் கிடைக்கவில்லை',
    noArticlesDesc: 'உங்கள் தற்போதைய தேடலுக்குப் பொருந்தும் ஆய்வுக் கட்டுரைகள் இல்லை',
    clearFilters: 'வடிகட்டிகளை அழி',
    viewBrief: 'சுருக்கத்தைக் காண்க',
    fullArticle: 'மேலும் படிக்க — முழு கட்டுரை',
    prevPage: 'முந்தைய',
    nextPage: 'அடுத்தது',
    returnHome: 'முகப்புப் பக்கத்திற்குத் திரும்பு',
    sourcesCount: count => `${count} ஆதாரங்கள்`
  },
  mr: {
    clickHint: 'संपूर्ण मोनोग्राफ आणि प्रकरणे उघडण्यासाठी कोणत्याही कार्डवर क्लिक करा',
    noArticlesTitle: 'कोणतेही मोनोग्राफ सापडले नाहीत',
    noArticlesDesc: 'तुमच्या सध्याच्या शोधाशी कोणताही ऐतिहासिक मोनोग्राफ जुळत नाही',
    clearFilters: 'फिल्टर साफ करा',
    viewBrief: 'संक्षिप्त सारांश',
    fullArticle: 'अधिक वाचा — संपूर्ण मोनोग्राफ',
    prevPage: 'मागील',
    nextPage: 'पुढील',
    returnHome: 'मुख्य पृष्ठावर परत जा',
    sourcesCount: count => `${count} संदर्भ`
  },
  or: {
    clickHint: 'ସମ୍ପୂର୍ଣ୍ଣ ମୋନୋଗ୍ରାଫ୍ ଓ ଅଧ୍ୟାୟ ଖୋଲିବାକୁ ଯେକୌଣସି କାର୍ଡ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ',
    noArticlesTitle: 'କୌଣସି ମୋନୋଗ୍ରାଫ୍ ମିଳିଲା ନାହିଁ',
    noArticlesDesc: 'ଆପଣଙ୍କ ବର୍ତ୍ତମାନର ସନ୍ଧାନ ସହିତ କୌଣସି ଗବେଷଣା ମୋନୋଗ୍ରାଫ୍ ମେଳ ଖାଉନାହିଁ',
    clearFilters: 'ଫିଲ୍ଟର୍ ସଫା କରନ୍ତୁ',
    viewBrief: 'ସଂକ୍ଷିପ୍ତ ସାରାଂଶ',
    fullArticle: 'ଅଧିକ ପଢ଼ନ୍ତୁ — ସମ୍ପୂର୍ଣ୍ଣ ମୋନୋଗ୍ରାଫ୍',
    prevPage: 'ପୂର୍ବବର୍ତ୍ତୀ',
    nextPage: 'ପରବର୍ତ୍ତୀ',
    returnHome: 'ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ',
    sourcesCount: count => `${count} ପ୍ରମାଣ`
  },
  bn: {
    clickHint: 'সম্পূর্ণ মনোগ্রাফ ও অধ্যায় খুলতে যেকোনো কার্ডে ক্লিক করুন',
    noArticlesTitle: 'কোনো মনোগ্রাফ পাওয়া যায়নি',
    noArticlesDesc: 'আপনার বর্তমান অনুসন্ধানের সাথে কোনো ঐতিহাসিক মনোগ্রাফ মেলেনি',
    clearFilters: 'ফিল্টার মুছুন',
    viewBrief: 'সংক্ষিপ্ত সারাংশ',
    fullArticle: 'আরও পড়ুন — সম্পূর্ণ মনোগ্রাফ',
    prevPage: 'পূর্ববর্তী',
    nextPage: 'পরবর্তী',
    returnHome: 'হোম পেজে ফিরে যান',
    sourcesCount: count => `${count}টি সূত্র`
  }
};

interface ResearchArticlesPageProps {
  onNavigate: (path: string) => void;
  initialArticleId?: string | null;
}

export const ResearchArticlesPage: React.FC<ResearchArticlesPageProps> = ({
  onNavigate,
  initialArticleId
}) => {
  const { language, t, translationManager, getArticleContent, getMetadataLabel, translateText } =
    useLanguage();
  const ui = RESEARCH_PAGE_UI[language] || RESEARCH_PAGE_UI.en;
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
      // Ignore
    }
    return null;
  });

  const [selectedBriefArticle, setSelectedBriefArticle] = useState<Article | null>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const savedScrollY = useRef<number>(0);

  useEffect(() => {
    const updated = getAllArticles(language);
    setArticles(updated);
    setSelectedBriefArticle(prev => (prev ? updated.find(a => a.id === prev.id) || prev : null));
    if (initialArticleId) {
      const found = updated.find(a => a.id === initialArticleId || a.slug === initialArticleId);
      if (found) setActiveArticleId(found.id);
    }
    translationManager
      .fetchArticles(language)
      .then(data => {
        if (data && data.length > 0) setArticles(data);
      })
      .catch(() => {});
  }, [language, translationManager, initialArticleId]);

  const openMonographDetail = (art: Article) => {
    savedScrollY.current = window.scrollY;
    setActiveArticleId(art.id);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('article', art.id);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignore
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
    { id: 'all', label: `${translateText('all', 'All Categories')} (${articles.length})` },
    {
      id: 'odra_desha_geography',
      label: getMetadataLabel('category', 'odra_desha_geography') || 'Odra Desha & Geography'
    },
    {
      id: 'suryavamsha_gajapathi_kings',
      label: getMetadataLabel('category', 'suryavamsha_gajapathi_kings') || 'Gajapathi Kings'
    },
    {
      id: 'genealogy_methodology',
      label: getMetadataLabel('category', 'genealogy_methodology') || 'Genealogy & Methodology'
    },
    {
      id: 'oad_rajput_heritage',
      label: getMetadataLabel('category', 'oad_rajput_heritage') || 'Oad-Rajput Heritage'
    },
    {
      id: 'suryavamsha_lineage_antiquity',
      label: getMetadataLabel('category', 'suryavamsha_lineage_antiquity') || 'Suryavamsha Lineage'
    },
    {
      id: 'sacred_citadels_maritime',
      label: getMetadataLabel('category', 'sacred_citadels_maritime') || 'Sacred Citadels (Kolletikota)'
    },
    {
      id: 'inscriptions_epigraphy',
      label: getMetadataLabel('category', 'inscriptions_epigraphy') || 'Inscriptions & Epigraphy'
    }
  ];

  const normalizedSearch = (search || '').normalize('NFC').toLowerCase().trim();

  const filtered = articles.filter(a => {
    if (activeCategory !== 'all') {
      const catKey = a.category.toLowerCase();
      const match =
        (activeCategory === 'odra_desha_geography' && (catKey.includes('odra') || catKey.includes('geography'))) ||
        (activeCategory === 'suryavamsha_gajapathi_kings' &&
          (catKey.includes('gajapathi') || catKey.includes('kapilendra'))) ||
        (activeCategory === 'genealogy_methodology' &&
          (catKey.includes('genealogy') || catKey.includes('methodology'))) ||
        (activeCategory === 'oad_rajput_heritage' &&
          (catKey.includes('oad') || catKey.includes('rajput') || catKey.includes('synonym'))) ||
        (activeCategory === 'suryavamsha_lineage_antiquity' &&
          (catKey.includes('antiquity') || catKey.includes('sagara') || catKey.includes('kings'))) ||
        (activeCategory === 'sacred_citadels_maritime' &&
          (catKey.includes('maritime') ||
            catKey.includes('citadel') ||
            catKey.includes('kolletikota') ||
            catKey.includes('sarasu') ||
            catKey.includes('culture'))) ||
        (activeCategory === 'inscriptions_epigraphy' &&
          (catKey.includes('inscription') || catKey.includes('epigraph')));

      if (!match) return false;
    }

    if (!normalizedSearch) return true;

    const { title, summary } = getArticleContent(a);
    const normTitle = (title || '').normalize('NFC').toLowerCase();
    const normSummary = (summary || '').normalize('NFC').toLowerCase();
    const normOrigTitle = (a.original_title || '').normalize('NFC').toLowerCase();
    const normOrigSummary = (a.summary || '').normalize('NFC').toLowerCase();
    const normAuthor = (a.author_name || '').normalize('NFC').toLowerCase();
    const normCat = (a.category || '').normalize('NFC').toLowerCase();

    return (
      normTitle.includes(normalizedSearch) ||
      normSummary.includes(normalizedSearch) ||
      normOrigTitle.includes(normalizedSearch) ||
      normOrigSummary.includes(normalizedSearch) ||
      normAuthor.includes(normalizedSearch) ||
      normCat.includes(normalizedSearch) ||
      a.tags.some(tag => (tag || '').normalize('NFC').toLowerCase().includes(normalizedSearch))
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

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
            handleSearchChange(tag);
            closeMonographDetail();
          }}
          allArticles={articles}
          showLanguageSwitcher={true}
          basePath="/research"
        />
      </div>
    );
  }

  // ============================================================================
  // MONOGRAPH ARTICLE CARDS LIST INTERFACE
  // ============================================================================
  const fallbackThumb = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/barabati_fort_gateway.jpg`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#292521]">
      {/* Header */}
      <div className="border-b border-[#D8C3A2] pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FFFCF5] hover:bg-[#E9D9BE] border border-[#D8C3A2] hover:border-[#A87924] text-[#54351F] text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#762D35]" />
            <span>{ui.returnHome}</span>
          </button>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#76501F] font-royal-heading bg-[#FFF9EF] px-3.5 py-1.5 rounded-full border border-[#D8C3A2]">
            <BookOpen className="w-4 h-4 text-[#A87924]" />
            <span>{t.home?.researchBadge || 'Peer-Reviewed Academic Historiography'}</span>
          </div>
        </div>

        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#54351F]">
          {t.home?.researchTitle || 'Research Articles & Historical Monographs'}
        </h1>
        <p className="text-xs sm:text-sm text-[#292521] max-w-4xl leading-relaxed">
          {t.home?.researchSubtitle ||
            'Critical monographs examining the Suryavamsha Gajapathi era, epigraphic paleography, territorial borders of Odra Desha, and traditional genealogy methods.'}
        </p>

        {/* 3-Pillar Epistemic Distinction Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#1c5236] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#1c5236]">Verified Epigraphic Evidence</div>
              <p className="text-[11px] text-[#292521] mt-0.5">
                Primary copper plates, temple lithic edicts, and ASI archaeological surveys.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#76501F] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#54351F]">Traditional Accounts & Vamsavalis</div>
              <p className="text-[11px] text-[#292521] mt-0.5">
                Puranic genealogies, Madala Panji temple annals, and community chronicles.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#762D35] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#54351F]">Scholarly Interpretations</div>
              <p className="text-[11px] text-[#292521] mt-0.5">
                Peer-reviewed historiography distinguishing epigraphy from devotional allegory.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-4 p-4 sm:p-5 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-96 relative">
            <Search className="w-4 h-4 text-[#76501F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder={t.common?.searchPlaceholder || 'Search monographs in any language or script...'}
              className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-[#FFFFFF] text-[#292521] border border-[#D8C3A2] focus:outline-none focus:border-[#A87924]"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5948] hover:text-[#54351F] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="text-xs text-[#6B5948] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#A87924]" />
            <span>{ui.clickHint}</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 pt-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-[#762D35] text-white border-[#A87924] shadow-sm font-bold'
                  : 'bg-[#FFF9EF] text-[#54351F] hover:bg-[#E9D9BE] border-[#D8C3A2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Monograph Cards Grid & Empty State */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-3">
          <BookOpen className="w-10 h-10 text-[#A87924] mx-auto" />
          <h3 className="font-royal-heading font-bold text-base text-[#54351F]">{ui.noArticlesTitle}</h3>
          <p className="text-xs text-[#6B5948]">
            {ui.noArticlesDesc} "{search}".
          </p>
          <button
            type="button"
            onClick={() => {
              handleSearchChange('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#762D35] text-white border border-[#A87924] cursor-pointer"
          >
            {ui.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {paginated.map(art => {
            const { title: cardTitle, summary: cardSummary } = getArticleContent(art);
            const localizedCat = getMetadataLabel('category', art.category) || art.category;
            const periodText = getMonographPeriod(art, language);
            const subjectCats = getMonographCategories(art, localizedCat);

            return (
              <article
                key={art.id}
                onClick={() => openMonographDetail(art)}
                className="rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] hover:border-[#A87924] overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
                title="Click to read Complete Monograph"
              >
                <div>
                  {/* Thumbnail + Historical Period Badge */}
                  <div className="h-52 w-full overflow-hidden relative bg-[#EFE3D0] border-b border-[#D8C3A2]">
                    <img
                      src={art.featured_image || fallbackThumb}
                      alt={cardTitle}
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

                    <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFCF5]/95 border border-[#D8C3A2] text-[#54351F] text-[11px] font-bold shadow-xs">
                        <Clock className="w-3 h-3 text-[#762D35] shrink-0" />
                        <span className="truncate max-w-[260px]">{periodText}</span>
                      </span>
                      <EvidenceBadge category={art.evidence_category} size="sm" />
                    </div>
                  </div>

                  {/* Card Body: Subject Categories, Complete Title, Short Introduction */}
                  <div className="p-6 pb-4 space-y-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {subjectCats.map((sc, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold uppercase tracking-wider text-[#54351F] bg-[#FFF9EF] px-2.5 py-0.5 rounded-md border border-[#D8C3A2]"
                        >
                          {sc}
                        </span>
                      ))}
                    </div>

                    <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#54351F] group-hover:text-[#762D35] transition-colors leading-snug">
                      {cardTitle}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#292521] line-clamp-3 leading-relaxed">
                      {cardSummary}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-4 border-t border-[#D8C3A2] space-y-3 bg-[#FFF9EF]">
                  <div className="flex items-center justify-between text-[11px] text-[#6B5948]">
                    <span className="flex items-center gap-1.5 text-[#54351F] font-medium">
                      <User className="w-3.5 h-3.5 text-[#A87924]" />
                      {art.author_name}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#76501F]">
                      <FileText className="w-3.5 h-3.5 text-[#A87924]" />
                      {ui.sourcesCount((art.sources || []).length)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#D8C3A2]">
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedBriefArticle(art);
                        setIsBriefModalOpen(true);
                      }}
                      className="text-[11px] text-[#76501F] hover:text-[#54351F] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-[#A87924]" />
                      <span>{ui.viewBrief}</span>
                    </button>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        openMonographDetail(art);
                      }}
                      className="text-xs font-bold text-[#76501F] hover:text-[#762D35] hover:underline flex items-center gap-1.5 group-hover:translate-x-1 transition-transform cursor-pointer"
                    >
                      <span>{ui.fullArticle}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Brief Information Multilingual Modal */}
      <ArticleBriefModal
        article={selectedBriefArticle}
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        onReadFull={art => {
          setIsBriefModalOpen(false);
          openMonographDetail(art);
        }}
      />

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] text-xs">
          <span className="text-[#6B5948]">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} monographs
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-[#D8C3A2] text-[#54351F] disabled:opacity-40 hover:bg-[#EFE3D0]"
            >
              {ui.prevPage}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 rounded-lg font-semibold flex items-center justify-center ${
                  currentPage === p
                    ? 'bg-[#762D35] text-white'
                    : 'text-[#54351F] hover:bg-[#EFE3D0]'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-[#D8C3A2] text-[#54351F] disabled:opacity-40 hover:bg-[#EFE3D0]"
            >
              {ui.nextPage}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
