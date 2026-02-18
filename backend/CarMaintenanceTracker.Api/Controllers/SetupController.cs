using CarMaintenanceTracker.Api.DTOs;
using CarMaintenanceTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarMaintenanceTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SetupController : ControllerBase
{
    private readonly IMaintenanceTemplateService _service;
    private readonly ILogger<SetupController> _logger;

    public SetupController(IMaintenanceTemplateService service, ILogger<SetupController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllMaintenanceTemplates()
    {
        try
        {
            var templates = await _service.GetAllTemplatesAsync();
            return Ok(templates);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving maintenance templates");
            return StatusCode(500, new { error = "An error occurred while retrieving maintenance templates" });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateMaintenanceTemplate([FromBody] CreateMaintenanceTemplateDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdTemplate = await _service.CreateTemplateAsync(dto);

            return CreatedAtAction(
                nameof(CreateMaintenanceTemplate),
                new { id = createdTemplate.Id },
                createdTemplate);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Validation error while creating maintenance template");
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating maintenance template");
            return StatusCode(500, new { error = "An error occurred while creating the maintenance template" });
        }
    }
}
