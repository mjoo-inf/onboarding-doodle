export type { OnboardingState } from '../store/useOnboardingStore';
export type { CourseData } from '../components/CourseRecommendCard';
export type {
  PurposeOption,
  InterestOption,
} from '../constants/onboardingOptions';

// Step names for tracking
export type OnboardingStepName =
  | 'purpose'
  | 'interests'
  | 'skills'
  | 'result';

export const STEP_NAMES: Record<number, OnboardingStepName> = {
  1: 'purpose',
  2: 'interests',
  3: 'skills',
  4: 'result',
};
