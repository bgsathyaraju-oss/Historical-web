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
    verificationStatus: string;
  }
> = {
  en: {
    dateLabel: 'Chronological Date',
    epochLabel: 'Historical Epoch',
    devLabel: 'Political & Historical Development',
    viewDossierBtn: 'View Complete Chronological Dossier',
    verificationStatus: 'Documented Chronological Record'
  },
  hi: {
    dateLabel: 'कालानुक्रमिक तिथि',
    epochLabel: 'ऐतिहासिक युग',
    devLabel: 'राजनीतिक एवं ऐतिहासिक विकास',
    viewDossierBtn: 'संपूर्ण कालानुक्रमिक विवरण देखें',
    verificationStatus: 'प्रमाणित कालानुक्रमिक अभिलेख'
  },
  te: {
    dateLabel: 'చారిత్రక తేదీ / కాలం',
    epochLabel: 'చారిత్రక యుగం',
    devLabel: 'రాజకీయ & చారిత్రక పరిణామం',
    viewDossierBtn: 'పూర్తి చారిత్రక వివరాలు చూడండి',
    verificationStatus: 'ధృవీకరించబడిన చారిత్రక కాలక్రమ రికార్డు'
  },
  kn: {
    dateLabel: 'ಕಾಲಾನುಕ್ರಮ ದಿನಾಂಕ',
    epochLabel: 'ಐತಿಹಾಸಿಕ ಯುಗ',
    devLabel: 'ರಾಜಕೀಯ ಮತ್ತು ಐತಿಹಾಸಿಕ ಬೆಳವಣಿಗೆ',
    viewDossierBtn: 'ಸಂಪೂರ್ಣ ಕಾಲಾನುಕ್ರಮ ವಿವರ ನೋಡಿ',
    verificationStatus: 'ದಾಖಲಿತ ಕಾಲಾನುಕ್ರಮ ದಾಖಲೆ'
  },
  ta: {
    dateLabel: 'காலவரிசைத் தேதி',
    epochLabel: 'வரலாற்று சகாப்தம்',
    devLabel: 'அரசியல் மற்றும் வரலாற்று வளர்ச்சி',
    viewDossierBtn: 'முழு காலவரிசை ஆவணம் காண்க',
    verificationStatus: 'ஆவணப்படுத்தப்பட்ட காலவரிசைப் பதிவு'
  },
  mr: {
    dateLabel: 'कालानुक्रमिक तारीख',
    epochLabel: 'ऐतिहासिक युग',
    devLabel: 'राजकीय आणि ऐतिहासिक घडामोडी',
    viewDossierBtn: 'संपूर्ण कालानुक्रमिक तपशील पहा',
    verificationStatus: 'दस्तऐवजीकृत कालानुक्रमिक नोंद'
  },
  or: {
    dateLabel: 'କାଳକ୍ରମିକ ସମୟ',
    epochLabel: 'ଐତିହାସିକ ଯୁଗ',
    devLabel: 'ରାଜନୈତିକ ଓ ଐତିହାସିକ ଘଟଣାକ୍ରମ',
    viewDossierBtn: 'ସମ୍ପୂର୍ଣ୍ଣ କାଳକ୍ରମିକ ବିବରଣୀ ଦେଖନ୍ତୁ',
    verificationStatus: 'ପ୍ରମାଣିତ କାଳକ୍ରମିକ ଅଭିଲେଖ'
  },
  bn: {
    dateLabel: 'কালানুক্রমিক তারিখ',
    epochLabel: 'ঐতিহাসিক যুগ',
    devLabel: 'রাজনৈতিক ও ঐতিহাসিক বিকাশ',
    viewDossierBtn: 'সম্পূর্ণ কালানুক্রমিক বিবরণ দেখুন',
    verificationStatus: 'নথিভুক্ত কালানুক্রমিক রেকর্ড'
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

  const getEventImage = (item: HistoricalEvent) => {
    const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
    const eventImgMap: Record<string, string> = {
      ev_kalinga_war_261bce: `${base}kalinga_war_daya_river.jpg`,
      ev_kharavela_1st_bce: `${base}hathigumpha_inscription.jpg`,
      ev_jasma_devi_1120: `${base}jasma_devi_sahasralinga.jpg`,
      ev_siddharameshwara_1150: `${base}shivayogi_siddharama_solapur.jpg`,
      ev_konark_1250: `${base}konark_sun_temple_structure.jpg`,
      ev_1434: `${base}kapilendra_deva_portrait.jpg`,
      ev_kapilendra_coronation_1435: `${base}kapilendra_deva_portrait.jpg`,
      ev_1448: `${base}kondavidu_fort_hills.jpg`,
      ev_kolletikota_gajapathi_garrison: `${base}kolleru_lake_fortress.jpg`,
      ev_1458: `${base}copper_plate_charter.jpg`,
      ev_veligalani_1458: `${base}copper_plate_charter.jpg`,
      ev_1464: `${base}srirangam_temple.jpg`,
      ev_srirangam_1464: `${base}srirangam_temple.jpg`,
      ev_purushottama_1467: `${base}purushottama_deva.jpg`,
      ev_1489: `${base}purushottama_deva.jpg`,
      ev_prataparudra_1497: `${base}prataparudra_deva.jpg`,
      ev_1515: `${base}simhachalam_temple_architecture.jpg`,
      ev_1568: `${base}mukunda_deva_barabati.jpg`,
      ev_mukunda_1559: `${base}mukunda_deva_barabati.jpg`
    };
    return eventImgMap[item.id] || `${base}barabati_fort_gateway.jpg`;
  };

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
      verificationStatus: ui.verificationStatus,
      imageUrl: getEventImage(item),
      imageLayout: 'banner',
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2]">
        <div>
          <h3 className="font-royal-heading font-bold text-base text-[#54351F]">
            {t.timeline.title}
          </h3>
          <p className="text-xs text-[#6B5948]">
            {t.timeline.subtitle}
          </p>
        </div>
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder={t.timeline.filterPlaceholder}
          className="w-full sm:w-72 px-3 py-1.5 text-xs rounded-lg bg-[#FFFFFF] text-[#292521] placeholder-[#6B5948] border border-[#D8C3A2] focus:outline-none focus:border-[#A87924]"
        />
      </div>

      {/* Interactive Timeline Stream */}
      <div className="relative border-l-2 border-[#A87924]/50 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
        {filteredEvents.map((item, idx) => {
          const thumbUrl = getEventImage(item);
          return (
          <div key={item.id || idx} className="relative group">
            {/* Timeline Dot Marker */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#762D35] border-2 border-[#A87924] shadow-sm flex items-center justify-center group-hover:scale-125 transition-transform">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFFCF5]" />
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
              className="p-5 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] hover:border-[#A87924] hover:bg-[#FFF9EF] transition-all cursor-pointer shadow-sm"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start mb-3">
                <img
                  src={thumbUrl}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = '1';
                      target.src = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/barabati_fort_gateway.jpg`;
                    }
                  }}
                  className="w-full sm:w-28 h-32 sm:h-24 rounded-xl object-cover object-center shrink-0 border border-[#A87924]/50 bg-[#EFE3D0]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#54351F] bg-[#EFE3D0] px-3 py-1 rounded-full border border-[#A87924]/50 w-fit">
                      <Calendar className="w-3.5 h-3.5 text-[#A87924]" />
                      {item.year_text} ({item.period})
                    </span>
                    <span className="text-xs text-[#6B5948] font-medium">
                      {t.timeline.rulerLabel}: <strong className="text-[#54351F]">{item.rulers_involved}</strong>
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-[#54351F] font-royal-heading mb-1.5 group-hover:text-[#762D35] transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#292521] leading-relaxed">
                    {item.political_development}
                  </p>
                </div>
              </div>

              {/* Inscriptions / Monuments Pill */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B5948] mb-2">
                <span className="text-[#54351F] font-semibold">{t.timeline.evidenceLabel}:</span>
                <span className="px-2 py-0.5 rounded bg-[#EFE3D0] border border-[#D8C3A2] text-[#292521]">
                  {item.monuments_inscriptions}
                </span>
              </div>

              {/* Uncertainty Notes & Primary Sources */}
              <div className="mt-3 pt-3 border-t border-[#D8C3A2] grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2 text-[#292521]">
                  <BookOpen className="w-4 h-4 text-[#A87924] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#54351F] font-semibold">{t.timeline.citationsLabel}:</span>
                    <p className="text-[#6B5948]">{item.primary_sources}</p>
                  </div>
                </div>

                {item.uncertainty_notes && (
                  <div className="flex items-start gap-2 text-[#292521] bg-[#FDF6E7] p-2 rounded-lg border border-[#A87924]/50">
                    <AlertCircle className="w-4 h-4 text-[#A87924] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#54351F] font-semibold">{t.timeline.methodologyLabel}:</span>
                      <p className="text-[#292521] text-[11px] leading-snug">{item.uncertainty_notes}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-2 flex justify-end">
                <span className="text-[11px] font-bold text-[#762D35] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{ui.viewDossierBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {/* Detailed Timeline Event Modal */}
      <ContentDetailModal
        item={buildEventModalItem(selectedEvent)}
        onClose={() => setSelectedEventId(null)}
      />
    </div>
  );
};
