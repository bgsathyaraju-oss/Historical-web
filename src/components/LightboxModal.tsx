import React from 'react';
import { X, ShieldCheck, MapPin, Calendar, User, FileText, ExternalLink } from 'lucide-react';
import { GalleryItem } from '../types';
import { EvidenceBadge } from './EvidenceBadge';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
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
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
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
                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> Approximate Period:
              </span>
              <p className="font-semibold text-stone-200">{item.period}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-stone-400 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Location / Findspot:
              </span>
              <p className="font-semibold text-stone-200">{item.location}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-stone-400 font-medium flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#d4af37]" /> Creator / Photographer:
              </span>
              <p className="font-semibold text-stone-200">{item.creator_photographer}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-stone-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> License & Rights:
              </span>
              <p className="font-semibold text-stone-200">{item.copyright_license}</p>
            </div>
          </div>

          {/* Description & Historical Provenance */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
              Archival Description & Provenance
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#0c0f17] p-3 rounded-xl border border-stone-800">
              {item.description}
            </p>
            <div className="text-[11px] text-stone-400 flex items-center gap-2 pt-1">
              <span className="font-medium text-stone-300">Archival Source Record:</span>
              <span>{item.source}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
