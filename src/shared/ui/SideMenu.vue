<template>
  <div v-if="isOpen" class="fixed inset-0 z-50" @click="closeMenu">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Side Menu -->
    <aside
      @click.stop
      class="fixed left-0 top-0 h-full w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 transform transition-transform duration-300 ease-in-out flex flex-col"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Header -->
      <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img
              src="/vlur-logo.webp"
              alt="Vlur Logo"
              class="h-8 w-8 object-cover rounded-full"
            />
          </div>
          <button
            @click="closeMenu"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X class="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <!-- User Profile Section -->
      <div
        v-if="isAuthenticated && user"
        class="p-4 border-b border-gray-200/50 dark:border-gray-700/50"
      >
        <div class="flex items-center space-x-3">
          <div
            class="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center"
          >
            <User class="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 class="font-medium text-gray-900 dark:text-white">
              {{ user.name }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ user.email }}
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <!-- My Profile -->
          <li v-if="isAuthenticated">
            <button
              @click="navigateTo('/profile')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              :class="{
                'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400':
                  currentRoute === '/profile',
              }"
            >
              <UserCircle class="h-5 w-5" />
              <span>Profile</span>
            </button>
          </li>

          <!-- Recommendations -->
          <li>
            <button
              @click="navigateTo('/recommendations')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              :class="{
                'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400':
                  currentRoute === '/recommendations',
              }"
            >
              <Star class="h-5 w-5" />
              <span>Recommendations</span>
            </button>
          </li>

          <!-- Watch List -->
          <li>
            <button
              @click="navigateTo('/watch-list')"
              class="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              :class="{
                'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400':
                  currentRoute === '/watch-list',
              }"
            >
              <Clock class="h-5 w-5" />
              <span>Watch List</span>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Settings -->
      <div class="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >Settings</span
          >
          <div class="flex items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>

        <!-- Login (if not authenticated) -->
        <button
          v-if="!isAuthenticated"
          @click="openAuthModal"
          class="w-full flex items-center space-x-3 px-3 py-2 text-left text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <LogIn class="h-5 w-5" />
          <span>{{ t("login") }}</span>
        </button>
      </div>

      <!-- Logout (at bottom) -->
      <div
        v-if="isAuthenticated"
        class="p-4 border-t border-gray-200/50 dark:border-gray-700/50 mt-auto"
      >
        <button
          @click="handleLogout"
          class="w-full flex items-center space-x-3 px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut class="h-5 w-5" />
          <span>{{ t("logout") }}</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  X,
  User,
  UserCircle,
  Star,
  Clock,
  LogOut,
  LogIn,
} from "lucide-vue-next";
import { useTranslations } from "../hooks/useTranslations";
import { useAuth } from "../../features/auth/composables/useAuth";
import ThemeToggle from "./ThemeToggle.vue";
import LanguageSelector from "./LanguageSelector.vue";

interface Props {
  isOpen: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
  openAuth: [];
}>();

const { t } = useTranslations();
const route = useRoute();
const router = useRouter();
const { user, isAuthenticated, logout } = useAuth();

const currentRoute = computed(() => route.path);

const closeMenu = () => {
  emit("close");
};

const navigateTo = (path: string) => {
  router.push(path);
  emit("close");
};

const handleLogout = async () => {
  try {
    await logout();
    emit("close");
    // Redirect to landing page after logout
    if (route.name !== "Landing") {
      router.push("/");
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const openAuthModal = () => {
  emit("openAuth");
  emit("close");
};
</script>
