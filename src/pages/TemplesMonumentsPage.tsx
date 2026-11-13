import React, { useState, useEffect } from 'react';
import { TempleMonument, LanguageCode } from '../types';
import { Landmark, MapPin, Calendar, ShieldCheck, BookOpen, ArrowRight, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { getCanonicalMonuments } from '../data/archivalSeedData';
import { getArticleByIdOrSlug } from '../data/articlesRepository';
import { ArticleDetailView } from '../components/ArticleDetailView';

interface TemplesMonumentsPageProps {
  onNavigate?: (path: string) => void;
}

const MONUMENTS_MODAL_UI: Record<
  LanguageCode,
  {
    verificationStatus: string;
    locationStateLabel: string;
    periodLabel: string;
    significanceLabel: string;
    sourceTypeLabel: string;
    detailsBtn: string;
  }
> = {
  en: {
    verificationStatus: 'Documented Architectural Monument',
    locationStateLabel: 'Location & State',
    periodLabel: 'Historical Period',
    significanceLabel: 'Historical & Architectural Significance',
    sourceTypeLabel: 'Architectural & Epigraphic Source',
    detailsBtn: 'Details'
  },
  hi: {
    verificationStatus: 'प्रमाणित स्थापत्य स्मारक',
    locationStateLabel: 'स्थान एवं राज्य',
    periodLabel: 'ऐतिहासिक काल',
    significanceLabel: 'ऐतिहासिक एवं स्थापत्य महत्त्व',
    sourceTypeLabel: 'स्थापत्य एवं अभिलेखीय स्रोत',
    detailsBtn: 'विवरण'
  },
  te: {
    verificationStatus: 'ధృవీకరించబడిన వాస్తుశిల్ప స్మారకం',
    locationStateLabel: 'ప్రదేశం & రాష్ట్రం',
    periodLabel: 'చారిత్రక కాలం',
    significanceLabel: 'చారిత్రక & వాస్తుశిల్ప ప్రాముఖ్యత',
    sourceTypeLabel: 'వాస్తుశిల్ప & శాసన ఆధారం',
    detailsBtn: 'వివరాలు'
  },
  kn: {
    verificationStatus: 'ದಾಖಲಿತ ವಾಸ್ತುಶಿಲ್ಪ ಸ್ಮಾರಕ',
    locationStateLabel: 'ಸ್ಥಳ ಮತ್ತು ರಾಜ್ಯ',
    periodLabel: 'ಐತಿಹಾಸಿಕ ಕಾಲ',
    significanceLabel: 'ಐತಿಹಾಸಿಕ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪದ ಮಹತ್ವ',
    sourceTypeLabel: 'ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಶಾಸನ ಆಕರ',
    detailsBtn: 'ವಿವರಗಳು'
  },
  ta: {
    verificationStatus: 'ஆவணப்படுத்தப்பட்ட கட்டிடக்கலை நினைவுச்சின்னம்',
    locationStateLabel: 'இடம் மற்றும் மாநிலம்',
    periodLabel: 'வரலாற்று காலம்',
    significanceLabel: 'வரலாற்று மற்றும் கட்டிடக்கலை முக்கியத்துவம்',
    sourceTypeLabel: 'கட்டிடக்கலை மற்றும் கல்வெட்டு ஆதாரம்',
    detailsBtn: 'விவரங்கள்'
  },
  mr: {
    verificationStatus: 'दस्तऐवजीकृत स्थापत्य स्मारक',
    locationStateLabel: 'ठिकाण आणि राज्य',
    periodLabel: 'ऐतिहासिक काळ',
    significanceLabel: 'ऐतिहासिक आणि स्थापत्य महत्त्व',
    sourceTypeLabel: 'स्थापत्य आणि शिलालेखीय स्रोत',
    detailsBtn: 'तपशील'
  },
  or: {
    verificationStatus: 'ପ୍ରମାଣିତ ସ୍ଥାପତ୍ୟ ସ୍ମାରକୀ',
    locationStateLabel: 'ସ୍ଥାନ ଓ ରାଜ୍ୟ',
    periodLabel: 'ଐତିହାସିକ ସମୟ',
    significanceLabel: 'ଐତିହାସିକ ଓ ସ୍ଥାପତ୍ୟ ମହତ୍ତ୍ୱ',
    sourceTypeLabel: 'ସ୍ଥାପତ୍ୟ ଓ ଶିଳାଲେଖ ଉତ୍ସ',
    detailsBtn: 'ବିବରଣୀ'
  },
  bn: {
    verificationStatus: 'নথিভুক্ত স্থাপত্য স্মৃতিস্তম্ভ',
    locationStateLabel: 'স্থান ও রাজ্য',
    periodLabel: 'ঐতিহাসিক সময়কাল',
    significanceLabel: 'ঐতিহাসিক ও স্থাপত্য গুরুত্ব',
    sourceTypeLabel: 'স্থাপত্য ও শিলালিপি উৎস',
    detailsBtn: 'বিস্তারিত'
  }
};

const MONUMENT_RECORD_ID_MAP: Record<string, string> = {
  mon_meghanada_pacheri: 'TM-0001',
  mon_konark_sun: 'TM-0002',
  mon_draksharama_mandapa: 'TM-0003',
  mon_kolletikota_peddintlamma: 'TM-0004'
};

export const TemplesMonumentsPage: React.FC<TemplesMonumentsPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const ui = MONUMENTS_MODAL_UI[language] || MONUMENTS_MODAL_UI.en;
  const [monuments, setMonuments] = useState<TempleMonument[]>(() => getCanonicalMonuments(language));
  const [selectedMonument, setSelectedMonument] = useState<TempleMonument | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check URL query parameters on mount to support direct linking: ?article=TM-0001..TM-0004 or ?id=mon_*
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const param = (params.get('article') || params.get('id') || '').trim();
      const lower = param.toLowerCase();
      if (
        lower === 'tm-0001' ||
        lower === 'tm_0001' ||
        lower === 'mon_meghanada_pacheri' ||
        lower === 'meghanada-pacheri-fortress-wall-puri-jagannatha'
      ) {
        setSelectedArticleId('mon_meghanada_pacheri');
      } else if (
        lower === 'tm-0002' ||
        lower === 'tm_0002' ||
        lower === 'mon_konark_sun' ||
        lower === 'sun-temple-of-konark-arka-kshetra'
      ) {
        setSelectedArticleId('mon_konark_sun');
      } else if (
        lower === 'tm-0003' ||
        lower === 'tm_0003' ||
        lower === 'mon_draksharama_mandapa' ||
        lower === 'draksharama-sri-bhimeswara-swamy-temple-pancharama-kshetra'
      ) {
        setSelectedArticleId('mon_draksharama_mandapa');
      } else if (
        lower === 'tm-0004' ||
        lower === 'tm_0004' ||
        lower === 'mon_kolletikota_peddintlamma' ||
        lower === 'sri-kolletikota-peddintlamma-temple-aquatic-fortress-kolleru'
      ) {
        setSelectedArticleId('mon_kolletikota_peddintlamma');
      }
    } catch {
      // Ignore
    }
  }, []);

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

  const selectedArticle = selectedArticleId ? getArticleByIdOrSlug(selectedArticleId, language) : null;

  if (selectedArticle) {
    return (
      <ArticleDetailView
        article={selectedArticle}
        onBack={() => {
          setSelectedArticleId(null);
          try {
            const cleanParams = new URLSearchParams(window.location.search);
            cleanParams.delete('article');
            cleanParams.delete('id');
            const cleanQuery = cleanParams.toString();
            const cleanUrl = `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ''}${window.location.hash || ''}`;
            window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
          } catch {
            // Ignore
          }
        }}
        onSelectArticle={(nextArt) => {
          setSelectedArticleId(nextArt.id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigate={onNavigate}
        basePath="/monuments"
      />
    );
  }

  const buildMonumentModalItem = (mon: TempleMonument | null): ContentDetailItem | null => {
    if (!mon) return null;
    const tmRecordId = MONUMENT_RECORD_ID_MAP[mon.id];

    return {
      id: mon.id,
      title: mon.name,
      subtitle: `${mon.location}, ${mon.state}`,
      badge: mon.century,
      verificationStatus: ui.verificationStatus,
      imageUrl: mon.image_url,
      imageLayout: 'banner',
      metadata: [
        { label: ui.locationStateLabel, value: `${mon.location}, ${mon.state}` },
        { label: t.monuments.patronLabel || 'Patron Ruler / Authority', value: mon.patron_ruler },
        { label: t.monuments.styleLabel || 'Architectural Style', value: mon.architectural_style },
        { label: ui.periodLabel, value: mon.century }
      ],
      fullText: mon.historical_significance,
      fullTextLabel: ui.significanceLabel,
      sources: (mon.sources || []).map(src => ({
        title: src,
        type: ui.sourceTypeLabel
      })),
      actionButton: tmRecordId ? {
        label: language === 'te' ? `పూర్తి పరిశోధనా పత్రం చదవండి [${tmRecordId}]` :
               language === 'or' ? `ସମ୍ପୂର୍ଣ୍ଣ ଗବେଷଣାତ୍ମକ ମୋନୋଗ୍ରାଫ୍ ପଢ଼ନ୍ତୁ [${tmRecordId}]` :
               language === 'hi' ? `संपूर्ण शोध प्रबंध पढ़ें [${tmRecordId}]` :
               language === 'kn' ? `ಸಂಪೂರ್ಣ ಸಂಶೋಧನಾ ಪ್ರಬಂಧ ಓದಿ [${tmRecordId}]` :
               language === 'ta' ? `முழுமையான ஆய்வு நூலைப் படிக்க [${tmRecordId}]` :
               language === 'mr' ? `संपूर्ण संशोधन प्रबंध वाचा [${tmRecordId}]` :
               language === 'bn' ? `সম্পূর্ণ গবেষণা গ্রন্থ পড়ুন [${tmRecordId}]` :
               `Read Complete Historical Monograph [${tmRecordId}]`,
        onClick: () => {
          setSelectedMonument(null);
          setSelectedArticleId(mon.id);
        }
      } : undefined
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-[#292521]">
      {/* Header */}
      <div className="border-b border-[#D8C3A2] pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#76501F] font-royal-heading">
          <Landmark className="w-4 h-4 text-[#A87924]" />
          <span>{t.monuments.badge}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#54351F]">
          {t.monuments.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5948] max-w-3xl leading-relaxed">
          {t.monuments.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monuments.map(mon => {
          const tmRecordId = MONUMENT_RECORD_ID_MAP[mon.id];
          return (
            <div
              key={mon.id}
              onClick={() => {
                if (tmRecordId) {
                  setSelectedArticleId(mon.id);
                } else {
                  setSelectedMonument(mon);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (tmRecordId) {
                    setSelectedArticleId(mon.id);
                  } else {
                    setSelectedMonument(mon);
                  }
                }
              }}
              className="rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] hover:border-[#A87924] overflow-hidden shadow-md flex flex-col justify-between group transition-all cursor-pointer hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden relative bg-[#EFE3D0]">
                <img
                  src={mon.image_url}
                  alt={mon.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#54351F]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#D8C3A2]/50 shadow-sm">
                    {tmRecordId || (mon.id.startsWith('km_') ? mon.id.toUpperCase().replace('KM_', 'KM-') : 'TM')}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#762D35] px-3 py-1 rounded-full border border-[#A87924]">
                    {mon.century}
                  </span>
                </div>
              </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-[#76501F] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#A87924]" />
                  <span>{mon.location}, {mon.state}</span>
                </div>

                <h3 className="font-royal-heading font-bold text-lg text-[#54351F] group-hover:text-[#762D35] transition-colors leading-tight">
                  {mon.name}
                </h3>

                <div className="text-xs text-[#6B5948]">
                  <span className="text-[#54351F] font-semibold">{t.monuments.patronLabel}:</span> {mon.patron_ruler}
                </div>

                <div className="text-xs text-[#6B5948]">
                  <span className="text-[#54351F] font-semibold">{t.monuments.styleLabel}:</span> {mon.architectural_style}
                </div>

                <p className="text-xs text-[#292521] leading-relaxed pt-2 border-t border-[#D8C3A2]">
                  {mon.historical_significance}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D8C3A2] text-[11px] text-[#6B5948] flex items-center justify-between gap-2">
                <span className="truncate"><span className="font-medium text-[#54351F]">{t.monuments.sourcesLabel}:</span> {mon.sources.join('; ')}</span>
                <span className="text-[#76501F] font-semibold shrink-0 flex items-center gap-1">
                  <span>{ui.detailsBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        );
      })}
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
