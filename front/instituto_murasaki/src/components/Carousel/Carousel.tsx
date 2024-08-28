import styles from "./carousel.module.css"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Circle, CircleDot } from "lucide-react"

type CarouselProps = {
    imageUrls: string[]
}

const Carousel = ({ imageUrls }: CarouselProps) => {
    const [imageIndex, setImageIndex] = useState(0)

    function showPrevImage() {
        setImageIndex(index => {
            if (index === 0) return imageUrls.length - 1
            return index - 1
        })
    }

    function showNextImage() {
        setImageIndex(index => {
            if (index === imageUrls.length - 1) return 0
            return index + 1
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            showNextImage();
        }, 5000);

        return () => clearInterval(interval);
    }, [imageIndex]);

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselImages}>
                {imageUrls.map(url => (
                    <img key={url} src={url} className={styles.carousel} style={{
                        translate: `${-100 * imageIndex}%`
                    }} />
                ))}
            </div>
            <button onClick={showPrevImage} className={styles.carouselButton} style={{ left: 0 }}>
                <ChevronLeft />
            </button>
            <button onClick={showNextImage} className={styles.carouselButton} style={{ right: 0 }}>
                <ChevronRight />
            </button>
            <div className={styles.bottomButtonsContainer}>
                {imageUrls.map((_, index) => (
                    <button key={index} className={styles.bottomButtons} onClick={() => setImageIndex(index)}>{index === imageIndex ? <CircleDot /> : <Circle />}</button>
                ))}
            </div>
        </div>
    )
}

export default Carousel;