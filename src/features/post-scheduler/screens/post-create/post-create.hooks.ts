import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useCreatePost } from '../../hooks';
import { postFormSchema } from '../../schemas/post-form';
import type { PostFormValues } from '../../types/post';
import { getDefaultPostFormValues } from '../../utils/post-form';

export function usePostCreate() {
  const navigate = useNavigate();
  const { mutate: createPost, isPending } = useCreatePost();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: getDefaultPostFormValues(),
    mode: 'onChange',
  });
  const [platforms, content, mediaUrl] = useWatch({
    control: form.control,
    name: ['platforms', 'content', 'mediaUrl'],
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

  return { form, platforms, content, mediaUrl, isPending, handleSubmit };
}
