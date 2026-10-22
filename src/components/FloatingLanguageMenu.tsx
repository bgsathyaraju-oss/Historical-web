import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown, Sparkles, X, ChevronRight, Languages } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { LanguageCode, LanguageOption } from '../types';

interface FloatingLanguageMenuProps {
  className?: string;
  variant?: 'floating-bar' | 'dropdown' | 'compact';
}

const SCRIPT_EMBLEMS: Record<LanguageCode, { char: string; region: string }> = {
  en: { char: 'En', region: 'Global Archival' },
  hi: { char: 'अ', region: 'National Standard' },
  te: { char: 'తె', region: 'Andhra & Deccan' },
  kn: { char: 'ಕ', region: 'Karnataka & Vijayanagara' },
  ta: { char: 'த', region: 'Tamil Country (Kaveri)' },
  mr: { char: 'म', region: 'Western Deccan' },
  or: { char: 'ଓ', region: 'Odra Desha & Puri' },
  bn: { char: 'বা', region: 'Gauda & Bengal' }
};

export const FloatingLanguageMenu: React.FC<FloatingLanguageMenuProps> = ({
  className = '',
  variant = 'floating-bar'
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Close floating card on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setMenuOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Floating Sub-Bar (Docked beneath or within Navbar) */}
      <div className="w-full bg-[#0a0d16]/95 backdrop-blur-md border-b border-[#c99738]/25 shadow-md py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          {/* Left Title Indicator with Toggle Trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#580014]/60 hover:bg-[#580014] border border-[#d4af37]/40 text-[#fcedc7] hover:text-[#e8c872] transition-all cursor-pointer shrink-0"
            title="Open 8-Language Grid Menu"
          >
            <Languages className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span className="font-semibold tracking-wide hidden sm:inline">
              Languages (8)
            </span>
            <span className="font-bold text-[#e8c872] sm:hidden">
              {currentLang.nativeName}
            </span>
            <ChevronDown className={`w-3 h-3 text-[#d4af37] transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Center/Right 8 Horizontal Language Toggle Pills */}
          <div className="flex-1 flex items-center justify-end sm:justify-start gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-[11px] text-stone-400 uppercase tracking-wider hidden lg:inline mr-1 font-medium">
              Toggle:
            </span>
            {SUPPORTED_LANGUAGES.map((langOpt) => {
              const isSelected = langOpt.code === language;
              const emblem = SCRIPT_EMBLEMS[langOpt.code];

              return (
                <button
                  key={langOpt.code}
                  type="button"
                  onClick={() => handleSelectLanguage(langOpt.code)}
                  title={`Switch to ${langOpt.label} (${langOpt.nativeName})`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#997022] to-[#c99738] text-[#290106] font-bold border-[#e8c872] shadow-[0_0_12px_rgba(201,151,56,0.4)] scale-[1.02]'
                      : 'bg-[#121622]/90 text-stone-300 border-stone-800 hover:border-[#c99738]/50 hover:bg-[#1a2133] hover:text-[#fae29c]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isSelected
                        ? 'bg-[#3d0309] text-[#fae29c]'
                        : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {emblem.char}
                  </span>
                  <span className="tracking-tight">{langOpt.nativeName}</span>
                  {isSelected && <Check className="w-3 h-3 text-[#290106] ml-0.5 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Detailed Modal / Grid Flyout */}
      {menuOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 mt-2 z-50 w-[95vw] sm:w-[480px] max-w-lg rounded-2xl bg-[#0f131f] border border-[#d4af37]/60 shadow-[0_15px_40px_rgba(0,0,0,0.85)] p-5 text-stone-200 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
          {/* Menu Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#580014] border border-[#d4af37]/40 text-[#d4af37]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-royal-heading font-extrabold text-sm sm:text-base text-[#fcedc7]">
                  Multilingual Historical Gateway
                </h3>
                <p className="text-[11px] text-[#c99738]">
                  Select from 8 supported languages across medieval & modern India
                </p>
              </div>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 8 Language Grid Cards */}
          <div className="grid grid-cols-2 gap-2.5 py-4 max-h-[60vh] overflow-y-auto">
            {SUPPORTED_LANGUAGES.map((langOpt) => {
              const isSelected = langOpt.code === language;
              const emblem = SCRIPT_EMBLEMS[langOpt.code];

              return (
                <button
                  key={langOpt.code}
                  type="button"
                  onClick={() => handleSelectLanguage(langOpt.code)}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#580014] to-[#2b0108] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'bg-[#141926] border-stone-800/80 hover:border-[#c99738]/50 hover:bg-[#1a2236]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shrink-0 border ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#330009] border-[#fcedc7]'
                        : 'bg-[#1b2335] text-[#d4af37] border-stone-700 group-hover:scale-105'
                    }`}
                  >
                    {emblem.char}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`font-semibold text-sm truncate ${isSelected ? 'text-[#fcedc7]' : 'text-stone-200 group-hover:text-[#fae29c]'}`}>
                        {langOpt.nativeName}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#d4af37] shrink-0" />}
                    </div>
                    <div className="text-[11px] text-stone-400 truncate">
                      {langOpt.label} • {langOpt.script}
                    </div>
                    <div className="text-[10px] text-[#c99738]/80 mt-0.5 truncate font-medium">
                      {emblem.region}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Status */}
          <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1.5 text-[#e8c872]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full 8-Language Epigraphic & UI Coverage</span>
            </span>
            <span className="text-[11px] font-semibold text-stone-300">
              Active: <strong className="text-[#fcedc7]">{currentLang.nativeName}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
