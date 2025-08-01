<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Users, Home, Menu, X } from "lucide-vue-next";
import ThemeToggle from "./ThemeToggle.vue";
import LanguageSelector from "./LanguageSelector.vue";
import { useTranslations } from "../hooks/useTranslations";

interface Props {
  hasRecommendations?: boolean;
  showMenu?: boolean;
}

withDefaults(defineProps<Props>(), {
  hasRecommendations: false,
  showMenu: false,
});

const { t } = useTranslations();
const route = useRoute();
const router = useRouter();

// Menu state
const isMenuOpen = ref(false);

// Toggle menu function
const toggleMenu = (event: Event) => {
  event.stopPropagation();
  isMenuOpen.value = !isMenuOpen.value;
};

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element;
  if (!target.closest(".menu-container")) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Navigation functions
const goToLanding = () => router.push("/");
const goToRecommendations = () => router.push("/recommendations");
const goToCommunity = () => router.push("/community");

// Computed properties to determine which buttons to show
const isOnLanding = computed(() => route.name === "Landing");
const isOnRecommendations = computed(() => route.name === "Recommendations");
const isOnCommunity = computed(() => route.name === "Community");
</script>

<template>
  <header class="header-nav">
    <div class="container-main">
      <div class="header-container">
        <button
          @click="goToLanding"
          class="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity duration-200"
        >
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
        </button>

        <div class="flex items-center space-x-1 sm:space-x-2">
          <!-- Landing Page: Show Community and Get Started buttons, or Back to App if has recommendations -->
          <template v-if="isOnLanding">
            <button
              @click="goToCommunity"
              class="px-2 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-1 text-xs sm:px-3 sm:py-2 sm:text-sm"
            >
              <Users class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden lg:inline">{{ t("community") }}</span>
            </button>

            <!-- Show Back to App if user has recommendations, otherwise show Get Started -->
            <button
              v-if="hasRecommendations"
              @click="goToRecommendations"
              class="px-2 py-1.5 bg-white/70 text-gray-700 rounded-lg font-medium hover:bg-white transition-all duration-200 border border-gray-200/50 text-xs dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700/50 sm:px-3 sm:py-2 sm:text-sm flex items-center space-x-1"
            >
              <Home class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden lg:inline">{{ t("backToApp") }}</span>
            </button>

            <!-- Show Login button if user doesn't have recommendations -->
            <button
              v-else
              @click="goToRecommendations"
              class="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              {{ t("getStarted") }}
            </button>
          </template>

          <!-- Recommendations Page: Show Community button -->
          <template v-else-if="isOnRecommendations">
            <button
              @click="goToCommunity"
              class="px-2 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-1 text-xs sm:px-3 sm:py-2 sm:text-sm"
            >
              <Users class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden lg:inline">{{ t("community") }}</span>
            </button>
          </template>

          <!-- Community Page: Show Back to App button -->
          <template v-else-if="isOnCommunity">
            <button
              @click="goToLanding"
              class="px-2 py-1.5 bg-white/70 text-gray-700 rounded-lg font-medium hover:bg-white transition-all duration-200 border border-gray-200/50 text-xs dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700/50 sm:px-3 sm:py-2 sm:text-sm flex items-center space-x-1"
            >
              <Home class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden lg:inline">{{ t("backToApp") }}</span>
            </button>
          </template>

          <!-- Settings Menu - Always show on top right -->
          <div class="relative menu-container">
            <button
              @click="toggleMenu"
              class="p-2 bg-white/70 text-gray-700 rounded-lg font-medium hover:bg-white transition-all duration-200 border border-gray-200/50 dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700/50 cursor-pointer"
              type="button"
            >
              <Menu v-if="!isMenuOpen" class="h-4 w-4 pointer-events-none" />
              <X v-else class="h-4 w-4 pointer-events-none" />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isMenuOpen"
              class="absolute right-0 top-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-3 min-w-[100px] z-50"
            >
              <div class="flex items-center justify-between space-x-4">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
