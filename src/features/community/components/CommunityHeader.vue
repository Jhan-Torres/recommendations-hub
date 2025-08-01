<script setup lang="ts">
import { Sparkles } from "lucide-vue-next";
import { useTranslations } from "../../../shared/hooks/useTranslations";

const { t } = useTranslations();
</script>

<template>
  <section class="text-center mb-8 sm:mb-12">
    <div
      class="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100/90 dark:bg-purple-900/50 backdrop-blur-sm rounded-full text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-purple-200/50 dark:border-purple-700/50"
    >
      <Sparkles class="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
      {{ t("discoverTogether") }}
    </div>
    <h2
      class="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
    >
      {{ t("communityTitle") }}
    </h2>
    <p
      class="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
    >
      {{ t("communityDescription") }}
    </p>
  </section>
</template>
