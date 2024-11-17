// src/infrastructure/repositories/TaskRepositoryImpl.ts

import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { TaskApi } from "../api/TaskApi";

export class TaskRepositoryImpl implements ITaskRepository {
  constructor(private api: TaskApi) {}

  async getAll(): Promise<Task[]> {
    const tasksData = await this.api.getTasks();
    return tasksData.map(
      (data) =>
        new Task(
          data.id.toString(),
          data.title,
          "", // JSONPlaceholder doesn't have description
          data.completed,
          new Date(), // Using current date as JSONPlaceholder doesn't provide creation date
        ),
    );
  }

  async getById(id: string): Promise<Task | null> {
    try {
      const data = await this.api.getTask(id);
      return new Task(
        data.id.toString(),
        data.title,
        "",
        data.completed,
        new Date(),
      );
    } catch {
      return null;
    }
  }

  async save(task: Task): Promise<void> {
    await this.api.createTask({
      title: task.getTitle(),
      description: task.getDescription(),
    });
  }

  async update(task: Task): Promise<void> {
    await this.api.updateTask(task.getId(), {
      completed: task.isComplete(),
    });
  }

  async delete(id: string): Promise<void> {
    // Implementation not needed for this demo
  }
}
