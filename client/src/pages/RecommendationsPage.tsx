import { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Recommendation, Mood } from '@/types';
import { useRecommendations } from '@/hooks/useRecommendations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RecommendationCard from '@/components/Recommendations/RecommendationCard';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const RecommendationsPage = () => {
  const [selectedMood, setSelectedMood] = useState<Mood>('Happy');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const { data: recommendations = [], isLoading, error } = useRecommendations({
    mood: selectedMood,
    type: selectedType === 'all' ? undefined : selectedType as Recommendation['type'],
  });
  
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Recommendations</h1>
        
        <div className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Find personalized recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="mood-select">Select Mood</Label>
              <Select value={selectedMood} onValueChange={(value) => setSelectedMood(value as Mood)}>
                <SelectTrigger id="mood-select" className="w-full">
                  <SelectValue placeholder="Select mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Happy">Happy</SelectItem>
                  <SelectItem value="Sad">Sad</SelectItem>
                  <SelectItem value="Angry">Angry</SelectItem>
                  <SelectItem value="Anxious">Anxious</SelectItem>
                  <SelectItem value="Excited">Excited</SelectItem>
                  <SelectItem value="Neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Type</Label>
              <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="Quote" className="flex-1">Quotes</TabsTrigger>
                  <TabsTrigger value="Advice" className="flex-1">Advice</TabsTrigger>
                  <TabsTrigger value="Exercise" className="flex-1">Exercises</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error loading recommendations. Please try again later.
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No recommendations found for the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default RecommendationsPage;
