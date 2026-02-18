using CarMaintenanceTracker.Api.DTOs;
using CarMaintenanceTracker.Api.Entities;
using CarMaintenanceTracker.Api.Repositories;

namespace CarMaintenanceTracker.Api.Services;

public class MaintenanceTemplateService : IMaintenanceTemplateService
{
    private readonly IRepository<MaintenanceTemplate> _repository;

    public MaintenanceTemplateService(IRepository<MaintenanceTemplate> repository)
    {
        _repository = repository;
    }

    public async Task<List<MaintenanceTemplateDto>> GetAllTemplatesAsync()
    {
        var templates = await _repository.GetAllAsync(
            filter: null,
            orderBy: q => q.OrderByDescending(t => t.CreatedAt)
        );
        
        return templates.Select(t => new MaintenanceTemplateDto
        {
            Id = t.Id,
            Name = t.Name,
            IntervalType = t.IntervalType,
            IntervalValue = t.IntervalValue,
            Archived = t.Archived,
            CreatedAt = t.CreatedAt
        }).ToList();
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

    public async Task<MaintenanceTemplateDto?> UpdateTemplateAsync(int id, UpdateMaintenanceTemplateDto dto)
    {
        // Check if template exists
        var existingTemplate = await _repository.GetByIdAsync(id);
        if (existingTemplate == null)
        {
            return null;
        }

        // Validate interval type
        if (dto.IntervalType != "km" && dto.IntervalType != "time")
        {
            throw new ArgumentException("Interval type must be 'km' or 'time'");
        }

        // Update entity properties (preserve CreatedAt)
        existingTemplate.Name = dto.Name;
        existingTemplate.IntervalType = dto.IntervalType;
        existingTemplate.IntervalValue = dto.IntervalValue;
        existingTemplate.Archived = dto.Archived;

        // Save to database
        var updatedTemplate = await _repository.UpdateAsync(existingTemplate);

        // Map Entity to Response DTO
        return new MaintenanceTemplateDto
        {
            Id = updatedTemplate.Id,
            Name = updatedTemplate.Name,
            IntervalType = updatedTemplate.IntervalType,
            IntervalValue = updatedTemplate.IntervalValue,
            Archived = updatedTemplate.Archived,
            CreatedAt = updatedTemplate.CreatedAt
        };
    }
}
