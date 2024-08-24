import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./navbar.module.css"
import Logo from "./Murasaki_logo.png"

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.header}>
        <div className={styles.left}>
          <img src={Logo} alt="Logo" />
          <h1>Instituto Murasaki</h1>
        </div>
        <button className={`${styles.link} ${styles.button}`} onClick={toggleMenu}>
          Ingresar
        </button>
      </div>

      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Inicio</Link>
        <Link to="/Eventos" className={styles.navLink}>Eventos</Link>
        <Link to="/Informacion" className={styles.navLink}>Información</Link>
        <Link to="/Discord" className={styles.navLink}>Discord</Link>
      </div>

      {isMenuOpen && (
        <div className={styles.loginMenu}>
          <form>
            <input type="email" placeholder="Email" className={styles.inputField} />
            <input type="password" placeholder="Contraseña" className={styles.inputField} />
            <button type="submit" className={styles.loginButton}>Iniciar Sesión</button>
          </form>
          <p>¿Aún no te registraste?</p>
          <Link to="/Register" className={styles.registerButton} onClick={toggleMenu}>
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;