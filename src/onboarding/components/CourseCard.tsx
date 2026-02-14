import React from 'react';
import { Box, Stack, Group, Text, Badge, Image } from '@inflearn/ds-react';
import { FontAwesomeIcon } from '@inflearn/react-fontawesome';
import { faStar, faUser } from '@inflearn/pro-solid-svg-icons';

interface CourseCardProps {
  thumbnail: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount?: number;
  studentCount?: number;
  level?: string;
  price?: 'free' | number;
  originalPrice?: number;
  tags?: string[];
  showMeta?: boolean;
  metaVariant?: 'full' | 'compact';
  showReviewCount?: boolean;
  showStudentCount?: boolean;
  showStudentInline?: boolean;
  emphasizePrice?: boolean;
}

export function CourseCard({
  thumbnail,
  title,
  instructor,
  rating,
  reviewCount,
  studentCount,
  level,
  price,
  originalPrice,
  tags = [],
  showMeta = false,
  metaVariant = 'full',
  showReviewCount = true,
  showStudentCount = true,
  showStudentInline = false,
  emphasizePrice = false,
}: CourseCardProps) {
  const isCompact = metaVariant === 'compact';
  const priceLabel = price === 'free' ? '무료' : typeof price === 'number' ? `${price.toLocaleString()}원` : '';
  const hasDiscount =
    typeof price === 'number' && typeof originalPrice === 'number' && originalPrice > price;
  const discountRate = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Box
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
        '&:hover .course-title': {
          color: '#00C471',
        },
      }}
    >
      <Stack spacing={12}>
        <Box
          sx={(theme) => ({
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: theme.radius.sm,
            overflow: 'hidden',
            backgroundColor: theme.colors.gray[1],
          })}
        >
          <Image src={thumbnail} alt={title} width="100%" height="100%" fit="cover" withPlaceholder />
        </Box>

        <Stack spacing={6}>
          <Text
            className="course-title"
            weight={700}
            lineClamp={2}
            size="sm"
            color="gray.9"
            sx={{ lineHeight: 1.4, transition: 'color 0.2s ease' }}
          >
            {title}
          </Text>
          <Text size="xs" color="gray.6">
            {instructor}
          </Text>
          <Group spacing={6} noWrap>
            <FontAwesomeIcon icon={faStar} style={{ fontSize: 11, color: '#fab005' }} />
            <Text size="xs" color="gray.7" weight={600}>
              {rating.toFixed(1)}
            </Text>
            {showReviewCount && typeof reviewCount === 'number' && (
              <Text size="xs" color="gray.5">
                ({reviewCount.toLocaleString()})
              </Text>
            )}
            {showStudentCount && showStudentInline && typeof studentCount === 'number' && (
              <Group spacing={4} align="center" noWrap>
                <FontAwesomeIcon icon={faUser} style={{ fontSize: 10, color: '#adb5bd' }} />
                <Text size="xs" color="gray.5">
                  {studentCount.toLocaleString()}
                </Text>
              </Group>
            )}
          </Group>

          {showMeta && (
            <Stack spacing={6} sx={{ paddingTop: 4 }}>
              {typeof price !== 'undefined' && (
                <Stack spacing={2}>
                  {hasDiscount && (
                    <Group spacing={6} align="center">
                      <Text size="xs" color="infgreen.6" weight={700}>
                        {discountRate}%↓
                      </Text>
                      <Text size="xs" color="gray.5" sx={{ textDecoration: 'line-through' }}>
                        {originalPrice!.toLocaleString()}원
                      </Text>
                    </Group>
                  )}
                  {emphasizePrice ? (
                    <Text
                      size="sm"
                      weight={700}
                      color="gray.9"
                      sx={{
                        textDecoration: 'underline',
                        textDecorationThickness: '2px',
                        textUnderlineOffset: 3,
                      }}
                    >
                      {priceLabel}
                    </Text>
                  ) : (
                    <Text size="sm" weight={700} color="gray.9">
                      {priceLabel}
                    </Text>
                  )}
                </Stack>
              )}
              {tags.length > 0 && (
                <Group spacing={6}>
                  {level && (
                    <Badge color="gray" variant="light" radius="sm" size="sm">
                      {level}
                    </Badge>
                  )}
                  {tags.slice(0, isCompact ? 2 : 4).map((tag) => (
                    <Badge key={tag} color="gray" variant="outline" radius="sm" size="xs">
                      {tag}
                    </Badge>
                  ))}
                </Group>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
