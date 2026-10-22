import React, { useState, useEffect } from 'react';
import { HistoricalLocation } from '../types';
import { Compass, MapPin, Landmark, ShieldCheck, Info, ExternalLink, Layers, Navigation, ArrowRight } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ArticleActionBar } from '../components/ArticleActionBar';
import { useLanguage } from '../context/LanguageContext';
import {
  GEOGRAPHICAL_SPREAD,
  GeographicalSpreadRegion
} from '../data/historyContent';

interface HistoricalMapsPageProps {
  onNavigate: (path: string) => void;
}

export const HistoricalMapsPage: React.FC<HistoricalMapsPageProps> = ({ onNavigate }) => {
  const { language, translateText, getMetadataLabel } = useLanguage();
  const [locations, setLocations] = useState<HistoricalLocation[]>([]);
  const [activeView, setActiveView] = useState<'cartography' | 'corridors'>('cartography');
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [selectedCorridor, setSelectedCorridor] = useState<GeographicalSpreadRegion>(GEOGRAPHICAL_SPREAD[0]);

  useEffect(() => {
    fetch('/api/content/locations')
      .then(res => res.json())
      .then(data => {
        setLocations(data.locations || []);
      })
      .catch(console.error);
  }, []);

  const regions = ['All', 'Odra', 'Utkala', 'Kalinga', 'Deccan & South'];

  const filteredLocations = locations.filter(loc =>
    activeRegion === 'All' || loc.region.toLowerCase() === activeRegion.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Compass className="w-4 h-4" />
          <span>{translateText('maps', 'Historical Cartography & Archaeological Geography')}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {language === 'te'
            ? 'చారిత్రక నక్షాలు, కోటలు మరియు అఖిల భారత భౌగోళిక విస్తరణ'
            : language === 'hi'
            ? 'ऐतिहासिक मानचित्र, दुर्ग एवं अखिल भारतीय भौगोलिक प्रसार'
            : language === 'or'
            ? 'ଐତିହାସିକ ମାନଚିତ୍ର, ଦୁର୍ଗ ଓ ସର୍ବଭାରତୀୟ ଭୌଗୋଳିକ ବିସ୍ତାର'
            : language === 'kn'
            ? 'ಐತಿಹಾಸಿಕ ನಕ್ಷೆಗಳು, ಕೋಟೆಗಳು ಮತ್ತು ಅಖಿಲ ಭಾರತೀಯ ಭೌಗೋಳಿಕ ಹರಡುವಿಕೆ'
            : language === 'ta'
            ? 'வரலாற்று வரைபடங்கள், கோட்டைகள் மற்றும் அகில இந்திய புவியியல் பரவல்'
            : language === 'mr'
            ? 'ऐतिहासिक नकाशे, किल्ले आणि अखिल भारतीय भौगोलिक विस्तार'
            : language === 'bn'
            ? 'ঐতিহাসিক মানচিত্র, দুর্গ ও সর্বভারতীয় ভৌগোলিক বিস্তার'
            : 'Historical Maps, Fortresses & Pan-Indian Corridors'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {language === 'te'
            ? 'శాసన ఆధారిత సరిహద్దులు మరియు ఓడ్-రాజ్‌పుత్, ఓడ్-క్షత్రియ, ఒడ్డే, వడ్డెరాజులు, వడ్డార్ సమాజాల 7 ప్రధాన అఖిల భారత వలస మార్గాలు.'
            : language === 'hi'
            ? 'अभिलेखीय सीमाएं एवं ओड-राजपूत, ओड-क्षत्रिय, वड्डेराजुलु, वड्डार समाजों के ७ प्रमुख अखिल भारतीय प्रवास गलियारे।'
            : 'Epigraphic boundary models and comprehensive geographical corridors of the Oad-Rajput, Od-Kshatriya, Odde, VaddeRajulu, and Waddar communities across 7 historic regional zones.'}
        </p>
      </div>

      {/* Global Page Action Bar with Home, Close, and 8-Language Switcher */}
      <ArticleActionBar
        onHome={() => onNavigate('/')}
        onClose={() => onNavigate('/')}
        title="Historical Maps & Pan-Indian Spreading"
        badge="Cartography"
        showLanguages={true}
      />

      {/* Primary View Switcher */}
      <div className="flex items-center gap-3 border-b border-stone-800 pb-3">
        <button
          onClick={() => setActiveView('cartography')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeView === 'cartography'
              ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37] shadow-lg shadow-[#580014]/40'
              : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
          }`}
        >
          <Layers className="w-4 h-4 text-[#d4af37]" />
          <span>1. Imperial Frontiers & Citadels (1465 CE)</span>
        </button>

        <button
          onClick={() => setActiveView('corridors')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeView === 'corridors'
              ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37] shadow-lg shadow-[#580014]/40'
              : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
          }`}
        >
          <Navigation className="w-4 h-4 text-[#d4af37]" />
          <span>2. Pan-Indian Community Spreading (7 Corridors)</span>
        </button>
      </div>

      {activeView === 'cartography' ? (
        <>
          {/* Cartographic Reconstruction Display */}
          <div className="rounded-3xl bg-[#121622] border border-[#c99738]/40 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                  Corroborated Reconstruction (c. 1465 CE)
                </span>
                <h2 className="font-royal-heading font-bold text-xl sm:text-2xl text-[#fcedc7] mt-0.5">
                  Territorial Extent of Suryavamsha Gajapathi Empire
                </h2>
              </div>
              <div className="p-2 px-3 rounded-lg bg-amber-950/40 border border-amber-900/60 text-xs text-amber-300 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Epigraphic boundary model; frontiers varied seasonally</span>
              </div>
            </div>

            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-stone-900 border border-stone-800">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&auto=format&fit=crop&q=80"
                alt="Historical Cartography Map of Eastern India"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="font-royal-heading font-bold text-lg text-white">
                  Ganges to Kaveri Hegemony (Zenith under Kapilendra Deva)
                </h3>
                <p className="text-xs text-stone-300 max-w-2xl mt-1 leading-relaxed">
                  Based on the findspots of the Veligalani plates, Srirangam donations, Kondavidu inscriptions, and Cuttack Barabati fortress ruins.
                </p>
              </div>
            </div>
          </div>

          {/* Region Filter and Archaeological Locations Grid */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
                Historical Capitals, Citadels & Sacred Kshetrams
              </h2>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {regions.map(r => (
                  <button
                    key={r}
                    onClick={() => setActiveRegion(r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeRegion === r
                        ? 'bg-[#c99738] text-[#300207] shadow-md'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => onNavigate(`/temples-monuments`)}
                  className="rounded-2xl bg-[#121622] border border-stone-800 hover:border-[#c99738]/60 overflow-hidden shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="h-44 w-full overflow-hidden relative">
                    <img
                      src={loc.image_url}
                      alt={loc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#fcedc7] bg-[#580014]/90 px-2.5 py-1 rounded-full border border-[#d4af37]/40">
                        {loc.region}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-[#d4af37] font-semibold">
                        Ancient: {loc.ancient_name}
                      </div>
                      <h3 className="font-royal-heading font-bold text-base text-stone-100 group-hover:text-[#e8c872] transition-colors">
                        {loc.name}
                      </h3>
                      <p className="text-xs text-stone-400 mt-2 leading-relaxed line-clamp-3">
                        {loc.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 text-[11px] text-stone-500 flex items-center justify-between">
                      <span>{loc.modern_district}, {loc.modern_state}</span>
                      <span className="text-[#e8c872] font-semibold">Explore Citations →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Pan-Indian Geographical Spreading View */
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Corridor Selector */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-1">
                7 Major Historical Regional Corridors
              </div>
              <div className="space-y-2.5">
                {GEOGRAPHICAL_SPREAD.map((reg) => {
                  const isSelected = selectedCorridor.id === reg.id;
                  const localizedTitle = reg.localized_region[language] || reg.region_name;
                  return (
                    <div
                      key={reg.id}
                      onClick={() => setSelectedCorridor(reg)}
                      className={`p-4 rounded-xl cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-[#580014]/40 border-[#d4af37] shadow-[0_0_15px_rgba(201,151,56,0.2)]'
                          : 'bg-[#121622] border-stone-800 hover:border-stone-700 hover:bg-[#181e2e]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-royal-heading font-bold text-sm text-[#fcedc7]">
                          {localizedTitle}
                        </h4>
                        <span className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                          {reg.states_and_territories.length} States
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 line-clamp-1 mb-2">
                        {reg.states_and_territories.join(', ')}
                      </p>
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {reg.predominant_community_synonyms.map(syn => (
                          <span key={syn} className="px-1.5 py-0.5 rounded bg-stone-900/80 text-amber-300 border border-amber-900/30">
                            {syn}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed Corridor Dossier */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-[#c99738]/40 space-y-6 shadow-xl">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                    Corridor Dossier • {selectedCorridor.states_and_territories.join(', ')}
                  </span>
                  <h3 className="font-royal-heading font-extrabold text-2xl text-[#fcedc7] mt-1">
                    {selectedCorridor.localized_region[language] || selectedCorridor.region_name}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#580014]/60 border border-[#d4af37]/30 text-[#fcedc7] text-xs">
                    <Navigation className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Epoch: {selectedCorridor.migration_epoch_and_corridor}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-[#d4af37] tracking-wider">
                    Regional Overview & Historical Trajectory
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-royal-serif">
                    {selectedCorridor.regional_overview[language] || selectedCorridor.regional_overview.en}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                    <span className="text-stone-400 font-semibold flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-[#d4af37]" /> Historical Citadels & Forts:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-stone-300">
                      {selectedCorridor.historical_forts_and_landmarks.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                    <span className="text-stone-400 font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Key Sacred Centers & Kshetrams:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-stone-300">
                      {selectedCorridor.sacred_centers.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-2">
                  <span className="text-amber-300 font-semibold text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Predominant Community Synonyms & Sub-Castes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCorridor.predominant_community_synonyms.map(syn => (
                      <span key={syn} className="px-2 py-0.5 rounded bg-stone-900 text-stone-200 border border-stone-700 text-xs">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onNavigate(`/community-heritage?tab=geography&region=${selectedCorridor.id}`)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Explore Complete Community Heritage Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
