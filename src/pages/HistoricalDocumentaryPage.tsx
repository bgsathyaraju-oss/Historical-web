import React, { useState, useEffect } from 'react';
import { Article, LanguageCode } from '../types';

const DOC_PAGE_UI: Record<LanguageCode, {
  catAll: string;
  catOdra: string;
  catGajapathi: string;
  catDynasties: string;
  catKings: string;
  catInscriptions: string;
  catCulture: string;
  readBtn: string;
  viewingLabel: string;
  openModalBtn: string;
  emptySelect: string;
  closeMonograph: string;
}> = {
  en: {
    catAll: 'All Categories',
    catOdra: 'Odra Desha & Geography',
    catGajapathi: 'Gajapathi Kings & Empire',
    catDynasties: 'Dynasties & Lineage',
    catKings: 'Kings & Progenitors',
    catInscriptions: 'Inscriptions & Epigraphy',
    catCulture: 'Culture & Community',
    readBtn: 'Read',
    viewingLabel: 'Viewing:',
    openModalBtn: 'Open Full Monograph Modal',
    emptySelect: 'Select an article from the documentary archive to read its full empirical investigation.',
    closeMonograph: 'Close Monograph'
  },
  hi: {
    catAll: 'सभी श्रेणियाँ',
    catOdra: 'ओड्र देश और भूगोल',
    catGajapathi: 'गजपति राजा और साम्राज्य',
    catDynasties: 'राजवंश और वंशावली',
    catKings: 'राजा और आदि-पुरुष',
    catInscriptions: 'शिलालेख और पुरालेख',
    catCulture: 'संस्कृति और समुदाय',
    readBtn: 'पढ़ें',
    viewingLabel: 'अवलोकन:',
    openModalBtn: 'पूर्ण मोनोग्राफ विंडो खोलें',
    emptySelect: 'पूर्ण ऐतिहासिक शोध पढ़ने के लिए बाएँ पैनल से किसी लेख का चयन करें।',
    closeMonograph: 'मोनोग्राफ बंद करें'
  },
  te: {
    catAll: 'అన్ని విభాగాలు',
    catOdra: 'ఓడ్ర దేశం & భౌగోళికత',
    catGajapathi: 'గజపతి రాజులు & సామ్రాజ్యం',
    catDynasties: 'రాజవంశాలు & వంశావళి',
    catKings: 'రాజులు & ఆది పురుషులు',
    catInscriptions: 'శాసనాలు & ఎపిగ్రఫీ',
    catCulture: 'సంస్కృతి & సమాజం',
    readBtn: 'చదవండి',
    viewingLabel: 'చూస్తున్నది:',
    openModalBtn: 'పూర్తి మోనోగ్రాఫ్ విండో తెరవండి',
    emptySelect: 'పూర్తి పరిశోధనా వ్యాసాన్ని చదవడానికి జాబితా నుండి ఒక వ్యాసాన్ని ఎంచుకోండి.',
    closeMonograph: 'మోనోగ్రాఫ్ మూసివేయండి'
  },
  kn: {
    catAll: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
    catOdra: 'ಓಡ್ರ ದೇಶ ಮತ್ತು ಭೂಗೋಳ',
    catGajapathi: 'ಗಜಪತಿ ರಾಜರು ಮತ್ತು ಸಾಮ್ರಾಜ್ಯ',
    catDynasties: 'ರಾಜವಂಶಗಳು ಮತ್ತು ವಂಶಾವಳಿ',
    catKings: 'ರಾಜರು ಮತ್ತು ಆದಿಪುರುಷರು',
    catInscriptions: 'ಶಾಸನಗಳು ಮತ್ತು ಎಪಿಗ್ರಫಿ',
    catCulture: 'ಸಂಸ್ಕೃತಿ ಮತ್ತು ಸಮುದಾಯ',
    readBtn: 'ಓದಿ',
    viewingLabel: 'ವೀಕ್ಷಿಸಲಾಗುತ್ತಿದೆ:',
    openModalBtn: 'ಪೂರ್ಣ ಮೊನೊಗ್ರಾಫ್ ವಿಂಡೋ ತೆರೆಯಿರಿ',
    emptySelect: 'ಸಂಪೂರ್ಣ ಸಂಶೋಧನಾ ಲೇಖನವನ್ನು ಓದಲು ಪಟ್ಟಿಯಿಂದ ಲೇಖನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    closeMonograph: 'ಮೊನೊಗ್ರಾಫ್ ಮುಚ್ಚಿ'
  },
  ta: {
    catAll: 'அனைத்து பிரிவுகள்',
    catOdra: 'ஒட்டர தேசம் & புவியியல்',
    catGajapathi: 'கஜபதி மன்னர்கள் & பேரரசு',
    catDynasties: 'வம்சங்கள் & வம்சாவளி',
    catKings: 'மன்னர்கள் & முன்னோடிகள்',
    catInscriptions: 'கல்வெட்டுகள் & சாசனங்கள்',
    catCulture: 'கலாச்சாரம் & சமூகம்',
    readBtn: 'படிக்க',
    viewingLabel: 'பார்க்கப்படுகிறது:',
    openModalBtn: 'முழு ஆய்வுக் கட்டுரை சாளரத்தைத் திற',
    emptySelect: 'முழுமையான வரலாற்று ஆய்வைப் படிக்க பட்டியலிலிருந்து ஒரு கட்டுரையைத் தேர்ந்தெடுக்கவும்.',
    closeMonograph: 'ஆய்வுக் கட்டுரையை மூடு'
  },
  mr: {
    catAll: 'सर्व श्रेणी',
    catOdra: 'ओड्र देश आणि भूगोल',
    catGajapathi: 'गजपती राजे आणि साम्राज्य',
    catDynasties: 'राजवंश आणि वंशावळ',
    catKings: 'राजे आणि पूर्वज',
    catInscriptions: 'शिलालेख आणि कोरीव लेख',
    catCulture: 'संस्कृती आणि समुदाय',
    readBtn: 'वाचा',
    viewingLabel: 'पाहत आहे:',
    openModalBtn: 'पूर्ण मोनोग्राफ विंडो उघडा',
    emptySelect: 'संपूर्ण संशोधन लेख वाचण्यासाठी यादीतून एक लेख निवडा.',
    closeMonograph: 'मोनोग्राफ बंद करा'
  },
  or: {
    catAll: 'ସମସ୍ତ ବିଭାଗ',
    catOdra: 'ଓଡ଼୍ର ଦେଶ ଓ ଭୂଗୋଳ',
    catGajapathi: 'ଗଜପତି ରାଜା ଓ ସାମ୍ରାଜ୍ୟ',
    catDynasties: 'ରାଜବଂଶ ଓ ବଂଶାବଳୀ',
    catKings: 'ରାଜା ଓ ଆଦିପୁରୁଷ',
    catInscriptions: 'ଶିଳାଲେଖ ଓ ଅଭିଲେଖ',
    catCulture: 'ସଂସ୍କୃତି ଓ ସମାଜ',
    readBtn: 'ପଢ଼ନ୍ତୁ',
    viewingLabel: 'দেখୁଛନ୍ତି:',
    openModalBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ମୋନୋଗ୍ରାଫ୍ ୱିଣ୍ଡୋ ଖୋଲନ୍ତୁ',
    emptySelect: 'ସମ୍ପୂର୍ଣ୍ଣ ଗବେଷଣା ପ୍ରବନ୍ଧ ପଢ଼ିବାକୁ ତାଲିକାରୁ ଗୋଟିଏ ପ୍ରବନ୍ଧ ବାଛନ୍ତୁ।',
    closeMonograph: 'ମୋନୋଗ୍ରାଫ୍ ବନ୍ଦ କରନ୍ତୁ'
  },
  bn: {
    catAll: 'সকল বিভাগ',
    catOdra: 'ওড্র দেশ ও ভূগোল',
    catGajapathi: 'গজপতি রাজা ও সাম্রাজ্য',
    catDynasties: 'রাজবংশ ও বংশলতিকা',
    catKings: 'রাজা ও আদিপুরুষ',
    catInscriptions: 'শিলালিপি ও অভিলেখ',
    catCulture: 'সংস্কৃতি ও সমাজ',
    readBtn: 'পড়ুন',
    viewingLabel: 'দেখছেন:',
    openModalBtn: 'সম্পূর্ণ মনোগ্রাফ উইন্ডো খুলুন',
    emptySelect: 'সম্পূর্ণ গবেষণা নিবন্ধটি পড়তে তালিকা থেকে একটি নিবন্ধ নির্বাচন করুন।',
    closeMonograph: 'মনোগ্রাফ বন্ধ করুন'
  }
};
import {
  BookOpen,
  Search,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ArticleDetailView } from '../components/ArticleDetailView';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { useLanguage } from '../context/LanguageContext';
