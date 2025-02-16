import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
const CartContext = createContext();

// Provider
export const CartProvider = ({ children }) => {
  // Retrieve initial state from local storage
  const getInitialCart = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const getInitialTotalCost = () => {
    const savedTotalCost = localStorage.getItem('totalCost');
    return savedTotalCost ? JSON.parse(savedTotalCost) : 0;
  };

  const [cart, setCart] = useState(getInitialCart);
  const [totalCost, setTotalCost] = useState(getInitialTotalCost);

  // Persist cart and total cost to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('totalCost', JSON.stringify(0));
  }, [totalCost]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + (item.qty || 1) }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, qty: item.qty || 1 }];
      }
    });
  
    setTotalCost((prevCost) => prevCost + item.cost * (item.qty || 1));
  };
  

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((cartItem) => cartItem.id === id);
      if (!itemToRemove) return prevCart;

      const updatedCart = prevCart.filter((cartItem) => cartItem.id !== id);
      setTotalCost((prevCost) => prevCost - itemToRemove.cost * itemToRemove.qty);
      localStorage.removeItem('totalCost')
      localStorage.setItem('totalCost', JSON.stringify(totalCost));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, totalCost, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => {
  return useContext(CartContext);
};
