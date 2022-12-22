import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBTypography, MDBCardText, MDBIcon, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PanData () {
  const {id} = useParams();
  const [panNombre, setpanNombre] = useState("");
  const [panTipo, setpanTipo] = useState("");
  const [panPrecio, setpanPrecio] = useState(0);
  const [panIngredientes, setpanIngredientes] = useState("");
  const [panDescripcion, setpanDescripcion] = useState("");
  const [panVendedor, setpanVendedor] = useState("");
  const [res, setRes] = useState(0);

  useEffect(() => {
    peticion();
  }, []);

  function handleResponse(response: any) {
    return response.text().then((text: any) => {
      const data = text && JSON.parse(text);
  
      return data;
    });
  }

  async function peticion() {
    const user = JSON.parse(localStorage.getItem('usuario')|| '{}')
    console.log(user)

    const requestOptions = {
      method: 'GET',
      headers: {
                authorization: 'Bearer ' + user.token
              }
    };
    console.log(user.token)

    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;

    const response = await fetch(direccion + "/pan?identificador=7", requestOptions);
    console.log(response)
    const data = await handleResponse(response);
    console.log(data)
    setRes(data.res);
    setpanNombre(data.pan[0].nombre);
    setpanTipo(data.pan[0].tipo);
    setpanPrecio(data.pan[0].precio);
    setpanIngredientes(data.pan[0].ingredientes);
    setpanDescripcion(data.pan[0].descripcion);
    setpanVendedor(data.pan[0].vendedor);
  }
  
  if (res === 404)
    return (
      <>
      <h1>Pan no encontrado</h1>
      </>
    )

  else if (res === 500)
    return (
      <>
      <h1>Error del servidor</h1>
      </>
    )

  else (res === 200)
    return (
      <section className="" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol lg="12" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '350px' }} fluid />
                  <MDBBtn className="btn btn-primary mt-5" style={{fontSize: "25px", padding: "20px 38px"}}>Comprar</MDBBtn>
                </MDBCol>

                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h1" className='text-center'>{panNombre}</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h2">Tipo</MDBTypography>
                        <MDBCardText tag="h4">{panTipo}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h2">Precio</MDBTypography>
                        <MDBCardText tag="h4">{panPrecio.toString() + " €" }</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h2">Descripción</MDBTypography>
                        <MDBCardText tag="h4">{panDescripcion}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h2">Ingredientes</MDBTypography>
                        <MDBCardText tag="h4">{panIngredientes}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h2">Vendedor</MDBTypography>
                        <MDBCardText tag="h4">{panVendedor}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}