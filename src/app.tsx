import { BrowserRouter, Route, Routes } from 'react-router';
import { PostCreate, PostEdit, PostHome, PostList } from '@/features/post-scheduler/screens';
import { AppLayout } from '@/shared/components/layouts/app-layout';
import { Providers } from '@/shared/components/providers';

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostHome />} />
          <Route element={<AppLayout />}>
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="/posts/:id/edit" element={<PostEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
