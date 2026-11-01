import React, { forwardRef, useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  sizeVariant?: 'sm' | 'md' | 'lg';
  allowPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      sizeVariant = 'md',
      type = 'text',
      allowPasswordToggle = true,
      className = '',
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const isPassword = type === 'password';
    const computedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const sizeClasses = {
      sm: 'py-1.5 px-3 text-xs rounded-lg',
      md: 'py-2.5 px-4 text-sm rounded-xl',
      lg: 'py-3.5 px-5 text-base rounded-2xl',
    }[sizeVariant];

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#54351F]"
          >
            <span>
              {label}
              {required && <span className="text-[#762D35] ml-1">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#76501F]">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={computedType}
            disabled={disabled}
            required={required}
            className={`w-full bg-[var(--input-bg)] text-[var(--primary-text)] border transition-all duration-200 outline-none placeholder:text-[#6B5948] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ${
              error
                ? 'border-[#762D35] focus:border-[#762D35] focus:ring-1 focus:ring-[#762D35]/40'
                : 'border-[var(--border-color)] hover:border-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)]/40'
            } ${leftIcon ? 'pl-10' : ''} ${
              rightIcon || (isPassword && allowPasswordToggle) ? 'pr-11' : ''
            } ${sizeClasses} ${className}`}
            {...props}
          />

          {isPassword && allowPasswordToggle ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute right-3.5 text-[#6B5948] hover:text-[#54351F] transition-colors p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          ) : rightIcon ? (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-[#6B5948]">
              {rightIcon}
            </div>
          ) : null}
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
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  maxLength?: number;
  showCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      maxLength,
      showCount = false,
      value,
      className = '',
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full space-y-1.5">
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
              className="text-xs font-semibold uppercase tracking-wider text-[#54351F]"
            >
              {label}
              {required && <span className="text-[#762D35] ml-1">*</span>}
            </label>
          )}
          {showCount && maxLength && (
            <span className="text-[11px] text-[#6B5948]">
              {charCount} / {maxLength}
            </span>
          )}
        </div>

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          value={value}
          className={`w-full bg-[var(--input-bg)] text-[var(--primary-text)] border transition-all duration-200 outline-none placeholder:text-[#6B5948] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm p-3 text-sm rounded-xl ${
            error
              ? 'border-[#762D35] focus:border-[#762D35] focus:ring-1 focus:ring-[#762D35]/40'
              : 'border-[var(--border-color)] hover:border-[var(--accent-gold)] focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)]/40'
          } ${className}`}
          {...props}
        />

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
Textarea.displayName = 'Textarea';
