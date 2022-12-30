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
import { Button, Form } from 'react-bootstrap'


export default function ProfilePageGucci() {
  // Variables de nombre
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [correo, setCorreo] = useState('')
  const [res, setRes] = useState(0)

  // Variables de direccion
  const [calle, setCalle] = useState('')
  const [numero, setNumero] = useState('')
  const [codigoPostal, setCodigoPostal] = useState('')
  const [provincia, setProvincia] = useState('')
  const [pais, setPais] = useState('')
  const [botonRes, setBotonRes] = useState(0)
  const [perfilRes, setPerfilRes] = useState(0)

  // Obtenemos el usuario del localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}')
 
    setNombre(user.usuario[0].nombre);
    setApellidos(user.usuario[0].apellidos);
    setCorreo(user.usuario[0].correo);
    
    traerDireccion(user.usuario[0].correo, user.token);
  }, [res, perfilRes]);


  // Obtenemos la direccion del usuario
  async function traerDireccion(correo: string, token: string) {
   
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: "Bearer " + token,
      },
    };

    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + "/direccion?correo=" + correo, requestOptions);
    const data = await response.json();

    if (data.res === 404) {
      setBotonRes(404);

    } else if (data.res === 200) {
      setCalle(data.calle);
      setNumero(data.numero);
      setCodigoPostal(data.codigoPostal);
      setProvincia(data.provincia);
      setPais(data.pais);

      setBotonRes(200);
    }
  }

  // Modificamos  |  creamos direccion
  function botonDireccion() {
    if (botonRes === 404) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }} className="mb-3">
          <Button variant="primary" type="submit" onClick={submitHandlerDireccionPOST}>
            Crear dirección
          </Button>
        </div>
      )
    } else if (botonRes === 200) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }} className="mb-3">
          <Button variant="primary" type="submit" onClick={submitHandlerDireccionPATCH}>
            Modificar direccion
          </Button>
        </div>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

  // Errores de direccion
  function feedBackDireccion() {
    if (perfilRes=== 200) {
      return (
        <div className='text-center mt-3 fs-5 mb-4' style={{ color: 'green' }}>
          Dirección modificada correctamente.
        </div>
      )
    } else if (perfilRes === 400) {
      return (
        <div className='text-center mt-3 fs-5 mb-4' style={{ color: "red" }}>
          No se ha podido modificar, comprueba los datos y vuelva a intentarlo.
        </div>
      )
    } else if (perfilRes === 3000) {
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


  // Peticion POST a la API para crear una direccion
  const submitHandlerDireccionPOST = async (e: any) => {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}')
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({"correo": user.usuario[0].correo, calle, numero, codigoPostal, provincia, pais})
    };

    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + "/direccion?correo=" + user.usuario[0].correo, requestOptions);
    const data = await response.json();
    if (data.res === 201) {
      setPerfilRes(200);
    } else {
      setPerfilRes(400);
    }
  }

  const submitHandlerDireccionPATCH = async (e: any) => {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}')
    e.preventDefault()

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({calle, numero, codigoPostal, provincia, pais})
    };

    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + "/direccion?correo=" + user.usuario[0].correo, requestOptions);
    const data = await response.json();
    if (data.res === 200) {
      setPerfilRes(200);
    } else {
      setPerfilRes(400);
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
                <a href="profile">User</a>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

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
        
        {/*Formulario de Direccion*/}
        <Form >
          <MDBRow className='justify-content-center align-items-center'>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow className='mb-3'>
                    <MDBTypography tag="h3" style={{ color: "black", }} className='text-center'>Dirección</MDBTypography>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Calle</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <input
                        type="text"
                        id='calle'
                        className="form-control"
                        value={calle}
                        onChange={(e) => setCalle(e.target.value)}>
                      </input>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Número de teléfono</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <input
                        type="text"
                        id='numero'
                        className="form-control"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}>
                      </input>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Codigo Postal</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <input
                        type="text"
                        id='codigoPostal'
                        className="form-control"
                        value={codigoPostal}
                        onChange={(e) => setCodigoPostal(e.target.value)}>
                      </input>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Provincia</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <input
                        type="text"
                        id='provincia'
                        className="form-control"
                        value={provincia}
                        onChange={(e) => setProvincia(e.target.value)}>
                      </input>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Pais</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <input
                        type="text"
                        id='pais'
                        className="form-control"
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}>
                      </input>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </Form>

        <>
          {botonDireccion()}
        </>
        <>
          {feedBackDireccion()}
        </>

        <hr />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button href='/tarjetas' variant="primary" type="submit">Gestionar tarjetas</Button>
        </div>
      </MDBContainer>
    </section>
  );
}