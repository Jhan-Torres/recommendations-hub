<script setup lang="ts">
import { computed } from "vue";
import AppHeader from "../../../shared/ui/AppHeader.vue";
import { useTranslations } from "../../../shared/hooks/useTranslations";
import { useAuth } from "../composables/useAuth";
import { User, Mail, Calendar, Settings } from "lucide-vue-next";

const { t } = useTranslations();
const { user, isAuthenticated } = useAuth();

const joinDate = computed(() => {
  if (user.value?.createdAt) {
    return new Date(user.value.createdAt).toLocaleDateString();
  }
  return new Date().toLocaleDateString();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800"
  >
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Profile
        </h1>
        <p class="text-gray-600 dark:text-gray-400">Settings</p>
      </div>

      <!-- Profile Content -->
      <div v-if="isAuthenticated && user" class="max-w-4xl mx-auto">
        <!-- Profile Card -->
        <div
          class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 mb-8"
        >
          <div class="flex items-center space-x-6 mb-6">
            <!-- Avatar -->
            <div
              class="h-20 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center"
            >
              <User class="h-10 w-10 text-white" />
            </div>

            <!-- User Info -->
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ user.name }}
              </h2>
              <div
                class="flex items-center text-gray-600 dark:text-gray-400 space-x-4"
              >
                <div class="flex items-center space-x-2">
                  <Mail class="h-4 w-4" />
                  <span>{{ user.email }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Calendar class="h-4 w-4" />
                  <span>Joined {{ joinDate }}</span>
                </div>
              </div>
            </div>

            <!-- Edit Button -->
            <button
              class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2"
            >
              <Settings class="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        <!-- Statistics Grid -->
        <div class="grid gap-6 md:grid-cols-3 mb-8">
          <!-- Recommendations Count -->
          <div
            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <div class="text-center">
              <div
                class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2"
              >
                0
              </div>
              <div class="text-gray-600 dark:text-gray-400">
                {{ t("recommendations") }}
              </div>
            </div>
          </div>

          <!-- Watch List Count -->
          <div
            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <div class="text-center">
              <div
                class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2"
              >
                0
              </div>
              <div class="text-gray-600 dark:text-gray-400">Watch List</div>
            </div>
          </div>

          <!-- Community Posts -->
          <div
            class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <div class="text-center">
              <div
                class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
              >
                0
              </div>
              <div class="text-gray-600 dark:text-gray-400">
                Community Posts
              </div>
            </div>
          </div>
        </div>

        <!-- Account Settings -->
        <div
          class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Account Settings
          </h3>

          <div class="space-y-4">
            <div
              class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-600"
            >
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Receive email updates
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>

            <div
              class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-600"
            >
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">
                  Private Profile
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Make profile private
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Not Authenticated State -->
      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto">
          <User class="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Login Required
          </h3>
          <p class="text-gray-600 dark:text-gray-400">Login to view profile</p>
        </div>
      </div>
    </main>
  </div>
</template>
