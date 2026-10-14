import { CheckCircle2, Clock } from 'lucide-react';

export const CONTENT = {
  published: {
    icon: CheckCircle2,
    iconClassName: 'bg-indigo-50 text-indigo-600',
    title: 'This post is already published',
    description: "Published posts can't be edited.",
  },
  past: {
    icon: Clock,
    iconClassName: 'bg-amber-50 text-amber-600',
    title: "This post's scheduled time has passed",
    description: "Posts can't be edited once their scheduled time has passed.",
  },
};
