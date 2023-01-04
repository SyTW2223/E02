import { MDBTypography} from 'mdb-react-ui-kit';
import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {sumar, añadir, carritoType, valor1} from '../../features/carrito/carritoSlice';

type ID = {
  id: string
}

export function CantidadCarrito(ID: ID) {
  const {id} = ID;
  const dispatch = useAppDispatch();

  const carrito = useAppSelector((state) => state.carrito.carritoData);
  
  useEffect(() => {
  }, [carrito])
  
  function modificar(cantidad: number) {
    carrito.map((producto) => {
      if (producto.id === id) {
        if (cantidad + producto.cantidad > 1) {
          const productoTipo: carritoType = {
            id : id,
            cantidad: cantidad
          }
          dispatch(sumar(productoTipo))
        } else {
          const productoTipo: carritoType = {
            id : id,
            cantidad: cantidad
          }
          dispatch(valor1(productoTipo));
        }
      }
    })
  }

  function productoID () {
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].id === id)
        return carrito[i].cantidad;
    }
  }

  return (
    <>
      <MDBTypography tag="h3" style={{ color: "black" }} className='text-center'>
        Cantidad:
      </MDBTypography>
      <button disabled={productoID() === 0} style={{ borderRadius: '10px', border: "0px", backgroundColor: "#3b71ca", color: "white", width: "24px" }}
        onClick={(e: any) => { modificar(-1) }}>
        -
      </button>
      <input type="number" value={productoID()} onChange={(e: any) => modificar(+e.target.value)} style={{ width: '100px', marginRight: '5px', marginLeft: '5px', height: "30px" }} min="1" />
      <button style={{ borderRadius: '10px', border: "0px", backgroundColor: "#3b71ca", color: "white", width: "24px" }} onClick={(e: any) => { modificar(1) }}>
        +
      </button>
    </>
  )
}