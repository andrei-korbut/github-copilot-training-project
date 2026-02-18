import React from 'react';
import type { MaintenanceTemplate } from '../../../types/maintenance-template';
import { Card } from '../../../components/ui';

interface MaintenanceItemSelectorProps {
  templates: MaintenanceTemplate[];
  selectedTemplateIds: Set<number>;
  onToggle: (template: MaintenanceTemplate) => void;
  disabled?: boolean;
}

export const MaintenanceItemSelector: React.FC<MaintenanceItemSelectorProps> = ({
  templates,
  selectedTemplateIds,
  onToggle,
  disabled = false,
}) => {
  if (templates.length === 0) {
    return (
      <Card className="text-center py-8">
        <p className="text-gray-500">No maintenance templates available.</p>
        <p className="text-sm text-gray-400 mt-2">
          Create templates in the Setup page first.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {templates.map((template) => (
        <Card key={template.id} padding="sm" className="hover:shadow-xl transition-shadow">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={selectedTemplateIds.has(template.id)}
              onChange={() => onToggle(template)}
              disabled={disabled}
              className="mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="ml-3 flex-1">
              <div className="font-medium text-gray-900">{template.name}</div>
              <div className="text-sm text-gray-500 mt-1">
                Every {template.intervalValue} {template.intervalType === 'km' ? 'km' : 'days'}
              </div>
            </div>
          </label>
        </Card>
      ))}
    </div>
  );
};
