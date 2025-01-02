import Cart from "../models/Cart.js";

export const addtoCart = async (req, res) => {
    try{
        const userId = req.user._id;
        const {items, total} = req.body;
        const cart = await Cart.findOne({userId});
        if(!cart){
            const newCart = new Cart({
                userId,
                items,
                total
            });
            await newCart.save();
        }
        else{
            cart.items = items;
            cart.total = total;
            await cart.save();
        }

        res.status(201).json({message:"Cart added successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const getCart = async (req, res) => {
    try{
        const userId = req.user._id;
        const cart = await Cart.findOne({userId});
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
};


