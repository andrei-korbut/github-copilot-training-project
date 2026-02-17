using CarMaintenanceTracker.Api.DTOs;

namespace CarMaintenanceTracker.Api.Services;

public interface IMaintenanceTemplateService
{
    Task<MaintenanceTemplateDto> CreateTemplateAsync(CreateMaintenanceTemplateDto dto);
}
