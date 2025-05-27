import { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStatistics } from '@/hooks/useStatistics';
import { Loader2 } from 'lucide-react';

const StatsPage = () => {
  const [period, setPeriod] = useState<'all' | 'month' | 'week'>('all');
  const { data: stats, isLoading, error } = useStatistics({ period });

  const renderMoodDistribution = () => {
    if (!stats) return null;

    return Object.entries(stats.moodDistribution).map(([mood, count]) => {
      const percentage = (count / stats.totalEntries) * 100;
      return (
        <div key={mood} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{mood}</span>
            <span>{Math.round(percentage)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Statistics</h1>

        {error ? (
          <div className="text-center text-red-500">
            Error loading statistics. Please try again later.
          </div>
        ) : isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Total Entries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalEntries}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Most Frequent Mood
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.mostFrequentMood}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Average Entries per Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(stats.averageEntriesPerWeek * 10) / 10}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Mood Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={period} onValueChange={(value) => setPeriod(value as typeof period)}>
                  <TabsList>
                    <TabsTrigger value="all">All Time</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                    <TabsTrigger value="week">This Week</TabsTrigger>
                  </TabsList>
                  <TabsContent value={period} className="space-y-4 mt-4">
                    {renderMoodDistribution()}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </MainLayout>
  );
};

export default StatsPage;
