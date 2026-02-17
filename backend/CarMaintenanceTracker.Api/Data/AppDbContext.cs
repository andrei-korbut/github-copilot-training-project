using Microsoft.EntityFrameworkCore;

namespace CarMaintenanceTracker.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // DbSet properties for entities will be added in feature tasks
    // Example: public DbSet<MaintenanceTemplate> MaintenanceTemplates { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Entity configurations will be added here when entities are created
    }
}
