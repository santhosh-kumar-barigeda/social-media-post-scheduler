import { format } from 'date-fns';
import { useState } from 'react';
import type { SchedulePickerProps } from './schedule-picker.types';

const TIME_PATTERN = /^(\d{2}):(\d{2})$/;

export function useSchedulePicker({
  value,
  onChange,
}: Pick<SchedulePickerProps, 'value' | 'onChange'>) {
  // While the user is editing, the browser reports an empty or partial time. Keep that as a
  // draft so it never reaches the form value (an invalid Date would crash the date formatting).
  const [draftTime, setDraftTime] = useState<string | null>(null);
  const timeValue = draftTime ?? (value ? format(value, 'HH:mm') : '');

  function handleDateSelect(day: Date | undefined) {
    if (!day) return;
    const next = new Date(day);
    const base = value ?? new Date();
    next.setHours(base.getHours(), base.getMinutes(), 0, 0);
    onChange(next);
  }

  function handleTimeChange(time: string) {
    const match = TIME_PATTERN.exec(time);
    if (!match) {
      setDraftTime(time);
      return;
    }

    setDraftTime(null);
    const next = new Date(value ?? new Date());
    next.setHours(Number(match[1]), Number(match[2]), 0, 0);
    onChange(next);
  }

  function handleTimeBlur() {
    setDraftTime(null);
  }

  return { timeValue, handleDateSelect, handleTimeChange, handleTimeBlur };
}
