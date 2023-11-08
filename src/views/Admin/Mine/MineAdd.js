import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';
import getmine from './index';

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

const MineAdd = ({ open, handleCloseDialog, setOpen, getMine }) => {
    const token = localStorage.getItem('accessToken');

    const [progress, setProgress] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [mine, setMine] = useState({
        name: '',
        code: ''
    });
    const [error, setError] = useState({});
    const [snackmode, setSnackMode] = useState('');

    // const URL = process.env.REACT_APP_HOST_URL;

    // console.log(URL);

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3)
            .required('Mine Name is required')
            .matches(/^[a-zA-Z]+$/, 'Mine Name must contain only letters'),
        code: Yup.string().min(1).required('Code is required')
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
        setMine({ ...mine, [name]: value });
        await validateField(name, value);
    };

    const handleSubmit = async () => {
        console.log(mine);
        setOpen(false);
        try {
            const response = await axios.post('http://10.201.1.198:8000/mine/addMine', mine, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `b ${token}`
                }
            });
            console.log(response);

            if (!response.data.error) {
                setMine({
                    name: '',
                    code: ''
                });
                setSnackbarMessage('Contractor Added Successfully!');
                setOpenSnackbar(true);
                setSnackMode('success');
                getMine();
            } else {
                setSnackbarMessage(`${response.data.message}`);
                setOpenSnackbar(true);
                setSnackMode('Warning');
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
                        <DialogTitle>Add mine</DialogTitle>
                        <DialogContent>
                            <Grid style={{ width: '400px' }} container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-basic1"
                                        value={mine.name}
                                        name="name"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        fullWidth
                                        label="Enter Mine Name"
                                        inputProps={{ inputMode: 'text', pattern: '[a-z]' }}
                                        error={Boolean(error.vehicle)}
                                        helperText={error.vehicle}
                                    />
                                </Grid>
                            </Grid>

                            <Grid style={{ width: '400px' }} container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-basic1"
                                        value={mine.code}
                                        name="code"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        fullWidth
                                        label="Enter Mine Code"
                                        inputProps={{ inputMode: 'text', pattern: '[a-z]' }}
                                        error={Boolean(error.vehicle)}
                                        helperText={error.vehicle}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleSubmit}>
                                    Add
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

MineAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    setOpen: PropTypes.func
};

export default MineAdd;
