import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ApplicationHome from './components/ApplicationHome';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/applications",
        element: <ApplicationHome />
      }
    ]
  }
]);

root.render(
  // <React.StrictMode>
  <RouterProvider router={appRouter} />
  // </React.StrictMode>
);