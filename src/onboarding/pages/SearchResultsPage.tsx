import React from 'react';
import {
  Box,
  Stack,
  Group,
  Title,
  Text,
  Button,
  Badge,
  Avatar,
  TextInput,
  Paper,
  Image,
} from '@inflearn/ds-react';
import { FontAwesomeIcon } from '@inflearn/react-fontawesome';
import {
  faSearch,
  faBell,
  faShoppingCart,
  faChevronRight,
  faBars,
  faXmark,
} from '@inflearn/pro-solid-svg-icons';
import { CourseCard } from '../components/CourseCard';

interface SearchResultsPageProps {
  userName?: string;
  query: string;
  onBack: () => void;
  onSearch: (query: string) => void;
  isOnboardingCompleted: boolean;
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
  level: '입문' | '초급' | '중급' | '고급';
  price: 'free' | number;
  originalPrice?: number;
  tags: string[];
}

const SEARCH_COURSES: CourseData[] = [
  {
    id: 's1',
    thumbnail: 'https://picsum.photos/seed/search1/480/270',
    title: 'React 완전정복: 컴포넌트부터 성능 최적화까지',
    instructor: '박리액트',
    rating: 4.9,
    reviewCount: 3120,
    studentCount: 52000,
    level: '중급',
    price: 69000,
    originalPrice: 89000,
    tags: ['React', '프론트엔드', '성능'],
  },
  {
    id: 's2',
    thumbnail: 'https://picsum.photos/seed/search2/480/270',
    title: '초보자를 위한 프론트엔드 로드맵',
    instructor: '김개발',
    rating: 4.8,
    reviewCount: 1840,
    studentCount: 26000,
    level: '입문',
    price: 'free',
    tags: ['HTML', 'CSS', '기초'],
  },
  {
    id: 's3',
    thumbnail: 'https://picsum.photos/seed/search3/480/270',
    title: '실전 TypeScript 프로젝트',
    instructor: '캡틴판교',
    rating: 4.7,
    reviewCount: 980,
    studentCount: 12000,
    level: '중급',
    price: 59000,
    originalPrice: 79000,
    tags: ['TypeScript', '실전'],
  },
  {
    id: 's4',
    thumbnail: 'https://picsum.photos/seed/search4/480/270',
    title: 'Spring Boot 핵심 정리',
    instructor: '김영한',
    rating: 4.9,
    reviewCount: 8600,
    studentCount: 82000,
    level: '초급',
    price: 79000,
    originalPrice: 99000,
    tags: ['Java', 'Spring'],
  },
  {
    id: 's5',
    thumbnail: 'https://picsum.photos/seed/search5/480/270',
    title: '데이터 분석을 위한 Python',
    instructor: '정데이터',
    rating: 4.8,
    reviewCount: 2230,
    studentCount: 34000,
    level: '초급',
    price: 49000,
    tags: ['Python', '데이터'],
  },
  {
    id: 's6',
    thumbnail: 'https://picsum.photos/seed/search6/480/270',
    title: 'Next.js 14 App Router 실전',
    instructor: '이프론트',
    rating: 4.7,
    reviewCount: 620,
    studentCount: 8400,
    level: '중급',
    price: 72000,
    originalPrice: 92000,
    tags: ['Next.js', 'React'],
  },
  {
    id: 's7',
    thumbnail: 'https://picsum.photos/seed/search7/480/270',
    title: 'UX/UI 디자인 핵심 스킬',
    instructor: '윤디자인',
    rating: 4.8,
    reviewCount: 1450,
    studentCount: 19000,
    level: '초급',
    price: 53000,
    tags: ['디자인', 'UI/UX'],
  },
  {
    id: 's8',
    thumbnail: 'https://picsum.photos/seed/search8/480/270',
    title: 'Kubernetes 실전 운영 가이드',
    instructor: '한데브옵스',
    rating: 4.6,
    reviewCount: 540,
    studentCount: 7600,
    level: '고급',
    price: 89000,
    originalPrice: 119000,
    tags: ['DevOps', 'Kubernetes'],
  },
];

const POPULAR_PREVIEW = SEARCH_COURSES.slice(0, 4);

const LEVEL_KEYWORDS = ['입문', '초급', '중급', '고급'];

function getMetaConfig(query: string, course: CourseData) {
  const normalized = query.trim().toLowerCase();
  const wantsFree = normalized.includes('무료') || normalized.includes('free');
  const wantsPrice = normalized.includes('원');
  const matchedLevel = LEVEL_KEYWORDS.find((level) => normalized.includes(level));
  const matchedTags = course.tags.filter((tag) => normalized.includes(tag.toLowerCase()));

  const emphasizePrice = wantsFree || wantsPrice;
  if (matchedLevel || matchedTags.length > 0 || emphasizePrice) {
    return {
      level: matchedLevel ? course.level : course.level,
      price: course.price,
      tags: matchedTags.length > 0 ? matchedTags : course.tags,
      metaVariant: 'compact' as const,
      emphasizePrice,
    };
  }

  return {
    level: course.level,
    price: course.price,
    tags: course.tags,
    metaVariant: 'full' as const,
    emphasizePrice: false,
  };
}

