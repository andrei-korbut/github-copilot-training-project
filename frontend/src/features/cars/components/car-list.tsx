import React from 'react';
import { CarCard } from './car-card';
import type { Car } from '../../../types/car';

interface CarListProps {
  cars: Car[];
}

export const CarList: React.FC<CarListProps> = ({ cars }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};
