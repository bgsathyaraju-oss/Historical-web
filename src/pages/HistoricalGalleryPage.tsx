import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { GalleryItem } from '../types';
import {
  Landmark,
  Tag,
  Search,
  X,
  Eye,
  Calendar,
  MapPin,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import {
  GalleryArticleDetailModal,
  ModalHistoryView
} from '../components/GalleryArticleDetailModal';
import { getCanonicalGallery } from '../data/archivalSeedData';
import {
  getEnrichedGalleryArticles,
  filterGalleryArticlesByKeyword,
  getAllGalleryKeywords,
  GALLERY_UI_TRANSLATIONS,
  KEYWORD_DICTIONARY,
  EnrichedGalleryArticle
} from '../data/galleryArticlesEnrichment';
import { useLanguage } from '../context/LanguageContext';

const GALLERY_PAGE_HEADER: Record<
  string,
  { badge: string; title: string; subtitle: string; cats: Record<string, string> }
> = {
  en: {
    badge: 'Visual Preservation & Photographic Archives',
    title: 'Historical Gallery & Archival Imagery',
    subtitle:
      'High-resolution photographic documentation of dressed stone ramparts, temple architecture, palm-leaf manuscripts, and cartographic reconstructions. Click any article card, image, title, or keyword to inspect full historical background, chronology, primary sources, and related records.',
    cats: {
      all: 'All Artifacts',
      forts: 'Forts & Citadels',
      temples: 'Temples & Monuments',
      sculptures: 'Sculptures',
      manuscripts: 'Manuscripts',
      maps: 'Historical Maps'
    }
  },
  hi: {
    badge: 'दृश्य संरक्षण एवं छायाचित्र अभिलेखागार',
    title: 'ऐतिहासिक दीर्घा एवं पुरातात्विक चित्र',
    subtitle:
      'प्रस्तर दुर्गों, मंदिर स्थापत्य, ताड़पत्र पांडुलिपियों और ऐतिहासिक मानचित्रों का उच्च-रिज़ॉल्यूशन छायाचित्र संग्रह। संपूर्ण ऐतिहासिक पृष्ठभूमि, तिथियां, संदर्भ और संबंधित लेख देखने के लिए किसी भी कार्ड, चित्र या शीर्षक पर क्लिक करें।',
    cats: {
      all: 'सभी कलाकृतियां',
      forts: 'दुर्ग एवं किले',
      temples: 'मंदिर एवं स्मारक',
      sculptures: 'मूर्तियां',
      manuscripts: 'पांडुलिपियां',
      maps: 'ऐतिहासिक मानचित्र'
    }
  },
  te: {
    badge: 'దృశ్య సంరక్షణ & చారిత్రక ఛాయాచిత్ర భాండాగారం',
    title: 'చారిత్రక గ్యాలరీ & పురాతత్వ చిత్రాలు',
    subtitle:
      'రాతి కోట బురుజులు, ఆలయ శిల్పకళ, తాళపత్ర గ్రంథాలు మరియు చారిత్రక పటాల ఛాయాచిత్ర సేకరణ. పూర్తి చారిత్రక నేపథ్యం, తేదీలు, ప్రాథమిక ఆధారాలు మరియు సంబంధిత వ్యాసాల కోసం ఏదైనా కార్డు, చిత్రం లేదా శీర్షికపై క్లిక్ చేయండి.',
    cats: {
      all: 'అన్ని కళాఖండాలు',
      forts: 'కోటలు & దుర్గాలు',
      temples: 'ఆలయాలు & స్మారకాలు',
      sculptures: 'శిల్పాలు',
      manuscripts: 'తాళపత్రాలు',
      maps: 'చారిత్రక పటాలు'
    }
  },
  kn: {
    badge: 'ದೃಶ್ಯ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಛಾಯಾಚಿತ್ರ ಪತ್ರಾಗಾರ',
    title: 'ಐತಿಹಾಸಿಕ ಗ್ಯಾಲರಿ ಮತ್ತು ಪುರಾತತ್ವ ಚಿತ್ರಗಳು',
    subtitle:
      'ಕಲ್ಲಿನ ಕೋಟೆಗಳು, ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ, ತಾಳೆಗರಿಯ ಹಸ್ತಪ್ರತಿಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ನಕ್ಷೆಗಳ ಛಾಯಾಚಿತ್ರ ದಾಖಲಾತಿ. ಸಂಪೂರ್ಣ ಐತಿಹಾಸಿಕ ವಿವರಗಳಿಗಾಗಿ ಯಾವುದೇ ಕಾರ್ಡ್, ಚಿತ್ರ ಅಥವಾ ಶೀರ್ಷಿಕೆಯ ಮೇಲೆ ಕ್లిಕ್ ಮಾಡಿ.',
    cats: {
      all: 'ಎಲ್ಲಾ ಕಲಾಕೃತಿಗಳು',
      forts: 'ಕೋಟೆಗಳು ಮತ್ತು ದುರ್ಗಗಳು',
      temples: 'ದೇವಾಲಯಗಳು ಮತ್ತು ಸ್ಮಾರಕಗಳು',
      sculptures: 'ಶಿಲ್ಪಗಳು',
      manuscripts: 'ಹಸ್ತಪ್ರತಿಗಳು',
      maps: 'ಐತಿಹಾಸಿಕ ನಕ್ಷೆಗಳು'
    }
  },
  ta: {
    badge: 'காட்சிப் பாதுகாப்பு மற்றும் புகைப்பட ஆவணக் காப்பகம்',
    title: 'வரலாற்று புகைப்படத் தொகுப்பு மற்றும் ஆவணப் படங்கள்',
    subtitle:
      'கற்கோட்டைகள், கோயில் கட்டிடக்கலை, ஓலைச்சுவடிகள் மற்றும் வரலாற்று வரைபடங்களின் புகைப்பட ஆவணங்கள். முழுமையான வரலாற்றுப் பின்னணி மற்றும் ஆதாரங்களைக் காண எந்தவொரு கட்டுரை அட்டை, படம் அல்லது தலைப்பையும் சொடுக்கவும்.',
    cats: {
      all: 'அனைத்து கலைப்பொருட்கள்',
      forts: 'கோட்டைகள் & அரண்கள்',
      temples: 'கோயில்கள் & நினைவுச்சின்னங்கள்',
      sculptures: 'சிற்பங்கள்',
      manuscripts: 'ஓலைச்சுவடிகள்',
      maps: 'வரலாற்று வரைபடங்கள்'
    }
  },
  mr: {
    badge: 'दृश्य जतन आणि छायाचित्र अभिलेखागार',
    title: 'ऐतिहासिक दालन आणि पुरातन छायाचित्रे',
    subtitle:
      'दगडी तटबंदी, मंदिर स्थापत्य, ताडपत्र हस्तलिखिते आणि ऐतिहासिक नकाशांचे उच्च-रिझोल्यूशन छायाचित्रण. संपूर्ण ऐतिहासिक माहिती आणि संदर्भांसाठी कोणत्याही कार्ड, छायाचित्र किंवा शीर्षकावर क्लिक करा.',
    cats: {
      all: 'सर्व कलाकृती',
      forts: 'किल्ले आणि गड',
      temples: 'मंदिरे आणि स्मारके',
      sculptures: 'शिल्पे',
      manuscripts: 'हस्तलिखिते',
      maps: 'ऐतिहासिक नकाशे'
    }
  },
  or: {
    badge: 'ଦୃଶ୍ୟ ସଂରକ୍ଷଣ ଓ ଫଟୋଗ୍ରାଫিক୍ ଅଭିଲେଖାଗାର',
    title: 'ଐତିହାସିକ ଗ୍ୟାଲେରୀ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଚିତ୍ର',
    subtitle:
      'ପଥର ଦୁର୍ଗ ପ୍ରାଚୀର, ମନ୍ଦିର ସ୍ଥାପତ୍ୟ, ତାଳପତ୍ର ପୋଥି ଏବଂ ଐତିହାସିକ ମାନଚିତ୍ରର ଉଚ୍ଚ-ମାନର ଫଟୋଚିତ୍ର ସଂଗ୍ରହ। ସମ୍ପୂର୍ଣ୍ଣ ଐତିହାସିକ ପୃଷ୍ଠଭୂମି ଓ ପ୍ରମାଣ ଦେଖିण्यासाठी ଯେକୌଣସି କାର୍ଡ, ଚିତ୍ର କିମ୍ବା ଶୀର୍ଷକରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
    cats: {
      all: 'ସମସ୍ତ କଳାକୃତି',
      forts: 'ଦୁର୍ଗ ଓ ଗଡ଼',
      temples: 'ମନ୍ଦିର ଓ ସ୍ମାରକୀ',
      sculptures: 'ଭାସ୍କର୍ଯ୍ୟ',
      manuscripts: 'ତାଳପତ୍ର ପୋଥି',
      maps: 'ଐତିହାସିକ ମାନଚିତ୍ର'
    }
  },
  bn: {
    badge: 'দৃশ্য সংরক্ষণ ও আলোকচিত্র মহাফেজখানা',
    title: 'ঐতিহাসিক গ্যালারি ও প্রত্নতাত্ত্বিক চিত্রাবলী',
    subtitle:
      'পাথরের দুর্গ প্রাচীর, মন্দির স্থাপত্য, তালপাতার পুঁথি এবং ঐতিহাসিক মানচিত্রের আলোকচিত্র সংগ্রহ। সম্পূর্ণ ঐতিহাসিক পটভূমি ও তথ্যসূত্র দেখতে যেকোনো কার্ড, ছবি বা শিরোনামে ক্লিক করুন।',
    cats: {
      all: 'সকল নিদর্শন',
      forts: 'দুর্গ ও গড়',
      temples: 'মন্দির ও স্মৃতিস্তম্ভ',
      sculptures: 'ভাস্কর্য',
      manuscripts: 'পাণ্ডুলিপি',
      maps: 'ঐতিহাসিক মানচিত্র'
    }
  }
};

interface HistoricalGalleryPageProps {
  initialItemId?: string;
}

export const HistoricalGalleryPage: React.FC<HistoricalGalleryPageProps> = ({
  initialItemId
}) => {
  const { language } = useLanguage();
  const hdr = GALLERY_PAGE_HEADER[language] || GALLERY_PAGE_HEADER.en;
  const ui = GALLERY_UI_TRANSLATIONS[language] || GALLERY_UI_TRANSLATIONS.en;

  const [rawItems, setRawItems] = useState<GalleryItem[]>(() => getCanonicalGallery(language));
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeKeywordQuery, setActiveKeywordQuery] = useState<string>('');
  const [modalCurrentView, setModalCurrentView] = useState<ModalHistoryView | null>(null);
  const [modalHistoryStack, setModalHistoryStack] = useState<ModalHistoryView[]>([]);
  const savedScrollYRef = useRef<number>(0);

  // Sync rawItems when language changes or optional API responds
  useEffect(() => {
    const localItems = getCanonicalGallery(language);
    setRawItems(localItems);

    fetch(`/api/content/gallery?category=all&lang=${language}`)
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (d?.gallery && Array.isArray(d.gallery) && d.gallery.length > 0) {
          setRawItems(d.gallery);
        }
      })
      .catch(() => {});
  }, [language]);

  // All enriched gallery articles in current language
  const allEnrichedArticles = useMemo(
    () => getEnrichedGalleryArticles(language, rawItems),
    [language, rawItems]
  );

  // Filtered articles for the main Gallery grid (by Category + optional Keyword filter)
  const displayedArticles = useMemo(() => {
    let list = allEnrichedArticles;
    if (activeCategory !== 'all') {
      list = list.filter(a => a.item.category === activeCategory);
    }
    if (activeKeywordQuery.trim()) {
      list = filterGalleryArticlesByKeyword(activeKeywordQuery, language, list);
    }
    return list;
  }, [allEnrichedArticles, activeCategory, activeKeywordQuery, language]);

  const allKeywords = useMemo(() => getAllGalleryKeywords(language), [language]);

  // Resolve localized display label for activeKeywordQuery
  const activeKeywordDisplayLabel = useMemo(() => {
    const q = activeKeywordQuery.trim();
    if (!q) return '';
    if (KEYWORD_DICTIONARY[q]) {
      return KEYWORD_DICTIONARY[q][language] || KEYWORD_DICTIONARY[q].en;
    }
    const found = allKeywords.find(
      k =>
        k.id.toLowerCase() === q.toLowerCase() ||
        Object.values(k.allLabels).some(l => l.toLowerCase() === q.toLowerCase())
    );
    return found ? found.label : q;
  }, [activeKeywordQuery, allKeywords, language]);

  // Helper to update browser URL state without duplicate history entries
  const pushModalHistoryState = useCallback(
    (nextView: ModalHistoryView, nextStack: ModalHistoryView[]) => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const currentParamId = params.get('id');
      const currentParamKw = params.get('keyword');

      let targetSearch = '';
      if (nextView.type === 'article') {
        if (currentParamId === nextView.articleId && !currentParamKw) return;
        targetSearch = `?id=${encodeURIComponent(nextView.articleId)}`;
      } else {
        if (currentParamKw === nextView.keywordQuery && !currentParamId) return;
        targetSearch = `?keyword=${encodeURIComponent(nextView.keywordQuery)}`;
      }

      const newUrl = `${window.location.pathname}${targetSearch}${window.location.hash}`;
      window.history.pushState(
        {
          galleryModal: true,
          view: nextView,
          stack: nextStack,
          scrollY: savedScrollYRef.current
        },
        '',
        newUrl
      );
    },
    []
  );

  // Open an article in the detail modal (or transition from inside the modal)
  const handleOpenArticle = useCallback(
    (articleId: string) => {
      if (!modalCurrentView) {
        savedScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;
        const nextView: ModalHistoryView = { type: 'article', articleId };
        setModalHistoryStack([]);
        setModalCurrentView(nextView);
        pushModalHistoryState(nextView, []);
      } else {
        if (
          modalCurrentView.type === 'article' &&
          modalCurrentView.articleId === articleId
        ) {
          return;
        }
        const nextStack = [...modalHistoryStack, modalCurrentView];
        const nextView: ModalHistoryView = { type: 'article', articleId };
        setModalHistoryStack(nextStack);
        setModalCurrentView(nextView);
        pushModalHistoryState(nextView, nextStack);
      }
    },
    [modalCurrentView, modalHistoryStack, pushModalHistoryState]
  );

  // Open a Keyword Related-Content View inside the modal
  const handleOpenKeywordInModal = useCallback(
    (keywordQuery: string, keywordLabel: string) => {
      const nextView: ModalHistoryView = {
        type: 'keyword',
        keywordQuery,
        keywordLabel
      };
      if (!modalCurrentView) {
        savedScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;
        setModalHistoryStack([]);
        setModalCurrentView(nextView);
        pushModalHistoryState(nextView, []);
      } else {
        if (
          modalCurrentView.type === 'keyword' &&
          modalCurrentView.keywordQuery.toLowerCase() === keywordQuery.toLowerCase()
        ) {
          return;
        }
        const nextStack = [...modalHistoryStack, modalCurrentView];
        setModalHistoryStack(nextStack);
        setModalCurrentView(nextView);
        pushModalHistoryState(nextView, nextStack);
      }
    },
    [modalCurrentView, modalHistoryStack, pushModalHistoryState]
  );

  // Close the modal and restore exact scroll position on Gallery page
  const handleCloseModal = useCallback(() => {
    const targetScrollY = savedScrollYRef.current;
    setModalCurrentView(null);
    setModalHistoryStack([]);
    if (typeof window !== 'undefined') {
      const cleanUrl = `${window.location.pathname}${window.location.hash}`;
      window.history.replaceState({ galleryModal: false }, '', cleanUrl);
      requestAnimationFrame(() => {
        window.scrollTo(0, targetScrollY);
      });
    }
  }, []);

  // Back button inside the modal: pop previous view or close modal if at root
  const handleModalBack = useCallback(() => {
    if (modalHistoryStack.length > 0) {
      const previous = modalHistoryStack[modalHistoryStack.length - 1];
      const nextStack = modalHistoryStack.slice(0, -1);
      setModalHistoryStack(nextStack);
      setModalCurrentView(previous);
      if (typeof window !== 'undefined') {
        const targetSearch =
          previous.type === 'article'
            ? `?id=${encodeURIComponent(previous.articleId)}`
            : `?keyword=${encodeURIComponent(previous.keywordQuery)}`;
        const newUrl = `${window.location.pathname}${targetSearch}${window.location.hash}`;
        window.history.replaceState(
          {
            galleryModal: true,
            view: previous,
            stack: nextStack,
            scrollY: savedScrollYRef.current
          },
          '',
          newUrl
        );
      }
    } else {
      handleCloseModal();
    }
  }, [modalHistoryStack, handleCloseModal]);

  // Handle initial URL query params (?id=... or ?keyword=...) and browser popstate (Back/Forward)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const paramId = params.get('id') || initialItemId;
    const paramKeyword = params.get('keyword');

    if (paramId) {
      const exists = allEnrichedArticles.some(a => a.item.id === paramId);
      if (exists) {
        setModalCurrentView({ type: 'article', articleId: paramId });
      }
    } else if (paramKeyword) {
      setActiveKeywordQuery(paramKeyword);
    }
  }, [initialItemId, allEnrichedArticles]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.galleryModal && e.state.view) {
        setModalCurrentView(e.state.view);
        setModalHistoryStack(Array.isArray(e.state.stack) ? e.state.stack : []);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const paramId = params.get('id');
      const paramKw = params.get('keyword');

      if (paramId) {
        setModalCurrentView({ type: 'article', articleId: paramId });
        setModalHistoryStack([]);
      } else if (paramKw) {
        const lbl = KEYWORD_DICTIONARY[paramKw]?.[language] || paramKw;
        setModalCurrentView({
          type: 'keyword',
          keywordQuery: paramKw,
          keywordLabel: lbl
        });
        setModalHistoryStack([]);
      } else {
        const scrollToRestore = savedScrollYRef.current;
        setModalCurrentView(null);
        setModalHistoryStack([]);
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollToRestore);
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language]);

  const categories = [
    { id: 'all', label: hdr.cats.all },
    { id: 'forts', label: hdr.cats.forts },
    { id: 'temples', label: hdr.cats.temples },
    { id: 'sculptures', label: hdr.cats.sculptures },
    { id: 'manuscripts', label: hdr.cats.manuscripts },
    { id: 'maps', label: hdr.cats.maps }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Landmark className="w-4 h-4" />
          <span>{hdr.badge}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {hdr.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {hdr.subtitle}
        </p>
      </div>

      {/* Category Filter Tabs & Keyword Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#c99738] text-[#300207] shadow-md'
                    : 'bg-[#121622] text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Keyword Search / Filter Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={activeKeywordQuery}
              onChange={e => setActiveKeywordQuery(e.target.value)}
              placeholder={ui.filterByKeywordPlaceholder}
              aria-label={ui.filterByKeywordPlaceholder}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#121622] border border-stone-800 focus:border-[#c99738] text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none transition-colors"
            />
            {activeKeywordQuery && (
              <button
                type="button"
                onClick={() => setActiveKeywordQuery('')}
                aria-label={ui.clearKeywordFilter}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#fcedc7] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Popular Clickable Keywords Bar */}
        <div className="p-4 rounded-2xl bg-[#121622]/90 border border-stone-800/90 space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {ui.popularKeywordsLabel}
            </span>
            {activeKeywordQuery && (
              <button
                type="button"
                onClick={() => setActiveKeywordQuery('')}
                className="text-xs font-bold text-[#e8c872] hover:underline cursor-pointer flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                {ui.clearKeywordFilter}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allKeywords.slice(0, 12).map(kw => {
              const isSelected =
                activeKeywordQuery.trim().toLowerCase() === kw.id.toLowerCase() ||
                activeKeywordQuery.trim().toLowerCase() === kw.label.toLowerCase();
              return (
                <button
                  key={kw.id}
                  type="button"
                  onClick={() =>
                    setActiveKeywordQuery(prev =>
                      prev.toLowerCase() === kw.id.toLowerCase() ? '' : kw.id
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#c99738] text-[#2b0308] border-[#fcedc7] shadow-md'
                      : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-[#c99738]/60 hover:text-[#fcedc7]'
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  <span>{kw.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Keyword Filter Status Banner */}
        {activeKeywordQuery.trim() && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#2b0308]/90 via-[#1b0b12] to-[#121622] border border-[#c99738]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Tag className="w-4 h-4 text-[#d4af37] shrink-0" />
              <div className="text-xs sm:text-sm text-stone-200">
                <span className="font-bold text-[#e8c872]">
                  {ui.keywordFilterActiveBanner}:
                </span>{' '}
                <span className="px-2.5 py-0.5 rounded-full bg-[#c99738]/20 text-[#fcedc7] border border-[#c99738]/40 font-semibold">
                  {activeKeywordDisplayLabel}
                </span>{' '}
                <span className="text-stone-400">({displayedArticles.length})</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveKeywordQuery('')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-[#c99738] text-[#fcedc7] hover:text-[#2b0308] border border-[#c99738]/40 text-xs font-bold transition-all cursor-pointer self-start sm:self-center"
            >
              <X className="w-3.5 h-3.5" />
              <span>{ui.clearKeywordFilter}</span>
            </button>
          </div>
        )}
      </div>

      {/* Gallery Articles Grid or Empty State */}
      {displayedArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.map((enriched: EnrichedGalleryArticle) => {
            const { item } = enriched;
            return (
              <article
                key={item.id}
                onClick={() => handleOpenArticle(item.id)}
                className="group rounded-2xl overflow-hidden bg-[#121622] border border-stone-800 hover:border-[#c99738] shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Clickable Image Container */}
                <div>
                  <div
                    onClick={e => {
                      e.stopPropagation();
                      handleOpenArticle(item.id);
                    }}
                    className="h-56 overflow-hidden relative bg-stone-950"
                  >
                    <img
                      src={item.image_url}
                      alt={item.alt_text}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#fcedc7] bg-[#580014]/90 px-2.5 py-1 rounded-full border border-[#d4af37]/40">
                        {enriched.categoryLabel}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-full border border-emerald-700/50">
                        <ShieldCheck className="w-3 h-3" />
                        {item.verification_status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body: Period, Location, Clickable Title & Summary */}
                  <div className="p-5 space-y-3">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#d4af37] font-semibold">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    </div>

                    <h2
                      onClick={e => {
                        e.stopPropagation();
                        handleOpenArticle(item.id);
                      }}
                      className="font-royal-heading font-bold text-base sm:text-lg text-stone-100 group-hover:text-[#e8c872] transition-colors leading-snug"
                    >
                      {item.title}
                    </h2>

                    <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                      {enriched.fullDescription}
                    </p>

                    {/* Clickable Keywords at Bottom of Card */}
                    <div
                      className="pt-2 flex flex-wrap gap-1.5"
                      onClick={e => e.stopPropagation()}
                    >
                      {enriched.keywords.slice(0, 4).map(kw => (
                        <button
                          key={kw.id}
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            handleOpenKeywordInModal(kw.id, kw.label);
                          }}
                          title={ui.exploreKeywordTooltip}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-900/90 hover:bg-[#c99738] text-stone-300 hover:text-[#2b0308] border border-stone-700/80 hover:border-[#fcedc7] transition-all cursor-pointer"
                        >
                          <Tag className="w-2.5 h-2.5 text-[#d4af37] group-hover:text-current" />
                          <span>{kw.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer with Explicit View Details Button */}
                <div className="px-5 py-3.5 bg-[#0e121b] border-t border-stone-800/80 text-[11px] text-stone-400 flex items-center justify-between gap-2">
                  <span className="truncate">{item.source}</span>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleOpenArticle(item.id);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#c99738]/20 group-hover:bg-[#c99738] text-[#e8c872] group-hover:text-[#2b0308] border border-[#c99738]/40 font-bold text-xs transition-all cursor-pointer shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{ui.viewDetails}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State when No Articles Match Keyword / Category */
        <div className="p-10 rounded-2xl bg-[#121622] border border-stone-800 text-center space-y-4 max-w-2xl mx-auto">
          <Tag className="w-10 h-10 text-[#d4af37] mx-auto opacity-80" />
          <h3 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            {ui.noRelatedArticlesFound}
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            {ui.noKeywordArticlesFoundDesc}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setActiveKeywordQuery('');
                setActiveCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#c99738] hover:bg-[#ddb04f] text-[#2b0308] font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
            >
              {ui.showAllArticles}
            </button>
          </div>
        </div>
      )}

      {/* Centered Responsive Article Detail & Keyword Window (Modal) */}
      <GalleryArticleDetailModal
        currentView={modalCurrentView}
        historyStack={modalHistoryStack}
        allArticles={allEnrichedArticles}
        language={language}
        onSelectArticle={handleOpenArticle}
        onSelectKeyword={handleOpenKeywordInModal}
        onApplyKeywordToPage={kwId => setActiveKeywordQuery(kwId)}
        onBack={handleModalBack}
        onClose={handleCloseModal}
      />
    </div>
  );
};
