namespace CarMaintenanceTracker.Api.DTOs;

public class DashboardDto
{
    public int CarId { get; set; }
    public string CarName { get; set; } = string.Empty;
    public int CurrentKm { get; set; }
    public List<DashboardMaintenanceItemDto> MaintenanceItems { get; set; } = new List<DashboardMaintenanceItemDto>();
}
