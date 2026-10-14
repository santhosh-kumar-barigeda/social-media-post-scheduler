import { useSyncExternalStore } from 'react';
import { queryClient } from '@/shared/lib/query-client';
import { postKeys } from '../../constants/query-keys';
import type { ApiSimulationMode } from '../../types/post';
import {
  getApiSimulationMode,
  setApiSimulationMode,
  subscribeApiSimulation,
} from '../../utils/api-simulation';

export function useApiSimulation() {
  const mode = useSyncExternalStore(subscribeApiSimulation, getApiSimulationMode);

  function handleModeChange(next: ApiSimulationMode) {
    setApiSimulationMode(next);
    // Put active queries back to their initial state so they fetch again with the new mode.
    void queryClient.resetQueries({ queryKey: postKeys.all });
  }

  return { mode, handleModeChange };
}
