import { AlertCircle } from 'lucide-react';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/empty';
import type { ErrorStateProps } from './error-state.types';

export function ErrorState({ title, description, children }: ErrorStateProps) {
  return (
    <Empty role="alert" className="rounded-xl border bg-card">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-red-50 text-red-600">
          <AlertCircle />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children && <EmptyContent className="flex-row justify-center">{children}</EmptyContent>}
    </Empty>
  );
}
