import React, { useState, useEffect } from 'react';
import { TempleMonument } from '../types';
import { Landmark, MapPin, Calendar, ShieldCheck, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TemplesMonumentsPageProps {
  onNavigate?: (path: string) => void;
}

export const TemplesMonumentsPage: React.FC<TemplesMonumentsPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const [monuments, setMonuments] = useState<TempleMonument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/content/monuments?lang=${language}`)
      .then(r => r.json())
      .then(d => setMonuments(d.monuments || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [language]);

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
            className="rounded-3xl bg-[#121622] border border-stone-800 hover:border-[#c99738]/60 overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
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

              <div className="pt-3 border-t border-stone-800/80 text-[11px] text-stone-500">
                <span className="font-medium text-stone-400">{t.monuments.sourcesLabel}:</span> {mon.sources.join('; ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
