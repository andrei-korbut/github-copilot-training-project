namespace CarMaintenanceTracker.Api.DTOs;

public class CarMaintenanceItemDto
{
    public int Id { get; set; }
    public int MaintenanceTemplateId { get; set; }
    public string TemplateName { get; set; } = string.Empty;
    public string IntervalType { get; set; } = string.Empty;
    public int IntervalValue { get; set; }
    public int? LastServiceKm { get; set; }
    public DateTime? LastServiceDate { get; set; }
    public int? CalculatedNextKm { get; set; }
    public DateTime? CalculatedNextDate { get; set; }
}
