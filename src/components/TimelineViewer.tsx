import React, { useState } from 'react';
import { HistoricalEvent, LanguageCode } from '../types';
import { Calendar, AlertCircle, BookOpen, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ContentDetailModal, ContentDetailItem } from './ContentDetailModal';

interface TimelineViewerProps {
  events: HistoricalEvent[];
}

const TIMELINE_VIEWER_UI: Record<
  LanguageCode,
  {
    dateLabel: string;
    epochLabel: string;
    devLabel: string;
    viewDossierBtn: string;
  }
> = {
  en: {
    dateLabel: 'Chronological Date',
    epochLabel: 'Historical Epoch',
    devLabel: 'Political & Historical Development',
    viewDossierBtn: 'View Complete Chronological Dossier'
  },
  hi: {
    dateLabel: 'कालानुक्रमिक तिथि',
    epochLabel: 'ऐतिहासिक युग',
    devLabel: 'राजनीतिक एवं ऐतिहासिक विकास',
    viewDossierBtn: 'संपूर्ण कालानुक्रमिक विवरण देखें'
  },
  te: {
    dateLabel: 'చారిత్రక తేదీ / కాలం',
    epochLabel: 'చారిత్రక యుగం',
    devLabel: 'రాజకీయ & చారిత్రక పరిణామం',
    viewDossierBtn: 'పూర్తి చారిత్రక వివరాలు చూడండి'
  },
  kn: {
    dateLabel: 'ಕಾಲಾನುಕ್ರಮ ದಿನಾಂಕ',
    epochLabel: 'ಐತಿಹಾಸಿಕ ಯುಗ',
    devLabel: 'ರಾಜಕೀಯ ಮತ್ತು ಐತಿಹಾಸಿಕ ಬೆಳವಣಿಗೆ',
    viewDossierBtn: 'ಸಂಪೂರ್ಣ ಕಾಲಾನುಕ್ರಮ ವಿವರ ನೋಡಿ'
  },
  ta: {
    dateLabel: 'காலவரிசைத் தேதி',
    epochLabel: 'வரலாற்று சகாப்தம்',
    devLabel: 'அரசியல் மற்றும் வரலாற்று வளர்ச்சி',
    viewDossierBtn: 'முழு காலவரிசை ஆவணம் காண்க'
  },
  mr: {
    dateLabel: 'कालानुक्रमिक तारीख',
    epochLabel: 'ऐतिहासिक युग',
    devLabel: 'राजकीय आणि ऐतिहासिक घडामोडी',
    viewDossierBtn: 'संपूर्ण कालानुक्रमिक तपशील पहा'
  },
  or: {
    dateLabel: 'କାଳକ୍ରମିକ ସମୟ',
    epochLabel: 'ଐତିହାସିକ ଯୁଗ',
    devLabel: 'ରାଜନୈତିକ ଓ ଐତିହାସିକ ଘଟଣାକ୍ରମ',
    viewDossierBtn: 'ସମ୍ପୂର୍ଣ୍ଣ କାଳକ୍ରମିକ ବିବରଣୀ ଦେଖନ୍ତୁ'
  },
  bn: {
    dateLabel: 'কালানুক্রমিক তারিখ',
    epochLabel: 'ঐতিহাসিক যুগ',
    devLabel: 'রাজনৈতিক ও ঐতিহাসিক বিকাশ',
    viewDossierBtn: 'সম্পূর্ণ কালানুক্রমিক বিবরণ দেখুন'
  }
};

