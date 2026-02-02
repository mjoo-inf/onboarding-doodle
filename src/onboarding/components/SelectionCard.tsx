import React from 'react';
import { Paper, Group, Stack, Text, Box } from '@inflearn/ds-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface SelectionCardProps {
  icon?: IconDefinition;
  title: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: 'checkbox' | 'radio';
  styleVariant?: 'filled' | 'outline';
}

export function SelectionCard({
  icon,
  title,
  description,
  selected = false,
  onClick,
  variant = 'checkbox',
  styleVariant = 'filled',
}: SelectionCardProps) {
  const isOutline = styleVariant === 'outline';
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <Paper
      p="md"
      radius="md"
      onClick={onClick}
      tabIndex={0}
      role={variant === 'radio' ? 'radio' : 'checkbox'}
      aria-checked={selected}
      onKeyDown={handleKeyDown}
      sx={(theme) => ({
        cursor: 'pointer',
        border: `${isOutline ? '1px' : '2px'} ${isOutline ? 'dashed' : 'solid'} ${
          selected
            ? theme.colors.infgreen[6]
            : isOutline
            ? theme.colors.gray[4]
            : theme.colors.gray[3]
        }`,
        backgroundColor: selected ? theme.colors.infgreen[0] : 'white',
        transition: 'all 0.15s ease',
        userSelect: 'none',

        '&:hover': {
          borderColor: selected
            ? theme.colors.infgreen[7]
            : theme.colors.gray[5],
          backgroundColor: selected
            ? theme.colors.infgreen[1]
            : theme.colors.gray[0],
        },

        '&:focus-visible': {
          outline: `2px solid ${theme.colors.infgreen[6]}`,
          outlineOffset: '2px',
        },
      })}
    >
      <Group noWrap spacing="md">
        {variant === 'radio' && (
          <Box
            sx={(theme) => ({
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: `2px solid ${
                selected ? theme.colors.infgreen[6] : theme.colors.gray[4]
              }`,
              backgroundColor: selected ? theme.colors.infgreen[6] : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            })}
          >
            {selected && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                }}
              />
            )}
          </Box>
        )}

        {icon && (
          <Box
            sx={(theme) => ({
              width: 40,
              height: 40,
              borderRadius: theme.radius.md,
              backgroundColor: selected ? theme.colors.infgreen[1] : theme.colors.gray[1],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            })}
          >
            <FontAwesomeIcon
              icon={icon}
              style={{
                fontSize: 18,
                color: selected ? '#00C471' : '#868e96',
              }}
            />
          </Box>
        )}

        <Stack spacing={4} sx={{ flex: 1 }}>
          <Text
            weight={600}
            color={selected ? 'infgreen.8' : 'gray.9'}
            size="md"
          >
            {title}
          </Text>
          {description && (
            <Text size="sm" color={selected ? 'infgreen.7' : 'gray.6'}>
              {description}
            </Text>
          )}
        </Stack>

        {variant === 'checkbox' && selected && (
          <Box
            sx={(theme) => ({
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: theme.colors.infgreen[6],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            })}
          >
            <Text size="xs" color="white" weight={700}>
              ✓
            </Text>
          </Box>
        )}
      </Group>
    </Paper>
  );
}
