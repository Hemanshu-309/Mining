import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
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
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userData', JSON.stringify(userData));
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
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

    // dotenv.config('full-version\.env');

    const baseUrl = process.env.REACT_APP_BASE_URL;

    console.log(baseUrl);

    useEffect(() => {
        const init = async () => {
            try {
                const refreshToken = window.localStorage.getItem('refreshToken');
                const userData = window.localStorage.getItem('userData');
                const accessToken = window.localStorage.getItem('accessToken');
                if (refreshToken && verifyToken(refreshToken)) {
                    // const response = await axios.post('http://10.201.1.198:8000/users/loginUser');
                    // const { userData } = response.data.data;
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
            const response = await axios.post('http://10.201.1.198:8000/users/loginUser', { email, password });
            console.log(email, password);
            console.log(response.data.data);
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
        } catch (e) {
            console.log(e);
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
        const response = await axios.post('http://10.201.1.198:8000/users/addUser', {
            firstname,
            lastname,
            email,
            username,
            password,
            mobile,
            code,
            role
        });
        console.log(response.data);
        let users = response.data;

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            console.log(localUsers);
            users = [
                ...JSON.parse(localUsers),
                {
                    email,
                    password,
                    firstname,
                    lastname,
                    username,
                    mobile,
                    code,
                    role
                }
            ];
        }

        window.localStorage.setItem('users', JSON.stringify(users));
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
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
