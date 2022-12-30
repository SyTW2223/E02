import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {history} from '../../_helpers/history';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse
} from 'mdb-react-ui-kit'
import Logo from '../../../public/logo.png'
import styles from '../../css/Navbar.module.css';
export default function Navbar() {
  const [showBasic, setShowBasic] = useState(false)
  const {nombre} = useParams();
  const [ruta, setRuta] = useState('/login');
  const [nombreRuta, setNombreRuta] = useState('Login/Register');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}')
    if (user.token) {
      setRuta('/profile');
      setNombreRuta('Perfil');
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState('')
  // Maneja el cambio de texto en el input
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  async function request(searchTerm: string) {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}')
    console.log(user)
    // Configuración de la solicitud
    const requestOptions = {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + user.token
      }
    };
    console.log(user.token)

    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(`${direccion}/pan`, requestOptions);
    console.log(response)

    // Busca el término de búsqueda en el array de response
    let data = await response.json();
    // Convertir json a array
    data = Array.isArray(data.pan) ? data.pan : [data.pan];
    // Ahora en data tenemos el array de productos,
    // tenemos que buscar el producto que coincida con el searchTerm
    const panEncontrado = data.filter((p: any) => (p.nombre === searchTerm || p.tipo === searchTerm));

    // Si no se encuentra el producto, se muestra un mensaje
    if (panEncontrado.length === 0) {
      alert('No se ha encontrado el producto');
    } else {
      history.push(`/tienda?tipo=${searchTerm}`);
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(`You are searching for ${searchTerm}`)
    request(searchTerm);

    // Limpia el campo de búsqueda
    setSearchTerm('')
  }

  return (
    <MDBNavbar className={styles.navbar} expand='lg' light bgColor='dark'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>
          <img
            src={Logo}
            height='30'
            alt=''
            loading='lazy'
          />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-light' active aria-current='page' href='/'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink className={styles.navbarcolor} href='/tienda'>
                Tienda Online
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle  tag='a' className='nav-link text-light' role='button'>
                  Puntos de Venta
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Madrid</MDBDropdownItem>
                  <MDBDropdownItem link>Barcelona</MDBDropdownItem>
                  <MDBDropdownItem link>Tenerife</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href={ruta} className='text-light' tabIndex={-1} aria-disabled='true'>
                {nombreRuta}
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href='/carrito' className='text-light' tabIndex={-1} aria-disabled='true'>
                Carrito
              </MDBNavbarLink>
            </MDBNavbarItem>

          </MDBNavbarNav>


          <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
            <input type='search' className='form-control' placeholder='Buscar' aria-label='Search' value={searchTerm} onChange={handleChange} />
            <MDBBtn color='primary'>Search</MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}
