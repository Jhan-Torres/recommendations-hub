<template>
  <!-- Modal Backdrop -->
  <div
    v-if="show && recommendation"
    @click="$emit('close')"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
  >
    <!-- Modal Content -->
    <div
      @click.stop
      class="bg-white dark:bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] shadow-2xl transform transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
      :class="show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
    >
      <!-- Left Side - Recommendation Image/Content -->
      <div
        class="md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-8 relative"
      >
        <!-- Close button for mobile -->
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 md:hidden p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
        >
          <X class="h-5 w-5" />
        </button>

        <div class="text-center text-white">
          <div
            :class="categoryStyles.bg"
            class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-white/20 backdrop-blur-sm"
          >
            <component
              :is="categoryStyles.icon"
              class="h-10 w-10 sm:h-12 sm:w-12 text-white"
            />
          </div>

          <h2 class="text-2xl sm:text-3xl font-bold mb-2">
            {{ recommendation.name }}
          </h2>

          <div class="flex items-center justify-center space-x-2 mb-4">
            <span
              class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium capitalize"
            >
              {{ recommendation.category }}
            </span>
            <span
              class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium capitalize"
            >
              {{ getGenreLabel(recommendation.genre) }}
            </span>
          </div>

          <div class="flex items-center justify-center space-x-1 mb-4">
            <Star
              v-for="i in 5"
              :key="i"
              :class="[
                'h-5 w-5 transition-colors duration-200',
                i <= recommendation.rating
                  ? 'text-yellow-300 fill-yellow-300'
                  : 'text-white/30',
              ]"
            />
            <span class="ml-2 text-lg font-semibold"
              >{{ recommendation.rating }}/5</span
            >
          </div>

          <p class="text-white/80 text-sm">
            {{ t("addedOn") }} {{ formatDate(recommendation.createdAt) }}
          </p>
        </div>
      </div>

      <!-- Right Side - Comments Section -->
      <div class="md:w-1/2 flex flex-col max-h-[50vh] md:max-h-[90vh]">
        <!-- Header -->
        <div
          class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center"
            >
              <User class="h-4 w-4 text-white" />
            </div>
            <div>
              <p class="font-semibold text-gray-900 dark:text-white text-sm">
                {{ t("yourRecommendation") }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatDate(recommendation.createdAt) }}
              </p>
            </div>
          </div>

          <!-- Close button for desktop -->
          <button
            @click="$emit('close')"
            class="hidden md:block p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <!-- Action Buttons -->
        <div
          class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0"
        >
          <div class="flex items-center space-x-4">
            <button
              @click="toggleLike"
              :class="[
                'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium',
                isLiked
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
              ]"
            >
              <Heart :class="isLiked ? 'fill-current' : ''" class="h-5 w-5" />
              <span>{{ likes }}</span>
            </button>

            <button
              class="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-sm font-medium"
            >
              <MessageCircle class="h-5 w-5" />
              <span>{{ comments.length }}</span>
            </button>

            <button
              @click="toggleSave"
              :class="[
                'p-2 rounded-lg transition-all duration-200',
                isSaved
                  ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                  : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
              ]"
            >
              <Bookmark
                :class="isSaved ? 'fill-current' : ''"
                class="h-5 w-5"
              />
            </button>
          </div>

          <button
            class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
          >
            <Share class="h-5 w-5" />
          </button>
        </div>

        <!-- Comments List -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <!-- Initial recommendation description -->
          <div class="flex space-x-3">
            <div
              class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <User class="h-4 w-4 text-white" />
            </div>
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-1">
                <span
                  class="font-semibold text-sm text-gray-900 dark:text-white"
                  >{{ t("you") }}</span
                >
                <span class="text-xs text-gray-500 dark:text-gray-400">{{
                  formatDate(recommendation.createdAt)
                }}</span>
              </div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                {{
                  t("recommendationDescription", {
                    name: recommendation.name,
                    genre: getGenreLabel(recommendation.genre),
                    rating: recommendation.rating.toString(),
                  })
                }}
              </p>
            </div>
          </div>

          <!-- Comments -->
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="flex space-x-3"
          >
            <div
              class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <User class="h-4 w-4 text-white" />
            </div>
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-1">
                <span
                  class="font-semibold text-sm text-gray-900 dark:text-white"
                  >{{ comment.author }}</span
                >
                <span class="text-xs text-gray-500 dark:text-gray-400">{{
                  formatDate(comment.createdAt)
                }}</span>
              </div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                {{ comment.text }}
              </p>

              <!-- Comment actions -->
              <div class="flex items-center space-x-4 mt-2">
                <button
                  @click="toggleCommentLike(comment.id)"
                  :class="[
                    'flex items-center space-x-1 text-xs',
                    comment.isLiked
                      ? 'text-red-500'
                      : 'text-gray-400 hover:text-red-500',
                  ]"
                >
                  <Heart
                    :class="comment.isLiked ? 'fill-current' : ''"
                    class="h-3 w-3"
                  />
                  <span>{{ comment.likes }}</span>
                </button>
                <button
                  class="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {{ t("reply") }}
                </button>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="comments.length === 0" class="text-center py-8">
            <MessageCircle
              class="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3"
            />
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              {{ t("noCommentsYet") }}
            </p>
            <p class="text-gray-400 dark:text-gray-500 text-xs">
              {{ t("beFirstToComment") }}
            </p>
          </div>
        </div>

        <!-- Comment Input -->
        <div
          class="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0"
        >
          <div class="flex space-x-3">
            <div
              class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <User class="h-4 w-4 text-white" />
            </div>
            <div class="flex-1 flex space-x-2">
              <input
                v-model="newComment"
                @keydown.enter="addComment"
                type="text"
                :placeholder="t('addComment')"
                class="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 transition-colors"
              />
              <button
                @click="addComment"
                :disabled="!newComment.trim()"
                class="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  X,
  Star,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  User,
  Send,
  Film,
  Tv,
  Sparkles,
} from "lucide-vue-next";
import type { Recommendation } from "../types";
import { useTranslations } from "../composables/useTranslations";

