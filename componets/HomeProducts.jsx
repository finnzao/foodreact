import styles from "../styles/ProductsList.module.css"
import ProductCard from "./ProductCard"
import ButtonPrimay from "./button/buttonPrimary/ButtonPrimary"
const ProductsList = ({ prodList }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}> Melhores empandas da região</h1>
            <p className={styles.desc}>
                Os pedidos mais frequentes separados diretamente para você
            </p>
            <div className={styles.wrapper}>
            {prodList.slice(0, 5).map((item) => (
                    <ProductCard key={item._id} prodInfos={item} />
                ))}            
                </div>
                <ButtonPrimay />

        </div>
    )
    
}

export default ProductsList;