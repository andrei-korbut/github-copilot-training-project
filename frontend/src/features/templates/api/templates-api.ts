import { API_ENDPOINTS } from '../../../constants/api-endpoints';
import type { CreateMaintenanceTemplateDto, MaintenanceTemplate } from '../../../types/maintenance-template';
import { apiRequest } from '../../../services/api-client';

export async function createMaintenanceTemplate(
  dto: CreateMaintenanceTemplateDto
): Promise<MaintenanceTemplate> {
  return apiRequest<MaintenanceTemplate>(API_ENDPOINTS.MAINTENANCE_TEMPLATES, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}
