import { Container } from '@mui/material';
import './App.css';
import {NavBar} from './components/NavBar';
import { useState} from 'react';
import {
  Outlet,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function App() {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <NavBar />
        <ToastContainer/>
        <Container>
          <Outlet/>
        </Container>
      </LocalizationProvider>
    </>

  );
}

export default App;
