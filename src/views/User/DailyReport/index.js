import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
    CardContent,
    Checkbox,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
// import ContractorAdd from './ContractorAdd';
import MainCard from 'ui-component/cards/MainCard';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Navigate, useNavigate } from 'react-router-dom';
// import NoData from 'assets/images/nodata.jpeg';

// table sort
const url = process.env.REACT_APP_HOST_URL;
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

// table header options
const headCells = [
    {
        id: 'id',
        numeric: true,
        label: 'ID',
        align: 'center'
    },
    {
        id: 'username',
        numeric: false,
        label: 'Username',
        align: 'left'
    },
    {
        id: 'role',
        numeric: false,
        label: 'Role',
        align: 'left'
    },
    {
        id: 'triptype',
        numeric: false,
        label: 'TripType',
        align: 'left'
    },
    {
        id: 'minename',
        numeric: false,
        label: 'MineName',
        align: 'left'
    },
    {
        id: 'withlead',
        numeric: false,
        label: 'WithLead',
        align: 'left'
    },
    {
        id: 'trips',
        numeric: true,
        label: 'Trips',
        align: 'left'
    },
    {
        id: 'quantity',
        numeric: true,
        label: 'Quantity',
        align: 'left'
    },
    {
        id: 'rate',
        numeric: true,
        label: 'Rate',
        align: 'left'
    },
    {
        id: 'amount',
        numeric: true,
        label: 'Amount',
        align: 'left'
    },
    {
        id: 'date',
        numeric: false,
        label: 'Date',
        align: 'left'
    },
    {
        id: 'status',
        numeric: false,
        label: 'Status',
        align: 'left'
    }
];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numselected, rowCount, onRequestSort, theme, selected, handleDelete }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numselected > 0 && numselected < rowCount}
                        checked={rowCount > 0 && numselected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {numselected > 0 && (
                    <TableCell padding="none" colSpan={7}>
                        <EnhancedTableToolbar numselected={selected.length} handleDelete={handleDelete} />
                    </TableCell>
                )}
                {numselected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell?.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                {numselected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}>
                            Action
                        </Typography>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    theme: PropTypes.object,
    selected: PropTypes.object,
    numselected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired
};

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numselected, handleDelete }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numselected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numselected > 0 ? (
            <Typography color="inherit" variant="h4">
                {numselected} selected.id
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
                Nutrition
            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {numselected > 0 && (
            <Tooltip title="Delete">
                <IconButton size="large">
                    <DeleteIcon fontSize="small" onClick={handleDelete} />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numselected: PropTypes.number.isRequired,
    handleDelete: PropTypes.object.isRequired
};

// ==============================|| PRODUCT LIST ||============================== //

const ReportList = () => {
    const theme = useTheme();

    const token = localStorage.getItem('accessToken');

    const [open, setOpen] = React.useState(false);
    // const [value, setValue] = React.useState({
    //     fromDate: new Date(),
    //     toDate: new Date()
    // });
    // const [fromDate, setfromDate] = React.useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
    // const [toDate, settoDate] = React.useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);

    const [fromDate, setfromDate] = React.useState(``);
    const [toDate, settoDate] = React.useState(``);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setselected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState(rows);
    const [editRowIndex, setEditRowIndex] = React.useState(null);
    const [editedData, setEditedData] = React.useState({ id: null, name: '' });
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [formData, setFormData] = React.useState({
        date1: fromDate,
        date2: toDate,
        search: ''
        // limit: rowsPerPage
    });

    const navigate = useNavigate();

    const url = process.env.REACT_APP_HOST_URL;

    console.log(fromDate, formData, toDate);
    function stableSort(arr, comparator) {
        if (!Array.isArray(arr)) {
            return [];
        }
        const stabilizedThis = arr.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const getReport = async () => {
        try {
            const response = await axios.post(
                `${url}/reports/getDailyReport`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `b ${token}`
                    }
                }
            );
            const data = response.data.data;
            setRows(data);
            console.log(data);
            setFilteredRows(data);
        } catch (error) {
            console.error('An error occurred while fetching data:', error.message);
        }
    };

    const filterTable = async () => {
        try {
            const response = await axios.post(`${url}/reports/paginateDailyReport`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `b ${token}`
                }
            });
            const data = response.data.data.rows;
            setRows(data);
            console.log(response);
            if (data.length !== 0) {
                setStatus('success');
                setSnackbarMessage(`Data filtered successfully`);
                setOpenSnackbar(true);
            }
            // setFilteredRows(data);
        } catch (error) {
            console.error('An error occurred while fetching data:', error.message);
        }
    };

    React.useEffect(() => {
        getReport();
    }, [token]);
    React.useEffect(() => {
        setRows(rows);
    }, [rows]);

    // React.useEffect(() => {
    //     filterTable();
    // }, [formData]);

    const handleClickOpenDialog = () => {
        if (open) {
            setOpen(false);
            setFormData({
                date1: '',
                date2: '',
                search: ''
            });
        } else {
            setOpen(true);
        }

        if (!open) {
            getReport();
        }
    };
    const handleCloseDialog = () => {
        setOpen(false);
        getReport();
    };

    const handleFilter = () => {
        filterTable();
        handleClickOpenDialog();
    };

    // const handleSearch = (event) => {
    //     const newString = event?.target.value;
    //     setSearch(newString);

    //     if (!newString) {
    //         getReport();
    //         return;
    //     }

    //     const newFilteredRows = rows.filter(
    //         (row) =>
    //             row.id.toString().includes(newString) ||
    //             row.username.toLowerCase().includes(newString.toLowerCase()) ||
    //             row.role.toLowerCase().includes(newString.toLowerCase()) ||
    //             row.vehicle.toLowerCase().includes(newString.toLowerCase()) ||
    //             row.trip_type.toLowerCase().includes(newString.toLowerCase()) ||
    //             row.mine_name.toLowerCase().includes(newString.toLowerCase()) ||
    //             row.with_lead.toLowerCase().includes(newString.toLowerCase()) ||
    //             row.trips.toLowerCase().includes(newString.toLowerCase()) ||
    //             row.quantity.toLowerCase().includes(newString.toLowerCase()) ||
    //             row.rate.toLowerCase().includes(newString.toLowerCase()) ||
    //             row.amount.toLowerCase().includes(newString.toLowerCase()) ||
    //             row.date.toLowerCase().includes(newString.toLowerCase())
    //     );

    //     setRows(newFilteredRows);
    // };
    const handleSearch = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditClick = (index, rowData) => {
        setEditRowIndex(index);
        setEditedData(rowData);
    };

    const handleEditSubmit = async () => {
        const updatedRows = rows.map((row, index) => {
            if (index === editRowIndex) {
                return editedData;
            }
            return row;
        });
        try {
            const response = await axios.post(`${url}/role/updateRole`, editedData, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `b ${token}`
                }
            });
            if (!response.data.error) {
                setSnackbarMessage('Data Updated Successfully');
                setOpenSnackbar(true);
                // alert('data updated successfully');
            } else {
                setSnackbarMessage(`${response.data.message}`);
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('An error occurred while fetching data:', error.message);
        }

        // Update the rows with the edited data
        setRows(updatedRows);
        // Clear edit mode
        setEditRowIndex(null);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post(
                `${url}/role/deleteMultipleRoles`,
                { ids: selected },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `b ${token}`
                    }
                }
            );
            if (!response.data.error) {
                setSnackbarMessage('Data Deleted Successfully');
                setOpenSnackbar(true);
            } else {
                setSnackbarMessage(`${response.data.message}`);
                setOpenSnackbar(true);
            }

            const updatedRows = rows.filter((row) => !selected.includes(row.id));
            setRows(updatedRows);
            setselected([]);
            console.log(selected);
        } catch (error) {
            console.error('An error occurred while deleting triptypes:', error.message);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setselected([]);
            } else {
                const newselected = rows.map((n) => n.name);
                setselected(newselected);
            }
            return;
        }
        setselected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newselected = [];

        if (selectedIndex === -1) {
            newselected = newselected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newselected = newselected.concat(selected.slice(1));
        } else if (selectedIndex === selected.id.length - 1) {
            newselected = newselected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newselected = newselected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setselected(newselected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const handleChangefromDate = (fromDate) => {
        const formattedFromDate = fromDate ? fromDate.toISODate() : '';

        setfromDate(formattedFromDate);
        setFormData({ ...formData, date1: formattedFromDate });
    };

    const handleChangetoDate = (toDate) => {
        const formattedToDate = toDate ? toDate.toISODate() : '';

        settoDate(formattedToDate);
        setFormData({ ...formData, date2: formattedToDate });
    };

    const isselected = (id) => selected.indexOf(id) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={status === 'success' ? 'success' : 'warning'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <MainCard title="Daily Reports" content={false}>
                <CardContent>
                    {open ? (
                        <>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={12} lg={6}>
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
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} lg={6}>
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
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small" />
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={(e) => handleSearch(e)}
                                        placeholder="Filter text..."
                                        value={formData.search}
                                        size="large"
                                        name="search"
                                    />
                                </Grid>
                                <Grid item xs={12} lg={2}>
                                    <Button type="submit" variant="contained" style={{ padding: '0.5rem' }} onClick={handleFilter}>
                                        Apply
                                    </Button>
                                </Grid>
                                {/* <Grid item xs={12} lg={2}>
                                <Button type="submit" variant="contained" style={{ padding: '0.8rem' }} onClick={handleClickOpenDialog}>
                                Cancel
                                </Button>
                            </Grid> */}
                            </Grid>
                        </>
                    ) : (
                        ''
                    )}
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12} sx={{ textAlign: 'right' }}>
                            <Tooltip title="Filter">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={handleClickOpenDialog}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <FilterListIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                            {/* <ContractorAdd open={open} handleCloseDialog={handleCloseDialog} setOpen={setOpen} /> */}
                            {/* </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}> */}
                            <Tooltip title="Add Contractor">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        navigate('/user/tripdetails');
                                    }}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                            {/* <ContractorAdd open={open} handleCloseDialog={handleCloseDialog} setOpen={setOpen} /> */}
                        </Grid>
                    </Grid>
                </CardContent>

                {/* table */}
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numselected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={filteredRows.length}
                            theme={theme}
                            selected={selected}
                            handleDelete={handleDelete}
                        />
                        {rows.length !== 0 ? (
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        /** Make sure no display bugs if row isn't an OrderData object */
                                        if (typeof row === 'number') return null;
                                        const isItemselected = isselected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        const isEditing = index === editRowIndex;

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemselected}
                                                tabIndex={-1}
                                                key={index}
                                                selected={isItemselected}
                                            >
                                                <TableCell
                                                    padding="checkbox"
                                                    sx={{ pl: 3 }}
                                                    onClick={(event) => handleClick(event, row.id)}
                                                >
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemselected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                    >
                                                        {' '}
                                                        #{row.id}{' '}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedData.name}
                                                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                        >
                                                            {row.username}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedData.name}
                                                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                        >
                                                            {row.role}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedData.name}
                                                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                        >
                                                            {row.trip_type}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedData.name}
                                                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                        >
                                                            {row.mine_name}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedData.name}
                                                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                        >
                                                            {row.with_lead}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedData.name}
                                                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                        >
                                                            {row.trips}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedData.name}
                                                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                        >
                                                            {row.quantity}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedData.name}
                                                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                        >
                                                            {row.rate}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedData.name}
                                                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                        >
                                                            {row.amount}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {isEditing ? (
                                                        <TextField
                                                            value={editedData.name}
                                                            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                        >
                                                            {row.date.slice(0, 10)}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {/* {isEditing ? (
                                                <TextField
                                                value={editedData.name}
                                                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                />
                                            ) : ( */}
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                    >
                                                        {row.status === '1' ? 'Active' : 'Inactive'}
                                                    </Typography>
                                                    {/* )} */}
                                                </TableCell>
                                                <TableCell align="center" sx={{ pr: 3 }}>
                                                    {isEditing ? (
                                                        <IconButton size="large" onClick={handleEditSubmit}>
                                                            <SaveAltIcon />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton size="large" onClick={() => handleEditClick(index, row)}>
                                                            <BorderColorIcon />
                                                        </IconButton>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        ) : (
                            <h1>No Data Found</h1>
                        )}
                    </Table>
                </TableContainer>

                {/* table pagination */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
        </>
    );
};
export default ReportList;
