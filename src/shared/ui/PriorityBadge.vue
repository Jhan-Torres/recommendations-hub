<script setup lang="ts">
interface Props {
  priority: "high" | "medium" | "low";
  label: string;
}

defineProps<Props>();

const getPriorityColor = (priority: string) => {
  const colors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    low: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  };
  return colors[priority as keyof typeof colors] || colors.medium;
};
</script>

<template>
  <span
    :class="getPriorityColor(priority)"
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
  >
    {{ label }}
  </span>
</template>
