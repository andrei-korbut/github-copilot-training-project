using CarMaintenanceTracker.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarMaintenanceTracker.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public virtual DbSet<MaintenanceTemplate> MaintenanceTemplates { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configure MaintenanceTemplate entity
        modelBuilder.Entity<MaintenanceTemplate>(entity =>
        {
            entity.ToTable("MaintenanceTemplates");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.IntervalType).IsRequired().HasMaxLength(10);
            entity.Property(e => e.IntervalValue).IsRequired();
            entity.Property(e => e.Archived).IsRequired().HasDefaultValue(false);
            entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("GETUTCDATE()");
        });
    }
}
