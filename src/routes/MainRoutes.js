import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const AdminTrip = Loadable(lazy(() => import('views/Admin/Trip/index')));
const AdminVehicle = Loadable(lazy(() => import('views/Admin/Vehicle/index')));
const AdminContractor = Loadable(lazy(() => import('views/Admin/Contractor/index')));
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
            path: '/admin/contractor',
            element: <AdminContractor />
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
