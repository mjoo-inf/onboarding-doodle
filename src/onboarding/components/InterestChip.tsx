import React from 'react';
import { Box, Text } from '@inflearn/ds-react';

interface InterestChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'filled' | 'outline';
}

export function InterestChip({
  label,
  selected = false,
  disabled = false,
  onClick,
  variant = 'filled',
}: InterestChipProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled) {
        onClick?.();
      }
    }
  };

  const isOutline = variant === 'outline';

  return (
    <Box
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="checkbox"
      aria-checked={selected}
      aria-disabled={disabled}
      sx={(theme) => ({
        padding: '12px 16px',
        borderRadius: theme.radius.md,
        border: `${isOutline ? '1px' : '2px'} ${isOutline ? 'dashed' : 'solid'} ${
          selected
            ? theme.colors.infgreen[6]
            : disabled
            ? theme.colors.gray[2]
            : isOutline
            ? theme.colors.gray[4]
            : theme.colors.gray[3]
        }`,
        backgroundColor: selected
          ? theme.colors.infgreen[0]
          : disabled
          ? theme.colors.gray[1]
          : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s ease',
        textAlign: 'center',
        userSelect: 'none',

        '&:hover': disabled
          ? {}
          : {
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
      <Text
        size="sm"
        weight={selected ? 600 : 500}
        color={
          selected
            ? 'infgreen.8'
            : disabled
            ? 'gray.4'
            : isOutline
            ? 'gray.6'
            : 'gray.7'
        }
      >
        {label}
      </Text>
    </Box>
  );
}
