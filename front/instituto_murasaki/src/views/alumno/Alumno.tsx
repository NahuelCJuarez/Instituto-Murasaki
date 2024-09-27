import { useState } from "react";
import styles from "./student.module.css"
import Perfil from "./views/Perfil";
import Horarios from "./views/Horarios";
import Material from "./views/Material";
import Pagar from "./views/Pagar";
import classNames from "classnames";

const Alumno: React.FC = () => {
    const [activeTab, setActiveTab] = useState('perfil');

    const renderContent = () => {
        switch (activeTab) {
            case 'perfil':
                return <Perfil />;
            case 'horarios':
                return <Horarios />;
            case 'material':
                return <Material />;
            case 'pagar':
                return <Pagar />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.bg}>
            <div className={styles.userDashboard}>
                <div className={styles.barraLateral}>
                    <button
                        onClick={() => setActiveTab('perfil')}
                        className={classNames(styles.button, { [styles.activeButton]: activeTab === 'perfil' })}
                    >
                        Perfil
                    </button>
                    <button
                        onClick={() => setActiveTab('material')}
                        className={classNames(styles.button, { [styles.activeButton]: activeTab === 'material' })}
                    >
                        Material
                    </button>
                    <button
                        onClick={() => setActiveTab('horarios')}
                        className={classNames(styles.button, { [styles.activeButton]: activeTab === 'horarios' })}
                    >
                        Horarios
                    </button>
                    <button
                        onClick={() => setActiveTab('pagar')}
                        className={classNames(styles.button, { [styles.activeButton]: activeTab === 'pagar' })}
                    >
                        Pagar
                    </button>
                </div>
                <div className={styles.vistaActual}>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Alumno;