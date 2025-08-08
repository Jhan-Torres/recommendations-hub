<script setup lang="ts">
import { Star, Search, Smartphone, Shield } from "lucide-vue-next";
import { useTranslations } from "../../../shared/hooks/useTranslations";

const { t } = useTranslations();

// Static data that doesn't need translation keys
const featuresData = [
  {
    key: "organize",
    icon: Star,
    iconBg: "bg-yellow-100 dark:bg-yellow-900/50",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    titleKey: "featureOrganizeTitle",
    descKey: "featureOrganizeDesc",
    animationClass: "animate-feature-border-1",
  },
  {
    key: "search",
    icon: Search,
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleKey: "featureSearchTitle",
    descKey: "featureSearchDesc",
    animationClass: "animate-feature-border-2",
  },
  {
    key: "responsive",
    icon: Smartphone,
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleKey: "featureResponsiveTitle",
    descKey: "featureResponsiveDesc",
    animationClass: "animate-feature-border-3",
  },
  {
    key: "secure",
    icon: Shield,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    titleKey: "featureSecureTitle",
    descKey: "featureSecureDesc",
    animationClass: "animate-feature-border-4",
  },
];
</script>

<template>
  <section
    id="features"
    class="section-padding bg-white/50 dark:bg-gray-800/50"
  >
    <div class="container-main">
      <div class="text-center content-spacing">
        <h2 class="heading-primary">
          {{ t("featuresTitle") }}
        </h2>
        <p
          class="text-subtitle text-gray-600 max-w-2xl mx-auto dark:text-gray-300"
        >
          {{ t("featuresDescription") }}
        </p>
      </div>

      <div class="grid-features">
        <div
          v-for="feature in featuresData"
          :key="feature.key"
          :class="feature.animationClass"
          class="card-primary card-hover group"
        >
          <div
            :class="feature.iconBg"
            class="icon-container-md mb-4 group-hover:scale-110 transition-transform duration-300 sm:mb-6"
          >
            <component
              :is="feature.icon"
              :class="feature.iconColor"
              class="h-6 w-6 sm:h-8 sm:w-8"
            />
          </div>
          <h3 class="heading-secondary">
            {{ t(feature.titleKey as any) }}
          </h3>
          <p class="text-body">
            {{ t(feature.descKey as any) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
