// src/components/zara/useZaraLimits.ts
import { useState, useEffect } from 'react';
import type { ZaraUsage } from './types';

const DAILY_LIMIT = Number(process.env.NEXT_PUBLIC_ZARA_FREE_LIMIT ?? 5);
const STORAGE_KEY = 'zara_usage';

export function useZaraLimits() {
  const [usage, setUsage] = useState<ZaraUsage>({ count: 0, date: '' });
  const [isLimited, setIsLimited] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (stored) {
      const parsed: ZaraUsage = JSON.parse(stored);
      if (parsed.date === today) {
        setUsage(parsed);
        setIsLimited(parsed.count >= DAILY_LIMIT);
      } else {
        // New day, reset
        const fresh = { count: 0, date: today };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
        setUsage(fresh);
        setIsLimited(false);
      }
    } else {
      // First use
      const fresh = { count: 0, date: today };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      setUsage(fresh);
      setIsLimited(false);
    }
  }, []);

  const trackUsage = () => {
    if (typeof window === 'undefined') return;
    
    const newCount = usage.count + 1;
    const updated = { ...usage, count: newCount };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setUsage(updated);
    setIsLimited(newCount >= DAILY_LIMIT);
  };

  const remaining = Math.max(0, DAILY_LIMIT - usage.count);

  return {
    usage,
    isLimited,
    remaining,
    trackUsage,
    dailyLimit: DAILY_LIMIT
  };
}