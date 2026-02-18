using CarMaintenanceTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarMaintenanceTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly ICarService _carService;
    private readonly ILogger<DashboardController> _logger;

    public DashboardController(ICarService carService, ILogger<DashboardController> logger)
    {
        _carService = carService;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves dashboard data for a specific car with calculated maintenance status.
    /// GET /api/dashboard/{carId}
    /// </summary>
    [HttpGet("{carId}")]
    public async Task<IActionResult> GetDashboardData(int carId)
    {
        try
        {
            var dashboardData = await _carService.GetDashboardDataAsync(carId);

            if (dashboardData == null)
            {
                return NotFound(new { error = $"Car with ID {carId} not found" });
            }

            return Ok(dashboardData);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving dashboard data for car {CarId}", carId);
            return StatusCode(500, new { error = "An error occurred while retrieving dashboard data" });
        }
    }
}
