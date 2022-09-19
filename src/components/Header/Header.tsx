import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import chart from './chart.png';
import { useTheme } from '@mui/material/styles';
import './Header.css';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const navLinks = ['charts', 'settings'];
  return (
    <AppBar component="nav" sx={{ background: theme.palette.background.default }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
        >
          <img src={chart} alt={''} />
        </Typography>
        <Box sx={{ display: { sm: 'block' } }}>
          {navLinks.map(link => (
            <Link
              key={link}
              className={
                location.pathname === `/${link}` || (location.pathname === '/' && link === 'charts')
                  ? 'active'
                  : ''
              }
              to={link === 'charts' ? '/' : link}
            >
              <Button key={link} sx={{ color: '#fff' }}>
                {link.toUpperCase()}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
