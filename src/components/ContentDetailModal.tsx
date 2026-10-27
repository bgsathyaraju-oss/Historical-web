import React, { useState, useEffect } from 'react';
import {
  X,
  BookOpen,
  Scroll,
  Crown,
  Landmark,
  Calendar,
  MapPin,
  User,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Quote
} from 'lucide-react';
import { EvidenceCategory, VerificationStatus, LanguageCode } from '../types';
import { EvidenceBadge } from './EvidenceBadge';
import { useLanguage } from '../context/LanguageContext';

const MODAL_UI_LABELS: Record<
  LanguageCode,
  {
    defaultBadge: string;
    copyLinkTitle: string;
    copied: string;
    share: string;
    closeWindow: string;
    visualRecord: string;
    summaryLabel: string;
    fullTextLabel: string;
    archivalSection: string;
    sourcesLabel: (count: number) => string;
    referenceLink: string;
    verified: string;
    keywordsLabel: string;
    recordIdLabel: string;
  }
> = {
  en: {
    defaultBadge: 'Suryavamsha Historical Archive Dossier',
    copyLinkTitle: 'Copy direct link',
    copied: 'Copied',
    share: 'Share',
    closeWindow: 'Close Window',
    visualRecord: 'Archival Visual Record',
    summaryLabel: 'Historical Summary & Overview',
    fullTextLabel: 'Complete Historical Account & Archival Text',
    archivalSection: 'Archival Section',
    sourcesLabel: count => `Primary Sources, Inscriptions & Citations (${count})`,
    referenceLink: 'Reference Link',
    verified: 'Verified',
    keywordsLabel: 'Associated Keywords & Classifications:',
    recordIdLabel: 'Record ID'
  },
  hi: {
    defaultBadge: 'सूर्यवंश ऐतिहासिक अभिलेख दस्तावेज़',
    copyLinkTitle: 'सीधा लिंक कॉपी करें',
    copied: 'कॉपी हो गया',
    share: 'साझा करें',
    closeWindow: 'विंडो बंद करें',
    visualRecord: 'अभिलेखीय दृश्य चित्र',
    summaryLabel: 'ऐतिहासिक सारांश एवं अवलोकन',
    fullTextLabel: 'संपूर्ण ऐतिहासिक विवरण एवं मूल पाठ',
    archivalSection: 'अभिलेखीय अनुभाग',
    sourcesLabel: count => `प्राथमिक स्रोत, शिलालेख एवं संदर्भ (${count})`,
    referenceLink: 'संदर्भ लिंक',
    verified: 'सत्यापित',
    keywordsLabel: 'संबंधित मुख्य शब्द एवं वर्गीकरण:',
    recordIdLabel: 'अभिलेख क्रमांक'
  },
  te: {
    defaultBadge: 'సూర్యవంశ చారిత్రక పురాతన దస్త్రం',
    copyLinkTitle: 'డైరెక్ట్ లింక్ కాపీ చేయండి',
    copied: 'కాపీ చేయబడింది',
    share: 'షేర్ చేయండి',
    closeWindow: 'మూసివేయండి',
    visualRecord: 'చారిత్రక దృశ్య ఆధారం',
    summaryLabel: 'చారిత్రక సారాంశం & స్థూల వివరణ',
    fullTextLabel: 'పూర్తి చారిత్రక కథనం & పురాతన పాఠం',
    archivalSection: 'చారిత్రక విభాగం',
    sourcesLabel: count => `ప్రాథమిక ఆధారాలు, శాసనాలు & గ్రంథ సూచిక (${count})`,
    referenceLink: 'ఆధార లింక్',
    verified: 'ధృవీకరించబడింది',
    keywordsLabel: 'సంబంధిత కీలక పదాలు & వర్గీకరణ:',
    recordIdLabel: 'రికార్డు సంఖ్య'
  },
  kn: {
    defaultBadge: 'ಸೂರ್ಯವಂಶ ಐತಿಹಾಸಿಕ ದಾಖಲೆ ಪತ್ರ',
    copyLinkTitle: 'ನೇರ ಲಿಂಕ್ ನಕಲಿಸಿ',
    copied: 'ನಕಲಿಸಲಾಗಿದೆ',
    share: 'ಹಂಚಿಕೊಳ್ಳಿ',
    closeWindow: 'ಮುಚ್ಚಿ',
    visualRecord: 'ಐತಿಹಾಸಿಕ ದೃಶ್ಯ ದಾಖಲೆ',
    summaryLabel: 'ಐತಿಹಾಸಿಕ ಸಾರಾಂಶ ಮತ್ತು ಅವಲೋಕನ',
    fullTextLabel: 'ಸಂಪೂರ್ಣ ಐತಿಹಾಸಿಕ ವಿವರಣೆ ಮತ್ತು ಮೂಲ ಪಠ್ಯ',
    archivalSection: 'ದಾಖಲೆ ವಿಭಾಗ',
    sourcesLabel: count => `ಪ್ರಾಥಮಿಕ ಆಕರಗಳು, ಶಾಸನಗಳು ಮತ್ತು ಉಲ್ಲೇಖಗಳು (${count})`,
    referenceLink: 'ಆಕರ ಲಿಂಕ್',
    verified: 'ದೃಢೀಕೃತ',
    keywordsLabel: 'ಸಂಬಂಧಿತ ಮುಖ್ಯ ಪದಗಳು ಮತ್ತು ವರ್ಗೀಕರಣ:',
    recordIdLabel: 'ದಾಖಲೆ ಸಂಖ್ಯೆ'
  },
  ta: {
    defaultBadge: 'சூரியவம்ச வரலாற்று ஆவணத் தொகுப்பு',
    copyLinkTitle: 'இணைப்பை நகலெடுக்க',
    copied: 'நகலெடுக்கப்பட்டது',
    share: 'பகிர்',
    closeWindow: 'மூடுக',
    visualRecord: 'வரலாற்று காட்சி ஆவணம்',
    summaryLabel: 'வரலாற்றுச் சுருக்கம் மற்றும் கண்ணோட்டம்',
    fullTextLabel: 'முழுமையான வரலாற்று விவரம் மற்றும் ஆவண உரை',
    archivalSection: 'ஆவணப் பிரிவு',
    sourcesLabel: count => `முதன்மை ஆதாரங்கள், கல்வெட்டுகள் & மேற்கோள்கள் (${count})`,
    referenceLink: 'ஆதார இணைப்பு',
    verified: 'சரிபார்க்கப்பட்டது',
    keywordsLabel: 'தொடர்புடைய முக்கியச் சொற்கள்:',
    recordIdLabel: 'ஆவண எண்'
  },
  mr: {
    defaultBadge: 'सूर्यवंश ऐतिहासिक अभिलेख दस्तऐवज',
    copyLinkTitle: 'थेट लिंक कॉपी करा',
    copied: 'कॉपी झाले',
    share: 'शेअर करा',
    closeWindow: 'बंद करा',
    visualRecord: 'अभिलेखीय दृश्य नोंद',
    summaryLabel: 'ऐतिहासिक सारांश आणि आढावा',
    fullTextLabel: 'संपूर्ण ऐतिहासिक वृत्तांत आणि मूळ मजकूर',
    archivalSection: 'अभिलेख विभाग',
    sourcesLabel: count => `प्राथमिक स्रोत, शिलालेख आणि संदर्भ (${count})`,
    referenceLink: 'संदर्भ लिंक',
    verified: 'प्रमाणित',
    keywordsLabel: 'संबंधित मुख्य शब्द आणि वर्गीकरण:',
    recordIdLabel: 'नोंद क्रमांक'
  },
  or: {
    defaultBadge: 'ସୂର୍ଯ୍ୟବଂଶ ଐତିହାସିକ ଅଭିଲେଖ ଦଲିଲ',
    copyLinkTitle: 'ସିଧା ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
    copied: 'କପି ହୋଇଛି',
    share: 'ସେୟାର କରନ୍ତୁ',
    closeWindow: 'ବନ୍ଦ କରନ୍ତୁ',
    visualRecord: 'ଅଭିଲେଖୀୟ ଦୃଶ୍ୟ ପ୍ରମାଣ',
    summaryLabel: 'ଐତିହାସିକ ସାରାଂଶ ଓ ସମୀକ୍ଷା',
    fullTextLabel: 'ସମ୍ପୂର୍ଣ୍ଣ ଐତିହାସିକ ବିବରଣୀ ଓ ମୂଳ ପାଠ',
    archivalSection: 'ଅଭିଲେଖ ବିଭାଗ',
    sourcesLabel: count => `ପ୍ରାଥମିକ ଉତ୍ସ, ଶିଳାଲେଖ ଓ ପ୍ରମାଣ (${count})`,
    referenceLink: 'ସନ୍ଦର୍ଭ ଲିଙ୍କ୍',
    verified: 'ପ୍ରମାଣିତ',
    keywordsLabel: 'ସମ୍ପୃକ୍ତ ମୁଖ୍ୟ ଶବ୍ଦ ଓ ବର୍ଗୀକରଣ:',
    recordIdLabel: 'ଅଭିଲେଖ କ୍ରମାଙ୍କ'
  },
  bn: {
    defaultBadge: 'সূর্যবংশ ঐতিহাসিক আর্কাইভ দলিল',
    copyLinkTitle: 'সরাসরি লিঙ্ক কপি করুন',
    copied: 'কপি হয়েছে',
    share: 'শেয়ার করুন',
    closeWindow: 'বন্ধ করুন',
    visualRecord: 'আর্কাইভাল দৃশ্য নথি',
    summaryLabel: 'ঐতিহাসিক সারাংশ ও সংক্ষিপ্ত বিবরণ',
    fullTextLabel: 'সম্পূর্ণ ঐতিহাসিক বিবরণ ও মূল পাঠ',
    archivalSection: 'আর্কাইভাল বিভাগ',
    sourcesLabel: count => `প্রাথমিক উৎস, শিলালিপি ও তথ্যসূত্র (${count})`,
    referenceLink: 'তথ্যসূত্র লিঙ্ক',
    verified: 'যাচাইকৃত',
    keywordsLabel: 'সংশ্লিষ্ট মূল শব্দ ও শ্রেণীবিন্যাস:',
    recordIdLabel: 'নথি নম্বর'
  }
};

