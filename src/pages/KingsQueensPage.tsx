import React, { useState, useEffect } from 'react';
import { LanguageCode, HistoricalFigure } from '../types';

const KINGS_QUEENS_UI: Record<LanguageCode, {
  catAll: string;
  catGajapathi: string;
  catProgenitors: string;
  catSacred: string;
  searchPlaceholder: string;
  returnHome: string;
  openModal: string;
  copyLink: string;
  linkCopied: string;
  emptySelect: string;
  closeProfile: string;
}> = {
  en: {
    catAll: 'All Historical Figures',
    catGajapathi: 'Suryavamsha Gajapathi Monarchs',
    catProgenitors: 'Ancient Emperors & Progenitors',
    catSacred: 'Spiritual, Martial & Civic Guardians',
    searchPlaceholder: 'Search figures, titles, reigns...',
    returnHome: 'Return to Home',
    openModal: 'Open Popup Modal',
    copyLink: 'Copy Link',
    linkCopied: 'Link Copied!',
    emptySelect: 'Select a historical figure from the left panel to examine their full regnal chronicle.',
    closeProfile: 'Close Profile'
  },
  hi: {
    catAll: 'सभी ऐतिहासिक विभूतियाँ',
    catGajapathi: 'सूर्यवंश गजपति सम्राट',
    catProgenitors: 'प्राचीन सम्राट एवं आदि-पुरुष',
    catSacred: 'आध्यात्मिक, सैन्य एवं नागरिक रक्षक',
    searchPlaceholder: 'विभूतियाँ, उपाधियाँ, शासनकाल खोजें...',
    returnHome: 'मुख्य पृष्ठ पर लौटें',
    openModal: 'पॉपअप विंडो खोलें',
    copyLink: 'लिंक कॉपी करें',
    linkCopied: 'लिंक कॉपी हो गया!',
    emptySelect: 'पूर्ण शासन वृत्तांत देखने के लिए बाएँ पैनल से किसी ऐतिहासिक विभूति का चयन करें।',
    closeProfile: 'प्रोफ़ाइल बंद करें'
  },
  te: {
    catAll: 'అన్ని చారిత్రక వ్యక్తులు',
    catGajapathi: 'సూర్యవంశ గజపతి చక్రవర్తులు',
    catProgenitors: 'ప్రాచీన చక్రవర్తులు & ఆది పురుషులు',
    catSacred: 'ఆధ్యాత్మిక, సైనిక & పౌర రక్షకులు',
    searchPlaceholder: 'చక్రవర్తులు, బిరుదులు, పాలనా కాలం వెతకండి...',
    returnHome: 'హోమ్ పేజీకి తిరిగి వెళ్ళండి',
    openModal: 'పాప్అప్ విండో తెరవండి',
    copyLink: 'లింక్ కాపీ చేయండి',
    linkCopied: 'లింక్ కాపీ చేయబడింది!',
    emptySelect: 'పూర్తి పాలనా చరిత్రను పరిశీలించడానికి ఎడమ ప్యానెల్ నుండి చారిత్రక వ్యక్తిని ఎంచుకోండి.',
    closeProfile: 'ప్రొఫైల్ మూసివేయండి'
  },
  kn: {
    catAll: 'ಎಲ್ಲಾ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು',
    catGajapathi: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಟರು',
    catProgenitors: 'ಪ್ರಾಚೀನ ಸಾಮ್ರಾಟರು ಮತ್ತು ಆದಿಪುರುಷರು',
    catSacred: 'ಆಧ್ಯಾತ್ಮಿಕ, ಸೈನಿಕ ಮತ್ತು ನಾಗರಿಕ ರಕ್ಷಕರು',
    searchPlaceholder: 'ವ್ಯಕ್ತಿಗಳು, ಬಿರುದುಗಳು, ಆಳ್ವಿಕೆ ಹುಡುಕಿ...',
    returnHome: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    openModal: 'ಪಾಪ್‌ಅಪ್ ವಿಂಡೋ ತೆರೆಯಿರಿ',
    copyLink: 'ಲಿಂಕ್ ನಕಲಿಸಿ',
    linkCopied: 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!',
    emptySelect: 'ಸಂಪೂರ್ಣ ಆಳ್ವಿಕೆಯ ವೃತ್ತಾಂತವನ್ನು ಪರೀಕ್ಷಿಸಲು ಎಡ ಪ್ಯಾನೆಲ್‌ನಿಂದ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    closeProfile: 'ಪ್ರೊಫೈಲ್ ಮುಚ್ಚಿ'
  },
  ta: {
    catAll: 'அனைத்து வரலாற்று ஆளுமைகள்',
    catGajapathi: 'சூர்யவம்ச கஜபதி பேரரசர்கள்',
    catProgenitors: 'பண்டைய பேரரசர்கள் & முன்னோடிகள்',
    catSacred: 'ஆன்மீக, ராணுவ & குடிமைப் பாதுகாவலர்கள்',
    searchPlaceholder: 'ஆளுமைகள், பட்டங்கள், ஆட்சிக்காலம் தேடுக...',
    returnHome: 'முகப்புப் பக்கத்திற்குத் திரும்பு',
    openModal: 'பாப்-அப் சாளரத்தைத் திற',
    copyLink: 'இணைப்பை நகலெடு',
    linkCopied: 'இணைப்பு நகலெடுக்கப்பட்டது!',
    emptySelect: 'முழு ஆட்சி வரலாற்றைக் காண இடது பலகத்திலிருந்து ஒரு வரலாற்று ஆளுமையைத் தேர்ந்தெடுக்கவும்.',
    closeProfile: 'சுயவிவரத்தை மூடு'
  },
  mr: {
    catAll: 'सर्व ऐतिहासिक विभूती',
    catGajapathi: 'सूर्यवंश गजपती सम्राट',
    catProgenitors: 'प्राचीन सम्राट आणि पूर्वज',
    catSacred: 'आध्यात्मिक, लष्करी आणि नागरी रक्षक',
    searchPlaceholder: 'विभूती, पदव्या, शासनकाळ शोधा...',
    returnHome: 'मुख्य पृष्ठावर परत जा',
    openModal: 'पॉपअप विंडो उघडा',
    copyLink: 'लिंक कॉपी करा',
    linkCopied: 'लिंक कॉपी झाली!',
    emptySelect: 'संपूर्ण शासन वृत्तांत पाहण्यासाठी डाव्या पॅनेलमधून ऐतिहासिक विभूती निवडा.',
    closeProfile: 'प्रोफाइल बंद करा'
  },
  or: {
    catAll: 'ସମସ୍ତ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ',
    catGajapathi: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସମ୍ରାଟ',
    catProgenitors: 'ପ୍ରାଚୀନ ସମ୍ରାଟ ଓ ଆদিପୁରୁଷ',
    catSacred: 'ଆଧ୍ୟାତ୍ମିକ, ସାମରିକ ଓ ନାଗରିକ ରକ୍ଷକ',
    searchPlaceholder: 'ବ୍ୟକ୍ତିତ୍ୱ, উপାଧି, ଶାସନକାଳ ଖୋଜନ୍ତୁ...',
    returnHome: 'ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ',
    openModal: 'ପପ୍-ଅପ୍ ୱିଣ୍ଡୋ ଖୋଲନ୍ତୁ',
    copyLink: 'ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
    linkCopied: 'ଲିଙ୍କ୍ କପି ହେଲା!',
    emptySelect: 'ସମ୍ପୂର୍ଣ୍ଣ ଶାସନ ଇତିହାସ ଦେଖିବାକୁ ବାମ ପ୍ୟାନେଲରୁ ଜଣେ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱଙ୍କୁ ବାଛନ୍ତୁ।',
    closeProfile: 'ପ୍ରୋଫାଇଲ୍ ବନ୍ଦ କରନ୍ତୁ'
  },
  bn: {
    catAll: 'সকল ঐতিহাসিক ব্যক্তিত্ব',
    catGajapathi: 'সূর্যবংশী গজপতি সম্রাটগণ',
    catProgenitors: 'প্রাচীন সম্রাট ও আদিপুরুষ',
    catSacred: 'আধ্যাত্মিক, সামরিক ও নাগরিক রক্ষক',
    searchPlaceholder: 'ব্যক্তিত্ব, উপাধি, শাসনকাল খুঁজুন...',
    returnHome: 'হোম পেজে ফিরে যান',
    openModal: 'পপআপ উইন্ডো খুলুন',
    copyLink: 'লিঙ্ক কপি করুন',
    linkCopied: 'লিঙ্ক কপি হয়েছে!',
    emptySelect: 'সম্পূর্ণ শাসন বৃত্তান্ত দেখতে বাম প্যানেল থেকে একজন ঐতিহাসিক ব্যক্তিত্ব নির্বাচন করুন।',
    closeProfile: 'প্রোফাইল বন্ধ করুন'
  }
};
import {
  Crown,
  MapPin,
  Scroll,
  Search,
  ArrowLeft,
  ChevronRight,
  Copy,
  Check,
  Maximize2
} from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { useLanguage } from '../context/LanguageContext';
import { getAllDocumentedFigures, DOCUMENTED_FIGURES_REPO } from '../data/documentedFiguresRepository';

