import type { ApiSimulationOption } from '../types/post';

export const API_SIMULATION_OPTIONS: ApiSimulationOption[] = [
  { mode: 'data', label: 'Data' },
  { mode: 'loading', label: 'Loading' },
  { mode: 'error', label: 'Error' },
  { mode: 'empty', label: 'Empty' },
];
