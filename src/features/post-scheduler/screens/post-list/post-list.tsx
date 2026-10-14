import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ApiSimulationPanel } from '../../components/api-simulation-panel';
import { PostDayGroup } from '../../components/post-day-group';
import { PostListEmptyState } from '../../components/post-list-empty-state';
import { PostListErrorState } from '../../components/post-list-error-state';
import { PostListFilters } from '../../components/post-list-filters';
import { PostListPreviewSheet } from '../../components/post-list-preview-sheet';
import { PostListSkeleton } from '../../components/post-list-skeleton';
import { PostStats } from '../../components/post-stats';
import { SocialMediaPostPreview } from '../../components/social-media-post-preview';
import { usePostList } from './post-list.hooks';

export function PostList() {
  const {
    searchInput,
    setSearchInput,
    platforms,
    statusFilter,
    dateRange,
    hasFilters,
    groups,
    posts,
    total,
    selectedPost,
    selectedId,
    handleSelectPost,
    isPreviewSheetOpen,
    setIsPreviewSheetOpen,
    stats,
    isStatsLoading,
    isLoading,
    isError,
    errorMessage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    handlePlatformsChange,
    handleStatusChange,
    handleDateRangeChange,
    handleClearFilters,
    handleLoadMore,
    loadMoreRef,
  } = usePostList();

  function renderQueue() {
    if (isLoading) return <PostListSkeleton />;
    if (isError)
      return <PostListErrorState message={errorMessage} onRetry={() => void refetch()} />;
    if (posts.length === 0 && !hasNextPage) {
      return <PostListEmptyState hasFilters={hasFilters} onClearFilters={handleClearFilters} />;
    }

    return (
      <div className="flex flex-col gap-4">
        {groups.map((group) => (
          <PostDayGroup
            key={group.key}
            group={group}
            selectedId={selectedId}
            onSelect={handleSelectPost}
          />
        ))}
        {hasNextPage && <div ref={loadMoreRef} aria-hidden />}
        {hasNextPage && (
          <Button
            type="button"
            variant="outline"
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            className="mx-auto"
          >
            {isFetchingNextPage ? 'Loading...' : `Load more (${posts.length} of ${total})`}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="flex min-w-0 flex-col gap-6">
        {import.meta.env.DEV && <ApiSimulationPanel />}
        <header className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">Scheduled Posts</h1>
            <p className="mt-1 text-muted-foreground">
              View and manage all your scheduled social media posts.
            </p>
          </div>
        </header>
        <PostStats
          stats={stats}
          isLoading={isStatsLoading}
          activeStatus={statusFilter}
          onStatusSelect={handleStatusChange}
        />
        <PostListFilters
          search={searchInput}
          onSearchChange={setSearchInput}
          platforms={platforms}
          onPlatformsChange={handlePlatformsChange}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
        {renderQueue()}
      </div>

      <Card className="hidden xl:flex">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Post Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedPost ? (
            <SocialMediaPostPreview
              x={selectedPost.platforms.includes('x')}
              instagram={selectedPost.platforms.includes('instagram')}
              tiktok={selectedPost.platforms.includes('tiktok')}
              facebook={selectedPost.platforms.includes('facebook')}
              content={selectedPost.content}
              mediaUrl={selectedPost.mediaUrl ?? undefined}
            />
          ) : (
            <p className="text-sm text-muted-foreground">Select a post to see its preview.</p>
          )}
        </CardContent>
      </Card>
      <PostListPreviewSheet
        post={selectedPost}
        open={isPreviewSheetOpen}
        onOpenChange={setIsPreviewSheetOpen}
      />
    </div>
  );
}
