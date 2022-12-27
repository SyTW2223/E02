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
  import { useEffect, useState } from 'react';
  import {Row, Col, Button, Form} from 'react-bootstrap'
  
  export default function Direccion() {
    // Variables del formulario
    const [correo, setCorreo] = useState('')
    const [calle, setCalle] = useState('')
    const [numero, setNumero] = useState('')
    const [codigoPostal, setCodigoPostal] = useState('')
    const [provincia, setProvincia] = useState('')
    const [pais, setPais] = useState('')
  
    // Obtenemos el usuario del localStorage
    useEffect(() => {
        getDireccion()
    }, [])

  
    // Manejamos respuesta del servidor
    function handleResponse(response: any) {
      return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        return data;
      });
    }
    // Modificamos el store
    const getDireccion = async()  => {
        const user = JSON.parse(localStorage.getItem('usuario')|| '{}')
        const requestOptions = {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
             authorization: "Bearer " + user.token,
          },
        };
        const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
        const response = await fetch(direccion + "/cartera?correo="+ user.usuario[0].correo, requestOptions);
        console.log(response)
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
        body: JSON.stringify({calle, numero, codigoPostal, provincia, pais })
      };
      console.log("opciones modificar usuario",requestOptions)
      const direccion: string = process.env.BACK_HOST || `http://localhost:3000`;
      const response = await fetch(direccion + "/usuario?correo="+ user.usuario[0].correo, requestOptions);
      const data = await handleResponse(response);
      if(data.res === 200){
        alert("Se ha modificado correctamente")
        setCalle(data.calle)
        setNumero(data.numero)
        setCodigoPostal(data.codigoPostal)
        setProvincia(data.provincia)
        setPais(data.pais)
      }
    }
    return (
     <></>
    );
  }