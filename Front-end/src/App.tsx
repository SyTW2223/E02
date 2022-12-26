import React from 'react';
import './App.css'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from './components/Home'
import Layout from './components/Layout';
import Login from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import ProfilePageGucci from './components/ProfileGucci';
import Direccion from './components/Direccion';
import Tienda from './components/Tienda/Tienda';
import Error from './components/Error';
import PanData from './components/PanData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <ProfilePageGucci />
            </ProtectedRoute>
          } />
          <Route path='/direccion' element={<Direccion />} />
          <Route path='/tienda' element={
            <ProtectedRoute>
              <Tienda />
            </ProtectedRoute>
          } />
          <Route path='/pan/:id' element={
            <ProtectedRoute>
              <PanData />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
