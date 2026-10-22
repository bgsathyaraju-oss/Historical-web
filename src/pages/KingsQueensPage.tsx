import React, { useState, useEffect } from 'react';
import { HistoricalFigure } from '../types';
import { Crown, ShieldCheck, MapPin, Calendar, BookOpen, Scroll, ChevronRight, User } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ArticleActionBar } from '../components/ArticleActionBar';
import { useLanguage } from '../context/LanguageContext';

interface KingsQueensPageProps {
  onNavigate: (path: string) => void;
}

export const KingsQueensPage: React.FC<KingsQueensPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const [figures, setFigures] = useState<HistoricalFigure[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/content/figures?lang=${language}`)
      .then(res => res.json())
      .then(data => {
        setFigures(data.figures || []);
        if (data.figures && data.figures.length > 0) {
          setSelectedFigure(data.figures[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [language]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Crown className="w-4 h-4" />
          <span>{t.kingsQueens.badge}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {t.kingsQueens.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {t.kingsQueens.subtitle}
        </p>
      </div>

      {/* Global Page Action Bar with Home, Close, and 8-Language Switcher */}
      <ArticleActionBar
        onHome={() => onNavigate('/')}
        onClose={() => onNavigate('/')}
        title={t.kingsQueens.title}
        badge="Monarchs"
        showLanguages={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Figure List Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-1">
            {t.kingsQueens.listTitle} ({figures.length})
          </div>

          <div className="space-y-3">
            {figures.map(fig => {
              const isSelected = selectedFigure?.id === fig.id;
              return (
                <div
                  key={fig.id}
                  onClick={() => setSelectedFigure(fig)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 flex items-center gap-4 ${
                    isSelected
                      ? 'bg-[#580014]/40 border-[#d4af37] shadow-[0_0_20px_rgba(201,151,56,0.2)]'
                      : 'bg-[#121622] border-stone-800 hover:border-stone-700 hover:bg-[#181f2f]'
                  }`}
                >
                  <img
                    src={fig.image_url}
                    alt={fig.name}
                    className="w-14 h-14 rounded-xl object-cover border border-[#c99738]/40 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                        {fig.reign_period}
                      </span>
                    </div>
                    <h3 className="font-royal-heading font-bold text-sm text-stone-100 truncate">
                      {fig.name}
                    </h3>
                    <p className="text-[11px] text-stone-400 truncate">
                      {fig.dynasty_name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Figure Detail View */}
        <div className="lg:col-span-8">
          {selectedFigure && (
            <div className="rounded-3xl bg-[#111520] border border-[#c99738]/40 p-6 sm:p-8 space-y-8 shadow-xl">
              {/* Monarch Summary Frame Action Bar */}
              <ArticleActionBar
                onHome={() => onNavigate('/')}
                onClose={() => setSelectedFigure(null)}
                title={selectedFigure.name}
                badge={selectedFigure.reign_period}
                showLanguages={true}
              />

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

                  <div className="text-xs text-stone-400">
                    <strong className="text-stone-300">{t.kingsQueens.alternateSpellings}:</strong> {selectedFigure.alternate_names.join(', ')}
                  </div>

                  <div className="text-xs text-stone-400">
                    <strong className="text-stone-300">{t.kingsQueens.dynastyLabel}:</strong> {selectedFigure.dynasty_name} ({selectedFigure.approx_dates})
                  </div>
                </div>
              </div>

              {/* Known Imperial Titles */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  {t.kingsQueens.titlesLabel}
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

              {/* Biography */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  {t.kingsQueens.biographyLabel}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed bg-[#0c0f17] p-4 rounded-xl border border-stone-800/80">
                  {selectedFigure.biography}
                </p>
              </div>

              {/* Major Corroborated Events */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  {t.kingsQueens.eventsLabel}
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

              {/* Associated Places */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  {t.kingsQueens.placesLabel}
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

              {/* References & Citations */}
              <div className="space-y-2 pt-4 border-t border-stone-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-1.5">
                  <Scroll className="w-3.5 h-3.5" />
                  <span>{t.kingsQueens.citationsLabel}</span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
