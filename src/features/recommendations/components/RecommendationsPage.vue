<script setup lang="ts">
import { ref, computed } from "vue";
import RecommendationModal from "./RecommendationModal.vue";
import RecommendationDetailModal from "./RecommendationDetailModal.vue";
import AppHeader from "../../../shared/ui/AppHeader.vue";
import RecommendationsStats from "./RecommendationsStats.vue";
import RecommendationsContent from "./RecommendationsContent.vue";
import { useRecommendations } from "../useRecommendations";
import { useSearch } from "../useSearch";
import type { LegacyRecommendation } from "../model";

const { recommendations, addRecommendation, deleteRecommendation } =
  useRecommendations();
const { selectedCategory, filteredRecommendations } =
  useSearch(recommendations);

// Check if user has existing recommendations
const hasRecommendations = computed((): boolean => {
  try {
    const stored = localStorage.getItem("recommendations");
    if (!stored) return false;
    const recommendations = JSON.parse(stored);
    return Array.isArray(recommendations) && recommendations.length > 0;
  } catch {
    return false;
  }
});

const showRecommendationModal = ref(false);
const showDetailModal = ref(false);
const selectedRecommendation = ref<LegacyRecommendation | null>(null);

const viewRecommendation = (recommendation: LegacyRecommendation) => {
  selectedRecommendation.value = recommendation;
  showDetailModal.value = true;
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800"
  >
    <!-- Header -->
    <AppHeader :has-recommendations="hasRecommendations" />

    <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <!-- Page Title -->
      <div class="mb-8">
        <h1
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Recommendations
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Discover and manage your personalized content recommendations
        </p>
      </div>

      <!-- Stats Section -->
      <RecommendationsStats :recommendations="recommendations" />

      <!-- Content Section -->
      <RecommendationsContent
        :recommendations="recommendations"
        :filtered-recommendations="filteredRecommendations"
        :selected-category="selectedCategory"
        @delete-recommendation="deleteRecommendation"
        @view-recommendation="viewRecommendation"
        @update:selected-category="selectedCategory = $event"
        @show-recommendation-modal="showRecommendationModal = true"
      />
    </main>

    <!-- Modals -->
    <RecommendationModal
      :show="showRecommendationModal"
      @close="showRecommendationModal = false"
      @addRecommendation="addRecommendation"
    />

    <RecommendationDetailModal
      :show="showDetailModal"
      :recommendation="selectedRecommendation"
      @close="showDetailModal = false"
    />
  </div>
</template>
