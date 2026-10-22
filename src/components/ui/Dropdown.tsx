import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
  width?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = 'left',
  className = '',
  width = 'w-56',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer inline-flex">
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } mt-2 ${width} origin-top-${align} rounded-xl bg-[#0b1528] royal-border-glow shadow-2xl backdrop-blur-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100`}
        >
          <div onClick={() => setIsOpen(false)}>{children}</div>
        </div>
      )}
    </div>
  );
};

export interface DropdownButtonTriggerProps {
  children: React.ReactNode;
  variant?: 'outline' | 'gold' | 'ghost';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const DropdownButtonTrigger = forwardRef<HTMLButtonElement, DropdownButtonTriggerProps>(
  ({ children, variant = 'outline', size = 'md', icon, className = '', ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-between gap-2 font-medium tracking-wide transition-all rounded-xl cursor-pointer select-none';
    const variantClasses = {
      gold: 'royal-gold-gradient text-[#070d18] font-semibold border border-[#91681c] shadow-md shadow-[#c99738]/20',
      outline:
        'bg-[#0b1528]/85 hover:bg-[#151922] text-[#fcedc7] hover:text-white border border-[#c99738]/40 hover:border-[#c99738]',
      ghost: 'bg-transparent hover:bg-[#c99738]/10 text-[#e6dcce] hover:text-[#fcedc7] border border-transparent',
    }[variant];
    const sizeClasses = {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-4 py-2',
    }[size];

    return (
      <button
        ref={ref}
        type="button"
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        {...props}
      >
        <span className="inline-flex items-center gap-2">
          {icon}
          <span>{children}</span>
        </span>
        <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-70" />
      </button>
    );
  }
);
DropdownButtonTrigger.displayName = 'DropdownButtonTrigger';

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  danger?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  icon,
  badge,
  danger = false,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className={`w-full text-left px-3.5 py-2 text-xs md:text-sm flex items-center justify-between gap-2.5 transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
        danger
          ? 'text-red-300 hover:bg-red-950/40 hover:text-red-100'
          : 'text-stone-200 hover:bg-[#c99738]/15 hover:text-[#fcedc7]'
      } ${className}`}
      {...props}
    >
      <span className="flex items-center gap-2.5 truncate">
        {icon && <span className="text-[#c99738] shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
      </span>
      {badge && <span className="shrink-0">{badge}</span>}
    </button>
  );
};

export const DropdownHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`px-3.5 py-1.5 text-[10px] font-semibold tracking-wider text-[#c99738] uppercase ${className}`}
    >
      {children}
    </div>
  );
};

export const DropdownDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`h-px my-1.5 bg-[#c99738]/20 ${className}`} />;
};
