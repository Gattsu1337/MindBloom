import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodPicker from './MoodPicker';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mood } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useJournalEntries } from '@/hooks/useJournalEntries';

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
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createEntry } = useJournalEntries();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mood) {
      toast({
        title: "Please select a mood",
        description: "Your mood is required for this journal entry",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await createEntry.mutateAsync({
        mood,
        note: note || undefined,
        trigger: trigger || undefined,
        entry_date: entryDate,
      });
      
      toast({
        title: "Entry saved",
        description: "Your journal entry has been saved successfully",
      });
      
      if (onSave) {
        onSave();
      } else {
        navigate('/calendar');
      }
    } catch (error) {
      toast({
        title: "Error saving entry",
        description: "There was a problem saving your journal entry. Please try again.",
        variant: "destructive",
      });
    }
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
          <Button 
            type="submit" 
            disabled={createEntry.isPending}
          >
            {createEntry.isPending ? 'Saving...' : 'Save Entry'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EntryForm;
