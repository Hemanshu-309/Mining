// project imports
import pages from './pages';
import admin from './admin';
import dashboard from './dashboard';
import user from './user';

import { useSelector } from 'react-redux';
// import { useState } from 'react';

// ==============================|| MENU ITEMS ||============================== //
// let items = [];

// const modualsVerification = () => {
// eslint-disable-next-line react-hooks/rules-of-hooks
// const isLoggedIn = useSelector((state) => {
//     // eslint-disable-next-line no-unused-expressions
//     state.accountReducer.isLoggedIn;
// });
// console.log(isLoggedIn);
// eslint-disable-next-line react-hooks/rules-of-hooks
// const menuState = useSelector((state) => state.menu);

// console.log(menuState);

//     const userData = localStorage.getItem('userData');
//     const userinfo = JSON.parse(userData);
//     try {
//         if (userinfo != null) {
//             const roleNumber = userinfo.role;
//             const role = roleNumber.toString();
//             console.log(role);
//             const adminItems = [dashboard, admin];
//             const userItems = [user];

//             items = role === 'admin' ? adminItems : userItems;
//             // window.location.reload();
//         } else {
//             items = [];
//             // window.location.reload();
//         }
//     } catch (e) {
//         console.log(e);
//         window.location.reload();
//     }
//     // window.location.reload();
//     return items;
// };

const menuItems = {
    items: [admin, user, dashboard]
};

// window.location.reload();

export default menuItems;
