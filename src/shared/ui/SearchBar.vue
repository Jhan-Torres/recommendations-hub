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
      class="input-primary pl-10"
    />
  </div>
</template>
