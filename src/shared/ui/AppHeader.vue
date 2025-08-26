<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Home, ChevronDown, X, UserPlus, User, Menu } from "lucide-vue-next";
import ThemeToggle from "./ThemeToggle.vue";
import LanguageSelector from "./LanguageSelector.vue";
import SideMenu from "./SideMenu.vue";
import { useTranslations } from "../hooks/useTranslations";
import { useAuth } from "../../features/auth/composables/useAuth";
import AuthContainer from "../../features/auth/components/AuthContainer.vue";

interface Props {
  hasRecommendations?: boolean;
  hasWatchListItems?: boolean;
  showMenu?: boolean;
}

withDefaults(defineProps<Props>(), {
  hasRecommendations: false,
  hasWatchListItems: false,
  showMenu: false,
});

const { t } = useTranslations();
const route = useRoute();
const router = useRouter();
const { user, isAuthenticated } = useAuth();

// Menu state
const isMenuOpen = ref(false);
const isSideMenuOpen = ref(false);
const showAuthModal = ref(false);
const authMode = ref<"login" | "signup">("login");

// Toggle menu function
const toggleMenu = (event: Event) => {
  event.stopPropagation();
  if (isAuthenticated.value) {
    isSideMenuOpen.value = !isSideMenuOpen.value;
  } else {
    isMenuOpen.value = !isMenuOpen.value;
  }
};

// Close menus
const closeSideMenu = () => {
  isSideMenuOpen.value = false;
};

const openAuthFromSideMenu = () => {
  authMode.value = "login";
  showAuthModal.value = true;
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

// Navigation functions
const goToLanding = () => router.push("/");
const goToRecommendations = () => router.push("/recommendations");

// Computed properties to determine which buttons to show
const isOnLanding = computed(() => route.name === "Landing");
const isOnCommunity = computed(() => route.name === "Community");
</script>

<template>
  <header class="header-nav">
    <div class="container-main">
      <div class="header-container">
        <div class="flex items-center space-x-2 sm:space-x-3">
          <!-- Hamburger Menu Button (when authenticated) -->
          <button
            v-if="isAuthenticated"
            @click="toggleMenu"
            class="p-2 bg-white/70 text-gray-700 rounded-lg font-medium hover:bg-white transition-all duration-200 border border-gray-200/50 dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700/50 cursor-pointer"
            type="button"
            :title="`Menu ${user?.name ? '- ' + user.name : ''}`"
          >
            <Menu class="h-5 w-5" />
          </button>

          <!-- App Name/Logo -->
          <button
            @click="goToLanding"
            class="px-3 py-2 hover:scale-105 transition-all duration-300"
          >
            <!-- App Name Text with animated gradient -->
            <h1
              class="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent sm:text-xl md:text-2xl lg:text-3xl bg-[length:200%_100%] animate-gradient"
            >
              {{ t("appName") }}
            </h1>
          </button>
        </div>

        <div class="flex items-center space-x-1 sm:space-x-2">
          <!-- Landing Page: Show Get Started button if not authenticated, or Back to App if has recommendations -->
          <template v-if="isOnLanding">
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

          <!-- Other Pages: Show Back to App button if on Community page -->
          <template v-else-if="isOnCommunity">
            <button
              @click="goToRecommendations"
              class="px-2 py-1.5 bg-white/70 text-gray-700 rounded-lg font-medium hover:bg-white transition-all duration-200 border border-gray-200/50 text-xs dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700/50 sm:px-3 sm:py-2 sm:text-sm flex items-center space-x-1"
            >
              <Home class="h-3 w-3 sm:h-4 sm:w-4" />
              <span class="hidden lg:inline">{{ t("backToApp") }}</span>
            </button>
          </template>

          <!-- Authenticated User Section -->
          <template v-if="isAuthenticated">
            <!-- User Profile Section -->
            <div
              v-if="user"
              class="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/70 text-gray-700 rounded-lg border border-gray-200/50 dark:bg-gray-800/70 dark:text-gray-300 dark:border-gray-700/50"
            >
              <User class="h-4 w-4" />
              <span class="text-sm font-medium">
                {{ user.name }}
              </span>
            </div>
          </template>

          <!-- Guest Menu (when not authenticated) -->
          <div v-else class="relative menu-container">
            <button
              @click="toggleMenu"
              class="p-2 bg-white/70 text-gray-700 rounded-lg font-medium hover:bg-white transition-all duration-200 border border-gray-200/50 dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700/50 cursor-pointer flex items-center space-x-2"
              type="button"
            >
              <User class="h-4 w-4" />
              <ChevronDown
                v-if="!isMenuOpen"
                class="h-4 w-4 pointer-events-none"
              />
              <X v-else class="h-4 w-4 pointer-events-none" />
            </button>

            <!-- Dropdown Menu (only for guests) -->
            <div
              v-if="isMenuOpen"
              class="absolute right-0 top-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-3 min-w-[150px] z-50"
            >
              <div class="space-y-2">
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

  <!-- Side Menu (for authenticated users) -->
  <SideMenu
    :is-open="isSideMenuOpen"
    @close="closeSideMenu"
    @open-auth="openAuthFromSideMenu"
  />

  <!-- Auth Modal -->
  <AuthContainer
    :show="showAuthModal"
    :initial-mode="authMode"
    @close="closeAuthModal"
  />
</template>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  animation: gradient 4s ease-in-out infinite;
}
</style>
