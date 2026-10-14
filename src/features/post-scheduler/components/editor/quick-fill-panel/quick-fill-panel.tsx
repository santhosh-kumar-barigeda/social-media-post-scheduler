import { FlaskConical } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  QUICK_FILL_CONTENT_OPTIONS,
  QUICK_FILL_PLATFORM_OPTIONS,
} from './quick-fill-panel.constants';
import { useQuickFill } from './quick-fill-panel.hooks';
import type { QuickFillPanelProps } from './quick-fill-panel.types';

/** Development-only helper for filling the post form with test data. */
export function QuickFillPanel({ form }: QuickFillPanelProps) {
  const {
    contentKey,
    setContentKey,
    platformKey,
    setPlatformKey,
    withMedia,
    setWithMedia,
    handleFill,
  } = useQuickFill(form);

  return (
    <section
      aria-label="Quick test fill"
      className="flex flex-col gap-3 rounded-xl border border-dashed border-amber-500/60 bg-amber-50 p-4 text-sm"
    >
      <h2 className="flex items-center gap-2 font-semibold text-amber-900">
        <FlaskConical className="size-4" aria-hidden />
        Quick test fill
        <span className="text-xs font-normal text-amber-800">(development only)</span>
      </h2>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex w-full flex-col gap-1.5 sm:w-auto">
          <Label>Content</Label>
          <Select
            value={contentKey}
            onValueChange={(value) => value && setContentKey(value)}
            items={QUICK_FILL_CONTENT_OPTIONS}
          >
            <SelectTrigger className="w-full bg-white sm:w-96">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUICK_FILL_CONTENT_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-1.5 sm:w-auto">
          <Label>Platforms</Label>
          <Select
            value={platformKey}
            onValueChange={(value) => value && setPlatformKey(value)}
            items={QUICK_FILL_PLATFORM_OPTIONS}
          >
            <SelectTrigger className="w-full bg-white sm:w-60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUICK_FILL_PLATFORM_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Label className="h-8 gap-2">
          <Checkbox checked={withMedia} onCheckedChange={setWithMedia} />
          Add media URL
        </Label>
        <Button type="button" variant="outline" onClick={handleFill} className="bg-white">
          Fill form
        </Button>
      </div>
    </section>
  );
}
