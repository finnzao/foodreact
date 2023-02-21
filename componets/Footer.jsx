import styles from "../styles/Footer.module.css";

const Footer = () => {


    return (
        <div className={styles.container}>
            <div className={styles.copyright}>
                &#169; Copyright <span></span>2023- Empanadas Caminito BH

            </div>
        </div>
    )
}

export default Footer;