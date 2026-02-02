import React, { useState, useEffect, useRef } from 'react';
import { Stack, Button, Box, Text, Textarea } from '@inflearn/ds-react';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { OnboardingQuestion } from '../components/OnboardingQuestion';
import { InterestChip } from '../components/InterestChip';
import { SKILL_OPTIONS } from '../constants/onboardingOptions';

const SKILLS_PER_PAGE = 20;

export function SkillsStep() {
  const { interests, skills, customSkillText, toggleSkill, setCustomSkillText, nextStep } = useOnboardingStore();
  const [customInput, setCustomInput] = useState(customSkillText);
  const [visibleCount, setVisibleCount] = useState(SKILLS_PER_PAGE);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 선택한 관심 분야에 해당하는 스킬들을 합침
  const validInterests = interests.filter((i) => i !== 'unsure' && i !== 'custom' && i !== 'other');
  const availableSkills =
    validInterests.length > 0
      ? validInterests.flatMap((interest) => SKILL_OPTIONS[interest] || [])
      : Object.values(SKILL_OPTIONS).flat();

  // 중복 제거
  const uniqueSkills = availableSkills.filter(
    (skill, index, self) => index === self.findIndex((s) => s.value === skill.value)
  );

  // 보여줄 스킬 목록
  const visibleSkills = uniqueSkills.slice(0, visibleCount);
  const hasMoreSkills = uniqueSkills.length > visibleCount;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + SKILLS_PER_PAGE);
  };

  useEffect(() => {
    setCustomInput(customSkillText);
  }, [customSkillText]);

  useEffect(() => {
    if (skills.includes('custom') && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [skills]);

  const hasCustomInput = skills.includes('custom') ? customSkillText.trim().length > 0 : true;
  const canProceed = skills.length > 0 && hasCustomInput;

  const handleCustomInputChange = (value: string) => {
    setCustomInput(value);
    if (value.trim()) {
      setCustomSkillText(value.trim());
    } else {
      setCustomSkillText('');
    }
  };

  return (
    <Stack spacing="md">
      <OnboardingQuestion
        title="배우고 싶은 기술을 선택해주세요"
        subtitle="선택한 분야의 세부 기술이에요"
      />

      {/* Selection Count */}
      <Text size="sm" color={skills.length > 0 ? 'infgreen.6' : 'gray.5'} align="center">
        {skills.filter((s) => s !== 'unsure').length}개 선택됨
      </Text>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 8,
          }}
          role="group"
          aria-label="스킬 선택"
        >
          {visibleSkills.map((option) => {
            const isSelected = skills.includes(option.value);

            return (
              <Box key={option.value} sx={{ width: 'calc(33.33% - 6px)' }}>
                <InterestChip
                  label={option.label}
                  selected={isSelected}
                  disabled={false}
                  onClick={() => toggleSkill(option.value)}
                />
              </Box>
            );
          })}
        </Box>

        {hasMoreSkills && (
          <Button
            variant="subtle"
            color="gray"
            size="sm"
            radius="md"
            fullWidth
            onClick={handleShowMore}
            sx={{
              marginTop: 4,
            }}
          >
            더보기
          </Button>
        )}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
            marginTop: 16,
          }}
        >
          <InterestChip
            label="+ 직접 입력하기"
            selected={skills.includes('custom')}
            disabled={false}
            onClick={() => toggleSkill('custom')}
            variant="outline"
          />
          <InterestChip
            label="? 잘 모르겠다."
            selected={skills.includes('unsure')}
            disabled={false}
            onClick={() => toggleSkill('unsure')}
            variant="outline"
          />
        </Box>

        {skills.includes('custom') && (
          <Box>
            <Textarea
              ref={textareaRef}
              placeholder="배우고 싶은 기술을 직접 입력해주세요"
              value={customInput}
              onChange={(e) => handleCustomInputChange(e.target.value)}
              minRows={3}
              maxLength={200}
              autosize
              sx={{
                '& textarea': {
                  fontSize: '14px',
                },
              }}
            />
          </Box>
        )}
      </Box>

      <Box sx={{ paddingTop: 12, width: '100%' }}>
        <Button
          size="lg"
          color={canProceed ? 'infgreen' : 'gray'}
          radius="md"
          fullWidth
          disabled={!canProceed}
          onClick={nextStep}
          sx={{
            height: 52,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          다음
        </Button>
      </Box>
    </Stack>
  );
}
