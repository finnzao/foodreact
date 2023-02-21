import styles from "../../styles/orders.module.css";
import Image from "next/image";
import Bike from "../../public/assets/bike.png";
import Pago from "../../public/assets/pago.png";
import Entregue from "../../public/assets/caminho.png";
import Check from "../../public/assets/checked.png";
import Preparando from "../../public/assets/preparando.png";
import ArrowDown from "../../public/assets/arrow-down.svg";
import axios from "axios";

const orders = ({ order }) => {
    console.log(order)
    const status = order.status;
    const subtotal = (order.total).toFixed(2)

    const statusClass = (index) => {
        if (index - status < 1) return styles.done;
        if (index - status === 1) return styles.inProgress;
        if (index - status > 1) return styles.notDone;
    };

    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <div className={styles.row}>
                    <div className={styles.textThanks}>
                        <p>Olá,<mark>{order.customer.split(' ')[0]}</mark>! Seu pedido está sendo preparado e em breve chegará para você. </p>
                        <div className={styles.clientId}>
                            Codigo do pedido: <span className={styles.code_id}> {order._id}</span>
                        </div>
                    </div>


                    <div className={statusClass(0)}>

                        <Image src={Pago} width={30} height={30} alt="" />
                        <span >Pagamento completo</span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src={Check} width={30} height={30} alt=""></Image>
                        </div>
                    </div>

                    <Image className={styles.ArrowDown} src={ArrowDown} width={40} alt="" />


                    <div className={statusClass(1)}>
                        <Image src={Preparando} width={30} height={30} alt="" />
                        <span >Preparando</span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src={Check} width={30} height={30} alt=""></Image>
                        </div>
                    </div>

                    <Image className={styles.ArrowDown} src={ArrowDown} width={40} alt="" />

                    <div className={statusClass(2)}>
                        <Image src={Bike} width={30} height={30} alt="" />
                        <span >A caminho</span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src={Check} width={30} height={30} alt=""></Image>
                        </div>
                    </div>
                    <Image className={styles.ArrowDown} src={ArrowDown} width={40} alt="" />


                    <div className={statusClass(3)}>
                        <Image src={Entregue} width={30} height={30} alt="" />
                        <span >Entregue com Sucesso</span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src={Check} width={30} height={30} alt=""></Image>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>R${subtotal}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Desconto:</b>$0.00
                    </div>

                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>R${subtotal}
                    </div>
                    <button disabled className={styles.button}>Pagamento Completo</button>
                </div>
            </div>
        </div >
    )
};

export const getServerSideProps = async ({ params }) => {
    const urlBase = process.env.BASE_URL

    const res = await axios.get(`${urlBase}}/api/orders/${params.id}`);
    return {
        props: { order: res.data },
    };
};

export default orders;