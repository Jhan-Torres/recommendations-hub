// App routing configuration
export interface Route {
  path: string;
  component: string;
  name: string;
}

export const routes: Route[] = [
  {
    path: "/",
    component: "LandingPage",
    name: "landing",
  },
  {
    path: "/recommendations",
    component: "RecommendationsPage",
    name: "recommendations",
  },
  {
    path: "/community",
    component: "CommunityPage",
    name: "community",
  },
];
