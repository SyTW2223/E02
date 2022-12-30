import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import Profile from './Profile';
import Direccion from './Direccion';
import { Button, Form } from 'react-bootstrap'


export default function PersonalInformation() {
  // Variables de nombre
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [correo, setCorreo] = useState('')
  const [res, setRes] = useState(0)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}')
    setNombre(user.usuario[0].nombre);
    setApellidos(user.usuario[0].apellidos);
    setCorreo(user.usuario[0].correo);
  }, [res]);


  // Errores de usuario
  function feedBackPerfil() {
    if (res === 200) {
      return (
        <div className='text-center mt-3 fs-5 mb-4' style={{ color: 'green' }}>
          Usuario modificado correctamente.
        </div>
      )
    } else if (res === 400 || res === 404) {
      return (
        <div className='text-center mt-3 fs-5 mb-4' style={{ color: "red" }}>
          No se ha podido modificar, comprueba los datos y vuelva a intentarlo.
        </div>
      )
    } else if (res === 3000) {
      return (
        <div className='text-center my-3 fs-5' style={{ color: "black" }}>
          No se ha producido ninguna modificación.
        </div>
      )
    }
    else {
      return (
        <>
        </>
      )
    }
  }

  // Modificamos el usuario
  const submitHandler = async (e: any) => {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}')
    if (nombre === user.usuario[0].nombre && apellidos === user.usuario[0].apellidos) {
      setRes(3000);
    } else {
      e.preventDefault()
      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({ nombre, apellidos })
      };
      console.log("opciones modificar usuario", requestOptions)
      const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
      const response = await fetch(direccion + "/usuario?correo=" + user.usuario[0].correo, requestOptions);
      const data = await response.json();
      if (data.res === 200) {
        user.usuario[0].nombre = nombre
        user.usuario[0].apellidos = apellidos
        localStorage.setItem('usuario', JSON.stringify(user));
      }
      setRes(data.res);
    }
  }



  return (
    <>
      {/*Formulario de Usuario*/}
      <Form>
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
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}>
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
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}>
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
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Form>

      <div style={{ display: 'flex', justifyContent: 'center' }} className="mb-3">
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Guardar
        </Button>
      </div>
      <>
        {feedBackPerfil()}
      </>
    </>
  )
}
