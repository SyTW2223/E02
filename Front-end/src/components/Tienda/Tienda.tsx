import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBRipple } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';

export default function Tienda() {
  // Product list
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
        const response = await fetch(direccion + "/pan", requestOptions);
        const data_list = await response.json();
        const productsArray: any = Array.isArray(data_list.pan) ? data_list.pan : [data_list.pan];
        setProducts(productsArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <MDBContainer fluid className="p-5">
      <MDBRow className="g-4">
        {products.map((product: any) => (
            <MDBCol lg="2" md="3" sm="6">
              <MDBCard>
                <MDBCardImage
                src={product.image}
                alt="..."
                position="top"
                style={{ height: "18.75rem" }}
                />
                <MDBRipple rippleColor="light" rippleTag="div">
                  <MDBCardBody style={{ background: "#755932", height: "12.5rem"  }}>
                    <Link to={`/pan/${product.identificador}`} key={product._id} style={{ textDecoration: "none" }}>
                    <MDBCardTitle style={{ color: 'white', lineHeight: '150%' }}>{product.nombre}</MDBCardTitle>
                    <MDBCardText style={{ color: 'white', fontSize: "12px", lineHeight: '50%' }}>
                      <p>Tipo: {product.tipo}</p>
                      <p>Precio: {product.precio}€</p>
                    </MDBCardText>
                    </Link>
                  </MDBCardBody>
                </MDBRipple>
              </MDBCard>
            </MDBCol>
        ))}
      </MDBRow>
  </MDBContainer>
  );
}