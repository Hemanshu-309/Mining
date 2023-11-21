// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconGlobe, IconTruck, IconUserCheck, IconReport, IconMountain } from '@tabler/icons';
// import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const icons = {
    IconDashboard,
    IconGlobe,
    IconTruck,
    IconUserCheck,
    IconReport,
    IconMountain
};

// ==============================|| MENU ITEMS - ADMIN ||============================== //

const admin = {
    id: 'admin',
    title: <FormattedMessage id="Admin" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'trips',
            title: <FormattedMessage id="Trips" />,
            type: 'item',
            url: '/admin/trip',
            icon: icons.IconGlobe,
            breadcrumbs: true
        },
        {
            id: 'vehicle',
            title: <FormattedMessage id="Vehicle" />,
            type: 'item',
            url: '/admin/Vehicle',
            icon: icons.IconTruck,
            breadcrumbs: true
        },
        {
            id: 'role',
            title: <FormattedMessage id="Roles" />,
            type: 'item',
            url: '/admin/roles',
            icon: icons.IconUserCheck,
            breadcrumbs: true
        },
        {
            id: 'users',
            title: <FormattedMessage id="Users" />,
            type: 'item',
            url: '/admin/users',
            icon: icons.IconUserCheck,
            breadcrumbs: true
        },
        {
            id: 'dailyreport',
            title: <FormattedMessage id="DailyReport" />,
            type: 'item',
            url: '/admin/dailyreport',
            icon: icons.IconReport,
            breadcrumbs: true
        },
        {
            id: 'mine',
            title: <FormattedMessage id="Mines" />,
            type: 'item',
            url: '/admin/mines',
            icon: icons.IconMountain,
            breadcrumbs: true
        },
        {
            id: 'rate',
            title: <FormattedMessage id="Rate" />,
            type: 'item',
            url: '/admin/rate',
            icon: icons.IconMountain,
            breadcrumbs: true
        }
    ]
};

export default admin;
