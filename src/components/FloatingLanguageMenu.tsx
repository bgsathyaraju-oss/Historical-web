import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown, Sparkles, X, Languages } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { LanguageCode } from '../types';

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
}) => {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

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
      <div className="w-full bg-[#EFE3D0] border-b border-[#D8C3A2] shadow-sm py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          {/* Left Title Indicator with Toggle Trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#762D35] hover:bg-[#5e2229] border border-[#A87924] text-white transition-all cursor-pointer shrink-0 shadow-sm"
            title="Open 8-Language Grid Menu"
          >
            <Languages className="w-3.5 h-3.5 text-white" />
            <span className="font-semibold tracking-wide hidden sm:inline">
              Languages (8)
            </span>
            <span className="font-bold text-white sm:hidden">
              {currentLang.nativeName}
            </span>
            <ChevronDown className={`w-3 h-3 text-white transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Center/Right 8 Horizontal Language Toggle Pills */}
          <div className="flex-1 flex items-center justify-end sm:justify-start gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-[11px] text-[#6B5948] uppercase tracking-wider hidden lg:inline mr-1 font-semibold">
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
                      ? 'bg-[#762D35] text-white font-bold border-[#A87924] shadow-sm scale-[1.02]'
                      : 'bg-[#FFFCF5] text-[#292521] border-[#D8C3A2] hover:border-[#A87924] hover:bg-[#E9D9BE] hover:text-[#54351F]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isSelected
                        ? 'bg-[#FFFCF5] text-[#762D35]'
                        : 'bg-[#E9D9BE] text-[#54351F]'
                    }`}
                  >
                    {emblem.char}
                  </span>
                  <span className="tracking-tight">{langOpt.nativeName}</span>
                  {isSelected && <Check className="w-3 h-3 text-white ml-0.5 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Detailed Modal / Grid Flyout */}
      {menuOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 mt-2 z-50 w-[95vw] sm:w-[480px] max-w-lg rounded-2xl bg-[#F1E4D0] border-2 border-[#A87924] shadow-[0_15px_40px_rgba(75,51,31,0.22)] p-5 text-[#292521] animate-in fade-in zoom-in-95 duration-150">
          {/* Menu Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#D8C3A2]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#762D35] border border-[#A87924] text-white">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-royal-heading font-extrabold text-sm sm:text-base text-[#54351F]">
                  Multilingual Historical Gateway
                </h3>
                <p className="text-[11px] text-[#76501F] font-medium">
                  Select from 8 supported languages across medieval & modern India
                </p>
              </div>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1.5 rounded-lg text-[#6B5948] hover:text-[#292521] hover:bg-[#E9D9BE] transition-colors"
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
                      ? 'bg-[#762D35] border-[#A87924] text-white shadow-md'
                      : 'bg-[#FFFCF5] border-[#D8C3A2] hover:border-[#A87924] hover:bg-[#E9D9BE]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shrink-0 border ${
                      isSelected
                        ? 'bg-[#FFFCF5] text-[#762D35] border-[#A87924]'
                        : 'bg-[#E9D9BE] text-[#54351F] border-[#D8C3A2] group-hover:scale-105'
                    }`}
                  >
                    {emblem.char}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`font-semibold text-sm truncate ${isSelected ? 'text-white' : 'text-[#54351F]'}`}>
                        {langOpt.nativeName}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                    </div>
                    <div className={`text-[11px] truncate ${isSelected ? 'text-[#FFF9EF]' : 'text-[#6B5948]'}`}>
                      {langOpt.label} • {langOpt.script}
                    </div>
                    <div className={`text-[10px] mt-0.5 truncate font-medium ${isSelected ? 'text-[#E9D9BE]' : 'text-[#76501F]'}`}>
                      {emblem.region}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Status */}
          <div className="pt-3 border-t border-[#D8C3A2] flex items-center justify-between text-xs text-[#6B5948]">
            <span className="flex items-center gap-1.5 text-[#54351F] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#A87924]" />
              <span>Full 8-Language Epigraphic & UI Coverage</span>
            </span>
            <span className="text-[11px] font-semibold text-[#6B5948]">
              Active: <strong className="text-[#54351F]">{currentLang.nativeName}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
