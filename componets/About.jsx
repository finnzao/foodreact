import styles from "../styles/About.module.css"

function About() {
    return (
        <div id="about" className={styles.container}>

            <div className={styles.left}>
                <div className={styles.title}>
                    <h1>Empanados com o gosto da Argetina agora na sua mesa</h1>
                </div>
            </div>
            <div className={styles.right}>
                <p className={styles.text}>Venha experimentar as nossas Empandas  deliciosas! Temos opções para todos os gostos, desde sabores tradicionais até as mais inovadoras. Além disso, utilizamos o mesmo padrão de qualidade das empanadas da Argetina agora entregue na sua casa. Não perca a oportunidade de experimentar
                    a melhor Empanada da cidade! Aqui no Caminito!</p>
            </div>
        </div>
    )
}

export default About;