import React, { useState, useEffect } from 'react';
import { HistoricalDocument } from '../types';
import { BookOpen, ArrowRight } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { getCanonicalDocuments } from '../data/archivalSeedData';
import { useLanguage } from '../context/LanguageContext';

const DOC_PAGE_HEADER: Record<string, { badge: string; title: string; subtitle: string; catalogLabel: string }> = {
  en: {
    badge: 'Archival Preservation & Manuscript Repository',
    title: 'Digitized Historical Documents & Royal Chronicles',
    subtitle: 'High-resolution records of palm-leaf manuscripts, temple chronicles (Madala Panji), legal codices (Sarasvati Vilasa), and copper-plate grants with provenance details and open educational licensing.',
    catalogLabel: 'Archival Catalog'
  },
  hi: {
    badge: 'अभिलेखीय संरक्षण एवं पांडुलिपि कोष',
    title: 'डिजिटल ऐतिहासिक दस्तावेज़ एवं राजकीय इतिवृत्त',
    subtitle: 'ताड़पत्र पांडुलिपियों, मंदिर इतिवृत्तों (मादला पांजी), विधिक संहिताओं (सरस्वती विलास) और ताम्रपत्रों का प्रामाणिक संग्रह।',
    catalogLabel: 'अभिलेखीय सूची'
  },
  te: {
    badge: 'పురాతన తాళపత్ర & చారిత్రక పత్రాల భాండాగారం',
    title: 'డిజిటలైజ్డ్ చారిత్రక పత్రాలు & రాజ వంశావళి గ్రంథాలు',
    subtitle: 'తాళపత్ర గ్రంథాలు, పూరి ఆలయ చరిత్ర (మాదళ పంజి), న్యాయ గ్రంథాలు (సరస్వతీ విలాసం) మరియు తామ్రశాసనాల ప్రామాణిక సేకరణ.',
    catalogLabel: 'చారిత్రక పత్రాల జాబితా'
  },
  kn: {
    badge: 'ಪುರಾತನ ಹಸ್ತಪ್ರತಿ ಮತ್ತು ದಾಖಲೆಗಳ ಸಂಗ್ರಹಾಲಯ',
    title: 'ಡಿಜಿಟಲ್ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು ಮತ್ತು ರಾಜ ವೃತ್ತಾಂತಗಳು',
    subtitle: 'ತಾಳೆಗರಿಯ ಹಸ್ತಪ್ರತಿಗಳು, ದೇವಾಲಯ ವೃತ್ತಾಂತಗಳು (ಮಾದಲಾ ಪಂಜಿ), ನ್ಯಾಯ ಗ್ರಂಥಗಳು (ಸರಸ್ವತೀ ವಿಲಾಸ) ಮತ್ತು ತಾಮ್ರಶಾಸನಗಳ ದಾಖಲಾತಿ.',
    catalogLabel: 'ದಾಖಲೆಗಳ ಪಟ್ಟಿ'
  },
  ta: {
    badge: 'ஆவணப் பாதுகாப்பு மற்றும் ஓலைச்சுவடி களஞ்சியம்',
    title: 'டிஜிட்டல் வரலாற்று ஆவணங்கள் மற்றும் அரச குறிப்புகள்',
    subtitle: 'ஓலைச்சுவடிகள், கோயில் வரலாறுகள் (மாதளா பஞ்சி), சட்ட நூல்கள் (சரஸ்வதி விலாசம்) மற்றும் செப்பேடுகளின் தொகுப்பு.',
    catalogLabel: 'ஆவணப் பட்டியல்'
  },
  mr: {
    badge: 'अभिलेखीय जतन आणि हस्तलिखित संग्रहालय',
    title: 'डिजिटल ऐतिहासिक दस्तऐवज आणि राजकीय बखरी',
    subtitle: 'ताडपत्र हस्तलिखिते, मंदिर इतिवृत्त (मादला पांजी), विधी संहिता (सरस्वती विलास) आणि ताम्रपटांचा प्रामाणिक संग्रह.',
    catalogLabel: 'दस्तऐवज सूची'
  },
  or: {
    badge: 'ଅଭିଲେଖ ସଂରକ୍ଷଣ ଓ తాଳପତ୍ର ପୋଥି ଭଣ୍ଡାର',
    title: 'ଡିଜିଟାଲ୍ ଐତିହାସିକ ଦଲିଲ ଓ ରାଜକୀୟ ଇତିବୃତ୍ତ',
    subtitle: 'ତାଳପତ୍ର ପୋଥି, ମାଦଳା ପାଞ୍ଜି, ଆଇନ ଗ୍ରନ୍ଥ (ସରସ୍ୱତୀ ବିଳାସ) ଏବଂ ତାମ୍ରଶାସନର ପ୍ରାମାଣିକ ସଂଗ୍ରହ।',
    catalogLabel: 'ଅଭିଲେଖ ତାଲିକା'
  },
  bn: {
    badge: 'আর্কাইভাল সংরক্ষণ ও পাণ্ডুলিপি ভাণ্ডার',
    title: 'ডিজিটাল ঐতিহাসিক নথিপত্র ও রাজকীয় ইতিবৃত্ত',
    subtitle: 'তালপাতার পুঁথি, মন্দির ইতিবৃত্ত (মাদলা পাঞ্জি), আইনগ্রন্থ (সরস্বতী বিলাস) এবং তাম্রশাসনের প্রামাণ্য সংগ্রহ।',
    catalogLabel: 'নথিপত্র তালিকা'
  }
};

