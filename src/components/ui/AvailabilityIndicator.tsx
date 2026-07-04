import React from 'react';

interface AvailabilityIndicatorProps {
  isAvailable: boolean;
  className?: string;
  showLabel?: boolean;
}

export function AvailabilityIndicator({ isAvailable, className = '', showLabel = false }: AvailabilityIndicatorProps) {
  const color = isAvailable ? 'var(--color-status-available)' : 'var(--color-status-unavailable)';
  const label = isAvailable ? 'Available' : 'Unavailable';

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="relative flex h-3 w-3">
        {isAvailable && (
          <span 
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: color }}
          />
        )}
        <span 
          className="relative inline-flex rounded-full h-3 w-3"
          style={{ backgroundColor: color }}
        />
      </span>
      {showLabel && (
        <span className="ml-2 label-large" style={{ color }}>
          {label}
        </span>
      )}
    </div>
  );
}
