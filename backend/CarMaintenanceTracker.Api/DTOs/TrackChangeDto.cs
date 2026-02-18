namespace CarMaintenanceTracker.Api.DTOs;

public class TrackChangeDto
{
    public int Id { get; set; }
    public int CarMaintenanceItemId { get; set; }
    public int? Km { get; set; }
    public DateTime? Date { get; set; }
}
