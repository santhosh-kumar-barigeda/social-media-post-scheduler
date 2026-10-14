import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryClient } from '@/shared/lib/query-client';
import {
  createPost,
  deletePost,
  getPost,
  getPostList,
  getPostStats,
  retryPost,
  updatePost,
} from '../api';
import { postKeys } from '../constants/query-keys';
import type { PostFilters, PostListData, UpdatePostVariables } from '../types/post';
import { shouldRetryQuery } from '@/shared/lib/api-simulation';

export function useGetInfinitePostList(filters: PostFilters = {}) {
  return useInfiniteQuery({
    queryKey: postKeys.list(filters),
    queryFn: ({ pageParam }) => getPostList({ page: pageParam, filters }),
    retry: shouldRetryQuery,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
}

export function useGetPostStats() {
  return useQuery({ queryKey: postKeys.stats(), queryFn: getPostStats, retry: shouldRetryQuery });
}

export function useGetPostDetail(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPost(id),
    enabled: Boolean(id),
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success('Post scheduled successfully');
      return queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
    onError: (error) => toast.error(error.message || 'Failed to schedule post'),
  });
}

export function useUpdatePost() {
  return useMutation({
    mutationFn: ({ id, input }: UpdatePostVariables) => updatePost(id, input),
    onSuccess: (post) => {
      toast.success('Post updated successfully');
      queryClient.setQueryData(postKeys.detail(post.id), post);
      return queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
    onError: (error) => toast.error(error.message || 'Failed to update post'),
  });
}

export function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, id) => {
      toast.success('Post deleted successfully');
      queryClient.removeQueries({ queryKey: postKeys.detail(id) });
      return queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
    onError: (error) => toast.error(error.message || 'Failed to delete post'),
  });
}

/**
 * Optimistically marks the post as scheduled in every cached list, then rolls
 * the lists back to their previous state if the simulated retry fails.
 */
export function useRetryPost() {
  return useMutation({
    mutationFn: retryPost,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      const previousLists = queryClient.getQueriesData<PostListData>({
        queryKey: postKeys.lists(),
      });

      queryClient.setQueriesData<PostListData>(
        { queryKey: postKeys.lists() },
        (data) =>
          data && {
            ...data,
            pages: data.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post) =>
                post.id === id ? { ...post, status: 'scheduled', errorMessage: null } : post,
              ),
            })),
          },
      );

      return { previousLists };
    },
    onSuccess: () => toast.success('Post rescheduled successfully'),
    onError: (error, _id, context) => {
      toast.error(error.message || 'Retry failed');
      context?.previousLists.forEach(([queryKey, data]) =>
        queryClient.setQueryData(queryKey, data),
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: postKeys.all }),
  });
}
