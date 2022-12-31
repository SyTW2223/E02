import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

export default function Carrito() {
  const [panNombres, setpanNombres] = useState([""]);
  const [panImage, setpanImage] = useState([Buffer]);
  const [panPrecios, setpanPrecios] = useState([0]);
  const [cantidad, setCantidad] = useState([0]);
  const [res, setRes] = useState(0);
  const [vacio, setVacio] = useState(true);

  useEffect(() => {
    const carrito = ordenarCarrito();
    
    if (carrito.length) {
      setVacio(false);
      let ids: number[] = []

      for (let i: number = 0; i < carrito.length; i++) {
        ids.push(carrito[i].id);
      }
      peticion(ids);
    }
  }, []);
  
  function ordenarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '{}');
    carrito.sort((a: any, b: any) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    setCantidad(carrito.map((pan: any) => pan.cantidad));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    return carrito;
  }


  async function peticion(ids: number[]) {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}')

    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + user.token
      }
    };

    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;

    const response = await fetch(direccion + "/panCarrito?identificadores=" + ids, requestOptions);
    const data = await response.json();
    
    let auxNombre : string[] = []
    let auxPrecio : number[] = []
    let auxImage : any[] = []
    setRes(data.res)
    for (let i: number = 0; i < data.pan.length; i++) {
      auxNombre.push(data.pan[i].nombre)
      auxPrecio.push(data.pan[i].precio)
      auxImage.push(data.pan[i].image)
    }
    console.log(auxNombre)
    console.log(auxPrecio)
    console.log(auxImage)
    setpanNombres(auxNombre);
    setpanPrecios(auxPrecio);
    setpanImage(auxImage);
  }

  if (vacio)
    return (
      <div>Vacio</div>
    )
  else 
    return (
<>
  {panNombres.map((panNombre, index) => (
    <MDBRow className="d-flex justify-content-center my-4" style={{color: "black"}}>
      <MDBCard key={index} style={{ width: "1200px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol>
            <MDBCardImage src={`${Buffer.from(panImage[index]).toString('utf8')}`}
                          alt="Avatar" className="my-5" style={{ width: '350px' }} fluid />
            </MDBCol>
            <MDBCol >
              <h2 className="h2 mb-3 font-weight-bold text-center">Nombre:</h2>
              <h2 className="h2 mb-3 font-weight-bold text-center">{panNombre}</h2>
            </MDBCol>
            <MDBCol>
              <h2 className="h2 mb-3 font-weight-bold text-center">Precio:</h2>
              <h3 className="h3 mb-3 font-weight-bold text-center">{panPrecios[index]}</h3>
            </MDBCol>
            <MDBCol>
              <h2 className="h2 mb-3 font-weight-bold text-center">Cantidad:</h2>
              <h3 className="h3 mb-3 font-weight-bold text-center">{cantidad[index]}</h3>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBRow>
  ))}
</>

    )
}
