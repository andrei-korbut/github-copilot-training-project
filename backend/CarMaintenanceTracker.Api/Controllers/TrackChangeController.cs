using CarMaintenanceTracker.Api.DTOs;
using CarMaintenanceTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarMaintenanceTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TrackChangeController : ControllerBase
{
    private readonly ITrackChangeService _trackChangeService;
    private readonly ILogger<TrackChangeController> _logger;

    public TrackChangeController(ITrackChangeService trackChangeService, ILogger<TrackChangeController> logger)
    {
        _trackChangeService = trackChangeService;
        _logger = logger;
    }

    /// <summary>
    /// Records a maintenance service for a specific car maintenance item.
    /// POST /api/trackchange/{carMaintenanceItemId}
    /// </summary>
    [HttpPost("{carMaintenanceItemId}")]
    public async Task<IActionResult> TrackChange(int carMaintenanceItemId, [FromBody] CreateTrackChangeDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var trackChange = await _trackChangeService.TrackChangeAsync(carMaintenanceItemId, dto);

            return CreatedAtAction(
                nameof(TrackChange),
                new { carMaintenanceItemId = trackChange.CarMaintenanceItemId },
                trackChange);
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogWarning(ex, "Car maintenance item not found: {ItemId}", carMaintenanceItemId);
            return NotFound(new { error = ex.Message });
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Validation error while tracking change for item: {ItemId}", carMaintenanceItemId);
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error tracking change for item: {ItemId}", carMaintenanceItemId);
            return StatusCode(500, new { error = "An error occurred while tracking the maintenance change" });
        }
    }
}
