<script setup lang="ts">
import { Users, TrendingUp, Heart, Bookmark } from "lucide-vue-next";
import { useTranslations } from "../../../shared/hooks/useTranslations";

interface Emits {
  (e: "show-community"): void;
}

defineEmits<Emits>();

const { t } = useTranslations();

// Community features data
const communityFeatures = [
  {
    key: "trending",
    icon: TrendingUp,
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    titleKey: "discoverTrending",
    descKey: "discoverTrendingDesc",
    animationClass: "animate-feature-border-1",
  },
  {
    key: "passion",
    icon: Heart,
    iconBg: "bg-pink-100 dark:bg-pink-900/50",
    iconColor: "text-pink-600 dark:text-pink-400",
    titleKey: "sharePassion",
    descKey: "sharePassionDesc",
    animationClass: "animate-feature-border-2",
  },
  {
    key: "save",
    icon: Bookmark,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    titleKey: "saveForLater",
    descKey: "saveForLaterDesc",
    animationClass: "animate-feature-border-3",
  },
];
</script>

<template>
  <section
    class="section-padding bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20"
  >
    <div class="container-main">
      <div class="text-center content-spacing">
        <div
          class="inline-flex items-center px-3 py-2 bg-purple-100/90 backdrop-blur-sm rounded-full text-purple-600 text-xs font-medium mb-4 border border-purple-200/50 dark:bg-purple-900/50 dark:text-purple-400 dark:border-purple-700/50 sm:px-4 sm:text-sm sm:mb-6"
        >
          <Users class="h-3 w-3 mr-2 sm:h-4 sm:w-4" />
          {{ t("joinCommunity") }}
        </div>
        <h2 class="heading-primary">
          {{ t("communityHighlightTitle") }}
        </h2>
        <p
          class="text-subtitle text-gray-600 max-w-2xl mx-auto mb-8 dark:text-gray-300"
        >
          {{ t("communityHighlightDescription") }}
        </p>
        <button @click="$emit('show-community')" class="btn-purple">
          <Users class="inline h-4 w-4 mr-2 sm:h-5 sm:w-5" />
          {{ t("exploreCommunity") }}
        </button>
      </div>

      <!-- Community Features Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3 sm:gap-8">
        <div
          v-for="feature in communityFeatures"
          :key="feature.key"
          :class="feature.animationClass"
          class="card-primary text-center"
        >
          <div :class="feature.iconBg" class="icon-container-md mx-auto mb-4">
            <component
              :is="feature.icon"
              :class="feature.iconColor"
              class="h-6 w-6 sm:h-8 sm:w-8"
            />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2 dark:text-white">
            {{ t(feature.titleKey as any) }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ t(feature.descKey as any) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
