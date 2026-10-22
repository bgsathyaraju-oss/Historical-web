import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'maroon' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'royal-gold-gradient text-[#070d18] font-semibold border border-[#91681c] shadow-[0_4px_16px_rgba(201,151,56,0.25)] hover:shadow-[0_4px_22px_rgba(201,151,56,0.4)] hover:brightness-110 active:scale-[0.98]',
  maroon:
    'royal-maroon-gradient text-[#faf7f0] font-medium border border-[#c99738]/40 hover:border-[#c99738] shadow-[0_4px_16px_rgba(88,0,20,0.4)] hover:shadow-[0_4px_22px_rgba(88,0,20,0.6)] hover:brightness-110 active:scale-[0.98]',
  secondary:
    'bg-[#0b1528]/85 hover:bg-[#151922] text-[#fcedc7] hover:text-white border border-[#c99738]/40 hover:border-[#c99738] shadow-sm hover:shadow-[0_0_15px_rgba(201,151,56,0.18)] active:scale-[0.98]',
  ghost:
    'bg-transparent hover:bg-[#c99738]/10 text-[#e6dcce] hover:text-[#fcedc7] border border-transparent hover:border-[#c99738]/30 active:scale-[0.98]',
  danger:
    'bg-gradient-to-r from-red-950/90 to-[#3a000d] text-red-200 hover:text-white border border-red-500/40 hover:border-red-500/70 shadow-[0_2px_10px_rgba(220,38,38,0.2)] hover:shadow-[0_2px_16px_rgba(220,38,38,0.4)] active:scale-[0.98]',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'text-xs px-2.5 py-1 rounded-lg gap-1.5',
  sm: 'text-xs px-3.5 py-1.5 rounded-xl gap-2',
  md: 'text-sm px-4.5 py-2.5 rounded-xl gap-2.5',
  lg: 'text-base px-6 py-3.5 rounded-2xl gap-3',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:brightness-100';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
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

Button.displayName = 'Button';
