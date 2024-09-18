import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from "../../components/Navbar/navbar.module.css"
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').required('Ingresa tu correo'),
    password: Yup.string().required('Ingresa tu contraseña'),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', values);
      console.log('Inicio de sesión exitoso:', response.data);
      const token = response.data.token;
      const userId = response.data.userId;
      const userLevel = response.data.level;
      const role = response.data.role;
      console.log(response.data);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userLevel', userLevel);
      localStorage.setItem('role', role);
      // console.log('token guardado', token, 'userid guardado', userId, 'role guardado', role);
      
      if (response.data.discordUser === null) {
        navigate('/discord');
      } else {
        switch (response.data.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'alumno':
            navigate('/alumno');
            break;
          case 'profesor':
            navigate('/profesor');
            break;
          default:
            console.error('Rol desconocido:', response.data.role);
        }
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="email" name="email" placeholder="email" className={styles.inputField}/>
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <Field type="password" name="password" placeholder="contraseña" className={styles.inputField}/>
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
              Iniciar Sesión
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
