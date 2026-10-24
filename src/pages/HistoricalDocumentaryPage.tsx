import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import {
  BookOpen,
  Search,
  Filter,
  ShieldCheck,
  ChevronRight,
  Calendar,
  User,
  Sparkles,
  X,
  Copy,
  Check,
  Share2,
  Maximize2,
  Scroll,
  ArrowLeft
} from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ArticleDetailView } from '../components/ArticleDetailView';
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(() => Boolean(initialArticleId));
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

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

  // Update selected article if URL query param changes and open modal
  useEffect(() => {
    if (initialArticleId) {
      const found = articles.find(a => a.id === initialArticleId || a.slug === initialArticleId);
      if (found) {
        setSelectedArticle(found);
        setIsModalOpen(true);
      }
    }
  }, [initialArticleId, articles]);

  // Handle ESC key to close modal and body scroll prevention
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleCopyLink = () => {
    if (!selectedArticle) return;
    const url = `${window.location.origin}${window.location.pathname}?article=${encodeURIComponent(selectedArticle.id)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

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
          <span>{t.documentary?.badge || 'Historical Knowledge Repository'}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {t.documentary?.title || 'Historical Documentary: Odra Desha & Suryavamsha Gajapathis'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {t.documentary?.subtitle || 'Searchable, structured historical repository dividing verified epigraphic evidence, royal administrative records, dynastic genealogies, and regional geopolitical developments.'}
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
            placeholder={t.documentary?.searchPlaceholder || 'Search documentary monographs...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#182030] text-stone-200 border border-stone-700 focus:outline-none focus:border-[#c99738]"
          />
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Monograph Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-2 flex items-center justify-between">
            <span>{t.documentary?.monographsList || 'Historical Monographs'} ({filteredArticles.length})</span>
            <span className="text-[10px] text-stone-500 lowercase">8 languages active</span>
          </div>

          <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1 scrollbar-thin">
            {filteredArticles.map(art => {
              const isSelected = selectedArticle?.id === art.id;
              const { title: displayTitle, summary: displaySummary } = getArticleContent(art);

              return (
                <div
                  key={art.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedArticle(art);
                    setIsModalOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedArticle(art);
                      setIsModalOpen(true);
                    }
                  }}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all duration-150 flex flex-col justify-between group relative ${
                    isSelected
                      ? 'bg-[#580014]/40 border-[#d4af37] shadow-[0_0_15px_rgba(201,151,56,0.15)]'
                      : 'bg-[#131724] border-stone-800/80 hover:border-stone-700 hover:bg-[#181e2e]'
                  }`}
                  aria-label={`Open monograph: ${displayTitle}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#d4af37]">
                        {getMetadataLabel('category', art.category) || art.category}
                      </span>
                      <EvidenceBadge category={art.evidence_category} size="sm" />
                    </div>

                    <h3 className="font-royal-heading font-bold text-sm text-stone-100 line-clamp-2 leading-snug group-hover:text-[#fae29c] transition-colors">
                      {displayTitle}
                    </h3>

                    <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                      {displaySummary}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="truncate max-w-[120px]">{art.author_name}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span>{art.publication_date}</span>
                      <span className="inline-flex items-center gap-0.5 text-[#d4af37] text-[10px] font-semibold group-hover:translate-x-0.5 transition-transform">
                        <span>Read</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
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
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 bg-[#121622] p-3 rounded-2xl border border-stone-800">
                <span className="text-xs text-stone-400 font-royal-heading">
                  Viewing: <strong className="text-[#fae29c]">{getArticleContent(selectedArticle).title}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#580014] hover:bg-[#72001a] text-[#fae29c] border border-[#d4af37]/60 transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                  title="Open Full Popup Modal"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Open Full Monograph Modal</span>
                </button>
              </div>

              <ArticleDetailView
                article={selectedArticle}
                onBack={() => onNavigate('/')}
                onSelectArticle={(art) => {
                  setSelectedArticle(art);
                  setIsModalOpen(true);
                }}
                allArticles={articles}
                showLanguageSwitcher={false}
              />
            </div>
          ) : (
            <div className="rounded-3xl bg-[#111520] border border-stone-800 p-12 text-center text-stone-400">
              Select an article from the documentary archive to read its full empirical investigation.
            </div>
          )}
        </div>
      </div>

      {/* Centered, Responsive Modal Dialog for Selected Historical Monograph */}
      {isModalOpen && selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="monograph-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-[#0e121c] border-2 border-[#c99738] rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative text-stone-200 overflow-hidden">
            {/* Pinned Modal Header Bar (Ensures Close button is never scrolled away) */}
            <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between gap-3 bg-[#121622] rounded-t-2xl sm:rounded-t-3xl shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <BookOpen className="w-5 h-5 text-[#d4af37] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] block truncate">
                    {t.documentary?.badge || 'Suryavamsha Historical Monograph Treatise'}
                  </span>
                  <h2 id="monograph-modal-title" className="text-sm sm:text-lg font-bold font-royal-heading text-[#fae29c] truncate">
                    {getArticleContent(selectedArticle).title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#161c2a] hover:bg-[#20293d] text-stone-300 hover:text-white border border-stone-700 transition-all cursor-pointer"
                  title="Copy direct link to this monograph"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 sm:p-2.5 rounded-xl bg-stone-900 hover:bg-[#580014] text-stone-300 hover:text-white border border-stone-700 hover:border-[#d4af37] transition-all cursor-pointer"
                  aria-label="Close dialog (Escape)"
                  title="Close (Escape)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Container (Smooth internal scroll on mobile & desktop) */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 scrollbar-thin">
              {/* Monograph Header / Metadata Banner */}
              <div className="space-y-3 border-b border-stone-800 pb-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-3 py-0.5 rounded-full bg-stone-900 border border-stone-800">
                    {getMetadataLabel('category', selectedArticle.category) || selectedArticle.category}
                  </span>
                  <EvidenceBadge category={selectedArticle.evidence_category} size="sm" />
                  <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1 bg-stone-900 px-2.5 py-0.5 rounded-full border border-stone-800">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{selectedArticle.verification_status}</span>
                  </span>
                </div>

                <h3 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7] leading-tight">
                  {getArticleContent(selectedArticle).title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-stone-400">
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Author / Compiler: <strong className="text-[#fae29c]">{selectedArticle.author_name}</strong></span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Published: {selectedArticle.publication_date}</span>
                  </span>
                </div>
              </div>

              {/* Featured Image if available */}
              {selectedArticle.featured_image && (
                <figure className="relative rounded-2xl overflow-hidden border border-[#c99738]/40 shadow-xl bg-stone-950">
                  <img
                    src={selectedArticle.featured_image}
                    alt={getArticleContent(selectedArticle).title}
                    className="w-full h-56 sm:h-72 md:h-80 object-cover"
                  />
                  <figcaption className="p-3 bg-stone-950/90 border-t border-stone-800/80 text-xs text-stone-300 flex items-center justify-between">
                    <span className="text-[#d4af37] font-semibold">Corroborated Historical Artifact / Location</span>
                    <span className="text-stone-400 truncate max-w-xs">{getArticleContent(selectedArticle).title}</span>
                  </figcaption>
                </figure>
              )}

              {/* Executive Summary / Abstract */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#20050c]/80 via-[#180309]/80 to-[#121622] border-l-4 border-[#d4af37] border-y border-r border-stone-800/80 text-stone-200 shadow-inner space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Executive Introduction & Historical Scope</span>
                </div>
                <p className="font-royal-serif text-xs sm:text-sm leading-relaxed text-[#fcedc7]/95">
                  {getArticleContent(selectedArticle).summary}
                </p>
              </div>

              {/* Complete Monograph Body Content (Never Truncated) */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#d4af37]" />
                  <span>Full Monograph Treatise & Archival Documentation</span>
                </h4>
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0c0f17] border border-stone-800/90 font-royal-serif text-xs sm:text-sm text-stone-300 leading-relaxed space-y-4 whitespace-pre-line">
                  {getArticleContent(selectedArticle).content}
                </div>
              </div>

              {/* Primary Sources & Citations */}
              {selectedArticle.sources && selectedArticle.sources.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-1.5">
                    <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Primary Inscriptions, Citations & Sources ({selectedArticle.sources.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedArticle.sources.map((src, i) => (
                      <div
                        key={src.id || i}
                        className="p-3.5 rounded-xl bg-[#141926] border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-[#d4af37] uppercase bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                              {src.source_type}
                            </span>
                            <span className="font-bold text-stone-200">{src.title}</span>
                          </div>
                          <p className="text-stone-400 text-[11px]">
                            {src.author_or_authority} • {src.publication_or_location} ({src.year_or_era}) — {src.citation_details}
                          </p>
                        </div>
                        {src.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                            <Check className="w-3 h-3" /> Verified Source
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags & Thematic Keywords */}
              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading block">
                    Thematic Keywords & Epigraphic Tags:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArticle.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#182030] text-[#fae29c] border border-[#c99738]/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pinned Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 bg-[#121622] rounded-b-2xl sm:rounded-b-3xl shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  onNavigate('/inscriptions');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#182030] hover:bg-[#20293d] text-[#fae29c] border border-[#c99738]/40 transition-all cursor-pointer"
              >
                <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{t.nav?.inscriptions || 'Explore Epigraphic Corpus'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#580014] hover:bg-[#72001a] text-[#fae29c] border border-[#d4af37] transition-all cursor-pointer shadow-md active:scale-95"
              >
                Close Monograph
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

