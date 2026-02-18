using System.ComponentModel.DataAnnotations;

namespace CarMaintenanceTracker.Api.DTOs;

public class UpdateCarMileageDto
{
    [Required(ErrorMessage = "Mileage is obligatory field")]
    [Range(0, int.MaxValue, ErrorMessage = "Mileage must be greater than or equal to 0")]
    public int CurrentKm { get; set; }
}
