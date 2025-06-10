export enum TaskStatus {
    ToDo = 0,
    InProgress = 1,
    Done = 2
}

export enum TaskPriority {
    Low = 0,
    Medium = 1,
    High = 2
}

export interface TaskItem {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: Date;
    updatedAt: Date;
} 