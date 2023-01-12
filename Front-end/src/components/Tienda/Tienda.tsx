import { useEffect, useState } from "react";
import {Buffer} from 'buffer';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCheckbox, MDBCardTitle, MDBRipple, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';

export default function Tienda() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    tipo: '',
    ingredientes: ''
  });

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
        let filteredProducts = productsArray;
        // Coger el término de búsqueda y de tipo de localStorage
        const search = localStorage.getItem("search");
        const tipo = localStorage.getItem("tipo");
        if (search !== null) {
          // Buscar en el array de productos por nombre, tipo e ingredientes
          filteredProducts = filteredProducts.filter((product: any) => {
            return (
              product.nombre.toLowerCase().includes(search.toLowerCase()) ||
              product.tipo.toLowerCase().includes(search.toLowerCase()) ||
              product.ingredientes.toLowerCase().includes(search.toLowerCase())
            );
          });
        }
        setOriginalProducts(filteredProducts);
        if (tipo !== null){
          filteredProducts = filteredProducts.filter((product: any) => product.tipo.toLowerCase() === tipo.toLowerCase())
          setSelectedFilters({ ...selectedFilters, tipo });
        }
        setProducts(filteredProducts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredProducts = products;
    // Filtrar los productos por tipo y ingredientes
    if (selectedFilters.tipo !== '' || selectedFilters.ingredientes !== '') {
      filteredProducts = filteredProducts.filter((product: any) => {
        return (
          (selectedFilters.tipo === '' || product.tipo.toLowerCase() === selectedFilters.tipo.toLowerCase()) &&
          (selectedFilters.ingredientes === '' || product.ingredientes.toLowerCase().includes(selectedFilters.ingredientes.toLowerCase()))
        );
      });
    }
    setProducts(filteredProducts);
  }, [selectedFilters, products]);

  const onFilterTypeChange = (e: any) => {
    setSelectedFilters({ ...selectedFilters, tipo: e.target.value });
  }

  const onFilterIngredientsChange = (e: any) => {
    setSelectedFilters({ ...selectedFilters, ingredientes: e.target.value });
  }

  const resetFilters = () => {
    setSelectedFilters({
      tipo: '',
      ingredientes: ''
    });
    // Resetear las checkboxes
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
    localStorage.removeItem("tipo")
    setProducts(originalProducts);
  }

  return (
    <MDBContainer fluid className="p-5">
       <MDBRow className="g-2">
        <MDBCol lg="2" md="3" sm="6">
          <p className='mb-1' style={{ color: '#755932' }}>Tipo</p>
          <MDBCheckbox label='Blanco' value='blanco' checked={selectedFilters.tipo === 'blanco'} onChange={ onFilterTypeChange }></MDBCheckbox>
          <MDBCheckbox label='Integral'value='integral' checked={selectedFilters.tipo === 'integral'} onChange={ onFilterTypeChange }></MDBCheckbox>
          <MDBCheckbox label='Centeno' value='centeno' checked={selectedFilters.tipo === 'centeno'} onChange={ onFilterTypeChange }></MDBCheckbox>
          <MDBCheckbox label='Semillas' value='semillas'checked={selectedFilters.tipo === 'semillas'}  onChange={ onFilterTypeChange }></MDBCheckbox>
          <MDBCheckbox label='Masa madre' value='masa madre' checked={selectedFilters.tipo === 'masa madre'} onChange={ onFilterTypeChange }></MDBCheckbox>
          <MDBCheckbox label='Millo' value='millo' checked={selectedFilters.tipo === 'millo'} onChange={ onFilterTypeChange }></MDBCheckbox>
        </MDBCol>
        <MDBCol lg="2" md="3" sm="6">
          <p className='mb-1' style={{ color: '#755932' }}>Ingredientes</p>
          <MDBCheckbox label='Agua' value='agua' onChange={ onFilterIngredientsChange }></MDBCheckbox>
          <MDBCheckbox label='Sal' value='sal' onChange={ onFilterIngredientsChange }></MDBCheckbox>
          <MDBCheckbox label='Levadura' value='levadura' onChange={ onFilterIngredientsChange }></MDBCheckbox>
          <MDBCheckbox label='Masa madre' value='masa madre' onChange={ onFilterIngredientsChange }></MDBCheckbox>
          <MDBCheckbox label='Harina de centeno' value='harina de centeno' onChange={ onFilterIngredientsChange }></MDBCheckbox>
          <MDBCheckbox label='Harina de maíz' value='harina de maíz' onChange={ onFilterIngredientsChange }></MDBCheckbox>
          <MDBCheckbox label='Harina integral' value='harina integral' onChange={ onFilterIngredientsChange }></MDBCheckbox>
          <MDBCheckbox label='Harina de Semillas' value='harina de semillas' onChange={ onFilterIngredientsChange }></MDBCheckbox>
        </MDBCol>
      </MDBRow>
      <MDBBtn type='submit' onClick={ resetFilters } style={{ backgroundColor: 'wheat', color: '#755932' }} className={`my-4 w-2`}>Limpiar búsqueda</MDBBtn>
      <MDBRow className="g-4">
        {
          products.length === 0 ? (
            <p style={{ color: 'red', fontSize: '18px' }}>No hay productos que coincidan con la búsqueda!</p>
          ) : (
            <>
              { products.map((product: any, index) => (
                <MDBCol key={index} lg="2" md="3" sm="6">
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
                        <div style={{ color: 'white', fontSize: "12px", lineHeight: '50%' }}>
                          <p>Tipo: {product.tipo}</p>
                          <p>Precio: {product.precio}€</p>
                        </div>
                        </Link>
                      </MDBCardBody>
                    </MDBRipple>
                  </MDBCard>
                </MDBCol>
                ))
              }
            </>
          )
        }
      </MDBRow>
  </MDBContainer>
  );
}
