import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./navbar.module.css"
import Logo from "./Murasaki_logo.png"
import Login from "../../views/login/Login"

const Navbar: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.header}>
        <div className={styles.left}>
          <img src={Logo} alt="Logo" />
          <h1>Instituto Murasaki</h1>
        </div>
        <button className={`${styles.link} ${styles.button}`} onClick={toggleLogin}>
          Ingresar
        </button>
      </div>

      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Inicio</Link>
        <Link to="/Eventos" className={styles.navLink}>Eventos</Link>
        <Link to="/Informacion" className={styles.navLink}>Información</Link>
        <Link to="/Discord" className={styles.navLink}>Discord</Link>
      </div>

      {isLoginOpen && (
        <div className={styles.loginMenu}>
          <div className='LoginModal'>
            <Login />
          </div>
          <p>¿Aún no te registraste?</p>
          <Link to="/Register" className={styles.registerButton} onClick={toggleLogin}>
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;