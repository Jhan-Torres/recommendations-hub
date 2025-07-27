<script setup lang="ts">
import { Check, Trash2 } from "lucide-vue-next";
import type { WatchListItem } from "../model";

interface Props {
  item: WatchListItem;
  getCategoryStyles: (category: string) => any;
  getPriorityColor: (priority: string) => string;
  getGenreLabel: (genre: string) => string;
  formatDate: (date: Date) => string;
  t: (key: string) => string;
}

interface Emits {
  (e: "markAsWatched", id: string): void;
  (e: "delete", id: string): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
    <td class="px-4 sm:px-6 py-4">
      <div class="flex items-center">
        <div
          :class="getCategoryStyles(item.category).bg"
          class="p-1.5 rounded-lg mr-3 flex-shrink-0"
        >
          <component
            :is="getCategoryStyles(item.category).icon"
            :class="getCategoryStyles(item.category).text"
            class="h-4 w-4"
          />
        </div>
        <div class="min-w-0 flex-1">
          <div
            class="text-sm font-medium text-gray-900 dark:text-white truncate"
          >
            {{ item.name }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
            {{ item.category }} • {{ getGenreLabel(item.genre) }}
          </div>
        </div>
      </div>
    </td>
    <td
      class="px-4 sm:px-6 py-4 text-sm text-gray-900 dark:text-white capitalize hidden sm:table-cell"
    >
      {{ item.category }}
    </td>
    <td
      class="px-4 sm:px-6 py-4 text-sm text-gray-900 dark:text-white capitalize hidden md:table-cell"
    >
      {{ getGenreLabel(item.genre) }}
    </td>
    <td class="px-4 sm:px-6 py-4">
      <span
        :class="getPriorityColor(item.priority)"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
      >
        {{ t(item.priority) }}
      </span>
    </td>
    <td
      class="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell"
    >
      {{ formatDate(item.createdAt) }}
    </td>
    <td class="px-4 sm:px-6 py-4">
      <div class="flex items-center space-x-2">
        <button
          @click="$emit('markAsWatched', item.id)"
          class="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
          :title="t('markAsWatched')"
        >
          <Check class="h-4 w-4" />
        </button>
        <button
          @click="$emit('delete', item.id)"
          class="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          :title="t('delete')"
        >
          <Trash2 class="h-4 w-4" />
        </button>
      </div>
    </td>
  </tr>
</template>
