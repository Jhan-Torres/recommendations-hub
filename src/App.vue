<template>
  <div
    id="app"
    class="min-h-screen transition-colors duration-200"
    :class="isDark ? 'dark' : ''"
  >
    <div
      class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      <!-- Landing Page -->
      <LandingPage 
        v-if="currentView === 'landing'"
        @get-started="handleGetStarted" 
        @show-community="showCommunity"
      />
      
      <!-- Community Page -->
      <CommunityPage 
        v-else-if="currentView === 'community'"
        @back-to-app="backToApp"
      />
      
      <!-- Main App View (placeholder for now) -->
      <div v-else-if="currentView === 'app'" class="min-h-screen flex items-center justify-center">
        <div class="text-center p-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Main App Coming Soon!
          </h1>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            This is where the main recommendation management interface will be.
          </p>
          <button 
            @click="backToLanding"
            class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Landing
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LandingPage from "./components/LandingPage.vue";
import CommunityPage from "./components/CommunityPage.vue";
import { useTheme } from "./composables/useTheme";

const { isDark } = useTheme();

// View management
const currentView = ref<'landing' | 'community' | 'app'>('landing')

const handleGetStarted = () => {
  currentView.value = 'app'
};

const showCommunity = () => {
  currentView.value = 'community'
};

const backToApp = () => {
  // If user has recommendations, go to app, otherwise go to landing
  const hasRecommendations = checkHasRecommendations()
  currentView.value = hasRecommendations ? 'app' : 'landing'
};

const backToLanding = () => {
  currentView.value = 'landing'
};

const checkHasRecommendations = () => {
  try {
    const stored = localStorage.getItem("recommendations");
    return stored && JSON.parse(stored).length > 0;
  } catch {
    return false;
  }
};
</script>

<style>
@import "./index.css";
</style>
