import { useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { cartStorage } from '@/utils/cartStorage';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    const loadedCart = await cartStorage.getCart();
    setCart(loadedCart);
    setLoading(false);
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    const updatedCart = await cartStorage.addToCart(product, quantity);
    setCart(updatedCart);
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const updatedCart = await cartStorage.updateQuantity(productId, quantity);
    setCart(updatedCart);
  };

  const removeFromCart = async (productId: string) => {
    const updatedCart = await cartStorage.removeFromCart(productId);
    setCart(updatedCart);
  };

  const clearCart = async () => {
    await cartStorage.clearCart();
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotal,
    getItemCount,
  };
}
