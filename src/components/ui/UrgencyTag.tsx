import React from 'react';
import { Urgency } from '@/types';

interface UrgencyTagProps {
  urgency: Urgency | string;
  className?: string;
}

export function UrgencyTag({ urgency, className = '' }: UrgencyTagProps) {
  let bgColor = 'var(--color-urgency-normal)';
  let label = 'Normal';

  if (urgency === Urgency.CRITICAL || urgency === 'CRITICAL') {
    bgColor = 'var(--color-urgency-critical)';
    label = 'Critical';
  } else if (urgency === Urgency.MODERATE || urgency === 'MODERATE') {
    bgColor = 'var(--color-urgency-moderate)';
    label = 'Moderate';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {label}
    </span>
  );
}
