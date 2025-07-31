// Landing page business logic and composables
import { ref } from "vue";

export const useLanding = () => {
  const isFirstVisit = ref(true);
  const showFeatures = ref(false);

  const checkFirstVisit = () => {
    const hasRecommendations = localStorage.getItem("recommendations");
    isFirstVisit.value = !hasRecommendations;
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return {
    isFirstVisit,
    showFeatures,
    checkFirstVisit,
    scrollToFeatures,
  };
};
