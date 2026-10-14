import { useSyncExternalStore } from 'react';
import {
  getApiSimulationMode,
  setApiSimulationMode,
  subscribeApiSimulation,
} from '@/shared/lib/api-simulation';
import { queryClient } from '@/shared/lib/query-client';
import type { ApiSimulationMode } from '@/shared/types/api-simulation';
import type { ApiSimulationPanelProps } from './api-simulation-panel.types';

export function useApiSimulation({ resetQueryKey }: ApiSimulationPanelProps) {
  const mode = useSyncExternalStore(subscribeApiSimulation, getApiSimulationMode);

  function handleModeChange(next: ApiSimulationMode) {
    setApiSimulationMode(next);
    // Put active queries back to their initial state so they fetch again with the new mode.
    void queryClient.resetQueries({ queryKey: resetQueryKey });
  }

  return { mode, handleModeChange };
}
