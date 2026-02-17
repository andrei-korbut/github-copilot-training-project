using CarMaintenanceTracker.Api.Controllers;
using CarMaintenanceTracker.Api.DTOs;
using CarMaintenanceTracker.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace CarMaintenanceTracker.Api.Tests.Controllers;

public class SetupControllerTests
{
    [Fact]
    public async Task CreateMaintenanceTemplate_ValidRequest_Returns201Created()
    {
        // Arrange
        var mockService = new Mock<IMaintenanceTemplateService>();
        var mockLogger = new Mock<ILogger<SetupController>>();
        mockService.Setup(s => s.CreateTemplateAsync(It.IsAny<CreateMaintenanceTemplateDto>()))
            .ReturnsAsync(new MaintenanceTemplateDto { Id = 1, Name = "Oil Change", IntervalType = "km", IntervalValue = 10000 });
        
        var controller = new SetupController(mockService.Object, mockLogger.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        var result = await controller.CreateMaintenanceTemplate(dto);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result);
        Assert.Equal(201, createdResult.StatusCode);
    }

    [Fact]
    public async Task CreateMaintenanceTemplate_ValidRequest_ReturnsCreatedDto()
    {
        // Arrange
        var mockService = new Mock<IMaintenanceTemplateService>();
        var mockLogger = new Mock<ILogger<SetupController>>();
        var expectedDto = new MaintenanceTemplateDto 
        { 
            Id = 1, 
            Name = "Oil Change", 
            IntervalType = "km", 
            IntervalValue = 10000,
            Archived = false,
            CreatedAt = DateTime.UtcNow
        };
        mockService.Setup(s => s.CreateTemplateAsync(It.IsAny<CreateMaintenanceTemplateDto>()))
            .ReturnsAsync(expectedDto);
        
        var controller = new SetupController(mockService.Object, mockLogger.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        var result = await controller.CreateMaintenanceTemplate(dto);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result);
        var returnedDto = Assert.IsType<MaintenanceTemplateDto>(createdResult.Value);
        Assert.Equal(1, returnedDto.Id);
        Assert.Equal("Oil Change", returnedDto.Name);
    }

    [Fact]
    public async Task CreateMaintenanceTemplate_ValidRequest_ReturnsLocationHeader()
    {
        // Arrange
        var mockService = new Mock<IMaintenanceTemplateService>();
        var mockLogger = new Mock<ILogger<SetupController>>();
        mockService.Setup(s => s.CreateTemplateAsync(It.IsAny<CreateMaintenanceTemplateDto>()))
            .ReturnsAsync(new MaintenanceTemplateDto { Id = 1, Name = "Oil Change", IntervalType = "km", IntervalValue = 10000 });
        
        var controller = new SetupController(mockService.Object, mockLogger.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        var result = await controller.CreateMaintenanceTemplate(dto);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result);
        Assert.Equal("CreateMaintenanceTemplate", createdResult.ActionName);
        Assert.NotNull(createdResult.RouteValues);
        Assert.Equal(1, createdResult.RouteValues["id"]);
    }

    [Fact]
    public async Task CreateMaintenanceTemplate_MissingName_Returns400BadRequest()
    {
        // Arrange
        var mockService = new Mock<IMaintenanceTemplateService>();
        var mockLogger = new Mock<ILogger<SetupController>>();
        var controller = new SetupController(mockService.Object, mockLogger.Object);
        
        // Simulate model validation error
        controller.ModelState.AddModelError("Name", "Name is obligatory field");
        
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        var result = await controller.CreateMaintenanceTemplate(dto);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(400, badRequestResult.StatusCode);
    }

    [Fact]
    public async Task CreateMaintenanceTemplate_MissingIntervalType_Returns400BadRequest()
    {
        // Arrange
        var mockService = new Mock<IMaintenanceTemplateService>();
        var mockLogger = new Mock<ILogger<SetupController>>();
        var controller = new SetupController(mockService.Object, mockLogger.Object);
        
        controller.ModelState.AddModelError("IntervalType", "Interval type is obligatory field");
        
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "",
            IntervalValue = 10000
        };

        // Act
        var result = await controller.CreateMaintenanceTemplate(dto);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(400, badRequestResult.StatusCode);
    }

    [Fact]
    public async Task CreateMaintenanceTemplate_MissingIntervalValue_Returns400BadRequest()
    {
        // Arrange
        var mockService = new Mock<IMaintenanceTemplateService>();
        var mockLogger = new Mock<ILogger<SetupController>>();
        var controller = new SetupController(mockService.Object, mockLogger.Object);
        
        controller.ModelState.AddModelError("IntervalValue", "Interval value is obligatory field");
        
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 0
        };

        // Act
        var result = await controller.CreateMaintenanceTemplate(dto);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(400, badRequestResult.StatusCode);
    }

    [Fact]
    public async Task CreateMaintenanceTemplate_InvalidIntervalValue_Returns400BadRequest()
    {
        // Arrange
        var mockService = new Mock<IMaintenanceTemplateService>();
        var mockLogger = new Mock<ILogger<SetupController>>();
        var controller = new SetupController(mockService.Object, mockLogger.Object);
        
        controller.ModelState.AddModelError("IntervalValue", "Interval value must be greater than 0");
        
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = -100
        };

        // Act
        var result = await controller.CreateMaintenanceTemplate(dto);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(400, badRequestResult.StatusCode);
    }

    [Fact]
    public async Task CreateMaintenanceTemplate_InvalidIntervalType_Returns400BadRequest()
    {
        // Arrange
        var mockService = new Mock<IMaintenanceTemplateService>();
        var mockLogger = new Mock<ILogger<SetupController>>();
        mockService.Setup(s => s.CreateTemplateAsync(It.IsAny<CreateMaintenanceTemplateDto>()))
            .ThrowsAsync(new ArgumentException("Interval type must be 'km' or 'time'"));
        
        var controller = new SetupController(mockService.Object, mockLogger.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Test Template",
            IntervalType = "invalid",
            IntervalValue = 10000
        };

        // Act
        var result = await controller.CreateMaintenanceTemplate(dto);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(400, badRequestResult.StatusCode);
    }

    [Fact]
    public async Task CreateMaintenanceTemplate_ServiceThrowsException_Returns500InternalServerError()
    {
        // Arrange
        var mockService = new Mock<IMaintenanceTemplateService>();
        var mockLogger = new Mock<ILogger<SetupController>>();
        mockService.Setup(s => s.CreateTemplateAsync(It.IsAny<CreateMaintenanceTemplateDto>()))
            .ThrowsAsync(new Exception("Database connection failed"));
        
        var controller = new SetupController(mockService.Object, mockLogger.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        var result = await controller.CreateMaintenanceTemplate(dto);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
    }

    [Fact]
    public async Task CreateMaintenanceTemplate_InvalidModelState_Returns400WithErrors()
    {
        // Arrange
        var mockService = new Mock<IMaintenanceTemplateService>();
        var mockLogger = new Mock<ILogger<SetupController>>();
        var controller = new SetupController(mockService.Object, mockLogger.Object);
        
        controller.ModelState.AddModelError("Name", "Name is obligatory field");
        controller.ModelState.AddModelError("IntervalType", "Interval type is obligatory field");
        
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "",
            IntervalType = "",
            IntervalValue = 10000
        };

        // Act
        var result = await controller.CreateMaintenanceTemplate(dto);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(400, badRequestResult.StatusCode);
        var modelState = Assert.IsAssignableFrom<SerializableError>(badRequestResult.Value);
        Assert.True(modelState.ContainsKey("Name"));
        Assert.True(modelState.ContainsKey("IntervalType"));
    }
}
