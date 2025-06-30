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
      class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl w-full max-w-sm sm:max-w-md shadow-2xl transform transition-all duration-300 my-4 max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden"
      :class="show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
    >
      <!-- Fixed Modal Header -->
      <div class="flex items-center justify-between p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Clock class="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
          <span class="hidden sm:inline">{{ t('addToWatchList') }}</span>
          <span class="sm:hidden">{{ t('addToWatch') }}</span>
        </h2>
        <button
          @click="$emit('close')"
          class="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
        >
          <X class="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      <!-- Scrollable Form Content -->
      <div class="flex-1 overflow-y-auto">
        <div class="p-4 sm:p-6 pt-3 sm:pt-4">
          <!-- Form -->
          <form @submit.prevent="submitForm" class="space-y-3 sm:space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                {{ t('category') }}
              </label>
              <select
                v-model="form.category"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                required
              >
                <option value="">{{ t('selectCategory') }}</option>
                <option value="film">{{ t('film') }}</option>
                <option value="series">{{ t('series') }}</option>
                <option value="anime">{{ t('anime') }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                {{ t('name') }}
              </label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                :placeholder="t('enterName')"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                {{ t('genre') }}
              </label>
              <select
                v-model="form.genre"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                required
              >
                <option value="">{{ t('selectGenre') }}</option>
                <option v-for="genre in genres" :key="genre.value" :value="genre.value">
                  {{ genre.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                {{ t('priority') }}
              </label>
              <select
                v-model="form.priority"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                required
              >
                <option value="high">{{ t('high') }}</option>
                <option value="medium">{{ t('medium') }}</option>
                <option value="low">{{ t('low') }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                {{ t('notes') }} <span class="text-gray-400">({{ t('optional') }})</span>
              </label>
              <textarea
                v-model="form.notes"
                rows="3"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
                :placeholder="t('addNotes')"
              ></textarea>
            </div>
          </form>
        </div>
      </div>

      <!-- Fixed Form Actions at bottom -->
      <div class="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
        <div class="flex space-x-2 sm:space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {{ t('cancel') }}
          </button>
          <button
            type="submit"
            @click="submitForm"
            :disabled="!isFormValid"
            class="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-3 sm:px-4 rounded-lg font-medium text-sm sm:text-base hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
          >
            <Clock class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span>{{ t('addToWatch') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { Clock, X } from 'lucide-vue-next'
import type { WatchListItem } from '../types'
import { useTranslations } from '../composables/useTranslations'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
  addToWatchlist: [item: Omit<WatchListItem, 'id' | 'createdAt'>]
}>()

const { t } = useTranslations()

const form = reactive({
  category: '',
  name: '',
  genre: '',
  priority: 'medium',
  notes: ''
})

const genres = computed(() => [
  { value: 'action', label: t.value('action') },
  { value: 'adventure', label: t.value('adventure') },
  { value: 'comedy', label: t.value('comedy') },
  { value: 'drama', label: t.value('drama') },
  { value: 'fantasy', label: t.value('fantasy') },
  { value: 'horror', label: t.value('horror') },
  { value: 'mystery', label: t.value('mystery') },
  { value: 'romance', label: t.value('romance') },
  { value: 'sci-fi', label: t.value('sciFi') },
  { value: 'thriller', label: t.value('thriller') },
  { value: 'documentary', label: t.value('documentary') },
  { value: 'animation', label: t.value('animation') }
])

const isFormValid = computed(() => {
  return form.category && form.name.trim() && form.genre
})

const submitForm = () => {
  if (!isFormValid.value) return

  emit('addToWatchlist', {
    category: form.category as 'film' | 'series' | 'anime',
    name: form.name.trim(),
    genre: form.genre,
    priority: form.priority as 'high' | 'medium' | 'low',
    notes: form.notes.trim()
  })

  // Reset form
  resetForm()
}

const resetForm = () => {
  form.category = ''
  form.name = ''
  form.genre = ''
  form.priority = 'medium'
  form.notes = ''
}

// Reset form when modal closes
watch(() => props.show, (newShow) => {
  if (!newShow) {
    resetForm()
  }
})

// Handle escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    emit('close')
  }
}

// Add escape key listener when modal is shown
watch(() => props.show, (newShow) => {
  if (newShow) {
    document.addEventListener('keydown', handleEscape)
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleEscape)
    // Restore body scroll
    document.body.style.overflow = ''
  }
})
</script>