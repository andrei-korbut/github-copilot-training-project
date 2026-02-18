import { useState, useEffect } from 'react';
import type { Car } from '../../../types/car';

interface UseCarSelectorResult {
  selectedCarId: number | null;
  setSelectedCarId: (carId: number) => void;
}

export function useCarSelector(cars: Car[]): UseCarSelectorResult {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  // Auto-select first car when cars are loaded
  useEffect(() => {
    if (cars.length > 0 && selectedCarId === null) {
      setSelectedCarId(cars[0].id);
    }
  }, [cars, selectedCarId]);

  return {
    selectedCarId,
    setSelectedCarId,
  };
}
