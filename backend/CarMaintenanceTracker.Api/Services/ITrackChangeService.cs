using CarMaintenanceTracker.Api.DTOs;

namespace CarMaintenanceTracker.Api.Services;

public interface ITrackChangeService
{
    /// <summary>
    /// Records a maintenance service for a specific car maintenance item.
    /// Creates a TrackChange record, updates the CarMaintenanceItem's last service km/date,
    /// and recalculates the next service due km/date.
    /// </summary>
    /// <param name="carMaintenanceItemId">The ID of the car maintenance item</param>
    /// <param name="dto">The track change data</param>
    /// <returns>The created track change record</returns>
    Task<TrackChangeDto> TrackChangeAsync(int carMaintenanceItemId, CreateTrackChangeDto dto);
}
