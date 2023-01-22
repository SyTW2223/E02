import { MDBBreadcrumb, MDBBreadcrumbItem, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { CantidadCarrito } from './CantidadCarrito';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ordenar, eliminarTodo } from '../../features/carrito/carritoSlice';
import { BsShop } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../../css/Login.module.css';
export default function Carrito() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userState.userData);
  const carrito = useAppSelector((state) => state.carrito.carritoData);

  const [panNombres, setpanNombres] = useState([""]);
  const [panImage, setpanImage] = useState([""]);
  const [panPrecios, setpanPrecios] = useState([0]);
  const [vacio, setVacio] = useState(true);

  useEffect(() => {
    dispatch(ordenar());
    if (carrito.length > 0) {
      setVacio(false);
      let ids: number[] = []

      for (let i: number = 0; i < carrito.length; i++) {
        ids.push(+carrito[i].id);
      }
      peticion(ids);
    } else {
      setVacio(true);
    }
  }, []);

  useEffect(() => {
    if (carrito.length === 0) {
      setVacio(true);
    }
  }, [carrito]);

  function Imagenes(numeros: number[]) {
    let binary: string = "";
    const bytes = [...new Uint8Array(numeros)];
    for (let i:number = 0; i < bytes.length; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }

    return btoa(binary);
  }

  async function peticion(ids: number[]) {

    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + user.token
      }
    };

    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;

    const response = await fetch(direccion + "/panCarrito?identificadores=" + ids, requestOptions);
    const data = await response.json();

    let auxNombre: string[] = []
    let auxPrecio: number[] = []
    let auxImage: any[] = []
    for (let i: number = 0; i < data.pan.length; i++) {
      auxNombre.push(data.pan[i].nombre)
      auxPrecio.push(data.pan[i].precio)
      auxImage.push(data.pan[i].image)
    }
    // Convertir el buffer a string
    auxImage = auxImage.map((elemento: any) => Imagenes(elemento.data));
    setpanNombres(auxNombre);
    setpanPrecios(auxPrecio);
    setpanImage(auxImage);
  }

  function handleCompra() {
    if (user.token) {
      dispatch(eliminarTodo());
    } else {
      window.location.href = "/login";
    }
  }


  if (vacio)
    return (
      <>
        <MDBRow className='d-flex justify-content-center pt-4 pb-2'>
          <MDBCol className='col-12 d-flex justify-content-center'>
            <div className="">
              <h1 className="h1 mb-3 font-weight-bold text-center">No hay productos en el carrito</h1>
              <p className='text-center fs-3'>Si lo desea puede acceder a la tienda haciendo click en el botón de abajo</p>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow className='d-flex justify-content-center pb-4'>
          <MDBCol className='col-12 d-flex justify-content-center'>
            <MDBBtn className={`${styles.loginButton} mx-2`} href='/tienda'>Tienda</MDBBtn>
          </MDBCol>
        </MDBRow>
        <MDBRow className='d-flex justify-content-center pb-4'>
          <MDBCol className='col-12 d-flex justify-content-center'>
            <BsShop size={150} />
          </MDBCol>
        </MDBRow>
      </>
    )
  else {
    return (
      <section style={{ backgroundColor: '#eee' }}>

        <MDBContainer className="py-5 px-0">

          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <a href='/'>Home</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>
                  <a href="/carrito">Carrito</a>
                </MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>

          <MDBRow className="d-flex justify-content-center">
            <MDBCol className='col-xl-9 col-12'>
              {carrito.map((elemento, index) => (
                <MDBRow key={index} className="d-flex justify-content-center my-4 mx-4" style={{ color: "black" }}>
                  <MDBCard style={{ width: "1200px" }}>
                    <MDBCardBody>
                      <MDBRow>
                        {
                          <MDBCol className='col-12 col-sm-12 col-md-12 col-lg-3'>
                            <div className='d-flex justify-content-center'>
                              <MDBCardImage src={`data:image/png;base64,${panImage[index]}`}
                                alt="Imagen" className="my-3 " style={{ width: '350px' }} fluid />
                            </div>
                            <CantidadCarrito id={carrito[index].id} />
                          </MDBCol>
                        }
                        <MDBCol className='mt-2 col-12 col-sm-4 col-md-4 col-lg-3 sm-12 '>
                          <h2 className="h2 mb-3 font-weight-bold text-center">Nombre:</h2>
                          <h2 className="h2 mb-3 font-weight-bold text-center">{panNombres[index]}</h2>
                        </MDBCol>
                        <MDBCol className='mt-2 col-12 col-sm-4 col-md-4 col-lg-3'>
                          <h2 className="h2 mb-3 font-weight-bold text-center">Precio por unidad:</h2>
                          <h3 className="h3 mb-3 font-weight-bold text-center">{panPrecios[index]}€</h3>
                        </MDBCol>
                        <MDBCol className='mt-2 col-12 col-sm-4 col-md-4 col-lg-3'>
                          <h2 className="h2 mb-3 font-weight-bold text-center">Precio total:</h2>
                          <h3 className="h3 mb-3 font-weight-bold text-center">{elemento.cantidad * panPrecios[index]}€</h3>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBRow>
              ))}
            </MDBCol>
            <MDBCol className='col-12 col-xl-3 my-4 d-flex justify-content-center'>
              <MDBCard style={{ width: "300px", height: "140px" }}>
                <MDBCardBody className='d-flex justify-content-center'>
                  <button className="btn btn-outline-warning" data-mdb-ripple-color="dark" onClick={() => handleCompra()}>
                    <FaShoppingCart className='mx-2' size={30} />
                    Finalizar compra
                  </button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    )
  }
}