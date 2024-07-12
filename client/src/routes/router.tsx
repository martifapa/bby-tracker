import Logs from './Logs';
import ErrorPage from './ErrorPage';
import Root from './Root';
import PairDevice from './navigationBar/PairDevice';
import Settings from './navigationBar/Settings';
import UsefulLinks from './navigationBar/UsefulLinks';
import About from './navigationBar/About';
import Contact from './navigationBar/Contact';
import Donate from './navigationBar/Donate';
import Home from './Home';

import { createBrowserRouter } from 'react-router-dom';


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
        },
        {
          path: 'pair-device',
          element: <PairDevice />
        },
        {
          path: 'settings',
          element: <Settings />
        },
        {
          path: 'useful-links',
          element: <UsefulLinks />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: 'donate',
          element: <Donate />
        }
      ]
    },
  ]);


export default router;