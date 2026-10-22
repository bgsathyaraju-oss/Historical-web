import React, { useState, useEffect } from 'react';
import { HistoricalEvent } from '../types';
import { Calendar, Scroll, BookOpen, AlertCircle } from 'lucide-react';
import { TimelineViewer } from '../components/TimelineViewer';
import { ArticleActionBar } from '../components/ArticleActionBar';
import { useLanguage } from '../context/LanguageContext';

interface HistoricalTimelinePageProps {
  onNavigate?: (path: string) => void;
}

export const HistoricalTimelinePage: React.FC<HistoricalTimelinePageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/content/timeline?lang=${language}`)
      .then(r => r.json())
      .then(d => setEvents(d.events || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [language]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Calendar className="w-4 h-4" />
          <span>{t.timeline.badge}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {t.timeline.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {t.timeline.subtitle}
        </p>
      </div>

      {/* Global Page Action Bar with Home, Close, and 8-Language Switcher */}
      <ArticleActionBar
        onHome={onNavigate ? () => onNavigate('/') : undefined}
        onClose={onNavigate ? () => onNavigate('/') : undefined}
        title={t.timeline.title}
        badge="Chronology"
        showLanguages={true}
      />

      <TimelineViewer events={events} />
    </div>
  );
};

