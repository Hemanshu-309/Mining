import { memo, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery } from '@mui/material';

// project imports
// import menuItem from 'menu-items';
import NavGroup from './NavGroup';
import useConfig from 'hooks/useConfig';
import { Menu } from 'menu-items/widget';

import LAYOUT_CONST from 'constant';
import { HORIZONTAL_MAX_ITEM } from 'config';
import user from 'menu-items/user';
import dashboard from 'menu-items/dashboard';
import admin from 'menu-items/admin';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const theme = useTheme();
    const { layout } = useConfig();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    // const items = [];

    console.log(admin);

    // let menuItem;

    const menuItems = () => {
        const userData = localStorage.getItem('userData');
        const userinfo = JSON.parse(userData);

        const adminItems = [dashboard, admin];
        const userItems = [user];

        console.log(userinfo.role);
        const items = userinfo.role === 'admin' ? adminItems : userItems;

        return items;
    };

    // useEffect(() => {
    //     menuItem = menuItems();
    //     console.log(menuItem);
    // }, []);

    const getMenu = Menu();
    const handlerMenuItem = () => {
        const isFound = menuItems().some((element) => {
            if (element.id === 'widget') {
                return true;
            }
            return false;
        });

        if (getMenu?.id !== undefined && !isFound) {
            menuItems().splice(1, 0, getMenu);
        }
    };

    useEffect(() => {
        handlerMenuItem();
        // eslint-disable-next-line
    }, []);

    // last menu-item to show in horizontal menu bar
    const lastItem = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd ? HORIZONTAL_MAX_ITEM : null;

    let lastItemIndex = menuItems().length - 1;
    let remItems = [];
    let lastItemId;

    if (lastItem && lastItem < menuItems().length) {
        lastItemId = menuItems()[lastItem - 1].id;
        lastItemIndex = lastItem - 1;
        remItems = menuItems()
            .slice(lastItem - 1, menuItems().length)
            .map((item) => ({
                title: item.title,
                elements: item.children
            }));
    }

    const navItems = menuItems()
        .slice(0, lastItemIndex + 1)
        .map((item) => {
            switch (item.type) {
                case 'group':
                    return <NavGroup key={item.id} item={item} lastItem={lastItem} remItems={remItems} lastItemId={lastItemId} />;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                            Menu Items Error
                        </Typography>
                    );
            }
        });

    return <>{navItems}</>;
};

export default memo(MenuList);
