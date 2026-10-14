import type { ApiSimulationMode } from '@/shared/types/api-simulation';

/**
 * Development-only switch for faking how the list API behaves (loading, error, empty).
 * In production builds the mode is always `data`.
 */
export class SimulatedApiError extends Error {
  constructor() {
    super('Simulated API error (dev tool).');
    this.name = 'SimulatedApiError';
  }
}

const MAX_RETRIES = 3;

let mode: ApiSimulationMode = 'data';
const listeners = new Set<() => void>();

export function getApiSimulationMode(): ApiSimulationMode {
  return mode;
}

export function setApiSimulationMode(next: ApiSimulationMode) {
  if (!import.meta.env.DEV || next === mode) return;
  mode = next;
  listeners.forEach((listener) => listener());
}

export function subscribeApiSimulation(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Call at the start of a list request. Resolves to `'empty'` when empty results should be returned. */
export async function applyApiSimulation(): Promise<'empty' | undefined> {
  if (mode === 'loading') await new Promise<never>(() => {});
  if (mode === 'error') throw new SimulatedApiError();
  if (mode === 'empty') return 'empty';
}

/** Query retry rule: never retry simulated errors, so the error state shows immediately. */
export function shouldRetryQuery(failureCount: number, error: Error): boolean {
  return !(error instanceof SimulatedApiError) && failureCount < MAX_RETRIES;
}
