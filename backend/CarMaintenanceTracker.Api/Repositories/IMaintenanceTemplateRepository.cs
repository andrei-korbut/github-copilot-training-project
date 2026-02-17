using CarMaintenanceTracker.Api.Entities;

namespace CarMaintenanceTracker.Api.Repositories;

public interface IMaintenanceTemplateRepository
{
    Task<MaintenanceTemplate> CreateAsync(MaintenanceTemplate template);
}
