<template>
  <div class="space-y-6">
    <!-- Highest Rated Section -->
    <div v-if="highestRatedItems.length > 0" class="mb-8">
      <div class="flex items-center space-x-2 mb-4">
        <Star class="h-5 w-5 text-yellow-500" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Highest Rated in Your Watchlist
        </h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="item in highestRatedItems"
          :key="item.id"
          class="relative bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700/50 shadow-sm"
        >
          <div class="absolute top-2 right-2">
            <div
              class="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900/40 px-2 py-1 rounded-full"
            >
              <Star class="h-3 w-3 text-yellow-500" fill="currentColor" />
              <span
                class="text-xs font-medium text-yellow-700 dark:text-yellow-300"
              >
                {{ item.recommendation?.rating || "N/A" }}
              </span>
            </div>
          </div>

          <h4 class="font-medium text-gray-900 dark:text-white mb-2 pr-12">
            {{ item.recommendation?.title || "Unknown Title" }}
          </h4>

          <div class="flex flex-wrap gap-1 mb-2">
            <span
              v-if="item.recommendation?.category"
              :class="getCategoryColor(item.recommendation.category)"
              class="px-2 py-1 text-xs font-medium rounded-full"
            >
              {{ item.recommendation.category }}
            </span>
          </div>

          <p
            v-if="item.recommendation?.description"
            class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2"
          >
            {{ item.recommendation.description }}
          </p>

          <div class="flex items-center justify-between mt-3">
            <span class="text-xs text-gray-500 dark:text-gray-500">
              Added {{ new Date(item.createdAt).toLocaleDateString() }}
            </span>
            <div class="flex space-x-1">
              <button
                @click="$emit('mark-watched', item.id)"
                class="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded"
                title="Mark as Watched"
              >
                <Check class="h-4 w-4" />
              </button>
              <button
                @click="$emit('delete', item.id)"
                class="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                title="Remove"
              >
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- All Items Section -->
    <div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        All Watchlist Items
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <WatchListCard
          v-for="item in allItems"
          :key="item.id"
          :item="item"
          @delete="$emit('delete', $event)"
          @mark-watched="$emit('mark-watched', $event)"
        />
      </div>

      <!-- Empty State -->
      <div v-if="allItems.length === 0" class="text-center py-12">
        <div class="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-4">
          <Bookmark class="h-full w-full" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No items in watchlist
        </h3>
        <p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
          Start adding recommendations to your watchlist to keep track of what
          you want to watch.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Star, Check, Trash2, Bookmark } from "lucide-vue-next";
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

// Compute highest rated items (rating >= 8.0)
const highestRatedItems = computed(() => {
  return props.items
    .filter((item) => {
      const rating = item.recommendation?.rating;
      return rating && parseFloat(rating.toString()) >= 8.0;
    })
    .sort((a, b) => {
      const ratingA = parseFloat(a.recommendation?.rating?.toString() || "0");
      const ratingB = parseFloat(b.recommendation?.rating?.toString() || "0");
      return ratingB - ratingA; // Descending order
    })
    .slice(0, 6); // Show max 6 highest rated items
});

// All items excluding the highest rated ones to avoid duplication
const allItems = computed(() => {
  const highestRatedIds = new Set(
    highestRatedItems.value.map((item) => item.id)
  );
  return props.items.filter((item) => !highestRatedIds.has(item.id));
});

const getCategoryColor = (category: string) => {
  switch (category) {
    case "film":
      return "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400";
    case "series":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400";
    case "anime":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400";
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
