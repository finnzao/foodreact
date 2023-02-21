import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react"
import styles from "../../styles/Login.module.css"


function Login() {
    const [username,setUserName]=useState(null);
    const [password,setPassword]=useState(null);
    const [error,setError]=useState(false);
    const  router =useRouter();

    const  handlerClick = async ()=>{
        try {
            await axios.post("http://localhost:3000/api/login",{username,password
        });
        router.push("/admin")
        } catch (error) {
            setError(true)
        }
    };
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1>Login Admin</h1>
            <input type="text"
            placeholder="Username..."
            onChange={(e)=> setUserName(e.target.value)} />
                        <input type="password"
            placeholder="Senha..."
            onChange={(e)=> setPassword(e.target.value)} />
            <button onClick={handlerClick} className={styles.button}>Logar</button>
            { error && <span className={styles.error}>Dados Invalidos !</span>}
        </div>
    </div>
  )
}

export default Login