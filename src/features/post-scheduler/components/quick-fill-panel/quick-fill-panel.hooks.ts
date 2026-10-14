import { useState } from 'react';
import {
  QUICK_FILL_CONTENT_OPTIONS,
  QUICK_FILL_MEDIA_URL,
  QUICK_FILL_PLATFORM_OPTIONS,
} from '../../constants/quick-fill';
import type { QuickFillPanelProps } from '../../types/post';
import { generateTestContent } from '../../utils/test-content';

const FIELD_OPTIONS = { shouldDirty: true, shouldValidate: true } as const;

export function useQuickFill(form: QuickFillPanelProps['form']) {
  const [contentKey, setContentKey] = useState(QUICK_FILL_CONTENT_OPTIONS[0].value);
  const [platformKey, setPlatformKey] = useState(QUICK_FILL_PLATFORM_OPTIONS[1].value);
  const [withMedia, setWithMedia] = useState(true);

  function handleFill() {
    const content = QUICK_FILL_CONTENT_OPTIONS.find((option) => option.value === contentKey);
    const platforms = QUICK_FILL_PLATFORM_OPTIONS.find((option) => option.value === platformKey);
    if (!content || !platforms) return;

    // Platforms first, so the content limit is validated against the new selection.
    form.setValue('platforms', platforms.platforms, FIELD_OPTIONS);
    form.setValue('mediaUrl', withMedia ? QUICK_FILL_MEDIA_URL : '', FIELD_OPTIONS);
    form.setValue(
      'content',
      content.text ?? generateTestContent(content.length ?? 0),
      FIELD_OPTIONS,
    );
  }

  return {
    contentKey,
    setContentKey,
    platformKey,
    setPlatformKey,
    withMedia,
    setWithMedia,
    handleFill,
  };
}
