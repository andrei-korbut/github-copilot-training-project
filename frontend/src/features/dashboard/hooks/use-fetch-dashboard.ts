import { useState, useEffect, useCallback } from 'react';
import { getDashboardData } from '../api/dashboard-api';
import type { Dashboard } from '../../../types/dashboard';

interface UseFetchDashboardResult {
  dashboard: Dashboard | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFetchDashboard(carId: number | null): UseFetchDashboardResult {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    if (carId === null) {
      setDashboard(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await getDashboardData(carId);
      setDashboard(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard data';
      setError(errorMessage);
      setDashboard(null);
    } finally {
      setIsLoading(false);
    }
  }, [carId]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
}
