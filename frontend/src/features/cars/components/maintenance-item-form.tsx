import React from 'react';
import type { SelectedTemplate, MaintenanceItemErrors } from '../hooks/use-car-form';
import { Card, Input } from '../../../components/ui';
import { DateInput } from '../../../components/ui/date-input';

interface MaintenanceItemFormProps {
  item: SelectedTemplate;
  errors?: MaintenanceItemErrors;
  onUpdate: (field: keyof SelectedTemplate, value: number | string | undefined) => void;
  disabled?: boolean;
}

export const MaintenanceItemForm: React.FC<MaintenanceItemFormProps> = ({
  item,
  errors,
  onUpdate,
  disabled = false,
}) => {
  const { template } = item;
  const isKmBased = template.intervalType === 'km';

  return (
    <Card padding="md" className="space-y-4">
      <div>
        <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
        <p className="text-sm text-gray-500">
          Interval type: {isKmBased ? 'Kilometers' : 'Time-based'}
        </p>
      </div>

      <Input
        label={`Interval Value (${isKmBased ? 'km' : 'days'})`}
        type="number"
        min="1"
        value={item.intervalValue || ''}
        onChange={(e) => onUpdate('intervalValue', parseInt(e.target.value) || 0)}
        error={errors?.intervalValue}
        disabled={disabled}
      />

      {isKmBased ? (
        <Input
          label="Last Service (km) - Optional"
          type="number"
          min="0"
          value={item.lastServiceKm || ''}
          onChange={(e) => {
            const value = e.target.value;
            onUpdate('lastServiceKm', value ? parseInt(value) : undefined);
          }}
          error={errors?.lastServiceKm}
          disabled={disabled}
          placeholder="Enter last service kilometers"
        />
      ) : (
        <DateInput
          label="Last Service Date - Optional"
          value={item.lastServiceDate || ''}
          onChange={(value) => onUpdate('lastServiceDate', value || undefined)}
          error={errors?.lastServiceDate}
          disabled={disabled}
        />
      )}
    </Card>
  );
};
