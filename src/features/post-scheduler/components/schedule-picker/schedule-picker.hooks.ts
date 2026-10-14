import type { SchedulePickerProps } from '../../types/post';

export function useSchedulePicker({
  value,
  onChange,
}: Pick<SchedulePickerProps, 'value' | 'onChange'>) {
  function handleDateSelect(day: Date | undefined) {
    if (!day) return;
    const next = new Date(day);
    const base = value ?? new Date();
    next.setHours(base.getHours(), base.getMinutes(), 0, 0);
    onChange(next);
  }

  function handleTimeChange(time: string) {
    const [hours, minutes] = time.split(':').map(Number);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return;
    const next = new Date(value ?? new Date());
    next.setHours(hours, minutes, 0, 0);
    onChange(next);
  }

  return { handleDateSelect, handleTimeChange };
}
