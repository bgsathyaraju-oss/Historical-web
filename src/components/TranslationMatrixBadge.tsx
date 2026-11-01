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

export const TranslationMatrixBadge: React.FC<TranslationMatrixBadgeProps> = ({
  article,
  onRefresh,
  className = ''
}) => {
  const { language, setLanguage, contentTranslations } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

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
              Multilingual Archival Coverage (8 Languages)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EDF7F0] border border-[#2D7A4D] text-[#14532D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4D] animate-pulse" />
              <span>Offline Ready</span>
            </span>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold bg-[#762D35] hover:bg-[#5e2229] border border-[#A87924] text-white transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Suggest Translation</span>
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
                title={`${langOpt.label} (${hasTr ? 'Translation Available' : 'Needs Translation'})`}
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
