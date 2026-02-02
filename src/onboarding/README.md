# 온보딩 컴포넌트

신규 유저 온보딩 및 맥락 수집을 위한 컴포넌트입니다.

## 개요

PRD에 따라 설계된 온보딩 플로우:
- **목적**: 신규 유저의 이탈 방지 및 맥락 데이터 수집
- **방식**: 가입 직후 풀스크린 대화형 플로우 (v2)
- **특징**: 점진적 맥락 수집 (Progressive Profiling)

## 설치

```bash
# 필요한 의존성
yarn add @inflearn/ds-react zustand
```

## 사용법

### 기본 사용

```tsx
import { OnboardingPage, HomePage } from '@/onboarding';

function App() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  if (!isOnboardingCompleted) {
    return (
      <OnboardingPage
        userName="홍길동"
        onComplete={() => setIsOnboardingCompleted(true)}
        onSkip={() => setIsOnboardingCompleted(true)}
      />
    );
  }

  return (
    <HomePage
      userName="홍길동"
      isOnboardingCompleted={true}
    />
  );
}
```

### Next.js Pages Router

```tsx
// pages/onboarding.tsx
import { OnboardingPage } from '@/onboarding';

export default function OnboardingPageRoute() {
  const router = useRouter();

  return (
    <OnboardingPage
      userName="홍길동"
      onComplete={() => router.push('/')}
      onSkip={() => router.push('/')}
    />
  );
}
```

### Next.js App Router

```tsx
// app/onboarding/page.tsx
'use client';

import { OnboardingPage } from '@/onboarding';

export default function OnboardingPageRoute() {
  const router = useRouter();

  return (
    <OnboardingPage
      userName="홍길동"
      onComplete={() => router.push('/')}
      onSkip={() => router.push('/')}
    />
  );
}
```

## 플로우

```
Step 1: 학습 목적 선택 (복수 선택)
    ↓
Step 2: 관심 분야 선택 (최대 3개)
    ↓
Step 3: 스킬 선택 (복수 선택)
    ↓
Step 4: 추천 결과 → 홈페이지
```

## 수집 데이터

| 항목 | 설명 | 필수 |
|------|------|------|
| purpose | 학습 목적 (복수) | O |
| interests | 관심 분야 (최대 3개) | O |
| skills | 배우고 싶은 스킬 (복수) | O |

## 컴포넌트 구조

```
onboarding/
├── components/
│   ├── OnboardingLayout.tsx    # 레이아웃 컴포넌트
│   ├── OnboardingQuestion.tsx  # 질문 영역
│   ├── SelectionCard.tsx       # 선택 카드
│   ├── InterestChip.tsx        # 관심 분야/스킬 칩
│   └── CourseRecommendCard.tsx # 추천 강의 카드
├── steps/
│   ├── PurposeStep.tsx         # Step 1: 목적 선택
│   ├── InterestsStep.tsx       # Step 2: 분야 선택
│   ├── SkillsStep.tsx          # Step 3: 스킬 선택
│   └── ResultStep.tsx          # Step 4: 결과
├── pages/
│   └── HomePage.tsx            # 홈페이지 (맞춤 추천)
├── store/
│   └── useOnboardingStore.ts   # Zustand 스토어
├── hooks/
│   └── useOnboardingAnalytics.ts
├── api/
│   └── onboardingApi.ts
├── constants/
│   └── onboardingOptions.ts
├── types/
│   └── index.ts
├── styles/
│   └── animations.ts
├── OnboardingPage.tsx          # 메인 페이지 컴포넌트
└── index.ts                    # Export
```

## 상태 관리

Zustand를 사용한 상태 관리:

```tsx
import { useOnboardingStore } from '@/onboarding';

function MyComponent() {
  const {
    currentStep,
    purpose,
    interests,
    skills,
    nextStep,
    prevStep,
    togglePurpose,
    toggleInterest,
    toggleSkill,
  } = useOnboardingStore();

  // ...
}
```

## API 연동

```tsx
import { saveOnboardingData, getRecommendations } from '@/onboarding/api/onboardingApi';

// 온보딩 데이터 저장
await saveOnboardingData({
  purpose: ['job_seeking', 'skill_up'],
  interests: ['frontend', 'backend'],
  skills: ['react', 'typescript', 'nodejs'],
});

// 추천 강의 조회
const { courses } = await getRecommendations({
  purpose: ['job_seeking'],
  interests: ['frontend'],
  skills: ['react'],
});
```

## 홈페이지 맞춤 추천

온보딩 완료 후 홈페이지에서 선택한 스킬 기반 맞춤 추천 강의를 표시합니다:

```tsx
import { HomePage } from '@/onboarding';

<HomePage
  userName="홍길동"
  isOnboardingCompleted={true}
  onStartOnboarding={() => router.push('/onboarding')}
/>
```

**기능:**
- 선택한 스킬 기반 강의 추천
- 개인화된 환영 메시지
- 미완료 유저에게 온보딩 배너 표시

## 분석 이벤트

```tsx
import { useOnboardingAnalytics } from '@/onboarding/hooks/useOnboardingAnalytics';

const {
  trackOnboardingStarted,
  trackStepCompleted,
  trackOnboardingCompleted,
  trackOnboardingSkipped,
  trackCourseClicked,
} = useOnboardingAnalytics();
```

### 이벤트 목록

| 이벤트 | 설명 |
|--------|------|
| `onboarding_started` | 온보딩 시작 |
| `onboarding_step_completed` | 스텝 완료 |
| `onboarding_completed` | 온보딩 완료 |
| `onboarding_skipped` | 온보딩 건너뛰기 |
| `onboarding_course_clicked` | 추천 강의 클릭 |

## 디자인 시스템

Inflab Design System 기반:

- **Primary Color**: Infgreen (#00C471)
- **Typography**: Pretendard
- **Spacing**: xs(8px), sm(12px), md(16px), lg(24px), xl(32px)
- **Radius**: md(8px), lg(12px)

## 접근성

- WCAG AA 준수
- 키보드 네비게이션 지원
- 스크린 리더 지원 (ARIA 속성)
- Focus Ring 스타일

## 반응형

| 요소 | Mobile | Tablet | Desktop |
|------|--------|--------|---------|
| 컨테이너 | 100% | 480px | 480px |
| 카드 그리드 | 1열 | 2열 | 4열 |
| Chip 그리드 | 2열 | 3열 | 3열 |

## Storybook

```bash
yarn storybook
```

스토리 목록:
- `Onboarding/OnboardingPage`
- `Onboarding/SelectionCard`

## 참고 문서

- PRD: `PRD-onboarding.md`
- UX/UI 설계서: `ONBOARDING_UX_UI_DESIGN.md`
- 디자인 시스템: `INFLAB_DESIGN_SYSTEM_GUIDE.md`
