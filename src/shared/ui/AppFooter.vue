<script setup lang="ts">
import { useTranslations } from "../hooks/useTranslations";

const { t } = useTranslations();
</script>

<template>
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
        <div class="text-gray-400 text-xs text-center sm:text-sm md:text-left">
          {{ t("footerText") }}
        </div>
      </div>
    </div>
  </footer>
</template>
