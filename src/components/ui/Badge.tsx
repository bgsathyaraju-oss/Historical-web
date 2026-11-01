import React from 'react';

export type BadgeVariant = 'gold' | 'maroon' | 'navy' | 'verified' | 'archival' | 'danger';
export type BadgeSize = 'xs' | 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: 'bg-[#FFF9EF] text-[#54351F] border border-[#A87924]/60 shadow-sm',
  maroon: 'bg-[#762D35] text-white border border-[#A87924]',
  navy: 'bg-[#E9D9BE] text-[#54351F] border border-[#D8C3A2] shadow-sm',
  verified: 'bg-emerald-50 text-emerald-900 border border-emerald-700/50 shadow-sm',
  archival: 'bg-[#FFF9EF] text-[#54351F] border border-[#D8C3A2]',
  danger: 'bg-rose-50 text-[#762D35] border border-[#762D35]/50 shadow-sm',
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'text-[10px] px-2 py-0.5 rounded-full gap-1 font-semibold',
  sm: 'text-xs px-2.5 py-1 rounded-full gap-1.5 font-semibold',
  md: 'text-sm px-3.5 py-1.5 rounded-full gap-2 font-semibold',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'sm',
  icon,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`inline-flex items-center tracking-wide border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </span>
  );
};
