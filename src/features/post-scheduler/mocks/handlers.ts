import { delay, http, HttpResponse } from 'msw';
import type { Post } from '../types/post';
import { countPosts, listPosts } from './query';
import { addPost, getPost, getPosts, removePost, updatePost } from './store';

// A short delay makes loading states visible, like a real network would.
const LATENCY_MS = 250;

const notFound = () => HttpResponse.json({ error: 'Not Found' }, { status: 404 });
const badBody = () => HttpResponse.json({ error: 'Body must be a JSON object' }, { status: 400 });

async function readBody(request: Request) {
  try {
    const body: unknown = await request.json();
    const isObject = typeof body === 'object' && body !== null && !Array.isArray(body);
    return isObject ? (body as Record<string, unknown>) : undefined;
  } catch {
    return undefined;
  }
}

/** The API described in docs/API_CONTRACT.md, answered in the browser. */
export const handlers = [
  http.get('*/api/posts', async ({ request }) => {
    await delay(LATENCY_MS);
    return HttpResponse.json(listPosts(getPosts(), new URL(request.url).searchParams));
  }),

  // Registered before `:id` so "stats" is not read as a post id.
  http.get('*/api/posts/stats', async () => {
    await delay(LATENCY_MS);
    return HttpResponse.json(countPosts(getPosts()));
  }),

  http.get('*/api/posts/:id', async ({ params }) => {
    await delay(LATENCY_MS);
    const post = getPost(String(params.id));
    return post ? HttpResponse.json(post) : notFound();
  }),

  http.post('*/api/posts', async ({ request }) => {
    await delay(LATENCY_MS);
    const body = await readBody(request);
    if (!body) return badBody();

    const { id: _ignored, ...data } = body;
    return HttpResponse.json(addPost(data as Omit<Post, 'id'>), { status: 201 });
  }),

  http.patch('*/api/posts/:id', async ({ request, params }) => {
    await delay(LATENCY_MS);
    const body = await readBody(request);
    if (!body) return badBody();

    const updated = updatePost(String(params.id), body as Partial<Post>);
    return updated ? HttpResponse.json(updated) : notFound();
  }),

  http.delete('*/api/posts/:id', async ({ params }) => {
    await delay(LATENCY_MS);
    const removed = removePost(String(params.id));
    return removed ? HttpResponse.json(removed) : notFound();
  }),
];
