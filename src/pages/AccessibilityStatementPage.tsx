import React from 'react';
import { Eye, Globe, Sparkles, CheckCircle } from 'lucide-react';

export const AccessibilityStatementPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-800 pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Eye className="w-4 h-4" />
          <span>WCAG 2.1 & Universal Design Commitment</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Accessibility Statement
        </h1>
        <p className="text-xs sm:text-sm text-stone-400">
          Ensuring Digital Archival Access for All Scholars & Community Members
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed">
        <section className="p-6 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#fcedc7]">
            1. Universal Design & Multi-Script Typography
          </h2>
          <p>
            The Suryavamsha Odiyaraju Kshatriya Portal is engineered in compliance with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. We ensure high-contrast readability, semantic HTML hierarchy, and native font rendering for eight languages across mobile, tablet, and desktop environments.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#121622] border border-stone-800 space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#fcedc7]">
            2. Key Accessibility Features
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-stone-400">
            <li><strong>Keyboard Navigation:</strong> Fully operable without requiring a mouse; interactive modals include ESC key dismissal.</li>
            <li><strong>Screen-Reader Compatibility:</strong> Meaningful alt text provided for all historical photographs, temple carvings, and manuscript folios.</li>
            <li><strong>Color Contrast:</strong> Text colors against ivory, slate, and royal maroon backgrounds exceed the minimum 4.5:1 contrast ratio.</li>
            <li><strong>Cross-Device Responsive Design:</strong> Smooth zoom capability up to 200% without loss of functional layout.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
