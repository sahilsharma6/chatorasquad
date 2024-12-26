import Order from '../models/Order.js';


export const addOrder = async (req, res) => {
    try{
        // payment gateway


        const paymentStatus = "Paid";
        const {userid,date,time,items,total,deliveryAddress,orderStatus} = req.body;
        const order = new Order({
            userid,
            date,
            time,
            items,
            paymentStatus,
            total,
            deliveryAddress,
            orderStatus
        });
        await order.save();
        res.status(200).json({message:"Order added successfully"});
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}


export const updateOrderStatus = async (req, res) => {
    try{
        const status = req.body.orderStatus;
        const id = req.params.id;
        const order = await Order.findById(id);
        if(order){
            order.orderStatus = status;
            await order.save();
            res.status(200).json({message:"Order status updated successfully"});
        }
        else{
            res.status(400).json({message:"Order not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}


export const getOrderDetails = async (req, res) => {
    try{
        const id = req.params.id;
        const order = await Order.findById(id);
        if(order){
            res.status(200).json(order);
        }
        else{
            res.status(400).json({message:"Order not found"});
        }
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}


export const getOrdersByFilter = async (req, res) => {
    try{
        const id = req.params.id;
        const {orderStatus,paymentStatus, date} = req.body;
        const query = {};
        if(orderStatus){
            query.orderStatus = orderStatus;
        }
        if(paymentStatus){
            query.paymentStatus = paymentStatus;
        }
        if(date){
            query.date = date;
        }
        query.userid = id;
        const orders = await Order.find(query);
        res.status(200).json(orders);
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});

    }
}


