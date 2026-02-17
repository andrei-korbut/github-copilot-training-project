using CarMaintenanceTracker.Api.DTOs;
using CarMaintenanceTracker.Api.Entities;
using CarMaintenanceTracker.Api.Repositories;

namespace CarMaintenanceTracker.Api.Services;

public class MaintenanceTemplateService : IMaintenanceTemplateService
{
    private readonly IMaintenanceTemplateRepository _repository;

    public MaintenanceTemplateService(IMaintenanceTemplateRepository repository)
    {
        _repository = repository;
    }

    public async Task<MaintenanceTemplateDto> CreateTemplateAsync(CreateMaintenanceTemplateDto dto)
    {
        // Validate interval type
        if (dto.IntervalType != "km" && dto.IntervalType != "time")
        {
            throw new ArgumentException("Interval type must be 'km' or 'time'");
        }

        // Map DTO to Entity
        var template = new MaintenanceTemplate
        {
            Name = dto.Name,
            IntervalType = dto.IntervalType,
            IntervalValue = dto.IntervalValue,
            Archived = false,
            CreatedAt = DateTime.UtcNow
        };

        // Save to database
        var createdTemplate = await _repository.AddAsync(template);

        // Map Entity to Response DTO
        return new MaintenanceTemplateDto
        {
            Id = createdTemplate.Id,
            Name = createdTemplate.Name,
            IntervalType = createdTemplate.IntervalType,
            IntervalValue = createdTemplate.IntervalValue,
            Archived = createdTemplate.Archived,
            CreatedAt = createdTemplate.CreatedAt
        };
    }
}