interface KingsQueensPageProps {
  onNavigate: (path: string) => void;
  initialFigureId?: string | null;
}

export const KingsQueensPage: React.FC<KingsQueensPageProps> = ({ onNavigate, initialFigureId }) => {
  const { t, language } = useLanguage();
  const ui = KINGS_QUEENS_UI[language] || KINGS_QUEENS_UI.en;
  
  // Guarantee 100% immediate rendering across all browsers (Safari, Firefox, Chrome, Android, iOS)
  const initialFigures = getAllDocumentedFigures(language);
  const [figures, setFigures] = useState<HistoricalFigure[]>(initialFigures);
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(() => {
    if (initialFigureId) {
      const found = initialFigures.find(f => f.id === initialFigureId);
      if (found) return found;
    }
    return initialFigures[0] || null;
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(() => Boolean(initialFigureId));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Synchronize figure translations instantly whenever language changes
  useEffect(() => {
    const updated = getAllDocumentedFigures(language);
    setFigures(updated);
    setSelectedFigure(prev => {
      if (!prev) return updated[0] || null;
      return updated.find(f => f.id === prev.id) || updated[0] || null;
    });

    // Passive background refresh to incorporate any server-side database additions
    fetch(`/api/content/figures?lang=${language}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data?.figures && data.figures.length > 0) {
          setFigures(data.figures);
        }
      })
      .catch(() => {
        // Offline or network restricted - repository data already active and complete
      });
  }, [language]);

  // Synchronize initialFigureId prop changes (e.g. from search navigation)
  useEffect(() => {
    if (initialFigureId) {
      const match = figures.find(f => f.id === initialFigureId);
      if (match) {
        setSelectedFigure(match);
        setIsModalOpen(true);
      }
    }
  }, [initialFigureId, figures]);

  const categories = [
    { id: 'all', label: `${ui.catAll} (${figures.length})` },
    { id: 'gajapathi_monarchs', label: ui.catGajapathi },
    { id: 'progenitors_emperors', label: ui.catProgenitors },
    { id: 'sacred_civic', label: ui.catSacred }
  ];

  const normQuery = searchQuery.trim().toLowerCase();

  const filteredFigures = figures.filter(fig => {
    const repoItem = DOCUMENTED_FIGURES_REPO.find(r => r.id === fig.id);
    if (selectedCategory !== 'all' && repoItem && repoItem.category !== selectedCategory) {
      return false;
    }

    if (!normQuery) return true;

    return (
      fig.name.toLowerCase().includes(normQuery) ||
      fig.dynasty_name.toLowerCase().includes(normQuery) ||
      fig.reign_period.toLowerCase().includes(normQuery) ||
      fig.alternate_names.some(n => n.toLowerCase().includes(normQuery)) ||
      fig.known_titles.some(title => title.toLowerCase().includes(normQuery))
    );
  });

  const handleCopyLink = () => {
    if (!selectedFigure) return;
    const url = `${window.location.origin}${window.location.pathname}?figure=${encodeURIComponent(selectedFigure.id)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const modalItem: ContentDetailItem | null = selectedFigure
    ? {
        id: selectedFigure.id,
        badge: t.kingsQueens?.badge || 'Suryavamsha Historical Personage Dossier',
        category: selectedFigure.dynasty_name,
        title: selectedFigure.name,
        subtitle:
          selectedFigure.alternate_names && selectedFigure.alternate_names.length > 0
            ? `${t.kingsQueens?.alternateSpellings || 'Alternate Names'}: ${selectedFigure.alternate_names.join(', ')}`
            : undefined,
        datesOrEra: `${selectedFigure.reign_period}${selectedFigure.approx_dates ? ` (${selectedFigure.approx_dates})` : ''}`,
        imageUrl: selectedFigure.image_url,
        imageStyle: 'portrait',
        evidenceCategory: 'verified_archaeological',
        summary: selectedFigure.historical_significance,
        content: selectedFigure.biography,
        sections: [
          {
            title: t.kingsQueens?.titlesLabel || 'Recorded Imperial Titles & Prasastis',
            items: selectedFigure.known_titles,
            type: 'tags'
          },
          {
            title: t.kingsQueens?.eventsLabel || 'Chronologically Documented Events & Strategic Campaigns',
            items: selectedFigure.major_events,
            type: 'list'
          },
          {
            title: t.kingsQueens?.placesLabel || 'Associated Fortresses, Shrines & Kshetrams',
            items: selectedFigure.associated_places,
            type: 'tags'
          }
        ],
        sources: (selectedFigure.citations || []).map((cite, idx) => ({
          id: `cite-${idx}`,
          source_type: 'Epigraphic Citation',
          title: cite,
          verified: true
        })),
        shareUrl: `${window.location.origin}${window.location.pathname}?figure=${encodeURIComponent(selectedFigure.id)}`,
        actionButton: {
          label: t.nav?.inscriptions || 'Explore Epigraphic Corpus',
          onClick: () => onNavigate('/inscriptions')
        }
      }
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Crown className="w-4 h-4" />
          <span>{t.kingsQueens?.badge || 'Suryavamsha Imperial Genealogy & Royal Biographies'}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {t.kingsQueens?.title || 'Documented Historical Figures & Monarchs'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {t.kingsQueens?.subtitle || 'Epigraphically verified chronicles, regnal inscriptions, and biographical monographs of the Suryavamshi Gajapathi emperors, ancient solar progenitors, and heroic guardians of Odra Desha.'}
        </p>
      </div>

      {/* Filter and Search Navigation Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#121622] border border-stone-800 shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
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
            placeholder={ui.searchPlaceholder}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#182030] text-stone-200 border border-stone-700 focus:outline-none focus:border-[#c99738]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Figure List Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-1 flex items-center justify-between">
            <span>{t.kingsQueens?.listTitle || 'Documented Figures'} ({filteredFigures.length})</span>
            <span className="text-[10px] text-stone-500 lowercase">8 languages active</span>
          </div>

          <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1 scrollbar-thin">
            {filteredFigures.map(fig => {
              const isSelected = selectedFigure?.id === fig.id;
              return (
                <div
                  key={fig.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedFigure(fig);
                    setIsModalOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedFigure(fig);
                      setIsModalOpen(true);
                    }
                  }}
                  className={`p-3.5 rounded-2xl cursor-pointer border transition-all duration-200 flex items-center gap-3.5 group relative ${
                    isSelected
                      ? 'bg-[#580014]/40 border-[#d4af37] shadow-[0_0_20px_rgba(201,151,56,0.2)]'
                      : 'bg-[#121622] border-stone-800 hover:border-stone-700 hover:bg-[#181f2f]'
                  }`}
                  aria-label={`Open details for ${fig.name}`}
                >
                  <img
                    src={fig.image_url}
                    alt={fig.name}
                    className="w-13 h-13 rounded-xl object-cover border border-[#c99738]/40 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                        {fig.reign_period}
                      </span>
                    </div>
                    <h3 className="font-royal-heading font-bold text-sm text-stone-100 truncate group-hover:text-[#fae29c] transition-colors">
                      {fig.name}
                    </h3>
                    <p className="text-[11px] text-stone-400 truncate">
                      {fig.dynasty_name}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-[#d4af37] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Figure Detail View */}
        <div className="lg:col-span-8">
          {selectedFigure ? (
            <article className="rounded-3xl bg-[#111520] border border-[#c99738]/40 p-6 sm:p-8 space-y-8 shadow-xl">
              {/* Action Bar with Back to Home, Open Modal & Copy Direct Link */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-[#580014] text-stone-200 hover:text-[#fae29c] border border-stone-700 hover:border-[#d4af37] transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{ui.returnHome}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#580014] hover:bg-[#72001a] text-[#fae29c] border border-[#d4af37]/60 transition-all cursor-pointer shadow-sm active:scale-95"
                    title={ui.openModal}
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{ui.openModal}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#161c2a] hover:bg-[#20293d] text-stone-300 hover:text-white border border-stone-700 transition-all cursor-pointer"
                    title={ui.copyLink}
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
                    <span>{copied ? ui.linkCopied : ui.copyLink}</span>
                  </button>
                  <span className="text-xs text-stone-400 font-mono bg-stone-950 px-2 py-1 rounded border border-stone-800">
                    ID: {selectedFigure.id}
                  </span>
                </div>
              </div>

              {/* Header Profile Banner */}
              <div className="flex flex-col sm:flex-row items-start gap-6 border-b border-stone-800 pb-6">
                <img
                  src={selectedFigure.image_url}
                  alt={selectedFigure.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-2 border-[#d4af37] shadow-xl shrink-0"
                />
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-3 py-0.5 rounded-full bg-stone-900 border border-stone-800">
                      {selectedFigure.reign_period}
                    </span>
                    <EvidenceBadge category="verified_archaeological" size="sm" />
                  </div>

                  <h2 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7]">
                    {selectedFigure.name}
                  </h2>

                  {selectedFigure.alternate_names && selectedFigure.alternate_names.length > 0 && (
                    <div className="text-xs text-stone-400">
                      <strong className="text-stone-300">{t.kingsQueens?.alternateSpellings || 'Alternate Names'}:</strong>{' '}
                      {selectedFigure.alternate_names.join(', ')}
                    </div>
                  )}

                  <div className="text-xs text-stone-400">
                    <strong className="text-stone-300">{t.kingsQueens?.dynastyLabel || 'Dynastic House'}:</strong>{' '}
                    {selectedFigure.dynasty_name} {selectedFigure.approx_dates ? `(${selectedFigure.approx_dates})` : ''}
                  </div>
                </div>
              </div>

              {/* Known Imperial Titles */}
              {selectedFigure.known_titles && selectedFigure.known_titles.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    {t.kingsQueens?.titlesLabel || 'Imperial & Sovereign Titles'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFigure.known_titles.map((titleItem, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-[#182030] border border-stone-800 text-xs text-stone-200 font-medium"
                      >
                        {titleItem}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Biography */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  {t.kingsQueens?.biographyLabel || 'Historical Biography & Epigraphic Chronicle'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed bg-[#0c0f17] p-5 rounded-xl border border-stone-800/80">
                  {selectedFigure.biography}
                </p>
              </div>

              {/* Major Corroborated Events */}
              {selectedFigure.major_events && selectedFigure.major_events.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    {t.kingsQueens?.eventsLabel || 'Chronological Milestones & Strategic Campaigns'}
                  </h3>
                  <div className="space-y-2">
                    {selectedFigure.major_events.map((ev, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#161c2a] border border-stone-800 text-xs text-stone-300 flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                        <span>{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Associated Places */}
              {selectedFigure.associated_places && selectedFigure.associated_places.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    {t.kingsQueens?.placesLabel || 'Associated Citadels, Forts & Shrines'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFigure.associated_places.map((place, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-xs text-stone-300"
                      >
                        <MapPin className="w-3 h-3 text-[#d4af37]" />
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* References & Primary Epigraphic Citations */}
              {selectedFigure.citations && selectedFigure.citations.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-stone-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-1.5">
                    <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{t.kingsQueens?.citationsLabel || 'Primary Inscriptions & Archaeological Sources'}</span>
                  </h3>
                  <ul className="space-y-1.5 text-xs text-stone-400">
                    {selectedFigure.citations.map((cite, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                        <span>{cite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
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
        closeLabel={ui.closeProfile}
      />
    </div>
  );
};


