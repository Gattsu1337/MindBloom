
import { JournalEntry } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface EntryListProps {
  entries: JournalEntry[];
  title?: string;
}

const getMoodColor = (mood: string) => {
  switch (mood) {
    case 'Happy': return 'bg-green-100 text-green-800 border-green-200';
    case 'Sad': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Angry': return 'bg-red-100 text-red-800 border-red-200';
    case 'Anxious': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Excited': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Neutral': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const EntryList = ({ entries, title = 'Journal Entries' }: EntryListProps) => {
  if (!entries.length) {
    return (
      <Card className="w-full mb-6">
        <CardContent className="py-6">
          <p className="text-center text-muted-foreground">No entries found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      
      {entries.map((entry) => (
        <Card key={entry.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <Badge className={getMoodColor(entry.mood)}>
                {entry.mood}
              </Badge>
              <time className="text-sm text-muted-foreground">
                {format(new Date(entry.entryDate), 'MMMM d, yyyy')}
              </time>
            </div>
          </CardHeader>
          <CardContent>
            {entry.trigger && (
              <div className="mb-2">
                <span className="text-sm font-medium">Trigger: </span>
                <span className="text-sm">{entry.trigger}</span>
              </div>
            )}
            {entry.note ? (
              <p className="text-foreground">{entry.note}</p>
            ) : (
              <p className="text-muted-foreground italic">No notes added.</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EntryList;
