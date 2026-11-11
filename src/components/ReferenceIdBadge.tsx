import React, { useState } from 'react';
import { Hash, Copy, Check } from 'lucide-react';
import { getPermanentReferenceNumber } from '../data/sevenCategoriesExpansionData.ts';

interface ReferenceIdBadgeProps {
  itemId?: string;
  referenceId?: string;
  categoryFallback?: string;
  variant?: 'default' | 'compact' | 'gold-on-maroon';
  size?: 'sm' | 'md';
  showCopyButton?: boolean;
  className?: string;
}

/**
 * Standardized Global Reference ID Display & One-Click Copy Component (Phase 6 & Phase 7)
 * - Displays `REFERENCE ID: PREFIX-0001` identically across all 8 languages (never translated).
 * - Includes one-click copy-to-clipboard feedback.
 * - Follows the Royal Heritage design system (Deep Royal Maroon #762D35, Antique Gold #A87924, Warm Ivory #FFFCF5).
 */
export const ReferenceIdBadge: React.FC<ReferenceIdBadgeProps> = ({
  itemId,
  referenceId,
  categoryFallback,
  variant = 'default',
  size = 'md',
  showCopyButton = true,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const resolvedRefId =
    referenceId && /^[A-Z]{2,3}-\d{4}$/.test(referenceId.trim())
      ? referenceId.trim()
      : getPermanentReferenceNumber(itemId || referenceId || '', categoryFallback);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(resolvedRefId);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore in restricted WebViews
    }
  };

  if (variant === 'compact') {
    return (
      <span
        onClick={showCopyButton ? handleCopy : undefined}
        title={showCopyButton ? `Click to copy Reference ID: ${resolvedRefId}` : `Reference ID: ${resolvedRefId}`}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#762D35] text-[#FFFCF5] border border-[#A87924] text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs ${
          showCopyButton ? 'cursor-pointer hover:bg-[#5E2229] transition-colors' : ''
        } ${className}`}
      >
        <Hash className="w-2.5 h-2.5 text-[#D8B467] shrink-0" />
        <span>REF ID: {resolvedRefId}</span>
        {showCopyButton && (
          copied ? (
            <Check className="w-2.5 h-2.5 text-[#F6E2A2] shrink-0" />
          ) : (
            <Copy className="w-2.5 h-2.5 text-[#D8B467]/90 shrink-0" />
          )
        )}
      </span>
    );
  }

  if (variant === 'gold-on-maroon') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#541D24]/90 border border-[#D4AF37]/60 text-[#FFFCF5] text-xs font-mono font-bold tracking-wider shadow-xs ${className}`}
      >
        <Hash className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
        <span>REFERENCE ID: {resolvedRefId}</span>
        {showCopyButton && (
          <button
            type="button"
            onClick={handleCopy}
            title={`Copy Reference ID (${resolvedRefId})`}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FFFCF5]/15 hover:bg-[#FFFCF5]/25 text-[#F6E2A2] text-[10px] font-sans font-semibold transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#F6E2A2]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-[#D4AF37]" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#762D35] text-[#FFFCF5] border border-[#A87924] text-xs font-mono font-bold tracking-wider shadow-xs ${className}`}
    >
      <Hash className="w-3.5 h-3.5 text-[#D8B467] shrink-0" />
      <span>REFERENCE ID: {resolvedRefId}</span>
      {showCopyButton && (
        <button
          type="button"
          onClick={handleCopy}
          title={`Copy Reference ID (${resolvedRefId})`}
          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FFFCF5]/15 hover:bg-[#FFFCF5]/25 text-[#FFF9EF] text-[10px] font-sans font-semibold transition-colors cursor-pointer border border-[#D8B467]/40"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#F6E2A2]" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-[#D8B467]" />
              <span>Copy</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
