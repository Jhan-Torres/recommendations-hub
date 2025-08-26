<template>
  <div class="space-y-6">
    <!-- Filters -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        @click="activeFilter = 'all'"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          activeFilter === 'all'
            ? 'bg-indigo-500 text-white'
            : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
        ]"
      >
        All Items ({{ filteredItems.length }})
      </button>
      <button
        v-for="category in availableCategories"
        :key="category"
        @click="activeFilter = category"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          activeFilter === category
            ? 'bg-indigo-500 text-white'
            : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
        ]"
      >
        {{ category }} ({{ getItemCountByCategory(category) }})
      </button>
    </div>

    <!-- Items Grid -->
    <div
      v-if="filteredItems.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <WatchListCard
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        @delete="$emit('delete', $event)"
        @mark-watched="$emit('mark-watched', $event)"
      />
    </div>

    <!-- Empty State for Filtered Results -->
    <div v-else-if="activeFilter !== 'all'" class="text-center py-12">
      <div class="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4">
        <Filter class="h-full w-full" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No {{ activeFilter }} items found
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        Try selecting a different category or add new items to your watchlist.
      </p>
    </div>

    <!-- Empty State for No Items -->
    <div v-else-if="items.length === 0" class="text-center py-12">
      <div class="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-4">
        <Bookmark class="h-full w-full" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No items in watchlist
      </h3>
      <p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
        Start adding recommendations to your watchlist to keep track of what you
        want to watch.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Filter, Bookmark } from "lucide-vue-next";
import WatchListCard from "./WatchListCard.vue";
import type { WatchListItem } from "../model";

interface Props {
  items: WatchListItem[];
}

interface Emits {
  (e: "delete", id: string): void;
  (e: "mark-watched", id: string): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const activeFilter = ref<string>("all");

// Get available categories from items
const availableCategories = computed(() => {
  const categories = new Set<string>();
  props.items.forEach((item) => {
    if (item.recommendation?.category) {
      categories.add(item.recommendation.category);
    }
  });
  return Array.from(categories).sort();
});

// Filter items based on active filter
const filteredItems = computed(() => {
  if (activeFilter.value === "all") {
    return props.items;
  }
  return props.items.filter(
    (item) => item.recommendation?.category === activeFilter.value
  );
});

// Get count by category
const getItemCountByCategory = (category: string) => {
  return props.items.filter(
    (item) => item.recommendation?.category === category
  ).length;
};
</script>
