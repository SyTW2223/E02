import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import { userActions } from '../_actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBValidation,
  MDBValidationItem,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';

import styles from '../css/Login.module.css';
/**
 * Componente de inicio de sesión y registro para el front-end
 * @returns Componente de inicio de sesión y registro
 */
export default function Login() {
  const dispatch = useDispatch();

  // Establecer la pestaña activa para iniciar sesión por defecto
  const [justifyActive, setJustifyActive] = useState('signin');
 // Maneja clic en la pestaña
  const handleJustifyClick = (value: any) => {
    if (value === justifyActive) {
      return;
    }
    // Establece la pestaña activa
    setJustifyActive(value);
  };
  // Valida el formulario de inicio de sesión
  const [formSignInValue, setFormSignInValue] = useState({
    correo: '',
    password: '',
  });
  //  Valida el formulario de registro
  const [formSignUpValue, setFormSignUpValue] = useState({
    correo: '',
    password: '',
    apellidos: '',
    nombre: '',
    foto: '',
  });
  // Cambiar el color activo de la pestaña
  const justifyActiveStyle = {
    backgroundColor: 'wheat',
    color: '#755932',
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
    const { correo, password } = formSignInValue;
    if (correo && password) {
      const action = userActions.login(formSignInValue.correo, formSignInValue.password);
      action(dispatch);
    }
  };

  // Envia formulario de registro
  const onSubmitSignUp = async (e: any) => {
    e.preventDefault();
    const { correo, password, apellidos, nombre} = formSignUpValue;
    if (correo && password) {
      const action = userActions.register(formSignUpValue.nombre, formSignUpValue.apellidos, formSignUpValue.correo, formSignUpValue.password);
      action(dispatch);
    }
  };

  // Return the login component
  return (
    <MDBContainer fluid className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink
            className={styles.signin}
            onClick={() => handleJustifyClick('signin')}
            active={justifyActive === 'signin'}
            style={justifyActive === 'signin' ? justifyActiveStyle : {}}
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
          >
            Crear Una Cuenta
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'signin'}>
          <MDBValidation isValidated>
            <MDBValidationItem feedback='' invalid>
              <MDBInput
                name='correo'
                value={formSignInValue.correo}
                onChange={onChangeSignIn}
                required
                wrapperClass='mb-4'
                label='Correo electrónico'
                id='valdiationSignInEmail'
                type='correo'
              />
            </MDBValidationItem>
            <MDBValidationItem feedback='' invalid>
              <MDBInput
                name='password'
                value={formSignInValue.password}
                onChange={onChangeSignIn}
                required
                wrapperClass='mb-4'
                label='Contraseña'
                id='valdiationSignInPassword'
                type='password'
              />
            </MDBValidationItem>
          </MDBValidation>
          <MDBBtn type='submit' onClick={onSubmitSignIn} className={`${styles.loginButton} mb-4 w-100`}>Entrar</MDBBtn>
          <MDBRow className="gx-5">
            <MDBCol>
              <a className={styles.link} href="!#">¿Has olvidado la contraseña?</a>
            </MDBCol>
            <MDBCol>
              <p className="text-center">¿No tienes cuenta? <a className={styles.link} href="#!">Regístrate</a></p>
            </MDBCol>
          </MDBRow>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'signup'}>
          <MDBValidation isValidated>
            <MDBValidationItem feedback=''>
              <MDBInput
                name='nombre'
                value={formSignUpValue.nombre}
                onChange={onChangeSignUp}
                wrapperClass='mb-4'
                label='Nombre'
                id='validationSignUpName'
                type='text'
              />
            </MDBValidationItem>
            <MDBValidationItem feedback=''>
              <MDBInput
                name='apellidos'
                value={formSignUpValue.apellidos}
                onChange={onChangeSignUp}
                wrapperClass='mb-4'
                label='Apellidos'
                id='validationSignUpName'
                type='text'
              />
            </MDBValidationItem>
            <MDBValidationItem feedback='' invalid>
              <MDBInput
                name='correo'
                value={formSignUpValue.correo}
                onChange={onChangeSignUp}
                required
                wrapperClass='mb-4'
                label='Correo electrónico'
                id='valdiationSignUpEmail'
                type='correo'
              />
            </MDBValidationItem>
            <MDBValidationItem feedback='' invalid>
              <MDBInput
                name='password'
                value={formSignUpValue.password}
                onChange={onChangeSignUp}
                required
                wrapperClass='mb-4'
                label='Contraseña'
                id='valdiationSignUpPassword'
                type='password'
              />
            </MDBValidationItem>
            <MDBValidationItem feedback=''>
              <MDBInput
                name='foto'
                value={formSignUpValue.foto}
                onChange={onChangeSignUp}
                wrapperClass='mb-4'
                label='Foto'
                id='validationSignUpName'
                type='file'
              />
            </MDBValidationItem>
          </MDBValidation>
          <MDBBtn className={`${styles.loginButton} mb-4 w-100`} type='submit' onClick={onSubmitSignUp}>Siguiente</MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};