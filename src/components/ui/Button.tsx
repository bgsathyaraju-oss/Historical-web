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
    'bg-[#762D35] hover:bg-[#5e2229] text-white font-semibold border border-[#A87924] shadow-sm hover:shadow-md active:scale-[0.98]',
  maroon:
    'bg-[#762D35] hover:bg-[#5e2229] text-white font-medium border border-[#A87924] shadow-sm hover:shadow-md active:scale-[0.98]',
  secondary:
    'bg-[#E9D9BE] hover:bg-[#dfc9a4] text-[#54351F] font-semibold border border-[#D8C3A2] hover:border-[#A87924] shadow-sm active:scale-[0.98]',
  ghost:
    'bg-transparent hover:bg-[#E9D9BE]/60 text-[#54351F] hover:text-[#292521] border border-transparent hover:border-[#D8C3A2] active:scale-[0.98]',
  danger:
    'bg-[#762D35] hover:bg-[#5e2229] text-white border border-[#A87924] shadow-sm active:scale-[0.98]',
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
      'inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

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
