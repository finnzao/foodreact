import styles from "../../styles/Product.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/cartSlice";

const Product = ({ empanada }) => {
    const [quantity, setQuant] = useState(1);
    const dispatch = useDispatch();
    const price = empanada.price[0].toFixed(2)
    const handleClick = () => {
        dispatch(addProduct({ ...empanada, price, quantity }))
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={empanada.img} fill="fill" alt="" />
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{empanada.title}</h1>
                <span className={styles.price}>R${price}</span>
                <p className={styles.desc}>{empanada.desc}</p>
                <div className={styles.add}>
                    <input onChange={(e) => setQuant(e.target.value)} type="number" defaultValue={1} className={styles.quantity} />
                    <button className={styles.button} onClick={handleClick}>Adicionar ao carrinho</button>
                </div>
            </div>

        </div>
    )
}

export default Product;

export const getServerSideProps = async ({ params }) => {
    const urlBase = process.env.BASE_URL

    const res = await axios.get(`${urlBase}/api/products/${params.id}`);//REQUISÂO POR ID DO PRODUTO
    return {
        props: {
            empanada: res.data
        }
    };
};