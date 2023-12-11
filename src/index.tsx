import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Posts from './routes/posts';
import ErrorPage from './routes/error-page';
import SinglePostPage from './routes/single-post-page';
import Layout from './routes/layout';
import EditPostForm from './routes/edit-post-form';
import UsersList from './routes/users-list';
import UserPage from './routes/user-page';
import NotificationsList from './routes/notifications-list';
import { fetchUsers } from './redux/module/usersSlice';
import { fetchPosts } from './redux/module/postsSlice';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Posts />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/posts',
        element: <Posts />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/post/:postId',
        element: <SinglePostPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/editPost/:postId',
        element: <EditPostForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/users',
        element: <UsersList />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/user/:userId',
        element: <UserPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/notifications',
        element: <NotificationsList />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>
);
