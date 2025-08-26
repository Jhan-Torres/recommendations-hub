<template>
  <div class="mb-6 sm:mb-8">
    <div
      class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
    >
      <div>
        <h1
          class="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl"
        >
          Watch List
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Keep track of movies, series, and anime you want to watch
        </p>
      </div>

      <!-- Add to Watch List Button -->
      <button
        @click="$emit('show-modal')"
        class="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2"
      >
        <Plus class="h-5 w-5" />
        <span>Add to Watch List</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "lucide-vue-next";

defineEmits<{
  "show-modal": [];
}>();
</script>
