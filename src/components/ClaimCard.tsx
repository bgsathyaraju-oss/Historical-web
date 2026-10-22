import React, { useState } from 'react';
import { HistoricalClaim } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, BookOpen, ChevronDown, ChevronUp, Scale } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';

interface ClaimCardProps {
  claim: HistoricalClaim;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl bg-[#131724] border border-[#c99738]/40 overflow-hidden shadow-lg transition-all duration-200">
      {/* Top Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#171e2e] to-[#121622] border-b border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] px-2.5 py-0.5 rounded bg-stone-900 border border-stone-800">
              {claim.topic}
            </span>
            <EvidenceBadge status={claim.status} size="sm" />
          </div>
          <span className="text-xs text-stone-400">
            Reviewed: {claim.review_date}
          </span>
        </div>

        <h3 className="font-royal-heading font-bold text-sm sm:text-base text-stone-100 leading-snug">
          "{claim.claim_statement}"
        </h3>
      </div>

      {/* Evidence Balance Columns */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Supporting Evidence */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Supporting Epigraphic & Historical Evidence</span>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {claim.supporting_evidence.map((ev, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contradictory Evidence or Critical Nuance */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>Counter-Evidence / Scholarly Reservations</span>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {claim.contradictory_evidence.map((ev, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Toggle Detailed Historiographical Commentary */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-semibold text-[#e8c872] hover:text-[#fcedc7] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{expanded ? 'Hide Source Reliability Assessment' : 'View Source Reliability & Historiographical Notes'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {expanded && (
          <div className="p-4 rounded-xl bg-[#0c0f17] border border-stone-800 text-xs space-y-3 animate-in fade-in duration-150">
            <div>
              <span className="text-[#d4af37] font-semibold block mb-1">
                Source Reliability Notes:
              </span>
              <p className="text-stone-300 leading-relaxed">
                {claim.source_reliability_notes}
              </p>
            </div>
            <div className="pt-2 border-t border-stone-800/80">
              <span className="text-stone-400 font-semibold block mb-1">
                Editorial Review Board Finding:
              </span>
              <p className="text-stone-300 italic leading-relaxed">
                {claim.reviewer_comments}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
