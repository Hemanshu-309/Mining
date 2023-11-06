// project imports
import pages from './pages';
import admin from './admin';
import dashboard from './dashboard';
import user from './user';

// import { useSelector } from 'react-redux';
// import { useState } from 'react';

// ==============================|| MENU ITEMS ||============================== //
let items = [];
// eslint-disable-next-line react-hooks/rules-of-hooks
// useState(() => {
try {
    const userData = localStorage.getItem('userData');
    const userinfo = JSON.parse(userData);

    if (userinfo != null) {
        const roleNumber = userinfo.role;
        const role = roleNumber.toString();
        const adminItems = [admin, dashboard];
        const userItems = [user];

        items = role === '1' ? adminItems : userItems;
    } else {
        items = [];
    }
} catch (e) {
    console.log(e);
}
// }, [dashboard]);

const menuItems = {
    items
};

export default menuItems;
