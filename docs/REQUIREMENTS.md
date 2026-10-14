# Social Media Post Scheduler – Frontend Assignment

## Problem Statement

Create a social media post scheduler that allows users to compose posts for multiple social media platforms, including Facebook Pages, Instagram Accounts, X Accounts, and TikTok Accounts. Users should be able to schedule posts and manage them from a single dashboard.

**Note:** This is a frontend-only assignment. Real social media integrations and user authentication are not required. All data and API calls should be mocked.

## Requirements

### 1. Mock Data

- Use mock data from a local JSON file, JSON Server, or Mock Service Worker (MSW).
- Include at least 30 posts.
- Each post must contain:
  - `id`
  - `content`
  - `platforms`
  - `mediaUrl` (optional)
  - `scheduledAt` (stored in UTC)
  - `status` (`scheduled`, `published`, or `failed`)
  - `errorMessage` (for failed posts)

### 2. Post Queue Dashboard

Display all posts in a queue grouped by day, using labels such as Today, Tomorrow, and specific dates.

Each post must display:

- Content preview
- Social media platform icons
- Scheduled time in the user's local time zone
- Post status

### 3. Filtering and Search

- Allow users to filter posts by platform and status.
- Allow users to search posts by content.
- Preserve the selected filters and search query after a page refresh using URL query parameters.

### 4. Post Composer

Create a post composer that allows users to:

- Enter post content.
- Select multiple social media platforms.
- Optionally provide an image URL.
- Select a scheduled date and time.

### 5. Platform Character Limits

Display a live character counter for each selected platform using the following limits:

| Platform  | Character Limit |
| --------- | --------------: |
| X         |             280 |
| Instagram |           2,200 |
| TikTok    |           2,200 |
| Facebook  |           5,000 |

- Update character counts as the user types.
- Prevent scheduling if the content exceeds the character limit of any selected platform.

### 6. Scheduling and Time Zones

- Ensure the scheduled date and time are in the future.
- Store scheduled times in UTC.
- Display scheduled times in the user's local time zone.

### 7. Retry Failed Posts

- Allow users to retry failed posts.
- Update the UI immediately when a retry is initiated.
- Simulate an API call with a 1-second delay.
- Make the simulated retry fail 20% of the time.
- If the retry fails, roll back the UI update and display an error message.

### 8. Loading, Empty, and Error States

- Implement appropriate loading states.
- Display helpful messages when no posts match the selected filters or search query.
- Handle and display errors appropriately.

### 9. Responsive Design

- Ensure the application works well on both mobile and desktop devices.
- Provide a responsive and user-friendly interface for the dashboard, filters, queue, and post composer.
