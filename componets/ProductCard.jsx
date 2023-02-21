import styles from "../styles/ProductCard.module.css"
import Image from "next/image";
import Link from "next/link";
const ProductCard = ({ prodInfos }) => {
    const price = prodInfos.price[0].toFixed(2)
    return (
        <div className={styles.container}>
            <Link href={`/product/${prodInfos._id}`}>
                <Image src={prodInfos.img} width="300" height="300" alt="" />
            </Link>
            <h1 className={styles.title}>{prodInfos.title}</h1>
            <span className={styles.price}>R${price}</span>
            <p className={styles.desc}>
                {prodInfos.desc}
            </p>
        </div>
    )
}

export default ProductCard;