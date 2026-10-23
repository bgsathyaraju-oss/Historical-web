import React, { useState, useEffect } from 'react';
import { Article, EvidenceCategory, VerificationStatus } from '../types';
import { BookOpen, Search, Filter, ShieldCheck, ChevronRight, Scroll, ExternalLink, Calendar, User } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { TranslationMatrixBadge } from '../components/TranslationMatrixBadge';
import { ArticleActionBar } from '../components/ArticleActionBar';
import { useLanguage } from '../context/LanguageContext';

interface DocumentaryPageProps {
  initialArticleId?: string | null;
  onNavigate: (path: string) => void;
}

export const HistoricalDocumentaryPage: React.FC<DocumentaryPageProps> = ({ initialArticleId, onNavigate }) => {
  const { language, t, translationManager, getArticleContent, getMetadataLabel, translateText } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await translationManager.fetchArticles(language);
        if (!isMounted) return;
        setArticles(data || []);
        if (initialArticleId) {
          const found = data.find((a: Article) => a.id === initialArticleId || a.slug === initialArticleId);
          if (found) setSelectedArticle(found);
          else if (data.length > 0) setSelectedArticle(data[0]);
        } else if (data.length > 0) {
          setSelectedArticle(prev => {
            if (prev) {
              const matched = data.find(a => a.id === prev.id);
              if (matched) return matched;
            }
            return data[0];
          });
        }
      } catch (err) {
        console.error('Failed to load articles:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, [language, initialArticleId, translationManager]);

  const categories = [
    { key: 'All', label: translateText('all', 'All') },
    { key: 'Odra Desha', label: getMetadataLabel('category', 'odra_desha') || 'Odra Desha' },
    { key: 'Gajapathi Kings', label: getMetadataLabel('category', 'gajapathi_rulers') || 'Gajapathi Kings' },
    { key: 'Royal Genealogy', label: getMetadataLabel('category', 'lineage_genealogy') || 'Royal Genealogy' },
    { key: 'Inscriptions', label: getMetadataLabel('category', 'epigraphy_inscriptions') || 'Inscriptions & Epigraphy' },
    { key: 'Research Articles', label: translateText('research_archive', 'Research Articles') }
  ];

  const filteredArticles = articles.filter(a => {
    const matchesCat = activeCategory === 'All' || a.category.toLowerCase() === activeCategory.toLowerCase();
    const { title, summary } = getArticleContent(a);
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <BookOpen className="w-4 h-4" />
          <span>Historical Knowledge Repository</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Historical Documentary: Odra Desha & Suryavamsha Gajapathis
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          Searchable, structured historical repository dividing verified epigraphic evidence, royal administrative records, dynastic genealogies, and regional geopolitical developments.
        </p>
      </div>

      {/* Global Page Action Bar with Home, Close, and 8-Language Switcher */}
      <ArticleActionBar
        onHome={() => onNavigate('/')}
        onClose={() => onNavigate('/')}
        title="Historical Documentary Repository"
        badge="Archive"
        showLanguages={true}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#121622] border border-stone-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#c99738] text-[#300207] shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-[#d4af37] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={translateText('search_placeholder', 'Search documentary...')}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#182030] text-stone-200 border border-stone-700 focus:outline-none focus:border-[#c99738]"
          />
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Article Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-2 flex items-center justify-between">
            <span>Historical Monographs ({filteredArticles.length})</span>
          </div>

          <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
            {filteredArticles.map(art => {
              const isSelected = selectedArticle?.id === art.id;
              const { title: displayTitle, summary: displaySummary } = getArticleContent(art);

              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#580014]/40 border-[#d4af37] shadow-[0_0_15px_rgba(201,151,56,0.15)]'
                      : 'bg-[#131724] border-stone-800/80 hover:border-stone-700 hover:bg-[#181e2e]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#d4af37]">
                      {getMetadataLabel('category', art.category) || art.category}
                    </span>
                    <EvidenceBadge category={art.evidence_category} size="sm" />
                  </div>

                  <h3 className="font-royal-heading font-bold text-sm text-stone-100 line-clamp-2 leading-snug">
                    {displayTitle}
                  </h3>

                  <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                    {displaySummary}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                    <span>{art.author_name}</span>
                    <span>{art.publication_date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Selected Article Viewer */}
        <div className="lg:col-span-8">
          {selectedArticle ? (() => {
            const currentContent = getArticleContent(selectedArticle);
            return (
            <article className="rounded-3xl bg-[#111520] border border-[#c99738]/40 p-6 sm:p-8 space-y-6 shadow-xl">
              {/* Top Navigation & Language Control Bar */}
              <ArticleActionBar
                onHome={() => onNavigate('/')}
                onClose={() => setSelectedArticle(null)}
                title={currentContent.title}
                badge={selectedArticle.category}
                showLanguages={true}
              />

              {/* Category & Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-3 py-1 rounded-full bg-stone-900 border border-stone-800">
                    {getMetadataLabel('category', selectedArticle.category) || selectedArticle.category}
                  </span>
                  <EvidenceBadge category={selectedArticle.evidence_category} size="md" />
                </div>
                <div className="text-xs text-stone-400 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    {selectedArticle.author_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    {selectedArticle.publication_date}
                  </span>
                </div>
              </div>

              {/* 8-Language Translation Coverage & Status Matrix */}
              <TranslationMatrixBadge
                article={selectedArticle}
                onRefresh={() => {
                  translationManager.fetchArticles(language, { forceRefresh: true }).then(setArticles);
                }}
              />

              {/* Translation Notice if applicable */}
              {!currentContent.isTranslated && language !== 'en' && (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-900/60 text-xs text-amber-200">
                  <strong>Translation Notice:</strong> This article is displayed in its original verified language ({selectedArticle.original_language}). Translation into your selected language ({language}) is currently pending peer editorial review.
                </div>
              )}

              {/* Title & Featured Image */}
              <div className="space-y-4">
                <h2 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7] leading-tight">
                  {currentContent.title}
                </h2>

                {selectedArticle.featured_image && (
                  <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-stone-800">
                    <img
                      src={selectedArticle.featured_image}
                      alt={selectedArticle.original_title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="text-stone-300 font-royal-serif text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4 border-b border-stone-800 pb-6">
                {currentContent.content}
              </div>

              {/* Source References & Citations */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <Scroll className="w-4 h-4" />
                  <h3 className="font-royal-heading font-bold text-sm uppercase tracking-wider">
                    Verified Archival Citations & Sources
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedArticle.sources.map(src => (
                    <div key={src.id} className="p-3.5 rounded-xl bg-[#161c2b] border border-stone-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[#e8c872] font-semibold">
                        <span>{src.source_type}</span>
                        {src.verified && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                            Verified
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-stone-200">{src.title}</h4>
                      <p className="text-stone-400">{src.author_or_authority} • {src.publication_or_location} ({src.year_or_era})</p>
                      <p className="text-[11px] text-stone-500 italic">{src.citation_details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-stone-500 font-medium">Keywords:</span>
                {selectedArticle.tags.map(t => (
                  <span key={t} className="text-xs text-stone-400 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800">
                    #{t}
                  </span>
                ))}
              </div>
            </article>
            );
          })() : (
            <div className="p-12 text-center text-stone-400 bg-[#121622] rounded-3xl border border-stone-800 space-y-4">
              <p className="text-sm sm:text-base font-semibold text-stone-300">
                Select an article monograph from the directory index to begin reading.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#580014] hover:bg-[#78001a] text-[#fcedc7] border border-[#d4af37]/60 transition-all cursor-pointer shadow-md"
                >
                  Return to Home
                </button>
                {articles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(articles[0])}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 transition-all cursor-pointer"
                  >
                    Open First Article
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
