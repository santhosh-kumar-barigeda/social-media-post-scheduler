import type { UseFormReturn } from 'react-hook-form';
import type { PostFormValues } from '@/features/post-scheduler/types/form';

export interface PostFormProps {
  form: UseFormReturn<PostFormValues>;
  onSubmit: (values: PostFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  submittingLabel?: string;
  /** What Reset restores; defaults to an empty form */
  resetValues?: PostFormValues;
}
