import React, { createContext, useState, useContext, useEffect } from "react";
import apiClient from "../services/apiClient"; 


const CartContext = createContext();


export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const initializeCart = async () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem("cartItems"));
        if (savedCart && savedCart.length > 0) {
          setCartItems(savedCart);
        } else {
          await fetchCartFromBackend();
        }
      } catch (error) {
        console.error("Error initializing cart:", error);
      }
    };
    initializeCart();
  }, []);


  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to update cart in localStorage:", error);
    }
  }, [cartItems]);

  // Fetch cart from backend
  const fetchCartFromBackend = async () => {
    try {
      const { data } = await apiClient.get("/user/getcart");
      if (Array.isArray(data.cartItems)) {
        setCartItems(data.cartItems);
      }
    } catch (error) {
      console.error("Error fetching cart from backend:", error);
    }
  };

  // Add item to cart
  const addToCart = async (item) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCartItems(updatedCart);

    try {
      await apiClient.post("/user/addtocart", { item });
    } catch (error) {
      console.error("Error adding item to backend cart:", error);
    }
  };

  // Update item quantity
  const updateQuantity = async (id, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );

    setCartItems(updatedCart);

    try {
      await apiClient.put(`/user/updatecart/${id}`, { quantity: newQuantity });
    } catch (error) {
      console.error("Error updating item quantity on the backend:", error);
    }
  };

  // Remove item from cart
  const removeItem = async (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);

    try {
      await apiClient.delete(`/user/deletefromcart/${id}`);
    } catch (error) {
      console.error("Error removing item from backend cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
