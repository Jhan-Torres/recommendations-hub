<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Star,
  Clock,
  Plus,
  BarChart3,
  Film,
  Tv,
  Sparkles,
  Check,
  Trash2,
} from "lucide-vue-next";
import RecommendationCard from "./RecommendationCard.vue";
import TabNavigation from "../../../shared/ui/TabNavigation.vue";
import FilterButtons from "../../../shared/ui/FilterButtons.vue";
import EmptyState from "../../../shared/ui/EmptyState.vue";
import ActionButton from "../../../shared/ui/ActionButton.vue";
import { useTranslations } from "../../../shared/hooks/useTranslations";
import type { Recommendation } from "../model";
import type { WatchListItem } from "../../watchlist/model";

interface Props {
  recommendations: Recommendation[];
  watchList: WatchListItem[];
  filteredRecommendations: Recommendation[];
  selectedCategory: string;
}

interface Emits {
  (e: "delete-recommendation", id: string): void;
  (e: "view-recommendation", recommendation: Recommendation): void;
  (e: "update:selected-category", value: string): void;
  (e: "show-recommendation-modal"): void;
  (e: "show-watchlist-modal"): void;
  (e: "mark-as-watched", id: string): void;
  (e: "delete-watchlist-item", id: string): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { t } = useTranslations();
const activeTab = ref<"recommendations" | "watchlist">("recommendations");

const categoryFilters = computed(() => [
  { value: "all", label: t.value("all"), icon: BarChart3 },
  { value: "film", label: t.value("films"), icon: Film },
  { value: "series", label: t.value("series"), icon: Tv },
  { value: "anime", label: t.value("anime"), icon: Sparkles },
]);

// Tab navigation data
const navigationTabs = computed(() => [
  {
    id: "recommendations",
    label: t.value("recommendations"),
    icon: Star,
    activeColor: "bg-blue-500",
    hoverColor: "hover:text-blue-600 dark:hover:text-blue-400",
  },
  {
    id: "watchlist",
    label: t.value("watchList"),
    icon: Clock,
    activeColor: "bg-indigo-500",
    hoverColor: "hover:text-indigo-600 dark:hover:text-indigo-400",
  },
]);
</script>

<template>
  <section class="flex items-center justify-between mb-6 sm:mb-8">
    <TabNavigation
      :tabs="navigationTabs"
      :active-tab="activeTab"
      @update:active-tab="(value) => activeTab = value as 'recommendations' | 'watchlist'"
    />
  </section>

  <!-- Recommendations Tab -->
  <div v-if="activeTab === 'recommendations'">
    <!-- Actions and Filters -->
    <div
      class="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center sm:mb-8"
    >
      <ActionButton
        :icon="Plus"
        :label="t('addRecommendation')"
        variant="primary"
        size="md"
        full-width
        @click="$emit('show-recommendation-modal')"
        class="sm:w-auto"
      />

      <FilterButtons
        :filters="categoryFilters"
        :selected-filter="selectedCategory"
        @update:selected-filter="$emit('update:selected-category', $event)"
      />
    </div>

    <!-- Recommendations Grid -->
    <div
      v-if="filteredRecommendations.length > 0"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6"
    >
      <RecommendationCard
        v-for="recommendation in filteredRecommendations"
        :key="recommendation.id"
        :recommendation="recommendation"
        @delete="$emit('delete-recommendation', $event)"
        @view="$emit('view-recommendation', $event)"
      />
    </div>

    <!-- Empty State for Recommendations -->
    <EmptyState
      v-else
      :icon="Star"
      :title="t('noRecommendations')"
      :description="t('startAdding')"
      :action-text="t('addFirst')"
      @action="$emit('show-recommendation-modal')"
    />
  </div>

  <!-- Watch List Tab -->
  <div v-if="activeTab === 'watchlist'">
    <!-- Watch List Header -->
    <div
      class="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center sm:mb-8"
    >
      <div>
        <h2
          class="text-xl font-bold text-gray-900 mb-2 dark:text-white sm:text-2xl"
        >
          {{ t("watchList") }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
          {{ t("watchListDescription") }}
        </p>
      </div>
      <ActionButton
        :icon="Clock"
        :label="t('addToWatchList')"
        variant="purple"
        size="md"
        full-width
        @click="$emit('show-watchlist-modal')"
        class="sm:w-auto"
      />
    </div>

    <!-- Watch List Table (Simplified) -->
    <div
      v-if="watchList.length > 0"
      class="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden dark:bg-gray-800/70 dark:border-gray-700/50"
    >
      <div class="p-4">
        <div
          v-for="item in watchList"
          :key="item.id"
          class="flex items-center justify-between py-3 border-b border-gray-200/50 last:border-0 dark:border-gray-700/50"
        >
          <div class="flex-1">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ item.name }}
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ item.genre }} • {{ t(item.priority) }}
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="$emit('mark-as-watched', item.id)"
              class="p-1 text-green-600 hover:text-green-700 transition-colors dark:text-green-400 dark:hover:text-green-300"
              :title="t('markAsWatched')"
            >
              <Check class="h-4 w-4" />
            </button>
            <button
              @click="$emit('delete-watchlist-item', item.id)"
              class="p-1 text-red-600 hover:text-red-700 transition-colors dark:text-red-400 dark:hover:text-red-300"
              :title="t('delete')"
            >
              <Trash2 class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State for Watch List -->
    <EmptyState
      v-else
      :icon="Clock"
      :title="t('noWatchListItems')"
      :description="t('startAddingToWatchList')"
      :action-text="t('addToWatchList')"
      @action="$emit('show-watchlist-modal')"
    />
  </div>
</template>
