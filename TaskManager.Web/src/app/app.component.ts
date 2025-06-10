import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Task Manager</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/tasks">
        <mat-icon>list</mat-icon>
        Tasks
      </button>
      <button mat-button routerLink="/tasks/new">
        <mat-icon>add</mat-icon>
        New Task
      </button>
    </mat-toolbar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .content {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  title = 'Task Manager';
} 