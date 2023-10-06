// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard } from '@tabler/icons';

const icons = {
    IconDashboard
};

// ==============================|| MENU ITEMS - ADMIN ||============================== //

const user = {
    id: 'user',
    title: <FormattedMessage id="User" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'dailyreport',
            title: <FormattedMessage id="DailyReport" />,
            type: 'item',
            url: '/user/dailyreport',
            icon: icons.IconTruckLoading,
            breadcrumbs: true
        },
        {
            id: 'tripdetails',
            title: <FormattedMessage id="TripDetails" />,
            type: 'item',
            url: '/user/tripdetails',
            icon: icons.IconTruck,
            breadcrumbs: true
        }
    ]
};

export default user;
