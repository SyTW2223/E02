import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { personalInformationType, changePersonalInformation } from '../../features/user/userSlice';
export default function PersonalInformation() {

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.userData);
  // Variables de nombre
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [correo, setCorreo] = useState('')
  const [res, setRes] = useState(0)

  useEffect(() => {
    setNombre(user.nombre);
    setApellidos(user.apellidos);
    setCorreo(user.correo);
  }, [res, user]);


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
          <p>
            No se ha podido modificar, comprueba los datos y vuelva a intentarlo.
          </p>
          <p>
            Nombre y Apellidos: Longitud mínima 4 caracteres.
          </p>
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
    if (nombre === user.nombre && apellidos === user.apellidos) {
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
      const response = await fetch(direccion + "/usuario?correo=" + user.correo, requestOptions);
      const data = await response.json();
      if (data.res === 200) {
        const data: personalInformationType = {
          nombre: nombre,
          apellidos: apellidos
        }
        dispatch(changePersonalInformation(data));
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
