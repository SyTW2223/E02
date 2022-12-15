import { useState } from 'react'
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
import Logo from '../../public/logo.png'
import styles from '../css/Navbar.module.css';
export default function Navbar() {
  const [showBasic, setShowBasic] = useState(false)

  return (
    <MDBNavbar className={styles.navbar} expand='lg' light bgColor='dark'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>
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
              <MDBNavbarLink className='text-light' active aria-current='page' href='/contacto'>
                Contacto
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink className={styles.navbarcolor} href='/'>
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
              <MDBNavbarLink href='/login' tabIndex={-1} aria-disabled='true'>
                Login
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='Buscar' aria-label='Search' />
            <MDBBtn color='primary'>Search</MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}