export interface ContentDetailSection {
  title?: string;
  heading?: string;
  content?: string;
  items?: string[];
  type?: 'text' | 'list' | 'code' | 'quote' | 'tags';
}

export interface ContentDetailSource {
  id?: string;
  source_type?: string;
  type?: string;
  title: string;
  author?: string;
  year?: string;
  citation?: string;
  details?: string;
  verified?: boolean;
  url?: string;
}

export interface ContentDetailItem {
  id: string;
  badge?: string;
  category?: string;
  title: string;
  subtitle?: string;
  datesOrEra?: string;
  era?: string;
  period?: string;
  authorOrRuler?: string;
  author?: string;
  dynasty?: string;
  location?: string;
  imageUrl?: string;
  imageCaption?: string;
  imageStyle?: 'banner' | 'portrait';
  imageLayout?: 'banner' | 'portrait';
  imageAspect?: 'banner' | 'portrait';
  verificationStatus?: VerificationStatus | string;
  evidenceCategory?: EvidenceCategory;
  summary?: string;
  summaryLabel?: string;
  content?: string;
  fullText?: string;
  fullTextLabel?: string;
  metadata?: { label: string; value: string }[];
  sections?: ContentDetailSection[];
  sources?: ContentDetailSource[];
  sourcesLabel?: string;
  tags?: string[];
  shareUrl?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

interface ContentDetailModalProps {
  item: ContentDetailItem | null;
  isOpen?: boolean;
  onClose: () => void;
  onHome?: () => void;
  closeLabel?: string;
  onTagClick?: (tagItem: string, sectionHeading?: string) => void;
}

export const ContentDetailModal: React.FC<ContentDetailModalProps> = ({
  item,
  isOpen = true,
  onClose,
  closeLabel,
  onTagClick
}) => {
  const { language } = useLanguage();
  const ui = MODAL_UI_LABELS[language] || MODAL_UI_LABELS.en;
  const resolvedCloseLabel = closeLabel || ui.closeWindow;
  const [copied, setCopied] = useState(false);

  const active = Boolean(isOpen && item);

  // Handle ESC key to close modal and lock background page scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (active) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [active, onClose]);

  if (!active || !item) return null;

  const displayEra = item.datesOrEra || item.era || item.period;
  const displayAuthor = item.authorOrRuler || item.author || item.dynasty;
  const displayImageStyle = item.imageStyle || item.imageLayout || item.imageAspect || 'banner';
  const displayFullText = item.content || item.fullText;

  const handleCopyLink = () => {
    const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    let url =
      item.shareUrl ||
      `${window.location.origin}${window.location.pathname}?id=${encodeURIComponent(item.id)}`;
    if (
      basePath &&
      url.startsWith(window.location.origin + '/') &&
      !url.startsWith(`${window.location.origin}${basePath}/`)
    ) {
      url = `${window.location.origin}${basePath}${url.slice(window.location.origin.length)}`;
    }
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="content-detail-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-[#0e121c] border-2 border-[#c99738] rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative text-stone-200 overflow-hidden">
        {/* Pinned Modal Header Bar (Keeps Title & Close control accessible at all times) */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between gap-3 bg-[#121622] rounded-t-2xl sm:rounded-t-3xl shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <Crown className="w-5 h-5 text-[#d4af37] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d4af37] block truncate">
                {item.badge || item.category || ui.defaultBadge}
              </span>
              <h2
                id="content-detail-modal-title"
                className="text-sm sm:text-lg font-bold font-royal-heading text-[#fae29c] truncate"
              >
                {item.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#161c2a] hover:bg-[#20293d] text-stone-300 hover:text-white border border-stone-700 transition-all cursor-pointer"
              title={ui.copyLinkTitle}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
              )}
              <span className="hidden sm:inline">{copied ? ui.copied : ui.share}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl bg-stone-900 hover:bg-[#580014] text-stone-300 hover:text-white border border-stone-700 hover:border-[#d4af37] transition-all cursor-pointer"
              aria-label={resolvedCloseLabel}
              title={resolvedCloseLabel}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 scrollbar-thin">
          {/* Top Profile / Header Section */}
          <div
            className={`flex flex-col ${
              item.imageUrl && displayImageStyle === 'portrait' ? 'sm:flex-row items-start gap-5 sm:gap-6' : 'space-y-4'
            } border-b border-stone-800 pb-5`}
          >
            {item.imageUrl && displayImageStyle === 'portrait' && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-[#d4af37] shadow-xl shrink-0 bg-[#161a29]"
              />
            )}

            <div className="space-y-2.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {displayEra && (
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-3 py-0.5 rounded-full bg-stone-900 border border-stone-800 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#d4af37]" />
                    <span>{displayEra}</span>
                  </span>
                )}
                {item.category && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#fae29c] px-2.5 py-0.5 rounded-full bg-[#580014]/70 border border-[#d4af37]/40">
                    {item.category}
                  </span>
                )}
                {item.evidenceCategory && (
                  <EvidenceBadge category={item.evidenceCategory} size="sm" />
                )}
                {!item.evidenceCategory && item.verificationStatus && (
                  <EvidenceBadge status={item.verificationStatus as VerificationStatus} size="sm" />
                )}
              </div>

              <h3 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7] leading-tight">
                {item.title}
              </h3>

