import React, { useState, useEffect, useCallback } from 'react';
import { Order, CreateOrder } from '../types';
import api from '../services/api';
import Spinner from '../components/Spinner';
import Layout from '../components/Layout';
import NewOrderModal from '../components/NewOrderModal';

const PainelPedidos: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api<Order[]>('/orders');
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch orders.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  
  const handleCreateOrder = async (newOrder: CreateOrder) => {
    try {
      await api<Order>('/orders', {
        method: 'POST',
        body: JSON.stringify(newOrder),
      });
      fetchOrders(); // Refresh orders list
    } catch (err) {
      console.error('Failed to create order:', err);
      // Re-throw to allow modal to handle its state and display the error
      throw err; 
    }
  };

  const totalOrderValue = (order: Order) => {
    return order.items.reduce((sum, item) => sum + item.preco * item.quantidade, 0).toFixed(2);
  }

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-10"><Spinner /></div>;
    }

    if (error) {
      return <div className="text-center py-10 text-red-500 font-semibold">{error}</div>;
    }

    if (orders.length === 0) {
      return <div className="text-center py-10 text-slate-500">No orders yet. Start by creating a new one!</div>;
    }

    return (
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-primary">Order #{order.id}</h3>
                    <p className="text-sm text-slate-500">Customer: {order.dados_do_pedido.customerName}</p>
                    <p className="text-sm text-slate-500">Address: {order.dados_do_pedido.deliveryAddress}</p>
                    <p className="text-sm text-slate-400">Date: {new Date(order.created_at).toLocaleString()}</p>
                </div>
                <div className="text-right">
                     <p className="text-2xl font-bold text-slate-800">${totalOrderValue(order)}</p>
                </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Items:</h4>
              <ul className="divide-y divide-slate-200">
                {order.items.map(item => (
                  <li key={item.id} className="py-2 flex justify-between">
                    <span className="text-slate-600">{item.nome} (x{item.quantidade})</span>
                    <span className="font-medium text-slate-800">${(item.preco * item.quantidade).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">My Orders</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-pink-700 transition duration-300">
          + New Order
        </button>
      </div>
      {renderContent()}
      <NewOrderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrder}
      />
    </Layout>
  );
};

export default PainelPedidos;
