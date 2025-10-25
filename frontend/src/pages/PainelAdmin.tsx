import React, { useState, useEffect, useCallback } from 'react';
import { Client } from '../types';
import api from '../services/api';
import Spinner from '../components/Spinner';
import Layout from '../components/Layout';

const PainelAdmin: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api<Client[]>('/admin/clientes');
      setClients(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch clients.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleToggleStatus = async (client: Client) => {
    try {
        await api<void>(`/admin/clientes/${client.id}`, {
            method: 'PUT',
            body: JSON.stringify({ ...client, ativo: !client.ativo })
        });
        // Refresh client list
        fetchClients();
    } catch (err: any) {
        alert(`Failed to update client status: ${err.message}`);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-10"><Spinner /></div>;
    }

    if (error) {
      return <div className="text-center py-10 text-red-500 font-semibold">{error}</div>;
    }

    if (clients.length === 0) {
      return <div className="text-center py-10 text-slate-500">No clients found.</div>;
    }

    return (
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{client.plano}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    client.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {client.ativo ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleToggleStatus(client)}
                    className={`font-bold py-2 px-4 rounded-md text-white transition duration-300 ${
                        client.ativo ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {client.ativo ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Layout>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
            <button onClick={fetchClients} className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-blue-800 transition duration-300">
                Refresh Clients
            </button>
        </div>
        {renderContent()}
    </Layout>
  );
};

export default PainelAdmin;
