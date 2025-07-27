// Landing page types and state models
export interface LandingState {
  isFirstVisit: boolean;
  showFeatures: boolean;
  currentStep: number;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface StatisticItem {
  value: string;
  label: string;
}
