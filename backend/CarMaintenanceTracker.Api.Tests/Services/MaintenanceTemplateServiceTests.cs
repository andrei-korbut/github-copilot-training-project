using CarMaintenanceTracker.Api.DTOs;
using CarMaintenanceTracker.Api.Entities;
using CarMaintenanceTracker.Api.Repositories;
using CarMaintenanceTracker.Api.Services;
using Moq;

namespace CarMaintenanceTracker.Api.Tests.Services;

public class MaintenanceTemplateServiceTests
{
    [Fact]
    public async Task CreateTemplateAsync_ValidDto_ReturnsCreatedTemplate()
    {
        // Arrange
        var mockRepo = new Mock<IMaintenanceTemplateRepository>();
        mockRepo.Setup(r => r.CreateAsync(It.IsAny<MaintenanceTemplate>()))
            .ReturnsAsync((MaintenanceTemplate t) => { t.Id = 1; return t; });
        
        var service = new MaintenanceTemplateService(mockRepo.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        var result = await service.CreateTemplateAsync(dto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Id);
        Assert.Equal("Oil Change", result.Name);
        Assert.Equal("km", result.IntervalType);
        Assert.Equal(10000, result.IntervalValue);
    }

    [Fact]
    public async Task CreateTemplateAsync_ValidDto_SetsArchivedToFalse()
    {
        // Arrange
        var mockRepo = new Mock<IMaintenanceTemplateRepository>();
        mockRepo.Setup(r => r.CreateAsync(It.IsAny<MaintenanceTemplate>()))
            .ReturnsAsync((MaintenanceTemplate t) => { t.Id = 1; return t; });
        
        var service = new MaintenanceTemplateService(mockRepo.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        var result = await service.CreateTemplateAsync(dto);

        // Assert
        Assert.False(result.Archived);
    }

    [Fact]
    public async Task CreateTemplateAsync_ValidDto_SetsCreatedAtToUtcNow()
    {
        // Arrange
        var mockRepo = new Mock<IMaintenanceTemplateRepository>();
        mockRepo.Setup(r => r.CreateAsync(It.IsAny<MaintenanceTemplate>()))
            .ReturnsAsync((MaintenanceTemplate t) => { t.Id = 1; return t; });
        
        var service = new MaintenanceTemplateService(mockRepo.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };
        var beforeTime = DateTime.UtcNow.AddSeconds(-1);

        // Act
        var result = await service.CreateTemplateAsync(dto);
        var afterTime = DateTime.UtcNow.AddSeconds(1);

        // Assert
        Assert.InRange(result.CreatedAt, beforeTime, afterTime);
    }

    [Fact]
    public async Task CreateTemplateAsync_IntervalTypeKm_CallsRepository()
    {
        // Arrange
        var mockRepo = new Mock<IMaintenanceTemplateRepository>();
        mockRepo.Setup(r => r.CreateAsync(It.IsAny<MaintenanceTemplate>()))
            .ReturnsAsync((MaintenanceTemplate t) => { t.Id = 1; return t; });
        
        var service = new MaintenanceTemplateService(mockRepo.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        await service.CreateTemplateAsync(dto);

        // Assert
        mockRepo.Verify(r => r.CreateAsync(It.Is<MaintenanceTemplate>(t =>
            t.Name == "Oil Change" &&
            t.IntervalType == "km" &&
            t.IntervalValue == 10000 &&
            t.Archived == false
        )), Times.Once);
    }

    [Fact]
    public async Task CreateTemplateAsync_IntervalTypeTime_CallsRepository()
    {
        // Arrange
        var mockRepo = new Mock<IMaintenanceTemplateRepository>();
        mockRepo.Setup(r => r.CreateAsync(It.IsAny<MaintenanceTemplate>()))
            .ReturnsAsync((MaintenanceTemplate t) => { t.Id = 1; return t; });
        
        var service = new MaintenanceTemplateService(mockRepo.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Air Filter",
            IntervalType = "time",
            IntervalValue = 365
        };

        // Act
        await service.CreateTemplateAsync(dto);

        // Assert
        mockRepo.Verify(r => r.CreateAsync(It.Is<MaintenanceTemplate>(t =>
            t.Name == "Air Filter" &&
            t.IntervalType == "time" &&
            t.IntervalValue == 365
        )), Times.Once);
    }

    [Fact]
    public async Task CreateTemplateAsync_InvalidIntervalType_ThrowsArgumentException()
    {
        // Arrange
        var mockRepo = new Mock<IMaintenanceTemplateRepository>();
        var service = new MaintenanceTemplateService(mockRepo.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "invalid",
            IntervalValue = 10000
        };

        // Act & Assert
        var exception = await Assert.ThrowsAsync<ArgumentException>(
            () => service.CreateTemplateAsync(dto)
        );
        Assert.Equal("Interval type must be 'km' or 'time'", exception.Message);
    }

    [Fact]
    public async Task CreateTemplateAsync_ValidDto_MapsAllProperties()
    {
        // Arrange
        MaintenanceTemplate? capturedEntity = null;
        var mockRepo = new Mock<IMaintenanceTemplateRepository>();
        mockRepo.Setup(r => r.CreateAsync(It.IsAny<MaintenanceTemplate>()))
            .Callback<MaintenanceTemplate>(t => capturedEntity = t)
            .ReturnsAsync((MaintenanceTemplate t) => { t.Id = 1; return t; });
        
        var service = new MaintenanceTemplateService(mockRepo.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        await service.CreateTemplateAsync(dto);

        // Assert
        Assert.NotNull(capturedEntity);
        Assert.Equal("Oil Change", capturedEntity.Name);
        Assert.Equal("km", capturedEntity.IntervalType);
        Assert.Equal(10000, capturedEntity.IntervalValue);
        Assert.False(capturedEntity.Archived);
        Assert.NotEqual(default(DateTime), capturedEntity.CreatedAt);
    }

    [Fact]
    public async Task CreateTemplateAsync_ValidDto_MapsEntityToResponseDto()
    {
        // Arrange
        var mockRepo = new Mock<IMaintenanceTemplateRepository>();
        mockRepo.Setup(r => r.CreateAsync(It.IsAny<MaintenanceTemplate>()))
            .ReturnsAsync((MaintenanceTemplate t) => 
            { 
                t.Id = 42;
                t.CreatedAt = new DateTime(2026, 2, 18, 10, 30, 0, DateTimeKind.Utc);
                return t; 
            });
        
        var service = new MaintenanceTemplateService(mockRepo.Object);
        var dto = new CreateMaintenanceTemplateDto
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        var result = await service.CreateTemplateAsync(dto);

        // Assert
        Assert.Equal(42, result.Id);
        Assert.Equal("Oil Change", result.Name);
        Assert.Equal("km", result.IntervalType);
        Assert.Equal(10000, result.IntervalValue);
        Assert.False(result.Archived);
        Assert.Equal(new DateTime(2026, 2, 18, 10, 30, 0, DateTimeKind.Utc), result.CreatedAt);
    }
}
