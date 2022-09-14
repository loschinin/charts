import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Header from "./Header/Header";

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
              <Route path="/" element={<div />} />
              <Route path="/settings" element={<div />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
