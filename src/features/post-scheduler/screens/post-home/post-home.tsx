import { Navigate } from 'react-router';

export function PostHome() {
  return (
    <>
      <p>Post Home</p>
      <Navigate to="/posts/create" replace />
    </>
  );
}
