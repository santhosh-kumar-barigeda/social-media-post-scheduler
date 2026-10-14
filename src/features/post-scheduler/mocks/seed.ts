import type { Platform, Post } from '../types/post';

const PLATFORMS: Platform[] = ['facebook', 'instagram', 'x', 'tiktok'];
const CONTENTS = [
  'Launching our new product line this week. Stay tuned!',
  'Behind the scenes at the studio today.',
  '5 tips to grow your audience organically.',
  'Monday motivation: small steps every day add up.',
  'Customer story: how Acme doubled engagement in 30 days.',
  "We're hiring! Check out open roles on our careers page.",
  'Weekend sale starts now. Up to 40% off everything.',
  'Quick poll: which feature should we build next?',
  'Throwback to our team offsite last summer.',
  'New blog post: the future of social media scheduling.',
  'Thank you for 10k followers! You are amazing.',
  'Join our live Q&A session tomorrow at 5pm.',
  'Product tip: schedule posts in bulk to save time.',
  'Happy holidays from all of us!',
  'Sneak peek of our upcoming redesign.',
  'Reminder: webinar starts in one hour.',
  'Meet the team: say hello to our newest designer.',
  'Our top 3 learnings from this quarter.',
  'Giveaway time! Follow and share to enter.',
  'Release notes: v2.4 is out with dark mode.',
];
const ERRORS = [
  'Rate limit exceeded. Please try again later.',
  'Media upload failed: unsupported file format.',
  'Account token expired. Reconnect your account.',
  'Platform API temporarily unavailable.',
];

const POST_COUNT = 36;
const SAMPLE_IMAGE_COUNT = 6;
const HOUR = 3_600_000;
const DAY = 24 * HOUR;

/**
 * Posts spread from yesterday to ten days ahead, relative to `now`, so the Today and Tomorrow
 * groups always have data. Images are bundled in public/samples, so they work offline.
 */
export function createSeedPosts(now = Date.now()): Post[] {
  const startOfTodayUtc = new Date(now);
  startOfTodayUtc.setUTCHours(0, 0, 0, 0);

  return Array.from({ length: POST_COUNT }, (_, index) => {
    const dayOffset = Math.floor(index / 3) - 1;
    const scheduledAt = new Date(
      startOfTodayUtc.getTime() +
        dayOffset * DAY +
        (8 + ((index * 5) % 12)) * HOUR +
        (index % 4) * 15 * 60_000,
    );
    const isPast = scheduledAt.getTime() < now;
    const status = isPast ? (index % 2 === 0 ? 'failed' : 'published') : 'scheduled';
    const platforms = Array.from(
      { length: (index % 4) + 1 },
      (_, offset) => PLATFORMS[(index + offset) % PLATFORMS.length],
    );

    return {
      id: String(index + 1),
      content: CONTENTS[index % CONTENTS.length],
      platforms,
      scheduledAt: scheduledAt.toISOString(),
      status,
      ...(index % 3 !== 2 && {
        mediaUrl: `${window.location.origin}${import.meta.env.BASE_URL}samples/post-${(index % SAMPLE_IMAGE_COUNT) + 1}.svg`,
      }),
      ...(status === 'failed' && { errorMessage: ERRORS[index % ERRORS.length] }),
    };
  });
}
