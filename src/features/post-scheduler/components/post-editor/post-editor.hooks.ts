import { useWatch } from 'react-hook-form';
import type { PostFormProps } from '../../types/post';

export function usePostEditor(form: PostFormProps['form']) {
  const [platforms, content, mediaUrl] = useWatch({
    control: form.control,
    name: ['platforms', 'content', 'mediaUrl'],
  });

  return { platforms, content, mediaUrl };
}
