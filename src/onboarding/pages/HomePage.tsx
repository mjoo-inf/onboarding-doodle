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
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faSearch,
  faBars,
  faXmark,
  faBell,
  faShoppingCart,
} from '@inflearn/pro-solid-svg-icons';
import { CourseCard } from '../components/CourseCard';

interface HomePageProps {
  userName?: string;
  isOnboardingCompleted: boolean;
  hasSkippedOnboarding?: boolean;
  isOnboardingOpen?: boolean;
  onStartOnboarding?: () => void;
  onSearch?: (query: string) => void;
}

interface CourseData {
  id: string;
  thumbnail: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  category?: string;
  aiUsage?: boolean;
  level?: '입문' | '초급' | '중급' | '고급';
  price?: 'free' | number;
  originalPrice?: number;
}

// CourseCard moved to shared component

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
    category: '개발 · 프로그래밍',
    aiUsage: false,
    level: '입문',
    price: 55000,
    originalPrice: 79000,
  },
  {
    id: '2',
    thumbnail: 'https://picsum.photos/seed/pop2/400/225',
    title: '스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술',
    instructor: '김영한',
    rating: 4.9,
    reviewCount: 8932,
    studentCount: 68000,
    category: '개발 · 프로그래밍',
    aiUsage: false,
    level: '초급',
    price: 69000,
    originalPrice: 99000,
  },
  {
    id: '3',
    thumbnail: 'https://picsum.photos/seed/pop3/400/225',
    title: '따라하며 배우는 노드, 리액트 시리즈 - 기본 강의',
    instructor: 'John Ahn',
    rating: 4.8,
    reviewCount: 3241,
    studentCount: 28000,
    category: '개발 · 프로그래밍',
    aiUsage: true,
    level: '초급',
    price: 'free',
  },
  {
    id: '4',
    thumbnail: 'https://picsum.photos/seed/pop4/400/225',
    title: '실전! 스프링 부트와 JPA 활용1 - 웹 애플리케이션 개발',
    instructor: '김영한',
    rating: 4.9,
    reviewCount: 4521,
    studentCount: 35000,
    category: '개발 · 프로그래밍',
    aiUsage: false,
    level: '중급',
    price: 79000,
    originalPrice: 109000,
  },
  {
    id: '5',
    thumbnail: 'https://picsum.photos/seed/pop5/400/225',
    title: '파이썬 무료 강의 (기본편) - 6시간 뒤면 나도 개발자',
    instructor: '나도코딩',
    rating: 4.9,
    reviewCount: 8932,
    studentCount: 120000,
    category: '인공지능',
    aiUsage: true,
    level: '입문',
    price: 'free',
  },
];

const POPULAR_FILTERS = ['카테고리', 'AI 활용', '난이도', '할인', '무료'] as const;
type PopularFilter = (typeof POPULAR_FILTERS)[number];
type SortOrder = 'popular' | 'rating' | 'price_low' | 'price_high';

