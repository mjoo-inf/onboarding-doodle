import React from 'react';
import {
  Box,
  Stack,
  Group,
  Title,
  Text,
  Button,
  Paper,
  Badge,
  Avatar,
  TextInput,
  Image,
} from '@inflearn/ds-react';
import { FontAwesomeIcon } from '@inflearn/react-fontawesome';
import {
  faStar,
  faChevronRight,
  faSearch,
  faUser,
  faBell,
  faShoppingCart,
} from '@inflearn/pro-solid-svg-icons';
import { useOnboardingStore, OnboardingState } from '../store/useOnboardingStore';
import {
  PURPOSE_OPTIONS,
  INTEREST_OPTIONS,
  SKILL_OPTIONS,
} from '../constants/onboardingOptions';

interface HomePageProps {
  userName?: string;
  isOnboardingCompleted: boolean;
  hasSkippedOnboarding?: boolean;
  isOnboardingOpen?: boolean;
  onStartOnboarding?: () => void;
}

interface CourseData {
  id: string;
  thumbnail: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
}

// 카테고리 데이터
const CATEGORIES = [
  '개발 · 프로그래밍',
  '게임 개발',
  '데이터 사이언스',
  '인공지능',
  '보안 · 네트워크',
  '기획 · 경영',
  '디자인',
  '마케팅',
  '교양 · 기타',
];

// Course Card Component - inflearn 스타일
function CourseCard({ thumbnail, title, instructor, rating, reviewCount, studentCount }: Omit<CourseData, 'id'>) {
  return (
    <Box
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
        '&:hover .course-title': {
          color: '#00C471',
        },
      }}
    >
      <Stack spacing={12}>
        {/* Thumbnail */}
        <Box
          sx={(theme) => ({
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: theme.radius.sm,
            overflow: 'hidden',
            backgroundColor: theme.colors.gray[1],
          })}
        >
          <Image
            src={thumbnail}
            alt={title}
            width="100%"
            height="100%"
            fit="cover"
            withPlaceholder
          />
        </Box>

        {/* Info */}
        <Stack spacing={6}>
          <Text
            className="course-title"
            weight={700}
            lineClamp={2}
            size="sm"
            color="gray.9"
            sx={{ lineHeight: 1.4, transition: 'color 0.2s ease' }}
          >
            {title}
          </Text>
          <Text size="xs" color="gray.6">
            {instructor}
          </Text>
          <Group spacing={4} noWrap>
            <FontAwesomeIcon icon={faStar} style={{ fontSize: 11, color: '#fab005' }} />
            <Text size="xs" color="gray.7" weight={600}>
              {rating.toFixed(1)}
            </Text>
          </Group>
          <Text size="xs" color="gray.5">
            +{studentCount.toLocaleString()}명
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

// Section Header - inflearn 스타일
function SectionHeader({ title, showMore = true }: { title: string; showMore?: boolean }) {
  return (
    <Group position="apart" align="center">
      <Title order={4} color="gray.9" sx={{ fontWeight: 700 }}>
        {title}
      </Title>
      {showMore && (
        <Button
          variant="subtle"
          color="gray"
          compact
          rightIcon={<FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10 }} />}
          sx={{ fontWeight: 500 }}
        >
          전체보기
        </Button>
      )}
    </Group>
  );
}

