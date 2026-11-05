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
import { ARTICLE_TRANSLATIONS } from '../../server/contentTranslations';

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
  const localizedTr = language !== 'en' ? (ARTICLE_TRANSLATIONS as Record<string, any>)[article.id]?.[language] : undefined;
  const displayAuthor = localizedTr?.author_name || article.author_name;
  const displaySources = localizedTr?.sources || article.sources || [];
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#292521]/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FFFCF5] border-2 border-[#A87924] rounded-3xl shadow-[0_14px_45px_rgba(75,51,31,0.25)] overflow-hidden flex flex-col text-[#292521]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="px-5 py-4 border-b border-[#D8C3A2] bg-[#F1E4D0] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#762D35] text-white border border-[#A87924]">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#76501F] font-royal-heading block">
                {ui.headerBadge}
              </span>
              <span className="text-xs text-[#6B5948] font-medium">
                {ui.headerSub}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#54351F] hover:text-white hover:bg-[#762D35] border border-[#D8C3A2] transition-colors cursor-pointer"
            aria-label={ui.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 8-Multilingual Quick Switcher Ribbon */}
        <div className="px-5 py-2.5 bg-[#FFF9EF] border-b border-[#D8C3A2] flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-semibold text-[#54351F] shrink-0 uppercase tracking-wider">
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
                      ? 'bg-[#762D35] text-white border border-[#A87924] shadow-sm scale-105'
                      : 'bg-[#FFFCF5] text-[#292521] hover:text-[#54351F] hover:bg-[#E9D9BE] border border-[#D8C3A2]'
                  }`}
                  title={LANGUAGE_LABELS[langCode].label}
                >
                  <span>{langCode.toUpperCase()}</span>
                  <span className="text-[10px] opacity-85 hidden sm:inline">({LANGUAGE_LABELS[langCode].native})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 bg-[#FFFCF5]">
          {/* Category & Evidence Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#54351F] px-3 py-1 rounded-full bg-[#EFE3D0] border border-[#A87924]/50">
                {localizedCategory}
              </span>
              <EvidenceBadge category={article.evidence_category} size="md" />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#6B5948]">
              <Calendar className="w-3.5 h-3.5 text-[#A87924]" />
              <span>{article.publication_date}</span>
            </div>
          </div>

          {/* Article Title */}
          <div>
            <h2 className="font-royal-heading font-extrabold text-xl sm:text-2xl text-[#54351F] leading-snug">
              {title}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs text-[#6B5948]">
              <User className="w-3.5 h-3.5 text-[#A87924]" />
              <span>{ui.byAuthor} {displayAuthor}</span>
              <span>•</span>
              <span className="text-[#76501F] font-semibold">{getMetadataLabel('status', article.verification_status) || article.verification_status}</span>
            </div>
          </div>

          {/* Featured Image if present */}
          {article.featured_image && (
            <div className="w-full h-44 sm:h-56 rounded-2xl overflow-hidden relative border border-[#D8C3A2] bg-[#EFE3D0]">
              <img
                src={article.featured_image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Brief Information & Executive Summary Box */}
          <div className="p-5 rounded-2xl bg-[#FFF9EF] border border-[#A87924]/50 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#54351F]">
              <Sparkles className="w-4 h-4 text-[#A87924]" />
              <span>{ui.execBrief}</span>
            </div>
            <p className="text-sm sm:text-base text-[#292521] leading-relaxed font-royal-serif">
              {summary}
            </p>
          </div>

          {/* Key Historiographical Highlights */}
          {highlightBullets.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#54351F] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A87924]" />
                <span>{ui.highlightsHeading}</span>
              </h4>
              <div className="space-y-2">
                {highlightBullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] text-xs sm:text-sm text-[#292521] flex items-start gap-2.5"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A87924] mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Primary Sources & Epigraphic Citations */}
          {displaySources && displaySources.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-[#D8C3A2]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#54351F] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#A87924]" />
                <span>{ui.sourcesHeading(displaySources.length)}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displaySources.map((src: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-[#54351F] truncate">{src.title}</span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#EFE3D0] text-[#76501F] border border-[#D8C3A2]">
                        {getMetadataLabel('source_type', src.source_type) || src.source_type}
                      </span>
                    </div>
                    <div className="text-[#292521] text-[11px]">
                      {src.author_or_authority} {src.year_or_era && `(${src.year_or_era})`}
                    </div>
                    {src.citation_details && (
                      <div className="text-[10px] text-[#6B5948] italic">
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
              <Tag className="w-3.5 h-3.5 text-[#76501F] mr-1" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md bg-[#EFE3D0] border border-[#D8C3A2] text-[11px] text-[#54351F] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-5 py-4 border-t border-[#D8C3A2] bg-[#F1E4D0] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#54351F] bg-[#E9D9BE] hover:bg-[#D8C3A2] border border-[#A87924]/50 rounded-xl transition-colors cursor-pointer"
          >
            {ui.closeBtn}
          </button>

          <button
            onClick={() => {
              onClose();
              onReadFull(article);
            }}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#762D35] hover:bg-[#5e2229] text-white border border-[#A87924] shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <span>{ui.readFullBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
