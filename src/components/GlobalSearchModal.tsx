import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Loader2, BookOpen, ArrowRight } from 'lucide-react';
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
      const clientResults = performClientSearch(trimmed, tab, currentLang);
      setResults(clientResults);

      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        fetch(`/api/search?q=${encodeURIComponent(trimmed)}&type=${tab}&lang=${encodeURIComponent(currentLang)}`)
          .then(res => {
            if (res.ok) return res.json();
            return null;
          })
          .then(data => {
            if (data?.results && Array.isArray(data.results) && data.results.length > 0) {
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
          .catch(() => {});
      }
    } catch (err) {
      console.error('[SURYAVAMSHA ARCHIVES] Client search error:', err);
      setSearchError('An unexpected error occurred while searching historical records. Please try another term.');
    } finally {
      setLoading(false);
    }
  }, [activeTab, currentLang]);

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
      className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-16 px-3 sm:px-4 bg-[#292521]/65 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl bg-[#FFFCF5] border-2 border-[#A87924] rounded-2xl shadow-[0_18px_48px_rgba(75,51,31,0.26)] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input & Action Bar */}
        <form
          onSubmit={handleFormSubmit}
          className="p-3 sm:p-4 border-b border-[#D8C3A2] flex items-center gap-2 sm:gap-3 bg-[#FFF9EF]"
        >
          <Search className="w-5 h-5 text-[#A87924] shrink-0" aria-hidden="true" />

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
            className="w-full bg-[#FFFFFF] px-3 py-2 rounded-xl border border-[#D8C3A2] focus:border-[#A87924] text-[#292521] placeholder-[#6B5948] text-sm sm:text-base focus:outline-none"
            aria-label="Search historical archives"
          />

          {loading && <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#A87924] animate-spin shrink-0" />}

          {query && !loading && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                setHasSearched(false);
                inputRef.current?.focus();
              }}
              className="p-1.5 text-[#6B5948] hover:text-[#292521] rounded-lg hover:bg-[#E9D9BE] transition-colors cursor-pointer"
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
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-[#762D35] hover:bg-[#5e2229] text-white font-bold text-xs sm:text-sm border border-[#A87924] shadow-sm flex items-center gap-1.5 transition-all shrink-0 cursor-pointer active:scale-95"
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
            className="px-2.5 py-2 text-xs font-semibold text-[#54351F] bg-[#E9D9BE] border border-[#D8C3A2] hover:border-[#A87924] rounded-lg hover:bg-[#dfc9a4] transition-colors shrink-0 cursor-pointer"
            title="Close Search Modal (ESC)"
            aria-label="Close"
          >
            ESC
          </button>
        </form>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-[#EFE3D0] border-b border-[#D8C3A2] text-xs overflow-x-auto scrollbar-none">
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
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors font-semibold cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-[#762D35] text-white border-[#A87924] shadow-sm'
                  : 'bg-[#FFFCF5] text-[#54351F] border-[#D8C3A2] hover:bg-[#E9D9BE] hover:border-[#A87924]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-[#D8C3A2]">
          {searchError ? (
            <div className="py-12 text-center text-[#762D35] px-4 space-y-2">
              <p className="text-sm font-semibold">{searchError}</p>
              <button
                type="button"
                onClick={() => executeSearch(query)}
                className="text-xs text-[#76501F] hover:underline font-semibold"
              >
                Retry Search
              </button>
            </div>
          ) : !query.trim() ? (
            <div className="py-12 text-center text-[#6B5948] space-y-3 px-4">
              <BookOpen className="w-10 h-10 mx-auto mb-2 text-[#A87924]" />
              <p className="text-sm font-bold text-[#54351F]">Enter a term to search historical archives</p>
              <p className="text-xs text-[#6B5948] max-w-lg mx-auto leading-relaxed">
                Try searching for sovereign monarchs, epigraphs, or community lineages:
                <br />
                <span className="text-[#76501F] font-semibold">
                  "Balanagamma", "Raja Bhoja", "Balavaddiraju", "Kapilendra Deva", "Odra Desha", "Kharavela", "Paikas", "Veligalani"
                </span>
              </p>
            </div>
          ) : results.length === 0 && !loading && hasSearched ? (
            <div className="py-12 text-center text-[#6B5948] space-y-2 px-4">
              <p className="text-sm font-bold text-[#54351F]">
                No archived records found matching &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-[#6B5948] max-w-md mx-auto">
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
                className="py-3 px-3 hover:bg-[#FFF9EF] rounded-xl transition-all cursor-pointer group"
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
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#E9D9BE] text-[#54351F] border border-[#D8C3A2]">
                      {item.type}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-[#54351F] group-hover:text-[#762D35] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  {item.verification_status && (
                    <EvidenceBadge status={item.verification_status} size="sm" />
                  )}
                </div>
                <div className="text-xs text-[#76501F] font-semibold mb-1">
                  {item.subtitle}
                </div>
                <p className="text-xs text-[#292521] line-clamp-2 leading-relaxed">
                  {item.snippet}
                </p>
                <div className="mt-2 flex items-center text-[11px] text-[#762D35] font-semibold gap-1">
                  <span>Explore record</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Result Count */}
        {results.length > 0 && (
          <div className="px-4 py-2.5 bg-[#EFE3D0] border-t border-[#D8C3A2] text-[11px] text-[#54351F] font-medium flex items-center justify-between">
            <span>Showing {results.length} historical record{results.length === 1 ? '' : 's'} across 8 languages</span>
            <span className="text-[#6B5948]">Press ESC or click outside to close</span>
          </div>
        )}
      </div>
    </div>
  );
};
