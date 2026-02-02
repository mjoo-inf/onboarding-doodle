import React, { useState, useEffect, useRef } from 'react';
import { Stack, Button, Box, Text, Textarea } from '@inflearn/ds-react';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { OnboardingQuestion } from '../components/OnboardingQuestion';
import { InterestChip } from '../components/InterestChip';
import { INTEREST_OPTIONS } from '../constants/onboardingOptions';

export function InterestsStep() {
  const { interests, customInterestText, toggleInterest, setCustomInterestText, nextStep } = useOnboardingStore();
  const [customInput, setCustomInput] = useState(customInterestText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCustomInput(customInterestText);
  }, [customInterestText]);

  useEffect(() => {
    if (interests.includes('custom') && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [interests]);

  const hasCustomInput = interests.includes('custom') ? customInterestText.trim().length > 0 : true;
  const canProceed = interests.length > 0 && hasCustomInput;

  const handleCustomInputChange = (value: string) => {
    setCustomInput(value);
    if (value.trim()) {
      setCustomInterestText(value.trim());
    } else {
      setCustomInterestText('');
    }
  };

  return (
    <Stack spacing="md">
      <OnboardingQuestion
        title="어떤 분야에 관심이 있으세요?"
        subtitle="목표와 관심사를 알려주시면 더 나은 강의를 찾아드릴게요"
      />

      {/* Selection Count */}
      <Text size="sm" color={interests.length > 0 ? 'infgreen.6' : 'gray.5'} align="center">
        {interests.filter((i) => i !== 'unsure').length}개 선택됨
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
          aria-label="관심 분야 선택"
        >
          {INTEREST_OPTIONS.filter((option) => option.value !== 'other').map((option) => {
            const isSelected = interests.includes(option.value);

            return (
              <Box key={option.value} sx={{ width: 'calc(33.33% - 6px)' }}>
                <InterestChip
                  label={option.label}
                  selected={isSelected}
                  disabled={false}
                  onClick={() => toggleInterest(option.value)}
                />
              </Box>
            );
          })}
        </Box>

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
            selected={interests.includes('custom')}
            disabled={false}
            onClick={() => toggleInterest('custom')}
            variant="outline"
          />
          <InterestChip
            label="? 잘 모르겠다."
            selected={interests.includes('unsure')}
            disabled={false}
            onClick={() => toggleInterest('unsure')}
            variant="outline"
          />
        </Box>

        {interests.includes('custom') && (
          <Box>
            <Textarea
              ref={textareaRef}
              placeholder="관심 분야를 직접 입력해주세요"
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
