import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Product } from '@/types';

const CART_KEY = '@imperio_bebidas:cart';

export const cartStorage = {
  async getCart(): Promise<CartItem[]> {
    try {
      const cart = await AsyncStorage.getItem(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  },

  async saveCart(cart: CartItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  },

  async addToCart(product: Product, quantity: number = 1): Promise<CartItem[]> {
    const cart = await this.getCart();
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    await this.saveCart(cart);
    return cart;
  },

  async updateQuantity(productId: string, quantity: number): Promise<CartItem[]> {
    const cart = await this.getCart();
    const itemIndex = cart.findIndex(item => item.product.id === productId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
    }

    await this.saveCart(cart);
    return cart;
  },

  async removeFromCart(productId: string): Promise<CartItem[]> {
    const cart = await this.getCart();
    const filteredCart = cart.filter(item => item.product.id !== productId);
    await this.saveCart(filteredCart);
    return filteredCart;
  },

  async clearCart(): Promise<void> {
    await AsyncStorage.removeItem(CART_KEY);
  },

  async getCartTotal(): Promise<number> {
    const cart = await this.getCart();
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },
};
