import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
             <h1 className="text-2xl font-bold text-primary">Supermarket SaaS</h1>
          </div>
          {user && (
            <div className="flex items-center">
              <div className="text-right mr-4">
                <p className="font-semibold text-slate-800">{user.nome}</p>
                <p className="text-sm text-slate-500 capitalize">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-secondary hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
