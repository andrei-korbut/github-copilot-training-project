import { useState } from 'react';
import { createMaintenanceTemplate } from '../../../features/templates/api/templates-api';
import type { CreateMaintenanceTemplateDto } from '../../../types/maintenance-template';
import { ApiError } from '../../../services/api-client';
import type { FormErrors } from './use-template-form';

interface UseCreateTemplateOptions {
  onSuccess?: () => void;
  onValidationError?: (errors: FormErrors) => void;
}

export function useCreateTemplate(options: UseCreateTemplateOptions = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState<string>('');

  const createTemplate = async (data: CreateMaintenanceTemplateDto) => {
    setIsSubmitting(true);
    setServerError('');

    try {
      await createMaintenanceTemplate(data);
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
          const validationErrors: FormErrors = {};
          for (const [key, messages] of Object.entries(error.data.errors)) {
            const fieldName = key.toLowerCase();
            if (fieldName === 'name') {
              validationErrors.name = (messages as string[])[0];
            } else if (fieldName === 'intervaltype') {
              validationErrors.intervalType = (messages as string[])[0];
            } else if (fieldName === 'intervalvalue') {
              validationErrors.intervalValue = (messages as string[])[0];
            }
          }
          options.onValidationError?.(validationErrors);
        } else if (error.status === 500) {
          setServerError('An error occurred while creating the template. Please try again.');
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
    createTemplate,
    isSubmitting,
    showSuccess,
    serverError,
    clearServerError,
  };
}
