import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  function subscribe(onChange: () => void) {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }

  function getSnapshot() {
    return window.matchMedia(query).matches;
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
