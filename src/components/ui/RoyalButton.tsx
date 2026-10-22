import React, { forwardRef } from 'react';
import { Loader2, Crown } from 'lucide-react';

export type RoyalButtonVariant = 'gold' | 'maroon' | 'outline' | 'ghost' | 'danger';
export type RoyalButtonSize = 'sm' | 'md' | 'lg';

export interface RoyalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: RoyalButtonVariant;
  size?: RoyalButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  cinzelFont?: boolean;
  royalGlow?: boolean;
}

const variantStyles: Record<RoyalButtonVariant, string> = {
  gold:
    'royal-gold-gradient text-[#070d18] font-bold border border-[#91681c] shadow-[0_4px_16px_rgba(201,151,56,0.25)] hover:shadow-[0_4px_24px_rgba(201,151,56,0.45)] hover:brightness-110 active:scale-[0.98]',
  maroon:
    'royal-maroon-gradient text-[#faf7f0] font-medium border border-[#c99738]/40 hover:border-[#c99738] shadow-[0_4px_16px_rgba(88,0,20,0.45)] hover:shadow-[0_4px_24px_rgba(88,0,20,0.65)] hover:brightness-110 active:scale-[0.98]',
  outline:
    'bg-[#0b1528]/85 hover:bg-[#151922] text-[#fcedc7] hover:text-white royal-border hover:border-[#c99738] shadow-sm hover:shadow-[0_0_18px_rgba(201,151,56,0.2)] active:scale-[0.98]',
  ghost:
    'bg-transparent hover:bg-[#c99738]/10 text-[#e6dcce] hover:text-[#fcedc7] border border-transparent hover:border-[#c99738]/30 active:scale-[0.98]',
  danger:
    'bg-gradient-to-r from-red-950/90 to-[#3a000d] text-red-200 hover:text-white border border-red-500/40 hover:border-red-500/70 shadow-[0_2px_12px_rgba(220,38,38,0.25)] hover:shadow-[0_2px_18px_rgba(220,38,38,0.45)] active:scale-[0.98]',
};

const sizeStyles: Record<RoyalButtonSize, string> = {
  sm: 'text-xs px-3.5 py-1.5 rounded-xl gap-2 tracking-wide',
  md: 'text-sm px-5 py-2.5 rounded-xl gap-2.5 tracking-wider',
  lg: 'text-base px-6 py-3.5 rounded-2xl gap-3 tracking-widest',
};

export const RoyalButton = forwardRef<HTMLButtonElement, RoyalButtonProps>(
  (
    {
      children,
      variant = 'gold',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      cinzelFont = true,
      royalGlow = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const fontClass = cinzelFont ? 'font-royal-heading' : 'font-medium';
    const glowClass = royalGlow ? 'royal-border-glow' : '';
    const baseClasses =
      'relative inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none uppercase disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:brightness-100';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${fontClass} ${variantStyles[variant]} ${sizeStyles[size]} ${glowClass} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

RoyalButton.displayName = 'RoyalButton';
