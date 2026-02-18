import { useState } from 'react';
import { trackChange } from '../api/cars-api';
import { ApiError } from '../../../services/api-client';
import type { CarMaintenanceItem, CreateTrackChangeDto } from '../../../types/car';

interface UseTrackChangeOptions {
  item: CarMaintenanceItem | null;
  currentKm: number;
  onSuccess: () => void;
}

interface UseTrackChangeReturn {
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  kmValue: string;
  dateValue: string;
  openModal: () => void;
  closeModal: () => void;
  setKmValue: (value: string) => void;
  setDateValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  validateForm: () => string | null;
}

export function useTrackChange({ item, currentKm, onSuccess }: UseTrackChangeOptions): UseTrackChangeReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Auto-fill values based on interval type
  const getDefaultKm = () => currentKm.toString();
  const getDefaultDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [kmValue, setKmValue] = useState(getDefaultKm());
  const [dateValue, setDateValue] = useState(getDefaultDate());

  const openModal = () => {
    // Reset values when opening modal
    setKmValue(getDefaultKm());
    setDateValue(getDefaultDate());
    setError(null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setError(null);
  };

  const validateForm = (): string | null => {
    // Guard: return error if item is null
    if (!item) {
      return 'No maintenance item selected';
    }

    if (item.intervalType === 'km') {
      if (!kmValue.trim()) {
        return 'Km is required for km-based maintenance items';
      }
      const km = parseInt(kmValue, 10);
      if (isNaN(km)) {
        return 'Km must be a valid number';
      }
      if (km < 0) {
        return 'Km must be greater than or equal to 0';
      }
    } else if (item.intervalType === 'time') {
      if (!dateValue.trim()) {
        return 'Date is required for time-based maintenance items';
      }
      // Validate date format dd/mm/yyyy
      const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = dateValue.match(datePattern);
      if (!match) {
        return 'Date must be in dd/mm/yyyy format';
      }
      const [, day, month, year] = match;
      const dayNum = parseInt(day, 10);
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);
      if (dayNum < 1 || dayNum > 31) {
        return 'Day must be between 1 and 31';
      }
      if (monthNum < 1 || monthNum > 12) {
        return 'Month must be between 1 and 12';
      }
      if (yearNum < 2000) {
        return 'Year must be 2000 or later';
      }
      // Check if date is in the future
      const inputDate = new Date(yearNum, monthNum - 1, dayNum);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (inputDate > today) {
        return 'Date cannot be in the future';
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Guard: return early if item is null
    if (!item) {
      setError('No maintenance item selected');
      return;
    }
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dto: CreateTrackChangeDto = {};
      
      if (item.intervalType === 'km') {
        dto.km = parseInt(kmValue, 10);
      } else if (item.intervalType === 'time') {
        // Convert dd/mm/yyyy to ISO 8601 format
        const [day, month, year] = dateValue.split('/');
        const isoDate = `${year}-${month}-${day}T10:00:00`;
        dto.date = isoDate;
      }

      await trackChange(item.id, dto);
      
      setIsLoading(false);
      closeModal();
      onSuccess();
    } catch (err) {
      setIsLoading(false);
      if (err instanceof ApiError) {
        if (err.status === 400) {
          setError(err.data?.error || 'Invalid data provided');
        } else if (err.status === 404) {
          setError('Maintenance item not found');
        } else {
          setError('Failed to track change. Please try again.');
        }
      } else {
        setError('Network error. Please try again.');
      }
    }
  };

  return {
    isOpen,
    isLoading,
    error,
    kmValue,
    dateValue,
    openModal,
    closeModal,
    setKmValue,
    setDateValue,
    handleSubmit,
    validateForm,
  };
}
