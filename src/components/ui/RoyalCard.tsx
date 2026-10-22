import React, { forwardRef } from 'react';

export type RoyalCardVariant = 'default' | 'glow' | 'maroon' | 'pattern' | 'flat';

export interface RoyalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: RoyalCardVariant;
  ornament?: boolean;
  solarEmblem?: boolean;
}

const variantStyles: Record<RoyalCardVariant, string> = {
  default: 'bg-[#0b1528]/95 royal-border backdrop-blur-md shadow-xl',
  glow: 'bg-gradient-to-b from-[#0b1528] to-[#070d18] royal-border-glow shadow-2xl',
  maroon: 'bg-gradient-to-b from-[#3a000d]/90 via-[#151922]/95 to-[#0b1528]/95 royal-border shadow-2xl',
  pattern: 'bg-[#0b1528]/95 bg-pattern-royal royal-border shadow-xl backdrop-blur-md',
  flat: 'bg-[#151922]/90 border border-stone-800 shadow-md',
};

export const RoyalCard = forwardRef<HTMLDivElement, RoyalCardProps>(
  (
    {
      children,
      variant = 'default',
      ornament = true,
      solarEmblem = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`relative rounded-2xl overflow-hidden text-[#faf7f0] transition-all duration-200 ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {/* Subtle Suryavamsha Solar Emblem Top Motif */}
        {solarEmblem && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-40">
            <svg viewBox="0 0 100 100" className="w-5 h-5 fill-[#c99738]">
              <circle cx="50" cy="50" r="20" fill="#c99738" />
              <path
                d="M50 10 L54 30 L50 25 L46 30 Z M50 90 L54 70 L50 75 L46 70 Z M10 50 L30 54 L25 50 L30 46 Z M90 50 L70 54 L75 50 L70 46 Z"
                fill="#c99738"
              />
            </svg>
          </div>
        )}

        {/* Suryavamsha royal corner ornamental brackets */}
        {ornament && (
          <>
            <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none">
              <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#c99738]/60" />
            </div>
            <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
              <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#c99738]/60" />
            </div>
            <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none">
              <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#c99738]/60" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none">
              <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#c99738]/60" />
            </div>
          </>
        )}
        {children}
      </div>
    );
  }
);
RoyalCard.displayName = 'RoyalCard';

export interface RoyalCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: boolean;
}

export const RoyalCardHeader = forwardRef<HTMLDivElement, RoyalCardHeaderProps>(
  ({ children, border = false, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-6 ${border ? 'border-b border-[#c99738]/20 bg-[#070d18]/30' : ''} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
RoyalCardHeader.displayName = 'RoyalCardHeader';

export interface RoyalCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  goldText?: boolean;
}

export const RoyalCardTitle = forwardRef<HTMLHeadingElement, RoyalCardTitleProps>(
  ({ children, as: Component = 'h3', goldText = true, className = '', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`font-royal-heading tracking-wider font-semibold text-lg md:text-xl ${
          goldText ? 'royal-gold-text' : 'text-[#faf7f0]'
        } ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
RoyalCardTitle.displayName = 'RoyalCardTitle';

export interface RoyalCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  serif?: boolean;
}

export const RoyalCardDescription = forwardRef<HTMLParagraphElement, RoyalCardDescriptionProps>(
  ({ children, serif = false, className = '', ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`text-stone-300 text-xs md:text-sm mt-1.5 leading-relaxed ${
          serif ? 'font-royal-serif text-sm md:text-base italic' : 'font-sans'
        } ${className}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);
RoyalCardDescription.displayName = 'RoyalCardDescription';

export const RoyalCardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
RoyalCardContent.displayName = 'RoyalCardContent';

export interface RoyalCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: boolean;
}

export const RoyalCardFooter = forwardRef<HTMLDivElement, RoyalCardFooterProps>(
  ({ children, border = true, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-6 pt-4 flex items-center justify-between ${
          border ? 'border-t border-[#c99738]/20 bg-[#070d18]/50' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
RoyalCardFooter.displayName = 'RoyalCardFooter';
