import Image from "next/image";
import styles from "../../styles/Admin.module.css";
import axios from "axios";
import { useState } from "react";
import AddProduct from "../../componets/AddProducts";
import AddButton from "@/componets/AddProductsButton";


function Index({ orders, products }) {
    const urlBase = process.env.BASE_URL

    const [productList, setProductList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["Preparando", "No Caminho", "Entregue"];
    const [close, setClose] = useState(true)

    //State acima será usado para remover assim que se clicar no botão
    const handleDelete = async (id) => {
        console.log(id);
        try {
            const res = await axios.delete(
                `${urlBase}/api/products/` + id
            );
            setProductList(productList.filter((product) => product._id !== id));//RECARREGANDO LISTA ,E ORGANIZANDO
        } catch (err) {
            console.log(err);
        }
    };

    const handleStatus = async (id) => {
        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;

        try {
            const res = await axios.put(`${urlBase}/api/orders/` + id, {
                status: currentStatus + 1,
            });
            setOrderList([
                res.data,
                ...orderList.filter((order) => order._id !== id),//RECARREGANDO LISTA ,E ORGANIZANDO
            ]);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Produtos</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Imagem</th>
                            <th>Id</th>
                            <th>Titulo</th>
                            <th>Preço</th>
                            <th>Ação</th>
                        </tr>
                    </tbody>

                    {productList.map((product) => (//productList é imprido atraves do useState assim quando ocorre alguma mudanças visual ela será sicrona 
                        <tbody key={product._id}>

                            <tr className={styles.trTitle}>
                                <td>
                                    <Image
                                        src={product.img}
                                        width={50}
                                        height={50}
                                        alt=" " />
                                </td>
                                <td>{product._id.slice(0, 5)}...</td>
                                <td>{product.title}</td>
                                <td>R${(product.price[0]).toFixed(2)}</td>
                                <td>
                                    <button className={styles.button}>Editar</button>
                                    <button className={styles.button}
                                        onClick={() => handleDelete(product._id)}>Deletar</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
                {
                    <AddButton setClose={setClose} />
                }
                {!close && <AddProduct setClose={setClose} />}
            </div>

            <div className={styles.item}>
                <h1 className={styles.title}>Pedidos</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Pagamento</th>
                            <th>Status</th>
                            <th>Processo</th>
                        </tr>
                    </tbody>
                    {orderList.map((ordem) => (

                        <tbody key={ordem._id}>
                            <tr className={styles.trTitle}>

                                <td>{ordem._id}</td>
                                <td>{ordem.customer}</td>
                                <td>R${(ordem.total).toFixed(2)}</td>
                                <td>{ordem.method == 0 ? <span>Pix</span> : <span>Cartão</span>}</td>
                                <td>{ordem.status > 2 ? <span>Completo</span> : <span>{status[ordem.status]}</span>}</td>
                                <td>
                                    <button className={styles.button} onClick={() => handleStatus(ordem._id)}>Proximo estado</button>
                                </td>
                            </tr>
                        </tbody>

                    ))}
                </table>
            </div>
        </div>
    )
}
export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";
    const urlBase = process.env.BASE_URL

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanet: false,
            }
        }
    }
    const productRes = await axios.get(`${urlBase}/api/products`);
    const orderRes = await axios.get(`${urlBase}/api/orders`);

    return {
        props: {
            orders: orderRes.data,//Sendo exportado para ser ser usado na função
            products: productRes.data,//Sendo exportado para ser ser usado na função
        },
    };
};

export default Index;