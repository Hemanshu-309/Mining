import React, { useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
// import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ========================|| FIREBASE - RESET PASSWORD ||======================== //

const AuthResetPassword = ({ ...others }) => {
    const theme = useTheme();
    // const scriptedRef = useScriptRef();
    const [showPassword, setShowPassword] = React.useState(false);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackmode, setSnackMode] = React.useState('');

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };
    const queryParams = new URLSearchParams(window.location.search);

    const token = queryParams.get('token');

    return (
        <Formik
            initialValues={{
                token,
                newPassword: '',
                confirmPassword: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                newPassword: Yup.string().max(255).required('Password is required'),
                confirmPassword: Yup.string().when('password', {
                    is: (val) => !!(val && val.length > 0),
                    then: Yup.string().oneOf([Yup.ref('password')], 'Both Password must be match!')
                })
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    const response = await axios.post('http://10.201.1.198:8000/users/resetPassword', values);
                    console.log(response);

                    if (!response.data.error) {
                        setSnackbarMessage('Password Reset Successfully');
                        setOpenSnackbar(true);
                        setSnackMode('success');
                        setStatus({ success: true });
                        setSubmitting(false);
                        setTimeout(() => {
                            navigate('/login', { replace: true });
                        }, 3000);
                    } else {
                        setSnackbarMessage(`${response.data.message}`);
                        setOpenSnackbar(true);
                        setSnackMode('Warning');
                    }
                } catch (e) {
                    console.log(e);
                    setStatus({ success: false });
                    setErrors({ submit: e.message });
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-reset">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-reset"
                            type={showPassword ? 'text' : 'password'}
                            value={values.newPassword}
                            name="newPassword"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                handleChange(e);
                                changePassword(e.target.value);
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                        />
                    </FormControl>
                    {touched.password && errors.password && (
                        <FormControl fullWidth>
                            <FormHelperText error id="standard-weight-helper-text-reset">
                                {errors.password}
                            </FormHelperText>
                        </FormControl>
                    )}
                    {strength !== 0 && (
                        <FormControl fullWidth>
                            <Box sx={{ mb: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Box
                                            style={{ backgroundColor: level?.color }}
                                            sx={{
                                                width: 85,
                                                height: 8,
                                                borderRadius: '7px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                            {level?.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </FormControl>
                    )}

                    <FormControl
                        fullWidth
                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            type="password"
                            value={values.confirmPassword}
                            name="confirmPassword"
                            label="Confirm Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                    </FormControl>

                    {touched.confirmPassword && errors.confirmPassword && (
                        <FormControl fullWidth>
                            <FormHelperText error id="standard-weight-helper-text-confirm-password">
                                {' '}
                                {errors.confirmPassword}{' '}
                            </FormHelperText>
                        </FormControl>
                    )}

                    {errors.submit && (
                        <Box
                            sx={{
                                mt: 3
                            }}
                        >
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box
                        sx={{
                            mt: 1
                        }}
                    >
                        <AnimateButton>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                Reset Password
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default AuthResetPassword;

// const [data, setData] = useState({
//     password: ''
// });
// const [openSnackbar, setOpenSnackbar] = useState(false);
// const [snackbarMessage, setSnackbarMessage] = useState('');
// const [snackmode, setSnackMode] = useState('');

// const handleChange = () => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setData({ ...data, [name]: value });
// };

// const handleSubmit = async () => {
//     try {
//         const response = await axios.post('http://10.201.1.198:8000/users/resetPassword', data);
//         console.log(response);

//         if (!response.data.error) {
//             setSnackbarMessage('Password Reset Successfully');
//             setOpenSnackbar(true);
//             setSnackMode('success');
//         } else {
//             setSnackbarMessage(`${response.data.message}`);
//             setOpenSnackbar(true);
//             setSnackMode('Warning');
//         }
//     } catch (e) {
//         console.log(e);
//     }
// };
