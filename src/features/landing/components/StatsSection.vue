<script setup lang="ts">
import { Film, Palette, Globe, Star } from "lucide-vue-next";
import { useTranslations } from "../../../shared/hooks/useTranslations";

const { t } = useTranslations();

const statsData = [
  {
    key: "categories",
    icon: Film,
    iconBg: "bg-green-100 dark:bg-green-900/50",
    iconColor: "text-green-600 dark:text-green-400",
    number: "3",
    labelKey: "statCategories",
  },
  {
    key: "genres",
    icon: Palette,
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    number: "12",
    labelKey: "statGenres",
  },
  {
    key: "languages",
    icon: Globe,
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    number: "2",
    labelKey: "statLanguages",
  },
  {
    key: "ratings",
    icon: Star,
    iconBg: "bg-yellow-100 dark:bg-yellow-900/50",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    number: "5",
    labelKey: "statRatings",
  },
];
</script>

<template>
  <section class="section-padding">
    <div class="container-main">
      <div class="text-center content-spacing">
        <h2 class="heading-primary">
          {{ t("statsTitle") }}
        </h2>
      </div>

      <div class="grid-stats">
        <div
          v-for="stat in statsData"
          :key="stat.key"
          class="text-center card-primary"
        >
          <div
            :class="stat.iconBg"
            class="icon-container-md mx-auto mb-3 sm:mb-4"
          >
            <component
              :is="stat.icon"
              :class="stat.iconColor"
              class="h-6 w-6 sm:h-8 sm:w-8"
            />
          </div>
          <div
            class="text-2xl font-bold text-gray-900 mb-1 dark:text-white sm:text-3xl sm:mb-2"
          >
            {{ stat.number }}
          </div>
          <div
            class="text-xs text-gray-600 font-medium dark:text-gray-300 sm:text-base"
          >
            {{ t(stat.labelKey as any) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
