import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import EmpanadHead2 from "../public/assets/headEmpanadas2.png";
import OrderDetail from "@/componets/OrderDetail";



const Cart = () => {
    const urlBase = process.env.BASE_URL

    //REDUX
    const dispatch = useDispatch();

    const router = useRouter()

    //State para abrir opções de pagamentos
    const [open, setOpen] = useState(false);

    //STATE PARA METODO DE PAGAMENTO EM DINHEIRO
    const [cash, setCash] = useState(false);

    //ALTERAÇÂO NA QUANTIDADE DE COMPONETES DO CARRINHOs
    const cart = useSelector(state => state.cart)

    // This values are the props in the UI 
    const amount = cart.total.toFixed(2);
    const currency = "BRL";
    const style = { "layout": "vertical" };
    //Valores Acima seram usados na configuração ao clicar o butão do paypal
    const createOrder = async (data) => {
        try {
            const res = await axios.post(`${urlBase}/api/orders`, data);
            res.status === 201 && router.push("/orders/" + res.data._id)
            dispatch(reset())
        } catch (error) {
            console.log(error)
        }
    };

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);


        return (<>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order

                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping;
                        createOrder({
                            customer: shipping.name.full_name,
                            total: amount,
                            method: 1
                        })
                    });
                }}
            />
        </>
        );
    }
    ///



    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Item</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Total</th>
                        </tr>
                    </tbody>
                    <tbody>


                        {
                            cart.products.map((product) => (
                                <tr className={styles.tr} key={product._id}>
                                    <td>
                                        <th className={styles.imgContainer}>
                                            <Image
                                                src={EmpanadHead2}
                                                fill="fill"
                                                alt=""

                                            />
                                        </th>
                                    </td>
                                    <td>
                                        <th className={styles.name}>{product.title}</th>
                                    </td>
                                    <td>
                                        <th className={styles.price}>R${(product.price)}</th>
                                    </td>
                                    <td>
                                        <th className={styles.quantity}>{product.quantity}</th>
                                    </td>
                                    <td>
                                        <th className={styles.total}>R${(product.price * product.quantity).toFixed(2)}</th>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>R${amount}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Desconto:</b>$0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>R${amount}
                    </div>
                    {open ? (
                        <div className="paymentMethods">

                            <button
                                className={styles.payButton}
                                onClick={() => setCash(true)}
                            >
                                DINHEIRO
                            </button>
                            <PayPalScriptProvider

                                options={{
                                    "client-id":
                                        "AQJuwza9lt2Hf_k-Tqsl7rZ1NC1cbU63OQEM87PGjH2gOAvF4J2sgP9G616AK2RuRoZZBxjN3ddZfAWi",
                                    components: "buttons",
                                    currency: "BRL",
                                    "disable-funding": "credit,card,p24"
                                }}
                            >
                                <ButtonWrapper
                                    currency={currency}
                                    showSpinner={false}
                                />
                            </PayPalScriptProvider>
                        </div>
                    ) : (
                        <button onClick={() => setOpen(true)} className={styles.button}>Finalizar Comprar!</button>
                    )}
                </div>
                <div>
                    {cash && (
                        <OrderDetail total={amount} createOrder={createOrder}></OrderDetail> //PREENCHENDO OS PARAMENTODS QUE SÂO RECEBENDO NO MODULO ORDER DETAIL
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;