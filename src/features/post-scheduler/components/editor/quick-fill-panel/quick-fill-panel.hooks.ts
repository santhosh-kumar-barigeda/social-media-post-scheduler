import { useState } from 'react';
import {
  QUICK_FILL_CONTENT_OPTIONS,
  QUICK_FILL_MEDIA_URL,
  QUICK_FILL_PLATFORM_OPTIONS,
  FIELD_OPTIONS,
} from './quick-fill-panel.constants';
import { generateTestContent } from './quick-fill-panel.utils';
import type { QuickFillPanelProps } from './quick-fill-panel.types';

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
