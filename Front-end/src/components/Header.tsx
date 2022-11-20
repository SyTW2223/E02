import { favicons } from "favicons";
import Logo from '../assets/logo.png'
import Button from 'react-bootstrap/Button';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';
// rfce
function Header() {
  return (
    < header className='Header'>
      <div>
        <ul>
          <li>
            <a href='https://www.facebook.com/landalusipanaderia'><FaFacebookSquare/></a>
            <a href='https://www.facebook.com/landalusipanaderia'><FaTwitterSquare/></a>
            <a href='https://www.facebook.com/landalusipanaderia'><FaInstagramSquare/></a>
          </li>
        </ul>
      </div>
      <div>
        <img src={Logo} alt="logo" />
        <Button variant="outline-warning">Carrito</Button>
      </div>
    <div className='Menu-container' >
      <Button>Menu</Button>
    </div>
    </header>
  )
}

export default Header