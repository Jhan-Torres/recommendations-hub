<script setup lang="ts">
import { ref, computed } from "vue";
import WatchListModal from "./WatchListModal.vue";
import WatchListHeader from "./WatchListHeader.vue";
import WatchListStats from "./WatchListStats.vue";
import HighestRatedItems from "./HighestRatedItems.vue";
import WatchListContent from "./WatchListContent.vue";
import AppHeader from "../../../shared/ui/AppHeader.vue";
import { useWatchList } from "../useWatchList";
const { watchList, addToWatchList, deleteWatchListItem, markAsWatched } =
  useWatchList();

// Convert LegacyWatchListItem to WatchListItem format
const convertLegacyToWatchListItem = (
  legacyItem: Omit<import("../model").LegacyWatchListItem, "id" | "createdAt">
) => {
  const newItem: Omit<import("../model").WatchListItem, "id" | "createdAt"> = {
    recommendationId: crypto.randomUUID(), // Generate a temp recommendation ID
    userId: "current-user", // Use current user ID
    recommendation: {
      id: crypto.randomUUID(),
      title: legacyItem.name,
      description: legacyItem.notes || "",
      category: legacyItem.category,
      priority: legacyItem.priority,
      rating: Math.floor(Math.random() * 4) + 7, // Random rating between 7-10 for demo
    },
  };
  return newItem;
};

const handleAddToWatchList = (
  legacyItem: Omit<import("../model").LegacyWatchListItem, "id" | "createdAt">
) => {
  const convertedItem = convertLegacyToWatchListItem(legacyItem);
  addToWatchList(convertedItem);
};

// Check if user has existing watchlist items
const hasWatchListItems = computed((): boolean => {
  try {
    const stored = localStorage.getItem("watchlist");
    if (!stored) return false;
    const items = JSON.parse(stored);
    return Array.isArray(items) && items.length > 0;
  } catch {
    return false;
  }
});

const showWatchListModal = ref(false);

// Compute stats for the stats component
const watchListStats = computed(() => {
  const stats = {
    total: watchList.value.length,
    byCategory: {
      film: 0,
      series: 0,
      anime: 0,
    },
    byPriority: {
      high: 0,
      medium: 0,
      low: 0,
    },
  };

  watchList.value.forEach((item) => {
    // Count by category
    const category = item.recommendation?.category;
    if (category === "film") stats.byCategory.film++;
    else if (category === "series") stats.byCategory.series++;
    else if (category === "anime") stats.byCategory.anime++;

    // Count by priority
    const priority = item.recommendation?.priority;
    if (priority === "high") stats.byPriority.high++;
    else if (priority === "medium") stats.byPriority.medium++;
    else if (priority === "low") stats.byPriority.low++;
  });

  return stats;
});

const handleOpenModal = () => {
  showWatchListModal.value = true;
};

const handleCloseModal = () => {
  showWatchListModal.value = false;
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800"
  >
    <!-- Header -->
    <AppHeader :has-watch-list-items="hasWatchListItems" />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <WatchListHeader @open-modal="handleOpenModal" />

      <!-- Stats Section -->
      <WatchListStats
        v-if="watchList.length > 0"
        :stats="watchListStats"
        class="mb-8"
      />

      <!-- Highest Rated Items Section -->
      <HighestRatedItems
        v-if="watchList.length > 0"
        :items="watchList"
        @delete="deleteWatchListItem"
        @mark-watched="markAsWatched"
        class="mb-8"
      />

      <!-- Watch List Content -->
      <WatchListContent
        :items="watchList"
        @delete="deleteWatchListItem"
        @mark-watched="markAsWatched"
      />
    </main>

    <!-- Watch List Modal -->
    <WatchListModal
      :show="showWatchListModal"
      @close="handleCloseModal"
      @addToWatchlist="handleAddToWatchList"
    />
  </div>
</template>
