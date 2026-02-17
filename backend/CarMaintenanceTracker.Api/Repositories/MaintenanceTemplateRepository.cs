using CarMaintenanceTracker.Api.Data;
using CarMaintenanceTracker.Api.Entities;

namespace CarMaintenanceTracker.Api.Repositories;

public class MaintenanceTemplateRepository : IMaintenanceTemplateRepository
{
    private readonly AppDbContext _context;

    public MaintenanceTemplateRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<MaintenanceTemplate> CreateAsync(MaintenanceTemplate template)
    {
        _context.MaintenanceTemplates.Add(template);
        await _context.SaveChangesAsync();
        return template;
    }
}
