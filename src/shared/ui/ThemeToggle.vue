<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import { useTheme } from "../hooks/useTheme";
import { useTranslations } from "../hooks/useTranslations";

const { isDark, toggleTheme } = useTheme();
const { t } = useTranslations();
</script>

<template>
  <button
    @click="toggleTheme"
    class="p-1.5 rounded-lg bg-white/70 border border-gray-200/50 hover:bg-white transition-all duration-200 dark:bg-gray-800/70 dark:border-gray-700/50 dark:hover:bg-gray-800 sm:p-2"
    :title="isDark ? t('switchToLight') : t('switchToDark')"
  >
    <Sun v-if="isDark" class="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />
    <Moon v-else class="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
  </button>
</template>
