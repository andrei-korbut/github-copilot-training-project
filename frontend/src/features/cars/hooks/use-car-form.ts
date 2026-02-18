import { useState } from 'react';
import type { CreateCarDto, CreateCarMaintenanceItemDto } from '../../../types/car';
import type { MaintenanceTemplate } from '../../../types/maintenance-template';

export interface CarFormData {
  name: string;
  currentKm: number;
  selectedTemplates: Map<number, SelectedTemplate>;
}

export interface SelectedTemplate {
  template: MaintenanceTemplate;
  intervalValue: number;
  lastServiceKm?: number;
  lastServiceDate?: string;
}

export interface CarFormErrors {
  name?: string;
  currentKm?: string;
  maintenanceItems?: Map<number, MaintenanceItemErrors>;
}

export interface MaintenanceItemErrors {
  intervalValue?: string;
  lastServiceKm?: string;
  lastServiceDate?: string;
}

export function useCarForm() {
  const [formData, setFormData] = useState<CarFormData>({
    name: '',
    currentKm: 0,
    selectedTemplates: new Map(),
  });
  const [errors, setErrors] = useState<CarFormErrors>({});

  const handleNameChange = (value: string) => {
    setFormData(prev => ({ ...prev, name: value }));
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
  };

  const handleCurrentKmChange = (value: number) => {
    setFormData(prev => ({ ...prev, currentKm: value }));
    if (errors.currentKm) {
      setErrors(prev => ({ ...prev, currentKm: undefined }));
    }
  };

  const toggleTemplate = (template: MaintenanceTemplate) => {
    setFormData(prev => {
      const newSelectedTemplates = new Map(prev.selectedTemplates);
      if (newSelectedTemplates.has(template.id)) {
        newSelectedTemplates.delete(template.id);
      } else {
        newSelectedTemplates.set(template.id, {
          template,
          intervalValue: template.intervalValue,
        });
      }
      return { ...prev, selectedTemplates: newSelectedTemplates };
    });
  };

  const updateMaintenanceItem = (
    templateId: number,
    field: keyof SelectedTemplate,
    value: number | string | undefined
  ) => {
    setFormData(prev => {
      const newSelectedTemplates = new Map(prev.selectedTemplates);
      const item = newSelectedTemplates.get(templateId);
      if (item) {
        newSelectedTemplates.set(templateId, { ...item, [field]: value });
      }
      return { ...prev, selectedTemplates: newSelectedTemplates };
    });

    // Clear field error
    if (errors.maintenanceItems?.has(templateId)) {
      setErrors(prev => {
        const newItemErrors = new Map(prev.maintenanceItems);
        const itemError = newItemErrors.get(templateId);
        if (itemError) {
          newItemErrors.set(templateId, { ...itemError, [field]: undefined });
        }
        return { ...prev, maintenanceItems: newItemErrors };
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: CarFormErrors = {
      maintenanceItems: new Map(),
    };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is obligatory field';
    }

    // Validate currentKm
    if (formData.currentKm === undefined || formData.currentKm === null) {
      newErrors.currentKm = 'Mileage is obligatory field';
    } else if (formData.currentKm < 0) {
      newErrors.currentKm = 'Mileage must be greater than or equal to 0';
    }

    // Validate maintenance items
    formData.selectedTemplates.forEach((item, templateId) => {
      const itemErrors: MaintenanceItemErrors = {};
      
      if (!item.intervalValue || item.intervalValue <= 0) {
        itemErrors.intervalValue = 'Interval value must be greater than 0';
      }

      // Validate date format if provided
      if (item.template.intervalType === 'time' && item.lastServiceDate) {
        if (!validateDateFormat(item.lastServiceDate)) {
          itemErrors.lastServiceDate = 'Invalid date format. Use dd/mm/yyyy';
        }
      }

      if (Object.keys(itemErrors).length > 0) {
        newErrors.maintenanceItems!.set(templateId, itemErrors);
      }
    });

    setErrors(newErrors);
    return !newErrors.name && !newErrors.currentKm && newErrors.maintenanceItems!.size === 0;
  };

  const validateDateFormat = (dateString: string): boolean => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(regex);
    
    if (!match) return false;
    
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    
    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 2000) return false;
    
    return true;
  };

  const convertToDto = (): CreateCarDto => {
    const maintenanceItems: CreateCarMaintenanceItemDto[] = [];

    formData.selectedTemplates.forEach((item) => {
      const dto: CreateCarMaintenanceItemDto = {
        maintenanceTemplateId: item.template.id,
        intervalValue: item.intervalValue,
        intervalType: item.template.intervalType,
      };

      if (item.template.intervalType === 'km' && item.lastServiceKm !== undefined) {
        dto.lastServiceKm = item.lastServiceKm;
      }

      if (item.template.intervalType === 'time' && item.lastServiceDate) {
        // Convert dd/mm/yyyy to ISO format for backend
        const [day, month, year] = item.lastServiceDate.split('/');
        dto.lastServiceDate = `${year}-${month}-${day}T00:00:00`;
      }

      maintenanceItems.push(dto);
    });

    return {
      name: formData.name.trim(),
      currentKm: formData.currentKm,
      maintenanceItems,
    };
  };

  const resetForm = () => {
    setFormData({
      name: '',
      currentKm: 0,
      selectedTemplates: new Map(),
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleNameChange,
    handleCurrentKmChange,
    toggleTemplate,
    updateMaintenanceItem,
    validateForm,
    convertToDto,
    resetForm,
    setErrors,
  };
}
