<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import RecommendationModal from "./RecommendationModal.vue";
import RecommendationDetailModal from "./RecommendationDetailModal.vue";
import WatchListModal from "../../watchlist/components/WatchListModal.vue";
import RecommendationsHeader from "./RecommendationsHeader.vue";
import RecommendationsStats from "./RecommendationsStats.vue";
import RecommendationsContent from "./RecommendationsContent.vue";
import { useRecommendations } from "../useRecommendations";
import { useWatchList } from "../../watchlist/useWatchList";
import { useSearch } from "../useSearch";
import type { Recommendation } from "../model";

const router = useRouter();

// Navigation functions
const goToCommunity = () => router.push("/community");
const goToLanding = () => router.push("/");

const { recommendations, addRecommendation, deleteRecommendation } =
  useRecommendations();
const { watchList, addToWatchList, deleteWatchListItem, markAsWatched } =
  useWatchList();
const { selectedCategory, filteredRecommendations } =
  useSearch(recommendations);

const showRecommendationModal = ref(false);
const showWatchListModal = ref(false);
const showDetailModal = ref(false);
const selectedRecommendation = ref<Recommendation | null>(null);

const viewRecommendation = (recommendation: Recommendation) => {
  selectedRecommendation.value = recommendation;
  showDetailModal.value = true;
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800"
  >
    <!-- Header -->
    <RecommendationsHeader
      @show-community="goToCommunity"
      @back-to-landing="goToLanding"
    />

    <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <!-- Stats Section -->
      <RecommendationsStats :recommendations="recommendations" />

      <!-- Content Section -->
      <RecommendationsContent
        :recommendations="recommendations"
        :watch-list="watchList"
        :filtered-recommendations="filteredRecommendations"
        :selected-category="selectedCategory"
        @delete-recommendation="deleteRecommendation"
        @view-recommendation="viewRecommendation"
        @update:selected-category="selectedCategory = $event"
        @show-recommendation-modal="showRecommendationModal = true"
        @show-watchlist-modal="showWatchListModal = true"
        @mark-as-watched="markAsWatched"
        @delete-watchlist-item="deleteWatchListItem"
      />
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
