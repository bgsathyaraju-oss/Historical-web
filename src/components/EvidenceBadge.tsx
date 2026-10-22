import React from 'react';
import { ShieldCheck, BookOpen, Scroll, MessageCircle, HeartHandshake } from 'lucide-react';
import { EvidenceCategory, VerificationStatus } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface EvidenceBadgeProps {
  category?: EvidenceCategory | string;
  status?: VerificationStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({ category, status, size = 'sm' }) => {
  const { getMetadataLabel } = useLanguage();

  let colorClasses = 'bg-stone-800/80 text-stone-300 border-stone-700';
  let IconComponent = BookOpen;

  const catStr = (category || status || '').toLowerCase();

  if (catStr.includes('verified') || catStr.includes('primary') || catStr.includes('epigraphic') || catStr.includes('archaeological')) {
    colorClasses = 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60 shadow-[0_0_12px_rgba(16,185,129,0.15)]';
    IconComponent = ShieldCheck;
  } else if (catStr.includes('scholarly') || catStr.includes('reviewed') || catStr.includes('published')) {
    colorClasses = 'bg-amber-950/70 text-amber-300 border-amber-600/50 shadow-[0_0_12px_rgba(245,158,11,0.12)]';
    IconComponent = BookOpen;
  } else if (catStr.includes('traditional') || catStr.includes('lineage') || catStr.includes('vamsavali')) {
    colorClasses = 'bg-indigo-950/70 text-indigo-300 border-indigo-600/50';
    IconComponent = Scroll;
  } else if (catStr.includes('oral') || catStr.includes('memory')) {
    colorClasses = 'bg-purple-950/70 text-purple-300 border-purple-600/50';
    IconComponent = MessageCircle;
  } else if (catStr.includes('contested') || catStr.includes('investigation')) {
    colorClasses = 'bg-rose-950/70 text-rose-300 border-rose-600/60';
    IconComponent = BookOpen;
  } else if (catStr.includes('belief') || catStr.includes('heritage')) {
    colorClasses = 'bg-yellow-950/70 text-yellow-300 border-yellow-600/50';
    IconComponent = HeartHandshake;
  }

  // Dynamically resolve localized label for this badge in active language
  const label = getMetadataLabel('evidence', category || status || '') || 'Historical Record';

  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-1 gap-1.5' : size === 'md' ? 'text-xs px-3 py-1.5 gap-2' : 'text-sm px-4 py-2 gap-2.5';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border transition-all duration-200 ${sizeClasses} ${colorClasses}`}
      title={label}
    >
      <IconComponent className={size === 'sm' ? 'w-3.5 h-3.5 shrink-0' : 'w-4 h-4 shrink-0'} />
      <span className="truncate">{label}</span>
    </span>
  );
};
