import { useCallback, useEffect, useState } from "react";

export type Quota = { limit: number; remaining: number; period: "month" };

export function useQuota() {
  const [data, setData] = useState<Quota | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchQuota = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/snippet/quota", {
        cache: "no-store",
        signal,
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = (await r.json()) as Quota;
      setData(j);
    } catch (e: any) {
      if (e?.name !== "AbortError") setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    fetchQuota(ac.signal);
    return () => ac.abort();
  }, [fetchQuota]);

  /** Call this after a successful generation so the UI feels instant. */
  const bumpLocal = useCallback(() => {
    setData((d) => (d ? { ...d, remaining: Math.max(0, d.remaining - 1) } : d));
  }, []);

  return {
    data,        // {limit, remaining, period} | null
    loading,     // boolean
    error,       // Error | null
    refresh: fetchQuota,
    bumpLocal,
  };
}