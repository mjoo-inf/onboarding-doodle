import React, { useState, useEffect, useRef } from 'react';
import { Stack, Button, Box, Textarea } from '@inflearn/ds-react';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { OnboardingQuestion } from '../components/OnboardingQuestion';
import { SelectionCard } from '../components/SelectionCard';
import { InterestChip } from '../components/InterestChip';
import { PURPOSE_OPTIONS } from '../constants/onboardingOptions';

interface PurposeStepProps {
  userName?: string;
}

export function PurposeStep({ userName }: PurposeStepProps) {
  const { purpose, customPurposeText, togglePurpose, setCustomPurposeText, nextStep } = useOnboardingStore();
  const [customInput, setCustomInput] = useState(customPurposeText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCustomInput(customPurposeText);
  }, [customPurposeText]);

  useEffect(() => {
    // "직접 입력하기"가 선택되면 입력 필드에 포커스
    if (purpose.includes('custom') && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [purpose]);

  // "직접 입력하기"가 선택되었을 때는 입력값이 있어야 함
  const hasCustomInput = purpose.includes('custom') ? customPurposeText.trim().length > 0 : true;
  const canProceed = purpose.length > 0 && hasCustomInput;

  const handleCustomClick = () => {
    togglePurpose('custom');
  };

  const handleCustomInputChange = (value: string) => {
    setCustomInput(value);
    if (value.trim()) {
      setCustomPurposeText(value.trim());
    } else {
      setCustomPurposeText('');
    }
  };

  return (
    <Stack spacing="md">
      <OnboardingQuestion
        title={userName ? `안녕하세요 ${userName}님, 인프런에 어떤 목적으로 오셨나요?` : '안녕하세요, 인프런에 어떤 목적으로 오셨나요?'}
        subtitle="목표와 관심사를 알려주시면 더 나은 강의를 찾아드릴게요."
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          width: '100%',
        }}
        role="group"
        aria-label="학습 목적 선택"
      >
        {PURPOSE_OPTIONS.map((option) => (
          <SelectionCard
            key={option.value}
            icon={option.icon}
            title={option.label}
            description={option.description}
            selected={purpose.includes(option.value)}
            onClick={() => togglePurpose(option.value)}
            variant="checkbox"
          />
        ))}
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
            selected={purpose.includes('custom')}
            onClick={handleCustomClick}
            variant="outline"
          />
          <InterestChip
            label="? 잘 모르겠다."
            selected={purpose.includes('unsure')}
            onClick={() => togglePurpose('unsure')}
            variant="outline"
          />
        </Box>
        {purpose.includes('custom') && (
          <Box>
            <Textarea
              ref={textareaRef}
              placeholder="학습 목적을 직접 입력해주세요"
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
