import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));

    if (savedCart && savedCart.length >= 0) {
      setCartItems(savedCart);
    } else {
      fetchCartFromBackend();
    }
  }, []);

  useEffect(() => {
    if (cartItems.length >= 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const fetchCartFromBackend = async () => {
    try {
      const response = await fetch("/menu/getCart");
      const data = await response.json();

      if (response.ok && data.cartItems) {
        setCartItems(data.cartItems);
      } else {
        console.error("Error fetching cart from backend");
      }
    } catch (error) {
      console.error("Error fetching cart from backend:", error);
    }
  };

  const addToCart = async (item) => {
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

    try {
      const response = await fetch("/menu/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item }),
      });
      if (!response.ok) {
        console.error("Failed to add item to cart on the backend");
      }
    } catch (error) {
      console.error("Error adding item to backend cart:", error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );

    try {
      const response = await fetch(`/menu/updateCartItem/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!response.ok) {
        console.error("Failed to update item quantity on the backend");
      }
    } catch (error) {
      console.error("Error updating item quantity on the backend:", error);
    }
  };

  const removeItem = async (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));

    try {
      const response = await fetch(`/menu/removeFromCart/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.error("Failed to remove item from the backend cart");
      }
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
  