<template>
  <div class="min-h-screen bg-gray-50">
    <TaskApp />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskApp from './ui/vue/TaskApp.vue';

export default defineComponent({
  name: 'App',
  components: {
    TaskApp
  }
});
</script>