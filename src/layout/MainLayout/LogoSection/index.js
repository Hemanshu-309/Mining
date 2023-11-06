import { Link as RouterLink } from 'react-router-dom';
// material-ui
import { Link, Typography } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
// import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="berry logo" sx={{ textDecoration: 'none' }}>
        {/* <Logo /> */}
        <Typography variant="h1">Mining</Typography>
    </Link>
);

export default LogoSection;
