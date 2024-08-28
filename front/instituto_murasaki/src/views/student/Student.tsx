import styles from "./student.module.css"

const Student : React.FC = () => {
    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.header}>-Informnacion de la cuenta-</h1>
        </div>
    )
}

export default Student;