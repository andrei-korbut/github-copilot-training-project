using CarMaintenanceTracker.Api.Entities;

namespace CarMaintenanceTracker.Api.Repositories;

/// <summary>
/// Repository interface for MaintenanceTemplate entity.
/// Inherits base CRUD operations from IRepository and can be extended with specific methods.
/// </summary>
public interface IMaintenanceTemplateRepository : IRepository<MaintenanceTemplate>
{
    // Add specific methods for MaintenanceTemplate here if needed
    // Base CRUD operations (GetByIdAsync, GetAllAsync, AddAsync, UpdateAsync, DeleteAsync) inherited from IRepository<T>
}
