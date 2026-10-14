import { startOfToday } from 'date-fns';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useSearchParams } from 'react-router';
import { useMediaQuery } from '@/shared/hooks/use-media-query';
import { ALL_FILTER, SEARCH_DEBOUNCE_MS } from '../../constants/post-list';
import { useGetInfinitePostList, useGetPostStats } from '../../hooks';
import type { Platform, PostFilters } from '../../types/post';
import {
  formatDateParam,
  parseDateParam,
  parsePlatformParams,
  parseStatusParam,
} from '../../utils/filter-params';
import { groupPostsByDay } from '../../utils/post-grouping';
import { LOAD_MORE_MARGIN, WIDE_SCREEN_QUERY } from './post-list.constants';

export function usePostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const platforms = parsePlatformParams(searchParams.getAll('platform'));
  const status = parseStatusParam(searchParams.get('status'));

  // "from" defaults to today when absent from the URL; an empty `from=` means "any date".
  const isDefaultDateRange = !searchParams.has('from') && !searchParams.has('to');
  const from = isDefaultDateRange ? startOfToday() : parseDateParam(searchParams.get('from'));
  const to = parseDateParam(searchParams.get('to'));
  const dateRange: DateRange | undefined = from || to ? { from, to } : undefined;

  const [searchInput, setSearchInput] = useState(query);
  const [selectedId, setSelectedId] = useState<string>();
  const [isPreviewSheetOpen, setIsPreviewSheetOpen] = useState(false);
  const isWideScreen = useMediaQuery(WIDE_SCREEN_QUERY);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filters: PostFilters = {
    platforms,
    status,
    search: query || undefined,
    from: from && formatDateParam(from),
    to: to && formatDateParam(to),
  };
  const postsQuery = useGetInfinitePostList(filters);
  const statsQuery = useGetPostStats();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = postsQuery;

  const posts = useMemo(() => data?.pages.flatMap((page) => page.posts) ?? [], [data]);
  const groups = useMemo(() => groupPostsByDay(posts), [posts]);
  const selectedPost = posts.find((post) => post.id === selectedId);
  const total = data?.pages[0]?.total ?? 0;
  const hasFilters = Boolean(query || platforms.length || status || !isDefaultDateRange);

  // Keep the search query in the URL (debounced) so it survives a refresh.
  useEffect(() => {
    if (searchInput === query) return;

    const timeout = setTimeout(() => {
      setSearchParams(
        (params) => {
          if (searchInput) params.set('q', searchInput);
          else params.delete('q');
          return params;
        },
        { replace: true },
      );
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [searchInput, query, setSearchParams]);

  // Infinite scroll: load the next page when the end-of-list marker comes near the viewport.
  useEffect(() => {
    const marker = loadMoreRef.current;
    if (!marker || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void fetchNextPage();
      },
      { rootMargin: LOAD_MORE_MARGIN },
    );
    observer.observe(marker);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  function setFilterParam(key: 'status', value: string) {
    setSearchParams(
      (params) => {
        if (value === ALL_FILTER) params.delete(key);
        else params.set(key, value);
        return params;
      },
      { replace: true },
    );
  }

  function handlePlatformsChange(next: Platform[]) {
    setSearchParams(
      (params) => {
        params.delete('platform');
        next.forEach((platform) => params.append('platform', platform));
        return params;
      },
      { replace: true },
    );
  }

  function handleStatusChange(value: string) {
    setFilterParam('status', value);
  }

  function handleDateRangeChange(range?: DateRange) {
    setSearchParams(
      (params) => {
        params.set('from', range?.from ? formatDateParam(range.from) : '');
        if (range?.to) params.set('to', formatDateParam(range.to));
        else params.delete('to');
        return params;
      },
      { replace: true },
    );
  }

  function handleClearFilters() {
    setSearchInput('');
    setSearchParams({}, { replace: true });
  }

  function handleSelectPost(id: string) {
    setSelectedId(id);
    setIsPreviewSheetOpen(true);
  }

  function handleLoadMore() {
    void fetchNextPage();
  }

  return {
    searchInput,
    setSearchInput,
    platforms,
    statusFilter: status ?? ALL_FILTER,
    dateRange,
    hasFilters,
    groups,
    posts,
    total,
    selectedPost,
    selectedId,
    handleSelectPost,
    isPreviewSheetOpen: isPreviewSheetOpen && !isWideScreen && Boolean(selectedPost),
    setIsPreviewSheetOpen,
    stats: statsQuery.data,
    isStatsLoading: statsQuery.isLoading,
    isLoading: postsQuery.isLoading,
    isError: postsQuery.isError,
    errorMessage: postsQuery.error?.message ?? 'Something went wrong.',
    refetch: postsQuery.refetch,
    hasNextPage,
    isFetchingNextPage,
    handlePlatformsChange,
    handleStatusChange,
    handleDateRangeChange,
    handleClearFilters,
    handleLoadMore,
    loadMoreRef,
  };
}
