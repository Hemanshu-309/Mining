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

    // console.log(userinfo);
    // console.log(role);
    // console.log(typeof role);

    if (userinfo != null) {
        const roleNumber = userinfo.role;
        const role = roleNumber.toString();
        const adminItems = [admin, dashboard, pages];
        const userItems = [user, pages];

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
