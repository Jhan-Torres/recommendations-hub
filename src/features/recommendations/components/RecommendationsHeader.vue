<script setup lang="ts">
import { Users } from "lucide-vue-next";
import LanguageSelector from "../../../shared/ui/LanguageSelector.vue";
import ThemeToggle from "../../../shared/ui/ThemeToggle.vue";
import { useTranslations } from "../../../shared/hooks/useTranslations";

interface Emits {
  (e: "show-community"): void;
  (e: "back-to-landing"): void;
}

defineEmits<Emits>();

const { t } = useTranslations();
</script>

<template>
  <header
    class="bg-white/80 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-50 dark:bg-gray-900/80 dark:border-gray-700/60"
  >
    <div class="max-w-7xl mx-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2 sm:space-x-3">
          <img
            src="/vlur-logo.webp"
            alt="Vlur Logo"
            class="h-8 w-8 object-cover rounded-full sm:h-10 sm:w-10"
          />
          <h1
            class="text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent sm:text-lg lg:text-xl"
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
            @click="$emit('back-to-landing')"
            class="px-2 py-1.5 bg-white/70 text-gray-700 rounded-lg font-medium hover:bg-white transition-all duration-200 border border-gray-200/50 text-xs dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700/50 sm:px-3 sm:py-2 sm:text-sm"
          >
            {{ t("backToHome") }}
          </button>
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </div>
  </header>
</template>
