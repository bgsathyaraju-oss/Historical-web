import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Loader2, BookOpen, ArrowRight } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';
import { useLanguage } from '../context/LanguageContext';
import { performClientSearch, SearchResultItem } from '../utils/searchEngine';
import type { LanguageCode } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const SEARCH_MODAL_UI: Record<
  LanguageCode,
  {
    searchBtn: string;
    tabAll: string;
    tabFigures: string;
    tabCommunity: string;
    tabArticles: string;
    tabInscriptions: string;
    retryBtn: string;
    emptyTitle: string;
    emptyHint: string;
    noResults: (q: string) => string;
    noResultsHint: string;
    exploreRecord: string;
    showingCount: (n: number) => string;
    escHint: string;
  }
> = {
  en: {
    searchBtn: 'Search',
    tabAll: 'All Archives',
    tabFigures: 'Rulers & Sovereigns',
    tabCommunity: 'Community & Prominent Persons',
    tabArticles: 'Research Articles',
    tabInscriptions: 'Inscriptions',
    retryBtn: 'Retry Search',
    emptyTitle: 'Enter a term to search historical archives',
    emptyHint: 'Try searching for sovereign monarchs, epigraphs, or community lineages:',
    noResults: q => `No archived records found matching “${q}”`,
    noResultsHint: 'Please check the spelling or switch to “All Archives” filter tab. You can also search in any of the 8 supported languages.',
    exploreRecord: 'Explore record',
    showingCount: n => `Showing ${n} historical record${n === 1 ? '' : 's'} across 8 languages`,
    escHint: 'Press ESC or click outside to close'
  },
  hi: {
    searchBtn: 'खोजें',
    tabAll: 'सभी अभिलेख',
    tabFigures: 'सम्राट एवं शासक',
    tabCommunity: 'समुदाय एवं प्रमुख विभूतियाँ',
    tabArticles: 'शोध लेख एवं मोनोग्राफ',
    tabInscriptions: 'शिलालेख',
    retryBtn: 'पुनः खोजें',
    emptyTitle: 'ऐतिहासिक अभिलेखागार में खोजने के लिए शब्द दर्ज करें',
    emptyHint: 'सम्राटों, शिलालेखों या सामुदायिक वंशावलियों को खोजें:',
    noResults: q => `“${q}” से मेल खाने वाला कोई अभिलेख नहीं मिला`,
    noResultsHint: 'कृपया वर्तनी जांचें या “सभी अभिलेख” टैब चुनें। आप सभी 8 भाषाओं में खोज सकते हैं।',
    exploreRecord: 'अभिलेख देखें',
    showingCount: n => `8 भाषाओं में ${n} ऐतिहासिक अभिलेख प्रदर्शित`,
    escHint: 'बंद करने के लिए ESC दबाएँ'
  },
  te: {
    searchBtn: 'వెతకండి',
    tabAll: 'అన్ని పురావస్తు రికార్డులు',
    tabFigures: 'చక్రవర్తులు & పాలకులు',
    tabCommunity: 'సమాజం & ప్రముఖ వ్యక్తులు',
    tabArticles: 'పరిశోధనా వ్యాసాలు',
    tabInscriptions: 'శాసనాలు',
    retryBtn: 'మళ్ళీ వెతకండి',
    emptyTitle: 'చారిత్రక భాండాగారంలో వెతకడానికి పదాన్ని నమోదు చేయండి',
    emptyHint: 'చక్రవర్తులు, శాసనాలు లేదా వంశ చరిత్రల కోసం వెతకండి:',
    noResults: q => `“${q}” కు సరిపోయే రికార్డులు కనుగొనబడలేదు`,
    noResultsHint: 'దయచేసి స్పెల్లింగ్ సరిచూసుకోండి లేదా “అన్ని పురావస్తు రికార్డులు” ట్యాబ్ ఎంచుకోండి.',
    exploreRecord: 'రికార్డును చూడండి',
    showingCount: n => `8 భాషలలో ${n} చారిత్రక రికార్డులు చూపబడుతున్నాయి`,
    escHint: 'మూసివేయడానికి ESC నొక్కండి'
  },
  kn: {
    searchBtn: 'ಹುಡುಕಿ',
    tabAll: 'ಎಲ್ಲಾ ಪತ್ರಾಗಾರ ದಾಖಲೆಗಳು',
    tabFigures: 'ಸಾಮ್ರಾಟರು ಮತ್ತು ಅರಸರು',
    tabCommunity: 'ಸಮುದಾಯ ಮತ್ತು ಗಣ್ಯ ವ್ಯಕ್ತಿಗಳು',
    tabArticles: 'ಸಂಶೋಧನಾ ಲೇಖನಗಳು',
    tabInscriptions: 'ಶಾಸನಗಳು',
    retryBtn: 'ಮತ್ತೆ ಹುಡುಕಿ',
    emptyTitle: 'ಐತಿಹಾಸಿಕ ಪತ್ರಾಗಾರದಲ್ಲಿ ಹುಡುಕಲು ಪದವನ್ನು ನಮೂದಿಸಿ',
    emptyHint: 'ಸಾಮ್ರಾಟರು, ಶಾಸನಗಳು ಅಥವಾ ವಂಶಾವಳಿಗಳಿಗಾಗಿ ಹುಡುಕಿ:',
    noResults: q => `“${q}” ಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ`,
    noResultsHint: 'ದಯವಿಟ್ಟು ಕಾಗುಣಿತವನ್ನು ಪರಿಶೀಲಿಸಿ ಅಥವಾ “ಎಲ್ಲಾ ಪತ್ರಾಗಾರ ದಾಖಲೆಗಳು” ಟ್ಯಾಬ್ ಆಯ್ಕೆಮಾಡಿ.',
    exploreRecord: 'ದಾಖಲೆಯನ್ನು ವೀಕ್ಷಿಸಿ',
    showingCount: n => `8 ಭಾಷೆಗಳಲ್ಲಿ ${n} ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ`,
    escHint: 'ಮುಚ್ಚಲು ESC ಒತ್ತಿರಿ'
  },
  ta: {
    searchBtn: 'தேடுக',
    tabAll: 'அனைத்து ஆவணங்கள்',
    tabFigures: 'பேரரசர்கள் & மன்னர்கள்',
    tabCommunity: 'சமூகம் & முக்கிய ஆளுமைகள்',
    tabArticles: 'ஆராய்ச்சிக் கட்டுரைகள்',
    tabInscriptions: 'கல்வெட்டுகள்',
    retryBtn: 'மீண்டும் தேடுக',
    emptyTitle: 'வரலாற்று ஆவணங்களைத் தேட ஒரு சொல்லை உள்ளிடவும்',
    emptyHint: 'பேரரசர்கள், கல்வெட்டுகள் அல்லது வம்ச வரலாறுகளைத் தேடுங்கள்:',
    noResults: q => `“${q}” உடன் பொருந்தும் ஆவணங்கள் எதுவும் கிடைக்கவில்லை`,
    noResultsHint: 'எழுத்துக்கூட்டலைச் சரிபார்க்கவும் அல்லது “அனைத்து ஆவணங்கள்” பிரிவைத் தேர்ந்தெடுக்கவும்.',
    exploreRecord: 'ஆவணத்தைக் காண்க',
    showingCount: n => `8 மொழிகளில் ${n} வரலாற்று ஆவணங்கள் காட்டப்படுகின்றன`,
    escHint: 'மூடுவதற்கு ESC ஐ அழுத்தவும்'
  },
  mr: {
    searchBtn: 'शोधा',
    tabAll: 'सर्व अभिलेख',
    tabFigures: 'सम्राट आणि राज्यकर्ते',
    tabCommunity: 'समुदाय आणि प्रमुख व्यक्ती',
    tabArticles: 'संशोधन लेख',
    tabInscriptions: 'शिलालेख',
    retryBtn: 'पुन्हा शोधा',
    emptyTitle: 'ऐतिहासिक अभिलेखागारात शोधण्यासाठी शब्द प्रविष्ट करा',
    emptyHint: 'सम्राट, शिलालेख किंवा वंशावळी शोधून पहा:',
    noResults: q => `“${q}” शी जुळणाऱ्या कोणत्याही नोंदी आढळल्या नाहीत`,
    noResultsHint: 'कृपया स्पेलिंग तपासा किंवा “सर्व अभिलेख” टॅब निवडा.',
    exploreRecord: 'नोंद पहा',
    showingCount: n => `८ भाषांमध्ये ${n} ऐतिहासिक नोंदी दर्शवित आहे`,
    escHint: 'बंद करण्यासाठी ESC दाबा'
  },
  or: {
    searchBtn: 'ଖୋଜନ୍ତୁ',
    tabAll: 'ସମସ୍ତ ଅଭିଲେଖ',
    tabFigures: 'ସମ୍ରାଟ ଓ ଶାସକ',
    tabCommunity: 'ସମ୍ପ୍ରଦାୟ ଓ ବିଶିଷ୍ଟ ବ୍ୟକ୍ତି',
    tabArticles: 'ଗବେଷଣା ପ୍ରବନ୍ଧ',
    tabInscriptions: 'ଶିଳାଲେଖ',
    retryBtn: 'ପୁନର୍ବାର ଖୋଜନ୍ତୁ',
    emptyTitle: 'ଐତିହାସିକ ଅଭିଲେଖାଗାରରେ ଖୋଜିବା ପାଇଁ ଶବ୍ଦ ଲେଖନ୍ତୁ',
    emptyHint: 'ସମ୍ରାଟ, ଶିଳାଲେଖ କିମ୍ବା ବଂଶାବଳୀ ଖୋଜନ୍ତୁ:',
    noResults: q => `“${q}” ସହିତ ମେଳ ଖାଉଥିବା କୌଣସି ଅଭିଲେଖ ମିଳିଲା ନାହିଁ`,
    noResultsHint: 'ଦୟାକରି বানান ଯାଞ୍ଚ କରନ୍ତୁ କିମ୍ବା “ସମସ୍ତ ଅଭିଲେଖ” ଟ୍ୟାବ୍ ବାଛନ୍ତୁ।',
    exploreRecord: 'ଅଭିଲେଖ ଦେଖନ୍ତୁ',
    showingCount: n => `୮ଟି ଭାଷାରେ ${n}ଟି ଐତିହାସିକ ଅଭିଲେଖ ପ୍ରଦର୍ଶିତ`,
    escHint: 'ବନ୍ଦ କରିବା ପାଇଁ ESC ଦବାନ୍ତୁ'
  },
  bn: {
    searchBtn: 'খুঁজুন',
    tabAll: 'সমস্ত আর্কাইভ',
    tabFigures: 'সম্রাট ও শাসকগণ',
    tabCommunity: 'সম্প্রদায় ও বিশিষ্ট ব্যক্তিত্ব',
    tabArticles: 'গবেষণা প্রবন্ধ',
    tabInscriptions: 'শিলালিপি',
    retryBtn: 'পুনরায় খুঁজুন',
    emptyTitle: 'ঐতিহাসিক আর্কাইভে অনুসন্ধানের জন্য শব্দ লিখুন',
    emptyHint: 'সম্রাট, শিলালিপি বা বংশাবলী অনুসন্ধান করুন:',
    noResults: q => `“${q}”-এর সাথে মেলে এমন কোনো নথি পাওয়া যায়নি`,
    noResultsHint: 'অনুগ্রহ করে বানান পরীক্ষা করুন অথবা “সমস্ত আর্কাইভ” ট্যাব নির্বাচন করুন।',
    exploreRecord: 'নথি দেখুন',
    showingCount: n => `৮টি ভাষায় ${n}টি ঐতিহাসিক নথি প্রদর্শিত হচ্ছে`,
    escHint: 'বন্ধ করতে ESC চাপুন'
  }
};

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { language, t, getMetadataLabel } = useLanguage();
  const currentLang = (language as LanguageCode) || 'en';
  const ui = SEARCH_MODAL_UI[currentLang] || SEARCH_MODAL_UI.en;
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'figures' | 'community' | 'inscriptions' | 'members'>('all');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
      setResults([]);
      setHasSearched(false);
      setSearchError(null);
    }
  }, [isOpen]);

  const executeSearch = useCallback((searchTerm: string, tab = activeTab) => {
    const trimmed = searchTerm.normalize('NFC').trim();
    if (!trimmed) {
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      setSearchError(null);
      return;
    }

    setLoading(true);
    setSearchError(null);
    setHasSearched(true);

    try {
      const clientResults = performClientSearch(trimmed, tab, currentLang);
      setResults(clientResults);

      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        fetch(`/api/search?q=${encodeURIComponent(trimmed)}&type=${tab}&lang=${encodeURIComponent(currentLang)}`)
          .then(res => {
            if (res.ok) return res.json();
            return null;
          })
          .then(data => {
            if (data?.results && Array.isArray(data.results) && data.results.length > 0) {
              setResults(prev => {
                const map = new Map<string, SearchResultItem>();
                prev.forEach(item => map.set(`${item.type}:${item.id}`, item));
                data.results.forEach((item: SearchResultItem) => {
                  const key = `${item.type}:${item.id}`;
                  if (!map.has(key)) map.set(key, item);
                });
                return Array.from(map.values());
              });
            }
          })
          .catch(() => {});
      }
    } catch (err) {
      console.error('[SURYAVAMSHA ARCHIVES] Client search error:', err);
      setSearchError('An unexpected error occurred while searching historical records. Please try another term.');
    } finally {
      setLoading(false);
    }
  }, [activeTab, currentLang]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(() => {
      executeSearch(query, activeTab);
    }, 180);

    return () => clearTimeout(timer);
  }, [query, activeTab, executeSearch]);

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    if (query.trim()) {
      executeSearch(query, tabId);
    }
  };

  const handleFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    executeSearch(query, activeTab);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-16 px-3 sm:px-4 bg-[#292521]/65 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl bg-[#FFFCF5] border-2 border-[#A87924] rounded-2xl shadow-[0_18px_48px_rgba(75,51,31,0.26)] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input & Action Bar */}
        <form
          onSubmit={handleFormSubmit}
          className="p-3 sm:p-4 border-b border-[#D8C3A2] flex items-center gap-2 sm:gap-3 bg-[#FFF9EF]"
        >
          <Search className="w-5 h-5 text-[#A87924] shrink-0" aria-hidden="true" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleFormSubmit();
              }
            }}
            placeholder={t.common.searchPlaceholder}
            className="w-full bg-[#FFFFFF] px-3 py-2 rounded-xl border border-[#D8C3A2] focus:border-[#A87924] text-[#292521] placeholder-[#6B5948] text-sm sm:text-base focus:outline-none"
            aria-label={t.common.searchPlaceholder}
          />

          {loading && <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#A87924] animate-spin shrink-0" />}

          {query && !loading && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                setHasSearched(false);
                inputRef.current?.focus();
              }}
              className="p-1.5 text-[#6B5948] hover:text-[#292521] rounded-lg hover:bg-[#E9D9BE] transition-colors cursor-pointer"
              title={t.common.close}
              aria-label={t.common.close}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Primary Clickable Search Button */}
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-[#762D35] hover:bg-[#5e2229] text-white font-bold text-xs sm:text-sm border border-[#A87924] shadow-sm flex items-center gap-1.5 transition-all shrink-0 cursor-pointer active:scale-95"
            title={ui.searchBtn}
            aria-label={ui.searchBtn}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{ui.searchBtn}</span>
          </button>

          {/* Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-2 text-xs font-semibold text-[#54351F] bg-[#E9D9BE] border border-[#D8C3A2] hover:border-[#A87924] rounded-lg hover:bg-[#dfc9a4] transition-colors shrink-0 cursor-pointer"
            title={t.common.close}
            aria-label={t.common.close}
          >
            ESC
          </button>
        </form>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-[#EFE3D0] border-b border-[#D8C3A2] text-xs overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: ui.tabAll },
            { id: 'figures', label: ui.tabFigures },
            { id: 'community', label: ui.tabCommunity },
            { id: 'articles', label: ui.tabArticles },
            { id: 'inscriptions', label: ui.tabInscriptions }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id as any)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors font-semibold cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-[#762D35] text-white border-[#A87924] shadow-sm'
                  : 'bg-[#FFFCF5] text-[#54351F] border-[#D8C3A2] hover:bg-[#E9D9BE] hover:border-[#A87924]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-[#D8C3A2]">
          {searchError ? (
            <div className="py-12 text-center text-[#762D35] px-4 space-y-2">
              <p className="text-sm font-semibold">{searchError}</p>
              <button
                type="button"
                onClick={() => executeSearch(query)}
                className="text-xs text-[#76501F] hover:underline font-semibold"
              >
                {ui.retryBtn}
              </button>
            </div>
          ) : !query.trim() ? (
            <div className="py-12 text-center text-[#6B5948] space-y-3 px-4">
              <BookOpen className="w-10 h-10 mx-auto mb-2 text-[#A87924]" />
              <p className="text-sm font-bold text-[#54351F]">{ui.emptyTitle}</p>
              <p className="text-xs text-[#6B5948] max-w-lg mx-auto leading-relaxed">
                {ui.emptyHint}
                <br />
                <span className="text-[#76501F] font-semibold">
                  "Balanagamma", "Raja Bhoja", "Balavaddiraju", "Kapilendra Deva", "Odra Desha", "Kharavela", "Paikas", "Veligalani"
                </span>
              </p>
            </div>
          ) : results.length === 0 && !loading && hasSearched ? (
            <div className="py-12 text-center text-[#6B5948] space-y-2 px-4">
              <p className="text-sm font-bold text-[#54351F]">
                {ui.noResults(query)}
              </p>
              <p className="text-xs text-[#6B5948] max-w-md mx-auto">
                {ui.noResultsHint}
              </p>
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={`${item.type}-${item.id}-${idx}`}
                onClick={() => {
                  onNavigate(item.link);
                  onClose();
                }}
                className="py-3 px-3 hover:bg-[#FFF9EF] rounded-xl transition-all cursor-pointer group"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(item.link);
                    onClose();
                  }
                }}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#E9D9BE] text-[#54351F] border border-[#D8C3A2]">
                      {getMetadataLabel('category', item.type) || item.type}
                    </span>
                    {item.reference_id && (
                      <span
                        lang="en"
                        translate="no"
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFF9EF] text-[#762D35] border border-[#A87924]"
                      >
                        REF ID: {item.reference_id}
                      </span>
                    )}
                    <h4 className="text-sm sm:text-base font-bold text-[#54351F] group-hover:text-[#762D35] transition-colors">
                      {item.title}
                    </h4>
                  </div>
                  {item.verification_status && (
                    <EvidenceBadge status={item.verification_status} size="sm" />
                  )}
                </div>
                <div className="text-xs text-[#76501F] font-semibold mb-1">
                  {item.subtitle}
                </div>
                <p className="text-xs text-[#292521] line-clamp-2 leading-relaxed">
                  {item.snippet}
                </p>
                <div className="mt-2 flex items-center text-[11px] text-[#762D35] font-semibold gap-1">
                  <span>{ui.exploreRecord}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Result Count */}
        {results.length > 0 && (
          <div className="px-4 py-2.5 bg-[#EFE3D0] border-t border-[#D8C3A2] text-[11px] text-[#54351F] font-medium flex items-center justify-between">
            <span>{ui.showingCount(results.length)}</span>
            <span className="text-[#6B5948]">{ui.escHint}</span>
          </div>
        )}
      </div>
    </div>
  );
};
