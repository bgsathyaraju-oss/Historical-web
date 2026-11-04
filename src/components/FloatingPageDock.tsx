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

const DOCK_LANG_HEADER: Record<LanguageCode, string> = {
  en: 'Select Language (8 Supported)',
  hi: 'भाषा चुनें (8 भाषाएँ उपलब्ध)',
  te: 'భాషను ఎంచుకోండి (8 భాషలు)',
  kn: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ (8 ಭಾಷೆಗಳು)',
  ta: 'மொழியைத் தேர்ந்தெடுக்கவும் (8 மொழிகள்)',
  mr: 'भाषा निवडा (८ भाषा उपलब्ध)',
  or: 'ଭାଷା ବାଛନ୍ତୁ (୮ଟି ଭାଷା)',
  bn: 'ভাষা নির্বাচন করুন (৮টি ভাষা)'
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
    <aside
      aria-label="Navigation & Language Controls"
      className="model4-navy-scope no-print print:hidden relative z-30 w-full bg-gradient-to-r from-[#071229] via-[#0B1B3D] to-[#071229] border-t-2 border-[#D4AF37] py-2.5 px-3 sm:px-6 transition-all duration-300"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Expanded 8-Language Selector Flyout */}
        {isExpanded && (
          <div className="w-full mb-2.5 p-3 sm:p-4 rounded-2xl bg-[#F5EBD9] text-[#292521] border-2 border-[#D4AF37] shadow-[0_12px_32px_rgba(7,18,41,0.45)] animate-in fade-in duration-150">
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#D8C3A2] text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#54351F] min-w-0 leading-[1.4]">
                <Languages className="w-3.5 h-3.5 text-[#A87924] shrink-0" />
                <span className="break-words">{DOCK_LANG_HEADER[language] || DOCK_LANG_HEADER.en}</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 text-[#6B5948] hover:text-[#292521] rounded-md hover:bg-[#E9D9BE] shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {SUPPORTED_LANGUAGES.map(langOpt => {
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
                    className={`p-2 rounded-xl text-left transition-all flex items-center gap-2 cursor-pointer border min-w-0 ${
                      isSelected
                        ? 'bg-[#762D35] border-[#D4AF37] text-white font-bold shadow-sm'
                        : 'bg-[#FFFCF5] border-[#D8C3A2] text-[#292521] hover:border-[#A87924] hover:bg-[#E9D9BE] hover:text-[#54351F]'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected ? 'bg-[#FFFCF5] text-[#762D35]' : 'bg-[#E9D9BE] text-[#54351F]'
                      }`}
                    >
                      {glyph}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs leading-[1.4] break-words">{langOpt.nativeName}</div>
                      <div className={`text-[10px] leading-[1.35] truncate ${isSelected ? 'text-[#FFF9EF]' : 'text-[#6B5948]'}`}>
                        {langOpt.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Royal Navy & Antique Gold Pill Bar (Docked cleanly, never covering hero or content) */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 sm:p-2 rounded-2xl border border-[#D4AF37]/80 bg-[#0B1B3D]/90 shadow-md text-xs max-w-full">
          {/* Home Button */}
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold leading-[1.4] transition-all cursor-pointer shadow-sm ${
              currentPath === '/' ? 'model4-btn-gold' : 'model4-navy-pill'
            }`}
            title="Go to Homepage"
          >
            <Home className="w-3.5 h-3.5 shrink-0" />
            <span>{t.nav?.home || 'Home'}</span>
          </button>

          {/* Close Button */}
          {currentPath !== '/' && (
            <button
              type="button"
              onClick={handleCloseOrBack}
              className="model4-navy-pill flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold leading-[1.4] transition-all cursor-pointer shadow-sm"
              title="Close page / return to Home"
            >
              <X className="w-3.5 h-3.5 text-[#F5E1A4] shrink-0" />
              <span>{t.common?.close || 'Close'}</span>
            </button>
          )}

          {/* 8-Language Quick Toggle Trigger / Indicator */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="model4-btn-maroon flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold leading-[1.4] transition-all cursor-pointer shadow-sm"
            title="Toggle Language Menu (8 Supported)"
          >
            <Globe className="w-3.5 h-3.5 shrink-0" />
            <span>{currentLang.nativeName}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5E1A4] shrink-0" />
            {isExpanded ? <ChevronDown className="w-3 h-3 shrink-0" /> : <ChevronUp className="w-3 h-3 shrink-0" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
