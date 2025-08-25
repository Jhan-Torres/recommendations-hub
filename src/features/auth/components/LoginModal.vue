<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { Mail, Lock, X, Eye, EyeOff, LogIn } from "lucide-vue-next";
import { useTranslations } from "../../../shared/hooks/useTranslations";
import { useAuth } from "../composables/useAuth";

const props = defineProps<{
  show: boolean;
}>();

// We might use props in the future for additional configuration

const emit = defineEmits<{
  close: [];
  switchToSignup: [];
}>();

const { t } = useTranslations();
const { login, isLoading } = useAuth();

const form = reactive({
  email: "",
  password: "",
});

const showPassword = ref(false);
const errors = ref<{ email?: string; password?: string; general?: string }>({});

const isFormValid = computed(() => {
  return form.email.trim() && form.password.trim();
});

const validateForm = () => {
  errors.value = {};

  if (!form.email.trim()) {
    errors.value.email = t.value("emailRequired");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = t.value("emailInvalid");
  }

  if (!form.password.trim()) {
    errors.value.password = t.value("passwordRequired");
  } else if (form.password.length < 6) {
    errors.value.password = t.value("passwordMinLength");
  }

  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (!validateForm() || isLoading.value) return;

  try {
    await login(form.email, form.password);
    emit("close");
    // Reset form
    form.email = "";
    form.password = "";
    errors.value = {};
  } catch (error) {
    console.error("Login failed:", error);
    errors.value.general = t.value("loginFailed");
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleSwitchToSignup = () => {
  emit("switchToSignup");
};

const closeModal = () => {
  emit("close");
  // Reset form and errors
  form.email = "";
  form.password = "";
  errors.value = {};
};

// Handle click outside modal
const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    @click="handleBackdropClick"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100 max-h-[85vh] overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div
        class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center space-x-2">
          <div class="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <LogIn class="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">
            {{ t("login") }}
          </h2>
        </div>
        <button
          @click="closeModal"
          class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X class="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <!-- Switch to Signup -->
      <div
        class="text-center p-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700"
      >
        <p class="text-xs text-gray-600 dark:text-gray-400">
          {{ t("noAccount") }}
          <button
            type="button"
            @click="handleSwitchToSignup"
            class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium ml-1"
          >
            {{ t("signUp") }}
          </button>
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="p-4 space-y-3">
        <!-- General Error -->
        <div
          v-if="errors.general"
          class="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg"
        >
          <p class="text-xs text-red-600 dark:text-red-400">
            {{ errors.general }}
          </p>
        </div>

        <!-- Email Field -->
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {{ t("email") }}
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
            >
              <Mail class="h-4 w-4 text-gray-400" />
            </div>
            <input
              v-model="form.email"
              type="email"
              autocomplete="email"
              :placeholder="t('emailPlaceholder')"
              class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              :class="{
                'border-red-500 dark:border-red-400': errors.email,
              }"
            />
          </div>
          <p
            v-if="errors.email"
            class="mt-0.5 text-xs text-red-600 dark:text-red-400"
          >
            {{ errors.email }}
          </p>
        </div>

        <!-- Password Field -->
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {{ t("password") }}
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
            >
              <Lock class="h-4 w-4 text-gray-400" />
            </div>
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              :placeholder="t('passwordPlaceholder')"
              class="w-full pl-8 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
              :class="{
                'border-red-500 dark:border-red-400': errors.password,
              }"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 pr-2.5 flex items-center"
            >
              <EyeOff
                v-if="showPassword"
                class="h-4 w-4 text-gray-400 hover:text-gray-600"
              />
              <Eye v-else class="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <p
            v-if="errors.password"
            class="mt-0.5 text-xs text-red-600 dark:text-red-400"
          >
            {{ errors.password }}
          </p>
        </div>

        <!-- Forgot Password Link -->
        <div class="text-right">
          <button
            type="button"
            class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            {{ t("forgotPassword") }}
          </button>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="!isFormValid || isLoading"
          class="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 text-sm"
        >
          <LogIn v-if="!isLoading" class="h-4 w-4" />
          <div
            v-else
            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
          ></div>
          <span>{{ isLoading ? t("loggingIn") : t("login") }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fixed {
  animation: modalEnter 0.3s ease-out;
}
</style>
