<script setup lang="ts">
import { Users, ArrowLeft } from "lucide-vue-next";
import ThemeToggle from "./ThemeToggle.vue";
import LanguageSelector from "./LanguageSelector.vue";
import { useTranslations } from "../hooks/useTranslations";

interface Props {
  showCommunityButton?: boolean;
  showGetStartedButton?: boolean;
  showReturnButton?: boolean;
  hasRecommendations?: boolean;
}

interface Emits {
  (e: "show-community"): void;
  (e: "get-started"): void;
  (e: "return-to-app"): void;
}

withDefaults(defineProps<Props>(), {
  showCommunityButton: true,
  showGetStartedButton: true,
  showReturnButton: false,
  hasRecommendations: false,
});

defineEmits<Emits>();

const { t } = useTranslations();
</script>

<template>
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
            v-if="showCommunityButton"
            @click="$emit('show-community')"
            class="px-2 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-1 text-xs sm:px-3 sm:py-2 sm:text-sm"
          >
            <Users class="h-3 w-3 sm:h-4 sm:w-4" />
            <span class="hidden lg:inline">{{ t("community") }}</span>
          </button>

          <button
            v-if="showGetStartedButton"
            @click="$emit('get-started')"
            class="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-xs sm:px-4 sm:py-2 sm:text-sm"
          >
            {{ hasRecommendations ? t("continueUsing") : t("getStarted") }}
          </button>

          <!-- Return to App Button (only show if user has recommendations) -->
          <button
            v-if="showReturnButton && hasRecommendations"
            @click="$emit('return-to-app')"
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
</template>
