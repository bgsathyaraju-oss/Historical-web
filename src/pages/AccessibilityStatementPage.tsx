import React from 'react';
import { Eye, Globe, Sparkles, CheckCircle } from 'lucide-react';

export const AccessibilityStatementPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-[#D8C3A2] pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#76501F] font-royal-heading">
          <Eye className="w-4 h-4 text-[#A87924]" />
          <span>WCAG 2.1 & Universal Design Commitment</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#54351F]">
          Accessibility Statement
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5948]">
          Ensuring Digital Archival Access for All Scholars & Community Members
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[#292521] font-royal-serif leading-relaxed">
        <section className="p-6 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#54351F]">
            1. Universal Design & Multi-Script Typography
          </h2>
          <p>
            The Suryavamsha Odiyaraju Kshatriya Portal is engineered in compliance with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. We ensure high-contrast readability, semantic HTML hierarchy, and native font rendering for eight languages across mobile, tablet, and desktop environments.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#54351F]">
            2. Key Accessibility Features
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-[#292521]">
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
