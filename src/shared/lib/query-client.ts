import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    // The API is mocked in the browser, so requests must run even when the device is offline
    // (by default React Query pauses fetching while `navigator.onLine` is false).
    queries: { networkMode: 'always' },
    mutations: { networkMode: 'always' },
  },
});
