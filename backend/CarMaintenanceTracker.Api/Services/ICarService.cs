using CarMaintenanceTracker.Api.DTOs;

namespace CarMaintenanceTracker.Api.Services;

public interface ICarService
{
    /// <summary>
    /// Creates a new car with associated maintenance items.
    /// </summary>
    /// <param name="dto">The car creation data</param>
    /// <returns>The created car with calculated next service dates</returns>
    Task<CarDto> CreateCarAsync(CreateCarDto dto);

    /// <summary>
    /// Retrieves a car by ID with all maintenance items.
    /// </summary>
    /// <param name="id">The car ID</param>
    /// <returns>The car DTO or null if not found</returns>
    Task<CarDto?> GetCarByIdAsync(int id);

    /// <summary>
    /// Retrieves all cars with their maintenance items.
    /// </summary>
    /// <returns>List of all cars</returns>
    Task<List<CarDto>> GetAllCarsAsync();

    /// <summary>
    /// Retrieves dashboard data for a specific car with calculated maintenance status.
    /// </summary>
    /// <param name="carId">The car ID</param>
    /// <returns>Dashboard data with calculated status or null if car not found</returns>
    Task<DashboardDto?> GetDashboardDataAsync(int carId);
}
