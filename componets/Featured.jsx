import styles from "../styles/Featured.module.css";
import Image from "next/image";
import ArrowLeft from "../public/assets/arrowl.png";
import ArrowRight from "../public/assets/arrowr.png";
import EmpanadHead1 from "../public/assets/headEmpanadas.png"
import EmpanadHead2 from "../public/assets/headEmpanadas2.png"
import EmpanadHead3 from "../public/assets/headEmpanadas3.png"
import Empanda2 from "../public/assets/emapandabackground.jpeg"
import { useState } from "react";
const Featured = () => {
    const [index, setIndex] = useState(0)


    const images = [
        EmpanadHead1,
        EmpanadHead2,
        EmpanadHead3,
    ];
    const handlerArrow = (direction) => {
        if (direction === "l") {
            setIndex(index !== 0 ? index - 1 : 2)
        }
        if (direction === "r") {
            setIndex(index !== 2 ? index + 1 : 0)
        }
    };

    return (

        <div className={styles.container}>
            <div className={styles.arrowContainer} style={{ left: 0 }} onClick={() => handlerArrow("l")}>
                <Image src={ArrowLeft} alt="ArrowLeft" fill="fill" ></Image>
            </div>
            <div className={styles.wrapper} style={{ transform: `translateX(${-100 * index}vw` }}>
                {images.map((img, i) => (
                    <div className={styles.imgContainer}>
                        <Image src={img} key={img.toString()} alt="" fill="fill" />
                    </div>
                ))}
            </div>
            <div className={styles.arrowContainer} style={{ right: 0 }} onClick={() => handlerArrow("r")}>
                <Image src={ArrowRight} alt="ArrowRight" fill="fill"></Image>
            </div>
        </div>
    )
}

export default Featured;