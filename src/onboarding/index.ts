// Main Page Components
export { OnboardingPage } from './OnboardingPage';
export { HomePage } from './pages/HomePage';

// Store
export { useOnboardingStore } from './store/useOnboardingStore';
export type { OnboardingState } from './store/useOnboardingStore';

// Components
export {
  OnboardingLayout,
  OnboardingQuestion,
  SelectionCard,
  InterestChip,
  CourseRecommendCard,
} from './components';
export type { CourseData } from './components';

// Steps
export {
  PurposeStep,
  InterestsStep,
  SkillsStep,
  ResultStep,
} from './steps';

// Constants
export {
  PURPOSE_OPTIONS,
  INTEREST_OPTIONS,
  SKILL_OPTIONS,
  TOTAL_STEPS,
} from './constants/onboardingOptions';
export type {
  PurposeOption,
  InterestOption,
  SkillOption,
} from './constants/onboardingOptions';
