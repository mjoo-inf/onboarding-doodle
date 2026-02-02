import React from 'react';
import { Stack, Title, Text, Button, Box } from '@inflearn/ds-react';
import { useOnboardingStore } from '../store/useOnboardingStore';

interface WelcomeStepProps {
  onSkip?: () => void;
}

export function WelcomeStep({ onSkip }: WelcomeStepProps) {
  const nextStep = useOnboardingStore((state) => state.nextStep);

  return (
    <Stack
      spacing="xl"
      align="center"
      justify="center"
      sx={{ flex: 1, textAlign: 'center' }}
    >
      {/* Illustration */}
      <Box
        sx={(theme) => ({
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: theme.colors.infgreen[0],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 80,
          animation: 'float 3s ease-in-out infinite',

          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0)',
            },
            '50%': {
              transform: 'translateY(-10px)',
            },
          },
        })}
      >
        🌱
      </Box>

      {/* Title */}
      <Stack spacing="sm" align="center">
        <Title
          order={2}
          color="gray.9"
          align="center"
          sx={{ lineHeight: 1.3 }}
        >
          인프런에 오신 것을
          <br />
          환영합니다!
        </Title>

        <Text size="lg" color="gray.7" align="center" sx={{ lineHeight: 1.6 }}>
          몇 가지 질문에 답해주시면
          <br />
          딱 맞는 강의를 추천해 드릴게요
        </Text>
      </Stack>

      {/* Duration */}
      <Text size="sm" color="gray.5">
        약 1분 정도 소요됩니다
      </Text>

      {/* Actions */}
      <Stack spacing="sm" sx={{ width: '100%', maxWidth: 320 }}>
        <Button
          size="lg"
          color="infgreen"
          radius="md"
          fullWidth
          onClick={nextStep}
          sx={{
            height: 52,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          시작하기
        </Button>

        <Button
          variant="subtle"
          color="gray"
          size="md"
          radius="md"
          fullWidth
          onClick={onSkip}
        >
          다음에 하기
        </Button>
      </Stack>
    </Stack>
  );
}
