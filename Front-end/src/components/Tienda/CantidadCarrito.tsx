import { MDBCol, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { sumar, añadir, carritoType, valor1, eliminar } from '../../features/carrito/carritoSlice';
import { BsFillTrashFill } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../../css/Navbar.module.css'

type ID = {
  id: string
}

export function CantidadCarrito(ID: ID) {
  const { id } = ID;
  const dispatch = useAppDispatch();

  const carrito = useAppSelector((state) => state.carrito.carritoData);

  function modificar(cantidad: number) {
    toast.success('Cantidad actualizada');
    carrito.map((producto) => {
      if (producto.id === id) {
        if (cantidad + producto.cantidad > 1) {
          const productoTipo: carritoType = {
            id: id,
            cantidad: cantidad
          }
          dispatch(sumar(productoTipo))
        } else {
          const productoTipo: carritoType = {
            id: id,
            cantidad: cantidad
          }
          dispatch(valor1(productoTipo));
        }
      }
    })
  }

  function productoID() {
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].id === id)
        return carrito[i].cantidad;
    }
  }

  return (
    <>
      <MDBTypography tag="h3" className='text-center' style={{ color: "black" }}>
        Añadir:
      </MDBTypography>
      <MDBRow>
        <MDBCol className='justify-content-center d-flex my-1'>
          <button className={ styles.button } disabled={productoID() === 0} style={{ borderRadius: '10px',width: "24px", height: "31px", color: '#755932' }}
            onClick={(e: any) => { modificar(-1) }}>
            -
          </button>
          <input type="number" value={productoID()} onChange={(e: any) => modificar(+e.target.value)} style={{ width: '100px', marginRight: '5px', marginLeft: '5px', height: "30px" }} min="1" />
          <button className={ styles.button } style={{ borderRadius: '10px', width: "24px", height: "31px", color: '#755932' }} onClick={(e: any) => { modificar(1) }}>
            +
          </button>
        </MDBCol>
        <MDBCol className='justify-content-center d-flex my-1'>
          <BsFillTrashFill className="mx-2" size="30px" onClick={() => {
            toast.error('Producto eliminado');
            dispatch(eliminar(id))
          }}/>
        </MDBCol>
      </MDBRow>
      <Toaster />
    </>
  )
}