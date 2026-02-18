using System.ComponentModel.DataAnnotations;

namespace CarMaintenanceTracker.Api.DTOs;

public class CreateTrackChangeDto
{
    public int? Km { get; set; }

    public DateTime? Date { get; set; }
}
