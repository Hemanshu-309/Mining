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
    amount: Yup.number().required('Amount is required'),
    remarks: Yup.string().required('Remarks is required')
});

function Tripdetails() {
    const [value, setValue] = useState('');
    console.log(value);
    const [formData, setFormData] = useState({
        date: '',
        role: '',
        mine_no: '',
        vehicle: '',
        trip_type: '',
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
    const [errors, setErrors] = useState('');

    const baseUrl = process.env.REACT_APP_BASE_URL;

    console.log(baseUrl);

    const token = localStorage.getItem('accessToken');

    function calculateAmount(trips, quantity, rate) {
        return trips * quantity * rate;
    }

    const handleTripsChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            trips: value,
            amount: calculateAmount(value, formData.quantity, formData.rate)
        });
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            quantity: value,
            amount: calculateAmount(formData.trips, value, formData.rate)
        });
    };

    const handleRateChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            rate: value,
            amount: calculateAmount(formData.trips, formData.quantity, value)
        });
    };
    useEffect(() => {
        const getmine = async () => {
            try {
                const response = await axios.post(
                    'http://10.201.1.198:8000/mine/getAllMines',
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
                    'http://10.201.1.198:8000/trip/getTripType',
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
                    'http://10.201.1.198:8000/vehicle/getVehicles',
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
                    'http://10.201.1.198:8000/role/getRole',
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

    const handleChangeDate = (newValue) => {
        const formattedDate = newValue ? newValue.toISODate() : '';

        setValue(newValue);
        setFormData({ ...formData, date: formattedDate });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        calculateAmount();
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        try {
            validationSchema.validate(formData, { abortEarly: false }).then(async () => {
                try {
                    const response = await axios.post('http://10.201.1.198:8000/reports/addDailyReport', formData, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `b ${token}`
                        }
                    });
                    console.log('Response:', response.data);
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
            });
        } catch (error) {
            // Form data is invalid
            const newErrors = {};
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    };
    console.log(value);
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
                        <form onSubmit={handleSubmit}>
                            <Grid Container spacing={gridSpacing}>
                                <Grid item xs={6} md={6}>
                                    <SubCard title="">
                                        <Grid item xs={12}>
                                            <Grid item xs={12} sx={{ mb: 2 }}>
                                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                    <DatePicker
                                                        label="Date"
                                                        inputFormat="yyyy/MM/dd"
                                                        maxDate={new Date()}
                                                        renderInput={(props) => <TextField fullWidth {...props} />}
                                                        value={value}
                                                        onChange={handleChangeDate}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item xs={12} sx={{ mb: 2 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">MineNo</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={formData.mine_no}
                                                        label="MineNo"
                                                        name="mine_no"
                                                        onChange={handleChange}
                                                    >
                                                        {mineno.map((items) => (
                                                            <MenuItem key={items.id} value={items.id}>
                                                                {items.id}
                                                                {items.mine_name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} sx={{ mb: 2 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={formData.role}
                                                        label="Role"
                                                        name="role"
                                                        onChange={handleChange}
                                                    >
                                                        {role.map((items) => (
                                                            <MenuItem key={items.id} value={items.role_name}>
                                                                {items.role_name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sx={{ mb: 2 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Vehical-Type</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Vehical-Type"
                                                        name="vehicle"
                                                        value={formData.vehicle}
                                                        onChange={handleChange}
                                                    >
                                                        {vehicalTypes.map((items) => (
                                                            <MenuItem key={items.id} value={items.id}>
                                                                {items.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sx={{ mb: 2 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">TripType</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="outlined-basic-size-default"
                                                        label="Trip-Type"
                                                        name="trip_type"
                                                        onChange={handleChange}
                                                        style={{ width: '100%' }}
                                                        value={formData.trip_type}
                                                    >
                                                        {tripTypes.map((items) => (
                                                            <MenuItem key={items.id} value={items.id}>
                                                                {items.type}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                                                    Lead:
                                                </Typography>
                                                <Grid item>
                                                    <FormControl>
                                                        <RadioGroup row name="with_lead" value={formData.with_lead} onChange={handleChange}>
                                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-Trips"
                                                    label="Trips"
                                                    name="trips"
                                                    value={formData.trips}
                                                    sx={{ mb: 2 }}
                                                    onChange={handleTripsChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-Qty"
                                                    label="Qty MT"
                                                    name="quantity"
                                                    value={formData.quantity}
                                                    sx={{ mb: 2 }}
                                                    onChange={handleQuantityChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-email-address"
                                                    label="Rate"
                                                    name="rate"
                                                    sx={{ mb: 2 }}
                                                    value={formData.rate}
                                                    onChange={handleRateChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-email-address"
                                                    placeholder="Amt"
                                                    name="amount"
                                                    value={formData.amount}
                                                    sx={{ mb: 2 }}
                                                    // onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="remarks"
                                                    name="remarks"
                                                    value={formData.remarks}
                                                    multiline
                                                    rows={4}
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <Button type="submit" variant="contained">
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
