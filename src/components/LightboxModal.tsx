import React from 'react';
import { X, ShieldCheck, MapPin, Calendar, User } from 'lucide-react';
import { GalleryItem, LanguageCode } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

const LIGHTBOX_UI: Record<
  LanguageCode,
  {
    periodLabel: string;
    locationLabel: string;
    creatorLabel: string;
    licenseLabel: string;
    descHeading: string;
    sourceLabel: string;
  }
> = {
  en: {
    periodLabel: 'Approximate Period:',
    locationLabel: 'Location / Findspot:',
    creatorLabel: 'Creator / Photographer:',
    licenseLabel: 'License & Rights:',
    descHeading: 'Archival Description & Provenance',
    sourceLabel: 'Archival Source Record:'
  },
  hi: {
    periodLabel: 'अनुमानित काल:',
    locationLabel: 'स्थान / प्राप्ति-स्थल:',
    creatorLabel: 'निर्माता / छायाकार:',
    licenseLabel: 'लाइसेंस एवं अधिकार:',
    descHeading: 'अभिलेखीय विवरण एवं मूल स्रोत',
    sourceLabel: 'अभिलेखीय स्रोत रिकॉर्ड:'
  },
  te: {
    periodLabel: 'సుమారు కాలం:',
    locationLabel: 'ప్రదేశం / లభించిన స్థలం:',
    creatorLabel: 'రూపకర్త / ఫోటోగ్రాఫర్:',
    licenseLabel: 'లైసెన్స్ & హక్కులు:',
    descHeading: 'చారిత్రక వివరణ & మూల ఆధారం',
    sourceLabel: 'పురాతన ఆధార రికార్డు:'
  },
  kn: {
    periodLabel: 'ಅಂದಾಜು ಕಾಲ:',
    locationLabel: 'ಸ್ಥಳ / ದೊರೆತ ಸ್ಥಳ:',
    creatorLabel: 'ರಚನೆಕಾರರು / ಛಾಯಾಗ್ರಾಹಕರು:',
    licenseLabel: 'ಪರವಾನಗಿ ಮತ್ತು ಹಕ್ಕುಗಳು:',
    descHeading: 'ದಾಖಲೆ ವಿವರಣೆ ಮತ್ತು ಮೂಲ',
    sourceLabel: 'ಪತ್ರಾಗಾರ ಆಕರ ದಾಖಲೆ:'
  },
  ta: {
    periodLabel: 'தோராயமான காலம்:',
    locationLabel: 'இடம் / கண்டெடுக்கப்பட்ட இடம்:',
    creatorLabel: 'உருவாக்கியவர் / புகைப்படக்காரர்:',
    licenseLabel: 'உரிமம் மற்றும் உரிமைகள்:',
    descHeading: 'ஆவண விவரம் மற்றும் வரலாற்று மூலம்',
    sourceLabel: 'ஆவண ஆதாரப் பதிவு:'
  },
  mr: {
    periodLabel: 'अंदाजे काळ:',
    locationLabel: 'ठिकाण / प्राप्ती स्थळ:',
    creatorLabel: 'निर्माता / छायाचित्रकार:',
    licenseLabel: 'परवाना आणि हक्क:',
    descHeading: 'अभिलेखीय वर्णन आणि मूळ संदर्भ',
    sourceLabel: 'अभिलेखीय स्रोत नोंद:'
  },
  or: {
    periodLabel: 'ଆନୁମାନିକ ସମୟ:',
    locationLabel: 'ସ୍ଥାନ / ପ୍ରାପ୍ତି ସ୍ଥଳ:',
    creatorLabel: 'ନିର୍ମାତା / ଫଟୋଗ୍ରାଫର:',
    licenseLabel: 'ଲାଇସେନ୍ସ ଓ ଅଧିକାର:',
    descHeading: 'ଅଭିଲେଖୀୟ ବିବରଣୀ ଓ ମୂଳ ଉତ୍ସ',
    sourceLabel: 'ଅଭିଲେଖୀୟ ଉତ୍ସ ରେକର୍ଡ:'
  },
  bn: {
    periodLabel: 'আনুমানিক সময়কাল:',
    locationLabel: 'স্থান / প্রাপ্তিস্থান:',
    creatorLabel: 'নির্মাতা / আলোকচিত্রী:',
    licenseLabel: 'লাইসেন্স ও অধিকার:',
    descHeading: 'আর্কাইভাল বিবরণ ও উৎস',
    sourceLabel: 'আর্কাইভাল উৎস নথি:'
  }
};

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  const { language } = useLanguage();
  const ui = LIGHTBOX_UI[language] || LIGHTBOX_UI.en;

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#111520] border border-[#c99738]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-800 bg-[#161c2a]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] px-2.5 py-0.5 rounded bg-stone-900 border border-stone-800">
              {item.category}
            </span>
            <h3 className="font-royal-heading font-bold text-sm sm:text-base text-stone-100 truncate max-w-md">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {/* Main Visual Image */}
          <div className="relative w-full rounded-xl overflow-hidden bg-black/50 border border-stone-800 flex items-center justify-center max-h-[50vh]">
            <img
              src={item.image_url}
              alt={item.alt_text || item.title}
              className="max-h-[50vh] w-auto object-contain mx-auto"
            />
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-[#161c2b] p-4 rounded-xl border border-stone-800">
            <div className="space-y-0.5">
              <span className="text-stone-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> {ui.periodLabel}
              </span>
              <p className="font-semibold text-stone-200">{item.period}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-stone-400 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> {ui.locationLabel}
              </span>
              <p className="font-semibold text-stone-200">{item.location}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-stone-400 font-medium flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#d4af37]" /> {ui.creatorLabel}
              </span>
              <p className="font-semibold text-stone-200">{item.creator_photographer}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-stone-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> {ui.licenseLabel}
              </span>
              <p className="font-semibold text-stone-200">{item.copyright_license}</p>
            </div>
          </div>

          {/* Description & Historical Provenance */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
              {ui.descHeading}
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#0c0f17] p-3 rounded-xl border border-stone-800">
              {item.description}
            </p>
            <div className="text-[11px] text-stone-400 flex items-center gap-2 pt-1">
              <span className="font-medium text-stone-300">{ui.sourceLabel}</span>
              <span>{item.source}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
