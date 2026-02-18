using CarMaintenanceTracker.Api.DTOs;
using CarMaintenanceTracker.Api.Entities;
using CarMaintenanceTracker.Api.Repositories;

namespace CarMaintenanceTracker.Api.Services;

public class CarService : ICarService
{
    private readonly IRepository<Car> _carRepository;
    private readonly IRepository<MaintenanceTemplate> _templateRepository;

    public CarService(IRepository<Car> carRepository, IRepository<MaintenanceTemplate> templateRepository)
    {
        _carRepository = carRepository;
        _templateRepository = templateRepository;
    }

    public async Task<CarDto> CreateCarAsync(CreateCarDto dto)
    {
        // Validate maintenance templates exist and are not archived
        var templateIds = dto.MaintenanceItems.Select(mi => mi.MaintenanceTemplateId).Distinct().ToList();
        
        if (templateIds.Any())
        {
            var templates = await _templateRepository.GetAllAsync();
            var templateDict = templates.ToDictionary(t => t.Id, t => t);

            foreach (var templateId in templateIds)
            {
                if (!templateDict.ContainsKey(templateId))
                {
                    throw new ArgumentException($"Maintenance template with ID {templateId} does not exist");
                }

                if (templateDict[templateId].Archived)
                {
                    throw new ArgumentException($"Cannot assign archived maintenance template '{templateDict[templateId].Name}'");
                }
            }
        }

        // Create car entity
        var car = new Car
        {
            Name = dto.Name,
            CurrentKm = dto.CurrentKm,
            CreatedAt = DateTime.UtcNow
        };

        // Create maintenance item entities with calculated next service values
        var maintenanceItems = dto.MaintenanceItems.Select(mi => {
            var item = new CarMaintenanceItem
            {
                MaintenanceTemplateId = mi.MaintenanceTemplateId,
                IntervalValue = mi.IntervalValue,
                IntervalType = mi.IntervalType,
                LastServiceKm = mi.LastServiceKm,
                LastServiceDate = mi.LastServiceDate
            };

            // Calculate next service km/date based on interval type
            CalculateNextService(item);

            return item;
        }).ToList();

        // Assign maintenance items to car - EF Core will save both in a single transaction
        car.MaintenanceItems = maintenanceItems;

        // Save car (EF Core automatically saves related MaintenanceItems)
        var createdCar = await _carRepository.AddAsync(car);

        // Load navigation properties for response
        var carWithRelations = await _carRepository.GetByIdAsync(
            createdCar.Id,
            c => c.MaintenanceItems);

        if (carWithRelations != null && carWithRelations.MaintenanceItems.Any())
        {
            // Load all templates referenced by maintenance items in one query
            var itemTemplateIds = carWithRelations.MaintenanceItems.Select(mi => mi.MaintenanceTemplateId).Distinct();
            var templates = await _templateRepository.GetAllAsync(
                filter: t => itemTemplateIds.Contains(t.Id));
            var templateDict = templates.ToDictionary(t => t.Id);

            // Attach templates to maintenance items
            foreach (var item in carWithRelations.MaintenanceItems)
            {
                if (templateDict.TryGetValue(item.MaintenanceTemplateId, out var template))
                {
                    item.MaintenanceTemplate = template;
                }
            }
        }

        // Map to DTO and return
        return MapCarToDto(carWithRelations ?? createdCar);
    }

    public async Task<CarDto?> GetCarByIdAsync(int id)
    {
        var car = await _carRepository.GetByIdAsync(id, c => c.MaintenanceItems);
        
        if (car == null) return null;

        // Load templates for maintenance items
        if (car.MaintenanceItems.Any())
        {
            var templateIds = car.MaintenanceItems.Select(mi => mi.MaintenanceTemplateId).Distinct();
            var templates = await _templateRepository.GetAllAsync(
                filter: t => templateIds.Contains(t.Id));
            var templateDict = templates.ToDictionary(t => t.Id);

            foreach (var item in car.MaintenanceItems)
            {
                if (templateDict.TryGetValue(item.MaintenanceTemplateId, out var template))
                {
                    item.MaintenanceTemplate = template;
                }
            }
        }

        return MapCarToDto(car);
    }

    public async Task<List<CarDto>> GetAllCarsAsync()
    {
        var cars = await _carRepository.GetAllAsync(
            orderBy: q => q.OrderByDescending(c => c.CreatedAt),
            includes: c => c.MaintenanceItems);

        var carsList = cars.ToList();

        // Load all templates in one query
        var allTemplateIds = carsList
            .SelectMany(c => c.MaintenanceItems)
            .Select(mi => mi.MaintenanceTemplateId)
            .Distinct();

        if (allTemplateIds.Any())
        {
            var templates = await _templateRepository.GetAllAsync(
                filter: t => allTemplateIds.Contains(t.Id));
            var templateDict = templates.ToDictionary(t => t.Id);

            // Attach templates to all maintenance items
            foreach (var car in carsList)
            {
                foreach (var item in car.MaintenanceItems)
                {
                    if (templateDict.TryGetValue(item.MaintenanceTemplateId, out var template))
                    {
                        item.MaintenanceTemplate = template;
                    }
                }
            }
        }

        return carsList.Select(MapCarToDto).ToList();
    }

