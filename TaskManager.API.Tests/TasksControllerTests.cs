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
            context.Tasks.Add(new TaskItem { Id = 1, Title = "Test Task 1", Description = "" , CreatedAt = System.DateTime.UtcNow });
            context.Tasks.Add(new TaskItem { Id = 2, Title = "Test Task 2", Description = "" , CreatedAt = System.DateTime.UtcNow });
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

        [Fact]
        public async Task GetTask_ReturnsTask_WhenTaskExists()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var task = new TaskItem { Id = 1, Title = "Test Task", Description = "" , CreatedAt = System.DateTime.UtcNow };
            context.Tasks.Add(task);
            await context.SaveChangesAsync();

            var mockLogger = new Mock<ILogger<TasksController>>();
            var controller = new TasksController(context, mockLogger.Object);

            // Act
            var result = await controller.GetTask(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedTask = Assert.IsType<TaskItem>(okResult.Value);
            Assert.Equal(1, returnedTask.Id);
            Assert.Equal("Test Task", returnedTask.Title);

            context.Database.EnsureDeleted();
        }

        [Fact]
        public async Task GetTask_ReturnsNotFound_WhenTaskDoesNotExist()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var mockLogger = new Mock<ILogger<TasksController>>();
            var controller = new TasksController(context, mockLogger.Object);

            // Act
            var result = await controller.GetTask(99);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);

            context.Database.EnsureDeleted();
        }

        [Fact]
        public async Task CreateTask_CreatesAndReturnsNewTask()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var mockLogger = new Mock<ILogger<TasksController>>();
            var controller = new TasksController(context, mockLogger.Object);
            var newTask = new TaskItem { Title = "New Task", Description = "Description", Status = TaskManager.API.Models.TaskStatus.Todo, Priority = TaskManager.API.Models.TaskPriority.Medium };

            // Act
            var result = await controller.CreateTask(newTask);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var returnedTask = Assert.IsType<TaskItem>(createdAtActionResult.Value);
            Assert.Equal("New Task", returnedTask.Title);
            Assert.NotEqual(0, returnedTask.Id); // ID should be generated

            var taskInDb = await context.Tasks.FindAsync(returnedTask.Id);
            Assert.NotNull(taskInDb);
            Assert.Equal("New Task", taskInDb.Title);

            context.Database.EnsureDeleted();
        }

        [Fact]
        public async Task UpdateTask_UpdatesExistingTask()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var existingTask = new TaskItem { Id = 1, Title = "Original Title", Description = "" , CreatedAt = System.DateTime.UtcNow };
            context.Tasks.Add(existingTask);
            await context.SaveChangesAsync();

            var mockLogger = new Mock<ILogger<TasksController>>();
            var controller = new TasksController(context, mockLogger.Object);

            var updatedTask = new TaskItem { Id = 1, Title = "Updated Title", Description = "New Desc", Status = TaskManager.API.Models.TaskStatus.Done, Priority = TaskManager.API.Models.TaskPriority.High };

            // Act
            var result = await controller.UpdateTask(1, updatedTask);

            // Assert
            Assert.IsType<NoContentResult>(result);

            var taskInDb = await context.Tasks.FindAsync(1);
            Assert.NotNull(taskInDb);
            Assert.Equal("Updated Title", taskInDb.Title);
            Assert.Equal("New Desc", taskInDb.Description);

            context.Database.EnsureDeleted();
        }

        [Fact]
        public async Task UpdateTask_ReturnsNotFound_WhenTaskDoesNotExist()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var mockLogger = new Mock<ILogger<TasksController>>();
            var controller = new TasksController(context, mockLogger.Object);
            var updatedTask = new TaskItem { Id = 99, Title = "Non Existent", Description = "" , CreatedAt = System.DateTime.UtcNow };

            // Act
            var result = await controller.UpdateTask(99, updatedTask);

            // Assert
            Assert.IsType<NotFoundResult>(result);

            context.Database.EnsureDeleted();
        }

        [Fact]
        public async Task UpdateTask_ReturnsBadRequest_WhenIdMismatch()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var mockLogger = new Mock<ILogger<TasksController>>();
            var controller = new TasksController(context, mockLogger.Object);
            var updatedTask = new TaskItem { Id = 1, Title = "Mismatch", Description = "" , CreatedAt = System.DateTime.UtcNow };

            // Act
            var result = await controller.UpdateTask(2, updatedTask); // ID in route (2) doesn't match ID in body (1)

            // Assert
            Assert.IsType<BadRequestResult>(result);

            context.Database.EnsureDeleted();
        }

        [Fact]
        public async Task DeleteTask_DeletesExistingTask()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var taskToDelete = new TaskItem { Id = 1, Title = "To Delete", Description = "" , CreatedAt = System.DateTime.UtcNow };
            context.Tasks.Add(taskToDelete);
            await context.SaveChangesAsync();

            var mockLogger = new Mock<ILogger<TasksController>>();
            var controller = new TasksController(context, mockLogger.Object);

            // Act
            var result = await controller.DeleteTask(1);

            // Assert
            Assert.IsType<NoContentResult>(result);

            var taskInDb = await context.Tasks.FindAsync(1);
            Assert.Null(taskInDb); // Task should be deleted

            context.Database.EnsureDeleted();
        }

        [Fact]
        public async Task DeleteTask_ReturnsNotFound_WhenTaskDoesNotExist()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var mockLogger = new Mock<ILogger<TasksController>>();
            var controller = new TasksController(context, mockLogger.Object);

            // Act
            var result = await controller.DeleteTask(99);

            // Assert
            Assert.IsType<NotFoundResult>(result);

            context.Database.EnsureDeleted();
        }
    }
} 