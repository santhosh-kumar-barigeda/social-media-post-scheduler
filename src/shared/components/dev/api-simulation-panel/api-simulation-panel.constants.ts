import type { ApiSimulationOption } from './api-simulation-panel.types';

export const API_SIMULATION_OPTIONS: ApiSimulationOption[] = [
  { mode: 'data', label: 'Data' },
  { mode: 'loading', label: 'Loading' },
  { mode: 'error', label: 'Error' },
  { mode: 'empty', label: 'Empty' },
];
