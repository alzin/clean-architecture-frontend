// src/application/useCases/TaskManagement/TaskUseCase.ts

import { ITaskRepository } from "../../../../../domain/repositories/ITaskRepository";
import { TaskDTO } from "../../ITaskOutput";
import { Task } from "../../../../../domain/entities/Task";
import { CreateTaskDTO } from "../../ITaskInput";

export class TaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async createTask(createTaskDTO: CreateTaskDTO): Promise<TaskDTO> {
    const task = new Task(
      Date.now().toString(),
      createTaskDTO.title,
      createTaskDTO.description,
    );

    await this.taskRepository.save(task);

    return this.mapToDTO(task);
  }

  async completeTask(id: string): Promise<TaskDTO> {
    const task = await this.taskRepository.getById(id);
    if (!task) {
      throw new Error("Task not found");
    }

    task.complete();
    await this.taskRepository.update(task);

    return this.mapToDTO(task);
  }

  async getTasks(): Promise<TaskDTO[]> {
    const tasks = await this.taskRepository.getAll();
    return tasks.map(this.mapToDTO);
  }

  private mapToDTO(task: Task): TaskDTO {
    return {
      id: task.getId(),
      title: task.getTitle(),
      description: task.getDescription(),
      completed: task.isComplete(),
      createdAt: task.getCreatedAt(),
    };
  }
}
