import { CreateTaskDTO } from "@/application/ports/input/ITaskInput";
import { TaskPresenter } from "@/presentation/presenters/TaskPresenter";
import { TaskViewModel } from "@/presentation/viewModels/TaskViewModel";
import { ref, Ref } from 'vue';

export function useTaskPresenter(presenter: TaskPresenter) {
    const tasks: Ref<TaskViewModel[]> = ref([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const loadTasks = async () => {
        try {
            loading.value = true;
            error.value = null;
            tasks.value = await presenter.getTasks();
        } catch (err) {
            // error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    const createTask = async (data: CreateTaskDTO) => {
        try {
            loading.value = true;
            error.value = null;
            const newTask = await presenter.createTask(data);
            tasks.value = [...tasks.value, newTask];
        } catch (err) {
            // error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    const completeTask = async (id: string) => {
        try {
            loading.value = true;
            error.value = null;
            const updatedTask = await presenter.completeTask(id);
            tasks.value = tasks.value.map(task =>
                task.id === id ? updatedTask : task
            );
        } catch (err) {
            // error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    return {
        tasks,
        loading,
        error,
        loadTasks,
        createTask,
        completeTask
    };
}