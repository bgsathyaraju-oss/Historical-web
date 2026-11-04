import React, { useState } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { Article, LanguageCode } from '../types';
import { Globe, Plus, Check, CloudCheck, WifiOff, Sparkles } from 'lucide-react';
import { SuggestTranslationModal } from './SuggestTranslationModal';

interface TranslationMatrixBadgeProps {
  article: Article;
  onRefresh?: () => void;
  className?: string;
}

const MATRIX_UI: Record<
  LanguageCode,
  { coverage: string; offlineReady: string; suggestBtn: string; available: string; needsTr: string }
> = {
  en: {
    coverage: 'Multilingual Archival Coverage (8 Languages)',
    offlineReady: 'Offline Ready',
    suggestBtn: 'Suggest Translation',
    available: 'Translation Available',
    needsTr: 'Needs Translation'
  },
  hi: {
    coverage: 'बहुभाषी अभिलेखीय कवरेज (8 भाषाएँ)',
    offlineReady: 'ऑफ़लाइन उपलब्ध',
    suggestBtn: 'अनुवाद सुझाएँ',
    available: 'अनुवाद उपलब्ध',
    needsTr: 'अनुवाद आवश्यक'
  },
  te: {
    coverage: 'బహుభాషా పురావస్తు కవరేజ్ (8 భాషలు)',
    offlineReady: 'ఆఫ్‌లైన్ సిద్ధం',
    suggestBtn: 'అనువాదాన్ని సూచించండి',
    available: 'అనువాదం అందుబాటులో ఉంది',
    needsTr: 'అనువాదం అవసరం'
  },
  kn: {
    coverage: 'ಬಹುಭಾಷಾ ಪತ್ರಾಗಾರ ವ್ಯಾಪ್ತಿ (8 ಭಾಷೆಗಳು)',
    offlineReady: 'ಆಫ್‌ಲೈನ್ ಸಿದ್ಧ',
    suggestBtn: 'ಅನುವಾದವನ್ನು ಸೂಚಿಸಿ',
    available: 'ಅನುವಾದ ಲಭ್ಯವಿದೆ',
    needsTr: 'ಅನುವಾದ ಅಗತ್ಯವಿದೆ'
  },
  ta: {
    coverage: 'பன்மொழி ஆவணக் காப்பகம் (8 மொழிகள்)',
    offlineReady: 'ஆஃப்லைனில் தயார்',
    suggestBtn: 'மொழிபெயர்ப்பை பரிந்துரைக்கவும்',
    available: 'மொழிபெயர்ப்பு உள்ளது',
    needsTr: 'மொழிபெயர்ப்பு தேவை'
  },
  mr: {
    coverage: 'बहुभाषिक अभिलेख व्याप्ती (८ भाषा)',
    offlineReady: 'ऑफलाइन तयार',
    suggestBtn: 'भाषांतर सुचवा',
    available: 'भाषांतर उपलब्ध',
    needsTr: 'भाषांतर आवश्यक'
  },
  or: {
    coverage: 'ବହୁଭାଷୀ ଅଭିଲେଖ ସଂରକ୍ଷଣ (୮ଟି ଭାଷା)',
    offlineReady: 'ଅଫଲାଇନ୍ ପ୍ରସ୍ତୁତ',
    suggestBtn: 'ଅନୁବାଦ ପ୍ରସ୍ତାବ ଦିଅନ୍ତୁ',
    available: 'ଅନୁବାଦ ଉପଲବ୍ଧ',
    needsTr: 'ଅନୁବାଦ ଆବଶ୍ୟକ'
  },
  bn: {
    coverage: 'বহুভাষিক আর্কাইভ কভারেজ (৮টি ভাষা)',
    offlineReady: 'অফলাইনে প্রস্তুত',
    suggestBtn: 'অনুবাদ প্রস্তাব করুন',
    available: 'অনুবাদ উপলব্ধ',
    needsTr: 'অনুবাদ প্রয়োজন'
  }
};

export const TranslationMatrixBadge: React.FC<TranslationMatrixBadgeProps> = ({
  article,
  onRefresh,
  className = ''
}) => {
  const { language, setLanguage, contentTranslations } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const ui = MATRIX_UI[language] || MATRIX_UI.en;

  // Determine if current language has translation
  const activeTr = article.translations?.[language] || contentTranslations[article.id];
  const isCurrentTranslated = language === 'en' || Boolean(activeTr);

  return (
    <>
      <div className={`p-4 rounded-2xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-3 ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#A87924]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#54351F]">
              {ui.coverage}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EDF7F0] border border-[#2D7A4D] text-[#14532D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4D] animate-pulse" />
              <span>{ui.offlineReady}</span>
            </span>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold bg-[#762D35] hover:bg-[#5e2229] border border-[#A87924] text-white transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{ui.suggestBtn}</span>
            </button>
          </div>
        </div>

        {/* 8 Language Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SUPPORTED_LANGUAGES.map(langOpt => {
            const isSelected = language === langOpt.code;
            const hasTr =
              langOpt.code === 'en' ||
              Boolean(article.translations?.[langOpt.code]) ||
              (langOpt.code === language && Boolean(contentTranslations[article.id]));

            return (
              <button
                key={langOpt.code}
                type="button"
                onClick={() => setLanguage(langOpt.code)}
                title={`${langOpt.label} (${hasTr ? ui.available : ui.needsTr})`}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#762D35] text-white border-[#A87924] font-bold shadow-sm'
                    : hasTr
                    ? 'bg-[#FFFCF5] text-[#292521] border-[#D8C3A2] hover:border-[#A87924] hover:bg-[#E9D9BE]'
                    : 'bg-[#EFE3D0] text-[#6B5948] border-[#D8C3A2] hover:text-[#54351F] hover:border-[#A87924]'
                }`}
              >
                <span>{langOpt.nativeName}</span>
                {hasTr ? (
                  <Check className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-[#2D7A4D]'}`} />
                ) : (
                  <span className="text-[10px] opacity-60">+</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <SuggestTranslationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        article={article}
        onTranslationSaved={onRefresh}
      />
    </>
  );
};
