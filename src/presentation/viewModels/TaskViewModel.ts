// src/presentation/viewModels/TaskViewModel.ts

export interface TaskViewModel {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  isLoading?: boolean;
  error?: string;
}
