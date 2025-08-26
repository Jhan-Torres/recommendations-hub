<script setup lang="ts">
import { computed } from "vue";
import { Star, Plus, BarChart3, Film, Tv, Sparkles } from "lucide-vue-next";
import RecommendationCard from "./RecommendationCard.vue";
import FilterButtons from "../../../shared/ui/FilterButtons.vue";
import EmptyState from "../../../shared/ui/EmptyState.vue";
import ActionButton from "../../../shared/ui/ActionButton.vue";
import { useTranslations } from "../../../shared/hooks/useTranslations";
import type { LegacyRecommendation } from "../model";

interface Props {
  recommendations: LegacyRecommendation[];
  filteredRecommendations: LegacyRecommendation[];
  selectedCategory: string;
}

interface Emits {
  (e: "delete-recommendation", id: string): void;
  (e: "view-recommendation", recommendation: LegacyRecommendation): void;
  (e: "update:selected-category", value: string): void;
  (e: "show-recommendation-modal"): void;
}

defineProps<Props>();
defineEmits<Emits>();

const { t } = useTranslations();

const categoryFilters = computed(() => [
  { value: "all", label: t.value("all"), icon: BarChart3 },
  { value: "film", label: t.value("films"), icon: Film },
  { value: "series", label: t.value("series"), icon: Tv },
  { value: "anime", label: t.value("anime"), icon: Sparkles },
]);
</script>

<template>
  <!-- Actions and Filters -->
  <div
    class="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center sm:mb-8"
  >
    <ActionButton
      :icon="Plus"
      :label="t('addRecommendation')"
      variant="primary"
      size="md"
      full-width
      @click="$emit('show-recommendation-modal')"
      class="sm:w-auto"
    />

    <FilterButtons
      :filters="categoryFilters"
      :selected-filter="selectedCategory"
      @update:selected-filter="$emit('update:selected-category', $event)"
    />
  </div>

  <!-- Recommendations Grid -->
  <div
    v-if="filteredRecommendations.length > 0"
    class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6"
  >
    <RecommendationCard
      v-for="recommendation in filteredRecommendations"
      :key="recommendation.id"
      :recommendation="recommendation"
      @delete="$emit('delete-recommendation', $event)"
      @view="$emit('view-recommendation', $event)"
    />
  </div>

  <!-- Empty State for Recommendations -->
  <EmptyState
    v-else
    :icon="Star"
    :title="t('noRecommendations')"
    :description="t('startAdding')"
    :action-text="t('addFirst')"
    @action="$emit('show-recommendation-modal')"
  />
</template>
