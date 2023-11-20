import { useRef, useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    CardContent,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

// third-party
import ReactToPrint from 'react-to-print';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import Logo from '../../../assets/images/minelogo.jpg';
import { gridSpacing } from 'store/constant';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Tripdetails from 'views/User/Tripdetails/tripdetails';

const Invoice = () => {
    const theme = useTheme();
    const componentRef = useRef(null);
    const { id } = useParams();
    const token = localStorage.getItem('accessToken');

    const [tripDetails, setTripDetails] = useState([{}]);
    const url = process.env.REACT_APP_HOST_URL;
    useEffect(async () => {
        try {
            const response = await axios.post(
                `${url}/reports/getDailyReportWhere`,
                { id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `b ${token}`
                    }
                }
            );
            console.log('Fetched Data:', response);
            setTripDetails(response.data.data[0]);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [id]);

    // const obj = tripDetails[0];
    // // const { date, iD, mineName, quantity, rate, remarks, role, tripType, trips, username, vehicle, withLead } = obj;
    // console.log(obj);
    return (
        <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                <SubCard darkTitle title="Tripdetails" secondary={<img src={Logo} alt="logo" width="70px" />}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Mining Trip Details
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Date : {tripDetails.date}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <table
                            style={{
                                borderCollapse: 'collapse',
                                width: '100%',
                                border: '1px solid #e0e0e0'
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Username :
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px'
                                        }}
                                    >
                                        {tripDetails.username}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Mine:
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px'
                                        }}
                                    >
                                        {tripDetails.mine_name}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Role:
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px'
                                        }}
                                    >
                                        {tripDetails.role}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Vehicle Type:
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px'
                                        }}
                                    >
                                        {tripDetails.vehicle}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Trip Type:
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px'
                                        }}
                                    >
                                        {tripDetails.trip_type}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Lead:
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px'
                                        }}
                                    >
                                        {tripDetails.with_lead}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Trips:
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px'
                                        }}
                                    >
                                        {tripDetails.trips}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        QtyMT:
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px'
                                        }}
                                    >
                                        {tripDetails.quantity}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Rate:
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px'
                                        }}
                                    >
                                        {tripDetails.rate}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Amt:
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px'
                                        }}
                                    >
                                        {tripDetails.amount}
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Remarks:
                                    </td>
                                    <td
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            padding: '8px'
                                        }}
                                    >
                                        {tripDetails.remarks}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CardContent>
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
