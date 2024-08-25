import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import * as Yup from 'yup';
import styles from './register.module.css';
import axios from 'axios';

const Register: React.FC = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').required('El correo es requerido'),
    name: Yup.string().required('El nombre es requerido'),
    lastName: Yup.string().required('El apellido es requerido'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/[A-Z]/, 'Debe incluir al menos una letra mayúscula')
      .matches(/[a-z]/, 'La contraseña debe incluir al menos una letra minúscula')
      .matches(/\d/, 'La contraseña debe incluir al menos un número')
      .matches(/[@$!%*?&]/, 'Debe incluir al menos un caracter especial')
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

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString());

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
      console.log('a');
      const response = await axios.post('http://localhost:3000/auth/signup', values);
      console.log('Registro exitoso:', response.data);
      //manejar el redireccionamiento y mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className={styles.bg}>
      <div className={styles.RegForm}>
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
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                  <div className={styles.formField}>
                    <label htmlFor="name">Nombre:</label>
                    <Field type="text" name="name" />
                    <ErrorMessage name="name" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="lastName">Apellido:</label>
                    <Field type="text" name="lastName" />
                    <ErrorMessage name="lastName" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="password">Contraseña:</label>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="confirmPassword">Repetir contraseña:</label>
                    <Field type="password" name="confirmPassword" />
                    <ErrorMessage name="confirmPassword" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="email">Correo electrónico:</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="country">País:</label>
                    <Field type="text" name="country" />
                    <ErrorMessage name="country" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.fullWidthField}>
                    <div className={styles.formField50}>
                      <label>Fecha de nacimiento:</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Field as="select" name="birthDateDay">
                          {days.map(day => <option key={day} value={day}>{day}</option>)}
                        </Field>
                        <Field as="select" name="birthDateMonth">
                          {months.map((month, index) => <option key={index} value={index + 1}>{month}</option>)}
                        </Field>
                        <Field as="select" name="birthDateYear">
                          {years.map(year => <option key={year} value={year}>{year}</option>)}
                        </Field>
                      </div>
                      <ErrorMessage name="birthDate" component="div" className={styles.errorMessage} />
                    </div>

                    <div className={styles.formField50}>
                      <label htmlFor="phoneNumber">Número de teléfono:</label>
                      <PhoneInput
                        country={'ar'}
                        value={''}
                        onChange={(phone) => setFieldValue('phoneNumber', phone)}
                        inputStyle={{
                          height: "35px",
                          width: "100%",
                        }}
                        autoFormat={false}
                      />
                    </div>
                  </div>

                  <div className={styles.fullWidthField}>
                    <button className={styles.registerButton} type="submit" disabled={isSubmitting}>
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;