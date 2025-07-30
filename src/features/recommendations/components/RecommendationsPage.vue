<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Film,
  Tv,
  Sparkles,
  Star,
  Clock,
  Plus,
  BarChart3,
  Users,
  Check,
  Trash2,
} from "lucide-vue-next";
import RecommendationCard from "./RecommendationCard.vue";
import RecommendationModal from "./RecommendationModal.vue";
import RecommendationDetailModal from "./RecommendationDetailModal.vue";
import WatchListModal from "../../watchlist/components/WatchListModal.vue";
import StatsCard from "../../../shared/ui/StatsCard.vue";
import TabNavigation from "../../../shared/ui/TabNavigation.vue";
import FilterButtons from "../../../shared/ui/FilterButtons.vue";
import EmptyState from "../../../shared/ui/EmptyState.vue";
import ActionButton from "../../../shared/ui/ActionButton.vue";
import SearchBar from "../../../shared/ui/SearchBar.vue";
import LanguageSelector from "../../../shared/ui/LanguageSelector.vue";
import ThemeToggle from "../../../shared/ui/ThemeToggle.vue";
import { useRecommendations } from "../useRecommendations";
import { useWatchList } from "../../watchlist/useWatchList";
import { useSearch } from "../useSearch";
import { useTranslations } from "../../../shared/hooks/useTranslations";
import { formatDate } from "../../../shared/utils/formatDate";
import type { Recommendation } from "../model";

defineEmits<{
  "show-community": [];
  "back-to-landing": [];
}>();

const { t } = useTranslations();
const { recommendations, addRecommendation, deleteRecommendation } =
  useRecommendations();
const { watchList, addToWatchList, deleteWatchListItem, markAsWatched } =
  useWatchList();
const { searchQuery, selectedCategory, filteredRecommendations } =
  useSearch(recommendations);

const activeTab = ref<"recommendations" | "watchlist">("recommendations");
const showRecommendationModal = ref(false);
const showWatchListModal = ref(false);
const showDetailModal = ref(false);
const selectedRecommendation = ref<Recommendation | null>(null);

const categoryFilters = computed(() => [
  { value: "all", label: t.value("all"), icon: BarChart3 },
  { value: "film", label: t.value("films"), icon: Film },
  { value: "series", label: t.value("series"), icon: Tv },
  { value: "anime", label: t.value("anime"), icon: Sparkles },
]);

const filmCount = computed(
  () => recommendations.value.filter((r) => r.category === "film").length
);
const seriesCount = computed(
  () => recommendations.value.filter((r) => r.category === "series").length
);
const animeCount = computed(
  () => recommendations.value.filter((r) => r.category === "anime").length
);

