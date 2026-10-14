import type { Post, PostListResponse, PostStats } from '../types/post';

const DEFAULT_PER_PAGE = 10;

function toPositiveInt(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isNaN(parsed) || parsed < 1 ? fallback : parsed;
}

/**
 * Implements `GET /posts`: filters (status, q, platform, from, to), ascending order by
 * `scheduledAt`, and pagination. See docs/API_CONTRACT.md.
 */
export function listPosts(posts: Post[], params: URLSearchParams): PostListResponse {
  const status = params.get('status');
  const search = params.get('q')?.toLowerCase();
  const platforms = params.getAll('platform');
  const from = params.get('from');
  const to = params.get('to');

  // scheduledAt is always a UTC ISO string, so comparing and sorting it as text is date order.
  const matches = posts
    .filter((post) => !status || post.status === status)
    .filter((post) => !search || post.content.toLowerCase().includes(search))
    .filter((post) => platforms.length === 0 || post.platforms.some((p) => platforms.includes(p)))
    .filter((post) => !from || post.scheduledAt >= from)
    .filter((post) => !to || post.scheduledAt <= to)
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));

  const perPage = toPositiveInt(params.get('perPage'), DEFAULT_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(matches.length / perPage));
  const page = Math.min(toPositiveInt(params.get('page'), 1), totalPages);

  return {
    data: matches.slice((page - 1) * perPage, page * perPage),
    page,
    perPage,
    total: matches.length,
    totalPages,
    nextPage: page < totalPages ? page + 1 : null,
  };
}

/** Implements `GET /posts/stats`. */
export function countPosts(posts: Post[]): PostStats {
  const count = (status: Post['status']) => posts.filter((post) => post.status === status).length;

  return {
    total: posts.length,
    scheduled: count('scheduled'),
    published: count('published'),
    failed: count('failed'),
  };
}
