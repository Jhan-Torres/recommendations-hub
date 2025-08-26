<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { Clock, X } from "lucide-vue-next";
import type { LegacyWatchListItem } from "../model";
import { useTranslations } from "../../../shared/hooks/useTranslations";
import { useScrollLock } from "../../../shared/composables/useScrollLock";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  close: [];
  addToWatchlist: [item: Omit<LegacyWatchListItem, "id" | "createdAt">];
}>();

const { t } = useTranslations();
const { lock, unlock } = useScrollLock();

const form = reactive({
  category: "",
  name: "",
  genre: "",
  priority: "medium",
  notes: "",
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

  emit("addToWatchlist", {
    category: form.category as "film" | "series" | "anime",
    name: form.name.trim(),
    genre: form.genre,
    priority: form.priority as "high" | "medium" | "low",
    notes: form.notes.trim(),
  });

  // Reset form
  resetForm();
};

const resetForm = () => {
  form.category = "";
  form.name = "";
  form.genre = "";
  form.priority = "medium";
  form.notes = "";
};

// Handle scroll lock and form reset
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
          <Clock class="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{{ t("addToWatchList") }}</span>
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
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
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
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
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
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
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
                {{ t("priority") }}
              </label>
              <select
                v-model="form.priority"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                required
              >
                <option value="high">{{ t("high") }}</option>
                <option value="medium">{{ t("medium") }}</option>
                <option value="low">{{ t("low") }}</option>
              </select>
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {{ t("notes") }}
                <span class="text-gray-400 text-xs">({{ t("optional") }})</span>
              </label>
              <textarea
                v-model="form.notes"
                rows="2"
                class="w-full px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
                :placeholder="t('addNotes')"
              ></textarea>
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
            class="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-1.5 px-3 rounded-lg font-medium text-sm hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
          >
            <Clock class="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{{ t("addToWatch") }}</span>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>
