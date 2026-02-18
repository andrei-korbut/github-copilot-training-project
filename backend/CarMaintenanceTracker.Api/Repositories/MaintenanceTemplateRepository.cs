using CarMaintenanceTracker.Api.Data;
using CarMaintenanceTracker.Api.Entities;
using Microsoft.EntityFrameworkCore;

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

    /// <summary>
    /// Gets all maintenance templates sorted by creation date (newest first).
    /// </summary>
    /// <returns>Collection of maintenance templates ordered by CreatedAt descending</returns>
    public override async Task<IEnumerable<MaintenanceTemplate>> GetAllAsync()
    {
        return await _dbSet
            .AsNoTracking()
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }
}
