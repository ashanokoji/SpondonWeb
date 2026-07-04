import React from 'react';
import { motion } from 'framer-motion';

interface BloodDropLoaderProps {
  size?: number;
  className?: string;
}

export function BloodDropLoader({ size = 48, className = '' }: BloodDropLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="var(--color-primary)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      </motion.div>
      <motion.div
        className="mt-2 h-1 bg-black/10 dark:bg-white/10 rounded-full"
        animate={{ 
          width: [size * 0.4, size * 0.8, size * 0.4],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
