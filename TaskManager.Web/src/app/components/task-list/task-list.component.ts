import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';
import { TaskItem, TaskStatus, TaskPriority } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DatePipe
  ]
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  displayedColumns: string[] = ['title', 'status', 'priority', 'createdAt', 'actions'];
  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  filterTitle: string = '';
  filterStatus: TaskStatus | null = null;
  filterPriority: TaskPriority | null = null;
  sortBy: string = 'createdAt_desc';

  statusOptions = Object.keys(TaskStatus).filter(key => isNaN(Number(key))).map(key => ({value: TaskStatus[key as keyof typeof TaskStatus], viewValue: key}));
  priorityOptions = Object.keys(TaskPriority).filter(key => isNaN(Number(key))).map(key => ({value: TaskPriority[key as keyof typeof TaskPriority], viewValue: key}));

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.applyFiltersAndSort();
  }

  loadTasks(filters?: any): void {
    this.taskService.getTasks(filters).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        this.snackBar.open('Error loading tasks', 'Close', { duration: 3000 });
        console.error('Error loading tasks:', error);
      }
    });
  }

  applyFiltersAndSort(): void {
    const filters: any = {};
    if (this.filterTitle) {
      filters.title = this.filterTitle;
    }
    if (this.filterStatus !== null) {
      filters.status = Number(this.filterStatus);
    }
    if (this.filterPriority !== null) {
      filters.priority = Number(this.filterPriority);
    }

    const [sortField, sortOrder] = this.sortBy.split('_');
    if (sortField && sortOrder) {
      filters.sortBy = sortField;
      filters.sortOrder = sortOrder;
    }

    this.loadTasks(filters);
  }

  resetFilters(): void {
    this.filterTitle = '';
    this.filterStatus = null;
    this.filterPriority = null;
    this.sortBy = 'createdAt_desc';
    this.applyFiltersAndSort();
  }

  onFilterChange(): void {
    this.applyFiltersAndSort();
  }

  onSortChange(): void {
    this.applyFiltersAndSort();
  }

  createTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  viewTask(id: number): void {
    this.router.navigate(['/tasks', id]);
  }

  editTask(id: number): void {
    this.router.navigate(['/tasks', id, 'edit']);
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.applyFiltersAndSort();
          this.snackBar.open('Task deleted successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Error deleting task', 'Close', { duration: 3000 });
          console.error('Error deleting task:', error);
        }
      });
    }
  }
} 