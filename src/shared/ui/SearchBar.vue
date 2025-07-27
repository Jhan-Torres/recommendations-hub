<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { useTranslations } from "../hooks/useTranslations";

const { t } = useTranslations();

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <div class="relative w-full sm:w-64">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
    >
      <Search class="h-4 w-4 text-gray-400" />
    </div>
    <input
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      type="text"
      :placeholder="t('searchPlaceholder')"
      class="pl-10 pr-4 py-2 w-full bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 text-sm sm:text-base"
    />
  </div>
</template>
