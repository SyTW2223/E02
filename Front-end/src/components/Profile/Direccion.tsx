import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap'

export default function Direccion() {
  // Variables de direccion
  const [calle, setCalle] = useState('')
  const [numero, setNumero] = useState('')
  const [codigoPostal, setCodigoPostal] = useState('')
  const [provincia, setProvincia] = useState('')
  const [pais, setPais] = useState('')
  const [botonRes, setBotonRes] = useState(0)
  const [perfilRes, setPerfilRes] = useState(0)
  const [state, setState] = useState(0);

  useEffect(() => {
    setState(0);
    const user = JSON.parse(localStorage.getItem('usuario') || '{}')

    traerDireccion(user.usuario[0].correo, user.token);
  }, [state]);

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
      console.log(data.direccion[0].codigoPostal)
      setCalle(data.direccion[0].calle);
      setNumero(data.direccion[0].numero);
      setCodigoPostal(data.direccion[0].codigoPostal);
      setProvincia(data.direccion[0].provincia);
      setPais(data.direccion[0].pais);

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
    if (perfilRes === 200) {
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
      body: JSON.stringify({ "correo": user.usuario[0].correo, calle, numero, codigoPostal, provincia, pais })
    };

    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + "/direccion?correo=" + user.usuario[0].correo, requestOptions);
    const data = await response.json();
    if (data.res === 201) {
      setPerfilRes(200);
      setState(200);
    } else {
      setPerfilRes(400);
      setState(400);
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
      body: JSON.stringify({ calle, numero, codigoPostal, provincia, pais })
    };

    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + "/direccion?correo=" + user.usuario[0].correo, requestOptions);
    const data = await response.json();

    if (data.res === 200) {
      setPerfilRes(200);
      setState(200);
    } else {
      setPerfilRes(400);
      setState(400);
    }
  }



  return (
    <>
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
    </>
  );
}