import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder }) => {
    const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");

    const handleClick = () => {
        createOrder({ customer, address, total, method: 0 });//Preenchendo o array com os valores ejetados no formulario
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Preencha seus dados.</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Nome</label>
                    <input
                        placeholder="Seu nome..."
                        type="text"
                        className={styles.input}
                        onChange={(e) => setCustomer(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Número</label>
                    <input
                        type="text"
                        placeholder="Numero"
                        className={styles.input}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Endereço</label>
                    <textarea
                        rows={5}
                        placeholder="Endereço"
                        type="text"
                        className={styles.textarea}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button className={styles.button} onClick={handleClick}>
                    Confimar
                </button>
            </div>
        </div>
    );
};

export default OrderDetail;