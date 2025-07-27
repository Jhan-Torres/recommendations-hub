<script setup lang="ts">
import type { Component } from "vue";
import ThemeToggle from "./ThemeToggle.vue";
import LanguageSelector from "./LanguageSelector.vue";
import SearchBar from "./SearchBar.vue";

interface Props {
  title: string;
  icon: Component;
  showSearch?: boolean;
  searchValue?: string;
}

interface Emits {
  (e: "back"): void;
  (e: "action"): void;
  (e: "update:searchValue", value: string): void;
}

withDefaults(defineProps<Props>(), {
  showSearch: false,
  searchValue: "",
});

defineEmits<Emits>();
</script>

<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <button
          @click="$emit('back')"
          class="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity duration-200"
        >
          <div
            class="p-1 sm:p-1.5 md:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg"
          >
            <component
              :is="icon"
              class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white"
            />
          </div>
          <h1
            class="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            {{ title }}
          </h1>
        </button>

        <nav class="flex items-center space-x-2 sm:space-x-4">
          <div v-if="showSearch" class="hidden sm:block">
            <SearchBar
              :model-value="searchValue"
              @update:model-value="$emit('update:searchValue', $event)"
            />
          </div>

          <slot name="actions" />

          <LanguageSelector />
          <ThemeToggle />
        </nav>
      </div>

      <!-- Mobile Search Bar -->
      <div v-if="showSearch" class="sm:hidden pb-3">
        <SearchBar
          :model-value="searchValue"
          @update:model-value="$emit('update:searchValue', $event)"
        />
      </div>
    </div>
  </header>
</template>