export const HistoricalDocumentsPage: React.FC = () => {
  const { language } = useLanguage();
  const hdr = DOC_PAGE_HEADER[language] || DOC_PAGE_HEADER.en;

  const [documents, setDocuments] = useState<HistoricalDocument[]>(() => getCanonicalDocuments(language));
  const [selectedDoc, setSelectedDoc] = useState<HistoricalDocument | null>(() => getCanonicalDocuments(language)[0] || null);
  const [activeModalDoc, setActiveModalDoc] = useState<HistoricalDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localDocs = getCanonicalDocuments(language);
    setDocuments(localDocs);
    setSelectedDoc(prev => localDocs.find(doc => doc.id === prev?.id) || localDocs[0] || null);
    setActiveModalDoc(prev => prev ? (localDocs.find(doc => doc.id === prev.id) || prev) : null);

    fetch(`/api/content/documents?lang=${language}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.documents && d.documents.length > 0) {
          setDocuments(d.documents);
          setSelectedDoc(prev => d.documents.find((doc: HistoricalDocument) => doc.id === prev?.id) || d.documents[0]);
          setActiveModalDoc(prev => prev ? (d.documents.find((doc: HistoricalDocument) => doc.id === prev.id) || prev) : null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [language]);

  const buildDocumentModalItem = (doc: HistoricalDocument | null): ContentDetailItem | null => {
    if (!doc) return null;
    const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
    const docImageMap: Record<string, string> = {
      doc_madala_panji: `${base}odia_palm_leaf_manuscript.jpg`,
      doc_sarasvati_vilasa: `${base}prataparudra_deva.jpg`,
      doc_veligalani_charter: `${base}copper_plate_charter.jpg`
    };
    return {
      id: doc.id,
      title: doc.title,
      subtitle: `${doc.author_authority} • ${doc.approximate_date}`,
      badge: `${doc.original_language} • Archival Manuscript`,
      verificationStatus: doc.verification_status,
      imageUrl: docImageMap[doc.id] || `${base}odia_palm_leaf_manuscript.jpg`,
      imageLayout: 'banner',
      metadata: [
        { label: 'Author / Compiling Body', value: doc.author_authority },
        { label: 'Approximate Date', value: doc.approximate_date },
        { label: 'Original Language', value: doc.original_language },
        { label: 'Custodial Collection', value: doc.current_location },
        { label: 'Provenance & Custody', value: doc.source_provenance },
        { label: 'Copyright & Licensing', value: doc.copyright_license }
      ],
      fullText: doc.research_notes,
      fullTextLabel: 'Scholarly Research & Historiographical Notes',
      sections: [
        {
          heading: `Original Incised Text Excerpt (${doc.original_language})`,
          type: 'code',
          content: doc.transcription_excerpt
        },
        {
          heading: 'Scholarly Translation',
          type: 'quote',
          content: doc.translation_excerpt
        },
        ...(doc.digitization_info
          ? [{
              heading: 'Digitization & Archival Collation Record',
              type: 'text' as const,
              content: doc.digitization_info
            }]
          : [])
      ]
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <BookOpen className="w-4 h-4" />
          <span>{hdr.badge}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {hdr.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {hdr.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Document Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-1">
            {hdr.catalogLabel} ({documents.length})
          </div>

          <div className="space-y-3">
            {documents.map(doc => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => {
                    setSelectedDoc(doc);
                    setActiveModalDoc(doc);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedDoc(doc);
                      setActiveModalDoc(doc);
                    }
                  }}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all duration-200 group ${
                    isSelected
                      ? 'bg-[#580014]/40 border-[#d4af37] shadow-[0_0_20px_rgba(201,151,56,0.18)]'
                      : 'bg-[#121622] border-stone-800/80 hover:border-stone-700 hover:bg-[#181f2f]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                      {doc.original_language}
                    </span>
                    <EvidenceBadge status={doc.verification_status} size="sm" />
                  </div>

                  <h3 className="font-royal-heading font-bold text-sm sm:text-base text-stone-100 group-hover:text-[#fae29c] transition-colors leading-snug">
                    {doc.title}
                  </h3>

                  <div className="text-xs text-stone-400 mt-2 space-y-1">
                    <p><strong className="text-stone-300">Authority:</strong> {doc.author_authority}</p>
                    <p><strong className="text-stone-300">Approx Date:</strong> {doc.approximate_date}</p>
                    <p><strong className="text-stone-300">Repository:</strong> {doc.current_location}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-800/70 flex items-center justify-end text-[11px] font-semibold text-[#e8c872] gap-1">
                    <span>Open Manuscript Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Document Dossier */}
        <div className="lg:col-span-7">
          {selectedDoc && (
            <div className="rounded-3xl bg-[#111520] border border-[#c99738]/40 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                    {selectedDoc.approximate_date}
                  </span>
                  <h2
                    onClick={() => setActiveModalDoc(selectedDoc)}
                    className="font-royal-heading font-extrabold text-xl sm:text-2xl text-[#fcedc7] hover:text-[#e8c872] cursor-pointer transition-colors mt-1"
                  >
                    {selectedDoc.title}
                  </h2>
                </div>
                <EvidenceBadge status={selectedDoc.verification_status} size="md" />
              </div>

              {/* Provenance Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#161c2a] p-4 rounded-xl border border-stone-800">
                <div>
                  <span className="text-stone-500 block">Author / Compiling Body:</span>
                  <strong className="text-stone-200">{selectedDoc.author_authority}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Current Custodial Collection:</span>
                  <strong className="text-stone-200">{selectedDoc.current_location}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Provenance & Custody:</span>
                  <strong className="text-stone-200">{selectedDoc.source_provenance}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Copyright & Licensing:</span>
                  <strong className="text-stone-200">{selectedDoc.copyright_license}</strong>
                </div>
              </div>

              {/* Research & Historiographical Notes */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                  Scholarly Research & Historiographical Notes
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#0c0f17] p-4 rounded-xl border border-stone-800">
                  {selectedDoc.research_notes}
                </p>
              </div>

              {/* Transcription & Translation Excerpts */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    Original Incised Text Excerpt ({selectedDoc.original_language})
                  </h4>
                  <div className="p-4 rounded-xl bg-[#171113] border border-[#c99738]/30 text-xs sm:text-sm font-mono text-[#fce8bb] leading-relaxed">
                    {selectedDoc.transcription_excerpt}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                    Scholarly English Translation
                  </h4>
                  <div className="p-4 rounded-xl bg-[#141b2b] border border-stone-800 text-xs sm:text-sm font-royal-serif text-stone-200 leading-relaxed italic">
                    "{selectedDoc.translation_excerpt}"
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shared Content Detail Modal */}
      <ContentDetailModal
        item={buildDocumentModalItem(activeModalDoc)}
        onClose={() => setActiveModalDoc(null)}
      />
    </div>
  );
};
