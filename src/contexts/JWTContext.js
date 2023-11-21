import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import * as React from 'react';
// import dotenv from 'dotenv';

// third-party
// import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { json } from 'react-router-dom';

// const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (refreshToken) => {
    if (!refreshToken) {
        return false;
    }
    const decoded = jwtDecode(refreshToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (accessToken, refreshToken, userData) => {
    if (accessToken) {
        if (localStorage.getItem('accessToken') == null) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            // const userinfo = JSON.stringify(userData);
            localStorage.setItem('userData', JSON.stringify(userData));
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        }
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const navigate = useNavigate();

    // dotenv.config('full-version\.env');

    const url = process.env.REACT_APP_HOST_URL;



    useEffect(() => {
        const init = async () => {
            try {
                const refreshToken = window.localStorage.getItem('refreshToken');
                const userData = window.localStorage.getItem('userData');
                const accessToken = window.localStorage.getItem('accessToken');
                if (refreshToken && verifyToken(refreshToken)) {
                    setSession(accessToken, refreshToken, userData);
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            userData
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${url}/users/loginUser`, { email, password });
            console.log(email, password);
            console.log(response);
            if (!response.data.Error) {
                const { accessToken, refreshToken, userData } = response.data.data;
                console.log(accessToken, refreshToken);
                setSession(accessToken, refreshToken, userData);
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        userData
                    }
                });
            } else {
                setStatus('error');
                setOpenSnackbar(true);
                setSnackbarMessage(`${response.data.Message}`);
            }
        } catch (e) {
            console.log(e);
            setStatus('error');
            setOpenSnackbar(true);
            setSnackbarMessage('Network Problem. Please try after sometime!');
        }
    };

    const register = async (firstname, lastname, email, username, password, mobile, role, code) => {
        // todo: this flow need to be recode as it not verified
        console.log({
            Firstname: firstname,
            Lastname: lastname,
            Email: email,
            Username: username,
            Password: password,
            Mobile: mobile,
            Role: role,
            Code: code
        });
        // const id = chance.bb_pin();
        const response = await axios.post(`${url}/users/addUser`, {
            firstname,
            lastname,
            email,
            username,
            password,
            mobile,
            code,
            role
        });
        console.log(response);
        // let users = response.data;
        if (!response.data.error) {
            setStatus('success');
            setOpenSnackbar(true);
            setSnackbarMessage('Your registration has been successfully completed.');
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 1500);
        } else {
            setStatus('error');
            setOpenSnackbar(true);
            setSnackbarMessage(`${response.data.message}`);
        }

        // if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
        //     const localUsers = window.localStorage.getItem('users');
        //     // console.log(localUsers);
        //     users = [
        //         ...JSON.parse(localUsers),
        //         {
        //             email,
        //             password,
        //             firstname,
        //             lastname,
        //             username,
        //             mobile,
        //             code,
        //             role
        //         }
        //     ];
        // }

        // window.localStorage.setItem('users', JSON.stringify(users));
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
        window.location.href = '/login';
    };

    const resetPassword = (email) => console.log(email);

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={status === 'success' ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>
                {children}
            </JWTContext.Provider>
        </>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
