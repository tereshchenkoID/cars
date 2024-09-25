import { lazy } from 'react'
import { Navigate } from 'react-router-dom';

import { NAVIGATION, ROUTES_USER } from 'constant/config'

import ProtectedRoute from 'router/ProtectedRoute'

const Home            = lazy(() => import('pages/Home'))
const UserAccount       = lazy(() => import('pages/User/Account'))

export const generateRoutes = (auth) => {
  let accountPath = '/';
  let accountRoutes = [];
  let accountElement = null;

  if (auth) {
    accountPath = '/account';
    accountRoutes = []

    accountElement = <UserAccount />
  }
  else {
    accountElement = <Home />
  }

  const publicRoutes = [
    {
      path: NAVIGATION.home.link,
      element: <Home />,
    },
    {
      path: '*',
      element: <Navigate to={NAVIGATION.home.link} />,
    },
  ];

  if (!auth) {
    // publicRoutes.push(
    //   {
    //     path: NAVIGATION.login.link,
    //     element: <Login />,
    //   }
    // );
  }

  return [
    ...publicRoutes,
    {
      path: accountPath,
      element: (
        <ProtectedRoute>
          {accountElement}
        </ProtectedRoute>
      ),
      children: accountRoutes,
    },
  ]
}