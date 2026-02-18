import React from 'react';
import { TemplateCard } from './template-card';
import type { MaintenanceTemplate } from '../../../types/maintenance-template';

interface TemplateListProps {
  templates: MaintenanceTemplate[];
  onEdit?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onEdit,
  onArchive,
  onRestore,
}) => {
  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onEdit={onEdit}
          onArchive={onArchive}
          onRestore={onRestore}
        />
      ))}
    </div>
  );
};
