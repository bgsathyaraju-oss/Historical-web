import React, { useState, useEffect } from 'react';
import { TempleMonument } from '../types';
import { Landmark, MapPin, Calendar, ShieldCheck, BookOpen, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { getCanonicalMonuments } from '../data/archivalSeedData';

interface TemplesMonumentsPageProps {
  onNavigate?: (path: string) => void;
}

export const TemplesMonumentsPage: React.FC<TemplesMonumentsPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const [monuments, setMonuments] = useState<TempleMonument[]>(() => getCanonicalMonuments(language));
  const [selectedMonument, setSelectedMonument] = useState<TempleMonument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localMonuments = getCanonicalMonuments(language);
    setMonuments(localMonuments);
    setSelectedMonument(prev => prev ? (localMonuments.find(m => m.id === prev.id) || prev) : null);
    fetch(`/api/content/monuments?lang=${language}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.monuments && d.monuments.length > 0) {
          setMonuments(d.monuments);
          setSelectedMonument(prev => prev ? (d.monuments.find((m: TempleMonument) => m.id === prev.id) || prev) : null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [language]);

  const buildMonumentModalItem = (mon: TempleMonument | null): ContentDetailItem | null => {
    if (!mon) return null;
    return {
      id: mon.id,
      title: mon.name,
      subtitle: `${mon.location}, ${mon.state}`,
      badge: mon.century,
      verificationStatus: 'Documented Architectural Monument',
      imageUrl: mon.image_url,
      imageLayout: 'banner',
      metadata: [
        { label: 'Location & State', value: `${mon.location}, ${mon.state}` },
        { label: t.monuments.patronLabel || 'Patron Ruler / Authority', value: mon.patron_ruler },
        { label: t.monuments.styleLabel || 'Architectural Style', value: mon.architectural_style },
        { label: 'Historical Period', value: mon.century }
      ],
      fullText: mon.historical_significance,
      fullTextLabel: 'Historical & Architectural Significance',
      sources: (mon.sources || []).map(src => ({
        title: src,
        type: 'Architectural & Epigraphic Source'
      }))
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Landmark className="w-4 h-4" />
          <span>{t.monuments.badge}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {t.monuments.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {t.monuments.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monuments.map(mon => (
          <div
            key={mon.id}
            onClick={() => setSelectedMonument(mon)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedMonument(mon);
              }
            }}
            className="rounded-3xl bg-[#121622] border border-stone-800 hover:border-[#c99738]/60 overflow-hidden shadow-xl flex flex-col justify-between group transition-all cursor-pointer hover:-translate-y-1"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={mon.image_url}
                alt={mon.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#fcedc7] bg-[#580014]/90 px-3 py-1 rounded-full border border-[#d4af37]/40">
                  {mon.century}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-[#d4af37]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{mon.location}, {mon.state}</span>
                </div>

                <h3 className="font-royal-heading font-bold text-lg text-stone-100 group-hover:text-[#e8c872] transition-colors leading-tight">
                  {mon.name}
                </h3>

                <div className="text-xs text-stone-400">
                  <span className="text-stone-300 font-semibold">{t.monuments.patronLabel}:</span> {mon.patron_ruler}
                </div>

                <div className="text-xs text-stone-400">
                  <span className="text-stone-300 font-semibold">{t.monuments.styleLabel}:</span> {mon.architectural_style}
                </div>

                <p className="text-xs text-stone-300 leading-relaxed pt-2 border-t border-stone-800">
                  {mon.historical_significance}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/80 text-[11px] text-stone-500 flex items-center justify-between gap-2">
                <span className="truncate"><span className="font-medium text-stone-400">{t.monuments.sourcesLabel}:</span> {mon.sources.join('; ')}</span>
                <span className="text-[#e8c872] font-semibold shrink-0 flex items-center gap-1">
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shared Content Detail Modal */}
      <ContentDetailModal
        item={buildMonumentModalItem(selectedMonument)}
        onClose={() => setSelectedMonument(null)}
        onHome={onNavigate ? () => {
          setSelectedMonument(null);
          onNavigate('/');
        } : undefined}
      />
    </div>
  );
};
