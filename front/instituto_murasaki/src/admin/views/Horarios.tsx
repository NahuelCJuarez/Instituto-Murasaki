import { useEffect, useState } from 'react';
import styles from './listaAlumnos.module.css'

const Horarios = () => {
  const [calendarios, setCalendarios] = useState<{ nombre: string; id: string, key: number }[]>([]);
  const [nombreMaestro, setNombreMaestro] = useState('');
  const [calendarId, setCalendarId] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const savedCalendarios = localStorage.getItem('calendarios');
    if (savedCalendarios) {
      setCalendarios(JSON.parse(savedCalendarios));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarios', JSON.stringify(calendarios));
  }, [calendarios]);

  const agregarCalendario = () => {
    if (nombreMaestro && calendarId) {
      const nuevosCalendarios = [
        ...calendarios,
        { nombre: nombreMaestro, id: calendarId, key: Date.now() },
      ];

      setCalendarios(nuevosCalendarios);
      setNombreMaestro('');
      setCalendarId('');
    }
  };

  const actualizarCalendario = (calendarioId: number) => {
    setCalendarios(
      calendarios.map((cal) =>
        cal.key === calendarioId ? { ...cal, key: Date.now() } : cal
      )
    );
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      agregarCalendario();
    }
  };

  const eliminarCalendario = (id: string) => {
    setCalendarios(calendarios.filter((cal) => cal.id !== id));
  };

  return (
    <div>
      <div className={styles.topSection}>
        <input
          type="text"
          placeholder="Nombre del Maestro"
          value={nombreMaestro}
          onChange={(e) => setNombreMaestro(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="ID del Google Calendar"
          value={calendarId}
          onChange={(e) => setCalendarId(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ marginRight: '10px' }}
        />
        <button onClick={agregarCalendario}>Agregar</button>
      </div>

      {calendarios.map((cal) => (
        <div key={cal.key} style={{ marginBottom: '40px' }}>
          <h3>{cal.nombre}</h3>
          <iframe
            src={`https://calendar.google.com/calendar/embed?src=${cal.id}&ctz=America/Argentina/Buenos_Aires`}
            style={{ border: 0, width: '80%', height: '400px', minHeight: '300px' }}
            width="100%"
            height="800px"
            frameBorder="0"
            scrolling="no"
          ></iframe>
          <button onClick={() => actualizarCalendario(cal.key)}>Actualizar</button>
          <button onClick={() => eliminarCalendario(cal.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Horarios;
