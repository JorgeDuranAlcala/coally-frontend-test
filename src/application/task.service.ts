import { Task } from '../context/TaskContext';
import { TaskRepository } from '../domains/ports/task-repository';

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  getTasks() {
    return this.taskRepository.getTasks();
  }

  getTaskById(id: string) {
    return this.taskRepository.getTaskById(id);
  }

  createTask(task: Omit<Task, 'id' |'createdAt'>) {
    return this.taskRepository.createTask(task);
  }

  updateTask(id: string, task: Partial<Task>) {
    return this.taskRepository.updateTask(id, task);
  }

  deleteTask(id: string) {
    return this.taskRepository.deleteTask(id);
  }
}
