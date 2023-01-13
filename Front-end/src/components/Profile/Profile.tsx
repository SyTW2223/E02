import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap'
import Direccion from './Direccion';
import PersonalInformation from './PersonalInformation';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/user/userSlice';
import { useEffect } from 'react';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.userData);

  useEffect(() => {
    handleLogout();

  }, []);

  async function handleLogout() {
    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + user.token
      }
    };

    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;

    const response = await fetch(direccion + "/token", requestOptions);
    const data = await response.json();
    if (data.res == 401) {
      dispatch(logout());
    }
  }

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='/'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>
                <a href="/profile">Usuario</a>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        {/*Formulario de Usuario*/}
        <PersonalInformation />

        {/*Formulario de Direccion*/}
        <Direccion />
        
      </MDBContainer>
    </section>
  );
}