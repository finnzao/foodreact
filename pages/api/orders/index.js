import dbConnect from "../../../lib/mongo";
import Order from "../../../models/Order";
import cookies from "cookie"

const handler = async (req, res) => {
    const { method ,cookies} = req;
    const token=cookies.token

    await dbConnect();

    if (method === "GET") {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if (method === "POST") {
        try {
            if(!token ||  token !== process.env.token){
                return res.status(401).json("Authentication Failure")
            }
            const order = await Order.create(req.body);
            res.status(201).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export default handler;