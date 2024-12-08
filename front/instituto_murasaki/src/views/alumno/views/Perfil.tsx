import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./perfil.module.css";

const Perfil: React.FC = () => {
    interface User {
        name: string | undefined;
        lastName: string | undefined;
        email: string;
        phoneNumber: string;
        level: string | undefined;
        profilePicture: string | undefined;
        discordUser: DiscordUser | undefined;
    }

    interface DiscordUser {
        id: string;
        username: string;
        discriminator: string;
        avatar: string;
    }
    

    const [userData, setUserData] = useState<User>();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos en modo de edición
    const [email, setEmail] = useState(''); // Estado para email editable
    const [phoneNumber, setPhoneNumber] = useState(''); // Estado para teléfono editable

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            axios.get(`http://localhost:3000/users/${userId}`)
                .then((response) => {
                    setUserData(response.data);
                    setEmail(response.data.email); // Seteamos el email inicial
                    setPhoneNumber(response.data.phoneNumber); // Seteamos el teléfono inicial
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                });
        }
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing); // Alterna el modo de edición
    };

    const handleSaveClick = () => {
        // Aquí puedes implementar la lógica para guardar los cambios
        const updatedUser = {
            ...userData,
            email,
            phoneNumber,
        };

        axios.put(`http://localhost:3000/users/${userData?.id}`, updatedUser)
            .then((response) => {
                setUserData(response.data);
                setIsEditing(false); // Salimos del modo de edición después de guardar
            })
            .catch((error) => {
                console.error('Error saving user data:', error);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!userData) {
        return <p>No user data found</p>;
    }

    return (
        <div className={styles.perfil}>
            <div className={styles.topSection}>
                <div className={styles.nameLevel}>
                    <h1 className={styles.name}>{userData.name} {userData.lastName}</h1>
                    <p className={styles.level}>Nivel: {userData.level}</p>
                </div>
                <div className={styles.picture}>
                    <img src={userData.profilePicture} alt="Profile" />
                </div>
            </div>
            <div className={styles.userInfo}>
                <p>
                    <span className={styles.headers}>Discord:</span> {userData.discordUser ? userData.discordUser.username : 'Sin Discord'}
                </p>
                <p>
                    <span className={styles.headers}>Email:</span>
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    ) : (
                        userData.email
                    )}
                </p>
                <p>
                    <span className={styles.headers}>Teléfono:</span>
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                        />
                    ) : (
                        userData.phoneNumber
                    )}
                </p>
            </div>
            <div className={styles.buttons}>
                {isEditing ? (
                    <button className={styles.save} onClick={handleSaveClick}>Guardar</button>
                ) : (
                    <button className={styles.edit} onClick={handleEditClick}>Editar</button>
                )}
                <button className={styles.changePassword}>Cambiar Contraseña</button>
                <button className={styles.discord} onClick={() => window.open('https://discord.com/channels/294922971364196353/294922971364196353')}>Discord</button>
            </div>
            <div className={styles.intro}>
                <p>Para comenzar con tus clases, ingresa al canal de Discord. Un instructor se pondrá en contacto a la brevedad. Puedes consultar los horarios de clase en la sección "Horarios" de tu perfil.</p>
            </div>
        </div>
    );
};

export default Perfil;
