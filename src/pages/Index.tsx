
import React, { useState, useEffect } from 'react';
import { CCTVDashboard } from '@/components/CCTVDashboard';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignupForm';

interface User {
  username: string;
  email: string;
  password: string;
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loginError, setLoginError] = useState('');

  // Load users from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('cctvUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with default admin user if no users exist
      const defaultUsers = [
        { username: 'admin', email: 'admin@security.com', password: 'secure123' }
      ];
      setUsers(defaultUsers);
      localStorage.setItem('cctvUsers', JSON.stringify(defaultUsers));
    }
  }, []);

  const handleLogin = (credentials: { username: string; password: string }) => {
    setLoginError('');
    const user = users.find(
      u => u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user.username);
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleSignup = (userData: { username: string; password: string; email: string }) => {
    // Check if username already exists
    if (users.some(u => u.username === userData.username)) {
      return;
    }

    const newUsers = [...users, userData];
    setUsers(newUsers);
    localStorage.setItem('cctvUsers', JSON.stringify(newUsers));
    
    // Automatically log in the new user
    setIsAuthenticated(true);
    setCurrentUser(userData.username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginError('');
  };

  if (!isAuthenticated) {
    if (showSignup) {
      return (
        <SignupForm
          onSignup={handleSignup}
          onSwitchToLogin={() => setShowSignup(false)}
        />
      );
    }
    
    return (
      <LoginForm
        onLogin={handleLogin}
        onSwitchToSignup={() => setShowSignup(true)}
        error={loginError}
      />
    );
  }

  return <CCTVDashboard onLogout={handleLogout} />;
};

export default Index;
