import React, { useState, useEffect } from 'react';
import { GenealogyNode, HistoricalClaim } from '../types';
import { Crown, ShieldCheck, Scroll, Info, AlertTriangle, BookOpen } from 'lucide-react';
import { GenealogyTree } from '../components/GenealogyTree';
import { ClaimCard } from '../components/ClaimCard';
import { useLanguage } from '../context/LanguageContext';
import { getCanonicalGenealogy, getCanonicalClaims } from '../data/archivalSeedData';

interface RoyalGenealogyPageProps {
  onNavigate: (path: string) => void;
}

export const RoyalGenealogyPage: React.FC<RoyalGenealogyPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const [nodes, setNodes] = useState<GenealogyNode[]>(() => getCanonicalGenealogy(language));
  const [claims, setClaims] = useState<HistoricalClaim[]>(() => getCanonicalClaims(language));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localGen = getCanonicalGenealogy(language);
    const localClaims = getCanonicalClaims(language);
    setNodes(localGen);
    setClaims(localClaims);

    Promise.all([
      fetch(`/api/content/genealogy?lang=${language}`).then(r => (r.ok ? r.json() : null)).catch(() => null),
      fetch(`/api/content/claims?lang=${language}`).then(r => (r.ok ? r.json() : null)).catch(() => null)
    ]).then(([genData, claimsData]) => {
      if (genData?.genealogy && genData.genealogy.length > 0) {
        setNodes(genData.genealogy);
      }
      if (claimsData?.claims && claimsData.claims.length > 0) {
        setClaims(claimsData.claims);
      }
    }).catch(() => {})
      .finally(() => setLoading(false));
  }, [language]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-[#D8C3A2] pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE3D0] text-[#762D35] text-xs font-semibold border border-[#A87924]/40">
          <Crown className="w-3.5 h-3.5 text-[#A87924]" />
          <span>{t.genealogy.badge}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#54351F]">
          {t.genealogy.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5948] max-w-3xl leading-relaxed">
          {t.genealogy.subtitle}
        </p>
      </div>

      {/* Interactive Genealogy Tree */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#54351F]">
            {t.genealogy.chartTitle}
          </h2>
          <span className="text-xs text-[#6B5948]">
            {t.genealogy.chartSubtitle}
          </span>
        </div>

        <GenealogyTree nodes={nodes} />
      </div>

      {/* Historiographical Claims & Evidence Balance Section */}
      <div className="space-y-6 pt-6 border-t border-[#D8C3A2]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#76501F] font-royal-heading">
            <Scroll className="w-4 h-4 text-[#A87924]" />
            <span>{t.genealogy.claimsBadge}</span>
          </div>
          <h2 className="font-royal-heading font-bold text-xl sm:text-2xl text-[#54351F]">
            {t.genealogy.claimsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5948] max-w-3xl">
            {t.genealogy.claimsSubtitle}
          </p>
        </div>

        <div className="space-y-4">
          {claims.map(claim => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      </div>
    </div>
  );
};
