import React, { useState } from 'react';
import { Home, X, Globe, Check, ChevronUp, ChevronDown, ArrowLeft, Languages } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { LanguageCode } from '../types';

interface FloatingPageDockProps {
  currentPath: string;
  onNavigate: (path: string) => void;
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

export const FloatingPageDock: React.FC<FloatingPageDockProps> = ({ currentPath, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const handleCloseOrBack = () => {
    if (currentPath !== '/') {
      onNavigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <aside aria-label="Floating Navigation & Language Controls" className="fixed bottom-4 right-4 z-40 max-w-[94vw] sm:max-w-xl transition-all duration-300">
      {/* Expanded 8-Language Selector Flyout */}
      {isExpanded && (
        <div className="mb-2 p-3 sm:p-4 rounded-2xl bg-[#0f1320]/95 backdrop-blur-xl border border-[#c99738]/50 shadow-[0_10px_35px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#fcedc7]">
              <Languages className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Select Language (8 Supported)</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 text-stone-400 hover:text-white rounded-md hover:bg-stone-800"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {SUPPORTED_LANGUAGES.map((langOpt) => {
              const isSelected = langOpt.code === language;
              const glyph = SCRIPT_ICONS[langOpt.code];

              return (
                <button
                  key={langOpt.code}
                  type="button"
                  onClick={() => {
                    setLanguage(langOpt.code);
                    setIsExpanded(false);
                  }}
                  className={`p-2 rounded-xl text-left transition-all flex items-center gap-2 cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#580014] to-[#78001b] border-[#d4af37] text-[#fcedc7] font-bold shadow-md'
                      : 'bg-[#141926] border-stone-800 text-stone-300 hover:border-[#c99738]/50 hover:bg-[#1c2336] hover:text-[#fae29c]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#3d0208]'
                        : 'bg-stone-800 text-[#d4af37]'
                    }`}
                  >
                    {glyph}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs truncate">{langOpt.nativeName}</div>
                    <div className="text-[10px] text-stone-400 truncate">{langOpt.label}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Floating Pill Bar */}
      <div className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-[#0a0d17]/95 backdrop-blur-xl border border-[#c99738]/40 shadow-[0_8px_30px_rgba(0,0,0,0.7)] text-xs text-stone-200">
        {/* Home Button */}
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer shadow-sm ${
            currentPath === '/'
              ? 'bg-[#580014] text-[#fcedc7] border border-[#d4af37]/60'
              : 'bg-stone-900/90 hover:bg-[#580014] text-stone-300 hover:text-[#fcedc7] border border-stone-700/80'
          }`}
          title="Go to Homepage"
        >
          <Home className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="hidden sm:inline">{t.nav?.home || 'Home'}</span>
        </button>

        {/* Close Button */}
        {currentPath !== '/' && (
          <button
            type="button"
            onClick={handleCloseOrBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/80 transition-all cursor-pointer shadow-sm"
            title="Close page / return to Home"
          >
            <X className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">{t.common?.close || 'Close'}</span>
          </button>
        )}

        {/* 8-Language Quick Toggle Trigger / Indicator */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold bg-gradient-to-r from-[#997022] to-[#c99738] text-[#290106] hover:from-[#b38328] hover:to-[#dfab43] border border-[#e8c872] transition-all cursor-pointer shadow-md"
          title="Toggle Language Menu (8 Supported)"
        >
          <Globe className="w-3.5 h-3.5 text-[#290106]" />
          <span>{currentLang.nativeName}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#290106]" />
          {isExpanded ? (
            <ChevronDown className="w-3 h-3 text-[#290106]" />
          ) : (
            <ChevronUp className="w-3 h-3 text-[#290106]" />
          )}
        </button>
      </div>
    </aside>
  );
};
