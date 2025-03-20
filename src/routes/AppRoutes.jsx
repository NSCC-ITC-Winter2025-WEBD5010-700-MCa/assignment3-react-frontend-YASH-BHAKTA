import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import UserRoles from '../pages/UserRoles';
import UserManagement from '../pages/UserManagement';
import Dashboard from '../pages/Dashboard';
import AutoResponse from '../pages/AutoResponse';
import Customers from '../pages/Customers';
import Subscriptions from '../pages/Subscriptions';
import Books from '../pages/Books';
import Cars from '../pages/Cars';
import CarsCreate from '../components/cars/CarsCreate'
import CarsEdit from '../components/cars/CarsEdit';

import BookCreate from '../components/books/BookCreate'
import BookEdit from '../components/books/BookEdit';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Dashboard />,
      },
      {
        path: 'user-roles',
        element: <UserRoles />,
      },
      {
        path: 'user-management',
        element: <UserManagement />,
      },
      {
        path: 'auto-response',
        element: <AutoResponse />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'subscriptions',
        element: <Subscriptions />,
      },

      {
        path: 'books',
        element: <Books />,
        children: [
          {
            path: 'create',
            element: <BookCreate />
          },
          {
            path: ':id/edit',
            element: <BookEdit />
          }
        ]
      },
      {
        path: 'cars',
        element: <Cars />,
        children: [
          {
            path: 'create',
            element: <CarsCreate />
          },
          {
            path: ':_id/edit',
            element: <CarsEdit />
          }
        ]
      }


    ],
  },
]);

export default router;
