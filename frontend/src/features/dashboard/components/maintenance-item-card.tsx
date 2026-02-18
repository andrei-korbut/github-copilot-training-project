import React from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import type { DashboardMaintenanceItem } from '../../../types/dashboard';
import { formatDate } from '../../../utils/format-date';
import { formatNumber } from '../../../utils/format-number';

interface MaintenanceItemCardProps {
  item: DashboardMaintenanceItem;
}

export const MaintenanceItemCard: React.FC<MaintenanceItemCardProps> = ({ item }) => {
  const {
    maintenanceTemplateName,
    intervalType,
    intervalValue,
    lastServiceKm,
    lastServiceDate,
    calculatedNextKm,
    calculatedNextDate,
    kmUntilDue,
    daysUntilDue,
  } = item;

  const intervalLabel = intervalType === 'km' ? 'km' : 'days';
  const intervalText = `Every ${formatNumber(intervalValue)} ${intervalLabel}`;

  const lastServiceText =
    intervalType === 'km'
      ? `${formatNumber(lastServiceKm ?? 0)} km`
      : formatDate(lastServiceDate ?? '');

  const nextDueText =
    intervalType === 'km'
      ? `${formatNumber(calculatedNextKm ?? 0)} km`
      : formatDate(calculatedNextDate ?? '');

  const untilDueText =
    intervalType === 'km'
      ? `${formatNumber(Math.abs(kmUntilDue ?? 0))} km ${(kmUntilDue ?? 0) < 0 ? 'overdue' : 'remaining'}`
      : `${Math.abs(Math.round(daysUntilDue ?? 0))} days ${(daysUntilDue ?? 0) < 0 ? 'overdue' : 'remaining'}`;

  return (
    <Card padding="md" className="h-full flex flex-col">
      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-900 mb-3">{maintenanceTemplateName}</h4>
        
        <div className="space-y-2 text-sm mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">Interval:</span> {intervalText}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Last Service:</span> {lastServiceText}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Next Due:</span> {nextDueText}
          </p>
          <p className="text-gray-700 font-semibold">
            {untilDueText}
          </p>
        </div>
      </div>

      <Button variant="primary" size="sm" className="w-full">
        Track Change
      </Button>
    </Card>
  );
};
