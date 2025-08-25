<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { Mail, X, Shield, CheckCircle } from "lucide-vue-next";
import { useTranslations } from "../../../shared/hooks/useTranslations";
import { useAuth } from "../composables/useAuth";

const props = defineProps<{
  show: boolean;
  email: string;
}>();

const emit = defineEmits<{
  close: [];
  verified: [];
  resendCode: [];
}>();

const { t } = useTranslations();
const { verifyEmail, resendVerificationCode, isLoading } = useAuth();

const form = reactive({
  code: "",
});

const errors = ref<{ code?: string; general?: string }>({});

const isFormValid = computed(() => {
  return form.code.trim().length === 6;
});

const validateForm = () => {
  errors.value = {};

  if (!form.code.trim()) {
    errors.value.code = t.value("verificationCodeRequired");
  } else if (form.code.trim().length !== 6) {
    errors.value.code = t.value("verificationCodeInvalid");
  } else if (!/^\d{6}$/.test(form.code.trim())) {
    errors.value.code = t.value("verificationCodeFormat");
  }

  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (!validateForm() || isLoading.value) return;

  try {
    await verifyEmail(props.email, form.code.trim());
    emit("verified");
    // Reset form
    form.code = "";
    errors.value = {};
  } catch (error) {
    console.error("Email verification failed:", error);
    errors.value.general = t.value("verificationFailed");
  }
};

const handleResendCode = async () => {
  try {
    await resendVerificationCode(props.email);
    errors.value = {};
    // You might want to show a success message here
  } catch (error) {
    console.error("Resend code failed:", error);
    errors.value.general = t.value("resendCodeFailed");
  }
};

const closeModal = () => {
  emit("close");
  // Reset form and errors
  form.code = "";
  errors.value = {};
};

// Handle click outside modal
const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

// Auto-format code input (add spaces for readability)
const formatCode = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, ""); // Remove non-digits
  
  if (value.length > 6) {
    value = value.slice(0, 6);
  }
  
  form.code = value;
  input.value = value;
};

// Handle paste event
const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const pastedText = event.clipboardData?.getData('text') || "";
  const digits = pastedText.replace(/\D/g, "").slice(0, 6);
  form.code = digits;
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
          <div class="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Shield class="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">
            {{ t("verifyEmail") }}
          </h2>
        </div>
        <button
          @click="closeModal"
          class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X class="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="p-4 space-y-4">
        <!-- Info Message -->
        <div class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <div class="flex items-start space-x-2">
            <Mail class="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p class="text-xs text-blue-800 dark:text-blue-200 font-medium">
                {{ t("verificationCodeSent") }}
              </p>
              <p class="text-xs text-blue-600 dark:text-blue-300 mt-1">
                {{ t("checkEmailFor") }} <span class="font-medium">{{ email }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- General Error -->
        <div
          v-if="errors.general"
          class="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg"
        >
          <p class="text-xs text-red-600 dark:text-red-400">
            {{ errors.general }}
          </p>
        </div>

        <!-- Verification Code Field -->
        <div>
          <label
            class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ t("verificationCode") }}
          </label>
          <div class="relative">
            <input
              v-model="form.code"
              type="text"
              inputmode="numeric"
              maxlength="6"
              autocomplete="one-time-code"
              :placeholder="t('verificationCodePlaceholder')"
              @input="formatCode"
              @paste="handlePaste"
              class="w-full px-4 py-3 text-center text-lg font-mono tracking-widest border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              :class="{
                'border-red-500 dark:border-red-400': errors.code,
              }"
            />
          </div>
          <p
            v-if="errors.code"
            class="mt-1 text-xs text-red-600 dark:text-red-400"
          >
            {{ errors.code }}
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="!isFormValid || isLoading"
          class="w-full py-2.5 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 text-sm"
        >
          <CheckCircle v-if="!isLoading" class="h-4 w-4" />
          <div
            v-else
            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
          ></div>
          <span>{{ isLoading ? t("verifying") : t("verifyCode") }}</span>
        </button>

        <!-- Resend Code -->
        <div class="text-center pt-2">
          <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
            {{ t("didNotReceiveCode") }}
          </p>
          <button
            type="button"
            @click="handleResendCode"
            :disabled="isLoading"
            class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium disabled:opacity-50"
          >
            {{ t("resendCode") }}
          </button>
        </div>
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
