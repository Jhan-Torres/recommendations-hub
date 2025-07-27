<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Users,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  TrendingUp,
  Clock,
  Star,
  Grid,
  Bookmark,
} from "lucide-vue-next";
import CommunityPost from "./CommunityPost.vue";
import CommunityPostDetailModal from "./CommunityPostDetailModal.vue";
import ThemeToggle from "./ThemeToggle.vue";
import SearchBar from "./SearchBar.vue";
import LanguageSelector from "./LanguageSelector.vue";
import { useTranslations } from "../composables/useTranslations";
import type { CommunityPost as CommunityPostType } from "../types";

defineEmits<{
  "back-to-app": [];
}>();

const { t } = useTranslations();

const searchQuery = ref("");
const selectedFilter = ref("trending");
const posts = ref<CommunityPostType[]>([]);
const showDetailModal = ref(false);
const selectedPost = ref<CommunityPostType | null>(null);

const filterOptions = computed(() => [
  { value: "trending", label: t.value("trending"), icon: TrendingUp },
  { value: "recent", label: t.value("recent"), icon: Clock },
  { value: "top-rated", label: t.value("topRated"), icon: Star },
  { value: "saved", label: t.value("saved"), icon: Bookmark },
  { value: "all", label: t.value("all"), icon: Grid },
]);

const savedPostsCount = computed(() => {
  return posts.value.filter((post) => post.isSaved).length;
});

const filteredPosts = computed(() => {
  let filtered = posts.value;

  // Filter by saved posts first if selected
  if (selectedFilter.value === "saved") {
    filtered = filtered.filter((post) => post.isSaved);
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.genre.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
    );
  }

  // Sort by filter (skip sorting for saved posts to maintain save order)
  if (selectedFilter.value !== "saved") {
    switch (selectedFilter.value) {
      case "trending":
        return filtered.sort((a, b) => b.likes - a.likes);
      case "recent":
        return filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "top-rated":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }

  return filtered;
});

const likePost = (postId: string) => {
  const post = posts.value.find((p) => p.id === postId);
  if (post) {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
  }
};

const savePost = (postId: string) => {
  const post = posts.value.find((p) => p.id === postId);
  if (post) {
    post.isSaved = !post.isSaved;
  }
};

const viewPost = (post: CommunityPostType) => {
  selectedPost.value = post;
  showDetailModal.value = true;
};

const loadMorePosts = () => {
  // Simulate loading more posts
  const newPosts = generateMockPosts(6);
  posts.value.push(...newPosts);
};

const generateMockPosts = (count: number): CommunityPostType[] => {
  const categories = ["film", "series", "anime"] as const;
  const genres = [
    "action",
    "comedy",
    "drama",
    "fantasy",
    "horror",
    "romance",
    "sci-fi",
    "thriller",
  ];
  const authors = [
    "MovieBuff2024",
    "SeriesAddict",
    "AnimeExplorer",
    "CinemaLover",
    "StreamingPro",
    "FilmCritic",
    "ShowWatcher",
    "EntertainmentGuru",
  ];
  const titles = [
    "Hidden Gem Alert!",
    "Must Watch This Weekend",
    "Underrated Masterpiece",
    "Perfect for Binge Watching",
    "Emotional Rollercoaster",
    "Mind-Blowing Plot Twist",
    "Incredible Character Development",
    "Stunning Visuals",
    "Heartwarming Story",
    "Edge of Your Seat Thriller",
    "Comedy Gold",
    "Beautifully Crafted",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `post-${Date.now()}-${i}`,
    title: titles[Math.floor(Math.random() * titles.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    name: `Amazing ${
      categories[Math.floor(Math.random() * categories.length)]
    } ${Math.floor(Math.random() * 100)}`,
    genre: genres[Math.floor(Math.random() * genres.length)],
    rating: Math.floor(Math.random() * 5) + 1,
    author: authors[Math.floor(Math.random() * authors.length)],
    description:
      "This is an incredible recommendation that you absolutely must check out. The storytelling is phenomenal and the characters are so well developed.",
    likes: Math.floor(Math.random() * 500) + 10,
    comments: Math.floor(Math.random() * 50) + 1,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    isLiked: false,
    isSaved: Math.random() > 0.8, // 20% chance of being pre-saved for demo
  }));
};

