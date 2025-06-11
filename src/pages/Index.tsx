
import React, { useState } from 'react';
import { CCTVDashboard } from '@/components/CCTVDashboard';
import { LoginForm } from '@/components/LoginForm';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Simulate authentication
    if (credentials.username === 'admin' && credentials.password === 'secure123') {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <CCTVDashboard onLogout={handleLogout} />;
};

export default Index;
