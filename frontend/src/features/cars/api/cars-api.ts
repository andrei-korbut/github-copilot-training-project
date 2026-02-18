import { apiRequest } from '../../../services/api-client';
import { API_ENDPOINTS } from '../../../constants/api-endpoints';
import type { Car, CreateCarDto } from '../../../types/car';

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
