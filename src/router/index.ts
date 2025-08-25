import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../features/landing/components/LandingPage.vue";
import RecommendationsPage from "../features/recommendations/components/RecommendationsPage.vue";
import CommunityPage from "../features/community/components/CommunityPage.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
  {
    path: "/recommendations",
    name: "Recommendations",
    component: RecommendationsPage,
    meta: { requiresAuth: false }, // Allow access but show login prompts for features
  },
  {
    path: "/community",
    name: "Community",
    component: CommunityPage,
    meta: { requiresAuth: false }, // Allow access but show login prompts for features
  },
  // Redirect any unknown routes to landing
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for authentication (if needed in the future)
router.beforeEach((_to, _from, next) => {
  // For now, we're not requiring authentication for any routes
  // In the future, we can add auth checks here:
  // const token = localStorage.getItem("auth_token");
  // if (to.meta.requiresAuth && !token) {
  //   next({ name: "Landing" });
  //   return;
  // }
  next();
});

export default router;
