import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./listaAlumnos.module.css"
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import dcRefresh from "./discord-refresh.jpg";
import whatsapp from "./whatsapp.png";
import eliminar from "./eliminar.png";

const Eliminados: React.FC = () => {
    interface Alumno {
        id: string;
        name: string;
        lastName: string;
        discordUser: DiscordUser;
        phoneNumber: string;
        isDeleted: boolean;
    }

    interface DiscordUser {
        id: string;
        username: string;
        discriminator: string;
        avatar: string;
    }

    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [filteredAlumnos, setFilteredAlumnos] = useState<Alumno[]>([]);
    const [hasMoreUsers, setHasMoreUsers] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const limit = 9;

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/deleted');
            setAlumnos(response.data);
            setFilteredAlumnos(response.data);
            setHasMoreUsers(response.data.length > limit);
        } catch (error) {
            console.log('Error al obtener los usuarios', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const handleRestoreUser = async (alumnoId: string) => {
        const confirmRestore = window.confirm("¿Estás seguro de que quieres restaurar a este usuario?");

        if (!confirmRestore) {
            return;
        }

        try {
            await axios.put(`http://localhost:3000/users/${alumnoId}`, { isDeleted: false });

            setAlumnos((prevAlumnos) => prevAlumnos.filter((alumno) => alumno.id !== alumnoId));
            setFilteredAlumnos((prevAlumnos) => prevAlumnos.filter((alumno) => alumno.id !== alumnoId));
        } catch (error) {
            console.log('Error al restaurar al usuario', error);
        }
    };

    const handleUpdateDiscordUsers = async () => {
        try {
            await axios.put('http://localhost:3000/users/update-discord-info');
            fetchData();
        } catch (error) {
            console.log('Error al actualizar los datos de Discord', error);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = alumnos.filter(
            (alumno) =>
                alumno.name.toLowerCase().includes(term) ||
                alumno.lastName.toLowerCase().includes(term) ||
                (alumno.discordUser && alumno.discordUser.username.toLowerCase().includes(term))
        );
        setFilteredAlumnos(filtered);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };


    return (
        <div className={styles.container}>
            <div className={styles.topSection}>
                <div className={styles.RefreshButtons}>
                    <button className={styles.update} onClick={fetchData}><RotateCw /></button>
                    <button className={styles.dcUpdate} onClick={handleUpdateDiscordUsers}><img src={dcRefresh} /></button>
                </div>
                <input
                    className={styles.searchBar}
                    type="text"
                    placeholder="Buscar por nombre o Discord"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Discord</th>
                        <th>Teléfono</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAlumnos.map((alumno) => (
                        <tr key={alumno.id}>
                            <td>{`${alumno.name} ${alumno.lastName}`}</td>
                            <td>{alumno.discordUser ? alumno.discordUser.username : 'Sin Discord'}</td>
                            <td>
                                <a
                                    href={`https://wa.me/${alumno.phoneNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className={styles.whatsappButton}><img src={whatsapp} /></button>
                                </a>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleRestoreUser(alumno.id)}
                                    className={styles.restoreButton}
                                >
                                    Restaurar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    <ChevronLeft />
                </button>
                <span>Página {page}</span>
                <button onClick={handleNextPage} disabled={!hasMoreUsers}>
                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}

export default Eliminados;