import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from './components/Home/Home'
import Layout from './components/Home/Layout';
import Login from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import ProfilePageGucci from './components/Profile/ProfileGucci';
import Direccion from './components/Profile/Direccion';
import Tienda from './components/Tienda/Tienda';
import Error from './components/Error';
import PanData from './components/PanData';
import MapaWeb from './components/MapaWeb';
import Carrito from './components/Carrito';
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
              <Tienda />
          } />
          <Route path='/pan/:id' element={
              <PanData />
          } />
          <Route path='/carrito' element={
              <Carrito />
          } />
          <Route path='/mapa' element={<MapaWeb />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
