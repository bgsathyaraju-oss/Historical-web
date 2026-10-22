import React from 'react';
import { FileText, Shield, Scale, AlertCircle } from 'lucide-react';

export const TermsConditionsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-800 pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Scale className="w-4 h-4" />
          <span>Terms of Use & Community Conduct</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Terms and Conditions
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          Governing Research Collaboration, Content Accuracy, and Member Etiquette
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed">
        <section className="p-6 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#fcedc7]">
            1. Non-Commercial Archival Purpose
          </h2>
          <p>
            The content, transcriptions, and cartographic reconstructions hosted on this platform are provided strictly for educational, historical research, and community heritage preservation. No commercial exploitation or unauthorized syndication of member research is permitted.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#fcedc7]">
            2. Historiographical Integrity & Fabricated Claims
          </h2>
          <p>
            Users and contributors agree not to upload deliberately fabricated genealogical trees, fraudulent royal charters, or manipulated photographs. All submissions are subjected to peer editorial review.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#fcedc7]">
            3. Account Security & Responsible Usage
          </h2>
          <p>
            Members are responsible for maintaining the confidentiality of their credentials and agree not to probe, reverse-engineer, or attempt unauthorized privilege escalation on the platform.
          </p>
        </section>
      </div>
    </div>
  );
};