const NEW_COURSES: CourseData[] = [
  {
    id: '6',
    thumbnail: 'https://picsum.photos/seed/new1/400/225',
    title: 'ChatGPT와 함께하는 AI 앱 개발 - 실전 프로젝트',
    instructor: '박AI',
    rating: 4.9,
    reviewCount: 234,
    studentCount: 1800,
    category: '인공지능',
    aiUsage: true,
    level: '중급',
    price: 39000,
    originalPrice: 59000,
  },
  {
    id: '7',
    thumbnail: 'https://picsum.photos/seed/new2/400/225',
    title: 'Figma 완벽 마스터 - UI/UX 디자인의 모든 것',
    instructor: '김디자인',
    rating: 4.8,
    reviewCount: 189,
    studentCount: 2100,
    category: '디자인',
    aiUsage: false,
    level: '초급',
    price: 49000,
    originalPrice: 69000,
  },
  {
    id: '8',
    thumbnail: 'https://picsum.photos/seed/new3/400/225',
    title: 'Next.js 14 완벽 가이드 - App Router와 서버 컴포넌트',
    instructor: '이프론트',
    rating: 4.7,
    reviewCount: 156,
    studentCount: 890,
    category: '개발 · 프로그래밍',
    aiUsage: true,
    level: '중급',
    price: 62000,
    originalPrice: 82000,
  },
  {
    id: '9',
    thumbnail: 'https://picsum.photos/seed/new4/400/225',
    title: 'Kubernetes 입문부터 실전까지 - DevOps 엔지니어 되기',
    instructor: '정데브옵스',
    rating: 4.8,
    reviewCount: 98,
    studentCount: 650,
    category: '보안 · 네트워크',
    aiUsage: false,
    level: '고급',
    price: 71000,
    originalPrice: 91000,
  },
  {
    id: '10',
    thumbnail: 'https://picsum.photos/seed/new5/400/225',
    title: 'LangChain으로 LLM 기반 AI 서비스 개발하기',
    instructor: '테디노트',
    rating: 4.8,
    reviewCount: 890,
    studentCount: 3200,
    category: '인공지능',
    aiUsage: true,
    level: '초급',
    price: 45000,
    originalPrice: 59000,
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
    category: '개발 · 프로그래밍',
    aiUsage: false,
    level: '입문',
    price: 'free',
  },
  {
    id: '12',
    thumbnail: 'https://picsum.photos/seed/free2/400/225',
    title: '모두를 위한 딥러닝 강좌 시즌1',
    instructor: '김성훈',
    rating: 4.9,
    reviewCount: 5000,
    studentCount: 89000,
    category: '인공지능',
    aiUsage: true,
    level: '입문',
    price: 'free',
  },
  {
    id: '13',
    thumbnail: 'https://picsum.photos/seed/free3/400/225',
    title: '타입스크립트 입문 - 기초부터 실전까지',
    instructor: '캡틴판교',
    rating: 4.9,
    reviewCount: 3241,
    studentCount: 45000,
    category: '개발 · 프로그래밍',
    aiUsage: false,
    level: '초급',
    price: 'free',
  },
  {
    id: '14',
    thumbnail: 'https://picsum.photos/seed/free4/400/225',
    title: 'Git과 GitHub 시작하기',
    instructor: '얄코',
    rating: 4.8,
    reviewCount: 2890,
    studentCount: 67000,
    category: '개발 · 프로그래밍',
    aiUsage: false,
    level: '입문',
    price: 'free',
  },
  {
    id: '15',
    thumbnail: 'https://picsum.photos/seed/free5/400/225',
    title: 'Do it! 알고리즘 코딩테스트 with Python',
    instructor: '김종관',
    rating: 4.7,
    reviewCount: 1230,
    studentCount: 23000,
    category: '개발 · 프로그래밍',
    aiUsage: false,
    level: '초급',
    price: 'free',
  },
];

