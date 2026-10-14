export interface SchedulePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
}
