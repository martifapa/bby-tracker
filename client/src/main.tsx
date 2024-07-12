import ReactDOM from 'react-dom/client';
import Home from './routes/Home';
import { Provider } from 'react-redux';
import store from './store';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Logs from './routes/Logs';
import ErrorPage from './routes/ErrorPage';
import Root from './routes/Root';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'logs',
        element: <Logs />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);