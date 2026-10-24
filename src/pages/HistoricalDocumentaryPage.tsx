import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { BookOpen, Search, Filter, ShieldCheck, ChevronRight, Calendar, User, Sparkles } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ArticleDetailView } from '../components/ArticleDetailView';
import { ArticleBriefModal } from '../components/ArticleBriefModal';
import { useLanguage } from '../context/LanguageContext';
import { getAllArticles } from '../data/articlesRepository';

interface DocumentaryPageProps {
  initialArticleId?: string | null;
  onNavigate: (path: string) => void;
}

export const HistoricalDocumentaryPage: React.FC<DocumentaryPageProps> = ({ initialArticleId, onNavigate }) => {
  const { language, t, translationManager, getArticleContent, getMetadataLabel } = useLanguage();
  
  // Guarantee immediate 100% visibility in any browser with zero network latency
  const initialArticles = getAllArticles(language);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => {
    if (initialArticleId) {
      const match = initialArticles.find(a => a.id === initialArticleId || a.slug === initialArticleId);
      if (match) return match;
    }
    return initialArticles[0] || null;
  });
  const [briefModalArticle, setBriefModalArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize articles on language change, with background server sync
  useEffect(() => {
    const updated = getAllArticles(language);
    setArticles(updated);
    setSelectedArticle(prev => {
      if (!prev) return updated[0] || null;
      return updated.find(a => a.id === prev.id) || updated[0] || null;
    });

    translationManager.fetchArticles(language).then(remote => {
      if (remote && remote.length > 0) {
        setArticles(remote);
      }
    }).catch(() => {
      // Offline or network restricted - repository already provided full content
    });
  }, [language, translationManager]);

  // Update selected article if URL query param changes
  useEffect(() => {
    if (initialArticleId) {
      const found = articles.find(a => a.id === initialArticleId || a.slug === initialArticleId);
      if (found) setSelectedArticle(found);
    }
  }, [initialArticleId, articles]);

  const categories = [
    { key: 'all', label: 'All Categories' },
    { key: 'Odra Desha & Regional History', label: 'Odra Desha & Geography' },
    { key: 'Gajapathi Kingdom & Empire', label: 'Gajapathi Kings & Empire' },
    { key: 'Dynasties and Genealogy', label: 'Dynasties & Lineage' },
    { key: 'Kings and Queens', label: 'Kings & Progenitors' },
    { key: 'Inscriptions and Archaeological Evidence', label: 'Inscriptions & Epigraphy' },
    { key: 'Culture & Heritage', label: 'Culture & Community' }
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
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

      {/* Filter and Search Bar (Single, Non-Duplicated Toolbar) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#121622] border border-stone-800 shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#c99738] text-[#300207] font-bold shadow-md'
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
            placeholder="Search documentary..."
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
            <span className="text-[10px] text-stone-500 lowercase">8 languages active</span>
          </div>

          <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1 scrollbar-thin">
            {filteredArticles.map(art => {
              const isSelected = selectedArticle?.id === art.id;
              const { title: displayTitle, summary: displaySummary } = getArticleContent(art);

              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all duration-150 ${
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
                    <div className="flex items-center gap-2">
                      <span>{art.publication_date}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBriefModalArticle(art);
                        }}
                        className="px-2 py-0.5 rounded bg-stone-900 border border-stone-700 hover:border-[#c99738] text-[10px] text-[#fae29c] font-medium transition-all"
                        title="View Brief Information"
                      >
                        Brief
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Unified, Standardized Article Detail View */}
        <div className="lg:col-span-8">
          {selectedArticle ? (
            <ArticleDetailView
              article={selectedArticle}
              onBack={() => onNavigate('/')}
              onSelectArticle={(art) => setSelectedArticle(art)}
              allArticles={articles}
              showLanguageSwitcher={false}
            />
          ) : (
            <div className="rounded-3xl bg-[#111520] border border-stone-800 p-12 text-center text-stone-400">
              Select an article from the documentary archive to read its full empirical investigation.
            </div>
          )}
        </div>
      </div>

      {/* Brief Summary Modal */}
      {briefModalArticle && (
        <ArticleBriefModal
          isOpen={!!briefModalArticle}
          article={briefModalArticle}
          onClose={() => setBriefModalArticle(null)}
          onReadFull={(art) => {
            setSelectedArticle(art);
            setBriefModalArticle(null);
          }}
        />
      )}
    </div>
  );
};
