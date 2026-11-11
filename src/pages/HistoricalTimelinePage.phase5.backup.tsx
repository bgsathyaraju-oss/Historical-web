import React, { useState, useEffect } from 'react';
import { HistoricalEvent } from '../types';
import { Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCanonicalTimelineEvents } from '../data/archivalSeedData';
import { HistoricalRecordsExplorer } from '../components/HistoricalRecordDetailView';

interface HistoricalTimelinePageProps {
  onNavigate?: (path: string) => void;
  initialEventId?: string | null;
}

export const HistoricalTimelinePage: React.FC<HistoricalTimelinePageProps> = ({ onNavigate, initialEventId }) => {
  const { t, language } = useLanguage();
  const [events, setEvents] = useState<HistoricalEvent[]>(() => getCanonicalTimelineEvents(language));

  useEffect(() => {
    setEvents(getCanonicalTimelineEvents(language));
    fetch(`/api/content/timeline?lang=${language}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.events && d.events.length > 0) setEvents(d.events);
      })
      .catch(() => {});
  }, [language]);

  return (
    <HistoricalRecordsExplorer
      defaultCategory="timeline"
      basePath="/timeline"
      initialRecordId={initialEventId}
      onNavigate={onNavigate}
      externalEvents={events}
      pageBadge={t.timeline.badge}
      pageTitle={t.timeline.title}
      pageSubtitle={t.timeline.subtitle}
      headerIcon={<Calendar className="w-4 h-4" />}
    />
  );
};


