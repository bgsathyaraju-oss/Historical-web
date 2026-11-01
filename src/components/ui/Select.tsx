import React, { forwardRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  options?: SelectOption[];
  sizeVariant?: 'sm' | 'md' | 'lg';
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      options,
      children,
      sizeVariant = 'md',
      className = '',
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const sizeClasses = {
      sm: 'py-1.5 pl-3 pr-8 text-xs rounded-lg',
      md: 'py-2.5 pl-4 pr-10 text-sm rounded-xl',
      lg: 'py-3.5 pl-5 pr-12 text-base rounded-2xl',
    }[sizeVariant];

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#54351F]"
          >
            <span>
              {label}
              {required && <span className="text-[#762D35] ml-1">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            className={`w-full appearance-none bg-[var(--input-bg)] text-[var(--primary-text)] border transition-all duration-200 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ${
              error
                ? 'border-[#762D35] focus:border-[#762D35] focus:ring-1 focus:ring-[#762D35]/40'
                : 'border-[var(--border-color)] hover:border-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)]/40'
            } ${sizeClasses} ${className}`}
            {...props}
          >
            {options
              ? options.map(opt => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="bg-[#FFFCF5] text-[#292521] py-2"
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="absolute right-3.5 pointer-events-none text-[#76501F]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {error ? (
          <p className="flex items-center gap-1.5 text-xs text-[#762D35] font-medium mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#762D35]" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-[#6B5948] mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = 'Select';
