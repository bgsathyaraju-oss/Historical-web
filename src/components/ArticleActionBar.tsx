import React from 'react';
import { Home, X, Globe, Check, ArrowLeft } from 'lucide-react';
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
      className={`p-2.5 sm:p-3 rounded-2xl bg-[#0f131f]/95 border border-[#c99738]/40 shadow-lg flex flex-wrap items-center justify-between gap-3 text-xs ${className}`}
    >
      {/* Navigation Controls: Home & Close Buttons */}
      <div className="flex items-center gap-2">
        {onHome && (
          <button
            type="button"
            onClick={onHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold bg-[#580014] hover:bg-[#78001b] text-[#fcedc7] hover:text-white border border-[#d4af37]/50 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Return to Portal Home"
          >
            <Home className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t.nav?.home || 'Home'}</span>
          </button>
        )}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Close this frame / article view"
          >
            <X className="w-3.5 h-3.5 text-stone-400 group-hover:text-white" />
            <span>{t.common?.close || 'Close'}</span>
          </button>
        )}

        {title && (
          <span className="hidden md:inline font-royal-heading font-bold text-stone-300 ml-1">
            {badge && (
              <span className="text-[10px] uppercase tracking-wider text-[#d4af37] bg-stone-950 px-2 py-0.5 rounded border border-stone-800 mr-2">
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
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-stone-400 mr-1 shrink-0 font-medium">
            <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
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
                      ? 'bg-gradient-to-r from-[#997022] to-[#c99738] text-[#200206] font-bold border-[#e8c872] shadow-sm scale-[1.02]'
                      : 'bg-[#151a27] text-stone-300 border-stone-800 hover:border-[#c99738]/50 hover:bg-[#1f2638] hover:text-[#fae29c]'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      isSelected
                        ? 'bg-[#3b0309] text-[#fae29c]'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {scriptGlyph}
                  </span>
                  <span>{langOpt.nativeName}</span>
                  {isSelected && <Check className="w-2.5 h-2.5 text-[#200206] stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
