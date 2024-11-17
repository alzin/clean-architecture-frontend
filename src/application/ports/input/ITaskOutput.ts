// src/application/ports/output/ITaskOutput.ts

export interface TaskDTO {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}