    public async Task<DashboardDto?> GetDashboardDataAsync(int carId)
    {
        var car = await _carRepository.GetByIdAsync(carId, c => c.MaintenanceItems);
        
        if (car == null) return null;

        // Load templates for maintenance items
        if (car.MaintenanceItems.Any())
        {
            var templateIds = car.MaintenanceItems.Select(mi => mi.MaintenanceTemplateId).Distinct();
            var templates = await _templateRepository.GetAllAsync(
                filter: t => templateIds.Contains(t.Id));
            var templateDict = templates.ToDictionary(t => t.Id);

            foreach (var item in car.MaintenanceItems)
            {
                if (templateDict.TryGetValue(item.MaintenanceTemplateId, out var template))
                {
                    item.MaintenanceTemplate = template;
                }
            }
        }

        return MapCarToDashboardDto(car);
    }

    /// <summary>
    /// Calculates the next service km or date based on interval type.
    /// </summary>
    private void CalculateNextService(CarMaintenanceItem item)
    {
        if (item.IntervalType == "km" && item.LastServiceKm.HasValue)
        {
            item.CalculatedNextKm = item.LastServiceKm.Value + item.IntervalValue;
            item.CalculatedNextDate = null;
        }
        else if (item.IntervalType == "time" && item.LastServiceDate.HasValue)
        {
            item.CalculatedNextDate = item.LastServiceDate.Value.AddDays(item.IntervalValue);
            item.CalculatedNextKm = null;
        }
        else
        {
            // If no last service data provided, leave calculated fields null
            item.CalculatedNextKm = null;
            item.CalculatedNextDate = null;
        }
    }

    /// <summary>
    /// Maps Car entity to CarDto.
    /// Filters out maintenance items with archived templates.
    /// </summary>
    private CarDto MapCarToDto(Car car)
    {
        return new CarDto
        {
            Id = car.Id,
            Name = car.Name,
            CurrentKm = car.CurrentKm,
            CreatedAt = car.CreatedAt,
            MaintenanceItems = car.MaintenanceItems
                .Where(mi => mi.MaintenanceTemplate != null && !mi.MaintenanceTemplate.Archived)
                .Select(mi => new CarMaintenanceItemDto
                {
                    Id = mi.Id,
                    MaintenanceTemplateId = mi.MaintenanceTemplateId,
                    TemplateName = mi.MaintenanceTemplate?.Name ?? string.Empty,
                    IntervalType = mi.IntervalType,
                    IntervalValue = mi.IntervalValue,
                    LastServiceKm = mi.LastServiceKm,
                    LastServiceDate = mi.LastServiceDate,
                    CalculatedNextKm = mi.CalculatedNextKm,
                    CalculatedNextDate = mi.CalculatedNextDate
                }).ToList()
        };
    }

    /// <summary>
    /// Maps Car entity to DashboardDto with calculated status for each maintenance item.
    /// Filters out maintenance items with archived templates.
    /// </summary>
    private DashboardDto MapCarToDashboardDto(Car car)
    {
        var today = DateTime.UtcNow.Date;

        return new DashboardDto
        {
            CarId = car.Id,
            CarName = car.Name,
            CurrentKm = car.CurrentKm,
            MaintenanceItems = car.MaintenanceItems
                .Where(mi => mi.MaintenanceTemplate != null && !mi.MaintenanceTemplate.Archived)
                .Select(mi =>
                {
                    var dashboardItem = new DashboardMaintenanceItemDto
                    {
                        Id = mi.Id,
                        TemplateName = mi.MaintenanceTemplate?.Name ?? string.Empty,
                        IntervalType = mi.IntervalType,
                        IntervalValue = mi.IntervalValue,
                        LastServiceKm = mi.LastServiceKm,
                        LastServiceDate = mi.LastServiceDate,
                        CalculatedNextKm = mi.CalculatedNextKm,
                        CalculatedNextDate = mi.CalculatedNextDate
                    };

                    // Calculate status based on interval type
                    if (mi.IntervalType == "km" && mi.CalculatedNextKm.HasValue)
                    {
                        dashboardItem.KmUntilDue = mi.CalculatedNextKm.Value - car.CurrentKm;
                        dashboardItem.DaysUntilDue = null;

                        if (dashboardItem.KmUntilDue < 0)
                        {
                            dashboardItem.Status = "Overdue";
                        }
                        else if (dashboardItem.KmUntilDue <= 300)
                        {
                            dashboardItem.Status = "DueSoon";
                        }
                        else
                        {
                            dashboardItem.Status = "OK";
                        }
                    }
                    else if (mi.IntervalType == "time" && mi.CalculatedNextDate.HasValue)
                    {
                        var daysUntilDue = (mi.CalculatedNextDate.Value.Date - today).TotalDays;
                        dashboardItem.DaysUntilDue = (int)Math.Round(daysUntilDue);
                        dashboardItem.KmUntilDue = null;

                        if (dashboardItem.DaysUntilDue < 0)
                        {
                            dashboardItem.Status = "Overdue";
                        }
                        else if (dashboardItem.DaysUntilDue <= 30)
                        {
                            dashboardItem.Status = "DueSoon";
                        }
                        else
                        {
                            dashboardItem.Status = "OK";
                        }
                    }
                    else
                    {
                        // If no calculated next service, status is unknown/OK
                        dashboardItem.Status = "OK";
                        dashboardItem.KmUntilDue = null;
                        dashboardItem.DaysUntilDue = null;
                    }

                    return dashboardItem;
                }).ToList()
        };
    }
}
