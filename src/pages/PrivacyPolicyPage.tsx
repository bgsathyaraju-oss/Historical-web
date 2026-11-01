import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, UserCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-[#D8C3A2] pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#76501F] font-royal-heading">
          <ShieldCheck className="w-4 h-4 text-[#A87924]" />
          <span>Data Protection & Privacy Standards</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#54351F]">
          Privacy Policy & Member Data Rights
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5948]">
          Last Updated: October 2026 • Governing Data Governance Principles
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[#292521] font-royal-serif leading-relaxed">
        <section className="p-6 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#54351F]">
            1. Commitment to Personal Data Minimization
          </h2>
          <p>
            The Suryavamsha Odiyaraju Kshatriya Portal collects personal details strictly for verified historical documentation and voluntary community directory connection. We do not monetize, sell, or license member personal information to third-party commercial brokers or advertisers under any circumstances.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#54351F]">
            2. Absolute Protection of Sensitive Information
          </h2>
          <p>
            In accordance with digital privacy regulations:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#292521]">
            <li><strong>Dates of Birth:</strong> Stored securely in encrypted form solely for age-verification safeguards and are NEVER displayed publicly.</li>
            <li><strong>Exact Residential Addresses:</strong> Never exposed; only general district and state locations are shared in accordance with your chosen profile visibility.</li>
            <li><strong>Private Email Addresses:</strong> Never exposed in public APIs, crawlable search engine meta, or downloadable listings.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#54351F]">
            3. Member Visibility Controls
          </h2>
          <p>
            Every registered member has the absolute right to set their profile visibility to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#292521]">
            <li><strong>Public:</strong> Basic name and state visible to scholarly visitors.</li>
            <li><strong>Registered Members Only:</strong> Visible only to authenticated community members.</li>
            <li><strong>Private:</strong> Excluded entirely from directory searches.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-sm space-y-3">
          <h2 className="font-royal-heading font-bold text-base text-[#54351F]">
            4. Right to Deletion & Account Purging
          </h2>
          <p>
            Members retain the right to request the complete deletion of their account credentials and the anonymization of any contributed public research at any time through their Member Dashboard.
          </p>
        </section>
      </div>
    </div>
  );
};
