// src/presentation/presenters/TaskPresenter.ts

import { TaskUseCase } from "@/application/ports/input/useCases/TaskManagement/TaskUseCase";
import { TaskViewModel } from "../viewModels/TaskViewModel";
import { CreateTaskDTO } from "@/application/ports/input/ITaskInput";

export class TaskPresenter {
  constructor(private taskUseCase: TaskUseCase) {}

  async getTasks(): Promise<TaskViewModel[]> {
    try {
      const tasks = await this.taskUseCase.getTasks();
      return tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt.toLocaleDateString(),
        isLoading: false,
      }));
    } catch (error) {
      throw new Error(`Failed to fetch tasks: ${error}`);
    }
  }

  async createTask(data: CreateTaskDTO): Promise<TaskViewModel> {
    try {
      const task = await this.taskUseCase.createTask(data);
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt.toLocaleDateString(),
        isLoading: false,
      };
    } catch (error) {
      throw new Error(`Failed to create task: ${error}`);
    }
  }

  async completeTask(id: string): Promise<TaskViewModel> {
    try {
      const task = await this.taskUseCase.completeTask(id);
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt.toLocaleDateString(),
        isLoading: false,
      };
    } catch (error) {
      throw new Error(`Failed to complete task: ${error}`);
    }
  }
}
