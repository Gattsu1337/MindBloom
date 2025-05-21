
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodPicker from './MoodPicker';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockJournalEntries } from '@/lib/mockData';
import { Mood } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface EntryFormProps {
  defaultDate?: string;
  onSave?: () => void;
}

const EntryForm = ({ defaultDate, onSave }: EntryFormProps) => {
  const today = new Date().toISOString().split('T')[0];
  const [mood, setMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');
  const [trigger, setTrigger] = useState('');
  const [entryDate, setEntryDate] = useState(defaultDate || today);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mood) {
      toast({
        title: "Please select a mood",
        description: "Your mood is required for this journal entry",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would be an API call
    // For now, we'll just simulate saving
    setTimeout(() => {
      // Add to mock data (in a real app, this would be handled by the backend)
      const newEntry = {
        id: (mockJournalEntries.length + 1).toString(),
        userId: '1',
        mood,
        note,
        trigger,
        entryDate,
        createdAt: new Date().toISOString(),
      };
      
      mockJournalEntries.unshift(newEntry);
      
      toast({
        title: "Entry saved",
        description: "Your journal entry has been saved successfully",
      });
      
      setLoading(false);
      
      if (onSave) {
        onSave();
      } else {
        navigate('/calendar');
      }
    }, 500);
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            How are you feeling today?
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              max={today}
              className="w-full"
            />
          </div>
          
          <div className="space-y-4">
            <Label>Select your mood</Label>
            <MoodPicker 
              selectedMood={mood} 
              onMoodSelect={setMood}
              className="justify-center"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trigger">What triggered this feeling? (optional)</Label>
            <Input
              id="trigger"
              placeholder="E.g., Work stress, Family conversation, etc."
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note">Journal notes (optional)</Label>
            <Textarea
              id="note"
              placeholder="Write your thoughts here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={6}
              className="w-full resize-none"
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Entry'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EntryForm;
