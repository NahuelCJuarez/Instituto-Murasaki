import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./listaAlumnos.module.css";
import { RotateCw, ChevronLeft, ChevronRight } from "lucide-react";
import dcRefresh from "./discord-refresh.jpg";
import whatsapp from "./whatsapp.png";
import eliminar from "./eliminar.png";

const ListaAlumnos: React.FC = () => {
    interface Alumno {
        id: string;
        name: string;
        lastName: string;
        discordUser: DiscordUser;
        level: string;
        pago: string;
        phoneNumber: string;
        isDeleted: boolean;
    }

    interface DiscordUser {
        id: string;
        username: string;
        discriminator: string;
        avatar: string;
    }

    const levels = [
        "N5/1", "N5/2", "N5/3", "N5/4", "N5/5", "N5/6",
        "N4/1", "N4/2", "N4/3", "N4/4", "N4/5", "N4/6",
        "N3/1", "N3/2", "N3/3", "N3/4", "N3/5", "N3/6",
        "N2/1", "N2/2", "N2/3", "N2/4", "N2/5", "N2/6"
    ];

    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [filteredAlumnos, setFilteredAlumnos] = useState<Alumno[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    const limit = 9;
    const [hasMoreUsers, setHasMoreUsers] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
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

    const handleBanUser = async (alumnoId: string) => {
        const confirmBan = window.confirm("¿Estás seguro de que quieres eliminar a este usuario?");

        if (!confirmBan) {
            return;
        }

        try {
            await axios.put(`http://localhost:3000/users/${alumnoId}`, { isDeleted: true });

            setAlumnos((prevAlumnos) => prevAlumnos.filter((alumno) => alumno.id !== alumnoId));
            setFilteredAlumnos((prevAlumnos) => prevAlumnos.filter((alumno) => alumno.id !== alumnoId));
        } catch (error) {
            console.log('Error al banear al usuario', error);
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

    const handleSortByPago = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        const sortedAlumnos = [...alumnos].sort((a, b) => {
            if (a.pago === b.pago) return 0;
            return sortOrder === 'asc'
                ? a.pago === 'Pago' ? -1 : 1
                : a.pago === 'No Pago' ? -1 : 1;
        });

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        setFilteredAlumnos(sortedAlumnos.slice(startIndex, endIndex));

        setHasMoreUsers(endIndex < sortedAlumnos.length);
    }, [sortOrder, alumnos, page]);

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

    const handleLevelChange = async (alumnoId: string, newLevel: string) => {
        try {
            await axios.put(`http://localhost:3000/users/${alumnoId}`, { level: newLevel });
            setAlumnos((prevAlumnos) =>
                prevAlumnos.map((alumno) =>
                    alumno.id === alumnoId ? { ...alumno, level: newLevel } : alumno
                )
            );
            setFilteredAlumnos((prevAlumnos) =>
                prevAlumnos.map((alumno) =>
                    alumno.id === alumnoId ? { ...alumno, level: newLevel } : alumno
                )
            );
        } catch (error) {
            console.log('Error al actualizar el nivel', error);
        }
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
                        <th>Nivel</th>
                        <th>Teléfono</th>
                        <th onClick={handleSortByPago} style={{ cursor: 'pointer' }}>
                            Pago {sortOrder === 'asc' ? '↑' : '↓'}
                        </th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAlumnos.map((alumno) => (
                        <tr key={alumno.id}>
                            <td>{`${alumno.name} ${alumno.lastName}`}</td>
                            <td>{alumno.discordUser ? alumno.discordUser.username : 'Sin Discord'}</td>
                            <td>
                                <select className={styles.level}
                                    value={alumno.level}
                                    onChange={(e) => handleLevelChange(alumno.id, e.target.value)}
                                >
                                    {levels.map((level) => (
                                        <option key={level} value={level}>
                                            {level}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <a
                                    href={`https://wa.me/${alumno.phoneNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className={styles.whatsappButton}><img src={whatsapp} /></button>
                                </a>
                            </td>
                            <td className={alumno.pago === 'Pago' ? styles.pago : styles.noPago}>
                                {alumno.pago}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleBanUser(alumno.id)}
                                    className={styles.whatsappButton}
                                >
                                    <img src={eliminar}/>
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
    );
};

export default ListaAlumnos;

