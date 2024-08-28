import Carousel from "../../components/Carousel/Carousel"
import styles from "./home.module.css"
import img1 from "./img/4-idioma-japon.jpg"
import img2 from "./img/aprende-japones.jpg"
import img3 from "./img/nipon.jpg"

const IMAGES = [img1, img2, img3]

const Home = () => {
    return (
        <>
        <div className={styles.carouselContainer}>
            <Carousel imageUrls={IMAGES} />
        </div>
        </>
    )
}

export default Home;