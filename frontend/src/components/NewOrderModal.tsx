import React, { useState } from 'react';
import { CreateOrder, CreateOrderItem } from '../types';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: CreateOrder) => Promise<void>;
}

const NewOrderModal: React.FC<NewOrderModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [items, setItems] = useState<CreateOrderItem[]>([{ nome: '', quantidade: 1, preco: 0 }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleItemChange = (index: number, field: keyof CreateOrderItem, value: string | number) => {
    const newItems = [...items];
    const item = newItems[index];
    (item[field] as any) = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { nome: '', quantidade: 1, preco: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const newOrder: CreateOrder = {
        dados_do_pedido: { customerName, deliveryAddress },
        items: items.map(item => ({...item, quantidade: Number(item.quantidade), preco: Number(item.preco)}))
      };
      await onSubmit(newOrder);
      // Reset form on successful submission
      setCustomerName('');
      setDeliveryAddress('');
      setItems([{ nome: '', quantidade: 1, preco: 0 }]);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-800">Create New Order</h2>
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">Delivery Address</label>
                <input
                  type="text"
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <hr className="my-6" />

            <h3 className="text-lg font-semibold text-slate-700 mb-3">Items</h3>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5">
                    <input type="text" placeholder="Item Name" value={item.nome} onChange={(e) => handleItemChange(index, 'nome', e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                  </div>
                  <div className="col-span-3">
                    <input type="number" placeholder="Qty" value={item.quantidade} min="1" onChange={(e) => handleItemChange(index, 'quantidade', parseInt(e.target.value, 10))} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                  </div>
                   <div className="col-span-3">
                    <input type="number" placeholder="Price" value={item.preco} min="0" step="0.01" onChange={(e) => handleItemChange(index, 'preco', parseFloat(e.target.value))} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                  </div>
                  <div className="col-span-1 text-right">
                    <button type="button" onClick={() => removeItem(index)} disabled={items.length <= 1} className="text-red-500 hover:text-red-700 disabled:text-gray-300 text-2xl leading-none">&times;</button>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={addItem} className="mt-4 text-sm font-medium text-primary hover:text-blue-800">+ Add Item</button>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-800 disabled:bg-slate-400">
              {isSubmitting ? 'Creating...' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrderModal;
