import React from 'react';
import { Paper, Image, Stack, Group, Text, Badge, Box } from '@inflearn/ds-react';

export interface CourseData {
  id: string;
  thumbnail: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  level: string;
  price: number | 'free';
}

interface CourseRecommendCardProps {
  course: CourseData;
  onClick?: () => void;
}

export function CourseRecommendCard({
  course,
  onClick,
}: CourseRecommendCardProps) {
  const { thumbnail, title, instructor, rating, reviewCount, level, price } = course;

  return (
    <Paper
      p="md"
      radius="md"
      withBorder
      onClick={onClick}
      sx={(theme) => ({
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderColor: theme.colors.gray[2],

        '&:hover': {
          borderColor: theme.colors.gray[3],
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(-2px)',
        },
      })}
    >
      <Group noWrap align="flex-start" spacing="md">
        <Box
          sx={(theme) => ({
            width: 120,
            height: 80,
            borderRadius: theme.radius.sm,
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: theme.colors.gray[1],
          })}
        >
          <Image
            src={thumbnail}
            width={120}
            height={80}
            alt={title}
            fit="cover"
            withPlaceholder
          />
        </Box>

        <Stack spacing={6} sx={{ flex: 1, minWidth: 0 }}>
          <Text
            weight={600}
            lineClamp={2}
            color="gray.9"
            sx={{ lineHeight: 1.4 }}
          >
            {title}
          </Text>

          <Group spacing="xs" noWrap>
            <Group spacing={4} noWrap>
              <Text color="yellow.6" size="sm">
                ★
              </Text>
              <Text size="sm" color="gray.7" weight={500}>
                {rating.toFixed(1)}
              </Text>
              <Text size="sm" color="gray.5">
                ({reviewCount.toLocaleString()})
              </Text>
            </Group>

            <Text size="sm" color="gray.4">
              ·
            </Text>

            <Badge
              size="sm"
              variant="light"
              color="gray"
              sx={{ flexShrink: 0 }}
            >
              {level}
            </Badge>
          </Group>

          <Text size="sm" color="gray.6" lineClamp={1}>
            {instructor}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
}
