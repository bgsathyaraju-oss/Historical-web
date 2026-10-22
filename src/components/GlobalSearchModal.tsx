import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, BookOpen, User, ShieldCheck, MapPin, FileText, ArrowRight, Crown, Users } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';
import { useLanguage } from '../context/LanguageContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { translateText } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'figures' | 'community' | 'inscriptions' | 'members'>('all');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${activeTab}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (e) {
        console.error('Search query failed:', e);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query, activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#10141f] border border-[#c99738]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-800 flex items-center gap-3 bg-[#151a28]">
          <Search className="w-5 h-5 text-[#d4af37] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search inscriptions, rulers, Odra Desha, temples, research papers..."
            className="w-full bg-transparent text-[#f5f3ed] placeholder-stone-400 text-base sm:text-lg focus:outline-none"
          />
          {loading && <Loader2 className="w-5 h-5 text-[#d4af37] animate-spin shrink-0" />}
          {query && !loading && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-stone-400 border border-stone-700 hover:border-stone-500 rounded-md hover:text-stone-200 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#0c0f17] border-b border-stone-800/80 text-xs overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Archives' },
            { id: 'figures', label: 'Rulers & Progenitors' },
            { id: 'community', label: 'Community & Synonyms' },
            { id: 'articles', label: 'Research Articles' },
            { id: 'inscriptions', label: 'Inscriptions' },
            { id: 'members', label: 'Public Members' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors font-medium ${
                activeTab === tab.id
                  ? 'bg-[#c99738] text-[#300207] font-semibold'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-800/60">
          {!query.trim() ? (
            <div className="py-12 text-center text-stone-400">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-[#c99738]/50" />
              <p className="text-sm font-medium text-stone-300">Enter a term to search historical archives</p>
              <p className="text-xs text-stone-500 mt-1">Try: "Bhagiratha", "Samrat Sagara", "Kharavela", "Kapilendra Deva", "Jasma Devi", "Siddharameshwara", "Oad-Rajput", "Veligalani"</p>
            </div>
          ) : results.length === 0 && !loading ? (
            <div className="py-12 text-center text-stone-400">
              <p className="text-sm font-medium">No archived records matching "{query}"</p>
              <p className="text-xs text-stone-500 mt-1">Check the spelling or try searching by category or period.</p>
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onNavigate(item.link);
                  onClose();
                }}
                className="py-3 px-3 hover:bg-[#192132]/60 rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-stone-800 text-[#e8c872]">
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
                <p className="text-xs text-stone-400 line-clamp-2">
                  {item.snippet}
                </p>
                <div className="mt-2 flex items-center text-[11px] text-[#e8c872] opacity-0 group-hover:opacity-100 transition-opacity gap-1 font-medium">
                  <span>Explore record</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
