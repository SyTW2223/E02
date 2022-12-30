import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import {Row, Col, Button, Form} from 'react-bootstrap'

export default function ProfilePageGucci() {
  // Variebles del formulrio
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [correo, setCorreo] = useState('')

  // Obtenemos el usuario del localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario')|| '{}')
    if(user){
      setNombre(user.usuario[0].nombre)
      setApellidos(user.usuario[0].apellidos)
      setCorreo(user.usuario[0].correo)
    }
  }, []);

  // Manejamos respuesta del servidor
  function handleResponse(response: any) {
    return response.text().then((text: any) => {
      const data = text && JSON.parse(text);
      return data;
    });
  }

  // Modificamos el store
  const submitHandler = async(e:any)  => {
    const user = JSON.parse(localStorage.getItem('usuario')|| '{}')
    e.preventDefault()
    const requestOptions = {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
         authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({nombre, apellidos})
    };
    console.log("opciones modificar usuario",requestOptions)
    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + "/usuario?correo="+ user.usuario[0].correo, requestOptions);
    const data = await handleResponse(response);
    if(data.res === 200){
      user.usuario[0].nombre = nombre
      user.usuario[0].apellidos = apellidos
      localStorage.setItem('usuario', JSON.stringify(user));
    }
  }
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <Form>
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4"> 
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">                    
                    <MDBCardText>Nombre</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <input 
                    type="text" 
                    id='nombre' 
                    className="form-control"
                    value = {nombre}
                    onChange = {(e) => setNombre(e.target.value)}>
                    </input>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Apellidos</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <input
                      type="text"
                      id='apellidos'
                      className="form-control"
                      value = {apellidos}
                      onChange = {(e) => setApellidos(e.target.value)}>
                    </input>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Correo</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{correo}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        </Form>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Guardar
        </Button>
        </div>
        <hr />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button href='/direccion' variant="secondary" type="submit">Dirección</Button>
          <Button href='/tarjetas' variant="primary" type="submit">Tarjetas</Button>
        </div>
      </MDBContainer>
    </section>
  );
}