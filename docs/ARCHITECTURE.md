# Architecture

How the app is put together, for anyone reading or extending the code. If you only have a minute, read [the overview](#overview) and [the data flow](#data-flow).

## Overview

- A single-page React app with three screens: the **post queue**, the **create post** screen and the **edit post** screen, all inside one layout (sidebar plus content).
- **Server state** (posts and stats) is owned by TanStack Query. There is no global client store; the little client state that exists (open dialogs, the selected post) stays in the component that needs it.
- **Filters live in the URL**, not in component state, so they survive a refresh and can be shared.
- **A thin API layer** (axios plus a few functions) talks to a mock API that runs in the browser (MSW). Nothing else in the app knows about HTTP.
- **Screens are thin.** A screen composes components and gets everything it needs from a hook next to it.

```
Screen (.tsx)  ──uses──▶  screen hook (.hooks.ts)  ──uses──▶  query hooks (hooks/index.ts)
                                                                  │
Components (.tsx) ◀── props ──┘                                   ▼
                                                    API functions (api/index.ts)  ──▶  axios ──▶ MSW mock in the browser
```

## Routes

Defined in [src/app.tsx](../src/app.tsx).

| Route             | Screen       | Notes                                                |
| ----------------- | ------------ | ---------------------------------------------------- |
| `/`               | `PostHome`   | Redirects to `/posts/create`                         |
| `/posts`          | `PostList`   | The post queue (inside the layout)                   |
| `/posts/create`   | `PostCreate` | Composer (inside the layout)                         |
| `/posts/:id/edit` | `PostEdit`   | Composer prefilled from the post (inside the layout) |

The layout ([app-layout](../src/shared/components/layouts/app-layout/)) renders a sidebar with two items. "Create Post" is highlighted on the create route; "Scheduled Posts" is highlighted on the list and edit routes. Below the `md` breakpoint the sidebar becomes a drawer opened from a top bar.

## Folder structure

```
src/
  features/post-scheduler/     Code that exists only for scheduling posts
  shared/                      Code with no knowledge of posts
```

The rule for deciding where something goes: **if it mentions posts, platforms or scheduling, it belongs in the feature; if it would work in any app, it belongs in `shared`.** For example, the error state, the API simulation switch and the media-query hook are in `shared`; everything else is in the feature.

### Inside the feature

| Folder        | What lives there                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------- |
| `api/`        | The calls to the API: list, stats, get, create, update, delete and the simulated retry             |
| `mocks/`      | The in-browser mock API: MSW handlers, seed data, storage and query logic                          |
| `hooks/`      | All React Query hooks in one file (`useGetInfinitePostList`, `useCreatePost`, `useRetryPost`, ...) |
| `screens/`    | One folder per route                                                                               |
| `components/` | Grouped by area: `common`, `editor`, `list`, `preview`                                             |
| `schemas/`    | The Zod schema for the post form                                                                   |
| `constants/`  | Constants used by several components (platform limits, status colors, query keys)                  |
| `types/`      | Shared domain types (`Post`, `PostFilters`, `PostFormValues`, ...)                                 |
| `utils/`      | Helpers used by several places (day grouping, URL param parsing, post rules)                       |

### Component file convention

Every component and screen keeps its logic out of the `.tsx` file using sibling files named after it. A file is created only when there is something to put in it.

```
post-stats/
  post-stats.tsx            Markup only
  post-stats.constants.ts   Card definitions (icons, colors)
  post-stats.types.ts       Props and local types
  index.ts                  Barrel export
```

| Suffix          | Holds                                                  |
| --------------- | ------------------------------------------------------ |
| `.hooks.ts`     | State and behavior (handlers, derived values, queries) |
| `.types.ts`     | The component's props and any types only it uses       |
| `.utils.ts`     | Helper functions only this component uses              |
| `.constants.ts` | Constants and config arrays only this component uses   |

Things used by more than one component are promoted to the feature's `constants/`, `utils/` or `types/` folders. Imports that climb three or more folders use the `@/features/post-scheduler/...` alias instead of long relative paths.

### Components by area

- **`common`**: the platform icon (X, Instagram, TikTok, Facebook logos)
- **`editor`**: everything for create and edit. `PostEditor` is the shared layout (form card, live preview card, optional footer) used by both screens; `PostForm`, `PlatformSelector`, `SchedulePicker`, `PostPreviewSheet` and the edit-state components live here too
- **`list`**: the queue: `PostStats`, the filters, `PostDayGroup`, `PostListItem`, status badge, skeleton and empty state
- **`preview`**: the platform-style previews (X, Instagram, TikTok, Facebook) and their small helpers (avatar, media, highlighted hashtags)

## Data flow

### Reading posts

1. The list screen's hook (`usePostList`) reads the filters from the URL with `useSearchParams` and validates them.
2. It passes them to `useGetInfinitePostList(filters)`, which calls `getPostList` page by page.
3. `getPostList` turns the filters into query params (see [API_CONTRACT.md](API_CONTRACT.md)) and returns `{ posts, nextPage, total }`.
4. The hook joins the pages into one list and `groupPostsByDay` groups it by the user's local calendar day.
5. The screen renders the groups. An invisible marker at the end of the list loads the next page when it nears the viewport (a "Load more" button is the fallback).

Each unique filter combination has its own cache entry: the query key is `['posts', 'list', filters]`. Stats use `['posts', 'stats']` and single posts use `['posts', 'detail', id]`. All keys are in [constants/query-keys.ts](../src/features/post-scheduler/constants/query-keys.ts).

### Filters and the URL

| URL param    | Meaning                                                                                 |
| ------------ | --------------------------------------------------------------------------------------- |
| `q`          | Search text (updated after a 300ms pause in typing)                                     |
| `platform`   | Repeated for each selected platform: `?platform=x&platform=facebook`                    |
| `status`     | `scheduled`, `published` or `failed`                                                    |
| `from`, `to` | `yyyy-MM-dd` local days. No `from` means "from today"; `from=` (empty) means "any date" |

Values are validated when read, so a hand-edited or stale URL falls back to "no filter" instead of breaking the screen. Changing a filter replaces the history entry rather than adding one.

### Writing posts

All mutations are in [hooks/index.ts](../src/features/post-scheduler/hooks/index.ts) and show a toast on success and on failure.

| Mutation        | UI updates       | Afterwards                                                                   |
| --------------- | ---------------- | ---------------------------------------------------------------------------- |
| `useCreatePost` | After the server | Refreshes all post queries                                                   |
| `useUpdatePost` | After the server | Saves the result as the post's detail cache, then refreshes all post queries |
| `useDeletePost` | After the server | Removes the post's detail cache, then refreshes all post queries             |
| `useRetryPost`  | **Immediately**  | Rolls back on failure; refreshes all post queries either way                 |

**Retry in detail.** `onMutate` cancels in-flight list requests, snapshots every cached list, and sets the post to `scheduled` in all of them. The simulated API waits one second and fails 20% of the time. On failure the snapshot is restored and an error toast shows. On success the toast says the post was rescheduled. In both cases the queries are refreshed so the UI ends up matching the server.

**Cache revalidation.** Every mutation calls `invalidateQueries({ queryKey: ['posts'] })`, which marks lists, stats and details as stale. Queries on screen refetch immediately; others refetch the next time they are used. An infinite list refetches all the pages it has loaded. No `staleTime` is set, so data counts as stale as soon as it arrives.

## Forms

The composer uses **React Hook Form** with a **Zod** schema ([schemas/post-form.ts](../src/features/post-scheduler/schemas/post-form.ts)) and shadcn's `Field` components.

- The form is created by the screen (`usePostCreate`, `usePostEditForm`) and passed to `PostEditor`, so the preview card can watch the same form values the form edits.
- Validation runs as you type. The schema checks: content is not blank, the media URL (if any) is a valid `http(s)` URL, at least one platform is selected, the scheduled time is set and in the future, and content fits **every** selected platform's limit.
- The limit rule lives in the schema (`superRefine`) and in the Schedule button's disabled state, both reading from the same `getLimitStatuses` helper. Counts are shown live on each platform card.
- Because the content limit depends on the selected platforms, changing platforms re-validates the content field.
- Create and edit share the form. Edit differs only in its default values, its button labels and what Reset restores (the saved post instead of an empty form).

## Time zones

- `scheduledAt` is always an **ISO 8601 UTC string**. The form works with a local `Date`; it is converted with `toISOString()` only when saving.
- Display always goes through `new Date(isoString)` and date-fns formatting, which uses the browser's time zone.
- "Day" grouping and the date filter use the user's **local** calendar days. The date filter converts the chosen local days to UTC start and end instants before querying.

## Post rules

[utils/post-rules.ts](../src/features/post-scheduler/utils/post-rules.ts) holds `getPostLockReason`: a post is **locked** (cannot be edited or deleted) when it is published or its scheduled time has passed. The list hides the edit and delete buttons for locked posts, and the edit screen shows an explanation instead of the form. Failed posts are always in the past, so they can only be retried.

## UI building blocks

- **shadcn/ui** components live in `src/shared/components/ui` and are used as generated.
- **Platform previews** are separate components that imitate each platform's post layout. `SocialMediaPostPreview` renders one per selected platform inside a scroll area. On wide screens the preview sits in a side card; on smaller screens it opens in a bottom sheet (`PostPreviewSheet`).
- **Loading, empty and error states** each have a dedicated component, so every screen handles all three.
- **Responsive behavior** relies on Tailwind breakpoints, plus a container query on the filter row so it reacts to the width of the list column rather than the screen.

## Mock API

The API runs inside the browser with [MSW](https://mswjs.io), so the app needs no backend, works offline and deploys as a static site.

- **Startup:** [`main.tsx`](../src/main.tsx) starts the mock service worker before rendering. The mock code is loaded with a dynamic import, so it is a separate chunk. The worker script is [`public/mockServiceWorker.js`](../public/mockServiceWorker.js), generated by `npx msw init public/`.
- **Requests:** the axios client uses the base path `/api`, and the handlers in [`mocks/handlers.ts`](../src/features/post-scheduler/mocks/handlers.ts) answer `GET`, `POST`, `PATCH` and `DELETE` exactly as described in [API_CONTRACT.md](API_CONTRACT.md), with a short artificial delay (250ms) so loading states are visible.
- **Filtering, sorting and paging:** [`mocks/query.ts`](../src/features/post-scheduler/mocks/query.ts) filters by status, search text, platforms and date range, sorts by `scheduledAt`, paginates, and computes the status counts.
- **Data:** [`mocks/seed.ts`](../src/features/post-scheduler/mocks/seed.ts) generates 36 posts from yesterday to ten days ahead. [`mocks/store.ts`](../src/features/post-scheduler/mocks/store.ts) keeps them in `localStorage`, so changes survive a refresh. Data seeded on an earlier day is replaced on the next visit, which keeps Today and Tomorrow populated.
- **Offline:** requests never leave the browser, and the TanStack Query client is set to `networkMode: 'always'`, because by default it pauses fetching while the device is offline. The sample images are static files in `public/samples`.

## Development tools

Two panels exist only for development and are gated by `import.meta.env.DEV`:

- `QuickFillPanel` (feature, `components/editor`): fills the form with test posts, including exact-limit and over-limit lengths
- `ApiSimulationPanel` (shared, `components/dev`): forces list requests into loading, error or empty. The switch itself is in `shared/lib/api-simulation.ts`; the API layer and the list query hooks consult it, and in production builds it always returns normal data

## Tooling

- `npm run check` runs ESLint, the TypeScript check and Prettier. ESLint auto-removes unused imports (`eslint-plugin-unused-imports`), and the VS Code settings run ESLint fixes on save.
- Path alias: `@/` points to `src/`.
