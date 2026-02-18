namespace CarMaintenanceTracker.Api.DTOs;

public class DashboardMaintenanceItemDto
{
    public int Id { get; set; }
    public string TemplateName { get; set; } = string.Empty;
    public string IntervalType { get; set; } = string.Empty;
    public int IntervalValue { get; set; }
    public int? LastServiceKm { get; set; }
    public DateTime? LastServiceDate { get; set; }
    public int? CalculatedNextKm { get; set; }
    public DateTime? CalculatedNextDate { get; set; }
    public string Status { get; set; } = string.Empty; // "Overdue", "DueSoon", "OK"
    public int? KmUntilDue { get; set; }
    public int? DaysUntilDue { get; set; }
}
