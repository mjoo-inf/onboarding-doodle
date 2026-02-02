import { useCallback } from 'react';
import { useOnboardingStore } from '../store/useOnboardingStore';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
}

// Analytics 함수 (실제 구현시 GA, Amplitude 등으로 대체)
const trackEvent = (event: AnalyticsEvent) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event);
  }
  // 실제 구현
  // amplitude.track(event.event, event.properties);
  // gtag('event', event.event, event.properties);
};

export function useOnboardingAnalytics() {
  const { currentStep, purpose, interests, skills } = useOnboardingStore();

  const trackOnboardingStarted = useCallback((source: string = 'signup') => {
    trackEvent({
      event: 'onboarding_started',
      properties: { source },
    });
  }, []);

  const trackStepCompleted = useCallback(
    (stepName: string, selections?: unknown) => {
      trackEvent({
        event: 'onboarding_step_completed',
        properties: {
          step: currentStep,
          stepName,
          selections,
        },
      });
    },
    [currentStep]
  );

  const trackOnboardingCompleted = useCallback(
    (elapsedTime: number) => {
      trackEvent({
        event: 'onboarding_completed',
        properties: {
          purpose,
          interests,
          skills,
          totalTime: elapsedTime,
        },
      });
    },
    [purpose, interests, skills]
  );

  const trackOnboardingSkipped = useCallback(
    (stepName: string) => {
      trackEvent({
        event: 'onboarding_skipped',
        properties: {
          step: currentStep,
          stepName,
        },
      });
    },
    [currentStep]
  );

  const trackCourseClicked = useCallback(
    (courseId: string, position: number) => {
      trackEvent({
        event: 'onboarding_course_clicked',
        properties: {
          courseId,
          position,
          purpose,
          interests,
          skills,
        },
      });
    },
    [purpose, interests, skills]
  );

  return {
    trackOnboardingStarted,
    trackStepCompleted,
    trackOnboardingCompleted,
    trackOnboardingSkipped,
    trackCourseClicked,
  };
}
