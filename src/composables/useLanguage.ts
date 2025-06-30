import { ref, watch } from 'vue'

export type Language = 'en' | 'es'

const STORAGE_KEY = 'language'

// Global reactive language state
const currentLanguage = ref<Language>('en')

// Load from localStorage on initialization
const loadLanguage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Language
    if (stored && ['en', 'es'].includes(stored)) {
      currentLanguage.value = stored
    }
  } catch (error) {
    console.error('Failed to load language:', error)
  }
}

// Save to localStorage whenever language changes
watch(currentLanguage, (newLang) => {
  try {
    localStorage.setItem(STORAGE_KEY, newLang)
  } catch (error) {
    console.error('Failed to save language:', error)
  }
})

// Initialize
loadLanguage()

export function useLanguage() {
  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang
  }

  return {
    currentLanguage,
    setLanguage
  }
}