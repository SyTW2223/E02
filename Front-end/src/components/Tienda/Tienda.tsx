import React, { useEffect, useState } from "react";
import {Buffer} from 'buffer';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBRipple } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';

export default function Tienda() {
  // Product list
  const [products, setProducts] = useState([]);
  // Search params
  const searchParams = new URLSearchParams(window.location.search);
  const tipo = searchParams.get("tipo");
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
        // Coger el término de búsqueda de localStorage
        const search = localStorage.getItem("search");
        if (search === null) {
          setProducts(productsArray);
          return;
        } else {
          // Buscar en el array de productos por nombre, tipo e ingredientes
          const filteredProducts = productsArray.filter((product: any) => {
            return (
              product.nombre.toLowerCase().includes(search.toLowerCase()) ||
              product.tipo.toLowerCase().includes(search.toLowerCase()) ||
              product.ingredientes.toLowerCase().includes(search.toLowerCase())
            );
          });
          if (filteredProducts !== null) {
            setProducts(filteredProducts);
            // Eliminar el término de búsqueda de localStorage
            console.log(filteredProducts)
            return;
          } else {
            setProducts(productsArray);
            return;
          }
        }
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
                src={`${Buffer.from(product.image).toString('utf8')}`}
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