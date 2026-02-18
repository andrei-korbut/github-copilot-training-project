using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarMaintenanceTracker.Api.Entities;

public class CarMaintenanceItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int CarId { get; set; }

    [Required]
    public int MaintenanceTemplateId { get; set; }

    public int? LastServiceKm { get; set; }

    public DateTime? LastServiceDate { get; set; }

    [Required]
    public int IntervalValue { get; set; }

    [Required]
    [MaxLength(10)]
    public string IntervalType { get; set; } = string.Empty;

    public int? CalculatedNextKm { get; set; }

    public DateTime? CalculatedNextDate { get; set; }

    // Navigation properties
    [ForeignKey("CarId")]
    public virtual Car Car { get; set; } = null!;

    [ForeignKey("MaintenanceTemplateId")]
    public virtual MaintenanceTemplate MaintenanceTemplate { get; set; } = null!;
}
