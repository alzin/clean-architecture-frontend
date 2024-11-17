
// src/ui/vue/components/CreateTaskForm.vue
<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-6 rounded-lg shadow-sm">
    <div>
      <label class="block text-sm font-medium text-gray-700">
        Title
        <input
          v-model="title"
          type="text"
          :disabled="loading"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          required
        />
      </label>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">
        Description
        <textarea
          v-model="description"
          :disabled="loading"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          rows="3"
          required
        ></textarea>
      </label>
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <template v-if="loading">
        <span class="flex items-center justify-center">
          <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          Creating...
        </span>
      </template>
      <template v-else>
        Create Task
      </template>
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CreateTaskDTO } from '../../../application/ports/input/ITaskInput';

export default defineComponent({
  name: 'CreateTaskForm',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['create'],
  setup(props, { emit }) {
    const title = ref('');
    const description = ref('');

    const handleSubmit = () => {
      const data: CreateTaskDTO = {
        title: title.value,
        description: description.value
      };
      emit('create', data);
      // Reset form only if not loading (success case will be handled by parent)
      if (!props.loading) {
        title.value = '';
        description.value = '';
      }
    };

    return {
      title,
      description,
      handleSubmit
    };
  }
});
</script>