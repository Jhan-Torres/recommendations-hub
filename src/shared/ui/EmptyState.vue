<script setup lang="ts">
import type { Component } from "vue";

interface Props {
  icon: Component;
  title: string;
  description: string;
  actionText?: string;
  actionGradient?: string;
}

interface Emits {
  (e: "action"): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="text-center py-12 sm:py-16">
    <div
      class="p-6 sm:p-8 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 max-w-md mx-auto"
    >
      <component
        :is="icon"
        class="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4"
      />
      <h3
        class="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-2"
      >
        {{ title }}
      </h3>
      <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">
        {{ description }}
      </p>
      <button
        v-if="actionText"
        @click="$emit('action')"
        :class="[
          'px-4 py-2 text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-200 shadow-lg',
          actionGradient ||
            'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
        ]"
      >
        {{ actionText }}
      </button>
    </div>
  </div>
</template>
