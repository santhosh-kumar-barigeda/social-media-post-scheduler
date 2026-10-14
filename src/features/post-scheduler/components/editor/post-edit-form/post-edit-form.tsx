import { PostEditor } from '../post-editor';
import { usePostEditForm } from './post-edit-form.hooks';
import type { PostEditFormProps } from './post-edit-form.types';

export function PostEditForm({ post }: PostEditFormProps) {
  const { form, resetValues, isPending, handleSubmit } = usePostEditForm(post);

  return (
    <PostEditor
      title="Edit Post"
      description="Update your post's content, platforms, and schedule."
      form={form}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      resetValues={resetValues}
    />
  );
}
