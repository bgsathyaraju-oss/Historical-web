import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Loader2, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';
import { useLanguage } from '../context/LanguageContext';
import { performClientSearch, SearchResultItem } from '../utils/searchEngine';
import type { LanguageCode } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { language } = useLanguage();
  const currentLang = (language as LanguageCode) || 'en';
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'figures' | 'community' | 'inscriptions' | 'members'>('all');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
      setResults([]);
      setHasSearched(false);
      setSearchError(null);
    }
  }, [isOpen]);

  // Core search execution function: runs instantly client-side without depending on backend
  const executeSearch = useCallback((searchTerm: string, tab = activeTab) => {
    const trimmed = searchTerm.normalize('NFC').trim();
    if (!trimmed) {
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      setSearchError(null);
      return;
    }

    setLoading(true);
    setSearchError(null);
    setHasSearched(true);

    try {
      // 1. Instant high-performance client-side search across all 8 languages & records
      const clientResults = performClientSearch(trimmed, tab, currentLang);
      setResults(clientResults);

      // 2. Optional passive background sync if running on a live Express backend
      // Protected by catch so 404s on static GitHub Pages will never fail or discard client results
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        fetch(`/api/search?q=${encodeURIComponent(trimmed)}&type=${tab}&lang=${encodeURIComponent(currentLang)}`)
          .then(res => {
            if (res.ok) return res.json();
            return null;
          })
          .then(data => {
            if (data?.results && Array.isArray(data.results) && data.results.length > 0) {
              // Merge any server-specific dynamic additions while preserving client findings
              setResults(prev => {
                const map = new Map<string, SearchResultItem>();
                prev.forEach(item => map.set(`${item.type}:${item.id}`, item));
                data.results.forEach((item: SearchResultItem) => {
                  const key = `${item.type}:${item.id}`;
                  if (!map.has(key)) map.set(key, item);
                });
                return Array.from(map.values());
              });
            }
          })
          .catch(() => {
            // Silently ignore network failures; client search already succeeded
          });
      }
    } catch (err) {
      console.error('[SURYAVAMSHA ARCHIVES] Client search error:', err);
      setSearchError('An unexpected error occurred while searching historical records. Please try another term.');
    } finally {
      setLoading(false);
    }
  }, [activeTab, currentLang]);

  // Debounced auto-search as user types
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(() => {
      executeSearch(query, activeTab);
    }, 180);

    return () => clearTimeout(timer);
  }, [query, activeTab, executeSearch]);

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    if (query.trim()) {
      executeSearch(query, tabId);
    }
  };

  const handleFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    executeSearch(query, activeTab);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="w-full max-w-3xl bg-[#10141f] border border-[#c99738]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Search Input & Action Bar wrapped in Form for Enter & Click Support */}
        <form
          onSubmit={handleFormSubmit}
          className="p-3 sm:p-4 border-b border-stone-800 flex items-center gap-2 sm:gap-3 bg-[#151a28]"
        >
          <Search className="w-5 h-5 text-[#d4af37] shrink-0" aria-hidden="true" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleFormSubmit();
              }
            }}
            placeholder="Search inscriptions, rulers, Odra Desha, temples, research papers..."
            className="w-full bg-transparent text-[#f5f3ed] placeholder-stone-400 text-sm sm:text-base focus:outline-none"
            aria-label="Search historical archives"
          />

          {loading && <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37] animate-spin shrink-0" />}

          {query && !loading && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                setHasSearched(false);
                inputRef.current?.focus();
              }}
              className="p-1 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800 transition-colors"
              title="Clear search input"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Primary Clickable Search Button */}
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-[#997022] via-[#c99738] to-[#997022] text-[#290106] font-bold text-xs sm:text-sm hover:from-[#b38328] hover:to-[#dfab43] shadow-[0_2px_12px_rgba(201,151,56,0.3)] flex items-center gap-1.5 transition-all shrink-0 cursor-pointer active:scale-95"
            title="Execute Search"
            aria-label="Execute Search"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>

          {/* Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1.5 text-xs text-stone-400 border border-stone-700 hover:border-stone-500 rounded-lg hover:text-stone-200 transition-colors shrink-0"
            title="Close Search Modal (ESC)"
            aria-label="Close"
          >
            ESC
          </button>
        </form>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#0c0f17] border-b border-stone-800/80 text-xs overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Archives' },
            { id: 'figures', label: 'Rulers & Sovereigns' },
            { id: 'community', label: 'Community & Prominent Persons' },
            { id: 'articles', label: 'Research Articles' },
            { id: 'inscriptions', label: 'Inscriptions' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id as any)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#c99738] text-[#300207] font-semibold shadow-sm'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-stone-800/60">
          {searchError ? (
            <div className="py-12 text-center text-rose-400 px-4 space-y-2">
              <p className="text-sm font-semibold">{searchError}</p>
              <button
                type="button"
                onClick={() => executeSearch(query)}
                className="text-xs text-[#d4af37] hover:underline"
              >
                Retry Search
              </button>
            </div>
          ) : !query.trim() ? (
            <div className="py-12 text-center text-stone-400 space-y-3 px-4">
              <BookOpen className="w-10 h-10 mx-auto mb-2 text-[#c99738]/50" />
              <p className="text-sm font-medium text-stone-300">Enter a term to search historical archives</p>
              <p className="text-xs text-stone-500 max-w-lg mx-auto">
                Try searching for sovereign monarchs, epigraphs, or community lineages:
                <br />
                <span className="text-[#e8c872] font-medium">
                  "Balanagamma", "Raja Bhoja", "Balavaddiraju", "Kapilendra Deva", "Odra Desha", "Kharavela", "Paikas", "Veligalani"
                </span>
              </p>
            </div>
          ) : results.length === 0 && !loading && hasSearched ? (
            <div className="py-12 text-center text-stone-400 space-y-2 px-4">
              <p className="text-sm font-semibold text-stone-200">
                No archived records found matching &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                Please check the spelling or switch to &ldquo;All Archives&rdquo; filter tab. You can also search in Telugu, Hindi, Odia, Kannada, Tamil, or Bengali.
              </p>
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={`${item.type}-${item.id}-${idx}`}
                onClick={() => {
                  onNavigate(item.link);
                  onClose();
                }}
                className="py-3 px-3 hover:bg-[#192132]/70 rounded-xl transition-all cursor-pointer group"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(item.link);
                    onClose();
                  }
                }}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-stone-800 text-[#e8c872]">
                      {item.type}
                    </span>
                    <h4 className="text-sm sm:text-base font-semibold text-stone-100 group-hover:text-[#e8c872] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  {item.verification_status && (
                    <EvidenceBadge status={item.verification_status} size="sm" />
                  )}
                </div>
                <div className="text-xs text-[#d4af37]/80 font-medium mb-1">
                  {item.subtitle}
                </div>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {item.snippet}
                </p>
                <div className="mt-2 flex items-center text-[11px] text-[#e8c872] opacity-0 group-hover:opacity-100 transition-opacity gap-1 font-medium">
                  <span>Explore record</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Result Count */}
        {results.length > 0 && (
          <div className="px-4 py-2 bg-[#0c0f17] border-t border-stone-800/80 text-[11px] text-stone-400 flex items-center justify-between">
            <span>Showing {results.length} historical record{results.length === 1 ? '' : 's'} across 8 languages</span>
            <span className="text-stone-500">Press ESC or click outside to close</span>
          </div>
        )}
      </div>
    </div>
  );
};