// Onboarding Banner
function OnboardingBanner({
  onStart,
  hasSkipped,
  isOnboardingOpen,
}: {
  onStart?: () => void;
  hasSkipped?: boolean;
  isOnboardingOpen?: boolean;
}) {
  const useCompactStyle = Boolean(hasSkipped || isOnboardingOpen);

  // 건너뛰기/진행 중 배너 (심플 스타일)
  if (useCompactStyle) {
    return (
      <Box
        sx={(theme) => ({
          position: 'relative',
          padding: '1px',
          borderRadius: theme.radius.xl,
          background: `linear-gradient(90deg, ${theme.colors.infgreen[2]} 0%, ${theme.colors.cyan[2]} 100%)`,
          zIndex: 1,
        })}
      >
        <Box
          sx={(theme) => ({
            padding: '12px 16px 12px 20px',
            borderRadius: `calc(${theme.radius.xl} - 1px)`,
            background: `linear-gradient(90deg, ${theme.colors.infgreen[0]} 0%, ${theme.colors.cyan[0]} 100%)`,
          })}
        >
          <Group position="apart" noWrap>
            <Group spacing="sm" noWrap>
              <FontAwesomeIcon
                icon={faSearch}
                style={{ fontSize: 16, color: '#00C471' }}
              />
              <Text size="md" weight={600} color="infgreen.7">
                관심사 완료하고 추천받기
              </Text>
            </Group>
            <Button
              size="sm"
              color="infgreen"
              radius="md"
              onClick={() => onStart?.()}
              sx={{ fontWeight: 600 }}
            >
              이어하기
            </Button>
          </Group>
        </Box>
      </Box>
    );
  }

  // 처음 방문 배너 (그라데이션 스타일)
  return (
    <Paper
      p="xl"
      radius="lg"
      sx={(theme) => ({
        background: `linear-gradient(135deg, ${theme.colors.infgreen[5]} 0%, ${theme.colors.infgreen[7]} 100%)`,
        color: 'white',
      })}
    >
      <Group position="apart" noWrap>
        <Stack spacing="xs">
          <Title order={3} sx={{ color: 'white' }}>
            나에게 딱 맞는 강의를 찾아보세요
          </Title>
          <Text size="sm" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            간단한 질문에 답하면 AI가 맞춤 강의를 추천해드려요
          </Text>
        </Stack>
        <Button
          variant="white"
          color="infgreen"
          size="md"
          radius="md"
          onClick={onStart}
          sx={{ flexShrink: 0, fontWeight: 600 }}
        >
          시작하기
        </Button>
      </Group>
    </Paper>
  );
}

// Mock 강의 데이터
const POPULAR_COURSES: CourseData[] = [
  {
    id: '1',
    thumbnail: 'https://picsum.photos/seed/pop1/400/225',
    title: '모든 개발자를 위한 HTTP 웹 기본 지식',
    instructor: '김영한',
    rating: 4.9,
    reviewCount: 5420,
    studentCount: 42000,
  },
  {
    id: '2',
    thumbnail: 'https://picsum.photos/seed/pop2/400/225',
    title: '스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술',
    instructor: '김영한',
    rating: 4.9,
    reviewCount: 8932,
    studentCount: 68000,
  },
  {
    id: '3',
    thumbnail: 'https://picsum.photos/seed/pop3/400/225',
    title: '따라하며 배우는 노드, 리액트 시리즈 - 기본 강의',
    instructor: 'John Ahn',
    rating: 4.8,
    reviewCount: 3241,
    studentCount: 28000,
  },
  {
    id: '4',
    thumbnail: 'https://picsum.photos/seed/pop4/400/225',
    title: '실전! 스프링 부트와 JPA 활용1 - 웹 애플리케이션 개발',
    instructor: '김영한',
    rating: 4.9,
    reviewCount: 4521,
    studentCount: 35000,
  },
  {
    id: '5',
    thumbnail: 'https://picsum.photos/seed/pop5/400/225',
    title: '파이썬 무료 강의 (기본편) - 6시간 뒤면 나도 개발자',
    instructor: '나도코딩',
    rating: 4.9,
    reviewCount: 8932,
    studentCount: 120000,
  },
];

const NEW_COURSES: CourseData[] = [
  {
    id: '6',
    thumbnail: 'https://picsum.photos/seed/new1/400/225',
    title: 'ChatGPT와 함께하는 AI 앱 개발 - 실전 프로젝트',
    instructor: '박AI',
    rating: 4.9,
    reviewCount: 234,
    studentCount: 1800,
  },
  {
    id: '7',
    thumbnail: 'https://picsum.photos/seed/new2/400/225',
    title: 'Figma 완벽 마스터 - UI/UX 디자인의 모든 것',
    instructor: '김디자인',
    rating: 4.8,
    reviewCount: 189,
    studentCount: 2100,
  },
  {
    id: '8',
    thumbnail: 'https://picsum.photos/seed/new3/400/225',
    title: 'Next.js 14 완벽 가이드 - App Router와 서버 컴포넌트',
    instructor: '이프론트',
    rating: 4.7,
    reviewCount: 156,
    studentCount: 890,
  },
  {
    id: '9',
    thumbnail: 'https://picsum.photos/seed/new4/400/225',
    title: 'Kubernetes 입문부터 실전까지 - DevOps 엔지니어 되기',
    instructor: '정데브옵스',
    rating: 4.8,
    reviewCount: 98,
    studentCount: 650,
  },
  {
    id: '10',
    thumbnail: 'https://picsum.photos/seed/new5/400/225',
    title: 'LangChain으로 LLM 기반 AI 서비스 개발하기',
    instructor: '테디노트',
    rating: 4.8,
    reviewCount: 890,
    studentCount: 3200,
  },
];

