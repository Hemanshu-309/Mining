// project imports
import pages from './pages';
import admin from './admin';
import dashboard from './dashboard';
import user from './user';

// import { useSelector } from 'react-redux';
// import { useState } from 'react';

// ==============================|| MENU ITEMS ||============================== //
let items = [];

const modualsVerification = () => {
    const userData = localStorage.getItem('userData');
    const userinfo = JSON.parse(userData);

    try {
        if (userinfo != null) {
            const roleNumber = userinfo.role;
            const role = roleNumber.toString();
            const adminItems = [admin, dashboard, pages];
            const userItems = [user, pages];

            items = role === '1' ? adminItems : userItems;
            // window.location.reload();
        } else {
            items = [];
        }
    } catch (e) {
        console.log(e);
    }

    return items;
};

const menuItems = {
    items: modualsVerification()
};

// window.location.reload();

export default menuItems;
