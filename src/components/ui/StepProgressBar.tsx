import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, totalSteps, className = '' }) => {
  return (
    <div className={`w-full flex items-center justify-between relative ${className}`}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[var(--surface-variant)] rounded-full -z-10 overflow-hidden">
        <motion.div 
          className="h-full bg-[var(--color-primary)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        
        return (
          <div key={step} className="flex flex-col items-center gap-2">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: isActive || isCompleted ? 'var(--color-primary)' : 'var(--surface)',
                borderColor: isActive || isCompleted ? 'var(--color-primary)' : 'var(--surface-variant)',
                color: isActive || isCompleted ? '#ffffff' : 'var(--on-surface)',
                scale: isActive ? 1.2 : 1
              }}
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-sm z-10 transition-colors"
            >
              {isCompleted ? <Check size={16} /> : step}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
