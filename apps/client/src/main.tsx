import { StrictMode, Suspense, lazy, ReactNode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Protected } from '@client/components';
import { ClientRoutesEnum } from '@client/constants';

import App from './app/app';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

const SongCreate = lazy(() => import('./pages/lib/SongCreate'));
const SongDetail = lazy(() => import('./pages/lib/SongDetail'));
const Songs = lazy(() => import('./pages/lib/Songs'));
const SongList = lazy(() => import('./pages/lib/SongsList'));
const Login = lazy(() => import('./pages/lib/Login'));
const Signup = lazy(() => import('./pages/lib/Signup'));
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
              <Route path={ClientRoutesEnum.LOGIN} element={<Login />} />
              <Route path={ClientRoutesEnum.SIGNUP} element={<Signup />} />
              <Route
                index
                element={
                  <Navigate to={`/${ClientRoutesEnum.SONGS}`} replace={true} />
                }
              />
              <Route
                path={ClientRoutesEnum.SONGS}
                element={
                  <Protected>
                    <Songs />
                  </Protected>
                }
              >
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
