import { Navigate, useRoutes } from 'react-router-dom';
import AuthPage from './auth/AuthPage';
import ExamplesPage from './examples/ExamplesPage';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={'/examples'} />,
    },
    {
      path: 'examples',
      element: <ExamplesPage />,
    },
    {
      path: 'auth',
      element: <AuthPage />,
    },
  ]);
}
