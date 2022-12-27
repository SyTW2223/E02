import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';
import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {Row, Col, Button, Form} from 'react-bootstrap'
import { userActions } from '../../_actions';

export default function ProfilePage() {
  // Variebles del formulrio
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')

  // Obtenemos el usuario del localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario')|| '{}')
    if(user){
      setNombre(user.usuario[0].nombre)
      setApellidos(user.usuario[0].apellidos)
    }
  }, []);

  // Manejamos respuesta del servidor
  function handleResponse(response: any) {
    return response.text().then((text: any) => {
      const data = text && JSON.parse(text);
      return data;
    });
  }

  // Modificamos el store
  const submitHandler = async(e:any)  => {
    const user = JSON.parse(localStorage.getItem('usuario')|| '{}')
    e.preventDefault()
    const requestOptions = {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
         authorization: "Bearer " + user.token,
      },
      body: JSON.stringify({nombre, apellidos})
    };
    console.log("opciones modificar usuario",requestOptions)
    const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
    const response = await fetch(direccion + "/usuario?correo="+ user.usuario[0].correo, requestOptions);
    const data = await handleResponse(response);
    if(data.res === 200){
      user.usuario[0].nombre = nombre
      user.usuario[0].apellidos = apellidos
      localStorage.setItem('usuario', JSON.stringify(user));
    }
  }

  return (
    <Row className='profileContiner'>
      <Col md={6}>Form</Col>
      <Form>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Name"
            value = {nombre}
            onChange = {(e:any) => setNombre(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="apellidos">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Last Name"
            value={apellidos}
            onChange = {(e:any) => setApellidos(e.target.value)} />
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit" onClick={submitHandler}>
        Update
      </Button>
      <Col md={6}>ProfileTopic</Col>
    </Row>
  );
}