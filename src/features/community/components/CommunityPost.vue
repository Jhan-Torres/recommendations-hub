<script setup lang="ts">
import { computed } from "vue";
import {
  Film,
  Tv,
  Sparkles,
  Star,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  User,
  Eye,
} from "lucide-vue-next";
import type { CommunityPost } from "../model";
import { useTranslations } from "../../../shared/hooks/useTranslations";

const props = defineProps<{
  post: CommunityPost;
}>();

defineEmits<{
  like: [id: string];
  save: [id: string];
  view: [post: CommunityPost];
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
  return styles[props.post.category];
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
    colors[props.post.genre as keyof typeof colors] ||
    "text-gray-600 dark:text-gray-400"
  );
});

const ratingColor = computed(() => {
  const rating = props.post.rating;
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
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return t.value("justNow");
  if (diffInHours < 24) return `${diffInHours}h ${t.value("ago")}`;
  if (diffInHours < 168)
    return `${Math.floor(diffInHours / 24)}d ${t.value("ago")}`;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
</script>

<template>
  <article
    @click="$emit('view', post)"
    class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer relative"
  >
    <!-- Post Header -->
    <header class="flex items-start justify-between mb-3 sm:mb-4">
      <div class="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
        <div
          class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <User class="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <div class="min-w-0 flex-1">
          <h3
            class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white truncate"
          >
            {{ post.author }}
          </h3>
          <time class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(post.createdAt) }}
          </time>
        </div>
      </div>

      <button
        @click.stop="$emit('save', post.id)"
        :class="[
          'p-1.5 sm:p-2 rounded-lg transition-all duration-200 flex-shrink-0',
          post.isSaved
            ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
            : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
        ]"
      >
        <Bookmark
          :class="post.isSaved ? 'fill-current' : ''"
          class="h-4 w-4 sm:h-5 sm:w-5"
        />
      </button>
    </header>

    <!-- Post Content -->
    <main class="mb-4">
      <h4
        class="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
      >
        {{ post.title }}
      </h4>

      <section class="flex items-center space-x-2 sm:space-x-3 mb-3">
        <div
          :class="categoryStyles.bg"
          class="p-1.5 sm:p-2 rounded-lg flex-shrink-0"
        >
          <component
            :is="categoryStyles.icon"
            :class="categoryStyles.text"
            class="h-3 w-3 sm:h-4 sm:w-4"
          />
        </div>
        <div class="min-w-0 flex-1">
          <p
            class="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate"
          >
            {{ post.name }}
          </p>
          <div
            class="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
          >
            <span class="capitalize">{{ post.category }}</span>
            <span>•</span>
            <span :class="genreColor" class="font-medium capitalize">
              {{ getGenreLabel(post.genre) }}
            </span>
          </div>
        </div>
      </section>

      <p
        class="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-2 mb-3"
      >
        {{ post.description }}
      </p>

      <!-- Rating -->
      <section class="flex items-center space-x-2">
        <div class="flex items-center space-x-0.5 sm:space-x-1">
          <Star
            v-for="i in 5"
            :key="i"
            :class="[
              'h-3 w-3 sm:h-4 sm:w-4 transition-colors duration-200',
              i <= post.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 dark:text-gray-600',
            ]"
          />
        </div>
        <span :class="ratingColor" class="text-xs sm:text-sm font-medium">
          {{ post.rating }}/5
        </span>
      </section>
    </main>

    <!-- Post Actions -->
    <footer
      class="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-gray-700/50"
    >
      <nav class="flex items-center space-x-4">
        <button
          @click.stop="$emit('like', post.id)"
          :class="[
            'flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium',
            post.isLiked
              ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
              : 'text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
          ]"
        >
          <Heart
            :class="post.isLiked ? 'fill-current' : ''"
            class="h-3 w-3 sm:h-4 sm:w-4"
          />
          <span>{{ post.likes }}</span>
        </button>

        <button
          @click.stop
          class="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-xs sm:text-sm font-medium"
        >
          <MessageCircle class="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{{ post.comments }}</span>
        </button>
      </nav>

      <button
        @click.stop
        class="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
      >
        <Share class="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
    </footer>

    <!-- Hover overlay with view indicator -->
    <div
      class="absolute inset-0 bg-purple-500/10 dark:bg-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
