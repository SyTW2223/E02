import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { BsFillTrashFill } from 'react-icons/bs';
import { CantidadCarrito } from './CantidadCarrito';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { sumar, añadir, carritoType, ordenar, eliminar } from '../../features/carrito/carritoSlice';

export default function Carrito() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userState.userData);
  const carrito = useAppSelector((state) => state.carrito.carritoData);

  const [panNombres, setpanNombres] = useState([""]);
  const [panImage, setpanImage] = useState([""]);
  const [panPrecios, setpanPrecios] = useState([0]);
  const [cantidad, setCantidad] = useState([0]);
  const [res, setRes] = useState(0);
  const [vacio, setVacio] = useState(true);

  useEffect(() => {
    dispatch(ordenar());

    if (carrito.length) {
      setVacio(false);
      let ids: number[] = []

      for (let i: number = 0; i < carrito.length; i++) {
        ids.push(+carrito[i].id);
      }
      peticion(ids);
    }
  }, [carrito]);


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
    setRes(data.res)
    for (let i: number = 0; i < data.pan.length; i++) {
      auxNombre.push(data.pan[i].nombre)
      auxPrecio.push(data.pan[i].precio)
      auxImage.push(data.pan[i].image)
    }
    // Convertir el buffer a string
    auxImage = auxImage.map((elemento: any) => Buffer.from(elemento).toString('utf8'));
    setpanNombres(auxNombre);
    setpanPrecios(auxPrecio);
    setpanImage(auxImage);
  }


  if (vacio)
    return (
      <div>Vacio</div>
    )
  else {
    return (
      <>
        {carrito.map((elemento, index) => (
          <MDBRow key={index} className="d-flex justify-content-center my-4" style={{ color: "black" }}>
            <MDBCard style={{ width: "1200px" }}>
              <MDBCardBody>
                <MDBRow>
                  {
                  <MDBCol>
                    <MDBCardImage src={`${panImage[index]}`}
                      alt="Imagen" className="my-5" style={{ width: '350px' }} fluid />
                  </MDBCol>
                  }
                  <MDBCol >
                    <h2 className="h2 mb-3 font-weight-bold text-center">Nombre:</h2>
                    <h2 className="h2 mb-3 font-weight-bold text-center">{panNombres[index]}</h2>
                  </MDBCol>
                  <MDBCol>
                    <h2 className="h2 mb-3 font-weight-bold text-center">Precio:</h2>
                    <h3 className="h3 mb-3 font-weight-bold text-center">{panPrecios[index]}</h3>
                  </MDBCol>
                  <MDBCol>
                    <h2 className="h2 mb-3 font-weight-bold text-center">Cantidad:</h2>
                    <h3 className="h3 mb-3 font-weight-bold text-center">{elemento.cantidad}</h3>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <CantidadCarrito id={carrito[index].id}/>
                  <BsFillTrashFill className="mx-5" size="2em" onClick={() => dispatch(eliminar(carrito[index].id))} />
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        ))}
      </>
    )
  }
}