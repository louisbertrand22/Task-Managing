import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { TaskItem, TaskStatus, TaskPriority } from '../../models/task.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterModule
  ]
})
export class TaskDetailsComponent implements OnInit {
  task: TaskItem | null = null;
  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTask(+id);
    }
  }

  loadTask(id: number): void {
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.task = task;
      },
      error: (error) => {
        this.snackBar.open('Error loading task', 'Close', { duration: 3000 });
        console.error('Error loading task:', error);
      }
    });
  }

  editTask(): void {
    if (this.task) {
      this.router.navigate(['/tasks', this.task.id, 'edit']);
    }
  }

  deleteTask(): void {
    if (this.task) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.taskService.deleteTask(this.task.id).subscribe({
          next: () => {
            this.snackBar.open('Task deleted successfully', 'Close', { duration: 3000 });
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            this.snackBar.open('Error deleting task', 'Close', { duration: 3000 });
            console.error('Error deleting task:', error);
          }
        });
      }
    }
  }
} 