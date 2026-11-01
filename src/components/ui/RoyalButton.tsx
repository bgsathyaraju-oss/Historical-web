import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

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
    'bg-[#762D35] hover:bg-[#5e2229] text-white font-bold border border-[#A87924] shadow-sm hover:shadow-md active:scale-[0.98]',
  maroon:
    'bg-[#762D35] hover:bg-[#5e2229] text-white font-semibold border border-[#A87924] shadow-sm hover:shadow-md active:scale-[0.98]',
  outline:
    'bg-[#FFFCF5] hover:bg-[#E9D9BE] text-[#54351F] border border-[#D8C3A2] hover:border-[#A87924] shadow-sm active:scale-[0.98]',
  ghost:
    'bg-transparent hover:bg-[#E9D9BE]/60 text-[#54351F] hover:text-[#292521] border border-transparent hover:border-[#D8C3A2] active:scale-[0.98]',
  danger:
    'bg-[#762D35] hover:bg-[#5e2229] text-white border border-[#A87924] shadow-sm active:scale-[0.98]',
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
      'relative inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none uppercase disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

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
