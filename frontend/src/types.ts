export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'cliente',
}

export interface User {
  id: number;
  nome: string;
  email: string;
  role: UserRole;
  cliente_id?: number;
}

export interface Client {
  id: number;
  nome: string;
  email: string;
  plano: string;
  ativo: boolean;
}

export interface OrderItem {
  id: number;
  order_id: number;
  nome: string;
  quantidade: number;
  preco: number;
}

export interface Order {
  id: number;
  cliente_id: number;
  dados_do_pedido: {
    customerName: string;
    deliveryAddress: string;
  };
  created_at: string;
  items: OrderItem[];
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface CreateOrderItem {
  nome: string;
  quantidade: number;
  preco: number;
}

export interface CreateOrder {
  dados_do_pedido: {
    customerName: string;
    deliveryAddress: string;
  };
  items: CreateOrderItem[];
}
