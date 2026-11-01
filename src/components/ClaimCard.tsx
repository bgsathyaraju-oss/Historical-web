import React, { useState } from 'react';
import { HistoricalClaim } from '../types';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Scale } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';
import { ContentDetailModal, ContentDetailItem } from './ContentDetailModal';
import { useLanguage } from '../context/LanguageContext';
import { GENEALOGY_UI_TRANSLATIONS } from '../data/multilingualSeedTranslations';

interface ClaimCardProps {
  claim: HistoricalClaim;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const { language } = useLanguage();
  const ui = GENEALOGY_UI_TRANSLATIONS[language] || GENEALOGY_UI_TRANSLATIONS.en;

  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const archiveBase = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
  const claimImgMap: Record<string, string> = {
    claim_suryavamsha_origin: `${archiveBase}copper_plate_charter.jpg`,
    claim_kapilendra_early_life: `${archiveBase}kapilendra_deva_portrait.jpg`,
    claim_kanchi_expedition: `${archiveBase}purushottama_deva.jpg`
  };
  const claimThumb = claimImgMap[claim.id] || `${archiveBase}copper_plate_charter.jpg`;

  const modalItem: ContentDetailItem | null = modalOpen
    ? {
        id: claim.id,
        title: claim.topic,
        subtitle: `${ui.claimReviewedLabel}: ${claim.review_date}`,
        badge: claim.status,
        imageUrl: claimThumb,
        imageLayout: 'banner',
        summary: `"${claim.claim_statement}"`,
        content: `${ui.reliabilityNotesLabel}\n${claim.source_reliability_notes}\n\n${ui.editorialFindingLabel}\n${claim.reviewer_comments}`,
        sections: [
          {
            heading: ui.supportingHeading,
            type: 'list',
            items: claim.supporting_evidence
          },
          {
            heading: ui.counterHeading,
            type: 'list',
            items: claim.contradictory_evidence
          }
        ]
      }
    : null;

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] hover:border-[#A87924] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-[#292521]"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#FFF9EF] border-b border-[#D8C3A2] flex flex-col sm:flex-row gap-4 items-start">
          <img
            src={claimThumb}
            alt={claim.topic}
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = '1';
                target.src = `${archiveBase}copper_plate_charter.jpg`;
              }
            }}
            className="w-20 h-20 rounded-xl object-cover object-center shrink-0 border border-[#A87924]/50 bg-[#EFE3D0]"
          />
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#54351F] px-2.5 py-0.5 rounded bg-[#EFE3D0] border border-[#D8C3A2]">
                  {claim.topic}
                </span>
                <EvidenceBadge status={claim.status} size="sm" />
              </div>
              <span className="text-xs text-[#6B5948]">
                {ui.claimReviewedLabel}: {claim.review_date}
              </span>
            </div>

            <h3 className="font-royal-heading font-bold text-sm sm:text-base text-[#54351F] leading-snug">
              "{claim.claim_statement}"
            </h3>
          </div>
        </div>

        {/* Evidence Balance Columns */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Supporting Evidence */}
            <div className="p-4 rounded-xl bg-[#EDF7F0] border border-[#2D7A4D]/40 space-y-2">
              <div className="flex items-center gap-2 text-[#14532D] font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{ui.supportingHeading}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#292521]">
                {claim.supporting_evidence.map((ev, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4D] mt-1.5 shrink-0" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contradictory Evidence or Critical Nuance */}
            <div className="p-4 rounded-xl bg-[#FDECEC] border border-[#B9382C]/40 space-y-2">
              <div className="flex items-center gap-2 text-[#7F1D1D] font-bold text-xs uppercase tracking-wider">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>{ui.counterHeading}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#292521]">
                {claim.contradictory_evidence.map((ev, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B9382C] mt-1.5 shrink-0" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Toggle Detailed Historiographical Commentary */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={e => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="text-xs font-semibold text-[#76501F] hover:text-[#A87924] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-[#A87924] shrink-0" />
              <span>{expanded ? ui.hideReliabilityBtn : ui.viewReliabilityBtn}</span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
            </button>

            <span className="text-xs font-semibold text-[#762D35]">{ui.openDossierLabel}</span>
          </div>

          {expanded && (
            <div className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] text-xs space-y-3 animate-in fade-in duration-150">
              <div>
                <span className="text-[#54351F] font-bold block mb-1">
                  {ui.reliabilityNotesLabel}
                </span>
                <p className="text-[#292521] leading-relaxed">
                  {claim.source_reliability_notes}
                </p>
              </div>
              <div className="pt-2 border-t border-[#D8C3A2]">
                <span className="text-[#6B5948] font-semibold block mb-1">
                  {ui.editorialFindingLabel}
                </span>
                <p className="text-[#292521] italic leading-relaxed">
                  {claim.reviewer_comments}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ContentDetailModal item={modalItem} onClose={() => setModalOpen(false)} />
    </>
  );
};


