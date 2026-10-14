import { useParams } from 'react-router';
import { useGetPostDetail } from '../../hooks';

export function usePostEdit() {
  const { id = '' } = useParams();
  const query = useGetPostDetail(id);

  return {
    post: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.error?.message ?? 'Something went wrong.',
    refetch: query.refetch,
  };
}
