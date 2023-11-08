import { Link as RouterLink } from 'react-router-dom';
// material-ui
import { Link, Typography } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
// import Logo from 'ui-component/Logo';
import Logo from '../../../assets/images/minelogo.jpg';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link
        component={RouterLink}
        to={DASHBOARD_PATH}
        aria-label="berry logo"
        sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
    >
        {/* <Logo /> */}
        <img src={Logo} alt="Logo" style={{ height: 'auto', width: '50px' }} />
        <Typography variant="h1">Mining</Typography>
    </Link>
);

export default LogoSection;
