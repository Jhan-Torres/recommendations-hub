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
import ThemeToggle from "../../../shared/ui/ThemeToggle.vue";
import LanguageSelector from "../../../shared/ui/LanguageSelector.vue";
import { useTranslations } from "../../../shared/hooks/useTranslations";

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

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800"
  >
    <!-- Navigation -->
    <header class="header-nav">
      <div class="container-main">
        <div class="header-container">
          <div class="flex items-center space-x-2 sm:space-x-3">
            <img
              src="/vlur-logo.webp"
              alt="Vlur Logo"
              class="h-8 w-8 object-cover rounded-full sm:h-10 sm:w-10 md:h-12 md:w-12"
            />
            <h1
              class="text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent sm:text-lg md:text-xl"
            >
              {{ t("appName") }}
            </h1>
          </div>
          <div class="flex items-center space-x-1 sm:space-x-2">
            <button
              @click="$emit('show-community')"
              class="px-2 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-1 text-xs sm:px-3 sm:py-2 sm:text-sm"
            >
              <Users class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden lg:inline">{{ t("community") }}</span>
            </button>
            <button
              @click="$emit('get-started')"
              class="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              {{ hasRecommendations ? t("continueUsing") : t("getStarted") }}
            </button>
            <!-- Return to App Button (only show if user has recommendations) -->
            <button
              v-if="hasRecommendations"
              @click="$emit('get-started')"
              class="px-2 py-1.5 bg-white/70 text-gray-700 rounded-lg font-medium hover:bg-white transition-all duration-200 border border-gray-200/50 flex items-center space-x-1 text-xs dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700/50 sm:px-3 sm:py-2 sm:text-sm"
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
    </header>

    <!-- Hero Section -->
    <main>
      <section class="relative overflow-hidden">
        <div class="container-main py-12 relative z-10 sm:py-20">
          <div class="text-center">
            <div class="mb-6 sm:mb-8">
              <div
                class="inline-flex items-center px-3 py-2 bg-blue-100/90 backdrop-blur-sm rounded-full text-blue-600 text-xs font-medium mb-4 border border-blue-200/50 dark:bg-blue-900/50 dark:text-blue-400 dark:border-blue-700/50 sm:px-4 sm:text-sm sm:mb-6"
              >
                <Sparkles class="h-3 w-3 mr-2 sm:h-4 sm:w-4" />
                {{ hasRecommendations ? t("welcomeBack") : t("heroTag") }}
              </div>
            </div>

            <h1
              class="text-hero text-gray-900 mb-4 leading-tight drop-shadow-sm dark:text-white sm:mb-6"
            >
              {{ hasRecommendations ? t("welcomeBackTitle") : t("heroTitle") }}
              <span
                class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block"
              >
                {{ t("heroSubtitle") }}
              </span>
            </h1>

            <p
              class="text-subtitle text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-sm px-4 dark:text-gray-300 sm:mb-10"
            >
              {{
                hasRecommendations
                  ? t("welcomeBackDescription")
                  : t("heroDescription")
              }}
            </p>

            <div class="btn-group-vertical justify-center items-center px-4">
              <button
                @click="$emit('get-started')"
                class="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-base hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-xl backdrop-blur-sm sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
              >
                <component
                  :is="hasRecommendations ? ArrowRight : Play"
                  class="inline h-4 w-4 mr-2 sm:h-5 sm:w-5"
                />
                {{ hasRecommendations ? t("continueJourney") : t("startNow") }}
              </button>
              <button
                @click="$emit('show-community')"
                class="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-base hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-xl backdrop-blur-sm sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
              >
                <Users class="inline h-4 w-4 mr-2 sm:h-5 sm:w-5" />
                {{ t("exploreCommunity") }}
              </button>
              <button
                @click="scrollToFeatures"
                class="w-full px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-semibold text-base hover:bg-white/90 transition-all duration-200 border border-gray-200/50 shadow-lg dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800/90 dark:border-gray-700/50 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
              >
                <BookOpen class="inline h-4 w-4 mr-2 sm:h-5 sm:w-5" />
                {{ t("learnMore") }}
              </button>
            </div>

            <!-- Community Stats for all users -->
            <div
              class="mt-8 grid grid-cols-1 gap-4 max-w-2xl mx-auto px-4 sm:mt-12 sm:grid-cols-3 sm:gap-6"
            >
              <div class="card-primary">
                <div
                  class="text-xl font-bold text-purple-600 dark:text-purple-400 sm:text-2xl"
                >
                  2.5K+
                </div>
                <div
                  class="text-xs text-gray-600 dark:text-gray-400 sm:text-sm"
                >
                  {{ t("communityMembers") }}
                </div>
              </div>
              <div class="card-primary">
                <div
                  class="text-xl font-bold text-indigo-600 dark:text-indigo-400 sm:text-2xl"
                >
                  15K+
                </div>
                <div
                  class="text-xs text-gray-600 dark:text-gray-400 sm:text-sm"
                >
                  {{ t("sharedRecommendations") }}
                </div>
              </div>
              <div class="card-primary">
                <div
                  class="text-xl font-bold text-cyan-600 dark:text-cyan-400 sm:text-2xl"
                >
                  4.8★
                </div>
                <div
                  class="text-xs text-gray-600 dark:text-gray-400 sm:text-sm"
                >
                  {{ t("communityRating") }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 opacity-20 z-10 dark:opacity-10">
          <div
            class="w-12 h-12 bg-blue-500 rounded-full blur-xl animate-pulse sm:w-20 sm:h-20"
          ></div>
        </div>
        <div class="absolute top-40 right-20 opacity-20 z-10 dark:opacity-10">
          <div
            class="w-20 h-20 bg-indigo-500 rounded-full blur-xl animate-pulse delay-1000 sm:w-32 sm:h-32"
          ></div>
        </div>
        <div
          class="absolute bottom-20 left-1/4 opacity-20 z-10 dark:opacity-10"
        >
          <div
            class="w-10 h-10 bg-cyan-500 rounded-full blur-xl animate-pulse delay-500 sm:w-16 sm:h-16"
          ></div>
        </div>
      </section>

      <!-- Features Section -->
      <section
        id="features"
        class="section-padding bg-white/50 dark:bg-gray-800/50"
      >
        <div class="container-main">
          <div class="text-center content-spacing">
            <h2 class="heading-primary">
              {{ t("featuresTitle") }}
            </h2>
            <p
              class="text-subtitle text-gray-600 max-w-2xl mx-auto dark:text-gray-300"
            >
              {{ t("featuresDescription") }}
            </p>
          </div>

          <div class="grid-features">
            <div
              v-for="feature in featuresData"
              :key="feature.key"
              class="card-primary card-hover group"
            >
              <div
                :class="feature.iconBg"
                class="icon-container-md mb-4 group-hover:scale-110 transition-transform duration-300 sm:mb-6"
              >
                <component
                  :is="feature.icon"
                  :class="feature.iconColor"
                  class="h-6 w-6 sm:h-8 sm:w-8"
                />
              </div>
              <h3 class="heading-secondary">
                {{ t(feature.titleKey as any) }}
              </h3>
              <p class="text-body">
                {{ t(feature.descKey as any) }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Community Highlight Section -->
      <section
        class="section-padding bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20"
      >
        <div class="container-main">
          <div class="text-center content-spacing">
            <div
              class="inline-flex items-center px-3 py-2 bg-purple-100/90 backdrop-blur-sm rounded-full text-purple-600 text-xs font-medium mb-4 border border-purple-200/50 dark:bg-purple-900/50 dark:text-purple-400 dark:border-purple-700/50 sm:px-4 sm:text-sm sm:mb-6"
            >
              <Users class="h-3 w-3 mr-2 sm:h-4 sm:w-4" />
              {{ t("joinCommunity") }}
            </div>
            <h2 class="heading-primary">
              {{ t("communityHighlightTitle") }}
            </h2>
            <p
              class="text-subtitle text-gray-600 max-w-2xl mx-auto mb-8 dark:text-gray-300"
            >
              {{ t("communityHighlightDescription") }}
            </p>
            <button @click="$emit('show-community')" class="btn-purple">
              <Users class="inline h-4 w-4 mr-2 sm:h-5 sm:w-5" />
              {{ t("exploreCommunity") }}
            </button>
          </div>

          <!-- Community Features Grid -->
          <div class="grid grid-cols-1 gap-6 md:grid-cols-3 sm:gap-8">
            <div class="card-primary text-center">
              <div
                class="icon-container-md bg-purple-100 mx-auto mb-4 dark:bg-purple-900/50"
              >
                <TrendingUp
                  class="h-6 w-6 text-purple-600 dark:text-purple-400 sm:h-8 sm:w-8"
                />
              </div>
              <h3
                class="text-lg font-semibold text-gray-900 mb-2 dark:text-white"
              >
                {{ t("discoverTrending") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("discoverTrendingDesc") }}
              </p>
            </div>

            <div class="card-primary text-center">
              <div
                class="icon-container-md bg-pink-100 mx-auto mb-4 dark:bg-pink-900/50"
              >
                <Heart
                  class="h-6 w-6 text-pink-600 dark:text-pink-400 sm:h-8 sm:w-8"
                />
              </div>
              <h3
                class="text-lg font-semibold text-gray-900 mb-2 dark:text-white"
              >
                {{ t("sharePassion") }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t("sharePassionDesc") }}
              </p>
            </div>

            <div class="card-primary text-center">
              <div
                class="icon-container-md bg-indigo-100 mx-auto mb-4 dark:bg-indigo-900/50"
              >
                <Bookmark
                  class="h-6 w-6 text-indigo-600 dark:text-indigo-400 sm:h-8 sm:w-8"
                />
              </div>
              <h3
                class="text-lg font-semibold text-gray-900 mb-2 dark:text-white"
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
      <section class="section-padding">
        <div class="container-main">
          <div class="text-center content-spacing">
            <h2 class="heading-primary">
              {{ t("statsTitle") }}
            </h2>
          </div>

          <div class="grid-stats">
            <div
              v-for="stat in statsData"
              :key="stat.key"
              class="text-center card-primary"
            >
              <div
                :class="stat.iconBg"
                class="icon-container-md mx-auto mb-3 sm:mb-4"
              >
                <component
                  :is="stat.icon"
                  :class="stat.iconColor"
                  class="h-6 w-6 sm:h-8 sm:w-8"
                />
              </div>
              <div
                class="text-2xl font-bold text-gray-900 mb-1 dark:text-white sm:text-3xl sm:mb-2"
              >
                {{ stat.number }}
              </div>
              <div
                class="text-xs text-gray-600 font-medium dark:text-gray-300 sm:text-base"
              >
                {{ t(stat.labelKey as any) }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section
        class="section-padding bg-gradient-to-r from-blue-500 to-indigo-500"
      >
        <div class="container-content text-center">
          <h2 class="text-2xl font-bold text-white mb-4 sm:text-4xl sm:mb-6">
            {{ hasRecommendations ? t("readyToContinue") : t("ctaTitle") }}
          </h2>
          <p
            class="text-base text-blue-100 mb-8 leading-relaxed sm:text-xl sm:mb-10"
          >
            {{
              hasRecommendations
                ? t("continueDescription")
                : t("ctaDescription")
            }}
          </p>
          <div class="btn-group-vertical justify-center items-center">
            <button
              @click="$emit('get-started')"
              class="w-full px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold text-base hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-xl sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
            >
              <component
                :is="hasRecommendations ? ArrowRight : Zap"
                class="inline h-4 w-4 mr-2 sm:h-5 sm:w-5"
              />
              {{
                hasRecommendations ? t("backToRecommendations") : t("startFree")
              }}
            </button>
            <button
              @click="$emit('show-community')"
              class="w-full px-8 py-3 bg-white/20 text-white border border-white/30 rounded-xl font-semibold text-base hover:bg-white/30 transform hover:scale-105 transition-all duration-200 shadow-xl backdrop-blur-sm sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
            >
              <Users class="inline h-4 w-4 mr-2 sm:h-5 sm:w-5" />
              {{ t("joinCommunity") }}
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 dark:bg-gray-950 sm:py-12">
      <div class="container-main">
        <div class="flex flex-col items-center justify-between md:flex-row">
          <div class="flex items-center space-x-2 mb-4 md:mb-0 sm:space-x-3">
            <img
              src="/vlur-logo.webp"
              alt="Vlur Logo"
              class="h-8 w-8 object-cover rounded-full sm:h-10 sm:w-10 md:h-12 md:w-12"
            />
            <span class="text-base font-bold sm:text-lg md:text-xl">{{
              t("appName")
            }}</span>
          </div>
          <div
            class="text-gray-400 text-xs text-center sm:text-sm md:text-left"
          >
            {{ t("footerText") }}
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
