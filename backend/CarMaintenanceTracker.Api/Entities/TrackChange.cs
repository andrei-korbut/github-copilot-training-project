using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarMaintenanceTracker.Api.Entities;

public class TrackChange
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int CarMaintenanceItemId { get; set; }

    public int? Km { get; set; }

    public DateTime? Date { get; set; }

    // Navigation property
    [ForeignKey("CarMaintenanceItemId")]
    public virtual CarMaintenanceItem CarMaintenanceItem { get; set; } = null!;
}
