<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "./shared/hooks/useTheme";
import LandingPage from "./features/landing/components/LandingPage.vue";
import RecommendationsPage from "./features/recommendations/components/RecommendationsPage.vue";
import CommunityPage from "./features/community/components/CommunityPage.vue";

const { isDark } = useTheme();
const currentView = ref<"landing" | "recommendations" | "community">("landing");

const showRecommendations = () => {
  currentView.value = "recommendations";
};

const showCommunity = () => {
  currentView.value = "community";
};

const backToLanding = () => {
  currentView.value = "landing";
};

const backToApp = () => {
  // When coming back from community, go to recommendations if user has data, otherwise landing
  const hasRecommendations = localStorage.getItem("recommendations");
  currentView.value = hasRecommendations ? "recommendations" : "landing";
};
</script>

<template>
  <div
    id="app"
    class="min-h-screen transition-colors duration-200"
    :class="isDark ? 'dark' : ''"
  >
    <main
      class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      <LandingPage
        v-if="currentView === 'landing'"
        @get-started="showRecommendations"
        @show-community="showCommunity"
      />
      <RecommendationsPage
        v-else-if="currentView === 'recommendations'"
        @show-community="showCommunity"
        @back-to-landing="backToLanding"
      />
      <CommunityPage
        v-else-if="currentView === 'community'"
        @back-to-app="backToApp"
      />
    </main>
  </div>
</template>

<style>
@import "./index.css";
</style>
