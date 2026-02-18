using CarMaintenanceTracker.Api.DTOs;
using CarMaintenanceTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarMaintenanceTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarsController : ControllerBase
{
    private readonly ICarService _carService;
    private readonly ILogger<CarsController> _logger;

    public CarsController(ICarService carService, ILogger<CarsController> logger)
    {
        _carService = carService;
        _logger = logger;
    }

    /// <summary>
    /// Creates a new car with associated maintenance items.
    /// POST /api/cars
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateCar([FromBody] CreateCarDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdCar = await _carService.CreateCarAsync(dto);

            return CreatedAtAction(
                nameof(GetCarById),
                new { id = createdCar.Id },
                createdCar);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Validation error while creating car");
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating car");
            return StatusCode(500, new { error = "An error occurred while creating the car" });
        }
    }

    /// <summary>
    /// Retrieves a car by ID with all maintenance items.
    /// GET /api/cars/{id}
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCarById(int id)
    {
        try
        {
            var car = await _carService.GetCarByIdAsync(id);

            if (car == null)
            {
                return NotFound(new { error = $"Car with ID {id} not found" });
            }

            return Ok(car);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving car");
            return StatusCode(500, new { error = "An error occurred while retrieving the car" });
        }
    }

    /// <summary>
    /// Retrieves all cars with their maintenance items.
    /// GET /api/cars
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAllCars()
    {
        try
        {
            var cars = await _carService.GetAllCarsAsync();
            return Ok(cars);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving cars");
            return StatusCode(500, new { error = "An error occurred while retrieving cars" });
        }
    }
}
