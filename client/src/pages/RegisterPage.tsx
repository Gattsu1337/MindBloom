
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/Layout/AuthLayout';
import RegisterForm from '@/components/Auth/RegisterForm';

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <AuthLayout 
      title="Create an Account"
      description="Sign up to start your mental health journey"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
