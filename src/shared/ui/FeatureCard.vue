<script setup lang="ts">
import type { Component } from "vue";

interface Props {
  icon: Component;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

defineProps<Props>();
</script>

<template>
  <div
    class="group p-4 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105"
  >
    <div class="flex items-start space-x-3 sm:space-x-4">
      <div
        :class="iconBg"
        class="p-2 sm:p-3 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
      >
        <component
          :is="icon"
          :class="iconColor"
          class="h-5 w-5 sm:h-6 sm:w-6"
        />
      </div>
      <div>
        <h3
          class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2"
        >
          {{ title }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
