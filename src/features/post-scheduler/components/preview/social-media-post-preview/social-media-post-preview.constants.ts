import { FacebookPostPreview } from '../facebook-post-preview';
import { InstagramPostPreview } from '../instagram-post-preview';
import { TikTokPostPreview } from '../tiktok-post-preview';
import { XPostPreview } from '../x-post-preview';

export const PREVIEWS = {
  x: XPostPreview,
  instagram: InstagramPostPreview,
  tiktok: TikTokPostPreview,
  facebook: FacebookPostPreview,
};
