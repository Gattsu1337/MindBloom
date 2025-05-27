import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthState, User } from '@/types';
import { useToast } from "@/hooks/use-toast";
import api from '@/lib/api';
import { AxiosError } from 'axios';

interface AuthContextType extends AuthState {
  login: (identifier: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setAuthState({
        user: JSON.parse(storedUser),
        token: storedToken,
        isAuthenticated: true,
        loading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        identifier,
        password,
      });

      const { token } = response.data;
      
      const userResponse = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const user = userResponse.data;
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        loading: false,
      });
      
      toast({
        title: "Login successful",
        description: "Welcome back to MindBloom",
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        title: "Login failed",
        description: axiosError.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await api.post('/auth/register', {
        username,
        email,
        password,
      });
      
      toast({
        title: "Registration successful",
        description: "You can now log in to your account",
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        title: "Registration failed",
        description: axiosError.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    });
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      ...authState,
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
