import { MDBTypography} from 'mdb-react-ui-kit';
import {useEffect} from 'react';

import styles from '../../css/Navbar.module.css'

// Tipo de dato para la cantidad
type dataType = {
  cantidad: number,
  setCantidad: React.Dispatch<React.SetStateAction<number>>
}


export default function Cantidad(data: dataType) {
  const {cantidad, setCantidad} = data
  
  useEffect(() => {
    if (cantidad < 0)
      setCantidad(0);

  }, [cantidad])
  
  return (
    <>
      <MDBTypography tag="h3" style={{ color: "black" }} className='text-center'>
        Cantidad:
      </MDBTypography>
      <button className={ styles.button } disabled={cantidad === 0} style={{ borderRadius: '10px', border: "0px",width: "24px" }}
        onClick={(e: any) => { setCantidad(cantidad - 1) }}>
        -
      </button>
      <input type="number" value={cantidad} onChange={(e: any) => setCantidad(+e.target.value)} style={{ width: '100px', marginRight: '5px', marginLeft: '5px', height: "30px", color: '#755932' }} min="1" />
      <button className={ styles.button } style={{ borderRadius: '10px', border: "0px", width: "24px", color: '#755932' }} onClick={(e: any) => { setCantidad(cantidad + 1) }}>
        +
      </button>
    </>
  )
}