onMounted(() => {
  posts.value = generateMockPosts(12);
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800"
  >
    <!-- Header -->
    <header
      class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <button
            @click="$emit('back-to-app')"
            class="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div
              class="p-1 sm:p-1.5 md:p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
            >
              <Users class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h1
              class="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              {{ t("community") }}
            </h1>
          </button>
          <nav class="flex items-center space-x-2 sm:space-x-4">
            <div class="hidden sm:block">
              <SearchBar v-model="searchQuery" />
            </div>
            <LanguageSelector />
            <ThemeToggle />
            <button
              @click="$emit('back-to-app')"
              class="px-3 py-2 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50 flex items-center text-xs sm:text-sm"
            >
              <ArrowLeft class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span class="hidden sm:inline">{{ t("backToApp") }}</span>
              <span class="sm:hidden">{{ t("back") }}</span>
            </button>
          </nav>
        </div>
        <!-- Mobile Search Bar -->
        <div class="sm:hidden pb-3">
          <SearchBar v-model="searchQuery" />
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <!-- Community Header -->
      <section class="text-center mb-8 sm:mb-12">
        <div
          class="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100/90 dark:bg-purple-900/50 backdrop-blur-sm rounded-full text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-purple-200/50 dark:border-purple-700/50"
        >
          <Sparkles class="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
          {{ t("discoverTogether") }}
        </div>
        <h2
          class="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          {{ t("communityTitle") }}
        </h2>
        <p
          class="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {{ t("communityDescription") }}
        </p>
      </section>

      <!-- Filter Tabs -->
      <section class="flex flex-wrap gap-2 mb-6 sm:mb-8 justify-center">
        <button
          v-for="filter in filterOptions"
          :key="filter.value"
          @click="selectedFilter = filter.value"
          :class="[
            'px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center',
            selectedFilter === filter.value
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50',
          ]"
        >
          <component
            :is="filter.icon"
            class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"
          />
          {{ filter.label }}
          <span
            v-if="filter.value === 'saved' && savedPostsCount > 0"
            class="ml-1 sm:ml-2 px-1.5 py-0.5 bg-white/20 rounded-full text-xs font-bold"
          >
            {{ savedPostsCount }}
          </span>
        </button>
      </section>

      <!-- Empty State for Saved Posts -->
      <section
        v-if="selectedFilter === 'saved' && filteredPosts.length === 0"
        class="text-center py-12 sm:py-16"
      >
        <div
          class="p-6 sm:p-8 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 max-w-md mx-auto"
        >
          <Bookmark
            class="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4"
          />
          <h3
            class="text-lg sm:text-xl font-medium text-gray-900 dark:text-white mb-2"
          >
            {{ t("noSavedPosts") }}
          </h3>
          <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">
            {{ t("startSavingPosts") }}
          </p>
          <button
            @click="selectedFilter = 'trending'"
            class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            {{ t("explorePosts") }}
          </button>
        </div>
      </section>

      <!-- Community Posts Grid -->
      <section v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <CommunityPost
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          @like="likePost"
          @save="savePost"
          @view="viewPost"
        />
      </section>

      <!-- Load More Button (hide for saved posts) -->
      <section
        v-if="selectedFilter !== 'saved'"
        class="text-center mt-8 sm:mt-12"
      >
        <button
          @click="loadMorePosts"
          class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center mx-auto"
        >
          <RefreshCw class="h-4 w-4 mr-2" />
          {{ t("loadMore") }}
        </button>
      </section>
    </main>

    <!-- Community Post Detail Modal -->
    <CommunityPostDetailModal
      :show="showDetailModal"
      :post="selectedPost"
      @close="showDetailModal = false"
    />
  </div>
</template>
