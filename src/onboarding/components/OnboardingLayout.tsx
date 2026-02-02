import React from 'react';
import {
  Box,
  Group,
  Progress,
  Button,
  Text,
  ActionIcon,
} from '@inflearn/ds-react';
import { FontAwesomeIcon } from '@inflearn/react-fontawesome';
import { faChevronLeft } from '@inflearn/pro-regular-svg-icons';
import { TOTAL_STEPS } from '../constants/onboardingOptions';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  onBack?: () => void;
  onSkip?: () => void;
  showProgress?: boolean;
  showHeader?: boolean;
}

export function OnboardingLayout({
  children,
  currentStep,
  onBack,
  onSkip,
  showProgress = true,
  showHeader = true,
}: OnboardingLayoutProps) {
  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <Box
      sx={{
        height: '100dvh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      {showHeader && (
        <Group
          position="apart"
          px="md"
          py="sm"
          sx={{
            borderBottom: '1px solid #f1f3f5',
          }}
        >
          {onBack ? (
            <ActionIcon
              variant="subtle"
              color="gray"
              size="lg"
              onClick={onBack}
              aria-label="뒤로 가기"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </ActionIcon>
          ) : (
            <Box sx={{ width: 34 }} />
          )}

          {onSkip ? (
            <Button
              variant="subtle"
              color="gray"
              size="sm"
              radius="md"
              onClick={onSkip}
            >
              다음에 하기
            </Button>
          ) : (
            <Box sx={{ width: 70 }} />
          )}
        </Group>
      )}

      {/* Progress */}
      {showProgress && currentStep > 0 && (
        <Box px="md" pt="md">
          <Group spacing="sm" align="center">
            <Progress
              value={progress}
              color="infgreen"
              size="sm"
              radius="xl"
              sx={{ flex: 1 }}
              aria-label={`온보딩 진행률 ${currentStep}/${TOTAL_STEPS}`}
            />
            <Text size="sm" color="gray.5" sx={{ minWidth: 32 }}>
              {currentStep}/{TOTAL_STEPS}
            </Text>
          </Group>
        </Box>
      )}

      {/* Content */}
      <Box
        sx={(theme) => ({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px',
          width: '100%',

          [`@media (max-width: ${theme.breakpoints.sm})`]: {
            padding: '16px',
          },
        })}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
