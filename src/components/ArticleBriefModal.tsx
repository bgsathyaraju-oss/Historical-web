import React, { useEffect, useMemo } from 'react';
import { Article, LanguageCode } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  BookOpen,
  ArrowRight,
  User,
  Calendar,
  Layers,
  FileText,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Tag,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

interface ArticleBriefModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
  onReadFull: (article: Article) => void;
}

const LANGUAGE_LABELS: Record<LanguageCode, { label: string; native: string }> = {
  en: { label: 'English', native: 'English' },
  te: { label: 'Telugu', native: 'తెలుగు' },
  or: { label: 'Odia', native: 'ଓଡ଼ିଆ' },
  hi: { label: 'Hindi', native: 'हिन्दी' },
  kn: { label: 'Kannada', native: 'ಕನ್ನಡ' },
  ta: { label: 'Tamil', native: 'தமிழ்' },
  mr: { label: 'Marathi', native: 'मराठी' },
  bn: { label: 'Bengali', native: 'বাংলা' }
};

const BRIEF_MODAL_UI: Record<
  LanguageCode,
  {
    headerBadge: string;
    headerSub: string;
    langLabel: string;
    byAuthor: string;
    execBrief: string;
    highlightsHeading: string;
    sourcesHeading: (count: number) => string;
    closeBtn: string;
    readFullBtn: string;
  }
