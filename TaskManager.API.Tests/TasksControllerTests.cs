using Xunit;
using Moq;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using TaskManager.API.Controllers;
using TaskManager.API.Data;
using TaskManager.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.API.Tests
{
    public class TasksControllerTests
    {
        private ApplicationDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString())
                .Options;
            var context = new ApplicationDbContext(options);
            return context;
        }

        [Fact]
        public async Task GetTasks_ReturnsAllTasks()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            context.Tasks.Add(new TaskItem { Id = 1, Title = "Test Task 1", CreatedAt = System.DateTime.UtcNow });
            context.Tasks.Add(new TaskItem { Id = 2, Title = "Test Task 2", CreatedAt = System.DateTime.UtcNow });
            await context.SaveChangesAsync();

            var mockLogger = new Mock<ILogger<TasksController>>();
            var controller = new TasksController(context, mockLogger.Object);

            // Act
            var result = await controller.GetTasks(null, null, null, null, null);

            // Assert
            var tasks = Assert.IsType<List<TaskItem>>(result.Value);
            Assert.Equal(2, tasks.Count);
            Assert.Equal("Test Task 1", tasks[0].Title);
            Assert.Equal("Test Task 2", tasks[1].Title);

            context.Database.EnsureDeleted();
        }
    }
} 