import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useUpdatePost } from '@/features/post-scheduler/hooks';
import { postFormSchema } from '@/features/post-scheduler/schemas/post-form';
import type { PostFormValues } from '@/features/post-scheduler/types/form';
import type { Post } from '@/features/post-scheduler/types/post';
import { postToFormValues } from '@/features/post-scheduler/utils/post-form';

export function usePostEditForm(post: Post) {
  const navigate = useNavigate();
  const { mutate: updatePost, isPending } = useUpdatePost();
  const resetValues = postToFormValues(post);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: resetValues,
    mode: 'onChange',
  });

  function handleSubmit(values: PostFormValues) {
    const { scheduledAt } = values;
    if (!scheduledAt) return;

    updatePost(
      {
        id: post.id,
        input: {
          content: values.content.trim(),
          platforms: values.platforms,
          // `null` (not `undefined`) so a removed media URL is cleared on the server
          mediaUrl: values.mediaUrl.trim() || null,
          scheduledAt: scheduledAt.toISOString(),
          // Saving reschedules the post, so a failed post goes back to scheduled
          status: 'scheduled',
          errorMessage: null,
        },
      },
      { onSuccess: () => navigate('/posts') },
    );
  }

  return { form, resetValues, isPending, handleSubmit };
}
