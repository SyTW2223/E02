import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBRipple,
  MDBCol
} from "mdb-react-ui-kit";

/**
 * Crea una tarjeta con un título y una imagen
 * @param title Título de la tarjeta
 * @param image Imagen de la tarjeta
 * @returns El componente Card
 */
export default function Card({ title, image }: any) {
  return (
    <MDBCol lg="2" md="4" sm="12">
      <MDBCard center>
        <MDBCardImage
          src={image}
          alt="..."
          position="top"
          className="w-100"
          style={{height: "10rem"}}
        />
        <MDBRipple rippleColor="light" rippleTag="div" className="w-100">
          <MDBCardBody style={{background: '#755932'}}>
            <MDBCardTitle style={{color: 'white'}}>{title}</MDBCardTitle>
          </MDBCardBody>
        </MDBRipple>
      </MDBCard>
    </MDBCol>
  );
}