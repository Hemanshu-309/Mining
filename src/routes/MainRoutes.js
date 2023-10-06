import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const AdminTrip = Loadable(lazy(() => import('views/Admin/Trip/index')));
const AdminVehicle = Loadable(lazy(() => import('views/Admin/Vehicle/index')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default/index')));
const UserDailyReport = Loadable(lazy(() => import('views/User/DailyReport/index')));
const UserTripDetails = Loadable(lazy(() => import('views/User/Tripdetails/tripdetails')));
// ==============================|| MAIN ROUTING ||============================== //

const userData = localStorage.getItem('userData');

const role = userData.role_name;

console.log(role);

const AdminRoutes = [
    {
        path: '/admin/trip',
        element: <AdminTrip />
    },
    {
        path: '/admin/vehicle',
        element: <AdminVehicle />
    },

    {
        path: '/dashboard/default',
        element: <DashboardDefault />
    }
];

const UserRoutes = [
    {
        path: '/user/dailyreport',
        element: <UserDailyReport />
    },
    {
        path: '/user/tripdetails',
        element: <UserTripDetails />
    },
    {
        path: '/dashboard/default',
        element: <DashboardDefault />
    }
];

const Routes = role === 'admin' ? AdminRoutes : UserRoutes;

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: Routes
};

export default MainRoutes;
