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

export default function Footer() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-5'>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
        
        <Marquee>Tu mama es puta Alejandro</Marquee>

        <section className=''>
          <form action=''>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2'>
                  <strong>Sign up for our newsletter</strong>
                </p>
              </MDBCol>

              <MDBCol md='5' start>
                <MDBInput contrast type='email' label='Email address' className='mb-4' />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn outline color='light' type='submit' className='mb-4'>
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
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
                  <a href='#!' className='text-white'>
                    Inicio
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Contacto
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Mapa Web
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Accesibilidd
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright by alPanPan
      </div>
    </MDBFooter>
  );
}