import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';
import getTrip from './index';

// material-ui
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Snackbar, TextField } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

import * as Yup from 'yup';

import axios from 'axios';

// import { Snackbar, Alert } from '@mui/material';

// animation
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

// ==============================|| TRIP ADD DIALOG ||============================== //

const TripAdd = ({ open, handleCloseDialog, setOpen }) => {
    const token = localStorage.getItem('accessToken');

    const [progress, setProgress] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [status, setStatus] = useState();
    const [tripType, setTripType] = useState({
        trip_type: ''
    });
    const [error, setError] = useState({});

    const validationSchema = Yup.object({
        triptype: Yup.string()
            .min(3)
            .required('Triptype is required')
            .matches(/^[a-zA-Z]+$/, 'Triptype must contain only letters')
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
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
            } else {
                const diff = Math.random() * 10;
                setProgress(progress + diff);
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleChange = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTripType({ [name]: value });
        await validateField(name, value);
    };

    const handleSubmit = async () => {
        console.log(tripType);
        try {
            const response = await axios.post('http://localhost:8000/trip/addTripType', tripType, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `b ${token}`
                }
            });
            console.log(response);

            if (!response.data.error) {
                setTripType({
                    trip_type: ''
                });
                setSnackbarMessage('Trip created successfully!');
                // alert('Trip created successfully!!!!!!!');
                setOpenSnackbar(true);
                setStatus(true);
                getTrip();
                setOpen(false);
            } else {
                setSnackbarMessage(`${response.data.message}`);
                setOpenSnackbar(true);
                setStatus(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {status ? (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            ) : (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            )}

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
                        <DialogTitle>Add Triptype</DialogTitle>
                        <DialogContent>
                            <Grid style={{ width: '400px' }} container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-basic1"
                                        value={tripType.trip_type}
                                        name="trip_type"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        fullWidth
                                        label="Enter Triptype*"
                                        inputProps={{ inputMode: 'text', pattern: '[a-z]' }}
                                        error={Boolean(error.triptype)}
                                        helperText={error.triptype}
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
                            <Button variant="text" color="error" onClick={handleCloseDialog}>
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
};

TripAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    setOpen: PropTypes.func
};

export default TripAdd;
