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

  let colorClasses = 'bg-[#EFE3D0] text-[#54351F] border-[#D8C3A2]';
  let IconComponent = BookOpen;

  const catStr = (category || status || '').toLowerCase();

  if (catStr.includes('verified') || catStr.includes('primary') || catStr.includes('epigraphic') || catStr.includes('archaeological')) {
    colorClasses = 'bg-emerald-50 text-emerald-900 border-emerald-700/50 shadow-sm';
    IconComponent = ShieldCheck;
  } else if (catStr.includes('scholarly') || catStr.includes('reviewed') || catStr.includes('published')) {
    colorClasses = 'bg-[#FFF9EF] text-[#54351F] border-[#A87924]/70 shadow-sm';
    IconComponent = BookOpen;
  } else if (catStr.includes('traditional') || catStr.includes('lineage') || catStr.includes('vamsavali')) {
    colorClasses = 'bg-amber-50 text-[#76501F] border-[#A87924]/60';
    IconComponent = Scroll;
  } else if (catStr.includes('oral') || catStr.includes('memory')) {
    colorClasses = 'bg-[#EFE3D0] text-[#54351F] border-[#D8C3A2]';
    IconComponent = MessageCircle;
  } else if (catStr.includes('contested') || catStr.includes('investigation')) {
    colorClasses = 'bg-rose-50 text-[#762D35] border-[#762D35]/50';
    IconComponent = BookOpen;
  } else if (catStr.includes('belief') || catStr.includes('heritage')) {
    colorClasses = 'bg-[#FFF9EF] text-[#76501F] border-[#A87924]/60';
    IconComponent = HeartHandshake;
  }

  const label = getMetadataLabel('evidence', category || status || '') || 'Historical Record';

  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-1 gap-1.5' : size === 'md' ? 'text-xs px-3 py-1.5 gap-2' : 'text-sm px-4 py-2 gap-2.5';

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border transition-all duration-200 ${sizeClasses} ${colorClasses}`}
      title={label}
    >
      <IconComponent className={size === 'sm' ? 'w-3.5 h-3.5 shrink-0' : 'w-4 h-4 shrink-0'} />
      <span className="truncate">{label}</span>
    </span>
  );
};
