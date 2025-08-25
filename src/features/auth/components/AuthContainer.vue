<script setup lang="ts">
import { ref, watch } from "vue";
import { useScrollLock } from "@/shared/composables/useScrollLock";
import LoginModal from "./LoginModal.vue";
import SignupModal from "./SignupModal.vue";
import EmailVerificationModal from "./EmailVerificationModal.vue";

const props = defineProps<{
  show: boolean;
  initialMode?: "login" | "signup";
}>();

const emit = defineEmits<{
  close: [];
}>();

const currentMode = ref<"login" | "signup" | "verify">(props.initialMode || "login");
const showLoginModal = ref(false);
const showSignupModal = ref(false);
const showVerificationModal = ref(false);
const verificationEmail = ref("");

// Initialize scroll lock
const { lock, unlock } = useScrollLock();

// Watch for prop changes and handle scroll locking
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      // Lock scrolling when modal opens
      lock();

      // Reset mode to initial mode when opening
      currentMode.value = props.initialMode || "login";

      if (currentMode.value === "login") {
        showLoginModal.value = true;
        showSignupModal.value = false;
        showVerificationModal.value = false;
      } else if (currentMode.value === "signup") {
        showLoginModal.value = false;
        showSignupModal.value = true;
        showVerificationModal.value = false;
      } else if (currentMode.value === "verify") {
        showLoginModal.value = false;
        showSignupModal.value = false;
        showVerificationModal.value = true;
      }
    } else {
      // Unlock scrolling when modal closes
      unlock();
      showLoginModal.value = false;
      showSignupModal.value = false;
      showVerificationModal.value = false;
    }
  },
  { immediate: true }
);

// Watch for initialMode changes
watch(
  () => props.initialMode,
  (newMode) => {
    if (props.show && newMode) {
      currentMode.value = newMode;
      if (newMode === "login") {
        showLoginModal.value = true;
        showSignupModal.value = false;
        showVerificationModal.value = false;
      } else if (newMode === "signup") {
        showLoginModal.value = false;
        showSignupModal.value = true;
        showVerificationModal.value = false;
      } else if (newMode === "verify") {
        showLoginModal.value = false;
        showSignupModal.value = false;
        showVerificationModal.value = true;
      }
    }
  }
);

const switchToSignup = () => {
  currentMode.value = "signup";
  showLoginModal.value = false;
  showSignupModal.value = true;
  showVerificationModal.value = false;
};

const switchToLogin = () => {
  currentMode.value = "login";
  showLoginModal.value = true;
  showSignupModal.value = false;
  showVerificationModal.value = false;
};

const switchToVerification = (email: string) => {
  currentMode.value = "verify";
  verificationEmail.value = email;
  showLoginModal.value = false;
  showSignupModal.value = false;
  showVerificationModal.value = true;
};

const handleVerificationComplete = () => {
  // Close all modals when verification is complete
  closeModal();
};

const closeModal = () => {
  showLoginModal.value = false;
  showSignupModal.value = false;
  showVerificationModal.value = false;
  emit("close");
};
</script>

<template>
  <div>
    <LoginModal
      :show="showLoginModal"
      @close="closeModal"
      @switch-to-signup="switchToSignup"
    />

    <SignupModal
      :show="showSignupModal"
      @close="closeModal"
      @switch-to-login="switchToLogin"
      @require-verification="switchToVerification"
    />

    <EmailVerificationModal
      :show="showVerificationModal"
      :email="verificationEmail"
      @close="closeModal"
      @verified="handleVerificationComplete"
    />
  </div>
</template>