export function SearchResultsPage({
  userName = '회원',
  query,
  onBack,
  onSearch,
  isOnboardingCompleted,
  onStartOnboarding,
}: SearchResultsPageProps) {
  const [searchQuery, setSearchQuery] = React.useState(query);
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mobileSearchContainerRef = React.useRef<HTMLDivElement | null>(null);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const results = SEARCH_COURSES.filter((course) =>
    [course.title, course.instructor, ...course.tags].some((field) =>
      field.toLowerCase().includes(normalizedQuery)
    )
  );

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
        {POPULAR_PREVIEW.map((course) => (
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
      </Stack>

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
              관심사 설정을 이어서 추천을 받아보세요
            </Text>
            <Text size="xs" color="gray.6">
              2분이면 나에게 맞는 강의를 추천받을 수 있어요
            </Text>
          </Stack>
          <Button
            size="xs"
            color="infgreen"
            radius="md"
            onClick={() => onStartOnboarding?.()}
            sx={{ fontWeight: 600, flexShrink: 0 }}
          >
            이어하기
          </Button>
        </Group>
      </Paper>
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
            <Group spacing="xl" noWrap>
              <Box
                sx={{ display: 'none', '@media (max-width: 768px)': { display: 'block', cursor: 'pointer' } }}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} style={{ fontSize: 18, color: '#495057' }} />
              </Box>
              <Title order={3} color="infgreen.6" sx={{ fontWeight: 800, cursor: 'pointer' }} onClick={onBack}>
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

            <Box
              ref={searchContainerRef}
              sx={{ flex: 1, maxWidth: 520, margin: '0 24px', position: 'relative', '@media (max-width: 768px)': { display: 'none' } }}
            >
              <TextInput
                placeholder="강의를 다시 검색해보세요"
                icon={<FontAwesomeIcon icon={faSearch} style={{ fontSize: 14, color: '#adb5bd' }} />}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
                onFocus={() => setIsSearchPopoverOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    const trimmed = searchQuery.trim();
                    if (trimmed) onSearch(trimmed);
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
            placeholder="강의를 다시 검색해보세요"
            icon={<FontAwesomeIcon icon={faSearch} style={{ fontSize: 14, color: '#adb5bd' }} />}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            onFocus={() => setIsSearchPopoverOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                const trimmed = searchQuery.trim();
                if (trimmed) onSearch(trimmed);
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

      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px', '@media (max-width: 768px)': { padding: '24px 16px' } }}>
        <Stack spacing="xl">
          <Stack spacing={6}>
            <Title order={3} color="gray.9">
              "{query}" 검색 결과
            </Title>
            <Text size="sm" color="gray.6">
              총 {results.length}개의 강의를 찾았어요
            </Text>
          </Stack>

          <Group spacing="sm">
            <Badge color="infgreen" variant="light" radius="xl" size="lg">
              전체
            </Badge>
            <Badge color="gray" variant="outline" radius="xl" size="lg">
              무료
            </Badge>
            <Badge color="gray" variant="outline" radius="xl" size="lg">
              입문
            </Badge>
            <Badge color="gray" variant="outline" radius="xl" size="lg">
              초급
            </Badge>
            <Badge color="gray" variant="outline" radius="xl" size="lg">
              중급
            </Badge>
          </Group>

          {results.length === 0 ? (
            <Paper p="xl" radius="lg" sx={{ border: '1px dashed #e9ecef' }}>
              <Stack spacing="sm" align="center">
                <Text weight={600} color="gray.7">
                  검색 결과가 없어요
                </Text>
                <Text size="sm" color="gray.5">
                  다른 키워드로 검색해보세요
                </Text>
              </Stack>
            </Paper>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 24,
                '@media (max-width: 1024px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
                '@media (max-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
                '@media (max-width: 576px)': { gridTemplateColumns: 'repeat(1, 1fr)' },
              }}
            >
              {results.map((course) => {
                const meta = getMetaConfig(searchQuery, course);
                return (
                  <CourseCard
                    key={course.id}
                    thumbnail={course.thumbnail}
                    title={course.title}
                    instructor={course.instructor}
                    rating={course.rating}
                    reviewCount={course.reviewCount}
                    studentCount={course.studentCount}
                    originalPrice={course.originalPrice}
                    showMeta
                    level={meta.level}
                    price={meta.price}
                    tags={meta.tags}
                    metaVariant={meta.metaVariant}
                    emphasizePrice={meta.emphasizePrice}
                    showStudentInline
                  />
                );
              })}
            </Box>
          )}

          {!isOnboardingCompleted && (
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
                    관심 분야를 설정하면 더 다양한 추천을 받을 수 있어요
                  </Text>
                  <Text size="xs" color="gray.6">
                    질문 3개면 완료!
                  </Text>
                </Stack>
                <Button
                  size="xs"
                  color="infgreen"
                  radius="md"
                  onClick={() => onStartOnboarding?.()}
                  sx={{ fontWeight: 600, flexShrink: 0 }}
                >
                  설정하기
                </Button>
              </Group>
            </Paper>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
