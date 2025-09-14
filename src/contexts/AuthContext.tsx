import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'teacher' | 'student') => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'teacher' | 'student', grade?: number) => Promise<boolean>;
  logout: () => void;
  updateLanguage: (language: 'tamil' | 'english') => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('nextgen_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'teacher' | 'student'): Promise<boolean> => {
    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role,
        grade: role === 'student' ? 8 : undefined,
        preferredLanguage: 'english',
        streak: 0,
        badges: role === 'student' ? [] : undefined,
        certificates: role === 'student' ? [] : undefined,
      };
      setUser(mockUser);
      localStorage.setItem('nextgen_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string, role: 'teacher' | 'student', grade?: number): Promise<boolean> => {
    // Mock registration
    if (name && email && password) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        grade: grade || (role === 'student' ? 8 : undefined),
        preferredLanguage: 'english',
        streak: 0,
        badges: role === 'student' ? [] : undefined,
        certificates: role === 'student' ? [] : undefined,
      };
      setUser(mockUser);
      localStorage.setItem('nextgen_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nextgen_user');
  };

  const updateLanguage = (language: 'tamil' | 'english') => {
    if (user) {
      const updatedUser = { ...user, preferredLanguage: language };
      setUser(updatedUser);
      localStorage.setItem('nextgen_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};