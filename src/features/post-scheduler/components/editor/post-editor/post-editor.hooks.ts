import { useWatch } from 'react-hook-form';
import type { PostFormProps } from '../post-form/post-form.types';

export function usePostEditor(form: PostFormProps['form']) {
  const [platforms, content, mediaUrl] = useWatch({
    control: form.control,
    name: ['platforms', 'content', 'mediaUrl'],
  });

  return { platforms, content, mediaUrl };
}
