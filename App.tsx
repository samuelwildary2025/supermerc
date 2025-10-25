
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PainelAdmin from './pages/PainelAdmin';
import PainelPedidos from './pages/PainelPedidos';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { UserRole } from './types';

const AppRoutes: React.FC = () => {
    const authContext = React.useContext(AuthContext);

    if (authContext?.isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }
    
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
                path="/app" 
                element={
                    <ProtectedRoute roles={[UserRole.CLIENT]}>
                        <PainelPedidos />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/admin" 
                element={
                    <ProtectedRoute roles={[UserRole.ADMIN]}>
                        <PainelAdmin />
                    </ProtectedRoute>
                } 
            />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
