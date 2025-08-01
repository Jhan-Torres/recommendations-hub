<script setup lang="ts">
import { computed } from "vue";
import { TrendingUp, Clock, Star, Grid, Bookmark } from "lucide-vue-next";
import SearchBar from "../../../shared/ui/SearchBar.vue";
import { useTranslations } from "../../../shared/hooks/useTranslations";

interface Props {
  selectedFilter: string;
  savedPostsCount: number;
  searchQuery: string;
}

interface Emits {
  (e: "update:selectedFilter", value: string): void;
  (e: "update:searchQuery", value: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const { t } = useTranslations();

const filterOptions = computed(() => [
  { value: "trending", label: t.value("trending"), icon: TrendingUp },
  { value: "recent", label: t.value("recent"), icon: Clock },
  { value: "top-rated", label: t.value("topRated"), icon: Star },
  { value: "saved", label: t.value("saved"), icon: Bookmark },
  { value: "all", label: t.value("all"), icon: Grid },
]);

const updateFilter = (value: string) => {
  emit("update:selectedFilter", value);
};

const updateSearch = (value: string) => {
  emit("update:searchQuery", value);
};
</script>

<template>
  <section class="mb-6 sm:mb-8">
    <!-- Filter Buttons -->
    <div class="flex flex-wrap gap-2 justify-center mb-4">
      <button
        v-for="filter in filterOptions"
        :key="filter.value"
        @click="updateFilter(filter.value)"
        :class="[
          'px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center',
          selectedFilter === filter.value
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
            : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50',
        ]"
      >
        <component
          :is="filter.icon"
          class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"
        />
        {{ filter.label }}
        <span
          v-if="filter.value === 'saved' && savedPostsCount > 0"
          class="ml-1 sm:ml-2 px-1.5 py-0.5 bg-white/20 rounded-full text-xs font-bold"
        >
          {{ savedPostsCount }}
        </span>
      </button>
    </div>

    <!-- Search Bar -->
    <div class="flex justify-center">
      <SearchBar
        :model-value="searchQuery"
        @update:model-value="updateSearch"
      />
    </div>
  </section>
</template>
