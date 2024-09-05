import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>&copy; {new Date().getFullYear()} Instituto Murasaki. Todos los derechos reservados.</p>
                <ul className={styles.socialMedia}>
                    <li><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
