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
  },
  {
    path: "/community",
    name: "Community",
    component: CommunityPage,
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

export default router;
