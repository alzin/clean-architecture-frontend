// src/infrastructure/api/TaskApi.ts

interface TaskData {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export class TaskApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "https://jsonplaceholder.typicode.com";
  }

  async getTasks(): Promise<TaskData[]> {
    const response = await fetch(`${this.baseUrl}/todos?_limit=10`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return response.json();
  }

  async getTask(id: string): Promise<TaskData> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }
    return response.json();
  }

  async createTask(task: {
    title: string;
    description: string;
  }): Promise<TaskData> {
    const response = await fetch(`${this.baseUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        completed: false,
        userId: 1, // Default user ID for demo
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    return response.json();
  }

  async updateTask(
    id: string,
    task: { completed: boolean },
  ): Promise<TaskData> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    return response.json();
  }
}
