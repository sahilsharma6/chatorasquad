import Cart from "../models/Cart.js";
import Menu from "../models/Menu.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user?._id;

    const itemId = req.params.id;

    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid item " });
    }

    const menuItem = await Menu.findById(itemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Item not found in menu" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [
          {
            itemId,
            name: menuItem.name,
            quantity: 1,
            sellingPrice: menuItem.discountedPrice || menuItem.sellingPrice,
          },
        ],
        total: menuItem.discountedPrice || menuItem.sellingPrice,
      });
      await newCart.save();
      return res
        .status(201)
        .json({ message: "Cart created successfully", cart: newCart });
    } else {
      const existingItem = cart.items.find(
        (item) => item.itemId.toString() === itemId
      );

      if (existingItem) {
        existingItem.quantity += 1;
        const sellingPrice = menuItem.discountedPrice || menuItem.sellingPrice;
        cart.total += sellingPrice;
      } else {
        cart.items.push({
          itemId,
          name: menuItem.name,
          quantity: 1,
          sellingPrice: menuItem.discountedPrice || menuItem.sellingPrice,
        });
        cart.total += menuItem.discountedPrice || menuItem.sellingPrice;
      }

      await cart.save();
      return res
        .status(200)
        .json({ message: "Cart updated successfully", cart });
    }
  } catch (error) {
    console.error("Error in addToCart:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const validItems = [];
    let updatedTotal = 0;

    for (const item of cart.items) {
      const menuItem = await Menu.findById(item.itemId);
      if (menuItem) {
        validItems.push(item);
        updatedTotal += item.quantity * item.sellingPrice;
      }
    }

    cart.items = validItems;
    cart.total = updatedTotal;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error in getCart:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const DeleteFromCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    const itemId = req.params.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }


    const itemObjectId = new mongoose.Types.ObjectId(itemId);

    const itemIndex = cart.items.findIndex(
      (item) => item.itemId.equals(itemObjectId) 
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const [removedItem] = cart.items.splice(itemIndex, 1);
    cart.total -= removedItem.quantity * removedItem.sellingPrice;

    if (cart.total < 0) cart.total = 0;

    await cart.save();

    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user?._id;
    const itemId = req.params.id;
    const { quantity } = req.body;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    if (quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find((item) => item.itemId.toString() === itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    const menuItem = await Menu.findById(itemId);
    if (!menuItem) {
      return res.status(404).json({ message: "Item not found in menu" });
    }
    const prevQuantity = item.quantity;
    item.quantity = quantity;
    cart.total += (quantity - prevQuantity) * item.sellingPrice;
    await cart.save();
    res.status(200).json({ message: "Quantity updated successfully", cart });
  } catch (error) {
    console.error("Error in updateQuantity:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