interface Comment {
  id: string;
  author: string;
  text: string;
  likes: number;
  isLiked: boolean;
  createdAt: Date;
}

const props = defineProps<{
  show: boolean;
  recommendation: Recommendation | null;
}>();

defineEmits<{
  close: [];
}>();

const { t } = useTranslations();

// Modal state
const isLiked = ref(false);
const isSaved = ref(false);
const likes = ref(Math.floor(Math.random() * 50) + 10);
const comments = ref<Comment[]>([]);
const newComment = ref("");

// Generate mock comments
const generateMockComments = () => {
  const mockComments: Comment[] = [
    {
      id: "1",
      author: "MovieLover23",
      text: "This looks amazing! Adding it to my watchlist right now. Thanks for the recommendation! 🎬",
      likes: 12,
      isLiked: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: "2",
      author: "CinemaExplorer",
      text: "I watched this last week and it completely blew my mind! The plot twists are incredible.",
      likes: 8,
      isLiked: true,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      id: "3",
      author: "SeriesBinger",
      text: "Perfect timing! I was just looking for something new to watch this weekend.",
      likes: 5,
      isLiked: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
  ];

  // Randomly show 0-3 comments
  const numComments = Math.floor(Math.random() * 4);
  comments.value = mockComments.slice(0, numComments);
};

const categoryStyles = computed(() => {
  if (!props.recommendation) return { bg: "", text: "", icon: Film };

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

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  likes.value += isLiked.value ? 1 : -1;
};

const toggleSave = () => {
  isSaved.value = !isSaved.value;
};

const toggleCommentLike = (commentId: string) => {
  const comment = comments.value.find((c) => c.id === commentId);
  if (comment) {
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
  }
};

const addComment = () => {
  if (!newComment.value.trim()) return;

  const comment: Comment = {
    id: Date.now().toString(),
    author: t.value("you"),
    text: newComment.value.trim(),
    likes: 0,
    isLiked: false,
    createdAt: new Date(),
  };

  comments.value.unshift(comment);
  newComment.value = "";
};

// Reset state when modal opens
watch(
  () => props.show,
  (newShow) => {
    if (newShow) {
      isLiked.value = false;
      isSaved.value = Math.random() > 0.7; // 30% chance of being pre-saved
      likes.value = Math.floor(Math.random() * 50) + 10;
      generateMockComments();
      newComment.value = "";

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll
      document.body.style.overflow = "";
    }
  }
);

// Handle escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.show) {
    props.show && document.dispatchEvent(new CustomEvent("close-modal"));
  }
};

watch(
  () => props.show,
  (newShow) => {
    if (newShow) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }
  }
);
</script>