export function HomePage({
  userName = '회원',
  isOnboardingCompleted,
  hasSkippedOnboarding,
  isOnboardingOpen,
  onStartOnboarding,
  onSearch,
}: HomePageProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [popularFilters, setPopularFilters] = React.useState<PopularFilter[]>([]);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('popular');
  const [canScrollPopularLeft, setCanScrollPopularLeft] = React.useState(false);
  const [canScrollPopularRight, setCanScrollPopularRight] = React.useState(true);
  const searchContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mobileSearchContainerRef = React.useRef<HTMLDivElement | null>(null);
  const popularScrollRef = React.useRef<HTMLDivElement | null>(null);
  const isDraggingRef = React.useRef(false);
  const dragStartXRef = React.useRef(0);
  const scrollStartLeftRef = React.useRef(0);
  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    onSearch?.(trimmed);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isDesktopInside = searchContainerRef.current?.contains(target);
      const isMobileInside = mobileSearchContainerRef.current?.contains(target);
      if (!isDesktopInside && !isMobileInside) {
        setIsSearchPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showSearchPopover = !isOnboardingCompleted && isSearchPopoverOpen;
  const cardBaseWidth = 'calc((100% - 24px * 4) / 5)';

  const togglePopularFilter = (filter: PopularFilter) => {
    setPopularFilters((prev) =>
      prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]
    );
  };

  const matchesFilters = (course: CourseData) =>
    popularFilters.every((filter) => {
      switch (filter) {
        case '카테고리':
          return course.category === '개발 · 프로그래밍';
        case 'AI 활용':
          return course.aiUsage === true;
        case '난이도':
          return course.level === '입문' || course.level === '초급';
        case '할인':
          return (
            typeof course.price === 'number' &&
            typeof course.originalPrice === 'number' &&
            course.originalPrice > course.price
          );
        case '무료':
          return course.price === 'free';
        default:
          return true;
      }
    });

  const filteredPopularCourses = POPULAR_COURSES.filter(matchesFilters);
  const filteredNewCourses = NEW_COURSES.filter(matchesFilters);
  const filteredFreeCourses = FREE_COURSES.filter(matchesFilters);
  const isFiltering = popularFilters.length > 0;
  const filteredAllCourses = [...POPULAR_COURSES, ...NEW_COURSES, ...FREE_COURSES].filter(matchesFilters);

  const getNumericPrice = (price: CourseData['price']) => {
    if (price === 'free') return 0;
    if (typeof price === 'number') return price;
    return Number.MAX_SAFE_INTEGER;
  };

  const sortCourses = React.useCallback(
    (courses: CourseData[]) =>
      [...courses].sort((a, b) => {
        switch (sortOrder) {
          case 'rating':
            return b.rating - a.rating;
          case 'price_low':
            return getNumericPrice(a.price) - getNumericPrice(b.price);
          case 'price_high':
            return getNumericPrice(b.price) - getNumericPrice(a.price);
          case 'popular':
          default:
            return b.studentCount - a.studentCount;
        }
      }),
    [sortOrder]
  );

  const sortedFilteredAllCourses = sortCourses(filteredAllCourses);

  const scrollPopularBy = (direction: 'left' | 'right') => {
    const container = popularScrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 24 : 320;
    container.scrollBy({ left: direction === 'left' ? -step * 2 : step * 2, behavior: 'smooth' });
  };

  const updatePopularScrollState = React.useCallback(() => {
    const container = popularScrollRef.current;
    if (!container) return;
    setCanScrollPopularLeft(container.scrollLeft > 1);
    setCanScrollPopularRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 1);
  }, []);

  React.useEffect(() => {
    updatePopularScrollState();
  }, [updatePopularScrollState]);

  const searchPopoverContent = (
    <Stack spacing="md">
      <Group position="apart" align="center">
        <Text size="sm" weight={700} color="gray.8">
          실시간 인기 강의
        </Text>
        <Button
          variant="subtle"
          compact
          color="gray"
          rightIcon={<FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 10 }} />}
          sx={{ fontWeight: 500 }}
        >
          더보기
        </Button>
      </Group>

      <Stack spacing="sm">
        {POPULAR_COURSES.slice(0, 4).map((course) => (
          <Group key={course.id} spacing="sm" noWrap>
            <Box
              sx={(theme) => ({
                width: 64,
                height: 40,
                borderRadius: theme.radius.sm,
                overflow: 'hidden',
                backgroundColor: theme.colors.gray[1],
                flexShrink: 0,
              })}
            >
              <Image src={course.thumbnail} alt={course.title} width="100%" height="100%" fit="cover" withPlaceholder />
            </Box>
            <Stack spacing={2} sx={{ minWidth: 0 }}>
              <Text size="xs" weight={600} color="gray.9" lineClamp={1}>
                {course.title}
              </Text>
              <Text size="xs" color="gray.6" lineClamp={1}>
                {course.instructor}
              </Text>
            </Stack>
          </Group>
        ))}

        <Paper
          radius="md"
          p="md"
          sx={(theme) => ({
            background: `linear-gradient(135deg, ${theme.colors.infgreen[0]} 0%, ${theme.colors.cyan[0]} 100%)`,
            border: `1px solid ${theme.colors.infgreen[1]}`,
          })}
        >
          <Group position="apart" align="center" noWrap>
            <Stack spacing={4}>
              <Text size="sm" weight={700} color="gray.9">
                어떤 강의부터 들어야 할지 모르겠다면
              </Text>
              <Text size="xs" color="gray.6">
                질문 3개에 답하고 나에게 맞는 강의를 찾아보세요
              </Text>
            </Stack>
            <Button
              size="xs"
              color="infgreen"
              radius="md"
              onClick={() => onStartOnboarding?.()}
              sx={{ fontWeight: 600, flexShrink: 0 }}
            >
              추천 받기
            </Button>
          </Group>
        </Paper>
      </Stack>
    </Stack>
  );

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
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', '@media (max-width: 768px)': { padding: '0 16px' } }}>
          <Group position="apart" sx={{ height: 64 }} noWrap>
            {/* Left - Logo & Nav */}
            <Group spacing="xl" noWrap>
              <Box
                sx={{ display: 'none', '@media (max-width: 768px)': { display: 'block', cursor: 'pointer' } }}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} style={{ fontSize: 18, color: '#495057' }} />
              </Box>
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
            <Box
              ref={searchContainerRef}
              sx={{ flex: 1, maxWidth: 520, margin: '0 24px', position: 'relative', '@media (max-width: 768px)': { display: 'none' } }}
            >
              <TextInput
                placeholder="배우고 싶은 지식을 검색해보세요"
                icon={<FontAwesomeIcon icon={faSearch} style={{ fontSize: 14, color: '#adb5bd' }} />}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
                onFocus={() => setIsSearchPopoverOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSearch();
                  }
                }}
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

              {showSearchPopover && (
                <Paper
                  p="lg"
                  radius="lg"
                  shadow="md"
                  sx={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: 0,
                    right: 0,
                    zIndex: 200,
                    border: '1px solid #f1f3f5',
                  }}
                >
                  {searchPopoverContent}
                </Paper>
              )}
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
        {isMobileMenuOpen && (
          <Box
            sx={{
              display: 'none',
              '@media (max-width: 768px)': {
                display: 'block',
                borderTop: '1px solid #f1f3f5',
                borderBottom: '1px solid #f1f3f5',
                backgroundColor: 'white',
                padding: '10px 16px',
              },
            }}
          >
            <Stack spacing={6}>
              {['강의', '로드맵', '커뮤니티', '채용정보'].map((menu) => (
                <Text
                  key={menu}
                  size="sm"
                  weight={500}
                  color="gray.7"
                  sx={{ cursor: 'pointer', padding: '6px 0' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {menu}
                </Text>
              ))}
            </Stack>
          </Box>
        )}
        <Box
          ref={mobileSearchContainerRef}
          sx={{ display: 'none', padding: '0 16px 12px', position: 'relative', '@media (max-width: 768px)': { display: 'block' } }}
        >
          <TextInput
            placeholder="배우고 싶은 지식을 검색해보세요"
            icon={<FontAwesomeIcon icon={faSearch} style={{ fontSize: 14, color: '#adb5bd' }} />}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            onFocus={() => setIsSearchPopoverOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
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
          {showSearchPopover && (
            <Paper
              p="lg"
              radius="lg"
              shadow="md"
              sx={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 16,
                right: 16,
                zIndex: 200,
                border: '1px solid #f1f3f5',
              }}
            >
              {searchPopoverContent}
            </Paper>
          )}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px', '@media (max-width: 768px)': { padding: '24px 16px' } }}>
        <Stack spacing={48}>
          {!isOnboardingCompleted && isFiltering && (
            <Paper
              radius="md"
              p="md"
              sx={(theme) => ({
                background: `linear-gradient(135deg, ${theme.colors.infgreen[0]} 0%, ${theme.colors.cyan[0]} 100%)`,
                border: `1px solid ${theme.colors.infgreen[1]}`,
                cursor: 'pointer',
              })}
              onClick={() => onStartOnboarding?.()}
            >
              <Group position="apart" align="center" noWrap>
                <Stack spacing={4}>
                  <Text size="sm" weight={700} color="gray.9">
                    질문 3개만 답하면 맞춤 추천해드려요
                  </Text>
                </Stack>
                <Button
                  size="xs"
                  color="infgreen"
                  radius="md"
                  onClick={() => onStartOnboarding?.()}
                  sx={{ fontWeight: 600, flexShrink: 0 }}
                >
                  추천 받기
                </Button>
              </Group>
            </Paper>
          )}

          <Stack spacing="xs">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                '@media (max-width: 768px)': {
                  flexDirection: 'column',
                  alignItems: 'stretch',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 8,
                  overflowX: 'auto',
                  paddingBottom: 4,
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {POPULAR_FILTERS.map((filter) => {
                  const active = popularFilters.includes(filter);
                  return (
                    <Button
                      key={filter}
                      size="xs"
                      radius="xl"
                      variant={active ? 'filled' : 'light'}
                      color={active ? 'infgreen' : 'gray'}
                      onClick={() => togglePopularFilter(filter)}
                      sx={{ fontWeight: 600, flexShrink: 0 }}
                    >
                      {filter}
                    </Button>
                  );
                })}
              </Box>
              <Box sx={{ position: 'relative', '@media (max-width: 768px)': { alignSelf: 'flex-end' } }}>
                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                  style={{
                    height: 30,
                    borderRadius: 999,
                    border: '1px solid #dee2e6',
                    padding: '0 28px 0 12px',
                    fontSize: 12,
                    color: '#495057',
                    backgroundColor: 'white',
                    minWidth: 110,
                    width: 'auto',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                  }}
                >
                  <option value="popular">인기순</option>
                  <option value="rating">평점순</option>
                  <option value="price_low">가격 낮은순</option>
                  <option value="price_high">가격 높은순</option>
                </select>
                <Box
                  sx={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#868e96',
                    fontSize: 10,
                  }}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </Box>
              </Box>
            </Box>
            {popularFilters.length > 0 && (
              <Group spacing="xs" sx={{ flexWrap: 'wrap' }}>
                <Button
                  size="xs"
                  radius="xl"
                  variant="outline"
                  color="gray"
                  onClick={() => setPopularFilters([])}
                  sx={{ fontWeight: 600 }}
                >
                  초기화
                </Button>
                {popularFilters.map((filter) => (
                  <Button
                    key={`chip-${filter}`}
                    size="xs"
                    radius="xl"
                    variant="light"
                    color="infgreen"
                    onClick={() => togglePopularFilter(filter)}
                  sx={{ fontWeight: 600 }}
                >
                  {filter} ×
                </Button>
                ))}
              </Group>
            )}
          </Stack>

          {/* Onboarding Banner removed */}

          {isFiltering ? (
            <Stack spacing="lg">
              <Text size="sm" color="gray.6">
                총 {sortedFilteredAllCourses.length}개 강의
              </Text>
              {sortedFilteredAllCourses.length === 0 ? (
                <Text size="sm" color="gray.6">
                  선택한 필터에 맞는 강의가 없어요.
                </Text>
              ) : (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 24,
                    '@media (max-width: 1024px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
                    '@media (max-width: 768px)': { gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 },
                    '@media (max-width: 576px)': { gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 },
                    '@media (max-width: 420px)': { gridTemplateColumns: 'repeat(1, 1fr)' },
                  }}
                >
                  {sortedFilteredAllCourses.map((course) => (
                    <CourseCard key={course.id} {...course} showReviewCount={false} showStudentCount={false} />
                  ))}
                </Box>
              )}
            </Stack>
          ) : (
            <>
              {/* 지금 인기있는 강의 */}
              <Stack spacing="lg">
                <SectionHeader title="지금 가장 인기있는 강의" />
                <Box sx={{ position: 'relative' }}>
                  {canScrollPopularLeft && (
                    <Button
                      variant="light"
                      color="gray"
                      radius="xl"
                      onClick={() => scrollPopularBy('left')}
                      sx={{
                        position: 'absolute',
                        left: -16,
                        top: '40%',
                        zIndex: 2,
                        width: 36,
                        height: 36,
                        padding: 0,
                        boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                        '@media (max-width: 768px)': { display: 'none' },
                      }}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 12 }} />
                    </Button>
                  )}
                  {canScrollPopularRight && (
                    <Button
                    variant="light"
                    color="gray"
                    radius="xl"
                    onClick={() => scrollPopularBy('right')}
                    sx={{
                      position: 'absolute',
                      right: -16,
                      top: '40%',
                      zIndex: 2,
                      width: 36,
                      height: 36,
                      padding: 0,
                      boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                      '@media (max-width: 768px)': {
                        display: 'none',
                      },
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 12 }} />
                  </Button>
                  )}
              <Box
                ref={popularScrollRef}
                sx={{
                  display: 'flex',
                  gap: 24,
                      overflowX: 'auto',
                      overflowY: 'visible',
                      scrollBehavior: 'smooth',
                      scrollSnapType: 'x mandatory',
                      WebkitOverflowScrolling: 'touch',
                  paddingTop: 8,
                  paddingBottom: 12,
                  cursor: 'grab',
                  '&::-webkit-scrollbar': { display: 'none' },
                  '@media (max-width: 768px)': {
                    marginLeft: -16,
                    marginRight: -16,
                    paddingLeft: 20,
                    paddingRight: 16,
                    scrollPaddingLeft: 20,
                    gap: 12,
                  },
                }}
                onPointerDown={(event) => {
                  const target = event.target as HTMLElement;
                  if (target.closest('[data-disable-drag="true"]')) return;
                  const container = popularScrollRef.current;
                  if (!container) return;
                  isDraggingRef.current = true;
                      dragStartXRef.current = event.clientX;
                      scrollStartLeftRef.current = container.scrollLeft;
                      container.setPointerCapture?.(event.pointerId);
                    }}
                    onPointerMove={(event) => {
                      if (!isDraggingRef.current) return;
                      const container = popularScrollRef.current;
                      if (!container) return;
                      const delta = event.clientX - dragStartXRef.current;
                      container.scrollLeft = scrollStartLeftRef.current - delta;
                    }}
                    onPointerUp={() => {
                      isDraggingRef.current = false;
                    }}
                    onPointerLeave={() => {
                      isDraggingRef.current = false;
                    }}
                    onScroll={updatePopularScrollState}
                  >
                    {!isOnboardingCompleted && (
                      <Box
                        data-card
                        data-disable-drag="true"
                        sx={{
                          flex: `0 0 ${cardBaseWidth}`,
                          display: 'flex',
                          scrollSnapAlign: 'start',
                          '@media (max-width: 1024px)': { flex: '0 0 calc((100% - 24px * 3) / 4)' },
                          '@media (max-width: 768px)': { flex: '0 0 52%' },
                          '@media (max-width: 576px)': { flex: '0 0 58%' },
                          '@media (max-width: 420px)': { flex: '0 0 64%' },
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                            },
                          }}
                          onClick={() => onStartOnboarding?.()}
                        >
                          <Stack spacing={12}>
                            <Box
                              sx={(theme) => ({
                                width: '100%',
                                aspectRatio: '16 / 9',
                                borderRadius: theme.radius.sm,
                                overflow: 'hidden',
                                background: `linear-gradient(135deg, ${theme.colors.infgreen[0]} 0%, ${theme.colors.cyan[0]} 100%)`,
                                border: `1px solid ${theme.colors.infgreen[1]}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              })}
                            >
                              <Text size="xs" weight={700} color="infgreen.7">
                                맞춤 추천
                              </Text>
                            </Box>
                            <Stack spacing={6}>
                              <Text weight={700} lineClamp={2} size="sm" color="gray.9">
                                어떤 강의부터 들어야 할지 모르겠다면
                              </Text>
                              <Text size="xs" color="gray.6" lineClamp={2}>
                                질문 3개에 답하고 나에게 맞는 강의를 찾아보세요
                              </Text>
                              <Group position="left">
                                <Button
                                  size="xs"
                                  color="infgreen"
                                  radius="md"
                                  sx={{ fontWeight: 600, width: 'fit-content' }}
                                >
                                  추천 받기
                                </Button>
                              </Group>
                            </Stack>
                          </Stack>
                        </Box>
                      </Box>
                    )}
                    {filteredPopularCourses.map((course, index) => (
                      <Box
                        key={course.id}
                        data-card
                        data-disable-drag={!isOnboardingCompleted && index === 0 ? 'true' : 'false'}
                        onClick={() => {
                          if (!isOnboardingCompleted && index === 0) {
                            onStartOnboarding?.();
                          }
                        }}
                        sx={{
                          flex: `0 0 ${cardBaseWidth}`,
                          display: 'flex',
                          scrollSnapAlign: 'start',
                          cursor: !isOnboardingCompleted && index === 0 ? 'pointer' : 'default',
                          '@media (max-width: 1024px)': { flex: '0 0 calc((100% - 24px * 3) / 4)' },
                          '@media (max-width: 768px)': { flex: '0 0 52%' },
                          '@media (max-width: 576px)': { flex: '0 0 58%' },
                          '@media (max-width: 420px)': { flex: '0 0 64%' },
                        }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <CourseCard key={course.id} {...course} showReviewCount={false} showStudentCount={false} />
                        </Box>
                      </Box>
                    ))}
                    {filteredPopularCourses.length === 0 && (
                      <Box sx={{ width: '100%', padding: '16px 0' }}>
                        <Text size="sm" color="gray.6">
                          선택한 필터에 맞는 강의가 없어요.
                        </Text>
                      </Box>
                    )}
                  </Box>
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
                    '@media (max-width: 768px)': { gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 },
                    '@media (max-width: 576px)': { gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 },
                    '@media (max-width: 420px)': { gridTemplateColumns: 'repeat(1, 1fr)' },
                  }}
                >
                  {filteredNewCourses.map((course) => (
                    <CourseCard key={course.id} {...course} showReviewCount={false} showStudentCount={false} />
                  ))}
                </Box>
                {filteredNewCourses.length === 0 && (
                  <Text size="sm" color="gray.6">
                    선택한 필터에 맞는 강의가 없어요.
                  </Text>
                )}
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
                    '@media (max-width: 768px)': { gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 },
                    '@media (max-width: 576px)': { gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 },
                    '@media (max-width: 420px)': { gridTemplateColumns: 'repeat(1, 1fr)' },
                  }}
                >
                  {filteredFreeCourses.map((course) => (
                    <CourseCard key={course.id} {...course} showReviewCount={false} showStudentCount={false} />
                  ))}
                </Box>
                {filteredFreeCourses.length === 0 && (
                  <Text size="sm" color="gray.6">
                    선택한 필터에 맞는 강의가 없어요.
                  </Text>
                )}
              </Stack>
            </>
          )}
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
