import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { PostForm } from '../post-form';
import { SocialMediaPostPreview } from '../../preview/social-media-post-preview';
import { usePostEditor } from './post-editor.hooks';
import type { PostEditorProps } from './post-editor.types';

/** Shared layout for the create and edit screens: form card, live preview card, optional footer. */
export function PostEditor({ title, description, footer, ...formProps }: PostEditorProps) {
  const { platforms, content, mediaUrl } = usePostEditor(formProps.form);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-level={1} className="text-2xl font-bold">
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <PostForm {...formProps} />
          </CardContent>
        </Card>
        {footer}
      </div>

      <Card className="hidden lg:flex">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Post Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <SocialMediaPostPreview
            x={platforms.includes('x')}
            instagram={platforms.includes('instagram')}
            tiktok={platforms.includes('tiktok')}
            facebook={platforms.includes('facebook')}
            content={content}
            mediaUrl={mediaUrl}
          />
        </CardContent>
      </Card>
    </div>
  );
}
