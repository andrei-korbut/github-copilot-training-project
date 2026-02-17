using System.ComponentModel.DataAnnotations;

namespace CarMaintenanceTracker.Api.DTOs;

public class CreateMaintenanceTemplateDto
{
    [Required(ErrorMessage = "Name is obligatory field")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Interval type is obligatory field")]
    public string IntervalType { get; set; } = string.Empty;

    [Required(ErrorMessage = "Interval value is obligatory field")]
    [Range(1, int.MaxValue, ErrorMessage = "Interval value must be greater than 0")]
    public int IntervalValue { get; set; }
}
