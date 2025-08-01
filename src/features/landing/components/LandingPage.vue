<script setup lang="ts">
import { computed } from "vue";
import AppHeader from "../../../shared/ui/AppHeader.vue";
import AppFooter from "../../../shared/ui/AppFooter.vue";
import HeroSection from "./HeroSection.vue";
import FeaturesSection from "./FeaturesSection.vue";
import CommunitySection from "./CommunitySection.vue";
import StatsSection from "./StatsSection.vue";
import CTASection from "./CTASection.vue";

defineEmits<{
  "get-started": [];
  "show-community": [];
}>();

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
    <AppHeader
      :has-recommendations="hasRecommendations"
      :show-return-button="true"
      @get-started="$emit('get-started')"
      @show-community="$emit('show-community')"
      @return-to-app="$emit('get-started')"
    />

    <!-- Main Content -->
    <main>
      <HeroSection
        :has-recommendations="hasRecommendations"
        @get-started="$emit('get-started')"
        @show-community="$emit('show-community')"
        @scroll-to-features="scrollToFeatures"
      />

      <FeaturesSection />

      <CommunitySection @show-community="$emit('show-community')" />

      <StatsSection />

      <CTASection
        :has-recommendations="hasRecommendations"
        @get-started="$emit('get-started')"
        @show-community="$emit('show-community')"
      />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
