import styles from "./horariosAlumnos.module.css"

const HorariosAlumnos: React.FC = () => {
    return (
        <div className={styles.horarios}>
            <iframe
                src={`https://calendar.google.com/calendar/embed?src=ZTlmNzFiMTE3OTIzZWE5ZDVhODhiNWNjMTQzMzY0NjcxYTNjNWNhYTU4MTc4YThkNGUwMWQ0YThlNWM3NzFiNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&ctz=America/Argentina/Buenos_Aires`}
                style={{ border: 0, width: '100%', height: '650px', minHeight: '300px' }}
                width="100%"
                height="800px"
                frameBorder="0"
                scrolling="no"
            ></iframe>
        </div>
    )
}

export default HorariosAlumnos;