import React, { useState, useEffect } from 'react';
import { Article, LanguageCode } from '../types';

const RESEARCH_PAGE_UI: Record<LanguageCode, {
  clickHint: string;
  noArticlesTitle: string;
  noArticlesDesc: string;
  clearFilters: string;
  viewBrief: string;
  fullArticle: string;
  prevPage: string;
  nextPage: string;
  execSummary: string;
  completeArticle: string;
  authorLabel: string;
  pubDateLabel: string;
  categoryLabel: string;
}> = {
  en: {
    clickHint: 'Click any article to open Complete Research Article',
    noArticlesTitle: 'No Articles Found',
    noArticlesDesc: 'No research papers match your current search query',
    clearFilters: 'Clear Filters',
    viewBrief: 'View Brief Summary',
    fullArticle: 'Full Article',
    prevPage: 'Previous',
    nextPage: 'Next',
    execSummary: 'Executive Summary',
    completeArticle: 'Complete Documented Research Article',
    authorLabel: 'Author / Research Council',
    pubDateLabel: 'Publication Date',
    categoryLabel: 'Archival Category'
  },
  hi: {
    clickHint: 'पूर्ण शोध लेख खोलने के लिए किसी भी लेख पर क्लिक करें',
    noArticlesTitle: 'कोई लेख नहीं मिला',
    noArticlesDesc: 'आपकी वर्तमान खोज से कोई शोध पत्र मेल नहीं खाता',
    clearFilters: 'फ़िल्टर साफ़ करें',
    viewBrief: 'संक्षिप्त सारांश देखें',
    fullArticle: 'पूर्ण लेख',
    prevPage: 'पिछला',
    nextPage: 'अगला',
    execSummary: 'कार्यकारी सारांश',
    completeArticle: 'संपूर्ण प्रमाणित शोध लेख',
    authorLabel: 'लेखक / अनुसंधान परिषद',
    pubDateLabel: 'प्रकाशन तिथि',
    categoryLabel: 'अभिलेखीय श्रेणी'
  },
  te: {
    clickHint: 'పూర్తి పరిశోధనా వ్యాసాన్ని తెరవడానికి ఏదైనా వ్యాసంపై క్లిక్ చేయండి',
    noArticlesTitle: 'వ్యాసాలు కనుగొనబడలేదు',
    noArticlesDesc: 'మీ ప్రస్తుత శోధనకు సరిపోయే పరిశోధనా పత్రాలు లేవు',
    clearFilters: 'ఫిల్టర్లు తొలగించండి',
    viewBrief: 'సంక్షిప్త సారాంశం చూడండి',
    fullArticle: 'పూర్తి వ్యాసం',
    prevPage: 'మునుపటి',
    nextPage: 'తదుపరి',
    execSummary: 'కార్యనిర్వాహక సారాంశం',
    completeArticle: 'పూర్తి ప్రామాణిక పరిశోధనా వ్యాసం',
    authorLabel: 'రచయిత / పరిశోధనా మండలి',
    pubDateLabel: 'ప్రచురణ తేదీ',
    categoryLabel: 'పురావస్తు విభాగం'
  },
  kn: {
    clickHint: 'ಸಂಪೂರ್ಣ ಸಂಶೋಧನಾ ಲೇಖನವನ್ನು ತೆರೆಯಲು ಯಾವುದೇ ಲೇಖನದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ',
    noArticlesTitle: 'ಯಾವುದೇ ಲೇಖನಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
    noArticlesDesc: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಹುಡುಕಾಟಕ್ಕೆ ಯಾವುದೇ ಸಂಶೋಧನಾ ಪತ್ರಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ',
    clearFilters: 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ',
    viewBrief: 'ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ ನೋಡಿ',
    fullArticle: 'ಪೂರ್ಣ ಲೇಖನ',
    prevPage: 'ಹಿಂದಿನದು',
    nextPage: 'ಮುಂದಿನದು',
    execSummary: 'ಕಾರ್ಯಕಾರಿ ಸಾರಾಂಶ',
    completeArticle: 'ಸಂಪೂರ್ಣ ದಾಖಲಿತ ಸಂಶೋಧನಾ ಲೇಖನ',
    authorLabel: 'ಲೇಖಕರು / ಸಂಶೋಧನಾ ಮಂಡಳಿ',
    pubDateLabel: 'ಪ್ರಕಟಣೆ ದಿನಾಂಕ',
    categoryLabel: 'ಪತ್ರಾಗಾರ ವರ್ಗ'
  },
  ta: {
    clickHint: 'முழு ஆய்வுக் கட்டுரையைத் திறக்க எந்தக் கட்டுரையையும் சொடுக்கவும்',
    noArticlesTitle: 'கட்டுரைகள் எதுவும் கிடைக்கவில்லை',
    noArticlesDesc: 'உங்கள் தற்போதைய தேடலுக்குப் பொருந்தும் ஆய்வுக் கட்டுரைகள் இல்லை',
    clearFilters: 'வடிகட்டிகளை அழி',
    viewBrief: 'சுருக்கத்தைக் காண்க',
    fullArticle: 'முழு கட்டுரை',
    prevPage: 'முந்தைய',
    nextPage: 'அடுத்தது',
    execSummary: 'நிறைவேற்றுச் சுருக்கம்',
    completeArticle: 'முழுமையான ஆவணப்படுத்தப்பட்ட ஆய்வுக் கட்டுரை',
    authorLabel: 'ஆசிரியர் / ஆராய்ச்சி குழு',
    pubDateLabel: 'வெளியீட்டு தேதி',
    categoryLabel: 'ஆவணப் பிரிவு'
  },
  mr: {
    clickHint: 'संपूर्ण संशोधन लेख उघडण्यासाठी कोणत्याही लेखावर क्लिक करा',
    noArticlesTitle: 'कोणतेही लेख सापडले नाहीत',
    noArticlesDesc: 'तुमच्या सध्याच्या शोधाशी कोणताही संशोधन प्रबंध जुळत नाही',
    clearFilters: 'फिल्टर साफ करा',
    viewBrief: 'संक्षिप्त सारांश पहा',
    fullArticle: 'पूर्ण लेख',
    prevPage: 'मागील',
    nextPage: 'पुढील',
    execSummary: 'कार्यकारी सारांश',
    completeArticle: 'संपूर्ण प्रमाणित संशोधन लेख',
    authorLabel: 'लेखक / संशोधन परिषद',
    pubDateLabel: 'प्रकाशन तारीख',
    categoryLabel: 'अभिलेखीय श्रेणी'
  },
  or: {
    clickHint: 'ସମ୍ପୂର୍ଣ୍ଣ ଗବେଷଣା ପ୍ରବନ୍ଧ ଖୋଲିବାକୁ ଯେକୌଣସି ପ୍ରବନ୍ଧ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ',
    noArticlesTitle: 'କୌଣସି ପ୍ରବନ୍ଧ ମିଳିଲା ନାହିଁ',
    noArticlesDesc: 'ଆପଣଙ୍କ ବର୍ତ୍ତମାନର ସନ୍ଧାନ ସହିତ କୌଣସି ଗବେଷଣା ପତ୍ର ମେଳ ଖାଉନାହିଁ',
    clearFilters: 'ଫିଲ୍ଟର୍ ସଫା କରନ୍ତୁ',
    viewBrief: 'ସଂକ୍ଷିପ୍ତ ସାରାଂଶ ଦେଖନ୍ତୁ',
    fullArticle: 'ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରବନ୍ଧ',
    prevPage: 'ପୂର୍ବবর্তী',
    nextPage: 'ପରବର୍ତ୍ତୀ',
    execSummary: 'କାର୍ଯ୍ୟନିର୍ବାହୀ ସାରାଂଶ',
    completeArticle: 'ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରାମାଣିକ ଗବେଷଣା ପ୍ରବନ୍ଧ',
    authorLabel: 'ଲେଖକ / ଗବେଷଣା ପରିଷଦ',
    pubDateLabel: 'ପ୍ରକାଶନ ତାରିଖ',
    categoryLabel: 'ଅଭିଲେଖାଗାର ବିଭାଗ'
  },
  bn: {
    clickHint: 'সম্পূর্ণ গবেষণা নিবন্ধ খুলতে যেকোনো নিবন্ধে ক্লিক করুন',
    noArticlesTitle: 'কোনো নিবন্ধ পাওয়া যায়নি',
    noArticlesDesc: 'আপনার বর্তমান অনুসন্ধানের সাথে কোনো গবেষণা পত্র মেলেনি',
    clearFilters: 'ফিল্টার মুছুন',
    viewBrief: 'সংক্ষিপ্ত সারাংশ দেখুন',
    fullArticle: 'সম্পূর্ণ নিবন্ধ',
    prevPage: 'পূর্ববর্তী',
    nextPage: 'পরবর্তী',
    execSummary: 'কার্যনির্বাহী সারাংশ',
    completeArticle: 'সম্পূর্ণ প্রামাণ্য গবেষণা নিবন্ধ',
    authorLabel: 'লেখক / গবেষণা পরিষদ',
    pubDateLabel: 'প্রকাশের তারিখ',
    categoryLabel: 'আর্কাইভাল বিভাগ'
  }
};
import { BookOpen, Search, Filter, ShieldCheck, Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ArticleBriefModal } from '../components/ArticleBriefModal';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { useLanguage } from '../context/LanguageContext';

