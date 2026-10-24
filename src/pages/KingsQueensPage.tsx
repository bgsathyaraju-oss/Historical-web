import React, { useState, useEffect } from 'react';
import { HistoricalFigure } from '../types';
import {
  Crown,
  ShieldCheck,
  MapPin,
  Calendar,
  BookOpen,
  Scroll,
  Search,
  User,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Share2,
  Copy,
  Check,
  X,
  ExternalLink,
  Maximize2
} from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { useLanguage } from '../context/LanguageContext';
import { getAllDocumentedFigures, DOCUMENTED_FIGURES_REPO } from '../data/documentedFiguresRepository';

interface KingsQueensPageProps {
  onNavigate: (path: string) => void;
  initialFigureId?: string | null;
}

export const KingsQueensPage: React.FC<KingsQueensPageProps> = ({ onNavigate, initialFigureId }) => {
  const { t, language } = useLanguage();
  
  // Guarantee 100% immediate rendering across all browsers (Safari, Firefox, Chrome, Android, iOS)
  const initialFigures = getAllDocumentedFigures(language);
  const [figures, setFigures] = useState<HistoricalFigure[]>(initialFigures);
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(() => {
    if (initialFigureId) {
      const found = initialFigures.find(f => f.id === initialFigureId);
      if (found) return found;
    }
    return initialFigures[0] || null;
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(() => Boolean(initialFigureId));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Synchronize figure translations instantly whenever language changes
  useEffect(() => {
    const updated = getAllDocumentedFigures(language);
    setFigures(updated);
    setSelectedFigure(prev => {
      if (!prev) return updated[0] || null;
      return updated.find(f => f.id === prev.id) || updated[0] || null;
    });

    // Passive background refresh to incorporate any server-side database additions
    fetch(`/api/content/figures?lang=${language}`)
      .then(res => res.json())
      .then(data => {
        if (data.figures && data.figures.length > 0) {
          setFigures(data.figures);
        }
      })
      .catch(() => {
        // Offline or network restricted - repository data already active and complete
      });
  }, [language]);

  // Synchronize initialFigureId prop changes (e.g. from search navigation)
  useEffect(() => {
    if (initialFigureId) {
      const match = figures.find(f => f.id === initialFigureId);
      if (match) {
        setSelectedFigure(match);
        setIsModalOpen(true);
      }
    }
  }, [initialFigureId, figures]);

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

  const categories = [
    { id: 'all', label: `All Historical Figures (${figures.length})` },
    { id: 'gajapathi_monarchs', label: 'Suryavamsha Gajapathi Monarchs' },
    { id: 'progenitors_emperors', label: 'Ancient Emperors & Progenitors' },
    { id: 'sacred_civic', label: 'Spiritual, Martial & Civic Guardians' }
  ];

  const normQuery = searchQuery.trim().toLowerCase();

  const filteredFigures = figures.filter(fig => {
    // Find category from repo metadata
    const repoItem = DOCUMENTED_FIGURES_REPO.find(r => r.id === fig.id);
    if (selectedCategory !== 'all' && repoItem && repoItem.category !== selectedCategory) {
      return false;
    }

    if (!normQuery) return true;

    return (
      fig.name.toLowerCase().includes(normQuery) ||
      fig.dynasty_name.toLowerCase().includes(normQuery) ||
      fig.reign_period.toLowerCase().includes(normQuery) ||
      fig.alternate_names.some(n => n.toLowerCase().includes(normQuery)) ||
      fig.known_titles.some(title => title.toLowerCase().includes(normQuery))
    );
  });

  const handleCopyLink = () => {
    if (!selectedFigure) return;
    const url = `${window.location.origin}${window.location.pathname}?figure=${encodeURIComponent(selectedFigure.id)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Crown className="w-4 h-4" />
          <span>{t.kingsQueens?.badge || 'Suryavamsha Imperial Genealogy & Royal Biographies'}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {t.kingsQueens?.title || 'Documented Historical Figures & Monarchs'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {t.kingsQueens?.subtitle || 'Epigraphically verified chronicles, regnal inscriptions, and biographical monographs of the Suryavamshi Gajapathi emperors, ancient solar progenitors, and heroic guardians of Odra Desha.'}
        </p>
      </div>

      {/* Filter and Search Navigation Bar (Single, Clean Bar - No Duplicated Elements) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#121622] border border-stone-800 shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
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
            placeholder="Search figures, titles, reigns..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#182030] text-stone-200 border border-stone-700 focus:outline-none focus:border-[#c99738]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Figure List Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-1 flex items-center justify-between">
            <span>{t.kingsQueens?.listTitle || 'Documented Figures'} ({filteredFigures.length})</span>
            <span className="text-[10px] text-stone-500 lowercase">8 languages active</span>
          </div>

          <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1 scrollbar-thin">
            {filteredFigures.map(fig => {
              const isSelected = selectedFigure?.id === fig.id;
              return (
                <div
                  key={fig.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedFigure(fig);
                    setIsModalOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedFigure(fig);
                      setIsModalOpen(true);
                    }
                  }}
                  className={`p-3.5 rounded-2xl cursor-pointer border transition-all duration-200 flex items-center gap-3.5 group relative ${
                    isSelected
                      ? 'bg-[#580014]/40 border-[#d4af37] shadow-[0_0_20px_rgba(201,151,56,0.2)]'
                      : 'bg-[#121622] border-stone-800 hover:border-stone-700 hover:bg-[#181f2f]'
                  }`}
                  aria-label={`Open details for ${fig.name}`}
                >
                  <img
                    src={fig.image_url}
                    alt={fig.name}
                    className="w-13 h-13 rounded-xl object-cover border border-[#c99738]/40 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                        {fig.reign_period}
                      </span>
                    </div>
                    <h3 className="font-royal-heading font-bold text-sm text-stone-100 truncate group-hover:text-[#fae29c] transition-colors">
                      {fig.name}
                    </h3>
                    <p className="text-[11px] text-stone-400 truncate">
                      {fig.dynasty_name}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-[#d4af37] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Figure Detail View */}
        <div className="lg:col-span-8">
          {selectedFigure ? (
            <article className="rounded-3xl bg-[#111520] border border-[#c99738]/40 p-6 sm:p-8 space-y-8 shadow-xl">
              {/* Action Bar with Back to Home, Open Modal & Copy Direct Link */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-[#580014] text-stone-200 hover:text-[#fae29c] border border-stone-700 hover:border-[#d4af37] transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Home</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#580014] hover:bg-[#72001a] text-[#fae29c] border border-[#d4af37]/60 transition-all cursor-pointer shadow-sm active:scale-95"
                    title="Open Full Popup Modal"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Open Popup Modal</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#161c2a] hover:bg-[#20293d] text-stone-300 hover:text-white border border-stone-700 transition-all cursor-pointer"
                    title="Copy Link to this Figure"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
                    <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                  </button>
                  <span className="text-xs text-stone-400 font-mono bg-stone-950 px-2 py-1 rounded border border-stone-800">
                    ID: {selectedFigure.id}
                  </span>
                </div>
              </div>

              {/* Header Profile Banner */}
              <div className="flex flex-col sm:flex-row items-start gap-6 border-b border-stone-800 pb-6">
                <img
                  src={selectedFigure.image_url}
                  alt={selectedFigure.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-2 border-[#d4af37] shadow-xl shrink-0"
                />
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-3 py-0.5 rounded-full bg-stone-900 border border-stone-800">
                      {selectedFigure.reign_period}
                    </span>
                    <EvidenceBadge category="verified_archaeological" size="sm" />
                  </div>

                  <h2 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7]">
                    {selectedFigure.name}
                  </h2>

                  {selectedFigure.alternate_names && selectedFigure.alternate_names.length > 0 && (
                    <div className="text-xs text-stone-400">
                      <strong className="text-stone-300">{t.kingsQueens?.alternateSpellings || 'Alternate Names'}:</strong>{' '}
                      {selectedFigure.alternate_names.join(', ')}
                    </div>
                  )}

                  <div className="text-xs text-stone-400">
                    <strong className="text-stone-300">{t.kingsQueens?.dynastyLabel || 'Dynastic House'}:</strong>{' '}
                    {selectedFigure.dynasty_name} {selectedFigure.approx_dates ? `(${selectedFigure.approx_dates})` : ''}
                  </div>
                </div>
              </div>

              {/* Known Imperial Titles */}
              {selectedFigure.known_titles && selectedFigure.known_titles.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    {t.kingsQueens?.titlesLabel || 'Imperial & Sovereign Titles'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFigure.known_titles.map((titleItem, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-[#182030] border border-stone-800 text-xs text-stone-200 font-medium"
                      >
                        {titleItem}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Biography */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  {t.kingsQueens?.biographyLabel || 'Historical Biography & Epigraphic Chronicle'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed bg-[#0c0f17] p-5 rounded-xl border border-stone-800/80">
                  {selectedFigure.biography}
                </p>
              </div>

              {/* Major Corroborated Events */}
              {selectedFigure.major_events && selectedFigure.major_events.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    {t.kingsQueens?.eventsLabel || 'Chronological Milestones & Strategic Campaigns'}
                  </h3>
                  <div className="space-y-2">
                    {selectedFigure.major_events.map((ev, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#161c2a] border border-stone-800 text-xs text-stone-300 flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                        <span>{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Associated Places */}
              {selectedFigure.associated_places && selectedFigure.associated_places.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    {t.kingsQueens?.placesLabel || 'Associated Citadels, Forts & Shrines'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFigure.associated_places.map((place, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-xs text-stone-300"
                      >
                        <MapPin className="w-3 h-3 text-[#d4af37]" />
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* References & Primary Epigraphic Citations */}
              {selectedFigure.citations && selectedFigure.citations.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-stone-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-1.5">
                    <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{t.kingsQueens?.citationsLabel || 'Primary Inscriptions & Archaeological Sources'}</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-stone-400">
                    {selectedFigure.citations.map((cite, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                        <span>{cite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ) : (
            <div className="rounded-3xl bg-[#111520] border border-stone-800 p-12 text-center text-stone-400">
              Select a historical figure from the left panel to examine their full regnal chronicle.
            </div>
          )}
        </div>
      </div>

      {/* Centered, Responsive Modal Dialog for Selected Historical Personage */}
      {isModalOpen && selectedFigure && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="figure-modal-title"
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
                <Crown className="w-5 h-5 text-[#d4af37] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] block truncate">
                    {t.kingsQueens?.badge || 'Suryavamsha Historical Personage Dossier'}
                  </span>
                  <h2 id="figure-modal-title" className="text-sm sm:text-lg font-bold font-royal-heading text-[#fae29c] truncate">
                    {selectedFigure.name}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#161c2a] hover:bg-[#20293d] text-stone-300 hover:text-white border border-stone-700 transition-all cursor-pointer"
                  title="Copy link to this person"
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
              {/* Profile Card Banner */}
              <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 border-b border-stone-800 pb-6">
                <img
                  src={selectedFigure.image_url}
                  alt={selectedFigure.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-[#d4af37] shadow-xl shrink-0 bg-[#161a29]"
                />
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-3 py-0.5 rounded-full bg-stone-900 border border-stone-800">
                      {selectedFigure.reign_period}
                    </span>
                    <EvidenceBadge category="verified_archaeological" size="sm" />
                  </div>

                  <h3 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7]">
                    {selectedFigure.name}
                  </h3>

                  {selectedFigure.alternate_names && selectedFigure.alternate_names.length > 0 && (
                    <div className="text-xs text-stone-400">
                      <strong className="text-stone-300">{t.kingsQueens?.alternateSpellings || 'Alternate Names'}:</strong>{' '}
                      {selectedFigure.alternate_names.join(', ')}
                    </div>
                  )}

                  <div className="text-xs text-stone-400">
                    <strong className="text-stone-300">{t.kingsQueens?.dynastyLabel || 'Dynastic House'}:</strong>{' '}
                    {selectedFigure.dynasty_name} {selectedFigure.approx_dates ? `(${selectedFigure.approx_dates})` : ''}
                  </div>
                </div>
              </div>

              {/* Recorded Imperial Titles & Prasastis */}
              {selectedFigure.known_titles && selectedFigure.known_titles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    {t.kingsQueens?.titlesLabel || 'Recorded Imperial Titles & Prasastis'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFigure.known_titles.map((titleItem, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-[#182030] border border-stone-800 text-xs text-stone-200 font-medium"
                      >
                        {titleItem}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Scholarly Biography */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#d4af37]" />
                  <span>{t.kingsQueens?.biographyLabel || 'Scholarly Biography & Historical Significance'}</span>
                </h4>
                <div className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed bg-[#0c0f17] p-5 rounded-xl border border-stone-800/80 space-y-3">
                  <p>{selectedFigure.biography}</p>
                  {selectedFigure.historical_significance && (
                    <div className="pt-3 border-t border-stone-800/60">
                      <strong className="text-[#fae29c] font-royal-heading block mb-1 text-xs uppercase tracking-wider">
                        Historical Significance:
                      </strong>
                      <p className="text-xs sm:text-sm text-stone-300 italic">
                        {selectedFigure.historical_significance}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Chronologically Documented Milestones */}
              {selectedFigure.major_events && selectedFigure.major_events.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    {t.kingsQueens?.eventsLabel || 'Chronologically Documented Events & Strategic Campaigns'}
                  </h4>
                  <div className="space-y-2">
                    {selectedFigure.major_events.map((ev, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#161c2a] border border-stone-800 text-xs text-stone-300 flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                        <span>{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Associated Citadels, Forts & Shrines */}
              {selectedFigure.associated_places && selectedFigure.associated_places.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    {t.kingsQueens?.placesLabel || 'Associated Fortresses, Shrines & Kshetrams'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFigure.associated_places.map((place, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-xs text-stone-300"
                      >
                        <MapPin className="w-3 h-3 text-[#d4af37]" />
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Inscriptions & Epigraphia Indica Citations */}
              {selectedFigure.citations && selectedFigure.citations.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-stone-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-1.5">
                    <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{t.kingsQueens?.citationsLabel || 'Primary Inscriptions & Archaeological Sources'}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-400 bg-[#0c0f17] p-4 rounded-xl border border-stone-800/80">
                    {selectedFigure.citations.map((cite, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                        <span>{cite}</span>
                      </li>
                    ))}
                  </ul>
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
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

