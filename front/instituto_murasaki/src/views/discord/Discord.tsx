import styles from "./discord.module.css"

const Discord: React.FC = () => {
    return (
        <div className={styles.bg}>
            <div className={styles.titulo}>
                <h1>¿Cómo me conecto a mis clases?</h1>
            </div>
            <div className={styles.tuto}>
                <p>Para completar tu registro y acceder a tus clases y horarios, necesitas tener una cuenta de Discord.</p>
                <p>Si aún no tienes una cuenta, puedes crear una de forma gratuita haciendo click en este botón</p>
                <div className={styles.DCButtons}>
                    <button className={styles.buttonDC} onClick={() => window.open('https://discord.com/register', '_blank')}>Crear Cuenta</button>
                </div>
                <div className={styles.acceder}>
                    <p>Una vez creada tu cuenta, o si ya tenias una propia, puedes acceder al servidor del instituto haciendo click en el botón de Unirse. Una vez dentro del servidor, un profesor se pondra en contacto para agendar un horario de clases.</p>
                    <div className={styles.DCButtons}>
                        <button
                            className={styles.buttonDC}
                            onClick={() => {
                                const userId = localStorage.getItem('userId');
                                const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=1282806570698412153&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&scope=identify&state=${userId}`;
                                window.open(discordAuthUrl);
                            }}
                        >
                            Unirse
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discord;