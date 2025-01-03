import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
  
    const addToCart = (item) => {
      setCartItems((prevItems) => {
        const itemExists = prevItems.find((cartItem) => cartItem._id === item._id); 
        if (itemExists) {
          return prevItems.map((cartItem) =>
            cartItem._id === item._id 
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          return [...prevItems, { ...item, quantity: 1 }];
        }
      });
    };
  
    const updateQuantity = (id, newQuantity) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item 
        )
      );
    };
  
    const removeItem = (id) => {
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id)); 
    };
  
    return (
      <CartContext.Provider
        value={{ cartItems, addToCart, updateQuantity, removeItem }}
      >
        {children}
      </CartContext.Provider>
    );
  };
  