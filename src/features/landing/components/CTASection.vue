<script setup lang="ts">
import { Users, ArrowRight, Zap } from "lucide-vue-next";
import { useTranslations } from "../../../shared/hooks/useTranslations";

interface Props {
  hasRecommendations: boolean;
}

interface Emits {
  (e: "get-started"): void;
  (e: "show-community"): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { t } = useTranslations();
</script>

<template>
  <section class="section-padding bg-gradient-to-r from-blue-500 to-indigo-500">
    <div class="container-content text-center">
      <h2 class="text-2xl font-bold text-white mb-4 sm:text-4xl sm:mb-6">
        {{ hasRecommendations ? t("readyToContinue") : t("ctaTitle") }}
      </h2>
      <p
        class="text-base text-blue-100 mb-8 leading-relaxed sm:text-xl sm:mb-10"
      >
        {{
          hasRecommendations ? t("continueDescription") : t("ctaDescription")
        }}
      </p>
      <div class="btn-group-vertical justify-center items-center">
        <button
          @click="$emit('get-started')"
          class="w-full px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold text-base hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-xl sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
        >
          <component
            :is="hasRecommendations ? ArrowRight : Zap"
            class="inline h-4 w-4 mr-2 sm:h-5 sm:w-5"
          />
          {{ hasRecommendations ? t("backToRecommendations") : t("startFree") }}
        </button>
        <button
          @click="$emit('show-community')"
          class="w-full px-8 py-3 bg-white/20 text-white border border-white/30 rounded-xl font-semibold text-base hover:bg-white/30 transform hover:scale-105 transition-all duration-200 shadow-xl backdrop-blur-sm sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
        >
          <Users class="inline h-4 w-4 mr-2 sm:h-5 sm:w-5" />
          {{ t("joinCommunity") }}
        </button>
      </div>
    </div>
  </section>
</template>
