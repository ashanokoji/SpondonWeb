import React from 'react';

interface OnboardingStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const OnboardingStepIndicator: React.FC<OnboardingStepIndicatorProps> = ({ currentStep, totalSteps, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === currentStep 
              ? 'w-8 bg-[var(--color-primary)]' 
              : 'w-2 bg-[var(--surface-variant)] hover:bg-gray-400'
          }`}
        />
      ))}
    </div>
  );
};
