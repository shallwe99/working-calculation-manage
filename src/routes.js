import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Teacher from './pages/Teacher';
import User from './pages/User';
import Student from './pages/Student';
import NotFound from './pages/Page404';

import { useAuth } from './utils/useAuth';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: useAuth(<Navigate to="/dashboard/app" replace />) },
        { path: 'app', element: useAuth(<DashboardApp />) },
        { path: 'user', element: useAuth(<User />) },
        { path: 'products', element: useAuth(<Student />) }, // Products
        { path: 'blog', element: useAuth(<Teacher />) }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
