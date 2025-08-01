<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "../../../shared/ui/AppHeader.vue";
import AppFooter from "../../../shared/ui/AppFooter.vue";
import HeroSection from "./HeroSection.vue";
import FeaturesSection from "./FeaturesSection.vue";
import CommunitySection from "./CommunitySection.vue";
import StatsSection from "./StatsSection.vue";
import CTASection from "./CTASection.vue";

const router = useRouter();

// Navigation functions
const goToRecommendations = () => router.push("/recommendations");
const goToCommunity = () => router.push("/community");

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
        @get-started="goToRecommendations"
        @show-community="goToCommunity"
        @scroll-to-features="scrollToFeatures"
      />

      <FeaturesSection />

      <CommunitySection @show-community="goToCommunity" />

      <StatsSection />

      <CTASection
        :has-recommendations="hasRecommendations"
        @get-started="goToRecommendations"
        @show-community="goToCommunity"
      />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
