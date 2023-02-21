import dbConnect from "@/lib/mongo";
import Product from "@/models/Product";

export default async function handler(req, res) {
    const { method,cookies} = req;//pegando tipo de requisição
       
    const token=cookies.token
    dbConnect();
    
    if (method === "GET") {
        try {
            const products = await Product.find();
            res.status(200).json(products);
          } catch (err) {
            res.status(500).json(err);
          }
    }
    if (method === "POST") {

 
        try {
            const product = await Product.create(req.body);//Usando o metodo do mongosse para criar tabela com o padrão da shecama
            res.status(201).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    }


}
