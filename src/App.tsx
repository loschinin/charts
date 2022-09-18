import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { Header } from './components/Header/Header';
import { Charts } from './components/Charts/Charts';
import { Settings } from './components/Settings/Settings';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: pink[500],
      },
    },
    shape: {
      borderRadius: 0,
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
