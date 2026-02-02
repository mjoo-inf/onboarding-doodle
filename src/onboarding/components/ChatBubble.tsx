import React from 'react';
import { Box, Text, ActionIcon, Tooltip } from '@inflearn/ds-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

type AnswerItem = { label: string; description?: string };

interface UserAnswerBubbleProps {
  answers: Array<string | AnswerItem>;
  onEdit?: () => void;
}

export function UserAnswerBubble({ answers, onEdit }: UserAnswerBubbleProps) {
  const hasDetailedAnswer = answers.some((answer) => typeof answer !== 'string');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 24,
        '&:hover .edit-link': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ width: 'fit-content', maxWidth: '100%' }}>
        <Box
          sx={(theme) => ({
            padding: '10px 14px',
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.gray[1],
            border: `1px solid ${theme.colors.gray[3]}`,
            width: 'fit-content',
            maxWidth: '100%',
          })}
        >
          {hasDetailedAnswer ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {answers.map((answer, index) => {
                if (typeof answer === 'string') {
                  return (
                    <Text key={index} size="sm" color="gray.8" weight={500}>
                      {answer}
                    </Text>
                  );
                }

                return (
                  <Box key={`${answer.label}-${index}`}>
                    <Text size="sm" color="gray.8" weight={600}>
                      {answer.label}
                    </Text>
                    {answer.description && (
                      <Text size="xs" color="gray.6" mt={2}>
                        {answer.description}
                      </Text>
                    )}
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Text size="sm" color="gray.8" weight={500}>
              {(answers as string[]).join(', ')}
            </Text>
          )}
        </Box>
        {onEdit && (
          <Box mt={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip label="수정" withArrow>
              <ActionIcon
                className="edit-link"
                variant="subtle"
                color="gray"
                size="sm"
                onClick={onEdit}
                sx={{
                  opacity: 0,
                  transition: 'opacity 0.15s ease',
                }}
                aria-label="수정"
              >
                <FontAwesomeIcon icon={faPen} style={{ fontSize: 12 }} />
              </ActionIcon>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Box>
  );
}

interface AssistantMessageProps {
  message: string;
  subMessage?: string;
}

export function AssistantMessage({ message, subMessage }: AssistantMessageProps) {
  return (
    <Box sx={{ marginBottom: 20 }}>
      <Text size="md" color="gray.9" weight={500} sx={{ lineHeight: 1.6 }}>
        {message}
      </Text>
      {subMessage && (
        <Text size="sm" color="gray.6" mt={4}>
          {subMessage}
        </Text>
      )}
    </Box>
  );
}
