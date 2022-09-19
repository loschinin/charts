import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import { Header } from './components/Header/Header';
import { Charts } from './components/Charts/Charts';
import { Settings } from './components/Settings/Settings';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: deepPurple[500],
      },
      background: { default: deepPurple[500] },
      text: { primary: deepPurple[50], secondary: deepPurple[200] },
    },
    shape: {
      borderRadius: 0,
    },
    typography: {
      allVariants: {
        color: deepPurple[50],
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { width: '100%', height: 56 },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Header />
        <div className={'container'}>
          <Routes>
            <Route path="/" element={<Charts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