              {item.subtitle && (
                <p className="text-xs sm:text-sm text-[#e8c872] font-semibold">
                  {item.subtitle}
                </p>
              )}

              {(displayAuthor || item.location) && (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-stone-400 pt-1">
                  {displayAuthor && (
                    <span className="flex items-center gap-1.5 text-stone-300">
                      <User className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{displayAuthor}</span>
                    </span>
                  )}
                  {item.location && (
                    <span className="flex items-center gap-1.5 text-stone-300">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Banner Image if present and not portrait */}
          {item.imageUrl && displayImageStyle !== 'portrait' && (
            <figure className="relative rounded-2xl overflow-hidden border border-[#c99738]/40 shadow-xl bg-stone-950">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full max-h-80 object-cover"
              />
              {item.imageCaption && (
                <figcaption className="p-3 bg-stone-950/90 border-t border-stone-800/80 text-xs text-stone-300 flex items-center justify-between">
                  <span className="text-[#d4af37] font-semibold">{ui.visualRecord}</span>
                  <span className="text-stone-400 truncate max-w-md">{item.imageCaption}</span>
                </figcaption>
              )}
            </figure>
          )}

          {/* Metadata Key-Value Grid */}
          {item.metadata && item.metadata.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs bg-[#141926] p-4 rounded-2xl border border-stone-800">
              {item.metadata.map((m, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-stone-400 block text-[11px]">{m.label}:</span>
                  <strong className="text-stone-100 font-semibold block">{m.value}</strong>
                </div>
              ))}
            </div>
          )}

          {/* Executive Summary / Overview Callout */}
          {item.summary && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#20050c]/80 via-[#180309]/80 to-[#121622] border-l-4 border-[#d4af37] border-y border-r border-stone-800/80 text-stone-200 shadow-inner space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{item.summaryLabel || ui.summaryLabel}</span>
              </div>
              <p className="font-royal-serif text-xs sm:text-sm leading-relaxed text-[#fcedc7]/95 whitespace-pre-line">
                {item.summary}
              </p>
            </div>
          )}

          {/* Main Full Text / Biography / Narrative */}
          {displayFullText && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span>{item.fullTextLabel || ui.fullTextLabel}</span>
              </h4>
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c0f17] border border-stone-800/90 font-royal-serif text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                {displayFullText}
              </div>
            </div>
          )}

