
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User, AuthContextType, UserRole } from '../types';
import api from '../services/api';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const parseJwt = (token: string): any => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = useCallback((tokenToValidate: string | null) => {
    if (tokenToValidate) {
      const decodedToken = parseJwt(tokenToValidate);
      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        setUser({
            id: decodedToken.sub,
            nome: decodedToken.nome,
            email: decodedToken.email,
            role: decodedToken.role,
            cliente_id: decodedToken.cliente_id,
        });
        setToken(tokenToValidate);
        return true;
      }
    }
    return false;
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (!validateToken(storedToken)) {
      localStorage.removeItem('authToken');
      setUser(null);
      setToken(null);
    }
    setIsLoading(false);
  }, [validateToken]);

  const login = async (email: string, password: string) => {
    const response = await api<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: new URLSearchParams({ username: email, password: password }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const new_token = response.access_token;
    if (new_token && validateToken(new_token)) {
      localStorage.setItem('authToken', new_token);
    } else {
        throw new Error("Invalid token received");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const authContextValue: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
