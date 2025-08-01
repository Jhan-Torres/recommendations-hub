<script setup lang="ts">
import { computed } from "vue";
import { BarChart3, Film, Tv, Sparkles } from "lucide-vue-next";
import StatsCard from "../../../shared/ui/StatsCard.vue";
import { useTranslations } from "../../../shared/hooks/useTranslations";
import type { Recommendation } from "../model";

interface Props {
  recommendations: Recommendation[];
}

const props = defineProps<Props>();
const { t } = useTranslations();

const filmCount = computed(
  () => props.recommendations.filter((r) => r.category === "film").length
);
const seriesCount = computed(
  () => props.recommendations.filter((r) => r.category === "series").length
);
const animeCount = computed(
  () => props.recommendations.filter((r) => r.category === "anime").length
);

// Stats cards data
const statsCards = computed(() => [
  {
    label: t.value("total"),
    value: props.recommendations.length,
    icon: BarChart3,
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: t.value("films"),
    value: filmCount.value,
    icon: Film,
    iconBg: "bg-green-100 dark:bg-green-900/50",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    label: t.value("series"),
    value: seriesCount.value,
    icon: Tv,
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    label: t.value("anime"),
    value: animeCount.value,
    icon: Sparkles,
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
]);
</script>

<template>
  <section class="grid grid-cols-2 gap-3 mb-6 lg:grid-cols-4 sm:gap-4 sm:mb-8">
    <StatsCard
      v-for="card in statsCards"
      :key="card.label"
      :label="card.label"
      :value="card.value"
      :icon="card.icon"
      :icon-bg="card.iconBg"
      :icon-color="card.iconColor"
    />
  </section>
</template>
