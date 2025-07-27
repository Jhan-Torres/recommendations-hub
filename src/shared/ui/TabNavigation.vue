<script setup lang="ts">
import type { Component } from "vue";

interface Tab {
  id: string;
  label: string;
  icon: Component;
  activeColor: string;
  hoverColor: string;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
}

interface Emits {
  (e: "update:activeTab", value: string): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div
    class="flex space-x-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50 dark:border-gray-700/50"
  >
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="$emit('update:activeTab', tab.id)"
      :class="[
        'px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-1 sm:space-x-2',
        activeTab === tab.id
          ? `${tab.activeColor} text-white shadow-lg`
          : `text-gray-600 dark:text-gray-400 ${tab.hoverColor}`,
      ]"
    >
      <component :is="tab.icon" class="h-3 w-3 sm:h-4 sm:w-4" />
      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>
