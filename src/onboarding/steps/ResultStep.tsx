import React, { useEffect, useState } from 'react';
import { Stack, Button, Box, Text, Title, Loader, Alert } from '@inflearn/ds-react';
import { FontAwesomeIcon } from '@inflearn/react-fontawesome';
import { faTriangleExclamation } from '@inflearn/pro-regular-svg-icons';
import { useOnboardingStore } from '../store/useOnboardingStore';
import {
  CourseRecommendCard,
  CourseData,
} from '../components/CourseRecommendCard';
import {
  PURPOSE_OPTIONS,
  INTEREST_OPTIONS,
  SKILL_OPTIONS,
} from '../constants/onboardingOptions';

interface ResultStepProps {
  userName?: string;
  onGoHome: () => void;
  onViewMore: () => void;
}

// Mock 추천 강의 데이터
const MOCK_COURSES: CourseData[] = [
  {
    id: '1',
    thumbnail: 'https://picsum.photos/seed/course1/240/160',
    title: '프론트엔드 개발 입문 로드맵',
    instructor: '김개발',
    rating: 4.9,
    reviewCount: 2340,
    level: '초급',
    price: 'free',
  },
  {
    id: '2',
    thumbnail: 'https://picsum.photos/seed/course2/240/160',
    title: 'React 기초부터 실전까지',
    instructor: '박리액트',
    rating: 4.8,
    reviewCount: 1892,
    level: '초급',
    price: 49500,
  },
  {
    id: '3',
    thumbnail: 'https://picsum.photos/seed/course3/240/160',
    title: '취업을 위한 포트폴리오 만들기',
    instructor: '이취업',
    rating: 4.7,
    reviewCount: 987,
    level: '초급',
    price: 55000,
  },
];

// 스킬 라벨 가져오기 함수
function getSkillLabels(skills: string[], interests: string[]): string[] {
  const validSkills = skills.filter((s) => s !== 'unsure' && s !== 'custom');
  const labels: string[] = [];

  for (const interest of interests) {
    const skillOptions = SKILL_OPTIONS[interest] || [];
    for (const skill of validSkills) {
      const found = skillOptions.find((opt) => opt.value === skill);
      if (found && !labels.includes(found.label)) {
        labels.push(found.label);
      }
    }
  }

  return labels;
}

export function ResultStep({ userName = '회원', onGoHome, onViewMore }: ResultStepProps) {
  const { purpose, interests, skills, complete } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<CourseData[]>([]);

  // 선택한 정보 라벨 가져오기
  const purposeLabels = purpose
    .map((p) => PURPOSE_OPTIONS.find((opt) => opt.value === p)?.label)
    .filter(Boolean);
  const interestLabels = interests
    .map((i) => INTEREST_OPTIONS.find((opt) => opt.value === i)?.label)
    .filter(Boolean);
  const skillLabels = getSkillLabels(skills, interests);

  useEffect(() => {
    // API 호출 시뮬레이션
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 실제 구현시 API 호출
        // const response = await fetch('/api/recommendations', {
        //   method: 'POST',
        //   body: JSON.stringify({ purpose, interests, skills }),
        // });

        // Mock delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setCourses(MOCK_COURSES);
        complete();
      } catch (err) {
        setError('저장에 실패했습니다. 다시 시도해주세요');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [purpose, interests, skills, complete]);

  if (isLoading) {
    return (
      <Stack spacing="md" align="center" justify="center" sx={{ flex: 1 }}>
        <Loader color="infgreen" size="lg" />
        <Text color="gray.7" size="md">
          맞춤 강의를 찾고 있어요...
        </Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack spacing="md" align="center" justify="center" sx={{ flex: 1 }}>
        <Alert
          color="red"
          title="오류가 발생했어요"
          radius="md"
          icon={<FontAwesomeIcon icon={faTriangleExclamation} />}
        >
          <Text size="sm">{error}</Text>
          <Button
            variant="light"
            color="red"
            size="sm"
            radius="md"
            mt="md"
            onClick={() => window.location.reload()}
          >
            다시 시도
          </Button>
        </Alert>
      </Stack>
    );
  }

  return (
    <Stack spacing="lg">
      {/* Header */}
      <Stack spacing="sm" align="center">
        <Title order={3} align="center" color="gray.9">
          선택하신 내용을 바탕으로
          <br />
          인기 강의를 찾아봤어요!
        </Title>

        <Text size="sm" color="gray.6" align="center">
          마음에 드는 강의를 선택하거나,
          <br />
          AI에게 더 구체적으로 물어볼 수 있어요
        </Text>
      </Stack>

      {/* Course List */}
      <Stack spacing="md">
        {courses.map((course) => (
          <CourseRecommendCard
            key={course.id}
            course={course}
            onClick={() => {
              // 강의 상세 페이지로 이동
              console.log('Navigate to course:', course.id);
            }}
          />
        ))}
      </Stack>

      {/* Actions */}
      <Stack spacing="sm" sx={{ paddingTop: 16 }}>
        <Button
          size="lg"
          color="infgreen"
          radius="md"
          fullWidth
          onClick={onViewMore}
          sx={{
            height: 52,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          AI에게 더 구체적으로 물어보기
        </Button>

        <Button
          variant="light"
          color="gray"
          size="lg"
          radius="md"
          fullWidth
          onClick={onGoHome}
          sx={{
            height: 52,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          홈으로
        </Button>
      </Stack>
    </Stack>
  );
}
