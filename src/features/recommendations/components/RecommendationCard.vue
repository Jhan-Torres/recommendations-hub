<script setup lang="ts">
import { computed } from "vue";
import { Film, Tv, Sparkles, Star, Trash2, Eye } from "lucide-vue-next";
import type { Recommendation } from "../model";
import { useTranslations } from "../../../shared/hooks/useTranslations";

const props = defineProps<{
  recommendation: Recommendation;
}>();

defineEmits<{
  delete: [id: string];
  view: [recommendation: Recommendation];
}>();

const { t } = useTranslations();

const categoryStyles = computed(() => {
  const styles = {
    film: {
      bg: "bg-green-100 dark:bg-green-900/50",
      text: "text-green-600 dark:text-green-400",
      icon: Film,
    },
    series: {
      bg: "bg-purple-100 dark:bg-purple-900/50",
      text: "text-purple-600 dark:text-purple-400",
      icon: Tv,
    },
    anime: {
      bg: "bg-blue-100 dark:bg-blue-900/50",
      text: "text-blue-600 dark:text-blue-400",
      icon: Sparkles,
    },
  };
  return styles[props.recommendation.category];
});

const genreColor = computed(() => {
  const colors = {
    action: "text-red-600 dark:text-red-400",
    adventure: "text-orange-600 dark:text-orange-400",
    comedy: "text-yellow-600 dark:text-yellow-400",
    drama: "text-blue-600 dark:text-blue-400",
    fantasy: "text-purple-600 dark:text-purple-400",
    horror: "text-gray-800 dark:text-gray-200",
    mystery: "text-indigo-600 dark:text-indigo-400",
    romance: "text-blue-600 dark:text-blue-400",
    "sci-fi": "text-cyan-600 dark:text-cyan-400",
    thriller: "text-red-800 dark:text-red-300",
    documentary: "text-green-600 dark:text-green-400",
    animation: "text-violet-600 dark:text-violet-400",
  };
  return (
    colors[props.recommendation.genre as keyof typeof colors] ||
    "text-gray-600 dark:text-gray-400"
  );
});

const ratingColor = computed(() => {
  const rating = props.recommendation.rating;
  if (rating >= 4) return "text-green-600 dark:text-green-400";
  if (rating >= 3) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
});

const getGenreLabel = (genre: string) => {
  const genreLabels = {
    action: t.value("action"),
    adventure: t.value("adventure"),
    comedy: t.value("comedy"),
    drama: t.value("drama"),
    fantasy: t.value("fantasy"),
    horror: t.value("horror"),
    mystery: t.value("mystery"),
    romance: t.value("romance"),
    "sci-fi": t.value("sciFi"),
    thriller: t.value("thriller"),
    documentary: t.value("documentary"),
    animation: t.value("animation"),
  };
  return genreLabels[genre as keyof typeof genreLabels] || genre;
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
</script>

<template>
  <article
    @click="$emit('view', recommendation)"
    class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer"
  >
    <header class="flex items-start justify-between mb-3 sm:mb-4">
      <div class="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
        <div
          :class="categoryStyles.bg"
          class="p-1.5 sm:p-2 rounded-lg flex-shrink-0"
        >
          <component
            :is="categoryStyles.icon"
            :class="categoryStyles.text"
            class="h-4 w-4 sm:h-5 sm:w-5"
          />
        </div>
        <div class="min-w-0 flex-1">
          <h3
            class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate"
          >
            {{ recommendation.name }}
          </h3>
          <div
            class="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
          >
            <span class="capitalize">{{ recommendation.category }}</span>
            <span>•</span>
            <span :class="genreColor" class="font-medium capitalize truncate">
              {{ getGenreLabel(recommendation.genre) }}
            </span>
          </div>
        </div>
      </div>

      <button
        @click.stop="$emit('delete', recommendation.id)"
        class="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0"
      >
        <Trash2 class="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
    </header>

    <footer class="flex items-center justify-between">
      <div class="flex items-center space-x-2 sm:space-x-3">
        <div class="flex items-center space-x-0.5 sm:space-x-1">
          <Star
            v-for="i in 5"
            :key="i"
            :class="[
              'h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-200',
              i <= recommendation.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 dark:text-gray-600',
            ]"
          />
        </div>
        <span :class="ratingColor" class="text-xs sm:text-sm font-medium">
          {{ recommendation.rating }}/5
        </span>
      </div>

      <time class="text-xs text-gray-400 dark:text-gray-500">
        {{ formatDate(recommendation.createdAt) }}
      </time>
    </footer>

    <!-- Hover overlay with view indicator -->
    <div
      class="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
    >
      <div
        class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg"
      >
        <span
          class="text-sm font-medium text-gray-900 dark:text-white flex items-center"
        >
          <Eye class="h-4 w-4 mr-2" />
          {{ t("viewDetails") }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
