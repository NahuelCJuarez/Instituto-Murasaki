import styles from "./student.module.css"

const Alumno: React.FC = () => {
    return (
        <div className={styles.bg}>
            <div className={styles.userPanel}>
                <div className={styles.userViews}>
                    <div>
                        <img />
                        <h1>Nivel: </h1>
                    </div>
                    <button></button>
                    <button></button>
                    <button></button>
                    <button></button>
                    <button></button>
                    <img />
                </div>
                <div className={styles.currentView}>
                    
                </div>
            </div>
        </div>
    )
}

export default Alumno;