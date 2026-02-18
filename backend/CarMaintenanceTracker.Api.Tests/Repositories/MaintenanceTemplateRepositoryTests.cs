using CarMaintenanceTracker.Api.Data;
using CarMaintenanceTracker.Api.Entities;
using CarMaintenanceTracker.Api.Repositories;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace CarMaintenanceTracker.Api.Tests.Repositories;

public class RepositoryTests
{
    [Fact]
    public async Task AddAsync_ValidTemplate_CallsDbContextAdd()
    {
        // Arrange
        var mockSet = new Mock<DbSet<MaintenanceTemplate>>();
        var mockContext = new Mock<AppDbContext>(new DbContextOptions<AppDbContext>());
        mockContext.Setup(m => m.Set<MaintenanceTemplate>()).Returns(mockSet.Object);
        
        var repository = new Repository<MaintenanceTemplate>(mockContext.Object);
        var template = new MaintenanceTemplate
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        await repository.AddAsync(template);

        // Assert
        mockSet.Verify(m => m.Add(It.Is<MaintenanceTemplate>(t => 
            t.Name == "Oil Change" && 
            t.IntervalType == "km" && 
            t.IntervalValue == 10000
        )), Times.Once);
    }

    [Fact]
    public async Task AddAsync_ValidTemplate_CallsSaveChangesAsync()
    {
        // Arrange
        var mockSet = new Mock<DbSet<MaintenanceTemplate>>();
        var mockContext = new Mock<AppDbContext>(new DbContextOptions<AppDbContext>());
        mockContext.Setup(m => m.Set<MaintenanceTemplate>()).Returns(mockSet.Object);
        mockContext.Setup(m => m.SaveChangesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(1);
        
        var repository = new Repository<MaintenanceTemplate>(mockContext.Object);
        var template = new MaintenanceTemplate
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        await repository.AddAsync(template);

        // Assert
        mockContext.Verify(m => m.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task AddAsync_ValidTemplate_ReturnsEntity()
    {
        // Arrange
        var mockSet = new Mock<DbSet<MaintenanceTemplate>>();
        var mockContext = new Mock<AppDbContext>(new DbContextOptions<AppDbContext>());
        mockContext.Setup(m => m.Set<MaintenanceTemplate>()).Returns(mockSet.Object);
        mockContext.Setup(m => m.SaveChangesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(1);
        
        var repository = new Repository<MaintenanceTemplate>(mockContext.Object);
        var template = new MaintenanceTemplate
        {
            Name = "Oil Change",
            IntervalType = "km",
            IntervalValue = 10000
        };

        // Act
        var result = await repository.AddAsync(template);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Oil Change", result.Name);
        Assert.Equal("km", result.IntervalType);
        Assert.Equal(10000, result.IntervalValue);
    }

    [Fact]
    public async Task GetAllAsync_WithOrderBy_ReturnsSortedByCreatedAtDescending()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_GetAllAsync_Sorted")
            .Options;

        using (var context = new AppDbContext(options))
        {
            var template1 = new MaintenanceTemplate
            {
                Name = "Template 1",
                IntervalType = "km",
                IntervalValue = 5000,
                CreatedAt = new DateTime(2026, 1, 1, 10, 0, 0, DateTimeKind.Utc)
            };
            var template2 = new MaintenanceTemplate
            {
                Name = "Template 2",
                IntervalType = "time",
                IntervalValue = 365,
                CreatedAt = new DateTime(2026, 2, 1, 10, 0, 0, DateTimeKind.Utc)
            };
            var template3 = new MaintenanceTemplate
            {
                Name = "Template 3",
                IntervalType = "km",
                IntervalValue = 15000,
                CreatedAt = new DateTime(2026, 1, 15, 10, 0, 0, DateTimeKind.Utc)
            };

            context.MaintenanceTemplates.AddRange(template1, template2, template3);
            await context.SaveChangesAsync();
        }

        using (var context = new AppDbContext(options))
        {
            var repository = new Repository<MaintenanceTemplate>(context);

            // Act
            var result = (await repository.GetAllAsync(
                filter: null,
                orderBy: q => q.OrderByDescending(t => t.CreatedAt)
            )).ToList();

            // Assert
            Assert.Equal(3, result.Count);
            Assert.Equal("Template 2", result[0].Name); // Most recent
            Assert.Equal("Template 3", result[1].Name); // Middle
            Assert.Equal("Template 1", result[2].Name); // Oldest
        }
    }

    [Fact]
    public async Task GetAllAsync_WithFilter_ReturnsFilteredResults()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_GetAllAsync_Filter")
            .Options;

        using (var context = new AppDbContext(options))
        {
            context.MaintenanceTemplates.AddRange(
                new MaintenanceTemplate { Name = "Active 1", IntervalType = "km", IntervalValue = 5000, Archived = false, CreatedAt = DateTime.UtcNow },
                new MaintenanceTemplate { Name = "Archived 1", IntervalType = "km", IntervalValue = 5000, Archived = true, CreatedAt = DateTime.UtcNow },
                new MaintenanceTemplate { Name = "Active 2", IntervalType = "time", IntervalValue = 365, Archived = false, CreatedAt = DateTime.UtcNow }
            );
            await context.SaveChangesAsync();
        }

        using (var context = new AppDbContext(options))
        {
            var repository = new Repository<MaintenanceTemplate>(context);

            // Act
            var result = (await repository.GetAllAsync(
                filter: t => !t.Archived,
                orderBy: null
            )).ToList();

            // Assert
            Assert.Equal(2, result.Count);
            Assert.All(result, t => Assert.False(t.Archived));
        }
    }

    [Fact]
    public async Task GetAllAsync_EmptyDatabase_ReturnsEmptyList()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb_GetAllAsync_Empty")
            .Options;

        using (var context = new AppDbContext(options))
        {
            var repository = new Repository<MaintenanceTemplate>(context);

            // Act
            var result = await repository.GetAllAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Empty(result);
        }
    }
}
