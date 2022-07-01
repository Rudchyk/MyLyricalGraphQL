import { StrictMode, Suspense, lazy } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import App from './app/app';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

const SongCreate = lazy(() => import('./pages/lib/SongCreate'));
const SongDetail = lazy(() => import('./pages/lib/SongDetail'));
const SongList = lazy(() => import('./pages/lib/SongList'));
const NoMatch = lazy(() => import('./pages/lib/NoMatch'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Navigate to="/songs" replace={true} />} />
              <Route path="songs" element={<Outlet />}>
                <Route index element={<SongList />} />
                <Route path=":id" element={<SongDetail />} />
                <Route path="new" element={<SongCreate />} />
              </Route>
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
