import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBTypography, MDBCardText, MDBIcon, MDBCardBody, MDBBtn, MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PanData() {
  const { id } = useParams();
  const [panNombre, setpanNombre] = useState("");
  const [panTipo, setpanTipo] = useState("");
  const [panPrecio, setpanPrecio] = useState(0);
  const [panIngredientes, setpanIngredientes] = useState("");
  const [panDescripcion, setpanDescripcion] = useState("");
  const [panVendedor, setpanVendedor] = useState("");
  const [res, setRes] = useState(0);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    peticion();
  }, []);

  // Maneja la compra de un pan
  function manejarCompra() {
    let aux = false;
    const carrito = JSON.parse(localStorage.getItem('carrito') || '{}');

    if (carrito.length) {
      for (let i: number = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
          aux = true;
          carrito[i].cantidad += cantidad;
          break;
        }
      }
      if (!aux) carrito.push({ id: id, cantidad: cantidad });

      localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
      localStorage.setItem('carrito', JSON.stringify([{ id: id, cantidad: cantidad }]));
    }
  }


  async function peticion() {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}')

    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + user.token
      }
    };

    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;

    const response = await fetch(direccion + "/pan?identificador=" + id, requestOptions);
    const data = await response.json();
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

  else
  return (
    <section className="" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5" style={{ color: "black" }}>

      <MDBRow>
        <MDBCol>
          <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
            <MDBBreadcrumbItem>
              <a href='/tienda'>Tienda</a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>
              <a href={"/pan/" + id}>Pan</a>
            </MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBCol>
      </MDBRow>

        <MDBRow className="justify-content-center align-items-center">
          <MDBCol lg="12" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBRow className='d-flex justify-content-center'>
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar" className="my-5" style={{ width: '350px' }} fluid />
                  </MDBRow>
                  <MDBRow className='d-flex justify-content-center'>
                    <MDBCol>
                      <MDBTypography tag="h3" style={{ color: "black" }} className='text-center'>Cantidad:</MDBTypography>
                      <button style={{ borderRadius: '10px', border: "0px", backgroundColor: "#3b71ca", color: "white", width: "24px" }}
                        onClick={(e: any) => { setCantidad(cantidad - 1) }}>-</button>
                      <input type="number" value={cantidad} onChange={(e: any) => setCantidad(e.target.value)} style={{ width: '100px', marginRight: '5px', marginLeft: '5px', height: "30px" }} min="1" />
                      <button style={{ borderRadius: '10px', border: "0px", backgroundColor: "#3b71ca", color: "white", width: "24px" }} onClick={(e: any) => { setCantidad(cantidad + 1) }}>+</button>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='d-flex justify-content-center'>
                    <MDBBtn className="btn btn-primary mt-5" style={{ fontSize: "20px", padding: "20px 38px", width: "200px", height: "75px" }}
                      onClick={() => manejarCompra()}>Comprar</MDBBtn>
                  </MDBRow>
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
                        <MDBCardText tag="h4">{panPrecio.toString() + " €"}</MDBCardText>
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