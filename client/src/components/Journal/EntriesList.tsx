import { useState } from 'react';
import { useJournalEntries } from '@/hooks/useJournalEntries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 10;

const EntriesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { toast } = useToast();

  const {
    entries = [],
    totalPages = 1,
    isLoading,
    error,
    deleteEntry
  } = useJournalEntries({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
    mood: selectedMood as "Happy" | "Sad" | "Angry" | "Anxious" | "Excited" | "Neutral" | undefined,
    date: selectedDate || undefined,
  });

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      await deleteEntry.mutateAsync(id);
      toast({
        title: 'Entry deleted',
        description: 'Journal entry has been deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete the entry. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-destructive">
          Error loading entries. Please try again later.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          value={selectedMood}
          onValueChange={setSelectedMood}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All moods</SelectItem>
            <SelectItem value="Happy">Happy</SelectItem>
            <SelectItem value="Sad">Sad</SelectItem>
            <SelectItem value="Angry">Angry</SelectItem>
            <SelectItem value="Anxious">Anxious</SelectItem>
            <SelectItem value="Excited">Excited</SelectItem>
            <SelectItem value="Neutral">Neutral</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full sm:w-[180px]"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : entries.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No journal entries found.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {format(new Date(entry.entry_date), 'MMMM d, yyyy')}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{entry.mood}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(entry.id)}
                    disabled={deleteEntry.isPending}
                  >
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {entry.trigger && (
                  <p className="text-sm text-muted-foreground mb-2">
                    Trigger: {entry.trigger}
                  </p>
                )}
                {entry.note && <p className="text-sm">{entry.note}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {entries.length > 0 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage >= totalPages || isLoading}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default EntriesList; 