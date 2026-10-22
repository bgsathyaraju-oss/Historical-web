import React from 'react';

export type BadgeVariant = 'gold' | 'maroon' | 'navy' | 'verified' | 'archival' | 'danger';
export type BadgeSize = 'xs' | 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold: 'bg-[#c99738]/15 text-[#e6be6c] border border-[#c99738]/40 shadow-[0_0_12px_rgba(201,151,56,0.15)]',
  maroon: 'bg-[#580014]/50 text-rose-200 border border-[#c99738]/30 shadow-[0_0_12px_rgba(88,0,20,0.25)]',
  navy: 'bg-[#0b1528] text-sky-200 border border-sky-600/40 shadow-sm',
  verified: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
  archival: 'bg-[#151922] text-[#e6dcce] border border-[#c99738]/25',
  danger: 'bg-red-950/80 text-red-200 border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.15)]',
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'text-[10px] px-2 py-0.5 rounded-full gap-1 font-medium',
  sm: 'text-xs px-2.5 py-1 rounded-full gap-1.5 font-medium',
  md: 'text-sm px-3.5 py-1.5 rounded-full gap-2 font-medium',
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
