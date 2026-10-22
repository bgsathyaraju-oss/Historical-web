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
      <div className={`p-4 rounded-2xl bg-[#0f131e] border border-stone-800/80 space-y-3 ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#fcedc7]">
              Multilingual Archival Coverage (8 Languages)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Offline Ready</span>
            </span>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold bg-[#580014] hover:bg-[#72001a] border border-[#c99738]/50 text-[#fcedc7] transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
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
                    ? 'bg-[#c99738] text-[#300207] border-[#d4af37] font-bold shadow-md'
                    : hasTr
                    ? 'bg-stone-900/90 text-stone-300 border-stone-800 hover:border-stone-700 hover:text-white'
                    : 'bg-stone-950/60 text-stone-500 border-stone-850 hover:text-stone-300 hover:border-stone-800'
                }`}
              >
                <span>{langOpt.nativeName}</span>
                {hasTr ? (
                  <Check className={`w-3 h-3 ${isSelected ? 'text-[#300207]' : 'text-emerald-400'}`} />
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
