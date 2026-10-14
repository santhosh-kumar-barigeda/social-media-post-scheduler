import { PostEditor } from '../../components/editor/post-editor';
import { QuickFillPanel } from '../../components/editor/quick-fill-panel';
import { usePostCreate } from './post-create.hooks';

export function PostCreate() {
  const { form, isPending, handleSubmit } = usePostCreate();

  return (
    <PostEditor
      title="Create Post"
      description="Write your post, select platforms, and schedule it for publishing."
      form={form}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      footer={import.meta.env.DEV && <QuickFillPanel form={form} />}
    />
  );
}
