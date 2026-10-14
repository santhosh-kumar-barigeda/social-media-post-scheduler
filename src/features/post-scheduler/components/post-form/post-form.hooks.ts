import { useWatch } from 'react-hook-form';
import type { Platform, PostFormProps } from '../../types/post';
import { getDefaultPostFormValues, getLimitStatuses } from '../../utils/post-form';

export function usePostForm(form: PostFormProps['form']) {
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
    reset(getDefaultPostFormValues());
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
