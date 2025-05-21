
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container max-w-6xl mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            MindBloom
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl">
            Your personal mental health journal and tracker. Record your moods, track patterns, and get personalized recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => navigate('/login')} size="lg" className="px-8">
              Log In
            </Button>
            <Button onClick={() => navigate('/register')} size="lg" variant="outline" className="px-8">
              Create Account
            </Button>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Daily Journal</h3>
            <p className="text-muted-foreground">
              Record your moods, thoughts, and triggers to build self-awareness.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Mood Insights</h3>
            <p className="text-muted-foreground">
              Visualize patterns and trends in your emotional well-being over time.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="text-3xl mb-4">💫</div>
            <h3 className="text-xl font-semibold mb-2">Personal Recommendations</h3>
            <p className="text-muted-foreground">
              Get tailored advice, quotes, and exercises based on your emotional state.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
