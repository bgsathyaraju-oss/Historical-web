import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { Landmark, Search, Filter, ShieldCheck, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { LightboxModal } from '../components/LightboxModal';

export const HistoricalGalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/content/gallery?category=${activeCategory}`)
      .then(r => r.json())
      .then(d => setItems(d.gallery || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const categories = [
    { id: 'all', label: 'All Artifacts' },
    { id: 'forts', label: 'Forts & Citadels' },
    { id: 'temples', label: 'Temples & Monuments' },
    { id: 'sculptures', label: 'Sculptures' },
    { id: 'manuscripts', label: 'Manuscripts' },
    { id: 'maps', label: 'Historical Maps' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Landmark className="w-4 h-4" />
          <span>Visual Preservation & Photographic Archives</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Historical Gallery & Archival Imagery
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          High-resolution photographic documentation of dressed stone ramparts, temple architecture, palm-leaf manuscripts, and cartographic reconstructions. Click any image to view licensing, provenance, and archival details.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-800">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-[#c99738] text-[#300207] shadow-md'
                : 'bg-[#121622] text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group rounded-2xl overflow-hidden bg-[#121622] border border-stone-800 hover:border-[#c99738] shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="h-56 overflow-hidden relative">
              <img
                src={item.image_url}
                alt={item.alt_text}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#fcedc7] bg-[#580014]/90 px-2.5 py-1 rounded-full border border-[#d4af37]/40">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-[#d4af37] font-semibold">
                  {item.period} • {item.location}
                </span>
                <h3 className="font-royal-heading font-bold text-base text-stone-100 group-hover:text-[#e8c872] transition-colors leading-snug mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/80 text-[11px] text-stone-500 flex items-center justify-between">
                <span>License: {item.copyright_license}</span>
                <span className="text-[#e8c872] font-semibold">Inspect Record →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
