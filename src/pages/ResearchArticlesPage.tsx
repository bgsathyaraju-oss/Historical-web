import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { BookOpen, Search, Filter, ShieldCheck, Calendar, User, ArrowRight } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ArticleActionBar } from '../components/ArticleActionBar';
import { useLanguage } from '../context/LanguageContext';

interface ResearchArticlesPageProps {
  onNavigate: (path: string) => void;
}

export const ResearchArticlesPage: React.FC<ResearchArticlesPageProps> = ({ onNavigate }) => {
  const { language, t, translationManager, getArticleContent, getMetadataLabel, translateText } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
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

  const filtered = articles.filter(a => {
    const { title, summary } = getArticleContent(a);
    return (
      title.toLowerCase().includes(search.toLowerCase()) ||
      summary.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
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

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#121622] border border-stone-800">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-[#d4af37] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t.common?.searchPlaceholder || 'Search articles by title or keyword...'}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[#182030] text-stone-200 border border-stone-700 focus:outline-none focus:border-[#c99738]"
          />
        </div>
        <div className="text-xs text-stone-400 hidden sm:block">
          Showing <strong>{filtered.length}</strong> published research articles
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
            onClick={() => handleSearchChange('')}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207]"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map(art => {
            const { title: cardTitle, summary: cardSummary } = getArticleContent(art);
            return (
            <div
              key={art.id}
              onClick={() => onNavigate(`/documentary?article=${art.id}`)}
              className="rounded-3xl bg-[#121622] border border-stone-800 hover:border-[#c99738]/60 p-6 space-y-4 hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
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

                <div className="text-xs font-semibold text-[#e8c872] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Research Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}

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
