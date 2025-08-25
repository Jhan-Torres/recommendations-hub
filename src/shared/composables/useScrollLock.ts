import { ref, readonly, onUnmounted } from "vue";

/**
 * Composable to lock/unlock page scrolling
 * Useful for modals and overlays to prevent background scrolling
 */
export function useScrollLock() {
  const isLocked = ref(false);
  const originalStyle = ref("");
  const originalOverflow = ref("");

  const lock = () => {
    if (isLocked.value) return;

    // Store original styles
    originalStyle.value = document.body.getAttribute("style") || "";
    originalOverflow.value = document.body.style.overflow;

    // Get current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Apply scroll lock styles
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollTop}px`;
    document.body.style.width = "100%";

    isLocked.value = true;
  };

  const unlock = () => {
    if (!isLocked.value) return;

    // Get the scroll position from the fixed position
    const scrollTop = parseInt(document.body.style.top || "0") * -1;

    // Restore original styles
    if (originalStyle.value) {
      document.body.setAttribute("style", originalStyle.value);
    } else {
      document.body.removeAttribute("style");
    }

    // Restore scroll position
    window.scrollTo(0, scrollTop);

    isLocked.value = false;
  };

  // Cleanup on unmount
  onUnmounted(() => {
    if (isLocked.value) {
      unlock();
    }
  });

  return {
    isLocked: readonly(isLocked),
    lock,
    unlock,
  };
}
