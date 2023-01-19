import errorPan from '../../public/panes/error404.png'
import {
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit'
function Error() {
  return (
    <div>
      <MDBContainer className="text-center mb-7">
        <img src={errorPan} alt="error" />
        <h1>404</h1>
        <h2>Pagina no encontrada</h2>
        <MDBBtn href="/" color="danger">Ir a Inicio</MDBBtn>
      </MDBContainer>
    </div>
  )
}

export default Error