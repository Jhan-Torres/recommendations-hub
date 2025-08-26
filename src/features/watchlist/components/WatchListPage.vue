<script setup lang="ts">
import { ref, computed } from "vue";
import WatchListModal from "./WatchListModal.vue";
import AppHeader from "../../../shared/ui/AppHeader.vue";
import { useWatchList } from "../useWatchList";
import { useTranslations } from "../../../shared/hooks/useTranslations";
import { useAuth } from "../../auth/composables/useAuth";
import { Clock, Plus, Trash2, Check } from "lucide-vue-next";

const { t } = useTranslations();
const { isAuthenticated } = useAuth();
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

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400";
    case "medium":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "low":
      return "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "film":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400";
    case "series":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400";
    case "anime":
      return "bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400";
  }
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
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
            >
              {{ t("watchList") }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Manage your watch list
            </p>
          </div>

          <button
            v-if="isAuthenticated"
            @click="showWatchListModal = true"
            class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <Plus class="h-5 w-5" />
            <span>{{ t("addToWatchList") }}</span>
          </button>
        </div>
      </div>

      <!-- Watch List Content -->
      <div
        v-if="watchList.length > 0"
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="item in watchList"
          :key="item.id"
          class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
        >
          <!-- Item Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3
                class="font-semibold text-lg text-gray-900 dark:text-white mb-2"
              >
                {{ item.recommendation?.title || "Unknown Title" }}
              </h3>
              <div class="flex flex-wrap gap-2 mb-3">
                <span
                  v-if="item.recommendation?.category"
                  :class="getCategoryColor(item.recommendation.category)"
                  class="px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ item.recommendation.category }}
                </span>
                <span
                  v-if="item.recommendation?.priority"
                  :class="getPriorityColor(item.recommendation.priority)"
                  class="px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ item.recommendation.priority }}
                </span>
              </div>
            </div>

            <div class="flex items-center space-x-1 ml-4">
              <button
                @click="markAsWatched(item.id)"
                class="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                :title="t('markAsWatched')"
              >
                <Check class="h-4 w-4" />
              </button>
              <button
                @click="deleteWatchListItem(item.id)"
                class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                :title="'Remove'"
              >
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Item Details -->
          <div class="space-y-2">
            <div
              v-if="item.recommendation?.description"
              class="text-sm text-gray-600 dark:text-gray-400"
            >
              <p>{{ item.recommendation.description }}</p>
            </div>

            <div
              class="text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-600"
            >
              {{ t("addedOn") }}
              {{ new Date(item.createdAt).toLocaleDateString() }}
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="mb-6">
            <Clock class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          </div>
          <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">
            {{ t("noWatchListItems") }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Start building your watch list
          </p>
          <button
            v-if="isAuthenticated"
            @click="showWatchListModal = true"
            class="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center space-x-2"
          >
            <Plus class="h-5 w-5" />
            <span>Add First Item</span>
          </button>
        </div>
      </div>
    </main>

    <!-- Watch List Modal -->
    <WatchListModal
      :show="showWatchListModal"
      @close="showWatchListModal = false"
      @addToWatchlist="handleAddToWatchList"
    />
  </div>
</template>
