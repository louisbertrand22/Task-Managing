import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { TaskStatus, TaskPriority } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule
  ]
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: number | null = null;
  statusOptions = Object.keys(TaskStatus)
    .filter(k => isNaN(Number(k)))
    .map(label => ({ label, value: TaskStatus[label as keyof typeof TaskStatus] }));
  priorityOptions = Object.keys(TaskPriority)
    .filter(k => isNaN(Number(k)))
    .map(label => ({ label, value: TaskPriority[label as keyof typeof TaskPriority] }));
  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [TaskStatus.ToDo, Validators.required],
      priority: [TaskPriority.Medium, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: number): void {
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
      },
      error: (error) => {
        this.snackBar.open('Error loading task', 'Close', { duration: 3000 });
        console.error('Error loading task:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      if (this.isEditMode && this.taskId) {
        task.id = this.taskId;
      }
      const operation = this.isEditMode
        ? this.taskService.updateTask(this.taskId!, task)
        : this.taskService.createTask(task);

      operation.subscribe({
        next: () => {
          this.snackBar.open(`Task ${this.isEditMode ? 'updated' : 'created'} successfully`, 'Close', { duration: 3000 });
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.snackBar.open(`Error ${this.isEditMode ? 'updating' : 'creating'} task`, 'Close', { duration: 3000 });
          console.error(`Error ${this.isEditMode ? 'updating' : 'creating'} task:`, error);
        }
      });
    }
  }
} 