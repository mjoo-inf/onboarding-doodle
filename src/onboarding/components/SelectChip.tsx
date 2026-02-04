import React from 'react';
import { Box, Text } from '@inflearn/ds-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface SelectChipProps {
  label: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: 'filled' | 'outline' | 'light';
  fullWidth?: boolean;
  containerRef?: React.Ref<HTMLDivElement>;
  leadingIcon?: IconDefinition;
}

export function SelectChip({
  label,
  description,
  selected = false,
  onClick,
  variant = 'light',
  fullWidth = false,
  containerRef,
  leadingIcon,
}: SelectChipProps) {
  const isOutline = variant === 'outline';
  const isLight = variant === 'light';

  return (
    <Box
      ref={containerRef}
      onClick={onClick}
      sx={(theme) => ({
        padding: description ? '10px 14px' : '8px 14px',
        borderRadius: theme.radius.md,
        border: isOutline
          ? `1px dashed ${selected ? theme.colors.gray[7] : theme.colors.gray[4]}`
          : `1px solid ${
              selected
                ? isLight
                  ? theme.colors.infgreen[6]
                  : theme.colors.gray[9]
                : theme.colors.gray[3]
            }`,
        backgroundColor: selected
          ? isOutline
            ? theme.colors.gray[1]
            : isLight
            ? theme.colors.infgreen[0]
            : theme.colors.gray[9]
          : 'white',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        userSelect: 'none',
        width: fullWidth ? '100%' : 'auto',

        '&:hover': {
          borderColor: selected
            ? isOutline
              ? theme.colors.gray[7]
              : isLight
              ? theme.colors.infgreen[7]
              : theme.colors.gray[9]
            : theme.colors.gray[5],
          backgroundColor: selected
            ? isOutline
              ? theme.colors.gray[2]
              : isLight
              ? theme.colors.infgreen[1]
              : theme.colors.gray[8]
            : theme.colors.gray[0],
        },
      })}
    >
      <Box
        sx={(theme) => ({
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          gap: theme.spacing.sm,
        })}
      >
        {leadingIcon && (
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              color: selected
                ? isOutline
                  ? theme.colors.gray[8]
                  : isLight
                  ? theme.colors.infgreen[7]
                  : theme.colors.gray[0]
                : theme.colors.gray[6],
            })}
          >
            <FontAwesomeIcon icon={leadingIcon} />
          </Box>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Text
            size="sm"
            weight={selected ? 600 : 500}
            color={
              selected
                ? isOutline
                  ? 'gray.8'
                  : isLight
                  ? 'infgreen.7'
                  : 'white'
                : 'gray.6'
            }
          >
            {label}
          </Text>
          {description && (
            <Text
              size="xs"
              color={
                selected
                  ? isOutline
                    ? 'gray.6'
                    : isLight
                    ? 'infgreen.6'
                    : 'gray.4'
                  : 'gray.5'
              }
              mt={4}
            >
              {description}
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}

interface SelectChipGroupProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  fitContent?: boolean;
}

export function SelectChipGroup({
  children,
  columns = 1,
  fitContent = false,
}: SelectChipGroupProps) {
  const templateColumns = fitContent
    ? `repeat(${columns}, max-content)`
    : columns === 1
    ? '1fr'
    : `repeat(${columns}, 1fr)`;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: templateColumns,
        gap: 8,
        width: fitContent ? 'fit-content' : '100%',
        justifyItems: fitContent ? 'end' : 'stretch',
      }}
    >
      {children}
    </Box>
  );
}

export function SelectChipWrap({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        width: '100%',
        justifyContent: 'flex-end',
      }}
    >
      {children}
    </Box>
  );
}
