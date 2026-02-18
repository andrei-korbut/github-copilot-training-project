using System.ComponentModel.DataAnnotations;

namespace CarMaintenanceTracker.Api.DTOs;

public class CreateCarMaintenanceItemDto
{
    [Required(ErrorMessage = "Maintenance template ID is required")]
    public int MaintenanceTemplateId { get; set; }

    [Required(ErrorMessage = "Interval value is required")]
    [Range(1, int.MaxValue, ErrorMessage = "Interval value must be greater than 0")]
    public int IntervalValue { get; set; }

    [Required(ErrorMessage = "Interval type is required")]
    [RegularExpression("^(km|time)$", ErrorMessage = "Interval type must be 'km' or 'time'")]
    public string IntervalType { get; set; } = string.Empty;

    public int? LastServiceKm { get; set; }

    public DateTime? LastServiceDate { get; set; }
}
