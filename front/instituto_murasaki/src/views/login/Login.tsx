import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login: React.FC = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').required('El correo es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', values);
      console.log('Inicio de sesión exitoso:', response.data);
      //manejar el redireccionamiento y guardar el token de sesión
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
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
              <label htmlFor="password">Contraseña:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Iniciar Sesión
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
