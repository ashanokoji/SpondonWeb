import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface SpondonTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const SpondonTextField = forwardRef<HTMLInputElement, SpondonTextFieldProps>(
  ({ label, error, leftIcon, rightIcon, className = '', ...props }, ref) => {
    const hasError = !!error;
    
    return (
      <div className={`w-full flex flex-col gap-1.5 ${className}`}>
        <label className="label-large text-[var(--on-surface)] ml-1">
          {label}
        </label>
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[var(--on-surface)] opacity-50">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full h-14 bg-[var(--surface-variant)] border rounded-xl px-4 text-base text-[var(--on-bg)] transition-colors focus:outline-none focus:ring-2 ${
              hasError
                ? 'border-[var(--color-urgency-critical)] focus:ring-[var(--color-urgency-critical)]/20'
                : 'border-transparent focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20'
            } ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
            {...props}
          />
          {rightIcon && !hasError && (
            <div className="absolute right-3 text-[var(--on-surface)] opacity-50">
              {rightIcon}
            </div>
          )}
          {hasError && (
            <div className="absolute right-3 text-[var(--color-urgency-critical)]">
              <AlertCircle size={20} />
            </div>
          )}
        </div>
        {hasError && (
          <span className="body-small text-[var(--color-urgency-critical)] ml-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);
SpondonTextField.displayName = 'SpondonTextField';
