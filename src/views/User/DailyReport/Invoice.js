import { useRef } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import ReactToPrint from 'react-to-print';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import Logo from 'ui-component/Logo';
import { gridSpacing } from 'store/constant';

// table data
function createData(product, description, quantity, amount, total) {
    return { product, description, quantity, amount, total };
}

const rows = [
    createData('Logo Design', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '6', '$200.00', '$1200.00'),
    createData('Landing Page', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '7', '$100.00', '$700.00'),
    createData('Admin Template', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '5', '$150.00', '$750.00')
];

const Invoice = () => {
    const theme = useTheme();
    const componentRef = useRef(null);

    return (
        <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                <SubCard darkTitle title="Tripdetails" secondary={<Logo />}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Date:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">Mine No:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">Role</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">Vehical Type:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">Trip Type:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">Lead:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">Trips:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">QtyMT:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">Trip Type:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">Rate:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">Amt:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">Remarks:</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} md={10} lg={8}>
                <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    sx={{
                        maxWidth: 850,
                        mx: 'auto',
                        mt: 0,
                        mb: 2.5,
                        '& > .MuiCardContent-root': {
                            py: { xs: 3.75, md: 5.5 },
                            px: { xs: 2.5, md: 5 }
                        }
                    }}
                >
                    <Grid item>
                        <AnimateButton>
                            <ReactToPrint trigger={() => <Button variant="contained">Print</Button>} content={() => componentRef.current} />
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Invoice;
