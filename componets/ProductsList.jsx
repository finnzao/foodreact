import styles from "../styles/ProductsList.module.css"
import ProductCard from "./ProductCard"
const ProductsList = ({ prodList }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}> Destaques</h1>
            <p className={styles.desc}>
                Os pedidos mais frequentes separados diretamente para você
            </p>
            <div className={styles.wrapper}>
                {prodList.map((item) => (
                    <ProductCard key={item._id} prodInfos={item} />
                ))}
            </div>
        </div>
    )
}

export default ProductsList;