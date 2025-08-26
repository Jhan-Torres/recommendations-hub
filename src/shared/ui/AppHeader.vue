<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Users,
  Home,
  ChevronDown,
  X,
  UserPlus,
  User,
  LogOut,
} from "lucide-vue-next";
import ThemeToggle from "./ThemeToggle.vue";
import LanguageSelector from "./LanguageSelector.vue";
import { useTranslations } from "../hooks/useTranslations";
import { useAuth } from "../../features/auth/composables/useAuth";
import AuthContainer from "../../features/auth/components/AuthContainer.vue";

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
const { user, isAuthenticated, logout } = useAuth();

// Menu state
const isMenuOpen = ref(false);
const showAuthModal = ref(false);
const authMode = ref<"login" | "signup">("login");

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

// Auth functions
const openGetStartedModal = () => {
  authMode.value = "signup"; // Start with signup for new users
  showAuthModal.value = true;
};

const closeAuthModal = () => {
  showAuthModal.value = false;
};

const handleLogout = async () => {
  try {
    await logout();
    isMenuOpen.value = false;
    // Redirect to landing page after logout
    if (route.name !== "Landing") {
      router.push("/");
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// Navigation functions
const goToLanding = () => router.push("/");
const goToRecommendations = () => router.push("/vlur-app");
const goToCommunity = () => router.push("/vlur-community");

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

            <!-- Show Back to App if user is authenticated or has recommendations -->
            <button
              v-if="isAuthenticated || hasRecommendations"
              @click="goToRecommendations"
              class="px-2 py-1.5 bg-white/70 text-gray-700 rounded-lg font-medium hover:bg-white transition-all duration-200 border border-gray-200/50 text-xs dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700/50 sm:px-3 sm:py-2 sm:text-sm flex items-center space-x-1"
            >
              <Home class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden lg:inline">{{ t("backToApp") }}</span>
            </button>

            <!-- Show Auth buttons if user is not authenticated -->
            <template v-else>
              <button
                @click="openGetStartedModal"
                class="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-xs sm:px-4 sm:py-2 sm:text-sm flex items-center space-x-1"
              >
                <UserPlus class="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{{ t("getStarted") }}</span>
              </button>
            </template>
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
              @click="goToRecommendations"
              class="px-2 py-1.5 bg-white/70 text-gray-700 rounded-lg font-medium hover:bg-white transition-all duration-200 border border-gray-200/50 text-xs dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700/50 sm:px-3 sm:py-2 sm:text-sm flex items-center space-x-1"
            >
              <Home class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden lg:inline">{{ t("backToApp") }}</span>
            </button>
          </template>

          <!-- User Menu (when authenticated) or Settings Menu -->
          <div class="relative menu-container">
            <button
              @click="toggleMenu"
              class="p-2 bg-white/70 text-gray-700 rounded-lg font-medium hover:bg-white transition-all duration-200 border border-gray-200/50 dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700/50 cursor-pointer flex items-center space-x-2"
              type="button"
            >
              <User v-if="isAuthenticated" class="h-4 w-4" />
              <span
                v-if="isAuthenticated && user"
                class="hidden sm:inline text-sm"
              >
                {{ user.name }}
              </span>
              <ChevronDown
                v-if="!isMenuOpen"
                class="h-4 w-4 pointer-events-none"
              />
              <X v-else class="h-4 w-4 pointer-events-none" />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isMenuOpen"
              class="absolute right-0 top-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-3 min-w-[150px] z-50"
            >
              <!-- Authenticated User Menu -->
              <div v-if="isAuthenticated" class="space-y-2">
                <div
                  class="flex items-center justify-between space-x-4 pb-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <LanguageSelector />
                  <ThemeToggle />
                </div>

                <button
                  @click="handleLogout"
                  class="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut class="h-4 w-4" />
                  <span>{{ t("logout") }}</span>
                </button>
              </div>

              <!-- Guest User Menu -->
              <div v-else class="space-y-2">
                <div class="flex items-center justify-between space-x-4">
                  <LanguageSelector />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Auth Modal -->
  <AuthContainer
    :show="showAuthModal"
    :initial-mode="authMode"
    @close="closeAuthModal"
  />
</template>
