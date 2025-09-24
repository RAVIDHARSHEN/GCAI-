import { useState, useEffect, useCallback } from 'react';
import { ThreatData } from '../types';
import { githubService } from '../services/githubService';

interface UseRealTimeDataReturn {
  threats: ThreatData[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export const useRealTimeData = (refreshInterval: number = 5 * 60 * 1000): UseRealTimeDataReturn => {
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const data = await githubService.fetchAllThreats();
      setThreats(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch real-time threat data. Please check your connection.');
      console.error('Error fetching threats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();

    // Set up interval for auto-refresh
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    threats,
    loading,
    error,
    lastUpdated,
    refresh
  };
};