import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Stack, Group, Text, Button, ScrollArea, Textarea } from '@inflearn/ds-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { useOnboardingStore } from './store/useOnboardingStore';
import { AssistantMessage, UserAnswerBubble } from './components/ChatBubble';
import { SelectChip, SelectChipGroup, SelectChipWrap } from './components/SelectChip';
import { CourseRecommendCard, CourseData } from './components/CourseRecommendCard';
import {
  PURPOSE_OPTIONS,
  INTEREST_OPTIONS,
  SKILL_OPTIONS,
  TOTAL_STEPS,
} from './constants/onboardingOptions';

interface OnboardingPageProps {
  userName?: string;
  onComplete?: () => void;
  onSkip?: () => void;
}

// 선택된 값들을 라벨로 변환
function getPurposeLabels(
  values: string[],
  customText: string
): Array<{ label: string; description?: string }> {
  const labels: Array<{ label: string; description?: string }> = values
    .filter((v) => v !== 'unsure' && v !== 'custom')
    .map((v) => PURPOSE_OPTIONS.find((opt) => opt.value === v))
    .filter(Boolean)
    .map((option) => ({
      label: option!.label,
      description: option!.description,
    }));
  if (customText && values.includes('custom')) labels.push({ label: `"${customText}"` });
  if (values.includes('unsure')) labels.push({ label: '잘 모르겠어요' });
  return labels;
}

function getInterestLabels(values: string[], customText: string): string[] {
  const labels = values
    .filter((v) => v !== 'unsure' && v !== 'custom')
    .map((v) => INTEREST_OPTIONS.find((opt) => opt.value === v)?.label)
    .filter(Boolean) as string[];
  if (customText && values.includes('custom')) labels.push(`"${customText}"`);
  if (values.includes('unsure')) labels.push('잘 모르겠어요');
  return labels;
}

function getSkillLabels(values: string[], interests: string[], customText: string): string[] {
  const validSkills = values.filter((s) => s !== 'unsure' && s !== 'custom');
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
  if (customText && values.includes('custom')) labels.push(`"${customText}"`);
  if (values.includes('unsure')) labels.push('잘 모르겠어요');
  return labels;
}

// Mock 인기 강의 데이터
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
    title: '백엔드 개발자 커리어 시작하기',
    instructor: '이백엔드',
    rating: 4.7,
    reviewCount: 1423,
    level: '초급',
    price: 'free',
  },
  {
    id: '4',
    thumbnail: 'https://picsum.photos/seed/course4/240/160',
    title: '실무 데이터 분석 with Python',
    instructor: '정데이터',
    rating: 4.8,
    reviewCount: 1760,
    level: '중급',
    price: 59000,
  },
  {
    id: '5',
    thumbnail: 'https://picsum.photos/seed/course5/240/160',
    title: 'DevOps 기초와 자동화 시작하기',
    instructor: '한데브옵스',
    rating: 4.6,
    reviewCount: 980,
    level: '초급',
    price: 42000,
  },
  {
    id: '6',
    thumbnail: 'https://picsum.photos/seed/course6/240/160',
    title: '실전 React 패턴과 성능 최적화',
    instructor: '박리액트',
    rating: 4.9,
    reviewCount: 2104,
    level: '중급',
    price: 72000,
  },
  {
    id: '7',
    thumbnail: 'https://picsum.photos/seed/course7/240/160',
    title: 'AI 시대의 업무 자동화 워크플로우',
    instructor: '최자동',
    rating: 4.7,
    reviewCount: 1312,
    level: '입문',
    price: 39000,
  },
  {
    id: '8',
    thumbnail: 'https://picsum.photos/seed/course8/240/160',
    title: 'UX/UI 핵심 원칙과 포트폴리오',
    instructor: '윤디자인',
    rating: 4.8,
    reviewCount: 1125,
    level: '초급',
    price: 53000,
  },
];

