import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app.tsx';

/**
 * There is no backend: the API is mocked in the browser with MSW. The mock is loaded with a
 * dynamic import so its code stays in its own chunk.
 */
async function enableMocking() {
  const { worker } = await import('./features/post-scheduler/mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass', quiet: true });
}

void enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
