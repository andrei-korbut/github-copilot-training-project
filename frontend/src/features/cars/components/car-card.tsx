import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../../components/ui';
import { formatDate } from '../../../utils/format-date';
import { formatNumber } from '../../../utils/format-number';
import type { Car } from '../../../types/car';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/cars/${car.id}/edit`);
  };

  const handleViewDetails = () => {
    navigate(`/cars/${car.id}`);
  };

  return (
    <Card padding="lg" className="h-full flex flex-col">
      <div className="flex-1 space-y-4">
        {/* Car Name - Most Prominent */}
        <h3 className="text-xl font-bold text-gray-900">
          {car.name}
        </h3>

        {/* Car Details */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span className="font-medium">Current Mileage:</span>
            <span className="text-gray-900 font-semibold">
              {formatNumber(car.currentKm)} km
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium">Maintenance Items:</span>
            <span className="text-gray-900 font-semibold">
              {car.maintenanceItems.length}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium">Created:</span>
            <span className="text-gray-900">
              {formatDate(car.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-6 pt-4 border-t border-gray-200">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleEdit}
          className="flex-1"
        >
          Edit
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleViewDetails}
          className="flex-1"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};
