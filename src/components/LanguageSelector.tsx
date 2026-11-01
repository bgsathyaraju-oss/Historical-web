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
        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-[#FFFCF5] hover:bg-[#E9D9BE] text-[#54351F] border border-[#D8C3A2] hover:border-[#A87924] shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#A87924]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Change Website Language"
      >
        <Globe className="w-4 h-4 text-[#A87924]" />
        <span className="font-semibold text-[#54351F]">{currentLang.nativeName}</span>
        <span className="hidden md:inline text-xs text-[#6B5948]">({currentLang.label})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#6B5948] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-60 rounded-xl bg-[#F1E4D0] border-2 border-[#A87924] shadow-[0_12px_32px_rgba(75,51,31,0.20)] py-1.5 divide-y divide-[#D8C3A2] focus:outline-none animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-2 text-[11px] font-bold tracking-wider text-[#54351F] uppercase bg-[#EFE3D0]">
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
                  className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#762D35] text-white font-semibold border-l-4 border-[#A87924]'
                      : 'text-[#292521] hover:bg-[#E9D9BE] hover:text-[#54351F]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{langOption.nativeName}</span>
                    <span className={`text-[11px] ${isSelected ? 'text-[#FFF9EF]' : 'text-[#6B5948]'}`}>
                      {langOption.label} • {langOption.script}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
