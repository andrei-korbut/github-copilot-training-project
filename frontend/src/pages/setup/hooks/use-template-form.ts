import { useState } from 'react';
import type { CreateMaintenanceTemplateDto } from '../../../types/maintenance-template';

export interface FormErrors {
  name?: string;
  intervalType?: string;
  intervalValue?: string;
}

export function useTemplateForm() {
  const [formData, setFormData] = useState<CreateMaintenanceTemplateDto>({
    name: '',
    intervalType: '',
    intervalValue: 0,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is obligatory field';
    }

    if (!formData.intervalType) {
      newErrors.intervalType = 'Interval type is obligatory field';
    }

    if (!formData.intervalValue || formData.intervalValue <= 0) {
      newErrors.intervalValue = 'Interval value is obligatory field';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CreateMaintenanceTemplateDto, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', intervalType: '', intervalValue: 0 });
    setErrors({});
  };

  const getIntervalValueLabel = (): string => {
    return formData.intervalType === 'km' ? 'km' : formData.intervalType === 'time' ? 'days' : '';
  };

  return {
    formData,
    errors,
    validateForm,
    handleInputChange,
    resetForm,
    setErrors,
    getIntervalValueLabel,
  };
}