import { getAllArticles } from '../data/articlesRepository';

interface ResearchArticlesPageProps {
  onNavigate: (path: string) => void;
  initialArticleId?: string | null;
}

export const ResearchArticlesPage: React.FC<ResearchArticlesPageProps> = ({ onNavigate, initialArticleId }) => {
  const { language, t, translationManager, getArticleContent, getMetadataLabel, translateText } = useLanguage();
  const ui = RESEARCH_PAGE_UI[language] || RESEARCH_PAGE_UI.en;
  const initialArticles = getAllArticles(language);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedFullArticle, setSelectedFullArticle] = useState<Article | null>(null);
  const [selectedBriefArticle, setSelectedBriefArticle] = useState<Article | null>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const updated = getAllArticles(language);
    setArticles(updated);
    setSelectedFullArticle(prev => (prev ? updated.find(a => a.id === prev.id) || prev : null));
    setSelectedBriefArticle(prev => (prev ? updated.find(a => a.id === prev.id) || prev : null));
    if (initialArticleId) {
      const found = updated.find(a => a.id === initialArticleId || a.slug === initialArticleId);
      if (found) setSelectedFullArticle(found);
    }
    translationManager.fetchArticles(language)
      .then(data => {
        if (data && data.length > 0) setArticles(data);
      })
      .catch(() => {});
  }, [language, translationManager, initialArticleId]);

  const categories = [
    { id: 'all', label: translateText('all', 'All Categories') },
    { id: 'odra_desha_geography', label: getMetadataLabel('category', 'odra_desha_geography') || 'Odra Desha & Geography' },
    { id: 'suryavamsha_gajapathi_kings', label: getMetadataLabel('category', 'suryavamsha_gajapathi_kings') || 'Gajapathi Kings' },
    { id: 'genealogy_methodology', label: getMetadataLabel('category', 'genealogy_methodology') || 'Genealogy & Methodology' },
    { id: 'oad_rajput_heritage', label: getMetadataLabel('category', 'oad_rajput_heritage') || 'Oad-Rajput Heritage' },
    { id: 'suryavamsha_lineage_antiquity', label: getMetadataLabel('category', 'suryavamsha_lineage_antiquity') || 'Suryavamsha Lineage' },
    { id: 'sacred_citadels_maritime', label: getMetadataLabel('category', 'sacred_citadels_maritime') || 'Sacred Citadels (Kolletikota)' },
    { id: 'inscriptions_epigraphy', label: getMetadataLabel('category', 'inscriptions_epigraphy') || 'Inscriptions & Epigraphy' }
  ];

  // Cross-browser safe Unicode search
  const normalizedSearch = (search || '').normalize('NFC').toLowerCase().trim();

  const filtered = articles.filter(a => {
    // Category filter
    if (activeCategory !== 'all') {
      const catKey = a.category.toLowerCase();
      const match =
        (activeCategory === 'odra_desha_geography' && (catKey.includes('odra') || catKey.includes('geography'))) ||
        (activeCategory === 'suryavamsha_gajapathi_kings' && (catKey.includes('gajapathi') || catKey.includes('kapilendra'))) ||
        (activeCategory === 'genealogy_methodology' && (catKey.includes('genealogy') || catKey.includes('methodology'))) ||
        (activeCategory === 'oad_rajput_heritage' && (catKey.includes('oad') || catKey.includes('rajput') || catKey.includes('synonym'))) ||
        (activeCategory === 'suryavamsha_lineage_antiquity' && (catKey.includes('antiquity') || catKey.includes('sagara'))) ||
        (activeCategory === 'sacred_citadels_maritime' && (catKey.includes('maritime') || catKey.includes('citadel') || catKey.includes('kolletikota') || catKey.includes('sarasu'))) ||
        (activeCategory === 'inscriptions_epigraphy' && (catKey.includes('inscription') || catKey.includes('epigraph')));

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
      a.tags.some(t => (t || '').normalize('NFC').toLowerCase().includes(normalizedSearch))
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

  const handleCardClick = (art: Article) => {
    setSelectedFullArticle(art);
  };

  const buildArticleModalItem = (art: Article | null): ContentDetailItem | null => {
    if (!art) return null;
    const { title, summary, content } = getArticleContent(art);
    return {
      id: art.id,
      title,
      subtitle: `${art.author_name} • ${art.publication_date}`,
      badge: getMetadataLabel('category', art.category) || art.category,
      evidenceCategory: art.evidence_category,
      verificationStatus: art.verification_status,
      imageUrl: art.featured_image,
      imageLayout: 'banner',
      summary,
      summaryLabel: ui.execSummary,
      fullText: content,
      fullTextLabel: ui.completeArticle,
      metadata: [
        { label: ui.authorLabel, value: art.author_name },
        { label: ui.pubDateLabel, value: art.publication_date },
        { label: ui.categoryLabel, value: getMetadataLabel('category', art.category) || art.category }
      ],
      sources: (art.sources || []).map(s => ({
        title: s.title,
        author: s.author_or_authority,
        year: s.year_or_era,
        type: s.source_type,
        details: `${s.publication_or_location ? s.publication_or_location + ' — ' : ''}${s.citation_details || ''}`
      })),
      tags: art.tags,
      shareUrl: `${window.location.origin}/research?article=${encodeURIComponent(art.id)}`
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <BookOpen className="w-4 h-4" />
          <span>{t.home?.researchBadge || 'Peer-Reviewed Academic Historiography'}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {t.home?.researchTitle || 'Research Articles & Historiographical Studies'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {t.home?.researchSubtitle || 'Critical monographs examining the Suryavamsha Gajapathi era, epigraphic paleography, territorial borders of Odra Desha, and traditional genealogy methods.'}
        </p>
      </div>


      {/* Search and Category Filter Bar */}
      <div className="space-y-4 p-4 sm:p-5 rounded-3xl bg-[#121622] border border-stone-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-96 relative">
            <Search className="w-4 h-4 text-[#d4af37] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t.common?.searchPlaceholder || 'Search articles in any language or script...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#182030] text-stone-200 border border-stone-700 focus:outline-none focus:border-[#c99738]"
            />
          </div>
          <div className="text-xs text-stone-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{ui.clickHint}</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#997022] to-[#c99738] text-[#290106] shadow-md font-bold'
                  : 'bg-stone-900/90 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid & Empty State */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#121622] border border-stone-800 space-y-3">
          <BookOpen className="w-10 h-10 text-stone-600 mx-auto" />
          <h3 className="font-royal-heading font-bold text-base text-stone-200">{ui.noArticlesTitle}</h3>
          <p className="text-xs text-stone-400">
            {ui.noArticlesDesc} "{search}".
          </p>
          <button
            onClick={() => {
              handleSearchChange('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] cursor-pointer"
          >
            {ui.clearFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map(art => {
            const { title: cardTitle, summary: cardSummary } = getArticleContent(art);
            return (
            <div
              key={art.id}
              onClick={() => handleCardClick(art)}
              className="rounded-3xl bg-[#121622] border border-stone-800 hover:border-[#c99738] p-6 space-y-4 hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
              title="Click to read Complete Research Article"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#d4af37]">
                    {getMetadataLabel('category', art.category) || art.category}
                  </span>
                  <EvidenceBadge category={art.evidence_category} size="sm" />
                </div>

                <h3 className="font-royal-heading font-bold text-base sm:text-lg text-stone-100 group-hover:text-[#e8c872] transition-colors leading-snug">
                  {cardTitle}
                </h3>

                <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                  {cardSummary}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1 text-stone-400">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    {art.author_name}
                  </span>
                  <span>{art.publication_date}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBriefArticle(art);
                      setIsBriefModalOpen(true);
                    }}
                    className="text-[11px] text-[#fae29c] hover:underline font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>{ui.viewBrief}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFullArticle(art);
                    }}
                    className="text-xs font-semibold text-[#e8c872] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span>{ui.fullArticle}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}

      {/* Brief Information Multilingual Modal */}
      <ArticleBriefModal
        article={selectedBriefArticle}
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        onReadFull={(art) => {
          setIsBriefModalOpen(false);
          setSelectedFullArticle(art);
        }}
      />

      {/* Full Research Article Modal */}
      <ContentDetailModal
        item={buildArticleModalItem(selectedFullArticle)}
        onClose={() => setSelectedFullArticle(null)}
      />

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#121622] border border-stone-800 text-xs">
          <span className="text-stone-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} articles
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-stone-700 text-stone-300 disabled:opacity-40 hover:bg-stone-800"
            >
              {ui.prevPage}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 rounded-lg font-semibold flex items-center justify-center ${
                  currentPage === p
                    ? 'bg-[#c99738] text-[#300207]'
                    : 'text-stone-400 hover:bg-stone-800'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-stone-700 text-stone-300 disabled:opacity-40 hover:bg-stone-800"
            >
              {ui.nextPage}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
