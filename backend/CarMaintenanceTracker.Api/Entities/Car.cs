using System.ComponentModel.DataAnnotations;

namespace CarMaintenanceTracker.Api.Entities;

public class Car
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public int CurrentKm { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public virtual ICollection<CarMaintenanceItem> MaintenanceItems { get; set; } = new List<CarMaintenanceItem>();
}