> = {
  en: {
    headerBadge: 'Brief Research Information',
    headerSub: 'Multilingual Archival Summary',
    langLabel: 'Language:',
    byAuthor: 'By',
    execBrief: 'Executive Brief Information',
    highlightsHeading: 'Core Historical Highlights',
    sourcesHeading: count => `Primary Citations & Archaeological Sources (${count})`,
    closeBtn: 'Close',
    readFullBtn: 'Read Full Documented Narrative'
  },
  hi: {
    headerBadge: 'संक्षिप्त शोध जानकारी',
    headerSub: 'बहुभाषी अभिलेखीय सारांश',
    langLabel: 'भाषा:',
    byAuthor: 'लेखक:',
    execBrief: 'कार्यकारी संक्षिप्त विवरण',
    highlightsHeading: 'प्रमुख ऐतिहासिक बिंदु',
    sourcesHeading: count => `प्राथमिक उद्धरण एवं पुरातात्विक स्रोत (${count})`,
    closeBtn: 'बंद करें',
    readFullBtn: 'संपूर्ण प्रलेखित शोध लेख पढ़ें'
  },
  te: {
    headerBadge: 'సంక్షిప్త పరిశోధనా సమాచారం',
    headerSub: 'బహుభాషా చారిత్రక సారాంశం',
    langLabel: 'భాష:',
    byAuthor: 'రచయిత:',
    execBrief: 'ప్రధాన సారాంశ వివరాలు',
    highlightsHeading: 'కీలక చారిత్రక అంశాలు',
    sourcesHeading: count => `ప్రాథమిక శాసన & పురావస్తు ఆధారాలు (${count})`,
    closeBtn: 'మూసివేయండి',
    readFullBtn: 'పూర్తి పరిశోధనా వ్యాసం చదవండి'
  },
  kn: {
    headerBadge: 'ಸಂಕ್ಷಿಪ್ತ ಸಂಶೋಧನಾ ಮಾಹಿತಿ',
    headerSub: 'ಬಹುಭಾಷಾ ದಾಖಲೆ ಸಾರಾಂಶ',
    langLabel: 'ಭಾಷೆ:',
    byAuthor: 'ಲೇಖಕರು:',
    execBrief: 'ಮುಖ್ಯ ಸಾರಾಂಶ ಮಾಹಿತಿ',
    highlightsHeading: 'ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಮುಖ್ಯಾಂಶಗಳು',
    sourcesHeading: count => `ಪ್ರಾಥಮಿಕ ಉಲ್ಲೇಖಗಳು ಮತ್ತು ಪುರಾತತ್ವ ಆಕರಗಳು (${count})`,
    closeBtn: 'ಮುಚ್ಚಿ',
    readFullBtn: 'ಸಂಪೂರ್ಣ ಸಂಶೋಧನಾ ಲೇಖನ ಓದಿ'
  },
  ta: {
    headerBadge: 'சுருக்கமான ஆராய்ச்சித் தகவல்',
    headerSub: 'பன்மொழி ஆவணச் சுருக்கம்',
    langLabel: 'மொழி:',
    byAuthor: 'ஆசிரியர்:',
    execBrief: 'முதன்மைச் சுருக்கத் தகவல்',
    highlightsHeading: 'முக்கிய வரலாற்றுச் சிறப்பம்சங்கள்',
    sourcesHeading: count => `முதன்மை மேற்கோள்கள் & தொல்லியல் ஆதாரங்கள் (${count})`,
    closeBtn: 'மூடுக',
    readFullBtn: 'முழு ஆய்வுக் கட்டுரையைப் படிக்க'
  },
  mr: {
    headerBadge: 'संक्षिप्त संशोधन माहिती',
    headerSub: 'बहुभाषिक अभिलेखीय सारांश',
    langLabel: 'भाषा:',
    byAuthor: 'लेखक:',
    execBrief: 'मुख्य संक्षिप्त माहिती',
    highlightsHeading: 'प्रमुख ऐतिहासिक मुद्दे',
    sourcesHeading: count => `प्राथमिक संदर्भ आणि पुरातत्त्वीय स्रोत (${count})`,
    closeBtn: 'बंद करा',
    readFullBtn: 'संपूर्ण संशोधन लेख वाचा'
  },
  or: {
    headerBadge: 'ସଂକ୍ଷିପ୍ତ ଗବେଷଣା ସୂଚନା',
    headerSub: 'ବହୁଭାଷୀ ଅଭିଲେଖୀୟ ସାରାଂଶ',
    langLabel: 'ଭାଷା:',
    byAuthor: 'ଲେଖକ:',
    execBrief: 'ମୁଖ୍ୟ ସାରାଂଶ ବିବରଣୀ',
    highlightsHeading: 'ପ୍ରମୁଖ ଐତିହାସିକ ବିନ୍ଦୁ',
    sourcesHeading: count => `ପ୍ରାଥମିକ ଉଦ୍ଧୃତି ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଉତ୍ସ (${count})`,
    closeBtn: 'ବନ୍ଦ କରନ୍ତୁ',
    readFullBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ଗବେଷଣା ପ୍ରବନ୍ଧ ପଢ଼ନ୍ତୁ'
  },
  bn: {
    headerBadge: 'সংক্ষিপ্ত গবেষণা তথ্য',
    headerSub: 'বহুভাষিক আর্কাইভাল সারাংশ',
    langLabel: 'ভাষা:',
    byAuthor: 'লেখক:',
    execBrief: 'কার্যনির্বাহী সংক্ষিপ্ত বিবরণ',
    highlightsHeading: 'প্রধান ঐতিহাসিক দিকসমূহ',
    sourcesHeading: count => `প্রাথমিক উদ্ধৃতি ও প্রত্নতাত্ত্বিক উৎস (${count})`,
    closeBtn: 'বন্ধ করুন',
    readFullBtn: 'সম্পূর্ণ গবেষণা প্রবন্ধ পড়ুন'
  }
};