export const TimelineViewer: React.FC<TimelineViewerProps> = ({ events }) => {
  const { t, language } = useLanguage();
  const ui = TIMELINE_VIEWER_UI[language] || TIMELINE_VIEWER_UI.en;
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const selectedEvent = selectedEventId ? events.find(e => e.id === selectedEventId) || null : null;

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    e.year_text.toLowerCase().includes(searchFilter.toLowerCase()) ||
    e.rulers_involved.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const buildEventModalItem = (item: HistoricalEvent | null): ContentDetailItem | null => {
    if (!item) return null;
    const sections: NonNullable<ContentDetailItem['sections']> = [
      {
        heading: t.timeline.evidenceLabel || 'Corroborating Monuments & Inscriptions',
        type: 'text',
        content: item.monuments_inscriptions
      }
    ];
    if (item.uncertainty_notes) {
      sections.push({
        heading: t.timeline.methodologyLabel || 'Historiographical & Methodological Notes',
        type: 'quote',
        content: item.uncertainty_notes
      });
    }
    return {
      id: item.id,
      title: item.title,
      subtitle: `${t.timeline.rulerLabel}: ${item.rulers_involved}`,
      badge: `${item.year_text} • ${item.period}`,
      verificationStatus: 'Documented Chronological Record',
      metadata: [
        { label: ui.dateLabel, value: item.year_text },
        { label: ui.epochLabel, value: item.period },
        { label: t.timeline.rulerLabel || 'Rulers Involved', value: item.rulers_involved }
      ],
      fullText: item.political_development,
      fullTextLabel: ui.devLabel,
      sections,
      sources: item.primary_sources
        ? item.primary_sources.split(';').map(s => s.trim()).filter(Boolean).map(src => ({
            title: src,
            type: t.timeline.citationsLabel || 'Primary Historical Source'
          }))
        : []
    };
  };

  return (
    <div className="w-full space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#121622] border border-stone-800">
        <div>
          <h3 className="font-royal-heading font-bold text-base text-[#fcedc7]">
            {t.timeline.title}
          </h3>
          <p className="text-xs text-stone-400">
            {t.timeline.subtitle}
          </p>
        </div>
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder={t.timeline.filterPlaceholder}
          className="w-full sm:w-72 px-3 py-1.5 text-xs rounded-lg bg-[#192030] text-stone-200 border border-stone-700 focus:outline-none focus:border-[#c99738]"
        />
      </div>

      {/* Interactive Timeline Stream */}
      <div className="relative border-l-2 border-[#c99738]/40 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
        {filteredEvents.map((item, idx) => (
          <div key={item.id || idx} className="relative group">
            {/* Timeline Dot Marker */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#580014] border-2 border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)] flex items-center justify-center group-hover:scale-125 transition-transform">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            </div>

            {/* Event Card */}
            <div
              onClick={() => setSelectedEventId(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedEventId(item.id);
                }
              }}
              className="p-5 rounded-2xl bg-[#131724] border border-stone-800/90 hover:border-[#c99738]/60 hover:bg-[#181e2e] transition-all cursor-pointer shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e8c872] bg-[#2a1b12] px-3 py-1 rounded-full border border-[#c99738]/40 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  {item.year_text} ({item.period})
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {t.timeline.rulerLabel}: <strong className="text-stone-200">{item.rulers_involved}</strong>
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-stone-100 font-royal-heading mb-2 group-hover:text-[#fcedc7] transition-colors">
                {item.title}
              </h4>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-3">
                {item.political_development}
              </p>

              {/* Inscriptions / Monuments Pill */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 mb-2">
                <span className="text-stone-500 font-medium">{t.timeline.evidenceLabel}:</span>
                <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                  {item.monuments_inscriptions}
                </span>
              </div>

              {/* Uncertainty Notes & Primary Sources */}
              <div className="mt-3 pt-3 border-t border-stone-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2 text-stone-400">
                  <BookOpen className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-300 font-semibold">{t.timeline.citationsLabel}:</span>
                    <p className="text-stone-400">{item.primary_sources}</p>
                  </div>
                </div>

                {item.uncertainty_notes && (
                  <div className="flex items-start gap-2 text-stone-400 bg-amber-950/20 p-2 rounded-lg border border-amber-900/40">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-amber-300 font-semibold">{t.timeline.methodologyLabel}:</span>
                      <p className="text-amber-200/80 text-[11px] leading-snug">{item.uncertainty_notes}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-2 flex justify-end">
                <span className="text-[11px] font-semibold text-[#e8c872] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{ui.viewDossierBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Timeline Event Modal */}
      <ContentDetailModal
        item={buildEventModalItem(selectedEvent)}
        onClose={() => setSelectedEventId(null)}
      />
    </div>
  );
};
