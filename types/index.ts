export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: any; // Aceita tanto require() (number) quanto string (URL)
  description: string;
  volume?: string;
  alcoholContent?: string;
  rating: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export type PaymentMethod = 'dinheiro' | 'debito' | 'credito' | 'pix';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pendente' | 'confirmado' | 'entregue' | 'cancelado';
  date: Date;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: PaymentMethod;
}
