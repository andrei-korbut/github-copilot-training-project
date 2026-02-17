namespace CarMaintenanceTracker.Api.DTOs;

public class MaintenanceTemplateDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string IntervalType { get; set; } = string.Empty;
    public int IntervalValue { get; set; }
    public bool Archived { get; set; }
    public DateTime CreatedAt { get; set; }
}