export function OnboardingPage({
  userName = '회원',
  onComplete,
  onSkip,
}: OnboardingPageProps) {
  const {
    currentStep,
    purpose,
    customPurposeText,
    interests,
    customInterestText,
    skills,
    customSkillText,
    togglePurpose,
    toggleInterest,
    toggleSkill,
    setCustomPurposeText,
    setCustomInterestText,
    setCustomSkillText,
    nextStep,
    goToStep,
    reset,
  } = useOnboardingStore();

  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const purposeChipRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const customPurposeRef = useRef<HTMLDivElement | null>(null);
  const customPurposeInputRef = useRef<HTMLTextAreaElement | null>(null);
  const customInterestInputRef = useRef<HTMLTextAreaElement | null>(null);
  const customSkillInputRef = useRef<HTMLTextAreaElement | null>(null);
  const questionTopOffset = 20;
  const [bottomSpacerHeight, setBottomSpacerHeight] = useState(200);
  const [purposeChipWidth, setPurposeChipWidth] = useState<number | null>(null);
  const customTextareaWidth = 360;
  const [visibleCourses, setVisibleCourses] = useState(4);
  const [showPopularResults, setShowPopularResults] = useState(false);

  const measurePurposeWidth = useCallback(() => {
    const widths = PURPOSE_OPTIONS.map(
      (option) => purposeChipRefs.current[option.value]?.getBoundingClientRect().width || 0
    );
    widths.push(customPurposeRef.current?.getBoundingClientRect().width || 0);
    const maxWidth = Math.max(0, ...widths);
    if (maxWidth > 0) {
      setPurposeChipWidth(Math.ceil(maxWidth));
    }
  }, []);

  // 스텝 변경시 스크롤
  useEffect(() => {
    const target = stepRefs.current[Math.max(currentStep - 1, 0)];
    if (!target) return;
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, [currentStep]);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(measurePurposeWidth);
    return () => cancelAnimationFrame(frame);
  }, [measurePurposeWidth]);

  useEffect(() => {
    const handleResize = () => measurePurposeWidth();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [measurePurposeWidth]);

  useEffect(() => {
    if (currentStep === 4) {
      setVisibleCourses(4);
      setShowPopularResults(false);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 1 && purpose.includes('custom')) {
      customPurposeInputRef.current?.focus();
    }
  }, [currentStep, purpose]);

  useEffect(() => {
    if (currentStep === 2 && interests.includes('custom')) {
      customInterestInputRef.current?.focus();
    }
  }, [currentStep, interests]);

  useEffect(() => {
    if (currentStep === 3 && skills.includes('custom')) {
      customSkillInputRef.current?.focus();
    }
  }, [currentStep, skills]);

  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport) return;

    const updateSpacer = () => {
      const rect = viewport.getBoundingClientRect();
      setBottomSpacerHeight(Math.max(200, Math.round(rect.height)));
    };

    updateSpacer();

    const observer = new ResizeObserver(updateSpacer);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const handleSkip = useCallback(() => {
    onSkip?.();
  }, [onSkip]);

  const handleComplete = useCallback(() => {
    reset();
    onComplete?.();
  }, [reset, onComplete]);

  const handleLoadMoreCourses = useCallback(() => {
    setVisibleCourses((prev) => Math.min(prev + 4, MOCK_COURSES.length));
  }, []);

  const isKnowledgeSharing = purpose.includes('knowledge_sharing');

  // 현재 스텝의 선택 가능 여부
  const canProceed = () => {
    switch (currentStep) {
      case 1: {
        const hasCustom = purpose.includes('custom');
        const hasCustomText = customPurposeText.trim().length > 0;
        return purpose.length > 0 && (!hasCustom || hasCustomText);
      }
      case 2: {
        const hasCustom = interests.includes('custom');
        const hasCustomText = customInterestText.trim().length > 0;
        return interests.length > 0 && (!hasCustom || hasCustomText);
      }
      case 3: {
        const hasCustom = skills.includes('custom');
        const hasCustomText = customSkillText.trim().length > 0;
        return skills.length > 0 && (!hasCustom || hasCustomText);
      }
      default:
        return false;
    }
  };

  // 관심분야에 따른 스킬 옵션
  const getAvailableSkills = () => {
    const validInterests = interests.filter((i) => i !== 'unsure' && i !== 'custom');
    if (validInterests.length === 0) {
      return Object.values(SKILL_OPTIONS).flat();
    }
    const availableSkills = validInterests.flatMap((interest) => SKILL_OPTIONS[interest] || []);
    return availableSkills.filter(
      (skill, index, self) => index === self.findIndex((s) => s.value === skill.value)
    );
  };

  const progress = (Math.min(currentStep, TOTAL_STEPS) / TOTAL_STEPS) * 100;
  const isResultStep = currentStep === 4;
  const skipLabel = isResultStep ? '나가기' : '다음에 하기';

  return (
    <Box
      sx={{
        height: '85vh',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          padding: '12px 20px',
          borderBottom: '1px solid #f1f3f5',
          flexShrink: 0,
        }}
      >
        <Group position="apart" align="center">
          <Group spacing="xs" align="center">
            <Text size="sm" weight={600} color="gray.8">
              관심사 설정
            </Text>
            {!isResultStep && (
              <Text size="xs" color="gray.5">
                {Math.min(currentStep, TOTAL_STEPS)}/{TOTAL_STEPS}
              </Text>
            )}
          </Group>
          <Button
            variant="subtle"
            color="gray"
            size="xs"
            radius="md"
            onClick={handleSkip}
            sx={{ padding: '4px 8px' }}
          >
            {skipLabel}
          </Button>
        </Group>
      </Box>

      {/* Chat Area */}
      <ScrollArea sx={{ flex: 1 }} viewportRef={scrollRef}>
        <Box sx={{ padding: '20px' }}>
          {/* Step 1: Purpose */}
          <Box
            ref={(el) => {
              stepRefs.current[0] = el;
            }}
            sx={{ scrollMarginTop: questionTopOffset }}
          >
            <AssistantMessage
              message={`안녕하세요 ${userName}님! 👋 인프런에 어떤 목적으로 오셨나요?`}
              subMessage="여러 개 선택할 수 있어요"
            />

            {currentStep > 1 && (
              <UserAnswerBubble
                answers={getPurposeLabels(purpose, customPurposeText)}
                onEdit={() => goToStep(1)}
              />
            )}

            {currentStep === 1 && (
              <Box sx={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ width: purposeChipWidth ?? 'fit-content' }}>
                  <SelectChipGroup columns={1}>
                    {PURPOSE_OPTIONS.map((option) => (
                      <SelectChip
                        key={option.value}
                        label={option.label}
                        description={option.description}
                        selected={purpose.includes(option.value)}
                        onClick={() => togglePurpose(option.value)}
                        containerRef={(el) => {
                          purposeChipRefs.current[option.value] = el;
                        }}
                        fullWidth
                      />
                    ))}
                    <SelectChip
                      label="직접 입력하기"
                      selected={purpose.includes('custom')}
                      onClick={() => togglePurpose('custom')}
                      containerRef={(el) => {
                        customPurposeRef.current = el;
                      }}
                      leadingIcon={faCirclePlus}
                      fullWidth
                    />
                    {purpose.includes('custom') && (
                      <Box sx={{ marginTop: 4 }}>
                        <Textarea
                          ref={customPurposeInputRef}
                          radius="md"
                          placeholder="학습 목적을 직접 입력해주세요"
                          value={customPurposeText}
                          onChange={(e) => setCustomPurposeText(e.target.value)}
                          minRows={2}
                          maxLength={200}
                          autosize
                        />
                      </Box>
                    )}
                    <SelectChip
                      label="잘 모르겠어요"
                      selected={purpose.includes('unsure')}
                      onClick={() => togglePurpose('unsure')}
                      leadingIcon={faCircleQuestion}
                      fullWidth
                    />
                  </SelectChipGroup>
                </Box>
              </Box>
            )}
          </Box>

          {/* Step 2: Interests */}
          {currentStep >= 2 && (
            <Box
              ref={(el) => {
                stepRefs.current[1] = el;
              }}
              sx={{ scrollMarginTop: questionTopOffset }}
            >
              <AssistantMessage
                message="좋아요! 어떤 분야에 관심이 있으세요?"
                subMessage="관심 분야를 선택해주세요"
              />

              {currentStep > 2 && (
                <UserAnswerBubble
                  answers={getInterestLabels(interests, customInterestText)}
                  onEdit={() => goToStep(2)}
                />
              )}

              {currentStep === 2 && (
                <Box sx={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}>
                  <SelectChipWrap>
                    {INTEREST_OPTIONS.filter((opt) => opt.value !== 'other').map((option) => (
                      <SelectChip
                        key={option.value}
                        label={option.label}
                        selected={interests.includes(option.value)}
                        onClick={() => toggleInterest(option.value)}
                      />
                    ))}
                    <SelectChip
                      label="직접 입력하기"
                      selected={interests.includes('custom')}
                      onClick={() => toggleInterest('custom')}
                      leadingIcon={faCirclePlus}
                    />
                    {interests.includes('custom') && (
                      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ width: customTextareaWidth, marginTop: 4 }}>
                          <Textarea
                            ref={customInterestInputRef}
                            radius="md"
                            placeholder="관심 분야를 직접 입력해주세요"
                            value={customInterestText}
                            onChange={(e) => setCustomInterestText(e.target.value)}
                            minRows={2}
                            maxLength={200}
                            autosize
                          />
                        </Box>
                      </Box>
                    )}
                    <SelectChip
                      label="잘 모르겠어요"
                      selected={interests.includes('unsure')}
                      onClick={() => toggleInterest('unsure')}
                      leadingIcon={faCircleQuestion}
                    />
                  </SelectChipWrap>
                </Box>
              )}
            </Box>
          )}

          {/* Step 3: Skills */}
          {currentStep >= 3 && (
            <Box
              ref={(el) => {
                stepRefs.current[2] = el;
              }}
              sx={{ scrollMarginTop: questionTopOffset }}
            >
              <AssistantMessage
                message="거의 다 왔어요! 배우고 싶은 기술을 선택해주세요 🎯"
                subMessage="선택한 분야의 기술들이에요"
              />

              {currentStep > 3 && (
                <UserAnswerBubble
                  answers={getSkillLabels(skills, interests, customSkillText)}
                  onEdit={() => goToStep(3)}
                />
              )}

              {currentStep === 3 && (
                <Box sx={{ marginBottom: 20, display: 'flex', justifyContent: 'flex-end' }}>
                  <SelectChipWrap>
                    {getAvailableSkills().slice(0, 15).map((option) => (
                      <SelectChip
                        key={option.value}
                        label={option.label}
                        selected={skills.includes(option.value)}
                        onClick={() => toggleSkill(option.value)}
                      />
                    ))}
                    <SelectChip
                      label="직접 입력하기"
                      selected={skills.includes('custom')}
                      onClick={() => toggleSkill('custom')}
                      leadingIcon={faCirclePlus}
                    />
                    {skills.includes('custom') && (
                      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ width: customTextareaWidth, marginTop: 4 }}>
                          <Textarea
                            ref={customSkillInputRef}
                            radius="md"
                            placeholder="배우고 싶은 기술을 직접 입력해주세요"
                            value={customSkillText}
                            onChange={(e) => setCustomSkillText(e.target.value)}
                            minRows={2}
                            maxLength={200}
                            autosize
                          />
                        </Box>
                      </Box>
                    )}
                    <SelectChip
                      label="잘 모르겠어요"
                      selected={skills.includes('unsure')}
                      onClick={() => toggleSkill('unsure')}
                      leadingIcon={faCircleQuestion}
                    />
                  </SelectChipWrap>
                </Box>
              )}
            </Box>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && (
            <Box
              ref={(el) => {
                stepRefs.current[3] = el;
              }}
              sx={{ scrollMarginTop: questionTopOffset }}
            >
              {isKnowledgeSharing && !showPopularResults ? (
                <>
                  <AssistantMessage
                    message="지식공유에 관심이 있으시군요! ✨"
                    subMessage="선택한 내용을 바탕으로 다음 행동을 골라주세요"
                  />
                  <Box sx={{ marginLeft: 0, marginBottom: 16 }}>
                    <Stack spacing="sm">
                      <Button
                        color="infgreen"
                        radius="md"
                        fullWidth
                        onClick={handleComplete}
                        sx={{ height: 44, fontWeight: 600 }}
                      >
                        지식공유자 신청하러 가기
                      </Button>
                      <Button
                        variant="light"
                        color="gray"
                        radius="md"
                        fullWidth
                        onClick={() => setShowPopularResults(true)}
                        sx={{ height: 44, fontWeight: 600 }}
                      >
                        인기 강의 둘러보기
                      </Button>
                    </Stack>
                  </Box>
                </>
              ) : (
                <>
                  <AssistantMessage
                    message="선택해주신 내용을 바탕으로 인기 강의를 모아봤어요! ✨"
                    subMessage="마음에 드는 강의를 클릭해보세요"
                  />

                  <Box sx={{ marginLeft: 0, marginBottom: 16 }}>
                    <Stack spacing="sm">
                      {MOCK_COURSES.slice(0, visibleCourses).map((course) => (
                        <CourseRecommendCard key={course.id} course={course} />
                      ))}
                    </Stack>

                    {isKnowledgeSharing ? (
                      <>
                        {visibleCourses < MOCK_COURSES.length && (
                          <Box mt="sm">
                            <Button
                              variant="light"
                              color="gray"
                              radius="md"
                              fullWidth
                              onClick={handleLoadMoreCourses}
                              sx={{ height: 44, fontWeight: 600 }}
                            >
                              더 많은 강의 보기
                            </Button>
                          </Box>
                        )}
                        <Box mt="sm">
                          <Button
                            color="infgreen"
                            radius="md"
                            fullWidth
                            onClick={handleComplete}
                            sx={{ height: 44, fontWeight: 600 }}
                          >
                            지식공유자 신청하러 가기
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <Stack spacing="sm" mt="lg">
                        {visibleCourses < MOCK_COURSES.length && (
                          <Button
                            color="infgreen"
                            radius="md"
                            fullWidth
                            onClick={handleLoadMoreCourses}
                            sx={{ height: 44, fontWeight: 600 }}
                          >
                            더 많은 강의 보기
                          </Button>
                        )}
                        <Button
                          variant="light"
                          color="gray"
                          radius="md"
                          fullWidth
                          onClick={handleComplete}
                          sx={{ height: 44, fontWeight: 600 }}
                        >
                          홈으로 가기
                        </Button>
                      </Stack>
                    )}
                  </Box>
                </>
              )}
            </Box>
          )}
          <Box sx={{ height: bottomSpacerHeight }} />
        </Box>
      </ScrollArea>

      {/* Bottom Action */}
      {!isResultStep && (
        <Box
          sx={{
            padding: '16px 20px',
            borderTop: '1px solid #f1f3f5',
            flexShrink: 0,
          }}
        >
          <Button
            color={canProceed() ? 'infgreen' : 'gray'}
            radius="md"
            fullWidth
            disabled={!canProceed()}
            onClick={nextStep}
            sx={{ height: 48, fontSize: 15, fontWeight: 600 }}
          >
            다음
          </Button>
        </Box>
      )}
    </Box>
  );
}
