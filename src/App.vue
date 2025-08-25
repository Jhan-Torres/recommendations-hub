<script setup lang="ts">
import { watch, onMounted } from "vue";
import { useTheme } from "./shared/hooks/useTheme";
import { useLanguage } from "./shared/hooks/useLanguage";
import { useTranslations } from "./shared/hooks/useTranslations";
import { useAuth } from "./features/auth/composables/useAuth";

const { isDark } = useTheme();
const { currentLanguage } = useLanguage();
const { t } = useTranslations();
const { initializeAuth } = useAuth();

// Update document title when language changes
const updateDocumentTitle = () => {
  document.title = t.value("documentTitle");
};

onMounted(async () => {
  updateDocumentTitle();

  // Initialize authentication state from localStorage
  await initializeAuth();
});

watch(currentLanguage, () => {
  updateDocumentTitle();
});
</script>

<template>
  <div
    id="app"
    class="min-h-screen transition-colors duration-200"
    :class="isDark ? 'dark' : ''"
  >
    <main
      class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      <RouterView />
    </main>
  </div>
</template>

<style>
@import "./index.css";
</style>
