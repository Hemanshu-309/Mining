import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';
import getRole from './index';

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

const RoleAdd = ({ open, handleCloseDialog, setOpen, getContractor }) => {
    const token = localStorage.getItem('accessToken');

    const [progress, setProgress] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [role, setRole] = useState({
        role_name: '',
        code: ''
    });
    const [error, setError] = useState({});
    const [snackmode, setSnackMode] = useState('');

    // const URL = process.env.REACT_APP_HOST_URL;

    // console.log(URL);

    const validationSchema = Yup.object({
        role_name: Yup.string()
            .min(3)
            .required('Role Name is required')
            .matches(/^[a-zA-Z]+$/, 'Role Name must contain only letters'),
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
        setRole({ ...role, [name]: value });
        await validateField(name, value);
    };

    const handleSubmit = async () => {
        console.log(role);
        setOpen(false);
        try {
            const response = await axios.post('http://10.201.1.198:8000/role/createRole', role, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `b ${token}`
                }
            });
            console.log(response);

            if (!response.data.error) {
                setRole({
                    role_name: '',
                    code: ''
                });
                setSnackbarMessage('Role Added Successfully!');
                setOpenSnackbar(true);
                setSnackMode('success');
                getRole();
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
                        <DialogTitle>Add Role Name</DialogTitle>
                        <DialogContent>
                            <Grid style={{ width: '400px' }} container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-basic1"
                                        value={role.role_name}
                                        name="role_name"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        fullWidth
                                        label="Enter Role Name"
                                        // inputProps={{ inputMode: 'text', pattern: '[a-z]' }}
                                        error={Boolean(error.role_name)}
                                        helperText={error.role_name}
                                    />
                                </Grid>
                            </Grid>
                            <Grid style={{ width: '400px' }} container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-basic1"
                                        value={role.code}
                                        name="code"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        fullWidth
                                        label="Enter Role Code"
                                        // inputProps={{ inputMode: 'text', pattern: '[a-z]' }}
                                        error={Boolean(error.code)}
                                        helperText={error.code}
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

RoleAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    setOpen: PropTypes.func
};

export default RoleAdd;
