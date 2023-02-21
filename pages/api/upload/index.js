const { cloudinary } = require('../../../utils/cloudinary');
import cookies from "cookie";
export default async function handler(req, res) {
    const { method } = req;//pegando tipo de requisição
    const token=cookies.token

    if (method === "POST") {
        try {
            const fileStr =req.body.data;
            const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
                upload_preset:'dev_product'
            })
            res.send(uploadedResponse)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }


}