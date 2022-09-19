import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import chart from './logo.png';
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  const theme = useTheme();
  const { text } = theme.palette;
  const location = useLocation();
  const navLinks = ['charts', 'settings'];
  return (
    <AppBar component="nav" sx={{ background: theme.palette.background.default }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img style={{ width: '30px' }} src={chart} alt={''} />
        </Typography>
        <Box>
          {navLinks.map(link => {
            const isLinkActive =
              location.pathname === `/${link}` || (location.pathname === '/' && link === 'charts');
            return (
              <Link key={link} to={link === 'charts' ? '/' : link}>
                <Button
                  key={link}
                  sx={{
                    color: isLinkActive ? text.primary : text.secondary,
                    fontSize: 20,
                    width: '120px',
                  }}
                >
                  {link}
                </Button>
              </Link>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
