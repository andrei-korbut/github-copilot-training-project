using System.ComponentModel.DataAnnotations;

namespace CarMaintenanceTracker.Api.DTOs;

public class CreateCarDto
{
    [Required(ErrorMessage = "Name is obligatory field")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Mileage is obligatory field")]
    [Range(0, int.MaxValue, ErrorMessage = "Current mileage must be greater than or equal to 0")]
    public int CurrentKm { get; set; }

    public List<CreateCarMaintenanceItemDto> MaintenanceItems { get; set; } = new List<CreateCarMaintenanceItemDto>();
}
