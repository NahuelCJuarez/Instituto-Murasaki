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
          onSubmit={(values, { setSubmitting }) => {
            console.log("Formulario enviado");
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                  <div className={styles.formField}>
                    <label htmlFor="name">Nombre:</label>
                    <Field id="name" type="text" name="name" autoComplete="name" />
                    <ErrorMessage name="name" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="lastName">Apellido:</label>
                    <Field id="lastName" type="text" name="lastName" />
                    <ErrorMessage name="lastName" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="password">Contraseña:</label>
                    <Field id="password" type="password" name="password" />
                    <ErrorMessage name="password" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="confirmPassword">Repetir contraseña:</label>
                    <Field id="confirmPassword" type="password" name="confirmPassword" />
                    <ErrorMessage name="confirmPassword" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="email">Correo electrónico:</label>
                    <Field id="email" type="email" name="email" autoComplete="email" />
                    <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="country">País:</label>
                    <Field id="country" type="text" name="country" autoComplete="country" />
                    <ErrorMessage name="country" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.fullWidthField}>
                    <div className={styles.formField50}>
                      <label htmlFor="birthDate">Fecha de nacimiento:</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Field
                          id="birthDateDay"
                          as="select"
                          name="birthDateDay"
                          onChange={(e: any) => {
                            const day = e.target.value;
                            const month = (document.getElementById('birthDateMonth') as HTMLSelectElement)?.value;
                            const year = (document.getElementById('birthDateYear') as HTMLSelectElement)?.value;
                            const birthDate = `${year}-${month}-${day}`;
                            setFieldValue('birthDateDay', day);
                            setFieldValue('birthDate', birthDate);
                            console.log("Día de nacimiento:", day);
                          }}
                        >
                          {days.map(day => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </Field>
                        <Field
                          id="birthDateMonth"
                          as="select"
                          name="birthDateMonth"
                          onChange={(e: any) => {
                            const month = e.target.value;
                            const day = (document.getElementById('birthDateDay') as HTMLSelectElement)?.value;
                            const year = (document.getElementById('birthDateYear') as HTMLSelectElement)?.value;
                            const birthDate = `${year}-${month}-${day}`;
                            setFieldValue('birthDateMonth', month);
                            setFieldValue('birthDate', birthDate);
                            console.log("Mes de nacimiento:", month);
                          }}
                        >
                          {months.map((month, index) => (
                            <option key={index} value={index + 1}>
                              {month}
                            </option>
                          ))}
                        </Field>
                        <Field
                          id="birthDateYear"
                          as="select"
                          name="birthDateYear"
                          onChange={(e: any) => {
                            const year = e.target.value;
                            const day = (document.getElementById('birthDateDay') as HTMLSelectElement)?.value;
                            const month = (document.getElementById('birthDateMonth') as HTMLSelectElement)?.value;
                            const birthDate = `${year}-${month}-${day}`;
                            setFieldValue('birthDateYear', year);
                            setFieldValue('birthDate', birthDate);
                            console.log("Año de nacimiento:", year);
                          }}
                        >
                          {years.map(year => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage name="birthDate" component="div" className={styles.errorMessage} />
                    </div>

                    <div className={styles.formField50}>
                      <label htmlFor="phoneInput">Número de teléfono:</label>
                      <PhoneInput
                        country={'ar'}
                        value={''}
                        onChange={(phone) => {
                          console.log("Teléfono actualizado:", phone);
                          setFieldValue('phoneNumber', phone)
                        }}
                        inputStyle={{
                          height: "35px",
                          width: "100%",
                        }}
                        inputProps={{
                          id: 'phoneInput'
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