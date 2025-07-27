<script setup lang="ts">
import type { Component } from "vue";

interface FilterOption {
  value: string;
  label: string;
  icon: Component;
}

interface Props {
  filters: FilterOption[];
  selectedFilter: string;
}

interface Emits {
  (e: "update:selectedFilter", value: string): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="filter in filters"
      :key="filter.value"
      @click="$emit('update:selectedFilter', filter.value)"
      :class="[
        'px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-1 sm:space-x-2',
        selectedFilter === filter.value
          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
          : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50',
      ]"
    >
      <component :is="filter.icon" class="h-3 w-3 sm:h-4 sm:w-4" />
      <span>{{ filter.label }}</span>
    </button>
  </div>
</template>
