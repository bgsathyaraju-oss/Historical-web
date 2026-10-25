import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { Landmark } from 'lucide-react';
import { LightboxModal } from '../components/LightboxModal';
import { getCanonicalGallery } from '../data/archivalSeedData';
import { useLanguage } from '../context/LanguageContext';

const GALLERY_PAGE_HEADER: Record<string, { badge: string; title: string; subtitle: string; cats: Record<string, string> }> = {
  en: {
    badge: 'Visual Preservation & Photographic Archives',
    title: 'Historical Gallery & Archival Imagery',
    subtitle: 'High-resolution photographic documentation of dressed stone ramparts, temple architecture, palm-leaf manuscripts, and cartographic reconstructions. Click any image to view licensing, provenance, and archival details.',
    cats: { all: 'All Artifacts', forts: 'Forts & Citadels', temples: 'Temples & Monuments', sculptures: 'Sculptures', manuscripts: 'Manuscripts', maps: 'Historical Maps' }
  },
  hi: {
    badge: 'दृश्य संरक्षण एवं छायाचित्र अभिलेखागार',
    title: 'ऐतिहासिक दीर्घा एवं पुरातात्विक चित्र',
    subtitle: 'प्रस्तर दुर्गों, मंदिर स्थापत्य, ताड़पत्र पांडुलिपियों और ऐतिहासिक मानचित्रों का उच्च-रिज़ॉल्यूशन छायाचित्र संग्रह।',
    cats: { all: 'सभी कलाकृतियां', forts: 'दुर्ग एवं किले', temples: 'मंदिर एवं स्मारक', sculptures: 'मूर्तियां', manuscripts: 'पांडुलिपियां', maps: 'ऐतिहासिक मानचित्र' }
  },
  te: {
    badge: 'దృశ్య సంరక్షణ & చారిత్రక ఛాయాచిత్ర భాండాగారం',
    title: 'చారిత్రక గ్యాలరీ & పురాతత్వ చిత్రాలు',
    subtitle: 'రాతి కోట బురుజులు, ఆలయ శిల్పకళ, తాళపత్ర గ్రంథాలు మరియు చారిత్రక పటాల ఛాయాచిత్ర సేకరణ. పూర్తి వివరాల కోసం ఏదైనా చిత్రంపై క్లిక్ చేయండి.',
    cats: { all: 'అన్ని కళాఖండాలు', forts: 'కోటలు & దుర్గాలు', temples: 'ఆలయాలు & స్మారకాలు', sculptures: 'శిల్పాలు', manuscripts: 'తాళపత్రాలు', maps: 'చారిత్రక పటాలు' }
  },
  kn: {
    badge: 'ದೃಶ್ಯ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಛಾಯಾಚಿತ್ರ ಪತ್ರಾಗಾರ',
    title: 'ಐತಿಹಾಸಿಕ ಗ್ಯಾಲರಿ ಮತ್ತು ಪುರಾತತ್ವ ಚಿತ್ರಗಳು',
    subtitle: 'ಕಲ್ಲಿನ ಕೋಟೆಗಳು, ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ, ತಾಳೆಗರಿಯ ಹಸ್ತಪ್ರತಿಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ನಕ್ಷೆಗಳ ಛಾಯಾಚಿತ್ರ ದಾಖಲಾತಿ.',
    cats: { all: 'ಎಲ್ಲಾ ಕಲಾಕೃತಿಗಳು', forts: 'ಕೋಟೆಗಳು ಮತ್ತು ದುರ್ಗಗಳು', temples: 'ದೇವಾಲಯಗಳು ಮತ್ತು ಸ್ಮಾರಕಗಳು', sculptures: 'ಶಿಲ್ಪಗಳು', manuscripts: 'ಹಸ್ತಪ್ರತಿಗಳು', maps: 'ಐತಿಹಾಸಿಕ ನಕ್ಷೆಗಳು' }
  },
  ta: {
    badge: 'காட்சிப் பாதுகாப்பு மற்றும் புகைப்பட ஆவணக் காப்பகம்',
    title: 'வரலாற்று புகைப்படத் தொகுப்பு மற்றும் ஆவணப் படங்கள்',
    subtitle: 'கற்கோட்டைகள், கோயில் கட்டிடக்கலை, ஓலைச்சுவடிகள் மற்றும் வரலாற்று வரைபடங்களின் புகைப்பட ஆவணங்கள்.',
    cats: { all: 'அனைத்து கலைப்பொருட்கள்', forts: 'கோட்டைகள் & அரண்கள்', temples: 'கோயில்கள் & நினைவுச்சின்னங்கள்', sculptures: 'சிற்பங்கள்', manuscripts: 'ஓலைச்சுவடிகள்', maps: 'வரலாற்று வரைபடங்கள்' }
  },
  mr: {
    badge: 'दृश्य जतन आणि छायाचित्र अभिलेखागार',
    title: 'ऐतिहासिक दालन आणि पुरातन छायाचित्रे',
    subtitle: 'दगडी तटबंदी, मंदिर स्थापत्य, ताडपत्र हस्तलिखिते आणि ऐतिहासिक नकाशांचे उच्च-रिझोल्यूशन छायाचित्रण.',
    cats: { all: 'सर्व कलाकृती', forts: 'किल्ले आणि गड', temples: 'मंदिरे आणि स्मारके', sculptures: 'शिल्पे', manuscripts: 'हस्तलिखिते', maps: 'ऐतिहासिक नकाशे' }
  },
  or: {
    badge: 'ଦୃଶ୍ୟ ସଂରକ୍ଷଣ ଓ ଫଟୋଗ୍ରାଫিক୍ ଅଭିଲେଖାଗାର',
    title: 'ଐତିହାସିକ ଗ୍ୟାଲେରୀ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଚିତ୍ର',
    subtitle: 'ପଥର ଦୁର୍ଗ ପ୍ରାଚୀର, ମନ୍ଦିର ସ୍ଥାପତ୍ୟ, ତାଳପତ୍ର ପୋଥି ଏବଂ ଐତିହାସିକ ମାନଚିତ୍ରର ଉଚ୍ଚ-ମାନର ଫଟୋଚିତ୍ର ସଂଗ୍ରହ।',
    cats: { all: 'ସମସ୍ତ କଳାକୃତି', forts: 'ଦୁର୍ଗ ଓ ଗଡ଼', temples: 'ମନ୍ଦିର ଓ ସ୍ମାରକୀ', sculptures: 'ଭାସ୍କର୍ଯ୍ୟ', manuscripts: 'ତାଳପତ୍ର ପୋଥି', maps: 'ଐତିହାସିକ ମାନଚିତ୍ର' }
  },
  bn: {
    badge: 'দৃশ্য সংরক্ষণ ও আলোকচিত্র মহাফেজখানা',
    title: 'ঐতিহাসিক গ্যালারি ও প্রত্নতাত্ত্বিক চিত্রাবলী',
    subtitle: 'পাথরের দুর্গ প্রাচীর, মন্দির স্থাপত্য, তালপাতার পুঁথি এবং ঐতিহাসিক মানচিত্রের আলোকচিত্র সংগ্রহ।',
    cats: { all: 'সকল নিদর্শন', forts: 'দুর্গ ও গড়', temples: 'মন্দির ও স্মৃতিস্তম্ভ', sculptures: 'ভাস্কর্য', manuscripts: 'পাণ্ডুলিপি', maps: 'ঐতিহাসিক মানচিত্র' }
  }
};

