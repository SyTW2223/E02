import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import Marquee from "react-fast-marquee";
import EmailSend from './EmailSend'

export default function Footer() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-5'>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='https://www.facebook.com' role='button'
          target='blanck'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://twitter.com' role='button'
          target='blanck'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://google.com' role='button'
          target='blanck'>
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.instagram.com/' role='button'
          target='blanck'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://github.com/SyTW2223/E02' role='button'
          target='blanck'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
        
        <section className=''>
          <EmailSend />
        </section>

        <section className='mb-4'>
          <h1>alPanPan</h1>
          <p>
            En cooperación con agricultores ecológicos de nuestra comunidad que están recuperando variedades autóctonas de cultivo tradicional en nuestras tierras, obtenemos unos cereales no mejorados ni modificados de una calidad excepcional.
          </p>
        </section>
        <section className='mb-4'>
        <h1>Localizacion</h1>
          <p>
            Calle de la Paz, 1, 28001 Madrid
          </p>
          <p><strong>&#9742; 9922567890</strong></p>
        </section>

         <section className=''>
          <MDBRow>
            <MDBCol className='center'>
              <h4 className='text-uppercase'>Navegacion</h4>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='/' className='text-white'>
                    Inicio
                  </a>
                </li>
                <li>
                  <a href='/mapa' className='text-white'>
                    Mapa Web
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright by alPanPan
      </div>
    </MDBFooter>
  );
}