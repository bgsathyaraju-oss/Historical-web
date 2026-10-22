import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { LanguageCode } from '../types';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-[#181d28] hover:bg-[#222938] text-[#e8c872] border border-[#c99738]/40 hover:border-[#c99738] shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#c99738]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Change Website Language"
      >
        <Globe className="w-4 h-4 text-[#d4af37]" />
        <span className="font-semibold">{currentLang.nativeName}</span>
        <span className="hidden md:inline text-xs text-stone-400">({currentLang.label})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl bg-[#121620] border border-[#c99738]/50 shadow-2xl py-1.5 divide-y divide-stone-800 focus:outline-none animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-[#d4af37] uppercase bg-[#181e2b]/50">
            Select Language (8 Supported)
          </div>
          <div className="py-1 max-h-80 overflow-y-auto">
            {SUPPORTED_LANGUAGES.map((langOption) => {
              const isSelected = langOption.code === language;
              return (
                <button
                  key={langOption.code}
                  onClick={() => {
                    setLanguage(langOption.code as LanguageCode);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors duration-150 ${
                    isSelected
                      ? 'bg-[#580014]/60 text-[#fcedc7] font-semibold border-l-2 border-[#d4af37]'
                      : 'text-stone-300 hover:bg-[#1a2232] hover:text-[#e8c872]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{langOption.nativeName}</span>
                    <span className="text-[11px] text-stone-400">{langOption.label} • {langOption.script}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#d4af37] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
