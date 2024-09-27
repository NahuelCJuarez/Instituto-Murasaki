import axios from "axios";
import { useEffect, useState } from "react";

const Perfil: React.FC = () => {
    interface User {
        name: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        level: string,
        profilePicture: string
    }

    const [userData, setUserData] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            axios.get(`http://localhost:3000/users/${userId}`)
                .then((response) => {
                    setUserData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                });
        }
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!userData) {
        return <p>No user data found</p>;
    }

    return (
        <div>
            <h1>{userData.name} {userData.lastName}</h1>
            <img src={userData.profilePicture} />
            <button>Editar</button>
            <p>Email: {userData.email}</p>
            <p>Teléfono: {userData.phoneNumber}</p>
            <p>Nivel: {userData.level}</p>
            <button>Cambiar Contraseña</button>
        </div>
    );
};

export default Perfil;