using CarMaintenanceTracker.Api.Data;
using CarMaintenanceTracker.Api.Entities;

namespace CarMaintenanceTracker.Api.Repositories;

/// <summary>
/// Repository implementation for MaintenanceTemplate entity.
/// Inherits base CRUD operations from Repository and implements specific interface.
/// </summary>
public class MaintenanceTemplateRepository : Repository<MaintenanceTemplate>, IMaintenanceTemplateRepository
{
    public MaintenanceTemplateRepository(AppDbContext context) : base(context)
    {
    }

    // Add specific methods for MaintenanceTemplate here if needed
    // Base CRUD operations (GetByIdAsync, GetAllAsync, AddAsync, UpdateAsync, DeleteAsync) inherited from Repository<T>
}
