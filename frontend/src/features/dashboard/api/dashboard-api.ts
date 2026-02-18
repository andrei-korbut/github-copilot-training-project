import { apiRequest } from '../../../services/api-client';
import { API_ENDPOINTS } from '../../../constants/api-endpoints';
import type { Dashboard } from '../../../types/dashboard';

export async function getDashboardData(carId: number): Promise<Dashboard> {
  return apiRequest<Dashboard>(`${API_ENDPOINTS.DASHBOARD}/${carId}`, {
    method: 'GET',
  });
}
