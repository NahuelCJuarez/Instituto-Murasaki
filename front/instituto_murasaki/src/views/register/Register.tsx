import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register: React.FC = () => {
    const validationSchema = Yup.object({
      email: Yup.string().email('Correo inválido').required('El correo es requerido'),
      name: Yup.string().required('El nombre es requerido'),
      lastName: Yup.string().required('El apellido es requerido'),
      password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/, 'La contraseña debe incluir al menos una letra mayúscula')
        .matches(/[a-z]/, 'La contraseña debe incluir al menos una letra minúscula')
        .matches(/\d/, 'La contraseña debe incluir al menos un número')
        .matches(/[@$!%*?&]/, 'La contraseña debe incluir al menos un caracter especial')
        .required('La contraseña es requerida'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Repetir la contraseña es requerido'),
      country: Yup.string().required('El país es requerido'),
      birthDate: Yup.date()
        .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro')
        .required('La fecha de nacimiento es requerida'),
      phoneNumber: Yup.string()
        .matches(/^\+?\d{10,15}$/, 'Número de teléfono inválido')
        .required('El número de teléfono es requerido'),
    });
  
    const handleSubmit = async (values: {
      email: string;
      name: string;
      lastName: string;
      password: string;
      confirmPassword: string;
      country: string;
      birthDate: string;
      phoneNumber: string;
    }) => {
      try {
        const response = await axios.post('http://localhost:3000/auth/signup', values);
        console.log('Registro exitoso:', response.data);
        //manejar el redireccionamiento y mostrar un mensaje de éxito
      } catch (error) {
        console.error('Error en el registro:', error);
      }
    };
  
    return (
      <div>
        <h2>Registro</h2>
        <Formik
          initialValues={{
            email: '',
            name: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            country: '',
            birthDate: '',
            phoneNumber: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="email">Correo electrónico:</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
  
              <div>
                <label htmlFor="name">Nombre:</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>
  
              <div>
                <label htmlFor="lastName">Apellido:</label>
                <Field type="text" name="lastName" />
                <ErrorMessage name="lastName" component="div" />
              </div>
  
              <div>
                <label htmlFor="password">Contraseña:</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
  
              <div>
                <label htmlFor="confirmPassword">Repetir contraseña:</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" />
              </div>
  
              <div>
                <label htmlFor="country">País:</label>
                <Field type="text" name="country" />
                <ErrorMessage name="country" component="div" />
              </div>
  
              <div>
                <label htmlFor="birthDate">Fecha de nacimiento:</label>
                <Field type="date" name="birthDate" />
                <ErrorMessage name="birthDate" component="div" />
              </div>
  
              <div>
                <label htmlFor="phoneNumber">Número de teléfono:</label>
                <Field type="text" name="phoneNumber" />
                <ErrorMessage name="phoneNumber" component="div" />
              </div>
  
              <button type="submit" disabled={isSubmitting}>
                Registrar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  };
  
  export default Register;