// src/ui/vue/components/TaskList.vue
<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="w-full p-4 flex justify-center items-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-600">Error: {{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="tasks.length === 0" class="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <p class="text-gray-500 text-center">No tasks found</p>
    </div>

    <!-- Tasks List -->
    <div v-else class="space-y-4">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ task.title }}
            </h3>
            <p v-if="task.description" class="mt-1 text-gray-600">
              {{ task.description }}
            </p>
            <p class="mt-2 text-sm text-gray-500">
              Created: {{ task.createdAt }}
            </p>
          </div>
          <div class="ml-4">
            <button
              v-if="!task.completed"
              @click="$emit('complete', task.id)"
              :disabled="task.isLoading"
              class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <template v-if="task.isLoading">
                <span class="flex items-center">
                  <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Updating...
                </span>
              </template>
              <template v-else>
                Complete
              </template>
            </button>
            <span
              v-else
              class="px-3 py-1 bg-gray-100 text-gray-600 rounded-md"
            >
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TaskViewModel } from '../../../presentation/viewModels/TaskViewModel';

export default defineComponent({
  name: 'TaskList',
  props: {
    tasks: {
      type: Array as PropType<TaskViewModel[]>,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },
  emits: ['complete']
});
</script>