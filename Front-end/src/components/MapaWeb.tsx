import { Link } from 'react-router-dom';
import { MDBListGroup } from 'mdb-react-ui-kit';
export default function MapaWeb() {
    return (
        <div className='text-center'>
            <h1 className='font-size-lg mt-2 fw-bold'>Mapa del sitio</h1>
            <MDBListGroup>
                <Link to="/" className="list-group-item p-4 bg-light border">
                    Inicio
                </Link>
                <Link to="/login" className="list-group-item p-4 bg-light border">
                    Iniciar sesión
                </Link>
                <Link to="/profile" className="list-group-item p-4 bg-light border">
                    Perfil
                </Link>
                <Link to="/direccion" className="list-group-item p-4 bg-light border">
                    Dirección
                </Link>
                <Link to="/tienda" className="list-group-item p-4 bg-light border">
                    Tienda
                </Link>
            </MDBListGroup>
        </div>
    );
}
