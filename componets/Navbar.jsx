import styles from "../styles/Navbar.module.css"
import Image from "next/image";
import phoneCall from "../public/assets/telephone-fill.svg";
import icon from "../public/assets/icon.png";
import bag from "../public/assets/bag-fill.svg";
import { useSelector } from "react-redux";
import Link from "next/link";
const NavBar = () => {

    const quantity = useSelector((state) => state.cart.quantity)
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.callButton}>
                    <Image src={phoneCall}></Image>
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}></div>
                </div>
            </div>
            <div className={styles.item}>
                <ul className={styles.list}>
                    <Link href="/">
                        <li className={styles.listItem}>Home</li>
                    </Link>
                    <a href="/#about">
                    <li className={styles.listItem}>
                         Sobre</li></a>
                    <Image className={styles.icon} src={icon}></Image>
                    <Link href="/cardapio">
                    <li className={styles.listItem}>Cardapio</li>
                    </Link>
                    <li className={styles.listItem}>Contato</li>
                </ul>
            </div>

            <div className={styles.item}>
                <Link href="/cart" passHref>
                    <div className={styles.cart}>
                        <Image src={bag} className={styles.cartSvg}></Image>
                        <div className={styles.counter}>{quantity}</div>
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default NavBar;