          {/* Additional Structured Sections */}
          {item.sections &&
            item.sections.map((sec, sIdx) => {
              const hasContent = Boolean(sec.content && sec.content.trim());
              const hasItems = Boolean(sec.items && sec.items.length > 0);
              if (!hasContent && !hasItems) return null;
              const secHeading = sec.title || sec.heading || ui.archivalSection;

              return (
                <div key={sIdx} className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-1.5">
                    {sec.type === 'code' ? (
                      <Quote className="w-4 h-4 text-[#d4af37]" />
                    ) : (
                      <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                    )}
                    <span>{secHeading}</span>
                  </h4>

                  {sec.type === 'code' && sec.content && (
                    <div className="p-4 rounded-xl bg-[#171113] border border-[#c99738]/30 text-xs sm:text-sm font-mono text-[#fce8bb] leading-relaxed whitespace-pre-line">
                      {sec.content}
                    </div>
                  )}

                  {sec.type === 'quote' && sec.content && (
                    <div className="p-4 rounded-xl bg-[#141b2b] border border-stone-800 text-xs sm:text-sm font-royal-serif text-stone-200 leading-relaxed italic whitespace-pre-line">
                      "{sec.content}"
                    </div>
                  )}

                  {(!sec.type || sec.type === 'text') && sec.content && (
                    <div className="p-4 sm:p-5 rounded-xl bg-[#121724] border border-stone-800 text-xs sm:text-sm text-stone-300 leading-relaxed whitespace-pre-line">
                      {sec.content}
                    </div>
                  )}

                  {sec.type === 'tags' && sec.items && (
                    <div className="flex flex-wrap gap-2">
                      {sec.items.map((tagItem, tIdx) =>
                        onTagClick && !tagItem.startsWith('#') ? (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => onTagClick(tagItem, secHeading)}
                            className="px-3 py-1 rounded-lg bg-[#182030] hover:bg-[#580014] border border-stone-700 hover:border-[#d4af37] text-xs text-[#fae29c] hover:text-white font-medium transition-colors cursor-pointer"
                          >
                            {tagItem}
                          </button>
                        ) : (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-lg bg-[#182030] border border-stone-800 text-xs text-[#fae29c] font-medium"
                          >
                            {tagItem}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  {(!sec.type || sec.type === 'list') && sec.items && (
                    <div className="space-y-2">
                      {sec.items.map((listItem, lIdx) => (
                        <div
                          key={lIdx}
                          className="p-3 rounded-xl bg-[#141926] border border-stone-800/80 text-xs sm:text-sm text-stone-300 flex items-start gap-2.5"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                          <span>{listItem}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

          {/* Primary Sources & References */}
          {item.sources && item.sources.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-stone-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-1.5">
                <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{item.sourcesLabel || ui.sourcesLabel(item.sources.length)}</span>
              </h4>
              <div className="space-y-2">
                {item.sources.map((src, idx) => {
                  const srcType = src.source_type || src.type;
                  const srcDetails =
                    src.details ||
                    src.citation ||
                    [src.author, src.year ? `(${src.year})` : ''].filter(Boolean).join(' ');
                  return (
                    <div
                      key={src.id || idx}
                      className="p-3.5 rounded-xl bg-[#141926] border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          {srcType && (
                            <span className="text-[10px] font-semibold text-[#d4af37] uppercase bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                              {srcType}
                            </span>
                          )}
                          <span className="font-bold text-stone-200">{src.title}</span>
                        </div>
                        {srcDetails && (
                          <p className="text-stone-400 text-[11px]">{srcDetails}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {src.url && (
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#e8c872] hover:underline font-semibold"
                          >
                            <span>{ui.referenceLink}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {src.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded-full">
                            <Check className="w-3 h-3" /> {ui.verified}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading block">
                {ui.keywordsLabel}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#182030] text-[#fae29c] border border-[#c99738]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pinned Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 bg-[#121622] rounded-b-2xl sm:rounded-b-3xl shrink-0">
          {item.actionButton ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                item.actionButton?.onClick();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#182030] hover:bg-[#20293d] text-[#fae29c] border border-[#c99738]/40 transition-all cursor-pointer"
            >
              <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{item.actionButton.label}</span>
            </button>
          ) : (
            <span className="text-[11px] text-stone-500 font-mono">
              {ui.recordIdLabel}: {item.id}
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#580014] hover:bg-[#72001a] text-[#fae29c] border border-[#d4af37] transition-all cursor-pointer shadow-md active:scale-95 ml-auto"
          >
            {resolvedCloseLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

