import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthForgotPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));
const AuthCheckMail3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/CheckMail3')));
const AuthResetPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword3')));
const AuthCodeVerification3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/CodeVerification3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        },
        {
            path: '/pages/forgot-password/forgot-password3',
            element: <AuthForgotPassword3 />
        },
        {
            path: '/pages/check-mail/check-mail3/:email',
            element: <AuthCheckMail3 />
        },
        {
            path: '/pages/reset-password/reset-password3',
            element: <AuthResetPassword3 />
        },
        {
            path: '/pages/code-verification/code-verification3',
            element: <AuthCodeVerification3 />
        }
    ]
};

export default AuthenticationRoutes;
