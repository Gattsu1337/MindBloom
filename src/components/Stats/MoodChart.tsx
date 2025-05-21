
import { useMemo } from 'react';
import { JournalEntry, Mood } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface MoodChartProps {
  entries: JournalEntry[];
  title?: string;
}

const MoodChart = ({ entries, title = 'Mood Distribution' }: MoodChartProps) => {
  const moodCounts = useMemo(() => {
    const counts: Record<Mood, number> = {
      'Happy': 0,
      'Sad': 0,
      'Angry': 0,
      'Anxious': 0,
      'Excited': 0,
      'Neutral': 0
    };
    
    entries.forEach(entry => {
      counts[entry.mood]++;
    });
    
    return Object.entries(counts).map(([mood, count]) => ({
      mood,
      count
    }));
  }, [entries]);
  
  const moodColors = {
    'Happy': '#A8E890',
    'Sad': '#93C6E7',
    'Angry': '#FF9B9B',
    'Anxious': '#FFE69A',
    'Excited': '#D6BCFA',
    'Neutral': '#E5E7EB'
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {entries.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={moodCounts}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="mood" 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                allowDecimals={false} 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value) => [`${value} entries`, 'Count']}
                contentStyle={{ borderRadius: '0.375rem' }}
              />
              <Bar 
                dataKey="count" 
                name="Entries"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
                barSize={30}
              >
                {moodCounts.map((entry, index) => (
                  <Bar 
                    key={`bar-${index}`}
                    dataKey="count"
                    fill={moodColors[entry.mood as keyof typeof moodColors] || '#8884d8'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodChart;
