<template>
  <div
    class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 sm:mb-8"
  >
    <!-- Total Items -->
    <div
      class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
    >
      <div class="text-center">
        <div
          class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2"
        >
          {{ stats.total }}
        </div>
        <div class="text-gray-600 dark:text-gray-400">Total Items</div>
      </div>
    </div>

    <!-- Films -->
    <div
      class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
    >
      <div class="text-center">
        <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
          {{ stats.byCategory.film || 0 }}
        </div>
        <div class="text-gray-600 dark:text-gray-400">Films</div>
      </div>
    </div>

    <!-- Series -->
    <div
      class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
    >
      <div class="text-center">
        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {{ stats.byCategory.series || 0 }}
        </div>
        <div class="text-gray-600 dark:text-gray-400">Series</div>
      </div>
    </div>

    <!-- Anime -->
    <div
      class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
    >
      <div class="text-center">
        <div
          class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2"
        >
          {{ stats.byCategory.anime || 0 }}
        </div>
        <div class="text-gray-600 dark:text-gray-400">Anime</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface WatchListStats {
  total: number;
  byCategory: {
    film: number;
    series: number;
    anime: number;
  };
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
}

interface Props {
  stats: WatchListStats;
}

defineProps<Props>();
</script>
