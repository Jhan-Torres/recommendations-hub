import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../features/landing/components/LandingPage.vue";
import RecommendationsPage from "../features/recommendations/components/RecommendationsPage.vue";
import WatchListPage from "../features/watchlist/components/WatchListPage.vue";
import ProfilePage from "../features/auth/components/ProfilePage.vue";

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
    path: "/watch-list",
    name: "WatchList",
    component: WatchListPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  // Redirect old URLs to new ones for backward compatibility
  {
    path: "/vlur-app",
    redirect: "/recommendations",
  },
  {
    path: "/vlur-community",
    redirect: "/",
  },
  {
    path: "/community",
    redirect: "/",
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