// Stats cards data
const statsCards = computed(() => [
  {
    label: t.value("total"),
    value: recommendations.value.length,
    icon: BarChart3,
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: t.value("films"),
    value: filmCount.value,
    icon: Film,
    iconBg: "bg-green-100 dark:bg-green-900/50",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    label: t.value("series"),
    value: seriesCount.value,
    icon: Tv,
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    label: t.value("anime"),
    value: animeCount.value,
    icon: Sparkles,
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
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

const viewRecommendation = (recommendation: Recommendation) => {
  selectedRecommendation.value = recommendation;
  showDetailModal.value = true;
};

const getCategoryStyles = (category: string) => {
  const styles = {
    film: {
      bg: "bg-green-100 dark:bg-green-900/50",
      text: "text-green-600 dark:text-green-400",
      icon: Film,
    },
    series: {
      bg: "bg-purple-100 dark:bg-purple-900/50",
      text: "text-purple-600 dark:text-purple-400",
      icon: Tv,
    },
    anime: {
      bg: "bg-blue-100 dark:bg-blue-900/50",
      text: "text-blue-600 dark:text-blue-400",
      icon: Sparkles,
    },
  };
  return styles[category as keyof typeof styles] || styles.film;
};

const getPriorityColor = (priority: string) => {
  const colors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    low: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  };
  return colors[priority as keyof typeof colors] || colors.medium;
};

const getGenreLabel = (genre: string) => {
  const genreLabels = {
    action: t.value("action"),
    adventure: t.value("adventure"),
    comedy: t.value("comedy"),
    drama: t.value("drama"),
    fantasy: t.value("fantasy"),
    horror: t.value("horror"),
    mystery: t.value("mystery"),
    romance: t.value("romance"),
    "sci-fi": t.value("sciFi"),
    thriller: t.value("thriller"),
    documentary: t.value("documentary"),
    animation: t.value("animation"),
  };
  return genreLabels[genre as keyof typeof genreLabels] || genre;
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800"
  >
    <!-- Header -->
    <header
      class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <button
            @click="$emit('back-to-landing')"
            class="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div
              class="p-1 sm:p-1.5 md:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg"
            >
              <Film class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h1
              class="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              {{ t("appName") }}
            </h1>
          </button>
          <nav class="flex items-center space-x-2 sm:space-x-4">
            <div class="hidden sm:block">
              <SearchBar v-model="searchQuery" />
            </div>
            <button
              @click="$emit('show-community')"
              class="px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-1 text-xs sm:text-sm"
            >
              <Users class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden lg:inline">{{ t("community") }}</span>
            </button>

            <LanguageSelector />
            <ThemeToggle />
          </nav>
        </div>
        <!-- Mobile Search Bar -->
        <div class="sm:hidden pb-3">
          <SearchBar v-model="searchQuery" />
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Navigation Tabs -->
      <section class="flex items-center justify-between mb-6 sm:mb-8">
        <TabNavigation
          :tabs="navigationTabs"
          :active-tab="activeTab"
          @update:active-tab="(value) => activeTab = value as 'recommendations' | 'watchlist'"
        />
      </section>

      <!-- Recommendations Tab -->
      <div v-if="activeTab === 'recommendations'">
        <!-- Stats Cards -->
        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
        >
          <StatsCard
            v-for="stat in statsCards"
            :key="stat.label"
            :label="stat.label"
            :value="stat.value"
            :icon="stat.icon"
            :icon-bg="stat.iconBg"
            :icon-color="stat.iconColor"
          />
        </div>

        <!-- Actions and Filters -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8"
        >
          <ActionButton
            :icon="Plus"
            :label="t('addRecommendation')"
            variant="primary"
            size="md"
            full-width
            @click="showRecommendationModal = true"
            class="sm:w-auto"
          />

          <FilterButtons
            :filters="categoryFilters"
            :selected-filter="selectedCategory"
            @update:selected-filter="selectedCategory = $event"
          />
        </div>

        <!-- Recommendations Grid -->
        <div
          v-if="filteredRecommendations.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <RecommendationCard
            v-for="recommendation in filteredRecommendations"
            :key="recommendation.id"
            :recommendation="recommendation"
            @delete="deleteRecommendation"
            @view="viewRecommendation"
          />
        </div>

        <!-- Empty State for Recommendations -->
        <EmptyState
          v-else
          :icon="Star"
          :title="t('noRecommendations')"
          :description="t('startAdding')"
          :action-text="t('addFirst')"
          @action="showRecommendationModal = true"
        />
      </div>

      <!-- Watch List Tab -->
      <div v-if="activeTab === 'watchlist'">
        <!-- Watch List Header -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8"
        >
          <div>
            <h2
              class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2"
            >
              {{ t("watchList") }}
            </h2>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {{ t("watchListDescription") }}
            </p>
          </div>
          <ActionButton
            :icon="Clock"
            :label="t('addToWatchList')"
            variant="purple"
            size="md"
            full-width
            @click="showWatchListModal = true"
            class="sm:w-auto"
          />
        </div>

        <!-- Watch List Table -->
        <div
          v-if="watchList.length > 0"
          class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
        >
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50/50 dark:bg-gray-700/50">
                <tr>
                  <th
                    class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {{ t("title") }}
                  </th>
                  <th
                    class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell"
                  >
                    {{ t("category") }}
                  </th>
                  <th
                    class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
                  >
                    {{ t("genre") }}
                  </th>
                  <th
                    class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {{ t("priority") }}
                  </th>
                  <th
                    class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell"
                  >
                    {{ t("dateAdded") }}
                  </th>
                  <th
                    class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {{ t("actions") }}
                  </th>
                </tr>
              </thead>
              <tbody
                class="divide-y divide-gray-200/50 dark:divide-gray-700/50"
              >
                <tr
                  v-for="item in watchList"
                  :key="item.id"
                  class="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
                >
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
                        <div
                          class="text-xs text-gray-500 dark:text-gray-400 sm:hidden"
                        >
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
                        @click="markAsWatched(item.id)"
                        class="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        :title="t('markAsWatched')"
                      >
                        <Check class="h-4 w-4" />
                      </button>
                      <button
                        @click="deleteWatchListItem(item.id)"
                        class="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        :title="t('delete')"
                      >
                        <Trash2 class="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Empty State for Watch List -->
        <div v-else class="text-center py-12 sm:py-16">
          <div
            class="p-6 sm:p-8 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 max-w-md mx-auto"
          >
            <Clock
              class="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4"
            />
            <h3
              class="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-2"
            >
              {{ t("noWatchListItems") }}
            </h3>
            <p
              class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4"
            >
              {{ t("startAddingToWatchList") }}
            </p>
            <button
              @click="showWatchListModal = true"
              class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {{ t("addFirstWatchListItem") }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <RecommendationModal
      :show="showRecommendationModal"
      @close="showRecommendationModal = false"
      @addRecommendation="addRecommendation"
    />

    <WatchListModal
      :show="showWatchListModal"
      @close="showWatchListModal = false"
      @addToWatchlist="addToWatchList"
    />

    <RecommendationDetailModal
      :show="showDetailModal"
      :recommendation="selectedRecommendation"
      @close="showDetailModal = false"
    />
  </div>
</template>
