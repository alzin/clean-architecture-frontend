// src/ui/react/components/CreateTaskForm.tsx

import { CreateTaskDTO } from "@/application/ports/input/ITaskInput";
import { useState } from "react";

interface CreateTaskFormProps {
  onCreate: (data: CreateTaskDTO) => void;
  loading: boolean;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  onCreate,
  loading,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
            disabled={loading}
          />
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            rows={3}
            required
            disabled={loading}
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            Creating...
          </span>
        ) : (
          "Create Task"
        )}
      </button>
    </form>
  );
};
