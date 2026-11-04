import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { LanguageCode } from '../types';

const LANG_SELECTOR_UI: Record<LanguageCode, { title: string; selectLabel: string; countBadge: string }> = {
  en: { title: 'Change Website Language (8 Supported Languages)', selectLabel: 'Select Language', countBadge: '8 Languages' },
  hi: { title: 'वेबसाइट की भाषा बदलें (8 भाषाएँ उपलब्ध)', selectLabel: 'भाषा चुनें', countBadge: '8 भाषाएँ' },
  te: { title: 'వెబ్‌సైట్ భాషను మార్చండి (8 భాషలు అందుబాటులో ఉన్నాయి)', selectLabel: 'భాషను ఎంచుకోండి', countBadge: '8 భాషలు' },
  kn: { title: 'ವೆಬ್‌ಸೈಟ್ ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ (8 ಭಾಷೆಗಳು ಲಭ್ಯವಿವೆ)', selectLabel: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ', countBadge: '8 ಭಾಷೆಗಳು' },
  ta: { title: 'இணையதள மொழியை மாற்றவும் (8 மொழிகள்)', selectLabel: 'மொழியைத் தேர்ந்தெடுக்கவும்', countBadge: '8 மொழிகள்' },
  mr: { title: 'वेबसाइटची भाषा बदला (८ भाषा उपलब्ध)', selectLabel: 'भाषा निवडा', countBadge: '८ भाषा' },
  or: { title: 'ୱେବସାଇଟ୍ ଭାଷା ପରିବର୍ତ୍ତନ କରନ୍ତୁ (୮ଟି ଭାଷା)', selectLabel: 'ଭାଷା ବାଛନ୍ତୁ', countBadge: '୮ଟି ଭାଷା' },
  bn: { title: 'ওয়েবসাইটের ভাষা পরিবর্তন করুন (৮টি ভাষা)', selectLabel: 'ভাষা নির্বাচন করুন', countBadge: '৮টি ভাষা' }
};

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];
  const ui = LANG_SELECTOR_UI[language] || LANG_SELECTOR_UI.en;

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
        className="royal-btn-maroon model4-navy-pill min-h-[32px] sm:min-h-[36px] inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 text-[10.5px] sm:text-xs font-serif font-bold leading-[1.3] rounded-lg sm:rounded-xl shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={ui.title}
      >
        <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFE596] shrink-0" />
        <span className="font-bold royal-text-ivory leading-[1.3]">{currentLang.nativeName}</span>
        <span className="hidden xl:inline text-[10.5px] royal-text-gold">({currentLang.code.toUpperCase()})</span>
        <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFE596] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 w-60 sm:w-64 max-w-[calc(100vw-24px)] rounded-2xl bg-[#F5EBD9] border-2 border-[#D4AF37] shadow-[0_16px_40px_rgba(7,18,41,0.45)] py-1.5 divide-y divide-[#D8C3A2] focus:outline-none animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 text-[11px] font-bold tracking-wider text-[#54351F] uppercase bg-[#EFE3D0] flex items-center justify-between gap-2">
            <span className="leading-[1.4] break-words">{ui.selectLabel}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#762D35] text-white shrink-0 leading-[1.35]">{ui.countBadge}</span>
          </div>
          <div className="py-1 max-h-72 sm:max-h-80 overflow-y-auto">
            {SUPPORTED_LANGUAGES.map((langOption) => {
              const isSelected = langOption.code === language;
              return (
                <button
                  key={langOption.code}
                  onClick={() => {
                    setLanguage(langOption.code as LanguageCode);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between gap-2 transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#762D35] text-white font-semibold border-l-4 border-[#D4AF37]'
                      : 'text-[#292521] hover:bg-[#E9D9BE] hover:text-[#54351F]'
                  }`}
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold leading-[1.4]">{langOption.nativeName}</span>
                    <span className={`text-[11px] leading-[1.35] ${isSelected ? 'text-[#FFF9EF]' : 'text-[#6B5948]'}`}>
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
