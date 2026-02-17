using System.ComponentModel.DataAnnotations;

namespace CarMaintenanceTracker.Api.Entities;

public class MaintenanceTemplate
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(10)]
    public string IntervalType { get; set; } = string.Empty;

    [Required]
    public int IntervalValue { get; set; }

    public bool Archived { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
