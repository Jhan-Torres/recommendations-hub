<script setup lang="ts">
import { ref, computed } from "vue";
import { Globe, ChevronDown, Check } from "lucide-vue-next";
import { useLanguage, type Language } from "../hooks/useLanguage";
import { useTranslations } from "../hooks/useTranslations";

const { currentLanguage, setLanguage } = useLanguage();
const { t } = useTranslations();

const isOpen = ref(false);

const languageOptions = computed(() => [
  { code: "en" as Language, name: t.value("english"), flag: "🇺🇸" },
  { code: "es" as Language, name: t.value("spanish"), flag: "🇪🇸" },
]);

const selectLanguage = (lang: Language) => {
  setLanguage(lang);
  isOpen.value = false;
};
</script>

<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
      :title="t('language')"
    >
      <Globe class="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
      <span
        class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 uppercase"
      >
        {{ currentLanguage }}
      </span>
      <ChevronDown
        :class="[
          'h-3 w-3 sm:h-4 sm:w-4 text-gray-500 transition-transform duration-200',
          isOpen ? 'rotate-180' : '',
        ]"
      />
    </button>

    <!-- Dropdown Menu -->
    <nav
      v-if="isOpen"
      class="absolute right-0 mt-2 w-36 sm:w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm z-50"
    >
      <div class="py-1">
        <button
          v-for="lang in languageOptions"
          :key="lang.code"
          @click="selectLanguage(lang.code)"
          :class="[
            'w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm transition-colors duration-200 flex items-center space-x-2 sm:space-x-3',
            currentLanguage === lang.code
              ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50',
          ]"
        >
          <span class="text-base sm:text-lg">{{ lang.flag }}</span>
          <span>{{ lang.name }}</span>
          <Check
            v-if="currentLanguage === lang.code"
            class="h-3 w-3 sm:h-4 sm:w-4 ml-auto text-purple-600 dark:text-purple-400"
          />
        </button>
      </div>
    </nav>
  </div>

  <!-- Click outside to close -->
  <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 z-40"></div>
</template>
