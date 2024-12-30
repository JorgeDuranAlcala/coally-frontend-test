import { Task } from '../../context/TaskContext';
import { TaskRepository } from '../../domains/ports/task-repository';
import axiosInstance from '../http/axios-instance';

export class TaskApiRepository implements TaskRepository {
  async getTasks(): Promise<Task[]> {
    let baseUri = '/api/v1/tasks'
    const userId = localStorage.getItem('userId')
    if (userId) {
        baseUri += '?userId=' + userId
    }
    const { data } = await axiosInstance.get(baseUri);
    return data.tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const { data } = await axiosInstance.get(`/api/v1/tasks/${id}`);
    return data;
  }

  async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const { data } = await axiosInstance.post('/api/v1/tasks', task);
    return data.task;
  }

  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    const { data } = await axiosInstance.put(`/api/v1/tasks/${id}`, task);
    return data;
  }

  async deleteTask(id: string): Promise<void> {
    await axiosInstance.delete(`/api/v1/tasks/${id}`);
  }
}
