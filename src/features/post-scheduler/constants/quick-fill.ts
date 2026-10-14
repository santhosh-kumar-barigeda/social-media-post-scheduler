import type { QuickFillContentOption, QuickFillPlatformOption } from '../types/post';

export const QUICK_FILL_MEDIA_URL =
  'https://images.pexels.com/photos/14774085/pexels-photo-14774085.jpeg';

const SAMPLE_POST = `🌟 Believe in yourself and keep moving forward! 💪✨ Life won't always be easy, but every challenge teaches you something valuable. 🌱 Don't compare your journey with others. Focus on your growth, protect your peace, and celebrate every small victory. ❤️🚀

Remember, success takes patience, consistency, and courage. 🌈 Keep learning, stay positive, and never stop dreaming. Your future is shaped by the choices you make today! 🔥💯

💬 What's your biggest goal right now? Share below! 👇😊

#Motivation #Growth #Success 🌻`;

export const QUICK_FILL_CONTENT_OPTIONS: QuickFillContentOption[] = [
  {
    value: 'sample-post',
    label: `Sample motivational post (${SAMPLE_POST.length} chars, over X limit)`,
    text: SAMPLE_POST,
  },
  { value: 'short', label: 'Short (60 chars)', length: 60 },
  { value: 'near-x', label: 'Near X limit (270 chars)', length: 270 },
  { value: 'x-limit', label: 'Exactly X limit (280 chars)', length: 280 },
  { value: 'over-x', label: 'Over X limit (281 chars)', length: 281 },
  { value: 'ig-limit', label: 'Exactly Instagram / TikTok limit (2,200 chars)', length: 2200 },
  { value: 'over-ig', label: 'Over Instagram / TikTok limit (2,201 chars)', length: 2201 },
  { value: 'fb-limit', label: 'Exactly Facebook limit (5,000 chars)', length: 5000 },
  { value: 'over-fb', label: 'Over Facebook limit (5,001 chars)', length: 5001 },
];

export const QUICK_FILL_PLATFORM_OPTIONS: QuickFillPlatformOption[] = [
  { value: 'all', label: 'All platforms', platforms: ['x', 'instagram', 'tiktok', 'facebook'] },
  {
    value: 'instagram-tiktok-facebook',
    label: 'Instagram + TikTok + Facebook',
    platforms: ['instagram', 'tiktok', 'facebook'],
  },
  { value: 'x', label: 'X only', platforms: ['x'] },
  { value: 'instagram-tiktok', label: 'Instagram + TikTok', platforms: ['instagram', 'tiktok'] },
  { value: 'facebook', label: 'Facebook only', platforms: ['facebook'] },
  { value: 'none', label: 'No platforms', platforms: [] },
];
