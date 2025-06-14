import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  role: string;
}
interface LoginResponse {
  token: string;
  username: string;
  role: string;
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
  try {
    const response = await axios.post<LoginResponse>('https://localhost:56297/api/Auth/login', {
      username,
      password,
    });
    console.log("Login API response:", response.data); // ✅ SEE WHAT ACTUALLY COMES

    const { token, username: name, role } = response.data;

    const userData: User = {
      id: '', // Optional: decode from token
      username: name,
      role: role.toLowerCase() as 'admin' | 'customer',
    };

    localStorage.setItem('hotelUser', JSON.stringify(userData));
    localStorage.setItem('hotelToken', token);
    setUser(userData);

    return true;
  } catch (error) {
    console.error("❌ Login API error:", error?.response?.data || error.message);
    return false;
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('hotelUser');
    localStorage.removeItem('hotelToken');
  };

  const value = {
    user,
    login,
    logout,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
