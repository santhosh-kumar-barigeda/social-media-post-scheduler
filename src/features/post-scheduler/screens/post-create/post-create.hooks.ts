import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useCreatePost } from '../../hooks';
import { postFormSchema } from '../../schemas/post-form';
import type { PostFormValues } from '../../types/form';
import { getDefaultPostFormValues } from '../../utils/post-form';

export function usePostCreate() {
  const navigate = useNavigate();
  const { mutate: createPost, isPending } = useCreatePost();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: getDefaultPostFormValues(),
    mode: 'onChange',
  });
  function handleSubmit(values: PostFormValues) {
    const { scheduledAt } = values;
    if (!scheduledAt) return;

    createPost(
      {
        content: values.content.trim(),
        platforms: values.platforms,
        mediaUrl: values.mediaUrl.trim() || undefined,
        scheduledAt: scheduledAt.toISOString(),
      },
      { onSuccess: () => navigate('/posts') },
    );
  }

  return { form, isPending, handleSubmit };
}
