import { useState } from "react";
import styles from "../styles/AddProduct.module.css";
import axios from "axios";
import  config from "@/next.config";
const Add=({setClose})=>{
    const urlBase= config.apiUrl
    const [selectedFile, setSelectedFile] = useState();
    //LIDANDO COM OS VALORES DA CRIAÇÂO DO PRODUTOI
    const [file,setFile]=useState('');
    const [title,setTitle]=useState(null);
    const [desc,setDesc]=useState(null);
    const [price,setPrice]=useState(null);
    const [urlImg,setUrlImg]=useState('')
    //MOSTRANDO A IMAGEM ESCOLHIDA
    const [previewSource,setPreviewSource]=useState()
    const handleFileInputChange = (e) => {//MOSTRANDO IMAGEM SELECIONADA
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFile(e.target.value);
    };
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);//transformando na represetanção em STRING da imagem
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        if (!selectedFile) return;
        uploadImage(previewSource)
    };
    const uploadImage =  (base64EncodedImage) => {
        try {
            fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response=>response.json())
            .then(data=> createProd(data.url))

        } catch (err) {
            console.error(err);
            
        }    
    };


    
    const createProd= async(e)=>{
        const newProduct={
            title,
            desc,
            price,
            img:e
        };
        await axios.post(`${urlBase}/api/products`,newProduct);

    }

    const handleCreate=  ()=>{
        try { 
            handleSubmitFile(file);
            setPreviewSource('');
            setSelectedFile('');
            console.log("IN")
            setClose(true)
        }  catch (error) {
            console.log(error)
        }
    }
    return(

        <div className={styles.container}>
            

            
            <div className={styles.wrapper}>
                <div className={styles.closeButton}>
                <span onClick={()=>setClose(true)} className={styles.close}>
                    X
                </span>
                    </div>

                <h1>Adicionar novo Produto</h1>

                <div className={styles.item}>
                    <label className={styles.label}>Escolha a imagem clicando abaixo</label>

                    <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={file}
                    className="form-input"

                />
                <br></br>


                    {previewSource && (
                        <img src={previewSource} alt="chosen" 
                        style={{height:'300px',width:"300px"}}
                       />
                    )}
                </div>
                
                <div className={styles.item}>
                    <label className={styles.label}>Nome</label>
                    <input className={styles.input} type="text" 
                    onChange={(e)=> setTitle(e.target.value)}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Descrição</label>
                    <textarea type="text" 
                    rows={4}
                    onChange={(e)=> setDesc(e.target.value)}/>
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>Preço</label>
                    <input className={styles.price}  type="Number" 
                    onChange={(e)=> setPrice(e.target.value)}/>
                </div>

                <button className={styles.button} onClick={handleCreate }>
                    Adicionar
                </button>
            </div>
    
        
        </div>
    )
};

export default Add