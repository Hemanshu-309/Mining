import { CheckBox } from '@mui/icons-material';
import {
    TextField,
    Typography,
    Grid,
    FormControlLabel,
    Checkbox,
    Button,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    Snackbar,
    Alert,
    RadioGroup,
    Radio,
    FormControl,
    Stack
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';
import { isNaN } from 'lodash';
import { DateTime } from 'luxon';
import { DateTimePicker } from '@mui/x-date-pickers';

const validationSchema = Yup.object().shape({
    // date: Yup.string().required('Date is required'),
    service: Yup.string().required('service is required'),
    mine_no: Yup.string().required('mines is required'),
    unit: Yup.string().required('unit is required'),
    // trip_type: Yup.string().required('TripeType is required'),
    rate: Yup.number().required('rate is required').positive('trips must be a positive number').integer('trips must be a integer'),
    fromdate: Yup.string().required('fromdate is required'),
    todate: Yup.string().required('todate is required'),
    currency: Yup.string().required('Currency is required'),
    contractor: Yup.string().required('contractor is required')
    // quantity: Yup.number()
    //     .required('Quantity is required')
    //     .positive('Quantity must be a positive number')
    //     .integer('Quantity must be a integer'),
    // rate: Yup.number().required('Rate is required').positive('Rate must be a positive number').integer('Rate must be a integer'),
});

function Tripdetails() {
    const [value, setValue] = useState('');
    console.log(value);
    const [fromDate, setfromDate] = React.useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
    const [toDate, settoDate] = React.useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
    const [formData, setFormData] = useState({
        mine_no: '',
        service: '',
        rate: '',
        unit: '',
        contractor: '',
        currency: '',
        fromDate,
        toDate
    });
    const [tripTypes, setTripTypes] = useState([]);
    const [snackbarmessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [mineno, setmineno] = useState([]);
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});

    const url = process.env.REACT_APP_HOST_URL;

    // console.log(baseUrl);
    const token = localStorage.getItem('accessToken');

    const formik = useFormik({
        initialValues: formData,
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(formData, values);
                const response = await axios.post(`${url}/reports/addDailyReport`, values, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `b ${token}`
                    }
                });
                console.log(response);
                if (!response.data.error) {
                    setSnackbarMessage('tripDetails Created Successfully!!!');
                    setOpenSnackbar(true);
                    setStatus('success');
                } else {
                    setSnackbarMessage(`${response.data.message}`);
                    setOpenSnackbar(true);
                    setStatus('warning');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    console.log(formik.values);
    const calculateAmount = (trips, quantity, rate) => {
        if (trips && quantity && rate) {
            return trips * quantity * rate;
        }
        return '';
    };
    const handleChangefromDate = (fromDate) => {
        const formattedFromDate = fromDate ? fromDate.toISODate() : '';

        setfromDate(formattedFromDate);
        setFormData({ ...formData, fromDate: formattedFromDate });
    };

    const handleChangetoDate = (toDate) => {
        const formattedToDate = toDate ? toDate.toISODate() : '';

        settoDate(formattedToDate);
        setFormData({ ...formData, toDate: formattedToDate });
    };

    // function calculateAmount(trips, quantity, rate) {
    //     return trips * quantity * rate;
    // }
    // const calculateAmount = () => {
    //     const trips = parseFloat(formik.values.trips);
    //     const quantity = parseFloat(formik.values.quantity);
    //     const rate = parseFloat(formik.values.rate);

    //     if (!isNaN(trips) && !isNaN(quantity) && !isNaN(rate)) {
    //         const calculatedAmount = trips * quantity * rate;
    //         formik.setFieldValue('amount', calculatedAmount.toFixed(2));
    //     }
    // };

    // const handleTripsChange = (e) => {
    //     const value = e.target.value;
    //     setFormData({
    //         ...formData,
    //         trips: value,
    //         amount: calculateAmount(value, formData.quantity, formData.rate)
    //     });
    // };

    // const handleQuantityChange = (e) => {
    //     const value = e.target.value;
    //     setFormData({
    //         ...formData,
    //         quantity: value,
    //         amount: calculateAmount(formData.trips, value, formData.rate)
    //     });
    // };

    // const handleRateChange = (e) => {
    //     const value = e.target.value;
    //     setFormData({
    //         ...formData,
    //         rate: value,
    //         amount: calculateAmount(formData.trips, formData.quantity, value)
    //     });
    // };
    useEffect(() => {
        const getmine = async () => {
            try {
                const response = await axios.post(
                    `${url}/mine/getAllMines`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `b ${token}`
                        }
                    }
                );
                console.log('Fetched Data:', response);
                setmineno(response.data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getmine();
    }, []);

    useEffect(() => {
        const getTrip = async () => {
            try {
                const response = await axios.post(
                    `${url}/trip/getTripType`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `b ${token}`
                        }
                    }
                );
                console.log('Fetched Data:', response.data.data);
                setTripTypes(response.data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getTrip();
    }, []);

    const [vehicalTypes, setVehicalTypes] = useState([]);
    useEffect(() => {
        const getVehical = async () => {
            try {
                const response = await axios.post(
                    `${url}/vehicle/getVehicles`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `b ${token}`
                        }
                    }
                );
                console.log('Fetched Data:', response);
                setVehicalTypes(response.data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getVehical();
    }, []);
    const [role, setRole] = useState([]);
    useEffect(() => {
        const getRole = async () => {
            try {
                const response = await axios.post(
                    `${url}/role/getRole`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `b ${token}`
                        }
                    }
                );
                console.log('Fetched Data:', response.data.data);
                setRole(response.data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getRole();
    }, []);

    // const validateField = async (name, value) => {
    //     try {
    //         await Yup.reach(validationSchema, name).validate(value);
    //         setErrors({
    //             ...errors,
    //             [name]: ''
    //         });
    //     } catch (validationError) {
    //         setErrors({
    //             ...errors,
    //             [name]: validationError.message
    //         });
    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        calculateAmount();
    };
    // const handleSubmit = async (e) => {
    //     console.log(formData);
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('${url}/reports/addDailyReport', formData, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `b ${token}`
    //             }
    //         });
    //         console.log('Response:', response.data);
    //         if (!response.data.error) {
    //             setSnackbarMessage('tripDetails Created Successfully!!!');
    //             setOpenSnackbar(true);
    //             setStatus('success');
    //         } else {
    //             setErrors();
    //             setSnackbarMessage(`${response.data.message}`);
    //             setOpenSnackbar(true);
    //             setStatus('warning');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
    console.log(formik.errors);
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
                    severity={status === 'success' ? 'success' : 'warning'}
                    sx={{ width: '100%' }}
                >
                    {snackbarmessage}
                </Alert>
            </Snackbar>
            <MainCard title="Rate">
                <Typography>
                    <Container>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid Container spacing={gridSpacing}>
                                {/* <Grid item xs={6} sx={{ mb: 2 }}>
                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                        <DatePicker
                                            label="Date"
                                            inputFormat="yyyy/MM/dd"
                                            maxDate={new Date()}
                                            renderInput={(props) => <TextField fullWidth {...props} />}
                                            value={formik.values.date ? DateTime.fromISO(formik.values.date).toFormat('yyyy-MM-dd') : ''}
                                            onChange={(date) => formik.setFieldValue('date', date ? date.toISODate() : '')}
                                        />
                                    </LocalizationProvider>
                                </Grid> */}
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={6} sx={{ mb: 2 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Mines</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formik.values.mine_no}
                                                label="Mines"
                                                name="mine_no"
                                                onChange={formik.handleChange}
                                                // onChange={(e) => formik.setFieldValue('mine_no', e.target.value)}
                                                // error={formik.touched.mine_no && Boolean(formik.errors.mine_no)}
                                            >
                                                {mineno.map((items) => (
                                                    <MenuItem key={items.id} value={items.id}>
                                                        {items.id}
                                                        {items.mine_name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText style={{ color: 'red' }}>
                                                {(formik.submitCount > 0 && formik.errors.mine_no) || ''}
                                            </FormHelperText>
                                            {/* <FormHelperText style={{ color: 'red' }}>{formik.errors.mine_no}</FormHelperText> */}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 2 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Service</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formik.values.service}
                                                label="service"
                                                name="service"
                                                onChange={formik.handleChange}
                                                // onChange={(e) => formik.setFieldValue('service', e.target.value)}
                                            >
                                                {/* {role.map((items) => ( */}
                                                <MenuItem value="service1">service1</MenuItem>
                                                <MenuItem value="service2">service2</MenuItem>
                                                {/* ))} */}
                                            </Select>
                                            <FormHelperText style={{ color: 'red' }}>
                                                {(formik.submitCount > 0 && formik.errors.service) || ''}
                                            </FormHelperText>
                                            {/* <FormHelperText style={{ color: 'red' }}>{formik.errors.service}</FormHelperText> */}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={6} sx={{ mb: 2 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="unit"
                                                name="unit"
                                                value={formik.values.unit}
                                                onChange={formik.handleChange}
                                                // onChange={(e) => formik.setFieldValue('unit', e.target.value)}
                                                // error={formik.touched.vehicle && Boolean(formik.errors.vehicle)}
                                            >
                                                {/* {vehicalTypes.map((items) => ( */}
                                                <MenuItem value="MT">MT</MenuItem>
                                                {/* ))} */}
                                            </Select>
                                            {/* <FormHelperText style={{ color: 'red' }}>{formik.errors.unit}</FormHelperText> */}
                                            <FormHelperText style={{ color: 'red' }}>
                                                {(formik.submitCount > 0 && formik.errors.unit) || ''}
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {/* <FormControl> */}
                                        <TextField
                                            fullWidth
                                            id="outlined-Trips"
                                            label="Rate"
                                            name="rate"
                                            value={formik.values.rate}
                                            onChange={formik.handleChange}
                                        />
                                        {/* <FormHelperText style={{ color: 'red' }}>{formik.errors.rate}</FormHelperText> */}
                                        <FormHelperText style={{ color: 'red' }}>
                                            {(formik.submitCount > 0 && formik.errors.rate) || ''}
                                        </FormHelperText>
                                        {/* </FormControl> */}
                                    </Grid>
                                    {/* <Grid item xs={6} sx={{ mb: 2 }}>
                                        <FormControl fullWidth error={Boolean(formik.errors.trip_type)}>
                                            <InputLabel id="demo-simple-select-label">TripType</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="outlined-basic-size-default"
                                                label="Trip-Type"
                                                name="trip_type"
                                                onChange={(e) => formik.setFieldValue('trip_type', e.target.value)}
                                                error={formik.touched.trip_type && Boolean(formik.errors.trip_type)}
                                                style={{ width: '100%' }}
                                                value={formik.values.trip_type}
                                            >
                                                {tripTypes.map((items) => (
                                                    <MenuItem key={items.id} value={items.id}>
                                                        {items.type}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText color="error">{formik.errors.trip_type}</FormHelperText>
                                        </FormControl>
                                    </Grid> */}
                                </Grid>
                                {/* <Grid item xs={6}>
                                    <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                                        Lead:
                                    </Typography>
                                    <Grid item>
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                name="with_lead"
                                                value={formik.values.with_lead}
                                                onChange={(e) => formik.setFieldValue('with_lead', e.target.value)}
                                                error={formik.touched.with_lead && Boolean(formik.errors.with_lead)}
                                            >
                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <FormHelperText color="error">{formik.errors.with_lead}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid> */}
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={6} sx={{ mb: 2 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Contractor</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formik.values.contractor}
                                                label="contractor"
                                                name="contractor"
                                                onChange={formik.handleChange}
                                                // onChange={(e) => formik.setFieldValue('contractor', e.target.value)}
                                                // error={formik.touched.role && Boolean(formik.errors.role)}
                                            >
                                                {/* {role.map((items) => ( */}
                                                <MenuItem value="contractor1">contractor1</MenuItem>
                                                <MenuItem value="contractor2">contractor2</MenuItem>
                                                {/* ))} */}
                                            </Select>
                                            {/* <FormHelperText style={{ color: 'red' }}>{formik.errors.contractor}</FormHelperText> */}
                                            <FormHelperText style={{ color: 'red' }}>
                                                {(formik.submitCount > 0 && formik.errors.contractor) || ''}
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 2 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formik.values.currency}
                                                label="currency"
                                                name="currency"
                                                onChange={formik.handleChange}
                                                // onChange={(e) => formik.setFieldValue('currency', e.target.value)}
                                                // error={formik.touched.role && Boolean(formik.errors.role)}
                                            >
                                                {/* {role.map((items) => ( */}
                                                <MenuItem value="INR">INR</MenuItem>
                                                {/* ))} */}
                                            </Select>
                                            {/* <FormHelperText style={{ color: 'red' }}>{formik.errors.currency}</FormHelperText> */}
                                            <FormHelperText style={{ color: 'red' }}>
                                                {(formik.submitCount > 0 && formik.errors.currency) || ''}
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={gridSpacing} sx={{ mb: 4 }}>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                <DatePicker
                                                    label="From Date"
                                                    id="fromDate"
                                                    inputFormat="yyyy/MM/dd"
                                                    maxDate={new Date()}
                                                    renderInput={(props) => <TextField fullWidth {...props} />}
                                                    value={fromDate}
                                                    onChange={(e) => handleChangefromDate(e)}
                                                />
                                                <FormHelperText style={{ color: 'red' }}>{formik.errors.fromDate}</FormHelperText>
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={16} lg={6}>
                                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                                            <DatePicker
                                                label="To Date"
                                                id="toDate"
                                                inputFormat="yyyy/MM/dd"
                                                maxDate={new Date()}
                                                minDate={formData.date1}
                                                renderInput={(props) => <TextField fullWidth {...props} />}
                                                value={toDate}
                                                onChange={(e) => handleChangetoDate(e)}
                                            />
                                        </LocalizationProvider>
                                        <FormHelperText style={{ color: 'red' }}>{formik.errors.toDate}</FormHelperText>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <Button type="submit" variant="contained" onClick={formik.handleSubmit}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Typography>
            </MainCard>
        </>
    );
}
export default Tripdetails;
