import { ref, computed } from "vue";

export function usePagination(initialPage = 1, initialLimit = 10) {
  const currentPage = ref(initialPage);
  const limit = ref(initialLimit);
  const total = ref(0);

  const totalPages = computed(() => Math.ceil(total.value / limit.value));

  const hasNextPage = computed(() => currentPage.value < totalPages.value);
  const hasPrevPage = computed(() => currentPage.value > 1);

  const offset = computed(() => (currentPage.value - 1) * limit.value);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (hasPrevPage.value) {
      currentPage.value--;
    }
  };

  const reset = () => {
    currentPage.value = 1;
    total.value = 0;
  };

  return {
    currentPage,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
    offset,
    goToPage,
    nextPage,
    prevPage,
    reset,
  };
}
