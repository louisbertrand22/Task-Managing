import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no outstanding requests are unmatched.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // You can add more specific tests here for getTasks, createTask, etc.
  // Example for getTasks (assuming it makes a GET request to /api/tasks)
  it('should retrieve tasks', () => {
    const dummyTasks = [
      { id: 1, title: 'Task 1', description: 'Desc 1', status: 0, priority: 0, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: 'Task 2', description: 'Desc 2', status: 1, priority: 1, createdAt: new Date(), updatedAt: new Date() }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpTestingController.expectOne('/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });
});
