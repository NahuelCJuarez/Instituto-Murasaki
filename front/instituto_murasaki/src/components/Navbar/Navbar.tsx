import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./navbar.module.css"
import Logo from "./Murasaki_logo.png"

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.header}>
        <div className={styles.left}>
          <img src={Logo} alt="Logo" />
          <h1>Instituto Murasaki</h1>
        </div>
        <Link to="/login" className={`${styles.link} ${styles.button}`}>Ingresar</Link>
      </div>
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>INICIO</Link>
        <Link to="/Eventos" className={styles.navLink}>EVENTOS</Link>
        <Link to="/Informacion" className={styles.navLink}>INFORMACION</Link>
        <Link to="/Discord" className={styles.navLink}>DISCORD</Link>
      </div>
    </div>
  );
};

export default Navbar;