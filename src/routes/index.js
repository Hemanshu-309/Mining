import { lazy } from 'react';
import { useRoutes, Oout } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
// import AddtripRoutes from './AddtripRoutes';
import Loadable from 'ui-component/Loadable';

// const PagesLanding = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const LoginPage = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([{ path: '/', element: <LoginPage /> }, AuthenticationRoutes, LoginRoutes, MainRoutes]);
}
