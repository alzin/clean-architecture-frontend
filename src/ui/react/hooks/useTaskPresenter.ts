import { CreateTaskDTO } from "@/application/ports/input/ITaskInput";
import { TaskPresenter } from "@/presentation/presenters/TaskPresenter";
import { TaskViewModel } from "@/presentation/viewModels/TaskViewModel";
import { useCallback, useState } from "react";

export const useTaskPresenter = (presenter: TaskPresenter) => {
  const [tasks, setTasks] = useState<TaskViewModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedTasks = await presenter.getTasks();
      setTasks(loadedTasks);
    } catch (err) {
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [presenter]);

  const createTask = useCallback(
    async (data: CreateTaskDTO) => {
      try {
        setLoading(true);
        setError(null);
        const newTask = await presenter.createTask(data);
        setTasks((prev) => [...prev, newTask]);
      } catch (err) {
        // setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [presenter],
  );

  const completeTask = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        const updatedTask = await presenter.completeTask(id);
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? updatedTask : task)),
        );
      } catch (err) {
        // setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [presenter],
  );

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    completeTask,
  };
};
