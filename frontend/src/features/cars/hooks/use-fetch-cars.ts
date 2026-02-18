import { useState, useEffect, useCallback } from 'react';
import { getAllCars } from '../api/cars-api';
import type { Car } from '../../../types/car';

interface UseFetchCarsResult {
  cars: Car[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFetchCars(): UseFetchCarsResult {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllCars();
      setCars(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load cars';
      setError(errorMessage);
      setCars([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return {
    cars,
    isLoading,
    error,
    refetch: fetchCars,
  };
}
