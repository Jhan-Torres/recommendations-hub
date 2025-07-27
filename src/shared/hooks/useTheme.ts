import { ref, watchEffect } from "vue";

// Global theme state
const isDark = ref(false);
let isInitialized = false;

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  const initTheme = () => {
    if (isInitialized) return;

    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    isDark.value = saved === "dark" || (!saved && prefersDark);
    updateTheme(isDark.value);

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          isDark.value = e.matches;
        }
      });

    isInitialized = true;
  };

  // Initialize theme immediately if in browser
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    initTheme();
  }

  // Watch for changes and update DOM
  watchEffect(() => {
    if (typeof document !== "undefined") {
      updateTheme(isDark.value);
    }
  });

  return {
    isDark,
    toggleTheme,
    initTheme,
  };
}