const FREE_COURSES: CourseData[] = [
  {
    id: '11',
    thumbnail: 'https://picsum.photos/seed/free1/400/225',
    title: '생활코딩 - HTML & Internet',
    instructor: '이고잉',
    rating: 4.9,
    reviewCount: 12000,
    studentCount: 250000,
  },
  {
    id: '12',
    thumbnail: 'https://picsum.photos/seed/free2/400/225',
    title: '모두를 위한 딥러닝 강좌 시즌1',
    instructor: '김성훈',
    rating: 4.9,
    reviewCount: 5000,
    studentCount: 89000,
  },
  {
    id: '13',
    thumbnail: 'https://picsum.photos/seed/free3/400/225',
    title: '타입스크립트 입문 - 기초부터 실전까지',
    instructor: '캡틴판교',
    rating: 4.9,
    reviewCount: 3241,
    studentCount: 45000,
  },
  {
    id: '14',
    thumbnail: 'https://picsum.photos/seed/free4/400/225',
    title: 'Git과 GitHub 시작하기',
    instructor: '얄코',
    rating: 4.8,
    reviewCount: 2890,
    studentCount: 67000,
  },
  {
    id: '15',
    thumbnail: 'https://picsum.photos/seed/free5/400/225',
    title: 'Do it! 알고리즘 코딩테스트 with Python',
    instructor: '김종관',
    rating: 4.7,
    reviewCount: 1230,
    studentCount: 23000,
  },
];

