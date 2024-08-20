import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./navbar.module.css"

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.link}>Inicio</Link>
        <Link to="/login" className={styles.link}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;