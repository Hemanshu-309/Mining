// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard } from '@tabler/icons';

const icons = {
    IconDashboard
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
            icon: icons.IconTruckLoading,
            breadcrumbs: true
        },
        {
            id: 'vehicle',
            title: <FormattedMessage id="Vehicle" />,
            type: 'item',
            url: '/admin/Vehicle',
            icon: icons.IconTruck,
            breadcrumbs: true
        }
    ]
};

export default admin;
