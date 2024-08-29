import Carousel from "../../components/Carousel/Carousel"
import styles from "./home.module.css"
import img1 from "./img/4-idioma-japon.jpg"
import img2 from "./img/aprende-japones.jpg"
import img3 from "./img/nipon.jpg"
import imgIntro from "./img/introImg.png"
import imgManga from "./img/manga-1.jpg"
import imgTurismo from "./img/japan_tokyo_tourism.jpg"
import imgNiveles from "./img/niveles.png"

const IMAGES = [img1, img2, img3]

const Home = () => {
    return (
        <>
        <div className={styles.carouselContainer}>
            <Carousel imageUrls={IMAGES} />
        </div>
        <div id="intro" className={styles.sectionContainer}>
            <div className={styles.intro}>
                <h2>Una forma cómoda y fácil de aprender</h2>
                <p>¡Participa de las clases online, desde la comodidad de tu hogar!</p>
            </div>
            <div className={styles.fadeRight}></div>
            <div className={styles.introImgContainer}>
                <img src={imgIntro}/>
            </div>
        </div>
        <div id="manga" className={styles.sectionContainer}>
            <div className={styles.manga}>
                <h2>Practica divirtiendote</h2>
                <p>¡Podes practicar y poner a prueba tu aprendizaje con tus series y pasatiempos favoritos, en su idioma nativo!</p>
            </div>
            <div className={styles.fadeLeft}></div>
            <div className={styles.mangaImgContainer}>
                <img src={imgManga}/>
            </div>
        </div>
        <div id="turismo" className={styles.sectionContainer}>
            <div className={styles.turismo}>
                <h2>Expande tus horizontes</h2>
                <p>¡Aprender japonés te abre las puertas a hacer turismo en ese hermoso pais, o incluso trabajar en el!</p>
            </div>
            <div className={styles.fadeRightT}></div>
            <div className={styles.turismoImgContainer}>
                <img src={imgTurismo}/>
            </div>
        </div>
        <div id="intro" className={styles.sectionContainer}>
            <div className={styles.manga}>
                <h2>Capacitacion oficial</h2>
                <p>¡Te preparamos para que puedas rendir tus examenes de nivel!</p>
            </div>
            <div className={styles.fadeLeft}></div>
            <div className={styles.mangaImgContainer}>
                <img src={imgNiveles}/>
            </div>
        </div>
        </>
    )
}

export default Home;