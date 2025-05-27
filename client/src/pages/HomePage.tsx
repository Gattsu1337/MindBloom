import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/Layout/MainLayout';
import { JournalEntry } from '@/types';
import { format } from 'date-fns';
import { PenLine, CalendarCheck, BarChart3, BookHeart } from 'lucide-react';
import { useJournalEntries } from '@/hooks/useJournalEntries';

const HomePage = () => {
  const navigate = useNavigate();
  const today = format(new Date(), 'yyyy-MM-dd');
  
  const { entries, isLoading } = useJournalEntries({
    date: today,
    pageSize: 1
  });

  const todayEntry = entries[0];
  
  const featureCards = [
    {
      title: 'Journal',
      description: 'Record your thoughts and feelings',
      icon: <PenLine className="h-6 w-6" />,
      link: '/journal',
    },
    {
      title: 'Calendar',
      description: 'View your mood history',
      icon: <CalendarCheck className="h-6 w-6" />,
      link: '/calendar',
    },
    {
      title: 'Statistics',
      description: 'Analyze your mood patterns',
      icon: <BarChart3 className="h-6 w-6" />,
      link: '/stats',
    },
    {
      title: 'Recommendations',
      description: 'Get personalized advice',
      icon: <BookHeart className="h-6 w-6" />,
      link: '/recommendations',
    },
  ];
  
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to MindBloom</h1>
          <p className="text-xl text-muted-foreground">Track your mental health journey</p>
        </div>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center text-muted-foreground">
                Loading...
              </div>
            ) : todayEntry ? (
              <div className="text-center">
                <p className="mb-4">You've already logged your mood today:</p>
                <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-semibold">
                  {todayEntry.mood}
                </div>
                {todayEntry.note && (
                  <p className="mt-4 italic">{todayEntry.note}</p>
                )}
              </div>
            ) : (
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/journal')}
                  className="px-8"
                >
                  Log Your Mood
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {card.icon}
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{card.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="w-full">
                  <Link to={card.link}>
                    Go to {card.title}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
