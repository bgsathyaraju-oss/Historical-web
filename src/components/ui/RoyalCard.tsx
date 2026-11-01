import React, { forwardRef } from 'react';

export type RoyalCardVariant = 'default' | 'glow' | 'maroon' | 'pattern' | 'flat';

export interface RoyalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: RoyalCardVariant;
  ornament?: boolean;
  solarEmblem?: boolean;
}

const variantStyles: Record<RoyalCardVariant, string> = {
  default: 'bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_6px_24px_var(--shadow-color)]',
  glow: 'bg-gradient-to-b from-[var(--card-bg)] to-[var(--surface-bg)] border-2 border-[var(--accent-gold)] shadow-[0_8px_28px_var(--shadow-color)]',
  maroon: 'bg-gradient-to-b from-[var(--surface-bg)] via-[var(--card-bg)] to-[var(--section-bg)] border-2 border-[var(--accent-gold)] shadow-[0_8px_28px_var(--shadow-color)]',
  pattern: 'bg-[var(--card-bg)] bg-pattern-royal border border-[var(--border-color)] shadow-[0_6px_24px_var(--shadow-color)]',
  flat: 'bg-[var(--surface-bg)] border border-[var(--border-color)] shadow-sm',
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
        className={`relative rounded-2xl overflow-hidden text-[var(--primary-text)] transition-all duration-200 ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {/* Subtle Suryavamsha Solar Emblem Top Motif */}
        {solarEmblem && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none opacity-45">
            <svg viewBox="0 0 100 100" className="w-5 h-5 fill-[#A87924]">
              <circle cx="50" cy="50" r="20" fill="#A87924" />
              <path
                d="M50 10 L54 30 L50 25 L46 30 Z M50 90 L54 70 L50 75 L46 70 Z M10 50 L30 54 L25 50 L30 46 Z M90 50 L70 54 L75 50 L70 46 Z"
                fill="#A87924"
              />
            </svg>
          </div>
        )}

        {/* Suryavamsha royal corner ornamental brackets */}
        {ornament && (
          <>
            <div className="absolute top-0 left-0 w-6 h-6 pointer-events-none">
              <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#A87924]/70" />
            </div>
            <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none">
              <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#A87924]/70" />
            </div>
            <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none">
              <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#A87924]/70" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none">
              <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#A87924]/70" />
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
        className={`p-6 ${border ? 'border-b border-[var(--border-color)] bg-[var(--surface-bg)]' : ''} ${className}`}
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
          goldText ? 'text-[var(--heading-text)]' : 'text-[var(--primary-text)]'
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
        className={`text-[var(--secondary-text)] text-xs md:text-sm mt-1.5 leading-relaxed ${
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
          border ? 'border-t border-[var(--border-color)] bg-[var(--surface-bg)]' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
RoyalCardFooter.displayName = 'RoyalCardFooter';
