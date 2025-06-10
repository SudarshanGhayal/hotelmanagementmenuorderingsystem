
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'customer';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('hotelUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app this would call your API
    if (username === 'admin' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        username: 'admin',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('hotelUser', JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hotelUser');
  };

  const value = {
    user,
    login,
    logout,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
