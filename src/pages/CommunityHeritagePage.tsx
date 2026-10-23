import React, { useState, useEffect } from 'react';
import {
  Users,
  Crown,
  MapPin,
  Sparkles,
  BookOpen,
  Scroll,
  Shield,
  Search,
  ExternalLink,
  ChevronRight,
  Flame,
  Droplets,
  Landmark,
  X,
  Compass,
  Building,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { ArticleActionBar } from '../components/ArticleActionBar';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { useLanguage } from '../context/LanguageContext';
import {
  HISTORICAL_FIGURES,
  COMMUNITY_SYNONYMS,
  GEOGRAPHICAL_SPREAD,
  HISTORICAL_MONOGRAPH_SECTIONS,
  HistoricalFigureSummary,
  CommunitySynonym,
  GeographicalSpreadRegion
} from '../data/historyContent';
import { LanguageCode } from '../types';

interface CommunityHeritagePageProps {
  onNavigate: (path: string) => void;
  initialTab?: 'synonyms' | 'figures' | 'geography' | 'history';
}

export const CommunityHeritagePage: React.FC<CommunityHeritagePageProps> = ({ onNavigate, initialTab }) => {
  const { t, language, setLanguage, translateText, getMetadataLabel } = useLanguage();
  const [activeTab, setActiveTab] = useState<'synonyms' | 'figures' | 'geography' | 'history'>(() => {
    if (initialTab) return initialTab;
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam === 'figures' || tabParam === 'synonyms' || tabParam === 'geography' || tabParam === 'history') {
      return tabParam;
    }
    return 'synonyms';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigureSummary | null>(null);
  const [synonymCategoryFilter, setSynonymCategoryFilter] = useState<string>('all');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam === 'figures' || tabParam === 'synonyms' || tabParam === 'geography' || tabParam === 'history') {
        setActiveTab(tabParam);
      }
    }
  }, [initialTab]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFigure(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered Synonyms
  const filteredSynonyms = COMMUNITY_SYNONYMS.filter(s => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      s.title.toLowerCase().includes(term) ||
      s.primary_regions.some(r => r.toLowerCase().includes(term)) ||
      s.prominent_states.some(st => st.toLowerCase().includes(term)) ||
      (s.historical_role[language] || s.historical_role.en).toLowerCase().includes(term);

    const matchesCategory =
      synonymCategoryFilter === 'all' || s.category.toLowerCase().includes(synonymCategoryFilter.toLowerCase());

    const matchesRegion =
      !selectedRegionId ||
      s.prominent_states.some(st => {
        const reg = GEOGRAPHICAL_SPREAD.find(g => g.id === selectedRegionId);
        return reg?.states_and_territories.includes(st);
      });

    return matchesSearch && matchesCategory && matchesRegion;
  });

  // Filtered Figures
  const filteredFigures = HISTORICAL_FIGURES.filter(f => {
    const term = searchTerm.toLowerCase();
    const locName = (f.localized_name[language] || f.canonical_name).toLowerCase();
    const summary = (f.summary[language] || f.summary.en).toLowerCase();
    const titles = (f.titles[language] || f.titles.en).toLowerCase();

    return (
      locName.includes(term) ||
      f.alternate_names.some(a => a.toLowerCase().includes(term)) ||
      summary.includes(term) ||
      titles.includes(term) ||
      f.associated_places.some(p => p.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Action Bar with Home, Close, and 8-Language Switcher */}
      <ArticleActionBar
        onHome={() => onNavigate('/')}
        onClose={() => onNavigate('/')}
        title={
          language === 'te'
            ? 'ఓడ్-రాజ్‌పుత్, ఓడ్-క్షత్రియ మరియు సంబంధిత వంశాల సమగ్ర చరిత్ర'
            : language === 'or'
            ? 'ଓଡ଼-ରାଜପୁତ, ଓଡ଼-କ୍ଷତ୍ରିୟ ଓ ସମଗୋତ୍ରୀୟ ସମୁଦାୟଙ୍କ ଇତିହାସ'
            : language === 'hi'
            ? 'ओड-राजपूत, ओड-क्षत्रिय एवं संबद्ध समुदायों का प्रामाणिक इतिहास'
            : language === 'kn'
            ? 'ಓಡ್-ರಜಪೂತ್, ಓಡ್-ಕ್ಷತ್ರಿಯ ಮತ್ತು ಸಂಬಂಧಿತ ವಂಶಗಳ ಸಮಗ್ರ ಇತಿಹಾಸ'
            : language === 'ta'
            ? 'ஓட்-ராஜபுத், ஓட்-சத்திரிய மற்றும் தொடர்புடைய மரபுகளின் வரலாறு'
            : language === 'mr'
            ? 'ओड-राजपूत, ओड-क्षत्रिय आणि संबंधित वंशांचा साद्यंत इतिहास'
            : language === 'bn'
            ? 'ওড-রাজপুত, ওড-ক্ষত্রিয় ও সমগোত্রীয় সমাজের ইতিহাস'
            : 'Oad-Rajput, Od-Kshatriya & Allied Heritage'
        }
        badge="Community Lineage"
        showLanguages={true}
      />

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2a0614] via-[#1c1224] to-[#0c101c] border border-[#c99738]/50 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/40 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Suryavamsha Odiyaraju Kshatriya & Oad-Rajput Heritage Archive</span>
          </div>

          <h1 className="font-royal-heading font-extrabold text-3xl sm:text-5xl text-[#fcedc7] leading-tight">
            {language === 'te'
              ? 'వంశావళి, ఆరాధ్య పితామహులు & అఖిల భారత భౌగోళిక విస్తరణ'
              : language === 'or'
              ? 'ବଂଶାବଳୀ, ପୂଜ୍ୟ ପୂର୍ବପୁରୁଷ ଓ ସର୍ବଭାରତୀୟ ଭୌଗୋଳିକ ବିସ୍ତାର'
              : language === 'hi'
              ? 'वंशावली, पूज्य आदि-पुरुष एवं अखिल भारतीय भौगोलिक प्रसार'
              : language === 'kn'
              ? 'ವಂಶಾವಳಿ, ಆದ್ಯ ಪಿತಾಮಹರು ಮತ್ತು ಅಖಿಲ ಭಾರತ ಭೌಗೋಳಿಕ ಹರಡುವಿಕೆ'
              : language === 'ta'
              ? 'வம்சாவளி, புனித முன்னோடிகள் மற்றும் அகில இந்திய புவியியல் பரவல்'
              : language === 'mr'
              ? 'वंशावळ, पूज्य पूर्वज आणि अखिल भारतीय भौगोलिक विस्तार'
              : language === 'bn'
              ? 'বংশলতিকা, পূজ্য আদি পুরুষ ও সর্বভারতীয় ভৌগোলিক বিস্তার'
              : 'Lineage, Sacred Progenitors & Pan-Indian Geographical Spreading'}
          </h1>

          <p className="text-sm sm:text-base text-stone-300 font-royal-serif leading-relaxed">
            {language === 'te'
              ? 'ప్రాచీన సూర్యవంశ చక్రవర్తులు (సగరుడు, భగీరథుడు, శ్రీరాముడు), కళింగ-ఓడ్ర సమ్రాట్ ఖారవేలుడు నుండి పవిత్ర రక్షకులు (మాతా జస్మా దేవి, సిద్ధరామేశ్వరుడు) వరకు — ఓడ్-రాజ్‌పుత్, ఓడ్-క్షత్రియ, ఒడ్డే, వడ్డెరాజులు మరియు వడ్డార్ సమాజాల చారిత్రక ప్రస్థానం.'
              : language === 'hi'
              ? 'प्राचीन सूर्यवंशी चक्रवर्ती सम्राटों (सगर, भगीरथ, श्रीराम) एवं कलिंग-ओड्र सम्राट खारवेल से लेकर पवित्र रक्षकों (माता जस्मा देवी, संत सिद्धरामेश्वर) तक — ओड-राजपूत, ओड-क्षत्रिय, वड्डेराजुलु, वड्डार और ओड्डार समाज का गौरवशाली इतिहास।'
              : 'Documenting the epic civilizational journey of the Oad-Rajput, Od-Kshatriya, OddeRajulu, VaddeRajulu, and Waddar communities across 8 major Indian geographical corridors, linking classical epigraphy with living sacred tradition.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#580014]/60 border border-[#d4af37]/30 text-[#fcedc7] flex items-center gap-1.5">
              <Crown className="w-3 h-3 text-[#d4af37]" /> Suryavamsha Solar Race
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 flex items-center gap-1.5">
              <Droplets className="w-3 h-3 text-cyan-400" /> Master Hydraulic & Canal Engineers
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-amber-400" /> Gajapathi Military Garrisons
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-emerald-400" /> 7 Pan-Indian Corridors
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'synonyms', label: translateText('synonyms_and_variants', '1. Community Synonyms & Titles'), icon: Users },
          { id: 'figures', label: translateText('key_historical_figures', '2. Sacred Progenitors & Figures'), icon: Crown },
          { id: 'geography', label: translateText('pan_india_spread', '3. Pan-Indian Geographical Spreading'), icon: MapPin },
          { id: 'history', label: translateText('historical_monographs', '4. Complete Historical Monograph'), icon: BookOpen }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-[#580014] to-[#78001c] text-[#fae29c] border border-[#d4af37] shadow-lg shadow-[#580014]/40'
                  : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4af37]' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Universal Search & Quick Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121624] p-4 rounded-2xl border border-stone-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={translateText('search_placeholder', 'Search synonyms, figures, regions, states...')}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-900/90 border border-stone-700/80 rounded-xl text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Region filter badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none text-xs">
          <span className="text-stone-400 text-[11px] whitespace-nowrap flex items-center gap-1">
            <Compass className="w-3 h-3 text-[#d4af37]" /> Region:
          </span>
          <button
            onClick={() => setSelectedRegionId(null)}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedRegionId === null
                ? 'bg-[#c99738] text-[#300207] font-bold'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
            }`}
          >
            All Regions
          </button>
          {GEOGRAPHICAL_SPREAD.map(reg => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegionId(selectedRegionId === reg.id ? null : reg.id)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedRegionId === reg.id
                  ? 'bg-[#c99738] text-[#300207] font-bold shadow'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              {reg.region_name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 1: COMMUNITY SYNONYMS & TITLES */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'synonyms' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-royal-heading font-bold text-2xl text-[#fcedc7]">
                Synonyms, Regional Designations & Martial Titles
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">
                Linguistic evolution from ancient Sanskrit <em>Odra / Audra</em> across northern, western, central, and southern India.
              </p>
            </div>

            {/* Category filter pills */}
            <div className="flex items-center gap-1 text-xs">
              {['all', 'Royal', 'Kshatriya', 'Engineering', 'Shift'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSynonymCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg capitalize cursor-pointer transition-colors ${
                    synonymCategoryFilter === cat
                      ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37]'
                      : 'bg-stone-900 text-stone-400 hover:bg-stone-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSynonyms.map(item => (
              <div
                key={item.id}
                className="bg-[#121624] border border-[#c99738]/30 rounded-2xl p-6 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between shadow-lg group hover:shadow-[0_0_20px_rgba(201,151,56,0.15)]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-royal-heading font-bold text-lg text-[#fae29c] group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {Object.entries(item.native_scripts).map(([scriptName, scriptVal]) => (
                          <span
                            key={scriptName}
                            className="text-[11px] font-mono text-[#d4af37] bg-stone-900/90 px-2 py-0.5 rounded border border-stone-800"
                            title={scriptName}
                          >
                            {scriptVal}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded bg-[#580014] text-[#fcedc7] font-semibold border border-[#d4af37]/30 whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-300">
                    <div className="flex items-start gap-1.5 text-stone-400">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-stone-300">States:</strong> {item.prominent_states.join(', ')}
                      </div>
                    </div>

                    <div className="text-stone-400 text-[11px]">
                      <strong className="text-stone-300">Linguistic Root:</strong> {item.linguistic_origin}
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed pt-1 border-t border-stone-800/80">
                    {item.historical_role[language] || item.historical_role.en}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400 truncate max-w-[200px]">
                    🙏 {item.sacred_associations.slice(0, 2).join(' • ')}
                  </span>
                  <button
                    onClick={() => {
                      setActiveTab('geography');
                      setSearchTerm(item.prominent_states[0] || '');
                    }}
                    className="text-[#d4af37] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    View Regions <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 2: SACRED PROGENITORS & HISTORICAL FIGURES */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'figures' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-royal-heading font-bold text-2xl text-[#fcedc7]">
                Sacred Progenitors, Emperors & Divine Guardians
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">
                Click on any figure to view the complete detailed historical narrative, civil engineering legacy, and canonical sources.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFigures.map(fig => {
              const displayName = fig.localized_name[language] || fig.canonical_name;
              const displaySummary = fig.summary[language] || fig.summary.en;
              const displayTitle = fig.titles[language] || fig.titles.en;

              return (
                <div
                  key={fig.id}
                  onClick={() => setSelectedFigure(fig)}
                  className="bg-[#121624] border border-[#c99738]/30 hover:border-[#d4af37] rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(201,151,56,0.2)]"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-stone-950">
                    <img
                      src={fig.image_url}
                      alt={fig.canonical_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#580014]/90 text-[#fcedc7] border border-[#d4af37]/40 backdrop-blur-sm">
                        {fig.epigraphic_status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-royal-heading font-bold text-lg text-[#fae29c] group-hover:text-white transition-colors">
                          {displayName}
                        </h3>
                        <p className="text-[11px] text-[#d4af37] font-semibold leading-snug line-clamp-2">
                          {displayTitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-stone-400">
                        <span>⏳ {fig.reign_or_dates}</span>
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                        {displaySummary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-stone-400">
                        📍 {fig.associated_places[0]}
                      </span>
                      <span className="text-[#d4af37] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore Profile <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 3: PAN-INDIAN GEOGRAPHICAL SPREADING */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'geography' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-royal-heading font-bold text-2xl text-[#fcedc7]">
              Pan-Indian Geographical Spreading & Historical Corridors
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Examining the 7 major regional corridors where the community established fort defenses, irrigation networks, and sacred shrines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Region List */}
            <div className="lg:col-span-1 space-y-3">
              {GEOGRAPHICAL_SPREAD.map(reg => {
                const isSelected = (selectedRegionId || GEOGRAPHICAL_SPREAD[0].id) === reg.id;
                const regTitle = reg.localized_region[language] || reg.region_name;

                return (
                  <div
                    key={reg.id}
                    onClick={() => setSelectedRegionId(reg.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#201520] border-[#d4af37] shadow-lg shadow-[#580014]/20'
                        : 'bg-[#121624] border-stone-800 hover:border-stone-700 hover:bg-[#161b2e]'
                    }`}
                  >
                    <div className="space-y-1">
                      <h4 className={`text-sm font-bold ${isSelected ? 'text-[#fae29c]' : 'text-stone-200'}`}>
                        {regTitle}
                      </h4>
                      <p className="text-[11px] text-stone-400 truncate max-w-[220px]">
                        {reg.predominant_community_synonyms.join(' • ')}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[#d4af37]' : 'text-stone-600'}`} />
                  </div>
                );
              })}
            </div>

            {/* Region Detailed Card */}
            {(() => {
              const activeReg =
                GEOGRAPHICAL_SPREAD.find(r => r.id === (selectedRegionId || GEOGRAPHICAL_SPREAD[0].id)) ||
                GEOGRAPHICAL_SPREAD[0];
              const regTitle = activeReg.localized_region[language] || activeReg.region_name;
              const regOverview = activeReg.regional_overview[language] || activeReg.regional_overview.en;

              return (
                <div className="lg:col-span-2 bg-[#121624] border border-[#c99738]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
                    <div>
                      <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">
                        Regional Corridor Spotlight
                      </span>
                      <h3 className="font-royal-heading font-extrabold text-2xl text-[#fcedc7]">
                        {regTitle}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeReg.predominant_community_synonyms.map(syn => (
                        <span
                          key={syn}
                          className="px-2.5 py-1 rounded bg-[#580014] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/30"
                        >
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-stone-200 font-royal-serif leading-relaxed">
                    {regOverview}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <MapPin className="w-4 h-4" />
                        <span>Key Cities & Districts</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {activeReg.prominent_cities_districts.join(', ')}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <Building className="w-4 h-4" />
                        <span>Landmark Forts & Reservoirs</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {activeReg.historical_forts_and_landmarks.join(' • ')}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <Sparkles className="w-4 h-4" />
                        <span>Sacred Centers & Shrines</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {activeReg.sacred_centers.join(' • ')}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <Calendar className="w-4 h-4" />
                        <span>Migration Context</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {activeReg.migration_epoch_and_corridor}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-stone-800 text-xs">
                    <span className="text-stone-400">
                      States: {activeReg.states_and_territories.join(', ')}
                    </span>
                    <button
                      onClick={() => {
                        setActiveTab('synonyms');
                        setSearchTerm(activeReg.predominant_community_synonyms[0] || '');
                      }}
                      className="text-[#d4af37] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      Filter Synonyms for this Region <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 4: COMPLETE HISTORICAL MONOGRAPH */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'history' && (
        <article className="bg-[#121624] border border-[#c99738]/40 rounded-3xl p-6 sm:p-12 space-y-10 shadow-2xl">
          <div className="border-b border-stone-800 pb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014] text-[#fae29c] text-xs font-semibold">
              <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Peer-Reviewed Archival Monograph</span>
            </div>
            <h2 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
              The Civilizational Odyssey of Oad-Rajput & Od-Kshatriya Communities
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Authored by the Suryavamsha Archival Research Council • Integrating Classical Epigraphy, Dynastic Inscriptions, and Living Community Heritage
            </p>
          </div>

          <div className="space-y-8 font-royal-serif text-stone-200 text-sm sm:text-base leading-relaxed">
            {HISTORICAL_MONOGRAPH_SECTIONS.map(sec => {
              const secTitle = sec.section_title[language] || sec.section_title.en;
              const secContent = sec.content[language] || sec.content.en;

              return (
                <section key={sec.id} className="space-y-3 pb-6 border-b border-stone-800/60 last:border-0">
                  <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c]">
                    {secTitle}
                  </h3>
                  <div className="whitespace-pre-line text-stone-300">
                    {secContent}
                  </div>
                  {sec.key_points && sec.key_points.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-2 text-xs">
                      {sec.key_points.map((kp, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-stone-900 text-stone-400 border border-stone-800"
                        >
                          ✓ {kp}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </article>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* DETAILED HISTORICAL FIGURE MODAL DIALOG */}
      {/* ---------------------------------------------------------------------- */}
      {selectedFigure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#101420] border-2 border-[#d4af37] rounded-3xl overflow-y-auto shadow-2xl shadow-[#580014]/50 p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stone-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#580014] text-[#fae29c] border border-[#d4af37]/40">
                    {selectedFigure.epigraphic_status}
                  </span>
                  <span className="text-xs text-stone-400">⏳ {selectedFigure.reign_or_dates}</span>
                </div>
                <h3 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7]">
                  {selectedFigure.localized_name[language] || selectedFigure.canonical_name}
                </h3>
                <p className="text-xs text-[#d4af37] font-semibold">
                  {selectedFigure.titles[language] || selectedFigure.titles.en}
                </p>
              </div>
              <button
                onClick={() => setSelectedFigure(null)}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700 transition-colors cursor-pointer"
                title="Close Profile (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Figure Image & Alternate Names */}
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden border border-[#d4af37]/50 shrink-0 shadow-lg bg-stone-950">
                <img
                  src={selectedFigure.image_url}
                  alt={selectedFigure.canonical_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3 text-xs w-full">
                <div className="space-y-1">
                  <span className="text-stone-400 text-[11px] font-semibold">Alternate Historical Names:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFigure.alternate_names.map(alt => (
                      <span key={alt} className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-800">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 text-[11px] font-semibold">Dynasty & Lineage:</span>
                  <p className="text-stone-200 font-semibold">{selectedFigure.dynasty_lineage}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 text-[11px] font-semibold">Associated Sacred Geography:</span>
                  <p className="text-stone-300">📍 {selectedFigure.associated_places.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Detailed Narrative */}
            <div className="space-y-3 border-t border-stone-800 pt-4">
              <h4 className="font-royal-heading font-bold text-base text-[#fae29c] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#d4af37]" /> {translateText('detailed_narrative', 'Historical & Sacred Chronicle')}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed whitespace-pre-line">
                {selectedFigure.detailed_narrative[language] || selectedFigure.detailed_narrative.en}
              </p>
            </div>

            {/* Civil & Water Engineering Legacy Spotlight */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#201018] to-[#121c28] border border-[#d4af37]/40 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <Droplets className="w-4 h-4 text-cyan-400" /> {translateText('civic_and_water_legacy', 'Civil & Water-Engineering Legacy')}
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-royal-serif">
                {selectedFigure.engineering_and_civic_legacy[language] ||
                  selectedFigure.engineering_and_civic_legacy.en}
              </p>
            </div>

            {/* Canonical Sources */}
            <div className="space-y-2 border-t border-stone-800 pt-4 text-xs">
              <span className="text-stone-400 font-semibold flex items-center gap-1.5">
                <Scroll className="w-3.5 h-3.5 text-[#d4af37]" /> {translateText('canonical_sources', 'Primary Epigraphs & Scholarly References')}:
              </span>
              <ul className="list-disc pl-5 space-y-1 text-stone-300">
                {selectedFigure.canonical_sources.map((src, idx) => (
                  <li key={idx}>{src}</li>
                ))}
              </ul>
            </div>

            {/* Footer Close Button */}
            <div className="pt-4 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setSelectedFigure(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer shadow-md"
              >
                {translateText('close_modal', 'Close Profile')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Community Directory and Registration CTA */}
      <div className="p-8 rounded-3xl bg-[#141824] border border-[#c99738]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            Connect with Fellow Members Across the Nation
          </h3>
          <p className="text-xs text-stone-400">
            Join the verified public member directory and preserve your family vamsavali with strict privacy safeguards.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/directory')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer shadow-md"
          >
            Explore Directory
          </button>
          <button
            onClick={() => onNavigate('/register')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1a2130] text-stone-200 border border-stone-700 hover:border-[#c99738] transition-all cursor-pointer"
          >
            Register as Member
          </button>
        </div>
      </div>
    </div>
  );
};