export const HistoricalGalleryPage: React.FC = () => {
  const { language } = useLanguage();
  const hdr = GALLERY_PAGE_HEADER[language] || GALLERY_PAGE_HEADER.en;

  const [items, setItems] = useState<GalleryItem[]>(() => getCanonicalGallery(language));
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allLocal = getCanonicalGallery(language);
    const localFiltered =
      activeCategory === 'all'
        ? allLocal
        : allLocal.filter(g => g.category === activeCategory);
    setItems(localFiltered);
    setSelectedItem(prev => prev ? (allLocal.find(g => g.id === prev.id) || prev) : null);

    fetch(`/api/content/gallery?category=${activeCategory}&lang=${language}`)
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (d?.gallery && d.gallery.length > 0) {
          setItems(d.gallery);
          setSelectedItem(prev => prev ? (d.gallery.find((g: GalleryItem) => g.id === prev.id) || prev) : null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeCategory, language]);

  const categories = [
    { id: 'all', label: hdr.cats.all },
    { id: 'forts', label: hdr.cats.forts },
    { id: 'temples', label: hdr.cats.temples },
    { id: 'sculptures', label: hdr.cats.sculptures },
    { id: 'manuscripts', label: hdr.cats.manuscripts },
    { id: 'maps', label: hdr.cats.maps }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-800">
        {categories.map(cat => (
          <button
            key={cat.id}
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group rounded-2xl overflow-hidden bg-[#121622] border border-stone-800 hover:border-[#c99738] shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="h-56 overflow-hidden relative">
              <img
                src={item.image_url}
                alt={item.alt_text}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#fcedc7] bg-[#580014]/90 px-2.5 py-1 rounded-full border border-[#d4af37]/40">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-[#d4af37] font-semibold">
                  {item.period} • {item.location}
                </span>
                <h3 className="font-royal-heading font-bold text-base text-stone-100 group-hover:text-[#e8c872] transition-colors leading-snug mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/80 text-[11px] text-stone-500 flex items-center justify-between">
                <span>License: {item.copyright_license}</span>
                <span className="text-[#e8c872] font-semibold">Inspect Record →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
