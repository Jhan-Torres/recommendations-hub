<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { Plus, Star, X } from "lucide-vue-next";
import type { LegacyRecommendation } from "../model";
import { useTranslations } from "../../../shared/hooks/useTranslations";
import { useScrollLock } from "../../../shared/composables/useScrollLock";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  close: [];
  addRecommendation: [
    recommendation: Omit<LegacyRecommendation, "id" | "createdAt">
  ];
}>();

const { t } = useTranslations();
const { lock, unlock } = useScrollLock();

const form = reactive({
  category: "",
  name: "",
  genre: "",
  rating: 3,
});

const genres = computed(() => [
  { value: "action", label: t.value("action") },
  { value: "adventure", label: t.value("adventure") },
  { value: "comedy", label: t.value("comedy") },
  { value: "drama", label: t.value("drama") },
  { value: "fantasy", label: t.value("fantasy") },
  { value: "horror", label: t.value("horror") },
  { value: "mystery", label: t.value("mystery") },
  { value: "romance", label: t.value("romance") },
  { value: "sci-fi", label: t.value("sciFi") },
  { value: "thriller", label: t.value("thriller") },
  { value: "documentary", label: t.value("documentary") },
  { value: "animation", label: t.value("animation") },
]);

const isFormValid = computed(() => {
  return form.category && form.name.trim() && form.genre;
});

const submitForm = () => {
  if (!isFormValid.value) return;

  emit("addRecommendation", {
    category: form.category as "film" | "series" | "anime",
    name: form.name.trim(),
    genre: form.genre,
    rating: form.rating,
  });

  // Reset form
  resetForm();
};

const resetForm = () => {
  form.category = "";
  form.name = "";
  form.genre = "";
  form.rating = 3;
};

// Handle scroll lock
watch(
  () => props.show,
  (newShow) => {
    if (newShow) {
      lock();
      resetForm();
    } else {
      unlock();
    }
  }
);

// Handle escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.show) {
    emit("close");
  }
};

// Add escape key listener when modal is shown
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

<template>
  <!-- Modal Backdrop -->
  <div
    v-if="show"
    @click="$emit('close')"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
  >
    <!-- Modal Content -->
    <div
      @click.stop
      class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-sm shadow-2xl transform transition-all duration-300 my-4 max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden"
      :class="show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
    >
      <!-- Fixed Modal Header -->
      <header
        class="flex items-center justify-between p-3 pb-2 border-b border-gray-100 dark:border-gray-700 flex-shrink-0"
      >
        <h2
          class="text-base font-semibold text-gray-900 dark:text-white flex items-center"
        >
          <Plus class="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{{ t("addRecommendation") }}</span>
        </h2>
        <button
          @click="$emit('close')"
          class="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
        >
          <X class="h-4 w-4" />
        </button>
      </header>

      <!-- Scrollable Form Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="p-3 pt-2">
          <!-- Form -->
          <form @submit.prevent="submitForm" class="space-y-2.5">
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {{ t("category") }}
              </label>
              <select
                v-model="form.category"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                required
              >
                <option value="">{{ t("selectCategory") }}</option>
                <option value="film">{{ t("film") }}</option>
                <option value="series">{{ t("series") }}</option>
                <option value="anime">{{ t("anime") }}</option>
              </select>
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {{ t("name") }}
              </label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                :placeholder="t('enterName')"
                required
              />
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {{ t("genre") }}
              </label>
              <select
                v-model="form.genre"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                required
              >
                <option value="">{{ t("selectGenre") }}</option>
                <option
                  v-for="genre in genres"
                  :key="genre.value"
                  :value="genre.value"
                >
                  {{ genre.label }}
                </option>
              </select>
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {{ t("rating") }}
              </label>
              <div class="flex items-center justify-center space-x-1 mb-2">
                <button
                  v-for="star in 5"
                  :key="star"
                  type="button"
                  @click="form.rating = star"
                  class="transition-all duration-200 hover:scale-110"
                >
                  <Star
                    :class="[
                      'h-5 w-5 transition-colors duration-200',
                      star <= form.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300',
                    ]"
                  />
                </button>
              </div>
              <p class="text-center text-xs text-gray-500 dark:text-gray-400">
                {{ form.rating }}
                {{ form.rating === 1 ? t("star") : t("stars") }}
              </p>
            </div>
          </form>
        </div>
      </main>

      <!-- Fixed Form Actions at bottom -->
      <footer
        class="p-3 pt-2 border-t border-gray-100 dark:border-gray-700 flex-shrink-0"
      >
        <div class="flex space-x-2">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {{ t("cancel") }}
          </button>
          <button
            type="submit"
            @click="submitForm"
            :disabled="!isFormValid"
            class="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-1.5 px-3 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
          >
            <Plus class="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{{ t("add") }}</span>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>
