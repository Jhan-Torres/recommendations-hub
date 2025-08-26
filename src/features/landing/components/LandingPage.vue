<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../auth/composables/useAuth";
import AppHeader from "../../../shared/ui/AppHeader.vue";
import AppFooter from "../../../shared/ui/AppFooter.vue";
import HeroSection from "./HeroSection.vue";
import FeaturesSection from "./FeaturesSection.vue";
import CommunitySection from "./CommunitySection.vue";
import CTASection from "./CTASection.vue";
import AuthContainer from "../../auth/components/AuthContainer.vue";

const router = useRouter();
const { isAuthenticated } = useAuth();

// Auth modal state
const showAuthModal = ref(false);
const authMode = ref<"login" | "signup">("signup");

// Navigation functions
const goToRecommendations = () => router.push("/vlur-app");
const goToCommunity = () => router.push("/vlur-community");

// Handle get started click
const handleGetStarted = () => {
  if (isAuthenticated.value || hasRecommendations.value) {
    // User is authenticated or has existing data, go to recommendations
    goToRecommendations();
  } else {
    // New user, show signup modal
    authMode.value = "signup";
    showAuthModal.value = true;
  }
};

// Close auth modal
const closeAuthModal = () => {
  showAuthModal.value = false;
};

// Scroll to features section
const scrollToFeatures = () => {
  const featuresSection = document.getElementById("features");
  if (featuresSection) {
    featuresSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

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
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800"
  >
    <!-- Header -->
    <AppHeader :has-recommendations="hasRecommendations" />

    <!-- Main Content -->
    <main>
      <HeroSection
        :has-recommendations="hasRecommendations"
        @get-started="handleGetStarted"
        @show-community="goToCommunity"
        @scroll-to-features="scrollToFeatures"
      />

      <FeaturesSection />

      <CommunitySection @show-community="goToCommunity" />

      <CTASection
        :has-recommendations="hasRecommendations"
        @get-started="handleGetStarted"
        @show-community="goToCommunity"
      />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Auth Modal -->
    <AuthContainer
      :show="showAuthModal"
      :initial-mode="authMode"
      @close="closeAuthModal"
    />
  </div>
</template>
