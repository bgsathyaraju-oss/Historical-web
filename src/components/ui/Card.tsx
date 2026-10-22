import React, { forwardRef } from 'react';

export type CardVariant = 'default' | 'glow' | 'maroon' | 'pattern' | 'flat';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  ornament?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-[#0b1528]/90 royal-border backdrop-blur-md shadow-xl',
  glow: 'bg-gradient-to-b from-[#0b1528] to-[#070d18] royal-border-glow shadow-2xl',
  maroon: 'bg-gradient-to-b from-[#3a000d]/85 via-[#151922]/95 to-[#0b1528]/95 royal-border shadow-2xl',
  pattern: 'bg-[#0b1528]/95 bg-pattern-royal royal-border shadow-xl backdrop-blur-md',
  flat: 'bg-[#151922]/90 border border-stone-800 shadow-md',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', ornament = false, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative rounded-2xl overflow-hidden text-[#faf7f0] transition-all duration-200 ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {ornament && (
          <>
            {/* Royal corner ornamental accents */}
            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#c99738]/60" />
            </div>
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#c99738]/60" />
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none">
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#c99738]/60" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#c99738]/60" />
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
        className={`p-6 ${border ? 'border-b border-[#c99738]/20' : ''} ${className}`}
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
          goldText ? 'royal-gold-text' : 'text-[#faf7f0]'
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
      <p ref={ref} className={`text-stone-300 text-xs md:text-sm mt-1.5 leading-relaxed ${className}`} {...props}>
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
          border ? 'border-t border-[#c99738]/20 bg-[#070d18]/40' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';
