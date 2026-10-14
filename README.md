# Flintzy — Social Media Post Scheduler

A frontend for composing, scheduling and managing social media posts across **X, Instagram, TikTok and Facebook** from a single dashboard.

This is a frontend-only project: there are no real social integrations and no authentication. All data comes from a local mock API ([json-server](https://github.com/typicode/json-server)).

> Built for the "Social Media Post Scheduler" frontend assignment. The original brief is in [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md).

## Features

**Post queue** (`/posts`)

- Posts grouped by day (Yesterday, Today, Tomorrow, then dates), collapsible, with infinite scroll
- Each post shows its content preview, platform icons, local-time schedule and status
- Search, multi-select platform filter, date range filter (defaults to "from today") and clickable status cards
- Every filter is kept in the URL, so filters survive a refresh and can be shared
- Retry failed posts with an optimistic update, a simulated 1s call that fails 20% of the time, and rollback on failure
- Loading skeletons, empty states and an error state with a retry button

**Composer** (`/posts/create`, `/posts/:id/edit`)

- Content, multiple platforms, optional image URL and a date/time picker
- Live character counter per selected platform (X 280, Instagram/TikTok 2,200, Facebook 5,000); scheduling is blocked if any selected platform's limit is exceeded
- Validation with React Hook Form and Zod, including "scheduled time must be in the future"
- Live, platform-style previews for each selected platform (desktop side panel, mobile bottom sheet)
- Edit screen prefilled from the post; published and past posts are locked

**Time zones**: times are stored in UTC and always shown in the user's local time zone.

**Responsive**: the sidebar becomes a drawer, filters stack and previews move into a sheet on small screens.

## Screenshots and demo

**[Watch the demo (about 90 seconds)](docs/recordings/demo.mp4)**: creating a post, filtering the queue, retrying a failed post. It was recorded in development mode, so the orange "Quick test fill" panel is the dev-only helper described below.

**Post queue**: status cards, filters, posts grouped by day and the live preview of the selected post.

![Post queue](docs/screenshots/scheduled-posts.png)

**Create post**: live character counts per platform and platform-style previews.

![Create post with content](docs/screenshots/create-post-filled.png)

![Create post, empty](docs/screenshots/create-post-unfilled.png)

## Design

The UI was designed with the help of ChatGPT-generated mockups, kept in [designs/](designs/) ([create post](designs/create-post-screen.png), [post list](designs/post-list-screen.png)). They were rough initial designs and served as the starting reference. During implementation the actual UI changed in places for a better look and feel and better usability, so the running app does not match the mockups exactly.

## Tech stack

| Area         | Choice                                                                  |
| ------------ | ----------------------------------------------------------------------- |
| Framework    | React 19, TypeScript 6                                                  |
| Build        | Vite 8                                                                  |
| Styling      | Tailwind CSS 4, shadcn/ui components (built on Base UI)                 |
| Server state | TanStack Query 5 (caching, infinite queries, optimistic updates)        |
| Forms        | React Hook Form + Zod 4                                                 |
| Routing      | React Router 8                                                          |
| HTTP         | axios                                                                   |
| Mock API     | json-server 1 (beta)                                                    |
| Dates        | date-fns                                                                |
| UI utilities | sonner (toasts), lucide-react and react-icons (icons), react-day-picker |
| Tooling      | ESLint, Prettier, `eslint-plugin-unused-imports`                        |

## Getting started

**Requirements:** Node.js 20.19+ or 22.12+ (required by Vite 8; developed on Node 24) and npm.

```bash
npm install

# 1. Generate mock data (dates are relative to today)
npm run mock:seed

# 2. Start the mock API on http://localhost:3001
npm run mock

# 3. In a second terminal, start the app
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). The home route redirects to the create-post screen.

> Run `npm run mock:seed` whenever the dates feel stale (Today/Tomorrow groups are empty) and after pulling changes. It resets any posts you created.

### Configuration

The app works with no configuration. The only setting is the API address, and it is optional:

| Variable       | Default                 | Purpose             |
| -------------- | ----------------------- | ------------------- |
| `VITE_API_URL` | `http://localhost:3001` | Base URL of the API |

Set it only if the mock API runs on another port or host: copy [.env.example](.env.example) to `.env`, change the value, and restart `npm run dev` (Vite reads it at startup). `.env` is git-ignored.

## Scripts

| Script                            | What it does                                              |
| --------------------------------- | --------------------------------------------------------- |
| `npm run dev`                     | Start the Vite dev server                                 |
| `npm run build`                   | Type-check (`tsc -b`) and build for production            |
| `npm run preview`                 | Serve the production build locally                        |
| `npm run mock`                    | Run json-server on port 3001, watching `mock/db.json`     |
| `npm run mock:seed`               | Regenerate `mock/db.json` with 36 posts around today      |
| `npm run check`                   | Lint, type check and format check (run before committing) |
| `npm run fix`                     | Auto-fix lint issues and format everything                |
| `npm run lint:check` / `lint:fix` | ESLint only                                               |
| `npm run type:check`              | TypeScript only                                           |
| `npm run format` / `format:check` | Prettier only                                             |

## Key decisions and assumptions

- **Filters live in the URL.** Search, platform, status and date range are query params, so they survive a refresh and can be shared. The date filter defaults to "from today" because a scheduler is mostly about what is coming up; choose "Any date" to see older posts.
- **All filters are applied by the API.** json-server cannot search inside the `platforms` array, so each post also stores a `platformsKey` string that the platform filter matches against. This keeps page sizes and totals exact.
- **Page-number paging with infinite scroll.** json-server supports page numbers. A production API would use cursor paging to avoid skipped or repeated posts when data changes between pages.
- **Past and published posts can't be edited or deleted.** The brief doesn't cover this. Failed posts are always in the past, so they can only be retried.
- **One shared text box, strictest limit wins.** With several platforms selected, the post must fit the smallest selected limit (for example 280 with X selected). Per-platform text overrides were left out of scope.
- **Retry is optimistic.** The row updates at once, the simulated call takes 1 second and fails 20% of the time, and a failure restores the previous state and shows an error toast. A retried post only goes back to Scheduled; there is no real publishing.
- **Previews are approximations.** The X, Instagram, TikTok and Facebook previews imitate each platform's layout using placeholder account details and counts.
- **Stat cards ignore the other filters.** They always show totals across all posts, and clicking one filters the queue by status.

## Project structure

```
src/
  app.tsx                         Routes
  features/post-scheduler/        Everything specific to scheduling posts
    api/                          CRUD calls and the list query builder
    components/                   Grouped by area: common, editor, list, preview
    constants/                    Shared constants (platforms, status styles, query keys)
    hooks/                        React Query hooks (queries and mutations)
    schemas/                      Zod schema for the post form
    screens/                      One folder per route (create, edit, list, home)
    types/                        Shared domain types
    utils/                        Shared helpers (grouping, filter params, post rules)
  shared/                         Feature-independent code
    components/                   Layout, error state, dev tools, shadcn/ui
    hooks/ lib/ types/            Media-query hook, axios and query clients, API simulation
mock/                             json-server data and the seed script
docs/                             Project documentation
designs/                          UI mockups the screens were built from
```

Each component and screen keeps its logic in sibling files named after it (`.hooks.ts`, `.types.ts`, `.utils.ts`, `.constants.ts`), created only when needed. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for details.

## Development tools

Two panels appear **only in development** (`npm run dev`) and are not part of production builds:

- **Quick test fill** (create screen): fills the form with sample posts of chosen lengths, including exactly at and just over each platform's limit
- **API behaviour** (list screen): switches the list requests between normal data, loading, error and empty so you can see each state

## Documentation

| Document                                     | Contents                                                          |
| -------------------------------------------- | ----------------------------------------------------------------- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the app is built: structure, data flow, caching, time zones   |
| [docs/API_CONTRACT.md](docs/API_CONTRACT.md) | The API contract: endpoints, data model, filtering, paging, retry |
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | The original assignment brief                                     |
