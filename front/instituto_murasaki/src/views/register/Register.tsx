import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import * as Yup from 'yup';
import styles from './register.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register: React.FC = () => {
  const PasswordField = ({ name }: { name: string }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <div style={{ position: 'relative' }}>
        <Field
          id={"password"}
          name={name}
          type={showPassword ? 'text' : 'password'}
          style={{ paddingRight: '40px' }}
        />
        <div
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
    );
  };

  const ConfirmPasswordField = ({ name }: { name: string }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <div style={{ position: 'relative' }}>
        <Field
          id={"confirmPassword"}
          name={name}
          type={showPassword ? 'text' : 'password'}
          style={{ paddingRight: '40px' }}
        />
        <div
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
    );
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').required('El correo es requerido'),
    name: Yup.string().required('El nombre es requerido'),
    lastName: Yup.string().required('El apellido es requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .matches(/[a-z]/, 'La contraseña debe incluir al menos una letra minúscula')
      .matches(/\d/, 'La contraseña debe incluir al menos un número')
      .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Repetir la contraseña es requerido'),
    country: Yup.string().required('El país es requerido'),
    birthDate: Yup.date()
      .max(new Date(), 'La fecha de nacimiento no puede ser en el futuro')
      .required('La fecha de nacimiento es requerida'),
    phoneNumber: Yup.string()
      .min(6, 'Ingresa un numero de teléfono')
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
      toast.success('Bienvenido al Instituto Murasaki!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      setTimeout(() => {
        navigate('/discord');
      }, 3000);
    } catch (error) {
      console.error('Error en el registro:', error);
      toast.error('No se completo el registo, porfavor varifica los campos', {
        position: "bottom-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
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
                    <PasswordField name='password' />
                    <ErrorMessage name="password" component="div" className={styles.errorMessage} />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="confirmPassword">Repetir contraseña:</label>
                    <ConfirmPasswordField name="confirmPassword" />
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