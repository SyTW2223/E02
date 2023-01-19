import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import { login, register } from '../_services';
import { userType } from '../features/user/userSlice';
import { useAppDispatch } from '../app/hooks'
import { loginRegister } from '../features/user/userSlice'

import styles from '../css/Login.module.css';
/**
 * Componente de inicio de sesión y registro para el front-end
 * @returns Componente de inicio de sesión y registro
 */
export default function Login() {
  const dispatch = useAppDispatch();

  // Establecer si ha ocurrido un error
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Establecer la pestaña activa para iniciar sesión por defecto
  const [justifyActive, setJustifyActive] = useState('signin');
 // Maneja clic en la pestaña
  const handleJustifyClick = (value: any) => {
    if (value === justifyActive) {
      return;
    }
    // Establece la pestaña activa
    setJustifyActive(value);
    setErrorMessage('');
  };
  // Valida el formulario de inicio de sesión
  const [formSignInValue, setFormSignInValue] = useState({
    correo: '',
    password: '',
  });

  //  Valida el formulario de registro
  const [formSignUpValue, setFormSignUpValue] = useState({
    nombre: '',
    password: '',
    apellidos: '',
    correo: '',
  });
  // Cambiar el color activo de la pestaña
  const justifyActiveStyle = {
    backgroundColor: 'wheat',
    color: '#755932',
  };

  const isEmailValid = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  const isPasswordValid = (password: string) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/i.test(password);
  };

  // Maneja el cambio de entrada del formulario de inicio de sesión
  const onChangeSignIn = (e: any) => {
    setFormSignInValue({ ...formSignInValue, [e.target.name]: e.target.value });
  };
  // Maneja el cambio de entrada del formulario de registro
  const onChangeSignUp = (e: any) => {
    setFormSignUpValue({ ...formSignUpValue,[e.target.name]: e.target.value });
  };

  // Envia formulario de inicio de sesión
  const onSubmitSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const user =  await login(formSignInValue.correo, formSignInValue.password);
      if (user.res === 200) {
        const usertype: userType = {
          nombre: user.usuario[0].nombre,
          apellidos: user.usuario[0].apellidos,
          password: user.usuario[0].password,
          correo: user.usuario[0].correo,
          token: user.token
        }
        dispatch(loginRegister(usertype));
        window.location.href = "/";
      } else {
        setError(true);
        if (user.res === 404 || user.res === 400) {
          setErrorMessage('Usuario o contraseña incorrectos!');
        } else if (user.res === 500) {
          setErrorMessage('Error en el servidor!');
        } else {
          setErrorMessage('Error desconocido!');
        }
      }
    } catch (error: any) {
      console.error(error);
      setError(true);
      setErrorMessage('Error al enviar el formulario!');
    }
  };

  // Envia formulario de registro
  const onSubmitSignUp = async (e: any) => {
    e.preventDefault();
    if (isEmailValid(formSignUpValue.correo) && isPasswordValid(formSignUpValue.password)) {
      try {
        const user = await register(formSignUpValue.nombre, formSignUpValue.apellidos, formSignUpValue.correo, formSignUpValue.password);
        if (user.res === 201) {
          const usertype: userType = {
            nombre: user.usuario.nombre,
            apellidos: user.usuario.apellidos,
            password: user.usuario.password,
            correo: user.usuario.correo,
            token: user.token
          }
          dispatch(loginRegister(usertype));
          window.location.href = "/";
        } else {
          setError(true);
          if (user.res === 400) {
            setErrorMessage('El usuario ya existe!');
          } else if (user.res === 500) {
            setErrorMessage('Error en el servidor!');
          } else {
            setErrorMessage('Error desconocido!');
          }
        }
      } catch (error: any) {
        console.error(error);
        setError(true);
        setErrorMessage('Error al enviar el formulario!');
      }
    } else {
      setError(true);
      setErrorMessage('Correo o contraseña no válidos!, la contraseña debe tener al menos 5 caracteres, una mayúscula, una minúscula y un número');
    }
  };

  // Return the login component
  return (
    <MDBContainer fluid className="p-3 my-5 d-flex flex-column col-md-6">
      <MDBRow>
        <MDBCol>
          <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
            <MDBBreadcrumbItem>
              <a href='/'>Home</a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>
              <a href='/login'>{justifyActive === 'signin' ? 'Inicio de Sesion' : 'Registro'}</a>
            </MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBCol>
      </MDBRow>
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink
            className={styles.signin}
            onClick={() => handleJustifyClick('signin')}
            active={justifyActive === 'signin'}
            style={justifyActive === 'signin' ? justifyActiveStyle : {}}
            data-testid='login'
          >
            Iniciar Sesión
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            className={styles.signup}
            onClick={() => handleJustifyClick('signup')}
            active={justifyActive === 'signup'}
            style={justifyActive === 'signup' ? justifyActiveStyle : {}}
            data-testid='register'
          >
            Crear Una Cuenta
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'signin'}>
          <MDBInput
            name='correo'
            value={formSignInValue.correo}
            onChange={onChangeSignIn}
            required
            wrapperClass='mb-4'
            label='Correo electrónico'
            id='valdiationSignInEmail'
            type='correo'
            data-testid='correo signin'
          />
          <MDBInput className='mt-5'
            name='password'
            value={formSignInValue.password}
            onChange={onChangeSignIn}
            required
            wrapperClass='mb-4'
            label='Contraseña'
            id='valdiationSignInPassword'
            type='password'
            data-testid='password signin'
          />
          {error && <div className='mt-3'> <p className='mt-3' style={{ color: 'red' }}>{errorMessage}</p></div>}
          <MDBBtn type='submit' onClick={onSubmitSignIn} className={`${styles.loginButton} my-4 w-100`}>Entrar</MDBBtn>
          <MDBRow className="gx-5">
            <MDBCol className='d-flex justify-content-center'>
              <p className="text-center mx-2 my-2">¿No tienes cuenta?</p>
              <MDBBtn className={`${styles.loginButton} mx-2`} onClick={() => setJustifyActive('signup') }>Regístrate</MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'signup'}>
          <MDBInput
            name='nombre'
            value={formSignUpValue.nombre}
            onChange={onChangeSignUp}
            wrapperClass='mb-4'
            label='Nombre'
            id='validationSignUpName'
            type='text'
            data-testid='nombre signup'
          />
          <MDBInput
            name='apellidos'
            value={formSignUpValue.apellidos}
            onChange={onChangeSignUp}
            wrapperClass='mb-4'
            label='Apellidos'
            id='validationSignUpSurname'
            type='text'
            data-testid='apellidos signup'
          />
          <MDBInput
            name='correo'
            value={formSignUpValue.correo}
            onChange={onChangeSignUp}
            required
            wrapperClass='mb-4'
            label='Correo electrónico'
            id='valdiationSignUpEmail'
            type='correo'
            data-testid='correo signup'
            pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
          />
          <MDBInput
            name='password'
            value={formSignUpValue.password}
            onChange={onChangeSignUp}
            required
            wrapperClass='mb-4'
            label='Contraseña'
            id='valdiationSignUpPassword'
            type='password'
            data-testid='password signup'
            pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$'
          />
          {error && <div className='mt-3'> <p className='mt-3' style={{ color: 'red' }}>{errorMessage}</p></div>}
          <MDBBtn className={`${styles.loginButton} mb-4 w-100`} type='submit' onClick={onSubmitSignUp}>Siguiente</MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};