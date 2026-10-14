import type { ApiSimulationMode } from '@/shared/types/api-simulation';

export interface ApiSimulationOption {
  mode: ApiSimulationMode;
  label: string;
}

export interface ApiSimulationPanelProps {
  /** Queries with this key prefix are reset when the mode changes, so they fetch again */
  resetQueryKey: readonly unknown[];
}
