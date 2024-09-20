import axios from "axios";
import { useEffect, useState } from "react";

const ListaAlumnos: React.FC = () => {
    interface Alumno {
        id: string;
        name: string;
        lastName: string;
        discordUser: DiscordUser;
        level: string;
        pago: string;
      }

      interface DiscordUser {
        id: string;
        username: string;
        discriminator: string;
        avatar: string;
      }

    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [page, setPage] = useState(1);
    const limit = 8;
    const [hasMoreUsers, setHasMoreUsers] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users', {
                    params: {
                        page,
                        limit,
                    },
                });

                console.log(response.data);
                

                if (response.data.length < limit) {
                    setHasMoreUsers(false);
                } else {
                    setHasMoreUsers(true);
                }

                setAlumnos(response.data);
            } catch (error) {
                console.log('Error al obtener los usuarios', error);
            }
        };

        fetchData();
    }, [page]);

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    return (
        <div>
            <h2>Lista de Alumnos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre y Apellido</th>
                        <th>Nombre de usuario en Discord</th>
                        <th>Nivel de Japonés</th>
                        <th>Estado del pago</th>
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map((alumno) => (
                        <tr key={alumno.id}>
                            <td>{`${alumno.name} ${alumno.lastName}`}</td>
                            <td>{alumno.discordUser ? alumno.discordUser.username : 'Sin usuario de Discord'}</td>
                            <td>{alumno.level}</td>
                            <td>{alumno.pago}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Página Anterior
                </button>
                <span>Página {page}</span>
                <button onClick={handleNextPage} disabled={!hasMoreUsers}>
                    Siguiente Página
                </button>
            </div>
        </div>
    );
};

export default ListaAlumnos;
