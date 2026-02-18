import React from 'react';
import { formatNumber } from '../../../utils/format-number';

interface DashboardHeaderProps {
  carName: string;
  currentKm: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  carName,
  currentKm,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{carName}</h2>
      <p className="text-lg text-gray-600">
        Current Mileage: <span className="font-semibold text-gray-900">{formatNumber(currentKm)} km</span>
      </p>
    </div>
  );
};
