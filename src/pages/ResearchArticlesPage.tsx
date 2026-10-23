import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { BookOpen, Search, Filter, ShieldCheck, Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ArticleActionBar } from '../components/ArticleActionBar';
import { ArticleBriefModal } from '../components/ArticleBriefModal';
import { useLanguage } from '../context/LanguageContext';

interface ResearchArticlesPageProps {
  onNavigate: (path: string) => void;
}

export const ResearchArticlesPage: React.FC<ResearchArticlesPageProps> = ({ onNavigate }) => {
  const { language, t, translationManager, getArticleContent, getMetadataLabel, translateText } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedBriefArticle, setSelectedBriefArticle] = useState<Article | null>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    translationManager.fetchArticles(language)
      .then(data => {
        if (isMounted) setArticles(data || []);
      })
      .catch(console.error)
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [language, translationManager]);

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
    setSelectedBriefArticle(art);
    setIsBriefModalOpen(true);
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

      {/* Global Page Action Bar with Home, Close, and 8-Language Switcher */}
      <ArticleActionBar
        onHome={() => onNavigate('/')}
        onClose={() => onNavigate('/')}
        title={t.home?.researchTitle || 'Research Articles & Historiographical Studies'}
        badge="Historiography"
        showLanguages={true}
      />

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
            <span>Click any article to view <strong>Brief Information in Multilingual</strong></span>
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
          <h3 className="font-royal-heading font-bold text-base text-stone-200">No Articles Found</h3>
          <p className="text-xs text-stone-400">
            No research papers match your current search query "{search}".
          </p>
          <button
            onClick={() => {
              handleSearchChange('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] cursor-pointer"
          >
            Clear Filters
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
              title="Click to view Brief Information in Multilingual"
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
                  <span className="text-[11px] text-[#fae29c] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>View Brief Information</span>
                  </span>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`/documentary?article=${art.id}`);
                    }}
                    className="text-xs font-semibold text-[#e8c872] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
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
        onReadFull={(art) => onNavigate(`/documentary?article=${art.id}`)}
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
              Previous
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
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
