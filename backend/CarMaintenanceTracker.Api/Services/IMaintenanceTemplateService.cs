using CarMaintenanceTracker.Api.DTOs;

namespace CarMaintenanceTracker.Api.Services;

public interface IMaintenanceTemplateService
{
    Task<List<MaintenanceTemplateDto>> GetAllTemplatesAsync();
    Task<MaintenanceTemplateDto> CreateTemplateAsync(CreateMaintenanceTemplateDto dto);
}
