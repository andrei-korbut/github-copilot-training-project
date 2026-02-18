import React from 'react';
import type { DashboardMaintenanceItem } from '../../../types/dashboard';
import { MaintenanceItemCard } from './maintenance-item-card';
import { EmptyState } from '../../../components/feedback/empty-state';

interface MaintenanceGroupProps {
  title: string;
  items: DashboardMaintenanceItem[];
  statusColor: 'red' | 'yellow' | 'green';
  emptyMessage: string;
}

export const MaintenanceGroup: React.FC<MaintenanceGroupProps> = ({
  title,
  items,
  statusColor,
  emptyMessage,
}) => {
  const colorClasses = {
    red: 'bg-red-50 border-red-300',
    yellow: 'bg-yellow-50 border-yellow-300',
    green: 'bg-green-50 border-green-300',
  };

  const titleColorClasses = {
    red: 'text-red-800',
    yellow: 'text-yellow-800',
    green: 'text-green-800',
  };

  const iconMap = {
    red: '🔴',
    yellow: '🟡',
    green: '🟢',
  };

  return (
    <div className={`border-2 rounded-2xl p-6 ${colorClasses[statusColor]}`}>
      <h3 className={`text-xl font-bold mb-4 ${titleColorClasses[statusColor]}`}>
        {iconMap[statusColor]} {title}
      </h3>
      {items.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <MaintenanceItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
