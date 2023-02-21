import styles from "../styles/AddProductsButton.module.css";

const AddButton = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      Adicionar novo produto
    </div>
  );
};

export default AddButton;