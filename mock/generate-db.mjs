// Generates mock/db.json with posts spread around the current date,
// so "Today" / "Tomorrow" groups always have data. Run: npm run mock:seed
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PLATFORMS = ['facebook', 'instagram', 'x', 'tiktok'];
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

const HOUR = 3600_000;
const DAY = 24 * HOUR;
const now = Date.now();
const startOfTodayUtc = new Date(now);
startOfTodayUtc.setUTCHours(0, 0, 0, 0);

const posts = Array.from({ length: 36 }, (_, i) => {
  const n = i + 1;
  const dayOffset = Math.floor(i / 3) - 4; // -4 .. +7 days
  const scheduledAt = new Date(
    startOfTodayUtc.getTime() +
      dayOffset * DAY +
      (8 + ((i * 5) % 12)) * HOUR +
      (i % 4) * 15 * 60_000,
  );
  const past = scheduledAt.getTime() < now;
  const status = past ? (i % 3 === 0 ? 'failed' : 'published') : 'scheduled';
  const count = (i % 4) + 1;
  const platforms = Array.from({ length: count }, (_, k) => PLATFORMS[(i + k) % 4]);
  const post = {
    id: String(n),
    content: CONTENTS[i % CONTENTS.length],
    platforms,
    scheduledAt: scheduledAt.toISOString(),
    status,
  };
  if (i % 3 !== 2) post.mediaUrl = `https://picsum.photos/seed/post${n}/600/400`;
  if (status === 'failed') post.errorMessage = ERRORS[i % ERRORS.length];
  return post;
});

const out = fileURLToPath(new URL('./db.json', import.meta.url));
writeFileSync(out, JSON.stringify({ posts }, null, 2) + '\n');
console.log(`Wrote ${posts.length} posts to ${out}`);
