import { Task } from '../../context/TaskContext';

export interface TaskRepository {
  getTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
  createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task>;
  updateTask(id: string, task: Partial<Task>): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}
