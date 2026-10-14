import { useWatch } from 'react-hook-form';
import type { PostFormValues } from '@/features/post-scheduler/types/form';
import type { Platform } from '@/features/post-scheduler/types/post';
import {
  getDefaultPostFormValues,
  getLimitStatuses,
} from '@/features/post-scheduler/utils/post-form';
import type { PostFormProps } from './post-form.types';

export function usePostForm(form: PostFormProps['form'], resetValues?: PostFormValues) {
  const { control, reset, trigger, getFieldState } = form;

  const content = useWatch({ control, name: 'content' });
  const platforms = useWatch({ control, name: 'platforms' });
  const mediaUrl = useWatch({ control, name: 'mediaUrl' });

  const overLimitCount = getLimitStatuses(content, platforms).filter(
    (status) => status.isOver,
  ).length;
  const hasOverLimit = overLimitCount > 0;

  function handlePlatformsChange(next: Platform[], onChange: (value: Platform[]) => void) {
    onChange(next);
    if (getFieldState('content').isDirty) void trigger('content');
  }

  function handleReset() {
    reset(resetValues ?? getDefaultPostFormValues());
  }

  return {
    content,
    platforms,
    mediaUrl,
    overLimitCount,
    hasOverLimit,
    handlePlatformsChange,
    handleReset,
  };
}
