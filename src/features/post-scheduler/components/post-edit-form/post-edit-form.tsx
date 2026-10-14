import { PostEditor } from '../post-editor';
import type { PostEditFormProps } from '../../types/post';
import { usePostEditForm } from './post-edit-form.hooks';

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
