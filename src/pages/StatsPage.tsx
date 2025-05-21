
import { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import MoodChart from '@/components/Stats/MoodChart';
import { mockJournalEntries } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StatsPage = () => {
  const moodCounts = {
    Happy: mockJournalEntries.filter(entry => entry.mood === 'Happy').length,
    Sad: mockJournalEntries.filter(entry => entry.mood === 'Sad').length,
    Angry: mockJournalEntries.filter(entry => entry.mood === 'Angry').length,
    Anxious: mockJournalEntries.filter(entry => entry.mood === 'Anxious').length,
    Excited: mockJournalEntries.filter(entry => entry.mood === 'Excited').length,
    Neutral: mockJournalEntries.filter(entry => entry.mood === 'Neutral').length,
  };
  
  const mostCommonMood = Object.entries(moodCounts).reduce(
    (max, [mood, count]) => (count > max.count ? { mood, count } : max),
    { mood: '', count: 0 }
  ).mood;
  
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Statistics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{mockJournalEntries.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Most Common Mood</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{mostCommonMood}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Days Tracked</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {new Set(mockJournalEntries.map(entry => entry.entryDate)).size}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Time</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <MoodChart entries={mockJournalEntries} />
          </TabsContent>
          <TabsContent value="month" className="mt-6">
            <MoodChart entries={mockJournalEntries.slice(0, 3)} title="Mood Distribution (This Month)" />
          </TabsContent>
          <TabsContent value="week" className="mt-6">
            <MoodChart entries={mockJournalEntries.slice(0, 2)} title="Mood Distribution (This Week)" />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default StatsPage;
