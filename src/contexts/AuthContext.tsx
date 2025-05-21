
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthState, User } from '@/types';
import { mockUserData, mockToken } from '@/lib/mockData';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
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
    // Check if user is stored in local storage
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

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For now, we're using mock data
      if (email === 'demo@example.com' && password === 'password') {
        const user = mockUserData;
        const token = mockToken;
        
        // Store in local storage
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
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a successful registration
      toast({
        title: "Registration successful",
        description: "You can now log in to your account",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    // Remove user from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Update state
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
