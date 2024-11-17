<template>
  <div class="container mx-auto p-4 max-w-4xl">
    <h1 class="text-2xl font-bold mb-6 text-gray-900">Task Manager</h1>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Create New Task</h2>
      <create-task-form
        :loading="loading"
        @create="createTask"
      />
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Task List</h2>
      <task-list
        :tasks="tasks"
        :loading="loading"
        :error="error"
        @complete="completeTask"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { DIContainer } from '../../di/container';
import { useTaskPresenter } from './composables/useTaskPresenter';
import CreateTaskForm from './components/CreateTaskForm.vue';
import TaskList from './components/TaskList.vue';

export default defineComponent({
  name: 'TaskApp',
  components: {
    CreateTaskForm,
    TaskList
  },
  setup() {
    const taskPresenter = DIContainer.getInstance().getTaskPresenter();
    const {
      tasks,
      loading,
      error,
      loadTasks,
      createTask,
      completeTask
    } = useTaskPresenter(taskPresenter);

    onMounted(() => {
      loadTasks();
    });

    return {
      tasks,
      loading,
      error,
      createTask,
      completeTask
    };
  }
});
</script>