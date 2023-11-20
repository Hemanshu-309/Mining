import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useTheme } from '@emotion/react';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';
// import get from './index';

// material-ui
import {
    Alert,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Slide,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import axios from 'axios';
import { Box } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// import { Snackbar, Alert } from '@mui/material';

// animation
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

// ==============================|| TRIP ADD DIALOG ||============================== //

const UserAdd = ({ open, handleCloseDialog, setOpen, getTrip }) => {
    const token = localStorage.getItem('accessToken');

    const url = process.env.REACT_APP_HOST_URL;
    const theme = useTheme();

    const [progress, setProgress] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    // const [status, setStatus] = useState();
    const [snackmode, setSnackMode] = useState('');
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        password: '',
        username: '',
        mineno: '',
        email: '',
        mobile: ''
    });
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [checked, setChecked] = useState(true);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationSchema = Yup.object({
        firstname: Yup.string().max(255).required('First Name is required'),
        lastname: Yup.string().max(255).required('Last Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        username: Yup.string().max(255).required('Username is required'),
        password: Yup.string()
            .max(255)
            .required('Password is required')
            .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/, 'Is not in correct format'),

        mobile: Yup.string()
            .max(255)
            .required('Mobile Number is required')
            .matches(/^([+]\d{2})?\d{10}$/, 'please enter valid mobile number'),
        mineno: Yup.string().required('Mineno is required')
    });

    const validateField = async (name, value) => {
        try {
            await Yup.reach(validationSchema, name).validate(value);
            setError((prevErrors) => ({
                ...prevErrors,
                [name]: ''
            }));
        } catch (validationError) {
            setError((prevErrors) => ({
                ...prevErrors,
                [name]: validationError.message
            }));
        }
    };
    const progressRef = useRef(() => {});
    // useEffect(() => {
    //     progressRef.current = () => {
    //         if (progress > 100) {
    //             setProgress(0);
    //         } else {
    //             const diff = Math.random() * 10;
    //             setProgress(progress + diff);
    //         }
    //     };
    // });

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         progressRef.current();
    //     }, 500);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

    const handleChange = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ [name]: value });
        await validateField(name, value);
    };

    const handleSubmit = async () => {
        console.log(user);
        try {
            const response = await axios.post(`${url}/user/adduser`, user, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `b ${token}`
                }
            });
            console.log(response);

            if (!response.data.error) {
                setUser({
                    trip_type: ''
                });
                setSnackbarMessage('Trip created successfully!');
                // alert('Trip created successfully!!!!!!!');
                setOpenSnackbar(true);
                setSnackMode('success');
                getTrip();
                // setOpen(false);
                handleCloseDialog();
            } else {
                setSnackbarMessage(`${response.data.message}`);
                setOpenSnackbar(true);
                setSnackMode('warning');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackmode === 'success' ? 'success' : 'warning'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                sx={{
                    '&>div:nth-of-type(3)': {
                        justifyContent: 'flex-end',
                        '&>div': {
                            m: 0,
                            borderRadius: '0px',
                            maxWidth: 450,
                            maxHeight: '100%'
                        }
                    }
                }}
            >
                {open && (
                    <>
                        <DialogTitle>Add user</DialogTitle>
                        <DialogContent>
                            <Grid container style={{ width: '400px' }} spacing={2} sx={{ mt: 0.25 }}>
                                <Grid item lg={6}>
                                    <TextField
                                        required
                                        id="outlined-basic1"
                                        value={user.firstname}
                                        name="firstname"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        fullWidth
                                        label="Firstname"
                                        inputProps={{ inputMode: 'text', pattern: '[a-z]' }}
                                        error={Boolean(error.firstname)}
                                        helperText={error.firstname}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        id="outlined-basic1"
                                        value={user.lastname}
                                        name="lastname"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        fullWidth
                                        label="Lastname"
                                        inputProps={{ inputMode: 'text', pattern: '[a-z]' }}
                                        error={Boolean(error.lastname)}
                                        helperText={error.lastname}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-basic1"
                                        value={user.username}
                                        name="username"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        fullWidth
                                        label="Username"
                                        inputProps={{ inputMode: 'text', pattern: '[a-z]' }}
                                        error={Boolean(error.username)}
                                        helperText={error.username}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-basic1"
                                        value={user.email}
                                        name="email"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        fullWidth
                                        label="Email"
                                        inputProps={{ inputMode: 'text', pattern: '[a-z]' }}
                                        error={Boolean(error.email)}
                                        helperText={error.email}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleSubmit}>
                                    Create
                                </Button>
                            </AnimateButton>
                            {/* <Button variant="text" color="error" onClick={handleCloseDialog}>
                                Close
                            </Button> */}
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
};

UserAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    setOpen: PropTypes.func,
    getTrip: PropTypes.func
};

export default UserAdd;
