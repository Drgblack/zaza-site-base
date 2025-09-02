'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AnnualToggleProps {
  isAnnual: boolean;
  onToggle: (isAnnual: boolean) => void;
  className?: string;
}

export function AnnualToggle({ isAnnual, onToggle, className = "" }: AnnualToggleProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => onToggle(true)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isAnnual
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          aria-label="Select annual billing"
        >
          Annual
        </button>
        <button
          onClick={() => onToggle(false)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            !isAnnual
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          aria-label="Select monthly billing"
        >
          Monthly
        </button>
      </div>
    </div>
  );
}
