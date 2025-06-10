import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItem, TaskStatus, TaskPriority } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(filters?: any): Observable<TaskItem[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.title) {
        params = params.set('title', filters.title);
      }
      if (filters.status !== undefined && filters.status !== null) {
        params = params.set('status', filters.status.toString());
      }
      if (filters.priority !== undefined && filters.priority !== null) {
        params = params.set('priority', filters.priority.toString());
      }
      if (filters.sortBy) {
        params = params.set('sortBy', filters.sortBy);
      }
      if (filters.sortOrder) {
        params = params.set('sortOrder', filters.sortOrder);
      }
    }
    return this.http.get<TaskItem[]>(this.apiUrl, { params });
  }

  getTask(id: number): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Omit<TaskItem, 'id' | 'createdAt' | 'updatedAt'>): Observable<TaskItem> {
    const taskToSend = {
      ...task,
      status: Number(task.status),
      priority: Number(task.priority)
    };
    return this.http.post<TaskItem>(this.apiUrl, taskToSend);
  }

  updateTask(id: number, task: Partial<TaskItem>): Observable<TaskItem> {
    const taskToSend = {
      ...task,
      status: task.status !== undefined ? Number(task.status) : undefined,
      priority: task.priority !== undefined ? Number(task.priority) : undefined
    };
    return this.http.put<TaskItem>(`${this.apiUrl}/${id}`, taskToSend);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
