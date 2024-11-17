// src/domain/entities/Task.ts

export class Task {
  constructor(
    private id: string,
    private title: string,
    private description: string,
    private completed: boolean = false,
    private createdAt: Date = new Date(),
  ) {}

  complete(): void {
    if (this.completed) {
      throw new Error("Task is already completed");
    }
    this.completed = true;
  }

  uncomplete(): void {
    if (!this.completed) {
      throw new Error("Task is not completed");
    }
    this.completed = false;
  }

  getId(): string {
    return this.id;
  }
  getTitle(): string {
    return this.title;
  }
  getDescription(): string {
    return this.description;
  }
  isComplete(): boolean {
    return this.completed;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
}
