"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface CartItem {
  id: string;
  type: string;
  details: any;
  price: number;
  flightNumber?: number; 
  departure?: Date; 
  arrival?: Date;
  itineraries?: [];
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>; 
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};