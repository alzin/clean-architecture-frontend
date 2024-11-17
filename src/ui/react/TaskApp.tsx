import { useEffect } from "react";
import { CreateTaskForm } from "./components/CreateTaskForm";
import { TaskList } from "./components/TaskList";
import { useTaskPresenter } from "./hooks/useTaskPresenter";
import { DIContainer } from "../../di/container";

export const TaskApp: React.FC = () => {
  const taskPresenter = DIContainer.getInstance().getTaskPresenter();
  const { tasks, loading, error, loadTasks, createTask, completeTask } =
    useTaskPresenter(taskPresenter);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Task Manager</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        <CreateTaskForm onCreate={createTask} loading={loading} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onComplete={completeTask}
        />
      </div>
    </div>
  );
};
