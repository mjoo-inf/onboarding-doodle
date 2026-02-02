import React from 'react';
import { Stack, Title, Text } from '@inflearn/ds-react';

interface OnboardingQuestionProps {
  title: string;
  subtitle?: string;
}

export function OnboardingQuestion({ title, subtitle }: OnboardingQuestionProps) {
  return (
    <Stack spacing="xs" align="center" mb="xl" sx={{ maxWidth: 600, width: '100%', margin: '0 auto' }}>
      <Title
        order={3}
        align="center"
        color="gray.9"
        sx={(theme) => ({
          fontSize: '24px',
          lineHeight: 1.4,

          [`@media (max-width: ${theme.breakpoints.sm})`]: {
            fontSize: '20px',
          },
        })}
      >
        {title}
      </Title>
      {subtitle && (
        <Text size="md" color="gray.6" align="center">
          {subtitle}
        </Text>
      )}
    </Stack>
  );
}