import { getAllArticles } from '../data/articlesRepository';

interface DocumentaryPageProps {
  initialArticleId?: string | null;
  onNavigate: (path: string) => void;
}

export const HistoricalDocumentaryPage: React.FC<DocumentaryPageProps> = ({ initialArticleId, onNavigate }) => {
  const { language, t, translationManager, getArticleContent, getMetadataLabel } = useLanguage();
  const ui = DOC_PAGE_UI[language] || DOC_PAGE_UI.en;
  
  // Guarantee immediate 100% visibility in any browser with zero network latency
  const initialArticles = getAllArticles(language);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => {
    if (initialArticleId) {
      const match = initialArticles.find(a => a.id === initialArticleId || a.slug === initialArticleId);
      if (match) return match;
    }
    return initialArticles[0] || null;
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(() => Boolean(initialArticleId));
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize articles on language change, with background server sync
  useEffect(() => {
    const updated = getAllArticles(language);
    setArticles(updated);
    setSelectedArticle(prev => {
      if (!prev) return updated[0] || null;
      return updated.find(a => a.id === prev.id) || updated[0] || null;
    });

    translationManager.fetchArticles(language).then(remote => {
      if (remote && remote.length > 0) {
        setArticles(remote);
      }
    }).catch(() => {
      // Offline or network restricted - repository already provided full content
    });
  }, [language, translationManager]);

  // Update selected article if URL query param changes and open modal
  useEffect(() => {
    if (initialArticleId) {
      const found = articles.find(a => a.id === initialArticleId || a.slug === initialArticleId);
      if (found) {
        setSelectedArticle(found);
        setIsModalOpen(true);
      }
    }
  }, [initialArticleId, articles]);

  const categories = [
    { key: 'all', label: ui.catAll },
    { key: 'Odra Desha & Regional History', label: ui.catOdra },
    { key: 'Gajapathi Kingdom & Empire', label: ui.catGajapathi },
    { key: 'Dynasties and Genealogy', label: ui.catDynasties },
    { key: 'Kings and Queens', label: ui.catKings },
    { key: 'Inscriptions and Archaeological Evidence', label: ui.catInscriptions },
    { key: 'Culture & Heritage', label: ui.catCulture }
  ];

  const normQuery = (searchQuery || '').normalize('NFC').toLowerCase().trim();

  const filteredArticles = articles.filter(a => {
    if (activeCategory !== 'all') {
      const catKey = a.category.toLowerCase();
      const targetCat = activeCategory.toLowerCase();
      if (!catKey.includes(targetCat.split(' ')[0])) return false;
    }

    if (!normQuery) return true;

    const { title, summary } = getArticleContent(a);
    const normTitle = (title || '').normalize('NFC').toLowerCase();
    const normSummary = (summary || '').normalize('NFC').toLowerCase();
    const normOrigTitle = (a.original_title || '').normalize('NFC').toLowerCase();
    const normOrigSummary = (a.summary || '').normalize('NFC').toLowerCase();
    const normCat = (a.category || '').normalize('NFC').toLowerCase();

    return (
      normTitle.includes(normQuery) ||
      normSummary.includes(normQuery) ||
      normOrigTitle.includes(normQuery) ||
      normOrigSummary.includes(normQuery) ||
      normCat.includes(normQuery) ||
      a.tags.some(tag => (tag || '').normalize('NFC').toLowerCase().includes(normQuery))
    );
  });

  const modalItem: ContentDetailItem | null = selectedArticle
    ? (() => {
        const { title, summary, content } = getArticleContent(selectedArticle);
        return {
          id: selectedArticle.id,
          badge: t.documentary?.badge || 'Suryavamsha Historical Monograph Treatise',
          category: getMetadataLabel('category', selectedArticle.category) || selectedArticle.category,
          title,
          datesOrEra: selectedArticle.publication_date,
          authorOrRuler: `Author / Compiler: ${selectedArticle.author_name}`,
          imageUrl: selectedArticle.featured_image,
          imageCaption: `${title} (${selectedArticle.category})`,
          imageStyle: 'banner',
          evidenceCategory: selectedArticle.evidence_category,
          verificationStatus: selectedArticle.verification_status,
          summary,
          content,
          sources: (selectedArticle.sources || []).map((src, i) => ({
            id: src.id || `src-${i}`,
            source_type: src.source_type,
            title: src.title,
            details: `${src.author_or_authority} • ${src.publication_or_location} (${src.year_or_era}) — ${src.citation_details}`,
            verified: src.verified
          })),
          tags: selectedArticle.tags,
          shareUrl: `${window.location.origin}${window.location.pathname}?article=${encodeURIComponent(selectedArticle.id)}`,
          actionButton: {
            label: t.nav?.inscriptions || 'Explore Epigraphic Corpus',
            onClick: () => onNavigate('/inscriptions')
          }
        };
      })()
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <BookOpen className="w-4 h-4" />
          <span>{t.documentary?.badge || 'Historical Knowledge Repository'}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {t.documentary?.title || 'Historical Documentary: Odra Desha & Suryavamsha Gajapathis'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {t.documentary?.subtitle || 'Searchable, structured historical repository dividing verified epigraphic evidence, royal administrative records, dynastic genealogies, and regional geopolitical developments.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#121622] border border-stone-800 shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#c99738] text-[#300207] font-bold shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-[#d4af37] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.documentary?.searchPlaceholder || 'Search documentary monographs...'}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#182030] text-stone-200 border border-stone-700 focus:outline-none focus:border-[#c99738]"
          />
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Monograph Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-2 flex items-center justify-between">
            <span>{t.documentary?.monographsList || 'Historical Monographs'} ({filteredArticles.length})</span>
            <span className="text-[10px] text-stone-500 lowercase">8 languages active</span>
          </div>

          <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1 scrollbar-thin">
            {filteredArticles.map(art => {
              const isSelected = selectedArticle?.id === art.id;
              const { title: displayTitle, summary: displaySummary } = getArticleContent(art);

              return (
                <div
                  key={art.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedArticle(art);
                    setIsModalOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedArticle(art);
                      setIsModalOpen(true);
                    }
                  }}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all duration-150 flex flex-col justify-between group relative ${
                    isSelected
                      ? 'bg-[#580014]/40 border-[#d4af37] shadow-[0_0_15px_rgba(201,151,56,0.15)]'
                      : 'bg-[#131724] border-stone-800/80 hover:border-stone-700 hover:bg-[#181e2e]'
                  }`}
                  aria-label={`Open monograph: ${displayTitle}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#d4af37]">
                        {getMetadataLabel('category', art.category) || art.category}
                      </span>
                      <EvidenceBadge category={art.evidence_category} size="sm" />
                    </div>

                    <h3 className="font-royal-heading font-bold text-sm text-stone-100 line-clamp-2 leading-snug group-hover:text-[#fae29c] transition-colors">
                      {displayTitle}
                    </h3>

                    <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                      {displaySummary}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="truncate max-w-[120px]">{art.author_name}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span>{art.publication_date}</span>
                      <span className="inline-flex items-center gap-0.5 text-[#d4af37] text-[10px] font-semibold group-hover:translate-x-0.5 transition-transform">
                        <span>{ui.readBtn}</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Unified, Standardized Article Detail View */}
        <div className="lg:col-span-8">
          {selectedArticle ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 bg-[#121622] p-3 rounded-2xl border border-stone-800">
                <span className="text-xs text-stone-400 font-royal-heading">
                  {ui.viewingLabel} <strong className="text-[#fae29c]">{getArticleContent(selectedArticle).title}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#580014] hover:bg-[#72001a] text-[#fae29c] border border-[#d4af37]/60 transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
                  title={ui.openModalBtn}
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{ui.openModalBtn}</span>
                </button>
              </div>

              <ArticleDetailView
                article={selectedArticle}
                onBack={() => onNavigate('/')}
                onSelectArticle={(art) => {
                  setSelectedArticle(art);
                  setIsModalOpen(true);
                }}
                allArticles={articles}
                showLanguageSwitcher={false}
              />
            </div>
          ) : (
            <div className="rounded-3xl bg-[#111520] border border-stone-800 p-12 text-center text-stone-400">
              {ui.emptySelect}
            </div>
          )}
        </div>
      </div>

      {/* Shared Reusable Content Detail Modal */}
      <ContentDetailModal
        item={modalItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeLabel={ui.closeMonograph}
      />
    </div>
  );
};


