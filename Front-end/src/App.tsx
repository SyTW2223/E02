import React from 'react';
import './App.css'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from './components/Home'
import Layout from './components/Layout';
import Login from './components/Login';
import ProfilePageGucci from './components/ProfileGucci';
import Direccion from './components/Direccion';
import Tienda from './components/Tienda/Tienda';

import Error from './components/Error';
import PanData from './components/PanData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const value = useSelector((state: any) => state.auth)
  console.log(value);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<ProfilePageGucci />} />
        <Route path='/direccion' element={<Direccion />} />
        <Route path='/tienda' element={<Tienda />} />
        <Route path='/pan/:id' element={<PanData />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
