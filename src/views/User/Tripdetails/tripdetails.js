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
    Alert
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isNaN } from 'lodash';
// import { Value } from 'sass';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { DemoContainer } from '@mui/x-date-pickers';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Tripdetails() {
    const [formData, setFormData] = useState({
        role: '7',
        mine_no: '',
        vehicle: '',
        trip_type: '',
        with_lead: false,
        trips: '',
        quantity: '',
        rate: '',
        amount: '',
        remarks: ''
    });
    const [value, setValue] = useState(null);
    const [tripTypes, setTripTypes] = useState([]);
    const [snackbarmessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [mineno, setmineno] = useState([]);
    const [amt, setAmt] = useState('');
    const [Qtymt, setQtymt] = useState('');
    const handleAmtChange = (e) => {
        setAmt(e.target.value);
    };

    const handleQtymtChange = (e) => {
        setQtymt(e.target.value);
    };

    const calculateRate = () => {
        const rate = amt * Qtymt;
        return isNaN(rate) ? '' : rate;
    };

    useEffect(() => {
        const getmine = async () => {
            try {
                const response = await axios.post(
                    'http://10.201.1.195:8000/mine/getAllMines',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGUiOiI3IiwiZW1haWwiOiJyYWh1bC5ndXNhaS43OTk4QGdtYWlsLmNvbSIsImlhdCI6MTY5NjQ5OTYwOCwiZXhwIjoxNjk2NTU5NjA4fQ.fVBQWbQGRHDzgs50NhcvG1zvaqQhJ7bUJbt_j7jd354'
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
    const mine = mineno;

    useEffect(() => {
        const getTrip = async () => {
            try {
                const response = await axios.post(
                    'http://10.201.1.195:8000/trip/getTripType',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGUiOiI3IiwiZW1haWwiOiJyYWh1bC5ndXNhaS43OTk4QGdtYWlsLmNvbSIsImlhdCI6MTY5NjQ5OTYwOCwiZXhwIjoxNjk2NTU5NjA4fQ.fVBQWbQGRHDzgs50NhcvG1zvaqQhJ7bUJbt_j7jd354'
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
    const trip = tripTypes;

    const [vehicalTypes, setVehicalTypes] = useState([]);
    useEffect(() => {
        const getVehical = async () => {
            try {
                const response = await axios.post(
                    'http://10.201.1.195:8000/vehicle/getVehicles',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGUiOiI3IiwiZW1haWwiOiJyYWh1bC5ndXNhaS43OTk4QGdtYWlsLmNvbSIsImlhdCI6MTY5NjQ5OTYwOCwiZXhwIjoxNjk2NTU5NjA4fQ.fVBQWbQGRHDzgs50NhcvG1zvaqQhJ7bUJbt_j7jd354'
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
    const vehical = vehicalTypes;
    const [roleTypes, setRoleTypes] = useState([]);
    useEffect(() => {
        const getRole = async () => {
            try {
                const response = await axios.post(
                    'http://10.201.1.195:8000/role/getRole',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGUiOiI3IiwiZW1haWwiOiJyYWh1bC5ndXNhaS43OTk4QGdtYWlsLmNvbSIsImlhdCI6MTY5NjQ5OTYwOCwiZXhwIjoxNjk2NTU5NjA4fQ.fVBQWbQGRHDzgs50NhcvG1zvaqQhJ7bUJbt_j7jd354'
                        }
                    }
                );
                console.log('Fetched Data:', response.data.data);
                setRoleTypes(response.data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getRole();
    }, []);
    console.log(roleTypes);
    const role = roleTypes;
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
        // setFormData({
        //     ...formData,
        //     [name]: type === 'checkbox' ? checked : value
        // });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://10.201.1.195:8000/reports/addDailyReport', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'b eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGUiOiI3IiwiZW1haWwiOiJyYWh1bC5ndXNhaS43OTk4QGdtYWlsLmNvbSIsImlhdCI6MTY5NjQ5OTYwOCwiZXhwIjoxNjk2NTU5NjA4fQ.fVBQWbQGRHDzgs50NhcvG1zvaqQhJ7bUJbt_j7jd354'
                }
            });
            console.log('Response:', response.data);
            if (!response.data.error) {
                setSnackbarMessage('tripDetails Created Successfully!!!');
                setOpenSnackbar(true);
            } else {
                setSnackbarMessage(`${response.data.message}`);
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Adjust the duration as needed
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarmessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} // Adjust the duration as needed
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="Warning" sx={{ width: '100%' }}>
                    {snackbarmessage}
                </Alert>
            </Snackbar>
            <MainCard title="Trip Details">
                <Typography>
                    <Container>
                        <form>
                            <Grid Container spacing={gridSpacing}>
                                <Grid item xs={6} md={6}>
                                    <SubCard title="">
                                        <Grid item xs={12}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Date picker"
                                                    value={value}
                                                    maxDate={new Date()}
                                                    inputFormat="DD/MM/YYYY"
                                                    onChange={(newValue) => {
                                                        setValue(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            <Grid item xs={12}>
                                                <InputLabel id="demo-simple-select-label">MineNo</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="MineNo"
                                                    onChange={handleChange}
                                                    style={{ width: '100%' }}
                                                >
                                                    {console.log(mineno)}
                                                    {mineno.map((items) => (
                                                        <MenuItem key={items.id} value={items.name}>
                                                            {items.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Role-Type"
                                                    onChange={handleChange}
                                                    style={{ width: '100%' }}
                                                    value="Contractor"
                                                >
                                                    {console.log(roleTypes)}
                                                    {roleTypes.map((items) => (
                                                        <MenuItem key={items.id} value={items.role_name}>
                                                            {items.role_name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel id="demo-simple-select-label">VehicalType</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Vehical-Type"
                                                    onChange={handleChange}
                                                    style={{ width: '100%' }}
                                                >
                                                    {vehicalTypes.map((items) => (
                                                        <MenuItem key={items.id} value={items.name}>
                                                            {items.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <InputLabel id="demo-simple-select-label">TripType</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Trip-Type"
                                                    onChange={handleChange}
                                                    style={{ width: '100%' }}
                                                    value="Soft"
                                                >
                                                    {tripTypes.map((items) => (
                                                        <MenuItem key={items.id} value={items.type}>
                                                            {items.type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                                                    Lead:
                                                </Typography>
                                                <Grid item>
                                                    <FormControlLabel
                                                        control={<Checkbox checked={formData.lead} onChange={handleChange} name="lead" />}
                                                        label="Yes"
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <FormControlLabel
                                                        control={<Checkbox checked={!formData.lead} onChange={handleChange} name="lead" />}
                                                        label="No"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-Trips"
                                                    label="Trips"
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]' }}
                                                    sx={{ mb: 2 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-Qty"
                                                    label="Qty MT"
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]' }}
                                                    sx={{ mb: 2 }}
                                                    onChange={handleAmtChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-email-address"
                                                    placeholder="Rate"
                                                    sx={{ mb: 2 }}
                                                    value={calculateRate()}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    id="outlined-email-address"
                                                    placeholder="Amt"
                                                    sx={{ mb: 2 }}
                                                    onChange={handleAmtChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField label="remarks" multiline rows={4} variant="outlined" fullWidth />
                                            </Grid>
                                        </Grid>
                                    </SubCard>
                                </Grid>
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <Button variant="contained">Submit</Button>
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
