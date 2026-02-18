import { apiRequest } from '../../../services/api-client';
import { API_ENDPOINTS } from '../../../constants/api-endpoints';
import type { Car, CreateCarDto, UpdateCarMileageDto, CreateTrackChangeDto, TrackChangeDto } from '../../../types/car';

export async function createCar(dto: CreateCarDto): Promise<Car> {
  return apiRequest<Car>(API_ENDPOINTS.CARS, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function getAllCars(): Promise<Car[]> {
  return apiRequest<Car[]>(API_ENDPOINTS.CARS, {
    method: 'GET',
  });
}

export async function getCarById(carId: number): Promise<Car> {
  return apiRequest<Car>(`${API_ENDPOINTS.CARS}/${carId}`, {
    method: 'GET',
  });
}

export async function updateCarMileage(carId: number, dto: UpdateCarMileageDto): Promise<void> {
  await apiRequest<void>(`${API_ENDPOINTS.CARS}/${carId}/km`, {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
}

export async function trackChange(carMaintenanceItemId: number, dto: CreateTrackChangeDto): Promise<TrackChangeDto> {
  return apiRequest<TrackChangeDto>(`${API_ENDPOINTS.TRACK_CHANGE}/${carMaintenanceItemId}`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}
