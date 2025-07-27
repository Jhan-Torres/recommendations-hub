<script setup lang="ts">
import type { Component } from "vue";

interface Props {
  icon: Component;
  label?: string;
  variant?: "primary" | "secondary" | "success" | "danger" | "purple";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
}

interface Emits {
  (e: "click"): void;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  fullWidth: false,
  disabled: false,
});

defineEmits<Emits>();

const getVariantClasses = (variant: string) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
    secondary:
      "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600",
    purple:
      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
  };
  return variants[variant as keyof typeof variants] || variants.primary;
};

const getSizeClasses = (size: string) => {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 sm:px-6 py-2 sm:py-3 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return sizes[size as keyof typeof sizes] || sizes.md;
};

const getIconSize = (size: string) => {
  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4 sm:h-5 sm:w-5",
    lg: "h-5 w-5",
  };
  return iconSizes[size as keyof typeof iconSizes] || iconSizes.md;
};
</script>

<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :class="[
      'text-white rounded-lg font-medium transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2',
      getVariantClasses(variant),
      getSizeClasses(size),
      fullWidth ? 'w-full' : 'w-auto',
      disabled ? 'opacity-50 cursor-not-allowed transform-none' : '',
    ]"
  >
    <component :is="icon" :class="getIconSize(size)" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>
