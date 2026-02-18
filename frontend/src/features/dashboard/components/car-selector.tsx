import React from 'react';
import { Select } from '../../../components/ui/select';
import type { Car } from '../../../types/car';

interface CarSelectorProps {
  cars: Car[];
  selectedCarId: number | null;
  onCarSelect: (carId: number) => void;
  disabled?: boolean;
}

export const CarSelector: React.FC<CarSelectorProps> = ({
  cars,
  selectedCarId,
  onCarSelect,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carId = parseInt(e.target.value, 10);
    onCarSelect(carId);
  };

  return (
    <Select
      label="Select Car"
      value={selectedCarId ?? ''}
      onChange={handleChange}
      disabled={disabled}
    >
      <option value="" disabled>
        Choose a car...
      </option>
      {cars.map((car) => (
        <option key={car.id} value={car.id}>
          {car.name}
        </option>
      ))}
    </Select>
  );
};
