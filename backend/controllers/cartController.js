import Cart from "../models/Cart";

export const addtoCart = async (req, res) => {
    try{
        const userid = req.user._id;
        const {items, total} = req.body;
        const cart = await Cart.findOne({userid});
        if(!cart){
            const newCart = new Cart({
                userid,
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
        const userid = req.user._id;
        const cart = await Cart.findOne({userid});
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
};


