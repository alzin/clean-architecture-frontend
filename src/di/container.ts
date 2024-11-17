import { TaskUseCase } from "../application/ports/input/useCases/TaskManagement/TaskUseCase";
import { TaskApi } from "../infrastrcutre/api/TaskApi";
import { TaskRepositoryImpl } from "../infrastrcutre/repositories/TaskRepositoryImpl";
import { TaskPresenter } from "../presentation/presenters/TaskPresenter";

export class DIContainer {
  private static isntance: DIContainer;
  private taskPresenter: TaskPresenter | null = null;

  private constructor() {}

  static getInstance(): DIContainer {
    if (!DIContainer.isntance) {
      DIContainer.isntance = new DIContainer();
    }
    return DIContainer.isntance;
  }

  getTaskPresenter(): TaskPresenter {
    if (!this.taskPresenter) {
      const taskApi = new TaskApi();
      const taskRepository = new TaskRepositoryImpl(taskApi);
      const taskUseCase = new TaskUseCase(taskRepository);
      this.taskPresenter = new TaskPresenter(taskUseCase);
    }

    return this.taskPresenter;
  }
}
