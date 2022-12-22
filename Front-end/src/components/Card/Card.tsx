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
    <MDBCol lg="2" md="3" sm="6">
      <MDBCard>
        <MDBCardImage
          src={image}
          alt="..."
          position="top"
          style={{ height: "12.5rem" }}
        />
        <MDBRipple rippleColor="light" rippleTag="div">
          <MDBCardBody style={{ background: "#755932", height: "6.25rem" }}>
            <MDBCardTitle style={{ color: 'white' }}>{title}</MDBCardTitle>
          </MDBCardBody>
        </MDBRipple>
      </MDBCard>
    </MDBCol>
  );
}