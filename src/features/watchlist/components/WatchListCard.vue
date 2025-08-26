<template>
  <div
    class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="font-semibold text-lg text-gray-900 dark:text-white mb-2">
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
          @click="$emit('mark-watched', item.id)"
          class="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
          title="Mark as Watched"
        >
          <Check class="h-5 w-5" />
        </button>
        <button
          @click="$emit('delete', item.id)"
          class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="Remove"
        >
          <Trash2 class="h-5 w-5" />
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
        Added {{ new Date(item.createdAt).toLocaleDateString() }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, Trash2 } from "lucide-vue-next";
import type { WatchListItem } from "../model";

interface Props {
  item: WatchListItem;
}

interface Emits {
  (e: "delete", id: string): void;
  (e: "mark-watched", id: string): void;
}

defineProps<Props>();
defineEmits<Emits>();

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
</script>
