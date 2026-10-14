import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      return Promise.reject(
        new Error(status ? `Request failed (${status})` : 'Network error. Is the API running?'),
      );
    }
    return Promise.reject(error);
  },
);
