import Link from "next/link";
import styles from "../../../styles/ButtonPrimary.module.css";
const Buttonprimary = (props)=>{

    return (

    <div className={styles.container}>
        <Link href="/cardapio">
        <button>Cardapio</button>
        </Link>
    </div>
    )
}


export default Buttonprimary;