<script setup lang="ts">
import { Sparkles, Play, BookOpen, Users, ArrowRight } from "lucide-vue-next";
import { useTranslations } from "../../../shared/hooks/useTranslations";

interface Props {
  hasRecommendations: boolean;
}

interface Emits {
  (e: "get-started"): void;
  (e: "show-community"): void;
  (e: "scroll-to-features"): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { t } = useTranslations();
</script>

<template>
  <section
    class="relative overflow-hidden min-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex items-center"
  >
    <!-- Animated Background -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"
    ></div>

    <!-- Animated Gradient Orbs -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-20 dark:opacity-10 animate-float"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-20 dark:opacity-10 animate-float-reverse"
      ></div>
      <div
        class="absolute top-20 left-1/2 transform -translate-x-1/2 w-60 h-60 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-15 dark:opacity-8 animate-float-slow"
      ></div>
    </div>

    <!-- Moving Particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full opacity-60 animate-particle-1"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-3 h-3 bg-indigo-500 rounded-full opacity-40 animate-particle-2"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-500 rounded-full opacity-50 animate-particle-3"
      ></div>
      <div
        class="absolute top-2/3 right-1/3 w-2 h-2 bg-cyan-500 rounded-full opacity-60 animate-particle-4"
      ></div>
      <div
        class="absolute bottom-1/3 right-1/5 w-3 h-3 bg-pink-500 rounded-full opacity-40 animate-particle-5"
      ></div>
    </div>

    <div class="container-main w-full relative z-10">
      <div class="text-center py-4 sm:py-8">
        <div
          class="inline-flex items-center px-3 py-2 bg-blue-100/90 backdrop-blur-sm rounded-full text-blue-600 text-xs font-medium mb-2 border border-blue-200/50 animate-border-glow dark:bg-blue-900/50 dark:text-blue-400 dark:border-blue-700/50 sm:px-6 sm:text-sm sm:mb-4"
        >
          <Sparkles class="h-3 w-3 mr-2 animate-sparkle sm:h-5 sm:w-5" />
          {{ hasRecommendations ? t("welcomeBack") : t("heroTag") }}
        </div>

        <h1
          class="text-hero text-gray-900 mb-2 leading-tight drop-shadow-sm dark:text-white sm:mb-4"
        >
          {{ hasRecommendations ? t("welcomeBackTitle") : t("heroTitle") }}
          <span
            class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block"
          >
            {{ t("heroSubtitle") }}
          </span>
        </h1>

        <p
          class="text-subtitle text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed drop-shadow-sm px-4 dark:text-gray-300 sm:mb-8"
        >
          {{
            hasRecommendations
              ? t("welcomeBackDescription")
              : t("heroDescription")
          }}
        </p>

        <div
          class="btn-group-vertical justify-center items-center px-4 mb-4 sm:mb-8"
        >
          <button
            @click="$emit('get-started')"
            class="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-base hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-xl backdrop-blur-sm flex items-center justify-center sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            <component
              :is="hasRecommendations ? ArrowRight : Play"
              class="h-4 w-4 mr-2 sm:h-5 sm:w-5"
            />
            {{ hasRecommendations ? t("continueJourney") : t("startNow") }}
          </button>
          <button
            @click="$emit('show-community')"
            class="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-base hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-xl backdrop-blur-sm flex items-center justify-center sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            <Users class="h-4 w-4 mr-2 sm:h-5 sm:w-5" />
            {{ t("exploreCommunity") }}
          </button>
          <button
            @click="$emit('scroll-to-features')"
            class="w-full px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-semibold text-base hover:bg-white/90 transition-all duration-200 border border-gray-200/50 shadow-lg flex items-center justify-center dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800/90 dark:border-gray-700/50 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            <BookOpen class="h-4 w-4 mr-2 sm:h-5 sm:w-5" />
            {{ t("learnMore") }}
          </button>
        </div>

        <!-- Community Stats for all users -->
        <div
          class="grid grid-cols-1 gap-3 max-w-2xl mx-auto px-4 sm:grid-cols-3 sm:gap-4"
        >
          <div class="card-primary">
            <div
              class="text-xl font-bold text-purple-600 dark:text-purple-400 sm:text-2xl"
            >
              2.5K+
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              {{ t("communityMembers") }}
            </div>
          </div>
          <div class="card-primary">
            <div
              class="text-xl font-bold text-indigo-600 dark:text-indigo-400 sm:text-2xl"
            >
              15K+
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              {{ t("sharedRecommendations") }}
            </div>
          </div>
          <div class="card-primary">
            <div
              class="text-xl font-bold text-cyan-600 dark:text-cyan-400 sm:text-2xl"
            >
              4.8★
            </div>
            <div class="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              {{ t("communityRating") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