export function HomePage({
  userName = '회원',
  isOnboardingCompleted,
  hasSkippedOnboarding,
  isOnboardingOpen,
  onStartOnboarding,
}: HomePageProps) {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', backgroundColor: 'white' }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e9ecef',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <Group position="apart" sx={{ height: 64 }} noWrap>
            {/* Left - Logo & Nav */}
            <Group spacing="xl" noWrap>
              <Title order={3} color="infgreen.6" sx={{ fontWeight: 800, cursor: 'pointer' }}>
                inflearn
              </Title>
              <Group spacing="md" sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
                <Text size="sm" weight={500} color="gray.7" sx={{ cursor: 'pointer', '&:hover': { color: '#00C471' } }}>
                  강의
                </Text>
                <Text size="sm" weight={500} color="gray.7" sx={{ cursor: 'pointer', '&:hover': { color: '#00C471' } }}>
                  로드맵
                </Text>
                <Text size="sm" weight={500} color="gray.7" sx={{ cursor: 'pointer', '&:hover': { color: '#00C471' } }}>
                  커뮤니티
                </Text>
                <Text size="sm" weight={500} color="gray.7" sx={{ cursor: 'pointer', '&:hover': { color: '#00C471' } }}>
                  채용정보
                </Text>
              </Group>
            </Group>

            {/* Center - Search */}
            <Box sx={{ flex: 1, maxWidth: 400, margin: '0 24px', '@media (max-width: 768px)': { display: 'none' } }}>
              <TextInput
                placeholder="배우고 싶은 지식을 검색해보세요"
                icon={<FontAwesomeIcon icon={faSearch} style={{ fontSize: 14, color: '#adb5bd' }} />}
                radius="xl"
                size="sm"
                styles={{
                  input: {
                    backgroundColor: '#f8f9fa',
                    border: 'none',
                    '&:focus': {
                      border: '1px solid #00C471',
                    },
                  },
                }}
              />
            </Box>

            {/* Right - Icons & Profile */}
            <Group spacing="md" noWrap>
              <Box sx={{ cursor: 'pointer', '@media (max-width: 768px)': { display: 'none' } }}>
                <FontAwesomeIcon icon={faBell} style={{ fontSize: 18, color: '#868e96' }} />
              </Box>
              <Box sx={{ cursor: 'pointer', '@media (max-width: 768px)': { display: 'none' } }}>
                <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: 18, color: '#868e96' }} />
              </Box>
              <Avatar size="sm" radius="xl" color="infgreen" sx={{ cursor: 'pointer' }}>
                {userName.charAt(0)}
              </Avatar>
            </Group>
          </Group>
        </Box>
      </Box>

      {/* Category Bar */}
      <Box sx={{ backgroundColor: 'white', borderBottom: '1px solid #f1f3f5' }}>
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: '12px 24px' }}>
          <Group spacing="sm" noWrap sx={{ overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant="outline"
                color="gray"
                size="lg"
                radius="xl"
                sx={{
                  cursor: 'pointer',
                  flexShrink: 0,
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  },
                }}
              >
                {category}
              </Badge>
            ))}
          </Group>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        <Stack spacing={48}>
          {/* Onboarding Banner */}
          {!isOnboardingCompleted && (
            <OnboardingBanner
              onStart={onStartOnboarding}
              hasSkipped={hasSkippedOnboarding}
              isOnboardingOpen={isOnboardingOpen}
            />
          )}

          {/* 지금 인기있는 강의 */}
          <Stack spacing="lg">
            <SectionHeader title="지금 가장 인기있는 강의" />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 24,
                '@media (max-width: 1024px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
                '@media (max-width: 768px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
                '@media (max-width: 576px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
              }}
            >
              {POPULAR_COURSES.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </Box>
          </Stack>

          {/* 신규 강의 */}
          <Stack spacing="lg">
            <SectionHeader title="따끈따끈, 신규 강의를 만나보세요" />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 24,
                '@media (max-width: 1024px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
                '@media (max-width: 768px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
                '@media (max-width: 576px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
              }}
            >
              {NEW_COURSES.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </Box>
          </Stack>

          {/* 무료 강의 */}
          <Stack spacing="lg">
            <SectionHeader title="무료 강의로 시작해보세요" />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 24,
                '@media (max-width: 1024px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
                '@media (max-width: 768px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
                '@media (max-width: 576px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
              }}
            >
              {FREE_COURSES.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </Box>
          </Stack>
        </Stack>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#1b1c1d', marginTop: 80, padding: '48px 24px' }}>
        <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
          <Group position="apart" align="flex-start">
            <Stack spacing="md">
              <Title order={4} sx={{ color: 'white', fontWeight: 800 }}>
                inflearn
              </Title>
              <Text size="sm" color="gray.5">
                배움의 즐거움, 인프런에서 시작하세요.
              </Text>
            </Stack>
            <Group spacing={48} sx={{ '@media (max-width: 768px)': { display: 'none' } }}>
              <Stack spacing="xs">
                <Text size="sm" weight={600} color="gray.4">
                  인프런
                </Text>
                <Text size="xs" color="gray.6" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  공지사항
                </Text>
                <Text size="xs" color="gray.6" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  인프런 소개
                </Text>
                <Text size="xs" color="gray.6" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  인프런 채용
                </Text>
              </Stack>
              <Stack spacing="xs">
                <Text size="sm" weight={600} color="gray.4">
                  고객센터
                </Text>
                <Text size="xs" color="gray.6" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  자주 묻는 질문
                </Text>
                <Text size="xs" color="gray.6" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  수료증 확인
                </Text>
                <Text size="xs" color="gray.6" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  이용약관
                </Text>
              </Stack>
              <Stack spacing="xs">
                <Text size="sm" weight={600} color="gray.4">
                  신청하기
                </Text>
                <Text size="xs" color="gray.6" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  지식공유자 되기
                </Text>
                <Text size="xs" color="gray.6" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>
                  멘토 되기
                </Text>
              </Stack>
            </Group>
          </Group>
          <Box sx={{ borderTop: '1px solid #343a40', marginTop: 32, paddingTop: 24 }}>
            <Text size="xs" color="gray.6">
              (주)인프랩 | 대표자: 이형주 | 사업자등록번호: 499-81-00612
            </Text>
            <Text size="xs" color="gray.6" mt={4}>
              © 2025 Inflearn. All rights reserved.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
