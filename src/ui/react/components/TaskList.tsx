// src/ui/react/components/TaskList.tsx

import { TaskViewModel } from "@/presentation/viewModels/TaskViewModel";

interface TaskListProps {
  tasks: TaskViewModel[];
  loading: boolean;
  error: string | null;
  onComplete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  error,
  onComplete,
}) => {
  if (loading) {
    return (
      <div className="w-full p-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-500 text-center">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {task.title}
              </h3>
              {task.description && (
                <p className="mt-1 text-gray-600">{task.description}</p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                Created: {task.createdAt}
              </p>
            </div>
            <div className="ml-4">
              {!task.completed ? (
                <button
                  onClick={() => onComplete(task.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  disabled={task.isLoading}
                >
                  {task.isLoading ? (
                    <span className="flex items-center">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Updating...
                    </span>
                  ) : (
                    "Complete"
                  )}
                </button>
              ) : (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md">
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
