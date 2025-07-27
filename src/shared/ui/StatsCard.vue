<script setup lang="ts">
import type { Component } from "vue";

interface Props {
  label: string;
  value: number | string;
  icon: Component;
  iconBg: string;
  iconColor: string;
}

defineProps<Props>();
</script>

<template>
  <div
    class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-3 sm:p-6 border border-gray-200/50 dark:border-gray-700/50"
  >
    <div class="flex items-center justify-between">
      <div>
        <p
          class="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          {{ label }}
        </p>
        <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {{ value }}
        </p>
      </div>
      <div :class="iconBg" class="p-2 sm:p-3 rounded-lg">
        <component
          :is="icon"
          :class="iconColor"
          class="h-4 w-4 sm:h-6 sm:w-6"
        />
      </div>
    </div>
  </div>
</template>
