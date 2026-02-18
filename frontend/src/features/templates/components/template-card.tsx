import React from 'react';
import { Card, Button } from '../../../components/ui';
import { formatDate } from '../../../utils/format-date';
import type { MaintenanceTemplate } from '../../../types/maintenance-template';

interface TemplateCardProps {
  template: MaintenanceTemplate;
  onEdit?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onEdit,
  onArchive,
  onRestore,
}) => {
  const getIntervalLabel = (): string => {
    return template.intervalType === 'km' ? 'km' : 'days';
  };

  return (
    <Card 
      padding="lg" 
      className={`transition-all ${template.archived ? 'bg-gray-100 border-gray-300' : ''}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Template Info */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {template.name}
            </h3>
            {template.archived && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-600 text-white">
                Archived
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
            <div>
              <span className="font-medium">Interval:</span>{' '}
              {template.intervalValue} {getIntervalLabel()}
            </div>
            <div>
              <span className="font-medium">Type:</span>{' '}
              {template.intervalType === 'km' ? 'Kilometers' : 'Time'}
            </div>
            <div>
              <span className="font-medium">Created:</span>{' '}
              {formatDate(template.createdAt)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 sm:flex-shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit?.(template.id)}
            disabled={!onEdit}
          >
            Edit
          </Button>
          
          {template.archived ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onRestore?.(template.id)}
              disabled={!onRestore}
            >
              Restore
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onArchive?.(template.id)}
              disabled={!onArchive}
            >
              Archive
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
