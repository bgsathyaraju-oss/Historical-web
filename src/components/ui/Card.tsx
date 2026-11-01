import React, { forwardRef } from 'react';

export type CardVariant = 'default' | 'glow' | 'maroon' | 'pattern' | 'flat';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  ornament?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_6px_24px_var(--shadow-color)]',
  glow: 'bg-gradient-to-b from-[var(--card-bg)] to-[var(--surface-bg)] border-2 border-[var(--accent-gold)] shadow-[0_8px_28px_var(--shadow-color)]',
  maroon: 'bg-gradient-to-b from-[var(--surface-bg)] via-[var(--card-bg)] to-[var(--section-bg)] border-2 border-[var(--accent-gold)] shadow-[0_8px_28px_var(--shadow-color)]',
  pattern: 'bg-[var(--card-bg)] bg-pattern-royal border border-[var(--border-color)] shadow-[0_6px_24px_var(--shadow-color)]',
  flat: 'bg-[var(--surface-bg)] border border-[var(--border-color)] shadow-sm',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', ornament = false, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative rounded-2xl overflow-hidden text-[var(--primary-text)] transition-all duration-200 ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {ornament && (
          <>
            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#A87924]/70" />
            </div>
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#A87924]/70" />
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#A87924]/70" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#A87924]/70" />
            </div>
          </>
        )}
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: boolean;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
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
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  goldText?: boolean;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, as: Component = 'h3', goldText = false, className = '', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`font-royal-heading tracking-wide font-semibold text-lg md:text-xl ${
          goldText ? 'text-[var(--heading-text)]' : 'text-[var(--heading-text)]'
        } ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <p ref={ref} className={`text-[var(--secondary-text)] text-xs md:text-sm mt-1.5 leading-relaxed ${className}`} {...props}>
        {children}
      </p>
    );
  }
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
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
CardFooter.displayName = 'CardFooter';
