import type { Post } from '../types/post';
import { createSeedPosts } from './seed';

const STORAGE_KEY = 'flintzy.mock.posts';

interface StoredState {
  seededAt: number;
  posts: Post[];
}

let state: StoredState | undefined;

function isSameDay(a: number, b: number) {
  return new Date(a).toDateString() === new Date(b).toDateString();
}

function persist(current: StoredState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Storage can be unavailable (private mode, quota); the in-memory copy still works.
  }
}

function readStored(): StoredState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as StoredState) : undefined;
    // Seed dates are relative to "today", so data seeded on an earlier day is replaced.
    if (parsed && Array.isArray(parsed.posts) && isSameDay(parsed.seededAt, Date.now())) {
      return parsed;
    }
  } catch {
    // Unreadable or corrupt data is treated as missing.
  }
}

function load(): StoredState {
  if (state) return state;

  state = readStored() ?? { seededAt: Date.now(), posts: createSeedPosts() };
  persist(state);
  return state;
}

function createId() {
  return Math.random().toString(36).slice(2, 13);
}

export function getPosts(): Post[] {
  return load().posts;
}

export function getPost(id: string): Post | undefined {
  return load().posts.find((post) => post.id === id);
}

export function addPost(data: Omit<Post, 'id'>): Post {
  const current = load();
  const post = { ...data, id: createId() } as Post;
  current.posts.push(post);
  persist(current);
  return post;
}

export function updatePost(id: string, patch: Partial<Post>): Post | undefined {
  const current = load();
  const index = current.posts.findIndex((post) => post.id === id);
  if (index === -1) return undefined;

  const updated = { ...current.posts[index], ...patch, id };
  current.posts[index] = updated;
  persist(current);
  return updated;
}

export function removePost(id: string): Post | undefined {
  const current = load();
  const index = current.posts.findIndex((post) => post.id === id);
  if (index === -1) return undefined;

  const [removed] = current.posts.splice(index, 1);
  persist(current);
  return removed;
}
