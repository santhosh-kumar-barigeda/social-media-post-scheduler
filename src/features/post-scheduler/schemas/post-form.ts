import * as z from 'zod';
import { PLATFORM_OPTIONS } from '../constants/platforms';
import { getLimitStatuses } from '../utils/post-form';

function isValidUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

export const postFormSchema = z
  .object({
    content: z.string().refine((value) => value.trim().length > 0, 'Post content is required'),
    mediaUrl: z
      .string()
      .refine(
        (value) => value.trim() === '' || isValidUrl(value.trim()),
        'Enter a valid URL starting with http:// or https://',
      ),
    platforms: z
      .array(z.enum(['x', 'instagram', 'tiktok', 'facebook']))
      .min(1, 'Select at least one platform'),
    scheduledAt: z
      .date()
      .nullable()
      .refine((value) => value !== null, 'Choose a date and time')
      .refine(
        (value) => value === null || value.getTime() > Date.now(),
        'Scheduled time must be in the future',
      ),
  })
  .superRefine(({ content, platforms }, ctx) => {
    const overLimit = getLimitStatuses(content, platforms).filter((status) => status.isOver);
    if (overLimit.length === 0) return;

    const names = overLimit
      .map(({ platform }) => PLATFORM_OPTIONS.find((option) => option.id === platform)?.label)
      .join(', ');

    ctx.addIssue({
      code: 'custom',
      path: ['content'],
      message: `Too long for ${names}. Shorten your post or deselect the platform.`,
    });
  });
