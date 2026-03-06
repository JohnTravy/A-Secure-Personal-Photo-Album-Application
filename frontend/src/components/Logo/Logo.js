// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        letterSpacing: '0.5px',
        color: theme.palette.primary.main
      }}
    >
      My Album
    </Typography>
  );
};

export default Logo;
