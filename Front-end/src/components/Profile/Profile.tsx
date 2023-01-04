import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import { Button} from 'react-bootstrap'
import Direccion from './Direccion';
import PersonalInformation from './PersonalInformation';


export default function ProfilePage() {
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
                <a href="profile">User</a>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        {/*Formulario de Usuario*/}
        <PersonalInformation/>
        
        {/*Formulario de Direccion*/}
        <Direccion/>
        
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button href='/tarjetas' variant="primary" type="submit">Gestionar tarjetas</Button>
        </div>
      </MDBContainer>
    </section>
  );
}