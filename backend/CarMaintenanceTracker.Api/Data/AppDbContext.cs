using CarMaintenanceTracker.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarMaintenanceTracker.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public virtual DbSet<MaintenanceTemplate> MaintenanceTemplates { get; set; }
    public virtual DbSet<Car> Cars { get; set; }
    public virtual DbSet<CarMaintenanceItem> CarMaintenanceItems { get; set; }

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

        // Configure Car entity
        modelBuilder.Entity<Car>(entity =>
        {
            entity.ToTable("Cars");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.CurrentKm).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired().HasDefaultValueSql("GETUTCDATE()");
            
            entity.HasMany(e => e.MaintenanceItems)
                .WithOne(mi => mi.Car)
                .HasForeignKey(mi => mi.CarId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure CarMaintenanceItem entity
        modelBuilder.Entity<CarMaintenanceItem>(entity =>
        {
            entity.ToTable("CarMaintenanceItems");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CarId).IsRequired();
            entity.Property(e => e.MaintenanceTemplateId).IsRequired();
            entity.Property(e => e.IntervalValue).IsRequired();
            entity.Property(e => e.IntervalType).IsRequired().HasMaxLength(10);
            entity.Property(e => e.LastServiceKm).IsRequired(false);
            entity.Property(e => e.LastServiceDate).IsRequired(false);
            entity.Property(e => e.CalculatedNextKm).IsRequired(false);
            entity.Property(e => e.CalculatedNextDate).IsRequired(false);

            entity.HasOne(e => e.Car)
                .WithMany(c => c.MaintenanceItems)
                .HasForeignKey(e => e.CarId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.MaintenanceTemplate)
                .WithMany()
                .HasForeignKey(e => e.MaintenanceTemplateId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
