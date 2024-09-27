import { useState } from "react";
import styles from "./admin.module.css"
import classNames from 'classnames'
import ListaAlumnos from "./views/ListaAlumnos";
import Horarios from "./views/Horarios";
import Maestros from "./views/Maestros"
import Eliminados from "./views/Eliminados";

const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState('alumnos');

    const renderContent = () => {
        switch (activeTab) {
            case 'alumnos':
                return <ListaAlumnos />;
            case 'horarios':
                return <Horarios />;
            case 'maestros':
                return <Maestros />;
            case 'eliminados':
                return <Eliminados />;
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
                        onClick={() => setActiveTab('maestros')}
                        className={classNames(styles.button, { [styles.activeButton]: activeTab === 'maestros' })}
                    >
                        Maestros
                    </button>
                    <button
                        onClick={() => setActiveTab('horarios')}
                        className={classNames(styles.button, { [styles.activeButton]: activeTab === 'horarios' })}
                    >
                        Horarios
                    </button>
                    <button
                        onClick={() => setActiveTab('eliminados')}
                        className={classNames(styles.button, { [styles.activeButton]: activeTab === 'eliminados' })}
                    >
                        Eliminados
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