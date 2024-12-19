'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: any;
  login: (data: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

interface User {
  id: number;
  name: string;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || 'null'));


  const login = (data: User) => {
    setUser(data);
    if(typeof window !== 'undefined')
    localStorage.setItem("user", JSON.stringify(data));
    //window.location.href = "/";
  };



  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook 
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
