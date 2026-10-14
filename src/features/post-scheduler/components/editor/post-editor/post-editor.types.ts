import type { ReactNode } from 'react';
import type { PostFormProps } from '../post-form/post-form.types';

export interface PostEditorProps extends PostFormProps {
  title: string;
  description: string;
  /** Rendered under the form card, e.g. dev tools */
  footer?: ReactNode;
}
