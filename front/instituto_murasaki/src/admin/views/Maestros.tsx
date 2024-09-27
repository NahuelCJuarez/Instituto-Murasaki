import axios from "axios";
import { Key, useEffect, useState } from "react";
import styles from "./listaAlumnos.module.css"
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import dcRefresh from "./discord-refresh.jpg"
import whatsapp from "./whatsapp.png";
import eliminar from "./eliminar.png";

const Maestros: React.FC = () => {
    interface Maestro {
        id: string;
        name: string;
        lastName: string;
        discordUser: DiscordUser;
        level: string;
        phoneNumber: string;
        role: string;
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

    const roles = [
        "alumno",
        "maestro"
    ]

    const [maestros, setMaestros] = useState<Maestro[]>([]);
    const [filteredMaestros, setFilteredMaestros] = useState<Maestro[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Maestro[]>([]);
    const [page, setPage] = useState(1);
    const limit = 9;
    const [hasMoreUsers, setHasMoreUsers] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/maestros');
            setMaestros(response.data);
            setFilteredMaestros(response.data);
            setHasMoreUsers(response.data.length > limit);
        } catch (error) {
            console.log('Error al obtener los usuarios', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const handleBanUser = async (userId: string) => {
        const confirmBan = window.confirm("¿Estás seguro de que quieres eliminar a este usuario?");

        if (!confirmBan) {
            return;
        }

        try {
            await axios.put(`http://localhost:3000/users/${userId}`, { isDeleted: true });

            setMaestros((prevMaestros) => prevMaestros.filter((maestro) => maestro.id !== userId));
            setFilteredMaestros((prevMaestros) => prevMaestros.filter((maestro) => maestro.id !== userId));
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

    useEffect(() => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        setFilteredMaestros(maestros.slice(startIndex, endIndex));

        setHasMoreUsers(endIndex < maestros.length);
    }, [maestros, page, limit]);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setSearchResults(([]))
            return;
        }

        try {
            const response = await axios.get('http://localhost:3000/users/search', {
                params: { term: searchTerm },
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error al buscar usuarios', error);
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    const handleLevelChange = async (userId: string, newLevel: string) => {
        try {
            await axios.put(`http://localhost:3000/users/${userId}`, { level: newLevel });
            setMaestros((prevMaestros) =>
                prevMaestros.map((maestro) =>
                    maestro.id === userId ? { ...maestro, level: newLevel } : maestro
                )
            );
            setFilteredMaestros((prevMaestros) =>
                prevMaestros.map((maestro) =>
                    maestro.id === userId ? { ...maestro, level: newLevel } : maestro
                )
            );
        } catch (error) {
            console.log('Error al actualizar el nivel', error);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            await axios.put(`http://localhost:3000/users/${userId}`, { role: newRole });
            setMaestros((prevMaestros) =>
                prevMaestros.map((maestro) =>
                    maestro.id === userId ? { ...maestro, role: newRole } : maestro
                )
            );
            setFilteredMaestros((prevMaestros) =>
                prevMaestros.map((maestro) =>
                    maestro.id === userId ? { ...maestro, role: newRole } : maestro
                )
            );

            fetchData();
            handleSearch();
        } catch (error) {
            console.log('Error al actualizar el rol', error);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.topSection}>
                <div className={styles.RefreshButtons}>
                    <button className={styles.update} onClick={fetchData}><RotateCw /></button>
                    <button className={styles.dcUpdate} onClick={handleUpdateDiscordUsers}><img src={dcRefresh} /></button>
                </div>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Discord</th>
                        <th>Nivel</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMaestros.map((maestro) => (
                        <tr key={maestro.id}>
                            <td>{`${maestro.name} ${maestro.lastName}`}</td>
                            <td>{maestro.discordUser ? maestro.discordUser.username : 'Sin Discord'}</td>
                            <td>
                                <select className={styles.level}
                                    value={maestro.level}
                                    onChange={(e) => handleLevelChange(maestro.id, e.target.value)}
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
                                    href={`https://wa.me/${maestro.phoneNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <button className={styles.whatsappButton}><img src={whatsapp} /></button>
                                </a>
                            </td>
                            <td>
                                <select className={styles.roles}
                                    value={maestro.role}
                                    onChange={(e) => handleRoleChange(maestro.id, e.target.value)}
                                >
                                    {roles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleBanUser(maestro.id)}
                                    className={styles.whatsappButton}
                                >
                                    <img src={eliminar} />
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
            <div className={styles.searchContainer}>
                <div className={styles.bottomSection}>
                    <input
                        className={styles.searchInputRoles}
                        type="text"
                        placeholder="Buscar por nombre o apellido"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className={styles.searchButton} onClick={handleSearch}>
                        Buscar
                    </button>
                </div>

                <div className={styles.resultsContainer}>
                    {searchResults.length > 0 ? (

                        <ul>
                            {searchResults.map((user) => (
                                <li key={user.id} className={styles.userItem}>
                                    <div className={styles.userInfo}>
                                        {user.name} {user.lastName}
                                    </div>
                                    <select
                                        className={styles.roles}
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    >
                                        {roles.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </li>
                            ))}
                        </ul>

                    ) : (
                        <p>No se encontraron usuarios</p>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Maestros;