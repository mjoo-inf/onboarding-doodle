import React from 'react';
import { Box, Text, Group, Badge, ActionIcon } from '@inflearn/ds-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons';

interface CompletedStepSummaryProps {
  question: string;
  answers: string[];
  stepNumber: number;
  onEdit?: () => void;
}

export function CompletedStepSummary({
  question,
  answers,
  stepNumber,
  onEdit,
}: CompletedStepSummaryProps) {
  return (
    <Box
      onClick={onEdit}
      sx={(theme) => ({
        padding: '16px',
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.gray[0],
        marginBottom: 16,
        cursor: onEdit ? 'pointer' : 'default',
        transition: 'all 0.15s ease',
        border: '1px solid transparent',
        '&:hover': onEdit
          ? {
              backgroundColor: theme.colors.gray[1],
              borderColor: theme.colors.gray[3],
            }
          : {},
      })}
    >
      <Group position="apart" align="flex-start" noWrap>
        <Box sx={{ flex: 1 }}>
          <Group spacing="xs" mb="sm">
            <Box
              sx={(theme) => ({
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: theme.colors.infgreen[6],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}
            >
              <FontAwesomeIcon icon={faCheck} style={{ fontSize: 10, color: 'white' }} />
            </Box>
            <Text size="sm" color="gray.6">
              질문 {stepNumber}
            </Text>
          </Group>

          <Text size="sm" color="gray.7" mb="sm">
            {question}
          </Text>

          <Group spacing="xs">
            {answers.map((answer, index) => (
              <Badge
                key={index}
                variant="light"
                color="infgreen"
                size="md"
                radius="md"
              >
                {answer}
              </Badge>
            ))}
          </Group>
        </Box>

        {onEdit && (
          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <FontAwesomeIcon icon={faPen} style={{ fontSize: 12 }} />
          </ActionIcon>
        )}
      </Group>
    </Box>
  );
}
