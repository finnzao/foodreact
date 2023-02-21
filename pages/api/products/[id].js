import dbConnect from "@/lib/mongo";
import Product from "@/models/Product";


export default async function handler(req, res) {
    const {
        method,//pegando tipo de requisição
        query: { id },//PEGANDO ID atraves do BODY
        cookies
    } = req;
    const token = cookies.token

    dbConnect();

    if (method === "GET") {
        const product = await Product.findById(id);//ENCOTRANDO ATRAVES DO ID
        res.status(200).json(product);
    }

    
    if (method === "PUT") {
  
        try {
          const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          res.status(200).json(product);
        } catch (err) {
          res.status(500).json(err);
        }
      }

    if (method === "DELETE") {
     
        try {
            await Product.findByIdAndDelete(id);
            res.status(200).json("O produto foi deletado");
        } catch (err) {
            res.status(500).json(err)
        }
    }


}
