import React, { useState, useEffect } from 'react';
import { Home, X, Globe, ChevronUp, ChevronDown, Languages } from 'lucide-react';
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

const checkIsArticleReadingActive = (): boolean => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  if (document.body.getAttribute('data-article-reading') === 'true') {
    return true;
  }
  try {
    const params = new URLSearchParams(window.location.search);
    return Boolean(
      params.get('id') ||
        params.get('figure') ||
        params.get('article') ||
        params.get('record') ||
        params.get('monograph')
    );
  } catch {
    return false;
  }
};

export const FloatingPageDock: React.FC<FloatingPageDockProps> = ({ currentPath, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isArticleOpen, setIsArticleOpen] = useState<boolean>(() => checkIsArticleReadingActive());

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const syncState = () => {
      setIsArticleOpen(checkIsArticleReadingActive());
    };
    syncState();

    const observer = new MutationObserver(syncState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-article-reading']
    });
    window.addEventListener('popstate', syncState);

    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', syncState);
    };
  }, [currentPath]);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  if (isArticleOpen) {
    return null;
  }

  const handleCloseOrBack = () => {
    if (currentPath !== '/') {
      onNavigate('/');
    } else {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        try {
          window.scrollTo(0, 0);
        } catch {
          // Ignore in restricted WebViews
        }
      }
    }
  };

  return (
    <aside aria-label="Floating Navigation & Language Controls" className="no-print print:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-max max-w-[96vw] transition-all duration-300">
      {/* Expanded 8-Language Selector Flyout */}
      {isExpanded && (
        <div className="mb-2 p-3 sm:p-4 rounded-2xl bg-[#F1E4D0] border-2 border-[#A87924] shadow-[0_12px_36px_rgba(75,51,31,0.22)] animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D8C3A2] text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#54351F]">
              <Languages className="w-3.5 h-3.5 text-[#A87924]" />
              <span>Select Language (8 Supported)</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 text-[#6B5948] hover:text-[#292521] rounded-md hover:bg-[#E9D9BE]"
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
                      ? 'bg-[#762D35] border-[#A87924] text-white font-bold shadow-sm'
                      : 'bg-[#FFFCF5] border-[#D8C3A2] text-[#292521] hover:border-[#A87924] hover:bg-[#E9D9BE] hover:text-[#54351F]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected
                        ? 'bg-[#FFFCF5] text-[#762D35]'
                        : 'bg-[#E9D9BE] text-[#54351F]'
                    }`}
                  >
                    {glyph}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs truncate">{langOpt.nativeName}</div>
                    <div className={`text-[10px] truncate ${isSelected ? 'text-[#FFF9EF]' : 'text-[#6B5948]'}`}>
                      {langOpt.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Floating Pill Bar */}
      <div className="flex items-center justify-center gap-1.5 p-1.5 sm:p-2 rounded-2xl bg-[#F1E4D0]/98 backdrop-blur-md border-2 border-[#A87924] shadow-[0_8px_28px_rgba(75,51,31,0.18)] text-xs text-[#292521]">
        {/* Home Button */}
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer shadow-sm ${
            currentPath === '/'
              ? 'bg-[#762D35] text-white border border-[#A87924]'
              : 'bg-[#FFFCF5] hover:bg-[#E9D9BE] text-[#54351F] border border-[#D8C3A2]'
          }`}
          title="Go to Homepage"
        >
          <Home className={`w-3.5 h-3.5 ${currentPath === '/' ? 'text-white' : 'text-[#A87924]'}`} />
          <span className="hidden sm:inline">{t.nav?.home || 'Home'}</span>
        </button>

        {/* Close Button */}
        {currentPath !== '/' && (
          <button
            type="button"
            onClick={handleCloseOrBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold bg-[#FFFCF5] hover:bg-[#E9D9BE] text-[#54351F] border border-[#D8C3A2] transition-all cursor-pointer shadow-sm"
            title="Close page / return to Home"
          >
            <X className="w-3.5 h-3.5 text-[#762D35]" />
            <span className="hidden sm:inline">{t.common?.close || 'Close'}</span>
          </button>
        )}

        {/* 8-Language Quick Toggle Trigger / Indicator */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold bg-[#762D35] hover:bg-[#5e2229] text-white border border-[#A87924] transition-all cursor-pointer shadow-sm"
          title="Toggle Language Menu (8 Supported)"
        >
          <Globe className="w-3.5 h-3.5 text-white" />
          <span>{currentLang.nativeName}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFFCF5]" />
          {isExpanded ? (
            <ChevronDown className="w-3 h-3 text-white" />
          ) : (
            <ChevronUp className="w-3 h-3 text-white" />
          )}
        </button>
      </div>
    </aside>
  );
};
