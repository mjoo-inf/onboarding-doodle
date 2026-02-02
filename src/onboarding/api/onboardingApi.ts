import type { OnboardingState } from '../store/useOnboardingStore';
import type { CourseData } from '../components/CourseRecommendCard';

interface SaveOnboardingRequest {
  purpose: string[];
  interests: string[];
  skills: string[];
  birthYear?: number | null;
}

interface SaveOnboardingResponse {
  success: boolean;
  userId: string;
}

interface GetRecommendationsRequest {
  purpose: string[];
  interests: string[];
  skills: string[];
}

interface GetRecommendationsResponse {
  courses: CourseData[];
  totalCount: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * 온보딩 데이터 저장
 */
export async function saveOnboardingData(
  data: SaveOnboardingRequest
): Promise<SaveOnboardingResponse> {
  const response = await fetch(`${API_BASE_URL}/users/onboarding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to save onboarding data');
  }

  return response.json();
}

/**
 * 추천 강의 조회
 */
export async function getRecommendations(
  data: GetRecommendationsRequest
): Promise<GetRecommendationsResponse> {
  const params = new URLSearchParams({
    purpose: data.purpose.join(','),
    interests: data.interests.join(','),
    skills: data.skills.join(','),
  });

  const response = await fetch(`${API_BASE_URL}/recommendations?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  return response.json();
}

/**
 * 온보딩 상태로부터 API 요청 데이터 생성
 */
export function createOnboardingRequest(
  state: OnboardingState
): SaveOnboardingRequest {
  return {
    purpose: state.purpose,
    interests: state.interests,
    skills: state.skills,
  };
}

/**
 * 온보딩 상태로부터 추천 요청 데이터 생성
 */
export function createRecommendationRequest(
  state: OnboardingState
): GetRecommendationsRequest {
  return {
    purpose: state.purpose,
    interests: state.interests,
    skills: state.skills,
  };
}
