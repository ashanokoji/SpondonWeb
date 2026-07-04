import React from 'react';

interface BloodGroupBadgeProps {
  group: string;
  className?: string;
}

export function BloodGroupBadge({ group, className = '' }: BloodGroupBadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center font-bold text-white rounded-full bg-[var(--color-primary)] shadow-sm ${className}`}
      style={{
        width: '40px',
        height: '40px',
        fontSize: '16px',
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-tertiary))'
      }}
    >
      {group}
    </div>
  );
}
