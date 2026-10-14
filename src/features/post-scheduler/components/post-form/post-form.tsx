import { CalendarCheck, Link2, RotateCcw } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Button } from '@/shared/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { MEDIA_URL_PLACEHOLDER } from '../../constants/post-form';
import type { PostFormProps } from '../../types/post';
import { PlatformSelector } from '../platform-selector';
import { PostPreviewSheet } from '../post-preview-sheet';
import { SchedulePicker } from '../schedule-picker';
import { usePostForm } from './post-form.hooks';

const SECTION_TITLE = 'text-base font-semibold data-[variant=label]:text-base';
const LEGEND_CLASS = `mb-2 ${SECTION_TITLE}`;

export function PostForm({
  form,
  onSubmit,
  isSubmitting,
  submitLabel = 'Schedule Post',
  submittingLabel = 'Scheduling...',
  resetValues,
}: PostFormProps) {
  const { control, handleSubmit } = form;
  const {
    content,
    platforms,
    mediaUrl,
    overLimitCount,
    hasOverLimit,
    handlePlatformsChange,
    handleReset,
  } = usePostForm(form, resetValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-6">
        <Controller
          name="content"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={SECTION_TITLE}>
                Post content
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder="Write your post here..."
                aria-invalid={fieldState.invalid}
                className="min-h-40"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="platforms"
          control={control}
          render={({ field, fieldState }) => (
            <FieldSet className="gap-2">
              <FieldLegend variant="label" className={LEGEND_CLASS}>
                Select platforms
              </FieldLegend>
              <PlatformSelector
                value={field.value}
                content={content}
                onChange={(next) => handlePlatformsChange(next, field.onChange)}
                error={fieldState.error?.message}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldSet>
          )}
        />

        <div className="grid gap-6 @md/field-group:grid-cols-2">
          <Controller
            name="mediaUrl"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className={SECTION_TITLE}>
                  Media URL
                </FieldLabel>
                <div className="relative">
                  <Link2 className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...field}
                    id={field.name}
                    type="url"
                    placeholder={MEDIA_URL_PLACEHOLDER}
                    aria-invalid={fieldState.invalid}
                    className="h-11 pl-9"
                  />
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="scheduledAt"
            control={control}
            render={({ field, fieldState }) => (
              <FieldSet className="gap-2">
                <FieldLegend variant="label" className={LEGEND_CLASS}>
                  Schedule time
                </FieldLegend>
                <SchedulePicker
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldSet>
            )}
          />
        </div>

        <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3 *:flex-1 sm:*:flex-none">
            <Button type="button" variant="outline" onClick={handleReset} className="h-11 px-6">
              <RotateCcw className="size-4" />
              Reset
            </Button>
            <PostPreviewSheet platforms={platforms} content={content} mediaUrl={mediaUrl} />
          </div>
          <div className="flex flex-col items-stretch gap-1 sm:items-end">
            <Button type="submit" disabled={hasOverLimit || isSubmitting} className="h-11 px-6">
              <CalendarCheck className="size-4" />
              {isSubmitting ? submittingLabel : submitLabel}
            </Button>
            {hasOverLimit && (
              <p className="text-sm text-destructive">
                Fix {overLimitCount} platform{overLimitCount > 1 ? 's' : ''} over the character
                limit.
              </p>
            )}
          </div>
        </div>
      </FieldGroup>
    </form>
  );
}
