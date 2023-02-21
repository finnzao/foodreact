import styles from "../../styles/ProductsList.module.css";
import ProductCard from "../../componets/ProductCard";
import axios from "axios";

const ProductsList = ({ prodList }) => {


  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Cardapio</h1>
      <p className={styles.desc}>
      </p>
      <div className={styles.wrapper}>
        {prodList.map((item) => (
          <ProductCard key={item._id} prodInfos={item} />
        ))}
      </div>
    </div>
  )
}
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  const urlBase = process.env.BASE_URL

  if (myCookie.token === process.env.TOKEN) {
    admin = true
  }
  const res = await axios.get(`${urlBase}/api/products`);
  return {
    props: {
      prodList: res.data,
      admin
    }
  };
};
export default ProductsList;