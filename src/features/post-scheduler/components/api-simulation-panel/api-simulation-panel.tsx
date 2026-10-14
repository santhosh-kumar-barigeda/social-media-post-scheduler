import { cn } from 'cn';
import { Wrench } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { API_SIMULATION_OPTIONS } from '../../constants/api-simulation';
import { useApiSimulation } from './api-simulation-panel.hooks';

/** Development-only: forces the post list API into loading, error, empty or normal data. */
export function ApiSimulationPanel() {
  const { mode, handleModeChange } = useApiSimulation();

  return (
    <section
      aria-label="API behaviour simulation"
      className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-amber-500/60 bg-amber-50 px-4 py-3 text-sm"
    >
      <h2 className="flex items-center gap-2 font-semibold text-amber-900">
        <Wrench className="size-4" aria-hidden />
        API behaviour
        <span className="text-xs font-normal text-amber-800">(development only)</span>
      </h2>
      <div className="flex flex-wrap gap-2">
        {API_SIMULATION_OPTIONS.map((option) => (
          <Button
            key={option.mode}
            type="button"
            size="sm"
            variant="outline"
            aria-pressed={mode === option.mode}
            onClick={() => handleModeChange(option.mode)}
            className={cn('bg-white', mode === option.mode && 'border-amber-600 bg-amber-100')}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
