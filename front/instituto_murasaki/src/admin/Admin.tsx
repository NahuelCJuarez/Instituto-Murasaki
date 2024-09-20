import { useState } from "react";
import styles from "./admin.module.css"
import classNames from 'classnames'
import ListaAlumnos from "./views/listaAlumnos";
import Horarios from "./views/horarios";

const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState('alumnos');

    const renderContent = () => {
        switch (activeTab) {
            case 'alumnos':
                return <ListaAlumnos />;
            case 'horarios':
                return <Horarios />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.bg}>
            <div className={styles.adminDashboard}>
                <div className={styles.barraLateral}>
                    <button
                        onClick={() => setActiveTab('alumnos')}
                        className={classNames(styles.button, { [styles.activeButton]: activeTab === 'alumnos' })}
                    >
                        Lista de Alumnos
                    </button>
                    <button
                        onClick={() => setActiveTab('horarios')}
                        className={classNames(styles.button, { [styles.activeButton]: activeTab === 'horarios' })}
                    >
                        Horarios
                    </button>
                </div>
                <div className={styles.vistaActual}>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Admin;