import React from 'react';
import { Card, Button } from '../../../components/ui';
import { formatDate } from '../../../utils/format-date';
import { formatNumber } from '../../../utils/format-number';
import type { CarMaintenanceItem } from '../../../types/car';

interface MaintenanceItemCardProps {
  item: CarMaintenanceItem;
  onTrackChange: () => void;
}

export const MaintenanceItemCard: React.FC<MaintenanceItemCardProps> = ({ item, onTrackChange }) => {
  const intervalLabel = item.intervalType === 'km' ? 'km' : 'days';
  
  return (
    <Card padding="md" className="h-full flex flex-col">
      <div className="flex-1 space-y-3">
        {/* Template Name */}
        <h4 className="text-lg font-bold text-gray-900">
          {item.maintenanceTemplateName}
        </h4>

        {/* Interval Info */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Interval:</span>{' '}
          <span className="text-gray-900">
            Every {formatNumber(item.intervalValue)} {intervalLabel}
          </span>
        </div>

        {/* Last Service and Next Due - Conditional based on interval type */}
        <div className="space-y-2 text-sm">
          {item.intervalType === 'km' && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Last Service:</span>
                <span className="text-gray-900">
                  {item.lastServiceKm !== undefined ? `${formatNumber(item.lastServiceKm)} km` : 'Not recorded'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Next Due:</span>
                <span className="text-gray-900 font-semibold">
                  {item.calculatedNextKm !== undefined ? `${formatNumber(item.calculatedNextKm)} km` : 'N/A'}
                </span>
              </div>
            </>
          )}

          {item.intervalType === 'time' && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Last Service:</span>
                <span className="text-gray-900">
                  {item.lastServiceDate ? formatDate(item.lastServiceDate) : 'Not recorded'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Next Due:</span>
                <span className="text-gray-900 font-semibold">
                  {item.calculatedNextDate ? formatDate(item.calculatedNextDate) : 'N/A'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Track Change Button */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Button
          variant="primary"
          size="sm"
          onClick={onTrackChange}
          className="w-full"
        >
          Track Change
        </Button>
      </div>
    </Card>
  );
};
