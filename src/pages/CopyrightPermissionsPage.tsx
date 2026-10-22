import React from 'react';
import { ShieldCheck, BookOpen, ExternalLink, Image } from 'lucide-react';

export const CopyrightPermissionsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-800 pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <ShieldCheck className="w-4 h-4" />
          <span>Intellectual Property & Licensing</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Copyright, Archival Citations & Image Permissions
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          Standards for Archival Fair Use, Open Cultural Heritage, and Image Licensing
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed">
        <section className="p-6 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#fcedc7]">
            1. Public Domain Status of Ancient Epigraphs
          </h2>
          <p>
            Ancient Sanskrit, Odia, and Telugu stone inscriptions and copper-plate grants incised during the medieval era (pre-1900) exist in the universal Public Domain. Their digital transcriptions and photographic records on this site are published for non-commercial educational reference.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#fcedc7]">
            2. Archival Photographs & Museum Collections
          </h2>
          <p>
            Photographs of monuments, fortresses, and palm-leaf bundles are licensed under Creative Commons (CC BY-SA 4.0, CC BY-NC 4.0) or used under Fair Dealing / Educational Archival exceptions with full attribution to original photographers, museums, or the Archaeological Survey of India.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#fcedc7]">
            3. Member Submissions & Copyright Warranty
          </h2>
          <p>
            Members contributing ancestral photographs or manuscripts confirm they hold rightful custody or permission. In the event of a legitimate copyright inquiry, the Editorial Board will immediately investigate and rectify citations or remove the content upon notice.
          </p>
        </section>
      </div>
    </div>
  );
};
