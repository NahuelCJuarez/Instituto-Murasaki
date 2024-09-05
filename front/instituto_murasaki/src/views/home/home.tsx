import Carousel from "../../components/Carousel/Carousel"
import styles from "./home.module.css"
import img1 from "./img/4-idioma-japon.jpg"
import img2 from "./img/aprende-japones.jpg"
import img3 from "./img/nipon.jpg"
import imgIntro from "./img/introImg.png"
import imgManga from "./img/manga-1.jpg"
import imgTurismo from "./img/japan_tokyo_tourism.jpg"
import imgNiveles from "./img/niveles.png"
import imgDiscord from "./img/discord-logo-icon-editorial-free-vector.jpg"

const IMAGES = [img1, img2, img3]

const Home = () => {
    return (
        <div className={styles.homepage}>

            <div className={styles.carouselContainer}>
                <Carousel imageUrls={IMAGES} />
            </div>


            <div id="intro" className={styles.sectionContainer}>
                <div className={styles.intro}>
                    <h2>Una forma cómoda y fácil de aprender japonés</h2>
                    <p>¡Participa de las clases online, desde la comodidad de tu hogar!</p>
                    <p>Horarios de clases flexibles y profesores que se ajustan a tus necesidades</p>
                </div>
                <div className={styles.fadeRight}></div>
                <div className={styles.introImgContainer}>
                    <img src={imgIntro} />
                </div>
            </div>

            <div className={styles.sectionsBackground}>
                <div id="manga" className={styles.sectionContainer}>
                    <div className={styles.manga}>
                        <h2>Practica divirtiendote</h2>
                        <p>¡Podes practicar y poner a prueba tu aprendizaje con tus series y pasatiempos favoritos, en su idioma nativo!</p>
                    </div>
                    <div className={styles.fadeLeft}></div>
                    <div className={styles.mangaImgContainer}>
                        <img src={imgManga} />
                    </div>
                </div>
            </div>
            <div className={styles.cardsContainer}>
                <div id="Nivel" className={styles.card}>
                    <div className={styles.imgCard}>
                        <img src={imgNiveles} />
                    </div>
                    <div className={styles.textCardBlack}>
                        <h2>Nivel oficial</h2>
                        <p>Te preparamos para que puedas rendir tus examenes de nivel y validar tus conocimientos</p>
                    </div>
                </div>
                <div id="Turismo" className={styles.card}>
                    <div className={styles.imgCard}>
                        <img src={imgTurismo}/>
                    </div>
                    <div className={styles.textCardMura}>
                        <h2>Expande tus horizontes</h2>
                        <p>Aprender japonés te abre las puertas a hacer turismo en ese hermoso pais, o incluso trabajar en el</p>
                    </div>
                </div>
                <div id="Discord" className={styles.card}>
                    <div className={styles.imgCard}>
                        <img src={imgDiscord} />
                    </div>
                    <div className={styles.textCardBlack}>
                        <h2>Clases en Discord</h2>
                        <p>Todas las clases se dan a traves de Discord. Una vez registrado en la página, podrás acceder al tutorial para crear tu cuenta e ingresar al servidor</p>
                    </div>
                </div>
            </div>
            {/* <div id="turismo" className={styles.sectionContainer}>
                <div className={styles.turismo}>
                    <h2>Expande tus horizontes</h2>
                    <p>¡Aprender japonés te abre las puertas a hacer turismo en ese hermoso pais, o incluso trabajar en el!</p>
                </div>
                <div className={styles.fadeRightT}></div>
                <div className={styles.turismoImgContainer}>
                    <img src={imgTurismo} />
                </div>
            </div>
            <div id="intro" className={styles.sectionContainer}>
                <div className={styles.manga}>
                    <h2>Capacitacion oficial</h2>
                    <p>¡Te preparamos para que puedas rendir tus examenes de nivel!</p>
                </div>
                <div className={styles.fadeLeft}></div>
                <div className={styles.mangaImgContainer}>
                    <img src={imgNiveles} />
                </div>
            </div> */}
        </div>
    )
}

export default Home;