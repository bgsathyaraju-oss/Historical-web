import React from 'react';
import { Home, X, Globe, Check } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { LanguageCode } from '../types';

interface ArticleActionBarProps {
  onHome?: () => void;
  onClose?: () => void;
  title?: string;
  badge?: string;
  className?: string;
  showLanguages?: boolean;
}

const SCRIPT_ICONS: Record<LanguageCode, string> = {
  en: 'En',
  hi: 'अ',
  te: 'తె',
  kn: 'ಕ',
  ta: 'த',
  mr: 'म',
  or: 'ଓ',
  bn: 'বা'
};

export const ArticleActionBar: React.FC<ArticleActionBarProps> = ({
  onHome,
  onClose,
  title,
  badge,
  className = '',
  showLanguages = true
}) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className={`p-2.5 sm:p-3 rounded-2xl bg-[#FFF9EF] border border-[#D8C3A2] shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs ${className}`}
    >
      {/* Navigation Controls: Home & Close Buttons */}
      <div className="flex items-center gap-2">
        {onHome && (
          <button
            type="button"
            onClick={onHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold bg-[#762D35] hover:bg-[#5e2229] text-white border border-[#A87924] transition-all cursor-pointer shadow-sm active:scale-95"
            title="Return to Portal Home"
          >
            <Home className="w-3.5 h-3.5 text-white" />
            <span>{t.nav?.home || 'Home'}</span>
          </button>
        )}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold bg-[#E9D9BE] hover:bg-[#dfc9a4] text-[#54351F] border border-[#D8C3A2] transition-all cursor-pointer shadow-sm active:scale-95"
            title="Close this frame / article view"
          >
            <X className="w-3.5 h-3.5 text-[#54351F]" />
            <span>{t.common?.close || 'Close'}</span>
          </button>
        )}

        {title && (
          <span className="hidden md:inline font-royal-heading font-bold text-[#54351F] ml-1">
            {badge && (
              <span className="text-[10px] uppercase tracking-wider text-[#54351F] bg-[#E9D9BE] px-2 py-0.5 rounded border border-[#D8C3A2] mr-2">
                {badge}
              </span>
            )}
            {title}
          </span>
        )}
      </div>

      {/* 8-Language Toggle Switcher */}
      {showLanguages && (
        <div className="flex items-center gap-1 overflow-x-auto max-w-full scrollbar-none py-0.5">
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#6B5948] mr-1 shrink-0 font-semibold">
            <Globe className="w-3.5 h-3.5 text-[#A87924]" />
            <span>{t.common?.language || 'Language'}:</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {SUPPORTED_LANGUAGES.map((langOpt) => {
              const isSelected = langOpt.code === language;
              const scriptGlyph = SCRIPT_ICONS[langOpt.code];

              return (
                <button
                  key={langOpt.code}
                  type="button"
                  onClick={() => setLanguage(langOpt.code)}
                  title={`Toggle Language to ${langOpt.label} (${langOpt.nativeName})`}
                  className={`px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 flex items-center gap-1 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#762D35] text-white font-bold border-[#A87924] shadow-sm scale-[1.02]'
                      : 'bg-[#FFFCF5] text-[#292521] border-[#D8C3A2] hover:border-[#A87924] hover:bg-[#E9D9BE] hover:text-[#54351F]'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      isSelected
                        ? 'bg-[#FFFCF5] text-[#762D35]'
                        : 'bg-[#E9D9BE] text-[#54351F]'
                    }`}
                  >
                    {scriptGlyph}
                  </span>
                  <span>{langOpt.nativeName}</span>
                  {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
