import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Dialog,
    Fab,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Modal,
    Rating,
    Select,
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
import TripAdd from './TripAdd';
import MainCard from 'ui-component/cards/MainCard';
// import { GridFilterForm } from '@mui/x-data-grid/components';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/system';

// table sort
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

function stableSort(array, comparator) {
    console.log(array);
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells = [
    {
        id: 'ID',
        numeric: true,
        label: 'ID',
        align: 'center',
        editable: true
    },
    {
        id: 'Triptype',
        numeric: false,
        label: 'Triptype',
        align: 'left',
        editable: true
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
        <>
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
        </>
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

const TripList = () => {
    const theme = useTheme();

    const token = localStorage.getItem('accessToken');
    // console.log(token);

    const [open, setOpen] = React.useState(false);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setselected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState(rows);
    const [editRowIndex, setEditRowIndex] = React.useState(null);
    const [editedData, setEditedData] = React.useState({ id: null, type: '' });
    const [filter, setFilter] = React.useState({ column: '', value: '' });
    const [isGridVisible, setIsGridVisible] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackmode, setSnackMode] = React.useState('');

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
            const data = response.data.data;
            console.log(data);
            setRows(data);

            setFilteredRows(data);
        } catch (error) {
            console.error('An error occurred while fetching data:', error.message);
        }
    };

    React.useEffect(() => {
        getTrip();
    }, [token]);
    React.useEffect(() => {
        setRows(rows);
    }, [rows]);

    const handleFilter = () => {
        setIsGridVisible(true);
    };

    const handleFilterClose = () => {
        setIsGridVisible(false);
        getTrip();
    };

    const handleChange = (event) => {
        try {
            const { name, value } = event.target;
            setFilter({ ...filter, [name]: value });
        } catch (e) {
            console.log(e);
        }
    };

    // const handleFilterClick = () => {
    //     console.log('Filter:', filter);
    //     const filteredData = rows.filter((row) => {
    //         console.log('Row:', row);
    //         console.log('Column Value:', filter.column);
    //         console.log('Filter Value:', filter.value);
    //         return String(row[filter.column]).toLowerCase().includes(filter.value.toLowerCase());
    //     });
    //     console.log('Filtered Data:', filteredData);
    //     setRows(filteredData);
    //     setIsGridVisible(true);
    // };

    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
        getTrip();
    };

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString);

        if (!newString) {
            getTrip();
            return;
        }

        const newFilteredRows = rows.filter(
            (row) => row.id.toString().includes(newString) || row.type.toLowerCase().includes(newString.toLowerCase())
        );

        setRows(newFilteredRows);
    };

    const handleEditClick = (index, rowData) => {
        setEditRowIndex(index);
        setEditedData(rowData);
    };

    const handleEditSubmit = async () => {
        // Update the data in your rows array with the editedData
        const updatedRows = rows.map((row, index) => {
            if (index === editRowIndex) {
                return editedData;
            }
            return row;
        });
        try {
            const response = await axios.post('http://10.201.1.198:8000/trip/updateTripType', editedData, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `b ${token}`
                }
            });
            if (!response.data.error) {
                setSnackbarMessage('TripType Updated Successfully');
                setOpenSnackbar(true);
                setSnackMode('success');
                getTrip();
                setselected([]);
            } else {
                setSnackbarMessage(`${response.data.message}`);
                setOpenSnackbar(true);
                setSnackMode('warning');
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
                'http://10.201.1.198:8000/trip/deleteMultipleTripType',
                { ids: selected },
                {
                    // Send the selected.id triptypes to be deleted
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `b ${token}`
                    }
                }
            );
            // Handle success or show a confirmation message
            console.log('Triptypes deleted successfully', response.data);
            if (!response.data.error) {
                setSnackbarMessage('TripType inactivated Successfully');
                setOpenSnackbar(true);
                setSnackMode('success');
                getTrip();
            } else {
                setSnackbarMessage(`${response.data.message}`);
                setOpenSnackbar(true);
                setSnackMode('warning');
            }
            // You may also want to update your local state to remove the deleted triptypes
            // getTrip();
            // Clear the selected.id checkboxes
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

    const isselected = (id) => selected.indexOf(id) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
            <MainCard title="Triptypes" content={false}>
                <CardContent>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        {/* <GridFilterForm filters={filter} onFilterChange={handleFilterChange} onFilterSubmit={handleFilterSubmit} /> */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleSearch}
                                placeholder="Search Triptypes"
                                value={search}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                            {/* product add & dialog */}
                            {/* <Tooltip title="Filter Triptypes">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={handleFilter}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <FilterListIcon fontSize="small" />
                                </Fab>
                            </Tooltip> */}
                            <Tooltip title="Add Triptypes">
                                <Fab
                                    color="primary"
                                    size="small"
                                    onClick={handleClickOpenDialog}
                                    sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                >
                                    <AddIcon fontSize="small" />
                                </Fab>
                            </Tooltip>
                            <TripAdd open={open} handleCloseDialog={handleCloseDialog} setOpen={setOpen} getTrip={getTrip} />
                            {isGridVisible && (
                                <Container>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <FormControl variant="outlined">
                                                <Select
                                                    value={filter.column}
                                                    onChange={handleChange}
                                                    name="column"
                                                    placeholder="Select Column"
                                                >
                                                    {headCells.map((item) => (
                                                        <MenuItem key={item.id} value={item.id}>
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Search"
                                                variant="outlined"
                                                value={filter.value}
                                                name="value"
                                                onChange={handleChange}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">&#128269;</InputAdornment>
                                                }}
                                            />
                                        </Grid>
                                        {/* <Grid item>
                                            <Button variant="contained" color="primary" onClick={handleFilterClick}>
                                                Filter
                                            </Button>
                                        </Grid> */}
                                        <Grid item>
                                            <Button variant="contained" color="secondary" onClick={handleFilterClose}>
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Container>
                            )}
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
                                            <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.id)}>
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
                                                {/* <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {' '}
                                                {row.type}{' '}
                                            </Typography> */}
                                                {isEditing ? (
                                                    <TextField
                                                        value={editedData.type}
                                                        onChange={(e) => setEditedData({ ...editedData, type: e.target.value })}
                                                    />
                                                ) : (
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                    >
                                                        {row.type}
                                                    </Typography>
                                                )}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                // onClick={(event) => handleClick(event, row.id)}
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
                                                    {row.status === '1' ? (
                                                        <Button variant="outlined" color="success">
                                                            Active
                                                        </Button>
                                                    ) : (
                                                        <Button variant="outlined" color="error">
                                                            Inactive
                                                        </Button>
                                                    )}
                                                </Typography>
                                                {/* )} */}
                                            </TableCell>
                                            <TableCell align="center" sx={{ pr: 3 }}>
                                                {/* Conditionally render Edit or Save button */}
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

export default TripList;
