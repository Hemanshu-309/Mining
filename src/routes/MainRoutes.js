import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const AdminTrip = Loadable(lazy(() => import('views/Admin/Trip/index')));
const AdminVehicle = Loadable(lazy(() => import('views/Admin/Vehicle/index')));
const AdminRoles = Loadable(lazy(() => import('views/Admin/Role/index')));
const AdminUsers = Loadable(lazy(() => import('views/Admin/Users/index')));
const AdminDailyReport = Loadable(lazy(() => import('views/Admin/DailyReport/index')));
const AdminDailyReportView = Loadable(lazy(() => import('views/Admin/DailyReport/Invoice')));
const AdminRate = Loadable(lazy(() => import('views/Admin/Rate/index')));
const AdminMine = Loadable(lazy(() => import('views/Admin/Mine/index')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default/index')));
const UserDailyReport = Loadable(lazy(() => import('views/User/DailyReport/index')));
const UserTripDetails = Loadable(lazy(() => import('views/User/Tripdetails/tripdetails')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/admin/trip',
            element: <AdminTrip />
        },
        {
            path: '/admin/vehicle',
            element: <AdminVehicle />
        },
        {
            path: '/admin/roles',
            element: <AdminRoles />
        },
        {
            path: '/admin/users',
            element: <AdminUsers />
        },
        {
            path: '/admin/dailyreport',
            element: <AdminDailyReport />
        },
        {
            path: '/admin/dailyreport/view/:id',
            element: <AdminDailyReportView />
        },
        {
            path: '/admin/mines',
            element: <AdminMine />
        },
        {
            path: '/admin/rate',
            element: <AdminRate />
        },

        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/user/dailyreport',
            element: <UserDailyReport />
        },
        {
            path: '/user/tripdetails',
            element: <UserTripDetails />
        }
    ]
};

export default MainRoutes;
