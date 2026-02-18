using CarMaintenanceTracker.Api.DTOs;
using CarMaintenanceTracker.Api.Entities;
using CarMaintenanceTracker.Api.Repositories;

namespace CarMaintenanceTracker.Api.Services;

public class TrackChangeService : ITrackChangeService
{
    private readonly IRepository<TrackChange> _trackChangeRepository;
    private readonly IRepository<CarMaintenanceItem> _maintenanceItemRepository;
    private readonly IRepository<MaintenanceTemplate> _templateRepository;

    public TrackChangeService(
        IRepository<TrackChange> trackChangeRepository,
        IRepository<CarMaintenanceItem> maintenanceItemRepository,
        IRepository<MaintenanceTemplate> templateRepository)
    {
        _trackChangeRepository = trackChangeRepository;
        _maintenanceItemRepository = maintenanceItemRepository;
        _templateRepository = templateRepository;
    }

    public async Task<TrackChangeDto> TrackChangeAsync(int carMaintenanceItemId, CreateTrackChangeDto dto)
    {
        // Validate CarMaintenanceItem exists
        var maintenanceItem = await _maintenanceItemRepository.GetByIdAsync(carMaintenanceItemId);
        
        if (maintenanceItem == null)
        {
            throw new KeyNotFoundException($"Car maintenance item with ID {carMaintenanceItemId} not found");
        }

        // Validate associated template is not archived
        var template = await _templateRepository.GetByIdAsync(maintenanceItem.MaintenanceTemplateId);
        
        if (template == null)
        {
            throw new InvalidOperationException($"Maintenance template with ID {maintenanceItem.MaintenanceTemplateId} not found");
        }

        if (template.Archived)
        {
            throw new ArgumentException("Cannot track changes for archived maintenance templates");
        }

        // Validate required fields based on interval type
        if (maintenanceItem.IntervalType == "km")
        {
            if (!dto.Km.HasValue)
            {
                throw new ArgumentException("Km is required for km-based maintenance items");
            }

            if (dto.Km.Value < 0)
            {
                throw new ArgumentException("Km must be greater than or equal to 0");
            }
        }
        else if (maintenanceItem.IntervalType == "time")
        {
            if (!dto.Date.HasValue)
            {
                throw new ArgumentException("Date is required for time-based maintenance items");
            }

            if (dto.Date.Value > DateTime.UtcNow)
            {
                throw new ArgumentException("Date cannot be in the future");
            }
        }

        // Create TrackChange record
        var trackChange = new TrackChange
        {
            CarMaintenanceItemId = carMaintenanceItemId,
            Km = dto.Km,
            Date = dto.Date
        };

        var createdTrackChange = await _trackChangeRepository.AddAsync(trackChange);

        // Update CarMaintenanceItem with last service values
        if (maintenanceItem.IntervalType == "km")
        {
            maintenanceItem.LastServiceKm = dto.Km;
            maintenanceItem.CalculatedNextKm = dto.Km + maintenanceItem.IntervalValue;
        }
        else if (maintenanceItem.IntervalType == "time")
        {
            maintenanceItem.LastServiceDate = dto.Date;
            maintenanceItem.CalculatedNextDate = dto.Date?.AddDays(maintenanceItem.IntervalValue);
        }

        await _maintenanceItemRepository.UpdateAsync(maintenanceItem);

        // Map to DTO and return
        return new TrackChangeDto
        {
            Id = createdTrackChange.Id,
            CarMaintenanceItemId = createdTrackChange.CarMaintenanceItemId,
            Km = createdTrackChange.Km,
            Date = createdTrackChange.Date
        };
    }
}
