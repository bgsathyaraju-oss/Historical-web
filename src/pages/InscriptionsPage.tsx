import React, { useState, useEffect } from 'react';
import { InscriptionRecord } from '../types';
import { Scroll } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCanonicalInscriptions } from '../data/archivalSeedData';
import { HistoricalRecordsExplorer } from '../components/HistoricalRecordDetailView';

interface InscriptionsPageProps {
  onNavigate?: (path: string) => void;
  initialInscriptionId?: string | null;
}

export const InscriptionsPage: React.FC<InscriptionsPageProps> = ({ onNavigate, initialInscriptionId }) => {
  const { t, language } = useLanguage();
  const [inscriptions, setInscriptions] = useState<InscriptionRecord[]>(() => getCanonicalInscriptions(language));

  useEffect(() => {
    const localList = getCanonicalInscriptions(language);
    setInscriptions(localList);

    fetch(`/api/content/inscriptions?lang=${language}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.inscriptions && d.inscriptions.length > 0) {
          setInscriptions(d.inscriptions);
        }
      })
      .catch(() => {});
  }, [language]);

  const isHistoricalRecordsRoute =
    typeof window !== 'undefined' && window.location.pathname.includes('historical-records');

  return (
    <HistoricalRecordsExplorer
      defaultCategory={isHistoricalRecordsRoute ? 'all' : 'inscriptions'}
      basePath={isHistoricalRecordsRoute ? '/historical-records' : '/inscriptions'}
      initialRecordId={initialInscriptionId}
      onNavigate={onNavigate}
      externalInscriptions={inscriptions}
      pageBadge={t.inscriptions.badge}
      pageTitle={t.inscriptions.title}
      pageSubtitle={t.inscriptions.subtitle}
      headerIcon={<Scroll className="w-4 h-4" />}
    />
  );
};

