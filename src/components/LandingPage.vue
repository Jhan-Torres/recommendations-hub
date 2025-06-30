<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800"
  >
    <!-- Navigation -->
    <nav
      class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-2 sm:space-x-3">
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
          </div>
          <div class="flex items-center space-x-1 sm:space-x-2">
            <button
              @click="$emit('show-community')"
              class="px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-1 text-xs sm:text-sm"
            >
              <Users class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden lg:inline">{{ t("community") }}</span>
            </button>
            <button
              @click="$emit('get-started')"
              class="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-xs sm:text-sm"
            >
              {{ hasRecommendations ? t("continueUsing") : t("getStarted") }}
            </button>
            <!-- Return to App Button (only show if user has recommendations) -->
            <button
              v-if="hasRecommendations"
              @click="$emit('get-started')"
              class="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50 flex items-center space-x-1 text-xs sm:text-sm"
              :title="t('returnToApp')"
            >
              <ArrowLeft class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden lg:inline">{{ t("returnToApp") }}</span>
            </button>
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10"
      >
        <div class="text-center">
          <div class="mb-6 sm:mb-8">
            <div
              class="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100/90 dark:bg-blue-900/50 backdrop-blur-sm rounded-full text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-blue-200/50 dark:border-blue-700/50"
            >
              <Sparkles class="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              {{ hasRecommendations ? t("welcomeBack") : t("heroTag") }}
            </div>
          </div>

          <h1
            class="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight drop-shadow-sm"
          >
            {{ hasRecommendations ? t("welcomeBackTitle") : t("heroTitle") }}
            <span
              class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block"
            >
              {{ t("heroSubtitle") }}
            </span>
          </h1>

          <p
            class="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-sm px-4"
          >
            {{
              hasRecommendations
                ? t("welcomeBackDescription")
                : t("heroDescription")
            }}
          </p>

          <div
            class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <button
              @click="$emit('get-started')"
              class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-base sm:text-lg hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-xl backdrop-blur-sm"
            >
              <component
                :is="hasRecommendations ? ArrowRight : Play"
                class="inline h-4 w-4 sm:h-5 sm:w-5 mr-2"
              />
              {{ hasRecommendations ? t("continueJourney") : t("startNow") }}
            </button>
            <button
              @click="$emit('show-community')"
              class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-base sm:text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-xl backdrop-blur-sm"
            >
              <Users class="inline h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {{ t("exploreCommunity") }}
            </button>
            <button
              @click="scrollToFeatures"
              class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
            >
              <BookOpen class="inline h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {{ t("learnMore") }}
            </button>
          </div>

          <!-- Community Stats for all users -->
          <div
            class="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto px-4"
          >
            <div
              class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/50"
            >
              <div
                class="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400"
              >
                2.5K+
              </div>
              <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {{ t("communityMembers") }}
              </div>
            </div>
            <div
              class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/50"
            >
              <div
                class="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400"
              >
                15K+
              </div>
              <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {{ t("sharedRecommendations") }}
              </div>
            </div>
            <div
              class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/50"
            >
              <div
                class="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400"
              >
                4.8★
              </div>
              <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {{ t("communityRating") }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 opacity-20 dark:opacity-10 z-10">
        <div
          class="w-12 h-12 sm:w-20 sm:h-20 bg-blue-500 rounded-full blur-xl animate-pulse"
        ></div>
      </div>
      <div class="absolute top-40 right-20 opacity-20 dark:opacity-10 z-10">
        <div
          class="w-20 h-20 sm:w-32 sm:h-32 bg-indigo-500 rounded-full blur-xl animate-pulse delay-1000"
        ></div>
      </div>
      <div class="absolute bottom-20 left-1/4 opacity-20 dark:opacity-10 z-10">
        <div
          class="w-10 h-10 sm:w-16 sm:h-16 bg-cyan-500 rounded-full blur-xl animate-pulse delay-500"
        ></div>
      </div>
    </section>

    <!-- Features Section -->
    <section
      id="features"
      class="py-12 sm:py-20 bg-white/50 dark:bg-gray-800/50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16">
          <h2
            class="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {{ t("featuresTitle") }}
          </h2>
          <p
            class="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            {{ t("featuresDescription") }}
          </p>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <div
            v-for="feature in featuresData"
            :key="feature.key"
            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <div
              :class="feature.iconBg"
              class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <component
                :is="feature.icon"
                :class="feature.iconColor"
                class="h-6 w-6 sm:h-8 sm:w-8"
              />
            </div>
            <h3
              class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4"
            >
              {{ t(feature.titleKey as any) }}
            </h3>
            <p
              class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {{ t(feature.descKey as any) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Highlight Section -->
    <section
      class="py-12 sm:py-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 sm:mb-12">
          <div
            class="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100/90 dark:bg-purple-900/50 backdrop-blur-sm rounded-full text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-purple-200/50 dark:border-purple-700/50"
          >
            <Users class="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            {{ t("joinCommunity") }}
          </div>
          <h2
            class="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {{ t("communityHighlightTitle") }}
          </h2>
          <p
            class="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
          >
            {{ t("communityHighlightDescription") }}
          </p>
          <button
            @click="$emit('show-community')"
            class="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-base sm:text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-xl"
          >
            <Users class="inline h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            {{ t("exploreCommunity") }}
          </button>
        </div>

        <!-- Community Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div
            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center"
          >
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <TrendingUp
                class="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400"
              />
            </div>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ t("discoverTrending") }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ t("discoverTrendingDesc") }}
            </p>
          </div>

          <div
            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center"
          >
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 dark:bg-pink-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Heart
                class="h-6 w-6 sm:h-8 sm:w-8 text-pink-600 dark:text-pink-400"
              />
            </div>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ t("sharePassion") }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ t("sharePassionDesc") }}
            </p>
          </div>

          <div
            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center"
          >
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Bookmark
                class="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 dark:text-indigo-400"
              />
            </div>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ t("saveForLater") }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ t("saveForLaterDesc") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16">
          <h2
            class="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {{ t("statsTitle") }}
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          <div
            v-for="stat in statsData"
            :key="stat.key"
            class="text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div
              :class="stat.iconBg"
              class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
            >
              <component
                :is="stat.icon"
                :class="stat.iconColor"
                class="h-6 w-6 sm:h-8 sm:w-8"
              />
            </div>
            <div
              class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2"
            >
              {{ stat.number }}
            </div>
            <div
              class="text-xs sm:text-base text-gray-600 dark:text-gray-300 font-medium"
            >
              {{ t(stat.labelKey as any) }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-12 sm:py-20 bg-gradient-to-r from-blue-500 to-indigo-500"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
          {{ hasRecommendations ? t("readyToContinue") : t("ctaTitle") }}
        </h2>
        <p
          class="text-base sm:text-xl text-blue-100 mb-8 sm:mb-10 leading-relaxed"
        >
          {{
            hasRecommendations ? t("continueDescription") : t("ctaDescription")
          }}
        </p>
        <div
          class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <button
            @click="$emit('get-started')"
            class="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-blue-600 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-xl"
          >
            <component
              :is="hasRecommendations ? ArrowRight : Zap"
              class="inline h-4 w-4 sm:h-5 sm:w-5 mr-2"
            />
            {{
              hasRecommendations ? t("backToRecommendations") : t("startFree")
            }}
          </button>
          <button
            @click="$emit('show-community')"
            class="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white/20 text-white border border-white/30 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-200 shadow-xl backdrop-blur-sm"
          >
            <Users class="inline h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            {{ t("joinCommunity") }}
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-gray-950 text-white py-8 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="flex items-center space-x-2 sm:space-x-3 mb-4 md:mb-0">
            <div
              class="p-1 sm:p-1.5 md:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg"
            >
              <Film class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span class="text-base sm:text-lg md:text-xl font-bold">{{
              t("appName")
            }}</span>
          </div>
          <div
            class="text-gray-400 text-xs sm:text-sm text-center md:text-left"
          >
            {{ t("footerText") }}
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  Film,
  Sparkles,
  Play,
  BookOpen,
  Star,
  Search,
  Palette,
  Globe,
  Users,
  Zap,
  Heart,
  Shield,
  Smartphone,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Bookmark,
} from "lucide-vue-next";
import ThemeToggle from "./ThemeToggle.vue";
import LanguageSelector from "./LanguageSelector.vue";
import { useTranslations } from "../composables/useTranslations";

