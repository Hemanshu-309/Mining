import { useTheme } from '@emotion/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button,
    Checkbox,
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
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { openSnackbar } from 'store/slices/snackbar';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box } from '@mui/system';
// ... other imports ...

const JWTRegister = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const { register } = useAuth();

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

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    username: '',
                    password: '',
                    callingCode: '',
                    mobile: '',
                    role: '',
                    code: '1',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(255).required('First Name is required'),
                    lastname: Yup.string().max(255).required('Last Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    username: Yup.string().max(255).required('Username is required'),
                    password: Yup.string()
                        .max(255)
                        .required('Password is required')
                        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/, 'Is not in correct format'),
                    callingCode: Yup.string().required('Country Code is required'),
                    mobile: Yup.string()
                        .max(255)
                        .required('Mobile Number is required')
                        .matches(/^([+]\d{2})?\d{10}$/, 'please enter valid mobile number'),
                    role: Yup.string().max(255).required('Role is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const mobile = `${values.callingCode}${values.mobile}`;
                        await register(
                            values.firstname,
                            values.lastname,
                            values.email,
                            values.username,
                            values.password,
                            mobile,
                            values.role,
                            values.code
                        );

                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="firstname"
                                    type="text"
                                    value={values.firstname}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                {touched.firstname && errors.firstname && (
                                    <FormHelperText error id="standard-weight-helper-text-firstname">
                                        {errors.firstname}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="lastname"
                                    type="text"
                                    value={values.lastname}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                {touched.lastname && errors.lastname && (
                                    <FormHelperText error id="standard-weight-helper-text-lastname">
                                        {errors.lastname}
                                    </FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            name="email"
                            type="email"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            sx={{ ...theme.typography.customInput }}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email">
                                {errors.email}
                            </FormHelperText>
                        )}
                        <TextField
                            required
                            fullWidth
                            label="Username"
                            margin="normal"
                            name="username"
                            type="text"
                            value={values.username}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            sx={{ ...theme.typography.customInput }}
                        />
                        {touched.username && errors.username && (
                            <FormHelperText error id="standard-weight-helper-text-username">
                                {errors.username}
                            </FormHelperText>
                        )}
                        {/* <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-callingCode">Country Code</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-helper-label"
                                id="outlined-adornment-callingCode"
                                name="callingCode"
                                value={values.callingCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Country Code"
                                margin="normal"
                                sx={{ ...theme.typography.customInput }}
                            >
                                <MenuItem value="+91">+91</MenuItem>
                                <MenuItem value="+1">+1</MenuItem>
                                <MenuItem value="+123">+123</MenuItem>
                            </Select>
                            {touched.callingCode && errors.callingCode && (
                                <FormHelperText error id="standard-weight-helper-text-callingCode">
                                    {errors.callingCode}
                                </FormHelperText>
                            )}
                        </FormControl> */}
                        <TextField
                            fullWidth
                            label="Mobile Number"
                            margin="normal"
                            name="mobile"
                            type="text"
                            value={values.mobile}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            sx={{ ...theme.typography.customInput }}
                        />
                        {touched.mobile && errors.mobile && (
                            <FormHelperText error id="standard-weight-helper-text-mobile">
                                {errors.mobile}
                            </FormHelperText>
                        )}
                        {/* <TextField
                            fullWidth
                            label="Role"
                            margin="normal"
                            name="role"
                            type="text"
                            value={values.role}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            sx={{ ...theme.typography.customInput }}
                        />
                        {touched.role && errors.role && (
                            <FormHelperText error id="standard-weight-helper-text-role">
                                {errors.role}
                            </FormHelperText>
                        )} */}
                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
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
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
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

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
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
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default JWTRegister;
