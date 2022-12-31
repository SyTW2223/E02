import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { userActions } from '../../_actions';
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
  const [button, setButton] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}')
    if (user.token) {
      setRuta('/profile');
      setButton('Logout')
      setNombreRuta('Perfil');
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState('')
  // Maneja el cambio de texto en el input
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  async function request(searchTerm: string) {
    localStorage.setItem('search', searchTerm);
    window.location.href = '/tienda';
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(`You are searching for ${searchTerm}`)
    request(searchTerm);

    // Limpia el campo de búsqueda
    setSearchTerm('')
  }

  const handleLogout = () => {
    userActions.logout();
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
          <div className='d-flex'>
            <div className='mx-2 ml-auto align-self-center'>
              <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
                <input type='search' className='form-control' placeholder='Buscar' aria-label='Search' value={searchTerm} onChange={handleChange} />
                <MDBBtn color='primary'>Search</MDBBtn>
              </form>
            </div>
            {
              button === 'Logout' ?
                <div className='ml-auto'>
                  <MDBBtn color='dark' className='text-light' onClick={handleLogout} tabIndex={-1} aria-disabled='true'>
                    Salir
                  </MDBBtn>
                </div>
              :
                ''
            }
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}