defineEmits<{
  "get-started": [];
  "show-community": [];
}>();

const { t } = useTranslations();

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
const hasRecommendations = computed(() => {
  try {
    const stored = localStorage.getItem("recommendations");
    return stored && JSON.parse(stored).length > 0;
  } catch {
    return false;
  }
});

// Static data that doesn't need translation keys
const featuresData = [
  {
    key: "organize",
    icon: Star,
    iconBg: "bg-yellow-100 dark:bg-yellow-900/50",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    titleKey: "featureOrganizeTitle",
    descKey: "featureOrganizeDesc",
  },
  {
    key: "search",
    icon: Search,
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleKey: "featureSearchTitle",
    descKey: "featureSearchDesc",
  },
  {
    key: "genres",
    icon: Palette,
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    titleKey: "featureGenresTitle",
    descKey: "featureGenresDesc",
  },
  {
    key: "multilingual",
    icon: Globe,
    iconBg: "bg-green-100 dark:bg-green-900/50",
    iconColor: "text-green-600 dark:text-green-400",
    titleKey: "featureMultilingualTitle",
    descKey: "featureMultilingualDesc",
  },
  {
    key: "responsive",
    icon: Smartphone,
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleKey: "featureResponsiveTitle",
    descKey: "featureResponsiveDesc",
  },
  {
    key: "secure",
    icon: Shield,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    titleKey: "featureSecureTitle",
    descKey: "featureSecureDesc",
  },
];

const statsData = [
  {
    key: "categories",
    icon: Film,
    iconBg: "bg-green-100 dark:bg-green-900/50",
    iconColor: "text-green-600 dark:text-green-400",
    number: "3",
    labelKey: "statCategories",
  },
  {
    key: "genres",
    icon: Palette,
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    number: "12",
    labelKey: "statGenres",
  },
  {
    key: "languages",
    icon: Globe,
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    number: "2",
    labelKey: "statLanguages",
  },
  {
    key: "ratings",
    icon: Star,
    iconBg: "bg-yellow-100 dark:bg-yellow-900/50",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    number: "5",
    labelKey: "statRatings",
  },
];
</script>
