namespace CarMaintenanceTracker.Api.DTOs;

public class CarDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int CurrentKm { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<CarMaintenanceItemDto> MaintenanceItems { get; set; } = new List<CarMaintenanceItemDto>();
}
