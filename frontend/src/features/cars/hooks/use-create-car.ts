import { useState } from 'react';
import { createCar } from '../api/cars-api';
import type { CreateCarDto } from '../../../types/car';
import { ApiError } from '../../../services/api-client';
import type { CarFormErrors } from './use-car-form';

interface UseCreateCarOptions {
  onSuccess?: () => void;
  onValidationError?: (errors: CarFormErrors) => void;
}

export function useCreateCar(options: UseCreateCarOptions = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState<string>('');

  const submitCar = async (data: CreateCarDto) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      await createCar(data);
      setShowSuccess(true);
      
      // Show success message briefly, then call onSuccess
      setTimeout(() => {
        setShowSuccess(false);
        options.onSuccess?.();
      }, 1500);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 400 && error.data.errors) {
          // Parse server validation errors
          const validationErrors: CarFormErrors = {};
          for (const [key, messages] of Object.entries(error.data.errors)) {
            const fieldName = key.toLowerCase();
            if (fieldName === 'name') {
              validationErrors.name = (messages as string[])[0];
            } else if (fieldName === 'currentkm') {
              validationErrors.currentKm = (messages as string[])[0];
            }
          }
          options.onValidationError?.(validationErrors);
        } else if (error.status === 400) {
          // Handle non-validation 400 errors (like archived template)
          setServerError(error.data.message || 'Invalid request. Please check your input.');
        } else if (error.status === 500) {
          setServerError('An error occurred while creating the car. Please try again.');
        } else {
          setServerError('An unexpected error occurred. Please try again.');
        }
      } else {
        setServerError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearServerError = () => {
    setServerError('');
  };

  return {
    submitCar,
    isSubmitting,
    showSuccess,
    serverError,
    clearServerError,
  };
}
