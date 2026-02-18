import { useState } from 'react';
import { updateCarMileage } from '../../cars/api/cars-api';
import { ApiError } from '../../../services/api-client';

interface UseUpdateMileageResult {
  isEditing: boolean;
  editValue: string;
  isLoading: boolean;
  error: string | null;
  startEditing: () => void;
  cancelEditing: () => void;
  handleInputChange: (value: string) => void;
  handleSave: () => Promise<boolean>;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export function useUpdateMileage(
  carId: number | null,
  currentKm: number,
  onSuccess: () => void
): UseUpdateMileageResult {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(currentKm));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEditing = () => {
    setEditValue(String(currentKm));
    setIsEditing(true);
    setError(null);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditValue(String(currentKm));
    setError(null);
  };

  const handleInputChange = (value: string) => {
    setEditValue(value);
    setError(null);
  };

  const validateInput = (): boolean => {
    const trimmedValue = editValue.trim();
    
    if (trimmedValue === '') {
      setError('Mileage is obligatory field');
      return false;
    }

    const numValue = Number(trimmedValue);
    
    if (isNaN(numValue)) {
      setError('Mileage must be a valid number');
      return false;
    }

    if (!Number.isInteger(numValue)) {
      setError('Mileage must be an integer');
      return false;
    }

    if (numValue < 0) {
      setError('Mileage must be greater than or equal to 0');
      return false;
    }

    return true;
  };

  const handleSave = async (): Promise<boolean> => {
    if (!validateInput()) {
      return false;
    }

    if (!carId) {
      setError('No car selected');
      return false;
    }

    const newKm = Number(editValue.trim());
    
    // No change, just exit edit mode
    if (newKm === currentKm) {
      setIsEditing(false);
      return true;
    }

    setIsLoading(true);
    setError(null);

    try {
      await updateCarMileage(carId, { currentKm: newKm });
      setIsEditing(false);
      onSuccess();
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 404) {
          setError('Car not found');
        } else if (err.status === 400) {
          setError(err.data?.error || 'Invalid mileage value');
        } else {
          setError('Failed to update mileage. Please try again.');
        }
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      cancelEditing();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  return {
    isEditing,
    editValue,
    isLoading,
    error,
    startEditing,
    cancelEditing,
    handleInputChange,
    handleSave,
    handleKeyDown,
  };
}
