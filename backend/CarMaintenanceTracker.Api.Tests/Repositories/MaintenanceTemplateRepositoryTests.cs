using CarMaintenanceTracker.Api.Data;
using CarMaintenanceTracker.Api.Entities;
using CarMaintenanceTracker.Api.Repositories;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace CarMaintenanceTracker.Api.Tests.Repositories;

public class MaintenanceTemplateRepositoryTests
{
    [Fact]
    public async Task CreateAsync_ValidTemplate_CallsDbContextAdd()
    {
        // Arrange
        var mockSet = new Mock<DbSet<MaintenanceTemplate>>();
        var mockContext = new Mock<AppDbContext>(new DbContextOptions<AppDbContext>());
        mockContext.Setup(m => m.MaintenanceTemplates).Returns(mockSet.Object);
        
        var repository = new MaintenanceTemplateRepository(mockContext.Object);
        var template = new MaintenanceTemplate
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        await repository.CreateAsync(template);

        // Assert
        mockSet.Verify(m => m.Add(It.Is<MaintenanceTemplate>(t => 
            t.Name == "Oil Change" && 
            t.IntervalType == "km" && 
            t.IntervalValue == 10000
        )), Times.Once);
    }

    [Fact]
    public async Task CreateAsync_ValidTemplate_CallsSaveChangesAsync()
    {
        // Arrange
        var mockSet = new Mock<DbSet<MaintenanceTemplate>>();
        var mockContext = new Mock<AppDbContext>(new DbContextOptions<AppDbContext>());
        mockContext.Setup(m => m.MaintenanceTemplates).Returns(mockSet.Object);
        mockContext.Setup(m => m.SaveChangesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(1);
        
        var repository = new MaintenanceTemplateRepository(mockContext.Object);
        var template = new MaintenanceTemplate
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        await repository.CreateAsync(template);

        // Assert
        mockContext.Verify(m => m.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task CreateAsync_ValidTemplate_ReturnsEntity()
    {
        // Arrange
        var mockSet = new Mock<DbSet<MaintenanceTemplate>>();
        var mockContext = new Mock<AppDbContext>(new DbContextOptions<AppDbContext>());
        mockContext.Setup(m => m.MaintenanceTemplates).Returns(mockSet.Object);
        mockContext.Setup(m => m.SaveChangesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(1);
        
        var repository = new MaintenanceTemplateRepository(mockContext.Object);
        var template = new MaintenanceTemplate
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        var result = await repository.CreateAsync(template);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Oil Change", result.Name);
        Assert.Equal("km", result.IntervalType);
        Assert.Equal(10000, result.IntervalValue);
    }
}
