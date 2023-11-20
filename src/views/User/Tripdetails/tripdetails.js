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
    date: Yup.string().required('Date is required'),
    role: Yup.string().required('Role is required'),
    mine_no: Yup.string().required('Mine number is required'),
    vehicle: Yup.string().required('Vehicle is required'),
    trip_type: Yup.string().required('TripeType is required'),
    with_lead: Yup.string().required('Select a lead'),
    trips: Yup.number().required('Trips is required').positive('trips must be a positive number').integer('trips must be a integer'),
    quantity: Yup.number()
        .required('Quantity is required')
        .positive('Quantity must be a positive number')
        .integer('Quantity must be a integer'),
    rate: Yup.number().required('Rate is required').positive('Rate must be a positive number').integer('Rate must be a integer'),
    amount: Yup.number(),
    remarks: Yup.string()
});

function Tripdetails() {
    const [value, setValue] = useState('');
    console.log(value);
    const [formData, setFormData] = useState({
        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        role: '',
        mine_no: '',
        vehicle: '',
        trip_type: 'soft',
        with_lead: 'No',
        trips: '',
        quantity: '',
        rate: '',
        amount: '',
        remarks: ''
    });
    const [tripTypes, setTripTypes] = useState([]);
    const [snackbarmessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [mineno, setmineno] = useState([]);
    const [status, setStatus] = useState('');
    // const [errors, setErrors] = useState({});

    const url = process.env.REACT_APP_HOST_URL;

    // console.log(baseUrl);
    const token = localStorage.getItem('accessToken');

    const formik = useFormik({
        initialValues: formData,
        validationSchema,
        onSubmit: async (values) => {
            try {
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
    const calculateAmount = (trips, quantity, rate) => {
        if (trips && quantity && rate) {
            return trips * quantity * rate;
        }
        return '';
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
    // console.log(errors);
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
            <MainCard title="Trip Details">
                <Typography>
                    <Container>
                        <form onSubmit={formik.handleSubmit}>
                            {/* <Formik {...formik}> */}
                            <Grid Container spacing={gridSpacing}>
                                {/* <Grid item> */}
                                {/* <SubCard title=""> */}
                                <Grid item xs={6} sx={{ mb: 2 }}>
                                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                                        <DatePicker
                                            label="Date"
                                            inputFormat="yyyy/MM/dd"
                                            maxDate={new Date()}
                                            renderInput={(props) => <TextField fullWidth {...props} />}
                                            // value={formik.values.date}
                                            // // onChange={handleChangeDate}
                                            // onChange={(date) => formik.setFieldValue('date', date)}
                                            value={formik.values.date ? DateTime.fromISO(formik.values.date).toFormat('yyyy-MM-dd') : ''}
                                            onChange={(date) => formik.setFieldValue('date', date ? date.toISODate() : '')}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={6} sx={{ mb: 2 }}>
                                        <FormControl fullWidth error={Boolean(formik.errors.mine_no)}>
                                            <InputLabel id="demo-simple-select-label">MineNo</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formik.values.mine_no}
                                                label="MineNo"
                                                name="mine_no"
                                                // onChange={handleChange}
                                                onChange={(e) => formik.setFieldValue('mine_no', e.target.value)}
                                                error={formik.touched.mine_no && Boolean(formik.errors.mine_no)}
                                            >
                                                {mineno.map((items) => (
                                                    <MenuItem key={items.id} value={items.id}>
                                                        {items.id}
                                                        {items.mine_name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText color="error">{formik.errors.mine_no}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 2 }}>
                                        <FormControl fullWidth error={Boolean(formik.errors.role)}>
                                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={formik.values.role}
                                                label="Role"
                                                name="role"
                                                // onChange={handleChange}
                                                onChange={(e) => formik.setFieldValue('role', e.target.value)}
                                                error={formik.touched.role && Boolean(formik.errors.role)}
                                            >
                                                {role.map((items) => (
                                                    <MenuItem key={items.id} value={items.id}>
                                                        {items.role}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText color="error">{formik.errors.mine_no}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={6} sx={{ mb: 2 }}>
                                        <FormControl fullWidth error={Boolean(formik.errors.vehicle)}>
                                            <InputLabel id="demo-simple-select-label">Vehical-Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Vehical-Type"
                                                name="vehicle"
                                                value={formik.values.vehicle}
                                                // onChange={handleChange}
                                                onChange={(e) => formik.setFieldValue('vehicle', e.target.value)}
                                                error={formik.touched.vehicle && Boolean(formik.errors.vehicle)}
                                            >
                                                {vehicalTypes.map((items) => (
                                                    <MenuItem key={items.id} value={items.id}>
                                                        {items.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText color="error">{formik.errors.vehicle}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 2 }}>
                                        <FormControl fullWidth error={Boolean(formik.errors.trip_type)}>
                                            <InputLabel id="demo-simple-select-label">TripType</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="outlined-basic-size-default"
                                                label="Trip-Type"
                                                name="trip_type"
                                                // onChange={handleChange}
                                                onChange={(e) => formik.setFieldValue('trip_type', e.target.value)}
                                                error={formik.touched.trip_type && Boolean(formik.errors.trip_type)}
                                                style={{ width: '100%' }}
                                                value={formik.values.trip_type}
                                                // defaultValue="soft"
                                            >
                                                {tripTypes.map((items) => (
                                                    <MenuItem key={items.id} value={items.id}>
                                                        {items.type}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText color="error">{formik.errors.trip_type}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                                        Lead:
                                    </Typography>
                                    <Grid item>
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                name="with_lead"
                                                value={formik.values.with_lead}
                                                // onChange={handleChange}
                                                onChange={(e) => formik.setFieldValue('with_lead', e.target.value)}
                                                error={formik.touched.with_lead && Boolean(formik.errors.with_lead)}
                                            >
                                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <FormHelperText color="error">{formik.errors.with_lead}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            id="outlined-Trips"
                                            label="Trips"
                                            name="trips"
                                            value={formik.values.trips}
                                            // value={formData.trips}
                                            sx={{ mb: 2 }}
                                            // onChange={handleTripsChange}
                                            onChange={formik.handleChange}
                                            onBlur={(e) => {
                                                const amount = calculateAmount(e.target.value, formik.values.quantity, formik.values.rate);
                                                formik.setFieldValue('amount', amount);
                                            }}
                                            error={formik.touched.trips && Boolean(formik.errors.trips)}
                                        />
                                        <FormHelperText style={{ color: 'red' }}>{formik.errors.trips}</FormHelperText>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            id="outlined-Qty"
                                            label="Qty MT"
                                            name="quantity"
                                            value={formik.values.quantity}
                                            // value={formData.quantity}
                                            sx={{ mb: 2 }}
                                            // onChange={handleQuantityChange}
                                            onChange={formik.handleChange}
                                            onBlur={(e) => {
                                                const amount = calculateAmount(formik.values.trips, e.target.value, formik.values.rate);
                                                formik.setFieldValue('amount', amount);
                                            }}
                                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                            // onChange={(e) => handleQuantityChange(e)}
                                            // error={Boolean(errors.quantity)}
                                            // helperText={errors.quantity || ''}
                                        />
                                        <FormHelperText style={{ color: 'red' }}>{formik.errors.quantity}</FormHelperText>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            id="outlined-email-address"
                                            label="Rate"
                                            name="rate"
                                            sx={{ mb: 2 }}
                                            value={formik.values.rate}
                                            // value={formData.rate}
                                            // onChange={handleRateChange}
                                            onChange={formik.handleChange}
                                            onBlur={(e) => {
                                                const amount = calculateAmount(formik.values.trips, formik.values.quantity, e.target.value);
                                                formik.setFieldValue('amount', amount);
                                            }}
                                            error={formik.touched.rate && Boolean(formik.errors.rate)}
                                            // onChange={(e) => handleRateChange(e)}
                                            // error={Boolean(errors.rate)}
                                            // helperText={errors.rate || ''}
                                        />
                                        <FormHelperText style={{ color: 'red' }}>{formik.errors.rate}</FormHelperText>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            id="outlined-email-address"
                                            placeholder="Amt"
                                            name="amount"
                                            // value={
                                            //     formik.values.amount
                                            //         ? formik.values.trips * formik.values.quantity * formik.values.rate
                                            //         : ''
                                            // }
                                            value={formik.values.amount}
                                            // value={formData.amount}
                                            sx={{ mb: 2 }}
                                            // onChange={handleChange}
                                            onChange={formik.handleChange}
                                            // onBlur={calculateAmount}
                                            disabled
                                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                                            // error={Boolean(errors.amount)}
                                            // helperText={errors.amount || ''}
                                        />
                                        <FormHelperText style={{ color: 'red' }}>{formik.errors.amount}</FormHelperText>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sx={{ mb: 2 }}>
                                    <TextField
                                        label="remarks"
                                        name="remarks"
                                        value={formik.values.remarks}
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        fullWidth
                                        // onChange={handleChange}
                                        onChange={formik.handleChange}
                                        error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                                        // error={Boolean(errors.remarks)}
                                        // helperText={errors.remarks || ''}
                                    />
                                    <FormHelperText style={{ color: 'red' }}>{formik.errors.remarks}</FormHelperText>
                                </Grid>
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <Button type="submit" variant="contained">
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* </Formik> */}
                        </form>
                    </Container>
                </Typography>
            </MainCard>
        </>
    );
}
export default Tripdetails;

// import {
//     TextField,
//     Typography,
//     Grid,
//     FormControlLabel,
//     Checkbox,
//     Button,
//     InputLabel,
//     Select,
//     MenuItem,
//     InputAdornment,
//     Snackbar,
//     Alert,
//     RadioGroup,
//     Radio,
//     FormControl,
//     Stack
// } from '@mui/material';
// import { Container } from '@mui/system';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { gridSpacing } from 'store/constant';
// import MainCard from 'ui-component/cards/MainCard';
// import SubCard from 'ui-component/cards/SubCard';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import FormHelperText from '@mui/material/FormHelperText';

// const validationSchema = Yup.object().shape({
//     date: Yup.string().required('Date is required'),
//     role: Yup.string().required('Role is required'),
//     mine_no: Yup.string().required('Mine number is required'),
//     vehicle: Yup.string().required('Vehicle is required'),
//     trip_type: Yup.string().required('TripType is required'),
//     with_lead: Yup.string().required('Select a lead'),
//     trips: Yup.number().required('Trips is required').positive('Trips must be a positive number').integer('Trips must be an integer'),
//     quantity: Yup.number()
//         .required('Quantity is required')
//         .positive('Quantity must be a positive number')
//         .integer('Quantity must be an integer'),
//     rate: Yup.number().required('Rate is required').positive('Rate must be a positive number').integer('Rate must be an integer'),
//     amount: Yup.number().required('Amount is required'),
//     remarks: Yup.string().required('Remarks is required')
// });

// function Tripdetails() {
//     const [snackbarmessage, setSnackbarMessage] = useState('');
//     const [openSnackbar, setOpenSnackbar] = useState('');
//     const [mineno, setmineno] = useState([]);
//     const [status, setStatus] = useState('');
//     const baseUrl = process.env.REACT_APP_BASE_URL;
//     const token = localStorage.getItem('accessToken');

//     const formik = useFormik({
//         initialValues: {
//             date: '',
//             role: '',
//             mine_no: '',
//             vehicle: '',
//             trip_type: '',
//             with_lead: 'No',
//             trips: '',
//             quantity: '',
//             rate: '',
//             amount: '',
//             remarks: ''
//         },
//         validationSchema,
//         onSubmit: async (values) => {
//             try {
//                 const response = await axios.post(`${baseUrl}/reports/addDailyReport`, values, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `b ${token}`
//                     }
//                 });
//                 if (!response.data.error) {
//                     setSnackbarMessage('tripDetails Created Successfully!!!');
//                     setOpenSnackbar(true);
//                     setStatus('success');
//                 } else {
//                     setSnackbarMessage(`${response.data.message}`);
//                     setOpenSnackbar(true);
//                     setStatus('warning');
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         }
//     });

//     function calculateAmount(trips, quantity, rate) {
//         return trips * quantity * rate;
//     }

//     const handleTripsChange = (e) => {
//         const value = e.target.value;
//         formik.setFieldValue('trips', value);
//         formik.setFieldValue('amount', calculateAmount(value, formik.values.quantity, formik.values.rate));
//     };

//     const handleQuantityChange = (e) => {
//         const value = e.target.value;
//         formik.setFieldValue('quantity', value);
//         formik.setFieldValue('amount', calculateAmount(formik.values.trips, value, formik.values.rate));
//     };

//     const handleRateChange = (e) => {
//         const value = e.target.value;
//         formik.setFieldValue('rate', value);
//         formik.setFieldValue('amount', calculateAmount(formik.values.trips, formik.values.quantity, value));
//     };

//     return (
//         <>
//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={6000}
//                 onClose={() => setOpenSnackbar(false)}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//             >
//                 <Alert
//                     onClose={() => setOpenSnackbar(false)}
//                     severity={status === 'success' ? 'success' : 'warning'}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbarmessage}
//                 </Alert>
//             </Snackbar>
//             <MainCard title="Trip Details">
//                 <Typography>
//                     <Container>
//                         <form onSubmit={formik.handleSubmit}>
//                             <Grid Container spacing={gridSpacing}>
//                                 <Grid item xs={6} sx={{ mb: 2 }}>
//                                     <LocalizationProvider dateAdapter={AdapterLuxon}>
//                                         <DatePicker
//                                             label="Date"
//                                             inputFormat="yyyy/MM/dd"
//                                             maxDate={new Date()}
//                                             renderInput={(props) => <TextField fullWidth {...props} />}
//                                             value={formik.values.date}
//                                             onChange={(date) => formik.setFieldValue('date', date)}
//                                         />
//                                     </LocalizationProvider>
//                                 </Grid>
//                                 <Grid container spacing={gridSpacing}>
//                                     <Grid item xs={6} sx={{ mb: 2 }}>
//                                         <FormControl fullWidth>
//                                             <InputLabel id="mine-no-label">MineNo</InputLabel>
//                                             <Select
//                                                 labelId="mine-no-label"
//                                                 id="mine-no"
//                                                 value={formik.values.mine_no}
//                                                 label="MineNo"
//                                                 name="mine_no"
//                                                 onChange={formik.handleChange}
//                                                 error={formik.touched.mine_no && Boolean(formik.errors.mine_no)}
//                                             >
//                                                 {mineno.map((items) => (
//                                                     <MenuItem key={items.id} value={items.id}>
//                                                         {items.id} {items.mine_name}
//                                                     </MenuItem>
//                                                 ))}
//                                             </Select>
//                                             <FormHelperText error>{formik.touched.mine_no && formik.errors.mine_no}</FormHelperText>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item xs={6} sx={{ mb: 2 }}>
//                                         <FormControl fullWidth>
//                                             <InputLabel id="role-label">Role</InputLabel>
//                                             <Select
//                                                 labelId="role-label"
//                                                 id="role"
//                                                 value={formik.values.role}
//                                                 label="Role"
//                                                 name="role"
//                                                 onChange={formik.handleChange}
//                                                 error={formik.touched.role && Boolean(formik.errors.role)}
//                                             >
//                                                 {role.map((items) => (
//                                                     <MenuItem key={items.id} value={items.role_name}>
//                                                         {items.role}
//                                                     </MenuItem>
//                                                 ))}
//                                             </Select>
//                                             <FormHelperText error>{formik.touched.role && formik.errors.role}</FormHelperText>
//                                         </FormControl>
//                                     </Grid>
//                                 </Grid>
//                                 {/* ... (other form fields) */}
//                                 <Grid container justifyContent="center">
//                                     <Grid item>
//                                         <Button type="submit" variant="contained">
//                                             Submit
//                                         </Button>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                         </form>
//                     </Container>
//                 </Typography>
//             </MainCard>
//         </>
//     );
// }

// export default Tripdetails;
