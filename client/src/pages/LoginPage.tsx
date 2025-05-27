
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/Layout/AuthLayout';
import LoginForm from '@/components/Auth/LoginForm';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <AuthLayout 
      title="Welcome Back"
      description="Log in to access your journal"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
