import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { PostForm } from '../../components/post-form';
import { QuickFillPanel } from '../../components/quick-fill-panel';
import { SocialMediaPostPreview } from '../../components/social-media-post-preview';
import { usePostCreate } from './post-create.hooks';

export function PostCreate() {
  const { form, platforms, content, mediaUrl, isPending, handleSubmit } = usePostCreate();

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle role="heading" aria-level={1} className="text-2xl font-bold">
                Create Post
              </CardTitle>
              <CardDescription>
                Write your post, select platforms, and schedule it for publishing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PostForm form={form} onSubmit={handleSubmit} isSubmitting={isPending} />
            </CardContent>
          </Card>
          {import.meta.env.DEV && <QuickFillPanel form={form} />}
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
    </div>
  );
}