export const ArticleBriefModal: React.FC<ArticleBriefModalProps> = ({
  article,
  isOpen,
  onClose,
  onReadFull
}) => {
  const { language, setLanguage, getArticleContent, getMetadataLabel } = useLanguage();
  const ui = BRIEF_MODAL_UI[language] || BRIEF_MODAL_UI.en;

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  const { title, summary } = getArticleContent(article);
  const localizedCategory = getMetadataLabel('category', article.category) || article.category;

  // Extract key highlight bullet sentences from summary and content
  const highlightBullets = useMemo(() => {
    if (!summary) return [];
    const sentences = summary
      .split(/(?<=[.?!।])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 15);
    return sentences.slice(0, 3);
  }, [summary]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#101420] border border-[#c99738]/60 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="px-5 py-4 border-b border-stone-800/90 bg-[#151a28] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#580014] text-[#d4af37] border border-[#d4af37]/40">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading block">
                {ui.headerBadge}
              </span>
              <span className="text-xs text-stone-400 font-medium">
                {ui.headerSub}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label={ui.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 8-Multilingual Quick Switcher Ribbon */}
        <div className="px-5 py-2.5 bg-[#0b0e17] border-b border-stone-800 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-semibold text-stone-400 shrink-0 uppercase tracking-wider">
            {ui.langLabel}
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            {(['en', 'te', 'or', 'hi', 'kn', 'ta', 'mr', 'bn'] as LanguageCode[]).map((langCode) => {
              const active = language === langCode;
              return (
                <button
                  key={langCode}
                  onClick={() => setLanguage(langCode)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    active
                      ? 'bg-gradient-to-r from-[#997022] to-[#c99738] text-[#200206] shadow-md scale-105'
                      : 'bg-[#161c2b] text-stone-300 hover:text-[#fae29c] hover:bg-[#20293d] border border-stone-700/60'
                  }`}
                  title={LANGUAGE_LABELS[langCode].label}
                >
                  <span>{langCode.toUpperCase()}</span>
                  <span className="text-[10px] opacity-80 hidden sm:inline">({LANGUAGE_LABELS[langCode].native})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Category & Evidence Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-3 py-1 rounded-full bg-[#1b2234] border border-[#d4af37]/30">
                {localizedCategory}
              </span>
              <EvidenceBadge category={article.evidence_category} size="md" />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-stone-400">
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{article.publication_date}</span>
            </div>
          </div>

          {/* Article Title */}
          <div>
            <h2 className="font-royal-heading font-extrabold text-xl sm:text-2xl text-[#fcedc7] leading-snug">
              {title}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs text-stone-400">
              <User className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{ui.byAuthor} {article.author_name}</span>
              <span>•</span>
              <span className="text-[#e8c872]">{article.verification_status}</span>
            </div>
          </div>

          {/* Featured Image if present */}
          {article.featured_image && (
            <div className="w-full h-44 sm:h-56 rounded-2xl overflow-hidden relative border border-stone-800">
              <img
                src={article.featured_image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101420] via-transparent to-transparent"></div>
            </div>
          )}

          {/* Brief Information & Executive Summary Box */}
          <div className="p-5 rounded-2xl bg-[#141926] border border-[#c99738]/40 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#fae29c]">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>{ui.execBrief}</span>
            </div>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-royal-serif">
              {summary}
            </p>
          </div>

          {/* Key Historiographical Highlights */}
          {highlightBullets.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span>{ui.highlightsHeading}</span>
              </h4>
              <div className="space-y-2">
                {highlightBullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 text-xs sm:text-sm text-stone-300 flex items-start gap-2.5"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Primary Sources & Epigraphic Citations */}
          {article.sources && article.sources.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-stone-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>{ui.sourcesHeading(article.sources.length)}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {article.sources.map((src, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#131826] border border-stone-800 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-stone-200 truncate">{src.title}</span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-stone-800 text-[#e8c872]">
                        {src.source_type}
                      </span>
                    </div>
                    <div className="text-stone-400 text-[11px]">
                      {src.author_or_authority} {src.year_or_era && `(${src.year_or_era})`}
                    </div>
                    {src.citation_details && (
                      <div className="text-[10px] text-stone-500 italic">
                        {src.citation_details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <Tag className="w-3.5 h-3.5 text-stone-500 mr-1" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-[11px] text-stone-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-5 py-4 border-t border-stone-800 bg-[#131826] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-300 hover:text-stone-100 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
          >
            {ui.closeBtn}
          </button>

          <button
            onClick={() => {
              onClose();
              onReadFull(article);
            }}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#997022] via-[#c99738] to-[#e8c872] text-[#290106] hover:brightness-110 shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <span>{ui.readFullBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
