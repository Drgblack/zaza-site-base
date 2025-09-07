'use client';

import { useEffect, useState } from 'react';

interface UseAnimatedCounterOptions {
  duration?: number;
  start?: number;
  decimals?: number;
}

export function useAnimatedCounter(
  end: number,
  isInView: boolean,
  options: UseAnimatedCounterOptions = {}
) {
  const [count, setCount] = useState(options.start || 0);
  const { duration = 2000, decimals = 0 } = options;

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (easeOutCubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = (options.start || 0) + (end - (options.start || 0)) * easeOutCubic;
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, duration, options.start]);

  // Format the number based on decimals
  const formatNumber = (num: number) => {
    if (decimals === 0) {
      return Math.round(num).toLocaleString();
    }
    return num.toFixed(decimals);
  };

  return formatNumber(count);
}